# Cahier des charges fonctionnel — L'Œil Sheikah

Objectif : suivre l'inventaire complet d'une partie et calculer le chemin le plus court entre deux points,
sur une seed d'Ocarina of Time Randomizer avec Entrance Randomizer (ER), en notant la destination réelle
de chaque sortie.
Référence du rando : https://wiki.ootrandomizer.com/index.php?title=Entrance_Randomizer

> **Transition en cours vers Ship of Harkinian.** L'application migre progressivement de OoT Randomizer
> vers le randomizer de Ship of Harkinian (SoH) 9.2.3. Déjà alignés sur SoH : le panneau Objets et la
> Configuration (réglages et astuces de SoH). La logique d'accessibilité de `js/logic.js` et les données des
> Entrées/du Routeur restent celles d'OoT Randomizer, simplement branchées sur les réglages SoH équivalents
> (voir « Configuration > Correspondance avec Entrées et Routeur ») ; elles seront revues avec la liste
> des checks puis la logique SoH.

## Principes
- Application légère, 100 % navigateur, simple à installer, maintenir et déployer (hébergement statique).
- Sessions transparentes : sauvegarde automatique à chaque modification, reprise à l'ouverture.
- Export / import de la partie par copier-coller (texte JSON) pour changer de navigateur.
- Interface claire, graphique, en français, utilisable sur mobile.

## Navigation (panneau de gauche)
- Accès aux trois modules : Entrées (anciennement « Tracker », id `entrances`), Routeur, Configuration.
- Dans Entrées uniquement : tout déplier / tout replier, navigation rapide vers les zones, et filtres :
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
Réglages du randomizer de **Ship of Harkinian 9.2.3 « Ackbar Delta »**, repris de
`soh/soh/Enhancements/randomizer/settings.cpp` au commit `cb71e22` (celui indiqué dans les spoilers de
l'utilisateur ; ne pas se fier à la branche `develop`, qui a d'autres options). Données dans `js/config.js`
(`SETTINGS_DEF`, `TRICKS`, `CONFIG_TABS`).

- **Périmètre** : seulement les options qui changent la logique, les checks ou les objets suivis (163 sur
  231). Ignorées (`SETTINGS_IGNORED`) : prix et pondérations des boutiques, pestes Mojo et marchands,
  indices, pièges de glace, réserve d'objets, multiplicateur de dégâts, « All Locations Reachable », et les
  options sans case dans le menu de SoH (« Shuffle Entrances », calculée ; « Shuffle Chest Minigame », forcée
  à « Off » à la génération).
- **Valeurs** : stockées telles que dans SoH (ex. `'Deku Only'`, `'Dungeon rewards'`), défauts de SoH ;
  libellés affichés en français, nom SoH exact au survol de chaque option.
- **Onglets** (calqués sur le menu SoH) : Logique & accès (logique, âge de départ, accès aux zones, pont
  arc-en-ciel et Ganon, raccourcis), Entrées, Donjons (objets de donjon, récompenses, trousseaux, Master
  Quest), Mélanges (lieux, objets, capacités et langues, objets additionnels), Astuces, Routeur
  (coûts propres à l'appli : transition 3, chant 15, sauvegarder-recharger 25, changement d'âge 12).
  Onglet mémorisé (`ui.configTab`). Deux choix ou trois → boutons, au-delà → liste, compteurs → champ
  numérique.
- **Visibilité conditionnelle** (`show(s)`, reprise des `Hide()/Unhide()` de SoH) : ex. compteur du pont
  selon son type, nombre d'épreuves si « Nombre fixe », « Mix … » seulement si les pools mélangés sont actifs
  et que le type d'entrée correspondant l'est, sélection des donjons MQ, trousseaux par donjon si
  « Sélection ». Une carte sans option visible disparaît.
