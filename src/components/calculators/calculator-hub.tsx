"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categorizedNavItems, type NavCategory } from '@/components/layout/nav-items';

export default function CalculatorHub() {
  const categories: NavCategory[] = categorizedNavItems();
  const midPoint = Math.ceil(categories.length / 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Age Calculators Hub</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-4xl mx-auto">
          Welcome to Age Calculators Hub, your ultimate online destination for accurate and easy-to-use age calculators. Whether you want to determine your chronological age, track your biological or metabolic age, plan for retirement with our Social Security Retirement Age Calculator, or even discover your pet’s age in human years, we have the right tool for you.
        </p>
        <p className="text-md md:text-lg text-muted-foreground max-w-4xl mx-auto mt-4">
          Explore our comprehensive collection of online age calculators, including birthday age calculators, age calculators by date of birth or year, gestational age calculators, and more. Our calculators are designed to provide real-time results in years, months, days, hours, minutes, and seconds, ensuring you get precise insights whenever you need them.
        </p>
         <p className="text-md md:text-lg text-muted-foreground max-w-4xl mx-auto mt-4">
          Stay informed and plan ahead with our professional tips, FAQs, and examples integrated into every tool. With fast, reliable, and responsive calculators, Age Calculators Hub makes it simple to understand and track age for yourself, your family, or your furry friends. Start calculating now and see how age truly measures up!
        </p>
      </div>
      
      {/* Top Ad Slot */}
      <div className="my-8 text-center" aria-label="Advertisement">
        <div className="ad-slot border-dashed border-2 p-10 min-h-[100px] sm:min-h-[250px] flex items-center justify-center">
            <span className="text-muted-foreground">Ad Placeholder</span>
        </div>
      </div>

      <div className="space-y-12">
        {categories.map((category, index) => (
          <React.Fragment key={category.name}>
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{category.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
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
            </section>
            
            {index === midPoint - 1 && (
                 <div className="my-8 text-center" aria-label="Advertisement">
                    <div className="ad-slot border-dashed border-2 p-10 min-h-[100px] sm:min-h-[250px] flex items-center justify-center">
                         <span className="text-muted-foreground">Ad Placeholder</span>
                    </div>
                </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}