const fs = require('fs');
const path = require('path');
const https = require('https');

const VITAMINS_META = [
  { id: 'vitamina-a', source: 'pubchem', cid: 445354, name: 'Vitamina A (Retinol)' },
  { id: 'vitamina-d', source: 'pubchem', cid: 5280795, name: 'Vitamina D (Colecalciferol)' },
  { id: 'vitamina-e', source: 'pubchem', cid: 14985, name: 'Vitamina E (alpha-Tocopherol)' },
  { id: 'vitamina-k', source: 'pubchem', cid: 5280483, name: 'Vitamina K (Filoquinona)' },
  { id: 'vitamina-b1', source: 'pubchem', cid: 1130, name: 'Vitamina B1 (Tiamina)' },
  { id: 'vitamina-b2', source: 'pubchem', cid: 493570, name: 'Vitamina B2 (Riboflavina)' },
  { id: 'vitamina-b6', source: 'pubchem', cid: 1054, name: 'Vitamina B6 (Piridoxina)' },
  { id: 'vitamina-b12', source: 'rcsb', ligand: 'CNC', name: 'Vitamina B12 (Cianocobalamina)' },
  { id: 'vitamina-c', source: 'pubchem', cid: 54670067, name: 'Vitamina C (Ácido L-ascórbico)' },
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: status ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseSdf(sdfText, isRcsb = false) {
  const lines = sdfText.split(/\r?\n/);
  // Counts line is line index 3
  const countsLine = lines[3];
  const atomCount = parseInt(countsLine.substring(0, 3).trim(), 10);
  const bondCount = parseInt(countsLine.substring(3, 6).trim(), 10);

  const rawAtoms = [];
  let cx = 0, cy = 0, cz = 0;

  for (let i = 4; i < 4 + atomCount; i++) {
    const line = lines[i];
    const x = parseFloat(line.substring(0, 10).trim());
    const y = parseFloat(line.substring(10, 20).trim());
    const z = parseFloat(line.substring(20, 30).trim());
    let element = line.substring(31, 34).trim();
    if (element === 'CO' || element === 'Co') element = 'Co';
    else element = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();

    cx += x;
    cy += y;
    cz += z;

    rawAtoms.push({ element, x, y, z });
  }

  cx /= atomCount;
  cy /= atomCount;
  cz /= atomCount;

  // Center coordinates and round to 3 decimals
  const atoms = rawAtoms.map(a => ({
    element: a.element,
    x: Math.round((a.x - cx) * 1000) / 1000,
    y: Math.round((a.y - cy) * 1000) / 1000,
    z: Math.round((a.z - cz) * 1000) / 1000,
  }));

  const bonds = [];
  const bondStart = 4 + atomCount;
  for (let i = bondStart; i < bondStart + bondCount; i++) {
    const line = lines[i];
    if (!line) continue;
    const a1 = parseInt(line.substring(0, 3).trim(), 10) - 1; // 0-indexed
    const a2 = parseInt(line.substring(3, 6).trim(), 10) - 1;
    if (a1 >= 0 && a1 < atomCount && a2 >= 0 && a2 < atomCount) {
      bonds.push([a1, a2]);
    }
  }

  return { atoms, bonds, atomCount, bondCount };
}

async function main() {
  console.log('Fetching official 3D structures from PubChem and RCSB PDB...');
  const results = {};

  for (const meta of VITAMINS_META) {
    console.log(`Fetching ${meta.name}...`);
    let sdfText;
    if (meta.source === 'pubchem') {
      const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${meta.cid}/SDF?record_type=3d`;
      sdfText = await fetchUrl(url);
    } else {
      const url = `https://files.rcsb.org/ligands/view/${meta.ligand}_ideal.sdf`;
      sdfText = await fetchUrl(url);
    }

    const parsed = parseSdf(sdfText, meta.source === 'rcsb');
    results[meta.id] = parsed;

    // Element count check
    const counts = {};
    parsed.atoms.forEach(a => {
      counts[a.element] = (counts[a.element] || 0) + 1;
    });

    console.log(`  -> ${meta.name}: ${parsed.atoms.length} atoms, ${parsed.bonds.length} bonds. Elements:`, counts);
  }

  // Save parsed structures to JSON for vitamins.ts updater
  const outputPath = path.join(__dirname, 'complete-molecules.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nSuccessfully saved complete 3D structures to ${outputPath}!`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
