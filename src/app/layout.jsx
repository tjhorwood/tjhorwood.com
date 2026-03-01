import Header from '@/components/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import Script from 'next/script';

const poppins = Poppins({
  display: 'swap', // Ensures text visibility during loading
  subsets: ['latin'],
  variable: '--font-poppins', // Optional: for CSS variables
  weight: ['400', '500', '600', '700', '800', '900'], // Example weights
});

export const metadata = {
  description: 'Personal Portfolio',
  title: {
    default: 'Taylor Horwood',
    template: `%s | Taylor Horwood`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scrollbar-hide'>
      <body className={`${poppins.className} w-full bg-background antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='mx-auto max-w-(--breakpoint-2xl) px-4 pt-8 pb-24 md:px-6 md:pt-12 md:pb-44'>
            <main className='grow'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
