# Génération de `checks-data.js`

Scripts Node (≥ 18) lancés à la main pour régénérer la liste des checks à partir des sources de
Ship of Harkinian. Ils ne sont jamais chargés par l'application.

```sh
cd tools/soh-checks
node fetch_sources.mjs cb71e22   # sources SoH du commit voulu -> ./src (ignoré par Git)
node extract_checks.mjs          # -> checks_raw.json (checks, zones, régions de logique ; ignoré par Git)
node gen_checks.mjs              # -> ../../checks-data.js (libellés français via translate.mjs)
```

- `extract_checks.mjs` : lit `location_list.cpp`, `fishsanity.cpp`, `Shuffle*.cpp` (métadonnées : type,
  version Vanilla/MQ, zone, nom court et nom du spoiler) et `location_access/**` (région de logique de chaque
  check).
- `translate.mjs` : traduction française des noms courts. `FULL` = noms traduits à la main ; sinon règles
  (objet en tête, qualificatifs accordés, lieu avec articles) à partir des tables `W` (mots) et `PHRASES`
  (expressions). Pour corriger un libellé : ajouter une entrée dans `FULL`, ou compléter `W` / `PHRASES`
  si la correction vaut pour plusieurs checks, puis relancer `gen_checks.mjs`.
- `gen_checks.mjs` : écarte les checks jamais affichés par le tracker de SoH (indices, coffres intermédiaires
  de la chasse au trésor…), ajoute les libellés français des zones et écrit le fichier.

Après une montée de version de SoH : relancer les trois scripts avec le nouveau commit, puis vérifier
`js/checks.js` (règles d'affichage reprises de `IsCheckShuffled` dans `randomizer_check_tracker.cpp`) et
`js/config.js` (noms et valeurs des options).
