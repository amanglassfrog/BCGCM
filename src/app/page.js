"use client"
import React, { useState } from 'react';

import Header from "@/components/Header/Header";
import Image from "next/image";
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const testimonialsData = [
  {
    id: 1,
    text: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
  },
  {
    id: 2,
    text: "The support and guidance I received from YourBank were phenomenal. They helped me understand all my options and provided personalized solutions that fit my business needs perfectly.",
  },
  {
    id: 3,
    text: "Starting a new venture is tough, but YourBank made the financial aspect much easier. Their team offered tailored advice and provided the right financial tools to get me going.",
  },
  {
    id: 4,
    text: "YourBank has been an essential part of my business's growth. Their expert financial services have helped me scale my business, and the team has always been there to assist when needed.",
  },
  {
    id: 5,
    text: "I was unsure about the best financial solutions for my business, but YourBank helped me navigate the options, and now my business is growing smoothly thanks to their professional guidance.",
  },
  {
    id: 6,
    text: "The team at YourBank is incredible. From understanding my needs to offering solutions that aligned perfectly with my goals, they helped me every step of the way in building a sustainable business.",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to navigate to the next testimonial
  const nextTestimonial = () => {
    if (currentIndex < testimonialsData.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to navigate to the previous testimonial
  const prevTestimonial = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <>
      <div className="relative h-screen ">
  {/* Background Video */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src="/bcgcmvd.mp4"
    autoPlay
    loop
    muted
    playsInline
  ></video>
<div className="absolute top-0 left-0 w-full h-full bg-[#082541] bg-opacity-50"></div>
  {/* Overlay Content */}
  <div className="relative z-10">
    {/* Header Section */}
    <header className="text-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-12 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src="/bcgcmlogo.png" alt="Logo" width={167} height={100} />
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
          <div className="md:hidden absolute left-0 w-full bg-white z-50">
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
  </div>

      {/* Hero Section */}
      <section
        className="relative z-10 text-center text-white py-20 px-4 flex flex-col items-center justify-end h-[91vh]"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-[#38C682]">
            Unique Financing Solutions
          </h1>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            for Accredited & Private Investors
          </h2>
          <p className="text-lg sm:text-xl mb-12">
            Enjoy easy and convenient access to your funds with our range of
            checking account options. Benefit from features such as online and
            mobile banking, debit cards, and free ATM access.
          </p>
          <a
            href="/book-appointment"
            className="bg-white px-6 py-3 pt-4 rounded-full font-bold text-[#09336F] transition duration-300"
          >
            BOOK A CALL
          </a>
        </div>
        </section>
        <section id='solutions' className="py-16 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              The Services We Offer <span className="text-green-500">For You</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Enjoy easy and convenient access to your funds with our range of
              checking account options. Benefit from features<br></br> such as online
              and mobile banking, debit cards, and free ATM access.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {/* Service Card 1 */}
            <Link href={"/structured-private-project-funding"}>  <div
              className="p-12 bg-[#082541] text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 h-[100%]"
              ><div className="flex items-center justify-between">
                 
              <h3 className="text-2xl font-bold mb-4">
                Structured Private Project Funding 
              </h3><div ><Image src={"/arrowicon.png"} alt="Logo" width={34} height={34} className="ml-4" /></div></div>
              <p className="text-lg">
                Enjoy the convenience of accessing your accounts anytime,
                anywhere through our secure online banking platform. Check
                balances, transfer funds, and pay bills with ease.
              </p>
            </div></Link>

              {/* Service Card 2 */}
              <Link href={"/structured-private-placement-programs"}>
            <div
              className="p-12 bg-[#082541] text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 h-[100%]"
              >
                <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold mb-4">
                Structured Private Placement Programs
              </h3><div ><Image src={"/arrowicon.png"} alt="Logo" width={34} height={34} className="ml-4" /></div></div>
             
              <p className="text-lg">
                Stay connected to your finances on the go with our user-friendly
                mobile banking app. Easily manage your accounts, deposit
                checks, and make payments from your smartphone or tablet.
              </p>
            </div></Link>

            {/* Service Card 3 */}
              <Link href={"/global-businesss"}>
                <div
              className="p-12 bg-[#082541] text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 h-[100%]"
              >
                <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold mb-4">
                Global Businesss
              </h3><div ><Image src={"/arrowicon.png"} alt="Logo" width={34} height={34} className="ml-4" /></div></div>


              
              <p className="text-lg">
                Stay connected to your finances on the go with our user-friendly
                mobile banking app. Easily manage your accounts, deposit
                checks, and make payments from your smartphone or tablet.
              </p>
            </div></Link>
          </div>
        </div>
        </section>
        <section id='about' className="py-16 bg-[#08254121] text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-semibold text-gray-900">
              We Take Your <span className="text-green-500">Security</span><br></br> and <span className="text-green-500">Privacy</span> Seriously
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Enjoy easy and convenient access to your funds with our range of
              checking account options. Benefit from features<br></br> such as online
              and mobile banking, debit cards, and free ATM access.
            </p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
            {/* Security Card 1 */}
            <div
              className="p-6  text-gray-800   transform hover:-translate-y-1 transition duration-300 text-center"
            >
              <div className="mb-4 text-green-500 flex justify-center items-center">
<Image src={"/icon1.png"} alt="Logo" width={100} height={100} className="ml-4" />              </div>
              <h3 className="text-xl font-bold mb-2">Encrypted Protection</h3>
              <p className="text-lg text-gray-600">
                Enjoy easy and convenient access to your funds with our range of
                checking account options. Benefit from features such as online
                and mobile banking, debit cards, and free ATM access.
              </p>
              </div>
              
            {/* Security Card 2 */}
            <div
              className="p-6  text-gray-800   transform hover:-translate-y-1 transition duration-300 text-center"
            >
              <div className="mb-4 text-green-500 text-4xl flex justify-center items-center">
<Image src={"/icon2.png"} alt="Logo" width={100} height={100} className="ml-4" />              </div>
              <h3 className="text-xl font-bold mb-2">Safe Browsing</h3>
              <p className="text-lg text-gray-600">
                Build your savings with our competitive interest rates and flexible savings account options. Whether you’re saving for a specific goal or want to grow your wealth over time, we have the right account for you.
              </p>
            </div>
            {/* Security Card 3 */}
            <div
              className="p-6  text-gray-800  transform hover:-translate-y-1 transition duration-300 text-center"
            >
              <div className="mb-4 text-green-500 text-4xl flex justify-center items-center">
<Image src={"/icon3.png"} alt="Logo" width={100} height={100} className="ml-4" />              </div>
              <h3 className="text-xl font-bold mb-2">Data Security</h3>
              <p className="text-lg text-gray-600">
                Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.
              </p>
            </div>
          </div>
        </div>
        </section>
        <section className="bg-[#082541] text-white py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-4">
          Not sure which pathway<br></br> is <span className="text-green-400">right for you?</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg mb-8">
          Explore your options further one-on-one with our team. Our<br></br> consultation calls are
          designed to guide you through the diverse<br></br> financial programs and identify the optimal
          solution tailored to <br></br>your unique business needs and objectives.
            </p>
            <a href='/book-appointment'>
        <button
          className="bg-white text-blue-900 font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          BOOK A CALL
        </button></a>
      </div>
        </section>
        <section className="bg-white py-12 px-6 sm:px-12 lg:px-24 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-900">
          Our <span className="text-green-400">Testimonials</span>
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mt-4">
          Discover how YourBank has transformed lives with innovative digital solutions and personalized customer service.<br></br>
          See why our clients trust us for a secure and prosperous financial journey.
        </p>
      </div>

     <div className="flex flex-col items-center w-full">
      {/* Swiper Slider */}
       <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
              modules={[Navigation, Pagination,Autoplay]}
              loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
        className="mySwiper w-full mt-10"
      >
        {testimonialsData.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="flex justify-center">
            <div className="p-6 flex flex-col justify-center  text-center h-[20rem] ">
              <div className="text-3xl text-green-400 mb-4 flex justify-center items-center h-[30%]">
                <img src={"/quote2.png"} alt="Quote Icon" className="w-full h-12" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 h-[70%]">
                {testimonial.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="flex justify-center mt-8 gap-8">
        <button
          className="custom-prev w-12 h-12 rounded-full  text-white flex items-center justify-center  transition duration-300"
        >
         <img src={"/leftButton.png"} alt="Left Arrow" width={67} height={67} />
        </button>
        <button
          className="custom-next w-12 h-12 rounded-full  text-white flex items-center justify-center  transition duration-300"
        >
          <img src={"/rightButton.png"} alt="Left Arrow" width={67} height={67} />
        </button>
      </div>
    </div>
        </section>
        <Footer/>
    </div>     
    </>
  );
}
