// Install Tailwind CSS in your Next.js project if not already done
// Add this code to your header component
import React from "react";

import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[url('/bcgcmbackground.png')] bg-cover bg-center text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src={"/bcgcmlogo.png"} alt="Logo" width={100} height={100} />
          </div>

          {/* Menu items */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="#solutions"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              SOLUTIONS
            </a>
            <a
              href="#about"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              ABOUT US
            </a>
          </nav>

          {/* Call-to-action button */}
          <div className="hidden md:block">
            <a
              href="#book"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              BOOK A CALL
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
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
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown (hidden by default) */}
        <div className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <a
              href="#solutions"
              className="block text-white hover:bg-gray-700 rounded px-3 py-2"
            >
              SOLUTIONS
            </a>
            <a
              href="#about"
              className="block text-white hover:bg-gray-700 rounded px-3 py-2"
            >
              ABOUT US
            </a>
            <a
              href="#book"
              className="block text-blue-500 bg-white hover:bg-gray-300 rounded px-3 py-2 text-center"
            >
              BOOK A CALL
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
