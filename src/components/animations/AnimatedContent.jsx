import { cn } from '@/lib/utils';

/**
 * Minimal one-shot entrance: a short fade + rise that runs on render via a
 * pure CSS animation. No scroll dependency, no animation library, no
 * hydration gate — the content is always rendered and ends fully visible
 * even if the animation is skipped (see `prefers-reduced-motion` in
 * globals.css). Prop surface kept compatible with the previous version.
 */
export default function AnimatedContent({
  children,
  className = '',
  delay = 0,
}) {
  return (
    <div
      className={cn('animate-rise-in', className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
