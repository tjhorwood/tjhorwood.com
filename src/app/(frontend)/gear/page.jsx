import GearShowcase from '@/components/GearShowcase';
import PageIntro from '@/components/PageIntro';
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
    <div className='flex flex-col gap-12 md:gap-16'>
      <PageIntro
        eyebrow='Setup'
        title={gearPage.title ?? 'Gear'}
        descriptions={
          introLines.length > 0
            ? introLines
            : 'Tools, hardware, software, and setup notes from the things I actually use or would recommend.'
        }
      />

      <GearShowcase gearItems={gearItems.docs} />
    </div>
  );
}
