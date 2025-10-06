import React, { useRef, useEffect, useCallback, useState } from 'react';
import { TESTIMONIALS } from '../constants';
import TestimonialCard from './TestimonialCard';
import { useI18n } from '../i18n';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

const TestimonialsSection: React.FC = () => {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const testimonialsWithTranslation = TESTIMONIALS.map(testimonial => ({
      ...testimonial,
      comment: t(testimonial.commentKey)
  }));
  
  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Use a small buffer (e.g., 1px) to account for fractional pixel values
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
  }, [checkScrollability, testimonialsWithTranslation.length]);

  const handleNavClick = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of visible width
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
        bg-white/10 backdrop-blur-md border border-white/20 text-white 
        hover:bg-white/20
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all duration-200
        hidden md:flex
        ${direction === 'left' ? 'left-0' : 'right-0'}`
      }
      aria-label={direction === 'left' ? t('propertyGrid.sortOptions.priceAsc') : t('propertyGrid.sortOptions.priceDesc')}
    >
      {direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );

  return (
    <section 
      id="testimonios" 
      className="py-12 sm:py-20 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://lh3.googleusercontent.com/pw/AP1GczMoom0Ce5RAG0bQEFsf08cgCLjCNdfqbZymAz7qhPJ5ean2R93IjXjTONeUuxkQVt37fsK9kW7y9YSmkwUN5VaAsV7VgHO-oMySDaBtn6Dyom4c7_RvjG56FNEGdHhp3OsQpl0wEImTybVpjKFJeMAs=w1344-h768-s-no-gm?authuser=0')"
      }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 px-2 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{t('testimonials.title')}</h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-200">{t('testimonials.subtitle')}</p>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-12">
          <NavButton direction="left" onClick={() => handleNavClick('left')} disabled={!canScrollLeft} />
          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 sm:space-x-8 overflow-x-auto scroll-smooth py-4 scrollbar-hide"
          >
            {testimonialsWithTranslation.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          <NavButton direction="right" onClick={() => handleNavClick('right')} disabled={!canScrollRight} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;