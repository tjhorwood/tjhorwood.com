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
        'group rounded-3xl border border-border bg-card no-underline shadow-sm transition hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
    >
      {children}
    </Link>
  );
}

function FocusItem({ description, icon: Icon, title }) {
  return (
    <div className='rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6'>
      <div className='mb-5 inline-flex rounded-2xl border border-border bg-secondary p-3'>
        <Icon className='h-5 w-5 text-muted-foreground' />
      </div>
      <h2 className='text-balance text-xl font-bold tracking-tight'>{title}</h2>
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
          <div className='flex h-full items-center justify-center bg-linear-to-br from-secondary via-background to-primary/10'>
            <LuFolder className='h-8 w-8 text-muted-foreground' />
          </div>
        )}
      </div>
      <div className='p-5 sm:p-6'>
        <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
          Latest work
        </p>
        <h2 className='mt-3 text-balance text-2xl font-bold tracking-tight'>
          {project.title}
        </h2>
        <p className='mt-2 text-sm font-semibold text-muted-foreground'>
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
        <div className='rounded-2xl border border-border bg-secondary p-3'>
          <LuNewspaper className='h-5 w-5 text-muted-foreground' />
        </div>
        <LuArrowUpRight className='h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
      </div>
      <p className='mt-6 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
        Latest post
      </p>
      <h2 className='mt-3 text-balance text-2xl font-bold tracking-tight'>
        {post.title}
      </h2>
      {publishedDate && (
        <p className='mt-2 text-sm font-semibold text-muted-foreground'>
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
    <div className='flex flex-wrap gap-3'>
      {links.map(({ href, icon, name }) => {
        const Icon = getIcon(icon || name);
        return (
          <Link
            key={name}
            href={href}
            className='inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground no-underline transition hover:text-foreground'
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
  const rotatingTitles = profile.rotatingTitles?.map(({ label }) => label) ?? [
    'Developer',
    'Engineer',
    'Tinkerer',
    'Homelabber',
  ];

  return (
    <div className='mx-auto flex max-w-7xl flex-col gap-6 sm:gap-10'>
      <section className='grid gap-5 rounded-[1.75rem] border border-border/80 bg-linear-to-br from-secondary/55 via-background to-background p-5 shadow-sm sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8'>
        <div className='flex flex-col justify-between gap-6 sm:gap-8'>
          <div className='space-y-5 sm:space-y-6'>
            <div className='flex flex-wrap gap-1.5 sm:gap-2'>
              <span className='rounded-full border border-border bg-background/80 px-2.5 py-1 text-[0.7rem] font-semibold text-muted-foreground shadow-sm backdrop-blur sm:px-3 sm:text-xs'>
                DevOps / SRE
              </span>
              <span className='rounded-full border border-border bg-background/80 px-2.5 py-1 text-[0.7rem] font-semibold text-muted-foreground shadow-sm backdrop-blur sm:px-3 sm:text-xs'>
                Homelab
              </span>
              <span className='rounded-full border border-border bg-background/80 px-2.5 py-1 text-[0.7rem] font-semibold text-muted-foreground shadow-sm backdrop-blur sm:px-3 sm:text-xs'>
                Builder
              </span>
            </div>

            <div className='space-y-4 sm:space-y-5'>
              <p className='text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-sm sm:tracking-[0.22em]'>
                Taylor Horwood
              </p>
              <div className='flex flex-col gap-3 sm:gap-4'>
                <h1 className='text-balance text-[2.55rem] font-bold leading-[1.05] tracking-[-0.055em] sm:text-[3rem] md:text-6xl'>
                  Hi, I&apos;m Taylor.
                </h1>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                  <span className='text-[1.7rem] font-bold leading-none tracking-tight sm:text-3xl md:text-5xl'>
                    I&apos;m a
                  </span>
                  <RotatingText
                    texts={rotatingTitles}
                    mainClassName='inline-flex max-w-full justify-center overflow-hidden rounded-2xl border border-border bg-background px-3 py-2 text-[1.7rem] font-bold leading-none tracking-tight shadow-sm sm:px-4 sm:text-3xl md:text-5xl'
                    staggerFrom='last'
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                    staggerDuration={0.025}
                    splitLevelClassName='overflow-hidden'
                    transition={{ damping: 30, stiffness: 400, type: 'spring' }}
                    rotationInterval={2000}
                  />
                </div>
              </div>
              <p className='max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:max-w-3xl md:text-xl md:leading-9'>
                {profile.headline ??
                  'DevOps/SRE engineer building reliable systems, self-hosted infrastructure, and practical web tools.'}
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-2.5 sm:gap-3'>
              <Link
                href='/projects'
                className='inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 md:w-auto'
              >
                View selected work <LuArrowUpRight className='h-4 w-4' />
              </Link>
              <Link
                href={latestPost ? `/blog/${latestPost.slug}` : '/blog'}
                className='inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground md:w-auto'
              >
                Read latest note <LuBookOpen className='h-4 w-4' />
              </Link>
            </div>
          </div>

          <SocialLinks links={profile.socialLinks} />
        </div>

        <aside className='space-y-4'>
          <div className='grid gap-4 rounded-3xl border border-border bg-background/70 p-4 shadow-sm backdrop-blur sm:grid-cols-[auto_1fr]'>
            <Image
              src={profileImageUrl}
              alt={getMediaAlt(
                profile.profileImage,
                'Taylor Horwood profile photo',
              )}
              width={160}
              height={160}
              className='mx-auto size-28 rounded-2xl object-cover sm:mx-0 sm:size-36'
              priority
            />
            <div className='flex flex-col justify-center'>
              <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
                Command center
              </p>
              <h2 className='mt-2 text-2xl font-bold'>
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
              className='inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 font-semibold transition hover:bg-secondary sm:w-auto'
            >
              <LuMail className='h-4 w-4' /> Email
            </Link>
            <Link
              href={resumeUrl}
              className='inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 font-semibold transition hover:bg-secondary sm:w-auto'
            >
              <LuDownload className='h-4 w-4' /> Resume
            </Link>
          </div>
        </aside>
      </section>

      <section className='rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8'>
        <div className='grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground'>
              Currently
            </p>
            <h2 className='mt-2 text-balance text-2xl font-bold tracking-tight sm:text-3xl'>
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

      <section className='rounded-3xl border border-border bg-linear-to-br from-secondary via-background to-secondary/40 p-5 shadow-sm sm:p-6 md:p-8'>
        <div className='grid gap-6 md:grid-cols-[1fr_auto] md:items-center'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground'>
              Away from the keyboard
            </p>
            <h2 className='mt-2 text-balance text-2xl font-bold tracking-tight sm:text-3xl'>
              Family time, trails, games, projects, and the next thing to learn.
            </h2>
            <p className='mt-3 max-w-3xl leading-7 text-muted-foreground'>
              The work matters, but it is not the whole story. The deeper bio,
              timeline, hobbies, and current focus live on the About page.
            </p>
          </div>
          <Link
            href='/about'
            className='inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 font-semibold no-underline transition hover:bg-secondary md:w-auto'
          >
            Get the full story <LuArrowUpRight className='h-4 w-4' />
          </Link>
        </div>
      </section>
    </div>
  );
}
