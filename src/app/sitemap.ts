
import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';
import { articles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://innerpeacejournals.com';

  // Find the last modification date from the most recent article
  const lastModified = articles.reduce((latest, article) => {
    const articleDate = new Date(article.publishedDate);
    return articleDate > latest ? articleDate : latest;
  }, new Date(0));

  // Calculator and hub pages
  const pages = navItems
    .filter(item => item.category !== 'Legal' && item.category !== 'Company')
    .map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: lastModified,
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
  
  const articleHubPage = {
    url: `${baseUrl}/articles`,
    lastModified: lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  };

  return [...pages, ...staticPages, ...articlePages, articleHubPage];
}
