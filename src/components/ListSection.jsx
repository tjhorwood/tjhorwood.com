import Section from '@/components/Section';
import cn from 'clsx';
import AnimatedContent from '@/components/animations/AnimatedContent';

export default function ListSection({ heading, data }) {
  return (
    <div>
      <Section heading={heading} headingAlignment='left'>
        <ul
          className='flex flex-wrap justify-start gap-2'
          initial='hidden'
          animate='show'
        >
          {data.map(({ name, css, icon: Icon }, index) => (
            <AnimatedContent
              key={index}
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
                key={index}
                className='flex gap-2 rounded-xl bg-secondary hover:bg-secondary/80 px-4 py-2 text-primary shadow border-border border'
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
