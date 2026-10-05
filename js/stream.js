/* ---------- Fenêtre de stream (index.html?stream, STREAM_MODE de state.js) ----------
   Widgets disposés librement sur une toile, à capturer dans OBS. Dispositions (profils) gardées à part dans
   localStorage STREAM_KEY : { v:2, active: id du profil affiché, profiles:[{ id, name, bg, color, canvas:{ w, h }
   (taille de la toile, en px), fit (toile mise à l'échelle de la fenêtre), theme (thème : clé de STREAM_THEMES ou
   'custom'), custom (thème personnalisé), widgets:[…] }],
   ed:{ snap, grid, showGrid, side } (préférences de l'éditeur) }. Widget : { id, type, x, y, w, h?, locked?, hidden?,
   style? (apparence propre au widget : réglages d'un thème), …options du type } ; ordre du tableau = ordre des calques
   (le dernier au premier plan).
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
/* Thèmes : réglages d'apparence traduits en variables CSS de l'appli (--surface, --text, --gold…) posées sur la toile, et
   sur un widget qui a sa propre apparence. panel : fond des cadres (opacity en %), text, accent, line (bordure, border
   en px, 0 = aucune), radius (px), shadow, tshadow (contour du texte), font / title (polices : STREAM_FONTS).
   « app » : les couleurs de l'appli (thème clair ou sombre selon son réglage). */
const STREAM_FONTS = { app:['Appli (Alegreya)', null, null], georgia:['Georgia', 'Georgia,serif', 'Georgia,serif'],
  system:['Système', "'Segoe UI',system-ui,sans-serif", "'Segoe UI',system-ui,sans-serif"],
  trebuchet:['Trebuchet', "'Trebuchet MS',sans-serif", "'Trebuchet MS',sans-serif"],
  mono:['Monospace', "Consolas,'Courier New',monospace", "Consolas,'Courier New',monospace"],
  impact:['Impact', "Impact,'Arial Black',sans-serif", "Impact,'Arial Black',sans-serif"] };
const STREAM_THEME_BASE = { opacity:100, border:1, radius:14, shadow:true, tshadow:false, font:'app', title:'app' };
const STREAM_THEMES = {
  app:{ label:'Appli (suit son thème clair / sombre)' },
  dark:{ label:'Appli sombre', panel:'#1f1810', text:'#ecdfc2', accent:'#c9962e', line:'#3c3018', bg:'#161009' },
  light:{ label:'Appli clair', panel:'#faf5e6', text:'#3a2f1d', accent:'#c9962e', line:'#ddcfa9', bg:'#ece2c8' },
  glass:{ label:'Verre fumé', panel:'#0b0b10', opacity:62, text:'#f4f4f6', accent:'#f2c94c', line:'#ffffff', border:0, radius:16, shadow:false, font:'system' },
  sheikah:{ label:'Sheikah', panel:'#0a1824', opacity:88, text:'#dff4ff', accent:'#3fd0ff', line:'#1f5878', radius:6 },
  hyrule:{ label:'Hyrule', panel:'#13251a', opacity:92, text:'#f3efd6', accent:'#d9b54a', line:'#3d6b48', radius:12 },
  minimal:{ label:'Minimal (sans cadres)', panel:'#000000', opacity:0, text:'#ffffff', accent:'#ffd75e', line:'#000000', border:0, radius:0, shadow:false, tshadow:true },
};
// réglages complets d'un thème prédéfini (« app » : clair ou sombre selon l'appli)
function streamThemeTokens(key, appDark){
  const k = key === 'app' ? (appDark ? 'dark' : 'light') : STREAM_THEMES[key] ? key : 'dark';
  const { label, ...t } = STREAM_THEMES[k];
  return { ...STREAM_THEME_BASE, ...t };
}
const hexLum = h => { const n = parseInt(String(h).slice(1, 7), 16) || 0; return (0.2126 * (n >> 16) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255)) / 255; };
/* Thème sombre ou clair : d'après le fond des cadres, ou d'après le texte quand ce fond est presque transparent (texte
   clair = thème sombre). Il choisit la palette des autres couleurs de l'appli (comme ses modes clair et sombre, style.css) :
   encre, couleurs douces, couleurs des chants, carte. */
