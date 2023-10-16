import Image from 'next/image';
import { Metadata } from 'next';

import Link from '@/components/ui/Link';
import Section from '@/components/Section';
import ConnectLinks from '@/components/ConnectLinks';
import Workplaces from '@/components/Workplaces';
// import Gallery from '@/components/Gallery';
import Syapse from '@/images/syapse.png';
import CRFHealth from '@/images/crfhealth.jpg';
import Amtrak from '@/images/amtrak.png';

import { skillsData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className='flex flex-col gap-16'>
      <div>
        <h1 className='animate-in text-3xl font-bold tracking-tight'>
          About Me
        </h1>
        <p
          className='animate-in text-secondary'
          style={{ '--index': 1 } as React.CSSProperties}
        >
          Just a quick glimpse.
        </p>
      </div>
      <div
        className='flex animate-in flex-col gap-16 md:gap-24'
        style={{ '--index': 3 } as React.CSSProperties}
      >
        <Section heading='About' headingAlignment='left'>
          <div className='flex flex-col gap-6'>
            <p>Hello world, I&apos;m Taylor Horwood!</p>
            <p>
              I'm a loving husband and father who loves spending time with my
              family, whether we're going on adventures, playing games, or just
              cuddling up on the couch. I'm also a bit of a jack-of-all-trades,
              with a passion for outdoor activities, working on cars, and
              creating things in my workshop.
            </p>
            <p>
              When I'm not spending time with my family, you'll find me outside
              gaming, hiking, biking, or at the gym. I'm also a bit of a car
              guy, and I love tinkering with cars.
            </p>
            <p>
              In my workshop, you'll find me building all sorts of things. I
              love the challenge of figuring out how to make things work, and
              I'm always coming up with new ideas for things to build.
            </p>
            <p>
              I'm also very passionate about technology. I have a homelab where
              I experiment with different software and hardware, and I also
              enjoy coding for fun. My hobbies have taught me valuable
              problem-solving skills and a desire to constantly learn and
              improve.
            </p>
            <p>
              I'm a well-rounded individual with a wide range of interests, and
              I always bring a unique perspective and a can-do attitude to every
              task.
            </p>
          </div>
        </Section>

        <Section heading='Connect' headingAlignment='left'>
          <div className='flex w-full flex-col gap-8'>
            <p>
              Have a question or just want to chat? Feel free to{' '}
              <a href='mailto:contact@tjhorwood.com' className='underline'>
                email me
              </a>
              .
            </p>
            <ul className='animated-list grid flex-grow grid-cols-1 gap-2 md:grid-cols-2'>
              {ConnectLinks.map((link) => (
                <li className='col-span-1 transition-opacity' key={link.label}>
                  <Link
                    href={link.href}
                    className='inline-grid w-full rounded-lg border border-neutral-200 p-4 no-underline transition-opacity dark:border-neutral-700'
                  >
                    <div className='flex items-center gap-3'>
                      <span className='text-xl'>{link.icon}</span>
                      {link.label}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='ml-auto h-5 w-5 text-secondary'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section heading='Skills' headingAlignment='left'>
          <div className='flex w-full flex-col gap-8'>
            <ul className='flex flex-wrap justify-start gap-2'>
              {skillsData.map((skill, index) => (
                <li
                  className='rounded-xl bg-secondary px-5 py-3 dark:text-primary'
                  key={index}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section heading='Work' headingAlignment='left'>
          <div className='flex w-full flex-col gap-8'>
            <p>
              {new Date().getFullYear() - 2011}+ years of professional
              development experience.
            </p>
            <p>
              I started my career teaching others how to code, which I will
              always be appreciative of. Then I worked at a few small local
              companies.
            </p>
            <Workplaces items={workplaces} />
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    title: 'Team Lead - Service Ops Engineering',
    company: 'Syapse',
    time: '2022 - 2023',
    imageSrc: Syapse,
    link: 'https://syapse.com',
    description: [
      {
        content:
          'Led a high-performing team of Service Operations Engineers in maintaining and enhancing critical applications within our Kubernetes-based microservices architecture.',
      },
      {
        content:
          'Orchestrated the seamless integration of various AWS services, including EKS, EC2, S3, RDS, and Lambda, to optimize application performance and reliability.',
      },
      {
        content:
          'Collaborated closely with DevOps teams to establish CI/CD pipelines, enabling automated testing and deployment processes that enhanced the overall development lifecycle.',
      },
      {
        content:
          'Successfully managed incident response and root cause analysis, reducing incident resolution time by 25% and preventing recurring issues through proactive measures.',
      },
      {
        content:
          'Mentored and coached team members, facilitating their professional growth and improving their technical skills, resulting in improved team performance and employee satisfaction.',
      },
      {
        content:
          'Conducted regular performance assessments, set clear goals, and provided constructive feedback, contributing to the continuous improvement of team capabilities.',
      },
    ],
  },
  {
    title: 'Sr. Service Ops Engineer',
    company: 'Syapse',
    time: '2022 - 2022',
    imageSrc: Syapse,
    link: 'https://syapse.com',
    description: [
      {
        content:
          'Led Amazon EKS cluster deployment for high availability, scalability, and performance.',
      },
      {
        content:
          'Introduced pod autoscaling and dynamic cluster scaling for adaptable workloads.',
      },
      {
        content:
          'Optimized resource use with automated pod rescheduling and node strategies.',
      },
      {
        content:
          'Pioneered Terraform IaC, ensuring consistent, reproducible deployments.',
      },
      {
        content:
          'Created reusable Terraform modules, slashing deployment time and errors.',
      },
      {
        content:
          'Analyzed resource patterns via CloudWatch and Prometheus, cutting costs and boosting app performance.',
      },
      {
        content:
          'Established full CI/CD pipelines (Jenkins, GitHub Actions, CircleCI, AWS) for rapid, reliable updates.',
      },
      {
        content:
          'Incorporated tests, scans, and approvals for quality and secure deployments.',
      },
      {
        content: 'Collaborated on robust Kubernetes and AWS security measures.',
      },
      {
        content:
          'Executed frequent security assessments, swiftly applying patches for strong defense.',
      },
      {
        content:
          'Implemented proactive system issue detection (Prometheus, Grafana, CloudWatch, Jenkins, Cypress).',
      },
      {
        content:
          'Led incident response, leveraging Kubernetes and AWS tools for minimal downtime.',
      },
      {
        content:
          'Mentored junior engineers in Kubernetes, Terraform, and AWS practices.',
      },
      {
        content:
          'Fostered learning through internal workshops, cross-team collaboration.',
      },
    ],
  },
  {
    title: 'Site Reliability Engineer',
    company: 'Syapse',
    time: '2018 - 2022',
    imageSrc: Syapse,
    link: 'https://syapse.com',
    description: [
      {
        content:
          'Responsible for infrastructure provisioning in AWS cloud environment using Terraform and Kubernetes. End to end deployment and implementation of application on public cloud infrastructure in various regions which uses most of AWS Compute and storage services along with PostgreSQL RDS, Aurora, DynamoDB, Redis, Elastic Search, & Kinesis.',
      },
      {
        content:
          'Configuration of service monitoring, application performance monitoring and application logging for cloud hosted environments and microservices.',
      },
      {
        content:
          'Automate microservice deployment and day to day tasks using Python, shell script and configuration management tools like Chef.',
      },
      {
        content:
          'Participate/work on disaster recovery (DR) plan, performance testing.',
      },
      {
        content:
          'Actively participate in identifying and resolving complex application and database issues, helping to identify issues in a 24x7 SaaS production environment.',
      },
      {
        content:
          'Perform database administration tasks such as database installation, replication, database backup, restore and database maintenance.',
      },
      {
        content:
          'Write automation scripts for customer data load jobs and scheduling of jobs.',
      },
      {
        content:
          'Perform application and database upgrades for hosted cloud environments for various release cycles.',
      },
      {
        content:
          'Participate in Application and database patching for bug fixes and customization requests.',
      },
      {
        content:
          'Provide training and maintain documentation for internal resources.',
      },
    ],
  },
  {
    title: 'Sr. Customer Success Engineer',
    company: 'Syapse',
    time: '2015 - 2018',
    imageSrc: Syapse,
    link: 'https://syapse.com',
    description: [
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
    ],
  },
  {
    title: 'Application Specialist',
    company: 'CRF Health',
    time: '2015 - 2015',
    imageSrc: CRFHealth,
    link: 'https://signanthealth.com/',
    description: [
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
    ],
  },
  {
    title: 'Tier II - Technical Support',
    company: 'CRF Health',
    time: '2013 - 2015',
    imageSrc: CRFHealth,
    link: 'https://signanthealth.com/',
    description: [
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
    ],
  },
  {
    title: 'Application Support Analyst',
    company: 'Amtrak',
    time: '2011 - 2013',
    imageSrc: Amtrak,
    link: 'https://amtrak.com',
    description: [
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
      { content: '' },
    ],
  },
];
