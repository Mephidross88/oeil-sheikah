/* ---------- Auto-tracking (fenêtres) : relais, écart avec la sauvegarde, question « Où êtes-vous arrivé ? » (logique : js/link.js). ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

const ASK_TPL = `

  <!-- Auto-tracking : où mène l'entrée qu'on vient de prendre (destination ambiguë) -->
  <div v-for="q in linkAsks().slice(0, 1)" :key="q.d" class="ask-card" role="dialog" aria-live="polite">
    <div class="ask-head"><span v-html="ICONS.live"></span><b>Où êtes-vous arrivé ?</b>
      <span v-if="linkAsks().length > 1" class="ask-more" :title="(linkAsks().length - 1) + ' autre(s) question(s) en attente'">+{{linkAsks().length - 1}}</span></div>
    <p>Entrée prise : <b>{{askFrom(q)}}</b>. Le jeu ne permet pas de savoir où elle mène : choisissez votre arrivée pour la noter.</p>
    <div class="ask-opts"><button v-for="a in q.opts" :key="a" type="button" class="btn" @click="linkAnswer(q, a)">{{askLabel(a)}}</button></div>
    <button type="button" class="ask-skip" @click="linkAnswer(q, null)">Ignorer</button>
  </div>
`;

const DRIFT_MODAL_TPL = `
      <template v-else-if="modal==='drift'">
        <header><h3>Écart avec la sauvegarde du jeu</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body drift-modal">
          <p v-if="!driftList.length">Plus aucun écart : la partie notée correspond à la sauvegarde du jeu.</p>
          <template v-else>
            <p>{{tn(driftList.length, 'La partie notée ici diffère de la sauvegarde chargée dans le jeu sur {n} point.', 'La partie notée ici diffère de la sauvegarde chargée dans le jeu sur {n} points.')}}
              Causes possibles : modification à la main, check ramassé puis perdu sans sauvegarder (à refaire), données venues
              d'une autre sauvegarde, ou suivi désactivé dans les options.</p>
            <p class="drift-note">Ce qui est coché ci-dessous sera corrigé d'après le jeu ; le reste est gardé tel quel et ne sera plus signalé.
              <button type="button" class="linklike" @click="driftAll(true)">Tout cocher</button> ·
              <button type="button" class="linklike" @click="driftAll(false)">Tout décocher</button></p>
            <div class="drift-list">
              <div v-for="g in driftGroups" :key="g.id" class="drift-group">
                <h4>{{g.title}} <small>{{g.rows.length}} · {{g.fix}}</small>
                  <button type="button" class="linklike" @click="driftAll(!g.rows.every(r => driftSel[r.key]), g.id)">{{g.rows.every(r => driftSel[r.key]) ? 'aucun' : 'tous'}}</button></h4>
                <label v-for="r in g.rows" :key="r.key" class="check drift-row"><input type="checkbox" v-model="driftSel[r.key]">
                  <img v-if="driftIcon(r)" :src="driftIcon(r)" alt=""><span v-else class="why-dot"></span>
                  <span class="drift-label">{{driftLabel(r)}}<small v-if="r.check"> · {{CHECK_AREA[r.check.area].label}}</small></span>
                  <span v-if="!r.check" class="drift-vals">ici : {{driftVal(r, r.from)}} → jeu : <b>{{driftVal(r, r.to)}}</b></span></label>
              </div>
            </div>
          </template>
          <div class="mactions">
            <button type="button" class="btn" @click="modal=null">Plus tard</button>
            <button v-if="driftList.length" type="button" class="btn primary" @click="driftApply">{{driftCount ? tn(driftCount, 'Corriger {n} écart', 'Corriger {n} écarts') : 'Tout garder tel quel'}}</button>
          </div>
        </div>
      </template>
`;

const LINK_MODAL_TPL = `
      <template v-else-if="modal==='link'">
        <header><h3>Auto-tracking</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body link-modal">
          <p style="margin-top:0">Suit votre partie de Ship of Harkinian en direct, via un petit relais local qui se fait passer pour un
            serveur Anchor. Le relais est en lecture seule : il ne modifie jamais votre partie.</p>
          <ol class="link-steps">
            <li>Lancez le relais : <a :href="RELAY_DL" target="_blank" rel="noopener">téléchargez-le</a> (Windows, Linux, macOS)
              et ouvrez-le ; gardez sa fenêtre ouverte pendant la partie. Avec Node.js, vous pouvez aussi lancer
              <code>node tools/soh-link/relay.mjs</code> (dans le dossier de L'Œil Sheikah).</li>
            <li>Dans SoH, menu Réseau &gt; Anchor : Host <code>127.0.0.1</code>, port <code>43383</code>, Room ID au choix (pas « Global Room »), puis Enable.</li>
            <li>Activez l'auto-tracking ci-dessous.<template v-if="APP_ONLINE"> Si le navigateur demande l'autorisation d'accéder
              aux applications de cet appareil ou au réseau local, acceptez : c'est le relais, sur votre ordinateur.</template></li>
          </ol>
          <label class="check link-on"><input type="checkbox" v-model="ui.link.enabled">Activer l'auto-tracking</label>
          <div v-if="ui.link.enabled && link.blocked" class="msg ko">Le navigateur bloque l'accès au relais pour ce site.
            Autorisez-le dans les paramètres du site (icône à gauche de l'adresse), puis rechargez la page.</div>
          <div class="link-opts"><span>Suivre :</span>
            <label class="check"><input type="checkbox" v-model="ui.link.checks">les checks faits</label>
            <label class="check"><input type="checkbox" v-model="ui.link.items">les objets</label>
            <label class="check" title="Le départ du Routeur suit l'endroit où vous apparaissez dans le jeu"><input type="checkbox" v-model="ui.link.position">la position (départ du Routeur)</label>
            <label class="check" title="Destination de chaque entrée prise, notée dans Entrées"><input type="checkbox" v-model="ui.link.entrances">les entrées</label>
            <label class="check" title="Pièges de glace, rubis et munitions reçus, affichés en bas du panneau Objets"><input type="checkbox" v-model="ui.link.loot">les trouvailles (pour le fun)</label>
            <label class="check" title="Position de Link sur la Carte, en continu. Le relais déclare au jeu un second joueur fictif « L'Oeil Sheikah », invisible (le jeu affiche « Connected ») : c'est la seule façon d'obtenir la position du jeu."><input type="checkbox" v-model="ui.link.live">la position en temps réel (Carte)</label></div>
          <label class="link-url">Adresse du relais <input class="sel" v-model.lazy="ui.link.url" spellcheck="false"></label>
          <div class="link-status" :class="link.status"><i></i><b>{{LINK_LABEL[link.status]}}</b>
            <span v-if="link.status==='game' && link.client">— {{link.client.name || 'joueur sans nom'}}, sauvegarde {{link.client.isSaveLoaded ? 'chargée' : 'non chargée'}}</span>
            <button v-if="link.status==='game'" type="button" class="btn" @click="linkRequestState">Relire la sauvegarde</button></div>
          <div v-if="driftList.length && !link.foreign" class="msg ko link-drift">{{tn(driftList.length, '{n} écart avec la sauvegarde du jeu.', '{n} écarts avec la sauvegarde du jeu.')}}
            <button type="button" class="btn" @click="openDrift">Voir</button></div>
          <div v-if="link.status==='game' && link.foreign" class="msg ko link-foreign">Le jeu a chargé une autre sauvegarde que celle
            de la partie notée : ses checks, objets et entrées sont ignorés. Pour une nouvelle partie, remettez d'abord la partie
            à zéro ; sinon <button type="button" class="btn" @click="linkAdoptSave">Suivre cette sauvegarde</button></div>
          <div v-if="link.status==='game' && link.position" class="link-pos">Position : <b>{{areaName(link.position.key)}}</b> · {{EXIT[link.position.key].label}}
            <span v-if="link.position.age">({{ageLabel(link.position.age)}})</span></div>
          <div class="link-spoiler">
            <b>Spoiler caché</b> <span class="muted">(facultatif)</span>
            <p>Avec le fichier spoiler de cette seed, l'appli connaît aussi ce que vous avez trouvé avant de lancer le relais,
              et les objets et prix des boutiques. Elle ne montre jamais que ce que le jeu vous a déjà montré.</p>
            <div class="link-spoiler-row">
              <template v-if="link.spoiler">
                <span>{{link.spoiler.file}} ({{link.spoiler.count}} checks)</span>
                <span v-if="link.status==='game' && link.client && link.client.seed && link.spoiler.seed && link.client.seed !== link.spoiler.seed" class="ko">
                  — ne correspond pas à la partie connectée (ignoré)</span>
                <span v-else-if="link.status==='game' && linkSpoilerOk()" class="ok">— correspond à la partie connectée</span>
                <button type="button" class="btn" @click="linkClearSpoiler">Oublier</button>
              </template>
              <label class="btn import-btn">{{link.spoiler ? 'Remplacer…' : 'Charger le spoiler…'}}
                <input type="file" accept=".json,application/json" @change="loadSpoilerFile" hidden></label>
            </div>
          </div>
          <div class="link-log">
            <div v-for="(l, i) in link.log" :key="i"><span>{{l.t}}</span>{{l.text}}</div>
            <div v-if="!link.log.length" class="muted">Aucun événement pour l'instant.</div>
          </div>
        </div>
      </template>
`;

function useTracking(ctx){
  const { cf, modal, navOpen, routeTo } = ctx;
  /* Écart avec la sauvegarde (link.drift, js/link.js) : fenêtre ouverte d'elle-même quand une sauvegarde complète
     révèle un écart (une fois par liste : « Plus tard » la ferme). Ligne cochée = corrigée d'après le jeu, sinon gardée
     telle quelle (game.keepDrift, plus signalée tant que l'écart ne change pas). */
  const DRIFT_SECS = [
    { id:'checksExtra', title:t('Checks cochés ici, pas faits dans le jeu'), fix:t('décochés') },
    { id:'checksMissing', title:t('Checks faits dans le jeu, pas cochés ici'), fix:t('cochés') },
    { id:'items', title:t('Objets et chants'), fix:t('réglés comme dans le jeu') },
    { id:'dungeons', title:t('Donjons'), fix:t('réglés comme dans le jeu') },
    { id:'checklists', title:t('Clés des portes et haricots'), fix:t('réglés comme dans le jeu') },
  ];
  const driftSel = reactive({});
  let driftSeen = '';
  const driftSig = d => (d || []).map(r => r.key + '=' + r.sig).join();
  // lignes encore valables (la partie a pu changer depuis la sauvegarde)
  const driftList = computed(() => (link.drift || []).filter(r => num01(r.cur()) === num01(r.from)));
  const driftGroups = computed(() => DRIFT_SECS.map(sec => {
    const rows = driftList.value.filter(r => r.sec === sec.id);
    if (sec.id.startsWith('checks')) rows.sort((x, y) => CHECK_AREAS.findIndex(a => a.id === x.check.area) - CHECK_AREAS.findIndex(a => a.id === y.check.area));
    return { ...sec, rows };
  }).filter(g => g.rows.length));
  const driftVal = (r, v) => {
    if (r.check) return v ? t('coché') : t('pas coché');
    const it = r.it;
    if (!it || it.kind === 'bool' || typeof v === 'boolean') return v ? (it ? t('obtenu') : t('oui')) : (it ? t('pas obtenu') : t('non'));
    if (it.kind === 'level' && it.stages) return it.stages[v] ?? String(v);
    return String(v ?? 0);
  };
  const driftIcon = r => r.check ? CHECK_CAT[r.check.cat].icon : r.it ? itemIconAt(r.it, Math.max(num01(r.to), num01(r.from), 1)) : null;
  const driftLabel = r => r.check ? r.check.label : r.it ? r.it.label : r.label;
  function openDrift(){
    for (const k of Object.keys(driftSel)) delete driftSel[k];
    driftList.value.forEach(r => { driftSel[r.key] = true; });
    driftSeen = driftSig(link.drift); modal.value = 'drift';
  }
  watch(() => link.drift, d => { if (d && d.length && driftSig(d) !== driftSeen && !modal.value && driftList.value.length) openDrift(); });
  const driftCount = computed(() => driftList.value.filter(r => driftSel[r.key]).length);
  function driftAll(on, sec){ driftList.value.forEach(r => { if (!sec || r.sec === sec) driftSel[r.key] = on; }); }
  // corrige la sélection d'après le jeu, garde le reste
  function driftApply(){
    for (const r of driftList.value){ if (driftSel[r.key]) r.apply(); else store.game.keepDrift[r.key] = r.sig; }
    modal.value = null;
  }
  const goToZone = id => { const z = id.toLowerCase(); routeTo(k => EXIT[k].areaId === z, null); };
  function setAllChecks(collapsed){ CHECK_AREAS.forEach(a => { cf.collapsed[a.id] = collapsed; }); }
  function jumpCheck(id){
    cf.collapsed[id] = false; navOpen.value = false;
    nextTick(() => { const el = document.getElementById('carea-' + id); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }); });
  }

  const LINK_LABEL = { off:t('Auto-tracking désactivé'), connecting:t('Relais introuvable'), busy:t('Relais déjà utilisé par une autre page'), relay:t('Relais prêt, jeu non connecté'), game:t('Jeu connecté') };
  // Question de l'auto-tracking : entrée découverte à destination ambiguë
  const exitName = k => k && EXIT[k] ? areaName(k) + ' · ' + EXIT[k].label : '?';
  const askFrom = q => exitName(EXIT_BY_ENTR[q.d]?.key);
  const askLabel = a => exitName(EXIT_BY_ARRIVAL[a]);
  return { DRIFT_SECS, driftSel, driftSeen, driftSig, driftList, driftGroups, driftVal, driftIcon,
    driftLabel, openDrift, driftCount, driftAll, driftApply, goToZone, setAllChecks, jumpCheck, LINK_LABEL,
    exitName, askFrom, askLabel };
}
