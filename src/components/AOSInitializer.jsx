'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSInitializer = () => {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      once: true,
      // disable: 'phone', // <-- IMPORTANT: Remove or set to false if you want animations on mobile
      duration: 700,
      easing: 'ease-out-cubic',
      // You might want to add a small offset on mobile if elements are close to the top
      // offset: 50, // Example: Animate elements when they are 50px into view
    });
  }, []);

  useEffect(() => {
    AOS.refresh();

    // For more stubborn cases, you can try AOS.refreshHard()
    // AOS.refreshHard();

    // It can sometimes help to add a very slight delay to ensure the DOM is fully updated
    // setTimeout(() => {
    //   AOS.refresh();
    // }, 50); // 50ms delay
  }, [pathname]); // Re-run this effect if the pathname changes

  return null; // This component doesn't render any UI itself
};
