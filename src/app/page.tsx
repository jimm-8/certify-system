"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowRightToBracket,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import ActivateAccountModal from "@/components/modals/activateAccountModal";

export default function LoadingPage() {
  const [isActivateAccountModalOpen, setIsActivateAccountModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenModal = () => {
    setIsActivateAccountModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsActivateAccountModalOpen(false);
  };

  return (
    <div className="flex bg-[rgb(248,248,248)] items-center justify-center h-screen px-4 sm:px-0">
      <div className="bg-white fixed border top-20 sm:top-1.5 left-1/2 transform -translate-x-1/2 h-fit rounded-sm w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-[40%] shadow-lg border-gray-300">
        {" "}
        <div className="relative w-full rounded-sm">
          <img src="/banner.png" alt="Banner" className="w-full h-auto" />
        </div>
        <div className="border-t border-b border-[#E0E0E0] mt-3 w-full p-4">
          <p className="!font-extralight text-center text-lg mt-3">
            Please login to continue
          </p>
          <div>
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="email"
              name="username"
              id="email"
              placeholder="Username"
              className="w-full border border-[#E0E0E0] rounded-sm p-1 text-xs mt-1.5 h-8"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="username" className="text-sm">
              Password
            </label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-[94%] border border-[#E0E0E0] rounded-l-sm p-1 text-xs mt-1.5 h-8 pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-[6%] border border-[#E0E0E0] bg-[#E2E6EA] rounded-r-sm border-l-0 flex items-center justify-center p-1 text-xs mt-1.5 h-8"
              >
                {showPassword ? (
                  <FaEyeSlash size={14} className="text-[#6C757D]" />
                ) : (
                  <FaEye size={14} className="text-[#6C757D]" />
                )}
              </button>
            </div>
            <p className="mt-2 text-gray-500 font-light text-[11px]">
              *Password is case sensitive
            </p>
          </div>
          <div className="flex justify-end">
            <button className="bg-[#73c686] flex items-center justify-center text-center gap-2 rounded-full text-white text-xs font-semibold w-20 sm:w-24 h-7 mt-10 bottom-0">
              <FaArrowRightToBracket className="text-white font-semibold" />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>
        <p className="text-sm font-light text-center mt-3 px-4">
          Cannot login? Click the button below to activate your account.
        </p>
        <div className="flex justify-center px-4">
          <button
            onClick={handleOpenModal}
            className="bg-[#E2E6EA] rounded-full flex items-center justify-center text-center gap-2 text-gray-900 text-xs w-full max-w-xs sm:max-w-none sm:w-52 h-7 mt-5 mb-8"
          >
            <FaUserPlus />
            <span className="hidden sm:inline">Activate account here</span>
          </button>
        </div>
      </div>

      <ActivateAccountModal
        show={isActivateAccountModalOpen}
        onHide={handleCloseModal}
      />
    </div>
  );
}
