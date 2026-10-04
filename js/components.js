/* ---------- Composants ---------- */
// src : image propre à la sortie (ex. chant de téléportation), à la place de celle du type
const TypeIcon = {
  props:['type', 'src'],
  computed:{ custom(){ return this.src || CUSTOM_ICONS[this.type]; }, svg(){ return ICONS[this.type] || ICONS.overworld; }, title(){ return TYPE_LABEL[this.type]; } },
  template:`<span class="ticon" :class="'t-'+type" :title="title"><img v-if="custom" :src="custom" alt=""><span v-else v-html="svg" style="display:contents"></span></span>`,
};

const Seg = {
  props:['modelValue','options'], emits:['update:modelValue'],
  template:`<div class="seg" role="radiogroup"><button v-for="o in options" :key="String(o[0])" type="button" role="radio" :aria-checked="modelValue===o[0]"
    :class="{on: modelValue===o[0]}" @click="$emit('update:modelValue', o[0])">{{o[1]}}</button></div>`,
};

// Tuile d'objet réutilisable (panneau Objets) : clic gauche/droit pour augmenter/diminuer/activer.
// Icône seule (pas de libellé visible), le nom reste accessible via le `title` au survol.
// Grand cadre de progression (pages Checks et Entrées) : anneau de pourcentage, « faits / total », ligne de détail
// et répartition par groupe. stats = { got, total, sub, groups:[[libellé, faits, total]] }, unit = « checks », « sorties »…
const ProgressCard = {
  props:{ stats:{ type:Object, required:true }, unit:{ type:String, default:'' }, title:{ type:String, default:'' },
    active:{ type:Boolean, default:false } },
  emits:['open'],
  computed:{ pct(){ return this.stats.total ? Math.floor(100 * this.stats.got / this.stats.total) : 0; } },
  // Cliquable (titre de page) : ouvre la page correspondante.
  template:`<button type="button" class="progress-card" :class="{done:stats.total && stats.got===stats.total, active}"
    :title="title ? 'Ouvrir la page ' + title : null" @click="$emit('open')">
    <svg class="pc-ring" viewBox="0 0 44 44" aria-hidden="true"><circle class="pc-track" cx="22" cy="22" r="18"/>
      <circle v-if="stats.got" class="pc-fill" cx="22" cy="22" r="18" :stroke-dasharray="(113.1*stats.got/(stats.total||1)) + ' 113.1'"/></svg>
    <div class="pc-pct">{{pct}}<small>%</small></div>
    <div class="pc-main">
      <div v-if="title" class="pc-title">{{title}}</div>
      <div class="pc-count"><b>{{stats.got}}</b> / {{stats.total}} <span>{{unit}}</span></div>
      <div class="pc-sub">{{stats.sub}}</div>
      <div class="pc-groups"><span v-for="g in stats.groups" :key="g[0]">{{g[0]}} <b>{{g[1]}}/{{g[2]}}</b></span></div>
    </div>
  </button>`,
};

const ItemTile = {
  props:{ k:{ type:String, required:true }, badge:{ type:String, default:null } },
  data:() => ({ brokenIcons, ICONS }),
  computed:{
    item(){ return ITEM_BY_KEY[this.k]; },
    value(){ return store.game[this.item.path][this.k]; },
    src(){ return iconSrc(this.item.path, this.item); },
  },
  methods:{
    onClick(ev){ clickItem(ev, this.item.path, this.item); },
    onRight(ev){ rightClickItem(ev, this.item.path, this.item); },
    itemActive, itemTitle, itemMaxed,
  },
  template:`<button type="button" class="icon-tile" :class="{off:!itemActive(item,value)}" :disabled="item.locked"
    :aria-label="item.label" :title="itemTitle(item.path,item)" @click="onClick" @contextmenu.prevent="onRight">
    <img v-if="!brokenIcons[src]" :src="src" :alt="item.label" @error="brokenIcons[src]=true">
    <span v-else class="icon-fallback" v-html="ICONS.bag"></span>
    <span v-if="badge" class="icon-badge" :class="{maxed:itemMaxed(item.path,item)}">{{badge}}</span>
    <span v-else-if="item.kind==='count'" class="icon-badge" :class="{maxed:itemMaxed(item.path,item)}">{{value}}</span>
    <span v-else-if="item.sizes && item.sizes[value]" class="icon-badge" :class="{maxed:itemMaxed(item.path,item)}">{{item.sizes[value]}}</span>
  </button>`,
};

const DestPicker = {
  props:['source'], emits:['choose'],
  data:() => ({ open:false, q:'', hl:0, pos:{}, ICONS }),
  computed:{
    all(){
      if (!this.open) return { groups:[], flat:[] };
      const reach = reachC.value, show = store.ui.filters.showReachableTargets, nq = norm(this.q.trim());
      const used = new Set(Object.entries(store.mappings).filter(([k]) => k !== this.source).map(([, v]) => v));
      const byArea = new Map();
      for (const e of candidatesFor(this.source)){
        const r = reach.has(e.key) || used.has(e.key);
        if (r && !show) continue;
        const an = AREA[e.areaId].name;
        if (nq && !norm(e.label + ' ' + e.soh + ' ' + an).includes(nq)) continue;
        if (!byArea.has(e.areaId)) byArea.set(e.areaId, { id:e.areaId, name:an, options:[] });
        byArea.get(e.areaId).options.push({ key:e.key, label:e.label, soh:e.soh, reach:r });
      }
      const groups = [...byArea.values()], flat = [];
      groups.forEach(g => g.options.forEach(o => { o.idx = flat.length; flat.push(o); }));
      return { groups, flat };
    },
  },
  methods:{
    toggle(){ this.open ? this.close() : this.openIt(); },
    openIt(){
      this.q = ''; this.hl = 0; this.place(); this.open = true;
      nextTick(() => this.$refs.input?.focus());
      document.addEventListener('mousedown', this.outside, true);
      window.addEventListener('scroll', this.onScroll, true);
      window.addEventListener('resize', this.close);
    },
    close(){
      this.open = false;
      document.removeEventListener('mousedown', this.outside, true);
      window.removeEventListener('scroll', this.onScroll, true);
      window.removeEventListener('resize', this.close);
    },
    place(){
      const r = this.$refs.trigger.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
      const w = Math.min(Math.max(r.width, 340), vw - 16), left = Math.max(8, Math.min(r.left, vw - w - 8));
      const below = vh - r.bottom - 12, above = r.top - 12;
      if (below >= 280 || below >= above) this.pos = { left:left+'px', width:w+'px', top:(r.bottom+4)+'px', maxHeight:Math.max(200, below)+'px' };
      else this.pos = { left:left+'px', width:w+'px', bottom:(vh - r.top + 4)+'px', maxHeight:Math.max(200, Math.min(above, 460))+'px' };
      if (!this.pos.maxHeight || parseFloat(this.pos.maxHeight) > 460) this.pos.maxHeight = '460px';
    },
    outside(ev){ if (!this.$el.contains(ev.target) && !this.$refs.pop?.contains(ev.target)) this.close(); },
    onScroll(ev){ if (this.$refs.pop && this.$refs.pop.contains(ev.target)) return; this.close(); },
    choose(k){ this.close(); this.$emit('choose', k); },
    key(ev){
      const n = this.all.flat.length;
      if (ev.key === 'ArrowDown'){ ev.preventDefault(); this.hl = Math.min(n - 1, this.hl + 1); this.scrollHl(); }
      else if (ev.key === 'ArrowUp'){ ev.preventDefault(); this.hl = Math.max(0, this.hl - 1); this.scrollHl(); }
      else if (ev.key === 'Enter'){ ev.preventDefault(); const o = this.all.flat[this.hl]; if (o) this.choose(o.key); }
      else if (ev.key === 'Escape'){ this.close(); this.$refs.trigger.focus(); }
    },
    scrollHl(){ nextTick(() => this.$refs.list?.querySelector('.hl')?.scrollIntoView({ block:'nearest' })); },
  },
  watch:{ q(){ this.hl = 0; } },
  beforeUnmount(){ this.close(); },
  template:`<div class="picker">
    <button ref="trigger" type="button" class="picker-trigger" :aria-expanded="open" aria-haspopup="listbox" @click="toggle">
      <span>Non découvert</span><span v-html="ICONS.caret"></span></button>
    <div v-if="open" ref="pop" class="pop" :style="pos" @keydown="key">
      <input ref="input" v-model="q" placeholder="Filtrer…" aria-label="Filtrer les destinations">
      <div ref="list" class="pop-list" role="listbox">
        <template v-for="g in all.groups" :key="g.id">
          <div class="pg-title">{{g.name}}</div>
          <button v-for="o in g.options" :key="o.key" type="button" role="option" class="pg-opt" :class="{hl:o.idx===hl, reach:o.reach}"
            @mousedown.prevent="choose(o.key)" @mousemove="hl=o.idx" :title="o.soh"><span>{{o.label}}</span><small v-if="o.reach">Atteignable</small></button>
        </template>
        <div v-if="!all.flat.length" class="pg-empty">{{ q ? 'Aucune destination ne correspond au filtre.' : 'Aucune destination libre dans ce pool.' }}</div>
      </div>
    </div></div>`,
};

