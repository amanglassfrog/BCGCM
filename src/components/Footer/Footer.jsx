import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="bg-[#082541] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top blue line */}
        <div className="w-full h-1 bg-blue-400 mb-10 rounded-full"></div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          {/* Left Column - Registered Office */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <Badge variant="outline" className="text-blue-300 border-blue-300 mb-4">
                REGISTERED ADDRESS
              </Badge>
              <div className="space-y-3 text-base leading-relaxed">
                <div className="font-medium">BCGCM India Pvt Ltd</div>
                <div>C-302, Saisthaan, Plot No 4/5/6</div>
                <div>Sector-29, Nerul East 400706</div>
                <div>Navi Mumbai, Maharashtra</div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <Badge variant="outline" className="text-blue-300 border-blue-300 mb-4">
                CONTACT INFORMATION
              </Badge>
              <div className="space-y-3 text-base leading-relaxed">
                <div className="font-medium">Email ID: bcgcmindia@gmail.com</div>
                <div className="font-medium">Mobile No: 8080738225</div>
                <div className="font-medium">WA No: 8080738225</div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8 bg-gray-600" />

        {/* Disclaimer Section */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-6 text-lg px-4 py-2 bg-red-600 text-white border-0">
            DISCLAIMER
          </Badge>
          <div className="text-base leading-relaxed max-w-5xl mx-auto text-gray-200 space-y-4">
            <p className="text-justify">
              BCGCMI would NOT like to claim that we are the Traders Or Platform owners | BCGCMI does not have any representatives in the Indian market except the undersigned | BCGCMI is DIRECTLY accessible to the PPP operators based in Switzerland, and USA | BCGCMI undertakes assignments to organize project funding through Strategic & structured financial program | BCGCMI has backing from genuine financial advisory based in New York , Florida & Pennsylvania from USA , and Geneva from Switzerland who are ex-JP Morgan, Barclays and Lehman Brothers | BCGCMI adopts a clear policy for clients / investors adopt and adapt to the proposed process to ensure productive results as stated in the proposal issued | We are NOT brokers or self proclaimed mandates, rather we are facilitators for the Strategic & Structured Financial Program (SSFP) as Private Placement Program
            </p>
          </div>
        </div>

        {/* Footer bottom */}
        <Separator className="my-6 bg-gray-600" />
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: '#B22222' }}>
            Copyright@BCGCMI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;