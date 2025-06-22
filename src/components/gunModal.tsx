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
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/70 z-[100000]"
          onClick={handleBackdropClick}
        >
          <div className="w-[70%] h-[65%] p-2 relative bg-[#1A1625]  rounded-md flex">
            {/* left section  */}
            <GunModalLeft modalGun={modalGun} />

            {/* right section  */}
            <GunModalRight modalGun={modalGun} setModalGun={setModalGun} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
