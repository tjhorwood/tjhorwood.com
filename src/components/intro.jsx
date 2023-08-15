"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import ProfilePic from "@/images/profile-pic.jpg";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-4xl text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 sm:flex-row sm:items-start sm:gap-6 md:gap-8 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
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
              className="relative m-2 h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rotate-[4deg] overflow-hidden rounded-[25%] shadow-xl object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            className="flex flex-col items-center gap-3 sm:items-start sm:gap-1 md:gap-2 sm:my-auto"
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
            <ul className="flex space-x-1 text-2xl text-gray-600 drop-shadow dark:text-gray-300 md:space-x-3 md:text-3xl">
              {socials.map((item) => (
                <li key={item.name}>
                  {!item.local ?
                    <a className="flex p-2 transition-all hover:scale-125" target="_blank" rel="noopener" href={item.href}>
                      <item.icon />
                    </a>
                    :
                    <a className="flex p-2 transition-all hover:scale-125" rel="noopener" href={item.href}>
                      <item.icon />
                    </a>
                  }
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.p
        className="mt-10 mb-12 !leading-[1.5] text-xl md:text-2xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Site reliability engineer by day and full stack developer by night. I create flawless front-end experiences while taming DevOps challenges for seamless, dependable systems. Let's collaborate to transform your dream into digital magic, shaping a future where innovation meets unwavering reliability!
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 dark:bg-white/80 text-white dark:text-gray-900 px-7 py-3 flex items-center gap-2 rounded-full outline-none transition hover:scale-105 w-full sm:w-auto"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Get in touch{" "}
          <BsArrowRight className="opacity-70 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none transition hover:scale-105 cursor-pointer borderBlack dark:bg-white/10 w-full sm:w-auto"
          href="/resume.pdf"
          download
        >
          Download Resume{" "}
          <HiDownload className="opacity-60 transition" />
        </a>
      </motion.div>
    </section>
  );
}

const socials = [
  {
    "name": "LinkedIn",
    "href": "https://linkedin.com/in/tjhorwood",
    "icon": BsLinkedin,
    "local": false
  },
  {
    "name": "GitHub",
    "href": "https://github.com/tjhorwood",
    "icon": BsGithub,
    "local": false
  },
  {
    "name": "Contact",
    "href": "#contact",
    "icon": FaEnvelope,
    "local": true
  }
]