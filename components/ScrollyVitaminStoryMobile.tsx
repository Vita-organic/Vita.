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
      { rootMargin: "350px 0px" }
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
        { scale: 1.0, opacity: 1, ease: "power2.out", duration: 0.12 },
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
      {/* Sticky Mobile Stage: Strict Vertical Split (Top 36vh Molecule / Bottom 58vh Text) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between px-4 pt-3 pb-4">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle, ${vitamin.accentColor}25 0%, transparent 70%)`,
          }}
        />

        {/* TOP BAR: Metadata */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-white/40 z-30 pt-1">
          <span>CAPÍTULO {vitamin.number}</span>
          <span style={{ color: accentColor }}>{vitamin.classification.toUpperCase()}</span>
          <span>CID {vitamin.pubchemCid}</span>
        </div>

        {/* SECTION 1: DEDICATED 3D MOLECULE STAGE (Strictly fixed in upper 36vh) */}
        <div
          ref={moleculeWrapperRef}
          className="w-full h-[36vh] flex items-center justify-center relative z-10 pointer-events-auto"
        >
          {isNearViewport ? (
            <MoleculeViewer
              vitamin={vitamin}
              className="w-full h-full max-w-[340px]"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        {/* SECTION 2: DEDICATED NARRATIVE TEXT STAGE (Strictly positioned below 3D molecule in lower 56vh) */}
        <div className="w-full h-[54vh] relative z-20 flex flex-col justify-center">
          {/* BEAT 0: NOME & IDENTIDADE QUÍMICA */}
          <div
            ref={beatNameRef}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 pointer-events-none"
          >
            <span
              className="text-[11px] font-mono tracking-[0.35em] uppercase mb-1.5"
              style={{ color: accentColor }}
            >
              VITAMINA {vitamin.letter}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light text-white uppercase tracking-tight leading-none">
              {vitamin.name}
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-white/70 font-light mt-1.5">
              {vitamin.chemicalName}
            </p>
            <div className="mt-3 flex items-center space-x-3 font-mono text-xs text-white/40 tracking-wider">
              <span>{vitamin.formula}</span>
              <span>&middot;</span>
              <span>{vitamin.molecularWeight}</span>
            </div>
            <div className="mt-4 text-[9px] font-mono tracking-widest uppercase text-white/30">
              ROLE PARA EXPLORAR
            </div>
          </div>

          {/* BEAT 1: GRUPOS FUNCIONAIS + MODELO 2D (Juntos abaixo do 3D!) */}
          <div
            ref={beatGroupRef}
            className="absolute inset-0 flex flex-col justify-center space-y-2 px-3 text-left opacity-0 pointer-events-none"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 block">
              01 &middot; ARQUITETURA QUÍMICA
            </span>

            <h3 className="font-editorial text-2xl font-light text-white leading-tight">
              Grupos Funcionais
            </h3>

            {/* Badges de Grupos Funcionais */}
            <div className="flex flex-wrap gap-1.5 py-0.5">
              {vitamin.functionalGroups.map((group, i) => (
                <span key={i} className="pill-badge-sm">
                  {group}
                </span>
              ))}
            </div>

            {/* MODELO 2D: Integrado junto dos grupos funcionais */}
            <div className="py-1">
              <div className="w-full max-w-[220px] text-white/90">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-0.5">
                  Fórmula Estrutural Plana (2D)
                </span>
                <ChemicalSkeletalSvg
                  type={vitamin.chemicalSvgType}
                  className="w-full h-auto max-h-[12vh]"
                />
              </div>
            </div>

            {vitamin.functionalGroupNote && (
              <p className="text-[10px] text-white/50 font-sans leading-relaxed">
                {vitamin.functionalGroupNote}
              </p>
            )}

            {vitamin.derivationOrSynthesis && (
              <div className="text-[10px] font-mono text-white/60 tracking-wider">
                <span style={{ color: accentColor }}>✦ Origem: </span>
                {vitamin.derivationOrSynthesis}
              </div>
            )}
          </div>

          {/* BEAT 2: FUNÇÃO BIOLÓGICA */}
          <div
            ref={beatFunctionRef}
            className="absolute inset-0 flex flex-col justify-center space-y-2 px-3 text-left opacity-0 pointer-events-none"
          >
            <span
              className="text-[10px] font-mono tracking-[0.3em] uppercase block"
              style={{ color: accentColor }}
            >
              02 &middot; AÇÃO NO ORGANISMO
            </span>

            <h3 className="font-editorial text-2xl font-light text-white uppercase tracking-tight leading-none">
              Função Biológica
            </h3>

            <div className="space-y-1.5 pt-1">
              {vitamin.functions.map((fn, idx) => (
                <p
                  key={idx}
                  className="text-xs text-white/80 font-sans font-light leading-relaxed border-l-2 pl-2.5"
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
            className="absolute inset-0 flex flex-col justify-center space-y-2 px-3 text-left opacity-0 pointer-events-none"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400/90 block">
              03 &middot; AVITAMINOSE & DEFICIÊNCIA
            </span>

            <h3 className="font-editorial text-2xl font-light text-white uppercase tracking-tight leading-none">
              Manifestações Clínicas
            </h3>

            {vitamin.avitaminosis.description && (
              <p className="text-[10px] font-mono text-white/50 leading-relaxed uppercase tracking-wider">
                {vitamin.avitaminosis.description}
              </p>
            )}

            <div className="space-y-1.5 pt-1">
              {vitamin.avitaminosis.symptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-baseline space-x-2">
                  <span className="text-red-400 font-mono text-[10px]">✕</span>
                  <p className="text-xs text-white/85 font-sans font-light leading-relaxed">
                    {symptom}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BEAT 4: FONTES BIOLÓGICAS */}
          <div
            ref={beatSourcesRef}
            className="absolute inset-0 flex flex-col justify-center space-y-2 px-3 text-left opacity-0 pointer-events-none"
          >
            <span
              className="text-[10px] font-mono tracking-[0.3em] uppercase block"
              style={{ color: accentColor }}
            >
              04 &middot; ONDE ENCONTRAR
            </span>

            <h3 className="font-editorial text-2xl font-light text-white uppercase tracking-tight leading-none">
              Fontes Naturais
            </h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {vitamin.sources.map((source, i) => (
                <span
                  key={i}
                  className="font-editorial text-lg font-light text-white/90 border-b border-white/15 pb-0.5 px-1"
                >
                  {source}
                </span>
              ))}
            </div>

            <p className="pt-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              A ingestão balanceada previne distúrbios metabólicos
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
