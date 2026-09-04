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
      {eyebrow && <Eyebrow className='mb-4'>{eyebrow}</Eyebrow>}
      <h1 className='text-display font-semibold'>{title}</h1>
      {lines.map((line, index) => (
        <p
          key={`${line}-${index}`}
          className={cn(
            'mt-5 max-w-2xl text-pretty text-lg leading-8',
            descriptionClassName,
          )}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
