import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import {
  LuArrowUpRight,
  LuBookOpen,
  LuExternalLink,
  LuLayers,
  LuWorkflow,
} from 'react-icons/lu';
import AnimatedContent from '@/components/animations/AnimatedContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import ProjectPreviewWrapper from '@/components/ProjectPreviewWrapper';
import RichText from '@/components/RichText';
import { mediaAbsoluteUrl, normalizeSiteUrl } from '@/lib/seo';
import { getSiteSettings } from '@/payload/queries/getGlobals';
import { getProject } from '@/payload/queries/getProject';
import { getProjects } from '@/payload/queries/getProjects';

export const dynamic = 'force-dynamic';

const PROJECT_TYPE_LABELS = {
  application: 'Application',
  homelab: 'Homelab',
  'open-source': 'Open source',
  other: 'Project',
  web: 'Web',
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProject(slug),
    getSiteSettings(),
  ]);

  if (!project) return { title: 'Project not found' };

  const siteUrl = normalizeSiteUrl(settings.siteUrl);
  const title = project.seo?.title ?? project.title;
  const description = project.seo?.description ?? project.summary;
  const image = mediaAbsoluteUrl(
    project.seo?.image ?? project.heroImage ?? project.thumbnailImage,
    undefined,
    siteUrl,
  );
  const canonical = `/projects/${project.slug}/`;

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

function getCategoryName(project) {
  const category = project.categories?.[0];

  if (!category || typeof category === 'number') {
    return PROJECT_TYPE_LABELS[project.projectType] ?? project.projectType;
  }

  return category.name;
}

function getTechnologyName(technology) {
  if (!technology || typeof technology === 'number') return null;

  return technology.name;
}

function getTechnologyNames(project) {
  return (project.technologies ?? []).map(getTechnologyName).filter(Boolean);
}

function getYear(project) {
  const date = project.publishedAt ?? project.createdAt;
  if (!date) return null;
  return new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
    new Date(date),
  );
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function Pill({ children }) {
  return (
    <span className='rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur'>
      {children}
    </span>
  );
}

function CaseStudySection({ eyebrow, title, children }) {
  if (!children) return null;

  return (
    <section className='rounded-3xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
      <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
        {eyebrow}
      </p>
      <h2 className='mt-3 text-2xl font-bold tracking-tight'>{title}</h2>
      <div className='mt-4 leading-7 text-muted-foreground'>{children}</div>
    </section>
  );
}

function DetailItem({ label, value }) {
  if (!value) return null;

  return (
    <div className='rounded-2xl border border-border bg-background/70 p-4'>
      <dt className='text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground'>
        {label}
      </dt>
      <dd className='mt-2 font-semibold text-foreground capitalize'>{value}</dd>
    </div>
  );
}