const streamThemeDark = t => (t.opacity ?? 100) >= 30 ? hexLum(t.panel) < 0.5 : hexLum(t.text) > 0.5;
const STREAM_PALETTE_LIGHT = { '--ink':'#241c11', '--ink-2':'#33281a', '--ink-line':'#4a3c26', '--ocarina-soft':'#e2eeee',
  '--green':'#4f7a3a', '--green-soft':'#e6efdd', '--red':'#a84330', '--red-soft':'#f6e2da', '--blue':'#3d6fb0', '--purple':'#7a3fa5', '--brown':'#8a5a2b',
  '--song-minuet':'#3f8a2c', '--song-bolero':'#b8392a', '--song-serenade':'#1d7fae', '--song-requiem':'#b8701a', '--song-nocturne':'#7a3fa5', '--song-prelude':'#c99a00',
  '--map-0':'#4f6b3a', '--map-1':'#5a7a40', '--map-2':'#668946', '--map-3':'#73974d', '--map-4':'#81a455', '--map-5':'#90b05f',
  '--map-6':'#a0bb6b', '--map-7':'#b1c67a', '--map-8':'#c2d18c', '--map-9':'#d4dca1', '--map-wall':'#1d2414', '--map-bg':'#efe7d2' };
const STREAM_PALETTE_DARK = { '--ink':'#100c07', '--ink-2':'#231b10', '--ink-line':'#3a2e1b', '--ocarina-soft':'#132a2c',
  '--green':'#8ec36e', '--green-soft':'#1c2916', '--red':'#e08a6f', '--red-soft':'#341811', '--blue':'#8db4e8', '--purple':'#c49be0', '--brown':'#d2a46e',
  '--song-minuet':'#8fd07a', '--song-bolero':'#f08a7a', '--song-serenade':'#7cc8ec', '--song-requiem':'#f0b25e', '--song-nocturne':'#c49be0', '--song-prelude':'#e8d36a',
  '--map-0':'#2c4129', '--map-1':'#344b2f', '--map-2':'#3d5636', '--map-3':'#47613d', '--map-4':'#526d45', '--map-5':'#5e794e',
  '--map-6':'#6b8657', '--map-7':'#799361', '--map-8':'#88a06c', '--map-9':'#98ae79', '--map-wall':'#0d120a', '--map-bg':'#15120d' };
// fond du thème (fond « Fond du thème » de la disposition, fond des cartes) : réglage bg, sinon dérivé du fond des cadres
const streamThemeBg = t => t.bg || `color-mix(in srgb, ${t.panel} 82%, ${streamThemeDark(t) ? '#000000' : t.text})`;
// variables CSS d'un jeu de réglages
function streamVars(t){
  const mix = (a, p, b) => `color-mix(in srgb, ${a} ${p}%, ${b})`, op = t.opacity ?? 100, dark = streamThemeDark(t);
  const v = {
    ...(dark ? STREAM_PALETTE_DARK : STREAM_PALETTE_LIGHT),
    '--surface':mix(t.panel, op, 'transparent'), '--surface-2':mix(mix(t.panel, 90, t.text), op, 'transparent'),
    // fond presque transparent : texte secondaire mélangé à la transparence (lisible sur le fond)
    '--text':t.text, '--muted':op >= 50 ? mix(t.text, 62, t.panel) : mix(t.text, 78, 'transparent'),
    '--gold':t.accent, '--gold-soft':mix(t.accent, 24, 'transparent'), '--bg':streamThemeBg(t),
    '--gold-deep':dark ? mix(t.accent, 78, '#ffffff') : mix(t.accent, 62, '#000000'),
    '--line':t.border > 0 ? t.line : 'transparent', '--sw-bw':(t.border > 0 ? t.border : 0) + 'px', '--sw-radius':(t.radius ?? 14) + 'px',
    '--shadow':t.shadow ? (dark ? '0 4px 18px rgba(0,0,0,.45)' : '0 1px 2px rgba(50,36,10,.08),0 6px 18px rgba(50,36,10,.12)') : 'none',
    '--sw-tshadow':t.tshadow ? '0 0 2px #000,0 1px 3px rgba(0,0,0,.9),0 0 8px rgba(0,0,0,.6)' : 'none',
  };
  const f = STREAM_FONTS[t.font], ti = STREAM_FONTS[t.title];
  if (f && f[1]) v['--sans'] = f[1];
  if (ti && ti[2]) v['--serif'] = ti[2];
  return v;
}

