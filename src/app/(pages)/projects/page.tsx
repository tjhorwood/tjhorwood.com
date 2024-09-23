'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import Link from '@/components/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import capforgeImg from '@/assets/images/capforge.png';
import healthsyncImg from '@/assets/images/healthsync/healthsync.png';
import nlgImg from '@/assets/images/nlg/nlg.png';
import sahustudioImg from '@/assets/images/sahustudio.png';
import standardcbdImg from '@/assets/images/standardcbd.png';

interface Project {
  category: string;
  title: string;
  src: StaticImageData;
  description: string;
  tags: string[];
  href?: string;
  sourceCode?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleDialogClose = () => {
    setSelectedProject(null);
  };

  return (
    <div className='flex flex-col'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
        <p className='text-secondary'>
          Here are a few of the projects I have worked on.
        </p>
      </div>
      <div>
        <div className='mx-auto py-4'>
          <motion.div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {projectData.map((project, index) => (
              <motion.div
                key={index}
                layoutId={`card-${index}`} // Assign a unique layoutId for each card
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(project)} // On card click, open the dialog
              >
                <Card className='flex h-full cursor-pointer flex-col border-primary bg-tertiary'>
                  <CardHeader className='space-y-0.5'>
                    <CardTitle className='text-xl font-bold'>
                      {project.title}
                    </CardTitle>
                    <CardDescription className='text-sm text-gray-500'>
                      {project.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <motion.div
                      layoutId={`image-${index}`}
                      className='relative mb-4 h-52 w-full'
                    >
                      <Image
                        src={project.src}
                        alt={project.title}
                        className='h-full overflow-hidden rounded-md object-cover object-top shadow-md'
                      />
                    </motion.div>
                    <p className='line-clamp-2 text-sm'>
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
                onClick={handleDialogClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Apply layoutId to the dialog container for background growth animation */}
                <motion.div
                  layoutId={`card-${projectData.findIndex((p) => p.title === selectedProject.title)}`}
                  className='relative flex max-h-[85vh] max-w-[95vw] flex-col overflow-auto rounded-lg border border-primary bg-tertiary p-4 sm:max-w-3xl sm:p-6 md:p-8'
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    className='absolute right-2 top-2 rounded-full bg-primary p-2 text-primary shadow-md md:right-4 md:top-4'
                    onClick={handleDialogClose}
                  >
                    <XIcon className='h-5 w-5' />
                  </button>

                  <motion.div className='space-y-4'>
                    <motion.div
                      layoutId={`title-${projectData.findIndex((p) => p.title === selectedProject.title)}`}
                      className='text-left text-xl font-bold text-primary'
                    >
                      {selectedProject.title}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className='flex flex-wrap gap-2'
                    >
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='rounded-lg bg-primary px-3 py-1 font-medium text-primary shadow-md'
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    <div className='rounded-lg bg-primary p-4 shadow-md md:p-6'>
                      <p>{selectedProject.description}</p>
                    </div>

                    <motion.div
                      layoutId={`image-${projectData.findIndex((p) => p.title === selectedProject.title)}`}
                      className='relative w-full'
                    >
                      <Image
                        src={selectedProject.src}
                        alt={selectedProject.title}
                        className='h-full rounded-md object-cover object-top shadow-md'
                      />
                    </motion.div>

                    <div className='flex gap-2'>
                      {selectedProject.href && (
                        <Link
                          href={selectedProject.href}
                          className='inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-500/90'
                        >
                          Visit Site
                        </Link>
                      )}
                      {selectedProject.sourceCode && (
                        <Link
                          href={selectedProject.sourceCode}
                          className='flex items-center gap-2 rounded bg-[#333] px-4 py-2 font-bold text-white no-underline hover:bg-[#333]/90 dark:bg-[#f5f5f5] dark:text-[#333] hover:dark:bg-[#f5f5f5]/90'
                        >
                          <FaGithub className='h-6 w-6' />
                          Source Code
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const projectData = [
  {
    category: 'App Landing Page',
    title: 'Health Sync',
    src: healthsyncImg,
    description:
      'Health Sync introduces a wellness app designed to enhance productivity, focus, and overall well-being. It features bodyweight exercises, yoga, guided meditation, and breathwork, all accessible from home. The app is noted for its simple interface, daily fresh content, and health insurance-approved fitness programs. It also provides resources for incorporating well-being practices into family life. The platform is available on macOS and Windows.',
    tags: ['React', 'Next.js', 'Tailwind'],
    href: 'https://health-sync.org',
    sourceCode: 'https://github.com/tjhorwood/health-sync',
  },
  {
    category: 'Esports League',
    title: 'National League Gaming',
    src: nlgImg,
    description:
      'National League Gaming stands as an integrated platform tailored to meet the requirements of individual gamers aspiring to compete at a high level. This encompassing platform provides a spectrum of offerings including skill development through training modules, engagement in both complimentary and fee-based leagues, all of which present opportunities for participants to compete for substantial monetary rewards across the entirety of these competitive arenas.',
    tags: [
      'React',
      'Next.js',
      'Tailwind',
      'Prisma',
      'PostgreSQL',
      'Stripe',
      'SendGrid',
    ],
    href: 'https://nationalleaguegaming.com',
  },
  {
    category: 'Ecommerce',
    title: 'StandardCBD',
    src: standardcbdImg,
    description:
      'StandardCBD is an e-commerce platform, specializing in the retail of a comprehensive array of CBD, delta-8, and delta-9 products. The product range spans vapes, creams, edibles, and tinctures, catering to a discerning clientele seeking high-quality solutions in the realm of wellness and alternative remedies.',
    tags: ['Wordpress', 'WooCommerce', 'ShipStation'],
    href: 'https://standardcbd.com',
  },
  {
    category: 'Financal / Bookkeeping',
    title: 'CapForge',
    src: capforgeImg,
    description:
      'CapForge offers a comprehensive online platform catering to a diverse range of business needs, encompassing areas such as bookkeeping, taxation, payroll administration, strategic consulting, Amazon and e-commerce facilitation, as well as startup support.',
    tags: ['Wordpress'],
    href: 'https://capforge.com',
  },
  {
    category: 'Portfolio',
    title: 'Sahu Studio',
    src: sahustudioImg,
    description:
      'Sahu Studio is the online home of a talented friend who brings interior design dreams to life. This platform serves as both her creative playground and a showcase of her remarkable skills, featuring a captivating array of interior design projects, personalized paintings, and enchanting resin art pieces.',
    tags: ['Wordpress'],
    href: 'https://sahustudio.me',
  },
];
