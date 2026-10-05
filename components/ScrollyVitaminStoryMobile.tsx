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

interface ScrollyVitaminStoryMobileProps {
  vitamin: VitaminData;
  index: number;
}

export const ScrollyVitaminStoryMobile: React.FC<ScrollyVitaminStoryMobileProps> = ({
  vitamin,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const moleculeWrapperRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = React.useState<boolean>(false);

  // Text beats refs
  const beatNameRef = useRef<HTMLDivElement>(null);
  const beatGroupRef = useRef<HTMLDivElement>(null);
  const beatFunctionRef = useRef<HTMLDivElement>(null);
  const beatDeficiencyRef = useRef<HTMLDivElement>(null);
  const beatSourcesRef = useRef<HTMLDivElement>(null);

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
    if (!containerRef.current || !moleculeWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      // BEAT 0: Title is active
      tl.fromTo(
        moleculeWrapperRef.current,
        { scale: 0.8, opacity: 0.4 },
        { scale: 1, opacity: 1, ease: "power2.out", duration: 0.12 },
        0
      );

      tl.to(
        beatNameRef.current,
        { opacity: 0, y: -20, ease: "power2.inOut", duration: 0.05 },
        0.12
      );

      // BEAT 1: GRUPOS FUNCIONAIS + 2D MODEL (0.16 -> 0.36)
      tl.fromTo(
        beatGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.16
      );

      tl.to(
        beatGroupRef.current,
        { opacity: 0, y: -15, ease: "power2.in", duration: 0.05 },
        0.35
      );

      // BEAT 2: FUNÇÃO BIOLÓGICA (0.38 -> 0.58)
      tl.fromTo(
        beatFunctionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.38
      );

      tl.to(
        beatFunctionRef.current,
        { opacity: 0, y: -15, ease: "power2.in", duration: 0.05 },
        0.57
      );

      // BEAT 3: DEFICIÊNCIA (0.60 -> 0.78)
      tl.fromTo(
        beatDeficiencyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.60
      );

      tl.to(
        beatDeficiencyRef.current,
        { opacity: 0, y: -15, ease: "power2.in", duration: 0.05 },
        0.77
      );

      // BEAT 4: FONTES BIOLÓGICAS (0.80 -> 0.94)
      tl.fromTo(
        beatSourcesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.07 },
        0.80
      );

      tl.to(
        beatSourcesRef.current,
        { opacity: 0, y: -15, ease: "power2.in", duration: 0.05 },
        0.93
      );

      // BEAT 5: TRANSIÇÃO
      tl.to(
        moleculeWrapperRef.current,
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
  }, []);

  return (
    <article
      ref={containerRef}
      id={vitamin.id}
      className="relative w-full h-[300vh] bg-[#060504] text-[#f5efe6]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
    >
      {/* Sticky Mobile/Tablet Stage: Responsive Vertical Split */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-20 sm:pt-20 pb-20 sm:pb-24 gap-3 sm:gap-6 max-w-3xl mx-auto">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle, ${vitamin.accentColor}25 0%, transparent 70%)`,
          }}
        />

        {/* TOP BAR: Metadata */}
        <div className="w-full flex items-center justify-between text-xs sm:text-xs font-mono tracking-wider uppercase text-white/60 z-30 pt-1">
          <span>CAPÍTULO {vitamin.number}</span>
          <span style={{ color: accentColor }}>{vitamin.classification.toUpperCase()}</span>
          <span>CID {vitamin.pubchemCid}</span>
        </div>

        {/* SECTION 1: DEDICATED 3D MOLECULE STAGE */}
        <div
          ref={moleculeWrapperRef}
          className="w-full h-[30vh] sm:h-[34vh] flex items-center justify-center relative z-10 pointer-events-auto"
        >
          {isNearViewport ? (
            <MoleculeViewer
              vitamin={vitamin}
              className="w-full h-full max-w-[280px] sm:max-w-[380px]"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        {/* SECTION 2: DEDICATED NARRATIVE TEXT STAGE */}
        <div className="w-full h-[60vh] sm:h-[56vh] relative z-20 flex flex-col justify-center">
          {/* BEAT 0: NOME & IDENTIDADE QUÍMICA */}
          <div
            ref={beatNameRef}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 pointer-events-none"
          >
            <span
              className="text-xs sm:text-sm font-mono tracking-[0.35em] uppercase mb-1.5 sm:mb-2.5 font-medium"
              style={{ color: accentColor }}
            >
              VITAMINA {vitamin.letter}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-tight leading-none break-words">
              {vitamin.name}
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-white/80 font-light mt-1.5 sm:mt-2.5">
              {vitamin.chemicalName}
            </p>
            <div className="mt-3 sm:mt-4 flex items-center space-x-3.5 font-mono text-sm sm:text-sm text-white/60 tracking-wider">
              <span>{vitamin.formula}</span>
              <span>&middot;</span>
              <span>{vitamin.molecularWeight}</span>
            </div>
            <div className="mt-4 sm:mt-5 text-xs sm:text-xs font-mono tracking-widest uppercase text-white/50">
              ROLE PARA EXPLORAR
            </div>
          </div>

          {/* BEAT 1: GRUPOS FUNCIONAIS + MODELO 2D */}
          <div
            ref={beatGroupRef}
            className="absolute inset-0 flex flex-col justify-center space-y-2.5 sm:space-y-3 px-2 sm:px-4 text-left opacity-0 pointer-events-none"
          >
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white/60 block font-medium">
              01 &middot; ARQUITETURA QUÍMICA
            </span>

            <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight">
              Grupos Funcionais
            </h3>

            {/* Badges de Grupos Funcionais */}
            <div className="flex flex-wrap gap-2 py-0.5">
              {vitamin.functionalGroups.map((group, i) => (
                <span key={i} className="pill-badge">
                  {group}
                </span>
              ))}
            </div>

            {/* MODELO 2D: Integrado junto dos grupos funcionais */}
            <div className="py-1">
              <div className="w-full max-w-[220px] sm:max-w-[280px] text-white/90">
                <span className="text-xs sm:text-xs font-mono uppercase tracking-widest text-white/60 block mb-1">
                  Fórmula Estrutural Plana (2D)
                </span>
                <ChemicalSkeletalSvg
                  type={vitamin.chemicalSvgType}
                  className="w-full h-auto max-h-[11vh] sm:max-h-[14vh]"
                />
              </div>
            </div>

            {vitamin.functionalGroupNote && (
              <p className="text-sm sm:text-sm text-white/70 font-sans leading-relaxed">
                {vitamin.functionalGroupNote}
              </p>
            )}

            {vitamin.derivationOrSynthesis && (
              <div className="text-sm sm:text-sm font-mono text-white/80 tracking-wider">
                <span style={{ color: accentColor }}>✦ Origem: </span>
                {vitamin.derivationOrSynthesis}
              </div>
            )}
          </div>

          {/* BEAT 2: FUNÇÃO BIOLÓGICA */}
          <div
            ref={beatFunctionRef}
            className="absolute inset-0 flex flex-col justify-center space-y-2.5 sm:space-y-3.5 px-2 sm:px-4 text-left opacity-0 pointer-events-none"
          >
            <span
              className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase block font-medium"
              style={{ color: accentColor }}
            >
              02 &middot; AÇÃO NO ORGANISMO
            </span>

            <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-light text-white uppercase tracking-tight leading-none">
              Função Biológica
            </h3>

            <div className="space-y-2 sm:space-y-2.5 pt-1">
              {vitamin.functions.map((fn, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-base md:text-lg text-white/90 font-sans font-light leading-relaxed border-l-2 pl-3 sm:pl-3.5"
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
            className="absolute inset-0 flex flex-col justify-center space-y-2.5 sm:space-y-3.5 px-2 sm:px-4 text-left opacity-0 pointer-events-none"
          >
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-red-400 block font-medium">
              03 &middot; AVITAMINOSE & DEFICIÊNCIA
            </span>

            <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-light text-white uppercase tracking-tight leading-none">
              Manifestações Clínicas
            </h3>

            {vitamin.avitaminosis.description && (
              <p className="text-sm sm:text-sm font-mono text-white/70 leading-relaxed uppercase tracking-wider">
                {vitamin.avitaminosis.description}
              </p>
            )}

            <div className="space-y-2 sm:space-y-2.5 pt-1">
              {vitamin.avitaminosis.symptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-baseline space-x-2.5">
                  <span className="text-red-400 font-mono text-sm">✕</span>
                  <p className="text-base sm:text-base text-white/90 font-sans font-light leading-relaxed">
                    {symptom}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BEAT 4: FONTES BIOLÓGICAS */}
          <div
            ref={beatSourcesRef}
            className="absolute inset-0 flex flex-col justify-center space-y-2.5 sm:space-y-3.5 px-2 sm:px-4 text-left opacity-0 pointer-events-none"
          >
            <span
              className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase block font-medium"
              style={{ color: accentColor }}
            >
              04 &middot; ONDE ENCONTRAR
            </span>

            <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-light text-white uppercase tracking-tight leading-none">
              Fontes Naturais
            </h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {vitamin.sources.map((source, i) => (
                <span
                  key={i}
                  className="font-editorial text-xl sm:text-2xl font-light text-white/95 border-b border-white/20 pb-0.5 px-1.5"
                >
                  {source}
                </span>
              ))}
            </div>

            <p className="pt-2 text-sm sm:text-sm font-mono text-white/60 tracking-wider">
              A ingestão balanceada previne distúrbios metabólicos
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
