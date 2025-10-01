
import React from 'react';

const BedIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16" />
    <path d="M2 12h20" />
    <path d="M12 4v16" />
    <path d="M22 12h-4" />
    <path d="M6 12H2" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M20 16.5a2.5 2.5 0 0 0-5 0" />
    <path d="M4 16.5a2.5 2.5 0 0 1 5 0" />
  </svg>
);

export default BedIcon;
