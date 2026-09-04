'use client';

import { useEffect, useRef, useState } from 'react';
import { LuAlignJustify, LuArrowUpRight, LuX } from 'react-icons/lu';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { primaryActionClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

export const defaultLinks = [
  { href: '/about', id: 'about', label: 'About' },
  { href: '/projects', id: 'projects', label: 'Projects' },
  { href: '/blog', id: 'blog', label: 'Blog' },
  { href: '/gear', id: 'gear', label: 'Gear' },
];

export default function Header({
  links = defaultLinks,
  email = 'contact@tjhorwood.com',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className='sticky top-0 z-20 mx-auto w-full border-border border-b bg-background/70 backdrop-blur-md'
    >
      <nav className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:px-6 md:h-18 lg:px-10 2xl:max-w-[84rem] 3xl:max-w-[90rem]'>
        <Link
          href='/'
          className='shrink-0 cursor-pointer text-primary'
          onClick={() => setIsOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <ul className='hidden items-center gap-0.5 font-mono text-[0.8rem] md:flex'>
          {links.map(({ id, href, label }) => (
            <li key={id}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <Link
            href={`mailto:${email}`}
            className={cn(primaryActionClass, 'hidden h-10 md:inline-flex')}
          >
            Get in touch <LuArrowUpRight className='h-4 w-4' />
          </Link>
          <div className='relative md:hidden'>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleMenu}
              className='z-50'
            >
              {isOpen ? (
                <LuX className='size-6' />
              ) : (
                <LuAlignJustify className='size-6' />
              )}
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute inset-x-4 top-full rounded-3xl border border-border bg-card p-2 md:hidden'>
          <div className='flex flex-col items-stretch gap-1.5 font-mono text-sm'>
            {links.map(({ id, href, label }) => (
              <Link
                key={id}
                href={href}
                onClick={() => setIsOpen(false)}
                className='flex h-12 w-full items-center rounded-2xl border border-border bg-background px-4 text-foreground uppercase tracking-[0.08em] transition-colors hover:border-foreground/30'
              >
                {label}
              </Link>
            ))}
            <Link
              href={`mailto:${email}`}
              onClick={() => setIsOpen(false)}
              className={cn(primaryActionClass, 'mt-1 h-12 w-full rounded-2xl')}
            >
              Get in touch <LuArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
