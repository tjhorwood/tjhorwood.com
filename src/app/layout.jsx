import '@/styles/globals.css';

import { Inter } from 'next/font/google';

import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';
import { AOSInitializer } from '@/components/AOSInitializer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: `%s | Taylor Horwood`,
    default: 'Taylor Horwood',
  },
  description: 'Personal Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark scrollbar-hide' suppressHydrationWarning>
      <body
        className={`${inter.className} w-full bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-900 dark:text-white`}
      >
        <AOSInitializer />
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
