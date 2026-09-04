'use client';

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';

// Bridges Payload's admin Live Preview to the Next.js router: when an editor
// changes a field (or autosave fires), the preview iframe re-renders with the
// latest data. No-op outside the admin preview iframe.
export default function RefreshRouteOnSave() {
  const router = useRouter();
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL ??
    (typeof window !== 'undefined' ? window.location.origin : '');

  return (
    <PayloadRefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  );
}
