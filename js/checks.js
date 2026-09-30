/* ---------- Checks (page Checks) ----------
   Données : window.CHECKS_DATA (checks-data.js, généré depuis SoH). Ici : structures et règles pures d'affichage,
   reprises du tracker de checks de SoH (randomizer_check_tracker.cpp, IsCheckShuffled) — un check n'est listé que
   s'il est mélangé selon la configuration, et seulement dans la version (Vanilla / MQ) active de son donjon. */
const CHECK_AREAS = window.CHECKS_DATA.areas.map(([id, label, soh, dungeon]) => ({ id, label, soh, dungeon }));
const CHECK_AREA = {};
CHECK_AREAS.forEach(a => { CHECK_AREA[a.id] = a; });
const CHECKS = window.CHECKS_DATA.checks.map(([id, area, type, quest, label, soh, region, extra]) =>
  ({ id, area, type, quest, label, soh, region, ...(extra || {}), inDungeon:!!CHECK_AREA[area].dungeon }));
const CHECK_BY_ID = {}, CHECK_BY_SOH = {};
CHECKS.forEach(c => { CHECK_BY_ID[c.id] = c; CHECK_BY_SOH[c.soh] = c; });
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
  if (t === 'LINKS_POCKET') return s.linksPocket !== 'Nothing';
  if (t === 'GF_KEY') return s.gerudoFortressKeys !== 'Vanilla'
    && (s.fortressCarpenters === 'Normal' || (s.fortressCarpenters === 'Fast' && c.id === 'TH_1_TORCH_CARPENTER'));
  if (c.id === 'TH_FREED_CARPENTERS') return on(s.shuffleGerudoCard);
  if (c.id === 'KF_KOKIRI_SWORD_CHEST') return on(s.shuffleKokiriSword);
  if (c.id === 'TOT_MASTER_SWORD') return on(s.shuffleMasterSword);
  if (c.id === 'LH_HYRULE_LOACH') return s.fishsanity === 'Shuffle only Hyrule Loach';
  if (c.id === 'HC_MALON_EGG') return on(s.shuffleWeirdEgg);
  if (c.id === 'KAK_100_GOLD_SKULLTULA_REWARD') return on(s.shuffle100GsReward);
  return true; // STANDARD, DUNGEON_REWARD, BOSS_HEART_OR_OTHER_REWARD…
}

// Check de la version active de son donjon ? quest = 'Vanilla' | 'MQ' | '' (inconnue : seulement les checks communs).
function checkQuestActive(c, quest){
  if (c.quest === 'B') return true;
  return quest === (c.quest === 'M' ? 'MQ' : 'Vanilla');
}
