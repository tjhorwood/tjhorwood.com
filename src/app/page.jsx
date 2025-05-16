import Image from 'next/image';
import { LuDownload, LuMail } from 'react-icons/lu';
import Link from '@/components/Link';
import ProfilePic from '@/assets/images/profile.webp';
import { socialsData } from '@/lib/data';

export default function Home() {
  const baseDelay = 0;
  const delayIncrement = 100;
  const aosAnimationType = 'fade-up';

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <div
          className='flex flex-col-reverse gap-6 text-neutral-900 md:flex-row md:items-center dark:text-white'
          data-aos={aosAnimationType}
        >
          <Image
            src={ProfilePic}
            alt='avatar'
            width={150}
            height={150}
            className='rounded-full bg-neutral-200/50 dark:bg-neutral-800'
          />
          <div className='ml-2 space-y-1'>
            <h1 className='text-3xl font-bold tracking-tight text-neutral-900 dark:text-white'>
              Taylor Horwood
            </h1>
            <p className='text-neutral-600 dark:text-neutral-400'>
              Developer, tinkerer, indie hacker
            </p>
            <ul className='hidden space-x-6 pt-4 text-neutral-900 md:flex md:justify-start dark:text-white'>
              {socialsData.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    className='flex items-center gap-x-2 text-neutral-600 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                    href={href}
                  >
                    <Icon className='h-6 w-6' />
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p
          className='text-neutral-900 dark:text-white'
          data-aos={aosAnimationType}
          data-aos-delay={(baseDelay + 1 * delayIncrement).toString()}
        >
          Hello world, I&apos;m Taylor Horwood a site reliability engineer by
          day and full stack developer by night. I create flawless front-end
          experiences while taming DevOps challenges for seamless, dependable
          systems. Let&apos;s collaborate to transform your dream into digital
          magic, shaping a future where innovation meets unwavering reliability!
        </p>
        <ul
          className='flex max-w-full flex-wrap justify-start gap-6 py-2 md:hidden'
          data-aos={aosAnimationType}
          data-aos-delay={(baseDelay + 2 * delayIncrement).toString()}
        >
          {socialsData.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                className='flex items-center gap-x-2 text-neutral-600 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                href={href}
              >
                <Icon className='h-6 w-6' />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className='flex flex-col gap-2 text-neutral-900 md:flex-row md:gap-6 dark:text-white'
          data-aos={aosAnimationType}
          data-aos-delay={(baseDelay + 3 * delayIncrement).toString()}
        >
          {[
            {
              href: 'mailto:contact@tjhorwood.com',
              text: 'Email me',
              icon: LuMail,
            },
            { href: '/resume.pdf', text: 'Download resume', icon: LuDownload },
          ].map(({ href, text, icon: Icon }) => (
            <li
              key={text}
              className='text-neutral-600 transition-opacity hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            >
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
