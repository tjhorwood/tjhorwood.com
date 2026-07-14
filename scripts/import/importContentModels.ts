import {
  databaseData,
  platformData,
  skillsData,
  socialsData,
  workplacesData,
} from '../../src/lib/data.js';
import { getPayload } from '../../src/payload/getPayload.ts';

const ABOUT_PARAGRAPHS = [
  "Hello world, I'm Taylor Horwood!",
  "I'm a DevOps/SRE engineer with a passion for solving complex problems and building reliable and scalable systems. I'm also a loving husband and father who loves spending time with my family, whether we're going on adventures, playing games, or just cuddling up on the couch watching a good movie. When I'm not spending time with my family, you'll find me outside hiking, biking, gaming, at the gym, or tinkering with technology.",
  "I'm also super passionate about technology outside of work. I have a homelab where I experiment with different software and hardware, and I also enjoy coding for fun.",
  'My hobbies have taught me valuable skills that are directly transferable to my work, such as:',
  "I'm a bit of a jack-of-all-trades, with a passion for outdoor activities, working on cars, creating things, and solving problems. I'm also a well-rounded individual with a wide range of interests, and I always bring a unique perspective and a can-do attitude to every task.",
];

const ABOUT_STRENGTHS = [
  {
    description:
      "I'm able to think critically and creatively to solve complex problems, both big and small.",
    label: 'Problem-solving',
  },
  {
    description:
      "I'm constantly learning new things and staying up-to-date on the latest technologies.",
    label: 'Learning agility',
  },
  {
    description:
      "I'm meticulous in my work and have a high degree of attention to detail.",
    label: 'Attention to detail',
  },
  {
    description:
      "I'm an effective communicator and team player, able to collaborate with others to achieve common goals.",
    label: 'Communication and teamwork',
  },
];

type Payload = Awaited<ReturnType<typeof getPayload>>;

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
    [
      'postgresql',
      'mysql',
      'mariadb',
      'sqlite',
      'redis',
      'mongodb',
      'graphql',
      'apollo graphql',
      'prisma',
    ].includes(normalized)
  ) {
    return 'database';
  }

  if (
    [
      'docker',
      'kubernetes',
      'terraform',
      'jenkins',
      'circleci',
      'prometheus',
      'grafana',
    ].includes(normalized)
  ) {
    return 'devops';
  }

  if (['aws', 'amazon web services'].includes(normalized)) return 'cloud';
  if (
    ['wordpress', 'webflow', 'payload', 'payload cms', 'directus cms'].includes(
      normalized,
    )
  )
    return 'cms';
  if (
    [
      'bash',
      'zsh',
      'git',
      'github',
      'gitlab',
      'jira',
      'confluence',
      'salesforce',
      'visual studio code',
      'vim',
    ].includes(normalized)
  )
    return 'tooling';
  if (['node.js', 'express', 'django', 'go', 'python'].includes(normalized))
    return 'backend';

  return 'frontend';
}

async function findMediaByFilename(payload: Payload, filename: string) {
  const result = await payload.find({
    collection: 'media',
    limit: 1,
    overrideAccess: true,
    where: { filename: { equals: filename } },
  });

  return result.docs[0] ?? null;
}

async function upsertTechnology(
  payload: Payload,
  item: { css?: string; name: string },
  displayGroup: 'databases' | 'platforms' | 'skills',
  sortOrder: number,
) {
  const slug = slugify(item.name);
  const data = {
    category: inferTechnologyCategory(item.name),
    colorClass: item.css,
    displayGroup,
    externalId: slug,
    featured: true,
    icon: item.name,
    name: item.name,
    proficiency: 'working' as const,
    shortName: item.name,
    slug,
    sortOrder,
  };

  const existing = await payload.find({
    collection: 'technologies',
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: 'technologies',
      data,
      id: existing.docs[0].id,
      overrideAccess: true,
    });
    return 'update';
  }

  await payload.create({
    collection: 'technologies',
    data,
    overrideAccess: true,
  });
  return 'create';
}

