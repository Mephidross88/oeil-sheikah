/* =====================================================================
   Pathfinder d'Hyrule — tracker et routeur pour OoT Randomizer (ER)
   Tout est client-side. Données : areas-data.js (window.AREAS_DATA).
   ===================================================================== */
const { createApp, reactive, computed, watch, ref, nextTick } = Vue;

/* ---------- Icônes (remplaçables : mettre une URL/data-URI dans CUSTOM_ICONS) ---------- */
const CUSTOM_ICONS = {
  // overworld: 'icons/overworld.png', interior: 'icons/interior.png', ...
};
const S = (p, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const ICONS = {
  overworld: S('<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>'),
  interior:  S('<path d="M3 11l9-7 9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>'),
  grotto:    S('<ellipse cx="12" cy="16.5" rx="9" ry="4"/><path d="M9 17.5V4M15 17.5V4M9 7.5h6M9 11h6M9 14.5h6"/>'),
  dungeon:   S('<path d="M5 21V10.5a7 7 0 0114 0V21z"/><path d="M9 21v-8M12 21v-9.5M15 21v-8"/>'),
  boss:      S('<path d="M5 11.5a7 7 0 1114 0v3l-2 1V19H7v-3.5l-2-1z"/><circle cx="9.5" cy="11.5" r="1.6" fill="currentColor"/><circle cx="14.5" cy="11.5" r="1.6" fill="currentColor"/><path d="M10.5 19v-2M13.5 19v-2"/>'),
  owl:       S('<path d="M5 4.5l3 2.5h8l3-2.5v9.5a7 7 0 01-14 0z"/><circle cx="9.3" cy="11.2" r="2"/><circle cx="14.7" cy="11.2" r="2"/><path d="M12 13.5l-1 2h2z" fill="currentColor"/>'),
  warp:      S('<path d="M9 18V5.5l11-2.5v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
  spawn:     S('<path d="M12 3l4.5 8h-9zM7.5 11L12 19H3zM16.5 11L21 19h-9z"/>'),
  triforce:  S('<path d="M12 2.5l4.8 8.5H7.2zM7.2 11l4.8 8.5H2.4zM16.8 11l4.8 8.5h-9.6z" fill="currentColor" stroke="none"/>'),
  globe:     S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>'),
  chevron:   S('<path d="M6 9l6 6 6-6"/>'),
  caret:     S('<path d="M5 9l7 7 7-7"/>', 'stroke-width="2.4"'),
  close:     S('<path d="M6 6l12 12M18 6L6 18"/>', 'stroke-width="2.4"'),
  menu:      S('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  swap:      S('<path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3"/>'),
  tracker:   S('<path d="M4 5h16M4 12h16M4 19h10"/><circle cx="19" cy="19" r="2"/>'),
  router:    S('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 010 6H9a3 3 0 000 6h6.5"/>'),
  config:    S('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'),
  sword:     S('<path d="M12 1.5l2 3V16h-4V4.5z" fill="currentColor" stroke="none" opacity=".35"/><path d="M12 1.5l2 3V16h-4V4.5zM6.5 16h11M12 16v6M10 22h4"/>'),
  warn:      S('<path d="M12 3.4l9.6 16.6a1 1 0 01-.87 1.5H3.27a1 1 0 01-.87-1.5z"/><path d="M12 9.3v4.4"/><circle cx="12" cy="16.9" r=".9" fill="currentColor" stroke="none"/>'),
};
const TYPE_LABEL = { overworld:'Extérieur', interior:'Intérieur', grotto:'Grotte', dungeon:'Donjon', boss:'Boss', owl:'Hibou', warp:'Téléportation', spawn:'Point d\u2019apparition' };

/* ---------- Données ---------- */
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

/* ---------- Conditions ---------- */
const REQUIREMENTS = ['Adult','Child','Epona','Explosive','TitanMass','Bow','GoronBracelet','SilverGauntlets','GoldGauntlets','Hookshot','Longshot','Sticks',
  'DinsFire','NayrusLove','GoronTunic','HoverBoots','IronBoots','SilverScale','TruthLens','ZeldaLullaby','SongOfStorms','SongOfTime','ScarecrowSong',
  'CanUseBeans','LostWoodToGoronVillageUnlocked','GerudoBridgeFixed','CraterShortcutOpened','GerudoPass','AccessToFountain','BlueFire'];
const REQ_LABEL = {
  AccessToFountain:'Accès à la Fontaine Zora', Adult:'Adulte', BlueFire:'Feu bleu', Bow:'Arc', CanUseBeans:'Haricots magiques', Child:'Enfant',
  CraterShortcutOpened:'Raccourci du Cratère', DinsFire:'Feu de Din', Epona:'Epona', Explosive:'Explosifs', GerudoBridgeFixed:'Pont Gerudo réparé',
  GerudoPass:'Pass Gerudo', GoldGauntlets:"Gantelets d'Or", GoronBracelet:'Bracelet Goron', GoronTunic:'Tunique Goron', Hookshot:'Grappin',
  HoverBoots:'Bottes des Airs', IronBoots:'Bottes de Fer', Longshot:'Super-grappin', LostWoodToGoronVillageUnlocked:'Raccourci Bois Perdus ↔ Goron',
  NayrusLove:'Amour de Nayru', ScarecrowSong:"Chant de l'Épouvantail", SilverGauntlets:"Gantelets d'Argent", SilverScale:"Écaille d'Argent",
  SongOfStorms:'Chant des Tempêtes', SongOfTime:'Chant du Temps', Sticks:'Bâtons Mojo', TitanMass:'Masse des Titans', TruthLens:'Monocle de Vérité',
  ZeldaLullaby:'Berceuse de Zelda',
};

// Les objets réservés à un âge exigent l'âge COURANT (pas seulement qu'il soit débloqué).
function sat(r, G, age){
  const i = G.items, m = G.milestone, s = G.songs, A = age === 'adult', C = age === 'child', oc = i.ocarina;
  switch (r){
    case 'Adult': return A;
    case 'Child': return C;
    case 'Epona': return m.epona && A;
    case 'Explosive': return i.bombs || i.bombchus;
    case 'TitanMass': return A && i.titanMass;
    case 'Bow': return A && i.bow;
    case 'GoronBracelet': return i.goronBracelet || (A && (i.silverGauntlets || i.goldGauntlets));
    case 'SilverGauntlets': return A && (i.silverGauntlets || i.goldGauntlets);
    case 'GoldGauntlets': return A && i.goldGauntlets;
    case 'Hookshot': return A && (i.hookshot || i.longshot);
    case 'Longshot': return A && i.longshot;
    case 'Sticks': return C && i.sticks;
    case 'DinsFire': return i.dinsFire && m.hasMagic;
    case 'NayrusLove': return i.nayrusLove && m.hasMagic;
    case 'GoronTunic': return A && i.goronTunic;
    case 'IronBoots': return A && i.ironBoots;
    case 'HoverBoots': return A && i.hoverBoots;
    case 'SilverScale': return i.silverScale;
    case 'TruthLens': return i.truthLens && m.hasMagic;
    case 'ZeldaLullaby': return oc && s.zeldaLullaby;
    case 'SongOfStorms': return oc && s.songOfStorms;
    case 'SongOfTime': return oc && s.songOfTime;
    case 'ScarecrowSong': return A && oc && (i.hookshot || i.longshot) && s.scarecrowSong;
    case 'CanUseBeans': return A && m.childAvailable && i.beans;
    case 'LostWoodToGoronVillageUnlocked': return m.lostWoodsGoronShortcut;
    case 'GerudoBridgeFixed': return m.gerudoBridgeFixed;
    case 'CraterShortcutOpened': return m.craterShortcut;
    case 'GerudoPass': return m.gerudoPass && m.adultAvailable;
    case 'AccessToFountain': return i.rutoLetter && m.childAvailable;
    case 'BlueFire': return i.bottle && m.adultAvailable;
  }
  return false;
}
/** Renvoie le groupe de conditions satisfait (tableau, éventuellement vide) ou null. */
function connGroup(c, G, age){
  if (!c.req || !c.req.length) return [];
  return c.req.find(g => g.every(r => sat(r, G, age))) || null;
}
const fmtReq = req => req.map(g => g.length > 1 ? `(${g.map(r => REQ_LABEL[r]||r).join(' + ')})` : (REQ_LABEL[g[0]]||g[0])).join(' ou ');

/* ---------- Validation des données ---------- */
const DATA_ERRORS = (() => {
  const errs = [], rq = new Set(REQUIREMENTS);
  for (const e of ALL_EXITS){
    if (e.destOnly && e.vanilla) errs.push(`${e.key} est destinationOnly mais a une cible vanilla.`);
    if (!e.destOnly && e.vanilla && !EXIT[e.vanilla]) errs.push(`${e.key} : cible vanilla « ${e.vanilla} » introuvable.`);
    for (const c of e.connections){
      if (!EXIT[c.to]) errs.push(`${e.key} : connexion vers « ${c.to} » introuvable dans la zone.`);
      for (const g of c.req||[]) for (const r of g) if (!rq.has(r)) errs.push(`${e.key} → ${c.to} : condition inconnue « ${r} ».`);
    }
  }
  return errs;
})();

/* ---------- Pools de randomisation ---------- */
const TAG_POOL = { overworld:'overworld', interior_simple:'interior', interior_all:'interior', hideout:'interior', grotto:'grotto',
  dungeon_simple:'dungeon', dungeon_ganon:'dungeon', ganon_tower:'dungeon', boss_warp_child:'boss', boss_warp_adult:'boss',
  spawn:'oneway', warp:'oneway', owl:'oneway', gerudo_river:'oneway' };
function poolOf(e){
  if (e.specialTag) return 'bossroom';
  if (e.destOnly) return 'pad';
  return TAG_POOL[e.shuffleTag] || null;
}
const isTwoWay = e => { const p = poolOf(e); return !!p && !['oneway','boss','bossroom','pad'].includes(p); };
const POOL_LABEL = { overworld:'extérieurs', interior:'intérieurs', grotto:'grottes', dungeon:'donjons', boss:'salles de boss', oneway:'destinations' };

function isRandomized(e, s){
  if (e.destOnly || e.specialTag) return false;
  switch (e.shuffleTag){
    case 'spawn':
      if (e.id === 'spawn_child') return s.spawns === 'child' || s.spawns === 'all';
      if (e.id === 'spawn_adult') return s.spawns === 'adult' || s.spawns === 'all';
      return false;
    case 'overworld': return s.overworld;
    case 'interior_simple': return s.interiors !== 'off';
    case 'interior_all': return s.interiors === 'all';
    case 'hideout': return s.hideout;
    case 'grotto': return s.grottos;
    case 'gerudo_river': return s.gerudoRiver;
    case 'dungeon_simple': return s.dungeons !== 'off';
    case 'dungeon_ganon': return s.dungeons === 'ganon';
    case 'ganon_tower': return s.ganonTower;
    case 'boss_warp_child': case 'boss_warp_adult': return s.bosses !== 'off';
    case 'warp': return s.warps;
    case 'owl': return s.owls;
  }
  return false;
}
// Une sortie à sens unique (spawn, chant) n'est réellement connue du joueur qu'une fois débloquée dans sa partie :
// spawn enfant/adulte avec l'âge correspondant accessible, chant avec l'ocarina et le chant lui-même appris.
function isUnlocked(e, G){
  if (e.shuffleTag === 'spawn'){
    if (e.id === 'spawn_child') return G.milestone.childAvailable;
    if (e.id === 'spawn_adult') return G.milestone.adultAvailable;
  }
  if (e.shuffleTag === 'warp'){
    const song = WARP_SONGS[e.key];
    return !!(song && G.items.ocarina && G.songs[song]);
  }
  return true;
}
function lockedReason(e){
  if (e.id === 'spawn_child') return "Débloqué quand l'âge enfant est accessible";
  if (e.id === 'spawn_adult') return "Débloqué quand l'âge adulte est accessible";
  if (e.shuffleTag === 'warp') return "Débloqué avec l'Ocarina et le chant appris";
  return '';
}

/** Cibles effectives de toutes les sorties (null = inconnue). */
function computeEff(state){
  const s = state.settings, m = state.mappings, eff = {};
  for (const e of ALL_EXITS){
    if (e.destOnly || e.specialTag) continue;
    eff[e.key] = isRandomized(e, s) ? (m[e.key] && EXIT[m[e.key]] ? m[e.key] : null) : e.vanilla;
  }
  // Téléporteurs bleus : on ressort devant l'entrée qui mène au donjon dont on a franchi la porte de boss.
  for (const r of BOSS_ROOMS){
    const door = BOSS_DOORS.find(d => eff[d.key] === r.key);
    if (!door){ eff[r.key] = null; continue; }
    const x = dungeonExitOf(door.areaId);
    if (x && isRandomized(x, s)) eff[r.key] = eff[x.key] || null;
    else eff[r.key] = (BOSS_ROOMS.find(b => b.areaId === door.areaId) || r).vanilla;
  }
  return eff;
}
function computeIncoming(eff){
  const inc = {};
  for (const k in eff){ const t = eff[k]; if (t) (inc[t] ||= []).push(k); }
  return inc;
}

/* ---------- Graphe de déplacement ---------- */
function makeEdges(state, eff){
  const G = state.game, C = state.costs, ms = G.milestone;
  const spawnOf = { child: eff['spawns::spawn_child'], adult: eff['spawns::spawn_adult'] };
  const warps = Object.entries(WARP_SONGS).filter(([k, song]) => G.items.ocarina && G.songs[song] && eff[k]).map(([k]) => ({ key:k, to:eff[k] }));

  function resetTarget(key, age){
    const e = EXIT[key];
    if (INSIDE_NODES.has(key)) return null;
    if (DUNGEON_AREAS.has(e.areaId)){
      let area = e.areaId;
      if (e.specialTag){ const d = BOSS_DOORS.find(d => eff[d.key] === key); if (!d) return null; area = d.areaId; }
      const x = dungeonExitOf(area);
      return x && x.key !== key ? x.key : null;
    }
    return spawnOf[age] || null;
  }

  return function edges(key, age){
    const e = EXIT[key], out = [];
    if (!e) return out;
    for (const c of e.connections){
      const g = connGroup(c, G, age);
      if (g) out.push({ from:key, fromAge:age, to:c.to, age, cost:c.cost, kind:'walk', reqs:g.filter(r => r !== 'Adult' && r !== 'Child') });
    }
    if (!e.destOnly && eff[key]){
      const kind = e.specialTag ? 'bluewarp' : e.type === 'owl' ? 'owl' : 'transition';
      if (kind !== 'owl' || age === 'child')
        out.push({ from:key, fromAge:age, to:eff[key], age, cost:C.transition, kind });
    }
    if (key === TOT){
      if (age === 'child' && ms.adultAvailable) out.push({ from:key, fromAge:age, to:key, age:'adult', cost:C.age, kind:'age' });
      if (age === 'adult' && ms.childAvailable) out.push({ from:key, fromAge:age, to:key, age:'child', cost:C.age, kind:'age' });
    }
    for (const w of warps) if (w.to !== key) out.push({ from:key, fromAge:age, to:w.to, age, cost:C.warp, kind:'warp', warp:w.key });
    const rt = resetTarget(key, age);
    if (rt && rt !== key) out.push({ from:key, fromAge:age, to:rt, age, cost:C.reset, kind:'reset' });
    return out;
  };
}

function flood(state, eff, edges){
  const ms = state.game.milestone, seen = new Set(), nodes = new Set(), q = [];
  const push = (k, a) => { const id = k + '|' + a; if (!k || seen.has(id)) return; seen.add(id); nodes.add(k); q.push([k, a]); };
  if (ms.childAvailable) push(eff['spawns::spawn_child'], 'child');
  if (ms.adultAvailable) push(eff['spawns::spawn_adult'], 'adult');
  while (q.length){ const [k, a] = q.shift(); for (const ed of edges(k, a)) push(ed.to, ed.age); }
  return nodes;
}

/** Dijkstra sur les états (sortie, âge). */
function shortest(edges, start, startAge, goal, goalAge){
  const id = (k, a) => k + '|' + a;
  const dist = new Map([[id(start, startAge), 0]]), prev = new Map(), heap = [[0, start, startAge]];
  while (heap.length){
    let bi = 0; for (let i = 1; i < heap.length; i++) if (heap[i][0] < heap[bi][0]) bi = i;
    const [d, k, a] = heap.splice(bi, 1)[0], cur = id(k, a);
    if (d > dist.get(cur)) continue;
    if (k === goal && (goalAge === 'any' || goalAge === a)){
      const path = []; let n = cur;
      while (prev.has(n)){ const p = prev.get(n); path.unshift(p.edge); n = p.from; }
      return { edges:path, cost:path.reduce((s, e) => s + e.cost, 0), endAge:a };
    }
    for (const e of edges(k, a)){
      const nd = d + e.cost + 0.001, nid = id(e.to, e.age);   // +epsilon : à coût égal, moins d'étapes
      if (nd < (dist.get(nid) ?? Infinity)){ dist.set(nid, nd); prev.set(nid, { from:cur, edge:e }); heap.push([nd, e.to, e.age]); }
    }
  }
  return null;
}

/* ---------- État persistant ---------- */
const STORE_KEY = 'ootr-pathfinder-v1';
const GAME_GROUPS = [
  { title:'Âges', path:'milestone', items:[['childAvailable','Âge enfant accessible'],['adultAvailable','Âge adulte accessible (Épée de Légende)']] },
  { title:'Progression', path:'milestone', items:[['epona','Epona disponible'],['hasMagic','Magie disponible'],['lostWoodsGoronShortcut','Raccourci Bois Perdus ↔ Village Goron'],
    ['craterShortcut','Raccourci du Cratère du Péril'],['gerudoBridgeFixed','Pont Gerudo réparé'],['gerudoPass','Pass Gerudo']] },
  { title:'Équipements', path:'items', items:[['goronBracelet','Bracelet Goron'],['silverGauntlets',"Gantelets d'Argent"],['goldGauntlets',"Gantelets d'Or"],
    ['goronTunic','Tunique Goron'],['ironBoots','Bottes de Fer'],['hoverBoots','Bottes des Airs'],['silverScale',"Écaille d'Argent"]] },
  { title:'Objets', path:'items', items:[['bombs','Bombes'],['bombchus','Missiles'],['titanMass','Masse des Titans'],['bow','Arc'],['hookshot','Grappin'],
    ['longshot','Super-grappin'],['sticks','Bâtons Mojo'],['dinsFire','Feu de Din'],['nayrusLove','Amour de Nayru'],['ocarina','Ocarina'],
    ['beans','Haricots Magiques'],['bottle','Bouteille'],['rutoLetter','Lettre de Ruto'],['truthLens','Monocle de Vérité']] },
  { title:'Chants', path:'songs', items:[['zeldaLullaby','Berceuse de Zelda'],['songOfStorms','Chant des Tempêtes'],['songOfTime','Chant du Temps'],['scarecrowSong',"Chant de l'Épouvantail"]] },
  { title:'Téléportations', path:'songs', items:[['prelude','Prélude de la Lumière'],['minuet','Menuet des Bois'],['bolero','Boléro du Feu'],
    ['serenade',"Sérénade de l'Eau"],['nocturne',"Nocturne de l'Ombre"],['requiem','Requiem des Esprits']] },
];
function defaults(){
  const game = { milestone:{}, items:{}, songs:{} };
  GAME_GROUPS.forEach(g => g.items.forEach(([k]) => { game[g.path][k] = false; }));
  return {
    version:1,
    settings:{ overworld:false, interiors:'off', grottos:false, gerudoRiver:false, dungeons:'off', bosses:'off', ganonTower:false, hideout:false,
      spawns:'none', warps:false, owls:false, decoupled:false, mixedPools:false },
    costs:{ transition:3, warp:15, reset:25, age:12 },
    game, mappings:{},
    ui:{ view:'tracker', collapsed:{},
      filters:{ showReachableTargets:false, showInaccessibleAreas:false, showDiscovered:true, showVanilla:true },
      router:{ fromArea:'', fromExit:'', fromAge:'child', toArea:'', toExit:'', toAge:'any' } },
  };
}
function merge(base, src){
  if (!src || typeof src !== 'object' || Array.isArray(src)) return base;
  for (const k of Object.keys(base)){
    if (!(k in src)) continue;
    const b = base[k], v = src[k];
    if (b && typeof b === 'object' && !Array.isArray(b) && Object.keys(b).length) base[k] = merge(b, v);
    else if (b && typeof b === 'object' && !Array.isArray(b)) base[k] = (v && typeof v === 'object') ? { ...v } : b;
    else if (typeof v === typeof b) base[k] = v;
  }
  return base;
}
function load(){
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) return merge(defaults(), JSON.parse(raw)); } catch (e) {}
  return defaults();
}

const store = reactive(load());
const lastSaved = ref(null);
watch(store, () => {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); lastSaved.value = new Date(); } catch (e) {}
}, { deep:true });

