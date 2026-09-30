"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollyLipossoluveisChapter: React.FC = () => {
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
      id="lipossoluveis-capitulo"
      className="relative w-full min-h-[85vh] sm:min-h-screen bg-[#080600] text-[#f7f2ea] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-28 md:py-36 border-t border-amber-500/20 overflow-hidden"
    >
      {/* Background Warm Amber Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-amber-500/10 blur-[220px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Subtle Chapter Marker */}
        <span className="text-xs font-mono tracking-[0.35em] uppercase text-amber-400 mb-6 sm:mb-8 block">
          03 &middot; CAPÍTULO I &middot; RESERVA ADIPOSA
        </span>

        {/* Major Dramatic Title */}
        <h2
          ref={titleRef}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight uppercase mb-6 sm:mb-8"
        >
          Lipossolúveis
        </h2>

        {/* A · D · E · K Visual Element */}
        <div
          ref={formulaPillRef}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 mb-8 sm:mb-10 text-amber-200/95 font-editorial text-3xl sm:text-5xl md:text-6xl font-light"
        >
          <span>Vitamina A</span>
          <span className="text-amber-400 font-sans text-xl sm:text-3xl font-light">·</span>
          <span>D &middot; E &middot; K</span>
        </div>

        {/* Clear, Spacious Explanation */}
        <p
          ref={descRef}
          className="text-base sm:text-xl md:text-2xl text-white/75 font-sans font-light leading-relaxed max-w-3xl"
        >
          Compostos apolares e lipofílicos que precisam de sais biliares e gorduras para serem absorvidos.{" "}
          <span className="text-white font-normal underline decoration-amber-400/40 underline-offset-8">
            São armazenadas no tecido adiposo e no fígado
          </span>
          , formando reservas biológicas duradouras no organismo.
        </p>
      </div>
    </section>
  );
};
