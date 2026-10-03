"use client";

import React, { useState } from "react";
import { VITAMINS_DATA, VitaminData } from "@/data/vitamins";
import { MoleculeViewer } from "./MoleculeViewer";

interface MolecularLaboratoryStudioProps {
  selectedVitamin?: VitaminData;
  onVitaminChange?: (vitamin: VitaminData) => void;
}

export const MolecularLaboratoryStudio: React.FC<MolecularLaboratoryStudioProps> = ({
  selectedVitamin: externalVitamin,
  onVitaminChange,
}) => {
  const [internalVitamin, setInternalVitamin] = useState<VitaminData>(VITAMINS_DATA[0]);

  const active = externalVitamin || internalVitamin;

  const handleSelect = (v: VitaminData) => {
    setInternalVitamin(v);
    if (onVitaminChange) onVitaminChange(v);
  };

  const isLipo = active.classification === "lipossolúvel";
  const accentColor = isLipo ? "#e8a830" : "#52a5ff";

  return (
    <section
      id="estudio-3d"
      className="section-editorial min-h-screen flex flex-col justify-between"
    >
      {/* Top Header: Clean Editorial Title */}
      <div className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06]">
        <div>
          <span className="eyebrow-scientific text-white/40 mb-3">
            ARQUIVO COMPARATIVO
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-white uppercase tracking-tight">
            Laboratório Molecular
          </h2>
        </div>

        <p className="text-sm sm:text-base text-white/50 font-sans font-light max-w-md">
          Explore a conformação atômica tridimensional real de cada vitamina reconhecida pela ciência.
        </p>
      </div>

      {/* Vitamin Selection Ribbon: Minimalist Typographic Selector */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-none pb-2">
          {VITAMINS_DATA.map((v) => {
            const isSelected = v.id === active.id;
            return (
              <button
                key={v.id}
                onClick={() => handleSelect(v)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-lg"
                    : "text-white/40 hover:text-white hover:bg-white/[0.04] border border-white/10"
                }`}
              >
                VITAMINA {v.letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus: Molecular Inspection Theater */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
        {/* Left Column: Pure Chemical Telemetry */}
        <div className="lg:col-span-4 flex flex-col space-y-6 order-2 lg:order-1">
          <div>
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase block mb-1"
              style={{ color: accentColor }}
            >
              {active.classification.toUpperCase()} &middot; {active.number}
            </span>
            <h3 className="font-editorial text-4xl sm:text-5xl font-light text-white uppercase tracking-tight">
              {active.name}
            </h3>
            <p className="font-serif italic text-xl text-white/60 font-light mt-1">
              {active.chemicalName}
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.08]">
            <div className="telemetry-row">
              <span className="text-white/40 uppercase tracking-wider">Fórmula Química</span>
              <span className="text-white font-medium">{active.formula}</span>
            </div>

            <div className="telemetry-row">
              <span className="text-white/40 uppercase tracking-wider">Massa Molecular</span>
              <span className="text-white">{active.molecularWeight}</span>
            </div>

            <div className="telemetry-row">
              <span className="text-white/40 uppercase tracking-wider">Total de Átomos</span>
              <span className="text-white">{active.totalAtoms} átomos</span>
            </div>

            <div className="telemetry-row">
              <span className="text-white/40 uppercase tracking-wider">Grupos Funcionais</span>
              <span className="text-white text-right">{active.functionalGroups.join(", ")}</span>
            </div>

            <div className="telemetry-row">
              <span className="text-white/40 uppercase tracking-wider">PubChem CID</span>
              <span className="text-white/70">{active.pubchemCid}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Height Interactive 3D Canvas */}
        <div className="lg:col-span-8 h-[450px] sm:h-[550px] lg:h-[600px] relative order-1 lg:order-2 rounded-2xl bg-white/[0.01] border border-white/[0.06] overflow-hidden">
          <MoleculeViewer
            key={active.id}
            vitamin={active}
            className="w-full h-full"
            autoRotate={true}
            interactive={true}
          />
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/30 tracking-wider">
        <span>MODELOS QUÍMICOS BALL & STICK VALIDADOS</span>
        <span className="mt-2 sm:mt-0">PUBCHEM &middot; IUPAC BIOQUÍMICA</span>
      </div>
    </section>
  );
};
