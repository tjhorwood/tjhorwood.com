import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

import { projectsData } from '@/lib/data';
import Link from '@/components/Link';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projectsData.find((p) => p.slug === params.slug);

    if (!project) {
        return notFound(); // Display a 404 if the project doesn't exist
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="text-sm text-gray-500 mb-6">{project.category}</div>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="rounded-lg bg-primary px-3 py-1 font-medium text-primary shadow-md"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mb-6 rounded-lg bg-primary p-4 shadow-md">
                <p>{project.description}</p>
            </div>

            <div className="relative mb-6 w-full">
                <Image
                    src={project.src}
                    alt={project.title}
                    className="h-full rounded-md object-cover object-top shadow-md"
                    loading="lazy"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            <div className="flex gap-2">
                {project.href && (
                    <Link
                        href={project.href}
                        className="inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-500/90"
                    >
                        Visit Site
                    </Link>
                )}
                {project.sourceCode && (
                    <Link
                        href={project.sourceCode}
                        className="flex items-center gap-2 rounded bg-[#333] px-4 py-2 font-bold text-white no-underline hover:bg-[#333]/90 dark:bg-[#f5f5f5] dark:text-[#333] hover:dark:bg-[#f5f5f5]/90"
                    >
                        <FaGithub className="h-6 w-6" />
                        Source Code
                    </Link>
                )}
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
