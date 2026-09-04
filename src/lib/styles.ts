// Shared surface + label recipes for the card-forward, pure-monochrome language.
// Elevation reads through hairlines and tone only — no drop shadows. Big rounded
// cards, pill controls, inverted dark feature blocks.

export const interactiveSurfaceClass =
  'border border-border bg-card transition-colors hover:border-foreground/30';

// Big rounded card — the primary container in the new system.
export const cardSurfaceClass = `rounded-3xl ${interactiveSurfaceClass}`;

export const pillSurfaceClass =
  'rounded-full border border-border bg-secondary transition-colors';

export const buttonSurfaceClass = 'cursor-pointer border border-border';

// Inverted feature block (footer CTA, case-study call-outs).
export const featureBlockClass = 'rounded-3xl surface-invert';

// Mono "eyebrow" label used above section headings. Used sparingly.
export const labelClass =
  'font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground';

// Small outlined pill for a single taxonomy term (category, tag, tech).
export const tagPillClass =
  'inline-flex items-center rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground';

// Framed media (project shots, portraits).
export const mediaFrameClass =
  'overflow-hidden rounded-2xl border border-border bg-muted';

// Primary call to action — solid dark pill (inverts per theme).
export const primaryActionClass =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

// Secondary action — quiet hairline pill.
export const secondaryActionClass =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary';

// Segmented pill control track + item (filters, process tabs).
export const segmentTrackClass =
  'inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-secondary p-1';
export const segmentItemBase =
  'cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors';
export const segmentItemActive = 'bg-card text-foreground border border-border';
export const segmentItemInactive =
  'border border-transparent text-muted-foreground hover:text-foreground';
