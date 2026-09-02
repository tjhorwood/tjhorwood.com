import { HiChevronRight } from 'react-icons/hi';
import Link from '@/components/Link';

export default function Breadcrumbs({
  parentHref = '/projects',
  parentLabel = 'Projects',
  title,
}) {
  return (
    <nav className='mb-8 flex items-center space-x-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground'>
      <Link
        href={parentHref}
        className='transition-colors hover:text-foreground'
      >
        {parentLabel}
      </Link>
      <HiChevronRight className='h-3.5 w-3.5' />
      <span className='text-foreground'>{title}</span>
    </nav>
  );
}
