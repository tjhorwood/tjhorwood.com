import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { LuExternalLink } from 'react-icons/lu';

import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import AnimatedContent from '@/components/animations/AnimatedContent';
import { projectsData } from '@/lib/data';

// Component that handles client-side state/iframe
import ProjectPreviewWrapper from '@/components/ProjectPreviewWrapper';

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <div className='mx-auto max-w-8xl space-y-12'>
      {/* 1. Header & Quick Info */}
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
                  {project.category}
                </p>
              </div>

              <div className='flex gap-3'>
                {project.href && (
                  <Link
                    href={project.href}
                    className='flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity'
                  >
                    Live Site <LuExternalLink className='h-4 w-4' />
                  </Link>
                )}
                {project.sourceCode && (
                  <Link
                    href={project.sourceCode}
                    className='flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 font-semibold transition-colors hover:bg-secondary'
                  >
                    <FaGithub className='h-5 w-5' /> Code
                  </Link>
                )}
              </div>
            </div>

            {/* 2. Description (Contextual Hook) */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 pt-4'>
              <div className='md:col-span-2'>
                <p className='leading-relaxed text-muted-foreground'>
                  {project.description}
                </p>
              </div>
              <div className='space-y-3'>
                <h2 className='text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
                  Stack
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='rounded-md bg-secondary px-2.5 py-1 text-sm font-medium border border-border'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>

      {/* 3. Interactive Sandbox Section (Hero) */}
      <AnimatedContent delay={0.2}>
        <div className='hidden lg:block space-y-4'>
          <ProjectPreviewWrapper src={project.href} title={project.title} />
        </div>
      </AnimatedContent>

      {/* 4. Static Gallery Section */}
      <AnimatedContent delay={0.4}>
        <div className='space-y-6'>
          <h2 className='text-sm font-bold uppercase tracking-tightest text-muted-foreground/60'>
            Screenshots
          </h2>
          <div className='rounded-2xl border border-border shadow-2xl overflow-hidden bg-muted/20'>
            <Image
              src={project.src}
              alt={project.title}
              width={1920}
              height={1080}
              className='w-full object-cover'
              priority
            />
          </div>
        </div>
      </AnimatedContent>
    </div>
  );
}
