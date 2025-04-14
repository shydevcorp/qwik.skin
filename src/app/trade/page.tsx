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

  if (!session || !session.user) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-4">
            You need to be logged in to access this page.
          </p>
          <div className="mt-4 p-4 bg-gray-800/70 rounded border border-gray-700 text-xs font-mono text-gray-300 overflow-x-auto">
            <h3 className="text-white text-sm mb-2">Debug Info:</h3>
            <p>
              <strong>Session Status:</strong> {status}
            </p>
            <p>
              <strong>Cookies:</strong> {cookieInfo}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div>
            <div className="text-center py-12">
              <p className="text-2xl text-white font-medium">
                We are still building... 🏗️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
