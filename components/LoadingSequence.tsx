"use client";

import React, { useEffect, useState } from "react";

interface LoadingSequenceProps {
  isLoading: boolean;
  progress: number;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({
  isLoading,
  progress,
}) => {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070605] text-[#f7f2ea] transition-opacity duration-700 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(232, 168, 48, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Minimal Icon / Crosshair */}
        <div className="relative w-10 h-10 mb-8 flex items-center justify-center text-white/50">
          <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-30" />
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Tracking Header */}
        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/70 mb-3">
          ESTRUTURA MOLECULAR 3D
        </p>

        {/* Sub-label */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6 font-mono">
          ÁCIDO ASCÓRBICO • C₆H₈O₆ • 60 FPS
        </p>

        {/* Hairline Progress Bar */}
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mb-3">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400/80 via-white to-amber-200 transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        {/* Percentage Display */}
        <div className="flex items-center justify-between w-48 text-[10px] font-mono text-white/40">
          <span>0%</span>
          <span className="text-white/80 font-medium">{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
