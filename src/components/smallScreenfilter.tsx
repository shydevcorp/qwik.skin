import { SortDropdown } from "./sortDropDown";
import { useState } from "react";

export function SmallScreenFilter() {
  const [sortOption, setSortOption] = useState<string>("Price: Max");

  return (
    <div className="w-full h-10 flex items-center justify-center px-6">
      <div className="w-[65%] h-full flex items-center gap-2 ">
        <img
          src="/trade/reload.svg"
          alt="arrow"
          className="w-9 h-9 hover:bg-white/5 p-1.5  rounded-sm opacity-80"
        />

        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>
      <div className="w-[35%] h-full flex gap-2 items-center justify-end">
        <img
          src="/trade/control.svg"
          alt="search"
          className="w-9 h-9 hover:bg-white/5 p-1.5  rounded-sm opacity-80"
        />
        <img
          src="/trade/search.svg"
          alt="search"
          className="w-9 h-9 hover:bg-white/5 p-1.5  rounded-sm opacity-80"
        />
      </div>
    </div>
  );
}