- **Astuces** : les 193 astuces de logique actives de SoH, groupées par zone, avec leur difficulté et leur
  quête (Vanilla / MQ / les deux) ; recherche, filtres difficulté et quête, « Tout cocher / décocher » par
  zone ; nombre d'astuces actives dans l'onglet. Stockées dans `settings.tricks` (clé `RT_…`).
- **Import depuis un spoiler SoH** (fichier `.json`) : lit **uniquement** `settings` et `enabledTricks`,
  jamais l'emplacement des objets. Signale les options ou valeurs inconnues et une version autre que 9.2.3 ;
  les options ignorées volontairement passent en silence. Résumé « N options, M astuces ».
- **Proposition d'import** : au premier chargement et après « Tout remettre à zéro » (nouvelle seed, la
  configuration étant conservée), une fenêtre propose d'importer un spoiler (même case « tirages du seed »),
  puis affiche le résumé. Elle revient à chaque chargement (`ui.spoilerPrompt`) tant qu'on n'a ni importé un
  spoiler (depuis cette fenêtre ou la Configuration) ni répondu « Non, merci » ; la fermer (croix, Échap) ne
  fait que la reporter au prochain chargement.
- **Tirages du seed à l'import** (case « Importer aussi les tirages du seed : donjons MQ et trousseaux (peut
  spoiler) », décochée par défaut, mémorisée dans `ui.importQuests`), seulement pour ce que la configuration
  laisse au hasard :
  - version des donjons : liste `masterQuestDungeons` du spoiler (absente s'il n'y a aucun donjon MQ) ;
  - trousseaux en « Aléatoire » / « Nombre » : SoH écrit le tirage réel dans les réglages par donjon du spoiler.
    Ces réglages sont toujours remis à leur valeur par défaut (sinon la Configuration révélerait le tirage) ; le
    tirage n'est gardé, dans la partie (`game.dungeons[id].keyRing` = 'yes'/'no'), que si la case est cochée.
    En « Sélection » + « Aléatoire » par donjon, le spoiler ne contient pas le résultat : reste inconnu.
  Case décochée : ces informations restent inconnues (ou ce que le joueur a noté).
- **Objets de départ** (« Start with… » : ocarina, bouclier Mojo, épées Kokiri et de Légende, bâtons, noix,
  haricots, 12 chants, symboles de Skulltula) : réglages stockés mais sans onglet (onglet `starting` marqué
  `hidden`) ; à l'import, ils sont cochés dans le panneau Objets (`applyStartingItems`), sans jamais
  diminuer ce que le joueur a déjà noté. Non repris : cœurs de départ, bourses pleines (rubis).
- Afficher en tête les incohérences détectées dans les données.

**Correspondance avec Entrées et Routeur** (logique OoT Randomizer conservée en attendant la logique SoH) :
entrées d'overworld, intérieurs (Simples / Tous), repaire, grottes, donjons (+ Ganon), boss (Par âge /
Complet), tour de Ganon (seulement si les boss sont mélangés), chants de téléportation, hiboux ; « points
d'apparition » couvre le spawn enfant et adulte ; la rivière de la Vallée Gerudo n'est jamais mélangée (absente
de SoH) ; pools mélangés : deux types s'échangent si leurs deux options « Mix … » sont actives.

