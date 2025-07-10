import AnimatedContent from "@/components/animations/AnimatedContent";

export const metadata = {
  title: 'Blog',
  description: 'My Blog',
};

export default function Blog() {
  return (
    <div className='flex flex-col gap-12'>
      <div>
        <AnimatedContent>
          <h1 className='text-3xl font-bold tracking-tight'>Blog</h1>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <p className='text-primary/60'>0 posts so far. Stay tuned for more!</p>
        </AnimatedContent>
      </div>
    </div>
  );
}
