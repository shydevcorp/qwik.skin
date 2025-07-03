import React from "react";

const articles = [
  {
    title: "What is a Backpack and where can I find it?",
    href: "#",
  },
  {
    title: "What is SkinMarking?",
    href: "#",
  },
  {
    title: "How to receive up to $6 for free?",
    href: "#",
  },
  {
    title: "Why can I not trade?",
    href: "#",
  },
  {
    title: "How to trade skins?",
    href: "#",
  },
  {
    title: "How can I withdraw trade locked items?",
    href: "#",
  },
];

const HelpTwoCol = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <h1
        style={{ fontFamily: "var(--font-space)" }}
        className="text-white text-2xl font-bold"
      >
        Frequently Read Articles
      </h1>

      <div className="w-full grid grid-cols-2 gap-4 mt-4">
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.href}
            className="w-full h-[56px] bg-[#232126] group rounded-md flex items-center px-4 text-white/80 text-sm font-medium transition hover:bg-[#2c2a30] focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer"
            style={{ fontFamily: "var(--font-space)" }}
          >
            <span className="flex-1 group-hover:text-violet-400 transition duration-200">
              {article.title}
            </span>
            <span className="ml-2 text-white/40 text-lg">{">"}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HelpTwoCol;
