
import type { Metadata } from 'next';
import Link from 'next/link';
import { categorizedNavItems } from '@/components/layout/nav-items';
import { articles } from '@/lib/articles';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Sitemap – Calculators',
  description: 'View a complete list of all calculators and articles available on the site, organized by category for easy navigation.',
  alternates: {
      canonical: '/sitemap-page',
  },
};

const getArticleCategories = () => {
    const categories: Record<string, typeof articles> = {};
    articles.forEach(article => {
        if (!categories[article.category]) {
            categories[article.category] = [];
        }
        categories[article.category].push(article);
    });
    return Object.entries(categories).sort(([a], [b]) => a.localeCompare(b));
}

export default function SitemapPage() {
    const calculatorCategories = categorizedNavItems().filter(
        cat => !['Navigation', 'Company', 'Legal'].includes(cat.name)
    );
    const articleCategories = getArticleCategories();

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Sitemap</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          A complete overview of all the pages on our website, organized by category.
        </p>
      </div>

      <div className="space-y-12">
        <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center border-b pb-4">Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {calculatorCategories.map(category => (
                    <div key={category.name}>
                        <h3 className="text-xl font-semibold mb-4 text-primary">
                             <Link href={category.href} className="hover:underline">
                                {category.name}
                            </Link>
                        </h3>
                        <ul className="space-y-2">
                            {category.items.map(item => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center border-b pb-4">Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articleCategories.map(([category, articles]) => (
                    <div key={category}>
                        <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
                        <ul className="space-y-2">
                            {articles.map(article => (
                                <li key={article.slug}>
                                    <Link href={`/articles/${article.slug}`} className="text-muted-foreground hover:text-foreground">
                                        {article.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center border-b pb-4">Other Pages</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Main</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                        <li><Link href="/articles" className="text-muted-foreground hover:text-foreground">All Articles</Link></li>
                    </ul>
                 </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Company</h3>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                        <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                        <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
                    </ul>
                 </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Legal</h3>
                    <ul className="space-y-2">
                         <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                        <li><Link href="/disclaimer" className="text-muted-foreground hover:text-foreground">Disclaimer</Link></li>
                    </ul>
                 </div>
            </div>
        </div>
      </div>
    </main>
  );
}
