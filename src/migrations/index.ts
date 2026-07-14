import * as migration_20260713_191119 from './20260713_191119';
import * as migration_20260714_015051_s3_media_storage from './20260714_015051_s3_media_storage';

export const migrations = [
  {
    down: migration_20260713_191119.down,
    name: '20260713_191119',
    up: migration_20260713_191119.up,
  },
  {
    down: migration_20260714_015051_s3_media_storage.down,
    name: '20260714_015051_s3_media_storage',
    up: migration_20260714_015051_s3_media_storage.up,
  },
];
