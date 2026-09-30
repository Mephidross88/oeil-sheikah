/* Logique du randomizer de Ship of Harkinian 9.2.3 (commit cb71e22) — FICHIER GÉNÉRÉ par tools/soh-logic/extract_logic.mjs.
   Régions (location_access/**), événements génériques des grottes et données du Temple de l'Esprit (location_access.cpp),
   conditions converties du C++ en fonctions JavaScript évaluées avec le contexte de logique global « L » (js/soh-logic.js).
   regions : { RR : { name, scene, time (le temps y passe), events:[[LOGIC, cond]], checks:[[RC, cond]], exits:[[RR, cond]] } }
             (events peut valoir "grottoEvents" : événements génériques des grottes)
   spirit  : { RR : [childKeys, childRevKeys, adultKeys, adultRevKeys, childAccess, adultAccess, reverseAccess] }
   options : { RSK : { name (nom SoH), list | numeric:{min, step}, def (index par défaut) } } — options lues par la logique */
window.SOH_LOGIC = {
  options:{"RSK_BIG_POE_COUNT":{"name":"Big Poe Target Count","numeric":{"min":0,"step":1},"def":10},"RSK_BLUE_FIRE_ARROWS":{"name":"Blue Fire Arrows","list":["Off","On"],"def":0},"RSK_DOOR_OF_TIME":{"name":"Door of Time","list":["Closed","Song only","Open"],"def":0},"RSK_FISHSANITY_AGE_SPLIT":{"name":"Pond Age Split","list":["Off","On"],"def":0},"RSK_FOREST":{"name":"Closed Forest","list":["On","Deku Only","Off"],"def":0},"RSK_GERUDO_FORTRESS":{"name":"Fortress Carpenters","list":["Normal","Fast","Free"],"def":0},"RSK_JABU_OPEN":{"name":"Jabu-Jabu","list":["Closed","Open"],"def":0},"RSK_KAK_GATE":{"name":"Kakariko Gate","list":["Closed","Open"],"def":0},"RSK_MASK_QUEST":{"name":"Mask Quest","list":["Vanilla","Completed","Shuffle"],"def":0},"RSK_MEDALLION_LOCKED_TRIALS":{"name":"Medallion Locked Trials","list":["Off","On"],"def":0},"RSK_SELECTED_STARTING_AGE":{"name":"Selected Starting Age","list":["Child","Adult"],"def":0},"RSK_SHUFFLE_CHEST_MINIGAME":{"name":"Shuffle Chest Minigame","list":["Off","On (Separate)","On (Pack)"],"def":0},"RSK_SHUFFLE_DUNGEON_ENTRANCES":{"name":"Dungeon Entrances","list":["Off","On","On + Ganon"],"def":0},"RSK_SHUFFLE_POTS":{"name":"Shuffle Pots","list":["Off","Dungeons","Overworld","All Pots"],"def":0},"RSK_SHUFFLE_SCRUBS":{"name":"Scrubs Shuffle","list":["Off","One-Time Only","All"],"def":0},"RSK_SKIP_CHILD_ZELDA":{"name":"Skip Child Zelda","list":["Don't Skip","Skip"],"def":0},"RSK_SKIP_EPONA_RACE":{"name":"Skip Epona Race","list":["Don't Skip","Skip"],"def":0},"RSK_SLEEPING_WATERFALL":{"name":"Sleeping Waterfall","list":["Closed","Open"],"def":0},"RSK_SUNLIGHT_ARROWS":{"name":"Sunlight Arrows","list":["Off","On"],"def":0},"RSK_TRIFORCE_HUNT_PIECES_REQUIRED":{"name":"Triforce Hunt Required Pieces","numeric":{"min":1,"step":1},"def":19},"RSK_ZORAS_FOUNTAIN":{"name":"Zora's Fountain","list":["Closed","Closed as child","Open"],"def":0}},
  tricks:["RT_BLUE_FIRE_MUD_WALLS","RT_BOTTOM_OF_THE_WELL_NAVI_DIVE","RT_BOTW_BASEMENT","RT_BOTW_MQ_DEADHAND_KEY","RT_BOTW_PITS","RT_COLOSSUS_GS","RT_DAMAGE_BOOST_SIMPLE","RT_DC_EYES_CHU","RT_DC_HAMMER_FLOOR","RT_DC_MQ_ADULT_EYES","RT_DC_MQ_CHILD_BOMBS","RT_DC_MQ_CHILD_EYES","RT_DC_MQ_STAIRS_WITH_ONLY_STRENGTH","RT_DC_SCARECROW_GS","RT_DC_SCRUB_ROOM","RT_DC_SLINGSHOT_SKIP","RT_DC_STAIRS_WITH_BOW","RT_DC_VINES_GS","RT_DEKU_B1_BACKFLIP_OVER_SPIKED_LOG","RT_DEKU_B1_BOW_WEBS","RT_DEKU_B1_SKIP","RT_DEKU_MQ_COMPASS_GS","RT_DEKU_MQ_LOG","RT_DISTANT_BOULDER_COLLISION","RT_DMC_BOULDER_JS","RT_DMC_HOVER_BEAN_POH","RT_DMT_BEAN_LOWER_GS","RT_DMT_BOMBABLE","RT_DMT_CLIMB_HOVERS","RT_DMT_HOVERS_LOWER_GS","RT_DMT_JS_LOWER_GS","RT_DMT_SHIELDLESS_CLIMB","RT_DMT_SOIL_GS","RT_DMT_UPPER_GS","RT_FIRE_MQ_BK_CHEST","RT_FIRE_MQ_BLOCKED_CHEST","RT_FIRE_MQ_CLIMB","RT_FIRE_MQ_MAZE_HOVERS","RT_FIRE_MQ_MAZE_JUMP","RT_FIRE_MQ_MAZE_SIDE_ROOM","RT_FIRE_MQ_NEAR_BOSS","RT_FIRE_RINGS","RT_FIRE_SCARECROW","RT_FIRE_SKIP_FLAME_WALLS","RT_FIRE_SOT","RT_FIRE_STRENGTH","RT_FOREST_COURTYARD_EAST_GS","RT_FOREST_COURTYARD_HEARTS_BOOMERANG","RT_FOREST_COURTYARD_LEDGE","RT_FOREST_DOORFRAME","RT_FOREST_FIRST_GS","RT_FOREST_MQ_BLOCK_PUZZLE","RT_FOREST_MQ_CHILD_DOORFRAME","RT_FOREST_MQ_HOOKSHOT_HALLWAY_SWITCH","RT_FOREST_MQ_JS_HALLWAY_SWITCH","RT_FOREST_MQ_RANG_HALLWAY_SWITCH","RT_FOREST_OUTSIDE_BACKDOOR","RT_FOREST_VINES","RT_FOREST_WELL_SWIM","RT_GANON_MQ_FIRE_TRIAL","RT_GANON_MQ_LIGHT_TRIAL","RT_GANON_MQ_SHADOW_TRIAL","RT_GANON_SPIRIT_TRIAL_HOOKSHOT","RT_GC_GROTTO","RT_GC_LEFTMOST","RT_GC_LINK_GORON_DINS","RT_GC_POT","RT_GC_POT_STRENGTH","RT_GC_ROLLING_STRENGTH","RT_GF_ADULT_SKIP_WASTELAND_GATE","RT_GF_LEDGE_CLIP_INTO_GTG","RT_GF_WASTELAND_GATE_SIDEHOP_SKIP","RT_GROUND_JUMP_HARD","RT_GTG_FAKE_WALL","RT_GTG_LAVA_JUMP","RT_GTG_MQ_WITHOUT_HOOKSHOT","RT_GTG_MQ_WITH_HOOKSHOT","RT_GTG_WITHOUT_HOOKSHOT","RT_GV_CHILD_CUCCO_JUMP","RT_GV_CHILD_TENT","RT_GV_CRATE_HOVERS","RT_GV_HOOKSHOT_BRIDGE","RT_GY_CHILD_DAMPE_RACE_POH","RT_GY_POH","RT_GY_SHADOW_FIRE_ARROWS","RT_HC_STORMS_GS","RT_HF_BIG_POE_WITHOUT_EPONA","RT_HOOKSHOT_CLIP","RT_HOOKSHOT_LADDERS","RT_HOVER_BOOST_SIMPLE","RT_HW_CROSSING","RT_HW_REVERSE","RT_ICE_BLOCK_GS","RT_ICE_MQ_RED_ICE_GS","RT_ICE_STALAGMITE_CLIP","RT_ITEM_EXTENSION","RT_JABU_B1_CUBE_HOVER","RT_JABU_BOSS_HOVER","RT_JABU_MQ_RANG_JUMP","RT_JABU_MQ_SOT_GS","RT_JABU_NEAR_BOSS_EXPLOSIVES","RT_JABU_NEAR_BOSS_RANGED","RT_KAK_CHILD_WINDMILL_POH","RT_KAK_ROOFTOP_GS","RT_KAK_TOWER_GS","RT_KF_ADULT_GS","RT_LENS_BOTW","RT_LENS_GANON","RT_LENS_GANON_MQ","RT_LENS_GTG","RT_LENS_GTG_MQ","RT_LENS_HW","RT_LENS_JABU_MQ","RT_LENS_SHADOW","RT_LENS_SHADOW_MQ","RT_LENS_SHADOW_MQ_DEADHAND","RT_LENS_SHADOW_MQ_INVISIBLE_BLADES","RT_LENS_SHADOW_MQ_PLATFORM","RT_LENS_SHADOW_PLATFORM","RT_LENS_SPIRIT","RT_LENS_SPIRIT_MQ","RT_LH_LAB_DIVING","RT_LH_LAB_WALL_GS","RT_LH_WATER_HOOKSHOT","RT_LOST_WOOD_NAVI_DIVE","RT_LW_BRIDGE","RT_LW_GS_BEAN","RT_LW_MIDO_BACKFLIP","RT_SHADOW_FREESTANDING_KEY","RT_SHADOW_MQ_GAP","RT_SHADOW_MQ_HUGE_PIT","RT_SHADOW_MQ_INVISIBLE_BLADES","RT_SHADOW_MQ_WINDY_WALKWAY","RT_SHADOW_STATUE","RT_SHADOW_UMBRELLA_CLIP","RT_SHADOW_UMBRELLA_GS","RT_SHADOW_UMBRELLA_HOVER","RT_SLIDE_JUMP","RT_SPIRIT_CHILD_CHU","RT_SPIRIT_LOWER_ADULT_SWITCH","RT_SPIRIT_MAP_CHEST","RT_SPIRIT_MQ_FROZEN_EYE","RT_SPIRIT_MQ_LOWER_ADULT","RT_SPIRIT_MQ_SUN_BLOCK_GS","RT_SPIRIT_PLATFORM_HOOKSHOT","RT_SPIRIT_STATUE_JUMP","RT_SPIRIT_SUN_CHEST","RT_SPIRIT_WALL","RT_SPIRIT_WEST_LEDGE","RT_UNINTUITIVE_JUMPS","RT_VISIBLE_COLLISION","RT_WATER_ADULT_DRAGON","RT_WATER_BK_REGION","RT_WATER_CENTRAL_BOW","RT_WATER_CHILD_DRAGON","RT_WATER_CRACKED_WALL","RT_WATER_CRACKED_WALL_HOVERS","RT_WATER_DRAGON_JUMP_DIVE","RT_WATER_FW_CENTRAL_GS","RT_WATER_HOOKSHOT_FALLING_PLATFORM_GS","RT_WATER_INVISIBLE_HOOKSHOT_TARGET","RT_WATER_IRONS_CENTRAL_GS","RT_WATER_IRON_BOOTS_LEDGE_GRAB","RT_WATER_LONGSHOT_TORCH","RT_WATER_MQ_CENTRAL_PILLAR","RT_WATER_NORTH_BASEMENT_LEDGE_JUMP","RT_WATER_RANG_FALLING_PLATFORM_GS","RT_WATER_RIVER_GS","RT_ZD_GS","RT_ZD_KING_ZORA_SKIP","RT_ZF_GREAT_FAIRY_WITHOUT_EXPLOSIVES","RT_ZR_CUCCO","RT_ZR_HOVERS","RT_ZR_LOWER","RT_ZR_UPPER"],
  grottoEvents:[["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy() || L.CanUse("RG_STICKS"))], ["LOGIC_BUG_ACCESS", () => (L.CanCutShrubs())], ["LOGIC_FISH_ACCESS", () => true]],
  spirit:{
    RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_1F:[5, 0, 3, 0, () => true, () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F:[5, 0, 3, 0, () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")), () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_2F_MIRROR_ROOM:[5, 0, 3, 0, () => false, () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")), () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_INNER_WEST_HAND:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_GS_LEDGE:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && L.SpiritWestToSkull() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.SpiritExplosiveKeyLogic() && L.SpiritWestToSkull() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.SpiritWestToSkull() && ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_HOVER_BOOTS")))],
    RR_SPIRIT_TEMPLE_STATUE_ROOM:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic()), () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => true],
    RR_SPIRIT_TEMPLE_SUN_BLOCK_CHEST_LEDGE:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => ((((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_HOVER_BOOTS")) && L.HasItem("RG_POWER_BRACELET")) || (L.CanKillEnemy("RE_BEAMOS") && L.CanUse("RG_LONGSHOT")))],
    RR_SPIRIT_TEMPLE_SKULLTULA_STAIRS:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.SpiritExplosiveKeyLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => ((((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_HOVER_BOOTS")) && L.HasItem("RG_POWER_BRACELET")) || (L.CanKillEnemy("RE_BEAMOS") && L.CanUse("RG_LONGSHOT")))],
    RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND:[5, 5, 3, 3, () => (L.OuterWestHandLogic()), () => (L.OuterWestHandLogic()), () => (L.OuterWestHandLogic())],
    RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && L.CanUse("RG_HOOKSHOT") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_INNER_LEFT_HAND:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && L.CanUse("RG_HOOKSHOT") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_SHORTCUT_SWITCH:[5, 0, 3, 0, () => (L.SpiritExplosiveKeyLogic() && L.CanUse("RG_HOOKSHOT") && L.SpiritEastToSwitch()), () => (L.SpiritEastToSwitch() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.SpiritEastToSwitch() && (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")))],
    RR_SPIRIT_TEMPLE_MQ_UNDER_LIKE_LIKE:[7, 6, 7, 7, () => (L.StatueRoomMQKeyLogic()), () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 6) && L.CanHitSwitch() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))), () => (L.StatueRoomMQKeyLogic() && L.CanHitSwitch() && ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_HOVER_BOOTS")))],
    RR_SPIRIT_TEMPLE_MQ_SUN_ON_FLOOR:[7, 6, 7, 7, () => (L.StatueRoomMQKeyLogic() && L.CanHitSwitch() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 6) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))), () => (L.StatueRoomMQKeyLogic() && ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_HOVER_BOOTS")))],
    RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD:[7, 0, 0, 0, () => (L.CanHitSwitch() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")), () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
    RR_SPIRIT_TEMPLE_MQ_POT_LEDGE:[7, 0, 0, 0, () => (L.CanHitSwitch() && L.MQSpiritWestToPots() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.MQSpiritWestToPots() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))), () => (L.CanUse("RG_HOVER_BOOTS") || ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.MQSpiritWestToPots()))],
    RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND:[7, 0, 0, 0, () => (L.CanHitSwitch() && L.MQSpiritWestToPots() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.MQSpiritWestToPots() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))), () => (L.CanUse("RG_HOVER_BOOTS") || ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.MQSpiritWestToPots()))],
    RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM:[7, 0, 0, 0, () => (L.CanHitSwitch() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => true, () => true],
    RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM:[7, 0, 0, 0, () => (L.CanHitSwitch() && L.MQSpiritStatueToSunBlock() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))), () => (L.MQSpiritStatueToSunBlock() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))), () => (L.MQSpiritStatueToSunBlock() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")))],
    RR_SPIRIT_TEMPLE_MQ_OUTER_RIGHT_HAND:[7, 7, 4, 4, () => (L.CanHitSwitch() && L.OuterWestHandMQLogic() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_POWER_BRACELET")), () => (L.OuterWestHandMQLogic()), () => (L.OuterWestHandMQLogic())],
    RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_DOOR:[7, 0, 0, 0, () => (L.CanHitSwitch() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.region("RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_DOOR").AnyAgeTime((() => (L.MQSpiritStatueSouthDoor())))), () => true, () => (L.region("RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_DOOR").AnyAgeTime((() => (L.MQSpiritStatueSouthDoor()))))],
  },
  regions:{
    RR_BOTW_ENTRYWAY:{ name:"Bottom of the Well Entryway", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_CORRIDOR", () => (!L.mq("BOTTOM_OF_THE_WELL") && L.CanUse("RG_CRAWL"))],
      ["RR_BOTW_MQ_PERIMETER", () => (L.mq("BOTTOM_OF_THE_WELL") && L.CanUse("RG_CRAWL"))],
      ["RR_KAK_WELL", () => true]
    ] },
    RR_BOTW_CORRIDOR:{ name:"Bottom of the Well Corridor", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_ENTRYWAY", () => (L.CanUse("RG_CRAWL") && L.CanClimbLadder())],
      ["RR_BOTW_PERIMETER", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_BOTW_PERIMETER:{ name:"Bottom of the Well Perimeter", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_BOTW_LOWERED_WATER", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_FRONT_LEFT_FAKE_WALL_CHEST", () => ((L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_RIGHT_BOTTOM_FAKE_WALL_CHEST", () => ((L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_FRONT_CENTER_BOMBABLE_CHEST", () => (L.HasExplosives() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_BACK_LEFT_BOMBABLE_CHEST", () => (L.HasExplosives() && (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_UNDERWATER_FRONT_CHEST", () => ((L.Get("LOGIC_BOTW_LOWERED_WATER") && L.HasItem("RG_OPEN_CHEST")) || L.CanOpenUnderwaterChest())],
      ["RC_BOTTOM_OF_THE_WELL_UNDERWATER_LEFT_CHEST", () => ((L.Get("LOGIC_BOTW_LOWERED_WATER") && L.HasItem("RG_OPEN_CHEST")) || L.CanOpenUnderwaterChest())],
      ["RC_BOTTOM_OF_THE_WELL_NEAR_ENTRANCE_POT_1", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_NEAR_ENTRANCE_POT_2", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_UNDERWATER_POT", () => ((L.CanBreakPots() && L.Get("LOGIC_BOTW_LOWERED_WATER")) || L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_BOTW_CORRIDOR", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_BOTW_MIDDLE", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_BOTW_PIT_CAGE", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_BOTW_HIDDEN_POTS", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_BOTW_CORNER_CRAWLSPACE", () => (L.CanUse("RG_CRAWL"))],
      ["RR_BOTW_BEHIND_MOAT", () => (((L.Get("LOGIC_BOTW_LOWERED_WATER") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))) || L.HasItem("RG_BRONZE_SCALE") || (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT"))))],
      ["RR_BOTW_NEAR_BOSS_LOWER", () => (L.Get("LOGIC_BOTW_LOWERED_WATER") && L.CanUse("RG_CRAWL"))],
      ["RR_BOTW_B3_OOZE", () => true],
      ["RR_BOTW_B3_BLOCKED_GRASS", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_BOTW_MIDDLE:{ name:"Bottom of the Well Middle", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_CENTER_SKULLTULA_CHEST", () => ((L.CanPassEnemy("RE_BIG_SKULLTULA") || L.TakeDamage()) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_BOTW_PERIMETER", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_BOTW_PIT_CAGE", () => (L.trick("RT_BOTW_PITS") && (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")))],
      ["RR_BOTW_SKULL_WALL_ROOM", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 3))],
      ["RR_BOTW_INVISIBLE_PATH", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 3))],
      ["RR_BOTW_B3_OOZE", () => true],
      ["RR_BOTW_B3_PLATFORM", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_BOTW_HIDDEN_POTS:{ name:"Bottom of the Well Hidden Pots", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_LEFT_SIDE_POT_1", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_LEFT_SIDE_POT_2", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_LEFT_SIDE_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_BOTW_PERIMETER", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_BOTW_CORNER_CRAWLSPACE:{ name:"Bottom of the Well Corner Crawlspace", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_PERIMETER", () => (L.CanUse("RG_CRAWL"))],
      ["RR_BOTW_HIDDEN_PITS_ROOM", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 3))]
    ] },
    RR_BOTW_HIDDEN_PITS_ROOM:{ name:"Bottom of the Well Hidden Pits Room", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_FIRE_KEESE_CHEST", () => ((L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_FIRE_KEESE_POT_1", () => (L.CanBreakPots() && (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ],
      exits:[
      ["RR_BOTW_CORNER_CRAWLSPACE", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 3) && (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")))],
      ["RR_BOTW_LOCKED_CAGE", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_BOTW_B3_BOMB_FLOWERS", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_BOTW_LOCKED_CAGE:{ name:"Bottom of the Well Locked Cage", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_LIKE_LIKE_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_GS_LIKE_LIKE_CAGE", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_BOTW_HIDDEN_PITS_ROOM", () => true]
    ] },
    RR_BOTW_PIT_CAGE:{ name:"Bottom of the Well Pit Cage", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_COMPASS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_BOTW_PERIMETER", () => (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_BOTW_MIDDLE", () => (L.trick("RT_BOTW_PITS") && (L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")))],
      ["RR_BOTW_B3_OOZE", () => true]
    ] },
    RR_BOTW_SKULL_WALL_ROOM:{ name:"Bottom of the Well SKull Wall Room", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_GS_WEST_INNER_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_BOTW_MIDDLE", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 3))]
    ] },
    RR_BOTW_INVISIBLE_PATH:{ name:"Bottom of the Well Invisible Path", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_GS_EAST_INNER_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_BOTW_MIDDLE", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 3))],
      ["RR_BOTW_B3_OOZE", () => true]
    ] },
    RR_BOTW_BEHIND_MOAT:{ name:"Bottom of the Well Behind Moat", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_UNDERWATER_LEFT_CHEST", () => ((L.Get("LOGIC_BOTW_LOWERED_WATER") && L.HasItem("RG_OPEN_CHEST")) || L.CanOpenUnderwaterChest())]
    ],
      exits:[
      ["RR_BOTW_PERIMETER", () => ((L.Get("LOGIC_BOTW_LOWERED_WATER") || L.HasItem("RG_BRONZE_SCALE") || (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT"))) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_BOTW_CRYPT", () => true]
    ] },
    RR_BOTW_CRYPT:{ name:"Bottom of the Well Crypt", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_FREESTANDING_KEY", () => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))],
      ["RC_BOTTOM_OF_THE_WELL_COFFIN_ROOM_FRONT_LEFT_HEART", () => true],
      ["RC_BOTTOM_OF_THE_WELL_COFFIN_ROOM_MIDDLE_RIGHT_HEART", () => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))]
    ],
      exits:[
      ["RR_BOTW_BEHIND_MOAT", () => true]
    ] },
    RR_BOTW_NEAR_BOSS_LOWER:{ name:"Bottom of the Well Near Boss Lower", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_PERIMETER", () => (L.CanUse("RG_CRAWL") && (L.Get("LOGIC_BOTW_LOWERED_WATER") || L.HasItem("RG_BRONZE_SCALE")) && L.HasItem("RG_CLIMB"))],
      ["RR_BOTW_NEAR_BOSS_UPPER", () => (L.HasItem("RG_CLIMB") || (L.IsAdult && L.CanGroundJump()))]
    ] },
    RR_BOTW_NEAR_BOSS_UPPER:{ name:"Bottom of the Well Near Boss Upper", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_NEAR_BOSS_LOWER", () => true],
      ["RR_BOTW_DEAD_HAND_ROOM", () => true]
    ] },
    RR_BOTW_DEAD_HAND_ROOM:{ name:"Bottom of the Well Dead Hand Room", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_LENS_OF_TRUTH_CHEST", () => (L.CanKillEnemy("RE_DEAD_HAND") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_BOTW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_BOTW_NEAR_BOSS_UPPER", () => (L.CanKillEnemy("RE_DEAD_HAND"))]
    ] },
    RR_BOTW_B3_OOZE:{ name:"Bottom of the Well B3 Ooze", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_1", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_2", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_3", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_4", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_5", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_6", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_7", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_8", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_9", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_10", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_11", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_POT_12", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_BOTW_HIDDEN_POTS", () => (L.CanClimbHighLadder())],
      ["RR_BOTW_B3_BOMB_FLOWERS", () => (L.AnyAgeTime((() => (L.BlastOrSmash() || L.CanUse("RG_DINS_FIRE") || (L.trick("RT_BOTW_BASEMENT") && L.CanUse("RG_STICKS")) || (L.trick("RT_DISTANT_BOULDER_COLLISION") && L.CanUse("RG_FAIRY_BOW"))))))],
      ["RR_BOTW_B3_BLOCKED_GRASS", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))],
      ["RR_BOTW_B3_CHEST_AREA", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_BOTW_B3_BOMB_FLOWERS:{ name:"Bottom of the Well B3 Bomb Flowers", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_B3_OOZE", () => (L.CanDetonateUprightBombFlower())],
      ["RR_BOTW_B3_BLOCKED_GRASS", () => (L.HasItem("RG_GORONS_BRACELET"))],
      ["RR_BOTW_B3_CHEST_AREA", () => (L.HasItem("RG_GORONS_BRACELET"))]
    ] },
    RR_BOTW_B3_BLOCKED_GRASS:{ name:"Bottom of the Well B3 Blocked Grass", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_BEHIND_ROCKS_GRASS_9", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_BOTW_B3_OOZE", () => (L.AnyAgeTime((() => (L.BlastOrSmash() || L.HasItem("RG_GORONS_BRACELET")))))]
    ] },
    RR_BOTW_B3_CHEST_AREA:{ name:"Bottom of the Well B3 Chest Area", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MAP_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_BOTW_B3_OOZE", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_BOTW_B3_PLATFORM:{ name:"Bottom of the Well B3 Platform", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_PLATFORM_LEFT_RUPEE", () => true],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_PLATFORM_BACK_LEFT_RUPEE", () => true],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_PLATFORM_MIDDLE_RUPEE", () => true],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_PLATFORM_BACK_RIGHT_RUPEE", () => true],
      ["RC_BOTTOM_OF_THE_WELL_BASEMENT_PLATFORM_RIGHT_RUPEE", () => true]
    ],
      exits:[
      ["RR_BOTW_B3_OOZE", () => true]
    ] },
    RR_BOTW_MQ_PERIMETER:{ name:"Bottom of the Well MQ Perimeter", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => ((L.IsChild && L.CanUse("RG_FAIRY_SLINGSHOT")) || (L.AnyAgeTime((() => (L.BlastOrSmash()))) && L.CanHitEyeTargets()) || (L.trick("RT_ITEM_EXTENSION") && ((L.opt("RSK_SHUFFLE_POTS") === 0) || (L.opt("RSK_SHUFFLE_POTS") === 2)) && L.CanHitEyeTargets()) || (L.trick("RT_VISIBLE_COLLISION") && L.IsChild ? L.CanHitEyeTargets() : L.CanUse("RG_FAIRY_SLINGSHOT")))],
      ["LOGIC_BOTW_LOWERED_WATER", () => (L.CanHitSwitch("ED_SHORT_JUMPSLASH"))],
      ["LOGIC_BOTW_MQ_OPENED_GATES", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_OUTER_LOBBY_POT", () => ((L.AnyAgeTime((() => (L.BlastOrSmash()))) && L.CanHitEyeTargets()) || (L.trick("RT_VISIBLE_COLLISION") && L.IsChild ? L.CanHitEyeTargets() : L.CanUse("RG_FAIRY_SLINGSHOT")))],
      ["RC_BOTTOM_OF_THE_WELL_MQ_BOMB_LEFT_HEART", () => (L.HasExplosives())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_BOMB_RIGHT_HEART", () => (L.HasExplosives())]
    ],
      exits:[
      ["RR_BOTW_ENTRYWAY", () => (L.CanUse("RG_CRAWL") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_BOTW_MQ_MIDDLE", () => (L.Get("LOGIC_BOTW_MQ_OPENED_GATES"))],
      ["RR_BOTW_MQ_PIT_CAGE", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))) && L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_BOTW_MQ_BEHIND_MOAT", () => ((L.Get("LOGIC_BOTW_LOWERED_WATER") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))) || L.HasItem("RG_BRONZE_SCALE") || (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT")))],
      ["RR_BOTW_MQ_CORNER_CRAWLSPACE", () => (L.CanUse("RG_CRAWL"))],
      ["RR_BOTW_MQ_NEAR_BOSS_LOWER", () => (L.CanUse("RG_CRAWL") && L.Get("LOGIC_BOTW_LOWERED_WATER"))],
      ["RR_BOTW_MQ_B3", () => true]
    ] },
    RR_BOTW_MQ_MIDDLE:{ name:"Bottom of the Well MQ Middle", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_MAP_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_MQ_INNER_LOBBY_POT_1", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_INNER_LOBBY_POT_2", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_INNER_LOBBY_POT_3", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_CELL_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_BOTW_MQ_PERIMETER", () => (L.Get("LOGIC_BOTW_MQ_OPENED_GATES"))],
      ["RR_BOTW_MQ_PIT_CAGE", () => (L.trick("RT_BOTW_PITS"))],
      ["RR_BOTW_MQ_B3_PLATFORM", () => (L.Get("LOGIC_BOTW_MQ_OPENED_MIDDLE_HOLE"))],
      ["RR_BOTW_MQ_B3", () => true],
      ["RR_BOTW_MQ_INVISIBLE_PATH", () => (L.AnyAgeTime((() => (L.HasItem("RG_POWER_BRACELET") || L.CanHitSwitch("ED_BOMB_THROW")))))],
      ["RR_BOTW_MQ_GRAVE_ROOM", () => (L.Get("LOGIC_BOTW_MQ_OPENED_WEST_ROOM"))]
    ] },
    RR_BOTW_MQ_INVISIBLE_PATH:{ name:"Bottom of the Well Invisible Path", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_EAST_INNER_ROOM_FREESTANDING_KEY", () => true],
      ["RC_BOTTOM_OF_THE_WELL_MQ_EAST_INNER_ROOM_POT_1", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_EAST_INNER_ROOM_POT_2", () => (L.CanBreakPots())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_EAST_INNER_ROOM_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_BOTW_MQ_MIDDLE", () => true],
      ["RR_BOTW_MQ_B3", () => true]
    ] },
    RR_BOTW_MQ_GRAVE_ROOM:{ name:"Bottom of the Well Grave Room", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_GS_WEST_INNER_ROOM", () => ((L.TakeDamage() || L.CanUse("RG_NUTS")) && (L.HasItem("RG_POWER_BRACELET") || L.trick("RT_VISIBLE_COLLISION")) && L.CanKillEnemy("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_BOTW_MQ_MIDDLE", () => true]
    ] },
    RR_BOTW_MQ_PIT_CAGE:{ name:"Bottom of the Well MQ Pit Cage", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[
      ["LOGIC_BOTW_MQ_OPENED_WEST_ROOM", () => true]
    ],
      checks:[],
      exits:[
      ["RR_BOTW_MQ_PERIMETER", () => (L.BlastOrSmash() && (L.CanPassEnemy("RE_BIG_SKULLTULA") || L.trick("RT_BOTW_PITS")))],
      ["RR_BOTW_MQ_MIDDLE", () => (L.trick("RT_BOTW_PITS"))],
      ["RR_BOTW_MQ_B3", () => true]
    ] },
    RR_BOTW_MQ_BEHIND_MOAT:{ name:"Bottom of the Well MQ Behind Moat", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_MQ_PERIMETER", () => (((L.Get("LOGIC_BOTW_LOWERED_WATER") || L.HasItem("RG_BRONZE_SCALE")) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))) || (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT")))],
      ["RR_BOTW_MQ_CRYPT", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 2))]
    ] },
    RR_BOTW_MQ_CRYPT:{ name:"Bottom of the Well MQ Crypt", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_GS_COFFIN_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))],
      ["RC_BOTTOM_OF_THE_WELL_MQ_COFFIN_ROOM_FRONT_RIGHT_HEART", () => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))],
      ["RC_BOTTOM_OF_THE_WELL_MQ_COFFIN_ROOM_MIDDLE_LEFT_HEART", () => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))]
    ],
      exits:[
      ["RR_BOTW_MQ_BEHIND_MOAT", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 2))]
    ] },
    RR_BOTW_MQ_CORNER_CRAWLSPACE:{ name:"Bottom of the Well MQ Northeast Crawlspace", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_MQ_PERIMETER", () => (L.CanUse("RG_CRAWL"))],
      ["RR_BOTW_MQ_FLOORMASTER_ROOM", () => (L.CanUseProjectile())]
    ] },
    RR_BOTW_MQ_FLOORMASTER_ROOM:{ name:"Bottom of the Well MQ Floormaster Room", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_MQ_CORNER_CRAWLSPACE", () => true],
      ["RR_BOTW_MQ_LOCKED_CAGE", () => (L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 2))]
    ] },
    RR_BOTW_MQ_LOCKED_CAGE:{ name:"Bottom of the Well MQ Locked Cage", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[
      ["LOGIC_BOTW_MQ_OPENED_MIDDLE_HOLE", () => (L.HasExplosives())]
    ],
      checks:[],
      exits:[
      ["RR_BOTW_MQ_FLOORMASTER_ROOM", () => (L.CanUse("RG_CRAWL") && L.SmallKeys("SCENE_BOTTOM_OF_THE_WELL", 2))]
    ] },
    RR_BOTW_MQ_NEAR_BOSS_LOWER:{ name:"Bottom of the Well MQ Near Boss Lower", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_MQ_PERIMETER", () => (L.CanUse("RG_CRAWL") && (L.Get("LOGIC_BOTW_LOWERED_WATER") || L.HasItem("RG_BRONZE_SCALE")) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_BOTW_MQ_NEAR_BOSS_UPPER", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_BOTW_MQ_NEAR_BOSS_UPPER:{ name:"Bottom of the Well MQ Near Boss Upper", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_BOTW_MQ_NEAR_BOSS_LOWER", () => true],
      ["RR_BOTW_MQ_DEAD_HAND_ROOM", () => true]
    ] },
    RR_BOTW_MQ_DEAD_HAND_ROOM:{ name:"Bottom of the Well MQ Dead Hand Room", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_COMPASS_CHEST", () => (L.CanKillEnemy("RE_DEAD_HAND") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_BOTTOM_OF_THE_WELL_MQ_DEAD_HAND_FREESTANDING_KEY", () => (L.HasExplosives() || (L.trick("RT_BOTW_MQ_DEADHAND_KEY") && L.CanUse("RG_BOOMERANG")))],
      ["RC_BOTTOM_OF_THE_WELL_MQ_DEAD_HAND_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_DEAD_HAND_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_DEAD_HAND_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_BOTTOM_OF_THE_WELL_MQ_DEAD_HAND_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_BOTW_MQ_NEAR_BOSS_UPPER", () => (L.CanKillEnemy("RE_DEAD_HAND"))]
    ] },
    RR_BOTW_MQ_B3:{ name:"Bottom of the Well MQ B3", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_GS_BASEMENT", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))],
      ["RC_BOTTOM_OF_THE_WELL_MQ_BASEMENT_HALLWAY_FRONT_HEART", () => true],
      ["RC_BOTTOM_OF_THE_WELL_MQ_BASEMENT_HALLWAY_LEFT_HEART", () => true],
      ["RC_BOTTOM_OF_THE_WELL_MQ_BASEMENT_HALLWAY_RIGHT_HEART", () => true],
      ["RC_BOTTOM_OF_THE_WELL_MQ_BASEMENT_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_BOTW_MQ_PERIMETER", () => (L.CanClimbHighLadder())]
    ] },
    RR_BOTW_MQ_B3_PLATFORM:{ name:"Bottom of the Well MQ B3 Platform", scene:"SCENE_BOTTOM_OF_THE_WELL", time:false,
      events:[],
      checks:[
      ["RC_BOTTOM_OF_THE_WELL_MQ_LENS_OF_TRUTH_CHEST", () => (L.CanPassEnemy("RE_REDEAD") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_BOTW_MQ_B3", () => true]
    ] },
    RR_DEKU_TREE_ENTRYWAY:{ name:"Deku Tree Entryway", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DEKU_TREE_LOBBY", () => (!L.mq("DEKU_TREE"))],
      ["RR_DEKU_TREE_MQ_1F", () => (L.mq("DEKU_TREE"))],
      ["RR_KF_OUTSIDE_DEKU_TREE", () => true]
    ] },
    RR_DEKU_TREE_LOBBY:{ name:"Deku Tree Lobby", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_DEKU_TREE_1F_BROKE_WEB", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_DEKU_TREE_LOBBY_LOWER_HEART", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_LOBBY_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_LOBBY_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_LOBBY_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_ENTRYWAY", () => true],
      ["RR_DEKU_TREE_LOBBY_2F", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_DEKU_TREE_BASEMENT_LOWER", () => (L.Get("LOGIC_DEKU_TREE_1F_BROKE_WEB"))],
      ["RR_DEKU_TREE_OUTSIDE_BOSS_ROOM", () => false],
      ["RR_DEKU_TREE_BOSS_ENTRYWAY", () => false]
    ] },
    RR_DEKU_TREE_LOBBY_2F:{ name:"Deku Tree Lobby 2F", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_MAP_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_LOBBY_LOWER_HEART", () => true],
      ["RC_DEKU_TREE_2F_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_2F_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_LOBBY", () => true],
      ["RR_DEKU_TREE_LOBBY_3F", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))],
      ["RR_DEKU_TREE_2F_MIDDLE_ROOM", () => true]
    ] },
    RR_DEKU_TREE_LOBBY_3F:{ name:"Deku Tree Lobby 3F", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_DEKU_TREE_1F_BROKE_WEB", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ],
      checks:[
      ["RC_DEKU_TREE_LOBBY_UPPER_HEART", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ],
      exits:[
      ["RR_DEKU_TREE_LOBBY_2F", () => true],
      ["RR_DEKU_TREE_COMPASS_ROOM", () => true]
    ] },
    RR_DEKU_TREE_2F_MIDDLE_ROOM:{ name:"Deku Tree 2F Middle Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DEKU_TREE_LOBBY", () => (L.AnyAgeTime((() => (L.CanReflectNuts() || L.CanUse("RG_MEGATON_HAMMER")))))],
      ["RR_DEKU_TREE_SLINGSHOT_ROOM", () => (L.AnyAgeTime((() => (L.CanReflectNuts() || L.CanUse("RG_MEGATON_HAMMER")))))]
    ] },
    RR_DEKU_TREE_SLINGSHOT_ROOM:{ name:"Deku Tree Slingshot Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_SLINGSHOT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_SLINGSHOT_ROOM_SIDE_CHEST", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_SLINGSHOT_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_SLINGSHOT_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_SLINGSHOT_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_SLINGSHOT_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_2F_MIDDLE_ROOM", () => true]
    ] },
    RR_DEKU_TREE_COMPASS_ROOM:{ name:"Deku Tree Compass Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_DEKU_TREE_COMPASS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_COMPASS_ROOM_SIDE_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_GS_COMPASS_ROOM", () => (L.CanAttack())],
      ["RC_DEKU_TREE_COMPASS_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_COMPASS_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_LOBBY", () => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))],
      ["RR_DEKU_TREE_BOSS_ENTRYWAY", () => false]
    ] },
    RR_DEKU_TREE_BASEMENT_LOWER:{ name:"Deku Tree Basement Lower", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_DEKU_TREE_B1_BROKE_WEB", () => ((L.CanUse("RG_STICKS") && (L.Get("LOGIC_DEKU_TREE_PUSHED_BASEMENT_BLOCK") || L.IsAdult || L.CanUse("RG_HOVER_BOOTS"))) || (L.trick("RT_DEKU_B1_BOW_WEBS") && L.IsAdult && L.CanUse("RG_FAIRY_BOW")))]
    ],
      checks:[
      ["RC_DEKU_TREE_BASEMENT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_GS_BASEMENT_GATE", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH"))],
      ["RC_DEKU_TREE_GS_BASEMENT_VINES", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA", L.trick("RT_DEKU_MQ_COMPASS_GS") ? "ED_SHORT_JUMPSLASH" : "ED_BOMB_THROW") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_BOOMERANG")))],
      ["RC_DEKU_TREE_BASEMENT_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_BASEMENT_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_LOBBY", () => (L.HasItem("RG_CLIMB") || (L.IsAdult && L.CanUse("RG_LONGSHOT")))],
      ["RR_DEKU_TREE_BASEMENT_SCRUB_ROOM", () => (L.AnyAgeTime((() => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))))],
      ["RR_DEKU_TREE_BASEMENT_UPPER", () => (L.IsAdult || L.trick("RT_DEKU_B1_SKIP") || L.CanGroundJump() || L.Get("LOGIC_DEKU_TREE_PUSHED_BASEMENT_BLOCK"))],
      ["RR_DEKU_TREE_OUTSIDE_BOSS_ROOM", () => false]
    ] },
    RR_DEKU_TREE_BASEMENT_SCRUB_ROOM:{ name:"Deku Tree Basement Scrub Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_BASEMENT_SCRUB_ROOM_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_BASEMENT_SCRUB_ROOM_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_BASEMENT_SCRUB_ROOM_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_BASEMENT_SCRUB_ROOM_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_LOWER", () => true],
      ["RR_DEKU_TREE_BASEMENT_WATER_ROOM_FRONT", () => (L.AnyAgeTime((() => (L.CanHitEyeTargets()))))]
    ] },
    RR_DEKU_TREE_BASEMENT_WATER_ROOM_FRONT:{ name:"Deku Tree Basement Water Room Front", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_SCRUB_ROOM", () => true],
      ["RR_DEKU_TREE_BASEMENT_WATER_ROOM_BACK", () => (L.HasItem("RG_BRONZE_SCALE") || L.trick("RT_DEKU_B1_BACKFLIP_OVER_SPIKED_LOG"))]
    ] },
    RR_DEKU_TREE_BASEMENT_WATER_ROOM_BACK:{ name:"Deku Tree Basement Water Room Back", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_BASEMENT_SPIKE_ROLLER_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_BASEMENT_SPIKE_ROLLER_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_WATER_ROOM_FRONT", () => (L.HasItem("RG_BRONZE_SCALE") || L.trick("RT_DEKU_B1_BACKFLIP_OVER_SPIKED_LOG"))],
      ["RR_DEKU_TREE_BASEMENT_TORCH_ROOM", () => true]
    ] },
    RR_DEKU_TREE_BASEMENT_TORCH_ROOM:{ name:"Deku Tree Basement Torch Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_DEKU_TREE_BASEMENT_TORCHES_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_BASEMENT_TORCHES_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_WATER_ROOM_BACK", () => (L.AnyAgeTime((() => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))))],
      ["RR_DEKU_TREE_BASEMENT_BACK_LOBBY", () => (L.AnyAgeTime((() => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))))]
    ] },
    RR_DEKU_TREE_BASEMENT_BACK_LOBBY:{ name:"Deku Tree Basement Back Lobby", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_DEKU_TREE_BASEMENT_LARVAE_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_BASEMENT_LARVAE_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_TORCH_ROOM", () => true],
      ["RR_DEKU_TREE_BASEMENT_BACK_ROOM", () => (L.AnyAgeTime((() => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))) && L.AnyAgeTime((() => (L.BlastOrSmash()))))],
      ["RR_DEKU_TREE_BASEMENT_UPPER", () => (L.AnyAgeTime((() => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))) && L.CanUse("RG_CRAWL"))]
    ] },
    RR_DEKU_TREE_BASEMENT_BACK_ROOM:{ name:"Deku Tree Basement Back Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_GS_BASEMENT_BACK_ROOM", () => (L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_BACK_LOBBY", () => true]
    ] },
    RR_DEKU_TREE_BASEMENT_UPPER:{ name:"Deku Tree Basement Upper", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_DEKU_TREE_PUSHED_BASEMENT_BLOCK", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["LOGIC_DEKU_TREE_B1_BROKE_WEB", () => (L.HasFireSource())]
    ],
      checks:[],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_LOWER", () => true],
      ["RR_DEKU_TREE_BASEMENT_BACK_LOBBY", () => (L.CanUse("RG_CRAWL"))],
      ["RR_DEKU_TREE_OUTSIDE_BOSS_ROOM", () => (L.Get("LOGIC_DEKU_TREE_B1_BROKE_WEB") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS")))]
    ] },
    RR_DEKU_TREE_OUTSIDE_BOSS_ROOM:{ name:"Deku Tree Outside Boss Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_BEFORE_BOSS_LEFT_HEART", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_BEFORE_BOSS_MIDDLE_HEART", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_BEFORE_BOSS_RIGHT_HEART", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_BEFORE_BOSS_GRASS_1", () => (L.CanCutShrubs() && L.HasFireSourceWithTorch())],
      ["RC_DEKU_TREE_BEFORE_BOSS_GRASS_2", () => (L.CanCutShrubs() && L.HasFireSourceWithTorch())],
      ["RC_DEKU_TREE_BEFORE_BOSS_GRASS_3", () => (L.CanCutShrubs() && L.HasFireSourceWithTorch())]
    ],
      exits:[
      ["RR_DEKU_TREE_BASEMENT_UPPER", () => (L.HasItem("RG_CLIMB") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_DEKU_TREE_BOSS_ENTRYWAY", () => (L.AnyAgeTime((() => (L.CanReflectNuts()))))]
    ] },
    RR_DEKU_TREE_MQ_1F:{ name:"Deku Tree MQ 1F", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanKillEnemy("RE_WITHERED_DEKU_BABA"))],
      ["LOGIC_NUT_ACCESS", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_LOBBY_HEART", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_MQ_LOBBY_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_LOBBY_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_LOBBY_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_LOBBY_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_LOBBY_GRASS_5", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_ENTRYWAY", () => true],
      ["RR_DEKU_TREE_MQ_2F", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_DEKU_TREE_MQ_BASEMENT", () => (L.Get("LOGIC_DEKU_TREE_1F_BROKE_WEB"))]
    ] },
    RR_DEKU_TREE_MQ_2F:{ name:"Deku Tree MQ 2F", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_DEKU_TREE_MQ_2F_BURNED_WEB", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_MAP_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_MQ_GS_LOBBY", () => ((L.CanBreakCrates() || L.trick("RT_VISIBLE_COLLISION")) && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))],
      ["RC_DEKU_TREE_MQ_LOBBY_HEART", () => true],
      ["RC_DEKU_TREE_MQ_2F_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_2F_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_LOBBY_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_1F", () => true],
      ["RR_DEKU_TREE_MQ_3F", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))],
      ["RR_DEKU_TREE_MQ_EYE_TARGET_ROOM", () => (L.Get("LOGIC_DEKU_TREE_MQ_2F_BURNED_WEB"))]
    ] },
    RR_DEKU_TREE_MQ_3F:{ name:"Deku Tree MQ 3F", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_DEKU_TREE_1F_BROKE_WEB", () => true],
      ["LOGIC_DEKU_TREE_MQ_2F_BURNED_WEB", () => (L.CanUse("RG_STICKS") || L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[],
      exits:[
      ["RR_DEKU_TREE_MQ_2F", () => true],
      ["RR_DEKU_TREE_MQ_SLINGSHOT_ROOM", () => true],
      ["RR_DEKU_TREE_MQ_BASEMENT", () => true]
    ] },
    RR_DEKU_TREE_MQ_SLINGSHOT_ROOM:{ name:"Deku Tree MQ Slingshot Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_SLINGSHOT_CHEST", () => (L.CanKillEnemy("RE_DEKU_BABA") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_ROOM_BACK_CHEST", () => ((L.HasFireSourceWithTorch() || (L.IsAdult && L.CanUse("RG_FAIRY_BOW"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_ROOM_HEART", () => true],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_ROOM_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_DEKU_TREE_MQ_SLINGSHOT_ROOM_CRATE_2", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_3F", () => (L.CanKillEnemy("RE_DEKU_BABA"))]
    ] },
    RR_DEKU_TREE_MQ_EYE_TARGET_ROOM:{ name:"Deku Tree MQ Eye Target Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_MQ_DEKU_BABA_HEART", () => true],
      ["RC_DEKU_TREE_MQ_BEFORE_COMPASS_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_COMPASS_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_COMPASS_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_COMPASS_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_COMPASS_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_COMPASS_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_COMPASS_GRASS_7", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_COMPASS_ROOM", () => (L.AnyAgeTime((() => (L.CanHitEyeTargets()))))],
      ["RR_DEKU_TREE_MQ_2F", () => true]
    ] },
    RR_DEKU_TREE_MQ_COMPASS_ROOM:{ name:"Deku Tree MQ Compass Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_MQ_COMPASS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_MQ_COMPASS_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_COMPASS_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_COMPASS_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_COMPASS_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_EYE_TARGET_ROOM", () => true],
      ["RR_DEKU_TREE_MQ_PAST_BOULDER_VINES", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || (L.IsAdult && L.CanUse("RG_SONG_OF_TIME"))) && L.AnyAgeTime((() => (L.CanUse("RG_BOMBCHU_5") || (L.CanUse("RG_BOMB_BAG") && (L.CanUse("RG_SONG_OF_TIME") || L.IsAdult || L.CanUse("RG_HOVER_BOOTS"))) || (L.CanUse("RG_MEGATON_HAMMER") && ((L.IsAdult && L.CanUse("RG_SONG_OF_TIME")) || (L.trick("RT_DEKU_MQ_COMPASS_GS") && L.HasItem("RG_CLIMB"))))))))]
    ] },
    RR_DEKU_TREE_MQ_PAST_BOULDER_VINES:{ name:"Deku Tree MQ Past Boulder Vines", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_MQ_GS_PAST_BOULDER_VINES", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_DEKU_TREE_MQ_COMPASS_ROOM_HEART", () => true]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_COMPASS_ROOM", () => (L.BlastOrSmash())]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT:{ name:"Deku Tree MQ Basement", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_DEKU_TREE_B1_BROKE_WEB", () => (L.CanUse("RG_STICKS") && (L.Get("LOGIC_DEKU_TREE_PUSHED_BASEMENT_BLOCK") || L.IsAdult || L.CanUse("RG_HOVER_BOOTS")))]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_BASEMENT_CHEST", () => ((L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_MQ_BASEMENT_LOWER_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_LOWER_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_LOWER_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_LOWER_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_1F", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))],
      ["RR_DEKU_TREE_MQ_BASEMENT_SOUTHEAST_ROOM", () => (L.AnyAgeTime((() => (L.CanHitEyeTargets()))))],
      ["RR_DEKU_TREE_MQ_BASEMENT_WATER_ROOM_FRONT", () => (L.AnyAgeTime((() => (L.CanHitEyeTargets()))) && L.Get("LOGIC_DEKU_TREE_MQ_CLEARED_SE_ROOM") && L.AnyAgeTime((() => (L.CanUse("RG_STICKS")))))],
      ["RR_DEKU_TREE_MQ_BASEMENT_LEDGE", () => (L.IsAdult || L.trick("RT_DEKU_B1_SKIP") || L.CanGroundJump() || L.Get("LOGIC_DEKU_TREE_PUSHED_BASEMENT_BLOCK") || L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT_SOUTHEAST_ROOM:{ name:"Deku Tree MQ Southeast Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_DEKU_TREE_MQ_CLEARED_SE_ROOM", () => (L.CanKillEnemy("RE_MAD_SCRUB"))]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_BASEMENT_TORCHES_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_TORCHES_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_TORCHES_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_TORCHES_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_WATER_ROOM_FRONT", () => (L.HasFireSource())],
      ["RR_DEKU_TREE_MQ_BASEMENT", () => (L.Get("LOGIC_DEKU_TREE_MQ_CLEARED_SE_ROOM"))]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT_WATER_ROOM_FRONT:{ name:"Deku Tree MQ Basement Water Room Front", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_DEKU_TREE_MQ_WATER_ROOM_TORCHES", () => (L.CanUse("RG_FIRE_ARROWS") || (L.CanUse("RG_STICKS") && (L.trick("RT_DEKU_MQ_LOG") || (L.IsChild && L.CanShield()))))]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_BEFORE_SPINNING_LOG_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_MQ_BASEMENT_SPIKE_ROLLER_FRONT_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_SPIKE_ROLLER_FRONT_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_SPIKE_ROLLER_FRONT_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_WATER_ROOM_BACK", () => (L.trick("RT_DEKU_MQ_LOG") || (L.IsChild && L.CanShield()) || L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS")))],
      ["RR_DEKU_TREE_MQ_BASEMENT_SOUTHEAST_ROOM", () => true]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT_WATER_ROOM_BACK:{ name:"Deku Tree MQ Basement Water Room Back", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanKillEnemy("RE_WITHERED_DEKU_BABA"))],
      ["LOGIC_NUT_ACCESS", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_AFTER_SPINNING_LOG_CHEST", () => (L.CanUse("RG_SONG_OF_TIME") && L.CanPassEnemy("RE_BIG_SKULLTULA") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DEKU_TREE_MQ_BASEMENT_SPIKE_ROLLER_BACK_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_SPIKE_ROLLER_BACK_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_SOUTHWEST_ROOM", () => (L.Get("LOGIC_DEKU_TREE_MQ_WATER_ROOM_TORCHES") && L.CanPassEnemy("RE_BIG_SKULLTULA", L.CanUse("RG_SONG_OF_TIME") ? "ED_CLOSE" : "ED_SHORT_JUMPSLASH"))],
      ["RR_DEKU_TREE_MQ_BASEMENT_WATER_ROOM_FRONT", () => (L.trick("RT_DEKU_MQ_LOG") || (L.IsChild && L.CanShield()) || L.CanUse("RG_LONGSHOT") || L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && (L.IsAdult || L.CanUse("RG_HOOKSHOT"))))]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT_SOUTHWEST_ROOM:{ name:"Deku Tree MQ Basement Southwest Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_MQ_BASEMENT_LARVAE_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_LARVAE_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_GRAVE_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_MAD_SCRUB") && L.CanKillEnemy("RE_KEESE")))))],
      ["RR_DEKU_TREE_MQ_BASEMENT_WATER_ROOM_BACK", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_MAD_SCRUB") && L.CanKillEnemy("RE_KEESE")))))]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT_GRAVE_ROOM:{ name:"Deku Tree MQ Basement Grave Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_GS_BASEMENT_GRAVES_ROOM", () => (L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_SONG_OF_TIME") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG")))],
      ["RC_DEKU_TREE_MQ_BASEMENT_GRAVES_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_GRAVES_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_GRAVES_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_GRAVES_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_GRAVES_GRASS_5", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_LEDGE", () => (L.CanUse("RG_CRAWL") && L.AnyAgeTime((() => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))))],
      ["RR_DEKU_TREE_MQ_BASEMENT_SOUTHWEST_ROOM", () => true],
      ["RR_DEKU_TREE_MQ_BASEMENT_BACK_ROOM", () => (L.AnyAgeTime((() => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))))]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT_BACK_ROOM:{ name:"Deku Tree MQ Basement Back Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_MQ_GS_BASEMENT_BACK_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_DEKU_TREE_MQ_BASEMENT_BACK_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_BACK_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_BACK_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_GRAVE_ROOM", () => true]
    ] },
    RR_DEKU_TREE_MQ_BASEMENT_LEDGE:{ name:"Deku Tree MQ Basement Ledge", scene:"SCENE_DEKU_TREE", time:false,
      events:[
      ["LOGIC_DEKU_TREE_PUSHED_BASEMENT_BLOCK", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["LOGIC_DEKU_TREE_B1_BROKE_WEB", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_DEKU_TREE_MQ_DEKU_SCRUB", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DEKU_TREE_MQ_BASEMENT_UPPER_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_UPPER_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BASEMENT_UPPER_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_GRAVE_ROOM", () => (L.CanUse("RG_CRAWL"))],
      ["RR_DEKU_TREE_MQ_BASEMENT", () => true],
      ["RR_DEKU_TREE_MQ_OUTSIDE_BOSS_ROOM", () => (L.Get("LOGIC_DEKU_TREE_B1_BROKE_WEB") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS")))]
    ] },
    RR_DEKU_TREE_MQ_OUTSIDE_BOSS_ROOM:{ name:"Deku Tree MQ Outside Boss Room", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[
      ["RC_DEKU_TREE_MQ_BEFORE_BOSS_LEFT_HEART", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_MQ_BEFORE_BOSS_MIDDLE_HEART", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_MQ_BEFORE_BOSS_RIGHT_HEART", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_DEKU_TREE_MQ_BEFORE_BOSS_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_BOSS_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_MQ_BEFORE_BOSS_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_MQ_BASEMENT_LEDGE", () => (L.HasItem("RG_CLIMB") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_DEKU_TREE_BOSS_ENTRYWAY", () => (L.AnyAgeTime((() => (L.CanReflectNuts()))))]
    ] },
    RR_DEKU_TREE_BOSS_ENTRYWAY:{ name:"Deku Tree Boss Entryway", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DEKU_TREE_BOSS_ROOM", () => true]
    ] },
    RR_DEKU_TREE_BOSS_EXIT:{ name:"Deku Tree Boss Exit", scene:"SCENE_DEKU_TREE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DEKU_TREE_OUTSIDE_BOSS_ROOM", () => (!L.mq("DEKU_TREE"))],
      ["RR_DEKU_TREE_MQ_OUTSIDE_BOSS_ROOM", () => (L.mq("DEKU_TREE"))]
    ] },
    RR_DEKU_TREE_BOSS_ROOM:{ name:"Deku Tree Boss Room", scene:"SCENE_DEKU_TREE_BOSS", time:false,
      events:[
      ["LOGIC_DEKU_TREE_CLEAR", () => (L.CanKillEnemy("RE_GOHMA"))]
    ],
      checks:[
      ["RC_QUEEN_GOHMA", () => (L.Get("LOGIC_DEKU_TREE_CLEAR"))],
      ["RC_DEKU_TREE_QUEEN_GOHMA_HEART", () => (L.Get("LOGIC_DEKU_TREE_CLEAR"))],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_DEKU_TREE_QUEEN_GOHMA_GRASS_8", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEKU_TREE_BOSS_EXIT", () => true],
      ["RR_KF_OUTSIDE_DEKU_TREE", () => (L.Get("LOGIC_DEKU_TREE_CLEAR"))]
    ] },
    RR_DODONGOS_CAVERN_ENTRYWAY:{ name:"Dodongos Cavern Entryway", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_BEGINNING", () => (!L.mq("DODONGOS_CAVERN"))],
      ["RR_DODONGOS_CAVERN_MQ_BEGINNING", () => (L.mq("DODONGOS_CAVERN"))],
      ["RR_DEATH_MOUNTAIN_TRAIL", () => true]
    ] },
    RR_DODONGOS_CAVERN_BEGINNING:{ name:"Dodongos Cavern Beginning", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_ENTRYWAY", () => true],
      ["RR_DODONGOS_CAVERN_LOBBY", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))]
    ] },
    RR_DODONGOS_CAVERN_LOBBY:{ name:"Dodongos Cavern Lobby", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => ((L.AnyAgeTime((() => (L.CanBreakMudWalls()))) || L.HasItem("RG_GORONS_BRACELET")) && L.CallGossipFairy())],
      ["LOGIC_DC_EYES_LIT", () => (L.trick("RT_DC_EYES_CHU") && L.CanUse("RG_BOMBCHU_5"))]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MAP_CHEST", () => ((L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_DEKU_SCRUB_LOBBY", () => ((L.CanStunDeku() || L.HasItem("RG_GORONS_BRACELET")) && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DODONGOS_CAVERN_GOSSIP_STONE_FAIRY", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))) && L.CallGossipFairy())],
      ["RC_DODONGOS_CAVERN_GOSSIP_STONE_FAIRY_BIG", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))) && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_DODONGOS_CAVERN_GOSSIP_STONE", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_BEGINNING", () => true],
      ["RR_DODONGOS_CAVERN_LOBBY_SWITCH", () => (L.IsAdult || L.CanGroundJump(true))],
      ["RR_DODONGOS_CAVERN_SE_CORRIDOR", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))],
      ["RR_DODONGOS_CAVERN_STAIRS_LOWER", () => (L.Get("LOGIC_DC_STAIRS_ROOM_DOOR"))],
      ["RR_DODONGOS_CAVERN_FAR_BRIDGE", () => (L.Get("LOGIC_DC_LIFT_PLATFORM"))],
      ["RR_DODONGOS_CAVERN_BOSS_AREA", () => (L.Get("LOGIC_DC_EYES_LIT"))],
      ["RR_DODONGOS_CAVERN_BOSS_ENTRYWAY", () => false]
    ] },
    RR_DODONGOS_CAVERN_LOBBY_SWITCH:{ name:"Dodongos Cavern Lobby Switch", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_STAIRS_ROOM_DOOR", () => true]
    ],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_DODONGO_ROOM", () => true]
    ] },
    RR_DODONGOS_CAVERN_SE_CORRIDOR:{ name:"Dodongos Cavern SE Corridor", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_GS_SCARECROW", () => (L.ReachScarecrow() || (L.IsAdult && L.CanUse("RG_LONGSHOT")) || (L.trick("RT_DC_SCARECROW_GS") && L.HasItem("RG_POWER_BRACELET") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA")))],
      ["RC_DODONGOS_CAVERN_SIDE_ROOM_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_SIDE_ROOM_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_SIDE_ROOM_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_SIDE_ROOM_POT_4", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_SIDE_ROOM_POT_5", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_SIDE_ROOM_POT_6", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_SE_ROOM", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.CanAttack() || (L.TakeDamage() && L.CanShield() && L.HasItem("RG_POWER_BRACELET"))))))],
      ["RR_DODONGOS_CAVERN_NEAR_LOWER_LIZALFOS", () => (L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_DODONGOS_CAVERN_SE_ROOM:{ name:"Dodongos Cavern SE Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_GS_SIDE_ROOM_NEAR_LOWER_LIZALFOS", () => (L.CanAttack())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_SE_CORRIDOR", () => true]
    ] },
    RR_DODONGOS_CAVERN_NEAR_LOWER_LIZALFOS:{ name:"Dodongos Cavern Near Lower Lizalfos", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_SE_CORRIDOR", () => true],
      ["RR_DODONGOS_CAVERN_LOWER_LIZALFOS", () => true]
    ] },
    RR_DODONGOS_CAVERN_LOWER_LIZALFOS:{ name:"Dodongos Cavern Lower Lizalfos", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_KILLED_LOWER_LIZALFOS", () => (L.CanKillEnemy("RE_LIZALFOS", "ED_CLOSE", true, 2))]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_4", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LOWER_LIZALFOS_HEART", () => true]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_NEAR_LOWER_LIZALFOS", () => (L.Get("LOGIC_DC_KILLED_LOWER_LIZALFOS"))],
      ["RR_DODONGOS_CAVERN_DODONGO_ROOM", () => (L.Get("LOGIC_DC_KILLED_LOWER_LIZALFOS"))]
    ] },
    RR_DODONGOS_CAVERN_DODONGO_ROOM:{ name:"Dodongos Cavern Dodongo Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_TORCH_ROOM_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_TORCH_ROOM_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_TORCH_ROOM_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_TORCH_ROOM_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_LOBBY_SWITCH", () => (L.HasFireSourceWithTorch())],
      ["RR_DODONGOS_CAVERN_LOWER_LIZALFOS", () => true],
      ["RR_DODONGOS_CAVERN_NEAR_DODONGO_ROOM", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))]
    ] },
    RR_DODONGOS_CAVERN_NEAR_DODONGO_ROOM:{ name:"Dodongos Cavern Near Dodongo Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_DEKU_SCRUB_SIDE_ROOM_NEAR_DODONGOS", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_DODONGO_ROOM", () => true]
    ] },
    RR_DODONGOS_CAVERN_STAIRS_LOWER:{ name:"Dodongos Cavern Stairs Lower", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_GS_VINES_ABOVE_STAIRS", () => (L.trick("RT_DC_VINES_GS") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_STAIRS_UPPER", () => (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET") || L.CanUse("RG_DINS_FIRE") || (L.trick("RT_DC_STAIRS_WITH_BOW") && L.CanUse("RG_FAIRY_BOW")))],
      ["RR_DODONGOS_CAVERN_COMPASS_ROOM", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))]
    ] },
    RR_DODONGOS_CAVERN_STAIRS_UPPER:{ name:"Dodongos Cavern Stairs Upper", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_GS_ALCOVE_ABOVE_STAIRS", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", L.Get("LOGIC_DC_LIFT_PLATFORM") ? "ED_BOOMERANG" : "ED_LONGSHOT"))],
      ["RC_DODONGOS_CAVERN_GS_VINES_ABOVE_STAIRS", () => ((L.HasItem("RG_CLIMB") && L.HasItem("RG_POWER_BRACELET")) || L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_DODONGOS_CAVERN_STAIRCASE_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_STAIRCASE_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_STAIRCASE_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_STAIRCASE_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_STAIRS_LOWER", () => true],
      ["RR_DODONGOS_CAVERN_ARMOS_ROOM", () => true]
    ] },
    RR_DODONGOS_CAVERN_COMPASS_ROOM:{ name:"Dodongos Cavern Compass Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_COMPASS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_STAIRS_LOWER", () => (L.CanUse("RG_MASTER_SWORD") || L.CanUse("RG_BIGGORON_SWORD") || L.CanUse("RG_MEGATON_HAMMER") || L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET"))]
    ] },
    RR_DODONGOS_CAVERN_ARMOS_ROOM:{ name:"Dodongos Cavern Armos Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_STAIRS_UPPER", () => true],
      ["RR_DODONGOS_CAVERN_BOMB_ROOM_LOWER", () => (L.IsAdult || (L.HasItem("RG_POWER_BRACELET") && L.HasItem("RG_CLIMB")) || L.trick("RT_UNINTUITIVE_JUMPS") || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_DODONGOS_CAVERN_BOMB_ROOM_LOWER:{ name:"Dodongos Cavern Bomb Room Lower", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_BOMB_FLOWER_PLATFORM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_BLADE_ROOM_HEART", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["RC_DODONGOS_CAVERN_FIRST_BRIDGE_GRASS", () => (L.CanCutShrubs())],
      ["RC_DODONGOS_CAVERN_BLADE_GRASS", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_ARMOS_ROOM", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_DODONGOS_CAVERN_2F_SIDE_ROOM", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || (L.trick("RT_DC_SCRUB_ROOM") && L.HasItem("RG_GORONS_BRACELET"))))))],
      ["RR_DODONGOS_CAVERN_FIRST_SLINGSHOT_ROOM", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))],
      ["RR_DODONGOS_CAVERN_BOMB_ROOM_UPPER", () => ((L.IsAdult && (L.trick("RT_UNINTUITIVE_JUMPS") || L.CanGroundJump())) || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT") || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives() && L.CanJumpslash()))]
    ] },
    RR_DODONGOS_CAVERN_2F_SIDE_ROOM:{ name:"Dodongos Cavern 2F Side Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_DEKU_SCRUB_NEAR_BOMB_BAG_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DODONGOS_CAVERN_DEKU_SCRUB_NEAR_BOMB_BAG_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_BOMB_ROOM_LOWER", () => true]
    ] },
    RR_DODONGOS_CAVERN_FIRST_SLINGSHOT_ROOM:{ name:"Dodongos Cavern First Slingshot Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_SINGLE_EYE_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_SINGLE_EYE_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_SINGLE_EYE_GRASS", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_BOMB_ROOM_LOWER", () => true],
      ["RR_DODONGOS_CAVERN_UPPER_LIZALFOS", () => (L.CanHitEyeTargets() || L.trick("RT_DC_SLINGSHOT_SKIP") || (L.IsAdult && L.CanGroundJump()) || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && (L.CanUse("RG_MEGATON_HAMMER") || (L.CanStandingShield() && L.CanJumpslash()))))]
    ] },
    RR_DODONGOS_CAVERN_UPPER_LIZALFOS:{ name:"Dodongos Cavern Upper Lizalfos", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_LOWER_LIZALFOS_HEART", () => true],
      ["RC_DODONGOS_CAVERN_UPPER_LIZALFOS_LEFT_HEART", () => true],
      ["RC_DODONGOS_CAVERN_UPPER_LIZALFOS_RIGHT_HEART", () => true],
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LIZALFOS_POT_4", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_LOWER_LIZALFOS_HEART", () => true]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_FIRST_SLINGSHOT_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS", "ED_CLOSE", true, 2)))))],
      ["RR_DODONGOS_CAVERN_SECOND_SLINGSHOT_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS", "ED_CLOSE", true, 2)))))],
      ["RR_DODONGOS_CAVERN_NEAR_LOWER_LIZALFOS", () => (L.Get("LOGIC_DC_KILLED_LOWER_LIZALFOS"))],
      ["RR_DODONGOS_CAVERN_DODONGO_ROOM", () => (L.Get("LOGIC_DC_KILLED_LOWER_LIZALFOS"))]
    ] },
    RR_DODONGOS_CAVERN_SECOND_SLINGSHOT_ROOM:{ name:"Dodongos Cavern Second Slingshot Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_DOUBLE_EYE_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_DOUBLE_EYE_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_UPPER_LIZALFOS", () => true],
      ["RR_DODONGOS_CAVERN_BOMB_ROOM_UPPER", () => (L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_FAIRY_BOW") || L.trick("RT_DC_SLINGSHOT_SKIP") || (L.IsAdult && L.CanGroundJump()) || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && (L.CanUse("RG_MEGATON_HAMMER") || (L.CanStandingShield() && L.CanJumpslash()))))]
    ] },
    RR_DODONGOS_CAVERN_BOMB_ROOM_UPPER:{ name:"Dodongos Cavern Bomb Room Upper", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_BOMB_BAG_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_BLADE_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_BLADE_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_BOMB_ROOM_LOWER", () => true],
      ["RR_DODONGOS_CAVERN_SECOND_SLINGSHOT_ROOM", () => true],
      ["RR_DODONGOS_CAVERN_FAR_BRIDGE", () => true]
    ] },
    RR_DODONGOS_CAVERN_FAR_BRIDGE:{ name:"Dodongos Cavern Far Bridge", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_EYES_LIT", () => (L.HasExplosives())],
      ["LOGIC_DC_LIFT_PLATFORM", () => true]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_END_OF_BRIDGE_CHEST", () => (L.CanBreakMudWalls() && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_BOMB_ROOM_UPPER", () => true]
    ] },
    RR_DODONGOS_CAVERN_BOSS_AREA:{ name:"Dodongos Cavern Boss Region", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_BEFORE_BOSS_GRASS", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_BACK_ROOM", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls()))))],
      ["RR_DODONGOS_CAVERN_BOSS_ENTRYWAY", () => (L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_DODONGOS_CAVERN_BACK_ROOM:{ name:"Dodongos Cavern Back Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_GS_BACK_ROOM", () => (L.CanAttack())],
      ["RC_DODONGOS_CAVERN_BACK_ROOM_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_BACK_ROOM_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_BACK_ROOM_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_BACK_ROOM_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_BOSS_AREA", () => true]
    ] },
    RR_DODONGOS_CAVERN_MQ_BEGINNING:{ name:"Dodongos Cavern MQ Beginning", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_ENTRYWAY", () => true],
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_LOBBY:{ name:"Dodongos Cavern MQ Lobby", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_EYES_LIT", () => (L.trick("RT_DC_EYES_CHU") && L.CanUse("RG_BOMBCHU_5"))]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_MAP_CHEST", () => ((L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_MQ_DEKU_SCRUB_LOBBY_REAR", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DODONGOS_CAVERN_MQ_DEKU_SCRUB_LOBBY_FRONT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_BEGINNING", () => true],
      ["RR_DODONGOS_CAVERN_MQ_GOSSIP_STONE", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET")))))],
      ["RR_DODONGOS_CAVERN_MQ_OUTSIDE_POES_ROOM", () => (L.IsAdult || L.CanUse("RG_HOOKSHOT") || L.CanGroundJump(!!L.trick("RT_GROUND_JUMP_HARD")))],
      ["RR_DODONGOS_CAVERN_MQ_MOUTH_SIDE_BRIDGE", () => (L.AnyAgeTime((() => (L.BlastOrSmash() || L.HasItem("RG_GORONS_BRACELET")))))],
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_LOWER", () => (L.AnyAgeTime((() => (L.BlastOrSmash() || L.HasItem("RG_GORONS_BRACELET")))))],
      ["RR_DODONGOS_CAVERN_MQ_LOWER_RIGHT_SIDE", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls()))) || L.AnyAgeTime((() => (L.HasItem("RG_GORONS_BRACELET") && L.TakeDamage()))))],
      ["RR_DODONGOS_CAVERN_MQ_BEHIND_MOUTH", () => (L.Get("LOGIC_DC_EYES_LIT"))]
    ] },
    RR_DODONGOS_CAVERN_MQ_GOSSIP_STONE:{ name:"Dodongos Cavern MQ Gossip Stone", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy())]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_GOSSIP_STONE", () => true],
      ["RC_DODONGOS_CAVERN_MQ_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_DODONGOS_CAVERN_MQ_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => true]
    ] },
    RR_DODONGOS_CAVERN_MQ_OUTSIDE_POES_ROOM:{ name:"Dodongos Cavern MQ Outside Poes Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_BOMB_BAG_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_MQ_POES_ROOM", () => true]
    ] },
    RR_DODONGOS_CAVERN_MQ_MOUTH_SIDE_BRIDGE:{ name:"Dodongos Cavern MQ Mouth Side Bridge", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_MQ_CLEAR_UPPER_LOBBY_ROCKS", () => (L.BlastOrSmash() || L.CanUse("RG_DINS_FIRE"))],
      ["LOGIC_DC_EYES_LIT", () => (L.HasExplosives() || (L.Get("LOGIC_DC_MQ_CLEAR_UPPER_LOBBY_ROCKS") && L.HasItem("RG_GORONS_BRACELET") && ((L.IsAdult && L.trick("RT_DC_MQ_ADULT_EYES")) || (L.IsChild && L.trick("RT_DC_MQ_CHILD_EYES")))))]
    ],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_UPPER", () => (L.Get("LOGIC_DC_MQ_CLEAR_UPPER_LOBBY_ROCKS"))],
      ["RR_DODONGOS_CAVERN_MQ_OUTSIDE_POES_ROOM", () => (L.CanUse("RG_HOVER_BOOTS") || (L.trick("RT_DC_MQ_CHILD_BOMBS") && L.CanJumpslashExceptHammer() && L.TakeDamage()))]
    ] },
    RR_DODONGOS_CAVERN_MQ_STAIRS_LOWER:{ name:"Dodongos Cavern MQ Stairs Lower", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_POT_4", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_LOWER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_LOWER_CRATE_2", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_UPPER", () => (L.AnyAgeTime((() => (L.HasExplosives() || L.CanUse("RG_DINS_FIRE") || (L.trick("RT_DC_STAIRS_WITH_BOW") && L.CanUse("RG_FAIRY_BOW"))))))],
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_PAST_MUD_WALL", () => (L.AnyAgeTime((() => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakMudWalls()))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_STAIRS_PAST_MUD_WALL:{ name:"Dodongos Cavern MQ Stairs Past Mud Wall", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_GS_SONG_OF_TIME_BLOCK_ROOM", () => (L.CanUse("RG_SONG_OF_TIME") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_UPPER", () => (L.HasExplosives() || (L.HasItem("RG_GORONS_BRACELET") && (L.CanUse("RG_STICKS") || L.trick("RT_DC_MQ_STAIRS_WITH_ONLY_STRENGTH"))) || L.CanUse("RG_DINS_FIRE") || (L.trick("RT_DC_STAIRS_WITH_BOW") && L.CanUse("RG_FAIRY_BOW")))],
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_LOWER", () => true]
    ] },
    RR_DODONGOS_CAVERN_MQ_STAIRS_UPPER:{ name:"Dodongos Cavern MQ Stairs Upper", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_MQ_STAIRS_SILVER_RUPEES", () => (L.HasItem("RG_CLIMB"))]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_DEKU_SCRUB_STAIRCASE", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_UPPER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_UPPER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_UPPER_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_STAIRCASE_UPPER_CRATE_4", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_LOWER", () => true],
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_PAST_BIG_SKULLTULAS", () => (L.CanPassEnemy("RE_BIG_SKULLTULA") || L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_DODONGOS_CAVERN_MQ_STAIRS_PAST_BIG_SKULLTULAS:{ name:"Dodongos Cavern MQ Past Big Skulltulas", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_UPPER", () => (L.CanPassEnemy("RE_BIG_SKULLTULA") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_LOWER", () => (L.TakeDamage())],
      ["RR_DODONGOS_CAVERN_MQ_DODONGO_ROOM", () => (L.Get("LOGIC_DC_MQ_STAIRS_SILVER_RUPEES"))]
    ] },
    RR_DODONGOS_CAVERN_MQ_DODONGO_ROOM:{ name:"Dodongos Cavern MQ Dodongo Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_COMPASS_CHEST", () => ((L.CanKillEnemy("RE_DODONGO") || (L.HasItem("RG_GORONS_BRACELET") && L.CanClimbLadder())) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_MQ_COMPASS_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DODONGOS_CAVERN_MQ_COMPASS_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DODONGOS_CAVERN_MQ_COMPASS_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DODONGOS_CAVERN_MQ_COMPASS_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_STAIRS_PAST_BIG_SKULLTULAS", () => true],
      ["RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_LOWER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DODONGO") || L.HasItem("RG_GORONS_BRACELET")))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_LOWER:{ name:"Dodongos Cavern MQ Torch Puzzle Lower", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_MQ_CLEAR_UPPER_LOBBY_ROCKS", () => ((((L.IsAdult ) && (L.HasItem("RG_POWER_BRACELET") || L.trick("RT_UNINTUITIVE_JUMPS"))) || L.CanUse("RG_HOVER_BOOTS")) && L.CanUse("RG_STICKS"))]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_MIDDLE_POT", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_ROOM_HEART", () => true]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => (L.TakeDamage())],
      ["RR_DODONGOS_CAVERN_MQ_DODONGO_ROOM", () => (L.HasItem("RG_POWER_BRACELET") || L.CanClimbLadder())],
      ["RR_DODONGOS_CAVERN_MQ_LARVAE_ROOM", () => (L.HasFireSource() || (L.CanUse("RG_STICKS") && L.HasItem("RG_POWER_BRACELET")))],
      ["RR_DODONGOS_CAVERN_MQ_BIG_BLOCK_ROOM", () => (L.AnyAgeTime((() => (L.HasFireSourceWithTorch()))))],
      ["RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_UPPER", () => ((L.IsAdult && (L.HasItem("RG_POWER_BRACELET") || L.trick("RT_UNINTUITIVE_JUMPS") || L.CanGroundJump())) || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS", () => (L.CanUse("RG_STICKS") && L.HasItem("RG_GORONS_BRACELET"))]
    ] },
    RR_DODONGOS_CAVERN_MQ_BIG_BLOCK_ROOM:{ name:"Dodongos Cavern MQ Big Block Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_BIG_BLOCK_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_BIG_BLOCK_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_LOWER", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS", () => ((L.IsAdult || L.HasItem("RG_POWER_BRACELET") || L.CanUse("RG_HOVER_BOOTS")) && ((L.HasFireSource() && L.HasItem("RG_GORONS_BRACELET")) || L.CanBreakMudWalls()))]
    ] },
    RR_DODONGOS_CAVERN_MQ_LARVAE_ROOM:{ name:"Dodongos Cavern MQ Larvae Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_LARVAE_ROOM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_MQ_GS_LARVAE_ROOM", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_LARVAE_ROOM_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_LARVAE_ROOM_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_LARVAE_ROOM_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_LARVAE_ROOM_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_LARVAE_ROOM_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_LARVAE_ROOM_CRATE_6", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_LOWER", () => true]
    ] },
    RR_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS:{ name:"Dodongos Cavern MQ Before Upper Lizalfos", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_GS_LIZALFOS_ROOM", () => (L.BlastOrSmash())],
      ["RC_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS_POT_4", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_LIZALFOS_ROOM_HEART", () => (L.BlastOrSmash())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_BIG_BLOCK_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS")))))],
      ["RR_DODONGOS_CAVERN_MQ_TWO_FIRES_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS")))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_TWO_FIRES_ROOM:{ name:"Dodongos Cavern MQ Before Upper Lizalfos", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_TWO_FLAMES_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_TWO_FLAMES_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_TWO_FLAMES_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_TWO_FLAMES_CRATE_2", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_UPPER_LIZALFOS", () => true],
      ["RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_UPPER", () => (L.IsAdult || (L.AnyAgeTime((() => (L.BlastOrSmash() || (L.CanAttack() && L.HasItem("RG_GORONS_BRACELET")))))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_UPPER:{ name:"Dodongos Cavern MQ Torch Puzzle Upper", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_MQ_CLEAR_UPPER_LOBBY_ROCKS", () => (L.CanDetonateUprightBombFlower() || L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_ROOM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_CORNER_POT", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_MIDDLE_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_MOUTH_SIDE_BRIDGE", () => (L.Get("LOGIC_DC_MQ_CLEAR_UPPER_LOBBY_ROCKS"))],
      ["RR_DODONGOS_CAVERN_MQ_TORCH_PUZZLE_LOWER", () => true],
      ["RR_DODONGOS_CAVERN_MQ_TWO_FIRES_ROOM", () => true],
      ["RR_DODONGOS_CAVERN_MQ_LOWER_RIGHT_SIDE", () => (L.HasItem("RG_GORONS_BRACELET") && L.TakeDamage())]
    ] },
    RR_DODONGOS_CAVERN_MQ_LOWER_RIGHT_SIDE:{ name:"Dodongos Cavern MQ Lower Right Side", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_RIGHT_SIDE_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_RIGHT_SIDE_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_RIGHT_SIDE_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_RIGHT_SIDE_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_MQ_LOWER_RIGHT_SIDE_SCRUB", () => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET"))],
      ["RR_DODONGOS_CAVERN_MQ_LOWER_LIZALFOS", () => (L.AnyAgeTime((() => (L.CanDetonateBombFlowers() || L.HasItem("RG_GORONS_BRACELET")))) && L.CanHitEyeTargets())]
    ] },
    RR_DODONGOS_CAVERN_MQ_LOWER_RIGHT_SIDE_SCRUB:{ name:"Dodongos Cavern MQ Lower Right Side Scrub", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_DEKU_SCRUB_SIDE_ROOM_NEAR_LOWER_LIZALFOS", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOWER_RIGHT_SIDE", () => true]
    ] },
    RR_DODONGOS_CAVERN_MQ_LOWER_LIZALFOS:{ name:"Dodongos Cavern MQ Lower Lizalfos", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_LIZALFOS_ROOM_HEART", () => true]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOWER_RIGHT_SIDE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS")))))],
      ["RR_DODONGOS_CAVERN_MQ_POES_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS")))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_POES_ROOM:{ name:"Dodongos Cavern MQ Poes Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_POT_3", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_POT_4", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_1", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_2", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_3", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_4", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_5", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_6", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_7", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())],
      ["RC_DODONGOS_CAVERN_MQ_POE_ROOM_CRATE_8", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_OUTSIDE_POES_ROOM", () => (L.AnyAgeTime((() => (L.CanDetonateBombFlowers() || L.HasItem("RG_GORONS_BRACELET")))))],
      ["RR_DODONGOS_CAVERN_MQ_LOWER_LIZALFOS", () => true],
      ["RR_DODONGOS_CAVERN_MQ_MAD_SCRUB_ROOM", () => (L.AnyAgeTime((() => (L.CanDetonateBombFlowers() || L.HasItem("RG_GORONS_BRACELET")))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_MAD_SCRUB_ROOM:{ name:"Dodongos Cavern Mad Scrub Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_GS_SCRUB_ROOM", () => ((L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG", true)))],
      ["RC_DODONGOS_CAVERN_MQ_SCRUB_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DODONGOS_CAVERN_MQ_SCRUB_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_POES_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FIRE_KEESE") && L.CanKillEnemy("RE_MAD_SCRUB")))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_BEHIND_MOUTH:{ name:"Dodongos Cavern MQ Behind Mouth", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_GS_BACK_AREA", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (L.IsAdult && L.HasItem("RG_POWER_BRACELET") && (L.CanPassEnemy("RE_ARMOS") || L.CanUse("RG_HOVER_BOOTS") || (L.trick("RT_UNINTUITIVE_JUMPS") ) )))],
      ["RC_DODONGOS_CAVERN_MQ_BEFORE_BOSS_SW_POT", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_BEFORE_BOSS_NE_POT", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_ARMOS_ROOM_SE_POT", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_ARMOS_ROOM_SW_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_LOBBY", () => true],
      ["RR_DODONGOS_CAVERN_MQ_BACK_BEHIND_FIRE", () => (L.HasItem("RG_POWER_BRACELET") || L.HasExplosives() || (L.IsAdult && (L.CanUse("RG_HOVER_BOOTS") || (L.trick("RT_UNINTUITIVE_JUMPS") ) )))],
      ["RR_DODONGOS_CAVERN_MQ_BACK_SWITCH_GRAVE", () => (L.IsAdult)]
    ] },
    RR_DODONGOS_CAVERN_MQ_BACK_BEHIND_FIRE:{ name:"Dodongos Cavern MQ Back Behind Fire", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_MQ_BEHIND_FIRE_SWITCH", () => (L.CanDetonateBombFlowers())]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_GS_BACK_AREA", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_BEHIND_MOUTH", () => (L.CanHitSwitch())],
      ["RR_DODONGOS_CAVERN_MQ_BACK_POE_ROOM", () => true],
      ["RR_DODONGOS_CAVERN_MQ_BACK_SWITCH_GRAVE", () => ((L.CanPassEnemy("RE_ARMOS") && (L.IsAdult || L.Get("LOGIC_DC_MQ_BEHIND_FIRE_SWITCH"))) || L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_DODONGOS_CAVERN_MQ_BACK_POE_ROOM:{ name:"Dodongos Cavern MQ Back Poe Room", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_UNDER_GRAVE_CHEST", () => ((L.trick("RT_VISIBLE_COLLISION") || L.HasItem("RG_POWER_BRACELET")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_MQ_BACKROOM_POT_1", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_BACKROOM_POT_2", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_BACK_POE_GRASS", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_BACK_BEHIND_FIRE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_POE")))))]
    ] },
    RR_DODONGOS_CAVERN_MQ_BACK_SWITCH_GRAVE:{ name:"Dodongos Cavern MQ Back Switch Grave", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[
      ["LOGIC_DC_MQ_BEHIND_FIRE_SWITCH", () => (L.HasItem("RG_POWER_BRACELET") || L.CanHitSwitch() || L.CanDetonateBombFlowers())],
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_MQ_GS_BACK_AREA", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA") || L.HasItem("RG_GORONS_BRACELET"))],
      ["RC_DODONGOS_CAVERN_MQ_ARMOS_ROOM_NW_POT", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_ARMOS_ROOM_NE_POT", () => (L.CanBreakPots())],
      ["RC_DODONGOS_CAVERN_MQ_ARMOS_GRASS", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_MQ_BEHIND_MOUTH", () => true],
      ["RR_DODONGOS_CAVERN_MQ_BACK_BEHIND_FIRE", () => true],
      ["RR_DODONGOS_CAVERN_BOSS_ENTRYWAY", () => (L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_DODONGOS_CAVERN_BOSS_ENTRYWAY:{ name:"Dodongos Cavern Boss Entryway", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_BOSS_ROOM", () => true]
    ] },
    RR_DODONGOS_CAVERN_BOSS_EXIT:{ name:"Dodongos Cavern Boss Exit", scene:"SCENE_DODONGOS_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DODONGOS_CAVERN_BOSS_AREA", () => (!L.mq("DODONGOS_CAVERN"))],
      ["RR_DODONGOS_CAVERN_MQ_BEHIND_MOUTH", () => (L.mq("DODONGOS_CAVERN"))]
    ] },
    RR_DODONGOS_CAVERN_BOSS_ROOM:{ name:"Dodongos Cavern Boss Room", scene:"SCENE_DODONGOS_CAVERN_BOSS", time:false,
      events:[
      ["LOGIC_DODONGOS_CAVERN_CLEAR", () => (L.AnyAgeTime((() => (L.HasExplosives() || (L.trick("RT_DC_HAMMER_FLOOR") ? L.CanUse("RG_MEGATON_HAMMER") || (L.trick("RT_BLUE_FIRE_MUD_WALLS") && L.BlueFire()) : L.trick("RT_BLUE_FIRE_MUD_WALLS") && L.CanUse("RG_BOTTLE_WITH_BLUE_FIRE"))))) && L.CanKillEnemy("RE_KING_DODONGO"))]
    ],
      checks:[
      ["RC_DODONGOS_CAVERN_BOSS_ROOM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DODONGOS_CAVERN_KING_DODONGO_HEART", () => (L.Get("LOGIC_DODONGOS_CAVERN_CLEAR"))],
      ["RC_KING_DODONGO", () => (L.Get("LOGIC_DODONGOS_CAVERN_CLEAR"))]
    ],
      exits:[
      ["RR_DODONGOS_CAVERN_BOSS_EXIT", () => true],
      ["RR_DEATH_MOUNTAIN_TRAIL", () => (L.Get("LOGIC_DODONGOS_CAVERN_CLEAR"))]
    ] },
    RR_FIRE_TEMPLE_ENTRYWAY:{ name:"Fire Temple Entryway", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FOYER", () => (!L.mq("FIRE_TEMPLE"))],
      ["RR_FIRE_TEMPLE_MQ_FOYER_LOWER", () => (L.mq("FIRE_TEMPLE"))],
      ["RR_DMC_TEMPLE_EXIT", () => true]
    ] },
    RR_FIRE_TEMPLE_FOYER:{ name:"Fire Temple Foyer", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_ENTRYWAY", () => true],
      ["RR_FIRE_TEMPLE_NEAR_BOSS_ROOM", () => true],
      ["RR_FIRE_TEMPLE_LOOP_HEXAGON_ROOM", () => (L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))) && (L.SmallKeys("SCENE_FIRE_TEMPLE", 8) || !L.IsFireLoopLocked()))],
      ["RR_FIRE_TEMPLE_LOOP_CAGE_FOYER_SIDE", () => true],
      ["RR_FIRE_TEMPLE_BIG_LAVA_ROOM", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 2) && L.FireTimer() >= 24)]
    ] },
    RR_FIRE_TEMPLE_NEAR_BOSS_ROOM:{ name:"Fire Temple Near Boss Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_NEAR_BOSS_CHEST", () => (L.FireTimer() >= 16 && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_FOYER", () => ((L.IsAdult || L.CanUse("RG_HOVER_BOOTS")) && (L.FireTimer() >= 16 || (L.Get("LOGIC_FIRE_HIT_PLATFORM") && L.FireTimer() >= 8)))],
      ["RR_FIRE_TEMPLE_NEAR_BOSS_UPPER", () => (L.IsAdult && (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")) && L.FireTimer() >= 16)],
      ["RR_FIRE_TEMPLE_BOSS_ENTRYWAY", () => (L.FireTimer() >= 16 && (L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && (L.trick("RT_UNINTUITIVE_JUMPS") || L.Get("LOGIC_FIRE_HIT_PLATFORM")))))]
    ] },
    RR_FIRE_TEMPLE_NEAR_BOSS_UPPER:{ name:"Fire Temple Near Boss Upper", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_NEAR_BOSS_POT_1", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_NEAR_BOSS_POT_2", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_NEAR_BOSS_POT_3", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_NEAR_BOSS_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[] },
    RR_FIRE_TEMPLE_LOOP_HEXAGON_ROOM:{ name:"Fire Temple Loop Hexagon Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FOYER", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 8) || !L.IsFireLoopLocked())],
      ["RR_FIRE_TEMPLE_LOOP_5_TILE_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_TORCH_SLUG") && L.CanKillEnemy("RE_FIRE_KEESE")))))]
    ] },
    RR_FIRE_TEMPLE_LOOP_5_TILE_ROOM:{ name:"Fire Temple Loop 5 Tile Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_GS_BOSS_KEY_LOOP", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_CLOSE"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_LOOP_HEXAGON_ROOM", () => true],
      ["RR_FIRE_TEMPLE_LOOP_FLARE_DANCER", () => true]
    ] },
    RR_FIRE_TEMPLE_LOOP_FLARE_DANCER:{ name:"Fire Temple Loop Flare Dancer", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_FLARE_DANCER_CHEST", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))) && (L.IsAdult || L.CanGroundJump() || L.CanUse("RG_HOOKSHOT")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_LOOP_5_TILE_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))))],
      ["RR_FIRE_TEMPLE_LOOP_CAGE_SWITCH", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))))]
    ] },
    RR_FIRE_TEMPLE_LOOP_CAGE_SWITCH:{ name:"Fire Temple Loop Cage Switch", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_LOOP_SWITCH", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_LOOP_FLARE_DANCER", () => true],
      ["RR_FIRE_TEMPLE_LOOP_GORON_CAGE", () => (L.Get("LOGIC_FIRE_LOOP_SWITCH"))]
    ] },
    RR_FIRE_TEMPLE_LOOP_GORON_CAGE:{ name:"Fire Temple Loop Goron Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_BOSS_KEY_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_LOOP_CAGE_SWITCH", () => (L.Get("LOGIC_FIRE_LOOP_SWITCH"))],
      ["RR_FIRE_TEMPLE_LOOP_CAGE_FOYER_SIDE", () => (L.Get("LOGIC_FIRE_LOOP_SWITCH"))]
    ] },
    RR_FIRE_TEMPLE_LOOP_CAGE_FOYER_SIDE:{ name:"Fire Temple Cage Foyer Side", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FOYER", () => true],
      ["RR_FIRE_TEMPLE_LOOP_GORON_CAGE", () => (L.Get("LOGIC_FIRE_LOOP_SWITCH"))]
    ] },
    RR_FIRE_TEMPLE_BIG_LAVA_ROOM:{ name:"Fire Temple Big Lava Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_BIG_LAVA_POT_1", () => (L.CanBreakPots() && L.FireTimer() >= 32)],
      ["RC_FIRE_TEMPLE_BIG_LAVA_POT_2", () => (L.CanBreakPots() && L.FireTimer() >= 32)],
      ["RC_FIRE_TEMPLE_BIG_LAVA_POT_3", () => (L.CanBreakPots() && L.FireTimer() >= 32)]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_FOYER", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 2) && L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_1F_CURVED_CAGE", () => (L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_8_TILE_ROOM", () => (L.IsAdult && L.FireTimer() >= 32 && (L.CanUse("RG_SONG_OF_TIME") || L.trick("RT_FIRE_SOT")))],
      ["RR_FIRE_TEMPLE_STRAIGHTFORWARD_CAGE", () => ((L.IsAdult && L.HasExplosives() && L.FireTimer() >= 32) || (L.CanGroundJump() && L.FireTimer() >= 40))],
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_1F", () => (L.CanUse("RG_GORON_TUNIC") && L.SmallKeys("SCENE_FIRE_TEMPLE", 3))]
    ] },
    RR_FIRE_TEMPLE_1F_CURVED_CAGE:{ name:"Fire Temple 1F Curved Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_BIG_LAVA_ROOM_LOWER_OPEN_DOOR_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BIG_LAVA_ROOM", () => true]
    ] },
    RR_FIRE_TEMPLE_8_TILE_ROOM:{ name:"Fire Temple 8 Tile Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_GS_SONG_OF_TIME_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", L.IsAdult ? "ED_CLOSE" : "ED_BOOMERANG") || L.CanGroundJumpslash())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BIG_LAVA_ROOM", () => true]
    ] },
    RR_FIRE_TEMPLE_STRAIGHTFORWARD_CAGE:{ name:"Fire Temple Straightforward Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_BIG_LAVA_ROOM_BLOCKED_DOOR_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BIG_LAVA_ROOM", () => true]
    ] },
    RR_FIRE_TEMPLE_LAVA_GEYSER_1F:{ name:"Fire Temple Lava Geyser 1F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_BIG_LAVA_ROOM", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 3))],
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_GRATE", () => (L.FireTimer() >= 40 && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_TORCH", () => (L.CanUse("RG_LONGSHOT") && L.FireTimer() >= 40)]
    ] },
    RR_FIRE_TEMPLE_LAVA_GEYSER_GRATE:{ name:"Fire Temple Lava Geyser Grate", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_FIRE_PILLAR_LEFT_HEART", () => true],
      ["RC_FIRE_TEMPLE_FIRE_PILLAR_RIGHT_HEART", () => true],
      ["RC_FIRE_TEMPLE_FIRE_PILLAR_BACK_HEART", () => true]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_1F", () => (L.TakeDamage())],
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_2F", () => (L.FireTimer() >= 48 && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_FIRE_TEMPLE_LAVA_GEYSER_TORCH:{ name:"Fire Temple Lava Geyser Torch", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_1F", () => true],
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_GRATE", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_FIRE_TEMPLE_LAVA_GEYSER_2F:{ name:"Fire Temple Lava Geyser 2F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_TORCH", () => (L.TakeDamage() && L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_SHORTCUT_ROOM", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 4))]
    ] },
    RR_FIRE_TEMPLE_SHORTCUT_ROOM:{ name:"Fire Temple Shortcut Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_LAVA_GEYSER_1F", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 4))],
      ["RR_FIRE_TEMPLE_SHORTCUT_CLIMB", () => (L.Get("LOGIC_FIRE_OPENED_UPPER_SHORTCUT"))],
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_LOWER", () => (L.IsAdult && L.HasItem("RG_CLIMB") && ((L.HasItem("RG_GORONS_BRACELET") || L.trick("RT_FIRE_STRENGTH")) || L.CanGroundJump()) && L.CanHitSwitch("ED_BOMB_THROW"))]
    ] },
    RR_FIRE_TEMPLE_SHORTCUT_CLIMB:{ name:"Fire Temple Shortcut Climb", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_OPENED_UPPER_SHORTCUT", () => true]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_BOULDER_MAZE_SHORTCUT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_SHORTCUT_ROOM", () => true],
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_UPPER", () => (L.HasItem("RG_CLIMB"))]
    ] },
    RR_FIRE_TEMPLE_BOULDER_MAZE_LOWER:{ name:"Fire Temple Boulder Maze Lower", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_BOULDER_MAZE_LOWER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FIRE_TEMPLE_GS_BOULDER_MAZE", () => (L.HasExplosives() && (L.IsAdult || L.HookshotOrBoomerang() || L.CanGroundJumpslash()))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_SHORTCUT_ROOM", () => true],
      ["RR_FIRE_TEMPLE_3F_CURVED_CAGE", () => true],
      ["RR_FIRE_TEMPLE_NARROW_PATH_ROOM", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 5))],
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_UPPER", () => false]
    ] },
    RR_FIRE_TEMPLE_3F_CURVED_CAGE:{ name:"Fire Temple 3F Curved Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_BOULDER_MAZE_SIDE_ROOM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_LOWER", () => true]
    ] },
    RR_FIRE_TEMPLE_NARROW_PATH_ROOM:{ name:"Fire Temple Narrow Path Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_EAST_CENTRAL_LEFT_HEART", () => true],
      ["RC_FIRE_TEMPLE_EAST_CENTRAL_RIGHT_HEART", () => true],
      ["RC_FIRE_TEMPLE_EAST_CENTRAL_MIDDLE_HEART", () => true]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BIG_LAVA_ROOM", () => (L.TakeDamage())],
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_LOWER", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 5))],
      ["RR_FIRE_TEMPLE_FIRE_WALL_CHASE", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 6))],
      ["RR_FIRE_TEMPLE_FIRE_WALL_CAGE", () => (L.CanHitEyeTargets())]
    ] },
    RR_FIRE_TEMPLE_FIRE_WALL_CHASE:{ name:"Fire Temple Fire Wall Chase", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_FIRE_WALL_EAST_HEART", () => (L.FireTimer() >= 24 && (L.IsAdult || L.CanUse("RG_BOOMERANG")))],
      ["RC_FIRE_TEMPLE_FIRE_WALL_WEST_HEART", () => (L.FireTimer() >= 24 && (L.IsAdult || L.CanUse("RG_BOOMERANG")))],
      ["RC_FIRE_TEMPLE_FIRE_WALL_EXIT_HEART", () => (L.FireTimer() >= 16)]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_NARROW_PATH_ROOM", () => (L.FireTimer() >= 24 && L.SmallKeys("SCENE_FIRE_TEMPLE", 6))],
      ["RR_FIRE_TEMPLE_FIRE_WALL_CAGE", () => (L.FireTimer() >= 16 && L.IsAdult)],
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_UPPER", () => (L.FireTimer() >= 24 && L.IsAdult)],
      ["RR_FIRE_TEMPLE_CORRIDOR", () => (L.FireTimer() >= 16 && L.IsAdult && L.SmallKeys("SCENE_FIRE_TEMPLE", 7))]
    ] },
    RR_FIRE_TEMPLE_FIRE_WALL_CAGE:{ name:"Fire Temple Fire Wall Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MAP_CHEST", () => (L.FireTimer() >= 8 && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_NARROW_PATH_ROOM", () => true],
      ["RR_FIRE_TEMPLE_FIRE_WALL_CHASE", () => false]
    ] },
    RR_FIRE_TEMPLE_BOULDER_MAZE_UPPER:{ name:"Fire Temple Boulder Maze Upper", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_BOULDER_MAZE_UPPER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_SHORTCUT_CLIMB", () => (L.HasExplosives())],
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_LOWER", () => true],
      ["RR_FIRE_TEMPLE_FIRE_WALL_CHASE", () => true],
      ["RR_FIRE_TEMPLE_GS_CLIMB_4F", () => (L.ReachScarecrow() || (L.trick("RT_FIRE_SCARECROW") && L.IsAdult && L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_FIRE_TEMPLE_GS_CLIMB_4F:{ name:"Fire Temple GS Climb 4F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_GS_SCARECROW_CLIMB", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BOULDER_MAZE_UPPER", () => true],
      ["RR_FIRE_TEMPLE_GS_CLIMB_5F", () => (L.HasItem("RG_CLIMB"))]
    ] },
    RR_FIRE_TEMPLE_GS_CLIMB_5F:{ name:"Fire Temple GS Climb 5F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_GS_SCARECROW_CLIMB", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA", L.HasItem("RG_CLIMB") ? "ED_SHORT_JUMPSLASH" : "ED_BOMB_THROW"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_GS_CLIMB_4F", () => true],
      ["RR_FIRE_TEMPLE_5F_RUINS", () => true]
    ] },
    RR_FIRE_TEMPLE_5F_RUINS:{ name:"Fire Temple 5F Ruins", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_SCARECROW_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FIRE_TEMPLE_GS_SCARECROW_TOP", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_BOMB_THROW"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_GS_CLIMB_4F", () => true],
      ["RR_FIRE_TEMPLE_NARROW_PATH_ROOM", () => (L.TakeDamage())]
    ] },
    RR_FIRE_TEMPLE_CORRIDOR:{ name:"Fire Temple Corridor", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FIRE_WALL_CHASE", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 7))],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_MAIN", () => true]
    ] },
    RR_FIRE_TEMPLE_FIRE_MAZE_MAIN:{ name:"Fire Temple Fire Maze Main", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_FLAME_MAZE_LEFT_POT_1", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_FLAME_MAZE_LEFT_POT_2", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_FLAME_MAZE_LEFT_POT_3", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_FLAME_MAZE_LEFT_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_NEAR_BOSS_ROOM", () => (L.Get("LOGIC_FIRE_HIT_PLATFORM") && (L.IsAdult || L.CanUse("RG_HOVER_BOOTS") || L.TakeDamage()))],
      ["RR_FIRE_TEMPLE_CORRIDOR", () => true],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_PLATFORMS", () => (L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && (L.Get("LOGIC_FIRE_HIT_ABOVE_MAZE_PLATFORM") || L.CanGroundJump())))],
      ["RR_FIRE_TEMPLE_CAGELESS_CHEST_ROOM", () => true],
      ["RR_FIRE_TEMPLE_SOT_CAGE_LOWER", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 8))],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_SWITCH", () => (L.trick("RT_FIRE_SKIP_FLAME_WALLS"))]
    ] },
    RR_FIRE_TEMPLE_FIRE_MAZE_PLATFORMS:{ name:"Fire Temple Fire Maze Platforms", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_HIT_PLATFORM", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FIRE_MAZE_MAIN", () => true],
      ["RR_FIRE_TEMPLE_SOT_CAGE_UPPER_DOOR", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ] },
    RR_FIRE_TEMPLE_CAGELESS_CHEST_ROOM:{ name:"Fire Temple Cageless Chest Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_COMPASS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_FIRE_MAZE_MAIN", () => true]
    ] },
    RR_FIRE_TEMPLE_SOT_CAGE_LOWER:{ name:"Fire Temple Sot Cage Lower", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FIRE_MAZE_MAIN", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 8))],
      ["RR_FIRE_TEMPLE_SOT_CAGE_UPPER_DOOR", () => (L.IsAdult && L.CanUse("RG_SONG_OF_TIME"))],
      ["RR_FIRE_TEMPLE_SOT_CAGE_SWITCH", () => (L.IsAdult && L.CanUse("RG_SONG_OF_TIME"))],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_SWITCH", () => true]
    ] },
    RR_FIRE_TEMPLE_SOT_CAGE_UPPER_DOOR:{ name:"Fire Temple Sot Cage Upper Door", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_BOSS_ENTRYWAY", () => false],
      ["RR_FIRE_TEMPLE_SOT_CAGE_SWITCH", () => (L.IsAdult || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_SONG_OF_TIME"))],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_PLATFORMS", () => true],
      ["RR_FIRE_TEMPLE_SOT_CAGE_LOWER", () => true]
    ] },
    RR_FIRE_TEMPLE_SOT_CAGE_SWITCH:{ name:"Fire Temple Sot Cage Switch", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_HIGHEST_GORON_CHEST", () => ((L.CanUse("RG_SONG_OF_TIME") || L.trick("RT_VISIBLE_COLLISION")) && L.CanUse("RG_MEGATON_HAMMER") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BOSS_ENTRYWAY", () => false],
      ["RR_FIRE_TEMPLE_SOT_CAGE_UPPER_DOOR", () => (L.IsAdult || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_SONG_OF_TIME"))],
      ["RR_FIRE_TEMPLE_SOT_CAGE_LOWER", () => true]
    ] },
    RR_FIRE_TEMPLE_FIRE_MAZE_SWITCH:{ name:"Fire Temple Fire Maze Switch", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FIRE_MAZE_MAIN", () => ((L.trick("RT_FIRE_SKIP_FLAME_WALLS") && L.TakeDamage()) || (L.IsAdult && L.CanStandingShield() && L.CanUse("RG_BOMB_BAG") && L.trick("RT_GROUND_JUMP_HARD") && (L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS"))))],
      ["RR_FIRE_TEMPLE_SOT_CAGE_LOWER", () => true],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_PAST_WALL", () => true]
    ] },
    RR_FIRE_TEMPLE_FIRE_MAZE_PAST_WALL:{ name:"Fire Temple Fire Maze Past Wall", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_FLAME_MAZE_RIGHT_POT_1", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_FLAME_MAZE_RIGHT_POT_2", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_FLAME_MAZE_RIGHT_POT_3", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_FLAME_MAZE_RIGHT_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_3F_FLARE_DANCER", () => (L.HasExplosives())]
    ] },
    RR_FIRE_TEMPLE_3F_FLARE_DANCER:{ name:"Fire Temple 3F Flare Dancer", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_FIRE_MAZE_PAST_WALL", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))))],
      ["RR_FIRE_TEMPLE_ABOVE_3F_FLARE_DANCER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))))]
    ] },
    RR_FIRE_TEMPLE_ABOVE_3F_FLARE_DANCER:{ name:"Fire Temple Above 3F Flare Dancer", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_3F_FLARE_DANCER", () => true],
      ["RR_FIRE_TEMPLE_SWITCH_CLIMB", () => true]
    ] },
    RR_FIRE_TEMPLE_SWITCH_CLIMB:{ name:"Fire Temple Switch Climb", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_ABOVE_3F_FLARE_DANCER", () => true],
      ["RR_FIRE_TEMPLE_NARROW_STAIRS", () => (L.CanHitSwitch("ED_BOMB_THROW") && L.HasItem("RG_CLIMB"))]
    ] },
    RR_FIRE_TEMPLE_NARROW_STAIRS:{ name:"Fire Temple Narrow Stairs", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MEGATON_HAMMER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_SOT_CAGE_UPPER_DOOR", () => (L.TakeDamage())],
      ["RR_FIRE_TEMPLE_SOT_CAGE_SWITCH", () => (L.TakeDamage())],
      ["RR_FIRE_TEMPLE_SWITCH_CLIMB", () => true],
      ["RR_FIRE_TEMPLE_NARROW_STAIRS_4F", () => (L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))))]
    ] },
    RR_FIRE_TEMPLE_NARROW_STAIRS_4F:{ name:"Fire Temple Narrow Stairs 4F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_TOP_OF_COLLAPSING_STAIRS", () => (L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))))],
      ["RR_FIRE_TEMPLE_NARROW_STAIRS", () => false]
    ] },
    RR_FIRE_TEMPLE_TOP_OF_COLLAPSING_STAIRS:{ name:"Fire Temple Top of Collapsing Stairs", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_HIT_STAIRS", () => (L.CanUse("RG_MEGATON_HAMMER"))],
      ["LOGIC_FIRE_CHILD_AT_TOP_OF_STAIRS", () => (L.IsChild)]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_AFTER_HAMMER_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_FIRE_TEMPLE_AFTER_HAMMER_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_NARROW_STAIRS_4F", () => true],
      ["RR_FIRE_TEMPLE_BASE_OF_COLLAPSING_STAIRS", () => (L.Get("LOGIC_FIRE_HIT_STAIRS"))]
    ] },
    RR_FIRE_TEMPLE_BASE_OF_COLLAPSING_STAIRS:{ name:"Fire Temple Base of Collapsing Stairs", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_TOP_OF_COLLAPSING_STAIRS", () => (L.Get("LOGIC_FIRE_HIT_STAIRS") && L.IsAdult)],
      ["RR_FIRE_TEMPLE_ABOVE_FIRE_MAZE", () => (L.Get("LOGIC_FIRE_HIT_STAIRS") && (L.IsAdult || L.Get("LOGIC_FIRE_CHILD_AT_TOP_OF_STAIRS")) && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_FIRE_TEMPLE_ABOVE_FIRE_MAZE:{ name:"Fire Temple Above Fire Maze", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_HIT_ABOVE_MAZE_PLATFORM", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_BASE_OF_COLLAPSING_STAIRS", () => true],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_MAIN", () => (L.Get("LOGIC_FIRE_HIT_ABOVE_MAZE_PLATFORM"))],
      ["RR_FIRE_TEMPLE_FIRE_MAZE_PLATFORMS", () => (L.Get("LOGIC_FIRE_HIT_ABOVE_MAZE_PLATFORM") && L.CanJumpslash() && L.TakeDamage())]
    ] },
    RR_FIRE_TEMPLE_MQ_FOYER_LOWER:{ name:"Fire Temple MQ Foyer Lower", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_ENTRANCE_POT_1", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_ENTRANCE_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_ENTRYWAY", () => true],
      ["RR_FIRE_TEMPLE_MQ_LOOP_CAGE_FOYER_SIDE", () => true],
      ["RR_FIRE_TEMPLE_MQ_FOYER_UPPER", () => (L.IsAdult || L.CanUse("RG_HOOKSHOT") || L.trick("RT_FIRE_SKIP_FLAME_WALLS"))],
      ["RR_FIRE_TEMPLE_MQ_LOOP_HEXAGON_ROOM", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 5))]
    ] },
    RR_FIRE_TEMPLE_MQ_FOYER_UPPER:{ name:"Fire Temple MQ Foyer Upper", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FOYER_LOWER", () => true],
      ["RR_FIRE_TEMPLE_MQ_NEAR_BOSS_ROOM", () => (L.HasFireSource())],
      ["RR_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM", () => (L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))))]
    ] },
    RR_FIRE_TEMPLE_MQ_LOOP_CAGE_FOYER_SIDE:{ name:"Fire Temple MQ Loop Cage Foyer Side", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_MAP_ROOM_SIDE_CHEST", () => (L.CanKillEnemy("RE_LIKE_LIKE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FOYER_LOWER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIKE_LIKE")))))],
      ["RR_FIRE_TEMPLE_MQ_LOOP_GORON_CAGE", () => (L.Get("LOGIC_FIRE_OPENED_LOWEST_GORON_CAGE"))]
    ] },
    RR_FIRE_TEMPLE_MQ_LOOP_HEXAGON_ROOM:{ name:"Fire Temple MQ Loop Hexagon Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LOOP_STALFOS_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FOYER_LOWER", () => true],
      ["RR_FIRE_TEMPLE_MQ_LOOP_5_TILE_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2)))))]
    ] },
    RR_FIRE_TEMPLE_MQ_LOOP_5_TILE_ROOM:{ name:"Fire Temple MQ Loop 5 Tile Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LOOP_KNUCKLE_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_1", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_2", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_3", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_4", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_5", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_6", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_7", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_BEFORE_MINI_BOSS_POT_8", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOOP_HEXAGON_ROOM", () => true],
      ["RR_FIRE_TEMPLE_MQ_LOOP_FLARE_DANCER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))]
    ] },
    RR_FIRE_TEMPLE_MQ_LOOP_FLARE_DANCER:{ name:"Fire Temple MQ Loop Flare Dancer", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_MEGATON_HAMMER_CHEST", () => ((L.IsAdult || L.CanUse("RG_HOOKSHOT") || L.CanGroundJump()) && L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOOP_5_TILE_ROOM", () => true],
      ["RR_FIRE_TEMPLE_MQ_LOOP_CAGE_SWITCH", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))))]
    ] },
    RR_FIRE_TEMPLE_MQ_LOOP_CAGE_SWITCH:{ name:"Fire Temple MQ Loop Cage Switch", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_OPENED_LOWEST_GORON_CAGE", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOOP_FLARE_DANCER", () => true],
      ["RR_FIRE_TEMPLE_MQ_LOOP_GORON_CAGE", () => (L.Get("LOGIC_FIRE_OPENED_LOWEST_GORON_CAGE"))]
    ] },
    RR_FIRE_TEMPLE_MQ_LOOP_GORON_CAGE:{ name:"Fire Temple MQ Loop Goron Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_MAP_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOOP_CAGE_SWITCH", () => (L.Get("LOGIC_FIRE_OPENED_LOWEST_GORON_CAGE"))],
      ["RR_FIRE_TEMPLE_MQ_LOOP_CAGE_FOYER_SIDE", () => (L.Get("LOGIC_FIRE_OPENED_LOWEST_GORON_CAGE"))]
    ] },
    RR_FIRE_TEMPLE_MQ_NEAR_BOSS_ROOM:{ name:"Fire Temple MQ Near Boss Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_NEAR_BOSS_CHEST", () => (L.FireTimer() >= 24 && L.trick("RT_FIRE_MQ_NEAR_BOSS") && (L.CanUse("RG_FIRE_ARROWS") || (L.IsAdult && L.CanUse("RG_DINS_FIRE") && L.CanUse("RG_FAIRY_BOW"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_CRATE_1", () => (L.FireTimer() >= 24 && L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_CRATE_2", () => (L.FireTimer() >= 24 && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FOYER_UPPER", () => ((L.IsAdult || L.CanUse("RG_HOVER_BOOTS")) && (L.FireTimer() >= 16 || (L.Get("LOGIC_FIRE_HIT_PLATFORM") && L.FireTimer() >= 8)))],
      ["RR_FIRE_TEMPLE_MQ_NEAR_BOSS_TARGET", () => (L.FireTimer() >= 32 && (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_FIRE_TEMPLE_BOSS_ENTRYWAY", () => (L.FireTimer() >= 16 && (L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && (L.trick("RT_UNINTUITIVE_JUMPS") || L.Get("LOGIC_FIRE_HIT_PLATFORM")))))]
    ] },
    RR_FIRE_TEMPLE_MQ_NEAR_BOSS_TARGET:{ name:"Fire Temple MQ Near Boss Target", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_NEAR_BOSS_CHEST", () => (L.CanUse("RG_DINS_FIRE") && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT") || (L.IsAdult && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_GORON_TUNIC") || L.EffectiveHealth() >= 2 || (L.CanUse("RG_NAYRUS_LOVE") && L.CanUse("RG_STICKS"))))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_POT_1", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_POT_2", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_CRATE_6", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_NEAR_BOSS_ROOM", () => true],
      ["RR_FIRE_TEMPLE_MQ_NEAR_BOSS_ROOM_UPPER", () => (L.IsAdult || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_NEAR_BOSS_ROOM_UPPER:{ name:"Fire Temple MQ Near Boss Room Upper", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_NEAR_BOSS_CHEST", () => ((L.CanUse("RG_FIRE_ARROWS") || (L.CanUse("RG_DINS_FIRE") && L.CanUse("RG_FAIRY_BOW"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_OUTSIDE_BOSS_CRATE_4", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_NEAR_BOSS_TARGET", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM:{ name:"Fire Temple MQ Big Lava Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LAVA_ROOM_NORTH_POT", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_LAVA_ROOM_HIGH_POT", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_LAVA_ROOM_SOUTH_POT", () => (L.FireTimer() >= 40 && (L.CanUse("RG_HOOKSHOT") || L.trick("RT_FIRE_MQ_BLOCKED_CHEST")) && L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FOYER_UPPER", () => (L.FireTimer() >= 32)],
      ["RR_FIRE_TEMPLE_MQ_GS_GORON_CAGE", () => (L.FireTimer() >= 32)],
      ["RR_FIRE_TEMPLE_MQ_BIG_LAVA_BLOCKED_DOOR", () => (L.FireTimer() >= 48 && (L.CanUse("RG_HOOKSHOT") || ((L.IsAdult || L.CanGroundJump()) && L.trick("RT_FIRE_MQ_BLOCKED_CHEST"))))],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_1F", () => (L.CanUse("RG_GORON_TUNIC") && L.SmallKeys("SCENE_FIRE_TEMPLE", 2))],
      ["RR_FIRE_TEMPLE_MQ_TORCH_FIREWALL_ROOM", () => (L.HasFireSource() && ((L.CanUse("RG_FAIRY_BOW") && L.FireTimer() >= 32) || (L.trick("RT_FIRE_MQ_BK_CHEST") && L.FireTimer() >= 56)) && (L.CanUse("RG_HOOKSHOT") || (L.IsAdult && L.trick("RT_FIRE_SOT"))))]
    ] },
    RR_FIRE_TEMPLE_MQ_BIG_LAVA_BLOCKED_DOOR:{ name:"Fire Temple MQ Big Lava Blocked Door", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LAVA_ROOM_SOUTH_POT", () => (L.CanBreakPots() && L.FireTimer() >= 8)]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_TORCH_LOCKED_CAGE", () => (L.HasExplosives())]
    ] },
    RR_FIRE_TEMPLE_MQ_GS_GORON_CAGE:{ name:"Fire Temple MQ GS Goron Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_GS_BIG_LAVA_ROOM_OPEN_DOOR", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_TORCH_LOCKED_CAGE:{ name:"Fire Temple MQ Torch Locked Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM_BLOCKED_DOOR_CHEST", () => (L.HasFireSource() && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_TORCH_FIREWALL_ROOM:{ name:"Fire Temple MQ Torch Firewall Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanUse("RG_HOOKSHOT"))]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_BOSS_KEY_CHEST", () => (L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_POT_1", () => (L.HookshotOrBoomerang())],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_POT_2", () => (L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_1F:{ name:"Fire Temple MQ Lava Geyser 1F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM", () => true],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_GRATE", () => (L.FireTimer() >= 40 && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_PILLARS", () => (L.FireTimer() >= 40 && L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_GRATE:{ name:"Fire Temple MQ Lava Geyser Grate", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_FIRE_PILLAR_LEFT_HEART", () => true],
      ["RC_FIRE_TEMPLE_MQ_FIRE_PILLAR_RIGHT_HEART", () => true]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_1F", () => true],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_PILLARS", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_PILLARS:{ name:"Fire Temple MQ Lava Geyser Pillars", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_FIRE_PILLAR_LOWER_HEART", () => true]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_1F", () => true],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_GRATE", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_2F", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_2F:{ name:"Fire Temple MQ Lava Geyser 2F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_1F", () => (L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_PILLARS", () => (L.TakeDamage() && L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_LOWER", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_LOWER:{ name:"Fire Temple MQ Shortcut Room Lower", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_MID", () => ((L.HasFireSource() && (L.IsAdult || (L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_CLIMB")))) || (L.trick("RT_FIRE_MQ_CLIMB") && L.CanUse("RG_HOVER_BOOTS") && L.HasItem("RG_CLIMB")))],
      ["RR_FIRE_TEMPLE_MQ_LAVA_GEYSER_2F", () => true],
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_CAGE", () => (L.Get("LOGIC_FIRE_OPENED_UPPER_SHORTCUT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_MID:{ name:"Fire Temple MQ Shortcut Room Middle", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_LOWER", () => true],
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_3F", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_3F:{ name:"Fire Temple MQ Shortcut Room 3F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_MID", () => true],
      ["RR_FIRE_TEMPLE_MQ_LOWER_LIZALFOS_MAZE", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_LOWER_LIZALFOS_MAZE:{ name:"Fire Temple MQ Lower Lizalfos Maze", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_LOWER", () => true],
      ["RR_FIRE_TEMPLE_MQ_MAZE_CRATE_CAGE", () => (L.AnyAgeTime((() => (L.CanJumpslash()))))],
      ["RR_FIRE_TEMPLE_MQ_UPPER_LIZALFOS_MAZE", () => ((L.HasExplosives() || L.trick("RT_VISIBLE_COLLISION")) && L.CanUse("RG_MEGATON_HAMMER") && L.CanUse("RG_HOOKSHOT"))],
      ["RR_FIRE_TEMPLE_MQ_MAZE_SWITCH_DOOR", () => (L.HasExplosives() && L.trick("RT_FIRE_MQ_MAZE_SIDE_ROOM"))],
      ["RR_FIRE_TEMPLE_MQ_NARROW_PATH_ROOM", () => false]
    ] },
    RR_FIRE_TEMPLE_MQ_MAZE_SWITCH_DOOR:{ name:"Fire Temple MQ Maze Switch Door", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOWER_LIZALFOS_MAZE", () => true],
      ["RR_FIRE_TEMPLE_MQ_3F_CURVED_CAGE", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_3F_CURVED_CAGE:{ name:"Fire Temple MQ 3F Curved Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_SIDE_ROOM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_MAZE_SWITCH_DOOR", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_MAZE_CRATE_CAGE:{ name:"Fire Temple MQ Maze Crate Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_LOWER_CHEST", () => (L.HasItem("RG_OPEN_CHEST") && (L.trick("RT_VISIBLE_COLLISION") || L.CanBreakCrates()))],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_LOWER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_LOWER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_LOWER_CRATE_3", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOWER_LIZALFOS_MAZE", () => true],
      ["RR_FIRE_TEMPLE_MQ_UPPER_LIZALFOS_MAZE", () => (L.IsAdult && ((L.trick("RT_FIRE_MQ_MAZE_HOVERS") && L.CanUse("RG_HOVER_BOOTS")) || L.trick("RT_FIRE_MQ_MAZE_JUMP")))]
    ] },
    RR_FIRE_TEMPLE_MQ_UPPER_LIZALFOS_MAZE:{ name:"Fire Temple MQ Upper Lizalfos Maze", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOWER_LIZALFOS_MAZE", () => true],
      ["RR_FIRE_TEMPLE_MQ_MAZE_BOX_CAGE", () => (L.AnyAgeTime((() => (L.CanJumpslash() || L.HasExplosives() || (L.trick("RT_VISIBLE_COLLISION") && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_BOOMERANG")))))))],
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_CLIMB", () => (L.HasExplosives())],
      ["RR_FIRE_TEMPLE_MQ_ABOVE_MAZE", () => (L.HasExplosives() && L.CanUse("RG_MEGATON_HAMMER") && (L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_SONG_OF_TIME"))))],
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 3) && L.CanUse("RG_GORON_TUNIC"))]
    ] },
    RR_FIRE_TEMPLE_MQ_MAZE_BOX_CAGE:{ name:"Fire Temple MQ Maze Box Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_UPPER_CHEST", () => (L.HasItem("RG_OPEN_CHEST") && (L.trick("RT_VISIBLE_COLLISION") || L.CanBreakCrates()))],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_UPPER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_UPPER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_UPPER_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_UPPER_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_FIRE_TEMPLE_MQ_LIZALFOS_MAZE_UPPER_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_UPPER_LIZALFOS_MAZE", () => true],
      ["RR_FIRE_TEMPLE_MQ_MAZE_SWITCH_DOOR", () => (L.HasExplosives() && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_FIRE_TEMPLE_MQ_ABOVE_MAZE:{ name:"Fire Temple MQ Above Maze", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_UPPER_LIZALFOS_MAZE", () => true],
      ["RR_FIRE_TEMPLE_MQ_TORCH_SLUG_CLIMB", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_SHORTCUT_CLIMB:{ name:"Fire Temple MQ Shortcut Climb", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_OPENED_UPPER_SHORTCUT", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_SHORTCUT_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_SHORTCUT_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_SHORTCUT_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_SHORTCUT_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_SHORTCUT_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_SHORTCUT_CRATE_6", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_UPPER_LIZALFOS_MAZE", () => (L.HasItem("RG_CLIMB"))],
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_CAGE", () => (L.Get("LOGIC_FIRE_OPENED_UPPER_SHORTCUT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_SHORTCUT_CAGE:{ name:"Fire Temple MQ Shortcut Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_COMPASS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_CLIMB", () => (L.Get("LOGIC_FIRE_OPENED_UPPER_SHORTCUT"))],
      ["RR_FIRE_TEMPLE_MQ_SHORTCUT_ROOM_LOWER", () => (L.Get("LOGIC_FIRE_OPENED_UPPER_SHORTCUT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_TORCH_SLUG_CLIMB:{ name:"Fire Temple MQ Torch Slug Climb", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanUse("RG_HOOKSHOT"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_ABOVE_MAZE", () => true],
      ["RR_FIRE_TEMPLE_MQ_BURNING_BLOCK", () => (L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_CLIMB"))]
    ] },
    RR_FIRE_TEMPLE_MQ_BURNING_BLOCK:{ name:"Fire Temple MQ Burning Block", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_GS_SKULL_ON_FIRE", () => (L.CanUse("RG_MEGATON_HAMMER") && L.CanUse("RG_HOOKSHOT") && (L.HasItem("RG_POWER_BRACELET") || L.trick("RT_VISIBLE_COLLISION")))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_TORCH_SLUG_CLIMB", () => true],
      ["RR_FIRE_TEMPLE_MQ_NARROW_PATH_ROOM", () => (L.TakeDamage())]
    ] },
    RR_FIRE_TEMPLE_MQ_NARROW_PATH_ROOM:{ name:"Fire Temple MQ Narrow Path Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_ABOVE_LAVA_POT_1", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_ABOVE_LAVA_POT_2", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_ABOVE_LAVA_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_LOWER_LIZALFOS_MAZE", () => true],
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM", () => false],
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_CAGE", () => false],
      ["RR_FIRE_TEMPLE_MQ_BIG_LAVA_ROOM", () => (L.TakeDamage())]
    ] },
    RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM:{ name:"Fire Temple MQ High Torch Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_MQ_HIGH_TORCH_LIT", () => ((L.CanUse("RG_FIRE_ARROWS") && L.FireTimer() >= 24))]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_FLAME_WALL_POT_1", () => (L.CanBreakPots() && L.FireTimer() >= 24)],
      ["RC_FIRE_TEMPLE_MQ_FLAME_WALL_POT_2", () => (L.CanBreakPots() && L.FireTimer() >= 24)],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_CRATE_1", () => (L.CanBreakCrates() && L.FireTimer() >= 24)],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_CRATE_3", () => (L.CanBreakCrates() && L.FireTimer() >= 24)],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_CRATE_4", () => (L.CanBreakCrates() && L.FireTimer() >= 16)],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_SMALL_CRATE_2", () => (L.CanBreakSmallCrates() && L.FireTimer() >= 24)],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_SMALL_CRATE_3", () => (L.CanBreakSmallCrates() && L.FireTimer() >= 16)]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_ABOVE_CAGE", () => ((L.IsAdult || L.CanUse("RG_HOOKSHOT")) && L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_MQ_UPPER_LIZALFOS_MAZE", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 3) && L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_MQ_NARROW_PATH_ROOM", () => (L.FireTimer() >= 24)],
      ["RR_FIRE_TEMPLE_MQ_CORRIDOR", () => (L.Get("LOGIC_FIRE_MQ_HIGH_TORCH_LIT") && (L.IsAdult || L.CanUse("RG_HOOKSHOT")) && L.FireTimer() >= 16)]
    ] },
    RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_BARRED_DOOR:{ name:"Fire Temple MQ High Torch Barred Door", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_CRATE_2", () => (L.CanBreakCrates() && L.FireTimer() >= 8)],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_SMALL_CRATE_1", () => (L.CanBreakSmallCrates() && L.FireTimer() >= 8)]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM", () => true],
      ["RR_FIRE_TEMPLE_MQ_CORRIDOR", () => (L.Get("LOGIC_FIRE_MQ_HIGH_TORCH_LIT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_ABOVE_CAGE:{ name:"Fire Temple MQ High Torch Room Above Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_MQ_HIGH_TORCH_LIT", () => (((L.CanUse("RG_FAIRY_BOW") && L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_POWER_BRACELET")) && L.FireTimer() >= 48))]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_SMALL_CRATE_4", () => (L.CanBreakSmallCrates())],
      ["RC_FIRE_TEMPLE_MQ_LAVA_TORCH_SMALL_CRATE_5", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM", () => true],
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_CAGE", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_CAGE:{ name:"Fire Temple MQ High Torch Room Cage", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_ABOVE_CAGE", () => (L.CanUse("RG_HOOKSHOT") && L.FireTimer() >= 8)],
      ["RR_FIRE_TEMPLE_MQ_NARROW_PATH_ROOM", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_CORRIDOR:{ name:"Fire Temple Corridor", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_HIGH_TORCH_ROOM_BARRED_DOOR", () => true],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MAIN", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MAIN:{ name:"Fire Temple MQ Fire Maze Main", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_GS_FIRE_WALL_MAZE_CENTER", () => (L.HasExplosives())],
      ["RC_FIRE_TEMPLE_MQ_SOUTH_FIRE_MAZE_WEST_POT", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_SOUTH_FIRE_MAZE_EAST_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_NEAR_BOSS_ROOM", () => (L.Get("LOGIC_FIRE_HIT_PLATFORM"))],
      ["RR_FIRE_TEMPLE_MQ_CORRIDOR", () => true],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_PLATFORMS", () => (L.IsAdult || L.CanUse("RG_SONG_OF_TIME") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MIDDLE", () => (L.trick("RT_FIRE_SKIP_FLAME_WALLS"))],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_LOWER", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_FIRE_MAZE_PLATFORMS:{ name:"Fire Temple MQ Fire Maze Platforms", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_HIT_PLATFORM", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MAIN", () => true],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MIDDLE", () => (L.CanUse("RG_SONG_OF_TIME") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_UPPER_DOOR", () => true],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_SWITCH", () => (L.CanUse("RG_SONG_OF_TIME") && L.CanUse("RG_HOVER_BOOTS") && (L.TakeDamage() || L.CanJumpslash()))]
    ] },
    RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_UPPER_DOOR:{ name:"Fire Temple MQ 2 Fire Walls Upper Door", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_PLATFORMS", () => true],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_SWITCH", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_LOWER", () => false]
    ] },
    RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_SWITCH:{ name:"Fire Temple MQ 2 Fire Walls Switch", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_MQ_OPENED_FIRE_MAZE_DOOR", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_UPPER_DOOR", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_LOWER", () => false]
    ] },
    RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_LOWER:{ name:"Fire Temple MQ 2 Fire Walls Lower", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_GS_FIRE_WALL_MAZE_CENTER", () => (L.HasExplosives() && (L.IsAdult || L.CanGroundJump()))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MAIN", () => true],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_SWITCH", () => (L.Get("LOGIC_FIRE_MQ_OPENED_FIRE_MAZE_DOOR"))]
    ] },
    RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MIDDLE:{ name:"Fire Temple MQ Fire Maze Middle", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_PAST_FIRE_MAZE_SOUTH_POT", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_FIRE_TEMPLE_MQ_FIRE_MAZE_NORTHMOST_POT", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_FIRE_MAZE_NORTHWEST_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_GS_LIZALFOS_ROOM", () => true],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MAIN", () => (L.IsAdult || L.trick("RT_FIRE_SKIP_FLAME_WALLS"))],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_SWITCH", () => (L.trick("RT_FIRE_SKIP_FLAME_WALLS"))]
    ] },
    RR_FIRE_TEMPLE_MQ_FIRE_MAZE_SWITCH:{ name:"Fire Temple MQ Fire Maze Switch", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_PAST_WALL", () => true],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MIDDLE", () => (L.trick("RT_FIRE_SKIP_FLAME_WALLS"))],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_LOWER", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_GS_LIZALFOS_ROOM:{ name:"Fire Temple MQ GS Lizalfos Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_GS_FIRE_WALL_MAZE_SIDE_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MIDDLE", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_FIRE_MAZE_PAST_WALL:{ name:"Fire Temple MQ Fire Maze Past Wall", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_PAST_FIRE_MAZE_SOUTH_POT", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_PAST_FIRE_MAZE_NORTH_POT", () => (L.CanBreakPots())],
      ["RC_FIRE_TEMPLE_MQ_FIRE_MAZE_NORTHWEST_POT", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_3F_FLARE_DANCER", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_3F_FLARE_DANCER:{ name:"Fire Temple MQ 3F Flare Dancer", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_FREESTANDING_KEY", () => (L.CanKillEnemy("RE_FLARE_DANCER"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_PAST_WALL", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))))],
      ["RR_FIRE_TEMPLE_MQ_ABOVE_3F_FLARE_DANCER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLARE_DANCER")))))]
    ] },
    RR_FIRE_TEMPLE_MQ_ABOVE_3F_FLARE_DANCER:{ name:"Fire Temple MQ Above 3F Flare Dancer", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_3F_FLARE_DANCER", () => true],
      ["RR_FIRE_TEMPLE_MQ_LOCKED_CLIMB", () => true]
    ] },
    RR_FIRE_TEMPLE_MQ_LOCKED_CLIMB:{ name:"Fire Temple MQ Locked Climb", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_3F_FLARE_DANCER", () => true],
      ["RR_FIRE_TEMPLE_MQ_NARROW_STAIRS_ROOM", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 4) && L.HasItem("RG_CLIMB"))]
    ] },
    RR_FIRE_TEMPLE_MQ_NARROW_STAIRS_ROOM:{ name:"Fire Temple MQ Narrow Stairs Room", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_MQ_HIT_SCARECROW_ROOM_PLATFORM", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_CHEST_ON_FIRE", () => ((L.IsAdult || L.ReachScarecrow()) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_LOWER", () => (L.TakeDamage())],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_UPPER_DOOR", () => (L.TakeDamage())],
      ["RR_FIRE_TEMPLE_MQ_2_FIRE_WALLS_SWITCH", () => (L.TakeDamage())],
      ["RR_FIRE_TEMPLE_MQ_3F_FLARE_DANCER", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 4))],
      ["RR_FIRE_TEMPLE_MQ_NARROW_STAIRS_4F", () => (L.Get("LOGIC_FIRE_MQ_HIT_SCARECROW_ROOM_PLATFORM"))]
    ] },
    RR_FIRE_TEMPLE_MQ_NARROW_STAIRS_4F:{ name:"Fire Temple MQ Narrow Stairs 4F", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_NARROW_STAIRS_ROOM", () => (L.Get("LOGIC_FIRE_MQ_HIT_SCARECROW_ROOM_PLATFORM") && L.CanUse("RG_HOOKSHOT"))],
      ["RR_FIRE_TEMPLE_MQ_TOP_OF_COLLAPSING_STAIRS", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 5))]
    ] },
    RR_FIRE_TEMPLE_MQ_TOP_OF_COLLAPSING_STAIRS:{ name:"Fire Temple MQ Top of Collapsing Stairs", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[
      ["LOGIC_FIRE_HIT_STAIRS", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_BASE_OF_COLLAPSING_STAIRS", () => (L.Get("LOGIC_FIRE_HIT_STAIRS"))],
      ["RR_FIRE_TEMPLE_MQ_NARROW_STAIRS_4F", () => (L.SmallKeys("SCENE_FIRE_TEMPLE", 5))]
    ] },
    RR_FIRE_TEMPLE_MQ_BASE_OF_COLLAPSING_STAIRS:{ name:"Fire Temple MQ Base of Collapsing Stairs", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_TOP_OF_COLLAPSING_STAIRS", () => (L.Get("LOGIC_FIRE_HIT_STAIRS") && L.IsAdult)],
      ["RR_FIRE_TEMPLE_MQ_ABOVE_FIRE_MAZE", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_FIRE_TEMPLE_MQ_ABOVE_FIRE_MAZE:{ name:"Fire Temple MQ Above Fire Maze", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FIRE_TEMPLE_MQ_GS_ABOVE_FIRE_MAZE", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_MAIN", () => (L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))))],
      ["RR_FIRE_TEMPLE_MQ_FIRE_MAZE_PLATFORMS", () => (L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))) && L.CanJumpslash() && L.TakeDamage())],
      ["RR_FIRE_TEMPLE_MQ_BASE_OF_COLLAPSING_STAIRS", () => false]
    ] },
    RR_FIRE_TEMPLE_BOSS_ENTRYWAY:{ name:"Fire Temple Boss Entryway", scene:"SCENE_FIRE_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_NEAR_BOSS_ROOM", () => (!L.mq("FIRE_TEMPLE") && false)],
      ["RR_FIRE_TEMPLE_MQ_NEAR_BOSS_ROOM", () => (L.mq("FIRE_TEMPLE") && false)],
      ["RR_FIRE_TEMPLE_BOSS_ROOM", () => (L.HasItem("RG_FIRE_TEMPLE_BOSS_KEY"))]
    ] },
    RR_FIRE_TEMPLE_BOSS_ROOM:{ name:"Fire Temple Boss Room", scene:"SCENE_FIRE_TEMPLE_BOSS", time:false,
      events:[
      ["LOGIC_FIRE_TEMPLE_CLEAR", () => (L.CanUse("RG_GORON_TUNIC") && L.CanKillEnemy("RE_VOLVAGIA"))]
    ],
      checks:[
      ["RC_FIRE_TEMPLE_VOLVAGIA_HEART", () => (L.Get("LOGIC_FIRE_TEMPLE_CLEAR"))],
      ["RC_VOLVAGIA", () => (L.Get("LOGIC_FIRE_TEMPLE_CLEAR"))]
    ],
      exits:[
      ["RR_FIRE_TEMPLE_BOSS_ENTRYWAY", () => false],
      ["RR_DMC_PAD_ENTRY", () => (L.Get("LOGIC_FIRE_TEMPLE_CLEAR"))]
    ] },
    RR_FOREST_TEMPLE_ENTRYWAY:{ name:"Forest Temple Entryway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_TREES", () => (!L.mq("FOREST_TEMPLE"))],
      ["RR_FOREST_TEMPLE_MQ_TREES", () => (L.mq("FOREST_TEMPLE"))],
      ["RR_SACRED_FOREST_MEADOW", () => true]
    ] },
    RR_FOREST_TEMPLE_TREES:{ name:"Forest Temple Trees", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_FIRST_ROOM_CHEST", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_GS_FIRST_ROOM", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && ((L.IsAdult && L.CanUse("RG_BOMB_BAG")) || L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_BOOMERANG") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_BOMBCHU_5") || L.CanUse("RG_DINS_FIRE") || (L.trick("RT_FOREST_FIRST_GS") && (L.CanJumpslashExceptHammer() || (L.IsChild && L.CanUse("RG_BOMB_BAG"))))))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_ENTRYWAY", () => true],
      ["RR_FOREST_TEMPLE_OVERGROWN_HALLWAY_LOWER", () => true]
    ] },
    RR_FOREST_TEMPLE_OVERGROWN_HALLWAY_LOWER:{ name:"Forest Temple Overgrown Hallway Lower", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_TREES", () => true],
      ["RR_FOREST_TEMPLE_OVERGROWN_HALLWAY_UPPER", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_FOREST_TEMPLE_OVERGROWN_HALLWAY_UPPER:{ name:"Forest Temple Overgrown Hallway Upper", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_OVERGROWN_HALLWAY_LOWER", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_FOREST_TEMPLE_LOBBY", () => true]
    ] },
    RR_FOREST_TEMPLE_LOBBY:{ name:"Forest Temple Lobby", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MEG", () => (L.Get("LOGIC_FOREST_JOELLE") && L.Get("LOGIC_FOREST_BETH") && L.Get("LOGIC_FOREST_AMY") && L.CanKillEnemy("RE_MEG"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_GS_LOBBY", () => (L.HookshotOrBoomerang())],
      ["RC_FOREST_TEMPLE_LOBBY_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_LOBBY_POT_2", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_LOBBY_POT_3", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_LOBBY_POT_4", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_LOBBY_POT_5", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_LOBBY_POT_6", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_OVERGROWN_HALLWAY_UPPER", () => true],
      ["RR_FOREST_TEMPLE_NORTH_HALLWAY", () => true],
      ["RR_FOREST_TEMPLE_NW_COURTYARD_LOWER", () => (L.CanUse("RG_SONG_OF_TIME") || L.IsChild)],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_LOWER", () => (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT"))],
      ["RR_FOREST_TEMPLE_RED_DOORMAT_HALLWAY", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 1))],
      ["RR_FOREST_TEMPLE_BLUE_DOORMAT_HALLWAY", () => false],
      ["RR_FOREST_TEMPLE_BASEMENT", () => (L.Get("LOGIC_FOREST_MEG"))],
      ["RR_FOREST_TEMPLE_BOSS_ENTRYWAY", () => false]
    ] },
    RR_FOREST_TEMPLE_NORTH_HALLWAY:{ name:"Forest Temple North Hallway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_LOBBY", () => true],
      ["RR_FOREST_TEMPLE_LOWER_STALFOS", () => true]
    ] },
    RR_FOREST_TEMPLE_LOWER_STALFOS:{ name:"Forest Temple Lower Stalfos", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH", () => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_FIRST_STALFOS_CHEST", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_LOWER_STALFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_LOWER_STALFOS_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NORTH_HALLWAY", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH"))]
    ] },
    RR_FOREST_TEMPLE_NW_COURTYARD_LOWER:{ name:"Forest Temple NW Courtyard Lower", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_GS_LEVEL_ISLAND_COURTYARD", () => (L.CanUse("RG_LONGSHOT"))],
      ["RC_FOREST_TEMPLE_COURTYARD_RIGHT_HEART", () => (L.CanUse("RG_BOOMERANG") && L.trick("RT_FOREST_COURTYARD_HEARTS_BOOMERANG"))],
      ["RC_FOREST_TEMPLE_COURTYARD_LEFT_HEART", () => (L.CanUse("RG_BOOMERANG") && L.trick("RT_FOREST_COURTYARD_HEARTS_BOOMERANG"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_LOBBY", () => true],
      ["RR_FOREST_TEMPLE_NW_COURTYARD_UPPER", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.CanUse("RG_HOVER_BOOTS") && ((L.trick("RT_HOVER_BOOST_SIMPLE") && (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives())) || L.CanMiddairGroundJump()))],
      ["RR_FOREST_TEMPLE_NW_COURTYARD_UPPER_ALCOVE", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))],
      ["RR_FOREST_TEMPLE_SEWER", () => (L.HasItem("RG_GOLDEN_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_FOREST_TEMPLE_DRAINED_SEWER", () => (L.Get("LOGIC_FOREST_DRAINED_WELL"))],
      ["RR_FOREST_TEMPLE_BOSS_ENTRYWAY", () => false]
    ] },
    RR_FOREST_TEMPLE_NW_COURTYARD_UPPER_ALCOVE:{ name:"Forest Temple NW Courtyard Upper Alcove", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_NW_COURTYARD_LOWER", () => true],
      ["RR_FOREST_TEMPLE_MAP_ROOM", () => true],
      ["RR_FOREST_TEMPLE_NW_COURTYARD_UPPER", () => (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER"))]
    ] },
    RR_FOREST_TEMPLE_NW_COURTYARD_UPPER:{ name:"Forest Temple NW Courtyard Upper", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_GS_LEVEL_ISLAND_COURTYARD", () => (L.HookshotOrBoomerang())],
      ["RC_FOREST_TEMPLE_COURTYARD_RIGHT_HEART", () => true],
      ["RC_FOREST_TEMPLE_COURTYARD_LEFT_HEART", () => true]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NW_COURTYARD_LOWER", () => true],
      ["RR_FOREST_TEMPLE_BELOW_BOSS_KEY_CHEST", () => true],
      ["RR_FOREST_TEMPLE_FLOORMASTER_ROOM", () => true],
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_COURTYARD_ALCOVE", () => true]
    ] },
    RR_FOREST_TEMPLE_NE_COURTYARD_LOWER:{ name:"Forest Temple NE Courtyard Lower", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_GS_RAISED_ISLAND_COURTYARD", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_FOREST_COURTYARD_EAST_GS") && L.CanUse("RG_BOOMERANG")))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_LOBBY", () => true],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_UPPER", () => (L.CanUse("RG_LONGSHOT") || (L.trick("RT_FOREST_VINES") && L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_CLIMB")))],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_ISLAND", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_FOREST_TEMPLE_SEWER", () => ((((L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_LONGSHOT") || (L.trick("RT_FOREST_WELL_SWIM") && L.CanUse("RG_HOOKSHOT"))) && L.HasItem("RG_BRONZE_SCALE")) || L.HasItem("RG_GOLDEN_SCALE")) && L.WaterTimer() >= 16)],
      ["RR_FOREST_TEMPLE_DRAINED_SEWER", () => (L.Get("LOGIC_FOREST_DRAINED_WELL"))]
    ] },
    RR_FOREST_TEMPLE_NE_COURTYARD_UPPER:{ name:"Forest Temple NE Courtyard Upper", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_FOREST_DRAINED_WELL", () => true]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_NE_COURTYARD_LOWER", () => true],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_ISLAND", () => (L.IsAdult && L.trick("RT_FOREST_COURTYARD_LEDGE") && L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_DOORFRAME", () => (L.CanHammerRecoilHover() || ((L.trick("RT_FOREST_DOORFRAME") && L.CanUse("RG_HOVER_BOOTS") && L.CanJumpslash())))],
      ["RR_FOREST_TEMPLE_MAP_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_NE_COURTYARD_DOORFRAME:{ name:"Forest Temple NE Courtyard Doorframe", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_SUMMON_NE_SCARECROW", () => (L.ScarecrowsSong())]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_NE_COURTYARD_LOWER", () => true],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_ISLAND", () => (L.CanHammerRecoilHover())]
    ] },
    RR_FOREST_TEMPLE_NE_COURTYARD_ISLAND:{ name:"Forest Temple NE Courtyard Island", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_RAISED_ISLAND_COURTYARD_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NE_COURTYARD_LOWER", () => true],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_SCARECROW_LEDGE", () => (L.Get("LOGIC_FOREST_SUMMON_NE_SCARECROW") && L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_FOREST_TEMPLE_NE_COURTYARD_SCARECROW_LEDGE:{ name:"Forest Temple NE Courtyard Scarecrow Ledge", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_SUMMON_NE_SCARECROW", () => (L.ScarecrowsSong())]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_GS_RAISED_ISLAND_COURTYARD", () => (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_DINS_FIRE") || L.HasExplosives())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NE_COURTYARD_ISLAND", () => true],
      ["RR_FOREST_TEMPLE_FALLING_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_MAP_ROOM:{ name:"Forest Temple Map Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MAP_CHEST", () => (L.CanKillEnemy("RE_BLUE_BUBBLE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NW_COURTYARD_LOWER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_BLUE_BUBBLE")))))],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_UPPER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_BLUE_BUBBLE")))))]
    ] },
    RR_FOREST_TEMPLE_SEWER:{ name:"Forest Temple Sewer", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_WELL_CHEST", () => (L.CanOpenUnderwaterChest() && L.WaterTimer() >= 8)],
      ["RC_FOREST_TEMPLE_WELL_WEST_HEART", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)],
      ["RC_FOREST_TEMPLE_WELL_EAST_HEART", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NW_COURTYARD_LOWER", () => (L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_LOWER", () => (L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_FOREST_TEMPLE_DRAINED_SEWER:{ name:"Forest Temple Drained Well", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_WELL_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_WELL_WEST_HEART", () => true],
      ["RC_FOREST_TEMPLE_WELL_EAST_HEART", () => true]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NW_COURTYARD_LOWER", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_FOREST_TEMPLE_NE_COURTYARD_LOWER", () => (L.HasItem("RG_CLIMB"))]
    ] },
    RR_FOREST_TEMPLE_BELOW_BOSS_KEY_CHEST:{ name:"Forest Temple Below Boss Key Chest", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_NW_COURTYARD_UPPER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_BLUE_BUBBLE")))))]
    ] },
    RR_FOREST_TEMPLE_FLOORMASTER_ROOM:{ name:"Forest Temple Floormaster Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_FLOORMASTER_CHEST", () => (L.CanDamage() && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NW_COURTYARD_UPPER", () => true]
    ] },
    RR_FOREST_TEMPLE_RED_DOORMAT_HALLWAY:{ name:"Forest Temple West Hallway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_LOBBY", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 1))],
      ["RR_FOREST_TEMPLE_RED_DOORMAT_HALLWAY_DOORMAT", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_FOREST_TEMPLE_RED_DOORMAT_HALLWAY_DOORMAT:{ name:"Forest Temple West Hallway Doormat", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_RED_DOORMAT_HALLWAY", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_FLOOR", () => true]
    ] },
    RR_FOREST_TEMPLE_BLOCK_PUSH_FLOOR:{ name:"Forest Temple Lower Block Push Floor", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_RED_DOORMAT_HALLWAY_DOORMAT", () => true],
      ["RR_FOREST_TEMPLE_LOWER_BLOCK_PUSH_ROOM", () => (L.HasItem("RG_CLIMB") || (L.IsAdult && L.CanGroundJump()))]
    ] },
    RR_FOREST_TEMPLE_LOWER_BLOCK_PUSH_ROOM:{ name:"Forest Temple Lower Block Push Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_FLOOR", () => true],
      ["RR_FOREST_TEMPLE_MIDDLE_BLOCK_PUSH_ROOM", () => (L.HasItem("RG_CLIMB") && L.HasItem("RG_GORONS_BRACELET"))],
      ["RR_FOREST_TEMPLE_UPPER_BLOCK_PUSH_ROOM", () => (L.IsAdult && L.CanGroundJump() && L.HasItem("RG_GORONS_BRACELET") && L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_COURTYARD_ALCOVE", () => (L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_FOREST_TEMPLE_MIDDLE_BLOCK_PUSH_ROOM:{ name:"Forest Temple Middle Block Push Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_EYE_SWITCH_CHEST", () => (L.CanHitEyeTargets() && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_LOWER_BLOCK_PUSH_ROOM", () => true],
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_COURTYARD_ALCOVE", () => (L.trick("RT_FOREST_OUTSIDE_BACKDOOR") && L.CanJumpslashExceptHammer())],
      ["RR_FOREST_TEMPLE_UPPER_BLOCK_PUSH_ROOM", () => (L.IsAdult && L.HasItem("RG_GORONS_BRACELET"))]
    ] },
    RR_FOREST_TEMPLE_UPPER_BLOCK_PUSH_ROOM:{ name:"Forest Temple Upper Block Push Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MIDDLE_BLOCK_PUSH_ROOM", () => true],
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_TOP", () => (L.HasItem("RG_CLIMB"))]
    ] },
    RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_TOP:{ name:"Forest Temple Block Push Room Top", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_UPPER_BLOCK_PUSH_ROOM", () => true],
      ["RR_FOREST_TEMPLE_NW_HALLWAY_TWISTED", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 2))],
      ["RR_FOREST_TEMPLE_NW_HALLWAY_STRAIGHTENED", () => (L.CanHitEyeTargets() && L.SmallKeys("SCENE_FOREST_TEMPLE", 2))]
    ] },
    RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_COURTYARD_ALCOVE:{ name:"Forest Temple Block Push Room Courtyard Alcove", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_LOWER_BLOCK_PUSH_ROOM", () => true],
      ["RR_FOREST_TEMPLE_NW_COURTYARD_UPPER", () => true]
    ] },
    RR_FOREST_TEMPLE_NW_HALLWAY_TWISTED:{ name:"Forest Temple NW Hallway Twisted", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_TOP", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 2))],
      ["RR_FOREST_TEMPLE_RED_POE_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 3))]
    ] },
    RR_FOREST_TEMPLE_NW_HALLWAY_STRAIGHTENED:{ name:"Forest Temple NW Hallway Straightened", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_BOSS_KEY_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_BELOW_BOSS_KEY_CHEST", () => true],
      ["RR_FOREST_TEMPLE_BLOCK_PUSH_ROOM_TOP", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 2))]
    ] },
    RR_FOREST_TEMPLE_RED_POE_ROOM:{ name:"Forest Temple Red Poe Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_JOELLE", () => (L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_RED_POE_CHEST", () => (L.Get("LOGIC_FOREST_JOELLE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NW_HALLWAY_TWISTED", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 3))],
      ["RR_FOREST_TEMPLE_UPPER_STALFOS", () => true]
    ] },
    RR_FOREST_TEMPLE_UPPER_STALFOS:{ name:"Forest Temple Upper Stalfos", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH", () => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_BOW_CHEST", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 3) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_UPPER_STALFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_UPPER_STALFOS_POT_2", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_UPPER_STALFOS_POT_3", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_UPPER_STALFOS_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_RED_POE_ROOM", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 3))],
      ["RR_FOREST_TEMPLE_BLUE_POE_ROOM", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 3))]
    ] },
    RR_FOREST_TEMPLE_BLUE_POE_ROOM:{ name:"Forest Temple Blue Poe Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_BETH", () => (L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_BLUE_POE_CHEST", () => (L.Get("LOGIC_FOREST_BETH") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_BLUE_POE_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_BLUE_POE_POT_2", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_BLUE_POE_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_UPPER_STALFOS", () => true],
      ["RR_FOREST_TEMPLE_NE_HALLWAY_STRAIGHTENED", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 4))]
    ] },
    RR_FOREST_TEMPLE_NE_HALLWAY_STRAIGHTENED:{ name:"Forest Temple NE Hallway Straightened", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_BLUE_POE_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 4))],
      ["RR_FOREST_TEMPLE_FROZEN_EYE_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 5))]
    ] },
    RR_FOREST_TEMPLE_NE_HALLWAY_TWISTED:{ name:"Forest Temple NE Hallway Twisted", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_FROZEN_EYE_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 5))],
      ["RR_FOREST_TEMPLE_FALLING_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_FROZEN_EYE_ROOM:{ name:"Forest Temple Frozen Eye Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_FROZEN_EYE_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_FROZEN_EYE_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NE_HALLWAY_STRAIGHTENED", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 5))],
      ["RR_FOREST_TEMPLE_NE_HALLWAY_TWISTED", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 5) && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_DINS_FIRE")))]
    ] },
    RR_FOREST_TEMPLE_FALLING_ROOM:{ name:"Forest Temple Falling Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_FALLING_CEILING_ROOM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_NE_COURTYARD_SCARECROW_LEDGE", () => true],
      ["RR_FOREST_TEMPLE_GREEN_POE_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_GREEN_POE_ROOM:{ name:"Forest Temple Green Poe Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_AMY", () => (L.CanUse("RG_FAIRY_BOW") && L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_GREEN_POE_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_GREEN_POE_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_FALLING_ROOM", () => true],
      ["RR_FOREST_TEMPLE_BLUE_DOORMAT_HALLWAY_DOORMAT", () => (L.Get("LOGIC_FOREST_AMY"))]
    ] },
    RR_FOREST_TEMPLE_BLUE_DOORMAT_HALLWAY_DOORMAT:{ name:"Forest Temple Blue Doormat Hallway Doormat", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_GREEN_POE_ROOM", () => true],
      ["RR_FOREST_TEMPLE_BLUE_DOORMAT_HALLWAY", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_FOREST_TEMPLE_BLUE_DOORMAT_HALLWAY:{ name:"Forest Temple Blue Doormat Hallway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_BLUE_DOORMAT_HALLWAY_DOORMAT", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_FOREST_TEMPLE_LOBBY", () => true]
    ] },
    RR_FOREST_TEMPLE_BASEMENT:{ name:"Forest Temple Basement", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_OPEN_BOSS_HALLWAY", () => (L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_BASEMENT_CHEST", () => (L.HasItem("RG_POWER_BRACELET") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_GS_BASEMENT", () => (L.HasItem("RG_POWER_BRACELET") && L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_LOBBY", () => true],
      ["RR_FOREST_TEMPLE_BOSS_ENTRYWAY", () => (L.Get("LOGIC_FOREST_OPEN_BOSS_HALLWAY"))]
    ] },
    RR_FOREST_TEMPLE_MQ_TREES:{ name:"Forest Temple MQ Trees", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_FIRST_ROOM_CHEST", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && (L.CanPassEnemy("RE_BIG_SKULLTULA", "ED_SHORT_JUMPSLASH", false) || L.CanUse("RG_HOVER_BOOTS")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_ENTRYWAY", () => true],
      ["RR_FOREST_TEMPLE_MQ_OVERGROWN_HALLWAY_LOWER", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_OVERGROWN_HALLWAY_LOWER:{ name:"Forest Temple MQ Overgrown Hallway Lower", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_TREES", () => true],
      ["RR_FOREST_TEMPLE_MQ_OVERGROWN_HALLWAY_UPPER", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_FOREST_TEMPLE_MQ_OVERGROWN_HALLWAY_UPPER:{ name:"Forest Temple MQ Overgrown Hallway Upper", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_GS_FIRST_HALLWAY", () => (L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_OVERGROWN_HALLWAY_LOWER", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_FOREST_TEMPLE_MQ_LOBBY", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 1))]
    ] },
    RR_FOREST_TEMPLE_MQ_LOBBY:{ name:"Forest Temple MQ Lobby", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MEG", () => (L.Get("LOGIC_FOREST_JOELLE") && L.Get("LOGIC_FOREST_BETH") && L.Get("LOGIC_FOREST_AMY") && L.CanKillEnemy("RE_MEG"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_LOBBY_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_LOBBY_POT_2", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_LOBBY_POT_3", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_LOBBY_POT_4", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_LOBBY_POT_5", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_LOBBY_POT_6", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_OVERGROWN_HALLWAY_UPPER", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 1))],
      ["RR_FOREST_TEMPLE_MQ_NORTH_HALLWAY", () => true],
      ["RR_FOREST_TEMPLE_MQ_RED_DOORMAT_HALLWAY", () => true],
      ["RR_FOREST_TEMPLE_MQ_BLUE_DOORMAT_HALLWAY", () => false],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD", () => (L.CanHitEyeTargets())],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD", () => (L.CanHitEyeTargets())],
      ["RR_FOREST_TEMPLE_MQ_BASEMENT", () => (L.Get("LOGIC_FOREST_MEG"))]
    ] },
    RR_FOREST_TEMPLE_MQ_NORTH_HALLWAY:{ name:"Forest Temple MQ North Hallway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_LOBBY", () => true],
      ["RR_FOREST_TEMPLE_MQ_WOLFOS_ROOM", () => (L.IsChild || L.CanUse("RG_SONG_OF_TIME"))]
    ] },
    RR_FOREST_TEMPLE_MQ_WOLFOS_ROOM:{ name:"Forest Temple MQ Wolfos Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH", () => (L.CanKillEnemy("RE_WOLFOS"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_WOLFOS_CHEST", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_MQ_WOLFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_WOLFOS_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NORTH_HALLWAY", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && (L.IsChild || L.CanUse("RG_SONG_OF_TIME")))]
    ] },
    RR_FOREST_TEMPLE_MQ_RED_DOORMAT_HALLWAY:{ name:"Forest Temple MQ Red Doormat Hallway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_LOBBY", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS")))))],
      ["RR_FOREST_TEMPLE_MQ_BLOCK_PUZZLE_FLOOR", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS")))))]
    ] },
    RR_FOREST_TEMPLE_MQ_BLOCK_PUZZLE_FLOOR:{ name:"Forest Temple MQ Block Puzzle Floor", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MQ_BLOCK_ROOM_TARGETS", () => ((L.trick("RT_FOREST_MQ_BLOCK_PUZZLE") && L.CanUse("RG_BOMBCHU_5")))],
      ["LOGIC_FOREST_CAN_TWIST_HALLWAY", () => ((L.trick("RT_FOREST_MQ_RANG_HALLWAY_SWITCH") && L.CanUse("RG_BOOMERANG")) || (L.trick("RT_FOREST_MQ_HOOKSHOT_HALLWAY_SWITCH") && L.CanUse("RG_HOOKSHOT")))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_GS_BLOCK_PUSH_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_RED_DOORMAT_HALLWAY", () => true],
      ["RR_FOREST_TEMPLE_MQ_LOWER_BLOCK_PUZZLE", () => (((L.HasItem("RG_CLIMB") || (L.IsAdult && L.CanGroundJump())) && (L.HasItem("RG_GORONS_BRACELET") || L.CanUse("RG_HOVER_BOOTS"))) || (L.Get("LOGIC_FOREST_MQ_BLOCK_ROOM_TARGETS") && L.CanUse("RG_HOOKSHOT")))],
      ["RR_FOREST_TEMPLE_MQ_INDOOR_LEDGE", () => (L.Get("LOGIC_FOREST_CAN_TWIST_HALLWAY") && L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_FOREST_TEMPLE_MQ_LOWER_BLOCK_PUZZLE:{ name:"Forest Temple MQ Lower Block Puzzle", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_CAN_TWIST_HALLWAY", () => ((L.trick("RT_FOREST_MQ_JS_HALLWAY_SWITCH") && L.CanUse("RG_HOVER_BOOTS") && (L.IsAdult && L.CanJumpslash()) || (L.CanUse("RG_STICKS") || L.CanUse("RG_BIGGORON_SWORD") || (L.Get("LOGIC_FOREST_MQ_BLOCK_ROOM_TARGETS") && L.CanUse("RG_MASTER_SWORD")))))]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_BLOCK_PUZZLE_FLOOR", () => true],
      ["RR_FOREST_TEMPLE_MQ_MIDDLE_BLOCK_PUZZLE", () => ((L.HasItem("RG_GORONS_BRACELET") && (L.HasItem("RG_CLIMB") || (L.IsAdult && L.CanGroundJump()))) || L.Get("LOGIC_FOREST_MQ_BLOCK_ROOM_TARGETS"))],
      ["RR_FOREST_TEMPLE_MQ_INDOOR_LEDGE", () => (L.Get("LOGIC_FOREST_CAN_TWIST_HALLWAY") && L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_FOREST_TEMPLE_MQ_MIDDLE_BLOCK_PUZZLE:{ name:"Forest Temple MQ Middle Block Puzzle", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MQ_BLOCK_ROOM_TARGETS", () => ((L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_LONGSHOT")))],
      ["LOGIC_FOREST_CAN_TWIST_HALLWAY", () => (L.trick("RT_FOREST_MQ_JS_HALLWAY_SWITCH") && (L.IsAdult && L.CanJumpslash()) || (L.CanUse("RG_HOVER_BOOTS") && (L.CanUse("RG_STICKS") || L.CanUse("RG_BIGGORON_SWORD") || L.CanUse("RG_MASTER_SWORD"))))]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_LOWER_BLOCK_PUZZLE", () => true],
      ["RR_FOREST_TEMPLE_MQ_UPPER_BLOCK_PUZZLE", () => ((L.IsAdult && L.HasItem("RG_GORONS_BRACELET")) || (L.Get("LOGIC_FOREST_MQ_BLOCK_ROOM_TARGETS") && L.CanUse("RG_HOOKSHOT")))],
      ["RR_FOREST_TEMPLE_MQ_INDOOR_LEDGE", () => (L.Get("LOGIC_FOREST_CAN_TWIST_HALLWAY") && L.CanUse("RG_HOVER_BOOTS") || (L.trick("RT_FOREST_OUTSIDE_BACKDOOR") && (L.CanJumpslashExceptHammer() || (L.IsAdult && L.CanUse("RG_MEGATON_HAMMER")))))]
    ] },
    RR_FOREST_TEMPLE_MQ_UPPER_BLOCK_PUZZLE:{ name:"Forest Temple MQ Upper Block Puzzle", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MQ_BLOCK_ROOM_TARGETS", () => (L.CanHitSwitch())]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_MIDDLE_BLOCK_PUZZLE", () => true],
      ["RR_FOREST_TEMPLE_MQ_BLOCK_PUZZLE_TOP", () => (L.HasItem("RG_CLIMB"))]
    ] },
    RR_FOREST_TEMPLE_MQ_BLOCK_PUZZLE_TOP:{ name:"Forest Temple MQ Block Puzzle Top", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_UPPER_BLOCK_PUZZLE", () => true],
      ["RR_FOREST_TEMPLE_MQ_STRAIGHT_HALLWAY", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 3))],
      ["RR_FOREST_TEMPLE_MQ_JOELLE_ROOM", () => (L.Get("LOGIC_FOREST_CAN_TWIST_HALLWAY") && L.SmallKeys("SCENE_FOREST_TEMPLE", 4))],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 2) && L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLOORMASTER")))))]
    ] },
    RR_FOREST_TEMPLE_MQ_STRAIGHT_HALLWAY:{ name:"Forest Temple MQ Straight Hallway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_BOSS_KEY_CHEST", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 3) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_FLOORMASTER_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_FLOORMASTER_ROOM:{ name:"Forest Temple MQ Floormaster Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_LEDGE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLOORMASTER")))))]
    ] },
    RR_FOREST_TEMPLE_MQ_INDOOR_LEDGE:{ name:"Forest Temple MQ Indoor Ledge", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_CAN_TWIST_HALLWAY", () => (L.CanHitSwitch())]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_LOWER_BLOCK_PUZZLE", () => (L.Get("LOGIC_FOREST_CAN_TWIST_HALLWAY"))],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_LEDGE", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_NW_COURTYARD_LEDGE:{ name:"Forest Temple MQ Outdoor Ledge", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_COURTYARD_RIGHT_HEART", () => true],
      ["RC_FOREST_TEMPLE_MQ_COURTYARD_MIDDLE_HEART", () => true],
      ["RC_FOREST_TEMPLE_MQ_COURTYARD_LEFT_HEART", () => true]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_INDOOR_LEDGE", () => true],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD", () => true],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_WELL_LEDGE", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_FOREST_TEMPLE_MQ_REDEAD_ROOM", () => true],
      ["RR_FOREST_TEMPLE_MQ_FLOORMASTER_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_REDEAD_ROOM:{ name:"Forest Temple MQ Redead Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_REDEAD_CHEST", () => (L.CanKillEnemy("RE_REDEAD") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_LEDGE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_REDEAD")))))]
    ] },
    RR_FOREST_TEMPLE_MQ_NW_COURTYARD:{ name:"Forest Temple MQ NW Courtyard", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MQ_BURNED_WEB", () => (L.CanUse("RG_FIRE_ARROWS"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_GS_WELL", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8 && L.CanUse("RG_HOOKSHOT")))],
      ["RC_FOREST_TEMPLE_MQ_COURTYARD_RIGHT_HEART", () => (L.CanUse("RG_BOOMERANG") && L.trick("RT_FOREST_COURTYARD_HEARTS_BOOMERANG"))],
      ["RC_FOREST_TEMPLE_MQ_COURTYARD_MIDDLE_HEART", () => (L.CanUse("RG_BOOMERANG") && L.trick("RT_FOREST_COURTYARD_HEARTS_BOOMERANG"))],
      ["RC_FOREST_TEMPLE_MQ_COURTYARD_LEFT_HEART", () => (L.CanUse("RG_BOOMERANG") && L.trick("RT_FOREST_COURTYARD_HEARTS_BOOMERANG"))],
      ["RC_FOREST_TEMPLE_MQ_WELL_WEST_HEART", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)],
      ["RC_FOREST_TEMPLE_MQ_WELL_MIDDLE_HEART", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)],
      ["RC_FOREST_TEMPLE_MQ_WELL_EAST_HEART", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_WELL_LEDGE", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD", () => (L.HasItem("RG_CLIMB") && (L.Get("LOGIC_FOREST_DRAINED_WELL") || ((((L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_LONGSHOT") || (L.trick("RT_FOREST_WELL_SWIM") && L.CanUse("RG_HOOKSHOT"))) && L.HasItem("RG_BRONZE_SCALE")) || L.HasItem("RG_GOLDEN_SCALE")) && L.WaterTimer() >= 16)))],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_UPPER_ALCOVE", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")) && L.Get("LOGIC_FOREST_MQ_BURNED_WEB") && (L.CanKillEnemy("RE_BIG_SKULLTULA", "ED_LONGSHOT") || L.CanUse("RG_BOMBCHU_5")))]
    ] },
    RR_FOREST_TEMPLE_MQ_NW_COURTYARD_WELL_LEDGE:{ name:"Forest Temple MQ NW Courtyard Well Ledge", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_GS_LEVEL_ISLAND_COURTYARD", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD", () => true],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_LEDGE", () => (L.CanUse("RG_HOVER_BOOTS") && ((L.trick("RT_HOVER_BOOST_SIMPLE") && L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives()) || L.CanMiddairGroundJump()))]
    ] },
    RR_FOREST_TEMPLE_MQ_NW_COURTYARD_UPPER_ALCOVE:{ name:"Forest Temple MQ NW Courtyard Upper Alcove", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MQ_BURNED_WEB", () => (L.HasFireSource())]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD", () => (L.CanPassEnemy("RE_BIG_SKULLTULA") || L.TakeDamage())],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_LEDGE", () => (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER"))],
      ["RR_FOREST_TEMPLE_MQ_NORTH_PASSAGE", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_NORTH_PASSAGE:{ name:"Forest Temple MQ North Passage", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_MQ_BURNED_WEB", () => (L.HasFireSourceWithTorch())]
    ],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD_UPPER_ALCOVE", () => (L.Get("LOGIC_FOREST_MQ_BURNED_WEB"))],
      ["RR_FOREST_TEMPLE_MQ_COURTYARD_TOP_LEDGES", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_NE_COURTYARD:{ name:"Forest Temple MQ NE Courtyard", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_FOREST_DRAINED_WELL", () => (L.CanHitEyeTargets())]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_WELL_CHEST", () => ((L.Get("LOGIC_FOREST_DRAINED_WELL") && L.HasItem("RG_OPEN_CHEST")) || (L.CanOpenUnderwaterChest() && L.WaterTimer() >= 8))],
      ["RC_FOREST_TEMPLE_MQ_GS_RAISED_ISLAND_COURTYARD", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_FOREST_TEMPLE_MQ_GS_WELL", () => (L.Get("LOGIC_FOREST_DRAINED_WELL") || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT")))],
      ["RC_FOREST_TEMPLE_MQ_WELL_WEST_HEART", () => (L.Get("LOGIC_FOREST_DRAINED_WELL") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))],
      ["RC_FOREST_TEMPLE_MQ_WELL_MIDDLE_HEART", () => (L.Get("LOGIC_FOREST_DRAINED_WELL") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))],
      ["RC_FOREST_TEMPLE_MQ_WELL_EAST_HEART", () => (L.Get("LOGIC_FOREST_DRAINED_WELL") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_LOBBY", () => true],
      ["RR_FOREST_TEMPLE_MQ_NW_COURTYARD", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && (((L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_LONGSHOT")) && L.HasItem("RG_BRONZE_SCALE")) || L.HasItem("RG_GOLDEN_SCALE")) && L.WaterTimer() >= 16)],
      ["RR_FOREST_TEMPLE_MQ_COURTYARD_TOP_LEDGES", () => (L.CanUse("RG_LONGSHOT") || (L.trick("RT_FOREST_VINES") && L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_CLIMB")) || (L.CanUse("RG_HOOKSHOT") && ((L.IsAdult && L.CanUse("RG_HOVER_BOOTS") && L.HasItem("RG_CLIMB")) || L.CanUse("RG_SONG_OF_TIME"))))],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD_ISLAND", () => (L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_FOREST_TEMPLE_MQ_NE_COURTYARD_DOORFRAME:{ name:"Forest Temple MQ NE Courtyard Doorframe", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_GS_RAISED_ISLAND_COURTYARD", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_BOMB_THROW") || L.CanUse("RG_MEGATON_HAMMER") || (L.CanStandingShield() && (L.CanUse("RG_STICKS") || L.CanUse("RG_BIGGORON_SWORD") || L.CanUse("RG_MASTER_SWORD") || (L.IsChild && L.CanUse("RG_KOKIRI_SWORD")))))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD", () => true],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD_ISLAND", () => (L.CanHammerRecoilHover())]
    ] },
    RR_FOREST_TEMPLE_MQ_COURTYARD_TOP_LEDGES:{ name:"Forest Temple MQ Courtyard Top Ledges", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_RAISED_ISLAND_COURTYARD_UPPER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NORTH_PASSAGE", () => true],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD", () => true],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD_DOORFRAME", () => (L.CanHammerRecoilHover() || ((L.trick("RT_FOREST_DOORFRAME") && L.CanUse("RG_HOVER_BOOTS") && L.CanJumpslash())) || (L.IsChild && (L.trick("RT_FOREST_MQ_CHILD_DOORFRAME") || L.CanMiddairGroundJump())))],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD_ISLAND", () => (L.trick("RT_FOREST_COURTYARD_LEDGE") && L.CanUse("RG_HOVER_BOOTS") && L.CanJumpslash() && L.TakeDamage())]
    ] },
    RR_FOREST_TEMPLE_MQ_NE_COURTYARD_ISLAND:{ name:"Forest Temple MQ NE Courtyard Island", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_RAISED_ISLAND_COURTYARD_LOWER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD", () => true],
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD_LEDGE_ABOVE_ISLAND", () => (L.CanUse("RG_SONG_OF_TIME"))]
    ] },
    RR_FOREST_TEMPLE_MQ_NE_COURTYARD_LEDGE_ABOVE_ISLAND:{ name:"Forest Temple MQ NE Courtyard Ledge Above Island", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD_ISLAND", () => true],
      ["RR_FOREST_TEMPLE_MQ_FALLING_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_JOELLE_ROOM:{ name:"Forest Temple MQ Joelle Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_JOELLE", () => (L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_MAP_CHEST", () => (L.Get("LOGIC_FOREST_JOELLE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_UPPER_BLOCK_PUZZLE", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 4))],
      ["RR_FOREST_TEMPLE_MQ_3_STALFOS_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_3_STALFOS_ROOM:{ name:"Forest Temple MQ 3 Stalfos Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH", () => (L.CanKillEnemy("RE_WOLFOS"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_BOW_CHEST", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 3) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_MQ_UPPER_STALFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_UPPER_STALFOS_POT_2", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_UPPER_STALFOS_POT_3", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_UPPER_STALFOS_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_JOELLE_ROOM", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 3))],
      ["RR_FOREST_TEMPLE_MQ_BETH_ROOM", () => (L.Get("LOGIC_FOREST_CLEAR_BETWEEN_JOELLE_AND_BETH") && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 3))]
    ] },
    RR_FOREST_TEMPLE_MQ_BETH_ROOM:{ name:"Forest Temple MQ Beth Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_BETH", () => (L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_COMPASS_CHEST", () => (L.Get("LOGIC_FOREST_BETH") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_FOREST_TEMPLE_MQ_BLUE_POE_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_BLUE_POE_POT_2", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_BLUE_POE_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_FALLING_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 5) && L.AnyAgeTime((() => (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_DINS_FIRE")))))],
      ["RR_FOREST_TEMPLE_MQ_TORCH_SHOT_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 6))],
      ["RR_FOREST_TEMPLE_MQ_3_STALFOS_ROOM", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_TORCH_SHOT_ROOM:{ name:"Forest Temple MQ Torch Shot Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_FROZEN_EYE_SWITCH_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_FOREST_TEMPLE_MQ_FROZEN_EYE_SWITCH_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())],
      ["RC_FOREST_TEMPLE_MQ_FROZEN_EYE_SWITCH_SMALL_CRATE_3", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_FALLING_ROOM", () => (L.CanUse(L.HasItem("RG_POWER_BRACELET") ? "RG_FAIRY_BOW" : "RG_FIRE_ARROWS") || L.CanUse("RG_DINS_FIRE"))],
      ["RR_FOREST_TEMPLE_MQ_BETH_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 6))]
    ] },
    RR_FOREST_TEMPLE_MQ_FALLING_ROOM:{ name:"Forest Temple MQ Falling Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_FALLING_CEILING_ROOM_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_NE_COURTYARD_LEDGE_ABOVE_ISLAND", () => true],
      ["RR_FOREST_TEMPLE_MQ_AMY_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 6))]
    ] },
    RR_FOREST_TEMPLE_MQ_AMY_ROOM:{ name:"Forest Temple MQ Amy Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_AMY", () => (L.CanUse("RG_FAIRY_BOW") && L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_GREEN_POE_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_GREEN_POE_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_BLUE_DOORMAT_HALLWAY", () => (L.Get("LOGIC_FOREST_AMY"))],
      ["RR_FOREST_TEMPLE_MQ_FALLING_ROOM", () => (L.SmallKeys("SCENE_FOREST_TEMPLE", 6))]
    ] },
    RR_FOREST_TEMPLE_MQ_BLUE_DOORMAT_HALLWAY:{ name:"Forest Temple MQ Blue Doormat Hallway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_AMY_ROOM", () => true],
      ["RR_FOREST_TEMPLE_MQ_LOBBY", () => true]
    ] },
    RR_FOREST_TEMPLE_MQ_BASEMENT:{ name:"Forest Temple MQ Basement", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[
      ["LOGIC_FOREST_OPEN_BOSS_HALLWAY", () => (L.HasItem("RG_POWER_BRACELET") && L.CanHitEyeTargets())]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_BASEMENT_CHEST", () => (L.HasItem("RG_POWER_BRACELET") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_LOBBY", () => true],
      ["RR_FOREST_TEMPLE_MQ_BASEMENT_POT_ROOM", () => (L.HasItem("RG_POWER_BRACELET") && (L.CanPassEnemy("RE_BIG_SKULLTULA") || L.TakeDamage()))],
      ["RR_FOREST_TEMPLE_BOSS_ENTRYWAY", () => (L.Get("LOGIC_FOREST_OPEN_BOSS_HALLWAY"))]
    ] },
    RR_FOREST_TEMPLE_MQ_BASEMENT_POT_ROOM:{ name:"Forest Temple MQ Basement Pot Room", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_FOREST_TEMPLE_MQ_BASEMENT_POT_1", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_BASEMENT_POT_2", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_BASEMENT_POT_3", () => (L.CanBreakPots())],
      ["RC_FOREST_TEMPLE_MQ_BASEMENT_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_MQ_BASEMENT", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_FOREST_TEMPLE_BOSS_ENTRYWAY:{ name:"Forest Temple Boss Entryway", scene:"SCENE_FOREST_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FOREST_TEMPLE_BASEMENT", () => (!L.mq("FOREST_TEMPLE") && L.Get("LOGIC_FOREST_OPEN_BOSS_HALLWAY"))],
      ["RR_FOREST_TEMPLE_MQ_BASEMENT", () => (L.mq("FOREST_TEMPLE") && L.Get("LOGIC_FOREST_OPEN_BOSS_HALLWAY"))],
      ["RR_FOREST_TEMPLE_BOSS_ROOM", () => (L.HasItem("RG_FOREST_TEMPLE_BOSS_KEY"))]
    ] },
    RR_FOREST_TEMPLE_BOSS_ROOM:{ name:"Forest Temple Boss Room", scene:"SCENE_FOREST_TEMPLE_BOSS", time:false,
      events:[
      ["LOGIC_FOREST_TEMPLE_CLEAR", () => (L.CanKillEnemy("RE_PHANTOM_GANON"))]
    ],
      checks:[
      ["RC_FOREST_TEMPLE_PHANTOM_GANON_HEART", () => (L.Get("LOGIC_FOREST_TEMPLE_CLEAR"))],
      ["RC_PHANTOM_GANON", () => (L.Get("LOGIC_FOREST_TEMPLE_CLEAR"))]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_BOSS_ENTRYWAY", () => false],
      ["RR_SACRED_FOREST_MEADOW", () => (L.Get("LOGIC_FOREST_TEMPLE_CLEAR"))]
    ] },
    RR_GANONS_CASTLE_ENTRYWAY:{ name:"Ganon's Castle Entryway", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_LOBBY", () => (!L.mq("GANONS_CASTLE"))],
      ["RR_GANONS_CASTLE_MQ_LOBBY", () => (L.mq("GANONS_CASTLE"))],
      ["RR_CASTLE_GROUNDS_FROM_GANONS_CASTLE", () => true]
    ] },
    RR_GANONS_CASTLE_LOBBY:{ name:"Ganon's Castle Lobby", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_ENTRYWAY", () => true],
      ["RR_GANONS_CASTLE_MAIN", () => true]
    ] },
    RR_GANONS_CASTLE_MAIN:{ name:"Ganon's Castle Main", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_SHEIK_HINT_GC", () => (L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_LOBBY", () => true],
      ["RR_GANONS_CASTLE_FOREST_TRIAL_WOLFOS_ROOM", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_FOREST_MEDALLION"))],
      ["RR_GANONS_CASTLE_FIRE_TRIAL_FROM_OPEN", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_FIRE_MEDALLION"))],
      ["RR_GANONS_CASTLE_WATER_TRIAL_BLUE_FIRE_ROOM", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_WATER_MEDALLION"))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_START", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_SHADOW_MEDALLION"))],
      ["RR_GANONS_CASTLE_SPIRIT_TRIAL_BEAMOS_ROOM", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_SPIRIT_MEDALLION"))],
      ["RR_GANONS_CASTLE_LIGHT_TRIAL_CHESTS_ROOM", () => ((!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_LIGHT_MEDALLION")) && L.CanUse("RG_GOLDEN_GAUNTLETS"))],
      ["RR_GANONS_TOWER_ENTRYWAY", () => ((L.Get("LOGIC_FOREST_TRIAL_CLEAR") || L.trialSkipped("TK_FOREST_TRIAL")) && (L.Get("LOGIC_FIRE_TRIAL_CLEAR") || L.trialSkipped("TK_FIRE_TRIAL")) && (L.Get("LOGIC_WATER_TRIAL_CLEAR") || L.trialSkipped("TK_WATER_TRIAL")) && (L.Get("LOGIC_SHADOW_TRIAL_CLEAR") || L.trialSkipped("TK_SHADOW_TRIAL")) && (L.Get("LOGIC_SPIRIT_TRIAL_CLEAR") || L.trialSkipped("TK_SPIRIT_TRIAL")) && (L.Get("LOGIC_LIGHT_TRIAL_CLEAR") || L.trialSkipped("TK_LIGHT_TRIAL")))],
      ["RR_GANONS_CASTLE_DEKU_SCRUBS", () => (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_GANONS_CASTLE_DEKU_SCRUBS:{ name:"Ganon's Castle Deku Scrubs", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_GANONS_CASTLE_DEKU_SCRUB_CENTER_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_DEKU_SCRUB_CENTER_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_DEKU_SCRUB_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_DEKU_SCRUB_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_1", () => true],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_2", () => true],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_3", () => true],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_4", () => true],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_5", () => true],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_6", () => true],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_7", () => true],
      ["RC_GANONS_CASTLE_SCRUBS_FAIRY_8", () => true]
    ],
      exits:[] },
    RR_GANONS_CASTLE_FOREST_TRIAL_WOLFOS_ROOM:{ name:"Ganon's Castle Forest Trial Wolfos Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_FOREST_TRIAL_CHEST", () => (L.CanKillEnemy("RE_WOLFOS") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MAIN", () => true],
      ["RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM", () => (L.CanUse("RG_FIRE_ARROWS") || (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_DINS_FIRE")))]
    ] },
    RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM:{ name:"Ganon's Castle Forest Trial Beamos Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FOREST_TRIAL_SILVER_RUPEES", () => (L.IsAdult || L.CanUse("RG_HOOKSHOT"))]
    ],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_FOREST_TRIAL_WOLFOS_ROOM", () => true],
      ["RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM_END", () => true]
    ] },
    RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM_END:{ name:"Ganon's Castle Forest Trial Beamos Room End", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM_FINAL_DOOR", () => (L.IsAdult || L.CanGroundJump() || L.trick("RT_UNINTUITIVE_JUMPS"))]
    ] },
    RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM_FINAL_DOOR:{ name:"Ganon's Castle Forest Trial Beamos Room Final Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM_END", () => true],
      ["RR_GANONS_CASTLE_FOREST_TRIAL_FINAL_ROOM", () => (L.Get("LOGIC_FOREST_TRIAL_SILVER_RUPEES"))]
    ] },
    RR_GANONS_CASTLE_FOREST_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle Forest Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FOREST_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_FOREST_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_FOREST_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_FOREST_TRIAL_BEAMOS_ROOM_FINAL_DOOR", () => true]
    ] },
    RR_GANONS_CASTLE_FIRE_TRIAL_OPEN_DOOR:{ name:"Ganon's Castle Fire Trial Open Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MAIN", () => true]
    ] },
    RR_GANONS_CASTLE_FIRE_TRIAL_FROM_OPEN:{ name:"Ganon's Castle Fire Trial From Open Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FIRE_TRIAL_SILVER_RUPEES", () => (L.FireTimer() >= 48 && L.CanUse("RG_GOLDEN_GAUNTLETS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_FIRE_TRIAL_HEART", () => (L.FireTimer() >= 16)]
    ],
      exits:[
      ["RR_GANONS_CASTLE_FIRE_TRIAL_OPEN_DOOR", () => true],
      ["RR_GANONS_CASTLE_FIRE_TRIAL_BARRED_DOOR", () => (L.CanUse("RG_LONGSHOT") && L.FireTimer() >= 16)]
    ] },
    RR_GANONS_CASTLE_FIRE_TRIAL_FROM_BARRED:{ name:"Ganon's Castle Fire Trial From Barred Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FIRE_TRIAL_SILVER_RUPEES", () => (L.FireTimer() >= 56 && L.CanUse("RG_GOLDEN_GAUNTLETS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_FIRE_TRIAL_HEART", () => (L.FireTimer() >= 16)]
    ],
      exits:[
      ["RR_GANONS_CASTLE_FIRE_TRIAL_OPEN_DOOR", () => (L.CanUse("RG_LONGSHOT") && L.FireTimer() >= 24)],
      ["RR_GANONS_CASTLE_FIRE_TRIAL_BARRED_DOOR", () => true]
    ] },
    RR_GANONS_CASTLE_FIRE_TRIAL_BARRED_DOOR:{ name:"Ganon's Castle Fire Trial Barred Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_FIRE_TRIAL_FINAL_ROOM", () => (L.Get("LOGIC_FIRE_TRIAL_SILVER_RUPEES"))]
    ] },
    RR_GANONS_CASTLE_FIRE_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle Fire Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FIRE_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_FIRE_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_FIRE_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_FIRE_TRIAL_FROM_BARRED", () => true]
    ] },
    RR_GANONS_CASTLE_WATER_TRIAL_BLUE_FIRE_ROOM:{ name:"Ganon's Castle Water Trial Blue Fire Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => (L.CanClearStalagmite() || L.trick("RT_ICE_STALAGMITE_CLIP"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_WATER_TRIAL_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_WATER_TRIAL_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MAIN", () => true],
      ["RR_GANONS_CASTLE_WATER_TRIAL_BLOCK_ROOM", () => (L.BlueFire())]
    ] },
    RR_GANONS_CASTLE_WATER_TRIAL_BLOCK_ROOM:{ name:"Ganon's Castle Water Trial Block Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_WATER_TRIAL_RUSTED_SWITCH", () => (L.IsAdult && (L.HasItem("RG_POWER_BRACELET") || L.CanMiddairGroundJump()) && (L.BlueFire() || L.trick("RT_VISIBLE_COLLISION")) && L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_WATER_TRIAL_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_WATER_TRIAL_BLUE_FIRE_ROOM", () => true],
      ["RR_GANONS_CASTLE_WATER_TRIAL_BLOCK_ROOM_END", () => (L.IsAdult || (L.HasItem("RG_POWER_BRACELET") && L.CanUse("RG_HOVER_BOOTS")) || L.CanGroundJump() || L.trick("RT_SLIDE_JUMP"))]
    ] },
    RR_GANONS_CASTLE_WATER_TRIAL_BLOCK_ROOM_END:{ name:"Ganon's Castle Water Trial Block Room End", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_WATER_TRIAL_BLOCK_ROOM", () => true],
      ["RR_GANONS_CASTLE_WATER_TRIAL_FINAL_ROOM", () => (L.Get("LOGIC_WATER_TRIAL_RUSTED_SWITCH"))]
    ] },
    RR_GANONS_CASTLE_WATER_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle Water Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_WATER_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_WATER_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_WATER_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_WATER_TRIAL_BLOCK_ROOM_END", () => true]
    ] },
    RR_GANONS_CASTLE_SHADOW_TRIAL_START:{ name:"Ganon's Castle Shadow Trial Start", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_FRONT_CHEST", () => ((L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_SONG_OF_TIME") || L.IsChild) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MAIN", () => true],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_POTS_PLATFORM", () => (L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_LONGSHOT"))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_CHEST_PLATFORM", () => (L.CanUse("RG_DINS_FIRE") && L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_GANONS_CASTLE_SHADOW_TRIAL_POTS_PLATFORM:{ name:"Ganon's Castle Shadow Pots Platform", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_START", () => (L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_LONGSHOT"))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_CHEST_PLATFORM", () => (L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_HOVER_BOOTS") || (L.Get("LOGIC_SHADOW_TRIAL_LOWER_SWITCH") && L.CanUse("RG_HOOKSHOT")))]
    ] },
    RR_GANONS_CASTLE_SHADOW_TRIAL_CHEST_PLATFORM:{ name:"Ganon's Castle Shadow Chest Platform", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SHADOW_TRIAL_RUSTED_SWITCH", () => ((L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH") || L.CanUse("RG_HOVER_BOOTS")) && L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_GOLDEN_GAUNTLETS_CHEST", () => (L.Get("LOGIC_SHADOW_TRIAL_LOWER_SWITCH") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_HEART_1", () => (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_HEART_2", () => (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_HEART_3", () => (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH") || L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_POTS_PLATFORM", () => (L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_LOWER_SWITCH", () => (L.CanUse("RG_FIRE_ARROWS") || L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_END", () => (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_GANONS_CASTLE_SHADOW_TRIAL_LOWER_SWITCH:{ name:"Ganon's Castle Shadow Trial Lower Switch", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SHADOW_TRIAL_LOWER_SWITCH", () => true]
    ],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_CHEST_PLATFORM", () => (L.CanUse("RG_FIRE_ARROWS") || (L.Get("LOGIC_SHADOW_TRIAL_LOWER_SWITCH") && L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_GANONS_CASTLE_SHADOW_TRIAL_END:{ name:"Ganon's Castle Shadow Trial End", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_HEART_2", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_HEART_3", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_CHEST_PLATFORM", () => ((L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH")) || (L.CanUse("RG_HOVER_BOOTS") && L.HasFireSource()) || (L.Get("LOGIC_SHADOW_TRIAL_LOWER_SWITCH") && L.CanUse("RG_LONGSHOT")))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_POTS_PLATFORM", () => (L.CanUse("RG_LONGSHOT") && L.CanUse("RG_DINS_FIRE") && (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH")))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_LOWER_SWITCH", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_FINAL_ROOM", () => (L.Get("LOGIC_SHADOW_TRIAL_RUSTED_SWITCH"))]
    ] },
    RR_GANONS_CASTLE_SHADOW_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle Shadow Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SHADOW_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_POT_3", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_SHADOW_TRIAL_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_SHADOW_TRIAL_END", () => true]
    ] },
    RR_GANONS_CASTLE_SPIRIT_TRIAL_BEAMOS_ROOM:{ name:"Ganon's Castle Spirit Trial Beamos Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_SPIRIT_TRIAL_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))],
      ["RC_GANONS_CASTLE_SPIRIT_TRIAL_HEART", () => true]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MAIN", () => true],
      ["RR_GANONS_CASTLE_SPIRIT_TRIAL_BEFORE_SWITCH", () => (L.trick("RT_GANON_SPIRIT_TRIAL_HOOKSHOT") || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_GANONS_CASTLE_SPIRIT_TRIAL_BEFORE_SWITCH:{ name:"Ganon's Castle Spirit Trial Before Switch", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_SPIRIT_TRIAL_CRYSTAL_SWITCH_CHEST", () => ((L.CanJumpslash() || L.HasExplosives() || L.CanUse("RG_GIANTS_KNIFE")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_SPIRIT_TRIAL_BEAMOS_ROOM", () => true],
      ["RR_GANONS_CASTLE_SPIRIT_TRIAL_AFTER_SWITCH", () => (L.CanUse("RG_BOMBCHU_5") || (L.trick("RT_ITEM_EXTENSION") && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT"))))]
    ] },
    RR_GANONS_CASTLE_SPIRIT_TRIAL_AFTER_SWITCH:{ name:"Ganon's Castle Spirit Trial After Switch", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_SPIRIT_TRIAL_CRYSTAL_SWITCH_CHEST", () => (L.CanHitSwitch() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_SPIRIT_TRIAL_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_SPIRIT_TRIAL_BEFORE_SWITCH", () => true],
      ["RR_GANONS_CASTLE_SPIRIT_TRIAL_FINAL_ROOM", () => (L.CanUse("RG_FAIRY_BOW") && (L.CanUse("RG_MIRROR_SHIELD") || (L.opt("RSK_SUNLIGHT_ARROWS") && L.CanUse("RG_LIGHT_ARROWS"))))]
    ] },
    RR_GANONS_CASTLE_SPIRIT_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle Spirit Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SPIRIT_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))],
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_GANONS_CASTLE_SPIRIT_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_SPIRIT_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_SPIRIT_TRIAL_AFTER_SWITCH", () => true]
    ] },
    RR_GANONS_CASTLE_LIGHT_TRIAL_CHESTS_ROOM:{ name:"Ganon's Castle Light Trial Chests Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_FIRST_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_SECOND_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_THIRD_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_FIRST_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_SECOND_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_THIRD_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_INVISIBLE_ENEMIES_CHEST", () => ((L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanKillEnemy("RE_BIG_SKULLTULA") && L.CanKillEnemy("RE_KEESE", "ED_CLOSE", true, 3)) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MAIN", () => true],
      ["RR_GANONS_CASTLE_LIGHT_TRIAL_TRIFORCE_ROOM", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 1))]
    ] },
    RR_GANONS_CASTLE_LIGHT_TRIAL_TRIFORCE_ROOM:{ name:"Ganon's Castle Light Trial Triforce Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_LULLABY_CHEST", () => (L.CanUse("RG_ZELDAS_LULLABY") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_LIGHT_TRIAL_CHESTS_ROOM", () => true],
      ["RR_GANONS_CASTLE_LIGHT_TRIAL_BOULDER_ROOM", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 2))]
    ] },
    RR_GANONS_CASTLE_LIGHT_TRIAL_BOULDER_ROOM:{ name:"Ganon's Castle Light Trial Boulder Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_BOULDER_POT_1", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_LIGHT_TRIAL_TRIFORCE_ROOM", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 2))],
      ["RR_GANONS_CASTLE_LIGHT_TRIAL_FINAL_ROOM", () => (L.CanUse("RG_HOOKSHOT") || (L.IsAdult && L.CanGroundJump()))]
    ] },
    RR_GANONS_CASTLE_LIGHT_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle Light Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_LIGHT_TRIAL_CLEAR", () => ((L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_POT_1", () => (L.CanBreakPots() && (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH")))],
      ["RC_GANONS_CASTLE_LIGHT_TRIAL_POT_2", () => (L.CanBreakPots() && (L.trick("RT_LENS_GANON") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_LIGHT_TRIAL_BOULDER_ROOM", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_LOBBY:{ name:"Ganon's Castle MQ Lobby", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_ENTRYWAY", () => (L.CanPassEnemy("RE_GREEN_BUBBLE") || L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE") && L.CanKillEnemy("RE_ARMOS")))))],
      ["RR_GANONS_CASTLE_MQ_MAIN", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE") && L.CanKillEnemy("RE_ARMOS")))))]
    ] },
    RR_GANONS_CASTLE_MQ_MAIN:{ name:"Ganon's Castle MQ Main", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_SHEIK_HINT_MQ_GC", () => (L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_LOBBY", () => true],
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_STALFOS_ROOM", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_FOREST_MEDALLION"))],
      ["RR_GANONS_CASTLE_MQ_FIRE_TRIAL_OPEN_DOOR", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_FIRE_MEDALLION"))],
      ["RR_GANONS_CASTLE_MQ_WATER_TRIAL_GEYSER_ROOM", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_WATER_MEDALLION"))],
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_STARTING_LEDGE", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_SHADOW_MEDALLION"))],
      ["RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_CHAIRS_ROOM", () => (!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_SPIRIT_MEDALLION"))],
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_DINOLFOS_ROOM", () => (L.AnyAgeTime((() => ((!L.opt("RSK_MEDALLION_LOCKED_TRIALS") || L.HasItem("RG_LIGHT_MEDALLION")) && L.CanUse("RG_GOLDEN_GAUNTLETS")))))],
      ["RR_GANONS_TOWER_ENTRYWAY", () => ((L.Get("LOGIC_FOREST_TRIAL_CLEAR") || L.trialSkipped("TK_FOREST_TRIAL")) && (L.Get("LOGIC_FIRE_TRIAL_CLEAR") || L.trialSkipped("TK_FIRE_TRIAL")) && (L.Get("LOGIC_WATER_TRIAL_CLEAR") || L.trialSkipped("TK_WATER_TRIAL")) && (L.Get("LOGIC_SHADOW_TRIAL_CLEAR") || L.trialSkipped("TK_SHADOW_TRIAL")) && (L.Get("LOGIC_SPIRIT_TRIAL_CLEAR") || L.trialSkipped("TK_SPIRIT_TRIAL")) && (L.Get("LOGIC_LIGHT_TRIAL_CLEAR") || L.trialSkipped("TK_LIGHT_TRIAL")))],
      ["RR_GANONS_CASTLE_MQ_DEKU_SCRUBS", () => (L.trick("RT_LENS_GANON_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_GANONS_CASTLE_MQ_DEKU_SCRUBS:{ name:"Ganon's Castle MQ Deku Scrubs", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_DEKU_SCRUB_CENTER_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_MQ_DEKU_SCRUB_CENTER", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_MQ_DEKU_SCRUB_CENTER_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_MQ_DEKU_SCRUB_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_MQ_DEKU_SCRUB_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_1", () => true],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_2", () => true],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_3", () => true],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_4", () => true],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_5", () => true],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_6", () => true],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_7", () => true],
      ["RC_GANONS_CASTLE_MQ_SCRUBS_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_MAIN", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_FOREST_TRIAL_STALFOS_ROOM:{ name:"Ganon's Castle MQ Forest Trial Stalfos Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_MQ_FOREST_TRIAL_FREESTANDING_KEY", () => (L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_MAIN", () => true],
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2)))))]
    ] },
    RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM:{ name:"Ganon's Castle MQ Forest Trial Beamos Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FOREST_TRIAL_MQ_SPAWN_BEAMOS_CHEST", () => (L.CanHitEyeTargets())]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_FOREST_TRIAL_EYE_SWITCH_CHEST", () => (L.Get("LOGIC_FOREST_TRIAL_MQ_SPAWN_BEAMOS_CHEST") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_STALFOS_ROOM", () => true],
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM_MIDDLE", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM_MIDDLE:{ name:"Ganon's Castle MQ Forest Trial Beamos Room End", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FOREST_TRIAL_MQ_SPAWN_BEAMOS_CHEST", () => (L.CanHitEyeTargets())]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_FOREST_TRIAL_FROZEN_EYE_SWITCH_CHEST", () => (L.HasFireSource() && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM", () => (L.Get("LOGIC_FOREST_TRIAL_MQ_SPAWN_BEAMOS_CHEST") && (L.CanAvoidEnemy("RE_BEAMOS") || L.CanKillEnemy("RE_ARMOS")) && L.CanUse("RG_LONGSHOT"))],
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM_END", () => (L.IsAdult || L.CanGroundJump() || L.trick("RT_UNINTUITIVE_JUMPS"))]
    ] },
    RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM_END:{ name:"Ganon's Castle MQ Forest Trial Beamos Room Final Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM_MIDDLE", () => true],
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_FINAL_ROOM", () => (L.CanUse("RG_SONG_OF_TIME"))]
    ] },
    RR_GANONS_CASTLE_MQ_FOREST_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle MQ Forest Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FOREST_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_FOREST_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_MQ_FOREST_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FOREST_TRIAL_BEAMOS_ROOM_END", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_FIRE_TRIAL_OPEN_DOOR:{ name:"Ganon's Castle MQ Fire Trial Open Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_MAIN", () => true],
      ["RR_GANONS_CASTLE_MQ_FIRE_TRIAL_FROM_OPEN", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_FIRE_TRIAL_FROM_OPEN:{ name:"Ganon's Castle MQ Fire Trial From Open Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FIRE_TRIAL_SILVER_RUPEES", () => (L.FireTimer() >= 72 && L.CanUse("RG_GOLDEN_GAUNTLETS"))]
    ],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FIRE_TRIAL_OPEN_DOOR", () => true],
      ["RR_GANONS_CASTLE_MQ_FIRE_TRIAL_BARRED_DOOR", () => (L.FireTimer() >= 32 && (L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_GOLDEN_GAUNTLETS") && (L.CanUse("RG_HOVER_BOOTS") || (L.trick("RT_GANON_MQ_FIRE_TRIAL") && L.IsAdult && L.CanUse("RG_HOOKSHOT"))))))]
    ] },
    RR_GANONS_CASTLE_MQ_FIRE_TRIAL_FROM_BARRED:{ name:"Ganon's Castle MQ Fire Trial From Barred Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FIRE_TRIAL_BARRED_DOOR", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_FIRE_TRIAL_BARRED_DOOR:{ name:"Ganon's Castle MQ Fire Trial Barred Door", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FIRE_TRIAL_FINAL_ROOM", () => (L.Get("LOGIC_FIRE_TRIAL_SILVER_RUPEES"))]
    ] },
    RR_GANONS_CASTLE_MQ_FIRE_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle MQ Fire Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_FIRE_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_FIRE_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_MQ_FIRE_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_FIRE_TRIAL_OPEN_DOOR", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_WATER_TRIAL_GEYSER_ROOM:{ name:"Ganon's Castle MQ Water Trial Geyser Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => (L.CanJumpslash() || L.HasExplosives())]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_WATER_TRIAL_CHEST", () => (L.BlueFire() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_MQ_WATER_TRIAL_HEART", () => (L.BlueFire())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_MAIN", () => true],
      ["RR_GANONS_CASTLE_MQ_WATER_TRIAL_BLOCK_ROOM", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 3) && L.AnyAgeTime((() => (L.BlueFire()))))]
    ] },
    RR_GANONS_CASTLE_MQ_WATER_TRIAL_BLOCK_ROOM:{ name:"Ganon's Castle MQ Water Trial Block Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_WATER_TRIAL_MQ_SILVER_RUPEES", () => (L.IsAdult && (L.HasItem("RG_POWER_BRACELET") || L.CanMiddairGroundJump()) && L.BlueFire())],
      ["LOGIC_WATER_TRIAL_MQ_MELTED_FINAL_DOOR_RED_ICE", () => ((L.opt("RSK_BLUE_FIRE_ARROWS") && L.CanUse("RG_ICE_ARROWS")) || (L.IsAdult || L.CanUse("RG_HOVER_BOOTS")) && L.HasItem("RG_POWER_BRACELET") && L.CanUse("RG_BOTTLE_WITH_BLUE_FIRE"))]
    ],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_WATER_TRIAL_GEYSER_ROOM", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 3))],
      ["RR_GANONS_CASTLE_MQ_WATER_TRIAL_BLOCK_ROOM_END", () => (L.Get("LOGIC_WATER_TRIAL_MQ_MELTED_FINAL_DOOR_RED_ICE") && (L.IsAdult || (L.CanUse("RG_HOVER_BOOTS") && L.HasItem("RG_POWER_BRACELET")) || L.CanGroundJump() || L.trick("RT_SLIDE_JUMP")))]
    ] },
    RR_GANONS_CASTLE_MQ_WATER_TRIAL_BLOCK_ROOM_END:{ name:"Ganon's Castle MQ Water Trial Block Room End", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_WATER_TRIAL_MQ_MELTED_FINAL_DOOR_RED_ICE", () => (L.BlueFire())]
    ],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_WATER_TRIAL_BLOCK_ROOM", () => (L.Get("LOGIC_WATER_TRIAL_MQ_MELTED_FINAL_DOOR_RED_ICE"))],
      ["RR_GANONS_CASTLE_MQ_WATER_TRIAL_FINAL_ROOM", () => (L.Get("LOGIC_WATER_TRIAL_MQ_SILVER_RUPEES"))]
    ] },
    RR_GANONS_CASTLE_MQ_WATER_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle MQ Water Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_WATER_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_WATER_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_MQ_WATER_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_WATER_TRIAL_BLOCK_ROOM_END", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_STARTING_LEDGE:{ name:"Ganon's Castle MQ Shadow Trial Starting Ledge", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SHADOW_TRIAL_FIRST_CHEST", () => (L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_MAIN", () => true],
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_CHEST_PLATFORM", () => ((L.Get("LOGIC_SHADOW_TRIAL_FIRST_CHEST") && L.CanUse("RG_HOOKSHOT")) || (L.IsAdult && L.CanUse("RG_HOVER_BOOTS")))]
    ] },
    RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_CHEST_PLATFORM:{ name:"Ganon's Castle MQ Shadow Trial Chest Platform", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SHADOW_TRIAL_FIRST_CHEST", () => (L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_SHADOW_TRIAL_BOMB_FLOWER_CHEST", () => (L.Get("LOGIC_SHADOW_TRIAL_FIRST_CHEST") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_STARTING_LEDGE", () => (L.CanUse("RG_HOOKSHOT") || (L.IsAdult && L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_MOVING_PLATFORM", () => ((L.trick("RT_LENS_GANON_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.IsAdult || L.CanUse("RG_HOVER_BOOTS")))]
    ] },
    RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_MOVING_PLATFORM:{ name:"Ganon's Castle MQ Shadow Trial Moving Platform", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SHADOW_TRIAL_FIRST_CHEST", () => (L.CanDetonateUprightBombFlower())]
    ],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_CHEST_PLATFORM", () => (L.IsAdult || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_BEAMOS_TORCH", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_BEAMOS_TORCH:{ name:"Ganon's Castle MQ Shadow Trial Beamos Torch", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_MOVING_PLATFORM", () => (L.trick("RT_LENS_GANON_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_FAR_SIDE", () => (L.HasFireSource() || L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && L.trick("RT_GANON_MQ_SHADOW_TRIAL") && L.CanUse("RG_FAIRY_BOW")))]
    ] },
    RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_FAR_SIDE:{ name:"Ganon's Castle MQ Shadow Trial Far Side", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_MQ_SHADOW_TRIAL_EYE_SWITCH_CHEST", () => (L.CanHitEyeTargets() && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_BEAMOS_TORCH", () => (L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_FINAL_ROOM", () => ((L.trick("RT_LENS_GANON_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ] },
    RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle MQ Shadow Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SHADOW_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_SHADOW_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_MQ_SHADOW_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SHADOW_TRIAL_FAR_SIDE", () => ((L.trick("RT_LENS_GANON_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ] },
    RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_CHAIRS_ROOM:{ name:"Ganon's Castle MQ Spirit Trial Chairs Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_MAIN", () => true],
      ["RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_BEFORE_SWITCH", () => (L.AnyAgeTime((() => ((L.CanHitEyeTargets() || L.trick("RT_VISIBLE_COLLISION")) && L.CanUse("RG_MEGATON_HAMMER")))))]
    ] },
    RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_BEFORE_SWITCH:{ name:"Ganon's Castle MQ Spirit Trial Before Switch", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_FIRST_CHEST", () => (L.CanPassEnemy("RE_GREEN_BUBBLE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_CHAIRS_ROOM", () => true],
      ["RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_AFTER_SWITCH", () => (L.AnyAgeTime((() => (L.CanUse("RG_BOMBCHU_5")))))]
    ] },
    RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_AFTER_SWITCH:{ name:"Ganon's Castle MQ Spirit Trial After Switch", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_GANON_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_SUN_FRONT_LEFT_CHEST", () => (((L.CanUse("RG_FIRE_ARROWS") && L.CanUse("RG_MIRROR_SHIELD")) || (L.opt("RSK_SUNLIGHT_ARROWS") && L.CanUse("RG_LIGHT_ARROWS"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_SUN_BACK_LEFT_CHEST", () => (((L.CanUse("RG_FIRE_ARROWS") && L.CanUse("RG_MIRROR_SHIELD")) || (L.opt("RSK_SUNLIGHT_ARROWS") && L.CanUse("RG_LIGHT_ARROWS"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_GOLDEN_GAUNTLETS_CHEST", () => (((L.CanUse("RG_FIRE_ARROWS") && L.CanUse("RG_MIRROR_SHIELD")) || (L.opt("RSK_SUNLIGHT_ARROWS") && L.CanUse("RG_LIGHT_ARROWS"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_SUN_BACK_RIGHT_CHEST", () => (((L.CanUse("RG_FIRE_ARROWS") && L.CanUse("RG_MIRROR_SHIELD")) || (L.opt("RSK_SUNLIGHT_ARROWS") && L.CanUse("RG_LIGHT_ARROWS"))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_BEFORE_SWITCH", () => (L.AnyAgeTime((() => (L.CanUse("RG_BOMBCHU_5")))))],
      ["RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_FINAL_ROOM", () => (L.AnyAgeTime((() => ((L.CanUse("RG_FIRE_ARROWS") && L.CanUse("RG_MIRROR_SHIELD"))))) || (L.opt("RSK_SUNLIGHT_ARROWS") && L.CanUse("RG_LIGHT_ARROWS")))]
    ] },
    RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle MQ Spirit Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_SPIRIT_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))],
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_MQ_SPIRIT_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_SPIRIT_TRIAL_AFTER_SWITCH", () => true]
    ] },
    RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_DINOLFOS_ROOM:{ name:"Ganon's Castle MQ Light Trial Dinolfos Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_MAIN", () => true],
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_TRIFORCE_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DINOLFOS") && L.CanKillEnemy("RE_TORCH_SLUG")))))]
    ] },
    RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_TRIFORCE_ROOM:{ name:"Ganon's Castle MQ Light Trial Triforce Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_MQ_LIGHT_TRIAL_LULLABY_CHEST", () => (L.CanUse("RG_ZELDAS_LULLABY") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_DINOLFOS_ROOM", () => true],
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_BOULDER_ROOM_FRONT", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 2))]
    ] },
    RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_BOULDER_ROOM_FRONT:{ name:"Ganon's Castle MQ Light Trial Boulder Room Front", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_TRIFORCE_ROOM", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 2))],
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_BOULDER_ROOM_BACK", () => (L.CanUse("RG_HOOKSHOT") || L.trick("RT_GANON_MQ_LIGHT_TRIAL") || (L.IsAdult && L.CanGroundJump()))]
    ] },
    RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_BOULDER_ROOM_BACK:{ name:"Ganon's Castle MQ Light Trial Boulder Room Back", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_MQ_LIGHT_TRIAL_LEFT_HEART", () => true],
      ["RC_GANONS_CASTLE_MQ_LIGHT_TRIAL_RIGHT_HEART", () => true]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_BOULDER_ROOM_FRONT", () => (L.CanUse("RG_HOOKSHOT") || L.trick("RT_GANON_MQ_LIGHT_TRIAL") || (L.IsAdult && L.CanGroundJump()))],
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_FINAL_ROOM", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 3))]
    ] },
    RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_FAKE_FINAL_ROOM:{ name:"Ganon's Castle MQ Light Trial Fake Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_BOULDER_ROOM_BACK", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 3))],
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_FINAL_ROOM", () => ((L.trick("RT_LENS_GANON_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanJumpslash() || L.CanUseProjectile()))]
    ] },
    RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_FINAL_ROOM:{ name:"Ganon's Castle MQ Light Trial Final Room", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_LIGHT_TRIAL_CLEAR", () => (L.CanUse("RG_LIGHT_ARROWS"))]
    ],
      checks:[
      ["RC_GANONS_CASTLE_MQ_LIGHT_TRIAL_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_MQ_LIGHT_TRIAL_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_CASTLE_MQ_LIGHT_TRIAL_BOULDER_ROOM_BACK", () => (L.SmallKeys("SCENE_INSIDE_GANONS_CASTLE", 3))]
    ] },
    RR_GANONS_TOWER_ENTRYWAY:{ name:"Ganon's Tower Entryway", scene:"SCENE_INSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_LOBBY", () => (!L.mq("GANONS_CASTLE"))],
      ["RR_GANONS_CASTLE_MQ_MAIN", () => (L.mq("GANONS_CASTLE"))],
      ["RR_GANONS_TOWER_STAIRS_1", () => true]
    ] },
    RR_GANONS_TOWER_STAIRS_1:{ name:"Ganon's Tower Stairs 1", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_TOWER_ENTRYWAY", () => true],
      ["RR_GANONS_TOWER_FLOOR_1", () => true],
      ["RR_CASTLE_GROUNDS_FROM_GANONS_CASTLE", () => false]
    ] },
    RR_GANONS_TOWER_FLOOR_1:{ name:"Ganon's Tower Floor 1", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_TOWER_STAIRS_1", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DINOLFOS", "ED_CLOSE", true, 2)))))],
      ["RR_GANONS_TOWER_STAIRS_2", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DINOLFOS", "ED_CLOSE", true, 2)))))]
    ] },
    RR_GANONS_TOWER_STAIRS_2:{ name:"Ganon's Tower Stairs 2", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_TOWER_FLOOR_1", () => true],
      ["RR_GANONS_TOWER_FLOOR_2", () => true]
    ] },
    RR_GANONS_TOWER_FLOOR_2:{ name:"Ganon's Tower Floor 2", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[
      ["RC_GANONS_TOWER_BOSS_KEY_CHEST", () => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GANONS_TOWER_STAIRS_2", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2)))))],
      ["RR_GANONS_TOWER_STAIRS_3", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2)))))]
    ] },
    RR_GANONS_TOWER_STAIRS_3:{ name:"Ganon's Tower Stairs 3", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_TOWER_FLOOR_2", () => true],
      ["RR_GANONS_TOWER_FLOOR_3", () => true]
    ] },
    RR_GANONS_TOWER_FLOOR_3:{ name:"Ganon's Tower Floor 3", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_TOWER_STAIRS_3", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE", "ED_CLOSE", true, 2)))))],
      ["RR_GANONS_TOWER_STAIRS_4", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE", "ED_CLOSE", true, 2)))))]
    ] },
    RR_GANONS_TOWER_STAIRS_4:{ name:"Ganon's Tower Stairs 4", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_TOWER_FLOOR_3", () => true],
      ["RR_GANONS_TOWER_BEFORE_GANONDORF_LAIR", () => true]
    ] },
    RR_GANONS_TOWER_BEFORE_GANONDORF_LAIR:{ name:"Ganon's Tower Before Ganondorf's Lair", scene:"SCENE_GANONS_TOWER", time:false,
      events:[],
      checks:[
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_1", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_2", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_3", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_4", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_5", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_6", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_7", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_8", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_9", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_10", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_11", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_12", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_13", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_14", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_15", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_16", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_17", () => (L.CanBreakPots())],
      ["RC_GANONS_CASTLE_GANONS_TOWER_POT_18", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GANONS_TOWER_FLOOR_3", () => (L.AnyAgeTime((() => (true))))],
      ["RR_GANONS_TOWER_GANONDORF_LAIR", () => (L.AnyAgeTime((() => (L.HasItem("RG_GANONS_CASTLE_BOSS_KEY")))))]
    ] },
    RR_GANONS_TOWER_GANONDORF_LAIR:{ name:"Ganondorf's Lair", scene:"SCENE_GANONDORF_BOSS", time:false,
      events:[],
      checks:[
      ["RC_GANONDORF_HINT", () => (L.HasBossSoul("RG_GANON_SOUL"))]
    ],
      exits:[
      ["RR_GANONS_CASTLE_ESCAPE", () => (L.CanKillEnemy("RE_GANONDORF"))]
    ] },
    RR_GANONS_CASTLE_ESCAPE:{ name:"Ganon's Castle Escape", scene:"SCENE_GANONS_TOWER_COLLAPSE_EXTERIOR", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_GANON_ARENA", () => true]
    ] },
    RR_GANONS_CASTLE_GANON_ARENA:{ name:"Ganon's Arena", scene:"SCENE_GANON_BOSS", time:false,
      events:[],
      checks:[
      ["RC_GANON", () => (L.CanKillEnemy("RE_GANON"))]
    ],
      exits:[] },
    RR_GERUDO_TRAINING_GROUND_ENTRYWAY:{ name:"Gerudo Training Ground Entryway", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_LOBBY", () => (!L.mq("GERUDO_TRAINING_GROUND"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_LOBBY", () => (L.mq("GERUDO_TRAINING_GROUND"))],
      ["RR_GF_EXITING_GTG", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_LOBBY:{ name:"Gerudo Training Ground Lobby", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_LOBBY_LEFT_CHEST", () => (L.CanHitEyeTargets() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_LOBBY_RIGHT_CHEST", () => (L.CanHitEyeTargets() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_ENTRANCE_STORMS_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_ENTRYWAY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_SAND_ROOM", () => true],
      ["RR_GERUDO_TRAINING_GROUND_DINALFOS", () => true],
      ["RR_GERUDO_TRAINING_GROUND_CENTRAL_MAZE", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_SAND_ROOM:{ name:"Gerudo Training Ground Sand Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_STALFOS_CHEST", () => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2, true) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_BOULDER_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2, true)))))]
    ] },
    RR_GERUDO_TRAINING_GROUND_BOULDER_ROOM:{ name:"Gerudo Training Ground Boulder Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_SAND_ROOM", () => true],
      ["RR_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_ROOM", () => (L.AnyAgeTime((() => (L.CanUse(L.IsAdult ? "RG_HOOKSHOT" : "RG_LONGSHOT") || L.trick("RT_GTG_WITHOUT_HOOKSHOT")))))]
    ] },
    RR_GERUDO_TRAINING_GROUND_CENTRAL_MAZE:{ name:"Gerudo Training Ground Central Maze", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_HIDDEN_CEILING_CHEST", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 3) && (L.trick("RT_LENS_GTG") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanUse("RG_HOOKSHOT") || L.HasItem("RG_CLIMB")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MAZE_PATH_FIRST_CHEST", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 4) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MAZE_PATH_SECOND_CHEST", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 6) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MAZE_PATH_THIRD_CHEST", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 7) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MAZE_PATH_FINAL_CHEST", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 9) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_CENTRAL_MAZE_RIGHT", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 9))]
    ] },
    RR_GERUDO_TRAINING_GROUND_CENTRAL_MAZE_RIGHT:{ name:"Gerudo Training Ground Central Maze Right", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MAZE_RIGHT_CENTRAL_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MAZE_RIGHT_SIDE_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_FREESTANDING_KEY", () => true]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_LAVA_ROOM", () => true],
      ["RR_GERUDO_TRAINING_GROUND_LAVA_ROOM_UPPER_LEDGE", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_GERUDO_TRAINING_GROUND_CENTRAL_MAZE", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 9))]
    ] },
    RR_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_ROOM:{ name:"Gerudo Training Ground Heavy Block Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_PUSHED_HEAVY_BLOCK", () => (L.CanUse("RG_SILVER_GAUNTLETS"))]
    ],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_BEFORE_HEAVY_BLOCK_CHEST", () => (L.CanKillEnemy("RE_WOLFOS", "ED_CLOSE", true, 4, true) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_ROOM_UPPER", () => ((L.trick("RT_LENS_GTG") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_GTG_FAKE_WALL") && L.IsAdult && L.CanUse("RG_HOVER_BOOTS")) || (L.IsAdult && L.CanGroundJump())))],
      ["RR_GERUDO_TRAINING_GROUND_BEHIND_HEAVY_BLOCK", () => (L.Get("LOGIC_GTG_PUSHED_HEAVY_BLOCK"))],
      ["RR_GERUDO_TRAINING_GROUND_BOULDER_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_ROOM_UPPER:{ name:"Gerudo Training Ground Heavy Block Room Upper", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_UNLOCKED_DOOR_BEHIND_HEAVY_BLOCK", () => true]
    ],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_ROOM", () => (L.trick("RT_LENS_GTG") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_GERUDO_TRAINING_GROUND_EYE_STATUE_UPPER", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_BEHIND_HEAVY_BLOCK:{ name:"Gerudo Training Ground Behind Heavy Block", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_ROOM", () => (L.Get("LOGIC_GTG_PUSHED_HEAVY_BLOCK"))],
      ["RR_GERUDO_TRAINING_GROUND_LIKE_LIKE_ROOM", () => (L.Get("LOGIC_GTG_UNLOCKED_DOOR_BEHIND_HEAVY_BLOCK"))]
    ] },
    RR_GERUDO_TRAINING_GROUND_LIKE_LIKE_ROOM:{ name:"Gerudo Training Ground Like Like Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_FIRST_CHEST", () => (L.CanKillEnemy("RE_LIKE_LIKE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_SECOND_CHEST", () => (L.CanKillEnemy("RE_LIKE_LIKE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_THIRD_CHEST", () => ((L.trick("RT_LENS_GTG") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanPassEnemy("RE_LIKE_LIKE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_FOURTH_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_BEHIND_HEAVY_BLOCK", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_EYE_STATUE_UPPER:{ name:"Gerudo Training Ground Eye Statue Upper", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_EYE_STATUE_LOWER", () => true],
      ["RR_GERUDO_TRAINING_GROUND_HEAVY_BLOCK_ROOM_UPPER", () => true],
      ["RR_GERUDO_TRAINING_GROUND_ABOVE_MAZE", () => (L.Get("LOGIC_GTG_CLEARED_EYE_STATUE"))]
    ] },
    RR_GERUDO_TRAINING_GROUND_ABOVE_MAZE:{ name:"Gerudo Training Ground Above Eye", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_NEAR_SCARECROW_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_EYE_STATUE_UPPER", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_EYE_STATUE_LOWER:{ name:"Gerudo Training Ground Eye Statue Lower", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_CLEARED_EYE_STATUE", () => (L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_EYE_STATUE_CHEST", () => (L.Get("LOGIC_GTG_CLEARED_EYE_STATUE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_HAMMER_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_HAMMER_ROOM:{ name:"Gerudo Training Ground Hammer Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_HAMMER_ROOM_CLEAR_CHEST", () => (L.CanAttack() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_HAMMER_ROOM_SWITCH_CHEST", () => ((L.CanUse("RG_MEGATON_HAMMER") || (L.TakeDamage() && L.trick("RT_FIRE_RINGS"))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_EYE_STATUE_LOWER", () => (L.CanUse("RG_MEGATON_HAMMER") && L.CanUse("RG_FAIRY_BOW"))],
      ["RR_GERUDO_TRAINING_GROUND_LAVA_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_LAVA_ROOM:{ name:"Gerudo Training Ground Lava Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_PLATFORM_SILVER_RUPEES", () => (L.CanUse("RG_HOOKSHOT") && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_SONG_OF_TIME") || L.IsChild))]
    ],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_DINALFOS", () => true],
      ["RR_GERUDO_TRAINING_GROUND_CENTRAL_MAZE_RIGHT", () => (L.CanUse("RG_SONG_OF_TIME") || L.IsChild)],
      ["RR_GERUDO_TRAINING_GROUND_LAVA_ROOM_UPPER_LEDGE", () => (L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOOKSHOT") && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_SONG_OF_TIME") || L.IsChild || (L.IsAdult && L.trick("RT_GTG_LAVA_JUMP")) || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.CanUse("RG_BOMB_BAG") && L.TakeDamage()))))],
      ["RR_GERUDO_TRAINING_GROUND_UNDERWATER", () => (L.Get("LOGIC_GTG_PLATFORM_SILVER_RUPEES"))]
    ] },
    RR_GERUDO_TRAINING_GROUND_LAVA_ROOM_UPPER_LEDGE:{ name:"Gerudo Training Ground Lava Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_LAVA_ROOM", () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_SONG_OF_TIME") || L.IsChild || (L.IsAdult && L.trick("RT_GTG_LAVA_JUMP")) || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.CanUse("RG_BOMB_BAG") && L.TakeDamage()))],
      ["RR_GERUDO_TRAINING_GROUND_HAMMER_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_UNDERWATER:{ name:"Gerudo Training Ground Underwater", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_UNDERWATER_SILVER_RUPEE_CHEST", () => (L.CanUse("RG_SONG_OF_TIME") && L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 24 && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_LAVA_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_DINALFOS:{ name:"Gerudo Training Dinalfos", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_BEAMOS_CHEST", () => (L.CanKillEnemy("RE_BEAMOS") && L.CanKillEnemy("RE_DINOLFOS", "ED_CLOSE", true, 2, true) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_BEAMOS_SOUTH_HEART", () => true],
      ["RC_GERUDO_TRAINING_GROUND_BEAMOS_EAST_HEART", () => true]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_LAVA_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_BEAMOS") && L.CanKillEnemy("RE_DINOLFOS", "ED_CLOSE", true, 2, true)))))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_LOBBY:{ name:"Gerudo Training Ground MQ Lobby", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_LOBBY_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MQ_LOBBY_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MQ_LOBBY_LEFT_POT_1", () => (L.CanBreakPots())],
      ["RC_GERUDO_TRAINING_GROUND_MQ_LOBBY_LEFT_POT_2", () => (L.CanBreakPots())],
      ["RC_GERUDO_TRAINING_GROUND_MQ_LOBBY_RIGHT_POT_1", () => (L.CanBreakPots())],
      ["RC_GERUDO_TRAINING_GROUND_MQ_LOBBY_RIGHT_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_ENTRYWAY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAZE_BY_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_SAND_ROOM", () => (L.AnyAgeTime((() => (L.HasFireSource()))))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_DINOLFOS_ROOM", () => (L.AnyAgeTime((() => (L.CanHitEyeTargets()))))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_MAZE_BY_LOBBY:{ name:"Gerudo Training Ground MQ Maze By Lobby", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_MAZE_PATH_FIRST_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MQ_MAZE_PATH_SECOND_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MQ_HIDDEN_CEILING_CHEST", () => ((L.trick("RT_LENS_GTG_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAZE_FIRST_LOCK", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 1))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_MAZE_FIRST_LOCK:{ name:"Gerudo Training Ground MQ Maze First Lock", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_MAZE_PATH_THIRD_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LOBBY", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 1))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAZE_CENTER", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 3))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_MAZE_CENTER:{ name:"Gerudo Training Ground MQ Center", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_MQ_MAZE_SWITCH", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_MAZE_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAZE_FIRST_LOCK", () => (L.SmallKeys("SCENE_GERUDO_TRAINING_GROUND", 3))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_SAND_ROOM:{ name:"Gerudo Training Ground MQ Sand Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_FIRST_IRON_KNUCKLE_CHEST", () => (L.CanKillEnemy("RE_IRON_KNUCKLE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_BOULDER_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_BOULDER_ROOM:{ name:"Gerudo Training Ground MQ Left Side", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_SAND_ROOM", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_STALFOS_ROOM", () => (L.AnyAgeTime((() => (L.CanUse("RG_LONGSHOT") || L.trick("RT_GTG_MQ_WITHOUT_HOOKSHOT") || (L.trick("RT_GTG_MQ_WITH_HOOKSHOT") && L.IsAdult && L.CanJumpslash() && L.CanUse("RG_HOOKSHOT"))))))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_STALFOS_ROOM:{ name:"Gerudo Training Ground MQ Stalfos Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => true],
      ["LOGIC_GTG_UNLOCKED_DOOR_BEHIND_HEAVY_BLOCK", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2, true)))))],
      ["LOGIC_GTG_PUSHED_HEAVY_BLOCK", () => (L.CanUse("RG_SILVER_GAUNTLETS") && L.CanAvoidEnemy("RE_STALFOS", true, 2))]
    ],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_BEFORE_HEAVY_BLOCK_CHEST", () => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2, true) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_BOULDER_ROOM", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_BEHIND_BLOCK", () => (L.Get("LOGIC_GTG_PUSHED_HEAVY_BLOCK"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_STATUE_ROOM_LEDGE", () => (L.IsAdult && L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2, true)))) && (L.trick("RT_LENS_GTG_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.BlueFire() && (L.CanUse("RG_SONG_OF_TIME") || (L.trick("RT_GTG_FAKE_WALL") && L.IsAdult && L.CanUse("RG_HOVER_BOOTS")) || (L.IsAdult && L.CanGroundJump())))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_BEHIND_BLOCK:{ name:"Gerudo Training Ground MQ Behind Block", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_STALFOS_ROOM", () => (L.Get("LOGIC_GTG_PUSHED_HEAVY_BLOCK"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_ROOM_BEHIND_BLOCK", () => (L.Get("LOGIC_GTG_UNLOCKED_DOOR_BEHIND_HEAVY_BLOCK"))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_ROOM_BEHIND_BLOCK:{ name:"Gerudo Training Ground MQ Room Behind Block", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_HEAVY_BLOCK_CHEST", () => (L.CanKillEnemy("RE_FREEZARD") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_BEHIND_BLOCK", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_STATUE_ROOM_LEDGE:{ name:"Gerudo Training Ground MQ Statue Room Ledge", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_STALFOS_ROOM", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAGENTA_FIRE_ROOM", () => (L.AnyAgeTime((() => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_MASTER_SWORD") || L.CanUse("RG_BIGGORON_SWORD") || L.CanUse("RG_STICKS") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_BOOMERANG")))))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_STATUE_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_MAGENTA_FIRE_ROOM:{ name:"Gerudo Training Ground MQ Magenta Fire Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_ICE_ARROWS_CHEST", () => (L.Get("LOGIC_GTG_MQ_MAZE_SWITCH") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_STATUE_ROOM_LEDGE", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_STATUE_ROOM:{ name:"Gerudo Training Ground MQ Statue Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_EYE_STATUE_CHEST", () => (L.CanUse("RG_FAIRY_BOW") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_STATUE_ROOM_LEDGE", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_TORCH_SLUG_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_TORCH_SLUG_ROOM:{ name:"Gerudo Training Ground MQ Torch Slug Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_SECOND_IRON_KNUCKLE_CHEST", () => (L.CanKillEnemy("RE_IRON_KNUCKLE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MQ_FLAME_CIRCLE_CHEST", () => (L.CanHitSwitch("ED_BOMB_THROW") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_STATUE_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_SWITCH_LEDGE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_SWITCH_LEDGE:{ name:"Gerudo Training Ground MQ Switch Ledge", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_MQ_RIGHT_SIDE_SWITCH", () => (L.CanUse("RG_MEGATON_HAMMER"))],
      ["LOGIC_GTG_PLATFORM_SILVER_RUPEES", () => (L.CanUse("RG_FIRE_ARROWS") && L.CanUse("RG_HOVER_BOOTS"))]
    ],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LEDGE_SIDE_PLATFORMS", () => (L.CanUse("RG_FIRE_ARROWS"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_PLATFORMS_UNLIT_TORCH", () => (L.CanUse("RG_LONGSHOT") || (L.Get("LOGIC_GTG_PLATFORM_SILVER_RUPEES") && L.CanUse("RG_HOOKSHOT")) || ((L.CanUse("RG_FIRE_ARROWS") && L.Get("LOGIC_GTG_PLATFORM_SILVER_RUPEES")) && L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAZE_RIGHT", () => (L.Get("LOGIC_GTG_MQ_RIGHT_SIDE_SWITCH") && L.CanUse("RG_LONGSHOT"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_TORCH_SLUG_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_LEDGE_SIDE_PLATFORMS:{ name:"Gerudo Training Ground MQ Ledge Side Platforms", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_FURTHEST_PLATFORM", () => (L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_FURTHEST_PLATFORM:{ name:"Gerudo Training Ground MQ Furthest Platform", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LEDGE_SIDE_PLATFORMS", () => (L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_PLATFORMS_UNLIT_TORCH:{ name:"Gerudo Training Ground MQ Platforms Unlit Torch", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_PLATFORM_SILVER_RUPEES", () => (L.HasFireSource() && L.CanUse("RG_HOVER_BOOTS"))]
    ],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_UNDERWATER", () => (L.Get("LOGIC_GTG_PLATFORM_SILVER_RUPEES"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_LEDGE_SIDE_PLATFORMS", () => (L.HasFireSource() && L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_TORCH_SIDE_PLATFORMS", () => (L.HasFireSource() || L.CanUse("RG_LONGSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAZE_RIGHT", () => (L.Get("LOGIC_GTG_MQ_RIGHT_SIDE_SWITCH") && (L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOOKSHOT") && L.HasFireSource())))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_TORCH_SIDE_PLATFORMS:{ name:"Gerudo Training Ground Torch Side Platforms", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_PLATFORM_SILVER_RUPEES", () => (((L.CanUse("RG_FAIRY_BOW") && L.IsAdult) || L.CanUse("RG_FIRE_ARROWS")) && L.CanUse("RG_HOVER_BOOTS"))]
    ],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LEDGE_SIDE_PLATFORMS", () => (((L.CanUse("RG_FAIRY_BOW") && L.IsAdult) || L.CanUse("RG_FIRE_ARROWS")) && (L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && L.trick("RT_GTG_LAVA_JUMP")) || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.CanUse("RG_BOMB_BAG") && L.TakeDamage())))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_PLATFORMS_UNLIT_TORCH", () => ((L.CanUse("RG_FAIRY_BOW") && L.IsAdult) || L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_LONGSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_MAZE_RIGHT", () => (L.Get("LOGIC_GTG_MQ_RIGHT_SIDE_SWITCH") && ((L.CanUse("RG_FAIRY_BOW") && L.IsAdult) || L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_LONGSHOT")))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_DINOLFOS_ROOM", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_UNDERWATER:{ name:"Gerudo Training Ground MQ Underwater", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_UNDERWATER_SILVER_RUPEE_CHEST", () => ((L.HasFireSource() && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 24 && L.HasItem("RG_BRONZE_SCALE") && L.TakeDamage()) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_PLATFORMS_UNLIT_TORCH", () => true]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_MAZE_RIGHT:{ name:"Gerudo Training Ground MQ Maze Right", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_GTG_PLATFORM_SILVER_RUPEES", () => (L.CanUse("RG_FIRE_ARROWS") && L.CanUse("RG_HOVER_BOOTS"))]
    ],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_MAZE_RIGHT_CENTRAL_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GERUDO_TRAINING_GROUND_MQ_MAZE_RIGHT_SIDE_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_TORCH_SIDE_PLATFORMS", () => (L.CanUse("RG_FIRE_ARROWS") || L.CanUse("RG_LONGSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_PLATFORMS_UNLIT_TORCH", () => (L.CanUse("RG_FIRE_ARROWS") || L.CanUse(L.Get("LOGIC_GTG_PLATFORM_SILVER_RUPEES") ? "RG_HOOKSHOT" : "RG_LONGSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.Get("LOGIC_GTG_MQ_RIGHT_SIDE_SWITCH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_LEDGE_SIDE_PLATFORMS", () => (L.CanUse("RG_FIRE_ARROWS"))],
      ["RR_GERUDO_TRAINING_GROUND_MQ_FURTHEST_PLATFORM", () => (L.CanUse("RG_FIRE_ARROWS"))]
    ] },
    RR_GERUDO_TRAINING_GROUND_MQ_DINOLFOS_ROOM:{ name:"Gerudo Training Ground MQ Dinolfos Room", scene:"SCENE_GERUDO_TRAINING_GROUND", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.IsAdult && L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[
      ["RC_GERUDO_TRAINING_GROUND_MQ_DINOLFOS_CHEST", () => ((L.CanUse("RG_MASTER_SWORD") || L.CanUse("RG_BIGGORON_SWORD") || L.CanUse("RG_MEGATON_HAMMER") || L.CanUse("RG_FAIRY_BOW") || ((L.CanUse("RG_NUTS") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_BOOMERANG")) && (L.CanUse("RG_KOKIRI_SWORD") || L.CanUse("RG_FAIRY_SLINGSHOT")))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_MQ_LOBBY", () => true],
      ["RR_GERUDO_TRAINING_GROUND_MQ_TORCH_SIDE_PLATFORMS", () => (L.AnyAgeTime((() => (L.CanUse("RG_MASTER_SWORD") || L.CanUse("RG_BIGGORON_SWORD") || L.CanUse("RG_MEGATON_HAMMER") || L.CanUse("RG_FAIRY_BOW") || ((L.CanUse("RG_NUTS") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_BOOMERANG")) && (L.CanUse("RG_KOKIRI_SWORD") || L.CanUse("RG_FAIRY_SLINGSHOT")))))))]
    ] },
    RR_ICE_CAVERN_ENTRYWAY:{ name:"Ice Cavern Entryway", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ICE_CAVERN_BEGINNING", () => (!L.mq("ICE_CAVERN"))],
      ["RR_ICE_CAVERN_MQ_BEGINNING", () => (L.mq("ICE_CAVERN") && L.CanUseProjectile())],
      ["RR_ZF_LEDGE", () => true]
    ] },
    RR_ICE_CAVERN_BEGINNING:{ name:"Ice Cavern Beginning", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_ENTRANCE_STORMS_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ICE_CAVERN_LOBBY_RUPEE", () => (L.BlueFire())]
    ],
      exits:[
      ["RR_ICE_CAVERN_ENTRYWAY", () => true],
      ["RR_ICE_CAVERN_HUB", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_FREEZARD", "ED_CLOSE", true, 4)))))],
      ["RR_ICE_CAVERN_ABOVE_BEGINNING", () => false]
    ] },
    RR_ICE_CAVERN_HUB:{ name:"Ice Cavern Hub", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_GS_SPINNING_SCYTHE_ROOM", () => (L.HookshotOrBoomerang())],
      ["RC_ICE_CAVERN_HALL_POT_1", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_HALL_POT_2", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_SPINNING_BLADE_POT_1", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_SPINNING_BLADE_POT_2", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_SPINNING_BLADE_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_ICE_CAVERN_BEGINNING", () => true],
      ["RR_ICE_CAVERN_MAP_ROOM", () => ((L.IsAdult ) && L.CanClearStalagmite())],
      ["RR_ICE_CAVERN_COMPASS_ROOM", () => (L.AnyAgeTime((() => (L.BlueFire()))))],
      ["RR_ICE_CAVERN_BLOCK_ROOM", () => (L.AnyAgeTime((() => (L.BlueFire()))) && (L.CanClearStalagmite() || L.trick("RT_ICE_STALAGMITE_CLIP")))]
    ] },
    RR_ICE_CAVERN_MAP_ROOM:{ name:"Ice Cavern Map Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => true]
    ],
      checks:[
      ["RC_ICE_CAVERN_MAP_CHEST", () => (L.BlueFire() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_ICE_CAVERN_FROZEN_POT_1", () => ((L.CanBreakPots() && L.BlueFire()) || L.HasExplosives() || (L.trick("RT_VISIBLE_COLLISION") && L.CanJumpslash()) || (L.trick("RT_ITEM_EXTENSION") && L.CanUse("RG_HOOKSHOT")))],
      ["RC_ICE_CAVERN_MAP_ROOM_LEFT_HEART", () => true],
      ["RC_ICE_CAVERN_MAP_ROOM_MIDDLE_HEART", () => true],
      ["RC_ICE_CAVERN_MAP_ROOM_RIGHT_HEART", () => true]
    ],
      exits:[
      ["RR_ICE_CAVERN_HUB", () => true]
    ] },
    RR_ICE_CAVERN_COMPASS_ROOM:{ name:"Ice Cavern Map Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => true]
    ],
      checks:[
      ["RC_ICE_CAVERN_COMPASS_CHEST", () => ((L.IsChild || L.CanClearStalagmite() || L.trick("RT_ICE_STALAGMITE_CLIP")) && L.BlueFire() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_ICE_CAVERN_FREESTANDING_POH", () => ((L.CanClearStalagmite() || L.trick("RT_ICE_STALAGMITE_CLIP")) && L.BlueFire())],
      ["RC_ICE_CAVERN_GS_HEART_PIECE_ROOM", () => (L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_ICE_CAVERN_HUB", () => true]
    ] },
    RR_ICE_CAVERN_BLOCK_ROOM:{ name:"Ice Cavern Block Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_GS_PUSH_BLOCK_ROOM", () => (L.HookshotOrBoomerang() || (L.trick("RT_ICE_BLOCK_GS") && L.IsAdult && L.CanUse("RG_HOVER_BOOTS") && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH")))],
      ["RC_ICE_CAVERN_SLIDING_BLOCK_RUPEE_1", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_ICE_CAVERN_SLIDING_BLOCK_RUPEE_2", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_ICE_CAVERN_SLIDING_BLOCK_RUPEE_3", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_ICE_CAVERN_HUB", () => (L.CanClearStalagmite() || L.trick("RT_ICE_STALAGMITE_CLIP"))],
      ["RR_ICE_CAVERN_BLOCK_ROOM_BLUE_FIRE", () => (L.HasItem("RG_POWER_BRACELET") || (L.IsAdult && (L.CanGroundJump() || L.trick("RT_SLIDE_JUMP"))))],
      ["RR_ICE_CAVERN_BEFORE_FINAL_ROOM", () => ((L.HasItem("RG_POWER_BRACELET") || (L.IsAdult && (L.CanGroundJump() || L.trick("RT_SLIDE_JUMP")))) && L.AnyAgeTime((() => (L.BlueFire()))))]
    ] },
    RR_ICE_CAVERN_BLOCK_ROOM_BLUE_FIRE:{ name:"Ice Cavern Block Room Blue Fire", scene:"SCENE_ICE_CAVERN", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => true]
    ],
      checks:[
      ["RC_ICE_CAVERN_SLIDING_BLOCK_RUPEE_1", () => (L.CanUse("RG_SONG_OF_TIME"))],
      ["RC_ICE_CAVERN_SLIDING_BLOCK_RUPEE_2", () => (L.CanUse("RG_SONG_OF_TIME"))],
      ["RC_ICE_CAVERN_SLIDING_BLOCK_RUPEE_3", () => (L.CanUse("RG_SONG_OF_TIME"))]
    ],
      exits:[
      ["RR_ICE_CAVERN_BLOCK_ROOM", () => true]
    ] },
    RR_ICE_CAVERN_BEFORE_FINAL_ROOM:{ name:"Ice Cavern Before Final Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_GS_PUSH_BLOCK_ROOM", () => (L.trick("RT_ICE_BLOCK_GS") && L.IsAdult && L.CanUse("RG_HOVER_BOOTS") && L.BlueFire() && L.HasItem("RG_POWER_BRACELET"))],
      ["RC_ICE_CAVERN_NEAR_END_POT_1", () => (L.CanBreakPots() && L.BlueFire())],
      ["RC_ICE_CAVERN_NEAR_END_POT_2", () => (L.CanBreakPots() && L.BlueFire())]
    ],
      exits:[
      ["RR_ICE_CAVERN_BLOCK_ROOM", () => (L.AnyAgeTime((() => (L.BlueFire()))))],
      ["RR_ICE_CAVERN_FINAL_ROOM", () => true]
    ] },
    RR_ICE_CAVERN_FINAL_ROOM:{ name:"Ice Cavern Final Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_IRON_BOOTS_CHEST", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_WOLFOS")))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHEIK_IN_ICE_CAVERN", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_WOLFOS")))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_ICE_CAVERN_BEFORE_FINAL_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_WOLFOS")))))],
      ["RR_ICE_CAVERN_FINAL_ROOM_UNDERWATER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_WOLFOS")))) && L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_ICE_CAVERN_FINAL_ROOM_UNDERWATER:{ name:"Ice Cavern Final Room Underwater", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ICE_CAVERN_FINAL_ROOM", () => (L.CanUse("RG_BRONZE_SCALE"))],
      ["RR_ICE_CAVERN_ABOVE_BEGINNING", () => (L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_ICE_CAVERN_ABOVE_BEGINNING:{ name:"Ice Cavern Above Beginning", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ICE_CAVERN_FINAL_ROOM_UNDERWATER", () => (L.CanUse("RG_IRON_BOOTS"))],
      ["RR_ICE_CAVERN_BEGINNING", () => true]
    ] },
    RR_ICE_CAVERN_MQ_BEGINNING:{ name:"Ice Cavern MQ Beginning", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_MQ_ENTRANCE_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_ICE_CAVERN_ENTRYWAY", () => true],
      ["RR_ICE_CAVERN_MQ_HUB", () => (L.HasItem("RG_POWER_BRACELET") || L.CanHitSwitch("ED_BOMB_THROW") || (L.IsAdult && L.CanUse("RG_BIGGORON_SWORD")))],
      ["RR_ICE_CAVERN_MQ_ABOVE_BEGINNING", () => false]
    ] },
    RR_ICE_CAVERN_MQ_HUB:{ name:"Ice Cavern MQ Hub", scene:"SCENE_ICE_CAVERN", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_ICE_CAVERN_MQ_FIRST_CRYSTAL_POT_1", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_MQ_FIRST_CRYSTAL_POT_2", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_MQ_EARLY_WOLFOS_POT_1", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_MQ_EARLY_WOLFOS_POT_2", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_MQ_EARLY_WOLFOS_POT_3", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_MQ_EARLY_WOLFOS_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_ICE_CAVERN_MQ_MAP_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_WHITE_WOLFOS") && L.CanKillEnemy("RE_FREEZARD")))))],
      ["RR_ICE_CAVERN_MQ_COMPASS_ROOM", () => ((L.IsAdult ) && L.BlueFire())],
      ["RR_ICE_CAVERN_MQ_SCARECROW_ROOM", () => (L.BlueFire())]
    ] },
    RR_ICE_CAVERN_MQ_MAP_ROOM:{ name:"Ice Cavern MQ Map Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => (L.IsChild || L.CanClearStalagmite() || L.trick("RT_ICE_STALAGMITE_CLIP"))]
    ],
      checks:[
      ["RC_ICE_CAVERN_MQ_MAP_CHEST", () => (L.BlueFire() && L.AnyAgeTime((() => (L.CanHitSwitch()))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[] },
    RR_ICE_CAVERN_MQ_SCARECROW_ROOM:{ name:"Ice Cavern MQ Scarecrow Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => (L.CanUse("RG_SONG_OF_TIME") || (L.IsAdult && (L.CanGroundJump() || L.trick("RT_SLIDE_JUMP"))))]
    ],
      checks:[
      ["RC_ICE_CAVERN_MQ_GS_ICE_BLOCK", () => ((L.BlueFire() && L.HasItem("RG_POWER_BRACELET") && L.CanKillEnemy("RE_GOLD_SKULLTULA")) || L.CanHitSwitch(L.IsAdult ? "ED_LONG_JUMPSLASH" : "ED_BOMB_THROW"))],
      ["RC_ICE_CAVERN_MQ_GS_SCARECROW", () => (L.ReachScarecrow() || (L.IsAdult && (L.CanUse("RG_LONGSHOT") || L.CanGroundJump() || L.trick("RT_SLIDE_JUMP"))))]
    ],
      exits:[
      ["RR_ICE_CAVERN_MQ_HUB", () => (L.BlueFire())],
      ["RR_ICE_CAVERN_MQ_WEST_CORRIDOR", () => (L.IsAdult && L.BlueFire())]
    ] },
    RR_ICE_CAVERN_MQ_WEST_CORRIDOR:{ name:"Ice Cavern MQ West Corridor", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_MQ_PUSH_BLOCK_POT_1", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_MQ_PUSH_BLOCK_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_ICE_CAVERN_MQ_SCARECROW_ROOM", () => (L.BlueFire())],
      ["RR_ICE_CAVERN_MQ_STALFOS_ROOM", () => true]
    ] },
    RR_ICE_CAVERN_MQ_COMPASS_ROOM:{ name:"Ice Cavern MQ Compass Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[
      ["LOGIC_BLUE_FIRE_ACCESS", () => true]
    ],
      checks:[
      ["RC_ICE_CAVERN_MQ_COMPASS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_ICE_CAVERN_MQ_FREESTANDING_POH", () => (L.HasExplosives())],
      ["RC_ICE_CAVERN_MQ_GS_RED_ICE", () => ((L.CanUse("RG_BOTTLE_WITH_BLUE_FIRE") && (L.CanUse("RG_SONG_OF_TIME") || (L.IsAdult && L.trick("RT_ICE_MQ_RED_ICE_GS"))) && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA")) || (L.opt("RSK_BLUE_FIRE_ARROWS") && L.CanUse("RG_ICE_ARROWS")) || (L.trick("RT_ITEM_EXTENSION") && L.CanUse("RG_SONG_OF_TIME") && L.CanUse("RG_HOOKSHOT")))],
      ["RC_ICE_CAVERN_MQ_COMPASS_POT_1", () => (L.CanBreakPots())],
      ["RC_ICE_CAVERN_MQ_COMPASS_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[] },
    RR_ICE_CAVERN_MQ_STALFOS_ROOM:{ name:"Ice Cavern MQ Stalfos Room", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[
      ["RC_ICE_CAVERN_MQ_IRON_BOOTS_CHEST", () => (L.CanKillEnemy("RE_STALFOS") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHEIK_IN_ICE_CAVERN", () => (L.CanKillEnemy("RE_STALFOS") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_ICE_CAVERN_MQ_WEST_CORRIDOR", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS")))))],
      ["RR_ICE_CAVERN_MQ_STALFOS_ROOM_UNDERWATER", () => (L.CanUse("RG_IRON_BOOTS") && L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS")))))]
    ] },
    RR_ICE_CAVERN_MQ_STALFOS_ROOM_UNDERWATER:{ name:"Ice Cavern MQ Stalfos Room Underwater", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ICE_CAVERN_MQ_STALFOS_ROOM", () => (L.CanUse("RG_BRONZE_SCALE"))],
      ["RR_ICE_CAVERN_MQ_ABOVE_BEGINNING", () => (L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_ICE_CAVERN_MQ_ABOVE_BEGINNING:{ name:"Ice Cavern MQ Above Beginning", scene:"SCENE_ICE_CAVERN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ICE_CAVERN_MQ_STALFOS_ROOM_UNDERWATER", () => (L.CanUse("RG_IRON_BOOTS"))],
      ["RR_ICE_CAVERN_MQ_BEGINNING", () => true]
    ] },
    RR_JABU_JABUS_BELLY_ENTRYWAY:{ name:"Jabu Jabus Belly Entryway", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_BEGINNING", () => (!L.mq("JABU_JABUS_BELLY"))],
      ["RR_JABU_JABUS_BELLY_MQ_BEGINNING", () => (L.mq("JABU_JABUS_BELLY"))],
      ["RR_ZORAS_FOUNTAIN", () => true]
    ] },
    RR_JABU_JABUS_BELLY_BEGINNING:{ name:"Jabu Jabus Belly Beginning", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_ENTRYWAY", () => true],
      ["RR_JABU_JABUS_BELLY_LIFT_ROOM", () => (L.CanUseProjectile())]
    ] },
    RR_JABU_JABUS_BELLY_LIFT_ROOM:{ name:"Jabu Jabus Belly Lift Room", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_DEKU_SCRUB", () => (L.HasItem("RG_BRONZE_SCALE") && (L.IsChild || L.HasItem("RG_SILVER_SCALE") || L.trick("RT_UNINTUITIVE_JUMPS") || L.CanUse("RG_IRON_BOOTS")) && L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_JABU_JABUS_BELLY_PLATFORM_ROOM_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_JABU_JABUS_BELLY_PLATFORM_ROOM_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_BEGINNING", () => true],
      ["RR_JABU_JABUS_BELLY_HOLES_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_SOUTH", () => true],
      ["RR_JABU_JABUS_BELLY_NEAR_BOSS_ROOM", () => ((L.Get("LOGIC_JABU_LOWERED_PATH") || (L.trick("RT_JABU_BOSS_HOVER") && L.CanUse("RG_HOVER_BOOTS"))) && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_JABU_JABUS_BELLY_HOLES_ROOM:{ name:"Jabu Jabus Belly Holes Room", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_LIFT_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_FORKED_CORRIDOR", () => true],
      ["RR_JABU_JABUS_BELLY_HOLES_LOWER_DOOR_LEDGE", () => true],
      ["RR_JABU_JABUS_BELLY_BIGOCTO_LEDGE", () => (L.Get("LOGIC_JABU_NORTH_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_HOLES_BASEMENT:{ name:"Jabu Jabus Belly Holes Basement", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_GS_LOBBY_BASEMENT_LOWER", () => (L.HookshotOrBoomerang())],
      ["RC_JABU_JABUS_BELLY_GS_LOBBY_BASEMENT_UPPER", () => (L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_HOLES_ROOM", () => (L.HasItem("RG_CLIMB"))],
      ["RR_JABU_JABUS_BELLY_B1_JIGGLY", () => true],
      ["RR_JABU_JABUS_BELLY_HOLES_LOWER_DOOR_LEDGE", () => (L.IsAdult)]
    ] },
    RR_JABU_JABUS_BELLY_HOLES_LOWER_DOOR_LEDGE:{ name:"Jabu Jabus Belly Holes Lower Door Ledge", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_HOLES_BASEMENT", () => true],
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_NORTH", () => true]
    ] },
    RR_JABU_JABUS_BELLY_B1_JIGGLY:{ name:"Jabu Jabus Belly B1 Cube", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots() && L.trick("RT_JABU_B1_CUBE_HOVER") && L.CanUse("RG_HOVER_BOOTS")))]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_TWO_OCTOROK_POT_1", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots() && L.trick("RT_JABU_B1_CUBE_HOVER") && L.CanUse("RG_HOVER_BOOTS")))],
      ["RC_JABU_JABUS_BELLY_TWO_OCTOROK_POT_2", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots() && L.trick("RT_JABU_B1_CUBE_HOVER") && L.CanUse("RG_HOVER_BOOTS")))],
      ["RC_JABU_JABUS_BELLY_TWO_OCTOROK_POT_3", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots() && L.trick("RT_JABU_B1_CUBE_HOVER") && L.CanUse("RG_HOVER_BOOTS")))],
      ["RC_JABU_JABUS_BELLY_TWO_OCTOROK_POT_4", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots() && L.trick("RT_JABU_B1_CUBE_HOVER") && L.CanUse("RG_HOVER_BOOTS")))],
      ["RC_JABU_JABUS_BELLY_TWO_OCTOROK_POT_5", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots() && L.trick("RT_JABU_B1_CUBE_HOVER") && L.CanUse("RG_HOVER_BOOTS")))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_HOLES_BASEMENT", () => true]
    ] },
    RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_NORTH:{ name:"Jabu Jabus Belly Water Switch Room North", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_RUTO_IN_1F", () => ((L.IsAdult || L.HasItem("RG_BRONZE_SCALE")) && L.HasItem("RG_SPEAK_ZORA") && L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_GS_WATER_SWITCH_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_LEDGE", () => ((L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOVER_BOOTS")) && L.HasItem("RG_CLIMB"))],
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_SOUTH", () => (L.IsAdult || L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_JABU_JABUS_BELLY_HOLES_BASEMENT", () => true]
    ] },
    RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_SOUTH:{ name:"Jabu Jabus Belly Water Switch Room South", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_GS_WATER_SWITCH_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_NORTH", () => (L.IsAdult || L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_LEDGE", () => ((L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOVER_BOOTS")) && L.HasItem("RG_CLIMB"))],
      ["RR_JABU_JABUS_BELLY_LIFT_ROOM", () => (L.CanHitSwitch("ED_BOMB_THROW"))]
    ] },
    RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_LEDGE:{ name:"Jabu Jabus Belly Water Switch Room Ledge", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_GS_WATER_SWITCH_ROOM", () => (L.HasItem("RG_POWER_BRACELET") && (L.HasItem("RG_BRONZE_SCALE") || (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))) || L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_BOMB_THROW"))],
      ["RC_JABU_JABUS_BELLY_BASEMENT_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BASEMENT_POT_2", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BASEMENT_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_NORTH", () => true],
      ["RR_JABU_JABUS_BELLY_WATER_SWITCH_ROOM_SOUTH", () => true],
      ["RR_JABU_JABUS_BELLY_LIFT_ROOM", () => (L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_JABU_JABUS_BELLY_FORKED_CORRIDOR:{ name:"Jabu Jabus Belly Forked Corridor", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_HOLES_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_FORK_WEST", () => (L.Get("LOGIC_JABU_RUTO_IN_1F"))],
      ["RR_JABU_JABUS_BELLY_TO_FORK_NORTH_WEST", () => true],
      ["RR_JABU_JABUS_BELLY_TO_FORK_NORTH", () => true],
      ["RR_JABU_JABUS_BELLY_TO_FORK_NORTH_EAST", () => true],
      ["RR_JABU_JABUS_BELLY_FORK_EAST", () => (L.Get("LOGIC_JABU_RUTO_IN_1F"))]
    ] },
    RR_JABU_JABUS_BELLY_FORK_WEST:{ name:"Jabu Jabus Belly Fork West", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_WEST_TENTACLE", () => (L.CanKillEnemy("RE_TENTACLE", "ED_BOOMERANG"))]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_MAP_CHEST", () => (L.Get("LOGIC_JABU_WEST_TENTACLE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_FORKED_CORRIDOR", () => true]
    ] },
    RR_JABU_JABUS_BELLY_TO_FORK_NORTH_WEST:{ name:"Jabu Jabus Belly To Fork West", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_FORKED_CORRIDOR", () => (L.Get("LOGIC_JABU_WEST_TENTACLE") || L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_FORK_NORTH_WEST", () => (L.Get("LOGIC_JABU_WEST_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_FORK_NORTH_WEST:{ name:"Jabu Jabus Belly Fork North West", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_COMPASS_CHEST", () => (L.CanKillEnemy("RE_SHABOM", "ED_CLOSE", false, 9) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_TO_FORK_NORTH_WEST", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_SHABOM", "ED_CLOSE", false, 9)))))]
    ] },
    RR_JABU_JABUS_BELLY_TO_FORK_NORTH:{ name:"Jabu Jabus Belly To Fork North", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_FORKED_CORRIDOR", () => (L.Get("LOGIC_JABU_EAST_TENTACLE") || L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_FORK_NORTH", () => (L.Get("LOGIC_JABU_EAST_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_FORK_NORTH:{ name:"Jabu Jabus Belly Fork North", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_NORTH_TENTACLE", () => (L.CanKillEnemy("RE_TENTACLE", "ED_BOOMERANG"))]
    ],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_TO_FORK_NORTH", () => (L.Get("LOGIC_JABU_NORTH_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_TO_FORK_NORTH_EAST:{ name:"Jabu Jabus Belly MQ To Fork West", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_FORKED_CORRIDOR", () => (L.Get("LOGIC_JABU_WEST_TENTACLE") || L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_FORK_NORTH_EAST", () => (L.Get("LOGIC_JABU_WEST_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_FORK_NORTH_EAST:{ name:"Jabu Jabus Belly Fork North East", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_EAST_TENTACLE", () => (L.CanKillEnemy("RE_TENTACLE", "ED_BOOMERANG"))]
    ],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_TO_FORK_NORTH_EAST", () => (L.Get("LOGIC_JABU_EAST_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_FORK_EAST:{ name:"Jabu Jabus Belly Fork East", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_BOOMERANG_CHEST", () => ((L.Get("LOGIC_JABU_RUTO_IN_1F") || L.CanKillEnemy("RE_STINGER", "ED_CLOSE", true, 4)) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_FORKED_CORRIDOR", () => true]
    ] },
    RR_JABU_JABUS_BELLY_BIGOCTO_LEDGE:{ name:"Jabu Jabus Belly Big Octo Ledge", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_GS_LOBBY_BASEMENT_UPPER", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_HOLES_BASEMENT", () => true],
      ["RR_JABU_JABUS_BELLY_BIGOCTO", () => (L.Get("LOGIC_JABU_RUTO_IN_1F") && L.AnyAgeTime((() => (L.CanKillEnemy("RE_BIG_OCTO")))))]
    ] },
    RR_JABU_JABUS_BELLY_BIGOCTO:{ name:"Jabu Jabus Belly Big Octo", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_BIGOCTO_LEDGE", () => (L.Get("LOGIC_JABU_RUTO_IN_1F") && L.AnyAgeTime((() => (L.CanKillEnemy("RE_BIG_OCTO")))))],
      ["RR_JABU_JABUS_BELLY_ABOVE_BIGOCTO", () => (L.Get("LOGIC_JABU_RUTO_IN_1F") && L.AnyAgeTime((() => (L.CanKillEnemy("RE_BIG_OCTO")))))]
    ] },
    RR_JABU_JABUS_BELLY_ABOVE_BIGOCTO:{ name:"Jabu Jabus Belly Above Big Octo", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_ABOVE_BIG_OCTO_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_ABOVE_BIG_OCTO_POT_2", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_ABOVE_BIG_OCTO_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_BIGOCTO", () => (L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_JIGGLIES_ROOM", () => true]
    ] },
    RR_JABU_JABUS_BELLY_JIGGLIES_ROOM:{ name:"Jabu Jabus Belly Jigglies Room", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_ABOVE_BIGOCTO", () => true],
      ["RR_JABU_JABUS_BELLY_LIFT_UPPER", () => (L.CanUse("RG_BOOMERANG") || (L.IsAdult && L.CanGroundJump()))]
    ] },
    RR_JABU_JABUS_BELLY_LIFT_UPPER:{ name:"Jabu Jabus Belly Lift Upper", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_LOWERED_PATH", () => true]
    ],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_LIFT_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_JIGGLIES_ROOM", () => true]
    ] },
    RR_JABU_JABUS_BELLY_NEAR_BOSS_ROOM:{ name:"Jabu Jabus Belly Near Boss Room", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_GS_NEAR_BOSS", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_BOMB_THROW") && (L.HasItem("RG_CLIMB") || L.HookshotOrBoomerang()))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_LIFT_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_BOSS_ENTRYWAY", () => ((L.HasItem("RG_CLIMB") && L.CanUse("RG_BOOMERANG")) || (L.trick("RT_JABU_NEAR_BOSS_RANGED") && (L.CanUse(L.HasItem("RG_CLIMB") ? "RG_HOOKSHOT" : "RG_LONGSHOT") || L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT"))) || (L.trick("RT_JABU_NEAR_BOSS_EXPLOSIVES") && (L.CanUse("RG_BOMBCHU_5") || (L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_BOMB_BAG") && L.HasItem("RG_CLIMB")))))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_BEGINNING:{ name:"Jabu Jabus Belly MQ Beginning", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_MAP_CHEST", () => (L.BlastOrSmash() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_FIRST_ROOM_SIDE_CHEST", () => (L.CanUse("RG_FAIRY_SLINGSHOT") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_ENTRANCE_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_ENTRANCE_POT_2", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_FIRST_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_JABU_JABUS_BELLY_MQ_FIRST_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_ENTRYWAY", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM", () => (L.AnyAgeTime((() => (L.CanUse("RG_FAIRY_SLINGSHOT")))))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM:{ name:"Jabu Jabus Belly MQ Lift Room", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_MQ_LIFT_ROOM_COW", () => (L.CanUse("RG_FAIRY_SLINGSHOT"))]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_SECOND_ROOM_LOWER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_HEART_1", () => true],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_HEART_2", () => true],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_RUPEE_1", () => (L.CanUse("RG_IRON_BOOTS"))],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_RUPEE_2", () => (L.CanUse("RG_IRON_BOOTS"))],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_RUPEE_3", () => (L.CanUse("RG_IRON_BOOTS"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_BEGINNING", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_UNDERWATER_ALCOVE", () => (L.HasItem("RG_SILVER_SCALE") || (L.HasItem("RG_BRONZE_SCALE") && ((L.IsChild || L.CanUse("RG_IRON_BOOTS") || L.trick("RT_UNINTUITIVE_JUMPS")))))],
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM", () => (L.Get("LOGIC_JABU_MQ_HOLES_ROOM_DOOR"))],
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM_EAST_LEDGE", () => (L.Get("LOGIC_JABU_LOWERED_PATH") || L.CanUse("RG_HOVER_BOOTS") || (L.CanUse("RG_HOOKSHOT") && L.Get("LOGIC_JABU_MQ_LIFT_ROOM_COW")))],
      ["RR_JABU_JABUS_BELLY_MQ_WATER_SWITCH_ROOM_PAST_GEYSER", () => (L.Get("LOGIC_JABU_MQ_WATER_SWITCH_LIFT_ACCESS"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_UNDERWATER_ALCOVE:{ name:"Jabu Jabus Belly MQ Underwater Alcove", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_MQ_HOLES_ROOM_DOOR", () => true]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_COMPASS_CHEST", () => ((L.CanHitSwitch("ED_HOOKSHOT", true) || (L.trick("RT_JABU_MQ_RANG_JUMP") && L.CanUse("RG_BOOMERANG") && L.HasItem("RG_BRONZE_SCALE"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_GEYSER_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_GEYSER_POT_2", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_RUPEE_1", () => (L.HasItem("RG_GOLDEN_SCALE") || L.CanUse("RG_BOOMERANG"))],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_RUPEE_2", () => (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_BOOMERANG"))],
      ["RC_JABU_JABUS_BELLY_MQ_LIFT_RUPEE_3", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM", () => (L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM:{ name:"Jabu Jabus Belly MQ Holes Room", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_MQ_FORKED_ROOM_DOOR", () => ((L.HasExplosives() || L.trick("RT_DISTANT_BOULDER_COLLISION")) && L.CanUse("RG_FAIRY_SLINGSHOT"))]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_PIT_GRASS_1", () => (L.CanCutShrubs() && L.HasExplosives())],
      ["RC_JABU_JABUS_BELLY_MQ_PIT_GRASS_2", () => (L.CanCutShrubs() && L.HasExplosives())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_BASEMENT", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM_PAST_JIGGLY", () => (L.CanUse("RG_BOOMERANG"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM_PAST_JIGGLY:{ name:"Jabu Jabus Belly MQ Holes Room Past Jiggly", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM", () => (L.CanUse("RG_BOOMERANG"))],
      ["RR_JABU_JABUS_BELLY_MQ_FORKED_CORRIDOR", () => (L.Get("LOGIC_JABU_MQ_FORKED_ROOM_DOOR"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_HOLES_BASEMENT:{ name:"Jabu Jabus Belly MQ Holes Basement", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_BASEMENT_NEAR_VINES_CHEST", () => (L.CanUse("RG_FAIRY_SLINGSHOT") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_BASEMENT_NEAR_SWITCHES_CHEST", () => (L.CanUse("RG_FAIRY_SLINGSHOT") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_BASEMENT_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_JABU_JABUS_BELLY_MQ_BASEMENT_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_JABU_JABUS_BELLY_MQ_BASEMENT_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM", () => (L.HasItem("RG_CLIMB"))],
      ["RR_JABU_JABUS_BELLY_MQ_TO_BIGOCTO", () => (L.Get("LOGIC_JABU_WEST_TENTACLE"))],
      ["RR_JABU_JABUS_BELLY_MQ_WATER_SWITCH_ROOM", () => (L.HasItem("RG_SPEAK_ZORA") && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_JABU_JABUS_BELLY_MQ_INVISIBLE_KEESE_ROOM", () => (L.Get("LOGIC_JABU_NORTH_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_WATER_SWITCH_ROOM:{ name:"Jabu Jabus Belly MQ Water Switch Room", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_MQ_WATER_SWITCH_LIFT_ACCESS", () => (L.CanKillEnemy("RE_LIZALFOS"))]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_BOOMERANG_ROOM_SMALL_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_BOOMERANG_CHEST", () => ((L.IsAdult || L.HasItem("RG_CLIMB")) && L.CanKillEnemy("RE_LIZALFOS") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_GS_BOOMERANG_CHEST_ROOM", () => ((L.CanUse("RG_SONG_OF_TIME") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA")) || (L.trick("RT_JABU_MQ_SOT_GS") && L.CanUse("RG_BOOMERANG")))],
      ["RC_JABU_JABUS_BELLY_MQ_TIME_BLOCK_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_TIME_BLOCK_POT_2", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_BASEMENT_BOOMERANG_GRASS", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_WATER_SWITCH_ROOM_PAST_GEYSER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS")))))],
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM", () => ((L.IsAdult || L.HasItem("RG_BRONZE_SCALE")) && L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIZALFOS")))))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_WATER_SWITCH_ROOM_PAST_GEYSER:{ name:"Jabu Jabus Belly MQ Water Switch Room Past Geyser", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_WATER_SWITCH_ROOM", () => (L.Get("LOGIC_JABU_MQ_WATER_SWITCH_LIFT_ACCESS"))],
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_FORKED_CORRIDOR:{ name:"Jabu Jabus Belly MQ Forked Corridor", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_ROOM", () => (L.CanUse("RG_BOOMERANG"))],
      ["RR_JABU_JABUS_BELLY_MQ_TO_FORK_WEST", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_TO_FORK_NORTH_WEST", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_TO_FORK_NORTH", () => (L.BlastOrSmash() && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_JABU_JABUS_BELLY_MQ_FORK_NORTH_EAST", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_FORK_EAST", () => (L.AnyAgeTime((() => (L.CanUse("RG_FAIRY_SLINGSHOT") && L.CanUse("RG_STICKS")))) || L.AnyAgeTime((() => (L.HasFireSource()))))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_TO_FORK_WEST:{ name:"Jabu Jabus Belly MQ To Fork West", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_FORKED_CORRIDOR", () => (L.Get("LOGIC_JABU_EAST_TENTACLE") || L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_MQ_FORK_WEST", () => (L.Get("LOGIC_JABU_EAST_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_FORK_WEST:{ name:"Jabu Jabus Belly MQ Fork West", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_WEST_TENTACLE", () => (L.CanKillEnemy("RE_TENTACLE", "ED_BOOMERANG"))]
    ],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_TO_FORK_WEST", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_TO_FORK_NORTH_WEST:{ name:"Jabu Jabus Belly MQ To Fork North West", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_FORKED_CORRIDOR", () => (L.Get("LOGIC_JABU_EAST_TENTACLE") || L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_MQ_FORK_NORTH_WEST", () => (L.Get("LOGIC_JABU_EAST_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_FORK_NORTH_WEST:{ name:"Jabu Jabus Belly MQ Fork North West", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_GS_TAILPASARAN_ROOM", () => (L.HasExplosives() && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_TO_FORK_NORTH_WEST", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_TO_FORK_NORTH:{ name:"Jabu Jabus Belly MQ To Fork North", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_FORKED_CORRIDOR", () => (L.BlastOrSmash())],
      ["RR_JABU_JABUS_BELLY_MQ_FORK_NORTH", () => (L.BlastOrSmash() && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_FORK_NORTH:{ name:"Jabu Jabus Belly MQ Fork North", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_NORTH_TENTACLE", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_TO_FORK_NORTH", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_FORK_NORTH_EAST:{ name:"Jabu Jabus Belly MQ Fork North East", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_FALLING_LIKE_LIKE_ROOM_CHEST", () => (L.CanUse("RG_FAIRY_SLINGSHOT") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_JABU_JABUS_BELLY_MQ_LIKE_LIKES_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_LIKE_LIKES_POT_2", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_FALLING_LIKE_LIKE_GRASS", () => (L.CanCutShrubs())],
      ["RC_JABU_JABUS_BELLY_MQ_TRIPLE_HALLWAY_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_JABU_JABUS_BELLY_MQ_TRIPLE_HALLWAY_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_FORKED_CORRIDOR", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_FORK_EAST:{ name:"Jabu Jabus Belly MQ Fork East", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_EAST_TENTACLE", () => (L.CanKillEnemy("RE_TENTACLE", "ED_BOOMERANG"))]
    ],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_FORKED_CORRIDOR", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_INVISIBLE_KEESE_ROOM:{ name:"Jabu Jabus Belly MQ Invisible Keese Room", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_GS_INVISIBLE_ENEMIES_ROOM", () => (L.CanUse("RG_FIRE_ARROWS") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT") || ((L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (L.IsAdult && L.CanGroundJumpslash())) && ((L.CanUse("RG_HOVER_BOOTS") || L.AnyAgeTime((() => ((L.trick("RT_LENS_JABU_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanKillEnemy("RE_STINGER", "ED_BOOMERANG", false, 2, false, true) && (L.CanKillEnemy("RE_KEESE", "ED_LONGSHOT", false) || (L.trick("RT_LENS_JABU_MQ") && L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS"))))))) && ((L.IsChild && L.HasItem("RG_BRONZE_SCALE")) || (L.IsAdult && L.CanUse("RG_IRON_BOOTS"))))))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_BASEMENT", () => ((L.Get("LOGIC_JABU_NORTH_TENTACLE") || L.TakeDamage()) && L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_TO_BIGOCTO:{ name:"Jabu Jabus Belly MQ To Big Octo", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_HOLES_BASEMENT", () => (L.Get("LOGIC_JABU_WEST_TENTACLE") || L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_MQ_BIGOCTO", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_BIGOCTO:{ name:"Jabu Jabus Belly MQ Big Octo", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_TO_BIGOCTO", () => (L.AnyAgeTime((() => (L.HasItem("RG_SPEAK_ZORA") && L.HasItem("RG_POWER_BRACELET") && L.CanKillEnemy("RE_BIG_OCTO")))))],
      ["RR_JABU_JABUS_BELLY_MQ_ABOVE_BIGOCTO", () => (L.AnyAgeTime((() => (L.HasItem("RG_SPEAK_ZORA") && L.HasItem("RG_POWER_BRACELET") && L.CanKillEnemy("RE_BIG_OCTO")))))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_ABOVE_BIGOCTO:{ name:"Jabu Jabus Belly MQ Above Big Octo", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_AFTER_BIG_OCTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_JABU_JABUS_BELLY_MQ_AFTER_BIG_OCTO_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_JIGGLIES_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_BIGOCTO", () => (L.TakeDamage() && L.AnyAgeTime((() => (L.CanKillEnemy("RE_BIG_OCTO")))))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_JIGGLIES_ROOM:{ name:"Jabu Jabus Belly MQ Cubes Room", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_COW", () => (L.CanUse("RG_EPONAS_SONG") && L.CanUse("RG_FAIRY_SLINGSHOT"))],
      ["RC_JABU_JABUS_BELLY_MQ_JIGGLIES_GRASS", () => (L.CanCutShrubs())],
      ["RC_JABU_JABUS_BELLY_MQ_JIGGLIES_SMALL_CRATE_1", () => (L.CanUse("RG_FAIRY_SLINGSHOT") && L.CanBreakSmallCrates())],
      ["RC_JABU_JABUS_BELLY_MQ_JIGGLIES_SMALL_CRATE_2", () => (L.CanUse("RG_FAIRY_SLINGSHOT") && L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_ABOVE_BIGOCTO", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_ABOVE_LIFT_ROOM", () => (L.CanUse("RG_BOOMERANG") && L.CanUse("RG_FAIRY_SLINGSHOT") && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_ABOVE_LIFT_ROOM:{ name:"Jabu Jabus Belly MQ Above Lift Room", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_JABU_LOWERED_PATH", () => true]
    ],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_JIGGLIES_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM_EAST_LEDGE:{ name:"Jabu Jabus Belly MQ Lift Room East Ledge", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_SECOND_ROOM_UPPER_CHEST", () => (L.Get("LOGIC_JABU_MQ_LIFT_ROOM_COW") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_MQ_TO_NEAR_BOSS_ROOM", () => true]
    ] },
    RR_JABU_JABUS_BELLY_MQ_TO_NEAR_BOSS_ROOM:{ name:"Jabu Jabus Belly MQ To Near Boss Room", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_LIFT_ROOM_EAST_LEDGE", () => (L.Get("LOGIC_JABU_NORTH_TENTACLE") || L.TakeDamage())],
      ["RR_JABU_JABUS_BELLY_MQ_NEAR_BOSS_ROOM", () => (L.Get("LOGIC_JABU_NORTH_TENTACLE"))]
    ] },
    RR_JABU_JABUS_BELLY_MQ_NEAR_BOSS_ROOM:{ name:"Jabu Jabus Belly MQ Near Boss Room", scene:"SCENE_JABU_JABU", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_MQ_NEAR_BOSS_CHEST", () => (L.CanUse("RG_FAIRY_SLINGSHOT"))],
      ["RC_JABU_JABUS_BELLY_MQ_GS_NEAR_BOSS", () => ((L.HasItem("RG_CLIMB") && (L.CanUse("RG_BOOMERANG") || (L.trick("RT_JABU_NEAR_BOSS_RANGED") && L.CanUse("RG_HOOKSHOT")))) || (L.trick("RT_JABU_NEAR_BOSS_RANGED") && L.CanUse("RG_LONGSHOT")))],
      ["RC_JABU_JABUS_BELLY_MQ_BEFORE_BOSS_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_MQ_BEFORE_BOSS_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_JABU_JABUS_BELLY_MQ_BEFORE_BOSS_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_MQ_TO_NEAR_BOSS_ROOM", () => true],
      ["RR_JABU_JABUS_BELLY_BOSS_ENTRYWAY", () => (L.AnyAgeTime((() => (L.CanUse("RG_FAIRY_SLINGSHOT")))))]
    ] },
    RR_JABU_JABUS_BELLY_BOSS_ENTRYWAY:{ name:"Jabu Jabus Belly Boss Entryway", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_BOSS_ROOM", () => true]
    ] },
    RR_JABU_JABUS_BELLY_BOSS_EXIT:{ name:"Jabu Jabus Belly Boss Exit", scene:"SCENE_JABU_JABU", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_JABU_JABUS_BELLY_NEAR_BOSS_ROOM", () => (!L.mq("JABU_JABUS_BELLY"))],
      ["RR_JABU_JABUS_BELLY_MQ_NEAR_BOSS_ROOM", () => (L.mq("JABU_JABUS_BELLY"))]
    ] },
    RR_JABU_JABUS_BELLY_BOSS_ROOM:{ name:"Jabu Jabus Belly Boss Room", scene:"SCENE_JABU_JABU_BOSS", time:false,
      events:[
      ["LOGIC_JABU_JABUS_BELLY_CLEAR", () => (L.CanKillEnemy("RE_BARINADE"))]
    ],
      checks:[
      ["RC_JABU_JABUS_BELLY_BARINADE_POT_1", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BARINADE_POT_2", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BARINADE_POT_3", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BARINADE_POT_4", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BARINADE_POT_5", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BARINADE_POT_6", () => (L.CanBreakPots())],
      ["RC_JABU_JABUS_BELLY_BARINADE_HEART", () => (L.Get("LOGIC_JABU_JABUS_BELLY_CLEAR"))],
      ["RC_BARINADE", () => (L.Get("LOGIC_JABU_JABUS_BELLY_CLEAR"))]
    ],
      exits:[
      ["RR_JABU_JABUS_BELLY_BOSS_EXIT", () => false],
      ["RR_ZORAS_FOUNTAIN", () => (L.Get("LOGIC_JABU_JABUS_BELLY_CLEAR"))]
    ] },
    RR_SHADOW_TEMPLE_ENTRYWAY:{ name:"Shadow Temple Entryway", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_BEGINNING", () => (!L.mq("SHADOW_TEMPLE") && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_SHADOW_TEMPLE_MQ_BEGINNING", () => (L.mq("SHADOW_TEMPLE"))],
      ["RR_GRAVEYARD_WARP_PAD_REGION", () => true]
    ] },
    RR_SHADOW_TEMPLE_BEGINNING:{ name:"Shadow Temple Beginning", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_ENTRYWAY", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_START", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_FIRST_BEAMOS", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_POWER_BRACELET") && L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_SHADOW_TEMPLE_WHISPERING_WALLS_START:{ name:"Shadow Temple Whispering Walls Start", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_WHISPERING_WALLS_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_WHISPERING_WALLS_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_BEGINNING", () => true],
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_SIDE", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_END", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_SHADOW_TEMPLE_WHISPERING_WALLS_SIDE:{ name:"Shadow Temple Whispering Walls Side", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_WHISPERING_WALLS_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_WHISPERING_WALLS_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_START", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_SIDE_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_WHISPERING_WALLS_END:{ name:"Shadow Temple Whispering Walls End", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_WHISPERING_WALLS_POT_3", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_WHISPERING_WALLS_POT_4", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_WHISPERING_WALLS_POT_5", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_NEAR_DEAD_HAND_POT_1", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_START", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_DEAD_HAND", () => true]
    ] },
    RR_SHADOW_TEMPLE_WHISPERING_WALLS_SIDE_ROOM:{ name:"Shadow Temple Whispering Walls Side Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MAP_CHEST", () => (L.CanKillEnemy("RE_REDEAD") && L.CanKillEnemy("RE_KEESE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MAP_CHEST_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MAP_CHEST_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_SIDE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_REDEAD") && L.CanKillEnemy("RE_KEESE")))))]
    ] },
    RR_SHADOW_TEMPLE_DEAD_HAND:{ name:"Shadow Temple Dead Hand", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_HOVER_BOOTS_CHEST", () => (L.CanKillEnemy("RE_DEAD_HAND") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_WHISPERING_WALLS_END", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DEAD_HAND")))))]
    ] },
    RR_SHADOW_TEMPLE_FIRST_BEAMOS:{ name:"Shadow Temple First Beamos", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_BEAMOS_STORM_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_BEGINNING", () => (L.trick("RT_VISIBLE_COLLISION") && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_SHADOW_TEMPLE_COMPASS_ROOM", () => true],
      ["RR_SHADOW_TEMPLE_SPINNING_BLADES", () => true],
      ["RR_SHADOW_TEMPLE_B2_TO_B3_CORRIDOR_B2", () => (L.HasExplosives() && L.SmallKeys("SCENE_SHADOW_TEMPLE", 1))]
    ] },
    RR_SHADOW_TEMPLE_COMPASS_ROOM:{ name:"Shadow Temple Compass Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_COMPASS_CHEST", () => (L.CanKillEnemy("RE_GIBDO") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_FIRST_BEAMOS", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_GIBDO")))))]
    ] },
    RR_SHADOW_TEMPLE_SPINNING_BLADES:{ name:"Shadow Temple Spinning Blades", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_EARLY_SILVER_RUPEE_CHEST", () => (((L.IsAdult && (L.CanUse("RG_HOVER_BOOTS") || L.CanGroundJump())) || L.CanUse("RG_HOOKSHOT")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_FIRST_BEAMOS", () => true],
      ["RR_SHADOW_TEMPLE_DOCK", () => (L.Get("LOGIC_SHADOW_SHORTCUT_BLOCK"))]
    ] },
    RR_SHADOW_TEMPLE_B2_TO_B3_CORRIDOR_B2:{ name:"Shadow Temple B2 to B3 Corridor B2", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_FIRST_BEAMOS", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 1))],
      ["RR_SHADOW_TEMPLE_B2_TO_B3_CORRIDOR_B3", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_SHADOW_TEMPLE_B2_TO_B3_CORRIDOR_B3:{ name:"Shadow Temple B2 to B3 Corridor B3", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_B2_TO_B3_CORRIDOR_B2", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_SHADOW_TEMPLE_UPPER_HUGE_PIT", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_SHADOW_TEMPLE_UPPER_HUGE_PIT:{ name:"Shadow Temple Upper Huge Pit", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_PIT_STORM_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_B2_TO_B3_CORRIDOR_B3", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_SHADOW_TEMPLE_UPPER_HUGE_PIT_DOOR_LEDGE", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_LOWER_HUGE_PIT", () => (L.IsAdult || L.CanJumpslash() || L.trick("RT_SHADOW_MQ_HUGE_PIT"))]
    ] },
    RR_SHADOW_TEMPLE_UPPER_HUGE_PIT_DOOR_LEDGE:{ name:"Shadow Temple Upper Huge Pit Door Ledge", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_UPPER_HUGE_PIT", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_INVISIBLE_SPINNING_BLADES", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 2))]
    ] },
    RR_SHADOW_TEMPLE_LOWER_HUGE_PIT:{ name:"Shadow Temple Lower Huge Pit", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_UPPER_HUGE_PIT", () => (L.IsAdult || L.CanJumpslash())],
      ["RR_SHADOW_TEMPLE_LOWER_HUGE_PIT_DOOR_LEDGE", () => ((L.trick("RT_LENS_SHADOW_PLATFORM") && L.trick("RT_LENS_SHADOW")) || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_STONE_UMBRELLA", () => true]
    ] },
    RR_SHADOW_TEMPLE_STONE_UMBRELLA:{ name:"Shadow Temple Stone Umbrella", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_LOWER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_GS_FALLING_SPIKES_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (L.IsAdult && L.CanGroundJumpslash()))],
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_POT_2", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_POT_3", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_LOWER_HUGE_PIT", () => (!!L.trick("RT_VISIBLE_COLLISION"))],
      ["RR_SHADOW_TEMPLE_STONE_UMBRELLA_UPPER", () => (L.trick("RT_SHADOW_UMBRELLA_CLIP") || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.TakeDamage()) || (L.IsAdult && ((L.trick("RT_SHADOW_UMBRELLA_HOVER") && L.CanUse("RG_HOVER_BOOTS")) || L.HasItem("RG_GORONS_BRACELET"))))]
    ] },
    RR_SHADOW_TEMPLE_STONE_UMBRELLA_UPPER:{ name:"Shadow Temple Stone Umbrella Upper", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_UPPER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_SWITCH_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_GS_FALLING_SPIKES_ROOM", () => (L.trick("RT_SHADOW_UMBRELLA_GS") && L.CanUse("RG_HOVER_BOOTS") && L.CanStandingShield() && L.CanUse("RG_MASTER_SWORD"))],
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_POT_3", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_FALLING_SPIKES_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_STONE_UMBRELLA", () => true]
    ] },
    RR_SHADOW_TEMPLE_LOWER_HUGE_PIT_DOOR_LEDGE:{ name:"Shadow Temple Lower Huge Pit Door Ledge", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_LOWER_HUGE_PIT", () => ((L.trick("RT_LENS_SHADOW_PLATFORM") && L.trick("RT_LENS_SHADOW")) || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_INVISIBLE_SPIKES", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 2))]
    ] },
    RR_SHADOW_TEMPLE_INVISIBLE_SPINNING_BLADES:{ name:"Shadow Temple Invisible Spinning Blades", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_INVISIBLE_BLADES_VISIBLE_CHEST", () => (L.CanKillEnemy("RE_LIKE_LIKE") && L.CanKillEnemy("RE_KEESE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_INVISIBLE_BLADES_INVISIBLE_CHEST", () => (L.CanKillEnemy("RE_LIKE_LIKE") && L.CanKillEnemy("RE_KEESE") && (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_GS_LIKE_LIKE_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_LIKE_LIKE") && L.CanKillEnemy("RE_KEESE")))) && ((L.IsAdult && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH")) || L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG")))],
      ["RC_SHADOW_TEMPLE_INVISIBLE_BLADES_LEFT_HEART", () => ((L.CanUse("RG_SONG_OF_TIME") && L.IsAdult) || L.CanUse("RG_BOOMERANG"))],
      ["RC_SHADOW_TEMPLE_INVISIBLE_BLADES_RIGHT_HEART", () => ((L.CanUse("RG_SONG_OF_TIME") && L.IsAdult) || L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_UPPER_HUGE_PIT_DOOR_LEDGE", () => true]
    ] },
    RR_SHADOW_TEMPLE_INVISIBLE_SPIKES:{ name:"Shadow Temple Invisible Spikes", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_INVISIBLE_SPIKES_CHEST", () => (L.CanKillEnemy("RE_REDEAD") && (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH") || L.TakeDamage() || L.CanUse("RG_GORON_TUNIC")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_LOWER_HUGE_PIT_DOOR_LEDGE", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 2))],
      ["RR_SHADOW_TEMPLE_SKULL_JAR", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanUse("RG_HOOKSHOT") || (L.IsAdult && L.CanMiddairGroundJump())))],
      ["RR_SHADOW_TEMPLE_INVISIBLE_SPIKES_PLATFORM", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && ((L.IsAdult && L.CanMiddairGroundJump()) || L.CanUse(L.AnyAgeTime((() => (L.CanKillEnemy("RE_REDEAD") && (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH") || L.TakeDamage() || L.CanUse("RG_GORON_TUNIC"))))) ? "RG_HOOKSHOT" : "RG_LONGSHOT")))]
    ] },
    RR_SHADOW_TEMPLE_INVISIBLE_SPIKES_PLATFORM:{ name:"Shadow Temple Invisible Spikes Platform", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_INVISIBLE_SPIKES", () => true],
      ["RR_SHADOW_TEMPLE_UPPER_WIND_TUNNEL", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 3))]
    ] },
    RR_SHADOW_TEMPLE_SKULL_JAR:{ name:"Shadow Temple Skull Jar", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_FREESTANDING_KEY", () => (L.CanUse("RG_BOMB_BAG") || L.HasItem("RG_GORONS_BRACELET") || (L.trick("RT_SHADOW_FREESTANDING_KEY") && L.CanUse("RG_BOMBCHU_5")))],
      ["RC_SHADOW_TEMPLE_GS_SINGLE_GIANT_POT", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_INVISIBLE_SPIKES", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_KEESE")))))]
    ] },
    RR_SHADOW_TEMPLE_UPPER_WIND_TUNNEL:{ name:"Shadow Temple Upper Wind Tunnel", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_INVISIBLE_SPIKES_PLATFORM", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 3))],
      ["RR_SHADOW_TEMPLE_LOWER_WIND_TUNNEL", () => ((L.CanUse("RG_HOVER_BOOTS") && L.CanPassEnemy("RE_BIG_SKULLTULA")) || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_SHADOW_TEMPLE_LOWER_WIND_TUNNEL:{ name:"Shadow Temple Lower Wind Tunnel", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_UPPER_WIND_TUNNEL", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_SHADOW_TEMPLE_WIND_TUNNEL_ALCOVE", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_WIND_TUNNEL_HINT_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_WIND_TUNNEL_ALCOVE:{ name:"Shadow Temple Wind Tunnel Alcove", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_LOWER_WIND_TUNNEL", () => ((L.trick("RT_SHADOW_MQ_WINDY_WALKWAY")) || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SHADOW_TEMPLE_ROOM_TO_BOAT", () => true]
    ] },
    RR_SHADOW_TEMPLE_WIND_TUNNEL_HINT_ROOM:{ name:"Shadow Temple Wind Tunnel Hint Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_WIND_HINT_CHEST", () => (L.CanKillEnemy("RE_REDEAD") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_WIND_HINT_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_LOWER_WIND_TUNNEL", () => (L.CanKillEnemy("RE_REDEAD"))]
    ] },
    RR_SHADOW_TEMPLE_ROOM_TO_BOAT:{ name:"Shadow Temple Room to Boat", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_AFTER_WIND_ENEMY_CHEST", () => (L.CanKillEnemy("RE_GIBDO", "ED_CLOSE", true, 2) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_AFTER_WIND_HIDDEN_CHEST", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasExplosives() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_AFTER_WIND_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_AFTER_WIND_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_WIND_TUNNEL_ALCOVE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_GIBDO", "ED_CLOSE", true, 2)))))],
      ["RR_SHADOW_TEMPLE_DOCK", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 4))]
    ] },
    RR_SHADOW_TEMPLE_DOCK:{ name:"Shadow Temple Dock", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_SHORTCUT_BLOCK", () => (L.HasItem("RG_GORONS_BRACELET"))]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_GS_NEAR_SHIP", () => (L.CanUse("RG_LONGSHOT"))],
      ["RC_SHADOW_TEMPLE_SCARECROW_NORTH_HEART", () => (L.ReachDistantScarecrow())],
      ["RC_SHADOW_TEMPLE_SCARECROW_SOUTH_HEART", () => (L.ReachDistantScarecrow())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_ROOM_TO_BOAT", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 4))],
      ["RR_SHADOW_TEMPLE_SPINNING_BLADES", () => (L.Get("LOGIC_SHADOW_SHORTCUT_BLOCK") && L.HasItem("RG_CLIMB"))],
      ["RR_SHADOW_TEMPLE_BEYOND_BOAT", () => (((L.IsAdult && ((L.HasItem("RG_GORONS_BRACELET") && L.HasItem("RG_CLIMB")) || L.trick("RT_UNINTUITIVE_JUMPS"))) || (L.trick("RT_HOOKSHOT_LADDERS") && L.CanUse("RG_HOOKSHOT"))) && L.CanUse("RG_ZELDAS_LULLABY"))]
    ] },
    RR_SHADOW_TEMPLE_BEYOND_BOAT:{ name:"Shadow Temple Beyond Boat", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED", () => (L.CanUse("RG_FAIRY_BOW") || (L.trick("RT_SHADOW_STATUE") && L.CanUse("RG_BOMBCHU_5")))]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_AFTER_BOAT_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_AFTER_BOAT_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MAZE", () => true],
      ["RR_SHADOW_TEMPLE_CHASM_SCARECROW", () => (L.ReachDistantScarecrow())],
      ["RR_SHADOW_TEMPLE_ACROSS_CHASM", () => (L.Get("LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED"))]
    ] },
    RR_SHADOW_TEMPLE_CHASM_SCARECROW:{ name:"Shadow Temple Chasm Scarecrow", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_AFTER_SHIP_UPPER_LEFT_HEART", () => true],
      ["RC_SHADOW_TEMPLE_AFTER_SHIP_UPPER_RIGHT_HEART", () => true]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_ACROSS_CHASM", () => true],
      ["RR_SHADOW_TEMPLE_BROKEN_PILLAR", () => (L.CanUse("RG_HOVER_BOOTS") || (L.trick("RT_UNINTUITIVE_JUMPS") && L.IsAdult && L.CanJumpslash()))]
    ] },
    RR_SHADOW_TEMPLE_ACROSS_CHASM:{ name:"Shadow Temple Across Chasm", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED", () => (L.CanDetonateUprightBombFlower())]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_AFTER_BOAT_POT_3", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_AFTER_BOAT_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_BEYOND_BOAT", () => ((L.Get("LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED") && L.IsAdult) || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))],
      ["RR_SHADOW_TEMPLE_BROKEN_PILLAR", () => (L.IsAdult && L.CanUse("RG_SONG_OF_TIME"))],
      ["RR_SHADOW_TEMPLE_PRE_BOSS_ROOM", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 5))]
    ] },
    RR_SHADOW_TEMPLE_BROKEN_PILLAR:{ name:"Shadow Temple Broken Pillar", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_AFTER_SHIP_LOWER_HEART", () => true]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_ACROSS_CHASM", () => true],
      ["RR_SHADOW_TEMPLE_CHASM_SCARECROW", () => (L.IsAdult ? L.ReachScarecrow() : L.ReachDistantScarecrow())]
    ] },
    RR_SHADOW_TEMPLE_MAZE:{ name:"Shadow Temple Maze", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_BEYOND_BOAT", () => true],
      ["RR_SHADOW_TEMPLE_X_CROSS", () => true],
      ["RR_SHADOW_TEMPLE_THREE_SKULL_JARS", () => true],
      ["RR_SHADOW_TEMPLE_WOODEN_SPIKES", () => true]
    ] },
    RR_SHADOW_TEMPLE_X_CROSS:{ name:"Shadow Temple X-Cross", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_INVISIBLE_FLOORMASTER_CHEST", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanKillEnemy("RE_FLOORMASTER") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_FLOORMASTER_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_FLOORMASTER_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MAZE", () => (L.AnyAgeTime((() => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanKillEnemy("RE_FLOORMASTER")))))]
    ] },
    RR_SHADOW_TEMPLE_THREE_SKULL_JARS:{ name:"Shadow Temple Three Skull Jars", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_GS_TRIPLE_GIANT_POT", () => (L.HasItem("RG_GORONS_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MAZE", () => true]
    ] },
    RR_SHADOW_TEMPLE_WOODEN_SPIKES:{ name:"Shadow Temple Wooden Spikes", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_SPIKE_WALLS_LEFT_CHEST", () => (L.CanUse("RG_DINS_FIRE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_BOSS_KEY_CHEST", () => (L.CanUse("RG_DINS_FIRE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_SPIKE_WALLS_POT_1", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MAZE", () => true]
    ] },
    RR_SHADOW_TEMPLE_PRE_BOSS_ROOM:{ name:"Shadow Temple Pre Boss Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_BEYOND_BOAT", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 5))],
      ["RR_SHADOW_TEMPLE_BOSS_DOOR", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_SHADOW_TEMPLE_BOSS_DOOR:{ name:"Shadow Temple Boss Door", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_PRE_BOSS_ROOM", () => ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SHADOW_TEMPLE_BOSS_ENTRYWAY", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_BEGINNING:{ name:"Shadow Temple MQ Beginning", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_ENTRYWAY", () => ((L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_SHADOW_TEMPLE_MQ_SPINNER_ROOM", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_SPINNER_ROOM:{ name:"Shadow Temple MQ Spinner Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_TRUTH_SPINNER_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_SHADOW_TEMPLE_MQ_TRUTH_SPINNER_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())],
      ["RC_SHADOW_TEMPLE_MQ_TRUTH_SPINNER_SMALL_CRATE_3", () => (L.CanBreakSmallCrates())],
      ["RC_SHADOW_TEMPLE_MQ_TRUTH_SPINNER_SMALL_CRATE_4", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_ENTRYWAY", () => true],
      ["RR_SHADOW_TEMPLE_MQ_FIRST_BEAMOS", () => (L.AnyAgeTime((() => (L.HasItem("RG_POWER_BRACELET") && (L.CanUse("RG_HOVER_BOOTS") || (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))))) && (L.CanUse("RG_HOVER_BOOTS") || L.AnyAgeTime((() => (L.CanUse("RG_FIRE_ARROWS")))) || (L.trick("RT_SHADOW_MQ_GAP") && L.CanUse("RG_LONGSHOT") && L.CanJumpslashExceptHammer())))],
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_START", () => (L.AnyAgeTime((() => (L.HasExplosives()))) && L.SmallKeys("SCENE_SHADOW_TEMPLE", 6) && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ] },
    RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_START:{ name:"Shadow Temple MQ Whispering Walls Start", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_SPINNER_ROOM", () => true],
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_SIDE", () => (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_END", () => ((L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.IsChild || L.CanUse("RG_SONG_OF_TIME")))]
    ] },
    RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_SIDE:{ name:"Shadow Temple MQ Whispering Walls Side", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_START", () => (L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_SIDE_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_END:{ name:"Shadow Temple MQ Whispering Walls End", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_START", () => ((L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.IsChild || L.CanUse("RG_SONG_OF_TIME")))],
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_DEAD_HAND", () => (L.CanHitEyeTargets())]
    ] },
    RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_SIDE_ROOM:{ name:"Shadow Temple MQ Whispering Walls Redeads", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_COMPASS_CHEST", () => (L.CanKillEnemy("RE_REDEAD") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_ENTRANCE_REDEAD_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_ENTRANCE_REDEAD_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_SIDE", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_REDEAD")))))]
    ] },
    RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_DEAD_HAND:{ name:"Shadow Temple MQ Whispering Walls Dead Hand", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_HOVER_BOOTS_CHEST", () => (L.CanKillEnemy("RE_DEAD_HAND") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_WHISPERING_WALLS_END", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DEAD_HAND")))))]
    ] },
    RR_SHADOW_TEMPLE_MQ_FIRST_BEAMOS:{ name:"Shadow Temple MQ First Beamos", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_BEAMOS_STORM_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_SPINNER_ROOM", () => (L.trick("RT_VISIBLE_COLLISION") && (L.CanUse("RG_HOVER_BOOTS") || L.HasFireSource()))],
      ["RR_SHADOW_TEMPLE_MQ_B2_GIBDO_ROOM", () => true],
      ["RR_SHADOW_TEMPLE_MQ_B2_TO_B3_CORRIDOR_B2", () => (L.HasExplosives() && L.SmallKeys("SCENE_SHADOW_TEMPLE", 2))],
      ["RR_SHADOW_TEMPLE_MQ_B2_SPINNING_BLADE_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_B2_GIBDO_ROOM:{ name:"Shadow Temple MQ B2 Gibdo Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_EARLY_GIBDOS_CHEST", () => (L.CanKillEnemy("RE_GIBDO") && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_FIRST_BEAMOS", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_GIBDO")))))]
    ] },
    RR_SHADOW_TEMPLE_MQ_B2_SPINNING_BLADE_ROOM:{ name:"Shadow Temple MQ B2 Spinning Blade Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_MAP_CHEST", () => (L.CanPassEnemy("RE_BIG_SKULLTULA") && (L.CanUse("RG_HOOKSHOT") || (L.IsAdult && (L.CanUse("RG_HOVER_BOOTS") || L.CanGroundJump()))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_FIRST_BEAMOS", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_BIG_SKULLTULA") && (L.CanUse("RG_HOOKSHOT") || (L.IsAdult && L.CanUse("RG_HOVER_BOOTS")))))))],
      ["RR_SHADOW_TEMPLE_MQ_SHORTCUT_PATH", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_SHORTCUT_PATH:{ name:"Shadow Temple MQ Shortcut Path", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_NEAR_SHIP_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_B2_SPINNING_BLADE_ROOM", () => (L.CanPassEnemy("RE_BIG_SKULLTULA"))],
      ["RR_SHADOW_TEMPLE_MQ_DOCK", () => (L.Get("LOGIC_SHADOW_SHORTCUT_BLOCK"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_B2_TO_B3_CORRIDOR_B2:{ name:"Shadow Temple MQ B2 to B3 Corridor B2", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_FIRST_BEAMOS", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 2))],
      ["RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_B2_TO_B3_CORRIDOR_B3:{ name:"Shadow Temple MQ B2 to B3 Corridor B3", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_B2_TO_B3_CORRIDOR_B3", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT:{ name:"Shadow Temple MQ Upper Huge Pit", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_MQ_PIT_STAIRS", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_PIT_STORM_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT_DOOR_LEDGE", () => (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_MQ_LOWER_HUGE_PIT", () => ((L.Get("LOGIC_SHADOW_MQ_PIT_STAIRS") && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))) || L.trick("RT_SHADOW_MQ_HUGE_PIT"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT_DOOR_LEDGE:{ name:"Shadow Temple MQ Upper Huge Pit Door Ledge", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT", () => (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_MQ_INVISIBLE_BLADES_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_INVISIBLE_BLADES_ROOM:{ name:"Shadow Temple MQ Invisible Blades Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_INVISIBLE_BLADES_VISIBLE_CHEST", () => ((L.CanUse("RG_SONG_OF_TIME") || (L.trick("RT_SHADOW_MQ_INVISIBLE_BLADES") && L.EffectiveHealth() > 1)) && (L.trick("RT_LENS_SHADOW_MQ_INVISIBLE_BLADES") || L.IsChild || L.CanUse("RG_NAYRUS_LOVE") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_INVISIBLE_BLADES_INVISIBLE_CHEST", () => ((L.CanUse("RG_SONG_OF_TIME") || (L.trick("RT_SHADOW_MQ_INVISIBLE_BLADES") && L.EffectiveHealth() > 1)) && ((L.trick("RT_LENS_SHADOW_MQ") && (L.trick("RT_LENS_SHADOW_MQ_INVISIBLE_BLADES") || L.IsChild || L.CanUse("RG_NAYRUS_LOVE"))) || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_INVISIBLE_BLADES_LEFT_HEART", () => ((L.CanUse("RG_SONG_OF_TIME") && L.IsAdult) || (L.trick("RT_SHADOW_MQ_INVISIBLE_BLADES") && L.EffectiveHealth() > 1) || L.CanUse("RG_BOOMERANG"))],
      ["RC_SHADOW_TEMPLE_MQ_INVISIBLE_BLADES_RIGHT_HEART", () => ((L.CanUse("RG_SONG_OF_TIME") && L.IsAdult) || (L.trick("RT_SHADOW_MQ_INVISIBLE_BLADES") && L.EffectiveHealth() > 1) || L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_LOWER_HUGE_PIT:{ name:"Shadow Temple MQ Lower Huge Pit", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_BEAMOS_SILVER_RUPEES_CHEST", () => (L.CanUse("RG_LONGSHOT") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_B2_TO_B3_CORRIDOR_B3", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_SHADOW_TEMPLE_MQ_UPPER_HUGE_PIT", () => (L.Get("LOGIC_SHADOW_MQ_PIT_STAIRS"))],
      ["RR_SHADOW_TEMPLE_MQ_LOWER_HUGE_PIT_DOOR_LEDGE", () => (L.CanUse("RG_HOVER_BOOTS") && (L.trick("RT_LENS_SHADOW_MQ_PLATFORM") || L.CanUse("RG_LENS_OF_TRUTH")))],
      ["RR_SHADOW_TEMPLE_MQ_STONE_UMBRELLA_ROOM", () => (L.AnyAgeTime((() => (L.CanJumpslash() || L.HasExplosives() || L.CanUse("RG_GIANTS_KNIFE") || (L.trick("RT_ITEM_EXTENSION") && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT")))))))]
    ] },
    RR_SHADOW_TEMPLE_MQ_LOWER_HUGE_PIT_DOOR_LEDGE:{ name:"Shadow Temple MQ Upper Huge Pit Door Ledge", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_LOWER_HUGE_PIT", () => (L.CanUse("RG_HOVER_BOOTS") && (L.trick("RT_LENS_SHADOW_MQ_PLATFORM") || L.CanUse("RG_LENS_OF_TRUTH")) && L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_SHADOW_TEMPLE_MQ_FLOOR_SPIKES_ROOM", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 3))]
    ] },
    RR_SHADOW_TEMPLE_MQ_STONE_UMBRELLA_ROOM:{ name:"Shadow Temple MQ Stone Umbrella Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_FALLING_SPIKES_LOWER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_GS_FALLING_SPIKES_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (L.IsAdult && L.CanGroundJumpslash()))],
      ["RC_SHADOW_TEMPLE_MQ_LOWER_UMBRELLA_WEST_POT", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_LOWER_UMBRELLA_EAST_POT", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_UPPER_UMBRELLA_SOUTH_POT", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_LOWER_HUGE_PIT", () => (L.AnyAgeTime((() => (L.trick("RT_VISIBLE_COLLISION") || L.CanHitSwitch()))))],
      ["RR_SHADOW_TEMPLE_MQ_UPPER_STONE_UMBRELLA", () => (L.trick("RT_SHADOW_UMBRELLA_CLIP") || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.TakeDamage()) || (L.IsAdult && (L.HasItem("RG_GORONS_BRACELET") || (L.trick("RT_SHADOW_UMBRELLA_HOVER") && L.CanUse("RG_HOVER_BOOTS") && L.CanStandingShield() && L.CanUse("RG_MASTER_SWORD")))))]
    ] },
    RR_SHADOW_TEMPLE_MQ_UPPER_STONE_UMBRELLA:{ name:"Shadow Temple MQ Upper Stone Umbrella", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_FALLING_SPIKES_UPPER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_FALLING_SPIKES_SWITCH_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_GS_FALLING_SPIKES_ROOM", () => (L.trick("RT_SHADOW_UMBRELLA_GS") && L.CanUse("RG_HOVER_BOOTS") && L.CanStandingShield() && L.CanUse("RG_MASTER_SWORD"))],
      ["RC_SHADOW_TEMPLE_MQ_UPPER_UMBRELLA_NORTH_POT", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_UPPER_UMBRELLA_SOUTH_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_STONE_UMBRELLA_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_FLOOR_SPIKES_ROOM:{ name:"Shadow Temple MQ Floor Spikes Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_MQ_FLOOR_SPIKES_RUPEES", () => ((L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.CanUse("RG_LONGSHOT") || (L.IsAdult && L.CanUse("RG_HOOKSHOT") && (L.CanJumpslash() || (L.CanUse("RG_HOVER_BOOTS") && L.AnyAgeTime((() => (L.CanKillEnemy("RE_REDEAD")))))))) && (L.TakeDamage() || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_GORON_TUNIC")))]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_INVISIBLE_SPIKES_CHEST", () => (L.CanKillEnemy("RE_REDEAD") && (L.trick("RT_LENS_SHADOW_MQ") || L.TakeDamage() || L.CanUse("RG_LENS_OF_TRUTH") || L.CanUse("RG_GORON_TUNIC")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_LOWER_HUGE_PIT", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 3))],
      ["RR_SHADOW_TEMPLE_MQ_STALFOS_ROOM", () => (L.Get("LOGIC_SHADOW_MQ_FLOOR_SPIKES_RUPEES"))],
      ["RR_SHADOW_TEMPLE_MQ_FLOOR_SPIKES_PLATFORM", () => (((L.CanUse("RG_LONGSHOT") || (L.IsAdult && L.CanUse("RG_HOOKSHOT") && (L.Get("LOGIC_SHADOW_MQ_FLOOR_SPIKES_RUPEES") || L.AnyAgeTime((() => (L.CanKillEnemy("RE_REDEAD"))))))) && (L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS"))) || ((L.trick("RT_LENS_SHADOW") || L.CanUse("RG_LENS_OF_TRUTH")) && (L.IsAdult && L.CanMiddairGroundJump())))]
    ] },
    RR_SHADOW_TEMPLE_MQ_FLOOR_SPIKES_PLATFORM:{ name:"Shadow Temple MQ Floor Spikes Platform", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_FLOOR_SPIKES_ROOM", () => true],
      ["RR_SHADOW_TEMPLE_MQ_UPPER_WIND_TUNNEL", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 4))]
    ] },
    RR_SHADOW_TEMPLE_MQ_STALFOS_ROOM:{ name:"Shadow Temple MQ Stalfos Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_STALFOS_ROOM_CHEST", () => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_FLOOR_SPIKES_ROOM", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2)))))]
    ] },
    RR_SHADOW_TEMPLE_MQ_UPPER_WIND_TUNNEL:{ name:"Shadow Temple MQ Upper Wind Tunnel", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_FLOOR_SPIKES_ROOM", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 4))],
      ["RR_SHADOW_TEMPLE_MQ_LOWER_WIND_TUNNEL", () => ((L.CanUse("RG_HOVER_BOOTS") && L.CanPassEnemy("RE_BIG_SKULLTULA")) || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_LOWER_WIND_TUNNEL:{ name:"Shadow Temple MQ Lower Wind Tunnel", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_UPPER_WIND_TUNNEL", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_SHADOW_TEMPLE_MQ_WIND_HINT_ROOM", () => true],
      ["RR_SHADOW_TEMPLE_MQ_WIND_TUNNEL_ALCOVE", () => (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_WIND_HINT_ROOM:{ name:"Shadow Temple MQ Wind Hint Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_WIND_HINT_CHEST", () => ((L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanPassEnemy("RE_REDEAD") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_GS_WIND_HINT_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_SHADOW_TEMPLE_MQ_WIND_HINT_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_LOWER_WIND_TUNNEL", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_WIND_TUNNEL_ALCOVE:{ name:"Shadow Temple MQ Wind Tunnel Alcove", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_LOWER_WIND_TUNNEL", () => ((L.trick("RT_SHADOW_MQ_WINDY_WALKWAY")) || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SHADOW_TEMPLE_MQ_B4_GIBDO_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_B4_GIBDO_ROOM:{ name:"Shadow Temple MQ B4 Gibdo Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_AFTER_WIND_ENEMY_CHEST", () => (L.CanKillEnemy("RE_GIBDO") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_AFTER_WIND_HIDDEN_CHEST", () => (L.HasExplosives() && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_GS_AFTER_WIND", () => (L.HasExplosives() || (L.trick("RT_VISIBLE_COLLISION") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA")))],
      ["RC_SHADOW_TEMPLE_MQ_BEFORE_BOAT_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_BEFORE_BOAT_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_WIND_TUNNEL_ALCOVE", () => true],
      ["RR_SHADOW_TEMPLE_MQ_DOCK", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 5))]
    ] },
    RR_SHADOW_TEMPLE_MQ_DOCK:{ name:"Shadow Temple MQ Dock", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_SHORTCUT_BLOCK", () => (L.HasItem("RG_GORONS_BRACELET"))]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_SCARECROW_NORTH_HEART", () => (L.ReachDistantScarecrow())],
      ["RC_SHADOW_TEMPLE_MQ_SCARECROW_SOUTH_HEART", () => (L.ReachDistantScarecrow())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_SHORTCUT_PATH", () => (L.Get("LOGIC_SHADOW_SHORTCUT_BLOCK") && L.HasItem("RG_CLIMB"))],
      ["RR_SHADOW_TEMPLE_MQ_B4_GIBDO_ROOM", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 5))],
      ["RR_SHADOW_TEMPLE_MQ_BEYOND_BOAT", () => (((L.IsAdult && ((L.HasItem("RG_GORONS_BRACELET") && L.HasItem("RG_CLIMB")) || L.trick("RT_UNINTUITIVE_JUMPS"))) || L.CanUse("RG_HOOKSHOT")) && L.CanUse("RG_ZELDAS_LULLABY"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_BEYOND_BOAT:{ name:"Shadow Temple MQ Beyond Boat", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED", () => (L.CanUse("RG_FAIRY_BOW") || (L.trick("RT_SHADOW_STATUE") && L.CanUse("RG_BOMBCHU_5")))]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_GS_AFTER_SHIP", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_SHADOW_TEMPLE_MQ_BEFORE_CHASM_WEST_POT", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_BEFORE_CHASM_EAST_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_ACROSS_CHASM", () => (L.Get("LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED") || (L.Get("LOGIC_SHADOW_MQ_SWITCH_ACROSS_CHASM") && L.CanUse("RG_LONGSHOT")))],
      ["RR_SHADOW_TEMPLE_MQ_INVISIBLE_MAZE", () => (L.Get("LOGIC_SHADOW_MQ_SWITCH_ACROSS_CHASM"))]
    ] },
    RR_SHADOW_TEMPLE_MQ_ACROSS_CHASM:{ name:"Shadow Temple MQ Across Chasm", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[
      ["LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED", () => (L.CanDetonateUprightBombFlower())],
      ["LOGIC_SHADOW_MQ_EYE_SWITCH_ACROSS_CHASM", () => (L.CanHitEyeTargets() && (L.CanUse("RG_SONG_OF_TIME") || L.trick("RT_ITEM_EXTENSION")))],
      ["LOGIC_SHADOW_MQ_SWITCH_ACROSS_CHASM", () => (L.Get("LOGIC_SHADOW_MQ_EYE_SWITCH_ACROSS_CHASM") && L.CanUse("RG_LONGSHOT"))]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_AFTER_CHASM_WEST_POT", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_AFTER_CHASM_EAST_POT", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_AFTER_SHIP_UPPER_LEFT_HEART", () => (L.Get("LOGIC_SHADOW_MQ_EYE_SWITCH_ACROSS_CHASM") && L.CanUse("RG_LONGSHOT"))],
      ["RC_SHADOW_TEMPLE_MQ_AFTER_SHIP_UPPER_RIGHT_HEART", () => (L.Get("LOGIC_SHADOW_MQ_EYE_SWITCH_ACROSS_CHASM") && L.CanUse("RG_LONGSHOT"))],
      ["RC_SHADOW_TEMPLE_MQ_AFTER_SHIP_LOWER_HEART", () => (L.IsAdult)]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_BEYOND_BOAT", () => ((L.Get("LOGIC_SHADOW_BRIDGE_BEYOND_BOAT_LOWERED") && L.IsAdult) || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))],
      ["RR_SHADOW_TEMPLE_MQ_PRE_BOSS_ROOM", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_PRE_BOSS_ROOM:{ name:"Shadow Temple MQ Pre Boss Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_ACROSS_CHASM", () => true],
      ["RR_SHADOW_TEMPLE_MQ_BOSS_DOOR", () => (L.CanUse("RG_HOVER_BOOTS") && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ] },
    RR_SHADOW_TEMPLE_MQ_BOSS_DOOR:{ name:"Shadow Temple MQ Boss Door", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_GS_NEAR_BOSS", () => ((L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_BOMB_THROW") || L.CanUse("RG_MEGATON_HAMMER")) && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_PRE_BOSS_ROOM", () => (L.CanUse("RG_HOVER_BOOTS") && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))],
      ["RR_SHADOW_TEMPLE_BOSS_ENTRYWAY", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_INVISIBLE_MAZE:{ name:"Shadow Temple MQ Invisible Maze", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_BEYOND_BOAT", () => true],
      ["RR_SHADOW_TEMPLE_MQ_X_CROSS", () => true],
      ["RR_SHADOW_TEMPLE_MQ_THREE_SKULL_JARS", () => true],
      ["RR_SHADOW_TEMPLE_MQ_SPIKE_WALLS_ROOM", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 6))]
    ] },
    RR_SHADOW_TEMPLE_MQ_X_CROSS:{ name:"Shadow Temple MQ X-Cross", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_BOMB_FLOWER_CHEST", () => ((L.CanUse("RG_LENS_OF_TRUTH") || L.trick("RT_LENS_SHADOW_MQ_DEADHAND")) && L.CanKillEnemy("RE_DEAD_HAND") && (L.CanDetonateBombFlowers() || L.HasItem("RG_GORONS_BRACELET")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_DEAD_HAND_POT_1", () => (L.CanBreakPots())],
      ["RC_SHADOW_TEMPLE_MQ_DEAD_HAND_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_INVISIBLE_MAZE", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_THREE_SKULL_JARS:{ name:"Shadow Temple MQ Three Skull Jars", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_FREESTANDING_KEY", () => true]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_INVISIBLE_MAZE", () => true]
    ] },
    RR_SHADOW_TEMPLE_MQ_SPIKE_WALLS_ROOM:{ name:"Shadow Temple MQ Spike Walls Room", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SHADOW_TEMPLE_MQ_SPIKE_WALLS_LEFT_CHEST", () => (L.CanUse("RG_DINS_FIRE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_BOSS_KEY_CHEST", () => (L.CanUse("RG_DINS_FIRE") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SHADOW_TEMPLE_MQ_SPIKE_BARICADE_POT", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_MQ_INVISIBLE_MAZE", () => (L.SmallKeys("SCENE_SHADOW_TEMPLE", 6) && (L.trick("RT_LENS_SHADOW_MQ") || L.CanUse("RG_LENS_OF_TRUTH")))]
    ] },
    RR_SHADOW_TEMPLE_BOSS_ENTRYWAY:{ name:"Shadow Temple Boss Entryway", scene:"SCENE_SHADOW_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SHADOW_TEMPLE_BOSS_DOOR", () => (!L.mq("SHADOW_TEMPLE") && false)],
      ["RR_SHADOW_TEMPLE_MQ_BOSS_DOOR", () => (L.mq("SHADOW_TEMPLE") && false)],
      ["RR_SHADOW_TEMPLE_BOSS_ROOM", () => (L.HasItem("RG_SHADOW_TEMPLE_BOSS_KEY"))]
    ] },
    RR_SHADOW_TEMPLE_BOSS_ROOM:{ name:"Shadow Temple Boss Room", scene:"SCENE_SHADOW_TEMPLE_BOSS", time:false,
      events:[
      ["LOGIC_SHADOW_TEMPLE_CLEAR", () => (L.CanKillEnemy("RE_BONGO_BONGO"))]
    ],
      checks:[
      ["RC_SHADOW_TEMPLE_BONGO_BONGO_HEART", () => (L.Get("LOGIC_SHADOW_TEMPLE_CLEAR"))],
      ["RC_BONGO_BONGO", () => (L.Get("LOGIC_SHADOW_TEMPLE_CLEAR"))]
    ],
      exits:[
      ["RR_SHADOW_TEMPLE_BOSS_ENTRYWAY", () => false],
      ["RR_GRAVEYARD_WARP_PAD_REGION", () => (L.Get("LOGIC_SHADOW_TEMPLE_CLEAR"))]
    ] },
    RR_SPIRIT_TEMPLE_ENTRYWAY:{ name:"Spirit Temple Entryway", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_FOYER", () => (!L.mq("SPIRIT_TEMPLE"))],
      ["RR_SPIRIT_TEMPLE_MQ_FOYER", () => (L.mq("SPIRIT_TEMPLE"))],
      ["RR_DESERT_COLOSSUS_OUTSIDE_TEMPLE", () => true]
    ] },
    RR_SPIRIT_TEMPLE_FOYER:{ name:"Spirit Temple Foyer", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_FORWARDS_SPIRIT_CHILD", () => (L.IsChild)],
      ["LOGIC_FORWARDS_SPIRIT_ADULT", () => (L.IsAdult)]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_LOBBY_POT_1", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_LOBBY_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_ENTRYWAY", () => true],
      ["RR_SPIRIT_TEMPLE_CHILD_SIDE_HUB", () => ((L.IsAdult || L.HasItem("RG_SPEAK_GERUDO") || L.Get("LOGIC_SPIRIT_NABOORU_KIDNAPPED")) && L.CanUse("RG_CRAWL"))],
      ["RR_SPIRIT_TEMPLE_ADULT_SIDE_HUB", () => (L.CanUse("RG_SILVER_GAUNTLETS"))]
    ] },
    RR_SPIRIT_TEMPLE_CHILD_SIDE_HUB:{ name:"Spirit Temple Child Side Hub", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakSmallCrates())],
      ["LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE_TORCHES", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_ARMOS")))) && L.CanUse("RG_STICKS"))]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_FOYER", () => (L.CanUse("RG_CRAWL"))],
      ["RR_SPIRIT_TEMPLE_CHILD_BOXES", () => (L.CanUse("RG_CRAWL"))],
      ["RR_SPIRIT_TEMPLE_SWITCH_BRIDGE_SOUTH", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_ARMOS")))))],
      ["RR_SPIRIT_TEMPLE_RUPEE_BRIDGE_SOUTH", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_ARMOS")))))]
    ] },
    RR_SPIRIT_TEMPLE_SWITCH_BRIDGE_SOUTH:{ name:"Spirit Temple Switch Bridge South", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_CHILD_SWITCH_BRIDGE", () => (L.CanUse("RG_BOOMERANG") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_FAIRY_BOW") || (L.CanUse("RG_BOMBCHU_5") && L.trick("RT_SPIRIT_CHILD_CHU")))]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_CHILD_SIDE_HUB", () => true],
      ["RR_SPIRIT_TEMPLE_SWITCH_BRIDGE_NORTH", () => ((L.Get("LOGIC_SPIRIT_CHILD_SWITCH_BRIDGE") && L.CanPassEnemy("RE_GREEN_BUBBLE", "ED_CLOSE", false)) || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_SPIRIT_TEMPLE_SWITCH_BRIDGE_NORTH:{ name:"Spirit Temple Switch Bridge North", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_CHILD_SWITCH_BRIDGE", () => (L.CanHitSwitch())]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_CHILD_BRIDGE_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_SWITCH_BRIDGE_SOUTH", () => (L.CanUse("RG_HOVER_BOOTS") || (L.Get("LOGIC_SPIRIT_CHILD_SWITCH_BRIDGE") && L.CanPassEnemy("RE_GREEN_BUBBLE", "ED_CLOSE", false)))],
      ["RR_SPIRIT_TEMPLE_1F_ANUBIS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_1F_ANUBIS:{ name:"Spirit Temple 1F Anubis", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_ANUBIS_POT_1", () => true],
      ["RC_SPIRIT_TEMPLE_ANUBIS_POT_2", () => true],
      ["RC_SPIRIT_TEMPLE_ANUBIS_POT_3", () => true],
      ["RC_SPIRIT_TEMPLE_ANUBIS_POT_4", () => true]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_SWITCH_BRIDGE_NORTH", () => (L.AnyAgeTime((() => (L.CanHitSwitch() || L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_ANUBIS")))))],
      ["RR_SPIRIT_TEMPLE_RUPEE_BRIDGE_NORTH", () => (L.AnyAgeTime((() => (L.CanHitSwitch() || L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_ANUBIS")))))]
    ] },
    RR_SPIRIT_TEMPLE_RUPEE_BRIDGE_NORTH:{ name:"Spirit Temple Rupee Bridge North", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE_TORCHES", () => ((L.Get("LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE") && L.HasFireSourceWithTorch()) || L.CanUse("RG_DINS_FIRE"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_CHILD_EARLY_TORCHES_CHEST", () => (L.Get("LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE_TORCHES") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_GS_METAL_FENCE", () => (L.Get("LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE") && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_BOMB_THROW") && L.HasItem("RG_CLIMB"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_RUPEE_BRIDGE_SOUTH", () => (L.Get("LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE"))],
      ["RR_SPIRIT_TEMPLE_1F_ANUBIS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_RUPEE_BRIDGE_SOUTH:{ name:"Spirit Temple Rupee Bridge South", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE_TORCHES", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_GS_METAL_FENCE", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_CHILD_SIDE_HUB", () => true],
      ["RR_SPIRIT_TEMPLE_RUPEE_BRIDGE_NORTH", () => (L.Get("LOGIC_SPIRIT_SILVER_RUPEE_BRIDGE"))]
    ] },
    RR_SPIRIT_TEMPLE_CHILD_BOXES:{ name:"Child Spirit Temple Before Climb", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_BEFORE_CHILD_CLIMB_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_SPIRIT_TEMPLE_BEFORE_CHILD_CLIMB_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_CHILD_SIDE_HUB", () => (L.CanUse("RG_CRAWL"))],
      ["RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_1F", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 1))]
    ] },
    RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_1F:{ name:"Spirit Temple Sun On Floor 1F", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_GS_SUN_ON_FLOOR_ROOM", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_1F", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))), false, "RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F", (() => (L.CanKillEnemy("RE_GOLD_SKULLTULA", L.TakeDamage() ? "ED_SHORT_JUMPSLASH" : "ED_BOMB_THROW")))))],
      ["RC_SPIRIT_TEMPLE_CHILD_CLIMB_POT_1", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_1F", (() => (L.CanBreakPots()))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_CHILD_BOXES", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 5))],
      ["RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F:{ name:"Spirit Temple Sun On Floor 2F", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_CHILD_CLIMB_NORTH_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F", (() => (L.CanHitSwitch("ED_BOMB_THROW") && L.HasItem("RG_OPEN_CHEST")))))],
      ["RC_SPIRIT_TEMPLE_CHILD_CLIMB_EAST_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F", (() => (L.CanHitSwitch("ED_BOMB_THROW") && L.HasItem("RG_OPEN_CHEST")))))],
      ["RC_SPIRIT_TEMPLE_GS_SUN_ON_FLOOR_ROOM", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F", (() => (L.CanKillEnemy("RE_GOLD_SKULLTULA", L.TakeDamage() ? "ED_SHORT_JUMPSLASH" : "ED_BOMB_THROW"))), false, "RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_1F", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG")))))],
      ["RC_SPIRIT_TEMPLE_BOULDER_ROOM_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG") && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_BOOMERANG") || L.CanUse("RG_BOMBCHU_5") || (L.CanUse("RG_BOMB_BAG") && L.IsAdult && L.trick("RT_SPIRIT_LOWER_ADULT_SWITCH"))) && (L.CanUse("RG_HOVER_BOOTS") || L.CanJumpslash()))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_1F", () => true],
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM", () => (L.HasExplosives() || (L.opt("RSK_SUNLIGHT_ARROWS") && L.CanUse("RG_LIGHT_ARROWS")))]
    ] },
    RR_SPIRIT_TEMPLE_ADULT_SIDE_HUB:{ name:"Spirit Temple Adult Side Hub", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_FOYER", () => true],
      ["RR_SPIRIT_TEMPLE_SAND_PIT", () => (L.AnyAgeTime((() => (L.CanHitSwitch(L.IsAdult && L.trick("RT_SPIRIT_LOWER_ADULT_SWITCH") ? "ED_BOMB_THROW" : "ED_BOOMERANG")))))],
      ["RR_SPIRIT_TEMPLE_BOULDERS", () => (L.AnyAgeTime((() => (L.CanHitSwitch(L.IsAdult && L.trick("RT_SPIRIT_LOWER_ADULT_SWITCH") ? "ED_BOMB_THROW" : "ED_BOOMERANG")))))],
      ["RR_SPIRIT_TEMPLE_1F_MIRROR_ROOM", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 1))]
    ] },
    RR_SPIRIT_TEMPLE_SAND_PIT:{ name:"Spirit Temple Sand Pit", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_COMPASS_CHEST", () => (L.CanUse("RG_ZELDAS_LULLABY") && (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER"))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_ADULT_SIDE_HUB", () => true]
    ] },
    RR_SPIRIT_TEMPLE_ABOVE_BOULDERS:{ name:"Spirit Temple Above Boulders", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_BOUNDERS_SILVERS", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanJumpslash() || L.CanUse("RG_LONGSHOT"))]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_ADULT_SIDE_HUB", () => true],
      ["RR_SPIRIT_TEMPLE_BOULDERS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_BOULDERS:{ name:"Spirit Temple Boulders", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_GS_BOULDER_ROOM", () => (L.CanUse("RG_SONG_OF_TIME") && L.CanKillEnemy("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_ABOVE_BOULDERS", () => (L.IsAdult || L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanGroundJump())],
      ["RR_SPIRIT_TEMPLE_PAST_BOULDERS", () => (L.Get("LOGIC_SPIRIT_BOUNDERS_SILVERS"))]
    ] },
    RR_SPIRIT_TEMPLE_PAST_BOULDERS:{ name:"Spirit Temple Past Boulders", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_EARLY_ADULT_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_BOULDER_ROOM_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_BOULDERS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_1F_MIRROR_ROOM:{ name:"Spirit Temple 1F Mirror Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_ADULT_SIDE_HUB", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 5))],
      ["RR_SPIRIT_TEMPLE_2F_MIRROR_ROOM", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_SPIRIT_TEMPLE_2F_MIRROR_ROOM:{ name:"Spirit Temple 2F Mirror Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_FIRST_MIRROR_LEFT_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_2F_MIRROR_ROOM", (() => (L.HasItem("RG_OPEN_CHEST") && (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())))))],
      ["RC_SPIRIT_TEMPLE_FIRST_MIRROR_RIGHT_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_2F_MIRROR_ROOM", (() => (L.HasItem("RG_OPEN_CHEST") && (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_1F_MIRROR_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT", () => (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())]
    ] },
    RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD:{ name:"Spirit Temple Statue Rooom Child", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MAP_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", (() => (L.HasFireSourceWithTorch() || (L.trick("RT_SPIRIT_MAP_CHEST") && L.CanUse("RG_FAIRY_BOW")))), false, "RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.HasFireSource()))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_GS_LOBBY", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT"))), false, "RR_SPIRIT_TEMPLE_INNER_WEST_HAND", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", L.trick("RT_SPIRIT_WEST_LEDGE") ? "ED_BOOMERANG" : "ED_HOOKSHOT"))), "RR_SPIRIT_TEMPLE_GS_LEDGE", (() => (L.CanKillEnemy("RE_GOLD_SKULLTULA")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_SUN_ON_FLOOR_2F", () => true],
      ["RR_SPIRIT_TEMPLE_INNER_WEST_HAND", () => true],
      ["RR_SPIRIT_TEMPLE_GS_LEDGE", () => (L.CanUse("RG_HOVER_BOOTS") || L.ReachScarecrow())],
      ["RR_SPIRIT_TEMPLE_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED") && (L.CanUse("RG_LONGSHOT") || (L.trick("RT_SPIRIT_PLATFORM_HOOKSHOT") && L.CanUse("RG_HOOKSHOT"))))],
      ["RR_SPIRIT_TEMPLE_EMPTY_STAIRS", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["RR_DESERT_COLOSSUS", () => ((L.opt("RSK_SHUFFLE_DUNGEON_ENTRANCES") === 0) && L.HasItem("RG_POWER_BRACELET") && L.CanUse("RG_CRAWL") && L.SmallKeys("SCENE_SPIRIT_TEMPLE", 4) && L.CanKillEnemy("RE_IRON_KNUCKLE"))]
    ] },
    RR_SPIRIT_TEMPLE_INNER_WEST_HAND:{ name:"Spirit Temple Inner West Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_GS_LOBBY", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_INNER_WEST_HAND", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", L.trick("RT_SPIRIT_WEST_LEDGE") ? "ED_BOOMERANG" : "ED_HOOKSHOT"))), false, "RR_SPIRIT_TEMPLE_GS_LEDGE", (() => (L.CanKillEnemy("RE_GOLD_SKULLTULA"))), "RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT")))))]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS", () => ((L.IsChild && L.SmallKeys("SCENE_SPIRIT_TEMPLE", 5)) || (L.CanUse("RG_SILVER_GAUNTLETS") && ((L.SmallKeys("SCENE_SPIRIT_TEMPLE", 3) && L.HasExplosives()) || L.SmallKeys("SCENE_SPIRIT_TEMPLE", 5))))]
    ] },
    RR_SPIRIT_TEMPLE_GS_LEDGE:{ name:"Spirit Temple GS ledge", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_GS_LOBBY", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_GS_LEDGE", (() => (L.CanKillEnemy("RE_GOLD_SKULLTULA"))), false, "RR_SPIRIT_TEMPLE_INNER_WEST_HAND", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", L.trick("RT_SPIRIT_WEST_LEDGE") ? "ED_BOOMERANG" : "ED_HOOKSHOT"))), "RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_SPIRIT_TEMPLE_INNER_WEST_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_STATUE_ROOM:{ name:"Spirit Temple Statue Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MAP_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.HasFireSource())), false, "RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", (() => (L.HasFireSourceWithTorch() || (L.trick("RT_SPIRIT_MAP_CHEST") && L.CanUse("RG_FAIRY_BOW"))))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_CENTRAL_CHAMBER_POT_1", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_CENTRAL_CHAMBER_POT_2", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_CENTRAL_CHAMBER_POT_3", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_CENTRAL_CHAMBER_POT_4", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_CENTRAL_CHAMBER_POT_5", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_CENTRAL_CHAMBER_POT_6", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_STATUE_ROOM", (() => (L.CanBreakPots()))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_SPIRIT_TEMPLE_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED") && (L.CanUse("RG_LONGSHOT") || (L.trick("RT_SPIRIT_PLATFORM_HOOKSHOT") && L.CanUse("RG_HOOKSHOT"))))],
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT", () => (L.IsAdult && L.CanUse("RG_HOOKSHOT"))],
      ["RR_SPIRIT_TEMPLE_SHORTCUT", () => (L.Get("LOGIC_SPIRIT_STATUE_SOUTH_DOOR"))],
      ["RR_SPIRIT_TEMPLE_ADULT_SIDE_HUB", () => ((L.opt("RSK_SHUFFLE_DUNGEON_ENTRANCES") === 0) && L.CanUse("RG_SILVER_GAUNTLETS") && L.IsAdult && ((L.CanKillEnemy("RE_BEAMOS") && L.SmallKeys("SCENE_SPIRIT_TEMPLE", (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.HasItem("RG_POWER_BRACELET") ? 2 : 3)) || ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.HasItem("RG_POWER_BRACELET") && L.CanKillEnemy("RE_IRON_KNUCKLE") && L.SmallKeys("SCENE_SPIRIT_TEMPLE", 4))))]
    ] },
    RR_SPIRIT_TEMPLE_EMPTY_STAIRS:{ name:"Spirit Temple Empty Stairs", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_SUN_BLOCK_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_SUN_BLOCK_ROOM:{ name:"Spirit Temple Sun Block Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_EMPTY_STAIRS", () => (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())],
      ["RR_SPIRIT_TEMPLE_SUN_BLOCK_CHEST_LEDGE", () => (L.SpiritSunBlockSouthLedge())],
      ["RR_SPIRIT_TEMPLE_SKULLTULA_STAIRS", () => (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())]
    ] },
    RR_SPIRIT_TEMPLE_SUN_BLOCK_CHEST_LEDGE:{ name:"Spirit Temple Sun Block Chest ledge", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_SUN_BLOCK_TORCH", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SUN_BLOCK_CHEST_LEDGE", (() => (true)), true))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_SUN_BLOCK_ROOM_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SUN_BLOCK_CHEST_LEDGE", (() => (L.HasFireSource() || (L.Get("LOGIC_SPIRIT_SUN_BLOCK_TORCH") && (L.CanUse("RG_STICKS") || (L.trick("RT_SPIRIT_SUN_CHEST") && L.CanUse("RG_FAIRY_BOW"))))))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_SUN_BLOCK_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_SKULLTULA_STAIRS:{ name:"Spirit Temple Skulltula Stairs", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_GS_HALL_AFTER_SUN_BLOCK_ROOM", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SKULLTULA_STAIRS", (() => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG")))))],
      ["RC_SPIRIT_TEMPLE_AFTER_SUN_BLOCK_POT_1", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SKULLTULA_STAIRS", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_AFTER_SUN_BLOCK_POT_2", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SKULLTULA_STAIRS", (() => (L.CanBreakPots()))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_SUN_BLOCK_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_CHILD_THRONE", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 3))]
    ] },
    RR_SPIRIT_TEMPLE_CHILD_THRONE:{ name:"Spirit Temple Child Throne", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_SKULLTULA_STAIRS", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 3))],
      ["RR_SPIRIT_TEMPLE_RIGHT_HAND_EXIT", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))]
    ] },
    RR_SPIRIT_TEMPLE_RIGHT_HAND_EXIT:{ name:"Spirit Temple Right Hand Exit", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_CHILD_THRONE", () => true],
      ["RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND:{ name:"Spirit Temple Outer Right Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_NABOORU_KIDNAPPED", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND", (() => (L.HasItem("RG_OPEN_CHEST")))))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_SILVER_GAUNTLETS_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND", (() => (L.HasItem("RG_OPEN_CHEST")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_RIGHT_HAND_EXIT", () => true],
      ["RR_DESERT_COLOSSUS", () => (L.SpiritCertainAccess("RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND"))]
    ] },
    RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT:{ name:"Spirit Temple Statue Room Adult", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_2F_MIRROR_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_INNER_LEFT_HAND", () => true],
      ["RR_SPIRIT_TEMPLE_SHORTCUT_SWITCH", () => (L.SpiritEastToSwitch())],
      ["RR_SPIRIT_TEMPLE_POT_STAIRS", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 4))],
      ["RR_SPIRIT_TEMPLE_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED") && (L.CanUse("RG_LONGSHOT") || (L.trick("RT_SPIRIT_PLATFORM_HOOKSHOT") && L.CanUse("RG_HOOKSHOT"))))]
    ] },
    RR_SPIRIT_TEMPLE_INNER_LEFT_HAND:{ name:"Spirit Temple Inner Left Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_STATUE_ROOM_HAND_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_INNER_LEFT_HAND", (() => (L.CanUse("RG_ZELDAS_LULLABY") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.HasItem("RG_OPEN_CHEST")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_SHORTCUT_SWITCH", () => ((L.IsAdult && L.trick("RT_SPIRIT_STATUE_JUMP")) || (L.CanUse("RG_ZELDAS_LULLABY") && L.CanUse("RG_HOOKSHOT")))]
    ] },
    RR_SPIRIT_TEMPLE_SHORTCUT_SWITCH:{ name:"Spirit Temple Shortcut Switch", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_STATUE_SOUTH_DOOR", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SHORTCUT_SWITCH", (() => (L.CanUse("RG_MEGATON_HAMMER")))))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_STATUE_ROOM_NORTHEAST_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_SHORTCUT_SWITCH", (() => (L.CanUse("RG_ZELDAS_LULLABY") && L.HasItem("RG_OPEN_CHEST")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT", () => true],
      ["RR_SPIRIT_TEMPLE_INNER_LEFT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_SHORTCUT:{ name:"Spirit Temple Shortcut", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_FOYER", () => (L.CanUse("RG_SILVER_GAUNTLETS") && L.CanUse("RG_MEGATON_HAMMER"))]
    ] },
    RR_SPIRIT_TEMPLE_POT_STAIRS:{ name:"Spirit Temple Pot Stairs", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_BEAMOS_HALL_POT_1", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 4))],
      ["RR_SPIRIT_TEMPLE_BEAMOS_PITS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_BEAMOS_PITS:{ name:"Spirit Temple Beamos Pits", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_POT_STAIRS", () => (L.CanKillEnemy("RE_BEAMOS"))],
      ["RR_SPIRIT_TEMPLE_4_ARMOS", () => (L.CanKillEnemy("RE_BEAMOS"))],
      ["RR_SPIRIT_TEMPLE_BIG_WALL_BASE", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 5))]
    ] },
    RR_SPIRIT_TEMPLE_4_ARMOS:{ name:"Spirit Temple 4 Armos", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_NEAR_FOUR_ARMOS_CHEST", () => ((L.CanUse("RG_MIRROR_SHIELD") || L.SunlightArrows()) && L.HasExplosives() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_ARMOS_ROOM_SUN_FAIRY", () => (L.HasExplosives() && L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_BEAMOS_PITS", () => true],
      ["RR_SPIRIT_TEMPLE_4_ARMOS_SIDE_ROOM", () => (L.CanUse("RG_MIRROR_SHIELD") || L.SunlightArrows())],
      ["RR_SPIRIT_TEMPLE_CHEST_STAIRS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_4_ARMOS_SIDE_ROOM:{ name:"Spirit Temple 4 Armos Side Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_NEAR_FOUR_ARMOS_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_4_ARMOS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_CHEST_STAIRS:{ name:"Spirit Temple Chest Stairs", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_HALLWAY_LEFT_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_SPIRIT") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_HALLWAY_RIGHT_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_SPIRIT") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_4_ARMOS", () => true],
      ["RR_SPIRIT_TEMPLE_ADULT_THRONE", () => true]
    ] },
    RR_SPIRIT_TEMPLE_ADULT_THRONE:{ name:"Spirit Temple Adult Throne", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_CHEST_STAIRS", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))],
      ["RR_SPIRIT_TEMPLE_LEFT_HAND_EXIT", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))]
    ] },
    RR_SPIRIT_TEMPLE_LEFT_HAND_EXIT:{ name:"Spirit Temple Left Hand Exit", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_ADULT_THRONE", () => true],
      ["RR_SPIRIT_TEMPLE_OUTER_LEFT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_OUTER_LEFT_HAND:{ name:"Spirit Temple Outer Left Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MIRROR_SHIELD_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_LEFT_HAND_EXIT", () => true],
      ["RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_DESERT_COLOSSUS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_BIG_WALL_BASE:{ name:"Spirit Temple Big Wall Base", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_BEAMOS_PITS", () => true],
      ["RR_SPIRIT_TEMPLE_BIG_WALL_UPPER", () => ((L.trick("RT_SPIRIT_WALL") || (L.CanAvoidEnemy("RE_BEAMOS", true, 2) && L.CanPassEnemy("RE_WALLTULA", "ED_BOOMERANG"))) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_SPIRIT_TEMPLE_BIG_WALL_UPPER:{ name:"Spirit Temple Big Wall Upper", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_ADULT_CLIMB_LEFT_HEART", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RC_SPIRIT_TEMPLE_ADULT_CLIMB_RIGHT_HEART", () => (L.CanUse("RG_HOOKSHOT"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_BIG_WALL_BASE", () => true],
      ["RR_SPIRIT_TEMPLE_4F_CENTRAL", () => true]
    ] },
    RR_SPIRIT_TEMPLE_4F_CENTRAL:{ name:"Spirit Temple 4F Central", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_BIG_WALL_UPPER", () => true],
      ["RR_SPIRIT_TEMPLE_FAKE_DOORS_ROOM", () => (L.CanUse("RG_ZELDAS_LULLABY"))],
      ["RR_SPIRIT_TEMPLE_BIG_MIRROR_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_FAKE_DOORS_ROOM:{ name:"Spirit Temple Fake Doors Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_BOSS_KEY_CHEST", () => (((L.TakeDamage() && L.trick("RT_FIRE_RINGS")) || (L.AnyAgeTime((() => (L.CanHitEyeTargets() && L.CanAvoidEnemy("RE_TORCH_SLUG", true, 4)))) && L.CanUse("RG_HOOKSHOT"))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_4F_CENTRAL", () => true]
    ] },
    RR_SPIRIT_TEMPLE_BIG_MIRROR_ROOM:{ name:"Spirit Temple Big Mirror Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_4F_SWITCH", () => (L.CanJumpslash() || L.HasExplosives() || L.CanUse("RG_GIANTS_KNIFE") || (L.trick("RT_ITEM_EXTENSION") && ((L.IsAdult && L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT"))))],
      ["LOGIC_SPIRIT_PLATFORM_LOWERED", () => ((L.Get("LOGIC_SPIRIT_PUSHED_4F_MIRRORS") && L.CanUse("RG_MIRROR_SHIELD")) || L.SunlightArrows())]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_4F_CENTRAL", () => true],
      ["RR_SPIRIT_TEMPLE_BIG_MIRROR_CAVE", () => (L.Get("LOGIC_SPIRIT_4F_SWITCH"))],
      ["RR_SPIRIT_TEMPLE_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED"))]
    ] },
    RR_SPIRIT_TEMPLE_BIG_MIRROR_CAVE:{ name:"Spirit Temple Big Mirror Cave", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_4F_SWITCH", () => (L.HasExplosives())],
      ["LOGIC_SPIRIT_PUSHED_4F_MIRRORS", () => (L.HasExplosives() && L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_TOPMOST_CHEST", () => (((L.IsAdult && L.CanUse("RG_MIRROR_SHIELD")) || L.SunlightArrows()) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_BIG_MIRROR_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_PLATFORM:{ name:"Spirit Temple Lowered Platform", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_CHILD", () => true],
      ["RR_SPIRIT_TEMPLE_INNER_WEST_HAND", () => true],
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM_ADULT", () => true],
      ["RR_SPIRIT_TEMPLE_INNER_LEFT_HAND", () => true],
      ["RR_SPIRIT_TEMPLE_STATUE_HEAD", () => (L.Get("LOGIC_SPIRIT_PUSHED_4F_MIRRORS") && L.CanUse("RG_MIRROR_SHIELD") && L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_SPIRIT_TEMPLE_STATUE_HEAD:{ name:"Spirit Temple Statue Head", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_REVERSE_SPIRIT_CHILD", () => (L.IsChild)],
      ["LOGIC_REVERSE_SPIRIT_ADULT", () => (L.IsAdult)]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_INNER_WEST_HAND", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_INNER_LEFT_HAND", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED") && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT") ))],
      ["RR_SPIRIT_TEMPLE_BOSS_ENTRYWAY", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_FOYER:{ name:"Spirit Temple MQ Lobby", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_FORWARDS_SPIRIT_CHILD", () => (L.IsChild)],
      ["LOGIC_FORWARDS_SPIRIT_ADULT", () => (L.IsAdult)]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_FRONT_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_BACK_LEFT_CHEST", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))) && L.CanHitEyeTargets() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_BACK_RIGHT_CHEST", () => (L.CanHitSwitch("ED_BOOMERANG") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_FRONT_RIGHT_CHEST", () => (L.Get("LOGIC_SPIRIT_1F_SILVER_RUPEES") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_POT_1", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_POT_2", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_POT_3", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_ENTRANCE_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_ENTRYWAY", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_CHILD_SIDE_HUB", () => ((L.IsAdult || L.HasItem("RG_SPEAK_GERUDO") || L.Get("LOGIC_SPIRIT_NABOORU_KIDNAPPED")) && L.CanUse("RG_CRAWL"))],
      ["RR_SPIRIT_TEMPLE_MQ_BEHIND_GEYSER", () => (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && (L.CanUse("RG_MEGATON_HAMMER") || (L.CanStandingShield() && (L.CanUseSword() || L.CanUse("RG_STICKS")))))],
      ["RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_HOLE", () => (L.CanUse("RG_LONGSHOT") && L.CanUse("RG_BOMBCHU_5"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_CHILD_SIDE_HUB:{ name:"Spirit Temple MQ Child Side Hub", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_CRAWL_BOULDER", () => (L.CanUse("RG_BOMBCHU_5") || (L.trick("RT_VISIBLE_COLLISION") && L.CanUse("RG_MEGATON_HAMMER")))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_HAMMER_SWITCH_CHEST", () => (L.Get("LOGIC_SPIRIT_MQ_TIME_TRAVEL_CHEST") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_SLUGMA_POT", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_LEFT_HEART", () => (L.CanHitEyeTargets() || L.CanUse("RG_BOOMERANG") || (L.trick("RT_FIRE_RINGS") && L.trick("RT_VISIBLE_COLLISION") && L.TakeDamage() && L.CanJumpslash()))],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_RIGHT_HEART", () => (L.CanHitEyeTargets() || L.CanUse("RG_BOOMERANG") || (L.trick("RT_FIRE_RINGS") && L.trick("RT_VISIBLE_COLLISION") && L.TakeDamage() && L.CanJumpslash()))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_FOYER", () => (L.CanUse("RG_CRAWL"))],
      ["RR_SPIRIT_TEMPLE_MQ_GIBDO_GRAVES", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_TORCH_SLUG")))))],
      ["RR_SPIRIT_TEMPLE_MQ_ANUBIS_BRIDGE_CHEST", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_TORCH_SLUG")))))],
      ["RR_SPIRIT_TEMPLE_MQ_1F_CHEST_SWITCH", () => (L.CanUse("RG_CRAWL") && L.Get("LOGIC_SPIRIT_MQ_CRAWL_BOULDER"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_GIBDO_GRAVES:{ name:"Spirit Temple MQ Gibdo Graves", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_GIBDOS_CLEARED", () => (L.HasItem("RG_POWER_BRACELET") && ((L.CanUse("RG_BOMBCHU_5") && L.CanHitEyeTargets()) || L.CanUse("RG_HOVER_BOOTS") ) && L.CanKillEnemy("RE_GIBDO", "ED_CLOSE", true, 3))]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_CHILD_SIDE_HUB", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_GIBDO_POTS", () => (L.HasItem("RG_POWER_BRACELET") && (L.CanUse("RG_BOMBCHU_5") && L.CanHitEyeTargets()) || L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_GIBDO_POTS:{ name:"Spirit Temple MQ Gibdo Pots", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_GIBDO_POT_1", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_GIBDO_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_TURNTABLE", () => (L.Get("LOGIC_SPIRIT_MQ_GIBDOS_CLEARED"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_TURNTABLE:{ name:"Spirit Temple MQ Turntable", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_TURNTABLE_ENEMY", () => (L.CanKillEnemy("RE_STALFOS"))],
      ["LOGIC_FAIRY_ACCESS", () => (L.Get("LOGIC_SPIRIT_MQ_TURNTABLE_ENEMY"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_STALFOS_POT_1", () => (L.CanUse("RG_BOOMERANG") || L.CanKillEnemy("RE_STALFOS"))],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_STALFOS_POT_2", () => (L.CanUse("RG_BOOMERANG") || L.CanKillEnemy("RE_STALFOS"))],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_STALFOS_POT_3", () => (L.CanUse("RG_BOOMERANG") || L.CanKillEnemy("RE_STALFOS"))],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_STALFOS_POT_4", () => (L.CanUse("RG_BOOMERANG") || L.CanKillEnemy("RE_STALFOS"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_GIBDO_POTS", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_TURNTABLE_BEHIND_FIRE", () => (L.Get("LOGIC_SPIRIT_MQ_TURNTABLE_ENEMY"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_TURNTABLE_BEHIND_FIRE:{ name:"Spirit Temple MQ Turntable Behind Fire", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_TURNTABLE", () => (L.Get("LOGIC_SPIRIT_MQ_TURNTABLE_ENEMY"))],
      ["RR_SPIRIT_TEMPLE_MQ_ANUBIS_BRIDGE_GRAVE", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_ANUBIS_BRIDGE_GRAVE:{ name:"Spirit Temple MQ Anubis Bridge Grave", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_MAP_ROOM_ENEMIES", () => ((L.CanKillEnemy("RE_ANUBIS") && L.CanKillEnemy("RE_KEESE")) && (L.HasItem("RG_POWER_BRACELET") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT") ) || (L.CanKillEnemy("RE_ANUBIS", "ED_BOOMERANG") && L.CanKillEnemy("RE_KEESE", "ED_FAR")))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_MAP_ROOM_ENEMY_CHEST", () => (L.Get("LOGIC_SPIRIT_MQ_MAP_ROOM_ENEMIES") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_TURNTABLE", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_ANUBIS_BRIDGE_CHEST", () => (L.HasItem("RG_POWER_BRACELET") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_ANUBIS_BRIDGE_CHEST:{ name:"Spirit Temple MQ Anubis Bridge Chest", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_MAP_ROOM_ENEMIES", () => (L.CanKillEnemy("RE_ANUBIS") && L.CanKillEnemy("RE_KEESE", "ED_BOOMERANG"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_MAP_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_ANUBIS_BRIDGE_GRAVE", () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_MQ_CHILD_SIDE_HUB", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_1F_CHEST_SWITCH:{ name:"Spirit Temple MQ West 1F Rusted Switch", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_TIME_TRAVEL_CHEST", () => (L.CanUse("RG_MEGATON_HAMMER") && L.HasItem("RG_OPEN_CHEST"))],
      ["LOGIC_SPIRIT_MQ_CRAWL_BOULDER", () => (L.CanUse("RG_BOMBCHU_5") || (L.trick("RT_VISIBLE_COLLISION") && L.CanUse("RG_MEGATON_HAMMER")))]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_CHILD_SIDE_HUB", () => (L.CanUse("RG_CRAWL") && L.Get("LOGIC_SPIRIT_MQ_CRAWL_BOULDER"))],
      ["RR_SPIRIT_TEMPLE_MQ_UNDER_LIKE_LIKE", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 1))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_UNDER_LIKE_LIKE:{ name:"Spirit Temple MQ Under Like Like", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_LIKE_LIKE_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_UNDER_LIKE_LIKE", (() => (L.CanBreakPots()))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_1F_CHEST_SWITCH", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 7))],
      ["RR_SPIRIT_TEMPLE_MQ_SUN_ON_FLOOR", () => (L.CanHitSwitch() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SUN_ON_FLOOR:{ name:"Spirit Temple MQ Sun on Floor Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_CLIMB_NORTH_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_SUN_ON_FLOOR", (() => (L.CanKillEnemy("RE_BEAMOS") && L.HasItem("RG_OPEN_CHEST")))))],
      ["RC_SPIRIT_TEMPLE_MQ_CHILD_CLIMB_SOUTH_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_SUN_ON_FLOOR", (() => ((L.HasExplosives() || L.SunlightArrows()) && L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_OPEN_CHEST")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_UNDER_LIKE_LIKE", () => (L.CanHitSwitch())],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 2))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD:{ name:"Spirit Temple MQ Statue Room Child", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_SMALL_CRATE", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD", (() => (L.CanBreakSmallCrates()))))]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS", () => (L.CanUse("RG_CRAWL") && (L.opt("RSK_SHUFFLE_DUNGEON_ENTRANCES") === 0) && L.SmallKeys("SCENE_SPIRIT_TEMPLE", 6) && L.MQSpiritStatueToSunBlock() && (L.CanUse("RG_BOMBCHU_5") || (L.trick("RT_VISIBLE_COLLISION") && L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))))))],
      ["RR_SPIRIT_TEMPLE_MQ_SUN_ON_FLOOR", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 6))],
      ["RR_SPIRIT_TEMPLE_MQ_POT_LEDGE", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_SONG_OF_TIME"))],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", () => (L.IsAdult || L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_MQ_FLAMETHROWER_STAIRS", () => (L.MQSpiritStatueToSunBlock())],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT", () => (L.IsAdult && L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_POT_LEDGE:{ name:"Spirit Temple MQ Pot Ledge", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_STATUE_SOUTH_DOOR", () => (L.trick("RT_SPIRIT_MQ_FROZEN_EYE") && L.CanUse("RG_FAIRY_BOW") && L.CanUse("RG_SONG_OF_TIME"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_3F_EAST_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_POT_LEDGE", (() => (L.CanBreakPots())), false, "RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", (() => (L.CanUse("RG_BOOMERANG")))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_3F_WEST_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_POT_LEDGE", (() => (L.CanBreakPots())), false, "RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", (() => (L.trick("RT_SPIRIT_WEST_LEDGE") && L.CanUse("RG_BOOMERANG")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND:{ name:"Spirit Temple MQ Inner Right Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_3F_EAST_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", (() => (L.CanUse("RG_BOOMERANG"))), false, "RR_SPIRIT_TEMPLE_MQ_POT_LEDGE", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_3F_WEST_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", (() => (L.CanUse("RG_BOOMERANG") && L.trick("RT_SPIRIT_WEST_LEDGE"))), false, "RR_SPIRIT_TEMPLE_MQ_POT_LEDGE", (() => (L.CanBreakPots()))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_POT_LEDGE", () => (L.IsAdult && L.trick("RT_SPIRIT_STATUE_JUMP"))],
      ["RR_SPIRIT_TEMPLE_MQ_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED") && (L.CanUse("RG_LONGSHOT") || (L.trick("RT_SPIRIT_PLATFORM_HOOKSHOT") && L.CanUse("RG_HOOKSHOT"))))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM:{ name:"Spirit Temple MQ Statue Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_STATUE_SOUTH_DOOR", () => (L.HasFireSource())],
      ["LOGIC_SPIRIT_MQ_STATUE_ROOM_TORCHES", () => (L.CanUse("RG_FIRE_ARROWS") || (L.trick("RT_SPIRIT_MQ_LOWER_ADULT") && L.CanUse("RG_DINS_FIRE")))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_COMPASS_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", (() => (L.CanHitEyeTargets() && L.HasItem("RG_OPEN_CHEST")))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_2F_CENTER_EAST_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_2F_WEST_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_2F_EASTMOST_POT", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_CRATE_1", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", (() => (L.CanBreakCrates()))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_CRATE_2", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", (() => (L.CanBreakCrates()))))],
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_SMALL_CRATE", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", (() => ((L.CanUse("RG_SONG_OF_TIME") && L.CanBreakSmallCrates()) || (L.CanUse("RG_BOOMERANG") && L.HasExplosives())))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_DOOR", () => (L.Get("LOGIC_SPIRIT_STATUE_SOUTH_DOOR"))],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT", () => (L.IsAdult && L.ReachScarecrow())]
    ] },
    RR_SPIRIT_TEMPLE_MQ_FLAMETHROWER_STAIRS:{ name:"Spirit Temple MQ Flamethrower Stairs", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM:{ name:"Spirit Temple MQ Sun Block Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM", (() => (L.HasItem("RG_POWER_BRACELET") && L.HasItem("RG_OPEN_CHEST")))))],
      ["RC_SPIRIT_TEMPLE_MQ_GS_SUN_BLOCK_ROOM", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM", (() => ((L.CanUse("RG_HOOKSHOT") && (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())) || (L.trick("RT_SPIRIT_MQ_SUN_BLOCK_GS") && L.CanUse("RG_BOOMERANG"))))))],
      ["RC_SPIRIT_TEMPLE_MQ_SUN_BLOCKS_POT_1", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM", (() => (L.CanBreakPots()))))],
      ["RC_SPIRIT_TEMPLE_MQ_SUN_BLOCKS_POT_2", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM", (() => (L.CanBreakPots()))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_FLAMETHROWER_STAIRS", () => (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())],
      ["RR_SPIRIT_TEMPLE_MQ_SKULLTULA_STAIRS", () => (L.HasItem("RG_POWER_BRACELET") || L.SunlightArrows())]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SKULLTULA_STAIRS:{ name:"Spirit Temple MQ Skulltula Stairs", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_SUN_BLOCK_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_CHILD_THRONE", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 4))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_CHILD_THRONE:{ name:"Spirit Temple MQ Child Throne", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_SKULLTULA_STAIRS", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 7))],
      ["RR_SPIRIT_TEMPLE_MQ_RIGHT_HAND_EXIT", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_RIGHT_HAND_EXIT:{ name:"Spirit Temple MQ Right Hand Exit", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_CHILD_THRONE", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_OUTER_RIGHT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_OUTER_RIGHT_HAND:{ name:"Spirit Temple MQ Outer Right Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_NABOORU_KIDNAPPED", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_OUTER_RIGHT_HAND", (() => (L.HasItem("RG_OPEN_CHEST")))))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_SILVER_GAUNTLETS_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_OUTER_RIGHT_HAND", (() => (L.HasItem("RG_OPEN_CHEST")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_RIGHT_HAND_EXIT", () => true],
      ["RR_DESERT_COLOSSUS", () => (L.SpiritCertainAccess("RR_SPIRIT_TEMPLE_MQ_OUTER_RIGHT_HAND"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_HOLE:{ name:"Spirit Temple MQ Big Blocks Hole", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_FOYER", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_DOOR", () => (L.IsChild ? L.CanUse("RG_SILVER_GAUNTLETS") : L.AnyAgeTime((() => (L.CanUse("RG_SILVER_GAUNTLETS")))))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_DOOR:{ name:"Spirit Temple MQ Big Blocks Door", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_SILVER_BLOCK_HALLWAY_CHEST", () => (L.SpiritShared("RR_SPIRIT_TEMPLE_MQ_BIG_BLOCKS_DOOR", (() => (L.IsChild && L.CanHitEyeTargets() && L.HasItem("RG_OPEN_CHEST")))))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT:{ name:"Spirit Temple MQ Statue Room Adult", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_LEFT_HAND", () => (L.IsAdult || L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_MQ_CHEST_LEDGE", () => (L.CanUse("RG_HOVER_BOOTS") || ((L.trick("RT_LENS_SPIRIT_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanUse("RG_LONGSHOT")))],
      ["RR_SPIRIT_TEMPLE_MQ_3_SUNS_ROOM_2F", () => (L.Get("LOGIC_SPIRIT_MQ_STATUE_ROOM_TORCHES"))],
      ["RR_DESERT_COLOSSUS", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 4) && L.MQSpirit4KeyColossus())],
      ["RR_SPIRIT_TEMPLE_MQ_OUTER_RIGHT_HAND", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 4) && L.MQSpirit4KeyWestHand())],
      ["RR_SPIRIT_TEMPLE_MQ_FIRE_WALL_STAIRS_LOWER", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 5))],
      ["RR_SPIRIT_TEMPLE_MQ_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED") && (L.CanUse("RG_LONGSHOT") || (L.trick("RT_SPIRIT_PLATFORM_HOOKSHOT") && L.CanUse("RG_HOOKSHOT"))))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_INNER_LEFT_HAND:{ name:"Spirit Temple MQ Inner East Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_ROOM_LULLABY_CHEST", () => (L.CanUse("RG_ZELDAS_LULLABY") && L.CanBreakCrates() && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_SPIRIT_TEMPLE_MQ_CHEST_LEDGE", () => (((L.IsAdult || L.trick("RT_SPIRIT_WEST_LEDGE")) && (L.trick("RT_LENS_SPIRIT_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.CanUse("RG_HOOKSHOT")) || (L.IsAdult && L.trick("RT_SPIRIT_STATUE_JUMP")))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_CHEST_LEDGE:{ name:"Spirit Temple MQ Chest Ledge", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_STATUE_ROOM_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_SPIRIT_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT"))],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_LEFT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_3_SUNS_ROOM_2F:{ name:"Spirit Temple MQ Three Suns Room 2F", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_3SUNS_ENEMIES", () => ((L.CanUse("RG_MIRROR_SHIELD") && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 2)) || L.SunlightArrows())]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_3_SUNS_ROOM_1F", () => (L.Get("LOGIC_SPIRIT_MQ_3SUNS_ENEMIES"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_3_SUNS_ROOM_1F:{ name:"Spirit Temple MQ 3 Suns Room 1F", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_3_SUNS_ROOM_2F", () => (L.Get("LOGIC_SPIRIT_MQ_3SUNS_ENEMIES") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")))],
      ["RR_SPIRIT_TEMPLE_MQ_BEHIND_GEYSER", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BEHIND_GEYSER:{ name:"Spirit Temple MQ 1F East", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_1F_SILVER_RUPEES", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_EARLY_ADULT_POT_1", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_EARLY_ADULT_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_FOYER", () => (L.CanUse("RG_MEGATON_HAMMER") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanStandingShield() && (L.CanUseSword() || L.CanUse("RG_STICKS"))))],
      ["RR_SPIRIT_TEMPLE_MQ_3_SUNS_ROOM_1F", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_SAND_PIT", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_SYMPHONY_ROOM_UPPER", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 7))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SAND_PIT:{ name:"Spirit Temple MQ Sand Pit", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_LEEVER_ROOM_CHEST", () => (L.CanKillEnemy("RE_PURPLE_LEEVER") && (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_GS_LEEVER_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_BEHIND_GEYSER", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SYMPHONY_ROOM_UPPER:{ name:"Spirit Temple MQ Symphony Room Upper", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_SYMPHONY_ROOM_DOOR", () => (L.CanUse("RG_MEGATON_HAMMER") && L.CanUse("RG_SONG_OF_TIME") && L.CanUse("RG_EPONAS_SONG") && L.CanUse("RG_SUNS_SONG") && L.CanUse("RG_SONG_OF_STORMS") && L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_BEHIND_GEYSER", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 7))],
      ["RR_SPIRIT_TEMPLE_MQ_SYMPHONY_ROOM_LOWER", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SYMPHONY_ROOM_LOWER:{ name:"Spirit Temple MQ Symphony Room Lower", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_SYMPHONY_ROOM_UPPER", () => (L.IsAdult || L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanGroundJump())],
      ["RR_SPIRIT_TEMPLE_MQ_SKULLTULA_ROOM", () => (L.Get("LOGIC_SPIRIT_MQ_SYMPHONY_ROOM_DOOR"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SKULLTULA_ROOM:{ name:"Spirit Temple MQ Skulltula Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_SYMPHONY_ROOM_CHEST", () => (L.CanPassEnemy("RE_BIG_SKULLTULA") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_GS_SYMPHONY_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_SYMPHONY_ROOM_LOWER", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_FIRE_WALL_STAIRS_LOWER:{ name:"Spirit Temple MQ Fire Wall Stairs Lower", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 5))],
      ["RR_SPIRIT_TEMPLE_MQ_FIRE_WALL_STAIRS_UPPER", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_FIRE_WALL_STAIRS_UPPER:{ name:"Spirit Temple MQ Fire Wall Stairs Upper", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_FIRE_WALL_STAIRS_LOWER", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER")))],
      ["RR_SPIRIT_TEMPLE_MQ_BEAMOS_PITS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BEAMOS_PITS:{ name:"Spirit Temple MQ Beamos Pits", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_BEAMOS_ROOM_CHEST", () => (L.CanKillEnemy("RE_BEAMOS") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_BEAMOS_SMALL_CRATE", () => (L.CanAvoidEnemy("RE_BEAMOS", true, 4) && L.CanUse("RG_SONG_OF_TIME") && L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_FIRE_WALL_STAIRS_UPPER", () => (L.CanAvoidEnemy("RE_BEAMOS", true, 4) && L.CanUse("RG_SONG_OF_TIME") && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_SPIRIT_TEMPLE_MQ_SOT_SUN_ROOM", () => (L.CanAvoidEnemy("RE_BEAMOS", true, 4) && L.CanUse("RG_SONG_OF_TIME") && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_SPIRIT_TEMPLE_MQ_BIG_WALL_BASE", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 6))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_SOT_SUN_ROOM:{ name:"Spirit Temple MQ SoT Sun Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_CHEST_SWITCH_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SPIRIT_TEMPLE_MQ_DINALFOS_ROOM_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_BEAMOS_PITS", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_FLOORMASTER_STAIRS", () => (L.CanJumpslash())],
      ["RR_SPIRIT_TEMPLE_MQ_3F_GIBDO_ROOM", () => (L.AnyAgeTime((() => (((L.IsAdult || L.CanUse("RG_SONG_OF_TIME")) && L.CanUse("RG_MIRROR_SHIELD")) || L.SunlightArrows()))))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_FLOORMASTER_STAIRS:{ name:"Spirit Temple MQ Floormaster Stairs", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_SOT_SUN_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_ADULT_THRONE", () => ((L.trick("RT_LENS_SPIRIT_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.AnyAgeTime((() => (L.CanKillEnemy("RE_FLOORMASTER")))))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_ADULT_THRONE:{ name:"Spirit Temple MQ Adult Throne", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_FLOORMASTER_STAIRS", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_LEFT_HAND_EXIT", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_IRON_KNUCKLE")))))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_LEFT_HAND_EXIT:{ name:"Spirit Temple MQ Left Hand Exit", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_ADULT_THRONE", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_OUTER_LEFT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_OUTER_LEFT_HAND:{ name:"Spirit Temple MQ Outer Left Hand", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MIRROR_SHIELD_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_OUTER_RIGHT_HAND", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_SPIRIT_TEMPLE_MQ_ADULT_THRONE", () => true],
      ["RR_DESERT_COLOSSUS", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_3F_GIBDO_ROOM:{ name:"Spirit Temple MQ 3F Gibdo Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_BOSS_KEY_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_SOT_SUN_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BIG_WALL_BASE:{ name:"Spirit Temple MQ Big Wall Base", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_LONG_CLIMB_POT_1", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_LONG_CLIMB_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_BEAMOS_PITS", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_BIG_WALL_UPPER", () => ((L.CanKillEnemy("RE_KEESE") || L.CanUse("RG_SKULL_MASK")) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BIG_WALL_UPPER:{ name:"Spirit Temple MQ Big Wall Upper", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_MQ_BIG_WALL_SILVERS", () => ((L.CanKillEnemy("RE_KEESE") || L.CanUse("RG_SKULL_MASK")) && (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT")))]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_BIG_WALL_BASE", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_4F_CENTRAL", () => (L.Get("LOGIC_SPIRIT_MQ_BIG_WALL_SILVERS"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_4F_CENTRAL:{ name:"Spirit Temple MQ 4F Central", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_BEFORE_MIRROR_POT_1", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_BEFORE_MIRROR_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_BIG_WALL_UPPER", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_9_THRONES_ROOM", () => (L.SmallKeys("SCENE_SPIRIT_TEMPLE", 7))],
      ["RR_SPIRIT_TEMPLE_MQ_BIG_MIRROR_ROOM", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_9_THRONES_ROOM:{ name:"Spirit Temple MQ 9 Thrones Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_GS_NINE_THRONES_ROOM_WEST", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_SPIRIT_TEMPLE_MQ_GS_NINE_THRONES_ROOM_NORTH", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_4F_CENTRAL", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BIG_MIRROR_ROOM:{ name:"Spirit Temple MQ Big Mirror Room", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_PLATFORM_LOWERED", () => ((L.Get("LOGIC_SPIRIT_PUSHED_4F_MIRRORS") && L.CanUse("RG_MIRROR_SHIELD")) || L.SunlightArrows())]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_POT_1", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_POT_2", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_POT_3", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_POT_4", () => (L.CanBreakPots())],
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_SPIRIT_TEMPLE_MQ_BIG_MIRROR_CRATE_3", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_4F_CENTRAL", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_BIG_MIRROR_CAVE", () => (L.AnyAgeTime((() => (L.CanUse("RG_MEGATON_HAMMER")))))],
      ["RR_SPIRIT_TEMPLE_MQ_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED"))]
    ] },
    RR_SPIRIT_TEMPLE_MQ_BIG_MIRROR_CAVE:{ name:"Spirit Temple MQ Big Mirror Cave", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_SPIRIT_PUSHED_4F_MIRRORS", () => (((L.IsAdult && L.CanUse("RG_MIRROR_SHIELD")) || L.SunlightArrows() || (L.trick("RT_FIRE_RINGS") && L.TakeDamage())) && L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_MQ_MIRROR_PUZZLE_INVISIBLE_CHEST", () => ((L.trick("RT_LENS_SPIRIT_MQ") || L.CanUse("RG_LENS_OF_TRUTH")) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_BIG_MIRROR_ROOM", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_PLATFORM:{ name:"Spirit Temple MQ Platform", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_HEAD", () => (L.Get("LOGIC_SPIRIT_PUSHED_4F_MIRRORS") && L.CanUse("RG_MIRROR_SHIELD") && L.CanUse("RG_HOOKSHOT"))],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_CHILD", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM_ADULT", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_LEFT_HAND", () => true]
    ] },
    RR_SPIRIT_TEMPLE_MQ_STATUE_HEAD:{ name:"Spirit Temple MQ Statue Head", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[
      ["LOGIC_REVERSE_SPIRIT_CHILD", () => (L.IsChild)],
      ["LOGIC_REVERSE_SPIRIT_ADULT", () => (L.IsAdult)]
    ],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_ROOM", () => true],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_RIGHT_HAND", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_MQ_INNER_LEFT_HAND", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_SPIRIT_TEMPLE_MQ_PLATFORM", () => (L.Get("LOGIC_SPIRIT_PLATFORM_LOWERED") && (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT") ))],
      ["RR_SPIRIT_TEMPLE_BOSS_ENTRYWAY", () => true]
    ] },
    RR_SPIRIT_TEMPLE_BOSS_ENTRYWAY:{ name:"Spirit Temple Boss Entryway", scene:"SCENE_SPIRIT_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SPIRIT_TEMPLE_STATUE_HEAD", () => (!L.mq("SPIRIT_TEMPLE") && false)],
      ["RR_SPIRIT_TEMPLE_MQ_STATUE_HEAD", () => (L.mq("SPIRIT_TEMPLE") && false)],
      ["RR_SPIRIT_TEMPLE_BOSS_ROOM", () => (L.HasItem("RG_SPIRIT_TEMPLE_BOSS_KEY"))]
    ] },
    RR_SPIRIT_TEMPLE_BOSS_ROOM:{ name:"Spirit Temple Boss Room", scene:"SCENE_SPIRIT_TEMPLE_BOSS", time:false,
      events:[
      ["LOGIC_SPIRIT_TEMPLE_CLEAR", () => ((L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT")) && L.CanKillEnemy("RE_TWINROVA"))]
    ],
      checks:[
      ["RC_SPIRIT_TEMPLE_TWINROVA_HEART", () => (L.Get("LOGIC_SPIRIT_TEMPLE_CLEAR"))],
      ["RC_TWINROVA", () => (L.Get("LOGIC_SPIRIT_TEMPLE_CLEAR"))]
    ],
      exits:[
      ["RR_SPIRIT_TEMPLE_BOSS_ENTRYWAY", () => false],
      ["RR_DESERT_COLOSSUS", () => (L.Get("LOGIC_SPIRIT_TEMPLE_CLEAR"))]
    ] },
    RR_WATER_TEMPLE_ENTRYWAY:{ name:"Water Temple Entryway", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_ENTRANCE_LEDGE", () => (L.HasItem("RG_BRONZE_SCALE") && !L.mq("WATER_TEMPLE"))],
      ["RR_WATER_TEMPLE_MQ_ENTRANCE_LEDGE", () => (L.HasItem("RG_BRONZE_SCALE") && L.mq("WATER_TEMPLE"))],
      ["RR_LH_FROM_WATER_TEMPLE", () => true]
    ] },
    RR_WATER_TEMPLE_ENTRANCE_LEDGE:{ name:"Water Temple Entrance Ledge", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_COULD_MIDDLE", () => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_ENTRYWAY", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_WATER_TEMPLE_MAIN", () => true],
      ["RR_WATER_TEMPLE_3F_CENTRAL_A", () => ((L.WaterLevel(WL_HIGH) && L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_3F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_WATER_TEMPLE_3F_CENTRAL_LM", () => (L.CanUse("RG_HOVER_BOOTS") && L.WaterLevel(WL_LOW_OR_MID))],
      ["RR_WATER_TEMPLE_2F_CENTRAL_LM", () => (L.WaterLevel(WL_LOW_OR_MID))]
    ] },
    RR_WATER_TEMPLE_MAIN:{ name:"Water Temple Main", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_PUSHED_1F_BLOCK", () => (L.WaterLevel(WL_LOW) && L.HasItem("RG_GORONS_BRACELET"))],
      ["LOGIC_WATER_COULD_MIDDLE", () => ((L.CanUse("RG_LONGSHOT") && (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))) || (L.CanUse("RG_HOOKSHOT") && L.SmallKeys("SCENE_WATER_TEMPLE", 5)))],
      ["LOGIC_WATER_COULD_HIGH_FROM_MID", () => ((L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS") || L.HasItem("RG_BRONZE_SCALE")) && L.CanHitSwitch("ED_BOMB_THROW"))]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_ENTRANCE_LEDGE", () => (L.HasItem("RG_BRONZE_SCALE") && L.WaterLevel(WL_HIGH))],
      ["RR_WATER_TEMPLE_SIDE_TOWER_1F", () => ((L.WaterTimer() >= 24 && L.CanUse("RG_IRON_BOOTS")) || (L.WaterLevel(WL_MID) && L.HasItem("RG_GOLDEN_SCALE") && L.WaterTimer() >= 16) || L.WaterLevel(WL_LOW) || (L.CanUse("RG_LONGSHOT") && L.trick("RT_WATER_LONGSHOT_TORCH") && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 8))],
      ["RR_WATER_TEMPLE_3F_CENTRAL_A", () => (L.WaterLevel(WL_HIGH) && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_3F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_2F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && L.CanUse("RG_IRON_BOOTS") && ((L.WaterTimer() >= 8 && L.HasItem("RG_BRONZE_SCALE")) || (L.WaterTimer() >= 40 && L.CanUse("RG_LONGSHOT"))))],
      ["RR_WATER_TEMPLE_2F_CENTRAL_LM", () => (L.WaterLevel(WL_LOW_OR_MID) && ((L.WaterLevel(WL_MID) && L.HasItem("RG_BRONZE_SCALE")) || ((L.WaterLevel(WL_LOW) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 40)) && L.CanUse("RG_LONGSHOT"))))],
      ["RR_WATER_TEMPLE_PILLAR_1F", () => (L.WaterLevel(WL_LOW) && L.SmallKeys("SCENE_WATER_TEMPLE", 5))],
      ["RR_WATER_TEMPLE_SPIKE_MOAT", () => (((L.WaterLevel(WL_LOW) && L.HasItem("RG_BRONZE_SCALE")) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && (L.CanUse("RG_HOOKSHOT") || L.HasItem("RG_BRONZE_SCALE")))))],
      ["RR_WATER_TEMPLE_BLOCK_U_BEND", () => (L.Get("LOGIC_WATER_PUSHED_1F_BLOCK") && ((L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 16) || (L.WaterLevel(WL_LOW) && L.HasItem("RG_SILVER_SCALE"))))],
      ["RR_WATER_TEMPLE_NEAR_CAGE", () => (L.AnyAgeTime((() => (L.WaterLevel(WL_LOW) && L.HasExplosives()))) && (L.WaterLevel(WL_LOW) && L.HasItem("RG_SILVER_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 16)))]
    ] },
    RR_WATER_TEMPLE_3F_CENTRAL_A:{ name:"Water Temple 3F Central Any Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_1", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots("ED_BOOMERANG", false, true) && L.HasItem("RG_GOLDEN_SCALE")))],
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_2", () => (L.CanUse("RG_BOOMERANG") || (L.CanBreakPots("ED_BOOMERANG", false, true) && L.HasItem("RG_GOLDEN_SCALE")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => true],
      ["RR_WATER_TEMPLE_ENTRANCE_LEDGE", () => (L.CanUse("RG_LONGSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_HIGH_EMBLEM", () => (L.Water3FCentralToHighEmblem())],
      ["RR_WATER_TEMPLE_JET_CHEST_ROOM", () => (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RR_WATER_TEMPLE_RISING_TARGET_LEDGE", () => (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && (L.CanUse("RG_MEGATON_HAMMER") || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives())))]
    ] },
    RR_WATER_TEMPLE_3F_CENTRAL_H:{ name:"Water Temple 3F Central High Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_3F_CENTRAL_A", () => true],
      ["RR_WATER_TEMPLE_2F_CENTRAL_H", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8 && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_OUTSIDE_WATERFALL", () => (L.IsAdult ||L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_BLOCK_LOOP_3F_H", () => (L.CanUse("RG_HOVER_BOOTS") || L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_RISING_TARGET_LEDGE", () => (L.CanUse("RG_LONGSHOT") || (L.trick("RT_WATER_IRON_BOOTS_LEDGE_GRAB") && L.IsAdult && L.HasItem("RG_BRONZE_SCALE") && L.CanUse("RG_IRON_BOOTS")))]
    ] },
    RR_WATER_TEMPLE_3F_CENTRAL_LM:{ name:"Water Temple 3F Central Low Or Mid Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_3F_CENTRAL_A", () => true],
      ["RR_WATER_TEMPLE_2F_CENTRAL_LM", () => true],
      ["RR_WATER_TEMPLE_BLOCK_LOOP", () => (L.trick("RT_WATER_CENTRAL_BOW") && L.CanHitEyeTargets())],
      ["RR_WATER_TEMPLE_BLOCK_LOOP_3F_LM", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_PILLAR_H", () => (L.trick("RT_WATER_IRONS_CENTRAL_GS") && L.CanUse("RG_DINS_FIRE") && L.Water3FCentralToHighEmblem())]
    ] },
    RR_WATER_TEMPLE_2F_CENTRAL_H:{ name:"Water Temple 2F Central High Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_1", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_2", () => (L.CanUse("RG_HOOKSHOT"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => true],
      ["RR_WATER_TEMPLE_JET_CHEST_ROOM", () => ((L.CanUse("RG_HOOKSHOT") || (L.trick("RT_WATER_IRON_BOOTS_LEDGE_GRAB") && L.HasItem("RG_BRONZE_SCALE") && L.TakeDamage())) && L.WaterTimer() >= 48)],
      ["RR_WATER_TEMPLE_3F_CENTRAL_H", () => (L.CanUse("RG_LONGSHOT") && L.WaterTimer() >= 40)]
    ] },
    RR_WATER_TEMPLE_2F_CENTRAL_LM:{ name:"Water Temple 2F Central Low Or Mid Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => true],
      ["RR_WATER_TEMPLE_JET_CHEST_ROOM", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_OUTSIDE_JET_LIFT_2F", () => (L.WaterLevel(WL_MID) && (L.IsAdult && L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS") || L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_PILLAR_2F", () => (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW"))],
      ["RR_WATER_TEMPLE_PILLAR_H", () => (L.trick("RT_WATER_IRONS_CENTRAL_GS") && (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")) && L.CanUse("RG_LONGSHOT") && L.Water3FCentralToHighEmblem())],
      ["RR_WATER_TEMPLE_3F_CENTRAL_LM", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_WATER_TEMPLE_BLOCK_LOOP", () => (L.CanHitEyeTargets() && (L.CanUse("RG_LONGSHOT") || L.CanUse("RG_HOVER_BOOTS")))]
    ] },
    RR_WATER_TEMPLE_SIDE_TOWER_1F:{ name:"Water Temple Side Tower 1F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_COULD_LOW_FROM_HIGH", () => (L.HasItem("RG_BRONZE_SCALE"))]
    ],
      checks:[
      ["RC_WATER_TEMPLE_TORCH_POT_1", () => ((L.WaterLevel(WL_LOW) && L.CanBreakPots()) || (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS")))],
      ["RC_WATER_TEMPLE_TORCH_POT_2", () => ((L.WaterLevel(WL_LOW) && L.CanBreakPots()) || (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.WaterLevel(WL_LOW) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))],
      ["RR_WATER_TEMPLE_LOW_EMBLEM", () => (L.WaterLevel(WL_HIGH) && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 8)],
      ["RR_WATER_TEMPLE_SIDE_TOWER_2F", () => (L.WaterLevel(WL_MID) && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 8)],
      ["RR_WATER_TEMPLE_TORCH_ROOM", () => (L.WaterLevel(WL_LOW) && (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))]
    ] },
    RR_WATER_TEMPLE_SIDE_TOWER_2F:{ name:"Water Temple Side Tower 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8) || L.WaterLevel(WL_LOW))],
      ["RR_WATER_TEMPLE_CRACKED_WALL", () => (L.WaterLevel(WL_LOW_OR_MID) && L.HasExplosives())]
    ] },
    RR_WATER_TEMPLE_LOW_EMBLEM:{ name:"Water Temple Low Emblem", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_LOW", () => (L.CanUse("RG_ZELDAS_LULLABY"))],
      ["LOGIC_WATER_COULD_LOW", () => true]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.WaterLevel(WL_LOW) || (L.WaterTimer() >= 24 && L.CanUse("RG_IRON_BOOTS")))],
      ["RR_WATER_TEMPLE_SIDE_TOWER_2F", () => (L.WaterLevel(WL_LOW_OR_MID) && ((L.CanUse("RG_HOVER_BOOTS") && L.trick("RT_WATER_CRACKED_WALL_HOVERS")) || L.trick("RT_WATER_CRACKED_WALL")) || L.WaterLevel(WL_MID) && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_4_SPIKES_ROOM", () => true]
    ] },
    RR_WATER_TEMPLE_4_SPIKES_ROOM:{ name:"Water Temple 4 Spikes Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MAP_CHEST", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_SPIKE", "ED_CLOSE", true, 4)))) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_SIDE_TOWER_1F", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_SPIKE", "ED_CLOSE", true, 4)))))]
    ] },
    RR_WATER_TEMPLE_CRACKED_WALL:{ name:"Water Temple Cracked Wall", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_CRACKED_WALL_CHEST", () => ((L.WaterLevel(WL_LOW_OR_MID) && L.HasItem("RG_OPEN_CHEST")) || L.CanOpenUnderwaterChest())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_SIDE_TOWER_2F", () => true]
    ] },
    RR_WATER_TEMPLE_TORCH_ROOM:{ name:"Water Temple Torch Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_TORCHES_CHEST", () => (L.AnyAgeTime((() => ((L.WaterLevel(WL_LOW) && L.CanKillEnemy("RE_SHELL_BLADE", "ED_CLOSE", true, 3) && L.HasItem("RG_OPEN_CHEST")) || L.CanOpenUnderwaterChest()))))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_SIDE_TOWER_1F", () => (((L.WaterLevel(WL_LOW) || L.CanUse("RG_IRON_BOOTS")) && L.AnyAgeTime((() => ((L.WaterLevel(WL_LOW) && L.CanKillEnemy("RE_SHELL_BLADE", "ED_CLOSE", true, 3)) || L.CanUse("RG_HOOKSHOT"))))))]
    ] },
    RR_WATER_TEMPLE_SPIKE_MOAT:{ name:"Water Temple Spike Moat", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_BEHIND_SPIKE_MOAT", () => ((L.CanUse("RG_LONGSHOT") || (L.trick("RT_WATER_BK_REGION") && L.CanUse("RG_HOVER_BOOTS"))))]
    ] },
    RR_WATER_TEMPLE_BEHIND_SPIKE_MOAT:{ name:"Water Temple Behind Spike Moat", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_SPIKE_MOAT", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS")))],
      ["RR_WATER_TEMPLE_BOULDERS_SOUTH", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 4))]
    ] },
    RR_WATER_TEMPLE_BOULDERS_SOUTH:{ name:"Water Temple Boulders South", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_NEAR_BOSS_KEY_CHEST", () => (L.CanUse("RG_LONGSHOT"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_BEHIND_SPIKE_MOAT", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 4))],
      ["RR_WATER_TEMPLE_BOULDERS_NORTH", () => (L.HasItem("RG_BRONZE_SCALE") || (L.trick("RT_WATER_INVISIBLE_HOOKSHOT_TARGET") && L.CanUse(L.IsAdult ? "RG_HOOKSHOT" : "RG_LONGSHOT") && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))],
      ["RR_WATER_TEMPLE_BOULDER_CANAL", () => ((L.IsAdult && (L.CanUse("RG_HOVER_BOOTS") || L.trick("RT_WATER_NORTH_BASEMENT_LEDGE_JUMP"))) || (L.CanMiddairGroundJump() && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))]
    ] },
    RR_WATER_TEMPLE_BOULDERS_NORTH:{ name:"Water Temple Boulders North", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_BOULDERS_SOUTH", () => (L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_BLOCK_ROOM_TARGET", () => true]
    ] },
    RR_WATER_TEMPLE_BLOCK_ROOM_TARGET:{ name:"Water Temple Block Room Target", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_BASEMENT_BLOCK_PUZZLE_POT_1", () => (L.CanBreakPots("ED_HOOKSHOT", false, true) && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)],
      ["RC_WATER_TEMPLE_BASEMENT_BLOCK_PUZZLE_POT_2", () => (L.CanBreakPots("ED_HOOKSHOT", false, true) && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)]
    ],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_ROOM", () => true],
      ["RR_WATER_TEMPLE_BLOCK_ROOM_STAIRS", () => (L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_BLOCK_ROOM:{ name:"Water Temple Block Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_BASEMENT_BLOCK_PUZZLE_POT_1", () => ((L.CanBreakPots("ED_LONGSHOT", true, true) && L.HasItem("RG_BRONZE_SCALE")) || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.WaterTimer() >= 8))],
      ["RC_WATER_TEMPLE_BASEMENT_BLOCK_PUZZLE_POT_2", () => ((L.CanBreakPots("ED_LONGSHOT", true, true) && L.HasItem("RG_BRONZE_SCALE")) || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.WaterTimer() >= 8))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_ROOM_TARGET", () => (L.AnyAgeTime((() => (L.HasItem("RG_GORONS_BRACELET") && L.HasExplosives()))) && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_BLOCK_ROOM_STAIRS", () => (L.AnyAgeTime((() => (L.HasItem("RG_GORONS_BRACELET") && L.HasExplosives()))) && L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_WATER_TEMPLE_BLOCK_ROOM_STAIRS:{ name:"Water Temple Block Room Stairs", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_ROOM", () => true],
      ["RR_WATER_TEMPLE_BLOCK_ROOM_TARGET", () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_3_JETS_SWITCH:{ name:"Water Temple 3 Jets Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_ROOM_STAIRS", () => true],
      ["RR_WATER_TEMPLE_3_JETS_NO_SWITCH", () => true]
    ] },
    RR_WATER_TEMPLE_3_JETS_NO_SWITCH:{ name:"Water Temple 3 Jets Room No Switch", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_3_JETS_SWITCH", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER") && L.CanStandingShield()))],
      ["RR_WATER_TEMPLE_CANAL_ALCOVE", () => true]
    ] },
    RR_WATER_TEMPLE_CANAL_ALCOVE:{ name:"Water Temple Canal Alcove", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_NEAR_BOSS_KEY_CHEST", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (((L.IsAdult && L.CanUse("RG_HOVER_BOOTS")) || L.CanMiddairGroundJump()) && L.CanKillEnemy("RE_GOLD_SKULLTULA", L.HasItem("RG_BRONZE_SCALE") && L.IsAdult ? "ED_SHORT_JUMPSLASH" : "ED_BOOMERANG")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_3_JETS_SWITCH", () => true],
      ["RR_WATER_TEMPLE_BOULDER_CANAL", () => (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))],
      ["RR_WATER_TEMPLE_BEHIND_CANAL", () => (L.IsAdult && L.trick("RT_UNINTUITIVE_JUMPS") && L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_WATER_TEMPLE_BOULDER_CANAL:{ name:"Water Temple Boulder Canal", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_NEAR_BOSS_KEY_CHEST", () => ((L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG")) || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_BOULDERS_SOUTH", () => (L.HasItem("RG_BRONZE_SCALE") || (L.IsAdult && (L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS"))))],
      ["RR_WATER_TEMPLE_BOULDERS_NORTH", () => (L.HasItem("RG_BRONZE_SCALE") || (L.trick("RT_WATER_INVISIBLE_HOOKSHOT_TARGET") && L.CanUse(L.IsAdult ? "RG_HOOKSHOT" : "RG_LONGSHOT") && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))],
      ["RR_WATER_TEMPLE_CANAL_ALCOVE", () => (L.IsAdult)],
      ["RR_WATER_TEMPLE_BEHIND_CANAL", () => (L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 8)]
    ] },
    RR_WATER_TEMPLE_BEHIND_CANAL:{ name:"Water Temple Behind Canal", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_NEAR_BOSS_KEY_CHEST", () => (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.WaterTimer() >= 8)]
    ],
      exits:[
      ["RR_WATER_TEMPLE_BOULDER_CANAL", () => (L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_BOSS_KEY_ROOM", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 5))]
    ] },
    RR_WATER_TEMPLE_BOSS_KEY_ROOM:{ name:"Water Temple Boss Key Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_WATER_TEMPLE_BOSS_KEY_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_WATER_TEMPLE_BOSS_KEY_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_BOSS_KEY_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_BEHIND_CANAL", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 5))]
    ] },
    RR_WATER_TEMPLE_NEAR_CAGE_STEPS:{ name:"Water Temple Near Cage Steps", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE") && L.WaterTimer() >= 16)],
      ["RR_WATER_TEMPLE_NEAR_CAGE", () => (L.CanUse("RG_HOOKSHOT") || ((L.IsAdult && L.CanUse("RG_HOVER_BOOTS")) || L.CanMiddairGroundJump()))]
    ] },
    RR_WATER_TEMPLE_NEAR_CAGE:{ name:"Water Temple Near Cage", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_NEAR_CAGE_STEPS", () => true],
      ["RR_WATER_TEMPLE_GS_CAGE", () => (L.CanJumpslash() || (L.trick("RT_ITEM_EXTENSION") && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT"))))]
    ] },
    RR_WATER_TEMPLE_GS_CAGE:{ name:"Water Temple GS Cage", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_BEHIND_GATE", () => ((L.IsAdult && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA"))) || L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || L.CanGroundJumpslash())],
      ["RC_WATER_TEMPLE_BEHIND_GATE_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_BEHIND_GATE_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_BEHIND_GATE_POT_3", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_BEHIND_GATE_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_NEAR_CAGE", () => (L.CanHitSwitch())]
    ] },
    RR_WATER_TEMPLE_BLOCK_U_BEND:{ name:"Water Temple Block U-Bend", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.Get("LOGIC_WATER_PUSHED_1F_BLOCK") && ((L.CanUse("RG_IRON_BOOTS") && ((L.CanUse("RG_HOOKSHOT") && L.WaterLevel(WL_LOW)) || L.HasItem("RG_BRONZE_SCALE"))) || (L.WaterLevel(WL_HIGH_OR_MID) && L.CanUse("RG_SILVER_SCALE"))) && L.WaterTimer() >= 8)],
      ["RR_WATER_TEMPLE_OUTSIDE_DRAGON_ROOM", () => (L.CanHitSwitch())]
    ] },
    RR_WATER_TEMPLE_OUTSIDE_DRAGON_ROOM:{ name:"Water Temple Outside Dragon Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_U_BEND", () => (L.CanHitSwitch("ED_BOOMERANG") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_DRAGON_ROOM", () => true]
    ] },
    RR_WATER_TEMPLE_DRAGON_ROOM:{ name:"Water Temple Dragon Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_DRAGON_CHEST", () => (L.HasItem("RG_BRONZE_SCALE") && L.HasItem("RG_OPEN_CHEST") && ((L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS")) || (((L.IsAdult && L.trick("RT_WATER_ADULT_DRAGON")) || (L.IsChild && L.trick("RT_WATER_CHILD_DRAGON"))) && L.CanHitSwitch("ED_BOOMERANG", true) && (L.HasItem("RG_SILVER_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)))))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_OUTSIDE_DRAGON_ROOM", () => true],
      ["RR_WATER_TEMPLE_ABOVE_DRAGON", () => false]
    ] },
    RR_WATER_TEMPLE_PILLAR_1F:{ name:"Water Temple Pillar 1F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 5) && L.WaterLevel(WL_LOW))],
      ["RR_WATER_TEMPLE_PILLAR_2F", () => (L.CanUse("RG_HOOKSHOT") || (L.WaterLevel(WL_MID) && L.trick("RT_WATER_FW_CENTRAL_GS") && L.CanUse("RG_FARORES_WIND") && L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_PILLAR_B1", () => (L.WaterLevel(WL_MID) && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 40)],
      ["RR_WATER_TEMPLE_PILLAR_H", () => (L.trick("RT_WATER_FW_CENTRAL_GS") && L.CanUse("RG_FARORES_WIND") && (L.CanUse("RG_IRON_BOOTS") || L.HasItem("RG_BRONZE_SCALE")))]
    ] },
    RR_WATER_TEMPLE_PILLAR_2F:{ name:"Water Temple Pillar 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_MIDDLE", () => (L.CanUse("RG_ZELDAS_LULLABY"))],
      ["LOGIC_WATER_COULD_MIDDLE", () => true]
    ],
      checks:[
      ["RC_WATER_TEMPLE_GS_CENTRAL_PILLAR", () => (L.CanUse("RG_LONGSHOT"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_2F_CENTRAL_LM", () => true],
      ["RR_WATER_TEMPLE_PILLAR_1F", () => (L.WaterLevel(WL_LOW) || L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)],
      ["RR_WATER_TEMPLE_PILLAR_H", () => (L.trick("RT_WATER_FW_CENTRAL_GS") && L.CanUse("RG_FARORES_WIND") && (L.CanUse("RG_IRON_BOOTS") || L.HasItem("RG_BRONZE_SCALE")))]
    ] },
    RR_WATER_TEMPLE_PILLAR_H:{ name:"Water Temple Pillar High Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_CENTRAL_PILLAR", () => (L.HasItem("RG_BRONZE_SCALE") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)],
      ["RR_WATER_TEMPLE_2F_CENTRAL_LM", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)],
      ["RR_WATER_TEMPLE_PILLAR_B1", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 40)]
    ] },
    RR_WATER_TEMPLE_PILLAR_B1:{ name:"Water Temple Pillar B1", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_CENTRAL_PILLAR_CHEST", () => (L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_BRONZE_SCALE") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_JET_CHEST_ROOM:{ name:"Water Temple Jet Chest Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_COMPASS_CHEST", () => (L.CanUseProjectile() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_WATER_TEMPLE_NEAR_COMPASS_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_NEAR_COMPASS_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_NEAR_COMPASS_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8) || L.WaterLevel(WL_LOW_OR_MID))]
    ] },
    RR_WATER_TEMPLE_OUTSIDE_JET_LIFT_2F:{ name:"Water Temple Outside Jet Lift 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_WATER_TEMPLE_2F_CENTRAL_LM", () => (L.WaterLevel(WL_MID) && (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_WATER_TEMPLE_JET_LIFT_2F", () => (L.WaterLevel(WL_MID))]
    ] },
    RR_WATER_TEMPLE_JET_LIFT_2F:{ name:"Water Temple Jet Lift 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_OUTSIDE_JET_LIFT_2F", () => (L.WaterLevel(WL_LOW_OR_MID) || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_WATER_TEMPLE_JET_LIFT_3F", () => (L.CanHitSwitch("ED_BOMB_THROW"))]
    ] },
    RR_WATER_TEMPLE_JET_LIFT_3F:{ name:"Water Temple Jet Lift 3F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_JET_LIFT_2F", () => true],
      ["RR_WATER_TEMPLE_HIGH_EMBLEM", () => true]
    ] },
    RR_WATER_TEMPLE_HIGH_EMBLEM:{ name:"Water Temple High Emblem", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_HIGH", () => true],
      ["LOGIC_WATER_SCARECROW", () => (L.ScarecrowsSong())]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => true],
      ["RR_WATER_TEMPLE_3F_CENTRAL_A", () => true],
      ["RR_WATER_TEMPLE_3F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH))]
    ] },
    RR_WATER_TEMPLE_BLOCK_LOOP:{ name:"Water Temple Block Loop", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_LOOP_BACK", () => (L.HasItem("RG_GORONS_BRACELET") && L.WaterLevel(WL_LOW_OR_MID))],
      ["RR_WATER_TEMPLE_BLOCK_LOOP_3F_LM", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_BLOCK_LOOP_BACK:{ name:"Water Temple Block Loop Back", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_CENTRAL_BOW_TARGET_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_WATER_TEMPLE_CENTRAL_BOW_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_CENTRAL_BOW_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[] },
    RR_WATER_TEMPLE_BLOCK_LOOP_3F_A:{ name:"Water Temple Block Loop 3F Any Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_1", () => (L.CanUse("RG_BOMBCHU_5") && (L.HasItem("RG_GOLDEN_SCALE") || L.CanUse("RG_IRON_BOOTS")))],
      ["RC_WATER_TEMPLE_MAIN_LEVEL_2_POT_2", () => (L.CanUse("RG_BOMBCHU_5") && (L.HasItem("RG_GOLDEN_SCALE") || L.CanUse("RG_IRON_BOOTS")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => true],
      ["RR_WATER_TEMPLE_3F_CENTRAL_A", () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_BLOCK_LOOP_3F_H:{ name:"Water Temple Block Loop 3F High Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_LOOP_3F_A", () => true],
      ["RR_WATER_TEMPLE_3F_CENTRAL_H", () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_BLOCK_LOOP_3F_LM:{ name:"Water Temple Block Loop 3F Low or Mid Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_BLOCK_LOOP_3F_A", () => true],
      ["RR_WATER_TEMPLE_3F_CENTRAL_LM", () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_2F_CENTRAL_LM", () => true]
    ] },
    RR_WATER_TEMPLE_OUTSIDE_WATERFALL:{ name:"Water Temple Outside Waterfall", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => true],
      ["RR_WATER_TEMPLE_OUTSIDE_JET_LIFT_2F", () => (L.WaterLevel(WL_MID))],
      ["RR_WATER_TEMPLE_WATERFALL", () => (L.WaterLevel(WL_HIGH) && L.SmallKeys("SCENE_WATER_TEMPLE", 4))],
      ["RR_WATER_TEMPLE_3F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && (L.IsAdult || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT") || L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_2F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_WATERFALL:{ name:"Water Temple Waterfall", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_FALLING_PLATFORM_ROOM", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT") || (L.trick("RT_WATER_RANG_FALLING_PLATFORM_GS") && L.CanUse("RG_BOOMERANG")) || (L.trick("RT_WATER_HOOKSHOT_FALLING_PLATFORM_GS") && L.IsAdult && L.CanUse("RG_HOOKSHOT")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_OUTSIDE_WATERFALL", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 4))],
      ["RR_WATER_TEMPLE_WATERFALL_TOP", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_WATERFALL_TOP:{ name:"Water Temple Waterfall Top", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_WATERFALL", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_TOGGLE_SWITCH", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 5))]
    ] },
    RR_WATER_TEMPLE_TOGGLE_SWITCH:{ name:"Water Temple Toggle Switch", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_WATERFALL_TOP", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 5))],
      ["RR_WATER_TEMPLE_LIKE_LIKE_SPIKES", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_LIKE_LIKE_SPIKES:{ name:"Water Temple Like Like Spikes", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_LIKE_LIKE_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_LIKE_LIKE_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_TOGGLE_SWITCH", () => ((L.HasItem("RG_BRONZE_SCALE") && L.CanHitSwitch("ED_BOMB_THROW")) || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_DARK_LINK_ROOM", () => true]
    ] },
    RR_WATER_TEMPLE_DARK_LINK_ROOM:{ name:"Water Temple Dark Link Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_LIKE_LIKE_SPIKES", () => (L.CanKillEnemy("RE_DARK_LINK"))],
      ["RR_WATER_TEMPLE_SOT_PIT_ROOM", () => (L.CanKillEnemy("RE_DARK_LINK"))]
    ] },
    RR_WATER_TEMPLE_SOT_PIT_ROOM:{ name:"Water Temple Song Of Time Pit Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_LONGSHOT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_DARK_LINK_ROOM", () => true],
      ["RR_WATER_TEMPLE_RIVER", () => (L.IsChild || L.CanUse("RG_SONG_OF_TIME"))]
    ] },
    RR_WATER_TEMPLE_RIVER:{ name:"Water Temple River", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_RIVER", () => ((L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.WaterTimer() >= 16))],
      ["RC_WATER_TEMPLE_RIVER_HEART_1", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16) || L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_WATER_TEMPLE_RIVER_HEART_2", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16) || L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_WATER_TEMPLE_RIVER_HEART_3", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16) || L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_WATER_TEMPLE_RIVER_HEART_4", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16) || L.HasItem("RG_BRONZE_SCALE"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_RIVER_POTS", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 32 && L.CanUse("RG_LONGSHOT")) || L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_WATER_TEMPLE_RIVER_POTS:{ name:"Water Temple River Pots", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_GS_RIVER", () => (L.trick("RT_WATER_RIVER_GS") && L.CanUse("RG_LONGSHOT"))],
      ["RC_WATER_TEMPLE_RIVER_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_RIVER_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_ABOVE_DRAGON", () => (L.CanHitEyeTargets() && (L.IsAdult || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT")))],
      ["RR_WATER_TEMPLE_RIVER", () => (L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_WATER_TEMPLE_ABOVE_DRAGON:{ name:"Water Temple Above Dragon", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_RIVER_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_WATER_TEMPLE_DRAGON_CHEST", () => (L.IsAdult && L.CanHitSwitch("ED_LONGSHOT") && L.HasItem("RG_BRONZE_SCALE") && L.HasItem("RG_OPEN_CHEST") && ((L.trick("RT_WATER_ADULT_DRAGON") && (L.HasItem("RG_SILVER_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))) || L.trick("RT_WATER_DRAGON_JUMP_DIVE")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_DRAGON_ROOM", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT") || (L.IsAdult && L.CanUse("RG_HOVER_BOOTS") && L.CanJumpslash()))]
    ] },
    RR_WATER_TEMPLE_RISING_TARGET_LEDGE:{ name:"Water Temple Rising Target Ledge", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_WATER_COULD_MIDDLE", () => (L.WaterRisingTargetTo3FCentral() && (L.HasFireSourceWithTorch() || L.CanUse("RG_FAIRY_BOW")))]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MAIN_LEVEL_1_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MAIN_LEVEL_1_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MAIN", () => (L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.TakeDamage()))],
      ["RR_WATER_TEMPLE_3F_CENTRAL_A", () => (L.WaterRisingTargetTo3FCentral())],
      ["RR_WATER_TEMPLE_3F_CENTRAL_H", () => (L.WaterRisingTargetTo3FCentral() && L.WaterLevel(WL_HIGH))],
      ["RR_WATER_TEMPLE_3F_CENTRAL_LM", () => (L.WaterRisingTargetTo3FCentral() && L.WaterLevel(WL_LOW_OR_MID))],
      ["RR_WATER_TEMPLE_PILLAR_H", () => (L.trick("RT_WATER_IRONS_CENTRAL_GS") && L.CanUse("RG_FIRE_ARROWS") && L.WaterRisingTargetTo3FCentral())],
      ["RR_WATER_TEMPLE_TRAPPED_SLOPE", () => true]
    ] },
    RR_WATER_TEMPLE_TRAPPED_SLOPE:{ name:"Water Temple Trapped Slope", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_RISING_TARGET_LEDGE", () => true],
      ["RR_WATER_TEMPLE_BOSS_ENTRYWAY", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_ENTRANCE_LEDGE:{ name:"Water Temple MQ Entrance Ledge", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_COULD_MIDDLE", () => true]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_ENTRYWAY", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_WATER_TEMPLE_MQ_MAIN", () => true],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_A", () => (L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_H", () => ((L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")) && L.WaterLevel(WL_HIGH))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_LM", () => ((L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")) && L.WaterLevel(WL_LOW_OR_MID))],
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_LM", () => (L.WaterLevel(WL_LOW_OR_MID))]
    ] },
    RR_WATER_TEMPLE_MQ_MAIN:{ name:"Water Temple MQ Main", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_COULD_MIDDLE", () => (L.CanUse("RG_HOOKSHOT"))]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_ENTRANCE_LEDGE", () => (L.HasItem("RG_BRONZE_SCALE") && L.WaterLevel(WL_HIGH))],
      ["RR_WATER_TEMPLE_MQ_SIDE_TOWER_1F", () => ((L.WaterTimer() >= 24 && L.CanUse("RG_IRON_BOOTS")) || (L.WaterLevel(WL_LOW_OR_MID) && L.HasItem("RG_GOLDEN_SCALE") && L.WaterTimer() >= 16) || L.WaterLevel(WL_LOW))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_A", () => (L.WaterLevel(WL_HIGH) && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_A", () => (((L.WaterLevel(WL_LOW) || (L.CanUse("RG_IRON_BOOTS") && (L.WaterLevel(WL_LOW_OR_MID) || L.WaterTimer() >= 16))) && L.CanUse("RG_LONGSHOT")) || ((L.WaterLevel(WL_MID) || (L.WaterLevel(WL_HIGH_OR_MID) && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)) && L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanUse("RG_LONGSHOT")) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8 && L.HasItem("RG_BRONZE_SCALE"))))],
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_LM", () => (((L.WaterLevel(WL_LOW) || (L.CanUse("RG_IRON_BOOTS") && L.WaterLevel(WL_LOW_OR_MID))) && L.CanUse("RG_LONGSHOT")) || (L.WaterLevel(WL_MID) && L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_MQ_PILLAR_1F", () => (L.WaterLevel(WL_LOW))],
      ["RR_WATER_TEMPLE_MQ_PILLAR_H", () => (L.WaterLevel(WL_HIGH) && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT")))],
      ["RR_WATER_TEMPLE_MQ_LIZALFOS_LOOP_A", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_MQ_LIZALFOS_LOOP_LM", () => (L.WaterLevel(WL_MID) && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_MQ_B1_GATE_SWITCH", () => (L.Get("LOGIC_WATER_MQ_B1_SWITCH") && (L.WaterLevel(WL_LOW) || ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 24) && L.HasItem("RG_BRONZE_SCALE"))))],
      ["RR_WATER_TEMPLE_MQ_TRIANGLE_TORCH_ROOM", () => (L.Get("LOGIC_WATER_MQ_B1_SWITCH") && ((L.WaterLevel(WL_LOW) && L.HasItem("RG_SILVER_SCALE")) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT")))))],
      ["RR_WATER_TEMPLE_MQ_CRATE_VORTEX_ROOM", () => (L.Get("LOGIC_WATER_MQ_B1_SWITCH") && ((L.WaterLevel(WL_LOW) && L.HasItem("RG_BRONZE_SCALE")) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanUse("RG_HOOKSHOT") || L.HasItem("RG_BRONZE_SCALE"))) && (L.CanUse("RG_LONGSHOT") || (L.trick("RT_WATER_BK_REGION") && L.CanUse("RG_HOVER_BOOTS"))))]
    ] },
    RR_WATER_TEMPLE_MQ_3F_CENTRAL_A:{ name:"Water Temple MQ 3F Central Any Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => true],
      ["RR_WATER_TEMPLE_MQ_ENTRANCE_LEDGE", () => (L.CanUse("RG_LONGSHOT") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_A", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_MQ_RISING_TARGET_LEDGE", () => (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && (L.CanUse("RG_MEGATON_HAMMER") || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives())))],
      ["RR_WATER_TEMPLE_MQ_LIZALFOS_LOOP_A", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RR_WATER_TEMPLE_MQ_HIGH_EMBLEM", () => (L.CanUse("RG_HOOKSHOT") || (L.IsAdult && L.CanUse("RG_HOVER_BOOTS")))]
    ] },
    RR_WATER_TEMPLE_MQ_3F_CENTRAL_H:{ name:"Water Temple MQ 3F Central High Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_H", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_MQ_RISING_TARGET_LEDGE", () => (L.CanUse("RG_LONGSHOT") || (L.trick("RT_WATER_IRON_BOOTS_LEDGE_GRAB") && L.IsAdult && L.HasItem("RG_BRONZE_SCALE") && L.CanUse("RG_IRON_BOOTS")))],
      ["RR_WATER_TEMPLE_MQ_OUTSIDE_WATERFALL", () => (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_3F_CENTRAL_LM:{ name:"Water Temple MQ 3F Central Low or Mid Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_LM", () => true],
      ["RR_WATER_TEMPLE_MQ_LIZALFOS_LOOP_LM", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_2F_CENTRAL_A:{ name:"Water Temple MQ 2F Central Any Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => true],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_A", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_MQ_STORAGE_ROOM", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_WATER_IRON_BOOTS_LEDGE_GRAB") && L.HasItem("RG_BRONZE_SCALE")))]
    ] },
    RR_WATER_TEMPLE_MQ_2F_CENTRAL_H:{ name:"Water Temple MQ 2F Central High Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_A", () => true],
      ["RR_WATER_TEMPLE_MQ_PILLAR_H", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_2F_CENTRAL_LM:{ name:"Water Temple MQ 2F Central Low or Mid Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_A", () => true],
      ["RR_WATER_TEMPLE_MQ_PILLAR_2F", () => true],
      ["RR_WATER_TEMPLE_MQ_HIDDEN_SWITCH_2F", () => ((L.IsAdult || L.CanUse("RG_HOVER_BOOTS")) && L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_WATER_TEMPLE_MQ_LIZALFOS_LOOP_LM", () => (L.CanUse("RG_HOVER_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_MQ_HIGH_EMBLEM:{ name:"Water Temple MQ High Emblem", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_SCARECROW", () => (L.ScarecrowsSong())],
      ["LOGIC_WATER_HIGH", () => true]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_A", () => true],
      ["RR_WATER_TEMPLE_MQ_MAIN", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_RISING_TARGET_LEDGE:{ name:"Water Temple MQ Rising Target Ledge", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.TakeDamage()))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_A", () => (L.WaterRisingTargetTo3FCentral())],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_H", () => (L.WaterRisingTargetTo3FCentral() && L.WaterLevel(WL_HIGH))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_LM", () => (L.WaterRisingTargetTo3FCentral() && L.WaterLevel(WL_LOW_OR_MID))],
      ["RR_WATER_TEMPLE_MQ_BOSS_DOOR_RAMP", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_BOSS_DOOR_RAMP:{ name:"Water Temple MQ Boss Door Ramp", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_RISING_TARGET_LEDGE", () => true],
      ["RR_WATER_TEMPLE_MQ_BOSS_DOOR", () => (L.CanUse("RG_LONGSHOT") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_ICE_ARROWS") || L.CanUse("RG_NAYRUS_LOVE"))]
    ] },
    RR_WATER_TEMPLE_MQ_BOSS_DOOR:{ name:"Water Temple MQ Boss Door", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_BOSS_DOOR_RAMP", () => (L.CanUse("RG_ICE_ARROWS") || L.TakeDamage())],
      ["RR_WATER_TEMPLE_BOSS_ENTRYWAY", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_SIDE_TOWER_1F:{ name:"Water Temple MQ Side Tower 1F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_COULD_LOW_FROM_HIGH", () => (L.HasItem("RG_BRONZE_SCALE"))]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_LOWER_TORCHES_POT_1", () => ((L.WaterLevel(WL_LOW) && L.CanBreakPots()) || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.WaterTimer() >= 16))],
      ["RC_WATER_TEMPLE_MQ_LOWER_TORCHES_POT_2", () => ((L.WaterLevel(WL_LOW) && L.CanBreakPots()) || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.WaterTimer() >= 16))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.WaterLevel(WL_LOW) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16))],
      ["RR_WATER_TEMPLE_MQ_TOWER_TARGET_ROOM", () => (L.WaterLevel(WL_LOW) && (L.CanUse("RG_FAIRY_BOW") || L.HasFireSourceWithTorch()))],
      ["RR_WATER_TEMPLE_MQ_SIDE_TOWER_2F", () => ((L.WaterLevel(WL_MID) && L.HasItem("RG_BRONZE_SCALE")) || (L.Get("LOGIC_WATER_MQ_SIDE_TOWER_TARGETS") && L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_WATER_TEMPLE_MQ_SIDE_TOWER_2F:{ name:"Water Temple MQ Side Tower 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_LONGSHOT_CHEST", () => (L.CanUse("RG_HOOKSHOT") && ((L.WaterLevel(WL_MID) && L.HasItem("RG_OPEN_CHEST")) || L.CanOpenUnderwaterChest()))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_SIDE_TOWER_1F", () => (L.WaterLevel(WL_LOW) || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_WATER_TEMPLE_MQ_LOW_EMBLEM", () => ((L.WaterLevel(WL_HIGH) && L.HasItem("RG_BRONZE_SCALE")) || (L.Get("LOGIC_WATER_MQ_SIDE_TOWER_TARGETS") && L.WaterLevel(WL_LOW_OR_MID) && L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_SONG_OF_TIME")))]
    ] },
    RR_WATER_TEMPLE_MQ_LOW_EMBLEM:{ name:"Water Temple MQ Low Emblem", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_COULD_LOW", () => true],
      ["LOGIC_WATER_LOW", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_3_STALFOS_ROOM", () => (L.WaterLevel(WL_HIGH) && L.HasFireSource())],
      ["RR_WATER_TEMPLE_MQ_SIDE_TOWER_2F", () => (L.WaterLevel(WL_LOW) && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_DINS_FIRE") || L.CanUse("RG_STICKS")))]
    ] },
    RR_WATER_TEMPLE_MQ_3_STALFOS_ROOM:{ name:"Water Temple MQ 3 Stalfos Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_MAP_CHEST", () => (L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_LOW_EMBLEM", () => (L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 4))]
    ] },
    RR_WATER_TEMPLE_MQ_TOWER_TARGET_ROOM:{ name:"Water Temple MQ Tower Target Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_MQ_SIDE_TOWER_TARGETS", () => (L.CanKillEnemy("RE_LIZALFOS") && L.CanKillEnemy("RE_SPIKE"))]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_COMPASS_CHEST", () => (L.Get("LOGIC_WATER_MQ_SIDE_TOWER_TARGETS") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_SIDE_TOWER_1F", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_PILLAR_1F:{ name:"Water Temple MQ Central Pillar 1F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_MQ_B1_SWITCH", () => (L.trick("RT_WATER_MQ_CENTRAL_PILLAR") && L.CanUse("RG_FIRE_ARROWS"))]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => true],
      ["RR_WATER_TEMPLE_MQ_PILLAR_H", () => (L.WaterLevel(WL_HIGH) && L.trick("RT_WATER_FW_CENTRAL_GS") && L.CanUse("RG_FARORES_WIND") && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_MQ_PILLAR_2F", () => (L.CanUse("RG_HOOKSHOT") || (L.WaterLevel(WL_MID) && L.trick("RT_WATER_FW_CENTRAL_GS") && L.CanUse("RG_FARORES_WIND") && L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_MQ_PILLAR_B1", () => (L.Get("LOGIC_WATER_MQ_B1_OPENED_PILLAR") && L.WaterLevel(WL_HIGH_OR_MID) && L.trick("RT_WATER_FW_CENTRAL_GS") && L.CanUse("RG_FARORES_WIND") && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_ZORA_TUNIC"))]
    ] },
    RR_WATER_TEMPLE_MQ_PILLAR_2F:{ name:"Water Temple MQ Central Pillar 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_COULD_MIDDLE", () => true],
      ["LOGIC_WATER_MIDDLE", () => (L.CanUse("RG_ZELDAS_LULLABY"))],
      ["LOGIC_WATER_MQ_B1_OPENED_PILLAR", () => (L.trick("RT_WATER_MQ_CENTRAL_PILLAR") && L.CanUse("RG_FIRE_ARROWS"))],
      ["LOGIC_WATER_MQ_PILLAR_SOT_BLOCK", () => (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_SONG_OF_TIME"))]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_UPPER_CRATE_1", () => (L.CanBreakCrates() && L.CanUse("RG_LONGSHOT"))],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_UPPER_CRATE_2", () => (L.CanBreakCrates() && L.CanUse("RG_LONGSHOT"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_LM", () => true],
      ["RR_WATER_TEMPLE_MQ_PILLAR_H", () => (L.WaterLevel(WL_HIGH) && L.CanUse("RG_FARORES_WIND") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS")))],
      ["RR_WATER_TEMPLE_MQ_PILLAR_B1", () => (L.Get("LOGIC_WATER_MQ_B1_OPENED_PILLAR") && L.WaterLevel(WL_MID) && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_ZORA_TUNIC"))]
    ] },
    RR_WATER_TEMPLE_MQ_PILLAR_H:{ name:"Water Temple MQ Central Pillar High", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_MQ_B1_OPENED_PILLAR", () => (((L.Get("LOGIC_WATER_MQ_PILLAR_SOT_BLOCK") && L.CanUse("RG_DINS_FIRE")) || (L.trick("RT_WATER_MQ_CENTRAL_PILLAR") && L.CanUse("RG_FIRE_ARROWS"))) && (L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_LONGSHOT") && L.CanJumpslash())))]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_UPPER_CRATE_1", () => (L.CanBreakCrates() && L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_UPPER_CRATE_2", () => (L.CanBreakCrates() && L.HasItem("RG_BRONZE_SCALE"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_PILLAR_B1", () => (L.Get("LOGIC_WATER_MQ_B1_SWITCH") && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_ZORA_TUNIC"))]
    ] },
    RR_WATER_TEMPLE_MQ_PILLAR_B1:{ name:"Water Temple MQ Central Pillar B1", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_6", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_7", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_8", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_9", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_10", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_11", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_12", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_13", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_LOWER_CRATE_14", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.Get("LOGIC_WATER_MQ_B1_OPENED_PILLAR") && L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_WATER_TEMPLE_MQ_PILLAR_B1_FINAL", () => (((L.IsAdult && L.CanUse("RG_LONGSHOT")) || (L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_BRONZE_SCALE"))))]
    ] },
    RR_WATER_TEMPLE_MQ_PILLAR_B1_FINAL:{ name:"Water Temple MQ Central Pillar B1 Final", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_CENTRAL_PILLAR_CHEST", () => (L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[] },
    RR_WATER_TEMPLE_MQ_STORAGE_ROOM:{ name:"Water Temple MQ Storage Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_POT_3", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_CRATE_6", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_CRATE_7", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_SMALL_CRATE_3", () => (L.CanBreakSmallCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_A_SMALL_CRATE_4", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.WaterLevel(WL_LOW_OR_MID) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))]
    ] },
    RR_WATER_TEMPLE_MQ_OUTSIDE_HIDDEN_SWITCH_2F:{ name:"Water Temple MQ Outside Hidden Switch 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_LM", () => (L.WaterLevel(WL_MID) && (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_WATER_TEMPLE_MQ_HIDDEN_SWITCH_2F", () => (L.WaterLevel(WL_MID))]
    ] },
    RR_WATER_TEMPLE_MQ_HIDDEN_SWITCH_2F:{ name:"Water Temple MQ Hidden Switch 2F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_POT_3", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_LOWER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_LOWER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_LOWER_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_LOWER_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_LOWER_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_LOWER_CRATE_6", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_LOWER_SMALL_CRATE", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => true],
      ["RR_WATER_TEMPLE_MQ_HIDDEN_SWITCH_3F", () => (L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_HIDDEN_SWITCH_3F:{ name:"Water Temple MQ Hidden Switch 3F", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_GS_BEFORE_UPPER_WATER_SWITCH", () => ((L.CanBreakCrates() && L.HasItem("RG_POWER_BRACELET")) || ((L.CanBreakCrates() || L.trick("RT_VISIBLE_COLLISION")) && L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_UPPER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_UPPER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_GS_STORAGE_ROOM_UPPER_SMALL_CRATE", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_HIDDEN_SWITCH_2F", () => true],
      ["RR_WATER_TEMPLE_MQ_HIGH_EMBLEM", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_LIZALFOS_LOOP_A:{ name:"Water Temple MQ Lizalfos Loop Any Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_WEST_POT", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_SOUTH_POT", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_SE_POT", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_5", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_A", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_LIZALFOS_LOOP_LM:{ name:"Water Temple MQ Lizalfos Loop Low or Mid Water", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_WEST_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_SOUTH_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_SE_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_ROOM_CRATE_5", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_LIZALFOS_CAGE", () => (L.CanUse("RG_DINS_FIRE"))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_A", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_LM", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_LIZALFOS_CAGE:{ name:"Water Temple MQ Lizalfos Cage", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_GS_LIZALFOS_HALLWAY", () => (L.CanKillEnemy("RE_GOLD_SKULLTULA"))],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_CAGE_SOUTH_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_CAGE_NORTH_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_GATE_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_LIZALFOS_HALLWAY_GATE_CRATE_2", () => (L.CanBreakCrates())]
    ],
      exits:[] },
    RR_WATER_TEMPLE_MQ_OUTSIDE_WATERFALL:{ name:"Water Temple Outside Waterfall", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => true],
      ["RR_WATER_TEMPLE_MQ_OUTSIDE_HIDDEN_SWITCH_2F", () => (L.WaterLevel(WL_MID))],
      ["RR_WATER_TEMPLE_MQ_WATERFALL", () => (L.WaterLevel(WL_HIGH) && L.SmallKeys("SCENE_WATER_TEMPLE", 1))],
      ["RR_WATER_TEMPLE_MQ_3F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && (L.IsAdult || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_HOOKSHOT") || L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_MQ_2F_CENTRAL_H", () => (L.WaterLevel(WL_HIGH) && L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_WATER_TEMPLE_MQ_WATERFALL:{ name:"Water Temple Waterfall", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_OUTSIDE_WATERFALL", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 1))],
      ["RR_WATER_TEMPLE_MQ_WATERFALL_TOP", () => (L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_WATERFALL_TOP:{ name:"Water Temple Waterfall Top", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_WATERFALL", () => (L.CanUse("RG_LONGSHOT") && L.CanHitSwitch("ED_FAR"))],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_STALFOS_PIT:{ name:"Water Temple MQ Stalfos Pit", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_WATERFALL_TOP", () => (L.Get("LOGIC_WATER_MQ_STALFOS_PIT"))],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_LOWER", () => true],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_POTS", () => ((L.Get("LOGIC_WATER_MQ_STALFOS_PIT") && L.IsAdult && L.CanUse("RG_HOOKSHOT")) || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_UPPER", () => (L.Get("LOGIC_WATER_MQ_STALFOS_PIT") && L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_STALFOS_PIT_LOWER:{ name:"Water Temple MQ Stalfos Pit Lower", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_MQ_STALFOS_PIT", () => (((L.IsAdult && L.CanKillEnemy("RE_STALFOS", "ED_CLOSE", true, 3, false, true)) || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.CanKillEnemy("RE_STALFOS", "ED_BOMB_THROW", true, 3, false, true))))]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT", () => (L.CanUse("RG_HOOKSHOT") && (L.IsAdult || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)))],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_POTS", () => ((L.IsAdult && L.CanUse("RG_HOOKSHOT")) || (L.CanUse("RG_HOOKSHOT") && (L.IsAdult || L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8) && (L.CanUse("RG_HOVER_BOOTS") || L.Get("LOGIC_WATER_MQ_STALFOS_PIT"))))],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_UPPER", () => (L.Get("LOGIC_WATER_MQ_STALFOS_PIT") && (L.IsAdult || L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8) && L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_STALFOS_PIT_POTS:{ name:"Water Temple MQ Stalfos Pit Pots", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_STALFOS_PIT_SOUTH_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_STALFOS_PIT_MIDDLE_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_STALFOS_PIT_NORTH_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_DARK_LINK_PILAR_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT"))],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_LOWER", () => true],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_UPPER", () => (L.Get("LOGIC_WATER_MQ_STALFOS_PIT") && L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_STALFOS_PIT_UPPER:{ name:"Water Temple MQ Stalfos Pit Upper", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_BEFORE_DARK_LINK_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_BEFORE_DARK_LINK_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_DARK_LINK_LEFT_STORM_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_WATER_TEMPLE_MQ_DARK_LINK_RIGHT_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_LOWER", () => true],
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_POTS", () => true],
      ["RR_WATER_TEMPLE_MQ_DARK_LINK_ROOM", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_DARK_LINK_ROOM:{ name:"Water Temple MQ Dark Link Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_STALFOS_PIT_UPPER", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DARK_LINK")))))],
      ["RR_WATER_TEMPLE_MQ_GATED_PIT", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_DARK_LINK")))))]
    ] },
    RR_WATER_TEMPLE_MQ_GATED_PIT:{ name:"Water Temple MQ Gated Pit", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_AFTER_DARK_LINK_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_AFTER_DARK_LINK_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_DARK_LINK_ROOM", () => true],
      ["RR_WATER_TEMPLE_MQ_RIVER_SKULL", () => (L.CanUse("RG_HOOKSHOT") && (L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8) || L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_WATER_TEMPLE_MQ_RIVER_SKULL:{ name:"Water Temple MQ River Skull", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_GS_RIVER", () => (L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_RIVER_POTS", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_RIVER_POTS:{ name:"Water Temple MQ River Pots", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_RIVER_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_RIVER_POT_2", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_RIVER_SKULL", () => (L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8 && L.CanUse("RG_HOOKSHOT")))],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_TUNNEL", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_ALCOVE", () => (L.HasItem("RG_SILVER_SCALE") || (L.IsAdult && L.HasItem("RG_BRONZE_SCALE") && L.trick("RT_WATER_DRAGON_JUMP_DIVE")))],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_DOOR", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOVER_BOOTS") && L.CanJumpslash()))]
    ] },
    RR_WATER_TEMPLE_MQ_DRAGON_ROOM_TUNNEL:{ name:"Water Temple MQ Dragon Room Tunnel", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_SUBMERGED_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_SUBMERGED_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_SUBMERGED_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_SUBMERGED_CRATE_4", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_RIVER_POTS", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_ALCOVE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_DOOR", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_DRAGON_ROOM_ALCOVE:{ name:"Water Temple MQ Dragon Room Alcove", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_MQ_DRAGON_TORCHES", () => (L.HasFireSource())]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_TORCHES_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_TORCHES_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_TORCHES_SMALL_CRATE_1", () => (L.CanBreakSmallCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_TORCHES_SMALL_CRATE_2", () => (L.CanBreakSmallCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_TORCHES_SMALL_CRATE_3", () => (L.CanBreakSmallCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_TUNNEL", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_DOOR", () => (L.HasItem("RG_SILVER_SCALE"))]
    ] },
    RR_WATER_TEMPLE_MQ_DRAGON_ROOM_DOOR:{ name:"Water Temple MQ Dragon Room Door", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_DOOR_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DRAGON_ROOM_DOOR_CRATE_2", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_RIVER_POTS", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_TUNNEL", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanUse("RG_HOOKSHOT"))],
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_ALCOVE", () => (L.HasItem("RG_SILVER_SCALE"))],
      ["RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_SWITCH", () => (L.Get("LOGIC_WATER_MQ_DRAGON_TORCHES"))]
    ] },
    RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_SWITCH:{ name:"Water Temple MQ Boss Key Room Switch", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_BOSS_KEY_POT", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_BK_ROOM_UPPER_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_DRAGON_ROOM_DOOR", () => true],
      ["RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_PIT", () => true],
      ["RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_CHEST", () => (L.CanHitSwitch() && L.AnyAgeTime((() => (L.CanUse("RG_DINS_FIRE")))) && L.HasItem("RG_OPEN_CHEST"))]
    ] },
    RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_PIT:{ name:"Water Temple MQ Boss Key Room Pit", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_BK_ROOM_LOWER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_BK_ROOM_LOWER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_BK_ROOM_LOWER_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_BK_ROOM_LOWER_CRATE_4", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_SWITCH", () => (L.CanHitSwitch("ED_BOOMERANG"))]
    ] },
    RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_CHEST:{ name:"Water Temple MQ Boss Key Room Chest", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_BOSS_KEY_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_SWITCH", () => (L.CanHitSwitch("ED_BOMB_THROW") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_PIT", () => true],
      ["RR_WATER_TEMPLE_MQ_B1_GATE_SWITCH", () => (L.HasItem("RG_SILVER_SCALE") || (L.CanUse("RG_IRON_BOOTS") && (L.HasItem("RG_BRONZE_SCALE") || (L.WaterTimer() >= 24 && L.CanUse("RG_LONGSHOT")))))]
    ] },
    RR_WATER_TEMPLE_MQ_B1_GATE_SWITCH:{ name:"Water Temple MQ B1 Gate Switch", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[
      ["LOGIC_WATER_MQ_B1_SWITCH", () => (L.CanUse("RG_IRON_BOOTS"))]
    ],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.Get("LOGIC_WATER_MQ_B1_SWITCH") && (L.WaterLevel(WL_LOW) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)))],
      ["RR_WATER_TEMPLE_MQ_BOSS_KEY_ROOM_CHEST", () => (L.CanUse("RG_IRON_BOOTS") && L.HasItem("RG_BRONZE_SCALE") && (L.WaterLevel(WL_LOW) || L.WaterTimer() >= 24))]
    ] },
    RR_WATER_TEMPLE_MQ_TRIANGLE_TORCH_ROOM:{ name:"Water Temple MQ Triangle Torch Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_1", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates()) || (L.CanUse("RG_BOMBCHU_5") && L.CanUse("RG_BOOMERANG")))],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_2", () => ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates()) || (L.CanUse("RG_BOMBCHU_5") && L.CanUse("RG_BOOMERANG")))],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_3", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_4", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_5", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_6", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.Get("LOGIC_WATER_MQ_B1_SWITCH") && ((L.WaterLevel(WL_LOW) && L.HasItem("RG_GOLDEN_SCALE")) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 40 && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT")))))],
      ["RR_WATER_TEMPLE_MQ_TRIANGLE_TORCH_TOP_STEP", () => (L.IsAdult || L.CanGroundJump() || L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_WATER_TEMPLE_MQ_TRIANGLE_TORCH_TOP_STEP:{ name:"Water Temple MQ Triangle Torch Top Step", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_3", () => ((L.CanUse("RG_BOMBCHU_5") && L.CanUse("RG_BOOMERANG")))],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_4", () => ((L.CanUse("RG_BOMBCHU_5") && L.CanUse("RG_BOOMERANG")))],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_5", () => ((L.CanUse("RG_BOMBCHU_5") && L.CanUse("RG_BOOMERANG")))],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_SUBMERGED_CRATE_6", () => ((L.CanUse("RG_BOMBCHU_5") && L.CanUse("RG_BOOMERANG")))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_TRIANGLE_TORCH_ROOM", () => true],
      ["RR_WATER_TEMPLE_MQ_TRIANGLE_TORCH_CAGE", () => (L.CanUse("RG_FIRE_ARROWS") && ((L.IsAdult && L.CanUse("RG_HOVER_BOOTS")) || L.CanMiddairGroundJump() || (L.CanUse("RG_LONGSHOT") && L.AnyAgeTime((() => (L.ScarecrowsSong()))))))]
    ] },
    RR_WATER_TEMPLE_MQ_TRIANGLE_TORCH_CAGE:{ name:"Water Temple MQ Triangle Torch Cage", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_GS_TRIPLE_WALL_TORCH", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_WATER_TEMPLE_MQ_LOWEST_GS_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LOWEST_GS_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LOWEST_GS_POT_3", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_LOWEST_GS_POT_4", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_GATE_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_GATE_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_TRIPLE_TORCH_ROOM_GATE_CRATE_2", () => (L.CanBreakCrates())]
    ],
      exits:[] },
    RR_WATER_TEMPLE_MQ_SPIKE_MOAT:{ name:"Water Temple MQ Spike Moat", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_MAIN", () => (L.Get("LOGIC_WATER_MQ_B1_SWITCH") && ((L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 24 && L.CanUse("RG_HOOKSHOT")) || L.HasItem("RG_BRONZE_SCALE")))],
      ["RR_WATER_TEMPLE_MQ_BEHIND_SPIKE_MOAT", () => ((L.CanUse("RG_LONGSHOT") || (L.trick("RT_WATER_BK_REGION") && L.CanUse("RG_HOVER_BOOTS"))))]
    ] },
    RR_WATER_TEMPLE_MQ_BEHIND_SPIKE_MOAT:{ name:"Water Temple MQ Behind Spike Moat", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_SPIKE_MOAT", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOOKSHOT") && L.CanUse("RG_IRON_BOOTS")))],
      ["RR_WATER_TEMPLE_MQ_CRATE_VORTEX_ROOM", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_CRATE_VORTEX_ROOM:{ name:"Water Temple MQ Crate Vortex Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_FRONT_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_FRONT_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_SUBMERGED_CRATE_1", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_SUBMERGED_CRATE_2", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_SUBMERGED_CRATE_3", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_SUBMERGED_CRATE_4", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_SUBMERGED_CRATE_5", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_SUBMERGED_CRATE_6", () => (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16 && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_BEHIND_SPIKE_MOAT", () => true],
      ["RR_WATER_TEMPLE_MQ_SCARECROW_CANAL", () => (((L.IsAdult && (L.CanUse("RG_HOVER_BOOTS") || L.trick("RT_WATER_NORTH_BASEMENT_LEDGE_JUMP"))) || (L.AnyAgeTime((() => (L.ScarecrowsSong()))) && L.CanUse("RG_HOOKSHOT"))) && (L.IsAdult || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)))],
      ["RR_WATER_TEMPLE_MQ_CRATE_VORTEX_CAGE", () => (L.trick("RT_WATER_INVISIBLE_HOOKSHOT_TARGET") && L.CanUse(L.IsAdult ? "RG_HOOKSHOT" : "RG_LONGSHOT") && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8)]
    ] },
    RR_WATER_TEMPLE_MQ_SCARECROW_CANAL:{ name:"Water Temple MQ Scarecrow Canal", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_CRATE_VORTEX_ROOM", () => (L.HasItem("RG_BRONZE_SCALE") || (L.IsAdult && (L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS"))) || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8 && L.CanUse("RG_HOOKSHOT")))],
      ["RR_WATER_TEMPLE_MQ_CANAL_ALCOVE", () => (L.IsAdult)],
      ["RR_WATER_TEMPLE_MQ_BEHIND_CANAL", () => (L.CanUse("RG_IRON_BOOTS") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOOKSHOT")) && L.WaterTimer() >= 8)]
    ] },
    RR_WATER_TEMPLE_MQ_CANAL_ALCOVE:{ name:"Water Temple MQ Canal Alcove", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_3_JETS_ROOM", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 2))],
      ["RR_WATER_TEMPLE_MQ_SCARECROW_CANAL", () => (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 8))],
      ["RR_WATER_TEMPLE_MQ_BEHIND_CANAL", () => (L.IsAdult && L.trick("RT_UNINTUITIVE_JUMPS") && L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_WATER_TEMPLE_MQ_BEHIND_CANAL:{ name:"Water Temple MQ Behind Canal", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_SCARECROW_CANAL", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.WaterTimer() >= 8)],
      ["RR_WATER_TEMPLE_MQ_FREESTANDING_ROOM", () => true]
    ] },
    RR_WATER_TEMPLE_MQ_FREESTANDING_ROOM:{ name:"Water Temple MQ Freestanding Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_FREESTANDING_KEY", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_B_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_B_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_B_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_B_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_B_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_B_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_STORAGE_ROOM_B_CRATE_5", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_BEHIND_CANAL", () => (L.AnyAgeTime((() => (L.CanKillEnemy("RE_STALFOS")))))]
    ] },
    RR_WATER_TEMPLE_MQ_3_JETS_ROOM:{ name:"Water Temple MQ 3 Jets Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_MQ_CANAL_ALCOVE", () => (L.SmallKeys("SCENE_WATER_TEMPLE", 2) && L.CanHitSwitch("ED_BOOMERANG"))],
      ["RR_WATER_TEMPLE_MQ_DODONGO_ROOM", () => (L.CanHitSwitch() && L.HasFireSource())]
    ] },
    RR_WATER_TEMPLE_MQ_DODONGO_ROOM:{ name:"Water Temple MQ Dodongo Room", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_MINI_DODONGO_POT_1", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_MINI_DODONGO_POT_2", () => (L.CanBreakPots())],
      ["RC_WATER_TEMPLE_MQ_DODONGO_ROOM_UPPER_CRATE", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DODONGO_ROOM_HALL_CRATE", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DODONGO_ROOM_LOWER_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DODONGO_ROOM_LOWER_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_DODONGO_ROOM_LOWER_CRATE_3", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_3_JETS_ROOM", () => ((L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")) && L.AnyAgeTime((() => (L.CanKillEnemy("RE_DODONGO", "ED_CLOSE", true, 5)))))],
      ["RR_WATER_TEMPLE_MQ_CRATE_VORTEX_CAGE", () => ((L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_HOVER_BOOTS")) && L.AnyAgeTime((() => (L.CanKillEnemy("RE_DODONGO", "ED_CLOSE", true, 5)))))]
    ] },
    RR_WATER_TEMPLE_MQ_CRATE_VORTEX_CAGE:{ name:"Water Temple MQ Crate Vortex Cage", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[
      ["RC_WATER_TEMPLE_MQ_GS_FREESTANDING_KEY_AREA", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA") && (L.CanBreakCrates() || L.trick("RT_VISIBLE_COLLISION")))],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_BEHIND_GATE_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_BEHIND_GATE_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_BEHIND_GATE_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_WATER_TEMPLE_MQ_WHIRLPOOL_BEHIND_GATE_CRATE_4", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WATER_TEMPLE_MQ_DODONGO_ROOM", () => true],
      ["RR_WATER_TEMPLE_MQ_CRATE_VORTEX_ROOM", () => (L.CanUse("RG_LONGSHOT") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS")))]
    ] },
    RR_WATER_TEMPLE_BOSS_ENTRYWAY:{ name:"Water Temple Boss Entryway", scene:"SCENE_WATER_TEMPLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_WATER_TEMPLE_TRAPPED_SLOPE", () => (!L.mq("WATER_TEMPLE") && false)],
      ["RR_WATER_TEMPLE_MQ_BOSS_DOOR", () => (L.mq("WATER_TEMPLE") && false)],
      ["RR_WATER_TEMPLE_BOSS_ROOM", () => (L.HasItem("RG_WATER_TEMPLE_BOSS_KEY"))]
    ] },
    RR_WATER_TEMPLE_BOSS_ROOM:{ name:"Water Temple Boss Room", scene:"SCENE_WATER_TEMPLE_BOSS", time:false,
      events:[
      ["LOGIC_WATER_TEMPLE_CLEAR", () => (L.CanKillEnemy("RE_MORPHA"))]
    ],
      checks:[
      ["RC_WATER_TEMPLE_MORPHA_HEART", () => (L.Get("LOGIC_WATER_TEMPLE_CLEAR"))],
      ["RC_MORPHA", () => (L.Get("LOGIC_WATER_TEMPLE_CLEAR"))]
    ],
      exits:[
      ["RR_WATER_TEMPLE_BOSS_ENTRYWAY", () => false],
      ["RR_LAKE_HYLIA", () => (L.Get("LOGIC_WATER_TEMPLE_CLEAR"))]
    ] },
    RR_CASTLE_GROUNDS:{ name:"Castle Grounds", scene:"SCENE_OUTSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_THE_MARKET", () => true],
      ["RR_HC_GATE", () => (L.IsChild)],
      ["RR_GANONS_CASTLE_GROUNDS", () => (L.IsAdult)]
    ] },
    RR_CASTLE_GROUNDS_FROM_GREAT_FAIRY:{ name:"Castle Grounds From Great Fairy", scene:"SCENE_OUTSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_HC_PAST_GATE", () => (L.IsChild)],
      ["RR_GANONS_CASTLE_GROUNDS", () => (L.IsAdult)]
    ] },
    RR_HC_GATE:{ name:"Hyrule Castle Gate", scene:"SCENE_HYRULE_CASTLE", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy() || L.CanUse("RG_STICKS"))],
      ["LOGIC_BUG_ACCESS", () => (L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_HC_MALON_EGG", () => (L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_HC_GS_TREE", () => (L.CanBonkTrees() && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_CLOSE"))],
      ["RC_HC_SKULLTULA_TREE", () => (L.CanBonkTrees())]
    ],
      exits:[
      ["RR_CASTLE_GROUNDS", () => true],
      ["RR_HC_ABOVE_VINE", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_HC_PAST_GATE", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN"))]
    ] },
    RR_HC_ABOVE_VINE:{ name:"Hyrule Castle Above Vine", scene:"SCENE_HYRULE_CASTLE", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy())]
    ],
      checks:[
      ["RC_HC_MALON_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_HC_MALON_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_HC_MALON_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_HC_GATE", () => true],
      ["RR_HC_PAST_GATE", () => true]
    ] },
    RR_HC_PAST_GATE:{ name:"Hyrule Castle Past Gate", scene:"SCENE_HYRULE_CASTLE", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanUse("RG_STICKS"))]
    ],
      checks:[
      ["RC_HC_NEAR_GUARDS_TREE_1", () => (L.CanBonkTrees())],
      ["RC_HC_NEAR_GUARDS_TREE_2", () => (L.CanBonkTrees())],
      ["RC_HC_NEAR_GUARDS_TREE_3", () => (L.CanBonkTrees())],
      ["RC_HC_NEAR_GUARDS_TREE_4", () => (L.CanBonkTrees())],
      ["RC_HC_NEAR_GUARDS_TREE_5", () => (L.CanBonkTrees())],
      ["RC_HC_NEAR_GUARDS_TREE_6", () => (L.CanBonkTrees())],
      ["RC_HC_NL_TREE_1", () => false],
      ["RC_HC_NL_TREE_2", () => false]
    ],
      exits:[
      ["RR_HC_GATE", () => true],
      ["RR_HC_ABOVE_VINE", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_HC_ABOVE_CLIMBABLE_ROCKS", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_HC_GREAT_FAIRY_FOUNTAIN", () => (L.BlastOrSmash() && L.CanUse("RG_CRAWL"))]
    ] },
    RR_HC_ABOVE_CLIMBABLE_ROCKS:{ name:"Hyrule Castle Above Climbable Rocks", scene:"SCENE_HYRULE_CASTLE", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy())]
    ],
      checks:[
      ["RC_HC_ROCK_WALL_GOSSIP_STONE", () => true],
      ["RC_HC_ROCK_WALL_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_HC_ROCK_WALL_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_HC_PAST_GATE", () => true],
      ["RR_HC_MOAT", () => true]
    ] },
    RR_HC_MOAT:{ name:"Hyrule Castle Grounds", scene:"SCENE_HYRULE_CASTLE", time:true,
      events:[],
      checks:[
      ["RC_HC_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HC_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HC_GROTTO_TREE", () => (L.CanBonkTrees())]
    ],
      exits:[
      ["RR_HC_GATE", () => true],
      ["RR_HC_STORMS_GROTTO", () => (L.CanOpenStormsGrotto())],
      ["RR_HC_DRAIN_LEDGE", () => ((L.CanUse("RG_WEIRD_EGG") && L.HasItem("RG_POWER_BRACELET") && L.HasItem("RG_SPEAK_HYLIAN")) || (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.TakeDamage() && L.HasExplosives() && L.CanJumpslash()))]
    ] },
    RR_HC_DRAIN_LEDGE:{ name:"Hyrule Castle Drain Ledge", scene:"SCENE_HYRULE_CASTLE", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_HC_MOAT", () => true],
      ["RR_HC_GARDEN", () => (L.CanUse("RG_CRAWL"))]
    ] },
    RR_HC_GARDEN:{ name:"HC Garden", scene:"SCENE_CASTLE_COURTYARD_ZELDA", time:false,
      events:[],
      checks:[
      ["RC_HC_ZELDAS_LETTER", () => (L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_SONG_FROM_IMPA", () => (L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      exits:[
      ["RR_HC_DRAIN_LEDGE", () => true]
    ] },
    RR_HC_GREAT_FAIRY_FOUNTAIN:{ name:"HC Great Fairy Fountain", scene:"SCENE_GREAT_FAIRYS_FOUNTAIN_SPELLS", time:false,
      events:[],
      checks:[
      ["RC_HC_GREAT_FAIRY_REWARD", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      exits:[
      ["RR_CASTLE_GROUNDS_FROM_GREAT_FAIRY", () => true]
    ] },
    RR_HC_STORMS_GROTTO:{ name:"HC Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_HC_GS_STORMS_GROTTO", () => (L.CanUse("RG_BOOMERANG") && L.trick("RT_HC_STORMS_GS"))]
    ],
      exits:[
      ["RR_CASTLE_GROUNDS_FROM_GROTTO", () => true],
      ["RR_HC_STORMS_GROTTO_BEHIND_WALLS", () => (L.CanBreakMudWalls())]
    ] },
    RR_HC_STORMS_GROTTO_BEHIND_WALLS:{ name:"HC Storms Grotto Behind Walls", scene:"SCENE_GROTTOS", time:false,
      events:[
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy())],
      ["LOGIC_BUG_ACCESS", () => true]
    ],
      checks:[
      ["RC_HC_GS_STORMS_GROTTO", () => (L.HookshotOrBoomerang())],
      ["RC_HC_STORMS_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_HC_STORMS_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_HC_STORMS_GROTTO_GOSSIP_STONE", () => true],
      ["RC_HC_STORMS_GROTTO_POT_1", () => (L.CanBreakPots())],
      ["RC_HC_STORMS_GROTTO_POT_2", () => (L.CanBreakPots())],
      ["RC_HC_STORMS_GROTTO_POT_3", () => (L.CanBreakPots())],
      ["RC_HC_STORMS_GROTTO_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_HC_STORMS_GROTTO", () => true]
    ] },
    RR_CASTLE_GROUNDS_FROM_GROTTO:{ name:"Castle Grounds From Grotto", scene:"SCENE_OUTSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_HC_MOAT", () => (L.IsChild)],
      ["RR_GANONS_CASTLE_GROUNDS", () => (L.IsAdult)]
    ] },
    RR_GANONS_CASTLE_GROUNDS:{ name:"Ganon's Castle Grounds", scene:"SCENE_OUTSIDE_GANONS_CASTLE", time:false,
      events:[
      ["LOGIC_BUILD_RAINBOW_BRIDGE", () => (L.CanBuildRainbowBridge())]
    ],
      checks:[
      ["RC_OGC_GS", () => (L.CanJumpslashExceptHammer() || L.CanUseProjectile() || (L.CanShield() && L.CanUse("RG_MEGATON_HAMMER")) || L.CanUse("RG_DINS_FIRE"))]
    ],
      exits:[
      ["RR_CASTLE_GROUNDS", () => (L.AtNight)],
      ["RR_OGC_GREAT_FAIRY_FOUNTAIN", () => (L.CanUse("RG_GOLDEN_GAUNTLETS") && L.AtNight)],
      ["RR_GANONS_CASTLE_LEDGE", () => (L.Get("LOGIC_BUILD_RAINBOW_BRIDGE"))]
    ] },
    RR_OGC_GREAT_FAIRY_FOUNTAIN:{ name:"OGC Great Fairy Fountain", scene:"SCENE_GREAT_FAIRYS_FOUNTAIN_MAGIC", time:false,
      events:[],
      checks:[
      ["RC_OGC_GREAT_FAIRY_REWARD", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      exits:[
      ["RR_CASTLE_GROUNDS_FROM_GREAT_FAIRY", () => true]
    ] },
    RR_CASTLE_GROUNDS_FROM_GANONS_CASTLE:{ name:"Castle Grounds From Ganon's Castle", scene:"SCENE_OUTSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_HC_DRAIN_LEDGE", () => (L.IsChild)],
      ["RR_GANONS_CASTLE_LEDGE", () => (L.IsAdult)]
    ] },
    RR_GANONS_CASTLE_LEDGE:{ name:"Ganon's Castle Ledge", scene:"SCENE_OUTSIDE_GANONS_CASTLE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GANONS_CASTLE_GROUNDS", () => (L.Get("LOGIC_BUILD_RAINBOW_BRIDGE"))],
      ["RR_GANONS_CASTLE_ENTRYWAY", () => (L.IsAdult)]
    ] },
    RR_DMC_UPPER_ENTRY:{ name:"DMC Upper Entry", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_WALL_FREESTANDING_POH", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3))],
      ["RC_DMC_VOLCANO_FREESTANDING_POH", () => (((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS")) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.DMCPotsToPad() && L.DMCUpperToPots() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))]
    ],
      exits:[
      ["RR_DMC_CRATE", () => true],
      ["RR_DMC_ROCK_GROTTO", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RR_DMC_CRACKED_WALL", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3))],
      ["RR_DMC_SCRUB", () => (L.FireTimer() >= 16 || L.Hearts() >= 3)],
      ["RR_DMC_BLOCKED_EXIT", () => (((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.DMCUpperToPots()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_POTS", () => (((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCUpperToPots()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_POT_GROTTO_EXIT", () => (((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCUpperToPots()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_CENTRAL", () => (((L.FireTimer() >= 64 || L.Hearts() >= 12) && L.DMCUpperToPots() && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_FAR_PLATFORM", () => ((L.IsAdult && (L.FireTimer() >= 72 || L.Hearts() >= 14) && L.DMCUpperToPots() && L.DMCPotsToPad() && L.ReachDistantScarecrow()) || (L.FireTimer() >= 24 || L.Hearts() >= 5) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS"))],
      ["RR_DMC_TEMPLE_EXIT", () => (((L.FireTimer() >= 72 || L.Hearts() >= 14) && L.DMCUpperToPots() && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))]
    ] },
    RR_DMC_ROCKS_GROTTO_ENTRY:{ name:"DMC Rocks Grotto Entry", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_WALL_FREESTANDING_POH", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RC_DMC_VOLCANO_FREESTANDING_POH", () => (((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS")) || (L.IsAdult && (L.FireTimer() >= 64 || L.Hearts() >= 12) && L.DMCPotsToPad() && L.DMCUpperToPots() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))]
    ],
      exits:[
      ["RR_DMC_CRATE", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RR_DMC_ROCK_GROTTO", () => true],
      ["RR_DMC_CRACKED_WALL", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3))],
      ["RR_DMC_SCRUB", () => (L.FireTimer() >= 16 || L.Hearts() >= 3)],
      ["RR_DMC_BLOCKED_EXIT", () => (((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCUpperToPots()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_POTS", () => (((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCUpperToPots()) || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_POT_GROTTO_EXIT", () => (((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCUpperToPots()) || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_CENTRAL", () => (((L.FireTimer() >= 64 || L.Hearts() >= 12) && L.DMCUpperToPots() && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 3) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_DMC_FAR_PLATFORM", () => ((L.IsAdult && (L.FireTimer() >= 72 || L.Hearts() >= 14) && L.DMCUpperToPots() && L.DMCPotsToPad() && L.ReachDistantScarecrow()) || (L.FireTimer() >= 16 || L.Hearts() >= 3) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS"))],
      ["RR_DMC_TEMPLE_EXIT", () => (((L.FireTimer() >= 64 || L.Hearts() >= 12) && L.DMCUpperToPots() && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 3) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS")))]
    ] },
    RR_DMC_BLOCKED_ENTRY:{ name:"DMC Blocked Entry", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_WALL_FREESTANDING_POH", () => (((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.CanClimbLadder()) || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RC_DMC_VOLCANO_FREESTANDING_POH", () => (((L.FireTimer() >= 16 || L.Hearts() >= 3) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS")) || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))]
    ],
      exits:[
      ["RR_DMC_CRATE", () => (((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.CanClimbLadder()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_ROCK_GROTTO", () => (((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.CanClimbLadder()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_CRACKED_WALL", () => ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_SCRUB", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RR_DMC_BLOCKED_EXIT", () => true],
      ["RR_DMC_POTS", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RR_DMC_POT_GROTTO_EXIT", () => (L.FireTimer() >= 16 || L.Hearts() >= 3)],
      ["RR_DMC_CENTRAL", () => (((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.ReachDistantScarecrow() && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.CanClimbLadder()))],
      ["RR_DMC_FAR_PLATFORM", () => ((L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.ReachDistantScarecrow()) || ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.CanClimbLadder()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_DMC_TEMPLE_EXIT", () => (((L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.ReachDistantScarecrow() && L.CanClimbLadder()))]
    ] },
    RR_DMC_POTS_ENTRY:{ name:"DMC Pots Entry", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_WALL_FREESTANDING_POH", () => ((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RC_DMC_VOLCANO_FREESTANDING_POH", () => (((L.FireTimer() >= 8 || L.Hearts() >= 2) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS")) || (L.IsAdult && (L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))]
    ],
      exits:[
      ["RR_DMC_CRATE", () => ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_ROCK_GROTTO", () => ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_CRACKED_WALL", () => ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_SCRUB", () => (L.FireTimer() >= 16 || L.Hearts() >= 3)],
      ["RR_DMC_BLOCKED_EXIT", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RR_DMC_POTS", () => true],
      ["RR_DMC_POT_GROTTO_EXIT", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RR_DMC_CENTRAL", () => (((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.ReachDistantScarecrow() && L.CanClimbLadder()))],
      ["RR_DMC_FAR_PLATFORM", () => ((L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.ReachDistantScarecrow()) || ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.CanClimbLadder()))],
      ["RR_DMC_TEMPLE_EXIT", () => (((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.ReachDistantScarecrow() && L.CanClimbLadder()))]
    ] },
    RR_DMC_POT_GROTTO_ENTRY:{ name:"DMC Pot Grotto Entry", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_WALL_FREESTANDING_POH", () => ((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RC_DMC_VOLCANO_FREESTANDING_POH", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && (L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))]
    ],
      exits:[
      ["RR_DMC_CRATE", () => ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_ROCK_GROTTO", () => ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_CRACKED_WALL", () => ((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.CanClimbLadder() || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPotsToPad() && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")) || ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")))],
      ["RR_DMC_SCRUB", () => (L.FireTimer() >= 24 || L.Hearts() >= 5)],
      ["RR_DMC_BLOCKED_EXIT", () => (L.FireTimer() >= 16 || L.Hearts() >= 3)],
      ["RR_DMC_POTS", () => (L.FireTimer() >= 8 || L.Hearts() >= 2)],
      ["RR_DMC_POT_GROTTO_EXIT", () => true],
      ["RR_DMC_CENTRAL", () => (((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.ReachDistantScarecrow() && L.CanClimbLadder()))],
      ["RR_DMC_FAR_PLATFORM", () => ((L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad() && L.ReachDistantScarecrow()) || ((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.CanClimbLadder()))],
      ["RR_DMC_TEMPLE_EXIT", () => (((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.DMCPotsToPad()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.ReachDistantScarecrow() && L.CanClimbLadder()))]
    ] },
    RR_DMC_PAD_ENTRY:{ name:"DMC Pad Entry", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_WALL_FREESTANDING_POH", () => (((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.CanClimbLadder() && L.DMCPadToPots()) || ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 16 || L.Hearts() >= 3) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RC_DMC_VOLCANO_FREESTANDING_POH", () => ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.DMCPadToPots() || (L.IsAdult && (L.FireTimer() >= 8 || L.Hearts() >= 2) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))]
    ],
      exits:[
      ["RR_DMC_CRATE", () => (((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.CanClimbLadder() && L.DMCPadToPots()) || ((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 24 || L.Hearts() >= 5) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RR_DMC_ROCK_GROTTO", () => (((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.CanClimbLadder() && L.DMCPadToPots()) || ((L.FireTimer() >= 32 || L.Hearts() >= 6) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 16 || L.Hearts() >= 3) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RR_DMC_CRACKED_WALL", () => ((L.FireTimer() >= 48 || L.Hearts() >= 9) && L.CanClimbLadder() && L.DMCPadToPots() || ((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 24 || L.Hearts() >= 5) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RR_DMC_SCRUB", () => ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.DMCPadToPots() || (L.IsAdult && (L.FireTimer() >= 16 || L.Hearts() >= 3) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RR_DMC_BLOCKED_EXIT", () => ((L.FireTimer() >= 24 || L.Hearts() >= 5) && L.DMCPadToPots() || (L.IsAdult && (L.FireTimer() >= 16 || L.Hearts() >= 3) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RR_DMC_POTS", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3) && L.DMCPadToPots() || (L.IsAdult && (L.FireTimer() >= 16 || L.Hearts() >= 3) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RR_DMC_POT_GROTTO_EXIT", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3) && L.DMCPadToPots() || ((L.IsAdult && L.FireTimer() >= 24 || L.Hearts() >= 5) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL")))],
      ["RR_DMC_CENTRAL", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3))],
      ["RR_DMC_FAR_PLATFORM", () => (((L.FireTimer() >= 56 || L.Hearts() >= 11) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.CanClimbLadder() && L.DMCPadToPots()) || ((L.FireTimer() >= 40 || L.Hearts() >= 8) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 24 || L.Hearts() >= 5) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))|| (L.IsAdult && (L.FireTimer() >= 16 || L.Hearts() >= 3) && L.ReachDistantScarecrow()))],
      ["RR_DMC_TEMPLE_EXIT", () => ((L.FireTimer() >= 16 || L.Hearts() >= 3))]
    ] },
    RR_DMC_TEMPLE_ENTRY:{ name:"DMC Temple Entry", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_WALL_FREESTANDING_POH", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 72 || L.Hearts() >= 14) && L.DMCPadToPots()) || ((L.FireTimer() >= 64 || L.Hearts() >= 12) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RC_DMC_VOLCANO_FREESTANDING_POH", () => (L.HasItem("RG_CLIMB") && ((L.FireTimer() >= 56 || L.Hearts() >= 11) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.DMCPadToPots() || (L.IsAdult && (L.FireTimer() >= 40 || L.Hearts() >= 8) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))]
    ],
      exits:[
      ["RR_DMC_CRATE", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 72 || L.Hearts() >= 14) && L.DMCPadToPots()) || ((L.FireTimer() >= 72 || L.Hearts() >= 14) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RR_DMC_ROCK_GROTTO", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 72 || L.Hearts() >= 14) && L.DMCPadToPots()) || ((L.FireTimer() >= 64 || L.Hearts() >= 12) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RR_DMC_CRACKED_WALL", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 80 || L.Hearts() >= 15) && L.DMCPadToPots()) || ((L.FireTimer() >= 72 || L.Hearts() >= 14) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RR_DMC_SCRUB", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 56 || L.Hearts() >= 11) && L.DMCPadToPots()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RR_DMC_BLOCKED_EXIT", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 56 || L.Hearts() >= 11) && L.DMCPadToPots()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RR_DMC_POTS", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPadToPots()) || (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RR_DMC_POT_GROTTO_EXIT", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 48 || L.Hearts() >= 9) && L.DMCPadToPots()) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))))],
      ["RR_DMC_CENTRAL", () => (L.HasItem("RG_CLIMB") && (L.FireTimer() >= 48 || L.Hearts() >= 9))],
      ["RR_DMC_FAR_PLATFORM", () => (L.HasItem("RG_CLIMB") && (((L.FireTimer() >= 88 || L.Hearts() >= 3) && L.TakeDamage() && L.trick("RT_UNINTUITIVE_JUMPS") && L.CanClimbLadder() && L.DMCPadToPots()) || ((L.FireTimer() >= 72 || L.Hearts() >= 14) && L.trick("RT_DMC_HOVER_BEAN_POH") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_LONGSHOT")) || (L.IsAdult && (L.FireTimer() >= 56 || L.Hearts() >= 11) && L.CanPlantBean("RR_DMC_CENTRAL", "RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL"))|| (L.IsAdult && (L.FireTimer() >= 48 || L.Hearts() >= 9) && L.ReachDistantScarecrow())))],
      ["RR_DMC_TEMPLE_EXIT", () => true]
    ] },
    RR_DMC_CRATE:{ name:"DMC Crate", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_GS_CRATE", () => (L.IsChild && L.CanKillEnemy("RE_GOLD_SKULLTULA") && L.CanBreakCrates())],
      ["RC_DMC_CRATE", () => (L.IsChild && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DEATH_MOUNTAIN_SUMMIT", () => true]
    ] },
    RR_DMC_ROCK_GROTTO:{ name:"DMC Rock Grotto", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DMC_UPPER_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_DMC_CRACKED_WALL:{ name:"DMC Cracked Wall", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.HasExplosives() && L.CallGossipFairyExceptSuns())]
    ],
      checks:[
      ["RC_DMC_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns() && L.HasExplosives())],
      ["RC_DMC_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS") && L.HasExplosives())],
      ["RC_DMC_GOSSIP_STONE", () => (true && L.HasExplosives())]
    ],
      exits:[] },
    RR_DMC_SCRUB:{ name:"DMC Scrub", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[
      ["LOGIC_DMC_BOULDER", () => (L.IsAdult && L.CanUse("RG_MEGATON_HAMMER") && L.trick("RT_DMC_BOULDER_JS"))]
    ],
      checks:[
      ["RC_DMC_DEKU_SCRUB", () => (L.IsChild && L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[] },
    RR_DMC_BLOCKED_EXIT:{ name:"DMC Blocked Exit", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[
      ["LOGIC_DMC_BOULDER", () => (L.IsAdult && L.CanUse("RG_MEGATON_HAMMER"))]
    ],
      checks:[],
      exits:[
      ["RR_DMC_GREAT_FAIRY_FOUNTAIN", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ] },
    RR_DMC_POTS:{ name:"DMC Pots", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_NEAR_GC_POT_1", () => (L.CanBreakPots())],
      ["RC_DMC_NEAR_GC_POT_2", () => (L.CanBreakPots())],
      ["RC_DMC_NEAR_GC_POT_3", () => (L.CanBreakPots())],
      ["RC_DMC_NEAR_GC_POT_4", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GC_DARUNIAS_CHAMBER", () => true]
    ] },
    RR_DMC_POT_GROTTO_EXIT:{ name:"DMC Pot Grotto Exit", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DMC_SCRUB_GROTTO", () => (L.CanUse("RG_MEGATON_HAMMER"))]
    ] },
    RR_DMC_CENTRAL:{ name:"DMC Central", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      checks:[
      ["RC_SHEIK_IN_CRATER", () => (L.IsAdult)],
      ["RC_DMC_GS_BEAN_PATCH", () => (L.CanSpawnSoilSkull("RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL") && L.CanKillEnemy("RE_GOLD_SKULLTULA"))],
      ["RC_DMC_NEAR_PLATFORM_RED_RUPEE", () => (L.IsChild)],
      ["RC_DMC_MIDDLE_PLATFORM_RED_RUPEE", () => (L.IsChild)],
      ["RC_DMC_MIDDLE_PLATFORM_BLUE_RUPEE_1", () => (L.IsChild)],
      ["RC_DMC_MIDDLE_PLATFORM_BLUE_RUPEE_2", () => (L.IsChild)],
      ["RC_DMC_MIDDLE_PLATFORM_BLUE_RUPEE_3", () => (L.IsChild)],
      ["RC_DMC_MIDDLE_PLATFORM_BLUE_RUPEE_4", () => (L.IsChild)],
      ["RC_DMC_MIDDLE_PLATFORM_BLUE_RUPEE_5", () => (L.IsChild)],
      ["RC_DMC_MIDDLE_PLATFORM_BLUE_RUPEE_6", () => (L.IsChild)],
      ["RC_DMC_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_DMC_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_DMC_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_CRATER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[] },
    RR_DMC_FAR_PLATFORM:{ name:"DMC Far Platform", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[
      ["RC_DMC_DISTANT_PLATFORM_GREEN_RUPEE_1", () => (L.IsAdult)],
      ["RC_DMC_DISTANT_PLATFORM_GREEN_RUPEE_2", () => (L.IsAdult)],
      ["RC_DMC_DISTANT_PLATFORM_GREEN_RUPEE_3", () => (L.IsAdult)],
      ["RC_DMC_DISTANT_PLATFORM_GREEN_RUPEE_4", () => (L.IsAdult)],
      ["RC_DMC_DISTANT_PLATFORM_GREEN_RUPEE_5", () => (L.IsAdult)],
      ["RC_DMC_DISTANT_PLATFORM_GREEN_RUPEE_6", () => (L.IsAdult)],
      ["RC_DMC_DISTANT_PLATFORM_RED_RUPEE", () => (L.IsAdult)]
    ],
      exits:[] },
    RR_DMC_TEMPLE_EXIT:{ name:"DMC Temple Exit", scene:"SCENE_DEATH_MOUNTAIN_CRATER", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_FIRE_TEMPLE_ENTRYWAY", () => true]
    ] },
    RR_DMC_GREAT_FAIRY_FOUNTAIN:{ name:"DMC Great Fairy Fountain", scene:"SCENE_GREAT_FAIRYS_FOUNTAIN_MAGIC", time:false,
      events:[],
      checks:[
      ["RC_DMC_GREAT_FAIRY_REWARD", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      exits:[
      ["RR_DMC_BLOCKED_ENTRY", () => true]
    ] },
    RR_DMC_UPPER_GROTTO:{ name:"DMC Upper Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_DMC_UPPER_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DMC_UPPER_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_DMC_UPPER_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_DMC_UPPER_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_DMC_UPPER_GROTTO_GOSSIP_STONE", () => true],
      ["RC_DMC_UPPER_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_DMC_UPPER_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_DMC_UPPER_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DMC_UPPER_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DMC_UPPER_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DMC_UPPER_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DMC_ROCKS_GROTTO_ENTRY", () => true]
    ] },
    RR_DMC_SCRUB_GROTTO:{ name:"DMC Scrub Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_DMC_DEKU_SCRUB_GROTTO_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DMC_DEKU_SCRUB_GROTTO_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DMC_DEKU_SCRUB_GROTTO_CENTER", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_DMC_HAMMER_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_DMC_POT_GROTTO_ENTRY", () => true]
    ] },
    RR_DEATH_MOUNTAIN_TRAIL:{ name:"Death Mountain Trail", scene:"SCENE_DEATH_MOUNTAIN_TRAIL", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS") && (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET")))]
    ],
      checks:[
      ["RC_DMT_CHEST", () => ((L.BlastOrSmash() || (L.trick("RT_DMT_BOMBABLE") && L.IsChild && L.HasItem("RG_GORONS_BRACELET"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DMT_FREESTANDING_POH", () => (L.TakeDamage() || L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && L.CanPlantBean("RR_DEATH_MOUNTAIN_TRAIL", "RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL") && (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET"))))],
      ["RC_DMT_GS_BEAN_PATCH", () => (L.CanSpawnSoilSkull("RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL") && (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET") || (L.trick("RT_DMT_SOIL_GS") && (L.TakeDamage() || L.CanUse("RG_HOVER_BOOTS")) && L.CanUse("RG_BOOMERANG"))))],
      ["RC_DMT_GS_NEAR_KAK", () => (L.BlastOrSmash() && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_BOOMERANG")))],
      ["RC_DMT_GS_ABOVE_DODONGOS_CAVERN", () => (L.IsAdult && L.CanGetNightTimeGS() && ((L.CanUse("RG_MEGATON_HAMMER") || (L.trick("RT_ITEM_EXTENSION") && L.CanUse("RG_HOOKSHOT")) || (L.trick("RT_DISTANT_BOULDER_COLLISION") && L.CanUse("RG_LONGSHOT")) || (L.trick("RT_DMT_JS_LOWER_GS") && L.CanJumpslash())) || ((L.trick("RT_DMT_BEAN_LOWER_GS") && L.CanPlantBean("RR_DEATH_MOUNTAIN_TRAIL", "RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL")) || (L.trick("RT_DMT_HOVERS_LOWER_GS") && L.CanUse("RG_HOVER_BOOTS")) && (L.HasExplosives() || L.CanUse("RG_DINS_FIRE") || ((L.trick("RT_DISTANT_BOULDER_COLLISION") || L.trick("RT_ITEM_EXTENSION")) && (L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT"))) || L.CanJumpslash()))))],
      ["RC_DMT_BLUE_RUPEE", () => (L.IsChild && L.BlastOrSmash())],
      ["RC_DMT_RED_RUPEE", () => (L.IsChild && L.BlastOrSmash())],
      ["RC_DMT_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS") && (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_DMT_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS") && (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_DMT_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS") && (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_DMT_FLAG_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_KAK_BEHIND_GATE", () => true],
      ["RR_GORON_CITY", () => true],
      ["RR_DEATH_MOUNTAIN_ROCKFALL", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))) || (L.IsAdult && ((L.CanPlantBean("RR_DEATH_MOUNTAIN_TRAIL", "RG_DEATH_MOUNTAIN_TRAIL_BEAN_SOUL") && L.HasItem("RG_GORONS_BRACELET")) || (L.CanUse("RG_HOVER_BOOTS") && L.trick("RT_DMT_CLIMB_HOVERS")))))],
      ["RR_DODONGOS_CAVERN_ENTRYWAY", () => (L.HasExplosives() || L.HasItem("RG_GORONS_BRACELET") || L.IsAdult)],
      ["RR_DMT_STORMS_GROTTO", () => (L.CanOpenStormsGrotto())]
    ] },
    RR_DEATH_MOUNTAIN_ROCKFALL:{ name:"Death Mountain Rockfall", scene:"SCENE_DEATH_MOUNTAIN_TRAIL", time:true,
      events:[],
      checks:[
      ["RC_DMT_GS_FALLING_ROCKS_PATH", () => (L.IsAdult && L.CanGetNightTimeGS() && (L.CanUse("RG_MEGATON_HAMMER") || (L.trick("RT_DISTANT_BOULDER_COLLISION") && L.CanUse("RG_LONGSHOT")) || (L.trick("RT_ITEM_EXTENSION") && L.CanUse("RG_HOOKSHOT")) || (L.trick("RT_DMT_UPPER_GS") && (L.CanJumpslash() || L.CanUse("RG_DINS_FIRE") || L.HasExplosives() || (L.trick("RT_ITEM_EXTENSION") && L.CanUse("RG_FAIRY_SLINGSHOT")) || (L.trick("RT_DISTANT_BOULDER_COLLISION") && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_LONGSHOT"))))))]
    ],
      exits:[
      ["RR_DEATH_MOUNTAIN_TRAIL", () => true],
      ["RR_DEATH_MOUNTAIN_SUMMIT", () => (L.HasItem("RG_CLIMB") && (L.IsAdult || L.trick("RT_DMT_SHIELDLESS_CLIMB") || L.HasItem("RG_HYLIAN_SHIELD") || L.CanUse("RG_NAYRUS_LOVE")))],
      ["RR_DMT_COW_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_DEATH_MOUNTAIN_SUMMIT:{ name:"Death Mountain Summit", scene:"SCENE_DEATH_MOUNTAIN_TRAIL", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy())],
      ["LOGIC_BUG_ACCESS", () => (L.IsChild && L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_DMT_TRADE_BROKEN_SWORD", () => (L.IsAdult && L.CanUse("RG_BROKEN_SWORD"))],
      ["RC_DMT_TRADE_EYEDROPS", () => (L.IsAdult && L.CanUse("RG_EYEDROPS"))],
      ["RC_DMT_TRADE_CLAIM_CHECK", () => (L.IsAdult && L.CanUse("RG_CLAIM_CHECK"))],
      ["RC_DMT_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_DMT_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_DMT_GOSSIP_STONE", () => true],
      ["RC_BIGGORON_HINT", () => (L.IsAdult && L.HasItem("RG_SPEAK_GORON"))]
    ],
      exits:[
      ["RR_DEATH_MOUNTAIN_ROCKFALL", () => true],
      ["RR_DMC_UPPER_ENTRY", () => true],
      ["RR_DMT_OWL_FLIGHT", () => (L.IsChild && (L.HasItem("RG_SPEAK_DEKU") || L.HasItem("RG_SPEAK_GERUDO") || L.HasItem("RG_SPEAK_GORON") || L.HasItem("RG_SPEAK_HYLIAN") || L.HasItem("RG_SPEAK_ZORA")))],
      ["RR_DMT_GREAT_FAIRY_FOUNTAIN", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_DMT_OWL_FLIGHT:{ name:"DMT Owl Flight", scene:"SCENE_DEATH_MOUNTAIN_TRAIL", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_KAK_IMPAS_ROOFTOP", () => true]
    ] },
    RR_DMT_COW_GROTTO:{ name:"DMT Cow Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_DMT_COW_GROTTO_COW", () => (L.CanUse("RG_EPONAS_SONG"))],
      ["RC_DMT_COW_GROTTO_BEEHIVE", () => (L.CanBreakLowerBeehives())],
      ["RC_DMT_COW_GROTTO_LEFT_HEART", () => true],
      ["RC_DMT_COW_GROTTO_MIDDLE_LEFT_HEART", () => true],
      ["RC_DMT_COW_GROTTO_MIDDLE_RIGHT_HEART", () => true],
      ["RC_DMT_COW_GROTTO_RIGHT_HEART", () => true],
      ["RC_DMT_COW_GROTTO_RUPEE_1", () => true],
      ["RC_DMT_COW_GROTTO_RUPEE_2", () => true],
      ["RC_DMT_COW_GROTTO_RUPEE_3", () => true],
      ["RC_DMT_COW_GROTTO_RUPEE_4", () => true],
      ["RC_DMT_COW_GROTTO_RUPEE_5", () => true],
      ["RC_DMT_COW_GROTTO_RUPEE_6", () => true],
      ["RC_DMT_COW_GROTTO_RED_RUPEE", () => true],
      ["RC_DMT_COW_GROTTO_STORMS_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_DMT_COW_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DMT_COW_GROTTO_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEATH_MOUNTAIN_ROCKFALL", () => true]
    ] },
    RR_DMT_STORMS_GROTTO:{ name:"DMT Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_DMT_STORMS_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_DMT_STORMS_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_DMT_STORMS_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_DMT_STORMS_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_DMT_STORMS_GROTTO_GOSSIP_STONE", () => true],
      ["RC_DMT_STORMS_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_DMT_STORMS_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_DMT_STORMS_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_DMT_STORMS_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_DMT_STORMS_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_DMT_STORMS_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_DEATH_MOUNTAIN_TRAIL", () => true]
    ] },
    RR_DMT_GREAT_FAIRY_FOUNTAIN:{ name:"DMT Great Fairy Fountain", scene:"SCENE_GREAT_FAIRYS_FOUNTAIN_MAGIC", time:false,
      events:[],
      checks:[
      ["RC_DMT_GREAT_FAIRY_REWARD", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      exits:[
      ["RR_DEATH_MOUNTAIN_SUMMIT", () => true]
    ] },
    RR_DESERT_COLOSSUS:{ name:"Desert Colossus", scene:"SCENE_DESERT_COLOSSUS", time:true,
      events:[
      ["LOGIC_BUG_ACCESS", () => (L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_COLOSSUS_FREESTANDING_POH", () => (L.IsAdult && L.CanPlantBean("RR_DESERT_COLOSSUS", "RG_DESERT_COLOSSUS_BEAN_SOUL"))],
      ["RC_COLOSSUS_GS_BEAN_PATCH", () => (L.CanSpawnSoilSkull("RG_DESERT_COLOSSUS_BEAN_SOUL") && L.CanAttack())],
      ["RC_COLOSSUS_GS_TREE", () => (L.IsAdult && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())],
      ["RC_COLOSSUS_GS_HILL", () => (L.IsAdult && ((L.CanPlantBean("RR_DESERT_COLOSSUS", "RG_DESERT_COLOSSUS_BEAN_SOUL") && L.CanAttack()) || L.CanUse("RG_LONGSHOT") || (L.trick("RT_COLOSSUS_GS") && L.CanUse("RG_HOOKSHOT"))) && L.CanGetNightTimeGS())],
      ["RC_COLOSSUS_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DESERT_COLOSSUS_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_COLOSSUS_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DESERT_COLOSSUS_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_COLOSSUS_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_DESERT_COLOSSUS_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_COLOSSUS_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_COLOSSUS_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_COLOSSUS_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS_OASIS", () => (L.CanUse("RG_SONG_OF_STORMS") && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.HasBottle()))],
      ["RR_COLOSSUS_GREAT_FAIRY_FOUNTAIN", () => (L.HasExplosives())],
      ["RR_SPIRIT_TEMPLE_ENTRYWAY", () => true],
      ["RR_WASTELAND_NEAR_COLOSSUS", () => true],
      ["RR_COLOSSUS_GROTTO", () => (L.CanUse("RG_SILVER_GAUNTLETS"))]
    ] },
    RR_DESERT_COLOSSUS_OASIS:{ name:"Desert Colossus Oasis", scene:"SCENE_DESERT_COLOSSUS", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_COLOSSUS_OASIS_FAIRY_1", () => true],
      ["RC_COLOSSUS_OASIS_FAIRY_2", () => true],
      ["RC_COLOSSUS_OASIS_FAIRY_3", () => true],
      ["RC_COLOSSUS_OASIS_FAIRY_4", () => true],
      ["RC_COLOSSUS_OASIS_FAIRY_5", () => true],
      ["RC_COLOSSUS_OASIS_FAIRY_6", () => true],
      ["RC_COLOSSUS_OASIS_FAIRY_7", () => true],
      ["RC_COLOSSUS_OASIS_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS", () => true]
    ] },
    RR_DESERT_COLOSSUS_OUTSIDE_TEMPLE:{ name:"Desert Colossus From Spirit Entryway", scene:"SCENE_DESERT_COLOSSUS", time:true,
      events:[],
      checks:[
      ["RC_SHEIK_AT_COLOSSUS", () => true]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS", () => true]
    ] },
    RR_COLOSSUS_GREAT_FAIRY_FOUNTAIN:{ name:"Colossus Great Fairy Fountain", scene:"SCENE_GREAT_FAIRYS_FOUNTAIN_SPELLS", time:false,
      events:[],
      checks:[
      ["RC_COLOSSUS_GREAT_FAIRY_REWARD", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS", () => true]
    ] },
    RR_COLOSSUS_GROTTO:{ name:"Colossus Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_COLOSSUS_DEKU_SCRUB_GROTTO_REAR", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_COLOSSUS_DEKU_SCRUB_GROTTO_FRONT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_COLOSSUS_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS", () => true]
    ] },
    RR_GF_OUTSKIRTS:{ name:"Gerudo Fortress Outskirts", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_OUTSKIRTS_NE_CRATE", () => ((L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD")) && L.CanBreakCrates())],
      ["RC_GF_OUTSKIRTS_NW_CRATE", () => ((L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD")) && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GV_FORTRESS_SIDE", () => true],
      ["RR_TH_1_TORCH_CELL", () => true],
      ["RR_GF_OUTSIDE_GATE", () => (L.Get("LOGIC_GF_GATE_OPEN"))],
      ["RR_GF_NEAR_GROTTO", () => (L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_GF_OUTSIDE_GTG", () => (L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_GF_TOWER", () => ((L.IsChild || L.HasItem("RG_GERUDO_MEMBERSHIP_CARD")) && L.CanClimbHighLadder())],
      ["RR_GF_JAIL_WINDOW", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_GF_NEAR_GROTTO:{ name:"GF Near Grotto", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_SOUTHMOST_CENTER_CRATE", () => (L.CanBreakCrates())],
      ["RC_GF_MID_SOUTH_CENTER_CRATE", () => (L.CanBreakCrates())],
      ["RC_GF_MID_NORTH_CENTER_CRATE", () => (L.CanBreakCrates())],
      ["RC_GF_NORTHMOST_CENTER_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_TH_1_TORCH_CELL", () => true],
      ["RR_TH_STEEP_SLOPE_CELL", () => true],
      ["RR_TH_KITCHEN_CORRIDOR", () => true],
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_JAIL_WINDOW", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_GF_OUTSIDE_GTG", () => (L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_GF_TOP_OF_UPPER_VINES", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_GF_STORMS_GROTTO", () => (L.IsAdult && L.CanOpenStormsGrotto())]
    ] },
    RR_GF_OUTSIDE_GTG:{ name:"GF Outside GTG", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[
      ["LOGIC_GTG_GATE_OPEN", () => (L.IsAdult && L.HasItem("RG_GERUDO_MEMBERSHIP_CARD") && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_GERUDO"))]
    ],
      checks:[],
      exits:[
      ["RR_GF_TO_GTG", () => (L.Get("LOGIC_GTG_GATE_OPEN") && (L.IsAdult || L.opt("RSK_SHUFFLE_DUNGEON_ENTRANCES")))],
      ["RR_GF_JAIL_WINDOW", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_NEAR_GROTTO", () => (L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_GF_ABOVE_GTG", () => (L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_GF_TOP_OF_UPPER_VINES", () => (L.HasItem("RG_GERUDO_MEMBERSHIP_CARD") && L.CanUse("RG_LONGSHOT"))],
      ["RR_GF_HBA_RANGE", () => (L.IsChild || L.HasItem("RG_GERUDO_MEMBERSHIP_CARD"))]
    ] },
    RR_GF_TO_GTG:{ name:"GF to GTG", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GERUDO_TRAINING_GROUND_ENTRYWAY", () => true]
    ] },
    RR_GF_EXITING_GTG:{ name:"GF Exiting GTG", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GF_OUTSIDE_GTG", () => (L.IsChild || L.HasItem("RG_GERUDO_MEMBERSHIP_CARD"))],
      ["RR_GF_JAIL_WINDOW", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_GF_OUTSKIRTS", () => true]
    ] },
    RR_GF_ABOVE_GTG:{ name:"GF Above GTG", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_TH_DOUBLE_CELL", () => true],
      ["RR_TH_KITCHEN_CORRIDOR", () => true],
      ["RR_GF_JAIL_WINDOW", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_NEAR_GROTTO", () => true],
      ["RR_GF_OUTSIDE_GTG", () => (L.IsChild || L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_GF_BOTTOM_OF_LOWER_VINES", () => (L.trick("RT_UNINTUITIVE_JUMPS").Get() != 0)]
    ] },
    RR_GF_BOTTOM_OF_LOWER_VINES:{ name:"GF Bottom of Lower Vines", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_TH_STEEP_SLOPE_CELL", () => true],
      ["RR_GF_NEAR_GROTTO", () => true],
      ["RR_GF_TOP_OF_LOWER_VINES", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_GF_ABOVE_GTG", () => true],
      ["RR_GF_BELOW_GS", () => (L.IsAdult && L.CanGroundJump())]
    ] },
    RR_GF_TOP_OF_LOWER_VINES:{ name:"GF Top of Lower Vines", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_TH_KITCHEN_BY_CORRIDOR", () => true],
      ["RR_TH_DOUBLE_CELL", () => true],
      ["RR_GF_ABOVE_GTG", () => true],
      ["RR_GF_BOTTOM_OF_LOWER_VINES", () => true],
      ["RR_GF_BOTTOM_OF_UPPER_VINES", () => (L.IsAdult && L.trick("RT_UNINTUITIVE_JUMPS").Get())]
    ] },
    RR_GF_NEAR_GS:{ name:"GF Near GS", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_GS_TOP_FLOOR", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOMB_THROW") && L.CanGetNightTimeGS())]
    ],
      exits:[
      ["RR_TH_KITCHEN_OPPOSITE_CORRIDOR", () => true],
      ["RR_GF_BOTTOM_OF_LOWER_VINES", () => true],
      ["RR_GF_TOP_OF_LOWER_VINES", () => true],
      ["RR_GF_SLOPED_ROOF", () => (L.IsAdult || L.CanGroundJump())],
      ["RR_GF_LONG_ROOF", () => (L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GF_NEAR_CHEST", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_GF_BELOW_GS", () => true]
    ] },
    RR_GF_SLOPED_ROOF:{ name:"GF Sloped Roof", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GF_TOP_OF_LOWER_VINES", () => true],
      ["RR_GF_NEAR_GS", () => true],
      ["RR_GF_BOTTOM_OF_UPPER_VINES", () => true],
      ["RR_GF_TOP_OF_UPPER_VINES", () => (L.IsAdult && L.trick("RT_UNINTUITIVE_JUMPS").Get())]
    ] },
    RR_GF_BOTTOM_OF_UPPER_VINES:{ name:"GF Bottom of Upper Vines", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GF_OUTSIDE_GTG", () => true],
      ["RR_GF_TOP_OF_LOWER_VINES", () => true],
      ["RR_GF_SLOPED_ROOF", () => (L.IsAdult && (L.CanUse("RG_HOVER_BOOTS") || L.trick("RT_UNINTUITIVE_JUMPS")))],
      ["RR_GF_TOP_OF_UPPER_VINES", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT"))],
      ["RR_GF_TO_GTG", () => (L.IsAdult && L.trick("RT_GF_LEDGE_CLIP_INTO_GTG").Get())]
    ] },
    RR_GF_TOP_OF_UPPER_VINES:{ name:"GF Top of Upper Vines", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_GS_TOP_FLOOR", () => (L.IsAdult && L.CanGetNightTimeGS() && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH") && (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || L.CanUse("RG_BOOMERANG") || L.trick("RT_UNINTUITIVE_JUMPS")))]
    ],
      exits:[
      ["RR_GF_TOP_OF_LOWER_VINES", () => true],
      ["RR_GF_SLOPED_ROOF", () => true],
      ["RR_GF_BOTTOM_OF_UPPER_VINES", () => true],
      ["RR_GF_NEAR_CHEST", () => (L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && L.ReachScarecrow()) || L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_GF_NEAR_CHEST:{ name:"GF Near Chest", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GF_GS_TOP_FLOOR", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") && L.CanGetNightTimeGS())]
    ],
      exits:[
      ["RR_GF_NEAR_GS", () => true],
      ["RR_GF_LONG_ROOF", () => true]
    ] },
    RR_GF_LONG_ROOF:{ name:"GF Long Roof", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GF_BOTTOM_OF_LOWER_VINES", () => true],
      ["RR_GF_NEAR_GS", () => ((L.IsAdult && L.trick("RT_UNINTUITIVE_JUMPS")) || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GF_BELOW_GS", () => true],
      ["RR_GF_NEAR_CHEST", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_GF_BELOW_CHEST", () => true]
    ] },
    RR_GF_BELOW_GS:{ name:"GF Below GS", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_GS_TOP_FLOOR", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT") && L.CanGetNightTimeGS())]
    ],
      exits:[
      ["RR_TH_DEAD_END_CELL", () => true],
      ["RR_GF_BOTTOM_OF_LOWER_VINES", () => true]
    ] },
    RR_GF_BELOW_CHEST:{ name:"GF Below Chest", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_TH_BREAK_ROOM", () => true],
      ["RR_GF_OUTSKIRTS", () => true]
    ] },
    RR_GF_TOWER:{ name:"Gerudo Fortress Tower", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[
      ["LOGIC_GF_GATE_OPEN", () => (L.IsAdult && L.HasItem("RG_SPEAK_GERUDO"))]
    ],
      checks:[],
      exits:[
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_OUTSIDE_GATE", () => ((L.IsAdult && L.CanGroundJump()) || L.trick("RT_GF_WASTELAND_GATE_SIDEHOP_SKIP"))]
    ] },
    RR_GF_ABOVE_JAIL:{ name:"GF Above Jail", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_ABOVE_JAIL_CRATE", () => true]
    ],
      exits:[
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_NEAR_CHEST", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_GF_BELOW_CHEST", () => (L.TakeDamage())],
      ["RR_GF_JAIL_WINDOW", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_TH_BREAK_ROOM_CORRIDOR", () => true],
      ["RR_GF_TOWER", () => (L.trick("RT_GF_ADULT_SKIP_WASTELAND_GATE") && L.IsAdult && L.CanUse("RG_HOVER_BOOTS") && L.CanJumpslash() && L.HasItem("RG_GERUDO_MEMBERSHIP_CARD"))],
      ["RR_GF_OUTSIDE_GATE", () => (L.trick("RT_GF_ADULT_SKIP_WASTELAND_GATE") && L.IsAdult && L.CanUse("RG_HOVER_BOOTS") && L.CanJumpslash())]
    ] },
    RR_GF_JAIL_WINDOW:{ name:"GF Jail Window", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GF_LONG_ROOF", () => (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER"))],
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_BELOW_CHEST", () => true],
      ["RR_GF_ABOVE_JAIL", () => (L.trick("RT_HOOKSHOT_CLIP") && L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_GF_HBA_RANGE:{ name:"GF HBA Range", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[],
      checks:[
      ["RC_GF_HBA_1000_POINTS", () => (L.IsAdult && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_GERUDO") && L.HasItem("RG_GERUDO_MEMBERSHIP_CARD") && L.SummonEpona() && L.CanUse("RG_FAIRY_BOW") && L.AtDay)],
      ["RC_GF_HBA_1500_POINTS", () => (L.IsAdult && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_GERUDO") && L.HasItem("RG_GERUDO_MEMBERSHIP_CARD") && L.SummonEpona() && L.CanUse("RG_FAIRY_BOW") && L.AtDay)],
      ["RC_GF_HBA_RANGE_GS", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") && L.CanGetNightTimeGS())],
      ["RC_GF_HBA_RANGE_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_RANGE_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_RANGE_CRATE_3", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_RANGE_CRATE_4", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_RANGE_CRATE_5", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_RANGE_CRATE_6", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_RANGE_CRATE_7", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_CANOPY_EAST_CRATE", () => (L.CanBreakCrates())],
      ["RC_GF_HBA_CANOPY_WEST_CRATE", () => (L.CanBreakCrates())],
      ["RC_GF_NORTH_TARGET_EAST_CRATE", () => (L.CanBreakCrates())],
      ["RC_GF_NORTH_TARGET_WEST_CRATE", () => (L.IsAdult || (L.BlastOrSmash() || L.HookshotOrBoomerang() || L.CanUse("RG_HOVER_BOOTS")))],
      ["RC_GF_NORTH_TARGET_CHILD_CRATE", () => (L.IsChild && L.BlastOrSmash())],
      ["RC_GF_SOUTH_TARGET_EAST_CRATE", () => (L.CanBreakCrates())],
      ["RC_GF_SOUTH_TARGET_WEST_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GF_OUTSIDE_GTG", () => (L.IsChild || L.HasItem("RG_GERUDO_MEMBERSHIP_CARD"))]
    ] },
    RR_GF_OUTSIDE_GATE:{ name:"GF Outside Gate", scene:"SCENE_GERUDOS_FORTRESS", time:false,
      events:[
      ["LOGIC_GF_GATE_OPEN", () => (L.IsAdult && L.HasItem("RG_GERUDO_MEMBERSHIP_CARD") && L.HasItem("RG_SPEAK_GERUDO"))]
    ],
      checks:[],
      exits:[
      ["RR_GF_OUTSKIRTS", () => (L.Get("LOGIC_GF_GATE_OPEN"))],
      ["RR_WASTELAND_NEAR_FORTRESS", () => true]
    ] },
    RR_GF_STORMS_GROTTO:{ name:"GF Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_GF_FAIRY_GROTTO_FAIRY_1", () => true],
      ["RC_GF_FAIRY_GROTTO_FAIRY_2", () => true],
      ["RC_GF_FAIRY_GROTTO_FAIRY_3", () => true],
      ["RC_GF_FAIRY_GROTTO_FAIRY_4", () => true],
      ["RC_GF_FAIRY_GROTTO_FAIRY_5", () => true],
      ["RC_GF_FAIRY_GROTTO_FAIRY_6", () => true],
      ["RC_GF_FAIRY_GROTTO_FAIRY_7", () => true],
      ["RC_GF_FAIRY_GROTTO_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_GF_NEAR_GROTTO", () => true]
    ] },
    RR_GERUDO_VALLEY:{ name:"Gerudo Valley", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[
      ["LOGIC_BUG_ACCESS", () => (L.IsChild && L.HasItem("RG_POWER_BRACELET"))]
    ],
      checks:[
      ["RC_GV_GS_SMALL_BRIDGE", () => (L.IsChild && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true],
      ["RR_GV_UPPER_STREAM", () => ((L.IsChild && L.HasItem("RG_POWER_BRACELET")) || L.TakeDamage())],
      ["RR_GV_UPPER_STREAM_WATER", () => true],
      ["RR_GV_CRATE_LEDGE", () => ((L.IsChild && L.HasItem("RG_POWER_BRACELET")) || L.CanUse("RG_LONGSHOT"))],
      ["RR_GV_GROTTO_LEDGE", () => true],
      ["RR_GV_FORTRESS_SIDE", () => ((L.IsAdult && (L.SummonEpona() || L.CanUse("RG_LONGSHOT") || (L.opt("RSK_GERUDO_FORTRESS") === 2) || L.Get("LOGIC_TH_RESCUED_ALL_CARPENTERS"))) || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_MEGATON_HAMMER") && L.CanUse("RG_HOVER_BOOTS")) || ((L.IsChild || L.trick("RT_GV_HOOKSHOT_BRIDGE")) && L.CanUse("RG_HOOKSHOT")) || (L.IsChild && L.trick("RT_GV_CHILD_CUCCO_JUMP") && L.HasItem("RG_POWER_BRACELET") && L.CanJumpslash()))],
      ["RR_GV_WATERFALL_ALCOVE", () => (L.IsChild && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_GV_LOWER_STREAM", () => (L.IsChild && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_GV_UPPER_STREAM:{ name:"GV Upper Stream", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy() || (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_GERUDO_VALLEY_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS")))]
    ],
      checks:[
      ["RC_GV_GS_BEAN_PATCH", () => (L.CanSpawnSoilSkull("RG_GERUDO_VALLEY_BEAN_SOUL") && L.CanAttack())],
      ["RC_GV_COW", () => (L.IsChild && L.CanUse("RG_EPONAS_SONG"))],
      ["RC_GV_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_GERUDO_VALLEY_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GV_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_GERUDO_VALLEY_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GV_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_GERUDO_VALLEY_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GV_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_GV_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GV_GOSSIP_STONE", () => true],
      ["RC_GV_NEAR_COW_CRATE", () => (L.IsChild && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GV_UPPER_STREAM_WATER", () => true],
      ["RR_GV_WATERFALL_ALCOVE", () => ((L.CanUse("RG_LONGSHOT") && (L.CanUse("RG_CLIMB") || L.trick("RT_HOOKSHOT_LADDERS"))) || L.CanPlantBean("RR_GV_UPPER_STREAM", "RG_GERUDO_VALLEY_BEAN_SOUL"))]
    ] },
    RR_GV_UPPER_STREAM_WATER:{ name:"GV Upper Stream Water", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_GV_UPPER_STREAM", () => (L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_GV_LOWER_STREAM", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_GV_WATERFALL_ALCOVE", () => ((L.HasItem("RG_BRONZE_SCALE") || (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT"))) && L.HasItem("RG_CLIMB"))]
    ] },
    RR_GV_LOWER_STREAM:{ name:"GV Lower Stream", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_LAKE_HYLIA", () => true]
    ] },
    RR_GV_WATERFALL_ALCOVE:{ name:"GV Waterfall Alcove", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[],
      checks:[
      ["RC_GV_WATERFALL_FREESTANDING_POH", () => true]
    ],
      exits:[
      ["RR_GV_UPPER_STREAM", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GV_UPPER_STREAM_WATER", () => true]
    ] },
    RR_GV_GROTTO_LEDGE:{ name:"GV Grotto Ledge", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_GV_UPPER_STREAM", () => (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives() && L.TakeDamage())],
      ["RR_GV_LOWER_STREAM", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_GV_OCTOROK_GROTTO", () => (L.CanUse("RG_SILVER_GAUNTLETS"))],
      ["RR_GV_CRATE_LEDGE", () => (L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_GV_CRATE_LEDGE:{ name:"GV Crate Ledge", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[],
      checks:[
      ["RC_GV_CRATE_FREESTANDING_POH", () => (L.CanBreakCrates())],
      ["RC_GV_FREESTANDING_POH_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GV_UPPER_STREAM", () => (L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives() && L.TakeDamage())],
      ["RR_GV_LOWER_STREAM", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_GV_FORTRESS_SIDE:{ name:"GV Fortress Side", scene:"SCENE_GERUDO_VALLEY", time:true,
      events:[],
      checks:[
      ["RC_GV_CHEST", () => (L.IsAdult && (L.CanUse("RG_MEGATON_HAMMER") || (L.trick("RT_DISTANT_BOULDER_COLLISION") && L.CanUse("RG_LONGSHOT"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GV_TRADE_SAW", () => (L.IsAdult && L.CanUse("RG_POACHERS_SAW"))],
      ["RC_GV_GS_BEHIND_TENT", () => (L.IsAdult && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())],
      ["RC_GV_GS_PILLAR", () => (L.IsAdult && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())],
      ["RC_GV_CRATE_BRIDGE_1", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_GV_CRATE_BRIDGE_2", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_GV_CRATE_BRIDGE_3", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_GV_CRATE_BRIDGE_4", () => (L.IsChild && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GV_UPPER_STREAM", () => (L.TakeDamage())],
      ["RR_GV_UPPER_STREAM_WATER", () => true],
      ["RR_GERUDO_VALLEY", () => (L.IsChild || L.SummonEpona() || L.CanUse("RG_LONGSHOT") || (L.opt("RSK_GERUDO_FORTRESS") === 2) || L.Get("LOGIC_TH_RESCUED_ALL_CARPENTERS") || (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_MEGATON_HAMMER") && L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_GV_CARPENTER_TENT", () => (L.IsAdult || L.trick("RT_GV_CHILD_TENT"))],
      ["RR_GV_STORMS_GROTTO", () => (L.IsAdult && L.CanOpenStormsGrotto())],
      ["RR_GV_CRATE_LEDGE", () => ((L.trick("RT_DAMAGE_BOOST_SIMPLE") && L.HasExplosives()) || (L.trick("RT_GV_CRATE_HOVERS") && L.TakeDamage() && L.CanUse("RG_HOVER_BOOTS") && (L.CanUse("RG_MASTER_SWORD") || L.CanUse("RG_BIGGORON_SWORD"))))]
    ] },
    RR_GV_CARPENTER_TENT:{ name:"GV Carpenter Tent", scene:"SCENE_CARPENTERS_TENT", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GV_FORTRESS_SIDE", () => true]
    ] },
    RR_GV_OCTOROK_GROTTO:{ name:"GV Octorok Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_GV_OCTOROK_GROTTO_FRONT_LEFT_BLUE_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GV_OCTOROK_GROTTO_FRONT_RIGHT_BLUE_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GV_OCTOROK_GROTTO_BACK_BLUE_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GV_OCTOROK_GROTTO_FRONT_LEFT_GREEN_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GV_OCTOROK_GROTTO_FRONT_RIGHT_GREEN_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GV_OCTOROK_GROTTO_BACK_LEFT_GREEN_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GV_OCTOROK_GROTTO_BACK_RIGHT_GREEN_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))],
      ["RC_GV_OCTOROK_GROTTO_RED_RUPEE", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_GV_GROTTO_LEDGE", () => true]
    ] },
    RR_GV_STORMS_GROTTO:{ name:"GV Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_GV_DEKU_SCRUB_GROTTO_REAR", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GV_DEKU_SCRUB_GROTTO_FRONT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GV_DEKU_SCRUB_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_GV_FORTRESS_SIDE", () => true]
    ] },
    RR_GORON_CITY:{ name:"Goron City", scene:"SCENE_GORON_CITY", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())],
      ["LOGIC_STICK_ACCESS", () => (L.IsChild && L.CanBreakPots())],
      ["LOGIC_BUG_ACCESS", () => ((L.BlastOrSmash() && L.HasItem("RG_POWER_BRACELET")) || L.CanUse("RG_SILVER_GAUNTLETS"))],
      ["LOGIC_GORON_CITY_CHILD_FIRE", () => (L.IsChild && L.CanUse("RG_DINS_FIRE"))],
      ["LOGIC_GORON_CITY_WOODS_WARP_OPEN", () => (L.CanDetonateUprightBombFlower() || L.CanUse("RG_MEGATON_HAMMER") || L.Get("LOGIC_GORON_CITY_CHILD_FIRE"))],
      ["LOGIC_GORON_CITY_DARUNIAS_DOOR_OPEN_CHILD", () => (L.IsChild && L.CanUse("RG_ZELDAS_LULLABY"))],
      ["LOGIC_GORON_CITY_STOP_ROLLING_GORON_AS_ADULT", () => (L.IsAdult && L.HasItem("RG_SPEAK_GORON") && (L.HasItem("RG_GORONS_BRACELET") || L.HasExplosives() || L.CanUse("RG_FAIRY_BOW") || (L.trick("RT_GC_LINK_GORON_DINS") && (L.CanUse("RG_DINS_FIRE") || (L.trick("RT_BLUE_FIRE_MUD_WALLS") && L.CanUse("RG_BOTTLE_WITH_BLUE_FIRE"))))))]
    ],
      checks:[
      ["RC_GC_MAZE_LEFT_CHEST", () => ((L.CanUse("RG_MEGATON_HAMMER") || L.CanUse("RG_SILVER_GAUNTLETS") || (L.trick("RT_GC_LEFTMOST") && L.HasExplosives() && L.CanUse("RG_HOVER_BOOTS"))) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GC_MAZE_CENTER_CHEST", () => ((L.BlastOrSmash() || L.CanUse("RG_SILVER_GAUNTLETS")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GC_MAZE_RIGHT_CHEST", () => ((L.BlastOrSmash() || L.CanUse("RG_SILVER_GAUNTLETS")) && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GC_POT_FREESTANDING_POH", () => (L.IsChild && L.Get("LOGIC_GORON_CITY_CHILD_FIRE") && (L.CanUse("RG_BOMB_BAG") || (L.HasItem("RG_GORONS_BRACELET") && L.trick("RT_GC_POT_STRENGTH")) || (L.CanUse("RG_BOMBCHU_5") && L.trick("RT_GC_POT"))))],
      ["RC_GC_ROLLING_GORON_AS_CHILD", () => (L.IsChild && L.HasItem("RG_SPEAK_GORON") && (L.HasExplosives() || (L.HasItem("RG_GORONS_BRACELET") && L.trick("RT_GC_ROLLING_STRENGTH"))))],
      ["RC_GC_ROLLING_GORON_AS_ADULT", () => (L.Get("LOGIC_GORON_CITY_STOP_ROLLING_GORON_AS_ADULT"))],
      ["RC_GC_GS_BOULDER_MAZE", () => (L.IsChild && L.BlastOrSmash())],
      ["RC_GC_GS_CENTER_PLATFORM", () => (L.IsAdult && L.CanAttack())],
      ["RC_GC_MAZE_GOSSIP_STONE_FAIRY", () => ((L.BlastOrSmash() || L.CanUse("RG_SILVER_GAUNTLETS")) && L.CallGossipFairyExceptSuns())],
      ["RC_GC_MAZE_GOSSIP_STONE_FAIRY_BIG", () => ((L.BlastOrSmash() || L.CanUse("RG_SILVER_GAUNTLETS")) && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GC_MAZE_GOSSIP_STONE", () => (L.BlastOrSmash() || L.CanUse("RG_SILVER_GAUNTLETS"))],
      ["RC_GC_LOWER_STAIRCASE_POT_1", () => (L.CanBreakPots())],
      ["RC_GC_LOWER_STAIRCASE_POT_2", () => (L.CanBreakPots())],
      ["RC_GC_UPPER_STAIRCASE_POT_1", () => (L.CanBreakPots())],
      ["RC_GC_UPPER_STAIRCASE_POT_2", () => (L.CanBreakPots())],
      ["RC_GC_UPPER_STAIRCASE_POT_3", () => (L.CanBreakPots())],
      ["RC_GC_MAZE_CRATE", () => (L.BlastOrSmash() || (L.CanUse("RG_SILVER_GAUNTLETS") && L.CanBreakCrates()))]
    ],
      exits:[
      ["RR_DEATH_MOUNTAIN_TRAIL", () => true],
      ["RR_GC_MEDIGORON", () => (L.CanBreakMudWalls() || L.HasItem("RG_GORONS_BRACELET"))],
      ["RR_GC_WOODS_WARP", () => (L.Get("LOGIC_GORON_CITY_WOODS_WARP_OPEN"))],
      ["RR_GC_SHOP", () => ((L.IsAdult && L.Get("LOGIC_GORON_CITY_STOP_ROLLING_GORON_AS_ADULT")) || (L.IsChild && (L.BlastOrSmash() || L.HasItem("RG_GORONS_BRACELET") || L.Get("LOGIC_GORON_CITY_CHILD_FIRE") || L.CanUse("RG_FAIRY_BOW"))))],
      ["RR_GC_DARUNIAS_CHAMBER", () => ((L.IsAdult && L.Get("LOGIC_GORON_CITY_STOP_ROLLING_GORON_AS_ADULT")) || (L.IsChild && L.Get("LOGIC_GORON_CITY_DARUNIAS_DOOR_OPEN_CHILD")))],
      ["RR_GC_GROTTO_PLATFORM", () => (L.IsAdult && ((L.CanUse("RG_SONG_OF_TIME") && ((L.EffectiveHealth() > 2) || L.CanUse("RG_GORON_TUNIC") || L.CanUse("RG_LONGSHOT") || L.CanUse("RG_NAYRUS_LOVE"))) || (L.EffectiveHealth() > 1 && L.CanUse("RG_GORON_TUNIC") && L.CanUse("RG_HOOKSHOT")) || (L.CanUse("RG_NAYRUS_LOVE") && L.CanUse("RG_HOOKSHOT")) || (L.EffectiveHealth() > 2 && L.CanUse("RG_HOOKSHOT") && L.trick("RT_GC_GROTTO"))))]
    ] },
    RR_GC_MEDIGORON:{ name:"GC Medigoron", scene:"SCENE_GORON_CITY", time:false,
      events:[
      ["LOGIC_MEDIGORON", () => (L.IsAdult && L.HasItem("RG_ADULT_WALLET") && L.GetCheckPrice("RC_GC_MEDIGORON") <= L.GetWalletCapacity() && L.HasItem("RG_SPEAK_GORON"))]
    ],
      checks:[
      ["RC_GC_MEDIGORON", () => (L.IsAdult && L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_MEDIGORON_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_GC_MEDIGORON_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GC_MEDIGORON_GOSSIP_STONE", () => true],
      ["RC_GC_MEDIGORON_POT_1", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GORON_CITY", () => true]
    ] },
    RR_GC_WOODS_WARP:{ name:"GC Woods Warp", scene:"SCENE_GORON_CITY", time:false,
      events:[
      ["LOGIC_GORON_CITY_WOODS_WARP_OPEN", () => (L.BlastOrSmash() || L.CanUse("RG_DINS_FIRE"))]
    ],
      checks:[],
      exits:[
      ["RR_GORON_CITY", () => (L.Get("LOGIC_GORON_CITY_WOODS_WARP_OPEN"))],
      ["RR_THE_LOST_WOODS", () => true]
    ] },
    RR_GC_DARUNIAS_CHAMBER:{ name:"GC Darunias Chamber", scene:"SCENE_GORON_CITY", time:false,
      events:[
      ["LOGIC_GORON_CITY_CHILD_FIRE", () => (L.IsChild && L.CanUse("RG_STICKS"))]
    ],
      checks:[
      ["RC_GC_DARUNIAS_JOY", () => (L.IsChild && L.CanUse("RG_SARIAS_SONG"))],
      ["RC_GC_DARUNIA_POT_1", () => (L.CanBreakPots())],
      ["RC_GC_DARUNIA_POT_2", () => (L.CanBreakPots())],
      ["RC_GC_DARUNIA_POT_3", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_GORON_CITY", () => true],
      ["RR_DMC_POTS_ENTRY", () => (L.IsAdult && L.HasItem("RG_POWER_BRACELET"))]
    ] },
    RR_GC_GROTTO_PLATFORM:{ name:"GC Grotto Platform", scene:"SCENE_GORON_CITY", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GC_GROTTO", () => true],
      ["RR_GORON_CITY", () => (L.EffectiveHealth() > 2 || L.CanUse("RG_GORON_TUNIC") || L.CanUse("RG_NAYRUS_LOVE") || ((L.IsChild || L.CanUse("RG_SONG_OF_TIME")) && L.CanUse("RG_LONGSHOT")))]
    ] },
    RR_GC_SHOP:{ name:"GC Shop", scene:"SCENE_GORON_SHOP", time:false,
      events:[],
      checks:[
      ["RC_GC_SHOP_ITEM_1", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_SHOP_ITEM_2", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_SHOP_ITEM_3", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_SHOP_ITEM_4", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_SHOP_ITEM_5", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_SHOP_ITEM_6", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_SHOP_ITEM_7", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_SHOP_ITEM_8", () => (L.HasItem("RG_SPEAK_GORON") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_GORON_CITY", () => true]
    ] },
    RR_GC_GROTTO:{ name:"GC Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_GC_DEKU_SCRUB_GROTTO_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_DEKU_SCRUB_GROTTO_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_DEKU_SCRUB_GROTTO_CENTER", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_GC_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_GC_GROTTO_PLATFORM", () => true]
    ] },
    RR_THE_GRAVEYARD:{ name:"The Graveyard", scene:"SCENE_GRAVEYARD", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => ((L.AtDay && L.CanUse("RG_STICKS")) || (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.CanUse("RG_SONG_OF_STORMS")))],
      ["LOGIC_BUG_ACCESS", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["LOGIC_BORROW_BUNNY_HOOD", () => (L.IsChild && L.AtDay && L.Get("LOGIC_BORROW_SPOOKY_MASK") && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      checks:[
      ["RC_GRAVEYARD_FREESTANDING_POH", () => ((((L.IsAdult && L.CanPlantBean("RR_THE_GRAVEYARD", "RG_GRAVEYARD_BEAN_SOUL")) || L.CanUse("RG_LONGSHOT")) && L.CanBreakCrates()) || (L.trick("RT_GY_POH") && L.CanUse("RG_BOOMERANG")))],
      ["RC_GRAVEYARD_DAMPE_GRAVEDIGGING_TOUR", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsChild && L.AtNight)],
      ["RC_GRAVEYARD_GS_WALL", () => (L.IsChild && L.HookshotOrBoomerang() && L.AtNight && L.CanGetNightTimeGS())],
      ["RC_GRAVEYARD_GS_BEAN_PATCH", () => (L.CanSpawnSoilSkull("RG_GRAVEYARD_BEAN_SOUL") && L.CanAttack())],
      ["RC_GRAVEYARD_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_GRAVEYARD_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GRAVEYARD_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_GRAVEYARD_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GRAVEYARD_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_GRAVEYARD_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GY_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_9", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_10", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_11", () => (L.CanCutShrubs())],
      ["RC_GY_GRASS_12", () => (L.CanCutShrubs())],
      ["RC_GRAVEYARD_CRATE", () => (((L.IsAdult && L.CanPlantBean("RR_THE_GRAVEYARD", "RG_GRAVEYARD_BEAN_SOUL")) || L.CanUse("RG_LONGSHOT")) && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GRAVEYARD_SHIELD_GRAVE", () => ((L.IsAdult || L.AtNight) && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_GRAVEYARD_COMPOSERS_GRAVE", () => (L.CanUse("RG_ZELDAS_LULLABY"))],
      ["RR_GRAVEYARD_HEART_PIECE_GRAVE", () => ((L.IsAdult || L.AtNight) && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_GRAVEYARD_DAMPES_GRAVE", () => (L.IsAdult && L.HasItem("RG_POWER_BRACELET"))],
      ["RR_GRAVEYARD_DAMPES_HOUSE", () => (L.IsAdult && L.CanOpenOverworldDoor("RG_DAMPES_HUT_KEY"))],
      ["RR_KAKARIKO_VILLAGE", () => true],
      ["RR_GRAVEYARD_WARP_PAD_REGION", () => false]
    ] },
    RR_GRAVEYARD_SHIELD_GRAVE:{ name:"Graveyard Shield Grave", scene:"SCENE_GRAVE_WITH_FAIRYS_FOUNTAIN", time:false,
      events:[],
      checks:[
      ["RC_GRAVEYARD_SHIELD_GRAVE_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_THE_GRAVEYARD", () => true],
      ["RR_GRAVEYARD_SHIELD_GRAVE_BACK", () => (L.AnyAgeTime((() => (L.CanBreakMudWalls()))))]
    ] },
    RR_GRAVEYARD_SHIELD_GRAVE_BACK:{ name:"Graveyard Shield Grave Back", scene:"SCENE_GRAVE_WITH_FAIRYS_FOUNTAIN", time:false,
      events:[],
      checks:[
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_1", () => true],
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_2", () => true],
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_3", () => true],
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_4", () => true],
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_5", () => true],
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_6", () => true],
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_7", () => true],
      ["RC_GRAVEYARD_SHIELD_GRAVE_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_GRAVEYARD_SHIELD_GRAVE", () => true]
    ] },
    RR_GRAVEYARD_HEART_PIECE_GRAVE:{ name:"Graveyard Heart Piece Grave", scene:"SCENE_REDEAD_GRAVE", time:false,
      events:[],
      checks:[
      ["RC_GRAVEYARD_HEART_PIECE_GRAVE_CHEST", () => (L.CanUse("RG_SUNS_SONG") && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_THE_GRAVEYARD", () => true]
    ] },
    RR_GRAVEYARD_COMPOSERS_GRAVE:{ name:"Graveyard Composers Grave", scene:"SCENE_ROYAL_FAMILYS_TOMB", time:false,
      events:[],
      checks:[
      ["RC_GRAVEYARD_ROYAL_FAMILYS_TOMB_CHEST", () => (L.HasFireSource() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_SONG_FROM_ROYAL_FAMILYS_TOMB", () => (L.CanUseProjectile() || L.CanJumpslash())],
      ["RC_GRAVEYARD_ROYAL_FAMILYS_TOMB_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_THE_GRAVEYARD", () => true]
    ] },
    RR_GRAVEYARD_DAMPES_GRAVE:{ name:"Graveyard Dampes Grave", scene:"SCENE_WINDMILL_AND_DAMPES_GRAVE", time:false,
      events:[
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())]
    ],
      checks:[
      ["RC_GRAVEYARD_HOOKSHOT_CHEST", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_GRAVEYARD_DAMPE_RACE_FREESTANDING_POH", () => ((L.IsAdult || L.trick("RT_GY_CHILD_DAMPE_RACE_POH")) && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_GY_DAMPES_GRAVE_POT_1", () => (L.CanBreakPots())],
      ["RC_GY_DAMPES_GRAVE_POT_2", () => (L.CanBreakPots())],
      ["RC_GY_DAMPES_GRAVE_POT_3", () => (L.CanBreakPots())],
      ["RC_GY_DAMPES_GRAVE_POT_4", () => (L.CanBreakPots())],
      ["RC_GY_DAMPES_GRAVE_POT_5", () => (L.CanBreakPots())],
      ["RC_GY_DAMPES_GRAVE_POT_6", () => (L.CanBreakPots())],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_1", () => true],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_2", () => true],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_3", () => true],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_4", () => true],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_5", () => true],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_6", () => true],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_7", () => true],
      ["RC_GRAVEYARD_DAMPE_RACE_RUPEE_8", () => true]
    ],
      exits:[
      ["RR_THE_GRAVEYARD", () => true],
      ["RR_KAK_WINDMILL_UPPER", () => ((L.IsAdult && L.CanUse("RG_SONG_OF_TIME")) || (L.IsChild && L.CanGroundJump()))]
    ] },
    RR_GRAVEYARD_DAMPES_HOUSE:{ name:"Graveyard Dampes House", scene:"SCENE_GRAVEKEEPERS_HUT", time:false,
      events:[],
      checks:[
      ["RC_DAMPE_HINT", () => (L.IsAdult)]
    ],
      exits:[
      ["RR_THE_GRAVEYARD", () => true]
    ] },
    RR_GRAVEYARD_WARP_PAD_REGION:{ name:"Graveyard Warp Pad Region", scene:"SCENE_GRAVEYARD", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())]
    ],
      checks:[
      ["RC_GRAVEYARD_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_GRAVEYARD_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_GRAVEYARD_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_THE_GRAVEYARD", () => true],
      ["RR_SHADOW_TEMPLE_ENTRYWAY", () => (L.CanUse("RG_DINS_FIRE") || (L.trick("RT_GY_SHADOW_FIRE_ARROWS") && L.IsAdult && L.CanUse("RG_FIRE_ARROWS")))]
    ] },
    RR_WASTELAND_NEAR_FORTRESS:{ name:"Wasteland Near Fortress", scene:"SCENE_HAUNTED_WASTELAND", time:false,
      events:[],
      checks:[
      ["RC_HW_BEFORE_QUICKSAND_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GF_OUTSIDE_GATE", () => true],
      ["RR_HAUNTED_WASTELAND", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT") || L.trick("RT_HW_CROSSING"))]
    ] },
    RR_HAUNTED_WASTELAND:{ name:"Haunted Wasteland", scene:"SCENE_HAUNTED_WASTELAND", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_CARPET_MERCHANT", () => (L.HasItem("RG_ADULT_WALLET") && L.GetCheckPrice("RC_WASTELAND_BOMBCHU_SALESMAN") <= L.GetWalletCapacity() && (L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS")))]
    ],
      checks:[
      ["RC_WASTELAND_CHEST", () => (L.HasFireSource() && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_WASTELAND_BOMBCHU_SALESMAN", () => ((L.CanJumpslash() || L.CanUse("RG_HOVER_BOOTS")) && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_WASTELAND_GS", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (L.IsAdult && L.CanGroundJumpslash()))],
      ["RC_WASTELAND_NEAR_GS_POT_1", () => (L.CanBreakPots())],
      ["RC_WASTELAND_NEAR_GS_POT_2", () => (L.CanBreakPots())],
      ["RC_WASTELAND_NEAR_GS_POT_3", () => (L.CanBreakPots())],
      ["RC_WASTELAND_NEAR_GS_POT_4", () => (L.CanBreakPots())],
      ["RC_HW_AFTER_QUICKSAND_CRATE_1", () => (L.CanBreakCrates())],
      ["RC_HW_AFTER_QUICKSAND_CRATE_2", () => (L.CanBreakCrates())],
      ["RC_HW_AFTER_QUICKSAND_CRATE_3", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_WASTELAND_NEAR_COLOSSUS", () => (L.trick("RT_LENS_HW") || L.CanUse("RG_LENS_OF_TRUTH"))],
      ["RR_WASTELAND_NEAR_FORTRESS", () => (L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT") || L.trick("RT_HW_CROSSING"))]
    ] },
    RR_WASTELAND_NEAR_COLOSSUS:{ name:"Wasteland Near Colossus", scene:"SCENE_HAUNTED_WASTELAND", time:false,
      events:[],
      checks:[
      ["RC_HW_NEAR_COLOSSUS_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_DESERT_COLOSSUS", () => true],
      ["RR_HAUNTED_WASTELAND", () => (L.trick("RT_HW_REVERSE") || false)]
    ] },
    RR_HYRULE_FIELD:{ name:"Hyrule Field", scene:"SCENE_HYRULE_FIELD", time:true,
      events:[
      ["LOGIC_BIG_POE_KILL", () => (L.HasBottle() && L.CanUse("RG_FAIRY_BOW") && (L.SummonEpona() || L.trick("RT_HF_BIG_POE_WITHOUT_EPONA")))],
      ["LOGIC_BORROW_RIGHT_MASKS", () => (L.IsChild && L.Get("LOGIC_BORROW_BUNNY_HOOD") && L.HasItem("RG_KOKIRI_EMERALD") && L.HasItem("RG_GORON_RUBY") && L.HasItem("RG_ZORA_SAPPHIRE") && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      checks:[
      ["RC_HF_OCARINA_OF_TIME_ITEM", () => (L.IsChild && L.StoneCount() == 3 && L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_SONG_FROM_OCARINA_OF_TIME", () => (L.IsChild && L.StoneCount() == 3 && L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_HF_POND_STORMS_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_HF_CENTRAL_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_9", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_10", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_11", () => (L.CanCutShrubs())],
      ["RC_HF_CENTRAL_GRASS_12", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_9", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_10", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_11", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTH_GRASS_12", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_9", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_10", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_11", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GRASS_12", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_9", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_10", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_11", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_KF_GRASS_12", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_LLR_TREE", () => (L.CanBonkTrees())],
      ["RC_HF_NEAR_LH_TREE", () => (L.CanBonkTrees())],
      ["RC_HF_CHILD_NEAR_GV_TREE", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_HF_ADULT_NEAR_GV_TREE", () => (L.IsAdult && L.CanBonkTrees())],
      ["RC_HF_NEAR_ZR_TREE", () => (L.CanBonkTrees())],
      ["RC_HF_NEAR_KAK_TREE", () => (L.CanBonkTrees())],
      ["RC_HF_NEAR_KAK_SMALL_TREE", () => (L.CanBonkTrees())],
      ["RC_HF_NEAR_MARKET_TREE_1", () => (L.CanBonkTrees())],
      ["RC_HF_NEAR_MARKET_TREE_2", () => (L.CanBonkTrees())],
      ["RC_HF_NEAR_MARKET_TREE_3", () => (L.CanBonkTrees())],
      ["RC_HF_NORTHWEST_TREE_1", () => (L.CanBonkTrees())],
      ["RC_HF_NORTHWEST_TREE_2", () => (L.CanBonkTrees())],
      ["RC_HF_NORTHWEST_TREE_3", () => (L.CanBonkTrees())],
      ["RC_HF_NORTHWEST_TREE_4", () => (L.CanBonkTrees())],
      ["RC_HF_NORTHWEST_TREE_5", () => (L.CanBonkTrees())],
      ["RC_HF_NORTHWEST_TREE_6", () => (L.CanBonkTrees())],
      ["RC_HF_EAST_TREE_1", () => (L.CanBonkTrees())],
      ["RC_HF_EAST_TREE_2", () => (L.CanBonkTrees())],
      ["RC_HF_EAST_TREE_3", () => (L.CanBonkTrees())],
      ["RC_HF_EAST_TREE_4", () => (L.CanBonkTrees())],
      ["RC_HF_EAST_TREE_5", () => (L.CanBonkTrees())],
      ["RC_HF_EAST_TREE_6", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_1", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_2", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_3", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_4", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_5", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_6", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_7", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_8", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_9", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_10", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_11", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_12", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_13", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_14", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_15", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_16", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_17", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_18", () => (L.CanBonkTrees())],
      ["RC_HF_SOUTHEAST_TREE_19", () => (L.CanBonkTrees())],
      ["RC_HF_CHILD_SOUTHEAST_TREE_1", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_HF_CHILD_SOUTHEAST_TREE_2", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_HF_CHILD_SOUTHEAST_TREE_3", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_HF_CHILD_SOUTHEAST_TREE_4", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_HF_CHILD_SOUTHEAST_TREE_5", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_HF_CHILD_SOUTHEAST_TREE_6", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_HF_TEKTITE_GROTTO_TREE", () => (L.CanBonkTrees())],
      ["RC_HF_BUSH_NEAR_LAKE_1", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_2", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_3", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_4", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_5", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_6", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_7", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_8", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_9", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_10", () => true],
      ["RC_HF_BUSH_NEAR_LAKE_11", () => true],
      ["RC_HF_NORTHERN_BUSH_1", () => true],
      ["RC_HF_NORTHERN_BUSH_2", () => true],
      ["RC_HF_NORTHERN_BUSH_3", () => true],
      ["RC_HF_NORTHERN_BUSH_4", () => true],
      ["RC_HF_NORTHERN_BUSH_5", () => true],
      ["RC_HF_NORTHERN_BUSH_6", () => true],
      ["RC_HF_CHILD_NORTHERN_BUSH_1", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_2", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_3", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_4", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_5", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_6", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_7", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_8", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_9", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_10", () => (L.IsChild)],
      ["RC_HF_CHILD_NORTHERN_BUSH_11", () => (L.IsChild)],
      ["RC_HF_BUSH_BY_ROCKY_PATH_1", () => true],
      ["RC_HF_BUSH_BY_ROCKY_PATH_2", () => true],
      ["RC_HF_BUSH_BY_ROCKY_PATH_3", () => true],
      ["RC_HF_BUSH_BY_ROCKY_PATH_4", () => true],
      ["RC_HF_BUSH_BY_ROCKY_PATH_5", () => true],
      ["RC_HF_BUSH_BY_ROCKY_PATH_6", () => true],
      ["RC_HF_SOUTHERN_BUSH_1", () => true],
      ["RC_HF_SOUTHERN_BUSH_2", () => true],
      ["RC_HF_SOUTHERN_BUSH_3", () => true],
      ["RC_HF_SOUTHERN_BUSH_4", () => true],
      ["RC_HF_SOUTHERN_BUSH_5", () => true],
      ["RC_HF_SOUTHERN_BUSH_6", () => true],
      ["RC_HF_SOUTHERN_BUSH_7", () => true],
      ["RC_HF_SOUTHERN_BUSH_8", () => true],
      ["RC_HF_SOUTHERN_BUSH_9", () => true],
      ["RC_HF_SOUTHERN_BUSH_10", () => true],
      ["RC_HF_SOUTHERN_BUSH_11", () => true],
      ["RC_HF_SOUTHERN_BUSH_12", () => true],
      ["RC_HF_CHILD_SOUTHERN_BUSH_1", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_2", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_3", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_4", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_5", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_6", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_7", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_8", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_9", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_10", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_11", () => (L.IsChild)],
      ["RC_HF_CHILD_SOUTHERN_BUSH_12", () => (L.IsChild)]
    ],
      exits:[
      ["RR_LW_BRIDGE", () => true],
      ["RR_GERUDO_VALLEY", () => true],
      ["RR_MARKET_ENTRANCE", () => true],
      ["RR_KAKARIKO_VILLAGE", () => true],
      ["RR_ZR_FRONT", () => true],
      ["RR_LON_LON_RANCH", () => true],
      ["RR_HF_SOUTHEAST_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))],
      ["RR_HF_TO_LAKE_HYLIA", () => (L.CanClimbLadder() || L.SummonEpona())],
      ["RR_HF_OPEN_GROTTO", () => true],
      ["RR_HF_INSIDE_FENCE_GROTTO", () => (L.CanOpenBombGrotto())],
      ["RR_HF_COW_GROTTO", () => ((L.CanUse("RG_MEGATON_HAMMER") || L.IsChild) && L.CanOpenBombGrotto())],
      ["RR_HF_NEAR_MARKET_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))],
      ["RR_HF_FAIRY_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))],
      ["RR_HF_NEAR_KAK_GROTTO", () => (L.CanOpenBombGrotto())],
      ["RR_HF_TEKTITE_GROTTO", () => (L.CanOpenBombGrotto())]
    ] },
    RR_HF_TO_LAKE_HYLIA:{ name:"HF to Lake Hylia", scene:"SCENE_HYRULE_FIELD", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_LAKE_HYLIA", () => true],
      ["RR_HYRULE_FIELD", () => (L.CanClimbLadder() || L.SummonEpona())]
    ] },
    RR_HF_SOUTHEAST_GROTTO:{ name:"HF Southeast Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_HF_SOUTHEAST_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_HF_SOUTHEAST_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_HF_SOUTHEAST_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_HF_SOUTHEAST_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_HF_SOUTHEAST_GROTTO_GOSSIP_STONE", () => true],
      ["RC_HF_SOUTHEAST_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_HF_SOUTHEAST_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_HF_SOUTHEAST_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTHEAST_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTHEAST_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_HF_SOUTHEAST_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_HF_OPEN_GROTTO:{ name:"HF Open Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_HF_OPEN_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_HF_OPEN_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_HF_OPEN_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_HF_OPEN_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_HF_OPEN_GROTTO_GOSSIP_STONE", () => true],
      ["RC_HF_OPEN_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_HF_OPEN_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_HF_OPEN_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_OPEN_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HF_OPEN_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_HF_OPEN_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_HF_INSIDE_FENCE_GROTTO:{ name:"HF Inside Fence Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_HF_DEKU_SCRUB_GROTTO", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_HF_INSIDE_FENCE_GROTTO_BEEHIVE", () => (L.CanBreakLowerBeehives())],
      ["RC_HF_FENCE_GROTTO_STORMS_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_HF_COW_GROTTO:{ name:"HF Cow Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_HYRULE_FIELD", () => true],
      ["RR_HF_COW_GROTTO_BEHIND_WEBS", () => (L.HasFireSource())]
    ] },
    RR_HF_COW_GROTTO_BEHIND_WEBS:{ name:"HF Cow Grotto Behind Webs", scene:"SCENE_GROTTOS", time:false,
      events:[
      ["LOGIC_BUG_ACCESS", () => (L.CanCutShrubs())],
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy())]
    ],
      checks:[
      ["RC_HF_GS_COW_GROTTO", () => (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG"))],
      ["RC_HF_COW_GROTTO_COW", () => (L.CanUse("RG_EPONAS_SONG"))],
      ["RC_HF_COW_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_HF_COW_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_HF_COW_GROTTO_GOSSIP_STONE", () => true],
      ["RC_HF_COW_GROTTO_POT_1", () => (L.CanBreakPots())],
      ["RC_HF_COW_GROTTO_POT_2", () => (L.CanBreakPots())],
      ["RC_HF_COW_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_COW_GROTTO_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_HF_COW_GROTTO", () => true]
    ] },
    RR_HF_NEAR_MARKET_GROTTO:{ name:"HF Near Market Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_HF_NEAR_MARKET_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_HF_NEAR_MARKET_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_HF_NEAR_MARKET_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_HF_NEAR_MARKET_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_HF_NEAR_MARKET_GROTTO_GOSSIP_STONE", () => true],
      ["RC_HF_NEAR_MARKET_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_HF_NEAR_MARKET_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_HF_NEAR_MARKET_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_HF_NEAR_MARKET_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_HF_FAIRY_GROTTO:{ name:"HF Fairy Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_HF_FAIRY_GROTTO_FAIRY_1", () => true],
      ["RC_HF_FAIRY_GROTTO_FAIRY_2", () => true],
      ["RC_HF_FAIRY_GROTTO_FAIRY_3", () => true],
      ["RC_HF_FAIRY_GROTTO_FAIRY_4", () => true],
      ["RC_HF_FAIRY_GROTTO_FAIRY_5", () => true],
      ["RC_HF_FAIRY_GROTTO_FAIRY_6", () => true],
      ["RC_HF_FAIRY_GROTTO_FAIRY_7", () => true],
      ["RC_HF_FAIRY_GROTTO_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_HF_NEAR_KAK_GROTTO:{ name:"HF Near Kak Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_HF_GS_NEAR_KAK_GROTTO", () => (L.HookshotOrBoomerang())]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_HF_TEKTITE_GROTTO:{ name:"HF Tektite Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_HF_TEKTITE_GROTTO_FREESTANDING_POH", () => (L.HasItem("RG_GOLDEN_SCALE") || L.CanUse("RG_IRON_BOOTS"))]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_KAKARIKO_VILLAGE:{ name:"Kakariko Village", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[
      ["LOGIC_BUG_ACCESS", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["LOGIC_KAKARIKO_GATE_OPEN", () => (L.IsChild && L.HasItem("RG_ZELDAS_LETTER"))],
      ["LOGIC_BORROW_SKULL_MASK", () => (L.IsChild && L.Get("LOGIC_CAN_BORROW_MASKS") && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      checks:[
      ["RC_SHEIK_IN_KAKARIKO", () => (L.IsAdult && L.HasItem("RG_FOREST_MEDALLION") && L.HasItem("RG_FIRE_MEDALLION") && L.HasItem("RG_WATER_MEDALLION"))],
      ["RC_KAK_ANJU_AS_CHILD", () => (L.IsChild && L.AtDay && L.HasItem("RG_CLIMB") && L.HasItem("RG_POWER_BRACELET") && L.CanBreakCrates() && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_KAK_ANJU_AS_ADULT", () => (L.IsAdult && L.AtDay && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_KAK_TRADE_POCKET_CUCCO", () => (L.IsAdult && L.AtDay && (L.CanUse("RG_POCKET_EGG") && L.Get("LOGIC_WAKE_UP_ADULT_TALON")))],
      ["RC_KAK_GS_HOUSE_UNDER_CONSTRUCTION", () => (L.IsChild && L.CanGetNightTimeGS() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_KAK_GS_SKULLTULA_HOUSE", () => (L.IsChild && L.CanGetNightTimeGS() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_KAK_GS_GUARDS_HOUSE", () => (L.IsChild && L.CanGetNightTimeGS() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_KAK_GS_TREE", () => (L.IsChild && L.CanGetNightTimeGS() && L.CanBonkTrees() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_KAK_GS_WATCHTOWER", () => (L.IsChild && L.HasItem("RG_CLIMB") && (L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_LONGSHOT") || (L.trick("RT_KAK_TOWER_GS") && L.CanJumpslashExceptHammer())) && L.CanGetNightTimeGS())],
      ["RC_KAK_NEAR_POTION_SHOP_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_POTION_SHOP_POT_2", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_POTION_SHOP_POT_3", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_IMPAS_HOUSE_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_IMPAS_HOUSE_POT_2", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_IMPAS_HOUSE_POT_3", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_GUARDS_HOUSE_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_GUARDS_HOUSE_POT_2", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_GUARDS_HOUSE_POT_3", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_KAK_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_KAK_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_KAK_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_KAK_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_KAK_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_KAK_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_KAK_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_KAK_NEAR_OPEN_GROTTO_ADULT_CRATE_1", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_OPEN_GROTTO_ADULT_CRATE_2", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_OPEN_GROTTO_ADULT_CRATE_3", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_OPEN_GROTTO_ADULT_CRATE_4", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_POTION_SHOP_ADULT_CRATE", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_SHOOTING_GALLERY_ADULT_CRATE", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_BOARDING_HOUSE_ADULT_CRATE_1", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_BOARDING_HOUSE_ADULT_CRATE_2", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_IMPAS_HOUSE_ADULT_CRATE_1", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_IMPAS_HOUSE_ADULT_CRATE_2", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_BAZAAR_ADULT_CRATE_1", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_BAZAAR_ADULT_CRATE_2", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_BEHIND_GS_HOUSE_ADULT_CRATE", () => (L.IsAdult && L.CanBreakCrates())],
      ["RC_KAK_NEAR_GY_CHILD_CRATE", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_KAK_NEAR_WINDMILL_CHILD_CRATE", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_KAK_NEAR_FENCE_CHILD_CRATE", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_KAK_NEAR_BOARDING_HOUSE_CHILD_CRATE", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_KAK_NEAR_BAZAAR_CHILD_CRATE", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_KAK_TREE", () => (L.CanBonkTrees())]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true],
      ["RR_KAK_CARPENTER_BOSS_HOUSE", () => (L.CanOpenOverworldDoor("RG_BOSS_HOUSE_KEY"))],
      ["RR_KAK_HOUSE_OF_SKULLTULA", () => (L.CanOpenOverworldDoor("RG_SKULLTULA_HOUSE_KEY"))],
      ["RR_KAK_IMPAS_HOUSE", () => (L.CanOpenOverworldDoor("RG_IMPAS_HOUSE_KEY"))],
      ["RR_KAK_WINDMILL_LOWER", () => (L.CanOpenOverworldDoor("RG_WINDMILL_KEY"))],
      ["RR_KAK_BAZAAR", () => (L.IsAdult && L.AtDay && L.CanOpenOverworldDoor("RG_KAK_BAZAAR_KEY"))],
      ["RR_KAK_SHOOTING_GALLERY", () => (L.IsAdult && L.AtDay && L.CanOpenOverworldDoor("RG_KAK_SHOOTING_GALLERY_KEY"))],
      ["RR_KAK_WELL", () => (L.IsAdult || L.Get("LOGIC_DRAIN_WELL") || L.CanUse("RG_IRON_BOOTS") || (L.trick("RT_BOTTOM_OF_THE_WELL_NAVI_DIVE") && L.IsChild && L.HasItem("RG_BRONZE_SCALE") && L.CanJumpslash()))],
      ["RR_KAK_POTION_SHOP", () => ((L.AtDay || L.IsChild) && L.CanOpenOverworldDoor("RG_KAK_POTION_SHOP_KEY"))],
      ["RR_KAK_REDEAD_GROTTO", () => (L.CanOpenBombGrotto())],
      ["RR_KAK_IMPAS_LEDGE", () => ((L.IsChild && L.AtDay && L.HasItem("RG_POWER_BRACELET")) || (L.IsAdult && L.trick("RT_VISIBLE_COLLISION")))],
      ["RR_KAK_WATCHTOWER", () => (L.HasItem("RG_CLIMB") && (L.IsAdult || L.AtDay || L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_LONGSHOT") || (L.trick("RT_KAK_TOWER_GS") && L.CanJumpslashExceptHammer())))],
      ["RR_KAK_ROOFTOP", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_UNINTUITIVE_JUMPS") && L.IsAdult))],
      ["RR_KAK_IMPAS_ROOFTOP", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_KAK_ROOFTOP_GS") && L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_THE_GRAVEYARD", () => true],
      ["RR_KAK_BEHIND_GATE", () => (L.IsAdult || L.Get("LOGIC_KAKARIKO_GATE_OPEN"))],
      ["RR_KAK_BACKYARD", () => (L.IsAdult || (L.AtDay && L.HasItem("RG_POWER_BRACELET")))],
      ["RR_KAK_BEHIND_POTION_SHOP", () => (L.CanUse("RG_HOOKSHOT") || (L.trick("RT_UNINTUITIVE_JUMPS") && L.IsAdult))]
    ] },
    RR_KAK_IMPAS_LEDGE:{ name:"Kak Impas Ledge", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KAK_IMPAS_HOUSE_BACK", () => true],
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_IMPAS_ROOFTOP:{ name:"Kak Impas Rooftop", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[
      ["RC_KAK_GS_ABOVE_IMPAS_HOUSE", () => (L.IsAdult && L.CanGetNightTimeGS() && L.CanKillEnemy("RE_GOLD_SKULLTULA"))]
    ],
      exits:[
      ["RR_KAK_IMPAS_LEDGE", () => true],
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_WATCHTOWER:{ name:"Kak Watchtower", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[
      ["RC_KAK_GS_WATCHTOWER", () => (L.IsChild && L.CanUse("RG_DINS_FIRE") && L.CanGetNightTimeGS())]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true],
      ["RR_KAK_ROOFTOP", () => (!!L.trick("RT_UNINTUITIVE_JUMPS"))]
    ] },
    RR_KAK_ROOFTOP:{ name:"Kak Rooftop", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[
      ["RC_KAK_MAN_ON_ROOF", () => (L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      exits:[
      ["RR_KAK_BACKYARD", () => true],
      ["RR_KAK_BEHIND_POTION_SHOP", () => (L.HasItem("RG_HOVER_BOOTS"))],
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_BACKYARD:{ name:"Kak Backyard", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[
      ["RC_KAK_NEAR_MEDICINE_SHOP_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_KAK_NEAR_MEDICINE_SHOP_POT_2", () => (L.IsChild && L.CanBreakPots())]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true],
      ["RR_KAK_OPEN_GROTTO", () => true],
      ["RR_KAK_ODD_POTION_BUILDING", () => (L.IsAdult && L.CanOpenOverworldDoor("RG_GRANNYS_POTION_SHOP_KEY"))],
      ["RR_KAK_BEHIND_POTION_SHOP", () => (L.HasItem("RG_CLIMB"))]
    ] },
    RR_KAK_BEHIND_POTION_SHOP:{ name:"Kak Behind Potion Shop", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KAK_BACKYARD", () => true],
      ["RR_KAK_POTION_SHOP", () => (L.IsAdult && L.AtDay && L.CanOpenOverworldDoor("RG_KAK_POTION_SHOP_KEY"))],
      ["RR_KAK_ROOFTOP", () => (L.trick("RT_HOVER_BOOST_SIMPLE") && L.CanUse("RG_HOVER_BOOTS") && L.CanUse("RG_MEGATON_HAMMER") && L.IsAdult)]
    ] },
    RR_KAK_CARPENTER_BOSS_HOUSE:{ name:"Kak Carpenter Boss House", scene:"SCENE_KAKARIKO_CENTER_GUEST_HOUSE", time:false,
      events:[
      ["LOGIC_WAKE_UP_ADULT_TALON", () => (L.IsAdult && L.CanUse("RG_POCKET_EGG"))]
    ],
      checks:[],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_HOUSE_OF_SKULLTULA:{ name:"Kak House of Skulltula", scene:"SCENE_HOUSE_OF_SKULLTULA", time:false,
      events:[],
      checks:[
      ["RC_KAK_10_GOLD_SKULLTULA_REWARD", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetGSCount() >= 10)],
      ["RC_KAK_20_GOLD_SKULLTULA_REWARD", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetGSCount() >= 20)],
      ["RC_KAK_30_GOLD_SKULLTULA_REWARD", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetGSCount() >= 30)],
      ["RC_KAK_40_GOLD_SKULLTULA_REWARD", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetGSCount() >= 40)],
      ["RC_KAK_50_GOLD_SKULLTULA_REWARD", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetGSCount() >= 50)],
      ["RC_KAK_100_GOLD_SKULLTULA_REWARD", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetGSCount() >= 100)]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_IMPAS_HOUSE:{ name:"Kak Impas House", scene:"SCENE_IMPAS_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_KAK_IMPAS_HOUSE_COW", () => (L.CanUse("RG_EPONAS_SONG"))]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_IMPAS_HOUSE_BACK:{ name:"Kak Impas House Back", scene:"SCENE_IMPAS_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_KAK_IMPAS_HOUSE_FREESTANDING_POH", () => true],
      ["RC_KAK_IMPAS_HOUSE_COW", () => (L.CanUse("RG_EPONAS_SONG"))]
    ],
      exits:[
      ["RR_KAK_IMPAS_LEDGE", () => true]
    ] },
    RR_KAK_WINDMILL_LOWER:{ name:"Kak Windmill Lower", scene:"SCENE_WINDMILL_AND_DAMPES_GRAVE", time:false,
      events:[
      ["LOGIC_DRAIN_WELL", () => (L.IsChild && L.CanUse("RG_SONG_OF_STORMS"))]
    ],
      checks:[
      ["RC_KAK_WINDMILL_FREESTANDING_POH", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_SONG_FROM_WINDMILL", () => (L.IsAdult && L.HasItem("RG_FAIRY_OCARINA"))]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true],
      ["RR_KAK_WINDMILL_UPPER", () => ((L.IsAdult && (L.trick("RT_UNINTUITIVE_JUMPS") || L.CanGroundJump())) || (L.IsChild && L.CanJumpslash() && L.trick("RT_KAK_CHILD_WINDMILL_POH")))]
    ] },
    RR_KAK_WINDMILL_UPPER:{ name:"Kak Windmill Upper", scene:"SCENE_WINDMILL_AND_DAMPES_GRAVE", time:false,
      events:[],
      checks:[
      ["RC_KAK_WINDMILL_FREESTANDING_POH", () => true]
    ],
      exits:[
      ["RR_KAK_WINDMILL_LOWER", () => true]
    ] },
    RR_KAK_BAZAAR:{ name:"Kak Bazaar", scene:"SCENE_BAZAAR", time:false,
      events:[],
      checks:[
      ["RC_KAK_BAZAAR_ITEM_1", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_BAZAAR_ITEM_2", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_BAZAAR_ITEM_3", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_BAZAAR_ITEM_4", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_BAZAAR_ITEM_5", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_BAZAAR_ITEM_6", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_BAZAAR_ITEM_7", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_BAZAAR_ITEM_8", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_SHOOTING_GALLERY:{ name:"Kak Shooting Gallery", scene:"SCENE_SHOOTING_GALLERY", time:false,
      events:[],
      checks:[
      ["RC_KAK_SHOOTING_GALLERY_REWARD", () => (L.IsAdult && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.CanUse("RG_FAIRY_BOW"))]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_POTION_SHOP:{ name:"Kak Potion Shop", scene:"SCENE_POTION_SHOP_KAKARIKO", time:false,
      events:[],
      checks:[
      ["RC_KAK_POTION_SHOP_ITEM_1", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_POTION_SHOP_ITEM_2", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_POTION_SHOP_ITEM_3", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_POTION_SHOP_ITEM_4", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_POTION_SHOP_ITEM_5", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_POTION_SHOP_ITEM_6", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_POTION_SHOP_ITEM_7", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KAK_POTION_SHOP_ITEM_8", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true],
      ["RR_KAK_BEHIND_POTION_SHOP", () => (L.IsAdult)]
    ] },
    RR_KAK_ODD_POTION_BUILDING:{ name:"Kak Granny's Potion Shop", scene:"SCENE_POTION_SHOP_GRANNY", time:false,
      events:[],
      checks:[
      ["RC_KAK_TRADE_ODD_MUSHROOM", () => (L.IsAdult && L.CanUse("RG_ODD_MUSHROOM"))],
      ["RC_KAK_GRANNYS_SHOP", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && (L.CanUse("RG_ODD_MUSHROOM") || L.TradeQuestStep("RG_ODD_MUSHROOM")) && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_KAK_BACKYARD", () => true]
    ] },
    RR_KAK_REDEAD_GROTTO:{ name:"Kak Redead Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_KAK_REDEAD_GROTTO_CHEST", () => (L.CanKillEnemy("RE_REDEAD", "ED_CLOSE", true, 2) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => true]
    ] },
    RR_KAK_OPEN_GROTTO:{ name:"Kak Open Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_KAK_OPEN_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_KAK_OPEN_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_KAK_OPEN_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_KAK_OPEN_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KAK_OPEN_GROTTO_GOSSIP_STONE", () => true],
      ["RC_KAK_OPEN_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_KAK_OPEN_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_KAK_OPEN_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_KAK_OPEN_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_KAK_OPEN_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_KAK_OPEN_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_KAK_BACKYARD", () => true]
    ] },
    RR_KAK_BEHIND_GATE:{ name:"Kak Behind Gate", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => (L.IsAdult || L.trick("RT_VISIBLE_COLLISION") || L.Get("LOGIC_KAKARIKO_GATE_OPEN"))],
      ["RR_DEATH_MOUNTAIN_TRAIL", () => true]
    ] },
    RR_KAK_WELL:{ name:"Kak Well", scene:"SCENE_KAKARIKO_VILLAGE", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KAKARIKO_VILLAGE", () => (L.HasItem("RG_CLIMB") && (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || L.Get("LOGIC_DRAIN_WELL")))],
      ["RR_BOTW_ENTRYWAY", () => (L.IsChild || (L.Get("LOGIC_DRAIN_WELL") && (L.opt("RSK_SHUFFLE_DUNGEON_ENTRANCES") !== 0)))]
    ] },
    RR_KOKIRI_FOREST:{ name:"Kokiri Forest", scene:"SCENE_KOKIRI_FOREST", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns() || (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_KOKIRI_FOREST_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS")))],
      ["LOGIC_SHOWED_MIDO_SWORD_AND_SHIELD", () => (L.IsChild && L.HasItem("RG_SPEAK_KOKIRI") && L.CanUse("RG_KOKIRI_SWORD") && L.CanUse("RG_DEKU_SHIELD"))]
    ],
      checks:[
      ["RC_KF_GS_KNOW_IT_ALL_HOUSE", () => (L.IsChild && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_CLOSE") && L.CanGetNightTimeGS())],
      ["RC_KF_GS_BEAN_PATCH", () => (L.CanSpawnSoilSkull("RG_KOKIRI_FOREST_BEAN_SOUL") && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_CLOSE"))],
      ["RC_KF_GS_HOUSE_OF_TWINS", () => (L.IsAdult && L.CanGetNightTimeGS() && (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (L.trick("RT_KF_ADULT_GS") && L.CanUse("RG_HOVER_BOOTS") && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH"))))],
      ["RC_KF_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_KOKIRI_FOREST_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KF_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_KOKIRI_FOREST_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KF_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_KOKIRI_FOREST_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KF_BRIDGE_RUPEE", () => (L.IsChild)],
      ["RC_KF_BEHIND_MIDOS_RUPEE", () => (L.IsChild)],
      ["RC_KF_SOUTH_GRASS_WEST_RUPEE", () => (L.IsChild)],
      ["RC_KF_SOUTH_GRASS_EAST_RUPEE", () => (L.IsChild)],
      ["RC_KF_NORTH_GRASS_WEST_RUPEE", () => (L.IsChild)],
      ["RC_KF_NORTH_GRASS_EAST_RUPEE", () => (L.IsChild)],
      ["RC_KF_BEAN_RUPEE_1", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_KF_BEAN_RUPEE_2", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_KF_BEAN_RUPEE_3", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_KF_BEAN_RUPEE_4", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_KF_BEAN_RUPEE_5", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_KF_BEAN_RUPEE_6", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_KF_BEAN_RED_RUPEE", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_KF_SARIAS_ROOF_WEST_HEART", () => (L.IsChild)],
      ["RC_KF_SARIAS_ROOF_EAST_HEART", () => (L.IsChild)],
      ["RC_KF_SARIAS_ROOF_NORTH_HEART", () => (L.IsChild)],
      ["RC_KF_CHILD_GRASS_1", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_2", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_3", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_4", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_5", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_6", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_7", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_8", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_9", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_10", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_11", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_12", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_1", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_2", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_3", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_4", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_5", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_6", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_7", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_8", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_9", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_10", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_11", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_12", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_13", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_14", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_15", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_16", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_17", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_18", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_19", () => (L.IsAdult && L.CanCutShrubs())],
      ["RC_KF_ADULT_GRASS_20", () => (L.IsAdult && L.CanCutShrubs())]
    ],
      exits:[
      ["RR_KF_BOULDER_LOOP", () => (L.CanUse("RG_CRAWL"))],
      ["RR_KF_LINKS_PORCH", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOVER_BOOTS") || ((L.IsChild || L.CanKillEnemy("RE_DEKU_BABA") || L.Get("LOGIC_FOREST_TEMPLE_CLEAR")) && L.CanClimbLadder()))],
      ["RR_KF_MIDOS_HOUSE", () => true],
      ["RR_KF_SARIAS_HOUSE", () => true],
      ["RR_KF_HOUSE_OF_TWINS", () => true],
      ["RR_KF_KNOW_IT_ALL_HOUSE", () => true],
      ["RR_KF_KOKIRI_SHOP", () => true],
      ["RR_KF_OUTSIDE_DEKU_TREE", () => ((L.IsAdult && (L.CanPassEnemy("RE_BIG_SKULLTULA") || L.Get("LOGIC_FOREST_TEMPLE_CLEAR"))) || (L.opt("RSK_FOREST") === 2) || L.Get("LOGIC_SHOWED_MIDO_SWORD_AND_SHIELD"))],
      ["RR_KF_OUTSIDE_LOST_WOODS", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_HOOKSHOT") || (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.trick("RT_UNINTUITIVE_JUMPS"))))],
      ["RR_KF_RUPEE_ALCOVE", () => (L.IsAdult && L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL"))],
      ["RR_LW_BRIDGE_FROM_FOREST", () => (L.IsAdult || (L.opt("RSK_FOREST") !== 0) || L.Get("LOGIC_DEKU_TREE_CLEAR"))]
    ] },
    RR_KF_BOULDER_LOOP:{ name:"KF Boulder Loop", scene:"SCENE_KOKIRI_FOREST", time:false,
      events:[],
      checks:[
      ["RC_KF_KOKIRI_SWORD_CHEST", () => (L.IsChild && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_KF_BOULDER_RUPEE_1", () => (L.IsChild)],
      ["RC_KF_BOULDER_RUPEE_2", () => (L.IsChild)],
      ["RC_KF_CHILD_GRASS_MAZE_1", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_MAZE_2", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_KF_CHILD_GRASS_MAZE_3", () => (L.IsChild && L.CanCutShrubs())]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => (L.CanUse("RG_CRAWL"))]
    ] },
    RR_KF_OUTSIDE_DEKU_TREE:{ name:"KF Outside Deku Tree", scene:"SCENE_KOKIRI_FOREST", time:false,
      events:[
      ["LOGIC_STICK_ACCESS", () => (L.CanGetDekuBabaSticks())],
      ["LOGIC_NUT_ACCESS", () => (L.CanGetDekuBabaNuts())],
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())],
      ["LOGIC_SHOWED_MIDO_SWORD_AND_SHIELD", () => (L.IsChild && L.HasItem("RG_SPEAK_KOKIRI") && L.CanUse("RG_KOKIRI_SWORD") && L.CanUse("RG_DEKU_SHIELD"))]
    ],
      checks:[
      ["RC_KF_DEKU_TREE_LEFT_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_KF_DEKU_TREE_LEFT_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KF_DEKU_TREE_RIGHT_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_KF_DEKU_TREE_RIGHT_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KF_DEKU_TREE_LEFT_GOSSIP_STONE", () => true],
      ["RC_KF_DEKU_TREE_RIGHT_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_DEKU_TREE_ENTRYWAY", () => (L.IsChild || ((L.opt("RSK_SHUFFLE_DUNGEON_ENTRANCES") !== 0) && ((L.opt("RSK_FOREST") === 2) || L.Get("LOGIC_SHOWED_MIDO_SWORD_AND_SHIELD"))))],
      ["RR_KOKIRI_FOREST", () => ((L.IsAdult && (L.CanPassEnemy("RE_BIG_SKULLTULA") || L.Get("LOGIC_DEKU_TREE_CLEAR"))) || (L.opt("RSK_FOREST") === 2) || L.Get("LOGIC_SHOWED_MIDO_SWORD_AND_SHIELD"))]
    ] },
    RR_KF_LINKS_PORCH:{ name:"KF Link's Porch", scene:"SCENE_KOKIRI_FOREST", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KOKIRI_FOREST", () => true],
      ["RR_KF_LINKS_HOUSE", () => true]
    ] },
    RR_KF_LINKS_HOUSE:{ name:"KF Link's House", scene:"SCENE_LINKS_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_KF_LINKS_HOUSE_COW", () => (L.IsAdult && L.CanUse("RG_EPONAS_SONG") && L.Get("LOGIC_LINKS_COW"))],
      ["RC_KF_LINKS_HOUSE_POT", () => (L.HasItem("RG_POWER_BRACELET"))]
    ],
      exits:[
      ["RR_KF_LINKS_PORCH", () => true]
    ] },
    RR_KF_MIDOS_HOUSE:{ name:"KF Mido's House", scene:"SCENE_MIDOS_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_KF_MIDOS_TOP_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_KF_MIDOS_TOP_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_KF_MIDOS_BOTTOM_LEFT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_KF_MIDOS_BOTTOM_RIGHT_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => true]
    ] },
    RR_KF_SARIAS_HOUSE:{ name:"KF Saria's House", scene:"SCENE_SARIAS_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_KF_SARIAS_TOP_LEFT_HEART", () => true],
      ["RC_KF_SARIAS_TOP_RIGHT_HEART", () => true],
      ["RC_KF_SARIAS_BOTTOM_LEFT_HEART", () => true],
      ["RC_KF_SARIAS_BOTTOM_RIGHT_HEART", () => true]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => true]
    ] },
    RR_KF_HOUSE_OF_TWINS:{ name:"KF House of Twins", scene:"SCENE_TWINS_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_KF_TWINS_HOUSE_POT_1", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["RC_KF_TWINS_HOUSE_POT_2", () => (L.HasItem("RG_POWER_BRACELET"))]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => true]
    ] },
    RR_KF_KNOW_IT_ALL_HOUSE:{ name:"KF Know It All House", scene:"SCENE_KNOW_IT_ALL_BROS_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_KF_BROTHERS_HOUSE_POT_1", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["RC_KF_BROTHERS_HOUSE_POT_2", () => (L.HasItem("RG_POWER_BRACELET"))]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => true]
    ] },
    RR_KF_KOKIRI_SHOP:{ name:"KF Kokiri Shop", scene:"SCENE_KOKIRI_SHOP", time:false,
      events:[],
      checks:[
      ["RC_KF_SHOP_ITEM_1", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KF_SHOP_ITEM_2", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KF_SHOP_ITEM_3", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KF_SHOP_ITEM_4", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KF_SHOP_ITEM_5", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KF_SHOP_ITEM_6", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KF_SHOP_ITEM_7", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_KF_SHOP_ITEM_8", () => (L.HasItem("RG_SPEAK_KOKIRI") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => true]
    ] },
    RR_KF_OUTSIDE_LOST_WOODS:{ name:"KF Outside Lost Woods", scene:"SCENE_KOKIRI_FOREST", time:false,
      events:[],
      checks:[
      ["RC_KF_BEAN_RUPEE_1", () => (L.IsAdult && L.CanUse("RG_BOOMERANG"))],
      ["RC_KF_BEAN_RUPEE_2", () => (L.IsAdult && L.CanUse("RG_BOOMERANG"))],
      ["RC_KF_BEAN_RUPEE_3", () => (L.IsAdult && L.CanUse("RG_BOOMERANG"))],
      ["RC_KF_BEAN_RUPEE_4", () => (L.IsAdult && L.CanUse("RG_BOOMERANG"))],
      ["RC_KF_BEAN_RUPEE_5", () => (L.IsAdult && L.CanUse("RG_BOOMERANG"))],
      ["RC_KF_BEAN_RUPEE_6", () => (L.IsAdult && L.CanUse("RG_BOOMERANG"))],
      ["RC_KF_BEAN_RED_RUPEE", () => (L.IsAdult && L.CanUse("RG_BOOMERANG"))],
      ["RC_KF_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_KF_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KF_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => true],
      ["RR_THE_LOST_WOODS", () => true],
      ["RR_KF_RUPEE_ALCOVE", () => (L.IsAdult && (L.CanPlantBean("RR_KOKIRI_FOREST", "RG_KOKIRI_FOREST_BEAN_SOUL") || L.CanUse("RG_HOVER_BOOTS")))],
      ["RR_KF_STORMS_GROTTO", () => (L.CanOpenStormsGrotto())]
    ] },
    RR_KF_RUPEE_ALCOVE:{ name:"KF Alcove", scene:"SCENE_KOKIRI_FOREST", time:false,
      events:[],
      checks:[
      ["RC_KF_BEAN_RUPEE_1", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))],
      ["RC_KF_BEAN_RUPEE_2", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))],
      ["RC_KF_BEAN_RUPEE_3", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))],
      ["RC_KF_BEAN_RUPEE_4", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))],
      ["RC_KF_BEAN_RUPEE_5", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))],
      ["RC_KF_BEAN_RUPEE_6", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))],
      ["RC_KF_BEAN_RED_RUPEE", () => (L.IsAdult && L.CanUse("RG_HOVER_BOOTS"))]
    ],
      exits:[
      ["RR_KOKIRI_FOREST", () => true]
    ] },
    RR_KF_STORMS_GROTTO:{ name:"KF Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_KF_STORMS_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_KF_STORMS_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_KF_STORMS_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_KF_STORMS_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_KF_STORMS_GROTTO_GOSSIP_STONE", () => true],
      ["RC_KF_STORMS_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_KF_STORMS_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_KF_STORMS_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_KF_STORMS_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_KF_STORMS_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_KF_STORMS_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_KF_OUTSIDE_LOST_WOODS", () => true]
    ] },
    RR_LAKE_HYLIA:{ name:"Lake Hylia", scene:"SCENE_LAKE_HYLIA", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy() || L.CanUse("RG_STICKS") || (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LAKE_HYLIA_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS")))],
      ["LOGIC_BUG_ACCESS", () => (L.IsChild && L.CanCutShrubs())],
      ["LOGIC_CHILD_SCARECROW", () => (L.IsChild && L.HasItem("RG_FAIRY_OCARINA") && L.OcarinaButtons() >= 2)],
      ["LOGIC_ADULT_SCARECROW", () => (L.IsAdult && L.HasItem("RG_FAIRY_OCARINA") && L.OcarinaButtons() >= 2)]
    ],
      checks:[
      ["RC_LH_UNDERWATER_ITEM", () => (L.IsChild && L.HasItem("RG_SILVER_SCALE"))],
      ["RC_LH_SUN", () => (L.IsAdult && ((L.Get("LOGIC_WATER_TEMPLE_CLEAR") && L.HasItem("RG_BRONZE_SCALE")) || L.ReachDistantScarecrow()) && L.CanUse("RG_FAIRY_BOW"))],
      ["RC_LH_FREESTANDING_POH", () => (L.IsAdult && (L.ReachScarecrow() || L.CanPlantBean("RR_LAKE_HYLIA", "RG_LAKE_HYLIA_BEAN_SOUL")) && L.CanAvoidEnemy("RE_GUAY", false) && L.HasItem("RG_CLIMB"))],
      ["RC_LH_GS_BEAN_PATCH", () => (L.CanSpawnSoilSkull("RG_LAKE_HYLIA_BEAN_SOUL") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA"))],
      ["RC_LH_GS_LAB_WALL", () => (L.IsChild && (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") || (L.trick("RT_LH_LAB_WALL_GS") && L.CanJumpslashExceptHammer())) && L.CanGetNightTimeGS())],
      ["RC_LH_GS_SMALL_ISLAND", () => (L.IsChild && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA") && L.CanGetNightTimeGS() && L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_LH_GS_TREE", () => (L.IsAdult && L.CanUse("RG_LONGSHOT") && L.CanGetNightTimeGS())],
      ["RC_LH_FRONT_RUPEE", () => (L.IsChild && L.HasItem("RG_BRONZE_SCALE"))],
      ["RC_LH_MIDDLE_RUPEE", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS")))],
      ["RC_LH_BACK_RUPEE", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS")))],
      ["RC_LH_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LAKE_HYLIA_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LH_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LAKE_HYLIA_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LH_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LAKE_HYLIA_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LH_LAB_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_LH_LAB_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LH_SOUTHEAST_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_LH_SOUTHEAST_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LH_SOUTHWEST_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_LH_SOUTHWEST_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LH_ISLAND_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG") && ((L.HasItem("RG_BRONZE_SCALE") && (L.IsChild || L.Get("LOGIC_WATER_TEMPLE_CLEAR"))) || L.ReachDistantScarecrow()))],
      ["RC_LH_LAB_GOSSIP_STONE", () => true],
      ["RC_LH_SOUTHEAST_GOSSIP_STONE", () => true],
      ["RC_LH_SOUTHWEST_GOSSIP_STONE", () => true],
      ["RC_LH_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_9", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_10", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_11", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_12", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_13", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_14", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_15", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_16", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_17", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_18", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_19", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_20", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_21", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_22", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_23", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_24", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_25", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_26", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_27", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_28", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_29", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_30", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_31", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_32", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_33", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_34", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_35", () => (L.CanCutShrubs())],
      ["RC_LH_GRASS_36", () => (L.CanCutShrubs())],
      ["RC_LH_CHILD_GRASS_1", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_LH_CHILD_GRASS_2", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_LH_CHILD_GRASS_3", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_LH_CHILD_GRASS_4", () => (L.IsChild && L.CanCutShrubs())],
      ["RC_LH_WARP_PAD_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_LH_WARP_PAD_GRASS_2", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_HF_TO_LAKE_HYLIA", () => true],
      ["RR_LH_FROM_SHORTCUT", () => true],
      ["RR_LH_OWL_FLIGHT", () => (L.IsChild && (L.HasItem("RG_SPEAK_DEKU") || L.HasItem("RG_SPEAK_GERUDO") || L.HasItem("RG_SPEAK_GORON") || L.HasItem("RG_SPEAK_HYLIAN") || L.HasItem("RG_SPEAK_ZORA")))],
      ["RR_LH_FISHING_ISLAND", () => (((L.IsChild || L.Get("LOGIC_WATER_TEMPLE_CLEAR")) && L.HasItem("RG_BRONZE_SCALE")) || (L.IsAdult && (L.ReachScarecrow() || L.CanPlantBean("RR_LAKE_HYLIA", "RG_LAKE_HYLIA_BEAN_SOUL"))))],
      ["RR_LH_LAB", () => (L.CanOpenOverworldDoor("RG_HYLIA_LAB_KEY"))],
      ["RR_LH_FROM_WATER_TEMPLE", () => true],
      ["RR_LH_GROTTO", () => (L.HasItem("RG_POWER_BRACELET") && (L.IsAdult || L.HasItem("RG_SPEAK_DEKU") || L.HasItem("RG_SPEAK_GERUDO") || L.HasItem("RG_SPEAK_GORON") || L.HasItem("RG_SPEAK_HYLIAN") || L.HasItem("RG_SPEAK_ZORA")))]
    ] },
    RR_LH_FROM_SHORTCUT:{ name:"LH From Shortcut", scene:"SCENE_LAKE_HYLIA", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_LAKE_HYLIA", () => (L.Hearts() > 1 || L.HasItem("RG_BOTTLE_WITH_FAIRY") || L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_ZORAS_DOMAIN", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS")))]
    ] },
    RR_LH_FROM_WATER_TEMPLE:{ name:"LH From Water Temple", scene:"SCENE_LAKE_HYLIA", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_LAKE_HYLIA", () => (L.HasItem("RG_BRONZE_SCALE") || L.HasItem("RG_BOTTLE_WITH_FAIRY") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_WATER_TEMPLE_ENTRYWAY", () => (L.CanUse("RG_HOOKSHOT") && ((L.CanUse("RG_IRON_BOOTS") || (L.trick("RT_LH_WATER_HOOKSHOT") && L.HasItem("RG_GOLDEN_SCALE"))) || (L.IsAdult && L.CanUse("RG_LONGSHOT") && L.HasItem("RG_GOLDEN_SCALE"))))]
    ] },
    RR_LH_FISHING_ISLAND:{ name:"LH Fishing Island", scene:"SCENE_LAKE_HYLIA", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_LAKE_HYLIA", () => (L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_LH_FISHING_POND", () => (L.CanOpenOverworldDoor("RG_FISHING_HOLE_KEY"))]
    ] },
    RR_LH_OWL_FLIGHT:{ name:"LH Owl Flight", scene:"SCENE_LAKE_HYLIA", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_LH_LAB:{ name:"LH Lab", scene:"SCENE_LAKESIDE_LABORATORY", time:false,
      events:[],
      checks:[
      ["RC_LH_LAB_DIVE", () => ((L.HasItem("RG_GOLDEN_SCALE") || (L.trick("RT_LH_LAB_DIVING") && L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.HasItem("RG_BRONZE_SCALE"))) && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_LH_TRADE_FROG", () => (L.IsAdult && L.CanUse("RG_EYEBALL_FROG"))],
      ["RC_LH_GS_LAB_CRATE", () => (L.CanUse("RG_IRON_BOOTS") && L.CanUse("RG_HOOKSHOT") && L.CanBreakCrates())],
      ["RC_LH_LAB_FRONT_RUPEE", () => (L.CanUse("RG_IRON_BOOTS") || L.HasItem("RG_GOLDEN_SCALE"))],
      ["RC_LH_LAB_LEFT_RUPEE", () => (L.CanUse("RG_IRON_BOOTS") || L.HasItem("RG_GOLDEN_SCALE"))],
      ["RC_LH_LAB_RIGHT_RUPEE", () => (L.CanUse("RG_IRON_BOOTS") || L.HasItem("RG_GOLDEN_SCALE"))],
      ["RC_LH_LAB_CRATE", () => (L.CanUse("RG_IRON_BOOTS") && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_LAKE_HYLIA", () => true]
    ] },
    RR_LH_FISHING_POND:{ name:"LH Fishing Hole", scene:"SCENE_FISHING_POND", time:false,
      events:[],
      checks:[
      ["RC_LH_CHILD_FISHING", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsChild)],
      ["RC_LH_CHILD_FISH_1", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_2", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_3", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_4", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_5", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_6", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_7", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_8", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_9", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_10", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_11", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_12", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_13", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_14", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_FISH_15", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_LOACH_1", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_CHILD_LOACH_2", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && (L.IsChild || !L.opt("RSK_FISHSANITY_AGE_SPLIT")))],
      ["RC_LH_ADULT_FISHING", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult)],
      ["RC_LH_ADULT_FISH_1", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_2", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_3", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_4", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_5", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_6", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_7", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_8", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_9", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_10", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_11", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_12", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_13", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_14", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_FISH_15", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_ADULT_LOACH", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsAdult && L.opt("RSK_FISHSANITY_AGE_SPLIT"))],
      ["RC_LH_HYRULE_LOACH", () => (L.CanUse("RG_FISHING_POLE") && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_FISHING_POLE_HINT", () => (L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      exits:[
      ["RR_LH_FISHING_ISLAND", () => true]
    ] },
    RR_LH_GROTTO:{ name:"LH Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_LH_DEKU_SCRUB_GROTTO_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LH_DEKU_SCRUB_GROTTO_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LH_DEKU_SCRUB_GROTTO_CENTER", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LH_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_LAKE_HYLIA", () => true]
    ] },
    RR_LON_LON_RANCH:{ name:"Lon Lon Ranch", scene:"SCENE_LON_LON_RANCH", time:false,
      events:[
      ["LOGIC_FREED_EPONA", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.CanUse("RG_EPONAS_SONG") && L.IsAdult && L.AtDay)],
      ["LOGIC_LINKS_COW", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.CanUse("RG_EPONAS_SONG") && L.IsAdult && L.AtDay)]
    ],
      checks:[
      ["RC_SONG_FROM_MALON", () => (L.IsChild && L.HasItem("RG_ZELDAS_LETTER") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_FAIRY_OCARINA") && L.AtDay)],
      ["RC_LLR_GS_TREE", () => (L.IsChild && L.CanBonkTrees() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_LLR_GS_RAIN_SHED", () => (L.IsChild && L.CanGetNightTimeGS() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_LLR_GS_HOUSE_WINDOW", () => (L.IsChild && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())],
      ["RC_LLR_GS_BACK_WALL", () => (L.IsChild && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())],
      ["RC_LLR_FRONT_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_LLR_FRONT_POT_2", () => (L.IsChild && L.CanBreakPots())],
      ["RC_LLR_FRONT_POT_3", () => (L.IsChild && L.CanBreakPots())],
      ["RC_LLR_FRONT_POT_4", () => (L.IsChild && L.CanBreakPots())],
      ["RC_LLR_RAIN_SHED_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_LLR_RAIN_SHED_POT_2", () => (L.IsChild && L.CanBreakPots())],
      ["RC_LLR_RAIN_SHED_POT_3", () => (L.IsChild && L.CanBreakPots())],
      ["RC_LLR_NEAR_TREE_CRATE", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_LLR_TREE", () => (L.IsChild && L.CanBonkTrees())]
    ],
      exits:[
      ["RR_HYRULE_FIELD", () => true],
      ["RR_LLR_TALONS_HOUSE", () => (L.CanOpenOverworldDoor("RG_TALONS_HOUSE_KEY"))],
      ["RR_LLR_STABLES", () => (L.CanOpenOverworldDoor("RG_STABLES_KEY"))],
      ["RR_LLR_TOWER", () => (L.CanOpenOverworldDoor("RG_BACK_TOWER_KEY"))],
      ["RR_LLR_GROTTO", () => (L.IsChild)]
    ] },
    RR_LLR_TALONS_HOUSE:{ name:"LLR Talons House", scene:"SCENE_LON_LON_BUILDINGS", time:false,
      events:[],
      checks:[
      ["RC_LLR_TALONS_CHICKENS", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.IsChild && L.AtDay && L.HasItem("RG_ZELDAS_LETTER") && L.HasItem("RG_POWER_BRACELET"))],
      ["RC_LLR_TALONS_HOUSE_POT_1", () => (L.HasItem("RG_POWER_BRACELET") || L.CanUseSword())],
      ["RC_LLR_TALONS_HOUSE_POT_2", () => (L.HasItem("RG_POWER_BRACELET") || L.CanUseSword())],
      ["RC_LLR_TALONS_HOUSE_POT_3", () => (L.HasItem("RG_POWER_BRACELET") || L.CanUseSword())]
    ],
      exits:[
      ["RR_LON_LON_RANCH", () => true]
    ] },
    RR_LLR_STABLES:{ name:"LLR Stables", scene:"SCENE_STABLE", time:false,
      events:[],
      checks:[
      ["RC_LLR_STABLES_LEFT_COW", () => (L.CanUse("RG_EPONAS_SONG"))],
      ["RC_LLR_STABLES_RIGHT_COW", () => (L.CanUse("RG_EPONAS_SONG"))]
    ],
      exits:[
      ["RR_LON_LON_RANCH", () => true]
    ] },
    RR_LLR_TOWER:{ name:"LLR Tower", scene:"SCENE_LON_LON_BUILDINGS", time:false,
      events:[],
      checks:[
      ["RC_LLR_FREESTANDING_POH", () => (L.IsChild && L.HasItem("RG_POWER_BRACELET") && L.HasItem("RG_CRAWL"))],
      ["RC_LLR_TOWER_LEFT_COW", () => (L.CanUse("RG_EPONAS_SONG"))],
      ["RC_LLR_TOWER_RIGHT_COW", () => (L.CanUse("RG_EPONAS_SONG"))]
    ],
      exits:[
      ["RR_LON_LON_RANCH", () => true]
    ] },
    RR_LLR_GROTTO:{ name:"LLR Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_LLR_DEKU_SCRUB_GROTTO_LEFT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LLR_DEKU_SCRUB_GROTTO_RIGHT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LLR_DEKU_SCRUB_GROTTO_CENTER", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LLR_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_LON_LON_RANCH", () => true]
    ] },
    RR_LW_FOREST_EXIT:{ name:"LW Forest Exit", scene:"SCENE_LOST_WOODS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KF_OUTSIDE_LOST_WOODS", () => true]
    ] },
    RR_THE_LOST_WOODS:{ name:"Lost Woods", scene:"SCENE_LOST_WOODS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BRIDGE_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["LOGIC_BUG_ACCESS", () => (L.IsChild && L.CanCutShrubs())],
      ["LOGIC_BORROW_SPOOKY_MASK", () => (L.IsChild && L.Get("LOGIC_BORROW_SKULL_MASK") && L.CanUse("RG_SARIAS_SONG") && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_KOKIRI") && L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      checks:[
      ["RC_LW_SKULL_KID", () => (L.IsChild && L.CanUse("RG_SARIAS_SONG"))],
      ["RC_LW_TRADE_COJIRO", () => (L.IsAdult && L.CanUse("RG_COJIRO"))],
      ["RC_LW_TRADE_ODD_POTION", () => (L.IsAdult && L.CanUse("RG_ODD_POTION"))],
      ["RC_LW_OCARINA_MEMORY_GAME", () => (L.IsChild && L.HasItem("RG_FAIRY_OCARINA") && L.OcarinaButtons() >= 5)],
      ["RC_LW_TARGET_IN_WOODS", () => (L.IsChild && L.CanUse("RG_FAIRY_SLINGSHOT"))],
      ["RC_LW_GS_BEAN_PATCH_NEAR_BRIDGE", () => (L.CanSpawnSoilSkull("RG_LOST_WOODS_BRIDGE_BEAN_SOUL") && L.CanAttack())],
      ["RC_LW_SHORTCUT_RUPEE_1", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_SHORTCUT_RUPEE_2", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_SHORTCUT_RUPEE_3", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_SHORTCUT_RUPEE_4", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_SHORTCUT_RUPEE_5", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_SHORTCUT_RUPEE_6", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_SHORTCUT_RUPEE_7", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_SHORTCUT_RUPEE_8", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_LW_BEAN_SPROUT_NEAR_BRIDGE_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BRIDGE_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_BEAN_SPROUT_NEAR_BRIDGE_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BRIDGE_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_BEAN_SPROUT_NEAR_BRIDGE_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BRIDGE_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_SHORTCUT_STORMS_FAIRY", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_LW_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_LW_GRASS_3", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_LW_FOREST_EXIT", () => true],
      ["RR_LW_UNDER_BRIDGE", () => true],
      ["RR_GC_WOODS_WARP", () => true],
      ["RR_LW_BRIDGE", () => ((L.IsAdult && (L.CanPlantBean("RR_THE_LOST_WOODS", "RG_LOST_WOODS_BRIDGE_BEAN_SOUL") || L.trick("RT_LW_BRIDGE"))) || L.CanUse("RG_HOVER_BOOTS") || L.CanUse("RG_LONGSHOT"))],
      ["RR_ZR_FROM_SHORTCUT", () => (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS") || (L.trick("RT_LOST_WOOD_NAVI_DIVE") && L.IsChild && L.HasItem("RG_BRONZE_SCALE") && L.CanJumpslash()))],
      ["RR_LW_BEYOND_MIDO", () => (L.IsChild || L.CanUse("RG_SARIAS_SONG") || L.trick("RT_LW_MIDO_BACKFLIP"))],
      ["RR_LW_NEAR_SHORTCUTS_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_LW_UNDER_BRIDGE:{ name:"Lost Woods Under the Bridge", scene:"SCENE_LOST_WOODS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())]
    ],
      checks:[
      ["RC_LW_DEKU_SCRUB_NEAR_BRIDGE", () => (L.IsChild && L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LW_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_LW_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_LW_BRIDGE", () => (L.CanUse("RG_LONGSHOT"))],
      ["RR_THE_LOST_WOODS", () => (L.CanClimbLadder())]
    ] },
    RR_LW_BEYOND_MIDO:{ name:"LW Beyond Mido", scene:"SCENE_LOST_WOODS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CanUse("RG_STICKS") || (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS")))]
    ],
      checks:[
      ["RC_LW_DEKU_SCRUB_NEAR_DEKU_THEATER_RIGHT", () => (L.IsChild && L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LW_DEKU_SCRUB_NEAR_DEKU_THEATER_LEFT", () => (L.IsChild && L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LW_GS_ABOVE_THEATER", () => (L.IsAdult && ((L.CanPlantBean("RR_LW_BEYOND_MIDO", "RG_LOST_WOODS_BEAN_SOUL") && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA")) || (L.trick("RT_LW_GS_BEAN") && L.CanUse("RG_HOOKSHOT") && (L.CanUse("RG_LONGSHOT") || L.CanUse("RG_FAIRY_BOW") || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_BOMBCHU_5") || L.CanUse("RG_DINS_FIRE")))) && L.CanGetNightTimeGS())],
      ["RC_LW_GS_BEAN_PATCH_NEAR_THEATER", () => (L.CanSpawnSoilSkull("RG_LOST_WOODS_BEAN_SOUL") && (L.CanGetEnemyDrop("RE_GOLD_SKULLTULA") || ((L.opt("RSK_SHUFFLE_SCRUBS") === 0) && L.CanReflectNuts())))],
      ["RC_LW_BOULDER_RUPEE", () => (L.BlastOrSmash())],
      ["RC_LW_BEAN_SPROUT_NEAR_THEATER_FAIRY_1", () => (L.IsChild && L.HasItem("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_BEAN_SPROUT_NEAR_THEATER_FAIRY_2", () => (L.IsChild && L.HasItem("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_BEAN_SPROUT_NEAR_THEATER_FAIRY_3", () => (L.IsChild && L.HasItem("RG_MAGIC_BEAN") && L.HasItem("RG_LOST_WOODS_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_LW_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_LW_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_LW_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_LW_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_LW_GRASS_9", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_LW_FOREST_EXIT", () => true],
      ["RR_THE_LOST_WOODS", () => (L.IsChild || L.CanUse("RG_SARIAS_SONG"))],
      ["RR_SFM_ENTRYWAY", () => true],
      ["RR_DEKU_THEATER", () => true],
      ["RR_LW_SCRUBS_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_LW_NEAR_SHORTCUTS_GROTTO:{ name:"LW Near Shortcuts Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_GOSSIP_STONE", () => true],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_LW_NEAR_SHORTCUTS_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_THE_LOST_WOODS", () => true]
    ] },
    RR_DEKU_THEATER:{ name:"Deku Theater", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_DEKU_THEATER_SKULL_MASK", () => (L.CanUse("RG_SKULL_MASK"))],
      ["RC_DEKU_THEATER_MASK_OF_TRUTH", () => (L.CanUse("RG_MASK_OF_TRUTH") && L.HasItem("RG_SPEAK_DEKU"))]
    ],
      exits:[
      ["RR_LW_BEYOND_MIDO", () => true]
    ] },
    RR_LW_SCRUBS_GROTTO:{ name:"LW Scrubs Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_LW_DEKU_SCRUB_GROTTO_REAR", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LW_DEKU_SCRUB_GROTTO_FRONT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_LW_DEKU_SCRUB_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())],
      ["RC_LW_DEKU_SCRUB_GROTTO_SUN_FAIRY", () => (L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_LW_BEYOND_MIDO", () => true]
    ] },
    RR_LW_BRIDGE_FROM_FOREST:{ name:"LW Bridge From Forest", scene:"SCENE_LOST_WOODS", time:false,
      events:[],
      checks:[
      ["RC_LW_GIFT_FROM_SARIA", () => true]
    ],
      exits:[
      ["RR_LW_BRIDGE", () => true]
    ] },
    RR_LW_BRIDGE:{ name:"LW Bridge", scene:"SCENE_LOST_WOODS", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KOKIRI_FOREST", () => true],
      ["RR_HYRULE_FIELD", () => true],
      ["RR_THE_LOST_WOODS", () => (L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_MARKET_ENTRANCE:{ name:"Market Entrance", scene:"SCENE_MARKET_ENTRANCE_DAY", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_HYRULE_FIELD", () => (L.IsAdult || L.AtDay)],
      ["RR_THE_MARKET", () => true],
      ["RR_MARKET_GUARD_HOUSE", () => (L.CanOpenOverworldDoor("RG_GUARD_HOUSE_KEY"))]
    ] },
    RR_THE_MARKET:{ name:"Market", scene:"SCENE_MARKET_DAY", time:false,
      events:[],
      checks:[
      ["RC_MARKET_GRASS_1", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MARKET_GRASS_2", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MARKET_GRASS_3", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MARKET_GRASS_4", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MARKET_GRASS_5", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MARKET_GRASS_6", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MARKET_GRASS_7", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MARKET_GRASS_8", () => (L.IsChild && (L.CanUseSword() || L.HasItem("RG_GORONS_BRACELET")))],
      ["RC_MK_NEAR_BAZAAR_CRATE_1", () => (L.IsChild)],
      ["RC_MK_NEAR_BAZAAR_CRATE_2", () => (L.IsChild)],
      ["RC_MK_SHOOTING_GALLERY_CRATE_1", () => (L.IsChild)],
      ["RC_MK_SHOOTING_GALLERY_CRATE_2", () => (L.IsChild)],
      ["RC_MARKET_TREE", () => (L.IsChild && L.CanBonkTrees())]
    ],
      exits:[
      ["RR_MARKET_ENTRANCE", () => true],
      ["RR_TOT_ENTRANCE", () => true],
      ["RR_CASTLE_GROUNDS", () => true],
      ["RR_MARKET_BAZAAR", () => (L.IsChild && L.AtDay && L.CanOpenOverworldDoor("RG_MARKET_BAZAAR_KEY"))],
      ["RR_MARKET_MASK_SHOP", () => (L.IsChild && L.AtDay && L.CanOpenOverworldDoor("RG_MASK_SHOP_KEY"))],
      ["RR_MARKET_SHOOTING_GALLERY", () => (L.IsChild && L.AtDay && L.CanOpenOverworldDoor("RG_MARKET_SHOOTING_GALLERY_KEY"))],
      ["RR_MARKET_BOMBCHU_BOWLING", () => (L.IsChild && L.CanOpenOverworldDoor("RG_BOMBCHU_BOWLING_KEY"))],
      ["RR_MARKET_TREASURE_CHEST_GAME", () => (L.IsChild && L.AtNight && L.CanOpenOverworldDoor("RG_TREASURE_CHEST_GAME_BUILDING_KEY"))],
      ["RR_MARKET_POTION_SHOP", () => (L.IsChild && L.AtDay && L.CanOpenOverworldDoor("RG_MARKET_POTION_SHOP_KEY"))],
      ["RR_MARKET_BACK_ALLEY", () => (L.IsChild)]
    ] },
    RR_MARKET_BACK_ALLEY:{ name:"Market Back Alley", scene:"SCENE_BACK_ALLEY_DAY", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_THE_MARKET", () => true],
      ["RR_MARKET_BOMBCHU_SHOP", () => (L.AtNight && L.CanOpenOverworldDoor("RG_BOMBCHU_SHOP_KEY"))],
      ["RR_MARKET_DOG_LADY_HOUSE", () => (L.CanOpenOverworldDoor("RG_RICHARDS_HOUSE_KEY"))],
      ["RR_MARKET_MAN_IN_GREEN_HOUSE", () => (L.AtNight && L.CanOpenOverworldDoor("RG_ALLEY_HOUSE_KEY"))]
    ] },
    RR_MARKET_GUARD_HOUSE:{ name:"Market Guard House", scene:"SCENE_MARKET_GUARD_HOUSE", time:false,
      events:[
      ["LOGIC_CAN_EMPTY_BIG_POES", () => (L.IsAdult)]
    ],
      checks:[
      ["RC_MARKET_10_BIG_POES", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN") && (L.Get("LOGIC_BIG_POE_KILL") || L.BigPoes >= L.opt("RSK_BIG_POE_COUNT")))],
      ["RC_MARKET_GS_GUARD_HOUSE", () => (L.IsChild && L.CanBreakCrates() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_2", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_3", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_4", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_5", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_6", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_7", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_8", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_9", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_10", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_11", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_12", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_13", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_14", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_15", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_16", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_17", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_18", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_19", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_20", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_21", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_22", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_23", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_24", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_25", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_26", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_27", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_28", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_29", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_30", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_31", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_32", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_33", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_34", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_35", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_36", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_37", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_38", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_39", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_40", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_41", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_42", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_43", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CHILD_POT_44", () => (L.IsChild && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_1", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_2", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_3", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_4", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_5", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_6", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_7", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_8", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_9", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_10", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_ADULT_POT_11", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_MK_GUARD_HOUSE_CRATE_1", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_MK_GUARD_HOUSE_CRATE_2", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_MK_GUARD_HOUSE_CRATE_3", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_MK_GUARD_HOUSE_CRATE_4", () => (L.IsChild && L.CanBreakCrates())],
      ["RC_MK_GUARD_HOUSE_CRATE_5", () => (L.IsChild && L.CanBreakCrates())]
    ],
      exits:[
      ["RR_MARKET_ENTRANCE", () => true]
    ] },
    RR_MARKET_BAZAAR:{ name:"Market Bazaar", scene:"SCENE_BAZAAR", time:false,
      events:[],
      checks:[
      ["RC_MARKET_BAZAAR_ITEM_1", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BAZAAR_ITEM_2", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BAZAAR_ITEM_3", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BAZAAR_ITEM_4", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BAZAAR_ITEM_5", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BAZAAR_ITEM_6", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BAZAAR_ITEM_7", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BAZAAR_ITEM_8", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_THE_MARKET", () => true]
    ] },
    RR_MARKET_MASK_SHOP:{ name:"Market Mask Shop", scene:"SCENE_HAPPY_MASK_SHOP", time:false,
      events:[
      ["LOGIC_CAN_BORROW_MASKS", () => (L.HasItem("RG_ZELDAS_LETTER") && L.HasItem("RG_SPEAK_HYLIAN") && L.Get("LOGIC_KAKARIKO_GATE_OPEN"))],
      ["LOGIC_BORROW_SKULL_MASK", () => ((L.opt("RSK_MASK_QUEST") === 1) && L.HasItem("RG_SPEAK_HYLIAN") && L.Get("LOGIC_CAN_BORROW_MASKS"))],
      ["LOGIC_BORROW_SPOOKY_MASK", () => ((L.opt("RSK_MASK_QUEST") === 1) && L.HasItem("RG_SPEAK_HYLIAN") && L.Get("LOGIC_CAN_BORROW_MASKS"))],
      ["LOGIC_BORROW_BUNNY_HOOD", () => ((L.opt("RSK_MASK_QUEST") === 1) && L.HasItem("RG_SPEAK_HYLIAN") && L.Get("LOGIC_CAN_BORROW_MASKS"))],
      ["LOGIC_BORROW_RIGHT_MASKS", () => ((L.opt("RSK_MASK_QUEST") === 1) && L.HasItem("RG_SPEAK_HYLIAN") && L.Get("LOGIC_CAN_BORROW_MASKS"))]
    ],
      checks:[
      ["RC_MASK_SHOP_HINT", () => true]
    ],
      exits:[
      ["RR_THE_MARKET", () => true]
    ] },
    RR_MARKET_SHOOTING_GALLERY:{ name:"Market Shooting Gallery", scene:"SCENE_SHOOTING_GALLERY", time:false,
      events:[],
      checks:[
      ["RC_MARKET_SHOOTING_GALLERY_REWARD", () => (L.IsChild && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      exits:[
      ["RR_THE_MARKET", () => true]
    ] },
    RR_MARKET_BOMBCHU_BOWLING:{ name:"Market Bombchu Bowling", scene:"SCENE_BOMBCHU_BOWLING_ALLEY", time:false,
      events:[
      ["LOGIC_COULD_PLAY_BOWLING", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      checks:[
      ["RC_MARKET_BOMBCHU_BOWLING_FIRST_PRIZE", () => (L.Get("LOGIC_COULD_PLAY_BOWLING") && L.BombchusEnabled())],
      ["RC_MARKET_BOMBCHU_BOWLING_SECOND_PRIZE", () => (L.Get("LOGIC_COULD_PLAY_BOWLING") && L.BombchusEnabled())]
    ],
      exits:[
      ["RR_THE_MARKET", () => true]
    ] },
    RR_MARKET_POTION_SHOP:{ name:"Market Potion Shop", scene:"SCENE_POTION_SHOP_MARKET", time:false,
      events:[],
      checks:[
      ["RC_MARKET_POTION_SHOP_ITEM_1", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_POTION_SHOP_ITEM_2", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_POTION_SHOP_ITEM_3", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_POTION_SHOP_ITEM_4", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_POTION_SHOP_ITEM_5", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_POTION_SHOP_ITEM_6", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_POTION_SHOP_ITEM_7", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_POTION_SHOP_ITEM_8", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_THE_MARKET", () => true]
    ] },
    RR_MARKET_TREASURE_CHEST_GAME:{ name:"Market Treasure Chest Game", scene:"SCENE_TREASURE_BOX_SHOP", time:false,
      events:[],
      checks:[
      ["RC_GREG_HINT", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_MARKET_TREASURE_CHEST_GAME_REWARD", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && ((L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME")) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 6)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_KEY_1", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_ITEM_1", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_KEY_2", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 2)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_ITEM_2", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 2)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_KEY_3", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 3)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_ITEM_3", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 3)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_KEY_4", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 4)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_ITEM_4", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 4)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_KEY_5", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 5)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))],
      ["RC_MARKET_TREASURE_CHEST_GAME_ITEM_5", () => (L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_HYLIAN") && L.HasItem("RG_OPEN_CHEST") && (((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 1) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 5)) || ((L.opt("RSK_SHUFFLE_CHEST_MINIGAME") === 2) && L.SmallKeys("SCENE_TREASURE_BOX_SHOP", 1)) || (L.CanUse("RG_LENS_OF_TRUTH") && !L.opt("RSK_SHUFFLE_CHEST_MINIGAME"))))]
    ],
      exits:[
      ["RR_THE_MARKET", () => true]
    ] },
    RR_MARKET_BOMBCHU_SHOP:{ name:"Market Bombchu Shop", scene:"SCENE_BOMBCHU_SHOP", time:false,
      events:[],
      checks:[
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_1", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_2", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_3", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_4", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_5", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_6", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_7", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_MARKET_BOMBCHU_SHOP_ITEM_8", () => (L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_MARKET_BACK_ALLEY", () => true]
    ] },
    RR_MARKET_DOG_LADY_HOUSE:{ name:"Market Dog Lady House", scene:"SCENE_DOG_LADY_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_MARKET_LOST_DOG", () => (L.IsChild && L.AtNight && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["RC_MK_LOST_DOG_HOUSE_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_MARKET_BACK_ALLEY", () => true]
    ] },
    RR_MARKET_MAN_IN_GREEN_HOUSE:{ name:"Market Man in Green House", scene:"SCENE_BACK_ALLEY_HOUSE", time:false,
      events:[],
      checks:[
      ["RC_MK_BACK_ALLEY_HOUSE_POT_1", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["RC_MK_BACK_ALLEY_HOUSE_POT_2", () => (L.HasItem("RG_POWER_BRACELET"))],
      ["RC_MK_BACK_ALLEY_HOUSE_POT_3", () => (L.HasItem("RG_POWER_BRACELET"))]
    ],
      exits:[
      ["RR_MARKET_BACK_ALLEY", () => true]
    ] },
    RR_SFM_ENTRYWAY:{ name:"SFM Entryway", scene:"SCENE_SACRED_FOREST_MEADOW", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_LW_BEYOND_MIDO", () => true],
      ["RR_SACRED_FOREST_MEADOW", () => (L.IsAdult || L.CanKillEnemy("RE_WOLFOS"))],
      ["RR_SFM_WOLFOS_GROTTO", () => (L.CanOpenBombGrotto())]
    ] },
    RR_SFM_ABOVE_MAZE:{ name:"SFM Maze", scene:"SCENE_SACRED_FOREST_MEADOW", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())]
    ],
      checks:[
      ["RC_SFM_GS", () => (L.IsAdult && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())],
      ["RC_SFM_MAZE_LOWER_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_SFM_MAZE_LOWER_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_SFM_MAZE_UPPER_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_SFM_MAZE_UPPER_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_SFM_MAZE_LOWER_GOSSIP_STONE", () => true],
      ["RC_SFM_MAZE_UPPER_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_SFM_ENTRYWAY", () => true],
      ["RR_SFM_OUTSIDE_FAIRY_GROTTO", () => true],
      ["RR_SACRED_FOREST_MEADOW", () => true]
    ] },
    RR_SACRED_FOREST_MEADOW:{ name:"Sacred Forest Meadow", scene:"SCENE_SACRED_FOREST_MEADOW", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())]
    ],
      checks:[
      ["RC_SONG_FROM_SARIA", () => (L.IsChild && L.HasItem("RG_ZELDAS_LETTER"))],
      ["RC_SHEIK_IN_FOREST", () => (L.IsAdult)],
      ["RC_SFM_SARIA_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_SFM_SARIA_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_SFM_SARIA_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_FOREST_TEMPLE_ENTRYWAY", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_SFM_ENTRYWAY", () => true],
      ["RR_SFM_ABOVE_MAZE", () => (L.CanClimbLadder() || (L.IsAdult && L.CanGroundJump()))],
      ["RR_SFM_STORMS_GROTTO", () => (L.CanOpenStormsGrotto())]
    ] },
    RR_SFM_OUTSIDE_FAIRY_GROTTO:{ name:"SFM Outside Fairy Grotto", scene:"SCENE_SACRED_FOREST_MEADOW", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SFM_FAIRY_GROTTO", () => true],
      ["RR_SFM_ABOVE_MAZE", () => (L.CanClimbLadder())]
    ] },
    RR_SFM_FAIRY_GROTTO:{ name:"SFM Fairy Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_SFM_FAIRY_GROTTO_FAIRY_1", () => true],
      ["RC_SFM_FAIRY_GROTTO_FAIRY_2", () => true],
      ["RC_SFM_FAIRY_GROTTO_FAIRY_3", () => true],
      ["RC_SFM_FAIRY_GROTTO_FAIRY_4", () => true],
      ["RC_SFM_FAIRY_GROTTO_FAIRY_5", () => true],
      ["RC_SFM_FAIRY_GROTTO_FAIRY_6", () => true],
      ["RC_SFM_FAIRY_GROTTO_FAIRY_7", () => true],
      ["RC_SFM_FAIRY_GROTTO_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_SFM_OUTSIDE_FAIRY_GROTTO", () => true]
    ] },
    RR_SFM_WOLFOS_GROTTO:{ name:"SFM Wolfos Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_SFM_WOLFOS_GROTTO_CHEST", () => (L.CanKillEnemy("RE_WOLFOS", "ED_CLOSE", true, 2) && L.HasItem("RG_OPEN_CHEST"))]
    ],
      exits:[
      ["RR_SFM_ENTRYWAY", () => true]
    ] },
    RR_SFM_STORMS_GROTTO:{ name:"SFM Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_SFM_DEKU_SCRUB_GROTTO_REAR", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_SFM_DEKU_SCRUB_GROTTO_FRONT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_SFM_STORMS_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_SACRED_FOREST_MEADOW", () => true]
    ] },
    RR_TOT_ENTRANCE:{ name:"ToT Entrance", scene:"SCENE_TEMPLE_OF_TIME_EXTERIOR_DAY", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())]
    ],
      checks:[
      ["RC_TOT_LEFTMOST_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns() || (L.CanUse("RG_SUNS_SONG") && L.IsAdult))],
      ["RC_TOT_LEFTMOST_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_TOT_LEFT_CENTER_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns() || (L.CanUse("RG_SUNS_SONG") && L.IsAdult))],
      ["RC_TOT_LEFT_CENTER_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_TOT_RIGHT_CENTER_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns() || (L.CanUse("RG_SUNS_SONG") && L.IsAdult))],
      ["RC_TOT_RIGHT_CENTER_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_TOT_RIGHTMOST_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns() || (L.CanUse("RG_SUNS_SONG") && L.IsAdult))],
      ["RC_TOT_RIGHTMOST_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_TOT_LEFTMOST_GOSSIP_STONE", () => true],
      ["RC_TOT_LEFT_CENTER_GOSSIP_STONE", () => true],
      ["RC_TOT_RIGHT_CENTER_GOSSIP_STONE", () => true],
      ["RC_TOT_RIGHTMOST_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_THE_MARKET", () => true],
      ["RR_TEMPLE_OF_TIME", () => true]
    ] },
    RR_TEMPLE_OF_TIME:{ name:"Temple of Time", scene:"SCENE_TEMPLE_OF_TIME", time:false,
      events:[],
      checks:[
      ["RC_TOT_LIGHT_ARROWS_CUTSCENE", () => (L.IsAdult && L.CanTriggerLACS())],
      ["RC_ALTAR_HINT_CHILD", () => (L.IsChild)],
      ["RC_ALTAR_HINT_ADULT", () => (L.IsAdult)],
      ["RC_TOT_SHEIK_HINT", () => (L.IsAdult && L.HasItem("RG_SPEAK_HYLIAN"))]
    ],
      exits:[
      ["RR_TOT_ENTRANCE", () => true],
      ["RR_TOT_BEYOND_DOOR_OF_TIME", () => ((L.opt("RSK_DOOR_OF_TIME") === 2) || (L.CanUse("RG_SONG_OF_TIME") && ((L.opt("RSK_DOOR_OF_TIME") === 1) || (L.StoneCount() == 3 && L.HasItem("RG_OCARINA_OF_TIME")))))]
    ] },
    RR_TOT_BEYOND_DOOR_OF_TIME:{ name:"Beyond Door of Time", scene:"SCENE_TEMPLE_OF_TIME", time:false,
      events:[],
      checks:[
      ["RC_TOT_MASTER_SWORD", () => (L.IsAdult)],
      ["RC_GIFT_FROM_RAURU", () => (L.IsAdult)],
      ["RC_SHEIK_AT_TEMPLE", () => (L.HasItem("RG_FOREST_MEDALLION") && L.IsAdult)]
    ],
      exits:[
      ["RR_TEMPLE_OF_TIME", () => true]
    ] },
    RR_TH_1_TORCH_CELL:{ name:"Thieves Hideout 1 Torch Cell", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[
      ["LOGIC_TH_COULD_FREE_1_TORCH_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR") && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["LOGIC_TH_RESCUED_ALL_CARPENTERS", () => (L.SmallKeys("SCENE_THIEVES_HIDEOUT", (L.opt("RSK_GERUDO_FORTRESS") === 0) ? 4 : 1) && L.Get("LOGIC_TH_COULD_FREE_1_TORCH_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DOUBLE_CELL_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DEAD_END_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_SLOPE_CARPENTER"))]
    ],
      checks:[
      ["RC_TH_1_TORCH_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR"))],
      ["RC_TH_1_TORCH_CELL_RIGHT_POT", () => (L.CanBreakPots())],
      ["RC_TH_1_TORCH_CELL_MID_POT", () => (L.CanBreakPots())],
      ["RC_TH_1_TORCH_CELL_LEFT_POT", () => (L.CanBreakPots())],
      ["RC_TH_1_TORCH_CELL_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_FREED_CARPENTERS", () => (L.Get("LOGIC_TH_RESCUED_ALL_CARPENTERS"))]
    ],
      exits:[
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_NEAR_GROTTO", () => true]
    ] },
    RR_TH_DOUBLE_CELL:{ name:"Thieves Hideout Double Cell", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[
      ["LOGIC_TH_COULD_FREE_DOUBLE_CELL_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR") && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["LOGIC_TH_RESCUED_ALL_CARPENTERS", () => (L.SmallKeys("SCENE_THIEVES_HIDEOUT", (L.opt("RSK_GERUDO_FORTRESS") === 0) ? 4 : 1) && L.Get("LOGIC_TH_COULD_FREE_1_TORCH_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DOUBLE_CELL_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DEAD_END_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_SLOPE_CARPENTER"))]
    ],
      checks:[
      ["RC_TH_DOUBLE_CELL_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR"))],
      ["RC_TH_NEAR_DOUBLE_CELL_RIGHT_POT", () => (L.CanBreakPots())],
      ["RC_TH_NEAR_DOUBLE_CELL_MID_POT", () => (L.CanBreakPots())],
      ["RC_TH_NEAR_DOUBLE_CELL_LEFT_POT", () => (L.CanBreakPots())],
      ["RC_TH_RIGHTMOST_JAILED_POT", () => (L.CanBreakPots())],
      ["RC_TH_RIGHT_MIDDLE_JAILED_POT", () => (L.CanBreakPots())],
      ["RC_TH_LEFT_MIDDLE_JAILED_POT", () => (L.CanBreakPots())],
      ["RC_TH_LEFTMOST_JAILED_POT", () => (L.CanBreakPots())],
      ["RC_TH_DOUBLE_CELL_LEFT_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_DOUBLE_CELL_RIGHT_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_FREED_CARPENTERS", () => (L.Get("LOGIC_TH_RESCUED_ALL_CARPENTERS"))]
    ],
      exits:[
      ["RR_GF_OUTSKIRTS", () => true],
      ["RR_GF_ABOVE_GTG", () => true],
      ["RR_GF_TOP_OF_LOWER_VINES", () => true]
    ] },
    RR_TH_DEAD_END_CELL:{ name:"Thieves Hideout Dead End Cell", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[
      ["LOGIC_TH_COULD_FREE_DEAD_END_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR") && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["LOGIC_TH_RESCUED_ALL_CARPENTERS", () => (L.SmallKeys("SCENE_THIEVES_HIDEOUT", (L.opt("RSK_GERUDO_FORTRESS") === 0) ? 4 : 1) && L.Get("LOGIC_TH_COULD_FREE_1_TORCH_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DOUBLE_CELL_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DEAD_END_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_SLOPE_CARPENTER"))]
    ],
      checks:[
      ["RC_TH_DEAD_END_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR"))],
      ["RC_TH_DEAD_END_CELL_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_FREED_CARPENTERS", () => (L.Get("LOGIC_TH_RESCUED_ALL_CARPENTERS"))]
    ],
      exits:[
      ["RR_GF_BELOW_GS", () => true]
    ] },
    RR_TH_STEEP_SLOPE_CELL:{ name:"Thieves Hideout Steep Slope Cell", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[
      ["LOGIC_TH_COULD_FREE_SLOPE_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR") && L.HasItem("RG_SPEAK_HYLIAN"))],
      ["LOGIC_TH_RESCUED_ALL_CARPENTERS", () => (L.SmallKeys("SCENE_THIEVES_HIDEOUT", (L.opt("RSK_GERUDO_FORTRESS") === 0) ? 4 : 1) && L.Get("LOGIC_TH_COULD_FREE_1_TORCH_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DOUBLE_CELL_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_DEAD_END_CARPENTER") && L.Get("LOGIC_TH_COULD_FREE_SLOPE_CARPENTER"))]
    ],
      checks:[
      ["RC_TH_STEEP_SLOPE_CARPENTER", () => (L.CanKillEnemy("RE_GERUDO_WARRIOR"))],
      ["RC_TH_STEEP_SLOPE_RIGHT_POT", () => (L.CanBreakPots())],
      ["RC_TH_STEEP_SLOPE_LEFT_POT", () => (L.CanBreakPots())],
      ["RC_TH_FREED_CARPENTERS", () => (L.Get("LOGIC_TH_RESCUED_ALL_CARPENTERS"))]
    ],
      exits:[
      ["RR_GF_BOTTOM_OF_LOWER_VINES", () => true],
      ["RR_GF_NEAR_GROTTO", () => true]
    ] },
    RR_TH_KITCHEN_CORRIDOR:{ name:"Thieves Hideout Kitchen Corridor", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[],
      checks:[
      ["RC_TH_NEAR_KITCHEN_LEFTMOST_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_NEAR_KITCHEN_MID_LEFT_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_NEAR_KITCHEN_MID_RIGHT_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_NEAR_KITCHEN_RIGHTMOST_CRATE", () => (L.CanBreakCrates())]
    ],
      exits:[
      ["RR_GF_NEAR_GROTTO", () => true],
      ["RR_GF_ABOVE_GTG", () => true],
      ["RR_TH_KITCHEN_MAIN", () => (L.CanPassEnemy("RE_GERUDO_GUARD"))]
    ] },
    RR_TH_KITCHEN_MAIN:{ name:"Thieves Hideout Kitchen Bottom", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[],
      checks:[
      ["RC_TH_KITCHEN_POT_1", () => (L.CanBreakPots() && L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RC_TH_KITCHEN_POT_2", () => (L.CanBreakPots() && L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RC_TH_KITCHEN_CRATE", () => (L.CanBreakCrates() && L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RC_TH_KITCHEN_SUN_FAIRY", () => (L.CanPassEnemy("RE_GERUDO_GUARD") && L.CanUse("RG_SUNS_SONG"))]
    ],
      exits:[
      ["RR_TH_KITCHEN_CORRIDOR", () => (L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_TH_KITCHEN_BY_CORRIDOR", () => (L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_TH_KITCHEN_OPPOSITE_CORRIDOR", () => (L.CanPassEnemy("RE_GERUDO_GUARD"))]
    ] },
    RR_TH_KITCHEN_BY_CORRIDOR:{ name:"Thieves Hideout Kitchen Top By Corridor", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[],
      checks:[
      ["RC_TH_KITCHEN_POT_1", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_TH_KITCHEN_POT_2", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_TH_KITCHEN_MAIN", () => true],
      ["RR_TH_KITCHEN_OPPOSITE_CORRIDOR", () => (L.CanPassEnemy("RE_GERUDO_GUARD") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GF_TOP_OF_LOWER_VINES", () => true]
    ] },
    RR_TH_KITCHEN_OPPOSITE_CORRIDOR:{ name:"Thieves Hideout Kitchen Top Across From Corridor", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[],
      checks:[
      ["RC_TH_KITCHEN_POT_1", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_TH_KITCHEN_POT_2", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_TH_KITCHEN_MAIN", () => true],
      ["RR_TH_KITCHEN_BY_CORRIDOR", () => (L.CanPassEnemy("RE_GERUDO_GUARD") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_GF_NEAR_GS", () => true]
    ] },
    RR_TH_BREAK_ROOM:{ name:"Thieves Hideout Break Room", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[],
      checks:[
      ["RC_TH_BREAK_ROOM_FRONT_POT", () => ((L.CanPassEnemy("RE_BREAK_ROOM_GUARD") && L.CanBreakPots()) || (L.CanPassEnemy("RE_GERUDO_GUARD") && L.CanUse("RG_BOOMERANG")))],
      ["RC_TH_BREAK_ROOM_BACK_POT", () => ((L.CanPassEnemy("RE_BREAK_ROOM_GUARD") && L.CanBreakPots()) || (L.CanPassEnemy("RE_GERUDO_GUARD") && L.CanUse("RG_BOOMERANG")))],
      ["RC_TH_BREAK_HALLWAY_OUTER_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_BREAK_HALLWAY_INNER_CRATE", () => (L.CanBreakCrates())],
      ["RC_TH_BREAK_ROOM_RIGHT_CRATE", () => ((L.CanPassEnemy("RE_BREAK_ROOM_GUARD") && L.CanBreakCrates()) || (L.CanPassEnemy("RE_GERUDO_GUARD") && L.HasExplosives() && L.CanUse("RG_BOOMERANG")))],
      ["RC_TH_BREAK_ROOM_LEFT_CRATE", () => ((L.CanPassEnemy("RE_BREAK_ROOM_GUARD") && L.CanBreakCrates()) || (L.CanPassEnemy("RE_GERUDO_GUARD") && L.HasExplosives() && L.CanUse("RG_BOOMERANG")))]
    ],
      exits:[
      ["RR_GF_BELOW_CHEST", () => (L.CanPassEnemy("RE_GERUDO_GUARD"))],
      ["RR_TH_BREAK_ROOM_CORRIDOR", () => (L.CanUse("RG_HOOKSHOT"))]
    ] },
    RR_TH_BREAK_ROOM_CORRIDOR:{ name:"Thieves Hideout Break Room", scene:"SCENE_THIEVES_HIDEOUT", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_TH_BREAK_ROOM", () => (L.CanUse("RG_HOOKSHOT"))],
      ["RR_GF_ABOVE_JAIL", () => true]
    ] },
    RR_ZORAS_DOMAIN:{ name:"Zoras Domain", scene:"SCENE_ZORAS_DOMAIN", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns())],
      ["LOGIC_NUT_ACCESS", () => (L.CanBreakPots())],
      ["LOGIC_STICK_ACCESS", () => (L.IsChild && L.CanBreakPots())],
      ["LOGIC_FISH_ACCESS", () => (L.IsChild)],
      ["LOGIC_KING_ZORA_THAWED", () => (L.IsAdult && L.BlueFire())],
      ["LOGIC_DELIVER_RUTOS_LETTER", () => (L.CanUse("RG_RUTOS_LETTER") && L.IsChild && (L.opt("RSK_ZORAS_FOUNTAIN") !== 2))]
    ],
      checks:[
      ["RC_ZD_DIVING_MINIGAME", () => (L.HasItem("RG_BRONZE_SCALE") && L.HasItem("RG_CHILD_WALLET") && L.HasItem("RG_SPEAK_ZORA") && L.IsChild)],
      ["RC_ZD_CHEST", () => (L.IsChild && L.CanUse("RG_STICKS") && L.HasItem("RG_OPEN_CHEST"))],
      ["RC_ZD_KING_ZORA_THAWED", () => (L.IsAdult && L.Get("LOGIC_KING_ZORA_THAWED") && L.HasItem("RG_SPEAK_ZORA"))],
      ["RC_ZD_TRADE_PRESCRIPTION", () => (L.IsAdult && L.Get("LOGIC_KING_ZORA_THAWED") && L.CanUse("RG_PRESCRIPTION"))],
      ["RC_ZD_GS_FROZEN_WATERFALL", () => (L.IsAdult && (L.HookshotOrBoomerang() || L.CanUse("RG_FAIRY_SLINGSHOT") || L.CanUse("RG_FAIRY_BOW") || (L.CanUse("RG_MAGIC_SINGLE") && (L.CanUse("RG_MASTER_SWORD") || L.CanUse("RG_KOKIRI_SWORD") || L.CanUse("RG_BIGGORON_SWORD"))) || (L.trick("RT_ZD_GS") && L.CanJumpslashExceptHammer())) && L.CanGetNightTimeGS())],
      ["RC_ZD_FISH_1", () => (L.IsChild && L.HasBottle())],
      ["RC_ZD_FISH_2", () => (L.IsChild && L.HasBottle())],
      ["RC_ZD_FISH_3", () => (L.IsChild && L.HasBottle())],
      ["RC_ZD_FISH_4", () => (L.IsChild && L.HasBottle())],
      ["RC_ZD_FISH_5", () => (L.IsChild && L.HasBottle())],
      ["RC_ZD_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_ZD_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZD_GOSSIP_STONE", () => true],
      ["RC_ZD_IN_FRONT_OF_KING_ZORA_BEEHIVE_LEFT", () => (L.IsChild && L.CanBreakUpperBeehives())],
      ["RC_ZD_IN_FRONT_OF_KING_ZORA_BEEHIVE_RIGHT", () => (L.IsChild && L.CanBreakUpperBeehives())],
      ["RC_ZD_NEAR_SHOP_POT_1", () => (L.CanBreakPots())],
      ["RC_ZD_NEAR_SHOP_POT_2", () => (L.CanBreakPots())],
      ["RC_ZD_NEAR_SHOP_POT_3", () => (L.CanBreakPots())],
      ["RC_ZD_NEAR_SHOP_POT_4", () => (L.CanBreakPots())],
      ["RC_ZD_NEAR_SHOP_POT_5", () => (L.CanBreakPots())]
    ],
      exits:[
      ["RR_ZR_BEHIND_WATERFALL", () => true],
      ["RR_LH_FROM_SHORTCUT", () => (L.IsChild && (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS")))],
      ["RR_ZD_BEHIND_KING_ZORA", () => (L.Get("LOGIC_DELIVER_RUTOS_LETTER") || (L.opt("RSK_ZORAS_FOUNTAIN") === 2) || ((L.opt("RSK_ZORAS_FOUNTAIN") === 1) && L.IsAdult) || (L.trick("RT_ZD_KING_ZORA_SKIP") && L.IsAdult))],
      ["RR_ZD_SHOP", () => (L.IsChild || L.BlueFire())],
      ["RR_ZORAS_DOMAIN_ISLAND", () => true]
    ] },
    RR_ZORAS_DOMAIN_ISLAND:{ name:"Zoras Domain Island", scene:"SCENE_ZORAS_DOMAIN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ZORAS_DOMAIN", () => (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_LONGSHOT") || (L.CanUse("RG_HOOKSHOT") && L.trick("RT_HOOKSHOT_LADDERS")))],
      ["RR_ZD_STORMS_GROTTO", () => (L.CanOpenStormsGrotto())]
    ] },
    RR_ZD_BEHIND_KING_ZORA:{ name:"ZD Behind King Zora", scene:"SCENE_ZORAS_DOMAIN", time:false,
      events:[
      ["LOGIC_KING_ZORA_THAWED", () => (L.IsAdult && L.BlueFire())]
    ],
      checks:[
      ["RC_ZD_BEHIND_KING_ZORA_BEEHIVE", () => (L.IsChild && L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_ZORAS_DOMAIN", () => (L.Get("LOGIC_DELIVER_RUTOS_LETTER") || (L.opt("RSK_ZORAS_FOUNTAIN") === 2) || ((L.opt("RSK_ZORAS_FOUNTAIN") === 1) && L.IsAdult))],
      ["RR_ZORAS_FOUNTAIN", () => true]
    ] },
    RR_ZD_SHOP:{ name:"ZD Shop", scene:"SCENE_ZORA_SHOP", time:false,
      events:[],
      checks:[
      ["RC_ZD_SHOP_ITEM_1", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZD_SHOP_ITEM_2", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZD_SHOP_ITEM_3", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZD_SHOP_ITEM_4", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZD_SHOP_ITEM_5", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZD_SHOP_ITEM_6", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZD_SHOP_ITEM_7", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZD_SHOP_ITEM_8", () => (L.HasItem("RG_SPEAK_ZORA") && L.GetCheckPrice() <= L.GetWalletCapacity())]
    ],
      exits:[
      ["RR_ZORAS_DOMAIN", () => true]
    ] },
    RR_ZD_STORMS_GROTTO:{ name:"ZD Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_ZD_FAIRY_GROTTO_FAIRY_1", () => true],
      ["RC_ZD_FAIRY_GROTTO_FAIRY_2", () => true],
      ["RC_ZD_FAIRY_GROTTO_FAIRY_3", () => true],
      ["RC_ZD_FAIRY_GROTTO_FAIRY_4", () => true],
      ["RC_ZD_FAIRY_GROTTO_FAIRY_5", () => true],
      ["RC_ZD_FAIRY_GROTTO_FAIRY_6", () => true],
      ["RC_ZD_FAIRY_GROTTO_FAIRY_7", () => true],
      ["RC_ZD_FAIRY_GROTTO_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_ZORAS_DOMAIN_ISLAND", () => true]
    ] },
    RR_ZORAS_FOUNTAIN:{ name:"Zoras Fountain", scene:"SCENE_ZORAS_FOUNTAIN", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairyExceptSuns() || (L.CanUse("RG_STICKS") && L.AtDay))]
    ],
      checks:[
      ["RC_ZF_GS_TREE", () => (L.IsChild && L.CanBonkTrees() && (L.HasItem("RG_POWER_BRACELET") || L.CanKillEnemy("RE_GOLD_SKULLTULA")))],
      ["RC_ZF_GS_ABOVE_THE_LOG", () => (L.IsChild && L.HookshotOrBoomerang() && L.CanGetNightTimeGS())],
      ["RC_ZF_FAIRY_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_ZF_FAIRY_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZF_JABU_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairyExceptSuns())],
      ["RC_ZF_JABU_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZF_FAIRY_GOSSIP_STONE", () => true],
      ["RC_ZF_JABU_GOSSIP_STONE", () => true],
      ["RC_ZF_NEAR_JABU_POT_1", () => (L.IsChild && L.CanBreakPots())],
      ["RC_ZF_NEAR_JABU_POT_2", () => (L.IsChild && L.CanBreakPots())],
      ["RC_ZF_NEAR_JABU_POT_3", () => (L.IsChild && L.CanBreakPots())],
      ["RC_ZF_NEAR_JABU_POT_4", () => (L.IsChild && L.CanBreakPots())],
      ["RC_ZF_TREE", () => (L.IsChild && L.CanBonkTrees())],
      ["RC_ZF_BUSH_1", () => (L.IsChild)],
      ["RC_ZF_BUSH_2", () => (L.IsChild)],
      ["RC_ZF_BUSH_3", () => (L.IsChild)],
      ["RC_ZF_BUSH_4", () => (L.IsChild)],
      ["RC_ZF_BUSH_5", () => (L.IsChild)],
      ["RC_ZF_BUSH_6", () => (L.IsChild)]
    ],
      exits:[
      ["RR_ZD_BEHIND_KING_ZORA", () => true],
      ["RR_ZF_ICEBERGS", () => (L.IsAdult)],
      ["RR_ZF_LAKEBED", () => (L.CanUse("RG_IRON_BOOTS"))],
      ["RR_ZF_HIDDEN_CAVE", () => (L.CanUse("RG_SILVER_GAUNTLETS") && L.BlastOrSmash())],
      ["RR_ZF_ROCK", () => (L.IsAdult && L.ReachScarecrow())],
      ["RR_JABU_JABUS_BELLY_ENTRYWAY", () => (L.IsChild && ((L.opt("RSK_JABU_OPEN") === 1) || L.CanUse("RG_BOTTLE_WITH_FISH")))],
      ["RR_ZF_GREAT_FAIRY_FOUNTAIN", () => (L.HasExplosives() || (L.trick("RT_ZF_GREAT_FAIRY_WITHOUT_EXPLOSIVES") && L.CanUse("RG_MEGATON_HAMMER") && L.CanUse("RG_SILVER_GAUNTLETS")))]
    ] },
    RR_ZF_ICEBERGS:{ name:"ZF Icebergs", scene:"SCENE_ZORAS_FOUNTAIN", time:false,
      events:[],
      checks:[
      ["RC_ZF_ICEBERG_FREESTANDING_POH", () => (L.IsAdult)]
    ],
      exits:[
      ["RR_ZORAS_FOUNTAIN", () => (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_ZF_LAKEBED", () => (L.CanUse("RG_IRON_BOOTS"))],
      ["RR_ZF_LEDGE", () => true]
    ] },
    RR_ZF_LAKEBED:{ name:"ZF Lakebed", scene:"SCENE_ZORAS_FOUNTAIN", time:false,
      events:[],
      checks:[
      ["RC_ZF_BOTTOM_FREESTANDING_POH", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTH_INNER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTHEAST_INNER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTHEAST_INNER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTH_INNER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTHWEST_INNER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTHWEST_INNER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTH_MIDDLE_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTHEAST_MIDDLE_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTHEAST_MIDDLE_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTH_MIDDLE_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTHWEST_MIDDLE_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTHWEST_MIDDLE_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTH_OUTER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTHEAST_OUTER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTHEAST_OUTER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTH_OUTER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_SOUTHWEST_OUTER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)],
      ["RC_ZF_BOTTOM_NORTHWEST_OUTER_RUPEE", () => (L.IsAdult && L.CanUse("RG_IRON_BOOTS") && L.WaterTimer() >= 16)]
    ],
      exits:[
      ["RR_ZORAS_FOUNTAIN", () => (L.HasItem("RG_BRONZE_SCALE"))]
    ] },
    RR_ZF_LEDGE:{ name:"ZF Ledge", scene:"SCENE_ZORAS_FOUNTAIN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ZORAS_FOUNTAIN", () => (L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_ZF_ICEBERGS", () => (L.IsAdult)],
      ["RR_ZF_LAKEBED", () => (L.CanUse("RG_IRON_BOOTS"))],
      ["RR_ICE_CAVERN_ENTRYWAY", () => true]
    ] },
    RR_ZF_HIDDEN_CAVE:{ name:"ZF Hidden Cave", scene:"SCENE_ZORAS_FOUNTAIN", time:false,
      events:[],
      checks:[
      ["RC_ZF_HIDDEN_CAVE_POT_1", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_ZF_HIDDEN_CAVE_POT_2", () => (L.IsAdult && L.CanBreakPots())],
      ["RC_ZF_HIDDEN_CAVE_POT_3", () => (L.IsAdult && L.CanBreakPots())]
    ],
      exits:[
      ["RR_ZF_HIDDEN_LEDGE", () => (L.HasItem("RG_CLIMB") || L.CanUse("RG_LONGSHOT"))]
    ] },
    RR_ZF_HIDDEN_LEDGE:{ name:"ZF Hidden Ledge", scene:"SCENE_ZORAS_FOUNTAIN", time:false,
      events:[],
      checks:[
      ["RC_ZF_GS_HIDDEN_CAVE", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOMB_THROW") && L.CanGetNightTimeGS())]
    ],
      exits:[
      ["RR_ZORAS_FOUNTAIN", () => (L.HasItem("RG_BRONZE_SCALE") || L.TakeDamage())],
      ["RR_ZF_HIDDEN_CAVE", () => true]
    ] },
    RR_ZF_ROCK:{ name:"ZF Rock", scene:"SCENE_ZORAS_FOUNTAIN", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_ZORAS_FOUNTAIN", () => true]
    ] },
    RR_ZF_GREAT_FAIRY_FOUNTAIN:{ name:"ZF Great Fairy Fountain", scene:"SCENE_GREAT_FAIRYS_FOUNTAIN_SPELLS", time:false,
      events:[],
      checks:[
      ["RC_ZF_GREAT_FAIRY_REWARD", () => (L.CanUse("RG_ZELDAS_LULLABY"))]
    ],
      exits:[
      ["RR_ZORAS_FOUNTAIN", () => true]
    ] },
    RR_ZR_FRONT:{ name:"ZR Front", scene:"SCENE_ZORAS_RIVER", time:true,
      events:[],
      checks:[
      ["RC_ZR_GS_TREE", () => (L.IsChild && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_CLOSE") && L.CanBonkTrees())],
      ["RC_ZR_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_4", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_5", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_6", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_7", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_8", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_9", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_10", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_11", () => (L.CanCutShrubs())],
      ["RC_ZR_GRASS_12", () => (L.CanCutShrubs())],
      ["RC_ZR_TREE", () => (L.IsChild && L.CanBonkTrees())]
    ],
      exits:[
      ["RR_ZORAS_RIVER", () => (L.IsAdult || L.BlastOrSmash() || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_HYRULE_FIELD", () => true]
    ] },
    RR_ZORAS_RIVER:{ name:"Zora River", scene:"SCENE_ZORAS_RIVER", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy() || (L.IsChild && L.CanUse("RG_STICKS")) || (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_ZORAS_RIVER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS")))]
    ],
      checks:[
      ["RC_ZR_MAGIC_BEAN_SALESMAN", () => (L.IsChild && L.HasItem("RG_SPEAK_HYLIAN") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZR_FROGS_OCARINA_GAME", () => (L.IsChild && L.CanUse("RG_ZELDAS_LULLABY") && L.CanUse("RG_SARIAS_SONG") && L.CanUse("RG_SUNS_SONG") && L.CanUse("RG_EPONAS_SONG") && L.CanUse("RG_SONG_OF_TIME") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_FROGS_IN_THE_RAIN", () => (L.IsChild && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_FROGS_ZELDAS_LULLABY", () => (L.IsChild && L.CanUse("RG_ZELDAS_LULLABY"))],
      ["RC_ZR_FROGS_EPONAS_SONG", () => (L.IsChild && L.CanUse("RG_EPONAS_SONG"))],
      ["RC_ZR_FROGS_SARIAS_SONG", () => (L.IsChild && L.CanUse("RG_SARIAS_SONG"))],
      ["RC_ZR_FROGS_SUNS_SONG", () => (L.IsChild && L.CanUse("RG_SUNS_SONG"))],
      ["RC_ZR_FROGS_SONG_OF_TIME", () => (L.IsChild && L.CanUse("RG_SONG_OF_TIME"))],
      ["RC_ZR_NEAR_OPEN_GROTTO_FREESTANDING_POH", () => (L.CanUse("RG_BOOMERANG"))],
      ["RC_ZR_NEAR_DOMAIN_FREESTANDING_POH", () => ((L.IsChild && L.HasItem("RG_POWER_BRACELET")) || L.CanUse("RG_BOOMERANG") || L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && L.trick("RT_ZR_UPPER")))],
      ["RC_ZR_GS_LADDER", () => (L.IsChild && L.CanKillEnemy("RE_GOLD_SKULLTULA", "ED_SHORT_JUMPSLASH") && L.CanGetNightTimeGS())],
      ["RC_ZR_GS_NEAR_RAISED_GROTTOS", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_LONGSHOT") && L.CanGetNightTimeGS())],
      ["RC_ZR_GS_ABOVE_BRIDGE", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_HOOKSHOT") && L.CanGetNightTimeGS())],
      ["RC_ZR_BEAN_SPROUT_FAIRY_1", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_ZORAS_RIVER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_BEAN_SPROUT_FAIRY_2", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_ZORAS_RIVER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_BEAN_SPROUT_FAIRY_3", () => (L.IsChild && L.CanUse("RG_MAGIC_BEAN") && L.HasItem("RG_ZORAS_RIVER_BEAN_SOUL") && L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_NEAR_DOMAIN_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_ZR_NEAR_DOMAIN_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_BENEATH_WATERFALL_LEFT_RUPEE", () => (L.IsAdult && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_ZR_BENEATH_WATERFALL_MIDDLE_LEFT_RUPEE", () => (L.IsAdult && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_ZR_BENEATH_WATERFALL_MIDDLE_RIGHT_RUPEE", () => (L.IsAdult && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_ZR_BENEATH_WATERFALL_RIGHT_RUPEE", () => (L.IsAdult && (L.HasItem("RG_BRONZE_SCALE") || L.CanUse("RG_IRON_BOOTS") || L.CanUse("RG_BOOMERANG")))],
      ["RC_ZR_NEAR_DOMAIN_GOSSIP_STONE", () => true],
      ["RC_ZR_NEAR_FREESTANDING_POH_GRASS", () => (L.CanUse("RG_BOOMERANG"))]
    ],
      exits:[
      ["RR_ZR_FRONT", () => (L.IsAdult || L.HasItem("RG_BRONZE_SCALE") || L.HasItem("RG_POWER_BRACELET") || L.BlastOrSmash() || L.HasItem("RG_HOVER_BOOTS"))],
      ["RR_ZR_ATOP_LADDER", () => (((L.IsAdult || L.HasItem("RG_POWER_BRACELET")) && L.CanClimbLadder()) || (L.IsAdult && L.CanPlantBean("RR_ZORAS_RIVER", "RG_ZORAS_RIVER_BEAN_SOUL")))],
      ["RR_ZR_PILLAR", () => ((L.IsChild && L.HasItem("RG_POWER_BRACELET")) || L.CanUse("RG_HOVER_BOOTS") || (L.IsAdult && L.trick("RT_ZR_LOWER")))],
      ["RR_ZR_FROM_SHORTCUT", () => (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS"))],
      ["RR_ZR_STORMS_GROTTO", () => (L.CanOpenStormsGrotto())],
      ["RR_ZR_BEHIND_WATERFALL", () => ((L.opt("RSK_SLEEPING_WATERFALL") === 1) || L.AnyAgeTime((() => (L.CanUse("RG_ZELDAS_LULLABY")))) || (L.IsChild && L.trick("RT_ZR_CUCCO") && L.HasItem("RG_POWER_BRACELET")) || (L.IsAdult && L.CanUse("RG_HOVER_BOOTS") && L.trick("RT_ZR_HOVERS")))]
    ] },
    RR_ZR_ATOP_LADDER:{ name:"ZR Atop Ladder", scene:"SCENE_ZORAS_RIVER", time:true,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => (L.CallGossipFairy())]
    ],
      checks:[
      ["RC_ZR_GS_NEAR_RAISED_GROTTOS", () => (L.IsAdult && L.CanGetEnemyDrop("RE_GOLD_SKULLTULA", "ED_BOOMERANG") && L.CanGetNightTimeGS())],
      ["RC_ZR_NEAR_GROTTOS_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_ZR_NEAR_GROTTOS_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_NEAR_GROTTOS_GOSSIP_STONE", () => true]
    ],
      exits:[
      ["RR_ZORAS_RIVER", () => true],
      ["RR_ZR_PILLAR", () => ((L.IsChild && L.HasItem("RG_POWER_BRACELET")) || L.CanUse("RG_HOVER_BOOTS"))],
      ["RR_ZR_OPEN_GROTTO", () => true],
      ["RR_ZR_FAIRY_GROTTO", () => (L.AnyAgeTime((() => (L.BlastOrSmash()))))]
    ] },
    RR_ZR_PILLAR:{ name:"ZR Pillar", scene:"SCENE_ZORAS_RIVER", time:true,
      events:[
      ["LOGIC_BUG_ACCESS", () => (L.CanCutShrubs())]
    ],
      checks:[
      ["RC_ZR_NEAR_OPEN_GROTTO_FREESTANDING_POH", () => true],
      ["RC_ZR_NEAR_FREESTANDING_POH_GRASS", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_ZORAS_RIVER", () => true]
    ] },
    RR_ZR_FROM_SHORTCUT:{ name:"ZR From Shortcut", scene:"SCENE_ZORAS_RIVER", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_ZORAS_RIVER", () => (L.Hearts() > 1 || L.HasItem("RG_BOTTLE_WITH_FAIRY") || L.HasItem("RG_BRONZE_SCALE"))],
      ["RR_THE_LOST_WOODS", () => (L.HasItem("RG_SILVER_SCALE") || L.CanUse("RG_IRON_BOOTS"))]
    ] },
    RR_ZR_BEHIND_WATERFALL:{ name:"ZR Behind Waterfall", scene:"SCENE_ZORAS_RIVER", time:true,
      events:[],
      checks:[],
      exits:[
      ["RR_ZORAS_RIVER", () => true],
      ["RR_ZORAS_DOMAIN", () => true]
    ] },
    RR_ZR_OPEN_GROTTO:{ name:"ZR Open Grotto", scene:"SCENE_GROTTOS", time:false,
      events:"grottoEvents",
      checks:[
      ["RC_ZR_OPEN_GROTTO_CHEST", () => (L.HasItem("RG_OPEN_CHEST"))],
      ["RC_ZR_OPEN_GROTTO_FISH", () => (L.HasBottle())],
      ["RC_ZR_OPEN_GROTTO_GOSSIP_STONE_FAIRY", () => (L.CallGossipFairy())],
      ["RC_ZR_OPEN_GROTTO_GOSSIP_STONE_FAIRY_BIG", () => (L.CanUse("RG_SONG_OF_STORMS"))],
      ["RC_ZR_OPEN_GROTTO_GOSSIP_STONE", () => true],
      ["RC_ZR_OPEN_GROTTO_BEEHIVE_LEFT", () => (L.CanBreakLowerBeehives())],
      ["RC_ZR_OPEN_GROTTO_BEEHIVE_RIGHT", () => (L.CanBreakLowerBeehives())],
      ["RC_ZR_OPEN_GROTTO_GRASS_1", () => (L.CanCutShrubs())],
      ["RC_ZR_OPEN_GROTTO_GRASS_2", () => (L.CanCutShrubs())],
      ["RC_ZR_OPEN_GROTTO_GRASS_3", () => (L.CanCutShrubs())],
      ["RC_ZR_OPEN_GROTTO_GRASS_4", () => (L.CanCutShrubs())]
    ],
      exits:[
      ["RR_ZR_ATOP_LADDER", () => true]
    ] },
    RR_ZR_FAIRY_GROTTO:{ name:"ZR Fairy Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[
      ["LOGIC_FAIRY_ACCESS", () => true]
    ],
      checks:[
      ["RC_ZR_FAIRY_GROTTO_FAIRY_1", () => true],
      ["RC_ZR_FAIRY_GROTTO_FAIRY_2", () => true],
      ["RC_ZR_FAIRY_GROTTO_FAIRY_3", () => true],
      ["RC_ZR_FAIRY_GROTTO_FAIRY_4", () => true],
      ["RC_ZR_FAIRY_GROTTO_FAIRY_5", () => true],
      ["RC_ZR_FAIRY_GROTTO_FAIRY_6", () => true],
      ["RC_ZR_FAIRY_GROTTO_FAIRY_7", () => true],
      ["RC_ZR_FAIRY_GROTTO_FAIRY_8", () => true]
    ],
      exits:[
      ["RR_ZR_ATOP_LADDER", () => true]
    ] },
    RR_ZR_STORMS_GROTTO:{ name:"ZR Storms Grotto", scene:"SCENE_GROTTOS", time:false,
      events:[],
      checks:[
      ["RC_ZR_DEKU_SCRUB_GROTTO_REAR", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZR_DEKU_SCRUB_GROTTO_FRONT", () => (L.CanStunDeku() && L.HasItem("RG_SPEAK_DEKU") && L.GetCheckPrice() <= L.GetWalletCapacity())],
      ["RC_ZR_STORMS_GROTTO_BEEHIVE", () => (L.CanBreakUpperBeehives())]
    ],
      exits:[
      ["RR_ZORAS_RIVER", () => true]
    ] },
    RR_ROOT:{ name:"Root", scene:"SCENE_ID_MAX", time:false,
      events:[
      ["LOGIC_KAKARIKO_GATE_OPEN", () => ((L.opt("RSK_KAK_GATE") === 1))],
      ["LOGIC_TH_COULD_FREE_1_TORCH_CARPENTER", () => ((L.opt("RSK_GERUDO_FORTRESS") === 2))],
      ["LOGIC_TH_COULD_FREE_DOUBLE_CELL_CARPENTER", () => ((L.opt("RSK_GERUDO_FORTRESS") === 2) || (L.opt("RSK_GERUDO_FORTRESS") === 1))],
      ["LOGIC_TH_COULD_FREE_DEAD_END_CARPENTER", () => ((L.opt("RSK_GERUDO_FORTRESS") === 2) || (L.opt("RSK_GERUDO_FORTRESS") === 1))],
      ["LOGIC_TH_COULD_FREE_SLOPE_CARPENTER", () => ((L.opt("RSK_GERUDO_FORTRESS") === 2) || (L.opt("RSK_GERUDO_FORTRESS") === 1))],
      ["LOGIC_TH_RESCUED_ALL_CARPENTERS", () => ((L.opt("RSK_GERUDO_FORTRESS") === 2))],
      ["LOGIC_FREED_EPONA", () => (L.opt("RSK_SKIP_EPONA_RACE"))]
    ],
      checks:[
      ["RC_LINKS_POCKET", () => true],
      ["RC_TRIFORCE_COMPLETED", () => (L.TriforcePieces() >= L.opt("RSK_TRIFORCE_HUNT_PIECES_REQUIRED") + 1)],
      ["RC_SARIA_SONG_HINT", () => (L.CanUse("RG_SARIAS_SONG"))],
      ["RC_SONG_FROM_IMPA", () => (L.opt("RSK_SKIP_CHILD_ZELDA"))],
      ["RC_HC_MALON_EGG", () => (L.opt("RSK_SKIP_CHILD_ZELDA"))],
      ["RC_HC_ZELDAS_LETTER", () => (L.opt("RSK_SKIP_CHILD_ZELDA"))],
      ["RC_TOT_MASTER_SWORD", () => ((L.opt("RSK_SELECTED_STARTING_AGE") === 1))]
    ],
      exits:[
      ["RR_ROOT_EXITS", () => true]
    ] },
    RR_ROOT_EXITS:{ name:"Root Exits", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_CHILD_SPAWN", () => (L.IsChild)],
      ["RR_ADULT_SPAWN", () => (L.IsAdult)],
      ["RR_MINUET_OF_FOREST_WARP", () => (L.CanUse("RG_MINUET_OF_FOREST"))],
      ["RR_BOLERO_OF_FIRE_WARP", () => (L.CanUse("RG_BOLERO_OF_FIRE"))],
      ["RR_SERENADE_OF_WATER_WARP", () => (L.CanUse("RG_SERENADE_OF_WATER"))],
      ["RR_NOCTURNE_OF_SHADOW_WARP", () => (L.CanUse("RG_NOCTURNE_OF_SHADOW"))],
      ["RR_REQUIEM_OF_SPIRIT_WARP", () => (L.CanUse("RG_REQUIEM_OF_SPIRIT"))],
      ["RR_PRELUDE_OF_LIGHT_WARP", () => (L.CanUse("RG_PRELUDE_OF_LIGHT"))]
    ] },
    RR_CHILD_SPAWN:{ name:"Child Spawn", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_KF_LINKS_HOUSE", () => true]
    ] },
    RR_ADULT_SPAWN:{ name:"Adult Spawn", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_TEMPLE_OF_TIME", () => true]
    ] },
    RR_MINUET_OF_FOREST_WARP:{ name:"Minuet of Forest Warp", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_SACRED_FOREST_MEADOW", () => true]
    ] },
    RR_BOLERO_OF_FIRE_WARP:{ name:"Bolero of Fire Warp", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DMC_PAD_ENTRY", () => true]
    ] },
    RR_SERENADE_OF_WATER_WARP:{ name:"Serenade of Water Warp", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_LAKE_HYLIA", () => true]
    ] },
    RR_REQUIEM_OF_SPIRIT_WARP:{ name:"Requiem of Spirit Warp", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_DESERT_COLOSSUS", () => true]
    ] },
    RR_NOCTURNE_OF_SHADOW_WARP:{ name:"Nocturne of Shadow Warp", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_GRAVEYARD_WARP_PAD_REGION", () => true]
    ] },
    RR_PRELUDE_OF_LIGHT_WARP:{ name:"Prelude of Light Warp", scene:"SCENE_ID_MAX", time:false,
      events:[],
      checks:[],
      exits:[
      ["RR_TEMPLE_OF_TIME", () => true]
    ] },
  },
};
