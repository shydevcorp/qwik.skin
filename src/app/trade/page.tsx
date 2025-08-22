"use client";

import { useState } from "react";
import { CustomAccordion } from "@/components/ui/custom-accordion";
import GunListHeader from "@/components/gunListHeader";
import MiddleRow from "@/components/middleRow";
import { MappedGuns } from "@/components/mappedGuns";
import { SmallScreenTrade } from "@/components/smallScreenTrade";
import ResponsiveToggle from "@/components/ResponsiveToggle";
import useGunStore from "@/app/stores/gunStore";

export default function TradePage() {
  const { totalValue } = useGunStore();
  const [activeColumn, setActiveColumn] = useState<"user" | "site" | null>(
    "user",
  );

  return (
    <div className="h-[calc(100vh-100px)] bg-[#1A1625] relative w-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <ResponsiveToggle
          activeColumn={activeColumn}
          setActiveColumn={setActiveColumn}
        />
      </div>

      <div className="w-full flex-1 flex overflow-hidden min-h-0">
        <div className="w-full h-full flex min-[951px]:flex max-[950px]:hidden overflow-hidden">
          <div className="bg-[#1A1625] basis-3/6 p-4 pb-0 h-full flex flex-col gap-4 overflow-hidden min-h-0">
            <CustomAccordion
              title="You Offer"
              value={0}
              className="max-[950px]:hidden flex-shrink-0"
              contentClassName="bg-[#2D2438] h-[150px] text-white"
              headerClassName="bg-[#2D2438] text-white"
              headerText="You Offer"
              isRev={true}
            >
              Add the items you want to trade with Qwik.skin
            </CustomAccordion>
            <div className="w-full flex-1 bg-[#1A1625] rounded-xl rounded-b-none overflow-hidden flex flex-col min-h-0">
              <div className="h-[60px] w-full bg-white/5 max-[950px]:hidden flex-shrink-0">
                <GunListHeader isRev={true} />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <MiddleRow />
          </div>
          <div className="bg-[#1A1625] basis-3/6 p-4 pb-0 h-full flex flex-col gap-4 overflow-hidden min-h-0">
            <CustomAccordion
              title="Site Offers"
              value={totalValue}
              className="max-[950px]:hidden flex-shrink-0"
              contentClassName="bg-[#2D2438] h-[150px] text-white"
              headerClassName="bg-[#2D2438] text-white"
              headerText="Site Offers"
              isRev={false}
            >
              Add the items you want to receive from Qwik.skin
            </CustomAccordion>
            <div className="w-full flex-1 bg-[#1A1625] rounded-xl rounded-b-none overflow-hidden flex flex-col min-h-0">
              <div className="h-[60px] w-full bg-white/5 max-[950px]:hidden flex-shrink-0">
                <GunListHeader isRev={false} />
              </div>
              <div className="flex-1 mt-[2px] w-full overflow-y-auto scrollbar-slim-change min-h-0">
                <MappedGuns />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full min-[951px]:hidden overflow-hidden min-h-0">
          <SmallScreenTrade activeColumn={activeColumn} />
        </div>
      </div>
    </div>
  );
}
