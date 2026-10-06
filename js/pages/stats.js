/* ---------- Page Statistiques : chronologie de la partie et temps de jeu. ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const STATS_TPL = `
    <section v-if="shown('stats')" class="pane" :class="'pane-' + paneOf('stats')">
      <div v-if="paneOf('stats')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Statistiques</h1><p class="lede">Chronologie de la partie : objets, chants et checks, à l'heure où ils ont été notés (en direct avec l'auto-tracking).</p>
        <span v-if="store.game.seed.final" class="seed-pill stats-seed" :title="'finalSeed ' + store.game.seed.final + (store.game.seed.file ? ', fichier ' + store.game.seed.file : '')">Seed <b>{{seedLabel(store.game.seed)}}</b></span></div>
      <div class="rsum st-tiles">
        <div class="rstat" title="Temps passé avec le jeu connecté au relais et la partie chargée (le jeu n'envoie pas son propre compteur) : seulement les sessions jouées avec l'auto-tracking"><div><b>{{playNow ? fmtDur(playNow) : '—'}}</b><span>temps de jeu (auto-tracking)</span></div></div>
        <div class="rstat"><div><b>{{checkStats.got}} / {{checkStats.total}}</b><span>checks faits</span></div></div>
        <div class="rstat" v-if="stats.editable"><div><b>{{stats.mapped}} / {{stats.editable}}</b><span>entrées trouvées</span></div></div>
      </div>
      <div v-if="statsC.curve" class="st-chart">
        <div class="st-chart-title">Checks faits au fil du temps de jeu <small>(jusqu'à {{statsC.curve.max}})</small></div>
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
`;

function useStatsPage(ctx){
  const { foundInfo } = ctx;
  /* Statistiques : chronologie de la partie (game.timeline, js/state.js) et compteurs */
  // temps de jeu affiché, qui défile à la seconde pendant qu'on joue (game.play n'est mis à jour que toutes les 10 s)
  const secTick = ref(Date.now());
  setInterval(() => { secTick.value = Date.now(); }, 1000);
  const playNow = computed(() => {
    const play = Array.isArray(store.game.play) ? store.game.play : [], last = play[play.length - 1];
    const total = play.reduce((n, [a, b]) => n + b - a, 0), now = secTick.value;
    // fenêtre de stream (pas de relais) : on joue tant que la fenêtre principale prolonge la période (toutes les 10 s)
    const playing = STREAM_MODE ? last && now - last[1] <= 12000
      : link.status === 'game' && link.client?.isSaveLoaded && !link.foreign && last && now - last[1] <= 30000;
    return total + (playing ? Math.max(0, now - last[1]) : 0);
  });
  const fmtDur = ms => { const t = Math.max(0, Math.round(ms / 1000)); return Math.floor(t / 3600) + ':' + String(Math.floor(t % 3600 / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); };
  const stFilter = ref('items');
  const statsC = computed(() => {
    const g = store.game, tl = Array.isArray(g.timeline) ? g.timeline : [], timed = tl.filter(e => e.t);
    const origin = g.runStart || (timed.length ? Math.min(...timed.map(e => e.t)) : 0);
    // temps de jeu (game.play, auto-tracking) : s'il y en a, les heures et la courbe sont en temps de jeu
    const play = Array.isArray(g.play) ? g.play : [], playTotal = play.reduce((n, [a, b]) => n + b - a, 0);
    const playAt = t => play.reduce((n, [a, b]) => n + Math.max(0, Math.min(b, t) - a), 0), usePlay = playTotal > 0;
    const atOf = t => !t ? null : usePlay ? fmtDur(playAt(t)) : origin ? fmtDur(t - origin) : null;
    const rows = tl.map((e, i) => {
      if (e.k === 'checks'){
        const c = CHECK_BY_ID[e.id];
        return { i, k:e.k, at:atOf(e.t), label:c ? c.label + ' · ' + CHECK_AREA[c.area].label : e.id,
          icon:c && CHECK_CAT[c.cat].icon, found:g.found[e.id] !== undefined ? foundInfo(g.found[e.id]).title : '' };
      }
      const it = ITEM_BY_KEY[e.id];
      return { i, k:e.k, at:atOf(e.t), label:it ? itemLabelAt(it, e.v) : e.id, icon:it ? itemIconAt(it, e.v) : null, found:'' };
    }).reverse();
    // courbe en escalier : checks faits au fil du temps de jeu (ceux d'avant le suivi au départ) ; sans temps de jeu, pas
    // de courbe
    const ck = timed.filter(e => e.k === 'checks').map(e => e.t).sort((a, b) => a - b);
    let curve = null;
    if (usePlay && ck.length){
      const span = Math.max(1, playTotal), start = tl.filter(e => e.k === 'checks' && !e.t).length;
      const max = Math.max(1, start + ck.length), W = 600, H = 150, x = t => playAt(t) / span * W, y = n => H - n / max * H;
      let d = 'M0,' + y(start).toFixed(1), n = start;
      for (const t of ck){ d += ' H' + x(t).toFixed(1) + ' V' + y(++n).toFixed(1); }
      curve = { d:d + ' H' + W, area:d + ' H' + W + ' V' + H + ' H0 Z', end:fmtDur(playTotal), max };
    }
    return { origin, playTotal, rows, curve };
  });
  const statsRows = computed(() => statsC.value.rows.filter(r => stFilter.value === 'all' || (stFilter.value === 'checks' ? r.k === 'checks' : r.k !== 'checks')));
  return { secTick, playNow, fmtDur, stFilter, statsC, statsRows };
}
