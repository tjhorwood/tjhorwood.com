'use client';

import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { links } from '@/lib/data';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import NavLink from '@/components/ui/NavLink';

export default function Header() {
  const pathname = `/${usePathname().split('/')[1]}`; // active paths on dynamic subpages

  return (
    <header className='relative top-0 z-20 bg-primary md:sticky'>
      <nav className='lg mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 md:px-6'>
        <Link href='/' className='shrink-0 text-secondary'>
          <svg
            version='1.2'
            xmlns='http://www.w3.org/2000/svg'
            width='50'
            height='50'
            viewBox='0 0 100.00000000000001 66.41829740354368'
            preserveAspectRatio='xMidYMid meet'
          >
            <g
              transform='matrix(2.759380899278766,0,0,2.759380899278766,1.1037712904293029,-46.16444118178942)'
              fill='currentColor'
            >
              <path d='M28 17.16 c0.04 0.08 0.04 0.2 0.04 0.32 c0 0.08 0 0.2 -0.04 0.28 l-0.12 0.36 c-0.12 0.2 -0.24 0.36 -0.4 0.52 l-0.2 0.2 l-0.24 0.16 c-0.12 0.08 -0.24 0.16 -0.4 0.2 c-0.04 0 -0.12 0.04 -0.16 0.04 c-0.16 0.04 -0.28 0.08 -0.44 0.08 l-0.04 0 c-0.12 0.04 -0.28 0 -0.44 0.04 c-0.12 0 -0.24 -0.04 -0.36 -0.04 c-0.08 0.04 -0.12 0 -0.2 0 c-0.04 -0.04 -0.12 0 -0.16 0 l-0.52 -0.08 l-0.76 -0.08 l-0.68 -0.12 c-0.24 0 -0.44 -0.04 -0.64 -0.08 l-0.16 0 l-4.44 -0.24 l-0.12 0 c-0.12 -0.04 -0.2 -0.04 -0.28 -0.04 l-0.36 0 c-0.12 0 -0.24 -0.04 -0.36 -0.04 s-0.24 0.04 -0.36 0 l-0.32 0 l0 0.4 c-0.04 0.08 -0.04 0.16 -0.04 0.24 l-0.12 0.56 c-0.08 0.2 -0.12 0.4 -0.2 0.56 c-0.04 0.24 -0.2 0.44 -0.28 0.64 l-0.28 0.56 l-0.04 0.04 l-0.32 0.52 l-0.4 0.72 l-0.16 0.32 c-0.12 0.2 -0.24 0.44 -0.4 0.64 l-0.32 0.64 c-0.08 0.2 -0.16 0.4 -0.28 0.6 c-0.08 0.16 -0.32 0.52 -0.4 0.76 c-0.12 0.12 -0.2 0.28 -0.24 0.4 c-0.2 0.28 -0.36 0.6 -0.48 0.88 l-0.48 0.84 c-0.04 0.04 -0.08 0.12 -0.08 0.16 c-1.72 2.84 -5.2 8.88 -5.48 10 l-0.44 1.76 c-0.04 0.2 -0.32 0.48 -0.52 0.52 c-0.24 0.12 -0.52 -0.16 -0.64 -0.32 c-0.16 -0.2 -0.32 -0.48 -0.4 -0.76 c-0.04 -0.12 -0.08 -0.28 -0.08 -0.4 c0 -0.04 -0.04 -0.12 -0.04 -0.16 l0 -1 c0.04 -0.24 0.12 -0.52 0.24 -0.76 c0.04 -0.2 0.12 -0.4 0.2 -0.56 l0.16 -0.44 l0.16 -0.32 l0.24 -0.36 c0.16 -0.16 0.28 -0.32 0.4 -0.52 l1.28 -2.2 l0.36 -0.56 l0.48 -0.8 c0.16 -0.32 0.36 -0.64 0.56 -0.96 c0.12 -0.16 0.04 -0.12 0.16 -0.28 c0.16 -0.24 0.24 -0.48 0.36 -0.72 c0.16 -0.24 0.28 -0.48 0.4 -0.72 l0.44 -0.76 c0.12 -0.28 0.28 -0.52 0.4 -0.76 l0.44 -0.76 l0.08 -0.12 l0.32 -0.56 l0.4 -0.72 c0.12 -0.16 0.2 -0.32 0.24 -0.52 c0.04 -0.08 0.08 -0.2 0.16 -0.28 l0.36 -0.64 l0.48 -0.92 l0.28 -0.56 c0.16 -0.28 0.28 -0.56 0.44 -0.8 c0.12 -0.24 0.24 -0.52 0.4 -0.76 l0.32 -0.84 c0.04 -0.12 0.08 -0.28 0.08 -0.4 c0.04 -0.12 0.08 -0.28 0.08 -0.4 c0 -0.04 0.04 -0.08 0.04 -0.16 c0 -0.04 0 -0.08 0.04 -0.12 l0 -0.08 c0 -0.04 -0.04 -0.04 -0.04 -0.04 l-0.32 0 c-0.48 0 -2.8 0.04 -3.88 0.28 l-0.4 0.12 l-0.76 0.24 l-0.52 0.2 l-0.48 0.24 l-0.44 0.24 l-0.68 0.36 l-0.2 0.12 l-0.72 0.48 c-0.24 0.16 -0.48 0.32 -0.68 0.52 l-0.44 0.36 l-0.32 0.28 c-0.08 0.08 -0.16 0.2 -0.28 0.28 c-0.08 0.12 -0.24 0.24 -0.36 0.36 c-0.04 0.08 -0.12 0.16 -0.2 0.24 l-0.32 0.4 c-0.12 0.16 -0.24 0.28 -0.32 0.44 c-0.12 0.12 -0.2 0.24 -0.28 0.36 l-0.04 0.04 l-0.24 0.36 c0 0.04 -0.04 0.04 -0.04 0.04 c-0.08 0.2 -0.2 0.36 -0.28 0.52 c-0.12 0.2 -0.2 0.4 -0.24 0.64 c-0.08 0.16 -0.12 0.32 -0.16 0.48 l-0.08 0.32 c0 0.16 -0.04 0.32 -0.04 0.48 c-0.04 0.08 -0.04 0.16 -0.04 0.2 c0 0.08 -0.04 0.16 0 0.2 c-0.04 0.16 0.04 0.28 0.04 0.44 c-0.04 0.08 0 0.16 0 0.2 l0.08 0.44 c0 0.08 0.04 0.12 0.08 0.2 c0 0.12 0.04 0.2 0.08 0.32 l0.08 0.2 l0.12 0.36 c0.08 0.2 0.16 0.36 0.2 0.56 c0.04 0.08 0.08 0.16 0.08 0.24 c0.04 0.2 0.12 0.36 0.12 0.56 c0.04 0.2 0.04 0.4 -0.04 0.6 c-0.12 0.28 -0.32 0.52 -0.6 0.6 c-0.16 0.04 -0.36 0.04 -0.52 -0.04 c-0.28 -0.12 -0.48 -0.28 -0.6 -0.56 c-0.08 -0.16 -0.2 -0.32 -0.24 -0.48 c-0.04 -0.12 -0.08 -0.28 -0.08 -0.4 l-0.08 -0.4 c0 -0.16 -0.04 -0.28 -0.04 -0.4 l0 -0.32 c0 -0.12 0 -0.24 0.04 -0.32 c0 -0.2 0 -0.4 0.04 -0.6 c0 -0.2 0 -0.4 0.04 -0.6 c0 -0.08 0 -0.2 0.04 -0.28 c0 -0.16 0.04 -0.28 0.08 -0.4 c0 -0.12 0.04 -0.2 0.04 -0.28 l0.16 -0.6 l0.12 -0.4 c0.08 -0.24 0.16 -0.48 0.28 -0.72 s0.24 -0.52 0.4 -0.76 l0.12 -0.2 l0.08 -0.12 c0.04 -0.2 0.16 -0.36 0.28 -0.48 l0.36 -0.48 c0.04 0 0.04 0 0.04 -0.04 c0.08 -0.12 0.24 -0.24 0.32 -0.4 l0.04 -0.04 l0.4 -0.44 c0.08 -0.08 0.2 -0.16 0.28 -0.28 l0.04 -0.04 c0.08 -0.04 0.12 -0.12 0.2 -0.2 l0.28 -0.24 c0.16 -0.16 0.32 -0.32 0.52 -0.44 c0 -0.04 0 -0.04 0.04 -0.04 c0.12 -0.16 0.32 -0.28 0.48 -0.4 l0.28 -0.2 l0.44 -0.28 c0.12 -0.12 0.28 -0.2 0.44 -0.32 c0.08 -0.04 0.16 -0.12 0.28 -0.16 l0.44 -0.24 l0.76 -0.44 l0.56 -0.24 l0.04 0 c0.2 -0.12 0.44 -0.2 0.64 -0.24 l0.28 -0.12 l0.76 -0.24 c0.2 0 0.92 -0.32 4.52 -0.32 c0.04 0 0.04 -0.04 0.04 -0.04 l0 -0.12 c0 -0.16 0.08 -0.24 0.2 -0.32 s0.28 -0.12 0.44 -0.08 c0.16 0 0.32 0.04 0.48 0.16 l0.32 0.24 l0.12 0.16 c0.04 0.04 0.04 0.08 0.08 0.08 c0 -0.04 0.04 -0.04 0.04 -0.04 l0.08 0.16 c0.08 -0.04 0.16 -0.04 0.2 -0.04 c0.08 0 0.16 0 0.24 0.04 c0.08 0 0.12 -0.04 0.2 0 l0.52 0 c0.12 0.04 0.24 0 0.32 0.04 l0.44 0 c0 -0.04 0 0 0.04 0 l3.8 0.28 l0.16 0 c0.16 0 0.36 0.04 0.56 0.04 c0.16 0 0.32 0.04 0.48 0.04 c0.12 0.04 0.2 0.04 0.32 0.04 l1.12 0 c0.28 0 0.52 -0.04 0.76 -0.08 c0.12 0 0.2 -0.04 0.32 -0.08 c0.04 -0.04 0.12 -0.04 0.2 -0.04 c0.12 -0.04 0.28 -0.08 0.4 -0.16 c0.16 -0.08 0.32 -0.12 0.44 -0.2 c0.08 -0.04 0.12 -0.08 0.16 -0.08 c0.08 -0.08 0.16 -0.12 0.24 -0.16 l0.4 -0.32 l0.24 -0.32 c0.08 -0.08 0.16 -0.12 0.24 -0.12 c0.04 -0.04 0.12 -0.04 0.16 0 c0.08 0 0.12 0 0.16 0.08 c0.04 0.04 0.08 0.12 0.16 0.12 c0.08 0.04 0.12 0.12 0.16 0.2 z M35.84 21.32 l0 0.24 c0 0.16 -0.04 0.32 -0.04 0.48 c0 0.08 -0.04 0.16 -0.04 0.24 l-0.08 0.48 l-0.12 0.4 l-0.12 0.4 l-0.12 0.24 l-0.08 0.24 l-0.12 0.24 c-0.04 0.2 -0.16 0.4 -0.24 0.6 l-0.28 0.52 l-0.4 0.72 l-0.4 0.68 c-0.04 0.08 -0.08 0.16 -0.16 0.24 l-0.28 0.52 l-0.32 0.52 l-0.2 0.32 l-0.28 0.48 c-0.08 0.08 -0.12 0.2 -0.2 0.32 l-0.24 0.4 l-0.12 0.2 l-0.12 0.16 c-0.08 0.16 -0.2 0.32 -0.32 0.48 l-0.24 0.44 l-0.16 0.24 l-0.16 0.24 c-0.08 0.12 -0.16 0.24 -0.2 0.4 l-0.12 0.16 c-0.08 0.16 -0.16 0.32 -0.28 0.44 l-0.16 0.32 c-0.28 0.4 -0.48 0.84 -0.72 1.24 l-0.32 0.64 c-0.08 0.24 -0.2 0.44 -0.32 0.68 l-0.16 0.4 c-0.04 0.08 -0.08 0.16 -0.08 0.24 c-0.08 0.08 -0.08 0.16 -0.12 0.24 l-0.16 0.48 l-0.2 0.48 c-0.08 0.16 -0.12 0.32 -0.16 0.48 c-0.04 0.04 -0.08 0.08 -0.04 0.16 c0 0.04 -0.08 0.08 -0.08 0.12 c-0.04 0.12 -0.08 0.2 -0.08 0.32 l-0.16 0.48 c0 0.08 0 0.12 -0.04 0.2 l-0.08 0.44 l-0.08 0.4 l-0.08 0.76 c0 0.08 0 0.16 -0.04 0.24 c-0.04 0.12 -0.08 0.12 -0.16 0.12 l-0.16 0 c-0.08 0 -0.12 -0.04 -0.16 -0.04 c-0.16 -0.12 -0.32 -0.24 -0.44 -0.4 c0 -0.04 -0.04 -0.08 -0.08 -0.12 c-0.08 -0.24 -0.2 -0.48 -0.24 -0.72 c-0.08 -0.2 -0.12 -0.44 -0.16 -0.64 c-0.04 -0.16 -0.04 -0.32 -0.04 -0.44 l0 -0.28 c0 -0.16 0.04 -0.32 0.04 -0.48 c0 -0.08 0 -0.16 0.04 -0.24 c0 -0.16 0.04 -0.32 0.08 -0.48 l0.12 -0.4 l0.12 -0.4 c0.04 -0.08 0.08 -0.16 0.08 -0.24 l0.12 -0.24 c0 -0.08 0.04 -0.16 0.08 -0.24 l0.28 -0.6 l0.28 -0.52 c0.12 -0.24 0.24 -0.48 0.4 -0.72 l0.4 -0.68 l0.12 -0.24 l0.32 -0.52 l0.32 -0.52 l0.16 -0.32 l0.32 -0.48 l0.2 -0.32 l0.24 -0.4 c0 -0.04 0.04 -0.04 0.04 -0.08 l-0.04 0 c-0.08 -0.04 -0.12 -0.04 -0.2 -0.04 l-0.64 0 c-0.24 -0.04 -0.48 0 -0.68 0 c-0.44 -0.04 -0.92 -0.04 -1.36 -0.04 c0 0 -0.04 0 -0.04 0.04 l-0.12 0 l0 -0.04 c-0.04 0 -0.04 0.04 -0.04 0.04 l-0.68 0 c-0.12 0 -0.24 0 -0.36 0.04 l-0.32 0 c-0.08 -0.04 -0.12 0 -0.16 0.04 l-0.04 0 c-0.12 0 -0.2 0 -0.32 0.04 l-0.04 0 c-0.12 -0.04 -0.24 0 -0.32 0 l-0.36 0.08 c-0.08 0 -0.2 0.04 -0.36 0.04 c-0.08 0.04 -0.16 0.08 -0.24 0.08 l-0.44 0.12 l-0.04 0 l-0.36 0.12 c-0.16 0.24 -0.28 0.48 -0.4 0.72 c-0.16 0.2 -0.32 0.4 -0.4 0.68 c0 0.04 -0.04 0.08 -0.08 0.12 c-0.12 0.24 -0.28 0.48 -0.4 0.76 c-0.16 0.24 -0.32 0.48 -0.4 0.72 l-0.4 0.68 l-0.56 1.08 c-0.12 0.24 -0.28 0.48 -0.4 0.76 c-0.08 0.08 -0.12 0.2 -0.16 0.32 c-0.08 0.12 -0.08 0.24 -0.16 0.32 l-0.24 0.64 l-0.12 0.36 c-0.08 0.24 -0.12 0.44 -0.12 0.68 l0 0.24 c0 0.32 0 0.72 -0.16 0.96 c-0.2 0.28 -0.68 0.04 -0.88 -0.08 c-0.04 0 -0.04 -0.04 -0.08 -0.04 l-0.28 -0.44 c-0.08 -0.2 -0.12 -0.36 -0.16 -0.56 c-0.04 -0.16 -0.12 -0.32 -0.12 -0.48 c-0.04 -0.2 -0.08 -0.4 -0.04 -0.64 c-0.04 -0.16 0 -0.32 0.04 -0.52 c0.04 -0.24 0.08 -0.52 0.2 -0.76 c0.08 -0.2 0.12 -0.4 0.2 -0.56 c0.04 -0.16 0.12 -0.28 0.2 -0.44 l0.16 -0.32 c0.04 -0.12 0.16 -0.24 0.24 -0.36 l0.36 -0.48 l0.44 -0.72 l0.32 -0.52 c0 -0.04 0 -0.08 0.04 -0.08 c0.08 -0.2 0.2 -0.4 0.32 -0.56 l0.04 -0.04 l0.08 -0.12 c0.16 -0.36 0.4 -0.64 0.56 -0.96 l0.36 -0.6 l0.36 -0.68 c0.12 -0.28 0.24 -0.52 0.4 -0.76 l0.4 -0.76 l0.48 -0.84 l0.48 -0.8 l0.28 -0.56 c0.12 -0.12 0.16 -0.28 0.28 -0.44 l0.24 -0.48 l0.12 -0.32 l0.36 -0.64 l0.48 -0.92 c0.12 -0.16 0.2 -0.4 0.32 -0.56 l0.4 -0.8 c0.24 -0.56 0.44 -1.12 0.56 -1.68 c0.04 -0.28 0.16 -0.88 -0.2 -1 c-0.16 -0.04 -0.36 0 -0.56 0 c-0.08 0.04 -0.16 0.04 -0.24 0.04 c-0.08 0.04 -0.16 0.04 -0.24 0.04 c-0.04 0.04 -0.12 0.08 -0.16 0.08 l-0.44 0.12 c-0.24 0.08 -0.52 0.16 -0.76 0.28 l-0.52 0.16 l-0.48 0.24 l-0.44 0.24 l-0.64 0.36 l-0.2 0.12 l-0.76 0.48 l-0.68 0.52 l-0.44 0.36 l-0.32 0.28 c-0.08 0.08 -0.16 0.2 -0.28 0.28 c-0.08 0.16 -0.24 0.24 -0.36 0.4 l-0.16 0.2 l-0.36 0.4 c-0.12 0.16 -0.2 0.32 -0.32 0.44 c-0.08 0.12 -0.16 0.24 -0.28 0.36 c0 0 0 0.04 -0.04 0.04 l-0.08 0.12 c-0.04 0.08 -0.08 0.16 -0.16 0.24 c0 0.04 0 0.04 -0.04 0.08 l-0.28 0.52 l-0.24 0.6 l-0.16 0.48 c-0.04 0.12 -0.04 0.24 -0.04 0.36 c-0.04 0.12 -0.08 0.28 -0.08 0.44 l0 0.24 c0 0.04 -0.04 0.12 0 0.2 c-0.08 0.12 0 0.28 0 0.4 l0 0.24 c0.04 0.12 0.08 0.28 0.08 0.4 c0.04 0.08 0.08 0.12 0.08 0.2 l0.12 0.32 c0 0.08 0.04 0.16 0.04 0.2 l0.12 0.36 l0.24 0.56 c0 0.08 0.04 0.16 0.08 0.24 c0 0.2 0.08 0.36 0.12 0.56 c0 0.24 0 0.4 -0.08 0.6 c-0.08 0.32 -0.32 0.52 -0.6 0.6 c-0.16 0.08 -0.32 0.04 -0.52 -0.04 c-0.24 -0.12 -0.44 -0.28 -0.6 -0.56 l-0.24 -0.48 l-0.08 -0.4 l-0.08 -0.4 c0.04 -0.16 -0.04 -0.28 0 -0.4 c0 -0.12 -0.04 -0.24 0 -0.32 l0 -0.32 c0 -0.2 0.04 -0.4 0.04 -0.6 s0.04 -0.4 0.04 -0.6 c0.04 -0.08 0 -0.2 0.04 -0.28 l0.04 0 c-0.04 -0.16 0.04 -0.28 0.04 -0.4 c0 -0.08 0.04 -0.2 0.04 -0.28 c0.08 -0.2 0.12 -0.4 0.16 -0.6 l0.12 -0.4 l0.28 -0.68 c0.12 -0.28 0.28 -0.56 0.44 -0.8 c0.04 -0.08 0.04 -0.16 0.12 -0.2 c0 -0.04 0.04 -0.08 0.04 -0.12 c0.08 -0.16 0.16 -0.32 0.28 -0.48 c0.12 -0.12 0.16 -0.2 0.24 -0.32 l0.16 -0.16 c0.08 -0.16 0.24 -0.28 0.32 -0.44 c0.04 0 0.04 0 0.04 -0.04 c0.16 -0.12 0.28 -0.28 0.4 -0.44 c0.12 -0.08 0.2 -0.16 0.28 -0.28 l0.04 -0.04 l0.2 -0.16 c0.08 -0.12 0.2 -0.2 0.28 -0.28 c0.2 -0.16 0.32 -0.32 0.52 -0.44 c0.04 0 0.04 0 0.04 -0.04 c0.16 -0.16 0.36 -0.24 0.52 -0.4 l0.28 -0.2 c0.12 -0.08 0.24 -0.2 0.4 -0.28 l0.44 -0.28 l0.28 -0.2 l0.44 -0.24 l0.8 -0.4 c0.16 -0.12 0.32 -0.2 0.52 -0.24 c0.04 -0.04 0.04 -0.04 0.08 -0.04 c0.2 -0.12 0.4 -0.16 0.6 -0.24 l0.28 -0.12 c0.28 -0.08 0.52 -0.16 0.8 -0.2 l0 -0.04 c0.6 -0.16 1.24 -0.24 1.84 -0.16 c0.56 0.08 1.24 0.24 1.64 0.72 c0.36 0.48 0.4 1.16 0.28 1.76 l-0.2 0.52 c-0.04 0.2 -0.12 0.36 -0.24 0.56 l-0.04 0.04 l0.04 0.04 l-0.08 0.12 s0 0.04 -0.04 0.08 c-0.08 0.16 -0.2 0.32 -0.32 0.48 l-0.36 0.72 l-0.2 0.32 l-0.36 0.64 c-0.12 0.24 -0.24 0.44 -0.32 0.68 c-0.08 0.2 -0.2 0.36 -0.32 0.56 l-0.28 0.56 c-0.08 0.2 -0.16 0.4 -0.32 0.6 l-0.12 0.2 l-0.36 0.72 l-0.24 0.36 c-0.16 0.28 -0.32 0.56 -0.44 0.84 c-0.04 0 -0.04 0.04 -0.08 0.08 c-0.04 0.08 -0.08 0.16 -0.16 0.24 l-0.24 0.4 l0.48 -0.12 l0.36 -0.12 c0.16 0 0.32 -0.04 0.48 -0.08 c0.12 0 0.28 0 0.4 -0.04 l0.04 0 c0.12 0 0.24 -0.04 0.36 -0.08 l0.04 0 c0.16 0 0.28 0 0.44 -0.04 c0.08 0.04 0.12 0 0.2 0 l0.08 0 c0.48 0.04 0.92 0.04 1.4 0 c0.04 0 0.08 0 0.08 -0.04 l0.08 0 c0.08 0 0.12 0.04 0.2 0.04 c0.08 -0.04 0.16 0 0.24 0 c0 -0.04 0.04 0 0.08 0 s0.04 -0.04 0.08 0 l0.28 0 c0.16 0.04 0.32 0 0.44 0 l0.6 0 c0.08 -0.04 0.12 0 0.2 0 l0.52 0 l0.24 -0.36 c0.04 -0.08 0.08 -0.16 0.16 -0.24 l0.12 -0.24 l0.24 -0.4 l0.12 -0.16 l0.28 -0.44 c0 -0.12 0.08 -0.2 0.16 -0.32 l0.72 -1.24 l0.32 -0.64 l0.28 -0.68 l0.2 -0.4 l0.08 -0.24 c0.04 -0.08 0.08 -0.16 0.08 -0.24 c0.08 -0.16 0.16 -0.32 0.2 -0.48 l0.2 -0.48 l0.16 -0.48 c0 -0.04 0.04 -0.08 0.04 -0.16 c0 -0.04 0.04 -0.08 0.08 -0.12 c0 -0.12 0.08 -0.2 0.08 -0.32 c0.04 -0.16 0.12 -0.32 0.12 -0.48 c0 -0.08 0.04 -0.12 0.04 -0.2 l0.12 -0.44 c0.04 -0.12 0.04 -0.28 0.04 -0.4 c0.08 -0.24 0.08 -0.52 0.08 -0.76 l0.08 -0.24 c0.04 -0.12 0.08 -0.12 0.16 -0.12 l0.16 0 c0.04 0 0.12 0.04 0.16 0.04 c0.16 0.12 0.28 0.28 0.4 0.4 c0.04 0.04 0.08 0.08 0.08 0.12 c0.12 0.24 0.2 0.48 0.28 0.72 c0.08 0.2 0.12 0.44 0.16 0.64 c0 0.16 0.04 0.32 0.04 0.48 z'></path>
            </g>
          </svg>
        </Link>
        <ul className='hidden items-center gap-1 md:flex'>
          {links.map((link) => (
            <li key={link.id}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
        <Popover className='relative ml-auto md:hidden'>
          <Popover.Button className='flex items-center gap-1 rounded-lg p-1 text-secondary focus:ring-0 focus-visible:outline-none'>
            Menu
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='h-5 w-5'
            >
              <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
            </svg>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute right-0 z-10 mt-2 w-36 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base shadow-lg backdrop-blur-lg focus:outline-none dark:bg-black/95 sm:text-sm'>
              <div className='grid space-y-1'>
                {links.map((link) => (
                  <Popover.Button
                    as={Link}
                    key={link.id}
                    href={link.href}
                    className={clsx(
                      'rounded-md px-4 py-2 transition-colors hover:bg-neutral-200/50 hover:text-primary hover:dark:bg-neutral-900',
                      pathname === link.href
                        ? 'bg-neutral-200/50 font-medium dark:bg-neutral-900'
                        : 'font-normal',
                    )}
                  >
                    {link.label}
                  </Popover.Button>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <div className='flex h-8 w-8 items-center justify-center'>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
