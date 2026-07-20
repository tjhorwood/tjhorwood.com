import { notFound } from 'next/navigation';
import PageIntro from '@/components/PageIntro';
import RichText from '@/components/RichText';
import { mediaAbsoluteUrl, normalizeSiteUrl } from '@/lib/seo';
import { getSiteSettings } from '@/payload/queries/getGlobals';
import { getPost } from '@/payload/queries/getPost';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPost(slug),
    getSiteSettings(),
  ]);
  if (!post) return { title: 'Post not found' };

  const siteUrl = normalizeSiteUrl(settings.siteUrl);
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const image = mediaAbsoluteUrl(
    post.seo?.image ?? post.coverImage,
    undefined,
    siteUrl,
  );
  const canonical = `/blog/${post.slug}/`;

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      images: image ? [{ url: image }] : undefined,
      title,
      type: 'article',
      url: canonical,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: image ? [image] : undefined,
      title,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className='mx-auto flex max-w-3xl flex-col gap-8'>
      <PageIntro title={post.title} descriptions={post.excerpt} />
      <RichText content={post.content} />
    </article>
  );
}
