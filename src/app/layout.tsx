import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import GunModal from "@/components/gunModal";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} w-screen antialiased bg-gradient-to-br from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A] min-h-screen overflow-x-hidden relative`}
      >
        <VelocityScroll
          className="text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 py-2 px-8 uppercase tracking-wider"
          defaultVelocity={3}
          numRows={1}
        >
          Building... HAVE PATIENCE!!! 👨‍❤️‍👨
        </VelocityScroll>
        <GunModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "[work in progress] qwik.skin",
  description: "Trade CS:GO (CS2) skins instantly with Solana",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};
