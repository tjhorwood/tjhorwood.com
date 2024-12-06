'use client';

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2, // Adjust stagger delay
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Initial state
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='show'
      className='space-y-8'
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedSection;
