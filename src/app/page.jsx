import Image from 'next/image';
import { LuDownload, LuMail } from 'react-icons/lu';
import ProfilePic from '@/assets/images/profile.webp';
import RotatingText from '@/components/animations/RotatingText';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { socialsData } from '@/lib/data';
import { buttonSurfaceClass, interactiveSurfaceClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col items-center gap-4 text-center md:flex-row md:gap-6 md:text-left'>
          <Image
            src={ProfilePic}
            alt='avatar'
            width={200}
            height={200}
            className={cn('size-40 rounded-full', interactiveSurfaceClass)}
          />
          <div className='space-y-2'>
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-4'>
              <h1 className='text-3xl font-bold tracking-tight'>
                Taylor Horwood
              </h1>
              <RotatingText
                texts={['Developer', 'Engineer', 'Tinkerer', 'Indie Hacker']}
                mainClassName='text-2xl px-3 bg-secondary hover:bg-secondary/80 overflow-hidden py-2 justify-center rounded-lg shadow border-border border'
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName='overflow-hidden'
                transition={{ damping: 30, stiffness: 400, type: 'spring' }}
                rotationInterval={2000}
              />
            </div>

            {/* This list remains hidden on mobile as per your original code */}
            <ul className='space-x-6 pt-6 md:pt-4 flex justify-center md:justify-start'>
              {socialsData.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    className='flex items-center gap-x-2 text-primary/60 no-underline hover:text-primary'
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
        <p>
          Hello world, my name is Taylor. I am a Site Reliability Engineer by
          day and full stack developer by night. I create flawless front-end
          experiences while taming DevOps challenges for seamless, dependable
          systems. Let&apos;s collaborate to transform your dream into digital
          magic, shaping a future where innovation meets unwavering reliability!
        </p>
        <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-4'>
          {[
            {
              href: 'mailto:contact@tjhorwood.com',
              icon: LuMail,
              text: 'Email me',
            },
            { href: '/resume.pdf', icon: LuDownload, text: 'Download resume' },
          ].map(({ href, text, icon: Icon }) => (
            <Button
              key={text}
              asChild
              variant='secondary'
              size='lg'
              className={cn(
                'w-full grow sm:w-auto sm:grow-0',
                buttonSurfaceClass,
              )}
            >
              <Link href={href} target='_blank' rel='noopener noreferrer'>
                <div className='flex items-center justify-center gap-2'>
                  <Icon className='size-5' />
                  <span>{text}</span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