/* Réglages d'apparence (thème personnalisé, ou apparence propre à un widget) ; m : expression de l'objet réglé. */
const streamThemeFields = m => `
  <div class="swp-theme">
    <label class="swp-row">Fond des cadres <input type="color" v-model="${m}.panel"><input type="range" min="0" max="100" v-model.number="${m}.opacity" class="swp-grow" aria-label="Opacité du fond"><small class="swp-val">{{${m}.opacity}} %</small></label>
    <label class="swp-row">Texte <input type="color" v-model="${m}.text"><span class="swp-sp"></span>Accent <input type="color" v-model="${m}.accent"></label>
    <label class="swp-row"><input type="checkbox" :checked="${m}.border > 0" @change="${m}.border = $event.target.checked ? 1 : 0">Bordure
      <input v-if="${m}.border > 0" type="color" v-model="${m}.line"><input v-if="${m}.border > 0" type="number" min="1" max="8" v-model.number="${m}.border" class="swp-num swp-small" aria-label="Épaisseur de la bordure"><small v-if="${m}.border > 0" class="swp-val">px</small></label>
    <label class="swp-row">Arrondi <input type="range" min="0" max="32" v-model.number="${m}.radius" class="swp-grow"><small class="swp-val">{{${m}.radius}} px</small></label>
    <div class="swp-row"><label class="check"><input type="checkbox" v-model="${m}.shadow">Ombre</label>
      <label class="check" title="Contour sombre autour du texte : lisible sur l'image du jeu, sans cadre"><input type="checkbox" v-model="${m}.tshadow">Contour du texte</label></div>
    <label class="swp-row">Police <select v-model="${m}.font" class="sel swp-grow"><option v-for="(f, k) in STREAM_FONTS" :key="k" :value="k">{{f[0]}}</option></select></label>
    <label class="swp-row">Titres <select v-model="${m}.title" class="sel swp-grow"><option v-for="(f, k) in STREAM_FONTS" :key="k" :value="k">{{f[0]}}</option></select></label>
  </div>`;

// tailles de toile proposées (la toile est mise à l'échelle de la fenêtre, sauf « fit » à false : 100 %)
const STREAM_CANVAS = [['1920x1080', 'Full HD — 1920 × 1080'], ['1280x720', 'HD — 1280 × 720'], ['2560x1440', 'QHD — 2560 × 1440'],
  ['3840x2160', '4K — 3840 × 2160'], ['1080x1920', 'Vertical — 1080 × 1920'], ['custom', 'Personnalisée']];
const streamProfile = (id, name) => ({ id, name, bg:'#00b140', color:'#00b140', canvas:{ w:1920, h:1080 }, fit:true,
  theme:'app', custom:streamThemeTokens('dark'), widgets:streamWidgetsDefault() });
