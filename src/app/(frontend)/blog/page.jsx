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

export default async function Blog() {
  const posts = await getPosts();
  return (
    <div className='flex flex-col gap-12'>
      <PageIntro
        title='Blog'
        descriptions={
          posts.totalDocs > 0
            ? 'Notes, projects, and things I am learning.'
            : '0 posts so far. Stay tuned for more!'
        }
      />
      {posts.totalDocs > 0 && (
        <ul className='grid gap-4 md:grid-cols-2'>
          {posts.docs.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className={cn('block p-5 no-underline', cardSurfaceClass)}
              >
                <h2 className='font-semibold'>{post.title}</h2>
                {post.excerpt && (
                  <p className='text-primary/60'>{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
