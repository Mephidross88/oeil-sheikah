/* ---------- Auto-tracking : relais local vers Ship of Harkinian (tools/soh-link/relay.mjs) ----------
   Le relais se fait passer pour un serveur Anchor (multijoueur de SoH) et transmet les événements du jeu par un flux
   SSE : connexion du jeu, position, checks faits, entrées découvertes, sauvegarde complète. Ce fichier gère la connexion
   (store.ui.link : activé, adresse du relais) et l'état affiché (link) ; l'application des événements à la partie
   (checks, objets, entrées) vient ensuite (linkApply). Lecture seule : rien n'est jamais renvoyé au jeu. */
const link = reactive({
  status:'off',      // off | connecting (relais injoignable, nouvelle tentative auto) | relay (relais OK) | game (jeu connecté)
  client:null,       // dernier état du jeu (nom, sauvegarde chargée, scène…)
  player:null,       // position brute : scène, entrée d'arrivée, âge
  position:null,     // position reconnue : { key (sortie où l'on est apparu), age }
  spoiler:null,      // spoiler caché chargé : { file, seed, count }
  ask:[],            // entrées découvertes à destination ambiguë, à préciser par le joueur : { d, opts:[arrivée], seq }
  foreign:false,     // le jeu a chargé une autre sauvegarde que celle de la partie notée : ses événements sont ignorés
  drift:null,        // écart avec la dernière sauvegarde complète (linkDrift) : lignes à corriger ou à garder
  live:null,         // position de Link en temps réel (option ui.link.live) : { scene, x, y, z, rot, age, at }
  lastAt:null, log:[],
});
let linkSource = null;

function linkLog(text){
  link.log.unshift({ t:new Date().toLocaleTimeString('fr-FR'), text });
  if (link.log.length > 80) link.log.length = 80;
}
function linkStart(){
  linkStop();
  link.status = 'connecting';
  let es;
  try { es = new EventSource(store.ui.link.url.replace(/\/+$/, '') + '/events'); } catch (e){ linkLog('Adresse du relais invalide'); return; }
  linkSource = es;
  es.onmessage = ev => { let m; try { m = JSON.parse(ev.data); } catch (e){ return; } linkHandle(m); };
  es.onerror = () => {
    if (link.status !== 'connecting') linkLog('Relais injoignable, nouvelle tentative…');
    link.status = 'connecting';
    // le navigateur réessaie seul après une coupure, mais abandonne sur une réponse anormale : on relance alors
    if (es.readyState === 2 && linkSource === es){ clearTimeout(linkRetry); linkRetry = setTimeout(() => { if (store.ui.link.enabled && linkSource === es) linkStart(); }, 5000); }
  };
}
let linkRetry = null;
function linkStop(){
  clearTimeout(linkRetry);
  if (linkSource){ linkSource.close(); linkSource = null; }
  link.status = 'off'; link.client = null; link.player = null; link.live = null;
}
/* Position en temps réel (option ui.link.live) : le relais déclare au jeu un second joueur fictif, ce qui lui fait envoyer
   la position de Link (voir relay.mjs) ; l'appli dit au relais si l'option est active, à chaque connexion et à chaque
   changement, et garde la dernière position reçue (link.live, scène nommée d'après LINK_DATA.scenes). */
function linkSyncLive(){
  if (!linkSource) return;
  fetch(store.ui.link.url.replace(/\/+$/, '') + '/live?on=' + (store.ui.link.live ? 1 : 0), { method:'POST' }).catch(() => {});
  if (!store.ui.link.live) link.live = null;
}
function linkRequestState(){
  fetch(store.ui.link.url.replace(/\/+$/, '') + '/request-state', { method:'POST' }).catch(() => linkLog('Relais injoignable'));
}

// Noms des objets du jeu de base reçus le plus souvent (GetItemID), pour le journal.
const GI_NAMES = { 0x3E:'quart de cœur', 0x48:'cœur', 0x4C:'rubis vert', 0x4D:'rubis bleu', 0x4E:'rubis rouge', 0x55:'rubis pourpre',
  0x56:'rubis d’or', 0x7C:'piège de glace', 0x49:'flèches', 0x4A:'flèches', 0x4B:'flèches', 0x01:'bombes', 0x66:'bombes', 0x02:'noix Mojo',
  0x07:'bâton Mojo', 0x3C:'graines', 0x43:'magie', 0x44:'magie' };
// Description courte d'un paquet du jeu (journal).
function linkDescribe(p){
  switch (p.type){
    case 'SET_CHECK_STATUS': { const c = CHECK_BY_NUM[p.rc]; return `${c ? c.label + ' (' + CHECK_AREA[c.area].label + ')' : 'Check ' + p.rc} : ${CHECK_STATUS_FR[p.status] || p.status}${p.skipped ? ' (ignoré)' : ''}`; }
    case 'ENTRANCE_DISCOVERED': { const x = EXIT_BY_ENTR[p.entranceIndex]; return `Entrée découverte : ${x ? AREA[x.areaId].name + ' · ' + x.label : p.entranceIndex}`; }
    case 'UPDATE_TEAM_STATE': return 'Sauvegarde complète reçue';
    case 'GIVE_ITEM': return `Objet reçu : ${p.modId ? (LINK_DATA.rg[p.getItemId] || p.getItemId).toLowerCase().replace(/_/g, ' ') : GI_NAMES[p.getItemId] || 'objet du jeu ' + p.getItemId}`;
    case 'UPDATE_DUNGEON_ITEMS': return 'Objets de donjon mis à jour';
    case 'GAME_COMPLETE': return 'Ganon vaincu !';
    default: return p.type;
  }
}
let linkCatchup = false;   // la prochaine sauvegarde complète est un rattrapage (connexion du relais ou du jeu)
/* Sauvegarde suivie : la partie notée retient la seed et la date de création du fichier de la première sauvegarde
   reçue (store.game.save, remis à zéro avec la partie). Une autre sauvegarde chargée dans le jeu (autre seed, autre
   fichier) est ignorée : ni checks, ni objets, ni entrées, ni position — sinon ses checks resteraient cochés. */
