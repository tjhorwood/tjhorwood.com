import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { LuExternalLink } from 'react-icons/lu';
import AnimatedContent from '@/components/animations/AnimatedContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import ProjectPreviewWrapper from '@/components/ProjectPreviewWrapper';
import RichText from '@/components/RichText';
import { mediaAbsoluteUrl, normalizeSiteUrl } from '@/lib/seo';
import { getSiteSettings } from '@/payload/queries/getGlobals';
import { getProject } from '@/payload/queries/getProject';

export const dynamic = 'force-dynamic';

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

  if (!category || typeof category === 'number') return project.projectType;

  return category.name;
}

function getTechnologyName(technology) {
  if (!technology || typeof technology === 'number') return null;

  return technology.name;
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function CaseStudySection({ title, children }) {
  if (!children) return null;

  return (
    <section className='rounded-2xl border border-border bg-card/50 p-6 shadow-sm'>
      <h2 className='mb-3 text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
        {title}
      </h2>
      <div className='leading-relaxed text-muted-foreground'>{children}</div>
    </section>
  );
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
              <aside className='space-y-6'>
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

                {(project.role ||
                  project.lifecycle ||
                  project.documentationUrl) && (
                  <div className='space-y-3'>
                    <h2 className='text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
                      Project Details
                    </h2>
                    <dl className='space-y-2 text-sm text-muted-foreground'>
                      {project.role && (
                        <div>
                          <dt className='font-semibold text-primary'>Role</dt>
                          <dd>{project.role}</dd>
                        </div>
                      )}
                      {project.lifecycle && (
                        <div>
                          <dt className='font-semibold text-primary'>Status</dt>
                          <dd className='capitalize'>{project.lifecycle}</dd>
                        </div>
                      )}
                      {project.documentationUrl && (
                        <div>
                          <dt className='font-semibold text-primary'>Docs</dt>
                          <dd>
                            <Link href={project.documentationUrl}>
                              Documentation
                            </Link>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </AnimatedContent>
      </div>

      {(hasText(project.problem) ||
        hasText(project.approach) ||
        hasText(project.results)) && (
        <AnimatedContent delay={0.2}>
          <div className='grid gap-4 md:grid-cols-3'>
            <CaseStudySection title='Problem'>
              {hasText(project.problem) ? project.problem : null}
            </CaseStudySection>
            <CaseStudySection title='Approach'>
              {hasText(project.approach) ? project.approach : null}
            </CaseStudySection>
            <CaseStudySection title='Result'>
              {hasText(project.results) ? project.results : null}
            </CaseStudySection>
          </div>
        </AnimatedContent>
      )}

      {project.richContent && (
        <AnimatedContent delay={0.25}>
          <section className='mx-auto max-w-3xl'>
            <RichText content={project.richContent} />
          </section>
        </AnimatedContent>
      )}

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

      {project.screenshots?.length > 0 && (
        <AnimatedContent delay={0.45}>
          <div className='space-y-6'>
            <h2 className='text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
              Additional Screenshots
            </h2>
            <div className='grid gap-6 md:grid-cols-2'>
              {project.screenshots.map((screenshot) => {
                const image = screenshot.image;
                const imageUrl = getImageUrl(image, 'hero');
                const imageDimensions = getImageDimensions(image, 'hero');
                if (!imageUrl) return null;

                return (
                  <figure
                    key={screenshot.id ?? imageUrl}
                    className='overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-lg'
                  >
                    <Image
                      src={imageUrl}
                      alt={image?.alt || screenshot.caption || project.title}
                      width={imageDimensions.width}
                      height={imageDimensions.height}
                      className='w-full object-cover'
                      loading='lazy'
                    />
                    {screenshot.caption && (
                      <figcaption className='px-4 py-3 text-sm text-muted-foreground'>
                        {screenshot.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </div>
        </AnimatedContent>
      )}
    </div>
  );
}
