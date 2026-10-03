import { MOLECULES_3D, Atom3D, Bond3D } from "./molecules3d";

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
  atoms: Atom3D[];
  bonds: Bond3D[];
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-a"].atoms,
    bonds: MOLECULES_3D["vitamina-a"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-d"].atoms,
    bonds: MOLECULES_3D["vitamina-d"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-e"].atoms,
    bonds: MOLECULES_3D["vitamina-e"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-k"].atoms,
    bonds: MOLECULES_3D["vitamina-k"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-b1"].atoms,
    bonds: MOLECULES_3D["vitamina-b1"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-b2"].atoms,
    bonds: MOLECULES_3D["vitamina-b2"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-b6"].atoms,
    bonds: MOLECULES_3D["vitamina-b6"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-b12"].atoms,
    bonds: MOLECULES_3D["vitamina-b12"].bonds,
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
    // Estrutura 3D real (PubChem / RCSB) — ver data/molecules3d.ts
    atoms: MOLECULES_3D["vitamina-c"].atoms,
    bonds: MOLECULES_3D["vitamina-c"].bonds,
  },
];
