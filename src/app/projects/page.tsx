'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { projectsData } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Projects() {
  const router = useRouter();
  const memoizedProjectsData = useMemo(() => projectsData, []);

  const handleCardClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

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
      <div className="mx-auto py-4">
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {memoizedProjectsData.map((project) => (
            <motion.div
              variants={itemVariants}
              key={project.slug}
              onClick={() => handleCardClick(project.slug)}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <Card className="flex h-full flex-col border-primary bg-tertiary">
                <CardHeader className="space-y-0.5">
                  <CardTitle className="text-xl font-bold">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {project.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="relative mb-4 h-52 w-full">
                    <Image
                      src={project.srcShort}
                      alt={project.title}
                      className="h-full overflow-hidden rounded-md object-cover object-top shadow-md"
                      loading="lazy"
                      placeholder="blur"
                    />
                  </div>
                  <p className="line-clamp-2 text-sm">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
