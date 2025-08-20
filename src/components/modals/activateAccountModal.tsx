"use client";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { activateAccount } from "@/lib/supabase";

interface ActivateAccountModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ActivateAccountModal({
  show,
  onHide,
}: ActivateAccountModalProps) {
  const [formData, setFormData] = useState({
    employeeNo: "",
    lastname: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!show) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.employeeNo || formData.employeeNo.length !== 5) {
      setError("Employee ID must be exactly 5 digits");
      return false;
    }
    if (!formData.lastname.trim()) {
      setError("Lastname is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("🔐 Attempting account activation for:", formData.employeeNo);

      const result = await activateAccount(
        formData.employeeNo,
        formData.lastname,
        formData.password
      );

      if (result.success) {
        console.log("✅ Account activation successful:", result.user);
        setSuccess("Account activated successfully! You can now login.");
        // Reset form
        setFormData({
          employeeNo: "",
          lastname: "",
          password: "",
          repeatPassword: "",
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          onHide();
          setSuccess("");
        }, 2000);
      } else {
        console.error("❌ Account activation failed:", result.error);
        setError(result.error || "Account activation failed");
      }
    } catch (error: any) {
      console.error("❌ Activation error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      employeeNo: "",
      lastname: "",
      password: "",
      repeatPassword: "",
    });
    setError("");
    setSuccess("");
    onHide();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={handleClose}
        style={{ backdropFilter: "blur(1px)" }}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
            style={{ borderBottomColor: "#dee2e6" }}
          >
            <h5 className="text-base text-gray-800 m-0">Activate Account</h5>
            <button
              type="button"
              onClick={handleClose}
              className="p-1 text-black opacity-50 hover:opacity-75 bg-transparent border-0 text-2xl leading-none font-bold"
              style={{ fontSize: "1.5rem", lineHeight: 1 }}
            >
              <FaXmark />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm mb-3">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm mb-3">
                {success}
              </div>
            )}

            <div className="mb-3">
              <label
                htmlFor="employeeNo"
                className="block text-sm text-gray-700 mb-2"
              >
                Please enter your 5 digit # located at the back of your Employee
                ID card -{" "}
                <span className="italic">This will be your username</span>
              </label>
              <input
                type="text"
                name="employeeNo"
                id="employeeNo"
                placeholder="Employee ID Card Number (5 digits)"
                value={formData.employeeNo}
                onChange={handleInputChange}
                maxLength={5}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="lastname"
                className="block text-sm text-gray-700 mb-2"
              >
                Lastname written on your employee ID Card (Including Extension)
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-2"
              >
                Password (minimum 6 characters)
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="repeatPassword"
                className="block text-sm text-gray-700 mb-2"
              >
                Repeat Password
              </label>
              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat your password"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div
              className="flex justify-end gap-2 px-0 py-3 border-t border-gray-200 mt-4"
              style={{ borderTopColor: "#dee2e6" }}
            >
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: "#6c757d",
                  color: "#6c757d",
                  transition: "all 0.15s ease-in-out",
                }}
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isLoading ? "#9ca3af" : "#73c686",
                  borderColor: isLoading ? "#9ca3af" : "#73c686",
                  border: "1px solid",
                  transition: "all 0.15s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = "#5db370";
                    e.currentTarget.style.borderColor = "#5db370";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = "#73c686";
                    e.currentTarget.style.borderColor = "#73c686";
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Activating...
                  </div>
                ) : (
                  "Activate"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
