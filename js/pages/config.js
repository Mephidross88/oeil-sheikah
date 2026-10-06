/* ---------- Page Configuration : réglages de SoH, astuces, coûts du Routeur, cartes, langue ; fenêtre d'import d'un spoiler. ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const CONFIG_TPL = `
    <section v-if="shown('config')" class="pane" :class="'pane-' + paneOf('config')">
      <div v-if="paneOf('config')==='side'" class="pane-bar">
        <button type="button" title="Échanger les deux panneaux" v-html="ICONS.swapH" @click="swapPanes"></button>
        <button type="button" title="Fermer ce panneau" v-html="ICONS.close" @click="closeSide"></button></div>
      <div class="page-head"><h1>Configuration</h1><p class="lede">Réglages du randomizer de Ship of Harkinian 9.2.3 « Ackbar Delta ».</p>
        <div class="import-box">
          <div class="lang-pick"><label title="Langue de l’interface (recharge la page)"><span>Langue</span>
            <select class="sel" :value="LANG" @change="setLang($event.target.value)"><option v-for="l in LANGS" :key="l[0]" :value="l[0]">{{l[1]}}</option></select></label>
            <label class="linklike" title="Ajouter une langue : fichier de traduction (.json : code, nom, dictionnaire), gardé dans ce navigateur">Ajouter…<input type="file" accept=".json,application/json" hidden @change="pickLang"></label>
            <button v-if="I18N_LANGS[LANG] && I18N_LANGS[LANG].imported" type="button" class="linklike" title="Retirer cette langue importée de ce navigateur" @click="removeLang(LANG)">Retirer</button></div>
          <div v-if="langMsg" class="msg ko">{{langMsg}}</div>
          <button type="button" class="btn primary" @click="openImport"><span class="btn-ic" v-html="ICONS.file"></span>Importer depuis un spoiler SoH…</button>
          <span v-if="store.game.seed.final" class="seed-pill" :title="'Seed de la partie (icônes de l’écran de sélection de SoH) — finalSeed ' + store.game.seed.final + (store.game.seed.file ? ', fichier ' + store.game.seed.file : '')">Seed <b>{{seedLabel(store.game.seed)}}</b></span>
          <span v-else class="seed-pill none" title="Importez le spoiler de la seed pour la retenir (vérifiée à chaque réimport)">Seed inconnue</span></div></div>
      <div v-if="importReport" class="import-report" :class="importReport.ok ? 'ok' : 'ko'">
        <b>{{importReport.title}}</b>
        <ul v-if="importReport.notes.length"><li v-for="(n,i) in importReport.notes" :key="i">{{n}}</li></ul>
        <button type="button" class="link" @click="importReport=null">Fermer</button>
      </div>
      <div v-if="DATA_ERRORS.length" class="errors"><b>{{tn(DATA_ERRORS.length, '{n} incohérence dans les données', '{n} incohérences dans les données')}}</b>
        <ul><li v-for="(er,i) in DATA_ERRORS" :key="i">{{er}}</li></ul></div>

      <nav class="config-tabs">
        <button v-for="tab in CONFIG_TABS.filter(x => !x.hidden)" :key="tab.id" type="button" :class="{on:ui.configTab===tab.id}" @click="ui.configTab=tab.id">
          {{tab.label}}<span v-if="tab.id==='tricks' && tricksOn" class="tab-count">{{tricksOn}}</span></button>
      </nav>

      <div v-if="configCards.length" class="cgrid">
        <section v-for="c in configCards" :key="c.id" class="cblock"><h2>{{c.title}}</h2>
          <div v-for="d in c.defs" :key="d.key" class="copt" :title="'SoH : ' + d.soh">
            <div><div class="t">{{d.label}}</div></div>
            <seg v-if="d.type==='choice' && d.choices.length<=3" v-model="s[d.key]" :options="d.choices"></seg>
            <select v-else-if="d.type==='choice'" class="sel opt-sel" v-model="s[d.key]">
              <option v-for="ch in d.choices" :key="ch[0]" :value="ch[0]">{{ch[1]}}</option></select>
            <input v-else type="number" class="opt-num" :min="d.min" :max="d.max" :step="d.step||1" v-model.number="s[d.key]">
          </div>
        </section>
      </div>

      <template v-if="ui.configTab==='tricks'">
        <div class="trick-filters">
          <input v-model="trickFilter.q" class="trick-search" placeholder="Rechercher une astuce…" aria-label="Rechercher une astuce">
          <select v-model="trickFilter.level" class="sel"><option value="">Toutes difficultés</option>
            <option v-for="(l,k) in TRICK_LEVELS" :key="k" :value="k">{{l}}</option></select>
          <select v-model="trickFilter.quest" class="sel"><option value="">Vanilla et MQ</option>
            <option value="VANILLA">Vanilla</option><option value="MQ">Master Quest</option></select>
          <span class="muted">{{tn(tricksOn, '{n} astuce active', '{n} astuces actives')}}</span>
        </div>
        <div v-if="!trickGroups.length" class="empty">Aucune astuce ne correspond aux filtres.</div>
        <div class="cgrid">
          <section v-for="g in trickGroups" :key="g.area" class="cblock trick-group">
            <h2>{{g.label}} <span class="muted">{{g.on}}/{{g.tricks.length}}</span></h2>
            <div class="trick-actions"><button type="button" class="link" @click="setTricks(g.tricks,true)">Tout cocher</button>
              <button type="button" class="link" @click="setTricks(g.tricks,false)">Tout décocher</button></div>
            <label v-for="tk in g.tricks" :key="tk.key" class="trick" :title="'SoH : ' + tk.name">
              <input type="checkbox" v-model="s.tricks[tk.key]"><span>{{tk.label}}</span>
              <span v-for="tag in tk.tags" :key="tag" class="trick-tag" :class="'lv-'+tag.toLowerCase()">{{TRICK_LEVELS[tag]}}</span>
              <span v-if="tk.quest!=='BOTH'" class="trick-tag">{{tk.quest==='MQ'?'MQ':'Vanilla'}}</span>
            </label>
          </section>
        </div>
      </template>

      <div v-if="ui.configTab==='router'" class="cgrid">
        <section class="cblock"><h2>Coûts du routeur</h2><p>Réglages propres à l'appli : même unité que les coûts de déplacement des données.</p>
          <div class="costs">
            <div class="field"><label for="c1">Transition</label><input id="c1" type="number" min="0" v-model.number="store.costs.transition"></div>
            <div class="field"><label for="c2">Chant de téléportation</label><input id="c2" type="number" min="0" v-model.number="store.costs.warp"></div>
            <div class="field"><label for="c3">Sauvegarder et recharger</label><input id="c3" type="number" min="0" v-model.number="store.costs.reset"></div>
            <div class="field"><label for="c4">Changement d'âge</label><input id="c4" type="number" min="0" v-model.number="store.costs.age"></div>
            <div class="field" title="Coût estimé par région de la logique SoH traversée, quand les données n'ont pas de coût de marche (intérieur des donjons, certaines portes)"><label for="c5">Marche estimée (par région)</label><input id="c5" type="number" min="0" v-model.number="store.costs.walk"></div>
          </div>
        </section>
        <section class="cblock"><h2>Carte</h2>
          <div class="copt">
            <div><div class="t">Cartes</div><div class="h">{{mapsSourceText}}</div></div>
            <div class="maps-acts"><button v-if="MAPS_INFO.source !== 'file'" type="button" class="btn" @click="mapsJob.open = !mapsJob.open">{{MAPS_OK ? 'Refaire…' : 'Fabriquer…'}}</button>
              <button v-if="MAPS_INFO.source === 'browser'" type="button" class="btn" @click="mapsRemove">Supprimer</button></div>
          </div>
          <div v-if="mapsJob.open && MAPS_INFO.source !== 'file'">${MAPS_BUILD_TPL}</div>
          <div class="copt" title="Pour placer à la main un check sans position et exporter les positions (positions-manuelles.json, pour tools/soh-maps). Tous les checks ont déjà une position : utile seulement pour en corriger une.">
            <div><div class="t">Outil « Placer les checks »</div></div>
            <seg v-model="ui.map.editTool" :options="[[false,'Non'],[true,'Oui']]"></seg>
          </div>
        </section>
      </div>
    </section>
`;

const SPOILER_MODAL_TPL = `
      <template v-else-if="modal==='spoiler'">
        <header><h3>Importer un spoiler SoH</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body spoiler-import">
          <template v-if="!importReport || !importReport.ok">
            <p class="si-lede">Le spoiler log (.json) généré par Ship of Harkinian règle la Configuration : réglages, astuces, checks
              exclus et objets de départ. L'emplacement des objets n'est jamais lu.</p>
            <h4>Importer aussi</h4>
            <div class="si-opts">
              <div v-for="o in IMPORT_OPTS" :key="o.key" class="copt">
                <div><div class="t">{{o.label}}<span v-if="o.spoil" class="si-spoil">peut spoiler</span></div><div class="h">{{o.help}}</div></div>
                <seg v-model="ui[o.key]" :options="[[false,'Non'],[true,'Oui']]"></seg>
              </div>
            </div>
            <h4>Fichier</h4>
            <label class="si-drop" :class="{drag:importDrag, has:importFile}" @dragover.prevent="importDrag = true" @dragleave="importDrag = false" @drop.prevent="dropImport">
              <input type="file" accept=".json,application/json" @change="pickImport" hidden>
              <span class="si-ic" v-html="ICONS.file"></span>
              <span v-if="importFile" class="si-txt"><b>{{importFile.name}}</b><small>Cliquer pour choisir un autre fichier</small></span>
              <span v-else class="si-txt"><b>Choisir le fichier spoiler…</b><small>ou le glisser ici (.json)</small></span>
            </label>
            <div v-if="importClash" class="warn-box si-clash">
              <span class="warn-box-ic" v-html="ICONS.warn"></span>
              <div><b>Ce spoiler est celui d'une autre seed.</b><p>Fichier : seed <b>{{seedLabel(importClash.spoiler)}}</b> ;
                {{importClash.what}} : seed <b>{{importClash.other}}</b>. Les checks, objets et entrées notés appartiennent à
                l'autre seed : pour une nouvelle partie, remettez tout à zéro.</p>
                <div class="si-clash-actions"><button class="btn" @click="importClash = null">Annuler</button>
                  <button class="btn" @click="runImport(true)">Importer quand même</button>
                  <button class="btn red" @click="resetThenImport">Nouvelle partie : tout remettre à zéro et importer</button></div></div>
            </div>
            <div v-if="importReport" class="msg ko">{{importReport.title}}</div>
            <div v-if="!importClash" class="mactions">
              <button v-if="ui.spoilerPrompt" class="btn" @click="declineSpoiler">Non, merci</button>
              <button v-else class="btn" @click="modal=null">Annuler</button>
              <button class="btn primary" :disabled="!importFile" @click="runImport">Importer</button></div>
          </template>
          <template v-else>
            <div class="msg ok"><b>{{importReport.title}}</b></div>
            <ul v-if="importReport.notes.length" class="spoiler-notes"><li v-for="(n,i) in importReport.notes" :key="i">{{n}}</li></ul>
            <div class="mactions"><button class="btn primary" @click="modal=null">Fermer</button></div>
          </template>
        </div>
      </template>
`;

function useConfigPage(ctx){
  const { PRICE_TYPES, modal, s, shown, ui } = ctx;
  const resetAll = (...a) => ctx.resetAll(...a);   // (défini plus loin)
  /* Configuration Ship of Harkinian (js/config.js) */
  const decoupled = computed(() => isDecoupled(s));
  // Cartes de l'onglet courant, chacune avec ses options visibles (règles de visibilité de SoH) ; une carte
  // sans option visible disparaît.
  const configCards = computed(() => {
    const tab = CONFIG_TABS.find(t => t.id === ui.configTab);
    return (tab?.cards || []).map(([id, title]) => ({ id, title,
      defs:SETTINGS_DEF.filter(d => d.card === tab.id + '.' + id && settingVisible(d, s)) })).filter(c => c.defs.length);
  });
  const trickFilter = reactive({ q:'', level:'', quest:'' });
  const tricksOn = computed(() => TRICKS.filter(t => s.tricks[t.key]).length);
  const trickGroups = computed(() => {
    const q = norm(trickFilter.q.trim()), lv = trickFilter.level, qu = trickFilter.quest;
    const shown = TRICKS.filter(t => (!q || norm(t.label + ' ' + t.name + ' ' + TRICK_AREAS[t.area]).includes(q))
      && (!lv || t.tags.includes(lv)) && (!qu || t.quest === 'BOTH' || t.quest === qu));
    return Object.keys(TRICK_AREAS).map(area => {
      const tricks = shown.filter(t => t.area === area);
      return { area, label:TRICK_AREAS[area], tricks, on:tricks.filter(t => s.tricks[t.key]).length };
    }).filter(g => g.tricks.length);
  });
  function setTricks(list, on){ list.forEach(t => { s.tricks[t.key] = on; }); }

  // Import depuis un spoiler SoH : ne lit QUE `settings` et `enabledTricks` (jamais l'emplacement des objets).
  const importReport = ref(null);
  /* Fenêtre d'import (Configuration, ou proposée au premier chargement) : options en interrupteurs avec leur explication,
     puis le fichier (choisi ou glissé), importé au clic sur « Importer ». Options mémorisées dans ui. */
  const IMPORT_OPTS = [
    { key:'importQuests', label:t('Tirages du seed'), spoil:true,
      help:t('Donjons en Master Quest, trousseaux de clés et épreuves de Ganon requises, quand la configuration les laisse au hasard.') },
    { key:'importPrices', label:t('Prix des boutiques, pestes Mojo et marchands'),
      help:t('Seulement les prix, jamais les objets vendus : la logique les compare à votre bourse.') },
    { key:'importLinkSpoiler', label:t('Spoiler caché pour l’auto-tracking'),
      help:t('Gardé à part, il ne révèle que ce que le jeu vous a déjà montré : objet d’un check ramassé, boutiques vues, destination des entrées prises.') },
  ];
  const importFile = ref(null), importDrag = ref(false);
  function openImport(){ importReport.value = null; importFile.value = null; importClash.value = null; modal.value = 'spoiler'; }
  function pickImport(ev){ importFile.value = ev.target.files[0] || null; ev.target.value = ''; importReport.value = null; importClash.value = null; }
  function dropImport(ev){ importDrag.value = false; const f = ev.dataTransfer?.files?.[0]; if (f){ importFile.value = f; importReport.value = null; importClash.value = null; } }
  function runImport(force){ if (importFile.value) importSpoiler(importFile.value, force === true); }
  /* Seed d'un spoiler (file_hash : les 5 icônes de l'écran de sélection de SoH, qui nomment aussi le fichier ; finalSeed :
     le numéro envoyé par le jeu) et contrôle au réimport : la partie en cours (game.seed) ou la sauvegarde suivie par
     l'auto-tracking (game.save.seed) ont-elles une autre seed ? → { spoiler, other, what } | null */
  const seedLabel = x => x.hash || (x.final ? String(x.final) : '?');
  const seedOfSpoiler = (data, name) => ({ hash:Array.isArray(data.file_hash) ? data.file_hash.join('-') : '',
    final:+data.finalSeed || 0, file:name || '' });
  function seedClash(sd){
    if (!sd.final) return null;
    const g = store.game.seed;
    if (g.final && g.final !== sd.final) return { spoiler:sd, other:seedLabel(g), what:t('la partie en cours') };
    if (store.game.save.seed && store.game.save.seed !== sd.final) return { spoiler:sd, other:String(store.game.save.seed), what:t('la sauvegarde suivie par l’auto-tracking') };
    return null;
  }
  const importClash = ref(null);
  // nouvelle partie : tout remettre à zéro (comme « Tout remettre à zéro »), puis importer le fichier choisi
  function resetThenImport(){ const f = importFile.value; resetAll(); importFile.value = f; importSpoiler(f, true); }
  function importSpoiler(file, force){
    const reader = new FileReader();
    reader.onload = () => {
      let data;
      try { data = JSON.parse(reader.result); } catch (e) { importReport.value = { ok:false, title:t('Fichier illisible : ce n’est pas un JSON valide.'), notes:[] }; return; }
      const settings = data && data.settings;
      if (!settings || typeof settings !== 'object'){ importReport.value = { ok:false, title:t('Aucune section « settings » : ce n’est pas un spoiler SoH.'), notes:[] }; return; }
      const seed = seedOfSpoiler(data, file.name), clash = force ? null : seedClash(seed);
      importClash.value = clash;
      if (clash) return;
      const notes = [];
      if (typeof data.version === 'string' && !data.version.includes('9.2.3'))
        notes.push(t('Version « {v} » : l’appli suit SoH 9.2.3, certaines options peuvent différer.', { v:data.version }));
      let count = 0;
      for (const [name, raw] of Object.entries(settings)){
        const d = SETTING_BY_SOH[name];
        if (!d){ if (!SETTINGS_IGNORED.has(name)) notes.push(t('Option inconnue ignorée : « {name} ».', { name })); continue; }
        const val = String(raw);
        if (d.type === 'number'){
          const n = parseInt(val, 10);
          if (Number.isNaN(n) || n < d.min || n > d.max){ notes.push(t('Valeur inattendue pour « {name} » : {val}.', { name, val })); continue; }
          s[d.key] = n;
        } else {
          if (!d.choices.some(c => c[0] === val)){ notes.push(t('Valeur inattendue pour « {name} » : « {val} ».', { name, val })); continue; }
          s[d.key] = val;
        }
        count++;
      }
      const enabled = Array.isArray(data.enabledTricks) ? data.enabledTricks : [];
      TRICKS.forEach(tk => { s.tricks[tk.key] = false; });
      let tricks = 0;
      for (const name of enabled){
        const tk = TRICK_BY_NAME[name];
        if (tk){ s.tricks[tk.key] = true; tricks++; } else notes.push(t('Astuce inconnue ignorée : « {name} ».', { name }));
      }
      // Trousseaux en « Aléatoire » / « Nombre » : SoH écrit le tirage réel dans les réglages par donjon. On ne
      // le garde que si l'import des tirages est coché (dans la partie, pas dans la configuration), et on remet
      // les réglages par donjon à leur valeur par défaut pour ne rien révéler.
      let rings = 0;
      if (['Random', 'Count'].includes(s.keyRings)){
        DUNGEONS.forEach(d => {
          if (!d.keyRing) return;
          const drawn = s[d.keyRing];
          s[d.keyRing] = SETTINGS_DEF.find(x => x.key === d.keyRing).def;
          if (ui.importQuests && configKeyRing(d.id, s) === null){ store.game.dungeons[d.id].keyRing = drawn === 'Yes' ? 'yes' : 'no'; rings++; }
        });
      }
      // Épreuves de Ganon tirées au sort : SoH écrit le nombre tiré dans « Ganon's Trials Count » (remis par défaut pour
      // ne rien révéler) et la liste des épreuves requises dans « requiredTrials » (gardée si l'import des tirages est coché).
      let trials = 0;
      if (s.ganonsTrials === 'Random Number') s.ganonsTrialsCount = SETTINGS_DEF.find(x => x.key === 'ganonsTrialsCount').def;
      if (configTrials(s) === null){
        TRIALS.forEach(t => { store.game.trials[t.id] = ''; });
        if (ui.importQuests && Array.isArray(data.requiredTrials)){
          TRIALS.forEach(t => { store.game.trials[t.id] = data.requiredTrials.some(r => t.match.test(r)) ? 'required' : 'skipped'; });
          trials = data.requiredTrials.length;
        }
      }
      // Checks exclus à la génération (« excludedLocations », absent s'il n'y en a aucun) : réglage de la seed, pas un spoil.
      Object.keys(s.excluded).forEach(k => { delete s.excluded[k]; });
      let excl = 0;
      for (const name of Array.isArray(data.excludedLocations) ? data.excludedLocations : []){
        const c = CHECK_BY_SOH[name];
        if (c){ s.excluded[c.id] = true; excl++; } else notes.push(t('Check exclu inconnu ignoré : « {name} ».', { name }));
      }
      const started = applyStartingItems(s);
      // Statut Vanilla / MQ (facultatif) : seulement pour les donjons que la configuration laisse au hasard.
      // SoH n'écrit « masterQuestDungeons » que s'il y a au moins un donjon MQ.
      let quests = 0;
      if (ui.importQuests){
        const mq = Array.isArray(data.masterQuestDungeons) ? data.masterQuestDungeons : [];
        DUNGEONS.forEach(d => {
          if (!d.quest || configQuest(d.id, s)) return;
          store.game.dungeons[d.id].quest = mq.includes(d.soh) ? 'MQ' : 'Vanilla';
          quests++;
        });
      }
      // Prix (facultatif) : seulement « price » de chaque lieu de boutique / peste / marchand, jamais l'objet → game.prices
      let prices = 0;
      if (ui.importPrices && data.locations && typeof data.locations === 'object')
        for (const [name, v] of Object.entries(data.locations)){
          const c = CHECK_BY_SOH[name], p = v && typeof v === 'object' ? parseInt(v.price, 10) : NaN;
          if (!c || !PRICE_TYPES.has(c.type) || !(p >= 0)) continue;
          store.game.prices[c.id] = p; prices++;
        }
      if (seed.final) store.game.seed = seed;
      ui.spoilerPrompt = false;
      // le même fichier sert aussi de spoiler caché à l'auto-tracking (ne révèle que ce que le jeu a déjà montré)
      const linked = ui.importLinkSpoiler && data.locations && typeof data.locations === 'object';
      if (linked) linkSetSpoiler(data, file.name);
      importReport.value = { ok:true, notes,
        title:(seed.final ? t('Seed {s}', { s:seedLabel(seed) }) + ' — ' : '') + t('Configuration importée : {parts}.', { parts:[
          tn(count, '{n} option', '{n} options'), tn(tricks, '{n} astuce activée', '{n} astuces activées'),
          started && tn(started, '{n} objet de départ coché', '{n} objets de départ cochés'),
          quests && tn(quests, 'version de {n} donjon renseignée', 'version de {n} donjons renseignée'),
          rings && tn(rings, 'trousseaux de {n} donjon renseignés', 'trousseaux de {n} donjons renseignés'),
          ui.importQuests && configTrials(s) === null && Array.isArray(data.requiredTrials) && tn(trials, '{n} épreuve de Ganon requise', '{n} épreuves de Ganon requises'),
          excl && tn(excl, '{n} check exclu', '{n} checks exclus'),
          prices && tn(prices, 'prix de {n} check', 'prix de {n} checks'),
          linked && t('spoiler gardé pour l’auto-tracking'),
        ].filter(Boolean).join(', ') }) };
    };
    reader.readAsText(file);
  }

  // langue importée (fichier de traduction JSON) : gardée dans le navigateur puis choisie (rechargement)
  const langMsg = ref('');
  function pickLang(ev){
    const f = ev.target.files[0]; ev.target.value = '';
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { langMsg.value = importLang(r.result); };
    r.readAsText(f);
  }
  return { decoupled, configCards, trickFilter, tricksOn, trickGroups, setTricks, importReport, IMPORT_OPTS,
    importFile, importDrag, openImport, pickImport, dropImport, runImport, seedLabel, seedOfSpoiler,
    seedClash, importClash, resetThenImport, importSpoiler, langMsg, pickLang };
}
