import cn from 'clsx';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import Link from '@/components/Link';

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = `/${usePathname().split('/')[1]}`; // active paths on dynamic subpages
  const active = pathname === href;

  return (
    <Link
      className={cn(
        'cursor-pointer rounded-lg px-4 py-2 hover:text-primary',
        active ? 'bg-tertiary text-primary' : 'text-secondary',
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
