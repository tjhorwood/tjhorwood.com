'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { LuArrowUpRight, LuClock3, LuRss, LuTerminal } from 'react-icons/lu';
import Link from '@/components/Link';
import { cn } from '@/lib/utils';

function getImageUrl(image, size = 'card') {
  if (!image || typeof image === 'number') return null;
  return image.sizes?.[size]?.url ?? image.url ?? null;
}

function getImageDimensions(image, size = 'card') {
  if (!image || typeof image === 'number') {
    return { height: 432, width: 768 };
  }

  const sizedImage = image.sizes?.[size];
  return {
    height: sizedImage?.height ?? image.height ?? 432,
    width: sizedImage?.width ?? image.width ?? 768,
  };
}

function getTaxonomyNames(post) {
  const categories = (post.categories ?? [])
    .map((category) => {
      if (!category || typeof category === 'number') return null;
      return category.name;
    })
    .filter(Boolean);

  const tags = (post.tags ?? [])
    .map((tag) => {
      if (!tag || typeof tag === 'number') return null;
      return tag.shortName ?? tag.name;
    })
    .filter(Boolean);

  return [...categories, ...tags];
}

function TopicArtwork({ featured = false, post }) {
  const taxonomy = getTaxonomyNames(post);
  const topic = taxonomy[0] ?? 'Blog';

  return (
    <div className='relative flex h-full min-h-64 overflow-hidden bg-card p-6'>
      <div className='absolute inset-0 bg-blueprint opacity-70' />
      <div className='relative mt-auto w-full rounded-2xl border border-border bg-background/80 p-4'>
        <div className='mb-4 flex items-center gap-2 text-muted-foreground'>
          <LuTerminal className='h-4 w-4' />
          <span className='font-mono text-xs'>~/notes/{post.slug}</span>
        </div>
        <p className='font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground'>
          {topic}
        </p>
        <div className='mt-4 space-y-2 font-mono text-xs text-muted-foreground'>
          <div className='h-2 w-4/5 rounded-full bg-muted-foreground/20' />
          <div className='h-2 w-2/3 rounded-full bg-muted-foreground/20' />
          <div className='h-2 w-5/6 rounded-full bg-muted-foreground/20' />
        </div>
      </div>
      {featured && (
        <span className='absolute top-5 left-5 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold'>
          Featured guide
        </span>
      )}
    </div>
  );
}

function PostVisual({ featured = false, post, priority = false }) {
  const coverImage = post.coverImage;
  const coverImageUrl = getImageUrl(coverImage, 'card');
  const coverImageDimensions = getImageDimensions(coverImage, 'card');

  if (!coverImageUrl) return <TopicArtwork featured={featured} post={post} />;

  return (
    <Image
      src={coverImageUrl}
      alt={coverImage?.alt || post.title}
      width={coverImageDimensions.width}
      height={coverImageDimensions.height}
      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
      {...(priority ? { priority: true } : { loading: 'lazy' })}
    />
  );
}

function MetaRow({ post }) {
  return (
    <div className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
      <span className='inline-flex items-center gap-1.5'>
        <LuClock3 className='h-3.5 w-3.5' /> {post.readingTime} min read
      </span>
      {post.publishedDate && (
        <>
          <span aria-hidden='true'>•</span>
          <time dateTime={post.publishedAt}>{post.publishedDate}</time>
        </>
      )}
    </div>
  );
}

function TopicChips({ post, limit = 3 }) {
  const topics = getTaxonomyNames(post).slice(0, limit);
  if (topics.length === 0) return null;

  return (
    <div className='-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0'>
      {topics.map((topic) => (
        <span
          key={topic}
          className='rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground'
        >
          {topic}
        </span>
      ))}
    </div>
  );
}

