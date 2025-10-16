
import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';
import { articles } from '@/lib/articles';

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const calculatorPages = navItems
    .filter(item => item.href.startsWith('/') && !item.href.endsWith('-calculators') && !item.category.includes('Navigation') && !item.category.includes('Company') && !item.category.includes('Legal'))
    .map(item => ({
      url: `${baseUrl}${item.href}`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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

  const hubPages = [
    { url: `${baseUrl}/articles`, priority: 0.9 },
    { url: `${baseUrl}/financial-calculators`, priority: 0.9 },
    { url: `${baseUrl}/health-fitness-calculators`, priority: 0.9 },
    { url: `${baseUrl}/math-calculators`, priority: 0.9 },
    { url: `${baseUrl}/other-calculators`, priority: 0.9 },
  ].map(page => ({
    url: page.url,
    lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }));

  return [
    { url: baseUrl, lastModified: lastModified, changeFrequency: 'weekly', priority: 1.0 },
    ...calculatorPages,
    ...staticPages,
    ...articlePages,
    ...hubPages,
  ];
}
