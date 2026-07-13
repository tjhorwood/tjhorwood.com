import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import type { ProjectImportPlan, RepositoryProjectSource } from './types';

const sourcePath = path.resolve('src/lib/data.js');

function extractProjectObjects(source: string): RepositoryProjectSource[] {
  const match = source.match(/export const projectsData = \[([\s\S]*?)\n\];/);

  if (!match?.[1]) {
    throw new Error('Unable to locate projectsData export in src/lib/data.js');
  }

  const body = match[1];
  const objects = body.match(/\{[\s\S]*?\n  \}/g) ?? [];

  return objects.map((objectSource) => {
    const readString = (field: string) => {
      const value = objectSource.match(
        new RegExp(`${field}:\\s*(?:\\n\\s*)?['\\"]([^'\\"]+)['\\"]`),
      );
      return value?.[1];
    };

    const tagMatch = objectSource.match(/tags: \[([\s\S]*?)\]/);
    const tags = tagMatch
      ? [...tagMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((tag) => tag[1])
      : [];

    const title = readString('title');
    const slug = readString('slug');
    const description = readString('description');

    if (!(title && slug && description)) {
      throw new Error(
        `Unable to parse required project fields from: ${objectSource}`,
      );
    }

    return {
      category: readString('category'),
      description,
      href: readString('href'),
      slug,
      sourceCode: readString('sourceCode'),
      tags,
      title,
    };
  });
}

function toImportPlan(project: RepositoryProjectSource): ProjectImportPlan {
  return {
    action: 'create-or-update',
    category: project.category,
    externalId: project.slug,
    slug: project.slug,
    sourcePath,
    technologies: project.tags ?? [],
    title: project.title,
  };
}

async function main() {
  const writeEnabled = process.argv.includes('--write');
  const source = await fs.readFile(sourcePath, 'utf8');
  const plans = extractProjectObjects(source).map(toImportPlan);

  console.log(`Target environment: ${process.env.NODE_ENV ?? 'development'}`);
  console.log(`Mode: ${writeEnabled ? 'write' : 'dry-run'}`);
  console.log(`Source: ${sourcePath}`);
  console.log('Collections: projects, technologies, categories');
  console.log(`Records found: ${plans.length}`);

  for (const plan of plans) {
    console.log(
      `- ${plan.action}: projects/${plan.slug} (${plan.title}) ` +
        `technologies=[${plan.technologies.join(', ')}] category=${plan.category ?? 'none'}`,
    );
  }

  if (writeEnabled) {
    throw new Error(
      'Write mode is intentionally not implemented yet; keep this slice dry-run only.',
    );
  }
}

void main();
