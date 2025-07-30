import React from "react";
import HelpThreeCard from "@/components/helpThreeCard";
import HelpSixCard from "@/components/helpSixCard";
import HelpTwoCol from "@/components/helpTwoCol";

export default function Help() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-6 sm:gap-8 relative overflow-hidden px-3 sm:px-4 md:px-16 lg:px-64 pb-12 sm:pb-16">
      {/* top banner */}
      <div className="w-full h-[40vh] sm:h-[45vh] bg-black absolute top-0 left-0 px-3 sm:px-4 md:px-16 lg:px-64">
        <div className="w-full h-[40vh] sm:h-[45vh] relative flex flex-col justify-center px-0">
          <div className="flex flex-row justify-between h-full w-full">
            {/* Left: Text content */}
            <div className="flex flex-col justify-center h-full w-full z-10">
              <h1
                className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2"
                style={{ fontFamily: "var(--font-space)" }}
              >
                How can we help?
              </h1>
              <p className="text-white/70 text-sm sm:text-base mb-2 max-w-lg">
                Are you feeling uncertain or encountering a
                <span className="hidden sm:inline">
                  <br />
                </span>{" "}
                challenge? Browse through our informative articles or
                <span className="hidden sm:inline">
                  <br />
                </span>
                <span className="text-lime-400 cursor-pointer hover:underline">
                  Chat with us.
                </span>
              </p>
              <div className="flex items-center mt-2 sm:mt-4 w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search help (e.g. Setup, selling)"
                  className="flex-1 h-9 sm:h-11 px-3 sm:px-4 rounded-l-md bg-[#232126] text-white/90 placeholder:text-white/40 focus:outline-none text-sm sm:text-base"
                  style={{ fontFamily: "var(--font-space)" }}
                />
                <button
                  className="h-9 sm:h-11 px-3 sm:px-4 bg-[#232126] text-white/70 rounded-r-md border-l border-[#232126] hover:bg-[#2c2a30] transition"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Go
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                <button
                  className="text-white/70 text-xs px-2 sm:px-3 py-1 rounded-md transition"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Popular pages:
                </button>
                <button
                  className="bg-[#232126] hover:text-violet-500 text-white/70 text-xs px-2 sm:px-3 py-1 rounded-md hover:bg-[#2c2a30] transition"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Support
                </button>
                <button
                  className="bg-[#232126] hover:text-violet-500 text-white/70 text-xs px-2 sm:px-3 py-1 rounded-md hover:bg-[#2c2a30] transition"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Account
                </button>
                <button
                  className="bg-[#232126] hover:text-violet-500 text-white/70 text-xs px-2 sm:px-3 py-1 rounded-md hover:bg-[#2c2a30] transition"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Trade Locked Items
                </button>
              </div>
            </div>
            {/* Right: Image with white color blended to 0 */}
            <div className="hidden md:flex items-center justify-end flex-1 h-full translate-x-[40%] absolute right-0 z-50">
              <img
                src="/banner-monkey.png"
                alt="Help illustration"
                className="h-[90%] object-contain select-none pointer-events-none"
                style={{
                  mixBlendMode: "darken",
                  userSelect: "none",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[45vh] sm:pt-[50vh] flex flex-col gap-6 sm:gap-8">
        <HelpThreeCard />
        <HelpSixCard />
        <HelpTwoCol />
      </div>

      <div className="w-full h-auto py-10 sm:h-[35vh] bg-black rounded-xl shadow-lg flex flex-col items-center justify-center relative px-4">
        <h2
          className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-center"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Still in need of help?
        </h2>
        <p className="text-white/60 text-sm sm:text-base mb-6 text-center max-w-xl">
          Our support team is here to help you with any questions
          <span className="hidden sm:inline">
            <br />
          </span>
          or concerns you may have
        </p>
        <button
          className="bg-lime-500 hover:bg-lime-600 text-black font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-md transition-colors duration-200"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Chat with us
        </button>
      </div>
    </div>
  );
}
