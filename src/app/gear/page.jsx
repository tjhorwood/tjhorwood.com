export const metadata = {
  title: 'Gear',
  description: 'My Gear',
};

export default function Gear() {
  return (
    <div className='flex flex-col gap-12'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Gear</h1>
        <p className='text-primary/60'>
          This is all gear I actually own and like.
        </p>
        <p className='text-primary/60'>
          Using the affiliate links help support my work.
        </p>
      </div>
    </div>
  );
}
