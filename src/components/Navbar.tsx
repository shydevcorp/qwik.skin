"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import "@/styles/SteamButton.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowLeftRight,
  Gift,
  HelpCircle,
  User,
  TrendingUp,
  Receipt,
  Shield,
  LogOut,
} from "lucide-react";

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

      let detailedMessage = message || "Unknown error";

      if (name) {
        detailedMessage = `${name}: ${detailedMessage}`;
      }

      if (status) {
        detailedMessage = `Status ${status}: ${detailedMessage}`;
      }

      setErrorMessage(detailedMessage);

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

      const timer = setTimeout(() => {
        setErrorMessage(null);
        setErrorType(null);
      }, 10000);

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

  if (!errorMessage) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-900/90 border border-red-700 text-white px-4 py-3 rounded-md shadow-lg max-w-md z-50">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{errorType || "Authentication Error"}</p>
          <p className="text-sm text-red-200 break-words">{errorMessage}</p>

          {showFixDbButton && (
            <Button
              className="mt-2 text-white text-xs py-1"
              onClick={handleFixDatabase}
              disabled={fixingDb}
            >
              {fixingDb ? "Fixing Database..." : "Fix Database"}
            </Button>
          )}

          {fixDbResult && <p className="text-xs mt-2">{fixDbResult}</p>}
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  session: any;
  router: any;
}

