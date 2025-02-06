import { MotionDiv, MotionText, MotionUl, MotionLi } from '@/lib/framer';
import Image from 'next/image';
import { LuDownload, LuMail } from 'react-icons/lu';
import Link from '@/components/Link';
import ProfilePic from '@/assets/images/profile.webp';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';

// Animation Variants (defined outside to be accessible in both components)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // Adjust the delay between animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Starting state
  show: {
    opacity: 1,
    y: 0, // Ending state
    transition: {
      ease: 'easeOut',
      duration: 0.4, // Animation duration
    },
  },
};

const socialsData = [
  {
    name: 'GitHub',
    href: 'https://github.com/tjhorwood/',
    icon: BsGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/tjhorwood/',
    icon: BsLinkedin,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/taylorhorwood/',
    icon: BsInstagram,
  },
];

export default function Home() {
  return (
    <MotionDiv
      className='mx-auto flex max-w-4xl flex-col gap-16'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      <MotionDiv className='flex flex-col gap-8' variants={containerVariants}>
        <MotionDiv
          className='flex flex-col-reverse gap-6 text-neutral-900 md:flex-row md:items-center dark:text-white'
          variants={itemVariants}
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
            <MotionUl
              className='hidden space-x-6 pt-4 text-neutral-900 md:flex md:justify-start dark:text-white'
              variants={containerVariants}
              initial='hidden'
              animate='show'
            >
              {socialsData.map(({ name, href, icon: Icon }) => (
                <MotionLi key={name} variants={itemVariants}>
                  <Link
                    className='flex items-center gap-x-2 text-neutral-600 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                    href={href}
                  >
                    <Icon className='h-6 w-6' />
                    <span>{name}</span>
                  </Link>
                </MotionLi>
              ))}
            </MotionUl>
          </div>
        </MotionDiv>
        <MotionText
          className='text-neutral-900 dark:text-white'
          variants={itemVariants}
        >
          Hello world, I&apos;m Taylor Horwood a site reliability engineer by
          day and full stack developer by night. I create flawless front-end
          experiences while taming DevOps challenges for seamless, dependable
          systems. Let&apos;s collaborate to transform your dream into digital
          magic, shaping a future where innovation meets unwavering reliability!
        </MotionText>
        <MotionUl
          className='flex justify-start space-x-6 py-2 md:hidden'
          variants={containerVariants}
          initial='hidden'
          animate='show'
        >
          {socialsData.map(({ name, href, icon: Icon }) => (
            <MotionLi key={name} variants={itemVariants}>
              <Link
                className='flex items-center gap-x-2 text-neutral-600 no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                href={href}
              >
                <Icon className='h-6 w-6' />
                <span>{name}</span>
              </Link>
            </MotionLi>
          ))}
        </MotionUl>
        <MotionUl
          className='flex flex-col gap-2 text-neutral-900 md:flex-row md:gap-6 dark:text-white'
          variants={containerVariants}
          initial='hidden'
          animate='show'
        >
          {[
            {
              href: 'mailto:contact@tjhorwood.com',
              text: 'Email me',
              icon: LuMail,
            },
            { href: '/resume.pdf', text: 'Download resume', icon: LuDownload },
          ].map(({ href, text, icon: Icon }) => (
            <MotionLi
              key={text}
              className='text-neutral-600 transition-opacity hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              variants={itemVariants}
            >
              <Link
                href={href}
                className='flex items-center gap-2 no-underline'
              >
                <Icon className='h-5 w-5' />
                <span>{text}</span>
              </Link>
            </MotionLi>
          ))}
        </MotionUl>
      </MotionDiv>
    </MotionDiv>
  );
}
