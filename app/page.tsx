"use client";

import React, { useState } from "react";
import { VitaminHeroSequence } from "@/components/VitaminHeroSequence";
import { ChapterNavigation } from "@/components/ChapterNavigation";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ScrollyWhatIsAVitamin } from "@/components/ScrollyWhatIsAVitamin";
import { ScrollyClassificationFork } from "@/components/ScrollyClassificationFork";
import { ScrollyLipossoluveisChapter } from "@/components/ScrollyLipossoluveisChapter";
import { ScrollyVitaminStory } from "@/components/ScrollyVitaminStory";
import { ScrollyWaterSolubleTransition } from "@/components/ScrollyWaterSolubleTransition";

import { MolecularLaboratoryStudio } from "@/components/MolecularLaboratoryStudio";
import { EditorialClosingCta } from "@/components/EditorialClosingCta";
import { VITAMINS_DATA, VitaminData } from "@/data/vitamins";

// Pre-filtered static categories
const LIPO_VITAMINS = VITAMINS_DATA.filter((v) => v.classification === "lipossolúvel");
const HIDRO_VITAMINS = VITAMINS_DATA.filter((v) => v.classification === "hidrossolúvel");
const COMPLEX_B_VITAMINS = HIDRO_VITAMINS.filter((v) => v.id !== "vitamina-c");
const VITAMIN_C = HIDRO_VITAMINS.find((v) => v.id === "vitamina-c")!;

export default function Home() {
  const [activeLabVitamin, setActiveLabVitamin] = useState<VitaminData>(VITAMINS_DATA[0]);

  return (
    <main className="relative w-full bg-[#060504] min-h-screen text-[#f7f2ea] selection:bg-amber-400/20 selection:text-white">
      {/* Floating Minimal Chapter Navigation HUD */}
      <ChapterNavigation />

      {/* ========================================================
          SCENE 01 — HERO (Approved Minimal Canvas Sequence)
          ======================================================== */}
      <div id="hero">
        <VitaminHeroSequence />
      </div>

      {/* Subtle Marquee Ticker: Verified Chemical Formulas */}
      <MarqueeTicker />

      {/* ========================================================
          SCENE 02 — WHAT ARE VITAMINS? (Progressive Disclosure)
          ======================================================== */}
      <ScrollyWhatIsAVitamin />

      {/* ========================================================
          SCENE 03 — CLASSIFICATION (The Visual Fork)
          ======================================================== */}
      <ScrollyClassificationFork />

      {/* ========================================================
          SCENE 04 — LIPOSSOLÚVEIS (A, D, E, K Revealed Step-by-Step)
          ======================================================== */}
      <ScrollyLipossoluveisChapter />

      {/* ========================================================
          INDIVIDUAL CHAPTERS: LIPOSSOLÚVEIS (A, D, E, K)
          ======================================================== */}
      {LIPO_VITAMINS.map((vitamin) => (
        <ScrollyVitaminStory
          key={vitamin.id}
          vitamin={vitamin}
        />
      ))}

      {/* ========================================================
          SCENE 05 — TRANSITION INTO WATER-SOLUBLE VITAMINS
          ======================================================== */}
      <ScrollyWaterSolubleTransition />


      {/* ========================================================
          INDIVIDUAL CHAPTERS: COMPLEX B (B1, B2, B6, B12)
          ======================================================== */}
      {COMPLEX_B_VITAMINS.map((vitamin) => (
        <ScrollyVitaminStory
          key={vitamin.id}
          vitamin={vitamin}
        />
      ))}

      {/* ========================================================
          INDIVIDUAL CHAPTER: VITAMINA C (Ácido L-Ascórbico)
          ======================================================== */}
      <ScrollyVitaminStory
        vitamin={VITAMIN_C}
      />

      {/* ========================================================
          FINAL MOLECULAR ARCHIVE / INTERACTIVE 3D STUDIO
          ======================================================== */}
      <MolecularLaboratoryStudio
        selectedVitamin={activeLabVitamin}
        onVitaminChange={setActiveLabVitamin}
      />

      {/* ========================================================
          CLOSING REFLECTION & RESEARCH AUTHORS
          ======================================================== */}
      <EditorialClosingCta />

      {/* Minimalist Editorial Footer */}
      <footer className="w-full bg-[#040302] border-t border-white/5 py-12 sm:py-16 px-6 sm:px-12 md:px-20 text-white/40 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="font-editorial text-xl sm:text-2xl text-white font-light block mb-1">
              VITAMINAS &mdash; A QUÍMICA DA VIDA
            </span>
            <p className="text-xs text-white/40 font-sans font-light">
              Exposição científica scrollytelling sobre bioquímica orgânica e nutrição humana.
            </p>
          </div>

          <div className="text-xs text-white/45 space-y-1 text-center md:text-left max-w-md">
            <p className="text-white/70 font-semibold uppercase tracking-wider text-[11px]">
              TRABALHO DE QUÍMICA &middot; AUTORES:
            </p>
            <p className="leading-relaxed">
              Lucas da Silva Lemos &bull; Pedro Arhur Batista Carvalho &bull; João Bernardo de Araujo Resende &bull; Orlando Olegario Favaro &bull; Caua Paiva de Almeida &bull; Rakel Marques Leite
            </p>
          </div>

          <div className="text-[11px] text-white/35 text-center md:text-right">
            <p>NEXT.JS &middot; THREE.JS &middot; GSAP SCROLLTRIGGER</p>
            <p className="mt-0.5">AWWWARDS EDITORIAL DESIGN &middot; 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
