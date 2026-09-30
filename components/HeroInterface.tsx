"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrollIndicator } from "./ScrollIndicator";

interface HeroInterfaceProps {
  scrollProgress?: number;
}

export const HeroInterface: React.FC<HeroInterfaceProps> = ({ scrollProgress = 0 }) => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none text-[#f7f2ea] flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 overflow-hidden">
      {/* Top Bar: Minimal Editorial Monogram */}
      <div className="w-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center space-x-3 text-xs font-mono tracking-[0.3em] uppercase text-white/60"
        >
          <span>EXPOSIÇÃO MOLECULAR</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-white/40">2026</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-right text-xs font-mono tracking-[0.25em] text-white/40 uppercase"
        >
          BIOQUÍMICA &middot; 01
        </motion.div>
      </div>

      {/* Center: Enormous Editorial Title */}
      <div className="w-full my-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-editorial text-[16vw] sm:text-[14vw] lg:text-[12rem] xl:text-[14rem] leading-[0.85] tracking-[-0.02em] text-[#f7f2ea] drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)] font-light">
            VITAMINAS
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-sans tracking-[0.5em] sm:tracking-[0.6em] text-amber-200/90 uppercase font-medium"
        >
          A Química da Vida
        </motion.p>
      </div>

      {/* Bottom Row: Subtle Scroll Indicator */}
      <div className="w-full flex items-end justify-between text-white/40 pt-4 border-t border-white/[0.05]">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase">
          ESTUDO CIENTÍFICO
        </span>

        {/* Center Scroll Prompt */}
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2">
          <ScrollIndicator progress={scrollProgress} />
        </div>

        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-right">
          ROLE PARA EXPLORAR
        </span>
      </div>
    </div>
  );
};
