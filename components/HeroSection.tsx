import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import { COMPANY_INFO } from '../constants';

const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="relative py-20 md:py-32">
       <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{backgroundImage: "url('https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg')"}}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <NeumorphicCard className="inline-block p-8 md:p-12 bg-opacity-80">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Tu Hogar y Tu Inversión,<br />
            <span className="text-[#153B67]">Nuestra Prioridad</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 uppercase tracking-wider font-semibold">
            {COMPANY_INFO.slogan}
          </p>
          <div className="mt-10">
            <a
              href="#propiedades"
              className="inline-block bg-[#e0e0e0] rounded-xl text-gray-700 font-semibold shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[2px_2px_5px_#bebebe,-2px_-2px_5px_#ffffff] active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 ease-in-out focus:outline-none px-8 py-4 text-lg"
            >
              Ver Propiedades
            </a>
          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
};

export default HeroSection;