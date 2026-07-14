import type { GlobalConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const GearPage: GlobalConfig = {
  access: {
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    { defaultValue: 'Gear', name: 'title', required: true, type: 'text' },
    {
      fields: [{ name: 'content', required: true, type: 'text' }],
      name: 'introLines',
      type: 'array',
    },
    {
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', relationTo: 'media', type: 'upload' },
      ],
      name: 'seo',
      type: 'group',
    },
  ],
  slug: 'gear-page',
};
