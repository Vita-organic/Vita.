export interface VitaminData {
  id: string;
  number: string;
  letter: string;
  name: string;
  chemicalName: string;
  formula: string;
  formulaAlternative?: string;
  elementCounts: {
    C: number;
    H: number;
    O: number;
    N?: number;
    P?: number;
    S?: number;
    Co?: number;
    Cl?: number;
  };
  totalAtoms: number;
  molecularWeight: string;
  classification: "lipossolúvel" | "hidrossolúvel";
  classificationGroup: "Lipossolúveis" | "Hidrossolúveis (Complexo B)" | "Hidrossolúveis (Vitamina C)";
  derivationOrSynthesis?: string;
  functions: string[];
  avitaminosis: {
    description?: string;
    symptoms: string[];
  };
  sources: string[];
  functionalGroups: string[];
  functionalGroupNote?: string;
  chemicalSvgType: string;
  accentColor: string;
  pubchemCid: number;
  symmetriaQuery: string;
  // 3D Ball & Stick atomic skeleton
  atoms: Array<{
    element: "C" | "H" | "O" | "N" | "P" | "S" | "Co";
    x: number;
    y: number;
    z: number;
  }>;
  bonds: Array<[number, number]>;
}

export const VITAMINS_DATA: VitaminData[] = [
  // -------------------------------------------------------------
  // 01: VITAMINA A (RETINOL) - LIPOSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-a",
    number: "01",
    letter: "A",
    name: "Vitamina A",
    chemicalName: "Retinol",
    formula: "C₂₀H₃₀O",
    formulaAlternative: "C20H30O",
    elementCounts: { C: 20, H: 30, O: 1 },
    totalAtoms: 51,
    molecularWeight: "286.46 g/mol",
    classification: "lipossolúvel",
    classificationGroup: "Lipossolúveis",
    derivationOrSynthesis: "Derivado do Betacaroteno",
    functions: [
      "Formação do retinal (derivado da vitamina A necessário para o funcionamento do olho)",
      "Crescimento corporal",
      "Produção de Melanina",
    ],
    avitaminosis: {
      symptoms: [
        "Cegueira Noturna (dificuldade de enxergar / visão embaçada em ambientes com pouca luminosidade)",
        "Xeroftalmia (desidratação e ressecamento patológico do olho)",
        "Despigmentação da pele",
      ],
    },
    sources: ["Fígado", "Leite e derivados", "Cenoura"],
    functionalGroups: ["Álcool"],
    chemicalSvgType: "retinol",
    accentColor: "#e8a830",
    pubchemCid: 445354,
    symmetriaQuery: "Retinol",
    // 3D coordinates representing beta-ionone ring + conjugated polyene chain + terminal -CH2OH
    atoms: [
      // beta-ionone ring carbons (0-5)
      { element: "C", x: -4.5, y: 0.8, z: 0.0 },
      { element: "C", x: -3.8, y: 1.9, z: 0.6 },
      { element: "C", x: -2.3, y: 1.8, z: 0.4 },
      { element: "C", x: -1.7, y: 0.6, z: -0.4 },
      { element: "C", x: -2.4, y: -0.5, z: -0.9 },
      { element: "C", x: -3.8, y: -0.4, z: -0.7 },
      // Ring methyl groups (6-8)
      { element: "C", x: -4.4, y: 2.2, z: 2.0 },
      { element: "C", x: -4.0, y: 3.2, z: -0.2 },
      { element: "C", x: -1.8, y: -1.7, z: -1.6 },
      // Polyene conjugated chain carbons (9-17)
      { element: "C", x: -0.2, y: 0.5, z: -0.3 },
      { element: "C", x: 0.6, y: -0.4, z: 0.2 },
      { element: "C", x: 2.0, y: -0.5, z: 0.2 },
      { element: "C", x: 2.8, y: 0.5, z: -0.4 },
      { element: "C", x: 4.2, y: 0.4, z: -0.3 },
      { element: "C", x: 5.0, y: -0.5, z: 0.3 },
      // Chain methyl substituents (15, 16)
      { element: "C", x: 0.1, y: -1.7, z: 0.8 },
      { element: "C", x: 2.4, y: 1.8, z: -1.0 },
      // Terminal alcohol carbon & oxygen (17, 18)
      { element: "C", x: 6.4, y: -0.6, z: 0.3 },
      { element: "O", x: 7.1, y: 0.4, z: -0.3 },
      { element: "H", x: 8.0, y: 0.3, z: -0.2 },
      // Ring Hydrogens
      { element: "H", x: -5.5, y: 0.8, z: 0.1 },
      { element: "H", x: -1.8, y: 2.7, z: 0.8 },
      { element: "H", x: -4.4, y: -1.2, z: -1.1 },
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [1, 6], [1, 7], [4, 8],
      [3, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
      [10, 15], [12, 16], [14, 17], [17, 18], [18, 19],
      [0, 20], [2, 21], [5, 22]
    ],
  },

  // -------------------------------------------------------------
  // 02: VITAMINA D (CALCIFEROL) - LIPOSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-d",
    number: "02",
    letter: "D",
    name: "Vitamina D",
    chemicalName: "Colecalciferol (Vitamina D3)",
    formula: "C₂₇H₄₄O",
    formulaAlternative: "D2 (Ergocalciferol): C₂₈H₄₄O",
    elementCounts: { C: 27, H: 44, O: 1 },
    totalAtoms: 72,
    molecularWeight: "384.64 g/mol",
    classification: "lipossolúvel",
    classificationGroup: "Lipossolúveis",
    derivationOrSynthesis: "Sintetizada na pele por exposição do 7-desidrocolesterol à radiação solar ultravioleta",
    functions: [
      "Metabolismo de cálcio e fósforo (mineralização óssea)",
      "Formação de linfócitos (tipo de glóbulos brancos essenciais para imunidade)",
    ],
    avitaminosis: {
      symptoms: [
        "Raquitismo (fragilidade e deformidade óssea em crianças / osteomalácia em adultos)",
        "Fragilidade dentária acentuada",
        "Maior propensão à artrite e inflamações articulares",
      ],
    },
    sources: ["Exposição solar regular", "Suplemento alimentar e peixes gordurosos"],
    functionalGroups: ["Álcool"],
    chemicalSvgType: "calciferol",
    accentColor: "#f0a820",
    pubchemCid: 5280795,
    symmetriaQuery: "Cholecalciferol",
    // 3D Secosteroid skeleton: Ring A with -OH, open B-ring triene, fused CD rings, aliphatic tail
    atoms: [
      // Ring A with -OH
      { element: "C", x: -4.8, y: -1.2, z: 0.2 },
      { element: "C", x: -5.5, y: 0.0, z: -0.2 },
      { element: "O", x: -6.9, y: -0.1, z: -0.3 },
      { element: "H", x: -7.3, y: 0.7, z: -0.5 },
      { element: "C", x: -4.8, y: 1.2, z: 0.3 },
      { element: "C", x: -3.3, y: 1.1, z: 0.1 },
      { element: "C", x: -2.6, y: 0.0, z: -0.3 },
      { element: "C", x: -3.3, y: -1.2, z: -0.1 },
      // Open B ring conjugated triene
      { element: "C", x: -1.2, y: 0.0, z: -0.6 },
      { element: "C", x: -0.5, y: -1.1, z: -0.8 },
      { element: "C", x: 0.9, y: -1.1, z: -0.7 },
      { element: "C", x: 1.7, y: 0.0, z: -0.4 },
      // Rings C and D (steroid core)
      { element: "C", x: 3.2, y: -0.1, z: -0.2 },
      { element: "C", x: 3.8, y: -1.4, z: 0.4 },
      { element: "C", x: 5.3, y: -1.3, z: 0.5 },
      { element: "C", x: 5.9, y: -0.1, z: -0.2 },
      { element: "C", x: 5.2, y: 1.1, z: -0.6 },
      { element: "C", x: 3.7, y: 1.1, z: -0.5 },
      // Methyl at C18
      { element: "C", x: 3.4, y: 2.1, z: 0.6 },
      // Aliphatic tail
      { element: "C", x: 7.4, y: 0.0, z: -0.2 },
      { element: "C", x: 8.2, y: -1.2, z: 0.2 },
      { element: "C", x: 9.7, y: -1.1, z: 0.1 },
      { element: "C", x: 10.4, y: -0.0, z: -0.7 },
      { element: "C", x: 11.9, y: 0.1, z: -0.7 },
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [6, 7], [7, 0],
      [6, 8], [8, 9], [9, 10], [10, 11],
      [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 12],
      [17, 18], [15, 19], [19, 20], [20, 21], [21, 22], [22, 23]
    ],
  },

  // -------------------------------------------------------------
  // 03: VITAMINA E (TOCOFEROL) - LIPOSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-e",
    number: "03",
    letter: "E",
    name: "Vitamina E",
    chemicalName: "alfa-Tocoferol",
    formula: "C₂₉H₅₀O₂",
    formulaAlternative: "C29H50O2",
    elementCounts: { C: 29, H: 50, O: 2 },
    totalAtoms: 81,
    molecularWeight: "430.72 g/mol",
    classification: "lipossolúvel",
    classificationGroup: "Lipossolúveis",
    functions: [
      "Antioxidante potente (retarda o envelhecimento celular e evita danos por radicais livres)",
      "Atuação protetora no sistema neurológico e mielinização",
      "Manutenção da fertilidade e integridade reprodutiva",
    ],
    avitaminosis: {
      description: "Muito rara em indivíduos adultos saudáveis",
      symptoms: [
        "Comprometimento severo das funções neurológicas e ataxia",
        "Infertilidade e distúrbios da reprodução",
        "Fragilidade de eritrócitos e anemia hemolítica",
      ],
    },
    sources: ["Gemas de ovo", "Nozes e sementes oleaginosas", "Produtos e cereais integrais", "Óleos vegetais"],
    functionalGroups: ["Fenol", "Éter"],
    chemicalSvgType: "tocopherol",
    accentColor: "#d4880a",
    pubchemCid: 14985,
    symmetriaQuery: "alpha-Tocopherol",
    // 3D chroman ring (phenol + cyclic ether) + phytyl isoprenoid tail
    atoms: [
      // Chroman Ring A (phenolic benzene ring)
      { element: "C", x: -5.2, y: 0.0, z: 0.0 },
      { element: "C", x: -4.5, y: 1.2, z: 0.0 },
      { element: "O", x: -5.1, y: 2.4, z: 0.0 },
      { element: "H", x: -4.5, y: 3.1, z: 0.0 },
      { element: "C", x: -3.1, y: 1.1, z: 0.0 },
      { element: "C", x: -2.4, y: -0.1, z: 0.0 },
      { element: "C", x: -3.1, y: -1.3, z: 0.0 },
      { element: "C", x: -4.5, y: -1.2, z: 0.0 },
      // Ring B (dihydropyran ether ring)
      { element: "O", x: -1.0, y: -0.1, z: 0.1 },
      { element: "C", x: -0.4, y: -1.3, z: 0.4 },
      { element: "C", x: -1.2, y: -2.5, z: 0.0 },
      { element: "C", x: -2.5, y: -2.5, z: -0.4 },
      // Methyl groups on chroman ring
      { element: "C", x: -2.3, y: 2.3, z: 0.0 },
      { element: "C", x: -5.3, y: -2.5, z: 0.0 },
      { element: "C", x: 0.8, y: -1.4, z: -0.4 },
      // Phytyl saturated tail (chain of carbons)
      { element: "C", x: -0.1, y: -1.2, z: 1.9 },
      { element: "C", x: 1.2, y: -1.7, z: 2.4 },
      { element: "C", x: 2.4, y: -0.8, z: 2.1 },
      { element: "C", x: 3.7, y: -1.4, z: 2.6 },
      { element: "C", x: 4.9, y: -0.5, z: 2.3 },
      { element: "C", x: 6.2, y: -1.1, z: 2.8 },
      { element: "C", x: 7.4, y: -0.2, z: 2.4 },
      { element: "C", x: 8.7, y: -0.8, z: 2.9 },
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [6, 7], [7, 0],
      [5, 8], [8, 9], [9, 10], [10, 11], [11, 6],
      [4, 12], [7, 13], [9, 14],
      [9, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22]
    ],
  },

  // -------------------------------------------------------------
  // 04: VITAMINA K (FILOQUINONA) - LIPOSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-k",
    number: "04",
    letter: "K",
    name: "Vitamina K",
    chemicalName: "Filoquinona (Vitamina K1)",
    formula: "C₃₁H₄₆O₂",
    formulaAlternative: "K2 (Menaquinona-4): C₃₁H₄₀O₂",
    elementCounts: { C: 31, H: 46, O: 2 },
    totalAtoms: 79,
    molecularWeight: "450.71 g/mol",
    classification: "lipossolúvel",
    classificationGroup: "Lipossolúveis",
    functions: [
      "Coagulação sanguínea fundamental (síntese de protrombina e fatores VII, IX e X)",
      "Reposição e fixação do cálcio na matriz óssea (ativação da osteocalcina)",
    ],
    avitaminosis: {
      symptoms: [
        "Hemorragias graves e sangramentos espontâneos",
        "Aumento patológico do tempo de protrombina",
        "Fragilidade e desmineralização óssea progressiva",
      ],
    },
    sources: ["Vegetais de folhas verdes escuras (brócolis, espinafre, couve)", "Óleos vegetais"],
    functionalGroups: ["Cetona"],
    chemicalSvgType: "phylloquinone",
    accentColor: "#c9944d",
    pubchemCid: 5280483,
    symmetriaQuery: "Phylloquinone",
    // 3D 1,4-naphthoquinone core (dione) + polyisoprenyl phytyl tail
    atoms: [
      // Fused Benzene Ring
      { element: "C", x: -5.5, y: 1.2, z: 0.0 },
      { element: "C", x: -4.1, y: 1.2, z: 0.0 },
      { element: "C", x: -3.4, y: 0.0, z: 0.0 },
      { element: "C", x: -4.1, y: -1.2, z: 0.0 },
      { element: "C", x: -5.5, y: -1.2, z: 0.0 },
      { element: "C", x: -6.2, y: 0.0, z: 0.0 },
      // Quinone Ring with 2 C=O Ketones
      { element: "C", x: -1.9, y: 0.0, z: 0.0 },
      { element: "C", x: -1.2, y: 1.2, z: 0.0 },
      { element: "O", x: -1.8, y: 2.3, z: 0.0 },
      { element: "C", x: 0.3, y: 1.2, z: 0.0 },
      { element: "C", x: 0.8, y: 2.5, z: 0.0 },
      { element: "C", x: 1.0, y: 0.0, z: 0.0 },
      { element: "C", x: 0.3, y: -1.2, z: 0.0 },
      { element: "O", x: 0.9, y: -2.3, z: 0.0 },
      { element: "C", x: -1.2, y: -1.2, z: 0.0 },
      // Phytyl tail attached at C3
      { element: "C", x: 2.5, y: -0.1, z: 0.0 },
      { element: "C", x: 3.3, y: 0.9, z: 0.0 },
      { element: "C", x: 2.9, y: 2.3, z: 0.0 },
      { element: "C", x: 4.8, y: 0.7, z: 0.0 },
      { element: "C", x: 5.6, y: 1.8, z: 0.2 },
      { element: "C", x: 7.1, y: 1.6, z: 0.1 },
      { element: "C", x: 8.0, y: 2.7, z: 0.3 },
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [2, 6], [6, 7], [7, 8], [7, 9], [9, 10], [9, 11], [11, 12], [12, 13], [12, 14], [14, 3],
      [11, 15], [15, 16], [16, 17], [16, 18], [18, 19], [19, 20], [20, 21]
    ],
  },

  // -------------------------------------------------------------
  // 05: VITAMINA B1 (TIAMINA) - HIDROSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-b1",
    number: "05",
    letter: "B1",
    name: "Vitamina B1",
    chemicalName: "Tiamina",
    formula: "C₁₂H₁₇N₄OS⁺",
    formulaAlternative: "Cloridrato: C₁₂H₁₇ClN₄OS · HCl",
    elementCounts: { C: 12, H: 17, N: 4, O: 1, S: 1 },
    totalAtoms: 35,
    molecularWeight: "265.35 g/mol",
    classification: "hidrossolúvel",
    classificationGroup: "Hidrossolúveis (Complexo B)",
    functions: [
      "Auxilia na oxidação dos carboidratos (descarboxilação oxidativa do piruvato)",
      "Essencial para o bom funcionamento e integridade das células nervosas",
      "Estimula o apetite e mantém o tônus muscular",
      "Evita o beribéri e a fadiga crônica",
    ],
    avitaminosis: {
      description: "Deficiência é rara, mas produz manifestações neuromusculares marcantes",
      symptoms: [
        "Beribéri (seco: neuropatia periférica; úmido: insuficiência cardíaca congestiva)",
        "Fraqueza muscular progressiva e atrofia",
        "Alto nível de açúcar no sangue (glicemia desregulada)",
        "Fadiga severa, confusão mental e perda de reflexos",
      ],
    },
    sources: ["Cereais em forma integral", "Feijão, pães e ovos", "Fígado, carne de porco"],
    functionalGroups: ["Álcool", "Amina"],
    chemicalSvgType: "thiamine",
    accentColor: "#4a9eda",
    pubchemCid: 1130,
    symmetriaQuery: "Thiamine",
    // 3D Pyrimidine ring linked via methylene bridge to Thiazolium ring with hydroxyethyl group
    atoms: [
      // Pyrimidine ring (atoms 0-5)
      { element: "N", x: -4.2, y: 1.2, z: 0.0 },
      { element: "C", x: -2.9, y: 1.2, z: 0.0 },
      { element: "C", x: -2.2, y: 0.0, z: 0.0 },
      { element: "C", x: -2.9, y: -1.2, z: 0.0 },
      { element: "N", x: -4.2, y: -1.2, z: 0.0 },
      { element: "C", x: -4.8, y: 0.0, z: 0.0 },
      // Amino group -NH2 on C4
      { element: "N", x: -2.2, y: 2.4, z: 0.0 },
      { element: "H", x: -2.7, y: 3.2, z: 0.0 },
      // Methyl on C2
      { element: "C", x: -6.3, y: 0.0, z: 0.0 },
      // Methylene bridge -CH2- linking rings
      { element: "C", x: -0.7, y: 0.0, z: 0.0 },
      // Thiazolium ring (atoms 10-14)
      { element: "N", x: 0.3, y: 0.9, z: 0.0 },
      { element: "C", x: 1.6, y: 0.5, z: 0.0 },
      { element: "S", x: 1.7, y: -1.2, z: 0.0 },
      { element: "C", x: 0.1, y: -1.3, z: 0.0 },
      { element: "C", x: -0.4, y: -0.1, z: 0.0 },
      // Substituents on thiazole: Methyl on C4
      { element: "C", x: 0.0, y: 2.3, z: 0.0 },
      // Hydroxyethyl chain -CH2-CH2-OH on C5
      { element: "C", x: 2.8, y: 1.3, z: 0.0 },
      { element: "C", x: 4.1, y: 0.5, z: 0.0 },
      { element: "O", x: 5.2, y: 1.3, z: 0.0 },
      { element: "H", x: 6.0, y: 0.9, z: 0.0 },
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [1, 6], [6, 7], [5, 8],
      [2, 9], [9, 10],
      [10, 11], [11, 12], [12, 13], [13, 10],
      [10, 15], [11, 16], [16, 17], [17, 18], [18, 19]
    ],
  },

  // -------------------------------------------------------------
  // 06: VITAMINA B2 (RIBOFLAVINA) - HIDROSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-b2",
    number: "06",
    letter: "B2",
    name: "Vitamina B2",
    chemicalName: "Riboflavina",
    formula: "C₁₇H₂₀N₄O₆",
    formulaAlternative: "C17H20N4O6",
    elementCounts: { C: 17, H: 20, N: 4, O: 6 },
    totalAtoms: 47,
    molecularWeight: "376.37 g/mol",
    classification: "hidrossolúvel",
    classificationGroup: "Hidrossolúveis (Complexo B)",
    functions: [
      "Auxilia na quebra e digestão de carnes, gorduras e carboidratos",
      "Conversão direta de carboidratos em ATP através das coenzimas FMN e FAD",
      "Importante para a saúde das mucosas do corpo",
      "Manutenção da tonalidade saudável e elasticidade da pele",
      "Otimização das funções metabólicas do fígado",
    ],
    avitaminosis: {
      description: "Deficiência é rara, mas afeta tecidos epiteliais de rápida proliferação",
      symptoms: [
        "Queilose e estomatite angular (ruptura e fissuras dolorosas nos cantos dos lábios)",
        "Garganta seca e irritada",
        "Glossite (língua inflamada, avermelhada e dolorosa)",
        "Anemia por deficiência de ferro (a riboflavina auxilia na absorção e mobilização de ferro dos alimentos)",
      ],
    },
    sources: ["Carnes magras e fígado", "Ovos e leite", "Vegetais de folha (repolho, couve, espinafre)"],
    functionalGroups: ["Álcool", "Amina", "Amida"],
    chemicalSvgType: "riboflavin",
    accentColor: "#3a8fc7",
    pubchemCid: 493570,
    symmetriaQuery: "Riboflavin",
    // 3D Isoalloxazine tricyclic ring + ribityl sugar polyol side chain
    atoms: [
      // Benzene ring of isoalloxazine
      { element: "C", x: -4.5, y: 1.2, z: 0.0 },
      { element: "C", x: -3.1, y: 1.2, z: 0.0 },
      { element: "C", x: -2.4, y: 0.0, z: 0.0 },
      { element: "C", x: -3.1, y: -1.2, z: 0.0 },
      { element: "C", x: -4.5, y: -1.2, z: 0.0 },
      { element: "C", x: -5.2, y: 0.0, z: 0.0 },
      // Methyl groups at C7 and C8
      { element: "C", x: -5.2, y: 2.5, z: 0.0 },
      { element: "C", x: -5.2, y: -2.5, z: 0.0 },
      // Pyrazine middle ring
      { element: "N", x: -1.1, y: 1.2, z: 0.0 },
      { element: "C", x: -0.4, y: 0.0, z: 0.0 },
      { element: "N", x: -1.1, y: -1.2, z: 0.0 },
      // Pyrimidine-2,4-dione (uracil-like ring)
      { element: "C", x: 1.0, y: 0.0, z: 0.0 },
      { element: "O", x: 1.6, y: -1.1, z: 0.0 },
      { element: "N", x: 1.7, y: 1.2, z: 0.0 },
      { element: "C", x: 1.0, y: 2.4, z: 0.0 },
      { element: "O", x: 1.6, y: 3.5, z: 0.0 },
      { element: "C", x: -0.4, y: 2.4, z: 0.0 },
      // Ribityl side chain attached to N10 (-1.1, -1.2)
      { element: "C", x: -0.6, y: -2.6, z: 0.0 },
      { element: "C", x: 0.9, y: -2.7, z: 0.2 },
      { element: "O", x: 1.3, y: -3.9, z: -0.4 },
      { element: "C", x: 1.5, y: -2.6, z: 1.6 },
      { element: "O", x: 2.8, y: -2.3, z: 1.4 },
      { element: "C", x: 1.2, y: -4.0, z: 2.3 },
      { element: "O", x: 1.7, y: -3.9, z: 3.6 },
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [0, 6], [4, 7],
      [1, 8], [8, 9], [9, 10], [10, 3], [2, 9],
      [9, 11], [11, 12], [11, 13], [13, 14], [14, 15], [14, 16], [16, 8],
      [10, 17], [17, 18], [18, 19], [18, 20], [20, 21], [20, 22], [22, 23]
    ],
  },

  // -------------------------------------------------------------
  // 07: VITAMINA B6 (PIRIDOXINA) - HIDROSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-b6",
    number: "07",
    letter: "B6",
    name: "Vitamina B6",
    chemicalName: "Piridoxina (Piridoxal / Piridoxamina)",
    formula: "C₈H₁₁NO₃",
    formulaAlternative: "C8H11NO3",
    elementCounts: { C: 8, H: 11, N: 1, O: 3 },
    totalAtoms: 23,
    molecularWeight: "169.18 g/mol",
    classification: "hidrossolúvel",
    classificationGroup: "Hidrossolúveis (Complexo B)",
    functions: [
      "Metabolismo ativo de proteínas, gorduras e carboidratos",
      "Participa como cofator em mais de 100 reações enzimáticas vitais",
      "Essencial para o suporte e resposta do sistema imune",
      "Desenvolvimento do cérebro durante a infância e gravidez",
      "Envolvida diretamente no processo de criação de hemoglobina",
    ],
    avitaminosis: {
      description: "Incomum, mas acarreta desordens neurológicas e hematológicas",
      symptoms: [
        "Neuropatia periférica e dormência nos membros",
        "Depressão, confusão e alterações de humor",
        "Anemia microcítica",
        "Sistema imune enfraquecido e suscetibilidade a infecções",
      ],
    },
    sources: ["Fígado, carnes magras", "Peixe, Leite", "Cereais integrais"],
    functionalGroups: ["Enol", "Amina"],
    chemicalSvgType: "pyridoxine",
    accentColor: "#2a7fc4",
    pubchemCid: 1054,
    symmetriaQuery: "Pyridoxine",
    // 3D Pyridine ring substituted with -OH, -CH3, and two -CH2OH / aldehyde groups
    atoms: [
      // Pyridine ring (atoms 0-5)
      { element: "N", x: -0.6, y: -1.7, z: 0.0 },
      { element: "C", x: 0.7, y: -1.7, z: 0.0 },
      { element: "C", x: 1.4, y: -0.5, z: 0.0 },
      { element: "C", x: 0.7, y: 0.7, z: 0.0 },
      { element: "C", x: -0.7, y: 0.7, z: 0.0 },
      { element: "C", x: -1.4, y: -0.5, z: 0.0 },
      // Enol / Phenolic -OH on C3 (-0.7, 0.7)
      { element: "O", x: -1.4, y: 1.9, z: 0.0 },
      { element: "H", x: -0.8, y: 2.6, z: 0.0 },
      // Hydroxymethyl on C4 (0.7, 0.7)
      { element: "C", x: 1.4, y: 2.0, z: 0.0 },
      { element: "O", x: 2.8, y: 1.9, z: 0.0 },
      { element: "H", x: 3.2, y: 2.7, z: 0.0 },
      // Hydroxymethyl on C5 (1.4, -0.5)
      { element: "C", x: 2.9, y: -0.5, z: 0.0 },
      { element: "O", x: 3.5, y: -1.7, z: 0.0 },
      { element: "H", x: 4.4, y: -1.6, z: 0.0 },
      // Methyl on C2 (-1.4, -0.5)
      { element: "C", x: -2.9, y: -0.5, z: 0.0 },
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [4, 6], [6, 7],
      [3, 8], [8, 9], [9, 10],
      [2, 11], [11, 12], [12, 13],
      [5, 14]
    ],
  },

  // -------------------------------------------------------------
  // 08: VITAMINA B12 (COBALAMINA) - HIDROSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-b12",
    number: "08",
    letter: "B12",
    name: "Vitamina B12",
    chemicalName: "Cobalamina (Cianocobalamina)",
    formula: "C₆₃H₈₈CoN₁₄O₁₄P",
    formulaAlternative: "C63H88CoN14O14P",
    elementCounts: { C: 63, H: 88, Co: 1, N: 14, O: 14, P: 1 },
    totalAtoms: 181,
    molecularWeight: "1355.38 g/mol",
    classification: "hidrossolúvel",
    classificationGroup: "Hidrossolúveis (Complexo B)",
    functions: [
      "Essencial para a saúde, maturação e desenvolvimento das hemácias",
      "Manutenção crítica da integridade da bainha de mielina dos nervos",
      "Ajuda fundamental na síntese e metilação de DNA",
      "Prevenção ativa da anemia perniciosa",
    ],
    avitaminosis: {
      description: "Comum em adultos mais velhos e indivíduos em dietas veganas sem suplementação",
      symptoms: [
        "Dores de cabeça constantes e cefaleia",
        "Fadiga intensa e astenia",
        "Problemas digestivos e anorexia",
        "Danos neurológicos e declínio cognitivo potencialmente irreversível",
      ],
    },
    sources: ["Fígado, carnes e peixes", "Leite e derivados", "Ovos"],
    functionalGroups: ["Nenhum grupo funcional que um aluno do ensino médio deva saber"],
    functionalGroupNote: "Conforme indicado no material didático do trabalho de química, a estrutura organometálica macrocíclica da B12 com anel de corrina e átomo central de cobalto (Co) ultrapassa o escopo de classificação do ensino médio.",
    chemicalSvgType: "cobalamin",
    accentColor: "#7b68ee",
    pubchemCid: 5311498,
    symmetriaQuery: "Cyanocobalamin",
    // 3D Corrin ring with central Cobalt (Co) ion, 4 pyrrolic nitrogens, propionamide side chains
    atoms: [
      // Central Cobalt atom
      { element: "Co", x: 0.0, y: 0.0, z: 0.0 },
      // 4 Coordinating Nitrogens of Corrin Ring
      { element: "N", x: 1.9, y: 0.2, z: 0.0 },
      { element: "N", x: 0.2, y: 1.9, z: 0.0 },
      { element: "N", x: -1.9, y: -0.2, z: 0.0 },
      { element: "N", x: -0.2, y: -1.9, z: 0.0 },
      // Corrin Ring Carbons (Pyrrole Ring 1)
      { element: "C", x: 2.8, y: 1.2, z: 0.2 },
      { element: "C", x: 4.1, y: 0.5, z: 0.3 },
      { element: "C", x: 3.9, y: -0.9, z: 0.1 },
      { element: "C", x: 2.6, y: -1.1, z: -0.1 },
      // Corrin Ring Carbons (Pyrrole Ring 2)
      { element: "C", x: 1.2, y: 2.8, z: 0.2 },
      { element: "C", x: 0.6, y: 4.1, z: 0.3 },
      { element: "C", x: -0.8, y: 3.9, z: 0.1 },
      { element: "C", x: -1.1, y: 2.6, z: -0.1 },
      // Corrin Ring Carbons (Pyrrole Ring 3)
      { element: "C", x: -2.8, y: 1.0, z: -0.1 },
      { element: "C", x: -4.1, y: 0.3, z: -0.2 },
      { element: "C", x: -3.9, y: -1.1, z: -0.1 },
      { element: "C", x: -2.5, y: -1.2, z: 0.1 },
      // Corrin Ring Carbons (Pyrrole Ring 4)
      { element: "C", x: -1.0, y: -2.8, z: 0.1 },
      { element: "C", x: -0.4, y: -4.1, z: 0.2 },
      { element: "C", x: 1.0, y: -3.8, z: 0.1 },
      { element: "C", x: 1.1, y: -2.4, z: -0.1 },
      // Amide periphery groups
      { element: "O", x: 5.3, y: 0.9, z: 0.4 },
      { element: "N", x: 4.5, y: -2.0, z: 0.1 },
      { element: "O", x: 1.0, y: 5.3, z: 0.4 },
      // Lower Axial Nucleotide Base (Dimethylbenzimidazole) & Phosphorus
      { element: "P", x: 0.0, y: -0.8, z: -3.6 },
      { element: "O", x: -1.2, y: -0.7, z: -4.4 },
      { element: "O", x: 1.2, y: -0.7, z: -4.4 },
    ],
    bonds: [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 5], [5, 6], [6, 7], [7, 8], [8, 1],
      [2, 9], [9, 10], [10, 11], [11, 12], [12, 2],
      [3, 13], [13, 14], [14, 15], [15, 16], [16, 3],
      [4, 17], [17, 18], [18, 19], [19, 20], [20, 4],
      [5, 9], [12, 13], [16, 17], [20, 8],
      [6, 21], [7, 22], [10, 23],
      [0, 24], [24, 25], [24, 26]
    ],
  },

  // -------------------------------------------------------------
  // 09: VITAMINA C (ÁCIDO ASCÓRBICO) - HIDROSSOLÚVEL
  // -------------------------------------------------------------
  {
    id: "vitamina-c",
    number: "09",
    letter: "C",
    name: "Vitamina C",
    chemicalName: "Ácido L-ascórbico",
    formula: "C₆H₈O₆",
    formulaAlternative: "C6H8O6",
    elementCounts: { C: 6, H: 8, O: 6 },
    totalAtoms: 20,
    molecularWeight: "176.12 g/mol",
    classification: "hidrossolúvel",
    classificationGroup: "Hidrossolúveis (Vitamina C)",
    functions: [
      "Tem efeito antioxidante de amplo espectro",
      "Fortalece o sistema imune e previne infecções recorrentes",
      "Importante para a saúde dos vasos sanguíneos e endotélio",
      "Essencial para a hidroxilação de prolina e lisina na produção de colágeno",
      "Previne o escorbuto",
    ],
    avitaminosis: {
      description: "Mais comum em fumantes ou pessoas expostas a fumaça, crianças que só tomam leite fervido ou evaporado, e pessoas com problemas de má absorção pelo intestino",
      symptoms: [
        "Escorbuto clássico (sangramento gengival, petéquias e fraqueza capilar)",
        "Dificuldade de cicatrização de feridas",
        "Queda na imunidade celular e infecções frequentes",
        "Dores articulares e fragilidade conjuntiva",
      ],
    },
    sources: [
      "Laranja, Limão e outras frutas cítricas",
      "Morango, tomate, goiaba, caju",
      "Couve, repolho e outros vegetais de folha",
    ],
    functionalGroups: ["Álcool", "Enol", "Éter"],
    chemicalSvgType: "ascorbic_acid",
    accentColor: "#3498db",
    pubchemCid: 54670067,
    symmetriaQuery: "Ascorbic acid",
    // 3D Furanone lactone ring (C1-C4 + O), enediol C2=C3 with OH groups, dihydroxyethyl tail
    atoms: [
      // Furanone Lactone Ring (atoms 0-4)
      { element: "C", x: -0.7, y: 1.0, z: 0.0 }, // C1 carbonyl
      { element: "O", x: -1.7, y: 1.7, z: 0.0 }, // =O carbonyl
      { element: "C", x: 0.6, y: 1.4, z: 0.0 },  // C2 enol
      { element: "O", x: 0.9, y: 2.7, z: 0.0 },  // C2-OH
      { element: "H", x: 1.9, y: 2.8, z: 0.0 },
      { element: "C", x: 1.5, y: 0.3, z: 0.0 },  // C3 enol
      { element: "O", x: 2.8, y: 0.4, z: 0.0 },  // C3-OH
      { element: "H", x: 3.3, y: -0.4, z: 0.0 },
      { element: "C", x: 0.8, y: -1.0, z: 0.0 }, // C4 chiral
      { element: "O", x: -0.6, y: -0.4, z: 0.0 },// Ring Oxygen (lactone ether)
      // Dihydroxyethyl tail attached at C4
      { element: "C", x: 1.2, y: -2.0, z: -1.1 }, // C5
      { element: "O", x: 0.4, y: -3.2, z: -1.0 }, // C5-OH
      { element: "H", x: 0.7, y: -3.9, z: -1.6 },
      { element: "C", x: 2.7, y: -2.3, z: -1.0 }, // C6
      { element: "O", x: 3.1, y: -3.2, z: -0.0 }, // C6-OH
      { element: "H", x: 4.0, y: -3.4, z: -0.0 },
      // Ring hydrogens
      { element: "H", x: 1.1, y: -1.4, z: 0.9 },
    ],
    bonds: [
      [0, 1], [0, 2], [2, 3], [3, 4],
      [2, 5], [5, 6], [6, 7],
      [5, 8], [8, 9], [9, 0],
      [8, 10], [10, 11], [11, 12],
      [10, 13], [13, 14], [14, 15],
      [8, 16]
    ],
  },
];
