
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TopNav } from './top-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-2 md:mr-6 flex items-center space-x-2">
                <Image src="/Age Calculators Hub logo.jpeg" alt="Age Calculator Hub Logo" width={24} height={24} className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">Age Calculator Hub</span>
            </Link>
            <TopNav />
          </div>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
                {/* Right side content can go here if needed */}
            </div>
          </div>
        </div>
      </header>
      {children}
      <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by your friendly AI companion.
            </p>
        </div>
      </footer>
    </div>
  );
}
