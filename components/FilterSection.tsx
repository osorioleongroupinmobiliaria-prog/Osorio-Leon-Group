

import React, { useState } from 'react';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicCheckbox from './ui/NeumorphicCheckbox';
import type { Filters } from '../types';
import { useI18n } from '../i18n';
import { initialFilters } from '../App';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface FilterSectionProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredCount: number;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters, filteredCount }) => {
  const { t } = useI18n();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name.includes('precio') || name.includes('area') || name.includes('estrato') ? Number(value) : value }));
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
    setFilters(prev => ({ 
        ...initialFilters, 
        searchTerm: prev.searchTerm,
        tipo_operacion: prev.tipo_operacion,
        tipo_propiedad: prev.tipo_propiedad,
    }));
  };
  
  const handleScrollToResults = () => {
    document.getElementById('property-grid')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const extrasOptions = [
    { name: 'tiene_porteria_24h', labelKey: 'features.concierge' },
    { name: 'tiene_ascensor', labelKey: 'features.elevator' },
    { name: 'tiene_piscina_comun', labelKey: 'features.pool' },
    { name: 'tiene_gimnasio', labelKey: 'features.gym' },
    { name: 'tiene_balcon', labelKey: 'features.balcony' },
    { name: 'tiene_zonas_verdes', labelKey: 'features.greenAreas' },
    { name: 'tiene_cancha_futbol', labelKey: 'features.soccerField' },
    { name: 'tiene_kiosko_asados', labelKey: 'features.bbqKiosk' },
    { name: 'tiene_salon_social', labelKey: 'features.socialRoom' },
    { name: 'tiene_juegos_infantiles', labelKey: 'features.playground' },
    { name: 'tiene_sendero_peatonal', labelKey: 'features.walkingPath' },
  ];

  const glassInputContainer = "!bg-white/20 !shadow-none border border-white/30";
  const glassInputText = "!text-white placeholder-gray-200";
  const glassButton = "!bg-white/20 !shadow-none !text-white hover:!bg-white/30 active:!bg-black/20";
  const glassButtonPrimary = "!bg-[#153B67]/70 backdrop-blur-sm !text-white !shadow-lg hover:!bg-[#153B67]/90";
  
  return (
    <section id="propiedades" className="py-8 -mt-14 sm:py-10 sm:-mt-16 relative z-10">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 transition-all duration-300 rounded-2xl bg-black/20 backdrop-blur-lg border border-white/30 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">{t('filter.departmentLabel')}</label>
              <NeumorphicInput as="select" name="departamento" value={filters.departamento} onChange={handleInputChange} containerClassName={glassInputContainer} className={glassInputText}>
                  <option value="todos">{t('filter.department.all')}</option>
                  <option value="Caldas">{t('filter.department.caldas')}</option>
                  <option value="Antioquia">{t('filter.department.antioquia')}</option>
                  <option value="Risaralda">{t('filter.department.risaralda')}</option>
                  <option value="Quindío">{t('filter.department.quindio')}</option>
              </NeumorphicInput>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">{t('filter.keywordLabel')}</label>
              <NeumorphicInput
                  type="text"
                  name="searchTerm"
                  placeholder={t('filter.propertyCodePlaceholder')}
                  value={filters.searchTerm}
                  onChange={handleInputChange}
                  containerClassName={glassInputContainer} 
                  className={glassInputText}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">{t('filter.operationLabel')}</label>
              <NeumorphicInput as="select" name="tipo_operacion" value={filters.tipo_operacion} onChange={handleInputChange} containerClassName={glassInputContainer} className={glassInputText}>
                  <option value="todos">{t('filter.operation.all')}</option>
                  <option value="venta">{t('filter.operation.sale')}</option>
                  <option value="arriendo">{t('filter.operation.rent')}</option>
              </NeumorphicInput>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">{t('filter.propertyTypeLabel')}</label>
              <NeumorphicInput as="select" name="tipo_propiedad" value={filters.tipo_propiedad} onChange={handleInputChange} containerClassName={glassInputContainer} className={glassInputText}>
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
               <NeumorphicButton onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className={`w-full flex items-center justify-center gap-2 ${glassButton}`}>
                   {t('filter.moreFiltersButton')}
                   <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
              </NeumorphicButton>
               <NeumorphicButton onClick={handleScrollToResults} className={`w-full lg:hidden ${glassButtonPrimary}`}>
                  {t('filter.applyButton', { count: filteredCount })}
              </NeumorphicButton>
            </div>
          </div>
          
          <div className={`transition-[max-height,padding-top,margin-top] duration-500 ease-in-out overflow-hidden ${isAdvancedOpen ? 'max-h-[1000px] pt-6 mt-6 border-t border-white/30' : 'max-h-0 pt-0 mt-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-gray-100 mb-2">{t('filter.priceRange')}</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-200 mb-1">{t('filter.priceMin')}</label>
                                <NeumorphicInput type="number" name="precio_min" value={filters.precio_min} onChange={handleInputChange} containerClassName={glassInputContainer} className={glassInputText} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-200 mb-1">{t('filter.priceMax')}</label>
                                <NeumorphicInput type="number" name="precio_max" value={filters.precio_max} onChange={handleInputChange} containerClassName={glassInputContainer} className={glassInputText} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-100 mb-2">{t('filter.socioeconomicStratum')}</h4>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs text-gray-200 mb-1">{t('filter.stratumMin')}</label>
                                <NeumorphicInput type="number" name="estrato_min" value={filters.estrato_min} onChange={handleInputChange} min="1" max="6" containerClassName={glassInputContainer} className={glassInputText} />
                            </div>
                             <div>
                                <label className="block text-xs text-gray-200 mb-1">{t('filter.stratumMax')}</label>
                                <NeumorphicInput type="number" name="estrato_max" value={filters.estrato_max} onChange={handleInputChange} min="1" max="6" containerClassName={glassInputContainer} className={glassInputText} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-100 mb-2">{t('filter.roomsAndSpaces')}</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <NeumorphicInput as="select" name="habitaciones" value={filters.habitaciones} onChange={handleInputChange} aria-label={t('filter.bedrooms')} containerClassName={glassInputContainer} className={glassInputText}>
                                <option value="any">{t('filter.bedrooms')} ({t('filter.any')})</option>
                                <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
                            </NeumorphicInput>
                            <NeumorphicInput as="select" name="banos" value={filters.banos} onChange={handleInputChange} aria-label={t('filter.bathrooms')} containerClassName={glassInputContainer} className={glassInputText}>
                                <option value="any">{t('filter.bathrooms')} ({t('filter.any')})</option>
                                <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
                            </NeumorphicInput>
                            <NeumorphicInput as="select" name="parqueaderos" value={filters.parqueaderos} onChange={handleInputChange} aria-label={t('filter.parking')} containerClassName={glassInputContainer} className={glassInputText}>
                                <option value="any">{t('filter.parking')} ({t('filter.any')})</option>
                                <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option>
                            </NeumorphicInput>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-gray-100 mb-2">{t('filter.propertyState')} &amp; {t('furnishing.label')}</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <NeumorphicInput as="select" name="estado_inmueble" value={filters.estado_inmueble} onChange={handleInputChange} containerClassName={glassInputContainer} className={glassInputText}>
                                <option value="any">{t('filter.state.all')}</option>
                                <option value="new">{t('filter.state.new')}</option>
                                <option value="used">{t('filter.state.used')}</option>
                                <option value="remodeled">{t('filter.state.remodeled')}</option>
                                <option value="under_construction">{t('filter.state.under_construction')}</option>
                            </NeumorphicInput>
                            <NeumorphicInput as="select" name="estado_amoblado" value={filters.estado_amoblado} onChange={handleInputChange} containerClassName={glassInputContainer} className={glassInputText}>
                                <option value="any">{t('furnishing.any')}</option>
                                <option value="amoblado">{t('furnishing.furnished')}</option>
                                <option value="sin_amoblar">{t('furnishing.unfurnished')}</option>
                                <option value="semi_amoblado">{t('furnishing.semi_furnished')}</option>
                            </NeumorphicInput>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div>
                     <h4 className="font-semibold text-gray-100 mb-3">{t('filter.otherFeatures')}</h4>
                     <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {extrasOptions.map(extra => (
                            <NeumorphicCheckbox
                                key={extra.name}
                                name={extra.name}
                                label={t(extra.labelKey)}
                                checked={filters.extras.includes(extra.name)}
                                onChange={(checked) => handleCheckboxChange(extra.name, checked)}
                                variant="glassmorphic"
                            />
                        ))}
                    </div>
                </div>
              </div>
               <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/30">
                  <NeumorphicButton onClick={resetFilters} className={glassButton}>{t('filter.clearButton')}</NeumorphicButton>
                  <NeumorphicButton onClick={handleScrollToResults} className={glassButtonPrimary}>{t('filter.applyButton', { count: filteredCount })}</NeumorphicButton>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;