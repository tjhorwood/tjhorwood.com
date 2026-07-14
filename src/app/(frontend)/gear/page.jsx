import Image from 'next/image';
import Link from '@/components/Link';
import PageIntro from '@/components/PageIntro';
import { getMediaAlt, getMediaUrl } from '@/lib/media';
import { cardSurfaceClass } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { getGearItems } from '@/payload/queries/getGearItems';
import { getGearPage } from '@/payload/queries/getGlobals';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const gearPage = await getGearPage();
  return {
    description: gearPage.seo?.description ?? 'My Gear',
    title: gearPage.seo?.title ?? 'Gear',
  };
}

export default async function Gear() {
  const [gearPage, gearItems] = await Promise.all([
    getGearPage(),
    getGearItems(),
  ]);
  const introLines = gearPage.introLines?.map(({ content }) => content) ?? [];
  return (
    <div className='flex flex-col gap-12'>
      <PageIntro title={gearPage.title ?? 'Gear'} descriptions={introLines} />
      {gearItems.totalDocs > 0 && (
        <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {gearItems.docs.map((item) => {
            const imageUrl = getMediaUrl(item.image);
            const href = item.affiliateUrl || item.productUrl;
            const Card = (
              <article className={cn('h-full p-5', cardSurfaceClass)}>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={getMediaAlt(item.image, item.name)}
                    width={768}
                    height={432}
                    className='mb-4 rounded-lg object-cover'
                  />
                )}
                <p className='text-sm text-primary/60'>{item.category}</p>
                <h2 className='font-semibold'>{item.name}</h2>
                {item.description && (
                  <p className='text-primary/70'>{item.description}</p>
                )}
              </article>
            );
            return (
              <li key={item.id}>
                {href ? <Link href={href}>{Card}</Link> : Card}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
