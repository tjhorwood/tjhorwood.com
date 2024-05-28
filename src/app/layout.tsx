import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import Script from 'next/script';

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
      <head>
        <Script defer src="https://umami.tjhorwood.com/script.js" data-website-id="41944f1f-525f-41e1-ac85-b745ca2b6d6b" />
      </head>
      <body
        className={`${inter.className} width-full no-scrollbar bg-primary text-primary antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='px-6 pb-24 pt-16 md:px-6 md:pb-44 md:pt-20'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
