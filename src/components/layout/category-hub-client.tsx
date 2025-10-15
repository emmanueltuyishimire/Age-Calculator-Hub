"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
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
          <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out group-hover:border-primary/50 group-hover:bg-accent">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{item.label}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
