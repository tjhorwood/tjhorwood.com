import Image from 'next/image';
import { StaticImageData } from 'next/image';

import { projectsData } from '@/lib/data';

import Link from '@/components/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Projects() {
  return (
    <div className='flex flex-col gap-12'>
      <header>
        <h1
          className='animate-in text-3xl font-bold tracking-tight'
          style={{ '--index': 1 } as React.CSSProperties}
        >
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
        className='animate-in columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3 xl:columns-4'
        style={{ '--index': 3 } as React.CSSProperties}
      >
        {projectsData.map(
          ({ title, description, tags, href, imageUrl }, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <div className='w-full rounded-lg bg-gray-900 px-6 py-2 text-white transition dark:bg-white/80 dark:text-gray-900'>
                  {title}
                </div>
              </DialogTrigger>
              <DialogContent className='absolute mx-auto inset-0 bg-tertiary top-1/4 max-w-2xl h-fit'>
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                  <div className='space-y-6'>
                    <div className='relative h-72'>
                      <Image
                        src={imageUrl}
                        alt={title}
                        quality={100}
                        className='h-full w-full rounded-lg object-cover object-top transition-transform duration-300'
                        unoptimized={true}
                      />
                    </div>
                    <ul className='flex flex-wrap gap-2'>
                      {tags.map((tag, index) => (
                        <li
                          key={index}
                          className='rounded-lg bg-primary px-3 py-1 text-sm uppercase tracking-wider text-primary'
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div>
                      {description}
                    </div>
                    <div>
                      <Link href={href} className='w-full sm:w-40'>
                        <button className='w-full rounded-lg bg-gray-900 px-6 py-2 text-white transition dark:bg-white/80 dark:text-gray-900'>
                          Visit site
                        </button>
                      </Link>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ),
        )}
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
    <div className='mb-6 break-inside-avoid'>
      <div className='md:hover:shadow-primary/50 dark:md:hover:shadow-primary/50 group relative transform overflow-hidden rounded-xl bg-tertiary transition-all duration-300'>
        <div className='relative h-64 overflow-hidden p-2'>
          <Image
            src={imageUrl}
            alt={title}
            quality={95}
            className='h-full w-full rounded-lg object-cover object-top transition-transform duration-300'
            unoptimized={true}
          />
        </div>
        <div className='flex flex-col space-y-4 px-5 pb-5 pt-4 sm:pt-6'>
          <h3 className='text-2xl font-bold transition-colors duration-300'>
            {title}
          </h3>
          <p className='mt-2 text-gray-700 dark:text-white/70'>{description}</p>
          <ul className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
              <li
                key={index}
                className='rounded-lg bg-primary px-3 py-1 text-xs uppercase tracking-wider text-primary'
              >
                {tag}
              </li>
            ))}
          </ul>
          <Link href={href} className='w-full sm:w-40'>
            <button className='w-full rounded-lg bg-gray-900 px-6 py-2 text-white transition dark:bg-white/80 dark:text-gray-900'>
              Visit site
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
