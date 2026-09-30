"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollyClassificationFork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const forkStageRef = useRef<HTMLDivElement>(null);
  const lipoWordRef = useRef<HTMLDivElement>(null);
  const hidroWordRef = useRef<HTMLDivElement>(null);
  const lipoSubRef = useRef<HTMLDivElement>(null);
  const hidroSubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Question
      gsap.from(questionRef.current, {
        scrollTrigger: {
          trigger: questionRef.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 0.8,
        },
        y: 50,
        opacity: 0,
      });

      const isDesktop = window.innerWidth >= 1024;
      const xOffset = isDesktop ? 45 : 0;

      // 2. Physical separation of the two words on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: forkStageRef.current,
          start: "top 72%",
          end: "bottom 28%",
          scrub: 1,
        },
      });

      // Lipossolúveis moves left and expands
      tl.fromTo(
        lipoWordRef.current,
        { x: 0, opacity: 0.7 },
        { x: -xOffset, opacity: 1, ease: "power2.out" },
        0
      );

      // Hidrossolúveis moves right and expands
      tl.fromTo(
        hidroWordRef.current,
        { x: 0, opacity: 0.7 },
        { x: xOffset, opacity: 1, ease: "power2.out" },
        0
      );

      // Reveal expanding subtexts
      tl.fromTo(
        [lipoSubRef.current, hidroSubRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, ease: "power2.out" },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="classificacao"
      className="relative w-full min-h-[85vh] sm:min-h-screen bg-[#060504] text-[#f7f2ea] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-28 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Background Soft Lighting for Dual Split */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[200px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        {/* Section Header */}
        <span className="text-xs font-mono tracking-[0.35em] uppercase text-white/40 mb-6 sm:mb-8 block">
          02 &middot; A GRANDE BIFURCAÇÃO
        </span>

        {/* Question Title */}
        <h2
          ref={questionRef}
          className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-tight max-w-5xl mb-14 sm:mb-20"
        >
          Como as vitaminas <br />
          <span className="italic text-amber-200/90 font-serif">se comportam no corpo?</span>
        </h2>

        {/* The Visual Fork: Words physically separating on scroll */}
        <div
          ref={forkStageRef}
          className="w-full flex flex-col lg:flex-row items-center justify-around gap-12 sm:gap-16 lg:gap-8 pt-4"
        >
          {/* Path 1: LIPOSSOLÚVEIS */}
          <div ref={lipoWordRef} className="flex flex-col items-center lg:items-end text-center lg:text-right max-w-md">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400 mb-2">
              GRUPO I &middot; 4 COMPOSTOS
            </span>
            <h3 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight uppercase break-words">
              Lipossolúveis
            </h3>
            <div ref={lipoSubRef} className="mt-3 sm:mt-4 space-y-1">
              <p className="text-sm sm:text-base font-sans font-light text-white/70">
                Solúveis em lipídios e gorduras.
              </p>
              <p className="text-sm font-mono text-amber-300/90 uppercase tracking-widest">
                A &middot; D &middot; E &middot; K
              </p>
            </div>
          </div>

          {/* Central Fine Hairline Divider */}
          <div className="hidden lg:block w-[1px] h-48 bg-white/15" aria-hidden="true" />

          {/* Path 2: HIDROSSOLÚVEIS */}
          <div ref={hidroWordRef} className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 mb-2">
              GRUPO II &middot; 5 COMPOSTOS
            </span>
            <h3 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight uppercase break-words">
              Hidrossolúveis
            </h3>
            <div ref={hidroSubRef} className="mt-3 sm:mt-4 space-y-1">
              <p className="text-sm sm:text-base font-sans font-light text-white/70">
                Solúveis em água celular e fluidos corporais.
              </p>
              <p className="text-sm font-mono text-blue-300/90 uppercase tracking-widest">
                Complexo B &middot; Vitamina C
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
