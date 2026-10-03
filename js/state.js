/* ---------- État persistant ---------- */
const STORE_KEY = 'oeil-sheikah-v1';
function defaults(){
  // trials : épreuves de Ganon tirées au sort, '' inconnue / 'required' / 'skipped'
  // loot : trouvailles comptées par l'auto-tracking (pièges de glace, rubis et leur valeur, objets de remplissage)
  const game = { items:{}, songs:{}, dungeons:{}, checklists:{}, checks:{}, trials:Object.fromEntries(TRIALS.map(t => [t.id, ''])),
    loot:{ iceTraps:0, rupees:0, rupeeValue:0, junk:0 },
    found:{},     // found : objet trouvé dans chaque check { id: numéro RandomizerGet, ou nom du spoiler } (auto-tracking)
    seen:{} };    // seen : objets vus en boutique / chez les pestes et marchands { id: [nom affiché, prix] } (spoiler caché)
  ITEM_GROUPS.forEach(g => g.items.forEach(it => { game[g.path][it.key] = it.locked ? true : it.kind === 'bool' ? false : 0; }));
  DUNGEONS.forEach(d => { game.dungeons[d.id] = { map:false, compass:false, keys:0, bossKey:false, soul:false, quest:'', keyRing:'', ringGot:false }; });
  Object.entries(CHECKLISTS).forEach(([name, c]) => {
    game.checklists[name] = {};
    c.locations.forEach(loc => { game.checklists[name][loc.id] = false; });
  });
  return {
    version:1,
    // Réglages Ship of Harkinian (js/config.js) : valeurs SoH exactes, + astuces de logique activées.
    settings:{ ...Object.fromEntries(SETTINGS_DEF.map(d => [d.key, d.def])),
      tricks:Object.fromEntries(TRICKS.map(t => [t.key, false])),
      // Checks exclus à la génération de la seed (« excludedLocations » du spoiler, ou réglés à la main) : { id: true }
      excluded:{} },
    // walk : coût estimé par région SoH traversée quand areas-data.js n'a pas de coût de marche (intérieur des donjons…)
    costs:{ transition:3, warp:15, reset:25, age:12, walk:4 },
    game, mappings:{},
    ui:{ view:'checks', link:{ enabled:false, url:'http://127.0.0.1:43390', checks:true, items:true, position:true, loot:true, entrances:true }, split:'', itemsFolded:false, navFolded:false, theme:'auto', collapsed:{}, configTab:'logic', importQuests:false, spoilerPrompt:true,
      next:{ open:false },
      checks:{ q:'', hideDone:false, hideDoneZones:false, onlyAvailable:false, showLogic:false, showExcluded:false, alwaysGS:false, sortAvail:true, showFound:true, age:'all', hiddenCats:{}, collapsed:{} },
      filters:{ showReachableTargets:false, showInaccessibleAreas:false, showDiscovered:true, showVanilla:true },
      router:{ fromArea:'', fromExit:'', fromAge:'child', toArea:'', toExit:'', toAge:'any', showCost:false, onlyReachable:true, prevFrom:null } },
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
// Fenêtre de stream (index.html?stream) : la partie vient de la fenêtre principale (événement « storage » à chaque
// sauvegarde de celle-ci) ; elle ne sauvegarde rien elle-même.
const STREAM_MODE = /[?&]stream(&|=|$)/.test(location.search);
if (STREAM_MODE) window.addEventListener('storage', ev => {
  if (ev.key !== STORE_KEY || !ev.newValue) return;
  try { const fresh = merge(defaults(), JSON.parse(ev.newValue)); for (const k of Object.keys(fresh)) store[k] = fresh[k]; } catch (e) {}
});
else watch(store, () => {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); lastSaved.value = new Date(); } catch (e) {}
}, { deep:true });

/* Disposition de la fenêtre de stream, gardée à part (STREAM_KEY) : fond et blocs { id, type, x, y, w, h?, … } (px).
   base : largeur naturelle du contenu (agrandi ou réduit à la largeur du bloc) ; free : bloc à la taille choisie. */
