import React from "react";
import { IconBaseProps } from "react-icons";
import {
  Settings,
  ArrowLeftRight,
  CreditCard,
  Package,
  User,
  Shield,
} from "lucide-react";

interface Topic {
  title: string;
  icon: React.ComponentType<IconBaseProps>;
  href: string;
}

const topics: Topic[] = [
  {
    title: "General",
    icon: Settings,
    href: "/",
  },
  {
    title: "Trading",
    icon: ArrowLeftRight,
    href: "/",
  },
  {
    title: "Deposit",
    icon: CreditCard,
    href: "/",
  },
  {
    title: "Items",
    icon: Package,
    href: "/",
  },
  {
    title: "Account",
    icon: User,
    href: "/",
  },
  {
    title: "Security",
    icon: Shield,
    href: "/",
  },
];

const HelpSixCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <h1
        style={{ fontFamily: "var(--font-space)" }}
        className="text-white text-xl font-bold"
      >
        Topics
      </h1>

      <div className="w-full grid grid-cols-1 min-[600px]:grid-cols-3 gap-6 mt-4">
        {topics.map((topic, idx) => {
          const Icon = topic.icon;
          return (
            <a
              key={idx}
              href={topic.href}
              className="w-full py-4 bg-[#232126] rounded-md flex items-center px-5 text-white/80 text-base font-medium transition hover:bg-[#2c2a30] focus:outline-none focus:ring-2 focus:ring-lime-500 cursor-pointer group"
              style={{ fontFamily: "var(--font-space)" }}
            >
              <span className="flex items-center flex-1">
                <Icon className="text-xl mr-2 transition-all duration-300 group-hover:text-violet-500" />
                {topic.title}
              </span>
              <span className="ml-2 text-white/40 text-lg group-hover:text-white/60 transition">
                {">"}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HelpSixCard;
