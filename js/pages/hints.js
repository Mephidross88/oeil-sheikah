/* ---------- Page Indices : pierres à potins par zone et ce qu'elles disent. ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const HINTS_TPL = `
    <section v-if="shown('hints')" class="pane" :class="'pane-' + paneOf('hints')">
      <div v-if="paneOf('hints')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Indices</h1><p class="lede">Pierres à potins : marquez celles que vous avez lues (le jeu ne le signale pas).
        {{ linkSpoilerOk() || link.spoiler ? 'Avec le spoiler caché, l’indice s’affiche dès que la pierre est marquée lue.' : 'Sans spoiler caché, notez l’indice vous-même.' }}</p></div>
      <div class="hint-sum">
        <div class="hs-card woth"><b>Voie du héros</b>
          <span v-for="(f, a) in hintsC.woth" :key="a" class="hs-chip" :title="'Indiqué par : ' + f.join(', ')">{{CHECK_AREA[a]?.label || a}}</span>
          <span v-if="!Object.keys(hintsC.woth).length" class="hs-none">—</span></div>
        <div class="hs-card foolish"><b>Zones futiles</b>
          <span v-for="(f, a) in hintsC.foolish" :key="a" class="hs-chip" :class="{ignored:zoneExcludeMode(a) === 'include'}" :title="'Indiqué par : ' + f.join(', ')">{{CHECK_AREA[a]?.label || a}}
            <button v-if="CHECK_AREA[a] && zoneExcludeMode(a)" type="button" class="hs-ex"
              :title="zoneExcludeMode(a) === 'exclude' ? 'Ignorer la zone : exclure tous ses checks restants' : 'Réintégrer la zone : ses checks exclus comptent de nouveau'"
              @click="zoneExclude({ area:CHECK_AREA[a] })">{{zoneExcludeMode(a) === 'exclude' ? '⊘ ignorer' : '↺ réintégrer'}}</button></span>
          <span v-if="!Object.keys(hintsC.foolish).length" class="hs-none">—</span></div>
        <div class="hs-card count"><b>{{Object.keys(store.game.hints).length}} / {{GOSSIP_STONES.length}}</b><span>pierres lues</span></div>
      </div>
      <article v-for="g in hintGroups" :key="g.area" class="hint-zone">
        <h2>{{CHECK_AREA[g.area]?.label || g.area}}</h2>
        <div v-for="s in g.stones" :key="s.id" class="hint-row" :class="{read:store.game.hints[s.id]}">
          <button type="button" class="hr-mark" :title="store.game.hints[s.id] ? 'Marquer non lue' : 'Marquer lue'" v-html="store.game.hints[s.id] ? ICONS.check : ICONS.circleO"
            @click="setHintRead(s.id, !store.game.hints[s.id])"></button>
          <div class="hr-body">
            <div class="hr-name"><b>{{s.label}}</b><small :title="s.id">{{s.id}}</small></div>
            <template v-if="store.game.hints[s.id]">
              <p v-if="store.game.hints[s.id].text && !hintEdit[s.id]" class="hr-text">{{store.game.hints[s.id].text}}
                <span v-if="store.game.hints[s.id].area && ['woth','foolish','item','itemArea'].includes(store.game.hints[s.id].t)" class="hr-area">{{CHECK_AREA[store.game.hints[s.id].area]?.label}}</span></p>
              <!-- saisie : indice à compléter (sans spoiler), ou sur demande -->
              <div v-if="hintEdit[s.id] || !store.game.hints[s.id].t" class="hr-edit">
                <select class="sel" v-model="store.game.hints[s.id].t" aria-label="Type d’indice"><option value="">Type d’indice…</option>
                  <option v-for="(l, ht) in HINT_TYPES" :key="ht" :value="ht">{{l}}</option></select>
                <select v-if="['woth','foolish','item','itemArea'].includes(store.game.hints[s.id].t)" class="sel" v-model="store.game.hints[s.id].area" aria-label="Zone">
                  <option value="">Zone…</option><option v-for="a in CHECK_AREAS" :key="a.id" :value="a.id">{{a.label}}</option></select>
                <input class="hr-input" v-model="store.game.hints[s.id].text" placeholder="Texte de l’indice (facultatif)">
                <button v-if="hintEdit[s.id]" type="button" class="link hr-edit-btn" @click="hintEdit[s.id] = false">Terminer</button>
              </div>
              <button v-else type="button" class="link hr-edit-btn" @click="hintEdit[s.id] = true">Modifier</button>
            </template>
          </div>
          <span v-if="store.game.hints[s.id]?.t" class="hr-type" :class="'ht-' + store.game.hints[s.id].t">{{HINT_TYPES[store.game.hints[s.id].t]}}</span>
        </div>
      </article>
    </section>
`;

function useHintsPage(ctx){
  const { s } = ctx;
  /* Indices (pierres à potins) : pierres groupées par zone, édition du texte à la demande */
  const hintGroups = CHECK_AREAS.map(a => ({ area:a.id, stones:GOSSIP_STONES.filter(s => s.area === a.id) })).filter(g => g.stones.length);
  const hintEdit = reactive({});
  return { hintGroups, hintEdit };
}
