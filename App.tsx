import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabase/client';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import PropertyGrid from './components/PropertyGrid';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ChatbotTatiana from './components/ChatbotAura';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import PropertyModal from './components/PropertyModal';
import FeaturedProperties from './components/FeaturedProperties';
import type { Property, Filters } from './types';
import ServicesSection from './components/ServicesSection';
import OfferPropertySection from './components/OfferPropertySection';
import TestimonialsSection from './components/TestimonialsSection';
import VisitorNotification from './components/VisitorNotification';
import SplashScreen from './components/SplashScreen';
import PartnersCarousel from './components/PartnersCarousel';
import PropertyDetailPage from './components/PropertyDetailPage';

export const initialFilters: Filters = {
  searchTerm: '',
  tipo_operacion: 'todos',
  tipo_propiedad: 'todos',
  precio_min: 0,
  precio_max: 2000000000,
  area_min: 0,
  area_max: 100000,
  habitaciones: 'any',
  banos: 'any',
  parqueaderos: 'any',
  extras: [],
  estrato_min: 1,
  estrato_max: 6,
  estado_inmueble: 'any',
  estado_amoblado: 'any',
  departamento: 'todos',
  tipo_cocina: 'any',
  tipo_vigilancia: 'any',
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'public' | 'login' | 'admin' | 'propertyDetail'>('public');
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [properties, setProperties] = useState<Property[]>([]);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState('default');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const fetchProperties = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    let query = supabase.from('properties').select('*');
    
    // For public view (no session), explicitly fetch only 'publicado' properties.
    // For admins (session exists), fetch all properties, relying on RLS to grant access.
    if (!session) {
      query = query.eq('estado_publicacion', 'publicado');
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching properties:", error);
      alert(`Error al cargar las propiedades: ${error.message}.\n\nAsegúrate de que:\n1. La tabla 'properties' existe en Supabase.\n2. La Seguridad a Nivel de Fila (RLS) está HABILITADA.\n3. Has creado las políticas de SELECT correctas (una para acceso público y otra para administradores).`);
    } else {
      setProperties(data || []);
    }
  };

  useEffect(() => {
    // Check initial session and set up listener for auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
        setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch properties whenever authentication status changes (e.g., on login/logout)
  useEffect(() => {
    fetchProperties();
  }, [isAuthenticated]);


  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      
      if (path === '/acceso-digital-osorio') {
        document.title = "Admin Panel - Osorio & León Group";
        setView(isAuthenticated ? 'admin' : 'login');
      } else if (path.startsWith('/propiedad/')) {
        const id = path.split('/')[2];
        setPropertyId(id);
        setView('propertyDetail');
      } else {
        document.title = "Osorio & León Group - Inmobiliaria";
        setView('public');
        setPropertyId(null);
      }
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, [isAuthenticated]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
    }
    // The onAuthStateChange listener will automatically set isAuthenticated to false
    window.history.pushState({}, '', '/');
    setView('public');
  };
  
  const handleSaveProperty = async (property: Property) => {
    setIsSaving(true);
    try {
      const isNew = property.id.startsWith('prop_');
      let error;

      if (isNew) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...propertyToInsert } = property;
        ({ error } = await supabase.from('properties').insert([propertyToInsert]).select());
      } else {
        ({ error } = await supabase.from('properties').update(property).eq('id', property.id).select());
      }

      if (error) {
        console.error('Error saving property:', error);
        alert(`Error al guardar la propiedad: ${error.message}`);
      } else {
        await fetchProperties();
      }
    } catch (e) {
      console.error("An unexpected error occurred during save:", e);
      alert("Ocurrió un error inesperado al guardar la propiedad.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) {
        console.error('Error deleting property:', error);
        alert(`Error al eliminar la propiedad: ${error.message}`);
      } else {
        await fetchProperties();
      }
    } catch (e) {
      console.error("An unexpected error occurred during delete:", e);
      alert("Ocurrió un error inesperado al eliminar la propiedad.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProperties = useMemo(() => {
    const lowerSearchTerm = filters.searchTerm.toLowerCase().trim();

    return properties.filter(p => {
      // When an admin is logged in, `properties` may contain non-published items.
      // This client-side filter ensures only published ones appear on the public site.
      if (p.estado_publicacion !== 'publicado') return false;

      if (lowerSearchTerm) {
        const inCity = p.ciudad.toLowerCase().includes(lowerSearchTerm);
        const inNeighborhood = p.barrio_sector.toLowerCase().includes(lowerSearchTerm);
        if (!inCity && !inNeighborhood) return false;
      }
      
      if (filters.tipo_operacion !== 'todos' && p.tipo_operacion !== filters.tipo_operacion) return false;
      if (filters.tipo_propiedad !== 'todos' && p.tipo_propiedad !== filters.tipo_propiedad) return false;
      if (p.precio < filters.precio_min || p.precio > filters.precio_max) return false;
      if (p.area_construida && (p.area_construida < filters.area_min || p.area_construida > filters.area_max)) return false;
      if (filters.habitaciones !== 'any' && (p.habitaciones || 0) < Number(filters.habitaciones)) return false;
      if (filters.banos !== 'any' && (p.banos_completos || 0) < Number(filters.banos)) return false;
      if (filters.parqueaderos !== 'any' && (p.parqueaderos || 0) < Number(filters.parqueaderos)) return false;
      
      const passesExtras = filters.extras.every(extraKey => p[extraKey as keyof Property]);
      if (!passesExtras) return false;

      if (p.estrato && (p.estrato < filters.estrato_min || p.estrato > filters.estrato_max)) return false;
      if (filters.estado_inmueble !== 'any' && p.estado_inmueble !== filters.estado_inmueble) return false;
      if (filters.estado_amoblado !== 'any' && p.estado_amoblado !== filters.estado_amoblado) return false;
      if (filters.departamento !== 'todos' && p.departamento !== filters.departamento) return false;
      if (filters.tipo_cocina !== 'any' && p.tipo_cocina !== filters.tipo_cocina) return false;
      if (filters.tipo_vigilancia !== 'any' && p.tipo_vigilancia !== filters.tipo_vigilancia) return false;

      return true;
    });
  }, [properties, filters]);
  
  const featuredProperties = useMemo(() => {
    return properties.filter(p => p.es_destacado && p.estado_publicacion === 'publicado');
  }, [properties]);

  const sortedAndFilteredProperties = useMemo(() => {
    let sortedProperties = [...filteredProperties];
    switch (sortBy) {
      case 'price_asc':
        sortedProperties.sort((a, b) => a.precio - b.precio);
        break;
      case 'price_desc':
        sortedProperties.sort((a, b) => b.precio - a.precio);
        break;
      case 'area_desc':
        sortedProperties.sort((a, b) => (b.area_construida || 0) - (a.area_construida || 0));
        break;
      default:
        break;
    }
    return sortedProperties;
  }, [filteredProperties, sortBy]);

  if (isLoading) {
    return <SplashScreen onFinished={() => setIsLoading(false)} />;
  }

  switch (view) {
    case 'login':
      return <LoginForm />;
    case 'admin':
      return <AdminPanel 
                properties={properties} 
                onSave={handleSaveProperty} 
                onDelete={handleDeleteProperty} 
                onLogout={handleLogout} 
                isSaving={isSaving}
             />;
    case 'propertyDetail':
        return <PropertyDetailPage propertyId={propertyId} />;
    case 'public':
    default:
      return (
        <div className="bg-[#e0e0e0] text-gray-700">
          <Header />
          <main>
            <HeroSection />
            <PartnersCarousel />
            <FilterSection 
              filters={filters} 
              setFilters={setFilters}
              filteredCount={sortedAndFilteredProperties.length} 
            />
            <FeaturedProperties 
              properties={featuredProperties} 
              onPropertySelect={setSelectedProperty} 
            />
            <PropertyGrid 
              properties={sortedAndFilteredProperties} 
              sortBy={sortBy}
              setSortBy={setSortBy}
              onPropertySelect={setSelectedProperty}
            />
            <ServicesSection />
            <OfferPropertySection />
            <AboutSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <VisitorNotification isChatbotOpen={isChatbotOpen} />
          {!selectedProperty && <ChatbotTatiana isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />}
          <Footer />
          {selectedProperty && (
            <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
          )}
        </div>
      );
  }
}

export default App;