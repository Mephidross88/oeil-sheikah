// Test du moteur de logique (js/logic.js) contre des spoilers SoH 9.2.3 — outil de test, jamais utilisé par l'appli.
// Pour chaque spoiler : configuration importée (settings, enabledTricks, masterQuestDungeons), puis sphère par sphère on
// ramasse les objets de TOUS les checks accessibles (objets du spoiler, ou objet vanilla d'un check non mélangé),
// jusqu'au point fixe. Attendu : chaque lieu du « playthrough » et chaque lieu du spoiler finit par être atteint.
// (Les numéros de sphère du playthrough, compressés par SoH après élagage, ne sont qu'indicatifs : voir V=1.)
// Entrées mélangées : le rejeu utilise les entrées du spoiler ; en plus, ces entrées sont converties en destinations notées
// (store.mappings, comme dans la page Entrées) et les liaisons qu'en déduit l'appli (entranceLinks) sont comparées à celles
// du spoiler (aucune différence attendue). Enfin, à chaque sphère, les régions que le Routeur traverse depuis l'apparition
// de l'âge de départ (routeGraph) sont comparées à celles que la logique déclare accessibles (aucune différence attendue).
// Usage : node replay_spoilers.mjs <dossier ou fichiers .json …>   (V=1 : détail)
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../');

function loadApp(){
  const ctx = { console, Math, JSON, Object, Array, Set, Map, String, Number, Date, RegExp, Error, parseInt, isNaN,
    localStorage:{ getItem:() => null, setItem(){} } };
  ctx.window = ctx;
  ctx.Vue = { reactive:x => x, ref:v => ({ value:v }), computed:f => ({ get value(){ return f(); } }), watch(){}, watchEffect(){},
    createApp:() => ({ component(){ return this; }, mount(){} }), defineComponent:x => x, nextTick(){}, onMounted(){}, onBeforeUnmount(){},
    toRaw:x => x, h(){} };
  vm.createContext(ctx);
  for (const f of ['data/areas-data.js', 'data/checks-data.js', 'data/logic-data.js', 'js/icons.js', 'js/data.js', 'js/config.js', 'js/entrances.js',
    'js/items.js', 'js/checks.js', 'js/logic.js', 'js/state.js'])
    vm.runInContext(fs.readFileSync(path.join(APP, f), 'utf8'), ctx, { filename:f });
  vm.runInContext('globalThis.__T = { store, defaults, computeSoh, SETTING_BY_SOH, TRICKS, DUNGEONS, CHECK_BY_SOH, CHECK_BY_ID, checkShuffled, checkQuestActive, applyStartingItems, configQuest, CHECKLISTS, ITEM_BY_KEY, itemLevels, SOH, L, sohWarned, TRIALS, configTrials, routeGraph, blueWarpTargets, exitRegions, ALL_EXITS, EXIT, SPAWN_AREA, sohStartingAge, entranceLinks, computeEff, EXIT_BY_ENTR, SOH_ENTRANCE, BOSS_DOORS };', ctx);
  return ctx.__T;
}
const T = loadApp();
const TRICK_BY_NAME = Object.fromEntries(T.TRICKS.map(t => [t.soh || t.name, t]));

// ---------- objets du spoiler (noms français) -> panneau Objets ----------
const DUNGEON_FR = { "Arbre Mojo":'dekuTree', 'Caverne Dodongo':'dodongosCavern', 'Ventre de Jabu-Jabu':'jabuJabu', 'Puits':'bottomOfTheWell',
  'Gymnase Gerudo':'gerudoTrainingGround', 'Repaire des Voleurs':'gerudoFortress', 'Château de Ganon':'ganonsCastle',
  'Temple de la Forêt':'forestTemple', 'Temple du Feu':'fireTemple', 'Temple de Feu':'fireTemple', "Temple de l'Eau":'waterTemple',
  "Temple de l'Ombre":'shadowTemple', "Temple de l'Esprit":'spiritTemple', 'Caverne Polaire':'iceCavern' };
