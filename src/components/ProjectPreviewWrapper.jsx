'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ProjectPreview = dynamic(() => import('./ProjectPreview'), {
  ssr: false,
});

export default function ProjectPreviewWrapper({ src, title }) {
  const [viewMode, setViewMode] = useState('desktop');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        setViewMode('mobile');
      }
    }
  }, []);

  if (!mounted) {
    return <div className='h-125 w-full bg-muted animate-pulse rounded-xl' />;
  }

  return (
    <ProjectPreview
      src={src}
      title={title}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  );
}
