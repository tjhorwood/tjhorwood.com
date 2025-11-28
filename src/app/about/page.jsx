import Info from '@/components/Info';
import ListSection from '@/components/ListSection';
import Work from '@/components/Work';
import AnimatedContent from '@/components/animations/AnimatedContent';

import { databaseData, platformData, skillsData } from '@/lib/data';

export const metadata = {
  title: 'About',
  description: 'About Me',
};

export default function About() {
  return (
    <div className='flex flex-col gap-12'>
      <div>
        <AnimatedContent>
          <h1 className='text-3xl font-bold tracking-tight'>About Me</h1>
        </AnimatedContent>
        <AnimatedContent delay={0.1} >
          <p className='text-neutral-600 dark:text-neutral-400'>
            Just a quick glimpse.
          </p>
        </AnimatedContent>
      </div>
      <div className='flex flex-col gap-16 md:gap-24'>
        <AnimatedContent delay={0.2}>
          <Info />
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <ListSection heading='Skills' data={skillsData} />
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <ListSection heading='Tools & Platforms' data={platformData} />
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <ListSection heading='Databases' data={databaseData} />
        </AnimatedContent>
        <Work />
      </div>
    </div>
  );
}
