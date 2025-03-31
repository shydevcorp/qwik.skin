"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import { KnifeModel } from "./KnifeModel";
import { Suspense } from "react";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

export function Hero() {
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
    <div className="relative min-h-screen bg-background overflow-hidden pt-16">
      <div
        className="absolute left-12 top-1/2 -translate-y-1/2 text-[8rem] font-bold select-none tracking-tight text-transparent leading-[0.85] mt-12 hidden sm:block"
        style={{ WebkitTextStroke: "1.5px rgb(82, 82, 91, 0.3)" }}
      >
        <p>TRADE</p>
        <p>CS2</p>
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
                <span className="solana-gradient-text font-extrabold">CS2</span>{" "}
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
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full"
              style={{ width: "80%", height: "80%", left: "10%", top: "10%" }}
            ></div>
            <div className="w-full h-full">
              <Canvas>
                <Suspense fallback={null}>
                  <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                  />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <KnifeModel position={[0, 0, 0]} />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="relative flex flex-col items-center">
            <Image
              src="/features/1.png"
              alt="Fee-less transactions"
              width={500}
              height={500}
              className="w-full h-auto"
              draggable="false"
              onContextMenu={handleContextMenu}
              priority
            />
          </div>

          <div className="relative flex flex-col items-center">
            <Image
              src="/features/2.png"
              alt="Lightning-fast trades"
              width={500}
              height={500}
              className="w-full h-auto"
              draggable="false"
              onContextMenu={handleContextMenu}
              priority
            />
          </div>
          <div className="relative flex flex-col items-center">
            <Image
              src="/features/3.png"
              alt="Global market"
              width={500}
              height={500}
              className="w-full h-auto"
              draggable="false"
              onContextMenu={handleContextMenu}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
