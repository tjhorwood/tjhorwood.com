import type { CollectionConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const Categories: CollectionConfig = {
  access: {
    create: editorsOrAdmins,
    delete: editorsOrAdmins,
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: ['name', 'type', 'sortOrder', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      admin: {
        description:
          'Stable URL segment. Used by imports and public category pages.',
      },
      index: true,
      name: 'slug',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      defaultValue: 'project',
      name: 'type',
      options: [
        {
          label: 'Project',
          value: 'project',
        },
        {
          label: 'Post',
          value: 'post',
        },
        {
          label: 'Gear',
          value: 'gear',
        },
        {
          label: 'Homelab',
          value: 'homelab',
        },
        {
          label: 'General',
          value: 'general',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      defaultValue: 0,
      name: 'sortOrder',
      type: 'number',
    },
    {
      admin: {
        description: 'Stable migration/import identifier.',
      },
      index: true,
      name: 'externalId',
      type: 'text',
    },
  ],
  slug: 'categories',
};
