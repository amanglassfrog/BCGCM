import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main content area */}
        <div className="mb-10">
          {/* Merged Card for Registered Office and Contact Information */}
          <Card className="bg-gray-200 border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Registered Office */}
                <div className="text-center space-y-4">
                  <Badge variant="outline" className="text-gray-700 border-gray-500 mb-4 text-lg font-bold">
                    REGISTERED ADDRESS
                  </Badge>
                  <div className="space-y-3 text-lg leading-relaxed">
                    <div className="font-semibold text-xl text-black">BCGCM India Pvt Ltd</div>
                    <div className="text-base text-black">C-302, Saisthaan, Plot No 4/5/6</div>
                    <div className="text-base text-black">Sector-29, Nerul East 400706</div>
                    <div className="text-base text-black">Navi Mumbai, Maharashtra</div>
                  </div>
                </div>

                {/* Right Column - Contact Information */}
                <div className="text-center space-y-4">
                  <Badge variant="outline" className="text-gray-700 border-gray-500 mb-4 text-lg font-bold">
                    CONTACT INFORMATION
                  </Badge>
                  <div className="space-y-3 text-lg leading-relaxed">
                    <div className="font-semibold text-xl text-black">Email ID: bcgcmindia@gmail.com</div>
                    <div className="font-semibold text-xl text-black">Mobile No: 8080738225</div>
                    <div className="font-semibold text-xl text-black">WA No: 8080738225</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Separator */}
        <Separator className="my-8 bg-gray-400" />

        {/* Disclaimer Section */}
        <Card className="bg-gray-200 border-0 mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-lg px-6 py-3 bg-[#09336F] text-white border-0 font-bold">
                DISCLAIMER
              </Badge>
            </div>
            <div className="text-sm leading-relaxed max-w-5xl mx-auto text-black space-y-4">
              <p className="text-justify">
                BCGCMI would NOT like to claim that we are the Traders Or Platform owners | BCGCMI does not have any representatives in the Indian market except the undersigned | BCGCMI is DIRECTLY accessible to the PPP operators based in Switzerland, and USA | BCGCMI undertakes assignments to organize project funding through Strategic & structured financial program | BCGCMI has backing from genuine financial advisory based in New York , Florida & Pennsylvania from USA , and Geneva from Switzerland who are ex-JP Morgan, Barclays and Lehman Brothers | BCGCMI adopts a clear policy for clients / investors adopt and adapt to the proposed process to ensure productive results as stated in the proposal issued | We are NOT brokers or self proclaimed mandates, rather we are facilitators for the Strategic & Structured Financial Program (SSFP) as Private Placement Program
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer bottom */}
        <Separator className="my-6 bg-gray-400" />
        <div className="text-center">
          <p className="text-lg font-bold text-black">
            Copyright@BCGCMI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
