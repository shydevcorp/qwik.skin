"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { CheckIcon } from "lucide-react";

import { useState } from "react";
import { useFilterStore } from "@/app/stores/filterStore";

export default function TypeAccordion() {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const selectedTypes = useFilterStore((s) => s.selectedTypes);
  const toggleType = useFilterStore((s) => s.toggleType);

  const types = [
    "Gloves",
    "Knife",
    "Pistol",
    "Assault Rifle",
    "SMG",
    "Shotgun",
    "Machine Gun",
    "Sniper Rifle",
    "Other",
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black"
      onValueChange={(value) => setIsTypeOpen(value === "item-1")}
    >
      <AccordionItem value="item-1" className="overflow-hidden">
        <AccordionTrigger
          className="px-1 py-1 text-white hover:no-underline font-medium text-left"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Type
        </AccordionTrigger>
        <AccordionContent className="px-1 py-1">
          {isTypeOpen && (
            <div className="w-full flex items-center justify-center flex-col py-2">
              {types.map((option, index) => (
                <div
                  key={index}
                  className="h-6 w-full flex items-center px-2 rounded-md"
                >
                  <div
                    className="flex items-center gap-2 opacity-80 hover:text-white text-gray-300 justify-start 
                    cursor-pointer group transition-opacity hover:opacity-100 w-full"
                    onClick={() => toggleType(option)}
                  >
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center transition-colors 
                      border border-gray-400 group-hover:bg-[#9D5CFF]"
                    >
                      {selectedTypes.includes(option) && (
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
