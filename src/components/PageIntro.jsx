import AnimatedContent from '@/components/animations/AnimatedContent';
import { cn } from '@/lib/utils';

export default function PageIntro({
  title,
  descriptions,
  descriptionClassName = 'text-primary/60',
}) {
  const lines = (
    Array.isArray(descriptions) ? descriptions : [descriptions]
  ).filter(Boolean);

  return (
    <div>
      <AnimatedContent>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
      </AnimatedContent>
      {lines.map((line, index) => (
        <AnimatedContent delay={0.1 + index * 0.1} key={`${line}-${index}`}>
          <p className={cn(descriptionClassName)}>{line}</p>
        </AnimatedContent>
      ))}
    </div>
  );
}