let linkCreated = 0;   // fichier de la dernière sauvegarde complète reçue (0 : inconnu, ou retour à l'écran titre)
function linkSaveSeen(){
  const s = store.game.save, seed = link.client?.isSaveLoaded ? link.client.seed || 0 : 0;
  if (link.client && !link.client.isSaveLoaded){ linkCreated = 0; return; }   // écran titre : on attend la sauvegarde chargée
  const foreign = !!(seed && s.seed && seed !== s.seed || linkCreated && s.created && linkCreated !== s.created);
  if (!foreign){ if (seed && !s.seed) s.seed = seed; if (linkCreated && !s.created) s.created = linkCreated; }
  if (foreign && !link.foreign) linkLog('Autre sauvegarde chargée dans le jeu : ignorée (ce n’est pas la partie notée)');
  if (!foreign && link.foreign) linkLog('Retour à la sauvegarde de la partie notée');
  link.foreign = foreign;
}
// « Suivre cette sauvegarde » : la sauvegarde chargée devient celle de la partie notée, puis on la relit
function linkAdoptSave(){
  store.game.save = { seed:0, created:0 };
  linkSaveSeen();
  linkRequestState();
}
function linkHandle(m){
  link.lastAt = Date.now();
  if (m.type === 'hello'){
    linkLog('Relais connecté');
    linkCatchup = true;
    link.status = m.game ? 'game' : 'relay';
    link.client = m.clientState || null; link.player = m.player || null;
    linkCreated = m.teamState?.ship?.stats?.fileCreatedAt || 0;
    linkSaveSeen();
    if (link.foreign) return;
    if (m.teamState){   // sauvegarde déjà connue du relais : rattrapage
      timelineQuiet = true;
      try { linkApply({ type:'UPDATE_TEAM_STATE', state:m.teamState }); } finally { timelineQuiet = false; }
      linkCatchup = false;
    }
    linkPositionFrom(m.player || m.clientState, false);
    if (!!m.live !== !!store.ui.link.live) linkSyncLive();
    linkPlayTick();
    return;
  }
  if (m.type === 'live'){
    const L = m.live;
    if (!store.ui.link.live || link.foreign) return;
    link.live = { ...L, scene:LINK_DATA.scenes[L.sceneNum] || String(L.sceneNum), at:Date.now() };
    // âge en direct (le jeu l'envoie avec la position : 0 adulte, 1 enfant) : il l'emporte sur l'âge déduit
    const age = L.age === 1 ? 'child' : L.age === 0 ? 'adult' : null;
    if (age && link.position && link.position.age !== age) linkSetPosition(link.position.key, age);
    linkLiveStart(link.live);
    return;
  }
  if (m.type === 'liveState') return;
  if (m.type === 'game'){
    link.status = m.connected ? 'game' : 'relay';
    if (m.connected) linkCatchup = true;
    link.client = m.connected ? m.clientState : null;
    if (!m.connected) link.live = null;
    linkSaveSeen();
    linkRevealAll();
    linkLog(m.connected ? 'Jeu connecté' : 'Jeu déconnecté');
    return;
  }
  if (m.type === 'client'){
    link.client = m.clientState; linkSaveSeen();
    if (!link.foreign){ linkEntranceArrival(m.clientState); linkPositionFrom(m.clientState, true); linkRevealAll(); }
    linkPlayTick();   // (temps de jeu : dès le chargement de la partie)
    return;
  }
  if (m.type === 'player'){ link.player = m.player; if (!link.foreign){ linkEntranceArrival(m.player); linkPositionFrom(m.player, true); } return; }
  if (m.type === 'packet'){
    if (m.packet.type === 'UPDATE_TEAM_STATE'){ linkCreated = m.packet.state?.ship?.stats?.fileCreatedAt || 0; linkSaveSeen(); }
    if (link.foreign) return;
    if (m.packet.type !== 'SET_FLAG' && m.packet.type !== 'UNSET_FLAG') linkLog(linkDescribe(m.packet));
    // première sauvegarde complète après la connexion : rattrapage, sans heure dans la chronologie
    const catchup = m.packet.type === 'UPDATE_TEAM_STATE' && linkCatchup;
    timelineQuiet = catchup;
    try { linkApply(m.packet); } finally { timelineQuiet = false; }
    if (catchup) linkCatchup = false;
  }
}
// Statuts d'un check dans SoH (RandomizerCheckStatus, RandomizerMiscEnums.h) ; ramassé (4) et sauvegardé (5) = fait.
const CHECK_STATUS_FR = ['non vu', 'vu', 'identifié', 'repéré', 'ramassé', 'sauvegardé'];
const CHECK_DONE = 4;
// Application des paquets à la partie. Checks : un check fait dans le jeu est coché (jamais décoché : un check coché à
// la main reste coché). Objets : le panneau reprend la sauvegarde complète (linkSaveToGame). Étapes suivantes :
// position, entrées.
function linkApply(p){
  if (p.type === 'SET_CHECK_STATUS'){ linkStatuses[p.rc] = Math.max(linkStatuses[p.rc] || 0, p.status); linkReveal(p.rc); }
  if (p.type === 'UPDATE_TEAM_STATE'){
    const fi = p.state?.ship?.stats?.firstInput;
    if (fi > 0 && store.game.runStart !== fi) store.game.runStart = fi;   // début de la partie (chronologie)
    (p.state?.rando?.itemLocations || []).forEach((x, rc) => { if (x && x[0]) linkStatuses[rc] = Math.max(linkStatuses[rc] || 0, x[0]); });
    linkRevealAll();
  }
  if (store.ui.link.checks){
    if (p.type === 'SET_CHECK_STATUS' && p.status >= CHECK_DONE) linkCheckDone(p.rc);
    if (p.type === 'SET_CHECK_STATUS' && p.status === CHECK_DONE) linkFoundCheck(p.rc);
    if (p.type === 'GIVE_ITEM') linkFoundGive(p);
    if (p.type === 'UPDATE_TEAM_STATE'){
      const locs = p.state?.rando?.itemLocations || [];
      let n = 0;
      locs.forEach((x, rc) => { if (x && x[0] >= CHECK_DONE && linkCheckDone(rc)) n++; });
      if (n) linkLog(`${n} check${n > 1 ? 's' : ''} coché${n > 1 ? 's' : ''} d'après la sauvegarde`);
    }
  }
  if (p.type === 'GIVE_ITEM') linkLoot(p);
  if (p.type === 'ENTRANCE_DISCOVERED') linkEntranceDiscovered(p.entranceIndex);
  if (p.type === 'UPDATE_TEAM_STATE') linkSpoilerEntrances(p.state?.ship?.stats?.entrancesDiscovered);
  if (store.ui.link.items){
    if (p.type === 'UPDATE_TEAM_STATE' && p.state?.inventory) linkApplyItems(p.state);
    // petite clé ramassée en direct : le jeu n'envoie que les clés en poche, on ajoute ce qui arrive
    if (p.type === 'UPDATE_DUNGEON_ITEMS') linkDungeonKeys(p.mapIndex, p.dungeonKeys);
  }
  // ce qui diffère encore de la sauvegarde complète (après ce qui vient d'être appliqué)
  if (p.type === 'UPDATE_TEAM_STATE' && p.state) linkDrift(p.state);
}

/* ---------- Objets : sauvegarde SoH (gSaveContext, envoyée par Anchor) -> panneau Objets ----------
   Numéros : z64item.h (emplacements, objets, bits d'équipement / quête / améliorations) et RandomizerInf (LINK_DATA,
   généré). L'appli reprend ce que dit le jeu, sauf : petites clés (le jeu ne garde que celles en poche : jamais moins
   que ce qu'il montre, plus celles ramassées en direct), cœurs (seul le total compte : réceptacles conservés, quarts
   ajustés), objets verrouillés et chant de l'Épouvantail (non sauvegardé ici). */
const SLOT = { stick:0, nut:1, bomb:2, bow:3, fireArrows:4, dinsFire:5, slingshot:6, ocarina:7, bombchu:8, hookshot:9,
  iceArrows:10, faroresWind:11, boomerang:12, lens:13, bean:14, hammer:15, lightArrows:16, nayrusLove:17, bottle1:18,
  tradeAdult:22, tradeChild:23 };
