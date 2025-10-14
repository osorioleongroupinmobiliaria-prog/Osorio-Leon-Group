import React, { useState } from 'react';
import type { Property } from '../types';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import AdminInstructions from './AdminInstructions';
import NeumorphicButton from './ui/NeumorphicButton';
import { COMPANY_INFO } from '../constants';

interface AdminPanelProps {
  properties: Property[];
  onSave: (property: Property) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
  isSaving: boolean;
}

type AdminView = 'list' | 'form' | 'instructions';

const AdminPanel: React.FC<AdminPanelProps> = ({ properties, onSave, onDelete, onLogout, isSaving }) => {
  const [view, setView] = useState<AdminView>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setView('form');
  };
  
  const handleAddNew = () => {
    setSelectedProperty(null);
    setView('form');
  };

  const handleSave = (property: Property) => {
    onSave(property);
    setView('list');
    setSelectedProperty(null);
  }

  return (
    <div className="min-h-screen bg-[#e0e0e0] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-3">
             <img src={COMPANY_INFO.logoUrl} alt="Logo" className="h-14 w-auto" />
             <h1 className="text-xl sm:text-2xl font-bold text-[#153B67]">Panel de Administración</h1>
          </div>
          <NeumorphicButton onClick={onLogout} className="text-sm px-4 py-2">Cerrar Sesión</NeumorphicButton>
        </header>

        <nav className="flex flex-wrap gap-2 mb-8">
            <NeumorphicButton onClick={() => setView('list')} className={`text-sm ${view === 'list' && '!shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]'}`}>Lista de Propiedades</NeumorphicButton>
            <NeumorphicButton onClick={handleAddNew} className={`text-sm ${view === 'form' && selectedProperty === null && '!shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]'}`}>Nueva Propiedad</NeumorphicButton>
            <NeumorphicButton onClick={() => setView('instructions')} className={`text-sm ${view === 'instructions' && '!shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]'}`}>Instrucciones</NeumorphicButton>
        </nav>
        
        <main>
            {view === 'list' && <PropertyList properties={properties} onEdit={handleEdit} onDelete={onDelete} />}
            {view === 'form' && <PropertyForm property={selectedProperty} onSave={handleSave} onCancel={() => setView('list')} isSaving={isSaving} />}
            {view === 'instructions' && <AdminInstructions />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;