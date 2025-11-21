'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Store, User, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Store Visits', href: '/store-visits', icon: Store },
    { name: 'Login', href: '/login', icon: LogIn },
    { name: 'Register', href: '/register', icon: UserPlus },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white pt-16 transition-transform lg:translate-x-0">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3 px-4 py-2 text-left"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}