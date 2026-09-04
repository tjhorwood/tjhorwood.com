import Image from 'next/image';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import Eyebrow from '@/components/Eyebrow';
import Link from '@/components/Link';
import PostCard from '@/components/PostCard';
import ProcessTabs from '@/components/ProcessTabs';
import ProjectCard from '@/components/ProjectCard';
import ServiceGrid from '@/components/ServiceGrid';
import StatStrip from '@/components/StatStrip';
import { getMediaAlt, getMediaUrl } from '@/lib/media';
import {
  mediaFrameClass,
  primaryActionClass,
  secondaryActionClass,
} from '@/lib/styles';
import { cn } from '@/lib/utils';
import { getProfile } from '@/payload/queries/getGlobals';
import { getPosts } from '@/payload/queries/getPosts';
import { getFeaturedProjects } from '@/payload/queries/getProjects';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/' },
};

function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function getPostTopics(post) {
  const categories = (post.categories ?? [])
    .map((c) => (!c || typeof c === 'number' ? null : c.name))
    .filter(Boolean);
  const tags = (post.tags ?? [])
    .map((t) => (!t || typeof t === 'number' ? null : (t.shortName ?? t.name)))
    .filter(Boolean);
  return [...categories, ...tags];
}

function SectionHeader({ eyebrow, title, href, linkLabel }) {
  return (
    <div className='flex items-end justify-between gap-4'>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className='mt-3 text-headline font-semibold'>{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className='group hidden shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground no-underline transition-colors hover:text-foreground sm:inline-flex'
        >
          {linkLabel}
          <LuArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
        </Link>
      )}
    </div>
  );
}

export default async function Home() {
  const [profile, featuredProjects, posts] = await Promise.all([
    getProfile(),
    getFeaturedProjects(4),
    getPosts(),
  ]);

  const profileImageUrl = getMediaUrl(
    profile.profileImage,
    '/api/payload/media/file/profile.webp',
  );
  const resumeUrl = getMediaUrl(profile.resume);
  const socialLinks = (profile.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const configuredTitles = (profile.rotatingTitles ?? [])
    .map(({ label }) => label)
    .filter(Boolean);
  const roles = configuredTitles.length
    ? configuredTitles
    : ['Developer', 'Engineer', 'Tinkerer', 'Homelabber'];

  const latestPosts = posts.docs.slice(0, 3).map((post) => ({
    ...post,
    publishedDate: formatDate(post.publishedAt),
    topics: getPostTopics(post),
  }));

  return (
    <div className='space-y-20 md:space-y-28'>
      <section className='flex flex-col-reverse gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12 lg:gap-16'>
        <div className='max-w-2xl space-y-6'>
          <div className='space-y-4'>
            <Eyebrow>{profile.name ?? 'Taylor Horwood'}</Eyebrow>
            <h1 className='text-display font-semibold'>Hi, I&apos;m Taylor.</h1>
            <p className='font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground'>
              {roles.join('  ·  ')}
            </p>
          </div>
          <p className='max-w-2xl text-pretty text-lg leading-8 text-muted-foreground'>
            {profile.headline ??
              'DevOps/SRE engineer building reliable systems, self-hosted infrastructure, and practical web tools.'}
          </p>
          <div className='flex flex-wrap items-center gap-3 pt-1'>
            <Link href='/projects' className={primaryActionClass}>
              View projects <LuArrowUpRight className='h-4 w-4' />
            </Link>
            <Link
              href={`mailto:${profile.email ?? 'contact@tjhorwood.com'}`}
              className={secondaryActionClass}
            >
              Get in touch
            </Link>
          </div>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 font-mono text-xs text-muted-foreground'>
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
        {profileImageUrl && (
          <div
            className={cn(
              mediaFrameClass,
              'w-40 shrink-0 rounded-3xl xs:w-48 sm:w-56 lg:w-64',
            )}
          >
            <Image
              src={profileImageUrl}
              alt={getMediaAlt(
                profile.profileImage,
                'Taylor Horwood profile photo',
              )}
              width={320}
              height={320}
              className='aspect-square h-full w-full object-cover'
              priority
            />
          </div>
        )}
      </section>

      <section>
        <StatStrip />
      </section>

      {profile.intro && (
        <section>
          <Eyebrow>About</Eyebrow>
          <p className='mt-4 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground'>
            {profile.intro}
          </p>
          <Link
            href='/about'
            className='group mt-6 inline-flex items-center gap-1.5 text-sm font-medium no-underline'
          >
            More about me
            <LuArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </Link>
        </section>
      )}

      <section>
        <div className='mb-8'>
          <Eyebrow>What I do</Eyebrow>
          <h2 className='mt-3 text-headline font-semibold'>
            Four things, done properly
          </h2>
        </div>
        <ServiceGrid />
      </section>

      {featuredProjects.length > 0 && (
        <section>
          <SectionHeader
            eyebrow='Work'
            title='Selected projects'
            href='/projects'
            linkLabel='All projects'
          />
          <div className='mt-8 grid gap-4 sm:grid-cols-2'>
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id ?? project.slug}
                project={project}
                priority={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className='mb-8'>
          <Eyebrow>How I work</Eyebrow>
          <h2 className='mt-3 text-headline font-semibold'>
            Scope, build, ship, operate
          </h2>
        </div>
        <ProcessTabs />
      </section>

      {latestPosts.length > 0 && (
        <section>
          <SectionHeader
            eyebrow='Writing'
            title='Recent notes'
            href='/blog'
            linkLabel='Read the blog'
          />
          <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {latestPosts.map((post) => (
              <PostCard key={post.id ?? post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
