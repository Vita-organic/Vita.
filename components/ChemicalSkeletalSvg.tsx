"use client";

import React from "react";

interface ChemicalSkeletalSvgProps {
  type: string;
  className?: string;
}

export const ChemicalSkeletalSvg: React.FC<ChemicalSkeletalSvgProps> = ({
  type,
  className = "w-full h-auto",
}) => {
  switch (type) {
    // -------------------------------------------------------------
    // VITAMINA A: RETINOL (PDF page 2)
    // -------------------------------------------------------------
    case "retinol":
      return (
        <svg viewBox="0 0 280 120" fill="none" className={className}>
          {/* Beta-ionone ring */}
          <polygon
            points="30,55 50,30 80,35 90,65 70,90 40,85"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          {/* Double bond inside ring */}
          <line x1="72" y1="42" x2="80" y2="65" stroke="currentColor" strokeWidth="1.6" />
          {/* Gem-dimethyl at C1 */}
          <line x1="50" y1="30" x2="45" y2="12" stroke="currentColor" strokeWidth="1.8" />
          <line x1="50" y1="30" x2="65" y2="12" stroke="currentColor" strokeWidth="1.8" />
          {/* Methyl at C5 */}
          <line x1="40" y1="85" x2="30" y2="105" stroke="currentColor" strokeWidth="1.8" />
          {/* Polyene conjugated chain */}
          <polyline
            points="90,65 110,50 130,65 150,50 170,65 190,50 210,65 230,50 245,60"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Conjugated double bonds */}
          <line x1="94" y1="63" x2="108" y2="52" stroke="currentColor" strokeWidth="1.4" />
          <line x1="134" y1="63" x2="148" y2="52" stroke="currentColor" strokeWidth="1.4" />
          <line x1="174" y1="63" x2="188" y2="52" stroke="currentColor" strokeWidth="1.4" />
          <line x1="214" y1="63" x2="228" y2="52" stroke="currentColor" strokeWidth="1.4" />
          {/* Chain methyl branches */}
          <line x1="130" y1="65" x2="130" y2="85" stroke="currentColor" strokeWidth="1.8" />
          <line x1="170" y1="65" x2="170" y2="85" stroke="currentColor" strokeWidth="1.8" />
          {/* Terminal OH label */}
          <text x="248" y="65" fill="currentColor" fontSize="13" fontFamily="var(--font-mono)" fontWeight="600">
            OH
          </text>
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA D: CALCIFEROL (PDF page 3)
    // -------------------------------------------------------------
    case "calciferol":
      return (
        <svg viewBox="0 0 280 140" fill="none" className={className}>
          {/* HO label at left */}
          <text x="10" y="70" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">
            HO
          </text>
          {/* Ring A with dashed bond */}
          <line x1="30" y1="67" x2="45" y2="67" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" />
          <polygon
            points="45,67 58,48 80,52 88,75 75,94 53,90"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Triene conjugated bridge */}
          <polyline
            points="88,75 105,70 120,85 135,70"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Exocyclic methylene =CH2 */}
          <line x1="105" y1="70" x2="105" y2="52" stroke="currentColor" strokeWidth="1.8" />
          <line x1="108" y1="70" x2="108" y2="52" stroke="currentColor" strokeWidth="1.4" />
          {/* Ring C and D steroid core */}
          <polygon
            points="135,70 145,50 168,52 178,72 165,88 142,86"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
          <polygon
            points="178,72 196,65 204,82 190,95 165,88"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Angular methyl */}
          <line x1="168" y1="52" x2="168" y2="38" stroke="currentColor" strokeWidth="1.8" />
          {/* Tail */}
          <polyline
            points="196,65 212,75 228,65 244,78 260,65"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line x1="260" y1="65" x2="268" y2="52" stroke="currentColor" strokeWidth="1.8" />
          <line x1="260" y1="65" x2="268" y2="78" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA E: TOCOFEROL (PDF page 4)
    // -------------------------------------------------------------
    case "tocopherol":
      return (
        <svg viewBox="0 0 280 120" fill="none" className={className}>
          {/* HO label */}
          <text x="10" y="45" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">
            HO
          </text>
          <line x1="28" y1="42" x2="40" y2="48" stroke="currentColor" strokeWidth="1.8" />
          {/* Fused Chroman core (Benzene + Dihydropyran) */}
          <polygon points="40,48 55,30 75,34 82,56 68,72 48,68" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <polygon points="82,56 102,52 115,70 102,88 68,72" stroke="currentColor" strokeWidth="1.8" fill="none" />
          {/* Ring Oxygen */}
          <text x="75" y="74" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">
            O
          </text>
          {/* Methyl substituents on aromatic ring */}
          <line x1="55" y1="30" x2="52" y2="15" stroke="currentColor" strokeWidth="1.8" />
          <line x1="48" y1="68" x2="40" y2="82" stroke="currentColor" strokeWidth="1.8" />
          <line x1="102" y1="88" x2="102" y2="102" stroke="currentColor" strokeWidth="1.8" />
          {/* Long phytyl tail */}
          <polyline
            points="115,70 130,82 145,70 160,82 175,70 190,82 205,70 220,82 235,70 250,82"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Tail methyl branches */}
          <line x1="145" y1="70" x2="145" y2="55" stroke="currentColor" strokeWidth="1.6" />
          <line x1="190" y1="82" x2="190" y2="95" stroke="currentColor" strokeWidth="1.6" />
          <line x1="235" y1="70" x2="235" y2="55" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA K: FILOQUINONA (PDF page 5)
    // -------------------------------------------------------------
    case "phylloquinone":
      return (
        <svg viewBox="0 0 240 130" fill="none" className={className}>
          {/* Fused Naphthoquinone core */}
          <polygon points="40,65 55,42 80,45 92,70 78,92 52,90" stroke="currentColor" strokeWidth="2" fill="none" />
          <polygon points="92,70 115,65 132,88 120,110 78,92" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Ketone 1: C=O top */}
          <line x1="113" y1="65" x2="113" y2="45" stroke="currentColor" strokeWidth="2" />
          <line x1="117" y1="65" x2="117" y2="45" stroke="currentColor" strokeWidth="2" />
          <text x="110" y="38" fill="currentColor" fontSize="13" fontFamily="var(--font-mono)" fontWeight="bold">
            O
          </text>
          {/* Ketone 2: C=O bottom */}
          <line x1="118" y1="110" x2="118" y2="125" stroke="currentColor" strokeWidth="2" />
          <line x1="122" y1="110" x2="122" y2="125" stroke="currentColor" strokeWidth="2" />
          <text x="115" y="132" fill="currentColor" fontSize="13" fontFamily="var(--font-mono)" fontWeight="bold">
            O
          </text>
          {/* Methyl on C2 */}
          <line x1="132" y1="88" x2="148" y2="75" stroke="currentColor" strokeWidth="2" />
          {/* Phytyl tail */}
          <polyline points="132,88 150,102 168,90 186,102 204,90 222,102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA B1: TIAMINA (PDF page 6)
    // -------------------------------------------------------------
    case "thiamine":
      return (
        <svg viewBox="0 0 280 120" fill="none" className={className}>
          {/* Pyrimidine ring with Nitrogens */}
          <polygon points="35,60 50,40 75,42 85,65 72,88 47,85" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <text x="45" y="38" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">N</text>
          <text x="70" y="94" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">N</text>
          {/* NH2 group */}
          <text x="90" y="90" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">NH₂</text>
          <line x1="85" y1="65" x2="95" y2="78" stroke="currentColor" strokeWidth="1.8" />
          {/* Methylene bridge */}
          <polyline points="85,65 110,60 125,72" stroke="currentColor" strokeWidth="1.8" />
          {/* Thiazolium ring */}
          <text x="125" y="70" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">N⁺</text>
          <polygon points="135,68 155,55 170,72 155,90 135,82" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <text x="145" y="98" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">S</text>
          {/* Methyl on thiazole */}
          <line x1="155" y1="55" x2="155" y2="38" stroke="currentColor" strokeWidth="1.8" />
          {/* Hydroxyethyl side chain with -OH */}
          <polyline points="170,72 195,72 215,85" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="218" y="88" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">
            OH
          </text>
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA B2: RIBOFLAVINA (PDF page 7)
    // -------------------------------------------------------------
    case "riboflavin":
      return (
        <svg viewBox="0 0 260 160" fill="none" className={className}>
          {/* Flavin tricyclic core */}
          <polygon points="30,110 45,90 70,92 82,112 70,132 45,130" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <polygon points="82,112 105,108 120,128 105,148 70,132" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <polygon points="120,128 142,125 155,145 138,162 105,148" stroke="currentColor" strokeWidth="1.8" fill="none" />
          {/* Carbonyls C=O */}
          <line x1="155" y1="145" x2="170" y2="145" stroke="currentColor" strokeWidth="1.8" />
          <text x="172" y="148" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)">O</text>
          <text x="142" y="120" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)">NH</text>
          {/* Ribityl polyol tail extending upward with 4 OH groups */}
          <polyline points="105,108 105,85 125,75 105,60 125,48 115,28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="75" y="90" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">HO</text>
          <text x="135" y="78" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">OH</text>
          <text x="75" y="62" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">HO</text>
          <text x="135" y="50" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">OH</text>
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA B6: PIRIDOXINA (PDF page 8)
    // -------------------------------------------------------------
    case "pyridoxine":
      return (
        <svg viewBox="0 0 240 120" fill="none" className={className}>
          {/* Pyridine ring */}
          <polygon points="50,60 70,40 100,45 110,75 92,100 62,95" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Ring Nitrogen */}
          <text x="82" y="105" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold">N</text>
          {/* Phenolic/Enolic HO */}
          <text x="25" y="42" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">HO</text>
          <line x1="45" y1="42" x2="70" y2="40" stroke="currentColor" strokeWidth="2" />
          {/* Aldehyde/Hydroxymethyl at top */}
          <line x1="100" y1="45" x2="100" y2="25" stroke="currentColor" strokeWidth="2" />
          <line x1="98" y1="25" x2="88" y2="15" stroke="currentColor" strokeWidth="2" />
          <text x="75" y="15" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)">O</text>
          {/* Side chain with phosphate/alcohol */}
          <polyline points="110,75 130,85 145,75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <text x="148" y="80" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">O</text>
          <line x1="160" y1="78" x2="175" y2="78" stroke="currentColor" strokeWidth="1.8" />
          <text x="178" y="82" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="bold">OH</text>
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA B12: COBALAMINA (PDF page 9)
    // -------------------------------------------------------------
    case "cobalamin":
      return (
        <svg viewBox="0 0 260 170" fill="none" className={className}>
          {/* Central Cobalt atom */}
          <circle cx="120" cy="85" r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
          <text x="114" y="89" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">
            Co
          </text>
          {/* 4 Coordinating Pyrrole Rings forming Corrin Macrocycle */}
          <polygon points="120,60 145,50 155,70 135,78" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <polygon points="140,88 165,95 155,115 130,105" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <polygon points="115,110 95,120 85,100 105,92" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <polygon points="98,82 75,75 85,55 110,65" stroke="currentColor" strokeWidth="1.6" fill="none" />
          {/* Coordination bonds to Co */}
          <line x1="120" y1="76" x2="120" y2="60" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
          <line x1="129" y1="85" x2="140" y2="88" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
          <line x1="120" y1="94" x2="115" y2="110" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
          <line x1="111" y1="85" x2="98" y2="82" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
          {/* Amide peripheral branches */}
          <text x="180" y="48" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">CONH₂</text>
          <text x="185" y="105" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">CONH₂</text>
          <text x="25" y="50" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">H₂NOC</text>
          <text x="25" y="105" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">H₂NOC</text>
          {/* Lower axial nucleotide */}
          <polyline points="115,120 115,145 130,158" stroke="currentColor" strokeWidth="1.6" />
          <text x="135" y="162" fill="currentColor" fontSize="10" fontFamily="var(--font-mono)">O=P-O⁻</text>
        </svg>
      );

    // -------------------------------------------------------------
    // VITAMINA C: ÁCIDO ASCÓRBICO (PDF page 10)
    // -------------------------------------------------------------
    case "ascorbic_acid":
    default:
      return (
        <svg viewBox="0 0 200 130" fill="none" className={className}>
          {/* Enol Hydroxyls */}
          <text x="35" y="32" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">HO</text>
          <text x="110" y="32" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">OH</text>
          <line x1="50" y1="36" x2="62" y2="52" stroke="currentColor" strokeWidth="1.8" />
          <line x1="110" y1="36" x2="98" y2="52" stroke="currentColor" strokeWidth="1.8" />
          {/* Furanone lactone ring */}
          <polygon points="62,52 98,52 110,85 75,98 50,75" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Double bond inside enol edge */}
          <line x1="68" y1="58" x2="92" y2="58" stroke="currentColor" strokeWidth="1.6" />
          {/* Carbonyl C=O */}
          <line x1="50" y1="75" x2="30" y2="78" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="71" x2="30" y2="74" stroke="currentColor" strokeWidth="2" />
          <text x="14" y="80" fill="currentColor" fontSize="13" fontFamily="var(--font-mono)" fontWeight="bold">O</text>
          {/* Ring Oxygen (Lactone ether) */}
          <circle cx="75" cy="98" r="3.5" fill="#070605" stroke="currentColor" strokeWidth="1.8" />
          {/* Dihydroxyethyl tail */}
          <polyline points="110,85 132,95 152,88" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="156" y="92" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600">OH</text>
          {/* Secondary -OH */}
          <line x1="132" y1="95" x2="132" y2="112" stroke="currentColor" strokeWidth="1.8" strokeDasharray="1.5 2" />
          <text x="126" y="124" fill="currentColor" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">OH</text>
        </svg>
      );
  }
};
