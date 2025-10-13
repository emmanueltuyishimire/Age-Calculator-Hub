"use client";

import React from 'react';
import { Stethoscope } from 'lucide-react';
import { TopNav } from './top-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <a href="/" className="mr-6 flex items-center space-x-2">
                <Stethoscope className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">Age Calculator Hub</span>
            </a>
            <TopNav />
          </div>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
                {/* Right side content can go here if needed */}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
