import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { projectsData } from '@/lib/data';
import Link from '@/components/link';

export default function Projects() {
  return (
    <div className='mx-auto flex max-w-5xl flex-col gap-12'>
      <header>
        <h1 className='animate-in text-3xl font-bold tracking-tight' style={{ '--index': 1 } as React.CSSProperties}>
          Projects
        </h1>
        <p className='animate-in text-secondary' style={{ '--index': 2 } as React.CSSProperties}>
          Here are a few of the projects I have worked on.
        </p>
      </header>

      <div className='columns-1 md:columns-2 gap-6 space-y-6 animate-in' style={{ '--index': 3 } as React.CSSProperties}>
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  href,
  imageUrl,
}: {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  imageUrl: string | StaticImageData;
}) {
  return (
    <div className='break-inside-avoid mb-6'>
      <div className='group overflow-hidden relative rounded-xl bg-tertiary hover:shadow-lg hover:shadow-primary/50 dark:hover:shadow-primary/50 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300'>
        <div className='relative h-64 overflow-hidden p-2'>
          <Image
            src={imageUrl}
            alt={title}
            quality={95}
            className='object-top object-cover rounded-lg w-full h-full transition-transform duration-300 group-hover:scale-105'
            unoptimized={true}
          />
        </div>
        <div className='flex flex-col space-y-4 px-5 pb-5 pt-4 sm:pt-6'>
          <h3 className='text-2xl font-bold group-hover:text-primary transition-colors duration-300'>{title}</h3>
          <p className='mt-2 text-gray-700 dark:text-white/70'>
            {description}
          </p>
          <ul className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
              <li
                key={index}
                className='rounded-lg bg-primary px-3 py-1 text-xs uppercase tracking-wider text-primary'
              >
                {tag}
              </li>
            ))}
          </ul>
          <Link href={href} className='w-full sm:w-40'>
            <button className='w-full rounded-lg bg-gray-900 px-6 py-2 text-white transition hover:scale-105 dark:bg-white/80 dark:text-gray-900'>
              Visit site
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}