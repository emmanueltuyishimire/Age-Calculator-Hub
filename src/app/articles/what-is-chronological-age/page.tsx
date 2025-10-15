
"use client";

import { articles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function AgeCalculatorAppArticle() {
  const pathname = usePathname();
  const article = articles.find(a => a.slug === pathname.split('/').pop());

  if (!article) {
    notFound();
  }
  
  return (
   <div>This is a placeholder for the article page.</div>
  );
}
