import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#082541] text-white  text-center py-10 px-5">
      <div className="max-w-4xl mx-auto ">
        <div className="mb-6 ">
          <div className="flex  justify-center items-center mb-6">
            <Image src={"/bcgcmlogo.png"} alt="Logo" width={187} height={66} />{" "}
          </div>

          <p className="text-lg leading-relaxed">
            Explore your options further one-on-one with our team. Our
            consultation calls are designed to guide you through the diverse
            financial programs and identify the optimal solution tailored to
            your unique business needs and objectives.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Image src={"/blocation.png"} alt="Logo" width={22} height={22} />{" "}
            <span>Address Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image src={"/bcall.png"} alt="Logo" width={22} height={22} />{" "}
            <span>+91-1234567890</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image src={"/bmsg.png"} alt="Logo" width={22} height={22} />{" "}
            <span>info@example.com</span>
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
