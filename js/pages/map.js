/* ---------- Page Carte : choix de la zone et de la sortie à montrer (dessin : ZoneMap de js/components.js) ; fabrication des cartes depuis la ROM. ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

// Fabrication des cartes depuis la ROM du joueur (page Carte sans cartes, Configuration › Carte) : mapsBuild de components.js
const MAPS_BUILD_TPL = `
        <div class="maps-build">
          <p>Les cartes se fabriquent depuis votre propre ROM d'Ocarina of Time (N64 ou GameCube, compressée ou non :
            .z64, .n64, .v64). Elle est lue ici, dans le navigateur : rien n'est envoyé. Les cartes sont ensuite gardées dans ce
            navigateur.</p>
          <label class="si-drop" :class="{has:mapsJob.main}" @dragover.prevent @drop.prevent="mapsJob.main = $event.dataTransfer.files[0] || mapsJob.main">
            <input type="file" accept=".z64,.n64,.v64,.rom,.bin" hidden :disabled="mapsJob.busy" @change="mapsJob.main = $event.target.files[0] || null">
            <span class="si-ic" v-html="ICONS.file"></span>
            <span v-if="mapsJob.main" class="si-txt"><b>{{mapsJob.main.name}}</b><small>ROM d'Ocarina of Time</small></span>
            <span v-else class="si-txt"><b>Choisir la ROM d'Ocarina of Time…</b><small>ou la glisser ici</small></span>
          </label>
          <label class="si-drop" :class="{has:mapsJob.mq}" @dragover.prevent @drop.prevent="mapsJob.mq = $event.dataTransfer.files[0] || mapsJob.mq">
            <input type="file" accept=".z64,.n64,.v64,.rom,.bin" hidden :disabled="mapsJob.busy" @change="mapsJob.mq = $event.target.files[0] || null">
            <span class="si-ic" v-html="ICONS.file"></span>
            <span v-if="mapsJob.mq" class="si-txt"><b>{{mapsJob.mq.name}}</b><small>ROM Master Quest</small></span>
            <span v-else class="si-txt"><b>ROM Master Quest (facultative)…</b><small>pour les cartes des donjons Master Quest</small></span>
          </label>
          <div class="maps-build-go"><button type="button" class="btn primary" :disabled="!mapsJob.main || mapsJob.busy" @click="mapsMake">Fabriquer les cartes</button>
            <div v-if="mapsJob.busy" class="maps-progress"><div class="bar"><i :style="{width:Math.round(mapsJob.part * 100) + '%'}"></i></div>
              <span>{{MAPS_STEPS[mapsJob.step] || ''}}</span></div></div>
          <div v-if="mapsJob.err" class="msg ko">{{mapsJob.err}}</div>
          <p v-if="!APP_ONLINE" class="maps-cli">Ou en ligne de commande, avec Node.js : <code>node tools/soh-maps/extract_maps.mjs &lt;ROM&gt; [--mq=&lt;ROM Master Quest&gt;]</code>
            (fichier <code>data/maps-data.js</code>, qui passe avant les cartes du navigateur).</p>
        </div>`;


const MAP_TPL = `
    <section v-if="shown('map')" class="pane" :class="'pane-' + paneOf('map')">
      <div v-if="paneOf('map')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Carte</h1><p class="lede">Où se trouve chaque sortie, zone par zone, sur le terrain du jeu vu de dessus (nord en haut).</p></div>
      <div v-if="!MAPS_OK" class="panel-card maps-none"><h3>Pas encore de cartes</h3>${MAPS_BUILD_TPL}</div>
      <template v-else>
        <div v-if="MAPS_INFO.old" class="msg ko maps-old">Ces cartes ont été fabriquées avec une version précédente de l'appli :
          refaites-les (Configuration › Carte) pour profiter des corrections.</div>
        <div class="zmap-bar"><label class="field"><span class="lbl">Zone</span>
          <select class="sel" v-model="mapArea"><optgroup v-for="g in mapGroups" :key="g.label" :label="g.label">
            <option v-for="a in g.areas" :key="a.id" :value="a.id">{{a.name}}</option></optgroup></select></label>
          <button type="button" class="btn" @click="mapHere" title="Afficher la zone où vous êtes (position en direct, sinon départ du Routeur)">Ma position</button>
          <div class="field" title="Comme la page Checks : ses filtres (catégories, âge, checks faits masqués, seulement les faisables, recherche). Tous : tous les checks mélangés et non exclus, faits compris. Les checks non mélangés et exclus n’apparaissent jamais."><span class="lbl">Checks</span>
            <seg v-model="ui.map.checks" :options="[['filters','Comme la page Checks'],['all','Tous'],['off','Aucun']]"></seg></div>
          <div class="field"><span class="lbl">Pierres à potins</span><seg v-model="ui.map.stones" :options="[[true,'Affichées'],[false,'Masquées']]"></seg></div></div>
        <zone-map :here-tick="mapHereTick" :area="mapArea" :focus="mapFocus" @start="mapStart" @goal="mapGoal" @go-check="goToCheck" @goto="mapGoto"></zone-map>
      </template>
    </section>
`;

function useMapPage(ctx){
  const { go, mapAreas, setStart, ui } = ctx;
  /* Carte (js/components.js, ZoneMap) : zone affichée (choisie, sinon celle de la position) et sortie à mettre en
     évidence (« Voir sur la carte ») */
  // fabrication des cartes depuis la ROM du joueur (mapsBuild de components.js) : fichiers choisis, étape, erreur ; open :
  // formulaire ouvert dans la Configuration. Fabriquées : la page se recharge.
  const mapsJob = reactive({ main:null, mq:null, busy:false, step:'', part:0, err:'', open:false });
  const MAPS_STEPS = { read:t('Lecture des fichiers…'), rom:t('Décompression de la ROM…'), mq:t('Décompression de la ROM Master Quest…'),
    exits:t('Position des sorties…'), checks:t('Position des checks…'), mqChecks:t('Donjons Master Quest…'), floors:t('Sol des scènes…'),
    done:t('Enregistrement…'), save:t('Enregistrement…') };
  async function mapsMake(){
    if (!mapsJob.main || mapsJob.busy) return;
    Object.assign(mapsJob, { busy:true, err:'', step:'read', part:0 });
    try {
      await mapsBuild(mapsJob.main, mapsJob.mq, (k, part) => { mapsJob.step = k; mapsJob.part = part; });
      location.reload();
    } catch (e){
      // (pas une ROM reconnue : la ROM Master Quest si l'erreur vient de sa lecture)
      const file = (mapsJob.step === 'mq' ? mapsJob.mq : mapsJob.main)?.name || '';
      mapsJob.err = e.message === 'not-oot' ? t('{file} : ce n’est pas une ROM d’Ocarina of Time.', { file })
        : e.message === 'no-scene-table' ? t('{file} : version de la ROM non reconnue.', { file })
        : e.message === 'idb' ? t('Ce navigateur refuse de garder les cartes (navigation privée ?).')
        : t('Échec de la fabrication des cartes : {err}', { err:e.message });
      mapsJob.busy = false;
      console.error(e);
    }
  }
  async function mapsRemove(){
    if (!confirm(t('Supprimer les cartes gardées dans ce navigateur ?'))) return;
    try { await mapsForget(); } catch (e){ console.error(e); }
    location.reload();
  }
  const fmtDay = ms => new Date(ms).toLocaleDateString(LANG === 'fr' ? 'fr-FR' : LANG, { day:'numeric', month:'long', year:'numeric' });
  const mapsSourceText = MAPS_INFO.source === 'file' ? t('Fichier data/maps-data.js (outil en ligne de commande) : il passe avant les cartes du navigateur.')
    : MAPS_INFO.source === 'browser' ? t('Fabriquées dans ce navigateur le {date} depuis {rom}.', { date:fmtDay(MAPS_INFO.at), rom:MAPS_INFO.rom || '?' })
      + (MAPS_INFO.mq ? ' ' + t('Donjons Master Quest compris.') : '')
    : t('Pas encore de cartes : choisissez votre ROM d’Ocarina of Time pour les fabriquer.');
  // menu des zones de la Carte : par région, chaque donjon avec la région où il se trouve
  const MAP_REGIONS = [
    [t('Forêt'), ['kokiri_forest', 'deku_tree', 'lost_woods', 'sacred_forest_meadow', 'forest_temple']],
    [t('Plaine et château'), ['hyrule_field', 'lon_lon_ranch', 'market', 'hyrule_castle', 'ganons_castle']],
    [t('Cocorico'), ['kakariko_village', 'bottom_of_the_well', 'graveyard', 'shadow_temple']],
    [t('Montagne du Péril'), ['death_mountain_trail', 'dodongos_cavern', 'goron_city', 'death_mountain_crater', 'fire_temple']],
    [t('Zoras'), ['zoras_river', 'zoras_domain', 'zoras_fountain', 'jabu_jabus_belly', 'ice_cavern']],
    [t('Lac Hylia'), ['lake_hylia', 'water_temple']],
    [t('Désert Gerudo'), ['gerudo_valley', 'gerudo_fortress', 'gerudo_training_ground', 'wasteland', 'desert_colossus', 'spirit_temple']],
  ];
  const mapGroups = (() => {
    const has = id => mapAreas.some(a => a.id === id), placed = new Set(MAP_REGIONS.flatMap(r => r[1]));
    const out = MAP_REGIONS.map(([label, ids]) => ({ label, areas:ids.filter(has).map(id => AREA[id]) })).filter(g => g.areas.length);
    const rest = mapAreas.filter(a => !placed.has(a.id));
    return rest.length ? out.concat([{ label:t('Autres'), areas:rest }]) : out;
  })();
  const mapFocus = ref(null);
  // zone de Link : celle de sa scène (position en temps réel, si elle est dessinée), sinon de sa dernière entrée ou du
  // départ du Routeur — zone par défaut de la Carte, et celle du bloc Carte du stream
  const followArea = computed(() => {
    const L = ui.link.live && link.live, live = L && mapAreas.find(a => MAP_SCENES[a.id].includes(L.scene));
    if (live) return live.id;
    const k = link.position?.key || ui.router.fromExit;
    // (dans un intérieur : la zone de la porte par laquelle on y est entré, selon les entrées notées ; la carte de la zone
    // montre alors l'intérieur où est Link)
    const door = k && window.MAPS_DATA?.inside?.[k] && (incC.value[k] || []).find(x => EXIT[x] && !window.MAPS_DATA.inside[x] && MAP_SCENES[EXIT[x].areaId]);
    if (door) return EXIT[door].areaId;
    return k && EXIT[k] && MAP_SCENES[EXIT[k].areaId] ? EXIT[k].areaId : mapAreas[0]?.id;
  });
  const mapArea = computed({
    get(){ return ui.map.area || followArea.value; },
    set(v){ ui.map.area = v; mapFocus.value = null; },
  });
  function openMap(key){
    if (!key || !EXIT[key]) return;
    mapGoto(key);
    go('map');
  }
  // carte de la zone d'une sortie, sortie mise en évidence (double-clic sur un repère : sa destination)
  function mapGoto(key){
    if (!key || !EXIT[key]) return;
    ui.map.area = EXIT[key].areaId; mapFocus.value = null;
    nextTick(() => { mapFocus.value = key; });
  }
  // « Ma position » : zone de Link, et (même zone déjà affichée) son onglet et son étage — mapHereTick prévient la carte
  const mapHereTick = ref(0);
  const mapHere = () => { ui.map.area = ''; mapFocus.value = null; mapHereTick.value++; };
  const mapStart = key => setStart(key, ui.router.fromAge);
  function mapGoal(key){ const r = ui.router; r.toArea = EXIT[key].areaId; nextTick(() => { r.toExit = key; }); }
  return { mapsJob, MAPS_STEPS, mapsMake, mapsRemove, fmtDay, mapsSourceText, MAP_REGIONS, mapGroups,
    mapFocus, followArea, mapArea, openMap, mapGoto, mapHereTick, mapHere, mapStart, mapGoal };
}
