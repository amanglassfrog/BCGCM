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
              Structured Private Placement Programs
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
              Access sophisticated private placement programs designed for institutional investors 
              and high-net-worth individuals seeking strategic investment opportunities.
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
              <CardTitle className="text-2xl">Program Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold text-lg">
                Are you looking for sophisticated investment opportunities with structured returns?
              </p>
              <p>Our Structured Private Placement Programs offer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to exclusive investment opportunities not available through traditional channels</li>
                <li>Structured returns with defined risk parameters and performance metrics</li>
                <li>Diversification across multiple asset classes and geographic regions</li>
                <li>Professional management and oversight by experienced investment teams</li>
                <li>Compliance with regulatory requirements and best practices</li>
              </ul>
              <p className="font-semibold text-lg">
                Program Features:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Minimum investment amounts ranging from $1M to $10M USD</li>
                <li>Investment terms from 12 to 60 months</li>
                <li>Expected returns of 8-15% annually, depending on program type</li>
                <li>Monthly or quarterly distribution options</li>
                <li>Regular reporting and transparency on investment performance</li>
              </ul>
              <p className="font-semibold">Eligibility Requirements:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accredited investors as defined by SEC regulations</li>
                <li>Minimum net worth of $1M (excluding primary residence)</li>
                <li>Annual income of $200K+ for individuals or $300K+ for couples</li>
                <li>Investment experience and understanding of private placement risks</li>
                <li>Ability to meet minimum investment requirements</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Program Types Section */}
      <section className="bg-gray-100 text-gray-800 p-8 sm:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-green-500 border-green-500">
              Investment Programs
            </Badge>
            <h2 className="text-4xl font-bold">Available Programs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Real Estate Development */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Real Estate Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Investment in commercial and residential real estate development projects with structured returns based on project completion and sales.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Infrastructure Projects */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Infrastructure Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Funding for critical infrastructure projects including transportation, energy, and telecommunications with government-backed revenue streams.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Technology Ventures */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Technology Ventures</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Investment in innovative technology companies with high growth potential and structured exit strategies.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Commodity Trading */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Commodity Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Structured programs for trading precious metals, energy commodities, and agricultural products with professional management.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white text-gray-800 p-8 sm:p-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Investment Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-lg">Initial Consultation</h3>
                    <p>Schedule a consultation to discuss your investment goals and review available programs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-lg">Accreditation Verification</h3>
                    <p>Complete the accreditation verification process to confirm eligibility for private placements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-lg">Program Selection</h3>
                    <p>Review and select the most suitable investment program based on your risk tolerance and return objectives.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-lg">Documentation & Funding</h3>
                    <p>Complete all required documentation and fund your investment according to program requirements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-lg">Ongoing Management</h3>
                    <p>Receive regular updates and performance reports while your investment is actively managed.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#082541] text-white p-8 sm:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Explore Private Placements?
          </h2>
          <p className="text-lg mb-8">
            Contact us today to learn more about our structured private placement programs.
          </p>
          <Button asChild size="lg" className="bg-[#38C682] hover:bg-green-600 text-white px-8 py-3 rounded-full">
            <Link href="/book-appointment">
              Schedule Consultation
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
