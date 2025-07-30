import React from "react";
import { Search } from "lucide-react";

export default function Transactions() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-8 relative overflow-hidden  pb-16">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-xl font-medium">Transactions</h1>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-[#2A2A2A] rounded px-2 py-1">
            <span className="text-sm text-gray-400">Status</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1 bg-[#2A2A2A] rounded px-2 py-1">
            <span className="text-sm text-gray-400">Type</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1 bg-[#2A2A2A] rounded px-2 py-1">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-transparent border-none outline-none text-sm w-32"
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-4 text-sm text-gray-400 py-2 border-b border-gray-800">
          <div>Type</div>
          <div>Details</div>
          <div>Status</div>
          <div>Date</div>
        </div>
        <div className="py-4 text-center text-gray-400 text-sm">
          You currently have no transactions.
        </div>
      </div>
    </div>
  );
}
