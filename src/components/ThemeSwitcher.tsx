'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          className='border-none outline-none focus-visible:ring-0'
        >
          <HiSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-secondary transition-all dark:-rotate-90 dark:scale-0' />
          <HiMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-secondary transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='space-y-1 border-none bg-white p-2 text-base shadow-lg backdrop-blur-lg dark:bg-black'
      >
        {themes.map((theme, themeIdx) => (
          <DropdownMenuItem
            key={themeIdx}
            className='cursor-pointer rounded-md px-4 py-2 hover:bg-neutral-200/50 hover:dark:bg-neutral-900'
            onClick={() => setTheme(`${theme.id}`)}
          >
            {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const themes = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];
