# Cahier des charges fonctionnel

Objectif : aider à parcourir une seed d'Ocarina of Time Randomizer avec Entrance Randomizer (ER),
en notant la destination réelle de chaque sortie et en calculant le chemin le plus court entre deux points.
Référence du rando : https://wiki.ootrandomizer.com/index.php?title=Entrance_Randomizer

## Principes
- Application légère, 100 % navigateur, simple à installer, maintenir et déployer (hébergement statique).
- Sessions transparentes : sauvegarde automatique à chaque modification, reprise à l'ouverture.
- Export / import de la partie par copier-coller (texte JSON) pour changer de navigateur.
- Interface claire, graphique, en français, utilisable sur mobile.

## Navigation (panneau de gauche)
- Accès aux trois modules : Tracker, Routeur, Configuration.
- Dans le Tracker uniquement : tout déplier / tout replier, navigation rapide vers les zones, et filtres :
  - Proposer les destinations déjà atteignables ou déjà mappées dans les listes : OFF par défaut.
    Une destination déjà mappée (déjà la cible d'une autre sortie, y compris pour les sorties à sens
    unique — hiboux, chants, spawns, rivière Gerudo — qui ne « consomment » pas leur cible) est traitée
    comme une destination atteignable : masquée si OFF, affichée en grisé avec la mention « Atteignable »
    si ON.
  - Afficher les zones non atteintes (aucun chemin connu n'y mène) : OFF par défaut.
  - Afficher les sorties découvertes : ON par défaut.
  - Afficher les sorties non randomisées : ON par défaut.
- Bouton rouge « Tout remettre à zéro », avec confirmation : efface destinations et état de la partie,
  conserve la configuration.

## Configuration
Bloc Progression (voir « Âges et progression calculés » ci-dessous) : âge de départ (Enfant / Adulte),
Porte du Temps (6 variantes, cf. réglage officiel `open_door_of_time`).
Bloc Monde : overworld (Vanilla / Aléatoires), intérieurs (Vanilla / Simples / Tous — « Tous » ajoute moulin,
Temple du Temps, maison de Link, apothicaire, tombe d'Igor), grottes (Vanilla / Aléatoires),
rivière de la Vallée Gerudo (Vanilla / Aléatoire).
Bloc Donjons et boss : donjons (Vanilla / Donjons / Donjons + Ganon), boss (Vanilla / Par âge / Complet),
entrée de la Tour de Ganon (Vanilla / Aléatoire), sorties du repaire Gerudo (Vanilla / Aléatoires, ER),
Forteresse Gerudo — gardiens à libérer (4 « normal » / 1 « rapide » / Ouverte, cf. réglage officiel
`gerudo_fortress` — distinct du précédent : celui-ci fixe la condition d'obtention de la Carte Gerudo).
Bloc Apparitions et téléportations : spawns (Aucun / Enfant / Adulte / Tous), chants (Vanilla / Aléatoires),
hiboux (Vanilla / Aléatoires).
Bloc Avancé : entrées découplées (Non par défaut), pools mélangés (Non par défaut),
Chasse à la Triforce (Non par défaut — ajoute le compteur « Morceaux de Triforce » dans le panneau Objets
avec un objectif réglable, 20 par défaut), coûts du routeur (transition 3, chant 15, sauvegarder-recharger
25, changement d'âge 12).
Afficher en tête les incohérences détectées dans les données.

## Âges et progression calculés
Aucun réglage manuel : tout se déduit de la Configuration et de l'inventaire (panneau Objets), comme dans
le vrai randomizer. Calculé dans `computeAges()` / `deriveGame()` (`app.js`), lisible en lecture seule tout
en haut du panneau Objets (pastilles vertes/grises).
- **Âge de départ** (réglage Configuration) : toujours acquis.
- **Autre âge** : acquis si le Temple du Temps (`market::templeoftime_to_templeplaza`) est atteignable dans
  l'âge de départ ET si la Porte du Temps peut s'ouvrir, selon le réglage `openDoorOfTime` — reproduit le
  helper `can_open_door_of_time` du randomizer officiel :
  - `stones_sot` (défaut, fermeture vanilla) : 3 Pierres Spirituelles + Chant du Temps.
  - `stones` : 3 Pierres Spirituelles seules. `sot` : Chant du Temps seul (n'importe quelle Ocarina).
  - `stones_oot_sot` / `oot_sot` : idem + Ocarina du Temps (palier 2, pas juste l'Ocarina de Fée).
  - `open` : aucune condition.
  Calcul sans dépendance circulaire : une recherche d'atteignabilité dédiée part du spawn de l'âge de
  départ avec « l'autre âge » provisoirement marqué indisponible.
- **Epona** : reproduit l'event `Epona` du randomizer (`can_play(Eponas_Song) and is_adult`) → Ocarina
  (n'importe lequel) + Chant d'Epona appris (le jour n'est pas modélisé).
- **Raccourci Bois Perdus ↔ Ville Goron** : reproduit l'event `GC Woods Warp Open` (mur à détruire côté
  Ville Goron) → explosifs (Bombes/Missiles), Feu de Din, Arc (adulte) ou Force (palier ≥ 1) suffisent,
  une seule fois (état persistant, jamais reperdu — les objets ne se perdent pas dans ce tracker).
- **Raccourci du Cratère du Péril** : simplification (le graphe de zones de cette appli compresse les
  nombreuses sous-régions du Cratère du jeu réel) → explosifs (Bombes ou Missiles) suffisent, de façon
  persistante. Les alternatives Grappin/Bottes des Airs restent gérées séparément dans les connexions
  (`areas-data.js`), indépendamment de ce raccourci.
- **Pont/Carte Gerudo** : reproduit `gerudo_fortress == 'open' or can_finish_GerudoFortress` → Carte
  Gerudo obtenue (objet manuel, la libération des charpentiers est une suite d'épreuves internes au
  repaire, hors du graphe de sorties) OU réglage Forteresse Gerudo sur « Ouverte ».

## Panneau Objets (droite)
Zone latérale droite (repliable sur mobile via un bouton dans la barre du haut), pastille = nombre d'objets
possédés (tous groupes confondus, hors objets masqués — voir « visibilité conditionnelle » plus bas). En
tête : pastilles en lecture seule de l'état calculé plus haut (âges, Epona, raccourcis). En dessous,
l'inventaire complet de la partie en cours, groupé comme dans `ITEM_GROUPS` (`app.js`) — chaque catégorie
est un titre cliquable repliable (chevron, état conservé en session) :

1. **Récompenses** : 3 Pierres Spirituelles, 6 Médaillons de donjon, Morceaux de Triforce (visible
   seulement si « Chasse à la Triforce » est activée en Configuration ; plafond = réglage associé).
2. **Équipement** : Épée Kokiri / de Légende / Biggoron (3 objets distincts, pas un objet progressif —
   dans le jeu ce sont trois pickups différents, l'Épée Biggoron remplaçant le Couteau Cassé du Goron via
   une quête d'échange), Bouclier Mojo / Hylien / Miroir (3 objets distincts, idem), Bottes Kokiri / de
   Plomb / des Airs, Tunique Goron / Zora, Force (progressif : Bracelet Goron → Gantelets d'Argent →
   Gantelets d'Or), Écaille de Zora (progressif : Argent → Or), Bourse (progressif : 99 → 200 → 500 → 999),
   Skulltulas d'Or (compteur 0–100), Pass Gerudo, Pierre de Souffrance.
3. **Armes enfant** : Bâton Mojo (progressif : capacité 10 → 20 → 30), Lance-Pierre (progressif :
   30 → 40 → 50), Boomerang.
4. **Armes adulte** : Arc (progressif : capacité 30 → 40 → 50), Grappin (progressif : Grappin →
   Super-Grappin), Masse des Titans, Flèches de Feu / de Glace / de Lumière.
5. **Armes communes** : Noix Mojo (progressif : capacité 20 → 30 → 40), Bombes (progressif :
   capacité 30 → 40 → 50), Missiles.
6. **Objets** : Haricots Magiques, Monocle de Vérité, Bouteilles (compteur 0–4), Lettre de Ruto.
7. **Magie** : Feu de Din, Vent de Farore, Amour de Nayru.
8. **Ocarina** : progressif (Ocarina de Fée → Ocarina du Temps).
9. **Notes d'Ocarina (si mélangées)** : 5 bascules (bouton A, C-Haut, C-Droite, C-Gauche, C-Bas), purement
   informatives — ne servent qu'à noter quelle note est jouée par quel bouton quand le réglage rando
   « mélanger les notes d'ocarina » est actif ; non branchées à `sat()` (les chants restent suivis comme
   des booléens « appris/pas appris », indépendamment du bouton physique).
10. **Statistiques** : Magie (progressif : Simple → Double), Quarts de Cœur (compteur 0–36), Réceptacles
    de Cœur (compteur 0–8), Double Défense — purement informatifs, sans effet sur le routeur.
11. **Chants appris** : Berceuse de Zelda, Chant d'Epona, Chant de Saria, Chant du Soleil, Chant du Temps,
    Chant des Tempêtes, Chant de l'Épouvantail.
12. **Chants de téléportation** : Menuet des Bois, Boléro du Feu, Sérénade de l'Eau, Requiem des Esprits,
    Nocturne de l'Ombre, Prélude de la Lumière.

Chaque objet est une tuile d'icône, absente du dépôt (à fournir par l'utilisateur, repli sur une icône
générique si le fichier manque). Convention par défaut, calculée par `iconSrc()` (`app.js`), tous les
chemins étant relatifs à `icons/` :
- `bool` / `count` : une seule image `items/<clé>.png` (ex. `items/truthLens.png`).
- `level` : une image par palier non nul `items/<clé>_<palier>.png` (ex. `items/strength_1.png` = Bracelet
  Goron, `items/strength_2.png` = Gantelets d'Argent, `items/strength_3.png` = Gantelets d'Or). Le palier 0
  réutilise l'image du palier 1, grisée (aucun sprite « vide » à fournir). Liste exacte des fichiers
  attendus par défaut : reproductible depuis `ITEM_GROUPS` dans `app.js` (un item `kind:'level'` avec N
  paliers → `<clé>_1.png` à `<clé>_N.png` ; tout item `kind:'bool'`/`'count'` → `<clé>.png`).

**Chemin personnalisé** : pour ranger les icônes autrement que par la convention plate ci-dessus (ex. les
regrouper par thème), ajouter directement dans la définition de l'objet, en `ITEM_GROUPS` :
- `icon:'<chemin>'` sur un item `bool`/`count` (ex. `icon:'rewards/stones/forest.png'` pour l'Émeraude
  Kokiri, plutôt que `items/kokiriEmerald.png`).
- `icons:['<chemin_palier_1>','<chemin_palier_2>', ...]` sur un item `level` (un chemin par palier non
  nul, même ordre que `stages`).
Chemins toujours relatifs à `icons/`. Aucune autre modification nécessaire : `iconSrc()` bascule
automatiquement sur le chemin personnalisé dès qu'il est présent, sinon retombe sur la convention par
défaut ci-dessus.

Contrôle, via clic gauche (augmenter/activer) et clic droit (diminuer/désactiver) :
- `bool` : bascule simple.
- `level` : avance d'un palier au clic gauche (retour à 0 après le dernier) ; recule au clic droit.
- `count` : ±1 au clic (±10 avec Majuscule), borné à `[0, max]` (`max` peut dépendre d'un réglage
  Configuration, ex. Morceaux de Triforce).

Visibilité conditionnelle : un objet peut définir `visible(settings)` dans `ITEM_GROUPS` pour n'apparaître
que sous certaines conditions de Configuration (seul cas actuel : Morceaux de Triforce).

Les objets à paliers sont aplatis en indicateurs booléens (`deriveGame()` dans `app.js`) avant d'être
passés à `sat()` : ex. Force ≥ 1 → Bracelet Goron, ≥ 2 → Gantelets d'Argent, ≥ 3 → Gantelets d'Or ; Magie
≥ 1 → magie disponible ; Ocarina ≥ 1 → ocarina possédée ; Bouteilles ≥ 1 → a une bouteille ; Bâton Mojo
≥ 1 → bâtons disponibles. Seuls les objets déjà utilisés par `REQUIREMENTS`/`sat()` avant cet ajout
conditionnent le Tracker/Routeur ; tout le reste (Récompenses hors Pierres Spirituelles, armes enfant/
adulte/communes hors force/bombes/missiles/arc/grappin/bâtons, Statistiques, notes d'ocarina, chants hors
ceux déjà câblés) est purement informatif pour l'instant — cf. `SilverScale`/`GoronBracelet`/etc. dans
`REQUIREMENTS` pour la liste exacte de ce qui compte pour la logique.
- Les conditions portent sur chaque couple de sorties d'une zone, pas sur la zone entière.

## Tracker
Une carte dépliable par zone, avec progression (sorties renseignées / randomisées). Une ligne par sortie :
1. Icône du type (extérieur, intérieur, grotte, donjon, boss, hibou, téléportation, spawn).
2. Globe : au survol, liste des sorties atteignables à pied dans la même zone, avec coût ;
   en noir si accessible avec l'état actuel, en rouge sinon avec la condition. Grisé si aucune connexion.
3. Nom de la sortie.
4. « Accessible depuis » : zone et sortie qui mènent ici (plusieurs possibles, ex. chant + entrée).
   Colonne masquée si les entrées découplées ne sont pas activées : la provenance est alors
   identique à la destination (colonne 5 renommée « Sortie associée » dans ce cas).
5. « Va vers » (« Sortie associée » si entrées découplées désactivées) :
   - non randomisée : destination vanilla ;
   - randomisée mais pas encore débloquée dans la partie (spawn dont l'âge n'est pas encore accessible,
     chant dont l'Ocarina ou le chant lui-même ne sont pas encore appris) : message indiquant la condition
     de déblocage, pas de liste déroulante ;
   - randomisée, débloquée et non renseignée : liste déroulante avec filtre texte, groupée par zone,
     ne proposant que les destinations libres et du même type (sauf pools mélangés) ;
   - randomisée et renseignée : destination choisie.
   Cliquer une destination ou une provenance fait défiler vers la ligne correspondante.
6. Indicateur à droite : « V » si vanilla ; rien si à renseigner (la liste occupe l'espace) ;
   croix pour effacer si renseignée ; « A » si calculée automatiquement (téléporteur bleu) ;
   « ? » si randomisée mais pas encore débloquée (survol : condition de déblocage).

Règles :
- Entrées couplées par défaut : noter A → B renseigne aussi B → A. Effacer l'une efface l'autre.
- Spawns, chants, hiboux, rivière Gerudo : sorties à sens unique ; on ne peut pas y « entrer ».
  Leur destination s'ajoute aux entrées existantes sans la consommer.
- Spawn enfant/adulte et chants de téléportation : non éditables tant qu'ils ne sont pas débloqués dans la
  partie (spawn → âge correspondant accessible ; chant → Ocarina et ce chant appris), pour éviter de noter
  une destination qu'on ne peut pas encore réellement connaître. Une destination déjà notée avant un
  décochage reste conservée (juste masquée le temps que la condition redevienne vraie).
- Plateformes de téléportation (destinationOnly) : on peut y arriver, pas les prendre ; non affichées comme lignes.
- Téléporteurs bleus : non éditables ; ils ramènent devant l'entrée qui mène au donjon
  dont on a franchi la porte de boss.
- Convention des libellés : une sortie désigne l'endroit où l'on se trouve. « Maison de Mido » est côté forêt
  (la porte) ; la prendre mène à « Sortie de la maison de Mido », à l'intérieur.

## Routeur
- Départ : zone, sortie, âge (Enfant / Adulte ; jamais « peu importe »).
- Arrivée : zone, sortie, âge (Enfant / Adulte / Peu importe). Bouton pour inverser départ et arrivée.
- Calcul automatique dès que départ et arrivée sont choisis (pas de bouton).
- Le chemin peut combiner : marche dans une zone (selon conditions et âge courant), transitions,
  chants de téléportation (ocarina + chant connus), vol du hibou (enfant), téléporteurs bleus,
  sauvegarder-recharger (retour au spawn de l'âge ; à l'entrée du donjon si on est dans un donjon),
  changement d'âge au Temple du Temps.
- Un changement d'âge peut être choisi même s'il n'est pas imposé, s'il raccourcit le trajet
  (ex. pour profiter du spawn de l'autre âge).
- Affichage vertical : cartes de sorties reliées par des étiquettes (type de déplacement, coût, objets utilisés),
  bandeau dédié pour chaque changement d'âge, résumé (coût total, transitions, chants, rechargements, changements d'âge).
- Si aucun chemin : expliquer les causes possibles (sorties non découvertes, objet ou âge manquant).
