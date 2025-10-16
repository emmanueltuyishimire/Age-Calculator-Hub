
"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { categorizedNavItems } from './nav-items';
import Image from 'next/image';

export function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const categories = categorizedNavItems();
  const mainCategories = categories.filter(cat => cat.name !== 'Company' && cat.name !== 'Legal' && cat.name !== 'Navigation');
  
  const navLinkStyle = "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 text-sm" aria-label="Main navigation">
        <Link
          href="/"
          className={cn(navLinkStyle, 'font-semibold', {
            'bg-accent/50': pathname === '/',
          })}
        >
          Home
        </Link>

        {mainCategories.map(category => {
          return (
            <Link
              key={category.name}
              href={category.href}
              className={cn(navLinkStyle, 'font-semibold', {
                'bg-accent/50': pathname.startsWith(category.href),
              })}
            >
              {category.name}
            </Link>
          );
        })}
        <Link
          href="/articles"
          className={cn(navLinkStyle, 'font-semibold', {
            'bg-accent/50': pathname.startsWith('/articles'),
          })}
        >
          Articles
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
             <SheetHeader className="px-2 py-6">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for Calculators, including links to all calculators.</SheetDescription>
                 <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsOpen(false)}>
                    <Image src="/logo.png" alt="Calculators Logo" width={24} height={24} className="h-6 w-6" priority />
                    <span className="font-bold">Calculators</span>
                </Link>
            </SheetHeader>
            <nav role="navigation" aria-label="Mobile menu">
              <div className="px-2">
              <div className="flex flex-col gap-1">
                {categories.find(c => c.name === 'Navigation')?.items.map(item => (
                  <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      aria-label={item.label}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        pathname === item.href ? 'bg-muted' : 'hover:bg-muted/50'
                      }`}
                    >
                      {item.label}
                  </Link>
                ))}
                <Accordion type="single" collapsible className="w-full" aria-label="Calculator Categories">
                  {mainCategories.map((category) => (
                    <AccordionItem value={category.name} key={category.name}>
                       <AccordionTrigger className="text-base font-semibold py-2">
                            {category.name}
                       </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-4">
                          {category.items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                aria-label={`Go to ${item.label}`}
                                className={`-mx-3 block rounded-lg px-3 py-2 text-base leading-7 ${
                                  pathname === item.href ? 'bg-muted text-primary' : 'hover:bg-muted/50'
                                }`}
                              >
                                {item.label}
                              </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
