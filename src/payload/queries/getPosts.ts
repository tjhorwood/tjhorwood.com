import { unstable_cache } from 'next/cache';

import { getPayload } from '../getPayload';

export const getPosts = unstable_cache(
  async () => {
    const payload = await getPayload();
    return payload.find({
      collection: 'posts',
      depth: 2,
      limit: 100,
      sort: ['-publishedAt', 'title'],
      where: {
        and: [
          { _status: { equals: 'published' } },
          { visibility: { not_equals: 'private' } },
        ],
      },
    });
  },
  ['posts'],
  { tags: ['posts'] },
);
