import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TradeLockAccordion from "./TradeLockAccordion";
import { AnimatePresence, motion } from "framer-motion";
import OtherAccordion from "./otherAccordion";
import { useState } from "react";
import useAccordionStore from "@/app/stores/accordionStore";
import PriceAccordion from "@/components/priceAccordion";
import { phase, rarity, collections } from "@/lib/demo-data";
import PhaseAccordion from "./phaseAccordion";
import RarityAccordion from "./rarityAccordion";
import CollectionAccordion from "./collectionAccordion";

export default function AdvancedAccordion() {
  const {
    FloatRange,
    setFloatRange,
    FloatMinInput,
    setFloatMinInput,
    FloatMaxInput,
    setFloatMaxInput,
    FadeRange,
    setFadeRange,
    FadeMinInput,
    setFadeMinInput,
    FadeMaxInput,
    setFadeMaxInput,
  } = useAccordionStore();

  return (
    <div className="flex flex-col h-full overflow-y-auto max-w-[250px] pb-2 no-scrollbar gap-2">
      <TradeLockAccordion defaultOpen={true} />

      <PriceAccordion
        priceRange={FloatRange}
        setPriceRange={setFloatRange}
        minInput={FloatMinInput}
        setMinInput={setFloatMinInput}
        maxInput={FloatMaxInput}
        setMaxInput={setFloatMaxInput}
        text="Float"
      />

      <PriceAccordion
        priceRange={FadeRange}
        setPriceRange={setFadeRange}
        minInput={FadeMinInput}
        setMinInput={setFadeMinInput}
        maxInput={FadeMaxInput}
        setMaxInput={setFadeMaxInput}
        text="Fade"
      />

      <PhaseAccordion phase={phase} />

      <RarityAccordion rarity={rarity} />

      <CollectionAccordion collections={collections} />

      <OtherAccordion />
    </div>
  );
}
