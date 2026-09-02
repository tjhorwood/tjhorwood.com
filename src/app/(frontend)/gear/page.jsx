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
      <section className='relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-10'>
        <div className='pointer-events-none absolute inset-0 bg-blueprint opacity-60' />
        <div className='relative max-w-4xl space-y-6'>
          <PageIntro
            eyebrow='Setup'
            title={gearPage.title ?? 'Gear'}
            descriptions={
              introLines.length > 0
                ? introLines
                : 'Tools, hardware, software, and setup notes from the things I actually use or would recommend.'
            }
          />
          <div className='flex flex-wrap gap-3'>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              {gearItems.totalDocs} items
            </span>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              Homelab
            </span>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              Desk
            </span>
            <span className='rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground'>
              Dev tools
            </span>
          </div>
        </div>
      </section>

      <GearShowcase gearItems={gearItems.docs} />
    </div>
  );
}
