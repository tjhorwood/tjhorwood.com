import type { Access } from 'payload';

export const publishedOrEditors: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    and: [
      {
        _status: {
          equals: 'published',
        },
      },
      {
        visibility: {
          equals: 'public',
        },
      },
    ],
  };
};
