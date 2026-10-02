/* Règles de la page Entrées : sorties randomisées selon la configuration, pools de destinations (entrance.cpp de SoH),
   déblocage des sens uniques, cibles effectives ; et plus court chemin du Routeur (Dijkstra). Pur (sans Vue).
   L'accessibilité et le graphe de déplacement viennent de js/logic.js (logique SoH). */
/* ---------- Validation des données ---------- */
const DATA_ERRORS = (() => {
  const errs = [];
  for (const e of ALL_EXITS){
    if (e.destOnly && e.vanilla) errs.push(`${e.key} est destinationOnly mais a une cible vanilla.`);
    if (!e.destOnly && e.vanilla && !EXIT[e.vanilla]) errs.push(`${e.key} : cible vanilla « ${e.vanilla} » introuvable.`);
    for (const c of e.connections) if (!EXIT[c.to]) errs.push(`${e.key} : connexion vers « ${c.to} » introuvable dans la zone.`);
  }
  return errs;
})();

/* ---------- Pools de randomisation ---------- */
const TAG_POOL = { overworld:'overworld', interior_simple:'interior', interior_all:'interior', hideout:'interior', grotto:'grotto',
  dungeon_simple:'dungeon', dungeon_ganon:'dungeon', ganon_tower:'boss', boss_warp_child:'boss', boss_warp_adult:'boss',
  spawn:'oneway', warp:'oneway', owl:'oneway', gerudo_river:'overworld' };
function poolOf(e){
  if (e.specialTag) return 'bossroom';
  if (e.destOnly) return 'pad';
  return TAG_POOL[e.shuffleTag] || null;
}
const isTwoWay = e => { const p = poolOf(e); return !!p && !['oneway','boss','bossroom','pad'].includes(p); };
// Pool des salles de boss (entrance.cpp : ChildBoss / AdultBoss, et GanonTower avec « Ganon's Tower Entrance ») : les portes
// de boss mènent aux salles. En entrées couplées, la porte de sortie d'une salle et son téléporteur bleu se déduisent de ce
// qui y mène ; en entrées découplées, ils sont mélangés à part (pool inverse) : on note alors où ressort la salle, devant
// l'une des portes de boss. La Tour de Ganon, sans téléporteur bleu ni salle à part, se note comme une sortie. Avec Boss
// « Full » et « Mix Bosses », portes, salles et devant des portes rejoignent le pool mélangé.
const isBossDoor = e => BOSS_DOORS.includes(e);
const isBossRoom = e => !!e.specialTag || e.key === GANON_TOWER_ROOM;
const bossChildPool = e => e.shuffleTag === 'boss_warp_child' || e.specialTag === 'boss_child';
const bossRoomNoted = (e, s) => !!e.specialTag && isDecoupled(s) && s.bossEntrances !== 'Off';
// Entrées couplées : une destination notée écrit aussi le sens inverse — entre sorties à double sens, portes de boss
// (on ressort devant la porte) et Tour de Ganon ; jamais vers une salle de boss (sa sortie est calculée).
const coupledSide = e => isTwoWay(e) || isBossDoor(e) || e.key === GANON_TOWER_ROOM;
const isCoupledPair = (a, b) => coupledSide(a) && coupledSide(b) && !(isBossDoor(a) && isBossDoor(b));
const POOL_LABEL = { overworld:'extérieurs', interior:'intérieurs', grotto:'grottes', dungeon:'donjons', boss:'salles de boss', oneway:'destinations' };

