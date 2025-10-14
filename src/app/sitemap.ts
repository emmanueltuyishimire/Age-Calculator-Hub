
import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';
import { articles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://age-calculator-hub.com';

  // Calculator and hub pages
  const pages = navItems
    .filter(item => item.category !== 'Legal' && item.category !== 'Company')
    .map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: item.href === '/' ? 1 : 0.8,
  }));
  
  // Static pages like about, contact, etc.
  const staticPages = [
    { href: '/about' },
    { href: '/contact' },
    { href: '/privacy' },
    { href: '/terms' },
    { href: '/disclaimer' },
    { href: '/faq' },
  ].map(page => ({
    url: `${baseUrl}${page.href}`,
    lastModified: new Date(),
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
  
  const articleHubPage = {
    url: `${baseUrl}/articles`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  };

  return [...pages, ...staticPages, ...articlePages, articleHubPage];
}
