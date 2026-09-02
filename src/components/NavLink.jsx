import cn from 'clsx';
import { usePathname } from 'next/navigation';

import Link from '@/components/Link';

export default function NavLink({ href, children }) {
  const pathname = `/${usePathname().split('/')[1]}`; // active paths on dynamic subpages
  const active = pathname === href;

  return (
    <Link
      className={cn(
        'relative cursor-pointer rounded-md px-3 py-2 uppercase tracking-[0.08em] transition-colors',
        active
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
      href={href}
    >
      {children}
      {active && (
        <span className='absolute inset-x-3 -bottom-px h-px bg-brand' />
      )}
    </Link>
  );
}
