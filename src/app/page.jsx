import ProfilePic from '@/assets/images/profile.webp';
import Link from '@/components/Link';
import { socialsData } from '@/lib/data';
import Image from 'next/image';
import { LuDownload, LuMail } from 'react-icons/lu';
import AnimatedContent from '@/components/animations/AnimatedContent';
import RotatingText from '@/components/animations/RotatingText';
import { Button } from '@/components/ui/button';

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
            className='size-40 rounded-full bg-secondary' // Use fixed h/w for consistency
          />
          <div className='space-y-2'>
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-4'>
              <h1 className='text-3xl font-bold tracking-tight'>
                Taylor Horwood
              </h1>
              <RotatingText
                texts={['Developer', 'Engineer', 'Tinkerer', 'Indie Hacker']}
                mainClassName='text-2xl px-3 bg-secondary overflow-hidden py-2 justify-center rounded-lg shadow'
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName='overflow-hidden'
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>

            {/* This list remains hidden on mobile as per your original code */}
            <ul className='space-x-6 pt-6 md:pt-4 flex justify-center md:justify-start'>
              {socialsData.map(({ name, href, icon: Icon }, index) => (
                <AnimatedContent
                  key={index}
                  distance={50}
                  direction='veritcal'
                  reverse={false}
                  duration={0.6}
                  ease='power3.out'
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0}
                  delay={index * 0.1}
                >
                  <li>
                    <Link
                      className='flex items-center gap-x-2 text-primary/60 no-underline hover:text-primary'
                      href={href}
                    >
                      <Icon className='h-6 w-6' />
                      <span>{name}</span>
                    </Link>
                  </li>
                </AnimatedContent>
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
        <div className='flex w-full flex-row space-x-2 sm:space-x-4 sm:w-auto'>
          {[
            {
              href: 'mailto:contact@tjhorwood.com',
              text: 'Email me',
              icon: LuMail,
            },
            { href: '/resume.pdf', text: 'Download resume', icon: LuDownload },
          ].map(({ href, text, icon: Icon }) => (
            <Link
              key={text}
              href={href}
              className='flex-grow sm:flex-grow-0'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button
                variant='secondary'
                size='lg'
                className='w-full cursor-pointer shadow'
              >
                <div className='flex items-center justify-center gap-2'>
                  <Icon className='size-5' />
                  <span>{text}</span>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
