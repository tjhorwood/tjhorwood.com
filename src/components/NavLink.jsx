import cn from 'clsx';
import { usePathname } from 'next/navigation';

import Link from '@/components/Link';

export default function NavLink({ href, children }) {
  const pathname = `/${usePathname().split('/')[1]}`; // active paths on dynamic subpages
  const active = pathname === href;

  return (
    <Link
      className={cn(
        'cursor-pointer rounded-lg px-4 py-2 hover:bg-secondary border hover:border-border',
        active ? 'bg-secondary border-border' : 'border-transparent',
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
