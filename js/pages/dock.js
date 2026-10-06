/* ---------- Bandeau « Où aller ? » (bas de l'écran) : prochaine étape et checks faisables les plus proches du départ du Routeur. ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const DOCK_TPL = `
    <!-- « Où aller maintenant ? » : prochaine étape du trajet en cours et checks faisables les plus proches du départ du Routeur -->
    <div v-if="ui.next.enabled" class="next-dock" :class="{open:ui.next.open}">
      <div class="nd-bar">
        <button type="button" class="nd-toggle" @click="ui.next.open = !ui.next.open" :aria-expanded="ui.next.open"
          :title="ui.next.open ? 'Replier' : 'Déplier : les 12 checks faisables les plus proches'"><span class="nd-ic" v-html="ICONS.compass"></span><b>Où aller ?</b></button>
        <template v-if="dockRoute && !dockRoute.none">
          <span v-if="dockRoute.steps.length" class="nd-step" :class="{click:MAPS_OK}" :title="'Prochaine étape vers ' + (dockRoute.check ? dockRoute.check.label : areaName(dockRoute.exit) + ' · ' + EXIT[dockRoute.exit].label) + (MAPS_OK ? ' — clic : voir sur la carte' : '')"
            @click="MAPS_OK && openMap(dockRoute.steps[0].key)">
            <img v-if="dockRoute.steps[0].icon" :src="dockRoute.steps[0].icon" alt=""><span v-else class="nd-step-ic" v-html="ICONS.uturn"></span>{{dockRoute.steps[0].label}} → <b>{{areaName(dockRoute.steps[0].key)}}</b> · {{EXIT[dockRoute.steps[0].key].label}}</span>
          <span v-else class="nd-step"><span class="nd-step-ic" v-html="ICONS.compass"></span>À pied, dans la zone</span>
        </template>
        <template v-if="dockFollowsRouter">
          <span class="nd-sum" :title="'Destination du Routeur : ' + areaName(ui.router.toExit) + ' · ' + EXIT[ui.router.toExit].label">{{dockRoute && dockRoute.none ? 'Aucun trajet connu vers' : 'Destination'}} : <b>{{areaName(ui.router.toExit)}}</b> · {{EXIT[ui.router.toExit].label}}<small v-if="dockRoute && !dockRoute.none"> ({{stepsLabel(dockRoute.steps.length)}})</small></span>
          <button type="button" class="btn nd-go" title="Ouvrir ce trajet dans le Routeur" @click="go('router')">Routeur</button>
          <button type="button" class="btn nd-go nd-auto" title="Revenir au check le plus proche (le bandeau ne suit plus le Routeur)" @click="dockAuto">Auto</button>
        </template>
        <span v-else-if="!nextC" class="nd-sum">Choisissez un départ dans le Routeur (ou activez la position en direct).</span>
        <span v-else-if="!nextC.list.length" class="nd-sum">Aucun check faisable à portée.</span>
        <template v-else-if="dockCheck">
          <span class="nd-sum" :title="dockCheck.c.soh">{{dockTarget === dockCheck.c.id ? 'Check choisi' : 'Check le plus proche'}} : <b>{{dockCheck.c.label}}</b> · {{CHECK_AREA[dockCheck.c.area].label}} ({{stepsLabel(dockCheck.steps)}})</span>
          <button type="button" class="btn nd-go" title="Ouvrir cette route dans le Routeur" @click="goToCheck(dockCheck.c)">Y aller</button>
          <span class="nd-count">{{tn(nextC.total, '{n} faisable', '{n} faisables')}}</span>
        </template>
        <button type="button" class="nd-btn nd-chev" :title="ui.next.open ? 'Replier' : 'Déplier'" v-html="ICONS.caret" @click="ui.next.open = !ui.next.open"></button>
        <button type="button" class="nd-btn" title="Masquer ce bandeau (à réactiver dans la barre de gauche, page Routeur)" v-html="ICONS.close" @click="ui.next.enabled = false"></button>
      </div>
      <div v-if="ui.next.open && dockRoute && dockRoute.steps.length" class="nd-route">
        <span class="nd-route-t">Route vers <b>{{dockRoute.check ? dockRoute.check.label : areaName(dockRoute.exit) + ' · ' + EXIT[dockRoute.exit].label}}</b> :</span>
        <button v-for="(st, i) in dockRoute.steps" :key="i" type="button" class="nd-rstep" :disabled="!MAPS_OK" :title="MAPS_OK ? 'Voir sur la carte' : ''" @click="openMap(st.key)">
          <i>{{i + 1}}</i><img v-if="st.icon" :src="st.icon" alt=""><span v-else class="nd-step-ic" v-html="ICONS.uturn"></span>
          <span>{{st.label}} → <b>{{areaName(st.key)}}</b> · {{EXIT[st.key].label}}</span></button>
        <span class="nd-route-t">puis à pied jusqu'{{dockRoute.check ? 'au check' : 'à la sortie'}}</span>
      </div>
      <div v-if="ui.next.open && nextC && nextC.list.length" class="nd-list">
        <button v-for="x in nextC.list" :key="x.c.id" type="button" class="nd-card" :class="{on:dockCheck && dockCheck.c.id === x.c.id}"
          :title="(dockTarget === x.c.id ? 'Revenir au check le plus proche' : 'Afficher la route vers ce check') + ' — ' + x.c.soh" @click="pickDock(x.c)">
          <img :src="CHECK_CAT[x.c.cat].icon" alt="">
          <span class="nd-txt"><b>{{x.c.label}}</b><small>{{CHECK_AREA[x.c.area].label}} · {{stepsLabel(x.steps)}}{{x.age === 'adult' ? ' · adulte' : ''}}</small></span>
        </button>
      </div>
    </div>
`;

function useDock(ctx){
  const { catOn, edgeIcon, edgeLabel, s, ui } = ctx;
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
  const stepsLabel = n => n ? tn(n, '{n} étape', '{n} étapes') : t('à pied');
  /* Route du bandeau « Où aller ? », calculée par lui-même (sans passer par le Routeur) : vers sa cible — le check
     faisable le plus proche, ou celui choisi dans sa liste (dockTarget, tant qu'il reste faisable) —, depuis le départ
     du Routeur, à l'âge où le check est le plus proche. Étapes : déplacements autres qu'à pied (sortie à prendre,
     chant, sauvegarder-recharger, changement d'âge), avec la sortie à prendre ou l'arrivée. */
  const dockTarget = ref(null);
  const dockCheck = computed(() => { const l = nextC.value?.list || []; return l.find(x => x.c.id === dockTarget.value) || l[0] || null; });
  // destination du Routeur suivie par le bandeau (mode « router ») : tant qu'on n'y est pas
  const dockFollowsRouter = computed(() => ui.next.follow === 'router' && !!EXIT[ui.router.toExit]);
  const dockRoute = computed(() => {
    const x = dockCheck.value, r = ui.router;
    if (!r.fromExit || !EXIT[r.fromExit]) return null;
    const rg = routeC.value;
    let res, target;
    if (dockFollowsRouter.value){
      res = shortest(rg.edges, r.fromExit, r.fromAge, r.toExit, r.toAge || 'any'); target = { exit:r.toExit };
    } else {
      if (!x) return null;
      const regs = new Set(CHECK_REGIONS['RC_' + x.c.id] || []);
      res = shortest(rg.edges, r.fromExit, r.fromAge, (k, a, m) => a === x.age && [...rg.regions(k, a, m).keys()].some(rr => regs.has(rr)));
      target = { check:x.c };
    }
    if (!res) return target.exit ? { ...target, steps:[], none:true } : null;
    const steps = res.edges.filter(e => e.kind !== 'walk').map(e => {
      if (e.kind === 'age') return { label:e.age === 'adult' ? t('Devenir adulte') : t('Redevenir enfant'), icon:null, key:e.to };
      const take = ['transition', 'bluewarp', 'owl'].includes(e.kind) && EXIT[e.from] ? e.from : null;
      return { label:edgeLabel(e), icon:edgeIcon(e), key:take || e.to, take:!!take, to:e.to };
    });
    return { ...target, steps };
  });
  const pickDock = c => { dockTarget.value = dockTarget.value === c.id ? null : c.id; ui.next.follow = 'auto'; };
  /* Bandeau et Routeur : une destination fixée à la main (page Routeur, « Y aller » de la Carte, des Entrées, des Checks)
     fait suivre le Routeur au bandeau ; « Auto » le remet sur le check le plus proche ; arrivé à destination (le départ
     devient l'arrivée : position en direct ou sortie où l'on apparaît), il y revient tout seul. */
  watch(() => ui.router.toExit, (to, old) => { if (to && to !== old && EXIT[to]) ui.next.follow = 'router'; });
  watch(() => [ui.router.fromExit, ui.router.toExit], ([from, to]) => { if (ui.next.follow === 'router' && from && from === to) ui.next.follow = 'auto'; });
  const dockAuto = () => { ui.next.follow = 'auto'; };
  return { nextC, stepsLabel, dockTarget, dockCheck, dockFollowsRouter, dockRoute, pickDock, dockAuto };
}
