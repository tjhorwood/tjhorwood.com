'use client';
import { motion } from 'framer-motion';

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1, // Adjust the delay between animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start state
  show: {
    opacity: 1,
    y: 0, // End state
    transition: {
      ease: 'easeOut',
      duration: 0.4, // Animation duration
    },
  },
};

export default function Blog() {
  return (
    <motion.div
      className='flex flex-col gap-12'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <h1 className='text-3xl font-bold tracking-tight'>Blog</h1>
        <p className='text-neutral-600 dark:text-neutral-400'>
          0 posts so far. Stay tuned for more!
        </p>
      </motion.div>
    </motion.div>
  );
}
