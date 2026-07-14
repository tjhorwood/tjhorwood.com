import type { GlobalConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const Profile: GlobalConfig = {
  access: {
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    { name: 'name', required: true, type: 'text' },
    { name: 'headline', type: 'text' },
    {
      fields: [{ name: 'label', required: true, type: 'text' }],
      name: 'rotatingTitles',
      type: 'array',
    },
    { name: 'intro', required: true, type: 'textarea' },
    { name: 'profileImage', relationTo: 'media', type: 'upload' },
    { name: 'resume', relationTo: 'media', type: 'upload' },
    { name: 'email', type: 'email' },
    {
      fields: [
        { name: 'name', required: true, type: 'text' },
        { name: 'href', required: true, type: 'text' },
        {
          admin: { description: 'Frontend icon key, e.g. GitHub or LinkedIn.' },
          name: 'icon',
          type: 'text',
        },
        { defaultValue: 0, name: 'sortOrder', type: 'number' },
      ],
      name: 'socialLinks',
      type: 'array',
    },
  ],
  slug: 'profile',
};