const STREAM_KEY = 'oeil-sheikah-stream';
const STREAM_TYPES = {
  items:{ label:'Objets', base:426, base2:870, init:{ cols:2 } }, progress:{ label:'Progression', base:560 }, next:{ label:'Prochaine étape', base:420 },
  where:{ label:'Où aller maintenant ?', base:420 }, loot:{ label:'Trouvailles', base:426 }, map:{ label:'Carte', base:1000 },
  game:{ label:'Espace vide (jeu)', free:true, w:960, h:540, init:{ frame:true } },
  image:{ label:'Image', free:true, w:300, h:200, init:{ src:'', fit:'contain' } },
  text:{ label:'Texte', free:true, w:500, h:60, init:{ text:'L’Œil Sheikah', size:32 } },
};
const streamDefaults = () => ({ bg:'#00b140', color:'#00b140', widgets:[   // pour un écran 1920 × 1080
  { id:1, type:'items', x:20, y:20, w:580, cols:2 },
  { id:2, type:'game', x:620, y:20, w:1280, h:720, frame:true },
  { id:3, type:'progress', x:620, y:760, w:420 },
  { id:4, type:'next', x:1060, y:760, w:420 },
  { id:5, type:'where', x:1500, y:760, w:400 },
  { id:6, type:'loot', x:20, y:760, w:580 },
] });
function loadStream(){
  try { const raw = localStorage.getItem(STREAM_KEY); if (raw){ const v = JSON.parse(raw); if (Array.isArray(v.widgets)) return { ...streamDefaults(), ...v }; } } catch (e) {}
  return streamDefaults();
}

// Objets à paliers sous leur premier palier atteignable (ex. Bourse à 0 sans « Bourse enfant » mélangée) :
// remontés à ce palier, au chargement puis à chaque changement (configuration, remise à zéro…).
function raiseToFirstLevel(){
  ITEM_GROUPS.forEach(g => g.items.forEach(it => {
    if (it.kind !== 'level' || !it.levels) return;
    const min = Math.min(...itemLevels(it));
    if (store.game[g.path][it.key] < min) store.game[g.path][it.key] = min;
  }));
}
watch(() => [store.settings, store.game], raiseToFirstLevel, { deep:true, immediate:true });

// Cibles effectives : destinations notées ou vanilla, et téléporteurs bleus calculés comme dans la logique SoH.
const effC = computed(() => { const eff = computeEff(store); return Object.assign(eff, blueWarpTargets(eff, store.settings)); });
const incC = computed(() => computeIncoming(effC.value));
// Destinations notées dans Entrées -> liaisons de la logique (sortie randomisée pas encore notée : impasse, null).
const linksC = computed(() => entranceLinks(effC.value, store.settings));
// Logique Ship of Harkinian (js/logic.js) : régions, événements et checks accessibles avec l'inventaire noté.
const sohC = computed(() => computeSoh(store.settings, store.game, linksC.value));
// Âges accessibles (région racine de SoH, après voyage dans le temps éventuel).
const agesC = computed(() => { const r = sohC.value.access.RR_ROOT || 0; return { child:!!(r & CHILD), adult:!!(r & ADULT) }; });
// Sorties atteignables (page Entrées) : l'une de leurs régions SoH est accessible.
const reachC = computed(() => {
  const access = sohC.value.access;
  return new Set(ALL_EXITS.filter(e => exitRegions(e).some(r => access[r])).map(e => e.key));
});
// Même calcul avec un inventaire « tout obtenu » (objets au maximum, chants, objets de donjon, âmes, clés des
// portes…) : âges et moments où chaque check est faisable un jour (pastilles Enfant / Adulte, filtre d'âge).
// Ne dépend que de la configuration, de la version des donjons notée et des entrées notées (une entrée pas encore
// notée y garde sa destination vanilla, pour ne pas déclarer « jamais faisable » ce qui est seulement inconnu).
function fullGame(s){
  const g = defaults().game;
  ITEM_GROUPS.forEach(gr => gr.items.forEach(it => {
    g[gr.path][it.key] = it.kind === 'bool' ? true : it.kind === 'level' ? Math.max(...itemLevels(it)) : itemMax(it);
  }));
  DUNGEONS.forEach(d => Object.assign(g.dungeons[d.id], { map:true, compass:true, bossKey:true, soul:true, ringGot:true,
    keys:Math.max(d.maxKeys || 0, d.mqKeys || 0), quest:store.game.dungeons[d.id].quest }));
  Object.assign(g.trials, store.game.trials);   // tirage du seed, comme la version des donjons
  Object.values(g.checklists).forEach(c => Object.keys(c).forEach(k => { c[k] = true; }));
  return g;
}
// Routeur : graphe de déplacement sur la logique SoH (js/logic.js, routeGraph).
const routeC = computed(() => routeGraph(store.settings, store.game, linksC.value, effC.value, store.costs));
const sohFullC = computed(() => computeSoh(store.settings, fullGame(store.settings),
  Object.fromEntries(Object.entries(linksC.value).filter(([, to]) => to))));