const DOOR_KEYS_FR = ['Clé de la Maison des Gardes', 'Clé du Bazar de la Place du Marché', 'Clé du Magasin de Potions de la Place du Marché',
  'Clé de la Foire aux Masques', 'Clé du Stand de Tir de la Place du Marché', 'Clé du Bowling Teigneux', 'Clé de la Chasse au Trésor',
  'Clé du Magasin de Missiles', 'Clé de la Maison de Kiki', 'Clé de la Maison de la Ruelle', 'Clé du Bazar de Cocorico',
  'Clé du Magasin de Potions de Cocorico', 'Clé de la Maison du Chef des Ouvriers', "Clé de l'Apothicaire", 'Clé de la Maison des Araignées',
  "Clé de la Maison d'Impa", 'Clé du Moulin', 'Clé du Stand de Tir de Cocorico', "Clé de la Cabane d'Igor", 'Clé de la Maison de Talon',
  'Clé des Écuries', 'Clé du Silo', 'Clé du Laboratoire du Lac Hylia', "Clé de l'Étang"];
const BEAN_SOULS = { 'Death Mountain Crater Bean Soul':'cratere_du_peril', 'Death Mountain Trail Bean Soul':'chemin_du_peril',
  'Desert Colossus Bean Soul':'colosse_du_desert', 'Gerudo Valley Bean Soul':'vallee_gerudo', 'Graveyard Bean Soul':'cimetiere',
  'Kokiri Forest Bean Soul':'foret_kokiri', 'Lake Hylia Bean Soul':'lac_hylia', 'Lost Woods Bridge Bean Soul':'pont_des_bois_perdus',
  'Lost Woods Bean Soul':'theatre_mojo', "Zora's River Bean Soul":'riviere_zora' };
const SOULS = { 'Âme de Gohma':'dekuTree', 'Âme du Roi Dodongo':'dodongosCavern', 'Âme de Barinade':'jabuJabu',
  'Âme de Ganon Spectral':'forestTemple', 'Âme de Volcania':'fireTemple', 'Âme de Vulcania':'fireTemple', 'Âme de Morpha':'waterTemple',
  'Âme de Bongo Bongo':'shadowTemple', 'Âme du Duo Maléfique':'spiritTemple', 'Âme de Ganon':'ganonsCastle' };
const FLAGS = { 'Amour de Nayru':'nayrusLove', 'Boomerang':'boomerang', 'Bottes de airs':'hoverBoots', 'Bottes de plomb':'ironBoots',
  'Bouclier Hylien':'hylianShield', 'Bouclier Miroir':'mirrorShield', 'Bouclier Mojo':'dekuShield', 'Acheter: Bouclier Mojo':'dekuShield',
  'Acheter: Bouclier Hylien':'hylianShield', 'Acheter: Tunique Goron':'goronTunic', 'Acheter: Tunique Zora':'zoraTunic',
  'Tunique Goron':'goronTunic', 'Tunique Zora':'zoraTunic', 'Canne à Pêche':'fishingRod', 'Carte Gerudo':'gerudoCard',
  'Double Défence':'doubleDefense', 'Feu de Din':'dinsFire', 'Vent de Farore':'faroresWind', 'Monocle de Vérité':'truthLens',
  'Masse des Titans':'titanMass', 'Flèche de Feu':'fireArrows', 'Flèches de Feu':'fireArrows', 'Flèche de Glace':'iceArrows',
  'Flèches de Glace':'iceArrows', 'Flèche de Lumière':'lightArrows', 'Flèches de Lumière':'lightArrows', 'Haricots Magiques':'beans',
  'Paquet de Haricots Magiques':'beans', 'Pierre de Souffrance':'stoneOfAgony', 'Rubis Greg':'greg', 'Épée Kokiri':'kokiriSword',
  'Épée de Legende':'masterSword', 'Épée de Biggoron':'biggoronSword', 'Émeraude Kokiri':'kokiriEmerald', 'Rubis Goron':'goronRuby',
  'Saphir Zora':'zoraSapphire', 'Médaillon de la Forêt':'forestMedallion', 'Médaillon du Feu':'fireMedallion',
  "Médaillon de l'Eau":'waterMedallion', "Médaillon de l'Esprit":'spiritMedallion', "Médaillon de l'Ombre":'shadowMedallion',
  'Médaillon de la Lumière':'lightMedallion', 'Bouteille avec la Lettre de Ruto':'rutoLetter', 'Lettre de Zelda':'zeldasLetter',
  'Oeuf Curieux':'weirdEgg', 'Oeuf de poche':'pocketEgg', "P'tit Poulet":'cojiro', 'Champignon Suspect':'oddMushroom',
  'Champigon Suspect':'oddMushroom', 'Mixture Suspecte':'oddPotion', 'Scie du Chasseur':'poachersSaw', 'Épée Brisée de Goron':'brokenSword',
  'Ordonnance':'prescription', 'Crapaud-qui-louche':'eyeballFrog', 'Super Gouttes':'eyedrops', 'Certificat':'claimCheck',
  'Masque du Renard':'keatonMask', 'Masque de Mort':'skullMask', "Masque d'Effroi":'spookyMask', 'Masque du Lapin':'bunnyHood',
  'Masque de Goron':'goronMask', 'Masque de Zora':'zoraMask', 'Masque de Gerudo':'gerudoMask', 'Masque de Vérité':'maskOfTruth',
  'Touche A de l\'Ocarina':'noteA', 'Touche C-Bas de l\'Ocarina':'noteCDown', 'Touche C-Droit de l\'Ocarina':'noteCRight',
  'Touche C-Gauche de l\'Ocarina':'noteCLeft', 'Touche C-Haut de l\'Ocarina':'noteCUp', 'Noix Blabla Gerudo':'speakGerudo',
  'Noix Blabla Goron':'speakGoron', 'Noix Blabla Hylienne':'speakHylian', 'Noix Blabla Kokiri':'speakKokiri', 'Noix Blabla Mojo':'speakDeku',
  'Noix Blabla Zora':'speakZora', "Roc's Feather":'rocsFeather', 'Ramper':'crawl', 'Nager':'swim', 'Grimper':'climb', 'Saisir':'grab', 'Ouvrir les Coffres':'openChests' };
