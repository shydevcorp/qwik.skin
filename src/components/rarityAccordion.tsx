import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import React from "react";

export default function RarityAccordion({ rarity }: { rarity: any }) {
  return (
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
          Rarity
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
                {rarity.map((option, index) => (
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
                        delay: (7 - index) * 0.03,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <div className="flex items-center gap-2 opacity-80 hover:text-white justify-start cursor-pointer group transition-opacity hover:opacity-100 w-full">
                      <div className="w-4 h-4 rounded flex items-center justify-center transition-colors border border-gray-400 group-hover:bg-[#9D5CFF]">
                        {false && (
                          <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                        )}
                      </div>
                      <span
                        className={`transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide ${option.color}`}
                      >
                        {option.text}
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
  );
}
