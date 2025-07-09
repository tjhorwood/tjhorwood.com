export const metadata = {
  title: 'Blog',
  description: 'My Blog',
};

export default function Blog() {
  return (
    <div className='flex flex-col gap-12'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Blog</h1>
        <p className='text-primary/60'>0 posts so far. Stay tuned for more!</p>
      </div>
    </div>
  );
}
