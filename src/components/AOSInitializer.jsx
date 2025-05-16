'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export const AOSInitializer = () => {
  useEffect(() => {
    AOS.init({
      once: true, // Whether animation should happen only once - while scrolling down
      disable: 'phone', // Accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      duration: 700, // Values from 0 to 3000, with step 50ms
      easing: 'ease-out-cubic', // Default easing for AOS animations
    });

    // Optional: Refresh AOS on component updates if needed
    // AOS.refresh(); // This might be useful if your layout changes dynamically after initial load
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return null; // This component doesn't render anything itself
};
