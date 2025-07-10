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
import AnimatedContent from './animations/AnimatedContent';

const WorkplaceItem = ({ item }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='flex w-full cursor-pointer items-center justify-between rounded-lg bg-secondary hover:bg-secondary/80 p-4 text-left no-underline shadow border-border border'>
          <div className='flex flex-1 items-center gap-4'>
            <Image
              src={item.imageSrc}
              alt={`${item.company} logo`}
              width={48}
              height={48}
              className='hidden rounded-full sm:block'
            />
            <div className='flex flex-col gap-px'>
              <p className='font-medium'>{item.title}</p>
              <p className='text-primary/60'>{item.company}</p>
            </div>
          </div>
          {item.time && (
            <p className='ml-3 text-right text-sm whitespace-nowrap text-primary'>
              {item.time}
            </p>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        className={`min-w-11/12 sm:min-w-2/3 lg:min-w-1/2 xl:min-w-1/3 2xl:min-w-1/4 border-none [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:rounded-sm [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:opacity-70 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:hover:opacity-100 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:focus:opacity-100 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:focus:ring-0 [&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:focus:ring-offset-0`}
      >
        <div className='hide-scrollbar ml-auto h-full w-full overflow-y-auto rounded-l-xl bg-secondary p-6 md:p-8'>
          <SheetHeader className='text-left pl-0'>
            <SheetTitle className='text-2xl font-semibold'>
              {item.title}
            </SheetTitle>
            <p className='text-md'>{item.company}</p>
          </SheetHeader>
          <p className='py-2 text-sm md:text-base'>Key responsibilities:</p>
          <ul className='ml-4 list-disc space-y-2 text-sm md:text-base'>
            {item.description?.map((descItem, index) => (
              <li key={index}>{descItem.content}</li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default function Work() {
  const yearsOfExperience = useMemo(() => new Date().getFullYear() - 2011, []);

  return (
    <div>
      <Section heading='Work' headingAlignment='left'>
        <div className='flex w-full flex-col space-y-6'>
          <p>{yearsOfExperience}+ years of diverse professional experience.</p>
          <p>
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
              <AnimatedContent delay={0.1} key={index}>
                <li key={item.id || index}>
                  <WorkplaceItem item={item} />
                </li>
              </AnimatedContent>
            ))}
          </ul>

          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <Button
                variant='default'
                size='lg'
                className='w-full cursor-pointer shadow border-border border text-background'
              >
                <a
                  className='flex w-full items-center justify-center gap-3'
                  href='/resume.pdf'
                  download
                >
                  <LuDownload className='size-5' />
                  <span>Download Resume</span>
                </a>
              </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
