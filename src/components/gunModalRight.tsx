export default function GunModalRight({
  modalGun,
  setModalGun,
}: {
  modalGun: any;
  setModalGun: any;
}) {
  const screenWidth = window.innerWidth;

  return (
    <section
      style={{
        maskImage:
          screenWidth >= 949
            ? "linear-gradient(to bottom,transparent,black 15%,black 85%,transparent)"
            : "none",
      }}
      className="w-full min-[949px]:w-[40%] h-fit min-[949px]:h-full    overflow-y-auto no-scrollbar gap-2 flex flex-col items-center pb-12 p-2 px-4"
    >
      <div className="w-full h-fit flex items-start justify-between py-2">
        <div
          style={{ fontFamily: "var(--font-space)" }}
          className="text-md font-bold text-white"
        >
          {" "}
          Summary
        </div>
        {screenWidth >= 949 && (
          <svg
            onClick={() => setModalGun(null)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="translate-x-3 w-5 h-5 text-white/50 hover:text-white cursor-pointer transition-colors"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        )}
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        <div className="w-full h-[100px] bg-white/5 rounded-md"></div>
        <div className="w-full  bg-white/5 rounded-md flex items-center justify-between p-4">
          {modalGun?.item?.details && (
            <div className="flex flex-col w-full h-full  gap-2">
              <div className="flex  items-center justify-between gap-1">
                <div
                  style={{ fontFamily: "var(--font-space)" }}
                  className="text-white/50 text-sm"
                >
                  Phase
                </div>
                <div className="text-white font-medium text-sm">
                  {modalGun?.item?.details?.skin || "N/A"}
                </div>
              </div>
              <div className="flex  items-center justify-between gap-1">
                <div
                  style={{ fontFamily: "var(--font-space)" }}
                  className="text-white/50 text-sm"
                >
                  Rarity
                </div>
                <div className="text-white font-medium text-sm">
                  {modalGun?.item?.details?.rarity || "N/A"}
                </div>
              </div>
              <div className="flex  items-center justify-between gap-1">
                <div
                  style={{ fontFamily: "var(--font-space)" }}
                  className="text-white/50 text-sm"
                >
                  Finish
                </div>
                <div className="text-white font-medium text-sm">
                  {modalGun?.item?.details?.exterior || "N/A"}
                </div>
              </div>
              <div className="flex  items-center justify-between gap-1">
                <div
                  style={{ fontFamily: "var(--font-space)" }}
                  className="text-white/50 text-sm"
                >
                  Pattern
                </div>
                <div className="text-white font-medium text-sm">
                  {modalGun?.item?.details?.paint || "N/A"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-fit flex flex-col gap-1 p-4 rounded-md ">
        <div
          style={{ fontFamily: "var(--font-space)" }}
          className="w-full font-semibold text-white/80"
        >
          Description
        </div>
        <div className="w-full text-white/50 text-sm">
          {modalGun?.item?.details?.description}
        </div>
      </div>

      <div className="w-full h-fit rounded-md  p-4  flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            style={{ fontFamily: "var(--font-space)" }}
            className="text-white/80 font-semibold"
          >
            Stickers
          </span>
          <div className="relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white/50 cursor-help"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
            <div className="absolute hidden group-hover:block bg-black/90 text-white/80 text-sm p-2 rounded-md -translate-y-full -translate-x-1/2 left-1/2 top-0 w-48">
              Applied stickers on this weapon
            </div>
          </div>
        </div>
        <div className="flex  justify-between bg-white/5 p-3 px-4 h-fit">
          <div className="w-[50px] h-[50px] bg-white/10 rounded-md flex items-center justify-center">
            <img
              src="/stickers/zywoo.png"
              alt="Sticker"
              className="w-full h-full object-contain"
            />
          </div>

          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="relative w-[50px] h-[50px] brightness-50"
            >
              <img
                src="/trade/hexagon.svg"
                alt="Sticker"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="mdi"
                  data-icon="lightning-bolt"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white/90"
                >
                  <path
                    fill="currentColor"
                    d="M11 15H6L13 1V9H18L11 23V15Z"
                  ></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-fit rounded-md  p-4  flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            style={{ fontFamily: "var(--font-space)" }}
            className="text-white/80 font-semibold"
          >
            Stickers
          </span>
          <div className="relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white/50 cursor-help"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
            <div className="absolute hidden group-hover:block bg-black/90 text-white/80 text-sm p-2 rounded-md -translate-y-full -translate-x-1/2 left-1/2 top-0 w-48">
              Applied stickers on this weapon
            </div>
          </div>
        </div>
        <div className="flex  justify-between bg-white/5 p-8 px-4 h-fit"></div>
      </div>
    </section>
  );
}
