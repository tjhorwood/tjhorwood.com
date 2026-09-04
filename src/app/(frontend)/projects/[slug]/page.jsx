import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { LuArrowUpRight, LuBookOpen, LuExternalLink } from 'react-icons/lu';
import AnimatedContent from '@/components/animations/AnimatedContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import ProjectCard from '@/components/ProjectCard';
import ProjectPreviewWrapper from '@/components/ProjectPreviewWrapper';
import RichText from '@/components/RichText';
import { mediaAbsoluteUrl, normalizeSiteUrl } from '@/lib/seo';
import {
  cardSurfaceClass,
  primaryActionClass,
  secondaryActionClass,
} from '@/lib/styles';
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

function getTechnologyNames(project) {
  return (project.technologies ?? [])
    .map((technology) =>
      !technology || typeof technology === 'number' ? null : technology.name,
    )
    .filter(Boolean);
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

function ImageFrame({ image, priority = false, title, className }) {
  const imageUrl = getImageUrl(image, 'hero');
  const dimensions = getImageDimensions(image, 'hero');

  if (!imageUrl) return null;

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-border bg-muted ${className ?? ''}`}
    >
      <Image
        src={imageUrl}
        alt={image?.alt || `${title} screenshot`}
        width={dimensions.width}
        height={dimensions.height}
        className='max-h-[32rem] w-full object-cover object-top'
        {...(priority ? { priority: true } : { loading: 'lazy' })}
      />
    </div>
  );
}

function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className='font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground'>
        {label}
      </dt>
      <dd className='mt-1.5 font-medium capitalize'>{value}</dd>
    </div>
  );
}

function CaseStudyBlock({ index, title, children }) {
  if (!children) return null;
  return (
    <div className={`${cardSurfaceClass} p-6`}>
      <p className='font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground'>
        {index} · {title}
      </p>
      <p className='mt-3 text-pretty text-sm leading-7 text-muted-foreground'>
        {children}
      </p>
    </div>
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

  const hasCaseStudy =
    hasText(project.problem) ||
    hasText(project.approach) ||
    hasText(project.results);

  return (
    <div className='mx-auto max-w-5xl'>
      <Breadcrumbs title={project.title} />

      <AnimatedContent>
        <header className='flex flex-col gap-6'>
          <p className='font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground'>
            {[getCategoryName(project), project.lifecycle, year]
              .filter(Boolean)
              .join('  ·  ')}
          </p>
          <h1 className='text-display font-semibold'>{project.title}</h1>
          <p className='max-w-2xl text-pretty text-lg leading-8 text-muted-foreground'>
            {project.summary}
          </p>
          {(project.liveUrl ||
            project.repositoryUrl ||
            project.documentationUrl) && (
            <div className='flex flex-wrap gap-3'>
              {project.liveUrl && (
                <Link href={project.liveUrl} className={primaryActionClass}>
                  Visit live site <LuExternalLink className='h-4 w-4' />
                </Link>
              )}
              {project.repositoryUrl && (
                <Link
                  href={project.repositoryUrl}
                  className={secondaryActionClass}
                >
                  <FaGithub className='h-4 w-4' /> View code
                </Link>
              )}
              {project.documentationUrl && (
                <Link
                  href={project.documentationUrl}
                  className={secondaryActionClass}
                >
                  <LuBookOpen className='h-4 w-4' /> Docs
                </Link>
              )}
            </div>
          )}
        </header>
      </AnimatedContent>

      {heroImage && (
        <AnimatedContent delay={0.05}>
          <ImageFrame
            image={heroImage}
            priority
            title={project.title}
            className='section-gap'
          />
        </AnimatedContent>
      )}

      <AnimatedContent delay={0.05}>
        <dl
          className={`section-gap grid grid-cols-2 gap-x-6 gap-y-8 p-6 sm:grid-cols-4 sm:p-7 ${cardSurfaceClass}`}
        >
          <MetaItem label='Role' value={project.role} />
          <MetaItem label='Status' value={project.lifecycle} />
          <MetaItem label='Year' value={year} />
          {technologies.length > 0 && (
            <div className='col-span-2 sm:col-span-1'>
              <dt className='font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground'>
                Stack
              </dt>
              <dd className='mt-1.5 font-medium'>{technologies.join(', ')}</dd>
            </div>
          )}
        </dl>
      </AnimatedContent>

      {hasCaseStudy && (
        <AnimatedContent delay={0.05}>
          <div className='section-rule grid gap-10 md:grid-cols-3'>
            <CaseStudyBlock index='01' title='Problem'>
              {hasText(project.problem) ? project.problem : null}
            </CaseStudyBlock>
            <CaseStudyBlock index='02' title='Approach'>
              {hasText(project.approach) ? project.approach : null}
            </CaseStudyBlock>
            <CaseStudyBlock index='03' title='Result'>
              {hasText(project.results) ? project.results : null}
            </CaseStudyBlock>
          </div>
        </AnimatedContent>
      )}

      {project.richContent && (
        <AnimatedContent delay={0.05}>
          <div className='section-rule'>
            <RichText content={project.richContent} />
          </div>
        </AnimatedContent>
      )}

      {project.liveUrl && (
        <AnimatedContent delay={0.05}>
          <section className='section-rule hidden space-y-6 lg:block'>
            <div className='flex items-end justify-between gap-4'>
              <div>
                <p className='font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground'>
                  Interactive preview
                </p>
                <h2 className='mt-2 text-headline font-semibold'>
                  Try the live experience
                </h2>
              </div>
              <Link
                href={project.liveUrl}
                className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
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

      {project.screenshots?.length > 0 && (
        <AnimatedContent delay={0.05}>
          <section className='section-rule space-y-6'>
            <h2 className='text-headline font-semibold'>Gallery</h2>
            <div className='grid gap-6 sm:grid-cols-2'>
              {project.screenshots.map((screenshot) => {
                const image = screenshot.image;
                const imageUrl = getImageUrl(image, 'hero');
                const dimensions = getImageDimensions(image, 'hero');
                if (!imageUrl) return null;

                return (
                  <figure
                    key={screenshot.id ?? imageUrl}
                    className='overflow-hidden rounded-3xl border border-border bg-muted'
                  >
                    <Image
                      src={imageUrl}
                      alt={image?.alt || screenshot.caption || project.title}
                      width={dimensions.width}
                      height={dimensions.height}
                      className='max-h-[28rem] w-full object-cover object-top'
                      loading='lazy'
                    />
                    {screenshot.caption && (
                      <figcaption className='border-t border-border px-4 py-3 text-sm text-muted-foreground'>
                        {screenshot.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        </AnimatedContent>
      )}

      {relatedProjects.length > 0 && (
        <AnimatedContent delay={0.05}>
          <section className='section-rule'>
            <div className='flex items-baseline justify-between gap-4'>
              <h2 className='text-headline font-semibold'>Related projects</h2>
              <Link
                href='/projects'
                className='hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex'
              >
                All projects <LuArrowUpRight className='h-3.5 w-3.5' />
              </Link>
            </div>
            <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {relatedProjects.map((relatedProject) => (
                <ProjectCard
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
