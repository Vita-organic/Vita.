"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollyClassificationFork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lipoColRef = useRef<HTMLDivElement>(null);
  const hidroColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.8,
          },
          y: 50,
          opacity: 0,
          stagger: 0.15,
        });
      }

      // Fork split animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lipoColRef.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      tl.fromTo(
        lipoColRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" },
        0
      );

      tl.fromTo(
        hidroColRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="classificacao"
      className="section-editorial min-h-screen flex flex-col justify-center"
    >
      {/* Background Soft Dual Color Atmosphere */}
      <div
        className="ambient-glow w-[500px] h-[500px] left-10"
        style={{
          background: "radial-gradient(circle, rgba(232, 168, 48, 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-glow w-[500px] h-[500px] right-10"
        style={{
          background: "radial-gradient(circle, rgba(82, 165, 255, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 sm:mb-20 lg:mb-24 text-center max-w-4xl mx-auto">
          <span className="eyebrow-scientific text-white/40 mb-4 sm:mb-6">
            02 &middot; A CLASSIFICAÇÃO QUÍMICA
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
            Como as vitaminas <br />
            <span className="italic font-serif text-[#e8a830]/90">
              se dissolvem no corpo?
            </span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-white/60 font-sans font-light max-w-2xl mx-auto">
            A solubilidade química dita como cada vitamina é digerida, transportada no sangue, armazenada ou eliminada pelo organismo.
          </p>
        </div>

        {/* The Visual Fork: Pure Typographic Duality */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-24 pt-4 border-t border-white/[0.06]">
          {/* Group 1: Lipossolúveis */}
          <div ref={lipoColRef} className="flex flex-col space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#e8a830]">
              <span>GRUPO I &middot; 4 COMPOSTOS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8a830]" />
            </div>

            <h3 className="font-editorial text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-white uppercase tracking-tight break-words">
              Lipossolúveis
            </h3>

            {/* Letter Designation Sequence */}
            <div className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-light text-[#e8a830]/90 tracking-widest py-1.5 sm:py-2">
              A &middot; D &middot; E &middot; K
            </div>

            <p className="text-sm sm:text-base lg:text-base xl:text-lg text-white/70 font-sans font-light leading-relaxed max-w-lg">
              Solúveis em lipídios e gorduras corporais. Requerem ácidos biliares para digestão e são estocadas por longos períodos no <span className="text-white font-normal">tecido adiposo e no fígado</span>, evitando deficiências imediatas mas exigindo cautela contra hipervitaminoses.
            </p>
          </div>

          {/* Group 2: Hidrossolúveis */}
          <div ref={hidroColRef} className="flex flex-col space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#52a5ff]">
              <span>GRUPO II &middot; 5 COMPOSTOS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#52a5ff]" />
            </div>

            <h3 className="font-editorial text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-white uppercase tracking-tight break-words">
              Hidrossolúveis
            </h3>

            {/* Letter Designation Sequence */}
            <div className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-light text-[#52a5ff]/90 tracking-widest py-1.5 sm:py-2">
              Complexo B &middot; Vitamina C
            </div>

            <p className="text-sm sm:text-base lg:text-base xl:text-lg text-white/70 font-sans font-light leading-relaxed max-w-lg">
              Solúveis em água celular e fluidos circulatórios. Não criam reservatórios duradouros e o excesso é <span className="text-white font-normal">continuamente eliminado através da urina</span>, exigindo ingestão constante e renovação diária na dieta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
