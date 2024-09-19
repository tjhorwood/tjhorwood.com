import Image from 'next/image';

import { projectsData } from '@/lib/data';

import Link from '@/components/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Projects() {
  return (
    <div className='flex flex-col gap-12'>
      <header>
        <h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
        <p className='text-secondary'>
          Here are a few of the projects I have worked on.
        </p>
      </header>

      <div className='grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {projectsData.map(
          ({ title, description, tags, href, imageUrl }, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <div className='group relative h-80 w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg'>
                  <Image
                    src={imageUrl}
                    alt={title}
                    className='w-full transform object-cover transition-transform duration-200'
                  />

                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <div className='absolute bottom-0 p-4'>
                      <h3 className='text-lg font-semibold text-white'>
                        {title}
                      </h3>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className='inset-0 mx-auto mt-auto h-fit max-w-2xl bg-tertiary md:my-auto'>
                <DialogHeader>
                  <DialogTitle className='text-left'>{title}</DialogTitle>
                </DialogHeader>
                <ScrollArea>
                  <div className='space-y-6'>
                    <div className='relative h-80'>
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
                    <div>{description}</div>
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
