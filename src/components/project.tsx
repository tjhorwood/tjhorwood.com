'use client'

import { useRef } from 'react'
import { projectsData } from '@/lib/data'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

type ProjectProps = (typeof projectsData)[number]

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  href,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  })
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 last:mb-0 sm:mb-8"
    >
      <section className="relative max-w-[48rem] overflow-hidden rounded-xl bg-gray-200 transition hover:bg-gray-300 dark:bg-white/10  dark:text-white dark:hover:bg-white/20 sm:h-auto sm:pr-8 sm:group-even:pl-8">
        <div className="flex h-full flex-col space-y-6 px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-[18rem] md:max-w-[55%] lg:max-w-[60%]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <li
                className="rounded-full bg-black/20 px-3 py-1 text-[0.75rem] uppercase tracking-wider text-gray-900 dark:bg-white/10 dark:text-white"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
          <a href={href} target="_blank">
            <button className="flex w-auto items-center rounded-full bg-gray-900 px-8 py-2 text-lg text-white outline-none transition hover:scale-105 dark:bg-white/80 dark:text-gray-900">
              Visit site
            </button>
          </a>
        </div>

        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute -right-40 top-8 hidden w-[28.25rem] rounded-t-lg shadow-2xl transition group-even:-left-40 group-even:right-[initial] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 sm:block"
        />
      </section>
    </motion.div>
  )
}