const ITEM_NONE = 255, ITEM_LETTER_RUTO = 0x1B;
// bits d'améliorations (gUpgradeShifts / gUpgradeMasks)
const UPG = { quiver:[0, 7], bombBag:[3, 7], strength:[6, 7], scale:[9, 7], wallet:[12, 3], bulletBag:[14, 7], sticks:[17, 7], nuts:[20, 7] };
const QUEST_BITS = ['forestMedallion', 'fireMedallion', 'waterMedallion', 'spiritMedallion', 'shadowMedallion', 'lightMedallion'];
const SONG_BITS = ['minuet', 'bolero', 'serenade', 'requiem', 'nocturne', 'prelude', 'zeldaLullaby', 'eponasSong', 'sariasSong',
  'sunsSong', 'songOfTime', 'songOfStorms'];   // bits 6 à 17
const EQUIP_BITS = { kokiriSword:0, masterSword:1, biggoronSword:2, dekuShield:4, hylianShield:5, mirrorShield:6,
  kokiriTunic:8, goronTunic:9, zoraTunic:10, kokiriBoots:12, ironBoots:13, hoverBoots:14 };
// emplacement d'inventaire -> objet du panneau (objet présent = possédé)
const SLOT_BOOLS = { dinsFire:SLOT.dinsFire, faroresWind:SLOT.faroresWind, boomerang:SLOT.boomerang, truthLens:SLOT.lens,
  beans:SLOT.bean, titanMass:SLOT.hammer, fireArrows:SLOT.fireArrows, iceArrows:SLOT.iceArrows, lightArrows:SLOT.lightArrows };
const INF_BOOLS = { greg:'GREG_FOUND', fishingRod:'FISHING_POLE_FOUND', skeletonKey:'HAS_SKELETON_KEY', rocsFeather:'OBTAINED_ROCS_FEATHER',
  swim:'CAN_SWIM', climb:'CAN_CLIMB', crawl:'CAN_CRAWL', grab:'CAN_GRAB', openChests:'CAN_OPEN_CHEST',
  speakKokiri:'CAN_SPEAK_KOKIRI', speakDeku:'CAN_SPEAK_DEKU', speakHylian:'CAN_SPEAK_HYLIAN', speakGoron:'CAN_SPEAK_GORON',
  speakZora:'CAN_SPEAK_ZORA', speakGerudo:'CAN_SPEAK_GERUDO',
  noteA:'HAS_OCARINA_A', noteCUp:'HAS_OCARINA_C_UP', noteCDown:'HAS_OCARINA_C_DOWN', noteCLeft:'HAS_OCARINA_C_LEFT', noteCRight:'HAS_OCARINA_C_RIGHT' };
// objets d'échange : drapeau « possédé » du randomizer, ou objet dans l'emplacement d'échange
const TRADE = { weirdEgg:['CHILD_TRADES_HAS_WEIRD_EGG', 0x21], chicken:['CHILD_TRADES_HAS_CHICKEN', 0x22], zeldasLetter:['CHILD_TRADES_HAS_LETTER_ZELDA', 0x23],
  keatonMask:['CHILD_TRADES_HAS_MASK_KEATON', 0x24], skullMask:['CHILD_TRADES_HAS_MASK_SKULL', 0x25], spookyMask:['CHILD_TRADES_HAS_MASK_SPOOKY', 0x26],
  bunnyHood:['CHILD_TRADES_HAS_MASK_BUNNY', 0x27], goronMask:['CHILD_TRADES_HAS_MASK_GORON', 0x28], zoraMask:['CHILD_TRADES_HAS_MASK_ZORA', 0x29],
  gerudoMask:['CHILD_TRADES_HAS_MASK_GERUDO', 0x2A], maskOfTruth:['CHILD_TRADES_HAS_MASK_TRUTH', 0x2B],
  pocketEgg:['ADULT_TRADES_HAS_POCKET_EGG', 0x2D], pocketCucco:['ADULT_TRADES_HAS_POCKET_CUCCO', 0x2E], cojiro:['ADULT_TRADES_HAS_COJIRO', 0x2F],
  oddMushroom:['ADULT_TRADES_HAS_ODD_MUSHROOM', 0x30], oddPotion:['ADULT_TRADES_HAS_ODD_POTION', 0x31], poachersSaw:['ADULT_TRADES_HAS_SAW', 0x32],
  brokenSword:['ADULT_TRADES_HAS_SWORD_BROKEN', 0x33], prescription:['ADULT_TRADES_HAS_PRESCRIPTION', 0x34], eyeballFrog:['ADULT_TRADES_HAS_FROG', 0x35],
  eyedrops:['ADULT_TRADES_HAS_EYEDROPS', 0x36], claimCheck:['ADULT_TRADES_HAS_CLAIM_CHECK', 0x37] };
// index des donjons dans dungeonItems / dungeonKeys (scènes) -> donjon du panneau ; la clé de boss de Ganon est celle de
// la Tour (10), ses petites clés celles de l'intérieur du château (13)
const DUNGEON_INDEX = { dekuTree:0, dodongosCavern:1, jabuJabu:2, forestTemple:3, fireTemple:4, waterTemple:5, spiritTemple:6,
  shadowTemple:7, bottomOfTheWell:8, iceCavern:9, gerudoTrainingGround:11, gerudoFortress:12, ganonsCastle:13 };
const GANONS_TOWER_INDEX = 10;

