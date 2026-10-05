"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollyWhatIsAVitamin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beatsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      beatsRef.current.forEach((beat) => {
        if (!beat) return;
        gsap.from(beat.children, {
          scrollTrigger: {
            trigger: beat,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.8,
          },
          y: 60,
          opacity: 0,
          stagger: 0.15,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="definicao"
      className="relative w-full bg-[#060504] text-[#f5efe6] overflow-hidden"
    >
      {/* Subtle Ambient Depth Lighting */}
      <div
        className="ambient-glow w-[800px] h-[600px] top-1/4"
        style={{
          background: "radial-gradient(circle, rgba(232, 168, 48, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* ====================================================================
          MOMENT 1: O CONCEITO FUNDAMENTAL
          ==================================================================== */}
      <div
        ref={(el) => { beatsRef.current[0] = el; }}
        className="min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 max-w-7xl mx-auto py-20 sm:py-28 lg:py-32"
      >
        <span className="eyebrow-scientific text-[#e8a830] mb-6 sm:mb-8 font-medium">
          01 &middot; O CONCEITO FUNDAMENTAL
        </span>

        <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.08] tracking-tight max-w-5xl mb-6 sm:mb-10">
          Vitaminas são compostos orgânicos indispensáveis ao funcionamento do corpo.
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-sans font-light leading-relaxed max-w-3xl">
          Atuam na manutenção celular e na regulação metabólica. Não servem como fonte de calorias ou tecido estrutural — são ativadores químicos cuja ausência paralisa a fisiologia humana.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24">
        <div className="w-full h-[1px] bg-white/[0.06]" />
      </div>

      {/* ====================================================================
          MOMENT 2: POR QUE PRECISAMOS OBTÊ-LAS EXTERNAMENTE?
          ==================================================================== */}
      <div
        ref={(el) => { beatsRef.current[1] = el; }}
        className="min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 max-w-7xl mx-auto py-20 sm:py-28 lg:py-32"
      >
        <span className="eyebrow-scientific text-white/50 mb-6 sm:mb-8 font-medium">
          A DEPENDÊNCIA EXTERNA
        </span>

        <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.08] tracking-tight max-w-5xl mb-6 sm:mb-8">
          O organismo humano <br />
          <span className="italic font-serif text-[#e8a830]/90">
            não é capaz de sintetizá-las
          </span>
          .
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 max-w-5xl mt-4">
          <p className="text-base sm:text-base md:text-lg lg:text-xl text-white/75 font-sans font-light leading-relaxed">
            Ao longo de milhões de anos de evolução, nossas células perderam as vias biossintéticas complexas necessárias para montar essas moléculas, passando a depender da absorção de plantas, animais e microrganismos.
          </p>
          <p className="text-base sm:text-base md:text-lg lg:text-xl text-white/75 font-sans font-light leading-relaxed">
            Por isso, precisam ser ingeridas com regularidade estrita. Sua escassez prolongada na alimentação deflagra doenças debilitantes conhecidas na medicina como <span className="text-white font-normal">avitaminoses</span>.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24">
        <div className="w-full h-[1px] bg-white/[0.06]" />
      </div>

      {/* ====================================================================
          MOMENT 3: COMO ATUAM? COFATORES ENZIMÁTICOS
          ==================================================================== */}
      <div
        ref={(el) => { beatsRef.current[2] = el; }}
        className="min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 max-w-7xl mx-auto py-20 sm:py-28 lg:py-32"
      >
        <span className="eyebrow-scientific text-white/50 mb-6 sm:mb-8 font-medium">
          MECANISMO DE AÇÃO BIOQUÍMICA
        </span>

        <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] tracking-tight uppercase mb-6 sm:mb-8">
          Cofatores <br />
          <span className="italic font-serif text-[#e8a830]/90 normal-case">
            Enzimáticos
          </span>
        </h3>

        <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-sans font-light leading-relaxed max-w-4xl mb-8 sm:mb-12">
          Funcionam como parceiras moleculares indispensáveis que se encaixam no sítio ativo das enzimas, permitindo que elas acelerem e realizem milhares de reações químicas por segundo no interior das células.
        </p>

        {/* Minimalist Typographic Scale Indicator */}
        <div className="flex flex-wrap items-baseline gap-8 sm:gap-16 pt-6 border-t border-white/[0.06]">
          <div>
            <span className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-white block">
              13
            </span>
            <span className="text-xs sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/50">
              Vitaminas Essenciais
            </span>
          </div>

          <div>
            <span className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#e8a830] block">
              mg &middot; &mu;g
            </span>
            <span className="text-xs sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/50">
              Escala de Ação Celular
            </span>
          </div>

          <div>
            <span className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-white block">
              0 kcal
            </span>
            <span className="text-xs sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/50">
              Sem Calorias Diretas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
