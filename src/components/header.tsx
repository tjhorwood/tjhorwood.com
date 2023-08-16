"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { Popover, Transition } from "@headlessui/react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

function MobileNavItem({ href, children }: { href: any, children: any }) {
  return (
    <li>
      <Popover.Button as={Link} href={href} className="block py-3">
        {children}
      </Popover.Button>
    </li>
  )
}

function MobileNavigation(props: any) {
  return (
    <Popover {...props}>
      <Popover.Button className="group fixed top-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-30 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 outline-none">
        <RiMenu3Line className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-5 z-50 origin-top rounded-2xl bg-white py-6 ring-1 ring-gray-900/5 dark:ring-gray-800 dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-80 backdrop-blur-[0.5rem]"
          >
            <div className="flex flex-row-reverse items-center justify-between px-6">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1 outline-none">
                <RiCloseLine className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </Popover.Button>
            </div>
            <nav className="mt- px-10">
              <ul className="-my-2 divide-y divide-gray-100 text-base text-gray-800 dark:divide-gray-100/5 dark:text-gray-300">
              {links.map((link) => (
                <MobileNavItem key={link.name} href={link.hash}>{link.name}</MobileNavItem>
              ))}
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999] relative">
      <motion.div
        className="hidden md:block fixed top-6 left-1/2 h-[3.25rem] w-[36rem] rounded-full border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="hidden md:flex fixed top-[1.7rem] left-1/2 h-[initial] py-0 -translate-x-1/2">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 md:w-[initial] md:flex-nowrap md:gap-5">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-400 dark:hover:text-gray-100",
                  {
                    "text-gray-950 dark:text-white":
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-700"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <MobileNavigation className="pointer-events-auto md:hidden" />
    </header>
  );
}