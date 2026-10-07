/* ---------- Application ---------- */
/* Coque de l'appli : menu, barres latérales, fenêtres communes (sauvegarde, remise à zéro), assemblage des pages
   (js/pages/*.js : gabarit et logique de chaque page, chargés avant ce fichier). */
// Fenêtre de stream
const STREAM_TPL = streamTemplate({ items:ITEMS_TPL, loot:LOOT_TPL, dungeons:DUNGEONS_TPL });   // fenêtre de stream (js/stream.js)

function useShell(ctx){
  const navOpen = ref(false), itemsOpen = ref(false), modal = ref(null), tip = reactive({ show:false, key:null, style:{} });
  const backup = reactive({ text:'', msg:'', ok:true });
  const ui = store.ui, s = store.settings;
  // Thème : « auto » suit le système (prefers-color-scheme), sinon data-theme force clair ou sombre (voir style.css).
  watch(() => ui.theme, t => { if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t; },
    { immediate:true });
  const setTheme = t => { ui.theme = ui.theme === t ? 'auto' : t; };

  // Pages du menu, par groupe : la partie en cours (Progression), les vues d'ensemble (Aperçus), puis la Configuration à part.
  const views = [
    { id:'checks', label:t('Checks'), icon:ICONS.checks, group:t('Progression') },
    { id:'router', label:t('Routeur'), icon:ICONS.router, group:t('Progression') },
    { id:'entrances', label:t('Entrées'), icon:ICONS.entrances, group:t('Progression') },
    { id:'hints', label:t('Indices'), icon:ICONS.hint, group:t('Progression') },
    { id:'map', label:t('Carte'), icon:ICONS.map, group:t('Aperçus') },
    { id:'graph', label:t('Connexions'), icon:ICONS.graph, group:t('Aperçus') },
    { id:'stats', label:t('Statistiques'), icon:ICONS.stats, group:t('Aperçus') },
    { id:'config', label:t('Configuration'), icon:ICONS.config, group:'' },
  ];
  const navGroups = [...new Set(views.map(v => v.group))].map(g => ({ title:g, views:views.filter(v => v.group === g) }));
  // Mise en page côte à côte : second panneau (ui.split), seulement sur un écran assez large (sinon page principale
  // seule). go() n'ouvre une page que si elle n'est pas déjà affichée (dans un panneau ou l'autre).
  const SPLIT_MIN = 1500, winW = ref(window.innerWidth);
  window.addEventListener('resize', () => { winW.value = window.innerWidth; });
  const canSplit = computed(() => winW.value >= SPLIT_MIN);
  // écran moyen (901 à 1399 px) : panneau Objets en tiroir (onglet sur le bord droit), la page garde sa largeur
  const itemsDrawer = computed(() => winW.value > 900 && winW.value < 1400);
  watch(itemsDrawer, on => { if (!on) itemsOpen.value = false; });
  const splitOn = computed(() => !!ui.split && ui.split !== ui.view && canSplit.value && views.some(v => v.id === ui.split));
  const shown = v => ui.view === v || (splitOn.value && ui.split === v);
  const paneOf = v => splitOn.value && ui.split === v ? 'side' : 'main';
  function swapPanes(){ if (!ui.split) return; const m = ui.view; ui.view = ui.split; ui.split = m; }
  function openSide(v){ if (v === ui.view){ if (ui.split) swapPanes(); return; } ui.split = v; }
  const closeSide = () => { ui.split = ''; };
  if (!views.some(v => v.id === ui.view)) ui.view = views[0].id;

  const MAPS_OK = !!window.MAPS_DATA;
  const mapAreas = AREAS.filter(a => MAP_SCENES[a.id]);

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
  function go(v){
    navOpen.value = false;
    if (shown(v)) return;
    ui.view = v;
    if (ui.split === v) ui.split = '';
    window.scrollTo({ top:0 });
  }
  return { navOpen, itemsOpen, modal, tip, backup, ui, s, setTheme, views, navGroups, SPLIT_MIN, winW,
    canSplit, itemsDrawer, splitOn, shown, paneOf, swapPanes, openSide, closeSide, MAPS_OK, mapAreas, toggleArea, setAll,
    jump, go };
}

