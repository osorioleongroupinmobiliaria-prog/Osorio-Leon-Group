import React from 'react';
import PropertyCard from './PropertyCard';
import NeumorphicInput from './ui/NeumorphicInput';
import type { Property } from '../types';
import NeumorphicCard from './ui/NeumorphicCard';
import { useI18n } from '../i18n';

interface PropertyGridProps {
  properties: Property[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  onPropertySelect: (property: Property) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, sortBy, setSortBy, onPropertySelect }) => {
  const { t } = useI18n();

  return (
    <div id="property-grid" className="py-10 sm:py-12">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#153B67]">{t('propertyGrid.title')} ({properties.length})</h2>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <label className="text-sm font-medium text-gray-600">{t('propertyGrid.sortBy')}:</label>
                <NeumorphicInput 
                    as="select" 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)}
                    containerClassName="w-full md:w-48"
                >
                    <option value="default">{t('propertyGrid.sortOptions.relevance')}</option>
                    <option value="price_asc">{t('propertyGrid.sortOptions.priceAsc')}</option>
                    <option value="price_desc">{t('propertyGrid.sortOptions.priceDesc')}</option>
                    <option value="area_desc">{t('propertyGrid.sortOptions.areaDesc')}</option>
                </NeumorphicInput>
            </div>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} onVerMas={onPropertySelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <NeumorphicCard className="inline-block p-12">
              <p className="text-xl text-gray-600">{t('propertyGrid.notFound.title')}</p>
              <p className="text-gray-500 mt-2">{t('propertyGrid.notFound.subtitle')}</p>
            </NeumorphicCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;