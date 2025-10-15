"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { categorizedNavItems } from '@/components/layout/nav-items';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

export default function CalculatorHub() {
  const categories = categorizedNavItems().filter(cat => cat.name !== 'Company' && cat.name !== 'Legal' && cat.name !== 'Navigation');

  return (
    <div className="relative overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 dark:opacity-10"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className="container mx-auto px-4 pt-16 pb-16 sm:pt-20 sm:pb-20 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-foreground/80 text-transparent bg-clip-text">The Ultimate Calculator Hub</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Your central hub for free, accurate online calculators. From finance and health to math and everyday conversions, find the tool you need.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#calculators">Explore All Calculators</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>

        <div id="calculators">
          {categories.map((category) => (
            <section className="mb-16" key={category.name}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">{category.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <Link href={item.href} key={item.href} className="block hover:no-underline group">
                      <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out group-hover:border-primary/50 group-hover:bg-accent/50">
                          <CardHeader>
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                      <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                  </div>
                                <CardTitle className="text-lg">{item.label}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription>{item.description}</CardDescription>
                          </CardContent>
                      </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 space-y-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">A Comprehensive & Reliable Resource</h2>
          <p className="text-muted-foreground text-center text-lg sm:text-xl">
              Whether you need to calculate a mortgage payment, check your BMI, or find your pet's age in human years, we have a precise and easy-to-use tool for you.
          </p>
          <div className="p-6 border rounded-lg bg-card">
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
                  <CardTitle className="text-2xl sm:text-3xl">Don't Know Where to Start?</CardTitle>
                  <CardDescription className="max-w-2xl mx-auto text-base sm:text-lg">
                    Let us guide you through our suite of tools and show you how to get the most out of them.
                  </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                  <Button size="lg" asChild>
                      <Link href="/articles/your-complete-guide-to-age-calculators">Read Our Complete Guide</Link>
                  </Button>
              </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