/* ---------- Connexions : graphe des entrées ----------
   Schéma des zones placées comme sur la carte d'Hyrule (donjons à côté de leur zone) ; une liaison par paire de nœuds
   pour les entrées connues (notées, ou d'origine si non mélangées : effC), épaisseur selon le nombre de sorties, flèche
   si on ne connaît qu'un sens. Intérieurs et grottes : petits points autour de leur zone, seulement s'ils mènent
   ailleurs que dans leur zone (orientés vers leur liaison). Apparitions et chants : nœud à part. Position (auto-tracking,
   sinon départ du Routeur) mise en évidence ; survol = liaisons du nœud ; clic = liste de ses connexions. */
const GRAPH_POS = {
  desert_colossus:[70, 110], spirit_temple:[60, 35], wasteland:[120, 215], gerudo_fortress:[200, 315],
  gerudo_training_ground:[110, 390], gerudo_valley:[310, 405], lake_hylia:[420, 625], water_temple:[320, 675],
  hyrule_field:[520, 395], lon_lon_ranch:[520, 510], market:[520, 255], hyrule_castle:[520, 150], ganons_castle:[420, 75],
  kakariko_village:[690, 265], bottom_of_the_well:[630, 335], graveyard:[800, 225], shadow_temple:[890, 185],
  death_mountain_trail:[700, 150], dodongos_cavern:[610, 70], goron_city:[790, 105], death_mountain_crater:[880, 55],
  fire_temple:[965, 110], zoras_river:[760, 395], zoras_domain:[870, 395], zoras_fountain:[960, 395],
  jabu_jabus_belly:[960, 490], ice_cavern:[885, 300], lost_woods:[720, 525], sacred_forest_meadow:[620, 605],
  forest_temple:[540, 685], kokiri_forest:[830, 615], deku_tree:[935, 665], spawns:[75, 640],
};
const GRAPH_DUNGEONS = new Set(['deku_tree', 'dodongos_cavern', 'jabu_jabus_belly', 'forest_temple', 'fire_temple', 'water_temple',
  'spirit_temple', 'shadow_temple', 'bottom_of_the_well', 'ice_cavern', 'gerudo_training_ground', 'ganons_castle']);
const GRAPH_KIND = { overworld:'ow', interior:'in', grotto:'gr', dungeon:'dg', boss:'bs', owl:'owl', warp:'wp' };
// Sortie située à l'intérieur d'un lieu (maison, grotte, repaire) : celle de la paire dont le nom SoH n'est pas l'entrée.
const graphInside = e => (e.type === 'interior' || e.type === 'grotto')
  && (e.soh.startsWith('TH ') || !/Entry|^GF (?!.*Grotto)|Behind Pillar|Boulder Crawlspace/.test(e.soh));
const graphExitName = k => k && EXIT[k] ? (EXIT[k].areaId === SPAWN_AREA ? '' : AREA[EXIT[k].areaId].name + ' · ') + EXIT[k].label : '?';
const EntranceGraph = {
  emits:['go-zone'],
  data:() => ({ hover:null, sel:null }),
  computed:{
    graph(){
      const eff = effC.value, nodeOf = k => graphInside(EXIT[k]) ? 'p:' + k : 'z:' + EXIT[k].areaId;
      const links = new Map();
      for (const e of ALL_EXITS){
        const t = eff[e.key];
        if (!t || !EXIT[t] || e.destOnly) continue;
        const a = nodeOf(e.key), b = nodeOf(t);
        if (a === b || !GRAPH_POS[(a.startsWith('z:') ? a : 'z:' + EXIT[a.slice(2)].areaId).slice(2)]) continue;
        const [lo, hi] = a < b ? [a, b] : [b, a], id = lo + '|' + hi;
        const l = links.get(id) || { id, a:lo, b:hi, ab:false, ba:false, exits:[], kind:GRAPH_KIND[e.type] || 'ow' };
        if (a === lo) l.ab = true; else l.ba = true;
        l.exits.push([e.key, t]);
        links.set(id, l);
      }
      // lieu dont les seules liaisons mènent à sa propre zone (d'origine) : pas affiché
      const zoneOf = n => n.startsWith('z:') ? n : 'z:' + EXIT[n.slice(2)].areaId;
      const all = [...links.values()];
      const plain = n => n.startsWith('p:') && all.filter(m => m.a === n || m.b === n).every(m => (m.a === n ? m.b : m.a) === zoneOf(n));
      const shown = all.filter(l => !plain(l.a) && !plain(l.b));
      // positions : zones fixes ; lieux sur un cercle autour de leur zone, vers leur liaison, écartés entre eux
      const pos = {};
      for (const [id, p] of Object.entries(GRAPH_POS)) pos['z:' + id] = p;
      const places = {};
      for (const l of shown) for (const [n, o] of [[l.a, l.b], [l.b, l.a]]) if (n.startsWith('p:') && !(n in places)){
        const c = pos[zoneOf(n)], oc = pos[zoneOf(o)] || c;
        places[n] = { z:zoneOf(n), ang:Math.atan2(oc[1] - c[1], oc[0] - c[0]) || 0 };
      }
      const byZone = {};
      for (const [n, p] of Object.entries(places)) (byZone[p.z] = byZone[p.z] || []).push([n, p]);
      for (const [z, list] of Object.entries(byZone)){
        list.sort((x, y) => x[1].ang - y[1].ang);
        const gap = Math.min(0.42, 2 * Math.PI / list.length);
        for (let i = 1; i < list.length; i++) if (list[i][1].ang - list[i - 1][1].ang < gap) list[i][1].ang = list[i - 1][1].ang + gap;
        const c = pos[z], r = GRAPH_DUNGEONS.has(z.slice(2)) ? 26 : 34;
        for (const [n, p] of list) pos[n] = [c[0] + r * Math.cos(p.ang), c[1] + r * Math.sin(p.ang)];
      }
      const zones = Object.keys(GRAPH_POS).filter(id => AREA[id]).map(id => ({ n:'z:' + id, id, name:id === SPAWN_AREA ? 'Apparitions et chants' : AREA[id].name,
        dungeon:GRAPH_DUNGEONS.has(id), spawns:id === SPAWN_AREA, x:pos['z:' + id][0], y:pos['z:' + id][1] }));
      const dots = Object.keys(places).map(n => ({ n, x:pos[n][0], y:pos[n][1], label:EXIT[n.slice(2)].label }));
      const rad = n => n.startsWith('p:') ? 5 : GRAPH_DUNGEONS.has(n.slice(2)) ? 15 : 21;
      const lines = shown.map(l => {
        const [x1, y1] = pos[l.a], [x2, y2] = pos[l.b], d = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / d, uy = (y2 - y1) / d;
        const sx = x1 + ux * rad(l.a), sy = y1 + uy * rad(l.a), ex = x2 - ux * rad(l.b), ey = y2 - uy * rad(l.b);
        // flèche si un seul sens est connu, à l'arrivée
        const ar = l.ab && !l.ba ? [ex, ey, ux, uy] : l.ba && !l.ab ? [sx, sy, -ux, -uy] : null;
        const tri = ar ? [[ar[0], ar[1]], [ar[0] - ar[2] * 9 - ar[3] * 4.5, ar[1] - ar[3] * 9 + ar[2] * 4.5],
          [ar[0] - ar[2] * 9 + ar[3] * 4.5, ar[1] - ar[3] * 9 - ar[2] * 4.5]].map(p => p.join(',')).join(' ') : null;
        return { ...l, x1:sx, y1:sy, x2:ex, y2:ey, tri, w:Math.min(5, 1.4 + 0.7 * (l.exits.length - 1)),
          title:l.exits.map(([s, t]) => graphExitName(s) + ' → ' + graphExitName(t)).join('\n') };
      });
      return { zones, dots, lines };
    },
    here(){
      const k = link.position?.key || store.ui.router.fromExit;
      if (!k || !EXIT[k]) return null;
      return this.graph.dots.some(d => d.n === 'p:' + k) ? 'p:' + k : 'z:' + EXIT[k].areaId;
    },
    focus(){ return this.hover || this.sel; },
    selInfo(){
      if (!this.sel) return null;
      const n = this.sel.slice(2), zone = this.sel.startsWith('z:') ? n : EXIT[n].areaId;
      const rows = this.graph.lines.filter(l => l.a === this.sel || l.b === this.sel).flatMap(l => l.exits)
        .map(([s, t]) => ({ s, t })).sort((x, y) => graphExitName(x.s).localeCompare(graphExitName(y.s)));
      const title = this.sel.startsWith('z:') ? (n === SPAWN_AREA ? 'Apparitions et chants' : AREA[n].name) : graphExitName(n);
      return { title, zone, rows };
    },
  },
  methods:{
    on(l){ return !this.focus || l.a === this.focus || l.b === this.focus; },
    near(n){ return !this.focus || n === this.focus || this.graph.lines.some(l => (l.a === this.focus && l.b === n) || (l.b === this.focus && l.a === n)); },
    pick(n){ this.sel = this.sel === n ? null : n; },
    graphExitName,
  },
  template:`<div class="emap">
    <svg viewBox="-40 -10 1090 745" class="emap-svg" role="img" aria-label="Connexions : entrées connues" @click.self="sel=null">
      <g v-for="l in graph.lines" :key="l.id" :class="['el', 'k-' + l.kind, {dim:!on(l), hot:focus && on(l)}]">
        <line :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" :stroke-width="l.w"><title>{{l.title}}</title></line>
        <polygon v-if="l.tri" :points="l.tri"></polygon>
      </g>
      <g v-for="z in graph.zones" :key="z.n" class="ez" :class="{dg:z.dungeon, sp:z.spawns, here:here===z.n, dim:!near(z.n), sel:sel===z.n}"
        @mouseenter="hover=z.n" @mouseleave="hover=null" @click="pick(z.n)">
        <circle v-if="here===z.n" class="ez-pulse" :cx="z.x" :cy="z.y" :r="z.dungeon ? 21 : 28"></circle>
        <circle :cx="z.x" :cy="z.y" :r="z.dungeon ? 15 : 21"></circle>
        <text :x="z.x" :y="z.y + (z.dungeon ? 29 : 36)">{{z.name}}</text>
        <title>{{z.name}}</title>
      </g>
      <g v-for="d in graph.dots" :key="d.n" class="ed" :class="{here:here===d.n, dim:!near(d.n), sel:sel===d.n}"
        @mouseenter="hover=d.n" @mouseleave="hover=null" @click="pick(d.n)">
        <circle v-if="here===d.n" class="ez-pulse" :cx="d.x" :cy="d.y" r="10"></circle>
        <circle :cx="d.x" :cy="d.y" r="5"></circle><title>{{d.label}}</title>
      </g>
    </svg>
    <div v-if="selInfo" class="emap-info">
      <div class="emap-info-head"><b>{{selInfo.title}}</b>
        <button v-if="selInfo.zone !== 'spawns'" type="button" class="btn" @click="$emit('go-zone', selInfo.zone)">Y aller</button>
        <button type="button" class="emap-close" @click="sel=null" aria-label="Fermer">×</button></div>
      <ul><li v-for="(r,i) in selInfo.rows" :key="i"><span>{{graphExitName(r.s)}}</span><span class="emap-arrow">→</span><span>{{graphExitName(r.t)}}</span></li></ul>
      <p v-if="!selInfo.rows.length" class="emap-empty">Aucune connexion connue.</p>
    </div>
  </div>`,
};

