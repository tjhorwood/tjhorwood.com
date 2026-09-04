'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import Link from '@/components/Link';
import { getMediaAlt, getMediaUrl } from '@/lib/media';
import {
  cardSurfaceClass,
  segmentItemActive,
  segmentItemBase,
  segmentItemInactive,
  segmentTrackClass,
  tagPillClass,
} from '@/lib/styles';
import { cn } from '@/lib/utils';

const CATEGORY_LABELS = {
  audio: 'Audio',
  camera: 'Camera',
  desk: 'Desk',
  development: 'Development',
  edc: 'EDC',
  fitness: 'Fitness',
  homelab: 'Homelab',
  other: 'Other',
};

function categoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category ?? 'Other';
}

function GearCard({ item }) {
  const href = item.affiliateUrl || item.productUrl;
  const imageUrl = getMediaUrl(item.image);

  const body = (
    <div className='flex flex-1 flex-col'>
      {imageUrl && (
        <div className='relative aspect-[4/3] w-full overflow-hidden bg-muted'>
          <Image
            src={imageUrl}
            alt={getMediaAlt(item.image, item.name)}
            fill
            sizes='(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'
            className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
            loading='lazy'
          />
        </div>
      )}
      <div className='flex flex-1 flex-col p-6'>
        <div className='flex flex-wrap items-center gap-2'>
          <span className={tagPillClass}>{categoryLabel(item.category)}</span>
          {item.recommended && (
            <span className='font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground'>
              Recommended
            </span>
          )}
          {item.owned && (
            <span className='font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground'>
              In use
            </span>
          )}
        </div>
        <div className='mt-4 flex items-start justify-between gap-3'>
          <h2 className='text-title font-semibold'>{item.name}</h2>
          {href && (
            <LuArrowUpRight className='mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1' />
          )}
        </div>
        {item.description && (
          <p className='mt-2 text-pretty text-sm leading-6 text-muted-foreground'>
            {item.description}
          </p>
        )}
        {item.notes && (
          <p className='mt-2 text-pretty text-sm leading-6 text-muted-foreground/80'>
            {item.notes}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <article
      className={cn(cardSurfaceClass, 'group flex flex-col overflow-hidden')}
    >
      {href ? (
        <Link href={href} className='flex flex-1 flex-col no-underline'>
          {body}
        </Link>
      ) : (
        body
      )}
    </article>
  );
}

export default function GearShowcase({ gearItems }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const items = gearItems ?? [];

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category).filter(Boolean)),
    );
    return ['all', ...uniqueCategories];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  if (items.length === 0) {
    return (
      <p className='max-w-2xl text-pretty text-lg leading-8 text-muted-foreground'>
        The setup library is not published yet — homelab hardware, development
        tools, desk upgrades, audio and camera gear, and everyday-carry items
        are on the way.
      </p>
    );
  }

  return (
    <section>
      {categories.length > 1 && (
        <div className={segmentTrackClass}>
          {categories.map((category) => (
            <button
              key={category}
              type='button'
              onClick={() => setActiveCategory(category)}
              className={cn(
                segmentItemBase,
                activeCategory === category
                  ? segmentItemActive
                  : segmentItemInactive,
              )}
            >
              {category === 'all' ? 'All' : categoryLabel(category)}
            </button>
          ))}
        </div>
      )}

      <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredItems.map((item) => (
          <GearCard key={item.id ?? item.slug} item={item} />
        ))}
      </div>

      <p className='mt-10 max-w-2xl text-sm leading-6 text-muted-foreground/80'>
        Some links may be affiliate links. I only list gear, tools, or services
        I use, have used, or would genuinely recommend for a similar setup.
      </p>
    </section>
  );
}
