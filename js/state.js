/* ---------- État persistant ---------- */
const STORE_KEY = 'oeil-sheikah-v1';
function defaults(){
  const game = { items:{}, songs:{}, dungeons:{}, checklists:{}, checks:{} };
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
    costs:{ transition:3, warp:15, reset:25, age:12 },
    game, mappings:{},
    ui:{ view:'entrances', collapsed:{}, configTab:'logic', importQuests:false, spoilerPrompt:true,
      checks:{ q:'', hideDone:false, hideDoneZones:false, showExcluded:false, alwaysGS:false, age:'all', hiddenCats:{}, collapsed:{} },
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

const effC = computed(() => computeEff(store));
const incC = computed(() => computeIncoming(effC.value));
const agesC = computed(() => computeAges(store, effC.value));
const gameC = computed(() => deriveGame(store.game, store.settings, agesC.value));
const edgesC = computed(() => makeEdges(gameC.value, store.costs, effC.value));
const reachC = computed(() => flood(agesC.value, effC.value, edgesC.value));

/* ---------- Mutations ---------- */
function clearMapping(src){
  const old = store.mappings[src];
  if (!old) return;
  delete store.mappings[src];
  if (!isDecoupled(store.settings) && EXIT[old] && isTwoWay(EXIT[src]) && store.mappings[old] === src) delete store.mappings[old];
}
function setMapping(src, target){
  clearMapping(src);
  store.mappings[src] = target;
  if (!isDecoupled(store.settings) && isTwoWay(EXIT[src]) && isTwoWay(EXIT[target]) && target !== src){
    if (store.mappings[target]) clearMapping(target);
    store.mappings[target] = src;
  }
}
function candidatesFor(srcKey){
  const src = EXIT[srcKey], s = store.settings, pool = poolOf(src), eff = effC.value, inc = incC.value;
  if (pool === 'boss'){
    return BOSS_ROOMS.filter(r => (s.bossEntrances === 'Full' || (src.shuffleTag === 'boss_warp_child') === (r.specialTag === 'boss_child'))
      && !BOSS_DOORS.some(d => d.key !== srcKey && eff[d.key] === r.key));
  }
  if (pool === 'oneway'){  // hiboux, chants, spawns : destinations supplémentaires, ne consomment pas la cible
    return ALL_EXITS.filter(e => e.areaId !== SPAWN_AREA && !e.specialTag && e.type !== 'boss'
      && ['overworld','interior','pad'].includes(poolOf(e)));
  }
  return ALL_EXITS.filter(e => {
    if (e.key === srcKey || e.areaId === SPAWN_AREA || !isTwoWay(e) || !isRandomized(e, s)) return false;
    if (poolOf(e) !== pool && !(isMixed(src, s) && isMixed(e, s))) return false;
    if ((inc[e.key]||[]).some(k => k !== srcKey && isTwoWay(EXIT[k]))) return false;
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
  ['startingSticks', 'sticks'], ['startingNuts', 'nuts'], ['startingBeans', 'beans'],
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
    const it = ITEM_BY_KEY[key], want = level(s[setting]);
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

/* ---------- Checks (page Checks, js/checks.js) ---------- */
// Version du donjon d'une zone ('Vanilla' | 'MQ' | '' inconnue) ; les zones hors donjon n'ont que des checks communs.
const areaQuest = area => CHECK_AREA[area].dungeon ? dungeonQuest(CHECK_AREA[area].dungeon) : 'Vanilla';
// Check listé : mélangé selon la configuration et de la version active de son donjon (exclus compris).
const checkListed = c => checkShuffled(c, store.settings, store.ui.checks.alwaysGS) && checkQuestActive(c, areaQuest(c.area));
// Clic gauche = fait, clic droit = pas fait (même règle que les icônes du panneau Objets). Stockage creux { id: true }.
function setCheck(id, on){ if (on) store.game.checks[id] = true; else delete store.game.checks[id]; }
function setExcluded(id, on){ if (on) store.settings.excluded[id] = true; else delete store.settings.excluded[id]; }