/* ---------- Carte d'une zone ----------
   Sol vu de dessus (collision du jeu : data/maps-data.js, généré depuis la ROM de l'utilisateur par
   tools/soh-maps/extract_maps.mjs, non versionné) et une repère par sortie (point d'apparition de l'entrée qui y fait
   arriver ; intérieur : à sa porte ; grotte : point de retour ; hibou : position du hibou). Les sorties au même endroit
   (une porte et l'intérieur derrière) partagent un repère. Mis en évidence : position (auto-tracking, sinon départ du
   Routeur), arrivée du Routeur, prochaine sortie à prendre. Clic sur un repère : en faire le départ ou l'arrivée.
   Donjons : scène du donjon (version Master Quest « …_MQ » selon la version du donjon, si la ROM MQ a été fournie ; les
   deux si elle est inconnue) et salle du boss ; étages du jeu (levels : on est à l'étage i au-dessus de sa hauteur min),
   un à la fois, avec le nombre de checks à faire par étage ; repères placés selon leur hauteur. */
const MAPS = window.MAPS_DATA || null;
const MAP_BANDS = 10;   // tranches de hauteur (une teinte et un tracé chacune)
// scènes de chaque zone, de la plus fournie en sorties à la moins fournie
const MAP_SCENES = {};
if (MAPS) for (const [key, p] of Object.entries(MAPS.exits)){
  const a = EXIT[key]?.areaId;
  if (!a) continue;
  const m = MAP_SCENES[a] = MAP_SCENES[a] || {};
  m[p[0]] = (m[p[0]] || 0) + 1;
}
// (donjon d'abord, salle du boss ensuite)
for (const a of Object.keys(MAP_SCENES)) MAP_SCENES[a] = Object.entries(MAP_SCENES[a])
  .sort((x, y) => (MAPS.scenes[x[0]]?.kind === 'boss') - (MAPS.scenes[y[0]]?.kind === 'boss') || y[1] - x[1]).map(x => x[0]);
const MAP_SCENE_LABEL = { MARKET_ENTRANCE_DAY:'Entrée du bourg', MARKET_DAY:'Place du marché', TEMPLE_OF_TIME_EXTERIOR_DAY:'Parvis du temple',
  BACK_ALLEY_DAY:'Ruelle', HYRULE_CASTLE:'Château (enfant)', OUTSIDE_GANONS_CASTLE:'Château de Ganon (adulte)',
  INSIDE_GANONS_CASTLE:'Château', GANONS_TOWER:'Tour', TEMPLE_OF_TIME:'Temple du Temps' };
