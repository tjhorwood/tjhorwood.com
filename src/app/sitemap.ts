import type { MetadataRoute } from 'next';
import { normalizeSiteUrl } from '@/lib/seo';
import { getSiteSettings } from '@/payload/queries/getGlobals';
import { getPosts } from '@/payload/queries/getPosts';
import { getProjects } from '@/payload/queries/getProjects';

export const dynamic = 'force-dynamic';

const staticRoutes = ['', '/about', '/projects', '/blog', '/gear'];

function route(
  url: string,
  lastModified?: string | Date,
  priority = 0.8,
): MetadataRoute.Sitemap[number] {
  return {
    changeFrequency: priority === 1 ? 'weekly' : 'monthly',
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    priority,
    url,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const siteUrl = normalizeSiteUrl(settings.siteUrl);
  const [{ docs: posts }, { docs: projects }] = await Promise.all([
    getPosts(),
    getProjects(),
  ]);

  return [
    ...staticRoutes.map((path) =>
      route(`${siteUrl}${path}/`, undefined, path === '' ? 1 : 0.8),
    ),
    ...projects.map((project) =>
      route(
        `${siteUrl}/projects/${project.slug}/`,
        project.updatedAt ?? project.publishedAt,
      ),
    ),
    ...posts.map((post) =>
      route(
        `${siteUrl}/blog/${post.slug}/`,
        post.updatedAt ?? post.publishedAt,
      ),
    ),
  ];
}
