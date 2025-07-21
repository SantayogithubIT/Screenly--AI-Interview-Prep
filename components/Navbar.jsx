'use client';

import React, { useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Home', href: '/' },
  { name: 'Upgrade', href: '/upgrade' },
  { name: 'How it works?', href: '/how-it-works' },
];

const Navbar = () => {
  const path = usePathname();

  useEffect(() => {
    console.log('Current path:', path);
  }, [path]);

  return (
    <header className="flex px-6 md:px-8 py-4 items-center justify-between bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src="/logo.svg" alt="logo" className="h-10 w-auto transition-transform hover:scale-105" />
        <div className="hidden md:block w-px h-6 bg-gray-300" />
      </div>

      {/* Navigation Menu */}
      <nav className="hidden sm:flex items-center space-x-2">
        <ul className="flex items-center space-x-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 hover:text-purple-700 ${
                  path === link.href
                    ? 'text-purple-700 bg-purple-50 shadow-sm'
                    : 'text-gray-700 hover:text-purple-700'
                }`}
              >
                {link.name}
                {path === link.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
