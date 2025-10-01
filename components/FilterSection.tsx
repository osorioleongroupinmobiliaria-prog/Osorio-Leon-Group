
import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicCheckbox from './ui/NeumorphicCheckbox';
import type { Filters } from '../types';
import { initialFilters } from '../App';

interface FilterSectionProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters }) => {

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
    { name: 'tiene_porteria_24h', label: 'Portería 24h' },
    { name: 'tiene_ascensor', label: 'Ascensor' },
    { name: 'tiene_piscina_comun', label: 'Piscina' },
    { name: 'tiene_gimnasio', label: 'Gimnasio' },
    { name: 'tiene_balcon', label: 'Balcón' },
  ];

  return (
    <section id="propiedades" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NeumorphicCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* Tipo de Operación y Propiedad */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">¿Qué buscas?</label>
                <NeumorphicInput as="select" name="tipo_operacion" value={filters.tipo_operacion} onChange={handleInputChange}>
                    <option value="todos">Venta o Arriendo</option>
                    <option value="venta">Venta</option>
                    <option value="arriendo">Arriendo</option>
                </NeumorphicInput>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Tipo de Inmueble</label>
                <NeumorphicInput as="select" name="tipo_propiedad" value={filters.tipo_propiedad} onChange={handleInputChange}>
                    <option value="todos">Todos</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="casa">Casa</option>
                    <option value="oficina">Oficina</option>
                    <option value="local">Local</option>
                    <option value="lote">Lote</option>
                    <option value="finca">Finca</option>
                </NeumorphicInput>
            </div>

            {/* Habitaciones, Baños, Parqueaderos */}
             <div className="grid grid-cols-3 gap-2 col-span-1 md:col-span-2 lg:col-span-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Habitaciones</label>
                    <NeumorphicInput as="select" name="habitaciones" value={filters.habitaciones} onChange={handleInputChange}>
                        <option value="any">Cualquiera</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </NeumorphicInput>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Baños</label>
                    <NeumorphicInput as="select" name="banos" value={filters.banos} onChange={handleInputChange}>
                        <option value="any">Cualquiera</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                    </NeumorphicInput>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Parqueaderos</label>
                    <NeumorphicInput as="select" name="parqueaderos" value={filters.parqueaderos} onChange={handleInputChange}>
                        <option value="any">Cualquiera</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                    </NeumorphicInput>
                </div>
            </div>

             {/* Rango de Precios */}
            <div className="md:col-span-2 lg:col-span-4">
                <label className="text-sm font-medium text-gray-600">Rango de Precios (COP)</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                     <NeumorphicInput type="number" name="precio_min" placeholder="Mínimo" value={filters.precio_min} onChange={handleInputChange} />
                     <NeumorphicInput type="number" name="precio_max" placeholder="Máximo" value={filters.precio_max} onChange={handleInputChange} />
                </div>
            </div>

            {/* Extras */}
            <div className="md:col-span-2 lg:col-span-3">
                 <label className="text-sm font-medium text-gray-600 mb-3 block">Otras Características</label>
                 <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {extrasOptions.map(extra => (
                        <NeumorphicCheckbox
                            key={extra.name}
                            name={extra.name}
                            label={extra.label}
                            checked={filters.extras.includes(extra.name)}
                            onChange={(checked) => handleCheckboxChange(extra.name, checked)}
                        />
                    ))}
                 </div>
            </div>

            <NeumorphicButton onClick={resetFilters} className="w-full">Limpiar</NeumorphicButton>

          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
};

export default FilterSection;