const effC = computed(() => computeEff(store));
const incC = computed(() => computeIncoming(effC.value));
const edgesC = computed(() => makeEdges(store, effC.value));
const reachC = computed(() => flood(store, effC.value, edgesC.value));

/* ---------- Mutations ---------- */
function clearMapping(src){
  const old = store.mappings[src];
  if (!old) return;
  delete store.mappings[src];
  if (!store.settings.decoupled && EXIT[old] && isTwoWay(EXIT[src]) && store.mappings[old] === src) delete store.mappings[old];
}
function setMapping(src, target){
  clearMapping(src);
  store.mappings[src] = target;
  if (!store.settings.decoupled && isTwoWay(EXIT[src]) && isTwoWay(EXIT[target]) && target !== src){
    if (store.mappings[target]) clearMapping(target);
    store.mappings[target] = src;
  }
}
function candidatesFor(srcKey){
  const src = EXIT[srcKey], s = store.settings, pool = poolOf(src), eff = effC.value, inc = incC.value;
  if (pool === 'boss'){
    return BOSS_ROOMS.filter(r => (s.bosses === 'full' || (src.shuffleTag === 'boss_warp_child') === (r.specialTag === 'boss_child'))
      && !BOSS_DOORS.some(d => d.key !== srcKey && eff[d.key] === r.key));
  }
  if (pool === 'oneway'){  // hiboux, chants, spawns : destinations supplémentaires, ne consomment pas la cible
    return ALL_EXITS.filter(e => e.areaId !== SPAWN_AREA && !e.specialTag && e.type !== 'boss'
      && (s.mixedPools || ['overworld','interior','pad'].includes(poolOf(e))));
  }
  return ALL_EXITS.filter(e => {
    if (e.key === srcKey || e.areaId === SPAWN_AREA || !isTwoWay(e) || !isRandomized(e, s)) return false;
    if (!s.mixedPools && poolOf(e) !== pool) return false;
    if ((inc[e.key]||[]).some(k => k !== srcKey && isTwoWay(EXIT[k]))) return false;
    if (!s.decoupled && store.mappings[e.key] && store.mappings[e.key] !== srcKey) return false;
    return true;
  });
}
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const areaName = k => AREA[EXIT[k]?.areaId]?.name || '?';

