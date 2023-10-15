'use client'

import { motion } from 'framer-motion'
import React from 'react'

import SectionHeading from './section-heading'

export default function About() {
  return (
    <motion.section
      className="mb-28 max-w-[46rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p>
        Loving husband and father who enjoys spending time with my family,
        engaging in outdoor activities, working on cars, and creating/building
        things in my workshop. I am also very passionate about technology and
        enjoy tinkering with my homelab and coding for fun. These hobbies have
        taught me valuable problem-solving skills and a desire to constantly
        learn and improve. As a well-rounded individual, I bring a unique
        perspective and a can-do attitude to every task.
      </p>
    </motion.section>
  )
}
