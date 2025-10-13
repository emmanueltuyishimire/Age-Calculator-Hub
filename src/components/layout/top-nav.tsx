"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import { Menu, Stethoscope } from 'lucide-react';
import { navItems } from './nav-items';

export function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors hover:text-foreground/80 ${
              pathname === item.href ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="px-2 py-6">
            <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsOpen(false)}>
              <Stethoscope className="h-6 w-6" />
              <span className="font-bold">Age Calculator Hub</span>
            </Link>
            <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`-mx-3 flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </Link>
            ))}
            </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
