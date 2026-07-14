import type { CollectionConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';
import { publishedOrEditors } from '../access/publishedOrEditors.ts';

export const Posts: CollectionConfig = {
  access: {
    create: editorsOrAdmins,
    delete: editorsOrAdmins,
    read: publishedOrEditors,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: ['title', 'publishedAt', '_status', 'updatedAt'],
    livePreview: { url: ({ data }) => `/blog/${data?.slug ?? ''}` },
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', required: true, type: 'text' },
    { index: true, name: 'slug', required: true, type: 'text', unique: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'coverImage', relationTo: 'media', type: 'upload' },
    { name: 'content', type: 'richText' },
    {
      hasMany: true,
      name: 'categories',
      relationTo: 'categories',
      type: 'relationship',
    },
    {
      hasMany: true,
      name: 'tags',
      relationTo: 'technologies',
      type: 'relationship',
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
    { name: 'publishedAt', type: 'date' },
    {
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', relationTo: 'media', type: 'upload' },
      ],
      name: 'seo',
      type: 'group',
    },
    { index: true, name: 'externalId', type: 'text', unique: true },
  ],
  slug: 'posts',
  versions: { drafts: { autosave: true }, maxPerDoc: 25 },
};
