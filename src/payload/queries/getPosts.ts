import { getPayload } from '../getPayload';

export async function getPosts() {
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
}
