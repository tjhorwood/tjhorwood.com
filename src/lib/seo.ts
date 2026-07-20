import { getMediaUrl } from './media';

export const defaultSiteUrl = 'https://tjhorwood.com';

export function normalizeSiteUrl(siteUrl?: string | null) {
  return (
    siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    defaultSiteUrl
  ).replace(/\/+$/, '');
}

export function absoluteUrl(
  pathOrUrl?: string | null,
  siteUrl = defaultSiteUrl,
) {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${normalizeSiteUrl(siteUrl)}${path}`;
}

export function mediaAbsoluteUrl(
  media: unknown,
  fallback?: string,
  siteUrl = defaultSiteUrl,
) {
  const url = getMediaUrl(media, fallback);
  return absoluteUrl(url, siteUrl);
}
