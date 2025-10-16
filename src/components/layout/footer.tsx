
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categorizedNavItems } from './nav-items';

export function Footer() {
  const [year, setYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const categories = categorizedNavItems().filter(cat => 
    !['Navigation', 'Company', 'Legal'].includes(cat.name)
  );

  return (
    <footer className="py-8 md:py-12 bg-background border-t">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map(category => {
              const categoryHref = `/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
              return (
                <div key={category.name}>
                    <h3 className="font-bold mb-4">
                      <Link href={categoryHref} className="hover:text-primary hover:underline">
                        {category.name}
                      </Link>
                    </h3>
                    <ul className="space-y-2">
                        {category.items.slice(0, 5).map(item => (
                            <li key={item.href}>
                                <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                                {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
              );
            })}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
                <Image src="/logo.png" alt="Calculators Logo" width={24} height={24} className="h-6 w-6" />
                <span className="font-bold">Calculators</span>
            </div>
             <p className="text-xs text-muted-foreground mt-4 sm:mt-0">
             © {year} Calculators. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}
