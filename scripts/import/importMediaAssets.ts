import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getPayload } from '../../src/payload/getPayload.ts';

type MediaType = 'document' | 'icon' | 'image' | 'video';
type UpsertAction = 'create' | 'update';

const repositoryRoot = process.cwd();

const assets: Array<{
  alt?: string;
  externalId?: string;
  mediaType: MediaType;
  sourcePath: string;
}> = [
  {
    alt: 'Website favicon',
    mediaType: 'icon',
    sourcePath: 'public/favicon.ico',
  },
  {
    alt: 'Current resume PDF',
    mediaType: 'document',
    sourcePath: 'public/resume.pdf',
  },
  {
    alt: 'Amtrak logo',
    mediaType: 'icon',
    sourcePath: 'src/assets/images/amtrak.webp',
  },
  {
    alt: 'CapForge thumbnail image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/capforge-short.webp',
  },
  {
    alt: 'CapForge hero image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/capforge.webp',
  },
  {
    alt: 'Citi logo',
    mediaType: 'icon',
    sourcePath: 'src/assets/images/citi.webp',
  },
  {
    alt: 'CorpComment image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/corpcomment.webp',
  },
  {
    alt: 'CRF Health logo',
    mediaType: 'icon',
    sourcePath: 'src/assets/images/crfhealth.webp',
  },
  {
    alt: 'Health Sync about screen',
    mediaType: 'image',
    sourcePath: 'src/assets/images/healthsync/healthsync-about.webp',
  },
  {
    alt: 'Health Sync contact screen',
    mediaType: 'image',
    sourcePath: 'src/assets/images/healthsync/healthsync-contact.webp',
  },
  {
    alt: 'Health Sync home screen',
    mediaType: 'image',
    sourcePath: 'src/assets/images/healthsync/healthsync-home.webp',
  },
  {
    alt: 'Health Sync thumbnail image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/healthsync/healthsync-short.webp',
  },
  {
    alt: 'Health Sync thumbnail image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/healthsync/healthsync-thumbnail.webp',
  },
  {
    alt: 'Health Sync hero image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/healthsync/healthsync.webp',
  },
  {
    alt: 'National League Gaming contact screen',
    mediaType: 'image',
    sourcePath: 'src/assets/images/nlg/nlg-contact.webp',
  },
  {
    alt: 'National League Gaming gym screen',
    mediaType: 'image',
    sourcePath: 'src/assets/images/nlg/nlg-gym.webp',
  },
  {
    alt: 'National League Gaming home screen',
    mediaType: 'image',
    sourcePath: 'src/assets/images/nlg/nlg-home.webp',
  },
  {
    alt: 'National League Gaming leaderboard screen',
    mediaType: 'image',
    sourcePath: 'src/assets/images/nlg/nlg-leaderboard.webp',
  },
  {
    alt: 'National League Gaming thumbnail image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/nlg/nlg-short.webp',
  },
  {
    alt: 'National League Gaming thumbnail image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/nlg/nlg-thumbnail.webp',
  },
  {
    alt: 'National League Gaming hero image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/nlg/nlg.webp',
  },
  {
    alt: 'Taylor Horwood profile picture',
    mediaType: 'image',
    sourcePath: 'src/assets/images/profile-pic.webp',
  },
  {
    alt: 'Taylor Horwood profile picture',
    mediaType: 'image',
    sourcePath: 'src/assets/images/profile.webp',
  },
  {
    alt: 'Sahu Studio thumbnail image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/sahustudio/sahustudio-short.webp',
  },
  {
    alt: 'Sahu Studio hero image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/sahustudio/sahustudio.webp',
  },
  {
    alt: 'StandardCBD thumbnail image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/standardcbd-short.webp',
  },
  {
    alt: 'StandardCBD hero image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/standardcbd.webp',
  },
  {
    alt: 'Syapse logo',
    mediaType: 'icon',
    sourcePath: 'src/assets/images/syapse.webp',
  },
  {
    alt: 'Terplandia image',
    mediaType: 'image',
    sourcePath: 'src/assets/images/terplandia.webp',
  },
];

async function findByExternalId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  externalId: string,
) {
  const result = await payload.find({
    collection: 'media',
    limit: 1,
    overrideAccess: true,
    where: { externalId: { equals: externalId } },
  });
  return result.docs[0] ?? null;
}

async function upsertAsset(
  payload: Awaited<ReturnType<typeof getPayload>>,
  asset: (typeof assets)[number],
) {
  const externalId = asset.externalId ?? asset.sourcePath;
  const absolutePath = path.join(repositoryRoot, asset.sourcePath);
  const data = {
    alt: asset.alt,
    externalId,
    mediaType: asset.mediaType,
    sourcePath: asset.sourcePath,
  };

  const existing = await findByExternalId(payload, externalId);
  if (existing) {
    const doc = await payload.update({
      collection: 'media',
      data,
      id: existing.id,
      overrideAccess: true,
    });
    return { action: 'update' as UpsertAction, doc };
  }

  await fs.access(absolutePath);
  const doc = await payload.create({
    collection: 'media',
    data,
    filePath: absolutePath,
    overrideAccess: true,
  });
  return { action: 'create' as UpsertAction, doc };
}

async function main() {
  if (process.env.ALLOW_PRODUCTION_IMPORT !== 'true') {
    throw new Error('Set ALLOW_PRODUCTION_IMPORT=true to write media assets.');
  }

  const payload = await getPayload();
  const summary = { create: 0, update: 0 };

  for (const asset of assets) {
    const { action, doc } = await upsertAsset(payload, asset);
    summary[action] += 1;
    console.log(`${action}: ${asset.sourcePath} -> ${doc.url ?? doc.filename}`);
  }

  console.log('Media import summary:', JSON.stringify(summary));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
