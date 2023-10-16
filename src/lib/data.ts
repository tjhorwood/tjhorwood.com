import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { CgWorkAlt } from 'react-icons/cg';
import { FaEnvelope } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';

import capforgeImg from '@/images/capforge.png';
import nationalleaguegamingImg from '@/images/nationalleaguegaming.png';
import sahustudioImg from '@/images/sahustudio.png';
import standardcbdImg from '@/images/standardcbd.png';
import terplandiaImg from '@/images/terplandia.png';

export const links = [
  { label: 'About', href: '/about' },
  { label: 'Gear', href: '/gear' },
  { label: 'Projects', href: '/projects' },
] as const;

export const socialsData = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/tjhorwood',
    icon: BsLinkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/tjhorwood',
    icon: BsGithub,
  },
  {
    name: 'Email',
    href: 'mailto:contact@tjhorwood.com',
    icon: FaEnvelope,
  },
] as const;

export const skillsData = [
  'Kubernetes',
  'Terraform',
  'Docker',
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Git',
  'Tailwind',
  'Prisma',
  'MongoDB',
  'Redux',
  'GraphQL',
  'Apollo',
  'Express',
  'PostgreSQL',
  'MySQL',
  'Python',
  'Django',
  'Framer Motion',
  'Wordpress',
  'Webflow',
] as const;

export const experiencesData = [
  {
    title: "Associate's Degree",
    location: 'Kaplan University',
    description:
      'I graduated with my Associates Degree in Computer Networking.',
    icon: React.createElement(LuGraduationCap),
    date: '2011',
  },
  {
    title: 'Application Support Analyst',
    location: 'Amtrak',
    description:
      'Responsible for delivering comprehensive support for vital internal tools. These tools encompassed diverse functions, including time entry, parts procurement, travel reservation, and other essential operations across the United States.',
    icon: React.createElement(CgWorkAlt),
    date: '2011 - 2013',
  },
  {
    title: 'Tier II Technical Support Specialist',
    location: 'CRF Health',
    description:
      'Managed escalated calls from the Tier I helpdesk, swiftly resolving issues by providing clear instructions. I also contributed to our support ecosystem by crafting knowledge base articles and training Tier I agents on various topics. Moreover, I conducted thorough local testing of wireless and landline networks in multiple countries to enhance network reliability and operational efficiency.',
    icon: React.createElement(CgWorkAlt),
    date: '2013 - 2015',
  },
  {
    title: 'Application Specialist',
    location: 'CRF Health',
    description:
      'Developed applications for handheld and tablet devices based on client clinical protocols and needs. I actively participated in client meetings to gather functional requirements, ensuring proper documentation. I provided guidance to clients on feasible solutions and proposed remedies for changing requirements or issues. Collaborating closely with Project Managers, I ensured thorough application design reviews and compliance with clinical protocols. I also implemented data post-processing tools using programming languages like Java and contributed to maintaining high-quality service, on-time project delivery, and team training.',
    icon: React.createElement(CgWorkAlt),
    date: '2015 - 2015',
  },
  {
    title: "Bachelor's Degree",
    location: 'Purdue University',
    description:
      "I graduated with my Bachelor's Degree in Information Technology.",
    icon: React.createElement(LuGraduationCap),
    date: '2011',
  },
  {
    title: 'Sr. Customer Success Engineer',
    location: 'Syapse',
    description:
      'Provided comprehensive technical and application support to Syapse system end-users via email, phone, and video channels, contributing to optimal patient care quality. I efficiently identified and resolved incidents by collaborating with internal teams and customers, while also debugging code and implementing solutions in accordance with software development practices. My responsibilities extended to monitoring backend processes for application uptime and compliance with service level agreements. Additionally, I demonstrated proficiency in Python and JavaScript by integrating external systems and configuring the Syapse application, and I adeptly generated custom reports from databases to fulfill data utilization requirements.',
    icon: React.createElement(CgWorkAlt),
    date: '2015 - 2018',
  },
  {
    title: 'Site Reliability Engineer',
    location: 'Syapse',
    description:
      'Led infrastructure provisioning using Terraform and Kubernetes in AWS cloud environments, facilitating end-to-end application deployment across regions. I orchestrated services like PostgreSQL RDS, Aurora, DynamoDB, and more, ensuring optimal performance and reliability. I automated microservice deployment and tasks through Python, shell scripting, and Chef, while actively participating in disaster recovery planning and issue resolution within a 24x7 SaaS setup. Additionally, I managed database tasks, performed upgrades, and participated in patching, all while contributing to internal training and documentation efforts.',
    icon: React.createElement(CgWorkAlt),
    date: '2018 - 2022',
  },
  {
    title: 'Sr. Service Operations Engineer',
    location: 'Syapse',
    description:
      'I orchestrated Amazon EKS cluster deployment with a focus on high availability and scalability. I introduced adaptive features like pod autoscaling and dynamic cluster scaling while optimizing resource utilization through automated strategies. By pioneering Terraform IaC, I ensured consistent and efficient deployments, aided by reusable modules that expedited the process. I streamlined operations through CloudWatch and Prometheus, achieving cost savings and enhanced app performance. My leadership extended to establishing robust CI/CD pipelines, incorporating tests and security checks for reliable deployments. I collaborated on Kubernetes and AWS security measures, conducted frequent assessments, and led proactive system issue detection efforts. Additionally, I mentored junior engineers, emphasizing learning through workshops and cross-team collaboration.',
    icon: React.createElement(CgWorkAlt),
    date: '2022 - 2022',
  },
  {
    title: 'Team Lead, Service Operations Engineering',
    location: 'Syapse',
    description:
      "Steered a high-performing team of Service Operations Engineers, overseeing critical applications in our Kubernetes-based microservices setup. I orchestrated the integration of AWS services like EKS, EC2, S3, RDS, and Lambda to optimize application performance. Collaborating closely with DevOps teams, I established efficient CI/CD pipelines, reducing incident resolution time by 25% and proactively addressing recurring issues. I prioritized mentorship and coaching, cultivating team members' growth and technical skills for enhanced performance and satisfaction. Through regular assessments, goal-setting, and feedback, I continually elevated team capabilities, contributing to our collective success.",
    icon: React.createElement(CgWorkAlt),
    date: '2022 - Present',
  },
] as const;

