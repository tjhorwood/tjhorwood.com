import Link from '@/components/Link';
import { HiChevronRight } from 'react-icons/hi';

export default function Breadcrumbs({ title }) {
  return (
    <>
      <nav className='mb-8 flex items-center space-x-1 text-sm text-neutral-900 dark:text-white'>
        <Link
          href='/projects'
          className='text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
        >
          Projects
        </Link>
        <HiChevronRight className='h-4 w-4' />
        <span className='font-medium text-neutral-900 dark:text-white'>
          {title}
        </span>
      </nav>
    </>
  );
}
