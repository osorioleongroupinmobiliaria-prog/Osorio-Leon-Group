

import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicCheckbox from './ui/NeumorphicCheckbox';
import type { Filters } from '../types';
import { initialFilters } from '../App';
import { useI18n } from '../i18n';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredCount: number;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, filters, setFilters, filteredCount }) => {
  const { t } = useI18n();

  if (!isOpen) return null;

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
        codigo_inmueble: prev.codigo_inmueble,
    }));
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <NeumorphicCard className="w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-800">{t('filter.modalTitle')}</h2>
                <button onClick={onClose} className="text-2xl font-light text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            
            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Rango de Precios */}
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">{t('filter.priceRange')}</label>
                    <div className="grid grid-cols-2 gap-4">
                        <NeumorphicInput type="number" name="precio_min" placeholder={t('filter.priceMin')} value={filters.precio_min} onChange={handleInputChange} />
                        <NeumorphicInput type="number" name="precio_max" placeholder={t('filter.priceMax')} value={filters.precio_max} onChange={handleInputChange} />
                    </div>
                </div>

                {/* Ubicación */}
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">{t('filter.location')}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <NeumorphicInput as="select" name="departamento" value={filters.departamento} onChange={handleInputChange} aria-label={t('filter.departmentLabel')}>
                            <option value="todos">{t('filter.department.all')}</option>
                            <option value="Caldas">{t('filter.department.caldas')}</option>
                            <option value="Antioquia">{t('filter.department.antioquia')}</option>
                            <option value="Risaralda">{t('filter.department.risaralda')}</option>
                            <option value="Quindío">{t('filter.department.quindio')}</option>
                        </NeumorphicInput>
                         <NeumorphicInput type="text" name="barrio" placeholder={t('filter.neighborhoodPlaceholder')} value={filters.barrio} onChange={handleInputChange} />
                    </div>
                </div>

                {/* Estrato, Estado y Amoblado */}
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">{t('filter.socioeconomicStratum')}</label>
                        <div className="grid grid-cols-2 gap-2">
                            <NeumorphicInput type="number" name="estrato_min" placeholder={t('filter.stratumMin')} value={filters.estrato_min} onChange={handleInputChange} min="1" max="6" />
                            <NeumorphicInput type="number" name="estrato_max" placeholder={t('filter.stratumMax')} value={filters.estrato_max} onChange={handleInputChange} min="1" max="6" />
                        </div>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">{t('filter.propertyState')}</label>
                        <NeumorphicInput as="select" name="estado_inmueble" value={filters.estado_inmueble} onChange={handleInputChange}>
                           <option value="any">{t('filter.state.all')}</option>
                           <option value="new">{t('filter.state.new')}</option>
                           <option value="used">{t('filter.state.used')}</option>
                           <option value="remodeled">{t('filter.state.remodeled')}</option>
                           <option value="under_construction">{t('filter.state.under_construction')}</option>
                        </NeumorphicInput>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">{t('furnishing.label')}</label>
                        <NeumorphicInput as="select" name="estado_amoblado" value={filters.estado_amoblado} onChange={handleInputChange}>
                           <option value="any">{t('furnishing.any')}</option>
                           <option value="amoblado">{t('furnishing.furnished')}</option>
                           <option value="sin_amoblar">{t('furnishing.unfurnished')}</option>
                           <option value="semi_amoblado">{t('furnishing.semi_furnished')}</option>
                        </NeumorphicInput>
                    </div>
                </div>

                {/* Habitaciones, Baños, Parqueaderos */}
                <div>
                     <label className="text-sm font-medium text-gray-600 mb-2 block">{t('filter.roomsAndSpaces')}</label>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <NeumorphicInput as="select" name="habitaciones" value={filters.habitaciones} onChange={handleInputChange} aria-label={t('filter.bedrooms')}>
                            <option value="any">{t('filter.bedrooms')} ({t('filter.any')})</option>
                            <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
                         </NeumorphicInput>
                         <NeumorphicInput as="select" name="banos" value={filters.banos} onChange={handleInputChange} aria-label={t('filter.bathrooms')}>
                            <option value="any">{t('filter.bathrooms')} ({t('filter.any')})</option>
                            <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
                         </NeumorphicInput>
                         <NeumorphicInput as="select" name="parqueaderos" value={filters.parqueaderos} onChange={handleInputChange} aria-label={t('filter.parking')}>
                            <option value="any">{t('filter.parking')} ({t('filter.any')})</option>
                            <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option>
                         </NeumorphicInput>
                     </div>
                </div>

                {/* Extras */}
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-3 block">{t('filter.otherFeatures')}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
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
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 border-t border-gray-300 flex-shrink-0">
                <NeumorphicButton onClick={resetFilters}>{t('filter.clearButton')}</NeumorphicButton>
                <NeumorphicButton onClick={onClose} className="!bg-[#153B67] !text-white">{t('filter.applyButton', { count: filteredCount })}</NeumorphicButton>
            </div>
        </NeumorphicCard>
    </div>
  );
};

export default FilterModal;