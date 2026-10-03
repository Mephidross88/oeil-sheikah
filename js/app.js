/* ---------- Application ---------- */
/* Fragments du gabarit partagés par la page et la fenêtre de stream (insérés dans le gabarit d'App). */
// Panneau Objets (cartes du panneau de droite)
const ITEMS_TPL = `
      <section class="panel-card">
      <div class="quest-row">
        <div class="quest-hex">
          <div v-for="(k,i) in ITEMS_PAGE.quest.hex" :key="k" :class="'hex-node hex-'+(i+1)"><item-tile :k="k"></item-tile></div>
          <div v-if="itemVisible(ITEM_BY_KEY[ITEMS_PAGE.quest.center])" class="hex-center"><item-tile :k="ITEMS_PAGE.quest.center"></item-tile></div>
        </div>
        <div class="stones-col"><item-tile v-for="k in ITEMS_PAGE.quest.stones" :key="k" :k="k"></item-tile></div>
        <div class="stat-cols">
          <div v-for="(col,ci) in ITEMS_PAGE.stats" :key="ci" class="stat-col">
            <item-tile v-for="k in visibleKeys(col)" :key="k" :k="k"></item-tile>
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

      <div v-if="panelSkills.length || panelChecklists.length" class="card-row">
        <section v-if="panelSkills.length" class="panel-card skills-card">
          <div v-for="r in panelSkills" :key="r.title" class="item-box skill-box" :title="r.title">
            <div class="icon-grid"><item-tile v-for="k in r.items" :key="k" :k="k"></item-tile></div>
          </div>
        </section>
        <section v-if="panelChecklists.length" class="panel-card checklists-card" :class="{wide:!panelSkills.length}">
          <button v-for="c in panelChecklists" :key="c.id" type="button" class="check-tile check-square" :title="CHECKLISTS[c.id].title"
            @click="openChecklist(c.id)" :class="counterClass(checklistStats(c.id).got, checklistStats(c.id).total)">
            <img v-if="!brokenIcons[c.icon]" :src="c.icon" alt="" @error="brokenIcons[c.icon]=true">
            <span v-else class="icon-fallback" v-html="ICONS.bag"></span><b>{{checklistStats(c.id).got}}/{{checklistStats(c.id).total}}</b></button>
        </section>
      </div>

      <section v-if="dungeonRows.length || skeletonShown" class="panel-card">
      <div class="dungeon-grid">
        <div v-for="row in dungeonRows" :key="row[0]" class="dg-row" :class="{final:row.length===1}">
          <div v-if="row.length===1" class="dg-side"></div>
          <div v-for="id in row" :key="id" class="dungeon-block" :class="{'quest-edit':cells(id).quest}" :style="{'--dg':DUNGEON_BY_ID[id].color}"
            :role="cells(id).quest ? 'button' : null" :tabindex="cells(id).quest ? 0 : null" :title="questTitle(id)"
            @click="cycleDungeonQuest(id)" @contextmenu.prevent="cycleDungeonQuest(id,true)" @keydown.enter.self="cycleDungeonQuest(id)">
            <span v-if="DUNGEON_BY_ID[id].quest" class="dg-badge" :class="questClass(id)">{{questLabel(id)}}</span>
            <div class="dg-name">{{DUNGEON_BY_ID[id].title}}</div>
            <div class="dg-cells">
              <!-- 1re ligne : carte, boussole et âme du boss ; 2e ligne : toutes les clés (et la Carte Gerudo) -->
              <div v-if="cells(id).map || cells(id).compass || cells(id).soul" class="dg-line">
                <button v-if="cells(id).map" type="button" class="dg-flag" :title="atStart(id).maps ? 'Carte (dès le départ)' : 'Carte'" :class="{on:atStart(id).maps || store.game.dungeons[id].map, fixed:atStart(id).maps}" :disabled="atStart(id).maps" @click.stop="setDungeonFlag(id,'map',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'map',false)"><img src="icons/dungeons/map.png" alt=""></button>
                <button v-if="cells(id).compass" type="button" class="dg-flag" :title="atStart(id).maps ? 'Boussole (dès le départ)' : 'Boussole'" :class="{on:atStart(id).maps || store.game.dungeons[id].compass, fixed:atStart(id).maps}" :disabled="atStart(id).maps" @click.stop="setDungeonFlag(id,'compass',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'compass',false)"><img src="icons/dungeons/compass.png" alt=""></button>
                <button v-if="cells(id).soul" type="button" class="dg-flag" :title="'Âme de ' + DUNGEON_BY_ID[id].boss" :class="{on:store.game.dungeons[id].soul}"
                  @click.stop="setDungeonFlag(id,'soul',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'soul',false)"><img src="icons/dungeons/boss_soul.png" alt=""></button>
              </div>
              <div v-if="cells(id).keys || cells(id).bossKey || cells(id).card" class="dg-line">
                <button v-if="cells(id).keys && dungeonKeyRing(id)!==true" type="button" class="dg-keys" :title="keysTitle(id)" @click.stop="addDungeonKeys(id,1)" @contextmenu.stop.prevent="addDungeonKeys(id,-1)"
                  :class="{none:!store.game.dungeons[id].keys && !dungeonKeysDone(id), done:dungeonKeysDone(id), fixed:atStart(id).keys}" :disabled="atStart(id).keys">
                  <img src="icons/dungeons/key.png" alt="">{{keysLabel(id)}}</button>
                <button v-if="cells(id).keys && dungeonKeyRing(id)!==false" type="button" class="dg-flag" :class="{on:store.game.dungeons[id].ringGot || store.game.items.skeletonKey}"
                  :title="dungeonKeyRing(id) ? 'Trousseau de clés' : 'Trousseau de clés (peut-être) — le noter indique que ce donjon en a un'"
                  @click.stop="setKeyRing(id,true)" @contextmenu.stop.prevent="setKeyRing(id,false)">
                  <img v-if="!brokenIcons['icons/dungeons/keyring.png']" src="icons/dungeons/keyring.png" alt="" @error="brokenIcons['icons/dungeons/keyring.png']=true">
                  <span v-else class="dg-ring-fallback"><img src="icons/dungeons/key.png" alt=""><img src="icons/dungeons/key.png" alt=""></span></button>
                <button v-if="cells(id).bossKey" type="button" class="dg-flag" :title="atStart(id).bossKey ? 'Clé de boss (dès le départ)' : 'Clé de boss'" :class="{on:atStart(id).bossKey || store.game.dungeons[id].bossKey, fixed:atStart(id).bossKey}" :disabled="atStart(id).bossKey" @click.stop="setDungeonFlag(id,'bossKey',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'bossKey',false)"><img src="icons/dungeons/boss.png" alt=""></button>
                <button v-if="cells(id).card" type="button" class="dg-flag" :class="{on:store.game.items[DUNGEON_BY_ID[id].card]}"
                  :title="ITEM_BY_KEY[DUNGEON_BY_ID[id].card].label" @click.stop="store.game.items[DUNGEON_BY_ID[id].card]=true" @contextmenu.stop.prevent="store.game.items[DUNGEON_BY_ID[id].card]=false">
                  <img :src="iconSrc('items', ITEM_BY_KEY[DUNGEON_BY_ID[id].card])" alt=""></button>
              </div>
              <!-- épreuves de Ganon tirées au sort : inconnue (?) / requise / dissipée (✓) -->
              <div v-if="cells(id).trials" class="dg-line dg-trials">
                <button v-for="t in TRIALS" :key="t.id" type="button" class="dg-trial" :class="trialStatus(t.id) || 'unknown'" :style="{'--tr':t.color}"
                  :title="'Épreuve ' + t.label + ' — ' + ({required:'requise', skipped:'dissipée'}[trialStatus(t.id)] || 'inconnue (comptée comme requise)') + ' — clic : suivant, clic droit : précédent'"
                  @click.stop="cycleTrial(t.id)" @contextmenu.stop.prevent="cycleTrial(t.id,true)">{{trialStatus(t.id)==='skipped' ? '✓' : trialStatus(t.id) ? t.label[0] : '?'}}</button>
              </div>
            </div>
          </div>
          <div v-if="row.length===1" class="dg-side"><ItemTile v-if="skeletonShown && row[0]==='ganonsCastle'" k="skeletonKey"/></div>
        </div>
        <div v-if="skeletonShown && !dungeonRows.some(r => r.includes('ganonsCastle'))" class="dg-row final">
          <div class="dg-side"></div><div class="dg-side"><ItemTile k="skeletonKey"/></div><div class="dg-side"></div>
        </div>
      </div>
      </section>

      <!-- Trouvailles comptées par l'auto-tracking (option) -->
`;
// Trouvailles de l'auto-tracking
const LOOT_TPL = `
      <section v-if="ui.link.loot" class="panel-card loot-card" title="Comptées par l'auto-tracking : objets reçus pendant qu'il tourne (pas ceux ramassés par terre sans fenêtre « objet obtenu »)">
        <div class="loot ice"><span class="loot-ic"><img v-if="!brokenIcons['icons/loots/ice_trap.png']" src="icons/loots/ice_trap.png" alt="" @error="brokenIcons['icons/loots/ice_trap.png']=true"><span v-else v-html="ICONS.snow"></span></span>
          <b>{{store.game.loot.iceTraps}}</b><span>Piège{{store.game.loot.iceTraps>1?'s':''}} de glace</span></div>
        <div class="loot rupee"><span class="loot-ic"><img v-if="!brokenIcons['icons/loots/rupee.png']" src="icons/loots/rupee.png" alt="" @error="brokenIcons['icons/loots/rupee.png']=true"><span v-else v-html="ICONS.rupee"></span></span>
          <b>{{store.game.loot.rupees}}</b><span>Rubis · {{store.game.loot.rupeeValue}} ₹</span></div>
        <div class="loot junk"><span class="loot-ic"><img v-if="!brokenIcons['icons/loots/junk.png']" src="icons/loots/junk.png" alt="" @error="brokenIcons['icons/loots/junk.png']=true"><span v-else v-html="ICONS.bag"></span></span>
          <b>{{store.game.loot.junk}}</b><span>Munitions et cœurs</span></div>
      </section>
`;
// Fenêtre de stream
const STREAM_TPL = `
<!-- ================= FENÊTRE DE STREAM (index.html?stream) : blocs disposés librement, à capturer dans OBS ================= -->
<div v-if="STREAM" class="stream" :class="{editing:swEdit}" :style="{background:streamBg}" @pointermove="swMove" @pointerup="swUp" @pointercancel="swUp">
  <div v-for="w in sl.widgets" :key="w.id" class="sw" :class="['sw-' + w.type, {sel:swEdit && swSel===w.id, framed:w.frame}]"
    :style="{left:w.x + 'px', top:w.y + 'px', width:w.w + 'px', height:STREAM_TYPES[w.type].free ? w.h + 'px' : null}">
    <div class="sw-body" :style="swBodyStyle(w)">
      <div v-if="w.type==='items'" class="sw-items" :class="{cols2:w.cols===2}">${ITEMS_TPL}</div>
      <div v-else-if="w.type==='loot'" class="sw-items">${LOOT_TPL}</div>
      <div v-else-if="w.type==='progress'" class="global-progress sw-progress">
        <progress-card :stats="checkStats" unit="checks" title="Checks"></progress-card>
        <progress-card v-if="stats.editable" :stats="stats" unit="sorties" title="Entrées"></progress-card></div>
      <div v-else-if="w.type==='next'" class="sw-card">
        <div class="sw-title">Prochaine étape</div>
        <template v-if="nextStep">
          <div class="sw-next-mode"><img v-if="nextStep.icon" :src="nextStep.icon" alt=""><span v-else v-html="ICONS.uturn"></span>{{nextStep.mode}}</div>
          <div class="sw-next-dest"><b>{{nextStep.zone}}</b> · {{nextStep.exit}}</div>
          <div v-if="nextStep.goal" class="sw-muted">Arrivée : {{nextStep.goal}}</div>
        </template>
        <div v-else class="sw-muted">Aucun trajet en cours</div></div>
      <div v-else-if="w.type==='where'" class="sw-card">
        <div class="sw-title">Où aller maintenant ?</div>
        <ul v-if="nextC && nextC.list.length" class="sw-where">
          <li v-for="x in nextC.list.slice(0, 5)" :key="x.c.id"><img :src="CHECK_CAT[x.c.cat].icon" alt=""><span><b>{{x.c.label}}</b><small>{{CHECK_AREA[x.c.area].label}} · {{stepsLabel(x.steps)}}</small></span></li></ul>
        <div v-else class="sw-muted">Aucun check faisable à portée</div></div>
      <entrance-graph v-else-if="w.type==='graph'"></entrance-graph>
      <img v-else-if="w.type==='image' && w.src" class="sw-img" :src="w.src" alt="" :style="{objectFit:w.fit || 'contain'}">
      <div v-else-if="w.type==='text'" class="sw-text" :style="{fontSize:(w.size || 32) + 'px'}">{{w.text}}</div>
    </div>
    <template v-if="swEdit">
      <div class="sw-hit" @pointerdown.prevent="swDown($event, w, 'move')"><span class="sw-name">{{STREAM_TYPES[w.type].label}}</span></div>
      <div class="sw-grip" title="Redimensionner" @pointerdown.prevent.stop="swDown($event, w, 'size')"></div>
      <button type="button" class="sw-del" title="Retirer ce bloc" @pointerdown.stop @click.stop="swDelete(w)">×</button>
    </template>
  </div>
  <div v-if="swEdit" class="sw-tools">
    <b>Disposition du stream</b>
    <span class="sw-group"><select v-model="swAdd" class="sel" aria-label="Bloc à ajouter"><option v-for="(t,k) in STREAM_TYPES" :key="k" :value="k">{{t.label}}</option></select>
      <button type="button" class="btn" @click="swNew">Ajouter</button></span>
    <label class="sw-group">Fond <select v-model="sl.bg" class="sel"><option value="transparent">Transparent</option><option value="#00b140">Vert d’incrustation</option>
      <option value="#ff00ff">Magenta</option><option value="theme">Fond de l’appli</option><option value="custom">Autre couleur</option></select>
      <input v-if="sl.bg==='custom'" type="color" v-model="sl.color" aria-label="Couleur du fond"></label>
    <span v-if="swSelW" class="sw-group sw-opts">
      <b>{{STREAM_TYPES[swSelW.type].label}}</b>
      <template v-if="swSelW.type==='image'">
        <input type="text" class="sw-in" v-model="swSelW.src" placeholder="Chemin ou adresse de l’image">
        <label class="btn">Fichier…<input type="file" accept="image/*" hidden @change="swImage($event, swSelW)"></label>
        <select v-model="swSelW.fit" class="sel"><option value="contain">Entière</option><option value="cover">Remplir</option></select></template>
      <template v-else-if="swSelW.type==='text'">
        <input type="text" class="sw-in" v-model="swSelW.text" placeholder="Texte">
        <input type="number" class="sw-num" v-model.number="swSelW.size" min="10" max="200" aria-label="Taille du texte"></template>
      <label v-else-if="swSelW.type==='game'" class="check"><input type="checkbox" v-model="swSelW.frame">Cadre doré</label>
      <label v-else-if="swSelW.type==='items'" class="check"><input type="checkbox" :checked="swSelW.cols===2" @change="swSelW.cols = $event.target.checked ? 2 : 1">2 colonnes</label>
      <span class="sw-pos">{{swSelW.x}}, {{swSelW.y}} · {{swSelW.w}}{{STREAM_TYPES[swSelW.type].free ? ' × ' + swSelW.h : ''}} px</span>
    </span>
    <span class="sw-group sw-end"><button type="button" class="btn" @click="swReset">Disposition par défaut</button>
      <button type="button" class="btn primary" @click="swEdit=false">Terminer</button></span>
    <span class="sw-tip">Glisser un bloc pour le déplacer, son coin bas-droit pour le redimensionner. Touche E : modifier ou terminer.</span>
  </div>
  <div v-else-if="swHint" class="sw-hint">Touche E (ou double-clic) : modifier la disposition</div>
</div>
`;

