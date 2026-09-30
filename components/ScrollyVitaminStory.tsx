"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VitaminData } from "@/data/vitamins";
import { MoleculeViewer } from "./MoleculeViewer";
import { ChemicalSkeletalSvg } from "./ChemicalSkeletalSvg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollyVitaminStoryProps {
  vitamin: VitaminData;
}

type TabKey = "molecula" | "funcoes" | "deficiencia" | "fontes";

const TABS: { key: TabKey; label: string; num: string }[] = [
  { key: "molecula", label: "Estrutura", num: "01" },
  { key: "funcoes", label: "Ação Biológica", num: "02" },
  { key: "deficiencia", label: "Avitaminose", num: "03" },
  { key: "fontes", label: "Nutrição & Fontes", num: "04" },
];

const CPK_COLORS: Record<string, string> = {
  C: "#6b7280",
  H: "#d1c9bc",
  O: "#d63031",
  N: "#0984e3",
  S: "#fdcb6e",
  P: "#e67e22",
  Co: "#8e44ad",
  Cl: "#22d3ee",
};

export const ScrollyVitaminStory: React.FC<ScrollyVitaminStoryProps> = ({ vitamin }) => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabKey>("molecula");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.8,
          },
          y: 40,
          opacity: 0,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (tab: TabKey) => {
    if (tab === activeTab || isTransitioning || !contentRef.current) return;
    setIsTransitioning(true);

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
            onComplete: () => setIsTransitioning(false),
          }
        );
      },
    });
  };

  const isLipo = vitamin.classification === "lipossolúvel";
  const accentText = isLipo ? "text-amber-300" : "text-sky-300";

  return (
    <article
      ref={containerRef}
      id={vitamin.id}
      className="relative w-full bg-[#060504] text-[#f7f2ea] py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Delicate Ambient Tint (Tailored to molecule identity) */}
      <div
        className="absolute top-1/3 right-1/4 w-[750px] h-[750px] rounded-full blur-[260px] opacity-[0.07] pointer-events-none"
        style={{ backgroundColor: vitamin.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        
        {/* ====================================================================
            EDITORIAL HEADER (Bespoke typographic rhythm inspired by studiors.be)
            ==================================================================== */}
        <div ref={headerRef} className="mb-12 sm:mb-16">
          {/* Micro-label tag */}
          <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.3em] uppercase text-white/40 mb-4">
            <span>({vitamin.number})</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: vitamin.accentColor }} />
            <span className={accentText}>{vitamin.classification.toUpperCase()}</span>
            <span className="text-white/20">&middot;</span>
            <span className="text-white/50">{vitamin.letter}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.92] tracking-tight uppercase">
                {vitamin.name}
              </h2>
              <p className="font-serif italic text-2xl sm:text-3xl text-amber-200/85 font-light mt-2 sm:mt-3">
                {vitamin.chemicalName}
              </p>
            </div>

            {/* Derivation or Synthesis note */}
            {vitamin.derivationOrSynthesis && (
              <div className="max-w-md flex items-center space-x-2 text-xs font-mono text-white/50 bg-white/[0.02] border border-white/[0.06] px-4 py-2.5 rounded-xl">
                <span className="text-amber-400">✦</span>
                <span className="leading-relaxed">Origem bioquímica: {vitamin.derivationOrSynthesis}</span>
              </div>
            )}
          </div>
        </div>

        {/* ====================================================================
            MINIMAL EDITORIAL SLIDE NAVIGATION (Like studiors.be & rly)
            ==================================================================== */}
        <div className="flex items-center space-x-4 sm:space-x-8 mb-8 border-b border-white/[0.06] overflow-x-auto scrollbar-none pb-3">
          {TABS.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                className={`group flex items-center space-x-2 py-2 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                  isActive ? "text-white font-medium" : "text-white/40 hover:text-white/80"
                }`}
              >
                <span className="text-[10px] opacity-40 group-hover:opacity-70">{t.num}</span>
                <span>{t.label}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-3 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: vitamin.accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ====================================================================
            CONTENT STAGE (3D + 2D and metrics side-by-side)
            ==================================================================== */}
        <div
          ref={contentRef}
          className="min-h-[420px] transition-all duration-300"
        >
          {/* ---- SLIDE: ESTRUTURA (3D + 2D & MÉTRICAS AO LADO) ---- */}
          {activeTab === "molecula" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Coluna Esquerda: Geometria 3D Interativa (7 cols) */}
              <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#090807] border border-white/[0.08] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] text-xs font-mono text-white/50 bg-white/[0.01]">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: vitamin.accentColor }} />
                    <span className="uppercase tracking-widest text-[11px] text-white/80 font-medium">
                      GEOMETRIA 3D INTERATIVA
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 tracking-wider">
                    ORBITAL ESPACIAL (BALL &amp; STICK)
                  </span>
                </div>

                <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] p-2">
                  <MoleculeViewer
                    vitamin={vitamin}
                    className="w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px]"
                  />
                </div>
              </div>

              {/* Coluna Direita: Informações (Fórmula, Massa Molar, Átomos, 2D) ao lado da 3D (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                {/* 1. Métricas Químicas: Fórmula, Massa Molar, Átomos */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Fórmula</span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wider mt-1 break-words">
                      {vitamin.formula}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Massa Molar</span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-white/90 mt-1">
                      {vitamin.molecularWeight}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Átomos</span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-white/90 mt-1">
                      {vitamin.totalAtoms} totais
                    </span>
                  </div>
                </div>

                {/* 2. Estrutura 2D Plana (Fórmula Esquelética) */}
                <div className="rounded-xl bg-[#090807] border border-white/[0.08] p-4 flex flex-col flex-1 min-h-[220px]">
                  <div className="flex items-center justify-between text-xs font-mono text-white/40 pb-2 mb-2 border-b border-white/[0.06]">
                    <span className="uppercase tracking-widest text-[10px] text-white/70 font-medium">
                      ESTRUTURA 2D PLANA
                    </span>
                    <span className="text-[10px] text-amber-300/80 font-mono tracking-wider">
                      FÓRMULA ESQUELÉTICA IUPAC
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center py-2 px-3 text-amber-200/90">
                    <ChemicalSkeletalSvg
                      type={vitamin.chemicalSvgType}
                      className="max-h-[170px] max-w-full drop-shadow-md"
                    />
                  </div>
                </div>

                {/* 3. Censo Atômico & CPK */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                    <span>CENSO ATÔMICO &middot; ELEMENTOS</span>
                    <span>PADRÃO CPK</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(vitamin.elementCounts)
                      .filter(([, v]) => v)
                      .map(([el, count]) => (
                        <div
                          key={el}
                          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: CPK_COLORS[el] || "#fff" }}
                          />
                          <span className="font-semibold text-white/90">{el}:</span>
                          <span className="text-white/70">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 4. Grupos Funcionais */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                    GRUPOS FUNCIONAIS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {vitamin.functionalGroups.map((g, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider border border-white/[0.08] bg-white/[0.02] text-white/80"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  {vitamin.functionalGroupNote && (
                    <p className="text-[11px] font-sans italic text-white/45 mt-2 leading-relaxed">
                      {vitamin.functionalGroupNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ---- SLIDE: FUNÇÕES BIOLÓGICAS ---- */}
          {activeTab === "funcoes" && (
            <div className="max-w-4xl py-4 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-2">
                PAPEL FISIOLÓGICO NO METABOLISMO
              </span>
              <div className="space-y-4">
                {vitamin.functions.map((func, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-4 sm:space-x-6 py-4 border-b border-white/[0.06] last:border-0"
                  >
                    <span
                      className="font-mono text-sm sm:text-base font-semibold flex-shrink-0 mt-0.5"
                      style={{ color: vitamin.accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base sm:text-xl font-sans font-light text-white/85 leading-relaxed">
                      {func}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- SLIDE: AVITAMINOSE CLÍNICA ---- */}
          {activeTab === "deficiencia" && (
            <div className="max-w-4xl py-4 space-y-6">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-300">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span>QUADRO CLÍNICO DE DEFICIÊNCIA NUTRICIONAL</span>
              </div>

              {vitamin.avitaminosis.description && (
                <p className="text-lg sm:text-xl text-white/70 italic font-serif leading-relaxed pl-4 border-l-2 border-red-500/30">
                  {vitamin.avitaminosis.description}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {vitamin.avitaminosis.symptoms.map((symptom, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-red-950/15 border border-red-500/20 text-red-100/90 font-sans text-sm sm:text-base font-light leading-relaxed flex items-start space-x-3"
                  >
                    <span className="text-red-400 text-sm mt-0.5">&bull;</span>
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- SLIDE: NUTRIÇÃO & FONTES ---- */}
          {activeTab === "fontes" && (
            <div className="max-w-4xl py-4 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 block mb-2">
                FONTES ALIMENTARES NATURAIS &amp; ABSORÇÃO
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {vitamin.sources.map((src, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">FONTE 0{i + 1}</span>
                    <span className="font-editorial text-2xl text-white font-light">{src}</span>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01] text-xs font-mono text-white/60 leading-relaxed">
                <span className="text-white/80 font-semibold uppercase tracking-wider block mb-1">
                  MECANISMO DE BIODISPONIBILIDADE:
                </span>
                {isLipo
                  ? "Requer ingestão conjunta com lipídios da dieta e ação emulsificante de ácidos biliares para formação de micelas e absorção entérica."
                  : "Absorvida prontamente pelo epitélio intestinal via transporte ativo ou difusão facilitada dependente de sódio, distribuindo-se nos fluidos corporais."}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
