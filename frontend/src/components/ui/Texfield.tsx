import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm bg-white border-gray-300 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  ),
);

Textfield.displayName = 'Textfield';

export default Textfield;
