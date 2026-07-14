import { unstable_cache } from 'next/cache';

import { getPayload } from '../getPayload';

export const getWorkExperience = unstable_cache(
  async () => {
    const payload = await getPayload();
    return payload.find({
      collection: 'work-experience',
      depth: 2,
      limit: 100,
      sort: ['sortOrder', '-updatedAt'],
    });
  },
  ['work-experience'],
  { tags: ['work-experience'] },
);
