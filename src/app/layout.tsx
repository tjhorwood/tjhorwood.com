import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import '@/styles/globals.css';

import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';

const MatomoAnalytics = dynamic(() => import('@/components/MatomoAnalytics'), {
  ssr: false,
});

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
    <html lang='en'>
      <body
        className={`${inter.className} no-scrollbar w-full bg-primary text-primary antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='mx-auto max-w-screen-2xl px-6 pb-24 pt-8 md:px-6 md:pb-44 md:pt-12'>
            <main className='grow'>{children}</main>
          </div>
        </ThemeProvider>
        <Suspense fallback={null}>
          <MatomoAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
