import { draftMode } from 'next/headers';

import { getPayload } from '../getPayload';

async function getPublishedProject(slug: string) {
  const payload = await getPayload();

  const result = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
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

  return result.docs[0] ?? null;
}

export async function getProject(slug: string) {
  const { isEnabled } = await draftMode();

  if (!isEnabled) {
    return getPublishedProject(slug);
  }

  const payload = await getPayload();
  const result = await payload.find({
    collection: 'projects',
    depth: 2,
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs[0] ?? null;
}
