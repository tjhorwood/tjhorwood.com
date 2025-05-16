import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

import Link from '@/components/Link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Tags from '@/components/Tags';

import { projectsData } from '@/lib/data';

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className='mx-auto max-w-(--breakpoint-xl) space-y-8'>
      <Breadcrumbs title={project.title} />
      <div className='space-y-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{project.title}</h1>
          <p className='text-neutral-600 dark:text-neutral-400'>
            {project.category}
          </p>
        </div>

        <Tags tags={project.tags} />

        <div className='rounded-md bg-neutral-200/50 p-4 shadow-md dark:bg-neutral-800'>
          <p>{project.description}</p>
        </div>

        <div className='mb-6 flex gap-2'>
          {project.href && (
            <Link
              href={project.href}
              className='inline-block rounded-md bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-500/90'
            >
              Visit Site
            </Link>
          )}
          {project.sourceCode && (
            <Link
              href={project.sourceCode}
              className='flex items-center gap-2 rounded-md bg-[#333] px-4 py-2 font-bold text-white no-underline hover:bg-[#333]/90 dark:bg-[#f5f5f5] dark:text-[#333] dark:hover:bg-[#f5f5f5]/90'
            >
              <FaGithub className='h-6 w-6' />
              Source Code
            </Link>
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
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
