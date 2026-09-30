"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE_EVENTS = [
  {
    year: "1906",
    label: "Descoberta",
    desc: "Frederick Hopkins prova que fatores alimentares desconhecidos são essenciais à vida.",
  },
  {
    year: "1912",
    label: "Nomenclatura",
    desc: "Casimir Funk cunha o termo 'Vitamina' — do latim vita (vida) + amina.",
  },
  {
    year: "1920s",
    label: "Isolamento",
    desc: "Vitaminas A, B, C e D são isoladas e caracterizadas quimicamente.",
  },
  {
    year: "1943",
    label: "Síntese",
    desc: "Primeiras sínteses totais em laboratório transformam vitaminas em medicamentos.",
  },
  {
    year: "Hoje",
    label: "Bioquímica",
    desc: "Estrutura atômica de cada vitamina mapeada com precisão angström.",
  },
];

const AUTHORS = [
  "Lucas da Silva Lemos",
  "Pedro Arhur Batista Carvalho",
  "João Bernardo de Araujo Resende",
  "Orlando Olegario Favaro",
  "Caua Paiva de Almeida",
  "Rakel Marques Leite"
];

export const EditorialClosingCta: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaHeadRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // CTA headline reveal if ScrollTrigger is active
      if (ctaHeadRef.current) {
        gsap.fromTo(
          ctaHeadRef.current,
          { y: 30, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaHeadRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Timeline items reveal
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        if (items.length > 0) {
          gsap.fromTo(
            Array.from(items),
            { y: 24, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div ref={containerRef} className="w-full bg-[#060504] text-[#f7f2ea] overflow-hidden">

      {/* ================================================================
          SCENE: COMPREENDER A QUÍMICA (CTA & REFLECTION)
          ================================================================ */}
      <section
        id="compreender-quimica"
        className="relative w-full py-20 sm:py-28 md:py-36 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-white/10 text-center flex flex-col items-center overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-amber-500/5 blur-[200px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 font-mono text-xs tracking-widest uppercase mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          COMPREENDER A QUÍMICA
        </div>

        <h2
          ref={ctaHeadRef}
          className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.08] tracking-tight max-w-5xl mb-6 sm:mb-8"
        >
          A precisão molecular{" "}
          <span className="italic text-amber-200/90 font-serif block sm:inline">
            da saúde humana
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/75 font-sans font-light leading-relaxed max-w-3xl mb-10 sm:mb-12">
          Compreender a química das vitaminas é enxergar a perfeição microscópica com que a evolução
          conectou nossa dieta ao metabolismo celular. Uma sinfonia de frações de miligramas que torna
          a vida possível.
        </p>

        <button
          onClick={scrollToTop}
          className="group flex items-center space-x-3 text-xs font-mono tracking-[0.25em] uppercase text-white/80 hover:text-white transition-colors pb-1 border-b border-amber-400/40 hover:border-amber-400 cursor-pointer"
        >
          <span>Retornar ao início</span>
          <span className="transition-transform group-hover:-translate-y-1.5 text-base text-amber-400">↑</span>
        </button>
      </section>

      {/* ================================================================
          SCENE: CRONOLOGIA DA DESCOBERTA (TIMELINE)
          ================================================================ */}
      <section
        id="cronologia"
        className="relative w-full py-20 sm:py-28 md:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 overflow-hidden bg-[#070605]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center sm:items-start mb-12 sm:mb-16 text-center sm:text-left">
            <span className="text-xs font-mono tracking-[0.35em] uppercase text-amber-400/90 block mb-3">
              MARCOS HISTÓRICOS &middot; 1906 A HOJE
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-white font-light">
              Cronologia da Descoberta
            </h3>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Horizontal line for desktop */}
            <div
              className="absolute top-3 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400/20 via-amber-400/40 to-amber-400/20 hidden lg:block"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5 relative z-10">
              {TIMELINE_EVENTS.map((event, i) => (
                <div
                  key={i}
                  className="timeline-item flex flex-col items-start lg:items-center text-left lg:text-center p-5 sm:p-5 rounded-2xl bg-white/[0.02] lg:bg-transparent border border-white/6 lg:border-none"
                >
                  <div className="w-7 h-7 rounded-full border border-amber-400/50 bg-[#060504] flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0 shadow-[0_0_12px_rgba(251,191,36,0.2)]">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white mb-1">
                    {event.year}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-2 font-medium">
                    {event.label}
                  </span>
                  <p className="text-sm text-white/70 font-sans font-light leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCENE: AUTORES DA PESQUISA
          ================================================================ */}
      <section
        id="autores"
        className="relative w-full py-20 sm:py-28 md:py-32 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/10 bg-gradient-to-b from-[#070605] to-[#040302]"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-[0.35em] uppercase text-amber-400 block mb-3 sm:mb-4">
            CRÉDITOS ACADÊMICOS
          </span>

          <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-light mb-10 sm:mb-14">
            Autores da Pesquisa
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-4xl mb-12 sm:mb-14">
            {AUTHORS.map((author, idx) => (
              <div
                key={idx}
                className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition-all duration-500 text-center shadow-lg"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mx-auto mb-3.5 font-mono text-xs text-white/60 group-hover:border-amber-400/40 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <p className="font-sans text-sm sm:text-base text-white font-medium leading-snug mb-1">
                  {author}
                </p>
                <span className="text-xs font-mono text-amber-300/75 uppercase tracking-wider">
                  Química Orgânica
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs font-mono text-white/35 uppercase tracking-widest">
            COLÉGIO &middot; ENSINO MÉDIO &middot; BIOQUÍMICA &middot; 2026
          </p>
        </div>
      </section>
    </div>
  );
};
