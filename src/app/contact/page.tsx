'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { connectLinks } from '@/lib/data';
import { motion } from 'framer-motion';

import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

const initialFormData = {
  firstname: '',
  lastname: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'error' | 'sending' | '';
  }>({
    message: '',
    type: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ message: 'Sending...', type: 'sending' });
    try {
      const response = await fetch('/api/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus({ message: 'Message sent successfully!', type: 'success' });
        setFormData(initialFormData);
      } else {
        setStatus({ message: 'Failed to send message.', type: 'error' });
      }
    } catch (error) {
      setStatus({
        message: `An error occurred. Please try again. ${error}`,
        type: 'error',
      });
    }
    // Revert button back to normal after 3 seconds
    setTimeout(() => {
      setStatus({ message: '', type: '' });
    }, 3000); // 3 seconds
  };

  const renderField = (
    name: string,
    label: string,
    type = 'text',
    as: any = Input,
  ) => (
    <motion.div
      className={`w-full px-3 ${['firstname', 'lastname'].includes(name) ? 'sm:w-1/2' : ''
        }`}
      variants={itemVariants}
    >
      <label
        className='mb-1 block text-sm font-medium text-primary'
        htmlFor={name}
      >
        {label} <span className='text-red-600'>*</span>
      </label>
      {React.createElement(as, {
        id: name,
        name,
        type,
        value: formData[name as keyof typeof formData],
        onChange: handleChange,
        required: true,
        placeholder: `Enter your ${name === 'subject' ? 'subject' : name}`,
        ...(name === 'message' ? { rows: 4 } : {}),
      })}
    </motion.div>
  );

  const buttonClassName = `w-full text-lg transition-all hover:scale-[1.02] ${status.type === 'success'
    ? 'button-animate-success font-semibold text-green-700'
    : status.type === 'error'
      ? 'button-animate-error font-semibold text-red-700'
      : status.type === 'sending'
        ? 'bg-gray-900 hover:bg-gray-900/90 text-white dark:bg-white/80 dark:text-gray-900'
        : 'bg-gray-900 hover:bg-gray-900/90 text-white dark:bg-white/80 dark:text-gray-900'
    }`;

  return (
    <motion.div
      className='flex flex-col gap-10'
      variants={containerVariants}
      initial='hidden'
      animate='show'
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <h1 className='text-3xl font-bold tracking-tight'>Contact Me</h1>
        <p className='text-secondary'>
          I&apos;m always open to new opportunities, collaborations, and
          interesting conversations. Whether you have a project in mind, a
          question, or just want to say hello, feel free to reach out. I&apos;d
          love to hear from you!
        </p>
      </motion.div>

      {/* Main Content */}
      <div className='flex flex-col gap-12 md:flex-row lg:px-4'>
        {/* Contact Form */}
        <div className='w-full md:w-2/3'>
          <motion.form
            className='mx-auto max-w-full space-y-4'
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial='hidden'
            animate='show'
          >
            <div className='-mx-3 flex flex-wrap space-y-4 sm:space-y-0'>
              {renderField('firstname', 'First Name')}
              {renderField('lastname', 'Last Name')}
            </div>
            <div className='-mx-3 flex flex-wrap'>
              {renderField('email', 'Email', 'email')}
            </div>
            <div className='-mx-3 flex flex-wrap'>
              {renderField('subject', 'Subject')}
            </div>
            <div className='-mx-3 flex flex-wrap'>
              {renderField('message', 'Message', 'text', Textarea)}
            </div>
            <div className='-mx-3 flex flex-wrap'>
              <motion.div className='w-full px-3' variants={itemVariants}>
                <Button type='submit' size='lg' className={buttonClassName}>
                  {status.message || 'Send'}
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>

        {/* Connect Links */}
        <div className='w-full md:w-1/3'>
          <motion.p
            className='mb-1 block text-sm font-medium text-primary'
            variants={itemVariants}
          >
            More ways to connect
          </motion.p>
          <motion.ul
            className='grid w-full flex-grow grid-cols-1 gap-4'
            variants={containerVariants}
            initial='hidden'
            animate='show'
          >
            {connectLinks.map(({ label, href, icon }, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
              >
                <Link
                  href={href}
                  className='inline-grid w-full rounded-lg bg-tertiary p-4 no-underline hover:scale-[1.03] transition-all duration-200'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-xl'>{icon}</span>
                    {label}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='ml-auto h-5 w-5 text-secondary'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}
