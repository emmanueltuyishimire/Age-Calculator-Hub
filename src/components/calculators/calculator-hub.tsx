
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { categorizedNavItems } from '@/components/layout/nav-items';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

export default function CalculatorHub() {
  const categories = categorizedNavItems();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your Hub for All Age Calculators</h1>
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
                           <Link href={item.href} className="block hover:no-underline" aria-label={`Go to ${item.label} calculator`}>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">A Comprehensive Age Calculation Resource</h2>
         <p className="text-muted-foreground text-center text-lg">
            Whether you want to determine your chronological age, track your biological or metabolic age, plan for retirement with our Social Security Retirement Age Calculator, or even discover your pet’s age in human years, we have the right tool for you.
        </p>
        <div className="p-6 border rounded-lg">
             <ul className="space-y-4">
                <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Accurate & Reliable:</strong> Built on official formulas and scientific data for trustworthy results.</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Completely Free:</strong> No fees, no sign-ups. Just instant, accessible information for everyone.</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Private & Secure:</strong> All calculations are done in your browser. We never store your personal data.</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>User-Friendly:</strong> A clean, simple interface that works perfectly on any device.</span></li>
            </ul>
        </div>
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
