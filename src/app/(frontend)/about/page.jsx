import AnimatedContent from '@/components/animations/AnimatedContent';
import Info from '@/components/Info';
import ListSection from '@/components/ListSection';
import PageIntro from '@/components/PageIntro';
import Work from '@/components/Work';
import { getIcon } from '@/lib/iconMap';
import { getMediaUrl } from '@/lib/media';
import { getAboutPage, getProfile } from '@/payload/queries/getGlobals';
import { getTechnologiesByCategory } from '@/payload/queries/getTechnologiesByCategory';
import { getWorkExperience } from '@/payload/queries/getWorkExperience';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const aboutPage = await getAboutPage();
  return {
    description: aboutPage.seo?.description ?? 'About Me',
    title: aboutPage.seo?.title ?? 'About',
  };
}
function toListItems(docs) {
  return docs.map((item) => ({
    css: item.colorClass,
    icon: getIcon(item.icon || item.name),
    name: item.name,
  }));
}
export default async function About() {
  const [aboutPage, profile, skills, platforms, databases, work] =
    await Promise.all([
      getAboutPage(),
      getProfile(),
      getTechnologiesByCategory('skills'),
      getTechnologiesByCategory('platforms'),
      getTechnologiesByCategory('databases'),
      getWorkExperience(),
    ]);
  return (
    <div className='flex flex-col gap-12'>
      <PageIntro
        title={aboutPage.title ?? 'About Me'}
        descriptions={aboutPage.intro ?? 'Just a quick glimpse.'}
        descriptionClassName='text-neutral-600 dark:text-neutral-400'
      />
      <div className='flex flex-col gap-16 md:gap-24'>
        <AnimatedContent delay={0.2}>
          <Info
            paragraphs={aboutPage.paragraphs ?? []}
            strengths={aboutPage.strengths ?? []}
          />
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <ListSection heading='Skills' data={toListItems(skills.docs)} />
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <ListSection
            heading='Tools & Platforms'
            data={toListItems(platforms.docs)}
          />
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <ListSection heading='Databases' data={toListItems(databases.docs)} />
        </AnimatedContent>
        <Work items={work.docs} resumeUrl={getMediaUrl(profile.resume)} />
      </div>
    </div>
  );
}
