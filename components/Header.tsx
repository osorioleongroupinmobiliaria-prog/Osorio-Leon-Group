import React from 'react';
import { COMPANY_INFO } from '../constants';
import NeumorphicButton from './ui/NeumorphicButton';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-[#e0e0e0] shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <img className="h-12 w-auto rounded-full shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]" src={COMPANY_INFO.logoUrl} alt={COMPANY_INFO.name} />
              <span className="hidden md:block text-xl font-bold text-gray-700 tracking-tight">{COMPANY_INFO.name}</span>
            </a>
          </div>
          <nav className="hidden md:flex md:space-x-4">
            {['Inicio', 'Propiedades', 'Nosotros', 'Contacto'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="w-20"></div> {/* Placeholder to keep layout balanced */}
        </div>
      </div>
    </header>
  );
};

export default Header;