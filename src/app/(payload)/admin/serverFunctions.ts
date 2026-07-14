'use server';

import configPromise from '@payload-config';
import { handleServerFunctions } from '@payloadcms/next/layouts';

import { importMap } from './importMap.js';

export const serverFunction = async (args) =>
  handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
