import React from 'react';

// FIX: Replaced React.HTMLProps with a discriminated union based on the 'as' prop.
// This ensures type safety and allows TypeScript to correctly infer props for 'input', 'textarea', and 'select' elements,
// which also resolves downstream `e.target.value` errors in other components.
type NeumorphicInputProps = {
  containerClassName?: string;
} & (
  | (React.ComponentPropsWithoutRef<'input'> & { as?: 'input' })
  | (React.ComponentPropsWithoutRef<'textarea'> & { as: 'textarea' })
  | (React.ComponentPropsWithoutRef<'select'> & { as: 'select' })
);

const NeumorphicInput: React.FC<NeumorphicInputProps> = ({ as = 'input', className = '', containerClassName = '', ...props }) => {
  const containerStyles = `bg-[#e0e0e0] rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] p-1 ${containerClassName}`;
  const inputStyles = `w-full bg-transparent border-none focus:outline-none focus:ring-0 p-3 text-gray-700 placeholder-gray-500 ${className}`;
  
  const Component = as;

  return (
    <div className={containerStyles}>
      {/* 
        The `props` are cast to `any` here as a pragmatic way to handle the discriminated union 
        in this polymorphic component structure. The public API is still type-safe due to `NeumorphicInputProps`.
      */}
      <Component className={inputStyles} {...(props as any)} />
    </div>
  );
};

export default NeumorphicInput;
