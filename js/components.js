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
   Routeur), arrivée du Routeur, prochaine sortie à prendre. Clic sur un repère : en faire le départ ou l'arrivée. */
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
for (const a of Object.keys(MAP_SCENES)) MAP_SCENES[a] = Object.entries(MAP_SCENES[a]).sort((x, y) => y[1] - x[1]).map(x => x[0]);
const MAP_SCENE_LABEL = { MARKET_ENTRANCE_DAY:'Entrée du bourg', MARKET_DAY:'Place du marché', TEMPLE_OF_TIME_EXTERIOR_DAY:'Parvis du temple',
  BACK_ALLEY_DAY:'Ruelle', HYRULE_CASTLE:'Château (enfant)', OUTSIDE_GANONS_CASTLE:'Château de Ganon (adulte)' };
const mapSceneCache = {};
function mapScene(name){
  if (mapSceneCache[name]) return mapSceneCache[name];
  const s = MAPS.scenes[name], f = s.floors, paths = Array.from({ length:MAP_BANDS }, () => []);
  // tranches de hauteur par quantiles (autant de sol dans chacune) : contraste là où il y a du terrain
  const hs = []; for (let i = 6; i < f.length; i += 7) hs.push(f[i]);
  hs.sort((a, c) => a - c);
  const cuts = Array.from({ length:MAP_BANDS - 1 }, (_, k) => hs[Math.floor((k + 1) * hs.length / MAP_BANDS)]);
  for (let i = 0; i < f.length; i += 7){
    let b = 0; while (b < cuts.length && f[i + 6] > cuts[b]) b++;
    paths[b].push(`M${f[i]} ${f[i + 1]}L${f[i + 2]} ${f[i + 3]}L${f[i + 4]} ${f[i + 5]}Z`);
  }
  let walls = '';
  for (let i = 0; i < s.walls.length; i += 4) walls += `M${s.walls[i]} ${s.walls[i + 1]}L${s.walls[i + 2]} ${s.walls[i + 3]}`;
  const [x0, z0, x1, z1] = s.bounds, pad = Math.max(x1 - x0, z1 - z0) * 0.03;
  return (mapSceneCache[name] = { bands:paths.map(p => p.join('')), walls, view:[x0 - pad, z0 - pad, x1 - x0 + 2 * pad, z1 - z0 + 2 * pad],
    unit:Math.max(x1 - x0, z1 - z0) / 110 });
}
const ZoneMap = {
  props:['area', 'focus'],   // focus : sortie à mettre en évidence (« Voir sur la carte »)
  emits:['start', 'goal', 'go-check'],
  data:() => ({ scene:null, sel:null, hover:null, view:null, drag:null, maxH:null, csel:null, showOff:false }),
  computed:{
    scenes(){ return MAP_SCENES[this.area] || []; },
    cur(){ return this.scenes.includes(this.scene) ? this.scene : this.scenes[0]; },
    geo(){ return this.cur ? mapScene(this.cur) : null; },
    // repères : sorties de la zone dans cette scène, regroupées par position
    marks(){
      const groups = new Map();
      for (const [key, p] of Object.entries(MAPS.exits)){
        if (p[0] !== this.cur || EXIT[key]?.areaId !== this.area) continue;
        const id = p[1] + ',' + p[2], g = groups.get(id) || { id, x:p[1], z:p[2], keys:[] };
        g.keys.push(key); groups.set(id, g);
      }
      return [...groups.values()].map(g => ({ ...g, type:EXIT[g.keys.find(k => !MAPS.exits[k][4]) || g.keys[0]].type,
        keys:g.keys.sort((a, b) => (MAPS.exits[a][4] || 0) - (MAPS.exits[b][4] || 0)) }));
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
    // checks suivis (comme la page Checks : mélangés, version active, non exclus, catégories affichées)
    checkList(){
      const mode = store.ui.map.checks, done = store.game.checks, now = sohC.value.checks, out = [];
      if (mode === 'off' || !MAPS.checks) return out;
      for (const c of CHECKS){
        if (!checkListed(c) || store.settings.excluded[c.id] || store.ui.checks.hiddenCats[c.cat]) continue;
        if (mode === 'todo' && done[c.id]) continue;
        out.push({ c, done:!!done[c.id], now:(now['RC_' + c.id] || 0) > 0 });
      }
      return out;
    },
    checkMarks(){
      const out = [], groups = new Map();
      for (const x of this.checkList){
        const p = MAPS.checks[x.c.id];
        if (p){ if (p[0] === this.cur) out.push({ t:'c', id:'c:' + x.c.id, x:p[1], z:p[2], ...x }); continue; }
        const place = MAPS.places[x.c.id], door = place && this.doors[place];
        if (!door || door[0] !== this.cur) continue;
        const g = groups.get(place) || { t:'p', id:'p:' + place, place, x:door[1], z:door[2], list:[] };
        g.list.push(x); groups.set(place, g);
      }
      return out.concat([...groups.values()].map(g => ({ ...g, todo:g.list.filter(x => !x.done).length, now:g.list.some(x => !x.done && x.now) })));
    },
    stoneMarks(){
      if (!store.ui.map.stones || !MAPS.checks) return [];
      return GOSSIP_STONES.map(s => {
        const p = MAPS.checks[s.rc], place = !p && MAPS.places[s.rc], door = place && this.doors[place], at = p || door;
        return at && at[0] === this.cur ? { t:'s', id:'s:' + s.id, x:at[1], z:at[2], s, inside:!p, read:!!store.game.hints[s.id] } : null;
      }).filter(Boolean);
    },
    // checks de la zone sans repère : sans position connue, ou derrière une entrée pas encore notée
    offList(){
      const area = String(this.area).toUpperCase(), noPos = [], hidden = [];
      for (const x of this.checkList){
        if (x.c.area !== area || MAPS.checks[x.c.id]) continue;
        const place = MAPS.places[x.c.id];
        if (!place) noPos.push(x); else if (!this.doors[place]) hidden.push(x);
      }
      return { noPos, hidden };
    },
    cselMark(){ return this.csel && [...this.checkMarks, ...this.stoneMarks].find(m => m.id === this.csel) || null; },
    // cadrage par défaut : les repères de la scène (avec une marge), pas tout le terrain
    fit(){
      if (!this.geo) return null;
      const g = this.geo.view, ms = this.marks;
      if (ms.length < 2) return g;
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
    focus:{ immediate:true, handler(k){ const p = k && MAPS?.exits[k]; if (p){ this.scene = p[0]; this.sel = p[1] + ',' + p[2]; } } },
    area(){ this.scene = null; this.sel = null; this.view = null; },
    cur(){ this.view = null; },
  },
  methods:{
    has(m, k){ return !!k && m.keys.includes(k); },
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
    up(){ const d = this.drag; this.drag = null; if (d && !d.moved){ this.sel = null; this.csel = null; } },
    // hauteur de la carte : ce qui reste à l'écran sous son haut de page, moins la légende et le bandeau du bas
    fitHeight(){
      const svg = this.$refs.svg;
      if (!svg) return;
      const top = svg.getBoundingClientRect().top + window.scrollY, legend = [...this.$el.querySelectorAll('.zmap-legend')].reduce((h, l) => h + l.offsetHeight + 6, 0);
      const dock = document.querySelector('.next-dock')?.offsetHeight || 0;
      this.maxH = Math.max(260, window.innerHeight - top - legend - dock - 24);
    },
  },
  template:`<div class="zmap">
    <div v-if="scenes.length > 1" class="zmap-tabs"><button v-for="s in scenes" :key="s" type="button" :class="{on:s===cur}" @click="scene=s; sel=null">{{MAP_SCENE_LABEL[s] || s}}</button></div>
    <div v-if="!geo" class="zmap-empty">Pas de carte pour cette zone (donjon ou intérieur).</div>
    <div v-else class="zmap-frame">
      <svg ref="svg" :viewBox="vb.join(' ')" :style="maxH ? { maxHeight:maxH + 'px' } : null" class="zmap-svg" :class="{dragging:drag && drag.moved}" @wheel.prevent="wheel"
        @pointerdown="down" @pointermove="move" @pointerup="up" @pointerleave="drag=null">
        <path v-for="(d,i) in geo.bands" :key="i" :d="d" :fill="bandColor(i)" :stroke="bandColor(i)" :stroke-width="unit * 0.12"></path>
        <path :d="geo.walls" class="zmap-walls" :stroke-width="unit * 0.35"></path>
        <g v-for="m in checkMarks" :key="m.id" class="zc" :class="[m.t === 'p' ? 'zc-place' : 'zc-check', {done:m.t === 'c' ? m.done : !m.todo, now:m.now, sel:csel===m.id}]"
          @pointerdown.stop @click.stop="cpick(m)">
          <template v-if="m.t === 'c'"><circle :cx="m.x" :cy="m.z" :r="unit * (csel===m.id ? 1.05 : 0.75)"></circle>
            <title>{{m.c.label}}{{m.done ? ' (fait)' : m.now ? ' — faisable' : ' — pas encore faisable'}}</title></template>
          <template v-else><rect :x="m.x + unit * 1.3" :y="m.z - unit * 3.3" :width="unit * 2.4" :height="unit * 2" :rx="unit * 0.4"></rect>
            <text :x="m.x + unit * 2.5" :y="m.z - unit * 1.75" :font-size="unit * 1.4">{{m.todo}}</text>
            <title>{{placeName(m.place)}} : {{m.todo}} check{{m.todo > 1 ? 's' : ''}} à faire sur {{m.list.length}}</title></template>
        </g>
        <g v-for="m in stoneMarks" :key="m.id" class="zs" :class="{read:m.read, sel:csel===m.id}" @pointerdown.stop @click.stop="cpick(m)"
          :transform="'translate(' + (m.x + (m.inside ? -unit * 2.4 : 0)) + ' ' + (m.z + (m.inside ? -unit * 2.2 : 0)) + ') rotate(45)'">
          <rect :x="-unit * 0.75" :y="-unit * 0.75" :width="unit * 1.5" :height="unit * 1.5"></rect>
          <title>Pierre à potins : {{m.s.label}}{{m.read ? ' (lue)' : ''}}</title>
        </g>
        <g v-for="m in marks" :key="m.id" class="zm" :class="['t-' + m.type, {here:has(m, here), goal:has(m, goal), next:has(m, next), sel:sel===m.id}]"
          @pointerdown.stop @click.stop="pick(m)" @mouseenter="hover=m.id" @mouseleave="hover=null">
          <circle v-if="has(m, here) || has(m, goal) || has(m, next)" class="zm-ring" :cx="m.x" :cy="m.z" :r="unit * 2.6"></circle>
          <circle :cx="m.x" :cy="m.z" :r="unit * (sel===m.id || hover===m.id ? 1.7 : 1.3)"></circle>
          <text v-if="sel===m.id || hover===m.id || has(m, here) || has(m, goal) || has(m, next)" :x="m.x" :y="m.z - unit * 2.2" :font-size="unit * 2.3">{{EXIT[m.keys[0]].label}}</text>
          <title>{{title(m)}}</title>
        </g>
      </svg>
      <div class="zmap-zoom"><button type="button" title="Zoomer" @click="zoom(1 / 1.5)">+</button><button type="button" title="Dézoomer" @click="zoom(1.5)">−</button>
        <button type="button" title="Cadrer sur les sorties" @click="view = null">⤢</button><button type="button" title="Tout le terrain" @click="view = [...geo.view]">▢</button></div>
      <div v-if="cselMark" class="zmap-pop">
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
      <div v-if="selMark" class="zmap-pop">
        <div v-for="k in selMark.keys" :key="k" class="zp-row">
          <div class="zp-name"><b>{{EXIT[k].label}}</b><small v-if="dest(k)">→ {{dest(k)}}</small><small v-else class="zp-unk">destination inconnue</small></div>
          <div class="zp-btns"><button type="button" class="btn" @click="$emit('start', k)">Partir d’ici</button>
            <button type="button" class="btn" @click="$emit('goal', k)">Y aller</button></div>
        </div>
      </div>
    </div>
    <div v-if="offList.noPos.length || offList.hidden.length" class="zmap-off">
      <button type="button" class="link" @click="showOff = !showOff">{{offList.noPos.length ? offList.noPos.length + ' check' + (offList.noPos.length > 1 ? 's' : '') + ' sans position' : ''}}{{offList.noPos.length && offList.hidden.length ? ' · ' : ''}}{{offList.hidden.length ? offList.hidden.length + ' derrière une entrée pas encore notée' : ''}}</button>
      <ul v-if="showOff"><li v-for="x in [...offList.noPos, ...offList.hidden]" :key="x.c.id" :class="{done:x.done, now:x.now}">
        <button type="button" class="zp-tick" v-html="x.done ? ICONS.check : ICONS.circleO" @click="toggleCheck(x.c)"></button><span>{{x.c.label}}</span></li></ul>
    </div>
    <div class="zmap-legend"><b>Checks</b><span><i class="lg-c now"></i>faisable</span><span><i class="lg-c"></i>pas encore faisable</span><span><i class="lg-c done"></i>fait</span>
      <span><i class="lg-p"></i>checks d’un intérieur, d’une grotte ou d’un donjon (à faire)</span><span><i class="lg-s"></i>pierre à potins (pleine : lue)</span></div>
    <div class="zmap-legend"><b>Sorties</b><span><i class="lg-dot t-overworld"></i>passage</span><span><i class="lg-dot t-interior"></i>intérieur (porte)</span>
      <span><i class="lg-dot t-grotto"></i>grotte</span><span><i class="lg-dot t-dungeon"></i>donjon</span><span><i class="lg-dot t-owl"></i>hibou</span></div>
    <div class="zmap-legend"><b>Repères</b><span><i class="lg-here"></i>vous êtes ici</span><span><i class="lg-next"></i>prochaine sortie</span><span><i class="lg-goal"></i>arrivée du Routeur</span>
      <span><i class="lg-ground"></i>terrain : du plus bas (foncé) au plus haut (clair)</span><span>Clic sur un repère : partir d’ici ou y aller.</span></div>
  </div>`,
  mounted(){ this.$nextTick(this.fitHeight); this.onResize = () => this.fitHeight(); window.addEventListener('resize', this.onResize); },
  updated(){ if (!this.maxH) this.$nextTick(this.fitHeight); },
  unmounted(){ window.removeEventListener('resize', this.onResize); },
  setup(){ return { EXIT, MAP_SCENE_LABEL, CHECK_CAT, ICONS }; },
};
