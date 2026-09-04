'use client';

import { useMemo, useState } from 'react';
import PostCard from '@/components/PostCard';
import {
  segmentItemActive,
  segmentItemBase,
  segmentItemInactive,
  segmentTrackClass,
} from '@/lib/styles';
import { cn } from '@/lib/utils';

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

export default function BlogShowcase({ posts }) {
  const [activeTopic, setActiveTopic] = useState('all');

  const enrichedPosts = useMemo(
    () => posts.map((post) => ({ ...post, topics: getTaxonomyNames(post) })),
    [posts],
  );

  const topics = useMemo(() => {
    const uniqueTopics = Array.from(
      new Set(enrichedPosts.flatMap((post) => post.topics)),
    );
    return ['all', ...uniqueTopics];
  }, [enrichedPosts]);

  const filteredPosts = useMemo(() => {
    if (activeTopic === 'all') return enrichedPosts;
    return enrichedPosts.filter((post) => post.topics.includes(activeTopic));
  }, [activeTopic, enrichedPosts]);

  return (
    <section>
      {topics.length > 1 && (
        <div className={segmentTrackClass}>
          {topics.map((topic) => (
            <button
              key={topic}
              type='button'
              onClick={() => setActiveTopic(topic)}
              className={cn(
                segmentItemBase,
                activeTopic === topic ? segmentItemActive : segmentItemInactive,
              )}
            >
              {topic === 'all' ? 'All' : topic}
            </button>
          ))}
        </div>
      )}

      <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredPosts.map((post, index) => (
          <PostCard
            key={post.id ?? post.slug}
            post={post}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
