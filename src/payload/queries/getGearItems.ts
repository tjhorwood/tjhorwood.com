import { unstable_cache } from 'next/cache';

import { getPayload } from '../getPayload';

export const getGearItems = unstable_cache(
  async () => {
    const payload = await getPayload();
    return payload.find({
      collection: 'gear-items',
      depth: 2,
      limit: 100,
      sort: ['category', 'sortOrder', 'name'],
    });
  },
  ['gear-items'],
  { tags: ['gear-items'] },
);
