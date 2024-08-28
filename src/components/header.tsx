'use client';

import Link from '@/components/link';
import { useState } from 'react';

import { links } from '@/lib/data';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ThemeSwitcher } from '@/components/theme-switcher';
import NavLink from '@/components/nav-link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='relative top-0 z-20 bg-primary md:sticky'>
      <nav className='lg mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3'>
        <Link href='/' className='shrink-0 text-secondary cursor-pointer'>
          <Logo />
        </Link>
        <ul className='hidden items-center gap-1 md:flex'>
          {links.map((link) => (
            <li key={link.id}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="relative ml-auto md:hidden">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="border-none outline-none focus-visible:ring-0 flex items-center gap-1 rounded-lg p-1 text-secondary">
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
            <DropdownMenuContent align="end" className="dark:bg-black border-none space-y-1 bg-white p-2 text-base shadow-lg backdrop-blur-lg">
              {links.map((link, linkIdx) => (
                  <DropdownMenuItem 
                    key={linkIdx}
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer hover:bg-neutral-200/50 hover:dark:bg-neutral-900 rounded-md px-4 py-2"
                  >
                    <Link href={link.href} className='w-full'>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex h-8 w-8 items-center justify-center'>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