function useShellEnd(ctx){
  const { backup, checkStats, dockRoute, fmtDur, hideTip, importClash, importFile, importReport, modal,
    playNow, stats, statsC, ui } = ctx;
  /* Sauvegarde */
  function openBackup(){ backup.text = JSON.stringify({ version:1, settings:store.settings, costs:store.costs, game:store.game, mappings:store.mappings }, null, 1); backup.msg = ''; modal.value = 'backup'; }
  async function copyBackup(){
    try { await navigator.clipboard.writeText(backup.text); backup.ok = true; backup.msg = t('Copié dans le presse-papiers.'); }
    catch (e) { backup.ok = false; backup.msg = t('Copie impossible ici : sélectionnez le texte et copiez-le manuellement.'); }
  }
  function importBackup(){
    try {
      const d = JSON.parse(backup.text), base = defaults();
      // Réglages fusionnés sur place : le template garde une référence directe à store.settings (`s`).
      Object.assign(store.settings, merge(base.settings, d.settings));
      store.costs = merge(base.costs, d.costs); store.game = merge(base.game, d.game);
      store.mappings = Object.fromEntries(Object.entries(d.mappings || {}).filter(([k, v]) => EXIT[k] && EXIT[v]));
      backup.ok = true; backup.msg = t('Partie importée : {n} sorties renseignées.', { n:Object.keys(store.mappings).length });
    } catch (e) { backup.ok = false; backup.msg = t('Texte invalide : collez le contenu complet d’un export.'); }
  }
  function resetAll(){
    const d = defaults();
    store.mappings = {}; store.game = d.game; ui.collapsed = {}; ui.router = d.ui.router;
    importReport.value = null; importFile.value = null; importClash.value = null; ui.spoilerPrompt = true; modal.value = 'spoiler';
  }
  // Proposition d'import d'un spoiler au premier chargement et après une remise à zéro (nouvelle seed) ;
  // elle revient à chaque chargement tant qu'on n'a ni importé un spoiler ni répondu « Non ».
  if (ui.spoilerPrompt) modal.value = 'spoiler';
  function declineSpoiler(){ ui.spoilerPrompt = false; modal.value = null; }

  function onKey(ev){ if (ev.key === 'Escape'){ modal.value = null; hideTip(); } }
  window.addEventListener('keydown', onKey);

  const savedAt = computed(() => lastSaved.value ? lastSaved.value.toLocaleTimeString(LANG === 'fr' ? 'fr-FR' : LANG, { hour:'2-digit', minute:'2-digit', second:'2-digit' }) : null);

  // Fenêtre de stream (index.html?stream) : widgets, dispositions et éditeur (js/stream.js)
  // (valeurs de l'appli lues par les widgets : appelées plus tard, quand elles sont définies)
  const streamCtx = useStream(STREAM_MODE, { checkStats:() => checkStats.value, stats:() => stats.value, playNow:() => playNow.value,
    fmtDur:ms => fmtDur(ms), statsC:() => statsC.value, dockRoute:() => dockRoute.value });
  // fenêtre ouverte à la taille de la toile de la disposition affichée (le navigateur la limite à l'écran)
  const openStream = () => { const c = streamCtx.sp.value.canvas;
    window.open('index.html?stream', 'oeil-sheikah-stream', `width=${c.w},height=${c.h}`); };
  return { openBackup, copyBackup, importBackup, resetAll, declineSpoiler, onKey, savedAt, streamCtx,
    openStream, ...streamCtx };
}

