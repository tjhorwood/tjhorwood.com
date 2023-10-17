import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiCheck, HiMoon, HiSun } from 'react-icons/hi';

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
              <Listbox.Button
                className={clsx(
                  'relative flex h-8 w-8 cursor-default items-center justify-center rounded-full focus:outline-none ',
                )}
              >
                {resolvedTheme === 'dark' ? (
                  <HiMoon className={iconClassName} />
                ) : (
                  <HiSun className={iconClassName} />
                )}
              </Listbox.Button>
              <AnimatePresence>
                {open && (
                  <Listbox.Options
                    as={motion.ul}
                    static
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.3 }}
                    className='w-42 absolute right-0 mt-2 max-h-60 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base shadow-lg backdrop-blur-lg focus:outline-none dark:bg-black sm:text-sm'
                  >
                    {themes.map((theme) => (
                      <Listbox.Option
                        key={theme.id}
                        className={({ active }) =>
                          clsx(
                            'relative cursor-default select-none rounded-md py-2 pl-10 pr-4',
                            active
                              ? 'bg-neutral-200/50 dark:bg-neutral-900'
                              : '',
                          )
                        }
                        value={theme.id}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {theme.label}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-50'>
                                <HiCheck
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </AnimatePresence>
            </div>
          );
        }}
      </Listbox>
    </>
  );
}
