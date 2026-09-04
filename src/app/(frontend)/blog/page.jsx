import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import BlogShowcase from '@/components/BlogShowcase';
import PageIntro from '@/components/PageIntro';
import { getPosts } from '@/payload/queries/getPosts';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/blog/' },
  description:
    'Practical notes on DevOps, SRE, homelab infrastructure, automation, and self-hosting.',
  title: 'Blog',
};

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

function enrichPost(post) {
  return {
    ...post,
    publishedDate: formatDate(post.publishedAt),
    readingTime: getReadingTime(post),
  };
}

export default async function Blog() {
  const posts = await getPosts();
  const enrichedPosts = posts.docs.map(enrichPost);

  return (
    <div className='flex flex-col gap-12 md:gap-16'>
      <PageIntro
        eyebrow='Writing'
        title='Blog'
        descriptions='Practical writeups on reliable systems, homelab infrastructure, automation, self-hosting, and things I am learning by building.'
      />

      {posts.totalDocs > 0 ? (
        <BlogShowcase posts={enrichedPosts} />
      ) : (
        <p className='max-w-2xl text-pretty text-lg leading-8 text-muted-foreground'>
          More notes soon. In the meantime, the{' '}
          <a
            href='/projects'
            className='font-medium text-foreground underline decoration-foreground/40 decoration-2 underline-offset-4 hover:decoration-foreground'
          >
            projects
          </a>{' '}
          page has recent systems, websites, and case studies.
        </p>
      )}
    </div>
  );
}