/** Sauvegarde SoH -> { items, songs, dungeons:{ id:{ map, compass, bossKey, soul, keysInHand } }, checklists } (pur). */
function linkSaveToGame(st, s){
  const inv = st.inventory, items = inv.items || [], inf = st.ship?.randomizerInf || [];
  const flag = name => { const i = LINK_DATA.randInf[name]; return i !== undefined && !!((inf[i >> 4] >> (i & 15)) & 1); };
  const upg = k => (inv.upgrades >>> UPG[k][0]) & UPG[k][1];
  const quest = bit => !!((inv.questItems >>> bit) & 1);
  const has = (slot, id) => items[slot] === id;
  const out = { items:{}, songs:{}, dungeons:{}, checklists:{ keys:{}, beans:{} } }, it = out.items;

  for (const [k, slot] of Object.entries(SLOT_BOOLS)) it[k] = items[slot] !== undefined && items[slot] !== ITEM_NONE;
  it.nayrusLove = items[SLOT.nayrusLove] !== ITEM_NONE || flag('OBTAINED_NAYRUS_LOVE');
  for (const [k, bit] of Object.entries(EQUIP_BITS)) it[k] = !!((inv.equipment >> bit) & 1);
  QUEST_BITS.forEach((k, i) => { it[k] = quest(i); });
  SONG_BITS.forEach((k, i) => { out.songs[k] = quest(6 + i); });
  it.kokiriEmerald = quest(18); it.goronRuby = quest(19); it.zoraSapphire = quest(20);
  it.stoneOfAgony = quest(21); it.gerudoCard = quest(22);
  it.skulltulaTokens = inv.gsTokens || 0;
  for (const [k, f] of Object.entries(INF_BOOLS)) it[k] = flag(f);
  for (const [k, [f, id]] of Object.entries(TRADE)) it[k] = flag(f) || items[SLOT.tradeChild] === id || items[SLOT.tradeAdult] === id;
  it.rutoLetter = flag('OBTAINED_RUTOS_LETTER') || [0, 1, 2, 3].some(i => items[SLOT.bottle1 + i] === ITEM_LETTER_RUTO);
  it.bottle = [0, 1, 2, 3].filter(i => { const x = items[SLOT.bottle1 + i]; return x !== undefined && x !== ITEM_NONE && x !== ITEM_LETTER_RUTO; }).length;
  it.triforcePieces = st.ship?.quest?.data?.randomizer?.triforcePiecesCollected || 0;
  it.doubleDefense = !!st.isDoubleDefenseAcquired;

  // objets à paliers (stages du panneau : 0 = aucun, puis capacités, dernier = infini)
  it.ocarina = has(SLOT.ocarina, 0x08) ? 2 : has(SLOT.ocarina, 0x07) ? 1 : 0;
  it.hookshot = has(SLOT.hookshot, 0x0B) ? 2 : has(SLOT.hookshot, 0x0A) ? 1 : 0;
  it.bow = !has(SLOT.bow, 0x03) ? 0 : flag('HAS_INFINITE_QUIVER') ? 4 : Math.max(1, upg('quiver'));
  it.slingshot = !has(SLOT.slingshot, 0x06) ? 0 : flag('HAS_INFINITE_BULLET_BAG') ? 4 : Math.max(1, upg('bulletBag'));
  it.bombBag = !upg('bombBag') ? 0 : flag('HAS_INFINITE_BOMB_BAG') ? 4 : upg('bombBag');
  it.sticks = !upg('sticks') && !has(SLOT.stick, 0x00) ? 0 : flag('HAS_INFINITE_STICK_UPGRADE') ? 4 : Math.max(1, upg('sticks'));
  it.nuts = !upg('nuts') && !has(SLOT.nut, 0x01) ? 0 : flag('HAS_INFINITE_NUT_UPGRADE') ? 4 : Math.max(1, upg('nuts'));
  const chuLevel = st.ship?.quest?.data?.randomizer?.bombchuUpgradeLevel || 0;
  it.bombchus = !has(SLOT.bombchu, 0x09) && !chuLevel ? 0 : flag('HAS_INFINITE_BOMBCHUS') ? 4 : Math.max(1, chuLevel);
  it.strength = upg('strength');
  it.scale = upg('scale');
  it.wallet = !flag('HAS_WALLET') && s.shuffleChildWallet === 'On' ? 0 : flag('HAS_INFINITE_MONEY') ? 5 : upg('wallet') + 1;
  it.magic = flag('HAS_INFINITE_MAGIC_METER') ? 3 : st.isDoubleMagicAcquired ? 2 : st.isMagicAcquired ? 1 : 0;

  // cœurs : quarts restants (bits 28-31 des objets de quête) et total de la jauge
  out.hearts = { total:Math.round((st.healthCapacity || 0) / 16), pieces:(inv.questItems >>> 28) & 15 };

  for (const [id, i] of Object.entries(DUNGEON_INDEX)){
    const bits = (inv.dungeonItems || [])[i] || 0, bk = id === 'ganonsCastle' ? (inv.dungeonItems || [])[GANONS_TOWER_INDEX] || 0 : bits;
    out.dungeons[id] = { map:!!(bits & 4), compass:!!(bits & 2), bossKey:!!(bk & 1), keysInHand:Math.max(0, (inv.dungeonKeys || [])[i] ?? 0) };
  }
  for (const [rg, id] of Object.entries(SOH_BOSS_SOUL)) out.dungeons[id].soul = flag(rg.slice(3));
  for (const [rg, id] of Object.entries(SOH_DOOR_KEY)) out.checklists.keys[id] = flag(rg.slice(3) + '_OBTAINED');
  for (const [rg, id] of Object.entries(SOH_BEAN_SOUL)) out.checklists.beans[id] = flag(rg.slice(3));
  return out;
}

/* ---------- Objet trouvé dans chaque check ----------
   Le jeu envoie, à quelques millisecondes d'écart et dans un ordre variable, « objet reçu » (GIVE_ITEM) et « check
   ramassé » (SET_CHECK_STATUS, statut 4) : on les apparie (game.found). Objet du jeu de base (modId 0) : numéro RG par
   LINK_DATA.giRg. Un objet reçu sans check (ramassé par terre) ou un check sans objet reste sans paire. */
const PAIR_MS = 400;
let linkPendingGive = null, linkPendingCheck = null;
function linkFoundGive(p){
  const rg = p.modId ? p.getItemId : LINK_DATA.giRg[p.getItemId], now = Date.now();
  if (rg === undefined) return;
  if (linkPendingCheck && now - linkPendingCheck.t < PAIR_MS){ linkSetFound(linkPendingCheck.rc, rg); linkPendingCheck = null; }
  else linkPendingGive = { rg, t:now };
}
function linkFoundCheck(rc){
  const now = Date.now();
  if (linkPendingGive && now - linkPendingGive.t < PAIR_MS){ linkSetFound(rc, linkPendingGive.rg); linkPendingGive = null; }
  else linkPendingCheck = { rc, t:now };
}
function linkSetFound(rc, rg){
  const c = CHECK_BY_NUM[rc];
  if (c) store.game.found[c.id] = rg;
}

/* ---------- Spoiler caché ----------
   Le fichier spoiler de la seed (objets, prix, entrées) est gardé à part (localStorage SPOILER_KEY, jamais affiché tel
   quel) et ne sert qu'à révéler ce que le jeu a montré : objet d'un check ramassé (statut 4 et plus), objets et prix
   des boutiques, pestes et marchands vus (statut 1 et plus : apparence de l'objet, comme en jeu, pour ne pas trahir un
   piège de glace déguisé). Seulement si son seed (finalSeed) est celui de la partie connectée. */
const SPOILER_KEY = 'oeil-sheikah-spoiler';
const SEEN_TYPES = new Set(['SHOP', 'SCRUB', 'MERCHANT']);
const linkStatuses = {};   // statut SoH connu de chaque check (numéro RC), d'après le jeu
let linkSpoiler = null;    // { file, seed, locations:{ id: [objet, prix|null, apparence|null] }, entrances:[…] }
const RG_BY_FR = {};
(LINK_DATA.rgFr || []).forEach((n, i) => { if (n && !(n in RG_BY_FR)) RG_BY_FR[n] = i; });
function linkSpoilerMeta(){ link.spoiler = linkSpoiler ? { file:linkSpoiler.file, seed:linkSpoiler.seed, count:Object.keys(linkSpoiler.locations).length } : null; }
function linkLoadSpoiler(){
  try { const raw = localStorage.getItem(SPOILER_KEY); if (raw) linkSpoiler = JSON.parse(raw); } catch (e){ linkSpoiler = null; }
  linkSpoilerMeta();
}
// Le spoiler correspond-il à la partie connectée ? (inconnu tant que le jeu n'a pas envoyé son seed : on attend)
function linkSpoilerOk(){
  const seed = link.client?.seed;
  return !!linkSpoiler && !!seed && (!linkSpoiler.seed || linkSpoiler.seed === seed);
}
/* Indice d'une pierre d'après le spoiler caché (seulement quand la pierre est marquée lue : rien n'est révélé avant).
   Utilisable si le seed du jeu connecté est celui du spoiler, ou sans jeu connecté (non vérifiable). → indice | null */
