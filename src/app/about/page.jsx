import AnimatedContent from '@/components/animations/AnimatedContent';
import Info from '@/components/Info';
import ListSection from '@/components/ListSection';
import PageIntro from '@/components/PageIntro';
import Work from '@/components/Work';

import { databaseData, platformData, skillsData } from '@/lib/data';

export const metadata = {
  description: 'About Me',
  title: 'About',
};

export default function About() {
  return (
    <div className='flex flex-col gap-12'>
      <PageIntro
        title='About Me'
        descriptions='Just a quick glimpse.'
        descriptionClassName='text-neutral-600 dark:text-neutral-400'
      />
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
