
import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';
import { articles } from '@/lib/articles';

const baseUrl = 'https://innerpeacejournals.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Pages from navItems, excluding hub pages which are handled by categories
  const pageUrls = navItems
    .filter(item => item.href.startsWith('/') && !item.href.endsWith('-calculators') && item.href !== '/' && item.category !== 'Company' && item.category !== 'Legal' && item.category !== 'Navigation')
    .map(item => ({
      url: `${baseUrl}${item.href}`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  
  // Static pages not in navItems' main sections
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

  // Article pages
  const articlePages = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.publishedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  // Hub pages for articles and categories
  const hubPages = [
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(articles[0]?.publishedDate || lastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/financial-calculators`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/health-fitness-calculators`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/math-calculators`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
     {
      url: `${baseUrl}/other-calculators`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  return [
    { url: baseUrl, lastModified: lastModified, changeFrequency: 'weekly', priority: 1.0 },
    ...pageUrls,
    ...staticPages, 
    ...articlePages, 
    ...hubPages
  ];
}
