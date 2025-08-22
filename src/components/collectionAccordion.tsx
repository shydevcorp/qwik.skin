import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CheckIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useFilterStore } from "@/app/stores/filterStore";

export default function CollectionAccordion({
  collections,
}: {
  collections: any;
}) {
  const [showList, setShowList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedCollections = useFilterStore((s) => s.selectedCollections);
  const toggleCollection = useFilterStore((s) => s.toggleCollection);

  const filteredCollections = useMemo(() => {
    if (!searchTerm) return collections;
    return collections.filter((collection: string) =>
      collection.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [collections, searchTerm]);

  return (
    <Accordion type="single" collapsible className="w-full text-black">
      <AccordionItem value="item-1" className="overflow-hidden w-full">
        <AccordionTrigger
          className="px-1 py-1 text-white hover:no-underline font-medium text-left"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Collection
        </AccordionTrigger>
        <AccordionContent className="py-1 w-full">
          <div className="w-full flex items-center justify-center flex-col py-2 min-w-0">
            <div className="w-full px-2 mb-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-8 px-8 rounded-md bg-[#2A2A2A] text-white text-sm border border-gray-600 focus:outline-none focus:border-[#9D5CFF]"
                  onFocus={() => setShowList(true)}
                  onBlur={() => setTimeout(() => setShowList(false), 150)}
                />
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            {showList && (
              <div
                style={{
                  maskImage:
                    "linear-gradient(to top, transparent 0%, white 10%, white 90%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to top, transparent 0%, white 10%, white 90%, transparent 100%)",
                }}
                className="max-h-[200px] overflow-y-auto w-full min-w-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#2A2A2A] [&::-webkit-scrollbar-thumb]:bg-[#9D5CFF] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#8445e3] [&::-webkit-scrollbar]:rounded-full"
              >
                {filteredCollections.map((collection, index) => (
                  <div
                    key={index}
                    className="h-6 w-full flex items-center px-2 rounded-md"
                  >
                    <div
                      className="flex items-center gap-2 opacity-80 hover:text-white justify-start cursor-pointer group transition-opacity hover:opacity-100 w-full"
                      onMouseDown={() => toggleCollection(collection)}
                    >
                      <div className="w-4 h-4 rounded flex items-center justify-center transition-colors border border-gray-400 group-hover:bg-[#9D5CFF]">
                        {selectedCollections.includes(collection) && (
                          <CheckIcon className="h-3 w-3 text-[#23211d] opacity-80" />
                        )}
                      </div>
                      <span className="transition-opacity opacity-80 group-hover:opacity-100 text-md tracking-wide text-white truncate">
                        {collection}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
