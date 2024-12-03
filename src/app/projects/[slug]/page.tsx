import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

import { projectsData } from '@/lib/data';
import Link from '@/components/Link';

export default async function ProjectPage({
    params,
}: any) {
    const { slug } = await params; // Ensure params are awaited before accessing properties

    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return notFound(); // Display a 404 if the project doesn't exist
    }

    return (
        <div className='mx-auto max-w-screen-xl space-y-8'>
            <div>
                <h1 className='text-3xl font-bold tracking-tight'>{project.title}</h1>
                <p className='text-secondary'>{project.category}</p>
            </div>

            <div className='flex flex-wrap gap-2'>
                {project.tags.map((tag, index) => (
                    <span
                        key={index}
                        className='rounded-md bg-tertiary px-4 py-2 font-medium shadow-md'
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className='rounded-md bg-tertiary p-4 shadow-md'>
                <p>{project.description}</p>
            </div>

            <div className='mb-6 flex gap-2'>
                {project.href && (
                    <Link
                        href={project.href}
                        className='inline-block rounded-md bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-500/90'
                    >
                        Visit Site
                    </Link>
                )}
                {project.sourceCode && (
                    <Link
                        href={project.sourceCode}
                        className='flex items-center gap-2 rounded-md bg-[#333] px-4 py-2 font-bold text-white no-underline hover:bg-[#333]/90 dark:bg-[#f5f5f5] dark:text-[#333] hover:dark:bg-[#f5f5f5]/90'
                    >
                        <FaGithub className='h-6 w-6' />
                        Source Code
                    </Link>
                )}
            </div>

            <div className='space-y-4'>
                <h1 className='text-2xl font-semibold'>Screenshots</h1>
                <div className='relative w-full'>
                    <Image
                        src={project.src}
                        alt={project.title}
                        className='h-full rounded-md object-cover object-top shadow-md'
                        loading='lazy'
                        placeholder='blur'
                        sizes='(max-width: 768px) 100vw, 33vw'
                    />
                </div>
            </div>
        </div>
    );
}

// Generate paths for all possible slugs
export async function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }));
}