const App = {
  components:{ TypeIcon, Seg, DestPicker, ItemTile, ProgressCard, EntranceGraph, ZoneMap },
  setup(){
    const navOpen = ref(false), itemsOpen = ref(false), modal = ref(null), tip = reactive({ show:false, key:null, style:{} });
    const backup = reactive({ text:'', msg:'', ok:true });
    const ui = store.ui, s = store.settings;
    // Thème : « auto » suit le système (prefers-color-scheme), sinon data-theme force clair ou sombre (voir style.css).
    watch(() => ui.theme, t => { if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t; },
      { immediate:true });
    const setTheme = t => { ui.theme = ui.theme === t ? 'auto' : t; };

    // Pages du menu, par groupe : la partie en cours (Progression), les vues d'ensemble (Aperçus), puis la Configuration à part.
    const views = [
      { id:'checks', label:'Checks', icon:ICONS.checks, group:'Progression' },
      { id:'router', label:'Routeur', icon:ICONS.router, group:'Progression' },
      { id:'entrances', label:'Entrées', icon:ICONS.entrances, group:'Progression' },
      { id:'hints', label:'Indices', icon:ICONS.hint, group:'Progression' },
      { id:'map', label:'Carte', icon:ICONS.map, group:'Aperçus' },
      { id:'graph', label:'Connexions', icon:ICONS.graph, group:'Aperçus' },
      { id:'stats', label:'Statistiques', icon:ICONS.stats, group:'Aperçus' },
      { id:'config', label:'Configuration', icon:ICONS.config, group:'' },
    ];
    const navGroups = [...new Set(views.map(v => v.group))].map(g => ({ title:g, views:views.filter(v => v.group === g) }));
    // Mise en page côte à côte : second panneau (ui.split), seulement sur un écran assez large (sinon page principale
    // seule). go() n'ouvre une page que si elle n'est pas déjà affichée (dans un panneau ou l'autre).
    const SPLIT_MIN = 1500, winW = ref(window.innerWidth);
    window.addEventListener('resize', () => { winW.value = window.innerWidth; });
    const canSplit = computed(() => winW.value >= SPLIT_MIN);
    const splitOn = computed(() => !!ui.split && ui.split !== ui.view && canSplit.value && views.some(v => v.id === ui.split));
    const shown = v => ui.view === v || (splitOn.value && ui.split === v);
    const paneOf = v => splitOn.value && ui.split === v ? 'side' : 'main';
    function swapPanes(){ if (!ui.split) return; const m = ui.view; ui.view = ui.split; ui.split = m; }
    function openSide(v){ if (v === ui.view){ if (ui.split) swapPanes(); return; } ui.split = v; }
    const closeSide = () => { ui.split = ''; };
    if (!views.some(v => v.id === ui.view)) ui.view = views[0].id;

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
      if (ages.child && isRandomized(EXIT['spawns::spawn_child'], store.settings) && !eff['spawns::spawn_child']) out.push('Enfant');
      if (ages.adult && isRandomized(EXIT['spawns::spawn_adult'], store.settings) && !eff['spawns::spawn_adult']) out.push('Adulte');
      return out;
    });

    // Sorties randomisées (renseignables) et renseignées, au total, par groupe de types et par zone (cadre de progression).
    const ENTRANCE_GROUPS = [['Overworld', ['overworld']], ['Intérieurs', ['interior']], ['Grottes', ['grotto']],
      ['Donjons', ['dungeon', 'boss']], ['Sens unique', ['warp', 'owl', 'spawn']]];
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
        sub:`${left} à découvrir · ${zonesDone} / ${zl.length} zones complètes` };
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
      if (!String(modal.value).startsWith('checklist-')) return null;
      const name = modal.value.slice('checklist-'.length), c = CHECKLISTS[name], st = checklistStats(name);
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
    function go(v){
      navOpen.value = false;
      if (shown(v)) return;
      ui.view = v;
      if (ui.split === v) ui.split = '';
      window.scrollTo({ top:0 });
    }

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

    /* Routeur */
    const routerAreas = AREAS.filter(a => a.id !== SPAWN_AREA);
    const exitsOf = id => (AREA[id]?.exits || []);
    // Listes du formulaire : seulement les sorties accessibles (logique SoH, entrées notées ou d'origine, reachC) si
    // l'option est cochée ; la valeur choisie reste toujours proposée.
    const pickAreas = sel => !ui.router.onlyReachable ? routerAreas
      : routerAreas.filter(a => a.id === sel || a.exits.some(e => reachC.value.has(e.key)));
    const pickExits = (id, sel) => exitsOf(id).filter(e => !ui.router.onlyReachable || e.key === sel || reachC.value.has(e.key));
    watch(() => ui.router.fromArea, id => { if (!exitsOf(id).some(e => e.key === ui.router.fromExit)) ui.router.fromExit = ''; });
    watch(() => ui.router.toArea, id => { if (!exitsOf(id).some(e => e.key === ui.router.toExit)) ui.router.toExit = ''; });
    // Clic sur une sortie du trajet : elle devient le départ (avec l'âge qu'on y a), le trajet repart de là.
    // L'ancien départ est gardé (prevFrom) pour y revenir en un clic (clic malencontreux) ; revenir l'échange avec l'actuel.
    function setStart(key, age){
      const rr = ui.router;
      if (rr.fromExit === key && rr.fromAge === age) return;
      if (rr.fromExit && EXIT[rr.fromExit]) rr.prevFrom = { exit:rr.fromExit, age:rr.fromAge };
      rr.fromArea = EXIT[key].areaId; rr.fromExit = key; rr.fromAge = age;
    }
    const startHere = row => setStart(row.key, row.age);
    const prevStart = computed(() => {
      const p = ui.router.prevFrom;
      return p && EXIT[p.exit] && !(p.exit === ui.router.fromExit && p.age === ui.router.fromAge) ? p : null;
    });
    const backToPrev = () => setStart(prevStart.value.exit, prevStart.value.age);
    // départ suivi en direct (auto-tracking de la position)
    const liveStart = computed(() => ui.link.enabled && ui.link.position && link.status === 'game');
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
      const res = shortest(routeC.value.edges, r.fromExit, r.fromAge, r.toExit, r.toAge);
      if (!res) return { state:'none' };
      // Une carte par passage dans une zone : sorties successives (rows) reliées par la marche (walks[i] entre rows[i] et
      // rows[i+1]) ; entre deux cartes, les vrais changements de lieu (pastilles) et les changements d'âge (bandeaux).
      const items = [];
      let card = null;
      // row.age : âge à cette sortie (pour en faire le nouveau départ, startHere)
      const newCard = (key, age) => { card = { t:'card', key0:key, rows:[{ key, age }], walks:[], walking:false }; items.push(card); };
      newCard(r.fromExit, r.fromAge); card.start = true;
      for (const e of res.edges){
        if (e.kind === 'age'){ items.push({ t:'age', from:e.fromAge, to:e.age }); card = null; continue; }   // débloqué une fois pour toutes : pas d'objets
        if (e.kind === 'walk' && EXIT[e.to].areaId === EXIT[card ? card.key0 : e.from].areaId){
          if (!card) newCard(e.from, e.fromAge);
          const w = card.walks[card.walks.length - 1];
          // marches consécutives fusionnées (le chemin passe parfois par d'autres sorties de la zone)
          if (card.walking){
            w.e = { ...w.e, to:e.to, cost:w.e.cost + e.cost, passes:[...(w.e.passes || []), ...(e.passes || [])] };
            w.reqs = reqsOf(w.e);
            card.rows[card.rows.length - 1] = { key:e.to, age:e.age };
          }
          else { card.walks.push({ e, reqs:reqsOf(e) }); card.rows.push({ key:e.to, age:e.age }); card.walking = true; }
          continue;
        }
        // transition, hibou, chant, téléporteur, rechargement, ou marche vers une autre zone (course d'Igor…)
        items.push({ t:'edge', e, reqs:reqsOf(e) });
        newCard(e.to, e.age);
      }
      [...items].reverse().find(i => i.t === 'card').end = true;
      // départ et arrivée à part : la carte de départ ne garde que la sortie de départ, celle d'arrivée que la sortie
      // visée ; la marche qui les sépare du reste de leur zone devient une pastille « à pied » entre deux cartes
      const splitAt = (card, j) => {   // coupe avant rows[j] : la marche walks[j-1] passe entre les deux cartes
        const tail = { t:'card', key0:card.rows[j].key, rows:card.rows.slice(j), walks:card.walks.slice(j), end:card.end };
        const w = card.walks[j - 1];
        card.rows = card.rows.slice(0, j); card.walks = card.walks.slice(0, j - 1); card.end = false;
        items.splice(items.indexOf(card) + 1, 0, { t:'edge', e:w.e, reqs:w.reqs }, tail);
        return tail;
      };
      const first = items.find(i => i.t === 'card');
      if (first.rows.length > 1) splitAt(first, 1);
      const last = [...items].reverse().find(i => i.t === 'card');
      if (last.rows.length > 1) splitAt(last, last.rows.length - 1);
      // départ suivi d'une transition par la sortie de départ elle-même : on la reprend (entrées découplées) — à dire,
      // dans un bloc à part (la carte seule se lirait « on est ici » ; pas sur les étapes suivantes, pour la lisibilité)
      const at = items.indexOf(first), nx = items[at + 1];
      if (nx?.t === 'edge' && nx.e.kind === 'transition' && nx.e.from === first.rows[0].key) items.splice(at + 1, 0, { t:'retake', key:first.rows[0].key });
      // prochaine étape (mise en lumière quand le départ suit le jeu) : du départ jusqu'à la carte suivante (ou au bloc
      // « Reprendre cette sortie ») comprise
      const nextAt = items.findIndex((it, i) => i > at && (it.t === 'card' || it.t === 'retake'));
      for (let i = at + 1; i <= nextAt; i++) items[i].next = true;
      const count = k => res.edges.filter(e => e.kind === k).length;
      return { state:'ok', items, cost:Math.round(res.cost), steps:res.edges.length,
        transitions:count('transition') + count('bluewarp') + count('owl'), ages:count('age'), warps:count('warp'), resets:count('reset') };
    });
    const edgeLabel = e => ({ walk:'À pied', transition:'Transition', bluewarp:'Téléporteur bleu', owl:'Vol du hibou',
      warp:EXIT[e.warp]?.label || 'Chant', reset:'Sauvegarder et recharger' }[e.kind]);   // chant : les notes autour suffisent
    // Objets d'une étape (routeGraph.needs) : icônes des objets retenus et alternatives (texte de l'infobulle).
    function reqsOf(e){
      const n = routeC.value.needs(e);
      // chant de téléportation : déjà indiqué par la pastille
      const icons = reqIcons(n.items).filter(r => !(e.kind === 'warp' && r.key === WARP_SONGS[e.warp]));
      const names = rgs => reqIcons(rgs).map(r => r.title).join(' + ');
      const alts = [...new Set(n.alts.filter(a => names(a.instead) && names(a.alt)).map(a => `${names(a.alt)} (au lieu de ${names(a.instead)})`))];
      return { icons, alts, altTitle:alts.length ? 'Autres possibilités :\n' + alts.map(a => '• ' + a).join('\n') : '' };
    }
    // Objet trouvé dans un check (game.found, numéro RandomizerGet) : nom et icône du panneau Objets quand il y en a un,
    // sinon nom français de SoH (âmes de haricot : nom de la check-list).
    function foundInfo(n){
      if (typeof n === 'string') return { title:n };   // nom du spoiler sans objet SoH reconnu
      const name = LINK_DATA.rg[n], rg = 'RG_' + name, icon = reqIcons([rg])[0];
      if (icon) return icon;
      if (SOH_BEAN_SOUL[rg]) return { title:'Âme de haricot : ' + CHECKLISTS.beans.locations.find(l => l.id === SOH_BEAN_SOUL[rg]).label };
      return { title:LINK_DATA.rgFr[n] || (name || '?').toLowerCase().replace(/_/g, ' ') };
    }
    // Objet vu en boutique (game.seen : [nom affiché, prix]) : icône si l'objet est reconnu.
    function seenInfo(v){
      const name = String(v[0]).replace(/^Acheter\s*:\s*/, ''), n = RG_BY_FR[name], i = n !== undefined ? foundInfo(n) : {};   // « Acheter: » : objet non mélangé
      return { ...i, title:name, price:v[1] };
    }
    function loadSpoilerFile(ev){
      const file = ev.target.files[0];
      ev.target.value = '';
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        let data;
        try { data = JSON.parse(reader.result); } catch (e){ linkLog('Spoiler illisible : ce n’est pas un JSON valide'); return; }
        if (!data || typeof data.locations !== 'object'){ linkLog('Ce fichier n’est pas un spoiler SoH (pas de « locations »)'); return; }
        linkSetSpoiler(data, file.name);
      };
      reader.readAsText(file);
    }
    // Objets SoH (RG_…) -> icônes du panneau Objets, un par objet (palier le plus haut), dans l'ordre du panneau.
    function reqIcons(rgs){
      const best = new Map();
      for (const rg of rgs || []){
        const x = rgItem(rg, s), it = x && ITEM_BY_KEY[x.key];
        if (!it || !itemVisible(it)) continue;
        if (!best.has(x.key) || (x.level || 0) > (best.get(x.key).level || 0)) best.set(x.key, x);
      }
      // un chant sous-entend l'ocarina (sauf l'Ocarina du Temps, demandé pour lui-même, ex. Porte du Temps)
      if ([...best.keys()].some(k => ITEM_BY_KEY[k].path === 'songs') && best.get('ocarina')?.level === 1) best.delete('ocarina');
      const order = Object.keys(ITEM_BY_KEY);
      return [...best.values()].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key)).map(({ key, level }) => {
        const it = ITEM_BY_KEY[key];
        const src = it.kind === 'level' && !it.sizes && level
          ? (it.icons ? 'icons/' + it.icons[level - 1] : 'icons/items/' + key + '_' + level + '.png')
          : 'icons/' + (it.icon || 'items/' + key + '.png');
        // nom du palier quand il désigne un objet (Super-Grappin, Gantelets d'Argent…), pas une capacité (« 20 », « Simple »)
        return { key, src, title:it.kind === 'level' && !it.sizes && key !== 'magic' && it.stages && level ? it.stages[level] : it.label };
      });
    }
    // icône d'un mode de déplacement (icons/route/) ; chant : icône de l'objet chant
    const edgeIcon = e => e.kind === 'warp' ? `icons/songs/teleport/${WARP_SONGS[e.warp]}.png` : `icons/route/${e.kind}.png`;
    const ageLabel = a => a === 'child' ? 'Enfant' : 'Adulte';

    /* Panneau Objets piloté par la configuration : cadres et cases vides masqués */
    const panelSkills = computed(() => ITEMS_PAGE.skills.map(r => ({ ...r, items:visibleKeys(r.items) })).filter(r => r.items.length));
    // Clé squelette obtenue : elle ouvre toutes les serrures à petite clé (donjons, Repaire, portes de
    // l'overworld — logic.cpp de SoH), donc plus de compteur de petites clés, de trousseau ni de « Clés des portes ».
    const skeletonGot = () => store.game.items.skeletonKey && itemVisible(ITEM_BY_KEY.skeletonKey);
    const panelChecklists = computed(() => ITEMS_PAGE.checklistButtons
      .filter(c => (!c.visible || c.visible(s)) && !(c.id === 'keys' && skeletonGot())));
    const cells = id => { const c = dungeonCells(id, s); if (skeletonGot()) c.keys = false; return c; };
    // Badge de version (coin du bloc) : ? / V / MQ ; clic sur le bloc pour changer si la configuration le permet.
    // Compteur de petites clés : « Au départ », toutes possédées (le maximum, ou ✓ si la version est inconnue).
    const keysLabel = id => {
      const max = dungeonMaxKeys(id);
      if (atStart(id).keys) return max === null ? '✓' : `${max}/${max}`;
      return `${store.game.dungeons[id].keys}/${max ?? '?'}`;
    };
    const keysTitle = id => atStart(id).keys ? 'Petites clés (toutes dès le départ)'
      : store.game.items.skeletonKey ? 'Petites clés — serrures ouvertes par la clé squelette'
      : id === 'spiritTemple' && s.smallKeys === 'Vanilla' && dungeonQuest(id) === 'MQ'
        ? 'Petites clés trouvées — les 3 offertes au départ par SoH (Esprit MQ, clés vanilla) sont déjà comptées par la logique'
      : dungeonKeyRing(id) === null ? 'Petites clés (en noter une indique que ce donjon n’a pas de trousseau)' : 'Petites clés';
    const questLabel = id => ({ Vanilla:'V', MQ:'MQ' })[dungeonQuest(id)] || '?';
    const questClass = id => ({ Vanilla:'vanilla', MQ:'mq' })[dungeonQuest(id)] || 'unknown';
    const questTitle = id => {
      if (!DUNGEON_BY_ID[id].quest) return null;
      const name = ({ Vanilla:'Vanilla', MQ:'Master Quest' })[dungeonQuest(id)] || 'version inconnue';
      return cells(id).quest ? `${name} — clic sur le cadre : version suivante, clic droit : précédente` : `${name} — imposé par la configuration`;
    };
    // Un donjon sans case à suivre disparaît, sauf si sa version (Vanilla / MQ) reste à noter ; une rangée
    // réduite à un seul donjon est centrée. La clé squelette se place à droite du Château de Ganon, ou seule
    // sur une dernière rangée si ce bloc est masqué.
    const dungeonRows = computed(() => ITEMS_PAGE.dungeons.rows
      .map(r => r.filter(id => Object.values(cells(id)).some(Boolean))).filter(r => r.length));
    const skeletonShown = computed(() => itemVisible(ITEM_BY_KEY.skeletonKey));
    // Objets de donjon « Au départ » : cases pleines, non cliquables (évite les oublis et les erreurs).
    const atStart = id => ({ maps:mapsAtStart(id, s), keys:keysAtStart(id, s), bossKey:bossKeyAtStart(id, s) });

    /* Checks (js/checks.js) : zones avec leurs checks listés (mélangés, version active), filtres et compteurs */
    const cf = ui.checks;
    // Logique SoH (js/logic.js) : pour chaque check, états âge/moment (bits CD/CN/AD/AN) où il est faisable
    // maintenant (inventaire noté, sohC) et un jour (tout obtenu, sohFullC). Âge d'un check = âges « un jour ».
    const ageOfBits = b => (b & CHILD) && (b & ADULT) ? 'both' : b & CHILD ? 'child' : b & ADULT ? 'adult' : null;
    const checkLogicC = computed(() => {
      const now = sohC.value.checks, ever = sohFullC.value.checks, r = {};
      for (const c of CHECKS){ const k = 'RC_' + c.id, e = ever[k] || 0; r[c.id] = { now:now[k] || 0, ever:e, age:ageOfBits(e) }; }
      return r;
    });
    const lg = c => checkLogicC.value[c.id];
    const canNow = c => lg(c).now > 0;
    // Filtres de fond (catégories, âge) : ils définissent ce qui est « suivi » et donc les compteurs. Un check sans âge
    // connu (jamais faisable, même avec tout l'inventaire) passe tous les filtres d'âge.
    const catOn = c => !cf.hiddenCats[c.cat];
    const ageOn = c => { const a = lg(c).age; return cf.age === 'all' || !a || a === 'both' || a === cf.age; };
    const ageKnown = true;
    // Pastille d'âge et infobulle : âges possibles, en plein ceux où c'est faisable maintenant ; moment de la journée.
    const AGE_FR = { child:'enfant', adult:'adulte', both:'enfant ou adulte' };
    function timeOf(bits){
      const day = bits & (CD | AD), night = bits & (CN | AN);
      return day && !night ? 'day' : night && !day ? 'night' : null;
    }
    function checkLogicTitle(c){
      const x = lg(c), lines = [CHECK_CAT[c.cat].label + ' — ' + c.soh];
      if (!x.ever) lines.push('Jamais faisable selon la logique avec la configuration actuelle.');
      else {
        const t = timeOf(x.ever);
        lines.push('Âge : ' + AGE_FR[x.age] + (t ? (t === 'night' ? ', de nuit' : ', de jour') : ''));
        lines.push(x.now ? 'Faisable maintenant : ' + AGE_FR[ageOfBits(x.now)] + (timeOf(x.now) === 'night' ? ' (de nuit)' : timeOf(x.now) === 'day' ? ' (de jour)' : '')
          : 'Pas encore faisable avec l’inventaire actuel.');
      }
      if (cf.showLogic) lines.push(...checkConditions(c));
      return lines.join('\n');
    }
    // Conditions SoH d'un check (option « Afficher la logique au survol », comme « Show Logic » du tracker de SoH).
    let condIndex = null;
    function checkConditions(c){
      if (!condIndex){
        condIndex = {};
        for (const [rr, r] of Object.entries(SOH.regions)) for (const [rc, fn] of r.checks) (condIndex[rc] = condIndex[rc] || []).push([r.name, fn]);
      }
      const pretty = fn => fn.toString().replace(/^\(\)\s*=>\s*/, '').replace(/^\((.*)\)$/s, '$1').replace(/\bL\./g, '')
        .replace(/"(?:RG|RE|RT|ED|RR|LOGIC|RSK|SCENE|RC)_([A-Z0-9_]+)"/g, '$1').replace(/\s+/g, ' ');
      return (condIndex['RC_' + c.id] || []).map(([name, fn]) => `Logique (${name}) : ${pretty(fn)}`);
    }
    // Toutes les zones (progression globale), puis celles affichées (recherche, zones terminées masquées).
    const allCheckAreasC = computed(() => {
      const q = norm(cf.q.trim()), done = store.game.checks, ex = s.excluded;
      return CHECK_AREAS.map(a => {
        const all = CHECKS_BY_AREA[a.id] || [], quest = areaQuest(a.id);
        const listed = all.filter(checkListed);
        const tracked = listed.filter(c => !ex[c.id] && catOn(c) && ageOn(c));
        const got = tracked.filter(c => done[c.id]).length;
        // reste à faire par catégorie (petites icônes de l'en-tête)
        const byCat = CHECK_CATS.map(k => ({ cat:k, left:tracked.filter(c => c.cat === k.id && !done[c.id]).length,
          total:tracked.filter(c => c.cat === k.id).length })).filter(x => x.total);
        let shown = listed.filter(c => (cf.showExcluded || !ex[c.id]) && catOn(c) && ageOn(c) && !(cf.hideDone && done[c.id]));
        if (q && !norm(a.label).includes(q)) shown = shown.filter(c => norm(c.label + ' ' + c.soh).includes(q));
        // version inconnue : checks propres à Vanilla ou MQ masqués (seuls les checks communs sont listés)
        const hiddenQuest = a.dungeon && !quest ? all.filter(c => c.quest !== 'B' && checkShuffled(c, s, cf.alwaysGS)).length : 0;
        if (cf.onlyAvailable) shown = shown.filter(c => done[c.id] || canNow(c));
        // faisables d'abord, puis pas encore faisables, puis faits (ordre d'origine dans chaque groupe)
        if (cf.sortAvail){ const rank = c => done[c.id] ? 2 : canNow(c) ? 0 : 1; shown = shown.map((c, i) => [c, i]).sort((x, y) => rank(x[0]) - rank(y[0]) || x[1] - y[1]).map(x => x[0]); }
        const complete = tracked.length > 0 && got === tracked.length;
        // faisables : checks suivis restants, faisables avec l'inventaire actuel
        const accessible = tracked.filter(c => !done[c.id] && canNow(c)).length;
        // état de la zone (couleurs) : terminée, tout le reste accessible, en partie, rien d'accessible (ou rien à faire)
        const state = complete ? 'done' : !tracked.length && listed.some(c => ex[c.id]) ? 'ignored' : !accessible ? 'none' : accessible === tracked.length - got ? 'all' : 'part';
        const excluded = listed.filter(c => ex[c.id]).length;   // zone ignorée : reste listée pour pouvoir la réintégrer
        return { area:a, quest, checks:shown, total:tracked.length, got, byCat, hiddenQuest, complete, accessible, state, excluded };
      });
    });
    const checkAreasC = computed(() => { const q = cf.q.trim();
      return allCheckAreasC.value.filter(x => q || cf.onlyAvailable ? x.checks.length
        : ((x.total || x.hiddenQuest || x.excluded) && !(cf.hideDoneZones && x.complete))); });
    // Progression globale des checks suivis (catégories et âge choisis, hors exclus), et par groupe de zones.
    // Progression globale des checks : selon la configuration seulement (checks mélangés, version active, hors exclus),
    // indépendamment des filtres d'affichage (catégories, âge, Skulltulas non mélangées, recherche).
    const checkStats = computed(() => {
      const done = store.game.checks, ex = s.excluded, zones = {};
      const ow = { got:0, total:0 }, dg = { got:0, total:0 };
      let avail = 0;
      for (const c of CHECKS){
        if (ex[c.id] || !checkShuffled(c, s, false) || !checkQuestActive(c, areaQuest(c.area))) continue;
        const g = c.inDungeon ? dg : ow, z = zones[c.area] = zones[c.area] || { got:0, total:0 };
        g.total++; z.total++; if (done[c.id]){ g.got++; z.got++; } else if (canNow(c)) avail++;
      }
      const zl = Object.values(zones), got = ow.got + dg.got, total = ow.total + dg.total;
      const zonesDone = zl.filter(z => z.got === z.total).length, left = total - got;
      return { got, total, groups:[['Overworld', ow.got, ow.total], ['Donjons', dg.got, dg.total]].filter(g => g[2]),
        sub:`${left} restant${left > 1 ? 's' : ''} · ${avail} faisable${avail > 1 ? 's' : ''} · ${zonesDone} / ${zl.length} zones terminées` };
    });
    // Compteurs des pastilles de catégorie : restants / total parmi les checks listés (hors filtre de catégorie).
    const catCounts = computed(() => {
      const done = store.game.checks, ex = s.excluded, r = {};
      CHECK_CATS.forEach(k => { r[k.id] = { left:0, total:0 }; });
      for (const c of CHECKS) if (!ex[c.id] && ageOn(c) && checkListed(c)){ r[c.cat].total++; if (!done[c.id]) r[c.cat].left++; }
      return r;
    });
    const toggleCat = id => { cf.hiddenCats[id] = !cf.hiddenCats[id]; };
    const plural = (n, w) => n + ' ' + w + (n > 1 ? 's' : '');
    const zoneTitle = x => ({ done:'Zone terminée', all:'Tout le reste est accessible', part:'Une partie du reste est accessible',
      none:x.total ? 'Rien d’accessible pour l’instant' : 'Rien à faire', ignored:'Zone ignorée (checks exclus)' })[x.state]
      + ` — ${plural(x.got, 'fait')}, ${plural(x.accessible, 'accessible')}, ${x.total} au total`;
    // clic droit sur une pastille : n'afficher que cette catégorie (ou tout réafficher si c'était déjà le cas)
    function soloCat(id){
      const only = CHECK_CATS.every(k => k.id === id ? !cf.hiddenCats[k.id] : cf.hiddenCats[k.id]);
      CHECK_CATS.forEach(k => { cf.hiddenCats[k.id] = only ? false : k.id !== id; });
    }
    const allCats = on => CHECK_CATS.forEach(k => { cf.hiddenCats[k.id] = !on; });
    const CHECK_AGES = [['all', 'Tous'], ['child', 'Enfant'], ['adult', 'Adulte']];
    const ageLabelShort = { child:'E', adult:'A', both:'E·A' };
    const checkGroups = computed(() => [['Overworld', checkAreasC.value.filter(x => !x.area.dungeon)],
      ['Donjons', checkAreasC.value.filter(x => x.area.dungeon)]].filter(g => g[1].length));
    const toggleCheckArea = id => { cf.collapsed[id] = !cf.collapsed[id]; };
    // Cocher / décocher ou exclure / réintégrer un check, avec « Annuler » pendant quelques secondes (clic malencontreux).
    const lastCheck = ref(null);
    let lastCheckTimer = null;
    const CHECK_ACTIONS = { done:{ set:setCheck, get:id => !!store.game.checks[id], on:'coché', off:'décoché' },
      excluded:{ set:setExcluded, get:id => !!s.excluded[id], on:'exclu', off:'réintégré' } };
    function toggleCheckState(c, kind){
      const a = CHECK_ACTIONS[kind], was = a.get(c.id);
      a.set(c.id, !was);
      lastCheck.value = { id:c.id, kind, was, text:`« ${c.label} » ${was ? a.off : a.on}` };
      clearTimeout(lastCheckTimer);
      lastCheckTimer = setTimeout(() => { lastCheck.value = null; }, 8000);
    }
    const toggleCheck = c => toggleCheckState(c, 'done');
    const toggleExcluded = c => toggleCheckState(c, 'excluded');
    function undoCheck(){
      const l = lastCheck.value;
      if (l && l.ids) l.ids.forEach(id => setExcluded(id, l.was));   // zone entière (zoneExclude)
      else if (l) CHECK_ACTIONS[l.kind].set(l.id, l.was);
      lastCheck.value = null; clearTimeout(lastCheckTimer);
    }
    /* Ignorer une zone d'un coup (zones futiles…) : exclut ses checks listés pas encore faits ; si tous le sont déjà,
       les réintègre. → 'exclude' | 'include' | null (rien à faire) */
    function zoneExcludeMode(id){
      const list = (CHECKS_BY_AREA[id] || []).filter(c => checkListed(c) && !store.game.checks[c.id]);
      return list.some(c => !s.excluded[c.id]) ? 'exclude' : list.some(c => s.excluded[c.id]) ? 'include' : null;
    }
    function zoneExclude(x){
      const mode = zoneExcludeMode(x.area.id);
      if (!mode) return;
      const ids = (CHECKS_BY_AREA[x.area.id] || []).filter(c => checkListed(c) && !store.game.checks[c.id] && !!s.excluded[c.id] === (mode === 'include')).map(c => c.id);
      ids.forEach(id => setExcluded(id, mode === 'exclude'));
      lastCheck.value = { ids, was:mode === 'include', text:`${x.area.label} : ${ids.length} check${ids.length > 1 ? 's' : ''} ${mode === 'exclude' ? 'exclu' : 'réintégré'}${ids.length > 1 ? 's' : ''}` };
      clearTimeout(lastCheckTimer);
      lastCheckTimer = setTimeout(() => { lastCheck.value = null; }, 8000);
    }
    // « Y aller » : le Routeur part du départ actuel (ui.router) et vise la sortie la plus proche d'où l'on rejoint à pied
    // le check (une de ses régions SoH, à l'âge où il est faisable) ou la zone ; sans départ, une sortie qui y mène.
    const goMsg = ref('');
    function routeTo(isGoal, age){
      const r = ui.router;
      let found = null;
      if (r.fromExit && EXIT[r.fromExit]){
        const res = shortest(routeC.value.edges, r.fromExit, r.fromAge, isGoal);
        if (res) found = { key:res.endKey, age:res.endAge };
      }
      if (!found) for (const e of ALL_EXITS) for (const a of ['child', 'adult'])
        if (!found && e.areaId !== SPAWN_AREA && isGoal(e.key, a, 'start')) found = { key:e.key, age:a };
      if (!found){ goMsg.value = 'Aucune sortie connue ne mène là pour l’instant.'; setTimeout(() => { goMsg.value = ''; }, 5000); return; }
      r.toArea = EXIT[found.key].areaId; r.toExit = found.key; r.toAge = age || 'any';
      go('router');
    }
    function goToCheck(c){
      const regs = new Set(CHECK_REGIONS['RC_' + c.id] || []), now = lg(c).now || 0;
      const age = (now & CHILD) && !(now & ADULT) ? 'child' : (now & ADULT) && !(now & CHILD) ? 'adult' : null;
      routeTo((k, a, m) => (!age || a === age) && [...routeC.value.regions(k, a, m).keys()].some(rr => regs.has(rr)), age);
    }
    /* « Où aller maintenant ? » : checks faisables les plus proches du départ du Routeur (position en direct comprise).
       Exploration complète du graphe du Routeur depuis le départ (reachAll) ; chaque région SoH joignable à pied
       depuis un état y reçoit le coût de l'état (plus la marche estimée par région traversée) ; un check prend le coût
       de la meilleure de ses régions, à un âge où il est faisable. Checks suivis : comme la page Checks (mélangés,
       version active, non exclus, catégories affichées). */
    const nextC = computed(() => {
      const r = ui.router;
      if (!r.fromExit || !EXIT[r.fromExit]) return null;
      const rg = routeC.value, best = new Map(), walk = store.costs.walk || 0;
      for (const n of reachAll(rg.edges, r.fromExit, r.fromAge))
        for (const [rr, depth] of rg.regions(n.key, n.age, n.mode)){
          const k = rr + '|' + n.age, cost = n.cost + depth * walk, b = best.get(k);
          if (!b || cost < b.cost) best.set(k, { cost, n });
        }
      const now = sohC.value.checks, out = [];
      for (const c of CHECKS){
        if (store.game.checks[c.id] || s.excluded[c.id] || !catOn(c) || !checkListed(c)) continue;
        const bits = now['RC_' + c.id] || 0;
        if (!bits) continue;
        let bb = null;
        for (const rr of CHECK_REGIONS['RC_' + c.id] || []) for (const [a, m] of [['child', CHILD], ['adult', ADULT]]){
          const x = (bits & m) && best.get(rr + '|' + a);
          if (x && (!bb || x.cost < bb.cost)) bb = { cost:x.cost, steps:x.n.steps, age:a };
        }
        if (bb) out.push({ c, ...bb });
      }
      out.sort((x, y) => x.cost - y.cost);
      return { list:out.slice(0, 12), total:out.length };
    });
    const stepsLabel = n => n ? n + ' étape' + (n > 1 ? 's' : '') : 'à pied';
    // « Pourquoi ? » : ce qui manque pour un check pas encore faisable (whyLocked, calcul de ~1 s, lancé après affichage)
    const why = reactive({ check:null, res:null });
    function openWhy(c){
      why.check = c; why.res = null; modal.value = 'why';
      setTimeout(() => { if (why.check?.id === c.id) why.res = whyLocked(c.id); }, 30);
    }
    const goToZone = id => { const z = id.toLowerCase(); routeTo(k => EXIT[k].areaId === z, null); };
    function setAllChecks(collapsed){ CHECK_AREAS.forEach(a => { cf.collapsed[a.id] = collapsed; }); }
    function jumpCheck(id){
      cf.collapsed[id] = false; navOpen.value = false;
      nextTick(() => { const el = document.getElementById('carea-' + id); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }); });
    }

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
      const shown = TRICKS.filter(t => (!q || norm(t.label + ' ' + t.name + ' ' + TRICK_AREAS[t.area]).includes(q))
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
        // Trousseaux en « Aléatoire » / « Nombre » : SoH écrit le tirage réel dans les réglages par donjon. On ne
        // le garde que si l'import des tirages est coché (dans la partie, pas dans la configuration), et on remet
        // les réglages par donjon à leur valeur par défaut pour ne rien révéler.
        let rings = 0;
        if (['Random', 'Count'].includes(s.keyRings)){
          DUNGEONS.forEach(d => {
            if (!d.keyRing) return;
            const drawn = s[d.keyRing];
            s[d.keyRing] = SETTINGS_DEF.find(x => x.key === d.keyRing).def;
            if (ui.importQuests && configKeyRing(d.id, s) === null){ store.game.dungeons[d.id].keyRing = drawn === 'Yes' ? 'yes' : 'no'; rings++; }
          });
        }
        // Épreuves de Ganon tirées au sort : SoH écrit le nombre tiré dans « Ganon's Trials Count » (remis par défaut pour
        // ne rien révéler) et la liste des épreuves requises dans « requiredTrials » (gardée si l'import des tirages est coché).
        let trials = 0;
        if (s.ganonsTrials === 'Random Number') s.ganonsTrialsCount = SETTINGS_DEF.find(x => x.key === 'ganonsTrialsCount').def;
        if (configTrials(s) === null){
          TRIALS.forEach(t => { store.game.trials[t.id] = ''; });
          if (ui.importQuests && Array.isArray(data.requiredTrials)){
            TRIALS.forEach(t => { store.game.trials[t.id] = data.requiredTrials.some(r => t.match.test(r)) ? 'required' : 'skipped'; });
            trials = data.requiredTrials.length;
          }
        }
        // Checks exclus à la génération (« excludedLocations », absent s'il n'y en a aucun) : réglage de la seed, pas un spoil.
        Object.keys(s.excluded).forEach(k => { delete s.excluded[k]; });
        let excl = 0;
        for (const name of Array.isArray(data.excludedLocations) ? data.excludedLocations : []){
          const c = CHECK_BY_SOH[name];
          if (c){ s.excluded[c.id] = true; excl++; } else notes.push(`Check exclu inconnu ignoré : « ${name} ».`);
        }
        const started = applyStartingItems(s);
        // Statut Vanilla / MQ (facultatif) : seulement pour les donjons que la configuration laisse au hasard.
        // SoH n'écrit « masterQuestDungeons » que s'il y a au moins un donjon MQ.
        let quests = 0;
        if (ui.importQuests){
          const mq = Array.isArray(data.masterQuestDungeons) ? data.masterQuestDungeons : [];
          DUNGEONS.forEach(d => {
            if (!d.quest || configQuest(d.id, s)) return;
            store.game.dungeons[d.id].quest = mq.includes(d.soh) ? 'MQ' : 'Vanilla';
            quests++;
          });
        }
        ui.spoilerPrompt = false;
        // le même fichier sert aussi de spoiler caché à l'auto-tracking (ne révèle que ce que le jeu a déjà montré)
        const linked = ui.importLinkSpoiler && data.locations && typeof data.locations === 'object';
        if (linked) linkSetSpoiler(data, file.name);
        importReport.value = { ok:true, notes,
          title:`Configuration importée : ${count} option${count>1?'s':''}, ${tricks} astuce${tricks>1?'s':''} activée${tricks>1?'s':''}`
            + (started ? `, ${started} objet${started>1?'s':''} de départ coché${started>1?'s':''}` : '')
            + (quests ? `, version de ${quests} donjon${quests>1?'s':''} renseignée` : '')
            + (rings ? `, trousseaux de ${rings} donjon${rings>1?'s':''} renseignés` : '')
            + (ui.importQuests && configTrials(s) === null && Array.isArray(data.requiredTrials) ? `, ${trials} épreuve${trials>1?'s':''} de Ganon requise${trials>1?'s':''}` : '')
            + (excl ? `, ${excl} check${excl>1?'s':''} exclu${excl>1?'s':''}` : '')
            + (linked ? ', spoiler gardé pour l’auto-tracking' : '') + '.' };
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
      importReport.value = null; ui.spoilerPrompt = true; modal.value = 'spoiler';
    }
    // Proposition d'import d'un spoiler au premier chargement et après une remise à zéro (nouvelle seed) ;
    // elle revient à chaque chargement tant qu'on n'a ni importé un spoiler ni répondu « Non ».
    if (ui.spoilerPrompt) modal.value = 'spoiler';
    function declineSpoiler(){ ui.spoilerPrompt = false; modal.value = null; }

    function onKey(ev){ if (ev.key === 'Escape'){ modal.value = null; hideTip(); } }
    window.addEventListener('keydown', onKey);

    const savedAt = computed(() => lastSaved.value ? lastSaved.value.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) : null);

    const LINK_LABEL = { off:'Auto-tracking désactivé', connecting:'Relais introuvable', relay:'Relais prêt, jeu non connecté', game:'Jeu connecté' };
    // Question de l'auto-tracking : entrée découverte à destination ambiguë
    const exitName = k => k && EXIT[k] ? areaName(k) + ' · ' + EXIT[k].label : '?';
    const askFrom = q => exitName(EXIT_BY_ENTR[q.d]?.key);
    const askLabel = a => exitName(EXIT_BY_ARRIVAL[a]);
    /* Fenêtre de stream (index.html?stream, STREAM_MODE) : blocs disposés librement (ui de stream gardée à part,
       localStorage STREAM_KEY), fond uni ou transparent ; la partie vient de la fenêtre principale (state.js). */
    const STREAM = STREAM_MODE;
    const sl = reactive(loadStream());
    watch(sl, () => { try { localStorage.setItem(STREAM_KEY, JSON.stringify(sl)); } catch (e) {} }, { deep:true });
    const swEdit = ref(false), swSel = ref(null), swAdd = ref('items'), swHint = ref(true);
    setTimeout(() => { swHint.value = false; }, 6000);
    const swSelW = computed(() => sl.widgets.find(w => w.id === swSel.value) || null);
    const streamBg = computed(() => sl.bg === 'theme' ? 'var(--bg)' : sl.bg === 'custom' ? sl.color : sl.bg);
    // contenu à sa largeur naturelle, agrandi ou réduit (zoom) à la largeur du bloc ; image, texte, espace : à la taille du bloc
    const swBase = w => w.cols === 2 && STREAM_TYPES[w.type].base2 || STREAM_TYPES[w.type].base;
    const swBodyStyle = w => STREAM_TYPES[w.type].free ? null : { width:swBase(w) + 'px', zoom:w.w / swBase(w) };
    let swDrag = null;
    function swDown(ev, w, mode){ swSel.value = w.id; swDrag = { w, mode, x0:ev.clientX, y0:ev.clientY, a:mode === 'move' ? [w.x, w.y] : [w.w, w.h] }; }
    function swMove(ev){
      if (!swDrag) return;
      const d = swDrag, snap = v => Math.round(v / 10) * 10, dx = ev.clientX - d.x0, dy = ev.clientY - d.y0;
      if (d.mode === 'move'){ d.w.x = Math.max(0, snap(d.a[0] + dx)); d.w.y = Math.max(0, snap(d.a[1] + dy)); }
      else { d.w.w = Math.max(80, snap(d.a[0] + dx)); if (STREAM_TYPES[d.w.type].free) d.w.h = Math.max(40, snap(d.a[1] + dy)); }
    }
    const swUp = () => { swDrag = null; };
    function swNew(){
      const t = STREAM_TYPES[swAdd.value], id = Math.max(0, ...sl.widgets.map(w => w.id)) + 1;
      sl.widgets.push({ id, type:swAdd.value, x:40, y:40, w:t.w || t.base, h:t.h || 200, ...(t.init || {}) });
      swSel.value = id;
    }
    const swDelete = w => { sl.widgets.splice(sl.widgets.indexOf(w), 1); if (swSel.value === w.id) swSel.value = null; };
    const swReset = () => { Object.assign(sl, streamDefaults()); swSel.value = null; };
    function swImage(ev, w){
      const f = ev.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => { w.src = r.result; };
      r.readAsDataURL(f);
    }
    if (STREAM){
      document.documentElement.classList.add('stream-mode');
      window.addEventListener('keydown', ev => {
        if (ev.key.toLowerCase() === 'e' && !/^(INPUT|SELECT|TEXTAREA)$/.test(ev.target.tagName)) swEdit.value = !swEdit.value;
      });
      window.addEventListener('dblclick', ev => { if (!swEdit.value && !ev.target.closest('input')) swEdit.value = true; });
    }
    const openStream = () => window.open('index.html?stream', 'oeil-sheikah-stream', 'width=1600,height=900');
    // Prochaine étape du trajet du Routeur (bloc du stream) : mode de déplacement et carte suivante
    const nextStep = computed(() => {
      const r = route.value;
      if (r.state !== 'ok') return null;
      const items = r.items, i = items.findIndex((it, k) => k > 0 && (it.t === 'card' || it.t === 'retake'));
      if (i < 0) return null;
      const it = items[i], edge = items.slice(1, i).find(x => x.t === 'edge'), key = it.t === 'retake' ? it.key : it.key0;
      const to = ui.router.toExit;
      return { take:edge ? edge.e.from : key, mode:it.t === 'retake' ? 'Reprendre cette sortie' : edge ? edgeLabel(edge.e) : 'Changement d’âge',
        icon:it.t === 'retake' || !edge ? null : edgeIcon(edge.e), zone:areaName(key), exit:EXIT[key].label,
        goal:it.end || !EXIT[to] ? '' : areaName(to) + ' · ' + EXIT[to].label };
    });
    /* Statistiques : chronologie de la partie (game.timeline, js/state.js) et compteurs */
    const nowTick = ref(Date.now());
    setInterval(() => { nowTick.value = Date.now(); }, 30000);
    const fmtDur = ms => { const t = Math.max(0, Math.round(ms / 1000)); return Math.floor(t / 3600) + ':' + String(Math.floor(t % 3600 / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); };
    const stFilter = ref('items');
    const statsC = computed(() => {
      const g = store.game, tl = Array.isArray(g.timeline) ? g.timeline : [], timed = tl.filter(e => e.t);
      const origin = g.runStart || (timed.length ? Math.min(...timed.map(e => e.t)) : 0);
      const rows = tl.map((e, i) => {
        if (e.k === 'checks'){
          const c = CHECK_BY_ID[e.id];
          return { i, k:e.k, at:e.t && origin ? fmtDur(e.t - origin) : null, label:c ? c.label + ' · ' + CHECK_AREA[c.area].label : e.id,
            icon:c && CHECK_CAT[c.cat].icon, found:g.found[e.id] !== undefined ? foundInfo(g.found[e.id]).title : '' };
        }
        const it = ITEM_BY_KEY[e.id];
        return { i, k:e.k, at:e.t && origin ? fmtDur(e.t - origin) : null, label:it ? itemLabelAt(it, e.v) : e.id, icon:it ? itemIconAt(it, e.v) : null, found:'' };
      }).reverse();
      // courbe en escalier : checks faits depuis l'origine (ceux d'avant le suivi au départ)
      const ck = timed.filter(e => e.k === 'checks').map(e => e.t).sort((a, b) => a - b);
      let curve = null;
      if (origin && ck.length){
        const end = Math.max(nowTick.value, ck[ck.length - 1]), span = Math.max(1, end - origin), start = tl.filter(e => e.k === 'checks' && !e.t).length;
        const max = Math.max(1, start + ck.length), W = 600, H = 150, x = t => (t - origin) / span * W, y = n => H - n / max * H;
        let d = 'M0,' + y(start).toFixed(1), n = start;
        for (const t of ck){ d += ' H' + x(t).toFixed(1) + ' V' + y(++n).toFixed(1); }
        curve = { d:d + ' H' + W, area:d + ' H' + W + ' V' + H + ' H0 Z', end:fmtDur(end - origin), max };
      }
      return { origin, elapsed:origin ? nowTick.value - origin : null, rows, curve, nItems:tl.filter(e => e.k !== 'checks').length };
    });
    const statsRows = computed(() => statsC.value.rows.filter(r => stFilter.value === 'all' || (stFilter.value === 'checks' ? r.k === 'checks' : r.k !== 'checks')));
    /* Carte (js/components.js, ZoneMap) : zone affichée (choisie, sinon celle de la position) et sortie à mettre en
       évidence (« Voir sur la carte ») */
    const MAPS_OK = !!window.MAPS_DATA;
    const mapAreas = AREAS.filter(a => MAP_SCENES[a.id]);
    const mapFocus = ref(null);
    const mapArea = computed({
      get(){ const k = link.position?.key || ui.router.fromExit; return ui.map.area || (k && EXIT[k] && MAP_SCENES[EXIT[k].areaId] ? EXIT[k].areaId : mapAreas[0]?.id); },
      set(v){ ui.map.area = v; mapFocus.value = null; },
    });
    function openMap(key){
      if (!key || !EXIT[key]) return;
      ui.map.area = EXIT[key].areaId; mapFocus.value = null;
      nextTick(() => { mapFocus.value = key; });
      go('map');
    }
    const mapHere = () => { ui.map.area = ''; mapFocus.value = null; };
    const mapStart = key => setStart(key, ui.router.fromAge);
    function mapGoal(key){ const r = ui.router; r.toArea = EXIT[key].areaId; nextTick(() => { r.toExit = key; }); }
    /* Indices (pierres à potins) : pierres groupées par zone, édition du texte à la demande */
    const hintGroups = CHECK_AREAS.map(a => ({ area:a.id, stones:GOSSIP_STONES.filter(s => s.area === a.id) })).filter(g => g.stones.length);
    const hintEdit = reactive({});
    return { store, ui, s, views, navGroups, link, LINK_LABEL, linkRequestState, linkAdoptSave, linkAsks, linkAnswer, askFrom, askLabel, canSplit, splitOn, shown, paneOf, swapPanes, openSide, closeSide, navOpen, itemsOpen, modal, tip, tipData, backup, stats, missingSpawns, visibleAreas,
      ICONS, ITEMS_PAGE, ITEM_BY_KEY, DUNGEONS, DUNGEON_BY_ID, CHECKLISTS, AREA, EXIT, DATA_ERRORS,
      iconKey, exitIcon, areaName, toggleArea, setAll, jump, go, showTip, hideTip, toggleTip, setMapping, clearMapping,
      checkAreasC, checkStats, toggleCheckArea, lastCheck, toggleCheck, toggleExcluded, undoCheck, foundInfo, seenInfo, loadSpoilerFile, linkClearSpoiler, linkSpoilerOk, goToCheck, goToZone, why, openWhy, nextC, stepsLabel, goMsg, setAllChecks, jumpCheck, setCheck, setExcluded, CHECK_AREA,
      CHECK_CATS, CHECK_CAT, catCounts, toggleCat, zoneTitle, soloCat, allCats, CHECK_AGES, ageLabelShort, ageKnown, checkGroups,
      lg, canNow, timeOf, checkLogicTitle, CHILD, ADULT,
      panelSkills, panelChecklists, cells, dungeonRows, skeletonShown, atStart, visibleKeys,
      CONFIG_TABS, TRICK_LEVELS, decoupled, configCards, trickFilter, tricksOn, trickGroups, setTricks, importReport, importSpoiler,
      itemVisible, tierLabel, iconSrc, checklistModal, openChecklist, setChecklist, checklistStats,
      tradeModal, openTrade, tradeStats, counterClass,
      TRIALS, trialStatus, cycleTrial, setDungeonFlag, addDungeonKeys, dungeonQuest, dungeonMaxKeys, cycleDungeonQuest, questLabel, questClass, questTitle, keysLabel, dungeonKeyRing, setKeyRing, dungeonKeysDone, keysTitle, brokenIcons,
      setTheme, startHere, prevStart, backToPrev, liveStart, pickAreas, pickExits, zoneExcludeMode, zoneExclude, hintGroups, hintEdit, hintsC, setHintRead, GOSSIP_STONES, HINT_TYPES, CHECK_AREAS, MAP_SCENES, MAPS_OK, mapAreas, mapFocus, mapArea, openMap, mapHere, mapStart, mapGoal, fmtDur, stFilter, statsC, statsRows, STREAM, STREAM_TYPES, sl, swEdit, swSel, swAdd, swHint, swSelW, streamBg, swBodyStyle, swDown, swMove, swUp, swNew, swDelete, swReset, swImage, openStream, nextStep, swap, route, edgeLabel, edgeIcon, WARP_SONGS, ageLabel, openBackup, copyBackup, importBackup, resetAll, declineSpoiler, savedAt, TYPE_LABEL };
  },
  template:`
${STREAM_TPL}
<div v-if="!STREAM" class="shell" :class="{'nav-open':navOpen, split:splitOn, 'items-folded':ui.itemsFolded, 'nav-folded':ui.navFolded}">
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
        <span v-if="canSplit && !shown(v.id)" class="nav-split" role="button" :title="'Ouvrir ' + v.label + ' à côté'" v-html="ICONS.split"
          @click.stop="openSide(v.id)"></span></button>
      </template>
    </nav>

    <section v-if="shown('entrances')" class="side-sec" :style="{order:paneOf('entrances')==='side' ? 2 : 1}">
      <div v-if="splitOn" class="side-title side-page">Entrées</div>
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

    <section v-if="shown('router')" class="side-sec compact" :style="{order:paneOf('router')==='side' ? 2 : 1}">
      <div v-if="splitOn" class="side-title side-page">Routeur</div>
      <label class="check" title="Coût total dans le résumé et coût de chaque étape (réglables dans Configuration)"><input type="checkbox" v-model="ui.router.showCost">Afficher les coûts</label>
      <label class="check" title="Départ et arrivée : ne proposer que les sorties accessibles d'après la logique (entrées notées ou d'origine, objets notés)"><input type="checkbox" v-model="ui.router.onlyReachable">Seulement les lieux accessibles</label>
      <label class="check" title="Bandeau en bas de page : prochaine étape du trajet et checks faisables les plus proches"><input type="checkbox" v-model="ui.next.enabled">Bandeau « Où aller ? »</label>
    </section>

    <section v-if="shown('checks')" class="side-sec" :style="{order:paneOf('checks')==='side' ? 2 : 1}">
      <div v-if="splitOn" class="side-title side-page">Checks</div>
      <div class="side-row"><button class="side-btn" @click="setAllChecks(false)">Tout déplier</button><button class="side-btn" @click="setAllChecks(true)">Tout replier</button></div>
      <label class="check"><input type="checkbox" v-model="ui.checks.showExcluded">Afficher les checks exclus</label>
      <label class="check" title="Objet obtenu dans chaque check, noté par l'auto-tracking"><input type="checkbox" v-model="ui.checks.showFound">Afficher l'objet trouvé</label>
      <label class="check" title="Ajoute à l'infobulle de chaque check sa condition dans la logique de SoH (option « Show Logic » du tracker de SoH)"><input type="checkbox" v-model="ui.checks.showLogic">Afficher la logique au survol</label>
      <label class="check" title="Lister aussi les Skulltulas dont le symbole n'est pas mélangé (utile pour les récompenses de la Maison des Skulltulas) — option « Always show Gold Skulltulas » du tracker de SoH"><input type="checkbox" v-model="ui.checks.alwaysGS">Suivre aussi les Skulltulas non mélangées</label>
      <div class="zone-nav check-nav">
        <template v-for="[g, list] in checkGroups" :key="g">
          <div class="side-title">{{g}}</div>
          <button v-for="x in list" :key="x.area.id" :class="['st-' + x.state, {done:x.complete, 'hint-woth':hintsC.woth[x.area.id], 'hint-foolish':hintsC.foolish[x.area.id]}]"
            :title="zoneTitle(x) + (hintsC.woth[x.area.id] ? ' — sur la voie du héros' : hintsC.foolish[x.area.id] ? ' — zone futile' : '')" @click="jumpCheck(x.area.id)">
            <span class="cn-name"><i v-if="hintsC.woth[x.area.id]" class="cn-hint">★</i>{{x.area.label}}</span>
            <span v-if="x.total" class="cn-nums"><i>{{x.got}}</i><i class="a">{{x.accessible}}</i><i>{{x.total}}</i></span></button>
        </template>
      </div>
    </section>

    <div class="side-foot">
      <div class="side-foot-row">
        <div class="saved" v-if="savedAt"><i></i>Enregistré à {{savedAt}}</div>
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
      <progress-card :stats="checkStats" unit="checks" title="Checks" :active="ui.view==='checks'" @open="go('checks')"></progress-card>
      <progress-card v-if="stats.editable" :stats="stats" unit="sorties" title="Entrées" :active="ui.view==='entrances'" @open="go('entrances')"></progress-card>
    </div>
    <div class="panes" :class="{split:splitOn}">
    <!-- ================= TRACKER ================= -->
    <section v-if="shown('entrances')" class="pane" :class="'pane-' + paneOf('entrances')">
      <div v-if="paneOf('entrances')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Entrées</h1></div>
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
              <type-icon :type="iconKey(r.e)" :src="exitIcon(r.e)"></type-icon>
              <button class="globe" :class="{none:!r.e.connections.length}" :aria-label="'Connexions depuis '+r.e.label"
                @mouseenter="r.e.connections.length && showTip($event,r.e.key)" @mouseleave="hideTip" @focus="r.e.connections.length && showTip($event,r.e.key)" @blur="hideTip"
                @click.stop="r.e.connections.length && toggleTip($event,r.e.key)" v-html="ICONS.globe"></button>
              <div class="c-name" :title="r.e.soh">{{r.e.label}}</div>
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

    <!-- ================= ROUTEUR ================= -->
    <!-- ================= CHECKS ================= -->
    <section v-if="shown('checks')" class="pane" :class="'pane-' + paneOf('checks')">
      <div v-if="paneOf('checks')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Checks</h1></div>

      <div class="checks-toolbar">
        <input class="checks-search" type="search" v-model="ui.checks.q" placeholder="Rechercher un check ou une zone…" aria-label="Rechercher un check">
        <div class="ct-row">
          <div class="age-seg" title="Âge auquel le check est faisable (selon la logique, avec tout l'inventaire)">
            <span class="ct-label">Âge</span>
            <button v-for="[id, l] in CHECK_AGES" :key="id" type="button" :class="{on:ui.checks.age===id}" :disabled="!ageKnown" @click="ui.checks.age=id">{{l}}</button>
          </div>
          <label class="check" title="N'afficher que les checks faisables avec l'inventaire actuel (et ceux déjà faits) — option « Only show available » du tracker de SoH"><input type="checkbox" v-model="ui.checks.onlyAvailable">Seulement les faisables</label>
          <label class="check"><input type="checkbox" v-model="ui.checks.hideDone">Masquer les checks faits</label>
          <label class="check"><input type="checkbox" v-model="ui.checks.hideDoneZones">Masquer les zones terminées</label>
          <label class="check" title="Dans chaque zone : faisables maintenant, puis pas encore faisables, puis faits"><input type="checkbox" v-model="ui.checks.sortAvail">Faisables en premier</label>
        </div>
        <div class="cat-chips">
          <button v-for="k in CHECK_CATS" v-show="catCounts[k.id].total" :key="k.id" type="button" class="cat-chip" :class="{off:ui.checks.hiddenCats[k.id]}"
            :title="k.label + ' : ' + catCounts[k.id].left + ' à faire sur ' + catCounts[k.id].total + ' — clic : afficher / masquer, clic droit : seulement cette catégorie'"
            @click="toggleCat(k.id)" @contextmenu.prevent="soloCat(k.id)">
            <img v-if="!brokenIcons[k.icon]" :src="k.icon" alt="" @error="brokenIcons[k.icon]=true"><span v-else class="cat-fallback" :style="{'--cc':k.color}">{{k.label[0]}}</span>
            <span class="cc-label">{{k.label}}</span><b>{{catCounts[k.id].left}}</b></button>
          <button type="button" class="link cat-all" @click="allCats(true)">Tout afficher</button>
        </div>
      </div>

      <div v-if="!checkAreasC.length" class="empty"><b>Aucun check à afficher.</b>
        {{ui.checks.q ? 'Aucun résultat pour cette recherche.' : 'Vérifiez la Configuration ou les filtres.'}}</div>
      <article v-for="x in checkAreasC" :key="x.area.id" class="area check-area" :id="'carea-'+x.area.id"
        :class="['st-' + x.state, {collapsed:ui.checks.collapsed[x.area.id], complete:x.complete, 'hint-woth':hintsC.woth[x.area.id], 'hint-foolish':hintsC.foolish[x.area.id]}]">
        <button class="area-head" @click="toggleCheckArea(x.area.id)" :aria-expanded="!ui.checks.collapsed[x.area.id]">
          <span class="chev" v-html="ICONS.chevron"></span>
          <h2>{{x.area.label}}</h2>
          <span v-if="hintsC.woth[x.area.id]" class="hint-badge woth" :title="'Sur la voie du héros — indiqué par : ' + hintsC.woth[x.area.id].join(', ')">Voie du héros</span>
          <span v-if="hintsC.foolish[x.area.id]" class="hint-badge foolish" :title="'Zone futile — indiqué par : ' + hintsC.foolish[x.area.id].join(', ')">Futile</span>
          <span v-if="hintsC.areaItems[x.area.id]" class="hint-badge items" :title="hintsC.areaItems[x.area.id].join(' · ')" v-html="ICONS.hint + hintsC.areaItems[x.area.id].length"></span>
          <span v-if="x.area.dungeon" class="dg-quest-pill" :class="questClass(x.area.dungeon)" :title="questTitle(x.area.dungeon)"
            @click.stop="cycleDungeonQuest(x.area.dungeon)" @contextmenu.prevent.stop="cycleDungeonQuest(x.area.dungeon,true)">{{questLabel(x.area.dungeon)}}</span>
          <span class="zone-cats">
            <span v-for="b in x.byCat" v-show="b.left" :key="b.cat.id" class="zc" :title="b.cat.label + ' : ' + b.left + ' à faire'">
              <img v-if="!brokenIcons[b.cat.icon]" :src="b.cat.icon" alt=""><span v-else class="cat-fallback" :style="{'--cc':b.cat.color}">{{b.cat.label[0]}}</span>{{b.left}}</span>
          </span>
          <span v-if="zoneExcludeMode(x.area.id)" class="go-btn zone-ex" role="button" tabindex="0"
            :title="zoneExcludeMode(x.area.id) === 'exclude' ? 'Ignorer la zone : exclure tous ses checks restants (zone futile…)' : 'Réintégrer la zone : ses checks exclus comptent de nouveau'"
            @click.stop="zoneExclude(x)" @keydown.enter.stop="zoneExclude(x)">{{zoneExcludeMode(x.area.id) === 'exclude' ? '⊘' : '↺'}}</span>
          <span class="go-btn zone-go" role="button" tabindex="0" title="Y aller (Routeur, depuis le départ actuel)" v-html="ICONS.router"
            @click.stop="goToZone(x.area.id)" @keydown.enter.stop="goToZone(x.area.id)"></span>
          <span class="zone-prog" :title="zoneTitle(x)">
            <span class="zbar"><i class="d" :style="{width:(x.total ? 100*x.got/x.total : 0)+'%'}"></i><i class="a" :style="{width:(x.total ? 100*x.accessible/x.total : 0)+'%'}"></i></span>
            <span class="zn"><b>{{x.got}}</b><small>fait{{x.got>1?'s':''}}</small></span>
            <span class="zn acc"><b>{{x.accessible}}</b><small>accessible{{x.accessible>1?'s':''}}</small></span>
            <span class="zn"><b>{{x.total}}</b><small>total</small></span></span>
        </button>
        <div v-if="!ui.checks.collapsed[x.area.id]" class="check-body">
          <p v-if="x.hiddenQuest" class="quest-note">Version du donjon inconnue : {{x.hiddenQuest}} check{{x.hiddenQuest>1?'s':''}} propre{{x.hiddenQuest>1?'s':''}} à la version Vanilla ou Master Quest {{x.hiddenQuest>1?'sont masqués':'est masqué'}}.
            Indiquez la version avec le badge « ? » (ou dans le panneau Objets).</p>
          <ul v-if="x.checks.length" class="check-list-grid">
            <li v-for="c in x.checks" :key="c.id" class="check-item"
              :class="{done:store.game.checks[c.id], excluded:s.excluded[c.id], avail:!store.game.checks[c.id] && canNow(c), locked:!store.game.checks[c.id] && !canNow(c)}">
              <button type="button" class="ci-main" :title="checkLogicTitle(c)" @click="toggleCheck(c)">
                <span class="ci-cat"><img v-if="!brokenIcons[CHECK_CAT[c.cat].icon]" :src="CHECK_CAT[c.cat].icon" alt="" @error="brokenIcons[CHECK_CAT[c.cat].icon]=true"><span v-else class="cat-fallback" :style="{'--cc':CHECK_CAT[c.cat].color}">{{CHECK_CAT[c.cat].label[0]}}</span></span>
                <span class="ci-label">{{c.label}}<span v-if="hintsC.checks[c.id]" class="ci-hint" :title="'Indice : ' + hintsC.checks[c.id].join(' · ')" v-html="ICONS.hint"></span><span v-if="ui.checks.showFound && store.game.found[c.id] !== undefined" class="ci-found"
                  :title="'Objet trouvé : ' + foundInfo(store.game.found[c.id]).title"><img v-if="foundInfo(store.game.found[c.id]).src" :src="foundInfo(store.game.found[c.id]).src" alt="">{{foundInfo(store.game.found[c.id]).title}}</span><span
                  v-else-if="ui.checks.showFound && store.game.seen[c.id]" class="ci-found seen" :title="'En vente : ' + seenInfo(store.game.seen[c.id]).title + (store.game.seen[c.id][1] != null ? ' — ' + store.game.seen[c.id][1] + ' rubis' : '')"><img
                  v-if="seenInfo(store.game.seen[c.id]).src" :src="seenInfo(store.game.seen[c.id]).src" alt="">{{seenInfo(store.game.seen[c.id]).title}}<b v-if="store.game.seen[c.id][1] != null">{{store.game.seen[c.id][1]}} ₹</b></span></span>
                <span v-if="timeOf(lg(c).ever)" class="time-mark" :class="timeOf(lg(c).ever)">{{timeOf(lg(c).ever) === 'night' ? '☾' : '☀'}}</span>
                <span v-if="lg(c).age" class="age-pill" :class="lg(c).age">
                  <i v-if="lg(c).age !== 'adult'" :class="{now:lg(c).now & CHILD}">E</i><i v-if="lg(c).age !== 'child'" :class="{now:lg(c).now & ADULT}">A</i></span>
                <span v-else class="age-pill never">—</span>
                <span class="cr-mark" v-html="store.game.checks[c.id] ? ICONS.check : ICONS.circleO"></span></button>
              <button v-if="!store.game.checks[c.id] && !canNow(c)" type="button" class="ci-ex ci-go" title="Pourquoi ce check n’est pas faisable ?" v-html="ICONS.why" @click="openWhy(c)"></button>
              <button v-if="!store.game.checks[c.id]" type="button" class="ci-ex ci-go" title="Y aller (Routeur, depuis le départ actuel)" v-html="ICONS.router" @click="goToCheck(c)"></button>
              <button type="button" class="ci-ex" :title="s.excluded[c.id] ? 'Réintégrer ce check' : 'Exclure ce check (ne compte plus)'"
                @click="toggleExcluded(c)">{{s.excluded[c.id] ? '↺' : '⊘'}}</button>
            </li>
          </ul>
          <p v-else class="quest-note">{{x.total ? 'Tous les checks affichés de cette zone sont faits.' : x.state === 'ignored' ? 'Zone ignorée : ' + x.excluded + ' check' + (x.excluded > 1 ? 's' : '') + ' exclu' + (x.excluded > 1 ? 's' : '') + ' (↺ pour la réintégrer).' : 'Aucun check avec les filtres actuels.'}}</p>
        </div>
      </article>
      <div v-if="lastCheck || goMsg" class="toast" role="status">
        <template v-if="goMsg">{{goMsg}}</template>
        <template v-else>{{lastCheck.text}}
          <button type="button" @click="undoCheck"><span v-html="ICONS.undo"></span>Annuler</button></template>
      </div>
    </section>

    <section v-if="shown('router')" class="pane" :class="'pane-' + paneOf('router')">
      <div v-if="paneOf('router')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Routeur</h1><p class="lede">Chemin le plus court entre deux sorties, selon ce que vous avez découvert et l'état de la partie.</p></div>
      <div class="rform">
        <div class="rline">
          <div class="rtag">Départ</div>
          <div class="field"><label for="fa">Zone</label>
            <select id="fa" class="sel" v-model="ui.router.fromArea"><option value="" disabled>Choisir une zone</option>
              <option v-for="a in pickAreas(ui.router.fromArea)" :key="a.id" :value="a.id">{{a.name}}</option></select></div>
          <div class="field"><label for="fe">Sortie</label>
            <select id="fe" class="sel" v-model="ui.router.fromExit" :disabled="!ui.router.fromArea"><option value="" disabled>Choisir une sortie</option>
              <option v-for="e in pickExits(ui.router.fromArea, ui.router.fromExit)" :key="e.key" :value="e.key" :title="e.soh">{{e.label}}</option></select></div>
          <div class="field agebox"><span class="lbl">Âge</span><seg v-model="ui.router.fromAge" :options="[['child','Enfant'],['adult','Adulte']]"></seg></div>
        </div>
        <div class="rswap"><button type="button" @click="swap"><span v-html="ICONS.swap"></span>Inverser</button></div>
        <div class="rline">
          <div class="rtag">Arrivée</div>
          <div class="field"><label for="ta">Zone</label>
            <select id="ta" class="sel" v-model="ui.router.toArea"><option value="" disabled>Choisir une zone</option>
              <option v-for="a in pickAreas(ui.router.toArea)" :key="a.id" :value="a.id">{{a.name}}</option></select></div>
          <div class="field"><label for="te">Sortie</label>
            <select id="te" class="sel" v-model="ui.router.toExit" :disabled="!ui.router.toArea"><option value="" disabled>Choisir une sortie</option>
              <option v-for="e in pickExits(ui.router.toArea, ui.router.toExit)" :key="e.key" :value="e.key" :title="e.soh">{{e.label}}</option></select></div>
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
          <div class="rstat transition"><span class="rstat-ic"><img src="icons/route/transition.png" alt=""></span>
            <div><b>{{route.transitions}}</b><span>transition{{route.transitions>1?'s':''}}</span></div></div>
          <div class="rstat warp" v-if="route.warps"><span class="rstat-ic"><img src="icons/exits/warp.png" alt=""></span>
            <div><b>{{route.warps}}</b><span>chant{{route.warps>1?'s':''}} de téléportation</span></div></div>
          <div class="rstat reset" v-if="route.resets"><span class="rstat-ic"><img src="icons/route/reset.png" alt=""></span>
            <div><b>{{route.resets}}</b><span>rechargement{{route.resets>1?'s':''}}</span></div></div>
          <div class="rstat agechg" v-if="route.ages"><span class="rstat-ic"><img src="icons/route/age_child_to_adult.png" alt=""></span>
            <div><b>{{route.ages}}</b><span>changement{{route.ages>1?'s':''}} d'âge</span></div></div>
          <div class="rstat cost" v-if="ui.router.showCost"><span class="rstat-ic" v-html="ICONS.router"></span>
            <div><b>{{route.cost}}</b><span>coût total</span></div></div>
        </div>
        <p class="path-hint"><template v-if="liveStart"><span class="live-start"><span v-html="ICONS.live"></span>Départ suivi en direct</span></template>
          Cliquez sur une sortie du trajet pour repartir de là.
          <button v-if="prevStart" type="button" class="prev-start" @click="backToPrev"
            :title="'Départ précédent : ' + areaName(prevStart.exit) + ' · ' + EXIT[prevStart.exit].label + ' (' + ageLabel(prevStart.age) + ')'">
            <span v-html="ICONS.undo"></span>Revenir à {{areaName(prevStart.exit)}} · {{EXIT[prevStart.exit].label}}</button></p>
        <div class="path">
          <template v-for="(it,i) in route.items" :key="i">
            <div v-if="it.t==='card'" class="node" :class="{start:it.start && !it.end, end:it.end, next:liveStart && it.next}">
              <type-icon :type="iconKey(EXIT[it.key0])" :src="exitIcon(EXIT[it.key0])"></type-icon>
              <button v-if="MAPS_OK && MAP_SCENES[EXIT[it.key0].areaId]" type="button" class="node-map" title="Voir sur la carte" v-html="ICONS.map"
                @click.stop="openMap(it.rows[it.rows.length - 1].key)"></button>
              <div class="role" v-if="it.start || it.end || liveStart && it.next">{{it.start && it.end ? 'Départ et arrivée' : it.start ? 'Départ' : it.end ? 'Arrivée' : 'Prochaine destination'}}</div>
              <b>{{areaName(it.key0)}}</b>
              <template v-for="(row, j) in it.rows" :key="j">
                <div v-if="j" class="node-walk">
                  <span class="nw-line"><img src="icons/route/walk.png" alt="">à pied<small v-if="ui.router.showCost"> · coût {{it.walks[j-1].e.cost}}</small></span>
                  <span v-if="it.walks[j-1].reqs.icons.length" class="reqs">
                    <img v-for="r in it.walks[j-1].reqs.icons" :key="r.key" :src="r.src" :title="r.title" alt="">
                    <span v-if="it.walks[j-1].reqs.alts.length" class="alt-mark" :title="it.walks[j-1].reqs.altTitle">ou…</span></span>
                </div>
                <div class="sub node-exit" :class="{goal:it.end && j && j === it.rows.length - 1, here:it.start && !j}" role="button" tabindex="0"
                  :title="it.start && !j ? 'Point de départ' : 'Partir d’ici (' + EXIT[row.key].soh + ')'" @click="startHere(row)" @keydown.enter="startHere(row)">
                  <type-icon v-if="j" class="mini" :type="iconKey(EXIT[row.key])" :src="exitIcon(EXIT[row.key])"></type-icon>{{EXIT[row.key].label}}</div>
              </template>
            </div>
            <template v-else-if="it.t==='retake'">
              <div class="conn" :class="{next:liveStart && it.next}"><span class="ln"></span><span class="ln"></span><span class="arrow" v-html="ICONS.caret"></span></div>
              <div class="node retake" :class="{next:liveStart && it.next}" :title="EXIT[it.key].soh">
                <span class="ticon" v-html="ICONS.uturn"></span>
                <div class="role" v-if="liveStart">Prochaine étape</div>
                <b>{{liveStart ? 'Reprendre' : 'Prendre'}} cette sortie</b>
                <div class="sub">{{areaName(it.key)}} · {{EXIT[it.key].label}}</div>
              </div>
            </template>
            <div v-else-if="it.t==='edge'" class="conn" :class="{next:liveStart && it.next}">
              <span class="ln"></span>
              <!-- transition simple : pas de pastille, le trait suffit (objets et coût éventuels seulement) -->
              <div class="lab" v-if="it.e.kind !== 'transition' || it.reqs.icons.length || ui.router.showCost"><span v-if="it.e.kind !== 'transition'" class="mv" :class="[it.e.kind, it.e.kind === 'warp' ? 'song-' + WARP_SONGS[it.e.warp] : '']"><img class="mv-ic" :src="edgeIcon(it.e)" alt="">
                <span class="mv-txt">{{edgeLabel(it.e)}}<small v-if="ui.router.showCost">Coût : {{it.e.cost}}</small></span>
                <img class="mv-ic" :src="edgeIcon(it.e)" alt=""></span>
                <small v-else-if="ui.router.showCost" class="conn-cost">coût {{it.e.cost}}</small>
                <span v-if="it.reqs.icons.length" class="reqs" :class="{alt:it.reqs.alts.length}">
                  <img v-for="r in it.reqs.icons" :key="r.key" :src="r.src" :title="r.title" alt="">
                  <span v-if="it.reqs.alts.length" class="alt-mark" :title="it.reqs.altTitle">ou…</span></span></div>
              <span class="ln"></span><span class="arrow" v-html="ICONS.caret"></span>
            </div>
            <div v-if="it.t==='age'" class="conn" :class="{next:liveStart && it.next}"><span class="ln"></span><span class="ln"></span><span class="arrow" v-html="ICONS.caret"></span></div>
            <div v-if="it.t==='age'" class="ageband" :class="{next:liveStart && it.next}" :title="ageLabel(it.from) + ' vers ' + ageLabel(it.to) + ', au Temple du Temps'">
              <img class="age-art" :src="'icons/route/age_' + it.from + '_to_' + it.to + '.png'" alt=""><b>Changement d'âge</b></div>
          </template>
        </div>
        <p class="note" v-if="ui.router.showCost">Coûts de marche, transition, chant, rechargement et changement d'âge réglables dans Configuration.</p>
      </template>
    </section>

    <!-- ================= CONFIGURATION ================= -->
    <section v-if="shown('hints')" class="pane" :class="'pane-' + paneOf('hints')">
      <div v-if="paneOf('hints')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Indices</h1><p class="lede">Pierres à potins : marquez celles que vous avez lues (le jeu ne le signale pas).
        {{ linkSpoilerOk() || link.spoiler ? 'Avec le spoiler caché, l’indice s’affiche dès que la pierre est marquée lue.' : 'Sans spoiler caché, notez l’indice vous-même.' }}</p></div>
      <div class="hint-sum">
        <div class="hs-card woth"><b>Voie du héros</b>
          <span v-for="(f, a) in hintsC.woth" :key="a" class="hs-chip" :title="'Indiqué par : ' + f.join(', ')">{{CHECK_AREA[a]?.label || a}}</span>
          <span v-if="!Object.keys(hintsC.woth).length" class="hs-none">—</span></div>
        <div class="hs-card foolish"><b>Zones futiles</b>
          <span v-for="(f, a) in hintsC.foolish" :key="a" class="hs-chip" :title="'Indiqué par : ' + f.join(', ')">{{CHECK_AREA[a]?.label || a}}</span>
          <span v-if="!Object.keys(hintsC.foolish).length" class="hs-none">—</span></div>
        <div class="hs-card count"><b>{{Object.keys(store.game.hints).length}} / {{GOSSIP_STONES.length}}</b><span>pierres lues</span></div>
      </div>
      <article v-for="g in hintGroups" :key="g.area" class="hint-zone">
        <h2>{{CHECK_AREA[g.area]?.label || g.area}}</h2>
        <div v-for="s in g.stones" :key="s.id" class="hint-row" :class="{read:store.game.hints[s.id]}">
          <button type="button" class="hr-mark" :title="store.game.hints[s.id] ? 'Marquer non lue' : 'Marquer lue'" v-html="store.game.hints[s.id] ? ICONS.check : ICONS.circleO"
            @click="setHintRead(s.id, !store.game.hints[s.id])"></button>
          <div class="hr-body">
            <div class="hr-name"><b>{{s.label}}</b><small :title="s.id">{{s.id}}</small></div>
            <template v-if="store.game.hints[s.id]">
              <p v-if="store.game.hints[s.id].text && !hintEdit[s.id]" class="hr-text">{{store.game.hints[s.id].text}}
                <span v-if="store.game.hints[s.id].area && ['woth','foolish','item','itemArea'].includes(store.game.hints[s.id].t)" class="hr-area">{{CHECK_AREA[store.game.hints[s.id].area]?.label}}</span></p>
              <!-- saisie : indice à compléter (sans spoiler), ou sur demande -->
              <div v-if="hintEdit[s.id] || !store.game.hints[s.id].t" class="hr-edit">
                <select class="sel" v-model="store.game.hints[s.id].t" aria-label="Type d’indice"><option value="">Type d’indice…</option>
                  <option v-for="(l, t) in HINT_TYPES" :key="t" :value="t">{{l}}</option></select>
                <select v-if="['woth','foolish','item','itemArea'].includes(store.game.hints[s.id].t)" class="sel" v-model="store.game.hints[s.id].area" aria-label="Zone">
                  <option value="">Zone…</option><option v-for="a in CHECK_AREAS" :key="a.id" :value="a.id">{{a.label}}</option></select>
                <input class="hr-input" v-model="store.game.hints[s.id].text" placeholder="Texte de l’indice (facultatif)">
                <button v-if="hintEdit[s.id]" type="button" class="link hr-edit-btn" @click="hintEdit[s.id] = false">Terminer</button>
              </div>
              <button v-else type="button" class="link hr-edit-btn" @click="hintEdit[s.id] = true">Modifier</button>
            </template>
          </div>
          <span v-if="store.game.hints[s.id]?.t" class="hr-type" :class="'ht-' + store.game.hints[s.id].t">{{HINT_TYPES[store.game.hints[s.id].t]}}</span>
        </div>
      </article>
    </section>

    <section v-if="shown('map')" class="pane" :class="'pane-' + paneOf('map')">
      <div v-if="paneOf('map')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Carte</h1><p class="lede">Où se trouve chaque sortie, zone par zone, sur le terrain du jeu vu de dessus (nord en haut).</p></div>
      <div v-if="!MAPS_OK" class="warn-box"><span class="warn-box-ic" v-html="ICONS.warn"></span>
        <div><b>Cartes non générées.</b> Elles se fabriquent depuis votre propre cartouche : <code>node tools/soh-maps/extract_maps.mjs &lt;ROM décompressée .z64&gt;</code>
          (NTSC 1.0), qui écrit <code>data/maps-data.js</code>. Rechargez ensuite la page.</div></div>
      <template v-else>
        <div class="zmap-bar"><label class="field"><span class="lbl">Zone</span>
          <select class="sel" v-model="mapArea"><option v-for="a in mapAreas" :key="a.id" :value="a.id">{{a.name}}</option></select></label>
          <button v-if="ui.map.area" type="button" class="btn" @click="mapHere" title="Afficher la zone où vous êtes (position en direct, sinon départ du Routeur)">Ma position</button>
          <div class="field" title="Comme la page Checks : ses filtres (catégories, âge, checks faits masqués, seulement les faisables, recherche). Tous : tous les checks mélangés et non exclus, faits compris. Les checks non mélangés et exclus n’apparaissent jamais."><span class="lbl">Checks</span>
            <seg v-model="ui.map.checks" :options="[['filters','Comme la page Checks'],['all','Tous'],['off','Aucun']]"></seg></div>
          <div class="field"><span class="lbl">Pierres à potins</span><seg v-model="ui.map.stones" :options="[[true,'Affichées'],[false,'Masquées']]"></seg></div></div>
        <zone-map :area="mapArea" :focus="mapFocus" @start="mapStart" @goal="mapGoal" @go-check="goToCheck"></zone-map>
      </template>
    </section>

    <section v-if="shown('graph')" class="pane" :class="'pane-' + paneOf('graph')">
      <div v-if="paneOf('graph')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Connexions</h1><p class="lede">Les entrées connues (notées, ou d'origine), zone par zone. Survolez une zone pour voir ses liaisons, cliquez pour les lister.</p></div>
      <entrance-graph @go-zone="goToZone"></entrance-graph>
      <p class="note emap-legend"><span><i class="k-ow"></i>passage</span><span><i class="k-in"></i>intérieur</span><span><i class="k-gr"></i>grotte</span>
        <span><i class="k-dg"></i>donjon</span><span><i class="k-bs"></i>boss</span><span><i class="k-owl"></i>hibou</span><span><i class="k-wp"></i>apparition, chant</span>
        <span>flèche : un seul sens connu</span><span>point : intérieur ou grotte qui mène ailleurs</span></p>
    </section>

    <section v-if="shown('stats')" class="pane" :class="'pane-' + paneOf('stats')">
      <div v-if="paneOf('stats')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Statistiques</h1><p class="lede">Chronologie de la partie : objets, chants et checks, à l'heure où ils ont été notés (en direct avec l'auto-tracking).</p></div>
      <div class="rsum st-tiles">
        <div class="rstat"><div><b>{{statsC.elapsed != null ? fmtDur(statsC.elapsed) : '—'}}</b><span>{{store.game.runStart ? 'depuis le début de la partie' : 'depuis le premier objet noté'}}</span></div></div>
        <div class="rstat"><div><b>{{checkStats.got}} / {{checkStats.total}}</b><span>checks faits</span></div></div>
        <div class="rstat" v-if="stats.editable"><div><b>{{stats.mapped}} / {{stats.editable}}</b><span>sorties notées</span></div></div>
        <div class="rstat"><div><b>{{statsC.nItems}}</b><span>objets et chants obtenus</span></div></div>
        <div class="rstat" v-if="ui.link.loot"><div><b>{{store.game.loot.iceTraps}}</b><span>piège{{store.game.loot.iceTraps>1?'s':''}} de glace</span></div></div>
      </div>
      <div v-if="statsC.curve" class="st-chart">
        <div class="st-chart-title">Checks faits au fil du temps <small>(jusqu'à {{statsC.curve.max}})</small></div>
        <svg viewBox="0 0 600 150" preserveAspectRatio="none"><path class="st-area" :d="statsC.curve.area"></path><path class="st-line" :d="statsC.curve.d"></path></svg>
        <div class="st-axis"><span>0:00:00</span><span>{{statsC.curve.end}}</span></div>
      </div>
      <div class="st-filter"><seg v-model="stFilter" :options="[['items','Objets et chants'],['checks','Checks'],['all','Tout']]"></seg></div>
      <ul v-if="statsRows.length" class="st-list">
        <li v-for="r in statsRows" :key="r.i"><span class="st-at">{{r.at || 'avant le suivi'}}</span>
          <img v-if="r.icon" :src="r.icon" alt=""><span v-else class="st-noic"></span>
          <span class="st-lab">{{r.label}}<small v-if="r.found"> · {{r.found}}</small></span></li>
      </ul>
      <p v-else class="empty">Rien de noté pour l'instant.</p>
    </section>

    <section v-if="shown('config')" class="pane" :class="'pane-' + paneOf('config')">
      <div v-if="paneOf('config')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Configuration</h1><p class="lede">Réglages du randomizer de Ship of Harkinian 9.2.3 « Ackbar Delta ».</p>
        <div class="import-box">
          <label class="btn primary import-btn">Importer depuis un spoiler SoH
            <input type="file" accept=".json,application/json" @change="importSpoiler" hidden></label>
          <label class="check import-opt" title="Révèle ce que le seed a tiré au sort : quels donjons sont en Master Quest (liste « masterQuestDungeons »), lesquels ont un trousseau de clés et quelles épreuves de Ganon sont requises.">
            <input type="checkbox" v-model="ui.importQuests">Importer aussi les tirages du seed : donjons MQ, trousseaux et épreuves de Ganon (peut spoiler)</label>
            <label class="check import-opt" title="Spoiler caché : il ne sert qu'à révéler ce que le jeu a déjà montré (objet de chaque check ramassé, boutiques vues, entrées prises)"><input type="checkbox" v-model="ui.importLinkSpoiler">Le garder aussi pour l'auto-tracking (spoiler caché, ne révèle que ce que le jeu a montré)</label></div></div>
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
              <input type="checkbox" v-model="s.tricks[t.key]"><span>{{t.label}}</span>
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
            <div class="field" title="Coût estimé par région de la logique SoH traversée, quand les données n'ont pas de coût de marche (intérieur des donjons, certaines portes)"><label for="c5">Marche estimée (par région)</label><input id="c5" type="number" min="0" v-model.number="store.costs.walk"></div>
          </div>
        </section>
      </div>
    </section>
    </div>

    <!-- « Où aller maintenant ? » : prochaine étape du trajet en cours et checks faisables les plus proches du départ du Routeur -->
    <div v-if="ui.next.enabled" class="next-dock" :class="{open:ui.next.open}">
      <div class="nd-bar">
        <button type="button" class="nd-toggle" @click="ui.next.open = !ui.next.open" :aria-expanded="ui.next.open"
          :title="ui.next.open ? 'Replier' : 'Déplier : les 12 checks faisables les plus proches'"><span class="nd-ic" v-html="ICONS.compass"></span><b>Où aller ?</b></button>
        <span v-if="nextStep" class="nd-step" :class="{click:MAPS_OK}" :title="'Prochaine étape du trajet du Routeur' + (nextStep.goal ? ' (arrivée : ' + nextStep.goal + ')' : '') + (MAPS_OK ? ' — clic : voir la sortie à prendre sur la carte' : '')"
          @click="MAPS_OK && openMap(nextStep.take)">
          <img v-if="nextStep.icon" :src="nextStep.icon" alt=""><span v-else class="nd-step-ic" v-html="ICONS.uturn"></span>{{nextStep.mode}} → <b>{{nextStep.zone}}</b> · {{nextStep.exit}}</span>
        <span v-if="!nextC" class="nd-sum">Choisissez un départ dans le Routeur (ou activez la position en direct).</span>
        <span v-else-if="!nextC.list.length" class="nd-sum">Aucun check faisable à portée.</span>
        <template v-else>
          <span class="nd-sum" :title="nextC.list[0].c.soh">Check le plus proche : <b>{{nextC.list[0].c.label}}</b> · {{CHECK_AREA[nextC.list[0].c.area].label}} ({{stepsLabel(nextC.list[0].steps)}})</span>
          <button type="button" class="btn nd-go" title="Y aller (Routeur, depuis le départ actuel)" @click="goToCheck(nextC.list[0].c)">Y aller</button>
          <span class="nd-count">{{nextC.total}} faisable{{nextC.total > 1 ? 's' : ''}}</span>
        </template>
        <button type="button" class="nd-btn nd-chev" :title="ui.next.open ? 'Replier' : 'Déplier'" v-html="ICONS.caret" @click="ui.next.open = !ui.next.open"></button>
        <button type="button" class="nd-btn" title="Masquer ce bandeau (à réactiver dans la barre de gauche, page Routeur)" v-html="ICONS.close" @click="ui.next.enabled = false"></button>
      </div>
      <div v-if="ui.next.open && nextC && nextC.list.length" class="nd-list">
        <button v-for="x in nextC.list" :key="x.c.id" type="button" class="nd-card" :title="'Y aller (Routeur) — ' + x.c.soh" @click="goToCheck(x.c)">
          <img :src="CHECK_CAT[x.c.cat].icon" alt="">
          <span class="nd-txt"><b>{{x.c.label}}</b><small>{{CHECK_AREA[x.c.area].label}} · {{stepsLabel(x.steps)}}{{x.age === 'adult' ? ' · adulte' : ''}}</small></span>
        </button>
      </div>
    </div>
  </main>

  <aside class="side side-right" :class="{open:itemsOpen}">
    <button type="button" class="items-fold" :class="{folded:ui.itemsFolded}" @click="ui.itemsFolded=!ui.itemsFolded"
      :title="ui.itemsFolded ? 'Afficher le panneau Objets' : 'Replier le panneau Objets'" :aria-expanded="!ui.itemsFolded">
      <span v-html="ui.itemsFolded ? ICONS.bag : ICONS.chevron"></span><span v-if="ui.itemsFolded" class="if-label">Objets</span></button>
    <div class="side-right-head">
      <button @click="itemsOpen=false" aria-label="Fermer" v-html="ICONS.close"></button>
    </div>
    <div class="side-right-body">
${ITEMS_TPL}${LOOT_TPL}    </div>
  </aside>

  <div class="scrim" @click="navOpen=false; itemsOpen=false"></div>

  <!-- Auto-tracking : où mène l'entrée qu'on vient de prendre (destination ambiguë) -->
  <div v-for="q in linkAsks().slice(0, 1)" :key="q.d" class="ask-card" role="dialog" aria-live="polite">
    <div class="ask-head"><span v-html="ICONS.live"></span><b>Où êtes-vous arrivé ?</b>
      <span v-if="linkAsks().length > 1" class="ask-more" :title="(linkAsks().length - 1) + ' autre(s) question(s) en attente'">+{{linkAsks().length - 1}}</span></div>
    <p>Entrée prise : <b>{{askFrom(q)}}</b>. Le jeu ne permet pas de savoir où elle mène : choisissez votre arrivée pour la noter.</p>
    <div class="ask-opts"><button v-for="a in q.opts" :key="a" type="button" class="btn" @click="linkAnswer(q, a)">{{askLabel(a)}}</button></div>
    <button type="button" class="ask-skip" @click="linkAnswer(q, null)">Ignorer</button>
  </div>

  <!-- Infobulle -->
  <div v-if="tip.show && tipData" class="tip" :style="tip.style" role="tooltip">
    <h4>Depuis « {{tipData.title}} », à pied</h4>
    <ul><li v-for="(c,i) in tipData.items" :key="i" class="ok">
      <span>{{c.label}}</span><span class="cost">{{c.cost}}</span></li></ul>
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
            <button v-for="l in checklistModal.locations" :key="l.id" type="button" class="check-row" :class="{on:store.game.checklists[checklistModal.name][l.id]}" @click="setChecklist(checklistModal.name,l.id,true)" @contextmenu.prevent="setChecklist(checklistModal.name,l.id,false)">
              <span>{{l.label}}</span><span class="cr-mark" v-html="store.game.checklists[checklistModal.name][l.id]?ICONS.check:ICONS.circleO"></span>
            </button>
          </div>
        </div>
      </template>
      <template v-else-if="modal==='why' && why.check">
        <header><h3>Pourquoi pas encore ?</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body why-modal">
          <p class="why-check"><b>{{why.check.label}}</b> · {{CHECK_AREA[why.check.area].label}}</p>
          <p v-if="!why.res" class="why-wait">Calcul en cours…</p>
          <p v-else-if="why.res.never">Jamais faisable selon la logique avec la configuration actuelle (même avec tous les objets).</p>
          <p v-else-if="why.res.entrances">Même avec tous les objets, aucun chemin connu n’y mène : il passe par une entrée pas encore découverte (à noter dans Entrées).</p>
          <template v-else>
            <p>Il vous manque :</p>
            <ul class="why-items"><li v-for="(it,i) in why.res.items" :key="i"><img v-if="it.src" :src="it.src" alt=""><span v-else class="why-dot"></span>{{it.label}}</li></ul>
            <p class="why-note">Ensuite faisable {{ {child:'en enfant', adult:'en adulte', both:'en enfant et en adulte'}[why.res.age] }}. C’est un ensemble minimal d’objets parmi d’autres possibles (les entrées notées restent celles d’aujourd’hui).</p>
          </template>
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
      <template v-else-if="modal==='link'">
        <header><h3>Auto-tracking</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body link-modal">
          <p style="margin-top:0">Suit votre partie de Ship of Harkinian en direct, via un petit relais local qui se fait passer pour un
            serveur Anchor. Le relais est en lecture seule : il ne modifie jamais votre partie.</p>
          <ol class="link-steps">
            <li>Lancez le relais : <code>node tools/soh-link/relay.mjs</code> (dans le dossier de L'Œil Sheikah).</li>
            <li>Dans SoH, menu Réseau &gt; Anchor : Host <code>127.0.0.1</code>, port <code>43383</code>, Room ID au choix (pas « Global Room »), puis Enable.</li>
            <li>Activez l'auto-tracking ci-dessous.</li>
          </ol>
          <label class="check link-on"><input type="checkbox" v-model="ui.link.enabled">Activer l'auto-tracking</label>
          <div class="link-opts"><span>Suivre :</span>
            <label class="check"><input type="checkbox" v-model="ui.link.checks">les checks faits</label>
            <label class="check"><input type="checkbox" v-model="ui.link.items">les objets</label>
            <label class="check" title="Le départ du Routeur suit l'endroit où vous apparaissez dans le jeu"><input type="checkbox" v-model="ui.link.position">la position (départ du Routeur)</label>
            <label class="check" title="Destination de chaque entrée prise, notée dans Entrées"><input type="checkbox" v-model="ui.link.entrances">les entrées</label>
            <label class="check" title="Pièges de glace, rubis et munitions reçus, affichés en bas du panneau Objets"><input type="checkbox" v-model="ui.link.loot">les trouvailles (pour le fun)</label></div>
          <label class="link-url">Adresse du relais <input class="sel" v-model.lazy="ui.link.url" spellcheck="false"></label>
          <div class="link-status" :class="link.status"><i></i><b>{{LINK_LABEL[link.status]}}</b>
            <span v-if="link.status==='game' && link.client">— {{link.client.name || 'joueur sans nom'}}, sauvegarde {{link.client.isSaveLoaded ? 'chargée' : 'non chargée'}}</span>
            <button v-if="link.status==='game'" type="button" class="btn" @click="linkRequestState">Relire la sauvegarde</button></div>
          <div v-if="link.status==='game' && link.foreign" class="msg ko link-foreign">Le jeu a chargé une autre sauvegarde que celle
            de la partie notée : ses checks, objets et entrées sont ignorés. Pour une nouvelle partie, remettez d'abord la partie
            à zéro ; sinon <button type="button" class="btn" @click="linkAdoptSave">Suivre cette sauvegarde</button></div>
          <div v-if="link.status==='game' && link.position" class="link-pos">Position : <b>{{areaName(link.position.key)}}</b> · {{EXIT[link.position.key].label}}
            <span v-if="link.position.age">({{ageLabel(link.position.age)}})</span></div>
          <div class="link-spoiler">
            <b>Spoiler caché</b> <span class="muted">(facultatif)</span>
            <p>Avec le fichier spoiler de cette seed, l'appli connaît aussi ce que vous avez trouvé avant de lancer le relais,
              et les objets et prix des boutiques. Elle ne montre jamais que ce que le jeu vous a déjà montré.</p>
            <div class="link-spoiler-row">
              <template v-if="link.spoiler">
                <span>{{link.spoiler.file}} ({{link.spoiler.count}} checks)</span>
                <span v-if="link.status==='game' && link.client && link.client.seed && link.spoiler.seed && link.client.seed !== link.spoiler.seed" class="ko">
                  — ne correspond pas à la partie connectée (ignoré)</span>
                <span v-else-if="link.status==='game' && linkSpoilerOk()" class="ok">— correspond à la partie connectée</span>
                <button type="button" class="btn" @click="linkClearSpoiler">Oublier</button>
              </template>
              <label class="btn import-btn">{{link.spoiler ? 'Remplacer…' : 'Charger le spoiler…'}}
                <input type="file" accept=".json,application/json" @change="loadSpoilerFile" hidden></label>
            </div>
          </div>
          <div class="link-log">
            <div v-for="(l, i) in link.log" :key="i"><span>{{l.t}}</span>{{l.text}}</div>
            <div v-if="!link.log.length" class="muted">Aucun événement pour l'instant.</div>
          </div>
        </div>
      </template>
      <template v-else-if="modal==='spoiler'">
        <header><h3>Importer un spoiler log ?</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body spoiler-prompt">
          <template v-if="!importReport || !importReport.ok">
            <p style="margin-top:0">Importez le spoiler log (.json) généré par Ship of Harkinian pour régler la Configuration automatiquement.
              Seuls les réglages et les astuces sont lus, jamais l'emplacement des objets.</p>
            <label class="check import-opt"><input type="checkbox" v-model="ui.importQuests">Importer aussi les tirages du seed : donjons MQ, trousseaux et épreuves de Ganon (peut spoiler)</label>
            <label class="check import-opt" title="Spoiler caché : il ne sert qu'à révéler ce que le jeu a déjà montré (objet de chaque check ramassé, boutiques vues, entrées prises)"><input type="checkbox" v-model="ui.importLinkSpoiler">Le garder aussi pour l'auto-tracking (spoiler caché, ne révèle que ce que le jeu a montré)</label>
            <div v-if="importReport" class="msg ko">{{importReport.title}}</div>
            <div class="mactions"><button class="btn" @click="declineSpoiler">Non, merci</button>
              <label class="btn primary import-btn">Importer un spoiler…
                <input type="file" accept=".json,application/json" @change="importSpoiler" hidden></label></div>
          </template>
          <template v-else>
            <div class="msg ok"><b>{{importReport.title}}</b></div>
            <ul v-if="importReport.notes.length" class="spoiler-notes"><li v-for="(n,i) in importReport.notes" :key="i">{{n}}</li></ul>
            <div class="mactions"><button class="btn primary" @click="modal=null">Fermer</button></div>
          </template>
        </div>
      </template>
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

const app = createApp(App);
app.mount('#app');
document.addEventListener('click', ev => { /* ferme l'infobulle en tactile */ if (!ev.target.closest('.globe')) { const t = document.querySelector('.tip'); if (t) window.dispatchEvent(new Event('scroll')); } });
window.__PF = { store, effC, linksC, reachC, agesC, routeC, shortest, candidatesFor, setMapping, EXIT, sohC, sohFullC, computeSoh, entranceLinks, L, SOH };
