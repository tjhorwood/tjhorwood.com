// app/components/MatomoAnalytics.js
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

const MatomoTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure Matomo configuration is present
    if (!MATOMO_URL || !MATOMO_SITE_ID) {
      console.error('Matomo configuration is missing.');
      return;
    }

    // Check if Matomo is already initialized
    if (!window._paq) {
      window._paq = window._paq || [];
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['setTrackerUrl', `${MATOMO_URL}matomo.php`]);
      window._paq.push(['setSiteId', MATOMO_SITE_ID]);

      const d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = `${MATOMO_URL}matomo.js`;
      s.parentNode.insertBefore(g, s);
    }

    // Track page view when the pathname changes
    window._paq.push(['setCustomUrl', pathname]);
    window._paq.push(['setDocumentTitle', document.title]);
    window._paq.push(['trackPageView']);
  }, [pathname]); // Run this effect on pathname changes

  return null;
};

export default MatomoTracker;
