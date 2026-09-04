import Image from 'next/image';
import { LuArrowUpRight } from 'react-icons/lu';
import Link from '@/components/Link';
import { cardSurfaceClass, tagPillClass } from '@/lib/styles';
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

export default function ProjectCard({ project, priority = false }) {
  const image = project.thumbnailImage || project.heroImage;
  const imageUrl = getImageUrl(image, 'card');
  const category = getCategoryName(project);
  const technologies = getTechnologyNames(project).slice(0, 3);

  return (
    <article
      className={cn(cardSurfaceClass, 'group flex flex-col overflow-hidden')}
    >
      <Link
        href={`/projects/${project.slug}`}
        className='flex flex-1 flex-col no-underline'
      >
        <div className='relative aspect-[16/10] w-full overflow-hidden bg-muted'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt || `${project.title} project screenshot`}
              fill
              sizes='(min-width: 768px) 40vw, 100vw'
              className='object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
              {...(priority ? { priority: true } : { loading: 'lazy' })}
            />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <span className={tagPillClass}>Case study</span>
            </div>
          )}
        </div>

        <div className='flex flex-1 flex-col p-6 sm:p-7'>
          <div className='flex items-center gap-2'>
            {category && <span className={tagPillClass}>{category}</span>}
            {project.lifecycle && (
              <span className='font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground'>
                {project.lifecycle}
              </span>
            )}
          </div>
          <div className='mt-4 flex items-start justify-between gap-3'>
            <h3 className='text-title font-semibold'>{project.title}</h3>
            <LuArrowUpRight className='mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1' />
          </div>
          {project.summary && (
            <p className='mt-3 text-pretty text-sm leading-6 text-muted-foreground'>
              {project.summary}
            </p>
          )}
          {technologies.length > 0 && (
            <div className='mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-muted-foreground'>
              {technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
