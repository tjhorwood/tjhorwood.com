'use client';
import AOS from 'aos';
import { useEffect } from 'react';

import 'aos/dist/aos.css';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <div className='px-6 pb-24 pt-10 md:px-6 md:pb-44 md:pt-16'>
      <main className='grow'>{children}</main>
    </div>
  );
}
