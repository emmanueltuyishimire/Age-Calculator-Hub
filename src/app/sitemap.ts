
import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';
import { articles } from '@/lib/articles';

const baseUrl = 'https://innerpeacejournals.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const allNavItems = navItems.flatMap(item => 
    item.category !== 'Navigation' && item.category !== 'Company' && item.category !== 'Legal' 
      ? { ...item, priority: item.href === '/' ? 1.0 : 0.8 } 
      : []
  );

  const pageUrls = allNavItems.map(item => ({
    url: `${baseUrl}${item.href}`,
    lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: item.priority,
  }));
  
  const staticPages = [
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/faq',
  ].map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: lastModified,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  const articlePages = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.publishedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  const articleHubPage = {
    url: `${baseUrl}/articles`,
    lastModified: new Date(articles[0]?.publishedDate || lastModified),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  };

  return [...pageUrls, ...staticPages, ...articlePages, articleHubPage];
}