function linkSpoilerHint(stoneId){
  if (!linkSpoiler || !linkSpoiler.hints || (link.client?.seed && linkSpoiler.seed && link.client.seed !== linkSpoiler.seed)) return null;
  const h = linkSpoiler.hints[stoneId];
  if (!h) return null;
  const c = h.location ? CHECK_BY_SOH[h.location] : null, t = HINT_TYPE_SOH[h.type] || 'other';
  return { t, text:h.message || '', area:(c && t !== 'trial' ? c.area : '') || hintArea(h.area), check:t === 'item' && c ? c.id : '' };
}
function linkSetSpoiler(data, file){
  const locations = {};
  for (const [name, v] of Object.entries(data.locations || {})){
    const c = CHECK_BY_SOH[name];
    if (!c) continue;
    const o = typeof v === 'string' ? { item:v } : v || {};
    locations[c.id] = [o.item ?? null, o.price ?? null, o.model ?? null];
  }
  // indices des pierres à potins : type, message (langue du jeu), zone, check visé
  const hints = {};
  for (const [name, v] of Object.entries(data['Gossip Stone Hints'] || {}))
    if (v && typeof v === 'object') hints[name] = { type:v.type, message:v.message, area:v.area ?? null, location:v.location ?? null };
  linkSpoiler = { file, seed:data.finalSeed ?? null, locations, entrances:Array.isArray(data.entrances) ? data.entrances : [], hints };
  try { localStorage.setItem(SPOILER_KEY, JSON.stringify(linkSpoiler)); } catch (e){ linkLog('Spoiler trop gros pour être gardé dans ce navigateur'); }
  linkSpoilerMeta();
  linkLog(`Spoiler caché chargé (${file})`);
  linkRevealAll();
}
function linkClearSpoiler(){
  linkSpoiler = null;
  try { localStorage.removeItem(SPOILER_KEY); } catch (e){}
  linkSpoilerMeta();
}
function linkReveal(rc){
  if (!linkSpoilerOk()) return;
  const c = CHECK_BY_NUM[rc], st = linkStatuses[rc] || 0, loc = c && linkSpoiler.locations[c.id];
  if (!loc || !loc[0]) return;
  if (st >= CHECK_DONE && store.game.found[c.id] === undefined) store.game.found[c.id] = RG_BY_FR[loc[0]] ?? loc[0];
  if (st >= 1 && SEEN_TYPES.has(c.type) && !store.game.seen[c.id]) store.game.seen[c.id] = [loc[2] || loc[0], loc[1]];
}
function linkRevealAll(){ if (linkSpoilerOk()) Object.keys(linkStatuses).forEach(rc => linkReveal(+rc)); }

/* ---------- Trouvailles : objets reçus (GIVE_ITEM) pendant que l'auto-tracking tourne ----------
   Le jeu envoie l'objet reçu : objet du jeu de base (modId 0, GetItemID de z64item.h) ou du randomizer (modId 1,
   RandomizerGet). Les objets ramassés par terre sans fenêtre « objet obtenu » ne sont pas signalés. */
const GI_RUPEES = { 0x4C:1, 0x4D:5, 0x4E:20, 0x55:50, 0x56:200 };
const GI_JUNK = new Set([0x01, 0x65, 0x66, 0x67, 0x68, 0x02, 0x63, 0x64, 0x03, 0x6A, 0x6B, 0x07, 0x61, 0x62, 0x3C, 0x69,
  0x43, 0x44, 0x48, 0x49, 0x4A, 0x4B]);   // bombes, noix, missiles, bâtons, graines, magie, cœur, flèches
const GI_ICE_TRAP = 0x7C;
const RG_RUPEES = { GREEN_RUPEE:1, TREASURE_GAME_GREEN_RUPEE:1, BLUE_RUPEE:5, RED_RUPEE:20, PURPLE_RUPEE:50, HUGE_RUPEE:200 };
const RG_JUNK = /^(RECOVERY_HEART|TREASURE_GAME_HEART|BOMBS_\d+|BOMBCHU_(5|10|20)|ARROWS_\d+|DEKU_NUTS_\d+|DEKU_SEEDS_\d+|DEKU_STICK_1|MAGIC_JAR.*)$/;
function linkLoot(p){
  if (!store.ui.link.loot) return;
  const l = store.game.loot, id = p.getItemId;
  if (p.modId){
    const name = LINK_DATA.rg[id] || '';
    if (name === 'ICE_TRAP') l.iceTraps++;
    else if (name in RG_RUPEES){ l.rupees++; l.rupeeValue += RG_RUPEES[name]; }
    else if (RG_JUNK.test(name)) l.junk++;
    return;
  }
  if (id === GI_ICE_TRAP) l.iceTraps++;
  else if (id in GI_RUPEES){ l.rupees++; l.rupeeValue += GI_RUPEES[id]; }
  else if (GI_JUNK.has(id)) l.junk++;
}

/* ---------- Position : sortie où l'on vient d'apparaître (entrée d'arrivée du jeu, gSaveContext.entranceIndex) ----------
   et âge (linkAge : 0 adulte, 1 enfant, seulement dans les mises à jour du joueur). Option : le départ du Routeur la
   suit (ui.link.position). Entrée inconnue (grotte non reconnue, scènes non mélangées, écran titre) : position inchangée.
   Le relais ne reçoit en pratique que l'état du client (UPDATE_CLIENT_STATE, à chaque changement de scène) : le jeu
   n'envoie les mises à jour du joueur, avec la position et l'âge de Link, qu'aux autres joueurs présents dans la scène,
   et l'âge n'est pas dans la sauvegarde complète. L'âge se déduit donc : au chargement d'une partie, du point
   d'apparition (celui de l'enfant ou de l'adulte, s'ils mènent à des endroits différents) ; au voyage dans le temps
   (épée de légende, entrée ENTR_TEMPLE_OF_TIME_2 dans les deux sens), en inversant l'âge connu (à défaut, celui du
   départ du Routeur). `fresh` : nouvel état du jeu (pas la répétition de l'état courant à la connexion de l'appli). */
const ENTR_TOT_AGE_CHANGE = 0x2CA;
let linkLoaded = null;   // partie chargée au dernier état reçu (null : inconnu)
function linkPositionFrom(x, fresh){
  if (!x) return;
  if (x.isSaveLoaded === false){ linkLoaded = false; return; }
  const justLoaded = fresh && linkLoaded === false;
  linkLoaded = true;
  const a = linkArrival(x, false, link.position?.key);
  let key = typeof a === 'number' ? EXIT_BY_ARRIVAL[a] ?? linkSpawnArrival(a) : null;
  // âge connu : celui du départ du Routeur s'il suit la position (corrigé à la main au besoin), sinon le dernier déduit
  const known = (store.ui.link.position && store.ui.router.fromAge) || link.position?.age || null;
  let age = x.linkAge === 0 ? 'adult' : x.linkAge === 1 ? 'child' : null;
  if (x.entranceIndex === ENTR_TOT_AGE_CHANGE){
    key = TOT;
    if (!age && fresh && known) age = known === 'adult' ? 'child' : 'adult';
  }
  if (!age && justLoaded && key) age = linkSpawnAge(key);
  if (!age) age = known;
  // grotte(s) où l'on peut être, pour reconnaître la sortie de grotte à l'arrivée suivante
  const gs = GROTTO_LOAD[x.entranceIndex];
  linkGrottoIn = !gs ? null : a >= GROTTO_LOAD_START && a < GROTTO_EXIT_START ? [a - GROTTO_LOAD_START] : gs;
  if (fresh) linkSeq++;
  const cur = link.position;
  if (!key || !EXIT[key]){ if (!cur || !age || cur.age === age) return; key = cur.key; }   // endroit inconnu : âge seul
  linkSetPosition(key, age);
}
let linkSeq = 0;   // numéro de l'arrivée courante (une question sur l'arrivée courante met aussi la position à jour)
function linkSetPosition(key, age){
  const cur = link.position;
  if (cur && cur.key === key && cur.age === age) return;
  link.position = { key, age };
  if (!store.ui.link.position) return;
  const r = store.ui.router;
  if (r.fromExit !== key){ r.fromArea = EXIT[key].areaId; r.fromExit = key; }
  if (age) r.fromAge = age;
}

