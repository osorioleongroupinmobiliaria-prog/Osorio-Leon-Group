import React, { useRef, useState, useEffect, useCallback } from 'react';
import { TESTIMONIALS } from '../constants';
import TestimonialCard from './TestimonialCard';
import { useI18n } from '../i18n';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

const TestimonialsSection: React.FC = () => {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const testimonialsWithTranslation = TESTIMONIALS.map(testimonial => ({
      ...testimonial,
      comment: t(testimonial.commentKey)
  }));

  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
        checkScrollPosition();
        container.addEventListener('scroll', checkScrollPosition, { passive: true });
        const resizeObserver = new ResizeObserver(checkScrollPosition);
        resizeObserver.observe(container);

        return () => {
            container.removeEventListener('scroll', checkScrollPosition);
            resizeObserver.unobserve(container);
        };
    }
  }, [checkScrollPosition, testimonialsWithTranslation.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const scrollAmount = direction === 'left' ? -352 : 352; // Card width (w-80) + gap (8)
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonios" className="py-20 bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#153B67] mb-4">{t('testimonials.title')}</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">{t('testimonials.subtitle')}</p>
        </div>
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-4 sm:px-6 lg:px-8"
          >
            {testimonialsWithTranslation.map((testimonial, index) => (
              <div key={index} className="snap-center">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-2 pointer-events-none">
            <button 
                onClick={() => scroll('left')} 
                disabled={!canScrollLeft}
                className={`bg-[#e0e0e0]/80 rounded-full p-2 shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[1px_1px_2px_#bebebe,-1px_-1px_2px_#ffffff] pointer-events-auto transition-opacity ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`} 
                aria-label="Previous testimonial"
            >
                <ChevronLeftIcon />
            </button>
            <button 
                onClick={() => scroll('right')}
                disabled={!canScrollRight} 
                className={`bg-[#e0e0e0]/80 rounded-full p-2 shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[1px_1px_2px_#bebebe,-1px_-1px_2px_#ffffff] pointer-events-auto transition-opacity ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`} 
                aria-label="Next testimonial"
            >
                <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;