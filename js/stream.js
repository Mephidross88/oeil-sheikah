/* ---------- Fenêtre de stream (index.html?stream, STREAM_MODE de state.js) ----------
   Widgets disposés librement sur une toile, à capturer dans OBS. Dispositions (profils) gardées à part dans
   localStorage STREAM_KEY : { v:2, active: id du profil affiché, profiles:[{ id, name, bg, color, widgets:[…] }],
   ed:{ snap, grid, showGrid, side } (préférences de l'éditeur) }. Widget : { id, type, x, y, w, h?, locked?, hidden?,
   …options du type } ; ordre du tableau = ordre des calques (le dernier au premier plan).
   Ce fichier : types de widgets (STREAM_TYPES), modèle et migration (loadStream), gabarit (streamTemplate, appelé par
   app.js avec les fragments partagés ITEMS_TPL / LOOT_TPL) et éditeur (useStream, appelé dans le setup d'App). */
const STREAM_KEY = 'oeil-sheikah-stream';
/* Types de widgets. base : largeur naturelle du contenu (mis à l'échelle de la largeur du widget) ; free : widget à la
   taille choisie (largeur et hauteur) ; init : options d'un nouveau widget ; cat : rubrique de la bibliothèque. */
const STREAM_TYPES = {
  items:{ label:'Objets', cat:'Partie', base:426, base2:870, init:{ cols:2 } },
  progress:{ label:'Progression', cat:'Partie', base:1100 },
  loot:{ label:'Trouvailles', cat:'Partie', base:426 },
  zonemap:{ label:'Carte (zone de Link)', cat:'Cartes', free:true, w:640, h:480 },
  graph:{ label:'Connexions', cat:'Cartes', base:1000 },
  // page Statistiques : tuiles (temps de jeu, checks faits, entrées trouvées), courbe des checks, chronologie
  stattiles:{ label:'Compteurs', cat:'Statistiques', base:620, init:{ play:true, checks:true, entr:true } },
  statcurve:{ label:'Courbe des checks', cat:'Statistiques', free:true, w:600, h:220, init:{ title:true } },
  timeline:{ label:'Chronologie', cat:'Statistiques', free:true, w:520, h:360, init:{ filter:'all', n:8, at:true } },
  game:{ label:'Espace vide (jeu)', cat:'Décor', free:true, w:960, h:540, init:{ frame:true } },
  image:{ label:'Image', cat:'Décor', free:true, w:300, h:200, init:{ src:'', fit:'contain' } },
  text:{ label:'Texte', cat:'Décor', free:true, w:500, h:60, init:{ text:'L’Œil Sheikah', size:32 } },
};
const STREAM_CATS = [...new Set(Object.values(STREAM_TYPES).map(t => t.cat))]
  .map(cat => ({ cat, types:Object.entries(STREAM_TYPES).filter(([, t]) => t.cat === cat).map(([k, t]) => ({ key:k, label:t.label })) }));
const streamWidgetsDefault = () => [   // pour un écran 1920 × 1080
  { id:1, type:'items', x:20, y:20, w:580, cols:2 },
  { id:2, type:'game', x:620, y:20, w:1280, h:720, frame:true },
  { id:3, type:'progress', x:620, y:760, w:1280 },
  { id:6, type:'loot', x:100, y:850, w:420 },
];
const streamProfile = (id, name) => ({ id, name, bg:'#00b140', color:'#00b140', widgets:streamWidgetsDefault() });
const streamDefaults = () => ({ v:2, active:1, profiles:[streamProfile(1, 'Disposition 1')],
  ed:{ snap:true, grid:20, showGrid:true, side:'right' } });
