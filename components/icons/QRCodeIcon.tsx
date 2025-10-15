import React from 'react';

const QRCodeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
    <line x1="14" y1="14" x2="14" y2="14.01"></line>
    <line x1="17" y1="14" x2="21" y2="14"></line>
    <line x1="14" y1="17" x2="17" y2="17"></line>
    <line x1="17" y1="21" x2="21" y2="21"></line>
    <line x1="21" y1="17" x2="21" y2="21"></line>
  </svg>
);

export default QRCodeIcon;