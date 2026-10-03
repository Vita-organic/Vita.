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
    desc: "Frederick Hopkins demonstra que fatores alimentares desconhecidos são indispensáveis à sobrevivência celular.",
  },
  {
    year: "1912",
    label: "Nomenclatura",
    desc: "Casimir Funk cunha o termo 'Vitamina' — derivado do latim vita (vida) e amina.",
  },
  {
    year: "1920–30",
    label: "Isolamento",
    desc: "As estruturas das vitaminas A, B, C e D são isoladas e elucidadas quimicamente.",
  },
  {
    year: "1940s",
    label: "Síntese Química",
    desc: "Primeiras sínteses artificiais em escala laboratorial permitem suplementação médica preventiva.",
  },
  {
    year: "Século XXI",
    label: "Mapeamento Quântico",
    desc: "Modelagem atômica 3D e caracterização conformacional de receptores enzimáticos em resolução atômica.",
  },
];

const AUTHORS = [
  "Lucas da Silva Lemos - Dev",
  "Pedro Arthur Batista Carvalho",
  "João Bernardo de Araujo Resende",
  "Orlando Olegario Favaro",
  "Caua Paiva de Almeida",
  "Rakel Marques Leite",
];

export const EditorialClosingCta: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const authorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      [
        { ref: timelineRef.current, y: 35, stagger: 0.12, start: "top 85%", end: "top 45%" },
        { ref: authorsRef.current, y: 30, stagger: 0.1, start: "top 85%", end: "top 50%" },
      ].forEach(({ ref, y, stagger, start, end }) => {
        if (!ref) return;
        gsap.from(ref.children, {
          scrollTrigger: {
            trigger: ref,
            start,
            end,
            scrub: 0.8,
          },
          y,
          opacity: 0,
          stagger,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#060504] text-[#f5efe6] overflow-hidden">

      {/* ====================================================================
          SECTION 2: CRONOLOGIA DA DESCOBERTA (HISTORICAL TIMELINE)
          ==================================================================== */}
      <section
        id="cronologia"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-[0.35em] uppercase text-white/40 mb-3 block">
              MARCOS HISTÓRICOS
            </span>
            <h3 className="font-editorial text-4xl sm:text-5xl font-light text-white">
              Evolução da Ciência das Vitaminas
            </h3>
          </div>

          <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 pt-8 border-t border-white/[0.06]">
            {TIMELINE_EVENTS.map((event, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <span className="font-editorial text-3xl sm:text-4xl font-light text-[#e8a830]">
                  {event.year}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                  {event.label}
                </span>
                <p className="text-xs sm:text-sm text-white/50 font-sans font-light leading-relaxed">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: AUTORES DA PESQUISA (EDITORIAL ACADEMIC ROSTER)
          ==================================================================== */}
      <section
        id="autores"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/[0.06]">
            <div>
              <span className="text-xs font-mono tracking-[0.35em] uppercase text-white/40 mb-3 block">
                CRÉDITOS ACADÊMICOS
              </span>
              <h3 className="font-editorial text-4xl sm:text-5xl font-light text-white">
                Autores da Pesquisa
              </h3>
            </div>

            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
              TRABALHO DE QUÍMICA ORGÂNICA &middot; 2026
            </p>
          </div>

          <div
            ref={authorsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
          >
            {AUTHORS.map((author, idx) => (
              <div key={idx} className="flex items-baseline space-x-4 pb-4 border-b border-white/[0.04]">
                <span className="font-mono text-xs text-[#e8a830]/80">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="font-sans text-base sm:text-lg text-white font-normal leading-snug">
                    {author}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
