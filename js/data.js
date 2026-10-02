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

const AREAS = RAW.map(a => ({ id:a.id, name:a.name, exits:(a.exits||[]).map(e => ({
  id:e.id, key:`${a.id}::${e.id}`, areaId:a.id, label:e.label, soh:e.soh || '', entr:e.entr ?? null, type:e.type, shuffleTag:e.shuffleTag,
  vanilla:(e.vanillaTargetExitId==null || e.vanillaTargetExitId==='null') ? null : e.vanillaTargetExitId,
  destOnly:!!e.destinationOnly, specialTag:e.specialTag||null,
  connections:(e.connections||[]).map(c => ({ to:`${a.id}::${c.targetExitId}`, cost:c.cost })),
}))}));
const AREA = Object.fromEntries(AREAS.map(a => [a.id, a]));
const EXIT = {}; AREAS.forEach(a => a.exits.forEach(e => { EXIT[e.key] = e; }));
const ALL_EXITS = AREAS.flatMap(a => a.exits);
const BOSS_ROOMS = ALL_EXITS.filter(e => e.specialTag);
const BOSS_DOORS = ALL_EXITS.filter(e => e.type === 'boss' || e.key === GANON_TOWER_DOOR);
const DUNGEON_AREAS = new Set(BOSS_ROOMS.map(e => e.areaId));
const dungeonExitOf = areaId => AREA[areaId]?.exits.find(e => e.type === 'dungeon' && !e.specialTag) || null;
const iconKey = e => e.shuffleTag === 'spawn' ? 'spawn' : e.type;
