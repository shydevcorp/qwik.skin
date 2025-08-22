"use client";

import { useEffect, useState } from "react";
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
          {/* Left Panel - You Offer */}
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
              <div className="flex-1 mt-[2px] w-full overflow-y-auto scrollbar-slim-change min-h-0">
                <div className="p-6 text-center bg-[#1A1625] gap-4 flex flex-col items-center justify-center rounded-lg px-16 w-full mx-auto min-h-full">
                  <div className="flex justify-center mb-2">
                    <svg
                      className="text-[#ff000070] w-12 h-12"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
                      />
                    </svg>
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-space)" }}
                    className="text-2xl font-bold mb-2"
                  >
                    Trade mode not available
                  </h3>
                  <p
                    style={{ fontFamily: "var(--font-space)" }}
                    className="text-md tracking-wide text-gray-300/70 mb-6"
                  >
                    Your account is not available to trade.
                    <br />
                    More information should be displayed as you try to send a
                    trade offer.
                  </p>
                  <div className="mb-6">
                    <a
                      href="https://steamcommunity.com/tradeoffer/new/?partner=1157767128&token=650gzNAe"
                      target="_blank"
                      className="flex items-center justify-between bg-[#2D2438] hover:bg-[#1A1625] transition-colors p-3 rounded-md mb-4"
                    >
                      <div className="text-sm">
                        Visit our Trade URL to learn more
                      </div>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-icon="arrow-right"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-4 h-4"
                      >
                        <path
                          fill="currentColor"
                          d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Middle Panel */}
          <div className="flex-shrink-0">
            <MiddleRow />
          </div>
          {/* Right Panel - Site Offers */}
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
        {/* Mobile View */}
        <div className="w-full h-full min-[951px]:hidden overflow-hidden min-h-0">
          <SmallScreenTrade activeColumn={activeColumn} />
        </div>
      </div>
    </div>
  );
}