// disposition complétée (toile : 1920 × 1080 mise à l'échelle pour celles d'avant) et widgets nettoyés
function streamCleanProfile(p){
  const c = p.canvas || {};
  p.canvas = { w:Math.min(7680, Math.max(200, +c.w || 1920)), h:Math.min(7680, Math.max(200, +c.h || 1080)) };
  if (typeof p.fit !== 'boolean') p.fit = true;
  if (p.theme !== 'custom' && !STREAM_THEMES[p.theme]) p.theme = 'app';   // dispositions d'avant : couleurs de l'appli
  p.custom = { ...streamThemeTokens('dark'), ...(p.custom || {}) };
  p.widgets = streamCleanWidgets(p.widgets);
  return p;
}
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
      v.profiles.forEach(streamCleanProfile);
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
<div v-if="STREAM" class="stream" :class="{editing:swEdit}" :style="{background:streamBg}"
  @pointermove="swMove" @pointerup="swUp" @pointercancel="swUp" @pointerdown.self="swSel = null">
  <!-- toile : taille de la disposition, mise à l'échelle de la fenêtre (swScale) -->
  <div class="sw-stage" :class="{'show-grid':swEdit && ss.ed.showGrid}" @pointerdown.self="swSel = null"
    :style="{width:sp.canvas.w + 'px', height:sp.canvas.h + 'px', transform:'scale(' + swScale + ')', '--sw-grid':ss.ed.grid + 'px', ...swThemeVars}">
  <div v-for="w in sp.widgets" v-show="swEdit || !w.hidden" :key="w.id" :data-sw="w.id" class="sw"
    :class="['sw-' + w.type, {sel:swEdit && swSel===w.id, framed:w.frame, locked:w.locked, ghost:w.hidden}]"
    :style="{left:w.x + 'px', top:w.y + 'px', width:w.w + 'px', height:STREAM_TYPES[w.type].free ? w.h + 'px' : null, ...(w.style ? swWidgetVars(w) : {})}">
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
  </div>

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
          <option value="#ff00ff">Magenta</option><option value="theme">Fond du thème</option><option value="custom">Autre couleur</option></select>
          <input v-if="sp.bg==='custom'" type="color" v-model="sp.color" aria-label="Couleur du fond"></label>
      </section>

      <section class="swp-sec">
        <h4>Taille de la toile</h4>
        <select class="sel" :value="swPreset" @change="swSetPreset($event.target.value)" aria-label="Taille de la toile">
          <option v-for="c in STREAM_CANVAS" :key="c[0]" :value="c[0]">{{c[1]}}</option></select>
        <div v-if="swPreset === 'custom'" class="swp-geo">
          <label>Larg.<input type="number" class="swp-num" min="200" max="7680" :value="sp.canvas.w" @change="sp.canvas.w = Math.min(7680, Math.max(200, +$event.target.value || 1920))"></label>
          <label>Haut.<input type="number" class="swp-num" min="200" max="7680" :value="sp.canvas.h" @change="sp.canvas.h = Math.min(7680, Math.max(200, +$event.target.value || 1080))"></label></div>
        <label class="check"><input type="checkbox" v-model="sp.fit">Ajuster à la fenêtre (affichée à {{Math.round(swScale * 100)}} %)</label>
        <div class="swp-row"><button type="button" class="btn" title="Pour une capture OBS la plus nette : la fenêtre à la taille exacte de la toile (100 %)" @click="swFitWindow">Fenêtre à la taille de la toile</button></div>
        <p v-if="swFitMsg" class="swp-note">{{swFitMsg}}</p>
      </section>

      <section class="swp-sec">
        <h4>Thème</h4>
        <select v-model="sp.theme" class="sel" aria-label="Thème de la disposition">
          <option v-for="(t, k) in STREAM_THEMES" :key="k" :value="k">{{t.label}}</option><option value="custom">Personnalisé</option></select>
        <p v-if="swTheme.opacity > 0 && swTheme.opacity < 100 && swChroma" class="swp-note swp-warn">Fond des cadres semi-transparent sur un fond
          d'incrustation : il se teinte de la couleur du fond, que l'incrustation d'OBS ne rend pas transparente. Préférez un
          fond opaque (100 %) ou sans fond (0 %).</p>
        <template v-if="sp.theme === 'custom'">
          <label class="swp-row">Partir de <select class="sel swp-grow" value="" @change="swThemeFrom($event.target.value); $event.target.value = ''">
            <option value="" disabled>un thème…</option><option v-for="(t, k) in STREAM_THEMES" :key="k" :value="k">{{t.label}}</option></select></label>
          ${streamThemeFields('sp.custom')}
        </template>
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
        <label class="check" title="Réglages d'apparence de ce widget seul, à la place du thème de la disposition"><input type="checkbox" :checked="!!swSelW.style" @change="swOwnStyle(swSelW, $event.target.checked)">Apparence propre à ce widget</label>
        <template v-if="swSelW.style">${streamThemeFields('swSelW.style')}</template>
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
  /* Thème : réglages de la disposition (prédéfini, ou personnalisé) → variables CSS de la toile ; un widget à apparence
     propre a les siennes. « app » suit le thème de l'appli (réglage de la fenêtre principale, sinon le système). */
  const mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null, sysDark = ref(!!mqDark?.matches);
  mqDark?.addEventListener?.('change', e => { sysDark.value = e.matches; });
  const appDark = computed(() => store.ui.theme === 'dark' || store.ui.theme !== 'light' && sysDark.value);
  const swTheme = computed(() => sp.value.theme === 'custom' ? { ...STREAM_THEME_BASE, ...sp.value.custom } : streamThemeTokens(sp.value.theme, appDark.value));
  const swThemeVars = computed(() => streamVars(swTheme.value));
  const swWidgetVars = w => streamVars({ ...swTheme.value, ...w.style });
  // « Fond du thème » : celui du thème de la disposition (pas celui de la fenêtre principale)
  const streamBg = computed(() => sp.value.bg === 'theme' ? streamThemeBg(swTheme.value) : sp.value.bg === 'custom' ? sp.value.color : sp.value.bg);
  const swChroma = computed(() => sp.value.bg === '#00b140' || sp.value.bg === '#ff00ff');   // fond d'incrustation
  function swThemeFrom(k){ if (STREAM_THEMES[k]) sp.value.custom = streamThemeTokens(k, appDark.value); }
  // apparence propre : part du thème de la disposition ; décochée : le widget reprend le thème
  function swOwnStyle(w, on){ if (on) w.style = { ...swTheme.value }; else delete w.style; }
  /* Toile : taille de la disposition, affichée à l'échelle de la fenêtre (fit) ou à 100 % ; « Fenêtre à la taille de la
     toile » redimensionne la fenêtre de stream (ouverte par window.open : le navigateur l'autorise) */
  const winSize = reactive({ w:window.innerWidth, h:window.innerHeight }), swFitMsg = ref('');
  if (STREAM) window.addEventListener('resize', () => { winSize.w = window.innerWidth; winSize.h = window.innerHeight; });
  const swScale = computed(() => sp.value.fit ? Math.min(winSize.w / sp.value.canvas.w, winSize.h / sp.value.canvas.h) : 1);
  const swCustom = ref(false);   // « Personnalisée » choisie (champs de taille affichés même sur une taille proposée)
  watch(() => ss.active, () => { swCustom.value = false; });
  const swPreset = computed(() => { const k = sp.value.canvas.w + 'x' + sp.value.canvas.h;
    return !swCustom.value && STREAM_CANVAS.some(c => c[0] === k) ? k : 'custom'; });
  function swSetPreset(k){
    swCustom.value = k === 'custom';
    if (k !== 'custom'){ const [w, h] = k.split('x').map(Number); sp.value.canvas = { w, h }; }
  }
  function swFitWindow(){
    const c = sp.value.canvas;
    window.resizeTo(c.w + window.outerWidth - window.innerWidth, c.h + window.outerHeight - window.innerHeight);
    setTimeout(() => {
      swFitMsg.value = window.innerWidth === c.w && window.innerHeight === c.h ? ''
        : `La fenêtre fait ${window.innerWidth} × ${window.innerHeight} : le navigateur ou l'écran limite sa taille (ouvrez-la depuis le bouton « Fenêtre de stream » de l'appli).`;
    }, 400);
  }
  const swLayers = computed(() => [...sp.value.widgets].reverse());
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
    const W = sp.value.canvas.w, H = sp.value.canvas.h;
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
    const k = swScale.value || 1, dx = (ev.clientX - d.x0) / k, dy = (ev.clientY - d.y0) / k, guides = [];
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
        ss.profiles.push(streamCleanProfile({ ...streamProfile(id, ''), bg:p.bg || '#00b140', color:p.color || '#00b140',
          canvas:p.canvas, fit:p.fit, theme:p.theme, custom:p.custom, name:freeName(p.name || f.name.replace(/\.json$/i, '')), widgets:p.widgets }));
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
  return { STREAM_THEMES, STREAM_FONTS, swTheme, swChroma, swThemeVars, swWidgetVars, swThemeFrom, swOwnStyle,
    STREAM, STREAM_TYPES, STREAM_CATS, STREAM_CANVAS, swScale, swPreset, swSetPreset, swFitWindow, swFitMsg, ss, sp, swEdit, swSel, swHint, swGuides, swMsg, swSelW, swLayers, streamBg, swBodyStyle,
    swDown, swMove, swUp, swNew, swDup, swDelete, swLayer, swReset, swImage, swUndo, swRedo, swCanUndo, swCanRedo,
    swProfileNew, swProfileDup, swProfileDel, swExport, swImport };
}
