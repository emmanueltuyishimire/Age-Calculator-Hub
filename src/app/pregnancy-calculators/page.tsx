
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categorizedNavItems } from '@/components/layout/nav-items';

export default function PregnancyCalculatorsHub() {
  const pregnancyNavItems = categorizedNavItems().find(cat => cat.name === 'Pregnancy Calculators')?.items || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pregnancy Calculators Hub</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our free pregnancy tools to calculate your due date, pregnancy progress, and ovulation window. Simple, fast, and accurate calculators to support every stage of your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pregnancyNavItems.map((item) => (
          <Link href={item.href} key={item.href} className="block hover:no-underline">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-2">
                  <item.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg sm:text-xl">{item.label}</CardTitle>
                </div>
                <CardDescription className="text-sm">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
