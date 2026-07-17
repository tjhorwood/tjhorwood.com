import type { Block } from 'payload';

export const MarkdownTable: Block = {
  fields: [
    {
      name: 'headers',
      type: 'json',
    },
    {
      name: 'rows',
      type: 'json',
    },
  ],
  labels: {
    plural: 'Markdown tables',
    singular: 'Markdown table',
  },
  slug: 'MarkdownTable',
};
