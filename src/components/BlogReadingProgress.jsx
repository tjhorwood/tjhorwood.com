'use client';

import { useEffect, useState } from 'react';

export default function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const readableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(readableHeight > 0 ? scrollTop / readableHeight : 0);
    }

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className='fixed inset-x-0 top-0 z-50 h-1 bg-border/40'>
      <div
        className='h-full bg-primary transition-[width] duration-150 ease-out'
        style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
      />
    </div>
  );
}
