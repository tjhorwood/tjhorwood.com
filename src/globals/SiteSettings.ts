import type { GlobalConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const SiteSettings: GlobalConfig = {
  access: {
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    { name: 'siteName', required: true, type: 'text' },
    { name: 'defaultTitle', required: true, type: 'text' },
    { name: 'titleTemplate', type: 'text' },
    { name: 'defaultDescription', required: true, type: 'textarea' },
    { name: 'siteUrl', required: true, type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'favicon', relationTo: 'media', type: 'upload' },
    { name: 'defaultOgImage', relationTo: 'media', type: 'upload' },
    {
      fields: [
        { name: 'label', required: true, type: 'text' },
        { name: 'href', required: true, type: 'text' },
        { defaultValue: 0, name: 'sortOrder', type: 'number' },
      ],
      name: 'navLinks',
      type: 'array',
    },
    { name: 'footerText', type: 'text' },
  ],
  slug: 'site-settings',
};
