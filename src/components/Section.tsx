import cn from 'clsx';
import { ReactNode } from 'react';

type SectionProps = {
  sectionClass?: string;
  heading: string;
  headingAlignment?: 'right' | 'left';
  headingClass?: string;
  children: ReactNode;
};

export default function Section({
  sectionClass,
  heading,
  headingAlignment,
  headingClass,
  children,
}: SectionProps) {
  return (
    <section
      className={cn(
        'col-reverse flex flex-col gap-2 md:flex-row md:gap-8',
        sectionClass,
      )}
    >
      <h2
        className={cn(
          'shrink-0 text-neutral-600 md:w-28 dark:text-neutral-400',
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
