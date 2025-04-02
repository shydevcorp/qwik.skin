"use client";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/90">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold solana-gradient-text">
              qwik.skin
            </span>
          </div>
          <div>
            <Button className="solana-gradient font-medium hover:opacity-90 transition-opacity">
              Join waitlist
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
