import configPromise from '@payload-config';
import { getPayload as initPayload } from 'payload';

export const getPayload = () => initPayload({ config: configPromise });
