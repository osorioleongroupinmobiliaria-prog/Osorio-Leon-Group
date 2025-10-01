import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';

const services = [
  { name: 'Comercialización', image: 'https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg' },
  { name: 'Administración de Propiedades', image: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg' },
  { name: 'Arrendamiento por Corretaje', image: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg' },
  { name: 'Venta de Propiedades', image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg' },
  { name: 'Avalúos de Propiedades', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg' },
  { name: 'Consultoría Inmobiliaria', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg' },
];

const ServiceCard: React.FC<{ service: typeof services[0] }> = ({ service }) => (
  <NeumorphicCard className="overflow-hidden group">
    <div className="relative">
      <img src={service.image} alt={service.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <h3 className="absolute bottom-4 left-4 text-white text-lg font-bold">{service.name}</h3>
    </div>
  </NeumorphicCard>
);

const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-20 bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#153B67] mb-4">Nuestros Servicios</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
