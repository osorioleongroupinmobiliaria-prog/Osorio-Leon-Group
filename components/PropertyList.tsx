
import React from 'react';
import type { Property } from '../types';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicButton from './ui/NeumorphicButton';

interface PropertyListProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onEdit, onDelete }) => {
  const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  return (
    <NeumorphicCard className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 font-semibold">Título</th>
              <th className="p-4 font-semibold">Tipo</th>
              <th className="p-4 font-semibold">Operación</th>
              <th className="p-4 font-semibold">Precio</th>
              <th className="p-4 font-semibold">Estado</th>
              <th className="p-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(prop => (
              <tr key={prop.id} className="border-b border-gray-300 last:border-b-0">
                <td className="p-4 font-medium">{prop.titulo}</td>
                <td className="p-4">{prop.tipo_propiedad}</td>
                <td className="p-4">{prop.tipo_operacion}</td>
                <td className="p-4">{formatPrice(prop.precio)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prop.estado_publicacion === 'publicado' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {prop.estado_publicacion}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <NeumorphicButton onClick={() => onEdit(prop)} className="!px-3 !py-1 text-xs">Editar</NeumorphicButton>
                    <NeumorphicButton onClick={() => window.confirm('¿Estás seguro?') && onDelete(prop.id)} className="!px-3 !py-1 text-xs !bg-red-500 !text-white">Eliminar</NeumorphicButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NeumorphicCard>
  );
};

export default PropertyList;
