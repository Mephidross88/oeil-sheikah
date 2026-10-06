/* ---------- Page Routeur : trajet le plus court entre deux sorties (js/logic.js routeGraph, js/entrances.js shortest) ; objets d'une étape, objets trouvés ou vus en boutique (icônes). ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const ROUTER_SIDE_TPL = `
    <section v-if="shown('router')" class="side-sec compact" :style="{order:paneOf('router')==='side' ? 2 : 1}">
      <div v-if="splitOn" class="side-title side-page">Routeur</div>
      <label class="check" title="Coût total dans le résumé et coût de chaque étape (réglables dans Configuration)"><input type="checkbox" v-model="ui.router.showCost">Afficher les coûts</label>
      <label class="check" title="Départ et arrivée : ne proposer que les sorties accessibles d'après la logique (entrées notées ou d'origine, objets notés)"><input type="checkbox" v-model="ui.router.onlyReachable">Seulement les lieux accessibles</label>
      <label class="check" title="Bandeau en bas de page : prochaine étape du trajet et checks faisables les plus proches"><input type="checkbox" v-model="ui.next.enabled">Bandeau « Où aller ? »</label>
    </section>
`;

const ROUTER_TPL = `
    <section v-if="shown('router')" class="pane" :class="'pane-' + paneOf('router')">
      <div v-if="paneOf('router')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Routeur</h1><p class="lede">Chemin le plus court entre deux sorties, selon ce que vous avez découvert et l'état de la partie.</p></div>
      <div class="rform">
        <div class="rline">
          <div class="rtag" :class="{live:liveStart}" :title="liveStart ? 'Départ suivi en direct : la sortie où vous êtes, d’après le jeu' : null">{{liveStart ? 'Position actuelle' : 'Départ'}}</div>
          <div class="field"><label for="fa">Zone</label>
            <select id="fa" class="sel" v-model="ui.router.fromArea"><option value="" disabled>Choisir une zone</option>
              <option v-for="a in pickAreas(ui.router.fromArea)" :key="a.id" :value="a.id">{{a.name}}</option></select></div>
          <div class="field"><label for="fe">Sortie</label>
            <select id="fe" class="sel" v-model="ui.router.fromExit" :disabled="!ui.router.fromArea"><option value="" disabled>Choisir une sortie</option>
              <option v-for="e in pickExits(ui.router.fromArea, ui.router.fromExit)" :key="e.key" :value="e.key" :title="e.soh">{{e.label}}</option></select></div>
          <div class="field agebox"><span class="lbl">Âge</span><seg v-model="ui.router.fromAge" :options="[['child','Enfant'],['adult','Adulte']]"></seg></div>
          <button type="button" class="btn rme" :disabled="!myPos" @click="startAtMe"
            :title="myPos ? 'Partir de votre position : ' + areaName(myPos.key) + ' · ' + EXIT[myPos.key].label + (ui.link.live && link.live ? ' (sortie la plus proche de Link)' : ' (dernière entrée prise)') : 'Position inconnue : activez l’auto-tracking (fenêtre Auto-tracking)'"><span v-html="ICONS.live"></span>Ma position</button>
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
            <div><b>{{route.transitions}}</b><span>{{tn(route.transitions, 'transition', 'transitions')}}</span></div></div>
          <div class="rstat warp" v-if="route.warps"><span class="rstat-ic"><img src="icons/exits/warp.png" alt=""></span>
            <div><b>{{route.warps}}</b><span>{{tn(route.warps, 'chant de téléportation', 'chants de téléportation')}}</span></div></div>
          <div class="rstat reset" v-if="route.resets"><span class="rstat-ic"><img src="icons/route/reset.png" alt=""></span>
            <div><b>{{route.resets}}</b><span>{{tn(route.resets, 'rechargement', 'rechargements')}}</span></div></div>
          <div class="rstat agechg" v-if="route.ages"><span class="rstat-ic"><img src="icons/route/age_child_to_adult.png" alt=""></span>
            <div><b>{{route.ages}}</b><span>{{tn(route.ages, 'changement d’âge', 'changements d’âge')}}</span></div></div>
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
              <div class="role" v-if="it.start || it.end || liveStart && it.next">{{it.start && it.end ? (liveStart ? 'Position actuelle et arrivée' : 'Départ et arrivée') : it.start ? (liveStart ? 'Position actuelle' : 'Départ') : it.end ? 'Arrivée' : 'Prochaine destination'}}</div>
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
                <!-- « Reprendre » seulement pour l'entrée par laquelle on vient d'arriver (position suivie) : sinon, en direct, le
                     départ n'est que la sortie la plus proche de Link -->
                <b>{{liveStart && link.position && link.position.key === it.key ? 'Reprendre' : 'Prendre'}} cette sortie</b>
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
`;

function useRouterPage(ctx){
  const { go, s, ui } = ctx;
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
  /* « Ma position » (départ du Routeur) : la sortie la plus proche de Link (position en temps réel), sinon la dernière
     entrée prise (auto-tracking) ; âge de Link si connu */
  const myPos = computed(() => {
    const L = ui.link.live && link.live, near = L && linkNearestExit(L);
    if (near) return { key:near.k, age:L.age === 1 ? 'child' : L.age === 0 ? 'adult' : link.position?.age || ui.router.fromAge };
    return link.position && EXIT[link.position.key] ? { key:link.position.key, age:link.position.age || ui.router.fromAge } : null;
  });
  const startAtMe = () => { const p = myPos.value; if (p) setStart(p.key, p.age); };
  // « Y aller » d'une sortie (page Entrées) : arrivée du Routeur, à n'importe quel âge
  function goExit(key){ const r = ui.router; r.toArea = EXIT[key].areaId; r.toAge = 'any'; nextTick(() => { r.toExit = key; }); go('router'); }
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
  const edgeLabel = e => ({ walk:t('À pied'), transition:t('Transition'), bluewarp:t('Téléporteur bleu'), owl:t('Vol du hibou'),
    warp:EXIT[e.warp]?.label || t('Chant'), reset:t('Sauvegarder et recharger') }[e.kind]);   // chant : les notes autour suffisent
  // Objets d'une étape (routeGraph.needs) : icônes des objets retenus et alternatives (texte de l'infobulle).
  function reqsOf(e){
    const n = routeC.value.needs(e);
    // chant de téléportation : déjà indiqué par la pastille
    const icons = reqIcons(n.items).filter(r => !(e.kind === 'warp' && r.key === WARP_SONGS[e.warp]));
    const names = rgs => reqIcons(rgs).map(r => r.title).join(' + ');
    const alts = [...new Set(n.alts.filter(a => names(a.instead) && names(a.alt)).map(a => t('{alt} (au lieu de {instead})', { alt:names(a.alt), instead:names(a.instead) })))];
    return { icons, alts, altTitle:alts.length ? t('Autres possibilités :') + '\n' + alts.map(a => '• ' + a).join('\n') : '' };
  }
  // Objet trouvé dans un check (game.found, numéro RandomizerGet) : nom et icône du panneau Objets quand il y en a un,
  // sinon nom français de SoH (âmes de haricot : nom de la check-list).
  function foundInfo(n){
    if (typeof n === 'string') return { title:n };   // nom du spoiler sans objet SoH reconnu
    const name = LINK_DATA.rg[n], rg = 'RG_' + name, icon = reqIcons([rg])[0];
    if (icon) return icon;
    if (SOH_BEAN_SOUL[rg]) return { title:t('Âme de haricot : {name}', { name:CHECKLISTS.beans.locations.find(l => l.id === SOH_BEAN_SOUL[rg]).label }) };
    return { title:td(LINK_DATA.rgFr[n], LINK_DATA.rgEn?.[n]) || (name || '?').toLowerCase().replace(/_/g, ' ') };
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
      try { data = JSON.parse(reader.result); } catch (e){ linkLog(t('Spoiler illisible : ce n’est pas un JSON valide')); return; }
      if (!data || typeof data.locations !== 'object'){ linkLog(t('Ce fichier n’est pas un spoiler SoH (pas de « locations »)')); return; }
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
  return { routerAreas, exitsOf, pickAreas, pickExits, setStart, startHere, prevStart, backToPrev, liveStart,
    myPos, startAtMe, goExit, swap, route, edgeLabel, reqsOf, foundInfo, seenInfo, loadSpoilerFile, reqIcons,
    edgeIcon, ageLabel };
}
