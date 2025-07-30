import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { Slider } from "@mui/material";
import TradeLockAccordion from "./TradeLockAccordion";
import TypeAccordion from "./typeAccordion";
import ColorAccordion from "./colorAccordion";
import OtherAccordion from "./otherAccordion";
import { useState } from "react";
import PriceAccordion from "./priceAccordion";
import useAccordionStore from "@/app/stores/accordionStore";
import { useFilterStore, ExteriorOption } from "@/app/stores/filterStore";

interface AccordionBasicProps {
  isAdditionalFiltersOpen: boolean;
  setIsAdditionalFiltersOpen: (value: boolean) => void;
}

const EXTERIOR_OPTIONS: ExteriorOption[] = [
  "Other",
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred",
];

export default function AccordionBasic({
  isAdditionalFiltersOpen,
  setIsAdditionalFiltersOpen,
}: AccordionBasicProps) {
  const {
    priceRange,
    setPriceRange,
    minInput,
    setMinInput,
    maxInput,
    setMaxInput,
    text,
  } = useAccordionStore();

  const selectedExteriors = useFilterStore((s) => s.selectedExteriors);
  const toggleExterior = useFilterStore((s) => s.toggleExterior);

  const renderExteriorOption = (option: ExteriorOption, index: number) => (
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
        onClick={() => toggleExterior(option)}
      >
        <div
          className="w-4 h-4 rounded flex items-center justify-center transition-colors 
          border border-gray-400 group-hover:bg-[#9D5CFF]"
        >
          {selectedExteriors.includes(option) && (
            <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
          )}
        </div>
        <span className="transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide">
          {option}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto max-w-[250px] pb-2 no-scrollbar gap-2">
      <PriceAccordion
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minInput={minInput}
        setMinInput={setMinInput}
        maxInput={maxInput}
        setMaxInput={setMaxInput}
        text={text}
      />

      <TradeLockAccordion />

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
                  {EXTERIOR_OPTIONS.map((option, index) =>
                    renderExteriorOption(option, index),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <TypeAccordion />
      <ColorAccordion />
      <OtherAccordion />
    </div>
  );
}
