'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LuDownload, LuMail } from 'react-icons/lu';
import Link from '@/components/Link';
import ProfilePic from '@/assets/images/profile.png';
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
    <motion.div
      className='mx-auto flex max-w-4xl flex-col gap-16'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      <motion.div className='flex flex-col gap-8' variants={containerVariants}>
        <motion.div
          className='flex flex-col-reverse gap-6 text-secondary md:flex-row md:items-center'
          variants={itemVariants}
        >
          <Image
            src={ProfilePic}
            alt='avatar'
            width={150}
            height={150}
            className='rounded-full bg-tertiary'
          />
          <div className='ml-2 space-y-1'>
            <h1 className='text-3xl font-bold tracking-tight text-primary'>
              Taylor Horwood
            </h1>
            <p className='text-secondary'>Developer, tinkerer, indie hacker</p>
            <motion.ul
              className='hidden space-x-6 pt-4 text-secondary md:flex md:justify-start'
              variants={containerVariants}
              initial='hidden'
              animate='show'
            >
              {socialsData.map(({ name, href, icon: Icon }) => (
                <motion.li key={name} variants={itemVariants}>
                  <Link
                    className='flex items-center gap-x-2 no-underline hover:text-primary'
                    href={href}
                  >
                    <Icon className='h-6 w-6' />
                    <span>{name}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
        <motion.p className='text-primary' variants={itemVariants}>
          Hello world, I&apos;m Taylor Horwood a site reliability engineer by
          day and full stack developer by night. I create flawless front-end
          experiences while taming DevOps challenges for seamless, dependable
          systems. Let&apos;s collaborate to transform your dream into digital
          magic, shaping a future where innovation meets unwavering reliability!
        </motion.p>
        <motion.ul
          className='flex justify-start space-x-6 py-2 md:hidden'
          variants={containerVariants}
          initial='hidden'
          animate='show'
        >
          {socialsData.map(({ name, href, icon: Icon }) => (
            <motion.li key={name} variants={itemVariants}>
              <Link
                className='flex items-center gap-x-2 no-underline hover:text-primary'
                href={href}
              >
                <Icon className='h-6 w-6' />
                <span>{name}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <motion.ul
          className='flex flex-col gap-2 text-secondary md:flex-row md:gap-6'
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
            <motion.li
              key={text}
              className='transition-opacity hover:text-primary'
              variants={itemVariants}
            >
              <Link
                href={href}
                className='flex items-center gap-2 no-underline'
              >
                <Icon className='h-5 w-5' />
                <span>{text}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
