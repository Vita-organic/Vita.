"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VitaminData } from "@/data/vitamins";
import { MoleculeViewer } from "./MoleculeViewer";
import { ChemicalSkeletalSvg } from "./ChemicalSkeletalSvg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollyVitaminStoryDesktopProps {
  vitamin: VitaminData;
  index: number;
}

export const ScrollyVitaminStoryDesktop: React.FC<ScrollyVitaminStoryDesktopProps> = ({
  vitamin,
  index,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const moleculeColRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = React.useState<boolean>(false);

  // Text beats refs
  const beatNameRef = useRef<HTMLDivElement>(null);
  const beatGroupRef = useRef<HTMLDivElement>(null);
  const beatFunctionRef = useRef<HTMLDivElement>(null);
  const beatDeficiencyRef = useRef<HTMLDivElement>(null);
  const beatSourcesRef = useRef<HTMLDivElement>(null);

  // Alternating layout:
  // Even vitamins (0, 2, 4...): Molecule moves to Right (+25vw) | Text on Left (0 to 50vw)
  // Odd vitamins (1, 3, 5...):  Molecule moves to Left (-25vw)  | Text on Right (50vw to 100vw)
  const isAltLayout = index % 2 === 1;
  const isLipo = vitamin.classification === "lipossolúvel";
  const accentColor = isLipo ? "#e8a830" : "#52a5ff";

  // Virtualization
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsNearViewport(entry.isIntersecting);
        });
      },
      { rootMargin: "1000px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !moleculeColRef.current) return;

    const ctx = gsap.context(() => {
      // In Beat 0, molecule starts centered (x = 0), then glides to its side (+25vw or -25vw)
      const targetX = isAltLayout ? "-25vw" : "25vw";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      // BEAT 0: Molecule starts dead center (x = 0) with grand title
      tl.fromTo(
        moleculeColRef.current,
        { x: 0, scale: 0.0, opacity: 0.0 },
        { x: 0, scale: 1.0, opacity: 1, ease: "power2.out", duration: 0.12 },
        0
      );

      tl.to(
        beatNameRef.current,
        { opacity: 0, y: -30, ease: "power2.inOut", duration: 0.05 },
        0.12
      );

      // GLIDE TO DEDICATED SIDE: Molecule moves from center (x: 0) to its side (+25vw or -25vw)
      tl.to(
        moleculeColRef.current,
        {
          x: targetX,
          scale: 1,
          ease: "power3.inOut",
          duration: 0.08,
        },
        0.14
      );

      // BEAT 1: GRUPOS FUNCIONAIS + 2D MODEL (0.17 -> 0.38)
      tl.fromTo(
        beatGroupRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.17
      );

      tl.to(
        beatGroupRef.current,
        { opacity: 0, y: -25, ease: "power2.in", duration: 0.05 },
        0.36
      );

      // BEAT 2: FUNÇÃO BIOLÓGICA (0.38 -> 0.60)
      tl.fromTo(
        beatFunctionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.39
      );

      tl.to(
        beatFunctionRef.current,
        { opacity: 0, y: -25, ease: "power2.in", duration: 0.05 },
        0.58
      );

      // BEAT 3: DEFICIÊNCIA (0.60 -> 0.80)
      tl.fromTo(
        beatDeficiencyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.61
      );

      tl.to(
        beatDeficiencyRef.current,
        { opacity: 0, y: -25, ease: "power2.in", duration: 0.05 },
        0.78
      );

      // BEAT 4: FONTES NATURAIS (0.80 -> 0.94)
      tl.fromTo(
        beatSourcesRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.81
      );

      tl.to(
        beatSourcesRef.current,
        { opacity: 0, y: -25, ease: "power2.in", duration: 0.05 },
        0.93
      );

      // BEAT 5: TRANSIÇÃO
      tl.to(
        moleculeColRef.current,
        {
          scale: 0.6,
          opacity: 0,
          ease: "power2.in",
          duration: 0.05,
        },
        0.94
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isAltLayout]);

  return (
    <article
      ref={containerRef}
      id={vitamin.id}
      className="relative w-full h-[300vh] bg-[#060504] text-[#f5efe6]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle, ${vitamin.accentColor}25 0%, transparent 70%)`,
          }}
        />

        {/* ====================================================================
            3D MOLECULE THEATER
            Starts at dead center (x = 0).
            On scroll, glides smoothly to +25vw or -25vw into its designated half.
            ==================================================================== */}
        {/* ====================================================================
            3D MOLECULE THEATER
            Starts at dead center (x = 0).
            On scroll, glides smoothly to +25vw or -25vw into its designated half.
            ==================================================================== */}
        <div
          ref={moleculeColRef}
          className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] xl:w-[540px] xl:h-[540px] flex items-center justify-center pointer-events-auto"
        >
          {isNearViewport ? (
            <MoleculeViewer vitamin={vitamin} />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        {/* ====================================================================
            EDITORIAL TEXT COLUMN (100% Symmetrical on both Left and Right)
            If isAltLayout: Placed on Right half (left-1/2 w-1/2)
            If not:         Placed on Left half  (left-0 w-1/2)
            Both sides use identical padding and max-w-xl!
            ==================================================================== */}
        <div
          className={`absolute top-0 bottom-0 w-1/2 z-20 flex items-center justify-center px-6 sm:px-8 lg:px-12 xl:px-20 ${isAltLayout ? "right-0" : "left-0"
            }`}
        >
          <div className="w-full max-w-xl relative flex flex-col justify-center text-left">
            {/* BEAT 1: GRUPOS FUNCIONAIS + MODELO 2D */}
            <div
              ref={beatGroupRef}
              className="w-full flex flex-col space-y-3 lg:space-y-4 opacity-0 pointer-events-none"
            >
              <span className="text-[11px] lg:text-xs font-mono tracking-[0.3em] uppercase text-white/40 block">
                01 &middot; ARQUITETURA QUÍMICA
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-light text-white leading-tight">
                Grupos Funcionais
              </h3>

              {/* Functional Group Badges */}
              <div className="flex flex-wrap gap-2 py-0.5 sm:py-1">
                {vitamin.functionalGroups.map((group, i) => (
                  <span key={i} className="pill-badge">
                    {group}
                  </span>
                ))}
              </div>

              {/* MODELO 2D: Integrado junto dos grupos funcionais */}
              <div className="py-1.5 sm:py-2">
                <div className="w-full max-w-sm text-white/90">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                    Fórmula Estrutural Plana (2D)
                  </span>
                  <ChemicalSkeletalSvg
                    type={vitamin.chemicalSvgType}
                    className="w-full h-auto max-h-[18vh] lg:max-h-[20vh]"
                  />
                </div>
              </div>

              {vitamin.functionalGroupNote && (
                <p className="text-xs text-white/50 font-sans leading-relaxed max-w-md">
                  {vitamin.functionalGroupNote}
                </p>
              )}

              {vitamin.derivationOrSynthesis && (
                <div className="text-[11px] lg:text-xs font-mono text-white/60 tracking-wider">
                  <span style={{ color: accentColor }}>✦ Origem: </span>
                  {vitamin.derivationOrSynthesis}
                </div>
              )}
            </div>

            {/* BEAT 2: FUNÇÃO BIOLÓGICA */}
            <div
              ref={beatFunctionRef}
              className="w-full absolute inset-0 flex flex-col justify-center space-y-3.5 lg:space-y-5 opacity-0 pointer-events-none"
            >
              <span
                className="text-[11px] lg:text-xs font-mono tracking-[0.3em] uppercase block"
                style={{ color: accentColor }}
              >
                02 &middot; AÇÃO NO ORGANISMO
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-light text-white uppercase tracking-tight leading-none">
                Função Biológica
              </h3>

              <div className="space-y-3 lg:space-y-4 pt-1.5 sm:pt-2">
                {vitamin.functions.map((fn, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base lg:text-base xl:text-lg text-white/80 font-sans font-light leading-relaxed border-l-2 pl-3 sm:pl-4"
                    style={{ borderLeftColor: accentColor }}
                  >
                    {fn}
                  </p>
                ))}
              </div>
            </div>

            {/* BEAT 3: DEFICIÊNCIA (AVITAMINOSE) */}
            <div
              ref={beatDeficiencyRef}
              className="w-full absolute inset-0 flex flex-col justify-center space-y-3 lg:space-y-4 opacity-0 pointer-events-none"
            >
              <span className="text-[11px] lg:text-xs font-mono tracking-[0.3em] uppercase text-red-400/90 block">
                03 &middot; AVITAMINOSE & DEFICIÊNCIA
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-light text-white uppercase tracking-tight leading-none">
                Manifestações Clínicas
              </h3>

              {vitamin.avitaminosis.description && (
                <p className="text-[11px] lg:text-xs font-mono text-white/50 leading-relaxed uppercase tracking-wider">
                  {vitamin.avitaminosis.description}
                </p>
              )}

              <div className="space-y-2 lg:space-y-2.5 pt-1.5 sm:pt-2">
                {vitamin.avitaminosis.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-baseline space-x-2.5 sm:space-x-3">
                    <span className="text-red-400 font-mono text-xs">✕</span>
                    <p className="text-sm sm:text-base text-white/85 font-sans font-light leading-relaxed">
                      {symptom}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BEAT 4: FONTES BIOLÓGICAS (Alinhado à lateral) */}
            <div
              ref={beatSourcesRef}
              className="w-full absolute inset-0 flex flex-col justify-center space-y-3.5 lg:space-y-4 opacity-0 pointer-events-none"
            >
              <span
                className="text-[11px] lg:text-xs font-mono tracking-[0.3em] uppercase block"
                style={{ color: accentColor }}
              >
                04 &middot; ONDE ENCONTRAR
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-light text-white uppercase tracking-tight leading-none">
                Fontes Naturais
              </h3>

              <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-1.5 sm:pt-2">
                {vitamin.sources.map((source, i) => (
                  <span
                    key={i}
                    className="font-editorial text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-white/90 border-b border-white/15 pb-1 px-1 sm:px-1.5"
                  >
                    {source}
                  </span>
                ))}
              </div>

              <p className="pt-2 sm:pt-3 text-[11px] sm:text-xs font-mono text-white/40 uppercase tracking-widest">
                A ingestão balanceada previne distúrbios metabólicos
              </p>
            </div>
          </div>
        </div>

        {/* BEAT 0: NOME & IDENTIDADE QUÍMICA (Overlay inicial abrangente) */}
        <div
          ref={beatNameRef}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-16 text-center"
        >
          {/* Top metadata tag */}
          <div className="w-full flex items-center justify-between text-[11px] lg:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/40">
            <span>CAPÍTULO {vitamin.number}</span>
            <span style={{ color: accentColor }}>{vitamin.classification.toUpperCase()}</span>
            <span>CID {vitamin.pubchemCid}</span>
          </div>

          {/* Monumental Title */}
          <div className="my-auto flex flex-col items-center">
            <span
              className="text-xs sm:text-sm font-mono tracking-[0.35em] uppercase mb-2 sm:mb-4"
              style={{ color: accentColor }}
            >
              VITAMINA {vitamin.letter}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light text-white uppercase tracking-tight leading-none break-words">
              {vitamin.name}
            </h2>
            <p className="font-serif italic text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/70 font-light mt-2 sm:mt-4">
              {vitamin.chemicalName}
            </p>
            <div className="mt-3 sm:mt-5 flex items-center space-x-3 sm:space-x-4 font-mono text-xs sm:text-sm text-white/40 tracking-wider">
              <span>{vitamin.formula}</span>
              <span>&middot;</span>
              <span>{vitamin.molecularWeight}</span>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="w-full text-center text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-white/30">
            ROLE PARA EXPLORAR A ESTRUTURA
          </div>
        </div>
      </div>
    </article>
  );
};
