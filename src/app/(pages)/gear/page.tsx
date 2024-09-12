export default function Gear() {
  return (
    <div className='mx-auto flex max-w-5xl flex-col gap-12'>
      <div>
        <h1 className='animate-in text-3xl font-bold tracking-tight'>Gear</h1>
        <p
          className='animate-in text-secondary'
          style={{ '--index': 1 } as React.CSSProperties}
        >
          This is all gear I actually own and like.
        </p>
        <p
          className='animate-in text-secondary'
          style={{ '--index': 2 } as React.CSSProperties}
        >
          Using the affiliate links help support my work.
        </p>
      </div>
    </div>
  );
}
