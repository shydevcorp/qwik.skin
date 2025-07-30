"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Copy, Edit3, Check, X } from "lucide-react";

export default function Settings() {
  const { data: session } = useSession();
  const [tradeUrl, setTradeUrl] = useState(
    "https://steamcommunity.com/tradeoffer/new/?partner=1900261156&token=MTUTj-Pl",
  );
  const [isEditingTradeUrl, setIsEditingTradeUrl] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (session?.user?.steamId) {
      navigator.clipboard.writeText(session.user.steamId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTradeUrlEdit = () => {
    setIsEditingTradeUrl(true);
  };

  const handleTradeUrlSave = () => {
    setIsEditingTradeUrl(false);
  };

  const handleTradeUrlCancel = () => {
    setIsEditingTradeUrl(false);
  };

  const handleFindTradeUrl = () => {
    window.open(
      "https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url",
      "_blank",
    );
  };

  const handleResendConfirmation = () => {
    console.log("Resending email confirmation...");
  };

  const handleConnectDiscord = () => {
    console.log("Connecting Discord...");
  };

  const handleDisconnectSteam = () => {
    console.log("Disconnecting Steam...");
  };

  return (
    <div className="flex-1 w-full max-w-full overflow-x-hidden">
      <div className="p-6 bg-[#1A1625] text-white min-h-full">
        {/* User Profile Header */}
        <div className="flex items-start justify-between mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#4A4A4A] rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">?</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                {session?.user?.steamUsername || "jaindikshit73"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-sm">
                  {session?.user?.steamId || "76561119986052684"}
                </span>
                <button
                  onClick={handleCopyId}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">
              If your account is not displaying correctly, please
            </p>
            <button className="text-sm text-blue-400 hover:text-blue-300 underline">
              Refresh Steam Profile
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Here you can find information about your SkinsMonkey account. Make
            sure to always provide up-to-date Trade URL and other information to
            guarantee a seamless trade experience.
          </p>

          {/* Trade URL */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <label className="text-white font-medium text-sm">
                Trade URL
              </label>
              <button
                onClick={handleFindTradeUrl}
                className="text-yellow-400 hover:text-yellow-300 text-xs underline"
              >
                Find Trade URL
              </button>
            </div>
            <div className="flex items-stretch gap-3">
              {isEditingTradeUrl ? (
                <>
                  <input
                    type="text"
                    value={tradeUrl}
                    onChange={(e) => setTradeUrl(e.target.value)}
                    className="flex-1 bg-[#2D2438] border border-[#3D3448] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleTradeUrlSave}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={handleTradeUrlCancel}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 bg-[#2D2438] border border-[#3D3448] text-white px-4 py-2 rounded-lg text-sm break-all">
                    {tradeUrl}
                  </div>
                  <button
                    onClick={handleTradeUrlEdit}
                    className="px-4 py-2 bg-[#2D2438] hover:bg-[#3D3448] border border-[#3D3448] rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Edit3 className="w-4 h-4 text-white" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Contact Information
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Your email address is used to verify we are working with a human and
            not a robot.
          </p>

          {/* Email */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <label className="text-white font-medium text-sm">Email</label>
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-medium">
                  Not Verified
                </span>
              </div>
              <button
                onClick={handleResendConfirmation}
                className="text-gray-400 hover:text-white text-xs underline"
              >
                Resend Confirmation
              </button>
            </div>
            <div className="flex items-stretch gap-3">
              <div className="flex-1 bg-[#2D2438] border border-[#3D3448] text-white px-4 py-2 rounded-lg text-sm break-all">
                {session?.user?.email || "dikshitmahanot2005@gmail.com"}
              </div>
              <button className="px-4 py-2 bg-[#2D2438] hover:bg-[#3D3448] border border-[#3D3448] rounded-lg transition-colors flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-2 text-sm">
              Email notifications from SkinsMonkey
            </h3>
            <p className="text-gray-400 text-xs mb-4">
              Receive updates from SkinsMonkey about your account and ongoing
              promotions. You can change the settings at any time.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-green-500 bg-[#2D2438] border-[#3D3448] rounded"
                />
                <div>
                  <label
                    htmlFor="notifications"
                    className="text-white font-medium block mb-1 text-sm"
                  >
                    Notifications
                  </label>
                  <p className="text-gray-400 text-xs">
                    Important updates, such as deposit status, raffle results,
                    Backpack reminders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="promotions"
                  checked={promotions}
                  onChange={(e) => setPromotions(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-green-500 bg-[#2D2438] border-[#3D3448] rounded"
                />
                <div>
                  <label
                    htmlFor="promotions"
                    className="text-white font-medium block mb-1 text-sm"
                  >
                    Promotions
                  </label>
                  <p className="text-gray-400 text-xs">
                    Free giveaways, promo codes, and other opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Connected Accounts
          </h2>

          <div className="space-y-3">
            {/* Steam Account */}
            <div className="flex items-center justify-between p-4 bg-[#2D2438] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1B2838] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Steam</h3>
                  <p className="text-gray-400 text-xs">
                    {session?.user?.steamUsername || "jaindikshit73"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDisconnectSteam}
                className="px-4 py-2 bg-[#4A4A4A] hover:bg-[#5A5A5A] text-white rounded-lg transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>

            {/* Discord Account */}
            <div className="flex items-center justify-between p-4 bg-[#2D2438] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5865F2] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Discord</h3>
                  <p className="text-gray-400 text-xs">Not Connected</p>
                </div>
              </div>
              <button
                onClick={handleConnectDiscord}
                className="px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <span className="text-lg">+</span>
                <span>Link Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