/* Pourquoi un check n'est pas faisable (page Checks). Jamais faisable (même avec tout et les entrées inconnues
   d'origine : configuration) ; derrière une entrée pas encore notée (pas faisable même avec tout l'inventaire) ; sinon
   objets manquants, au plus juste : l'inventaire « tout obtenu » est ramené vers l'inventaire noté tant que le check
   reste faisable — par blocs (un groupe du panneau Objets, les objets d'un donjon, une check-list), puis objet par
   objet, puis palier ou nombre au plus bas. Un ensemble minimal parmi d'autres possibles.
   → { never } | { entrances } | { items:[{ label, src }], age } */
const DUNGEON_FLAGS = [['map', 'carte'], ['compass', 'boussole'], ['bossKey', 'clé du boss'], ['keys', 'petites clés'],
  ['soul', 'âme du boss'], ['ringGot', 'trousseau de clés']];
function whyLocked(checkId){
  const rc = 'RC_' + checkId, s = store.settings, links = linksC.value, cur = store.game;
  if (!sohFullC.value.checks[rc]) return { never:true };
  const g = JSON.parse(JSON.stringify(fullGame(s)));
  const bits = () => computeSoh(s, g, links).checks[rc] || 0;
  if (!bits()) return { entrances:true };
  // dimensions où l'inventaire « tout obtenu » dépasse l'inventaire noté : [bloc, objet, clé, valeur notée, valeur pleine, libellé(v), icône(v)]
  const dims = [], num = v => typeof v === 'boolean' ? +v : v || 0;
  ITEM_GROUPS.forEach((gr, bi) => gr.items.forEach(it => {
    const lo = num(cur[gr.path][it.key]), hi = num(g[gr.path][it.key]);
    if (hi > lo) dims.push({ block:'g' + bi, obj:g[gr.path], key:it.key, bool:it.kind === 'bool', lo, hi,
      label:v => it.kind === 'level' && it.stages ? it.stages[v] : it.kind === 'count' ? it.label + ' : ' + v : it.label,
      src:v => it.kind === 'level' && !it.sizes ? (it.icons ? 'icons/' + it.icons[Math.max(1, v) - 1] : 'icons/items/' + it.key + '_' + Math.max(1, v) + '.png')
        : 'icons/' + (it.icon || 'items/' + it.key + '.png') });
  }));
  DUNGEONS.forEach(d => DUNGEON_FLAGS.forEach(([k, name]) => {
    const lo = num(cur.dungeons[d.id][k]), hi = num(g.dungeons[d.id][k]);
    if (hi > lo) dims.push({ block:'d' + d.id, obj:g.dungeons[d.id], key:k, bool:k !== 'keys', lo, hi,
      label:v => d.title + ' : ' + (k === 'keys' ? v + ' petite' + (v > 1 ? 's' : '') + ' clé' + (v > 1 ? 's' : '') : name), src:() => null });
  }));
  Object.entries(CHECKLISTS).forEach(([name, c]) => c.locations.forEach(l => {
    if (g.checklists[name][l.id] && !cur.checklists[name][l.id])
      dims.push({ block:'c' + name, obj:g.checklists[name], key:l.id, bool:true, lo:0, hi:1, label:() => c.title + ' : ' + l.label, src:() => null });
  }));
  const set = (d, v) => { d.obj[d.key] = d.bool ? !!v : v; d.v = v; };
  dims.forEach(d => { d.v = d.hi; });
  // 1. par blocs, 2. un à un, 3. palier / nombre au plus bas (dichotomie)
  for (const b of [...new Set(dims.map(d => d.block))]){
    const ds = dims.filter(d => d.block === b && d.v !== d.lo);
    ds.forEach(d => set(d, d.lo));
    if (!bits()) ds.forEach(d => set(d, d.hi));
  }
  for (const d of dims) if (d.v !== d.lo){ set(d, d.lo); if (!bits()) set(d, d.hi); }
  for (const d of dims) if (d.v - d.lo > 1){
    let lo = d.lo, hi = d.v;   // faisable à hi, pas à lo
    while (hi - lo > 1){ const m = (lo + hi) >> 1; set(d, m); if (bits()) hi = m; else lo = m; }
    set(d, hi);
  }
  const b = bits();
  return { items:dims.filter(d => d.v !== d.lo).map(d => ({ label:d.label(d.v), src:d.src(d.v) })),
    age:(b & CHILD) && (b & ADULT) ? 'both' : b & CHILD ? 'child' : 'adult' };
}

