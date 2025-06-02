import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface CustomAccordionProps {
  title: string;
  value?: string | number;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  solanaShadowOnHover?: boolean;
}

export function CustomAccordion({
  title,
  value,
  children,
  defaultOpen = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
  solanaShadowOnHover = false,
}: CustomAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [hasHover, setHasHover] = useState(false);

  return (
    <div
      className={`w-full max-h-fit rounded-xl min-h-fit overflow-visible bg-white border border-gray-200 shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] relative ${className}`}
      onMouseEnter={solanaShadowOnHover ? () => setHasHover(true) : undefined}
      onMouseLeave={solanaShadowOnHover ? () => setHasHover(false) : undefined}
      style={{
        boxShadow:
          "0 4px 24px 0 rgba(0,0,0,0.04), 0 0 0 2px transparent, 0 2px 16px 0 rgba(162,89,255,0.12)",
      }}
    >
      {solanaShadowOnHover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasHover ? 0.4 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(to right, #00FFA3, #03E1FF, #DC1FFF)",
          }}
          className="pointer-events-none absolute top-0 left-0 w-full h-full blur-[5px] opacity-50 rounded-xl z-0"
        />
      )}
      {solanaShadowOnHover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasHover ? 0.4 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(to right, #00FFA3, #03E1FF, #DC1FFF)",
          }}
          className="pointer-events-none absolute top-0 left-0 w-full h-full  opacity-50 rounded-xl z-0 blur-[2px]"
        />
      )}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full cursor-pointer transition-all duration-300 h-[50px] ${isOpen ? "rounded-t-xl" : "rounded-xl"} overflow-hidden flex items-center justify-between px-4 bg-white relative z-10 ${headerClassName}`}
      >
        <div className="text-black flex items-center gap-2">
          <motion.h1
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </motion.h1>
          <h1 className="text-md font-semibold text-black">{title}</h1>
        </div>
        {value !== undefined && (
          <div className="text-black font-mono text-base">
            {typeof value === "number" ? `$ ${value.toFixed(2)}` : value}
          </div>
        )}
        {/* Gradient underline */}
        <div className="absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-[#9945FF] via-[#5F5CFF] to-[#14F195]" />
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "140px", opacity: 1 }}
            exit={{ height: 0, opacity: 0.3 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`w-full rounded-b-xl overflow-hidden bg-white relative z-10 ${contentClassName}`}
            style={{
              boxShadow:
                "0 0 0 0 transparent, 0 2px 16px 0 rgba(162,89,255,0.10)",
            }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
