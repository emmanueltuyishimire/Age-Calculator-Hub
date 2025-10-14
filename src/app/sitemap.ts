
import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://innerpeacejournals.com';

  const pages = navItems.filter(item => item.category !== 'Legal' && item.category !== 'Company').map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: item.href === '/' ? 1 : 0.8,
  }));
  
  const staticPages = [
    { href: '/about' },
    { href: '/contact' },
    { href: '/privacy' },
    { href: '/terms' },
    { href: '/disclaimer' }
  ].map(page => ({
    url: `${baseUrl}${page.href}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...pages, ...staticPages];
}
