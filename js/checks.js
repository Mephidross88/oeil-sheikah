/* ---------- Checks (page Checks) ----------
   Données : window.CHECKS_DATA (checks-data.js, généré depuis SoH). Ici : structures et règles pures d'affichage,
   reprises du tracker de checks de SoH (randomizer_check_tracker.cpp, IsCheckShuffled) — un check n'est listé que
   s'il est mélangé selon la configuration, et seulement dans la version (Vanilla / MQ) active de son donjon. */
// libellés (js/i18n.js) : en anglais, noms du tracker de checks de SoH (zones : nom SoH ; checks : nom court, CHECKS_DATA.en)
const CHECK_AREAS = window.CHECKS_DATA.areas.map(([id, label, soh, dungeon]) => ({ id, label:td(label, soh), soh, dungeon }));
const CHECK_AREA = {};
CHECK_AREAS.forEach(a => { CHECK_AREA[a.id] = a; });
// L'âge et l'accessibilité d'un check ne sont pas ici : ils viennent de la logique (sohC / sohFullC, js/state.js).
const CHECKS = window.CHECKS_DATA.checks.map(([id, area, type, quest, label, soh, region, cat, extra], i) =>
  ({ id, area, type, quest, label:td(label, window.CHECKS_DATA.en?.[i]), soh, region, cat, ...(extra || {}), inDungeon:!!CHECK_AREA[area].dungeon }));
// Catégories de checks (icône icons/checks/<id>.png, filtre de la page Checks), dans l'ordre d'affichage.
const CHECK_CATS = [
  ['chest', 'Coffres', '#b07a2a'], ['skulltula', 'Skulltulas', '#c8a13a'], ['boss', 'Boss', '#8e2447'], ['song', 'Chants', '#3f7fbf'],
  ['npc', 'PNJ et événements', '#6b8f3a'], ['freestanding', 'Objets au sol', '#2f9e6e'], ['scrub', 'Pestes Mojo', '#8a6a3a'],
  ['shop', 'Boutiques et marchands', '#b8572e'], ['cow', 'Vaches', '#7a7a7a'], ['fairy', 'Fées', '#d06aa8'], ['fish', 'Poissons', '#3a8fa8'],
  ['beehive', 'Ruches', '#d9a21b'], ['pot', 'Jarres', '#9a6f4d'], ['crate', 'Caisses', '#8b5e34'], ['grass', 'Herbes', '#5a9a3a'],
  ['tree', 'Arbres et buissons', '#3f7a3a'],
].map(([id, label, color]) => ({ id, label:t(label), color, icon:`icons/checks/${id}.png` }));
const CHECK_CAT = {};
CHECK_CATS.forEach(c => { CHECK_CAT[c.id] = c; });
const CHECK_BY_ID = {}, CHECK_BY_SOH = {}, CHECK_BY_NUM = {};
CHECKS.forEach(c => { CHECK_BY_ID[c.id] = c; CHECK_BY_SOH[c.soh] = c; });
// numéro SoH (énumération RandomizerCheck) -> check : auto-tracking (js/link.js)
(window.CHECKS_DATA.nums || []).forEach((n, i) => { CHECK_BY_NUM[n] = CHECKS[i]; });
const CHECKS_BY_AREA = {};
CHECKS.forEach(c => { (CHECKS_BY_AREA[c.area] = CHECKS_BY_AREA[c.area] || []).push(c); });

// Ordre dans lequel SoH mélange les objets d'une boutique (fill.cpp) : avec N objets, ceux-ci.
const SHOP_SLOT_ORDER = [7, 5, 8, 6, 3, 1, 4, 2];
// Les 3 pestes Mojo toujours mélangées dès que les pestes le sont (« Uniques »).
const MAJOR_SCRUBS = ['LW_DEKU_SCRUB_NEAR_BRIDGE', 'HF_DEKU_SCRUB_GROTTO', 'LW_DEKU_SCRUB_GROTTO_FRONT'];

// Option « Overworld / Donjons / Partout » : le check est-il concerné ?
const zoneOn = (value, c, all) => value === all || (value === 'Overworld' && !c.inDungeon) || (value === 'Dungeons' && c.inDungeon);

