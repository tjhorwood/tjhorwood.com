'use client';

import React from 'react';
import { LuMonitor, LuSmartphone, LuRotateCcw } from 'react-icons/lu';
import { cn } from '@/lib/utils';

export default function ProjectPreview({ src, title, viewMode, setViewMode }) {
  const handleRefresh = () => {
    const iframe = document.getElementById('preview-iframe');
    if (iframe) iframe.src = src; // Reloads the iframe content
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
          Interactive Sandbox
        </h2>

        {/* Viewport Toggle Buttons */}
        <div className='flex items-center gap-1 bg-secondary/50 p-1 rounded-lg border border-border'>
          <button
            onClick={() => setViewMode('desktop')}
            className={cn(
              'p-1.5 rounded-md transition-all duration-200',
              viewMode === 'desktop'
                ? 'bg-background shadow-sm text-primary'
                : 'text-muted-foreground hover:text-primary',
            )}
          >
            <LuMonitor className='h-4 w-4' />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={cn(
              'p-1.5 rounded-md transition-all duration-200',
              viewMode === 'mobile'
                ? 'bg-background shadow-sm text-primary'
                : 'text-muted-foreground hover:text-primary',
            )}
          >
            <LuSmartphone className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* Mac Window Container */}
      <div
        className={cn(
          'relative rounded-xl border border-border bg-card shadow-2xl transition-all duration-500 ease-in-out mx-auto overflow-hidden',
          viewMode === 'desktop' ? 'w-full' : 'max-w-120', // Mobile width lock
        )}
      >
        {/* Header/Traffic Lights */}
        <div className='flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30 backdrop-blur-md'>
          <div className='flex gap-1.5 w-16'>
            <div className='h-3 w-3 rounded-full bg-[#FF5F56]' />
            <div className='h-3 w-3 rounded-full bg-[#FFBD2E]' />
            <div className='h-3 w-3 rounded-full bg-[#27C93F]' />
          </div>
          <div className='w-16 flex justify-end'>
            <button
              onClick={handleRefresh}
              className='hover:rotate-180 transition-transform duration-500'
            >
              <LuRotateCcw className='h-3.5 w-3.5 text-muted-foreground/50 hover:text-primary' />
            </button>
          </div>
        </div>

        {/* The Iframe Body */}
        <div
          className={cn(
            'relative bg-white transition-all duration-500',
            viewMode === 'desktop' ? 'aspect-video' : 'h-175', // Mobile height lock
          )}
        >
          <iframe
            id='preview-iframe'
            src={src}
            className='w-full h-full border-none'
            title={title}
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
}
