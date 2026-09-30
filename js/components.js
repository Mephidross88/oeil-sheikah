/* ---------- Composants ---------- */
const TypeIcon = {
  props:['type'],
  computed:{ custom(){ return CUSTOM_ICONS[this.type]; }, svg(){ return ICONS[this.type] || ICONS.overworld; }, title(){ return TYPE_LABEL[this.type]; } },
  template:`<span class="ticon" :class="'t-'+type" :title="title"><img v-if="custom" :src="custom" alt=""><span v-else v-html="svg" style="display:contents"></span></span>`,
};

const Seg = {
  props:['modelValue','options'], emits:['update:modelValue'],
  template:`<div class="seg" role="radiogroup"><button v-for="o in options" :key="String(o[0])" type="button" role="radio" :aria-checked="modelValue===o[0]"
    :class="{on: modelValue===o[0]}" @click="$emit('update:modelValue', o[0])">{{o[1]}}</button></div>`,
};

// Tuile d'objet réutilisable (panneau Objets) : clic gauche/droit pour augmenter/diminuer/activer.
// Icône seule (pas de libellé visible), le nom reste accessible via le `title` au survol.
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
