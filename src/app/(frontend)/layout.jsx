import Header from '@/components/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { getMediaUrl } from '@/lib/media';
import { getSiteSettings } from '@/payload/queries/getGlobals';
import '@/styles/globals.css';

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return {
    description: settings.defaultDescription ?? 'Personal Portfolio',
    icons: {
      icon: getMediaUrl(
        settings.favicon,
        '/api/payload/media/file/favicon.ico',
      ),
    },
    title: {
      default: settings.defaultTitle ?? 'Taylor Horwood',
      template: settings.titleTemplate ?? '%s | Taylor Horwood',
    },
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();

  return (
    <html lang='en' className='scrollbar-hide'>
      <body className='w-full bg-background antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header
            links={(settings.navLinks ?? [])
              .toSorted((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
              .filter(({ href }) => href !== '/')}
          />
          <div className='mx-auto max-w-(--breakpoint-2xl) px-4 pt-8 pb-24 md:px-6 md:pt-12 md:pb-44'>
            <main className='grow'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
