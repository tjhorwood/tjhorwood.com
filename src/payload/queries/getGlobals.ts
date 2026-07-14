import { unstable_cache } from 'next/cache';

import { getPayload } from '../getPayload';

export const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload();
    return payload.findGlobal({ depth: 2, slug: 'site-settings' });
  },
  ['site-settings'],
  { tags: ['site-settings'] },
);

export const getProfile = unstable_cache(
  async () => {
    const payload = await getPayload();
    return payload.findGlobal({ depth: 2, slug: 'profile' });
  },
  ['profile'],
  { tags: ['profile'] },
);

export const getAboutPage = unstable_cache(
  async () => {
    const payload = await getPayload();
    return payload.findGlobal({ depth: 2, slug: 'about-page' });
  },
  ['about-page'],
  { tags: ['about-page'] },
);

export const getGearPage = unstable_cache(
  async () => {
    const payload = await getPayload();
    return payload.findGlobal({ depth: 2, slug: 'gear-page' });
  },
  ['gear-page'],
  { tags: ['gear-page'] },
);
