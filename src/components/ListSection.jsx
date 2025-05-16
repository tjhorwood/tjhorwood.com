import cn from 'clsx';
import Section from '@/components/Section';

export default function ListSection({
  heading,
  data,
  data_aos,
  data_aos_delay = '',
}) {
  return (
    <div data-aos={data_aos} data-aos-delay={data_aos_delay}>
      <Section heading={heading} headingAlignment='left'>
        <ul
          className='flex flex-wrap justify-start gap-2'
          initial='hidden'
          animate='show'
        >
          {data.map(({ name, css, icon: Icon }, index) => (
            <li
              key={index}
              className='flex gap-2 rounded-xl bg-neutral-200/50 px-4 py-2 text-sm text-neutral-900 shadow-sm md:text-base dark:bg-neutral-800 dark:text-white'
            >
              <Icon className={cn('h-6 w-6', css)} />
              {name}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
