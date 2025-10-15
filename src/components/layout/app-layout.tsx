
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TopNav } from './top-nav';
import { ThemeToggle } from './theme-toggle';
import { Footer } from './footer';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-6">
                <Image src="/logo.png" alt="Calculators Logo" width={24} height={24} className="h-6 w-6" priority />
                <span className="hidden font-bold sm:inline-block">Calculators</span>
            </Link>
             <TopNav />
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
