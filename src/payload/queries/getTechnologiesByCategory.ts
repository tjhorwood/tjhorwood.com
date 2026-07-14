import { unstable_cache } from 'next/cache';

import { getPayload } from '../getPayload';

export const getTechnologiesByCategory = unstable_cache(
  async (category: string) => {
    const payload = await getPayload();
    return payload.find({
      collection: 'technologies',
      limit: 100,
      sort: ['sortOrder', 'name'],
      where: { displayGroup: { equals: category } },
    });
  },
  ['technologies-by-category'],
  { tags: ['technologies'] },
);
