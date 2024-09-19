import Image from 'next/image';
import { FiArrowUpRight, FiDownload } from 'react-icons/fi';

import { socialsData } from '@/lib/data';

import Link from '@/components/link';

import ProfilePic from '@/images/profile.png';

const SocialLinks = ({ className }: { className: string }) => (
  <ul className={className}>
    {socialsData.map(({ name, href, icon: Icon }) => (
      <li key={name}>
        <a
          className='flex items-center gap-x-2'
          rel='noopener noreferrer'
          target='_blank'
          href={href}
        >
          <Icon className='h-6 w-6' />
          <span>{name}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default function Home() {
  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col-reverse gap-6 text-secondary md:flex-row md:items-center'>
          <Image
            src={ProfilePic}
            alt='avatar'
            width={150}
            height={150}
            className='rounded-full bg-secondary'
          />
          <div className='ml-2 space-y-1'>
            <h1 className='text-3xl font-bold tracking-tight text-primary'>
              Taylor Horwood
            </h1>
            <p className='text-secondary'>Developer, tinkerer, indie hacker</p>
            <SocialLinks className='hidden space-x-6 pt-4 text-secondary md:flex md:justify-start' />
          </div>
        </div>
        <p className='text-primary'>
          Hello world, I&apos;m Taylor Horwood a site reliability engineer by
          day and full stack developer by night. I create flawless front-end
          experiences while taming DevOps challenges for seamless, dependable
          systems. Let&apos;s collaborate to transform your dream into digital
          magic, shaping a future where innovation meets unwavering reliability!
        </p>
        <SocialLinks className='flex justify-start space-x-6 py-2 text-secondary md:hidden' />
        <ul className='flex flex-col gap-2 text-secondary md:flex-row md:gap-6'>
          {[
            {
              href: '/contact',
              text: 'Contact me',
              icon: FiArrowUpRight,
            },
            { href: '/resume.pdf', text: 'Download Resume', icon: FiDownload },
          ].map(({ href, text, icon: Icon }) => (
            <li key={text} className='transition-opacity'>
              <Link
                href={href}
                className='flex items-center gap-2 no-underline'
              >
                <Icon className='h-5 w-5' />
                <span>{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
