import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Slider } from "@mui/material";
import { CheckIcon } from "lucide-react";

interface MiddleRowProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  minInput: string;
  setMinInput: (value: string) => void;
  maxInput: string;
  setMaxInput: (value: string) => void;
}

export default function MiddleRow({
  priceRange,
  setPriceRange,
  minInput,
  setMinInput,
  maxInput,
  setMaxInput,
}: MiddleRowProps) {
  const [affordableOnly, setAffordableOnly] = useState<boolean>(false);
  const [hasHover, setHasHover] = useState<boolean>(false);

  // Handle price range slider changes
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // Handle minimum price input changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    setMinInput(raw);

    const num = Number(raw);
    if (!isNaN(num)) {
      const newMin = Math.min(Math.max(0, num), priceRange[1] - 100);
      setPriceRange([newMin, priceRange[1]]);
    }
  };

  // Handle maximum price input changes
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    setMaxInput(raw);

    const num = Number(raw);
    if (!isNaN(num)) {
      const newMax = Math.max(Math.min(10000, num), priceRange[0] + 100);
      setPriceRange([priceRange[0], newMax]);
    }
  };

  return (
    <div className="basis-2/12 gap-4 p-4 px-2 h-full flex-col flex">
      {/* Trade button */}
      <button className="w-full text-center font-semibold self-start min-h-fit h-10 text-[#302e2a] p-4 rounded-md bg-yellow-400">
        Trade items
      </button>

      {/* Filter mode toggle */}
      <div
        style={{ fontFamily: "var(--font-space)" }}
        className="w-full h-10 p-1 bg-[#3f3c38] rounded-sm flex gap-1 relative overflow-hidden"
      >
        <div className="w-[calc(50%-8px)] ml-1 h-[80%] bg-white/15 absolute top-1/2 -translate-y-1/2 left-0 rounded-sm"></div>
        <div className="w-1/2 h-full relative z-4 text-white rounded-sm flex justify-center items-center">
          Basic
        </div>
        <div className="w-1/2 h-full relative z-4 text-white rounded-sm flex justify-center items-center">
          Advanced
        </div>
      </div>

      {/* Price filter accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full text-black"
      >
        <AccordionItem value="item-1" className="overflow-hidden">
          <AccordionTrigger className="px-1 py-1 text-white hover:no-underline font-medium text-left">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="px-1 py-1">
            <div className="flex flex-col gap-2">
              {/* Min/Max price inputs */}
              <div className="h-10 w-full relative rounded-md justify-between flex gap-2">
                {/* Min input with $ prefix */}
                <div className="relative w-[42.5%] h-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none select-none">
                    $
                  </span>
                  <input
                    type="number"
                    value={minInput}
                    onChange={handleMinInputChange}
                    min={0}
                    max={priceRange[1] - 100}
                    className="w-full h-full bg-[#23211d] rounded-md pl-2 pr-2 text-base text-gray-300 border 
                    border-transparent focus:border-yellow-400 focus:outline-none transition-all text-right 
                    font-mono"
                    step="0.01"
                  />
                </div>
                <div className="flex items-center justify-center h-full text-gray-400 text-xl font-light select-none">
                  -
                </div>
                {/* Max input with $ prefix */}
                <div className="relative w-[42.5%] h-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none select-none">
                    $
                  </span>
                  <input
                    type="number"
                    value={maxInput}
                    onChange={handleMaxInputChange}
                    min={priceRange[0] + 100}
                    max={10000}
                    className="w-full h-full bg-[#23211d] rounded-md pl-2 pr-2 text-base text-gray-300 border 
                    border-transparent focus:border-yellow-400 focus:outline-none transition-all text-right 
                    font-mono"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Price range slider */}
              <div className="h-8 w-full flex items-center px-5 rounded-md">
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  min={0}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                  className="w-full"
                  sx={{
                    color: "#7b776f",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#fff",
                      border: "2px solid currentColor",
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: "0 0 0 3px #7b776f",
                      },
                    },
                    "& .MuiSlider-track": {
                      border: "none",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#e5e7eb",
                    },
                  }}
                />
              </div>

              {/* Affordable items checkbox */}
              <div className="h-8 w-full flex items-center px-5 rounded-md">
                <div
                  className="flex items-center gap-2 opacity-80 hover:text-white text-gray-300 justify-center 
                  cursor-pointer group transition-opacity hover:opacity-100"
                  onClick={() => setAffordableOnly((prev) => !prev)}
                  onMouseEnter={() => setHasHover(true)}
                  onMouseLeave={() => setHasHover(false)}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      hasHover ? "bg-yellow-400" : "bg-transparent"
                    } border border-gray-400`}
                  >
                    {affordableOnly && (
                      <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                    )}
                  </div>
                  <span className="transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide">
                    Affordable Items
                  </span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Additional filters accordion */}
      <Accordion type="single" collapsible className="w-full text-black">
        <AccordionItem value="item-1" className="overflow-hidden">
          <AccordionTrigger className="px-1 py-1 text-white hover:no-underline font-medium text-left">
            Additional Filters
          </AccordionTrigger>
          <AccordionContent className="px-1 py-1">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-8 w-full flex items-center px-5 rounded-md"
              >
                <div
                  className="flex items-center gap-2 opacity-80 hover:text-black/80 text-gray-400 justify-center 
                cursor-pointer group transition-opacity hover:opacity-100"
                >
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center transition-colors 
                  border border-gray-400"
                  >
                    {affordableOnly && (
                      <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                    )}
                  </div>
                  <span className="transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide">
                    Filter Option {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
