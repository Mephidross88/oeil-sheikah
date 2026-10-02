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
  es.onerror = () => { if (link.status !== 'connecting') linkLog('Relais injoignable, nouvelle tentative…'); link.status = 'connecting'; };
}
function linkStop(){
  if (linkSource){ linkSource.close(); linkSource = null; }
  link.status = 'off'; link.client = null; link.player = null;
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
    case 'ENTRANCE_DISCOVERED': return `Entrée découverte : ${p.entranceIndex}`;
    case 'UPDATE_TEAM_STATE': return 'Sauvegarde complète reçue';
    case 'GIVE_ITEM': return `Objet reçu : ${p.modId ? (LINK_DATA.rg[p.getItemId] || p.getItemId).toLowerCase().replace(/_/g, ' ') : GI_NAMES[p.getItemId] || 'objet du jeu ' + p.getItemId}`;
    case 'UPDATE_DUNGEON_ITEMS': return 'Objets de donjon mis à jour';
    case 'GAME_COMPLETE': return 'Ganon vaincu !';
    default: return p.type;
  }
}
function linkHandle(m){
  link.lastAt = Date.now();
  if (m.type === 'hello'){
    linkLog('Relais connecté');
    link.status = m.game ? 'game' : 'relay';
    link.client = m.clientState || null; link.player = m.player || null;
    if (m.teamState) linkApply({ type:'UPDATE_TEAM_STATE', state:m.teamState });
    linkPositionFrom(m.player || m.clientState);
    return;
  }
  if (m.type === 'game'){
    link.status = m.connected ? 'game' : 'relay';
    link.client = m.connected ? m.clientState : null;
    linkLog(m.connected ? 'Jeu connecté' : 'Jeu déconnecté');
    return;
  }
  if (m.type === 'client'){ link.client = m.clientState; linkPositionFrom(m.clientState); return; }
  if (m.type === 'player'){ link.player = m.player; linkPositionFrom(m.player); return; }
  if (m.type === 'packet'){
    if (m.packet.type !== 'SET_FLAG' && m.packet.type !== 'UNSET_FLAG') linkLog(linkDescribe(m.packet));
    linkApply(m.packet);
  }
}
// Statuts d'un check dans SoH (RandomizerCheckStatus, RandomizerMiscEnums.h) ; ramassé (4) et sauvegardé (5) = fait.
const CHECK_STATUS_FR = ['non vu', 'vu', 'identifié', 'repéré', 'ramassé', 'sauvegardé'];
const CHECK_DONE = 4;
// Application des paquets à la partie. Checks : un check fait dans le jeu est coché (jamais décoché : un check coché à
// la main reste coché). Objets : le panneau reprend la sauvegarde complète (linkSaveToGame). Étapes suivantes :
// position, entrées.
function linkApply(p){
  if (store.ui.link.checks){
    if (p.type === 'SET_CHECK_STATUS' && p.status >= CHECK_DONE) linkCheckDone(p.rc);
    if (p.type === 'UPDATE_TEAM_STATE'){
      const locs = p.state?.rando?.itemLocations || [];
      let n = 0;
      locs.forEach((x, rc) => { if (x && x[0] >= CHECK_DONE && linkCheckDone(rc)) n++; });
      if (n) linkLog(`${n} check${n > 1 ? 's' : ''} coché${n > 1 ? 's' : ''} d'après la sauvegarde`);
    }
  }
  if (p.type === 'GIVE_ITEM') linkLoot(p);
  if (store.ui.link.items){
    if (p.type === 'UPDATE_TEAM_STATE' && p.state?.inventory) linkApplyItems(p.state);
    // petite clé ramassée en direct : le jeu n'envoie que les clés en poche, on ajoute ce qui arrive
    if (p.type === 'UPDATE_DUNGEON_ITEMS') linkDungeonKeys(p.mapIndex, p.dungeonKeys);
  }
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
   suit (ui.link.position). Entrée inconnue (grottes, scènes non mélangées, écran titre) : position inchangée. */
function linkPositionFrom(x){
  if (!x || (x.isSaveLoaded === false)) return;
  const key = EXIT_BY_ARRIVAL[x.entranceIndex];
  const age = x.linkAge === 0 ? 'adult' : x.linkAge === 1 ? 'child' : link.position?.age || null;
  if (!key || !EXIT[key]) return;
  if (link.position && link.position.key === key && link.position.age === age) return;
  link.position = { key, age };
  if (!store.ui.link.position) return;
  const r = store.ui.router;
  if (r.fromExit !== key){ r.fromArea = EXIT[key].areaId; r.fromExit = key; }
  if (age) r.fromAge = age;
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
function linkApplyItems(st){
  const g = linkSaveToGame(st, store.settings), game = store.game;
  let changed = 0;
  const set = (obj, k, v) => { if (obj[k] !== v){ obj[k] = v; changed++; } };
  for (const [k, v] of Object.entries(g.items)) if (ITEM_BY_KEY[k] && !ITEM_BY_KEY[k].locked) set(game.items, k, v);
  for (const [k, v] of Object.entries(g.songs)) set(game.songs, k, v);
  for (const [id, d] of Object.entries(g.dungeons)){
    for (const f of ['map', 'compass', 'bossKey', 'soul']) if (d[f] !== undefined) set(game.dungeons[id], f, d[f]);
    linkDungeonKeys(DUNGEON_INDEX[id], d.keysInHand);
  }
  for (const name of ['keys', 'beans']) for (const [id, v] of Object.entries(g.checklists[name])) set(game.checklists[name], id, v);
  // cœurs : on garde les réceptacles notés, les quarts complètent jusqu'au total du jeu
  const extra = g.hearts.total - (store.settings.startingHearts ?? 3);
  if (extra >= 0){
    let c = Math.min(game.items.heartContainers, extra), p = (extra - c) * 4 + g.hearts.pieces;
    if (p > 36){ c = Math.min(8, extra); p = Math.max(0, (extra - c) * 4) + g.hearts.pieces; }
    set(game.items, 'heartContainers', c); set(game.items, 'heartPieces', Math.min(36, p));
  }
  if (changed) linkLog(`Panneau Objets mis à jour (${changed} changement${changed > 1 ? 's' : ''})`);
}
function linkCheckDone(rc){
  const c = CHECK_BY_NUM[rc];
  if (!c || store.game.checks[c.id]) return false;
  store.game.checks[c.id] = true;
  return true;
}

// (Re)connexion selon l'option, au chargement et quand elle change.
watch(() => [store.ui.link.enabled, store.ui.link.url], ([on]) => { if (on) linkStart(); else linkStop(); }, { immediate:true });
