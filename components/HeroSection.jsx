"use client"
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Slot } from '@radix-ui/react-slot';
export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { isSignedIn } = useUser();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section
        className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 font-['Inter',sans-serif]"
      >
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 bg-white/80 backdrop-blur-sm border-b border-purple-100">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src='/logo.svg' alt="Logo" width={300} height={150} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
              Dashboard
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-600 font-medium hover:text-purple-600 transition-colors">
                <span>Questions</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className={`absolute bg-white shadow-xl border border-gray-100 flex flex-col w-48 rounded-xl p-2 top-12 left-0 transition-all duration-300 ${isProductsOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-2'
                }`}>
                <Link href="/faq" className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                  FAQ
                </Link>
                <Link href="/help-center" className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                  Help Center
                </Link>
                <Link href="/support" className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                  Support
                </Link>
              </div>
            </div>

            <Link href="/upgrade" className="text-gray-600 font-medium hover:text-purple-600 transition-colors">
              Upgrade
            </Link>

            <Link href="/how-it-works" className="text-gray-600 font-medium hover:text-purple-600 transition-colors">
              How it works?
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 border-2 border-purple-600 rounded-full shadow-md hover:shadow-lg transition-all",
                    userButtonPopoverCard:
                      "shadow-lg border border-gray-200 rounded-xl p-4",
                    userButtonPopoverActionButton:
                      "hover:bg-purple-100 text-sm font-medium",
                    userButtonPopoverActionButtonIcon: "text-purple-600",
                    userButtonPopoverFooter: "bg-gray-50"
                  },
                  variables: {
                    colorPrimary: "#7e22ce",
                    colorText: "#333",
                    borderRadius: "0.75rem"
                  }
                }}
                afterSignOutUrl="/"
              />
            ) : (
              <>
                <SignInButton>
                  <Link href='/sign-in'>
                    <button className="px-4 py-2 text-gray-600 font-medium hover:text-purple-600 transition-colors cursor-pointer">
                    Sign In
                    </button>
                    </Link>
                </SignInButton>
                <SignUpButton>
                   <Link href='/sign-up'>
                     <button className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
                    Sign Up
                    </button>
                    </Link>
                </SignUpButton>
              </>
            )}
          </div>


          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          </button>

          {/* Mobile Menu */}
          <div
            className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              } md:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-gray-800">Menu</span>
                <button
                  onClick={closeMenu}
                  className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/dashboard" className="text-purple-600 font-medium py-2" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link href="/questions" className="text-gray-600 font-medium py-2 hover:text-purple-600" onClick={closeMenu}>
                  Questions
                </Link>
                <Link href="/upgrade" className="text-gray-600 font-medium py-2 hover:text-purple-600" onClick={closeMenu}>
                  Upgrade
                </Link>
                <Link href="/how-it-works" className="text-gray-600 font-medium py-2 hover:text-purple-600" onClick={closeMenu}>
                  How it works?
                </Link>

                <div className="border-t pt-4 mt-4">
                  {isSignedIn ? (
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-12 h-12 border-2 border-purple-600 rounded-full shadow-md hover:shadow-lg transition-all",
                          userButtonPopoverCard: "shadow-lg border border-gray-200 rounded-xl p-4",
                          userButtonPopoverActionButton: "hover:bg-purple-100 text-sm font-medium",
                          userButtonPopoverActionButtonIcon: "text-purple-600",
                          userButtonPopoverFooter: "bg-gray-50"
                        },
                        variables: {
                          colorPrimary: "#7e22ce", // Tailwind's purple-700
                          colorText: "#333",
                          borderRadius: "0.75rem", // rounded-xl
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <SignInButton mode="modal">
                        <button className="w-full px-4 py-2 text-gray-600 font-medium hover:text-purple-600 transition-colors text-left">
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="w-full px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="px-6 md:px-12 lg:px-16 pt-20 md:pt-32 pb-20">
          {/* Announcement Banner */}
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-purple-200 rounded-full w-max mx-auto px-6 py-3 mb-12">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700 font-medium">New features released - Check them out!</span>
            <button className="flex items-center gap-1 text-purple-600 font-medium hover:gap-2 transition-all">
              <span className="text-sm">Explore</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Main Heading */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Ace Interviews with{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                AI-Powered Practice
              </span>
            </h1>

            <p className="text-sm md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Sharpen your skills and boost your confidence with realistic mock interviews. Our smart AI handles the heavy lifting—delivering personalized questions, feedback, and analytics—so you can focus on landing your dream job faster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/70 hover:bg-white border-2 border-purple-200 hover:border-purple-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all group"
              >
                <span>Watch Demo</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                  <path d="M8 6l6 4-6 4V6z" fill="currentColor" />
                </svg>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 text-center">
              <p className="text-sm text-gray-500 mb-6">Practice hard!</p>
            </div>
          </div>
        </div>

        {/* Background Overlay for Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        )}
      </section>
    </>
  );
}