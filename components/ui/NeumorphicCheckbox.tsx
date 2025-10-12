
import React from 'react';

interface NeumorphicCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  variant?: 'neumorphic' | 'glassmorphic';
}

const NeumorphicCheckbox: React.FC<NeumorphicCheckboxProps> = ({ label, checked, onChange, name, variant = 'neumorphic' }) => {
  const isNeumorphic = variant === 'neumorphic';
  
  const labelStyles = isNeumorphic ? 'text-gray-700' : 'text-white';
  const boxStyles = isNeumorphic
    ? checked 
      ? 'shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]' 
      : 'shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] group-hover:shadow-[1px_1px_2px_#bebebe,-1px_-1px_2px_#ffffff]'
    : checked
      ? 'bg-white/30 border border-white/50'
      : 'bg-white/10 border border-white/30 group-hover:bg-white/20';
  const checkedIndicatorStyles = isNeumorphic ? 'bg-[#153B67]' : 'bg-white';
  const hoverTextStyles = isNeumorphic ? 'group-hover:text-[#153B67]' : 'group-hover:text-gray-200';

  return (
    <label htmlFor={name} className={`flex items-center cursor-pointer text-sm font-medium group ${labelStyles}`}>
      <input 
        id={name} 
        name={name} 
        type="checkbox" 
        className="sr-only" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-150 ease-in-out 
        ${boxStyles}`}>
        {checked && <div className={`w-2.5 h-2.5 rounded-sm transition-all duration-150 ${checkedIndicatorStyles}`}></div>}
      </div>
      <span className={`ml-3 transition-colors ${hoverTextStyles}`}>{label}</span>
    </label>
  );
};

export default NeumorphicCheckbox;
