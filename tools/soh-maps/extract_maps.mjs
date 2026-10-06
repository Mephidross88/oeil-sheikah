// Cartes des zones (page Carte) : extrait de la ROM d'Ocarina of Time de l'utilisateur la géométrie du sol vue de dessus
// et la position de chaque sortie, et écrit data/maps-data.js. Outil lancé à la main, jamais chargé par l'appli. Le
// fichier produit vient de la ROM : il n'est pas versionné (.gitignore), chacun le régénère depuis sa propre cartouche.
// L'appli sait aussi fabriquer les cartes elle-même (page Carte, « Choisir la ROM… » : gardées dans le navigateur) ; le
// fichier produit ici passe avant elles.
//
// Usage : node tools/soh-maps/extract_maps.mjs <rom .z64> [--mq=<rom Master Quest .z64>]
//   ROM : Ocarina of Time (N64 ou GameCube, compressée ou non) ; --mq : ROM Master Quest (ex. GameCube), pour les
//   donjons Master Quest (scènes « …_MQ » : sol, sorties et checks MQ).
//
// Lecture de la ROM et calcul : js/maps-extract.js (le même que dans l'appli), avec les données tirées des sources de SoH
// (data/maps-recipe.js, tools/soh-maps/gen_maps_recipe.mjs) et celles de l'appli (sorties, checks, logique).
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(HERE, '../..');
const args = process.argv.slice(2), romFile = args.find(a => !a.startsWith('--'));
const opt = k => args.find(a => a.startsWith('--' + k + '='))?.split('=').slice(1).join('=');
if (!romFile){ console.error('Usage : node tools/soh-maps/extract_maps.mjs <rom .z64> [--mq=<rom Master Quest .z64>]'); process.exit(2); }

const ctx = { window:{}, console, setTimeout };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['data/areas-data.js', 'data/checks-data.js', 'data/logic-data.js', 'data/maps-recipe.js', 'js/maps-extract.js'])
  vm.runInContext(fs.readFileSync(path.join(APP, f), 'utf8'), ctx, { filename:f });
vm.runInContext('globalThis.__x = { extractMaps, MAPS_ERR };', ctx);
const { extractMaps, MAPS_ERR } = ctx.__x;

const read = f => new Uint8Array(fs.readFileSync(f));
let res;
try {
  res = await extractMaps({ main:read(romFile), mq:opt('mq') ? read(opt('mq')) : null, recipe:ctx.MAPS_RECIPE, areas:ctx.AREAS_DATA,
    checks:ctx.CHECKS_DATA.checks, logic:ctx.SOH_LOGIC, warn:m => console.warn(m) });
} catch (e){
  if (e.message === MAPS_ERR.NOT_OOT) console.error('ROM non reconnue : table des fichiers introuvable (ROM d’Ocarina of Time ?)');
  else if (e.message === MAPS_ERR.NO_TABLE) console.error('Table des scènes introuvable : version de la ROM non reconnue');
  else throw e;
  process.exit(1);
}
const { data, stats } = res;
const out = `/* Cartes des zones (page Carte) — FICHIER GÉNÉRÉ par tools/soh-maps/extract_maps.mjs depuis la ROM de l'utilisateur
   (non versionné). scenes : { SCÈNE: { bounds:[x0, z0, x1, z1], y:[min, max], floors:[x1, z1, x2, z2, x3, z3, hauteur, …],
   walls:[x1, z1, x2, z2, …], et pour les donjons wallsY:[bas, haut, …], kind:'dungeon'|'boss', mq?:1, levels?:[{ n:'2F',
   min: hauteur }] } } (coordonnées du jeu, vue de dessus, z vers le sud ; scène « …_MQ » : version Master Quest) ;
   exits : { 'zone::sortie': [scène, x, z, hauteur, porte?] } (porte : sortie située dans un intérieur, placée à sa porte) ;
   checks : { id: [scène, x, z, hauteur?] } (scènes d'extérieur et donjons vanilla) ; places : { id: sortie où l'on apparaît
   en entrant dans le lieu du check } (intérieur, grotte, donjon : placé à la porte qui y mène selon les entrées notées) ;
   areaEntry : { zone de donjon: sortie d'entrée } ; exitsMq, checksMq : de même dans les scènes Master Quest ; exitRot : { sortie:
   orientation de Link à son point d'apparition (angle du jeu, 0 = vers le sud) }. */
window.MAPS_DATA = ${JSON.stringify(data)};
`;
const file = path.join(APP, 'data/maps-data.js');
fs.writeFileSync(file, out);
if (stats.mq) console.log(`Master Quest : ${stats.exitsMq} sorties, ${stats.checksMq} checks placés`);
if (stats.manual) console.log(`${stats.manual} checks placés d'après positions.json (notés en jouant)`);
console.log(`${stats.scenes} scènes (${stats.triangles} triangles de sol), ${stats.exits} sorties placées, écrit dans ${file} (${Math.round(out.length / 1024)} Ko)`);
console.log(`Checks : ${stats.checks} placés en extérieur, ${stats.places} rattachés à leur lieu (intérieur, grotte, donjon), ${Object.values(stats.unplaced).flat().length} sans position :`,
  Object.entries(stats.unplaced).map(([k, l]) => k + ' ' + l.length).join(', '));
console.log('Sorties sans position (hors scènes d\'extérieur) :', Object.entries(stats.missingByArea).map(([a, l]) => a + ' ' + l.length).join(', '));
