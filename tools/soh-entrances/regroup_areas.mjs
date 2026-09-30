// Regroupe les sorties de areas-data.js selon les 32 zones du tracker de checks de SoH (RCAREA, GetAreaFromScene),
// plus la pseudo-zone « spawns » (apparitions et chants de téléportation, qui ne sont pas des lieux).
// Réécrit ../../areas-data.js. Script de migration ponctuel (déjà appliqué : il refuse de s'exécuter deux fois),
// conservé pour trace de la correspondance ancienne zone -> zone SoH.
import fs from 'fs';

// Zones SoH dans l'ordre du tracker de checks : [id, libellé FR]
const ZONES = [
  ['spawns', 'Apparitions et chants'],
  ['kokiri_forest', 'Forêt Kokiri'], ['lost_woods', 'Bois Perdus'], ['sacred_forest_meadow', 'Bosquet Sacré'],
  ['hyrule_field', 'Plaine d\'Hyrule'], ['lake_hylia', 'Lac Hylia'], ['gerudo_valley', 'Vallée Gerudo'],
  ['gerudo_fortress', 'Forteresse Gerudo'], ['wasteland', 'Désert Hanté'], ['desert_colossus', 'Colosse du Désert'],
  ['market', 'Bourg d\'Hyrule'], ['hyrule_castle', 'Château d\'Hyrule'], ['kakariko_village', 'Village Cocorico'],
  ['graveyard', 'Cimetière Cocorico'], ['death_mountain_trail', 'Chemin du Péril'], ['goron_city', 'Village Goron'],
  ['death_mountain_crater', 'Cratère du Péril'], ['zoras_river', 'Rivière Zora'], ['zoras_domain', 'Domaine Zora'],
  ['zoras_fountain', 'Fontaine Zora'], ['lon_lon_ranch', 'Ranch Lon Lon'], ['deku_tree', 'Arbre Mojo'],
  ['dodongos_cavern', 'Caverne Dodongo'], ['jabu_jabus_belly', 'Ventre de Jabu-Jabu'], ['forest_temple', 'Temple de la Forêt'],
  ['fire_temple', 'Temple du Feu'], ['water_temple', 'Temple de l\'Eau'], ['spirit_temple', 'Temple de l\'Esprit'],
  ['shadow_temple', 'Temple de l\'Ombre'], ['bottom_of_the_well', 'Fond du Puits'], ['ice_cavern', 'Caverne de Glace'],
  ['gerudo_training_ground', 'Gymnase Gerudo'], ['ganons_castle', 'Château de Ganon'],
];
// Ancienne zone -> nouvelle zone (par défaut pour toutes ses sorties)
const AREA_OF = {
  spawns:'spawns', hf_field:'hyrule_field', market:'market', kakariko:'kakariko_village', graveyard:'graveyard',
  lonlon_ranch:'lon_lon_ranch', kokiri_forest:'kokiri_forest', lost_woods:'lost_woods', meadow:'sacred_forest_meadow',
  goron_city:'goron_city', death_mountain_trail:'death_mountain_trail', death_mountain_crater:'death_mountain_crater',
  zora_river:'zoras_river', zora_domain:'zoras_domain', zora_fountain:'zoras_fountain', lake_hylia:'lake_hylia',
  gerudo_valley:'gerudo_valley', gerudo_fortress:'gerudo_fortress', wasteland:'wasteland', colossus:'desert_colossus',
  dekutree:'deku_tree', dodongo_cavern:'dodongos_cavern', jabujabu:'jabu_jabus_belly', forest_temple:'forest_temple',
  fire_temple:'fire_temple', water_temple:'water_temple', shadow_temple:'shadow_temple', spirit_temple:'spirit_temple',
};
// Exceptions : sorties situées dans une autre scène SoH que leur ancienne zone
const EXIT_AREA = {
  // château d'Hyrule (abords, fontaines des Grandes Fées, grotte, extérieur du Château de Ganon)
  'market::castle_to_market':'hyrule_castle', 'market::castle_to_adultgreatfairy':'hyrule_castle',
  'market::adultgreatfairy_to_castle':'hyrule_castle', 'market::castle_to_childgreatfairy':'hyrule_castle',
  'market::childgreatfairy_to_castle':'hyrule_castle', 'market::castle_to_grotto':'hyrule_castle',
  'market::grotto_to_castle':'hyrule_castle', 'market::castle_to_ganon':'hyrule_castle',
  // intérieur du Château de Ganon et tour
  'market::ganon_to_castle':'ganons_castle', 'market::castle_to_tower':'ganons_castle', 'market::tower_to_castle':'ganons_castle',
  // intérieurs de donjons rangés jusqu'ici dans une zone extérieure
  'kakariko::well_to_kak':'bottom_of_the_well', 'zora_fountain::ic_to_fountain':'ice_cavern',
  'gerudo_fortress::gtg_to_gt':'gerudo_training_ground',
};

const FILE = new URL('../../areas-data.js', import.meta.url);
const text = fs.readFileSync(FILE, 'utf8');
const header = text.slice(0, text.indexOf('window.AREAS_DATA'));
const data = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1));
if (data.some(a => a.id === 'hyrule_field')) throw new Error('areas-data.js est déjà regroupé selon SoH');

const rename = {};                      // ancienne clé -> nouvelle clé
for (const a of data) for (const e of a.exits){
  const oldKey = `${a.id}::${e.id}`;
  rename[oldKey] = `${EXIT_AREA[oldKey] || AREA_OF[a.id]}::${e.id}`;
}
const zones = ZONES.map(([id, name]) => ({ id, name, exits:[] }));
const byId = Object.fromEntries(zones.map(z => [z.id, z]));
const dropped = [];
for (const a of data) for (const e of a.exits){
  const oldKey = `${a.id}::${e.id}`, newArea = rename[oldKey].split('::')[0];
  const out = { ...e };
  if (e.vanillaTargetExitId && e.vanillaTargetExitId !== 'null') out.vanillaTargetExitId = rename[e.vanillaTargetExitId] || e.vanillaTargetExitId;
  // déplacements à pied : seulement entre sorties restées dans la même zone
  if (e.connections){
    out.connections = e.connections.filter(c => {
      const same = rename[`${a.id}::${c.targetExitId}`]?.split('::')[0] === newArea;
      if (!same) dropped.push(`${oldKey} -> ${c.targetExitId}`);
      return same;
    });
    if (!out.connections.length) delete out.connections;
  }
  byId[newArea].exits.push(out);
}
const used = zones.filter(z => z.exits.length);
fs.writeFileSync(FILE, header + 'window.AREAS_DATA = ' + JSON.stringify(used, null, 2) + ';\n');
console.log(`${used.length} zones (dont « spawns »), ${Object.keys(rename).length} sorties ; connexions retirées (zones différentes) : ${dropped.length}`);
dropped.forEach(d => console.log('  ' + d));
