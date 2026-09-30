/* ---------- État persistant ---------- */
const STORE_KEY = 'oeil-sheikah-v1';
function defaults(){
  const game = { items:{}, songs:{}, dungeons:{}, checklists:{} };
  ITEM_GROUPS.forEach(g => g.items.forEach(it => { game[g.path][it.key] = it.locked ? true : it.kind === 'bool' ? false : 0; }));
  DUNGEONS.forEach(d => { game.dungeons[d.id] = { map:false, compass:false, keys:0, bossKey:false }; });
  Object.entries(CHECKLISTS).forEach(([name, c]) => {
    game.checklists[name] = {};
    c.locations.forEach(loc => { game.checklists[name][loc.id] = false; });
  });
  return {
    version:1,
    settings:{ overworld:false, interiors:'off', grottos:false, gerudoRiver:false, dungeons:'off', bosses:'off', ganonTower:false, hideout:false,
      spawns:'none', warps:false, owls:false, decoupled:false, mixedPools:false,
      startingAge:'child', openDoorOfTime:'stones_sot', gerudoFortress:'normal',
      triforceHunt:false, triforceHuntMax:20 },
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
const agesC = computed(() => computeAges(store, effC.value));
const gameC = computed(() => deriveGame(store.game, store.settings, agesC.value));
const edgesC = computed(() => makeEdges(gameC.value, store.costs, effC.value));
const reachC = computed(() => flood(agesC.value, effC.value, edgesC.value));

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
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const areaName = k => AREA[EXIT[k]?.areaId]?.name || '?';

/* ---------- Tuiles d'objets (panneau/page Objets) ---------- */
// Fonctions globales (plutôt que des méthodes locales au composant App) afin d'être réutilisables
// depuis n'importe quel composant affichant des tuiles d'objets (ex. ItemTile dans components.js).
const brokenIcons = reactive({});
const itemActive = (it, v) => it.locked || it.neverEmpty || (typeof v === 'boolean' ? v : v > 0);
function setCount(path, key, max, v){ store.game[path][key] = Math.max(0, Math.min(max, Math.round(v) || 0)); }
function itemTitle(path, it){
  const v = store.game[path][it.key];
  if (it.locked) return `${it.label} (toujours possédé)`;
  if (it.kind === 'level') return `${it.label} — ${it.stages[v]}`;
  if (it.kind === 'count') return `${it.label} : ${v}`;
  return it.label;
}
// Pastille grise tant que l'objet n'est pas à son maximum, dorée une fois au maximum
// (ex. Skulltulas : gris jusqu'à 99, doré à 100 ; Arc : gris à 30/40, doré à 50).
function itemMaxed(path, it){
  const v = store.game[path][it.key];
  if (it.kind === 'count') return v >= itemMax(it);
  if (it.kind === 'level' && it.sizes) return v >= it.stages.length - 1;
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
function clickItem(ev, path, it){
  if (it.locked) return;
  const v = store.game[path][it.key];
  if (it.kind === 'bool'){ if (!v) store.game[path][it.key] = true; }
  else if (it.kind === 'level'){ if (v < it.stages.length - 1) store.game[path][it.key] = v + 1; }
  else setCount(path, it.key, itemMax(it), v + (ev.shiftKey ? 10 : 1));
}
function rightClickItem(ev, path, it){
  if (it.locked) return;
  const v = store.game[path][it.key];
  if (it.kind === 'bool'){ if (v) store.game[path][it.key] = false; }
  else if (it.kind === 'level'){ if (v > 0) store.game[path][it.key] = v - 1; }
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
function toggleChecklist(name, id){ const c = store.game.checklists[name]; c[id] = !c[id]; }
function checklistStats(name){
  const c = store.game.checklists[name], locations = CHECKLISTS[name].locations;
  return { got:locations.filter(l => c[l.id]).length, total:locations.length };
}

/* ---------- Objets de donjon (carte / boussole / petites clés / clé de boss) ---------- */
// Purement informatif pour l'instant (voir DUNGEONS dans js/items.js), pas encore branché au Routeur.
function toggleDungeonFlag(id, field){ const d = store.game.dungeons[id]; d[field] = !d[field]; }
function addDungeonKeys(id, delta){
  const d = store.game.dungeons[id], max = DUNGEON_BY_ID[id].maxKeys || 0;
  d.keys = Math.max(0, Math.min(max, d.keys + delta));
}
