/* ---------- Moteur de logique (logique du randomizer Ship of Harkinian) ----------
   Notre portage de logic.cpp (fonctions de logique), location_access.cpp (régions, temps, Temple de l'Esprit) et
   3drando/fill.cpp (ReachabilitySearch) de SoH 9.2.3 (commit cb71e22), en mode « checks disponibles » du tracker
   in-game (CalculatingAvailableChecks) : l'inventaire est celui noté dans le panneau Objets, jamais les objets placés.
   Les conditions des régions sont dans logic-data.js (généré) : des fonctions sans argument qui lisent le
   contexte global « L » ci-dessous (âge et moment courants, objets, options, événements).
   Écarts assumés avec le tracker in-game (documentés dans SPEC.md > Logique) :
   - DungeonCount compte les donjons terminables en logique (événements LOGIC_*_CLEAR), comme le générateur ;
   - GetCheckPrice : prix minimal selon le réglage de prix (comme un check non identifié en jeu) ; les prix vus en jeu
     ne sont pas suivis ;
   - épreuves de Ganon : seules « aucune » (ou 0) sont connues comme passées ;
   - haricots plantés : seulement « Haricots déjà plantés » + haricots au départ ;
   - version de donjon inconnue : les branches Vanilla et MQ sont toutes deux explorées. */
const SOH = window.SOH_LOGIC;
const SOH_REGION_KEYS = Object.keys(SOH.regions);
// États d'accès d'une région (bits) : enfant de jour / de nuit, adulte de jour / de nuit.
const CD = 1, CN = 2, AD = 4, AN = 8, CHILD = CD | CN, ADULT = AD | AN;
const AGE_TIMES = [[CD, true, true], [CN, true, false], [AD, false, true], [AN, false, false]];   // [bit, enfant, jour]
// Distances d'ennemi (ordre de l'énumération EnemyDistance, du plus proche au plus lointain).
const ED = Object.fromEntries(['ED_CLOSE', 'ED_SHORT_JUMPSLASH', 'ED_MASTER_SWORD_JUMPSLASH', 'ED_LONG_JUMPSLASH',
  'ED_BOMB_THROW', 'ED_BOOMERANG', 'ED_HOOKSHOT', 'ED_LONGSHOT', 'ED_FAR'].map((k, i) => [k, i]));
// Donjons SoH -> id du panneau Objets (DUNGEONS, js/items.js)
const SOH_DUNGEON = { DEKU_TREE:'dekuTree', DODONGOS_CAVERN:'dodongosCavern', JABU_JABUS_BELLY:'jabuJabu',
  FOREST_TEMPLE:'forestTemple', FIRE_TEMPLE:'fireTemple', WATER_TEMPLE:'waterTemple', SPIRIT_TEMPLE:'spiritTemple',
  SHADOW_TEMPLE:'shadowTemple', BOTTOM_OF_THE_WELL:'bottomOfTheWell', ICE_CAVERN:'iceCavern',
  GERUDO_TRAINING_GROUND:'gerudoTrainingGround', GANONS_CASTLE:'ganonsCastle' };
const SOH_SCENE_DUNGEON = { SCENE_DEKU_TREE:'dekuTree', SCENE_DODONGOS_CAVERN:'dodongosCavern', SCENE_JABU_JABU:'jabuJabu',
  SCENE_FOREST_TEMPLE:'forestTemple', SCENE_FIRE_TEMPLE:'fireTemple', SCENE_WATER_TEMPLE:'waterTemple',
  SCENE_SPIRIT_TEMPLE:'spiritTemple', SCENE_SHADOW_TEMPLE:'shadowTemple', SCENE_BOTTOM_OF_THE_WELL:'bottomOfTheWell',
  SCENE_ICE_CAVERN:'iceCavern', SCENE_GERUDO_TRAINING_GROUND:'gerudoTrainingGround',
  SCENE_THIEVES_HIDEOUT:'gerudoFortress', SCENE_INSIDE_GANONS_CASTLE:'ganonsCastle' };
// Clé de boss / carte / boussole / âme -> donjon
const SOH_DUNGEON_ITEM = {};
for (const [soh, id] of Object.entries(SOH_DUNGEON)){
  SOH_DUNGEON_ITEM[`RG_${soh}_BOSS_KEY`] = [id, 'bossKey'];
  SOH_DUNGEON_ITEM[`RG_${soh}_MAP`] = [id, 'map'];
  SOH_DUNGEON_ITEM[`RG_${soh}_COMPASS`] = [id, 'compass'];
}
SOH_DUNGEON_ITEM.RG_GANONS_CASTLE_BOSS_KEY = ['ganonsCastle', 'bossKey'];
const SOH_BOSS_SOUL = { RG_GOHMA_SOUL:'dekuTree', RG_KING_DODONGO_SOUL:'dodongosCavern', RG_BARINADE_SOUL:'jabuJabu',
  RG_PHANTOM_GANON_SOUL:'forestTemple', RG_VOLVAGIA_SOUL:'fireTemple', RG_MORPHA_SOUL:'waterTemple',
  RG_BONGO_BONGO_SOUL:'shadowTemple', RG_TWINROVA_SOUL:'spiritTemple', RG_GANON_SOUL:'ganonsCastle' };
// Âmes de haricot -> check-list « beans » ; clés des portes de l'overworld -> check-list « keys » (même ordre).
const SOH_BEAN_SOUL = { RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL:'cratere_du_peril', RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL:'chemin_du_peril',
  RG_DESERT_COLOSSUS_BEAN_SOUL:'colosse_du_desert', RG_GERUDO_VALLEY_BEAN_SOUL:'vallee_gerudo', RG_GRAVEYARD_BEAN_SOUL:'cimetiere',
  RG_KOKIRI_FOREST_BEAN_SOUL:'foret_kokiri', RG_LAKE_HYLIA_BEAN_SOUL:'lac_hylia', RG_LOST_WOODS_BRIDGE_BEAN_SOUL:'pont_des_bois_perdus',
  RG_LOST_WOODS_BEAN_SOUL:'theatre_mojo', RG_ZORAS_RIVER_BEAN_SOUL:'riviere_zora' };
const SOH_DOOR_KEY = {};
['GUARD_HOUSE', 'MARKET_BAZAAR', 'MARKET_POTION_SHOP', 'MASK_SHOP', 'MARKET_SHOOTING_GALLERY', 'BOMBCHU_BOWLING',
  'TREASURE_CHEST_GAME_BUILDING', 'BOMBCHU_SHOP', 'RICHARDS_HOUSE', 'ALLEY_HOUSE', 'KAK_BAZAAR', 'KAK_POTION_SHOP', 'BOSS_HOUSE',
  'GRANNYS_POTION_SHOP', 'SKULLTULA_HOUSE', 'IMPAS_HOUSE', 'WINDMILL', 'KAK_SHOOTING_GALLERY', 'DAMPES_HUT', 'TALONS_HOUSE',
  'STABLES', 'BACK_TOWER', 'HYLIA_LAB', 'FISHING_HOLE'].forEach((k, i) => { SOH_DOOR_KEY[`RG_${k}_KEY`] = CHECKLISTS.keys.locations[i].id; });
// Objets d'échange adulte -> clé du panneau (ordre de la chaîne, pour TradeQuestStep)
const SOH_ADULT_TRADE = [['RG_POCKET_EGG', 'pocketEgg'], ['RG_COJIRO', 'cojiro'], ['RG_ODD_MUSHROOM', 'oddMushroom'],
  ['RG_ODD_POTION', 'oddPotion'], ['RG_POACHERS_SAW', 'poachersSaw'], ['RG_BROKEN_SWORD', 'brokenSword'],
  ['RG_PRESCRIPTION', 'prescription'], ['RG_EYEBALL_FROG', 'eyeballFrog'], ['RG_EYEDROPS', 'eyedrops'], ['RG_CLAIM_CHECK', 'claimCheck']];
const SOH_TRADE_KEY = Object.fromEntries(SOH_ADULT_TRADE);
// Objets du panneau lus tels quels (bool)
const SOH_ITEM_FLAG = { RG_DINS_FIRE:'dinsFire', RG_FARORES_WIND:'faroresWind', RG_NAYRUS_LOVE:'nayrusLove',
  RG_LENS_OF_TRUTH:'truthLens', RG_MEGATON_HAMMER:'titanMass', RG_FIRE_ARROWS:'fireArrows', RG_ICE_ARROWS:'iceArrows',
  RG_LIGHT_ARROWS:'lightArrows', RG_BOOMERANG:'boomerang', RG_MAGIC_BEAN:'beans', RG_KOKIRI_SWORD:'kokiriSword',
  RG_MASTER_SWORD:'masterSword', RG_BIGGORON_SWORD:'biggoronSword', RG_DEKU_SHIELD:'dekuShield', RG_HYLIAN_SHIELD:'hylianShield',
  RG_MIRROR_SHIELD:'mirrorShield', RG_GORON_TUNIC:'goronTunic', RG_ZORA_TUNIC:'zoraTunic', RG_IRON_BOOTS:'ironBoots',
  RG_HOVER_BOOTS:'hoverBoots', RG_KOKIRI_EMERALD:'kokiriEmerald', RG_GORON_RUBY:'goronRuby', RG_ZORA_SAPPHIRE:'zoraSapphire',
  RG_FOREST_MEDALLION:'forestMedallion', RG_FIRE_MEDALLION:'fireMedallion', RG_WATER_MEDALLION:'waterMedallion',
  RG_SPIRIT_MEDALLION:'spiritMedallion', RG_SHADOW_MEDALLION:'shadowMedallion', RG_LIGHT_MEDALLION:'lightMedallion',
  RG_STONE_OF_AGONY:'stoneOfAgony', RG_DOUBLE_DEFENSE:'doubleDefense', RG_ZELDAS_LETTER:'zeldasLetter',
  RG_WEIRD_EGG:'weirdEgg', RG_GREG_RUPEE:'greg', RG_SKELETON_KEY:'skeletonKey', RG_RUTOS_LETTER:'rutoLetter' };
const SOH_SONG = { RG_ZELDAS_LULLABY:'zeldaLullaby', RG_EPONAS_SONG:'eponasSong', RG_SARIAS_SONG:'sariasSong',
  RG_SUNS_SONG:'sunsSong', RG_SONG_OF_TIME:'songOfTime', RG_SONG_OF_STORMS:'songOfStorms', RG_MINUET_OF_FOREST:'minuet',
  RG_BOLERO_OF_FIRE:'bolero', RG_SERENADE_OF_WATER:'serenade', RG_REQUIEM_OF_SPIRIT:'requiem',
  RG_NOCTURNE_OF_SHADOW:'nocturne', RG_PRELUDE_OF_LIGHT:'prelude' };
// Objets mélangeables seulement sur option : [clé du panneau, option « Shuffle … » ] — possédés d'office sinon.
const SOH_SHUFFLED_FLAG = { RG_BRONZE_SCALE:['swim', 'shuffleSwim'], RG_CLIMB:['climb', 'shuffleClimb'],
  RG_CRAWL:['crawl', 'shuffleCrawl'], RG_OPEN_CHEST:['openChests', 'shuffleOpenChest'], RG_POWER_BRACELET:['grab', 'shuffleGrab'],
  RG_FISHING_POLE:['fishingRod', 'shuffleFishingPole'],
  RG_SPEAK_DEKU:['speakDeku', 'shuffleJabberNuts'], RG_SPEAK_GERUDO:['speakGerudo', 'shuffleJabberNuts'],
  RG_SPEAK_GORON:['speakGoron', 'shuffleJabberNuts'], RG_SPEAK_HYLIAN:['speakHylian', 'shuffleJabberNuts'],
  RG_SPEAK_KOKIRI:['speakKokiri', 'shuffleJabberNuts'], RG_SPEAK_ZORA:['speakZora', 'shuffleJabberNuts'],
  RG_OCARINA_A_BUTTON:['noteA', 'shuffleOcarinaButtons'], RG_OCARINA_C_UP_BUTTON:['noteCUp', 'shuffleOcarinaButtons'],
  RG_OCARINA_C_DOWN_BUTTON:['noteCDown', 'shuffleOcarinaButtons'], RG_OCARINA_C_LEFT_BUTTON:['noteCLeft', 'shuffleOcarinaButtons'],
  RG_OCARINA_C_RIGHT_BUTTON:['noteCRight', 'shuffleOcarinaButtons'] };
