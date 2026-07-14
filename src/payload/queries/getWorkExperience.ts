import { getPayload } from '../getPayload';

export async function getWorkExperience() {
  const payload = await getPayload();
  return payload.find({
    collection: 'work-experience',
    depth: 2,
    limit: 100,
    sort: ['sortOrder', '-updatedAt'],
  });
}
