import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Categories } from './collections/Categories.ts';
import { Media } from './collections/Media.ts';
import { Projects } from './collections/Projects.ts';
import { Technologies } from './collections/Technologies.ts';
import { Users } from './collections/Users.ts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri =
  process.env.DATABASE_URI ??
  'postgres://payload:dev-only@localhost:5432/tjhorwood_payload';

const payloadSecret =
  process.env.PAYLOAD_SECRET ?? 'dev-only-change-me-before-production';

const s3Enabled =
  process.env.S3_ENABLED !== 'false' &&
  Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY,
  );

const s3Endpoint = process.env.S3_ENDPOINT ?? 'http://garage:3900';
const s3Region = process.env.S3_REGION ?? 'garage';
const s3Bucket = process.env.S3_BUCKET ?? 'tjhorwood-media';

const generatePayloadMediaURL = ({ filename }: { filename: string }) =>
  `/api/payload/media/file/${encodeURIComponent(filename)}`;

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Taylor Horwood CMS',
    },
    user: Users.slug,
  },
  collections: [Users, Media, Categories, Technologies, Projects],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  editor: lexicalEditor({}),
  plugins: [
    s3Storage({
      bucket: s3Bucket,
      collections: {
        media: {
          generateFileURL: generatePayloadMediaURL,
          prefix: 'media',
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
        endpoint: s3Endpoint,
        forcePathStyle: true,
        region: s3Region,
      },
      enabled: s3Enabled,
    }),
  ],
  routes: {
    admin: '/admin',
    api: '/api/payload',
  },
  secret: payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
