import { workplacesData } from '@/lib/data';
import Image from 'next/image';
import { useMemo } from 'react';

import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LuDownload } from 'react-icons/lu';

const WorkplaceItem = ({ item }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='flex w-full cursor-pointer items-center justify-between rounded-lg bg-neutral-200/50 p-4 text-left no-underline shadow-sm transition-all duration-200 hover:scale-[1.02] dark:bg-neutral-800'>
          <div className='flex flex-1 items-center gap-4'>
            <Image
              src={item.imageSrc}
              alt={`${item.company} logo`}
              width={48}
              height={48}
              className='hidden rounded-full sm:block'
            />
            <div className='flex flex-col gap-px'>
              <p className={`font-medium ${item.link ? 'external-arrow' : ''}`}>
                {item.title}
              </p>
              <p className='text-sm text-neutral-700 dark:text-neutral-300'>
                {item.company}
              </p>
            </div>
          </div>
          {item.time && (
            <p className='ml-3 text-right text-sm whitespace-nowrap text-neutral-700 dark:text-neutral-300'>
              {item.time}
            </p>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        className={`border-none p-0 shadow-none [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:rounded-sm [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:opacity-70 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:hover:opacity-100 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:focus:opacity-100 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:focus:ring-0 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:focus:ring-offset-0`}
      >
        <div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{
            type: 'tween',
            stiffness: 100,
            damping: 20,
            duration: 0.2,
          }}
          className='hide-scrollbar ml-auto h-full max-w-[95vw] overflow-y-auto rounded-l-xl bg-neutral-100 p-6 md:p-8 dark:bg-neutral-800'
        >
          <SheetHeader className='mb-4 text-left'>
            <SheetTitle className='text-2xl font-semibold'>
              {item.title}
            </SheetTitle>
            <p className='text-md text-neutral-700 dark:text-neutral-300'>
              {item.company}
            </p>
          </SheetHeader>
          <p className='py-2 text-sm text-neutral-700 md:text-base dark:text-neutral-300'>
            Key responsibilities:
          </p>
          <ul className='ml-4 list-disc space-y-2 text-sm text-neutral-600 md:text-base dark:text-neutral-400'>
            {item.description?.map((descItem, index) => (
              <li key={index}>{descItem.content}</li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default function Work({ data_aos, data_aos_delay = '' }) {
  const yearsOfExperience = useMemo(() => new Date().getFullYear() - 2011, []);

  return (
    <div data-aos={data_aos} data-aos-delay={data_aos_delay}>
      <Section heading='Work' headingAlignment='left'>
        <div className='flex w-full flex-col space-y-6'>
          <p className='text-neutral-700 dark:text-neutral-300'>
            {yearsOfExperience}+ years of diverse professional experience.
          </p>
          <p className='text-neutral-700 dark:text-neutral-300'>
            I began my career in customer facing roles, where I developed strong
            communication and interpersonal skills. I then transitioned to a
            technical support role, where I discovered my passion for
            technology. I have since progressed up the ranks, gaining expertise
            in cloud computing, software development, and data science. I am
            very passionate about using technology to solve real-world problems
            and make a positive impact on the world.
          </p>
          <ul className='flex flex-col space-y-4'>
            {workplacesData.map((item, index) => (
              <li key={item.id || index}>
                <WorkplaceItem item={item} />
              </li>
            ))}
          </ul>

          <div>
            <Button
              asChild
              className='h-12 bg-neutral-900 text-base text-white transition-all hover:scale-[1.02] hover:bg-neutral-800 active:scale-[0.98] dark:bg-neutral-50 dark:text-gray-900 dark:hover:bg-neutral-100'
              variant='default'
              size='lg'
            >
              <a
                className='flex w-full items-center justify-center gap-3'
                href='/resume.pdf'
                download
              >
                Download Resume <LuDownload className='size-5' />
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
