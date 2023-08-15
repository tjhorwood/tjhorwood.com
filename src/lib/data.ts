import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/images/corpcomment.png";
import rmtdevImg from "@/images/rmtdev.png";
import wordanalyticsImg from "@/images/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Associate's Degree",
    location: "Kaplan University",
    description:
      "I graduated with my Associates Degree in Computer Networking.",
    icon: React.createElement(LuGraduationCap),
    date: "2011",
  },
  {
    title: "Application Support Analyst",
    location: "Amtrak",
    description:
      "I worked for Amtrak as an Application Support Analyst. My job was to provide support for internal tools (such as time entry, parts ordering, booking travel, etc.) for employees across the United States",
    icon: React.createElement(CgWorkAlt),
    date: "2011 - 2013",
  },
  {
    title: "Tier II Technical Support Specialist",
    location: "CRF Health",
    description:
      "",
    icon: React.createElement(CgWorkAlt),
    date: "2013 - 2015",
  },
  {
    title: "Application Specialist",
    location: "CRF Health",
    description:
      "",
    icon: React.createElement(CgWorkAlt),
    date: "2015 - 2015",
  },
  {
    title: "Bachelor's Degree",
    location: "Purdue University",
    description:
      "I graduated with my Bachelor's Degree in Information Technology.",
    icon: React.createElement(LuGraduationCap),
    date: "2011",
  },
  {
    title: "Sr. Customer Success Engineer",
    location: "Syapse",
    description:
      "",
    icon: React.createElement(CgWorkAlt),
    date: "2015 - 2018",
  },
  {
    title: "Site Reliability Engineer",
    location: "Syapse",
    description:
      "",
    icon: React.createElement(CgWorkAlt),
    date: "2018 - 2022",
  },
  {
    title: "Sr. Service Operations Engineer",
    location: "Syapse",
    description:
      "",
    icon: React.createElement(CgWorkAlt),
    date: "2022 - 2022",
  },
  {
    title: "Team Lead, Service Operations Engineering",
    location: "Syapse",
    description:
      "",
    icon: React.createElement(CgWorkAlt),
    date: "2022 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "National League Gaming",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "Tailwind", "Prisma", "PostgreSQL", "Stripe"],
    imageUrl: corpcommentImg,
  },
  {
    title: "GRS Mechanical",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "Tailwind"],
    imageUrl: corpcommentImg,
  },
  {
    title: "StandardCBD",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["Wordpress", "eCommerce"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Terplandia",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["Wordpress", "eCommerce"],
    imageUrl: wordanalyticsImg,
  },
  {
    title: "CapForge",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["Wordpress"],
    imageUrl: wordanalyticsImg,
  },
  {
    title: "Sahu Studio",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["Wordpress"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "Kubernetes",
  "Terraform",
  "Docker",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "MySQL",
  "Python",
  "Django",
  "Framer Motion"
] as const;