const SOH_BOTTLES = new Set(['RG_BOTTLE_WITH_BIG_POE', 'RG_BOTTLE_WITH_BLUE_FIRE', 'RG_BOTTLE_WITH_BLUE_POTION',
  'RG_BOTTLE_WITH_BUGS', 'RG_BOTTLE_WITH_FAIRY', 'RG_BOTTLE_WITH_FISH', 'RG_BOTTLE_WITH_GREEN_POTION', 'RG_BOTTLE_WITH_MILK',
  'RG_BOTTLE_WITH_POE', 'RG_BOTTLE_WITH_RED_POTION', 'RG_EMPTY_BOTTLE']);
const SOH_BOMBCHUS = new Set(['RG_PROGRESSIVE_BOMBCHU_BAG', 'RG_BOMBCHU_5', 'RG_BOMBCHU_10', 'RG_BOMBCHU_20']);
// Événement de logique (logicVal, item_list.cpp) des objets vendus en vanilla qui servent à la logique.
const SOH_BUY_EVENT = { RG_BUY_DEKU_STICK_1:'LOGIC_STICK_ACCESS', RG_BUY_DEKU_NUTS_5:'LOGIC_NUT_ACCESS',
  RG_BUY_DEKU_NUTS_10:'LOGIC_NUT_ACCESS', RG_BUY_BOMBCHUS_10:'LOGIC_BUY_BOMBCHUS', RG_BUY_BOMBCHUS_20:'LOGIC_BUY_BOMBCHUS',
  RG_BUY_FISH:'LOGIC_FISH_ACCESS', RG_BUY_BLUE_FIRE:'LOGIC_BLUE_FIRE_ACCESS', RG_BUY_BOTTLE_BUG:'LOGIC_BUG_ACCESS',
  RG_BUY_FAIRYS_SPIRIT:'LOGIC_FAIRY_ACCESS' };
const sohWarned = new Set();
const sohWarn = msg => { if (!sohWarned.has(msg)){ sohWarned.add(msg); console.warn('[logique SoH]', msg); } };