/* ---------- Composants ---------- */
const TypeIcon = {
  props:['type'],
  computed:{ custom(){ return CUSTOM_ICONS[this.type]; }, svg(){ return ICONS[this.type] || ICONS.overworld; }, title(){ return TYPE_LABEL[this.type]; } },
  template:`<span class="ticon" :class="'t-'+type" :title="title"><img v-if="custom" :src="custom" alt=""><span v-else v-html="svg" style="display:contents"></span></span>`,
};

const Seg = {
  props:['modelValue','options'], emits:['update:modelValue'],
  template:`<div class="seg" role="radiogroup"><button v-for="o in options" :key="String(o[0])" type="button" role="radio" :aria-checked="modelValue===o[0]"
    :class="{on: modelValue===o[0]}" @click="$emit('update:modelValue', o[0])">{{o[1]}}</button></div>`,
};

const DestPicker = {
  props:['source'], emits:['choose'],
  data:() => ({ open:false, q:'', hl:0, pos:{}, ICONS }),
  computed:{
    all(){
      if (!this.open) return { groups:[], flat:[] };
      const reach = reachC.value, show = store.ui.filters.showReachableTargets, nq = norm(this.q.trim());
      const used = new Set(Object.entries(store.mappings).filter(([k]) => k !== this.source).map(([, v]) => v));
      const byArea = new Map();
      for (const e of candidatesFor(this.source)){
        const r = reach.has(e.key) || used.has(e.key);
        if (r && !show) continue;
        const an = AREA[e.areaId].name;
        if (nq && !norm(e.label + ' ' + an).includes(nq)) continue;
        if (!byArea.has(e.areaId)) byArea.set(e.areaId, { id:e.areaId, name:an, options:[] });
        byArea.get(e.areaId).options.push({ key:e.key, label:e.label, reach:r });
      }
      const groups = [...byArea.values()], flat = [];
      groups.forEach(g => g.options.forEach(o => { o.idx = flat.length; flat.push(o); }));
      return { groups, flat };
    },
  },
  methods:{
    toggle(){ this.open ? this.close() : this.openIt(); },
    openIt(){
      this.q = ''; this.hl = 0; this.place(); this.open = true;
      nextTick(() => this.$refs.input?.focus());
      document.addEventListener('mousedown', this.outside, true);
      window.addEventListener('scroll', this.onScroll, true);
      window.addEventListener('resize', this.close);
    },
    close(){
      this.open = false;
      document.removeEventListener('mousedown', this.outside, true);
      window.removeEventListener('scroll', this.onScroll, true);
      window.removeEventListener('resize', this.close);
    },
    place(){
      const r = this.$refs.trigger.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
      const w = Math.min(Math.max(r.width, 340), vw - 16), left = Math.max(8, Math.min(r.left, vw - w - 8));
      const below = vh - r.bottom - 12, above = r.top - 12;
      if (below >= 280 || below >= above) this.pos = { left:left+'px', width:w+'px', top:(r.bottom+4)+'px', maxHeight:Math.max(200, below)+'px' };
      else this.pos = { left:left+'px', width:w+'px', bottom:(vh - r.top + 4)+'px', maxHeight:Math.max(200, Math.min(above, 460))+'px' };
      if (!this.pos.maxHeight || parseFloat(this.pos.maxHeight) > 460) this.pos.maxHeight = '460px';
    },
    outside(ev){ if (!this.$el.contains(ev.target) && !this.$refs.pop?.contains(ev.target)) this.close(); },
    onScroll(ev){ if (this.$refs.pop && this.$refs.pop.contains(ev.target)) return; this.close(); },
    choose(k){ this.close(); this.$emit('choose', k); },
    key(ev){
      const n = this.all.flat.length;
      if (ev.key === 'ArrowDown'){ ev.preventDefault(); this.hl = Math.min(n - 1, this.hl + 1); this.scrollHl(); }
      else if (ev.key === 'ArrowUp'){ ev.preventDefault(); this.hl = Math.max(0, this.hl - 1); this.scrollHl(); }
      else if (ev.key === 'Enter'){ ev.preventDefault(); const o = this.all.flat[this.hl]; if (o) this.choose(o.key); }
      else if (ev.key === 'Escape'){ this.close(); this.$refs.trigger.focus(); }
    },
    scrollHl(){ nextTick(() => this.$refs.list?.querySelector('.hl')?.scrollIntoView({ block:'nearest' })); },
  },
  watch:{ q(){ this.hl = 0; } },
  beforeUnmount(){ this.close(); },
  template:`<div class="picker">
    <button ref="trigger" type="button" class="picker-trigger" :aria-expanded="open" aria-haspopup="listbox" @click="toggle">
      <span>Non découvert</span><span v-html="ICONS.caret"></span></button>
    <div v-if="open" ref="pop" class="pop" :style="pos" @keydown="key">
      <input ref="input" v-model="q" placeholder="Filtrer…" aria-label="Filtrer les destinations">
      <div ref="list" class="pop-list" role="listbox">
        <template v-for="g in all.groups" :key="g.id">
          <div class="pg-title">{{g.name}}</div>
          <button v-for="o in g.options" :key="o.key" type="button" role="option" class="pg-opt" :class="{hl:o.idx===hl, reach:o.reach}"
            @mousedown.prevent="choose(o.key)" @mousemove="hl=o.idx"><span>{{o.label}}</span><small v-if="o.reach">Atteignable</small></button>
        </template>
        <div v-if="!all.flat.length" class="pg-empty">{{ q ? 'Aucune destination ne correspond au filtre.' : 'Aucune destination libre dans ce pool.' }}</div>
      </div>
    </div></div>`,
};

