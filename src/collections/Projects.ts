import type { CollectionConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';
import { publishedOrEditors } from '../access/publishedOrEditors.ts';

export const Projects: CollectionConfig = {
  access: {
    create: editorsOrAdmins,
    delete: editorsOrAdmins,
    read: publishedOrEditors,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: [
      'title',
      'projectType',
      'lifecycle',
      'featured',
      'updatedAt',
    ],
    livePreview: {
      url: ({ data }) => `/projects/${data?.slug ?? ''}`,
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      index: true,
      name: 'slug',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      name: 'summary',
      required: true,
      type: 'textarea',
    },
    {
      defaultValue: 'active',
      name: 'lifecycle',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Archived', value: 'archived' },
        { label: 'Concept', value: 'concept' },
      ],
      type: 'select',
    },
    {
      defaultValue: 'web',
      name: 'projectType',
      options: [
        { label: 'Web', value: 'web' },
        { label: 'Application', value: 'application' },
        { label: 'Homelab', value: 'homelab' },
        { label: 'Open Source', value: 'open-source' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      type: 'select',
    },
    {
      defaultValue: false,
      name: 'featured',
      type: 'checkbox',
    },
    {
      defaultValue: 0,
      name: 'featuredOrder',
      type: 'number',
    },
    {
      defaultValue: 'public',
      name: 'visibility',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Unlisted', value: 'unlisted' },
        { label: 'Private', value: 'private' },
      ],
      required: true,
      type: 'select',
    },
    {
      name: 'heroImage',
      relationTo: 'media',
      type: 'upload',
    },
    {
      name: 'thumbnailImage',
      relationTo: 'media',
      type: 'upload',
    },
    {
      fields: [
        {
          name: 'image',
          relationTo: 'media',
          required: true,
          type: 'upload',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
      name: 'screenshots',
      type: 'array',
    },
    {
      hasMany: true,
      name: 'technologies',
      relationTo: 'technologies',
      type: 'relationship',
    },
    {
      hasMany: true,
      name: 'categories',
      relationTo: 'categories',
      type: 'relationship',
    },
    {
      name: 'liveUrl',
      type: 'text',
    },
    {
      name: 'repositoryUrl',
      type: 'text',
    },
    {
      name: 'documentationUrl',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'problem',
      type: 'textarea',
    },
    {
      name: 'approach',
      type: 'textarea',
    },
    {
      name: 'results',
      type: 'textarea',
    },
    {
      name: 'richContent',
      type: 'richText',
    },
    {
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          relationTo: 'media',
          type: 'upload',
        },
      ],
      name: 'seo',
      type: 'group',
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      admin: {
        description:
          'Stable migration/import identifier, usually the repository slug.',
      },
      index: true,
      name: 'externalId',
      type: 'text',
      unique: true,
    },
    {
      admin: {
        description:
          'Original static source path used by migration/import scripts.',
        readOnly: true,
      },
      name: 'sourcePath',
      type: 'text',
    },
  ],
  slug: 'projects',
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 25,
  },
};
