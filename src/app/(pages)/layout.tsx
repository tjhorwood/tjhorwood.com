'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode='sync'>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='mx-auto max-w-screen-2xl px-6 pb-24 pt-10 md:px-6 md:pb-44 md:pt-16'
      >
        <main className='grow'>{children}</main>
      </motion.div>
    </AnimatePresence>
  );
}
