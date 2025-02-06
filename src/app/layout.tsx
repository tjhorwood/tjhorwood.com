import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | Taylor Horwood`,
    default: 'Taylor Horwood',
  },
  description: 'Personal Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark scrollbar-hide' suppressHydrationWarning>
      <body
        className={`${inter.className} w-full bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-900 dark:text-white`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='mx-auto max-w-(--breakpoint-2xl) px-6 pt-8 pb-24 md:px-6 md:pt-12 md:pb-44'>
            <main className='grow'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
