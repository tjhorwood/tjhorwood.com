import Image from 'next/image';
import Link from 'next/link';
import AnimatedContent from '@/components/animations/AnimatedContent';
import SpotlightCard from '@/components/animations/SpotlightCard';
import PageIntro from '@/components/PageIntro';
import { getProjects } from '@/payload/queries/getProjects';

export const dynamic = 'force-dynamic';

function getImageUrl(image, size = 'card') {
  if (!image || typeof image === 'number') return null;
  return image.sizes?.[size]?.url ?? image.url ?? null;
}

function getImageDimensions(image, size = 'card') {
  if (!image || typeof image === 'number') {
    return { height: 432, width: 768 };
  }

  const sizedImage = image.sizes?.[size];
  return {
    height: sizedImage?.height ?? image.height ?? 432,
    width: sizedImage?.width ?? image.width ?? 768,
  };
}

function getCategoryName(project) {
  const category = project.categories?.[0];

  if (!category || typeof category === 'number') return project.projectType;

  return category.name;
}

export default async function Projects() {
  const { docs: projects } = await getProjects();

  return (
    <div className='flex flex-col gap-4'>
      <PageIntro
        title='Projects'
        descriptions='Here are a few of the projects I have worked on.'
      />

      <div className='mx-auto py-4'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project, index) => {
            const image = project.thumbnailImage || project.heroImage;
            const imageUrl = getImageUrl(image, 'card');
            const imageDimensions = getImageDimensions(image, 'card');

            return (
              <AnimatedContent key={project.slug} delay={(index + 1) * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className='group block cursor-pointer'
                >
                  <SpotlightCard className='shadow'>
                    <div className='space-y-0.5 mb-4'>
                      <h2 className='text-xl font-bold'>{project.title}</h2>
                      <p className='text-sm text-primary/60'>
                        {getCategoryName(project)}
                      </p>
                    </div>
                    <div>
                      {imageUrl && (
                        <div className='relative mb-4 h-52 w-full'>
                          <Image
                            src={imageUrl}
                            alt={image?.alt || project.title}
                            className='h-full overflow-hidden rounded-md object-cover object-top shadow-md'
                            height={imageDimensions.height}
                            loading='lazy'
                            width={imageDimensions.width}
                          />
                        </div>
                      )}
                      <p className='line-clamp-2 text-sm'>{project.summary}</p>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </div>
  );
}
