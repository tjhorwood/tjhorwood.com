'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

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
          className='cursor-pointer border-none outline-none hover:bg-neutral-200/50 focus-visible:ring-0 dark:hover:bg-neutral-800'
        >
          <LuSun className='size-5 scale-100 rotate-0 text-neutral-900 transition-all dark:scale-0 dark:-rotate-90 dark:text-white dark:hover:text-white' />
          <LuMoon className='absolute size-5 scale-0 rotate-90 text-neutral-900 transition-all dark:scale-100 dark:rotate-0 dark:text-white' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='space-y-1 border-none bg-neutral-50 p-2 text-base shadow-lg backdrop-blur-lg dark:bg-black'
      >
        {themes.map((theme, themeIdx) => (
          <DropdownMenuItem
            key={themeIdx}
            className='cursor-pointer rounded-md px-4 py-2 hover:bg-neutral-200/50 dark:bg-black dark:hover:bg-neutral-800'
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
