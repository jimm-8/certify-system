"use client";
import React from "react";
import { FaXmark } from "react-icons/fa6";

interface ActivateAccountModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ActivateAccountModal({
  show,
  onHide,
}: ActivateAccountModalProps) {
  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onHide}
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
              onClick={onHide}
              className="p-1 text-black opacity-50 hover:opacity-75 bg-transparent border-0 text-2xl leading-none font-bold"
              style={{ fontSize: "1.5rem", lineHeight: 1 }}
            >
              <FaXmark />
            </button>
          </div>

          <div className="p-4">
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
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Employee ID Card Number (5 digits)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                placeholder="Employee ID Card Number (5 digits)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div
            className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200"
            style={{ borderTopColor: "#dee2e6" }}
          >
            <button
              type="button"
              onClick={onHide}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              style={{
                borderColor: "#6c757d",
                color: "#6c757d",
                transition: "all 0.15s ease-in-out",
              }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="px-4 py-2 text-sm font-medium text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{
                backgroundColor: "#73c686",
                borderColor: "#73c686",
                border: "1px solid #73c686",
                transition: "all 0.15s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5db370";
                e.currentTarget.style.borderColor = "#5db370";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#73c686";
                e.currentTarget.style.borderColor = "#73c686";
              }}
            >
              Activate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