function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <article className='group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-foreground/30'>
      <Link
        href={`/blog/${post.slug}`}
        className='grid no-underline lg:min-h-[30rem] lg:grid-cols-[1.15fr_0.85fr]'
      >
        <div className='relative overflow-hidden border-border border-b bg-muted lg:border-r lg:border-b-0'>
          <PostVisual post={post} featured priority />
        </div>
        <div className='flex flex-col gap-6 p-6 md:p-8'>
          <div className='space-y-4'>
            <MetaRow post={post} />
            <h2 className='text-balance text-2xl font-semibold tracking-tighter sm:text-3xl md:text-4xl'>
              {post.title}
            </h2>
            {post.excerpt && (
              <p className='text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8'>
                {post.excerpt}
              </p>
            )}
          </div>
          <TopicChips post={post} limit={5} />
          <div className='mt-auto inline-flex items-center gap-2 font-semibold'>
            Read the guide <LuArrowUpRight className='h-4 w-4' />
          </div>
        </div>
      </Link>
    </article>
  );
}

function PostCard({ post }) {
  return (
    <article className='group h-full overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-foreground/30'>
      <Link
        href={`/blog/${post.slug}`}
        className='flex h-full flex-col no-underline'
      >
        <div className='h-56 overflow-hidden border-border border-b bg-muted'>
          <PostVisual post={post} />
        </div>
        <div className='flex flex-1 flex-col gap-4 p-5'>
          <MetaRow post={post} />
          <h2 className='text-balance text-xl font-semibold tracking-tighter sm:text-2xl'>
            {post.title}
          </h2>
          {post.excerpt && (
            <p className='line-clamp-3 text-sm leading-6 text-muted-foreground'>
              {post.excerpt}
            </p>
          )}
          <TopicChips post={post} />
          <div className='mt-auto inline-flex items-center gap-2 text-sm font-semibold'>
            Read article <LuArrowUpRight className='h-4 w-4' />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BlogShowcase({ posts }) {
  const [activeTopic, setActiveTopic] = useState('all');

  const topics = useMemo(() => {
    const uniqueTopics = Array.from(
      new Set(posts.flatMap((post) => getTaxonomyNames(post))),
    );
    return ['all', ...uniqueTopics];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTopic === 'all') return posts;
    return posts.filter((post) => getTaxonomyNames(post).includes(activeTopic));
  }, [activeTopic, posts]);

  const featuredPost = filteredPosts[0];
  const supportingPosts = filteredPosts.slice(1);

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 rounded-xl border border-border bg-secondary/40 p-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground'>
            Blog
          </p>
          <p className='mt-1 text-sm text-muted-foreground'>
            Browse practical writeups by topic and jump into the newest guide.
          </p>
        </div>
        <div className='-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0'>
          {topics.map((topic) => (
            <button
              key={topic}
              type='button'
              onClick={() => setActiveTopic(topic)}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors',
                activeTopic === topic
                  ? 'border-brand bg-brand text-brand-foreground'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground',
              )}
            >
              {topic === 'all' ? 'All' : topic}
            </button>
          ))}
        </div>
      </div>

      <FeaturedPost post={featuredPost} />

      {supportingPosts.length > 0 && (
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {supportingPosts.map((post) => (
            <PostCard key={post.id ?? post.slug} post={post} />
          ))}
        </div>
      )}

      <div className='grid gap-4 rounded-xl border border-border bg-card p-6 md:grid-cols-[1fr_auto] md:items-center'>
        <div>
          <p className='font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground'>
            Follow along
          </p>
          <h2 className='mt-2 text-2xl font-semibold tracking-tighter'>
            Practical notes from things I am building and operating.
          </h2>
          <p className='mt-2 text-muted-foreground'>
            Expect homelab writeups, reliability tradeoffs, automation notes,
            and project retrospectives.
          </p>
        </div>
        <Link
          href='/sitemap.xml'
          className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-semibold transition hover:bg-secondary sm:w-auto'
        >
          Browse sitemap <LuRss className='h-4 w-4' />
        </Link>
      </div>
    </section>
  );
}
