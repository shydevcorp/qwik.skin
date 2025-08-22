import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#090019] py-4 border-t border-border/40 relative min-h-[120px]">
      <div className="absolute bottom-0 right-0 w-full pointer-events-none overflow-hidden hidden md:block">
        <Image
          src="/cs2-assets@2x.png"
          alt="Gaming Assets"
          width={400}
          height={200}
          className="ml-auto max-h-[200px] object-contain"
          priority
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 relative z-10 h-full flex items-end pb-2 pt-4 md:pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="mb-4 md:mb-0">
            <div className="flex flex-col items-start mb-4">
              <p className="text-sm text-muted-foreground mb-2">Backed By</p>
              <Image
                src="/solanaFoundationLogo.svg"
                alt="Solana Foundation"
                width={200}
                height={33}
                className="mb-4"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Trade skins instantly with lowest fees on Solana
              <br />
              &copy; {new Date().getFullYear()} qwik.skin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
