import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { useState } from "react";
import { useFilterStore } from "@/app/stores/filterStore";

export default function ColorAccordion() {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const selectedColors = useFilterStore((s) => s.selectedColors);
  const toggleColor = useFilterStore((s) => s.toggleColor);

  const colors = [
    { hex: "#1D1D1B", name: "Black" },
    { hex: "#FFFFFF", name: "White" },
    { hex: "#B3B3B3", name: "Gray" },
    { hex: "#F47373", name: "Red" },
    { hex: "#F8A055", name: "Orange" },
    { hex: "#F9E957", name: "Yellow" },
    { hex: "#D1F270", name: "Lime" },
    { hex: "#6BF177", name: "Green" },
    { hex: "#67E8F9", name: "Cyan" },
    { hex: "#78BAFC", name: "Blue" },
    { hex: "#BF7AFB", name: "Purple" },
    { hex: "#FF70D4", name: "Pink" },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black"
      onValueChange={(value) => setIsColorOpen(value === "item-1")}
    >
      <AccordionItem value="item-1" className="overflow-hidden">
        <AccordionTrigger
          className="px-1 py-1 text-white hover:no-underline font-medium text-left"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Color
        </AccordionTrigger>
        <AccordionContent className="px-1 py-1">
          {isColorOpen && (
            <div className="w-full flex items-center justify-center flex-col py-2">
              <div className="grid grid-cols-6 gap-1 w-full p-1">
                {colors?.map((color, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div
                          className="flex items-center justify-center rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => toggleColor(color.name)}
                        >
                          <div className="relative w-full h-5 brightness-110 rounded-md">
                            <div
                              className="absolute inset-0 rounded-md"
                              style={{
                                background: color.hex + "95",
                              }}
                            />
                            <div
                              className="absolute inset-0 brightness-110 rounded-md"
                              style={{
                                background: `linear-gradient(135deg, ${color.hex}60 50%, transparent 50%)`,
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="px-2 py-1">
                        {color.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
