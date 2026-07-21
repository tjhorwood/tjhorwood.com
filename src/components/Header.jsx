'use client';

import { useEffect, useRef, useState } from 'react';
import { LuAlignJustify, LuX } from 'react-icons/lu';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { interactiveSurfaceClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

export const defaultLinks = [
  { href: '/about', id: 'about', label: 'About' },
  { href: '/projects', id: 'projects', label: 'Projects' },
  { href: '/blog', id: 'blog', label: 'Blog' },
  { href: '/gear', id: 'gear', label: 'Gear' },
];

export default function Header({ links = defaultLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null); // Create a ref for the header element

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

    // Add event listener when the menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Re-run effect when isOpen changes

  return (
    <header
      ref={headerRef}
      className='sticky top-0 z-20 mx-auto h-16 max-w-screen-3xl border-border border-b bg-background/95 backdrop-blur md:h-18'
    >
      <nav className='mx-auto flex h-full items-center justify-between gap-2 px-3 py-2 sm:px-4 md:py-3'>
        <Link
          href='/'
          className='shrink-0 cursor-pointer text-primary'
          onClick={() => setIsOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <ul className='hidden items-center gap-1 md:flex'>
          {links.map(({ id, href, label }) => (
            <li key={id}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>

        <div className='flex h-8 w-8 items-center justify-center ml-auto md:ml-0'>
          <ThemeSwitcher />
        </div>
        <div className='relative md:hidden'>
          <Button variant='ghost' onClick={toggleMenu} className='z-50'>
            {isOpen ? (
              <LuX className='size-6' />
            ) : (
              <LuAlignJustify className='size-6' />
            )}
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute inset-x-3 top-full rounded-2xl border border-border bg-background p-2 shadow-xl md:hidden'>
          <div className='flex flex-col items-stretch gap-2'>
            {links.map(({ id, href, label }) => (
              <Button
                key={id}
                asChild
                variant='default'
                size='lg'
                className={cn(
                  'h-12 w-full justify-start rounded-xl text-primary',
                  interactiveSurfaceClass,
                )}
              >
                <Link
                  href={href}
                  className='w-full'
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
