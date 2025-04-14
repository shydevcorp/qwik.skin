"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SolanaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="12"
    viewBox="0 0 508.07 398.17"
    className="inline-block ml-1 -mt-[1px]"
  >
    <defs>
      <linearGradient
        id="solana-gradient"
        x1="463"
        y1="205.16"
        x2="182.39"
        y2="742.62"
        gradientTransform="translate(0 -198)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <linearGradient
        id="solana-gradient-2"
        x1="340.31"
        y1="141.1"
        x2="59.71"
        y2="678.57"
        href="#solana-gradient"
      />
      <linearGradient
        id="solana-gradient-3"
        x1="401.26"
        y1="172.92"
        x2="120.66"
        y2="710.39"
        href="#solana-gradient"
      />
    </defs>
    <path
      fill="url(#solana-gradient)"
      d="M84.53,358.89A16.63,16.63,0,0,1,96.28,354H501.73a8.3,8.3,0,0,1,5.87,14.18l-80.09,80.09a16.61,16.61,0,0,1-11.75,4.86H10.31A8.31,8.31,0,0,1,4.43,439Z"
      transform="translate(-1.98 -55)"
    />
    <path
      fill="url(#solana-gradient-2)"
      d="M84.53,59.85A17.08,17.08,0,0,1,96.28,55H501.73a8.3,8.3,0,0,1,5.87,14.18l-80.09,80.09a16.61,16.61,0,0,1-11.75,4.86H10.31A8.31,8.31,0,0,1,4.43,140Z"
      transform="translate(-1.98 -55)"
    />
    <path
      fill="url(#solana-gradient-3)"
      d="M427.51,208.42a16.61,16.61,0,0,0-11.75-4.86H10.31a8.31,8.31,0,0,0-5.88,14.18l80.1,80.09a16.6,16.6,0,0,0,11.75,4.86H501.73a8.3,8.3,0,0,0,5.87-14.18Z"
      transform="translate(-1.98 -55)"
    />
  </svg>
);

type SkinCard = {
  id: string;
  name: string;
  price: number;
  image: string;
  colorClass: string;
};

export function TradedSkins() {
  const skins: SkinCard[] = [
    {
      id: "1",
      name: "Redline",
      price: 0.58,
      image: "/skins/redline.webp",
      colorClass: "text-pink-400",
    },
    {
      id: "2",
      name: "Desolate Space",
      price: 0.16,
      image: "/skins/desolate-space.webp",
      colorClass: "text-purple-400",
    },
    {
      id: "3",
      name: "Asiimov",
      price: 0.21,
      image: "/skins/asiimov.webp",
      colorClass: "text-orange-400",
    },
    {
      id: "4",
      name: "Fade",
      price: 3.45,
      image: "/skins/gut-knife.webp",
      colorClass: "text-pink-400",
    },
    {
      id: "5",
      name: "Hyper Beast",
      price: 0.69,
      image: "/skins/hyper-beast.webp",
      colorClass: "text-pink-400",
    },
    {
      id: "6",
      name: "Kill Confirmed",
      price: 0.82,
      image: "/skins/kill-confirmed.webp",
      colorClass: "text-red-400",
    },
    {
      id: "7",
      name: "Neon Revolution",
      price: 0.3,
      image: "/skins/revolution.webp",
      colorClass: "text-pink-400",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = {
    mobile: 1,
    tablet: 3,
    desktop: 6,
  };

  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return itemsPerPage.mobile;
      if (window.innerWidth < 1024) return itemsPerPage.tablet;
      return itemsPerPage.desktop;
    }
    return itemsPerPage.desktop;
  };

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(
    itemsPerPage.desktop,
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerPage(getItemsPerPage());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, skins.length - currentItemsPerPage)
        : Math.max(0, prev - 1),
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= skins.length - currentItemsPerPage ? 0 : prev + 1,
    );
  };

  const visibleSkins = skins.slice(
    currentIndex,
    currentIndex + currentItemsPerPage,
  );
  if (visibleSkins.length < currentItemsPerPage) {
    visibleSkins.push(
      ...skins.slice(0, currentItemsPerPage - visibleSkins.length),
    );
  }

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <h2 className="text-4xl font-bold mb-12">
          Most Traded <span className="solana-gradient-text">CS2</span> Skins
        </h2>

        <div className="relative px-8 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-[2px] max-w-[300px] md:max-w-none mx-auto bg-border/50">
            {visibleSkins.map((skin) => (
              <div
                key={skin.id}
                className="relative group bg-card overflow-hidden hover:z-10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="aspect-square w-full bg-black/40 flex items-center justify-center p-4 relative">
                  <div className="w-full h-32 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <Image
                        src={skin.image}
                        alt={skin.name}
                        width={1024}
                        height={1024}
                        className="object-contain drop-shadow-[0_0_25px_rgba(153,69,255,0.4)] hover:drop-shadow-[0_0_35px_rgba(20,241,149,0.4)] transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4 relative">
                  <h3 className={cn("font-medium", skin.colorClass)}>
                    {skin.name}
                  </h3>
                  <p className="text-foreground font-bold flex items-center">
                    From {skin.price.toFixed(2)} <SolanaIcon />
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrevious}
            className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 bg-card border border-border rounded-full p-2 opacity-80 hover:opacity-100 transition-opacity z-20"
            aria-label="Previous skin"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 bg-card border border-border rounded-full p-2 opacity-80 hover:opacity-100 transition-opacity z-20"
            aria-label="Next skin"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
