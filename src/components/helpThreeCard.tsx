import React from "react";

const cards = [
  {
    image:
      "https://skinsmonkey.com/helpdesk/ecd0a84b-2d2b-4924-bded-005d8a2df6c8.png",
    title: "Is SkinsMonkey legit?",
    description:
      "This article will show you our online activities and prove how legit we are. We are a truly legit site and are committed to ...",
    href: "#",
  },
  {
    image:
      "https://skinsmonkey.com/helpdesk/3fc9df5b-4ab3-496e-a5d8-b2bd3237b436.png",
    title: "How to deposit funds on my SkinsMonkey Balance?",
    description:
      "This article will help you add the funds on SkinsMonkey Balance. You can top up using a variety of payment methods ...",
    href: "#",
  },
  {
    image:
      "https://skinsmonkey.com/helpdesk/b08e8634-d0e1-4f1c-9c76-81cbe6c11620.png",
    title: "How to trade skins?",
    description:
      "This article will help you successfully trade your skins on SkinsMonkey. To trade new items you need a prepared Steam account ...",
    href: "#",
  },
];

const HelpThreeCard = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <h1
        style={{ fontFamily: "var(--font-space)" }}
        className="text-white/60 text-xl font-bold"
      >
        Get Started with <span className="text-white">SkinsMonkey</span>
      </h1>
      <div className="w-full flex max-[500px]:overflow-x-auto max-[500px]:pb-4 mt-4 gap-3 max-[500px]:snap-x">
        {cards.map((card, idx) => (
          <a
            key={idx}
            href={card.href}
            className={`
              max-[500px]:min-w-[85%] max-[500px]:snap-center w-1/3 h-[300px] bg-[#232126] rounded-lg flex flex-col
              transition-all duration-200
              hover:brightness-125
              group 
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              focus:outline-none
              focus:ring-2 focus:ring-lime-500
              cursor-pointer
              relative
              overflow-hidden
            `}
            style={{ fontFamily: "var(--font-space)" }}
          >
            <div className="w-full h-[140px] flex items-center justify-center rounded-t-lg relative">
              <img
                src={card.image}
                alt="help card"
                className="w-full object-cover scale-100 translate-y-[20px] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-y-[-5px]"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
            <div className="flex-1 flex flex-col absolute bottom-0 px-5 py-4">
              <h2
                className={`
                  text-lg font-bold mb-1 line-clamp-3 transition-colors
                  text-white group-hover:text-violet-400
                `}
                style={{ fontFamily: "var(--font-space)" }}
              >
                {card.title}
              </h2>
              <p className="text-white/70 text-sm line-clamp-3">
                {card.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HelpThreeCard;
