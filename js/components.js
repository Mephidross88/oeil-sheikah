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
