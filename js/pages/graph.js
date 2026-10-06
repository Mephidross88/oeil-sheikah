/* ---------- Page Connexions : graphe des zones reliées par les entrées connues (EntranceGraph de js/components.js). ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const GRAPH_TPL = `
    <section v-if="shown('graph')" class="pane" :class="'pane-' + paneOf('graph')">
      <div v-if="paneOf('graph')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Connexions</h1><p class="lede">Les entrées connues (notées, ou d'origine), zone par zone. Survolez une zone pour voir ses liaisons, cliquez pour les lister.</p></div>
      <entrance-graph @go-zone="goToZone"></entrance-graph>
      <p class="note emap-legend"><span><i class="k-ow"></i>passage</span><span><i class="k-in"></i>intérieur</span><span><i class="k-gr"></i>grotte</span>
        <span><i class="k-dg"></i>donjon</span><span><i class="k-bs"></i>boss</span><span><i class="k-owl"></i>hibou</span><span><i class="k-wp"></i>apparition, chant</span>
        <span>flèche : un seul sens connu</span><span>point : intérieur ou grotte qui mène ailleurs</span></p>
    </section>
`;
