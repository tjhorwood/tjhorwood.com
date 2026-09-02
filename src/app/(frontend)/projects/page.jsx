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
      <section className='relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-10'>
        <div className='pointer-events-none absolute inset-0 bg-blueprint opacity-60' />
        <div className='relative max-w-4xl space-y-6'>
          <PageIntro
            eyebrow='Projects'
            title='Selected Work'
            descriptions='Production websites, CMS-backed apps, homelab systems, and experiments I have designed, built, deployed, and operated.'
          />
          <div className='flex flex-wrap gap-3'>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              {projects.length} case studies
            </span>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              {featuredCount || 1} featured
            </span>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              {projectTypes.size} project types
            </span>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              Next.js · Payload · Docker
            </span>
          </div>
        </div>
      </section>

      <ProjectsShowcase projects={projects} />
    </div>
  );
}
