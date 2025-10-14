
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { articles } from '@/lib/articles';
import { format, parseISO } from 'date-fns';

type ArticleListProps = {
  articleCount?: number;
};

export default function ArticleList({ articleCount }: ArticleListProps) {
  const articlesToDisplay = articleCount ? articles.slice(0, articleCount) : articles;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articlesToDisplay.map((article) => (
        <Link href={`/articles/${article.slug}`} key={article.slug} className="block hover:no-underline group">
          <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out group-hover:border-primary">
            <CardHeader className="p-4 sm:p-6">
              <p className="text-sm text-muted-foreground mb-2">{article.category}</p>
              <CardTitle className="text-lg sm:text-xl leading-tight mb-2 group-hover:text-primary">{article.title}</CardTitle>
              <CardDescription className="text-sm">{article.description}</CardDescription>
               <p className="text-xs text-muted-foreground mt-4">
                {format(parseISO(article.publishedDate), 'MMMM d, yyyy')}
              </p>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
