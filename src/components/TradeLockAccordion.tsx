import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState } from "react";
import { useFilterStore } from "@/app/stores/filterStore";

interface TradeLockAccordionProps {
  defaultOpen?: boolean;
}

export default function TradeLockAccordion({
  defaultOpen = false,
}: TradeLockAccordionProps) {
  const [isTradeLockOpen, setIsTradeLockOpen] = useState(defaultOpen);
  const tradeLocked = useFilterStore((s) => s.tradeLocked);
  const setTradeLocked = useFilterStore((s) => s.setTradeLocked);

  const colours = [
    "#B388FF", // Lightest purple
    "#A379FF",
    "#946AFF",
    "#855BFF",
    "#764CFF",
    "#673DFF",
    "#582EFF",
    "#491FFF",
    "#3A10FF", // Darkest purple
  ];

  // Convert tradeLocked state to slider value
  const getSliderValue = () => {
    if (tradeLocked === null) return 8; // Default to end (no filter)
    if (tradeLocked === true) return 0; // Start (trade locked only)
    return 4; // Middle (not trade locked)
  };

  const handleSliderChange = (index: number) => {
    if (index === 8) {
      setTradeLocked(null); // No filter
    } else if (index <= 2) {
      setTradeLocked(true); // Trade locked
    } else {
      setTradeLocked(false); // Not trade locked
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black"
      defaultValue={defaultOpen ? "item-1" : undefined}
      onValueChange={(value) => setIsTradeLockOpen(value === "item-1")}
    >
      <AccordionItem value="item-1" className="overflow-hidden">
        <AccordionTrigger
          className="px-1 py-1 text-white hover:no-underline font-medium text-left"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Trade Lock
          {isTradeLockOpen && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mr-16 inline-flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-white/70 hover:text-white/90 transition-colors"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-md">
                  <p className="text-xs">
                    Trade Lock is Valve's temporary restriction on tradeable
                    items that were received or purchased from the Steam Market
                    less than 8 days ago. In the upper left corner, it shows how
                    long it will take before your item is tradeable.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </AccordionTrigger>
        <AccordionContent className="px-1 py-1">
          {isTradeLockOpen && (
            <div className="w-full flex items-center justify-center flex-col py-2">
              <div className="grid grid-cols-9 gap-[2px] relative">
                <div className="absolute bottom-0 left-0 w-full transition-all duration-300 scale-x-110 h-[3px] z-10 bg-[#2D2438]">
                  <div
                    className="absolute inset-0 bg-white origin-right"
                    style={{
                      width: `  ${(getSliderValue() / (colours.length - 1)) * 100}%`,
                      maskImage: "linear-gradient(to right, black, black)",
                      WebkitMaskImage:
                        "linear-gradient(to right, black, black)",
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full scale-x-110 h-[1px] z-10 bg-[#9D5CFF]/20" />
                {colours.map((color, index) => (
                  <div
                    key={index}
                    draggable={false}
                    onClick={() => handleSliderChange(index)}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const draggedIndex = parseInt(
                        e.dataTransfer.getData("index"),
                      );
                      handleSliderChange(draggedIndex);
                    }}
                    className={`w-5 h-4 cursor-pointer relative transition-colors duration-300 flex items-end justify-center hover:scale-105 hover:z-10 hover:shadow-lg`}
                    style={{
                      backgroundColor:
                        getSliderValue() >= index ? color : "#383530",
                    }}
                  >
                    <div className="h-2 w-[1px] bg-white opacity-60 hover:opacity-100"></div>
                    {getSliderValue() === index && (
                      <div className="absolute bottom-0 left-0 w-full h-0 border-transparent border-b-white border-b-[16px] border-l-[10px] border-r-[10px] translate-y-1 z-10"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-white/70 text-xs mt-4 text-center">
                {tradeLocked === null
                  ? "No filter"
                  : tradeLocked === true
                    ? "Trade locked only"
                    : "Not trade locked"}
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
