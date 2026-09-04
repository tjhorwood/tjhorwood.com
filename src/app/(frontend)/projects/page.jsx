import PageIntro from '@/components/PageIntro';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import { getProjects } from '@/payload/queries/getProjects';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/projects/' },
  description:
    'Selected projects, case studies, and technical work by Taylor Horwood.',
  title: 'Projects',
};

export default async function Projects() {
  const { docs: projects } = await getProjects();

  return (
    <div className='flex flex-col gap-12 md:gap-16'>
      <PageIntro
        eyebrow='Projects'
        title='Selected work'
        descriptions='Production websites, CMS-backed apps, homelab systems, and experiments I have designed, built, deployed, and operated.'
      />

      <ProjectsShowcase projects={projects} />
    </div>
  );
}
