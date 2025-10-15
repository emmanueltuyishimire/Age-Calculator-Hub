
import CalculatorHub from '@/components/calculators/calculator-hub';
import ArticleList from '@/components/layout/article-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdBanner from '@/components/layout/ad-banner';

export default function Home() {
  return (
    <main role="main">
      <CalculatorHub />
      <div className="my-8 sm:my-12">
        <AdBanner />
      </div>
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Latest Articles & Insights</h2>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our articles to learn more about age, health, and wellness.
            </p>
        </div>
        <ArticleList articleCount={6} />
        <div className="text-center mt-10">
            <Link href="/articles" passHref>
                <Button size="lg">View All Articles</Button>
            </Link>
        </div>
      </section>
    </main>
  );
}
