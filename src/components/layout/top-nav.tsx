
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { categorizedNavItems } from './nav-items';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const categories = categorizedNavItems();
  const mainCategories = categories.filter(cat => cat.name !== 'Company' && cat.name !== 'Legal');

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main navigation">
        <Link
            href="/"
            aria-label="Go to Homepage"
            className={`transition-colors hover:text-foreground/80 ${
              pathname === '/' ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            Home
          </Link>
          <Link
            href="/articles"
            aria-label="View all articles"
            className={`transition-colors hover:text-foreground/80 ${
              pathname === '/articles' ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            Articles
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {mainCategories.map(category => (
                 <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger aria-label={`Open ${category.name} menu`}>{category.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {category.items.map((item) => (
                           <ListItem
                              key={item.label}
                              title={item.label}
                              href={item.href}
                              aria-label={`Go to ${item.label}`}
                              >
                              {item.description}
                          </ListItem>
                      ))}
                      </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
          <SheetContent side="left">
             <SheetHeader className="px-2 py-6">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for Calculator Hub, including links to all calculators.</SheetDescription>
                 <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsOpen(false)}>
                    <Image src="/logo.png" alt="Calculator Hub Logo" width={24} height={24} className="h-6 w-6" priority />
                    <span className="font-bold">Calculator Hub</span>
                </Link>
            </SheetHeader>
            <nav role="navigation" aria-label="Mobile menu">
              <div className="px-2">
              <div className="flex flex-col gap-1">
                <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    aria-label="Go to Homepage"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === '/' ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                  >
                    Home
                </Link>
                <Link
                    href="/articles"
                    onClick={() => setIsOpen(false)}
                    aria-label="View all articles"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === '/articles' ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                  >
                    Articles
                </Link>
                <Accordion type="single" collapsible className="w-full" aria-label="Calculator Categories">
                  {categories.map((category) => (
                    <AccordionItem value={category.name} key={category.name}>
                       <AccordionTrigger className="text-base font-semibold py-2">
                          <span className="flex flex-1 items-center justify-between">
                            {category.name}
                          </span>
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


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
