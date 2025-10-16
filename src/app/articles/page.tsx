
import type { Metadata } from 'next';
import ArticleList from '@/components/layout/article-list';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles & Insights Hub – Calculators',
  description: 'Explore our collection of articles to learn more about the science of aging, health and wellness tips, financial planning for retirement, and more.',
  alternates: {
      canonical: '/articles',
  },
};

export default function ArticlesHubPage() {
  const categories = [...new Set(articles.map(article => article.category))];

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Articles & Insights</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of articles to learn more about the science of aging, health and wellness tips, financial planning for retirement, and more.
        </p>
      </div>

      {categories.map(category => (
        <section key={category} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{category}</h2>
            <ArticleList category={category} />
        </section>
      ))}
      
    </main>
  );
}
