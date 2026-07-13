import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
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
  'postgres://payload:payload_dev_password@localhost:5432/tjhorwood_payload';

const payloadSecret =
  process.env.PAYLOAD_SECRET ?? 'dev-only-change-me-before-production';

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
