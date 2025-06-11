import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Slider } from "@mui/material";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import TradeLockAccordion from "./TradeLockAccordion";
import ColorAccordion from "./colorAccordion";
import TypeAccordion from "./typeAccordion";

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

  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);

  const [isAdditionalFiltersOpen, setIsAdditionalFiltersOpen] = useState(false);
  const [isExteriorOpen, setIsExteriorOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

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
    <div className="basis-2/12 gap-2 p-4 px-2 h-full flex-col flex">
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
        <div className="w-1/2 h-full relative z-4 text-white text-sm rounded-sm flex justify-center items-center">
          Basic
        </div>
        <div className="w-1/2 h-full relative z-4 text-white text-sm rounded-sm flex justify-center items-center">
          Advanced
        </div>
      </div>

      {/* Price filter accordion */}
      <div className="flex flex-col h-full overflow-y-auto pb-2 no-scrollbar gap-2">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full text-black"
          onValueChange={(value) => setIsPriceRangeOpen(value === "item-1")}
        >
          <AccordionItem value="item-1" className="overflow-hidden">
            <AccordionTrigger
              className="px-1 py-1 text-white hover:no-underline font-medium text-left"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Price
            </AccordionTrigger>
            <AccordionContent className="px-1 py-1">
              <AnimatePresence mode="wait">
                {isPriceRangeOpen && (
                  <motion.div
                    className="flex flex-col gap-2"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {/* Min/Max price inputs */}
                    <motion.div
                      className="h-10 w-full relative rounded-md justify-between flex gap-2"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      }}
                    >
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
                    </motion.div>

                    {/* Price range slider */}
                    <motion.div
                      className="h-8 w-full flex items-center px-5 rounded-md"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: 0.1,
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      }}
                    >
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
                    </motion.div>

                    {/* Affordable items checkbox */}
                    <motion.div
                      className="h-8 w-full flex items-center px-2 rounded-md"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: 0.15,
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <div
                        className="flex items-center gap-2  opacity-80 hover:text-white text-gray-300 justify-center 
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
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <TradeLockAccordion />

        {/* Additional filters accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full text-black"
          onValueChange={(value) =>
            setIsAdditionalFiltersOpen(value === "item-1")
          }
        >
          <AccordionItem value="item-1" className="overflow-hidden">
            <AccordionTrigger
              className="px-1 py-1 text-white hover:no-underline font-medium text-left"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Exterior
            </AccordionTrigger>
            <AccordionContent className="px-1 py-1">
              <AnimatePresence mode="wait">
                {isAdditionalFiltersOpen && (
                  <motion.div
                    className="w-full flex items-center justify-center flex-col py-2"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {[
                      "Other",
                      "Factory New",
                      "Minimal Wear",
                      "Field-Tested",
                      "Well-Worn",
                      "Battle-Scarred",
                    ].map((option, index) => (
                      <motion.div
                        key={index}
                        className="h-8 w-full flex items-center px-2 rounded-md"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: index * 0.05,
                            duration: 0.3,
                            ease: "easeOut",
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: -5,
                          transition: {
                            duration: 0.2,
                            delay: (5 - index) * 0.03,
                            ease: "easeInOut",
                          },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div
                          className="flex items-center gap-2 opacity-80 hover:text-white text-gray-300 justify-start 
                        cursor-pointer group transition-opacity hover:opacity-100 w-full"
                        >
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center transition-colors 
                          border border-gray-400 group-hover:bg-yellow-400"
                          >
                            {false && (
                              <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                            )}
                          </div>
                          <span className="transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide">
                            {option}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <TypeAccordion />

        <ColorAccordion />

        {/* Other accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full text-black"
          onValueChange={(value) => {}}
        >
          <AccordionItem value="item-1" className="overflow-hidden">
            <AccordionTrigger
              className="px-1 py-1 text-white hover:no-underline font-medium text-left"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Other
            </AccordionTrigger>
            <AccordionContent className="px-1 py-1">
              <AnimatePresence mode="wait">
                {true && (
                  <motion.div
                    className="w-full flex items-center justify-center flex-col py-2"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {["StatTrak™", "Trade Locked"].map((option, index) => (
                      <motion.div
                        key={index}
                        className="h-8 w-full flex items-center px-2 rounded-md"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: index * 0.05,
                            duration: 0.3,
                            ease: "easeOut",
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: -5,
                          transition: {
                            duration: 0.2,
                            delay: (1 - index) * 0.03,
                            ease: "easeInOut",
                          },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div
                          className="flex items-center gap-2 opacity-80 hover:text-white text-gray-300 justify-start 
                        cursor-pointer group transition-opacity hover:opacity-100 w-full"
                        >
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center transition-colors 
                          border border-gray-400 group-hover:bg-yellow-400"
                          >
                            {false && (
                              <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                            )}
                          </div>
                          <span className="transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide">
                            {option}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Reset Filters Button */}
      <button
        style={{ fontFamily: "var(--font-space)" }}
        className="w-full text-center font-medium self-start min-h-fit h-10 text-white px-4 py-2 rounded-md bg-transparent border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center mt-auto mb-4"
        onClick={() => {
          // Reset price range
          setPriceRange([0, 10000]);
          setMinInput("0.00");
          setMaxInput("10000");

          // Reset other filters
          setAffordableOnly(false);

          // Reset accordion states if needed
          setIsPriceRangeOpen(true);
          setIsAdditionalFiltersOpen(false);
          setIsExteriorOpen(false);
          setIsTypeOpen(false);
        }}
      >
        Reset filters
      </button>
    </div>
  );
}
