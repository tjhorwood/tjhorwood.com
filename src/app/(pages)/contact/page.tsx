'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import ConnectLinks from '@/components/connect-links';
import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    <div
      className={`w-full px-3 ${['firstname', 'lastname'].includes(name) ? 'sm:w-1/2' : ''}`}
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
    </div>
  );

  const buttonClassName = `w-full text-lg transition-all hover:scale-[1.02] ${
    status.type === 'success'
      ? 'button-animate-success font-semibold text-green-700'
      : status.type === 'error'
        ? 'button-animate-error font-semibold text-red-700'
        : status.type === 'sending'
          ? 'bg-gray-900 hover:bg-gray-900/90 text-white dark:bg-white/80 dark:text-gray-900'
          : 'bg-gray-900 hover:bg-gray-900/90 text-white dark:bg-white/80 dark:text-gray-900'
  }`;

  return (
    <div className='flex flex-col gap-10'>
      <div>
        <h1 className='animate-in text-3xl font-bold tracking-tight'>
          Contact Me
        </h1>
        <p
          className='animate-in text-secondary'
          style={{ '--index': 1 } as React.CSSProperties}
        >
          I&apos;m always open to new opportunities, collaborations, and
          interesting conversations. Whether you have a project in mind, a
          question, or just want to say hello, feel free to reach out. I&apos;d
          love to hear from you!
        </p>
      </div>
      <div className='flex flex-col gap-12 md:flex-row lg:px-4'>
        <div
          className='w-full animate-in md:w-2/3'
          style={{ '--index': 2 } as React.CSSProperties}
        >
          <form
            className='mx-auto max-w-full space-y-4'
            onSubmit={handleSubmit}
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
              <div className='w-full px-3'>
                <Button type='submit' size='lg' className={buttonClassName}>
                  {status.message || 'Send'}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div
          className='w-full animate-in md:w-1/3'
          style={{ '--index': 3 } as React.CSSProperties}
        >
          <p className='mb-1 block text-sm font-medium text-primary'>
            More ways to connect
          </p>
          <ul
            className='grid w-full flex-grow animate-in grid-cols-1 gap-4'
            style={{ '--index': 3 } as React.CSSProperties}
          >
            {ConnectLinks.map(({ label, href, icon }) => (
              <li
                key={label}
                className='col-span-1 transition-all hover:scale-105'
              >
                <Link
                  href={href}
                  className='inline-grid w-full rounded-lg bg-tertiary p-4 no-underline transition-opacity'
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