// Correspondance avec les réglages d'entrées de Ship of Harkinian (js/config.js). « Points d'apparition » couvre à la
// fois le spawn enfant et adulte. La rivière de la Vallée Gerudo (sens unique) n'est mélangée avec l'overworld qu'en
// entrées découplées (entrance.cpp) ; son arrivée au Lac Hylia devient alors une destination de l'overworld.
function isRandomized(e, s){
  if (e.destOnly || e.specialTag) return false;
  switch (e.shuffleTag){
    case 'spawn': return s.overworldSpawns === 'On';
    case 'overworld': return s.overworldEntrances === 'On';
    case 'interior_simple': return s.interiorEntrances !== 'Off';
    case 'interior_all': return s.interiorEntrances === 'All';
    case 'hideout': return s.hideoutEntrances === 'On';
    case 'grotto': return s.grottoEntrances === 'On';
    case 'dungeon_simple': return s.dungeonEntrances !== 'Off';
    case 'dungeon_ganon': return s.dungeonEntrances === 'On + Ganon';
    case 'ganon_tower': return s.bossEntrances !== 'Off' && s.ganonsTowerEntrance === 'On';
    case 'boss_warp_child': case 'boss_warp_adult': return s.bossEntrances !== 'Off';
    case 'warp': return s.warpSongs === 'On';
    case 'owl': return s.owlDrops === 'On';
    case 'gerudo_river': return s.overworldEntrances === 'On' && isDecoupled(s);
  }
  return false;
}
const isDecoupled = s => s.decoupleEntrances === 'On';
// Pools mélangés SoH : deux sorties de types différents peuvent s'échanger si chacune appartient à un type
// dont l'option « Mix … » est activée.
const MIX_KEY = { overworld:'mixOverworld', interior:'mixInteriors', grotto:'mixGrottos', dungeon:'mixDungeons', boss:'mixBosses' };
function isMixed(e, s){
  if (s.mixedEntrancePools !== 'On') return false;
  if (isBossDoor(e) || isBossRoom(e)) return s.bossEntrances === 'Full' && s.mixBosses === 'On';   // pool « Boss » : Full seulement
  const k = e.shuffleTag === 'hideout' ? 'mixThievesHideout' : MIX_KEY[e.key === GV_RIVER_END ? 'overworld' : poolOf(e)];
  return !!k && s[k] === 'On';
}
// Une sortie à sens unique (spawn, chant) n'est réellement connue du joueur qu'une fois débloquée dans sa partie :
// spawn enfant/adulte avec l'âge correspondant accessible (ages = agesC), chant avec l'ocarina et le chant lui-même appris.
function isUnlocked(e, ages, game){
  if (e.id === 'spawn_child') return ages.child;
  if (e.id === 'spawn_adult') return ages.adult;
  if (e.shuffleTag === 'warp'){
    const song = WARP_SONGS[e.key];
    return !!(song && game.items.ocarina >= 1 && game.songs[song]);
  }
  return true;
}
function lockedReason(e){
  if (e.id === 'spawn_child') return "Débloqué quand l'âge enfant est accessible";
  if (e.id === 'spawn_adult') return "Débloqué quand l'âge adulte est accessible";
  if (e.shuffleTag === 'warp') return "Débloqué avec l'Ocarina et le chant appris";
  return '';
}

/** Cibles effectives des sorties (null = inconnue) ; les téléporteurs bleus calculés s'y ajoutent dans effC
   (blueWarpTargets, js/logic.js). */
function computeEff(state){
  const s = state.settings, m = state.mappings, eff = {};
  for (const e of ALL_EXITS){
    if (e.destOnly || (e.specialTag && !bossRoomNoted(e, s))) continue;
    eff[e.key] = isRandomized(e, s) || e.specialTag ? (m[e.key] && EXIT[m[e.key]] ? m[e.key] : null) : e.vanilla;
  }
  return eff;
}
function computeIncoming(eff){
  const inc = {};
  for (const k in eff){ const t = eff[k]; if (t) (inc[t] ||= []).push(k); }
  return inc;
}

/* ---------- Routeur ---------- */
// Le graphe de déplacement (marche, transitions, chants, sauvegarde, changement d'âge) est construit sur la logique SoH par
// routeGraph (js/logic.js) ; seul l'algorithme de plus court chemin est ici.
/** Dijkstra sur les états (sortie, âge, position : voir routeGraph ; « start » au départ). */
function shortest(edges, start, startAge, goal, goalAge){
  const id = (k, a, m) => k + '|' + a + '|' + m;
  const dist = new Map([[id(start, startAge, 'start'), 0]]), prev = new Map(), heap = [[0, start, startAge, 'start']];
  while (heap.length){
    let bi = 0; for (let i = 1; i < heap.length; i++) if (heap[i][0] < heap[bi][0]) bi = i;
    const [d, k, a, m] = heap.splice(bi, 1)[0], cur = id(k, a, m);
    if (d > dist.get(cur)) continue;
    if (k === goal && (goalAge === 'any' || goalAge === a)){
      const path = []; let n = cur;
      while (prev.has(n)){ const p = prev.get(n); path.unshift(p.edge); n = p.from; }
      return { edges:path, cost:path.reduce((s, e) => s + e.cost, 0), endAge:a };
    }
    for (const e of edges(k, a, m)){
      const nd = d + e.cost + 0.001, nid = id(e.to, e.age, e.mode);   // +epsilon : à coût égal, moins d'étapes
      if (nd < (dist.get(nid) ?? Infinity)){ dist.set(nid, nd); prev.set(nid, { from:cur, edge:e }); heap.push([nd, e.to, e.age, e.mode]); }
    }
  }
  return null;
}
