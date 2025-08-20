"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function registerPage() {
  return (
    <div className="flex bg-[#F8F8F8] items-center justify-center h-screen">
      <div className="bg-white fixed top-1.5 h-[87%] w-[40%] shadow-lg border-[#E0E0E0]">
        <div className="relative w-full">
          <img src="/banner.png" alt="Banner" className="w-full h-auto" />
          <div className="absolute top-5 -left-20 text-center w-full h-full flex items-center justify-center">
            <h1 className="text-black text-2xl font-extrabold">
              CERTIFICATION MANAGEMENT
              <br /> PORTAL
            </h1>
          </div>
        </div>
        <div className="border border-[#E0E0E0] mt-3 w-full p-4">
          <p className="font-extralight text-center mt-5">
            Please register to create an account
          </p>
          {/* Registration form fields go here */}
        </div>
      </div>
    </div>
  );
}
