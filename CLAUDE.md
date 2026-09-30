# L'Œil Sheikah

Tracker d'objets et routeur d'entrées pour Ocarina of Time Randomizer (Entrance Randomizer, ER), en cours de
migration vers le randomizer de Ship of Harkinian (voir SPEC.md). Modules : Entrées (id `entrances`),
Routeur, Checks, Configuration, plus le panneau Objets.
Application 100 % client, sans build : ouvrir `index.html` dans un navigateur suffit.
Interface et textes en français.
Le comportement attendu est décrit dans `SPEC.md` : le lire avant toute évolution fonctionnelle,
et le mettre à jour quand une règle change.

## Fichiers
- `index.html` : squelette, charge Vue 3 (CDN jsDelivr, build global), puis `areas-data.js` et `checks-data.js`, puis les fichiers
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
  4. `js/logic.js` : toute la logique pure (sans Vue) — conditions (`sat`, `REQUIREMENTS`), dérivation de
     l'inventaire (`deriveGame`, `canOpenDoorOfTime`), pools de randomisation, `computeEff`, graphe de
     déplacement (`makeEdges`, `flood`, `computeAges`), `shortest` (Dijkstra).
  5. `js/items.js` : `ITEM_GROUPS` (catalogue du panneau Objets, source de vérité des métadonnées et des
     clés de sauvegarde) et ses helpers (`itemMax`, `itemVisible`, `visibleKeys`, `dungeonCells`, `configQuest`, `configKeyRing` — visibilité
     pilotée par `store.settings`) ; `ITEM_BY_KEY` (lookup clé → objet) et
     `ITEMS_PAGE` (mise en page du panneau — quels objets dans quel bloc visuel, sans redéfinir leurs
     métadonnées) ; `DUNGEONS`/`DUNGEON_BY_ID` (carte/boussole/petites clés/clé de boss par donjon) et
     `CHECKLISTS` (lieux à cocher — clés hors donjon, trous à haricots). Ces trois derniers sont pour
     l'instant purement informatifs (pas encore branchés à la logique d'accessibilité, voir SPEC.md).
  6. `js/checks.js` : checks de SoH (`CHECK_AREAS`, `CHECKS`, `CHECK_BY_ID`, `CHECK_BY_SOH`, `CHECKS_BY_AREA`)
     construits depuis `window.CHECKS_DATA`, et règles pures d'affichage : `checkShuffled` (check mélangé selon la
     configuration, reprise d'`IsCheckShuffled` du tracker de SoH) et `checkQuestActive` (version V/MQ).
  7. `js/state.js` : persistance (`defaults`, `merge`, `load`, `store`, sauvegarde auto), les `computed`
     dérivés au niveau module (`effC`, `agesC`, `gameC`, `edgesC`, `reachC`), les mutations du mapping
     (`setMapping`, `clearMapping`, `candidatesFor`), les helpers de tuile d'objet partagés par `App` et
     `ItemTile` (`itemActive`, `iconSrc`, `itemTitle`, `itemMaxed`, `clickItem`, `rightClickItem`), et les
     mutations des check-lists/donjons (`setChecklist`, `checklistStats`, `setDungeonFlag`,
     `addDungeonKeys`, `dungeonQuest`/`dungeonMaxKeys`/`cycleDungeonQuest` — version Vanilla/MQ, `dungeonKeyRing`/`setKeyRing`/`dungeonKeysDone` — trousseaux et clé squelette), et `applyStartingItems` (objets de départ de la configuration → panneau Objets), et pour la page Checks `areaQuest`,
     `checkListed`, `setCheck`, `setExcluded`.
  8. `js/components.js` : composants Vue réutilisables (`TypeIcon`, `Seg`, `DestPicker`, `ItemTile`,
     `ProgressCard` — cadre de progression des pages Checks et Entrées).
  9. `js/app.js` : le composant racine `App` (template complet, dont le panneau Objets et ses modales de
     pointage) + `createApp(...).mount('#app')`.
- `style.css` : styles, variables de thème dans `:root` (clair + sombre).
- `areas-data.js` : données (`window.AREAS_DATA`). Gros fichier : ne le lire que si la tâche porte sur les données.
- `checks-data.js` : checks SoH (`window.CHECKS_DATA`), **fichier généré** (voir son en-tête et SPEC.md > Checks) ;
  gros fichier, ne pas le lire en entier ni l'éditer à la main pour autre chose qu'une retouche ponctuelle.
