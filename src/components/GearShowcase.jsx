'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  LuArrowUpRight,
  LuBadgeCheck,
  LuBox,
  LuFilter,
  LuHeart,
  LuInfo,
  LuSparkles,
} from 'react-icons/lu';
import Link from '@/components/Link';
import { getMediaAlt, getMediaUrl } from '@/lib/media';
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

const SETUP_BUNDLES = [
  {
    description:
      'Servers, networking, storage, and self-hosted services that keep the lab useful.',
    label: 'Homelab starter stack',
  },
  {
    description:
      'Daily driver hardware and software for building, debugging, writing, and shipping.',
    label: 'Development workflow',
  },
  {
    description:
      'Desk, audio, camera, and small quality-of-life upgrades that make long sessions better.',
    label: 'Desk essentials',
  },
];

function categoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category ?? 'Other';
}

function GearImage({ item }) {
  const imageUrl = getMediaUrl(item.image);

  if (!imageUrl) {
    return (
      <div className='flex h-full min-h-56 items-center justify-center bg-card p-6 text-center'>
        <div>
          <LuBox className='mx-auto h-8 w-8 text-muted-foreground' />
          <p className='mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground'>
            {categoryLabel(item.category)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={getMediaAlt(item.image, item.name)}
      width={768}
      height={432}
      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
      loading='lazy'
    />
  );
}

function GearCard({ item }) {
  const href = item.affiliateUrl || item.productUrl;
  const CardContent = (
    <article className='group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-foreground/30'>
      <div className='relative h-56 overflow-hidden border-border border-b bg-muted'>
        <GearImage item={item} />
        <div className='absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-linear-to-t from-background via-background/80 to-transparent p-4'>
          <span className='rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold'>
            {categoryLabel(item.category)}
          </span>
          {item.recommended && (
            <span className='inline-flex items-center gap-1 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold'>
              <LuBadgeCheck className='h-3.5 w-3.5' /> Recommended
            </span>
          )}
          {item.owned && (
            <span className='inline-flex items-center gap-1 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold'>
              <LuHeart className='h-3.5 w-3.5' /> In use
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-1 flex-col gap-4 p-5'>
        <div className='flex items-start justify-between gap-4'>
          <h2 className='text-balance text-xl font-semibold tracking-tighter sm:text-2xl'>
            {item.name}
          </h2>
          {href && (
            <LuArrowUpRight className='mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1' />
          )}
        </div>
        {item.description && (
          <p className='line-clamp-3 text-sm leading-6 text-muted-foreground'>
            {item.description}
          </p>
        )}
        {item.notes && (
          <p className='rounded-2xl border border-border bg-secondary/40 p-3 text-sm leading-6 text-muted-foreground'>
            {item.notes}
          </p>
        )}
        <div className='mt-auto text-sm font-semibold'>
          {href ? 'View product' : 'Setup note'}
        </div>
      </div>
    </article>
  );

  if (!href) return CardContent;

  return (
    <Link href={href} className='block h-full no-underline'>
      {CardContent}
    </Link>
  );
}

function EmptyGearState() {
  return (
    <div className='grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
      <div className='rounded-xl border border-border bg-card p-6'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <LuInfo className='h-5 w-5' />
          <p className='font-mono text-xs uppercase tracking-[0.15em]'>
            Coming soon
          </p>
        </div>
        <h2 className='mt-4 text-3xl font-semibold tracking-tighter'>
          Gear items are not published yet.
        </h2>
        <p className='mt-3 leading-7 text-muted-foreground'>
          The page is ready for the setup library: homelab hardware, development
          tools, desk upgrades, audio/camera gear, fitness kit, and
          everyday-carry items.
        </p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {SETUP_BUNDLES.map((bundle) => (
          <div
            key={bundle.label}
            className='rounded-xl border border-border bg-secondary/40 p-5'
          >
            <LuSparkles className='h-5 w-5 text-muted-foreground' />
            <h3 className='mt-4 font-bold'>{bundle.label}</h3>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>
              {bundle.description}
            </p>
          </div>
        ))}
      </div>
    </div>
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

  if (items.length === 0) return <EmptyGearState />;

  const recommendedCount = items.filter((item) => item.recommended).length;

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 rounded-xl border border-border bg-secondary/40 p-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <LuFilter className='h-4 w-4 text-muted-foreground' />
            <p className='font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground'>
              Browse setup
            </p>
          </div>
          <p className='mt-1 text-sm text-muted-foreground'>
            {items.length} items, {recommendedCount} recommended, grouped by
            category.
          </p>
        </div>
        <div className='-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0'>
          {categories.map((category) => (
            <button
              key={category}
              type='button'
              onClick={() => setActiveCategory(category)}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors',
                activeCategory === category
                  ? 'border-brand bg-brand text-brand-foreground'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground',
              )}
            >
              {category === 'all' ? 'All' : categoryLabel(category)}
            </button>
          ))}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {filteredItems.map((item) => (
          <GearCard key={item.id ?? item.slug} item={item} />
        ))}
      </div>

      <div className='rounded-xl border border-border bg-card/70 p-5 text-sm leading-6 text-muted-foreground'>
        Some links may be affiliate links. I only list gear, tools, or services
        I use, have used, or would genuinely recommend for a similar setup.
      </div>
    </section>
  );
}