// Check mélangé selon la configuration ? `alwaysGS` : afficher les Skulltulas même non mélangées (préférence d'affichage).
function checkShuffled(c, s, alwaysGS){
  const t = c.type, on = v => v === 'On';
  if (t === 'SHOP') return s.shopsanity === 'Random' ? SHOP_SLOT_ORDER.slice(0, 7).includes(c.slot)
    : s.shopsanity === 'Specific Count' && SHOP_SLOT_ORDER.slice(0, s.shopsanityCount).includes(c.slot);
  if (t === 'SCRUB') return s.shuffleScrubs === 'All' || (s.shuffleScrubs !== 'Off' && MAJOR_SCRUBS.includes(c.id));
  if (t === 'MERCHANT') return c.id === 'ZR_MAGIC_BEAN_SALESMAN'
    ? ['Bean Merchant Only', 'All'].includes(s.shuffleMerchants) : ['All But Beans', 'All'].includes(s.shuffleMerchants);
  if (t === 'SONG_LOCATION') return s.shuffleSongs !== 'Off';
  if (t === 'BEEHIVE') return on(s.shuffleBeehives);
  if (t === 'COW') return on(s.shuffleCows);
  if (t === 'OCARINA') return on(s.shuffleOcarinas);
  if (t === 'SKULL_TOKEN') return alwaysGS || zoneOn(s.shuffleTokens, c, 'All Tokens');
  if (t === 'POT') return zoneOn(s.shufflePots, c, 'All Pots');
  if (t === 'GRASS') return zoneOn(s.shuffleGrass, c, 'All Grass');
  if (t === 'CRATE' || t === 'SMALL_CRATE') return zoneOn(s.shuffleCrates, c, 'All Crates');
  if (t === 'NLCRATE') return c.inDungeon ? zoneOn(s.shuffleCrates, c, 'All Crates') : zoneOn(s.shuffleCrates, c, 'All Crates') && s.logic === 'No Logic';
  if (t === 'TREE') return on(s.shuffleTrees);
  if (t === 'NLTREE') return on(s.shuffleTrees) && s.logic === 'No Logic';
  if (t === 'BUSH') return on(s.shuffleBushes);
  if (t === 'FREESTANDING') return zoneOn(s.shuffleFreestanding, c, 'All Items');
  if (t === 'FISH'){
    if (c.pond !== undefined) return ['Shuffle Fishing Pond', 'Shuffle Both'].includes(s.fishsanity) && s.fishsanityPondCount > c.pond
      && (!/^LH_ADULT_/.test(c.id) || on(s.fishsanityAgeSplit));
    return ['Shuffle Overworld Fish', 'Shuffle Both'].includes(s.fishsanity);
  }
  if (t === 'ADULT_TRADE') return on(s.shuffleAdultTrade) || c.id === 'KAK_ANJU_AS_ADULT' || c.id === 'DMT_TRADE_CLAIM_CHECK';
  if (t === 'FROG_SONG') return on(s.shuffleFrogSongRupees);
  if (t === 'MAP' || t === 'COMPASS') return s.mapsCompasses !== 'Vanilla';
  if (t === 'FOUNTAIN_FAIRY') return on(s.shuffleFountainFairies);
  if (t === 'STONE_FAIRY') return on(s.shuffleStoneFairies);
  if (t === 'BEAN_FAIRY') return on(s.shuffleBeanFairies);
  if (t === 'SONG_FAIRY') return on(s.shuffleFairySpots);
  if (t === 'SMALL_KEY') return s.smallKeys !== 'Vanilla';
  if (t === 'BOSS_KEY') return s.bossKeys !== 'Vanilla';
  if (t === 'GANON_BOSS_KEY') return s.ganonsBossKey !== 'Vanilla';
  // récompenses « en fin de donjon » : SoH force la poche de Link sur une récompense (FinalizeSettings)
  if (t === 'LINKS_POCKET') return s.linksPocket !== 'Nothing' || s.dungeonRewards === 'End of Dungeons';
  if (t === 'GF_KEY') return s.gerudoFortressKeys !== 'Vanilla'
    && (s.fortressCarpenters === 'Normal' || (s.fortressCarpenters === 'Fast' && c.id === 'TH_1_TORCH_CARPENTER'));
  if (c.id === 'TH_FREED_CARPENTERS') return on(s.shuffleGerudoCard);
  if (c.id === 'KF_KOKIRI_SWORD_CHEST') return on(s.shuffleKokiriSword);
  if (c.id === 'TOT_MASTER_SWORD') return on(s.shuffleMasterSword);
  if (c.id === 'LH_HYRULE_LOACH') return s.fishsanity === 'Shuffle only Hyrule Loach';
  // FinalizeSettings : œuf jamais mélangé si on passe Zelda enfant ; récompense des 100 Skulltulas toujours mélangée si
  // la clé de Ganon y est
  if (c.id === 'HC_MALON_EGG') return on(s.shuffleWeirdEgg) && s.skipChildZelda !== 'Skip';
  if (c.id === 'KAK_100_GOLD_SKULLTULA_REWARD') return on(s.shuffle100GsReward) || s.ganonsBossKey === '100 GS Reward';
  return true; // STANDARD, DUNGEON_REWARD, BOSS_HEART_OR_OTHER_REWARD…
}

