
import React from 'react';
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-[#153B67]">{COMPANY_INFO.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{COMPANY_INFO.slogan}</p>
            <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>{COMPANY_INFO.address}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#153B67]">Enlaces Rápidos</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#inicio" className="text-gray-600 hover:text-gray-900">Inicio</a></li>
              <li><a href="#propiedades" className="text-gray-600 hover:text-gray-900">Propiedades</a></li>
              <li><a href="#nosotros" className="text-gray-600 hover:text-gray-900">Nosotros</a></li>
              <li><a href="#contacto" className="text-gray-600 hover:text-gray-900">Contacto</a></li>
              <li><a href={SOCIAL_LINKS.reviews} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">Escribe una Reseña</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#153B67]">Contacto</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>{COMPANY_INFO.phones[0]}</li>
                <li>{COMPANY_INFO.phones[1]}</li>
                <li>{COMPANY_INFO.email}</li>
            </ul>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a href={SOCIAL_LINKS.whatsapp1} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500" title="WhatsApp 1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.505 1.905 6.431l-1.287 4.705 4.752-1.247z"/></svg>
              </a>
               <a href={SOCIAL_LINKS.whatsapp2} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500" title="WhatsApp 2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.505 1.905 6.431l-1.287 4.705 4.752-1.247z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600" title="Facebook">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
              </a>
               <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600" title="Instagram">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
              </a>
               <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600" title="YouTube">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
               <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black" title="TikTok">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.43-2.8-1.58-1.87-2.44-4.14-2.43-6.42.01-1.28.2-2.57.58-3.79.43-1.4.99-2.73 1.69-3.98.69-1.25 1.53-2.4 2.5-3.45.95-1.04 2.04-1.94 3.23-2.68.22-.14.47-.25.72-.35.01 0 .02-.01.03-.02z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.</p>
        </div>
      </div>
      <a href="/acceso-digital-osorio" className="absolute bottom-1 right-1 text-[8px] font-mono text-gray-400/30 hover:text-gray-500/80 transition-colors">
        OSORIO & LEON GROUP
      </a>
    </footer>
  );
};

export default Footer;
