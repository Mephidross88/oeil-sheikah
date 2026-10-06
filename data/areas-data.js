// Données des zones et sorties. Format décrit dans CLAUDE.md.
window.AREAS_DATA = [
  {
    "id": "spawns",
    "name": "Apparitions et chants",
    "exits": [
      {
        "id": "spawn_child",
        "label": "Apparition enfant",
        "soh": "Child Spawn",
        "entr": 187,
        "type": "warp",
        "shuffleTag": "spawn",
        "vanillaTargetExitId": "kokiri_forest::links_to_kf"
      },
      {
        "id": "spawn_adult",
        "label": "Apparition adulte",
        "soh": "Adult Spawn",
        "entr": 642,
        "type": "warp",
        "shuffleTag": "spawn",
        "vanillaTargetExitId": "market::templeoftime_to_templeplaza"
      },
      {
        "id": "warp_pol",
        "label": "Prélude de la Lumière",
        "soh": "Prelude of Light",
        "entr": 1524,
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "market::prelude_pad"
      },
      {
        "id": "warp_mof",
        "label": "Menuet des Bois",
        "soh": "Minuet of Forest",
        "entr": 1536,
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "sacred_forest_meadow::minuet_pad"
      },
      {
        "id": "warp_bof",
        "label": "Boléro du Feu",
        "soh": "Bolero of Fire",
        "entr": 1270,
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "death_mountain_crater::bolero_pad"
      },
      {
        "id": "warp_sow",
        "label": "Sérénade de l'Eau",
        "soh": "Serenade of Water",
        "entr": 1540,
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "lake_hylia::serenade_pad"
      },
      {
        "id": "warp_nos",
        "label": "Nocturne de l'Ombre",
        "soh": "Nocturne of Shadow",
        "entr": 1384,
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "graveyard::nocturne_pad"
      },
      {
        "id": "warp_ros",
        "label": "Requiem des Esprits",
        "soh": "Requiem of Spirit",
        "entr": 497,
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "desert_colossus::requiem_pad"
      }
    ]
  },
  {
    "id": "kokiri_forest",
    "name": "Forêt Kokiri",
    "exits": [
      {
        "id": "kf_to_lw",
        "label": "Sortie haute",
        "soh": "Kokiri Forest Upper Exit",
        "entr": 286,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lost_woods::lw_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 9
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 9
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 1
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 20
          }
        ]
      },
      {
        "id": "kf_to_lwbridge",
        "label": "Sortie basse",
        "soh": "Kokiri Forest Lower Exit",
        "entr": 1504,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lost_woods::lwbridge_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 3
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 9
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 19
          }
        ]
      },
      {
        "id": "kf_to_twins",
        "label": "Entrée de la maison des jumeaux",
        "soh": "KF House of Twins Entry",
        "entr": 156,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::twins_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 11
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 1
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 12
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 13
          }
        ]
      },
      {
        "id": "twins_to_kf",
        "label": "Maison des jumeaux",
        "soh": "House of Twins",
        "entr": 828,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_twins"
      },
      {
        "id": "kf_to_midos",
        "label": "Entrée de la maison de Mido",
        "soh": "KF Mido's House Entry",
        "entr": 1075,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::midos_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 9
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 4
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 3
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 3
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 4
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 10
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 15
          }
        ]
      },
      {
        "id": "midos_to_kf",
        "label": "Maison de Mido",
        "soh": "Mido's House",
        "entr": 1091,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_midos"
      },
      {
        "id": "kf_to_sarias",
        "label": "Entrée de la maison de Saria",
        "soh": "KF Saria's House Entry",
        "entr": 1079,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::sarias_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 10
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 1
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 4
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 11
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 14
          }
        ]
      },
      {
        "id": "sarias_to_kf",
        "label": "Maison de Saria",
        "soh": "Saria's House",
        "entr": 1095,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_sarias"
      },
      {
        "id": "kf_to_shop",
        "label": "Entrée de la boutique",
        "soh": "KF Shop Entry",
        "entr": 193,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::shop_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 10
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 11
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 3
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 10
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 4
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 11
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 11
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 12
          }
        ]
      },
      {
        "id": "shop_to_kf",
        "label": "Boutique Kokiri",
        "soh": "Kokiri Shop",
        "entr": 614,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_shop"
      },
      {
        "id": "kf_to_kias",
        "label": "Entrée de la maison des Je-Sais-Tout",
        "soh": "KF Know-It-All House Entry",
        "entr": 201,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kias_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 3
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 11
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 9
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 19
          }
        ]
      },
      {
        "id": "kias_to_kf",
        "label": "Maison des Je-Sais-Tout",
        "soh": "Know-It-All House",
        "entr": 618,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_kias"
      },
      {
        "id": "kf_to_links",
        "label": "Entrée de la maison de Link",
        "soh": "KF Link's House Entry",
        "entr": 626,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kokiri_forest::links_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 11
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 12
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 17
          }
        ]
      },
      {
        "id": "links_to_kf",
        "label": "Maison de Link",
        "soh": "Link's House",
        "entr": 529,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kokiri_forest::kf_to_links"
      },
      {
        "id": "kf_to_stormsgrotto",
        "label": "Entrée de la grotte des tempêtes",
        "soh": "KF Storms Grotto Entry",
        "entr": 1819,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kokiri_forest::stormsgrotto_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 9
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 5
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 8
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 7
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 6
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 9
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 20
          }
        ]
      },
      {
        "id": "stormsgrotto_to_kf",
        "label": "Grotte des tempêtes",
        "soh": "KF Storms Grotto",
        "entr": 2075,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kokiri_forest::kf_to_stormsgrotto"
      },
      {
        "id": "kf_to_dekutree",
        "label": "Devant l'Arbre Mojo",
        "soh": "KF Outside Deku Tree",
        "entr": 0,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "deku_tree::dekutree_to_kf",
        "connections": [
          {
            "targetExitId": "kf_to_lw",
            "cost": 22
          },
          {
            "targetExitId": "kf_to_lwbridge",
            "cost": 19
          },
          {
            "targetExitId": "kf_to_twins",
            "cost": 13
          },
          {
            "targetExitId": "kf_to_midos",
            "cost": 17
          },
          {
            "targetExitId": "kf_to_sarias",
            "cost": 14
          },
          {
            "targetExitId": "kf_to_shop",
            "cost": 12
          },
          {
            "targetExitId": "kf_to_kias",
            "cost": 19
          },
          {
            "targetExitId": "kf_to_links",
            "cost": 17
          },
          {
            "targetExitId": "kf_to_stormsgrotto",
            "cost": 23
          }
        ]
      }
    ]
  },
  {
    "id": "lost_woods",
    "name": "Bois Perdus",
    "exits": [
      {
        "id": "lwbridge_to_kf",
        "label": "Sortie est du pont",
        "soh": "Lost Woods Bridge East Exit",
        "entr": 525,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kokiri_forest::kf_to_lwbridge",
        "connections": [
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 2
          }
        ]
      },
      {
        "id": "lwbridge_to_hf",
        "label": "Sortie ouest du pont",
        "soh": "Lost Woods Bridge West Exit",
        "entr": 389,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_field::hf_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 2
          }
        ]
      },
      {
        "id": "lw_to_kf",
        "label": "Sortie sud",
        "soh": "Lost Woods South Exit",
        "entr": 646,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kokiri_forest::kf_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 11
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 7
          },
          {
            "targetExitId": "lw_to_river",
            "cost": 9
          },
          {
            "targetExitId": "lw_to_meadow",
            "cost": 18
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 7
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 16
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 18
          }
        ]
      },
      {
        "id": "lw_to_gc",
        "label": "Raccourci du tunnel",
        "soh": "Lost Woods Tunnel Shortcut",
        "entr": 1250,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "goron_city::gc_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 17
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 17
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 7
          },
          {
            "targetExitId": "lw_to_river",
            "cost": 6
          },
          {
            "targetExitId": "lw_to_meadow",
            "cost": 13
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 1
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 13
          }
        ]
      },
      {
        "id": "lw_to_river",
        "label": "Raccourci sous-marin",
        "soh": "Lost Woods Underwater Shortcut",
        "entr": 477,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zoras_river::river_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 20
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 20
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 9
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 6
          },
          {
            "targetExitId": "lw_to_meadow",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 6
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 9
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 11
          }
        ]
      },
      {
        "id": "lw_to_meadow",
        "label": "Sortie nord",
        "soh": "Lost Woods North Exit",
        "entr": 252,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "sacred_forest_meadow::meadow_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 27
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 27
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 18
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 13
          },
          {
            "targetExitId": "lw_to_river",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 13
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 1
          }
        ]
      },
      {
        "id": "lw_to_gorongrotto",
        "label": "Entrée de la grotte du tunnel",
        "soh": "LW Tunnel Grotto Entry",
        "entr": 1818,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::gorongrotto_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 17
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 17
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 7
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 1
          },
          {
            "targetExitId": "lw_to_river",
            "cost": 6
          },
          {
            "targetExitId": "lw_to_meadow",
            "cost": 13
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 13
          }
        ]
      },
      {
        "id": "gorongrotto_to_lw",
        "label": "Grotte du tunnel",
        "soh": "LW Tunnel Grotto",
        "entr": 2074,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::lw_to_gorongrotto"
      },
      {
        "id": "lw_to_theatre",
        "label": "Entrée de la grotte du bosquet",
        "soh": "LW Meadow Grotto Entry",
        "entr": 1824,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::theatre_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 26
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 26
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 16
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_river",
            "cost": 9
          },
          {
            "targetExitId": "lw_to_meadow",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 11
          }
        ]
      },
      {
        "id": "theatre_to_lw",
        "label": "Théâtre Mojo",
        "soh": "Deku Theater",
        "entr": 2080,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::lw_to_theatre"
      },
      {
        "id": "lw_to_meadowgrotto",
        "label": "Entrée de la grotte nord",
        "soh": "LW North Grotto Entry",
        "entr": 1817,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::meadowgrotto_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 27
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 27
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 18
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 13
          },
          {
            "targetExitId": "lw_to_river",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_meadow",
            "cost": 1
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 13
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 11
          }
        ]
      },
      {
        "id": "meadowgrotto_to_lw",
        "label": "Grotte des pestes Mojo",
        "soh": "LW Deku Scrub Grotto",
        "entr": 2073,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::lw_to_meadowgrotto"
      }
    ]
  },
  {
    "id": "sacred_forest_meadow",
    "name": "Bosquet Sacré",
    "exits": [
      {
        "id": "meadow_to_lw",
        "label": "Sortie sud",
        "soh": "Sacred Forest Meadow South Exit",
        "entr": 425,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lost_woods::lw_to_meadow",
        "connections": [
          {
            "targetExitId": "meadow_to_wolfosgrotto",
            "cost": 1
          },
          {
            "targetExitId": "meadow_to_fairygrotto",
            "cost": 20
          },
          {
            "targetExitId": "meadow_to_stormsgrotto",
            "cost": 25
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 27
          }
        ]
      },
      {
        "id": "meadow_to_wolfosgrotto",
        "label": "Entrée de la grotte aux Lobos",
        "soh": "SFM Wolfos Grotto Entry",
        "entr": 1814,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "sacred_forest_meadow::wolfosgrotto_to_meadow",
        "connections": [
          {
            "targetExitId": "meadow_to_lw",
            "cost": 1
          },
          {
            "targetExitId": "meadow_to_fairygrotto",
            "cost": 19
          },
          {
            "targetExitId": "meadow_to_stormsgrotto",
            "cost": 24
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 26
          }
        ]
      },
      {
        "id": "wolfosgrotto_to_meadow",
        "label": "Grotte aux Lobos",
        "soh": "SFM Wolfos Grotto",
        "entr": 2070,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "sacred_forest_meadow::meadow_to_wolfosgrotto"
      },
      {
        "id": "meadow_to_fairygrotto",
        "label": "Entrée de la grotte des fées",
        "soh": "SFM Fairy Grotto Entry",
        "entr": 1816,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "sacred_forest_meadow::fairygrotto_to_meadow",
        "connections": [
          {
            "targetExitId": "meadow_to_lw",
            "cost": 20
          },
          {
            "targetExitId": "meadow_to_wolfosgrotto",
            "cost": 19
          },
          {
            "targetExitId": "meadow_to_stormsgrotto",
            "cost": 9
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 11
          }
        ]
      },
      {
        "id": "fairygrotto_to_meadow",
        "label": "Grotte des fées",
        "soh": "SFM Fairy Grotto",
        "entr": 2072,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "sacred_forest_meadow::meadow_to_fairygrotto"
      },
      {
        "id": "meadow_to_stormsgrotto",
        "label": "Entrée de la grotte des tempêtes",
        "soh": "SFM Storms Grotto Entry",
        "entr": 1815,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "sacred_forest_meadow::stormsgrotto_to_meadow",
        "connections": [
          {
            "targetExitId": "meadow_to_lw",
            "cost": 25
          },
          {
            "targetExitId": "meadow_to_wolfosgrotto",
            "cost": 24
          },
          {
            "targetExitId": "meadow_to_fairygrotto",
            "cost": 8
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 3
          }
        ]
      },
      {
        "id": "stormsgrotto_to_meadow",
        "label": "Grotte des pestes Mojo",
        "soh": "SFM Deku Scrub Grotto",
        "entr": 2071,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "sacred_forest_meadow::meadow_to_stormsgrotto"
      },
      {
        "id": "meadow_to_foresttemple",
        "label": "Devant le Temple de la Forêt",
        "soh": "Sacred Forest Meadow Outside Forest Temple",
        "entr": 361,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "forest_temple::foresttemple_to_meadow",
        "connections": [
          {
            "targetExitId": "meadow_to_lw",
            "cost": 26
          },
          {
            "targetExitId": "meadow_to_wolfosgrotto",
            "cost": 25
          },
          {
            "targetExitId": "meadow_to_fairygrotto",
            "cost": 11
          },
          {
            "targetExitId": "meadow_to_stormsgrotto",
            "cost": 3
          }
        ]
      },
      {
        "id": "minuet_pad",
        "label": "Plateforme de téléportation",
        "soh": "SFM Warp Pad",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "meadow_to_lw",
            "cost": 24
          },
          {
            "targetExitId": "meadow_to_wolfosgrotto",
            "cost": 23
          },
          {
            "targetExitId": "meadow_to_fairygrotto",
            "cost": 9
          },
          {
            "targetExitId": "meadow_to_stormsgrotto",
            "cost": 2
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 2
          }
        ]
      }
    ]
  },
  {
    "id": "hyrule_field",
    "name": "Plaine d'Hyrule",
    "exits": [
      {
        "id": "hf_to_lw",
        "label": "Sortie boisée",
        "soh": "Hyrule Field Wooded Exit",
        "entr": 1246,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lost_woods::lwbridge_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_river",
            "cost": 21
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 31
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 30
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 53
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 50
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 30
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 42
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 47
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 48
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 42
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 38
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 26
          }
        ]
      },
      {
        "id": "hf_to_river",
        "label": "Sortie de la rivière",
        "soh": "Hyrule Field River Exit",
        "entr": 234,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zoras_river::river_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 21
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 15
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 22
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 26
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 16
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 25
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 35
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 50
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 47
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 37
          }
        ]
      },
      {
        "id": "hf_to_kak",
        "label": "Sortie de l'escalier",
        "soh": "Hyrule Field Stairs Exit",
        "entr": 219,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kakariko_village::kak_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 15
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 15
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 70
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 7
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 19
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 31
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 35
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 53
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 45
          }
        ]
      },
      {
        "id": "hf_to_market",
        "label": "Sortie du pont-levis",
        "soh": "Hyrule Field Drawbridge Exit",
        "entr": 630,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::market_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 31
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 22
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 15
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 17
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 49
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 59
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 12
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 8
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 18
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 24
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 44
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 51
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 44
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 36
          }
        ]
      },
      {
        "id": "hf_to_ranch",
        "label": "Sortie centrale",
        "soh": "Hyrule Field Center Exit",
        "entr": 343,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lon_lon_ranch::ranch_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 30
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 26
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 17
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 39
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 48
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 23
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 19
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 14
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 22
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 22
          }
        ]
      },
      {
        "id": "hf_to_gv",
        "label": "Chemin rocheux",
        "soh": "Hyrule Field Rocky Path",
        "entr": 279,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "gerudo_valley::gv_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 53
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 49
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 39
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 51
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 37
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 43
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 11
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 32
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 32
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 39
          }
        ]
      },
      {
        "id": "hf_to_lake",
        "label": "Sortie de la clôture",
        "soh": "Hyrule Field Fence Exit",
        "entr": 258,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lake_hylia::lake_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 50
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 70
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 59
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 48
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 64
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 48
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 54
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 37
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 10
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 13
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 26
          }
        ]
      },
      {
        "id": "hf_to_kakarikogrotto",
        "label": "Entrée de la grotte de l'arbre du pont de pierre",
        "soh": "HF Stone Bridge Tree Grotto Entry",
        "entr": 1806,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::kakarikogrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 30
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 16
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 7
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 12
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 23
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 64
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 13
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 25
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 49
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 47
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 39
          }
        ]
      },
      {
        "id": "kakarikogrotto_to_hf",
        "label": "Grotte de l'arbre du pont de pierre",
        "soh": "HF Stone Bridge Tree Grotto",
        "entr": 2062,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_kakarikogrotto"
      },
      {
        "id": "hf_to_marketgrotto",
        "label": "Entrée de la grotte du rocher près du bourg",
        "soh": "HF Near Market Boulder Grotto Entry",
        "entr": 1808,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::marketgrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 25
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 19
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 8
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 19
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 51
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 13
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 20
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 26
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 46
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 53
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 46
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 38
          }
        ]
      },
      {
        "id": "marketgrotto_to_hf",
        "label": "Grotte du rocher près du bourg",
        "soh": "HF Near Market Boulder Grotto",
        "entr": 2064,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_marketgrotto"
      },
      {
        "id": "hf_to_divinggrotto",
        "label": "Entrée de la grotte de l'arbre nord-ouest",
        "soh": "HF Northwest Tree Grotto Entry",
        "entr": 1805,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::divingrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 42
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 35
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 31
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 18
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 14
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 37
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 48
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 25
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 20
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 6
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 41
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 40
          }
        ]
      },
      {
        "id": "divingrotto_to_hf",
        "label": "Grotte aux Tektites",
        "soh": "HF Tektite Grotto",
        "entr": 2061,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_divinggrotto"
      },
      {
        "id": "hf_to_fairygrotto",
        "label": "Entrée de la grotte du rocher nord-ouest",
        "soh": "HF Northwest Boulder Grotto Entry",
        "entr": 1807,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::fairygrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 47
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 35
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 24
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 22
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 43
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 54
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 26
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 6
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 39
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 46
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 45
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 45
          }
        ]
      },
      {
        "id": "fairygrotto_to_hf",
        "label": "Grotte des fées",
        "soh": "HF Fairy Grotto",
        "entr": 2063,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_fairygrotto"
      },
      {
        "id": "hf_to_cowgrotto",
        "label": "Entrée de la grotte du cercle de pierres ouest",
        "soh": "HF West Rock Circle Grotto Entry",
        "entr": 1809,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::cowgrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 48
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 44
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 11
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 37
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 49
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 46
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 34
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 39
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 36
          }
        ]
      },
      {
        "id": "cowgrotto_to_hf",
        "label": "Grotte à la vache",
        "soh": "HF Cow Grotto",
        "entr": 2065,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_cowgrotto"
      },
      {
        "id": "hf_to_fencegrotto",
        "label": "Entrée de la grotte clôturée",
        "soh": "HF Fenced Grotto Entry",
        "entr": 1810,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::fencegrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 42
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 50
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 61
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 51
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 32
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 10
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 55
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 53
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 41
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 46
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 3
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 16
          }
        ]
      },
      {
        "id": "fencegrotto_to_hf",
        "label": "Grotte clôturée des pestes Mojo",
        "soh": "HF Fenced Deku Scrub Grotto",
        "entr": 2066,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_fencegrotto"
      },
      {
        "id": "hf_to_opengrotto",
        "label": "Entrée de la grotte ouverte sud",
        "soh": "HF South Open Grotto Entry",
        "entr": 1811,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::opengrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 38
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 47
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 53
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 44
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 32
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 13
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 57
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 46
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 45
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 3
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 13
          }
        ]
      },
      {
        "id": "opengrotto_to_hf",
        "label": "Grotte ouverte",
        "soh": "HF Open Grotto",
        "entr": 2067,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_opengrotto"
      },
      {
        "id": "hf_to_forestgrotto",
        "label": "Entrée de la grotte du rocher sud-est",
        "soh": "HF Southeast Boulder Grotto Entry",
        "entr": 1812,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::forestgrotto_to_hf",
        "connections": [
          {
            "targetExitId": "hf_to_lw",
            "cost": 26
          },
          {
            "targetExitId": "hf_to_river",
            "cost": 37
          },
          {
            "targetExitId": "hf_to_kak",
            "cost": 45
          },
          {
            "targetExitId": "hf_to_market",
            "cost": 36
          },
          {
            "targetExitId": "hf_to_ranch",
            "cost": 22
          },
          {
            "targetExitId": "hf_to_gv",
            "cost": 39
          },
          {
            "targetExitId": "hf_to_lake",
            "cost": 26
          },
          {
            "targetExitId": "hf_to_kakarikogrotto",
            "cost": 39
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 38
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 45
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 36
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 16
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 13
          }
        ]
      },
      {
        "id": "forestgrotto_to_hf",
        "label": "Grotte sud-est",
        "soh": "HF Southeast Grotto",
        "entr": 2068,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_field::hf_to_forestgrotto"
      }
    ]
  },
  {
    "id": "lake_hylia",
    "name": "Lac Hylia",
    "exits": [
      {
        "id": "lake_to_hf",
        "label": "Sortie nord",
        "soh": "Lake Hylia North Exit",
        "entr": 393,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_field::hf_to_lake",
        "connections": [
          {
            "targetExitId": "lake_to_domain",
            "cost": 12
          },
          {
            "targetExitId": "lake_to_lab",
            "cost": 12
          },
          {
            "targetExitId": "lake_to_fishing",
            "cost": 18
          },
          {
            "targetExitId": "lab_to_grotto",
            "cost": 18
          },
          {
            "targetExitId": "lake_to_watertemple",
            "cost": 22
          },
          {
            "targetExitId": "lake_owl",
            "cost": 18
          }
        ]
      },
      {
        "id": "lake_to_domain",
        "label": "Raccourci sous-marin",
        "soh": "Lake Hylia Underwater Shortcut",
        "entr": 808,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zoras_domain::domain_to_lake",
        "connections": [
          {
            "targetExitId": "lake_to_hf",
            "cost": 12
          },
          {
            "targetExitId": "lake_to_lab",
            "cost": 6
          },
          {
            "targetExitId": "lake_to_fishing",
            "cost": 8
          },
          {
            "targetExitId": "lab_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "lake_to_watertemple",
            "cost": 11
          },
          {
            "targetExitId": "lake_owl",
            "cost": 15
          }
        ]
      },
      {
        "id": "oneway_lake_from_gv",
        "label": "Arrivée de la rivière",
        "soh": "Lake Hylia River Exit",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "lake_to_hf",
            "cost": 17
          },
          {
            "targetExitId": "lake_to_domain",
            "cost": 13
          },
          {
            "targetExitId": "lake_to_lab",
            "cost": 10
          },
          {
            "targetExitId": "lake_to_fishing",
            "cost": 22
          },
          {
            "targetExitId": "lab_to_grotto",
            "cost": 13
          },
          {
            "targetExitId": "lake_to_watertemple",
            "cost": 17
          },
          {
            "targetExitId": "lake_owl",
            "cost": 13
          }
        ]
      },
      {
        "id": "lake_to_lab",
        "label": "Entrée du Laboratoire du Lac",
        "soh": "LH Lab Entry",
        "entr": 67,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lake_hylia::lab_to_lake",
        "connections": [
          {
            "targetExitId": "lake_to_hf",
            "cost": 12
          },
          {
            "targetExitId": "lake_to_domain",
            "cost": 5
          },
          {
            "targetExitId": "lake_to_fishing",
            "cost": 15
          },
          {
            "targetExitId": "lab_to_grotto",
            "cost": 11
          },
          {
            "targetExitId": "lake_to_watertemple",
            "cost": 11
          },
          {
            "targetExitId": "lake_owl",
            "cost": 11
          }
        ]
      },
      {
        "id": "lab_to_lake",
        "label": "Laboratoire du Lac",
        "soh": "LH Lab",
        "entr": 972,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lake_hylia::lake_to_lab"
      },
      {
        "id": "lake_to_fishing",
        "label": "Entrée du stand de pêche",
        "soh": "LH Fishing Pond Entry",
        "entr": 1119,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lake_hylia::fishing_to_lake",
        "connections": [
          {
            "targetExitId": "lake_to_hf",
            "cost": 16
          },
          {
            "targetExitId": "lake_to_domain",
            "cost": 14
          },
          {
            "targetExitId": "lake_to_lab",
            "cost": 8
          },
          {
            "targetExitId": "lab_to_grotto",
            "cost": 23
          },
          {
            "targetExitId": "lake_to_watertemple",
            "cost": 12
          },
          {
            "targetExitId": "lake_owl",
            "cost": 23
          }
        ]
      },
      {
        "id": "fishing_to_lake",
        "label": "Stand de pêche",
        "soh": "Fishing Pond",
        "entr": 777,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lake_hylia::lake_to_fishing"
      },
      {
        "id": "lab_to_grotto",
        "label": "Entrée de la grotte de la tombe",
        "soh": "LH Grave Grotto Entry",
        "entr": 1793,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lake_hylia::grotto_to_lab",
        "connections": [
          {
            "targetExitId": "lake_to_hf",
            "cost": 18
          },
          {
            "targetExitId": "lake_to_domain",
            "cost": 16
          },
          {
            "targetExitId": "lake_to_lab",
            "cost": 11
          },
          {
            "targetExitId": "lake_to_fishing",
            "cost": 22
          },
          {
            "targetExitId": "lake_to_watertemple",
            "cost": 22
          },
          {
            "targetExitId": "lake_owl",
            "cost": 1
          }
        ]
      },
      {
        "id": "grotto_to_lab",
        "label": "Grotte des pestes Mojo",
        "soh": "LH Deku Scrub Grotto",
        "entr": 2049,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lake_hylia::lab_to_grotto"
      },
      {
        "id": "lake_to_watertemple",
        "label": "Devant le temple",
        "soh": "Lake Hylia Outside Temple",
        "entr": 16,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "water_temple::watertemple_to_lake",
        "connections": [
          {
            "targetExitId": "lake_to_hf",
            "cost": 22
          },
          {
            "targetExitId": "lake_to_domain",
            "cost": 11
          },
          {
            "targetExitId": "lake_to_lab",
            "cost": 15
          },
          {
            "targetExitId": "lake_to_fishing",
            "cost": 13
          },
          {
            "targetExitId": "lab_to_grotto",
            "cost": 24
          },
          {
            "targetExitId": "lake_owl",
            "cost": 24
          }
        ]
      },
      {
        "id": "serenade_pad",
        "label": "Plateforme de téléportation",
        "soh": "Lake Hylia Warp Pad",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "lake_to_hf",
            "cost": 27
          },
          {
            "targetExitId": "lake_to_domain",
            "cost": 13
          },
          {
            "targetExitId": "lake_to_lab",
            "cost": 20
          },
          {
            "targetExitId": "lake_to_fishing",
            "cost": 15
          },
          {
            "targetExitId": "lab_to_grotto",
            "cost": 8
          },
          {
            "targetExitId": "lake_to_watertemple",
            "cost": 3
          },
          {
            "targetExitId": "lake_owl",
            "cost": 8
          }
        ]
      },
      {
        "id": "lake_owl",
        "label": "Vol du hibou",
        "soh": "LH Owl Flight",
        "entr": 638,
        "type": "owl",
        "shuffleTag": "owl",
        "vanillaTargetExitId": "hyrule_field::hf_to_market"
      }
    ]
  },
  {
    "id": "gerudo_valley",
    "name": "Vallée Gerudo",
    "exits": [
      {
        "id": "gv_to_hf",
        "label": "Sortie est",
        "soh": "Gerudo Valley East Exit",
        "entr": 397,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_field::hf_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_gf",
            "cost": 24
          },
          {
            "targetExitId": "gv_to_lake",
            "cost": 26
          },
          {
            "targetExitId": "gv_to_tent",
            "cost": 16
          },
          {
            "targetExitId": "gv_to_octorokgrotto",
            "cost": 13
          },
          {
            "targetExitId": "gv_to_stormgrotto",
            "cost": 17
          }
        ]
      },
      {
        "id": "gv_to_gf",
        "label": "Sortie ouest",
        "soh": "Gerudo Valley West Exit",
        "entr": 297,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_hf",
            "cost": 24
          },
          {
            "targetExitId": "gv_to_lake",
            "cost": 28
          },
          {
            "targetExitId": "gv_to_tent",
            "cost": 9
          },
          {
            "targetExitId": "gv_to_octorokgrotto",
            "cost": 19
          },
          {
            "targetExitId": "gv_to_stormgrotto",
            "cost": 9
          }
        ]
      },
      {
        "id": "gv_to_lake",
        "label": "Sortie de la rivière",
        "soh": "Gerudo Valley River Exit",
        "entr": 537,
        "type": "overworld",
        "shuffleTag": "gerudo_river",
        "vanillaTargetExitId": "lake_hylia::oneway_lake_from_gv"
      },
      {
        "id": "gv_to_tent",
        "label": "Entrée de la tente des charpentiers",
        "soh": "GV Carpenters' Tent Entry",
        "entr": 928,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "gerudo_valley::tent_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_hf",
            "cost": 16
          },
          {
            "targetExitId": "gv_to_gf",
            "cost": 9
          },
          {
            "targetExitId": "gv_to_lake",
            "cost": 20
          },
          {
            "targetExitId": "gv_to_octorokgrotto",
            "cost": 11
          },
          {
            "targetExitId": "gv_to_stormgrotto",
            "cost": 2
          }
        ]
      },
      {
        "id": "tent_to_gv",
        "label": "Tente des charpentiers",
        "soh": "Carpenters' Tent",
        "entr": 976,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "gerudo_valley::gv_to_tent"
      },
      {
        "id": "gv_to_octorokgrotto",
        "label": "Entrée de la grotte du rocher argenté",
        "soh": "GV Silver Rock Grotto Entry",
        "entr": 1823,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_valley::octorokgrotto_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_lake",
            "cost": 12
          }
        ]
      },
      {
        "id": "octorokgrotto_to_gv",
        "label": "Grotte aux Octoroks",
        "soh": "GV Octorok Grotto",
        "entr": 2079,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_valley::gv_to_octorokgrotto"
      },
      {
        "id": "gv_to_stormgrotto",
        "label": "Entrée de la grotte derrière la tente",
        "soh": "GV Behind Tent Grotto Entry",
        "entr": 1822,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_valley::stormgrotto_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_hf",
            "cost": 17
          },
          {
            "targetExitId": "gv_to_gf",
            "cost": 9
          },
          {
            "targetExitId": "gv_to_lake",
            "cost": 21
          },
          {
            "targetExitId": "gv_to_tent",
            "cost": 2
          },
          {
            "targetExitId": "gv_to_octorokgrotto",
            "cost": 12
          }
        ]
      },
      {
        "id": "stormgrotto_to_gv",
        "label": "Grotte des pestes Mojo",
        "soh": "GV Deku Scrub Grotto",
        "entr": 2078,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_valley::gv_to_stormgrotto"
      }
    ]
  },
  {
    "id": "gerudo_fortress",
    "name": "Forteresse Gerudo",
    "exits": [
      {
        "id": "gf_to_gv",
        "label": "Sortie est",
        "soh": "Gerudo Fortress East Exit",
        "entr": 557,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "gerudo_valley::gv_to_gf",
        "connections": [
          {
            "targetExitId": "gf_to_hw",
            "cost": 18
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 12
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 8
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 15
          }
        ]
      },
      {
        "id": "gf_to_hw",
        "label": "Porte du désert",
        "soh": "Gerudo Fortress Gate Exit",
        "entr": 304,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "wasteland::hw_to_gf",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 18
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 12
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 14
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 15
          }
        ]
      },
      {
        "id": "gf_to_grotto",
        "label": "Entrée de la grotte des tempêtes",
        "soh": "GF Storms Grotto Entry",
        "entr": 1821,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_fortress::grotto_to_gf",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 11
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 12
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 3
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 15
          }
        ]
      },
      {
        "id": "grotto_to_gf",
        "label": "Grotte des fées",
        "soh": "GF Fairy Grotto",
        "entr": 2077,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_grotto"
      },
      {
        "id": "gf_to_gtg",
        "label": "Devant le Gymnase Gerudo",
        "soh": "GF Outside Training Ground",
        "entr": 8,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "gerudo_training_ground::gtg_to_gt",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 8
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 14
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 3
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 15
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 15
          }
        ]
      },
      {
        "id": "hideout_gf_a",
        "label": "Repaire : cellule à 1 torche, virage",
        "soh": "TH 1 Torch Cell Turn",
        "entr": 561,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_a_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_b",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_b",
        "label": "Repaire : cellule à 1 torche",
        "soh": "TH 1 Torch Cell",
        "entr": 565,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_b_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_a",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_c",
        "label": "Repaire : couloir de la cuisine, bas",
        "soh": "TH Kitchen Corridor Lower",
        "entr": 569,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_c_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_d",
            "cost": 5
          },
          {
            "targetExitId": "hideout_gf_e",
            "cost": 10
          },
          {
            "targetExitId": "hideout_gf_f",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_gf_d",
        "label": "Repaire : couloir de la cuisine, haut",
        "soh": "TH Kitchen Corridor Upper",
        "entr": 682,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_d_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_c",
            "cost": 5
          },
          {
            "targetExitId": "hideout_gf_e",
            "cost": 10
          },
          {
            "targetExitId": "hideout_gf_f",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_gf_e",
        "label": "Repaire : cuisine, côté couloir",
        "soh": "TH Kitchen By Corridor",
        "entr": 722,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_e_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_c",
            "cost": 10
          },
          {
            "targetExitId": "hideout_gf_d",
            "cost": 10
          },
          {
            "targetExitId": "hideout_gf_f",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_f",
        "label": "Repaire : cuisine, face au couloir",
        "soh": "TH Kitchen Opposite Corridor",
        "entr": 726,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_f_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_c",
            "cost": 10
          },
          {
            "targetExitId": "hideout_gf_d",
            "cost": 10
          },
          {
            "targetExitId": "hideout_gf_e",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_g",
        "label": "Repaire : double cellule, bas",
        "soh": "TH Double Cell Lower",
        "entr": 706,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_g_gf",
        "connections": [
          {
            "targetExitId": "hideout_a_gf",
            "cost": 5
          },
          {
            "targetExitId": "hideout_gf_h",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_h",
        "label": "Repaire : double cellule, haut",
        "soh": "TH Double Cell Upper",
        "entr": 710,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_h_gf",
        "connections": [
          {
            "targetExitId": "hideout_a_gf",
            "cost": 5
          },
          {
            "targetExitId": "hideout_gf_g",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_i",
        "label": "Repaire : cellule de la pente raide, deux rampes",
        "soh": "TH Steep Slope Cell Two Ramps",
        "entr": 702,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_i_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_j",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_j",
        "label": "Repaire : cellule de la pente raide",
        "soh": "TH Steep Slope Cell",
        "entr": 698,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_j_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_i",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_k",
        "label": "Repaire : cellule du cul-de-sac",
        "soh": "TH Dead End Cell",
        "entr": 932,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_k_gf"
      },
      {
        "id": "hideout_gf_l",
        "label": "Repaire : couloir de la salle de repos",
        "soh": "TH Break Room Corridor",
        "entr": 734,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_l_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_m",
            "cost": 15
          }
        ]
      },
      {
        "id": "hideout_gf_m",
        "label": "Repaire : salle de repos",
        "soh": "TH Break Room",
        "entr": 730,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_m_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_l",
            "cost": 15
          }
        ]
      },
      {
        "id": "hideout_a_gf",
        "label": "Abords de la forteresse",
        "soh": "GF Outskirts",
        "entr": 1158,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_a",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_b_gf",
        "label": "Près de la grotte, est",
        "soh": "GF Near Grotto East",
        "entr": 1162,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_b",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_c_gf",
        "label": "Près de la grotte, nord",
        "soh": "GF Near Grotto North",
        "entr": 1166,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_c",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_d_gf",
        "label": "Au-dessus du gymnase",
        "soh": "GF Above GTG",
        "entr": 1170,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_d",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_e_gf",
        "label": "En haut des lianes basses, à côté",
        "soh": "GF Top of Lower Vines Near",
        "entr": 1190,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_e",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_f_gf",
        "label": "Près de la Skulltula",
        "soh": "GF Near GS",
        "entr": 1194,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_f",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_k_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_g_gf",
        "label": "Juste au-dessus du gymnase",
        "soh": "GF Above GTG Directly",
        "entr": 1182,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_g",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_h_gf",
        "label": "En haut des lianes basses, en face",
        "soh": "GF Top of Lower Vines Across",
        "entr": 1186,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_h",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_i_gf",
        "label": "Au pied des lianes basses",
        "soh": "GF Bottom of Lower Vines",
        "entr": 1178,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_i",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_j_gf",
        "label": "Près de la grotte",
        "soh": "GF Near Grotto",
        "entr": 1174,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_j",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_k_gf",
        "label": "Sous la Skulltula",
        "soh": "GF Below GS",
        "entr": 1392,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_k",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_l_gf",
        "label": "Au-dessus de la prison",
        "soh": "GF Above Jail",
        "entr": 1202,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_l",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      },
      {
        "id": "hideout_m_gf",
        "label": "Sous le coffre",
        "soh": "GF Below Chest",
        "entr": 1198,
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_gf_m",
        "connections": [
          {
            "targetExitId": "gf_to_gv",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_hw",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15
          },
          {
            "targetExitId": "hideout_a_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_b_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_c_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_d_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_e_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_g_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_h_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_i_gf",
            "cost": 10
          },
          {
            "targetExitId": "hideout_j_gf",
            "cost": 10
          }
        ]
      }
    ]
  },
  {
    "id": "wasteland",
    "name": "Désert Hanté",
    "exits": [
      {
        "id": "hw_to_gf",
        "label": "Sortie est",
        "soh": "Haunted Wasteland East Exit",
        "entr": 940,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_hw",
        "connections": [
          {
            "targetExitId": "hw_to_colossus",
            "cost": 80
          }
        ]
      },
      {
        "id": "hw_to_colossus",
        "label": "Sortie ouest",
        "soh": "Haunted Wasteland West Exit",
        "entr": 291,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "desert_colossus::colossus_to_hw"
      }
    ]
  },
  {
    "id": "desert_colossus",
    "name": "Colosse du Désert",
    "exits": [
      {
        "id": "colossus_to_hw",
        "label": "Sortie est",
        "soh": "Desert Colossus East Exit",
        "entr": 869,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "wasteland::hw_to_colossus",
        "connections": [
          {
            "targetExitId": "colossus_to_greatfairy",
            "cost": 10
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 20
          },
          {
            "targetExitId": "colossus_to_spirittemple",
            "cost": 26
          }
        ]
      },
      {
        "id": "colossus_to_greatfairy",
        "label": "Entrée de la Grande Fée",
        "soh": "Colossus Great Fairy Entry",
        "entr": 1416,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "desert_colossus::greatfairy_to_colossus",
        "connections": [
          {
            "targetExitId": "colossus_to_hw",
            "cost": 10
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 10
          },
          {
            "targetExitId": "colossus_to_spirittemple",
            "cost": 20
          }
        ]
      },
      {
        "id": "greatfairy_to_colossus",
        "label": "Fontaine de la Grande Fée",
        "soh": "Colossus Great Fairy Fountain",
        "entr": 1404,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "desert_colossus::colossus_to_greatfairy"
      },
      {
        "id": "colossus_to_grotto",
        "label": "Entrée de la grotte",
        "soh": "Colossus Grotto Entry",
        "entr": 1792,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "desert_colossus::grotto_to_colossus",
        "connections": [
          {
            "targetExitId": "colossus_to_hw",
            "cost": 20
          },
          {
            "targetExitId": "colossus_to_greatfairy",
            "cost": 10
          },
          {
            "targetExitId": "colossus_to_spirittemple",
            "cost": 9
          }
        ]
      },
      {
        "id": "grotto_to_colossus",
        "label": "Grotte des pestes Mojo",
        "soh": "Colossus Deku Scrub Grotto",
        "entr": 2048,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "desert_colossus::colossus_to_grotto"
      },
      {
        "id": "colossus_to_spirittemple",
        "label": "Devant le temple",
        "soh": "Colossus Outside Temple",
        "entr": 130,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "spirit_temple::spiritemple_to_colossus",
        "connections": [
          {
            "targetExitId": "colossus_to_hw",
            "cost": 25
          },
          {
            "targetExitId": "colossus_to_greatfairy",
            "cost": 20
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 9
          }
        ]
      },
      {
        "id": "requiem_pad",
        "label": "Plateforme de téléportation",
        "soh": "Desert Colossus Warp Pad",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "colossus_to_hw",
            "cost": 24
          },
          {
            "targetExitId": "colossus_to_greatfairy",
            "cost": 15
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 5
          },
          {
            "targetExitId": "colossus_to_spirittemple",
            "cost": 10
          }
        ]
      }
    ]
  },
  {
    "id": "market",
    "name": "Bourg d'Hyrule",
    "exits": [
      {
        "id": "market_to_hf",
        "label": "Entrée du bourg, sortie sud",
        "soh": "Market Entrance South Exit",
        "entr": 509,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_field::hf_to_market",
        "connections": [
          {
            "targetExitId": "entrance_to_market",
            "cost": 4
          },
          {
            "targetExitId": "market_to_guardtower",
            "cost": 1
          }
        ]
      },
      {
        "id": "entrance_to_market",
        "label": "Entrée du bourg, sortie nord",
        "soh": "Market Entrance North Exit",
        "entr": 177,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::market_to_entrance",
        "connections": [
          {
            "targetExitId": "market_to_hf",
            "cost": 4
          },
          {
            "targetExitId": "market_to_guardtower",
            "cost": 4
          }
        ]
      },
      {
        "id": "market_to_entrance",
        "label": "Place du marché, sortie sud",
        "soh": "Market South Exit",
        "entr": 51,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::entrance_to_market",
        "connections": [
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 5
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 4
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 2
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 2
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 2
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 6
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 12
          }
        ]
      },
      {
        "id": "market_to_templeplaza",
        "label": "Sortie vers le temple",
        "soh": "Market Temple Exit",
        "entr": 369,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::templeplaza_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 5
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 2
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 1
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 3
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 1
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 13
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 7
          }
        ]
      },
      {
        "id": "templeplaza_to_market",
        "label": "Parvis du temple, sortie des pierres à potins",
        "soh": "ToT Courtyard Gossip Stones Exit",
        "entr": 606,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::market_to_templeplaza",
        "connections": [
          {
            "targetExitId": "templeplaza_to_templeoftime",
            "cost": 6
          }
        ]
      },
      {
        "id": "market_to_castle",
        "label": "Sortie vers le château",
        "soh": "Market Castle Exit",
        "entr": 312,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_castle::castle_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 4
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 2
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 3
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 2
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 4
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 1
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 12
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 6
          }
        ]
      },
      {
        "id": "market_to_guardtower",
        "label": "Entrée du poste de garde",
        "soh": "MK Entrance Guard House Entry",
        "entr": 126,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::guardtower_to_market",
        "connections": [
          {
            "targetExitId": "market_to_hf",
            "cost": 1
          },
          {
            "targetExitId": "entrance_to_market",
            "cost": 4
          }
        ]
      },
      {
        "id": "guardtower_to_market",
        "label": "Poste de garde",
        "soh": "Guard House",
        "entr": 622,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_guardtower"
      },
      {
        "id": "market_to_chestgame",
        "label": "Entrée de la chasse au trésor",
        "soh": "MK Treasure Chest Game Entry",
        "entr": 99,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::chestgame_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 2
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 4
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 2
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 3
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 2
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 4
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 10
          }
        ]
      },
      {
        "id": "chestgame_to_market",
        "label": "Chasse au trésor",
        "soh": "Treasure Chest Game",
        "entr": 469,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_chestgame"
      },
      {
        "id": "market_to_bowling",
        "label": "Entrée du Bowling Teigneux",
        "soh": "MK Bombchu Bowling Entry",
        "entr": 1287,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::bowling_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 2
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 4
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 3
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 2
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 3
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 3
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 3
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 4
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 10
          }
        ]
      },
      {
        "id": "bowling_to_market",
        "label": "Bowling Teigneux",
        "soh": "Bombchu Bowling",
        "entr": 956,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_bowling"
      },
      {
        "id": "market_to_bazaar",
        "label": "Entrée du bazar",
        "soh": "MK Bazaar Entry",
        "entr": 1324,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::bazaar_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 2
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 2
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 3
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 3
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 1
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 2
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 2
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 4
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 4
          }
        ]
      },
      {
        "id": "bazaar_to_market",
        "label": "Bazar",
        "soh": "MK Bazaar",
        "entr": 952,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_bazaar"
      },
      {
        "id": "market_to_potions",
        "label": "Entrée de l'apothicaire",
        "soh": "MK Potion Shop Entry",
        "entr": 904,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::potions_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 3
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 1
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 2
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 3
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 1
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 3
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 2
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 5
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 3
          }
        ]
      },
      {
        "id": "potions_to_market",
        "label": "Apothicaire",
        "soh": "MK Potion Shop",
        "entr": 674,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_potions"
      },
      {
        "id": "market_to_shooting",
        "label": "Entrée du stand de tir",
        "soh": "MK Shooting Gallery Entry",
        "entr": 365,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::shooting_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 2
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 3
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 4
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 2
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 6
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 12
          }
        ]
      },
      {
        "id": "shooting_to_market",
        "label": "Stand de tir",
        "soh": "MK Shooting Gallery",
        "entr": 461,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_shooting"
      },
      {
        "id": "market_to_masks",
        "label": "Entrée de la foire aux masques",
        "soh": "MK Mask Shop Entry",
        "entr": 1328,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::masks_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 4
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 1
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 1
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 2
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 12
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 7
          }
        ]
      },
      {
        "id": "masks_to_market",
        "label": "Foire aux masques",
        "soh": "Mask Shop",
        "entr": 465,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_masks"
      },
      {
        "id": "market_to_bombchushop",
        "label": "Entrée de la boutique de missiles",
        "soh": "MK Bombchu Shop Entry",
        "entr": 1320,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::bombchushop_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 6
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 13
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 12
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 4
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 4
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 5
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 6
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 12
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 6
          }
        ]
      },
      {
        "id": "bombchushop_to_market",
        "label": "Boutique de missiles",
        "soh": "Bombchu Shop",
        "entr": 960,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_bombchushop"
      },
      {
        "id": "market_to_backhouse",
        "label": "Entrée de la maison de l'homme en vert",
        "soh": "MK Man-in-Green House Entry",
        "entr": 1083,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::backhouse_to_market",
        "connections": [
          {
            "targetExitId": "market_to_entrance",
            "cost": 12
          },
          {
            "targetExitId": "market_to_templeplaza",
            "cost": 7
          },
          {
            "targetExitId": "market_to_castle",
            "cost": 6
          },
          {
            "targetExitId": "market_to_chestgame",
            "cost": 10
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 10
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 4
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 12
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 7
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 6
          }
        ]
      },
      {
        "id": "backhouse_to_market",
        "label": "Maison de l'homme en vert",
        "soh": "Man-in-Green's House",
        "entr": 103,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_backhouse"
      },
      {
        "id": "templeplaza_to_templeoftime",
        "label": "Parvis, entrée du temple",
        "soh": "ToT Courtyard Temple Entry",
        "entr": 83,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "market::templeoftime_to_templeplaza",
        "connections": [
          {
            "targetExitId": "templeplaza_to_market",
            "cost": 6
          }
        ]
      },
      {
        "id": "templeoftime_to_templeplaza",
        "label": "Entrée du Temple du Temps",
        "soh": "Temple of Time Entrance",
        "entr": 1138,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "market::templeplaza_to_templeoftime"
      },
      {
        "id": "prelude_pad",
        "label": "Plateforme de téléportation",
        "soh": "Temple of Time Warp Pad",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "templeoftime_to_templeplaza",
            "cost": 1
          }
        ]
      }
    ]
  },
  {
    "id": "hyrule_castle",
    "name": "Château d'Hyrule",
    "exits": [
      {
        "id": "castle_to_market",
        "label": "Abords du château, sortie sud",
        "soh": "Castle Grounds South Exit",
        "entr": 602,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::market_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_adultgreatfairy",
            "cost": 15
          },
          {
            "targetExitId": "castle_to_childgreatfairy",
            "cost": 15
          },
          {
            "targetExitId": "castle_to_grotto",
            "cost": 35
          },
          {
            "targetExitId": "castle_to_ganon",
            "cost": 10
          }
        ]
      },
      {
        "id": "castle_to_adultgreatfairy",
        "label": "Derrière le pilier",
        "soh": "OGC Behind Pillar",
        "entr": 1218,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "hyrule_castle::adultgreatfairy_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 15
          },
          {
            "targetExitId": "castle_to_ganon",
            "cost": 10
          }
        ]
      },
      {
        "id": "adultgreatfairy_to_castle",
        "label": "Fontaine de la Grande Fée (extérieur du Château de Ganon)",
        "soh": "OGC Great Fairy Fountain",
        "entr": 1000,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "hyrule_castle::castle_to_adultgreatfairy"
      },
      {
        "id": "castle_to_childgreatfairy",
        "label": "Passage sous le rocher",
        "soh": "HC Boulder Crawlspace",
        "entr": 1400,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "hyrule_castle::childgreatfairy_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 15
          },
          {
            "targetExitId": "castle_to_grotto",
            "cost": 25
          }
        ]
      },
      {
        "id": "childgreatfairy_to_castle",
        "label": "Fontaine de la Grande Fée (Château d'Hyrule)",
        "soh": "HC Great Fairy Fountain",
        "entr": 832,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "hyrule_castle::castle_to_childgreatfairy"
      },
      {
        "id": "castle_to_grotto",
        "label": "Entrée de la grotte des tempêtes",
        "soh": "HC Storms Grotto Entry",
        "entr": 1804,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_castle::grotto_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 35
          },
          {
            "targetExitId": "castle_to_childgreatfairy",
            "cost": 25
          }
        ]
      },
      {
        "id": "grotto_to_castle",
        "label": "Grotte des tempêtes",
        "soh": "HC Storms Grotto",
        "entr": 2060,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hyrule_castle::castle_to_grotto"
      },
      {
        "id": "castle_to_ganon",
        "label": "Pont arc-en-ciel",
        "soh": "OGC Rainbow Bridge Exit",
        "entr": 1127,
        "type": "dungeon",
        "shuffleTag": "dungeon_ganon",
        "vanillaTargetExitId": "ganons_castle::ganon_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 10
          }
        ]
      }
    ]
  },
  {
    "id": "kakariko_village",
    "name": "Village Cocorico",
    "exits": [
      {
        "id": "kak_to_hf",
        "label": "Porte principale",
        "soh": "Kakariko Front Gate",
        "entr": 381,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_field::hf_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_dmt",
            "cost": 16
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 16
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 21
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 23
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 20
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 11
          }
        ]
      },
      {
        "id": "kak_to_dmt",
        "label": "Porte du garde",
        "soh": "Kakariko Guard Gate Exit",
        "entr": 317,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 16
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 11
          }
        ]
      },
      {
        "id": "kak_to_graveyard",
        "label": "Sortie sud-est",
        "soh": "Kakariko Southeast Exit",
        "entr": 228,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "graveyard::graveyard_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 5
          }
        ]
      },
      {
        "id": "kak_to_carpenter",
        "label": "Entrée de la maison du Chef des Charpentiers",
        "soh": "Kak Boss House Entry",
        "entr": 765,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::carpenter_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 16
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 18
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 1
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 5
          }
        ]
      },
      {
        "id": "carpenter_to_kak",
        "label": "Maison du Chef des Charpentiers",
        "soh": "Carpenter Boss House",
        "entr": 841,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_carpenter"
      },
      {
        "id": "kak_to_bazaar",
        "label": "Entrée du bazar",
        "soh": "Kak Bazaar Entry",
        "entr": 183,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::bazaar_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 1
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 8
          }
        ]
      },
      {
        "id": "bazaar_to_kak",
        "label": "Bazar",
        "soh": "Kak Bazaar",
        "entr": 513,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_bazaar"
      },
      {
        "id": "kak_to_shooting",
        "label": "Entrée du stand de tir",
        "soh": "Kak Shooting Gallery Entry",
        "entr": 59,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::shooting_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 19
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 16
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 2
          }
        ]
      },
      {
        "id": "shooting_to_kak",
        "label": "Stand de tir",
        "soh": "Kak Shooting Gallery",
        "entr": 1123,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_shooting"
      },
      {
        "id": "kak_to_odd",
        "label": "Entrée de l'apothicaire de Granny",
        "soh": "Kak Granny's Potion Shop Entry",
        "entr": 114,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::odd_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 1
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 2
          }
        ]
      },
      {
        "id": "odd_to_kak",
        "label": "Apothicaire de Granny",
        "soh": "Granny's Potion Shop",
        "entr": 845,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_odd"
      },
      {
        "id": "kak_to_impas",
        "label": "Entrée avant de la maison d'Impa",
        "soh": "Kak Impa's House Front Entry",
        "entr": 924,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::impas_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 19
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 21
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 18
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 8
          }
        ]
      },
      {
        "id": "impas_to_kak",
        "label": "Maison d'Impa, avant",
        "soh": "Impa's House Front",
        "entr": 837,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_impas"
      },
      {
        "id": "kak_to_impas_back",
        "label": "Entrée arrière de la maison d'Impa",
        "soh": "Kak Impa's House Back Entry",
        "entr": 1480,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::impas_to_kak_back",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 20
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 22
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 19
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 4
          }
        ]
      },
      {
        "id": "impas_to_kak_back",
        "label": "Maison d'Impa, arrière",
        "soh": "Impa's House Back",
        "entr": 1500,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_impas_back"
      },
      {
        "id": "owl_impas_roof",
        "label": "Toit de la maison d'Impa",
        "soh": "Kakariko Village Owl Drop",
        "type": "owl",
        "shuffleTag": "owl",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 2
          },
          {
            "targetExitId": "kak_to_hf",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 20
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 22
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 19
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 4
          }
        ]
      },
      {
        "id": "kak_to_skulltulas",
        "label": "Entrée de la maison des Araignées",
        "soh": "Kak Skulltula House Entry",
        "entr": 1360,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::skulltulas_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 19
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 2
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 16
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 5
          }
        ]
      },
      {
        "id": "skulltulas_to_kak",
        "label": "Maison des Araignées",
        "soh": "House of Skulltula",
        "entr": 1262,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_skulltulas"
      },
      {
        "id": "kak_to_potions",
        "label": "Entrée avant de l'apothicaire",
        "soh": "Kak Potion Shop Front Entry",
        "entr": 900,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko_village::potions_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 1
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 8
          }
        ]
      },
      {
        "id": "potions_to_kak",
        "label": "Apothicaire, avant",
        "soh": "Kak Potion Shop Front",
        "entr": 1099,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko_village::kak_to_potions",
        "connections": [
          {
            "targetExitId": "potions_to_kak_back",
            "cost": 1
          }
        ]
      },
      {
        "id": "kak_to_potions_back",
        "label": "Entrée arrière de l'apothicaire",
        "soh": "Kak Potion Shop Back Entry",
        "entr": 1004,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko_village::potions_to_kak_back",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 2
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 1
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 2
          }
        ]
      },
      {
        "id": "potions_to_kak_back",
        "label": "Apothicaire, arrière",
        "soh": "Kak Potion Shop Back",
        "entr": 1279,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko_village::kak_to_potions_back",
        "connections": [
          {
            "targetExitId": "potions_to_kak",
            "cost": 1
          }
        ]
      },
      {
        "id": "kak_to_windmill",
        "label": "Entrée du moulin",
        "soh": "Kak Windmill Entry",
        "entr": 1107,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko_village::windmill_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 21
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 23
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 20
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 2
          }
        ]
      },
      {
        "id": "windmill_to_kak",
        "label": "Moulin",
        "soh": "Windmill",
        "entr": 849,
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko_village::kak_to_windmill"
      },
      {
        "id": "kak_to_redeadgrotto",
        "label": "Entrée de la grotte centrale",
        "soh": "Kak Center Grotto Entry",
        "entr": 1803,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko_village::redeadgrotto_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 1
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 9
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 15
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 4
          }
        ]
      },
      {
        "id": "redeadgrotto_to_kak",
        "label": "Grotte aux Effrois",
        "soh": "Kak Redead Grotto",
        "entr": 2059,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko_village::kak_to_redeadgrotto"
      },
      {
        "id": "kak_to_opengrotto",
        "label": "Entrée de la grotte ouverte",
        "soh": "Kak Open Grotto Entry",
        "entr": 1802,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko_village::opengrotto_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 16
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 1
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 3
          }
        ]
      },
      {
        "id": "opengrotto_to_kak",
        "label": "Grotte ouverte",
        "soh": "Kak Open Grotto",
        "entr": 2058,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko_village::kak_to_opengrotto"
      },
      {
        "id": "kak_to_well",
        "label": "Devant le puits",
        "soh": "Kakariko Outside the Well",
        "entr": 152,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "bottom_of_the_well::well_to_kak",
        "connections": [
          {
            "targetExitId": "kak_to_hf",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_dmt",
            "cost": 13
          },
          {
            "targetExitId": "kak_to_graveyard",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_carpenter",
            "cost": 5
          },
          {
            "targetExitId": "kak_to_bazaar",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 2
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 19
          },
          {
            "targetExitId": "kak_to_impas",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_impas_back",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_skulltulas",
            "cost": 6
          },
          {
            "targetExitId": "kak_to_potions",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 21
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 18
          }
        ]
      }
    ]
  },
  {
    "id": "graveyard",
    "name": "Cimetière Cocorico",
    "exits": [
      {
        "id": "graveyard_to_kak",
        "label": "Entrée du cimetière",
        "soh": "Graveyard Entrance",
        "entr": 405,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kakariko_village::kak_to_graveyard",
        "connections": [
          {
            "targetExitId": "graveyard_to_dampes",
            "cost": 4
          },
          {
            "targetExitId": "graveyard_to_shieldgrave",
            "cost": 5
          },
          {
            "targetExitId": "graveyard_to_dampesgrave",
            "cost": 5
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 14
          },
          {
            "targetExitId": "graveyard_to_royaltomb",
            "cost": 16
          }
        ]
      },
      {
        "id": "graveyard_to_dampes",
        "label": "Entrée de la cabane d'Igor",
        "soh": "GY Dampe's Hut Entry",
        "entr": 781,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "graveyard::dampes_to_graveyard",
        "connections": [
          {
            "targetExitId": "graveyard_to_kak",
            "cost": 9
          },
          {
            "targetExitId": "graveyard_to_shieldgrave",
            "cost": 7
          },
          {
            "targetExitId": "graveyard_to_dampesgrave",
            "cost": 7
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 16
          },
          {
            "targetExitId": "graveyard_to_royaltomb",
            "cost": 18
          }
        ]
      },
      {
        "id": "dampes_to_graveyard",
        "label": "Cabane d'Igor",
        "soh": "Dampe's Hut",
        "entr": 853,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "graveyard::graveyard_to_dampes"
      },
      {
        "id": "graveyard_to_shieldgrave",
        "label": "Entrée de la tombe près de la cabane",
        "soh": "GY Near-Hut Grave Entry",
        "entr": 75,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::shieldgrave_to_graveyard",
        "connections": [
          {
            "targetExitId": "graveyard_to_kak",
            "cost": 10
          },
          {
            "targetExitId": "graveyard_to_dampes",
            "cost": 5
          },
          {
            "targetExitId": "graveyard_to_dampesgrave",
            "cost": 5
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 10
          },
          {
            "targetExitId": "graveyard_to_royaltomb",
            "cost": 14
          }
        ]
      },
      {
        "id": "shieldgrave_to_graveyard",
        "label": "Tombe au bouclier",
        "soh": "Shield Grave",
        "entr": 861,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::graveyard_to_shieldgrave"
      },
      {
        "id": "graveyard_to_dampesgrave",
        "label": "Entrée de la tombe près de la corniche",
        "soh": "GY Near-Ledge Grave Entry",
        "entr": 1103,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::dampesgrave_to_graveyard",
        "connections": [
          {
            "targetExitId": "graveyard_to_kak",
            "cost": 11
          },
          {
            "targetExitId": "graveyard_to_dampes",
            "cost": 7
          },
          {
            "targetExitId": "graveyard_to_shieldgrave",
            "cost": 6
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 9
          },
          {
            "targetExitId": "graveyard_to_royaltomb",
            "cost": 11
          }
        ]
      },
      {
        "id": "dampesgrave_to_graveyard",
        "label": "Tombe d'Igor",
        "soh": "Dampe's Grave",
        "entr": 857,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::graveyard_to_dampesgrave",
        "connections": [
          {
            "targetExitId": "kakariko_village::windmill_to_kak",
            "cost": 99
          }
        ]
      },
      {
        "id": "graveyard_to_redeadgrave",
        "label": "Entrée de la tombe près de la tombe royale",
        "soh": "GY Near-Tomb Grave Entry",
        "entr": 796,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::redeadgrave_to_graveyard",
        "connections": [
          {
            "targetExitId": "graveyard_to_kak",
            "cost": 12
          },
          {
            "targetExitId": "graveyard_to_dampes",
            "cost": 6
          },
          {
            "targetExitId": "graveyard_to_shieldgrave",
            "cost": 8
          },
          {
            "targetExitId": "graveyard_to_dampesgrave",
            "cost": 4
          },
          {
            "targetExitId": "graveyard_to_royaltomb",
            "cost": 5
          }
        ]
      },
      {
        "id": "redeadgrave_to_graveyard",
        "label": "Tombe au quart de cœur",
        "soh": "Heart Piece Grave",
        "entr": 865,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::graveyard_to_redeadgrave"
      },
      {
        "id": "graveyard_to_royaltomb",
        "label": "Entrée de la tombe royale",
        "soh": "GY Royal Family's Tomb Entry",
        "entr": 45,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::royaltomb_to_graveyard",
        "connections": [
          {
            "targetExitId": "graveyard_to_kak",
            "cost": 18
          },
          {
            "targetExitId": "graveyard_to_dampes",
            "cost": 12
          },
          {
            "targetExitId": "graveyard_to_shieldgrave",
            "cost": 7
          },
          {
            "targetExitId": "graveyard_to_dampesgrave",
            "cost": 4
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 9
          }
        ]
      },
      {
        "id": "royaltomb_to_graveyard",
        "label": "Tombe royale",
        "soh": "Royal Family's Tomb",
        "entr": 1291,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "graveyard::graveyard_to_royaltomb"
      },
      {
        "id": "graveyard_to_shadowtemple",
        "label": "Devant le temple",
        "soh": "Graveyard Outside Temple",
        "entr": 55,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "shadow_temple::shadowtemple_to_graveyard",
        "connections": [
          {
            "targetExitId": "graveyard_to_kak",
            "cost": 31
          },
          {
            "targetExitId": "graveyard_to_dampes",
            "cost": 25
          },
          {
            "targetExitId": "graveyard_to_shieldgrave",
            "cost": 20
          },
          {
            "targetExitId": "graveyard_to_dampesgrave",
            "cost": 17
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 22
          }
        ]
      },
      {
        "id": "nocturne_pad",
        "label": "Plateforme de téléportation",
        "soh": "Graveyard Warp Pad",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "graveyard_to_kak",
            "cost": 22
          },
          {
            "targetExitId": "graveyard_to_dampes",
            "cost": 16
          },
          {
            "targetExitId": "graveyard_to_shieldgrave",
            "cost": 11
          },
          {
            "targetExitId": "graveyard_to_dampesgrave",
            "cost": 8
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 13
          },
          {
            "targetExitId": "graveyard_to_royaltomb",
            "cost": 4
          },
          {
            "targetExitId": "graveyard_to_shadowtemple",
            "cost": 10
          }
        ]
      }
    ]
  },
  {
    "id": "death_mountain_trail",
    "name": "Chemin du Péril",
    "exits": [
      {
        "id": "dmt_to_kak",
        "label": "Sortie basse",
        "soh": "Death Mountain Trail Bottom Exit",
        "entr": 401,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kakariko_village::kak_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_gc",
            "cost": 25
          },
          {
            "targetExitId": "dmt_to_dmc",
            "cost": 39
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 38
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 23
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 22
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 11
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 37
          }
        ]
      },
      {
        "id": "dmt_to_gc",
        "label": "Sortie médiane",
        "soh": "Death Mountain Trail Middle Exit",
        "entr": 333,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "goron_city::gc_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_kak",
            "cost": 15
          },
          {
            "targetExitId": "dmt_to_dmc",
            "cost": 27
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 26
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 2
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 10
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 16
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 25
          }
        ]
      },
      {
        "id": "dmt_to_dmc",
        "label": "Sortie haute",
        "soh": "Death Mountain Trail Top Exit",
        "entr": 327,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_kak",
            "cost": 30
          },
          {
            "targetExitId": "dmt_to_gc",
            "cost": 15
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 29
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 13
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 13
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 25
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 28
          }
        ]
      },
      {
        "id": "dmt_to_greatfairy",
        "label": "Entrée de la Grande Fée",
        "soh": "DMT Great Fairy Entry",
        "entr": 789,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "death_mountain_trail::greatfairy_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_kak",
            "cost": 29
          },
          {
            "targetExitId": "dmt_to_gc",
            "cost": 14
          },
          {
            "targetExitId": "dmt_to_dmc",
            "cost": 29
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 12
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 12
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 24
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 27
          }
        ]
      },
      {
        "id": "greatfairy_to_dmt",
        "label": "Fontaine de la Grande Fée",
        "soh": "DMT Great Fairy Fountain",
        "entr": 1115,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_greatfairy"
      },
      {
        "id": "dmt_to_stormgrotto",
        "label": "Entrée de la grotte du cercle de pierres",
        "soh": "DMT Rock Circle Grotto Entry",
        "entr": 1800,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_trail::stormgrotto_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_kak",
            "cost": 13
          },
          {
            "targetExitId": "dmt_to_gc",
            "cost": 2
          },
          {
            "targetExitId": "dmt_to_dmc",
            "cost": 25
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 24
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 8
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 14
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 23
          }
        ]
      },
      {
        "id": "stormgrotto_to_dmt",
        "label": "Grotte des tempêtes",
        "soh": "DMT Storms Grotto",
        "entr": 2056,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_stormgrotto"
      },
      {
        "id": "dmt_to_cowgrotto",
        "label": "Entrée de la grotte du rocher",
        "soh": "DMT Boulder Grotto Entry",
        "entr": 1801,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_trail::cowgrotto_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_kak",
            "cost": 14
          },
          {
            "targetExitId": "dmt_to_gc",
            "cost": 8
          },
          {
            "targetExitId": "dmt_to_dmc",
            "cost": 17
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 16
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 6
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 13
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 15
          }
        ]
      },
      {
        "id": "cowgrotto_to_dmt",
        "label": "Grotte à la vache",
        "soh": "DMT Cow Grotto",
        "entr": 2057,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_cowgrotto"
      },
      {
        "id": "dmt_to_dc",
        "label": "Devant la Caverne Dodongo",
        "soh": "Death Mountain Trail Outside Dodongo's Cavern",
        "entr": 4,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "dodongos_cavern::dc_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_kak",
            "cost": 11
          },
          {
            "targetExitId": "dmt_to_gc",
            "cost": 14
          },
          {
            "targetExitId": "dmt_to_dmc",
            "cost": 30
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 29
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 12
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 13
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 28
          }
        ]
      },
      {
        "id": "dmt_owl",
        "label": "Vol du hibou",
        "soh": "DMT Owl Flight",
        "entr": 1364,
        "type": "owl",
        "shuffleTag": "owl",
        "vanillaTargetExitId": "kakariko_village::owl_impas_roof"
      }
    ]
  },
  {
    "id": "goron_city",
    "name": "Village Goron",
    "exits": [
      {
        "id": "gc_to_dmt",
        "label": "Sortie haute",
        "soh": "Goron City Upper Exit",
        "entr": 441,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_gc",
        "connections": [
          {
            "targetExitId": "gc_to_lw",
            "cost": 11
          },
          {
            "targetExitId": "gc_to_dmc",
            "cost": 14
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 8
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 16
          }
        ]
      },
      {
        "id": "gc_to_lw",
        "label": "Raccourci du tunnel",
        "soh": "Goron City Tunnel Shortcut",
        "entr": 1238,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lost_woods::lw_to_gc",
        "connections": [
          {
            "targetExitId": "gc_to_dmt",
            "cost": 22
          },
          {
            "targetExitId": "gc_to_dmc",
            "cost": 12
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 6
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 13
          }
        ]
      },
      {
        "id": "gc_to_dmc",
        "label": "Porte arrière de la salle de Darunia",
        "soh": "Goron City Darunia's Room Backdoor",
        "entr": 582,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_gc",
        "connections": [
          {
            "targetExitId": "gc_to_dmt",
            "cost": 30
          },
          {
            "targetExitId": "gc_to_lw",
            "cost": 14
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 8
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 20
          }
        ]
      },
      {
        "id": "gc_to_shop",
        "label": "Entrée de la boutique",
        "soh": "GC Shop Entry",
        "entr": 892,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "goron_city::shop_to_gc",
        "connections": [
          {
            "targetExitId": "gc_to_dmt",
            "cost": 22
          },
          {
            "targetExitId": "gc_to_lw",
            "cost": 6
          },
          {
            "targetExitId": "gc_to_dmc",
            "cost": 8
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 12
          }
        ]
      },
      {
        "id": "shop_to_gc",
        "label": "Boutique Goron",
        "soh": "Goron Shop",
        "entr": 1020,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "goron_city::gc_to_shop"
      },
      {
        "id": "gc_to_grotto",
        "label": "Entrée de la grotte de lave",
        "soh": "GC Lava Grotto Entry",
        "entr": 1799,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "goron_city::grotto_to_gc",
        "connections": [
          {
            "targetExitId": "gc_to_dmt",
            "cost": 15
          },
          {
            "targetExitId": "gc_to_lw",
            "cost": 15
          },
          {
            "targetExitId": "gc_to_dmc",
            "cost": 12
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 6
          }
        ]
      },
      {
        "id": "grotto_to_gc",
        "label": "Grotte des pestes Mojo",
        "soh": "GC Deku Scrub Grotto",
        "entr": 2055,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "goron_city::gc_to_grotto"
      }
    ]
  },
  {
    "id": "death_mountain_crater",
    "name": "Cratère du Péril",
    "exits": [
      {
        "id": "dmc_to_dmt",
        "label": "Sortie haute",
        "soh": "Death Mountain Crater Upper Exit",
        "entr": 445,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_gc",
            "cost": 14
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 9
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 4
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 13
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 22
          }
        ]
      },
      {
        "id": "dmc_to_gc",
        "label": "Sortie du pont",
        "soh": "Death Mountain Crater Bridge Exit",
        "entr": 449,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "goron_city::gc_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 14
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 5
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 10
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 2
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 12
          }
        ]
      },
      {
        "id": "dmc_to_greatfairy",
        "label": "Entrée de la Grande Fée",
        "soh": "DMC Great Fairy Entry",
        "entr": 1214,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "death_mountain_crater::greatfairy_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 11
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 4
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 7
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 6
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 16
          }
        ]
      },
      {
        "id": "greatfairy_to_dmc",
        "label": "Fontaine de la Grande Fée",
        "soh": "DMC Great Fairy Fountain",
        "entr": 1154,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_greatfairy"
      },
      {
        "id": "dmc_to_bombgrotto",
        "label": "Entrée de la grotte du haut",
        "soh": "DMC Upper Grotto Entry",
        "entr": 1798,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_crater::bombgrotto_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 4
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 13
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 8
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 12
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 21
          }
        ]
      },
      {
        "id": "bombgrotto_to_dmc",
        "label": "Grotte du haut",
        "soh": "DMC Upper Grotto",
        "entr": 2054,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_bombgrotto"
      },
      {
        "id": "dmc_to_hammergrotto",
        "label": "Entrée de la grotte à la masse",
        "soh": "DMC Hammer Grotto Entry",
        "entr": 1797,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_crater::hammergrotto_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 15
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 2
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 6
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 11
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 11
          }
        ]
      },
      {
        "id": "hammergrotto_to_dmc",
        "label": "Grotte des pestes Mojo",
        "soh": "DMC Deku Scrub Grotto",
        "entr": 2053,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_hammergrotto"
      },
      {
        "id": "dmc_to_firetemple",
        "label": "Devant le temple",
        "soh": "Death Mountain Crater Outside Temple",
        "entr": 357,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "fire_temple::firetemple_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 22
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 12
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 15
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 21
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 11
          }
        ]
      },
      {
        "id": "bolero_pad",
        "label": "Plateforme de téléportation",
        "soh": "DMC Warp Pad",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 18
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 8
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 11
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 17
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 7
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 6
          }
        ]
      }
    ]
  },
  {
    "id": "zoras_river",
    "name": "Rivière Zora",
    "exits": [
      {
        "id": "river_to_hf",
        "label": "Sortie basse",
        "soh": "Zora's River Lower Exit",
        "entr": 385,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_field::hf_to_river",
        "connections": [
          {
            "targetExitId": "river_to_lw",
            "cost": 38
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 38
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 5
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 31
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 31
          }
        ]
      },
      {
        "id": "river_to_lw",
        "label": "Raccourci sous-marin",
        "soh": "Zora's River Underwater Shortcut",
        "entr": 1242,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lost_woods::lw_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 38
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 3
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 34
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 17
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 17
          }
        ]
      },
      {
        "id": "river_to_domain",
        "label": "Sortie de la cascade",
        "soh": "Zora's River Waterfall Exit",
        "entr": 264,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zoras_domain::domain_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 38
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 3
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 34
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 17
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 17
          }
        ]
      },
      {
        "id": "river_to_stormsgrotto",
        "label": "Entrée de la grotte du cercle de pierres",
        "soh": "ZR Rock Circle Grotto Entry",
        "entr": 1794,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_river::stormsgrotto_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 6
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 34
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 34
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 27
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 27
          }
        ]
      },
      {
        "id": "stormsgrotto_to_river",
        "label": "Grotte des pestes Mojo",
        "soh": "ZR Deku Scrub Grotto",
        "entr": 2050,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_river::river_to_stormsgrotto"
      },
      {
        "id": "river_to_opengrotto",
        "label": "Entrée de la grotte ouverte surélevée",
        "soh": "ZR Raised Open Grotto Entry",
        "entr": 1796,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_river::opengrotto_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 10
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 15
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 15
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 9
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 2
          }
        ]
      },
      {
        "id": "opengrotto_to_river",
        "label": "Grotte ouverte",
        "soh": "ZR Open Grotto",
        "entr": 2052,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_river::river_to_opengrotto"
      },
      {
        "id": "river_to_fairygrotto",
        "label": "Entrée de la grotte du rocher surélevé",
        "soh": "ZR Raised Boulder Grotto Entry",
        "entr": 1795,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_river::fairygrotto_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 13
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 15
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 15
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 9
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 2
          }
        ]
      },
      {
        "id": "fairygrotto_to_river",
        "label": "Grotte des fées",
        "soh": "ZR Fairy Grotto",
        "entr": 2051,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_river::river_to_fairygrotto"
      }
    ]
  },
  {
    "id": "zoras_domain",
    "name": "Domaine Zora",
    "exits": [
      {
        "id": "domain_to_river",
        "label": "Entrée du domaine",
        "soh": "Zora's Domain Entrance",
        "entr": 413,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zoras_river::river_to_domain",
        "connections": [
          {
            "targetExitId": "domain_to_lake",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_fountain",
            "cost": 25
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 15
          }
        ]
      },
      {
        "id": "domain_to_lake",
        "label": "Raccourci sous-marin",
        "soh": "Zora's Domain Underwater Shortcut",
        "entr": 1376,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lake_hylia::lake_to_domain",
        "connections": [
          {
            "targetExitId": "domain_to_river",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_fountain",
            "cost": 25
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 10
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 5
          }
        ]
      },
      {
        "id": "domain_to_fountain",
        "label": "Derrière le Roi Zora",
        "soh": "Zora's Domain Behind King Zora",
        "entr": 549,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zoras_fountain::foutain_to_domain",
        "connections": [
          {
            "targetExitId": "domain_to_river",
            "cost": 20
          },
          {
            "targetExitId": "domain_to_lake",
            "cost": 10
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 10
          }
        ]
      },
      {
        "id": "domain_to_shop",
        "label": "Entrée de la boutique",
        "soh": "ZD Shop Entry",
        "entr": 896,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zoras_domain::shop_to_domain",
        "connections": [
          {
            "targetExitId": "domain_to_river",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_lake",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_fountain",
            "cost": 20
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 15
          }
        ]
      },
      {
        "id": "shop_to_domain",
        "label": "Boutique Zora",
        "soh": "Zora Shop",
        "entr": 964,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zoras_domain::domain_to_shop"
      },
      {
        "id": "domain_to_grotto",
        "label": "Entrée de la grotte de l'île",
        "soh": "ZD Island Grotto Entry",
        "entr": 1820,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_domain::grotto_to_domain",
        "connections": [
          {
            "targetExitId": "domain_to_river",
            "cost": 10
          },
          {
            "targetExitId": "domain_to_lake",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_fountain",
            "cost": 25
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 10
          }
        ]
      },
      {
        "id": "grotto_to_domain",
        "label": "Grotte des fées",
        "soh": "ZD Fairy Grotto",
        "entr": 2076,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zoras_domain::domain_to_grotto"
      }
    ]
  },
  {
    "id": "zoras_fountain",
    "name": "Fontaine Zora",
    "exits": [
      {
        "id": "foutain_to_domain",
        "label": "Sortie du tunnel",
        "soh": "Zora's Fountain Tunnel Exit",
        "entr": 417,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zoras_domain::domain_to_fountain",
        "connections": [
          {
            "targetExitId": "fountain_to_greatfairy",
            "cost": 12
          },
          {
            "targetExitId": "fountain_to_jbjb",
            "cost": 5
          },
          {
            "targetExitId": "fountain_to_ic",
            "cost": 16
          }
        ]
      },
      {
        "id": "fountain_to_greatfairy",
        "label": "Entrée de la Grande Fée",
        "soh": "ZF Great Fairy Entry",
        "entr": 881,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zoras_fountain::greatfairy_to_fountain",
        "connections": [
          {
            "targetExitId": "foutain_to_domain",
            "cost": 12
          },
          {
            "targetExitId": "fountain_to_jbjb",
            "cost": 11
          },
          {
            "targetExitId": "fountain_to_ic",
            "cost": 15
          }
        ]
      },
      {
        "id": "greatfairy_to_fountain",
        "label": "Fontaine de la Grande Fée",
        "soh": "ZF Great Fairy Fountain",
        "entr": 916,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zoras_fountain::fountain_to_greatfairy"
      },
      {
        "id": "fountain_to_jbjb",
        "label": "Devant Jabu-Jabu",
        "soh": "Zora's Fountain Outside Jabu Jabu",
        "entr": 40,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "jabu_jabus_belly::jbjb_to_fountain",
        "connections": [
          {
            "targetExitId": "foutain_to_domain",
            "cost": 5
          },
          {
            "targetExitId": "fountain_to_greatfairy",
            "cost": 12
          },
          {
            "targetExitId": "fountain_to_ic",
            "cost": 12
          }
        ]
      },
      {
        "id": "fountain_to_ic",
        "label": "Devant la Caverne de Glace",
        "soh": "Zora's Fountain Outside Ice Cavern",
        "entr": 136,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "ice_cavern::ic_to_fountain",
        "connections": [
          {
            "targetExitId": "foutain_to_domain",
            "cost": 15
          },
          {
            "targetExitId": "fountain_to_greatfairy",
            "cost": 15
          },
          {
            "targetExitId": "fountain_to_jbjb",
            "cost": 12
          }
        ]
      }
    ]
  },
  {
    "id": "lon_lon_ranch",
    "name": "Ranch Lon Lon",
    "exits": [
      {
        "id": "ranch_to_hf",
        "label": "Entrée du ranch",
        "soh": "Lon Lon Ranch Entrance",
        "entr": 505,
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hyrule_field::hf_to_ranch",
        "connections": [
          {
            "targetExitId": "ranch_to_talon",
            "cost": 5
          },
          {
            "targetExitId": "ranch_to_stables",
            "cost": 7
          },
          {
            "targetExitId": "ranch_to_silo",
            "cost": 30
          },
          {
            "targetExitId": "ranch_to_grotto",
            "cost": 30
          }
        ]
      },
      {
        "id": "ranch_to_talon",
        "label": "Entrée de la maison de Talon",
        "soh": "LLR Talon's House Entry",
        "entr": 79,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lon_lon_ranch::talon_to_ranch",
        "connections": [
          {
            "targetExitId": "ranch_to_hf",
            "cost": 5
          },
          {
            "targetExitId": "ranch_to_stables",
            "cost": 2
          },
          {
            "targetExitId": "ranch_to_silo",
            "cost": 25
          },
          {
            "targetExitId": "ranch_to_grotto",
            "cost": 25
          }
        ]
      },
      {
        "id": "talon_to_ranch",
        "label": "Maison de Talon",
        "soh": "Talon's House",
        "entr": 888,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lon_lon_ranch::ranch_to_talon"
      },
      {
        "id": "ranch_to_stables",
        "label": "Entrée des écuries",
        "soh": "LLR Stables Entry",
        "entr": 761,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lon_lon_ranch::stables_to_ranch",
        "connections": [
          {
            "targetExitId": "ranch_to_hf",
            "cost": 7
          },
          {
            "targetExitId": "ranch_to_talon",
            "cost": 2
          },
          {
            "targetExitId": "ranch_to_silo",
            "cost": 23
          },
          {
            "targetExitId": "ranch_to_grotto",
            "cost": 23
          }
        ]
      },
      {
        "id": "stables_to_ranch",
        "label": "Écuries",
        "soh": "LLR Stables",
        "entr": 1071,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lon_lon_ranch::ranch_to_stables"
      },
      {
        "id": "ranch_to_silo",
        "label": "Entrée du silo",
        "soh": "LLR Tower Entry",
        "entr": 1488,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lon_lon_ranch::silo_to_ranch",
        "connections": [
          {
            "targetExitId": "ranch_to_hf",
            "cost": 30
          },
          {
            "targetExitId": "ranch_to_talon",
            "cost": 25
          },
          {
            "targetExitId": "ranch_to_stables",
            "cost": 23
          },
          {
            "targetExitId": "ranch_to_grotto",
            "cost": 20
          }
        ]
      },
      {
        "id": "silo_to_ranch",
        "label": "Silo",
        "soh": "LLR Tower",
        "entr": 1492,
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lon_lon_ranch::ranch_to_silo"
      },
      {
        "id": "ranch_to_grotto",
        "label": "Entrée de la grotte",
        "soh": "LLR Grotto Entry",
        "entr": 1813,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lon_lon_ranch::grotto_to_ranch",
        "connections": [
          {
            "targetExitId": "ranch_to_hf",
            "cost": 30
          },
          {
            "targetExitId": "ranch_to_talon",
            "cost": 25
          },
          {
            "targetExitId": "ranch_to_stables",
            "cost": 23
          },
          {
            "targetExitId": "ranch_to_silo",
            "cost": 20
          }
        ]
      },
      {
        "id": "grotto_to_ranch",
        "label": "Grotte des pestes Mojo",
        "soh": "LLR Deku Scrub Grotto",
        "entr": 2069,
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lon_lon_ranch::ranch_to_grotto"
      }
    ]
  },
  {
    "id": "deku_tree",
    "name": "Arbre Mojo",
    "exits": [
      {
        "id": "dekutree_to_kf",
        "label": "Entrée de l'Arbre Mojo",
        "soh": "Deku Tree Entrance",
        "entr": 521,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_dekutree",
        "connections": [
          {
            "targetExitId": "dekutree_boss",
            "cost": 30
          }
        ]
      },
      {
        "id": "dekutree_boss",
        "label": "Porte du boss",
        "soh": "Deku Tree Boss Door",
        "entr": 1039,
        "type": "boss",
        "shuffleTag": "boss_warp_child",
        "vanillaTargetExitId": "deku_tree::gohma"
      },
      {
        "id": "gohma",
        "label": "Reine Gohma",
        "soh": "Gohma",
        "entr": 594,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_dekutree",
        "specialTag": "boss_child"
      }
    ]
  },
  {
    "id": "dodongos_cavern",
    "name": "Caverne Dodongo",
    "exits": [
      {
        "id": "dc_to_dmt",
        "label": "Entrée de la Caverne Dodongo",
        "soh": "Dodongo's Cavern Entrance",
        "entr": 578,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_dc",
        "connections": [
          {
            "targetExitId": "dc_boss",
            "cost": 50
          }
        ]
      },
      {
        "id": "dc_boss",
        "label": "Porte du boss",
        "soh": "Dodongo's Cavern Boss Door",
        "entr": 1035,
        "type": "boss",
        "shuffleTag": "boss_warp_child",
        "vanillaTargetExitId": "dodongos_cavern::kd"
      },
      {
        "id": "kd",
        "label": "Roi Dodongo",
        "soh": "King Dodongo",
        "entr": 197,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_dc",
        "specialTag": "boss_child"
      }
    ]
  },
  {
    "id": "jabu_jabus_belly",
    "name": "Ventre de Jabu-Jabu",
    "exits": [
      {
        "id": "jbjb_to_fountain",
        "label": "Entrée du Ventre de Jabu-Jabu",
        "soh": "Jabu Jabu's Belly Entrance",
        "entr": 545,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "zoras_fountain::fountain_to_jbjb",
        "connections": [
          {
            "targetExitId": "jbjb_boss",
            "cost": 70
          }
        ]
      },
      {
        "id": "jbjb_boss",
        "label": "Porte du boss",
        "soh": "Jabu Jabu's Belly Boss Door",
        "entr": 769,
        "type": "boss",
        "shuffleTag": "boss_warp_child",
        "vanillaTargetExitId": "jabu_jabus_belly::barinade"
      },
      {
        "id": "barinade",
        "label": "Barinade",
        "soh": "Barinade",
        "entr": 1031,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "zoras_fountain::fountain_to_jbjb",
        "specialTag": "boss_child"
      }
    ]
  },
  {
    "id": "forest_temple",
    "name": "Temple de la Forêt",
    "exits": [
      {
        "id": "foresttemple_to_meadow",
        "label": "Entrée du Temple de la Forêt",
        "soh": "Forest Temple Entrance",
        "entr": 533,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "sacred_forest_meadow::meadow_to_foresttemple",
        "connections": [
          {
            "targetExitId": "foresttemple_boss",
            "cost": 50
          }
        ]
      },
      {
        "id": "foresttemple_boss",
        "label": "Porte du boss",
        "soh": "Forest Temple Boss Door",
        "entr": 12,
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "forest_temple::pg"
      },
      {
        "id": "pg",
        "label": "Ganon Spectral",
        "soh": "Phantom Ganon",
        "entr": 590,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "sacred_forest_meadow::minuet_pad",
        "specialTag": "boss_adult"
      }
    ]
  },
  {
    "id": "fire_temple",
    "name": "Temple du Feu",
    "exits": [
      {
        "id": "firetemple_to_dmc",
        "label": "Entrée du Temple du Feu",
        "soh": "Fire Temple Entrance",
        "entr": 586,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_firetemple",
        "connections": [
          {
            "targetExitId": "firetemple_boss",
            "cost": 50
          }
        ]
      },
      {
        "id": "firetemple_boss",
        "label": "Porte du boss",
        "soh": "Fire Temple Boss Door",
        "entr": 773,
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "fire_temple::volvagia"
      },
      {
        "id": "volvagia",
        "label": "Volvagia",
        "soh": "Volvagia",
        "entr": 373,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "death_mountain_crater::bolero_pad",
        "specialTag": "boss_adult"
      }
    ]
  },
  {
    "id": "water_temple",
    "name": "Temple de l'Eau",
    "exits": [
      {
        "id": "watertemple_to_lake",
        "label": "Entrée du Temple de l'Eau",
        "soh": "Water Temple Entrance",
        "entr": 541,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "lake_hylia::lake_to_watertemple",
        "connections": [
          {
            "targetExitId": "watertemple_boss",
            "cost": 50
          }
        ]
      },
      {
        "id": "watertemple_boss",
        "label": "Porte du boss",
        "soh": "Water Temple Boss Door",
        "entr": 1047,
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "water_temple::morpha"
      },
      {
        "id": "morpha",
        "label": "Morpha",
        "soh": "Morpha",
        "entr": 1059,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "lake_hylia::serenade_pad",
        "specialTag": "boss_adult"
      }
    ]
  },
  {
    "id": "spirit_temple",
    "name": "Temple de l'Esprit",
    "exits": [
      {
        "id": "spiritemple_to_colossus",
        "label": "Entrée du Temple de l'Esprit",
        "soh": "Spirit Temple Entrance",
        "entr": 481,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "desert_colossus::colossus_to_spirittemple",
        "connections": [
          {
            "targetExitId": "spirittemple_boss",
            "cost": 120
          },
          {
            "targetExitId": "desert_colossus::colossus_to_spirittemple",
            "cost": 120
          }
        ]
      },
      {
        "id": "spirittemple_boss",
        "label": "Porte du boss",
        "soh": "Spirit Temple Boss Door",
        "entr": 141,
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "spirit_temple::twinrova"
      },
      {
        "id": "twinrova",
        "label": "Twinrova",
        "soh": "Twinrova",
        "entr": 757,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "desert_colossus::requiem_pad",
        "specialTag": "boss_adult"
      }
    ]
  },
  {
    "id": "shadow_temple",
    "name": "Temple de l'Ombre",
    "exits": [
      {
        "id": "shadowtemple_to_graveyard",
        "label": "Entrée du Temple de l'Ombre",
        "soh": "Shadow Temple Entrance",
        "entr": 517,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "graveyard::graveyard_to_shadowtemple",
        "connections": [
          {
            "targetExitId": "shadowtemple_boss",
            "cost": 90
          }
        ]
      },
      {
        "id": "shadowtemple_boss",
        "label": "Porte du boss",
        "soh": "Shadow Temple Boss Door",
        "entr": 1043,
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "shadow_temple::bb"
      },
      {
        "id": "bb",
        "label": "Bongo Bongo",
        "soh": "Bongo-Bongo",
        "entr": 690,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "graveyard::nocturne_pad",
        "specialTag": "boss_adult"
      }
    ]
  },
  {
    "id": "bottom_of_the_well",
    "name": "Fond du Puits",
    "exits": [
      {
        "id": "well_to_kak",
        "label": "Entrée du Fond du Puits",
        "soh": "Bottom of the Well Entrance",
        "entr": 678,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "kakariko_village::kak_to_well"
      }
    ]
  },
  {
    "id": "ice_cavern",
    "name": "Caverne de Glace",
    "exits": [
      {
        "id": "ic_to_fountain",
        "label": "Entrée de la Caverne de Glace",
        "soh": "Ice Cavern Entrance",
        "entr": 980,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "zoras_fountain::fountain_to_ic"
      }
    ]
  },
  {
    "id": "gerudo_training_ground",
    "name": "Gymnase Gerudo",
    "exits": [
      {
        "id": "gtg_to_gt",
        "label": "Entrée du Gymnase Gerudo",
        "soh": "Gerudo Training Ground Entrance",
        "entr": 936,
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_gtg"
      }
    ]
  },
  {
    "id": "ganons_castle",
    "name": "Château de Ganon",
    "exits": [
      {
        "id": "ganon_to_castle",
        "label": "Entrée du Château de Ganon",
        "soh": "Inside Ganon's Castle Entrance",
        "entr": 573,
        "type": "dungeon",
        "shuffleTag": "dungeon_ganon",
        "vanillaTargetExitId": "hyrule_castle::castle_to_ganon",
        "connections": [
          {
            "targetExitId": "castle_to_tower",
            "cost": 10
          }
        ]
      },
      {
        "id": "castle_to_tower",
        "label": "Intérieur du Château de Ganon",
        "soh": "Inside Ganon's Castle",
        "entr": 1051,
        "type": "dungeon",
        "shuffleTag": "ganon_tower",
        "vanillaTargetExitId": "ganons_castle::tower_to_castle",
        "connections": [
          {
            "targetExitId": "ganon_to_castle",
            "cost": 10
          }
        ]
      },
      {
        "id": "tower_to_castle",
        "label": "Entrée de la Tour de Ganon",
        "soh": "Ganon's Tower Entrance",
        "entr": 1332,
        "type": "dungeon",
        "shuffleTag": "ganon_tower",
        "vanillaTargetExitId": "ganons_castle::castle_to_tower"
      }
    ]
  }
];
