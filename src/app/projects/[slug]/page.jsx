import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaGitlab } from 'react-icons/fa';

import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import Tags from '@/components/Tags';

import { projectsData } from '@/lib/data';

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  const baseDelay = 0;
  const delayIncrement = 100;
  const aosAnimationType = 'fade-up';

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) space-y-8">
      <Breadcrumbs title={project.title} />
      <div className="space-y-8">
        <div data-aos={aosAnimationType}>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {project.category}
          </p>
        </div>

        <div
          data-aos={aosAnimationType}
          data-aos-delay={(baseDelay + 1 * delayIncrement).toString()}
        >
          <Tags tags={project.tags} />
        </div>

        <div
          className="rounded-md bg-neutral-200/50 p-4 shadow-md dark:bg-neutral-800"
          data-aos={aosAnimationType}
          data-aos-delay={(baseDelay + 2 * delayIncrement).toString()}
        >
          <p>{project.description}</p>
        </div>

        <div
          className="mb-6 flex gap-2"
          data-aos={aosAnimationType}
          data-aos-delay={(baseDelay + 3 * delayIncrement).toString()}
        >
          {project.href && (
            <Link
              href={project.href}
              className="inline-block rounded-md bg-blue-500 px-4 py-2 font-bold text-white no-underline hover:bg-blue-500/90"
            >
              Visit Site
            </Link>
          )}
          {project.sourceCode && (
            <Link
              href={project.sourceCode}
              className="flex items-center gap-2 rounded-md bg-[#FC6D26] px-4 py-2 font-bold text-white no-underline hover:bg-[#FC6D26]/90"
            >
              <FaGitlab className="h-6 w-6" />
              Source Code
            </Link>
          )}
        </div>

        <div
          className="space-y-4"
          data-aos={aosAnimationType}
          data-aos-delay={(baseDelay + 4 * delayIncrement).toString()}
        >
          <h2 className="text-2xl font-semibold">Screenshots</h2>
          <div className="relative w-full">
            <Image
              src={project.src}
              alt={project.title}
              className="h-full rounded-md object-cover object-top shadow-md"
              loading="lazy"
              placeholder="blur"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
