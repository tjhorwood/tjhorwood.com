export function getMediaUrl(media, fallback = null) {
  if (!media || typeof media === 'number') return fallback;
  return media.url ?? fallback;
}

export function getMediaAlt(media, fallback = '') {
  if (!media || typeof media === 'number') return fallback;
  return media.alt ?? fallback;
}
