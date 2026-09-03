import Image from 'next/image';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import RotatingText from '@/components/animations/RotatingText';
import Eyebrow from '@/components/Eyebrow';
import Link from '@/components/Link';
import { getMediaAlt, getMediaUrl } from '@/lib/media';
import { getProfile } from '@/payload/queries/getGlobals';
import { getPosts } from '@/payload/queries/getPosts';
import { getFeaturedProjects } from '@/payload/queries/getProjects';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/' },
};

function getImageUrl(image, size = 'card') {
  if (!image || typeof image === 'number') return null;
  return image.sizes?.[size]?.url ?? image.url ?? null;
}

function formatDate(date) {
  if (!date) return null;

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function getProjectCategory(project) {
  const category = project?.categories?.[0];
  if (!category || typeof category === 'number') return project?.projectType;
  return category.name;
}

function SectionHeader({ eyebrow, title, href, linkLabel }) {
  return (
    <div className='flex items-end justify-between gap-4 border-b border-border pb-4'>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className='mt-2 text-2xl font-semibold tracking-tighter'>
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className='group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground no-underline transition-colors hover:text-foreground'
        >
          {linkLabel}
          <LuArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
        </Link>
      )}
    </div>
  );
}

function ProjectRow({ project }) {
  const image = project.thumbnailImage || project.heroImage;
  const imageUrl = getImageUrl(image, 'card');
  const category = getProjectCategory(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className='group flex flex-col gap-4 py-6 no-underline sm:flex-row sm:items-start sm:gap-6'
    >
      {imageUrl && (
        <div className='w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-56 lg:w-72'>
          <Image
            src={imageUrl}
            alt={getMediaAlt(image, project.title)}
            width={768}
            height={432}
            className='aspect-[16/10] h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      )}
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2'>
          <h3 className='text-balance text-lg font-semibold tracking-tighter'>
            {project.title}
          </h3>
          <LuArrowUpRight className='h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
        </div>
        {category && (
          <p className='mt-1 font-mono text-xs text-muted-foreground'>
            {category}
          </p>
        )}
        {project.summary && (
          <p className='mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground'>
            {project.summary}
          </p>
        )}
      </div>
    </Link>
  );
}

function PostRow({ post }) {
  const publishedDate = formatDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className='group flex flex-col gap-1 py-5 no-underline sm:flex-row sm:items-baseline sm:gap-6'
    >
      {publishedDate && (
        <p className='shrink-0 font-mono text-xs text-muted-foreground sm:w-28 sm:pt-1'>
          {publishedDate}
        </p>
      )}
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2'>
          <h3 className='text-balance font-semibold tracking-tighter'>
            {post.title}
          </h3>
          <LuArrowUpRight className='h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
        </div>
        {post.excerpt && (
          <p className='mt-1 line-clamp-1 text-sm leading-6 text-muted-foreground'>
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export default async function Home() {
  const [profile, featuredProjects, posts] = await Promise.all([
    getProfile(),
    getFeaturedProjects(3),
    getPosts(),
  ]);

  const profileImageUrl = getMediaUrl(
    profile.profileImage,
    '/api/payload/media/file/profile.webp',
  );
  const resumeUrl = getMediaUrl(profile.resume);
  const latestPosts = posts.docs.slice(0, 3);
  const socialLinks = (profile.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const configuredTitles = (profile.rotatingTitles ?? [])
    .map(({ label }) => label)
    .filter(Boolean);
  const rotatingTitles = configuredTitles.length
    ? configuredTitles
    : ['Developer', 'Engineer', 'Tinkerer', 'Homelabber'];

  return (
    <div className='flex flex-col gap-16 sm:gap-24'>
      <section className='flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10'>
        {profileImageUrl && (
          <Image
            src={profileImageUrl}
            alt={getMediaAlt(
              profile.profileImage,
              'Taylor Horwood profile photo',
            )}
            width={320}
            height={320}
            className='size-40 shrink-0 rounded-xl object-cover sm:size-52 lg:size-64'
            priority
          />
        )}
        <div className='space-y-5'>
          <div className='space-y-3'>
            <Eyebrow>{profile.name ?? 'Taylor Horwood'}</Eyebrow>
            <h1 className='text-balance text-4xl font-semibold leading-none tracking-tightest sm:text-5xl md:text-6xl'>
              Hi, I&apos;m Taylor.
            </h1>
            <div className='flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-semibold tracking-tighter sm:text-2xl'>
              <span>I&apos;m a</span>
              <RotatingText
                texts={rotatingTitles}
                mainClassName='inline-flex max-w-full justify-center overflow-hidden rounded-lg border border-brand bg-background px-2.5 py-1'
                staggerFrom='last'
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName='overflow-hidden'
                transition={{ damping: 30, stiffness: 400, type: 'spring' }}
                rotationInterval={2200}
              />
            </div>
          </div>
          <p className='max-w-2xl text-pretty leading-7 text-muted-foreground'>
            {profile.headline ??
              'DevOps/SRE engineer building reliable systems, self-hosted infrastructure, and practical web tools.'}
          </p>
          <div className='flex flex-wrap items-center gap-x-5 gap-y-3'>
            <Link
              href='/projects'
              className='inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition hover:bg-brand/90'
            >
              View projects <LuArrowUpRight className='h-4 w-4' />
            </Link>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground'>
              <Link
                href={`mailto:${profile.email ?? 'contact@tjhorwood.com'}`}
                className='no-underline transition-colors hover:text-foreground'
              >
                Email
              </Link>
              {resumeUrl && (
                <Link
                  href={resumeUrl}
                  className='no-underline transition-colors hover:text-foreground'
                >
                  Resume
                </Link>
              )}
              {socialLinks.map(({ href, name }) => (
                <Link
                  key={name}
                  href={href}
                  className='no-underline transition-colors hover:text-foreground'
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {profile.intro && (
        <section className='border-t border-border pt-10'>
          <Eyebrow>About</Eyebrow>
          <p className='mt-3 max-w-3xl text-pretty leading-7 text-muted-foreground'>
            {profile.intro}
          </p>
          <Link
            href='/about'
            className='group mt-4 inline-flex items-center gap-1.5 text-sm font-medium no-underline'
          >
            More about me
            <LuArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </Link>
        </section>
      )}

      {featuredProjects.length > 0 && (
        <section>
          <SectionHeader
            eyebrow='Work'
            title='Selected projects'
            href='/projects'
            linkLabel='All projects'
          />
          <div className='divide-y divide-border'>
            {featuredProjects.map((project) => (
              <ProjectRow key={project.id ?? project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section>
          <SectionHeader
            eyebrow='Writing'
            title='Recent notes'
            href='/blog'
            linkLabel='Read the blog'
          />
          <div className='divide-y divide-border'>
            {latestPosts.map((post) => (
              <PostRow key={post.id ?? post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
