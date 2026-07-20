import type { MetadataRoute } from 'next';
import { normalizeSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = normalizeSiteUrl();

  return {
    rules: [
      {
        allow: '/',
        disallow: ['/admin/', '/api/payload/'],
        userAgent: '*',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
