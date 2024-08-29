import { Metadata } from 'next';
import { FiDownload } from 'react-icons/fi';

import {
  databaseData,
  platformData,
  skillsData,
  workplacesData,
} from '@/lib/data';

import ConnectLinks from '@/components/connect-links';
import Link from '@/components/link';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import Workplaces from '@/components/workplaces';

export const metadata: Metadata = {
  title: 'About',
};

const ListSection = ({
  heading,
  data,
}: {
  heading: string;
  data: string[];
}) => (
  <Section heading={heading} headingAlignment='left'>
    <ul className='flex flex-wrap justify-start gap-2'>
      {data.map((item, index) => (
        <li
          key={index}
          className='rounded-xl bg-tertiary px-5 py-3 dark:text-primary'
        >
          {item}
        </li>
      ))}
    </ul>
  </Section>
);

export default function About() {
  return (
    <div className='mx-auto flex max-w-5xl flex-col gap-16'>
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
              I&apos;m a DevOps/SRE engineer with a passion for solving complex
              problems and building reliable and scalable systems. I&apos;m also
              a loving husband and father who loves spending time with my
              family, whether we&apos;re going on adventures, playing games, or
              just cuddling up on the couch watching a good movie. When I&apos;m
              not spending time with my family, you&apos;ll find me outside
              hiking, biking, gaming, at the gym, or tinkering with technology.{' '}
            </p>
            <p>
              I&apos;m also super passionate about technology outside of work. I
              have a homelab where I experiment with different software and
              hardware, and I also enjoy coding for fun.
            </p>
            <p>
              My hobbies have taught me valuable skills that are directly
              transferable to my work, such as:
            </p>
            <ul className='ml-6 list-disc space-y-2'>
              <li>
                <strong>Problem-solving</strong>: I&apos;m able to think
                critically and creatively to solve complex problems, both big
                and small.
              </li>
              <li>
                <strong>Learning agility</strong>: I&apos;m constantly learning
                new things and staying up-to-date on the latest technologies.
              </li>
              <li>
                <strong>Attention to detail</strong>: I&apos;m meticulous in my
                work and have a high degree of attention to detail.
              </li>
              <li>
                <strong>Communication and teamwork</strong>: I&apos;m an
                effective communicator and team player, able to collaborate with
                others to achieve common goals.
              </li>
            </ul>
            <p>
              I&apos;m a bit of a jack-of-all-trades, with a passion for outdoor
              activities, working on cars, creating things, and solving
              problems. I&apos;m also a well-rounded individual with a wide
              range of interests, and I always bring a unique perspective and a
              can-do attitude to every task.
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

        <ListSection
          heading='Skills'
          data={skillsData as unknown as string[]}
        />
        <ListSection
          heading='Tools & Platforms'
          data={platformData as unknown as string[]}
        />
        <ListSection heading='Databases' data={databaseData as string[]} />

        <Section heading='Work' headingAlignment='left'>
          <div className='flex w-full flex-col gap-8'>
            <p>
              {new Date().getFullYear() - 2011}+ years of diverse professional
              experience.
            </p>
            <p>
              I began my career in customer facing roles, where I developed
              strong communication and interpersonal skills. I then transitioned
              to a technical support role, where I discovered my passion for
              technology. I have since progressed up the ranks, gaining
              expertise in cloud computing, software development, and data
              science. I am very passionate about using technology to solve
              real-world problems and make a positive impact on the world.
            </p>
            <Workplaces items={workplacesData.map(item => ({
              ...item,
              imageSrc: item.imageSrc.src
            }))} />
            <Button
              className='bg-secondary text-center'
              variant='default'
              size='lg'
            >
              <a
                className='flex w-full cursor-pointer items-center gap-2 rounded-lg outline-none'
                href='/resume.pdf'
                download
              >
                Download Resume <FiDownload className='h-4 w-4' />
              </a>
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
