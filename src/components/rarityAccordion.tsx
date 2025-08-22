import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { useFilterStore } from "@/app/stores/filterStore";

export default function RarityAccordion({ rarity }: { rarity: any }) {
  const [isRarityOpen, setIsRarityOpen] = useState(false);
  const selectedRarities = useFilterStore((s) => s.selectedRarities);
  const toggleRarity = useFilterStore((s) => s.toggleRarity);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black"
      onValueChange={(value) => setIsRarityOpen(value === "item-1")}
    >
      <AccordionItem value="item-1" className="overflow-hidden">
        <AccordionTrigger
          className="px-1 py-1 text-white hover:no-underline font-medium text-left"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Rarity
        </AccordionTrigger>
        <AccordionContent className="px-1 py-1">
          {isRarityOpen && (
            <div className="w-full flex items-center justify-center flex-col py-2">
              {rarity.map((option, index) => (
                <div
                  key={index}
                  className="h-6 w-full flex items-center px-2 rounded-md"
                >
                  <div
                    className="flex items-center gap-2 opacity-80 hover:text-white justify-start cursor-pointer group transition-opacity hover:opacity-100 w-full"
                    onClick={() => toggleRarity(option.text)}
                  >
                    <div className="w-4 h-4 rounded flex items-center justify-center transition-colors border border-gray-400 group-hover:bg-[#9D5CFF]">
                      {selectedRarities.includes(option.text) && (
                        <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                      )}
                    </div>
                    <span
                      className={`transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide ${option.color}`}
                    >
                      {option.text}
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
