import Image from 'next/image';
import {
  LuArrowUpRight,
  LuBookOpen,
  LuCode,
  LuDownload,
  LuFolder,
  LuMail,
  LuNewspaper,
  LuServerCog,
} from 'react-icons/lu';
import RotatingText from '@/components/animations/RotatingText';
import Eyebrow from '@/components/Eyebrow';
import Link from '@/components/Link';
import { getIcon } from '@/lib/iconMap';
import { getMediaAlt, getMediaUrl } from '@/lib/media';
import { cn } from '@/lib/utils';
import { getProfile } from '@/payload/queries/getGlobals';
import { getPosts } from '@/payload/queries/getPosts';
import { getProjects } from '@/payload/queries/getProjects';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/' },
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

function CardLink({ children, className, href }) {
  return (
    <Link
      href={href}
      className={cn(
        'group rounded-xl border border-border bg-card no-underline transition-colors hover:border-foreground/30',
        className,
      )}
    >
      {children}
    </Link>
  );
}

function FocusItem({ description, icon: Icon, title }) {
  return (
    <div className='rounded-xl border border-border bg-card p-5 sm:p-6'>
      <div className='mb-5 inline-flex rounded-lg border border-border bg-secondary p-2.5'>
        <Icon className='h-5 w-5 text-foreground' />
      </div>
      <h2 className='text-balance text-lg font-semibold tracking-tighter'>
        {title}
      </h2>
      <p className='mt-3 text-sm leading-6 text-muted-foreground'>
        {description}
      </p>
    </div>
  );
}

function ProjectPreview({ project }) {
  if (!project) return null;

  const image = project.thumbnailImage || project.heroImage;
  const imageUrl = getImageUrl(image, 'card');
  const imageDimensions = getImageDimensions(image, 'card');

  return (
    <CardLink href={`/projects/${project.slug}`} className='overflow-hidden'>
      <div className='h-52 overflow-hidden border-border border-b bg-muted'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt || project.title}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
            priority
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-blueprint'>
            <LuFolder className='h-8 w-8 text-muted-foreground' />
          </div>
        )}
      </div>
      <div className='p-5 sm:p-6'>
        <Eyebrow>Latest work</Eyebrow>
        <h2 className='mt-3 text-balance text-2xl font-semibold tracking-tighter'>
          {project.title}
        </h2>
        <p className='mt-2 font-mono text-xs text-muted-foreground'>
          {getProjectCategory(project)}
        </p>
        <p className='mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground'>
          {project.summary}
        </p>
      </div>
    </CardLink>
  );
}

function PostPreview({ post }) {
  if (!post) return null;

  const publishedDate = formatDate(post.publishedAt);

  return (
    <CardLink href={`/blog/${post.slug}`} className='block p-5 sm:p-6'>
      <div className='flex items-start justify-between gap-4'>
        <div className='rounded-lg border border-border bg-secondary p-2.5'>
          <LuNewspaper className='h-5 w-5 text-foreground' />
        </div>
        <LuArrowUpRight className='h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
      </div>
      <Eyebrow className='mt-6'>Latest post</Eyebrow>
      <h2 className='mt-3 text-balance text-2xl font-semibold tracking-tighter'>
        {post.title}
      </h2>
      {publishedDate && (
        <p className='mt-2 font-mono text-xs text-muted-foreground'>
          {publishedDate}
        </p>
      )}
      {post.excerpt && (
        <p className='mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground'>
          {post.excerpt}
        </p>
      )}
    </CardLink>
  );
}

function SocialLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className='flex flex-wrap gap-2'>
      {links.map(({ href, icon, name }) => {
        const Icon = getIcon(icon || name);
        return (
          <Link
            key={name}
            href={href}
            className='inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-xs text-muted-foreground no-underline transition-colors hover:border-foreground/30 hover:text-foreground'
          >
            <Icon className='h-4 w-4' /> {name}
          </Link>
        );
      })}
    </div>
  );
}