async function upsertWorkExperience(
  payload: Payload,
  item: (typeof workplacesData)[number],
  sortOrder: number,
) {
  const externalId = `${slugify(item.company)}-${slugify(item.title)}-${slugify(item.time ?? String(sortOrder))}`;
  const filename =
    typeof item.imageSrc === 'string'
      ? item.imageSrc.split('/').pop()
      : undefined;
  const logo = filename ? await findMediaByFilename(payload, filename) : null;
  const data = {
    company: item.company,
    externalId,
    link: item.link,
    logo: logo?.id,
    responsibilities:
      item.description?.map((entry) => ({ content: entry.content })) ?? [],
    sortOrder,
    time: item.time,
    title: item.title,
  };

  const existing = await payload.find({
    collection: 'work-experience',
    limit: 1,
    overrideAccess: true,
    where: { externalId: { equals: externalId } },
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: 'work-experience',
      data,
      id: existing.docs[0].id,
      overrideAccess: true,
    });
    return 'update';
  }

  await payload.create({
    collection: 'work-experience',
    data,
    overrideAccess: true,
  });
  return 'create';
}

async function run() {
  if (process.env.ALLOW_PRODUCTION_IMPORT !== 'true') {
    throw new Error(
      'Set ALLOW_PRODUCTION_IMPORT=true to write migrated content.',
    );
  }

  const payload = await getPayload();
  const profileImage = await findMediaByFilename(payload, 'profile.webp');
  const resume = await findMediaByFilename(payload, 'resume.pdf');
  const favicon = await findMediaByFilename(payload, 'favicon.ico');

  await payload.updateGlobal({
    data: {
      contactEmail: 'contact@tjhorwood.com',
      defaultDescription: 'Personal Portfolio',
      defaultTitle: 'Taylor Horwood',
      favicon: favicon?.id,
      footerText: `© ${new Date().getFullYear()} Taylor Horwood`,
      navLinks: [
        { href: '/', label: 'Home', sortOrder: 0 },
        { href: '/about', label: 'About', sortOrder: 1 },
        { href: '/projects', label: 'Projects', sortOrder: 2 },
        { href: '/blog', label: 'Blog', sortOrder: 3 },
        { href: '/gear', label: 'Gear', sortOrder: 4 },
      ],
      siteName: 'Taylor Horwood',
      siteUrl: 'https://tjhorwood.com',
      titleTemplate: '%s | Taylor Horwood',
    },
    slug: 'site-settings',
  });

  await payload.updateGlobal({
    data: {
      email: 'contact@tjhorwood.com',
      intro:
        "Hello world, my name is Taylor. I am a Site Reliability Engineer by day and full stack developer by night. I create flawless front-end experiences while taming DevOps challenges for seamless, dependable systems. Let's collaborate to transform your dream into digital magic, shaping a future where innovation meets unwavering reliability!",
      name: 'Taylor Horwood',
      profileImage: profileImage?.id,
      resume: resume?.id,
      rotatingTitles: ['Developer', 'Engineer', 'Tinkerer', 'Indie Hacker'].map(
        (label) => ({ label }),
      ),
      socialLinks: socialsData.map((social, index) => ({
        href: social.href,
        icon: social.name,
        name: social.name,
        sortOrder: index,
      })),
    },
    slug: 'profile',
  });

  await payload.updateGlobal({
    data: {
      intro: 'Just a quick glimpse.',
      paragraphs: ABOUT_PARAGRAPHS.map((content) => ({ content })),
      seo: { description: 'About Me', title: 'About' },
      strengths: ABOUT_STRENGTHS,
      title: 'About Me',
    },
    slug: 'about-page',
  });

  await payload.updateGlobal({
    data: {
      introLines: [
        { content: 'This is all gear I actually own and like.' },
        { content: 'Using the affiliate links help support my work.' },
      ],
      seo: { description: 'My Gear', title: 'Gear' },
      title: 'Gear',
    },
    slug: 'gear-page',
  });

  const summary = {
    technologies: { create: 0, update: 0 },
    work: { create: 0, update: 0 },
  };
  for (const [index, item] of skillsData.entries()) {
    summary.technologies[
      await upsertTechnology(payload, item, 'skills', index)
    ] += 1;
  }
  for (const [index, item] of platformData.entries()) {
    summary.technologies[
      await upsertTechnology(payload, item, 'platforms', index)
    ] += 1;
  }
  for (const [index, item] of databaseData.entries()) {
    summary.technologies[
      await upsertTechnology(payload, item, 'databases', index)
    ] += 1;
  }
  for (const [index, item] of workplacesData.entries()) {
    summary.work[await upsertWorkExperience(payload, item, index)] += 1;
  }

  console.log('Content migration summary:', JSON.stringify(summary));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
