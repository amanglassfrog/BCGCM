// Force rebuild - Footer component updated
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="text-center mb-8">
          {/* <h1 className="text-2xl font-bold text-black mb-2">CONTACT US</h1> */}
         
          <span className="text-xl font-bold tracking-wide" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          <h1 className="text-2xl font-bold text-black mb-2">CONTACT US</h1>
              </span>
              <div className="w-24 h-0.5 bg-black mx-auto mb-8"></div>
          
          {/* BCGCMi Heading */}
          <span className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                <span style={{ color: '#09336F' }}>BCGCM</span><span style={{ color: '#B22222' }}>i</span>
              </span>
          
          <h3 className="text-2xl font-bold text-black mb-2">Boca Communications in Global Capital Markets India</h3>
          <p className="text-lg text-gray-600 mb-12">Private Limited</p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="flex justify-between items-start mb-12">
          {/* Left Column - Registered Office */}
          <div className="w-1/2 pr-8">
            <h3 className="text-xl font-bold text-black mb-4">Registered Office :</h3>
            <div className="space-y-1 text-base text-black">
              <div>C-302. Saisthaan. Plot No. 4,5, & 6,</div>
              <div>Sector-29, Nerul East.</div>
              <div>Navi Mumbai - 400706. Maharashtra</div>
              <div>India</div>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-px bg-gray-300 self-stretch mx-4"></div>

          {/* Right Column - Contact Details */}
          <div className="w-1/2 pl-8">
            <h3 className="text-xl font-bold text-black mb-4"><p style={{ marginLeft: "100px" }}>Contact Details :</p></h3>
            <div className="space-y-1 text-base text-black">
              <div className="flex justify-between">
                <span><p style={{ marginLeft: "100px" }}>Email ID -01</p></span>
                <span><p style={{ marginLeft: "70px" }}>:</p></span>
                <span className="text-right">s.chada@bcgcmindia.com</span>
              </div>
              <div className="flex justify-between">
                <span><p style={{ marginLeft: "100px" }}>Email ID -02</p></span>
                <span><p style={{ marginLeft: "50px" }}>:</p></span>
                <span className="text-right">bcgcmindia@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span><p style={{ marginLeft: "100px" }}>Mobile No</p></span>
                <span><p style={{ marginLeft: "25px" }}>:</p></span>
                <span className="text-right">+91 8080 738225</span>
              </div>
              <div className="flex justify-between">
                  <span><p style={{ marginLeft: "100px" }}>WhatsApp No</p></span>
                <span>:</span>
                <span className="text-right">+91 8080 738225</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <Card className="bg-[#1e3a5f] border-0 rounded-none mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white">DISCLAIMER</h3>
            </div>
            <div className="text-sm leading-relaxed text-white space-y-4">
              <p className="text-justify">
                BCGCMI would NOT like to claim that we are the Traders Or Platform owners | BCGCMI does not have any representatives in the Indian market except the undersigned | BCGCMI is DIRECTLY accessible to the PPP operators based in Switzerland, and USA | BCGCMI undertakes assignments to organize project funding through Strategic & structured financial program | BCGCMI has backing from genuine financial advisory based in New York , Florida & Pennsylvania from USA , and Geneva from Switzerland who are ex-JP Morgan, Barclays and Lehman Brothers | BCGCMI adopts a clear policy for clients / investors adopt and adapt to the proposed process to ensure productive results as stated in the proposal issued | We are NOT brokers or self proclaimed mandates, rather we are facilitators for the Strategic & Structured Financial Program (SSFP) as Private Placement Program
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer bottom */}
        <div className="text-center">
          <p className="text-sm text-gray-600 py-2 px-4">
            Copyright@BCGCMI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