/* Départ du Routeur en temps réel (options « la position » et « la position en temps réel ») : la sortie la plus proche
   de Link dans sa scène (positions des sorties de data/maps-data.js, versions vanilla et Master Quest ; pas les sorties
   placées à leur porte ni les apparitions), à moins de 250 unités de hauteur et 800 de distance ; on ne change que si
   elle est plus proche de 150 unités que le départ actuel (pas de va-et-vient entre deux sorties voisines). La position
   (link.position, « dernière entrée ») reste la dernière entrée prise. */
function linkLiveStart(L){
  const M = window.MAPS_DATA, r = store.ui.router;
  if (!M || !store.ui.link.position) return;
  const dist = k => {
    let d = Infinity;
    for (const p of [M.exits[k], M.exitsMq?.[k]]){
      if (!p || p[0].replace(/_MQ$/, '') !== L.scene || p[4] || Math.abs((p[3] ?? L.y) - L.y) > 250) continue;
      d = Math.min(d, Math.hypot(p[1] - L.x, p[2] - L.z));
    }
    return d;
  };
  let best = null;
  for (const k of new Set([...Object.keys(M.exits), ...Object.keys(M.exitsMq || {})])){
    if (!EXIT[k] || EXIT[k].areaId === SPAWN_AREA) continue;
    const d = dist(k);
    if (d < (best ? best.d : 800)) best = { k, d };
  }
  if (!best || best.k === r.fromExit || dist(r.fromExit) < best.d + 150) return;
  r.fromArea = EXIT[best.k].areaId; r.fromExit = best.k;
}

// Chargement d'une partie au point d'apparition (apparition enfant / adulte non mélangée : le jeu envoie l'entrée de
// l'apparition elle-même) : on est à la destination de l'apparition (notée dans Entrées, sinon d'origine).
const SPAWN_BY_ENTR = {};
ALL_EXITS.forEach(e => { if (e.areaId === SPAWN_AREA && e.entr != null) SPAWN_BY_ENTR[e.entr] = e.key; });
function linkSpawnArrival(n){
  const k = SPAWN_BY_ENTR[n];
  return k ? effC.value[k] || EXIT[k].vanilla || null : null;
}
// Âge d'après l'endroit où l'on apparaît au chargement d'une partie : celui du point d'apparition qui y mène, s'il est seul.
function linkSpawnAge(key){
  const dest = k => effC.value[k] || EXIT[k]?.vanilla, c = dest('spawns::spawn_child') === key, ad = dest('spawns::spawn_adult') === key;
  return c && !ad ? 'child' : ad && !c ? 'adult' : null;
}

/* ---------- Entrées (option ui.link.entrances) ----------
   Le jeu signale l'entrée prise la première fois (ENTRANCE_DISCOVERED, numéro de l'entrée = celui de nos sorties),
   puis l'entrée par laquelle on apparaît (entranceIndex des mises à jour du joueur, ~1 s après) : la destination est
   notée dans Entrées (setMapping, sens inverse compris en entrées couplées). Grottes : on arrive dans la grotte i par
   une entrée de la scène des grottes (LINK_DATA.grottoLoad[i]), propre à la grotte (Grotte aux Effrois…) ou partagée
   par plusieurs (grottes génériques, fontaines des fées) — une grotte partagée n'est connue qu'en en sortant (sa sortie
   0x800 + i est alors signalée : entrée 0x700 + i) ; on en sort par une entrée générique de la zone (LINK_DATA.grottoReturn)
   — la sortie de grotte se reconnaît à la grotte d'où l'on vient (linkGrottoIn) et à la destination connue de sa sortie,
   à défaut aux destinations encore possibles pour la sortie prise (candidatesFor), ou à la position de Link si elle est
   connue. Avec le spoiler caché, la destination vient directement du spoiler, et les entrées déjà
   découvertes (sauvegarde : ship.stats.entrancesDiscovered) sont rattrapées. */
const GROTTO_LOAD = {};   // entrée d'arrivée → numéros des grottes où elle mène
(LINK_DATA.grottoLoad || []).forEach((n, i) => (GROTTO_LOAD[n] ||= []).push(i));
const GROTTO_RETURN = LINK_DATA.grottoReturn || [];
const GROTTO_RETURN_ENTR = new Set(GROTTO_RETURN.map(r => r[0]));
const GROTTO_LOAD_START = 0x700, GROTTO_EXIT_START = 0x800, GROTTO_POS_MAX = 120;
let linkGrottoIn = null;   // numéros des grottes où l'on peut être (null : pas dans une grotte)
// Arrivées possibles par l'entrée générique n en sortant d'une grotte : l'arrivée normale et les retours de grotte.
const linkReturnOptions = n => [n, ...GROTTO_RETURN.flatMap(([e], j) => e === n ? [GROTTO_EXIT_START + j] : [])];
// Arrivée en sortant de la grotte où l'on était, d'après la destination (notée ou d'origine) de sa sortie ; null si
// inconnue ou ambiguë.
function linkGrottoReturn(n){
  const eff = effC.value, opts = new Set(linkReturnOptions(n)), out = new Set();
  for (const i of linkGrottoIn){
    const t = eff[EXIT_BY_ARRIVAL[GROTTO_LOAD_START + i]];
    if (!t) return null;
    if (opts.has(ARRIVAL_ENTR[t])) out.add(ARRIVAL_ENTR[t]);
  }
  return out.size === 1 ? [...out][0] : null;
}
/** Entrée d'arrivée « logique » (numéro de nos sorties) d'après l'état du joueur : numéro, 'grotto' (dans une grotte
    inconnue) ou null. Entrée générique aussi utilisée par une sortie de grotte : si l'on était dans une grotte, le retour
    de cette grotte (linkGrottoReturn) ; à défaut null si `strict` (noter une entrée : en pools mélangés, une sortie
    quelconque peut mener à un retour de grotte), sinon (position du Routeur) la seule de ces arrivées où mène une
    sortie (notée ou d'origine) de la zone d'où l'on vient (`from`), et en dernier recours l'arrivée normale. Entrée partagée par
    plusieurs grottes, hors `strict` : la seule de ces grottes où mène une sortie (notée ou d'origine) de la zone d'où
    l'on vient (`from`, clé de sortie), s'il n'y en a qu'une. */
