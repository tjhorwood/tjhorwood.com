'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { useMemo, useState } from 'react';
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

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // Adjust the delay between animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start state
  show: {
    opacity: 1,
    y: 0, // End state
    transition: {
      ease: 'easeInOut',
      duration: 0.4, // Animation duration
    },
  },
};

const ProjectCardComponent = ({ project, index, handleCardClick }: any) => (
  <motion.div
    key={index}
    variants={itemVariants}
    layoutId={`card-${index}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => handleCardClick(project)}
  >
    <Card className="flex h-full cursor-pointer flex-col border-primary bg-tertiary">
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {project.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative mb-4 h-52 w-full">
          <Image
            src={project.src}
            alt={project.title}
            className="h-full overflow-hidden rounded-md object-cover object-top shadow-md"
            loading="lazy"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <p className="line-clamp-2 text-sm">{project.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const ProjectCard = React.memo(ProjectCardComponent);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleDialogClose = () => {
    setSelectedProject(null);
  };

  const memoizedProjectsData = useMemo(() => projectsData, []);

  return (
    <motion.div
      className='flex flex-col'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
        <p className='text-secondary'>
          Here are a few of the projects I have worked on.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div variants={itemVariants}>
        <div className='mx-auto py-4'>
          <motion.div
            className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
            variants={containerVariants}
            initial='hidden'
            animate='show'
          >
            {memoizedProjectsData.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                handleCardClick={handleCardClick}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className='fixed inset-0 z-50 flex items-start justify-center bg-black/60'
            onClick={handleDialogClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal container */}
            <motion.div
              layoutId={`card-${memoizedProjectsData.findIndex(
                (p) => p.title === selectedProject.title,
              )}`}
              className='relative flex max-h-[92%] my-auto mx-auto max-w-[95vw] flex-col overflow-auto rounded-lg border border-primary bg-tertiary p-4 sm:max-w-3xl sm:p-6 md:p-8'
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Close button */}
              <button
                className='absolute right-2 top-2 rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 p-2 text-primary shadow-md md:right-4 md:top-4'
                onClick={handleDialogClose}
              >
                <XIcon className='h-5 w-5' />
              </button>

              <motion.div className='space-y-4'>
                <div className='text-left text-xl font-bold text-primary'>
                  {selectedProject.title}
                </div>

                <div className='flex flex-wrap gap-2'>
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='rounded-lg bg-primary px-3 py-1 font-medium text-primary shadow-md'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='rounded-lg bg-primary p-4 shadow-md md:p-6'>
                  <p>{selectedProject.description}</p>
                </div>

                <div className='relative w-full'>
                  <Image
                    src={selectedProject.src}
                    alt={selectedProject.title}
                    className='h-full rounded-md object-cover object-top shadow-md'
                    loading="lazy"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

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
    </motion.div>
  );
}
