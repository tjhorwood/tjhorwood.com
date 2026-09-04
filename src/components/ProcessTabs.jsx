'use client';

import { useState } from 'react';
import {
  cardSurfaceClass,
  segmentItemActive,
  segmentItemBase,
  segmentItemInactive,
  segmentTrackClass,
} from '@/lib/styles';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    body: 'We talk through the goal, the constraints, and the failure modes you care about. I map the moving parts and pick the smallest architecture that meets the requirement.',
    key: 'scope',
    label: 'Scope',
    title: 'Understand what actually needs to run',
  },
  {
    body: 'Everything lands as code — containers, config, and infrastructure in version control. You get visibility into progress and can steer early instead of at the end.',
    key: 'build',
    label: 'Build',
    title: 'Build it reproducibly',
  },
  {
    body: 'Staged rollout, health checks, and a documented rollback. Nothing goes live without a tested path to undo it.',
    key: 'ship',
    label: 'Ship',
    title: 'Deploy with a way back',
  },
  {
    body: 'Monitoring, alerting, backups, and runbooks so the system recovers on its own. You get the dashboards and the docs to run it without me.',
    key: 'operate',
    label: 'Operate',
    title: 'Keep it boring',
  },
];

export default function ProcessTabs({ steps = STEPS }) {
  const [active, setActive] = useState(steps[0].key);
  const current = steps.find((step) => step.key === active) ?? steps[0];
  const index = steps.findIndex((step) => step.key === current.key);

  return (
    <div>
      <div className={segmentTrackClass}>
        {steps.map((step) => (
          <button
            key={step.key}
            type='button'
            onClick={() => setActive(step.key)}
            className={cn(
              segmentItemBase,
              step.key === active ? segmentItemActive : segmentItemInactive,
            )}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          cardSurfaceClass,
          'mt-5 grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:gap-10',
        )}
      >
        <span className='text-display font-semibold leading-none text-muted-foreground/40'>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className='text-title font-semibold'>{current.title}</h3>
          <p className='mt-3 max-w-xl text-pretty leading-7 text-muted-foreground'>
            {current.body}
          </p>
        </div>
      </div>
    </div>
  );
}
