'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { BsArrowRight } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import { useSectionInView } from '@/lib/hooks'
import { socialsData } from '@/lib/data'
import ProfilePic from '@/images/profile-pic.jpg'

export default function Intro() {
  const { ref } = useSectionInView('Home', 0.5)

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-4xl scroll-mt-[100rem] text-center md:mb-0"
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 sm:gap-6 md:flex-row md:items-start md:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
          >
            <Image
              src={ProfilePic}
              alt="Taylor portrait"
              width="250"
              height="250"
              quality="95"
              priority={true}
              className="relative m-2 h-40 w-40 rotate-[4deg] overflow-hidden rounded-[25%] object-cover shadow-xl sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-56 lg:w-56"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
            className="flex flex-col items-center space-y-4 md:my-auto md:items-start md:space-y-2"
          >
            <h1 className="font-cursive text-4xl font-bold text-gray-800 drop-shadow-lg dark:text-gray-100 md:text-5xl">
              Taylor Horwood
            </h1>
            <p className="font-cursive text-xl text-gray-600 drop-shadow-xl dark:text-gray-300 md:text-2xl">
              Developer, tinkerer, indie hacker
            </p>
            <p className="flex space-x-4 text-sm text-gray-600 drop-shadow-xl dark:text-gray-300 md:text-base">
              <span>📍 Philadelphia, PA</span>
            </p>
            <ul className="flex space-x-2 text-3xl text-gray-800 drop-shadow dark:text-gray-100 md:space-x-3">
              {socialsData.map((item) => (
                <li key={item.name}>
                  <a
                    className="flex p-2 transition-all hover:scale-125"
                    rel="noopener"
                    href={item.href}
                  >
                    <item.icon />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.p
        className="mb-12 mt-10 text-xl !leading-[1.5] md:text-2xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Site reliability engineer by day and full stack developer by night. I
        create flawless front-end experiences while taming DevOps challenges for
        seamless, dependable systems. Let's collaborate to transform your dream
        into digital magic, shaping a future where innovation meets unwavering
        reliability!
      </motion.p>

      <motion.div
        className="flex flex-col items-center justify-center gap-3 px-4 text-lg font-medium md:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <a
          href="mailto:contact@tjhorwood.com"
          className="group flex w-full items-center gap-2 rounded-full bg-gray-800 px-7 py-3 text-white outline-none transition hover:scale-105 dark:bg-white/80 dark:text-gray-950 md:w-auto"
        >
          Get in touch <BsArrowRight className="opacity-70 transition" />
        </a>

        <a
          className="group flex w-full cursor-pointer items-center gap-2 rounded-full bg-gray-200 px-7 py-3 outline-none transition hover:scale-105 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 md:w-auto"
          href="/resume.pdf"
          download
        >
          Download Resume <HiDownload className="opacity-70 transition" />
        </a>
      </motion.div>
    </section>
  )
}
