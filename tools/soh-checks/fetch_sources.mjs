// Télécharge dans ./src les sources de Ship of Harkinian nécessaires à l'extraction des checks, au commit voulu.
// Usage : node fetch_sources.mjs [commit]   (défaut : cb71e22, SoH 9.2.3 « Ackbar Delta »)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const COMMIT = process.argv[2] || 'cb71e22';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(HERE, 'src');
const RANDO = 'soh/soh/Enhancements/randomizer/';
const RAW = `https://raw.githubusercontent.com/HarbourMasters/Shipwright/${COMMIT}/`;

const tree = await (await fetch(`https://api.github.com/repos/HarbourMasters/Shipwright/git/trees/${COMMIT}?recursive=1`)).json();
if (!tree.tree) throw new Error('Arbre introuvable pour ' + COMMIT + ' : ' + JSON.stringify(tree).slice(0, 200));
const wanted = tree.tree.map(e => e.path).filter(p =>
  p.startsWith(RANDO + 'location_access/') && p.endsWith('.cpp') ||
  /^soh\/soh\/Enhancements\/randomizer\/(location_list|location|fishsanity|randomizer_check_objects|Shuffle[A-Za-z]+)\.cpp$/.test(p) ||
  // logique (tools/soh-logic) : régions, fonctions de logique, entrées, options
  /^soh\/soh\/Enhancements\/randomizer\/(location_access|logic|entrance|settings|randomizer_entrance_tracker)\.(cpp|h)$/.test(p) ||
  // moteur d'exploration (recherche des checks accessibles) : fill.cpp et le tracker de checks
  /^soh\/soh\/Enhancements\/randomizer\/(3drando\/fill|randomizer_check_tracker)\.(cpp|hpp|h)$/.test(p) ||
  /^soh\/soh\/Enhancements\/randomizer\/(RandomizerOptions|randomizerTypes|dungeon)\.h$/.test(p));
wanted.push('soh/soh/util.cpp', 'soh/soh/Enhancements/randomizer/randomizerEnums/RandomizerOptions.h',
  // entrées : numéros ENTR_* (table des entrées du jeu) et décalages des grottes
  'soh/include/tables/entrance_table.h', 'soh/soh/Enhancements/randomizer/randomizerEnums/RandomizerMiscEnums.h',
  // auto-tracking (tools/soh-link) : numéros des checks (RC) et des objets (RG) envoyés par le jeu
  'soh/soh/Enhancements/randomizer/randomizerEnums/RandomizerCheck.h', 'soh/soh/Enhancements/randomizer/randomizerEnums/RandomizerGet.h',
  'soh/soh/Enhancements/randomizer/randomizerEnums/RandomizerInf.h',
  // noms français des objets et numéros GetItemID (objets reçus)
  'soh/soh/Enhancements/randomizer/item_list.cpp', 'soh/include/z64item.h',
  // grottes : entrées génériques et positions de retour (auto-tracking des entrées)
  'soh/soh/Enhancements/randomizer/randomizer_grotto.c');

for (const p of wanted){
  const dest = path.join(SRC, p.startsWith(RANDO) ? p.slice(RANDO.length) : path.basename(p));
  fs.mkdirSync(path.dirname(dest), { recursive:true });
  const res = await fetch(RAW + p);
  if (!res.ok) throw new Error(`${p} : HTTP ${res.status}`);
  fs.writeFileSync(dest, await res.text());
}
console.log(`${wanted.length} fichiers SoH (${COMMIT}) téléchargés dans ${SRC}`);
