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
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function TradeLockAccordion() {
  const [isTradeLockOpen, setIsTradeLockOpen] = useState(false);
  const [isTradeLockSelected, setIsTradeLockSelected] = useState(8);
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

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black"
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="mr-16 inline-flex items-center justify-center"
                  >
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
                  </motion.div>
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
          <AnimatePresence mode="wait">
            {isTradeLockOpen && (
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
                <motion.div
                  className="grid grid-cols-9 gap-[2px] relative"
                  initial={{ opacity: 0.8, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 5,
                    transition: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute bottom-0 left-0 w-full transition-all duration-300 scale-x-110 h-[3px] z-10 bg-[#2D2438]"
                    layoutId="slider-line"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div
                      className="absolute inset-0 bg-white origin-right"
                      style={{
                        width: `  ${(isTradeLockSelected / (colours.length - 1)) * 100}%`,
                        maskImage: "linear-gradient(to right, black, black)",
                        WebkitMaskImage:
                          "linear-gradient(to right, black, black)",
                      }}
                    />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full scale-x-110 h-[1px] z-10 bg-[#9D5CFF]/20"
                    layoutId="slider-line-shadow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  {colours.map((color, index) => (
                    <motion.div
                      key={index}
                      draggable={false}
                      onClick={() => setIsTradeLockSelected(index)}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const draggedIndex = parseInt(
                          e.dataTransfer.getData("index"),
                        );
                        setIsTradeLockSelected(index);
                      }}
                      className={`w-5 h-4 cursor-pointer relative transition-colors duration-300  flex items-end justify-center`}
                      style={{
                        backgroundColor:
                          Number(isTradeLockSelected) >= index
                            ? color
                            : "#383530",
                      }}
                      whileHover={{
                        scale: 1.15,
                        zIndex: 5,
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <motion.div
                        className="h-2 w-[1px] bg-white"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 1 }}
                      ></motion.div>
                      <AnimatePresence>
                        {isTradeLockSelected === index && (
                          <motion.div
                            className="absolute bottom-0 left-0 w-full h-0 border-transparent border-b-white border-b-[16px] border-l-[10px] border-r-[10px] translate-y-1 z-10"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 0.75 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            layoutId="selected-indicator"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          ></motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="text-white/70 text-xs mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {isTradeLockSelected === 0
                    ? "No trade lock"
                    : `${isTradeLockSelected} day${isTradeLockSelected > 1 ? "s" : ""} trade lock`}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
