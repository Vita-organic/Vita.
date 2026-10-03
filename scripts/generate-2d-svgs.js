const fs = require('fs');
const path = require('path');

const VITAMINS = [
  { id: 'vitamina-a', type: 'retinol', name: 'Vitamina A (Retinol)' },
  { id: 'vitamina-d', type: 'calciferol', name: 'Vitamina D (Colecalciferol)' },
  { id: 'vitamina-e', type: 'tocopherol', name: 'Vitamina E (alpha-Tocopherol)' },
  { id: 'vitamina-k', type: 'phylloquinone', name: 'Vitamina K (Filoquinona)' },
  { id: 'vitamina-b1', type: 'thiamine', name: 'Vitamina B1 (Tiamina)' },
  { id: 'vitamina-b2', type: 'riboflavin', name: 'Vitamina B2 (Riboflavina)' },
  { id: 'vitamina-b6', type: 'pyridoxine', name: 'Vitamina B6 (Piridoxina)' },
  { id: 'vitamina-b12', type: 'cobalamin', name: 'Vitamina B12 (Cianocobalamina)' },
  { id: 'vitamina-c', type: 'ascorbic_acid', name: 'Vitamina C (Ácido L-ascórbico)' },
];

function parse2dSdf(sdfContent) {
  const lines = sdfContent.split(/\r?\n/);
  const countsLine = lines[3];
  const atomCount = parseInt(countsLine.substring(0, 3).trim(), 10);
  const bondCount = parseInt(countsLine.substring(3, 6).trim(), 10);

  const atoms = [];
  for (let i = 4; i < 4 + atomCount; i++) {
    const l = lines[i];
    const x = parseFloat(l.substring(0, 10).trim());
    const y = parseFloat(l.substring(10, 20).trim());
    const element = l.substring(31, 34).trim();
    atoms.push({ id: i - 4, x, y, element, bonds: [] });
  }

  const bonds = [];
  const bondStart = 4 + atomCount;
  for (let i = bondStart; i < bondStart + bondCount; i++) {
    const l = lines[i];
    if (!l.trim()) continue;
    const a1 = parseInt(l.substring(0, 3).trim(), 10) - 1;
    const a2 = parseInt(l.substring(3, 6).trim(), 10) - 1;
    const order = parseInt(l.substring(6, 9).trim(), 10);
    const stereo = parseInt(l.substring(9, 12).trim(), 10);

    const b = { a1, a2, order, stereo };
    bonds.push(b);
    atoms[a1].bonds.push({ target: a2, order, stereo });
    atoms[a2].bonds.push({ target: a1, order, stereo });
  }

  return { atoms, bonds };
}