**Panneau Objets piloté par la configuration** : capacités (une option par capacité), langues (« noix
Blabla »), touches d'ocarina, canne à pêche, Triforce (chasse ≠ Non, maximum = total de morceaux), bouton
« Clés des portes » (portes de l'overworld verrouillées), « Trous à haricots » (âmes de haricot), âme du
boss dans chaque bloc de donjon (âmes de boss), cases de donjon (ce qui est « Au départ » — carte et boussole, petites clés, clé de boss, clé de boss
de Ganon — reste affiché, plein et non cliquable, pour éviter oublis et erreurs : compteur « n/n », ou « ✓ »
si la version du donjon est inconnue ; pas de clés du Repaire si charpentiers libres, mais la Carte Gerudo
reste toujours) ; un cadre vide
disparaît, de même qu'un bloc de donjon vide (voir ci-dessous).

**Version des donjons (Vanilla / Master Quest)** : les 12 donjons (pas le Repaire des Voleurs) ont une version
qui change le nombre de petites clés attendues (et plus tard les checks et la logique). `configQuest` la déduit
de la configuration, comme SoH : « Aucun » → tous Vanilla ; « Sélection » → le choix par donjon (« Aléatoire »
→ inconnue) ; « Nombre fixe » à 0 ou 12 → tous Vanilla / tous MQ ; avec « Imposer certains donjons », les
donjons imposés sont fixés et ceux laissés au hasard le sont aussi si le nombre voulu est déjà atteint (tous
Vanilla) ou exige tous les candidats (tous MQ) ; sinon inconnue. La version est **toujours** affichée, en
badge dans le coin supérieur droit du cadre : « ? » (neutre, pointillés), « V » (rouge), « MQ » (bleu), pastille
pleine lisible sur toutes les teintes de donjon. Un donjon sans aucune case à suivre disparaît, sauf si sa
version reste à noter (tirée au sort) ; une rangée réduite à un seul donjon est centrée. Version tirée au sort : clic sur le cadre (hors cases carte, boussole, clés…) → version suivante
(« ? » → « V » → « MQ »), clic droit → précédente, stockée dans `game.dungeons[id].quest`. Version imposée par
la configuration : cadre non cliquable, infobulle « imposé par la configuration » ; tant qu'elle est inconnue, le compteur affiche « n/? » si
Vanilla et MQ diffèrent. Petites clés Vanilla / MQ (dungeon.cpp de SoH) : Puits 3/2, Gymnase 9/3, Forêt 5/6,
Feu 8/5, Eau 6/2, Ombre 5/6, Esprit 5/7, Château de Ganon 2/3. Repaire des Voleurs : 4 clés, 1 seule avec des
charpentiers « Rapides ».

**Trousseaux de clés** (Puits, Gymnase, Repaire, Forêt, Feu, Eau, Ombre, Esprit, Ganon) : un trousseau remplace
toutes les petites clés du donjon par un seul objet. Possible seulement si les petites clés sont mélangées (ni
« Vanilla » ni « Au départ ») ; pour le Repaire, charpentiers « Normal » et clés de la Forteresse mélangées.
`configKeyRing` : Non → aucun ; « Sélection » → Oui / Non par donjon, « Aléatoire » → inconnu ; « Nombre » à 0 →
aucun, au nombre de donjons possibles → tous ; « Aléatoire » ou autre nombre → inconnu. Dans le bloc du donjon :
trousseau → une case trousseau (obtenu ou non) à la place du compteur ; pas de trousseau → le compteur ;
inconnu → le compteur plus une case trousseau grisée. Déduction (`dungeonKeyRing`) : cocher le trousseau indique
que le donjon en a un (le compteur disparaît) ; noter une petite clé indique qu'il n'en a pas (la case trousseau
disparaît) ; revenir à 0 clé / décocher → de nouveau inconnu. Icône `icons/dungeons/keyring.png`.

**Clé squelette** (option « Skeleton Key ») : un seul objet, ajouté en plus des petites clés, qui ouvre toutes
les serrures de tous les donjons. Tuile `skeletonKey` (`icons/dungeons/skeleton_key.png`) à droite du Château de
Ganon dans la carte des donjons (seule sur une dernière rangée si le bloc de Ganon est masqué), visible
seulement si l'option est active. Obtenue : comme elle ouvre toutes les serrures à petite clé (donjons, Repaire,
portes de l'overworld — `SmallKeys` et `CanOpenOverworldDoor` dans logic.cpp de SoH), les compteurs de petites
clés, les trousseaux et le bouton « Clés des portes » disparaissent (les clés de boss restent) ; les blocs
devenus vides disparaissent aussi. `dungeonKeysDone` la compte comme toutes les clés obtenues.

## Âges et progression calculés
Aucun réglage manuel : tout se déduit de la Configuration et de l'inventaire (panneau Objets), comme dans
le vrai randomizer. Calculé dans `computeAges()` / `deriveGame()` (`js/logic.js`), lisible en lecture seule tout
en haut du panneau Objets (pastilles vertes/grises).
- **Âge de départ** (réglage Configuration, ou âge tiré si « Aléatoire ») : toujours acquis.
- **Autre âge** : acquis si le Temple du Temps (`market::templeoftime_to_templeplaza`) est atteignable dans
  l'âge de départ ET si la Porte du Temps peut s'ouvrir, selon le réglage SoH « Door of Time » :
  - Fermée (défaut, vanilla) : 3 Pierres Spirituelles + Ocarina du Temps + Chant du Temps.
  - Chant seul : Chant du Temps (n'importe quelle Ocarina).
  - Ouverte : aucune condition.
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
- **Pont/Carte Gerudo** : Carte Gerudo obtenue (objet manuel, la libération des charpentiers est une suite
  d'épreuves internes au repaire, hors du graphe de sorties), y compris avec des charpentiers « Libres ».

## Panneau Objets (droite)
Zone latérale droite, étroite (repliable sur mobile via un bouton dans la barre du haut), pas une page à
part. Les objets eux-mêmes (clé, `kind`, icône(s), paliers, max, visibilité, verrouillage) sont définis une
seule fois dans `ITEM_GROUPS` (`js/items.js`) — c'est la source de vérité utilisée par `defaults()` (clés de
sauvegarde) et par les helpers d'affichage. La mise en page du panneau est décrite séparément par
**`ITEMS_PAGE`** (aussi dans `js/items.js`), qui référence chaque objet par sa clé pour dire dans quel bloc
visuel il apparaît — `ITEMS_PAGE` ne redéfinit aucune métadonnée, il ne fait qu'organiser l'affichage.
`ITEM_BY_KEY` (map clé → objet + `path`) fait le lien entre les deux. Les tuiles n'affichent que l'icône
(pas de libellé visible) — le nom reste accessible au survol (`title`). Chaque section ci-dessous est une
carte distincte (`.panel-card`) qui se détache sur le fond du panneau. Règle visuelle commune : une icône est
grisée tant que l'objet n'est pas trouvé (tuile d'objet, case de donjon non cochée, compteur à 0) et en
couleur sinon ; un compteur « obtenus/total » (petites clés, échanges, clés des portes, haricots) passe en
doré une fois complet (`counterClass` dans `js/app.js`).

> **Catalogue orienté Ship of Harkinian.** Le contenu du panneau Objets (objets, donjons, check-lists) a été
> aligné sur le randomizer de Ship of Harkinian plutôt que sur OoT Randomizer (ER) — voir la remarque en
> tête de ce document. **La logique d'Entrées/Routeur/Configuration n'a pas encore été adaptée en
> conséquence** (réglages ER, pool de sorties, terminologie) : c'est un chantier séparé, à traiter
> globalement plus tard.

En tête de panneau : pastilles en lecture seule de l'état calculé plus haut (âges, Epona, raccourcis). Puis,
dans l'ordre :

1. **Quête** : les 6 Médaillons de donjon disposés en hexagone (positionnement CSS, pas d'image dessinée),
   Morceaux de Triforce au centre (visible seulement si « Chasse à la Triforce » est activée en
   Configuration ; plafond = nombre total de morceaux, pastille dorée dès le nombre requis atteint, comme
   dans SoH — infobulle « n (requis R, total T) ») ; à droite de l'hexagone, les 3 Pierres Spirituelles, puis,
   séparées par un trait, deux colonnes de tuiles d'objet cliquables : Double Défense, Réceptacles de Cœur,
   Quarts de Cœur / Magie (progressif : Simple → Double, puis Infinie seulement avec « Améliorations
   infinies »), Skulltulas d'Or, Greg (rubis vert : seulement si le pont arc-en-ciel est « Greg » ou si une
   option « Greg compte / Greg joker » est active pour le pont ou la clé de boss de Ganon ; icône
   `icons/rewards/greg.png`). Purement informatifs,
   sans effet sur le Routeur (sauf Magie ≥ 1, utilisée par `sat()`).
2. **Équipement**, sur toute la largeur (5 colonnes de tuiles de même taille) : quatre chaînes de tuiles
   reliées — Épée Kokiri → de Légende → Biggoron (3 objets distincts, pas un objet progressif — dans le jeu
   ce sont trois pickups différents, l'Épée Biggoron remplaçant le Couteau Cassé du Goron via une quête
   d'échange), Bouclier Mojo → Hylien → Miroir (idem), Bottes Kokiri → de Plomb → des Airs, Tunique
   Kokiri → Goron → Zora ; puis, après un séparateur pleine hauteur, les progressifs (Force : Bracelet Goron
   → Gantelets d'Argent → Gantelets d'Or et Écaille de Zora : Argent → Or, pastille de palier en chiffres
   romains ; Bourse : « Aucune » (grisée) seulement avec « Bourse enfant » mélangée, sinon 99 d'office, → 200
   → 500, puis 999 seulement avec l'option « Bourse de magnat », puis ∞ seulement avec « Améliorations
   infinies »).
3. **Inventaire**, en cadres d'une même teinte (celle du fond de l'hexagone des médaillons), deux par ligne (`ITEMS_PAGE.boxRows`) : Enfant (Bâton
   Mojo, Lance-Pierre, Boomerang) + Commun (Bombes, Missiles, Noix Mojo) ; Adulte (Grappin, Arc, Masse des
   Titans, avec les Flèches de Feu/Glace/Lumière en sous-rangée reliée) + Utilitaires (en 2×2 : Monocle de
   Vérité, Haricots Magiques, Pierre de Souffrance, Canne à Pêche — `cols:2`) ; Flacons (Bouteilles, Lettre
   de Ruto) + Sorts (Feu de Din, Vent de Farore, Amour de Nayru, Plume de Roc — seulement avec l'option « Plume
   de Roc », icône `icons/items/rocs_feather.png`). Objets à munitions, progressifs avec pastille de capacité et un
   palier « Infini » (∞) selon l'option « Améliorations infinies » : Bâton Mojo 10 → 20 → 30, Lance-Pierre et
   Arc 30 → 40 → 50, Bombes 20 → 30 → 40, Noix Mojo 20 → 30 → 40 (capacités de l'item tracker de SoH).
   Missiles selon l'option « Sac de missiles » : « Progressif » → 20 → 30 → 50 ; « Aucun » / « Un sac » →
   possédés ou non (pastille 50). « Non » : pas d'infini ; « Progressif » : ∞
   après le dernier palier ; « Condensé » : ∞ directement après le 1er palier (ex. Arc 30 → ∞). Missiles : ∞
   seulement avec des sacs de missiles progressifs. Les paliers atteignables viennent de `levels(settings)`
   (`itemLevels`) ; la valeur stockée reste l'indice dans `stages` (4 = infini pour les munitions). Un objet sous
   son premier palier atteignable y est remonté automatiquement (`raiseToFirstLevel`).
4. **Chants** (sans titre) : une rangée des 7 chants (Berceuse de Zelda, Chant d'Epona, Chant de Saria,
   Chant du Soleil, Chant du Temps, Chant des Tempêtes, Chant de l'Épouvantail), puis une rangée des 6 chants
   de téléportation (Menuet des Bois, Boléro du Feu, Sérénade de l'Eau, Requiem des Esprits, Nocturne de
   l'Ombre, Prélude de la Lumière) — mêmes tailles de tuile, même largeur totale (espacement réparti).
   Ensuite, dans un cadre de la même teinte que l'inventaire, sur une seule ligne : la tuile Ocarina
   progressive (Ocarina de Fée → Ocarina du Temps), un peu plus grande, puis les 5 notes dans l'ordre des
   hauteurs (A, C-Bas, C-Droite, C-Gauche, C-Haut), purement informatives : ne servent qu'à noter quelle note est jouée par quel bouton
   quand le réglage rando « mélanger les notes d'ocarina » est actif, non branchées à `sat()`).
5. **Objets d'échange** : deux boutons (`ITEMS_PAGE.tradeButtons`), Enfant (icône Masque de Vérité) et
   Adulte (icône Reçu), avec le compteur « obtenus/11 » (`tradeStats`). Chaque bouton ouvre une fenêtre de
   pointage (`modal` = `'trade-child'`/`'trade-adult'`) : les 11 objets sur 3 lignes, chaque ligne étant
   une sous-chaîne reliée par un trait (`ITEMS_PAGE.trade`), avec les mêmes clics que le reste du panneau
   (clic gauche = obtenu, clic droit = retiré). Enfant : Œuf Bizarre → Poule → Lettre de Zelda ; Masque de Keaton → Masque du Crâne → Masque
   Effrayant → Capuche de Lapin ; Masque Goron → Masque Zora → Masque Gerudo → Masque de Vérité. Adulte :
   Œuf de Poche → Cocotte de Poche (les deux objets de départ possibles, un seul existe réellement dans une
   seed donnée, mais les deux sont suivis au cas où) → Cojiro → Champignon Étrange ; Potion Étrange → Scie
   du Braconnier → Épée Cassée → Ordonnance ; Œil de Grenouille → Gouttes Oculaires → Reçu. En vanilla ces
   objets s'échangent l'un contre l'autre (le précédent disparaît), mais en rando chacun est un pickup
   placé séparément, trouvable dans n'importe quel ordre et jamais perdu : ce sont des bascules
   indépendantes.

Puis :

6. **Capacités et langues** (spécificité Ship of Harkinian, qui peut les mélanger dans le pool d'objets ;
   `ITEMS_PAGE.skills`), une ligne chacune : Nager, Grimper, Ramper, Ouvrir les coffres, Saisir ; puis Langue
   Kokiri, Mojo, Hylienne, Goron, Zora, Gerudo — des objets `bool` ordinaires d'`ITEM_GROUPS` (icônes
   attendues dans `icons/abilities/` et `icons/languages/`), purement informatifs pour l'instant (pas encore
   branchés à `sat()`). À droite, dans une carte étroite distincte (ces check-lists n'ont pas de lien
   logique avec les capacités/langues, seule la mise en page les rapproche ; `ITEMS_PAGE.checklistButtons`),
   les boutons carrés « Clés des portes » (option « Lock Overworld Doors »), « Trous à haricots » (option « Âmes
   de haricot »), chacun visible seulement si son option est active (carte masquée s'il n'en reste aucun) :
   compteur obtenu/total, cliquables pour
   ouvrir une modale de pointage — liste de lieux à cocher, 2 colonnes, clic gauche = coché, clic droit = décoché
   (`setChecklist`, `checklistStats` dans `js/state.js`). Catalogue des lieux dans `CHECKLISTS`
   (`js/items.js`). **Purement informatif pour l'instant** : pas encore branché au Routeur (voir encadré
   ci-dessus) — l'intention à terme est qu'un trou à haricot plante une connexion fixe dans le graphe, et
   qu'un lieu « Clés des portes » coché débloque l'accès à ce qu'il y a derrière la porte, mais les
   correspondances lieu → connexion restent à spécifier.
7. **Donjons**, sans titre : un bloc par donjon (nom complet + ses cases sur une ligne), deux par ligne,
   dans l'ordre de `ITEMS_PAGE.dungeons.rows` : Arbre Mojo – Caverne Dodongo ; Ventre de Jabu-Jabu – Fond du
   Puits ; Gymnase Gerudo – Repaire des Voleurs ; Forêt – Feu ; Eau – Ombre ; Esprit – Caverne de Glace ;
   puis Château de Ganon seul en dernier, centré à la largeur normale, comme donjon final. Chaque bloc est
   teinté à la couleur du thème de son donjon (`color` dans `DUNGEONS` : bordure pleine, fond atténué). Tous
   les blocs ont la même hauteur (titre + 2 lignes de cases) : 1re ligne carte, boussole et âme du boss (option
   « Âmes de boss » : les 8 donjons à boss, plus le Château de Ganon en « Oui + Ganon » ; `boss` dans `DUNGEONS`,
   icône `icons/dungeons/boss_soul.png`, infobulle « Âme de <boss> »), 2e ligne toutes les
   clés (petites clés ou trousseau, clé de boss, Carte Gerudo pour le Repaire) ; une ligne sans case disparaît
   et ce qui reste est centré verticalement. Chaque bloc n'affiche que ce que le donjon possède : carte,
   boussole, petites clés (compteur, clic augmente/diminue), clé de boss (la Caverne de Glace n'a ni petites
   clés ni clé de boss) — voir
   `DUNGEONS`/`DUNGEON_BY_ID` dans
   `js/items.js`, mutations `setDungeonFlag`/`addDungeonKeys` dans `js/state.js`). **Purement informatif
   pour l'instant**, comme les check-lists ci-dessus — petites clés attendues `maxKeys` (Vanilla) / `mqKeys`
   (MQ) selon la version du donjon (pastille à côté du nom, voir Configuration > Version des donjons). Exception : la Carte Gerudo (objet `gerudoCard`
   d'`ITEM_GROUPS`, déjà utilisé par la logique) est affichée sous les petites clés du Repaire, à la manière
   d'une clé de boss (champ `card` du donjon dans `DUNGEONS`), clic gauche = obtenue, clic droit = retirée.

Chaque objet est une tuile d'icône, absente du dépôt (à fournir par l'utilisateur, repli sur une icône
générique si le fichier manque). Convention par défaut, calculée par `iconSrc()` (`js/state.js`), tous les
chemins étant relatifs à `icons/` :
- `bool` / `count` : une seule image `items/<clé>.png` (ex. `items/truthLens.png`).
- `level` **sans** `sizes` (le modèle change visuellement d'un palier à l'autre) : une image par palier non
  nul `items/<clé>_<palier>.png` (ex. `items/strength_1.png` = Bracelet Goron, `items/strength_2.png` =
  Gantelets d'Argent, `items/strength_3.png` = Gantelets d'Or). Le palier 0 réutilise l'image du palier 1,
  grisée (aucun sprite « vide » à fournir).
- `level` **avec** `sizes` (seule la capacité change, pas le modèle — Arc, Lance-Pierre, Bâton Mojo, Noix
  Mojo, Bombes, Bourse) : une seule image `items/<clé>.png`, quel que soit le palier ; le palier courant
  s'affiche via une pastille numérique (`sizes[palier]`, ex. « 10 »/« 20 »/« 30 » pour le Bâton Mojo),
  masquée si `sizes[palier]` est une chaîne vide (palier 0 = non obtenu pour tout sauf la Bourse, qui a
  toujours au moins la bourse de base : `sizes[0] = '99'`).

Liste exacte des fichiers attendus par défaut : reproductible depuis `ITEM_GROUPS` dans `js/items.js` — un
item `kind:'bool'`/`'count'`, ou `level` avec `sizes` → `<clé>.png` ; un item `level` sans `sizes`, avec N
paliers → `<clé>_1.png` à `<clé>_N.png`.

**Chemin personnalisé** : pour ranger les icônes autrement que par la convention plate ci-dessus (ex. les
regrouper par thème), ajouter directement dans la définition de l'objet, en `ITEM_GROUPS` :
- `icon:'<chemin>'` sur un item `bool`/`count`, ou `level` avec `sizes` (ex. `icon:'rewards/stones/forest.png'`
  pour l'Émeraude Kokiri, plutôt que `items/kokiriEmerald.png`).
- `icons:['<chemin_palier_1>','<chemin_palier_2>', ...]` sur un item `level` **sans** `sizes` (un chemin par
  palier non nul, même ordre que `stages`).
Chemins toujours relatifs à `icons/`. Aucune autre modification nécessaire : `iconSrc()` bascule
automatiquement sur le chemin personnalisé dès qu'il est présent, sinon retombe sur la convention par
défaut ci-dessus.

Contrôle, via clic gauche (augmenter/activer) et clic droit (diminuer/désactiver), sans jamais boucler — règle
commune à toutes les icônes du panneau (tuiles, cases de donjon, trousseau, Carte Gerudo, lignes des
check-lists ; seule exception, la version V/MQ d'un donjon, qui tourne : gauche = suivante, droite = précédente) :
un objet déjà au maximum (ou déjà obtenu s'il n'est pas progressif) ignore le clic gauche, un objet non
obtenu ignore le clic droit.
- `bool` : activé / désactivé.
- `level` : avance d'un palier au clic gauche, jusqu'au dernier ; recule au clic droit, jusqu'à 0.
- `count` : ±1 au clic (±10 avec Majuscule), borné à `[0, max]` (`max` peut dépendre d'un réglage
  Configuration, ex. Morceaux de Triforce ; `goal(settings)` facultatif = seuil de la pastille dorée).

Pastille grise tant que l'objet n'a pas atteint son maximum, dorée une fois au maximum (`itemMaxed()`) —
ex. Skulltulas d'Or : grise jusqu'à 99, dorée à 100 ; Arc : grise à 30/40, dorée à 50.

Visibilité conditionnelle : un objet peut définir `visible(settings)` dans `ITEM_GROUPS` pour n'apparaître
que sous certaines conditions de Configuration (ex. Morceaux de Triforce, capacités, langues, Greg, Plume de
Roc).

Objet verrouillé (`locked:true`, uniquement pour `bool`) : toujours affiché comme possédé, la tuile ignore
les clics — pour l'équipement de départ jamais réellement « obtenu » en jeu (Tunique Kokiri, Bottes Kokiri).

Palier de base toujours possédé (`neverEmpty:true`, uniquement pour `level`) : le palier 0 n'est pas
« aucun » mais un objet réellement possédé (ex. Bourse : palier de base à 99 rubis) — jamais affiché grisé,
mais reste augmentable/diminuable normalement (contrairement à `locked`, sans plancher artificiel puisque
le palier 0 est déjà le minimum réel).

Les objets à paliers sont aplatis en indicateurs booléens (`deriveGame()` dans `js/logic.js`) avant d'être
passés à `sat()` : ex. Force ≥ 1 → Bracelet Goron, ≥ 2 → Gantelets d'Argent, ≥ 3 → Gantelets d'Or ; Magie
≥ 1 → magie disponible ; Ocarina ≥ 1 → ocarina possédée ; Bouteilles ≥ 1 → a une bouteille ; Bâton Mojo
≥ 1 → bâtons disponibles. Seuls les objets déjà utilisés par `REQUIREMENTS`/`sat()` avant cet ajout
conditionnent Entrées/Routeur ; tout le reste (Récompenses hors Pierres Spirituelles, armes enfant/
adulte/communes hors force/bombes/missiles/arc/grappin/bâtons, Statistiques, notes d'ocarina, chants hors
ceux déjà câblés) est purement informatif pour l'instant — cf. `SilverScale`/`GoronBracelet`/etc. dans
`REQUIREMENTS` pour la liste exacte de ce qui compte pour la logique.
- Les conditions portent sur chaque couple de sorties d'une zone, pas sur la zone entière.

## Entrées
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
