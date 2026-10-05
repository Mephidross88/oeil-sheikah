/* ---------- Données de zones (à partir de window.AREAS_DATA, chargé par areas-data.js) ---------- */
const RAW = window.AREAS_DATA || [];
const SPAWN_AREA = 'spawns';
const TOT = 'market::templeoftime_to_templeplaza';            // point de changement d'âge
const INSIDE_NODES = new Set([                                   // entrées intérieures de donjons sans salle de boss (pas de retour par sauvegarde)
  'bottom_of_the_well::well_to_kak','ice_cavern::ic_to_fountain','gerudo_training_ground::gtg_to_gt','ganons_castle::ganon_to_castle','ganons_castle::tower_to_castle']);
const GV_RIVER = 'gerudo_valley::gv_to_lake', GV_RIVER_END = 'lake_hylia::oneway_lake_from_gv';   // rivière Gerudo et son arrivée
// Tour de Ganon : mélangée avec les salles de boss (réglage « Ganon's Tower Entrance ») ; porte côté château, sortie côté tour.
const GANON_TOWER_DOOR = 'ganons_castle::castle_to_tower', GANON_TOWER_ROOM = 'ganons_castle::tower_to_castle';
const WARP_SONGS = { 'spawns::warp_pol':'prelude','spawns::warp_mof':'minuet','spawns::warp_bof':'bolero','spawns::warp_sow':'serenade','spawns::warp_nos':'nocturne','spawns::warp_ros':'requiem' };

// langue (js/i18n.js) : nom de zone = celui du tracker de checks de SoH (même découpage), libellé de sortie = nom du
// tracker d'entrées de SoH (soh), sauf traduction du dictionnaire
const SOH_AREA_EN = Object.fromEntries((window.CHECKS_DATA?.areas || []).map(a => [a[0].toLowerCase(), a[2]]));
const AREAS = RAW.map(a => ({ id:a.id, name:td(a.name, SOH_AREA_EN[a.id]), exits:(a.exits||[]).map(e => ({
  id:e.id, key:`${a.id}::${e.id}`, areaId:a.id, label:td(e.label, e.soh), soh:e.soh || '', entr:e.entr ?? null, type:e.type, shuffleTag:e.shuffleTag,
  vanilla:(e.vanillaTargetExitId==null || e.vanillaTargetExitId==='null') ? null : e.vanillaTargetExitId,
  destOnly:!!e.destinationOnly, specialTag:e.specialTag||null,
  // cible dans la zone, ou « zone::sortie » pour un passage à pied vers une autre zone (fin de la course d'Igor…)
  connections:(e.connections||[]).map(c => ({ to:c.targetExitId.includes('::') ? c.targetExitId : `${a.id}::${c.targetExitId}`, cost:c.cost })),
}))}));
const AREA = Object.fromEntries(AREAS.map(a => [a.id, a]));
const EXIT = {}; AREAS.forEach(a => a.exits.forEach(e => { EXIT[e.key] = e; }));
const ALL_EXITS = AREAS.flatMap(a => a.exits);
const BOSS_ROOMS = ALL_EXITS.filter(e => e.specialTag);
const BOSS_DOORS = ALL_EXITS.filter(e => e.type === 'boss' || e.key === GANON_TOWER_DOOR);
const DUNGEON_AREAS = new Set(BOSS_ROOMS.map(e => e.areaId));
const dungeonExitOf = areaId => AREA[areaId]?.exits.find(e => e.type === 'dungeon' && !e.specialTag) || null;
const iconKey = e => e.shuffleTag === 'spawn' ? 'spawn' : e.type;
// Image propre à une sortie : chant de téléportation -> icône de l'objet chant (sinon celle du type).
const exitIcon = e => WARP_SONGS[e.key] ? `icons/songs/teleport/${WARP_SONGS[e.key]}.png` : null;
