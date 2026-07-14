import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { LuExternalLink } from 'react-icons/lu';
import AnimatedContent from '@/components/animations/AnimatedContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import ProjectPreviewWrapper from '@/components/ProjectPreviewWrapper';
import { getProject } from '@/payload/queries/getProject';

export const dynamic = 'force-dynamic';

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

  if (!category || typeof category === 'number') return project.projectType;

  return category.name;
}

function getTechnologyName(technology) {
  if (!technology || typeof technology === 'number') return null;

  return technology.name;
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return notFound();

  const heroImage = project.heroImage;
  const heroImageUrl = getImageUrl(heroImage, 'hero');
  const heroImageDimensions = getImageDimensions(heroImage, 'hero');
  const technologies = project.technologies
    ?.map(getTechnologyName)
    .filter(Boolean);

  return (
    <div className='mx-auto max-w-8xl space-y-12'>
      <div className='space-y-8'>
        <AnimatedContent>
          <Breadcrumbs title={project.title} />
        </AnimatedContent>

        <AnimatedContent delay={0.1}>
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
              <div className='space-y-2'>
                <h1 className='text-4xl font-bold tracking-tightest'>
                  {project.title}
                </h1>
                <p className='text-lg text-muted-foreground'>
                  {getCategoryName(project)}
                </p>
              </div>

              <div className='flex gap-3'>
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    className='flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity'
                  >
                    Live Site <LuExternalLink className='h-4 w-4' />
                  </Link>
                )}
                {project.repositoryUrl && (
                  <Link
                    href={project.repositoryUrl}
                    className='flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 font-semibold transition-colors hover:bg-secondary'
                  >
                    <FaGithub className='h-5 w-5' /> Code
                  </Link>
                )}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 pt-4'>
              <div className='md:col-span-2'>
                <p className='leading-relaxed text-muted-foreground'>
                  {project.summary}
                </p>
              </div>
              {technologies?.length > 0 && (
                <div className='space-y-3'>
                  <h2 className='text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
                    Stack
                  </h2>
                  <div className='flex flex-wrap gap-2'>
                    {technologies.map((technology) => (
                      <span
                        key={technology}
                        className='rounded-md bg-secondary px-2.5 py-1 text-sm font-medium border border-border'
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedContent>
      </div>

      {project.liveUrl && (
        <AnimatedContent delay={0.2}>
          <div className='hidden lg:block space-y-4'>
            <ProjectPreviewWrapper
              src={project.liveUrl}
              title={project.title}
            />
          </div>
        </AnimatedContent>
      )}

      {heroImageUrl && (
        <AnimatedContent delay={0.4}>
          <div className='space-y-6'>
            <h2 className='text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
              Screenshots
            </h2>
            <div className='rounded-2xl border border-border shadow-2xl overflow-hidden bg-muted/20'>
              <Image
                src={heroImageUrl}
                alt={heroImage?.alt || project.title}
                width={heroImageDimensions.width}
                height={heroImageDimensions.height}
                className='w-full object-cover'
                priority
              />
            </div>
          </div>
        </AnimatedContent>
      )}
    </div>
  );
}
