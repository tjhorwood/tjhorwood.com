import Image from 'next/image';
import {
  LuArrowUpRight,
  LuBike,
  LuBriefcaseBusiness,
  LuCar,
  LuCloud,
  LuCode,
  LuDownload,
  LuDumbbell,
  LuGamepad2,
  LuHouse,
  LuLayers,
  LuMountain,
  LuServerCog,
  LuShieldCheck,
  LuSparkles,
  LuTerminal,
  LuUsers,
  LuWrench,
} from 'react-icons/lu';
import AnimatedContent from '@/components/animations/AnimatedContent';
import Link from '@/components/Link';
import { getIcon } from '@/lib/iconMap';
import { getMediaUrl } from '@/lib/media';
import { cn } from '@/lib/utils';
import { getAboutPage, getProfile } from '@/payload/queries/getGlobals';
import { getTechnologiesByCategory } from '@/payload/queries/getTechnologiesByCategory';
import { getWorkExperience } from '@/payload/queries/getWorkExperience';

export const dynamic = 'force-dynamic';

const STORY_CARDS = [
  {
    description:
      'Reliability, observability, automation, deployment safety, and practical tradeoffs for systems people actually depend on.',
    icon: LuServerCog,
    title: 'Operator',
  },
  {
    description:
      'Next.js, Payload, Docker, homelab services, scripts, and useful tools stitched together with clean delivery paths.',
    icon: LuCode,
    title: 'Builder',
  },
  {
    description:
      'Family adventures, hiking, biking, games, cars, gym time, and constant tinkering keep the problem-solving muscles sharp.',
    icon: LuMountain,
    title: 'Explorer',
  },
];

const NOW_ITEMS = [
  'Running a home-production homelab across Proxmox, Docker, Tailscale, and Cloudflare.',
  'Building Payload-backed personal sites, content workflows, and small automations.',
  'Experimenting with agent workflows, monitoring, self-hosting, and practical SRE patterns.',
];

const PERSONAL_CHIPS = [
  { icon: LuHouse, label: 'Family' },
  { icon: LuBike, label: 'Hiking / biking' },
  { icon: LuGamepad2, label: 'Games' },
  { icon: LuDumbbell, label: 'Gym' },
  { icon: LuCar, label: 'Cars' },
  { icon: LuWrench, label: 'Tinkering' },
];

