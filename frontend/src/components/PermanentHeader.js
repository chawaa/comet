import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SearchBar from '@/components/SearchBar'
import SortDropdown from '@/components/SortDropdown'
import { FiSearch } from 'react-icons/fi'
import Logo from '@/components/Logo'
import NavLink from '@/components/NavLink'
import { useCurrentUser } from '@/lib/useCurrentUser'

export default function PermanentHeader({ children, className, ...rest }) {
  const currentUser = useCurrentUser().data

  return (
    <>
      <header
        className={`hidden sm:flex z-10 fixed left-0 right-0 top-0 h-14 px-6 items-center transition dark:bg-gray-800 bg-white shadow-md`}
        {...rest}
      >
        <NavLink href="/">
          <Logo className="h-4 dark:text-gray-200 text-black" />
        </NavLink>

        <div className="ml-auto relative text-gray-600 dark:text-gray-400 focus-within:text-blue-500 dark:focus-within:text-blue-500 transition">
          <FiSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input className="h-9 w-96 text-sm rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none text-primary px-10" />
        </div>

        <div className="ml-6">
          {currentUser ? (
            <div>Logged in</div>
          ) : (
            <NavLink
              href="/?login=true"
              as="/login"
              shallow
              scroll={false}
              className="h-9 bg-blue-500 transition hover:bg-blue-600 px-4 inline-flex items-center rounded-md text-sm font-medium cursor-pointer"
            >
              Log In / Sign Up
            </NavLink>
          )}
        </div>
      </header>
    </>
  )
}
