import Info from '@/components/Info';
import ListSection from '@/components/ListSection';
import Work from '@/components/Work';

import { databaseData, platformData, skillsData } from '@/lib/data';

export const metadata = {
  title: 'About',
  description: 'About Me',
};

export default function About() {
  const baseDelay = 0;
  const delayIncrement = 100;
  const aosAnimationType = 'fade-up';

  return (
    <div className='flex flex-col gap-12'>
      <div data-aos={aosAnimationType}>
        <h1 className='text-3xl font-bold tracking-tight'>About Me</h1>
        <p className='text-neutral-600 dark:text-neutral-400'>
          Just a quick glimpse.
        </p>
      </div>

      <div className='flex flex-col gap-16 md:gap-24'>
        <Info
          data_aos={aosAnimationType}
          data_aos_delay={(baseDelay + 1 * delayIncrement).toString()}
        />
        <ListSection
          heading='Skills'
          data={skillsData}
          data_aos={aosAnimationType}
          data_aos_delay={(baseDelay + 2 * delayIncrement).toString()}
        />
        <ListSection
          heading='Tools & Platforms'
          data={platformData}
          data_aos={aosAnimationType}
          data_aos_delay={(baseDelay + 3 * delayIncrement).toString()}
        />
        <ListSection
          heading='Databases'
          data={databaseData}
          data_aos={aosAnimationType}
          data_aos_delay={(baseDelay + 0 * delayIncrement).toString()}
        />
        <Work
          data_aos={aosAnimationType}
          data_aos_delay={(baseDelay + 0 * delayIncrement).toString()}
        />
      </div>
    </div>
  );
}
