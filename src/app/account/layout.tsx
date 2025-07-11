"use client";

import { Navbar } from "@/components/Navbar";
import { Receipt, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#1A1625]">
      <div className="relative h-[15vh] w-full flex items-center bg-[#1A1625] border-t border-[#000] ">
        <h1
          className="absolute -translate-x-[20px] left-0 bottom-[40%] translate-y-1/4 text-[4rem] px-4 md:px-16 lg:px-[125px] font-bold select-none tracking-tight text-transparent leading-[0.85] mt-12 hidden sm:block"
          style={{ WebkitTextStroke: "1.5px rgb(82, 82, 91, 0.3)" }}
        >
          Account
        </h1>
        <h1
          className="text-white z-[500] relative text-4xl font-medium px-4 md:px-16 lg:px-[125px]"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Account
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="w-full min-h-[88vh] sm:min-h-[85vh] flex flex-col lg:flex-row bg-[#1A1625]/20 px-0 lg:pr-4 xl:pr-[100px]">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[280px] xl:w-[320px] 2xl:w-[350px] border-r border-[#2D2438] lg:border-r-0 border-b lg:border-b-0 ">
          <div className="p-4 sm:p-6 lg:pl-8 xl:pl-12 2xl:pl-16 lg:pr-6">
            <div className="space-y-3 lg:space-y-4">
              {/* Navigation Links */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
                <a
                  href="/account/settings"
                  className={`flex items-center text-sm sm:text-base lg:text-lg xl:text-xl gap-2 lg:gap-3 px-3 py-2 lg:py-3 ${pathname === "/account/settings" ? "text-yellow-400 bg-[#2D2438]/50" : "text-gray-300 hover:text-white hover:bg-[#2D2438]/50"} rounded-md transition-colors ${pathname === "/account/settings" ? "" : "hover:bg-[#2D2438]/70"}`}
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0" />
                  <span className="truncate">Personal Area</span>
                </a>
                <a
                  href="/account/transactions"
                  className={`flex items-center text-sm sm:text-base lg:text-lg xl:text-xl gap-2 lg:gap-3 px-3 py-2 lg:py-3 ${pathname === "/account/transactions" ? "text-yellow-400 bg-[#2D2438]/50" : "text-gray-300 hover:text-white hover:bg-[#2D2438]/50"} rounded-md transition-colors ${pathname === "/account/transactions" ? "" : "hover:bg-[#2D2438]/70"}`}
                >
                  <Receipt className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0" />
                  <span className="truncate">Transactions</span>
                </a>
                <a
                  href="/account/signout"
                  className="flex items-center text-sm sm:text-base lg:text-lg xl:text-xl gap-2 lg:gap-3 px-3 py-2 lg:py-3 text-red-400 hover:text-red-300 hover:bg-[#2D2438]/50 rounded-md transition-colors"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className="truncate">Sign Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full lg:w-auto overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
