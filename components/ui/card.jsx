'use client';

import React from 'react';
import { Card as ShadcnCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function Card({ title, description, children, footer, className = '' }) {
  return (
    <ShadcnCard className={`shadow-sm rounded-lg overflow-hidden ${className}`}>
      <CardHeader className="border-b border-gray-200 pb-4">
        {title && <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>}
        {description && <CardDescription className="text-sm text-gray-600">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="border-t border-gray-200 pt-4">
          {footer}
        </CardFooter>
      )}
    </ShadcnCard>
  );
}