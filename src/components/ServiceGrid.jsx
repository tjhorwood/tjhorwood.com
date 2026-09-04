import { LuActivity, LuLayoutGrid, LuServer, LuWorkflow } from 'react-icons/lu';
import { cardSurfaceClass } from '@/lib/styles';
import { cn } from '@/lib/utils';

// Hardcoded like About's CAPABILITY_GROUPS — move to Payload later.
const SERVICES = [
  {
    body: 'Proxmox, Docker, Tailscale, and Cloudflare — self-hosted platforms wired together and kept boring.',
    icon: LuServer,
    title: 'Infrastructure',
  },
  {
    body: 'Monitoring, alerting, backups, and runbooks so systems recover on their own and I sleep through the night.',
    icon: LuActivity,
    title: 'Reliability / SRE',
  },
  {
    body: 'Next.js and Payload sites — content workflows, live preview, and deploys that just work.',
    icon: LuLayoutGrid,
    title: 'Web & apps',
  },
  {
    body: 'Small scripts, CI pipelines, and agent workflows that remove the repetitive parts of running things.',
    icon: LuWorkflow,
    title: 'Automation',
  },
];

export default function ServiceGrid({ services = SERVICES }) {
  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      {services.map(({ icon: Icon, title, body }) => (
        <div key={title} className={cn(cardSurfaceClass, 'p-6 sm:p-7')}>
          <span className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary'>
            <Icon className='h-5 w-5' />
          </span>
          <h3 className='mt-5 text-title font-semibold'>{title}</h3>
          <p className='mt-2 text-pretty text-sm leading-6 text-muted-foreground'>
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}
