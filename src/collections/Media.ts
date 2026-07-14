import type { CollectionConfig } from 'payload';

import { editorsOrAdmins } from '../access/editors.ts';

export const Media: CollectionConfig = {
  access: {
    create: editorsOrAdmins,
    delete: editorsOrAdmins,
    read: () => true,
    update: editorsOrAdmins,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'mediaType', 'updatedAt'],
    useAsTitle: 'filename',
  },
  fields: [
    {
      admin: {
        description:
          'Required for images. Describe the content or purpose of the asset.',
      },
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'credit',
      type: 'text',
    },
    {
      defaultValue: 'image',
      name: 'mediaType',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Document', value: 'document' },
        { label: 'Icon', value: 'icon' },
        { label: 'Video', value: 'video' },
      ],
      required: true,
      type: 'select',
    },
    {
      admin: {
        description:
          'Original repository path used by migration/import scripts.',
        readOnly: true,
      },
      name: 'sourcePath',
      type: 'text',
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
  slug: 'media',
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
      },
      {
        name: 'card',
        width: 768,
      },
      {
        name: 'hero',
        width: 1440,
      },
      {
        crop: 'center',
        height: 630,
        name: 'og',
        width: 1200,
      },
    ],
    mimeTypes: [
      'image/avif',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ],
    staticDir: 'public/media',
  },
};
