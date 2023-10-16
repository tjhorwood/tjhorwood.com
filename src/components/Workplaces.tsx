import Link from '@/components/ui/Link';
import Image, { StaticImageData } from 'next/image';
import cn from 'clsx';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';

type Workplace = {
  title: string;
  company: string;
  imageSrc: string | StaticImageData;
  time?: string;
  link?: string;
  description?: any;
};

function Workplace({
  title,
  company,
  imageSrc,
  time,
  link,
  description,
}: Workplace) {
  const content = (
    <>
      <div className='flex items-center gap-4'>
        <Image
          src={imageSrc}
          alt={company}
          width={48}
          height={48}
          className={cn('rounded-full', company === 'Amtrak' && '')}
        />
        <div className='flex flex-col gap-px text-left'>
          <p className={link ? 'external-arrow' : ''}>{title}</p>
          <p className='text-secondary'>{company}</p>
        </div>
      </div>
      {time && <p className='text-right text-secondary'>{time}</p>}
    </>
  );
  return (
    <li className='transition-opacity' key={company}>
      <Dialog>
        <DialogTrigger className='-mx-3 -my-2 flex w-full justify-between px-3 py-2 no-underline'>
          {content}
        </DialogTrigger>
        <DialogContent className='max-h-[500px] overflow-scroll rounded-xl sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{company}</DialogDescription>
          </DialogHeader>
          <ul className='list-inside list-disc space-y-2'>
            {description &&
              description.map((item: any, itemIdx: any) => (
                <li key={itemIdx}>{item.content}</li>
              ))}
          </ul>
        </DialogContent>
      </Dialog>
    </li>
  );
}

export default function Workplaces({ items }: { items: Workplace[] }) {
  return (
    <ul className='animated-list flex flex-col gap-8'>
      {items.map(Workplace)}
    </ul>
  );
}
