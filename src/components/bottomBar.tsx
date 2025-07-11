"use client";

import React from "react";

const BottomBar = () => {
  // Define the footer sections data
  const footerSections = [
    {
      title: "Additional Links",
      links: [
        "Trade",
        "Refer and Get Skins",
        "Steam Fast Selling",
        "Steam",
        "Buy CS2 Skins",
        "Sell CS2 Skins",
        "List Your Skins for CS2 Skins",
        "CS2 Skins Price list",
        "Discovery CS2 Skins",
        "Today's Promotions",
        "CS2 Site",
        "Best Buffering CS2 Skins",
      ],
    },
    {
      title: "Steel Cases",
      links: [
        "CS2 Cases",
        "Horizon Case",
        "Spectrum Cases",
        "Wild Lotus Case",
        "Operation Brochures Case",
        "CS2 Case Collection",
        "Revolution Case",
        "Clutch Case",
        "Prisma Case",
        "Chroma Cases",
        "Danger Zone Case",
        "Operation Broken Fang Case",
      ],
    },
    {
      title: "Free",
      links: [
        "Buy CS2 Skins Selling",
        "Free Real Skins",
        "Your name:",
        "Best CS2 Collection",
        "Real CS2 Skins",
        "CS2 Case Reviews",
        "Real Best CS2 Skins",
        "Real Best Collection Experiences",
        "Real Best Collection Skins",
      ],
    },
    {
      title: "Buy",
      links: [
        "Buy CS2 Skins",
        "CS2 Skins Betting",
        "CS2 Real Prices",
        "Best CS2 Skins",
        "CS2 CS2 Prices",
        "CS2 CS2 Batlescarf",
        "All CS2 Prices",
        "CS2 CS2 Battlefield",
        "CS2 CS2 Skins",
        "CS2 CS2 Battle League",
        "CS2 CS2 Battle Group",
        "CS2 CS2 League League",
      ],
    },
    {
      title: "Sell",
      links: [
        "Sell CS2 Skins",
        "CS2 Real Prices",
        "Steam Trading Bot",
        "Steam Selling-G",
        "Best CS2 Battlefield",
        "CS2 Real Deals",
        "Steam BattleLeague",
        "Steam Trading & Selling",
        "Steam-G Battle League",
        "Steam & Real League",
        "Steam & Game League",
      ],
    },
    {
      title: "Chalet Cases",
      links: [
        "Prisma Cases",
        "Phoenix Case",
        "Chroma Case",
        "Winter Offensive Case",
        "Revolution Case",
        "Operation Bravo Case",
        "Recoil Case",
        "Operation Broken Fang",
        "Spectrum Armors/Cases",
        "Spectrum Announcements",
        "Spectrum & Fight Leagues",
      ],
    },
    {
      title: "Casing Cases",
      links: [
        "Prisma Cases",
        "Phoenix Case",
        "Chroma Case",
        "Winter Offensive Case",
        "Revolution Case",
        "Operation Broken Fang",
        "Spectrum Case",
        "Spectrum Announcements",
        "Spectrum & Fight Leagues",
      ],
    },
  ];

  return (
    <footer className="bg-[#1A1625]/30 text-white py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm text-white/60">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;
