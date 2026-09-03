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
    <html lang='en' className='scrollbar-hide' suppressHydrationWarning>
      <body className='min-w-0 overflow-x-hidden bg-background antialiased'>
        <Script
          id='matomo-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//matomo.tjhorwood.com/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '1']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
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
          <div className='mx-auto max-w-screen-2xl px-4 pt-10 pb-24 sm:px-6 md:pt-16 md:pb-40'>
            <main className='grow'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
