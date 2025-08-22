"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function WeaponImages() {
  const circularAnimation = {
    animate: {
      rotateZ: [0, 1, 0, -1, 0],
      x: [0, 5, 0, -5, 0],
      y: [0, -3, 0, 3, 0],
      transition: {
        duration: 10,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  const redARVariant = {
    ...circularAnimation.animate,
    transition: {
      ...circularAnimation.animate.transition,
      duration: 9.5,
      delay: 0,
    },
  };

  const blueAKVariant = {
    ...circularAnimation.animate,
    transition: {
      ...circularAnimation.animate.transition,
      duration: 10.5,
      delay: 2.5,
    },
  };

  const colorKnifeVariant = {
    ...circularAnimation.animate,
    transition: {
      ...circularAnimation.animate.transition,
      duration: 9,
      delay: 1.5,
    },
  };

  const yellowKnifeVariant = {
    ...circularAnimation.animate,
    transition: {
      ...circularAnimation.animate.transition,
      duration: 11,
      delay: 3.8,
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="w-full h-full relative">
          <motion.div
            className="absolute bottom-[-10%] left-[-25%]"
            animate={redARVariant}
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/landing/gun1.png"
              alt="Howl"
              width={545}
              height={599}
            />
          </motion.div>

          <motion.div
            className="absolute top-[-3%] right-[-12%]"
            animate={blueAKVariant}
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/landing/gun2.png"
              alt="Blue and white rifle"
              width={625}
              height={608}
            />
          </motion.div>

          <motion.div
            className="absolute top-[-5%] left-[-25%]"
            animate={colorKnifeVariant}
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/landing/knife1.png"
              alt="bayonet fade knife"
              width={517}
              height={438}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-[-5%] right-[-5%]"
            animate={yellowKnifeVariant}
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/landing/knife2.png"
              alt="tiger tooth knife"
              width={452}
              height={363}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
