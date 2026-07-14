import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';

import { getPayload } from '../getPayload';

const getPublishedPost = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
          { visibility: { not_equals: 'private' } },
        ],
      },
    });
    return result.docs[0] ?? null;
  },
  ['post-by-slug'],
  { tags: ['posts'] },
);

export async function getPost(slug: string) {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return getPublishedPost(slug);
  const payload = await getPayload();
  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft: true,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  return result.docs[0] ?? null;
}