/* ---------- Mutations ---------- */
function clearMapping(src){
  const old = store.mappings[src];
  if (!old) return;
  delete store.mappings[src];
  if (!isDecoupled(store.settings) && EXIT[old] && isCoupledPair(EXIT[src], EXIT[old]) && store.mappings[old] === src) delete store.mappings[old];
}
function setMapping(src, target){
  clearMapping(src);
  store.mappings[src] = target;
  if (!isDecoupled(store.settings) && isCoupledPair(EXIT[src], EXIT[target]) && target !== src){
    if (store.mappings[target]) clearMapping(target);
    store.mappings[target] = src;
  }
}
// Destinations des sens uniques (entrance.cpp, BuildOneWayTargets) : on y apparaît comme en prenant une entrée de ces types.
// Hiboux : ni intérieurs ni grottes, et pas la plateforme du Prélude de la Lumière.
const ONE_WAY_TARGETS = { owl:['WarpSong', 'OwlDrop', 'Overworld'],
  spawn:['Spawn', 'WarpSong', 'OwlDrop', 'Overworld', 'Interior', 'SpecialInterior', 'GrottoGrave'] };
ONE_WAY_TARGETS.warp = ONE_WAY_TARGETS.spawn;
const PRELUDE_PAD = 'market::prelude_pad';
function candidatesFor(srcKey){
  const src = EXIT[srcKey], s = store.settings, pool = poolOf(src), eff = effC.value, inc = incC.value;
  if (pool === 'oneway'){  // hiboux, chants, spawns : destinations supplémentaires, ne consomment pas la cible
    const types = ONE_WAY_TARGETS[src.shuffleTag];
    return ALL_EXITS.filter(e => e.areaId !== SPAWN_AREA && !(src.shuffleTag === 'owl' && e.key === PRELUDE_PAD)
      && [...(ARRIVAL_TYPES[e.key] || [])].some(t => types.includes(t)));
  }
  // Salles de boss : pool 'boss' (une porte mène à une salle ou à la Tour de Ganon) et pool 'bossBack' (une salle ressort
  // devant une porte). « Age Restricted » : salles enfant entre elles, salles adulte et Tour de Ganon entre elles.
  const bossRandom = e => isRandomized(isBossDoor(e) ? e : BOSS_DOORS.find(d => d.vanilla === e.key) || e, s);
  const srcPool = isBossDoor(src) ? 'boss' : isBossRoom(src) ? 'bossBack' : pool;
  const sameBossPool = e => s.bossEntrances === 'Full' || !(isBossDoor(src) || isBossRoom(src)) || bossChildPool(src) === bossChildPool(e);
  // Pool d'une destination : on n'apparaît jamais « à » la rivière Gerudo, mais à son arrivée au Lac Hylia, destination
  // de l'overworld quand la rivière est mélangée (entrées découplées).
  const targetPool = e => e.key === GV_RIVER ? null
    : e.key === GV_RIVER_END ? (isRandomized(EXIT[GV_RIVER], s) ? 'overworld' : null)
    : isBossRoom(e) ? (bossRandom(e) && sameBossPool(e) ? 'boss' : null)
    : isBossDoor(e) ? (bossRandom(e) && sameBossPool(e) ? 'bossBack' : null)
    : isTwoWay(e) && isRandomized(e, s) ? poolOf(e) : null;
  // Destination déjà prise par une autre sortie (les sens uniques ne consomment rien ; la sortie calculée d'une salle
  // de boss non plus).
  const takes = k => k !== srcKey && poolOf(EXIT[k]) !== 'oneway' && (!EXIT[k].specialTag || bossRoomNoted(EXIT[k], s));
  return ALL_EXITS.filter(e => {
    const p = targetPool(e);
    if (!p || e.key === srcKey || e.areaId === SPAWN_AREA) return false;
    if (p !== srcPool && !(isMixed(src, s) && isMixed(e, s))) return false;
    if ((inc[e.key]||[]).some(takes)) return false;
    if (!isDecoupled(s) && store.mappings[e.key] && store.mappings[e.key] !== srcKey) return false;
    return true;
  });
}
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const areaName = k => AREA[EXIT[k]?.areaId]?.name || '?';

