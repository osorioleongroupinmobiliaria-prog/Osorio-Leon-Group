import React from 'react';

interface NeumorphicCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
}

const NeumorphicCheckbox: React.FC<NeumorphicCheckboxProps> = ({ label, checked, onChange, name }) => {
  return (
    <label htmlFor={name} className="flex items-center cursor-pointer text-sm font-medium text-gray-700 group">
      <input 
        id={name} 
        name={name} 
        type="checkbox" 
        className="sr-only" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-150 ease-in-out 
        ${checked 
          ? 'shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]' 
          : 'shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] group-hover:shadow-[1px_1px_2px_#bebebe,-1px_-1px_2px_#ffffff]'
        }`}>
        {checked && <div className="w-2.5 h-2.5 bg-[#153B67] rounded-sm transition-all duration-150"></div>}
      </div>
      <span className="ml-3 group-hover:text-[#153B67] transition-colors">{label}</span>
    </label>
  );
};

export default NeumorphicCheckbox;
