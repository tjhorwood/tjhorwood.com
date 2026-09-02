'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

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
      className='cursor-pointer border border-border bg-background hover:bg-secondary hover:border-foreground/30'
    >
      {resolvedTheme === 'dark' ? (
        <LuSun className='size-5' />
      ) : (
        <LuMoon className='size-5' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