function MobileMenu({ isOpen, onClose, session, router }: MobileMenuProps) {
  const mobileMenuItems = [
    { name: "Trade Skins", icon: ArrowLeftRight, href: "/trade" },
    { name: "Freebies", icon: Gift, href: "/free-csgo-skins" },
    { name: "Help Center", icon: HelpCircle, href: "/help" },
  ];

  const personalMenuItems = session
    ? [
        { name: "Personal Area", icon: User, href: "/account/settings" },
        { name: "Transactions", icon: Receipt, href: "/account/transactions" },
      ]
    : [];

  const handleItemClick = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            }}
            className="fixed w-[95%] mx-auto bottom-0 left-0 right-0 bg-[#232126] rounded-t-lg z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-2">
              {/* Main Navigation */}
              <div className="space-y-2">
                {mobileMenuItems.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleItemClick(item.href)}
                      className="w-full py-2 bg-[#232126] rounded-md flex items-center px-5 text-white/80 text-base font-medium transition hover:bg-[#2c2a30]  cursor-pointer group"
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      <span className="flex items-center flex-1 justify-center">
                        <IconComponent
                          className={`text-xl mr-3 transition-all duration-300 group-hover:text-violet-500`}
                        />
                        <span className="text-gray-300 w-full text-center">
                          {item.name}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Personal Area (only if logged in) */}
              {session && personalMenuItems.length > 0 && (
                <div className="space-y-2 border-t border-gray-600 pt-4">
                  {personalMenuItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleItemClick(item.href)}
                        className={`w-full py-2 rounded-md flex items-center px-5 text-base font-medium transition  cursor-pointer group bg-[#232126] hover:bg-[#2c2a30]`}
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        <IconComponent
                          className={`text-xl mr-3 transition-all duration-300 group-hover:text-violet-500`}
                        />
                        <span className="text-gray-300 w-full text-center">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sign Out (only if logged in) */}
              {session && (
                <div className="border-t border-gray-600 pt-4">
                  <button
                    onClick={handleSignOut}
                    className="w-full py-2 bg-[#232126] rounded-md flex items-center px-5 text-red-400 text-base font-medium transition hover:bg-[#2c2a30]  cursor-pointer group"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    <span className="flex items-center flex-1">
                      <LogOut className="text-xl mr-3 transition-all duration-300 group-hover:text-red-300" />
                      Sign Out
                    </span>
                  </button>
                </div>
              )}

              {/* Close Button */}
              <div className="border-t border-gray-600 pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-2 bg-[#2c2a30] rounded-md flex items-center justify-center text-gray-300 text-base font-medium transition hover:bg-[#333038] "
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isTradeRoute = pathname === "/trade";
  const isLandingRoute = pathname === "/";

  const navItems = [
    { name: "Trade Skins", path: "/trade", icon: "/navbar/trade.svg" },
    {
      name: "Freebies",
      path: "/free-csgo-skins",
      icon: "/navbar/freebies.svg",
    },
    { name: "Help Center", path: "/help", icon: "/navbar/help.svg" },
  ];

  const handleSteamLogin = () => {
    setErrorMessage(null);
    setErrorType(null);

    try {
      const params = new URLSearchParams({
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": `${window.location.origin}/api/auth/callback/steam`,
        "openid.realm": window.location.origin,
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id":
          "http://specs.openid.net/auth/2.0/identifier_select",
      });

      const steamLoginUrl = `https://steamcommunity.com/openid/login?${params.toString()}`;
      window.location.href = steamLoginUrl;
    } catch (error) {
      console.error("Error during Steam login:", error);
      setErrorMessage("Failed to initiate Steam login");
      setErrorType("Login Error");
    }
  };

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <nav className="relative top-0 left-0 right-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-[#21201e]">
        <div
          className={`mx-auto px-4 md:px-6 lg:px-8 xl:px-12 transition-all duration-300 ${isTradeRoute ? "w-full" : "w-[90%]"}`}
        >
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img src="/qwik.skin-logo.png" alt="Qwik Trade" className="h-8" />
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`relative top-0 left-0 right-0 z-50 w-full border-b border-[#2D2438]/40 backdrop-blur-md ${isLandingRoute ? "bg-[#09001a]" : "bg-[#1A1625]"}`}
      >
        <div
          className={`mx-auto px-4 md:px-6 lg:px-8 xl:px-12 transition-all duration-300 ${isTradeRoute ? "w-full" : "w-[90%]"}`}
        >
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <img
                  src="/qwik.skin-logo.png"
                  alt="Qwik Trade"
                  className="h-8"
                />
              </Link>
              <div className="hidden min-[950px]:flex items-center space-x-6 relative">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <div key={item.path} className="relative group">
                      <Link
                        href={item.path}
                        className={`text-md font-medium flex items-center gap-2 transition-colors duration-200 group-hover:text-[#9D5CFF] ${
                          isActive ? "text-[#9D5CFF]" : "text-gray-300"
                        }`}
                      >
                        <img
                          src={item.icon}
                          alt=""
                          style={{ fontFamily: "var(--font-space)" }}
                          className={`w-4 h-4 fill-current transition-all duration-200 ${isActive ? "" : "grayscale-[1] group-hover:grayscale-0"}`}
                        />
                        {item.name}
                      </Link>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            className="absolute left-0 right-0 bg-[#9D5CFF] h-1"
                            layoutId="navIndicator"
                            initial={false}
                            style={{ bottom: "170%" }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 60,
                              mass: 1,
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Button */}
              <Button
                variant="ghost"
                size="sm"
                className="min-[950px]:hidden text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6 text-gray-300" />
              </Button>

              {/* Desktop User Menu */}
              <div className="hidden min-[950px]:block">
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              session.user?.steamAvatar || session.user?.image
                            }
                            alt={session.user?.name || ""}
                          />
                          <AvatarFallback>
                            {session.user?.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem
                        className="cursor-pointer text-foreground focus:text-foreground hover:bg-[#2D2438]/50 !hover:bg-[#2D2438] !focus:bg-[#2D2438] !focus:text-[#9D5CFF]"
                        onClick={() => router.push("/profile")}
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-foreground focus:text-foreground hover:bg-[#2D2438]/50 !hover:bg-[#2D2438] !focus:bg-[#2D2438] !focus:text-[#9D5CFF]"
                        onClick={() => router.push("/settings")}
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-foreground focus:text-foreground hover:bg-[#2D2438]/50 !hover:bg-[#2D2438] !focus:bg-[#2D2438] !focus:text-[#9D5CFF]"
                        onClick={() => {
                          signOut({ redirect: true, callbackUrl: "/" });
                        }}
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a
                    href="#"
                    className="steambutton bg-[#9D5CFF] hover:bg-[#B388FF] text-[#1A1625]"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSteamLogin();
                    }}
                  >
                    <span>Login With Steam</span>
                    <div className="icon">
                      <i className="fa fa-steam-square"></i>
                    </div>
                  </a>
                )}
              </div>

              {/* Mobile Login Button - only show if not logged in */}
              {!session && (
                <div className="min-[950px]:hidden">
                  <a
                    href="#"
                    className="steambutton bg-[#9D5CFF] hover:bg-[#B388FF] text-[#1A1625] text-sm px-3 py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSteamLogin();
                    }}
                  >
                    <span>Login</span>
                    <div className="icon">
                      <i className="fa fa-steam-square"></i>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <Suspense fallback={null}>
          <NavbarErrorHandler />
        </Suspense>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        session={session}
        router={router}
      />
    </>
  );
}
