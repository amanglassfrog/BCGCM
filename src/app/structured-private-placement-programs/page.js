"use client"
import React, { useState } from 'react';
import Header from "@/components/Header/Header";
import Image from "next/image";
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-[url('/bcgcmbackground.png')] bg-cover bg-center h-[50vh]">
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
                <Button asChild variant="secondary" size="lg" className="rounded-full">
                  <Link href="/book-appointment">
                    BOOK A CALL
                  </Link>
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
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
                </Button>
              </div>
            </div>

            {/* Mobile menu dropdown */}
            {isMenuOpen && (
              <Card className="md:hidden absolute left-0 w-full z-50">
                <CardContent className="space-y-1 px-4 pt-5 pb-3 sm:px-6">
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
                  <Button asChild className="w-full rounded-full">
                    <Link href="/book-appointment">
                      BOOK A CALL
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center text-white py-20 px-4 flex flex-col">
          <div className="w-full mx-auto p-6">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 bg-green-500 text-white border-0">
              Structured Private
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#38C682]">
              Placement Programs
            </h1>
          </div>
        </section>
      </div>

      {/* Description Section */}
      <section className="bg-white text-gray-800 p-8 sm:p-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold text-lg">
                Do you currently need help with capital and have limited financing options?
              </p>
              <p>Here are some common struggles you may be experiencing:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delayed project timelines due to a lack of access to the necessary capital.</li>
                <li>Stalled business growth, preventing you from taking advantage of new opportunities and expanding your business.</li>
                <li>A strain on your personal and business finances, which can be overwhelming and negatively impact your ability to succeed.</li>
                <li>Difficulty attracting clients to your projects, leaving you without the necessary funding to move forward.</li>
              </ul>
              <p className="font-semibold text-lg">
                If you're facing any of these challenges, don't worry – you're not alone.
              </p>
              <p>
                Welcome to BCGCMi, where we provide an innovative solution to help clients access capital that traditional banks and brokers cannot offer.
              </p>
              <p>
                Our program involves purchasing Courtesy Deposits (CDs) from local FDIC-insured banks in exchange for funding our clients' projects.
              </p>
              <p className="font-semibold">Here are the program details:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our program facilitates funding for projects globally by purchasing Courtesy Deposits from international banks with a corresponding FDIC-insured bank in North America.</li>
                <li>Some financial institutions, subject to their loan offer and terms and conditions, enable clients to access their funds within 72 hours of Courtesy Deposits being deposited into their bank account, subject to certain conditions.</li>
                <li>Clients can access up to two hundred million dollars ($200 million).</li>
              </ul>
              <p className="font-semibold">Conditions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The bank cannot hold Courtesy Deposits (CDs) as collateral, and the client must receive the requested amount of capital.</li>
                <li>The international bank must have a corresponding bank in North America that is FDIC insured to participate.</li>
                <li>Participating companies must seek access to capital between twenty million and two billion dollars (Minimum: $20M USD – Maximum: $2B USD).</li>
                <li>If the client has a viable project and cannot identify a bank willing to accept Courtesy Deposits to finance the project, AFG may be able to assist in finding a bank through AFG's "Locate a Lender" service. Additional fees will apply, and terms and conditions will be provided.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Qualification Section */}
      <section className="bg-gray-100 text-gray-800 p-8 sm:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-green-500 border-green-500">
              Our Values
            </Badge>
            <h2 className="text-4xl font-bold">Qualification</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Integrity Section */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  We conduct ourselves with utmost honesty, transparency, and ethical behavior. We believe in doing what is right for our customers, colleagues, and stakeholders, even when faced with difficult choices.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Customer Centricity Section */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Customer Centricity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Our customers are at the heart of everything we do. We are dedicated to understanding their needs, providing personalized solutions, and delivering exceptional service that exceeds expectations.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Collaboration Section */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  We foster a collaborative and inclusive work environment, where teamwork and diversity are celebrated. By leveraging the unique strengths and perspectives of our employees, we drive innovation and achieve greater success together.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Innovation Section */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  We embrace change and constantly seek innovative solutions to meet the evolving needs of our customers. We encourage our employees to think creatively, challenge conventions, and explore new ideas to drive the future of banking.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="bg-gray-100 text-gray-800 p-8 sm:p-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Why Choose Our Programs As Part of Your Strategy?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">
                Do you currently need help with capital and have limited financing options?
              </p>

              <div>
                <p className="text-base mb-4">Here are some common struggles you may be experiencing:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Delayed project timelines due to a lack of access to the necessary capital.</li>
                  <li>Stalled business growth, preventing you from taking advantage of new opportunities and expanding your business.</li>
                  <li>A strain on your personal and business finances, which can be overwhelming and negatively impact your ability to succeed.</li>
                  <li>Difficulty attracting clients to your projects, leaving you without the necessary funding to move forward.</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold mb-4">Process</h3>
                <ol className="list-decimal list-inside space-y-4">
                  <li>
                    Participating customers must first schedule a consultation call.
                  </li>
                  <li>
                    After the consultation call, the client will receive the initial paperwork:
                    <ul className="list-disc list-inside pl-6 space-y-2 mt-2">
                      <li>CIS/KYC (Customer Information Sheet/Know Your Client)</li>
                      <li>Mutual NDA/NCA Agreement</li>
                      <li>Joint Venture Agreement</li>
                    </ul>
                  </li>
                  <li>
                    Following the consultation call, the client is required to find a financial institution that has agreed to fund the client's project or engage AFG's Locate a Lender Service, assuming that AltFunds Global's financial partner can purchase Courtesy Deposits from the bank. The lender must agree that the Courtesy Deposits are never held as collateral.
                  </li>
                  <li>
                    Once the lender has been identified, AltFunds Global will contact the bank to ensure Courtesy Deposits are not held as collateral. Once confirmed, AltFunds Global will provide the required paperwork for the client to sign, ensuring they acknowledge that the Courtesy Deposits are not held as collateral, and sign any additional paperwork required by the lending institution.
                  </li>
                  <li>
                    The client is required to deposit the fees with the appointed law firm. Once AltFunds Global deposits the required Courtesy Deposits into the lender's bank, AltFunds Global will provide proof that the Courtesy Deposits have been sent. The appointed law firm will then pay the fees due to AltFunds Global.
                  </li>
                  <li>
                    Initially, once all fees are cleared in the law firm's account, a small test run will be conducted. Once the financial institution confirms receipt of the test Courtesy Deposit amount, the remaining Courtesy Deposits will be purchased as per the plan agreed upon with the financial institution.
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}
