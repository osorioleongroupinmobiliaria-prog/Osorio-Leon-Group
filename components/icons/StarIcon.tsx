
import React from 'react';

interface StarIconProps {
  className?: string;
  fillColor?: string;
  strokeColor?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ className = 'w-5 h-5', fillColor = 'currentColor', strokeColor = 'currentColor' }) => (
  <svg 
    className={className} 
    fill={fillColor}
    stroke={strokeColor}
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default StarIcon;
