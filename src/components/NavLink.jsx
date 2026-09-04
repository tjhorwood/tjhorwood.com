'use client';

import cn from 'clsx';
import { usePathname } from 'next/navigation';

import Link from '@/components/Link';

export default function NavLink({ href, children }) {
  const pathname = `/${usePathname().split('/')[1]}`; // active paths on dynamic subpages
  const active = pathname === href;

  return (
    <Link
      className={cn(
        'cursor-pointer rounded-full px-3.5 py-2 uppercase tracking-[0.08em] transition-colors',
        active
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