// Check de la version active de son donjon ? quest = 'Vanilla' | 'MQ' | '' (inconnue : seulement les checks communs).
function checkQuestActive(c, quest){
  if (c.quest === 'B') return true;
  return quest === (c.quest === 'M' ? 'MQ' : 'Vanilla');
}

/* ---------- Pierres à potins (page Indices) ----------
   Id = nom de la pierre dans le spoiler de SoH (« Gossip Stone Hints ») ; zone de la page Checks où elle se trouve ;
   libellé français. Le jeu ne signale pas la lecture d'une pierre : le joueur la marque lue. */
const GOSSIP_STONES = [
  ['KF Left Near Deku Gossip Stone', 'KOKIRI_FOREST', 'Près de l’Arbre Mojo, à gauche'],
  ['KF Right Near Deku Gossip Stone', 'KOKIRI_FOREST', 'Près de l’Arbre Mojo, à droite'],
  ['KF Gossip Stone', 'KOKIRI_FOREST', 'Pierre de la forêt'],
  ['KF Storms Grotto Gossip Stone', 'KOKIRI_FOREST', 'Grotte des tempêtes'],
  ['LW Gossip Stone', 'LOST_WOODS', 'Pierre des bois'],
  ['LW Near Shortcuts Grotto Gossip Stone', 'LOST_WOODS', 'Grotte près des raccourcis'],
  ['SFM Near LW Gossip Stone', 'SACRED_FOREST_MEADOW', 'Près des Bois Perdus'],
  ['SFM Center Gossip Stone', 'SACRED_FOREST_MEADOW', 'Au centre'],
  ['SFM Near Saria Gossip Stone', 'SACRED_FOREST_MEADOW', 'Près de Saria'],
  ['HF Cow Grotto Gossip Stone', 'HYRULE_FIELD', 'Grotte à la vache'],
  ['HF Near Market Grotto Gossip Stone', 'HYRULE_FIELD', 'Grotte près du bourg'],
  ['HF Open Grotto Gossip Stone', 'HYRULE_FIELD', 'Grotte ouverte'],
  ['HF Southeast Grotto Gossip Stone', 'HYRULE_FIELD', 'Grotte sud-est'],
  ['Market Leftmost Center Gossip Stone', 'MARKET', 'Temple du Temps, tout à gauche'],
  ['Market Left Center Gossip Stone', 'MARKET', 'Temple du Temps, centre gauche'],
  ['Market Right Center Gossip Stone', 'MARKET', 'Temple du Temps, centre droit'],
  ['Market Rightmost Gossip Stone', 'MARKET', 'Temple du Temps, tout à droite'],
  ['HC Near Malon Gossip Stone', 'HYRULE_CASTLE', 'Près de Malon'],
  ['HC Rock Wall Gossip Stone', 'HYRULE_CASTLE', 'Mur de rochers'],
  ['HC Storm Grotto Gossip Stone', 'HYRULE_CASTLE', 'Grotte des tempêtes'],
  ['Kak Open Grotto Gossip Stone', 'KAKARIKO_VILLAGE', 'Grotte ouverte'],
  ['Graveyard Gossip Stone', 'GRAVEYARD', 'Pierre du cimetière'],
  ['DMT Gossip Stone', 'DEATH_MOUNTAIN_TRAIL', 'Pierre du chemin'],
  ['DMT Storms Grotto Gossip Stone', 'DEATH_MOUNTAIN_TRAIL', 'Grotte des tempêtes'],
  ['GC Maze Gossip Stone', 'GORON_CITY', 'Labyrinthe'],
  ['GC Medigoron Gossip Stone', 'GORON_CITY', 'Près de Medigoron'],
  ['DMC Gossip Stone', 'DEATH_MOUNTAIN_CRATER', 'Pierre du cratère'],
  ['DMC Upper Grotto Gossip Stone', 'DEATH_MOUNTAIN_CRATER', 'Grotte du haut'],
  ['ZR Near Domain Gossip Stone', 'ZORAS_RIVER', 'Près du domaine'],
  ['ZR Near Grottos Gossip Stone', 'ZORAS_RIVER', 'Près des grottes'],
  ['ZR Open Grotto Gossip Stone', 'ZORAS_RIVER', 'Grotte ouverte'],
  ['ZD Gossip Stone', 'ZORAS_DOMAIN', 'Pierre du domaine'],
  ['ZF Near Jabu Gossip Stone', 'ZORAS_FOUNTAIN', 'Près de Jabu-Jabu'],
  ['ZF Near Fairy Gossip Stone', 'ZORAS_FOUNTAIN', 'Près de la fontaine des fées'],
  ['LH Near Lab Gossip Stone', 'LAKE_HYLIA', 'Près du laboratoire'],
  ['LH Southeast Gossip Stone', 'LAKE_HYLIA', 'Sud-est'],
  ['LH Southwest Gossip Stone', 'LAKE_HYLIA', 'Sud-ouest'],
  ['Gerudo Valley Gossip Stone', 'GERUDO_VALLEY', 'Pierre de la vallée'],
  ['Desert Colossus Gossip Stone', 'DESERT_COLOSSUS', 'Pierre du colosse'],
  ["Dodongo's Cavern Gossip Stone", 'DODONGOS_CAVERN', 'Pierre de la caverne'],
].map(([id, area, label]) => ({ id, area, label:td(label, id.replace(/^[A-Z]+ /, '')) }));   // anglais : nom SoH sans la zone
// nom SoH du check de chaque pierre (sans « RC_ ») : sa position sur la carte (data/maps-data.js)
const GOSSIP_STONE_RC = {"KF Left Near Deku Gossip Stone": "KF_DEKU_TREE_LEFT_GOSSIP_STONE", "KF Right Near Deku Gossip Stone": "KF_DEKU_TREE_RIGHT_GOSSIP_STONE", "KF Gossip Stone": "KF_GOSSIP_STONE", "KF Storms Grotto Gossip Stone": "KF_STORMS_GROTTO_GOSSIP_STONE", "LW Gossip Stone": "LW_GOSSIP_STONE", "LW Near Shortcuts Grotto Gossip Stone": "LW_NEAR_SHORTCUTS_GROTTO_GOSSIP_STONE", "SFM Near LW Gossip Stone": "SFM_MAZE_LOWER_GOSSIP_STONE", "SFM Center Gossip Stone": "SFM_MAZE_UPPER_GOSSIP_STONE", "SFM Near Saria Gossip Stone": "SFM_SARIA_GOSSIP_STONE", "HF Cow Grotto Gossip Stone": "HF_COW_GROTTO_GOSSIP_STONE", "HF Near Market Grotto Gossip Stone": "HF_NEAR_MARKET_GROTTO_GOSSIP_STONE", "HF Open Grotto Gossip Stone": "HF_OPEN_GROTTO_GOSSIP_STONE", "HF Southeast Grotto Gossip Stone": "HF_SOUTHEAST_GROTTO_GOSSIP_STONE", "Market Leftmost Center Gossip Stone": "TOT_LEFTMOST_GOSSIP_STONE", "Market Left Center Gossip Stone": "TOT_LEFT_CENTER_GOSSIP_STONE", "Market Right Center Gossip Stone": "TOT_RIGHT_CENTER_GOSSIP_STONE", "Market Rightmost Gossip Stone": "TOT_RIGHTMOST_GOSSIP_STONE", "HC Near Malon Gossip Stone": "HC_MALON_GOSSIP_STONE", "HC Rock Wall Gossip Stone": "HC_ROCK_WALL_GOSSIP_STONE", "HC Storm Grotto Gossip Stone": "HC_STORMS_GROTTO_GOSSIP_STONE", "Kak Open Grotto Gossip Stone": "KAK_OPEN_GROTTO_GOSSIP_STONE", "Graveyard Gossip Stone": "GRAVEYARD_GOSSIP_STONE", "DMT Gossip Stone": "DMT_GOSSIP_STONE", "DMT Storms Grotto Gossip Stone": "DMT_STORMS_GROTTO_GOSSIP_STONE", "GC Maze Gossip Stone": "GC_MAZE_GOSSIP_STONE", "GC Medigoron Gossip Stone": "GC_MEDIGORON_GOSSIP_STONE", "DMC Gossip Stone": "DMC_GOSSIP_STONE", "DMC Upper Grotto Gossip Stone": "DMC_UPPER_GROTTO_GOSSIP_STONE", "ZR Near Domain Gossip Stone": "ZR_NEAR_DOMAIN_GOSSIP_STONE", "ZR Near Grottos Gossip Stone": "ZR_NEAR_GROTTOS_GOSSIP_STONE", "ZR Open Grotto Gossip Stone": "ZR_OPEN_GROTTO_GOSSIP_STONE", "ZD Gossip Stone": "ZD_GOSSIP_STONE", "ZF Near Jabu Gossip Stone": "ZF_JABU_GOSSIP_STONE", "ZF Near Fairy Gossip Stone": "ZF_FAIRY_GOSSIP_STONE", "LH Near Lab Gossip Stone": "LH_LAB_GOSSIP_STONE", "LH Southeast Gossip Stone": "LH_SOUTHEAST_GOSSIP_STONE", "LH Southwest Gossip Stone": "LH_SOUTHWEST_GOSSIP_STONE", "Gerudo Valley Gossip Stone": "GV_GOSSIP_STONE", "Desert Colossus Gossip Stone": "COLOSSUS_GOSSIP_STONE", "Dodongo's Cavern Gossip Stone": "DODONGOS_CAVERN_GOSSIP_STONE"};
GOSSIP_STONES.forEach(s => { s.rc = GOSSIP_STONE_RC[s.id]; });
const GOSSIP_STONE = Object.fromEntries(GOSSIP_STONES.map(s => [s.id, s]));
// Types d'indice : type SoH du spoiler -> type de l'appli (libellé, ordre d'affichage)
const HINT_TYPES = { woth:t('Voie du héros'), foolish:t('Futile'), item:t('Objet'), itemArea:t('Objet dans une zone'), trial:t('Épreuve'),
  junk:t('Sans indice'), other:t('Autre') };
