import cn from 'clsx';
import Link from '@/components/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

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
        'rounded-lg px-4 py-2 hover:text-primary cursor-pointer',
        active ? 'bg-tertiary text-primary' : 'text-secondary',
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
