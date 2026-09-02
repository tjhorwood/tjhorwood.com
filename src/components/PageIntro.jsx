import AnimatedContent from '@/components/animations/AnimatedContent';
import Eyebrow from '@/components/Eyebrow';
import { cn } from '@/lib/utils';

export default function PageIntro({
  eyebrow,
  title,
  descriptions,
  descriptionClassName = 'text-muted-foreground',
}) {
  const lines = (
    Array.isArray(descriptions) ? descriptions : [descriptions]
  ).filter(Boolean);

  return (
    <div>
      {eyebrow && (
        <AnimatedContent>
          <Eyebrow className='mb-4'>{eyebrow}</Eyebrow>
        </AnimatedContent>
      )}
      <AnimatedContent>
        <h1 className='text-balance text-4xl font-semibold tracking-tightest sm:text-5xl md:text-6xl'>
          {title}
        </h1>
      </AnimatedContent>
      {lines.map((line, index) => (
        <AnimatedContent delay={0.1 + index * 0.1} key={`${line}-${index}`}>
          <p
            className={cn(
              'mt-4 max-w-2xl text-pretty text-base leading-7 sm:text-lg',
              descriptionClassName,
            )}
          >
            {line}
          </p>
        </AnimatedContent>
      ))}
    </div>
  );
}
