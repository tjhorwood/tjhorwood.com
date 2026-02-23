import PageIntro from '@/components/PageIntro';

export const metadata = {
  description: 'My Blog',
  title: 'Blog',
};

export default function Blog() {
  return (
    <div className='flex flex-col gap-12'>
      <PageIntro
        title='Blog'
        descriptions='0 posts so far. Stay tuned for more!'
      />
    </div>
  );
}