const mapSceneLabel = (name, both) => {
  const s = MAPS.scenes[name], base = name.replace(/_MQ$/, '');
  const label = MAP_SCENE_LABEL[base] || (s?.kind === 'boss' ? 'Salle du boss' : s?.kind === 'dungeon' ? 'Donjon' : name);
  return both && s?.kind === 'dungeon' ? label + (s.mq ? ' (Master Quest)' : ' (vanilla)') : label;
};
// étage d'une hauteur (index dans levels ; null : scène sans étages ou hauteur inconnue)
const mapLevelOf = (levels, y) => { if (!levels || y == null) return null; const i = levels.findIndex(l => y > l.min); return i < 0 ? levels.length - 1 : i; };
// Flèches de changement de zone dont le point d'apparition trompe : cap à la main (degrés, 0 = nord, 90 = est…)
const EXIT_ARROW = { 'market::market_to_templeplaza':90, 'hyrule_castle::castle_to_market':180, 'goron_city::gc_to_lw':157.5 };
const mapSceneCache = {};
function mapScene(name, li){
  const key = name + '|' + li;
  if (mapSceneCache[key]) return mapSceneCache[key];
  const s = MAPS.scenes[name], f0 = s.floors, paths = Array.from({ length:MAP_BANDS }, () => []);
  // étage : sol dont la hauteur est dans sa tranche, murs qui la traversent
  const lv = s.levels && li != null ? s.levels[li] : null, top = lv && li > 0 ? s.levels[li - 1].min : Infinity;
  const inLevel = y => !lv || y > lv.min && y <= top;
  let f = f0, ghost = '';
  // étage : son sol ; celui des autres étages en fond atténué (contours des salles, fosses)
  if (lv){
    f = [];
    for (let i = 0; i < f0.length; i += 7){
      if (inLevel(f0[i + 6])) f.push(...f0.slice(i, i + 7));
      else ghost += `M${f0[i]} ${f0[i + 1]}L${f0[i + 2]} ${f0[i + 3]}L${f0[i + 4]} ${f0[i + 5]}Z`;
    }
  }
  // tranches de hauteur par quantiles (autant de sol dans chacune) : contraste là où il y a du terrain
  const hs = []; for (let i = 6; i < f.length; i += 7) hs.push(f[i]);
  hs.sort((a, c) => a - c);
  const cuts = Array.from({ length:MAP_BANDS - 1 }, (_, k) => hs[Math.floor((k + 1) * hs.length / MAP_BANDS)]);
  let x0 = Infinity, z0 = Infinity, x1 = -Infinity, z1 = -Infinity;
  for (let i = 0; i < f.length; i += 7){
    let b = 0; while (b < cuts.length && f[i + 6] > cuts[b]) b++;
    if (lv) b = 3 + Math.floor(b * 7 / MAP_BANDS);   // étage : teintes claires, pour se détacher du fond des autres étages
    paths[b].push(`M${f[i]} ${f[i + 1]}L${f[i + 2]} ${f[i + 3]}L${f[i + 4]} ${f[i + 5]}Z`);
    for (let k = 0; k < 6; k += 2){ x0 = Math.min(x0, f[i + k]); x1 = Math.max(x1, f[i + k]); z0 = Math.min(z0, f[i + k + 1]); z1 = Math.max(z1, f[i + k + 1]); }
  }
  let walls = '';
  for (let i = 0, j = 0; i < s.walls.length; i += 4, j += 2){
    if (lv && !(s.wallsY[j + 1] > lv.min && s.wallsY[j] <= top)) continue;
    walls += `M${s.walls[i]} ${s.walls[i + 1]}L${s.walls[i + 2]} ${s.walls[i + 3]}`;
  }
  if (!lv || !isFinite(x0)) [x0, z0, x1, z1] = s.bounds;
  const pad = Math.max(x1 - x0, z1 - z0) * 0.03;
  return (mapSceneCache[key] = { bands:paths.map(p => p.join('')), walls, ghost, view:[x0 - pad, z0 - pad, x1 - x0 + 2 * pad, z1 - z0 + 2 * pad],
    unit:Math.max(x1 - x0, z1 - z0) / 110 });
}
const ZoneMap = {
  props:['area', 'focus', 'compact'],   // focus : sortie à mettre en évidence (« Voir sur la carte ») ; compact : carte seule (stream)
  emits:['start', 'goal', 'go-check'],
  data:() => ({ scene:null, level:null, sel:null, hover:null, view:null, drag:null, maxH:null, csel:null, showOff:false,
    edit:false, pick:{} }),   // edit : mode « Placer les checks » ; pick : checks cochés, à placer au prochain clic
  computed:{
    // version du donjon (MQ, Vanilla, '' : inconnue) ; scènes : version Master Quest selon elle (les deux si inconnue)
    quest(){ const a = CHECK_AREA[String(this.area).toUpperCase()]; return a && a.dungeon ? areaQuest(a.id) : null; },
    scenes(){
      const out = [];
      for (const n of MAP_SCENES[this.area] || []){
        const mq = MAPS.scenes[n + '_MQ'] ? n + '_MQ' : null;
        if (this.quest === 'MQ' && mq) out.push(mq);
        else { out.push(n); if ((this.quest === '' || this.edit) && mq) out.push(mq); }   // (mode édition : les deux versions)
      }
      return out;
    },
    bothVersions(){ return this.scenes.some(n => MAPS.scenes[n]?.mq) && this.scenes.some(n => MAPS.scenes[n]?.kind === 'dungeon' && !MAPS.scenes[n].mq); },
    // donjon Master Quest sans carte Master Quest (ROM MQ non fournie) : carte vanilla, prévenir
    mqMissing(){ return this.quest === 'MQ' && MAPS.scenes[this.cur]?.kind === 'dungeon' && !MAPS.scenes[this.cur].mq; },
    cur(){ return this.scenes.includes(this.scene) ? this.scene : this.liveScene || this.scenes[0]; },
    /* Position en temps réel (link.live) : scène de Link parmi celles de la zone (version Master Quest comprise), repère
       orienté dans la direction où il regarde ; la carte suit sa scène et son étage tant qu'on n'en choisit pas d'autre. */
    liveOn(){ return !!(store.ui.link.live && link.live); },
    liveScene(){ return this.liveOn ? this.scenes.find(s => s.replace(/_MQ$/, '') === link.live.scene) || null : null; },
    liveMark(){
      if (!this.liveOn || this.liveScene !== this.cur || !this.onLevel(link.live.y)) return null;
      return { x:link.live.x, z:link.live.z, deg:-link.live.rot * 360 / 65536 };
    },
    isMq(){ return !!MAPS.scenes[this.cur]?.mq; },
    exitsHere(){ return this.isMq ? MAPS.exitsMq || {} : MAPS.exits; },
    levels(){ return MAPS.scenes[this.cur]?.levels || null; },
    // étage affiché : choisi, sinon celui où l'on est (position dans cette scène), sinon celui de l'entrée
    lvl(){
      if (!this.levels) return null;
      if (this.level != null && this.level < this.levels.length) return this.level;
      if (this.liveOn && this.liveScene === this.cur) return mapLevelOf(this.levels, link.live.y);
      const at = [this.here, ...Object.keys(this.exitsHere)].map(k => k && this.exitsHere[k]).find(p => p && p[0] === this.cur && p[3] != null);
      return at ? mapLevelOf(this.levels, at[3]) : this.levels.length - 1;
    },
    geo(){ return this.cur ? mapScene(this.cur, this.lvl) : null; },
    // checks à faire par étage (pastilles du sélecteur d'étage)
    levelTodo(){
      if (!this.levels) return [];
      const n = this.levels.map(() => 0);
      for (const x of this.checkList){ const p = this.checkAt(x.c.id); if (p && !x.done){ const i = mapLevelOf(this.levels, p[3]); if (i != null) n[i]++; } }
      return n;
    },
    hereLevel(){
      if (this.liveOn && this.liveScene === this.cur) return mapLevelOf(this.levels, link.live.y);
      const p = this.here && this.exitsHere[this.here]; return p && p[0] === this.cur ? mapLevelOf(this.levels, p[3]) : null;
    },
    // repères : sorties de la zone dans cette scène (et à cet étage), regroupées par position
    marks(){
      const groups = new Map();
      for (const [key, p] of Object.entries(this.exitsHere)){
        if (p[0] !== this.cur || EXIT[key]?.areaId !== this.area || !this.onLevel(p[3])) continue;
        const id = p[1] + ',' + p[2], g = groups.get(id) || { id, x:p[1], z:p[2], keys:[] };
        g.keys.push(key); groups.set(id, g);
      }
      /* changement de zone : flèche vers l'extérieur de la zone — à l'opposé de l'orientation de Link quand il apparaît à
         la sortie (exitRot ; 0 = vers le sud, z croissant) ; à défaut, du centre de la scène vers le repère ; arrondie au
         huitième de tour */
      const ex = this.exitsHere, b = MAPS.scenes[this.cur].bounds, cx = (b[0] + b[2]) / 2, cz = (b[1] + b[3]) / 2, q = Math.PI / 4;
      const angOf = g => {
        const fix = g.keys.find(k => k in EXIT_ARROW);
        if (fix) return (EXIT_ARROW[fix] - 90) * Math.PI / 180;
        const k = g.keys.find(k => MAPS.exitRot?.[k] != null), r = k != null && MAPS.exitRot[k] * Math.PI / 0x8000;
        const a = k != null ? Math.atan2(-Math.cos(r), -Math.sin(r)) : Math.atan2(g.z - cz, g.x - cx);
        return Math.round(a / q) * q;
      };
      // arrivées seules (plateformes de téléportation, atterrissage du hibou, arrivée de la rivière) : on ne peut pas les
      // prendre, masquées — sauf position, arrivée du Routeur ou prochaine sortie
      const shown = g => g.keys.some(k => !EXIT[k].destinationOnly || k === this.here || k === this.goal || k === this.next);
      return [...groups.values()].filter(shown).map(g => ({ ...g, ang:angOf(g), type:EXIT[g.keys.find(k => !ex[k][4]) || g.keys[0]].type,
        keys:g.keys.sort((a, b) => (ex[a][4] || 0) - (ex[b][4] || 0)) }));
    },
    here(){ return link.position?.key || store.ui.router.fromExit; },
    goal(){ return store.ui.router.toExit; },
    // prochaine sortie à prendre : celle de la première transition du trajet du Routeur
    next(){
      const r = store.ui.router;
      if (!r.fromExit || !r.toExit || !EXIT[r.fromExit] || !EXIT[r.toExit]) return null;
      const res = shortest(routeC.value.edges, r.fromExit, r.fromAge, r.toExit, r.toAge);
      const e = res && res.edges.find(e => e.kind !== 'walk' && e.kind !== 'age');
      return e ? e.from : null;
    },
    selMark(){ return this.marks.find(m => m.id === this.sel) || null; },
    /* Checks et pierres sur la carte. Lieu (intérieur, grotte, donjon) : à la porte qui y mène selon les entrées notées
       (sortie dont la destination est l'arrivée du lieu ; porte située dans un donjon ou un autre intérieur : on remonte
       jusqu'à l'extérieur) ; entrée pas encore notée : pas de position. → { arrivée du lieu: [scène, x, z] | null } */
    doors(){
      const inc = incC.value, out = {};
      const resolve = (p, d) => {
        if (d > 6) return null;
        for (const x of inc[p] || []){
          const at = MAPS.exits[x], e = EXIT[x];
          if (at && !at[4]) return at;
          const entry = e && MAPS.areaEntry[e.areaId];
          if (entry && entry !== p){ const r = resolve(entry, d + 1); if (r) return r; }
          if (at && at[4] && x !== p){ const r = resolve(x, d + 1); if (r) return r; }
        }
        return null;
      };
      for (const p of new Set(Object.values(MAPS.places || {}))) out[p] = resolve(p, 0);
      return out;
    },
    /* Checks affichés : toujours mélangés selon la configuration, de la version active, et non exclus (zone ignorée…).
       « Comme la page Checks » (filters) : aussi ses filtres — catégories, âge, checks faits masqués, seulement les
       faisables, recherche ; « Tous » (all) : faits compris (en gris) ; « Aucun » (off). */
    checkList(){
      const mode = store.ui.map.checks, cf = store.ui.checks, done = store.game.checks, now = sohC.value.checks, ever = sohFullC.value.checks, out = [];
      if (mode === 'off' || !MAPS.checks) return out;
      const filters = mode !== 'all', q = filters && cf.q.trim() ? norm(cf.q.trim()) : '';
      for (const c of CHECKS){
        if (!checkListed(c) || store.settings.excluded[c.id]) continue;
        const k = 'RC_' + c.id, isDone = !!done[c.id], isNow = (now[k] || 0) > 0;
        if (filters){
          if (cf.hiddenCats[c.cat] || cf.hideDone && isDone || cf.onlyAvailable && !isDone && !isNow) continue;
          const e = ever[k] || 0, age = (e & CHILD) && (e & ADULT) ? 'both' : e & CHILD ? 'child' : e & ADULT ? 'adult' : null;
          if (cf.age !== 'all' && age && age !== 'both' && age !== cf.age) continue;
          if (q && !norm(c.label + ' ' + c.soh).includes(q) && !norm(CHECK_AREA[c.area]?.label || '').includes(q)) continue;
        }
        out.push({ c, done:isDone, now:isNow });
      }
      return out;
    },
    checkMarks(){
      const out = [], groups = new Map();
      for (const x of this.checkList){
        const at = this.checkAt(x.c.id);
        if (at){ if (this.onLevel(at[3])) out.push({ t:'c', id:'c:' + x.c.id, x:at[1], z:at[2], ...x }); continue; }
        // check placé dans une autre scène d'extérieur : pas ici ; sinon (intérieur, grotte, donjon) à la porte de son lieu
        const p = MAPS.checks[x.c.id];
        if (p && !MAPS.scenes[p[0]]?.kind) continue;
        const place = MAPS.places[x.c.id], door = place && this.doors[place];
        if (!door || door[0] !== this.cur) continue;
        const g = groups.get(place) || { t:'p', id:'p:' + place, place, x:door[1], z:door[2], list:[] };
        g.list.push(x); groups.set(place, g);
      }
      // checks au même point (objet dans une caisse…) : écartés en cercle, pour les voir et les cliquer tous
      const stack = new Map();
      for (const m of out){ const k = m.x + ',' + m.z; if (!stack.has(k)) stack.set(k, []); stack.get(k).push(m); }
      for (const g of stack.values()) if (g.length > 1) g.forEach((m, i) => {
        const a = 2 * Math.PI * i / g.length - Math.PI / 2;
        m.x += Math.cos(a) * this.unit * 0.9; m.z += Math.sin(a) * this.unit * 0.9;
      });
      return out.concat([...groups.values()].map(g => ({ ...g, todo:g.list.filter(x => !x.done).length, now:g.list.some(x => !x.done && x.now) })));
    },
    stoneMarks(){
      if (!store.ui.map.stones || !MAPS.checks) return [];
      return GOSSIP_STONES.map(s => {
        // dans cette scène (version Master Quest ou vanilla), à l'étage affiché ; sinon à la porte de son lieu
        const here = [MAPS.checksMq?.[s.rc], MAPS.checks[s.rc]].find(q => q && q[0] === this.cur);
        if (here) return this.onLevel(here[3]) ? { t:'s', id:'s:' + s.id, x:here[1], z:here[2], s, inside:false, read:!!store.game.hints[s.id] } : null;
        const p = MAPS.checks[s.rc], place = !p && MAPS.places[s.rc], door = place && this.doors[place];
        return door && door[0] === this.cur ? { t:'s', id:'s:' + s.id, x:door[1], z:door[2], s, inside:true, read:!!store.game.hints[s.id] } : null;
      }).filter(Boolean);
    },
    // checks de la zone sans repère : sans position connue, ou derrière une entrée pas encore notée
    offList(){
      const area = String(this.area).toUpperCase(), noPos = [], hidden = [];
      for (const x of this.checkList){
        if (x.c.area !== area || MAPS.checks[x.c.id] || MAPS.checksMq?.[x.c.id] || mapEdits[x.c.id]) continue;
        const place = MAPS.places[x.c.id];
        // donjon : sa carte montre l'intérieur, un check sans position y est « sans position »
        if (!place || CHECK_AREA[area]?.dungeon) noPos.push(x); else if (!this.doors[place]) hidden.push(x);
      }
      return { noPos, hidden };
    },
    /* Mode « Placer les checks » : checks de la zone sans position (ni placés par l'outil, ni rattachés à un lieu non
       dessiné ; version du donjon affichée), pas encore placés à la main ; et ceux placés à la main dans la zone. */
    editList(){
      if (!this.edit) return [];
      const area = String(this.area).toUpperCase(), mq = !!MAPS.scenes[this.cur]?.mq, dungeon = !!CHECK_AREA[area]?.dungeon;
      return (CHECKS_BY_AREA[area] || []).filter(c => {
        if (mapEdits[c.id] || MAPS.checks[c.id] || MAPS.checksMq?.[c.id]) return false;
        if (c.quest === (mq ? 'V' : 'M') && dungeon) return false;
        const place = MAPS.places[c.id], at = place && MAPS.exits[place];
        return !place || dungeon || !!(at && MAPS.scenes[at[0]]?.kind);
      });
    },
    editPlaced(){
      const area = String(this.area).toUpperCase();
      return Object.entries(mapEdits).filter(([id]) => CHECK_BY_ID[id]?.area === area).map(([id, p]) => ({ c:CHECK_BY_ID[id], p }));
    },
    // repères des checks placés à la main, dans cette scène et à cet étage (visibles en mode édition)
    editMarks(){ return this.edit ? this.editPlaced.filter(x => x.p.scene === this.cur && this.onLevel(x.p.y)) : []; },
    picked(){ return Object.keys(this.pick).filter(id => this.pick[id]); },
    editTool(){ return store.ui.map.editTool; },   // outil affiché (Configuration > Routeur et carte)
    cselMark(){ return this.csel && [...this.checkMarks, ...this.stoneMarks].find(m => m.id === this.csel) || null; },
    // cadrage par défaut : les repères de la scène (avec une marge), pas tout le terrain
    fit(){
      if (!this.geo) return null;
      const g = this.geo.view, ms = this.marks;
      if (ms.length < 2 || MAPS.scenes[this.cur]?.kind) return g;   // donjon : tout l'étage
      const xs = ms.map(m => m.x), zs = ms.map(m => m.z), min = Math.max(g[2], g[3]) * 0.22;
      let w = Math.max(...xs) - Math.min(...xs), h = Math.max(...zs) - Math.min(...zs);
      const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cz = (Math.max(...zs) + Math.min(...zs)) / 2;
      w = Math.max(min, w * 1.3); h = Math.max(min * 0.7, h * 1.3);
      return [cx - w / 2, cz - h / 2, w, h];
    },
    vb(){ return this.view || this.fit; },
    unit(){ return this.vb ? Math.max(this.vb[2], this.vb[3]) / 110 : 1; },   // taille des repères : constante à l'écran
  },
  watch:{
    focus:{ immediate:true, handler(k){
      const p = k && MAPS && ((this.isMq && MAPS.exitsMq?.[k]) || MAPS.exits[k]);
      if (!p) return;
      const mq = MAPS.exitsMq?.[k];
      const at = mq && this.scenes.includes(mq[0]) ? mq : p;
      this.scene = at[0]; this.level = mapLevelOf(MAPS.scenes[at[0]]?.levels, at[3]); this.sel = at[1] + ',' + at[2];
    } },
    area(){ this.scene = null; this.level = null; this.sel = null; this.view = null; },
    cur(){ this.view = null; },
    lvl(){ this.view = null; this.csel = null; },
    editTool(on){ if (!on){ this.edit = false; this.pick = {}; } },
  },
  methods:{
    has(m, k){ return !!k && m.keys.includes(k); },
    /* Repère de sortie, forme selon le type (les checks restent des ronds) : intérieur — porte (arceau) ; changement de
       zone — flèche orientée (ang : vers l'extérieur de la zone) ; grotte — rond percé ; donjon — écusson ; hibou — tête à
       deux oreilles. Éléments SVG (texte), aussi pour la légende. */
    markSvg(type, x, z, s, ang = 0){
      const n = v => +v.toFixed(2), p = d => `<path class="zm-shape" d="${d}"></path>`;
      if (type === 'interior'){
        const r = s * 0.75, top = z - s, bot = z + s;
        return p(`M${n(x - r)} ${n(bot)}V${n(top + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + r)} ${n(top + r)}V${n(bot)}Z`);
      }
      if (type === 'grotto') return `<circle class="zm-shape" cx="${n(x)}" cy="${n(z)}" r="${n(s * 1.1)}"></circle><circle class="zm-hole" cx="${n(x)}" cy="${n(z)}" r="${n(s * 0.45)}"></circle>`;
      if (type === 'dungeon'){
        const w = s * 1.05, h = s * 1.2;
        return p(`M${n(x - w)} ${n(z - h)}H${n(x + w)}V${n(z)}Q${n(x + w)} ${n(z + h * 0.75)} ${n(x)} ${n(z + h)}Q${n(x - w)} ${n(z + h * 0.75)} ${n(x - w)} ${n(z)}Z`);
      }
      if (type === 'owl'){
        const r = s * 0.95;
        return p(`M${n(x - r * 0.95)} ${n(z - r * 0.3)}L${n(x - r * 0.85)} ${n(z - r * 1.3)}L${n(x - r * 0.3)} ${n(z - r * 0.85)}L${n(x + r * 0.3)} ${n(z - r * 0.85)}L${n(x + r * 0.85)} ${n(z - r * 1.3)}L${n(x + r * 0.95)} ${n(z - r * 0.3)}A${n(r)} ${n(r)} 0 1 1 ${n(x - r * 0.95)} ${n(z - r * 0.3)}Z`);
      }
      // changement de zone (et autres) : flèche pleine, pointe vers +x puis tournée de ang
      const c = Math.cos(ang), si = Math.sin(ang);
      const pts = [[-1.1, -0.38], [0.1, -0.38], [0.1, -0.9], [1.25, 0], [0.1, 0.9], [0.1, 0.38], [-1.1, 0.38]]
        .map(([u, v]) => `${n(x + (u * c - v * si) * s)} ${n(z + (u * si + v * c) * s)}`);
      return p('M' + pts.join('L') + 'Z');
    },
    // position d'un check dans la scène affichée (version Master Quest ou vanilla), sinon null
    checkAt(id){
      const e = mapEdits[id];
      if (e) return e.scene === this.cur ? [e.scene, e.x, e.z, e.y] : null;
      return [MAPS.checksMq?.[id], MAPS.checks[id]].find(q => q && q[0] === this.cur) || null;
    },
    // hauteur du sol sous un point (étage affiché ; le plus haut s'il y en a plusieurs), null hors du sol
    floorY(x, z){
      const s = MAPS.scenes[this.cur], f = s.floors, lv = this.levels && this.levels[this.lvl], top = lv && this.lvl > 0 ? this.levels[this.lvl - 1].min : Infinity;
      let best = null;
      for (let i = 0; i < f.length; i += 7){
        const y = f[i + 6];
        if (lv && !(y > lv.min && y <= top)) continue;
        const d = (ax, az, bx, bz) => (x - bx) * (az - bz) - (ax - bx) * (z - bz);
        const d1 = d(f[i], f[i + 1], f[i + 2], f[i + 3]), d2 = d(f[i + 2], f[i + 3], f[i + 4], f[i + 5]), d3 = d(f[i + 4], f[i + 5], f[i], f[i + 1]);
        if ((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0)) continue;
        if (best == null || y > best) best = y;
      }
      return best;
    },
    // place les checks cochés au point cliqué
    placeAt(ev){
      const [x, z] = this.toWorld(ev), lv = this.levels && this.levels[this.lvl];
      let y = this.floorY(x, z);
      if (y == null && lv) y = lv.min + 1;
      for (const id of this.picked) mapEdits[id] = { scene:this.cur, x:Math.round(x), y:y == null ? null : Math.round(y), z:Math.round(z) };
      this.pick = {};
    },
    unplace(id){ delete mapEdits[id]; },
    movePlaced(id){ this.pick = { [id]:true }; },
    // positions placées à la main → positions-manuelles.json (scène sans « _MQ » : la version vient du check)
    exportEdits(){
      const out = {};
      for (const id of Object.keys(mapEdits).sort()){ const e = mapEdits[id]; out[id] = { scene:e.scene.replace(/_MQ$/, ''), x:e.x, y:e.y, z:e.z }; }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 1) + '\n'], { type:'application/json' }));
      a.download = 'positions-manuelles.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    },
    clearEdits(){ if (confirm('Effacer toutes les positions placées à la main (toutes zones) ?')) for (const k of Object.keys(mapEdits)) delete mapEdits[k]; },
    sceneName(s){ const l = mapSceneLabel(s, true); return l === s ? '' : l; },   // (scène d'extérieur sans libellé : rien)
    onLevel(y){ const i = mapLevelOf(this.levels, y); return i == null || i === this.lvl; },
    setScene(s){ this.scene = s; this.level = null; this.sel = null; },
    dest(k){ const t = effC.value[k]; return t && EXIT[t] ? AREA[EXIT[t].areaId].name + ' · ' + EXIT[t].label : null; },
    title(m){ return m.keys.map(k => EXIT[k].label + (this.dest(k) ? ' → ' + this.dest(k) : '')).join('\n'); },
    pick(m){ this.sel = this.sel === m.id ? null : m.id; this.csel = null; },
    cpick(m){ this.csel = this.csel === m.id ? null : m.id; this.sel = null; },
    toggleCheck(c){ setCheck(c.id, !store.game.checks[c.id]); },
    placeName(p){ return EXIT[p] ? (EXIT[p].areaId !== this.area ? AREA[EXIT[p].areaId].name + ' · ' : '') + EXIT[p].label : p; },
    hint(s){ return store.game.hints[s.id]; },
    setHintRead,
    bandColor(i){ return 'var(--map-' + i + ')'; },
    // zoom à la molette (autour du curseur), déplacement en glissant le fond, boutons + / − / tout voir
    toWorld(ev){ const r = this.$refs.svg.getBoundingClientRect(), v = this.vb, k = Math.max(v[2] / r.width, v[3] / r.height);
      const ox = (r.width - v[2] / k) / 2, oy = (r.height - v[3] / k) / 2;
      return [v[0] + (ev.clientX - r.left - ox) * k, v[1] + (ev.clientY - r.top - oy) * k, k]; },
    zoom(f, at){ const v = this.vb, c = at || [v[0] + v[2] / 2, v[1] + v[3] / 2], g = this.geo.view, max = Math.max(g[2], g[3]) * 1.2;
      const w = Math.min(max, Math.max(200, v[2] * f)), h = v[3] * w / v[2];
      this.view = [c[0] - (c[0] - v[0]) * w / v[2], c[1] - (c[1] - v[1]) * h / v[3], w, h]; },
    wheel(ev){ this.zoom(ev.deltaY > 0 ? 1.2 : 1 / 1.2, this.toWorld(ev)); },
    down(ev){ if (ev.button !== 0) return; const [x, y, k] = this.toWorld(ev); this.drag = { sx:ev.clientX, sy:ev.clientY, v:[...this.vb], k, moved:false }; },
    move(ev){ const d = this.drag; if (!d) return; const dx = ev.clientX - d.sx, dy = ev.clientY - d.sy;
      if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
      if (d.moved) this.view = [d.v[0] - dx * d.k, d.v[1] - dy * d.k, d.v[2], d.v[3]]; },
    up(ev){
      const d = this.drag; this.drag = null;
      if (d && !d.moved){ if (this.edit && this.picked.length) this.placeAt(ev); else { this.sel = null; this.csel = null; } }
    },
    // hauteur de la carte : ce qui reste à l'écran sous son haut de page, moins la légende et le bandeau du bas
    fitHeight(){
      const svg = this.$refs.svg;
      if (this.compact) return;
      if (!svg) return;
      const top = svg.getBoundingClientRect().top + window.scrollY, legend = [...this.$el.querySelectorAll('.zmap-legend')].reduce((h, l) => h + l.offsetHeight + 6, 0);
      const dock = document.querySelector('.next-dock')?.offsetHeight || 0;
      this.maxH = Math.max(260, window.innerHeight - top - legend - dock - 24);
    },
  },
  template:`<div class="zmap" :class="{compact}">
    <div v-if="!compact" class="zmap-top"><div v-if="scenes.length > 1" class="zmap-tabs"><button v-for="s in scenes" :key="s" type="button" :class="{on:s===cur}" @click="setScene(s)">{{mapSceneLabel(s, bothVersions)}}</button></div>
      <button v-if="editTool" type="button" class="btn zmap-edit-btn" :class="{on:edit}" @click="edit = !edit; pick = {}" title="Placer à la main les checks qui n'ont pas de position">✎ Placer les checks</button></div>
    <div v-if="!compact && mqMissing" class="zmap-note">Ce donjon est en version Master Quest : carte vanilla affichée (salles identiques, checks
      absents). Pour la carte Master Quest, régénérer les cartes avec la ROM Master Quest (option --mq de tools/soh-maps/extract_maps.mjs).</div>
    <div v-else-if="!compact && quest === '' && bothVersions" class="zmap-note">Version du donjon inconnue : cartes vanilla et Master Quest.</div>
    <div v-else-if="!compact && edit && bothVersions" class="zmap-note">Mode « Placer les checks » : cartes vanilla et Master Quest, quelle que soit la version du donjon.</div>
    <div v-if="!geo" class="zmap-empty">Pas de carte pour cette zone (intérieur).</div>
    <div v-else class="zmap-body" :class="{editing:edit}"><div class="zmap-frame">
      <div v-if="levels && !compact" class="zmap-levels"><button v-for="(l,i) in levels" :key="i" type="button" :class="{on:i===lvl, here:i===hereLevel}" @click="level=i"
        :title="'Étage ' + l.n + (levelTodo[i] ? ' — ' + levelTodo[i] + ' check' + (levelTodo[i] > 1 ? 's' : '') + ' à faire' : '') + (i===hereLevel ? ' — vous êtes ici' : '')">{{l.n}}<i v-if="levelTodo[i]">{{levelTodo[i]}}</i></button></div>
      <svg ref="svg" :viewBox="vb.join(' ')" :style="maxH && !compact ? { maxHeight:maxH + 'px' } : null" class="zmap-svg" :class="{dragging:drag && drag.moved, placing:edit && picked.length}" @wheel.prevent="wheel"
        @pointerdown="down" @pointermove="move" @pointerup="up($event)" @pointerleave="drag=null">
        <path v-if="geo.ghost" :d="geo.ghost" class="zmap-ghost" :stroke-width="unit * 0.12"></path>
        <path v-for="(d,i) in geo.bands" :key="i" :d="d" :fill="bandColor(i)" :stroke="bandColor(i)" :stroke-width="unit * 0.12"></path>
        <path :d="geo.walls" class="zmap-walls" :stroke-width="unit * 0.35"></path>
        <g v-for="m in checkMarks" :key="m.id" class="zc" :class="[m.t === 'p' ? 'zc-place' : 'zc-check', {done:m.t === 'c' ? m.done : !m.todo, now:m.now, sel:csel===m.id}]"
          @pointerdown.stop @click.stop="cpick(m)">
          <template v-if="m.t === 'c'"><circle :cx="m.x" :cy="m.z" :r="unit * (csel===m.id ? 1.05 : 0.75)"></circle>
            <title>{{m.c.label}}{{m.done ? ' (fait)' : m.now ? ' — faisable' : ' — pas encore faisable'}}</title></template>
          <template v-else><rect :x="m.x + unit * 1.3" :y="m.z - unit * 3.3" :width="unit * 2.4" :height="unit * 2" :rx="unit * 0.4"></rect>
            <text :x="m.x + unit * 2.5" :y="m.z - unit * 2.3" dominant-baseline="central" :font-size="unit * 1.4">{{m.todo}}</text>
            <title>{{placeName(m.place)}} : {{m.todo}} check{{m.todo > 1 ? 's' : ''}} à faire sur {{m.list.length}}</title></template>
        </g>
        <g v-for="x in editMarks" :key="'e:' + x.c.id" class="ze-mark" :class="{moving:pick[x.c.id]}">
          <rect :x="x.p.x - unit * 0.9" :y="x.p.z - unit * 0.9" :width="unit * 1.8" :height="unit * 1.8" :rx="unit * 0.3"></rect>
          <title>{{x.c.label}} (placé à la main)</title></g>
        <g v-for="m in stoneMarks" :key="m.id" class="zs" :class="{read:m.read, sel:csel===m.id}" @pointerdown.stop @click.stop="cpick(m)"
          :transform="'translate(' + (m.x + (m.inside ? -unit * 2.4 : 0)) + ' ' + (m.z + (m.inside ? -unit * 2.2 : 0)) + ') rotate(45)'">
          <rect :x="-unit * 0.75" :y="-unit * 0.75" :width="unit * 1.5" :height="unit * 1.5"></rect>
          <title>Pierre à potins : {{m.s.label}}{{m.read ? ' (lue)' : ''}}</title>
        </g>
        <g v-for="m in marks" :key="m.id" class="zm" :class="['t-' + m.type, {here:has(m, here), live:liveOn, goal:has(m, goal), next:has(m, next), sel:sel===m.id}]"
          @pointerdown.stop @click.stop="pick(m)" @mouseenter="hover=m.id" @mouseleave="hover=null">
          <circle v-if="has(m, here) || has(m, goal) || has(m, next)" class="zm-ring" :cx="m.x" :cy="m.z" :r="unit * 2.6"></circle>
          <g v-html="markSvg(m.type, m.x, m.z, unit * (sel===m.id || hover===m.id ? 1.7 : 1.3), m.ang)"></g>
          <text v-if="sel===m.id || hover===m.id || has(m, here) || has(m, goal) || has(m, next)" :x="m.x" :y="m.z - unit * 2.2" :font-size="unit * 2.3">{{EXIT[m.keys[0]].label}}</text>
          <title>{{title(m)}}</title>
        </g>
        <g v-if="liveMark" class="zl" :transform="'translate(' + liveMark.x + ' ' + liveMark.z + ') rotate(' + liveMark.deg + ')'">
          <circle class="zl-halo" :r="unit * 2.2"></circle>
          <path :d="'M0 ' + unit * 1.9 + 'L' + unit * -1.4 + ' ' + unit * -1.3 + 'L0 ' + unit * -0.5 + 'L' + unit * 1.4 + ' ' + unit * -1.3 + 'Z'"></path>
          <title>Link (position en temps réel)</title></g>
      </svg>
      <div v-if="!compact" class="zmap-zoom"><button type="button" title="Zoomer" @click="zoom(1 / 1.5)">+</button><button type="button" title="Dézoomer" @click="zoom(1.5)">−</button>
        <button type="button" title="Cadrer sur les sorties" @click="view = null">⤢</button><button type="button" title="Tout le terrain" @click="view = [...geo.view]">▢</button></div>
      <div v-if="cselMark && !compact" class="zmap-pop">
        <template v-if="cselMark.t === 'c'">
          <div class="zp-name"><b>{{cselMark.c.label}}</b><small>{{CHECK_CAT[cselMark.c.cat].label}} · {{cselMark.done ? 'fait' : cselMark.now ? 'faisable maintenant' : 'pas encore faisable'}}</small></div>
          <div class="zp-btns"><button type="button" class="btn" @click="toggleCheck(cselMark.c)">{{cselMark.done ? 'Remettre à faire' : 'Marquer fait'}}</button>
            <button v-if="!cselMark.done" type="button" class="btn" @click="$emit('go-check', cselMark.c)">Y aller</button></div>
        </template>
        <template v-else-if="cselMark.t === 'p'">
          <div class="zp-name"><b>{{placeName(cselMark.place)}}</b><small>{{cselMark.todo}} à faire sur {{cselMark.list.length}}</small></div>
          <ul class="zp-list"><li v-for="x in cselMark.list" :key="x.c.id" :class="{done:x.done, now:x.now}">
            <button type="button" class="zp-tick" :title="x.done ? 'Remettre à faire' : 'Marquer fait'" v-html="x.done ? ICONS.check : ICONS.circleO" @click="toggleCheck(x.c)"></button>
            <span>{{x.c.label}}</span></li></ul>
        </template>
        <template v-else>
          <div class="zp-name"><b>Pierre à potins : {{cselMark.s.label}}</b><small>{{cselMark.read ? 'lue' : 'pas encore lue'}}</small></div>
          <p v-if="hint(cselMark.s)?.text" class="zp-hint">{{hint(cselMark.s).text}}</p>
          <div class="zp-btns"><button type="button" class="btn" @click="setHintRead(cselMark.s.id, !cselMark.read)">{{cselMark.read ? 'Marquer non lue' : 'Marquer lue'}}</button></div>
        </template>
      </div>
      <div v-if="selMark && !compact" class="zmap-pop">
        <div v-for="k in selMark.keys" :key="k" class="zp-row">
          <div class="zp-name"><b>{{EXIT[k].label}}</b><small v-if="dest(k)">→ {{dest(k)}}</small><small v-else class="zp-unk">destination inconnue</small></div>
          <div class="zp-btns"><button type="button" class="btn" @click="$emit('start', k)">Partir d’ici</button>
            <button type="button" class="btn" @click="$emit('goal', k)">Y aller</button></div>
        </div>
      </div>
    </div>
    <div v-if="edit" class="zmap-edit">
      <div class="ze-head"><b>Placer les checks sans position</b>
        <span class="muted">Cochez un ou plusieurs checks, puis cliquez sur la carte à leur emplacement{{levels ? ' (à l’étage affiché)' : ''}}.</span>
        <span class="ze-btns"><button type="button" class="btn" :disabled="!Object.keys(mapEdits).length" @click="exportEdits" title="Télécharge positions-manuelles.json, à déposer dans tools/soh-maps/">Exporter ({{Object.keys(mapEdits).length}})</button>
          <button type="button" class="btn" :disabled="!Object.keys(mapEdits).length" @click="clearEdits">Tout effacer</button></span></div>
      <div class="ze-cols">
        <div><h4>À placer <small>{{editList.length}}</small></h4>
          <p v-if="!editList.length" class="muted">Rien à placer dans cette zone{{MAPS.scenes[cur]?.mq ? ' (version Master Quest)' : ''}}.</p>
          <label v-for="c in editList" :key="c.id" class="check ze-row"><input type="checkbox" v-model="pick[c.id]"><img :src="CHECK_CAT[c.cat].icon" alt="">{{c.label}}
            <small v-if="c.quest === 'M'">MQ</small></label></div>
        <div><h4>Placés à la main <small>{{editPlaced.length}}</small></h4>
          <p v-if="!editPlaced.length" class="muted">Aucun pour l’instant.</p>
          <div v-for="x in editPlaced" :key="x.c.id" class="ze-row" :class="{moving:pick[x.c.id]}"><img :src="CHECK_CAT[x.c.cat].icon" alt="">
            <span>{{x.c.label}} <small v-if="sceneName(x.p.scene)">· {{sceneName(x.p.scene)}}</small></span>
            <button type="button" class="linklike" @click="movePlaced(x.c.id)">{{pick[x.c.id] ? 'cliquez sur la carte' : 'déplacer'}}</button>
            <button type="button" class="linklike" @click="unplace(x.c.id)">retirer</button></div></div>
      </div>
    </div></div>
    <div v-if="!compact && (offList.noPos.length || offList.hidden.length)" class="zmap-off">
      <button type="button" class="link" @click="showOff = !showOff">{{offList.noPos.length ? offList.noPos.length + ' check' + (offList.noPos.length > 1 ? 's' : '') + ' sans position' : ''}}{{offList.noPos.length && offList.hidden.length ? ' · ' : ''}}{{offList.hidden.length ? offList.hidden.length + ' derrière une entrée pas encore notée' : ''}}</button>
      <ul v-if="showOff"><li v-for="x in [...offList.noPos, ...offList.hidden]" :key="x.c.id" :class="{done:x.done, now:x.now}">
        <button type="button" class="zp-tick" v-html="x.done ? ICONS.check : ICONS.circleO" @click="toggleCheck(x.c)"></button><span>{{x.c.label}}</span></li></ul>
    </div>
    <div v-if="!compact" class="zmap-legend"><b>Checks</b><span><i class="lg-c now"></i>faisable</span><span><i class="lg-c"></i>pas encore faisable</span><span><i class="lg-c done"></i>fait</span>
      <span><i class="lg-p"></i>checks d’un intérieur, d’une grotte ou d’un donjon (à faire)</span><span><i class="lg-s"></i>pierre à potins (pleine : lue)</span></div>
    <div v-if="!compact" class="zmap-legend"><b>Sorties</b><span v-for="t in [['overworld','changement de zone'],['interior','intérieur'],['grotto','grotte'],['dungeon','donjon'],['owl','hibou']]" :key="t[0]">
      <svg class="lg-mark zm" :class="'t-' + t[0]" viewBox="-1.45 -1.45 2.9 2.9" v-html="markSvg(t[0], 0, 0, 1)"></svg>{{t[1]}}</span></div>
    <div v-if="!compact" class="zmap-legend"><b>Repères</b><span v-if="liveOn"><i class="lg-link"></i>Link (temps réel)</span><span><i class="lg-here" :class="{live:liveOn}"></i>{{liveOn ? 'dernière entrée' : 'vous êtes ici'}}</span><span><i class="lg-next"></i>prochaine sortie</span><span><i class="lg-goal"></i>arrivée du Routeur</span>
      <span><i class="lg-ground"></i>terrain : du plus bas (foncé) au plus haut (clair)</span><span>Clic sur un repère : partir d’ici ou y aller.</span></div>
  </div>`,
  mounted(){ this.$nextTick(this.fitHeight); this.onResize = () => this.fitHeight(); window.addEventListener('resize', this.onResize); },
  updated(){ if (!this.maxH) this.$nextTick(this.fitHeight); },
  unmounted(){ window.removeEventListener('resize', this.onResize); },
  setup(){ return { EXIT, mapSceneLabel, CHECK_CAT, ICONS, MAPS, mapEdits, link }; },
};
