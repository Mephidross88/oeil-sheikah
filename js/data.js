/* ---------- Données de zones (à partir de window.AREAS_DATA, chargé par areas-data.js) ---------- */
const RAW = window.AREAS_DATA || [];
const SPAWN_AREA = 'spawns';
const TOT = 'market::templeoftime_to_templeplaza';            // point de changement d'âge
const INSIDE_NODES = new Set([                                   // intérieurs de donjons rangés dans une zone extérieure
  'kakariko::well_to_kak','zora_fountain::ic_to_fountain','gerudo_fortress::gtg_to_gt','market::ganon_to_castle','market::tower_to_castle']);
const WARP_SONGS = { 'spawns::warp_pol':'prelude','spawns::warp_mof':'minuet','spawns::warp_bof':'bolero','spawns::warp_sow':'serenade','spawns::warp_nos':'nocturne','spawns::warp_ros':'requiem' };

const AREAS = RAW.map(a => ({ id:a.id, name:a.name, exits:(a.exits||[]).map(e => ({
  id:e.id, key:`${a.id}::${e.id}`, areaId:a.id, label:e.label, type:e.type, shuffleTag:e.shuffleTag,
  vanilla:(e.vanillaTargetExitId==null || e.vanillaTargetExitId==='null') ? null : e.vanillaTargetExitId,
  destOnly:!!e.destinationOnly, specialTag:e.specialTag||null,
  connections:(e.connections||[]).map(c => ({ to:`${a.id}::${c.targetExitId}`, cost:c.cost, req:c.requirements||null })),
}))}));
const AREA = Object.fromEntries(AREAS.map(a => [a.id, a]));
const EXIT = {}; AREAS.forEach(a => a.exits.forEach(e => { EXIT[e.key] = e; }));
const ALL_EXITS = AREAS.flatMap(a => a.exits);
const BOSS_ROOMS = ALL_EXITS.filter(e => e.specialTag);
const BOSS_DOORS = ALL_EXITS.filter(e => e.type === 'boss');
const DUNGEON_AREAS = new Set(BOSS_ROOMS.map(e => e.areaId));
const dungeonExitOf = areaId => AREA[areaId]?.exits.find(e => e.type === 'dungeon' && !e.specialTag) || null;
const iconKey = e => e.shuffleTag === 'spawn' ? 'spawn' : e.type;
