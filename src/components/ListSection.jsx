import AnimatedContent from '@/components/animations/AnimatedContent';
import Section from '@/components/Section';
import { pillSurfaceClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default function ListSection({ heading, data }) {
  return (
    <div>
      <Section heading={heading} headingAlignment='left'>
        <ul className='flex flex-wrap justify-start gap-2'>
          {data.map(({ name, css, icon: Icon }, index) => (
            <AnimatedContent
              key={name}
              distance={50}
              direction='vertical'
              reverse={false}
              duration={0.1}
              ease='power3.out'
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0}
              delay={index * 0.04}
            >
              <li
                className={cn(
                  'flex gap-2 px-4 py-2 text-primary',
                  pillSurfaceClass,
                )}
              >
                <Icon className={cn('h-6 w-6', css)} />
                {name}
              </li>
            </AnimatedContent>
          ))}
        </ul>
      </Section>
    </div>
  );
}
