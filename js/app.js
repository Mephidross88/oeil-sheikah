/* ---------- Application ---------- */
const App = {
  components:{ TypeIcon, Seg, DestPicker, ItemTile },
  setup(){
    const navOpen = ref(false), itemsOpen = ref(false), modal = ref(null), tip = reactive({ show:false, key:null, style:{} });
    const backup = reactive({ text:'', msg:'', ok:true });
    const ui = store.ui, s = store.settings;

    const views = [
      { id:'entrances', label:'Entrées', icon:ICONS.entrances },
      { id:'router', label:'Routeur', icon:ICONS.router },
      { id:'config', label:'Configuration', icon:ICONS.config },
    ];
    if (!views.some(v => v.id === ui.view)) ui.view = views[0].id;

    function rowInfo(e){
      if (e.specialTag) return { mode:'auto', target:effC.value[e.key] };
      if (!isRandomized(e, store.settings)) return { mode:'vanilla', target:e.vanilla };
      if (!isUnlocked(e, gameC.value)) return { mode:'locked', target:null, reason:lockedReason(e) };
      const t = store.mappings[e.key];
      return t && EXIT[t] ? { mode:'set', target:t } : { mode:'open', target:null };
    }

    // Spawns randomisés (Configuration > spawns) mais pas encore renseignés : aucun point de départ connu,
    // donc rien n'est calculable comme atteignable tant qu'ils ne sont pas notés.
    const missingSpawns = computed(() => {
      const ages = agesC.value, eff = effC.value, out = [];
      if (ages.child && isRandomized(EXIT['spawns::spawn_child'], store.settings) && !eff['spawns::spawn_child']) out.push('Enfant');
      if (ages.adult && isRandomized(EXIT['spawns::spawn_adult'], store.settings) && !eff['spawns::spawn_adult']) out.push('Adulte');
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

    /* Check-lists (clés hors donjon, trous à haricots) : purement informatif pour l'instant, voir SPEC.md */
    const checklistModal = computed(() => {
      if (modal.value !== 'checklist-keys' && modal.value !== 'checklist-beans') return null;
      const name = modal.value === 'checklist-keys' ? 'keys' : 'beans', c = CHECKLISTS[name], st = checklistStats(name);
      return { name, title:c.title, locations:c.locations, got:st.got, total:st.total };
    });
    function openChecklist(name){ modal.value = 'checklist-' + name; }

    /* Chaînes d'échange : fenêtre de pointage par âge */
    const tradeModal = computed(() => {
      const b = ITEMS_PAGE.tradeButtons.find(t => modal.value === 'trade-' + t.id);
      return b ? { ...b, groups:ITEMS_PAGE.trade[b.id], ...tradeStats(b.id) } : null;
    });
    function openTrade(id){ modal.value = 'trade-' + id; }
    // État visuel d'un compteur « obtenus/total » : icône grisée si rien, teinte dorée une fois complet.
    const counterClass = (got, total) => ({ none:got === 0, done:total > 0 && got >= total });

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
      const e = EXIT[tip.key], G = gameC.value, ms = G.milestone;
      const ages = [ms.childAvailable && 'child', ms.adultAvailable && 'adult'].filter(Boolean);
      return { title:e.label, items:e.connections.map(c => {
        const ok = ages.filter(a => connGroup(c, G, a));
        const only = ok.length === 1 && ages.length === 2 ? (ok[0] === 'child' ? 'Enfant uniquement' : 'Adulte uniquement') : '';
        return { label:EXIT[c.to]?.label || c.to, cost:c.cost, ok:ok.length > 0, cond:c.req && c.req.length ? fmtReq(c.req) : '', only };
      }) };
    });
    function showTip(ev, key){
      const r = ev.currentTarget.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
      const left = Math.max(8, Math.min(r.right + 10, vw - 450));
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

    /* Panneau Objets piloté par la configuration : cadres et cases vides masqués */
    const panelSkills = computed(() => ITEMS_PAGE.skills.map(r => ({ ...r, items:visibleKeys(r.items) })).filter(r => r.items.length));
    const panelChecklists = computed(() => ITEMS_PAGE.checklistButtons.filter(c => !c.visible || c.visible(s)));
    const cells = id => dungeonCells(id, s);
    const dungeonRows = computed(() => ITEMS_PAGE.dungeons.rows
      .map(r => r.filter(id => Object.values(dungeonCells(id, s)).some(Boolean))).filter(r => r.length));

    /* Configuration Ship of Harkinian (js/config.js) */
    const decoupled = computed(() => isDecoupled(s));
    // Cartes de l'onglet courant, chacune avec ses options visibles (règles de visibilité de SoH) ; une carte
    // sans option visible disparaît.
    const configCards = computed(() => {
      const tab = CONFIG_TABS.find(t => t.id === ui.configTab);
      return (tab?.cards || []).map(([id, title]) => ({ id, title,
        defs:SETTINGS_DEF.filter(d => d.card === tab.id + '.' + id && settingVisible(d, s)) })).filter(c => c.defs.length);
    });
    const trickFilter = reactive({ q:'', level:'', quest:'' });
    const tricksOn = computed(() => TRICKS.filter(t => s.tricks[t.key]).length);
    const trickGroups = computed(() => {
      const q = norm(trickFilter.q.trim()), lv = trickFilter.level, qu = trickFilter.quest;
      const shown = TRICKS.filter(t => (!q || norm(t.name + ' ' + TRICK_AREAS[t.area]).includes(q))
        && (!lv || t.tags.includes(lv)) && (!qu || t.quest === 'BOTH' || t.quest === qu));
      return Object.keys(TRICK_AREAS).map(area => {
        const tricks = shown.filter(t => t.area === area);
        return { area, label:TRICK_AREAS[area], tricks, on:tricks.filter(t => s.tricks[t.key]).length };
      }).filter(g => g.tricks.length);
    });
    function setTricks(list, on){ list.forEach(t => { s.tricks[t.key] = on; }); }

    // Import depuis un spoiler SoH : ne lit QUE `settings` et `enabledTricks` (jamais l'emplacement des objets).
    const importReport = ref(null);
    function importSpoiler(ev){
      const file = ev.target.files[0];
      ev.target.value = '';
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        let data;
        try { data = JSON.parse(reader.result); } catch (e) { importReport.value = { ok:false, title:'Fichier illisible : ce n’est pas un JSON valide.', notes:[] }; return; }
        const settings = data && data.settings;
        if (!settings || typeof settings !== 'object'){ importReport.value = { ok:false, title:'Aucune section « settings » : ce n’est pas un spoiler SoH.', notes:[] }; return; }
        const notes = [];
        if (typeof data.version === 'string' && !data.version.includes('9.2.3'))
          notes.push(`Version « ${data.version} » : l'appli suit SoH 9.2.3, certaines options peuvent différer.`);
        let count = 0;
        for (const [name, raw] of Object.entries(settings)){
          const d = SETTING_BY_SOH[name];
          if (!d){ if (!SETTINGS_IGNORED.has(name)) notes.push(`Option inconnue ignorée : « ${name} ».`); continue; }
          const val = String(raw);
          if (d.type === 'number'){
            const n = parseInt(val, 10);
            if (Number.isNaN(n) || n < d.min || n > d.max){ notes.push(`Valeur inattendue pour « ${name} » : ${val}.`); continue; }
            s[d.key] = n;
          } else {
            if (!d.choices.some(c => c[0] === val)){ notes.push(`Valeur inattendue pour « ${name} » : « ${val} ».`); continue; }
            s[d.key] = val;
          }
          count++;
        }
        const enabled = Array.isArray(data.enabledTricks) ? data.enabledTricks : [];
        TRICKS.forEach(t => { s.tricks[t.key] = false; });
        let tricks = 0;
        for (const name of enabled){
          const t = TRICK_BY_NAME[name];
          if (t){ s.tricks[t.key] = true; tricks++; } else notes.push(`Astuce inconnue ignorée : « ${name} ».`);
        }
        const started = applyStartingItems(s);
        importReport.value = { ok:true, notes,
          title:`Configuration importée : ${count} option${count>1?'s':''}, ${tricks} astuce${tricks>1?'s':''} activée${tricks>1?'s':''}`
            + (started ? `, ${started} objet${started>1?'s':''} de départ coché${started>1?'s':''} dans le panneau Objets.` : '.') };
      };
      reader.readAsText(file);
    }

    /* Sauvegarde */
    function openBackup(){ backup.text = JSON.stringify({ version:1, settings:store.settings, costs:store.costs, game:store.game, mappings:store.mappings }, null, 1); backup.msg = ''; modal.value = 'backup'; }
    async function copyBackup(){
      try { await navigator.clipboard.writeText(backup.text); backup.ok = true; backup.msg = 'Copié dans le presse-papiers.'; }
      catch (e) { backup.ok = false; backup.msg = 'Copie impossible ici : sélectionnez le texte et copiez-le manuellement.'; }
    }
    function importBackup(){
      try {
        const d = JSON.parse(backup.text), base = defaults();
        // Réglages fusionnés sur place : le template garde une référence directe à store.settings (`s`).
        Object.assign(store.settings, merge(base.settings, d.settings));
        store.costs = merge(base.costs, d.costs); store.game = merge(base.game, d.game);
        store.mappings = Object.fromEntries(Object.entries(d.mappings || {}).filter(([k, v]) => EXIT[k] && EXIT[v]));
        backup.ok = true; backup.msg = `Partie importée : ${Object.keys(store.mappings).length} sorties renseignées.`;
      } catch (e) { backup.ok = false; backup.msg = 'Texte invalide : collez le contenu complet d’un export.'; }
    }
    function resetAll(){
      const d = defaults();
      store.mappings = {}; store.game = d.game; ui.collapsed = {}; ui.router = d.ui.router;
      modal.value = null;
    }

    function onKey(ev){ if (ev.key === 'Escape'){ modal.value = null; hideTip(); } }
    window.addEventListener('keydown', onKey);

    const savedAt = computed(() => lastSaved.value ? lastSaved.value.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) : null);

    return { store, ui, s, views, navOpen, itemsOpen, modal, tip, tipData, backup, stats, missingSpawns, visibleAreas,
      ICONS, ITEMS_PAGE, ITEM_BY_KEY, DUNGEONS, DUNGEON_BY_ID, CHECKLISTS, AREA, EXIT, DATA_ERRORS,
      iconKey, areaName, toggleArea, setAll, jump, go, showTip, hideTip, toggleTip, setMapping, clearMapping,
      panelSkills, panelChecklists, cells, dungeonRows, visibleKeys,
      CONFIG_TABS, TRICK_LEVELS, decoupled, configCards, trickFilter, tricksOn, trickGroups, setTricks, importReport, importSpoiler,
      itemVisible, tierLabel, iconSrc, checklistModal, openChecklist, toggleChecklist, checklistStats,
      tradeModal, openTrade, tradeStats, counterClass,
      toggleDungeonFlag, addDungeonKeys,
      routerAreas, exitsOf, swap, route, edgeLabel, ageLabel, openBackup, copyBackup, importBackup, resetAll, savedAt, TYPE_LABEL };
  },
  template:`
<div class="shell" :class="{'nav-open':navOpen}">
  <header class="topbar">
    <button @click="navOpen=!navOpen" aria-label="Menu" v-html="ICONS.menu"></button>
    <span class="brand-mark" v-html="ICONS.eye"></span><span>L'Œil Sheikah</span>
    <button class="topbar-items" @click="itemsOpen=!itemsOpen" aria-label="Objets" v-html="ICONS.bag"></button>
  </header>

  <aside class="side">
    <div class="brand"><span class="brand-mark" v-html="ICONS.eye"></span>
      <div><div class="brand-name">L'Œil Sheikah</div><div class="brand-sub">Tout voir, tout savoir</div></div></div>
    <nav class="nav">
      <button v-for="v in views" :key="v.id" class="nav-item" :class="{active:ui.view===v.id}" @click="go(v.id)">
        <span v-html="v.icon"></span>{{v.label}}
        <span v-if="v.id==='entrances'" class="nav-meta">{{stats.mapped}}/{{stats.editable}}</span></button>
    </nav>

    <section v-if="ui.view==='entrances'" class="side-sec">
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

  <main class="main">
    <!-- ================= TRACKER ================= -->
    <template v-if="ui.view==='entrances'">
      <div class="page-head"><h1>Entrées</h1>
        <p class="lede">{{stats.mapped}} sorties découvertes sur {{stats.editable}} randomisées.</p></div>
      <div class="container">
        <div v-if="missingSpawns.length" class="warn-box">
          <span class="warn-box-ic" v-html="ICONS.warn"></span>
          <div><b>Spawn {{missingSpawns.join(' et ')}} non renseigné{{missingSpawns.length>1?'s':''}}.</b> Les spawns sont randomisés
          (Configuration) mais leur destination n'est pas encore notée dans Entrées : sans point de départ connu,
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
              <span class="count">{{va.mapped}}/{{va.editable}}</span></span>
            <span v-else class="area-prog">Non randomisée</span>
          </button>
          <div v-if="!ui.collapsed[va.area.id]" class="rows" :class="{'no-from':!decoupled}">
            <div class="row row-head"><span></span><span></span><span>Sortie</span><span v-if="decoupled">Accessible depuis</span><span>{{decoupled?'Va vers':'Sortie associée'}}</span><span></span></div>
            <div v-for="r in va.rows" :key="r.e.key" class="row" :class="'m-'+r.mode" :id="'row-'+r.e.key">
              <type-icon :type="iconKey(r.e)"></type-icon>
              <button class="globe" :class="{none:!r.e.connections.length}" :aria-label="'Connexions depuis '+r.e.label"
                @mouseenter="r.e.connections.length && showTip($event,r.e.key)" @mouseleave="hideTip" @focus="r.e.connections.length && showTip($event,r.e.key)" @blur="hideTip"
                @click.stop="r.e.connections.length && toggleTip($event,r.e.key)" v-html="ICONS.globe"></button>
              <div class="c-name">{{r.e.label}}</div>
              <div v-if="decoupled" class="c-from"><button v-for="f in r.from" :key="f.key" class="loc link" @click="jump(EXIT[f.key].areaId, f.key)"><b>{{f.area}}</b><span>{{f.label}}</span></button></div>
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
      <div class="page-head"><h1>Configuration</h1><p class="lede">Réglages du randomizer de Ship of Harkinian 9.2.3 « Ackbar Delta ».</p>
        <label class="btn primary import-btn">Importer depuis un spoiler SoH
          <input type="file" accept=".json,application/json" @change="importSpoiler" hidden></label></div>
      <div v-if="importReport" class="import-report" :class="importReport.ok ? 'ok' : 'ko'">
        <b>{{importReport.title}}</b>
        <ul v-if="importReport.notes.length"><li v-for="(n,i) in importReport.notes" :key="i">{{n}}</li></ul>
        <button type="button" class="link" @click="importReport=null">Fermer</button>
      </div>
      <div v-if="DATA_ERRORS.length" class="errors"><b>{{DATA_ERRORS.length}} incohérence{{DATA_ERRORS.length>1?'s':''}} dans les données</b>
        <ul><li v-for="(er,i) in DATA_ERRORS" :key="i">{{er}}</li></ul></div>

      <nav class="config-tabs">
        <button v-for="t in CONFIG_TABS.filter(t => !t.hidden)" :key="t.id" type="button" :class="{on:ui.configTab===t.id}" @click="ui.configTab=t.id">
          {{t.label}}<span v-if="t.id==='tricks' && tricksOn" class="tab-count">{{tricksOn}}</span></button>
      </nav>

      <div v-if="configCards.length" class="cgrid">
        <section v-for="c in configCards" :key="c.id" class="cblock"><h2>{{c.title}}</h2>
          <div v-for="d in c.defs" :key="d.key" class="copt" :title="'SoH : ' + d.soh">
            <div><div class="t">{{d.label}}</div></div>
            <seg v-if="d.type==='choice' && d.choices.length<=3" v-model="s[d.key]" :options="d.choices"></seg>
            <select v-else-if="d.type==='choice'" class="sel opt-sel" v-model="s[d.key]">
              <option v-for="ch in d.choices" :key="ch[0]" :value="ch[0]">{{ch[1]}}</option></select>
            <input v-else type="number" class="opt-num" :min="d.min" :max="d.max" :step="d.step||1" v-model.number="s[d.key]">
          </div>
        </section>
      </div>

      <template v-if="ui.configTab==='tricks'">
        <div class="trick-filters">
          <input v-model="trickFilter.q" class="trick-search" placeholder="Rechercher une astuce…" aria-label="Rechercher une astuce">
          <select v-model="trickFilter.level" class="sel"><option value="">Toutes difficultés</option>
            <option v-for="(l,k) in TRICK_LEVELS" :key="k" :value="k">{{l}}</option></select>
          <select v-model="trickFilter.quest" class="sel"><option value="">Vanilla et MQ</option>
            <option value="VANILLA">Vanilla</option><option value="MQ">Master Quest</option></select>
          <span class="muted">{{tricksOn}} astuce{{tricksOn>1?'s':''}} active{{tricksOn>1?'s':''}}</span>
        </div>
        <div v-if="!trickGroups.length" class="empty">Aucune astuce ne correspond aux filtres.</div>
        <div class="cgrid">
          <section v-for="g in trickGroups" :key="g.area" class="cblock trick-group">
            <h2>{{g.label}} <span class="muted">{{g.on}}/{{g.tricks.length}}</span></h2>
            <div class="trick-actions"><button type="button" class="link" @click="setTricks(g.tricks,true)">Tout cocher</button>
              <button type="button" class="link" @click="setTricks(g.tricks,false)">Tout décocher</button></div>
            <label v-for="t in g.tricks" :key="t.key" class="trick" :title="'SoH : ' + t.name">
              <input type="checkbox" v-model="s.tricks[t.key]"><span>{{t.name}}</span>
              <span v-for="tag in t.tags" :key="tag" class="trick-tag" :class="'lv-'+tag.toLowerCase()">{{TRICK_LEVELS[tag]}}</span>
              <span v-if="t.quest!=='BOTH'" class="trick-tag">{{t.quest==='MQ'?'MQ':'Vanilla'}}</span>
            </label>
          </section>
        </div>
      </template>

      <div v-if="ui.configTab==='router'" class="cgrid">
        <section class="cblock"><h2>Coûts du routeur</h2><p>Réglages propres à l'appli : même unité que les coûts de déplacement des données.</p>
          <div class="costs">
            <div class="field"><label for="c1">Transition</label><input id="c1" type="number" min="0" v-model.number="store.costs.transition"></div>
            <div class="field"><label for="c2">Chant de téléportation</label><input id="c2" type="number" min="0" v-model.number="store.costs.warp"></div>
            <div class="field"><label for="c3">Sauvegarder et recharger</label><input id="c3" type="number" min="0" v-model.number="store.costs.reset"></div>
            <div class="field"><label for="c4">Changement d'âge</label><input id="c4" type="number" min="0" v-model.number="store.costs.age"></div>
          </div>
        </section>
      </div>
    </template>
  </main>

  <aside class="side side-right" :class="{open:itemsOpen}">
    <div class="side-right-head">
      <button @click="itemsOpen=false" aria-label="Fermer" v-html="ICONS.close"></button>
    </div>
    <div class="side-right-body">
      <section class="panel-card">
      <div class="quest-row">
        <div class="quest-hex">
          <div v-for="(k,i) in ITEMS_PAGE.quest.hex" :key="k" :class="'hex-node hex-'+(i+1)"><item-tile :k="k"></item-tile></div>
          <div v-if="itemVisible(ITEM_BY_KEY[ITEMS_PAGE.quest.center])" class="hex-center"><item-tile :k="ITEMS_PAGE.quest.center"></item-tile></div>
        </div>
        <div class="stones-col"><item-tile v-for="k in ITEMS_PAGE.quest.stones" :key="k" :k="k"></item-tile></div>
        <div class="stat-cols">
          <div v-for="(col,ci) in ITEMS_PAGE.stats" :key="ci" class="stat-col">
            <item-tile v-for="k in col" :key="k" :k="k"></item-tile>
          </div>
        </div>
      </div>
      </section>

      <section class="panel-card">
      <div class="equip-row">
        <div v-for="c in ITEMS_PAGE.equipment.chains" :key="c.title" class="chain-stack">
          <template v-for="(k,i) in c.items" :key="k">
            <span v-if="i" class="chain-link"></span>
            <item-tile :k="k"></item-tile>
          </template>
        </div>
        <span class="equip-divider"></span>
        <div class="equip-side">
          <item-tile v-for="k in ITEMS_PAGE.equipment.progressive" :key="k" :k="k" :badge="tierLabel(ITEM_BY_KEY[k])"></item-tile>
        </div>
      </div>
      </section>

      <section class="panel-card">
      <template v-for="row in ITEMS_PAGE.boxRows" :key="row[0].title">
        <div class="box-row">
          <div v-for="box in row" :key="box.title" v-show="visibleKeys(box.items).length" class="item-box">
            <div class="icon-grid" :class="{cols2:box.cols===2}">
              <item-tile v-for="k in visibleKeys(box.items)" :key="k" :k="k"></item-tile>
            </div>
            <template v-if="box.sub">
              <div class="sub-link"></div>
              <div class="icon-grid sub">
                <item-tile v-for="k in box.sub" :key="k" :k="k"></item-tile>
              </div>
            </template>
          </div>
        </div>
      </template>
      </section>

      <section class="panel-card">
      <div class="song-row"><item-tile v-for="k in ITEMS_PAGE.songs.learned" :key="k" :k="k"></item-tile></div>
      <div class="song-row"><item-tile v-for="k in ITEMS_PAGE.songs.warp" :key="k" :k="k"></item-tile></div>

      <div class="ocarina-frame">
        <div class="ocarina-pad">
          <div class="pad-main"><item-tile :k="ITEMS_PAGE.songs.ocarina"></item-tile></div>
          <div v-if="visibleKeys(ITEMS_PAGE.songs.notes).length" class="pad-notes">
            <div v-for="n in visibleKeys(ITEMS_PAGE.songs.notes)" :key="n" :class="{'pad-a':n==='noteA'}"><item-tile :k="n"></item-tile></div>
          </div>
        </div>
      </div>
      </section>

      <section class="panel-card">
      <div class="checklist-tiles">
        <button v-for="b in ITEMS_PAGE.tradeButtons" :key="b.id" type="button" class="check-tile trade-tile" :title="b.title" @click="openTrade(b.id)"
          :class="counterClass(tradeStats(b.id).got, tradeStats(b.id).total)">
          <img :src="iconSrc('items', ITEM_BY_KEY[b.icon])" alt=""><b>{{tradeStats(b.id).got}}/{{tradeStats(b.id).total}}</b></button>
      </div>
      </section>

      <div class="card-row">
        <section v-if="panelSkills.length" class="panel-card skills-card">
          <div v-for="r in panelSkills" :key="r.title" class="item-box skill-box" :title="r.title">
            <div class="icon-grid"><item-tile v-for="k in r.items" :key="k" :k="k"></item-tile></div>
          </div>
        </section>
        <section class="panel-card checklists-card" :class="{wide:!panelSkills.length}">
          <button v-for="c in panelChecklists" :key="c.id" type="button" class="check-tile check-square" :title="CHECKLISTS[c.id].title"
            @click="openChecklist(c.id)" :class="counterClass(checklistStats(c.id).got, checklistStats(c.id).total)">
            <img :src="c.icon" alt=""><b>{{checklistStats(c.id).got}}/{{checklistStats(c.id).total}}</b></button>
        </section>
      </div>

      <section class="panel-card">
      <div class="dungeon-grid">
        <template v-for="row in dungeonRows" :key="row[0]">
          <div v-for="id in row" :key="id" class="dungeon-block" :class="{solo:row.length===1}" :style="{'--dg':DUNGEON_BY_ID[id].color}">
            <div class="dg-name">{{DUNGEON_BY_ID[id].title}}</div>
            <div class="dg-cells">
            <button v-if="cells(id).map" type="button" class="dg-flag" title="Carte" :class="{on:store.game.dungeons[id].map}" @click="toggleDungeonFlag(id,'map')"><img src="icons/dungeons/map.png" alt=""></button>
            <button v-if="cells(id).compass" type="button" class="dg-flag" title="Boussole" :class="{on:store.game.dungeons[id].compass}" @click="toggleDungeonFlag(id,'compass')"><img src="icons/dungeons/compass.png" alt=""></button>
            <button v-if="cells(id).keys" type="button" class="dg-keys" title="Petites clés" @click="addDungeonKeys(id,1)" @contextmenu.prevent="addDungeonKeys(id,-1)"
              :class="counterClass(store.game.dungeons[id].keys, DUNGEON_BY_ID[id].maxKeys)">
              <img src="icons/dungeons/key.png" alt="">{{store.game.dungeons[id].keys}}/{{DUNGEON_BY_ID[id].maxKeys}}</button>
            <button v-if="cells(id).bossKey" type="button" class="dg-flag" title="Clé de boss" :class="{on:store.game.dungeons[id].bossKey}" @click="toggleDungeonFlag(id,'bossKey')"><img src="icons/dungeons/boss.png" alt=""></button>
            <button v-if="cells(id).card" type="button" class="dg-flag" :class="{on:store.game.items[DUNGEON_BY_ID[id].card]}"
              :title="ITEM_BY_KEY[DUNGEON_BY_ID[id].card].label" @click="store.game.items[DUNGEON_BY_ID[id].card]=!store.game.items[DUNGEON_BY_ID[id].card]">
              <img :src="iconSrc('items', ITEM_BY_KEY[DUNGEON_BY_ID[id].card])" alt=""></button>
            </div>
          </div>
        </template>
      </div>
      </section>
    </div>
  </aside>

  <div class="scrim" @click="navOpen=false; itemsOpen=false"></div>

  <!-- Infobulle -->
  <div v-if="tip.show && tipData" class="tip" :style="tip.style" role="tooltip">
    <h4>Depuis « {{tipData.title}} », à pied</h4>
    <ul><li v-for="(c,i) in tipData.items" :key="i" :class="c.ok?'ok':'ko'">
      <span>{{c.label}}</span><span class="cost">{{c.cost}}</span>
      <span v-if="c.cond || c.only" class="cond">{{c.only || ''}}{{c.only && c.cond ? ' : ' : ''}}{{c.cond}}</span></li></ul>
  </div>

  <!-- Modales -->
  <div v-if="modal" class="overlay" @mousedown.self="modal=null">
    <div class="modal" :class="{wide:checklistModal, compact:tradeModal}" role="dialog" aria-modal="true">
      <template v-if="tradeModal">
        <header><h3>{{tradeModal.title}} · {{tradeModal.got}}/{{tradeModal.total}}</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body trade-modal">
          <div v-for="(grp,gi) in tradeModal.groups" :key="gi" class="trade-block">
            <template v-for="(k,i) in grp" :key="k">
              <span v-if="i" class="chain-link h"></span>
              <item-tile :k="k"></item-tile>
            </template>
          </div>
        </div>
      </template>
      <template v-else-if="checklistModal">
        <header><h3>{{checklistModal.title}} · {{checklistModal.got}}/{{checklistModal.total}}</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body">
          <div class="check-list">
            <button v-for="l in checklistModal.locations" :key="l.id" type="button" class="check-row" :class="{on:store.game.checklists[checklistModal.name][l.id]}" @click="toggleChecklist(checklistModal.name,l.id)">
              <span>{{l.label}}</span><span class="cr-mark" v-html="store.game.checklists[checklistModal.name][l.id]?ICONS.check:ICONS.circleO"></span>
            </button>
          </div>
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
