"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
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
            Please login to continue
          </p>
          <div>
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Username"
              className="w-full border border-[#E0E0E0] rounded-sm p-1 text-xs mt-1.5 h-8"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="username" className="text-sm">
              Password
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Username"
              className="w-full border border-[#E0E0E0] rounded-sm p-1 text-xs mt-1.5 h-8"
            />
            <p className="italic mt-4 text-gray-500 font-light text-xs">
              *Password is case sensitive
            </p>
          </div>
          <div className="flex justify-end">
            <button className="bg-[#73c686] rounded-full text-white text-xs w-24 h-7 mt-10 bottom-0">
              Login
            </button>
          </div>
        </div>
        <p className="text-base text-center mt-3">
          Cannot login? Click the button below to activate your account.
        </p>
        <div className="flex justify-center">
          <button className="bg-[#E2E6EA] rounded-full text-gray-900 text-xs w-44 h-7 mt-10 bottom-0">
            Activate account here
          </button>
        </div>
      </div>
    </div>
  );
}
