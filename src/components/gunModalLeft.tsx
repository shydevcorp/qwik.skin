import Image from "next/image";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useCallback } from "react";
import useGunStore from "@/app/stores/gunStore";

interface GunModalLeftProps {
  modalGun: any;
  setModalGun: any;
}

export default function GunModalLeft({
  modalGun,
  setModalGun,
}: GunModalLeftProps) {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const { toggleGun, guns } = useGunStore();
  const screenWidth = window.innerWidth;
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      x.set(mouseX);
      y.set(mouseY);

      (e.currentTarget as HTMLElement).style.transformOrigin =
        `${mouseX}% ${mouseY}%`;
    },
    [x, y],
  );

  return (
    <section className="w-full min-[949px]:w-[60%] h-fit min-[949px]:h-full flex flex-col p-2 relative">
      <img
        src="/dot-pattern.svg"
        alt="dot pattern"
        className="absolute inset-0 w-full brightness-75 object-cover opacity-50 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="w-full h-[10%] bg-[#1A1625] relative z-[1000]">
        <div className="w-full h-full items-center justify-between flex">
          <div className="w-[20%] h-full flex items-center justify-center">
            <div
              style={{ fontFamily: "var(--font-space)" }}
              className="text-[#78ac1e] bg-[#78ac1e]/20 text-sm rounded-md px-2 py-1 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z"
                />
              </svg>
              <span>Tradeable</span>
            </div>
          </div>

          <div className="h-full flex items-center justify-center">
            {screenWidth >= 949 && (
              <div className="w-fit h-full rounded-md group relative z-[1000]">
                <a
                  target="_blank"
                  href="https://steamcommunity.com/profiles/76561199656944475/inventory/#730_2_44326225493"
                  className="w-full h-full flex items-center justify-center gap-2 transition-colors rounded-md px-4"
                >
                  <span
                    style={{ fontFamily: "var(--font-space)" }}
                    className="text-sm text-white/50 break-none group-hover:text-yellow-400"
                  >
                    Visit on Steam
                  </span>
                  <svg
                    className="w-4 h-4 text-white/50 group-hover:text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M304 24c0 13.3 10.7 24 24 24H430.1L207 271c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l223-223V184c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24H328c-13.3 0-24 10.7-24 24zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V440c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z"
                    />
                  </svg>
                </a>
              </div>
            )}

            {screenWidth >= 949 && (
              <div className="w-fit h-full rounded-md group">
                <a
                  target="_blank"
                  href="https://steamcommunity.com/profiles/76561199656944475/inventory/#730_2_44326225493"
                  className="w-full h-full flex items-center justify-center gap-2 transition-colors rounded-md px-4"
                >
                  <span
                    style={{ fontFamily: "var(--font-space)" }}
                    className="text-sm text-white/50 group-hover:text-yellow-400 break-none"
                  >
                    Inspect in Game
                  </span>
                  <svg
                    className="w-4 h-4 text-white/50 group-hover:text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M304 24c0 13.3 10.7 24 24 24H430.1L207 271c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l223-223V184c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24H328c-13.3 0-24 10.7-24 24zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V440c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z"
                    />
                  </svg>
                </a>
              </div>
            )}

            {screenWidth < 949 && (
              <svg
                onClick={() => setModalGun(null)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="translate-x-3 w-5 h-5 mr-5 text-white/50 hover:text-white cursor-pointer transition-colors"
              >
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-[60%] flex items-center justify-center relative z-[300] overflow-hidden">
        <motion.div
          className="w-full h-auto relative cursor-move"
          initial={{ scale: 1 }}
          whileHover={{ scale: 2.5 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.15,
            restDelta: 0.001,
          }}
          style={{
            transformOrigin: `${x.get()}% ${y.get()}%`,
          }}
          onMouseMove={handleMouseMove}
        >
          <Image
            src="/trade/main.png"
            alt={modalGun?.marketName || "Trade main image"}
            width={1000}
            height={1000}
            quality={100}
            className="w-full max-h-[300px] h-auto object-contain select-none"
            draggable={false}
            priority
          />
        </motion.div>

        <div
          style={{
            maskImage:
              "linear-gradient(to right, black, transparent 10%, transparent 90%, black)",
          }}
          className="absolute w-full h-full bg-[#1A1625] z-[1000] pointer-events-none"
        />
        <div
          style={{
            maskImage:
              "linear-gradient(to bottom, black, transparent 10%, transparent 90%, black)",
          }}
          className="absolute w-full h-full bg-[#1A1625] z-[1200] pointer-events-none"
        />
      </div>

      <div className="w-full h-[30%] flex flex-col gap-5 p-2">
        <div className="w-full flex justify-between">
          <div className="flex items-center flex-col justify-start">
            <span className="text-white/50 mr-auto text-md">
              ★ Butterfly Knife | Factory New
            </span>
            <div
              style={{ fontFamily: "var(--font-space)" }}
              className="text-2xl font-semibold text-white/90"
            >
              Gamma Doppler Emerald
            </div>
          </div>
          <div className="flex items-end">
            <span
              style={{ fontFamily: "var(--font-space)" }}
              className="text-3xl font-medium text-white"
            >
              $ 32,381
            </span>
            <span
              style={{ fontFamily: "var(--font-space)" }}
              className="text-2xl font-medium text-white/60"
            >
              .60
            </span>
          </div>
        </div>

        <button
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className={`text-lg ${guns.includes(modalGun?.uniqueId.toString() || "0") ? "bg-violet-500/30" : "bg-violet-500/80"}   rounded-md h-12 flex items-center justify-center gap-2`}
          onClick={() => {
            toggleGun(
              modalGun?.uniqueId.toString() || "0",
              modalGun?.item.price || 0,
            );
          }}
        >
          <AnimatePresence mode="wait">
            {guns.includes(modalGun?.uniqueId.toString() || "0") ? (
              <motion.svg
                key="remove"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                />
              </motion.svg>
            ) : (
              <motion.svg
                key="add"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {guns.includes(modalGun?.uniqueId.toString() || "0") ? (
              <motion.span
                key="remove-text"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg text-white/90"
              >
                Remove from Cart
              </motion.span>
            ) : (
              <motion.span
                key="add-text"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg text-white/90"
              >
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </section>
  );
}
