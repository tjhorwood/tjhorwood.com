import { notFound } from 'next/navigation';
import PageIntro from '@/components/PageIntro';
import { getPost } from '@/payload/queries/getPost';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };
  return {
    description: post.seo?.description ?? post.excerpt,
    title: post.seo?.title ?? post.title,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className='mx-auto flex max-w-3xl flex-col gap-8'>
      <PageIntro title={post.title} descriptions={post.excerpt} />
      <div className='prose prose-neutral dark:prose-invert max-w-none'>
        <p>Open this post in Payload Admin to manage its rich text content.</p>
      </div>
    </article>
  );
}