// widgets d'une disposition : types inconnus retirés (anciens blocs Prochaine étape et Où aller ; « map » = Connexions),
// identifiants manquants complétés
function streamCleanWidgets(list){
  let n = 0;
  return (Array.isArray(list) ? list : []).map(w => w && w.type === 'map' ? { ...w, type:'graph' } : w)
    .filter(w => w && STREAM_TYPES[w.type]).map(w => ({ ...w, id:+w.id || 1000 + ++n }));
}
function loadStream(){
  const d = streamDefaults();
  try {
    const v = JSON.parse(localStorage.getItem(STREAM_KEY) || 'null');
    if (v && v.v === 2 && Array.isArray(v.profiles) && v.profiles.length){
      v.profiles.forEach(p => { p.widgets = streamCleanWidgets(p.widgets); });
      return { ...d, ...v, ed:{ ...d.ed, ...(v.ed || {}) },
        active:v.profiles.some(p => p.id === v.active) ? v.active : v.profiles[0].id };
    }
    if (v && Array.isArray(v.widgets)){   // ancienne disposition unique (fond + blocs) → premier profil
      const at = (w, x, y, ww) => w.x === x && w.y === y && w.w === ww;
      const widgets = streamCleanWidgets(v.widgets)   // Progression et Trouvailles encore à leur toute première place
        .map(w => w.type === 'progress' && at(w, 620, 760, 420) ? { ...w, w:1280 } : w.type === 'loot' && at(w, 20, 760, 580) ? { ...w, x:100, y:850, w:420 } : w);
      return { ...d, profiles:[{ ...streamProfile(1, 'Disposition 1'), bg:v.bg || '#00b140', color:v.color || '#00b140', widgets }] };
    }
  } catch (e) {}
  return d;
}

