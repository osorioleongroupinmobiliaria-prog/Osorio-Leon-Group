import React from 'react';
import type { Property } from '../types';
import PropertyCard from './PropertyCard';
import { useI18n } from '../i18n';

interface FeaturedPropertiesProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties, onPropertySelect }) => {
  const { t } = useI18n();

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#153B67] mb-10">{t('featuredProperties.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {properties.map(prop => (
            <PropertyCard key={prop.id} property={prop} onVerMas={onPropertySelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;