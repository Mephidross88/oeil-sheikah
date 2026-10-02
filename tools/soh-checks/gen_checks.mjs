// Génère data/checks-data.js (projet) à partir de checks_raw.json (extract_checks.mjs) et de translate.mjs.
import fs from 'fs';
import { translate } from './translate.mjs';
const OUT = process.argv[2] || new URL('../../data/checks-data.js', import.meta.url);
const raw = JSON.parse(fs.readFileSync(new URL('./checks_raw.json', import.meta.url), 'utf8'));

// Zones : libellé FR + donjon du panneau Objets (pour la version Vanilla / MQ)
const AREA_FR = {
  KOKIRI_FOREST:['Forêt Kokiri'], LOST_WOODS:['Bois Perdus'], SACRED_FOREST_MEADOW:['Bosquet Sacré'], HYRULE_FIELD:['Plaine d\'Hyrule'],
  LAKE_HYLIA:['Lac Hylia'], GERUDO_VALLEY:['Vallée Gerudo'], GERUDO_FORTRESS:['Forteresse Gerudo'], WASTELAND:['Désert Hanté'],
  DESERT_COLOSSUS:['Colosse du Désert'], MARKET:['Bourg d\'Hyrule'], HYRULE_CASTLE:['Château d\'Hyrule'], KAKARIKO_VILLAGE:['Village Cocorico'],
  GRAVEYARD:['Cimetière Cocorico'], DEATH_MOUNTAIN_TRAIL:['Chemin du Péril'], GORON_CITY:['Village Goron'],
  DEATH_MOUNTAIN_CRATER:['Cratère du Péril'], ZORAS_RIVER:['Rivière Zora'], ZORAS_DOMAIN:['Domaine Zora'], ZORAS_FOUNTAIN:['Fontaine Zora'],
  LON_LON_RANCH:['Ranch Lon Lon'], DEKU_TREE:['Arbre Mojo', 'dekuTree'], DODONGOS_CAVERN:['Caverne Dodongo', 'dodongosCavern'],
  JABU_JABUS_BELLY:['Ventre de Jabu-Jabu', 'jabuJabu'], FOREST_TEMPLE:['Temple de la Forêt', 'forestTemple'],
  FIRE_TEMPLE:['Temple du Feu', 'fireTemple'], WATER_TEMPLE:['Temple de l\'Eau', 'waterTemple'],
  SPIRIT_TEMPLE:['Temple de l\'Esprit', 'spiritTemple'], SHADOW_TEMPLE:['Temple de l\'Ombre', 'shadowTemple'],
  BOTTOM_OF_THE_WELL:['Fond du Puits', 'bottomOfTheWell'], ICE_CAVERN:['Caverne de Glace', 'iceCavern'],
  GERUDO_TRAINING_GROUND:['Gymnase Gerudo', 'gerudoTrainingGround'], GANONS_CASTLE:['Château de Ganon', 'ganonsCastle'],
};
// Jamais affichés par le tracker de SoH (IsCheckShuffled) : indices, coffres intermédiaires de la chasse au trésor…
const NEVER_TYPES = new Set(['GOSSIP_STONE', 'STATIC_HINT', 'CHEST_GAME']);
const NEVER_IDS = new Set(['UNKNOWN_CHECK', 'HC_ZELDAS_LETTER', 'TRIFORCE_COMPLETED', 'GANON']);

