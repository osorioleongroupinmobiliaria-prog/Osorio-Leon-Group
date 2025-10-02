

import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import StarRating from './StarRating';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <NeumorphicCard className="flex-shrink-0 w-80 p-6 flex flex-col">
    <div className="flex items-center mb-4">
      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]" />
      <div>
        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
    <p className="text-gray-600 text-sm flex-grow">"{testimonial.comment}"</p>
  </NeumorphicCard>
);

export default TestimonialCard;