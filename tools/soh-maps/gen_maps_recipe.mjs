// Données de fabrication des cartes tirées des sources de SoH (aucune donnée de la ROM) : data/maps-recipe.js, versionné et
// publié avec l'appli, lu par js/maps-extract.js (cartes fabriquées dans l'appli depuis la ROM du joueur, ou par
// tools/soh-maps/extract_maps.mjs). Outil lancé à la main, à relancer après une montée de version de SoH ou une
// modification de positions.json / positions-manuelles.json.
// Usage : node tools/soh-maps/gen_maps_recipe.mjs   (sources : tools/soh-checks/src, fetch_sources.mjs)
//
// Contenu : scènes de SoH (ordre = numéro, scene_table.h) ; entrées (entrance_table.h : numéro → scène, point d'apparition) ;
// points de retour des grottes (randomizer_grotto.c) ; étages des donjons (z_map_data.c) ; numéros des acteurs
// (actor_table.h) et des objets des décors mobiles (object_table.h) ; définition des checks (location_list.cpp,
// fishsanity.cpp, Shuffle*.cpp : genre, scène, acteur, paramètres, version) ; positions notées en jouant (positions.json)
// ou placées sur la Carte (positions-manuelles.json, l'emporte).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(HERE, '../..'), SRC = path.join(APP, 'tools/soh-checks/src');
const src = f => fs.readFileSync(path.join(SRC, f), 'utf8');
if (!fs.existsSync(SRC)){ console.error('Sources de SoH absentes : node tools/soh-checks/fetch_sources.mjs'); process.exit(2); }

const scenes = [...src('scene_table.h').matchAll(/DEFINE_SCENE\(\w+,\s*\w+,\s*(SCENE_\w+)/g)].map(m => m[1]);
const sceneIdx = Object.fromEntries(scenes.map((s, i) => [s, i]));
// entrées : entr[numéro] = [numéro de scène, point d'apparition]
const entr = [], entrIdx = {};
for (const m of src('entrance_table.h').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ENTRANCE\((\w+),\s*(\w+),\s*(\d+)/g)){
  const n = parseInt(m[1], 16);
  entr[n] = [sceneIdx[m[3]], +m[4]];
  entrIdx[m[2]] = n;
}
for (let i = 0; i < entr.length; i++) if (!entr[i]) entr[i] = null;
// grottes : point de retour de la grotte i (sortie 0x800 + i) = [scène, x, y, z]
const grottoSrc = src('randomizer_grotto.c');
const grottoTable = grottoSrc.slice(grottoSrc.indexOf('grottoReturnTable'), grottoSrc.indexOf('};', grottoSrc.indexOf('grottoReturnTable')));
const grottoReturn = [...grottoTable.matchAll(/\.entranceIndex\s*=\s*(ENTR_\w+)[^}]*?\.pos\s*=\s*\{\s*\.x\s*=\s*(-?[\d.]+)f,\s*\.y\s*=\s*(-?[\d.]+)f,\s*\.z\s*=\s*(-?[\d.]+)f/g)]
  .map(m => [scenes[entr[entrIdx[m[1]]][0]], +m[2], +m[3], +m[4]]);
// étages des dix donjons de la carte du menu pause (sFloorCoordY = hauteur au-dessus de laquelle on est à cet étage,
// sFloorID = nom ; donjon i = scène i)
const levels = {};
{
  const s = src('z_map_data.c');
  const table = name => { const t = s.slice(s.indexOf(name)); return t.slice(t.indexOf('{') + 1, t.indexOf('};')).split(/\}\s*,?/).map(r => r.replace(/[{\s]|\/\*.*?\*\//g, '')).filter(r => r).map(r => r.split(',').filter(x => x)); };
  const ys = table('sFloorCoordY[10][8]'), ids = table('sFloorID[10][8]');
  ids.forEach((row, d) => {
    const lv = row.map((id, i) => id !== '0' ? { n:id.replace('F_', ''), min:parseFloat(ys[d][i]) } : null).filter(Boolean);
    if (lv.length > 1) levels[scenes[d]] = lv;
  });
}
const actors = {};
for (const m of src('actor_table.h').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ACTOR\w*\(\w+,\s*(ACTOR_\w+)/g)) actors[m[2]] = parseInt(m[1], 16);
// objets des décors mobiles dont le sol compte (voir DYNA de js/maps-extract.js)
const objects = {};
for (const m of src('object_table.h').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_OBJECT\w*\((?:\w+,\s*)?(OBJECT_\w+)/g))
  if (/^OBJECT_MORI_HINERI[12]$/.test(m[2])) objects[m[2]] = parseInt(m[1], 16);
// checks : loc[RC] = [genre, scène, acteur, deux paramètres de position ou null, paramètres ou null, version]
const loc = {};
for (const f of fs.readdirSync(SRC).filter(f => /^(location_list|fishsanity|Shuffle\w+)\.cpp$/.test(f))){
  for (const m of src(f).matchAll(/locationTable\[(RC_\w+)\]\s*=\s*Location::(\w+)\(([^;]*?)\);/gs)){
    const args = m[3].replace(/\s+/g, ' '), scene = (args.match(/\b(SCENE_\w+)/) || [])[1], actor = (args.match(/\b(ACTOR_\w+)/) || [])[1];
    const after = scene ? args.slice(args.indexOf(scene) + scene.length) : '';
    const two = after.match(/^\s*,\s*TWO_ACTOR_PARAMS\((-?\d+),\s*(-?\d+)\)/), num = after.match(/^\s*,\s*(-?(?:0x[0-9A-Fa-f]+|\d+))/);
    loc[m[1]] = [m[2], scene || null, actor || null, two ? [+two[1], +two[2]] : null, num ? Number(num[1]) & 0xFFFF : null,
      (args.match(/\bRCQUEST_(\w+)/) || [])[1] || null];
  }
}
const manual = {};
for (const f of ['positions.json', 'positions-manuelles.json']){ const p = path.join(HERE, f); if (fs.existsSync(p)) Object.assign(manual, JSON.parse(fs.readFileSync(p, 'utf8'))); }

const recipe = { scenes, entr, grottoReturn, levels, actors, objects, loc, manual };
const out = `/* Fabrication des cartes (page Carte) — FICHIER GÉNÉRÉ par tools/soh-maps/gen_maps_recipe.mjs depuis les sources de
   Ship of Harkinian (aucune donnée de la ROM) ; lu par js/maps-extract.js. scenes : scènes de SoH (index = numéro) ;
   entr[numéro d'entrée] : [scène, point d'apparition] ; grottoReturn[i] : [scène, x, y, z] (sortie 0x800 + i) ; levels :
   { scène: [{ n, min }] } ; actors / objects : numéros ; loc : { RC: [genre, scène, acteur, [x, z] ou null, paramètres,
   version] } ; manual : positions notées en jouant ou placées sur la Carte { id: { scene, x, y, z } }. */
window.MAPS_RECIPE = ${JSON.stringify(recipe)};
`;
const file = path.join(APP, 'data/maps-recipe.js');
fs.writeFileSync(file, out);
console.log(`${scenes.length} scènes, ${entr.filter(Boolean).length} entrées, ${Object.keys(loc).length} définitions de checks, ${Object.keys(manual).length} positions notées → ${path.relative(APP, file)} (${Math.round(out.length / 1024)} Ko)`);
