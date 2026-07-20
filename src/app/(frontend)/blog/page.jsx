import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import Image from 'next/image';
import Link from '@/components/Link';
import PageIntro from '@/components/PageIntro';
import { cardSurfaceClass } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { getPosts } from '@/payload/queries/getPosts';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/blog/' },
  description:
    'Practical notes on DevOps, SRE, homelab infrastructure, automation, and self-hosting.',
  title: 'Blog',
};

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

function getPlaintext(post) {
  if (post.content) return convertLexicalToPlaintext({ data: post.content });
  return `${post.title ?? ''} ${post.excerpt ?? ''}`;
}

function getReadingTime(post) {
  const words = getPlaintext(post).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
}

function formatDate(date) {
  if (!date) return null;

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export default async function Blog() {
  const posts = await getPosts();
  return (
    <div className='flex flex-col gap-12'>
      <PageIntro
        title='Blog'
        descriptions={
          posts.totalDocs > 0
            ? 'Notes, projects, experiments, and things I am learning.'
            : '0 posts so far. Stay tuned for more!'
        }
      />
      {posts.totalDocs > 0 && (
        <ul className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {posts.docs.map((post) => {
            const coverImage = post.coverImage;
            const coverImageUrl = getImageUrl(coverImage, 'card');
            const coverImageDimensions = getImageDimensions(coverImage, 'card');
            const publishedDate = formatDate(post.publishedAt);

            return (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    'group flex h-full flex-col overflow-hidden no-underline transition-transform hover:-translate-y-1',
                    cardSurfaceClass,
                  )}
                >
                  {coverImageUrl ? (
                    <div className='relative h-52 w-full overflow-hidden border-b border-border bg-muted'>
                      <Image
                        src={coverImageUrl}
                        alt={coverImage?.alt || post.title}
                        width={coverImageDimensions.width}
                        height={coverImageDimensions.height}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                        loading='lazy'
                      />
                    </div>
                  ) : (
                    <div className='flex h-52 items-center justify-center border-b border-border bg-linear-to-br from-secondary via-background to-primary/10 px-6 text-center'>
                      <span className='text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground'>
                        tjhorwood
                      </span>
                    </div>
                  )}

                  <div className='flex flex-1 flex-col gap-3 p-5'>
                    <div className='flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                      <span>{getReadingTime(post)} min read</span>
                      {publishedDate && (
                        <>
                          <span aria-hidden='true'>•</span>
                          <time dateTime={post.publishedAt}>
                            {publishedDate}
                          </time>
                        </>
                      )}
                    </div>
                    <h2 className='text-xl font-semibold leading-tight transition-colors group-hover:text-muted-foreground'>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className='line-clamp-3 text-sm leading-6 text-primary/60'>
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
