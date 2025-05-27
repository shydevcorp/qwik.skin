"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cookieInfo, setCookieInfo] = useState<string>("Checking cookies...");
  const [host, setHost] = useState<string>("Checking hostname...");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie;
      setCookieInfo(cookies || "No cookies found");
      setHost(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "unauthenticated") {
        console.log("User is not authenticated, redirecting to home");
        router.push("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, router]);

  return (
    <div className="min-h-screen h-screen bg-background relative w-screen flex overflow-hidden px-10 py-8">
      {/* Left Column */}
      <div className="bg-red-300 basis-2/5 p-2 h-full border-black border-2">
        dsfdsf
      </div>

      {/* Middle Column */}
      <div className="bg-red-300 basis-1/5 p-2 h-full border-black border-2">
        dsfdsf
      </div>

      {/* Right Column */}
      <div className="bg-red-300 basis-2/5 p-2 h-full border-black border-2"></div>
    </div>
  );
}
