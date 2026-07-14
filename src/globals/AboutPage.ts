import type { GlobalConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const AboutPage: GlobalConfig = {
  access: {
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    { defaultValue: 'About Me', name: 'title', required: true, type: 'text' },
    { defaultValue: 'Just a quick glimpse.', name: 'intro', type: 'text' },
    {
      fields: [{ name: 'content', required: true, type: 'textarea' }],
      name: 'paragraphs',
      type: 'array',
    },
    {
      fields: [
        { name: 'label', required: true, type: 'text' },
        { name: 'description', required: true, type: 'textarea' },
      ],
      name: 'strengths',
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
  slug: 'about-page',
};
