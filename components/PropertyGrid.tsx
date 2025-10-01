import React from 'react';
import PropertyCard from './PropertyCard';
import NeumorphicInput from './ui/NeumorphicInput';
import type { Property } from '../types';
import NeumorphicCard from './ui/NeumorphicCard';

interface PropertyGridProps {
  properties: Property[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  onPropertySelect: (property: Property) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, sortBy, setSortBy, onPropertySelect }) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-[#153B67]">Otras Propiedades ({properties.length})</h2>
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">Ordenar por:</label>
                <NeumorphicInput 
                    as="select" 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)}
                    containerClassName="w-48"
                >
                    <option value="default">Relevancia</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                    <option value="area_desc">Área: Mayor a Menor</option>
                </NeumorphicInput>
            </div>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} onVerMas={onPropertySelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <NeumorphicCard className="inline-block p-12">
              <p className="text-xl text-gray-600">No se encontraron propiedades.</p>
              <p className="text-gray-500 mt-2">Intenta ajustar los filtros para ampliar tu búsqueda.</p>
            </NeumorphicCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;