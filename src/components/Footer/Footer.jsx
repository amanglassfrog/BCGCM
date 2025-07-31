import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#082541] text-white text-center py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-center items-center mb-6">
            <Image src={"/bcgcmlogo.png"} alt="Logo" width={187} height={66} />
          </div>

          <p className="text-lg leading-relaxed">
            Explore your options further one-on-one with our team. Our
            consultation calls are designed to guide you through the diverse
            financial programs and identify the optimal solution tailored to
            your unique business needs and objectives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {/* Address Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-3">
              <Image src={"/blocation.png"} alt="Location" width={22} height={22} />
              <span className="font-semibold">Address</span>
            </div>
            <div className="text-center text-sm space-y-1">
              <div>BCGCM India Pvt Ltd</div>
              <div>C-302, Saisthaan, Plot No 4/5/6</div>
              <div>Sector-29, Nerul East 400706</div>
              <div>Navi Mumbai,Maharashtra</div>
            </div>
          </div>

          {/* Phone Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-3">
              <Image src={"/bcall.png"} alt="Phone" width={22} height={22} />
              <span className="font-semibold">Phone</span>
            </div>
            <div className="text-sm">
              +91-8080738225
            </div>
          </div>

          {/* Email Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-3">
              <Image src={"/bmsg.png"} alt="Email" width={22} height={22} />
              <span className="font-semibold">Email</span>
            </div>
            <div className="text-sm">
              bcgcmindia@gmail.com
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-400 pt-4">
          <p className="text-xs">@ 2025 BCGCMi, All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
