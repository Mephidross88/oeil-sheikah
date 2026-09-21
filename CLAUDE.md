# Pathfinder d'Hyrule

Tracker et routeur d'entrées pour Ocarina of Time Randomizer (Entrance Randomizer).
Application 100 % client, sans build : ouvrir `index.html` dans un navigateur suffit.
Interface et textes en français.
Le comportement attendu est décrit dans `SPEC.md` : le lire avant toute évolution fonctionnelle,
et le mettre à jour quand une règle change.

## Fichiers
- `index.html` : squelette, charge Vue 3 (CDN jsDelivr, build global), puis `areas-data.js`, puis `app.js`.
- `app.js` : toute la logique et les composants Vue (templates en chaînes, pas de SFC).
- `style.css` : styles, variables de thème dans `:root` (clair + sombre).
- `areas-data.js` : données (`window.AREAS_DATA`). Gros fichier : ne le lire que si la tâche porte sur les données.

## Contraintes
- Pas d'outil de build, pas de modules ES, pas de dépendance hors CDN. Doit marcher en `file://`.
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

## Logique (app.js)
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
