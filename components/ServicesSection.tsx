import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import { useI18n } from '../i18n';

const services = [
  { nameKey: 'services.commercialization', image: 'https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg' },
  { nameKey: 'services.propertyManagement', image: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg' },
  { nameKey: 'services.brokerageLeasing', image: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg' },
  { nameKey: 'services.propertySales', image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg' },
  { nameKey: 'services.appraisals', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg' },
  { nameKey: 'services.consulting', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg' },
];

const ServiceCard: React.FC<{ name: string; image: string; }> = ({ name, image }) => (
  <NeumorphicCard className="overflow-hidden group">
    <div className="relative">
      <img src={image} alt={name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <h3 className="absolute bottom-4 left-4 text-white text-lg font-bold">{name}</h3>
    </div>
  </NeumorphicCard>
);

const ServicesSection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="servicios" className="py-20 bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#153B67] mb-4">{t('services.title')}</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">{t('services.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.nameKey} name={t(service.nameKey)} image={service.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;