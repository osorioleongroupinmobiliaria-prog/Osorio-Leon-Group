
import React from 'react';

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  // FIX: Updated onClick prop to accept a mouse event to allow for event handling like stopPropagation.
  onClick?: (e: React.MouseEvent) => void;
  as?: React.ElementType;
}

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({ children, className = '', onClick, as: Component = 'div' }) => {
  const cardStyles = `
    bg-[#e0e0e0] rounded-2xl 
    shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
    transition-shadow duration-300
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <Component className={cardStyles} onClick={onClick}>
      {children}
    </Component>
  );
};

export default NeumorphicCard;
