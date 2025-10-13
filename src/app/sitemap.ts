import { MetadataRoute } from 'next';
import { navItems } from '@/components/layout/nav-items';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://innerpeacejournals.com';

  const pages = navItems.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
  }));

  return pages;
}
