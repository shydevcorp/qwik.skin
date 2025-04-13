import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans antialiased bg-gradient-to-br from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A] min-h-screen`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title:
    "Trade CS2 Skins 🌠 Best CS2 Skin Trading Site & Trading Bot — qwik.skin",
  description: "Trade CS2 skins instantly with Solana",
};
