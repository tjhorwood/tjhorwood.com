// Shared surface + label recipes for the flat, hairline-bordered design language.
// No drop shadows: elevation reads through borders and tone only.

export const interactiveSurfaceClass =
  'border border-border bg-card transition-colors hover:border-foreground/30';

export const cardSurfaceClass = `rounded-xl ${interactiveSurfaceClass}`;

export const pillSurfaceClass =
  'rounded-full border border-border bg-secondary transition-colors';

export const buttonSurfaceClass = 'cursor-pointer border border-border';

// Mono "eyebrow" label used above section headings.
export const labelClass =
  'font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground';
