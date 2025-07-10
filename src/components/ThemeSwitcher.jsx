'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { CgDarkMode } from 'react-icons/cg';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    // If the resolved theme is dark, switch to light, otherwise switch to dark
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      variant='secondary'
      size='icon'
      className='cursor-pointer border-transparent border hover:border-border bg-background hover:bg-secondary'
    >
      <CgDarkMode className='size-6' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
