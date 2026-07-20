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
    <div className='flex flex-col gap-12'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-secondary via-background to-secondary/40 p-6 shadow-sm md:p-10'>
        <div className='pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
        <div className='relative max-w-4xl space-y-6'>
          <PageIntro
            title='Blog'
            descriptions={
              posts.totalDocs > 0
                ? 'Practical writeups on reliable systems, homelab infrastructure, automation, self-hosting, and things I am learning by building.'
                : 'Practical writeups on reliable systems, homelab infrastructure, automation, self-hosting, and things I am learning by building.'
            }
          />
          <div className='flex flex-wrap gap-3'>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              {posts.totalDocs} articles
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              DevOps / SRE
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              Homelab
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              Automation
            </span>
          </div>
        </div>
      </section>

      {posts.totalDocs > 0 ? (
        <BlogShowcase posts={enrichedPosts} />
      ) : (
        <section className='rounded-3xl border border-border bg-card p-8 text-center shadow-sm'>
          <h2 className='text-3xl font-bold tracking-tight'>
            More notes soon.
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-muted-foreground'>
            I am still filling this space out. In the meantime, the Projects
            page has recent systems, websites, and case studies.
          </p>
        </section>
      )}
    </div>
  );
}
