// Correctifs des sources de SoH 9.2.3 (cb71e22), appliqués en mémoire par extract_checks.mjs et extract_logic.mjs
// (les fichiers de src/ restent ceux de SoH). Seulement des erreurs vérifiées en jeu (corrigées depuis dans SoH, ou à
// signaler). Chaque correctif vérifie que le texte à corriger est toujours là, sinon arrête : SoH l'a changé, revoir.
import fs from 'fs';

/* Repaire des voleurs : location_list.cpp donne le drapeau 0x0E à « Double Cell Carpenter » et 0x0F à « Steep Slope
   Carpenter », or la garde de la double cellule (salle 5 de la scène : 7 jarres, 2 caisses) lâche le drapeau 0x0F et
   celle de la cellule de la pente (salle 4 : 2 jarres) le 0x0E — vérifié dans la ROM et en jeu. Le jeu et le spoiler
   appellent donc « Steep Slope Carpenter » le check de la double cellule, et inversement (corrigé dans SoH après la
   9.2.3 : drapeaux échangés). On garde les numéros et les noms SoH (auto-tracking, spoiler) et on corrige le reste :
   région de la logique (thieves_hideout.cpp) et libellé. */
const SWAP = [['RC_TH_DOUBLE_CELL_CARPENTER', 'RC_TH_STEEP_SLOPE_CARPENTER']];

/* Garde-fou pour une mise à jour des sources de SoH : le bogue doit toujours être dans location_list.cpp (drapeau 0x0E pour
   la double cellule), sinon SoH l'a corrigé et notre échange réinverserait tout → arrêt, retirer ce correctif (SWAP,
   SHORT_FIX). */
{
  const list = fs.readFileSync(new URL('./src/location_list.cpp', import.meta.url), 'utf8');
  const flag = rc => (list.match(new RegExp(String.raw`locationTable\[${rc}\][^;]*?,\s*(0x[0-9A-Fa-f]+),\s*"`)) || [])[1];
  if (flag('RC_TH_DOUBLE_CELL_CARPENTER') !== '0x0E' || flag('RC_TH_STEEP_SLOPE_CARPENTER') !== '0x0F')
    throw new Error('fixes.mjs : les drapeaux des charpentiers du Repaire ont changé dans location_list.cpp — SoH a corrigé '
      + 'son bogue, retirer le correctif (SWAP, SHORT_FIX) avant de régénérer.');
}

/* Temple de l'Eau (Vanilla) : depuis la salle centrale, le passage sous l'eau (mur fissuré du niveau bas, Bottes de plomb
   ou Écaille d'argent) mène à la plateforme du bas de la salle de la Skulltula derrière la grille (« Near Cage Steps »),
   pas à la corniche de la grille (« Near Cage ») : il n'y a pas d'autre entrée dans cette salle, et de la plateforme il
   faut le grappin, les Bottes des airs ou une astuce de saut pour monter (vérifié en jeu, 2026-10-05 ; même condition
   dans OoT Randomizer). Pas corrigé dans SoH (develop, octobre 2026) : à signaler. */
const RETARGET = [{ file:/water_temple\.cpp$/, from:'ENTRANCE(RR_WATER_TEMPLE_NEAR_CAGE,      AnyAgeTime([]{return logic->WaterLevel(WL_LOW) && logic->HasExplosives();})',
  to:'ENTRANCE(RR_WATER_TEMPLE_NEAR_CAGE_STEPS, AnyAgeTime([]{return logic->WaterLevel(WL_LOW) && logic->HasExplosives();})' }];

// texte d'un fichier source de location_access, corrigé
export function fixSource(file, text){
  for (const r of RETARGET) if (r.file.test(file)){
    if (text.split(r.from).length !== 2) throw new Error(`fixes.mjs : « ${r.from.slice(0, 60)}… » introuvable une seule fois dans ${file} — SoH a changé ce passage, revoir le correctif (RETARGET)`);
    text = text.replace(r.from, r.to);
  }
  if (!/thieves_hideout\.cpp$/.test(file)) return text;
  for (const [a, b] of SWAP){
    const n = text.split('LOCATION(' + a + ',').length + text.split('LOCATION(' + b + ',').length;
    if (n !== 4) throw new Error(`fixes.mjs : ${a} / ${b} introuvables dans ${file} (sources changées ?)`);
    text = text.replace(new RegExp(`LOCATION\\((${a}|${b}),`, 'g'), (m, rc) => 'LOCATION(' + (rc === a ? b : a) + ',');
  }
  return text;
}

// nom court (anglais, base du libellé français) corrigé d'un check : { id sans RC_: nom }
export const SHORT_FIX = {
  TH_DOUBLE_CELL_CARPENTER:'Steep Slope Carpenter',
  TH_STEEP_SLOPE_CARPENTER:'Double Cell Carpenter',
};
