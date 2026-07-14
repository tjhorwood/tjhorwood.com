import { getPayload } from '../getPayload';

export async function getGearItems() {
  const payload = await getPayload();
  return payload.find({
    collection: 'gear-items',
    depth: 2,
    limit: 100,
    sort: ['category', 'sortOrder', 'name'],
  });
}
