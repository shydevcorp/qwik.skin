import { motion, AnimatePresence } from "framer-motion";

import { MappedGuns } from "./mappedGuns";
import { SmallScreenFilter } from "./smallScreenfilter";

export function SmallScreenTrade({
  activeColumn,
}: {
  activeColumn: "user" | "site" | "both";
}) {
  return (
    <div className="w-full min-[951px]:hidden relative h-full ">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeColumn}
          initial={{
            x: activeColumn === "user" ? "-100%" : "100%",
            opacity: 0,
          }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: activeColumn === "user" ? "-100%" : "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 800, damping: 60 }}
          className="absolute top-0 left-0 w-full h-full "
        >
          {activeColumn === "user" ? (
            <div className="bg-[#1A1625] p-0 pb-0 h-full flex-col  flex">
              <div className="w-full h-[100%] bg-[#1A1625] rounded-b-none overflow-hidden">
                <SmallScreenFilter />
                <div className="h-[100%] mt-[2px] w-[100%] scrollbar-slim-change pb-[30px] overflow-y-scroll overflow-x-visible flex flex-col items-center justify-center">
                  <div className="p-6 text-center overflow-y-auto bg-[#1A1625] scrollbar-slim-change gap-4 flex flex-col items-center justify-center rounded-lg px-16 w-full mx-auto">
                    <div className="flex justify-center mb-2">
                      <svg
                        className="text-[#9D5CFF] w-12 h-12"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      Trade mode not available
                    </h3>
                    <p
                      style={{ fontFamily: "var(--font-space)" }}
                      className="text-md tracking-wide text-gray-300/70 mb-6"
                    >
                      Your account is not available to trade.
                      <br />
                      More information should be displayed as you try to send a
                      trade offer.
                    </p>
                    <div className="mb-6">
                      <a
                        href="https://steamcommunity.com/tradeoffer/new/?partner=1157767128&token=650gzNAe"
                        target="_blank"
                        className="flex items-center justify-between bg-[#2D2438] hover:bg-[#1A1625] transition-colors p-3 rounded-md mb-4"
                      >
                        <div className="text-sm">
                          Visit our Trade URL to learn more
                        </div>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-icon="arrow-right"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-[#9D5CFF]"
                        >
                          <path
                            fill="currentColor"
                            d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                          ></path>
                        </svg>
                      </a>
                      <div className="text-xs text-gray-400/70 p-3 rounded-md">
                        <p>
                          Trade is temporarily disabled after changing the
                          password, device, or mobile authenticator. Cancelling
                          escrow trade puts your account on a 7-day trade
                          cooldown.
                        </p>
                      </div>
                    </div>
                    <button className="bg-transparent border border-[#9D5CFF]/20 hover:bg-[#9D5CFF]/10 transition-colors py-2 px-6 rounded-md text-sm">
                      Refresh Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="basis-6/12 p-2 pt-0 pb-0 flex flex-col gap-1 h-full ">
              <SmallScreenFilter />
              <div className="w-[calc(100%+4px)] h-[100%]  rounded-b-none overflow-hidden border border-[#1A1625]">
                <MappedGuns isResponsive={true} />
                <div className="h-[60px] w-full bg-[#2D2438] flex items-center px-6" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