/* ---------- Contexte de logique « L » (équivalent de la classe Logic + fonctions libres de location_access) ---------- */
const L = {
  IsChild:false, IsAdult:false, AtDay:false, AtNight:false, BigPoes:0,
  // état de la recherche en cours (voir computeSoh)
  s:null, g:null, events:null, access:null, optIdx:null, cur:null, curCheck:null,

  // --- options, astuces, versions de donjon ---
  opt(rsk){
    if (rsk in this.optIdx) return this.optIdx[rsk];
    const o = SOH.options[rsk], d = SETTING_BY_SOH[o.name];
    let v = d ? this.s[d.key] : undefined, idx = o.def;
    if (rsk === 'RSK_SELECTED_STARTING_AGE') v = sohStartingAge(this.s);
    if (v !== undefined){
      if (o.list){ const i = o.list.indexOf(v); if (i >= 0) idx = i; else sohWarn(`valeur « ${v} » inconnue pour ${o.name}`); }
      else idx = (v - o.numeric.min) / o.numeric.step;
    }
    return (this.optIdx[rsk] = idx);
  },
  trick(rt){ return !!this.s.tricks[rt]; },
  quest(soh){ const id = SOH_DUNGEON[soh]; return configQuest(id, this.s) || this.g.dungeons[id].quest || ''; },
  mq(soh){ return this.quest(soh) !== 'Vanilla'; },
  vanilla(soh){ return this.quest(soh) !== 'MQ'; },
  // Trial::IsSkipped : imposé par la configuration, sinon épreuve notée « dissipée » (inconnue = requise).
  trialSkipped(tk){
    const c = configTrials(this.s);
    if (c) return c === 'skipped';
    const t = TRIALS.find(x => x.tk === tk);
    return !!t && this.g.trials?.[t.id] === 'skipped';
  },
  Get(ev){ return !!this.events[ev]; },
  Set(ev){ this.events[ev] = true; },

  // --- régions (Region::Child/Adult/AnyAgeTime…, location_access.h) ---
  region(rr){ return sohRegionView(rr); },
  AnyAgeTime(fn){ return sohRegionView(this.cur).AnyAgeTime(fn); },
  BothAges(rr){ return sohRegionView(rr).BothAgesCheck(); },
  ChildCanAccess(rr){ return sohRegionView(rr).Child(); },
  AdultCanAccess(rr){ return sohRegionView(rr).Adult(); },
  CanPlantBean(rr, bean){ return sohRegionView(rr).CanPlantBeanCheck(bean) || this.BeanPlanted(bean); },
  BeanPlanted(bean){
    if (!this.HasItem(bean)) return false;
    return this.s.skipPlantingBeans === 'On' && this.s.startingBeans === 'Yes';
  },
  // Prix d'un check non identifié en jeu : le minimum possible selon le réglage de prix (GetMinimumPrice).
  GetCheckPrice(rc){
    const p = SOH.prices[rc || this.curCheck];
    if (!p) return 0;
    const [vanilla, , type] = p, s = this.s, k = type === 'SHOP' ? 'shops' : type === 'SCRUB' ? 'scrubs' : 'merchant';
    switch (s[k + 'Prices']){
      case 'Vanilla': return vanilla;
      case 'Fixed': return s[k + 'FixedPrice'];
      case 'Range': return s[k + 'LowerBound'];
      case 'Set By Wallet':
        return s[k + 'NoWalletWeight'] ? 0 : s[k + 'ChildWalletWeight'] ? 1 : s[k + 'AdultWalletWeight'] ? 100
          : s[k + 'GiantWalletWeight'] ? 201 : 501;
    }
    return 0;   // « Cheap Balanced » / « Balanced » : dès 0
  },
  GetWalletCapacity(){
    return this.HasItem('RG_TYCOON_WALLET') ? 999 : this.HasItem('RG_GIANT_WALLET') ? 500
      : this.HasItem('RG_ADULT_WALLET') ? 200 : this.HasItem('RG_CHILD_WALLET') ? 99 : 0;
  },
  TriforcePieces(){ return this.g.items.triforcePieces; },

  // --- inventaire (Logic::HasItem, lu dans le panneau Objets) ---
  HasItem(rg){
    const it = this.g.items, s = this.s;
    if (rg in SOH_ITEM_FLAG) return !!it[SOH_ITEM_FLAG[rg]];
    if (rg in SOH_SONG) return !!this.g.songs[SOH_SONG[rg]];
    if (rg in SOH_SHUFFLED_FLAG){ const [k, opt] = SOH_SHUFFLED_FLAG[rg]; return s[opt] !== 'On' || !!it[k]; }
    if (rg in SOH_BEAN_SOUL) return s.shuffleBeanSouls !== 'On' || !!this.g.checklists.beans[SOH_BEAN_SOUL[rg]];
    if (rg in SOH_BOSS_SOUL) return !!this.g.dungeons[SOH_BOSS_SOUL[rg]].soul;
    if (rg in SOH_DOOR_KEY) return !!this.g.checklists.keys[SOH_DOOR_KEY[rg]];
    if (rg in SOH_DUNGEON_ITEM){
      const [id, f] = SOH_DUNGEON_ITEM[rg];
      if (f === 'bossKey' && bossKeyAtStart(id, s)) return true;
      if (f !== 'bossKey' && mapsAtStart(id, s)) return true;
      return !!this.g.dungeons[id][f];
    }
    if (rg in SOH_TRADE_KEY) return !!it[SOH_TRADE_KEY[rg]] || (rg === 'RG_POCKET_EGG' && !!it.pocketCucco);
    if (SOH_BOTTLES.has(rg)) return this.HasBottle();
    if (SOH_BOMBCHUS.has(rg)) return (this.BombchusEnabled() &&
      (this.Get('LOGIC_BUY_BOMBCHUS') || this.Get('LOGIC_COULD_PLAY_BOWLING') || this.Get('LOGIC_CARPET_MERCHANT'))) || it.bombchus > 0;
    switch (rg){
      case 'RG_FAIRY_OCARINA': return it.ocarina >= 1;
      case 'RG_OCARINA_OF_TIME': return it.ocarina >= 2;
      case 'RG_FAIRY_BOW': return it.bow > 0;
      case 'RG_HOOKSHOT': return it.hookshot >= 1;
      case 'RG_LONGSHOT': return it.hookshot >= 2;
      // sans « Sac de bâtons / de noix » mélangé, on a d'office la capacité de base (Logic::Reset)
      case 'RG_PROGRESSIVE_STICK_UPGRADE': case 'RG_STICKS': return it.sticks > 0 || s.shuffleStickBag !== 'On';
      case 'RG_PROGRESSIVE_NUT_UPGRADE': case 'RG_NUTS': return it.nuts > 0 || s.shuffleNutBag !== 'On';
      case 'RG_FAIRY_SLINGSHOT': return it.slingshot > 0;
      case 'RG_GIANTS_KNIFE': return !!it.biggoronSword || this.Get('LOGIC_MEDIGORON');
      case 'RG_GORONS_BRACELET': return it.strength >= 1;
      case 'RG_SILVER_GAUNTLETS': return it.strength >= 2;
      case 'RG_GOLDEN_GAUNTLETS': return it.strength >= 3;
      case 'RG_PROGRESSIVE_BOMB_BAG': case 'RG_BOMB_BAG': return it.bombBag > 0;
      case 'RG_MAGIC_SINGLE': return it.magic >= 1;
      // Carte Gerudo : aussi offerte au départ quand les charpentiers sont libres et la carte non mélangée
      case 'RG_GERUDO_MEMBERSHIP_CARD': return !!it.gerudoCard || (s.fortressCarpenters === 'Free' && s.shuffleGerudoCard !== 'On');
      case 'RG_SKULL_MASK': case 'RG_MASK_OF_TRUTH':
        if (s.maskQuest === 'Vanilla') return this.Get(rg === 'RG_SKULL_MASK' ? 'LOGIC_BORROW_SKULL_MASK' : 'LOGIC_BORROW_RIGHT_MASKS');
        if (s.maskQuest === 'Completed') return this.HasItem('RG_ZELDAS_LETTER') && this.Get('LOGIC_KAKARIKO_GATE_OPEN');
        return !!it[rg === 'RG_SKULL_MASK' ? 'skullMask' : 'maskOfTruth'];
      // bourses (palier 1 = 99, 2 = 200, 3 = 500, 4 = 999, 5 = infinie)
      case 'RG_CHILD_WALLET': return it.wallet >= 1;
      case 'RG_ADULT_WALLET': return it.wallet >= 2;
      case 'RG_GIANT_WALLET': return it.wallet >= 3;
      case 'RG_TYCOON_WALLET': return it.wallet >= 4;
      case 'RG_SILVER_SCALE': return it.scale >= 1;
      case 'RG_GOLDEN_SCALE': return it.scale >= 2;
    }
    sohWarn('objet non géré : ' + rg);
    return false;
  },
  // Logic::CanUse
  CanUse(rg){
    if (!this.HasItem(rg)) return false;
    switch (rg){
      case 'RG_MAGIC_SINGLE': return true;
      case 'RG_DINS_FIRE': case 'RG_FARORES_WIND': case 'RG_NAYRUS_LOVE': case 'RG_LENS_OF_TRUTH':
        return this.CanUse('RG_MAGIC_SINGLE');
      case 'RG_FIRE_ARROWS': case 'RG_ICE_ARROWS': case 'RG_LIGHT_ARROWS':
        return this.CanUse('RG_MAGIC_SINGLE') && this.CanUse('RG_FAIRY_BOW');
      case 'RG_FAIRY_BOW': case 'RG_MEGATON_HAMMER': case 'RG_IRON_BOOTS': case 'RG_HOVER_BOOTS': case 'RG_HOOKSHOT':
      case 'RG_LONGSHOT': case 'RG_GORON_TUNIC': case 'RG_ZORA_TUNIC': case 'RG_MIRROR_SHIELD': case 'RG_MASTER_SWORD':
      case 'RG_GIANTS_KNIFE': case 'RG_BIGGORON_SWORD': case 'RG_SILVER_GAUNTLETS': case 'RG_GOLDEN_GAUNTLETS':
      case 'RG_POCKET_EGG': case 'RG_COJIRO': case 'RG_ODD_MUSHROOM': case 'RG_ODD_POTION': case 'RG_POACHERS_SAW':
      case 'RG_BROKEN_SWORD': case 'RG_PRESCRIPTION': case 'RG_EYEBALL_FROG': case 'RG_EYEDROPS': case 'RG_CLAIM_CHECK':
        return this.IsAdult;
      case 'RG_FAIRY_SLINGSHOT': case 'RG_BOOMERANG': case 'RG_KOKIRI_SWORD': case 'RG_DEKU_SHIELD': case 'RG_WEIRD_EGG':
      case 'RG_RUTOS_LETTER': case 'RG_MAGIC_BEAN': case 'RG_SKULL_MASK': case 'RG_MASK_OF_TRUTH': case 'RG_CRAWL':
        return this.IsChild;
      case 'RG_NUTS': return this.Get('LOGIC_NUT_ACCESS');
      case 'RG_STICKS': return this.IsChild && this.Get('LOGIC_STICK_ACCESS');
      case 'RG_PROGRESSIVE_BOMB_BAG': case 'RG_BOMB_BAG': return true;
      case 'RG_PROGRESSIVE_BOMBCHU_BAG': case 'RG_BOMBCHU_5': case 'RG_BOMBCHU_10': case 'RG_BOMBCHU_20':
        return this.BombchuRefill() && this.BombchusEnabled();
      case 'RG_ZELDAS_LULLABY': case 'RG_EPONAS_SONG': case 'RG_PRELUDE_OF_LIGHT':
        return this.sohButtons('RG_OCARINA_C_LEFT_BUTTON', 'RG_OCARINA_C_RIGHT_BUTTON', 'RG_OCARINA_C_UP_BUTTON');
      case 'RG_SARIAS_SONG':
        return this.sohButtons('RG_OCARINA_C_LEFT_BUTTON', 'RG_OCARINA_C_RIGHT_BUTTON', 'RG_OCARINA_C_DOWN_BUTTON');
      case 'RG_SUNS_SONG':
        return this.sohButtons('RG_OCARINA_C_RIGHT_BUTTON', 'RG_OCARINA_C_UP_BUTTON', 'RG_OCARINA_C_DOWN_BUTTON');
      case 'RG_SONG_OF_TIME': case 'RG_BOLERO_OF_FIRE': case 'RG_REQUIEM_OF_SPIRIT':
        return this.sohButtons('RG_OCARINA_A_BUTTON', 'RG_OCARINA_C_RIGHT_BUTTON', 'RG_OCARINA_C_DOWN_BUTTON');
      case 'RG_SONG_OF_STORMS':
        return this.sohButtons('RG_OCARINA_A_BUTTON', 'RG_OCARINA_C_UP_BUTTON', 'RG_OCARINA_C_DOWN_BUTTON');
      case 'RG_MINUET_OF_FOREST':
        return this.sohButtons('RG_OCARINA_A_BUTTON', 'RG_OCARINA_C_LEFT_BUTTON', 'RG_OCARINA_C_RIGHT_BUTTON', 'RG_OCARINA_C_UP_BUTTON');
      case 'RG_SERENADE_OF_WATER': case 'RG_NOCTURNE_OF_SHADOW':
        return this.sohButtons('RG_OCARINA_A_BUTTON', 'RG_OCARINA_C_LEFT_BUTTON', 'RG_OCARINA_C_RIGHT_BUTTON', 'RG_OCARINA_C_DOWN_BUTTON');
      case 'RG_FISHING_POLE': return this.HasItem('RG_CHILD_WALLET');
      case 'RG_BOTTLE_WITH_BUGS': return this.Get('LOGIC_BUG_ACCESS');
      case 'RG_BOTTLE_WITH_FISH': return this.Get('LOGIC_FISH_ACCESS');
      case 'RG_BOTTLE_WITH_BLUE_FIRE': return this.Get('LOGIC_BLUE_FIRE_ACCESS');
      case 'RG_BOTTLE_WITH_FAIRY': return this.Get('LOGIC_FAIRY_ACCESS');
    }
    return true;
  },
  sohButtons(...buttons){ return this.HasItem('RG_FAIRY_OCARINA') && buttons.every(b => this.HasItem(b)); },

  HasProjectile(age){
    const child = () => this.CanUse('RG_FAIRY_SLINGSHOT') || this.CanUse('RG_BOOMERANG');
    const adult = () => this.CanUse('RG_HOOKSHOT') || this.CanUse('RG_FAIRY_BOW');
    return this.HasExplosives() || (age === 'Child' && child()) || (age === 'Adult' && adult())
      || (age === 'Both' && child() && adult()) || (age === 'Either' && (child() || adult()));
  },
  HasBossSoul(rg){
    const opt = this.s.shuffleBossSouls;
    if (opt === 'Off') return true;
    if (rg === 'RG_GANON_SOUL') return opt === 'On + Ganon' ? this.HasItem(rg) : true;
    return rg in SOH_BOSS_SOUL ? this.HasItem(rg) : false;
  },
  CanOpenOverworldDoor(key){
    if (this.s.lockOverworldDoors !== 'On') return true;
    return this.HasItem('RG_SKELETON_KEY') || this.HasItem(key);
  },
  CanGroundJump(hasBombflower = false){
    return this.trick('RT_GROUND_JUMP') && this.CanStandingShield()
      && (this.CanUse('RG_BOMB_BAG') || (hasBombflower && this.HasItem('RG_GORONS_BRACELET')));
  },
  CanGroundJumpslash(hasBombflower = false){
    return this.trick('RT_GROUND_JUMP_HARD') && this.CanStandingShield() && this.CanJumpslash()
      && (this.CanUse('RG_BOMB_BAG') || (hasBombflower && this.HasItem('RG_GORONS_BRACELET')));
  },
  CanMiddairGroundJump(hasBombflower = false){
    return this.trick('RT_GROUND_JUMP_HARD') && this.CanStandingShield() && this.CanUse('RG_HOVER_BOOTS')
      && (this.CanUse('RG_BOMB_BAG') || (hasBombflower && this.HasItem('RG_GORONS_BRACELET')));
  },
  CanOpenUnderwaterChest(){
    return this.trick('RT_OPEN_UNDERWATER_CHEST') && this.CanUse('RG_IRON_BOOTS') && this.CanUse('RG_HOOKSHOT') && this.HasItem('RG_OPEN_CHEST');
  },

  // --- ennemis (Logic::CanKillEnemy / CanPassEnemy / CanAvoidEnemy / CanGetEnemyDrop) ---
  // Les « switch » à fallthrough du C++ deviennent des paliers : on cumule les moyens à partir de la distance demandée.
  sohRange(distance, tiers){
    let ok = false;
    for (let d = ED[distance]; d < tiers.length; d++){ if (tiers[d] && tiers[d]()) { ok = true; break; } }
    return ok;
  },
  CanKillEnemy(enemy, distance = 'ED_CLOSE', wallOrFloor = true, quantity = 1, timer = false, inWater = false){
    const u = rg => this.CanUse(rg);
    switch (enemy){
      case 'RE_GERUDO_GUARD': case 'RE_BREAK_ROOM_GUARD': return false;
      case 'RE_GOLD_SKULLTULA': return this.sohRange(distance, [
        () => u('RG_MEGATON_HAMMER'), () => u('RG_KOKIRI_SWORD'), () => u('RG_MASTER_SWORD'),
        () => u('RG_BIGGORON_SWORD') || u('RG_STICKS'), () => u('RG_BOMB_BAG'), () => u('RG_BOOMERANG') || u('RG_DINS_FIRE'),
        () => u('RG_HOOKSHOT'), () => u('RG_LONGSHOT') || (wallOrFloor && u('RG_BOMBCHU_5')),
        () => u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW')]);
      case 'RE_GOHMA_LARVA': case 'RE_MAD_SCRUB': case 'RE_DEKU_BABA': case 'RE_POE': return this.CanAttack();
      case 'RE_BIG_SKULLTULA': return this.sohRange(distance, [
        () => u('RG_MEGATON_HAMMER'), () => u('RG_KOKIRI_SWORD'), () => u('RG_MASTER_SWORD'),
        () => u('RG_BIGGORON_SWORD') || u('RG_STICKS'), () => u('RG_BOMB_BAG') || u('RG_DINS_FIRE'),
        null, () => u('RG_HOOKSHOT') || (wallOrFloor && u('RG_BOMBCHU_5')), () => u('RG_LONGSHOT'),
        () => u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW')]);
      case 'RE_DODONGO':
        return this.CanUseSword() || u('RG_MEGATON_HAMMER') || (quantity <= 5 && u('RG_STICKS'))
          || this.HasExplosives() || u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW');
      case 'RE_LIZALFOS': return this.CanJumpslash() || this.HasExplosives() || u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW');
      case 'RE_KEESE': case 'RE_FIRE_KEESE': case 'RE_GUAY': return this.sohRange(distance, [
        () => u('RG_MEGATON_HAMMER') || u('RG_KOKIRI_SWORD'), null, () => u('RG_MASTER_SWORD'),
        () => u('RG_BIGGORON_SWORD') || u('RG_STICKS'), () => (!inWater && u('RG_BOMB_BAG')) || (enemy === 'RE_GUAY' && u('RG_DINS_FIRE')),
        () => u('RG_BOOMERANG'), () => u('RG_HOOKSHOT') || (wallOrFloor && u('RG_BOMBCHU_5')), () => u('RG_LONGSHOT'),
        () => u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW')]);
      case 'RE_BLUE_BUBBLE':
        return this.BlastOrSmash() || u('RG_FAIRY_BOW') || ((this.CanJumpslashExceptHammer() || u('RG_FAIRY_SLINGSHOT'))
          && (u('RG_NUTS') || this.HookshotOrBoomerang() || this.CanStandingShield()));
      case 'RE_DEAD_HAND': return this.CanUseSword() || (u('RG_STICKS') && this.trick('RT_BOTW_CHILD_DEADHAND'));
      case 'RE_WITHERED_DEKU_BABA': return this.CanUseSword() || u('RG_BOOMERANG');
      case 'RE_LIKE_LIKE': case 'RE_FLOORMASTER': return this.CanDamage();
      case 'RE_STALFOS': return this.sohRange(distance, [
        () => u('RG_MEGATON_HAMMER') || u('RG_KOKIRI_SWORD'), null, () => u('RG_MASTER_SWORD'),
        () => u('RG_BIGGORON_SWORD') || (quantity <= 1 && u('RG_STICKS')),
        () => quantity <= 2 && !timer && !inWater && (u('RG_NUTS') || this.HookshotOrBoomerang()) && u('RG_BOMB_BAG'),
        null, () => wallOrFloor && u('RG_BOMBCHU_5'), null, () => u('RG_FAIRY_BOW')]);
      case 'RE_IRON_KNUCKLE': return this.CanUseSword() || u('RG_MEGATON_HAMMER') || this.HasExplosives();
      case 'RE_FLARE_DANCER':
        return u('RG_MEGATON_HAMMER') || u('RG_HOOKSHOT') || (this.HasExplosives()
          && (this.CanJumpslashExceptHammer() || u('RG_FAIRY_BOW') || u('RG_FAIRY_SLINGSHOT') || u('RG_BOOMERANG')));
      case 'RE_WOLFOS': case 'RE_WHITE_WOLFOS': case 'RE_WALLMASTER':
        return this.CanJumpslash() || u('RG_FAIRY_BOW') || u('RG_FAIRY_SLINGSHOT') || u('RG_BOMBCHU_5') || u('RG_DINS_FIRE')
          || (u('RG_BOMB_BAG') && (u('RG_NUTS') || u('RG_HOOKSHOT') || u('RG_BOOMERANG')));
      case 'RE_GERUDO_WARRIOR':
        return this.CanJumpslash() || u('RG_FAIRY_BOW')
          || (this.trick('RT_GF_WARRIOR_WITH_DIFFICULT_WEAPON') && (u('RG_FAIRY_SLINGSHOT') || u('RG_BOMBCHU_5')));
      case 'RE_GIBDO': case 'RE_REDEAD': return this.CanJumpslash() || u('RG_DINS_FIRE');
      case 'RE_MEG': return u('RG_FAIRY_BOW') || u('RG_HOOKSHOT') || this.HasExplosives();
      case 'RE_ARMOS':
        return this.BlastOrSmash() || u('RG_MASTER_SWORD') || u('RG_BIGGORON_SWORD') || u('RG_STICKS') || u('RG_FAIRY_BOW')
          || ((u('RG_NUTS') || u('RG_HOOKSHOT') || u('RG_BOOMERANG')) && (u('RG_KOKIRI_SWORD') || u('RG_FAIRY_SLINGSHOT')));
      case 'RE_GREEN_BUBBLE': return this.CanJumpslash() || u('RG_FAIRY_BOW') || u('RG_FAIRY_SLINGSHOT') || this.HasExplosives();
      case 'RE_DINOLFOS': return this.CanJumpslash() || u('RG_FAIRY_BOW') || u('RG_FAIRY_SLINGSHOT') || (!timer && u('RG_BOMBCHU_5'));
      case 'RE_TORCH_SLUG': return this.CanJumpslash() || this.HasExplosives() || u('RG_FAIRY_BOW');
      case 'RE_FREEZARD':
        return u('RG_MASTER_SWORD') || u('RG_BIGGORON_SWORD') || u('RG_MEGATON_HAMMER') || u('RG_STICKS') || this.HasExplosives()
          || u('RG_HOOKSHOT') || u('RG_DINS_FIRE') || u('RG_FIRE_ARROWS');
      case 'RE_SHELL_BLADE': return this.CanJumpslash() || this.HasExplosives() || u('RG_HOOKSHOT') || u('RG_FAIRY_BOW') || u('RG_DINS_FIRE');
      case 'RE_SPIKE':
        return u('RG_MASTER_SWORD') || u('RG_BIGGORON_SWORD') || u('RG_MEGATON_HAMMER') || u('RG_STICKS') || this.HasExplosives()
          || u('RG_HOOKSHOT') || u('RG_FAIRY_BOW') || u('RG_DINS_FIRE');
      case 'RE_STINGER': return this.sohRange(distance, [
        () => u('RG_MEGATON_HAMMER') || u('RG_KOKIRI_SWORD'), null, () => u('RG_MASTER_SWORD'),
        () => u('RG_BIGGORON_SWORD') || u('RG_STICKS'), () => !inWater && u('RG_BOMB_BAG'),
        null, () => u('RG_HOOKSHOT') || (wallOrFloor && u('RG_BOMBCHU_5')), () => u('RG_LONGSHOT'),
        () => u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW')]);
      case 'RE_BIG_OCTO': return u('RG_KOKIRI_SWORD') || u('RG_STICKS') || u('RG_MASTER_SWORD');
      case 'RE_GOHMA':
        return this.HasBossSoul('RG_GOHMA_SOUL') && this.CanJumpslash()
          && (u('RG_NUTS') || u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW') || this.HookshotOrBoomerang());
      case 'RE_KING_DODONGO':
        return this.HasBossSoul('RG_KING_DODONGO_SOUL') && this.CanJumpslash() && (u('RG_BOMB_BAG')
          || this.HasItem('RG_GORONS_BRACELET') || (this.trick('RT_DC_DODONGO_CHU') && this.IsAdult && u('RG_BOMBCHU_5')));
      case 'RE_BARINADE':
        return this.HasBossSoul('RG_BARINADE_SOUL') && u('RG_BOOMERANG')
          && (this.CanJumpslashExceptHammer() || (this.trick('RT_JABU_BARINADE_POTS') && this.HasItem('RG_POWER_BRACELET')));
      case 'RE_PHANTOM_GANON':
        return this.HasBossSoul('RG_PHANTOM_GANON_SOUL') && this.CanUseSword()
          && (u('RG_HOOKSHOT') || u('RG_FAIRY_BOW') || u('RG_FAIRY_SLINGSHOT'));
      case 'RE_VOLVAGIA': return this.HasBossSoul('RG_VOLVAGIA_SOUL') && u('RG_MEGATON_HAMMER');
      case 'RE_MORPHA':
        return this.HasBossSoul('RG_MORPHA_SOUL')
          && (u('RG_HOOKSHOT') || (this.trick('RT_WATER_MORPHA_WITHOUT_HOOKSHOT') && this.HasItem('RG_BRONZE_SCALE')))
          && (this.CanUseSword() || u('RG_MEGATON_HAMMER'));
      case 'RE_BONGO_BONGO':
        return this.HasBossSoul('RG_BONGO_BONGO_SOUL') && (u('RG_LENS_OF_TRUTH') || this.trick('RT_LENS_BONGO')) && this.CanUseSword()
          && (u('RG_HOOKSHOT') || u('RG_FAIRY_BOW') || u('RG_FAIRY_SLINGSHOT') || this.trick('RT_SHADOW_BONGO'));
      case 'RE_TWINROVA':
        return this.HasBossSoul('RG_TWINROVA_SOUL') && u('RG_MIRROR_SHIELD') && (this.CanUseSword() || u('RG_MEGATON_HAMMER'));
      case 'RE_GANONDORF': return this.HasBossSoul('RG_GANON_SOUL') && u('RG_LIGHT_ARROWS') && this.CanUseSword();
      case 'RE_GANON': return this.HasBossSoul('RG_GANON_SOUL') && u('RG_MASTER_SWORD');
      case 'RE_DARK_LINK':
        return this.CanUseSword() || (u('RG_BOOMERANG') && (u('RG_FAIRY_BOW') || u('RG_STICKS') || u('RG_MEGATON_HAMMER')
          || this.HasExplosives())) || (u('RG_NUTS') && (u('RG_STICKS') || u('RG_MEGATON_HAMMER')));
      case 'RE_ANUBIS': return this.HasFireSource();
      case 'RE_BEAMOS': return this.HasExplosives();
      case 'RE_PURPLE_LEEVER': return u('RG_MASTER_SWORD') || u('RG_BIGGORON_SWORD');
      case 'RE_TENTACLE': return u('RG_BOOMERANG');
      case 'RE_BARI':
        return this.HookshotOrBoomerang() || u('RG_FAIRY_BOW') || this.HasExplosives() || u('RG_MEGATON_HAMMER')
          || u('RG_STICKS') || u('RG_DINS_FIRE') || (this.TakeDamage() && this.CanUseSword());
      case 'RE_SHABOM':
        return u('RG_BOOMERANG') || u('RG_NUTS') || this.CanJumpslash() || u('RG_DINS_FIRE') || u('RG_ICE_ARROWS')
          || this.EffectiveHealth() * 2 > quantity;
      case 'RE_OCTOROK':
        return this.CanReflectNuts() || this.HookshotOrBoomerang() || u('RG_FAIRY_BOW') || u('RG_FAIRY_SLINGSHOT')
          || u('RG_BOMB_BAG') || (wallOrFloor && u('RG_BOMBCHU_5'));
      case 'RE_WALLTULA': return this.sohRange(distance, [
        () => u('RG_KOKIRI_SWORD'), null, () => u('RG_MASTER_SWORD'), () => u('RG_BIGGORON_SWORD') || u('RG_STICKS'),
        () => (!inWater && u('RG_BOMB_BAG')) || u('RG_DINS_FIRE'), () => u('RG_BOOMERANG'),
        () => u('RG_HOOKSHOT') || u('RG_BOMBCHU_5') || u('RG_MEGATON_HAMMER'), () => u('RG_LONGSHOT'),
        () => u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW')]);
    }
    sohWarn('ennemi non géré : ' + enemy);
    return false;
  },
  CanPassEnemy(enemy, distance = 'ED_CLOSE', wallOrFloor = true){
    if (this.CanKillEnemy(enemy, distance, wallOrFloor)) return true;
    switch (enemy){
      case 'RE_GOLD_SKULLTULA': case 'RE_GOHMA_LARVA': case 'RE_LIZALFOS': case 'RE_DODONGO': case 'RE_MAD_SCRUB':
      case 'RE_KEESE': case 'RE_FIRE_KEESE': case 'RE_BLUE_BUBBLE': case 'RE_DEAD_HAND': case 'RE_DEKU_BABA':
      case 'RE_WITHERED_DEKU_BABA': case 'RE_STALFOS': case 'RE_FLARE_DANCER': case 'RE_WOLFOS': case 'RE_WHITE_WOLFOS':
      case 'RE_FLOORMASTER': case 'RE_MEG': case 'RE_ARMOS': case 'RE_FREEZARD': case 'RE_SPIKE': case 'RE_DARK_LINK':
      case 'RE_ANUBIS': case 'RE_WALLMASTER': case 'RE_PURPLE_LEEVER': case 'RE_OCTOROK':
        return true;
      case 'RE_GERUDO_GUARD':
        return this.trick('RT_PASS_GUARDS_WITH_NOTHING') || this.HasItem('RG_GERUDO_MEMBERSHIP_CARD')
          || this.CanUse('RG_FAIRY_BOW') || this.CanUse('RG_HOOKSHOT');
      case 'RE_BREAK_ROOM_GUARD':
        return this.HasItem('RG_GERUDO_MEMBERSHIP_CARD') || this.CanUse('RG_FAIRY_BOW') || this.CanUse('RG_HOOKSHOT');
      case 'RE_BIG_SKULLTULA':
        return this.CanUse('RG_NUTS') || this.CanUse('RG_BOOMERANG')
          || (this.trick('RT_BIG_SKULLTULA_PAUSE_LIFT') && wallOrFloor && distance === 'ED_CLOSE');
      case 'RE_LIKE_LIKE': return this.CanUse('RG_HOOKSHOT') || this.CanUse('RG_BOOMERANG');
      case 'RE_GIBDO': case 'RE_REDEAD': return true;
      case 'RE_IRON_KNUCKLE': case 'RE_BIG_OCTO': case 'RE_WALLTULA': return false;
      case 'RE_GREEN_BUBBLE': return this.TakeDamage() || this.CanUse('RG_NUTS') || this.CanUse('RG_BOOMERANG') || this.CanUse('RG_HOOKSHOT');
    }
    sohWarn('ennemi non géré (passer) : ' + enemy);
    return false;
  },
  CanAvoidEnemy(enemy, grounded = false, quantity = 1){
    if (this.CanKillEnemy(enemy, 'ED_CLOSE', true, quantity)) return true;
    switch (enemy){
      case 'RE_BEAMOS':
        return !grounded || this.CanUse('RG_NUTS') || this.CanUse('RG_DINS_FIRE')
          || (quantity === 1 && (this.CanUse('RG_FAIRY_BOW') || this.CanUse('RG_FAIRY_SLINGSHOT')));
      case 'RE_MAD_SCRUB': return !grounded || this.CanUse('RG_NUTS');
      case 'RE_KEESE': case 'RE_FIRE_KEESE': case 'RE_GUAY': return this.CanUse('RG_NUTS') || this.CanUse('RG_SKULL_MASK');
      case 'RE_BLUE_BUBBLE': return !grounded || this.CanUse('RG_NUTS') || this.HookshotOrBoomerang() || this.CanStandingShield();
      case 'RE_TORCH_SLUG': return !grounded || this.CanUse('RG_NUTS') || this.CanUse('RG_HOOKSHOT') || this.CanUse('RG_DINS_FIRE');
    }
    return true;   // tous les autres ennemis s'évitent
  },
  CanGetEnemyDrop(enemy, distance = 'ED_CLOSE', aboveLink = false){
    if (!this.CanKillEnemy(enemy, distance)) return false;
    if (ED[distance] <= ED.ED_MASTER_SWORD_JUMPSLASH) return true;
    switch (enemy){
      case 'RE_GOLD_SKULLTULA':
        return this.sohRange(distance, [null, null, null, null, null, () => this.CanUse('RG_BOOMERANG'),
          () => this.CanUse('RG_HOOKSHOT'), () => this.CanUse('RG_LONGSHOT'), null]);
      case 'RE_KEESE': case 'RE_FIRE_KEESE': case 'RE_GUAY': return true;
    }
    return aboveLink || (ED[distance] <= ED.ED_BOOMERANG && this.CanUse('RG_BOOMERANG'));
  },

  // --- capacités diverses (logic.cpp) ---
  CanBreakMudWalls(){ return this.BlastOrSmash() || (this.trick('RT_BLUE_FIRE_MUD_WALLS') && this.BlueFire()); },
  CanGetDekuBabaSticks(){ return this.CanUseSword() || this.CanUse('RG_BOOMERANG'); },
  CanGetDekuBabaNuts(){
    return this.CanJumpslash() || this.CanUse('RG_FAIRY_SLINGSHOT') || this.CanUse('RG_FAIRY_BOW') || this.HasExplosives() || this.CanUse('RG_DINS_FIRE');
  },
  CanHitEyeTargets(){ return this.CanUse('RG_FAIRY_BOW') || this.CanUse('RG_FAIRY_SLINGSHOT'); },
  CanDetonateBombFlowers(){ return this.CanUse('RG_FAIRY_BOW') || this.HasExplosives() || this.CanUse('RG_DINS_FIRE'); },
  CanDetonateUprightBombFlower(){
    return this.CanDetonateBombFlowers() || this.HasItem('RG_GORONS_BRACELET') || (this.trick('RT_BLUE_FIRE_MUD_WALLS')
      && this.CanUse('RG_BOTTLE_WITH_BLUE_FIRE') && (this.EffectiveHealth() !== 1 || this.CanUse('RG_NAYRUS_LOVE')));
  },
  CanHammerRecoilHover(needShield = false){
    return this.CanUse('RG_HOVER_BOOTS') && this.trick('RT_HOVER_BOOST_SIMPLE') && this.CanUse('RG_MEGATON_HAMMER')
      && (!needShield || this.CanStandingShield());
  },
  Water3FCentralToHighEmblem(){
    return (this.IsAdult && (this.CanUse('RG_HOVER_BOOTS') || (this.trick('RT_DAMAGE_BOOST_SIMPLE') && this.CanUse('RG_BOMB_BAG') && this.TakeDamage())))
      || this.CanMiddairGroundJump() || (this.Get('LOGIC_WATER_SCARECROW') && this.CanUse('RG_HOOKSHOT'));
  },
  WaterRisingTargetTo3FCentral(){
    return this.CanUse('RG_LONGSHOT') || (this.trick('RT_HOVER_BOOST_SIMPLE') && this.trick('RT_DAMAGE_BOOST_SIMPLE')
      && this.HasExplosives() && this.CanUse('RG_HOVER_BOOTS'));
  },
  // Niveau d'eau du Temple de l'Eau (7 événements, voir le commentaire de Logic::WaterLevel)
  WaterLevel(level){
    const G = e => this.Get(e), zl = () => this.CanUse('RG_ZELDAS_LULLABY');
    switch (level){
      case 'WL_LOW': return G('LOGIC_WATER_LOW') || (G('LOGIC_WATER_COULD_LOW_FROM_HIGH')
        && (G('LOGIC_WATER_COULD_HIGH_FROM_MID') || G('LOGIC_WATER_HIGH')) && zl());
      case 'WL_LOW_OR_MID': return G('LOGIC_WATER_LOW') || G('LOGIC_WATER_MIDDLE')
        || ((G('LOGIC_WATER_COULD_LOW_FROM_HIGH') || G('LOGIC_WATER_LOW')) && zl());
      case 'WL_MID': return G('LOGIC_WATER_MIDDLE') || (G('LOGIC_WATER_LOW') && G('LOGIC_WATER_COULD_MIDDLE'))
        || ((G('LOGIC_WATER_COULD_LOW_FROM_HIGH') || G('LOGIC_WATER_COULD_LOW')) && G('LOGIC_WATER_COULD_MIDDLE') && zl());
      case 'WL_HIGH': return G('LOGIC_WATER_HIGH') || (G('LOGIC_WATER_COULD_HIGH_FROM_MID') && G('LOGIC_WATER_COULD_MIDDLE'));
      case 'WL_HIGH_OR_MID': return G('LOGIC_WATER_MIDDLE') || G('LOGIC_WATER_HIGH') || G('LOGIC_WATER_COULD_MIDDLE');
    }
    sohWarn('niveau d\'eau inconnu : ' + level);
    return false;
  },
  // Bouteilles : celles du panneau ; la Lettre de Ruto compte une fois remise (comme dans SoH).
  BottleCount(){ return this.g.items.bottle + (this.g.items.rutoLetter && this.Get('LOGIC_DELIVER_RUTOS_LETTER') ? 1 : 0); },
  HasBottle(){ return this.BottleCount() >= 1; },
  OcarinaButtons(){
    return ['RG_OCARINA_A_BUTTON', 'RG_OCARINA_C_LEFT_BUTTON', 'RG_OCARINA_C_RIGHT_BUTTON', 'RG_OCARINA_C_UP_BUTTON',
      'RG_OCARINA_C_DOWN_BUTTON'].filter(b => this.HasItem(b)).length;
  },
  CanUseSword(){ return this.CanUse('RG_KOKIRI_SWORD') || this.CanUse('RG_MASTER_SWORD') || this.CanUse('RG_BIGGORON_SWORD'); },
  CanJumpslashExceptHammer(){ return this.CanUse('RG_STICKS') || this.CanUseSword(); },
  CanJumpslash(){ return this.CanJumpslashExceptHammer() || this.CanUse('RG_MEGATON_HAMMER'); },
  CanClearStalagmite(){
    return this.CanJumpslash() || this.HasExplosives() || this.CanUse('RG_GIANTS_KNIFE')
      || (this.trick('RT_ICE_STALAGMITE_HOOKSHOT') && this.CanUse('RG_HOOKSHOT'));
  },
  CanHitSwitch(distance = 'ED_CLOSE', inWater = false){
    const u = rg => this.CanUse(rg);
    return this.sohRange(distance, [
      () => u('RG_KOKIRI_SWORD') || u('RG_MEGATON_HAMMER') || u('RG_GIANTS_KNIFE'), null, () => u('RG_MASTER_SWORD'),
      () => u('RG_BIGGORON_SWORD') || u('RG_STICKS'), () => !inWater && u('RG_BOMB_BAG'), () => u('RG_BOOMERANG'),
      () => u('RG_HOOKSHOT') || u('RG_BOMBCHU_5'), () => u('RG_LONGSHOT'), () => u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW')]);
  },
  CanDamage(){
    return this.CanUse('RG_FAIRY_SLINGSHOT') || this.CanJumpslash() || this.HasExplosives() || this.CanUse('RG_DINS_FIRE') || this.CanUse('RG_FAIRY_BOW');
  },
  CanAttack(){ return this.CanDamage() || this.CanUse('RG_BOOMERANG') || this.CanUse('RG_HOOKSHOT'); },
  // Sac de missiles « Aucun » : les missiles vont avec le sac de bombes.
  BombchusEnabled(){ return this.s.bombchuBag !== 'None' ? this.g.items.bombchus > 0 : this.HasItem('RG_BOMB_BAG'); },
  BombchuRefill(){
    return this.Get('LOGIC_BUY_BOMBCHUS') || this.Get('LOGIC_COULD_PLAY_BOWLING') || this.Get('LOGIC_CARPET_MERCHANT')
      || this.s.bombchuDrops === 'Yes';
  },
  HookshotOrBoomerang(){ return this.CanUse('RG_HOOKSHOT') || this.CanUse('RG_BOOMERANG'); },
  ScarecrowsSong(){
    return (this.s.skipScarecrowsSong === 'On' && this.HasItem('RG_FAIRY_OCARINA') && this.OcarinaButtons() >= 2)
      || (this.Get('LOGIC_CHILD_SCARECROW') && this.Get('LOGIC_ADULT_SCARECROW'));
  },
  BlueFire(){ return this.CanUse('RG_BOTTLE_WITH_BLUE_FIRE') || (this.s.blueFireArrows === 'On' && this.CanUse('RG_ICE_ARROWS')); },
  CanBreakPots(distance = 'ED_CLOSE', wallOrFloor = true, inWater = false){
    const u = rg => this.CanUse(rg);
    return this.sohRange(distance, [
      () => this.HasItem('RG_POWER_BRACELET'), () => u('RG_KOKIRI_SWORD') || u('RG_MEGATON_HAMMER') || u('RG_GIANTS_KNIFE'),
      () => u('RG_MASTER_SWORD'), () => u('RG_BIGGORON_SWORD') || u('RG_STICKS'), () => !inWater && u('RG_BOMB_BAG'),
      () => u('RG_BOOMERANG'), () => u('RG_HOOKSHOT'), () => u('RG_LONGSHOT'), () => u('RG_FAIRY_SLINGSHOT') || u('RG_FAIRY_BOW')])
      || (wallOrFloor && u('RG_BOMBCHU_5'));
  },
  CanBreakCrates(){ return true; },
  CanBreakSmallCrates(){ return this.CanJumpslash() || this.HasExplosives() || this.HasItem('RG_POWER_BRACELET'); },
  CanBonkTrees(){ return true; },
  HasExplosives(){ return this.CanUse('RG_BOMB_BAG') || this.CanUse('RG_BOMBCHU_5'); },
  BlastOrSmash(){ return this.HasExplosives() || this.CanUse('RG_MEGATON_HAMMER'); },
  CanSpawnSoilSkull(bean){ return this.IsChild && this.CanUse('RG_BOTTLE_WITH_BUGS') && this.HasItem(bean); },
  CanReflectNuts(){ return this.CanUse('RG_DEKU_SHIELD') || (this.IsAdult && this.HasItem('RG_HYLIAN_SHIELD')); },
  CanCutShrubs(){
    return this.CanUse('RG_KOKIRI_SWORD') || this.CanUse('RG_BOOMERANG') || this.HasExplosives() || this.CanUse('RG_MASTER_SWORD')
      || this.CanUse('RG_MEGATON_HAMMER') || this.CanUse('RG_BIGGORON_SWORD') || this.CanUse('RG_GIANTS_KNIFE')
      || this.HasItem('RG_GORONS_BRACELET');
  },
  CanStunDeku(){ return this.CanAttack() || this.CanUse('RG_NUTS') || this.CanReflectNuts(); },
  CallGossipFairyExceptSuns(){ return this.CanUse('RG_ZELDAS_LULLABY') || this.CanUse('RG_EPONAS_SONG') || this.CanUse('RG_SONG_OF_TIME'); },
  CallGossipFairy(){ return this.CallGossipFairyExceptSuns() || this.CanUse('RG_SUNS_SONG'); },
  // Coups encaissables, en demi-cœurs (multiplicateur de dégâts par défaut, x1 — option non suivie)
  EffectiveHealth(){
    const q = this.Hearts() << (2 + (this.HasItem('RG_DOUBLE_DEFENSE') ? 1 : 0));
    return (q >> 1) + (q % 2 > 0 ? 1 : 0);
  },
  Hearts(){ const it = this.g.items; return this.s.startingHearts + it.heartContainers + Math.floor(it.heartPieces / 4); },
  // Donjons terminés : ceux dont le boss est battable en logique (voir l'en-tête).
  DungeonCount(){
    return ['DEKU_TREE', 'DODONGOS_CAVERN', 'JABU_JABUS_BELLY', 'FOREST_TEMPLE', 'FIRE_TEMPLE', 'WATER_TEMPLE', 'SPIRIT_TEMPLE',
      'SHADOW_TEMPLE'].filter(d => this.Get(`LOGIC_${d}_CLEAR`)).length;
  },
  StoneCount(){ return ['RG_KOKIRI_EMERALD', 'RG_GORON_RUBY', 'RG_ZORA_SAPPHIRE'].filter(r => this.HasItem(r)).length; },
  MedallionCount(){
    return ['RG_FOREST_MEDALLION', 'RG_FIRE_MEDALLION', 'RG_WATER_MEDALLION', 'RG_SPIRIT_MEDALLION', 'RG_SHADOW_MEDALLION',
      'RG_LIGHT_MEDALLION'].filter(r => this.HasItem(r)).length;
  },
  FireTimer(){ return this.CanUse('RG_GORON_TUNIC') ? 255 : this.trick('RT_FEWER_TUNIC_REQUIREMENTS') ? this.Hearts() * 8 : 0; },
  WaterTimer(){ return this.CanUse('RG_ZORA_TUNIC') ? 255 : this.trick('RT_FEWER_TUNIC_REQUIREMENTS') ? this.Hearts() * 8 : 0; },
  TakeDamage(){ return this.CanUse('RG_BOTTLE_WITH_FAIRY') || this.EffectiveHealth() !== 1 || this.CanUse('RG_NAYRUS_LOVE'); },
  CanOpenBombGrotto(){ return this.BlastOrSmash() && (this.HasItem('RG_STONE_OF_AGONY') || this.trick('RT_GROTTOS_WITHOUT_AGONY')); },
  CanOpenStormsGrotto(){ return this.CanUse('RG_SONG_OF_STORMS') && (this.HasItem('RG_STONE_OF_AGONY') || this.trick('RT_GROTTOS_WITHOUT_AGONY')); },
  CanGetNightTimeGS(){ return this.AtNight && (this.CanUse('RG_SUNS_SONG') || this.s.gsExpectSunsSong !== 'On'); },
  CanBreakUpperBeehives(){
    return this.HookshotOrBoomerang() || (this.trick('RT_BOMBCHU_BEEHIVES') && this.CanUse('RG_BOMBCHU_5'))
      || (this.s.slingBowBeehives === 'On' && (this.CanUse('RG_FAIRY_BOW') || this.CanUse('RG_FAIRY_SLINGSHOT')));
  },
  CanBreakLowerBeehives(){ return this.CanBreakUpperBeehives() || this.CanUse('RG_BOMB_BAG'); },
  HasFireSource(){ return this.CanUse('RG_DINS_FIRE') || this.CanUse('RG_FIRE_ARROWS'); },
  HasFireSourceWithTorch(){ return this.HasFireSource() || this.CanUse('RG_STICKS'); },
  SunlightArrows(){ return this.s.sunlightArrows === 'On' && this.CanUse('RG_LIGHT_ARROWS'); },
  TradeQuestStep(rg){
    if (this.s.shuffleAdultTrade === 'On') return false;
    const from = SOH_ADULT_TRADE.findIndex(([r]) => r === rg);
    if (from < 0){ sohWarn('étape d\'échange inconnue : ' + rg); return false; }
    // la chaîne du C++ saute l'Œil de Grenouille (RG_EYEBALL_FROG absent du switch)
    return SOH_ADULT_TRADE.slice(from).some(([r]) => r !== 'RG_EYEBALL_FROG' && this.HasItem(r));
  },
  CanStandingShield(){ return this.CanUse('RG_MIRROR_SHIELD') || (this.IsAdult && this.HasItem('RG_HYLIAN_SHIELD')) || this.CanUse('RG_DEKU_SHIELD'); },
  CanShield(){ return this.CanUse('RG_MIRROR_SHIELD') || this.HasItem('RG_HYLIAN_SHIELD') || this.CanUse('RG_DEKU_SHIELD'); },
  CanUseProjectile(){
    return this.HasExplosives() || this.CanUse('RG_FAIRY_BOW') || this.CanUse('RG_HOOKSHOT') || this.CanUse('RG_FAIRY_SLINGSHOT') || this.CanUse('RG_BOOMERANG');
  },
  CanBuildRainbowBridge(){
    const s = this.s, b = s.rainbowBridge, greg = this.HasItem('RG_GREG_RUPEE') && s.bridgeRewardOptions === 'Greg as Reward' ? 1 : 0;
    return b === 'Always open'
      || (b === 'Vanilla' && this.HasItem('RG_SHADOW_MEDALLION') && this.HasItem('RG_SPIRIT_MEDALLION') && this.CanUse('RG_LIGHT_ARROWS'))
      || (b === 'Stones' && this.StoneCount() + greg >= s.bridgeStoneCount)
      || (b === 'Medallions' && this.MedallionCount() + greg >= s.bridgeMedallionCount)
      || (b === 'Dungeon rewards' && this.StoneCount() + this.MedallionCount() + greg >= s.bridgeRewardCount)
      || (b === 'Dungeons' && this.DungeonCount() + greg >= s.bridgeDungeonCount)
      || (b === 'Tokens' && this.GetGSCount() >= s.bridgeTokenCount)
      || (b === 'Greg' && this.HasItem('RG_GREG_RUPEE'));
  },
  // Condition LACS : celle de la clé de Ganon « LACS-… », sinon la vanilla (médaillons de l'Ombre et de l'Esprit).
  CanTriggerLACS(){
    const s = this.s, c = s.ganonsBossKey, greg = this.HasItem('RG_GREG_RUPEE') && s.gcbkRewardOptions === 'Greg as Reward' ? 1 : 0;
    const lacs = c.startsWith('LACS-') && c !== 'LACS-Vanilla' ? c : 'LACS-Vanilla';
    return (lacs === 'LACS-Vanilla' && this.HasItem('RG_SHADOW_MEDALLION') && this.HasItem('RG_SPIRIT_MEDALLION'))
      || (lacs === 'LACS-Stones' && this.StoneCount() + greg >= s.gcbkStoneCount)
      || (lacs === 'LACS-Medallions' && this.MedallionCount() + greg >= s.gcbkMedallionCount)
      || (lacs === 'LACS-Rewards' && this.StoneCount() + this.MedallionCount() + greg >= s.gcbkRewardCount)
      || (lacs === 'LACS-Dungeons' && this.DungeonCount() + greg >= s.gcbkDungeonCount)
      || (lacs === 'LACS-Tokens' && this.GetGSCount() >= s.gcbkTokenCount);
  },
  GetGSCount(){ return this.g.items.skulltulaTokens; },
  // Petites clés : clé squelette, clés « Au départ », trousseau obtenu, sinon le compte noté. Temple du Feu vanilla hors
  // clés mélangées hors du donjon : +1, la porte du sous-sol étant ouverte d'office par SoH (Logic::Reset).
  SmallKeys(scene, n){
    if (this.HasItem('RG_SKELETON_KEY')) return true;
    const id = SOH_SCENE_DUNGEON[scene];
    if (!id) return n <= 0;
    const d = this.g.dungeons[id];
    if (keysAtStart(id, this.s) || (d.ringGot && DUNGEON_BY_ID[id].keyRing)) return true;
    const bonus = id === 'fireTemple' && !this.IsFireLoopLocked() && this.quest('FIRE_TEMPLE') === 'Vanilla' ? 1 : 0;
    return d.keys + bonus >= n;
  },
  IsFireLoopLocked(){ return ['Anywhere', 'Overworld', 'Any Dungeon'].includes(this.s.smallKeys); },
  ReachScarecrow(){ return this.ScarecrowsSong() && this.CanUse('RG_HOOKSHOT'); },
  ReachDistantScarecrow(){ return this.ScarecrowsSong() && this.CanUse('RG_LONGSHOT'); },
  CanClimbLadder(){ return this.HasItem('RG_CLIMB') || (this.trick('RT_HOOKSHOT_LADDERS') && this.CanUse('RG_HOOKSHOT')); },
  CanClimbHighLadder(){ return this.HasItem('RG_CLIMB') || (this.trick('RT_HOOKSHOT_LADDERS') && this.CanUse('RG_LONGSHOT')); },
  SummonEpona(){ return this.IsAdult && this.Get('LOGIC_FREED_EPONA') && this.CanUse('RG_EPONAS_SONG'); },
  IsReverseAccessPossible(){
    const s = this.s, mixed = s.mixedEntrancePools === 'On';
    return s.bossEntrances !== 'Off' && ((s.decoupleEntrances === 'On' && s.bossEntrances === 'Full')
      || (mixed && s.mixBosses === 'On' && ((mixed && s.mixOverworld === 'On') || (mixed && s.mixInteriors === 'On'))));
  },
  DMCUpperToPots(){ return this.CanUse('RG_HOVER_BOOTS') || (this.IsAdult && (this.Get('LOGIC_DMC_BOULDER') || this.trick('RT_DMC_BOULDER_SKIP'))); },
  DMCPotsToPad(){
    return this.CanUse('RG_HOVER_BOOTS') || this.CanUse('RG_HOOKSHOT')
      || (this.IsAdult && this.CanShield() && this.trick('RT_DMC_BOLERO_JUMP') && this.CanUse('RG_POWER_BRACELET'));
  },
  DMCPadToPots(){ return (this.CanUse('RG_HOVER_BOOTS') && (this.IsAdult || this.HasItem('RG_CLIMB'))) || this.CanUse('RG_HOOKSHOT'); },
  SpiritExplosiveKeyLogic(){ return this.SmallKeys('SCENE_SPIRIT_TEMPLE', this.HasExplosives() ? 1 : 2); },
  SpiritWestToSkull(){ return (this.IsAdult && this.trick('RT_SPIRIT_STATUE_JUMP')) || this.CanUse('RG_HOVER_BOOTS') || this.ReachScarecrow(); },
  SpiritSunBlockSouthLedge(){
    return this.HasItem('RG_POWER_BRACELET') || this.IsAdult || this.CanKillEnemy('RE_BEAMOS') || (this.CanUse('RG_HOOKSHOT')
      && (this.HasFireSource() || (this.Get('LOGIC_SPIRIT_SUN_BLOCK_TORCH')
        && (this.CanUse('RG_STICKS') || (this.trick('RT_SPIRIT_SUN_CHEST') && this.CanUse('RG_FAIRY_BOW'))))));
  },
  SpiritEastToSwitch(){
    return (this.IsAdult && this.trick('RT_SPIRIT_STATUE_JUMP')) || this.CanUse('RG_HOVER_BOOTS')
      || (this.CanUse('RG_ZELDAS_LULLABY') && this.CanUse('RG_HOOKSHOT'));
  },
  MQSpiritWestToPots(){ return (this.IsAdult && this.trick('RT_SPIRIT_STATUE_JUMP')) || this.CanUse('RG_HOVER_BOOTS') || this.CanUse('RG_SONG_OF_TIME'); },
  MQSpiritStatueToSunBlock(){
    return (this.IsAdult || this.trick('RT_SPIRIT_MQ_SUN_BLOCK_SOT') || this.CanUse('RG_SONG_OF_TIME')) && this.HasItem('RG_POWER_BRACELET');
  },
  MQSpiritStatueSouthDoor(){
    return this.HasFireSource() || (this.trick('RT_SPIRIT_MQ_FROZEN_EYE') && this.CanUse('RG_FAIRY_BOW')
      && this.CanUse('RG_SONG_OF_TIME') && (this.HasItem('RG_CLIMB') || this.CanUse('RG_HOOKSHOT')));
  },
  MQSpirit4KeyColossus(){
    return this.CanAvoidEnemy('RE_BEAMOS', true, 4) && this.CanUse('RG_SONG_OF_TIME') && this.CanJumpslash()
      && (this.HasItem('RG_POWER_BRACELET') || this.SunlightArrows())
      && (this.trick('RT_LENS_SPIRIT_MQ') || this.CanUse('RG_LENS_OF_TRUTH')) && this.CanKillEnemy('RE_IRON_KNUCKLE')
      && this.CanUse('RG_HOOKSHOT');
  },
  MQSpirit4KeyWestHand(){ return this.CanUse('RG_LONGSHOT') && this.MQSpirit4KeyColossus(); },
  CouldMQSpirit4KeyWestHand(){
    return this.CanAvoidEnemy('RE_BEAMOS', true, 4) && this.CanUse('RG_SONG_OF_TIME')
      && (this.HasItem('RG_MASTER_SWORD') || this.HasItem('RG_BIGGORON_SWORD') || this.HasItem('RG_MEGATON_HAMMER'))
      && (this.HasItem('RG_POWER_BRACELET') || this.SunlightArrows())
      && (this.trick('RT_LENS_SPIRIT_MQ') || this.CanUse('RG_LENS_OF_TRUTH')) && this.HasItem('RG_LONGSHOT');
  },
  OuterWestHandLogic(){
    return this.HasExplosives() && (this.HasItem('RG_CLIMB') || this.CanUse('RG_LONGSHOT')) && this.HasItem('RG_POWER_BRACELET')
      && this.SmallKeys('SCENE_SPIRIT_TEMPLE', this.HasItem('RG_LONGSHOT') ? 3 : 5);
  },
  OuterWestHandMQLogic(){ return this.MQSpiritStatueToSunBlock() && this.SmallKeys('SCENE_SPIRIT_TEMPLE', this.CouldMQSpirit4KeyWestHand() ? 4 : 7); },
  StatueRoomMQKeyLogic(){
    return this.SmallKeys('SCENE_SPIRIT_TEMPLE', this.IsChild && this.Get('LOGIC_REVERSE_SPIRIT_CHILD') && this.CanHitSwitch()
      && (this.HasItem('RG_CLIMB') || this.CanUse('RG_LONGSHOT')) ? 6 : 7);
  },

  // --- Temple de l'Esprit : accès certain et partagé entre les âges (location_access.cpp) ---
  SpiritCertainAccess(region){
    const [childKeys, childRevKeys, adultKeys, adultRevKeys, childAccess, adultAccess, reverseAccess] = SOH.spirit[region];
    const [keys, revKeys, access, fwd, rev] = this.IsChild
      ? [childKeys, childRevKeys, childAccess, 'LOGIC_FORWARDS_SPIRIT_CHILD', 'LOGIC_REVERSE_SPIRIT_CHILD']
      : [adultKeys, adultRevKeys, adultAccess, 'LOGIC_FORWARDS_SPIRIT_ADULT', 'LOGIC_REVERSE_SPIRIT_ADULT'];
    const knownFront = this.Get(fwd) || !this.IsReverseAccessPossible();
    return (knownFront && access() && this.SmallKeys('SCENE_SPIRIT_TEMPLE', keys))
      || (this.Get(rev) && reverseAccess() && this.SmallKeys('SCENE_SPIRIT_TEMPLE', revKeys))
      || (access() && reverseAccess() && this.SmallKeys('SCENE_SPIRIT_TEMPLE', Math.max(keys, revKeys)));
  },
  SpiritShared(region, condition, anyAge = false, otherRegion = 'RR_NONE', otherCondition = () => false,
    thirdRegion = 'RR_NONE', thirdCondition = () => false){
    const data = SOH.spirit[region], pastAdult = this.IsAdult, pastChild = this.IsChild;
    const others = [[otherRegion, otherCondition], [thirdRegion, thirdCondition]].filter(([r]) => r !== 'RR_NONE');
    let result = false;
    this.IsChild = true; this.IsAdult = false;
    const childCertain = this.SpiritCertainAccess(region);
    this.IsChild = false; this.IsAdult = true;
    const adultCertain = this.SpiritCertainAccess(region);
    const view = sohRegionView(region);
    // l'autre âge doit aussi pouvoir y arriver (et par l'entrée inversée si elle est possible)
    const viaOtherAge = (ageAccessIdx, childBug) => {
      const rev = this.IsReverseAccessPossible();
      // (le C++ teste « reverseAccess » sans l'appeler dans la branche enfant : toujours vrai, reproduit tel quel)
      return (data[ageAccessIdx]() && (!rev || childBug || data[6]()) && condition())
        || others.some(([r, c]) => SOH.spirit[r][ageAccessIdx]() && (!rev || SOH.spirit[r][6]()) && c());
    };
    if (anyAge && (childCertain || adultCertain)){
      this.IsChild = childCertain; this.IsAdult = adultCertain;
      result = condition();
    } else if (view.Child() && pastChild){
      this.IsChild = true; this.IsAdult = false;
      result = condition();
      if (!childCertain && result){ this.IsChild = false; this.IsAdult = true; result = viaOtherAge(5, true); }
    } else if (view.Adult() && pastAdult){
      this.IsChild = false; this.IsAdult = true;   // (inchangé dans le C++ : l'âge courant est déjà adulte)
      result = condition();
      if (!adultCertain && result){ this.IsChild = true; this.IsAdult = false; result = viaOtherAge(4, false); }
    }
    this.IsChild = pastChild; this.IsAdult = pastAdult;
    return result;
  },
};

// Âge de départ effectif (option « Âge de départ », ou « Âge tiré » s'il est aléatoire).
const sohStartingAge = s => s.startingAge === 'Random' ? s.selectedStartingAge : s.startingAge;

// Vue d'une région pour les conditions (Region::Child, Adult, AnyAgeTime, CanPlantBeanCheck…).
function sohRegionView(rr){
  const a = L.access[rr] || 0;
  return {
    Child:() => !!(a & CHILD), Adult:() => !!(a & ADULT),
    BothAgesCheck:() => !!(a & CHILD) && !!(a & ADULT),
    AnyAgeTime(fn){
      const pastAdult = L.IsAdult, pastChild = L.IsChild;
      L.IsChild = !!(a & CHILD); L.IsAdult = !!(a & ADULT);
      const v = fn() && (L.IsAdult || L.IsChild);
      L.IsChild = pastChild; L.IsAdult = pastAdult;
      return v;
    },
    CanPlantBeanCheck(bean){
      return L.HasItem(bean) && !!L.g.items.beans && (L.s.skipPlantingBeans === 'On' || (!!(a & CHILD) && !!(a & ADULT)));
    },
  };
}

// Évalue une condition dans un état âge/moment (CheckConditionAtAgeTime).
function sohAt(fn, child, day){
  L.IsChild = child; L.IsAdult = !child; L.AtDay = day; L.AtNight = !day;
  return fn();
}
// États (bits) de `have` pour lesquels la condition est vraie ; `stopAtFirst` : s'arrête au premier (ConditionsMet).
function sohStates(fn, have, stopAtFirst){
  let out = 0;
  for (const [bit, child, day] of AGE_TIMES){
    if (!(have & bit)) continue;
    if (sohAt(fn, child, day)){ out |= bit; if (stopAtFirst) break; }
  }
  return out;
}

/* ---------- Recherche d'accessibilité (fill.cpp : ReachabilitySearch en mode « checks disponibles ») ----------
   settings : store.settings ; game : store.game ; links (facultatif) : entrées mélangées connues,
   { 'RR_DÉPART>RR_ARRIVÉE_VANILLA': 'RR_ARRIVÉE_RÉELLE' } (Entrance::Connect : la sortie garde sa condition, seule
   la région d'arrivée change ; null = destination inconnue, la sortie ne mène nulle part). Renvoie
   { access:{RR: bits}, events:{LOGIC: true}, checks:{RC: bits} } — bits des états âge/moment dans lesquels le check
   est faisable (0 = inaccessible). */
function computeSoh(settings, game, links = {}){
  L.s = settings; L.g = game; L.events = {}; L.access = {}; L.optIdx = {}; L.cur = null; L.curCheck = null; L.BigPoes = 0;
  const access = L.access, added = new Set(), pool = ['RR_ROOT'], checksFound = new Set();
  added.add('RR_ROOT');
  access.RR_ROOT = sohStartingAge(settings) === 'Adult' ? AD : CD;
  // Objet vanilla d'une boutique / peste Mojo / d'un marchand non mélangé : l'atteindre active son événement
  // (Item::ApplyEffect -> logicVal), ex. bâtons Mojo achetables -> LOGIC_STICK_ACCESS.
  const vanillaEvent = rc => {
    const p = SOH.prices[rc], ev = p && SOH_BUY_EVENT[p[1]], c = CHECK_BY_ID[rc.slice(3)];
    return ev && c && !checkShuffled(c, settings, false) ? ev : null;
  };
  let updated;

  function applyTimePass(rr){
    const r = SOH.regions[rr], a = access[rr] || 0;
    if (!r.time) return;
    if (a & CHILD){ access[rr] |= CHILD; access.RR_ROOT |= CHILD; }
    if (a & ADULT){ access[rr] |= ADULT; access.RR_ROOT |= ADULT; }
  }
  function updateEvents(rr){
    const r = SOH.regions[rr], list = r.events === 'grottoEvents' ? SOH.grottoEvents : r.events, a = access[rr] || 0;
    let changed = false;
    for (const [ev, fn] of list){
      if (L.events[ev]) continue;
      if (sohStates(fn, a, true)){ L.events[ev] = true; changed = true; }
    }
    return changed;
  }
  function processExits(rr){
    for (const [vanillaTo, fn] of SOH.regions[rr].exits){
      const k = rr + '>' + vanillaTo, to = k in links ? links[k] : vanillaTo;
      if (!to) continue;   // destination pas encore notée : impasse
      if (!SOH.regions[to]){ sohWarn('région inconnue : ' + to); continue; }
      const from = access[rr] || 0, have = access[to] || 0;
      const gain = sohStates(fn, from & ~have, false);   // UpdateToDAccess : états du parent que la cible n'a pas encore
      if (gain){
        access[to] = have | gain; updated = true;
        if (!added.has(to)){ added.add(to); pool.push(to); }
        processRegion(to);
      }
    }
  }
  function propagateTimeTravel(){
    const root = access.RR_ROOT || 0, tot = access.RR_TOT_BEYOND_DOOR_OF_TIME || 0;
    if (!(root & ADULT) && (tot & CHILD)){
      access.RR_ROOT = root | ((tot & CD) ? AD : 0) | ((tot & CN) ? AN : 0);
      processRegion('RR_ROOT');
    } else if (!(root & CHILD) && (tot & ADULT)){
      access.RR_ROOT = root | ((tot & AD) ? CD : 0) | ((tot & AN) ? CN : 0);
      processRegion('RR_ROOT');
    }
  }
  function processRegion(rr){
    const prev = L.cur;
    L.cur = rr;
    applyTimePass(rr);
    if (updateEvents(rr)) updated = true;
    processExits(rr);
    propagateTimeTravel();
    for (const [rc, fn] of SOH.regions[rr].checks){
      if (checksFound.has(rc)) continue;
      L.curCheck = rc;
      if (sohStates(fn, access[rr] || 0, true)){
        checksFound.add(rc);
        const ev = vanillaEvent(rc);
        if (ev && !L.events[ev]){ L.events[ev] = true; updated = true; }
      }
      L.curCheck = null;
    }
    L.cur = prev;
  }
  do {
    updated = false;
    for (let i = 0; i < pool.length; i++) processRegion(pool[i]);
  } while (updated);

  // Point fixe atteint : pour chaque check, tous les états âge/moment où il est faisable (pastilles Enfant / Adulte).
  const checks = {};
  for (const rr of pool){
    const a = access[rr] || 0;
    if (!a) continue;
    L.cur = rr;
    for (const [rc, fn] of SOH.regions[rr].checks){
      L.curCheck = rc;
      const got = sohStates(fn, a & ~(checks[rc] || 0), false);
      if (got || !(rc in checks)) checks[rc] = (checks[rc] || 0) | got;
    }
  }
  L.cur = null; L.curCheck = null;
  return { access:{ ...access }, events:{ ...L.events }, checks };
}

/* ---------- Entrées notées -> liaisons de computeSoh ----------
   Chaque sortie de areas-data.js porte le numéro de son entrée SoH (`entr`, voir tools/soh-entrances/apply_names.mjs).
   Noter « la sortie X mène à la sortie Z » (on apparaît à Z) revient pour SoH à remplacer l'entrée de X par l'entrée
   qui, en vanilla, fait apparaître à Z : la sortie X mène alors à la région d'arrivée vanilla de cette entrée. */
const SOH_ENTRANCE = {};
SOH.entrances.forEach(([n, type, from, to]) => { SOH_ENTRANCE[n] = { n, type, from, to }; });
const EXIT_BY_ENTR = {};
ALL_EXITS.forEach(e => { if (e.entr != null) EXIT_BY_ENTR[e.entr] = e; });
// Entrée qui fait apparaître à chaque sortie Z (celle dont Z est la cible vanilla) ; une entrée à double sens passe avant
// un sens unique (ex. une porte de grotte, également cible vanilla d'un spawn ou d'un chant).
const ARRIVAL_ENTR = {};
for (const two of [true, false]) for (const w of ALL_EXITS){
  if (w.entr == null || !w.vanilla || w.specialTag || isTwoWay(w) !== two || w.vanilla in ARRIVAL_ENTR) continue;
  ARRIVAL_ENTR[w.vanilla] = w.entr;
}
// Devant une porte de boss : on y apparaît en sortant de sa salle vanilla par la porte (entrée de la salle de boss).
for (const d of BOSS_DOORS) if (EXIT[d.vanilla]?.specialTag) ARRIVAL_ENTR[d.key] = EXIT[d.vanilla].entr;
// Types SoH des entrées qui font apparaître à chaque sortie (destinations possibles des sens uniques).
const ARRIVAL_TYPES = {};
for (const w of ALL_EXITS) if (w.entr != null && w.vanilla && !w.specialTag) (ARRIVAL_TYPES[w.vanilla] ||= new Set()).add(SOH_ENTRANCE[w.entr]?.type);
// Région où l'on apparaît en arrivant à une sortie.
const arrivalRegion = key => SOH_ENTRANCE[ARRIVAL_ENTR[key]]?.to || null;
// Régions où se trouve une sortie (départ de son entrée, et région d'arrivée quand on y apparaît) : page Entrées.
const exitRegions = e => [SOH_ENTRANCE[e.entr]?.from, arrivalRegion(e.key)].filter(Boolean);

// Téléporteurs bleus (entrance.cpp, fin de ShuffleAllEntrances) : salle de boss -> entrée du donjon dont elle dépend.
const BOSS_DUNGEON_ENTRYWAY = { RR_DEKU_TREE_BOSS_ROOM:'RR_DEKU_TREE_ENTRYWAY', RR_DODONGOS_CAVERN_BOSS_ROOM:'RR_DODONGOS_CAVERN_ENTRYWAY',
  RR_JABU_JABUS_BELLY_BOSS_ROOM:'RR_JABU_JABUS_BELLY_ENTRYWAY', RR_FOREST_TEMPLE_BOSS_ROOM:'RR_FOREST_TEMPLE_ENTRYWAY',
  RR_FIRE_TEMPLE_BOSS_ROOM:'RR_FIRE_TEMPLE_ENTRYWAY', RR_WATER_TEMPLE_BOSS_ROOM:'RR_WATER_TEMPLE_ENTRYWAY',
  RR_SPIRIT_TEMPLE_BOSS_ROOM:'RR_SPIRIT_TEMPLE_ENTRYWAY', RR_SHADOW_TEMPLE_BOSS_ROOM:'RR_SHADOW_TEMPLE_ENTRYWAY',
  RR_GANONS_TOWER_STAIRS_1:'RR_GANONS_CASTLE_ENTRYWAY' };
const BOSS_ROOM_PAIRS = SOH.entrances.filter(([, type]) => type === 'BlueWarp').map(([n, , room]) => {
  const ent = SOH.entrances, dungeonExit = ent.find(([, t, from]) => /Dungeon$/.test(t) && from === BOSS_DUNGEON_ENTRYWAY[room]);
  return { room, blueWarp:SOH_ENTRANCE[n],
    back:SOH_ENTRANCE[ent.find(([, t, from]) => /Boss$|^GanonTower$/.test(t) && from === room)[0]],   // porte de sortie de la salle
    dungeonExit:SOH_ENTRANCE[dungeonExit[0]] };
});
const BOSS_PAIR_BY_BACK = Object.fromEntries(BOSS_ROOM_PAIRS.map(p => [p.back.n, p]));
const BOSS_PAIR_BY_DUNGEON_EXIT = Object.fromEntries(BOSS_ROOM_PAIRS.map(p => [p.dungeonExit.n, p]));

// Entrées de remplacement (GetReplacement de SoH) déduites des destinations notées (eff = computeEff) :
// replacement(n) = entrée SoH par laquelle passe en réalité l'entrée n (elle-même si rien ne change, null si inconnue),
// blueWarp(p) = entrée dont le téléporteur bleu de la salle p prend la destination.
function entranceReplacer(eff, settings){
  const decoupled = isDecoupled(settings);
  function replacement(n){
    const x = EXIT_BY_ENTR[n];
    if (x && !x.specialTag){
      const z = eff[x.key];
      if (z === x.vanilla) return n;
      return z ? ARRIVAL_ENTR[z] ?? null : null;
    }
    const pair = BOSS_PAIR_BY_BACK[n];
    if (!pair) return n;
    // Porte de sortie d'une salle de boss : en entrées couplées, elle ramène devant ce qui mène à cette salle (inverse
    // de son entrée) ; en entrées découplées, elle est mélangée à part et notée dans Entrées.
    const room = x?.key, vanillaDoor = BOSS_DOORS.find(d => d.vanilla === room);
    if (!vanillaDoor || !isRandomized(vanillaDoor, settings)) return n;
    if (decoupled) return eff[room] ? ARRIVAL_ENTR[eff[room]] ?? null : null;
    // ce qui mène à la salle : une porte de boss, ou toute sortie à double sens en pools mélangés
    const via = ALL_EXITS.find(e => !e.specialTag && poolOf(e) !== 'oneway' && eff[e.key] === room);
    return via ? ARRIVAL_ENTR[via.key] ?? null : null;
  }
  // Téléporteur bleu (fin de ShuffleAllEntrances) : là où mène la porte de sortie de la salle ; en entrées couplées, on
  // remonte de salle en donjon (porte de boss puis entrée du donjon) et l'entrée d'un donjon donne son téléporteur vanilla.
  // Garde-fou contre une boucle due à des destinations notées incohérentes.
  function blueWarp(p){
    let t = replacement(p.back.n);
    if (decoupled) return t;
    for (let i = 0; i < 12 && t != null && BOSS_PAIR_BY_BACK[t]; i++) t = replacement(BOSS_PAIR_BY_BACK[t].dungeonExit.n);
    if (t != null && BOSS_PAIR_BY_BACK[t]) return null;
    return t != null && BOSS_PAIR_BY_DUNGEON_EXIT[t] ? BOSS_PAIR_BY_DUNGEON_EXIT[t].blueWarp.n : t;
  }
  return { replacement, blueWarp };
}

/** Liaisons { 'RR_DÉPART>RR_ARRIVÉE_VANILLA': région | null } des destinations connues (eff = computeEff), pour computeSoh.
   Sortie randomisée sans destination notée -> null (impasse). */
function entranceLinks(eff, settings){
  const links = {}, { replacement, blueWarp } = entranceReplacer(eff, settings);
  const set = (e, t) => { const to = t == null ? null : SOH_ENTRANCE[t].to; if (to !== e.to) links[e.from + '>' + e.to] = to; };
  for (const x of ALL_EXITS){
    if (x.entr == null || x.specialTag || !SOH_ENTRANCE[x.entr]) continue;
    set(SOH_ENTRANCE[x.entr], replacement(x.entr));
  }
  for (const p of BOSS_ROOM_PAIRS){
    set(p.back, replacement(p.back.n));
    set(p.blueWarp, blueWarp(p));
  }
  return links;
}

// Sortie où l'on apparaît en prenant une entrée SoH (inverse d'ARRIVAL_ENTR).
const EXIT_BY_ARRIVAL = Object.fromEntries(Object.entries(ARRIVAL_ENTR).map(([key, n]) => [n, key]));
/** Destination affichée du téléporteur bleu de chaque salle de boss calculée automatiquement (page Entrées, « A »),
   tirée du même calcul que la logique : { clé de la salle: sortie | null }. */
function blueWarpTargets(eff, settings){
  const { blueWarp } = entranceReplacer(eff, settings), out = {};
  for (const p of BOSS_ROOM_PAIRS){
    const room = EXIT_BY_ENTR[p.back.n];
    if (!room?.specialTag || bossRoomNoted(room, settings)) continue;
    const t = blueWarp(p), q = BOSS_ROOM_PAIRS.find(b => b.blueWarp.n === t);
    // téléporteur vanilla d'un donjon : sa destination vanilla (celle de la salle du donjon, ou devant le Château de Ganon)
    const qRoom = q && EXIT_BY_ENTR[q.back.n];
    out[room.key] = t == null ? null : !q ? EXIT_BY_ARRIVAL[t] ?? null : qRoom?.specialTag ? qRoom.vanilla : EXIT_BY_ARRIVAL[q.dungeonExit.n] ?? null;
  }
  return out;
}
