
import React from 'react';

const GarageIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 20a1.5 1.5 0 0 0 3 0m9 0a1.5 1.5 0 0 0 3 0" />
    <path d="M19 17h-11a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v2" />
    <path d="M19 12H6.5" />
    <path d="m5 17 2.5-2.5" />
    <path d="M14 5l2 2" />
    <path d="M5 7V4a1 1 0 0 1 1-1h1" />
  </svg>
);

export default GarageIcon;
