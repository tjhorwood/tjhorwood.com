'use client';

import Link from '@/components/Link';
import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LuAlignJustify, LuX } from 'react-icons/lu';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const links = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'gear', label: 'Gear', href: '/gear' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null); // Create a ref for the header element

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      className='relative top-0 z-20 mx-auto h-18 max-w-screen-3xl bg-background md:sticky'
    >
      <nav className='mx-auto flex h-full items-center justify-between gap-3 px-4 py-3'>
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
        <div className='absolute right-0 w-1/2 bg-background md:hidden rounded-b-md shadow-lg'>
          <div className='flex flex-col items-center gap-2 p-4'>
            {links.map(({ id, href, label }) => (
              <Link
                key={id}
                href={href}
                className='w-full'
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant='default'
                  size='lg'
                  className='justify-start w-full bg-secondary hover:bg-secondary/80 text-primary cursor-pointer border-border border'
                >
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
