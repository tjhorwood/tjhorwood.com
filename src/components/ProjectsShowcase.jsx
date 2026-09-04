'use client';

import { useMemo, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import {
  segmentItemActive,
  segmentItemBase,
  segmentItemInactive,
  segmentTrackClass,
} from '@/lib/styles';
import { cn } from '@/lib/utils';

const PROJECT_TYPE_LABELS = {
  application: 'Apps',
  homelab: 'Homelab',
  'open-source': 'Open source',
  other: 'Other',
  web: 'Web',
};

function formatProjectType(type) {
  return PROJECT_TYPE_LABELS[type] ?? type ?? 'Project';
}

export default function ProjectsShowcase({ projects }) {
  const [activeType, setActiveType] = useState('all');

  const tabs = useMemo(() => {
    const types = Array.from(
      new Set(projects.map((project) => project.projectType).filter(Boolean)),
    );
    return [
      { label: 'All', value: 'all' },
      ...types.map((type) => ({ label: formatProjectType(type), value: type })),
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeType === 'all') return projects;
    return projects.filter((project) => project.projectType === activeType);
  }, [activeType, projects]);

  return (
    <section>
      <div className={segmentTrackClass}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type='button'
            onClick={() => setActiveType(tab.value)}
            className={cn(
              segmentItemBase,
              activeType === tab.value
                ? segmentItemActive
                : segmentItemInactive,
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className='mt-8 grid gap-4 sm:grid-cols-2'>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id ?? project.slug}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
