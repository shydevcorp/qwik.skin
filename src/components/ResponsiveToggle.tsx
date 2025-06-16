import { motion } from "framer-motion";

export default function ResponsiveToggle({
  activeColumn,
  setActiveColumn,
}: {
  activeColumn: "user" | "site" | null;
  setActiveColumn: (column: "user" | "site" | null) => void;
}) {
  return (
    <div
      style={{ fontFamily: "var(--font-space)" }}
      className={` w-[95%] text-sm mx-auto min-h-[40px] h-[30px] bg-[#2D2438] relative p-2 mt-2 rounded-sm mb-2 max-[950px]:flex hidden`}
    >
      <motion.div
        animate={{
          x: activeColumn === "user" ? 0 : 100 + "%",
          scaleX: 0.95,
          scaleY: 0.75,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={`absolute top-0 left-0 w-1/2 h-full ${activeColumn === "user" ? "translate-x-0" : "translate-x-full"} z-2   bg-white/5 rounded-sm`}
      />
      <div
        className={`basis-1/2 h-full flex items-center relative z-30 justify-center cursor-pointer transition-colors rounded-md`}
        onClick={() => setActiveColumn("user")}
      >
        User Inventory
      </div>
      <div
        className={`basis-1/2 h-full flex items-center relative z-30 justify-center cursor-pointer transition-colors rounded-md `}
        onClick={() => setActiveColumn("site")}
      >
        Site Inventory
      </div>
    </div>
  );
}
