
import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicCheckbox from './ui/NeumorphicCheckbox';
import type { Filters } from '../types';
import { initialFilters } from '../App';
import { useI18n } from '../i18n';

interface FilterSectionProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters }) => {
  const { t } = useI18n();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name.includes('precio') || name.includes('area') ? Number(value) : value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFilters(prev => {
      const newExtras = checked
        ? [...prev.extras, name]
        : prev.extras.filter(extra => extra !== name);
      return { ...prev, extras: newExtras };
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const extrasOptions = [
    { name: 'tiene_porteria_24h', labelKey: 'features.concierge' },
    { name: 'tiene_ascensor', labelKey: 'features.elevator' },
    { name: 'tiene_piscina_comun', labelKey: 'features.pool' },
    { name: 'tiene_gimnasio', labelKey: 'features.gym' },
    { name: 'tiene_balcon', labelKey: 'features.balcony' },
  ];

  return (
    <section id="propiedades" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NeumorphicCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* Tipo de Operación y Propiedad */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">{t('filter.searchLabel')}</label>
                <NeumorphicInput as="select" name="tipo_operacion" value={filters.tipo_operacion} onChange={handleInputChange}>
                    <option value="todos">{t('filter.operation.all')}</option>
                    <option value="venta">{t('filter.operation.sale')}</option>
                    <option value="arriendo">{t('filter.operation.rent')}</option>
                </NeumorphicInput>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">{t('filter.propertyTypeLabel')}</label>
                <NeumorphicInput as="select" name="tipo_propiedad" value={filters.tipo_propiedad} onChange={handleInputChange}>
                    <option value="todos">{t('filter.propertyType.all')}</option>
                    <option value="apartamento">{t('filter.propertyType.apartment')}</option>
                    <option value="casa">{t('filter.propertyType.house')}</option>
                    <option value="oficina">{t('filter.propertyType.office')}</option>
                    <option value="local">{t('filter.propertyType.commercial')}</option>
                    <option value="lote">{t('filter.propertyType.lot')}</option>
                    <option value="finca">{t('filter.propertyType.farm')}</option>
                </NeumorphicInput>
            </div>

            {/* Habitaciones, Baños, Parqueaderos */}
             <div className="grid grid-cols-3 gap-2 col-span-1 md:col-span-2 lg:col-span-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">{t('filter.bedrooms')}</label>
                    <NeumorphicInput as="select" name="habitaciones" value={filters.habitaciones} onChange={handleInputChange}>
                        <option value="any">{t('filter.any')}</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </NeumorphicInput>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">{t('filter.bathrooms')}</label>
                    <NeumorphicInput as="select" name="banos" value={filters.banos} onChange={handleInputChange}>
                        <option value="any">{t('filter.any')}</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </NeumorphicInput>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">{t('filter.parking')}</label>
                    <NeumorphicInput as="select" name="parqueaderos" value={filters.parqueaderos} onChange={handleInputChange}>
                        <option value="any">{t('filter.any')}</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                    </NeumorphicInput>
                </div>
            </div>

             {/* Rango de Precios */}
            <div className="md:col-span-2 lg:col-span-4">
                <label className="text-sm font-medium text-gray-600">{t('filter.priceRange')}</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                     <NeumorphicInput type="number" name="precio_min" placeholder={t('filter.priceMin')} value={filters.precio_min} onChange={handleInputChange} />
                     <NeumorphicInput type="number" name="precio_max" placeholder={t('filter.priceMax')} value={filters.precio_max} onChange={handleInputChange} />
                </div>
            </div>

            {/* Extras */}
            <div className="md:col-span-2 lg:col-span-3">
                 <label className="text-sm font-medium text-gray-600 mb-3 block">{t('filter.otherFeatures')}</label>
                 <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {extrasOptions.map(extra => (
                        <NeumorphicCheckbox
                            key={extra.name}
                            name={extra.name}
                            label={t(extra.labelKey)}
                            checked={filters.extras.includes(extra.name)}
                            onChange={(checked) => handleCheckboxChange(extra.name, checked)}
                        />
                    ))}
                 </div>
            </div>

            <NeumorphicButton onClick={resetFilters} className="w-full">{t('filter.clearButton')}</NeumorphicButton>

          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
};

export default FilterSection;