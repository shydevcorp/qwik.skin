import React from "react";
import {
  MdSettings,
  MdSwapHoriz,
  MdCreditCard,
  MdInventory,
  MdPerson,
  MdSecurity,
} from "react-icons/md";

const topics = [
  {
    title: "General",
    icon: (
      <MdSettings className="text-xl mr-2 transition-all duration-300 group-hover:text-violet-500" />
    ),
    href: "/",
  },
  {
    title: "Trading",
    icon: (
      <MdSwapHoriz className="text-xl mr-2 transition-all duration-300 group-hover:text-violet-500" />
    ),
    href: "/",
  },
  {
    title: "Deposit",
    icon: (
      <MdCreditCard className="text-xl mr-2 transition-all duration-300 group-hover:text-violet-500" />
    ),
    href: "/",
  },
  {
    title: "Items",
    icon: (
      <MdInventory className="text-xl mr-2 transition-all duration-300 group-hover:text-violet-500" />
    ),
    href: "/",
  },
  {
    title: "Account",
    icon: (
      <MdPerson className="text-xl mr-2 transition-all duration-300 group-hover:text-violet-500" />
    ),
    href: "/",
  },
  {
    title: "Security",
    icon: (
      <MdSecurity className="text-xl mr-2 transition-all duration-300 group-hover:text-violet-500" />
    ),
    href: "/",
  },
];

const HelpSixCard = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <h1
        style={{ fontFamily: "var(--font-space)" }}
        className="text-white text-xl font-bold"
      >
        Topics
      </h1>

      <div className="w-full grid grid-cols-3 gap-6 mt-4">
        {topics.map((topic, idx) => (
          <a
            key={idx}
            href={topic.href}
            className="w-full py-4 bg-[#232126] rounded-md flex items-center px-5 text-white/80 text-base font-medium transition hover:bg-[#2c2a30] focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer group"
            style={{ fontFamily: "var(--font-space)" }}
          >
            <span className="flex items-center flex-1">
              {topic.icon}
              {topic.title}
            </span>
            <span className="ml-2 text-white/40 text-lg group-hover:text-white/60 transition">
              {">"}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HelpSixCard;
