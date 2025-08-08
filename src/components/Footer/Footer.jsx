import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="bg-[#082541] text-white py-6 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main content area */}
        <div className="mb-10">
          {/* Two Column Layout for Registered Office and Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Registered Office */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">REGISTERED ADDRESS</h3>
              <div className="space-y-2 text-sm">
                <div className="text-white">BCGCM India Pvt Ltd</div>
                <div className="text-white">C-302, Saisthaan, Plot No 4/5/6</div>
                <div className="text-white">Sector-29, Nerul East 400706</div>
                <div className="text-white">Navi Mumbai, Maharashtra</div>
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">CONTACT INFORMATION</h3>
              <div className="space-y-2 text-sm">
                <div className="text-white">Email ID: bcgcmindia@gmail.com</div>
                <div className="text-white">Mobile No: 8080738225</div>
                {/* <div className="text-white">WA No: 8080738225</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        {/* <Separator className="my-8 bg-gray-400" /> */}

        {/* Disclaimer Section */}
        <Card className="bg-[#082541] border-0 mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-1">
              <Badge variant="outline" className=" text-xs px-4 py-2 bg-transparent text-white border-gray-500 font-bold">
                DISCLAIMER
              </Badge>
            </div>
            <div className="text-xs leading-relaxed max-w-12xl mx-auto text-white space-y-2">
              <p className="text-justify font-bold">
                BCGCMI would NOT like to claim that we are the Traders Or Platform owners | BCGCMI does not have any representatives in the Indian market except the undersigned | BCGCMI is DIRECTLY accessible to the PPP operators based in Switzerland, and USA | BCGCMI undertakes assignments to organize project funding through Strategic & structured financial program | BCGCMI has backing from genuine financial advisory based in New York , Florida & Pennsylvania from USA , and Geneva from Switzerland who are ex-JP Morgan, Barclays and Lehman Brothers | BCGCMI adopts a clear policy for clients / investors adopt and adapt to the proposed process to ensure productive results as stated in the proposal issued | We are NOT brokers or self proclaimed mandates, rather we are facilitators for the Strategic & Structured Financial Program (SSFP) as Private Placement Program
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer bottom */}
        <Separator className="my-1 bg-white space-y-2" />
        <div className="text-center">
          <p className="text-xs font-bold text-white">
            Copyright@BCGCMI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