const areas = raw.areas.map(a => [a.id, AREA_FR[a.id][0], a.soh, AREA_FR[a.id][1] || null]);
const Q = { BOTH:'B', VANILLA:'V', MQ:'M' };
// Catégorie d'affichage (icône et filtre de la page Checks), déduite du type et du constructeur SoH.
const CAT_BY_TYPE = { SKULL_TOKEN:'skulltula', POT:'pot', GRASS:'grass', CRATE:'crate', SMALL_CRATE:'crate', NLCRATE:'crate',
  TREE:'tree', NLTREE:'tree', BUSH:'tree', BEEHIVE:'beehive', COW:'cow', FISH:'fish', FOUNTAIN_FAIRY:'fairy', STONE_FAIRY:'fairy',
  BEAN_FAIRY:'fairy', SONG_FAIRY:'fairy', SCRUB:'scrub', SHOP:'shop', MERCHANT:'shop', SONG_LOCATION:'song',
  DUNGEON_REWARD:'boss', BOSS_HEART_OR_OTHER_REWARD:'boss', GF_KEY:'npc' };
function category(c){
  if (c.factory === 'Chest' && c.type !== 'SKULL_TOKEN') return 'chest';
  if (CAT_BY_TYPE[c.type]) return CAT_BY_TYPE[c.type];
  if (c.id === 'LH_HYRULE_LOACH') return 'fish';
  if (c.factory === 'Collectable') return 'freestanding';
  return 'npc';
}
// Numéro de chaque check dans l'énumération RandomizerCheck de SoH (ordre de déclaration) : l'auto-tracking (Anchor)
// désigne les checks par ce numéro.
const rcEnumSrc = fs.readFileSync(new URL('./src/randomizerEnums/RandomizerCheck.h', import.meta.url), 'utf8');
const RC_NUM = {};
[...rcEnumSrc.slice(rcEnumSrc.indexOf('RANDO_ENUM_BEGIN(RandomizerCheck')).matchAll(/RANDO_ENUM_ITEM\((RC_[A-Z0-9_]+)\)/g)]
  .forEach((m, i) => { if (!('RC_MAX' in RC_NUM)) RC_NUM[m[1]] = i; });
const checks = [];
for (const c of raw.checks){
  if (NEVER_TYPES.has(c.type) || NEVER_IDS.has(c.id)) continue;
  const extra = {};
  const shop = c.type === 'SHOP' && c.id.match(/_ITEM_(\d)$/); if (shop) extra.slot = +shop[1];
  if (c.pond !== undefined) extra.pond = c.pond;
  if (c.type === 'FISH' && c.pond === undefined) extra.overworldFish = 1;
  const row = [c.id, c.area, c.type, Q[c.quest], translate(c.short, c.type), c.spoiler, c.region, category(c)];
  if (Object.keys(extra).length) row.push(extra);
  checks.push(row);
}

const header = `/* Checks du randomizer de Ship of Harkinian 9.2.3 (commit cb71e22) — FICHIER GÉNÉRÉ.
   Source : location_list.cpp, Shuffle*.cpp, fishsanity.cpp (métadonnées) et location_access/** (région de la
   logique). Libellés français générés (règles + table de traduction), nom SoH exact (celui du spoiler) conservé.
   areas  : [id RCAREA, libellé FR, nom SoH, donjon du panneau Objets ou null]
   checks : [id RC, zone, type RCTYPE, quête 'B' (les deux) | 'V' | 'M', libellé FR, nom SoH (spoiler), région RR,
            catégorie (icône / filtre), extra?]
            extra : { slot } (boutique, n° d'objet 1-8), { pond } (poisson de l'étang, index), { overworldFish }
   nums   : numéro SoH (énumération RandomizerCheck) de chaque check, dans l'ordre de checks — auto-tracking */
`;
const nums = checks.map(r => { const n = RC_NUM['RC_' + r[0]]; if (n === undefined) throw new Error('RC inconnu : ' + r[0]); return n; });
const body = 'window.CHECKS_DATA = {\n  areas:' + JSON.stringify(areas) + ',\n  checks:[\n' +
  checks.map(r => '    ' + JSON.stringify(r)).join(',\n') + '\n  ],\n  nums:' + JSON.stringify(nums) + ',\n};\n';
fs.writeFileSync(OUT, header + body);
console.log(checks.length, 'checks écrits dans', String(OUT), '(' + Math.round((header + body).length / 1024) + ' Ko)');
