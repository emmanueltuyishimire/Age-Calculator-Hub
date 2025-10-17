
"use client";

import React, { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { navItems } from './nav-items';
import { articles } from '@/lib/articles';

// Create a lookup map for faster access
const pathLabelMap = new Map<string, string>();
navItems.forEach(item => pathLabelMap.set(item.href, item.label));
articles.forEach(article => pathLabelMap.set(`/articles/${article.slug}`, article.title));

// Add hub pages manually
pathLabelMap.set('/articles', 'Articles');
pathLabelMap.set('/financial-calculators', 'Financial Calculators');
pathLabelMap.set('/health-fitness-calculators', 'Health & Fitness Calculators');
pathLabelMap.set('/math-calculators', 'Math Calculators');
pathLabelMap.set('/other-calculators', 'Other Calculators');


export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  if (pathname === '/') {
    return null; // No breadcrumbs on the homepage
  }

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = pathLabelMap.get(href) || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const isLast = index === pathSegments.length - 1;
    
    return { href, label, isLast };
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://innerpeacejournals.com'}`
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://innerpeacejournals.com'}${item.href}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href}>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              {item.isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
