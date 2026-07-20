'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { LuArrowUpRight, LuExternalLink, LuGithub } from 'react-icons/lu';
import Link from '@/components/Link';
import { cn } from '@/lib/utils';

const PROJECT_TYPE_LABELS = {
  application: 'Apps',
  homelab: 'Homelab',
  'open-source': 'Open source',
  other: 'Other',
  web: 'Web',
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

function getCategoryName(project) {
  const category = project.categories?.[0];

  if (!category || typeof category === 'number') {
    return PROJECT_TYPE_LABELS[project.projectType] ?? project.projectType;
  }

  return category.name;
}

function getTechnologyNames(project) {
  return (project.technologies ?? [])
    .map((technology) => {
      if (!technology || typeof technology === 'number') return null;
      return technology.name;
    })
    .filter(Boolean);
}

function formatProjectType(type) {
  return PROJECT_TYPE_LABELS[type] ?? type ?? 'Project';
}

function ProjectImage({ image, priority = false, title }) {
  const imageUrl = getImageUrl(image, 'card');
  const imageDimensions = getImageDimensions(image, 'card');

  if (!imageUrl) {
    return (
      <div className='flex h-full min-h-56 items-center justify-center bg-linear-to-br from-secondary via-background to-primary/10 p-6 text-center'>
        <span className='text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground'>
          Case Study
        </span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={image?.alt || `${title} project screenshot`}
      width={imageDimensions.width}
      height={imageDimensions.height}
      className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
      {...(priority ? { priority: true } : { loading: 'lazy' })}
    />
  );
}

function ProjectCard({ featured = false, project, priority = false }) {
  const image = project.thumbnailImage || project.heroImage;
  const technologies = getTechnologyNames(project);
  const visibleTechnologies = technologies.slice(0, featured ? 5 : 3);
  const remainingTechnologies =
    technologies.length - visibleTechnologies.length;

  return (
    <article className='group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl'>
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          'block h-full no-underline',
          featured && 'grid min-h-[32rem] lg:grid-cols-[1.2fr_0.8fr]',
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden border-border border-b bg-muted',
            featured ? 'h-80 lg:h-full lg:border-r lg:border-b-0' : 'h-56',
          )}
        >
          <ProjectImage
            image={image}
            priority={priority}
            title={project.title}
          />
          <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 to-transparent p-4'>
            <div className='flex flex-wrap gap-2'>
              <span className='rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur'>
                {getCategoryName(project)}
              </span>
              {project.lifecycle && (
                <span className='rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold capitalize text-muted-foreground shadow-sm backdrop-blur'>
                  {project.lifecycle}
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          className={cn('flex h-full flex-col gap-5 p-6', featured && 'lg:p-8')}
        >
          <div className='space-y-3'>
            <div className='flex items-start justify-between gap-4'>
              <h2
                className={cn(
                  'font-bold tracking-tight',
                  featured ? 'text-3xl' : 'text-2xl',
                )}
              >
                {project.title}
              </h2>
              <LuArrowUpRight className='mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
            </div>
            <p
              className={cn(
                'text-muted-foreground leading-7',
                featured ? 'line-clamp-5 text-base' : 'line-clamp-3 text-sm',
              )}
            >
              {project.summary}
            </p>
          </div>

          {visibleTechnologies.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {visibleTechnologies.map((technology) => (
                <span
                  key={technology}
                  className='rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground'
                >
                  {technology}
                </span>
              ))}
              {remainingTechnologies > 0 && (
                <span className='rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground'>
                  +{remainingTechnologies}
                </span>
              )}
            </div>
          )}

          <div className='mt-auto flex flex-wrap items-center justify-between gap-3 pt-2 text-sm font-semibold'>
            <span className='inline-flex items-center gap-2 text-foreground'>
              View case study <LuArrowUpRight className='h-4 w-4' />
            </span>
            <span className='flex items-center gap-2 text-muted-foreground'>
              {project.liveUrl && <LuExternalLink className='h-4 w-4' />}
              {project.repositoryUrl && <LuGithub className='h-4 w-4' />}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function ProjectsShowcase({ projects }) {
  const [activeType, setActiveType] = useState('all');

  const tabs = useMemo(() => {
    const types = Array.from(
      new Set(projects.map((project) => project.projectType).filter(Boolean)),
    );
    return [
      { label: 'All', value: 'all' },
      ...types.map((type) => ({ label: formatProjectType(type), value: type })),
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeType === 'all') return projects;
    return projects.filter((project) => project.projectType === activeType);
  }, [activeType, projects]);

  const featuredProject =
    filteredProjects.find((project) => project.featured) ?? filteredProjects[0];
  const supportingProjects = filteredProjects.filter(
    (project) => project.id !== featuredProject?.id,
  );

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-4 rounded-3xl border border-border bg-secondary/40 p-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground'>
            Browse work
          </p>
          <p className='mt-1 text-sm text-muted-foreground'>
            Filter by project type, then open a case study for the build
            details.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type='button'
              onClick={() => setActiveType(tab.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition',
                activeType === tab.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {featuredProject && (
        <ProjectCard project={featuredProject} featured priority />
      )}

      {supportingProjects.length > 0 && (
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {supportingProjects.map((project) => (
            <ProjectCard key={project.id ?? project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
