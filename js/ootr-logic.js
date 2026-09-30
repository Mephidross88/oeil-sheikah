/* Ancienne logique (OoT Randomizer), encore utilisée par les pages Entrées et Routeur ; remplacée par js/logic.js
   (logique SoH) aux étapes 4 et 5 de la migration, puis supprimée. */
/* ---------- Conditions ---------- */
const REQUIREMENTS = ['Adult','Child','Epona','Explosive','TitanMass','Bow','GoronBracelet','SilverGauntlets','GoldGauntlets','Hookshot','Longshot','Sticks',
  'DinsFire','NayrusLove','GoronTunic','HoverBoots','IronBoots','SilverScale','TruthLens','ZeldaLullaby','SongOfStorms','SongOfTime','ScarecrowSong',
  'CanUseBeans','LostWoodToGoronVillageUnlocked','GerudoBridgeFixed','CraterShortcutOpened','GerudoPass','AccessToFountain','BlueFire'];
const REQ_LABEL = {
  AccessToFountain:'Accès à la Fontaine Zora', Adult:'Adulte', BlueFire:'Feu bleu', Bow:'Arc', CanUseBeans:'Haricots magiques', Child:'Enfant',
  CraterShortcutOpened:'Raccourci du Cratère', DinsFire:'Feu de Din', Epona:'Epona', Explosive:'Explosifs', GerudoBridgeFixed:'Pont Gerudo réparé',
  GerudoPass:'Carte Gerudo', GoldGauntlets:"Gantelets d'Or", GoronBracelet:'Bracelet Goron', GoronTunic:'Tunique Goron', Hookshot:'Grappin',
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
    case 'DinsFire': return i.dinsFire && i.hasMagic;
    case 'NayrusLove': return i.nayrusLove && i.hasMagic;
    case 'GoronTunic': return A && i.goronTunic;
    case 'IronBoots': return A && i.ironBoots;
    case 'HoverBoots': return A && i.hoverBoots;
    case 'SilverScale': return i.silverScale;
    case 'TruthLens': return i.truthLens && i.hasMagic;
    case 'ZeldaLullaby': return oc && s.zeldaLullaby;
    case 'SongOfStorms': return oc && s.songOfStorms;
    case 'SongOfTime': return oc && s.songOfTime;
    case 'ScarecrowSong': return A && oc && (i.hookshot || i.longshot) && s.scarecrowSong;
    case 'CanUseBeans': return A && m.childAvailable && i.beans;
    case 'LostWoodToGoronVillageUnlocked': return m.lostWoodsGoronShortcut;
    case 'GerudoBridgeFixed': return m.gerudoBridgeFixed;
    case 'CraterShortcutOpened': return m.craterShortcut;
    case 'GerudoPass': return i.gerudoCard && m.adultAvailable;
    case 'AccessToFountain': return i.rutoLetter && m.childAvailable;
    case 'BlueFire': return i.bottle && m.adultAvailable;
  }
  return false;
}
/** Porte du Temps (réglage SoH « Door of Time ») : Fermée = vanilla (Pierres Spirituelles, Ocarina du
 * Temps et Chant du Temps), « Chant seul » = Chant du Temps joué à l'ocarina, Ouverte = aucune condition. */
function canOpenDoorOfTime(mode, it, sg){
  const stones = it.kokiriEmerald && it.goronRuby && it.zoraSapphire;
  const sot = it.ocarina >= 1 && sg.songOfTime;
  switch (mode){
    case 'Open': return true;
    case 'Song only': return sot;
    default: return stones && it.ocarina >= 2 && sot;
  }
}
/** Aplati les objets progressifs (store.game.items) en indicateurs booléens consommés par sat().
 * `ages` = { child, adult } déjà résolus par computeAges() : évite toute dépendance circulaire. */
