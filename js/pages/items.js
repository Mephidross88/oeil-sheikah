/* ---------- Panneau Objets (droite) : objets, donjons, trouvailles de l'auto-tracking ; fenêtres des chaînes d'échange et des check-lists. Fragments aussi repris par la fenêtre de stream (js/stream.js). ----------
   Script classique (pas de module) chargé avant js/app.js : gabarits en constantes, insérés dans celui d'App, et
   logique de la page en fonction use…(ctx) appelée par le setup d'App (ctx : noms des pages déjà assemblées). */

// Panneau Objets (cartes du panneau de droite)
// Grille des donjons (panneau Objets, et widget Donjons de la fenêtre de stream)
const DUNGEONS_TPL = `
      <section v-if="dungeonRows.length || skeletonShown" class="panel-card">
      <div class="dungeon-grid">
        <div v-for="row in dungeonRows" :key="row[0]" class="dg-row" :class="{final:row.length===1}">
          <div v-if="row.length===1" class="dg-side"></div>
          <div v-for="id in row" :key="id" class="dungeon-block" :class="{'quest-edit':cells(id).quest}" :style="{'--dg':DUNGEON_BY_ID[id].color}"
            :role="cells(id).quest ? 'button' : null" :tabindex="cells(id).quest ? 0 : null" :title="questTitle(id)"
            @click="cycleDungeonQuest(id)" @contextmenu.prevent="cycleDungeonQuest(id,true)" @keydown.enter.self="cycleDungeonQuest(id)">
            <span v-if="DUNGEON_BY_ID[id].quest" class="dg-badge" :class="questClass(id)">{{questLabel(id)}}</span>
            <div class="dg-name">{{DUNGEON_BY_ID[id].title}}</div>
            <div class="dg-cells">
              <!-- 1re ligne : carte, boussole et âme du boss ; 2e ligne : toutes les clés (et la Carte Gerudo) -->
              <div v-if="cells(id).map || cells(id).compass || cells(id).soul" class="dg-line">
                <button v-if="cells(id).map" type="button" class="dg-flag" :title="atStart(id).maps ? 'Carte (dès le départ)' : 'Carte'" :class="{on:atStart(id).maps || store.game.dungeons[id].map, fixed:atStart(id).maps}" :disabled="atStart(id).maps" @click.stop="setDungeonFlag(id,'map',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'map',false)"><img src="icons/dungeons/map.png" alt=""></button>
                <button v-if="cells(id).compass" type="button" class="dg-flag" :title="atStart(id).maps ? 'Boussole (dès le départ)' : 'Boussole'" :class="{on:atStart(id).maps || store.game.dungeons[id].compass, fixed:atStart(id).maps}" :disabled="atStart(id).maps" @click.stop="setDungeonFlag(id,'compass',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'compass',false)"><img src="icons/dungeons/compass.png" alt=""></button>
                <button v-if="cells(id).soul" type="button" class="dg-flag" :title="t('Âme de {boss}', {boss:DUNGEON_BY_ID[id].boss})" :class="{on:store.game.dungeons[id].soul}"
                  @click.stop="setDungeonFlag(id,'soul',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'soul',false)"><img src="icons/dungeons/boss_soul.png" alt=""></button>
              </div>
              <div v-if="cells(id).keys || cells(id).bossKey || cells(id).card" class="dg-line">
                <button v-if="cells(id).keys && dungeonKeyRing(id)!==true" type="button" class="dg-keys" :title="keysTitle(id)" @click.stop="addDungeonKeys(id,1)" @contextmenu.stop.prevent="addDungeonKeys(id,-1)"
                  :class="{none:!store.game.dungeons[id].keys && !dungeonKeysDone(id), done:dungeonKeysDone(id), fixed:atStart(id).keys}" :disabled="atStart(id).keys">
                  <img src="icons/dungeons/key.png" alt="">{{keysLabel(id)}}</button>
                <button v-if="cells(id).keys && dungeonKeyRing(id)!==false" type="button" class="dg-flag" :class="{on:store.game.dungeons[id].ringGot || store.game.items.skeletonKey}"
                  :title="dungeonKeyRing(id) ? 'Trousseau de clés' : 'Trousseau de clés (peut-être) — le noter indique que ce donjon en a un'"
                  @click.stop="setKeyRing(id,true)" @contextmenu.stop.prevent="setKeyRing(id,false)">
                  <img v-if="!brokenIcons['icons/dungeons/keyring.png']" src="icons/dungeons/keyring.png" alt="" @error="brokenIcons['icons/dungeons/keyring.png']=true">
                  <span v-else class="dg-ring-fallback"><img src="icons/dungeons/key.png" alt=""><img src="icons/dungeons/key.png" alt=""></span></button>
                <button v-if="cells(id).bossKey" type="button" class="dg-flag" :title="atStart(id).bossKey ? 'Clé de boss (dès le départ)' : 'Clé de boss'" :class="{on:atStart(id).bossKey || store.game.dungeons[id].bossKey, fixed:atStart(id).bossKey}" :disabled="atStart(id).bossKey" @click.stop="setDungeonFlag(id,'bossKey',true)" @contextmenu.stop.prevent="setDungeonFlag(id,'bossKey',false)"><img src="icons/dungeons/boss.png" alt=""></button>
                <button v-if="cells(id).card" type="button" class="dg-flag" :class="{on:store.game.items[DUNGEON_BY_ID[id].card]}"
                  :title="ITEM_BY_KEY[DUNGEON_BY_ID[id].card].label" @click.stop="store.game.items[DUNGEON_BY_ID[id].card]=true" @contextmenu.stop.prevent="store.game.items[DUNGEON_BY_ID[id].card]=false">
                  <img :src="iconSrc('items', ITEM_BY_KEY[DUNGEON_BY_ID[id].card])" alt=""></button>
              </div>
              <!-- épreuves de Ganon tirées au sort : inconnue (?) / requise / dissipée (✓) -->
              <div v-if="cells(id).trials" class="dg-line dg-trials">
                <button v-for="tr in TRIALS" :key="tr.id" type="button" class="dg-trial" :class="trialStatus(tr.id) || 'unknown'" :style="{'--tr':tr.color}"
                  :title="t('Épreuve {name} — {state} — clic : suivant, clic droit : précédent', {name:tr.label, state:{required:t('requise'), skipped:t('dissipée')}[trialStatus(tr.id)] || t('inconnue (comptée comme requise)')})"
                  @click.stop="cycleTrial(tr.id)" @contextmenu.stop.prevent="cycleTrial(tr.id,true)">{{trialStatus(tr.id)==='skipped' ? '✓' : trialStatus(tr.id) ? tr.label[0] : '?'}}</button>
              </div>
            </div>
          </div>
          <div v-if="row.length===1" class="dg-side"><ItemTile v-if="skeletonShown && row[0]==='ganonsCastle'" k="skeletonKey"/></div>
        </div>
        <div v-if="skeletonShown && !dungeonRows.some(r => r.includes('ganonsCastle'))" class="dg-row final">
          <div class="dg-side"></div><div class="dg-side"><ItemTile k="skeletonKey"/></div><div class="dg-side"></div>
        </div>
      </div>
      </section>
`;
const ITEMS_TPL = `
      <section class="panel-card">
      <div class="quest-row">
        <div class="quest-hex">
          <div v-for="(k,i) in ITEMS_PAGE.quest.hex" :key="k" :class="'hex-node hex-'+(i+1)"><item-tile :k="k"></item-tile></div>
          <div v-if="itemVisible(ITEM_BY_KEY[ITEMS_PAGE.quest.center])" class="hex-center"><item-tile :k="ITEMS_PAGE.quest.center"></item-tile></div>
        </div>
        <div class="stones-col"><item-tile v-for="k in ITEMS_PAGE.quest.stones" :key="k" :k="k"></item-tile></div>
        <div class="stat-cols">
          <div v-for="(col,ci) in ITEMS_PAGE.stats" :key="ci" class="stat-col">
            <item-tile v-for="k in visibleKeys(col)" :key="k" :k="k"></item-tile>
          </div>
        </div>
      </div>
      </section>

      <section class="panel-card">
      <div class="equip-row">
        <div v-for="c in ITEMS_PAGE.equipment.chains" :key="c.title" class="chain-stack">
          <template v-for="(k,i) in c.items" :key="k">
            <span v-if="i" class="chain-link"></span>
            <item-tile :k="k"></item-tile>
          </template>
        </div>
        <span class="equip-divider"></span>
        <div class="equip-side">
          <item-tile v-for="k in ITEMS_PAGE.equipment.progressive" :key="k" :k="k" :badge="tierLabel(ITEM_BY_KEY[k])"></item-tile>
        </div>
      </div>
      </section>

      <section class="panel-card">
      <template v-for="row in ITEMS_PAGE.boxRows" :key="row[0].title">
        <div class="box-row">
          <div v-for="box in row" :key="box.title" v-show="visibleKeys(box.items).length" class="item-box">
            <div class="icon-grid" :class="{cols2:box.cols===2}">
              <item-tile v-for="k in visibleKeys(box.items)" :key="k" :k="k"></item-tile>
            </div>
            <template v-if="box.sub">
              <div class="sub-link"></div>
              <div class="icon-grid sub">
                <item-tile v-for="k in box.sub" :key="k" :k="k"></item-tile>
              </div>
            </template>
          </div>
        </div>
      </template>
      </section>

      <section class="panel-card">
      <div class="song-row"><item-tile v-for="k in ITEMS_PAGE.songs.learned" :key="k" :k="k"></item-tile></div>
      <div class="song-row"><item-tile v-for="k in ITEMS_PAGE.songs.warp" :key="k" :k="k"></item-tile></div>

      <div class="ocarina-frame">
        <div class="ocarina-pad">
          <div class="pad-main"><item-tile :k="ITEMS_PAGE.songs.ocarina"></item-tile></div>
          <div v-if="visibleKeys(ITEMS_PAGE.songs.notes).length" class="pad-notes">
            <div v-for="n in visibleKeys(ITEMS_PAGE.songs.notes)" :key="n" :class="{'pad-a':n==='noteA'}"><item-tile :k="n"></item-tile></div>
          </div>
        </div>
      </div>
      </section>

      <section class="panel-card">
      <div class="checklist-tiles">
        <button v-for="b in ITEMS_PAGE.tradeButtons" :key="b.id" type="button" class="check-tile trade-tile" :title="b.title" @click="openTrade(b.id)"
          :class="counterClass(tradeStats(b.id).got, tradeStats(b.id).total)">
          <img :src="iconSrc('items', ITEM_BY_KEY[b.icon])" alt=""><b>{{tradeStats(b.id).got}}/{{tradeStats(b.id).total}}</b></button>
      </div>
      </section>

      <div v-if="panelSkills.length || panelChecklists.length" class="card-row">
        <section v-if="panelSkills.length" class="panel-card skills-card">
          <div v-for="r in panelSkills" :key="r.title" class="item-box skill-box" :title="r.title">
            <div class="icon-grid"><item-tile v-for="k in r.items" :key="k" :k="k"></item-tile></div>
          </div>
        </section>
        <section v-if="panelChecklists.length" class="panel-card checklists-card" :class="{wide:!panelSkills.length}">
          <button v-for="c in panelChecklists" :key="c.id" type="button" class="check-tile check-square" :title="CHECKLISTS[c.id].title"
            @click="openChecklist(c.id)" :class="counterClass(checklistStats(c.id).got, checklistStats(c.id).total)">
            <img v-if="!brokenIcons[c.icon]" :src="c.icon" alt="" @error="brokenIcons[c.icon]=true">
            <span v-else class="icon-fallback" v-html="ICONS.bag"></span><b>{{checklistStats(c.id).got}}/{{checklistStats(c.id).total}}</b></button>
        </section>
      </div>

${DUNGEONS_TPL}
      <!-- Trouvailles comptées par l'auto-tracking (option) -->
`;
// Trouvailles de l'auto-tracking
const LOOT_TPL = `
      <section v-if="ui.link.loot" class="panel-card loot-card" title="Comptées par l'auto-tracking : objets reçus pendant qu'il tourne (pas ceux ramassés par terre sans fenêtre « objet obtenu »)">
        <div class="loot ice"><span class="loot-ic"><img v-if="!brokenIcons['icons/loots/ice_trap.png']" src="icons/loots/ice_trap.png" alt="" @error="brokenIcons['icons/loots/ice_trap.png']=true"><span v-else v-html="ICONS.snow"></span></span>
          <b>{{store.game.loot.iceTraps}}</b><span>{{tn(store.game.loot.iceTraps, 'Piège de glace', 'Pièges de glace')}}</span></div>
        <div class="loot rupee"><span class="loot-ic"><img v-if="!brokenIcons['icons/loots/rupee.png']" src="icons/loots/rupee.png" alt="" @error="brokenIcons['icons/loots/rupee.png']=true"><span v-else v-html="ICONS.rupee"></span></span>
          <b>{{store.game.loot.rupees}}</b><span>{{t('Rubis · {v} ₹', {v:store.game.loot.rupeeValue})}}</span></div>
        <div class="loot junk"><span class="loot-ic"><img v-if="!brokenIcons['icons/loots/junk.png']" src="icons/loots/junk.png" alt="" @error="brokenIcons['icons/loots/junk.png']=true"><span v-else v-html="ICONS.bag"></span></span>
          <b>{{store.game.loot.junk}}</b><span>Munitions et cœurs</span></div>
      </section>
`;

