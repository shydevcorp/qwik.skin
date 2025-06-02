"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@mui/material";
import { CheckIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomAccordion } from "@/components/ui/custom-accordion";

export default function TradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cookieInfo, setCookieInfo] = useState<string>("Checking cookies...");
  const [host, setHost] = useState<string>("Checking hostname...");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [affordableOnly, setAffordableOnly] = useState<boolean>(false);
  const [hasHover, setHasHover] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Helper to format value
  function formatCurrency(val: number) {
    if (val < 1000) return val.toFixed(2);
    return val.toFixed(0);
  }

  const [minInput, setMinInput] = useState(formatCurrency(priceRange[0]));
  const [maxInput, setMaxInput] = useState(formatCurrency(priceRange[1]));

  // Keep input fields in sync with slider
  useEffect(() => {
    setMinInput(formatCurrency(priceRange[0]));
    setMaxInput(formatCurrency(priceRange[1]));
  }, [priceRange]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    setMinInput(raw);
    const num = Number(raw);
    if (!isNaN(num)) {
      const newMin = Math.min(Math.max(0, num), priceRange[1] - 100);
      setPriceRange([newMin, priceRange[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    setMaxInput(raw);
    const num = Number(raw);
    if (!isNaN(num)) {
      const newMax = Math.max(Math.min(10000, num), priceRange[0] + 100);
      setPriceRange([priceRange[0], newMax]);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie;
      setCookieInfo(cookies || "No cookies found");
      setHost(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "unauthenticated") {
        console.log("User is not authenticated, redirecting to home");
        router.push("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, router]);

  return (
    <div className="min-h-screen h-screen bg-neutral-300 relative w-screen flex overflow-hidden px-10 py-8">
      {/* Left Column */}
      <div className="bg-neutral-100 basis-5/12 p-4 h-full flex flex-col gap-4">
        <CustomAccordion
          title="You Offer"
          value={0}
          className=""
          contentClassName="bg-[#383530] h-[140px] text-white"
          headerClassName="bg-[#383530] text-white"
          solanaShadowOnHover={true}
        >
          asf
          {/* Add your content here */}
        </CustomAccordion>
        <div className="w-full h-[100%] bg-green-300 rounded-xl overflow-hidden"></div>
      </div>

      {/* Middle Column */}
      <div className="bg-neutral-100 basis-2/12 gap-2 p-4 px-2 h-full  flex-col flex">
        <button className="w-full text-center self-start min-h-fit h-10 p-4 rounded-md bg-yellow-400">
          Trade items
        </button>
        <div className="w-full h-12 p-1 bg-blue-300/80 rounded-md flex gap-1 relative overflow-hidden ">
          <div className="w-[calc(50%-8px)] ml-1 h-[80%] bg-gray-200/40 absolute top-1/2 -translate-y-1/2 left-0 rounded-md"></div>
          <div className="w-1/2 h-full relative z-4 text-black rounded-md flex justify-center items-center">
            button
          </div>
          <div className="w-1/2 h-full relative z-4 text-black rounded-md flex justify-center items-center">
            button
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full shadow-md bg-white text-black"
        >
          <AccordionItem value="item-1" className="overflow-hidden">
            <AccordionTrigger className="px-1 py-1  font-medium text-left">
              Details
            </AccordionTrigger>
            <AccordionContent className="px-1 py-1">
              <div className="flex flex-col gap-2">
                <div className="h-10 w-full relative rounded-md justify-between flex gap-2">
                  {/* Min input with $ prefix */}
                  <div className="relative w-[42.5%] h-full">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none 
                    select-none"
                    >
                      $
                    </span>
                    <input
                      type="number"
                      value={minInput}
                      onChange={handleMinInputChange}
                      min={0}
                      max={priceRange[1] - 100}
                      className="w-full h-full bg-[#23211d] rounded-md pl-7 pr-2 text-base text-gray-300 border 
                      border-transparent focus:border-yellow-400 focus:outline-none transition-all text-right 
                      font-mono"
                      step="0.01"
                    />
                  </div>
                  <div
                    className="flex items-center justify-center h-full text-gray-400 text-xl font-light 
                  select-none"
                  >
                    -
                  </div>
                  {/* Max input with $ prefix */}
                  <div className="relative w-[42.5%] h-full">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none 
                    select-none"
                    >
                      $
                    </span>
                    <input
                      type="number"
                      value={maxInput}
                      onChange={handleMaxInputChange}
                      min={priceRange[0] + 100}
                      max={10000}
                      className="w-full h-full bg-[#23211d] rounded-md pl-7 pr-2 text-base text-gray-300 border 
                      border-transparent focus:border-yellow-400 focus:outline-none transition-all text-right 
                      font-mono"
                      step="0.01"
                    />
                  </div>
                </div>
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
                      color: "#fbbf24", // yellow-400
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: "0 0 0 8px rgba(251, 191, 36, 0.16)",
                        },
                      },
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#e5e7eb", // gray-200
                      },
                    }}
                  />
                </div>
                <div className="h-8 w-full flex items-center  px-5 rounded-md">
                  <div
                    className="flex items-center gap-2 opacity-80 hover:text-white text-gray-300 justify-center 
                    cursor-pointer group transition-opacity hover:opacity-100"
                    onClick={() => setAffordableOnly((prev) => !prev)}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors $
                    {affordableOnly ? 'bg-yellow-400' : 'bg-transparent'} border border-gray-400`}
                    >
                      {affordableOnly && (
                        <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                      )}
                    </div>
                    <span
                      className="transition-opacity opacity-80 group-hover:opacity-100 text-md 
                    tracking-wide"
                    >
                      Affordable Items
                    </span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          className="w-full shadow-md bg-white text-black"
        >
          <AccordionItem value="item-1" className="overflow-hidden">
            <AccordionTrigger className="px-1 py-1  font-medium text-left">
              Details
            </AccordionTrigger>
            <AccordionContent className="px-1 py-1">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-8 w-full flex items-center  px-5 rounded-md"
                >
                  <div
                    className="flex items-center gap-2 opacity-80 hover:text-black/80 text-gray-400 justify-center 
          cursor-pointer group transition-opacity hover:opacity-100"
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors $
          {true ? 'bg-yellow-400' : 'bg-transparent'} border border-gray-400`}
                    >
                      {affordableOnly && (
                        <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                      )}
                    </div>
                    <span
                      className="transition-opacity opacity-80 group-hover:opacity-100 text-md 
          tracking-wide"
                    >
                      Affordable Items
                    </span>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Right Column */}
      <div className="bg-neutral-100 basis-5/12 p-4 flex flex-col gap-4 h-full ">
        <CustomAccordion
          title="You Offer"
          value={0}
          className=""
          contentClassName="bg-[#383530] h-[140px] text-white"
          headerClassName="bg-[#383530] text-white"
          solanaShadowOnHover={true}
        >
          yo
          {/* Add your content here */}
        </CustomAccordion>
        <div className="w-[calc(100%+4px)] h-[100%]  rounded-xl  overflow-hidden  ">
          <div className="h-[80px] w-full bg-[#383530] flex rounded-t-xl translate-x-[-4px]  px-6" />
          <div className="h-[100%] w-[100%] scrollbar-slim-change  pb-[81px]  bg-black/40 grid grid-cols-4 overflow-y-scroll overflow-x-visible">
            {Array.from({ length: 1000 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square w-full flex items-center justify-center "
              >
                <div className="w-full h-full bg-neutral-800 hover:bg-neutral-500 transition-all duration-200 border border-white "></div>
              </div>
            ))}
          </div>
          <div className="h-[80px] w-full bg-[#383530] flex items-center px-6" />
        </div>
      </div>
    </div>
  );
}