function ArchitectureStrip({ project, technologies }) {
  const steps = [
    technologies[0] ?? 'Frontend',
    project.projectType === 'homelab' ? 'Docker / LXC' : 'CMS / App',
    technologies.find((technology) =>
      /postgres|sql|database/i.test(technology),
    ) ?? 'Data',
    project.liveUrl ? 'Public route' : 'Case study',
  ];

  return (
    <section className='rounded-3xl border border-border bg-secondary/40 p-6 shadow-sm'>
      <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
            Architecture
          </p>
          <h2 className='mt-2 text-2xl font-bold tracking-tight'>
            How this project fits together
          </h2>
        </div>
        <LuWorkflow className='h-6 w-6 text-muted-foreground' />
      </div>
      <div className='mt-6 grid gap-3 md:grid-cols-4'>
        {steps.map((step, index) => (
          <div
            key={`${step}-${index}`}
            className='relative rounded-2xl border border-border bg-background p-4'
          >
            <span className='text-xs font-bold text-muted-foreground'>
              0{index + 1}
            </span>
            <p className='mt-2 font-semibold'>{step}</p>
            {index < steps.length - 1 && (
              <LuArrowUpRight className='absolute top-4 right-4 hidden h-4 w-4 text-muted-foreground md:block' />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectImageFrame({ image, priority = false, title }) {
  const imageUrl = getImageUrl(image, 'hero');
  const imageDimensions = getImageDimensions(image, 'hero');

  if (!imageUrl) {
    return (
      <div className='flex min-h-80 items-center justify-center rounded-3xl border border-border bg-linear-to-br from-secondary via-background to-primary/10 p-8 text-center'>
        <div>
          <LuLayers className='mx-auto h-10 w-10 text-muted-foreground' />
          <p className='mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground'>
            Project case study
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-2xl'>
      <div className='flex gap-1.5 border-border border-b bg-secondary px-4 py-3'>
        <span className='h-2.5 w-2.5 rounded-full bg-red-400' />
        <span className='h-2.5 w-2.5 rounded-full bg-yellow-400' />
        <span className='h-2.5 w-2.5 rounded-full bg-green-400' />
      </div>
      <Image
        src={imageUrl}
        alt={image?.alt || `${title} hero image`}
        width={imageDimensions.width}
        height={imageDimensions.height}
        className='max-h-[34rem] w-full object-cover object-top'
        {...(priority ? { priority: true } : { loading: 'lazy' })}
      />
    </div>
  );
}

function RelatedProjectCard({ project }) {
  const image = project.thumbnailImage || project.heroImage;
  const imageUrl = getImageUrl(image, 'card');
  const imageDimensions = getImageDimensions(image, 'card');

  return (
    <Link
      href={`/projects/${project.slug}`}
      className='group overflow-hidden rounded-3xl border border-border bg-card no-underline shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
    >
      <div className='h-44 overflow-hidden border-border border-b bg-muted'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt || project.title}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
            loading='lazy'
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-secondary text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground'>
            Project
          </div>
        )}
      </div>
      <div className='p-5'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground'>
          {getCategoryName(project)}
        </p>
        <h3 className='mt-2 text-xl font-bold'>{project.title}</h3>
        <p className='mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground'>
          {project.summary}
        </p>
      </div>
    </Link>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, projectsResult] = await Promise.all([
    getProject(slug),
    getProjects(),
  ]);

  if (!project) return notFound();

  const heroImage = project.heroImage || project.thumbnailImage;
  const technologies = getTechnologyNames(project);
  const year = getYear(project);
  const relatedProjects = (projectsResult.docs ?? [])
    .filter((candidate) => candidate.id !== project.id)
    .slice(0, 3);

  return (
    <div className='mx-auto max-w-7xl space-y-14'>
      <AnimatedContent>
        <Breadcrumbs title={project.title} />
      </AnimatedContent>

      <AnimatedContent delay={0.1}>
        <section className='grid gap-8 rounded-3xl border border-border bg-linear-to-br from-secondary/60 via-background to-background p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8'>
          <div className='flex flex-col justify-between gap-8'>
            <div className='space-y-6'>
              <div className='flex flex-wrap gap-2'>
                <Pill>{getCategoryName(project)}</Pill>
                {project.lifecycle && <Pill>{project.lifecycle}</Pill>}
                {year && <Pill>{year}</Pill>}
              </div>

              <div className='space-y-4'>
                <h1 className='text-5xl font-bold tracking-tightest md:text-6xl'>
                  {project.title}
                </h1>
                <p className='max-w-3xl text-lg leading-8 text-muted-foreground'>
                  {project.summary}
                </p>
              </div>

              <div className='flex flex-wrap gap-3'>
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    className='inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90'
                  >
                    Visit live site <LuExternalLink className='h-4 w-4' />
                  </Link>
                )}
                {project.repositoryUrl && (
                  <Link
                    href={project.repositoryUrl}
                    className='inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-semibold transition hover:bg-secondary'
                  >
                    <FaGithub className='h-5 w-5' /> View code
                  </Link>
                )}
                {project.documentationUrl && (
                  <Link
                    href={project.documentationUrl}
                    className='inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-semibold transition hover:bg-secondary'
                  >
                    <LuBookOpen className='h-5 w-5' /> Docs
                  </Link>
                )}
              </div>
            </div>

            <dl className='grid gap-3 sm:grid-cols-3'>
              <DetailItem label='Role' value={project.role} />
              <DetailItem label='Status' value={project.lifecycle} />
              <DetailItem label='Year' value={year} />
            </dl>
          </div>

          <ProjectImageFrame image={heroImage} priority title={project.title} />
        </section>
      </AnimatedContent>

      <AnimatedContent delay={0.15}>
        <section className='grid gap-6 lg:grid-cols-[0.7fr_1.3fr]'>
          <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <LuLayers className='h-5 w-5' />
              <p className='text-xs font-bold uppercase tracking-[0.25em]'>
                Stack
              </p>
            </div>
            <div className='mt-5 flex flex-wrap gap-2'>
              {technologies.length > 0 ? (
                technologies.map((technology) => (
                  <span
                    key={technology}
                    className='rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-semibold'
                  >
                    {technology}
                  </span>
                ))
              ) : (
                <p className='text-sm text-muted-foreground'>
                  Stack details are being updated.
                </p>
              )}
            </div>
          </div>

          <ArchitectureStrip project={project} technologies={technologies} />
        </section>
      </AnimatedContent>

      {(hasText(project.problem) ||
        hasText(project.approach) ||
        hasText(project.results)) && (
        <AnimatedContent delay={0.2}>
          <div className='grid gap-5 md:grid-cols-3'>
            <CaseStudySection eyebrow='01' title='Problem'>
              {hasText(project.problem) ? project.problem : null}
            </CaseStudySection>
            <CaseStudySection eyebrow='02' title='Approach'>
              {hasText(project.approach) ? project.approach : null}
            </CaseStudySection>
            <CaseStudySection eyebrow='03' title='Result'>
              {hasText(project.results) ? project.results : null}
            </CaseStudySection>
          </div>
        </AnimatedContent>
      )}

      {project.richContent && (
        <AnimatedContent delay={0.25}>
          <section className='mx-auto max-w-5xl rounded-3xl border border-border bg-card/40 p-6 shadow-sm md:p-8'>
            <RichText content={project.richContent} />
          </section>
        </AnimatedContent>
      )}

      {project.liveUrl && (
        <AnimatedContent delay={0.3}>
          <section className='hidden space-y-6 lg:block'>
            <div className='flex items-end justify-between gap-4'>
              <div>
                <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
                  Interactive preview
                </p>
                <h2 className='mt-2 text-3xl font-bold tracking-tight'>
                  Try the live experience
                </h2>
              </div>
              <Link
                href={project.liveUrl}
                className='inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-secondary'
              >
                Open full site <LuExternalLink className='h-4 w-4' />
              </Link>
            </div>
            <ProjectPreviewWrapper
              src={project.liveUrl}
              title={project.title}
            />
          </section>
        </AnimatedContent>
      )}

      {(heroImage || project.screenshots?.length > 0) && (
        <AnimatedContent delay={0.35}>
          <section className='space-y-6'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
                Gallery
              </p>
              <h2 className='mt-2 text-3xl font-bold tracking-tight'>
                Screenshots and visual notes
              </h2>
            </div>

            {heroImage && (
              <ProjectImageFrame image={heroImage} title={project.title} />
            )}

            {project.screenshots?.length > 0 && (
              <div className='grid gap-6 md:grid-cols-2'>
                {project.screenshots.map((screenshot) => {
                  const image = screenshot.image;
                  const imageUrl = getImageUrl(image, 'hero');
                  const imageDimensions = getImageDimensions(image, 'hero');
                  if (!imageUrl) return null;

                  return (
                    <figure
                      key={screenshot.id ?? imageUrl}
                      className='overflow-hidden rounded-3xl border border-border bg-card shadow-sm'
                    >
                      <Image
                        src={imageUrl}
                        alt={image?.alt || screenshot.caption || project.title}
                        width={imageDimensions.width}
                        height={imageDimensions.height}
                        className='w-full object-cover object-top'
                        loading='lazy'
                      />
                      {screenshot.caption && (
                        <figcaption className='border-border border-t px-4 py-3 text-sm text-muted-foreground'>
                          {screenshot.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            )}
          </section>
        </AnimatedContent>
      )}

      {relatedProjects.length > 0 && (
        <AnimatedContent delay={0.4}>
          <section className='space-y-6'>
            <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
              <div>
                <p className='text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground'>
                  Keep exploring
                </p>
                <h2 className='mt-2 text-3xl font-bold tracking-tight'>
                  Related projects
                </h2>
              </div>
              <Link
                href='/projects'
                className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground'
              >
                Back to all projects <LuArrowUpRight className='h-4 w-4' />
              </Link>
            </div>
            <div className='grid gap-6 md:grid-cols-3'>
              {relatedProjects.map((relatedProject) => (
                <RelatedProjectCard
                  key={relatedProject.id ?? relatedProject.slug}
                  project={relatedProject}
                />
              ))}
            </div>
          </section>
        </AnimatedContent>
      )}
    </div>
  );
}
