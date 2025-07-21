'use client'
import React, { useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
    const path=usePathname();

    useEffect(()=>{
      console.log(path)
    },[])

  return (
    <div className='flex px-8 py-4 items-center justify-between bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-50'>
  <div className='flex items-center space-x-3'>
    <img className='h-10 w-auto transition-transform hover:scale-105' src={'/logo.svg'} alt="logo" />
    <div className='hidden md:block w-px h-6 bg-gray-300'></div>
  </div>
  
  <nav className='hidden sm:flex items-center space-x-1'>
    <ul className='flex items-center space-x-1'>
      <li>
        <a 
          href='/dashboard'
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 hover:text-purple-700 ${
            path === '/dashboard' 
              ? 'text-purple-700 bg-purple-50 shadow-sm' 
              : 'text-gray-700 hover:text-purple-700'
          }`}
        >
          Dashboard
          {path === '/dashboard' && (
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full'></div>
          )}
        </a>
      </li>
      <li>
        <a 
          href='/'
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 hover:text-purple-700 ${
            path === '/' 
              ? 'text-purple-700 bg-purple-50 shadow-sm' 
              : 'text-gray-700 hover:text-purple-700'
          }`}
        >
          Home
          {path === '/question' && (
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full'></div>
          )}
        </a>
      </li>
      <li>
        <a 
          href='/upgrade'
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 hover:text-purple-700 ${
            path === '/upgrade' 
              ? 'text-purple-700 bg-purple-50 shadow-sm' 
              : 'text-gray-700 hover:text-purple-700'
          }`}
        >
          Upgrade
          {path === '/upgrade' && (
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full'></div>
          )}
        </a>
      </li>
      <li>
        <a 
          href='/works'
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 hover:text-purple-700 ${
            path === '/works' 
              ? 'text-purple-700 bg-purple-50 shadow-sm' 
              : 'text-gray-700 hover:text-purple-700'
          }`}
        >
          How it works?
          {path === '/works' && (
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full'></div>
          )}
        </a>
      </li>
    </ul>
  </nav>

  <div className='flex items-center space-x-4'>
    <UserButton />
  </div>
</div>
  )
}

export default Header
