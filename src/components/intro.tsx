"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
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
              className="relative m-2 h-32 w-32 rotate-[4deg] overflow-hidden rounded-[25%] bg-gradient-to-br from-sky-600 to-pink-600 shadow-xl md:h-44 md:w-44 lg:h-48 lg:w-48 object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            className="flex flex-col items-center gap-2 sm:items-start sm:gap-1 md:gap-2 sm:my-auto"
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
          </motion.div>
        </div>
      </div>

      <motion.p
        className="mt-10 mb-12 !leading-[1.5] text-xl md:text-2xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        A full stack developer with a love for React. I create flawless front-end experiences while taming DevOps challenges for seamless, dependable systems. Let's collaborate to transform your dream into digital magic, shaping a future where innovation meets unwavering reliability!
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 dark:bg-white/80 text-white dark:text-gray-900 px-7 py-3 flex items-center gap-2 rounded-full outline-none transition w-full sm:w-auto"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Get in touch{" "}
          <BsArrowRight className="opacity-70 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none transition cursor-pointer borderBlack dark:bg-white/10 w-full sm:w-auto"
          href="/CV.pdf"
          download
        >
          Download Resume{" "}
          <HiDownload className="opacity-60 transition" />
        </a>

        <div className="flex flex-row items-center justify-center gap-2 w-full sm:w-auto">
          <a
            className="bg-white p-4 text-gray-900 flex items-center gap-2 rounded-full transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/70 w-1/2 justify-center"
            href="https://linkedin.com/in/tjhorwood"
            target="_blank"
          >
            <BsLinkedin />
            <span className="block sm:hidden text-base dark:text-white">LinkedIn</span>
          </a>

          <a
            className="bg-white p-4 text-gray-900 flex items-center gap-2 text-[1.35rem] rounded-full transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/70 w-1/2 justify-center"
            href="https://github.com/tjhorwood"
            target="_blank"
          >
            <FaGithubSquare />
            <span className="block sm:hidden text-base dark:text-white">Github</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}