function linkArrival(x, strict, from){
  const n = x.entranceIndex;
  if (GROTTO_LOAD[n]){
    let gs = GROTTO_LOAD[n];
    if (gs.length > 1 && !strict && from && EXIT[from]){
      const eff = effC.value, area = EXIT[from].areaId;
      gs = gs.filter(i => { const k = EXIT_BY_ARRIVAL[GROTTO_LOAD_START + i]; return k && AREA[area].exits.some(e => eff[e.key] === k); });
    }
    return gs.length === 1 ? GROTTO_LOAD_START + gs[0] : 'grotto';
  }
  if (GROTTO_RETURN_ENTR.has(n)){
    if (x.pos){
      // distance en 3D : un point d'arrivée normal peut être proche d'un retour de grotte vu de dessus (Village Goron)
      let best = -1, bestD = GROTTO_POS_MAX;
      GROTTO_RETURN.forEach(([e, gx, gy, gz], i) => { if (e !== n) return; const d = Math.hypot(x.pos.x - gx, x.pos.y - gy, x.pos.z - gz); if (d < bestD){ bestD = d; best = i; } });
      return best >= 0 ? GROTTO_EXIT_START + best : n;
    }
    const g = linkGrottoIn && linkGrottoReturn(n);
    if (g != null) return g;
    if (strict) return null;
    // position : la seule de ces arrivées où mène une sortie (notée ou d'origine) de la zone d'où l'on vient
    if (from && EXIT[from]){
      const eff = effC.value, opts = new Set(linkReturnOptions(n)), out = new Set();
      for (const e of AREA[EXIT[from].areaId].exits){ const a = ARRIVAL_ENTR[eff[e.key]]; if (opts.has(a)) out.add(a); }
      if (out.size === 1) return [...out][0];
    }
    return n;
  }
  return n;
}
let linkPendingEntr = null, linkGrottoEntr = null;   // entrée découverte en attente d'arrivée ; entrée qui mène dans une grotte inconnue
function linkEntranceDiscovered(d){
  if (!store.ui.link.entrances) return;
  const now = Date.now();
  // une sortie de grotte (0x800 + i) dit dans quelle grotte menait l'entrée précédente
  if (d >= GROTTO_EXIT_START && d < GROTTO_EXIT_START + GROTTO_RETURN.length){
    linkGrottoIn = [d - GROTTO_EXIT_START];
    if (linkGrottoEntr !== null){ linkNoteEntrance(linkGrottoEntr, GROTTO_LOAD_START + (d - GROTTO_EXIT_START)); linkUnask(linkGrottoEntr); }
    linkGrottoEntr = null;
  }
  // en entrées couplées, le jeu signale aussi le sens inverse aussitôt : on garde la première
  if (linkPendingEntr && now - linkPendingEntr.t < 300) return;
  const target = linkSpoilerOverride(d);
  if (target !== undefined){ linkNoteEntrance(d, target); linkPendingEntr = null; return; }
  linkPendingEntr = { d, t:now };
}
function linkEntranceArrival(x){
  if (!x || x.isSaveLoaded === false || !store.ui.link.entrances || !linkPendingEntr || Date.now() - linkPendingEntr.t > 15000) return;
  let a = linkArrival(x, true);
  const d = linkPendingEntr.d, src = EXIT_BY_ENTR[d];
  linkPendingEntr = null;
  // arrivée ambiguë — devant une grotte ou à l'arrivée normale de l'entrée générique (a null), dans l'une des grottes
  // qui partagent l'entrée (a 'grotto') : la seule arrivée encore possible pour la sortie prise (pools, destinations
  // déjà prises), sinon on demande au joueur (une grotte reste aussi reconnue au signalement de sa sortie)
  if ((a === null || a === 'grotto') && src && isRandomized(src, store.settings)){
    const cands = new Set(candidatesFor(src.key).map(e => e.key));
    const opts = (a === null ? linkReturnOptions(x.entranceIndex) : GROTTO_LOAD[x.entranceIndex].map(i => GROTTO_LOAD_START + i))
      .filter(o => cands.has(EXIT_BY_ARRIVAL[o]));
    if (a === 'grotto') linkGrottoEntr = d;
    if (opts.length === 1) a = opts[0];
    else { if (opts.length > 1) linkAskEntrance(d, opts); return; }
  }
  if (typeof a === 'number') linkNoteEntrance(d, a);
}
/* Question au joueur : où mène l'entrée d (arrivées possibles opts) ? Une seule question par entrée ; elle tombe si
   l'entrée est notée entre-temps (à la main, par le spoiler ou au signalement de la sortie de grotte). */
function linkAskEntrance(d, opts){
  linkUnask(d);
  link.ask.push({ d, opts, seq:linkSeq + 1 });   // posée avant la mise à jour de la position pour cette arrivée
  if (link.ask.length > 5) link.ask.shift();
  const x = EXIT_BY_ENTR[d];
  linkLog(`Entrée à préciser : ${AREA[x.areaId].name} · ${x.label} (${opts.length} arrivées possibles)`);
}
function linkUnask(d){ link.ask = link.ask.filter(q => q.d !== d); }
// Réponse du joueur : note l'entrée ; si c'est l'arrivée courante, la position (et le départ du Routeur) suit.
function linkAnswer(q, a){
  linkUnask(q.d);
  if (a == null) return;
  linkNoteEntrance(q.d, a);
  if (q.seq === linkSeq && EXIT[EXIT_BY_ARRIVAL[a]]){
    if (a >= GROTTO_LOAD_START && a < GROTTO_EXIT_START) linkGrottoIn = [a - GROTTO_LOAD_START];
    linkSetPosition(EXIT_BY_ARRIVAL[a], link.position?.age || null);
  }
}
// Questions encore ouvertes (l'entrée n'a pas été notée entre-temps).
const linkAsks = () => link.ask.filter(q => !store.mappings[EXIT_BY_ENTR[q.d]?.key]);
// Note dans Entrées : la sortie prise (entrée d) mène là où l'on apparaît par l'entrée a.
function linkNoteEntrance(d, a){
  const x = EXIT_BY_ENTR[d], target = EXIT_BY_ARRIVAL[a];
  if (!x || !target || !EXIT[target] || !isRandomized(x, store.settings) && !x.specialTag) return false;
  if (store.mappings[x.key] === target) return false;
  setMapping(x.key, target);
  linkLog(`Entrée notée : ${AREA[x.areaId].name} · ${x.label} → ${AREA[EXIT[target].areaId].name} · ${EXIT[target].label}`);
  return true;
}
// Spoiler caché : destination réelle de l'entrée d (undefined si pas de spoiler valable ou entrée absente).
function linkSpoilerOverride(d){
  if (!linkSpoilerOk()) return undefined;
  const e = linkSpoiler.entrances.find(e => e.index === d);
  return e ? e.override : undefined;
}
// Rattrapage des entrées découvertes avant de lancer le relais (sauvegarde complète + spoiler caché).
function linkSpoilerEntrances(bits){
  if (!store.ui.link.entrances || !linkSpoilerOk() || !Array.isArray(bits)) return;
  let n = 0;
  for (const e of linkSpoiler.entrances){
    const i = e.index >> 5;
    if (i < bits.length && (bits[i] >>> (e.index & 31)) & 1 && linkNoteEntrance(e.index, e.override)) n++;
  }
  if (n) linkLog(`${n} entrée${n > 1 ? 's' : ''} notée${n > 1 ? 's' : ''} d'après la sauvegarde et le spoiler`);
}

