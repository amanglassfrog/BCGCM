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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
      <Header />
      <div className="relative h-screen">
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
          {/*
          <header className="text-white">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex gap-12 items-center">
                  // Logo
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <Image src="/bcgcmlogo.png" alt="Logo" width={167} height={100} />
                    </Link>
                  </div>
                  // Menu items for desktop
                  <nav className="hidden md:flex space-x-6">
                    <a href="#solutions" className="text-white text-xl hover:text-gray-300 transition duration-300">SOLUTIONS</a>
                    <a href="#about" className="text-white text-xl hover:text-gray-300 transition duration-300">ABOUT US</a>
                  </nav>
                </div>
                // Call-to-action button for desktop
                <div className="hidden md:block">
                  <Button asChild variant="secondary" size="lg" className="rounded-full">
                    <Link href="/book-appointment">BOOK A CALL</Link>
                  </Button>
                </div>
                // Mobile menu button
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleMenu}>
                    {isMenuOpen ? (
                      // Close Icon
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // Hamburger Icon
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </Button>
                </div>
              </div>
              // Mobile menu dropdown
              {isMenuOpen && (
                <Card className="md:hidden absolute left-0 w-full z-50">
                  <CardContent className="space-y-1 px-4 pt-5 pb-3 sm:px-6">
                    <a href="#solutions" className="block text-black text-xl hover:bg-gray-200 rounded px-3 py-2">SOLUTIONS</a>
                    <a href="#about" className="block text-black text-xl hover:bg-gray-200 rounded px-3 py-2">ABOUT US</a>
                    <Button asChild className="w-full rounded-full">
                      <Link href="/book-appointment">BOOK A CALL</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </header>
          */}
        </div>

        {/* Hero Section */}
        <section className="relative z-10 text-center text-white py-20 px-4 flex flex-col items-center justify-center h-[91vh]">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Strategic & Structured Private Funding
                </h1>
                <h2 className="text-3xl sm:text-2xl lg:text-4xl font-semibold text-blue-200 italic">
                 for
                </h2>
                <h3 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-green-300">
                  Entrepreneurs
                </h3>
                <h3 className="text-2xl sm:text-2xl lg:text-2xl font-semibold text-gray-200 mt-6">
                Customised Business & Project Funding l High Yield Investment Programs
                </h3>
              </div>
              
              {/* Description */}
              {/* <div className="mt-12 max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                  Enjoy easy and convenient access to your funds with our range of
                  checking account options. Benefit from features such as online and
                  mobile banking, debit cards, and free ATM access.
                </p>
              </div> */}
            </div>
          </div>
        </section>
       
      </div>

      {/* Separator after Hero Section */}
      <Separator className="my-8 bg-gray-300" />

      {/* New Services Section */}
      <section id='solutions' className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* <Badge variant="outline" className="mb-4 text-green-500 border-green-500">
              Our Services
            </Badge> */}
            <h1 className="text-4xl font-bold text-gray-900 mb-12">Our Services</h1>
            <div> </div>
            <h2 className="text-2xl text-gray-900">
              The Services We Offer <span className="text-green-500">For You</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Structured Private Project Funding */}
            <Link href="/structured-private-project-funding" className="block">
              <Card className="h-full hover:scale-105 hover:-translate-y-2 transform transition-all duration-500 ease-in-out cursor-pointer border-0 shadow-lg bg-[#082541] text-white hover:shadow-2xl hover:shadow-blue-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl hover:text-blue-200 transition-colors duration-300">
                      Structured Private Project Funding
                    </CardTitle>
                    <Image 
                      src="/arrowicon.png" 
                      alt="Arrow" 
                      width={34} 
                      height={34} 
                      className="hover:translate-x-2 transition-transform duration-300" 
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-gray-300 hover:text-gray-100 transition-colors duration-300">
                  We provide well designed Structured Private Project Funding in various business sectors
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {/* Card 2: Structured Private Placement Programs */}
            <Link href="/structured-private-placement-programs" className="block">
              <Card className="h-full hover:scale-105 hover:-translate-y-2 transform transition-all duration-500 ease-in-out cursor-pointer border-0 shadow-lg bg-[#082541] text-white hover:shadow-2xl hover:shadow-blue-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl hover:text-blue-200 transition-colors duration-300">
                      Structured Private Placement Programs
                    </CardTitle>
                    <Image 
                      src="/arrowicon.png" 
                      alt="Arrow" 
                      width={34} 
                      height={34} 
                      className="hover:translate-x-2 transition-transform duration-300" 
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-gray-300 hover:text-gray-100 transition-colors duration-300">
                  We will advise and guide you through various domestic opportunities in obtaining High Yield / Returns
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {/* Card 3: Global Businesss */}
            <Link href="/global-businesss" className="block">
              <Card className="h-full hover:scale-105 hover:-translate-y-2 transform transition-all duration-500 ease-in-out cursor-pointer border-0 shadow-lg bg-[#082541] text-white hover:shadow-2xl hover:shadow-blue-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl hover:text-blue-200 transition-colors duration-300">
                      Global Businesss
                    </CardTitle>
                    <Image 
                      src="/arrowicon.png" 
                      alt="Arrow" 
                      width={34} 
                      height={34} 
                      className="hover:translate-x-2 transition-transform duration-300" 
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-gray-300 hover:text-gray-100 transition-colors duration-300">
                  We will advise and guide you through various International Opportunities of High Yield Programs / Returns
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Separator after Services Section */}
      <Separator className="my-8 bg-gray-300" />

      {/* About Section */}
      <section id='about' className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
              {/* <Badge variant="outline" className="mb-4 text-green-500 border-green-500">
                About BCGCM India Ltd
              </Badge> */}
            <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
            <h2 className="text-2xl md:text-6xl font-semibold text-gray-900">
              Strategic Investment & <span className="text-green-500">Funding Agency</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              BCGCM India Pvt Ltd will serve as a strategic investment and funding agency for high-potential INDIA, GLOBAL startups,
              with a focus on early-stage venture funding, technical and operational due diligence, post-investment support and acceleration,
              and AI-powered pipeline development.
            </p>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              This division will act as a gateway for BCGCM's global capital to access and nurture innovation,
              particularly in the career tech, health tech, and social impact sectors.
            </p>
          </div>

          {/* BCGCM India Ltd Focus Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:-translate-y-1 transition duration-300 border-0 shadow-lg bg-[#082541] text-white">
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">Early-stage Venture Funding</CardTitle>
                <CardDescription className="text-gray-300">
                  Strategic capital investment for promising startups at their early growth stages.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:-translate-y-1 transition duration-300 border-0 shadow-lg bg-[#082541] text-white">
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">Technical & Operational Due Diligence</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive assessment of technical capabilities and operational efficiency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:-translate-y-1 transition duration-300 border-0 shadow-lg bg-[#082541] text-white">
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">Post-investment Support & Acceleration</CardTitle>
                <CardDescription className="text-gray-300">
                  Ongoing guidance and resources to accelerate growth and success.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:-translate-y-1 transition duration-300 border-0 shadow-lg bg-[#082541] text-white">
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">AI-powered Pipeline Development</CardTitle>
                <CardDescription className="text-gray-300">
                  Advanced AI technology to identify and develop high-potential investment opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Security & Privacy Section */}
          <div className="text-center mb-12">
            {/* <Badge variant="outline" className="mb-4 text-green-500 border-green-500">
              Security & Privacy
            </Badge> */}
            
            <h3 className="text-2xl md:text-4xl font-semibold text-gray-900">
              We Take Your <span className="text-green-500">Security</span> and <span className="text-green-500">Privacy</span> Seriously
            </h3>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Enjoy easy and convenient access to your funds with our range of
              checking account options. Benefit from features such as online
              and mobile banking, debit cards, and free ATM access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Security Card 1 */}
            <Card className="text-center hover:-translate-y-1 transition duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Image src="/icon1.png" alt="Encrypted Protection" width={100} height={100} />
                </div>
                <CardTitle className="text-xl mb-2">Encrypted Protection</CardTitle>
                <CardDescription className="text-lg">
                  Enjoy easy and convenient access to your funds with our range of
                  checking account options. Benefit from features such as online
                  and mobile banking, debit cards, and free ATM access.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Security Card 2 */}
            <Card className="text-center hover:-translate-y-1 transition duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Image src="/icon2.png" alt="Safe Browsing" width={100} height={100} />
                </div>
                <CardTitle className="text-xl mb-2">Safe Browsing</CardTitle>
                <CardDescription className="text-lg">
                  Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Security Card 3 */}
            <Card className="text-center hover:-translate-y-1 transition duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Image src="/icon3.png" alt="Data Security" width={100} height={100} />
                </div>
                <CardTitle className="text-xl mb-2">Data Security</CardTitle>
                <CardDescription className="text-lg">
                  Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Separator after About Section */}
      <Separator className="my-8 bg-gray-300" />

      {/* CTA Section */}
      <section className="bg-white text-[#082541] py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          {/* <Badge variant="secondary" className="mb-4 text-green-400 bg-green-400/20 border-green-400">
            Get Started Today
          </Badge> */}
          <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-4">
            Not sure which pathway<br />
            is <span className="text-green-400">right for you?</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-8 max-w-4xl mx-auto">
            Explore your options further one-on-one with our team. Our consultation calls are
            designed to guide you through the diverse financial programs and identify the optimal
            solution tailored to your unique business needs and objectives.
          </p>
          <Link href="/book-appointment">
            <Button className="bg-green-400 hover:bg-green-500 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300">
              Book Your Consultation
            </Button>
          </Link>
        </div>
      </section>

      {/* Separator after CTA Section */}
      <Separator className="my-8 bg-gray-300" />

      {/* Testimonials Section */}
      {/*
      <section className="bg-white py-12 px-6 sm:px-12 lg:px-24">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-green-500 border-green-500">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue-900">
            Our <span className="text-green-400">Testimonials</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mt-4 max-w-4xl mx-auto">
            Discover how YourBank has transformed lives with innovative digital solutions and personalized customer service.
            See why our clients trust us for a secure and prosperous financial journey.
          </p>
        </div>

        <div className="flex flex-col items-center w-full">
          // Swiper Slider
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
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            className="mySwiper w-full mt-10"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="flex justify-center">
                <Card className="p-6 flex flex-col justify-center text-center h-[20rem] border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="text-3xl text-green-400 mb-4 flex justify-center items-center h-[30%]">
                      <img src="/quote2.png" alt="Quote Icon" className="w-full h-12" />
                    </div>
                    <CardDescription className="text-sm sm:text-base text-gray-700 mb-4 h-[70%]">
                      {testimonial.text}
                    </CardDescription>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      // Custom Navigation Buttons
      <div className="flex justify-center mt-8 gap-8">
        <Button
          variant="ghost"
          size="icon"
          className="custom-prev w-12 h-12 rounded-full text-white hover:bg-white/10"
        >
          <img src="/leftButton.png" alt="Left Arrow" width={67} height={67} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="custom-next w-12 h-12 rounded-full text-white hover:bg-white/10"
        >
          <img src="/rightButton.png" alt="Right Arrow" width={67} height={67} />
        </Button>
      </div>
    </div>
  </section>
  */}

      <Footer />
    </>
  );
}
