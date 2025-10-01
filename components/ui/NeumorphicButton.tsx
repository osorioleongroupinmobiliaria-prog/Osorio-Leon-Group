
import React from 'react';

interface NeumorphicButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({ children, className = '', onClick, type = 'button' }) => {
  const buttonStyles = `
    bg-[#e0e0e0] rounded-xl
    text-gray-700 font-semibold
    shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]
    hover:shadow-[2px_2px_5px_#bebebe,-2px_-2px_5px_#ffffff]
    active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]
    transition-all duration-150 ease-in-out
    focus:outline-none
    px-6 py-3
    ${className}
  `;

  return (
    <button type={type} className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default NeumorphicButton;