- `tools/soh-checks/` : scripts Node lancés à la main (jamais chargés par l'appli) qui régénèrent `checks-data.js`
  depuis les sources de SoH ; traductions des libellés dans `translate.mjs`. Mode d'emploi dans son `README.md`.
- `soh-logic-data.js` : logique de SoH (`window.SOH_LOGIC` : 1 026 régions avec événements, checks et sorties, conditions
  converties en fonctions JS sur le contexte global `L`), **fichier généré** par `tools/soh-logic/extract_logic.mjs`
  (sources téléchargées par `tools/soh-checks/fetch_sources.mjs`). Pas encore chargé par `index.html` : le moteur
  (`js/soh-logic.js`) est en cours de construction sur la branche `logique`.
- `tools/soh-entrances/apply_names.mjs` : table sortie ↔ entrée du tracker d'entrées de SoH et traductions ; réécrit les
  champs `label` / `soh` de `areas-data.js` (relancer après toute modification de la table).
- `icons/` : images. `icons/exits/` (types de sortie), `icons/items/` (convention par défaut du panneau
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
  que la page Checks) + la pseudo-zone `spawns` (apparitions, chants de téléportation). Sortie : `{ id, label, soh, type, shuffleTag, vanillaTargetExitId, connections?, destinationOnly?, specialTag? }`
  (`label` = nom SoH traduit, `soh` = nom exact du tracker d'entrées de SoH, affiché au survol).
- Clé d'une sortie : `"zoneId::exitId"`.
- « Cible » d'une sortie T = l'endroit où l'on apparaît : on se trouve à l'emplacement de la sortie T.
  Ex. `kokiri_forest::kf_to_midos` (« Maison de Mido ») est côté forêt ; en la prenant, on arrive à
  `midos_to_kf` (« Sortie de la maison de Mido »), à l'intérieur.
- `connections` : déplacements à pied dans la même zone, `cost` + `requirements` en DNF
  (liste de groupes ; un groupe entièrement satisfait suffit).
- `destinationOnly` : plateformes de téléportation, arrivée de la rivière Gerudo (on ne peut pas les prendre).
- `specialTag` boss_child / boss_adult : salles de boss ; leur sortie est le téléporteur bleu, calculée
  automatiquement (retour devant l'entrée qui mène au donjon dont on a franchi la porte de boss).

## Logique (js/logic.js, js/state.js)
- `store.settings` = une clé par entrée de `SETTINGS_DEF` (valeurs SoH : `'On'`/`'Off'`, `'Deku Only'`…) + `tricks`
  (`{ RT_…: bool }`). Tester les valeurs SoH exactes (`s.bossEntrances === 'Full'`), jamais des booléens.
- `isRandomized(exit, settings)` : sortie randomisée selon la configuration (détermine le mode `vanilla` vs le reste).
  `isDecoupled(s)` (entrées découplées), `isMixed(exit, s)` (type d'entrée inclus dans les pools mélangés via les
  options « Mix … »).
- `isUnlocked(exit, game)` : sortie à sens unique (spawn/chant) effectivement connaissable dans la partie en cours
  (spawn enfant/adulte avec l'âge correspondant accessible, chant avec Ocarina + chant appris). Tant que ce n'est
  pas le cas, la sortie est `isRandomized` mais pas éditable (mode `locked` dans `rowInfo`) : pas de liste
  déroulante tant que le joueur ne peut pas réellement connaître cette destination.
- `computeEff()` : cible effective de chaque sortie (mapping utilisateur, vanilla ou calcul boss). Se base sur
  `isRandomized` seul (pas `isUnlocked`) : une destination déjà notée reste connue même si l'état de la partie
  qui l'a débloquée est ensuite décoché.
- Entrées couplées par défaut : `setMapping(A, B)` écrit aussi `B → A` (sauf `settings.decoupled`, sens uniques, boss).
- Pools (`poolOf`) : les listes ne proposent que des destinations du même type, sauf `settings.mixedPools`.
  Hiboux, chants, spawns, rivière Gerudo = sens unique, ne consomment pas leur destination.
- `sat(requirement, game, age)` : les objets réservés à un âge exigent l'âge COURANT.
- Graphe sur les états (sortie, âge) : `makeEdges()` produit marche, transition, téléporteur bleu, hibou (enfant),
  chants, sauvegarder/recharger (entrée du donjon si on est dans un donjon, sinon spawn de l'âge),
  changement d'âge au Temple du Temps (`TOT`). `shortest()` = Dijkstra, `flood()` = zones atteignables.
- Coûts réglables dans `store.costs`.

## Débogage
`window.__PF` expose `store`, `effC`, `reachC`, `edgesC`, `shortest`, `candidatesFor`, `setMapping`, `EXIT`
pour tester dans la console du navigateur.
