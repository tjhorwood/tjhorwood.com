import { getPayload } from '../getPayload';

export async function getSiteSettings() {
  const payload = await getPayload();
  return payload.findGlobal({ depth: 2, slug: 'site-settings' });
}

export async function getProfile() {
  const payload = await getPayload();
  return payload.findGlobal({ depth: 2, slug: 'profile' });
}

export async function getAboutPage() {
  const payload = await getPayload();
  return payload.findGlobal({ depth: 2, slug: 'about-page' });
}

export async function getGearPage() {
  const payload = await getPayload();
  return payload.findGlobal({ depth: 2, slug: 'gear-page' });
}
