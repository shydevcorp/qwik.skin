import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Slider } from "@mui/material";
import { useFilterStore } from "@/app/stores/filterStore";

interface PriceAccordionProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  minInput: string;
  setMinInput: (value: string) => void;
  maxInput: string;
  setMaxInput: (value: string) => void;
  text: string;
}

export default function PriceAccordion({
  priceRange,
  setPriceRange,
  minInput,
  setMinInput,
  maxInput,
  setMaxInput,
  text,
}: PriceAccordionProps) {
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
  const setRangeInStore = useFilterStore((s) =>
    text === "Price"
      ? s.setPriceRange
      : text === "Float"
        ? s.setFloatRange
        : s.setFadeRange,
  );
  const [affordableOnly, setAffordableOnly] = useState<boolean>(false);
  const [hasHover, setHasHover] = useState(false);

  // Get the actual min/max values for the slider
  const sliderMin = text === "Fade" ? 78 : text === "Float" ? 0 : 0;
  const sliderMax = text === "Fade" ? 100 : text === "Float" ? 1 : 50000;
  const sliderStep = text === "Float" ? 0.00001 : text === "Fade" ? 1 : 100;

  // Handle price range slider changes
  const handlePriceChange = (newValue: number[]) => {
    // Ensure values are within bounds
    const min = Math.max(sliderMin, newValue[0]);
    const max = Math.min(sliderMax, newValue[1]);

    if (min !== priceRange[0] || max !== priceRange[1]) {
      setPriceRange([min, max]);
      setRangeInStore([min, max]);
      setMinInput(min.toFixed(text === "Float" ? 5 : 0));
      setMaxInput(max.toFixed(text === "Float" ? 5 : 0));
    }
  };

  // Handle minimum price input changes
  const handleMinInputChange = (value: string) => {
    const raw = value.replace(/[^\d.]/g, "");
    setMinInput(raw);

    const num = Number(raw);
    if (!isNaN(num)) {
      // Don't allow min to exceed max - step
      const newMin = Math.min(num, priceRange[1] - sliderStep);
      setPriceRange([Math.max(sliderMin, newMin), priceRange[1]]);
      setRangeInStore([Math.max(sliderMin, newMin), priceRange[1]]);
    }
  };

  // Handle maximum price input changes
  const handleMaxInputChange = (value: string) => {
    const raw = value.replace(/[^\d.]/g, "");
    setMaxInput(raw);

    const num = Number(raw);
    if (!isNaN(num)) {
      // Don't allow max to be less than min + step
      const newMax = Math.max(num, priceRange[0] + sliderStep);
      setPriceRange([priceRange[0], Math.min(sliderMax, newMax)]);
      setRangeInStore([priceRange[0], Math.min(sliderMax, newMax)]);
    }
  };

  // Get custom slider styles based on the type
  const getSliderStyles = () => {
    if (text === "Fade") {
      return {
        filter: "brightness(0.7)",
        color: "#9D5CFF",
        "& .MuiSlider-thumb": {
          width: 14,
          height: 14,
          backgroundColor: "#fff",
          "&:hover, &.Mui-focusVisible": {
            boxShadow: "0px 0px 0px 8px rgba(157, 92, 255, 0.16)",
          },
        },
        "& .MuiSlider-track": {
          background:
            "linear-gradient(90deg, #9D5CFF 0%, #FF5C5C 50%, #FFD700 100%)",
          border: "none",
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#ffffff30",
          opacity: 1,
        },
      };
    }

    return {
      color: "#9D5CFF70",
      "& .MuiSlider-thumb": {
        width: 14,
        height: 14,
        filter: "brightness(0.8)",
        backgroundColor: "#9D5CFF",
        "&:hover, &.Mui-focusVisible": {
          boxShadow: "0px 0px 0px 8px rgba(157, 92, 255, 0.16)",
        },
      },
      "& .MuiSlider-rail": {
        backgroundColor: "#ffffff30",
        opacity: 1,
      },
    };
  };

  const renderPriceInputs = () => (
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
      <div className="relative w-[42.5%] h-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none select-none">
          {text === "Price" ? "$" : text === "Fade" ? "" : ""}
        </span>
        <input
          type="number"
          value={minInput}
          onChange={(e) => handleMinInputChange(e.target.value)}
          min={sliderMin}
          max={Number(maxInput) - (text === "Float" ? 0.00001 : 100)}
          className={`w-full h-full bg-[#23211d] rounded-md pl-2 pr-2 text-base text-gray-300 border 
            border-transparent focus:border-yellow-400 focus:outline-none transition-all text-right 
            font-mono ${text === "Fade" ? "pr-5" : ""}`}
          step={text === "Float" ? "0.00001" : "1"}
        />
        {text === "Fade" && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none select-none">
            %
          </span>
        )}
      </div>

      <div className="flex items-center justify-center h-full text-gray-400 text-xl font-light select-none">
        -
      </div>

      <div className="relative w-[42.5%] h-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none select-none">
          {text === "Price" ? "$" : text === "Fade" ? "" : ""}
        </span>
        <input
          type="number"
          value={maxInput}
          onChange={(e) => handleMaxInputChange(e.target.value)}
          min={Number(minInput) + (text === "Float" ? 0.00001 : 100)}
          max={sliderMax}
          className={`w-full h-full bg-[#23211d] rounded-md pl-2 pr-2 text-base text-gray-300 border 
            border-transparent focus:border-yellow-400 focus:outline-none transition-all text-right 
            font-mono ${text === "Fade" ? "pr-5" : ""}`}
          step={text === "Float" ? "0.00001" : "1"}
        />
        {text === "Fade" && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none select-none">
            %
          </span>
        )}
      </div>
    </motion.div>
  );

  const renderPriceSlider = () => (
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
        onChange={(_, newValue) => handlePriceChange(newValue as number[])}
        min={sliderMin}
        max={sliderMax}
        step={sliderStep}
        valueLabelDisplay={text === "Price" ? "auto" : "off"}
        className="w-full"
        sx={getSliderStyles()}
      />
    </motion.div>
  );

  const renderAffordableCheckbox = () => {
    if (text === "Float" || text === "Fade") return null;
    return (
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
          className="flex items-center gap-2 opacity-80 hover:text-white text-gray-300 justify-center 
          cursor-pointer group transition-opacity hover:opacity-100"
          onClick={() => setAffordableOnly((prev) => !prev)}
          onMouseEnter={() => setHasHover(true)}
          onMouseLeave={() => setHasHover(false)}
        >
          <div
            className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
              hasHover ? "bg-[#9D5CFF]" : "bg-transparent"
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
    );
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black"
      defaultValue={text === "Price" ? "item-1" : null}
      onValueChange={(value) => setIsPriceRangeOpen(value === "item-1")}
    >
      <AccordionItem value="item-1" className="overflow-hidden">
        <AccordionTrigger
          className="px-1 py-1 text-white hover:no-underline font-medium text-left"
          style={{ fontFamily: "var(--font-space)" }}
        >
          {text}
        </AccordionTrigger>
        <AccordionContent className="px-1 py-1">
          <AnimatePresence mode="wait" initial={false}>
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
                {renderPriceInputs()}
                {renderPriceSlider()}
                {renderAffordableCheckbox()}
              </motion.div>
            )}
          </AnimatePresence>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
