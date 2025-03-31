"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
      price: 58.75,
      image: "/skins/redline.webp",
      colorClass: "text-pink-400",
    },
    {
      id: "2",
      name: "Desolate Space",
      price: 16.87,
      image: "/skins/desolate-space.webp",
      colorClass: "text-purple-400",
    },
    {
      id: "3",
      name: "Asiimov",
      price: 21.79,
      image: "/skins/asiimov.webp",
      colorClass: "text-orange-400",
    },
    {
      id: "4",
      name: "Fade",
      price: 345.48,
      image: "/skins/gut-knife.webp",
      colorClass: "text-pink-400",
    },
    {
      id: "5",
      name: "Hyper Beast",
      price: 69.64,
      image: "/skins/hyper-beast.webp",
      colorClass: "text-pink-400",
    },
    {
      id: "6",
      name: "Kill Confirmed",
      price: 82.25,
      image: "/skins/kill-confirmed.webp",
      colorClass: "text-red-400",
    },
    {
      id: "7",
      name: "Neon Revolution",
      price: 30.98,
      image: "/skins/revolution.webp",
      colorClass: "text-pink-400",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = {
    mobile: 1,
    tablet: 3,
    desktop: 6
  };

  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return itemsPerPage.mobile;
      if (window.innerWidth < 1024) return itemsPerPage.tablet;
      return itemsPerPage.desktop;
    }
    return itemsPerPage.desktop;
  };

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage.desktop);

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerPage(getItemsPerPage());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, skins.length - currentItemsPerPage)
        : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= skins.length - currentItemsPerPage ? 0 : prev + 1
    );
  };

  const visibleSkins = skins.slice(currentIndex, currentIndex + currentItemsPerPage);
  if (visibleSkins.length < currentItemsPerPage) {
    visibleSkins.push(...skins.slice(0, currentItemsPerPage - visibleSkins.length));
  }

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <h2 className="text-4xl font-bold mb-12">
          <span className="solana-gradient-text">Most Traded CS2</span>{" "}
          <span className="text-muted-foreground">(CS:GO)</span> Skins
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
                  <p className="text-foreground font-bold">
                    From ${skin.price.toFixed(2)}
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
