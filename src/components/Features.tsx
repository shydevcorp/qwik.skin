"use client";

import Image from "next/image";

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
