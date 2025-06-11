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

export default function TradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cookieInfo, setCookieInfo] = useState<string>("Checking cookies...");
  const [host, setHost] = useState<string>("Checking hostname...");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);

  // Helper to format value
  function formatCurrency(val: number) {
    if (val < 1000) return val.toFixed(2);
    return val.toFixed(0);
  }

  const [minInput, setMinInput] = useState(formatCurrency(priceRange[0]));
  const [maxInput, setMaxInput] = useState(formatCurrency(priceRange[1]));
  const [selectedItem, setSelectedItem] = useState<any>(null);

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
    <div className="min-h-screen h-screen bg-[#302e2a] relative w-screen flex overflow-hidden pr-8 pl-3">
      {/* Left Column */}
      <div className="bg-[#302e2a] basis-6/12 p-4 h-full flex flex-col gap-4">
        <CustomAccordion
          title="You Offer"
          value={0}
          className=""
          contentClassName="bg-[#383530] h-[150px] text-white"
          headerClassName="bg-[#383530] text-white"
          headerText="You Offer"
          isRev={true}
        >
          Add the items you want to trade with Qwik.skin
        </CustomAccordion>
        <div className="w-full h-[100%] bg-[#302e2a] rounded-xl overflow-hidden">
          <div className="h-[60px]  w-full bg-white/5">
            <GunListHeader isRev={true} />
          </div>
        </div>
      </div>

      {/* Middle Column */}
      <MiddleRow
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minInput={minInput}
        setMinInput={setMinInput}
        maxInput={maxInput}
        setMaxInput={setMaxInput}
      />

      {/* Right Column */}
      <div className=" basis-6/12 p-4 flex flex-col gap-4 h-full ">
        <CustomAccordion
          title="You Recieve"
          value={0}
          className=""
          contentClassName="bg-[#383530] h-[150px] text-white"
          headerClassName="bg-[#383530] text-white"
          headerText="You Recieve"
        >
          Add the items you want to recieve from our inventory
        </CustomAccordion>
        <div className="w-[calc(100%+4px)] h-[100%]  rounded-xl  overflow-hidden  border border-[#302e2a] ">
          <GunListHeader isRev={false} />
          <div className="h-[100%] mt-[2px]  w-[100%] scrollbar-slim-change  pb-[81px]  bg-black/40 grid grid-cols-4 overflow-y-scroll overflow-x-visible">
            {Array.from({ length: 20 })
              .map((_, index) => demoData)
              .map((item, index) => (
                <motion.div
                  key={index}
                  className="aspect-square w-full relative "
                  onMouseEnter={() => setSelectedItem(index)}
                  onMouseLeave={() => setSelectedItem(null)}
                >
                  <div
                    className={`w-full flex relative items-center justify-center h-full bg-[#383530] hover:brightness-125 transition-all duration-200 border border-[#302e2a] ${
                      selectedItem == index ? "z-50 shadow-md" : ""
                    }`}
                  >
                    <Image
                      style={{
                        filter: `drop-shadow(0 4px 6px rgba(0, 0, 0, .25)) drop-shadow(0 2px 4px rgba(0, 0, 0, .35))`,
                      }}
                      className={`w-[120px] h-[120px] object-cover transition-all duration-200 mix-blend-ligthen ${selectedItem == index ? "-rotate-[3deg] scale-105" : ""}`}
                      src={item?.imageUrl}
                      alt={item?.item?.marketName}
                      width={50}
                      height={50}
                    />
                  </div>
                  <AnimatePresence>
                    {selectedItem === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 100 + "%" }}
                        exit={{
                          opacity: 0.3,
                          height: 0,
                          transition: { duration: 0.08, ease: "easeOut" },
                        }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute bottom-0  overflow-hidden flex gap-[2px] z-[30]   left-0 w-full h-10 bg-transparent translate-y-full rounded-b-md "
                      >
                        <div className="h-full w-full bg-yellow-500 mt-[2px]  flex items-center justify-center">
                          <Image
                            src="/trade/cart.svg"
                            alt="cart"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className="h-full w-full bg-yellow-500 flex mt-[2px] items-center justify-center p">
                          <Image
                            src="/trade/zoom.svg"
                            alt="zoom"
                            width={16}
                            height={16}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>
          <div className="h-[60px] w-full bg-[#383530] flex items-center px-6" />
        </div>
      </div>
    </div>
  );
}
