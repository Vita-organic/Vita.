"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Key facts that appear one at a time like a magazine editorial
const KEY_FACTS = [
  { stat: "13", label: "vitaminas reconhecidas pela ciência" },
  { stat: "4", label: "lipossolúveis — armazenadas no organismo" },
  { stat: "9", label: "hidrossolúveis — reposição diária essencial" },
  { stat: "mg", label: "miligramas — a escala que sustenta a vida" },
];

export const ScrollyWhatIsAVitamin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const cofactorSectionRef = useRef<HTMLDivElement>(null);
  const cofactorTitleRef = useRef<HTMLHeadingElement>(null);
  const cofactorDescRef = useRef<HTMLParagraphElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Main statement reveal
      gsap.from(text1Ref.current, {
        scrollTrigger: {
          trigger: text1Ref.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.8,
        },
        y: 70,
        opacity: 0,
      });

      // 2. Word highlighting on scroll
      if (highlightRef.current) {
        gsap.to(highlightRef.current, {
          scrollTrigger: {
            trigger: highlightRef.current,
            start: "top 72%",
            end: "top 45%",
            scrub: 0.6,
          },
          color: "#f5d77f",
          textShadow: "0 0 40px rgba(245,215,127,0.35)",
        });
      }

      // 3. Sub text
      gsap.from(subTextRef.current, {
        scrollTrigger: {
          trigger: subTextRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 0.8,
        },
        y: 40,
        opacity: 0,
      });

      // 4. Fact counters stagger in
      if (factsRef.current) {
        gsap.from(Array.from(factsRef.current.children), {
          scrollTrigger: {
            trigger: factsRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.9,
          },
          y: 50,
          opacity: 0,
          stagger: 0.15,
        });
      }

      // 5. Cofactores section
      gsap.from(cofactorTitleRef.current, {
        scrollTrigger: {
          trigger: cofactorSectionRef.current,
          start: "top 78%",
          end: "top 45%",
          scrub: 0.9,
        },
        y: 80,
        opacity: 0,
      });

      gsap.from(cofactorDescRef.current, {
        scrollTrigger: {
          trigger: cofactorDescRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 0.8,
        },
        y: 40,
        opacity: 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="definicao"
      className="relative w-full bg-[#060504] text-[#f7f2ea] overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-amber-500/4 blur-[220px] pointer-events-none" />

      {/* ================================================================
          SCENE 01: THE FUNDAMENTAL AXIOM
          ================================================================ */}
      <div className="min-h-[85vh] sm:min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-28 md:py-36 max-w-7xl mx-auto">
        <span className="text-xs font-mono tracking-[0.35em] uppercase text-amber-400/90 mb-6 sm:mb-8 block">
          01 &middot; O CONCEITO FUNDAMENTAL
        </span>

        <h2
          ref={text1Ref}
          className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.08] tracking-tight max-w-5xl mb-6 sm:mb-8"
        >
          Vitaminas são substâncias orgânicas essenciais ao{" "}
          <span ref={highlightRef} className="text-white/55 transition-colors duration-300">
            funcionamento do corpo
          </span>
          .
        </h2>

        <p
          ref={subTextRef}
          className="text-base sm:text-xl md:text-2xl text-white/70 font-sans font-light leading-relaxed max-w-3xl mb-12 sm:mb-16"
        >
          Precisam ser ingeridas regularmente através da alimentação,{" "}
          <span className="text-white/95 font-normal underline decoration-amber-400/40 underline-offset-8">
            pois o organismo não é capaz de produzi-las
          </span>
          .
        </p>

        {/* Key fact counters */}
        <div
          ref={factsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {KEY_FACTS.map((fact, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02] group hover:border-amber-400/25 transition-colors flex flex-col justify-between"
            >
              <span className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-white block mb-1.5 group-hover:text-amber-200 transition-colors">
                {fact.stat}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/45 leading-snug">
                {fact.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          SCENE 02: COFATORES ENZIMÁTICOS
          ================================================================ */}
      <div
        ref={cofactorSectionRef}
        className="min-h-[80vh] sm:min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-28 md:py-36 max-w-7xl mx-auto border-t border-white/5"
      >
        <span className="text-xs font-mono tracking-[0.35em] uppercase text-white/40 mb-6 sm:mb-8 block">
          O MECANISMO DE AÇÃO
        </span>

        <h3
          ref={cofactorTitleRef}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tight mb-6 sm:mb-8 uppercase"
        >
          Cofatores <br />
          <span className="italic text-amber-200/90 font-serif">Enzimáticos</span>
        </h3>

        <p
          ref={cofactorDescRef}
          className="text-base sm:text-xl md:text-2xl text-white/75 font-sans font-light leading-relaxed max-w-4xl"
        >
          Agem como peças-chave indispensáveis para que as enzimas celulares possam atuar,
          acelerando e viabilizando as reações químicas vitais ao metabolismo humano.
        </p>
      </div>
    </section>
  );
};
