import { getPayload } from '../getPayload';

const publicWhere = {
  and: [
    { _status: { equals: 'published' } },
    { visibility: { not_equals: 'private' } },
  ],
};

export async function getProjects() {
  const payload = await getPayload();

  return payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    sort: ['featuredOrder', '-publishedAt', 'title'],
    where: publicWhere,
  });
}

/**
 * Projects to showcase on the homepage "Selected projects" section.
 * Returns up to `limit` projects flagged `featured` (lowest `featuredOrder`
 * first), falling back to the most recently published projects when none
 * are flagged.
 */
export async function getFeaturedProjects(limit = 3) {
  const payload = await getPayload();

  const featured = await payload.find({
    collection: 'projects',
    depth: 2,
    limit,
    sort: ['featuredOrder', '-publishedAt', 'title'],
    where: {
      and: [...publicWhere.and, { featured: { equals: true } }],
    },
  });

  if (featured.docs.length > 0) return featured.docs;

  const recent = await payload.find({
    collection: 'projects',
    depth: 2,
    limit,
    sort: ['-publishedAt', 'title'],
    where: publicWhere,
  });

  return recent.docs;
}
