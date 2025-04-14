import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background py-8 border-t border-border/40 relative">
      <div className="absolute bottom-0 right-0 w-full pointer-events-none overflow-hidden">
        <Image
          src="/cs2-assets@2x.png"
          alt="CS2 Assets"
          width={400}
          height={200}
          className="ml-auto"
          priority
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground mt-2">
              Trade CS2 skins instantly with lowest fees on Solana
              <br />
              &copy; {new Date().getFullYear()} qwik.skin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
