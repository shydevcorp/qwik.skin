import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { demoData } from "@/lib/demo-data";
import { useState, useEffect } from "react";
import useAccordionStore from "@/app/stores/accordionStore";
import useGunStore from "@/app/stores/gunStore";
import { GunItem } from "./mappedGunItem";

interface MappedGunsProps {
  isResponsive?: boolean;
}

const MappedGuns = ({ isResponsive = false }: MappedGunsProps) => {
  const { setModalGun } = useAccordionStore();
  const { guns, setGuns, toggleGun } = useGunStore();
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const handleGunClick = (item: any, index: number) => {
    if (screenWidth < 949) {
      setModalGun(item);
    } else {
      toggleGun(item.uniqueId.toString(), item);
    }
  };

  return (
    <div
      className={`h-[100%] mt-[1px] w-[100%]  scrollbar-slim-change pb-[81px] bg-[#1A1625]/40 grid ${
        isResponsive
          ? "max-[400px]:grid-cols-2 min-[401px]:grid-cols-3 min-[501px]:grid-cols-4 min-[601px]:grid-cols-5 min-[751px]:grid-cols-6"
          : "max-[400px]:grid-cols-2 min-[401px]:grid-cols-3 min-[501px]:grid-cols-4 min-[601px]:grid-cols-5 min-[751px]:grid-cols-6 min-[951px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 overflow-y-scroll"
      } overflow-x-visible`}
    >
      {demoData.map((item, index) => (
        <GunItem
          key={index}
          item={item}
          index={index}
          isResponsive={isResponsive}
          isSelected={guns.includes(item.uniqueId.toString())}
          toggleGun={() => handleGunClick(item, index)}
          setModalGun={setModalGun}
        />
      ))}
    </div>
  );
};

export { MappedGuns };
