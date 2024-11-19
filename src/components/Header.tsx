'use client';

import { useState } from 'react';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const links = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'gear', label: 'Gear', href: '/gear' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='h-18 relative top-0 z-20 mx-auto max-w-screen-3xl bg-primary md:sticky'>
      <nav className='mx-auto flex h-full items-center justify-between gap-3 px-4 py-3'>
        <Link href='/' className='shrink-0 cursor-pointer text-secondary'>
          <Logo />
        </Link>
        <ul className='hidden items-center gap-1 md:flex'>
          {links.map(({ id, href, label }) => (
            <li key={id}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild className='relative ml-auto md:hidden'>
            <Button className='flex items-center gap-1 rounded-lg border-none p-1 text-secondary outline-none focus-visible:ring-0'>
              Menu
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='h-5 w-5'
              >
                <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='space-y-1 border-none bg-white p-2 text-base shadow-lg backdrop-blur-lg dark:bg-black'
          >
            {links.map(({ href, label }, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setIsOpen(false)}
                className='cursor-pointer rounded-md px-4 py-2 hover:bg-neutral-200/50 hover:dark:bg-neutral-900'
              >
                <Link href={href} className='w-full'>
                  {label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='flex h-8 w-8 items-center justify-center'>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
