import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getPayload } from '../../src/payload/getPayload.ts';

import type { ProjectImportPlan, RepositoryProjectSource } from './types';

const sourcePath = path.resolve('src/lib/data.js');
const repositoryRoot = process.cwd();

type ImportMode = 'dry-run' | 'write';

type UpsertAction = 'create' | 'update' | 'reuse';
type TechnologyCategory =
  | 'backend'
  | 'cloud'
  | 'cms'
  | 'database'
  | 'devops'
  | 'frontend'
  | 'other'
  | 'tooling';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferTechnologyCategory(name: string): TechnologyCategory {
  const normalized = name.toLowerCase();

  if (
    ['postgresql', 'mysql', 'mariadb', 'sqlite', 'redis'].includes(normalized)
  ) {
    return 'database';
  }

  if (
    ['docker', 'kubernetes', 'terraform', 'jenkins', 'circleci'].includes(
      normalized,
    )
  ) {
    return 'devops';
  }

  if (['aws', 'amazon web services'].includes(normalized)) {
    return 'cloud';
  }

  if (
    ['directus cms', 'wordpress', 'payload', 'payload cms'].includes(normalized)
  ) {
    return 'cms';
  }

  if (
    [
      'node.js',
      'express',
      'django',
      'go',
      'python',
      'prisma',
      'graphql',
    ].includes(normalized)
  ) {
    return 'backend';
  }

  if (['stripe', 'sendgrid', 'shipstation'].includes(normalized)) {
    return 'tooling';
  }

  return 'frontend';
}

function inferProjectType(category?: string) {
  const normalized = category?.toLowerCase() ?? '';

  if (normalized.includes('app')) return 'application';
  if (normalized.includes('homelab')) return 'homelab';
  if (normalized.includes('open source')) return 'open-source';

  return 'web';
}

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
    const heroImagePath = readString('heroImagePath') ?? readString('src');
    const thumbnailImagePath =
      readString('thumbnailImagePath') ?? readString('srcShort');

    if (!(title && slug && description)) {
      throw new Error(
        `Unable to parse required project fields from: ${objectSource}`,
      );
    }

    return {
      category: readString('category'),
      description,
      heroImagePath,
      href: readString('href'),
      slug,
      sourceCode: readString('sourceCode'),
      tags,
      thumbnailImagePath,
      title,
    };
  });
}

function toImportPlan(
  project: RepositoryProjectSource,
  index: number,
): ProjectImportPlan {
  const category = project.category;

  return {
    action: 'create-or-update',
    category,
    categorySlug: category ? slugify(category) : undefined,
    externalId: project.slug,
    featuredOrder: index + 1,
    heroImagePath: project.heroImagePath,
    liveUrl: project.href,
    projectType: inferProjectType(category),
    repositoryUrl: project.sourceCode,
    slug: project.slug,
    sourcePath,
    summary: project.description,
    technologies: project.tags ?? [],
    technologySlugs: (project.tags ?? []).map(slugify),
    thumbnailImagePath: project.thumbnailImagePath,
    title: project.title,
  };
}

async function findByExternalId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'categories' | 'media' | 'projects' | 'technologies',
  externalId: string,
) {
  const result = await payload.find({
    collection,
    limit: 1,
    overrideAccess: true,
    where: {
      externalId: {
        equals: externalId,
      },
    },
  });

  return result.docs[0] ?? null;
}

async function upsertCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  name: string,
) {
  const externalId = slugify(name);
  const existing = await findByExternalId(payload, 'categories', externalId);
  const data = {
    externalId,
    name,
    slug: externalId,
    type: 'project' as const,
  };

  if (existing) {
    const doc = await payload.update({
      collection: 'categories',
      data,
      id: existing.id,
      overrideAccess: true,
    });
    return { action: 'update' as UpsertAction, doc };
  }

  const doc = await payload.create({
    collection: 'categories',
    data,
    overrideAccess: true,
  });

  return { action: 'create' as UpsertAction, doc };
}

async function upsertTechnology(
  payload: Awaited<ReturnType<typeof getPayload>>,
  name: string,
) {
  const externalId = slugify(name);
  const existing = await findByExternalId(payload, 'technologies', externalId);
  const data = {
    category: inferTechnologyCategory(name),
    externalId,
    name,
    slug: externalId,
  };

  if (existing) {
    const doc = await payload.update({
      collection: 'technologies',
      data,
      id: existing.id,
      overrideAccess: true,
    });
    return { action: 'update' as UpsertAction, doc };
  }

  const doc = await payload.create({
    collection: 'technologies',
    data,
    overrideAccess: true,
  });

  return { action: 'create' as UpsertAction, doc };
}

async function upsertMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  sourceFilePath: string,
  alt: string,
) {
  const externalId = sourceFilePath;
  const existing = await findByExternalId(payload, 'media', externalId);

  if (existing) {
    const doc = await payload.update({
      collection: 'media',
      data: {
        alt,
        externalId,
        mediaType: 'image' as const,
        sourcePath: sourceFilePath,
      },
      id: existing.id,
      overrideAccess: true,
    });
    return { action: 'update' as UpsertAction, doc };
  }

  const absolutePath = path.join(repositoryRoot, sourceFilePath);
  await fs.access(absolutePath);

  const doc = await payload.create({
    collection: 'media',
    data: {
      alt,
      externalId,
      mediaType: 'image' as const,
      sourcePath: sourceFilePath,
    },
    filePath: absolutePath,
    overrideAccess: true,
  });

  return { action: 'create' as UpsertAction, doc };
}

