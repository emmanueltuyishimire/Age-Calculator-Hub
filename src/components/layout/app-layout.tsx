
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TopNav } from './top-nav';
import { navItems } from './nav-items';
import { ThemeToggle } from './theme-toggle';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const toolItems = navItems.filter(item => 
    item.category !== 'Navigation' && 
    item.category !== 'Company' && 
    item.category !== 'Legal' && 
    item.href !== '/'
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center mr-6">
            <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="Age Calculator Hub Logo" width={24} height={24} className="h-6 w-6" priority />
                <span className="hidden font-bold sm:inline-block">Age Calculator Hub</span>
            </Link>
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-2">
            <TopNav />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-8 md:py-12 bg-background border-t">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Calculators</h3>
              <ul className="space-y-2">
                {toolItems.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <Link href="/" className="flex items-center space-x-2">
                  <Image src="/logo.png" alt="Age Calculator Hub Logo" width={24} height={24} className="h-6 w-6" />
                  <span className="font-bold">Age Calculator Hub</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Your go-to source for a wide variety of free and accurate age-related calculators.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
             © {new Date().getFullYear()} Age Calculator Hub. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
