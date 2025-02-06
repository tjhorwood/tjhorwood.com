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
        'cursor-pointer rounded-lg px-4 py-2 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white',
        active
          ? 'bg-neutral-200/50 text-neutral-900 dark:bg-neutral-800 dark:text-white'
          : 'text-neutral-900 dark:text-neutral-300',
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
