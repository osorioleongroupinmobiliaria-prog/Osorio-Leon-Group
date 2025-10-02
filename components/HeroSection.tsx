
import React, { useState, useEffect } from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import { COMPANY_INFO } from '../constants';
import { useI18n } from '../i18n';

const HeroSection: React.FC = () => {
  const { t } = useI18n();
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="inicio" className="relative py-20 md:py-32 overflow-hidden">
       <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/pw/AP1GczMoom0Ce5RAG0bQEFsf08cgCLjCNdfqbZymAz7qhPJ5ean2R93IjXjTONeUuxkQVt37fsK9kW7y9YSmkwUN5VaAsV7VgHO-oMySDaBtn6Dyom4c7_RvjG56FNEGdHhp3OsQpl0wEImTybVpjKFJeMAs=w1344-h768-s-no-gm?authuser=0')",
            transform: `translateY(${offsetY * 0.2}px)`
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <NeumorphicCard className="inline-block p-8 md:p-12 bg-opacity-80">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight whitespace-pre-line">
            {t('hero.title.line1')}
            <br />
            <span className="text-[#153B67]">{t('hero.title.line2')}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 uppercase tracking-wider font-semibold">
            {t(COMPANY_INFO.sloganKey)}
          </p>
          <div className="mt-10">
            <a
              href="#propiedades"
              className="inline-block bg-[#e0e0e0] rounded-xl text-gray-700 font-semibold shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[2px_2px_5px_#bebebe,-2px_-2px_5px_#ffffff] active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 ease-in-out focus:outline-none px-8 py-4 text-lg"
            >
              {t('hero.button')}
            </a>
          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
};

export default HeroSection;
