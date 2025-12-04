import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'], // Example weights
  subsets: ['latin'],
  display: 'swap', // Ensures text visibility during loading
  variable: '--font-poppins', // Optional: for CSS variables
});

export const metadata = {
  title: {
    template: `%s | Taylor Horwood`,
    default: 'Taylor Horwood',
  },
  description: 'Personal Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scrollbar-hide'>
      <script defer src="https://umami.tjhorwood.com/script.js" data-website-id="c76f34d7-e416-4bc5-b7db-c8050da3a9ad"></script>
      <body className={`${poppins.className} w-full bg-background antialiased`}>
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
