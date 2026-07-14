import type { Access } from 'payload';

export const editorsOrAdmins: Access = ({ req: { user } }) => {
  const role = (user as { role?: string } | null | undefined)?.role;

  return role === 'admin' || role === 'editor';
};
