import React from 'react';
import Link from 'next/link';
import { projectsData } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function Projects() {
  const baseDelay = 0;
  const delayIncrement = 100;
  const aosAnimationType = 'fade-up';

  return (
    <div className='flex flex-col gap-4'>
      <div data-aos='fade-up'>
        <h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
        <p className='text-neutral-600 dark:text-neutral-400'>
          Here are a few of the projects I have worked on.
        </p>
      </div>

      <div className='mx-auto py-4'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projectsData.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className='group block cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.95]'
              data-aos={aosAnimationType}
              data-aos-delay={(baseDelay + index * delayIncrement).toString()}
            >
              <Card className='flex h-full flex-col border-neutral-200 bg-neutral-200/50 shadow-md dark:border-neutral-700 dark:bg-neutral-800'>
                <CardHeader className='space-y-0.5'>
                  <CardTitle className='text-xl font-bold'>
                    {project.title}
                  </CardTitle>
                  <CardDescription className='text-sm text-gray-500'>
                    {project.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className='grow'>
                  <div className='relative mb-4 h-52 w-full'>
                    <Image
                      src={project.srcShort}
                      alt={project.title}
                      className='h-full overflow-hidden rounded-md object-cover object-top shadow-md'
                      loading='lazy'
                      placeholder={project.blurDataURL ? 'blur' : undefined}
                      blurDataURL={project.blurDataURL}
                    />
                  </div>
                  <p className='line-clamp-2 text-sm'>{project.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
