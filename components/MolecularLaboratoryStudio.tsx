"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VITAMINS_DATA, VitaminData } from "@/data/vitamins";
import { MoleculeViewer } from "./MoleculeViewer";
import { ChemicalSkeletalSvg } from "./ChemicalSkeletalSvg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MolecularLaboratoryStudioProps {
  selectedVitamin?: VitaminData;
  onVitaminChange?: (vitamin: VitaminData) => void;
}

// Normalised molecular weight for bar charts (max ~1355 g/mol for B12)
const MAX_MW = 1355;

function parseMW(mw: string): number {
  return parseFloat(mw.replace(" g/mol", "").replace(",", ".")) || 0;
}

// Complexity score based on total atoms (relative to B12 which has the most)
const MAX_ATOMS = 180; // B12 has ~180 atoms including all

export const MolecularLaboratoryStudio: React.FC<MolecularLaboratoryStudioProps> = ({
  selectedVitamin: externalSelectedVitamin,
  onVitaminChange,
}) => {
  const [internalVitamin, setInternalVitamin] = useState<VitaminData>(VITAMINS_DATA[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const prevVitaminRef = useRef<string>("");

  const activeVitamin = externalSelectedVitamin || internalVitamin;

  const handleSelect = (v: VitaminData) => {
    setInternalVitamin(v);
    if (onVitaminChange) onVitaminChange(v);
  };

  // Animate progress bars when vitamin changes
  useEffect(() => {
    if (!barsContainerRef.current) return;
    if (prevVitaminRef.current === activeVitamin.id) return;
    prevVitaminRef.current = activeVitamin.id;

    const bars = barsContainerRef.current.querySelectorAll<HTMLElement>(".progress-fill");
    bars.forEach((bar) => {
      const target = parseFloat(bar.dataset.target || "0");
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: target,
          duration: 0.8,
          ease: "power3.out",
          transformOrigin: "left center",
        }
      );
    });

    // Fade in info panel
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0.3, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }
  }, [activeVitamin.id]);

  // Scroll trigger reveal on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          end: "top 50%",
          scrub: 0.9,
        },
        y: 60,
        opacity: 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isLipo = activeVitamin.classification === "lipossolúvel";
  const mwValue = parseMW(activeVitamin.molecularWeight);
  const mwPercent = Math.min(mwValue / MAX_MW, 1);
  const atomsPercent = Math.min(activeVitamin.totalAtoms / MAX_ATOMS, 1);

  // Element percentages relative to total atoms
  const elementData = Object.entries(activeVitamin.elementCounts)
    .filter(([, v]) => v)
    .map(([el, count]) => ({
      el,
      count: count as number,
      percent: count / activeVitamin.totalAtoms,
    }));

  const ELEMENT_COLORS: Record<string, string> = {
    C: "#6b7280",   // Carbon — Graphite
    H: "#d1c9bc",   // Hydrogen — Ivory
    O: "#d63031",   // Oxygen — Ruby
    N: "#0984e3",   // Nitrogen — Sapphire
    S: "#fdcb6e",   // Sulfur — Canary
    P: "#e67e22",   // Phosphorus — Amber
    Co: "#8e44ad",  // Cobalt — Amethyst
    Cl: "#22d3ee",  // Chlorine — Cyan
  };

  return (
    <section
      ref={containerRef}
      id="estudio-3d"
      className="relative w-full bg-[#060504] border-t border-white/10 overflow-hidden text-[#f7f2ea]"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full blur-[220px] opacity-[0.07] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeVitamin.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24 md:py-32 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-white/8">
          <div>
            <span className="text-xs font-mono tracking-[0.35em] uppercase text-amber-300 block mb-2">
              LABORATÓRIO MOLECULAR 3D
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-white">
              Arquivo Molecular
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
            BALL & STICK · INTERATIVO · 60 FPS
          </span>
        </div>

        {/* Vitamin selector ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 scrollbar-none -mx-1 px-1">
          {VITAMINS_DATA.map((v) => {
            const isSelected = activeVitamin.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => handleSelect(v)}
                className={`flex-none flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-mono transition-all duration-300 border cursor-pointer ${isSelected
                    ? "bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.03]"
                    : "bg-transparent text-white/45 border-white/8 hover:border-white/25 hover:text-white/80"
                  }`}
              >
                <span className="text-xs opacity-60 font-normal">
                  {v.number}
                </span>
                <span className="font-editorial text-sm font-medium">{v.letter}</span>
              </button>
            );
          })}
        </div>

        {/* Main studio grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 sm:gap-8 xl:gap-10 items-start">

          {/* ============================================================
              LEFT: 3D Viewer + 2D Diagram
              ============================================================ */}
          <div className="space-y-4 sm:space-y-5">
            {/* 3D Viewer */}
            <div className="rounded-3xl overflow-hidden border border-white/8 bg-[#0a0908]">
              <MoleculeViewer
                vitamin={activeVitamin}
                className="w-full h-[320px] sm:h-[420px] md:h-[500px]"
              />
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-white/6 text-xs font-mono text-white/40">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Arraste para orbitar 360°
                </span>
                <span className="uppercase tracking-widest text-[10px] sm:text-xs">GEOMETRIA OPTIMIZADA</span>
              </div>
            </div>

            {/* 2D Skeletal + Atom composition bar chart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* 2D Skeletal */}
              <div className="p-5 sm:p-6 rounded-2xl border border-white/8 bg-[#0a0908]">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                  ESTRUTURA PLANA (2D)
                </span>
                <div className="h-24 sm:h-28 flex items-center justify-center text-amber-200/90">
                  <ChemicalSkeletalSvg
                    type={activeVitamin.chemicalSvgType}
                    className="max-h-20 sm:max-h-24 max-w-full drop-shadow"
                  />
                </div>
              </div>

              {/* Atom % bar chart */}
              <div ref={barsContainerRef} className="p-5 sm:p-6 rounded-2xl border border-white/8 bg-[#0a0908]">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                  COMPOSIÇÃO ATÔMICA (%)
                </span>
                <div className="space-y-2.5 sm:space-y-3">
                  {elementData.map(({ el, count, percent }) => (
                    <div key={el} className="flex items-center gap-2.5 sm:gap-3">
                      <span className="text-xs font-mono text-white/60 w-5 text-right">{el}</span>
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="progress-fill h-full rounded-full"
                          data-target={percent.toFixed(4)}
                          style={{ backgroundColor: ELEMENT_COLORS[el] || "#fff", transform: "scaleX(0)" }}
                        />
                      </div>
                      <span className="text-xs font-mono text-white/40 w-6">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT: Data dossier
              ============================================================ */}
          <div ref={infoRef} className="space-y-4">
            {/* Identity block */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/8 bg-[#0b0a09]">
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${isLipo
                      ? "bg-amber-500/10 border-amber-500/25 text-amber-300"
                      : "bg-blue-500/10 border-blue-500/25 text-blue-300"
                    }`}
                >
                  {activeVitamin.classification}
                </span>
                <span className="text-xs font-mono text-white/30">
                  {activeVitamin.number} / 09
                </span>
              </div>

              <h3 className="font-editorial text-4xl font-light text-white leading-tight mb-1">
                {activeVitamin.name}
              </h3>
              <p className="font-serif italic text-xl text-amber-200/80 font-light mb-5">
                {activeVitamin.chemicalName}
              </p>

              <div className="font-mono text-xl text-white font-semibold tracking-wider mb-5">
                {activeVitamin.formula}
              </div>

              {/* MW + Atoms progress bars */}
              <div className="space-y-4 pt-4 border-t border-white/8">
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/40 mb-1.5">
                    <span>MASSA MOLAR</span>
                    <span>{activeVitamin.molecularWeight}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="progress-fill h-full rounded-full"
                      data-target={mwPercent.toFixed(4)}
                      style={{
                        backgroundColor: activeVitamin.accentColor,
                        transform: "scaleX(0)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/40 mb-1.5">
                    <span>ÁTOMOS TOTAIS</span>
                    <span>{activeVitamin.totalAtoms}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="progress-fill h-full rounded-full"
                      data-target={atomsPercent.toFixed(4)}
                      style={{
                        backgroundColor: activeVitamin.accentColor,
                        opacity: 0.7,
                        transform: "scaleX(0)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stoichiometric atom grid */}
            <div className="p-5 rounded-3xl border border-white/8 bg-[#0b0a09]">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                ESTEQUIOMETRIA
              </span>
              <div className="grid grid-cols-4 gap-2">
                {elementData.map(({ el, count }) => (
                  <div
                    key={el}
                    className="flex flex-col items-center p-2.5 rounded-xl border border-white/6 bg-white/[0.02]"
                  >
                    <span
                      className="text-xs font-mono font-semibold"
                      style={{ color: ELEMENT_COLORS[el] || "#fff" }}
                    >
                      {el}
                    </span>
                    <span className="text-base font-mono text-white/90 font-light mt-0.5">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Functional groups */}
            <div className="p-5 rounded-3xl border border-white/8 bg-[#0b0a09]">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                GRUPOS FUNCIONAIS
              </span>
              <div className="flex flex-wrap gap-2">
                {activeVitamin.functionalGroups.map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium uppercase tracking-wider border"
                    style={{
                      borderColor: `${activeVitamin.accentColor}40`,
                      backgroundColor: `${activeVitamin.accentColor}10`,
                      color: activeVitamin.accentColor,
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>
              {activeVitamin.functionalGroupNote && (
                <p className="text-sm font-sans italic text-white/50 mt-3 leading-relaxed">
                  {activeVitamin.functionalGroupNote}
                </p>
              )}
            </div>

            {/* Key functions */}
            <div className="p-5 rounded-3xl border border-white/8 bg-[#0b0a09]">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                FUNÇÕES BIOLÓGICAS
              </span>
              <ul className="space-y-2.5">
                {activeVitamin.functions.map((func, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="text-xs mt-0.5 flex-shrink-0"
                      style={{ color: activeVitamin.accentColor }}
                    >
                      ›
                    </span>
                    <span className="text-sm text-white/75 font-sans font-light leading-relaxed">
                      {func}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dietary sources */}
            <div className="p-5 rounded-3xl border border-white/8 bg-[#0b0a09]">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                FONTES ALIMENTARES
              </span>
              <div className="flex flex-wrap gap-2">
                {activeVitamin.sources.map((src, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-sm font-sans text-white/75 border border-white/8 bg-white/[0.03]"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
