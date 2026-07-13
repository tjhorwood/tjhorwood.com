import type { Access } from 'payload';

export const admins: Access = ({ req: { user } }) => {
  return Boolean(user && (user as { role?: string }).role === 'admin');
};
