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
    <header className="sticky top-0 z-50 bg-white text-white shadow">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold tracking-wide" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                <span style={{ color: '#09336F' }}>BCGCM</span><span style={{ color: '#B22222' }}>i</span>
              </span>
            </Link>
          </div>
          {/* Menu items for desktop */}
          <nav className="hidden md:flex space-x-6 ml-auto items-center">
            <Link
              href="/#solutions"
              className="text-[#09336F] text-lg hover:text-gray-700 transition duration-300"
            >
              Solutions
            </Link>
            <Link
              href="/#about"
              className="text-[#09336F] text-lg hover:text-gray-700 transition duration-300"
            >
              About Us
            </Link>
            <a
              href="/book-appointment"
              className="ml-6 bg-[#09336F] px-6 py-3 rounded-full text-white font-bold transition duration-300"
            >
              BOOK A CALL
            </a>
          </nav>

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
              <Link
                href="/#solutions"
                className="block text-black text-xl hover:bg-gray-200 rounded px-3 py-2"
              >
                SOLUTIONS
              </Link>
              <Link
                href="/#about"
                className="block text-black text-xl hover:bg-gray-200 rounded px-3 py-2"
              >
                ABOUT US
              </Link>
              <a
                href="#book"
                className="block bg-[#09336F] px-6 py-3 rounded-full font-bold text-white text-center"
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