/* ---------- Tuiles d'objets (panneau/page Objets) ---------- */
// Fonctions globales (plutôt que des méthodes locales au composant App) afin d'être réutilisables
// depuis n'importe quel composant affichant des tuiles d'objets (ex. ItemTile dans components.js).
const brokenIcons = reactive({});
const itemActive = (it, v) => it.locked || (typeof v === 'boolean' ? v : v > 0);
function setCount(path, key, max, v){ store.game[path][key] = Math.max(0, Math.min(max, Math.round(v) || 0)); }
function itemTitle(path, it){
  const v = store.game[path][it.key];
  if (it.locked) return `${it.label} (toujours possédé)`;
  if (it.kind === 'level') return `${it.label} — ${it.stages[v]}`;
  if (it.kind === 'count' && it.goal) return `${it.label} : ${v} (requis ${it.goal(store.settings)}, total ${itemMax(it)})`;
  if (it.kind === 'count') return `${it.label} : ${v}`;
  return it.label;
}
// Pastille grise tant que l'objet n'est pas à son maximum, dorée une fois au maximum
// (ex. Skulltulas : gris jusqu'à 99, doré à 100 ; Arc : gris à 30/40, doré à 50).
function itemMaxed(path, it){
  const v = store.game[path][it.key];
  if (it.kind === 'count') return v >= (it.goal ? it.goal(store.settings) : itemMax(it));
  if (it.kind === 'level' && it.sizes) return v >= Math.max(...itemLevels(it));
  return false;
}
// Chemin d'icône : convention par défaut icons/items/<clé>[_<palier>].png, sauf si l'objet définit
// `icon` (chemin fixe, relatif à icons/) ou `icons` (tableau de chemins, un par palier non nul).
// Objets à paliers : le palier 0 réutilise l'image du palier 1, grisée (classe .off).
function iconSrc(path, it){
  const v = store.game[path][it.key];
  // `sizes` : seule la capacité change (arc, lance-pierre, bâton, noix, bombes, bourse) ->
  // une seule icône, la pastille de taille indique le palier (voir template).
  if (it.kind === 'level' && !it.sizes){
    if (it.icons) return 'icons/' + it.icons[Math.max(1, v) - 1];
    return 'icons/items/' + it.key + '_' + Math.max(1, v) + '.png';
  }
  return 'icons/' + (it.icon || 'items/' + it.key + '.png');
}
// Clic gauche = augmenter/activer, clic droit = diminuer/désactiver ; jamais de bouclage :
// un objet déjà au maximum (ou non progressif déjà obtenu) ignore le clic gauche, et un objet
// non obtenu ignore le clic droit.
// Objets de départ (réglages « Start with… » de SoH) → niveau minimal de l'objet dans le panneau Objets.
const STARTING_ITEMS = [
  ['startingOcarina', 'ocarina', v => ({ 'Fairy Ocarina':1, 'Ocarina of Time':2 })[v] || 0],
  ['startingDekuShield', 'dekuShield'], ['startingKokiriSword', 'kokiriSword'], ['startingMasterSword', 'masterSword'],
  // bâtons / noix de départ : munitions seulement, données par SoH si le sac n'est pas mélangé (savefile.cpp) ;
  // un sac mélangé reste à trouver
  ['startingSticks', 'sticks', (v, s) => v === 'Yes' && s.shuffleStickBag !== 'On' ? 1 : 0],
  ['startingNuts', 'nuts', (v, s) => v === 'Yes' && s.shuffleNutBag !== 'On' ? 1 : 0], ['startingBeans', 'beans'],
  ['startingSkulltulaTokens', 'skulltulaTokens', v => v],
  ['startingZeldasLullaby', 'zeldaLullaby'], ['startingEponasSong', 'eponasSong'], ['startingSariasSong', 'sariasSong'],
  ['startingSunsSong', 'sunsSong'], ['startingSongOfTime', 'songOfTime'], ['startingSongOfStorms', 'songOfStorms'],
  ['startingMinuetOfForest', 'minuet'], ['startingBoleroOfFire', 'bolero'], ['startingSerenadeOfWater', 'serenade'],
  ['startingRequiemOfSpirit', 'requiem'], ['startingNocturneOfShadow', 'nocturne'], ['startingPreludeOfLight', 'prelude'],
];
// Coche les objets de départ de la configuration ; ne retire jamais rien de ce que le joueur a déjà noté.
// Renvoie le nombre d'objets modifiés.
function applyStartingItems(s){
  let n = 0;
  for (const [setting, key, level = v => (v === 'On' || v === 'Yes') ? 1 : 0] of STARTING_ITEMS){
    const it = ITEM_BY_KEY[key], want = level(s[setting], s);
    const cur = store.game[it.path][key];
    if (it.kind === 'bool'){ if (want && !cur){ store.game[it.path][key] = true; n++; } }
    else if (want > cur){ store.game[it.path][key] = Math.min(want, it.kind === 'level' ? Math.max(...itemLevels(it)) : itemMax(it)); n++; }
  }
  return n;
}
function clickItem(ev, path, it){
  if (it.locked) return;
  const v = store.game[path][it.key];
  if (it.kind === 'bool'){ if (!v) store.game[path][it.key] = true; }
  else if (it.kind === 'level'){ const next = itemLevels(it).find(l => l > v); if (next !== undefined) store.game[path][it.key] = next; }
  else setCount(path, it.key, itemMax(it), v + (ev.shiftKey ? 10 : 1));
}
function rightClickItem(ev, path, it){
  if (it.locked) return;
  const v = store.game[path][it.key];
  if (it.kind === 'bool'){ if (v) store.game[path][it.key] = false; }
  else if (it.kind === 'level'){ const prev = itemLevels(it).filter(l => l < v).pop(); if (prev !== undefined) store.game[path][it.key] = prev; }
  else setCount(path, it.key, itemMax(it), v - (ev.shiftKey ? 10 : 1));
}
/* ---------- Chaînes d'échange : compteur obtenu/total par âge ---------- */
function tradeStats(id){
  const keys = ITEMS_PAGE.trade[id].flat();
  return { got:keys.filter(k => store.game[ITEM_BY_KEY[k].path][k]).length, total:keys.length };
}

