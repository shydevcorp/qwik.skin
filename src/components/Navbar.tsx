"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { SteamIcon } from "@/components/SteamIcon";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Extract the part that uses useSearchParams into a separate component
function NavbarErrorHandler() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [showFixDbButton, setShowFixDbButton] = useState(false);
  const [fixingDb, setFixingDb] = useState(false);
  const [fixDbResult, setFixDbResult] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    const name = searchParams.get("name");
    const status = searchParams.get("status");

    if (error) {
      console.error("Authentication error:", {
        type: error,
        message,
        name,
        status,
      });

      setErrorType(error);

      // Create a more detailed error message
      let detailedMessage = message || "Unknown error";

      if (name) {
        detailedMessage = `${name}: ${detailedMessage}`;
      }

      if (status) {
        detailedMessage = `Status ${status}: ${detailedMessage}`;
      }

      setErrorMessage(detailedMessage);

      // Show fix database button if this is a database error
      if (
        error === "DatabaseNotSetup" ||
        error === "DatabaseFindError" ||
        error === "DatabaseCreateError" ||
        error === "DatabaseUpdateError" ||
        detailedMessage.toLowerCase().includes("table") ||
        detailedMessage.toLowerCase().includes("database")
      ) {
        setShowFixDbButton(true);
      }

      // Clear error after 10 seconds
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setErrorType(null);
      }, 10000);

      // Log to console for debugging
      if (error === "SteamAuthError") {
        console.log("Steam auth error details:", {
          error,
          message,
          name,
          status,
          currentUrl: window.location.href,
          searchParams: Array.from(searchParams.entries()),
        });
      }

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleFixDatabase = async () => {
    try {
      setFixingDb(true);
      setFixDbResult("Fixing database, please wait...");

      const response = await fetch("/api/fix-database");
      const data = await response.json();

      if (response.ok) {
        setFixDbResult(`Database fix completed. ${data.message}`);

        // Reload the page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setFixDbResult(
          `Error fixing database: ${data.error}. ${data.details || ""}`,
        );
      }
    } catch (error) {
      setFixDbResult(
        `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setFixingDb(false);
    }
  };

  // Render error message if there is one
  if (!errorMessage) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-900/90 border border-red-700 text-white px-4 py-3 rounded-md shadow-lg max-w-md z-50">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{errorType || "Authentication Error"}</p>
          <p className="text-sm text-red-200 break-words">{errorMessage}</p>

          {showFixDbButton && (
            <Button
              className="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs py-1"
              onClick={handleFixDatabase}
              disabled={fixingDb}
            >
              {fixingDb ? "Fixing Database..." : "Fix Database"}
            </Button>
          )}

          {fixDbResult && (
            <p className="text-xs text-green-300 mt-2">{fixDbResult}</p>
          )}
        </div>
        <button
          className="text-white/80 hover:text-white ml-4"
          onClick={() => {
            setErrorMessage(null);
            setErrorType(null);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);

  const handleSteamLogin = () => {
    // Clear any previous errors
    setErrorMessage(null);
    setErrorType(null);

    // Log the current origin for debugging
    console.log("Current origin:", window.location.origin);

    // Redirect to Steam OpenID login manually
    const params = new URLSearchParams({
      "openid.ns": "http://specs.openid.net/auth/2.0",
      "openid.mode": "checkid_setup",
      "openid.return_to": `${window.location.origin}/api/auth/callback/steam`,
      "openid.realm": window.location.origin,
      "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
      "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    });

    const steamLoginUrl = `https://steamcommunity.com/openid/login?${params.toString()}`;
    console.log("Redirecting to Steam login URL:", steamLoginUrl);

    window.location.href = steamLoginUrl;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/90">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img src="/qwik.skin-logo.png" alt="Qwik Trade" className="h-8" />
          </div>
          <div>
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-medium">
                  {session.user?.name}
                </span>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white/80"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                className="solana-gradient font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                onClick={handleSteamLogin}
              >
                <SteamIcon width={20} height={20} />
                Login with Steam
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Wrap the component using useSearchParams in Suspense */}
      <Suspense>
        <NavbarErrorHandler />
      </Suspense>
    </nav>
  );
}
