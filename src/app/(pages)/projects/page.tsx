'use client';
import Image from 'next/image';
import React from 'react';

import { Card, Carousel } from '@/components/ui/apple-cards-carousel';

import capforgeImg from '@/images/capforge.png';
import healthsyncImg from '@/images/healthsync/healthsync.png';
import healthsyncThumbnailImg from '@/images/healthsync/healthsync-thumbnail.webp';
import nlgImg from '@/images/nlg/nlg.png';
import nlgThumbnailImg from '@/images/nlg/nlg-thumbnail.webp';
import sahustudioImg from '@/images/sahustudio.png';
import standardcbdImg from '@/images/standardcbd.png';

export default function Projects() {
  const cards = projectData.map((card, index) => (
    <Card key={index} card={card} index={index} />
  ));
  return (
    <div className='flex flex-col'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
        <p className='text-secondary'>
          Here are a few of the projects I have worked on.
        </p>
      </div>
      <div>
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const ProjectContent = ({ title, description, tags, src }: any) => {
  return (
    <div key={title} className='flex flex-col space-y-6'>
      <div>
        <ul className='flex flex-wrap gap-2'>
          {tags.map((tag: any, index: any) => (
            <li
              key={index}
              className='rounded-2xl bg-tertiary px-3 py-1 text-sm uppercase text-primary md:text-base'
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className='rounded-2xl bg-tertiary p-10'>
        <p className='mx-auto font-sans text-primary md:text-xl lg:text-2xl'>
          {description}
        </p>
      </div>
      <div className='rounded-2xl shadow-xl'>
        <Image
          src={src}
          alt={title}
          className='mx-auto h-full w-full rounded-2xl object-cover object-top'
        />
      </div>
    </div>
  );
};

const projectData = [
  {
    category: 'App Landing Page',
    title: 'Health Sync',
    src: healthsyncThumbnailImg,
    content: (
      <ProjectContent
        description='Health Sync introduces a wellness app designed to enhance productivity, focus, and overall well-being. It features bodyweight exercises, yoga, guided meditation, and breathwork, all accessible from home. The app is noted for its simple interface, daily fresh content, and health insurance-approved fitness programs. It also provides resources for incorporating well-being practices into family life. The platform is available on macOS and Windows.'
        src={healthsyncImg}
        tags={['React', 'Next.js', 'Tailwind']}
        href='https://health-sync.org'
      />
    ),
  },
  {
    category: 'Esports League',
    title: 'National League Gaming',
    src: nlgThumbnailImg,
    content: (
      <ProjectContent
        description='National League Gaming stands as an integrated platform tailored to meet the requirements of individual gamers aspiring to compete at a high level. This encompassing platform provides a spectrum of offerings including skill development through training modules, engagement in both complimentary and fee-based leagues, all of which present opportunities for participants to compete for substantial monetary rewards across the entirety of these competitive arenas.'
        src={nlgImg}
        tags={[
          'React',
          'Next.js',
          'Tailwind',
          'Prisma',
          'PostgreSQL',
          'Stripe',
          'SendGrid',
        ]}
        href='https://nationalleaguegaming.com'
      />
    ),
  },
  {
    category: 'Ecommerce',
    title: 'StandardCBD',
    src: standardcbdImg,
    content: (
      <ProjectContent
        description='StandardCBD is an e-commerce platform, specializing in the retail of a comprehensive array of CBD, delta-8, and delta-9 products. The product range spans vapes, creams, edibles, and tinctures, catering to a discerning clientele seeking high-quality solutions in the realm of wellness and alternative remedies.'
        src={standardcbdImg}
        tags={['Wordpress', 'WooCommerce', 'ShipStation']}
        href='https://standardcbd.com'
      />
    ),
  },
  {
    category: 'Financal / Bookkeeping',
    title: 'CapForge',
    src: capforgeImg,
    content: (
      <ProjectContent
        description='CapForge offers a comprehensive online platform catering to a diverse range of business needs, encompassing areas such as bookkeeping, taxation, payroll administration, strategic consulting, Amazon and e-commerce facilitation, as well as startup support.'
        src={capforgeImg}
        tags={['Wordpress']}
        href='https://capforge.com'
      />
    ),
  },
  {
    category: 'Portfolio',
    title: 'Sahu Studio',
    src: sahustudioImg,
    content: (
      <ProjectContent
        description='Sahu Studio is the online home of a talented friend who brings interior design dreams to life. This platform serves as both her creative playground and a showcase of her remarkable skills, featuring a captivating array of interior design projects, personalized paintings, and enchanting resin art pieces.'
        src={sahustudioImg}
        tags={['Wordpress']}
        href='https://sahustudio.me'
      />
    ),
  },
];
