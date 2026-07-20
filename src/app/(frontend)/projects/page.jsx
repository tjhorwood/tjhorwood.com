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
  const featuredCount = projects.filter((project) => project.featured).length;
  const projectTypes = new Set(
    projects.map((project) => project.projectType).filter(Boolean),
  );

  return (
    <div className='flex flex-col gap-12'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-secondary via-background to-secondary/40 p-6 shadow-sm md:p-10'>
        <div className='pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
        <div className='relative max-w-4xl space-y-6'>
          <PageIntro
            title='Selected Work'
            descriptions='Production websites, CMS-backed apps, homelab systems, and experiments I have designed, built, deployed, and operated.'
          />
          <div className='flex flex-wrap gap-3'>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              {projects.length} case studies
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              {featuredCount || 1} featured
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              {projectTypes.size} project types
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              Next.js · Payload · Docker
            </span>
          </div>
        </div>
      </section>

      <ProjectsShowcase projects={projects} />
    </div>
  );
}
