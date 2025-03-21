import {
  SiKubernetes,
  SiTerraform,
  SiDocker,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiGit,
  SiTailwindcss,
  SiGo,
  SiAngular,
  SiWebflow,
  SiWordpress,
  SiFramer,
  SiDjango,
  SiRedux,
  SiApollographql,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMariadb,
  SiMongodb,
  SiSqlite,
  SiGraphql,
  SiRedis,
  SiPrisma,
  SiVim,
  SiGnubash,
  SiZsh,
  SiGithub,
  SiGitlab,
  SiJenkins,
  SiCircleci,
  SiPrometheus,
  SiGrafana,
  SiJira,
  SiConfluence,
  SiSalesforce,
  SiAmazonwebservices,
} from 'react-icons/si';

import { VscVscode } from 'react-icons/vsc';

import Amtrak from '@/assets/images/amtrak.webp';
import capforgeImg from '@/assets/images/capforge.webp';
import capforgeImgShort from '@/assets/images/capforge-short.webp';
import Citi from '@/assets/images/citi.webp';
import CRFHealth from '@/assets/images/crfhealth.webp';
import healthsyncImg from '@/assets/images/healthsync/healthsync.webp';
import healthsyncImgShort from '@/assets/images/healthsync/healthsync-short.webp';
import nlgImg from '@/assets/images/nlg/nlg.webp';
import nlgImgShort from '@/assets/images/nlg/nlg-short.webp';
import sahustudioImg from '@/assets/images/sahustudio/sahustudio.webp';
import sahustudioImgShort from '@/assets/images/sahustudio/sahustudio-short.webp';
import standardcbdImg from '@/assets/images/standardcbd.webp';
import standardcbdImgShort from '@/assets/images/standardcbd-short.webp';
import Syapse from '@/assets/images/syapse.webp';

export const projectsData = [
  {
    slug: 'sahu-studio',
    category: 'Artistic Portfolio',
    title: 'Sahu Studio',
    src: sahustudioImg,
    srcShort: sahustudioImgShort,
    description:
      'Sahu Studio is the online home of a talented friend who brings interior design dreams to life. This platform serves as both her creative playground and a showcase of her remarkable skills, featuring a captivating array of interior design projects, personalized paintings, and enchanting resin art pieces.',
    tags: ['React', 'Next.js', 'Tailwind', 'PayloadCMS', 'PostgreSQL'],
    href: 'https://sahustudio.me',
  },
  {
    slug: 'health-sync',
    category: 'App Landing Page',
    title: 'Health Sync',
    src: healthsyncImg,
    srcShort: healthsyncImgShort,
    description:
      'Health Sync introduces a wellness app designed to enhance productivity, focus, and overall well-being. It features bodyweight exercises, yoga, guided meditation, and breathwork, all accessible from home. The app is noted for its simple interface, daily fresh content, and health insurance-approved fitness programs. It also provides resources for incorporating well-being practices into family life. The platform is available on macOS and Windows.',
    tags: ['React', 'Next.js', 'Tailwind'],
    href: 'https://health-sync.org',
    sourceCode: 'https://github.com/tjhorwood/health-sync',
  },
  {
    slug: 'national-league-gaming',
    category: 'Esports League',
    title: 'National League Gaming',
    src: nlgImg,
    srcShort: nlgImgShort,
    description:
      'National League Gaming stands as an integrated platform tailored to meet the requirements of individual gamers aspiring to compete at a high level. This encompassing platform provides a spectrum of offerings including skill development through training modules, engagement in both complimentary and fee-based leagues, all of which present opportunities for participants to compete for substantial monetary rewards across the entirety of these competitive arenas.',
    tags: [
      'React',
      'Next.js',
      'Tailwind',
      'Prisma',
      'PostgreSQL',
      'Stripe',
      'SendGrid',
    ],
    href: 'https://nationalleaguegaming.com',
  },
  {
    slug: 'standardcbd',
    category: 'Ecommerce',
    title: 'StandardCBD',
    src: standardcbdImg,
    srcShort: standardcbdImgShort,
    description:
      'StandardCBD is an e-commerce platform, specializing in the retail of a comprehensive array of CBD, delta-8, and delta-9 products. The product range spans vapes, creams, edibles, and tinctures, catering to a discerning clientele seeking high-quality solutions in the realm of wellness and alternative remedies.',
    tags: ['Wordpress', 'WooCommerce', 'ShipStation'],
    href: 'https://standardcbd.com',
  },
  {
    slug: 'capforge',
    category: 'Financal / Bookkeeping',
    title: 'CapForge',
    src: capforgeImg,
    srcShort: capforgeImgShort,
    description:
      'CapForge offers a comprehensive online platform catering to a diverse range of business needs, encompassing areas such as bookkeeping, taxation, payroll administration, strategic consulting, Amazon and e-commerce facilitation, as well as startup support.',
    tags: ['Wordpress'],
    href: 'https://capforge.com',
  },
];

