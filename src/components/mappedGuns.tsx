import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { demoData } from "@/lib/demo-data";
import { useState } from "react";
import useAccordionStore from "@/app/stores/accordionStore";

interface MappedGunsProps {
  isResponsive?: boolean;
}

export function MappedGuns({ isResponsive = false }: MappedGunsProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { setModalGun } = useAccordionStore();
  const getDaysUntilTradeable = (tradableAfter: string) => {
    const tradableDate = new Date(tradableAfter);
    const today = new Date();
    const diffTime = tradableDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div
      className={`h-[100%] mt-[1px] w-[100%] scrollbar-slim-change pb-[81px] bg-[#1A1625]/40 grid ${
        isResponsive
          ? "max-[400px]:grid-cols-2 min-[401px]:grid-cols-3 min-[501px]:grid-cols-4 min-[601px]:grid-cols-5 min-[751px]:grid-cols-6"
          : "max-[400px]:grid-cols-2 min-[401px]:grid-cols-3 min-[501px]:grid-cols-4 min-[601px]:grid-cols-5 min-[751px]:grid-cols-6 min-[951px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 overflow-y-scroll"
      } overflow-x-visible`}
    >
      {Array.from({ length: 20 })
        .map((_, index) => demoData)
        .map((item, index) => (
          <motion.div
            key={index}
            className="aspect-square w-full relative"
            onMouseEnter={() => setSelectedItem(index)}
            onMouseLeave={() => setSelectedItem(null)}
          >
            <div
              className={`w-full flex relative items-center justify-center h-full bg-[#2D2438] hover:brightness-125 transition-all duration-200 border border-[#1A1625] ${
                selectedItem == index ? "z-50 shadow-md" : ""
              }`}
            >
              <div className="absolute top-2 left-1 w-fit p-1  rounded-sm flex gap-1 items-center">
                <img
                  src="/trade/lock.svg"
                  alt="lock"
                  className="w-4 h-4 text-[#ffffff60]"
                />
                <span
                  style={{ fontFamily: "var(--font-space)" }}
                  className="text-xs text-white/60"
                >
                  {getDaysUntilTradeable(item.tradableAfter)} days
                </span>
              </div>
              <div className="absolute bottom-2 left-1 w-fit p-1  rounded-sm flex flex-col gap-1 ">
                <h1
                  style={{ fontFamily: "var(--font-space)" }}
                  className="text-xs text-white/80"
                >
                  {item?.item?.marketName?.includes("Field-Tested") ? "FT" : ""}
                </h1>
                <div className="flex items-baseline font-bold tracking-wider">
                  <span
                    style={{ fontFamily: "var(--font-space)" }}
                    className="text-sm text-white"
                  >
                    $ {Math.floor(item.item.price / 100).toLocaleString()}
                  </span>
                  <span
                    style={{ fontFamily: "var(--font-space)" }}
                    className="text-xs text-white/60"
                  >
                    .{(item.item.price % 100).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              <Image
                style={{
                  filter: `drop-shadow(0 4px 6px rgba(0, 0, 0, .25)) drop-shadow(0 2px 4px rgba(0, 0, 0, .35))`,
                }}
                className={`${
                  isResponsive
                    ? "max-[950px]:w-[70%]  max-[950px]:h-[70%] w-[85%] h-[85%]"
                    : "w-[70%] h-[70%]"
                } object-cover transition-all duration-200 mix-blend-ligthen ${
                  selectedItem == index ? "-rotate-[3deg] scale-105" : ""
                }`}
                src={item?.imageUrl}
                alt={item?.item?.marketName}
                width={isResponsive ? 300 : 120}
                height={isResponsive ? 300 : 120}
                loading="lazy"
                quality={80}
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
                  className="absolute bottom-0 overflow-hidden flex gap-[2px] z-[30] left-0 w-full h-10 bg-transparent translate-y-full rounded-b-md"
                >
                  <div className="h-full w-full bg-[#6E3AE4] mt-[2px] flex items-center justify-center">
                    <Image
                      src="/trade/cart.svg"
                      alt="cart"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setModalGun(item);
                    }}
                    className="h-full w-full cursor-pointer bg-[#6E3AE4] hover:bg-[#6E3AE4]/70 transition-all duration-200 flex mt-[2px] items-center justify-center"
                  >
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
  );
}
