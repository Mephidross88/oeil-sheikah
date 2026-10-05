# L'Œil Sheikah

Tracker d'objets, de checks et d'entrées, et routeur, pour le randomizer de Ship of Harkinian 9.2.3 (migré depuis
OoT Randomizer, voir SPEC.md). Modules (menu, par groupe) : Progression — Checks, Routeur, Entrées (id `entrances`), Indices (id `hints`) ; Aperçus — Carte (id `map`),
Connexions (id `graph`), Statistiques (id `stats`) ; Configuration ; plus le panneau Objets.
Application 100 % client, sans build : ouvrir `index.html` dans un navigateur suffit.
Interface et textes en français.
Le comportement attendu est décrit dans `SPEC.md` : le lire avant toute évolution fonctionnelle,
et le mettre à jour quand une règle change.

## Fichiers
- `index.html` : squelette, charge Vue 3 (CDN jsDelivr, build global), puis `data/areas-data.js`, `data/checks-data.js`
  et `data/logic-data.js`, puis les fichiers
  de `js/` **dans l'ordre listé ci-dessous** (scripts classiques, pas de modules ES : chaque fichier partage
  le même scope global de haut niveau, comme s'il s'agissait d'un seul fichier — un `const`/`function` déclaré
  dans un fichier est directement utilisable dans les suivants ; ne pas redéclarer un identifiant existant).
  1. `js/icons.js` : destructuration de l'API Vue globale, icônes SVG inline (`ICONS`), icônes de types de
     sortie personnalisables (`CUSTOM_ICONS`), libellés de types (`TYPE_LABEL`).
  2. `js/data.js` : transforme `window.AREAS_DATA` (fourni par `areas-data.js`) en structures internes
     (`AREAS`, `AREA`, `EXIT`, `ALL_EXITS`, `BOSS_ROOMS`/`BOSS_DOORS`, etc.).
  3. `js/config.js` : réglages du randomizer Ship of Harkinian 9.2.3 (commit `cb71e22`) — `CONFIG_TABS`
     (onglets/cartes), `SETTINGS_DEF` (clé camelCase, nom SoH exact, libellé FR, choix `[valeurSoH, libellé]`,
     défaut, règle de visibilité `show(s)`), `SETTINGS_IGNORED`, `TRICKS`/`TRICK_AREAS`/`TRICK_LEVELS`.
     Fichier généré à partir de `settings.cpp` de SoH ; les valeurs stockées sont les chaînes SoH exactes.
  4. `js/entrances.js` : règles de la page Entrées, pures (sans Vue) — sorties randomisées et pools (`isRandomized`,
     `poolOf`, `isMixed`, pool des salles de boss), déblocage des sens uniques (`isUnlocked`), cibles effectives
     (`computeEff`), validation des données (`DATA_ERRORS`) — et `shortest` (Dijkstra, pour le Routeur ; but = sortie ou
     prédicat, pour « Y aller » de Checks), `reachAll` (même exploration sans but : bandeau « Où aller maintenant ? »).
  5. `js/items.js` : `ITEM_GROUPS` (catalogue du panneau Objets, source de vérité des métadonnées et des
     clés de sauvegarde) et ses helpers (`itemMax`, `itemVisible`, `visibleKeys`, `dungeonCells`, `configQuest`, `configKeyRing`, `TRIALS`/`configTrials` (épreuves de Ganon) — visibilité
     pilotée par `store.settings`) ; `ITEM_BY_KEY` (lookup clé → objet) et
     `ITEMS_PAGE` (mise en page du panneau — quels objets dans quel bloc visuel, sans redéfinir leurs
     métadonnées) ; `DUNGEONS`/`DUNGEON_BY_ID` (carte/boussole/petites clés/clé de boss par donjon) et
     `CHECKLISTS` (lieux à cocher — clés hors donjon, trous à haricots), lus par la logique SoH.
  6. `js/checks.js` : checks de SoH (`CHECK_AREAS`, `CHECKS`, `CHECK_BY_ID`, `CHECK_BY_SOH`, `CHECKS_BY_AREA`)
     construits depuis `window.CHECKS_DATA`, et règles pures d'affichage : `checkShuffled` (check mélangé selon la
     configuration, reprise d'`IsCheckShuffled` du tracker de SoH) et `checkQuestActive` (version V/MQ) ; pierres à potins
     (`GOSSIP_STONES`, `HINT_TYPES`, `hintArea` : zone citée par un indice → zone de la page Checks).
  7. `js/logic.js` : moteur de logique de l'appli (notre portage de la logique SoH : `logic.cpp`, `location_access.cpp`, `fill.cpp`).
     Contexte global `L` lu par les conditions de `logic-data.js` (âge/moment courants, `HasItem`/`CanUse`
     sur l'inventaire du panneau Objets, options via `L.opt(RSK)`, astuces, événements, fonctions de logique),
     et `computeSoh(settings, game, links?)` → `{ access:{RR: bits}, events, checks:{RC: bits} }` (bits : `CD`
     enfant jour, `CN` enfant nuit, `AD`/`AN` adulte ; `links` : entrées mélangées `{ 'RR_A>RR_B': 'RR_C' }`,
     `null` = impasse). En fin de fichier, `entranceLinks(eff, settings)` traduit les destinations notées dans Entrées
     en `links` (sortie randomisée non notée → impasse ; salles de boss et téléporteurs bleus selon la règle de SoH),
     `exitRegions`/`arrivalRegion` (régions SoH d'une sortie), `bossRoomExits` (porte de sortie et téléporteur bleu de
     chaque salle de boss), et `routeGraph(settings, game, links, eff, costs)` : graphe du Routeur (nœuds (sortie, âge,
     position) — position `in` apparu à la sortie, `front` arrivé à pied, `start` départ choisi ; marche par les
     sorties internes des régions SoH, transitions, chants, sauvegarder-recharger, changement d'âge), à passer à `shortest`,
     et `needs(arête)` : objets SoH retenus pour franchir une étape (ensemble minimal selon `ROUTE_AVOID`/`ROUTE_PREFER`)
     et alternatives ; `rgItem` (objet SoH → objet du panneau). Pur (sans Vue), lit `store` seulement via ses arguments.
  8. `js/state.js` : persistance (`defaults`, `merge`, `load`, `store`, sauvegarde auto), les `computed`
     dérivés au niveau module (`effC`, `linksC` — destinations notées → liaisons, `sohC` — logique SoH avec
     l'inventaire noté et les entrées notées, `agesC` — âges accessibles, `reachC` — sorties atteignables, `routeC` —
     graphe du Routeur, `sohFullC`
     — avec un inventaire « tout obtenu » (`fullGame`), pour l'âge des checks), les mutations du mapping
     (`setMapping`, `clearMapping`, `candidatesFor`), les helpers de tuile d'objet partagés par `App` et
     `ItemTile` (`itemActive`, `iconSrc`, `itemTitle`, `itemMaxed`, `clickItem`, `rightClickItem`), et les
     mutations des check-lists/donjons (`setChecklist`, `checklistStats`, `setDungeonFlag`,
     `addDungeonKeys`, `dungeonQuest`/`dungeonMaxKeys`/`cycleDungeonQuest` — version Vanilla/MQ, `dungeonKeyRing`/`setKeyRing`/`dungeonKeysDone` — trousseaux et clé squelette, `trialStatus`/`cycleTrial` — épreuves de Ganon tirées au sort), et `applyStartingItems` (objets de départ de la configuration → panneau Objets), et pour la page Checks `areaQuest`,
     `checkListed`, `setCheck`, `setExcluded`, `whyLocked` (ce qui manque pour un check : objets au plus juste, entrée à
     découvrir ou jamais), les indices des pierres (`game.hints`, `setHintRead`, synthèse `hintsC`),
     et la chronologie de la partie (`game.timeline`, `game.runStart`, observateur synchrone,
     `timelineQuiet` / `timelineSkip`, `itemIconAt` / `itemLabelAt`), et `mapEdits` (positions de checks placées à la main
     sur la Carte, localStorage `oeil-sheikah-positions`, exportées en `positions-manuelles.json`).
  8b. `js/link.js` : auto-tracking — connexion (EventSource) au relais local `tools/soh-link/relay.mjs`, état `link`
     (statut, journal), `linkApply` (paquets du jeu → partie : checks, `linkSaveToGame` sauvegarde SoH → panneau
     Objets, position → départ du Routeur, objet trouvé par check, trouvailles, entrées notées via `setMapping` — question au joueur si l'arrivée est ambiguë, `link.ask` —, sauvegarde suivie
     (`game.save`, `link.foreign` : une autre sauvegarde est ignorée), écart avec la sauvegarde (`linkDrift`, `link.drift`,
     `game.keepDrift`), spoiler
     caché gardé à part dans localStorage `oeil-sheikah-spoiler`). Options persistantes `store.ui.link`. Données
     `data/link-data.js` (drapeaux RandomizerInf, noms RandomizerGet et leurs noms français, numéros GetItemID, entrées
     et positions de retour des grottes), **fichier généré** par `tools/soh-link/gen_link_data.mjs`. Relais :
     `tools/soh-link/relay.mjs` (faux serveur Anchor en lecture seule ; position en temps réel `link.live` par un second
     joueur fictif, option `ui.link.live` ; tests sur d'autres ports, `--game=… --web=…`),
     lancé sous Windows par `lancer-relais.bat` (racine, fins de ligne CRLF imposées par `.gitattributes`).
  9. `js/components.js` : composants Vue réutilisables (`TypeIcon`, `Seg`, `DestPicker`, `ItemTile`,
     `ProgressCard` — cadre de progression des pages Checks et Entrées, `EntranceGraph` — page Connexions : graphe des
     entrées connues, positions des zones `GRAPH_POS`, `ZoneMap` — page Carte : terrain vu de dessus et repères des
     sorties, données `window.MAPS_DATA`).
  9b. `js/stream.js` : fenêtre de stream — types de widgets (`STREAM_TYPES`, rubriques `STREAM_CATS`), dispositions
     (profils) et leur migration (`loadStream`, clé `oeil-sheikah-stream`), gabarit (`streamTemplate(parts)`, appelé par
     `app.js` avec `ITEMS_TPL` / `LOOT_TPL`) et éditeur (`useStream(STREAM_MODE)` dans le setup d'App : panneau latéral,
     aimantation, calques, annuler / rétablir, export / import).
  10. `js/app.js` : le composant racine `App` (template complet, dont le panneau Objets et ses modales de
     pointage) + `createApp(...).mount('#app')`. Fragments de gabarit partagés en constantes (`ITEMS_TPL`, `LOOT_TPL`,
     `STREAM_TPL`) insérés par `${…}` dans le gabarit d'App (évalués par JS, pas par Vue) : la fenêtre de stream
     (`index.html?stream`, `STREAM_MODE` de `state.js` : relit le store via l'événement `storage`, ne sauvegarde pas, pas
     de relais ; widgets et éditeur dans `js/stream.js`) réutilise le panneau Objets.
- `README.md` : mode d'emploi pour les joueurs (lancer l'appli, auto-tracking, cartes, stream) — à tenir à jour quand une
  de ces étapes change.
- `style.css` : styles, variables de thème dans `:root` (clair + sombre).
- `data/areas-data.js` : données (`window.AREAS_DATA`). Gros fichier : ne le lire que si la tâche porte sur les données.
- `data/checks-data.js` : checks SoH (`window.CHECKS_DATA`), **fichier généré** (voir son en-tête et SPEC.md > Checks) ;
  gros fichier, ne pas le lire en entier ni l'éditer à la main pour autre chose qu'une retouche ponctuelle.
- `tools/soh-checks/` : scripts Node lancés à la main (jamais chargés par l'appli) qui régénèrent `checks-data.js`
  depuis les sources de SoH ; traductions des libellés dans `translate.mjs`. Mode d'emploi dans son `README.md`.
- `data/logic-data.js` : données de logique converties depuis les sources de SoH (`window.SOH_LOGIC` : 1 026 régions avec événements, checks et sorties, conditions
  converties en fonctions JS sur le contexte global `L`), **fichier généré** par `tools/soh-logic/extract_logic.mjs`
  (sources téléchargées par `tools/soh-checks/fetch_sources.mjs`), plus les prix vanilla des boutiques/pestes/marchands
  et la table des entrées de SoH (`entrances` : numéro ENTR, type, région de départ, région d'arrivée vanilla).
  Gros fichier : ne le lire que par extraits (grep sur un `RR_…` ou `RC_…`).
- `tools/soh-logic/` : `extract_logic.mjs` (régénère `logic-data.js`) et `replay_spoilers.mjs` (test du moteur :
  rejoue des spoilers SoH sphère par sphère, compare aux entrées du spoiler les liaisons déduites des destinations
  notées et, à chaque sphère, les régions atteintes par le Routeur à celles de la logique, voir SPEC.md > Logique Ship of
  Harkinian ; à relancer après toute modification de `js/logic.js`, de la
  conversion, des règles d'entrées ou de `areas-data.js`).
- `tools/soh-maps/extract_maps.mjs` : cartes de la page Carte depuis la ROM de l'utilisateur (compressée ou non, décompressée
  par l'outil ; `--mq=` ROM Master Quest pour les donjons MQ ; hors dépôt) — scènes d'OoT (points d'apparition, liste des entrées, collision, acteurs des salles, toutes versions) + tables
  des entrées, scènes et acteurs de SoH et définitions des checks (`tools/soh-checks/src`), logique (`logic-data.js`) :
  sol, position des sorties, des checks et des pierres d'extérieur et des donjons (étages : `z_map_data.c` de SoH), lieu
  des autres (intérieur, grotte, donjon), positions placées à la main (`tools/soh-maps/positions-manuelles.json`, exporté par
  la Carte) ou notées en jouant (`tools/soh-maps/positions.json`, versionnés ; ce dernier écrit par
  `tools/soh-maps/capture_positions.mjs` / `lancer-capture.bat` : faux serveur Anchor qui déclare un second joueur pour
  recevoir la position de Link) →
  `data/maps-data.js`, **généré et non versionné** (chargé par `index.html`,
  absent par défaut : la page Carte l'explique).
- `tools/soh-link/replay_packets.mjs` : test de l'auto-tracking — rejoue une partie enregistrée par le relais
  (`tools/soh-link/fixtures/session.json` : paquets allégés et spoiler de la seed ; `--make-fixture` le refabrique depuis
  un `relay.mjs --dump`) et vérifie entrées notées, questions, objets trouvés et positions ; à relancer après toute
  modification de `js/link.js` (ou de ce qu'il utilise : entrées, `link-data.js`).
- `tools/soh-entrances/apply_names.mjs` : table sortie ↔ entrée du tracker d'entrées de SoH et traductions ; réécrit les
  champs `label` / `soh` / `entr` de `areas-data.js` et aligne `shuffleTag` sur le type d'entrée SoH (relancer après
  toute modification de la table).
- `icons/` : images, 192 px. `icons/exits/` (types de sortie), `icons/route/` (modes de déplacement et changements
  d'âge du Routeur), `icons/items/` (convention par défaut du panneau
  Objets) et `icons/rewards/...` (chemins personnalisés d'exemple) — voir SPEC.md > Panneau Objets pour la
  convention de nommage et comment personnaliser un chemin par objet (`icon`/`icons` dans `ITEM_GROUPS`).

## Contraintes
- Pas d'outil de build, pas de modules ES, pas de dépendance hors CDN. Doit marcher en `file://`.
  La séparation en plusieurs fichiers dans `js/` reste de simples `<script>` classiques : ne jamais y
  introduire `import`/`export`, ni changer l'ordre de chargement dans `index.html` sans vérifier les
  dépendances (un fichier ne peut utiliser que ce qui est déclaré dans un fichier chargé avant lui).
- Sauvegarde automatique dans `localStorage` (clé `oeil-sheikah-v1`) à chaque changement de `store`.
  Tout nouveau champ persistant doit avoir une valeur dans `defaults()` (fusion via `merge()` au chargement).

## Modèle de données
- Zone : `{ id, name, exits[] }` — les 32 zones du tracker de checks de SoH (id = RCAREA en minuscules, même découpage
  que la page Checks) + la pseudo-zone `spawns` (apparitions, chants de téléportation). Sortie : `{ id, label, soh, entr?, type, shuffleTag, vanillaTargetExitId, connections?, destinationOnly?, specialTag? }`
  (`label` = nom SoH traduit, `soh` = nom exact du tracker d'entrées de SoH, affiché au survol, `entr` = numéro de
  l'entrée SoH, comme dans `SOH_LOGIC.entrances` ; absent pour les arrivées seules).
- Clé d'une sortie : `"zoneId::exitId"`.
- « Cible » d'une sortie T = l'endroit où l'on apparaît : on se trouve à l'emplacement de la sortie T.
  Ex. `kokiri_forest::kf_to_midos` (« Maison de Mido ») est côté forêt ; en la prenant, on arrive à
  `midos_to_kf` (« Sortie de la maison de Mido »), à l'intérieur.
- `connections` : coûts de marche entre sorties d'une même zone (`targetExitId`, `cost`), repris d'OoT Randomizer et
  utilisés par le Routeur ; c'est la logique SoH qui dit si le passage est possible. `targetExitId` sous la forme
  `"zone::sortie"` : passage à pied vers une autre zone, à sens unique (fin de la course d'Igor, sortie par les mains
  du Temple de l'Esprit).
- `destinationOnly` : plateformes de téléportation, arrivée de la rivière Gerudo, toit de la maison d'Impa (atterrissage
  du hibou du Chemin du Péril) — on ne peut pas les prendre.
- `specialTag` boss_child / boss_adult : salles de boss ; leur sortie est le téléporteur bleu, calculée
  automatiquement en entrées couplées, notée par le joueur en entrées découplées (`bossRoomNoted`).

## Règles de la page Entrées (js/entrances.js, js/state.js)
- `store.settings` = une clé par entrée de `SETTINGS_DEF` (valeurs SoH : `'On'`/`'Off'`, `'Deku Only'`…) + `tricks`
  (`{ RT_…: bool }`). Tester les valeurs SoH exactes (`s.bossEntrances === 'Full'`), jamais des booléens.
- `isRandomized(exit, settings)` : sortie randomisée selon la configuration (détermine le mode `vanilla` vs le reste).
  `isDecoupled(s)` (entrées découplées), `isMixed(exit, s)` (type d'entrée inclus dans les pools mélangés via les
  options « Mix … »).
- `isUnlocked(exit, ages, game)` : sortie à sens unique (spawn/chant) effectivement connaissable dans la partie en
  cours (spawn enfant/adulte avec l'âge correspondant accessible selon `agesC`, chant avec Ocarina + chant appris).
  Tant que ce n'est pas le cas, la sortie est `isRandomized` mais pas éditable (mode `locked` dans `rowInfo`).
- `computeEff()` : cible effective de chaque sortie (mapping utilisateur, vanilla ou calcul boss). Se base sur
  `isRandomized` seul (pas `isUnlocked`) : une destination déjà notée reste connue même si l'état de la partie
  qui l'a débloquée est ensuite décoché.
- Entrées couplées par défaut : `setMapping(A, B)` écrit aussi `B → A` (`isCoupledPair` : deux sorties à double sens,
  ou porte de boss ↔ Tour de Ganon ; jamais en entrées découplées).
- Pools (`poolOf`, `candidatesFor`) : les listes ne proposent que des destinations du même pool, sauf pools
  mélangés. Portes de boss → salles (et Tour de Ganon) ; salles notées → devant une porte de boss. Sens uniques
  (`ONE_WAY_TARGETS`, types SoH des entrées d'arrivée) : ne consomment pas leur destination.
- Accessibilité : uniquement la logique SoH (`sohC`, `reachC`) ; une sortie randomisée non notée est une impasse.
- Coûts du Routeur réglables dans `store.costs` (dont `walk` : coût estimé par région SoH traversée sans coût connu).
- Thème : `store.ui.theme` (`auto` suit le système, `light`/`dark` posent `data-theme` sur `<html>`).
- Mise en page : `ui.view` (panneau principal), `ui.split` (page du second panneau, côte à côte si l'écran fait au moins
  1500 px ; `shown(v)` / `paneOf(v)` dans `App`), `ui.itemsFolded` (panneau Objets replié), `ui.navFolded` (barre de gauche réduite à des icônes), `ui.next.open` (bandeau « Où aller maintenant ? » déplié). Chaque page du template est
  une `<section class="pane">` ; ne pas réutiliser la classe `side` (barre latérale) ailleurs.

## Débogage
`window.__PF` expose `store`, `effC`, `linksC`, `reachC`, `agesC`, `routeC`, `shortest`, `candidatesFor`, `setMapping`, `EXIT`,
`sohC`, `sohFullC`, `computeSoh`, `entranceLinks`, `L`, `SOH` pour tester dans la console du navigateur.
