import Section from '@/components/Section';

export default function Info({ paragraphs = [], strengths = [] }) {
  return (
    <div>
      <Section heading='About' headingAlignment='left'>
        <div className='flex flex-col gap-6'>
          {paragraphs.map(({ content }, index) => (
            <p key={`${content}-${index}`}>{content}</p>
          ))}
          {strengths.length > 0 && (
            <ul className='ml-6 list-disc space-y-2'>
              {strengths.map(({ label, description }) => (
                <li key={label}>
                  <strong>{label}</strong>: {description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </div>
  );
}
