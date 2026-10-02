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

const out = `/* Auto-tracking (js/link.js) — FICHIER GÉNÉRÉ par tools/soh-link/gen_link_data.mjs depuis les énumérations de
   Ship of Harkinian 9.2.3 (commit cb71e22). randInf : { NOM: numéro de drapeau RandomizerInf } ; rg : noms des objets
   RandomizerGet, par numéro. */
window.LINK_DATA = {
  randInf:${JSON.stringify(randInf)},
  rg:${JSON.stringify(rg)},
};
`;
fs.writeFileSync(OUT, out);
console.log(Object.keys(randInf).length, 'drapeaux,', rg.length, 'objets écrits dans', String(OUT), `(${Math.round(out.length / 1024)} Ko)`);