export const workplacesData = [
  {
    title: 'Sr. Site Reliability Engineer',
    company: 'Citi',
    time: '2024 - Present',
    imageSrc: Citi,
    link: 'https://citi.com',
    description: [
      {
        content:
          "Lead SRE practices for Citi's Consumer Sector, focusing on stability, efficiency, and effectiveness of critical applications",
      },
      {
        content:
          'Implement and manage SLOs, error budgets, and actionable alerts',
      },
      {
        content:
          'Drive resiliency engineering using tools like Chaos Monkey and Gremlin',
      },
      {
        content:
          'Conduct blameless postmortems and develop executive briefings on major incidents',
      },
      {
        content: 'Spearhead toil reduction and automation initiatives',
      },
      {
        content:
          'Utilize cloud technologies including Docker, Kubernetes, and OpenShift',
      },
      {
        content:
          'Apply GenAI, AI, and ML concepts to improve system performance and predictive analytics',
      },
      {
        content:
          'Develop solutions using Java, Go, Python, and shell scripting',
      },
      {
        content:
          'Manage SQL/NoSQL databases and work with microservices architecture',
      },
      {
        content: 'Present technical strategies and improvements to leadership',
      },
    ],
  },
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

export const skillsData = [
  {
    name: 'Kubernetes',
    icon: SiKubernetes,
    css: 'text-[#326CE5]',
  },
  {
    name: 'Terraform',
    icon: SiTerraform,
    css: 'text-[#844FBA]',
  },
  {
    name: 'Docker',
    icon: SiDocker,
    css: 'text-[#2496ED]',
  },
  {
    name: 'HTML5',
    icon: SiHtml5,
    css: 'text-[#E34F26]',
  },
  {
    name: 'CSS3',
    icon: SiCss3,
    css: 'text-[#1572B6]',
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    css: 'text-[#F7DF1E]',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    css: 'text-[#3178C6]',
  },
  {
    name: 'React',
    icon: SiReact,
    css: 'text-[#61DAFB]',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    css: 'text-neutral-900 dark:text-white',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    css: 'text-[#5FA04E]',
  },
  {
    name: 'Git',
    icon: SiGit,
    css: 'text-[#F05032]',
  },
  {
    name: 'Tailwind',
    icon: SiTailwindcss,
    css: 'text-[#06B6D4]',
  },
  {
    name: 'Redux',
    icon: SiRedux,
    css: 'text-[#764ABC]',
  },
  {
    name: 'Express',
    icon: SiExpress,
    css: 'text-neutral-900 dark:text-white',
  },
  {
    name: 'Python',
    icon: SiPython,
    css: 'text-[#3776AB]',
  },
  {
    name: 'Django',
    icon: SiDjango,
    css: 'text-[#092E20]',
  },
  {
    name: 'Framer Motion',
    icon: SiFramer,
    css: 'text-[#0055FF]',
  },
  {
    name: 'Wordpress',
    icon: SiWordpress,
    css: 'text-[#21759B]',
  },
  {
    name: 'Webflow',
    icon: SiWebflow,
    css: 'text-[#146EF5]',
  },
  {
    name: 'Angular',
    icon: SiAngular,
    css: 'text-neutral-900 dark:text-white',
  },
  {
    name: 'Go',
    icon: SiGo,
    css: 'text-[#00ADD8]',
  },
];

export const databaseData = [
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    css: 'text-[#4169E1]',
  },
  {
    name: 'MySQL',
    icon: SiMysql,
    css: 'text-[#4479A1]',
  },
  {
    name: 'MariaDB',
    icon: SiMariadb,
    css: 'text-[#003545]',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    css: 'text-[#47A248]',
  },
  {
    name: 'SQLite',
    icon: SiSqlite,
    css: 'text-[#003B57]',
  },
  {
    name: 'GraphQL',
    icon: SiGraphql,
    css: 'text-[#E10098]',
  },
  {
    name: 'Apollo GraphQL',
    icon: SiApollographql,
    css: 'text-[#311C87]',
  },
  {
    name: 'Redis',
    icon: SiRedis,
    css: 'text-[#FF4438]',
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    css: 'text-[#2D3748]',
  },
];

export const platformData = [
  {
    name: 'Visual Studio Code',
    icon: VscVscode,
    css: 'text-[#2F80ED]',
  },
  {
    name: 'Vim',
    icon: SiVim,
    css: 'text-[#019733]',
  },
  {
    name: 'Bash',
    icon: SiGnubash,
    css: 'text-[#4EAA25]',
  },
  {
    name: 'ZSH',
    icon: SiZsh,
    css: 'text-[#F15A24]',
  },
  {
    name: 'Github',
    icon: SiGithub,
    css: 'text-neutral-900 dark:text-white',
  },
  {
    name: 'Gitlab',
    icon: SiGitlab,
    css: 'text-[#FC6D26]',
  },
  {
    name: 'AWS',
    icon: SiAmazonwebservices,
    css: 'text-[#232F3E]',
  },
  {
    name: 'Jenkins',
    icon: SiJenkins,
    css: 'text-[#D24939]',
  },
  {
    name: 'CircleCI',
    icon: SiCircleci,
    css: 'text-neutral-900 dark:text-white',
  },
  {
    name: 'Prometheus',
    icon: SiPrometheus,
    css: 'text-[#E6522C]',
  },
  {
    name: 'Grafana',
    icon: SiGrafana,
    css: 'text-[#F46800]',
  },
  {
    name: 'Jira',
    icon: SiJira,
    css: 'text-[#0052CC]',
  },
  {
    name: 'Confluence',
    icon: SiConfluence,
    css: 'text-[#172B4D]',
  },
  {
    name: 'Salesforce',
    icon: SiSalesforce,
    css: 'text-[#00A1E0]',
  },
];
