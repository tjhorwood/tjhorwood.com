import * as migration_20260713_191119 from './20260713_191119';

export const migrations = [
  {
    down: migration_20260713_191119.down,
    name: '20260713_191119',
    up: migration_20260713_191119.up,
  },
];
