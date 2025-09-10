import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useGunStore from "@/app/stores/gunStore";

interface GunItemProps {
  item: any;
  index: number;
  isResponsive: boolean;
  isSelected: boolean;
  toggleGun: (id: string, price: number) => void;
  setModalGun?: (gun: any) => void;
  isSelectedList?: boolean;
  isAccordionItem?: boolean;
}

const GunItem = ({
  item,
  index,
  isResponsive,
  isSelected,
  toggleGun,
  setModalGun,
  isSelectedList = false,
  isAccordionItem = false,
}: GunItemProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { guns } = useGunStore();
  const getDaysUntilTradeable = (tradableAfter: string) => {
    const tradableDate = new Date(tradableAfter);
    const today = new Date();
    const diffTime = tradableDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div
      className="aspect-square select-none cursor-pointer w-full relative"
      onMouseEnter={() => setSelectedItem(index)}
      onMouseLeave={() => setSelectedItem(null)}
      onClick={(e) => {
        if (
          e.target === e.currentTarget ||
          !(e.target as HTMLElement).closest('[data-no-toggle="true"]')
        ) {
          toggleGun(item.uniqueId.toString(), item);
        }
      }}
    >
      {isSelected && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bg-white  p-2 rounded-full z-[1200] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              onClick={(e) => {
                e.stopPropagation();
                toggleGun(item.uniqueId.toString(), item);
              }}
              src={
                guns.includes(item.uniqueId.toString())
                  ? "/trade/cart.svg"
                  : "/trade/trash.svg"
              }
              alt={guns.includes(item.uniqueId.toString()) ? "cart" : "trash"}
              width={16}
              height={16}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full h-full left-0 top-0 bg-white/10  z-[1000]"
          />
        </>
      )}
      <div
        className={`w-full flex relative items-center   ${selectedItem == index ? "brightness-125" : ""}   ${isSelectedList ? "hover:brightness-175 overflow-hidden" : ""}  ${isSelected ? "blur-[0.8px]" : " blur-0"} justify-center h-full bg-[#2D2438] hover:brightness-125 transition-all duration-200 border border-[#1A1625] ${
          selectedItem == index ? "z-50 shadow-md" : ""
        }`}
      >
        <AnimatePresence>
          {isSelectedList && selectedItem == index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute w-full h-full flex items-center justify-center bg-white/5 z-[1000] hover:backdrop-blur-[1.4px]"
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <div className="flex items-center justify-center gap-2 flex-col">
                <Image
                  src="/trade/remove.svg"
                  alt="remove"
                  width={24}
                  height={24}
                  style={{
                    WebkitFilter: "drop-shadow(0 1px 1px rgba(0, 0, 0,0.6))",
                  }}
                />
                <span className="text-xs text-white/60">Remove</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        {selectedItem === index && !isSelectedList && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 100 + "%" }}
            exit={{
              opacity: 0.3,
              height: 0,
              transition: { duration: 0.08, ease: "easeOut" },
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-0 overflow-hidden shadow-md flex gap-[2px] z-[30] left-0 w-full h-10 bg-[#1A1625] translate-y-full rounded-b-md"
          >
            <div
              data-no-toggle="true"
              onClick={(e) => {
                e.stopPropagation();
                toggleGun(item.uniqueId.toString(), item.item.price);
              }}
              className="h-full w-full bg-[#6E3AE4]  hover:brightness-75 transition-all duration-200 mt-[2px] flex items-center justify-center"
            >
              <Image src="/trade/cart.svg" alt="cart" width={16} height={16} />
            </div>
            <div
              data-no-toggle="true"
              onClick={(e) => {
                e.stopPropagation();
                setModalGun(item);
              }}
              className="h-full w-full cursor-pointer bg-[#6E3AE4] hover:brightness-75 transition-all duration-200 flex mt-[2px] items-center justify-center"
            >
              <Image src="/trade/zoom.svg" alt="zoom" width={16} height={16} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { GunItem };
