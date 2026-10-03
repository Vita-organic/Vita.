const fs = require('fs');
const path = require('path');
const https = require('https');

const VITAMINS_2D = [
  { id: 'vitamina-a', cid: 445354, name: 'Vitamina A (Retinol)', svgType: 'retinol' },
  { id: 'vitamina-d', cid: 5280795, name: 'Vitamina D (Colecalciferol)', svgType: 'calciferol' },
  { id: 'vitamina-e', cid: 14985, name: 'Vitamina E (alpha-Tocopherol)', svgType: 'tocopherol' },
  { id: 'vitamina-k', cid: 5280483, name: 'Vitamina K (Filoquinona)', svgType: 'phylloquinone' },
  { id: 'vitamina-b1', cid: 1130, name: 'Vitamina B1 (Tiamina)', svgType: 'thiamine' },
  { id: 'vitamina-b2', cid: 493570, name: 'Vitamina B2 (Riboflavina)', svgType: 'riboflavin' },
  { id: 'vitamina-b6', cid: 1054, name: 'Vitamina B6 (Piridoxina)', svgType: 'pyridoxine' },
  { id: 'vitamina-b12', cid: 166596686, name: 'Vitamina B12 (Cianocobalamina)', svgType: 'cobalamin' },
  { id: 'vitamina-c', cid: 54670067, name: 'Vitamina C (Ácido L-ascórbico)', svgType: 'ascorbic_acid' },
];

function fetchWithRetry(url, retries = 3) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchWithRetry(res.headers.location, retries));
      }
      if (res.statusCode === 503 && retries > 0) {
        console.log(`  503 Rate limit, retrying in 1s (${retries} left)...`);
        return setTimeout(() => resolve(fetchWithRetry(url, retries - 1)), 1000);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => {
      if (retries > 0) {
        setTimeout(() => resolve(fetchWithRetry(url, retries - 1)), 1000);
      } else {
        reject(err);
      }
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Downloading 2D SDFs from PubChem...');
  const cacheDir = path.join(__dirname, '2d-sdf');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

  for (const v of VITAMINS_2D) {
    const filePath = path.join(cacheDir, `${v.id}.sdf`);
    if (fs.existsSync(filePath)) {
      console.log(`Using cached ${v.name}`);
      continue;
    }

    console.log(`Fetching 2D SDF for ${v.name} (CID ${v.cid})...`);
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${v.cid}/SDF`;
    try {
      const sdf = await fetchWithRetry(url);
      fs.writeFileSync(filePath, sdf, 'utf8');
      console.log(`  -> Saved ${v.name} (${sdf.length} bytes)`);
    } catch (e) {
      console.error(`  Error fetching ${v.name}:`, e.message);
    }
    await sleep(400); // Respect PubChem rate limits
  }

  console.log('Done downloading 2D SDFs!');
}

run();
