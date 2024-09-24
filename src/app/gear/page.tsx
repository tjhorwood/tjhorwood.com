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

export default function Gear() {
  return (
    <motion.div
      className='flex flex-col gap-12'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <h1 className='text-3xl font-bold tracking-tight'>Gear</h1>
        <motion.p className='text-secondary' variants={itemVariants}>
          This is all gear I actually own and like.
        </motion.p>
        <motion.p className='text-secondary' variants={itemVariants}>
          Using the affiliate links help support my work.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
