import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { useFilterStore } from "@/app/stores/filterStore";

export default function PhaseAccordion({ phase }: { phase: string[] }) {
  const [isPhaseOpen, setIsPhaseOpen] = useState(false);
  const selectedPhases = useFilterStore((s) => s.selectedPhases);
  const togglePhase = useFilterStore((s) => s.togglePhase);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black"
      onValueChange={(value) => setIsPhaseOpen(value === "item-1")}
    >
      <AccordionItem value="item-1" className="overflow-hidden">
        <AccordionTrigger
          className="px-1 py-1 text-white hover:no-underline font-medium text-left"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Phase
        </AccordionTrigger>
        <AccordionContent className="px-1 py-1">
          {isPhaseOpen && (
            <div className="w-full flex items-center justify-center flex-col py-2">
              {phase.map((option, index) => (
                <div
                  key={index}
                  className="h-6 w-full flex items-center px-2 rounded-md"
                >
                  <div
                    className="flex items-center gap-2 opacity-80 hover:text-white text-gray-300 justify-start cursor-pointer group transition-opacity hover:opacity-100 w-full"
                    onClick={() => togglePhase(option)}
                  >
                    <div className="w-4 h-4 rounded flex items-center justify-center transition-colors border border-gray-400 group-hover:bg-[#9D5CFF]">
                      {selectedPhases.includes(option) && (
                        <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                      )}
                    </div>
                    <span className="transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide">
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
