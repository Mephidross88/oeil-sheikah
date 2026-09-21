/* ---------- État persistant ---------- */
const STORE_KEY = 'oeil-sheikah-v1';
function defaults(){
  const game = { items:{}, songs:{} };
  ITEM_GROUPS.forEach(g => g.items.forEach(it => { game[g.path][it.key] = it.locked ? true : it.kind === 'bool' ? false : 0; }));
  return {
    version:1,
    settings:{ overworld:false, interiors:'off', grottos:false, gerudoRiver:false, dungeons:'off', bosses:'off', ganonTower:false, hideout:false,
      spawns:'none', warps:false, owls:false, decoupled:false, mixedPools:false,
      startingAge:'child', openDoorOfTime:'stones_sot', gerudoFortress:'normal',
      triforceHunt:false, triforceHuntMax:20 },
    costs:{ transition:3, warp:15, reset:25, age:12 },
    game, mappings:{},
    ui:{ view:'tracker', collapsed:{}, itemsCollapsed:{},
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
