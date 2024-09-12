import { Metadata } from 'next';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

import { projectsData } from '@/lib/data';

import Link from '@/components/link';
import Section from '@/components/section';

export const metadata: Metadata = { title: 'Projects' };

export default function Projects() {
  return (
    <div className='mx-auto flex max-w-5xl flex-col gap-12'>
      <header>
        <h1 className='animate-in text-3xl font-bold tracking-tight' style={{ '--index': 1 } as React.CSSProperties}>
          Projects
        </h1>
        <p
          className='animate-in text-secondary'
          style={{ '--index': 2 } as React.CSSProperties}
        >
          Here are a few of the projects I have worked on.
        </p>
      </header>

      <div
        className='flex animate-in flex-col gap-16 md:gap-24'
        style={{ '--index': 3 } as React.CSSProperties}
      >
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  href,
  imageUrl,
}: {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  imageUrl: string | StaticImageData;
}) {
  return (
    <div className='group'>
      <Section
        sectionClass='md:flex-col lg:flex-row overflow-hidden relative transition md:gap-4'
        heading={title}
        headingAlignment='left'
        headingClass='md:w-full lg:w-1/6'
      >
        <div className='flex w-full flex-col gap-6 rounded-xl bg-tertiary lg:w-5/6'>
          <div className='flex h-full flex-col space-y-6 px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-8 sm:pr-2 sm:pt-8 md:max-w-[55%] lg:max-w-[60%]'>
            <h3 className='text-2xl font-semibold'>{title}</h3>
            <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>
              {description}
            </p>
            <ul className='flex flex-wrap gap-2'>
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className='rounded-lg bg-primary px-3 py-1 text-[0.75rem] uppercase tracking-wider text-primary'
                >
                  {tag}
                </li>
              ))}
            </ul>
            <Link href={href} className='w-full sm:w-40'>
              <button className='underline-none flex w-full items-center justify-center rounded-lg bg-gray-900 px-8 py-2 text-lg text-white outline-none transition hover:scale-105 dark:bg-white/80 dark:text-gray-900'>
                Visit site
              </button>
            </Link>
          </div>
          <Image
            src={imageUrl}
            alt={title}
            quality={95}
            className='absolute -right-40 hidden w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] sm:top-16 sm:block md:top-20 lg:top-6'
            unoptimized={true}
          />
        </div>
      </Section>
    </div>
  );
}
