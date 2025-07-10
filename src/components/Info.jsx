import Section from '@/components/Section';
import AnimatedContent from '@/components/animations/AnimatedContent';

export default function Info() {
  return (
    <div>
      <Section heading='About' headingAlignment='left'>
        <AnimatedContent delay={0.2}>
          <div className='flex flex-col gap-6'>
            <p>Hello world, I&apos;m Taylor Horwood!</p>
            <p>
              I&apos;m a DevOps/SRE engineer with a passion for solving complex
              problems and building reliable and scalable systems. I&apos;m also a
              loving husband and father who loves spending time with my family,
              whether we&apos;re going on adventures, playing games, or just
              cuddling up on the couch watching a good movie. When I&apos;m not
              spending time with my family, you&apos;ll find me outside hiking,
              biking, gaming, at the gym, or tinkering with technology.{' '}
            </p>
            <p>
              I&apos;m also super passionate about technology outside of work. I
              have a homelab where I experiment with different software and
              hardware, and I also enjoy coding for fun.
            </p>
            <p>
              My hobbies have taught me valuable skills that are directly
              transferable to my work, such as:
            </p>
            <ul className='ml-6 list-disc space-y-2'>
              <li>
                <strong>Problem-solving</strong>: I&apos;m able to think
                critically and creatively to solve complex problems, both big and
                small.
              </li>
              <li>
                <strong>Learning agility</strong>: I&apos;m constantly learning
                new things and staying up-to-date on the latest technologies.
              </li>
              <li>
                <strong>Attention to detail</strong>: I&apos;m meticulous in my
                work and have a high degree of attention to detail.
              </li>
              <li>
                <strong>Communication and teamwork</strong>: I&apos;m an effective
                communicator and team player, able to collaborate with others to
                achieve common goals.
              </li>
            </ul>
            <p>
              I&apos;m a bit of a jack-of-all-trades, with a passion for outdoor
              activities, working on cars, creating things, and solving problems.
              I&apos;m also a well-rounded individual with a wide range of
              interests, and I always bring a unique perspective and a can-do
              attitude to every task.
            </p>
          </div>
        </AnimatedContent>
      </Section>
    </div>
  );
}
