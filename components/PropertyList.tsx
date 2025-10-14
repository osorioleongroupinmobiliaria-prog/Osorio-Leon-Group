import React, { useState, useMemo } from 'react';
import type { Property } from '../types';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicInput from './ui/NeumorphicInput';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

interface PropertyListProps {
  properties: Property[];
  onAddNew: () => void;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onAddNew, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  const filteredProperties = useMemo(() => {
    return properties
      .filter(prop => {
        if (statusFilter !== 'all' && prop.estado_publicacion !== statusFilter) {
          return false;
        }
        if (searchTerm && !prop.titulo.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime());
  }, [properties, searchTerm, statusFilter]);

  const statusStyles: { [key: string]: string } = {
    publicado: 'bg-green-100 text-green-800 border-green-200',
    borrador: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    pausado: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <NeumorphicCard className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#153B67]">Inventario de Propiedades ({filteredProperties.length})</h2>
        <div className="flex items-center gap-2">
            <NeumorphicInput 
                type="text" 
                placeholder="Buscar por título..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                containerClassName="w-40"
            />
            <NeumorphicInput as="select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">Todos</option>
                <option value="publicado">Publicado</option>
                <option value="borrador">Borrador</option>
                <option value="pausado">Pausado</option>
            </NeumorphicInput>
             <NeumorphicButton onClick={onAddNew} className="!px-3 !py-2 flex items-center gap-2">
                <PlusIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Nueva</span>
            </NeumorphicButton>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200/50">
            <tr>
              <th className="p-3 font-semibold hidden sm:table-cell">Imagen</th>
              <th className="p-3 font-semibold">Título</th>
              <th className="p-3 font-semibold hidden md:table-cell">Tipo</th>
              <th className="p-3 font-semibold hidden md:table-cell">Operación</th>
              <th className="p-3 font-semibold hidden lg:table-cell">Precio</th>
              <th className="p-3 font-semibold">Estado</th>
              <th className="p-3 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map(prop => {
              const mainImage = prop.imagenes?.find(img => img.es_principal) || prop.imagenes?.[0];
              return (
              <tr key={prop.id} className="border-b border-gray-300 last:border-b-0 hover:bg-gray-100/50">
                <td className="p-2 hidden sm:table-cell">
                    <img 
                        src={mainImage?.url_imagen || 'https://via.placeholder.com/150'} 
                        alt={prop.titulo}
                        className="w-16 h-12 object-cover rounded-md" 
                    />
                </td>
                <td className="p-3 font-medium text-gray-800">{prop.titulo}</td>
                <td className="p-3 capitalize hidden md:table-cell">{prop.tipo_propiedad}</td>
                <td className="p-3 capitalize hidden md:table-cell">{prop.tipo_operacion}</td>
                <td className="p-3 hidden lg:table-cell">{formatPrice(prop.precio)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusStyles[prop.estado_publicacion] || statusStyles['borrador']}`}>
                    {prop.estado_publicacion}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2 justify-end">
                    <NeumorphicButton onClick={() => onEdit(prop)} className="!p-2" title="Editar">
                        <PencilIcon className="w-4 h-4" />
                    </NeumorphicButton>
                    <NeumorphicButton onClick={() => window.confirm('¿Estás seguro de que quieres eliminar esta propiedad? Esta acción no se puede deshacer.') && onDelete(prop.id)} className="!p-2 !bg-red-400/80 !text-white" title="Eliminar">
                        <TrashIcon className="w-4 h-4" />
                    </NeumorphicButton>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </NeumorphicCard>
  );
};

export default PropertyList;