import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { headers } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Testing Status for Apps',
  description: 'Application for tracking and managing store visit testing statuses',
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthenticated = !!session;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {isAuthenticated && <Sidebar />}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}