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
import { loginUser } from "@/lib/supabase";

export default function LoadingPage() {
  const [isActivateAccountModalOpen, setIsActivateAccountModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleOpenModal = () => {
    setIsActivateAccountModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsActivateAccountModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("🔐 Attempting login for:", formData.username);

      const result = await loginUser(formData.username, formData.password);

      if (result.success) {
        console.log("✅ Login successful:", result.user);
        // Redirect to dashboard or main app
        // router.push('/dashboard'); // Uncomment when you have a dashboard page
        alert("Login successful! (Redirect to dashboard will be implemented)");
      } else {
        console.error("❌ Login failed:", result.error);
        setError(result.error || "Login failed");
      }
    } catch (error: any) {
      console.error("❌ Login error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-[rgb(248,248,248)] items-center justify-center h-screen px-4 sm:px-0">
      <div className="bg-white fixed border top-20 sm:top-1.5 left-1/2 transform -translate-x-1/2 h-fit rounded-sm w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-[40%] shadow-lg border-gray-300">
        <div className="relative w-full rounded-sm">
          <img src="/banner.png" alt="Banner" className="w-full h-auto" />
        </div>

        <form
          onSubmit={handleLogin}
          className="border-t border-b border-[#E0E0E0] mt-3 w-full p-4"
        >
          <p className="!font-extralight text-center text-lg mt-3">
            Please login to continue
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-sm text-xs mt-3">
              {error}
            </div>
          )}

          <div className="mt-3">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Employee ID (5 digits)"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-[#E0E0E0] rounded-sm p-1 text-xs mt-1.5 h-8"
              required
            />
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-[94%] border border-[#E0E0E0] rounded-l-sm p-1 text-xs mt-1.5 h-8 pr-8"
                required
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
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#73c686] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-center gap-2 rounded-full text-white text-xs font-semibold w-20 sm:w-24 h-7 mt-10 bottom-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaArrowRightToBracket className="text-white font-semibold" />
                  <span className="hidden sm:inline">Login</span>
                </>
              )}
            </button>
          </div>
        </form>

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
