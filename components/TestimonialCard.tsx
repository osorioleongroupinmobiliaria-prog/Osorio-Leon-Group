import React from 'react';
import StarRating from './StarRating';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="w-72 sm:w-80 h-full rounded-2xl bg-black/20 backdrop-blur-lg border border-white/20 shadow-xl p-4 sm:p-6 flex flex-col">
    <div className="flex items-center mb-3 sm:mb-4">
      <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border-2 border-white/30" />
      <div>
        <h4 className="font-bold text-white">{testimonial.name}</h4>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
    <p className="text-gray-200 text-xs sm:text-sm flex-grow">"{testimonial.comment}"</p>
  </div>
);

export default TestimonialCard;