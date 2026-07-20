import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BlogReadingProgress from '@/components/BlogReadingProgress';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageIntro from '@/components/PageIntro';
import RichText from '@/components/RichText';
import { mediaAbsoluteUrl, normalizeSiteUrl } from '@/lib/seo';
import { getSiteSettings } from '@/payload/queries/getGlobals';
import { getPost } from '@/payload/queries/getPost';

export const dynamic = 'force-dynamic';

function getImageUrl(image, size = 'hero') {
  if (!image || typeof image === 'number') return null;
  return image.sizes?.[size]?.url ?? image.url ?? null;
}

function getImageDimensions(image, size = 'hero') {
  if (!image || typeof image === 'number') {
    return { height: 1080, width: 1920 };
  }

  const sizedImage = image.sizes?.[size];
  return {
    height: sizedImage?.height ?? image.height ?? 1080,
    width: sizedImage?.width ?? image.width ?? 1920,
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

  const coverImage = post.coverImage;
  const coverImageUrl = getImageUrl(coverImage, 'hero');
  const coverImageDimensions = getImageDimensions(coverImage, 'hero');
  const readingTime = getReadingTime(post);
  const publishedDate = formatDate(post.publishedAt);

  return (
    <>
      <BlogReadingProgress />
      <article className='mx-auto flex max-w-6xl flex-col gap-10'>
        <div>
          <Breadcrumbs
            parentHref='/blog'
            parentLabel='Blog'
            title={post.title}
          />
          <div className='rounded-3xl border border-border bg-secondary/40 p-5 shadow-sm md:p-8'>
            <div className='flex flex-wrap items-center gap-3 pb-6 text-sm font-medium text-muted-foreground'>
              <span>{readingTime} min read</span>
              {publishedDate && (
                <>
                  <span aria-hidden='true'>•</span>
                  <time dateTime={post.publishedAt}>{publishedDate}</time>
                </>
              )}
            </div>
            <PageIntro title={post.title} descriptions={post.excerpt} />
          </div>
        </div>

        {coverImageUrl && (
          <div className='overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-2xl'>
            <Image
              src={coverImageUrl}
              alt={coverImage?.alt || post.title}
              width={coverImageDimensions.width}
              height={coverImageDimensions.height}
              className='max-h-[34rem] w-full object-cover'
              priority
            />
          </div>
        )}

        <div className='mx-auto w-full max-w-6xl'>
          <RichText content={post.content} />
        </div>
      </article>
    </>
  );
}
