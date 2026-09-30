"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSequenceProps {
  isLoading: boolean;
  progress: number;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({
  isLoading,
  progress,
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070605] text-[#f7f2ea]"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Minimal Icon / Crosshair */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-10 h-10 mb-8 flex items-center justify-center text-white/50"
            >
              <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-30" />
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
            </motion.div>

            {/* Tracking Header */}
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/70 mb-3"
            >
              LOADING MOLECULAR STRUCTURE
            </motion.p>

            {/* Sub-label */}
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6 font-mono"
            >
              ASCORBIC ACID • C₆H₈O₆ • 3D SEQUENCE
            </motion.p>

            {/* Hairline Progress Bar */}
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mb-3">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400/80 via-white to-amber-200"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            {/* Percentage Display */}
            <div className="flex items-center justify-between w-48 text-[10px] font-mono text-white/40">
              <span>0%</span>
              <span className="text-white/80 font-medium">
                {Math.round(progress)}%
              </span>
              <span>100%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
