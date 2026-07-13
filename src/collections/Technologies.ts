import type { CollectionConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const Technologies: CollectionConfig = {
  access: {
    create: editorsOrAdmins,
    delete: editorsOrAdmins,
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: ['name', 'category', 'featured', 'sortOrder'],
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
      index: true,
      name: 'slug',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      name: 'shortName',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'websiteUrl',
      type: 'text',
    },
    {
      name: 'documentationUrl',
      type: 'text',
    },
    {
      name: 'logo',
      relationTo: 'media',
      type: 'upload',
    },
    {
      admin: {
        description:
          'Optional icon identifier used by frontend icon mapping, e.g. SiNextdotjs.',
      },
      name: 'icon',
      type: 'text',
    },
    {
      defaultValue: 'frontend',
      name: 'category',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Database', value: 'database' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Cloud', value: 'cloud' },
        { label: 'CMS', value: 'cms' },
        { label: 'Tooling', value: 'tooling' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      type: 'select',
    },
    {
      defaultValue: 'working',
      name: 'proficiency',
      options: [
        { label: 'Learning', value: 'learning' },
        { label: 'Working', value: 'working' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
      type: 'select',
    },
    {
      defaultValue: false,
      name: 'featured',
      type: 'checkbox',
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
  slug: 'technologies',
};
