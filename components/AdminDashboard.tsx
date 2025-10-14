
import React, { useMemo } from 'react';
import type { Property } from '../types';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicButton from './ui/NeumorphicButton';
import BuildingIcon from './icons/BuildingIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import StarIcon from './icons/StarIcon';
import PlusIcon from './icons/PlusIcon';

interface AdminDashboardProps {
  properties: Property[];
  onAddNew: () => void;
  onEdit: (property: Property) => void;
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number | string;
    colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, colorClass }) => (
    <NeumorphicCard className="p-4 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </NeumorphicCard>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ properties, onAddNew, onEdit }) => {
    
    const stats = useMemo(() => {
        return {
            total: properties.length,
            published: properties.filter(p => p.estado_publicacion === 'publicado').length,
            drafts: properties.filter(p => p.estado_publicacion === 'borrador').length,
            featured: properties.filter(p => p.es_destacado).length,
        };
    }, [properties]);

    // FIX: The "Untyped function call" error on `reduce` is resolved by explicitly typing
    // the accumulator and property in the callback function instead of using a generic argument on reduce itself.
    const propertiesByType = useMemo(() => {
        const counts = properties.reduce((acc: Record<string, number>, prop: Property) => {
            acc[prop.tipo_propiedad] = (acc[prop.tipo_propiedad] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).sort(([, a], [, b]) => Number(b) - Number(a));
    }, [properties]);
    
    const maxTypeCount = Math.max(1, ...propertiesByType.map(([, count]) => count));

    const recentProperties = useMemo(() => {
        return [...properties]
            .sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime())
            .slice(0, 5);
    }, [properties]);

    return (
        <div className="space-y-8">
            {/* Header and Quick Action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#153B67]">Bienvenido al Panel</h2>
                    <p className="text-gray-600">Aquí tienes un resumen de la actividad de tus propiedades.</p>
                </div>
                <NeumorphicButton onClick={onAddNew} className="!bg-[#153B67] !text-white flex items-center gap-2">
                    <PlusIcon className="w-5 h-5"/>
                    <span>Añadir Propiedad</span>
                </NeumorphicButton>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={<BuildingIcon className="w-6 h-6 text-blue-800" />} 
                    title="Propiedades Totales" 
                    value={stats.total}
                    colorClass="bg-blue-200"
                />
                <StatCard 
                    icon={<CheckCircleIcon className="w-6 h-6 text-green-800" />} 
                    title="Publicadas" 
                    value={stats.published}
                    colorClass="bg-green-200"
                />
                <StatCard 
                    icon={<DocumentTextIcon className="w-6 h-6 text-yellow-800" />} 
                    title="Borradores" 
                    value={stats.drafts}
                    colorClass="bg-yellow-200"
                />
                <StatCard 
                    icon={<StarIcon className="w-6 h-6 text-purple-800" />} 
                    title="Destacadas" 
                    value={stats.featured}
                    colorClass="bg-purple-200"
                />
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <NeumorphicCard className="lg:col-span-2 p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Propiedades por Tipo</h3>
                    <div className="space-y-3">
                        {propertiesByType.map(([type, count]) => (
                            <div key={type} className="flex items-center gap-4">
                                <span className="w-28 text-sm font-medium text-gray-600 capitalize">{type}</span>
                                <div className="flex-grow bg-gray-200 rounded-full h-5 shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]">
                                    <div 
                                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-5 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold"
                                        style={{ width: `${(count / maxTypeCount) * 100}%` }}
                                    >
                                       {count}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </NeumorphicCard>
                <NeumorphicCard className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Actividad Reciente</h3>
                    <ul className="space-y-3">
                        {recentProperties.map(prop => (
                            <li key={prop.id} className="flex justify-between items-center text-sm">
                                <span className="truncate pr-2">{prop.titulo}</span>
                                <button onClick={() => onEdit(prop)} className="text-blue-600 hover:underline flex-shrink-0">Editar</button>
                            </li>
                        ))}
                    </ul>
                </NeumorphicCard>
            </div>
        </div>
    );
};

export default AdminDashboard;
