import type { CollectionConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const WorkExperience: CollectionConfig = {
  access: {
    create: editorsOrAdmins,
    delete: editorsOrAdmins,
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: ['title', 'company', 'time', 'sortOrder', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', required: true, type: 'text' },
    { name: 'company', required: true, type: 'text' },
    { name: 'time', type: 'text' },
    { name: 'link', type: 'text' },
    { name: 'logo', relationTo: 'media', type: 'upload' },
    {
      fields: [{ name: 'content', required: true, type: 'textarea' }],
      name: 'responsibilities',
      type: 'array',
    },
    { defaultValue: 0, name: 'sortOrder', type: 'number' },
    { index: true, name: 'externalId', type: 'text', unique: true },
  ],
  slug: 'work-experience',
};