const App = {
  components:{ TypeIcon, Seg, DestPicker, ItemTile, ProgressCard, EntranceGraph, ZoneMap },
  setup(){
    // pages assemblées dans l'ordre (chacune reçoit ce que les précédentes ont défini ; les rares appels vers une page
    // suivante passent par ctx, voir « défini plus loin »)
    const ctx = {};
    for (const use of [useShell, useEntrancesPage, useItemsPanel, useRouterPage, useChecksPage, useDock, useTracking, useConfigPage, useStatsPage, useMapPage, useHintsPage, useShellEnd])
      Object.assign(ctx, use(ctx));
    // (noms globaux utilisés par le gabarit)
    return { LANG, LANGS, I18N_LANGS, setLang, removeLang, store, link, APP_ONLINE, RELAY_DL,
      linkRequestState, linkAdoptSave, linkAsks, linkAnswer, ICONS, ITEMS_PAGE, ITEM_BY_KEY, DUNGEON_BY_ID,
      CHECKLISTS, EXIT, DATA_ERRORS, iconKey, exitIcon, areaName, setMapping, clearMapping, linkClearSpoiler,
      linkSpoilerOk, CHECK_AREA, CHECK_CATS, CHECK_CAT, CHILD, ADULT, visibleKeys, CONFIG_TABS, TRICK_LEVELS,
      itemVisible, tierLabel, iconSrc, setChecklist, checklistStats, tradeStats, TRIALS, trialStatus,
      cycleTrial, setDungeonFlag, addDungeonKeys, cycleDungeonQuest, dungeonKeyRing, setKeyRing,
      dungeonKeysDone, brokenIcons, hintsC, setHintRead, GOSSIP_STONES, HINT_TYPES, CHECK_AREAS, MAP_SCENES,
      MAPS_INFO, WARP_SONGS, saveError, ...ctx };
  },
  template:`
${STREAM_TPL}
<div v-if="!STREAM" class="shell" :class="{'nav-open':navOpen, split:splitOn, 'items-folded':ui.itemsFolded, 'items-drawer':itemsDrawer, 'nav-folded':ui.navFolded}">
  <header class="topbar">
    <button @click="navOpen=!navOpen" aria-label="Menu" v-html="ICONS.menu"></button>
    <span class="brand-mark" v-html="ICONS.eye"></span><span>L'Œil Sheikah</span>
    <button class="topbar-items" @click="itemsOpen=!itemsOpen" aria-label="Objets" v-html="ICONS.bag"></button>
  </header>

  <aside class="side">
    <div class="brand"><span class="brand-mark" v-html="ICONS.eye"></span>
      <div class="brand-text"><div class="brand-name">L'Œil Sheikah</div><div class="brand-sub">Tout voir, tout savoir</div></div>
      <button type="button" class="nav-fold" @click="ui.navFolded=!ui.navFolded" :aria-expanded="!ui.navFolded"
        :title="ui.navFolded ? 'Déplier la barre de gauche' : 'Réduire la barre de gauche'" v-html="ICONS.chevron"></button></div>
    <nav class="nav">
      <template v-for="g in navGroups" :key="g.title">
      <div class="nav-group" :class="{sep:!g.title}">{{g.title}}</div>
      <button v-for="v in g.views" :key="v.id" class="nav-item" :class="{active:shown(v.id), 'in-side':paneOf(v.id)==='side' && shown(v.id)}" :title="ui.navFolded ? v.label : null" @click="go(v.id)">
        <span v-html="v.icon"></span><span class="nav-label">{{v.label}}</span>
        <span v-if="canSplit && !shown(v.id)" class="nav-split" role="button" :title="t('Ouvrir {page} à côté', {page:v.label})" v-html="ICONS.split"
          @click.stop="openSide(v.id)"></span></button>
      </template>
    </nav>

${ENTRANCES_SIDE_TPL}

${ROUTER_SIDE_TPL}

${CHECKS_SIDE_TPL}

    <div class="side-foot">
      <div class="side-foot-row">
        <div class="saved ko" v-if="saveError" title="Le navigateur refuse d'enregistrer (place insuffisante, navigation privée ?) : exportez la partie (Exporter ou importer la partie) pour ne pas la perdre."><i></i>Partie non enregistrée !</div>
        <div class="saved" v-else-if="savedAt"><i></i>Enregistré à {{savedAt}}</div>
        <div class="saved" v-else><i></i>Sauvegarde automatique active</div>
        <div class="theme-sw" role="group" aria-label="Thème">
          <button type="button" :class="{on:ui.theme==='light'}" :aria-pressed="ui.theme==='light'" v-html="ICONS.sun" @click="setTheme('light')"
            :title="ui.theme==='light' ? 'Thème clair (cliquer pour suivre le système)' : 'Thème clair'"></button>
          <button type="button" :class="{on:ui.theme==='dark'}" :aria-pressed="ui.theme==='dark'" v-html="ICONS.moon" @click="setTheme('dark')"
            :title="ui.theme==='dark' ? 'Thème sombre (cliquer pour suivre le système)' : 'Thème sombre'"></button>
        </div>
      </div>
      <button type="button" class="link-btn" :class="link.status" @click="modal='link'" :title="'Auto-tracking : ' + LINK_LABEL[link.status]">
        <span class="link-ic" v-html="ICONS.live"></span><i></i><span class="link-label">{{LINK_LABEL[link.status]}}</span></button>
      <button class="side-btn" @click="openStream" title="Fenêtre à part pour un stream (OBS) : objets, progression, prochaine étape… disposés librement">Fenêtre de stream ↗</button>
      <button class="side-btn" @click="openBackup">Exporter ou importer la partie</button>
      <button class="danger-btn" @click="modal='reset'">Tout remettre à zéro</button>
    </div>
  </aside>

  <main class="main">
    <!-- Progression globale, en tête de toutes les pages : checks, et entrées si certaines sont randomisées -->
    <div class="global-progress">
      <progress-card :stats="checkStats" :unit="t('checks')" title="Checks" :active="ui.view==='checks'" @open="go('checks')"></progress-card>
      <progress-card v-if="stats.editable" :stats="stats" :unit="t('sorties')" title="Entrées" :active="ui.view==='entrances'" @open="go('entrances')"></progress-card>
    </div>
    <div class="panes" :class="{split:splitOn}">
${ENTRANCES_TPL}

${CHECKS_TPL}

${ROUTER_TPL}

${HINTS_TPL}

${MAP_TPL}

${GRAPH_TPL}

${STATS_TPL}

${CONFIG_TPL}
    </div>

${DOCK_TPL}
  </main>

${ITEMS_PANEL_TPL}

  <div class="scrim" @click="navOpen=false; itemsOpen=false"></div>
${ASK_TPL}

${TIP_TPL}

  <!-- Modales -->
  <div v-if="modal" class="overlay" @mousedown.self="modal=null">
    <div class="modal" :class="{wide:checklistModal, compact:tradeModal}" role="dialog" aria-modal="true">
${ITEMS_MODALS_TPL}
${DRIFT_MODAL_TPL}
${WHY_MODAL_TPL}
      <template v-else-if="modal==='backup'">
        <header><h3>Exporter ou importer</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body">
          <p style="margin-top:0">La partie est enregistrée automatiquement dans ce navigateur. Pour la transférer ailleurs, copiez ce texte puis collez-le dans l'autre navigateur et cliquez sur « Importer ».</p>
          <textarea v-model="backup.text" spellcheck="false" aria-label="Données de la partie"></textarea>
          <div v-if="backup.msg" class="msg" :class="backup.ok?'ok':'ko'">{{backup.msg}}</div>
          <div class="mactions"><button class="btn" @click="copyBackup">Copier</button><button class="btn primary" @click="importBackup">Importer</button></div>
        </div>
      </template>
${LINK_MODAL_TPL}
${SPOILER_MODAL_TPL}
      <template v-else-if="modal==='reset'">
        <header><h3>Tout remettre à zéro ?</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body">
          <p style="margin-top:0">Toutes les destinations notées et l'état de la partie seront effacés. La configuration est conservée (l'import d'un nouveau spoiler sera proposé). Cette action est définitive.</p>
          <div class="mactions"><button class="btn" @click="modal=null">Annuler</button><button class="btn red" @click="resetAll">Tout effacer</button></div>
        </div>
      </template>
    </div>
  </div>
</div>`,
};

// langue : gabarits traduits au chargement (js/i18n.js), t() et tn() utilisables dans tous les gabarits
[App, TypeIcon, Seg, DestPicker, ItemTile, ProgressCard, EntranceGraph, ZoneMap].forEach(c => { c.template = tpl(c.template); });
const app = createApp(App);
app.config.globalProperties.t = t;
app.config.globalProperties.tn = tn;
mapsReady.then(() => app.mount('#app'));   // (cartes du navigateur lues avant : js/components.js)
document.addEventListener('click', ev => { /* ferme l'infobulle en tactile */ if (!ev.target.closest('.globe')) { const t = document.querySelector('.tip'); if (t) window.dispatchEvent(new Event('scroll')); } });
window.__PF = { I18N_MISSING, store, effC, linksC, reachC, agesC, routeC, shortest, candidatesFor, setMapping, EXIT, sohC, sohFullC, computeSoh, entranceLinks, L, SOH };