function deriveGame(raw, settings, ages){
  const it = raw.items, sg = raw.songs;
  const hasExplosives = it.bombBag >= 1 || it.bombchus >= 1;
  // Ouverture du raccourci Bois Perdus <-> Ville Goron (event "GC Woods Warp Open" du randomizer) :
  // explosifs, Feu de Din, Arc (adulte) ou Force suffisent, une fois pour toutes.
  const gcWoodsWarpOpen = hasExplosives || (it.dinsFire && it.magic >= 1) || (ages.adult && it.bow >= 1) || it.strength >= 1;
  // Carte Gerudo : toujours notée à la main dans le panneau Objets, même avec des charpentiers libres.
  const gerudoCardEff = it.gerudoCard;
  return {
    milestone: {
      childAvailable: ages.child, adultAvailable: ages.adult,
      // "Epona" (event du randomizer) = adulte + Ocarina + Chant d'Epona appris.
      epona: it.ocarina >= 1 && sg.eponasSong,
      lostWoodsGoronShortcut: gcWoodsWarpOpen,
      craterShortcut: hasExplosives,
      gerudoBridgeFixed: gerudoCardEff,
    },
    songs: sg,
    items: {
      bombs: it.bombBag >= 1, bombchus: it.bombchus >= 1, titanMass: it.titanMass, bow: it.bow >= 1,
      goronBracelet: it.strength >= 1, silverGauntlets: it.strength >= 2, goldGauntlets: it.strength >= 3,
      hookshot: it.hookshot >= 1, longshot: it.hookshot >= 2, sticks: it.sticks >= 1,
      dinsFire: it.dinsFire, nayrusLove: it.nayrusLove, goronTunic: it.goronTunic, ironBoots: it.ironBoots, hoverBoots: it.hoverBoots,
      silverScale: it.scale >= 1, truthLens: it.truthLens, ocarina: it.ocarina >= 1, beans: it.beans, bottle: it.bottle >= 1,
      rutoLetter: it.rutoLetter, hasMagic: it.magic >= 1, gerudoCard: gerudoCardEff,
    },
  };
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

// Correspondance avec les réglages d'entrées de Ship of Harkinian (js/config.js). SoH ne mélange pas la
// rivière de la Vallée Gerudo, et « points d'apparition » couvre à la fois le spawn enfant et adulte.
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
  }
  return false;
}
const isDecoupled = s => s.decoupleEntrances === 'On';
// Pools mélangés SoH : deux sorties de types différents peuvent s'échanger si chacune appartient à un type
// dont l'option « Mix … » est activée.
const MIX_KEY = { overworld:'mixOverworld', interior:'mixInteriors', grotto:'mixGrottos', dungeon:'mixDungeons', boss:'mixBosses' };
function isMixed(e, s){
  if (s.mixedEntrancePools !== 'On') return false;
  const k = e.shuffleTag === 'hideout' ? 'mixThievesHideout' : MIX_KEY[poolOf(e)];
  return !!k && s[k] === 'On';
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
function makeEdges(G, C, eff){
  const ms = G.milestone;
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

function flood(ages, eff, edges){
  const seen = new Set(), nodes = new Set(), q = [];
  const push = (k, a) => { const id = k + '|' + a; if (!k || seen.has(id)) return; seen.add(id); nodes.add(k); q.push([k, a]); };
  if (ages.child) push(eff['spawns::spawn_child'], 'child');
  if (ages.adult) push(eff['spawns::spawn_adult'], 'adult');
  while (q.length){ const [k, a] = q.shift(); for (const ed of edges(k, a)) push(ed.to, ed.age); }
  return nodes;
}
/** Âge de départ (Configuration) toujours acquis ; l'autre âge se déduit en vérifiant que le Temple du
 * Temps est atteignable dans l'âge de départ, avec les conditions d'ouverture de la Porte du Temps. */
function computeAges(store, eff){
  const settings = store.settings;
  const age = settings.startingAge === 'Random' ? settings.selectedStartingAge : settings.startingAge;
  const startAge = age === 'Adult' ? 'adult' : 'child';
  const startKey = eff[startAge === 'child' ? 'spawns::spawn_child' : 'spawns::spawn_adult'];
  if (!startKey) return { child: startAge === 'child', adult: startAge === 'adult' };
  const trial = { child: startAge === 'child', adult: startAge === 'adult' };
  const G = deriveGame(store.game, settings, trial);
  const edges = makeEdges(G, store.costs, eff);
  const seen = new Set([startKey + '|' + startAge]), q = [[startKey, startAge]];
  while (q.length){
    const [k, a] = q.shift();
    for (const ed of edges(k, a)){
      if (!ed.to) continue;
      const id = ed.to + '|' + ed.age;
      if (!seen.has(id)){ seen.add(id); q.push([ed.to, ed.age]); }
    }
  }
  const canSwap = seen.has(TOT + '|' + startAge) && canOpenDoorOfTime(settings.doorOfTime, store.game.items, store.game.songs);
  return startAge === 'child' ? { child:true, adult:canSwap } : { child:canSwap, adult:true };
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
