export type ImportMode = 'dry-run' | 'write';

export type RepositoryProjectSource = {
  category?: string;
  description: string;
  href?: string;
  slug: string;
  sourceCode?: string;
  tags?: string[];
  title: string;
};

export type ProjectImportPlan = {
  action: 'create-or-update';
  category?: string;
  externalId: string;
  slug: string;
  sourcePath: string;
  technologies: string[];
  title: string;
};
