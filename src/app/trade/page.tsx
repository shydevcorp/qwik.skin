"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router, session]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return null;
  }

  const avatarUrl =
    session.user.steamAvatar || session.user.image || "/default-avatar.png";
  const username = session.user.steamUsername || session.user.name || "User";
  const steamId = session.user.steamId || "Not available";

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-white mb-4">Trade Center</h1>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={avatarUrl}
              alt={username}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-lg text-white font-medium">{username}</p>
              <p className="text-sm text-gray-400">Steam ID: {steamId}</p>
            </div>
          </div>
          <p className="text-white">
            Welcome to the CS2 skin trading platform! This page is under
            construction. Soon you'll be able to trade your CS2 skins using
            Solana.
          </p>

          <div className="mt-4">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="text-sm text-gray-400 hover:text-white underline"
            >
              {showDebug ? "Hide" : "Show"} Debug Info
            </button>

            {showDebug && (
              <div className="mt-4 p-4 bg-gray-800/70 rounded border border-gray-700 text-xs font-mono text-gray-300 overflow-x-auto">
                <h3 className="text-white text-sm mb-2">Session Data:</h3>
                <pre>{JSON.stringify(session, null, 2)}</pre>
                <h3 className="text-white text-sm mb-2 mt-4">
                  Status: {status}
                </h3>
                <p className="text-sm mt-4">
                  <strong>User ID:</strong> {session.user.id}
                </p>
                <p className="text-sm">
                  <strong>Cookie Present:</strong>{" "}
                  {document.cookie.includes("next-auth") ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Your Inventory
            </h2>
            <p className="text-gray-300">
              Your CS2 inventory will appear here after you connect your Steam
              account.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Available Trades
            </h2>
            <p className="text-gray-300">
              Available trades will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
