import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { FaPaperPlane } from 'react-icons/fa'

export default function SubmitBtn() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="disabled:bg-opacity-65 group flex h-[3rem] w-full items-center justify-center gap-2 rounded-full bg-gray-900 text-white outline-none transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 dark:bg-white/80 dark:text-gray-900 sm:w-[10rem]"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit{' '}
          <FaPaperPlane className="text-xs transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />{' '}
        </>
      )}
    </button>
  )
}