const ITEMS_PANEL_TPL = `
  <aside class="side side-right" :class="{open:itemsOpen}">
    <button type="button" class="items-fold" :class="{folded:ui.itemsFolded || itemsDrawer}" @click="itemsDrawer ? itemsOpen = true : ui.itemsFolded = !ui.itemsFolded"
      :title="ui.itemsFolded || itemsDrawer ? 'Afficher le panneau Objets' : 'Replier le panneau Objets'" :aria-expanded="itemsDrawer ? itemsOpen : !ui.itemsFolded">
      <span v-html="ui.itemsFolded || itemsDrawer ? ICONS.bag : ICONS.chevron"></span><span v-if="ui.itemsFolded || itemsDrawer" class="if-label">Objets</span></button>
    <div class="side-right-head">
      <button @click="itemsOpen=false" aria-label="Fermer" v-html="ICONS.close"></button>
    </div>
    <div class="side-right-body">
${ITEMS_TPL}${LOOT_TPL}    </div>
  </aside>
`;

const ITEMS_MODALS_TPL = `
      <template v-if="tradeModal">
        <header><h3>{{tradeModal.title}} · {{tradeModal.got}}/{{tradeModal.total}}</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body trade-modal">
          <div v-for="(grp,gi) in tradeModal.groups" :key="gi" class="trade-block">
            <template v-for="(k,i) in grp" :key="k">
              <span v-if="i" class="chain-link h"></span>
              <item-tile :k="k"></item-tile>
            </template>
          </div>
        </div>
      </template>
      <template v-else-if="checklistModal">
        <header><h3>{{checklistModal.title}} · {{checklistModal.got}}/{{checklistModal.total}}</h3><button @click="modal=null" aria-label="Fermer" v-html="ICONS.close"></button></header>
        <div class="body">
          <div class="check-list">
            <button v-for="l in checklistModal.locations" :key="l.id" type="button" class="check-row" :class="{on:store.game.checklists[checklistModal.name][l.id]}" @click="setChecklist(checklistModal.name,l.id,true)" @contextmenu.prevent="setChecklist(checklistModal.name,l.id,false)">
              <span>{{l.label}}</span><span class="cr-mark" v-html="store.game.checklists[checklistModal.name][l.id]?ICONS.check:ICONS.circleO"></span>
            </button>
          </div>
        </div>
      </template>
`;

