import Image from 'next/image';
import { LuArrowUpRight, LuDownload } from 'react-icons/lu';
import AnimatedContent from '@/components/animations/AnimatedContent';
import Eyebrow from '@/components/Eyebrow';
import Link from '@/components/Link';
import { getIcon } from '@/lib/iconMap';
import { getMediaUrl } from '@/lib/media';
import {
  cardSurfaceClass,
  mediaFrameClass,
  primaryActionClass,
  secondaryActionClass,
} from '@/lib/styles';
import { cn } from '@/lib/utils';
import { getAboutPage, getProfile } from '@/payload/queries/getGlobals';
import { getTechnologiesByCategory } from '@/payload/queries/getTechnologiesByCategory';
import { getWorkExperience } from '@/payload/queries/getWorkExperience';

export const dynamic = 'force-dynamic';

const NOW_ITEMS = [
  'Running a home-production homelab across Proxmox, Docker, Tailscale, and Cloudflare.',
  'Building Payload-backed personal sites, content workflows, and small automations.',
  'Experimenting with agent workflows, monitoring, self-hosting, and practical SRE patterns.',
];

const INTERESTS = [
  'Family',
  'Hiking / biking',
  'Games',
  'Gym',
  'Cars',
  'Tinkering',
];

const CAPABILITY_GROUPS = [
  {
    groups: ['platforms'],
    keywords: [
      'docker',
      'kubernetes',
      'proxmox',
      'linux',
      'tailscale',
      'cloudflare',
    ],
    title: 'Systems & infrastructure',
  },
  {
    groups: ['skills', 'platforms'],
    keywords: ['aws', 'azure', 'gcp', 'cloud', 'terraform', 'ansible'],
    title: 'Cloud & platform',
  },
  {
    groups: ['skills'],
    keywords: ['react', 'next', 'javascript', 'typescript', 'payload', 'node'],
    title: 'App development',
  },
  {
    groups: ['databases'],
    keywords: ['postgres', 'mysql', 'mongo', 'redis', 'sql'],
    title: 'Data & storage',
  },
  {
    groups: ['skills', 'platforms'],
    keywords: ['monitor', 'grafana', 'prometheus', 'observability', 'ci', 'cd'],
    title: 'Automation & reliability',
  },
];

export async function generateMetadata() {
  const aboutPage = await getAboutPage();
  return {
    description: aboutPage.seo?.description ?? 'About Me',
    title: aboutPage.seo?.title ?? 'About',
  };
}

function toTechItems(docs, group) {
  return docs.map((item) => ({
    colorClass: item.colorClass,
    group,
    icon: getIcon(item.icon || item.name),
    name: item.shortName ?? item.name,
    rawName: item.name,
  }));
}

function selectTechnologies(technologies, capability) {
  const matching = technologies.filter((technology) => {
    const name = technology.rawName.toLowerCase();
    return (
      capability.groups.includes(technology.group) &&
      capability.keywords.some((keyword) => name.includes(keyword))
    );
  });

  if (matching.length > 0) return matching.slice(0, 10);

  return technologies
    .filter((technology) => capability.groups.includes(technology.group))
    .slice(0, 10);
}

