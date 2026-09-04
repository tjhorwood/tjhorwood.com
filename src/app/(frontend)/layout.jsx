import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import RefreshRouteOnSave from '@/components/RefreshRouteOnSave';
import { getMediaUrl } from '@/lib/media';
import { mediaAbsoluteUrl, normalizeSiteUrl } from '@/lib/seo';
import { getProfile, getSiteSettings } from '@/payload/queries/getGlobals';
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
  const [settings, profile] = await Promise.all([
    getSiteSettings(),
    getProfile(),
  ]);

  const navLinks = (settings.navLinks ?? [])
    .toSorted((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .filter(({ href }) => href !== '/');

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
        <RefreshRouteOnSave />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header links={navLinks} email={profile.email} />
          <div className='mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6 md:pt-16 md:pb-28 lg:px-10 2xl:max-w-[84rem] 3xl:max-w-[90rem]'>
            <main className='grow'>{children}</main>
          </div>
          <Footer profile={profile} links={navLinks} />
        </ThemeProvider>
      </body>
    </html>
  );
}
