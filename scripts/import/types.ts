export type ImportMode = 'dry-run' | 'write';

export type RepositoryProjectSource = {
  category?: string;
  description: string;
  heroImagePath?: string;
  href?: string;
  slug: string;
  sourceCode?: string;
  tags?: string[];
  thumbnailImagePath?: string;
  title: string;
};

export type ProjectImportPlan = {
  action: 'create-or-update';
  category?: string;
  categorySlug?: string;
  externalId: string;
  featuredOrder: number;
  heroImagePath?: string;
  liveUrl?: string;
  projectType: 'web' | 'application' | 'homelab' | 'open-source' | 'other';
  repositoryUrl?: string;
  slug: string;
  sourcePath: string;
  summary: string;
  technologies: string[];
  technologySlugs: string[];
  thumbnailImagePath?: string;
  title: string;
};