/* ---------- Check-lists de lieux (clés hors donjon, trous à haricots) ---------- */
// Purement informatif pour l'instant (voir CHECKLISTS dans js/items.js) : bascule coché/décoché,
// pas encore branché au Routeur.
// Clic gauche = cocher, clic droit = décocher (même règle que les tuiles d'objets).
function setChecklist(name, id, on){ store.game.checklists[name][id] = on; }
function checklistStats(name){
  const c = store.game.checklists[name], locations = CHECKLISTS[name].locations;
  return { got:locations.filter(l => c[l.id]).length, total:locations.length };
}

/* ---------- Objets de donjon (carte / boussole / petites clés / clé de boss) ---------- */
// Purement informatif pour l'instant (voir DUNGEONS dans js/items.js), pas encore branché au Routeur.
// Clic gauche = obtenu, clic droit = retiré (carte, boussole, âme, clé de boss).
function setDungeonFlag(id, field, on){ store.game.dungeons[id][field] = on; }
// Statut effectif d'un donjon : imposé par la configuration, sinon noté par le joueur ('' = inconnu).
const dungeonQuest = id => configQuest(id, store.settings) || store.game.dungeons[id].quest || '';
// Petites clés attendues selon le statut ; null si le statut est inconnu et que Vanilla et MQ diffèrent.
function dungeonMaxKeys(id){
  if (id === 'gerudoFortress' && store.settings.fortressCarpenters === 'Fast') return 1;
  const d = DUNGEON_BY_ID[id], v = d.maxKeys || 0, mq = d.mqKeys ?? v, q = dungeonQuest(id);
  return q === 'MQ' ? mq : q === 'Vanilla' || v === mq ? v : null;
}
// Clic sur le statut : inconnu → Vanilla → MQ → inconnu (sans effet s'il est imposé par la configuration).
function cycleDungeonQuest(id, back){
  if (configQuest(id, store.settings)) return;
  const order = ['', 'Vanilla', 'MQ'], d = store.game.dungeons[id];
  d.quest = order[(order.indexOf(d.quest) + (back ? 2 : 1)) % 3];
}
// Trousseau du donjon : true / false, ou null tant qu'on ne sait pas. Imposé par la configuration, sinon
// déduit de la partie : trousseau obtenu → oui ; tirage importé du spoiler ('yes'/'no') ; une petite clé
// notée → pas de trousseau (SoH remplace toutes les petites clés du donjon par le trousseau).
function dungeonKeyRing(id){
  const c = configKeyRing(id, store.settings), g = store.game.dungeons[id];
  if (c !== null) return c;
  if (g.ringGot || g.keyRing === 'yes') return true;
  if (g.keyRing === 'no' || g.keys > 0) return false;
  return null;
}
function setKeyRing(id, on){ store.game.dungeons[id].ringGot = on; }
// Serrures du donjon toutes ouvrables : trousseau obtenu, clé squelette ou toutes les petites clés.
function dungeonKeysDone(id){
  const g = store.game.dungeons[id], max = dungeonMaxKeys(id);
  return store.game.items.skeletonKey || keysAtStart(id, store.settings) || (dungeonKeyRing(id) && g.ringGot)
    || (max !== null && max > 0 && g.keys >= max);
}
function addDungeonKeys(id, delta){
  const d = store.game.dungeons[id], def = DUNGEON_BY_ID[id];
  const max = dungeonMaxKeys(id) ?? Math.max(def.maxKeys || 0, def.mqKeys || 0);
  d.keys = Math.max(0, Math.min(max, d.keys + delta));
}

