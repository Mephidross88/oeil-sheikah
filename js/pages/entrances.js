/* ---------- Page Entrées : où mène chaque entrée (sorties notées, filtres, progression) ; infobulle des connexions à pied. ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const ENTRANCES_SIDE_TPL = `
    <section v-if="shown('entrances')" class="side-sec" :style="{order:paneOf('entrances')==='side' ? 2 : 1}">
      <div v-if="splitOn" class="side-title side-page">Entrées</div>
      <div class="side-row"><button class="side-btn" @click="setAll(false)">Tout déplier</button><button class="side-btn" @click="setAll(true)">Tout replier</button></div>
      <label class="check"><input type="checkbox" v-model="ui.filters.showReachableTargets">Proposer les destinations déjà atteignables ou déjà mappées</label>
      <label class="check"><input type="checkbox" v-model="ui.filters.showInaccessibleAreas">Afficher les zones non atteintes</label>
      <label class="check"><input type="checkbox" v-model="ui.filters.showInaccessibleExits">Afficher les sorties pas encore accessibles</label>
      <label class="check"><input type="checkbox" v-model="ui.filters.showDiscovered">Afficher les sorties découvertes</label>
      <label class="check"><input type="checkbox" v-model="ui.filters.showVanilla">Afficher les sorties non randomisées</label>
      <div class="side-title">Zones</div>
      <div class="zone-nav">
        <button v-for="va in visibleAreas" :key="va.area.id" @click="jump(va.area.id)">
          <span>{{va.area.name}}</span>
          <span v-if="va.editable" class="zp" :class="{done:va.mapped===va.editable}">{{va.mapped}}/{{va.editable}}</span></button>
      </div>
    </section>
`;

const ENTRANCES_TPL = `
    <section v-if="shown('entrances')" class="pane" :class="'pane-' + paneOf('entrances')">
      <div v-if="paneOf('entrances')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Entrées</h1></div>
      <div class="container">
        <div v-if="missingSpawns.length" class="warn-box">
          <span class="warn-box-ic" v-html="ICONS.warn"></span>
          <div><b>{{tn(missingSpawns.length, 'Spawn {list} non renseigné.', 'Spawns {list} non renseignés.', {list:missingSpawns.join(t(' et '))})}}</b> Les spawns sont randomisés
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
            <div v-for="r in va.rows" :key="r.e.key" class="row" :class="['m-'+r.mode, {unreach:!r.reach}]" :id="'row-'+r.e.key" :title="r.reach ? null : 'Pas encore accessible : on ne peut pas encore prendre cette sortie (logique SoH)'">
              <type-icon :type="iconKey(r.e)" :src="exitIcon(r.e)"></type-icon>
              <button class="globe" :class="{none:!r.e.connections.length}" :aria-label="'Connexions depuis '+r.e.label"
                @mouseenter="r.e.connections.length && showTip($event,r.e.key)" @mouseleave="hideTip" @focus="r.e.connections.length && showTip($event,r.e.key)" @blur="hideTip"
                @click.stop="r.e.connections.length && toggleTip($event,r.e.key)" v-html="ICONS.globe"></button>
              <div class="c-name" :title="r.e.soh">{{r.e.label}}<button v-if="r.e.areaId !== 'spawns'" type="button" class="r-go" title="Y aller (Routeur, depuis le départ actuel)" v-html="ICONS.router" @click.stop="goExit(r.e.key)"></button></div>
              <div v-if="decoupled" class="c-from"><button v-for="f in r.from" :key="f.key" class="loc link" @click="jump(EXIT[f.key].areaId, f.key)"><b>{{f.area}}</b><span :title="EXIT[f.key].soh">{{f.label}}</span></button></div>
              <div class="c-dest">
                <dest-picker v-if="r.mode==='open'" :source="r.e.key" @choose="k => setMapping(r.e.key, k)"></dest-picker>
                <span v-else-if="r.mode==='locked'" class="muted">{{r.reason}}</span>
                <button v-else-if="r.target" class="loc link" @click="jump(EXIT[r.target].areaId, r.target)"><b>{{areaName(r.target)}}</b><span :title="EXIT[r.target].soh">{{EXIT[r.target].label}}</span></button>
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
    </section>
`;

const TIP_TPL = `
  <!-- Infobulle -->
  <div v-if="tip.show && tipData" class="tip" :style="tip.style" role="tooltip">
    <h4>Depuis « {{tipData.title}} », à pied</h4>
    <ul><li v-for="(c,i) in tipData.items" :key="i" class="ok">
      <span>{{c.label}}</span><span class="cost">{{c.cost}}</span></li></ul>
  </div>
`;

function useEntrancesPage(ctx){
  const { tip, ui } = ctx;
  function rowInfo(e){
    if (e.specialTag && !bossRoomNoted(e, store.settings)) return { mode:'auto', target:effC.value[e.key] };
    if (!e.specialTag && !isRandomized(e, store.settings)) return { mode:'vanilla', target:e.vanilla };
    if (!isUnlocked(e, agesC.value, store.game)) return { mode:'locked', target:null, reason:lockedReason(e) };
    const t = store.mappings[e.key];
    return t && EXIT[t] ? { mode:'set', target:t } : { mode:'open', target:null };
  }

  // Spawns randomisés (Configuration > spawns) mais pas encore renseignés : aucun point de départ connu,
  // donc rien n'est calculable comme atteignable tant qu'ils ne sont pas notés.
  const missingSpawns = computed(() => {
    const ages = agesC.value, eff = effC.value, out = [];
    if (ages.child && isRandomized(EXIT['spawns::spawn_child'], store.settings) && !eff['spawns::spawn_child']) out.push(t('Enfant'));
    if (ages.adult && isRandomized(EXIT['spawns::spawn_adult'], store.settings) && !eff['spawns::spawn_adult']) out.push(t('Adulte'));
    return out;
  });

  // Sorties randomisées (renseignables) et renseignées, au total, par groupe de types et par zone (cadre de progression).
  const ENTRANCE_GROUPS = [[t('Overworld'), ['overworld']], [t('Intérieurs'), ['interior']], [t('Grottes'), ['grotto']],
    [t('Donjons'), ['dungeon', 'boss']], [t('Sens unique'), ['warp', 'owl', 'spawn']]];
  const stats = computed(() => {
    let editable = 0, mapped = 0;
    const byGroup = ENTRANCE_GROUPS.map(g => [g[0], 0, 0]), zones = {};
    for (const e of ALL_EXITS){
      const r = rowInfo(e);
      if (r.mode === 'vanilla' || r.mode === 'auto') continue;
      const set = r.mode === 'set', gi = ENTRANCE_GROUPS.findIndex(g => g[1].includes(e.type));
      editable++; if (set) mapped++;
      if (gi >= 0){ byGroup[gi][2]++; if (set) byGroup[gi][1]++; }
      if (e.areaId === SPAWN_AREA) continue; // apparitions et chants : pas une zone du jeu
      const z = zones[e.areaId] = zones[e.areaId] || { got:0, total:0 }; z.total++; if (set) z.got++;
    }
    const zl = Object.values(zones), left = editable - mapped, zonesDone = zl.filter(z => z.got === z.total).length;
    return { editable, mapped, got:mapped, total:editable, groups:byGroup.filter(g => g[2]),
      sub:t('{left} à découvrir · {done} / {n} zones complètes', { left, done:zonesDone, n:zl.length }) };
  });

  const visibleAreas = computed(() => {
    const f = ui.filters, reach = reachC.value, inc = incC.value, rg = routeC.value;
    // sortie qui peut être prise maintenant (comme la Carte : canTake du Routeur ; sinon une de ses régions est accessible)
    const takeable = e => { const t = rg.canTake(e.key); return t == null ? reach.has(e.key) : t; };
    return AREAS.map(area => {
      const reachable = area.id === SPAWN_AREA || area.exits.some(e => reach.has(e.key));
      if (!reachable && !f.showInaccessibleAreas) return null;
      const all = area.exits.filter(e => !e.destOnly).map(e => ({ e, ...rowInfo(e), reach:area.id === SPAWN_AREA || takeable(e) }));
      const editable = all.filter(r => r.mode !== 'vanilla' && r.mode !== 'auto').length;
      const mapped = all.filter(r => r.mode === 'set').length;
      // (sorties pas encore accessibles : masquées, sauf option ; une sortie déjà notée reste affichée)
      const rows = all.filter(r => (f.showVanilla || (r.mode !== 'vanilla' && r.mode !== 'auto')) && (f.showDiscovered || r.mode !== 'set')
        && (r.reach || r.mode === 'set' || f.showInaccessibleExits));
      if (!rows.length) return null;
      rows.forEach(r => { r.from = (inc[r.e.key] || []).map(k => ({ key:k, area:areaName(k), label:EXIT[k].label })); });
      return { area, reachable, rows, editable, mapped };
    }).filter(Boolean);
  });


  /* Infobulle des connexions internes : sorties de la même zone et coût de marche (les conditions de passage sont
     celles de la logique SoH, par région ; le Routeur les reprendra à l'étape 5) */
  const tipData = computed(() => {
    if (!tip.key) return null;
    const e = EXIT[tip.key];
    return { title:e.label, items:e.connections.map(c => ({ label:EXIT[c.to]?.label || c.to, cost:c.cost })) };
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

  return { rowInfo, missingSpawns, ENTRANCE_GROUPS, stats, visibleAreas, tipData, showTip, hideTip, toggleTip };
}
