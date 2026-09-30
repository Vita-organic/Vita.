"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  progress?: number;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ progress = 0 }) => {
  // Fade out as scroll progress increases beyond initial 15%
  const opacity = Math.max(0, 1 - progress * 4);

  return (
    <motion.div
      style={{ opacity }}
      className="flex flex-col items-center justify-center pointer-events-none select-none"
    >
      {/* Vertical Indicator Line */}
      <div className="relative w-[1px] h-7 bg-white/15 overflow-hidden mb-2.5">
        <motion.div
          animate={{
            y: [-28, 28],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
          className="w-full h-4 bg-gradient-to-b from-white/90 to-transparent"
        />
      </div>

      {/* Tracked Text Label */}
      <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-white/60">
        SCROLL TO EXPLORE
      </span>
    </motion.div>
  );
};
