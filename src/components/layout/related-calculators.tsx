
"use client";

import React from 'react';
import Link from 'next/link';
import { categorizedNavItems } from './nav-items';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface RelatedCalculatorsProps {
  currentCategory: string;
  currentHref: string;
}

function RelatedCalculators({ currentCategory, currentHref }: RelatedCalculatorsProps) {
  const category = categorizedNavItems().find(cat => cat.name === currentCategory);
  if (!category) return null;

  // Filter out the current page and the main category hub page
  let relatedItems = category.items.filter(item => 
    item.href !== currentHref && item.href !== category.href
  );

  if (relatedItems.length === 0) return null;

  return (
    <section className="mt-16 animate-fade-in" aria-labelledby="related-calculators-heading">
      <h2 id="related-calculators-heading" className="text-2xl md:text-3xl font-bold mb-6 text-center">Related Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedItems.slice(0, 3).map((item) => (
          <Link href={item.href} key={item.href} className="block hover:no-underline group">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out group-hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <CardTitle className="text-lg group-hover:text-primary">{item.label}</CardTitle>
                </div>
                <CardDescription className="text-sm">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default React.memo(RelatedCalculators);
