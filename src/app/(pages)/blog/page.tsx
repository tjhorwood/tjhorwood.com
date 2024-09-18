export default function Blog() {
  return (
    <div className='flex flex-col gap-12'>
      <div>
        <h1 className='animate-in text-3xl font-bold tracking-tight'>Blog</h1>
        <p
          className='animate-in text-secondary'
          style={{ '--index': 1 } as React.CSSProperties}
        >
          0 posts so far. Stay tuned for more!
        </p>
      </div>
    </div>
  );
}
