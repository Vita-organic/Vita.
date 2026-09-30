"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollyWaterSolubleTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formulaPillRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, formulaPillRef.current, descRef.current], {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.8,
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hidrossoluveis-transicao"
      className="relative w-full min-h-[85vh] sm:min-h-screen bg-[#050608] text-[#f7f2ea] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-28 md:py-36 border-t border-blue-500/20 overflow-hidden"
    >
      {/* Background Aquatic / Sapphire Blue Ambient Portal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-600/10 blur-[220px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Subtle Chapter Marker */}
        <span className="text-xs font-mono tracking-[0.35em] uppercase text-blue-400 mb-6 sm:mb-8 block">
          04 &middot; CAPÍTULO II &middot; O FLUXO AQUOSO
        </span>

        {/* Major Dramatic Title */}
        <h2
          ref={titleRef}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight uppercase mb-6 sm:mb-8"
        >
          Hidrossolúveis
        </h2>

        {/* B + C Visual Element */}
        <div
          ref={formulaPillRef}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 mb-8 sm:mb-10 text-blue-200/95 font-editorial text-3xl sm:text-5xl md:text-6xl font-light"
        >
          <span>Complexo B</span>
          <span className="text-blue-400 font-sans text-xl sm:text-3xl font-light">+</span>
          <span>Vitamina C</span>
        </div>

        {/* Clear, Spacious Explanation */}
        <p
          ref={descRef}
          className="text-base sm:text-xl md:text-2xl text-white/75 font-sans font-light leading-relaxed max-w-3xl"
        >
          Compostos polares e hidrofílicos que circulam livremente pelo citoplasma e plasma sanguíneo.{" "}
          <span className="text-white font-normal underline decoration-blue-400/40 underline-offset-8">
            São mais facilmente eliminadas através da urina
          </span>
          , o que impede estoques duradouros e exige uma reposição nutricional diária e contínua.
        </p>
      </div>
    </section>
  );
};
