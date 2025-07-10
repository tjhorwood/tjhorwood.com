import { projectsData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedContent from '@/components/animations/AnimatedContent';
import SpotlightCard from '@/components/animations/SpotlightCard';

export default function Projects() {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <AnimatedContent>
          <h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <p className='text-primary/60'>Here are a few of the projects I have worked on.</p>
        </AnimatedContent>
      </div>

      <div className='mx-auto py-4'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projectsData.map((project, index) => (
            <AnimatedContent key={index} delay={(index + 1) * 0.1}>
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className='group block cursor-pointer'
              >
                <SpotlightCard className='shadow'>
                  <div className='space-y-0.5 mb-4'>
                    <h1 className='text-xl font-bold'>{project.title}</h1>
                    <p className='text-sm text-primary/60'>{project.category}</p>
                  </div>
                  <div>
                    <div className='relative mb-4 h-52 w-full'>
                      <Image
                        src={project.srcShort}
                        alt={project.title}
                        className='h-full overflow-hidden rounded-md object-cover object-top shadow-md'
                        loading='lazy'
                        placeholder={project.blurDataURL ? 'blur' : undefined}
                        blurDataURL={project.blurDataURL}
                      />
                    </div>
                    <p className='line-clamp-2 text-sm'>{project.description}</p>
                  </div>
                </SpotlightCard>
              </Link>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </div>
  );
}
