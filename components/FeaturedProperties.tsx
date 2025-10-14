import React, { useRef, useEffect, useCallback, useState } from 'react';
import type { Property } from '../types';
import PropertyCard from './PropertyCard';
import { useI18n } from '../i18n';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface FeaturedPropertiesProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties, onPropertySelect }) => {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      
      const timer = setTimeout(checkScrollability, 100);

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
        clearTimeout(timer);
      };
    }
  }, [checkScrollability, properties.length]);

  const handleNavClick = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.9;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const NavButton: React.FC<{ direction: 'left' | 'right', onClick: () => void, disabled: boolean }> = ({ direction, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center
        bg-[#e0e0e0] text-gray-600
        shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] 
        hover:shadow-[2px_2px_5px_#bebebe,-2px_-2px_5px_#ffffff]
        active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all duration-200
        hidden md:flex
        ${direction === 'left' ? 'left-0' : 'right-0'}`
      }
      aria-label={direction === 'left' ? t('testimonials.prev') : t('testimonials.next')}
    >
      {direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#153B67] mb-8 sm:mb-10">{t('featuredProperties.title')}</h2>
        <div className="relative">
          <NavButton direction="left" onClick={() => handleNavClick('left')} disabled={!canScrollLeft} />
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth py-4 scrollbar-hide -mx-2 sm:-mx-6 lg:-mx-8 px-2 sm:px-6 lg:px-8"
          >
            {properties.map(prop => (
              <div key={prop.id} className="flex-shrink-0 w-[85vw] sm:w-[420px] md:w-[450px]">
                <PropertyCard property={prop} onVerMas={onPropertySelect} />
              </div>
            ))}
          </div>
          <NavButton direction="right" onClick={() => handleNavClick('right')} disabled={!canScrollRight} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;