async function upsertProject(
  payload: Awaited<ReturnType<typeof getPayload>>,
  plan: ProjectImportPlan,
  categoryIds: number[],
  technologyIds: number[],
  heroImageId?: number,
  thumbnailImageId?: number,
) {
  const existing = await findByExternalId(payload, 'projects', plan.externalId);
  const data = {
    _status: 'published' as const,
    categories: categoryIds,
    externalId: plan.externalId,
    featured: true,
    featuredOrder: plan.featuredOrder,
    heroImage: heroImageId,
    lifecycle: 'completed' as const,
    liveUrl: plan.liveUrl,
    projectType: plan.projectType,
    publishedAt: new Date().toISOString(),
    repositoryUrl: plan.repositoryUrl,
    screenshots: heroImageId
      ? [
          {
            image: heroImageId,
          },
        ]
      : [],
    seo: {
      description: plan.summary,
      image: heroImageId,
      title: plan.title,
    },
    slug: plan.slug,
    sourcePath: plan.sourcePath,
    summary: plan.summary,
    technologies: technologyIds,
    thumbnailImage: thumbnailImageId,
    title: plan.title,
    visibility: 'public' as const,
  };

  if (existing) {
    const doc = await payload.update({
      collection: 'projects',
      data,
      id: existing.id,
      overrideAccess: true,
    });
    return { action: 'update' as UpsertAction, doc };
  }

  const doc = await payload.create({
    collection: 'projects',
    data,
    overrideAccess: true,
  });

  return { action: 'create' as UpsertAction, doc };
}

function getMode() {
  const writeEnabled = process.argv.includes('--write');
  return (writeEnabled ? 'write' : 'dry-run') satisfies ImportMode;
}

async function runDryRun(plans: ProjectImportPlan[]) {
  console.log('Collections: projects, technologies, categories, media');
  console.log(`Records found: ${plans.length}`);

  for (const plan of plans) {
    console.log(
      `- ${plan.action}: projects/${plan.slug} (${plan.title}) ` +
        `technologies=[${plan.technologies.join(', ')}] ` +
        `category=${plan.category ?? 'none'} ` +
        `hero=${plan.heroImagePath ?? 'none'} ` +
        `thumbnail=${plan.thumbnailImagePath ?? 'none'}`,
    );
  }
}

async function runWrite(plans: ProjectImportPlan[]) {
  if (process.env.ALLOW_PRODUCTION_IMPORT !== 'true') {
    throw new Error(
      'Write mode requires ALLOW_PRODUCTION_IMPORT=true to prevent accidental production writes.',
    );
  }

  const payload = await getPayload();
  const summary = {
    categories: { create: 0, reuse: 0, update: 0 },
    media: { create: 0, reuse: 0, update: 0 },
    projects: { create: 0, reuse: 0, update: 0 },
    technologies: { create: 0, reuse: 0, update: 0 },
  };

  for (const plan of plans) {
    const categoryIds: number[] = [];
    const technologyIds: number[] = [];

    if (plan.category) {
      const { action, doc } = await upsertCategory(payload, plan.category);
      summary.categories[action] += 1;
      categoryIds.push(Number(doc.id));
    }

    for (const technology of plan.technologies) {
      const { action, doc } = await upsertTechnology(payload, technology);
      summary.technologies[action] += 1;
      technologyIds.push(Number(doc.id));
    }

    const hero = plan.heroImagePath
      ? await upsertMedia(
          payload,
          plan.heroImagePath,
          `${plan.title} hero image`,
        )
      : undefined;
    if (hero) summary.media[hero.action] += 1;

    const thumbnail = plan.thumbnailImagePath
      ? await upsertMedia(
          payload,
          plan.thumbnailImagePath,
          `${plan.title} thumbnail image`,
        )
      : undefined;
    if (thumbnail) summary.media[thumbnail.action] += 1;

    const { action } = await upsertProject(
      payload,
      plan,
      categoryIds,
      technologyIds,
      hero ? Number(hero.doc.id) : undefined,
      thumbnail ? Number(thumbnail.doc.id) : undefined,
    );
    summary.projects[action] += 1;

    console.log(`${action}: projects/${plan.slug} (${plan.title})`);
  }

  console.log('Import summary:');
  console.log(JSON.stringify(summary, null, 2));
}

async function main() {
  const mode = getMode();
  const source = await fs.readFile(sourcePath, 'utf8');
  const plans = extractProjectObjects(source).map(toImportPlan);

  console.log(`Target environment: ${process.env.NODE_ENV ?? 'development'}`);
  console.log(`Mode: ${mode}`);
  console.log(`Source: ${sourcePath}`);

  if (mode === 'dry-run') {
    await runDryRun(plans);
    return;
  }

  await runWrite(plans);
}

void main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
