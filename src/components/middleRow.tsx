import React, { useEffect, useState } from "react";
import AccordionBasic from "./accordionBasic";
import AdvancedAccordion from "./advancedAccordion";
import useAccordionStore from "@/app/stores/accordionStore";
import { useFilterStore } from "@/app/stores/filterStore";
import useGunStore from "@/app/stores/gunStore";
import NumberFlow from "@number-flow/react";

const formatCurrency = (val: number) => {
  if (val < 1000) return val.toFixed(2);
  return val.toFixed(0);
};

export function TradeValue() {
  const { totalValue } = useGunStore();
  return (
    <span style={{ fontFamily: "var(--font-space)" }}>
      $&nbsp;
      <NumberFlow
        value={Number(
          totalValue.toString().slice(0, -2) +
            "." +
            totalValue.toString().slice(-2),
        )}
        trend={0}
        format={{ notation: "standard" }}
      />
    </span>
  );
}

export default function MiddleRow() {
  const [isAdditionalFiltersOpen, setIsAdditionalFiltersOpen] = useState(false);
  const [accordionType, setAccordionType] = useState<"basic" | "advanced">(
    "basic",
  );
  const { totalValue } = useGunStore();
  const { priceRange, setMinInput, setMaxInput, resetFilters } =
    useAccordionStore();
  const resetAllFilters = useFilterStore((s) => s.resetFilters);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMinInput(formatCurrency(priceRange[0]));
      setMaxInput(formatCurrency(priceRange[1]));
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [priceRange, setMinInput, setMaxInput]);

  return (
    <div className="basis-3/12 gap-2 p-4 px-2 h-full flex-col min-w-[250px] flex max-[950px]:hidden">
      <button className="w-full text-center font-semibold self-start min-h-fit h-10 text-[#1A1625] p-4 rounded-md bg-[#9D5CFF]">
        Trade items
      </button>
      {totalValue > 0 && (
        <div className="w-full text-center font-semibold self-start text-white/80 px-2 rounded-md bg-[#2D2438] flex items-center flex-col justify-center overflow-hidden">
          <TradeValue />
          <span
            style={{ fontFamily: "var(--font-space)" }}
            className="text-white/40 text-xs"
          >
            Needed for trade
          </span>
        </div>
      )}

      <div
        style={{ fontFamily: "var(--font-space)" }}
        className="w-full h-10 p-1 bg-[#2D2438] rounded-sm flex gap-1 relative overflow-hidden"
      >
        <div
          className={`w-[calc(50%-8px)] ml-1 h-[80%] bg-white/15 absolute top-1/2 -translate-y-1/2 rounded-sm ${
            accordionType === "basic" ? "left-0" : "left-[50%]"
          }`}
        ></div>
        <div
          onClick={() => setAccordionType("basic")}
          className="w-1/2 cursor-pointer h-full relative z-4 text-white text-sm rounded-sm flex justify-center items-center"
        >
          Basic
        </div>
        <div
          onClick={() => setAccordionType("advanced")}
          className="w-1/2 cursor-pointer h-full relative z-4 text-white text-sm rounded-sm flex justify-center items-center"
        >
          Advanced
        </div>
      </div>

      <div className="w-full h-full max-h-[80%] overflow-y-auto no-scrollbar">
        {accordionType === "basic" ? (
          <div>
            <AccordionBasic
              isAdditionalFiltersOpen={isAdditionalFiltersOpen}
              setIsAdditionalFiltersOpen={setIsAdditionalFiltersOpen}
            />
          </div>
        ) : (
          <div>
            <AdvancedAccordion />
          </div>
        )}
      </div>

      <button
        style={{ fontFamily: "var(--font-space)" }}
        className="w-full text-center font-medium self-start min-h-fit h-10 text-white px-4 py-2 rounded-md bg-transparent border border-[#9D5CFF]/20 hover:bg-[#9D5CFF]/10 transition-colors flex items-center justify-center mt-auto mb-4"
        onClick={() => {
          resetFilters();
          resetAllFilters();
        }}
      >
        Reset filters
      </button>
    </div>
  );
}
