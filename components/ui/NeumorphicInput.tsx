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
  const containerStyles = `relative bg-[#e0e0e0] rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] p-1 ${containerClassName}`;
  
  // Add 'appearance-none' to hide default browser styling, especially for select arrows
  let inputStyles = `w-full bg-transparent border-none focus:outline-none focus:ring-0 p-3 text-gray-700 placeholder-gray-500 appearance-none ${className}`;
  
  // Add right padding to select to make space for the custom arrow
  if (as === 'select') {
    inputStyles += ' pr-10';
  }
  
  const Component = as;

  return (
    // The container now has a 'relative' class for positioning children
    <div className={containerStyles}>
      {/* 
        The `props` are cast to `any` here as a pragmatic way to handle the discriminated union 
        in this polymorphic component structure. The public API is still type-safe due to `NeumorphicInputProps`.
      */}
      <Component className={inputStyles} {...(props as any)} />
      {/* Conditionally render a custom arrow icon for select elements */}
      {as === 'select' && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-current">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default NeumorphicInput;