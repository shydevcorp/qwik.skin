import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import NumberFlow from "@number-flow/react";
import useGunStore from "@/app/stores/gunStore";
import { demoData } from "@/lib/demo-data";
import { MappedGuns } from "@/components/mappedGuns";
import { GunItem } from "../mappedGunItem";
interface CustomAccordionProps {
  title: string;
  value?: string | number;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  headerText?: string;
  isRev?: boolean;
  isResponsive?: boolean;
}

export function CustomAccordion({
  title,
  value,
  children,
  defaultOpen = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
  headerText = "",
  isRev = false,
  isResponsive = false,
}: CustomAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const { guns, toggleGun } = useGunStore();
  const selectedGuns = demoData.filter((item) =>
    guns.includes(item.uniqueId.toString()),
  );

  return (
    <div
      className={`w-full max-h-fit rounded-lg min-h-fit overflow-visible bg-[#2D2438]  relative ${className}`}
    >
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        animate={{ opacity: isOpen ? 0.9 : 1 }}
        transition={{ duration: 0.15 }}
        className={`w-full bg-[#1A1625]/20 cursor-pointer transition-all duration-300 h-[50px] ${isOpen ? "rounded-t-lg" : "rounded-lg"} overflow-hidden ${isRev ? "flex-row" : "flex-row-reverse"} flex items-center justify-between px-4 bg-[#2D2438] relative z-10 ${headerClassName}`}
      >
        <div
          className={`text-white ${isRev ? "flex-row" : "flex-row-reverse"} flex items-center gap-2`}
        >
          <motion.h1
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3 h-3 text-[#9D5CFF]" />
          </motion.h1>
          <h1
            style={{ fontFamily: "var(--font-space)" }}
            className="text-sm font-light text-white"
          >
            {title}
          </h1>
        </div>
        {value !== undefined && (
          <div
            style={{ fontFamily: "var(--font-space)" }}
            className={`text-white  ${isRev ? "flex-row" : "flex-row-reverse "} font-mono text-base flex items-center gap-2`}
          >
            {!isRev && guns.length > 0 && (
              <span className="text-black bg-[#9D5CFF] rounded-full px-1.5  text-xs">
                {guns.length}
              </span>
            )}

            {typeof value === "number" ? (
              <>
                ${" "}
                <NumberFlow
                  value={value}
                  trend={0}
                  format={{ notation: "standard" }}
                />
              </>
            ) : (
              value
            )}
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="mdi"
              data-icon="basket"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
            >
              <path
                fill={`${guns.length > 0 ? "#9D5CFF" : "white"}`}
                d="M5.5,21C4.72,21 4.04,20.55 3.71,19.9V19.9L1.1,10.44L1,10A1,1 0 0,1 2,9H6.58L11.18,2.43C11.36,2.17 11.66,2 12,2C12.34,2 12.65,2.17 12.83,2.44L17.42,9H22A1,1 0 0,1 23,10L22.96,10.29L20.29,19.9C19.96,20.55 19.28,21 18.5,21H5.5M12,4.74L9,9H15L12,4.74M12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13Z"
              />
            </svg>
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: "150px", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.1,
              opacity: {
                duration: isOpen ? 0.1 : 0.5,
              },
              height: { duration: 0.2 },
              ease: "easeIn",
            }}
            className={`w-full rounded-b-lg flex flex-col  justify-center items-center overflow-hidden bg-[#2D2438] relative z-10 ${contentClassName}`}
          >
            <div
              className="absolute inset-0 z-[-1] opacity-20  bg-repeat"
              style={{
                backgroundImage: `url('/trade/custom-accordin-bg.svg')`,
                backgroundSize: "auto",
                width: "100%",
                height: "100%",
                mask: "radial-gradient(circle at center, white 0%, transparent 100%)",
              }}
            ></div>
            <AnimatePresence mode="popLayout">
              {!(selectedGuns.length > 0) ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <h1
                    style={{ fontFamily: "var(--font-space)" }}
                    className="text-white text-lg font-semibold"
                  >
                    {headerText}
                  </h1>
                  <div className="p-1 text-white/60">{children}</div>
                </motion.div>
              ) : (
                <motion.div
                  key="selected-guns"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={`h-[100%] mt-[1px] w-[100%] scrollbar-slim-change pb-[81px] bg-[#1A1625]/40 grid ${
                    isResponsive
                      ? "max-[400px]:grid-cols-2 min-[401px]:grid-cols-3 min-[501px]:grid-cols-4 min-[601px]:grid-cols-5 min-[751px]:grid-cols-6"
                      : "max-[400px]:grid-cols-2 min-[401px]:grid-cols-3 min-[501px]:grid-cols-4 min-[601px]:grid-cols-5 min-[751px]:grid-cols-6 min-[951px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 overflow-y-scroll"
                  } overflow-x-visible`}
                >
                  <AnimatePresence mode="sync" initial={false}>
                    {selectedGuns.map((gun, index) => (
                      <motion.div
                        key={gun.uniqueId || index}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95,
                          transition: { duration: 0.175, ease: "easeOut" },
                        }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <GunItem
                          item={gun}
                          index={index}
                          isResponsive={false}
                          isSelectedList={true}
                          isSelected={false}
                          toggleGun={toggleGun}
                          isAccordionItem={true}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
