
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { categorizedNavItems } from '@/components/layout/nav-items';
import { Button } from '../ui/button';

export default function CalculatorHub() {
  const categories = categorizedNavItems();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Age Calculators Hub</h1>
         <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome to Age Calculator Hub, your ultimate free online destination for accurate and easy-to-use age-related tools.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#calculators">Explore Calculators</Link>
          </Button>
           <Button size="lg" variant="outline" asChild>
            <Link href="/faq">View All FAQs</Link>
          </Button>
        </div>
      </div>

      <div id="calculators">
        {categories.map((category) => (
          <section className="mb-12" key={category.name}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Card key={item.href} className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out hover:border-primary group">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                          <item.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                           <Link href={item.href} className="block hover:no-underline">
                              <CardTitle className="text-xl group-hover:underline">{item.label}</CardTitle>
                          </Link>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 space-y-8 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Your Comprehensive Age Calculation Resource</h2>
        <p className="text-muted-foreground text-center text-lg">
            Whether you want to determine your chronological age, track your biological or metabolic age, plan for retirement with our Social Security Retirement Age Calculator, or even discover your pet’s age in human years, we have the right tool for you.
        </p>
         <p className="text-muted-foreground text-center text-lg">
            Explore our comprehensive collection of online age calculators, including birthday age calculators, age calculators by date of birth or year, gestational age calculators, and more. Our calculators are designed to provide real-time results in years, months, days, hours, minutes, and seconds, ensuring you get precise insights whenever you need them.
        </p>
         <p className="text-muted-foreground text-center text-lg">
            Stay informed and plan ahead with our professional tips, FAQs, and examples integrated into every tool. With fast, reliable, and responsive calculators, Age Calculator Hub makes it simple to understand and track age for yourself, your family, or your furry friends. Start calculating now and see how age truly measures up!
        </p>
      </section>

      <section className="mt-16">
        <Card className="bg-muted/50">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">I don't know where to start</CardTitle>
                <CardDescription className="max-w-2xl mx-auto">
                   Let us guide you through our suite of tools and show you how to get the most out of them.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <Button size="lg" asChild>
                    <Link href="/articles/your-complete-guide-to-age-calculators">Your Complete Guide to the Age Calculator Hub</Link>
                </Button>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
