'use client';

import React from 'react';
import { Label } from '@/components/ui/label';

const Input = React.forwardRef(({ className, type, label, id, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </Label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export { Input };