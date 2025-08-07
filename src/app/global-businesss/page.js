
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
              Global Business Solutions
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
              Comprehensive business solutions for international markets. 
              Strategic consulting, funding, and operational support for global expansion.
            </p>
            <Button asChild size="lg" className="bg-[#09336F] hover:bg-[#082541] text-white px-8 py-3 rounded-full">
              <Link href="/book-appointment">
                Get Started Today
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Overview Section */}
      <section className="bg-white text-gray-800 p-8 sm:p-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Global Business Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold text-lg">
                Are you looking to expand your business globally or need international business solutions?
              </p>
              <p>Our Global Business Services include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>International market entry strategy and consulting</li>
                <li>Cross-border financing and investment solutions</li>
                <li>Global supply chain optimization and management</li>
                <li>International regulatory compliance and legal support</li>
                <li>Multi-currency financial management and hedging</li>
                <li>Global talent acquisition and HR solutions</li>
              </ul>
              <p className="font-semibold text-lg">
                Key Benefits:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to new markets and revenue streams</li>
                <li>Diversification of business operations and risk</li>
                <li>Cost optimization through global sourcing</li>
                <li>Enhanced competitive positioning in international markets</li>
                <li>Strategic partnerships and joint venture opportunities</li>
                <li>Comprehensive support for regulatory compliance</li>
              </ul>
              <p className="font-semibold">Target Markets:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>North America: US and Canada market entry and expansion</li>
                <li>Europe: EU and UK business development and compliance</li>
                <li>Asia-Pacific: China, India, Japan, and Southeast Asia markets</li>
                <li>Middle East: UAE, Saudi Arabia, and regional expansion</li>
                <li>Africa: Emerging market opportunities and development</li>
                <li>Latin America: Brazil, Mexico, and regional growth</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="bg-gray-100 text-gray-800 p-8 sm:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-green-500 border-green-500">
              Our Services
            </Badge>
            <h2 className="text-4xl font-bold">Global Business Solutions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Market Entry Strategy */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Market Entry Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Comprehensive market analysis, entry strategy development, and implementation support for new international markets.
                </CardDescription>
              </CardContent>
            </Card>

            {/* International Financing */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">International Financing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Cross-border financing solutions, currency hedging, and international investment structuring for global operations.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Regulatory Compliance */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  International legal compliance, regulatory navigation, and governance frameworks for global business operations.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Supply Chain Management */}
            <Card className="border-l-4 border-[#38C682] shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Supply Chain Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  Global supply chain optimization, logistics management, and international procurement strategies.
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
              <CardTitle className="text-2xl">Global Expansion Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-lg">Market Assessment</h3>
                    <p>Comprehensive analysis of target markets, competitive landscape, and regulatory environment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-lg">Strategy Development</h3>
                    <p>Customized entry strategy, business model adaptation, and operational planning for target markets.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-lg">Legal & Compliance</h3>
                    <p>Establishment of legal entities, regulatory compliance, and governance frameworks for international operations.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-lg">Operational Setup</h3>
                    <p>Implementation of operational infrastructure, local partnerships, and market entry execution.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#38C682] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-lg">Growth & Optimization</h3>
                    <p>Ongoing support for business growth, performance optimization, and market expansion strategies.</p>
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
            Ready to Go Global?
          </h2>
          <p className="text-lg mb-8">
            Contact us today to discuss your global business expansion needs.
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
