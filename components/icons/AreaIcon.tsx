
import React from 'react';

const AreaIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 3H3v18h18V3z" />
    <path d="M15 9v6" />
    <path d="M9 15V9" />
    <path d="M9 9h6" />
  </svg>
);

export default AreaIcon;
