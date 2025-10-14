
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categorizedNavItems } from '@/components/layout/nav-items';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pet Age Calculators - Dog & Cat Age in Human Years',
    description: 'Ever wonder how old your furry friend is in human years? Use our specialized calculators for dogs and cats to better understand their life stage, health, and care needs.',
    alternates: {
        canonical: '/pet-age-calculators',
    },
};

export default function PetAgeCalculatorsHub() {
  const navItems = categorizedNavItems().find(cat => cat.name === 'Pet Age')?.items || [];

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pet Age Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Ever wonder how old your furry friend is in human years? Use our specialized calculators for dogs and cats to better understand their life stage and care needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className="block hover:no-underline">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-2">
                  <item.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  <CardTitle className="text-lg sm:text-xl">{item.label}</CardTitle>
                </div>
                <CardDescription className="text-sm">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
