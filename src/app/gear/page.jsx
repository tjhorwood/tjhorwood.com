import PageIntro from '@/components/PageIntro';

export const metadata = {
  description: 'My Gear',
  title: 'Gear',
};

export default function Gear() {
  return (
    <div className='flex flex-col gap-12'>
      <PageIntro
        title='Gear'
        descriptions={[
          'This is all gear I actually own and like.',
          'Using the affiliate links help support my work.',
        ]}
      />
    </div>
  );
}