const SONGS = { 'Berceuse de Zelda':'zeldaLullaby', "Chant d'Epona":'eponasSong', 'Chant de Saria':'sariasSong', 'Chant du Soleil':'sunsSong',
  'Chant du Temps':'songOfTime', 'Chant des Tempêtes':'songOfStorms', 'Menuet des Bois':'minuet', 'Boléro du Feu':'bolero',
  "Sérénade de l'Eau":'serenade', 'Requiem des Esprits':'requiem', "Nocturne de l'Ombre":'nocturne', 'Prélude de la Lumière':'prelude' };
const unknownItems = new Map();
// lieux du spoiler absents de la page Checks
const EXTRA = { RC_HC_ZELDAS_LETTER:{ id:'HC_ZELDAS_LETTER', soh:'HC Zeldas Letter' }, RC_TRIFORCE_COMPLETED:{ id:'TRIFORCE_COMPLETED', soh:'Completed Triforce' },
  RC_GANON:{ id:'GANON', soh:'Ganon' } };

function give(name){
  const g = T.store.game, it = g.items, s = T.store.settings;
  const up = (k, max) => { const lv = T.itemLevels(T.ITEM_BY_KEY[k]); const next = lv.find(l => l > it[k]); if (next !== undefined) it[k] = next; };
  if (name in FLAGS){ it[FLAGS[name]] = true; return; }
  if (name in SONGS){ g.songs[SONGS[name]] = true; return; }
  if (name in BEAN_SOULS){ g.checklists.beans[BEAN_SOULS[name]] = true; return; }
  if (name in SOULS){ g.dungeons[SOULS[name]].soul = true; return; }
  const dk = DOOR_KEYS_FR.indexOf(name);
  if (dk >= 0){ g.checklists.keys[T.CHECKLISTS.keys.locations[dk].id] = true; return; }
  let m;
  if ((m = name.match(/^Petite Clé d(?:u|e la|e l'|u) ?(.*)$/)) || (m = name.match(/^Petite Clé du (.*)$/))){
    const id = Object.entries(DUNGEON_FR).find(([fr]) => name.endsWith(fr))?.[1];
    if (id){ g.dungeons[id].keys++; return; }
  }
  if (name.startsWith('Trousseau ')){ const id = Object.entries(DUNGEON_FR).find(([fr]) => name.endsWith(fr))?.[1]; if (id){ g.dungeons[id].ringGot = true; return; } }
  if (name.startsWith("Clé d'Or")){ const id = Object.entries(DUNGEON_FR).find(([fr]) => name.endsWith(fr))?.[1]; if (id){ g.dungeons[id].bossKey = true; return; } }
  if (name.startsWith('Carte ') && name !== 'Carte Gerudo'){ const id = Object.entries(DUNGEON_FR).find(([fr]) => name.endsWith(fr))?.[1]; if (id){ g.dungeons[id].map = true; return; } }
  if (name.startsWith('Boussole ')){ const id = Object.entries(DUNGEON_FR).find(([fr]) => name.endsWith(fr))?.[1]; if (id){ g.dungeons[id].compass = true; return; } }
  if (name.startsWith('Bouteille ')){ it.bottle = Math.min(4, it.bottle + 1); return; }
  switch (name){
    case 'Amélioration de Force (prog.)': if (s.shuffleGrab === 'On' && !it.grab) it.grab = true; else up('strength'); return;
    case 'Écaille (prog.)': if (s.shuffleSwim === 'On' && !it.swim) it.swim = true; else up('scale'); return;
    case 'Arc (prog.)': up('bow'); return;
    case 'Bourse (prog.)': up('wallet'); return;
    case 'Grappin (prog.)': up('hookshot'); return;
    case 'Lance-Pierre (prog.)': up('slingshot'); return;
    case 'Sac de Bombes (prog.)': up('bombBag'); return;
    case 'Capacité de Bâtons (prog.)': up('sticks'); return;
    case 'Capacité de Noix (prog.)': up('nuts'); return;
    case 'Jauge de Magie (prog.)': up('magic'); return;
    case 'Ocarina (prog.)': up('ocarina'); return;
    case 'Missiles (prog.)': case 'Sac de Missiles Teigneux': case 'Missiles (10)': case 'Missiles (20)': case 'Missiles (5)':
      if (!it.bombchus) up('bombchus'); else if (name === 'Missiles (prog.)') up('bombchus'); return;
    case 'Quart de Coeur': case 'Quart de Coeur (Chasse-aux-Trésors)': it.heartPieces++; return;
    case 'Réceptacle de Coeur': it.heartContainers++; return;
    case "Symbole de Skulltula d'Or": it.skulltulaTokens++; return;
    case 'Triforce Piece': it.triforcePieces++; return;
    // « TranslateThis » : Grimper / Ouvrir les coffres, non traduits dans les spoilers (approximation : les deux d'un coup)
    case 'TranslateThis': if (s.shuffleClimb === 'On') it.climb = true; if (s.shuffleOpenChest === 'On') it.openChests = true; return;
  }
  unknownItems.set(name, (unknownItems.get(name) || 0) + 1);
}

// Objet vanilla d'un check non mélangé (absent des « locations » du spoiler), comme le générateur le ramasse.
const VANILLA_SONGS = { SONG_FROM_IMPA:'zeldaLullaby', SONG_FROM_MALON:'eponasSong', SONG_FROM_SARIA:'sariasSong',
  SONG_FROM_ROYAL_FAMILYS_TOMB:'sunsSong', SONG_FROM_OCARINA_OF_TIME:'songOfTime', SONG_FROM_WINDMILL:'songOfStorms',
  SHEIK_IN_FOREST:'minuet', SHEIK_IN_CRATER:'bolero', SHEIK_IN_ICE_CAVERN:'serenade', SHEIK_AT_COLOSSUS:'requiem',
  SHEIK_IN_KAKARIKO:'nocturne', SHEIK_AT_TEMPLE:'prelude' };
const AREA_DUNGEON = { DEKU_TREE:'dekuTree', DODONGOS_CAVERN:'dodongosCavern', JABU_JABUS_BELLY:'jabuJabu', FOREST_TEMPLE:'forestTemple',
  FIRE_TEMPLE:'fireTemple', WATER_TEMPLE:'waterTemple', SPIRIT_TEMPLE:'spiritTemple', SHADOW_TEMPLE:'shadowTemple',
  BOTTOM_OF_THE_WELL:'bottomOfTheWell', ICE_CAVERN:'iceCavern', GERUDO_TRAINING_GROUND:'gerudoTrainingGround', GANONS_CASTLE:'ganonsCastle',
  GERUDO_FORTRESS:'gerudoFortress' };
function giveVanilla(c){
  const g = T.store.game, it = g.items, s = T.store.settings, up = k => { const lv = T.itemLevels(T.ITEM_BY_KEY[k]); const n = lv.find(l => l > it[k]); if (n !== undefined) it[k] = n; };
  const d = AREA_DUNGEON[c.area];
  if (c.type === 'SKULL_TOKEN'){ it.skulltulaTokens++; return; }
  if (c.id in VANILLA_SONGS){ g.songs[VANILLA_SONGS[c.id]] = true; return; }
  if (c.id === 'TOT_MASTER_SWORD'){ it.masterSword = true; return; }
  if (c.id === 'TRIFORCE_COMPLETED'){ g.dungeons.ganonsCastle.bossKey = true; return; }
  if (c.id === 'KF_KOKIRI_SWORD_CHEST'){ it.kokiriSword = true; return; }
  if (c.id === 'LW_GIFT_FROM_SARIA' || c.id === 'HF_OCARINA_OF_TIME_ITEM'){ up('ocarina'); return; }
  if (c.id === 'HC_MALON_EGG'){ it.weirdEgg = true; return; }
  if (c.id === 'TH_FREED_CARPENTERS'){ it.gerudoCard = true; return; }
  if (c.type === 'MAP' && d){ g.dungeons[d].map = true; return; }
  if (c.type === 'COMPASS' && d){ g.dungeons[d].compass = true; return; }
  if ((c.type === 'SMALL_KEY' || c.type === 'GF_KEY') && d){ g.dungeons[d].keys++; return; }
  if ((c.type === 'BOSS_KEY' || c.type === 'GANON_BOSS_KEY') && d){ g.dungeons[d].bossKey = true; return; }
  const p = T.SOH.prices['RC_' + c.id];
  if (p){
    const v = p[1];
    if (v === 'RG_PROGRESSIVE_STICK_UPGRADE') up('sticks');
    else if (v === 'RG_PROGRESSIVE_NUT_UPGRADE') up('nuts');
    else if (v === 'RG_PIECE_OF_HEART') it.heartPieces++;
    else if (v === 'RG_MAGIC_BEAN') it.beans = true;
    else if (v === 'RG_BUY_DEKU_SHIELD') it.dekuShield = true;
    else if (v === 'RG_BUY_HYLIAN_SHIELD') it.hylianShield = true;
    else if (v === 'RG_BUY_GORON_TUNIC') it.goronTunic = true;
    else if (v === 'RG_BUY_ZORA_TUNIC') it.zoraTunic = true;
  }
}

// Entrées du spoiler -> destinations notées, puis liaisons qu'en déduit l'appli, comparées à celles du spoiler.
function checkLinks(data, links){
  const st = T.store, decoupled = st.settings.decoupleEntrances === 'On';
  st.mappings = {};
  for (const e of data.entrances || []){
    const x = T.EXIT_BY_ENTR[e.index];
    if (!x || (x.specialTag && !decoupled)) continue;   // téléporteurs bleus, et salles de boss en entrées couplées : calculés
    // on apparaît à la cible vanilla de l'entrée « override » ; porte de sortie d'une salle de boss : devant sa porte de boss
    const w = T.EXIT_BY_ENTR[e.override];
    const z = !w ? null : w.specialTag ? T.BOSS_DOORS.find(d => d.vanilla === w.key)?.key : w.vanilla;
    if (z) st.mappings[x.key] = z;
  }
  const ours = T.entranceLinks(T.computeEff(st), st.settings), diffs = [];
  for (const k of new Set([...Object.keys(ours), ...Object.keys(links)])){
    const v = k.split('>')[1], o = k in ours ? ours[k] : v, t = k in links ? links[k] : v;
    if (o !== t) diffs.push(`${k} : appli ${o}, spoiler ${t}`);
  }
  return diffs;
}

// Routeur avec l'inventaire courant et les destinations notées par checkLinks : régions traversées à pied depuis les nœuds
// atteints à partir de l'apparition de l'âge de départ, comparées aux régions que la logique déclare accessibles. Les
// sauvegardes dans un donjon (retour à son entrée, Entrance_SetSavewarpEntrance), que la logique SoH ne modélise pas, sont
// ignorées ; celles qui ramènent à l'apparition de l'âge correspondent à RR_ROOT.
function checkRouter(){
  const st = T.store, eff = T.computeEff(st);
  Object.assign(eff, T.blueWarpTargets(eff, st.settings));
  const links = T.entranceLinks(eff, st.settings), g = T.routeGraph(st.settings, st.game, links, eff, T.defaults().costs);
  const age0 = T.sohStartingAge(st.settings) === 'Adult' ? 'adult' : 'child', start = eff['spawns::spawn_' + age0];
  const seen = new Set(), routed = new Set(), q = start ? [[start, age0, 'in']] : [];
  while (q.length){
    const [k, a, m] = q.shift(), id = k + '|' + a + '|' + m;
    if (seen.has(id)) continue;
    seen.add(id);
    for (const r of g.regions(k, a, m).keys()) routed.add(r);
    for (const e of g.edges(k, a, m)) if (e.kind !== 'reset' || e.to === eff['spawns::spawn_' + e.age]) q.push([e.to, e.age, e.mode]);
  }
  const res = T.computeSoh(st.settings, st.game, links);
  // régions de passage que le Routeur saute (apparitions, plateformes des chants, sorties de salle de boss)
  const transit = r => /^RR_ROOT|^RR_(CHILD|ADULT)_SPAWN$|_OF_[A-Z]+_WARP$|_BOSS_EXIT$/.test(r);
  const logic = new Set(Object.keys(res.access).filter(r => res.access[r] && !transit(r)));
  return [...[...logic].filter(r => !routed.has(r)).map(r => 'logique seule : ' + r),
    ...[...routed].filter(r => !transit(r) && !logic.has(r)).map(r => 'routeur seul : ' + r)];
}

function replay(file){
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const st = T.store, def = T.defaults();
  Object.assign(st, JSON.parse(JSON.stringify({ settings:def.settings, game:def.game })));
  for (const [name, raw] of Object.entries(data.settings)){
    const d = T.SETTING_BY_SOH[name]; if (!d) continue;
    st.settings[d.key] = d.type === 'number' ? parseInt(raw, 10) : String(raw);
  }
  for (const n of data.enabledTricks || []){ const t = TRICK_BY_NAME[n]; if (t) st.settings.tricks[t.key] = true; else console.log('  astuce inconnue', n); }
  const mq = data.masterQuestDungeons || [];
  T.DUNGEONS.forEach(d => { if (d.quest) st.game.dungeons[d.id].quest = mq.includes(d.soh) ? 'MQ' : 'Vanilla'; });
  // épreuves de Ganon tirées au sort : liste « requiredTrials » du spoiler (comme l'import des tirages du seed)
  if (T.configTrials(st.settings) === null)
    T.TRIALS.forEach(t => { st.game.trials[t.id] = (data.requiredTrials || []).some(r => t.match.test(r)) ? 'required' : 'skipped'; });
  // trousseaux tirés : on considère le trousseau obtenu à la place des clés (voir give)
  T.applyStartingItems(st.settings);
  // plancher des objets à paliers (raiseToFirstLevel)
  for (const [k, it] of Object.entries(T.ITEM_BY_KEY)) if (it.kind === 'level' && it.levels){ const min = Math.min(...T.itemLevels(it)); if (st.game[it.path][k] < min) st.game[it.path][k] = min; }
  // Entrées mélangées : l'entrée « index » mène là où mène normalement l'entrée « override » (ApplyEntranceOverrides).
  const byIndex = {};
  T.SOH.entrances.forEach(([n, type, from, to]) => { byIndex[n] = { from, to }; });
  const links = {};
  for (const e of data.entrances || []){
    const a = byIndex[e.index], b = byIndex[e.override];
    if (!a || !b){ console.log(`  entrée inconnue : ${e.index} -> ${e.override}`); continue; }
    links[a.from + '>' + a.to] = b.to;
  }
  const linkDiffs = checkLinks(data, links), routeDiffs = new Set();

  const locItem = {};
  for (const [loc, v] of Object.entries(data.locations)) locItem[loc] = typeof v === 'string' ? v : v.item;
  const collected = new Set(), sphereOf = {};
  let sphere = 0, res;
  for (;;){
    // Routeur comparé à la logique avec l'inventaire de cette sphère
    for (const d of checkRouter()) routeDiffs.add(`sphère ${sphere} : ${d}`);
    res = T.computeSoh(st.settings, st.game, links);
    const fresh = [];
    for (const [rc, bits] of Object.entries(res.checks)){
      if (!bits || collected.has(rc)) continue;
      const c = T.CHECK_BY_ID[rc.slice(3)] || EXTRA[rc];
      if (!c){ continue; }
      fresh.push(c);
    }
    if (!fresh.length) break;
    for (const c of fresh){ collected.add('RC_' + c.id); sphereOf[c.soh] = sphere; }
    for (const c of fresh){ const item = locItem[c.soh]; if (item) give(item); else giveVanilla(c); }
    sphere++;
    if (sphere > 60) break;
  }
  // comparaison au playthrough
  const late = [], never = [];
  Object.entries(data.playthrough).forEach(([sph, locs], k) => {
    for (const loc of Object.keys(locs)){
      if (!(loc in sphereOf)) never.push(`${sph} ${loc} (${locs[loc]})`);
      else if (sphereOf[loc] > k) late.push(`${sph} ${loc} : notre sphère ${sphereOf[loc]}`);
    }
  });
  // lieux du spoiler jamais atteints (tous doivent l'être si « All Locations Reachable »)
  const unreached = Object.keys(locItem).filter(l => !(l in sphereOf) && T.CHECK_BY_SOH[l]);
  return { file:path.basename(file), version:data.version, spheres:sphere, reached:Object.keys(sphereOf).length, total:Object.keys(locItem).length,
    late, never, unreached, linkDiffs, routeDiffs:[...routeDiffs] };
}

const args = process.argv.slice(2);
if (!args.length){ console.log('Usage : node replay_spoilers.mjs <dossier ou fichiers .json …>'); process.exit(1); }
const files = args.flatMap(a => fs.statSync(a).isDirectory()
  ? fs.readdirSync(a).filter(f => f.endsWith('.json')).map(f => path.join(a, f)) : [a])
  .filter(f => { try { const j = JSON.parse(fs.readFileSync(f, 'utf8')); return j.playthrough && String(j.version).includes('9.2.3'); } catch { return false; } });
const t0 = Date.now();
for (const f of files){
  const r = replay(f);
  if (r.skipped){ console.log(path.basename(f), '— ignoré :', r.skipped); continue; }
  console.log(`${r.file} : ${r.spheres} sphères ; playthrough : ${r.never.length} lieu(x) jamais atteint(s) ; spoiler : ${r.unreached.length} lieu(x) non atteint(s)`
    + (r.never.length || r.unreached.length ? '  <-- ÉCART' : ''));
  r.never.slice(0, 8).forEach(x => console.log('   JAMAIS  ', x));
  if (r.linkDiffs.length) console.log(`   ${r.linkDiffs.length} liaison(s) déduite(s) des entrées notées différente(s) du spoiler  <-- ÉCART`);
  r.linkDiffs.slice(0, 8).forEach(x => console.log('   LIAISON ', x));
  if (r.routeDiffs.length) console.log(`   ${r.routeDiffs.length} région(s) atteinte(s) différemment par le Routeur et la logique  <-- ÉCART`);
  r.routeDiffs.slice(0, +(process.env.N || 8)).forEach(x => console.log('   ROUTEUR ', x));
  if (process.env.V) r.late.slice(0, 5).forEach(x => console.log('   RETARD  ', x));
  if (process.env.V) r.unreached.slice(0, 40).forEach(x => console.log('   non atteint', x));
}
console.log(`${files.length} spoiler(s) en ${Date.now() - t0} ms`);
if (unknownItems.size && process.env.V) console.log('Objets sans effet sur la logique (rubis, recharges…) :', [...unknownItems.entries()].map(([k, n]) => `${k}(${n})`).join(', '));
if (T.sohWarned.size) console.log('Avertissements :', [...T.sohWarned]);