export default async function Home() {
  const [profile, projects, posts] = await Promise.all([
    getProfile(),
    getProjects(),
    getPosts(),
  ]);

  const profileImageUrl = getMediaUrl(
    profile.profileImage,
    '/api/payload/media/file/profile.webp',
  );
  const resumeUrl = getMediaUrl(
    profile.resume,
    '/api/payload/media/file/resume.pdf',
  );
  const featuredProject =
    projects.docs.find((project) => project.featured) ?? projects.docs[0];
  const latestPost = posts.docs[0];
  const configuredTitles = (profile.rotatingTitles ?? [])
    .map(({ label }) => label)
    .filter(Boolean);
  const rotatingTitles = configuredTitles.length
    ? configuredTitles
    : ['Developer', 'Engineer', 'Tinkerer', 'Homelabber'];

  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-12 sm:gap-20'>
      <section className='relative grid gap-8 overflow-hidden rounded-xl border border-border bg-card p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10'>
        <div className='pointer-events-none absolute inset-0 bg-blueprint opacity-60' />
        <div className='relative flex flex-col justify-between gap-8 sm:gap-10'>
          <div className='space-y-6 sm:space-y-8'>
            <div className='flex flex-wrap gap-2'>
              {['DevOps / SRE', 'Homelab', 'Builder'].map((tag) => (
                <span
                  key={tag}
                  className='rounded-full border border-border bg-background px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground'
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className='space-y-5'>
              <Eyebrow>Taylor Horwood</Eyebrow>
              <div className='flex flex-col gap-3'>
                <h1 className='text-balance text-5xl font-semibold leading-[0.98] tracking-tightest sm:text-6xl md:text-7xl'>
                  Hi, I&apos;m Taylor.
                </h1>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                  <span className='text-2xl font-semibold leading-none tracking-tighter sm:text-3xl md:text-4xl'>
                    I&apos;m a
                  </span>
                  <RotatingText
                    texts={rotatingTitles}
                    mainClassName='inline-flex max-w-full justify-center overflow-hidden rounded-lg border border-brand bg-background px-3 py-2 text-2xl font-semibold leading-none tracking-tighter sm:px-4 sm:text-3xl md:text-4xl'
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
              <p className='max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8'>
                {profile.headline ??
                  'DevOps/SRE engineer building reliable systems, self-hosted infrastructure, and practical web tools.'}
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-2.5 sm:gap-3'>
              <Link
                href='/projects'
                className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition hover:bg-brand/90 md:w-auto'
              >
                View selected work <LuArrowUpRight className='h-4 w-4' />
              </Link>
              <Link
                href={latestPost ? `/blog/${latestPost.slug}` : '/blog'}
                className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground md:w-auto'
              >
                Read latest note <LuBookOpen className='h-4 w-4' />
              </Link>
            </div>
          </div>

          <SocialLinks links={profile.socialLinks} />
        </div>

        <aside className='relative space-y-3'>
          <div className='grid gap-4 rounded-xl border border-border bg-background p-4 sm:grid-cols-[auto_1fr]'>
            <Image
              src={profileImageUrl}
              alt={getMediaAlt(
                profile.profileImage,
                'Taylor Horwood profile photo',
              )}
              width={160}
              height={160}
              className='mx-auto size-28 rounded-lg object-cover sm:mx-0 sm:size-36'
              priority
            />
            <div className='flex flex-col justify-center'>
              <Eyebrow>Command center</Eyebrow>
              <h2 className='mt-2 text-xl font-semibold tracking-tighter'>
                {profile.name ?? 'Taylor Horwood'}
              </h2>
              <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                Quick links into the systems, notes, setup, and deeper personal
                background behind the site.
              </p>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <Link
              href={`mailto:${profile.email ?? 'contact@tjhorwood.com'}`}
              className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-secondary sm:w-auto'
            >
              <LuMail className='h-4 w-4' /> Email
            </Link>
            <Link
              href={resumeUrl}
              className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-secondary sm:w-auto'
            >
              <LuDownload className='h-4 w-4' /> Resume
            </Link>
          </div>
        </aside>
      </section>

      <section>
        <div className='grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start'>
          <div>
            <Eyebrow>Currently</Eyebrow>
            <h2 className='mt-3 text-balance text-2xl font-semibold tracking-tighter sm:text-3xl'>
              The things I keep coming back to.
            </h2>
            <p className='mt-3 max-w-2xl leading-7 text-muted-foreground'>
              Less directory, more front porch: a quick read on the systems,
              experiments, and notes shaping what I build next.
            </p>
          </div>
          <div className='grid gap-4 sm:grid-cols-3'>
            <FocusItem
              icon={LuServerCog}
              title='Operating home production'
              description='Self-hosted infrastructure, observability, networking, and the small reliability decisions that keep services boring.'
            />
            <FocusItem
              icon={LuCode}
              title='Building practical tools'
              description='Web apps, automations, and CMS-backed projects that solve real problems without unnecessary ceremony.'
            />
            <FocusItem
              icon={LuBookOpen}
              title='Capturing lessons'
              description='Notes from SRE work, homelab experiments, tradeoffs, and the occasional rabbit hole worth documenting.'
            />
          </div>
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
        <ProjectPreview project={featuredProject} />
        <PostPreview post={latestPost} />
      </section>

      <section className='rounded-xl border border-border bg-card p-5 sm:p-8'>
        <div className='grid gap-6 md:grid-cols-[1fr_auto] md:items-center'>
          <div>
            <Eyebrow>Away from the keyboard</Eyebrow>
            <h2 className='mt-3 text-balance text-2xl font-semibold tracking-tighter sm:text-3xl'>
              Family time, trails, games, projects, and the next thing to learn.
            </h2>
            <p className='mt-3 max-w-3xl leading-7 text-muted-foreground'>
              The work matters, but it is not the whole story. The deeper bio,
              timeline, hobbies, and current focus live on the About page.
            </p>
          </div>
          <Link
            href='/about'
            className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border px-5 text-sm font-medium no-underline transition-colors hover:border-foreground/30 hover:bg-secondary md:w-auto'
          >
            Get the full story <LuArrowUpRight className='h-4 w-4' />
          </Link>
        </div>
      </section>
    </div>
  );
}
