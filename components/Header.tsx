import React from 'react';
import { COMPANY_INFO } from '../constants';
import { useI18n } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useI18n();

  const navLinks = [
    { key: 'nav.home', href: '#inicio' },
    { key: 'nav.properties', href: '#propiedades' },
    { key: 'nav.about', href: '#nosotros' },
    { key: 'nav.contact', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#e0e0e0] shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img className="h-16 w-auto" src={COMPANY_INFO.logoUrl} alt={COMPANY_INFO.name} />
            </a>
          </div>
          <nav className="hidden md:flex md:space-x-4">
            {navLinks.map((link) => (
              <a key={link.key} href={link.href} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t(link.key)}
              </a>
            ))}
          </nav>
          <div className="md:w-auto">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;