/* Gabarit de la fenêtre de stream ; parts : fragments du gabarit d'App (items : panneau Objets, loot : trouvailles). */
function streamTemplate(parts){ return `
<!-- ================= FENÊTRE DE STREAM (index.html?stream) : widgets disposés librement, à capturer dans OBS ================= -->
<div v-if="STREAM" class="stream" :class="{editing:swEdit, 'show-grid':swEdit && ss.ed.showGrid}" :style="{background:streamBg, '--sw-grid':ss.ed.grid + 'px'}"
  @pointermove="swMove" @pointerup="swUp" @pointercancel="swUp" @pointerdown.self="swSel = null">
  <div v-for="w in sp.widgets" v-show="swEdit || !w.hidden" :key="w.id" :data-sw="w.id" class="sw"
    :class="['sw-' + w.type, {sel:swEdit && swSel===w.id, framed:w.frame, locked:w.locked, ghost:w.hidden}]"
    :style="{left:w.x + 'px', top:w.y + 'px', width:w.w + 'px', height:STREAM_TYPES[w.type].free ? w.h + 'px' : null}">
    <div class="sw-body" :style="swBodyStyle(w)">
      <div v-if="w.type==='items'" class="sw-items" :class="{cols2:w.cols===2}">${parts.items}</div>
      <div v-else-if="w.type==='loot'" class="sw-items">${parts.loot}</div>
      <div v-else-if="w.type==='progress'" class="global-progress sw-progress">
        <progress-card :stats="checkStats" unit="checks" title="Checks"></progress-card>
        <progress-card v-if="stats.editable" :stats="stats" unit="sorties" title="Entrées"></progress-card></div>
      <entrance-graph v-else-if="w.type==='graph'"></entrance-graph>
      <div v-else-if="w.type==='stattiles'" class="rsum sw-stattiles">
        <div v-if="w.play" class="rstat"><div><b>{{playNow ? fmtDur(playNow) : '—'}}</b><span>temps de jeu</span></div></div>
        <div v-if="w.checks" class="rstat"><div><b>{{checkStats.got}} / {{checkStats.total}}</b><span>checks faits</span></div></div>
        <div v-if="w.entr && stats.editable" class="rstat"><div><b>{{stats.mapped}} / {{stats.editable}}</b><span>entrées trouvées</span></div></div></div>
      <div v-else-if="w.type==='statcurve'" class="st-chart sw-chart">
        <div v-if="w.title" class="st-chart-title">Checks faits au fil du temps de jeu<small v-if="statsC.curve"> (jusqu'à {{statsC.curve.max}})</small></div>
        <template v-if="statsC.curve"><svg viewBox="0 0 600 150" preserveAspectRatio="none"><path class="st-area" :d="statsC.curve.area"></path><path class="st-line" :d="statsC.curve.d"></path></svg>
          <div class="st-axis"><span>0:00:00</span><span>{{statsC.curve.end}}</span></div></template>
        <p v-else class="sw-empty">La courbe apparaît avec le temps de jeu (auto-tracking).</p></div>
      <ul v-else-if="w.type==='timeline'" class="st-list sw-tl">
        <li v-for="r in statsC.rows.filter(r => w.filter === 'all' || (w.filter === 'checks' ? r.k === 'checks' : r.k !== 'checks')).slice(0, w.n || 8)" :key="r.i">
          <span v-if="w.at" class="st-at">{{r.at || '—'}}</span>
          <img v-if="r.icon" :src="r.icon" alt=""><span v-else class="st-noic"></span>
          <span class="st-lab">{{r.label}}<small v-if="r.found"> · {{r.found}}</small></span></li>
        <li v-if="!statsC.rows.length" class="sw-empty">Rien de noté pour l'instant.</li></ul>
      <zone-map v-else-if="w.type==='zonemap' && MAPS_OK && followArea" class="sw-map" :compact="true" :area="followArea"></zone-map>
      <img v-else-if="w.type==='image' && w.src" class="sw-img" :src="w.src" alt="" :style="{objectFit:w.fit || 'contain'}">
      <div v-else-if="w.type==='text'" class="sw-text" :style="{fontSize:(w.size || 32) + 'px'}">{{w.text}}</div>
    </div>
    <template v-if="swEdit">
      <div class="sw-hit" @pointerdown.prevent.stop="swDown($event, w, 'move')"><span class="sw-name">{{w.locked ? '🔒 ' : ''}}{{STREAM_TYPES[w.type].label}}</span></div>
      <div v-if="!w.locked" class="sw-grip" title="Redimensionner" @pointerdown.prevent.stop="swDown($event, w, 'size')"></div>
    </template>
  </div>
  <div v-for="(g, i) in swGuides" :key="'g' + i" class="sw-guide" :class="g.axis" :style="g.axis === 'v' ? {left:g.at + 'px'} : {top:g.at + 'px'}"></div>

  <!-- éditeur : panneau latéral -->
  <aside v-if="swEdit" class="sw-panel" :class="'side-' + ss.ed.side" @pointerdown.stop @keydown.stop>
    <header class="swp-head"><b>Disposition du stream</b>
      <button type="button" class="swp-ic" :title="ss.ed.side === 'right' ? 'Mettre le panneau à gauche' : 'Mettre le panneau à droite'" @click="ss.ed.side = ss.ed.side === 'right' ? 'left' : 'right'">⇆</button></header>
    <div class="swp-body">
      <section class="swp-sec">
        <h4>Disposition</h4>
        <div class="swp-row"><select v-model="ss.active" class="sel swp-grow" aria-label="Disposition affichée">
            <option v-for="p in ss.profiles" :key="p.id" :value="p.id">{{p.name}}</option></select></div>
        <div class="swp-row"><input type="text" class="swp-in swp-grow" v-model="sp.name" aria-label="Nom de la disposition" placeholder="Nom"></div>
        <div class="swp-row swp-btns">
          <button type="button" class="btn" @click="swProfileNew">Nouvelle</button>
          <button type="button" class="btn" @click="swProfileDup">Dupliquer</button>
          <button type="button" class="btn" :disabled="ss.profiles.length < 2" @click="swProfileDel">Supprimer</button></div>
        <div class="swp-row swp-btns">
          <button type="button" class="btn" @click="swExport">Exporter…</button>
          <label class="btn import-btn">Importer…<input type="file" accept=".json,application/json" hidden @change="swImport"></label>
          <button type="button" class="btn" title="Remettre les widgets par défaut dans cette disposition (pensés pour 1920 × 1080)" @click="swReset">Par défaut</button></div>
        <div v-if="swMsg" class="msg" :class="swMsg.ok ? 'ok' : 'ko'">{{swMsg.text}}</div>
        <label class="swp-row">Fond <select v-model="sp.bg" class="sel swp-grow"><option value="transparent">Transparent</option><option value="#00b140">Vert d’incrustation</option>
          <option value="#ff00ff">Magenta</option><option value="theme">Fond de l’appli</option><option value="custom">Autre couleur</option></select>
          <input v-if="sp.bg==='custom'" type="color" v-model="sp.color" aria-label="Couleur du fond"></label>
      </section>

      <section class="swp-sec">
        <h4>Ajouter un widget</h4>
        <div v-for="c in STREAM_CATS" :key="c.cat" class="swp-lib"><span class="swp-cat">{{c.cat}}</span>
          <button v-for="t in c.types" :key="t.key" type="button" class="swp-add" @click="swNew(t.key)">+ {{t.label}}</button></div>
      </section>

      <section v-if="swSelW" class="swp-sec swp-sel">
        <h4>{{STREAM_TYPES[swSelW.type].label}}</h4>
        <template v-if="swSelW.type==='image'">
          <input type="text" class="swp-in" v-model="swSelW.src" placeholder="Chemin ou adresse de l’image">
          <div class="swp-row"><label class="btn">Fichier…<input type="file" accept="image/*" hidden @change="swImage($event, swSelW)"></label>
            <select v-model="swSelW.fit" class="sel"><option value="contain">Entière</option><option value="cover">Remplir</option></select></div></template>
        <template v-else-if="swSelW.type==='text'">
          <input type="text" class="swp-in" v-model="swSelW.text" placeholder="Texte">
          <label class="swp-row">Taille <input type="number" class="swp-num" v-model.number="swSelW.size" min="10" max="200"> px</label></template>
        <label v-else-if="swSelW.type==='game'" class="check"><input type="checkbox" v-model="swSelW.frame">Cadre doré</label>
        <template v-else-if="swSelW.type==='stattiles'">
          <label class="check"><input type="checkbox" v-model="swSelW.play">Temps de jeu</label>
          <label class="check"><input type="checkbox" v-model="swSelW.checks">Checks faits</label>
          <label class="check"><input type="checkbox" v-model="swSelW.entr">Entrées trouvées (entrées mélangées)</label></template>
        <label v-else-if="swSelW.type==='statcurve'" class="check"><input type="checkbox" v-model="swSelW.title">Titre</label>
        <template v-else-if="swSelW.type==='timeline'">
          <seg v-model="swSelW.filter" :options="[['items','Objets et chants'],['checks','Checks'],['all','Tout']]"></seg>
          <label class="swp-row">Lignes <input type="number" class="swp-num" v-model.number="swSelW.n" min="1" max="50"></label>
          <label class="check"><input type="checkbox" v-model="swSelW.at">Temps de jeu de chaque ligne</label></template>
        <label v-else-if="swSelW.type==='items'" class="check"><input type="checkbox" :checked="swSelW.cols===2" @change="swSelW.cols = $event.target.checked ? 2 : 1">2 colonnes</label>
        <div class="swp-geo">
          <label>X<input type="number" class="swp-num" v-model.number="swSelW.x" :disabled="swSelW.locked"></label>
          <label>Y<input type="number" class="swp-num" v-model.number="swSelW.y" :disabled="swSelW.locked"></label>
          <label>Larg.<input type="number" class="swp-num" v-model.number="swSelW.w" min="40" :disabled="swSelW.locked"></label>
          <label v-if="STREAM_TYPES[swSelW.type].free">Haut.<input type="number" class="swp-num" v-model.number="swSelW.h" min="20" :disabled="swSelW.locked"></label></div>
        <div class="swp-row swp-btns">
          <button type="button" class="btn" title="Ctrl+D" @click="swDup(swSelW)">Dupliquer</button>
          <button type="button" class="btn" @click="swLayer(swSelW, 'top')">Premier plan</button>
          <button type="button" class="btn" @click="swLayer(swSelW, 'bottom')">Arrière-plan</button>
          <button type="button" class="btn red" :disabled="swSelW.locked" title="Suppr" @click="swDelete(swSelW)">Retirer</button></div>
      </section>

      <section class="swp-sec">
        <h4>Calques <small>(du premier plan à l’arrière)</small></h4>
        <ul class="swp-layers">
          <li v-for="w in swLayers" :key="w.id" :class="{sel:swSel===w.id, ghost:w.hidden}" @click="swSel = w.id">
            <span class="swp-lname">{{STREAM_TYPES[w.type].label}}<small v-if="w.type==='text' && w.text"> · {{w.text}}</small></span>
            <button type="button" class="swp-ic" :title="w.hidden ? 'Afficher' : 'Masquer'" @click.stop="w.hidden = !w.hidden">{{w.hidden ? '◌' : '●'}}</button>
            <button type="button" class="swp-ic" :title="w.locked ? 'Déverrouiller' : 'Verrouiller (ni déplacé, ni redimensionné, ni retiré)'" @click.stop="w.locked = !w.locked">{{w.locked ? '🔒' : '🔓'}}</button>
            <button type="button" class="swp-ic" title="Monter d’un cran" @click.stop="swLayer(w, 'up')">▲</button>
            <button type="button" class="swp-ic" title="Descendre d’un cran" @click.stop="swLayer(w, 'down')">▼</button></li>
        </ul>
        <p v-if="!sp.widgets.length" class="swp-note">Aucun widget : ajoutez-en un ci-dessus.</p>
      </section>

      <section class="swp-sec">
        <h4>Aimantation</h4>
        <label class="check"><input type="checkbox" v-model="ss.ed.snap">Aimanter aux bords et centres des autres widgets et de l’écran</label>
        <label class="swp-row">Grille <select v-model.number="ss.ed.grid" class="sel"><option :value="1">Aucune</option><option :value="10">10 px</option><option :value="20">20 px</option><option :value="40">40 px</option></select>
          <label class="check"><input type="checkbox" v-model="ss.ed.showGrid">Afficher</label></label>
        <p class="swp-note">Maintenir Alt pendant le glissement : sans aimantation.</p>
      </section>
    </div>
    <footer class="swp-foot">
      <button type="button" class="btn" :disabled="!swCanUndo" title="Ctrl+Z" @click="swUndo">Annuler</button>
      <button type="button" class="btn" :disabled="!swCanRedo" title="Ctrl+Y" @click="swRedo">Rétablir</button>
      <button type="button" class="btn primary" @click="swEdit=false">Terminer</button>
      <span class="swp-tip">E : modifier / terminer · flèches : déplacer (Maj : 10 px) · Suppr : retirer · Ctrl+D : dupliquer · Échap : désélectionner</span>
    </footer>
  </aside>
  <div v-else-if="swHint" class="sw-hint">Touche E (ou double-clic) : modifier la disposition</div>
</div>
`; }

