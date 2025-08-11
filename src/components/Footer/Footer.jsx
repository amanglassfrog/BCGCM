import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">CONTACT US</h1>
          <div className="w-24 h-0.5 bg-black mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-black mb-2">Boca Communications in Global Capital Markets India</h2>
          <p className="text-lg text-black">Private Limited</p>
        </div>

        {/* Main Content - Two Columns with Registered Office on Left */}
        <div className="flex justify-between mb-12">
          {/* Left Column - Registered Office */}
          <Card className="border-0 shadow-none bg-transparent w-1/3">
            <CardContent className="p-0">
              <h3 className="text-xl font-bold text-black mb-4">Registered Office :</h3>
              <div className="space-y-2 text-base">
                <div className="text-black">C-302. Saisthaan. Plot No. 4,5, & 6,</div>
                <div className="text-black">Sector-29, Nerul East.</div>
                <div className="text-black">Navi Mumbai - 400706. Maharashtra</div>
                <div className="text-black">India</div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Contact Details */}
          {/* <Card className="border-0 shadow-none bg-transparent w-1/3">
            <CardContent className="p-0">
              <h3 className="text-xl font-bold text-black mb-4">&emsp;Contact Details :</h3>
              <div className="space-y-2 text-base">
              <div className="text-black">&emsp;&emsp;&emsp;Email ID -01  &emsp;: info@bcgcmindia.com</div>
                <div className="text-black">&emsp;&emsp;&emsp;Email ID -02  &emsp;: bcgcmindia@gmail.com</div>
                {/* <div className="text-black">Email ID -02 :</div> */}
               {/* <Card className="border-0 shadow-none bg-transparent w-1/3">
  <CardContent className="p-0">
    <h3 className="text-xl font-bold text-black mb-4">Contact Details</h3>
    <div className="space-y-2 text-base text-right text-black">
      <div>&emsp;&emsp;&emsp; Email ID -01:  info@bcgcmindia.com</div>
      <div>Email ID -02: bcgcmindia@gmail.com</div>
      <div>Mobile No&emsp;: +91 8080 738225</div>
      <div>WhatsApp No&emsp;: +91 8080 738225</div>
    </div>
  </CardContent>
</Card> */}
<Card className="border-0 shadow-none bg-transparent w-1/3">
  <CardContent className="p-0">
    {/* Heading */}
    <h3 className="text-xl font-bold text-black mb-4">Contact Details :</h3>

    {/* Grid layout for alignment */}
    <div className="grid grid-cols-[150px_auto] gap-x-2 text-base text-black">
      <div>Email ID -01</div>
      <div>: info@bcgcmindia.com</div>

      <div>Email ID -02</div>
      <div>: bcgcmindia@gmail.com</div>

      <div>Mobile No</div>
      <div>: +91 8080 738225</div>

      <div>WhatsApp No</div>
      <div>: +91 8080738225</div>
    </div>
  </CardContent>
</Card>
        </div>

        {/* Disclaimer Section */}
        <Card className="bg-[#082541] border-0 rounded-none mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white">DISCLAIMER</h3>
            </div>
            <div className="text-sm leading-relaxed max-w-5xl mx-auto text-white space-y-4">
              <p className="text-justify">
                BCGCMI would NOT like to claim that we are the Traders Or Platform owners | BCGCMI does not have any representatives in the Indian market except the undersigned | BCGCMI is DIRECTLY accessible to the PPP operators based in Switzerland, and USA | BCGCMI undertakes assignments to organize project funding through Strategic & structured financial program | BCGCMI has backing from genuine financial advisory based in New York , Florida & Pennsylvania from USA , and Geneva from Switzerland who are ex-JP Morgan, Barclays and Lehman Brothers | BCGCMI adopts a clear policy for clients / investors adopt and adapt to the proposed process to ensure productive results as stated in the proposal issued | We are NOT brokers or self proclaimed mandates, rather we are facilitators for the Strategic & Structured Financial Program (SSFP) as Private Placement Program
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer bottom */}
        <div className="text-center">
          <p className="text-sm text-black py-2 px-4 ">
            Copyright@BCGCMI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
