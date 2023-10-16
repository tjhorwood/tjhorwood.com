import Link from '@/components/ui/Link';
import Image, { StaticImageData } from 'next/image';
import cn from 'clsx';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

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
      {time && <p className='ml-3 text-right text-secondary'>{time}</p>}
    </>
  );
  return (
    <li className='transition-opacity' key={company}>
      <Sheet>
        <SheetTrigger className='-mx-3 -my-2 flex w-full justify-between px-3 py-2 no-underline'>
          {content}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{company}</SheetDescription>
          </SheetHeader>
          <p className='py-4 text-secondary'>
            Below you will find some of the key responsibilites for this role:
          </p>
          <ul className='ml-4 list-disc space-y-3'>
            {description &&
              description.map((item: any, itemIdx: any) => (
                <li key={itemIdx}>{item.content}</li>
              ))}
          </ul>
        </SheetContent>
      </Sheet>
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
