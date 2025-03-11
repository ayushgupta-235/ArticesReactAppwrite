import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          className="block mb-1 pl-1 text-gray-700 font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        type={type}
        className={`w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        ref={ref}
        {...props} 
        id={id}
      />
    </div>
  );
});

export default Input;
