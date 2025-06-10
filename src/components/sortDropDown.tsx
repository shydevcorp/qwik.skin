import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import React from "react";

type SortOption = "Price: Max" | "Price: Min" | "Float: Max" | "Float: Min";
type GameOption = "C2" | "rust" | "TF2";

const sortOptions: SortOption[] = [
  "Price: Max",
  "Price: Min",
  "Float: Max",
  "Float: Min",
];

const gameOptions: { label: GameOption; icon: string }[] = [
  {
    label: "C2",
    icon: "https://skinsmonkey.com/_nuxt/img/730.a059836.svg",
  },
  {
    label: "rust",
    icon: "https://skinsmonkey.com/_nuxt/img/252490.be47a7c.svg",
  },
  {
    label: "TF2",
    icon: "https://skinsmonkey.com/_nuxt/img/440.71a9c64.svg",
  },
];

interface SortDropdownProps {
  value: SortOption | string;
  onChange: (value: SortOption) => void;
}

interface GameDropdownProps {
  value: GameOption | string;
  onChange: (value: GameOption) => void;
}

export const GameDropdown: React.FC<GameDropdownProps> = ({
  value,
  onChange,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-3 px-2 py-2 rounded-md  hover:bg-[#504c46] transition-colors text-white/50 hover:text-white font-semibold text-sm shadow-sm border border-transparent focus:outline-none">
        {gameOptions.find((g) => g.label === value) && (
          <img
            src={gameOptions.find((g) => g.label === value)!.icon}
            alt={String(value)}
            className="w-5 h-5"
          />
        )}
        <span className="font-bold">{value}</span>
        <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className="bg-[#45413c] border-none mt-1 min-w-[112px] rounded-md shadow-lg"
      align="start"
    >
      {gameOptions.map((option) => (
        <DropdownMenuItem
          key={option.label}
          onClick={() => onChange(option.label)}
          className={`flex items-center gap-2 max-w-full px-4 py-2 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-[#504c46] transition-colors ${
            value === option.label ? "opacity-100" : "opacity-80"
          }`}
        >
          <img src={option.icon} alt={option.label} className="w-5 h-5" />
          <span>{option.label}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 px-2 py-2 rounded-md  hover:bg-[#504c46]  transition-colors text-white/50 hover:text-white font-semibold text-sm shadow-sm border border-transparent focus:outline-none">
          <SlidersHorizontal className="w-5 h-5 opacity-80" />
          <span className="font-bold">{value}</span>
          <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-[#45413c] border-none mt-1 min-w-[100%] rounded-md shadow-lg"
        align="start"
      >
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className={`flex items-center gap-2 max-w-full px-4 py-2 text-white  text-sm font-semibold rounded-md cursor-pointer hover:bg-[#504c46] transition-colors ${
              value === option ? "opacity-100" : "opacity-80"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5 opacity-80" />
            <span>{option}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
