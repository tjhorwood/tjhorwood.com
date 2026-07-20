import Script from 'next/script';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { getMediaUrl } from '@/lib/media';
import { mediaAbsoluteUrl, normalizeSiteUrl } from '@/lib/seo';
import { getSiteSettings } from '@/payload/queries/getGlobals';
import '@/styles/globals.css';

export async function generateMetadata() {
  const settings = await getSiteSettings();

  const siteUrl = normalizeSiteUrl(settings.siteUrl);
  const title = settings.defaultTitle ?? 'Taylor Horwood';
  const description = settings.defaultDescription ?? 'Personal Portfolio';
  const defaultOgImage = mediaAbsoluteUrl(
    settings.defaultOgImage,
    '/api/payload/media/file/profile.webp',
    siteUrl,
  );

  return {
    alternates: { canonical: '/' },
    description,
    icons: {
      icon: getMediaUrl(
        settings.favicon,
        '/api/payload/media/file/favicon.ico',
      ),
    },
    metadataBase: new URL(siteUrl),
    openGraph: {
      description,
      images: defaultOgImage ? [{ url: defaultOgImage }] : undefined,
      siteName: settings.siteName ?? 'Taylor Horwood',
      title,
      type: 'website',
      url: siteUrl,
    },
    title: {
      default: title,
      template: settings.titleTemplate ?? '%s | Taylor Horwood',
    },
    twitter: {
      card: 'summary_large_image',
      description,
      images: defaultOgImage ? [defaultOgImage] : undefined,
      title,
    },
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();

  return (
    <html lang='en' className='scrollbar-hide'>
      <body className='w-full bg-background antialiased'>
        <Script
          src='https://tjhorwood.com/umami/script.js'
          data-website-id='650e4420-e452-4e9f-9fd2-d1bea2a318e8'
          data-host-url='https://tjhorwood.com/umami'
          strategy='afterInteractive'
        />
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
