const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'complete-molecules.json'), 'utf8'));

let ts = `/* AUTO-GERADO por scripts/build-molecules.js — Estruturas 3D reais (PubChem / RCSB PDB) */

export type Atom3D = { element: "C" | "H" | "O" | "N" | "P" | "S" | "Co"; x: number; y: number; z: number };
export type Bond3D = [number, number] | [number, number, number];

export const MOLECULES_3D: Record<string, { atoms: Atom3D[]; bonds: Bond3D[] }> = {
`;

for (const [id, mol] of Object.entries(data)) {
  ts += `  "${id}": {\n`;
  ts += `    atoms: ${JSON.stringify(mol.atoms)},\n`;
  ts += `    bonds: ${JSON.stringify(mol.bonds)},\n`;
  ts += `  },\n`;
}

ts += `};\n`;

const targetPath = path.join(__dirname, '..', 'data', 'molecules3d.ts');
fs.writeFileSync(targetPath, ts, 'utf8');
console.log('Successfully wrote data/molecules3d.ts with all 9 complete molecules!');
