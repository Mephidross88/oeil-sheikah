// Exécutables autonomes du relais d'auto-tracking (relay.mjs), pour jouer sans installer Node.js : compilés par Bun
// (https://bun.sh, à installer pour lancer ce script), une version par système, dans dist/ (non versionné). Lancé par le
// workflow GitHub .github/workflows/relay.yml, qui les publie dans une release.
// Usage : node tools/soh-link/build_relay.mjs [windows] [linux] [mac]   (sans argument : tous)
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
// x64 « baseline » : processeurs sans AVX2 compris
const TARGETS = {
  windows:[['bun-windows-x64-baseline', 'oeil-sheikah-relais-windows.exe']],
  linux:[['bun-linux-x64-baseline', 'oeil-sheikah-relais-linux']],
  mac:[['bun-darwin-arm64', 'oeil-sheikah-relais-mac-arm64'], ['bun-darwin-x64', 'oeil-sheikah-relais-mac-intel']],
};
const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(TARGETS);
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive:true });
for (const os of want){
  if (!TARGETS[os]) throw new Error('Système inconnu : ' + os + ' (windows, linux, mac)');
  for (const [target, out] of TARGETS[os]){
    console.log('→ dist/' + out);
    execFileSync('bun', ['build', '--compile', '--minify', '--target=' + target, 'tools/soh-link/relay.mjs', '--outfile', 'dist/' + out],
      { cwd:ROOT, stdio:'inherit' });
  }
}
