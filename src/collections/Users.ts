import type { CollectionConfig } from 'payload';

import { admins } from '../access/admins.ts';
import { editorsOrAdmins } from '../access/editors.ts';

export const Users: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: editorsOrAdmins,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
    },
    {
      access: {
        create: ({ req: { user } }) =>
          Boolean(user && (user as { role?: string }).role === 'admin'),
        update: ({ req: { user } }) =>
          Boolean(user && (user as { role?: string }).role === 'admin'),
      },
      defaultValue: 'editor',
      name: 'role',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      name: 'avatar',
      relationTo: 'media',
      type: 'upload',
    },
    {
      name: 'jobTitle',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      fields: [
        {
          name: 'label',
          required: true,
          type: 'text',
        },
        {
          name: 'provider',
          type: 'text',
        },
        {
          name: 'url',
          required: true,
          type: 'text',
        },
      ],
      name: 'socialLinks',
      type: 'array',
    },
  ],
  slug: 'users',
};
