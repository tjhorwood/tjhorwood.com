import Image from 'next/image';
import { LuArrowUpRight } from 'react-icons/lu';
import Link from '@/components/Link';
import { cardSurfaceClass, tagPillClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

function getImageUrl(image, size = 'card') {
  if (!image || typeof image === 'number') return null;
  return image.sizes?.[size]?.url ?? image.url ?? null;
}

export default function PostCard({ post, priority = false }) {
  const coverImageUrl = getImageUrl(post.coverImage, 'card');
  const meta = [
    post.publishedDate,
    post.readingTime && `${post.readingTime} min read`,
  ]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <article
      className={cn(cardSurfaceClass, 'group flex flex-col overflow-hidden')}
    >
      <Link
        href={`/blog/${post.slug}`}
        className='flex flex-1 flex-col no-underline'
      >
        {coverImageUrl && (
          <div className='relative aspect-[16/9] w-full overflow-hidden bg-muted'>
            <Image
              src={coverImageUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              sizes='(min-width: 768px) 40vw, 100vw'
              className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
              {...(priority ? { priority: true } : { loading: 'lazy' })}
            />
          </div>
        )}
        <div className='flex flex-1 flex-col p-6 sm:p-7'>
          {meta && (
            <p className='font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground'>
              {meta}
            </p>
          )}
          <div className='mt-3 flex items-start justify-between gap-3'>
            <h3 className='font-semibold tracking-tighter'>{post.title}</h3>
            <LuArrowUpRight className='mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
          </div>
          {post.excerpt && (
            <p className='mt-2 line-clamp-2 text-pretty text-sm leading-6 text-muted-foreground'>
              {post.excerpt}
            </p>
          )}
          {post.topics?.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-1.5'>
              {post.topics.slice(0, 3).map((topic) => (
                <span key={topic} className={tagPillClass}>
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
