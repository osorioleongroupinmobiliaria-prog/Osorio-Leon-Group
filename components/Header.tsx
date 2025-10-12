import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../constants';
import { useI18n } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // scrolling down
          setVisible(false);
        } else { // scrolling up
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  const navLinks = [
    { key: 'nav.home', href: '#inicio' },
    { key: 'nav.properties', href: '#propiedades' },
    { key: 'nav.about', href: '#nosotros' },
    { key: 'nav.contact', href: '#contacto' },
  ];

  return (
    <header className={`sticky top-0 z-30 bg-black/20 backdrop-blur-lg border-b border-white/30 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img className="h-14 sm:h-16 w-auto" src={COMPANY_INFO.logoUrl} alt={COMPANY_INFO.name} />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <a key={link.key} href={link.href} className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t(link.key)}
                </a>
              ))}
            </div>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/20 backdrop-blur-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white/80 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;