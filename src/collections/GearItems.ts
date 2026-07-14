import type { CollectionConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const GearItems: CollectionConfig = {
  access: {
    create: editorsOrAdmins,
    delete: editorsOrAdmins,
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: [
      'name',
      'category',
      'recommended',
      'sortOrder',
      'updatedAt',
    ],
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', required: true, type: 'text' },
    { index: true, name: 'slug', required: true, type: 'text', unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', relationTo: 'media', type: 'upload' },
    {
      hasMany: true,
      name: 'categories',
      relationTo: 'categories',
      type: 'relationship',
    },
    {
      defaultValue: 'other',
      name: 'category',
      options: [
        { label: 'Desk', value: 'desk' },
        { label: 'Homelab', value: 'homelab' },
        { label: 'Development', value: 'development' },
        { label: 'Audio', value: 'audio' },
        { label: 'Camera', value: 'camera' },
        { label: 'Fitness', value: 'fitness' },
        { label: 'Everyday Carry', value: 'edc' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      type: 'select',
    },
    { name: 'affiliateUrl', type: 'text' },
    { name: 'productUrl', type: 'text' },
    { name: 'notes', type: 'textarea' },
    { defaultValue: true, name: 'owned', type: 'checkbox' },
    { defaultValue: false, name: 'recommended', type: 'checkbox' },
    { defaultValue: 0, name: 'sortOrder', type: 'number' },
    { index: true, name: 'externalId', type: 'text', unique: true },
  ],
  slug: 'gear-items',
};
