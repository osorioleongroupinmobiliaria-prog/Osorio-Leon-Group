import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import PropertyGrid from './components/PropertyGrid';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ChatbotAura from './components/ChatbotAura';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import PropertyModal from './components/PropertyModal';
import FeaturedProperties from './components/FeaturedProperties';
import { MOCK_PROPERTIES, ADMIN_CREDENTIALS } from './constants';
import type { Property, Filters } from './types';
import ServicesSection from './components/ServicesSection';
import OfferPropertySection from './components/OfferPropertySection';

export const initialFilters: Filters = {
  tipo_operacion: 'todos',
  tipo_propiedad: 'todos',
  precio_min: 50000000,
  precio_max: 2000000000,
  area_min: 30,
  area_max: 500,
  habitaciones: 'any',
  banos: 'any',
  parqueaderos: 'any',
  extras: [],
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState('default');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

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

    handlePathChange(); // Check path on initial load and auth change
    window.addEventListener('popstate', handlePathChange); // Listen for history changes

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
    window.history.pushState({}, '', '/'); // Change URL without reloading
    setView('public'); // Manually set view to public for instant update
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
    return properties.filter(p => {
      if (p.es_destacado) return false;
      if (filters.tipo_operacion !== 'todos' && p.tipo_operacion !== filters.tipo_operacion) return false;
      if (filters.tipo_propiedad !== 'todos' && p.tipo_propiedad !== filters.tipo_propiedad) return false;
      if (p.precio < filters.precio_min || p.precio > filters.precio_max) return false;
      if (p.area_construida && (p.area_construida < filters.area_min || p.area_construida > filters.area_max)) return false;
      if (filters.habitaciones !== 'any' && (p.habitaciones || 0) < Number(filters.habitaciones)) return false;
      if (filters.banos !== 'any' && (p.banos_completos || 0) < Number(filters.banos)) return false;
      if (filters.parqueaderos !== 'any' && (p.parqueaderos || 0) < Number(filters.parqueaderos)) return false;
      
      const passesExtras = filters.extras.every(extraKey => p[extraKey as keyof Property]);
      if (!passesExtras) return false;

      return true;
    });
  }, [properties, filters]);
  
  const featuredProperties = useMemo(() => {
    return properties.filter(p => p.es_destacado);
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
            <FilterSection filters={filters} setFilters={setFilters} />
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
            <ContactSection />
          </main>
          {!selectedProperty && <ChatbotAura />}
          <Footer />
          {selectedProperty && (
            <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
          )}
        </div>
      );
  }
}

export default App;