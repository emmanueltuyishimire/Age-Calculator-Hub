
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TopNav } from './top-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
                <Image src="/Age Calculators Hub logo.jpeg" alt="Age Calculator Hub Logo" width={24} height={24} className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">Age Calculator Hub</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <TopNav />
          </div>
        </div>
      </header>
      {children}
      <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center text-sm text-muted-foreground">
               <Link href="/about" className="hover:text-primary">About Us</Link>
               <Link href="/contact" className="hover:text-primary">Contact</Link>
               <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
               <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
               <Link href="/disclaimer" className="hover:text-primary">Disclaimer</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
