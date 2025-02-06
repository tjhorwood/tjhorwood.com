'use client';
import Image from 'next/image';
import {
  databaseData,
  platformData,
  skillsData,
  workplacesData,
} from '@/lib/data';

import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AnimatePresence, motion } from 'framer-motion';
import { Key } from 'react';
import { cn } from '@/lib/utils';
import { LuDownload } from 'react-icons/lu';

const ListSection = ({ heading, data }: { heading: string; data: any }) => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3,
      },
    },
  };

  return (
    <Section heading={heading} headingAlignment='left'>
      <motion.ul
        className='flex flex-wrap justify-start gap-2'
        variants={containerVariants}
        initial='hidden'
        animate='show'
      >
        {data.map(
          ({ name, css, icon: Icon }: any, index: Key | null | undefined) => (
            <motion.li
              key={index}
              className='flex gap-2 rounded-xl bg-neutral-200/50 px-4 py-2 text-sm text-neutral-900 shadow-sm md:text-base dark:bg-neutral-800 dark:text-white'
              variants={itemVariants}
            >
              <Icon className={cn('h-6 w-6', css)} />
              {name}
            </motion.li>
          ),
        )}
      </motion.ul>
    </Section>
  );
};

export default function About() {
  // Define animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, // Adjust the delay between animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start state
    show: {
      opacity: 1,
      y: 0, // End state
      transition: {
        ease: 'easeOut',
        duration: 0.5, // Animation duration
      },
    },
  };

  return (
    <motion.div
      className='flex flex-col gap-12'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <h1 className='text-3xl font-bold tracking-tight'>About Me</h1>
        <p className='text-neutral-600 dark:text-neutral-400'>
          Just a quick glimpse.
        </p>
      </motion.div>

      <motion.div
        className='flex flex-col gap-16 md:gap-24'
        variants={containerVariants}
      >
        {/* About Section */}
        <motion.div variants={itemVariants}>
          <Section heading='About' headingAlignment='left'>
            <div className='flex flex-col gap-6'>
              <p>Hello world, I&apos;m Taylor Horwood!</p>
              <p>
                I&apos;m a DevOps/SRE engineer with a passion for solving
                complex problems and building reliable and scalable systems.
                I&apos;m also a loving husband and father who loves spending
                time with my family, whether we&apos;re going on adventures,
                playing games, or just cuddling up on the couch watching a good
                movie. When I&apos;m not spending time with my family,
                you&apos;ll find me outside hiking, biking, gaming, at the gym,
                or tinkering with technology.{' '}
              </p>
              <p>
                I&apos;m also super passionate about technology outside of work.
                I have a homelab where I experiment with different software and
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
                  <strong>Learning agility</strong>: I&apos;m constantly
                  learning new things and staying up-to-date on the latest
                  technologies.
                </li>
                <li>
                  <strong>Attention to detail</strong>: I&apos;m meticulous in
                  my work and have a high degree of attention to detail.
                </li>
                <li>
                  <strong>Communication and teamwork</strong>: I&apos;m an
                  effective communicator and team player, able to collaborate
                  with others to achieve common goals.
                </li>
              </ul>
              <p>
                I&apos;m a bit of a jack-of-all-trades, with a passion for
                outdoor activities, working on cars, creating things, and
                solving problems. I&apos;m also a well-rounded individual with a
                wide range of interests, and I always bring a unique perspective
                and a can-do attitude to every task.
              </p>
            </div>
          </Section>
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants}>
          <ListSection heading='Skills' data={skillsData} />
        </motion.div>

        {/* Tools & Platforms Section */}
        <motion.div variants={itemVariants}>
          <ListSection heading='Tools & Platforms' data={platformData} />
        </motion.div>

        {/* Databases Section */}
        <motion.div variants={itemVariants}>
          <ListSection heading='Databases' data={databaseData} />
        </motion.div>

        {/* Work Section */}
        <motion.div variants={itemVariants}>
          <Section heading='Work' headingAlignment='left'>
            <div className='flex w-full flex-col space-y-6'>
              <p>
                {new Date().getFullYear() - 2011}+ years of diverse professional
                experience.
              </p>
              <p>
                I began my career in customer facing roles, where I developed
                strong communication and interpersonal skills. I then
                transitioned to a technical support role, where I discovered my
                passion for technology. I have since progressed up the ranks,
                gaining expertise in cloud computing, software development, and
                data science. I am very passionate about using technology to
                solve real-world problems and make a positive impact on the
                world.
              </p>
              <motion.ul
                className='flex flex-col space-y-4'
                variants={containerVariants}
                initial='hidden'
                animate='show'
              >
                {workplacesData.map((item, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Sheet>
                      <SheetTrigger className='flex w-full justify-between rounded-lg bg-neutral-200/50 p-4 no-underline shadow-sm transition-all duration-200 hover:scale-[1.02] dark:bg-neutral-800'>
                        <>
                          <div className='flex items-center gap-4'>
                            <Image
                              src={item.imageSrc}
                              alt={item.company}
                              width={48}
                              height={48}
                              className='hidden rounded-full sm:block'
                            />
                            <div className='flex flex-col gap-px text-left'>
                              <p className={item.link ? 'external-arrow' : ''}>
                                {item.title}
                              </p>
                              <p className='text-neutral-900 dark:text-white'>
                                {item.company}
                              </p>
                            </div>
                          </div>
                          {item.time && (
                            <p className='ml-3 text-right text-neutral-900 dark:text-white'>
                              {item.time}
                            </p>
                          )}
                        </>
                      </SheetTrigger>
                      <AnimatePresence>
                        <SheetContent className='border-none p-0 shadow-none'>
                          <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            transition={{
                              type: 'tween',
                              stiffness: 100,
                              damping: 20,
                              duration: 0.2,
                            }}
                            className='hide-scrollbar ml-auto h-full max-w-[95vw] overflow-scroll rounded-l-xl bg-neutral-200 p-8 dark:bg-neutral-800'
                          >
                            <SheetHeader className='text-left'>
                              <SheetTitle>{item.title}</SheetTitle>
                              <p className='text-neutral-900 dark:text-white'>
                                {item.company}
                              </p>
                            </SheetHeader>
                            <p className='py-4 text-neutral-900 dark:text-white'>
                              Key responsibilities:
                            </p>
                            <ul className='ml-4 list-disc space-y-3'>
                              {item.description?.map(({ content }, index) => (
                                <li key={index}>{content}</li>
                              ))}
                            </ul>
                          </motion.div>
                        </SheetContent>
                      </AnimatePresence>
                    </Sheet>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Download Resume Button */}
              <motion.div variants={itemVariants}>
                <Button
                  className='h-12 bg-neutral-900 text-base text-white transition-all hover:scale-[1.02] hover:bg-neutral-800 dark:bg-neutral-50 dark:text-gray-900 dark:hover:bg-neutral-100'
                  variant='default'
                  size='lg'
                >
                  <a
                    className='flex w-full cursor-pointer items-center gap-3 rounded-lg outline-hidden'
                    href='/resume.pdf'
                    download
                  >
                    Download Resume <LuDownload className='size-5' />
                  </a>
                </Button>
              </motion.div>
            </div>
          </Section>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
