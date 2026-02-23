'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  className = '',
  distance = 50,
  direction = 'vertical',
  reverse = false,
  duration = 0.6,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0,
  delay = 0,
  onComplete,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      opacity: animateOpacity ? initialOpacity : 1,
      scale,
    });

    gsap.to(el, {
      [axis]: 0,
      delay,
      duration,
      ease,
      onComplete,
      opacity: 1,
      scale: 1,
      scrollTrigger: {
        once: true,
        start: `top ${startPct}%`,
        toggleActions: 'play none none none',
        trigger: el,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
  ]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default AnimatedContent;