function AboutHero({ aboutPage, profile, resumeUrl, interests }) {
  const imageUrl = getMediaUrl(profile.profileImage);

  return (
    <section className='flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-12'>
      {imageUrl && (
        <div
          className={cn(
            mediaFrameClass,
            'w-40 shrink-0 rounded-3xl sm:w-52 lg:w-64',
          )}
        >
          <Image
            src={imageUrl}
            alt={`${profile.name ?? 'Taylor Horwood'} profile photo`}
            width={512}
            height={512}
            className='aspect-square h-full w-full object-cover'
            priority
          />
        </div>
      )}
      <div className='space-y-6'>
        <div className='space-y-4'>
          <Eyebrow>About</Eyebrow>
          <h1 className='text-display font-semibold'>
            {aboutPage.title ?? 'About Me'}
          </h1>
          <p className='max-w-2xl text-pretty text-lg leading-8 text-muted-foreground'>
            {profile.headline ??
              'DevOps/SRE engineer building reliable systems, self-hosted infrastructure, and useful web tools.'}
          </p>
          {aboutPage.intro && (
            <p className='max-w-2xl text-pretty leading-8 text-muted-foreground'>
              {aboutPage.intro}
            </p>
          )}
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <Link href='/projects' className={primaryActionClass}>
            View projects <LuArrowUpRight className='h-4 w-4' />
          </Link>
          {resumeUrl && (
            <a href={resumeUrl} download className={secondaryActionClass}>
              <LuDownload className='h-4 w-4' /> Resume
            </a>
          )}
        </div>

        {interests.length > 0 && (
          <p className='flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground'>
            {interests.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

function StorySection({ paragraphs, strengths }) {
  if (paragraphs.length === 0 && strengths.length === 0) return null;

  return (
    <section className='section-rule grid gap-10 lg:grid-cols-[1.4fr_0.6fr]'>
      <div>
        <Eyebrow>The short version</Eyebrow>
        <div className='mt-5 space-y-5 text-pretty leading-8 text-muted-foreground'>
          {paragraphs.map(({ content }, index) => (
            <p key={`${content}-${index}`}>{content}</p>
          ))}
        </div>
      </div>

      {strengths.length > 0 && (
        <dl className='space-y-4'>
          {strengths.map(({ description, label }) => (
            <div key={label} className={cn(cardSurfaceClass, 'p-5')}>
              <dt className='font-medium'>{label}</dt>
              <dd className='mt-1.5 text-sm leading-6 text-muted-foreground'>
                {description}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

function CapabilitiesSection({ technologies }) {
  const populated = CAPABILITY_GROUPS.map((capability) => ({
    capability,
    items: selectTechnologies(technologies, capability),
  })).filter(({ items }) => items.length > 0);

  if (populated.length === 0) return null;

  return (
    <section className='section-rule'>
      <Eyebrow>Capabilities</Eyebrow>
      <h2 className='mt-3 text-headline font-semibold'>
        The stack behind the way I work
      </h2>
      <div className='mt-8 grid gap-4 sm:grid-cols-2'>
        {populated.map(({ capability, items }) => (
          <div key={capability.title} className={cn(cardSurfaceClass, 'p-6')}>
            <h3 className='font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground'>
              {capability.title}
            </h3>
            <div className='mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm'>
              {items.map(({ colorClass, icon: TechIcon, name }) => (
                <span
                  key={`${capability.title}-${name}`}
                  className='inline-flex items-center gap-1.5'
                >
                  <TechIcon className={cn('h-3.5 w-3.5', colorClass)} /> {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NowSection({ items }) {
  if (items.length === 0) return null;

  return (
    <section className='section-rule'>
      <Eyebrow>Now</Eyebrow>
      <h2 className='mt-3 text-headline font-semibold'>
        What I am currently exploring
      </h2>
      <ul className='mt-6 max-w-2xl space-y-3 text-pretty leading-8 text-muted-foreground'>
        {items.map((item) => (
          <li key={item} className='flex gap-3'>
            <span className='mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground' />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function WorkTimeline({ items }) {
  if (items.length === 0) return null;

  return (
    <section className='section-rule'>
      <Eyebrow>Work</Eyebrow>
      <h2 className='mt-3 text-headline font-semibold'>Experience timeline</h2>

      <ol className='mt-8 space-y-4'>
        {items.map((item) => {
          const logoUrl = getMediaUrl(item.logo);
          return (
            <li
              key={`${item.company}-${item.title}-${item.time}`}
              className={cn(
                cardSurfaceClass,
                'flex flex-col gap-3 p-6 sm:flex-row sm:gap-6',
              )}
            >
              <div className='flex items-center gap-3 sm:w-40 sm:shrink-0 sm:flex-col sm:items-start sm:gap-3'>
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={`${item.company} logo`}
                    width={40}
                    height={40}
                    className='h-9 w-9 rounded-full border border-border object-cover'
                    loading='lazy'
                  />
                )}
                {item.time && (
                  <p className='font-mono text-xs text-muted-foreground'>
                    {item.time}
                  </p>
                )}
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className='text-title font-semibold'>{item.title}</h3>
                <p className='text-muted-foreground'>{item.company}</p>
                {item.responsibilities?.length > 0 && (
                  <ul className='mt-3 grid gap-1.5 text-sm leading-6 text-muted-foreground sm:grid-cols-2'>
                    {item.responsibilities
                      .slice(0, 4)
                      .map((responsibility, index) => (
                        <li
                          key={`${item.company}-${index}`}
                          className='flex gap-2'
                        >
                          <span className='mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50' />
                          {responsibility.content}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function CrossLinks() {
  return (
    <section className='section-rule grid gap-4 sm:grid-cols-3'>
      {[
        { href: '/projects', label: 'See the systems', title: 'Projects' },
        { href: '/blog', label: 'Read the notes', title: 'Blog' },
        { href: '/gear', label: 'Browse the setup', title: 'Gear' },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            cardSurfaceClass,
            'group flex flex-col justify-between gap-6 p-6 no-underline',
          )}
        >
          <h2 className='text-title font-semibold'>{item.title}</h2>
          <span className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-foreground'>
            {item.label}
            <LuArrowUpRight className='h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
          </span>
        </Link>
      ))}
    </section>
  );
}

export default async function About() {
  const [aboutPage, profile, skills, platforms, databases, work] =
    await Promise.all([
      getAboutPage(),
      getProfile(),
      getTechnologiesByCategory('skills'),
      getTechnologiesByCategory('platforms'),
      getTechnologiesByCategory('databases'),
      getWorkExperience(),
    ]);

  const resumeUrl = getMediaUrl(profile.resume);
  const technologies = [
    ...toTechItems(skills.docs, 'skills'),
    ...toTechItems(platforms.docs, 'platforms'),
    ...toTechItems(databases.docs, 'databases'),
  ];

  return (
    <div className='mx-auto flex max-w-5xl flex-col'>
      <AnimatedContent>
        <AboutHero
          aboutPage={aboutPage}
          profile={profile}
          resumeUrl={resumeUrl}
          interests={INTERESTS}
        />
      </AnimatedContent>

      <AnimatedContent>
        <StorySection
          paragraphs={aboutPage.paragraphs ?? []}
          strengths={aboutPage.strengths ?? []}
        />
      </AnimatedContent>

      <AnimatedContent>
        <CapabilitiesSection technologies={technologies} />
      </AnimatedContent>

      <AnimatedContent>
        <NowSection items={NOW_ITEMS} />
      </AnimatedContent>

      <AnimatedContent>
        <WorkTimeline items={work.docs} />
      </AnimatedContent>

      <AnimatedContent>
        <CrossLinks />
      </AnimatedContent>
    </div>
  );
}
