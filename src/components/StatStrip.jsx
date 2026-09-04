import { cardSurfaceClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

// Hardcoded like About's NOW_ITEMS / INTERESTS — move to Payload later.
const STATS = [
  { label: 'Years building', value: '8+' },
  { label: 'Projects shipped', value: '30+' },
  { label: 'Services self-hosted', value: '40+' },
  { label: 'Homelab uptime', value: '99.9%' },
];

export default function StatStrip({ stats = STATS }) {
  return (
    <dl
      className={cn(
        cardSurfaceClass,
        'grid grid-cols-2 divide-y divide-border sm:grid-cols-4 sm:divide-x sm:divide-y-0',
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className='px-6 py-7 sm:px-7'>
          <dt className='font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground'>
            {stat.label}
          </dt>
          <dd className='mt-2 text-headline font-semibold tracking-tighter'>
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
