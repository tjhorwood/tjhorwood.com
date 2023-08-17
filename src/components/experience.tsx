'use client'

import React from 'react'
import SectionHeading from './section-heading'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { experiencesData } from '@/lib/data'
import { useSectionInView } from '@/lib/hooks'
import { useTheme } from '@/context/theme-context'

export default function Experience() {
  const { ref } = useSectionInView('Experience')
  const { theme } = useTheme()

  return (
    <section id="experience" ref={ref} className="mb-28 scroll-mt-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === 'light' ? '#e5e7eb' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
                border: '1px solid rgba(0, 0, 0, 0)',
                borderRadius: '0.75rem',
                textAlign: 'left',
                padding: '1.3rem 2rem',
              }}
              contentArrowStyle={{
                borderRight:
                  theme === 'light'
                    ? '0.75rem solid #e5e7eb'
                    : '0.75rem solid rgba(255, 255, 255, 0.1)',
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === 'light' ? '#e5e7eb' : 'rgba(255, 255, 255, 0.1)',
                fontSize: '1.5rem',
              }}
            >
              <h3 className="text-lg font-semibold capitalize">{item.title}</h3>
              <p className="!mt-0 font-normal">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  )
}