const HINT_TYPE_SOH = { 'Way of the Hero':'woth', Foolish:'foolish', Item:'item', 'Item Area':'itemArea', Trial:'trial', Message:'junk' };
// Zone citée par un indice (texte du jeu, français ou anglais) -> zone de la page Checks ; '' si inconnue (poches de Link…)
const HINT_AREA_ALIAS = { 'temple du temps':'MARKET', 'temple of time':'MARKET', 'place du marche':'MARKET', 'market':'MARKET',
  'repaire des voleurs':'GERUDO_FORTRESS', 'thieves hideout':'GERUDO_FORTRESS', "thieves' hideout":'GERUDO_FORTRESS', 'fonds du puits':'BOTTOM_OF_THE_WELL',
  'cimetiere':'GRAVEYARD', 'caverne de glace':'ICE_CAVERN', 'interieur du chateau de ganon':'GANONS_CASTLE', "inside ganon's castle":'GANONS_CASTLE',
  'alentours du chateau de ganon':'HYRULE_CASTLE', "outside ganon's castle":'HYRULE_CASTLE' };
function hintArea(text){
  const n = String(text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/^(l'|la |le |les |the )/, '').trim();
  if (HINT_AREA_ALIAS[n]) return HINT_AREA_ALIAS[n];
  const plain = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const a = CHECK_AREAS.find(a => plain(a.label) === n || plain(a.soh) === n);
  return a ? a.id : '';
}
