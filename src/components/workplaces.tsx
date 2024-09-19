import cn from 'clsx';
import Image from 'next/image';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Workplace = {
  title: string;
  company: string;
  imageSrc: string;
  time?: string;
  link?: string;
  description?: { content: string }[];
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
    <Sheet>
      <SheetTrigger className='-mx-3 -my-2 flex w-full justify-between px-3 py-2 no-underline transition-all duration-200 hover:scale-[1.02]'>
        {content}
      </SheetTrigger>
      <SheetContent className='w-[90%] bg-primary'>
        <SheetHeader className='text-left'>
          <SheetTitle>{title}</SheetTitle>
          <p className='text-secondary'>{company}</p>
        </SheetHeader>
        <p className='py-4 text-secondary'>Key responsibilities:</p>
        <ul className='ml-4 list-disc space-y-3'>
          {description?.map(({ content }, index) => (
            <li key={index}>{content}</li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default function Workplaces({ items }: { items: Workplace[] }) {
  return (
    <ul className='flex flex-col gap-8'>
      {items.map((item, index) => (
        <li key={index}>
          <Workplace {...item} />
        </li>
      ))}
    </ul>
  );
}
