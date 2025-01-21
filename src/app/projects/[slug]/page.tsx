import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projectsData } from '@/lib/data';
import { FaGithub } from 'react-icons/fa';
import AnimatedSection from '@/components/AnimatedSection';
import Link from '@/components/Link';
import { HiChevronRight } from 'react-icons/hi';

type PageProps = {
  params: Promise<{ slug: string }>;
};

interface ProjectButtonProps {
  href: string;
  children: React.ReactNode;
  className: string;
}

const ProjectButton: React.FC<ProjectButtonProps> = ({ href, children, className }) => (
  <Link href={href} className={className}>
    {children}
  </Link>
);

const ProjectTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className='flex flex-wrap gap-2'>
    {tags.map((tag) => (
      <span
        key={tag}
        className='rounded-md bg-tertiary px-4 py-2 font-medium shadow-md'
      >
        {tag}
      </span>
    ))}
  </div>
);

const Breadcrumbs: React.FC<{ title: string }> = ({ title }) => (
  <nav className="flex items-center space-x-1 text-sm text-secondary mb-8">
    <Link
      href="/projects"
      className="hover:text-primary transition-colors"
    >
      Projects
    </Link>
    <HiChevronRight className="h-4 w-4" />
    <span className="text-primary font-medium">{title}</span>
  </nav>
);

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className='mx-auto max-w-screen-xl space-y-8'>
      <Breadcrumbs title={project.title} />
      <AnimatedSection>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{project.title}</h1>
          <p className='text-secondary'>{project.category}</p>
        </div>

        <ProjectTags tags={project.tags} />

        <div className='rounded-md bg-tertiary p-4 shadow-md'>
          <p>{project.description}</p>
        </div>

        <div className='mb-6 flex gap-2'>
          {project.href && (
            <ProjectButton
              href={project.href}
              className='inline-block rounded-md bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-500/90'
            >
              Visit Site
            </ProjectButton>
          )}
          {project.sourceCode && (
            <ProjectButton
              href={project.sourceCode}
              className='flex items-center gap-2 rounded-md bg-[#333] px-4 py-2 font-bold text-white no-underline hover:bg-[#333]/90 dark:bg-[#f5f5f5] dark:text-[#333] hover:dark:bg-[#f5f5f5]/90'
            >
              <FaGithub className='h-6 w-6' />
              Source Code
            </ProjectButton>
          )}
        </div>

        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Screenshots</h2>
          <div className='relative w-full'>
            <Image
              src={project.src}
              alt={project.title}
              className='h-full rounded-md object-cover object-top shadow-md'
              loading='lazy'
              placeholder='blur'
              quality={75}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority={false}
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
