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
    <div className='flex flex-col gap-12'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-secondary via-background to-secondary/40 p-6 shadow-sm md:p-10'>
        <div className='pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
        <div className='relative max-w-4xl space-y-6'>
          <PageIntro
            title={gearPage.title ?? 'Gear'}
            descriptions={
              introLines.length > 0
                ? introLines
                : 'Tools, hardware, software, and setup notes from the things I actually use or would recommend.'
            }
          />
          <div className='flex flex-wrap gap-3'>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              {gearItems.totalDocs} items
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              Homelab
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              Desk
            </span>
            <span className='rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur'>
              Dev tools
            </span>
          </div>
        </div>
      </section>

      <GearShowcase gearItems={gearItems.docs} />
    </div>
  );
}
