
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
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[url('/bcgcmbackground.png')] bg-cover bg-center h-[50vh]">
        <div className="flex flex-col items-center justify-center h-full text-white">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Structured Private Project Funding
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
              Strategic funding solutions for entrepreneurs, startups, and business turnarounds. 
              Access structured private funding programs designed to accelerate your business growth.
            </p>
            <Button asChild size="lg" className="bg-[#09336F] hover:bg-[#082541] text-white px-8 py-3 rounded-full">
              <Link href="/book-appointment">
                Get Started Today
              </Link>
            </Button>
          </div>
        </div>
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
                  We put our customers at the heart of everything we do. We understand their needs, challenges, and aspirations, and we work tirelessly to provide solutions that exceed their expectations.
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
                  We embrace change and continuously seek new ways to improve our services. We encourage creativity and out-of-the-box thinking to deliver cutting-edge solutions.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Excellence Section */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  We strive for excellence in everything we do. We set high standards for ourselves and continuously work to improve our processes, services, and customer experience.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#082541] text-white p-8 sm:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8">
            Contact us today to learn more about our structured private project funding solutions.
          </p>
          <Button asChild size="lg" className="bg-[#38C682] hover:bg-green-600 text-white px-8 py-3 rounded-full">
            <Link href="/book-appointment">
              Book a Consultation
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
