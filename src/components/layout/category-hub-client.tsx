"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categorizedNavItems } from '@/components/layout/nav-items';

interface CategoryHubClientProps {
  categoryName: string;
}

export default function CategoryHubClient({ categoryName }: CategoryHubClientProps) {
  const navItems = categorizedNavItems().find(cat => cat.name === categoryName)?.items || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {navItems.map((item) => (
        <Link href={item.href} key={item.href} className="block hover:no-underline group">
          <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out group-hover:border-primary">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-2">
                <item.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <CardTitle className="text-lg sm:text-xl group-hover:text-primary">{item.label}</CardTitle>
              </div>
              <CardDescription className="text-sm">{item.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
