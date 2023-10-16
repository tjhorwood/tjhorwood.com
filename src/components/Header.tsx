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
      <nav className='lg mx-auto flex max-w-[800px] items-center justify-between gap-3 px-4 py-3 md:px-6'>
        <Link href='/' className='shrink-0 text-secondary'>
          <svg
            version='1.2'
            xmlns='http://www.w3.org/2000/svg'
            width='36.000000pt'
            height='36.000000pt'
            viewBox='0 0 1280.000000 1280.000000'
            preserveAspectRatio='xMidYMid meet'
          >
            <g
              transform='translate(0.000000,1280.000000) scale(0.100000,-0.100000)'
              stroke='none'
            >
              <path
                fill='currentColor'
                d='M6270 10544 c-19 -2 -87 -9 -150 -15 -247 -23 -552 -88 -768 -164 -378 -132 -686 -315 -975 -578 l-88 -81 -127 -13 c-407 -42 -835 -153 -1202 -313 -269 -117 -583 -298 -803 -463 -739 -555 -1255 -1385 -1431 -2302 -52 -272 -61 -384 -61 -755 1 -303 3 -366 24 -515 54 -403 147 -749 292 -1088 116 -271 220 -460 394 -722 192 -286 360 -491 583 -707 573 -554 1232 -860 2047 -950 155 -17 625 -17 770 0 748 87 1433 371 2015 835 415 331 793 836 1013 1352 224 526 375 1102 637 2440 213 1086 436 1704 773 2150 62 81 258 290 288 306 10 5 63 -1 141 -16 786 -154 1520 -22 2127 380 275 182 547 450 755 744 l66 93 -75 59 c-110 87 -125 83 -242 -66 -117 -147 -244 -277 -355 -361 -426 -320 -1004 -345 -2033 -88 -382 96 -773 216 -1530 469 -998 334 -1140 364 -1715 370 -184 2 -351 1 -370 -1z m-15 -403 c248 -44 609 -154 930 -284 88 -35 428 -184 755 -330 630 -280 771 -337 1020 -412 85 -26 172 -52 193 -59 l38 -11 -93 -80 c-224 -193 -485 -465 -653 -680 -200 -255 -379 -579 -524 -945 -84 -212 -240 -673 -407 -1200 -333 -1055 -493 -1478 -774 -2053 -595 -1219 -1263 -1813 -2175 -1932 -269 -35 -633 -19 -918 41 -552 117 -1098 414 -1529 832 -620 603 -1018 1424 -1120 2317 -19 166 -16 608 6 785 108 896 470 1644 1101 2276 218 219 383 356 615 511 376 251 730 393 1205 482 61 12 115 21 121 21 6 0 -18 -44 -53 -97 -140 -213 -270 -523 -327 -783 -54 -248 -74 -598 -46 -850 46 -428 211 -845 470 -1185 80 -106 273 -297 380 -376 417 -310 877 -440 1381 -389 367 38 653 153 980 396 54 41 99 70 99 65 0 -5 -16 -56 -36 -113 -288 -831 -910 -1507 -1629 -1773 -128 -48 -294 -90 -437 -111 -150 -22 -448 -15 -588 14 -334 70 -640 234 -881 472 -348 345 -549 843 -533 1320 5 124 32 298 73 465 29 116 29 121 12 150 -15 26 -28 33 -114 55 -80 20 -99 22 -106 11 -14 -22 -69 -256 -92 -386 -70 -406 -10 -865 160 -1220 217 -455 640 -846 1111 -1028 487 -188 1100 -192 1621 -11 640 222 1150 678 1483 1327 156 305 261 662 312 1062 l18 140 57 90 c164 261 285 523 392 850 53 161 107 350 107 376 0 13 -23 25 -94 49 -91 30 -95 30 -128 14 -33 -15 -37 -22 -63 -118 -66 -239 -255 -746 -277 -746 -5 0 -8 17 -8 38 0 52 -45 320 -74 444 -189 798 -646 1417 -1306 1771 -326 175 -773 308 -1152 342 -43 4 -78 10 -77 14 0 3 26 27 57 52 267 217 618 364 975 409 120 15 406 5 542 -19z m-1370 -716 c363 -49 674 -168 1020 -389 376 -241 727 -662 913 -1096 142 -331 202 -643 202 -1052 l0 -217 -132 -122 c-433 -397 -700 -531 -1118 -558 -570 -37 -1042 166 -1410 607 -227 270 -375 570 -443 897 -36 168 -47 287 -47 489 0 521 155 970 478 1385 l65 84 181 -6 c100 -4 230 -14 291 -22z'
              />
            </g>
          </svg>
        </Link>
        <ul className='hidden items-center gap-1 md:flex'>
          {links.map((link) => (
            <li key={link.href}>
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
            <Popover.Panel className='absolute right-0 z-10 mt-2 w-40 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base shadow-lg backdrop-blur-lg focus:outline-none dark:bg-black/95 sm:text-sm'>
              <div className='grid'>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'rounded-md px-4 py-2 transition-colors hover:bg-primary hover:text-primary',
                      pathname === link.href
                        ? 'bg-secondaryA font-medium'
                        : 'font-normal',
                    )}
                  >
                    {link.label}
                  </Link>
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
