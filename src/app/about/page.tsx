import { Metadata } from 'next';

import { skillsData } from '@/lib/data';

import ConnectLinks from '@/components/ConnectLinks';
import Section from '@/components/Section';
import Link from '@/components/ui/Link';
import Workplaces from '@/components/Workplaces';

import Amtrak from '@/images/amtrak.png';
import CRFHealth from '@/images/crfhealth.jpg';
import Syapse from '@/images/syapse.png';
import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';

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
              I'm a DevOps/SRE engineer with a passion for solving complex
              problems and building reliable and scalable systems. I'm also a
              loving husband and father who loves spending time with my family,
              whether we're going on adventures, playing games, or just cuddling
              up on the couch watching a good movie. I'm a bit of a
              jack-of-all-trades, with a passion for outdoor activities, working
              on cars, and creating things in my workshop.
            </p>
            <p>
              When I'm not spending time with my family, you'll find me outside
              hiking, biking, gaming, or at the gym. I'm also a bit of a car
              guy, and I love tinkering with cars.
            </p>
            <p>
              I'm also super passionate about technology outside of work. I have
              a homelab where I experiment with different software and hardware,
              and I also enjoy coding for fun.
            </p>
            <p>
              My hobbies have taught me valuable skills that are directly
              transferable to my work, such as:
            </p>
            <ul className='ml-6 list-disc space-y-2'>
              <li>
                <strong>Problem-solving</strong>: I'm able to think critically
                and creatively to solve complex problems, both big and small.
              </li>
              <li>
                <strong>Learning agility</strong>: I'm constantly learning new
                things and staying up-to-date on the latest technologies.
              </li>
              <li>
                <strong>Attention to detail</strong>: I'm meticulous in my work
                and have a high degree of attention to detail.
              </li>
              <li>
                <strong>Communication and teamwork</strong>: I'm an effective
                communicator and team player, able to collaborate with others to
                achieve common goals.
              </li>
            </ul>
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
              {new Date().getFullYear() - 2011}+ years of diverse professional
              experience.
            </p>
            <p>
              I began my career in customer facing roles, where I developed
              strong communication and interpersonal skills. I then transitioned
              to a technical support role, where I discovered my passion for
              technology. I have since progressed up the ranks, gaining
              expertise in cloud computing, software development, and data
              science. I am very passionate about using technology to solve
              real-world problems and make a positive impact on the world.
            </p>
            <Workplaces items={workplaces} />
            <Button
              className='bg-secondary text-center'
              variant='default'
              size='lg'
            >
              <a
                className='flex w-full cursor-pointer items-center gap-2 rounded-lg outline-none'
                href='/resume.pdf'
                download
              >
                Download Resume <FiDownload className='h-4 w-4' />
              </a>
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    title: 'Team Lead, Service Ops Engineering',
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
      {
        content:
          'Provide email, telephone, and video-based technical and application support to end-users of the Syapse system to help ensure quality of care for our customers’ patients.',
      },
      {
        content:
          'Triage and identify solutions to customer incidents and communicate them to Syapse, both internally and to customers.',
      },
      {
        content:
          'Debug incidents in code to find the root cause of issues and develop solutions following the software development lifecycle.',
      },
      {
        content:
          'Monitor and manage back-end processes to ensure application uptime requirements and service level agreement compliance.',
      },
      {
        content:
          'Develop customized reports from databases to extract and collect data for utilization reporting needs.',
      },
      {
        content:
          'Maintain a detailed understanding of product architecture, technical components, and application functionality, e.g., by configuring the Syapse application and integrating external systems using Python and JavaScript.',
      },
    ],
  },
  {
    title: 'Application Specialist',
    company: 'CRF Health',
    time: '2015 - 2015',
    imageSrc: CRFHealth,
    link: 'https://signanthealth.com/',
    description: [
      {
        content:
          'Build applications for handheld and tablet platforms according to the requirements gathered and interpretation of the client clinical protocol. Actively participated in client/design/review meetings and performed functional requirements gathering and documentation creation. Also provided guidance to the client on the most suitable solution, ensuring that all recommendations are achievable within the scope of the product.',
      },
      {
        content:
          'Investigate and propose solutions for change in requirements or potential issue/bug. Work with the Project Managers to ensure complete review of application design for end user use and adherence to a clinical protocol. Support development, review and approval of project related study documentation during the course of the Project Lifecycle, ensure documentation is complete and of a high quality. Present solutions at client design review and testing meetings at customer sites (as needed).',
      },
      {
        content:
          'Implemented data post-processing tools using Java or other programming languages (Python, Ruby, JavaScript, XML). ',
      },
      {
        content:
          'Ensure that the Project Team maintains a high quality service and on time delivery of project outputs for the client. Ensure knowledge and understanding remains up-to-date with software releases and updates. Supported the on-boarding and training/mentoring of new hires.',
      },
    ],
  },
  {
    title: 'Tier II, Technical Support',
    company: 'CRF Health',
    time: '2013 - 2015',
    imageSrc: CRFHealth,
    link: 'https://signanthealth.com/',
    description: [
      {
        content:
          'Provide support for escalated calls from Tier I helpdesk. Ensuring tickets are responded to and resolved in a timely and accurate manner by providing clear and concise instructions and resolutions for escalated issues.',
      },
      {
        content:
          'Create knowledge base articles and conduct training to Tier I agents on new technologies, best practices for supporting a site or patient call, client specific material, among other topics.',
      },
      {
        content:
          'Perform local testing and validation of the wireless carrier and landline network infrastructure in various countries world-wide.',
      },
    ],
  },
  {
    title: 'Application Support Analyst',
    company: 'Amtrak',
    time: '2011 - 2013',
    imageSrc: Amtrak,
    link: 'https://amtrak.com',
    description: [
      {
        content:
          'Front End Support for Amtrak Applications (WMS, eTrax and Maximo). Worked with multiple groups to provide excellent customer service and troubleshooting skills, in order to promptly resolve any and all issues that arise. Also played a primary role in the integration of RSA Tokens to allow remote access into Amtrak’s Network.',
      },
      {
        content:
          'WMS (Work Management System) – Monitor, update and troubleshoot over 500 WMS Thin Clients (kiosks used by mechanical employees to enter time, complete reports and order train parts) and over 130 IP Time Clocks (used to clock in and out with SMARTID badges).',
      },
      {
        content:
          'eTrax – Procurement application used by Amtrak employees to process purchase requisitions, payment requests, expense reports, and book travel. My duty was to monitor and maintain the application, as well as assist its users with all aspects of the site.',
      },
      {
        content:
          'Maximo – Monitor, update and troubleshoot over 70 TEDs (Time Entry Devices, used by engineering employees to swipe in and out). Also assist employees with issues being experienced with time entry and inspections they are performing on both a computer and on a mobile device.',
      },
    ],
  },
];
