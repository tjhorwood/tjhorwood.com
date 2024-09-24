'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import { projectsData } from '@/lib/data';

import Link from '@/components/Link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
            {projectsData.map((project, index) => (
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
                  layoutId={`card-${projectsData.findIndex((p) => p.title === selectedProject.title)}`}
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
                      layoutId={`title-${projectsData.findIndex((p) => p.title === selectedProject.title)}`}
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
                      layoutId={`image-${projectsData.findIndex((p) => p.title === selectedProject.title)}`}
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
