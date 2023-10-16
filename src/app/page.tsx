import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiArrowUpRight, FiDownload } from 'react-icons/fi';

import ProfilePic from '@/images/profile.png';

export default async function Home() {
  return (
    <div className='flex flex-col gap-16'>
      <div className='flex animate-in flex-col gap-8'>
        <div
          className='flex animate-in flex-col-reverse gap-6 text-secondary md:flex-row md:items-center'
          style={{ '--index': 1 } as React.CSSProperties}
        >
          <Image
            src={ProfilePic}
            alt='avatar'
            width={150}
            height={150}
            className='rounded-full bg-secondary'
            unoptimized={true}
          />
          <div className='ml-2 space-y-1'>
            <h1 className='animate-in text-3xl font-bold tracking-tight text-primary'>
              Taylor Horwood
            </h1>
            <p
              className='animate-in text-secondary'
              style={{ '--index': 1 } as React.CSSProperties}
            >
              Developer, tinkerer, indie hacker
            </p>
          </div>
        </div>
        <p
          className='max-w-2xl animate-in text-primary'
          style={{ '--index': 2 } as React.CSSProperties}
        >
          Hello world, I'm Taylor Horwood a site reliability engineer by day and
          full stack developer by night. I create flawless front-end experiences
          while taming DevOps challenges for seamless, dependable systems. Let's
          collaborate to transform your dream into digital magic, shaping a
          future where innovation meets unwavering reliability!
        </p>
        <ul
          className='animated-list flex animate-in flex-col gap-2 text-secondary md:flex-row md:gap-6'
          style={{ '--index': 2 } as React.CSSProperties}
        >
          <li className='transition-opacity'>
            <Link
              href='mailto:contact@tjhorwood.com'
              className='flex items-center gap-2 no-underline'
            >
              <FiArrowUpRight className='h-5 w-5' />
              <span>Email me</span>
            </Link>
          </li>
          <li className='transition-opacity'>
            <Link
              href='/links'
              className='flex items-center gap-2 no-underline'
            >
              <FiArrowUpRight className='h-5 w-5' />
              <span>More ways to connect</span>
            </Link>
          </li>
          <li className='transition-opacity'>
            <Link
              href='/resume.pdf'
              className='flex items-center gap-2 no-underline'
            >
              <FiDownload className='opacity-70 transition' />
              <span>Download Resume</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
