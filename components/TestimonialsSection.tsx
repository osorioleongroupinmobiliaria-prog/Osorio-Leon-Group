

import React from 'react';
import { TESTIMONIALS } from '../constants';
import TestimonialCard from './TestimonialCard';
import { useI18n } from '../i18n';

const TestimonialsSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section id="testimonios" className="py-20 bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#153B67] mb-4">{t('testimonials.title')}</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">{t('testimonials.subtitle')}</p>
        </div>
        {/* FIX: Changed '-ms-overflow-style' to 'msOverflowStyle' for React style prop compatibility. */}
        <div className="flex overflow-x-auto space-x-8 pb-4 pl-4 sm:pl-6 lg:pl-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {TESTIMONIALS.map((testimonial, index) => (
            // FIX: Explicitly created a new object matching the `Testimonial` type to avoid passing an extra `commentKey` property.
            <TestimonialCard 
              key={index} 
              testimonial={{
                name: testimonial.name,
                rating: testimonial.rating,
                avatar: testimonial.avatar,
                comment: t(testimonial.commentKey)
              }} 
            />
          ))}
           <div className="flex-shrink-0 w-1 sm:w-2 lg:w-4"></div> {/* Spacer at the end */}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;