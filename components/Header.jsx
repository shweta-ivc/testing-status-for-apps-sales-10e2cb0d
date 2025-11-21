'use client';

import React from 'react';
import { Home, BarChart3, MapPin, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored auth tokens
    localStorage.removeItem('token');
    // Redirect to login page
    router.push('/login');
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => router.push('/dashboard')}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => router.push('/store-visits')}
          >
            <MapPin className="h-4 w-4" />
            Store Visits
          </Button>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}