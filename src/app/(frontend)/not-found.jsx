import { LuArrowLeft } from 'react-icons/lu';
import Eyebrow from '@/components/Eyebrow';
import Link from '@/components/Link';
import { primaryActionClass } from '@/lib/styles';

export const metadata = {
  description: 'Uh oh! This page does not exist',
  title: '404',
};

const Custom404 = () => (
  <div className='mx-auto flex min-h-[50vh] max-w-2xl flex-col justify-center gap-6'>
    <Eyebrow>Error 404</Eyebrow>
    <h1 className='text-display font-semibold'>Page not found.</h1>
    <p className='text-pretty text-lg leading-8 text-muted-foreground'>
      This page does not exist &mdash; maybe you followed an old link or
      mistyped the address. Let&apos;s get you back on track.
    </p>
    <div>
      <Link href='/' className={primaryActionClass}>
        <LuArrowLeft className='h-4 w-4' /> Return home
      </Link>
    </div>
  </div>
);

export default Custom404;
