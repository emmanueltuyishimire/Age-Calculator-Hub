
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { articles } from '@/lib/articles';

type ArticleListProps = {
  articleCount?: number;
  category?: string;
};

export default function ArticleList({ articleCount, category }: ArticleListProps) {
  let articlesToDisplay = articles;

  if (category) {
    articlesToDisplay = articles.filter(a => a.category === category);
  }

  if (articleCount) {
    articlesToDisplay = articlesToDisplay.slice(0, articleCount);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articlesToDisplay.map((article) => (
        <Link href={`/articles/${article.slug}`} key={article.slug} className="block hover:no-underline group">
          <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out group-hover:border-primary/50">
            <CardHeader className="pb-4">
              <p className="text-sm text-primary font-semibold mb-2">{article.category}</p>
              <CardTitle className="text-lg leading-snug group-hover:text-primary">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm line-clamp-2">{article.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
