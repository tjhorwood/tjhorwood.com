import { Metadata } from 'next';

import Link from '@/components/ui/Link';

export const metadata: Metadata = {
  title: '404',
  description: 'Uh oh! This page does not exist',
};

const Custom404 = (): JSX.Element => (
  <div className='mx-auto flex max-w-4xl flex-col gap-2'>
    <h1>404 - Page not found</h1>
    <p className='text-secondary'>
      Uh oh! This page does not exists, maybe you clicked an old link or
      misspelled. Please try again…
    </p>
    <div className='h-2' />
    <Link href='/' underline>
      Return home
    </Link>
  </div>
);

export default Custom404;
