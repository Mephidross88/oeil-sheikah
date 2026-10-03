// Génère data/link-data.js (auto-tracking) depuis les énumérations de SoH (tools/soh-checks/src, voir fetch_sources.mjs).
// Usage : node tools/soh-link/gen_link_data.mjs
//   randInf : numéro des drapeaux du randomizer (RandomizerInf) utiles au panneau Objets (capacités, touches d'ocarina,
//             âmes, clés des portes, objets d'échange, objets « obtenus », bourse, améliorations infinies…) ;
//             le jeu les envoie en bits dans ship.randomizerInf (mots de 16 bits).
//   rg      : noms des objets du randomizer (RandomizerGet), par numéro (journal : objet reçu).
import fs from 'fs';

const SRC = new URL('../soh-checks/src/randomizerEnums/', import.meta.url);
const OUT = new URL('../../data/link-data.js', import.meta.url);
function enumItems(file, name){
  const s = fs.readFileSync(new URL(file, SRC), 'utf8');
  const body = s.slice(s.indexOf(`RANDO_ENUM_BEGIN(${name}`), s.indexOf(`RANDO_ENUM_END(${name}`));
  return [...body.matchAll(/RANDO_ENUM_ITEM\(([A-Z0-9_]+)\)/g)].map(m => m[1]);
}
const inf = enumItems('RandomizerInf.h', 'RandomizerInf');
const KEEP = /^RAND_INF_(HAS_|CAN_|[A-Z_]+_SOUL$|[A-Z_]+_KEY_OBTAINED$|CHILD_TRADES_HAS_|ADULT_TRADES_HAS_|OBTAINED_|GREG_FOUND$|FISHING_POLE_FOUND$)/;
const randInf = {};
inf.forEach((n, i) => { if (KEEP.test(n)) randInf[n.slice('RAND_INF_'.length)] = i; });
const rg = enumItems('RandomizerGet.h', 'RandomizerGet').map(n => n.replace(/^RG_/, ''));
const RG_NUM = Object.fromEntries(rg.map((n, i) => ['RG_' + n, i]));

// Numéros GetItemID (z64item.h, énumération des GI_* : commentaires /* 0x.. */ */)
const z64 = fs.readFileSync(new URL('../soh-checks/src/z64item.h', import.meta.url), 'utf8');
const GI = {};
for (const m of z64.matchAll(/\/\*\s*(0x[0-9A-Fa-f]+)\s*\*\/\s*(GI_[A-Z0-9_]+)/g)) GI[m[2]] = parseInt(m[1], 16);

// item_list.cpp : nom français de chaque objet, et numéro d'objet du jeu (GI) des objets du jeu de base (MOD_NONE),
// que le jeu envoie tel quel quand on les reçoit (GIVE_ITEM, modId 0).
const itemList = fs.readFileSync(new URL('../soh-checks/src/item_list.cpp', import.meta.url), 'utf8');
const rgFr = rg.map(() => null), giRg = {};
for (const line of itemList.split('\n')){
  // Text{ anglais, français?, allemand? } : sans français (âmes de haricot…), le nom anglais
  const m = line.match(/itemTable\[(RG_[A-Z0-9_]+)\]\s*=\s*Item\(\s*RG_[A-Z0-9_]+,\s*Text\{\s*"((?:[^"\\]|\\.)*)"(?:,\s*"((?:[^"\\]|\\.)*)")?[^}]*\},\s*\w+,\s*(\w+)/);
  if (!m || RG_NUM[m[1]] === undefined) continue;
  const n = RG_NUM[m[1]];
  rgFr[n] = m[3] || m[2];
  const gi = /^0x/i.test(m[4]) ? parseInt(m[4], 16) : GI[m[4]];
  // premier objet trouvé pour un numéro (pas « Rien », ni les variantes « BUY_ » des boutiques)
  if (line.includes('MOD_NONE') && gi !== undefined && !(gi in giRg) && !/^RG_(BUY_|NONE$)/.test(m[1])) giRg[gi] = n;
}

// Grottes (randomizer_grotto.c) : on y entre par une entrée de la scène des grottes (grottoLoadTable : propre à la
// grotte ou partagée par plusieurs, le contenu de la grotte n'est pas envoyé) et on en sort par une entrée générique
// de la zone, Link étant placé à une position propre à chaque grotte (grottoReturnTable). Numéros des entrées : position dans entrance_table.h.
const ENTR = {};
for (const m of fs.readFileSync(new URL('../soh-checks/src/entrance_table.h', import.meta.url), 'utf8')
  .matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ENTRANCE\((ENTR_\w+)/g)) ENTR[m[2]] = parseInt(m[1], 16);
const grottoSrc = fs.readFileSync(new URL('../soh-checks/src/randomizer_grotto.c', import.meta.url), 'utf8');
const table = name => grottoSrc.slice(grottoSrc.indexOf(name), grottoSrc.indexOf('};', grottoSrc.indexOf(name)));
// grottoLoad[i] = entrée par laquelle on arrive dans la grotte i
const grottoLoad = [...table('grottoLoadTable').matchAll(/\.entranceIndex\s*=\s*(ENTR_\w+)/g)].map(m => ENTR[m[1]]);
// grottoReturn[i] = [entrée générique de retour, x, y, z] ; la grotte i a pour entrée 0x700 + i et pour sortie 0x800 + i
const grottoReturn = [...table('grottoReturnTable').matchAll(/\.entranceIndex\s*=\s*(ENTR_\w+)[^}]*?\.pos\s*=\s*\{\s*\.x\s*=\s*(-?[\d.]+)f,\s*\.y\s*=\s*(-?[\d.]+)f,\s*\.z\s*=\s*(-?[\d.]+)f/g)]
  .map(m => [ENTR[m[1]], +m[2], +m[3], +m[4]]);
if (grottoLoad.some(x => x === undefined) || grottoReturn.some(r => r[0] === undefined)) throw new Error('entrée de grotte inconnue');

const out = `/* Auto-tracking (js/link.js) — FICHIER GÉNÉRÉ par tools/soh-link/gen_link_data.mjs depuis les sources de
   Ship of Harkinian 9.2.3 (commit cb71e22). randInf : { NOM: numéro de drapeau RandomizerInf } ; rg : noms des objets
   RandomizerGet, par numéro ; rgFr : leur nom français (item_list.cpp) ; giRg : { numéro GetItemID: numéro RG } des
   objets du jeu de base (reçus avec modId 0) ; grottoLoad[i] : entrée (de la scène des grottes, parfois partagée)
   par laquelle on arrive dans la grotte i ; grottoReturn[i] : [entrée générique, x, y, z] de la sortie de la grotte i (entrée 0x700 + i, sortie 0x800 + i). */
window.LINK_DATA = {
  randInf:${JSON.stringify(randInf)},
  rg:${JSON.stringify(rg)},
  rgFr:${JSON.stringify(rgFr)},
  giRg:${JSON.stringify(giRg)},
  grottoLoad:${JSON.stringify(grottoLoad)},
  grottoReturn:${JSON.stringify(grottoReturn)},
};
`;
fs.writeFileSync(OUT, out);
console.log(Object.keys(randInf).length, 'drapeaux,', rg.length, 'objets (' + rgFr.filter(Boolean).length + ' noms FR, ' + Object.keys(giRg).length + ' GI)',
  'écrits dans', String(OUT), `(${Math.round(out.length / 1024)} Ko)`);
