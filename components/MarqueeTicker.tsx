"use client";

import React from "react";

interface MarqueeTickerProps {
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  className = "",
}) => {
  const defaultItems = [
    { name: "VITAMINA A", formula: "C₂₀H₃₀O", group: "RETINOL" },
    { name: "VITAMINA D", formula: "C₂₇H₄₄O", group: "COLECALCIFEROL" },
    { name: "VITAMINA E", formula: "C₂₉H₅₀O₂", group: "ALFA-TOCOFEROL" },
    { name: "VITAMINA K", formula: "C₃₁H₄₆O₂", group: "FILOQUINONA" },
    { name: "VITAMINA B1", formula: "C₁₂H₁₇N₄OS⁺", group: "TIAMINA" },
    { name: "VITAMINA B2", formula: "C₁₇H₂₀N₄O₆", group: "RIBOFLAVINA" },
    { name: "VITAMINA B6", formula: "C₈H₁₁NO₃", group: "PIRIDOXINA" },
    { name: "VITAMINA B12", formula: "C₆₃H₈₈CoN₁₄O₁₄P", group: "CIANOCOBALAMINA" },
    { name: "VITAMINA C", formula: "C₆H₈O₆", group: "ÁCIDO L-ASCÓRBICO" },
  ];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-white/10 bg-[#060504] py-3.5 sm:py-4 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Side Fade Gradients for effortless blend */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#060504] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#060504] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track running at 60fps in pure hardware-accelerated CSS */}
      <div className="flex w-max animate-marquee space-x-8 sm:space-x-12">
        {/* Sequence repeated twice for seamless continuous loop */}
        {[...defaultItems, ...defaultItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-white/50"
          >
            <span className="text-white/80 font-medium">{item.name}</span>
            <span className="text-amber-400/80 font-semibold">{item.formula}</span>
            <span className="text-white/35">&middot;</span>
            <span className="text-white/40">{item.group}</span>
            <span className="text-white/20 mx-2">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