function useItemsPanel(ctx){
  const { modal, s } = ctx;
  /* Check-lists (clés hors donjon, trous à haricots) : purement informatif pour l'instant, voir SPEC.md */
  const checklistModal = computed(() => {
    if (!String(modal.value).startsWith('checklist-')) return null;
    const name = modal.value.slice('checklist-'.length), c = CHECKLISTS[name], st = checklistStats(name);
    return { name, title:c.title, locations:c.locations, got:st.got, total:st.total };
  });
  function openChecklist(name){ modal.value = 'checklist-' + name; }

  /* Chaînes d'échange : fenêtre de pointage par âge */
  const tradeModal = computed(() => {
    const b = ITEMS_PAGE.tradeButtons.find(t => modal.value === 'trade-' + t.id);
    return b ? { ...b, groups:ITEMS_PAGE.trade[b.id], ...tradeStats(b.id) } : null;
  });
  function openTrade(id){ modal.value = 'trade-' + id; }
  // État visuel d'un compteur « obtenus/total » : icône grisée si rien, teinte dorée une fois complet.
  const counterClass = (got, total) => ({ none:got === 0, done:total > 0 && got >= total });


  /* Panneau Objets piloté par la configuration : cadres et cases vides masqués */
  const panelSkills = computed(() => ITEMS_PAGE.skills.map(r => ({ ...r, items:visibleKeys(r.items) })).filter(r => r.items.length));
  // Clé squelette obtenue : elle ouvre toutes les serrures à petite clé (donjons, Repaire, portes de
  // l'overworld — logic.cpp de SoH), donc plus de compteur de petites clés, de trousseau ni de « Clés des portes ».
  const skeletonGot = () => store.game.items.skeletonKey && itemVisible(ITEM_BY_KEY.skeletonKey);
  const panelChecklists = computed(() => ITEMS_PAGE.checklistButtons
    .filter(c => (!c.visible || c.visible(s)) && !(c.id === 'keys' && skeletonGot())));
  const cells = id => { const c = dungeonCells(id, s); if (skeletonGot()) c.keys = false; return c; };
  // Badge de version (coin du bloc) : ? / V / MQ ; clic sur le bloc pour changer si la configuration le permet.
  // Compteur de petites clés : « Au départ », toutes possédées (le maximum, ou ✓ si la version est inconnue).
  const keysLabel = id => {
    const max = dungeonMaxKeys(id);
    if (atStart(id).keys) return max === null ? '✓' : `${max}/${max}`;
    return `${store.game.dungeons[id].keys}/${max ?? '?'}`;
  };
  const keysTitle = id => atStart(id).keys ? t('Petites clés (toutes dès le départ)')
    : store.game.items.skeletonKey ? t('Petites clés — serrures ouvertes par la clé squelette')
    : id === 'spiritTemple' && s.smallKeys === 'Vanilla' && dungeonQuest(id) === 'MQ'
      ? t('Petites clés trouvées — les 3 offertes au départ par SoH (Esprit MQ, clés vanilla) sont déjà comptées par la logique')
    : dungeonKeyRing(id) === null ? t('Petites clés (en noter une indique que ce donjon n’a pas de trousseau)') : t('Petites clés');
  const questLabel = id => ({ Vanilla:'V', MQ:'MQ' })[dungeonQuest(id)] || '?';
  const questClass = id => ({ Vanilla:'vanilla', MQ:'mq' })[dungeonQuest(id)] || 'unknown';
  const questTitle = id => {
    if (!DUNGEON_BY_ID[id].quest) return null;
    const name = ({ Vanilla:'Vanilla', MQ:'Master Quest' })[dungeonQuest(id)] || t('version inconnue');
    return cells(id).quest ? t('{name} — clic sur le cadre : version suivante, clic droit : précédente', { name }) : t('{name} — imposé par la configuration', { name });
  };
  // Un donjon sans case à suivre disparaît, sauf si sa version (Vanilla / MQ) reste à noter ; une rangée
  // réduite à un seul donjon est centrée. La clé squelette se place à droite du Château de Ganon, ou seule
  // sur une dernière rangée si ce bloc est masqué.
  const dungeonRows = computed(() => ITEMS_PAGE.dungeons.rows
    .map(r => r.filter(id => Object.values(cells(id)).some(Boolean))).filter(r => r.length));
  const skeletonShown = computed(() => itemVisible(ITEM_BY_KEY.skeletonKey));
  // Objets de donjon « Au départ » : cases pleines, non cliquables (évite les oublis et les erreurs).
  const atStart = id => ({ maps:mapsAtStart(id, s), keys:keysAtStart(id, s), bossKey:bossKeyAtStart(id, s) });

  return { checklistModal, openChecklist, tradeModal, openTrade, counterClass, panelSkills, skeletonGot,
    panelChecklists, cells, keysLabel, keysTitle, questLabel, questClass, questTitle, dungeonRows,
    skeletonShown, atStart };
}
