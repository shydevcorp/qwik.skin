"use client";

import { Button } from "@/components/ui/button";
import { WeaponImages } from "./WeaponImages";
import { Suspense, useState } from "react";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { WaitlistDialog } from "./WaitlistDialog";

export function Hero() {
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);

  const avatars = [
    {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-8mvX5mZ5G14HOYQxAHD9CrNI0F8-7FHoCA&s",
    },
    {
      imageUrl:
        "https://miro.medium.com/v2/resize:fit:1400/0*1WJiB8mUJKcylomi.jpg",
    },
    {
      imageUrl:
        "https://i.seadn.io/gae/AN3R390LjMShDn-5vWKDGJZ6Sv8xMnOWXzfD5Euo8HrGie9FXcy_AgWY8Ek35Ti2zmX2D1jQptTktU_F3FlAueccz0ja16lS0PhgH98",
    },
    {
      imageUrl:
        "https://framerusercontent.com/images/Hc9HpyJTBo19HbkyC5x27ueAb3c.webp",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#090019] overflow-hidden pt-16">
      <div
        className="absolute left-12 top-1/2 -translate-y-1/2 text-[8rem] font-bold select-none tracking-tight text-transparent leading-[0.85] mt-12 hidden sm:block"
        style={{ WebkitTextStroke: "1.5px rgb(82, 82, 91, 0.3)" }}
      >
        <p>TRADE</p>
        <p>GAMING</p>
        <p>SKINS</p>
        <p>ON</p>
        <p>SOLANA</p>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 pt-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-foreground">
            <h1 className="flex flex-col text-6xl font-medium mb-6 tracking-tight leading-[1.1]">
              <span>Buy, Sell & Trade</span>
              <span>
                <span className="solana-gradient-text font-extrabold">
                  Gaming
                </span>{" "}
                Skins
              </span>
            </h1>

            <p className="text-muted-foreground leading-snug mb-8 max-w-2xl">
              Trade skins and buy Steam marketplace items on the best and
              fairest skin trading platform on{" "}
              <span className="solana-gradient-text font-black">Solana</span>.
            </p>

            <Button
              size="lg"
              className="solana-gradient text-white font-bold px-8 py-6 text-lg tracking-wide hover:opacity-90 transition-opacity"
              onClick={() => setShowWaitlistDialog(true)}
            >
              JOIN WAITLIST
            </Button>

            <div className="mt-6 flex items-center">
              <AvatarCircles avatarUrls={avatars} numPeople={99} />
              <span className="ml-4 text-muted-foreground">
                Join our growing waitlist
              </span>
            </div>
          </div>

          <div className="flex-1 relative h-[600px]">
            <div
              className="absolute inset-0 bg-gradient-radial from-[rgba(20,20,20,0.5)] to-transparent blur-2xl rounded-full"
              style={{ width: "90%", height: "90%", left: "5%", top: "5%" }}
            ></div>
            <div className="w-full h-full">
              <Suspense fallback={null}>
                <WeaponImages />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <WaitlistDialog
        open={showWaitlistDialog}
        onOpenChange={setShowWaitlistDialog}
      />
    </div>
  );
}
