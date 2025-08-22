import { MappedGuns } from "./mappedGuns";
import { SmallScreenFilter } from "./smallScreenfilter";

export function SmallScreenTrade({
  activeColumn,
}: {
  activeColumn: "user" | "site" | "both";
}) {
  return (
    <div className="w-full h-full min-[951px]:hidden relative overflow-hidden">
      <div
        key={activeColumn}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
      >
        {activeColumn === "user" ? (
          <div className="bg-[#1A1625] p-0 pb-0 h-full flex flex-col overflow-hidden">
            <div className="w-full flex-1 bg-[#1A1625] rounded-b-none overflow-hidden flex flex-col min-h-0">
              <div className="flex-shrink-0">
                <SmallScreenFilter />
              </div>
              <div className="flex-1 mt-[2px] w-full overflow-y-auto scrollbar-slim-change min-h-0">
                <div className="p-6 text-center bg-[#1A1625] gap-4 flex flex-col items-center justify-center rounded-lg px-16 w-full mx-auto min-h-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 pt-0 pb-0 flex flex-col gap-1 h-full overflow-hidden">
            <div className="flex-shrink-0">
              <SmallScreenFilter />
            </div>
            <div className="w-full flex-1 rounded-b-none overflow-hidden border border-[#1A1625] flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto min-h-0">
                <MappedGuns isResponsive={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