/* ---------- Épreuves de Ganon (bloc du Château de Ganon) ---------- */
// État d'une épreuve : imposé par la configuration, sinon noté ('' inconnue : comptée comme requise par la logique).
const trialStatus = id => configTrials(store.settings) || store.game.trials[id] || '';
// Clic : inconnue -> requise -> dissipée -> inconnue ; clic droit : sens inverse.
function cycleTrial(id, back){
  if (configTrials(store.settings)) return;
  const order = ['', 'required', 'skipped'];
  store.game.trials[id] = order[(order.indexOf(store.game.trials[id] || '') + (back ? 2 : 1)) % 3];
}

/* ---------- Checks (page Checks, js/checks.js) ---------- */
// Version du donjon d'une zone ('Vanilla' | 'MQ' | '' inconnue) ; les zones hors donjon n'ont que des checks communs.
const areaQuest = area => CHECK_AREA[area].dungeon ? dungeonQuest(CHECK_AREA[area].dungeon) : 'Vanilla';
// Check listé : mélangé selon la configuration et de la version active de son donjon (exclus compris).
const checkListed = c => checkShuffled(c, store.settings, store.ui.checks.alwaysGS) && checkQuestActive(c, areaQuest(c.area));
// Un clic bascule fait / à faire. Stockage creux { id: true }.
function setCheck(id, on){ if (on) store.game.checks[id] = true; else delete store.game.checks[id]; }
function setExcluded(id, on){ if (on) store.settings.excluded[id] = true; else delete store.settings.excluded[id]; }