const CAPABILITY_GROUPS = [
  {
    groups: ['platforms'],
    icon: LuServerCog,
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
    icon: LuCloud,
    keywords: ['aws', 'azure', 'gcp', 'cloud', 'terraform', 'ansible'],
    title: 'Cloud & platform',
  },
  {
    groups: ['skills'],
    icon: LuCode,
    keywords: ['react', 'next', 'javascript', 'typescript', 'payload', 'node'],
    title: 'App development',
  },
  {
    groups: ['databases'],
    icon: LuLayers,
    keywords: ['postgres', 'mysql', 'mongo', 'redis', 'sql'],
    title: 'Data & storage',
  },
  {
    groups: ['skills', 'platforms'],
    icon: LuShieldCheck,
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

  if (matching.length > 0) return matching.slice(0, 8);

  return technologies
    .filter((technology) => capability.groups.includes(technology.group))
    .slice(0, 8);
}

function StrengthIcon({ label }) {
  const normalized = label.toLowerCase();
  if (normalized.includes('communication') || normalized.includes('team')) {
    return LuUsers;
  }
  if (normalized.includes('learn')) return LuSparkles;
  if (normalized.includes('detail')) return LuShieldCheck;
  return LuWrench;
}

function HeroStat({ label, value }) {
  return (
    <div className='rounded-2xl border border-border bg-background/80 p-4 shadow-sm backdrop-blur'>
      <p className='text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground'>
        {label}
      </p>
      <p className='mt-2 text-lg font-bold'>{value}</p>
    </div>
  );
}

function ProfileImage({ profile }) {
  const imageUrl = getMediaUrl(profile.profileImage);

  if (!imageUrl) {
    return (
      <div className='flex h-full min-h-72 items-center justify-center rounded-3xl border border-border bg-linear-to-br from-secondary via-background to-primary/10'>
        <div className='text-center'>
          <LuTerminal className='mx-auto h-10 w-10 text-muted-foreground' />
          <p className='mt-4 font-mono text-sm text-muted-foreground'>
            thorwood@homelab:~$
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl'>
      <Image
        src={imageUrl}
        alt={`${profile.name ?? 'Taylor Horwood'} profile photo`}
        width={768}
        height={768}
        className='aspect-square h-full w-full object-cover'
        priority
      />
    </div>
  );
}

function AboutHero({ aboutPage, profile, resumeUrl, workCount }) {
  return (
    <section className='grid gap-8 rounded-3xl border border-border bg-linear-to-br from-secondary/60 via-background to-background p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8'>
      <div className='flex flex-col justify-between gap-8'>
        <div className='space-y-6'>
          <div className='flex flex-wrap gap-2'>
            <span className='rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur'>
              DevOps / SRE
            </span>
            <span className='rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur'>
              Homelab operator
            </span>
            <span className='rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur'>
              Builder
            </span>
          </div>

          <div className='space-y-4'>
            <h1 className='text-5xl font-bold tracking-tightest md:text-6xl'>
              {aboutPage.title ?? 'About Me'}
            </h1>
            <p className='max-w-3xl text-xl leading-9 text-muted-foreground'>
              {profile.headline ??
                'DevOps/SRE engineer building reliable systems, self-hosted infrastructure, and useful web tools.'}
            </p>
            <p className='max-w-3xl leading-8 text-muted-foreground'>
              {aboutPage.intro ??
                'Husband, dad, homelabber, outdoors/gym/cars/games tinkerer, and hands-on problem solver.'}
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <Link
              href='/projects'
              className='inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90'
            >
              View projects <LuArrowUpRight className='h-4 w-4' />
            </Link>
            <Link
              href='/blog'
              className='inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 font-semibold transition hover:bg-secondary'
            >
              Read blog <LuArrowUpRight className='h-4 w-4' />
            </Link>
            {resumeUrl && (
              <a
                href={resumeUrl}
                download
                className='inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90'
              >
                <LuDownload className='h-4 w-4' /> Resume
              </a>
            )}
          </div>
        </div>

        <div className='grid gap-3 sm:grid-cols-3'>
          <HeroStat label='Experience' value='15+ years' />
          <HeroStat label='Focus' value='Reliability' />
          <HeroStat label='Work history' value={`${workCount} roles`} />
        </div>
      </div>

      <div className='space-y-4'>
        <ProfileImage profile={profile} />
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
          {PERSONAL_CHIPS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className='inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground'
            >
              <Icon className='h-3.5 w-3.5' /> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection({ paragraphs, strengths }) {
  return (
    <section className='space-y-6'>
      <div className='grid gap-5 md:grid-cols-3'>
        {STORY_CARDS.map(({ description, icon: Icon, title }) => (
          <article
            key={title}
            className='rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
          >
            <Icon className='h-6 w-6 text-muted-foreground' />
            <h2 className='mt-5 text-2xl font-bold tracking-tight'>{title}</h2>
            <p className='mt-3 leading-7 text-muted-foreground'>
              {description}
            </p>
          </article>
        ))}
      </div>

      <div className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
        <article className='rounded-3xl border border-border bg-card/70 p-6 shadow-sm md:p-8'>
          <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
            The short version
          </p>
          <div className='mt-5 space-y-5 leading-8 text-muted-foreground'>
            {paragraphs.map(({ content }, index) => (
              <p key={`${content}-${index}`}>{content}</p>
            ))}
          </div>
        </article>

        {strengths.length > 0 && (
          <div className='grid gap-4'>
            {strengths.map(({ description, label }) => {
              const Icon = StrengthIcon({ label });
              return (
                <article
                  key={label}
                  className='rounded-3xl border border-border bg-secondary/40 p-5 shadow-sm'
                >
                  <Icon className='h-5 w-5 text-muted-foreground' />
                  <h3 className='mt-4 font-bold'>{label}</h3>
                  <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CapabilityPanel({ capability, technologies }) {
  const selectedTechnologies = selectTechnologies(technologies, capability);
  const Icon = capability.icon;

  return (
    <article className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
      <div className='flex items-center gap-3'>
        <div className='rounded-2xl border border-border bg-secondary p-3'>
          <Icon className='h-5 w-5 text-muted-foreground' />
        </div>
        <h2 className='text-xl font-bold tracking-tight'>{capability.title}</h2>
      </div>
      <div className='mt-5 flex flex-wrap gap-2'>
        {selectedTechnologies.map(({ colorClass, icon: TechIcon, name }) => (
          <span
            key={`${capability.title}-${name}`}
            className='inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-semibold'
          >
            <TechIcon className={cn('h-4 w-4', colorClass)} /> {name}
          </span>
        ))}
      </div>
    </article>
  );
}

function CapabilitiesSection({ technologies }) {
  return (
    <section className='space-y-6'>
      <div>
        <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
          Capabilities
        </p>
        <h2 className='mt-2 text-3xl font-bold tracking-tight'>
          The stack behind the way I work
        </h2>
      </div>
      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {CAPABILITY_GROUPS.map((capability) => (
          <CapabilityPanel
            key={capability.title}
            capability={capability}
            technologies={technologies}
          />
        ))}
      </div>
    </section>
  );
}

function NowSection() {
  return (
    <section className='grid gap-5 rounded-3xl border border-border bg-linear-to-br from-secondary via-background to-secondary/40 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8'>
      <div>
        <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
          Now
        </p>
        <h2 className='mt-2 text-3xl font-bold tracking-tight'>
          What I am currently exploring
        </h2>
      </div>
      <div className='grid gap-3'>
        {NOW_ITEMS.map((item) => (
          <div
            key={item}
            className='rounded-2xl border border-border bg-background/80 p-4 leading-7 text-muted-foreground shadow-sm'
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkTimeline({ items }) {
  return (
    <section className='space-y-6'>
      <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
            Work
          </p>
          <h2 className='mt-2 text-3xl font-bold tracking-tight'>
            Experience timeline
          </h2>
        </div>
        <p className='max-w-xl text-sm leading-6 text-muted-foreground'>
          A practical path through customer-facing roles, technical support,
          cloud, software, data, DevOps, and SRE work.
        </p>
      </div>

      <ol className='relative space-y-4 before:absolute before:top-4 before:bottom-4 before:left-5 before:w-px before:bg-border'>
        {items.map((item) => {
          const logoUrl = getMediaUrl(item.logo);
          return (
            <li
              key={`${item.company}-${item.title}-${item.time}`}
              className='relative pl-14'
            >
              <div className='absolute top-5 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm'>
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={`${item.company} logo`}
                    width={40}
                    height={40}
                    className='h-8 w-8 rounded-full object-cover'
                    loading='lazy'
                  />
                ) : (
                  <LuBriefcaseBusiness className='h-4 w-4 text-muted-foreground' />
                )}
              </div>
              <article className='rounded-3xl border border-border bg-card p-5 shadow-sm'>
                <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                  <div>
                    <h3 className='text-xl font-bold'>{item.title}</h3>
                    <p className='text-muted-foreground'>{item.company}</p>
                  </div>
                  {item.time && (
                    <p className='rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground'>
                      {item.time}
                    </p>
                  )}
                </div>
                {item.responsibilities?.length > 0 && (
                  <ul className='mt-4 grid gap-2 text-sm leading-6 text-muted-foreground md:grid-cols-2'>
                    {item.responsibilities
                      .slice(0, 4)
                      .map((responsibility, index) => (
                        <li
                          key={`${item.company}-${index}`}
                          className='flex gap-2'
                        >
                          <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40' />
                          {responsibility.content}
                        </li>
                      ))}
                  </ul>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function CrossLinks() {
  return (
    <section className='grid gap-4 md:grid-cols-3'>
      {[
        { href: '/projects', label: 'See the systems', title: 'Projects' },
        { href: '/blog', label: 'Read the notes', title: 'Blog' },
        { href: '/gear', label: 'Browse the setup', title: 'Gear' },
      ].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='group rounded-3xl border border-border bg-card p-6 no-underline shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
        >
          <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
            {item.label}
          </p>
          <h2 className='mt-3 flex items-center justify-between text-2xl font-bold'>
            {item.title}
            <LuArrowUpRight className='h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
          </h2>
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
    <div className='mx-auto flex max-w-7xl flex-col gap-14'>
      <AnimatedContent>
        <AboutHero
          aboutPage={aboutPage}
          profile={profile}
          resumeUrl={resumeUrl}
          workCount={work.totalDocs ?? work.docs.length}
        />
      </AnimatedContent>

      <AnimatedContent delay={0.1}>
        <StorySection
          paragraphs={aboutPage.paragraphs ?? []}
          strengths={aboutPage.strengths ?? []}
        />
      </AnimatedContent>

      <AnimatedContent delay={0.15}>
        <CapabilitiesSection technologies={technologies} />
      </AnimatedContent>

      <AnimatedContent delay={0.2}>
        <NowSection />
      </AnimatedContent>

      <AnimatedContent delay={0.25}>
        <WorkTimeline items={work.docs} />
      </AnimatedContent>

      <AnimatedContent delay={0.3}>
        <CrossLinks />
      </AnimatedContent>
    </div>
  );
}
