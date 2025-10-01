
import React from 'react';

const BathIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0L3 5" />
    <path d="m2 2 1.1 1.1" />
    <path d="M21 12.5V12a3 3 0 0 0-3-3H6" />
    <path d="M3 12a3 3 0 0 0 3 3h1" />
    <path d="M3 18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2.5" />
    <path d="M12 15v6" />
    <path d="M10 9v.01" />
  </svg>
);

export default BathIcon;
