"use client";

import React from "react";
import { SortDropdown } from "@/components/sortDropDown";
import { useFilterStore } from "@/app/stores/filterStore";
import { RotateCcw } from "lucide-react";

export default function GunListHeader({
  isRev = false,
}: {
  isRev: boolean | null;
}) {
  const sortOption = useFilterStore((s) => s.sortOption);
  const setSortOption = useFilterStore((s) => s.setSortOption);
  const searchText = useFilterStore((s) => s.search);
  const setSearchText = useFilterStore((s) => s.setSearch);

  return (
    <div
      className={`h-[60px] gap-1 max-[950px]:hidden w-full bg-[#2D2438] flex rounded-t-xl translate-x-[-4px] px-4 justify-between items-center ${isRev ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex items-center gap-4">
        <div className="h-2/3 rounded-md flex items-center justify-center">
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>
        <div className="relative w-[300px] h-2/3 rounded-md transition-all duration-200">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="mdi"
            data-icon="magnify"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50"
          >
            <path
              fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              if (e && e.target) {
                setSearchText(e.target.value);
              }
            }}
            placeholder="Search inventory..."
            style={{ fontFamily: "var(--font-space)" }}
            className="w-full h-full bg-[#1A1625]/40 rounded-md pl-12 pr-4 py-2 text-white/80 outline-none placeholder:text-white/50"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <RotateCcw
          className="p-3 rounded-md text-white/50 hover:bg-white/5 w-10 h-10 hover:text-white transition-colors cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}
