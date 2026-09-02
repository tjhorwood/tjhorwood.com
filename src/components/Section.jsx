import { cn } from '@/lib/utils';

export default function Section({
  sectionClass,
  heading,
  headingAlignment,
  headingClass,
  children,
}) {
  return (
    <section
      className={cn(
        'col-reverse flex flex-col gap-2 md:flex-row md:gap-8',
        sectionClass,
      )}
    >
      <h2
        className={cn(
          'shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground md:w-28 md:pt-1',
          headingClass,
          headingAlignment === 'right' && 'md:text-right',
        )}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}
