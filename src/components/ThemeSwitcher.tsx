import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const themes = [
  { id: 'system', label: 'Automatic' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Listbox value={theme} onChange={(value) => setTheme(value)}>
        {({ open }) => {
          const iconClassName = clsx(
            'h-5 w-5 transition-colors dark:hover:text-neutral-50',
            open ? 'dark:text-neutral-50' : 'text-secondary',
          );
          return (
            <div className='relative'>
              <ListboxButton
                className={clsx(
                  'relative flex h-8 w-8 cursor-default items-center justify-center rounded-full focus:outline-none',
                )}
              >
                {resolvedTheme === 'dark' ? (
                  <HiMoon className={iconClassName} />
                ) : (
                  <HiSun className={iconClassName} />
                )}
              </ListboxButton>
              <AnimatePresence>
                {open && (
                  <ListboxOptions
                    as={motion.ul}
                    static
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition
                    className='absolute right-0 mt-2 max-h-60 w-36 origin-top-right space-y-1 overflow-auto rounded-xl bg-white p-2 text-base shadow-lg backdrop-blur-lg focus:outline-none dark:bg-black sm:text-sm'
                  >
                    {themes.map((theme) => (
                      <ListboxOption
                        key={theme.id}
                        className={({ active, selected }) =>
                          clsx(
                            'relative w-full cursor-pointer select-none rounded-md px-4 py-2',
                            active
                              ? 'bg-neutral-200/50 dark:bg-neutral-900'
                              : '',
                            selected
                              ? 'bg-neutral-200/50 dark:bg-neutral-900'
                              : '',
                          )
                        }
                        value={theme.id}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`relative w-full ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {theme.label}
                            </span>
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                )}
              </AnimatePresence>
            </div>
          );
        }}
      </Listbox>
    </>
  );
}
