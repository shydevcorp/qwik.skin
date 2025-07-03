"use client";
import React, { useEffect, useCallback } from "react";
import useAccordionStore from "@/app/stores/accordionStore";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import GunModalLeft from "./gunModalLeft";
import GunModalRight from "./gunModalRight";
export default function GunModal() {
  const { modalGun, setModalGun } = useAccordionStore();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalGun(null);
    }
  };

  return (
    <AnimatePresence>
      {modalGun && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, scale: 1.02, filter: "blur(2px)" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 flex min-[949px]:items-center  justify-center w-full h-full bg-black/70 z-[100000] overflow-y-auto "
          onClick={handleBackdropClick}
        >
          <div className="w-full min-[949px]:w-[1100px] min-[949px]:max-w-[98%] h-fit  min-[949px]:h-[65%]  mx-auto  p-2 relative bg-[#1A1625]  rounded-md flex flex-col min-[949px]:flex-row">
            {/* left section  */}
            <GunModalLeft modalGun={modalGun} setModalGun={setModalGun} />

            {/* right section  */}
            <GunModalRight modalGun={modalGun} setModalGun={setModalGun} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
