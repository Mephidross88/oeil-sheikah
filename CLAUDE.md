# L'Œil Sheikah

Tracker d'objets et routeur d'entrées pour Ocarina of Time Randomizer (Entrance Randomizer, ER).
Application 100 % client, sans build : ouvrir `index.html` dans un navigateur suffit.
Interface et textes en français.
Le comportement attendu est décrit dans `SPEC.md` : le lire avant toute évolution fonctionnelle,
et le mettre à jour quand une règle change.

## Fichiers
- `index.html` : squelette, charge Vue 3 (CDN jsDelivr, build global), puis `areas-data.js`, puis les fichiers
  de `js/` **dans l'ordre listé ci-dessous** (scripts classiques, pas de modules ES : chaque fichier partage
  le même scope global de haut niveau, comme s'il s'agissait d'un seul fichier — un `const`/`function` déclaré
  dans un fichier est directement utilisable dans les suivants ; ne pas redéclarer un identifiant existant).
  1. `js/icons.js` : destructuration de l'API Vue globale, icônes SVG inline (`ICONS`), icônes de types de
     sortie personnalisables (`CUSTOM_ICONS`), libellés de types (`TYPE_LABEL`).
  2. `js/data.js` : transforme `window.AREAS_DATA` (fourni par `areas-data.js`) en structures internes
     (`AREAS`, `AREA`, `EXIT`, `ALL_EXITS`, `BOSS_ROOMS`/`BOSS_DOORS`, etc.).
  3. `js/logic.js` : toute la logique pure (sans Vue) — conditions (`sat`, `REQUIREMENTS`), dérivation de
     l'inventaire (`deriveGame`, `canOpenDoorOfTime`), pools de randomisation, `computeEff`, graphe de
     déplacement (`makeEdges`, `flood`, `computeAges`), `shortest` (Dijkstra).
  4. `js/items.js` : `ITEM_GROUPS` (catalogue du panneau Objets) et ses helpers (`itemMax`, `itemVisible`).
  5. `js/state.js` : persistance (`defaults`, `merge`, `load`, `store`, sauvegarde auto), les `computed`
     dérivés au niveau module (`effC`, `agesC`, `gameC`, `edgesC`, `reachC`), et les mutations du mapping
     (`setMapping`, `clearMapping`, `candidatesFor`).
  6. `js/components.js` : composants Vue réutilisables (`TypeIcon`, `Seg`, `DestPicker`).
  7. `js/app.js` : le composant racine `App` (template complet) + `createApp(...).mount('#app')`.
- `style.css` : styles, variables de thème dans `:root` (clair + sombre).
- `areas-data.js` : données (`window.AREAS_DATA`). Gros fichier : ne le lire que si la tâche porte sur les données.
- `icons/` : images. `icons/exits/` (types de sortie), `icons/items/` (convention par défaut du panneau
  Objets) et `icons/rewards/...` (chemins personnalisés d'exemple) — voir SPEC.md > Panneau Objets pour la
  convention de nommage et comment personnaliser un chemin par objet (`icon`/`icons` dans `ITEM_GROUPS`).

## Contraintes
- Pas d'outil de build, pas de modules ES, pas de dépendance hors CDN. Doit marcher en `file://`.
  La séparation en plusieurs fichiers dans `js/` reste de simples `<script>` classiques : ne jamais y
  introduire `import`/`export`, ni changer l'ordre de chargement dans `index.html` sans vérifier les
  dépendances (un fichier ne peut utiliser que ce qui est déclaré dans un fichier chargé avant lui).
- Sauvegarde automatique dans `localStorage` (clé `ootr-pathfinder-v1`) à chaque changement de `store`.
  Tout nouveau champ persistant doit avoir une valeur dans `defaults()` (fusion via `merge()` au chargement).

## Modèle de données
- Zone : `{ id, name, exits[] }`. Sortie : `{ id, label, type, shuffleTag, vanillaTargetExitId, connections?, destinationOnly?, specialTag? }`.
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
- `isRandomized(exit, settings)` : sortie randomisée selon la configuration (détermine le mode `vanilla` vs le reste).
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
