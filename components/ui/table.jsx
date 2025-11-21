'use client';

import React from 'react';
import { Table as ShadcnTable } from '@/components/ui/table';

const Table = React.forwardRef(({ children, className, ...props }, ref) => (
  <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
    <ShadcnTable ref={ref} className={`w-full ${className}`} {...props}>
      {children}
    </ShadcnTable>
  </div>
));

Table.displayName = 'Table';

const TableHeader = React.forwardRef(({ children, className, ...props }, ref) => (
  <thead ref={ref} className={`bg-gray-50 ${className}`} {...props}>
    <tr>
      {children}
    </tr>
  </thead>
));

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef(({ children, className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props}>
    {children}
  </tbody>
));

TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef(({ children, className, ...props }, ref) => (
  <tr 
    ref={ref} 
    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${className}`} 
    {...props}
  >
    {children}
  </tr>
));

TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef(({ children, className, ...props }, ref) => (
  <th
    ref={ref}
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </th>
));

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef(({ children, className, ...props }, ref) => (
  <td
    ref={ref}
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}
    {...props}
  >
    {children}
  </td>
));

TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef(({ children, className, ...props }, ref) => (
  <caption
    ref={ref}
    className={`mt-4 text-sm text-gray-500 ${className}`}
    {...props}
  >
    {children}
  </caption>
));

TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};