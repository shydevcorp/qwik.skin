import React, { useState } from "react";
import { SortDropdown, GameDropdown } from "@/components/sortDropDown";

export default function GunListHeader({
  isRev = false,
}: {
  isRev: boolean | null;
}) {
  const [sortOption, setSortOption] = useState<string>("Price: Max");
  const [gameOption, setGameOption] = useState<string>("C2");

  return (
    <div
      className={`h-[60px] gap-1 max-[950px]:hidden   w-full bg-[#2D2438] flex rounded-t-xl translate-x-[-4px]  px-4  justify-center items-center ${isRev ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="relative w-4/10 h-2/3 border border-transparent hover:border-white/20 outline: rounded-md transition-all duration-200">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="mdi"
          data-icon="magnify"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="absolute  left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50"
        >
          <path
            fill="currentColor"
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search inventory..."
          style={{ fontFamily: "var(--font-space)" }}
          className="w-full h-full bg-[#1A1625]/40   rounded-md pl-10 pr-2 py-1 text-white/80 outline-none placeholder:text-white/50"
        />
      </div>
      <div className="w-[30%]   h-2/3 rounded-md  flex items-center justify-center">
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>
      <div className="w-[20%] h-2/3 rounded-md">
        <GameDropdown value={gameOption} onChange={setGameOption} />
      </div>
      <div className="w-[10%] h-2/3 flex items-center justify-center rounded-md">
        <svg
          className="p-3 rounded-md text-white/50 hover:bg-white/5  w-full h-full hover:text-white transition-colors cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
        </svg>
      </div>
    </div>
  );
}