// Petites clés en poche vues pour la dernière fois, par index de donjon (ajout de celles ramassées en direct).
const linkKeysSeen = {};
function linkDungeonKeys(index, inHand){
  const id = Object.keys(DUNGEON_INDEX).find(k => DUNGEON_INDEX[k] === index), n = Math.max(0, inHand ?? 0);
  if (!id) return;
  const d = store.game.dungeons[id], prev = linkKeysSeen[index];
  if (prev !== undefined && n > prev) d.keys += n - prev;
  if (d.keys < n) d.keys = n;
  linkKeysSeen[index] = n;
}
/* Ce que la sauvegarde dit de la partie : une ligne par donnée suivie { sec, key, obj, field, value, it?, label? } —
   objets et chants, carte / boussole / clé du boss / âme de chaque donjon, clés des portes et haricots ; cœurs : on garde
   les réceptacles notés, les quarts complètent jusqu'au total du jeu. Petites clés à part (linkDungeonKeys). */
const DUNGEON_FIELDS = { map:'Carte', compass:'Boussole', bossKey:'Clé du boss', soul:'Âme du boss' };
function linkExpected(st){
  const g = linkSaveToGame(st, store.settings), game = store.game, out = [];
  const item = (obj, k, v) => { const it = ITEM_BY_KEY[k]; if (it && !it.locked) out.push({ sec:'items', key:'items:' + k, obj, field:k, value:v, it }); };
  for (const [k, v] of Object.entries(g.items)) item(game.items, k, v);
  for (const [k, v] of Object.entries(g.songs)) item(game.songs, k, v);
  for (const [id, d] of Object.entries(g.dungeons)) for (const f of Object.keys(DUNGEON_FIELDS)) if (d[f] !== undefined)
    out.push({ sec:'dungeons', key:'dungeons:' + id + '.' + f, obj:game.dungeons[id], field:f, value:d[f], label:DUNGEON_FIELDS[f] + ' · ' + (CHECK_AREAS.find(x => x.dungeon === id)?.label || DUNGEON_BY_ID[id].title) });
  for (const name of ['keys', 'beans']) for (const [id, v] of Object.entries(g.checklists[name])){
    const loc = CHECKLISTS[name].locations.find(l => l.id === id);
    out.push({ sec:'checklists', key:'checklists:' + name + '.' + id, obj:game.checklists[name], field:id, value:v, label:CHECKLISTS[name].title + ' · ' + (loc ? loc.label : id) });
  }
  const extra = g.hearts.total - (store.settings.startingHearts ?? 3);
  if (extra >= 0){
    let c = Math.min(game.items.heartContainers, extra), p = (extra - c) * 4 + g.hearts.pieces;
    if (p > 36){ c = Math.min(8, extra); p = Math.max(0, (extra - c) * 4) + g.hearts.pieces; }
    item(game.items, 'heartContainers', c); item(game.items, 'heartPieces', Math.min(36, p));
  }
  return { list:out, dungeons:g.dungeons };
}
function linkApplyItems(st){
  const exp = linkExpected(st);
  let changed = 0;
  for (const e of exp.list) if (e.obj[e.field] !== e.value){ e.obj[e.field] = e.value; changed++; }
  for (const [id, d] of Object.entries(exp.dungeons)) linkDungeonKeys(DUNGEON_INDEX[id], d.keysInHand);
  if (changed) linkLog(`Panneau Objets mis à jour (${changed} changement${changed > 1 ? 's' : ''})`);
}
/* Écart avec la sauvegarde : tout ce qui diffère encore entre la partie notée et la sauvegarde complète, une fois
   appliqué ce que l'auto-tracking suit (options) — checks cochés ici mais pas faits dans le jeu (cochés à la main,
   ramassés puis perdus sans sauvegarder, venus d'une autre sauvegarde), faits dans le jeu mais pas cochés, objets,
   chants, donjons, clés des portes et haricots. Relevé à chaque sauvegarde complète : link.drift, lignes
   { sec, key, sig: 'ici>jeu', from, to, cur() (valeur actuelle), apply(), check? | it? | label? } ; la fenêtre « Écart avec la sauvegarde »
   propose de corriger. Un écart gardé tel quel (game.keepDrift, même signature) n'est plus signalé. */
const NUM_OF_CHECK = {};
for (const [n, c] of Object.entries(CHECK_BY_NUM)) NUM_OF_CHECK[c.id] = +n;
function linkDrift(st){
  const g = store.game, locs = st.rando?.itemLocations || [], rows = [];
  if (locs.length) for (const c of CHECKS){
    const n = NUM_OF_CHECK[c.id];
    if (n == null) continue;
    const done = (locs[n] || [])[0] >= CHECK_DONE, on = !!g.checks[c.id];
    if (done !== on) rows.push({ sec:on ? 'checksExtra' : 'checksMissing', key:'checks:' + c.id, from:on, to:done, check:c, cur:() => !!g.checks[c.id], apply:() => setCheck(c.id, done) });
  }
  if (st.inventory) for (const e of linkExpected(st).list){
    const from = e.obj[e.field];
    if (num01(from) !== num01(e.value)) rows.push({ sec:e.sec, key:e.key, from, to:e.value, it:e.it, label:e.label, cur:() => e.obj[e.field], apply:() => { e.obj[e.field] = e.value; } });
  }
  rows.forEach(r => { r.sig = num01(r.from) + '>' + num01(r.to); });
  link.drift = rows.filter(r => g.keepDrift[r.key] !== r.sig);
}
function linkCheckDone(rc){
  const c = CHECK_BY_NUM[rc];
  if (!c || store.game.checks[c.id]) return false;
  store.game.checks[c.id] = true;
  return true;
}

/* Temps de jeu : le jeu n'envoie pas son compteur (playTimer de la sauvegarde) ; l'appli cumule les périodes où le jeu est
   connecté avec la partie notée chargée (game.play : [[début, fin], …], heure réelle), mises à jour toutes les 10 s ; une
   coupure de plus de 30 s ouvre une nouvelle période. Seulement pendant que le relais et l'appli tournent. */
function linkPlayTick(){
  if (link.status !== 'game' || !link.client?.isSaveLoaded || link.foreign) return;
  const g = store.game, now = Date.now();
  if (!Array.isArray(g.play)) g.play = [];
  const last = g.play[g.play.length - 1];
  if (last && now - last[1] <= 30000) last[1] = now; else g.play.push([now, now]);
}
if (!STREAM_MODE) setInterval(linkPlayTick, 10000);

/* Fenêtre de stream (pas de relais) : la fenêtre principale lui passe la position (en temps réel et dernière entrée) par
   le navigateur (localStorage LIVE_KEY, événement « storage »), pour son bloc Carte. */
const LIVE_KEY = 'oeil-sheikah-live';
if (!STREAM_MODE) watch(() => [link.live, link.position], ([live, position]) => {
  try { localStorage.setItem(LIVE_KEY, JSON.stringify({ live, position })); } catch (e) {}
});
else {
  const take = raw => { try { const v = JSON.parse(raw); link.live = v.live || null; link.position = v.position || null; } catch (e) {} };
  try { const raw = localStorage.getItem(LIVE_KEY); if (raw) take(raw); } catch (e) {}
  window.addEventListener('storage', ev => { if (ev.key === LIVE_KEY && ev.newValue) take(ev.newValue); });
}

linkLoadSpoiler();
// (Re)connexion selon l'option, au chargement et quand elle change.
// (pas dans la fenêtre de stream : la fenêtre principale suit le jeu, sinon les trouvailles seraient comptées deux fois)
if (!STREAM_MODE) watch(() => [store.ui.link.enabled, store.ui.link.url], ([on]) => { if (on) linkStart(); else linkStop(); }, { immediate:true });
if (!STREAM_MODE) watch(() => store.ui.link.live, linkSyncLive);