function generateSvgComponentCode(vMeta, parsed) {
  const { atoms, bonds } = parsed;

  // Filter heavy atoms
  const heavyAtoms = atoms.filter(a => a.element !== 'H');
  const heavyIds = new Set(heavyAtoms.map(a => a.id));

  // Determine labels for heteroatoms
  const labels = {};
  for (const atom of heavyAtoms) {
    if (atom.element === 'C') continue; // implicit carbon vertices

    // Check attached hydrogens
    const hBonds = atom.bonds.filter(b => atoms[b.target].element === 'H');
    const hCount = hBonds.length;
    const neighborHeavy = atom.bonds.find(b => atoms[b.target].element !== 'H');

    let text = atom.element;
    if (atom.element === 'O') {
      if (hCount > 0) {
        // Decide HO vs OH based on position of attached carbon
        if (neighborHeavy && atoms[neighborHeavy.target].x > atom.x + 0.1) {
          text = 'HO';
        } else {
          text = 'OH';
        }
      } else {
        text = 'O';
      }
    } else if (atom.element === 'N') {
      if (hCount === 2) text = 'NH₂';
      else if (hCount === 1) text = 'NH';
      else text = 'N';
    } else if (atom.element === 'S') {
      text = 'S';
    } else if (atom.element === 'P') {
      text = 'P';
    } else if (atom.element === 'Co') {
      text = 'Co';
    }

    labels[atom.id] = text;
  }

  // Filter bonds between heavy atoms
  const heavyBonds = bonds.filter(b => heavyIds.has(b.a1) && heavyIds.has(b.a2));

  // Compute bounding box of heavy atoms
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const a of heavyAtoms) {
    if (a.x < minX) minX = a.x;
    if (a.x > maxX) maxX = a.x;
    if (a.y < minY) minY = a.y;
    if (a.y > maxY) maxY = a.y;
  }

  // Target SVG dimensions
  const padding = 20;
  const targetW = 340;
  const targetH = 170;

  const rawW = maxX - minX || 1;
  const rawH = maxY - minY || 1;

  // Scale to fit target dimensions while preserving aspect ratio
  const scale = Math.min((targetW - padding * 2) / rawW, (targetH - padding * 2) / rawH);

  // Center in target viewbox
  const scaledW = rawW * scale;
  const scaledH = rawH * scale;
  const offsetX = (targetW - scaledW) / 2 - minX * scale;
  // Invert Y axis: PubChem Y is upwards, SVG Y is downwards
  const offsetY = (targetH - scaledH) / 2 + maxY * scale;

  const transformX = (x) => Math.round((x * scale + offsetX) * 10) / 10;
  const transformY = (y) => Math.round((-y * scale + offsetY) * 10) / 10;

  // Prepare SVG elements
  const svgLines = [];

  for (const b of heavyBonds) {
    const a1 = atoms[b.a1];
    const a2 = atoms[b.a2];

    let x1 = transformX(a1.x);
    let y1 = transformY(a1.y);
    let x2 = transformX(a2.x);
    let y2 = transformY(a2.y);

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;

    // Shorten bond if endpoint has text label
    const hasLabel1 = labels[a1.id];
    const hasLabel2 = labels[a2.id];

    if (hasLabel1) {
      const trim = hasLabel1.length > 2 ? 14 : 9;
      x1 += ux * trim;
      y1 += uy * trim;
    }
    if (hasLabel2) {
      const trim = hasLabel2.length > 2 ? 14 : 9;
      x2 -= ux * trim;
      y2 -= uy * trim;
    }

    x1 = Math.round(x1 * 10) / 10;
    y1 = Math.round(y1 * 10) / 10;
    x2 = Math.round(x2 * 10) / 10;
    y2 = Math.round(y2 * 10) / 10;

    if (b.order === 1) {
      if (b.stereo === 1) {
        // Wedge bond (stereochemistry)
        const perpX = -uy * 3.5;
        const perpY = ux * 3.5;
        const p1 = `${x1},${y1}`;
        const p2 = `${Math.round((x2 + perpX)*10)/10},${Math.round((y2 + perpY)*10)/10}`;
        const p3 = `${Math.round((x2 - perpX)*10)/10},${Math.round((y2 - perpY)*10)/10}`;
        svgLines.push(`<polygon points="${p1} ${p2} ${p3}" fill="currentColor" />`);
      } else if (b.stereo === 6) {
        // Dash bond
        svgLines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />`);
      } else {
        // Clean single line
        svgLines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />`);
      }
    } else if (b.order === 2) {
      // Double bond: two parallel lines
      const perpX = -uy * 2.2;
      const perpY = ux * 2.2;
      const lx1 = Math.round((x1 + perpX) * 10) / 10;
      const ly1 = Math.round((y1 + perpY) * 10) / 10;
      const lx2 = Math.round((x2 + perpX) * 10) / 10;
      const ly2 = Math.round((y2 + perpY) * 10) / 10;

      const rx1 = Math.round((x1 - perpX) * 10) / 10;
      const ry1 = Math.round((y1 - perpY) * 10) / 10;
      const rx2 = Math.round((x2 - perpX) * 10) / 10;
      const ry2 = Math.round((y2 - perpY) * 10) / 10;

      svgLines.push(`<line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />`);
      svgLines.push(`<line x1="${rx1}" y1="${ry1}" x2="${rx2}" y2="${ry2}" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />`);
    } else if (b.order === 3) {
      // Triple bond
      const perpX = -uy * 3.0;
      const perpY = ux * 3.0;
      svgLines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />`);
      svgLines.push(`<line x1="${Math.round((x1+perpX)*10)/10}" y1="${Math.round((y1+perpY)*10)/10}" x2="${Math.round((x2+perpX)*10)/10}" y2="${Math.round((y2+perpY)*10)/10}" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />`);
      svgLines.push(`<line x1="${Math.round((x1-perpX)*10)/10}" y1="${Math.round((y1-perpY)*10)/10}" x2="${Math.round((x2-perpX)*10)/10}" y2="${Math.round((y2-perpY)*10)/10}" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />`);
    }
  }

  // Atom text labels for heteroatoms
  const textElements = [];
  for (const [atomIdStr, labelText] of Object.entries(labels)) {
    const atom = atoms[parseInt(atomIdStr, 10)];
    const cx = transformX(atom.x);
    const cy = transformY(atom.y);
    textElements.push(
      `<text x="${cx}" y="${cy}" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">${labelText}</text>`
    );
  }

  return {
    viewBox: `0 0 ${targetW} ${targetH}`,
    content: [...svgLines, ...textElements].join('\n          ')
  };
}

function main() {
  console.log('Generating 2D SVGs for all 9 vitamins from PubChem coordinates...');
  const cacheDir = path.join(__dirname, '2d-sdf');

  const svgs = {};
  for (const v of VITAMINS) {
    const sdfFile = path.join(cacheDir, `${v.id}.sdf`);
    const sdfContent = fs.readFileSync(sdfFile, 'utf8');
    const parsed = parse2dSdf(sdfContent);
    const svg = generateSvgComponentCode(v, parsed);
    svgs[v.type] = svg;
    console.log(`  -> Generated SVG for ${v.name}`);
  }

  // Generate ChemicalSkeletalSvg.tsx
  let code = `"use client";\n\nimport React from "react";\n\ninterface ChemicalSkeletalSvgProps {\n  type: string;\n  className?: string;\n}\n\nexport const ChemicalSkeletalSvg: React.FC<ChemicalSkeletalSvgProps> = ({\n  type,\n  className = "w-full h-auto",\n}) => {\n  switch (type) {\n`;

  for (const [typeKey, svg] of Object.entries(svgs)) {
    code += `    case "${typeKey}":\n`;
    code += `      return (\n`;
    code += `        <svg viewBox="${svg.viewBox}" fill="none" className={className}>\n`;
    code += `          ${svg.content}\n`;
    code += `        </svg>\n`;
    code += `      );\n\n`;
  }

  code += `    default:\n      return null;\n  }\n};\n`;

  const targetPath = path.join(__dirname, '..', 'components', 'ChemicalSkeletalSvg.tsx');
  fs.writeFileSync(targetPath, code, 'utf8');
  console.log(`\nSuccessfully updated ${targetPath} with exact PubChem 2D skeletal structures!`);
}

main();
