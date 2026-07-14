import { getPayload } from '../getPayload';

export async function getProjects() {
  const payload = await getPayload();

  return payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    sort: ['featuredOrder', '-publishedAt', 'title'],
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          visibility: {
            not_equals: 'private',
          },
        },
      ],
    },
  });
}
