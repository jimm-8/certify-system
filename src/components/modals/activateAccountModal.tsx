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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onHide}
        style={{ backdropFilter: "blur(1px)" }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Header */}
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

          {/* Body */}
          <div className="p-4">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-2"
              >
                Enter your email to activate your account:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{
                  fontSize: "0.875rem",
                  borderColor: "#d1d5db",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
              />
            </div>
          </div>

          {/* Footer */}
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
              onClick={() => {
                /* handle activate */
              }}
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

// Demo component to show the modal in action
function Demo() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      <ActivateAccountModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}
