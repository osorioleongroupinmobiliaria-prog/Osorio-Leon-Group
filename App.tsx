

import React, { useState, useEffect, useMemo } from 'react';
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
import { MOCK_PROPERTIES, ADMIN_CREDENTIALS } from './constants';
import type { Property, Filters } from './types';
import ServicesSection from './components/ServicesSection';
import OfferPropertySection from './components/OfferPropertySection';
import TestimonialsSection from './components/TestimonialsSection';
import VisitorNotification from './components/VisitorNotification';
import SplashScreen from './components/SplashScreen';
import AdminAccessButton from './components/AdminAccessButton';

export const initialFilters: Filters = {
  searchTerm: '',
  tipo_operacion: 'todos',
  tipo_propiedad: 'todos',
  precio_min: 0,
  precio_max: 2000000000,
  area_min: 30,
  area_max: 500,
  habitaciones: 'any',
  banos: 'any',
  parqueaderos: 'any',
  extras: [],
  estrato_min: 1,
  estrato_max: 6,
  estado_inmueble: 'any',
  estado_amoblado: 'any',
  departamento: 'todos',
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');
  
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState('default');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('osorioLeonProperties', JSON.stringify(properties));
    } catch (error) {
      console.error("Failed to save properties to localStorage", error);
    }
  }, [properties]);

  useEffect(() => {
    const handlePathChange = () => {
      if (window.location.pathname === '/acceso-digital-osorio') {
        document.title = "Admin Panel - Osorio & León Group";
        setView(isAuthenticated ? 'admin' : 'login');
      } else {
        document.title = "Osorio & León Group - Inmobiliaria";
        setView('public');
      }
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, [isAuthenticated]);

  const handleLogin = (user: string, pass: string) => {
    if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.history.pushState({}, '', '/');
    setView('public');
  };
  
  const handleSaveProperty = (property: Property) => {
    setProperties(prev => {
      const existing = prev.find(p => p.id === property.id);
      if (existing) {
        return prev.map(p => p.id === property.id ? property : p);
      }
      return [...prev, property];
    });
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const filteredProperties = useMemo(() => {
    const lowerSearchTerm = filters.searchTerm.toLowerCase().trim();

    return properties.filter(p => {
      if (p.estado_publicacion !== 'publicado') return false;
      if (p.es_destacado) return false;

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
      return <LoginForm onLogin={handleLogin} />;
    case 'admin':
      return <AdminPanel properties={properties} onSave={handleSaveProperty} onDelete={handleDeleteProperty} onLogout={handleLogout} />;
    case 'public':
    default:
      return (
        <div className="bg-[#e0e0e0] text-gray-700">
          <Header />
          <main>
            <HeroSection />
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
          <AdminAccessButton />
          <Footer />
          {selectedProperty && (
            <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
          )}
        </div>
      );
  }
}

export default App;