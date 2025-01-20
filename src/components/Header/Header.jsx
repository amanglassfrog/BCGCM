"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-[url('/bcgcmbackground.png')] bg-cover bg-center text-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-12 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/bcgcmlogo.png"
                  alt="Logo"
                  width={167}
                  height={100}
                />
              </Link>
            </div>

            {/* Menu items for desktop */}
            <nav className="hidden md:flex space-x-6">
              <a
                href="#solutions"
                className="text-white text-xl hover:text-gray-300 transition duration-300"
              >
                SOLUTIONS
              </a>
              <a
                href="#about"
                className="text-white text-xl hover:text-gray-300 transition duration-300"
              >
                ABOUT US
              </a>
            </nav>
          </div>

          {/* Call-to-action button for desktop */}
          <div className="hidden md:block">
            <a
              href="/book-appointment"
              className="bg-white px-6 py-3 rounded-full text-[#09336F] font-bold transition duration-300"
            >
              BOOK A CALL
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                // Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute  left-0 w-full bg-white z-50">
            <div className="space-y-1 px-4 pt-5 pb-3 sm:px-6">
              <a
                href="#solutions"
                className="block text-black text-xl hover:bg-gray-200 rounded px-3 py-2"
              >
                SOLUTIONS
              </a>
              <a
                href="#about"
                className="block text-black text-xl hover:bg-gray-200 rounded px-3 py-2"
              >
                ABOUT US
              </a>
              <a
                href="#book"
                className="block bg-white px-6 py-3 rounded-full font-bold text-[#09336F] text-center"
              >
                BOOK A CALL
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
