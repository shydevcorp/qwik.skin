import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/components/SessionProvider";
import GunModal from "@/components/gunModal";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} w-screen font-sans antialiased bg-gradient-to-br from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A] min-h-screen overflow-x-hidden relative`}
      >
        <AuthProvider>
          {/* Development mode scrolling bar */}
          <VelocityScroll
            className="text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 py-2 px-8 uppercase tracking-wider"
            defaultVelocity={3}
            numRows={1}
          >
            This site is currently in development mode
          </VelocityScroll>

          <GunModal />

          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title:
    "Trade CS2 Skins 🌠 Best CS2 Skin Trading Site & Trading Bot — qwik.skin",
  description: "Trade CS2 skins instantly with Solana",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};
