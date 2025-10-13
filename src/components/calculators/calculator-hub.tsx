
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categorizedNavItems, type NavCategory } from '@/components/layout/nav-items';

export default function CalculatorHub() {
  const categories: NavCategory[] = categorizedNavItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to the Age Calculator Hub</h1>
        <p className="text-lg text-muted-foreground">Your one-stop destination for a variety of age-related calculators.</p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.name}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Link href={item.href} key={item.href} className="block hover:no-underline">
                  <Card className="h-full hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <item.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="text-xl">{item.label}</CardTitle>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
