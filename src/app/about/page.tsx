import Image from 'next/image';
import { Metadata } from 'next';

import Link from '@/components/ui/Link';
import Section from '@/components/Section';
import ConnectLinks from '@/components/ConnectLinks';
import Workplaces from '@/components/Workplaces';
// import Gallery from '@/components/Gallery';
import Syapse from '@/images/syapse.png';
import CRFHealth from '@/images/crfhealth.jpg';
import Amtrak from '@/images/amtrak.png';

import { skillsData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className='flex flex-col gap-16'>
      <div>
        <h1 className='animate-in text-3xl font-bold tracking-tight'>
          About Me
        </h1>
        <p
          className='animate-in text-secondary'
          style={{ '--index': 1 } as React.CSSProperties}
        >
          Just a quick glimpse.
        </p>
      </div>
      <div
        className='flex animate-in flex-col gap-16 md:gap-24'
        style={{ '--index': 3 } as React.CSSProperties}
      >
        <Section heading='About' headingAlignment='left'>
          <div className='flex flex-col gap-6'>
            <p>Hello world, I&apos;m Taylor Horwood!</p>

            <p>
              Loving husband and father who enjoys spending time with my family,
              engaging in outdoor activities, working on cars, and
              creating/building things in my workshop. I am also very passionate
              about technology and enjoy tinkering with my homelab and coding
              for fun. These hobbies have taught me valuable problem-solving
              skills and a desire to constantly learn and improve. As a
              well-rounded individual, I bring a unique perspective and a can-do
              attitude to every task.
            </p>

            <p>
              I have a passion for design and am always looking for ways to
              incorporate it into my engineering work.
            </p>
            <p>
              In addition to coding, I also make{' '}
              <a
                className='underline'
                href='https://www.youtube.com/channel/@brianruizy'
                target='__blank'
              >
                YouTube
              </a>{' '}
              videos, where I focus on tech gear, creative vlogs, and a bit of
              personal development.
            </p>
            <p>
              When I&apos;m not at my desk I am probably lifting weights,
              playing soccer, or at a coffee shop :)
            </p>
          </div>
        </Section>

        <Section heading='Connect' headingAlignment='left'>
          <div className='flex w-full flex-col gap-8'>
            <p>
              Have a question or just want to chat? Feel free to{' '}
              <a href='mailto:contact@tjhorwood.com' className='underline'>
                email me
              </a>
              .
            </p>
            <ul className='animated-list grid flex-grow grid-cols-1 gap-2 md:grid-cols-2'>
              {ConnectLinks.map((link) => (
                <li className='col-span-1 transition-opacity' key={link.label}>
                  <Link
                    href={link.href}
                    className='inline-grid w-full rounded-lg border border-neutral-200 p-4 no-underline transition-opacity dark:border-neutral-700'
                  >
                    <div className='flex items-center gap-3'>
                      <span className='text-xl'>{link.icon}</span>
                      {link.label}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='ml-auto h-5 w-5 text-secondary'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section heading='Skills' headingAlignment='left'>
          <div className='flex w-full flex-col gap-8'>
            <ul className='flex flex-wrap justify-start gap-2'>
              {skillsData.map((skill, index) => (
                <li
                  className='rounded-xl bg-secondary px-5 py-3 dark:text-primary'
                  key={index}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section heading='Work' headingAlignment='left'>
          <div className='flex w-full flex-col gap-8'>
            <p>
              {new Date().getFullYear() - 2011}+ years of professional
              development experience.
            </p>
            <p>
              I started my career teaching others how to code, which I will
              always be appreciative of. Then I worked at a few small local
              companies.
            </p>
            <Workplaces items={workplaces} />
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    title: 'Team Lead - Service Ops Engineering',
    company: 'Syapse',
    time: '2022 - 2023',
    imageSrc: Syapse,
    link: 'https://syapse.com',
  },
  {
    title: 'Sr. Service Ops Engineer',
    company: 'Syapse',
    time: '2022 - 2022',
    imageSrc: Syapse,
    link: 'https://syapse.com',
  },
  {
    title: 'Site Reliability Engineer',
    company: 'Syapse',
    time: '2018 - 2022',
    imageSrc: Syapse,
    link: 'https://syapse.com',
  },
  {
    title: 'Sr. Customer Success Engineer',
    company: 'Syapse',
    time: '2015 - 2018',
    imageSrc: Syapse,
    link: 'https://syapse.com',
  },
  {
    title: 'Application Specialist',
    company: 'CRF Health',
    time: '2015 - 2015',
    imageSrc: CRFHealth,
    link: 'https://signanthealth.com/',
  },
  {
    title: 'Tier II - Technical Support',
    company: 'CRF Health',
    time: '2013 - 2015',
    imageSrc: CRFHealth,
    link: 'https://signanthealth.com/',
  },
  {
    title: 'Application Support Analyst',
    company: 'Amtrak',
    time: '2011 - 2013',
    imageSrc: Amtrak,
    link: 'https://amtrak.com',
  },
];
