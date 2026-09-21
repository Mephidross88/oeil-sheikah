// Données des zones et sorties. Format décrit dans CLAUDE.md.
window.AREAS_DATA = [
  {
    "id": "spawns",
    "name": "Spawns et Chants",
    "exits": [
      {
        "id": "spawn_child",
        "label": "Spawn Enfant",
        "type": "warp",
        "shuffleTag": "spawn",
        "vanillaTargetExitId": "kokiri_forest::links_to_kf"
      },
      {
        "id": "spawn_adult",
        "label": "Spawn Adulte",
        "type": "warp",
        "shuffleTag": "spawn",
        "vanillaTargetExitId": "market::templeoftime_to_templeplaza"
      },
      {
        "id": "warp_pol",
        "label": "Prélude de la Lumière",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "market::prelude_pad"
      },
      {
        "id": "warp_mof",
        "label": "Menuet des Bois",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "meadow::minuet_pad"
      },
      {
        "id": "warp_bof",
        "label": "Boléro du Feu",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "death_mountain_crater::bolero_pad"
      },
      {
        "id": "warp_sow",
        "label": "Sérénade de l'Eau",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "lake_hylia::serenade_pad"
      },
      {
        "id": "warp_nos",
        "label": "Nocturne de l'Ombre",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "graveyard::nocturne_pad"
      },
      {
        "id": "warp_ros",
        "label": "Requiem des Esprits",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "colossus::requiem_pad"
      }
    ]
  },
  {
    "id": "hf_field",
    "name": "Plaine d'Hyrule",
    "exits": [
      {
        "id": "hf_to_lw",
        "label": "Pont des Bois Perdus",
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
            "cost": 30,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 34,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 42,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 47,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 48,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 42,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 38
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 26,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "hf_to_river",
        "label": "Rivière Zora",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zora_river::river_to_hf",
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
            "cost": 16,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 25,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 35,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 40,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 55,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 50,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 47
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 37,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "hf_to_kak",
        "label": "Village Cocorico",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kakariko::kak_to_hf",
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
            "cost": 7,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 19,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 31,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 35,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 55,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 61,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 53
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 45,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "hf_to_market",
        "label": "Place du Marché",
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
            "cost": 12,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 8,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 18,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 24,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 44,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 51,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 44
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 36,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "hf_to_ranch",
        "label": "Ranch Lon Lon",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "lonlon_ranch::ranch_to_hf",
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
            "cost": 23,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 19,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 14,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 22,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 34,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 40,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 22,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "hf_to_gv",
        "label": "Vallée Gerudo",
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
            "cost": 55,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 51,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 37,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 43,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 11,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 32,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 32
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 39,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "hf_to_lake",
        "label": "Lac Hylia",
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
            "cost": 64,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 61,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 48,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 54,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 37,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 10,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 13
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 26,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "hf_to_kakarikogrotto",
        "label": "Grotte (Cocorico)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::kakarikogrotto_to_hf",
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
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 25,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 29,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 49,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 55,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 47
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 39,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "kakarikogrotto_to_hf",
        "label": "Sortie de la grotte (Cocorico)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_kakarikogrotto"
      },
      {
        "id": "hf_to_marketgrotto",
        "label": "Grotte (Place du Marché)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::marketgrotto_to_hf",
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
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 20,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 26,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 46,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 53,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 46
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 38,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "marketgrotto_to_hf",
        "label": "Sortie de la grotte (Place du Marché)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_marketgrotto"
      },
      {
        "id": "hf_to_divinggrotto",
        "label": "Grotte (Plongée)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::divingrotto_to_hf",
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
            "cost": 25,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 20,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 34,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 41,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 40
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 40,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "divingrotto_to_hf",
        "label": "Sortie de la grotte (Plongée)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_divinggrotto"
      },
      {
        "id": "hf_to_fairygrotto",
        "label": "Grotte (Fontaine des Fées)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::fairygrotto_to_hf",
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
            "cost": 29,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 26,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 39,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 46,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 45
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 45,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "fairygrotto_to_hf",
        "label": "Sortie de la grotte (Fontaine des Fées)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_fairygrotto"
      },
      {
        "id": "hf_to_cowgrotto",
        "label": "Grotte (Vache)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::cowgrotto_to_hf",
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
            "cost": 49,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 46,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 34,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 39,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 29,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 29
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 36,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "cowgrotto_to_hf",
        "label": "Sortie de la grotte (Vache)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_cowgrotto"
      },
      {
        "id": "hf_to_fencegrotto",
        "label": "Grotte (Barrières)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::fencegrotto_to_hf",
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
            "cost": 55,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 53,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 41,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 46,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 29,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 3
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 16,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "fencegrotto_to_hf",
        "label": "Sortie de la grotte (Barrières)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_fencegrotto"
      },
      {
        "id": "hf_to_opengrotto",
        "label": "Grotte (Ouverte)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::opengrotto_to_hf",
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
            "cost": 57,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 46,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 40,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 45,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 29,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 3,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_forestgrotto",
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "opengrotto_to_hf",
        "label": "Sortie de la grotte (Ouverte)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_opengrotto"
      },
      {
        "id": "hf_to_forestgrotto",
        "label": "Grotte (Forêt)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::forestgrotto_to_hf",
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
            "cost": 39,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_marketgrotto",
            "cost": 38,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_divinggrotto",
            "cost": 40,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fairygrotto",
            "cost": 45,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_cowgrotto",
            "cost": 36,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_fencegrotto",
            "cost": 16,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "hf_to_opengrotto",
            "cost": 13
          }
        ]
      },
      {
        "id": "forestgrotto_to_hf",
        "label": "Sortie de la grotte (Forêt)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "hf_field::hf_to_forestgrotto"
      }
    ]
  },
  {
    "id": "market",
    "name": "Bourg d'Hyrule",
    "exits": [
      {
        "id": "market_to_hf",
        "label": "Plaine d'Hyrule",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hf_field::hf_to_market",
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
        "label": "Place du Marché",
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
        "label": "Sortie de la Place du Marché",
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
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 6,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 12,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "market_to_templeplaza",
        "label": "Parvis du Temple du Temps",
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
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 1,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 1,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 13,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 7,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "templeplaza_to_market",
        "label": "Sortie du Parvis du Temple du Temps",
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
        "label": "Vers les châteaux",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::castle_to_market",
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
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 1,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 12,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 6,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "castle_to_market",
        "label": "Sortie des châteaux",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "market::market_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_adultgreatfairy",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "GoldGauntlets"
              ]
            ]
          },
          {
            "targetExitId": "castle_to_childgreatfairy",
            "cost": 15,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "castle_to_grotto",
            "cost": 35,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "castle_to_ganon",
            "cost": 10,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "market_to_guardtower",
        "label": "Tour de Garde",
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
        "label": "Sortie de la Tour de Garde",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_guardtower"
      },
      {
        "id": "market_to_chestgame",
        "label": "Chasse au Trésor",
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
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 10,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "chestgame_to_market",
        "label": "Sortie de la Chasse au Trésor",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_chestgame"
      },
      {
        "id": "market_to_bowling",
        "label": "Bowling Teigneux",
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
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 10,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "bowling_to_market",
        "label": "Sortie du Bowling Teigneux",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_bowling"
      },
      {
        "id": "market_to_bazaar",
        "label": "Bazar",
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
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 1,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "bazaar_to_market",
        "label": "Sortie du Bazar",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_bazaar"
      },
      {
        "id": "market_to_potions",
        "label": "Apothicaire",
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
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 1,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 5,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "potions_to_market",
        "label": "Sortie de l'Apothicaire",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_potions"
      },
      {
        "id": "market_to_shooting",
        "label": "Jeu d'adresse",
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
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 6,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 12,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "shooting_to_market",
        "label": "Sortie du Jeu d'adresse",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_shooting"
      },
      {
        "id": "market_to_masks",
        "label": "Foire aux Masques",
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
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 2,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 12,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 7,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "masks_to_market",
        "label": "Sortie de la Foire aux Masques",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_masks"
      },
      {
        "id": "market_to_bombchushop",
        "label": "Magasin de missiles",
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
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 5,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 6,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 12,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_backhouse",
            "cost": 6,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "bombchushop_to_market",
        "label": "Sortie du magasin de missiles",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_bombchushop"
      },
      {
        "id": "market_to_backhouse",
        "label": "Maison de la ruelle",
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
            "cost": 10,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bowling",
            "cost": 10,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bazaar",
            "cost": 4,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_potions",
            "cost": 3,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_shooting",
            "cost": 12,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_masks",
            "cost": 7,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "market_to_bombchushop",
            "cost": 6,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "backhouse_to_market",
        "label": "Sortie de la maison de la ruelle",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::market_to_backhouse"
      },
      {
        "id": "castle_to_adultgreatfairy",
        "label": "Fontaine de la Grande Fée (Adulte)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::adultgreatfairy_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 15
          },
          {
            "targetExitId": "castle_to_ganon",
            "cost": 10,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "adultgreatfairy_to_castle",
        "label": "Sortie de la Fontaine de la Grande Fée (Adulte)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::castle_to_adultgreatfairy"
      },
      {
        "id": "castle_to_childgreatfairy",
        "label": "Fontaine de la Grande Fée (Enfant)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::childgreatfairy_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 15
          },
          {
            "targetExitId": "castle_to_grotto",
            "cost": 25,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "childgreatfairy_to_castle",
        "label": "Sortie de la Fontaine de la Grande Fée (Enfant)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::castle_to_childgreatfairy"
      },
      {
        "id": "castle_to_grotto",
        "label": "Grotte (Chant des Tempêtes)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::grotto_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 35
          },
          {
            "targetExitId": "castle_to_childgreatfairy",
            "cost": 25,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "grotto_to_castle",
        "label": "Sortie de la grotte (Chant des Tempêtes)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "market::castle_to_grotto"
      },
      {
        "id": "templeplaza_to_templeoftime",
        "label": "Temple du Temps",
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
        "label": "Sortie du Temple du Temps",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "market::templeplaza_to_templeoftime"
      },
      {
        "id": "castle_to_ganon",
        "label": "Château de Ganon",
        "type": "dungeon",
        "shuffleTag": "dungeon_ganon",
        "vanillaTargetExitId": "market::ganon_to_castle",
        "connections": [
          {
            "targetExitId": "castle_to_market",
            "cost": 10
          }
        ]
      },
      {
        "id": "ganon_to_castle",
        "label": "Sortie du Château de Ganon",
        "type": "dungeon",
        "shuffleTag": "dungeon_ganon",
        "vanillaTargetExitId": "market::castle_to_ganon",
        "connections": [
          {
            "targetExitId": "castle_to_tower",
            "cost": 10,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "castle_to_tower",
        "label": "Tour de Ganon",
        "type": "dungeon",
        "shuffleTag": "ganon_tower",
        "vanillaTargetExitId": "market::tower_to_castle",
        "connections": [
          {
            "targetExitId": "ganon_to_castle",
            "cost": 10,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "tower_to_castle",
        "label": "Sortie de la Tour de Ganon",
        "type": "dungeon",
        "shuffleTag": "ganon_tower",
        "vanillaTargetExitId": "market::castle_to_tower"
      },
      {
        "id": "prelude_pad",
        "label": "Plateforme de téléportation",
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
    "id": "kakariko",
    "name": "Village Cocorico",
    "exits": [
      {
        "id": "kak_to_hf",
        "label": "Plaine d'Hyrule",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hf_field::hf_to_kak",
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
            "cost": 13,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 16,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 21,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 23,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Chemin du Péril",
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
            "cost": 3,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 16,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 9,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 11,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 17
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Cimetière Cocorico",
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
            "cost": 12,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 6,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 8,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 9,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 4
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Maison du Contremaître",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::carpenter_to_kak",
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
            "cost": 8,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 10,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 16,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 18,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 11
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 1,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie de la maison du Contremaître",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::kak_to_carpenter"
      },
      {
        "id": "kak_to_bazaar",
        "label": "Bazar",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::bazaar_to_kak",
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
            "cost": 14,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 6,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 8,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie du Bazar",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::kak_to_bazaar"
      },
      {
        "id": "kak_to_shooting",
        "label": "Jeu d'adresse",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::shooting_to_kak",
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
            "cost": 9,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 17,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 19,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 3,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie du Jeu d'adresse",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::kak_to_shooting"
      },
      {
        "id": "kak_to_odd",
        "label": "Boutique de Granny",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::odd_to_kak",
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
            "cost": 12,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 3,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 4,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 3
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie de la boutique de Granny",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::kak_to_odd"
      },
      {
        "id": "kak_to_impas",
        "label": "Maison d'Impa",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::impas_to_kak",
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
            "cost": 11,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 9,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 19,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 21,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 10
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie de la maison d'Impa",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::kak_to_impas"
      },
      {
        "id": "kak_to_impas_back",
        "label": "Arrière de la maison d'Impa",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::impas_to_kak_back",
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
            "cost": 12,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 6,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 20,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 22,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 7
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie arrière de la maison d'Impa",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::kak_to_impas_back"
      },
      {
        "id": "kak_to_skulltulas",
        "label": "Maison des Skulltulas",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::skulltulas_to_kak",
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
            "cost": 9,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 7,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 17,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 19,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 2,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie de la maison des Skulltulas",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kakariko::kak_to_skulltulas"
      },
      {
        "id": "kak_to_potions",
        "label": "Apothicaire",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko::potions_to_kak",
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
            "cost": 1,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 14,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 6,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 8,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 14
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie de l'Apothicaire",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko::kak_to_potions",
        "connections": [
          {
            "targetExitId": "kak_to_potions_back",
            "cost": 1,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "kak_to_potions_back",
        "label": "Arrière de l'Apothicaire",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko::potions_to_kak_back",
        "connections": [
          {
            "targetExitId": "potions_to_kak",
            "cost": 1
          }
        ]
      },
      {
        "id": "potions_to_kak_back",
        "label": "Sortie arrière de l'Apothicaire",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko::kak_to_potions_back",
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
            "cost": 14,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 3,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 2,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "cost": 8,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "id": "kak_to_windmill",
        "label": "Moulin",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko::windmill_to_kak",
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
            "cost": 13,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 3,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 21,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 23,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
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
        "label": "Sortie du Moulin",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kakariko::kak_to_windmill"
      },
      {
        "id": "kak_to_redeadgrotto",
        "label": "Grotte (Éffrois)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko::redeadgrotto_to_kak",
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
            "cost": 7,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 9,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 15,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 17,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
        "label": "Sortie de la grotte (Éffrois)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko::kak_to_redeadgrotto"
      },
      {
        "id": "kak_to_opengrotto",
        "label": "Grotte (Ouverte)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko::opengrotto_to_kak",
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
            "cost": 13,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 4,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 1,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 3,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 12
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 7,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_well",
            "cost": 3
          }
        ]
      },
      {
        "id": "opengrotto_to_kak",
        "label": "Sortie de la grotte (Ouverte)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kakariko::kak_to_opengrotto"
      },
      {
        "id": "kak_to_well",
        "label": "Fond du Puit",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "kakariko::well_to_kak",
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
            "cost": 11,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_shooting",
            "cost": 2,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_odd",
            "cost": 19,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "targetExitId": "potions_to_kak_back",
            "cost": 21,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_windmill",
            "cost": 8
          },
          {
            "targetExitId": "kak_to_redeadgrotto",
            "cost": 4,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "kak_to_opengrotto",
            "cost": 18
          }
        ]
      },
      {
        "id": "well_to_kak",
        "label": "Sortie du Fond du Puit",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "kakariko::kak_to_well"
      }
    ]
  },
  {
    "id": "graveyard",
    "name": "Cimetière Cocorico",
    "exits": [
      {
        "id": "graveyard_to_kak",
        "label": "Village Cocorico",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kakariko::kak_to_graveyard",
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
            "cost": 5,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
        "label": "Cabane de Dampe",
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
            "cost": 7,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
        "label": "Sortie de la cabane de Dampe",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "graveyard::graveyard_to_dampes"
      },
      {
        "id": "graveyard_to_shieldgrave",
        "label": "Tombe (Bouclier Hylien)",
        "type": "interior",
        "shuffleTag": "interior_simple",
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
            "cost": 5,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
        "label": "Sortie de la tombe (Bouclier Hjylien)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "graveyard::graveyard_to_shieldgrave"
      },
      {
        "id": "graveyard_to_dampesgrave",
        "label": "Tombe de Dampe",
        "type": "interior",
        "shuffleTag": "interior_simple",
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
        "label": "Sortie de la tombe de Dampe",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "graveyard::graveyard_to_dampesgrave"
      },
      {
        "id": "graveyard_to_redeadgrave",
        "label": "Tombe (Éffroi)",
        "type": "interior",
        "shuffleTag": "interior_simple",
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
            "cost": 4,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "graveyard_to_royaltomb",
            "cost": 5
          }
        ]
      },
      {
        "id": "redeadgrave_to_graveyard",
        "label": "Sortie de la tombe (Éffroi)",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "graveyard::graveyard_to_redeadgrave"
      },
      {
        "id": "graveyard_to_royaltomb",
        "label": "Tombe Royale",
        "type": "interior",
        "shuffleTag": "interior_simple",
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
            "cost": 4,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "graveyard_to_redeadgrave",
            "cost": 9
          }
        ]
      },
      {
        "id": "royaltomb_to_graveyard",
        "label": "Sortie de la Tombe Royale",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "graveyard::graveyard_to_royaltomb"
      },
      {
        "id": "graveyard_to_shadowtemple",
        "label": "Temple de l'Ombre",
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
            "cost": 17,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
            "cost": 8,
            "requirements": [
              [
                "Adult"
              ]
            ]
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
    "id": "lonlon_ranch",
    "name": "Ranch Lon Lon",
    "exits": [
      {
        "id": "ranch_to_hf",
        "label": "Plaine d'Hyrule",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hf_field::hf_to_ranch",
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
            "cost": 30,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "ranch_to_talon",
        "label": "Maison de Talon",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lonlon_ranch::talon_to_ranch",
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
            "cost": 25,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "talon_to_ranch",
        "label": "Sortie de la maison de Talon",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lonlon_ranch::ranch_to_talon"
      },
      {
        "id": "ranch_to_stables",
        "label": "Écuries",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lonlon_ranch::stables_to_ranch",
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
            "cost": 23,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "stables_to_ranch",
        "label": "Sortie des écuries",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lonlon_ranch::ranch_to_stables"
      },
      {
        "id": "ranch_to_silo",
        "label": "Silo",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lonlon_ranch::silo_to_ranch",
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
            "cost": 20,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "silo_to_ranch",
        "label": "Sortie du silo",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lonlon_ranch::ranch_to_silo"
      },
      {
        "id": "ranch_to_grotto",
        "label": "Grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lonlon_ranch::grotto_to_ranch",
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
        "label": "Sortie de la grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lonlon_ranch::ranch_to_grotto"
      }
    ]
  },
  {
    "id": "kokiri_forest",
    "name": "Forêt Kokiri",
    "exits": [
      {
        "id": "kf_to_lw",
        "label": "Entrée des Bois Perdus",
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
            "cost": 1,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 20
          }
        ]
      },
      {
        "id": "kf_to_lwbridge",
        "label": "Pont des Bois Perdus",
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
            "cost": 9,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 19
          }
        ]
      },
      {
        "id": "kf_to_twins",
        "label": "Maison des Jumelles",
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
            "cost": 12,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 13
          }
        ]
      },
      {
        "id": "twins_to_kf",
        "label": "Sortie de la maison des Jumelles",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_twins"
      },
      {
        "id": "kf_to_midos",
        "label": "Maison de Mido",
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
            "cost": 10,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 15
          }
        ]
      },
      {
        "id": "midos_to_kf",
        "label": "Sortie de la maison de Mido",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_midos"
      },
      {
        "id": "kf_to_sarias",
        "label": "Maison de Saria",
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
            "cost": 11,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 14
          }
        ]
      },
      {
        "id": "sarias_to_kf",
        "label": "Sortie de la maison de Saria",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_sarias"
      },
      {
        "id": "kf_to_shop",
        "label": "Boutique Kokiri",
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
            "cost": 11,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 12
          }
        ]
      },
      {
        "id": "shop_to_kf",
        "label": "Sortie de la boutique Kokiri",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_shop"
      },
      {
        "id": "kf_to_kias",
        "label": "Maison des frères Je-Sais-Tout",
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
            "cost": 9,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 19
          }
        ]
      },
      {
        "id": "kias_to_kf",
        "label": "Sortie de la maison des frères Je-Sais-Tout",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_kias"
      },
      {
        "id": "kf_to_links",
        "label": "Maison de Link",
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
            "cost": 12,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "kf_to_dekutree",
            "cost": 17
          }
        ]
      },
      {
        "id": "links_to_kf",
        "label": "Sortie de la maison de Link",
        "type": "interior",
        "shuffleTag": "interior_all",
        "vanillaTargetExitId": "kokiri_forest::kf_to_links"
      },
      {
        "id": "kf_to_stormsgrotto",
        "label": "Grotte",
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
        "label": "Sortie de la grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "kokiri_forest::kf_to_stormsgrotto"
      },
      {
        "id": "kf_to_dekutree",
        "label": "Arbre Mojo",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "dekutree::dekutree_to_kf",
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
            "cost": 23,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
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
        "label": "Pont vers la Forêt Kokiri",
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
        "label": "Pont vers la Plaine d'Hyrule",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hf_field::hf_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 2
          }
        ]
      },
      {
        "id": "lw_to_kf",
        "label": "Forêt Kokiri",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kokiri_forest::kf_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 11,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 11,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 7,
            "requirements": [
              [
                "LostWoodToGoronVillageUnlocked"
              ],
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ]
            ]
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
            "cost": 7,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 16
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 18,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "lw_to_gc",
        "label": "Village Goron",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "goron_city::gc_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 17,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 17,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
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
            "cost": 1,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "lw_to_river",
        "label": "Rivière Zora",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zora_river::river_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 20,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 20,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 9
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 6,
            "requirements": [
              [
                "LostWoodToGoronVillageUnlocked"
              ],
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_meadow",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 9
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 11,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "lw_to_meadow",
        "label": "Bosquet Sacré",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "meadow::meadow_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 27,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 27,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 18
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 13,
            "requirements": [
              [
                "LostWoodToGoronVillageUnlocked"
              ],
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_river",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_gorongrotto",
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 11
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 1,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "lw_to_gorongrotto",
        "label": "Grotte (Village Goron)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::gorongrotto_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 17,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 17,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 7
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 1,
            "requirements": [
              [
                "LostWoodToGoronVillageUnlocked"
              ],
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ]
            ]
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
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "gorongrotto_to_lw",
        "label": "Sortie de la grotte (Village Goron)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::lw_to_gorongrotto"
      },
      {
        "id": "lw_to_theatre",
        "label": "Théâtre Sylvestre",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::theatre_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 26,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 26,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 16
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 11,
            "requirements": [
              [
                "LostWoodToGoronVillageUnlocked"
              ],
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ]
            ]
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
            "cost": 11,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_meadowgrotto",
            "cost": 11,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "theatre_to_lw",
        "label": "Sortie du Théâtre Sylvestre",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::lw_to_theatre"
      },
      {
        "id": "lw_to_meadowgrotto",
        "label": "Grotte (Bosquet Sacré)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::meadowgrotto_to_lw",
        "connections": [
          {
            "targetExitId": "lwbridge_to_kf",
            "cost": 27,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lwbridge_to_hf",
            "cost": 27,
            "requirements": [
              [
                "CanUseBeans"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_kf",
            "cost": 18
          },
          {
            "targetExitId": "lw_to_gc",
            "cost": 13,
            "requirements": [
              [
                "LostWoodToGoronVillageUnlocked"
              ],
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ]
            ]
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
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "lw_to_theatre",
            "cost": 11
          }
        ]
      },
      {
        "id": "meadowgrotto_to_lw",
        "label": "Sortie de la grotte (Bosquet Sacré)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lost_woods::lw_to_meadowgrotto"
      }
    ]
  },
  {
    "id": "meadow",
    "name": "Bosquet Sacré",
    "exits": [
      {
        "id": "meadow_to_lw",
        "label": "Bois Perdus",
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
            "cost": 25,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 27,
            "requirements": [
              [
                "Hookshot",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "meadow_to_wolfosgrotto",
        "label": "Grotte (Lobos)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "meadow::wolfosgrotto_to_meadow",
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
            "cost": 24,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 26,
            "requirements": [
              [
                "Hookshot",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "wolfosgrotto_to_meadow",
        "label": "Sortie de la grotte (Lobos)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "meadow::meadow_to_wolfosgrotto"
      },
      {
        "id": "meadow_to_fairygrotto",
        "label": "Grotte (Fontaine des Fées)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "meadow::fairygrotto_to_meadow",
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
            "cost": 9,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "meadow_to_foresttemple",
            "cost": 11,
            "requirements": [
              [
                "Hookshot",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "fairygrotto_to_meadow",
        "label": "Sortie de la grotte (Fontaine des Fées)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "meadow::meadow_to_fairygrotto"
      },
      {
        "id": "meadow_to_stormsgrotto",
        "label": "Grotte (Chant des Tempêtes)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "meadow::stormsgrotto_to_meadow",
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
            "cost": 3,
            "requirements": [
              [
                "Hookshot",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "stormsgrotto_to_meadow",
        "label": "Sortie de la grotte (Chant des Tempêtes)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "meadow::meadow_to_stormsgrotto"
      },
      {
        "id": "meadow_to_foresttemple",
        "label": "Temple de la Forêt",
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
            "cost": 3,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          }
        ]
      },
      {
        "id": "minuet_pad",
        "label": "Plateforme de téléportation",
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
            "cost": 2,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
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
    "id": "goron_city",
    "name": "Village Goron",
    "exits": [
      {
        "id": "gc_to_dmt",
        "label": "Chemin du Péril",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_gc",
        "connections": [
          {
            "targetExitId": "gc_to_lw",
            "cost": 11,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Bow"
              ],
              [
                "GoronBracelet"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_dmc",
            "cost": 14,
            "requirements": [
              [
                "Bow",
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 8,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Sticks",
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 16,
            "requirements": [
              [
                "GoronTunic",
                "Hookshot"
              ],
              [
                "SongOfTime",
                "Adult"
              ],
              [
                "NayrusLove",
                "Hookshot"
              ]
            ]
          }
        ]
      },
      {
        "id": "gc_to_lw",
        "label": "Bois Perdus",
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
            "cost": 12,
            "requirements": [
              [
                "Bow",
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Sticks",
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 13,
            "requirements": [
              [
                "GoronTunic",
                "Hookshot"
              ],
              [
                "SongOfTime",
                "Adult"
              ],
              [
                "NayrusLove",
                "Hookshot"
              ]
            ]
          }
        ]
      },
      {
        "id": "gc_to_dmc",
        "label": "Cratère du Péril",
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
            "cost": 14,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Bow"
              ],
              [
                "GoronBracelet"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 8,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Sticks",
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 20,
            "requirements": [
              [
                "GoronTunic",
                "Hookshot"
              ],
              [
                "SongOfTime",
                "Adult"
              ],
              [
                "NayrusLove",
                "Hookshot"
              ]
            ]
          }
        ]
      },
      {
        "id": "gc_to_shop",
        "label": "Boutique Goron",
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
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Bow"
              ],
              [
                "GoronBracelet"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_dmc",
            "cost": 8,
            "requirements": [
              [
                "Bow",
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_grotto",
            "cost": 12,
            "requirements": [
              [
                "GoronTunic",
                "Hookshot"
              ],
              [
                "SongOfTime",
                "Adult"
              ],
              [
                "NayrusLove",
                "Hookshot"
              ]
            ]
          }
        ]
      },
      {
        "id": "shop_to_gc",
        "label": "Sortie de la boutique Goron",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "goron_city::gc_to_shop"
      },
      {
        "id": "gc_to_grotto",
        "label": "Grotte",
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
            "cost": 15,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Bow"
              ],
              [
                "GoronBracelet"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_dmc",
            "cost": 12,
            "requirements": [
              [
                "Bow",
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "gc_to_shop",
            "cost": 6,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "DinsFire"
              ],
              [
                "Sticks",
                "ZeldaLullaby"
              ]
            ]
          }
        ]
      },
      {
        "id": "grotto_to_gc",
        "label": "Sortie de la grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "goron_city::gc_to_grotto"
      }
    ]
  },
  {
    "id": "death_mountain_trail",
    "name": "Chemin du Péril",
    "exits": [
      {
        "id": "dmt_to_kak",
        "label": "Village Cocorico",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "kakariko::kak_to_dmt",
        "connections": [
          {
            "targetExitId": "dmt_to_gc",
            "cost": 25
          },
          {
            "targetExitId": "dmt_to_dmc",
            "cost": 39,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 38,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 23,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 22,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 11,
            "requirements": [
              [
                "Adult"
              ],
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 37,
            "requirements": [
              [
                "Explosive",
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "dmt_to_gc",
        "label": "Village Goron",
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
            "cost": 27,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 26,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 2,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 10,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 16,
            "requirements": [
              [
                "Adult"
              ],
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 25,
            "requirements": [
              [
                "Explosive",
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "dmt_to_dmc",
        "label": "Cratère du Péril",
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
            "cost": 29,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 13,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 25,
            "requirements": [
              [
                "Adult"
              ],
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 28,
            "requirements": [
              [
                "Explosive",
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "dmt_to_greatfairy",
        "label": "Fontaine de la Grande Fée",
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
            "cost": 12,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 12,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 24,
            "requirements": [
              [
                "Adult"
              ],
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 27,
            "requirements": [
              [
                "Explosive",
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "greatfairy_to_dmt",
        "label": "Sortie de la Fontaine de la Grande Fée",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_greatfairy"
      },
      {
        "id": "dmt_to_stormgrotto",
        "label": "Grotte (Chant des Tempêtes)",
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
            "cost": 25,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 24,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 8,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 14,
            "requirements": [
              [
                "Adult"
              ],
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 23,
            "requirements": [
              [
                "Explosive",
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "stormgrotto_to_dmt",
        "label": "Sortie de la grotte (Chant des Tempêtes)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_stormgrotto"
      },
      {
        "id": "dmt_to_cowgrotto",
        "label": "Grotte (Vache)",
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
            "cost": 16,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 6,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_dc",
            "cost": 13,
            "requirements": [
              [
                "Adult"
              ],
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 15,
            "requirements": [
              [
                "Explosive",
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "cowgrotto_to_dmt",
        "label": "Sortie de la grotte (Vache)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_cowgrotto"
      },
      {
        "id": "dmt_to_dc",
        "label": "Caverne Dodongo",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "dodongo_cavern::dc_to_dmt",
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
            "cost": 30,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_greatfairy",
            "cost": 29,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_stormgrotto",
            "cost": 12,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "dmt_to_cowgrotto",
            "cost": 13,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmt_owl",
            "cost": 28,
            "requirements": [
              [
                "Explosive",
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "dmt_owl",
        "label": "Hibou",
        "type": "owl",
        "shuffleTag": "owl",
        "vanillaTargetExitId": "kakariko::impas_to_kak_back"
      }
    ]
  },
  {
    "id": "death_mountain_crater",
    "name": "Cratère du Péril",
    "exits": [
      {
        "id": "dmc_to_dmt",
        "label": "Chemin du Péril",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_gc",
            "cost": 14,
            "requirements": [
              [
                "CraterShortcutOpened"
              ],
              [
                "HoverBoots"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 9,
            "requirements": [
              [
                "CraterShortcutOpened",
                "TitanMass"
              ],
              [
                "HoverBoots",
                "TitanMass"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 4,
            "requirements": [
              [
                "Explosive"
              ],
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 13,
            "requirements": [
              [
                "CraterShortcutOpened",
                "TitanMass"
              ],
              [
                "HoverBoots",
                "TitanMass"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 22,
            "requirements": [
              [
                "CraterShortcutOpened",
                "Hookshot"
              ],
              [
                "HoverBoots"
              ]
            ]
          }
        ]
      },
      {
        "id": "dmc_to_gc",
        "label": "Village Goron",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "goron_city::gc_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 14,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 5,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 10,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 2,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 12,
            "requirements": [
              [
                "CraterShortcutOpened",
                "Hookshot"
              ],
              [
                "HoverBoots"
              ]
            ]
          }
        ]
      },
      {
        "id": "dmc_to_greatfairy",
        "label": "Fontaine de la Grande Fée",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "death_mountain_crater::greatfairy_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 11,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 4
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 7,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 6,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 16,
            "requirements": [
              [
                "HoverBoots"
              ],
              [
                "Hookshot",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "greatfairy_to_dmc",
        "label": "Sortie de la Fontaine de la Grande Fée",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_greatfairy"
      },
      {
        "id": "dmc_to_bombgrotto",
        "label": "Grotte (Bombes)",
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
            "cost": 13,
            "requirements": [
              [
                "CraterShortcutOpened"
              ],
              [
                "HoverBoots"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 8,
            "requirements": [
              [
                "CraterShortcutOpened"
              ],
              [
                "HoverBoots"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 12,
            "requirements": [
              [
                "CraterShortcutOpened",
                "TitanMass",
                "HoverBoots",
                "TitanMass"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 21,
            "requirements": [
              [
                "CraterShortcutOpened",
                "Hookshot"
              ],
              [
                "HoverBoots"
              ]
            ]
          }
        ]
      },
      {
        "id": "bombgrotto_to_dmc",
        "label": "Sortie de la grotte (Bombes)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_bombgrotto"
      },
      {
        "id": "dmc_to_hammergrotto",
        "label": "Grotte (Masse)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_crater::hammergrotto_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 15,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 2
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 6,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 11,
            "requirements": [
              [
                "TitanMass",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_firetemple",
            "cost": 11,
            "requirements": [
              [
                "CraterShortcutOpened",
                "Hookshot"
              ],
              [
                "HoverBoots"
              ]
            ]
          }
        ]
      },
      {
        "id": "hammergrotto_to_dmc",
        "label": "Sortie de la grotte (Masse)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "death_mountain_crater::dmc_to_hammergrotto"
      },
      {
        "id": "dmc_to_firetemple",
        "label": "Temple du Feu",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "fire_temple::firetemple_to_dmc",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 22,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 12,
            "requirements": [
              [
                "Hookshot",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 15,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 21,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 11,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
          }
        ]
      },
      {
        "id": "bolero_pad",
        "label": "Plateforme de téléportation",
        "type": "warp",
        "shuffleTag": "warp",
        "vanillaTargetExitId": "null",
        "destinationOnly": "true",
        "connections": [
          {
            "targetExitId": "dmc_to_dmt",
            "cost": 18,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_gc",
            "cost": 8,
            "requirements": [
              [
                "Hookshot",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_greatfairy",
            "cost": 11,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_bombgrotto",
            "cost": 17,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "dmc_to_hammergrotto",
            "cost": 7,
            "requirements": [
              [
                "TitanMass",
                "Hookshot"
              ]
            ]
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
    "id": "zora_river",
    "name": "Rivière Zora",
    "exits": [
      {
        "id": "river_to_hf",
        "label": "Plaine d'Hyrule",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hf_field::hf_to_river",
        "connections": [
          {
            "targetExitId": "river_to_lw",
            "cost": 38,
            "requirements": [
              [
                "Explosive",
                "SilverScale"
              ],
              [
                "Explosive",
                "IronBoots"
              ]
            ]
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 38,
            "requirements": [
              [
                "Explosive",
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 5,
            "requirements": [
              [
                "Explosive",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 31,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 31,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          }
        ]
      },
      {
        "id": "river_to_lw",
        "label": "Bois perdus",
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
            "cost": 3,
            "requirements": [
              [
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 34,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 17
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 17,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          }
        ]
      },
      {
        "id": "river_to_domain",
        "label": "Domaine Zora",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zora_domain::domain_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 38
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 3,
            "requirements": [
              [
                "SilverScale"
              ],
              [
                "IronBoots"
              ]
            ]
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 34,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 17
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 17,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          }
        ]
      },
      {
        "id": "river_to_stormsgrotto",
        "label": "Grotte (Chant des Tempêtes)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_river::stormsgrotto_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 6
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 34,
            "requirements": [
              [
                "SilverScale"
              ],
              [
                "IronBoots"
              ]
            ]
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 34,
            "requirements": [
              [
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 27
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 27,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          }
        ]
      },
      {
        "id": "stormsgrotto_to_river",
        "label": "Sortie de la grotte (Chant des Tempête)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_river::river_to_stormsgrotto"
      },
      {
        "id": "river_to_opengrotto",
        "label": "Grotte (Ouverte)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_river::opengrotto_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 10
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 15,
            "requirements": [
              [
                "SilverScale"
              ],
              [
                "IronBoots"
              ]
            ]
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 15,
            "requirements": [
              [
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 9,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "river_to_fairygrotto",
            "cost": 2,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          }
        ]
      },
      {
        "id": "opengrotto_to_river",
        "label": "Sortie de la grotte (Ouverte)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_river::river_to_opengrotto"
      },
      {
        "id": "river_to_fairygrotto",
        "label": "Grotte (Fontaine des Fées)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_river::fairygrotto_to_river",
        "connections": [
          {
            "targetExitId": "river_to_hf",
            "cost": 13
          },
          {
            "targetExitId": "river_to_lw",
            "cost": 15,
            "requirements": [
              [
                "SilverScale"
              ],
              [
                "IronBoots"
              ]
            ]
          },
          {
            "targetExitId": "river_to_domain",
            "cost": 15,
            "requirements": [
              [
                "ZeldaLullaby"
              ]
            ]
          },
          {
            "targetExitId": "river_to_stormsgrotto",
            "cost": 9,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "river_to_opengrotto",
            "cost": 2
          }
        ]
      },
      {
        "id": "fairygrotto_to_river",
        "label": "Sortie de la grotte (Fontaines des Fées)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_river::river_to_fairygrotto"
      }
    ]
  },
  {
    "id": "zora_domain",
    "name": "Domaine Zora",
    "exits": [
      {
        "id": "domain_to_river",
        "label": "Rivière Zora",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zora_river::river_to_domain",
        "connections": [
          {
            "targetExitId": "domain_to_lake",
            "cost": 15
          },
          {
            "targetExitId": "domain_to_fountain",
            "cost": 25,
            "requirements": [
              [
                "AccessToFountain"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 15,
            "requirements": [
              [
                "Child"
              ],
              [
                "BlueFire"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          }
        ]
      },
      {
        "id": "domain_to_lake",
        "label": "Lac Hylia",
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
            "cost": 25,
            "requirements": [
              [
                "AccessToFountain"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 10,
            "requirements": [
              [
                "Child"
              ],
              [
                "BlueFire"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 5,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          }
        ]
      },
      {
        "id": "domain_to_fountain",
        "label": "Fontaine Zora",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zora_fountain::foutain_to_domain",
        "connections": [
          {
            "targetExitId": "domain_to_river",
            "cost": 20,
            "requirements": [
              [
                "AccessToFountain"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_lake",
            "cost": 10,
            "requirements": [
              [
                "AccessToFountain"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 15,
            "requirements": [
              [
                "AccessToFountain",
                "Child"
              ],
              [
                "AccessToFountain",
                "BlueFire"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 10,
            "requirements": [
              [
                "SongOfStorms",
                "AccessToFountain"
              ]
            ]
          }
        ]
      },
      {
        "id": "domain_to_shop",
        "label": "Boutique Zora",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zora_domain::shop_to_domain",
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
            "cost": 20,
            "requirements": [
              [
                "AccessToFountain"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "SongOfStorms"
              ]
            ]
          }
        ]
      },
      {
        "id": "shop_to_domain",
        "label": "Sortie de la boutique Zora",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zora_domain::domain_to_shop"
      },
      {
        "id": "domain_to_grotto",
        "label": "Grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_domain::grotto_to_domain",
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
            "cost": 25,
            "requirements": [
              [
                "AccessToFountain"
              ]
            ]
          },
          {
            "targetExitId": "domain_to_shop",
            "cost": 10
          }
        ]
      },
      {
        "id": "grotto_to_domain",
        "label": "Sortie de la grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "zora_domain::domain_to_grotto"
      }
    ]
  },
  {
    "id": "zora_fountain",
    "name": "Fontaine Zora",
    "exits": [
      {
        "id": "foutain_to_domain",
        "label": "Domaine Zora",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zora_domain::domain_to_fountain",
        "connections": [
          {
            "targetExitId": "fountain_to_greatfairy",
            "cost": 12,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "fountain_to_jbjb",
            "cost": 5,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "fountain_to_ic",
            "cost": 16,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "fountain_to_greatfairy",
        "label": "Fontaine de la Grande Fée",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zora_fountain::greatfairy_to_fountain",
        "connections": [
          {
            "targetExitId": "foutain_to_domain",
            "cost": 12
          },
          {
            "targetExitId": "fountain_to_jbjb",
            "cost": 11,
            "requirements": [
              [
                "Child"
              ]
            ]
          },
          {
            "targetExitId": "fountain_to_ic",
            "cost": 15,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "greatfairy_to_fountain",
        "label": "Sortie de la Fontaine de la Grande Fée",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "zora_fountain::fountain_to_greatfairy"
      },
      {
        "id": "fountain_to_jbjb",
        "label": "Ventre de Jabu-Jabu",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "jabujabu::jbjb_to_fountain",
        "connections": [
          {
            "targetExitId": "foutain_to_domain",
            "cost": 5
          },
          {
            "targetExitId": "fountain_to_greatfairy",
            "cost": 12,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "fountain_to_ic",
            "cost": 12,
            "requirements": [
              [
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "fountain_to_ic",
        "label": "Caverne Polaire",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "zora_fountain::ic_to_fountain",
        "connections": [
          {
            "targetExitId": "foutain_to_domain",
            "cost": 15
          },
          {
            "targetExitId": "fountain_to_greatfairy",
            "cost": 15,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "fountain_to_jbjb",
            "cost": 12,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "ic_to_fountain",
        "label": "Sortie de la Caverne Polaire",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "zora_fountain::fountain_to_ic"
      }
    ]
  },
  {
    "id": "lake_hylia",
    "name": "Lac Hylia",
    "exits": [
      {
        "id": "lake_to_hf",
        "label": "Plaine d'Hyrule",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hf_field::hf_to_lake",
        "connections": [
          {
            "targetExitId": "lake_to_domain",
            "cost": 12,
            "requirements": [
              [
                "SilverScale",
                "IronBoots"
              ]
            ]
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
            "cost": 22,
            "requirements": [
              [
                "IronBoots",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "lake_owl",
            "cost": 18,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "lake_to_domain",
        "label": "Domaine Zora",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "zora_domain::domain_to_lake",
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
            "cost": 11,
            "requirements": [
              [
                "IronBoots",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "lake_owl",
            "cost": 15,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "oneway_lake_from_gv",
        "label": "Arrivée de la rivière de la Vallée Gerudo",
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
            "cost": 13,
            "requirements": [
              [
                "SilverScale",
                "IronBoots"
              ]
            ]
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
            "cost": 17,
            "requirements": [
              [
                "IronBoots",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "lake_owl",
            "cost": 13,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "lake_to_lab",
        "label": "Laboratoire",
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
            "cost": 5,
            "requirements": [
              [
                "SilverScale",
                "IronBoots"
              ]
            ]
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
            "cost": 11,
            "requirements": [
              [
                "IronBoots",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "lake_owl",
            "cost": 11,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "lab_to_lake",
        "label": "Sortie du laboratoire",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lake_hylia::lake_to_lab"
      },
      {
        "id": "lake_to_fishing",
        "label": "Stand de Pêche",
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
            "cost": 14,
            "requirements": [
              [
                "SilverScale",
                "IronBoots"
              ]
            ]
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
            "cost": 12,
            "requirements": [
              [
                "IronBoots",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "lake_owl",
            "cost": 23,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "fishing_to_lake",
        "label": "Sortie du stand de Pêche",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "lake_hylia::lake_to_fishing"
      },
      {
        "id": "lab_to_grotto",
        "label": "Grotte",
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
            "cost": 16,
            "requirements": [
              [
                "SilverScale",
                "IronBoots"
              ]
            ]
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
            "cost": 22,
            "requirements": [
              [
                "IronBoots",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "lake_owl",
            "cost": 1,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "grotto_to_lab",
        "label": "Sortie de la grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "lake_hylia::lab_to_grotto"
      },
      {
        "id": "lake_to_watertemple",
        "label": "Temple de l'Eau",
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
            "cost": 11,
            "requirements": [
              [
                "SilverScale",
                "IronBoots"
              ]
            ]
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
            "cost": 24,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "serenade_pad",
        "label": "Plateforme de téléportation",
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
            "cost": 13,
            "requirements": [
              [
                "SilverScale",
                "IronBoots"
              ]
            ]
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
            "cost": 3,
            "requirements": [
              [
                "IronBoots",
                "Hookshot"
              ]
            ]
          },
          {
            "targetExitId": "lake_owl",
            "cost": 8,
            "requirements": [
              [
                "Child"
              ]
            ]
          }
        ]
      },
      {
        "id": "lake_owl",
        "label": "Hibou",
        "type": "owl",
        "shuffleTag": "owl",
        "vanillaTargetExitId": "hf_field::hf_to_market"
      }
    ]
  },
  {
    "id": "gerudo_valley",
    "name": "Vallée Gerudo",
    "exits": [
      {
        "id": "gv_to_hf",
        "label": "Plaine d'Hyrule",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "hf_field::hf_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_gf",
            "cost": 24,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed"
              ],
              [
                "Longshot",
                "Adult"
              ],
              [
                "Epona",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "gv_to_lake",
            "cost": 26
          },
          {
            "targetExitId": "gv_to_tent",
            "cost": 16,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed"
              ],
              [
                "Longshot",
                "Adult"
              ],
              [
                "Epona",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "gv_to_octorokgrotto",
            "cost": 13,
            "requirements": [
              [
                "SilverGauntlets",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "gv_to_stormgrotto",
            "cost": 17,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed",
                "SongOfStorms"
              ],
              [
                "Longshot",
                "SongOfStorms",
                "Adult"
              ],
              [
                "Epona",
                "SongOfStorms",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "gv_to_gf",
        "label": "Forteresse Gerudo",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_hf",
            "cost": 24,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed"
              ],
              [
                "Longshot",
                "Adult"
              ],
              [
                "Epona",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "gv_to_lake",
            "cost": 28
          },
          {
            "targetExitId": "gv_to_tent",
            "cost": 9,
            "requirements": [
              [
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "gv_to_octorokgrotto",
            "cost": 19,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed",
                "SilverGauntlets"
              ],
              [
                "Adult",
                "Longshot",
                "SilverGauntlets"
              ],
              [
                "Adult",
                "Epona",
                "SilverGauntlets"
              ]
            ]
          },
          {
            "targetExitId": "gv_to_stormgrotto",
            "cost": 9,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          }
        ]
      },
      {
        "id": "gv_to_lake",
        "label": "Rivière vers le Lake Hylia",
        "type": "overworld",
        "shuffleTag": "gerudo_river",
        "vanillaTargetExitId": "lake_hylia::oneway_lake_from_gv"
      },
      {
        "id": "gv_to_tent",
        "label": "Tente",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "gerudo_valley::tent_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_hf",
            "cost": 16,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed"
              ],
              [
                "Longshot",
                "Adult"
              ],
              [
                "Epona",
                "Adult"
              ]
            ]
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
            "cost": 11,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed",
                "SilverGauntlets"
              ],
              [
                "Adult",
                "Longshot",
                "SilverGauntlets"
              ],
              [
                "Adult",
                "Epona",
                "SilverGauntlets"
              ]
            ]
          },
          {
            "targetExitId": "gv_to_stormgrotto",
            "cost": 2,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          }
        ]
      },
      {
        "id": "tent_to_gv",
        "label": "Sortie de la tente",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "gerudo_valley::gv_to_tent"
      },
      {
        "id": "gv_to_octorokgrotto",
        "label": "Grotte (Octorok)",
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
        "label": "Sortie de la grotte (Octorok)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_valley::gv_to_octorokgrotto"
      },
      {
        "id": "gv_to_stormgrotto",
        "label": "Grotte (Chant des Tempêtes)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_valley::stormgrotto_to_gv",
        "connections": [
          {
            "targetExitId": "gv_to_hf",
            "cost": 17,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed"
              ],
              [
                "Longshot",
                "Adult"
              ],
              [
                "Epona",
                "Adult"
              ]
            ]
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
            "cost": 12,
            "requirements": [
              [
                "Adult",
                "GerudoBridgeFixed",
                "SilverGauntlets"
              ],
              [
                "Adult",
                "Longshot",
                "SilverGauntlets"
              ],
              [
                "Adult",
                "Epona",
                "SilverGauntlets"
              ]
            ]
          }
        ]
      },
      {
        "id": "stormgrotto_to_gv",
        "label": "Sortie de la grotte (Chant des Tempêtes)",
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
        "label": "Vallée Gerudo",
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
            "cost": 12,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 8,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Désert Hanté",
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
            "cost": 12,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 14,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Grotte (Chant des Tempêtes)",
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
            "cost": 3,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Sortie de la grotte (Chant des Tempêtes)",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_grotto"
      },
      {
        "id": "gf_to_gtg",
        "label": "Gymnase Gerudo",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "gerudo_fortress::gtg_to_gt",
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
            "cost": 3,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
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
        "id": "gtg_to_gt",
        "label": "Sortie du Gymnase Gerudo",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_gtg"
      },
      {
        "id": "hideout_gf_a",
        "label": "Repaire : Cellule à 1 torche, couloir en L",
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
        "label": "Repaire : Cellule à 1 torche, couloir droit",
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
        "label": "Repaire : Cuisine, accès bas",
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
        "label": "Repaire : Cuisine, accès haut",
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
        "label": "Repaire : Cuisine, niveau supérieur, couloir droit",
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
        "label": "Repaire : Cuisine, niveau supérieur, couloir en L",
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
        "label": "Repaire : Cellule à 2 torches, couloir en Z",
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_g_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_h",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_h",
        "label": "Repaire : Cellule à 2 torches, couloir en L",
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_h_gf",
        "connections": [
          {
            "targetExitId": "hideout_gf_g",
            "cost": 5
          }
        ]
      },
      {
        "id": "hideout_gf_i",
        "label": "Repaire : Cellule à 4 torches, couloir en L",
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
        "label": "Repaire : Cellule à 4 torches, couloir en Z",
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
        "label": "Repaire : Cellule à 3 torches",
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_k_gf"
      },
      {
        "id": "hideout_gf_l",
        "label": "Repaire : Salle de pause",
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_l_gf"
      },
      {
        "id": "hideout_gf_m",
        "label": "Repaire : Couloir vers le balcon",
        "type": "interior",
        "shuffleTag": "hideout",
        "vanillaTargetExitId": "gerudo_fortress::hideout_m_gf"
      },
      {
        "id": "hideout_a_gf",
        "label": "Repaire : Accès au pied de la cellule",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Derrière les caisses, gauche",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Derrière les caisses, face",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Porte solitaire, face au désert",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Terrasse, face au désert",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Hauteur, face au désert",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Au-dessus du gymnase",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Terrasse, face à la prison",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Face aux vignes",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : À droite des caisses",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Contrebas de la Skulltula",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Isolé, contre la prison",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Repaire : Balcon",
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
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_grotto",
            "cost": 15,
            "requirements": [
              [
                "Adult",
                "SongOfStorms"
              ]
            ]
          },
          {
            "targetExitId": "gf_to_gtg",
            "cost": 15,
            "requirements": [
              [
                "GerudoPass"
              ]
            ]
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
        "label": "Forteresse Gerudo",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "gerudo_fortress::gf_to_hw",
        "connections": [
          {
            "targetExitId": "hw_to_colossus",
            "cost": 80,
            "requirements": [
              [
                "TruthLens"
              ]
            ]
          }
        ]
      },
      {
        "id": "hw_to_colossus",
        "label": "Colosse du Désert",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "colossus::colossus_to_hw"
      }
    ]
  },
  {
    "id": "colossus",
    "name": "Colosse du Désert",
    "exits": [
      {
        "id": "colossus_to_hw",
        "label": "Désert Hanté",
        "type": "overworld",
        "shuffleTag": "overworld",
        "vanillaTargetExitId": "wasteland::hw_to_colossus",
        "connections": [
          {
            "targetExitId": "colossus_to_greatfairy",
            "cost": 10,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 20,
            "requirements": [
              [
                "SilverGauntlets",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "colossus_to_spirittemple",
            "cost": 26
          }
        ]
      },
      {
        "id": "colossus_to_greatfairy",
        "label": "Fontaine de la Grande Fée",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "colossus::greatfairy_to_colossus",
        "connections": [
          {
            "targetExitId": "colossus_to_hw",
            "cost": 10
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 10,
            "requirements": [
              [
                "SilverGauntlets",
                "Adult"
              ]
            ]
          },
          {
            "targetExitId": "colossus_to_spirittemple",
            "cost": 20
          }
        ]
      },
      {
        "id": "greatfairy_to_colossus",
        "label": "Sortie de la Fontaine de la Grande Fée",
        "type": "interior",
        "shuffleTag": "interior_simple",
        "vanillaTargetExitId": "colossus::colossus_to_greatfairy"
      },
      {
        "id": "colossus_to_grotto",
        "label": "Grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "colossus::grotto_to_colossus",
        "connections": [
          {
            "targetExitId": "colossus_to_hw",
            "cost": 20
          },
          {
            "targetExitId": "colossus_to_greatfairy",
            "cost": 10,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "colossus_to_spirittemple",
            "cost": 9
          }
        ]
      },
      {
        "id": "grotto_to_colossus",
        "label": "Sortie de la Grotte",
        "type": "grotto",
        "shuffleTag": "grotto",
        "vanillaTargetExitId": "colossus::colossus_to_grotto"
      },
      {
        "id": "colossus_to_spirittemple",
        "label": "Temple de l'Esprit",
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
            "cost": 20,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 9,
            "requirements": [
              [
                "SilverGauntlets",
                "Adult"
              ]
            ]
          }
        ]
      },
      {
        "id": "requiem_pad",
        "label": "Plateforme de téléportation",
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
            "cost": 15,
            "requirements": [
              [
                "Explosive"
              ]
            ]
          },
          {
            "targetExitId": "colossus_to_grotto",
            "cost": 5,
            "requirements": [
              [
                "SilverGauntlets",
                "Adult"
              ]
            ]
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
    "id": "dekutree",
    "name": "Arbre Mojo",
    "exits": [
      {
        "id": "dekutree_to_kf",
        "label": "Forêt Kokiri",
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
        "label": "Boss de l'Arbre Mojo",
        "type": "boss",
        "shuffleTag": "boss_warp_child",
        "vanillaTargetExitId": "dekutree::gohma"
      },
      {
        "id": "gohma",
        "label": "Gohma",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "kokiri_forest::kf_to_dekutree",
        "specialTag": "boss_child"
      }
    ]
  },
  {
    "id": "dodongo_cavern",
    "name": "Caverne Dodongo",
    "exits": [
      {
        "id": "dc_to_dmt",
        "label": "Chemin du Péril",
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
        "label": "Boss de la Caverne Dodongo",
        "type": "boss",
        "shuffleTag": "boss_warp_child",
        "vanillaTargetExitId": "dodongo_cavern::kd"
      },
      {
        "id": "kd",
        "label": "Roi Dodongo",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "death_mountain_trail::dmt_to_dc",
        "specialTag": "boss_child"
      }
    ]
  },
  {
    "id": "jabujabu",
    "name": "Ventre de Jabu-Jabu",
    "exits": [
      {
        "id": "jbjb_to_fountain",
        "label": "Fontaine Zora",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "zora_fountain::fountain_to_jbjb",
        "connections": [
          {
            "targetExitId": "jbjb_boss",
            "cost": 70
          }
        ]
      },
      {
        "id": "jbjb_boss",
        "label": "Boss du Ventre de Jabu-Jabu",
        "type": "boss",
        "shuffleTag": "boss_warp_child",
        "vanillaTargetExitId": "jabujabu::barinade"
      },
      {
        "id": "barinade",
        "label": "Barinade",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "zora_fountain::fountain_to_jbjb",
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
        "label": "Bosquet Sacré",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "meadow::meadow_to_foresttemple",
        "connections": [
          {
            "targetExitId": "foresttemple_boss",
            "cost": 50
          }
        ]
      },
      {
        "id": "foresttemple_boss",
        "label": "Boss du Temple de la Forêt",
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "forest_temple::pg"
      },
      {
        "id": "pg",
        "label": "Ganon Spectral",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "meadow::minuet_pad",
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
        "label": "Cratère du Péril",
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
        "label": "Boss du Temple du Feu",
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "fire_temple::volvagia"
      },
      {
        "id": "volvagia",
        "label": "Volcania",
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
        "label": "Lac Hylia",
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
        "label": "Boss du Temple de l'Eau",
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "water_temple::morpha"
      },
      {
        "id": "morpha",
        "label": "Morpha",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "lake_hylia::serenade_pad",
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
        "label": "Cimetière Cocorico",
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
        "label": "Boss du Temple de l'Ombre",
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "shadow_temple::bb"
      },
      {
        "id": "bb",
        "label": "Bongo Bongo",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "graveyard::nocturne_pad",
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
        "label": "Colosse du Désert",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "colossus::colossus_to_spirittemple",
        "connections": [
          {
            "targetExitId": "spirittemple_boss",
            "cost": 120
          }
        ]
      },
      {
        "id": "spirittemple_boss",
        "label": "Boss du Temple de l'Esprit",
        "type": "boss",
        "shuffleTag": "boss_warp_adult",
        "vanillaTargetExitId": "spirit_temple::twinrova"
      },
      {
        "id": "twinrova",
        "label": "Twinrova",
        "type": "dungeon",
        "shuffleTag": "dungeon_simple",
        "vanillaTargetExitId": "colossus::requiem_pad",
        "specialTag": "boss_adult"
      }
    ]
  }
];
