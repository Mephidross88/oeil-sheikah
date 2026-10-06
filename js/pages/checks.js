/* ---------- Page Checks : checks de la seed par zone, filtres, compteurs, « pourquoi pas faisable », prix des boutiques, pestes et marchands. ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const CHECKS_SIDE_TPL = `
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
`;

const CHECKS_TPL = `
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

      <div v-if="!checkList.length" class="empty"><b>Aucun check à afficher.</b>
        {{ui.checks.q ? 'Aucun résultat pour cette recherche.' : 'Vérifiez la Configuration ou les filtres.'}}</div>
      <template v-for="x in checkList" :key="x.area.id">
      <div v-if="x.isHere" class="here-label" title="Zone de Link, d’après l’auto-tracking"><span v-html="ICONS.live"></span>Vous êtes ici</div>
      <article class="area check-area" :id="'carea-'+x.area.id"
        :class="['st-' + x.state, {'here-zone':x.isHere, collapsed:ui.checks.collapsed[x.area.id], complete:x.complete, 'hint-woth':hintsC.woth[x.area.id], 'hint-foolish':hintsC.foolish[x.area.id]}]">
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
            <span class="zn"><b>{{x.got}}</b><small>{{tn(x.got, 'fait', 'faits')}}</small></span>
            <span class="zn acc"><b>{{x.accessible}}</b><small>{{tn(x.accessible, 'accessible', 'accessibles')}}</small></span>
            <span class="zn"><b>{{x.total}}</b><small>total</small></span></span>
        </button>
        <div v-if="!ui.checks.collapsed[x.area.id]" class="check-body">
          <p v-if="x.hiddenQuest" class="quest-note">{{tn(x.hiddenQuest, 'Version du donjon inconnue : {n} check propre à la version Vanilla ou Master Quest est masqué.', 'Version du donjon inconnue : {n} checks propres à la version Vanilla ou Master Quest sont masqués.')}}
            Indiquez la version avec le badge « ? » (ou dans le panneau Objets).</p>
          <ul v-if="x.checks.length" class="check-list-grid">
            <li v-for="c in x.checks" :key="c.id" class="check-item"
              :class="{done:store.game.checks[c.id], excluded:s.excluded[c.id], avail:!store.game.checks[c.id] && canNow(c), locked:!store.game.checks[c.id] && !canNow(c)}">
              <button type="button" class="ci-main" :title="checkLogicTitle(c)" @click="toggleCheck(c)">
                <span class="ci-cat"><img v-if="!brokenIcons[CHECK_CAT[c.cat].icon]" :src="CHECK_CAT[c.cat].icon" alt="" @error="brokenIcons[CHECK_CAT[c.cat].icon]=true"><span v-else class="cat-fallback" :style="{'--cc':CHECK_CAT[c.cat].color}">{{CHECK_CAT[c.cat].label[0]}}</span></span>
                <span class="ci-label">{{c.label}}<span v-if="hintsC.checks[c.id]" class="ci-hint" :title="'Indice : ' + hintsC.checks[c.id].join(' · ')" v-html="ICONS.hint"></span><span v-if="ui.checks.showFound && store.game.found[c.id] !== undefined" class="ci-found"
                  :title="'Objet trouvé : ' + foundInfo(store.game.found[c.id]).title"><img v-if="foundInfo(store.game.found[c.id]).src" :src="foundInfo(store.game.found[c.id]).src" alt="">{{foundInfo(store.game.found[c.id]).title}}</span><span
                  v-else-if="ui.checks.showFound && store.game.seen[c.id]" class="ci-found seen" :title="'En vente : ' + seenInfo(store.game.seen[c.id]).title"><img
                  v-if="seenInfo(store.game.seen[c.id]).src" :src="seenInfo(store.game.seen[c.id]).src" alt="">{{seenInfo(store.game.seen[c.id]).title}}</span></span>
                <span v-if="timeOf(lg(c).ever)" class="time-mark" :class="timeOf(lg(c).ever)">{{timeOf(lg(c).ever) === 'night' ? '☾' : '☀'}}</span>
                <span v-if="lg(c).age" class="age-pill" :class="lg(c).age">
                  <i v-if="lg(c).age !== 'adult'" :class="{now:lg(c).now & CHILD}">E</i><i v-if="lg(c).age !== 'child'" :class="{now:lg(c).now & ADULT}">A</i></span>
                <span v-else class="age-pill never">—</span>
                <span class="cr-mark" v-html="store.game.checks[c.id] ? ICONS.check : ICONS.circleO"></span></button>
              <template v-if="PRICE_TYPES.has(c.type) && !store.game.checks[c.id]">
                <input v-if="priceEdit === c.id" :ref="focusEl" class="ci-price-in" type="number" min="0" max="999" step="5" placeholder="Prix"
                  :value="store.game.prices[c.id] ?? ''" aria-label="Prix en rubis" @keydown.enter="$event.target.dataset.cancel = '1'; setPrice(c, $event.target.value)"
                  @keydown.esc="$event.target.dataset.cancel = '1'; priceEdit = null" @blur="$event.target.dataset.cancel || setPrice(c, $event.target.value)">
                <button v-else type="button" class="ci-ex ci-price" :class="{known:store.game.prices[c.id] != null, over:priceOver(c)}" :title="priceTitle(c)"
                  @click="priceEdit = c.id">{{store.game.prices[c.id] != null ? store.game.prices[c.id] : '?'}}<small>₹</small></button>
              </template>
              <button v-if="!store.game.checks[c.id] && !canNow(c)" type="button" class="ci-ex ci-go" title="Pourquoi ce check n’est pas faisable ?" v-html="ICONS.why" @click="openWhy(c)"></button>
              <button v-if="!store.game.checks[c.id]" type="button" class="ci-ex ci-go" title="Y aller (Routeur, depuis le départ actuel)" v-html="ICONS.router" @click="goToCheck(c)"></button>
              <button type="button" class="ci-ex" :title="s.excluded[c.id] ? 'Réintégrer ce check' : 'Exclure ce check (ne compte plus)'"
                @click="toggleExcluded(c)">{{s.excluded[c.id] ? '↺' : '⊘'}}</button>
            </li>
          </ul>
          <p v-else class="quest-note">{{x.total ? 'Tous les checks affichés de cette zone sont faits.' : x.state === 'ignored' ? tn(x.excluded, 'Zone ignorée : {n} check exclu (↺ pour la réintégrer).', 'Zone ignorée : {n} checks exclus (↺ pour la réintégrer).') : 'Aucun check avec les filtres actuels.'}}</p>
        </div>
      </article>
      <div v-if="x.isHere && checkList.length > 1" class="here-sep"><span>Autres zones</span></div>
      </template>
      <div v-if="lastCheck || goMsg" class="toast" role="status">
        <template v-if="goMsg">{{goMsg}}</template>
        <template v-else>{{lastCheck.text}}
          <button type="button" @click="undoCheck"><span v-html="ICONS.undo"></span>Annuler</button></template>
      </div>
    </section>
`;

const WHY_MODAL_TPL = `
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
`;

function useChecksPage(ctx){
  const { MAPS_OK, go, mapAreas, modal, s, shown, ui } = ctx;
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
  const AGE_FR = { child:t('enfant'), adult:t('adulte'), both:t('enfant ou adulte') };
  function timeOf(bits){
    const day = bits & (CD | AD), night = bits & (CN | AN);
    return day && !night ? 'day' : night && !day ? 'night' : null;
  }
  function checkLogicTitle(c){
    const x = lg(c), lines = [CHECK_CAT[c.cat].label + ' — ' + c.soh];
    if (!x.ever) lines.push(t('Jamais faisable selon la logique avec la configuration actuelle.'));
    else {
      const tm = timeOf(x.ever);
      lines.push(t('Âge : {age}', { age:AGE_FR[x.age] }) + (tm ? (tm === 'night' ? t(', de nuit') : t(', de jour')) : ''));
      lines.push(x.now ? t('Faisable maintenant : {age}', { age:AGE_FR[ageOfBits(x.now)] }) + (timeOf(x.now) === 'night' ? t(' (de nuit)') : timeOf(x.now) === 'day' ? t(' (de jour)') : '')
        : t('Pas encore faisable avec l’inventaire actuel.'));
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
    return (condIndex['RC_' + c.id] || []).map(([name, fn]) => t('Logique ({name}) : {cond}', { name, cond:pretty(fn) }));
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
  // zone ignorée (tout ce qui reste à faire est exclu) : listée seulement avec « Afficher les checks exclus », pour la réintégrer
  /* Zone de Link (auto-tracking, jeu connecté : position en temps réel, sinon dernière entrée prise) : placée en tête de
     la page Checks, à part (même si les filtres la masqueraient : zone terminée…) ; null sans suivi. */
  const hereCheckArea = computed(() => {
    if (!ui.link.enabled || link.status !== 'game') return null;
    const L = ui.link.live && link.live, live = L && MAPS_OK && mapAreas.find(a => MAP_SCENES[a.id].includes(L.scene));
    const id = (live ? live.id : link.position?.key && EXIT[link.position.key]?.areaId || '').toUpperCase();
    return CHECK_AREA[id] ? id : null;
  });
  const checkList = computed(() => {
    const here = hereCheckArea.value, hx = here && allCheckAreasC.value.find(x => x.area.id === here);
    return hx ? [{ ...hx, isHere:true }, ...checkAreasC.value.filter(x => x.area.id !== here)] : checkAreasC.value;
  });
  const checkAreasC = computed(() => { const q = cf.q.trim();
    return allCheckAreasC.value.filter(x => (cf.showExcluded || !(x.excluded && x.got === x.total))
      && (q || cf.onlyAvailable ? x.checks.length : (x.total || x.hiddenQuest || x.excluded) && !(cf.hideDoneZones && x.complete))); });
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
    return { got, total, avail, groups:[[t('Overworld'), ow.got, ow.total], [t('Donjons'), dg.got, dg.total]].filter(g => g[2]),
      sub:tn(left, '{n} restant', '{n} restants') + ' · ' + tn(avail, '{n} faisable', '{n} faisables') + ' · ' + t('{done} / {n} zones terminées', { done:zonesDone, n:zl.length }) };
  });
  // Compteurs des pastilles de catégorie : restants / total parmi les checks listés (hors filtre de catégorie).
  const catCounts = computed(() => {
    const done = store.game.checks, ex = s.excluded, r = {};
    CHECK_CATS.forEach(k => { r[k.id] = { left:0, total:0 }; });
    for (const c of CHECKS) if (!ex[c.id] && ageOn(c) && checkListed(c)){ r[c.cat].total++; if (!done[c.id]) r[c.cat].left++; }
    return r;
  });
  const toggleCat = id => { cf.hiddenCats[id] = !cf.hiddenCats[id]; };
  const zoneTitle = x => ({ done:t('Zone terminée'), all:t('Tout le reste est accessible'), part:t('Une partie du reste est accessible'),
    none:x.total ? t('Rien d’accessible pour l’instant') : t('Rien à faire'), ignored:t('Zone ignorée (checks exclus)') })[x.state]
    + ' — ' + tn(x.got, '{n} fait', '{n} faits') + ', ' + tn(x.accessible, '{n} accessible', '{n} accessibles') + ', ' + t('{n} au total', { n:x.total });
  // clic droit sur une pastille : n'afficher que cette catégorie (ou tout réafficher si c'était déjà le cas)
  function soloCat(id){
    const only = CHECK_CATS.every(k => k.id === id ? !cf.hiddenCats[k.id] : cf.hiddenCats[k.id]);
    CHECK_CATS.forEach(k => { cf.hiddenCats[k.id] = only ? false : k.id !== id; });
  }
  const allCats = on => CHECK_CATS.forEach(k => { cf.hiddenCats[k.id] = !on; });
  const CHECK_AGES = [['all', t('Tous')], ['child', t('Enfant')], ['adult', t('Adulte')]];
  const ageLabelShort = { child:t('E'), adult:t('A'), both:t('E·A') };
  const checkGroups = computed(() => [[t('Overworld'), checkAreasC.value.filter(x => !x.area.dungeon)],
    [t('Donjons'), checkAreasC.value.filter(x => x.area.dungeon)]].filter(g => g[1].length));
  const toggleCheckArea = id => { cf.collapsed[id] = !cf.collapsed[id]; };
  // Cocher / décocher ou exclure / réintégrer un check, avec « Annuler » pendant quelques secondes (clic malencontreux).
  const lastCheck = ref(null);
  let lastCheckTimer = null;
  const CHECK_ACTIONS = { done:{ set:setCheck, get:id => !!store.game.checks[id], on:'« {name} » coché', off:'« {name} » décoché' },
    excluded:{ set:setExcluded, get:id => !!s.excluded[id], on:'« {name} » exclu', off:'« {name} » réintégré' } };
  function toggleCheckState(c, kind){
    const a = CHECK_ACTIONS[kind], was = a.get(c.id);
    a.set(c.id, !was);
    lastCheck.value = { id:c.id, kind, was, text:t(was ? a.off : a.on, { name:c.label }) };
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
    lastCheck.value = { ids, was:mode === 'include', text:x.area.label + ' : ' + (mode === 'exclude' ? tn(ids.length, '{n} check exclu', '{n} checks exclus') : tn(ids.length, '{n} check réintégré', '{n} checks réintégrés')) };
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
    if (!found){ goMsg.value = t('Aucune sortie connue ne mène là pour l’instant.'); setTimeout(() => { goMsg.value = ''; }, 5000); return; }
    r.toArea = EXIT[found.key].areaId; r.toExit = found.key; r.toAge = age || 'any';
    go('router');
  }
  function goToCheck(c){
    const regs = new Set(CHECK_REGIONS['RC_' + c.id] || []), now = lg(c).now || 0;
    const age = (now & CHILD) && !(now & ADULT) ? 'child' : (now & ADULT) && !(now & CHILD) ? 'adult' : null;
    routeTo((k, a, m) => (!age || a === age) && [...routeC.value.regions(k, a, m).keys()].some(rr => regs.has(rr)), age);
  }
  /* Prix des boutiques, pestes Mojo et marchands (game.prices) : connu quand le jeu identifie l'objet (curseur en boutique ;
     pestes et marchands avec « Scrub / Merchant Hint Text », spoiler caché), ou noté à la main ; la logique le compare
     à la bourse. Champ de saisie : Entrée ou clic ailleurs enregistre, vide efface, Échap annule. */
  const PRICE_TYPES = new Set(['SHOP', 'SCRUB', 'MERCHANT']), WALLET_CAP = [0, 99, 200, 500, 999, 999];
  const priceEdit = ref(null);
  function setPrice(c, v){
    const n = parseInt(v, 10);
    if (Number.isFinite(n) && n >= 0) store.game.prices[c.id] = Math.min(n, 999); else delete store.game.prices[c.id];
    priceEdit.value = null;
  }
  const priceOver = c => store.game.prices[c.id] > (WALLET_CAP[store.game.items.wallet] ?? 999);
  function priceTitle(c){
    const p = store.game.prices[c.id];
    return p == null ? t('Prix inconnu : cliquer pour noter le prix lu en jeu (la logique le comparera à votre bourse)')
      : t('Prix : {p} rubis', { p }) + (priceOver(c) ? t(' — votre bourse ne suffit pas') : '') + t(' (cliquer pour modifier)');
  }
  // focus à l'ouverture du champ seulement (une ref fonction est rappelée à chaque rendu)
  const focused = new WeakSet(), focusEl = el => { if (el && !focused.has(el)){ focused.add(el); nextTick(() => { el.focus(); el.select(); }); } };
  // « Pourquoi ? » : ce qui manque pour un check pas encore faisable (whyLocked, calcul de ~1 s, lancé après affichage)
  const why = reactive({ check:null, res:null });
  function openWhy(c){
    why.check = c; why.res = null; modal.value = 'why';
    setTimeout(() => { if (why.check?.id === c.id) why.res = whyLocked(c.id); }, 30);
  }
  return { cf, ageOfBits, checkLogicC, lg, canNow, catOn, ageOn, ageKnown, AGE_FR, timeOf, checkLogicTitle,
    condIndex, checkConditions, allCheckAreasC, hereCheckArea, checkList, checkAreasC, checkStats, catCounts,
    toggleCat, zoneTitle, soloCat, allCats, CHECK_AGES, ageLabelShort, checkGroups, toggleCheckArea,
    lastCheck, lastCheckTimer, CHECK_ACTIONS, toggleCheckState, toggleCheck, toggleExcluded, undoCheck,
    zoneExcludeMode, zoneExclude, goMsg, routeTo, goToCheck, PRICE_TYPES, WALLET_CAP, priceEdit, setPrice,
    priceOver, priceTitle, focused, focusEl, why, openWhy };
}
