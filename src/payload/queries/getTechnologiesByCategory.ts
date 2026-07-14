import { getPayload } from '../getPayload';

export async function getTechnologiesByCategory(category: string) {
  const payload = await getPayload();
  return payload.find({
    collection: 'technologies',
    limit: 100,
    sort: ['sortOrder', 'name'],
    where: { displayGroup: { equals: category } },
  });
}
