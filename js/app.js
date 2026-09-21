/* ---------- Application ---------- */
const App = {
  components:{ TypeIcon, Seg, DestPicker },
  setup(){
    const navOpen = ref(false), itemsOpen = ref(false), modal = ref(null), tip = reactive({ show:false, key:null, style:{} });
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

    const itemActive = (it, v) => it.locked || it.neverEmpty || (typeof v === 'boolean' ? v : v > 0);
    function setCount(path, key, max, v){ store.game[path][key] = Math.max(0, Math.min(max, Math.round(v) || 0)); }
    const brokenIcons = reactive({});
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
    function toggleItemGroup(title){ ui.itemsCollapsed[title] = !ui.itemsCollapsed[title]; }

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

    return { store, ui, s, views, navOpen, itemsOpen, modal, tip, tipData, backup, stats, missingSpawns, visibleAreas, ages:agesC, derived:gameC,
      ICONS, ITEM_GROUPS, AREA, EXIT, DATA_ERRORS,
      iconKey, areaName, toggleArea, setAll, jump, go, showTip, hideTip, toggleTip, setMapping, clearMapping, setCount,
      brokenIcons, itemTitle, itemMaxed, clickItem, rightClickItem, itemActive, iconSrc, itemVisible, toggleItemGroup,
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
        <span v-if="v.id==='tracker'" class="nav-meta">{{stats.mapped}}/{{stats.editable}}</span></button>
    </nav>

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

  <main class="main">
    <!-- ================= TRACKER ================= -->
    <template v-if="ui.view==='tracker'">
      <div class="page-head"><h1>Tracker</h1>
        <p class="lede">{{stats.mapped}} sorties découvertes sur {{stats.editable}} randomisées.</p></div>
      <div class="container">
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
              <span class="count">{{va.mapped}}/{{va.editable}}</span></span>
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
        <section class="cblock"><h2>Progression</h2><p>Détermine automatiquement les âges accessibles, Epona et les raccourcis (voir panneau Objets).</p>
          <div class="copt"><div><div class="t">Âge de départ</div></div><seg v-model="s.startingAge" :options="[['child','Enfant'],['adult','Adulte']]"></seg></div>
          <div class="copt"><div><div class="t">Porte du Temps</div><div class="h">Condition pour devenir l'autre âge au Temple du Temps.</div></div>
            <select class="sel" v-model="s.openDoorOfTime" style="max-width:280px">
              <option value="stones_sot">Pierres Spirituelles + Chant du Temps</option>
              <option value="stones">Pierres Spirituelles seules</option>
              <option value="stones_oot_sot">Pierres + Ocarina du Temps + Chant du Temps</option>
              <option value="sot">Chant du Temps seul</option>
              <option value="oot_sot">Ocarina du Temps + Chant du Temps</option>
              <option value="open">Ouverte (aucune condition)</option>
            </select></div>
        </section>
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
          <div class="copt"><div><div class="t">Sorties du repaire Gerudo</div><div class="h">Entrées du repaire des voleurs, mélangées avec les intérieurs.</div></div>
            <seg v-model="s.hideout" :options="[[false,'Vanilla'],[true,'Aléatoires']]"></seg></div>
          <div class="copt"><div><div class="t">Forteresse Gerudo — gardiens à libérer</div><div class="h">« Ouverte » donne la Carte Gerudo dès le départ (voir panneau Objets).</div></div>
            <seg v-model="s.gerudoFortress" :options="[['normal','4 (normal)'],['fast','1 (rapide)'],['open','Ouverte']]"></seg></div>
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
          <div class="copt"><div><div class="t">Chasse à la Triforce</div><div class="h">Ajoute le compteur « Morceaux de Triforce » dans le panneau Objets.</div></div>
            <seg v-model="s.triforceHunt" :options="[[false,'Non'],[true,'Oui']]"></seg></div>
          <div class="copt" v-if="s.triforceHunt"><div><div class="t">Morceaux de Triforce requis</div></div>
            <input type="number" min="1" max="100" v-model.number="s.triforceHuntMax" style="width:90px"></div>
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

  <aside class="side side-right" :class="{open:itemsOpen}">
    <div class="side-right-head">
      <h3>Objets</h3>
      <button @click="itemsOpen=false" aria-label="Fermer" v-html="ICONS.close"></button>
    </div>
    <div class="side-right-body">
      <div class="side-title">Progression (calculée)</div>
      <div class="status-strip">
        <span class="status-pill" :class="{on:ages.child}">Enfant</span>
        <span class="status-pill" :class="{on:ages.adult}">Adulte</span>
        <span class="status-pill" :class="{on:derived.milestone.epona}">Epona</span>
        <span class="status-pill" :class="{on:derived.milestone.lostWoodsGoronShortcut}">Bois Perdus ↔ Goron</span>
        <span class="status-pill" :class="{on:derived.milestone.craterShortcut}">Raccourci Cratère</span>
        <span class="status-pill" :class="{on:derived.milestone.gerudoBridgeFixed}">Pont/Carte Gerudo</span>
      </div>
      <p class="note">Déterminé automatiquement à partir de la Configuration et des objets ci-dessous — voir SPEC.md.</p>
      <template v-for="g in ITEM_GROUPS" :key="g.title">
        <button type="button" class="side-title group-head" @click="toggleItemGroup(g.title)" :aria-expanded="!ui.itemsCollapsed[g.title]">
          <span v-html="ICONS.chevron" :class="{collapsed:ui.itemsCollapsed[g.title]}"></span>{{g.title}}</button>
        <div v-if="!ui.itemsCollapsed[g.title]" class="icon-grid">
          <template v-for="it in g.items" :key="it.key">
          <button v-if="itemVisible(it)" type="button" class="icon-tile" :class="{off:!itemActive(it, store.game[g.path][it.key])}"
            :disabled="it.locked" :aria-label="it.label" :title="itemTitle(g.path, it)"
            @click="clickItem($event, g.path, it)" @contextmenu.prevent="rightClickItem($event, g.path, it)">
            <img v-if="!brokenIcons[iconSrc(g.path,it)]" :src="iconSrc(g.path,it)" :alt="it.label" @error="brokenIcons[iconSrc(g.path,it)]=true">
            <span v-else class="icon-fallback" v-html="ICONS.bag"></span>
            <span v-if="it.kind==='count'" class="icon-badge" :class="{maxed:itemMaxed(g.path,it)}">{{store.game[g.path][it.key]}}</span>
            <span v-else-if="it.sizes && it.sizes[store.game[g.path][it.key]]" class="icon-badge" :class="{maxed:itemMaxed(g.path,it)}">{{it.sizes[store.game[g.path][it.key]]}}</span>
          </button>
          </template>
        </div>
      </template>
      <p class="note">Clic gauche : augmenter / activer. Clic droit : diminuer / désactiver. Majuscule + clic sur un compteur : ±10.</p>
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
    <div class="modal" role="dialog" aria-modal="true">
      <template v-if="modal==='backup'">
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
