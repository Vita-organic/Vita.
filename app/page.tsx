"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { VitaminHeroSequence } from "@/components/VitaminHeroSequence";
import { ScrollyWhatIsAVitamin } from "@/components/ScrollyWhatIsAVitamin";
import { ScrollyClassificationFork } from "@/components/ScrollyClassificationFork";
import { ScrollyChapterIntro } from "@/components/ScrollyChapterIntro";
import { ScrollyVitaminStory } from "@/components/ScrollyVitaminStory";
import { MolecularLaboratoryStudio } from "@/components/MolecularLaboratoryStudio";
import { EditorialClosingCta } from "@/components/EditorialClosingCta";
import { VITAMINS_DATA, VitaminData } from "@/data/vitamins";

const LIPO_VITAMINS = VITAMINS_DATA.filter((v) => v.classification === "lipossolúvel");
const HIDRO_VITAMINS = VITAMINS_DATA.filter((v) => v.classification === "hidrossolúvel");

export default function Home() {
  const [activeLabVitamin, setActiveLabVitamin] = useState<VitaminData>(VITAMINS_DATA[0]);

  return (
    <main className="relative w-full bg-[#060504] min-h-screen text-[#f5efe6] selection:bg-[#e8a830]/25 selection:text-white">
      {/* Discreet Minimal Floating Navbar */}
      <Navbar />

      {/* ========================================================
          01. HERO: CANVAS 3D IMAGE SEQUENCE + GSAP SCRUB
          ======================================================== */}
      <VitaminHeroSequence />

      {/* ========================================================
          02. DEFINITION: WHAT ARE VITAMINS? (PROGRESSIVE REVEAL)
          ======================================================== */}
      <ScrollyWhatIsAVitamin />

      {/* ========================================================
          03. CLASSIFICATION: THE DUAL SPLIT FORK
          ======================================================== */}
      <ScrollyClassificationFork />

      {/* ========================================================
          04. LIPOSSOLÚVEIS INTRO GATEWAY
          ======================================================== */}
      <ScrollyChapterIntro
        id="lipossoluveis-capitulo"
        part="PARTE I · COMPOSTOS LIPOFÍLICOS"
        title="Lipossolúveis"
        subtitle="Vitamina A · Vitamina D · Vitamina E · Vitamina K"
        description="Absorvidas em conjunto com as gorduras dietéticas e armazenadas nas reservas celulares do fígado e tecido adiposo. A seguir, explore cada molécula em sua integridade anatômica tridimensional."
        theme="amber"
      />

      {/* ========================================================
          INDIVIDUAL CHAPTERS: LIPOSSOLÚVEIS (A, D, E, K)
          ======================================================== */}
      {LIPO_VITAMINS.map((vitamin, idx) => (
        <ScrollyVitaminStory
          key={vitamin.id}
          vitamin={vitamin}
          index={idx}
        />
      ))}

      {/* ========================================================
          05. HIDROSSOLÚVEIS INTRO GATEWAY
          ======================================================== */}
      <ScrollyChapterIntro
        id="hidrossoluveis-transicao"
        part="PARTE II · O FLUXO AQUOSO"
        title="Hidrossolúveis"
        subtitle="Complexo B · Vitamina C"
        description="Moléculas polares que permeiam as correntes aquosas do sangue e do citoplasma celular. Não formam depósitos estáveis: são utilizadas metabolicamente e o excedente é excretado pelos rins, exigindo suprimento constante."
        theme="azure"
      />

      {/* ========================================================
          INDIVIDUAL CHAPTERS: HIDROSSOLÚVEIS (B1, B2, B6, B12, C)
          ======================================================== */}
      {HIDRO_VITAMINS.map((vitamin, idx) => (
        <ScrollyVitaminStory
          key={vitamin.id}
          vitamin={vitamin}
          index={idx + 4}
        />
      ))}

      {/* ========================================================
          06. LABORATÓRIO MOLECULAR 3D INTERATIVO
          ======================================================== */}
      <MolecularLaboratoryStudio
        selectedVitamin={activeLabVitamin}
        onVitaminChange={setActiveLabVitamin}
      />

      {/* ========================================================
          07. CONCLUSÃO, CRONOLOGIA & AUTORES
          ======================================================== */}
      <EditorialClosingCta />

      {/* Editorial Colophon Footer */}
      <footer className="w-full bg-[#040302] border-t border-white/[0.06] py-14 px-6 sm:px-12 md:px-20 lg:px-32 text-white/40 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="font-editorial text-2xl text-white font-light block mb-1">
              VITAMINAS &mdash; A QUÍMICA DA VIDA
            </span>
            <p className="text-xs text-white/40 font-sans font-light">
              Exposição científica scrollytelling sobre bioquímica orgânica e nutrição humana.
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