export const projectsData = [
  {
    title: 'National League Gaming',
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
    imageUrl: nationalleaguegamingImg,
    href: 'https://nationalleaguegaming.com',
  },
  {
    title: 'StandardCBD',
    description:
      'StandardCBD is an e-commerce platform, specializing in the retail of a comprehensive array of CBD, delta-8, and delta-9 products. The product range spans vapes, creams, edibles, and tinctures, catering to a discerning clientele seeking high-quality solutions in the realm of wellness and alternative remedies.',
    tags: ['Wordpress', 'WooCommerce', 'ShipStation'],
    imageUrl: standardcbdImg,
    href: 'https://standardcbd.com',
  },
  {
    title: 'Terplandia',
    description:
      'Terplandia is an e-commerce platform dedicated to the retail of terpenes sourced from hemp derivatives. The platform offers a curated selection of these premium terpenes, catering to a discerning clientele seeking to explore and integrate these natural compounds into various applications.',
    tags: ['Wordpress', 'WooCommerce', 'ShipStation'],
    imageUrl: terplandiaImg,
    href: 'https://terplandia.com',
  },
  {
    title: 'CapForge',
    description:
      'CapForge offers a comprehensive online platform catering to a diverse range of business needs, encompassing areas such as bookkeeping, taxation, payroll administration, strategic consulting, Amazon and e-commerce facilitation, as well as startup support.',
    tags: ['Wordpress'],
    imageUrl: capforgeImg,
    href: 'https://capforge.com',
  },
  {
    title: 'Sahu Studio',
    description:
      'Sahu Studio is the online home of a talented friend who brings interior design dreams to life. This platform serves as both her creative playground and a showcase of her remarkable skills, featuring a captivating array of interior design projects, personalized paintings, and enchanting resin art pieces.',
    tags: ['Wordpress'],
    imageUrl: sahustudioImg,
    href: 'https://sahustudio.me',
  },
] as const;