/* ---------- Application ---------- */
const App = {
  components:{ TypeIcon, Seg, DestPicker },
  setup(){
    const navOpen = ref(false), modal = ref(null), tip = reactive({ show:false, key:null, style:{} });
    const backup = reactive({ text:'', msg:'', ok:true });
    const ui = store.ui, s = store.settings;

    const views = [
      { id:'tracker', label:'Tracker', icon:ICONS.tracker },
      { id:'router', label:'Routeur', icon:ICONS.router },
      { id:'config', label:'Configuration', icon:ICONS.config },
    ];

    function rowInfo(e){
      if (e.specialTag) return { mode:'auto', target:effC.value[e.key] };
      if (!isRandomized(e, store.settings)) return { mode:'vanilla', target:e.vanilla };
      if (!isUnlocked(e, store.game)) return { mode:'locked', target:null, reason:lockedReason(e) };
      const t = store.mappings[e.key];
      return t && EXIT[t] ? { mode:'set', target:t } : { mode:'open', target:null };
    }

    // Spawns randomisés (Configuration > spawns) mais pas encore renseignés : aucun point de départ connu,
    // donc rien n'est calculable comme atteignable tant qu'ils ne sont pas notés.
    const missingSpawns = computed(() => {
      const ms = store.game.milestone, eff = effC.value, out = [];
      if (ms.childAvailable && isRandomized(EXIT['spawns::spawn_child'], store.settings) && !eff['spawns::spawn_child']) out.push('Enfant');
      if (ms.adultAvailable && isRandomized(EXIT['spawns::spawn_adult'], store.settings) && !eff['spawns::spawn_adult']) out.push('Adulte');
      return out;
    });

    const stats = computed(() => {
      let editable = 0, mapped = 0;
      for (const e of ALL_EXITS){ const r = rowInfo(e); if (r.mode !== 'vanilla' && r.mode !== 'auto'){ editable++; if (r.mode === 'set') mapped++; } }
      return { editable, mapped };
    });

    const visibleAreas = computed(() => {
      const f = ui.filters, reach = reachC.value, inc = incC.value;
      return AREAS.map(area => {
        const reachable = area.id === SPAWN_AREA || area.exits.some(e => reach.has(e.key));
        if (!reachable && !f.showInaccessibleAreas) return null;
        const all = area.exits.filter(e => !e.destOnly).map(e => ({ e, ...rowInfo(e) }));
        const editable = all.filter(r => r.mode !== 'vanilla' && r.mode !== 'auto').length;
        const mapped = all.filter(r => r.mode === 'set').length;
        const rows = all.filter(r => (f.showVanilla || (r.mode !== 'vanilla' && r.mode !== 'auto')) && (f.showDiscovered || r.mode !== 'set'));
        if (!rows.length) return null;
        rows.forEach(r => { r.from = (inc[r.e.key] || []).map(k => ({ key:k, area:areaName(k), label:EXIT[k].label })); });
        return { area, reachable, rows, editable, mapped };
      }).filter(Boolean);
    });

    const gameCount = computed(() => GAME_GROUPS.reduce((n, g) => n + g.items.filter(([k]) => store.game[g.path][k]).length, 0));

    function toggleArea(id){ ui.collapsed[id] = !ui.collapsed[id]; }
    function setAll(collapsed){ AREAS.forEach(a => { ui.collapsed[a.id] = collapsed; }); }
    function jump(areaId, rowKey){
      ui.collapsed[areaId] = false; navOpen.value = false;
      nextTick(() => {
        const el = document.getElementById(rowKey ? 'row-' + rowKey : 'area-' + areaId) || document.getElementById('area-' + areaId);
        if (!el) return;
        el.scrollIntoView({ behavior:'smooth', block:rowKey ? 'center' : 'start' });
        if (rowKey){ el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
      });
    }
    function go(v){ ui.view = v; navOpen.value = false; window.scrollTo({ top:0 }); }

    /* Infobulle des connexions internes */
    const tipData = computed(() => {
      if (!tip.key) return null;
      const e = EXIT[tip.key], G = store.game, ms = G.milestone;
      const ages = [ms.childAvailable && 'child', ms.adultAvailable && 'adult'].filter(Boolean);
      return { title:e.label, items:e.connections.map(c => {
        const ok = ages.filter(a => connGroup(c, G, a));
        const only = ok.length === 1 && ages.length === 2 ? (ok[0] === 'child' ? 'Enfant uniquement' : 'Adulte uniquement') : '';
        return { label:EXIT[c.to]?.label || c.to, cost:c.cost, ok:ok.length > 0, cond:c.req && c.req.length ? fmtReq(c.req) : '', only };
      }) };
    });
    function showTip(ev, key){
      const r = ev.currentTarget.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
      const left = Math.max(8, Math.min(r.right + 10, vw - 390));
      tip.key = key; tip.show = true;
      tip.style = r.top < vh * 0.55 ? { left:left+'px', top:(r.top - 6)+'px' } : { left:left+'px', bottom:(vh - r.bottom - 6)+'px' };
    }
    function hideTip(){ tip.show = false; }
    function toggleTip(ev, key){ if (tip.show && tip.key === key) hideTip(); else showTip(ev, key); }
    window.addEventListener('scroll', hideTip, { passive:true });

    /* Routeur */
    const routerAreas = AREAS.filter(a => a.id !== SPAWN_AREA);
    const exitsOf = id => (AREA[id]?.exits || []);
    watch(() => ui.router.fromArea, id => { if (!exitsOf(id).some(e => e.key === ui.router.fromExit)) ui.router.fromExit = ''; });
    watch(() => ui.router.toArea, id => { if (!exitsOf(id).some(e => e.key === ui.router.toExit)) ui.router.toExit = ''; });
    function swap(){
      const r = ui.router;
      [r.fromArea, r.toArea] = [r.toArea, r.fromArea];
      nextTick(() => {
        const fe = r.fromExit; r.fromExit = r.toExit; r.toExit = fe;
        if (r.toAge !== 'any') { const a = r.fromAge; r.fromAge = r.toAge; r.toAge = a; }
      });
    }
    const route = computed(() => {
      const r = ui.router;
      if (!r.fromExit || !r.toExit || !EXIT[r.fromExit] || !EXIT[r.toExit]) return { state:'idle' };
      const res = shortest(edgesC.value, r.fromExit, r.fromAge, r.toExit, r.toAge);
      if (!res) return { state:'none' };
      const items = [{ t:'node', key:r.fromExit, age:r.fromAge, role:'start' }];
      for (const e of res.edges){
        if (e.kind === 'age') items.push({ t:'age', from:e.fromAge, to:e.age });
        else { items.push({ t:'edge', e }); items.push({ t:'node', key:e.to, age:e.age }); }
      }
      const last = [...items].reverse().find(i => i.t === 'node'); last.role = last.role ? 'both' : 'end';
      const count = k => res.edges.filter(e => e.kind === k).length;
      return { state:'ok', items, cost:Math.round(res.cost), steps:res.edges.length,
        transitions:count('transition') + count('bluewarp') + count('owl'), ages:count('age'), warps:count('warp'), resets:count('reset') };
    });
    const edgeLabel = e => ({ walk:'À pied', transition:'Transition', bluewarp:'Téléporteur bleu', owl:'Vol du hibou',
      warp:'Chant : ' + (EXIT[e.warp]?.label || ''), reset:'Sauvegarder et recharger' }[e.kind]);
    const ageLabel = a => a === 'child' ? 'Enfant' : 'Adulte';

    /* Sauvegarde */
    function openBackup(){ backup.text = JSON.stringify({ version:1, settings:store.settings, costs:store.costs, game:store.game, mappings:store.mappings }, null, 1); backup.msg = ''; modal.value = 'backup'; }
    async function copyBackup(){
      try { await navigator.clipboard.writeText(backup.text); backup.ok = true; backup.msg = 'Copié dans le presse-papiers.'; }
      catch (e) { backup.ok = false; backup.msg = 'Copie impossible ici : sélectionnez le texte et copiez-le manuellement.'; }
    }
    function importBackup(){
      try {
        const d = JSON.parse(backup.text), base = defaults();
        store.settings = merge(base.settings, d.settings); store.costs = merge(base.costs, d.costs); store.game = merge(base.game, d.game);
        store.mappings = Object.fromEntries(Object.entries(d.mappings || {}).filter(([k, v]) => EXIT[k] && EXIT[v]));
        backup.ok = true; backup.msg = `Partie importée : ${Object.keys(store.mappings).length} sorties renseignées.`;
      } catch (e) { backup.ok = false; backup.msg = 'Texte invalide : collez le contenu complet d\u2019un export.'; }
    }
    function resetAll(){
      const d = defaults();
      store.mappings = {}; store.game = d.game; ui.collapsed = {}; ui.router = d.ui.router;
      modal.value = null;
    }

    function onKey(ev){ if (ev.key === 'Escape'){ modal.value = null; hideTip(); } }
    window.addEventListener('keydown', onKey);

    const savedAt = computed(() => lastSaved.value ? lastSaved.value.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) : null);

    return { store, ui, s, views, navOpen, modal, tip, tipData, backup, stats, missingSpawns, visibleAreas, gameCount, ICONS, GAME_GROUPS, AREA, EXIT, DATA_ERRORS,
      iconKey, areaName, toggleArea, setAll, jump, go, showTip, hideTip, toggleTip, setMapping, clearMapping,
      routerAreas, exitsOf, swap, route, edgeLabel, ageLabel, openBackup, copyBackup, importBackup, resetAll, savedAt, TYPE_LABEL };
  },
  template:`
<div class="shell" :class="{'nav-open':navOpen}">
  <header class="topbar">
    <button @click="navOpen=!navOpen" aria-label="Menu" v-html="ICONS.menu"></button>
    <span class="tri" v-html="ICONS.triforce"></span><span>Pathfinder d'Hyrule</span>
  </header>

  <aside class="side">
    <div class="brand"><span class="tri" v-html="ICONS.triforce"></span>
      <div><div class="brand-name">Pathfinder d'Hyrule</div><div class="brand-sub">Entrance Randomizer</div></div></div>
    <nav class="nav">
      <button v-for="v in views" :key="v.id" class="nav-item" :class="{active:ui.view===v.id}" @click="go(v.id)">
        <span v-html="v.icon"></span>{{v.label}}
        <span v-if="v.id==='tracker'" class="nav-meta">{{stats.mapped}}/{{stats.editable}}</span></button>
    </nav>
    <button class="state-btn" @click="modal='game'">État de la partie <span class="count">{{gameCount}}</span></button>

    <section v-if="ui.view==='tracker'" class="side-sec">
      <div class="side-row"><button class="side-btn" @click="setAll(false)">Tout déplier</button><button class="side-btn" @click="setAll(true)">Tout replier</button></div>
      <label class="check"><input type="checkbox" v-model="ui.filters.showReachableTargets">Proposer les destinations déjà atteignables ou déjà mappées</label>
      <label class="check"><input type="checkbox" v-model="ui.filters.showInaccessibleAreas">Afficher les zones non atteintes</label>
      <label class="check"><input type="checkbox" v-model="ui.filters.showDiscovered">Afficher les sorties découvertes</label>
      <label class="check"><input type="checkbox" v-model="ui.filters.showVanilla">Afficher les sorties non randomisées</label>
      <div class="side-title">Zones</div>
      <div class="zone-nav">
        <button v-for="va in visibleAreas" :key="va.area.id" @click="jump(va.area.id)">
          <span>{{va.area.name}}</span>
          <span v-if="va.editable" class="zp" :class="{done:va.mapped===va.editable}">{{va.mapped}}/{{va.editable}}</span></button>
      </div>
    </section>

    <div class="side-foot">
      <div class="saved" v-if="savedAt"><i></i>Enregistré à {{savedAt}}</div>
      <div class="saved" v-else><i></i>Sauvegarde automatique active</div>
      <button class="side-btn" @click="openBackup">Exporter ou importer la partie</button>
      <button class="danger-btn" @click="modal='reset'">Tout remettre à zéro</button>
    </div>
  </aside>
  <div class="scrim" @click="navOpen=false"></div>

  <main class="main">
    <!-- ================= TRACKER ================= -->
    <template v-if="ui.view==='tracker'">
      <div class="page-head"><h1>Tracker</h1>
        <p class="lede">{{stats.mapped}} sorties découvertes sur {{stats.editable}} randomisées.</p></div>
      <div class="container">
        <div v-if="!store.game.milestone.childAvailable && !store.game.milestone.adultAvailable" class="warn-box">
          <span class="warn-box-ic" v-html="ICONS.warn"></span>
          <div><b>Aucun âge n'est encore accessible.</b> Indiquez l'âge de départ dans <a href="#" @click.prevent="modal='game'">État de la partie</a> :
          les zones atteignables et le routeur en dépendent.</div></div>
        <div v-if="missingSpawns.length" class="warn-box">
          <span class="warn-box-ic" v-html="ICONS.warn"></span>
          <div><b>Spawn {{missingSpawns.join(' et ')}} non renseigné{{missingSpawns.length>1?'s':''}}.</b> Les spawns sont randomisés
          (Configuration) mais leur destination n'est pas encore notée dans le Tracker : sans point de départ connu,
          rien n'est calculable comme atteignable.</div></div>
        <div v-if="stats.editable===0" class="warn-box">
          <span class="warn-box-ic" v-html="ICONS.warn"></span>
          <div><b>Aucune sortie n'est randomisée.</b> Choisissez les options de votre seed dans
          <a href="#" @click.prevent="go('config')">Configuration</a> pour commencer à noter les destinations.</div></div>
        <div v-else-if="!visibleAreas.length" class="empty"><b>Rien à afficher avec les filtres actuels.</b>
          Cochez « Afficher les sorties découvertes » ou « Afficher les zones non atteintes » dans le panneau de gauche.</div>

        <article v-for="va in visibleAreas" :key="va.area.id" class="area" :id="'area-'+va.area.id"
          :class="{collapsed:ui.collapsed[va.area.id], unreached:!va.reachable}">
          <button class="area-head" @click="toggleArea(va.area.id)" :aria-expanded="!ui.collapsed[va.area.id]">
            <span class="chev" v-html="ICONS.chevron"></span>
            <h2>{{va.area.name}}</h2>
            <span v-if="!va.reachable" class="pill">Non atteinte</span>
            <span v-if="va.editable" class="area-prog">
              <span class="bar" :class="{done:va.mapped===va.editable}"><i :style="{width:(100*va.mapped/va.editable)+'%'}"></i></span>
              {{va.mapped}}/{{va.editable}}</span>
            <span v-else class="area-prog">Non randomisée</span>
          </button>
          <div v-if="!ui.collapsed[va.area.id]" class="rows" :class="{'no-from':!s.decoupled}">
            <div class="row row-head"><span></span><span></span><span>Sortie</span><span v-if="s.decoupled">Accessible depuis</span><span>{{s.decoupled?'Va vers':'Sortie associée'}}</span><span></span></div>
            <div v-for="r in va.rows" :key="r.e.key" class="row" :class="'m-'+r.mode" :id="'row-'+r.e.key">
              <type-icon :type="iconKey(r.e)"></type-icon>
              <button class="globe" :class="{none:!r.e.connections.length}" :aria-label="'Connexions depuis '+r.e.label"
                @mouseenter="r.e.connections.length && showTip($event,r.e.key)" @mouseleave="hideTip" @focus="r.e.connections.length && showTip($event,r.e.key)" @blur="hideTip"
                @click.stop="r.e.connections.length && toggleTip($event,r.e.key)" v-html="ICONS.globe"></button>
              <div class="c-name">{{r.e.label}}</div>
              <div v-if="s.decoupled" class="c-from"><button v-for="f in r.from" :key="f.key" class="loc link" @click="jump(EXIT[f.key].areaId, f.key)"><b>{{f.area}}</b><span>{{f.label}}</span></button></div>
              <div class="c-dest">
                <dest-picker v-if="r.mode==='open'" :source="r.e.key" @choose="k => setMapping(r.e.key, k)"></dest-picker>
                <span v-else-if="r.mode==='locked'" class="muted">{{r.reason}}</span>
                <button v-else-if="r.target" class="loc link" @click="jump(EXIT[r.target].areaId, r.target)"><b>{{areaName(r.target)}}</b><span>{{EXIT[r.target].label}}</span></button>
                <span v-else class="muted">Dépend de l'entrée du donjon, pas encore connue</span>
              </div>
              <div v-if="r.mode!=='open'" class="c-ind">
                <span v-if="r.mode==='vanilla'" class="badge v" title="Sortie non randomisée">V</span>
                <span v-else-if="r.mode==='auto'" class="badge a" title="Calculé automatiquement : le téléporteur bleu ramène devant l'entrée du donjon">A</span>
                <span v-else-if="r.mode==='locked'" class="badge l" :title="r.reason">?</span>
                <button v-else class="badge x" title="Effacer cette destination" aria-label="Effacer cette destination" @click="clearMapping(r.e.key)" v-html="ICONS.close"></button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </template>

    <!-- ================= ROUTEUR ================= -->
    <template v-if="ui.view==='router'">
      <div class="page-head"><h1>Routeur</h1><p class="lede">Chemin le plus court entre deux sorties, selon ce que vous avez découvert et l'état de la partie.</p></div>
      <div class="rform">
        <div class="rline">
          <div class="rtag">Départ</div>
          <div class="field"><label for="fa">Zone</label>
            <select id="fa" class="sel" v-model="ui.router.fromArea"><option value="" disabled>Choisir une zone</option>
              <option v-for="a in routerAreas" :key="a.id" :value="a.id">{{a.name}}</option></select></div>
          <div class="field"><label for="fe">Sortie</label>
            <select id="fe" class="sel" v-model="ui.router.fromExit" :disabled="!ui.router.fromArea"><option value="" disabled>Choisir une sortie</option>
              <option v-for="e in exitsOf(ui.router.fromArea)" :key="e.key" :value="e.key">{{e.label}}</option></select></div>
          <div class="field agebox"><span class="lbl">Âge</span><seg v-model="ui.router.fromAge" :options="[['child','Enfant'],['adult','Adulte']]"></seg></div>
        </div>
        <div class="rswap"><button type="button" @click="swap"><span v-html="ICONS.swap"></span>Inverser</button></div>
        <div class="rline">
          <div class="rtag">Arrivée</div>
          <div class="field"><label for="ta">Zone</label>
            <select id="ta" class="sel" v-model="ui.router.toArea"><option value="" disabled>Choisir une zone</option>
              <option v-for="a in routerAreas" :key="a.id" :value="a.id">{{a.name}}</option></select></div>
          <div class="field"><label for="te">Sortie</label>
            <select id="te" class="sel" v-model="ui.router.toExit" :disabled="!ui.router.toArea"><option value="" disabled>Choisir une sortie</option>
              <option v-for="e in exitsOf(ui.router.toArea)" :key="e.key" :value="e.key">{{e.label}}</option></select></div>
          <div class="field agebox"><span class="lbl">Âge</span><seg v-model="ui.router.toAge" :options="[['child','Enfant'],['adult','Adulte'],['any','Peu importe']]"></seg></div>
        </div>
      </div>

      <div v-if="route.state==='idle'" class="empty" style="margin-top:20px">Choisissez une sortie de départ et une sortie d'arrivée : l'itinéraire se calcule tout seul.</div>
      <div v-else-if="route.state==='none'" class="warn-box" style="margin-top:20px">
        <span class="warn-box-ic" v-html="ICONS.warn"></span>
        <div><b>Aucun itinéraire connu.</b>
        Il manque soit des sorties découvertes entre ces deux points, soit un objet ou un chant dans l'état de la partie.
        Vérifiez aussi que l'âge demandé est accessible.</div></div>
      <template v-else>
        <div class="rsum">
          <div class="stat"><b>{{route.cost}}</b><span>coût estimé</span></div>
          <div class="stat"><b>{{route.transitions}}</b><span>transition{{route.transitions>1?'s':''}}</span></div>
          <div class="stat" v-if="route.warps"><b>{{route.warps}}</b><span>chant{{route.warps>1?'s':''}} de téléportation</span></div>
          <div class="stat" v-if="route.resets"><b>{{route.resets}}</b><span>rechargement{{route.resets>1?'s':''}}</span></div>
          <div class="stat" v-if="route.ages"><b>{{route.ages}}</b><span>changement{{route.ages>1?'s':''}} d'âge</span></div>
        </div>
        <div class="path">
          <template v-for="(it,i) in route.items" :key="i">
            <div v-if="it.t==='node'" class="node" :class="it.role==='start'?'start':(it.role==='end'||it.role==='both')?'end':''">
              <type-icon :type="iconKey(EXIT[it.key])"></type-icon>
              <div><div class="role" v-if="it.role">{{it.role==='start'?'Départ':it.role==='end'?'Arrivée':'Départ et arrivée'}}</div>
                <b>{{areaName(it.key)}}</b><div class="sub">{{EXIT[it.key].label}}</div></div>
              <span class="age" :class="it.age">{{ageLabel(it.age)}}</span>
            </div>
            <div v-else-if="it.t==='edge'" class="conn">
              <span class="ln"></span>
              <div class="lab"><span class="k" :class="it.e.kind">{{edgeLabel(it.e)}}</span><span class="c">{{it.e.cost}}</span>
                <span v-for="rq in (it.e.reqs||[])" :key="rq" class="req">{{REQ_LABEL[rq]||rq}}</span></div>
              <span class="ln"></span><span class="arrow" v-html="ICONS.caret"></span>
            </div>
            <div v-else class="ageband"><span class="sword" v-html="ICONS.sword"></span>
              <b>Changement d'âge</b><span>{{ageLabel(it.from)}} vers {{ageLabel(it.to)}}, au Temple du Temps</span></div>
          </template>
        </div>
        <p class="note">Coûts de transition, chant, rechargement et changement d'âge réglables dans Configuration.</p>
      </template>
    </template>

    <!-- ================= CONFIGURATION ================= -->
    <template v-if="ui.view==='config'">
      <div class="page-head"><h1>Configuration</h1><p class="lede">Reprenez les réglages Entrance Randomizer de votre seed.</p></div>
      <div v-if="DATA_ERRORS.length" class="errors"><b>{{DATA_ERRORS.length}} incohérence{{DATA_ERRORS.length>1?'s':''}} dans les données</b>
        <ul><li v-for="(er,i) in DATA_ERRORS" :key="i">{{er}}</li></ul></div>
      <div class="cgrid">
        <section class="cblock"><h2>Monde</h2><p>Zones extérieures, bâtiments et grottes.</p>
          <div class="copt"><div><div class="t">Sorties de l'overworld</div></div><seg v-model="s.overworld" :options="[[false,'Vanilla'],[true,'Aléatoires']]"></seg></div>
          <div class="copt"><div><div class="t">Intérieurs</div><div class="h">« Tous » ajoute le moulin, le Temple du Temps, la maison de Link, l'apothicaire et la tombe d'Igor.</div></div>
            <seg v-model="s.interiors" :options="[['off','Vanilla'],['simple','Simples'],['all','Tous']]"></seg></div>
          <div class="copt"><div><div class="t">Grottes et tombes</div></div><seg v-model="s.grottos" :options="[[false,'Vanilla'],[true,'Aléatoires']]"></seg></div>
          <div class="copt"><div><div class="t">Rivière de la Vallée Gerudo</div><div class="h">Sortie à sens unique vers le Lac Hylia.</div></div>
            <seg v-model="s.gerudoRiver" :options="[[false,'Vanilla'],[true,'Aléatoire']]"></seg></div>
        </section>
        <section class="cblock"><h2>Donjons et boss</h2><p>Les téléporteurs bleus suivent automatiquement l'entrée du donjon.</p>
          <div class="copt"><div><div class="t">Donjons</div></div><seg v-model="s.dungeons" :options="[['off','Vanilla'],['simple','Donjons'],['ganon','Donjons + Ganon']]"></seg></div>
          <div class="copt"><div><div class="t">Boss</div><div class="h">« Par âge » mélange les boss enfant entre eux et les boss adulte entre eux.</div></div>
            <seg v-model="s.bosses" :options="[['off','Vanilla'],['age','Par âge'],['full','Complet']]"></seg></div>
          <div class="copt"><div><div class="t">Entrée de la Tour de Ganon</div></div><seg v-model="s.ganonTower" :options="[[false,'Vanilla'],[true,'Aléatoire']]"></seg></div>
          <div class="copt"><div><div class="t">Forteresse Gerudo</div><div class="h">Entrées du repaire des voleurs, mélangées avec les intérieurs.</div></div>
            <seg v-model="s.hideout" :options="[[false,'Vanilla'],[true,'Aléatoires']]"></seg></div>
        </section>
        <section class="cblock"><h2>Apparitions et téléportations</h2><p>Destinations à sens unique : elles s'ajoutent aux entrées existantes.</p>
          <div class="copt"><div><div class="t">Points d'apparition</div></div><seg v-model="s.spawns" :options="[['none','Aucun'],['child','Enfant'],['adult','Adulte'],['all','Tous']]"></seg></div>
          <div class="copt"><div><div class="t">Chants de téléportation</div></div><seg v-model="s.warps" :options="[[false,'Vanilla'],[true,'Aléatoires']]"></seg></div>
          <div class="copt"><div><div class="t">Hiboux</div></div><seg v-model="s.owls" :options="[[false,'Vanilla'],[true,'Aléatoires']]"></seg></div>
        </section>
        <section class="cblock"><h2>Avancé</h2><p>À laisser par défaut sauf réglage spécifique de la seed.</p>
          <div class="copt"><div><div class="t">Entrées découplées</div><div class="h">Par défaut, noter A vers B renseigne aussi B vers A.</div></div>
            <seg v-model="s.decoupled" :options="[[false,'Non'],[true,'Oui']]"></seg></div>
          <div class="copt"><div><div class="t">Pools mélangés</div><div class="h">Proposer toutes les destinations, quel que soit le type de sortie.</div></div>
            <seg v-model="s.mixedPools" :options="[[false,'Non'],[true,'Oui']]"></seg></div>
          <div class="copt" style="display:block"><div class="t">Coûts du routeur</div><div class="h">Même unité que les coûts de déplacement des données.</div>
            <div class="costs">
              <div class="field"><label for="c1">Transition</label><input id="c1" type="number" min="0" v-model.number="store.costs.transition"></div>
              <div class="field"><label for="c2">Chant de téléportation</label><input id="c2" type="number" min="0" v-model.number="store.costs.warp"></div>
              <div class="field"><label for="c3">Sauvegarder et recharger</label><input id="c3" type="number" min="0" v-model.number="store.costs.reset"></div>
              <div class="field"><label for="c4">Changement d'âge</label><input id="c4" type="number" min="0" v-model.number="store.costs.age"></div>
            </div></div>
        </section>
      </div>
    </template>
  </main>

  <!-- Infobulle -->
  <div v-if="tip.show && tipData" class="tip" :style="tip.style" role="tooltip">
    <h4>Depuis « {{tipData.title}} », à pied</h4>
    <ul><li v-for="(c,i) in tipData.items" :key="i" :class="c.ok?'ok':'ko'">
      <span>{{c.label}}</span><span class="cost">{{c.cost}}</span>
      <span v-if="c.cond || c.only" class="cond">{{c.only || ''}}{{c.only && c.cond ? ' : ' : ''}}{{c.cond}}</span></li></ul>
  </div>

  <!-- Modales -->
  <div v-if="modal" class="overlay" @mousedown.self="modal=null">
    <div class="modal" role="dialog" aria-modal="true">
      <template v-if="modal==='game'">
        <header><h3>État de la partie</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body">
          <template v-for="g in GAME_GROUPS" :key="g.title"><h4>{{g.title}}</h4>
            <div class="chips"><button v-for="it in g.items" :key="it[0]" class="chip" :class="{on:store.game[g.path][it[0]]}" :aria-pressed="store.game[g.path][it[0]]"
              @click="store.game[g.path][it[0]] = !store.game[g.path][it[0]]">{{it[1]}}</button></div></template>
        </div>
      </template>
      <template v-else-if="modal==='backup'">
        <header><h3>Exporter ou importer</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body">
          <p style="margin-top:0">La partie est enregistrée automatiquement dans ce navigateur. Pour la transférer ailleurs, copiez ce texte puis collez-le dans l'autre navigateur et cliquez sur « Importer ».</p>
          <textarea v-model="backup.text" spellcheck="false" aria-label="Données de la partie"></textarea>
          <div v-if="backup.msg" class="msg" :class="backup.ok?'ok':'ko'">{{backup.msg}}</div>
          <div class="mactions"><button class="btn" @click="copyBackup">Copier</button><button class="btn primary" @click="importBackup">Importer</button></div>
        </div>
      </template>
      <template v-else-if="modal==='reset'">
        <header><h3>Tout remettre à zéro ?</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body">
          <p style="margin-top:0">Toutes les destinations notées et l'état de la partie seront effacés. La configuration est conservée. Cette action est définitive.</p>
          <div class="mactions"><button class="btn" @click="modal=null">Annuler</button><button class="btn red" @click="resetAll">Tout effacer</button></div>
        </div>
      </template>
    </div>
  </div>
</div>`,
};

const app = createApp(App);
app.config.globalProperties.REQ_LABEL = REQ_LABEL;
app.mount('#app');
document.addEventListener('click', ev => { /* ferme l'infobulle en tactile */ if (!ev.target.closest('.globe')) { const t = document.querySelector('.tip'); if (t) window.dispatchEvent(new Event('scroll')); } });
window.__PF = { store, effC, reachC, edgesC, shortest, candidatesFor, setMapping, EXIT };
