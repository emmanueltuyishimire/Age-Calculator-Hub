
import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';
import { articles } from '@/lib/articles';

const baseUrl = 'https://innerpeacejournals.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // All calculator pages and hub pages
  const calculatorPages = navItems
    .filter(item => item.category !== 'Navigation' && item.category !== 'Company' && item.category !== 'Legal')
    .map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: item.href === '/' ? 1.0 : 0.8,
  }));
  
  // Static pages like about, contact, etc.
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
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  // Article pages
  const articlePages = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.publishedDate),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  // The main article hub page
  const articleHubPage = {
    url: `${baseUrl}/articles`,
    lastModified: lastModified, // Use the most recent article's date
    changeFrequency: 'weekly',
    priority: 0.7,
  };

  return [...calculatorPages, ...staticPages, ...articlePages, articleHubPage];
}
