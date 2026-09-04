import Link from 'next/link';
import '@/styles/globals.css';

export const metadata = {
  description: 'This page does not exist.',
  title: '404',
};

// Root not-found: rendered for unmatched top-level routes, outside the
// (frontend) route group, so it brings its own document shell.
export default function RootNotFound() {
  return (
    <html lang='en'>
      <body className='bg-background text-foreground antialiased'>
        <main className='mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6'>
          <p className='font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground'>
            Error 404
          </p>
          <h1 className='text-balance text-5xl font-semibold tracking-tightest sm:text-6xl'>
            Page not found.
          </h1>
          <p className='text-pretty leading-7 text-muted-foreground'>
            This page does not exist &mdash; maybe you followed an old link or
            mistyped the address.
          </p>
          <div>
            <Link
              href='/'
              className='inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground no-underline transition hover:bg-primary/90'
            >
              Return home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