/* Éditeur de la fenêtre de stream, dans le setup d'App (STREAM : fenêtre de stream ou non). Renvoie ce que le gabarit
   utilise. */
function useStream(STREAM){
  const ss = reactive(loadStream());
  if (STREAM) watch(ss, () => { try { localStorage.setItem(STREAM_KEY, JSON.stringify(ss)); } catch (e) {} }, { deep:true });
  const sp = computed(() => ss.profiles.find(p => p.id === ss.active) || ss.profiles[0]);
  const swEdit = ref(false), swSel = ref(null), swHint = ref(true), swGuides = ref([]), swMsg = ref(null);
  setTimeout(() => { swHint.value = false; }, 6000);
  const swSelW = computed(() => sp.value.widgets.find(w => w.id === swSel.value) || null);
  const swLayers = computed(() => [...sp.value.widgets].reverse());
  const streamBg = computed(() => sp.value.bg === 'theme' ? 'var(--bg)' : sp.value.bg === 'custom' ? sp.value.color : sp.value.bg);
  // contenu à sa largeur naturelle, agrandi ou réduit (zoom) à la largeur du widget ; image, texte, espace : à sa taille
  const swBase = w => w.cols === 2 && STREAM_TYPES[w.type].base2 || STREAM_TYPES[w.type].base;
  const swBodyStyle = w => STREAM_TYPES[w.type].free ? null : { width:swBase(w) + 'px', zoom:w.w / swBase(w) };
  const nextId = () => Math.max(0, ...sp.value.widgets.map(w => w.id)) + 1;

  /* Historique (annuler / rétablir) : instantanés de la disposition affichée, pris 300 ms après la dernière modification
     (un glissement = une étape) ; remis à zéro quand on change de disposition. */
  const hist = { past:[], future:[], last:'', timer:0, applying:false };
  const swCanUndo = ref(false), swCanRedo = ref(false);
  const snapJson = () => JSON.stringify(sp.value);
  const histSync = () => { swCanUndo.value = hist.past.length > 0; swCanRedo.value = hist.future.length > 0; };
  const histReset = () => { hist.past = []; hist.future = []; hist.last = snapJson(); histSync(); };
  histReset();
  watch(() => ss.active, () => { swSel.value = null; histReset(); });
  watch(sp, () => {
    if (hist.applying) return;
    clearTimeout(hist.timer);
    hist.timer = setTimeout(() => {
      const j = snapJson();
      if (j === hist.last) return;
      hist.past.push(hist.last); if (hist.past.length > 60) hist.past.shift();
      hist.future = []; hist.last = j; histSync();
    }, 300);
  }, { deep:true });
  function histApply(j){
    hist.applying = true;
    const p = JSON.parse(j), cur = sp.value;
    Object.keys(cur).forEach(k => { if (!(k in p)) delete cur[k]; });
    Object.assign(cur, p);
    hist.last = j;
    nextTick(() => { hist.applying = false; });
    if (swSel.value && !cur.widgets.some(w => w.id === swSel.value)) swSel.value = null;
    histSync();
  }
  function swUndo(){ clearTimeout(hist.timer); if (!hist.past.length) return; hist.future.push(snapJson()); histApply(hist.past.pop()); }
  function swRedo(){ clearTimeout(hist.timer); if (!hist.future.length) return; hist.past.push(snapJson()); histApply(hist.future.pop()); }

  /* Glisser (déplacer / redimensionner) avec aimantation : bords et centres des autres widgets et de l'écran (à moins de
     8 px, repères affichés), sinon la grille ; Alt : sans aimantation. Rectangles mesurés au début du glissement (les
     widgets à contenu mis à l'échelle n'ont pas de hauteur fixée). */
  const SNAP = 8;
  let drag = null;
  const rectOf = id => { const el = document.querySelector(`.stream [data-sw="${id}"]`); return el ? { x:el.offsetLeft, y:el.offsetTop, w:el.offsetWidth, h:el.offsetHeight } : null; };
  function swDown(ev, w, mode){
    swSel.value = w.id;
    if (w.locked) return;
    const others = sp.value.widgets.filter(o => o.id !== w.id && !o.hidden).map(o => rectOf(o.id)).filter(Boolean);
    const W = window.innerWidth, H = window.innerHeight;
    drag = { w, mode, x0:ev.clientX, y0:ev.clientY, a:mode === 'move' ? [w.x, w.y] : [w.w, w.h], self:rectOf(w.id),
      xs:[0, W / 2, W, ...others.flatMap(r => [r.x, r.x + r.w / 2, r.x + r.w])],
      ys:[0, H / 2, H, ...others.flatMap(r => [r.y, r.y + r.h / 2, r.y + r.h])] };
  }
  // meilleure aimantation d'une position (pos + chaque décalage de offs) sur les lignes : { v: position, at: ligne } | null
  function snapTo(pos, offs, lines){
    let best = null;
    for (const o of offs) for (const l of lines){ const d = Math.abs(pos + o - l); if (d <= SNAP && (!best || d < best.d)) best = { d, v:l - o, at:l }; }
    return best;
  }
  function swMove(ev){
    if (!drag) return;
    const d = drag, w = d.w, free = ev.altKey, g = ss.ed.grid || 1, grid = v => Math.round(v / g) * g;
    const dx = ev.clientX - d.x0, dy = ev.clientY - d.y0, guides = [];
    const h = d.self ? d.self.h : (w.h || 0);
    if (d.mode === 'move'){
      let x = d.a[0] + dx, y = d.a[1] + dy;
      const sx = !free && ss.ed.snap ? snapTo(x, [0, w.w / 2, w.w], d.xs) : null;
      const sy = !free && ss.ed.snap ? snapTo(y, [0, h / 2, h], d.ys) : null;
      x = sx ? sx.v : free ? x : grid(x); y = sy ? sy.v : free ? y : grid(y);
      if (sx) guides.push({ axis:'v', at:sx.at }); if (sy) guides.push({ axis:'h', at:sy.at });
      w.x = Math.round(x); w.y = Math.round(y);
    } else {
      const free2 = STREAM_TYPES[w.type].free;
      let ww = d.a[0] + dx;
      const sx = !free && ss.ed.snap ? snapTo(w.x + ww, [0], d.xs) : null;
      ww = sx ? sx.v - w.x : free ? ww : grid(w.x + ww) - w.x;
      if (sx) guides.push({ axis:'v', at:sx.at });
      w.w = Math.max(40, Math.round(ww));
      if (free2){
        let hh = d.a[1] + dy;
        const sy = !free && ss.ed.snap ? snapTo(w.y + hh, [0], d.ys) : null;
        hh = sy ? sy.v - w.y : free ? hh : grid(w.y + hh) - w.y;
        if (sy) guides.push({ axis:'h', at:sy.at });
        w.h = Math.max(20, Math.round(hh));
      }
    }
    swGuides.value = guides;
  }
  const swUp = () => { drag = null; swGuides.value = []; };

  function swNew(type){
    const t = STREAM_TYPES[type], id = nextId();
    sp.value.widgets.push({ id, type, x:40, y:40, w:t.w || t.base, h:t.h || 200, ...JSON.parse(JSON.stringify(t.init || {})) });
    swSel.value = id;
  }
  function swDup(w){
    const c = { ...JSON.parse(JSON.stringify(w)), id:nextId(), x:w.x + 20, y:w.y + 20, locked:false };
    sp.value.widgets.splice(sp.value.widgets.indexOf(w) + 1, 0, c);
    swSel.value = c.id;
  }
  const swDelete = w => { if (w.locked) return; const l = sp.value.widgets; l.splice(l.indexOf(w), 1); if (swSel.value === w.id) swSel.value = null; };
  function swLayer(w, how){
    const l = sp.value.widgets, i = l.indexOf(w);
    const j = how === 'top' ? l.length - 1 : how === 'bottom' ? 0 : how === 'up' ? Math.min(l.length - 1, i + 1) : Math.max(0, i - 1);
    if (i === j) return;
    l.splice(i, 1); l.splice(j, 0, w);
  }
  const swReset = () => { sp.value.widgets = streamWidgetsDefault(); swSel.value = null; };

  // dispositions (profils)
  const newProfileId = () => Math.max(0, ...ss.profiles.map(p => p.id)) + 1;
  const freeName = base => { let n = base, i = 2; while (ss.profiles.some(p => p.name === n)) n = base + ' ' + i++; return n; };
  function swProfileNew(){ const id = newProfileId(); ss.profiles.push(streamProfile(id, freeName('Disposition ' + id))); ss.active = id; }
  function swProfileDup(){ const id = newProfileId(); ss.profiles.push({ ...JSON.parse(JSON.stringify(sp.value)), id, name:freeName(sp.value.name + ' (copie)') }); ss.active = id; }
  function swProfileDel(){
    if (ss.profiles.length < 2 || !confirm(`Supprimer la disposition « ${sp.value.name} » ?`)) return;
    const i = ss.profiles.indexOf(sp.value);
    ss.profiles.splice(i, 1);
    ss.active = ss.profiles[Math.max(0, i - 1)].id;
  }
  // export : la disposition affichée, en fichier JSON ; import : ajoutée comme nouvelle disposition (aussi l'ancien format)
  function swExport(){
    const blob = new Blob([JSON.stringify({ v:2, oeilSheikahStream:true, profile:sp.value }, null, 1)], { type:'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'stream-' + (sp.value.name || 'disposition').replace(/[^\w\- àâäéèêëîïôöùûüç]+/gi, '').trim().replace(/\s+/g, '-') + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function swImport(ev){
    const f = ev.target.files[0];
    ev.target.value = '';
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const v = JSON.parse(r.result), p = v.profile || (Array.isArray(v.widgets) ? v : null);
        if (!p || !Array.isArray(p.widgets)) throw new Error();
        const id = newProfileId();
        ss.profiles.push({ ...streamProfile(id, ''), bg:p.bg || '#00b140', color:p.color || '#00b140',
          name:freeName(p.name || f.name.replace(/\.json$/i, '')), widgets:streamCleanWidgets(p.widgets) });
        ss.active = id;
        swMsg.value = { ok:true, text:'Disposition importée.' };
      } catch (e){ swMsg.value = { ok:false, text:'Ce fichier n’est pas une disposition de stream.' }; }
      setTimeout(() => { swMsg.value = null; }, 4000);
    };
    r.readAsText(f);
  }
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
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(ev.target.tagName)) return;
      const k = ev.key, ctrl = ev.ctrlKey || ev.metaKey, w = swSelW.value;
      if (!ctrl && k.toLowerCase() === 'e'){ swEdit.value = !swEdit.value; return; }
      if (!swEdit.value) return;
      if (ctrl && k.toLowerCase() === 'z'){ ev.preventDefault(); ev.shiftKey ? swRedo() : swUndo(); return; }
      if (ctrl && k.toLowerCase() === 'y'){ ev.preventDefault(); swRedo(); return; }
      if (k === 'Escape'){ swSel.value = null; return; }
      if (!w) return;
      if (ctrl && k.toLowerCase() === 'd'){ ev.preventDefault(); swDup(w); return; }
      if (k === 'Delete' || k === 'Backspace'){ ev.preventDefault(); swDelete(w); return; }
      const step = ev.shiftKey ? 10 : 1, mv = { ArrowLeft:[-step, 0], ArrowRight:[step, 0], ArrowUp:[0, -step], ArrowDown:[0, step] }[k];
      if (mv && !w.locked){ ev.preventDefault(); w.x += mv[0]; w.y += mv[1]; }
    });
    window.addEventListener('dblclick', ev => { if (!swEdit.value && !ev.target.closest('input')) swEdit.value = true; });
  }
  return { STREAM, STREAM_TYPES, STREAM_CATS, ss, sp, swEdit, swSel, swHint, swGuides, swMsg, swSelW, swLayers, streamBg, swBodyStyle,
    swDown, swMove, swUp, swNew, swDup, swDelete, swLayer, swReset, swImage, swUndo, swRedo, swCanUndo, swCanRedo,
    swProfileNew, swProfileDup, swProfileDel, swExport, swImport };
}
