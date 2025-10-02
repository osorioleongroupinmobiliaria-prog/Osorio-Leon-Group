
import React, { useState } from 'react';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import FilterModal from './FilterModal';
import NeumorphicCard from './ui/NeumorphicCard';
import type { Filters } from '../types';
import { useI18n } from '../i18n';

interface FilterSectionProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredCount: number;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters, filteredCount }) => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScrollToResults = () => {
    document.getElementById('property-grid')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section id="propiedades" className="py-10 -mt-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NeumorphicCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('filter.keywordLabel')}</label>
              <NeumorphicInput
                  type="text"
                  name="searchTerm"
                  placeholder={t('filter.searchPlaceholder')}
                  value={filters.searchTerm}
                  onChange={handleChange}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('filter.propertyCodeLabel')}</label>
              <NeumorphicInput
                  type="text"
                  name="codigo_inmueble"
                  placeholder={t('filter.propertyCodePlaceholder')}
                  value={filters.codigo_inmueble}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('filter.operationLabel')}</label>
              <NeumorphicInput as="select" name="tipo_operacion" value={filters.tipo_operacion} onChange={handleChange}>
                  <option value="todos">{t('filter.operation.all')}</option>
                  <option value="venta">{t('filter.operation.sale')}</option>
                  <option value="arriendo">{t('filter.operation.rent')}</option>
              </NeumorphicInput>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{t('filter.propertyTypeLabel')}</label>
              <NeumorphicInput as="select" name="tipo_propiedad" value={filters.tipo_propiedad} onChange={handleChange}>
                  <option value="todos">{t('filter.propertyType.all')}</option>
                  <option value="apartamento">{t('filter.propertyType.apartment')}</option>
                  <option value="casa">{t('filter.propertyType.house')}</option>
                  <option value="oficina">{t('filter.propertyType.office')}</option>
                  <option value="local">{t('filter.propertyType.commercial')}</option>
                  <option value="lote">{t('filter.propertyType.lot')}</option>
                  <option value="finca">{t('filter.propertyType.farm')}</option>
              </NeumorphicInput>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
               <NeumorphicButton onClick={() => setIsModalOpen(true)} className="w-full">
                   {t('filter.moreFiltersButton')}
              </NeumorphicButton>
               <NeumorphicButton onClick={handleScrollToResults} className="w-full !bg-[#153B67] !text-white lg:hidden">
                  {t('filter.applyButton', { count: filteredCount })}
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicCard>
      </div>
      
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        filteredCount={filteredCount}
      />
    </section>
  );
};

export default FilterSection;