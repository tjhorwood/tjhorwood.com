import { LuArrowUpRight } from 'react-icons/lu';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { getMediaUrl } from '@/lib/media';
import { primaryActionClass, secondaryActionClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default function Footer({ profile = {}, links = [] }) {
  const email = profile.email ?? 'contact@tjhorwood.com';
  const resumeUrl = getMediaUrl(profile.resume);
  const name = profile.name ?? 'Taylor Horwood';
  const year = new Date().getFullYear();

  const socialLinks = (profile.socialLinks ?? [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <footer className='mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-10 2xl:max-w-[84rem] 3xl:max-w-[90rem]'>
      <div className='surface-invert overflow-hidden rounded-3xl px-6 py-14 sm:px-10 md:px-14 md:py-20'>
        <div className='flex flex-col gap-10 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-xl'>
            <p className='font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground'>
              Let&apos;s talk
            </p>
            <h2 className='mt-4 text-headline font-semibold text-balance'>
              Let&apos;s build something reliable.
            </h2>
            <p className='mt-4 text-pretty leading-7 text-muted-foreground'>
              Infrastructure, reliability work, a website, or an automation — if
              it needs to run and keep running, I&apos;m happy to help.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <Link href={`mailto:${email}`} className={primaryActionClass}>
              Get in touch <LuArrowUpRight className='h-4 w-4' />
            </Link>
            {resumeUrl && (
              <a href={resumeUrl} download className={secondaryActionClass}>
                Resume
              </a>
            )}
          </div>
        </div>

        <div className='mt-14 flex flex-col gap-6 border-t border-border pt-8 text-sm sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-3 text-muted-foreground'>
            <Link href='/' className='text-primary-foreground'>
              <Logo />
            </Link>
            <span>
              © {year} {name}
            </span>
          </div>
          <nav className='flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
            {links.map(({ href, label, id }) => (
              <Link
                key={id ?? href}
                href={href}
                className='transition-colors hover:text-primary-foreground'
              >
                {label}
              </Link>
            ))}
            {socialLinks.map(({ href, name: linkName }) => (
              <Link
                key={linkName}
                href={href}
                className={cn(
                  'transition-colors hover:text-primary-foreground',
                )}
              >
                {linkName}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
