# Cahier des charges fonctionnel — L'Œil Sheikah

Objectif : suivre l'inventaire complet d'une partie et calculer le chemin le plus court entre deux points,
sur une seed d'Ocarina of Time Randomizer avec Entrance Randomizer (ER), en notant la destination réelle
de chaque sortie.
Référence du rando : https://wiki.ootrandomizer.com/index.php?title=Entrance_Randomizer

> **Transition en cours vers Ship of Harkinian.** L'application migre progressivement de OoT Randomizer
> vers le randomizer de Ship of Harkinian (SoH) 9.2.3. Déjà alignés sur SoH : le panneau Objets, la
> Configuration (réglages et astuces de SoH), la liste des Checks et la page Entrées, dont les destinations notées
> alimentent la logique de SoH (voir « Logique Ship of Harkinian »), et le Routeur, qui suit la logique de SoH. Reste
> d'OoT Randomizer : les coûts de marche de `areas-data.js` (connexions à pied entre sorties d'une zone), utilisés
> par le Routeur pour estimer les trajets.

## Principes
- Application légère, 100 % navigateur, simple à installer, maintenir et déployer (hébergement statique).
- Sessions transparentes : sauvegarde automatique à chaque modification, reprise à l'ouverture.
- Export / import de la partie par copier-coller (texte JSON) pour changer de navigateur.
- Interface claire, graphique, en français, utilisable sur mobile.

## Progression globale (en tête de toutes les pages)
Bande de deux cadres de progression (composant `ProgressCard`) au-dessus du titre de chaque page : **Checks** et,
dès qu'au moins une sortie est randomisée, **Entrées**. Chaque cadre : titre, anneau de pourcentage, « faits /
total », restants, zones terminées, détail par groupe (voir Checks et Entrées ci-dessous) ; cliquable pour ouvrir
la page correspondante, souligné quand on y est. Côte à côte, empilés sur mobile.

## Navigation (panneau de gauche)
- Pages du menu, en groupes titrés : **Progression** (la partie en cours) : Checks, Routeur, Entrées (id `entrances`),
  Indices ;
  **Aperçus** (vues d'ensemble) : Carte, Connexions, Statistiques ; puis Configuration à part, sous un trait. Barre
  réduite à des icônes : les titres de groupe deviennent des traits. Page ouverte au premier lancement : Checks ;
  ensuite, la dernière page consultée.
- **Côte à côte** (écran d'au moins 1500 px) : au survol d'un élément du menu, icône « ouvrir à côté » qui affiche
  cette page dans un second panneau à droite (`ui.split`) ; un clic normal change le panneau principal (`ui.view`).
  Chaque panneau défile seul ; le second a ⇄ (échanger les panneaux) et ✕ (fermer). Une page déjà affichée dans un
  panneau n'est pas rouverte (menu, cartes de progression, « Y aller » de Checks qui met à jour le Routeur à côté).
  La barre de gauche montre les options des deux pages, titrées. En dessous de 1500 px : page principale seule (le
  second panneau revient quand l'écran s'élargit).
- **Panneau Objets repliable** (écran large) : bouton en haut du panneau, qui le réduit à une fine colonne
  « Objets » pour le rouvrir (`ui.itemsFolded`) ; utile en côte à côte.
- **Barre de gauche réduite** (écran large) : bouton ‹ à côté du titre, qui la réduit à une colonne d'icônes
  (`ui.navFolded`) : menu (nom au survol), sélecteur de thème, icône « en direct » de l'auto-tracking teintée selon son
  état (clic : fenêtre Auto-tracking) ; options des pages, export et remise à zéro masqués
  jusqu'à ce qu'on la déplie (bouton ›).
- Pied du panneau : état de la sauvegarde, sélecteur de thème (soleil = clair, lune = sombre ; recliquer l'icône
  allumée revient à « auto », qui suit le système ; `ui.theme` : `auto` / `light` / `dark`, sauvegardé, appliqué par
  l'attribut `data-theme` de `<html>`), export/import de la partie, remise à zéro.
- Dans Entrées uniquement : tout déplier / tout replier, navigation rapide vers les zones, et filtres :
  - Proposer les destinations déjà atteignables ou déjà mappées dans les listes : OFF par défaut.
    Une destination déjà mappée (déjà la cible d'une autre sortie, y compris pour les sorties à sens
    unique — hiboux, chants, spawns, rivière Gerudo — qui ne « consomment » pas leur cible) est traitée
    comme une destination atteignable : masquée si OFF, affichée en grisé avec la mention « Atteignable »
    si ON.
  - Afficher les zones non atteintes (aucun chemin connu n'y mène) : OFF par défaut.
  - Afficher les sorties pas encore accessibles (`showInaccessibleExits`) : OFF par défaut — sinon une sortie ne
    s'affiche que si elle peut être prise maintenant (`canTake` du Routeur, comme la Carte : une tombe sans Saisir…) ;
    une sortie déjà notée et les apparitions restent toujours affichées ; avec l'option, les autres sont estompées.
  - Afficher les sorties découvertes : ON par défaut.
  - Afficher les sorties non randomisées : ON par défaut.
- Bouton rouge « Tout remettre à zéro », avec confirmation : efface destinations et état de la partie,
  conserve la configuration.

## Configuration
Réglages du randomizer de **Ship of Harkinian 9.2.3 « Ackbar Delta »**, repris de
`soh/soh/Enhancements/randomizer/settings.cpp` au commit `cb71e22` (celui indiqué dans les spoilers de
l'utilisateur ; ne pas se fier à la branche `develop`, qui a d'autres options). Données dans `js/config.js`
(`SETTINGS_DEF`, `TRICKS`, `CONFIG_TABS`).

- **Périmètre** : seulement les options qui changent la logique, les checks ou les objets suivis (184 sur
  231). Les prix des boutiques, pestes Mojo et marchands en font partie : la logique de SoH exige de pouvoir
  payer le prix **minimal** d'un check non identifié (le vrai prix une fois connu : page Checks > Prix), qui dépend du réglage (Vanilla → prix vanilla ; Équilibrés
  → 0 ; Fixes → le prix fixé ; Fourchette → le minimum ; Selon la bourse → 0, 1, 100, 201 ou 501 selon la
  première bourse de poids non nul). Affichés seulement si le type de lieu est mélangé (comme SoH), mais
  toujours utilisés. Ignorées (`SETTINGS_IGNORED`) : bornes hautes, poids « magnat » et « prix abordables »
  des prix, indices, pièges de glace, réserve d'objets, multiplicateur de dégâts, « All Locations Reachable », et les
  options sans case dans le menu de SoH (« Shuffle Entrances », calculée ; « Shuffle Chest Minigame », forcée
  à « Off » à la génération).
- **Valeurs** : stockées telles que dans SoH (ex. `'Deku Only'`, `'Dungeon rewards'`), défauts de SoH ;
  libellés affichés en français, nom SoH exact au survol de chaque option.
- **Onglets** (calqués sur le menu SoH) : Logique & accès (logique, âge de départ, accès aux zones, pont
  arc-en-ciel et Ganon, raccourcis), Entrées, Donjons (objets de donjon, récompenses, trousseaux, Master
  Quest), Mélanges (lieux, objets, capacités et langues, objets additionnels), Astuces, Routeur
  (coûts propres à l'appli : transition 3, chant 15, sauvegarder-recharger 25, changement d'âge 12, marche estimée
  par région SoH traversée 4).
  Onglet mémorisé (`ui.configTab`). Deux choix ou trois → boutons, au-delà → liste, compteurs → champ
  numérique.
- **Visibilité conditionnelle** (`show(s)`, reprise des `Hide()/Unhide()` de SoH) : ex. compteur du pont
  selon son type, nombre d'épreuves si « Nombre fixe », « Mix … » seulement si les pools mélangés sont actifs
  et que le type d'entrée correspondant l'est, sélection des donjons MQ, trousseaux par donjon si
  « Sélection ». Une carte sans option visible disparaît.
- **Astuces** : les 193 astuces de logique actives de SoH, groupées par zone, avec leur difficulté et leur
  quête (Vanilla / MQ / les deux) ; libellés français (`TRICK_FR`, sans répéter la zone ni « MQ »), nom SoH exact au
  survol et dans la recherche ; recherche, filtres difficulté et quête, « Tout cocher / décocher » par
  zone ; nombre d'astuces actives dans l'onglet. Stockées dans `settings.tricks` (clé `RT_…`).
- **Import depuis un spoiler SoH** (fichier `.json`) : lit **uniquement** `settings` et `enabledTricks` (et, sur
  demande, les tirages du seed et les prix ci-dessous), jamais l'emplacement des objets. Signale les options ou valeurs inconnues et une version autre que 9.2.3 ;
  les options ignorées volontairement passent en silence. Résumé « N options, M astuces ».
  **Fenêtre d'import** (bouton « Importer depuis un spoiler SoH… » de la Configuration, ou proposée d'elle-même, voir
  ci-dessous) : ce qui est lu, puis « Importer aussi » — une ligne par option (`IMPORT_OPTS` dans `js/app.js`) avec un
  interrupteur Non / Oui comme les réglages et son explication (badge « peut spoiler » pour les tirages) : tirages du
  seed (`ui.importQuests`), prix (`ui.importPrices`), spoiler caché pour l'auto-tracking (`ui.importLinkSpoiler`),
  mémorisées — puis le fichier, à choisir ou à glisser dans la zone prévue ; « Importer » (actif une fois un fichier
  choisi) lance l'import et la fenêtre affiche le résumé (ou l'erreur, en restant ouverte). Une nouvelle option
  d'import = une entrée de `IMPORT_OPTS` + sa clé dans `ui` (`defaults()`).
- **Seed de la partie** (`game.seed` : `hash` = `file_hash` du spoiler joint par des tirets, « 21-31-61-87-38 » — les 5
  icônes de l'écran de sélection de SoH, qui nomment aussi le fichier —, `final` = `finalSeed`, le numéro envoyé par le
  jeu, `file` = nom du fichier) : retenue à chaque import, remise à zéro avec la partie. Affichée sous le bouton
  d'import de la Configuration (« Seed 21-31-61-87-38 », ou « Seed inconnue ») et en tête des Statistiques ; infobulle :
  finalSeed et fichier. **Contrôle au réimport** : si le spoiler a une autre seed que la partie en cours (`game.seed`)
  ou que la sauvegarde suivie par l'auto-tracking (`game.save.seed`), rien n'est importé et la fenêtre l'explique (les
  deux seeds) avec trois choix : « Annuler », « Importer quand même », « Nouvelle partie : tout remettre à zéro et
  importer » (comme « Tout remettre à zéro », puis l'import du même fichier). Résumé de l'import précédé de la seed.
- **Proposition d'import** : au premier chargement et après « Tout remettre à zéro » (nouvelle seed, la
  configuration étant conservée), la fenêtre d'import s'ouvre d'elle-même (avec « Non, merci » au lieu
  d'« Annuler »), puis affiche le résumé. Elle revient à chaque chargement (`ui.spoilerPrompt`) tant qu'on n'a ni importé un
  spoiler (depuis cette fenêtre ou la Configuration) ni répondu « Non, merci » ; la fermer (croix, Échap) ne
  fait que la reporter au prochain chargement.
- **Tirages du seed à l'import** (option « Tirages du seed », « peut spoiler », Non par défaut, mémorisée dans
  `ui.importQuests`), seulement pour ce que la configuration
  laisse au hasard :
  - version des donjons : liste `masterQuestDungeons` du spoiler (absente s'il n'y a aucun donjon MQ) ;
  - trousseaux en « Aléatoire » / « Nombre » : SoH écrit le tirage réel dans les réglages par donjon du spoiler.
    Ces réglages sont toujours remis à leur valeur par défaut (sinon la Configuration révélerait le tirage) ; le
    tirage n'est gardé, dans la partie (`game.dungeons[id].keyRing` = 'yes'/'no'), que si la case est cochée.
    En « Sélection » + « Aléatoire » par donjon, le spoiler ne contient pas le résultat : reste inconnu.
  - épreuves de Ganon (« Nombre aléatoire », ou « Nombre fixe » entre 1 et 5) : liste `requiredTrials` du spoiler
    (noms localisés : « l'épreuve de la Forêt » / « Forest Trial »…), gardée dans la partie (`game.trials`). En
    « Nombre aléatoire », SoH écrit aussi le nombre tiré dans « Ganon's Trials Count », remis à sa valeur par défaut.
  Option à Non : ces informations restent inconnues (ou ce que le joueur a noté).
- **Prix à l'import** (option « Prix des boutiques, pestes Mojo et marchands », Non par défaut, `ui.importPrices`) : lit seulement le champ
  `price` des lieux du spoiler de type boutique / peste / marchand, jamais l'objet → `game.prices` (remplace les prix
  déjà notés ; voir Checks > Prix). Résumé « prix de N checks ».
- **Objets de départ** (« Start with… » : ocarina, bouclier Mojo, épées Kokiri et de Légende, bâtons, noix,
  haricots, 12 chants, symboles de Skulltula) : réglages stockés mais sans onglet (onglet `starting` marqué
  `hidden`) ; à l'import, ils sont cochés dans le panneau Objets (`applyStartingItems`), sans jamais
  diminuer ce que le joueur a déjà noté. Bâtons / noix de départ : seulement si le sac correspondant n'est pas
  mélangé (sinon SoH n'en donne pas, `savefile.cpp`). Non repris : cœurs de départ (lus directement par la
  logique), bourses pleines (rubis).
- **Réglages corrigés par SoH à la génération** (`FinalizeSettings`, `settings.cpp`), appliqués aussi par l'appli :
  départ en enfant forcé si la Porte du Temps est fermée sans ocarinas mélangés, ou si la forêt est fermée sans
  apparitions, overworld, intérieurs, grottes ni entrées découplées (`sohStartingAge`) ; Œuf Bizarre jamais mélangé
  quand on passe Zelda enfant ; récompense des 100 Skulltulas toujours mélangée si la clé de Ganon y est ; poche de
  Link toujours une récompense avec les récompenses « en fin de donjon ».
- Afficher en tête les incohérences détectées dans les données.

**Correspondance avec Entrées** (`isRandomized`, pools de `entrance.cpp`) : chaque sortie suit le type de son
entrée SoH (`shuffleTag` aligné par `tools/soh-entrances/apply_names.mjs`) — overworld, intérieurs (Simples /
Tous), repaire, grottes et tombes (type GrottoGrave de SoH, dont les 4 tombes du cimetière et la grotte des
tempêtes du château), donjons (+ Ganon), boss (Par âge / Complet), Tour de Ganon (mêlée aux salles de boss, adulte
en « Par âge », seulement si les boss sont mélangés), chants de téléportation, hiboux ; « points d'apparition »
couvre le spawn enfant et adulte ; la rivière de la Vallée Gerudo n'est mélangée (avec l'overworld) qu'en entrées
découplées ; pools mélangés : deux types s'échangent si leurs deux options « Mix … » sont actives.

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

## Âges
Aucun réglage manuel : les âges accessibles (`agesC`) viennent de la logique SoH (`sohC`, région racine) — l'âge de
départ toujours, l'autre une fois le voyage dans le temps possible (Porte du Temps selon « Door of Time », entrées
notées…). Ils servent à débloquer les spawns dans Entrées et au rappel des spawns non renseignés.

## Logique Ship of Harkinian
Portage fidèle de la logique du randomizer de SoH 9.2.3 (commit `cb71e22`), en cours de branchement (étapes :
1. extraction, 2. moteur, 3. âges et accessibilité des checks dans la page Checks, 4. entrées notées reliées aux
passages SoH, 5. Routeur sur le graphe SoH — **faits**).
- **Données** (`logic-data.js`, généré par `tools/soh-logic/extract_logic.mjs` depuis `location_access/**`,
  `location_access.cpp`, `settings.cpp`, `location_list.cpp`) : 1 026 régions, avec leurs événements (`LOGIC_…`),
  checks et sorties, conditions C++ converties en fonctions JavaScript ; options lues par la logique ; prix et
  objet vanilla des boutiques, pestes Mojo et marchands ; les 296 entrées mélangeables (`entrance.cpp`) avec leur
  numéro d'entrée du jeu (celui des spoilers), leur type et la sortie de région correspondante.
- **Moteur** (`js/logic.js`) : fonctions de `logic.cpp` (objets, ennemis, niveau d'eau, Temple de l'Esprit…)
  et recherche de `fill.cpp` (`ReachabilitySearch`) en mode « checks disponibles » du tracker de SoH : chaque
  région a quatre accès (enfant / adulte × jour / nuit) ; on part de la racine avec l'âge de départ, on propage
  par les sorties, le temps qui passe (régions où le temps s'écoule : jour et nuit, pour la région et la
  racine), le changement d'âge au Temple du Temps, et les événements, jusqu'à ce que plus rien ne change.
  Résultat (`computeSoh`, `sohC`) : accès de chaque région, événements obtenus, et pour chaque check les états
  âge/moment où il est faisable. Entrées mélangées : `computeSoh` accepte des liaisons « sortie → région d'arrivée
  réelle » (la sortie garde sa condition, seule l'arrivée change, comme `Entrance::Connect` de SoH ; `null` : la
  sortie ne mène nulle part).
- **Entrées notées → liaisons** (`entranceLinks`, `linksC`) : chaque sortie porte le numéro de son entrée SoH
  (`entr` dans `areas-data.js`). Noter « X mène à Z » (on apparaît à Z) revient à remplacer l'entrée de X par celle
  qui, en vanilla, fait apparaître à Z : X mène à la région d'arrivée de cette entrée (une entrée à double sens
  passe avant un sens unique). Une sortie randomisée **pas encore notée est une impasse** (`null`) : rien n'est
  compté comme accessible derrière une entrée inconnue. Salles de boss : en entrées couplées, leur porte de sortie
  ramène devant la porte de boss qui y mène ; en découplées, elle est notée dans Entrées. Téléporteurs bleus :
  règle de SoH (fin de `ShuffleAllEntrances`) — en couplées, on remonte de la salle à son donjon (porte de boss,
  puis entrée du donjon, éventuellement de donjon en donjon) et le téléporteur mène là où mène le téléporteur
  vanilla du donjon dont l'entrée a été prise, ou devant l'entrée prise si ce n'est pas celle d'un donjon ; en
  découplées, il mène là où ressort la salle. Le calcul « tout obtenu » (`sohFullC`, âge des checks) garde la
  destination vanilla des entrées pas encore notées, pour ne pas déclarer « jamais faisable » ce qui est seulement
  inconnu.
- **Inventaire** : celui du panneau Objets, jamais les objets placés dans la seed. Objets non mélangés possédés
  d'office (capacités, langues, touches d'ocarina, canne à pêche, âmes de haricot, bourse enfant, capacités de
  base des bâtons et noix), cartes/clés « Au départ », Carte Gerudo offerte (charpentiers libres, carte non
  mélangée), clé squelette, trousseau obtenu (toutes les petites clés). Temple du Feu Vanilla avec clés dans le
  donjon : +1 petite clé (porte du sous-sol ouverte d'office par SoH). Temple de l'Esprit MQ avec petites clés
  « Vanilla » : +3 petites clés offertes au départ par SoH (`starting_inventory.cpp`, `savefile.cpp` : sans elles,
  le placement vanilla des clés de l'Esprit MQ peut se bloquer) ; le compteur du panneau ne compte que les clés
  trouvées (infobulle). Chasse à la Triforce « Victoire » : clé de boss de Ganon comptée comme possédée (SoH la met
  dans l'inventaire de départ de la logique sans la donner en jeu) ; sa case disparaît du panneau. Audit des cas
  particuliers hors logique (2026-10) : `starting_inventory.cpp`, `Logic::Reset`, `Randomizer_InitSaveFile`
  (`savefile.cpp`) et `FinalizeSettings` relus ; tout ce qui touche la logique ou la liste des checks est repris.
- **Boutiques et pestes non mélangées** : les atteindre donne l'événement de leur objet vanilla (bâtons Mojo →
  accès aux bâtons, noix, missiles, poisson, insectes, fée, flamme bleue), comme SoH.
- **Écarts assumés** avec le tracker de SoH : donjons terminés = ceux dont le boss est battable en logique (et non
  les téléporteurs bleus empruntés) ; épreuve de Ganon tirée au sort et pas encore notée (panneau Objets) =
  requise ; haricots plantés
  seulement avec « Haricots déjà plantés » + haricots au départ ; version de donjon inconnue → branches Vanilla et
  MQ toutes deux explorées ; prix d'un check identifié = celui de `game.prices` (identifié en jeu avec le spoiler caché,
  ou noté à la main), sinon le prix minimal — comme SoH, qui ne prend le vrai prix qu'une fois l'objet identifié.
- **Validation** (outil de test, jamais dans l'appli) : `node tools/soh-logic/replay_spoilers.mjs <dossier>`
  rejoue chaque spoiler sphère par sphère en ramassant tous les objets accessibles, avec les entrées du spoiler
  (`entrances` : l'entrée `index` mène là où mène normalement l'entrée `override`) ; tous les lieux du playthrough
  et du spoiler doivent être atteints. Les entrées du spoiler sont aussi converties en destinations notées et les
  liaisons qu'en déduit l'appli (`entranceLinks`) comparées à celles du spoiler : aucune différence attendue. Enfin, à
  chaque sphère, les régions que le Routeur traverse depuis l'apparition de l'âge de départ sont comparées à celles que
  la logique déclare accessibles (hors régions de passage, et hors sauvegarde dans un donjon, que la logique SoH ne
  modélise pas) : aucune différence attendue.
  Résultat actuel : 32/32 spoilers 9.2.3 conformes, liaisons identiques, Routeur identique à chaque sphère, dont 5 à entrées mélangées
  (couplées ou découplées, pools mélangés, salles de boss — « Mix Bosses » compris — et Tour de Ganon mélangées),
  couvrant donjons MQ, trousseaux, petites clés vanilla, épreuves de Ganon tirées au sort et quête d'échange adulte
  non mélangée.

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

> **Catalogue orienté Ship of Harkinian.** Le contenu du panneau Objets (objets, donjons, check-lists) est celui
> du randomizer de Ship of Harkinian ; l'inventaire noté est lu tel quel par la logique SoH (Checks, Entrées).

Dans l'ordre :

1. **Quête** : les 6 Médaillons de donjon disposés en hexagone (positionnement CSS, pas d'image dessinée),
   Morceaux de Triforce au centre (visible seulement si « Chasse à la Triforce » est activée en
   Configuration ; plafond = nombre total de morceaux, pastille dorée dès le nombre requis atteint, comme
   dans SoH — infobulle « n (requis R, total T) ») ; à droite de l'hexagone, les 3 Pierres Spirituelles, puis,
   séparées par un trait, deux colonnes de tuiles d'objet cliquables : Double Défense, Réceptacles de Cœur,
   Quarts de Cœur / Magie (progressif : Simple → Double, puis Infinie seulement avec « Améliorations
   infinies »), Skulltulas d'Or, Greg (rubis vert : seulement si le pont arc-en-ciel est « Greg » ou si une
   option « Greg compte / Greg joker » est active pour le pont ou la clé de boss de Ganon ; icône
   `icons/rewards/greg.png`). Lus par la logique SoH.
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
   de Roc », icône `icons/magic/rock_feather.png`). Objets à munitions, progressifs avec pastille de capacité et un
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
   quand le réglage rando « mélanger les notes d'ocarina » est actif ; lues par la logique SoH).
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
   attendues dans `icons/abilities/` et `icons/languages/`), lus par la logique SoH. À droite, dans une carte étroite distincte (ces check-lists n'ont pas de lien
   logique avec les capacités/langues, seule la mise en page les rapproche ; `ITEMS_PAGE.checklistButtons`),
   les boutons carrés « Clés des portes » (option « Lock Overworld Doors »), « Trous à haricots » (option « Âmes
   de haricot »), chacun visible seulement si son option est active (carte masquée s'il n'en reste aucun) :
   compteur obtenu/total, cliquables pour
   ouvrir une modale de pointage — liste de lieux à cocher, 2 colonnes, clic gauche = coché, clic droit = décoché
   (`setChecklist`, `checklistStats` dans `js/state.js`). Catalogue des lieux dans `CHECKLISTS`
   (`js/items.js`). Lus par la logique SoH : clé de la porte obtenue, âme de haricot du lieu.
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
   (MQ) selon la version du donjon (pastille à côté du nom, voir Configuration > Version des donjons).
   **Épreuves de Ganon** : quand la configuration laisse au hasard lesquelles sont requises (« Nombre aléatoire »,
   ou « Nombre fixe » entre 1 et 5), une 3e ligne dans le bloc du Château de Ganon : 6 pastilles à la teinte des
   médaillons (Forêt, Feu, Eau, Ombre, Esprit, Lumière) — « ? » inconnue (pointillés), initiale requise (pleine),
   ✓ dissipée (atténuée) ; clic : état suivant, clic droit : précédent (`game.trials`, `trialStatus`/`cycleTrial`).
   La logique compte une épreuve inconnue comme requise (seules les dissipées ouvrent la Tour de Ganon). Les pierres
   à potins indiquent en jeu les épreuves dissipées. Exception : la Carte Gerudo (objet `gerudoCard`
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
Format des icônes : PNG carré à fond transparent, **192 px de côté** (net jusqu'à une densité ×3 pour les
plus grandes tuiles, ~65 px) ; réduire toute nouvelle image à cette taille avant de l'ajouter.

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

La logique SoH lit l'inventaire tel quel (paliers compris : Force, Écaille, Bourse, capacités…), voir
« Logique Ship of Harkinian > Inventaire ».

## Checks
Liste des checks de la seed, par zone, pour les cocher au fil de la partie. Données : `checks-data.js`
(`window.CHECKS_DATA`), **généré** depuis les sources de SoH 9.2.3 (commit `cb71e22` : `location_list.cpp`,
`Shuffle*.cpp`, `fishsanity.cpp` pour les métadonnées, `location_access/**` pour la région de logique de chaque
check) ; règles dans `js/checks.js`.

- **Correctifs des sources de SoH** (`tools/soh-checks/fixes.mjs`, appliqués en mémoire par `extract_checks.mjs` et
  `extract_logic.mjs`) : seulement des erreurs de SoH 9.2.3 vérifiées en jeu et corrigées depuis dans SoH. Les numéros
  et noms SoH (auto-tracking, spoiler) restent ceux du jeu ; la région de logique et le libellé suivent le lieu réel.
  - Charpentiers du Repaire : SoH 9.2.3 inverse les drapeaux de la double cellule et de la cellule de la pente
    (`TH_STEEP_SLOPE_CARPENTER`, « Steep Slope Carpenter », est la garde de la double cellule, et inversement).
  Un garde-fou arrête la génération si les sources de SoH ne contiennent plus l'erreur (nouvelle version corrigée) :
  retirer alors le correctif, sinon il réinverserait tout.

- **Contenu** : 2 447 checks (sur 2 513 dans SoH : sont écartés ceux que le tracker de SoH n'affiche jamais —
  pierres à potins, indices fixes, coffres intermédiaires de la chasse au trésor, Lettre de Zelda, Triforce
  complète, Ganon). Chaque check : id SoH (`RC_…` sans préfixe), zone (32 zones SoH, dont les 12 donjons),
  type SoH (`RCTYPE`), version (commun / Vanilla / MQ), libellé français, nom SoH exact (celui du spoiler,
  affiché au survol), région de logique (pour la future logique), et pour certains : n° d'objet en boutique,
  n° de poisson de l'étang.
- **Libellés français** générés : table écrite à la main pour les checks importants (PNJ, récompenses, chants,
  objets uniques), sinon règles — objet en tête (Coffre, Jarre, Herbe, Caisse, Skulltula, Peste Mojo, Fée…),
  numéro, qualificatifs accordés (« Coffre gauche », « Jarre droite »), lieu avec articles et contractions
  (« de la salle du boss », « près de l'entrée »), âge en suffixe « (enfant) ».
- **Checks listés** (reprise de `IsCheckShuffled` du tracker de SoH, `checkShuffled`) : seulement ceux que la
  configuration mélange — jarres / herbes / caisses / objets au sol / Skulltulas selon Overworld / Donjons /
  Partout, arbres, buissons, ruches, vaches, fées (4 options), grenouilles, pestes Mojo (« Uniques » = les 3
  toujours mélangées), marchands, boutiques (avec N objets par boutique : les N premiers dans l'ordre de
  mélange de SoH 7, 5, 8, 6, 3, 1, 4, 2 ; « Aléatoire » : les 7 possibles), chants, ocarinas, épées, œuf,
  Carte Gerudo, clés de la Forteresse (4, ou seulement celle de la cellule à 1 torche en « Rapide »),
  cartes / boussoles / clés / clés de boss (sauf « Vanilla »), poche de Link, loche / poissons de l'étang
  (les N premiers, adultes si séparés par âge) / poissons de l'overworld, récompense des 100 Skulltulas, quête
  d'échange adulte (Anju adulte et le Certificat toujours). Écart volontaire : le marchand de haricots est listé
  avec « Haricots seuls » (le tracker de SoH le masque par erreur). Préférence « Suivre aussi les
  Skulltulas non mélangées » (option « Always show Gold Skulltulas » du tracker de SoH : utile pour les
  récompenses de la Maison des Skulltulas quand les symboles ne sont pas mélangés).
- **Version des donjons** : seuls les checks de la version active (V / MQ, voir Panneau Objets > Version des
  donjons) sont listés. Version inconnue : seuls les checks communs, avec une note « n checks propres à la
  version Vanilla ou Master Quest sont masqués » ; badge V / MQ / ? dans l'en-tête de la zone, cliquable comme
  dans le panneau Objets (même état).
- **Checks exclus** (`settings.excluded`) : importés du spoiler (`excludedLocations`, réglage de la seed, pas
  un spoil ; remplacés à chaque import) ou réglés à la main (bouton ⊘ au survol, ↺ pour réintégrer). Exclus :
  masqués et hors compteurs, sauf filtre « Afficher les checks exclus » (en italique).
- **Catégories** (16, déduites du type et du constructeur SoH, champ `cat`) : Coffres, Skulltulas, Boss (récompenses
  de donjon et réceptacles), Chants, PNJ et événements, Objets au sol (rubis, cœurs, quarts de cœur et clés posés),
  Pestes Mojo, Boutiques et marchands, Vaches, Fées, Poissons, Ruches, Jarres, Caisses, Herbes, Arbres et buissons.
  Icône `icons/checks/<catégorie>.png` (chest, skulltula, boss, song, npc, freestanding, scrub, shop, cow, fairy, fish,
  beehive, pot, crate, grass, tree) ; en attendant l'image, pastille de couleur avec l'initiale.
- **Accessibilité** (logique SoH, voir « Logique Ship of Harkinian ») : un check est **faisable** s'il l'est avec
  l'inventaire noté (`sohC`), comme les « checks disponibles » du tracker de SoH. Checks restants faisables :
  icône soulignée de vert ; pas encore faisables : grisés. Infobulle : catégorie, nom SoH, âge, « Faisable
  maintenant : enfant / adulte (de nuit) » ou « Pas encore faisable ».
- **Âge** : calculé par la même logique avec un inventaire « tout obtenu » (`sohFullC` : objets au maximum, chants,
  objets de donjon, âmes, clés des portes ; ne dépend que de la configuration et de la version des donjons).
  Pastille « E » / « A » / « E A » des âges possibles, la lettre en plein (vert) quand le check est faisable
  maintenant à cet âge ; pastille « — » si le check n'est jamais faisable selon la logique. ☾ / ☀ : check
  faisable seulement de nuit / de jour (ex. Skulltulas de nuit).
- **Filtres** (barre au-dessus de la liste) : recherche (libellé FR, nom SoH ou zone) ; âge (Tous / Enfant / Adulte :
  checks faisables à cet âge avec tout l'inventaire ; ceux jamais faisables passent tous les filtres) ;
  « Seulement les faisables » (« Only show available » de SoH : checks faits ou faisables maintenant, zones sans
  check affiché masquées ; filtre d'affichage, sans effet sur les compteurs) ; « Masquer les checks faits » ;
  « Masquer les zones terminées » ; pastilles de catégorie avec le nombre restant
  (clic : afficher / masquer la catégorie, clic droit : seulement celle-ci, ou tout réafficher ; « Tout afficher »).
  Les checks suivis = listés, non exclus, dans les catégories et l'âge choisis : compteurs, barres et zones
  terminées en dépendent. Panneau de gauche : tout déplier / replier, « Afficher les checks exclus », « Afficher la
  logique au survol » (« Show Logic » de SoH : condition SoH du check dans l'infobulle, par région), « Suivre
  aussi les Skulltulas non mélangées », zones groupées Overworld / Donjons avec « faits | accessibles | total » et le
  code couleur des zones (voir Zones).
- **Entrées mélangées** : les destinations notées dans Entrées sont prises en compte ; une entrée pas encore notée ne
  mène nulle part pour la logique (pas d'avertissement sur la page Checks).
- **Progression globale** : cadre « Checks » de la bande de progression (voir plus haut) — anneau de pourcentage,
  « faits / total », restants, faisables maintenant, zones terminées, et détail Overworld / Donjons. Il dépend seulement de la configuration (checks mélangés, version active des donjons, hors exclus),
  jamais des filtres d'affichage (catégories, âge, Skulltulas non mélangées, recherche, zones masquées) ; les
  compteurs des zones et des pastilles, eux, suivent les filtres.
- **Zones** : repliables (présentation des Entrées) ; en-tête avec badge V / MQ / ? (donjons), restants par catégorie
  (icône + nombre), puis la progression : barre (faits, puis accessibles) et trois valeurs « faits | accessibles |
  total » (accessibles = checks suivis restants faisables maintenant). Code couleur de la zone (pastille de progression,
  liseré gauche, nom dans le panneau de gauche) : terminée → grisée ; tout le reste accessible → vert ; en partie →
  neutre ; rien d'accessible (ou rien à faire) → rouge. Le détail est repris au survol.
- **Liste des checks** : 2 colonnes, 1 seule quand la liste est étroite (moins de 640 px, ex. panneaux latéraux
  ouverts) pour garder les libellés lisibles. Option « Faisables en premier » (`ui.checks.sortAvail`, activée par
  défaut) : dans chaque zone, faisables maintenant, puis pas encore faisables, puis faits.
- **Annuler** : cocher / décocher ou exclure / réintégrer un check affiche quelques secondes un bandeau en bas
  d'écran (« … coché · Annuler », « … exclu · Annuler ») pour revenir en arrière (clic malencontreux).
- **Prix** (boutiques, pestes Mojo, marchands à faire) : puce à droite du check, le prix en rubis quand il est connu
  (doré ; rouge si la bourse notée ne suffit pas), « ? » au survol sinon. Clic : champ pour noter le prix lu en jeu
  (Entrée ou clic ailleurs enregistre, vide efface, Échap annule) — indispensable pour les pestes et marchands quand
  « Scrub / Merchant Hint Text » est désactivé (le jeu ne les identifie pas). Rempli tout seul par l'auto-tracking avec
  le spoiler caché quand le jeu identifie l'objet (Auto-tracking > Spoiler caché). `game.prices` { id: rubis } ; la
  logique (`GetCheckPrice`) compare ce prix à la bourse, au lieu du prix minimal : « Pourquoi ? » demande alors la
  bourse qui suffit.
- **Pourquoi pas encore ?** : bouton « ? » au survol d'un check pas encore faisable. Fenêtre qui dit pourquoi
  (`whyLocked` dans `state.js`, calculé au clic) : jamais faisable (configuration) ; derrière une entrée pas encore
  découverte (pas faisable même avec tous les objets et les entrées notées) ; sinon les objets qui manquent, au plus
  juste — l'inventaire « tout obtenu » est ramené vers l'inventaire noté tant que le check reste faisable : par blocs
  (groupe du panneau Objets, objets d'un donjon, check-list), puis objet par objet, puis palier ou nombre au plus bas
  (un ensemble minimal parmi d'autres) — avec l'âge auquel il devient faisable.
- **Y aller** : bouton (icône du Routeur) au survol d'un check à faire et dans l'en-tête de zone. Ouvre le Routeur
  avec pour arrivée la sortie la plus proche, depuis le départ actuel du Routeur, d'où l'on rejoint à pied le check
  (une de ses régions SoH, `CHECK_REGIONS`, à l'âge où il est faisable s'il n'est faisable qu'à un âge) ou la zone.
  Sans départ noté : une sortie d'où l'on y va à pied. Message si aucune sortie connue n'y mène. Checks sur 2 colonnes (1 sur mobile) : icône de catégorie, libellé,
  ☾ / ☀, pastille d'âge, coche ; un clic (gauche) bascule fait / à faire (`game.checks`, stockage creux `{ id: true }`) ; nom SoH
  au survol ; ⊘ au survol pour exclure.
- **Ignorer une zone** (zones futiles…) : ⊘ dans l'en-tête de la zone, à côté de « Y aller » (et « ⊘ ignorer » /
  « ↺ réintégrer » sur chaque zone futile du résumé de la page Indices, zone ignorée barrée) : exclut d'un coup tous ses
  checks listés pas encore faits (les checks faits restent comptés) ; « Annuler » dans la notification ; ↺ réintègre
  ses checks exclus. Zone dont tout ce qui reste est exclu (zone ignorée, ou checks tous exclus) : listée seulement avec
  « Afficher les checks exclus » (pour la réintégrer), état « ignorée » (bordure neutre, estompée, message « Zone
  ignorée : N checks exclus ») ; sinon masquée, ainsi que son raccourci dans la barre de gauche.

## Entrées
Cadre « Entrées » de la bande de progression (voir plus haut), dès qu'au moins une sortie est randomisée :
sorties découvertes / randomisées, restantes, zones complètes (mêmes zones que la page Checks ; la pseudo-zone
« Apparitions et chants » n'est pas comptée), et détail Overworld / Intérieurs / Grottes / Donjons /
Sens unique (types présents seulement).
Les zones sont celles du tracker de checks de SoH (32 : 20 zones d'overworld et 12 donjons, découpage de
`GetAreaFromScene` — ex. le Château d'Hyrule séparé du Bourg, le Temple du Temps dans le Bourg, le Repaire des
Voleurs dans la Forteresse), plus « Apparitions et chants » (id `spawns`) pour les apparitions et les chants de
téléportation, qui ne sont pas des lieux. Identifiants en minuscules des zones SoH (`hyrule_field`,
`zoras_river`…), regroupement fait par `tools/soh-entrances/regroup_areas.mjs`.
Une carte dépliable par zone, avec progression (sorties renseignées / randomisées). Une ligne par sortie (avec, à côté
de son nom, « Y aller » : la sortie devient l'arrivée du Routeur, à n'importe quel âge — sauf apparitions et chants) :
1. Icône du type (extérieur, intérieur, grotte, donjon, boss, hibou, téléportation, spawn).
2. Globe : au survol, liste des sorties de la même zone reliées à pied, avec leur coût (coûts de marche du
   Routeur ; c'est la logique SoH qui dit si le passage est possible). Grisé si aucune connexion.
3. Nom de la sortie : nom du tracker d'entrées de SoH (`randomizer_entrance_tracker.cpp`, commit `cb71e22`),
   traduit en français sans le préfixe de zone (déjà affiché), nom SoH exact au survol (champ `soh`) — y compris
   dans les listes de destinations (recherche aussi sur le nom SoH) et le Routeur. Convention SoH : côté
   extérieur « Entrée de la maison de Mido », côté intérieur « Maison de Mido » (la sortie qu'on prend depuis
   l'intérieur). Correspondance sortie ↔ entrée SoH et traductions : `tools/soh-entrances/apply_names.mjs`
   (réécrit `areas-data.js`), qui vérifie aussi que chaque appariement aller-retour est celui du tracker de SoH
   (Repaire des Voleurs compris).
4. « Accessible depuis » : zone et sortie qui mènent ici (plusieurs possibles, ex. chant + entrée).
   Colonne masquée si les entrées découplées ne sont pas activées : la provenance est alors
   identique à la destination (colonne 5 renommée « Sortie associée » dans ce cas).
5. « Va vers » (« Sortie associée » si entrées découplées désactivées) :
   - non randomisée : destination vanilla ;
   - randomisée mais pas encore débloquée dans la partie (spawn dont l'âge n'est pas encore accessible,
     chant dont l'Ocarina ou le chant lui-même ne sont pas encore appris) : message indiquant la condition
     de déblocage, pas de liste déroulante ;
   - randomisée, débloquée et non renseignée : liste déroulante avec filtre texte, groupée par zone,
     ne proposant que les destinations libres et du même pool (sauf pools mélangés) ; sens uniques : les
     destinations de SoH (`BuildOneWayTargets`) — spawns et chants : overworld, intérieurs, grottes et tombes,
     plateformes, apparitions, atterrissages des hiboux ; hiboux : overworld, plateformes (sauf celle du
     Prélude), atterrissages ;
   - randomisée et renseignée : destination choisie.
   Cliquer une destination ou une provenance fait défiler vers la ligne correspondante.
6. Indicateur à droite : « V » si vanilla ; rien si à renseigner (la liste occupe l'espace) ;
   croix pour effacer si renseignée ; « A » si calculée automatiquement (téléporteur bleu) ;
   « ? » si randomisée mais pas encore débloquée (survol : condition de déblocage).

Règles :
- Entrées couplées par défaut : noter A → B renseigne aussi B → A. Effacer l'une efface l'autre.
- Spawns, chants, hiboux : sorties à sens unique ; on ne peut pas y « entrer ». Leur destination s'ajoute aux
  entrées existantes sans la consommer. Rivière Gerudo : sens unique mélangé avec l'overworld (entrées
  découplées) ; elle consomme sa destination, et son arrivée au Lac Hylia devient une destination d'overworld.
- Une sortie randomisée pas encore renseignée ne mène nulle part pour la logique (impasse) : les zones et
  checks derrière elle ne comptent pas comme atteignables.
- Zone atteinte : l'une de ses sorties se trouve dans une région SoH accessible (région de départ de son entrée,
  ou région où l'on apparaît en y arrivant).
- Spawn enfant/adulte et chants de téléportation : non éditables tant qu'ils ne sont pas débloqués dans la
  partie (spawn → âge correspondant accessible ; chant → Ocarina et ce chant appris), pour éviter de noter
  une destination qu'on ne peut pas encore réellement connaître. Une destination déjà notée avant un
  décochage reste conservée (juste masquée le temps que la condition redevienne vraie).
- Arrivées seules (destinationOnly : plateformes de téléportation, arrivée de la rivière Gerudo, toit de la maison
  d'Impa où se pose le hibou du Chemin du Péril) : on peut y arriver, pas les prendre ; non affichées comme lignes.
- Salles de boss : les portes de boss mènent aux salles (Tour de Ganon comprise si elle est mélangée). En
  entrées couplées, la sortie de la salle (téléporteur bleu) est calculée, « A » : même calcul que la logique
  (`blueWarpTargets`, voir « Logique Ship of Harkinian »), affiché comme la sortie où l'on apparaît. En entrées découplées avec salles mélangées, elle se note : devant quelle porte de boss on
  ressort (porte de sortie et téléporteur bleu mènent au même endroit).
  Avec Boss « Full » et « Mix Bosses » (pools mélangés), portes de boss, salles et devant des portes rejoignent le
  pool mélangé : une porte peut mener à un lieu de l'overworld, une sortie d'overworld à une salle de boss ou devant
  une porte de boss ; en entrées couplées, la sortie de la salle ramène devant ce qui y mène.
- Convention des libellés : une sortie désigne l'endroit où l'on se trouve. « Maison de Mido » est côté forêt
  (la porte) ; la prendre mène à « Sortie de la maison de Mido », à l'intérieur.

## Routeur
Départ : bouton « Ma position » (au bout de la ligne Départ) — la sortie la plus proche de Link avec la position en temps
réel (`linkNearestExit`, même règle que le départ suivi en direct), sinon la dernière entrée prise (auto-tracking), et
l'âge de Link s'il est connu ; inactif sans position.
Plus court chemin (Dijkstra, `shortest`) sur un graphe dont les nœuds sont (sortie, âge, position), construit sur la
logique SoH avec l'inventaire, les événements et les entrées notés (`routeGraph` dans `js/logic.js`, `routeC`). La
position dit dans quelle région SoH on se trouve à cette sortie : on vient d'y apparaître (région d'arrivée), on y est
arrivé à pied (région de départ de son entrée), ou c'est le départ choisi (les deux). Les deux régions ne communiquent
pas toujours (ex. on ressort du Gymnase Gerudo sur un rebord d'où l'on ne peut pas y rentrer ; les deux fontaines de
Grande Fée du Château ont la même région d'arrivée).
- **Marche** : depuis la région de la position, on rejoint toute sortie dont la région de départ est atteignable par
  les sorties internes des régions (tout passage qui n'est pas une entrée mélangeable, ni impossible à pied en jeu :
  `ROUTE_NO_WALK`, double cellule du Repaire → abords de la Forteresse — exclu des trajets seulement), conditions évaluées à l'âge du
  trajet, de jour ou de nuit. Coût : celui d'`areas-data.js` (plus court chemin dans la zone, dans le sens des données, sinon dans les deux
  sens), à défaut nombre de régions traversées × « marche estimée ». Deux passages à pied changent de zone, notés dans
  les données comme liaisons `"zone::sortie"` et enchaînés avec la marche de part et d'autre : fin de la course d'Igor
  (Tombe d'Igor → Moulin, 99) et sortie par les mains du Temple de l'Esprit (Entrée du temple → Devant le temple au
  Colosse, 120).
  Les marches consécutives sont fusionnées à l'affichage.
- **Transition** par une sortie dont la destination est connue, si la région de départ de son entrée est joignable à
  pied depuis la position et que la condition SoH de l'entrée est remplie (portes verrouillées, hibou enfant…). Salle
  de boss : porte de sortie (à tout moment) et téléporteur bleu (boss vaincu), destinations tirées du même calcul que
  la logique (`bossRoomExits`).
- **Chant de téléportation** depuis n'importe où (condition SoH : chant jouable) vers la destination notée du chant.
- **Sauvegarder-recharger** : entrée du donjon dans un donjon (salle de boss : celle du donjon dont la porte de boss y
  mène, comme `Entrance_SetSavewarpEntrance` de SoH), sinon apparition de l'âge. La logique SoH ne compte pas la
  sauvegarde dans un donjon, le Routeur si.
- **Changement d'âge** au Temple du Temps, si la zone derrière la Porte du Temps est atteignable (même règle que le
  voyage dans le temps de SoH).
Règles d'interface :
- Départ : zone, sortie, âge (Enfant / Adulte ; jamais « peu importe »).
- Arrivée : zone, sortie, âge (Enfant / Adulte / Peu importe). Bouton pour inverser départ et arrivée.
- Calcul automatique dès que départ et arrivée sont choisis (pas de bouton).
- Clic sur une sortie du trajet : elle devient le départ, avec l'âge qu'on a à ce moment du trajet (le reste du chemin
  est recalculé depuis là ; sur la sortie d'arrivée, on repart de l'arrivée). Survol surligné, indication au-dessus du
  trajet. L'ancien départ est gardé (`ui.router.prevFrom`) : bouton « Revenir à … » à côté de l'indication
  (en cas de clic malencontreux) ; y revenir échange les deux départs.
- Le chemin peut combiner : marche (selon la logique SoH et l'âge courant), transitions,
  chants de téléportation (ocarina + chant connus), vol du hibou (enfant), téléporteurs bleus,
  sauvegarder-recharger (retour au spawn de l'âge ; à l'entrée du donjon si on est dans un donjon),
  changement d'âge au Temple du Temps.
- Un changement d'âge peut être choisi même s'il n'est pas imposé, s'il raccourcit le trajet
  (ex. pour profiter du spawn de l'autre âge).
- Affichage vertical, sur un axe central :
  - une carte par passage dans une zone : nom de la zone une seule fois, sorties successives empruntées dans la zone
    (la première, par laquelle on arrive, en médaillon sur le bord haut ; les suivantes avec une petite icône), reliées
    par « à pied » et les objets utilisés pour cette marche ; marches consécutives fusionnées. Le départ et l'arrivée
    restent toujours seuls sur leur carte : une marche qui part du départ ou mène à la sortie visée est affichée
    comme une pastille « À pied » entre deux cartes ; la carte d'arrivée (sortie visée) est mise en évidence. Départ
    suivi d'une transition par la sortie de départ elle-même (on reprend la sortie par laquelle on vient d'apparaître,
    en entrées découplées) : bloc dédié « Reprendre cette sortie » quand le départ suit le jeu et que c'est l'entrée par
    laquelle on vient d'arriver (`link.position`), sinon « Prendre cette sortie » (départ choisi à la main, ou sortie la
    plus proche de Link en temps réel ; icône de demi-tour, zone et sortie en dessous) entre la carte de départ et la transition — seulement au
    départ, pour la lisibilité ;
  - entre deux cartes, un simple trait pour une transition (avec ses objets éventuels, et son coût si affiché), et une
    pastille pour les déplacements « actifs » (téléporteur bleu, vol du hibou, chant, sauvegarder-recharger, et marche
    vers une autre zone : course d'Igor, mains du Temple de l'Esprit) : libellé centré entre deux fois l'icône du mode, couleur propre au mode. Chant de
    téléportation : nom du chant seul (les notes autour suffisent), couleur du chant ;
  - bandeau dédié pour chaque changement d'âge (grande icône centrée `icons/route/age_child_to_adult.png` ou
    `age_adult_to_child.png`, titre « Changement d'âge », détail au survol) ;
  - résumé (transitions, chants, rechargements, changements d'âge). Les cartes n'indiquent pas l'âge (seul le bandeau le
  change). Icônes des modes : `icons/route/<mode>.png` (walk, transition, bluewarp, owl, reset), chant : icône de
  l'objet (`icons/songs/teleport/`).
- Résumé : compteurs centrés au-dessus du chemin, chacun avec l'icône et la couleur du mode concerné.
- Objets utilisés : sous chaque pastille (pas pour le changement d'âge, débloqué une fois pour toutes), icônes des objets du panneau retenus
  pour franchir l'étape (`needs` de `routeGraph`, `rgItem` : objet SoH → objet du panneau ; palier le plus haut, ordre
  du panneau ; capacités non mélangées, touches d'ocarina et clés non affichées ; un chant sous-entend l'Ocarina de Fée,
  qui n'est alors pas affiché ; le chant d'un chant de téléportation n'est pas répété sous sa pastille). Pour chaque passage SoH franchi (pour
  une marche, ceux du chemin trouvé dans la zone), on garde un ensemble minimal : la condition est réévaluée en retirant
  les objets un à un, les moins appréciés d'abord (`ROUTE_AVOID` : Épona, chants de téléportation, Missiles, magie,
  bâtons, noix ; `ROUTE_PREFER`, retirés en dernier : Carte Gerudo et écailles (sans action), grappins, arc, bottes,
  lance-pierre, boomerang, masse). Ex. raccourcis des Bois Perdus : écaille plutôt que bottes de plomb. Pour les objets
  affichés, les charpentiers de la Forteresse ne comptent comme libérés que s'ils le sont vraiment (cochés dans Checks :
  4 en Normal, celui de la cellule à 1 torche en Rapide, ou Carte Gerudo de leur récompense) : le pont de la Vallée
  Gerudo ne demande alors plus rien. Seuls les objets du panneau peuvent être retirés (pas les capacités non mélangées ni les clés).
  Ex. pont de la Vallée Gerudo : Grappin long plutôt qu'Épona ; gardes Gerudo : Carte Gerudo plutôt qu'arc ou grappin.
  S'il existe d'autres solutions (jusqu'à 4, trouvées en retirant les objets des solutions déjà vues), repère « ou… » à
  côté des icônes, et le détail au survol (« Arc (au lieu de Carte Gerudo) »). Calcul seulement pour le trajet affiché.
  Les objets cachés derrière un événement de logique ne sont pas montrés.
- Coûts masqués par défaut ; case « Afficher les coûts » dans la barre de gauche (`ui.router.showCost`, sauvegardée) : coût total dans le
  résumé et « Coût : X » en petit sous le libellé de chaque pastille.
- Case « Seulement les lieux accessibles » dans la barre de gauche (`ui.router.onlyReachable`, cochée par défaut) : les
  listes de zones et de sorties du départ et de l'arrivée ne proposent que les sorties accessibles d'après la logique
  (`reachC` : une de leurs régions SoH est accessible, avec les objets notés et les entrées notées ou d'origine — une
  entrée mélangée pas encore notée est une impasse), et les zones qui en ont au moins une. La zone et la sortie déjà
  choisies restent toujours proposées.
- Si aucun chemin : expliquer les causes possibles (sorties non découvertes, objet ou âge manquant).

## Statistiques
Page « Statistiques » (`ui.view` = `stats`) : chronologie de la partie.
- `game.timeline` (sauvegardé, remis à zéro avec la partie) : chaque hausse d'un objet ou d'un chant du panneau Objets
  (`{ k:'items'|'songs', id, v }`, v = palier ou nombre atteint) et chaque check coché (`{ k:'checks', id }`), avec
  l'heure (`t`, ms). Une baisse ou un check décoché retire ses entrées. Observateur synchrone (`state.js`) ; pas
  d'entrée pour les ajustements automatiques (premier palier, objets de départ : `timelineSkip`). Ce que la sauvegarde
  du jeu contenait déjà à la connexion de l'auto-tracking (première sauvegarde complète reçue) est noté sans heure
  (« avant le suivi », `timelineQuiet`).
- Début de la partie : `game.runStart` = `ship.stats.firstInput` de la sauvegarde du jeu (auto-tracking), sinon le
  premier événement daté (origine des heures et de la courbe quand il n'y a pas de temps de jeu).
- Temps de jeu : le jeu n'envoie pas son compteur (`playTimer` de sa sauvegarde) ; l'appli cumule les périodes où le jeu
  est connecté au relais avec la partie notée chargée (`game.play` : `[[début, fin], …]`, heure réelle, mises à jour
  toutes les 10 s, nouvelle période après une coupure de plus de 30 s ; `linkPlayTick` de `link.js`) — seulement les
  sessions jouées avec l'auto-tracking ; démarre dès que la partie est chargée ; affiché à la seconde pendant qu'on joue
  (`playNow` : périodes enregistrées plus le temps écoulé depuis la fin de la dernière). Heures de la chronologie en temps
  de jeu (temps de jeu cumulé à l'heure de l'événement ; sans temps de jeu, heure réelle depuis le début) ; courbe des
  checks seulement en temps de jeu.
- Contenu : avancement — temps de jeu, checks faits, entrées trouvées (s'il y a des entrées mélangées) ; courbe en
  escalier des checks faits au fil du temps de jeu ; chronologie (plus récent d'abord) filtrable « Objets et chants » / « Checks » /
  « Tout », avec l'objet trouvé dans le check quand il est connu.

## Fenêtre de stream
Bouton « Fenêtre de stream ↗ » (barre de gauche) : ouvre `index.html?stream` dans une fenêtre à part (`STREAM_MODE`), à
capturer dans OBS (« Capture de fenêtre » + filtre d'incrustation sur le fond vert ; une source « Navigateur » d'OBS
a son propre stockage et ne verrait pas la partie).
- Widgets (code : `js/stream.js`) disposés librement sur un fond uni (vert d'incrustation par défaut, magenta, transparent, fond de l'appli ou
  couleur au choix) : Objets (le panneau Objets, sur 1 ou 2 colonnes), Progression (cadres Checks et Entrées côte à côte ;
  Checks seul, centré, sans entrées mélangées), Trouvailles, Connexions, Carte (zone de Link : celle de sa scène en temps réel, sinon de sa dernière
  entrée ; carte seule, sans boutons ni légende, flèche de Link comprise ; type `zonemap`), Espace vide (emplacement du jeu, cadre doré en option), Image (chemin, adresse ou
  fichier choisi, gardé en data URL), Texte ; widgets de la page Statistiques : Compteurs (tuiles au choix : temps de
  jeu, checks faits, entrées trouvées ; `stattiles`), Courbe des checks (au fil du temps de jeu, titre en option ;
  `statcurve`), Chronologie (dernières lignes de la chronologie : objets et chants, checks ou tout, nombre de lignes,
  temps de jeu de chaque ligne en option ; `timeline`). Le temps de jeu défile à la seconde dans la fenêtre de stream
  tant que la fenêtre principale prolonge la période de jeu (toutes les 10 s). Contenus à leur largeur naturelle, mis à l'échelle de la largeur du bloc
  (`zoom`) ; Espace vide, Image et Texte à la taille du bloc.
- **Dispositions** (profils) : plusieurs dispositions nommées, une seule affichée ; chacune a son fond, sa toile et ses widgets.
  Gardées à part (localStorage `oeil-sheikah-stream`, `{ v:2, active, profiles:[{ id, name, bg, color, widgets }], ed }`).
  Ancienne disposition unique (fond + blocs) reprise comme « Disposition 1 » : blocs de types disparus (Prochaine
  étape, Où aller) retirés, « map » = Connexions, Progression et Trouvailles encore à leur toute première place mises à
  la nouvelle. Disposition par défaut (1920 × 1080) : Objets à gauche, Trouvailles en dessous ; emplacement du jeu à
  droite, Progression sous lui sur toute sa largeur.
- **Toile** (par disposition : `canvas { w, h }`, `fit`) : taille de la disposition — Full HD 1920 × 1080 (par défaut, et
  pour les dispositions d'avant), HD 1280 × 720, QHD, 4K, vertical 1080 × 1920 ou personnalisée (200 à 7680 px) ;
  affichée à l'échelle de la fenêtre (« Ajuster à la fenêtre », par défaut : la disposition est toujours entière,
  pourcentage affiché) ou à 100 %. Hors édition, ce qui dépasse de la toile est coupé ; en édition, la toile est
  entourée d'un pointillé. « Fenêtre à la taille de la toile » redimensionne la fenêtre de stream à la taille exacte
  (capture OBS la plus nette ; message si le navigateur ou l'écran la limite) ; le bouton « Fenêtre de stream » de
  l'appli l'ouvre déjà à la taille de la toile de la disposition affichée. Positions et aimantation en px de la toile.
- **Édition** : touche E (ou double-clic) ouvre l'éditeur, panneau latéral (à droite, ⇆ pour le passer à gauche) :
  - Disposition : choix de la disposition affichée, nom, Nouvelle (widgets par défaut), Dupliquer, Supprimer (confirmé ;
    pas la dernière), Exporter… (fichier JSON de la disposition affichée), Importer… (ajoutée comme nouvelle disposition,
    aussi l'ancien format), Par défaut (widgets par défaut dans la disposition affichée), fond.
  - Ajouter un widget : bibliothèque par rubrique (Partie, Cartes, Décor) ; le nouveau widget est sélectionné.
  - Widget choisi : ses options, position et taille au pixel, Dupliquer, Premier plan, Arrière-plan, Retirer.
  - Calques, du premier plan à l'arrière (ordre du tableau `widgets`, le dernier devant) : sélection, masquer (estompé
    en édition, absent sinon), verrouiller (ni déplacé, ni redimensionné, ni retiré), monter / descendre d'un cran.
  - Aimantation (préférences `ed`) : bords et centres des autres widgets visibles et de l'écran, à 8 px près, repère
    rose affiché ; sinon grille (aucune, 10, 20 ou 40 px ; affichable) ; Alt pendant le glissement : sans aimantation.
  - Annuler / Rétablir (Ctrl+Z, Ctrl+Y ou Ctrl+Maj+Z) : instantanés de la disposition 300 ms après la dernière
    modification (un glissement = une étape), 60 au plus, remis à zéro en changeant de disposition.
  - Clavier : flèches (1 px, Maj : 10 px), Suppr, Ctrl+D (dupliquer), Échap (désélectionner) ; clic dans le vide :
    désélectionner. Glisser un widget le déplace, son coin bas-droit le redimensionne.
- La partie vient de la fenêtre principale : la fenêtre de stream relit le `store` à chaque sauvegarde de celle-ci
  (événement `storage`, même navigateur), ne sauvegarde rien et ne se connecte pas au relais (trouvailles comptées
  une seule fois) ; la position (en temps réel et dernière entrée) lui vient de même (localStorage `oeil-sheikah-live`). Blocs non cliquables (affichage seul).

## Indices
Page « Indices » (`ui.view` = `hints`, groupe Progression) : les 40 pierres à potins (`GOSSIP_STONES` de `checks.js`,
id = nom de la pierre dans le spoiler de SoH, zone de la page Checks, libellé français), groupées par zone.
- Le jeu ne signale pas la lecture d'une pierre (ni paquet au relais, ni trace dans la sauvegarde : vérifié en jeu) :
  le joueur la marque lue d'un clic (`setHintRead`, `game.hints[id]`, sauvegardé, remis à zéro avec la partie).
- Avec le spoiler caché (`linkSpoilerHint` : seed du jeu connecté = celui du spoiler, ou pas de jeu connecté), l'indice
  est rempli dès qu'elle est marquée lue, jamais avant : message (langue du jeu), type (voie du héros, futile, objet,
  objet dans une zone, épreuve, sans indice), zone (celle du check cité, sinon le nom de la zone dans l'indice,
  `hintArea` : noms français ou anglais du jeu et alias — Temple du Temps → Bourg, Repaire des Voleurs → Forteresse,
  poches de Link → aucune), check visé (indice d'objet seulement : un indice « objet dans une zone » ne dit pas où).
  Sans spoiler : type, zone et texte à saisir ; « Modifier » pour corriger un indice rempli.
- Synthèse en tête : zones sur la voie du héros, zones futiles, pierres lues. Dans Checks (`hintsC`) : badges de zone
  « Voie du héros » (doré), « Futile » (pointillés), nombre d'indices d'objet de la zone (texte au survol) ; icône
  d'indice à côté d'un check visé par un indice d'objet. Carte de zone : voie du héros = contour doré et en-tête teinté ;
  futile = estompée et désaturée (normale au survol). Liste des zones de la barre de gauche : voie du héros en doré avec
  ★, futile estompée et barrée.

## Carte
Page « Carte » (`ui.view` = `map`, composant `ZoneMap` de `components.js`) : où se trouve chaque sortie, sur le terrain
du jeu vu de dessus (nord en haut).
- Données : `data/maps-data.js` (`window.MAPS_DATA`), **généré** depuis la ROM de l'utilisateur (N64 ou GameCube,
  compressée ou non : l'outil décompresse les fichiers Yaz0 et trouve seul la table des scènes ; `--mq=` : ROM Master
  Quest, facultative) par `tools/soh-maps/extract_maps.mjs` et **non versionné** (la géométrie vient de la cartouche). Sans ce fichier, la
  page explique comment le produire. Scènes d'extérieur des zones (23, dont l'entrée du bourg, la place, le parvis du
  temple, la ruelle, et le château enfant et adulte) : sols et pentes de la collision (normale vers le haut, même raide :
  toits, rampes, falaises, sinon des trous noirs vus de dessus) en triangles avec leur hauteur, et murs (polygones
  verticaux d'au moins 60 unités de haut et de long, tracés selon leur étendue vue de dessus : les pans fins feraient des
  pointes).
- Position d'une sortie : point d'apparition de Link de l'entrée qui y fait arriver (table des entrées de SoH : scène et
  numéro d'entrée dans la scène ; liste des entrées de la scène : point d'apparition) ; sortie située dans un intérieur :
  à sa porte (sortie d'origine associée) ; grotte : point de retour de la grotte ; envol du hibou : position du hibou
  (acteurs des salles). Sans position : rivière Gerudo, plateforme du Prélude, fontaine de la Grande Fée du Château de
  Ganon.
- **Intérieur dessiné** : Temple du Temps (onglet de la zone du Bourg), comme un donjon — ses checks y sont placés et
  restent comptés à sa porte sur la carte du parvis.
- **Donjons** : scène de chaque donjon (Château de Ganon : château et tour) et de sa salle du boss, en onglets (donjon
  d'abord). Étages des dix donjons de la carte du menu pause (`z_map_data.c` de SoH : `sFloorCoordY`, hauteur au-dessus
  de laquelle on est à un étage, et `sFloorID`, son nom) : sélecteur à droite de la carte (du plus haut au plus bas,
  pastille verte : checks à faire à cet étage, point : vous êtes ici), un étage à la fois — sol dont la hauteur est dans
  sa tranche (teintes claires), murs qui la traversent, cadrage sur l'étage ; sol des autres étages en fond, gris neutre
  très atténué (contours des salles autour des fosses et passerelles) ; repères (sorties, checks) à l'étage de leur hauteur. Étage
  affiché par défaut : celui de la position, sinon celui de l'entrée. Tour de Ganon (pas d'étages dans le jeu) : étages
  d'après le sol (paliers : hauteurs où il y a beaucoup de sol, limite à mi-hauteur), 1F à 6F depuis le bas.
  - Décors mobiles : leur sol n'est pas dans la collision de la scène. Couloirs tordus du Temple de la Forêt
    (Bg_Mori_Hineri, à l'état droit) : collision de leur objet (table des objets de la ROM ; en-tête à l'adresse de la
    décompilation, sinon le seul de l'objet), placée comme l'acteur (position, rotation) ; le coffre de la clé du boss
    qu'ils font apparaître est placé à (+147, −245, −453) du premier. Autres décors mobiles (plateformes, ascenseurs) :
    pas de sol à leur place.
  - Version : selon celle du donjon (`areaQuest`). Master Quest : scène « …_MQ » (ROM Master Quest : sol, sorties
    `exitsMq`, checks `checksMq`), sinon carte vanilla et un avertissement ; version inconnue : les deux cartes en
    onglets. Checks vanilla placés avec la ROM principale, Master Quest avec la ROM Master Quest (mêmes paramètres
    d'acteur dans SoH pour les deux versions : jamais l'un avec l'autre).
  - Checks des donjons : à leur position (coffres, Skulltulas, pots, caisses… ; pestes Mojo marchandes : En_Shopnuts ;
    réceptacle et récompense du boss : centre de la salle du boss), et toujours aussi à la porte du donjon sur la carte
    de l'extérieur ; check du donjon sans position (fées des chants, Sheik…) : « sans position ».
- **Positions notées en jouant** (checks sans acteur fixe : personnages, échanges, fées des chants, poissons…) :
  `tools/soh-maps/capture_positions.mjs` (ou `lancer-capture.bat`), faux serveur Anchor lancé à la place du relais, déclare
  au jeu un second joueur « Capture » qui suit Link de scène en scène (caché sous le sol) ; le jeu envoie alors la
  position de Link à chaque image (il ne l'envoie qu'aux autres joueurs de sa scène). Check ramassé (statut « ramassé ») :
  position de Link à ce moment, notée dans `tools/soh-maps/positions.json` (versionné : coordonnées seulement), pour les
  checks sans position (`--all` : tous ; `--list` : ceux qui restent, par zone ; `--v` / `--mq` : donjons vanilla / Master
  Quest seulement, checks communs compris). `extract_maps.mjs` la reprend pour les
  checks sans position (scène d'extérieur ou de donjon ; donjon Master Quest : check MQ dans la scène « …_MQ », check
  commun dans les deux versions).
- **Placer les checks à la main** (bouton « ✎ Placer les checks » au-dessus de la carte, affiché seulement avec l'option
  Configuration > Routeur et carte > « Outil « Placer les checks » », `ui.map.editTool`, désactivée par défaut) : panneau listant les checks de la
  zone sans position (ni placés par l'outil, ni rattachés à un lieu non dessiné ; version du donjon affichée) ; cocher un
  ou plusieurs checks puis cliquer sur la carte les y place (hauteur : sol de l'étage affiché sous le clic) ; « déplacer »,
  « retirer » ; carrés dorés sur la carte. Donjons : les deux versions (vanilla, Master Quest) en onglets, quelle que soit
  la version du donjon. Gardées dans localStorage `oeil-sheikah-positions` (à part de la partie) ;
  « Exporter » télécharge `positions-manuelles.json`, à déposer dans `tools/soh-maps/` (versionné) : `extract_maps.mjs`
  le reprend comme `positions.json` (et l'emporte sur lui). Checks sans lieu dans le monde : Poche de Link à la maison de Link, Cadeau de Rauru
  (Chambre des Sages) au piédestal de l'Épée de Légende.
- Affichage : zone choisie (`ui.map.area`, sinon celle de la position ; menu groupé par région — Forêt, Plaine et
  château, Cocorico, Montagne du Péril, Zoras, Lac Hylia, Désert Gerudo —, chaque donjon avec sa région), onglets si elle
  a plusieurs scènes ; sol en
  10 teintes par tranches de hauteur réparties selon le terrain présent (quantiles), murs en traits sombres ; un repère
  par position (une porte et l'intérieur derrière partagent un repère), forme et couleur par type — intérieur : porte
  (arceau), changement de zone : flèche vers l'extérieur de la zone (à l'opposé de l'orientation de Link quand il
  apparaît à la sortie, `exitRot` ; à défaut du centre de la scène vers le repère ; arrondie au huitième de tour ;
  corrigée à la main quand le point d'apparition trompe, `EXIT_ARROW` : vers le temple au Bourg, sortie sud des abords
  du château, raccourci du tunnel du Village Goron), grotte : rond percé, donjon : écusson, hibou : tête à deux oreilles (les checks
  restent des ronds ; mêmes formes dans la légende) ; cadrage sur les repères,
  zoom à la molette et boutons, déplacement en glissant, « tout le terrain ». Hauteur : ce qui reste à l'écran sous la
  carte, moins la légende et le bandeau du bas (260 px au moins), recalculée au redimensionnement. Mis en évidence : position (auto-tracking,
  sinon départ du Routeur), prochaine sortie à prendre (première transition du trajet), arrivée du Routeur. Clic sur un
  repère : ses sorties, leur destination notée, « Partir d'ici » (départ du Routeur) et « Y aller » (arrivée).
- État d'une sortie (sa sortie principale, pas celle placée à sa porte) : destination inconnue (entrée mélangée pas encore
  notée : `effC` vide) — « ? » blanc sur le repère ; pas encore accessible = ne peut pas encore être prise (`canTake` du
  graphe du Routeur : région de départ de son entrée SoH accessible à un âge et passage franchissable à cet âge — une tombe
  du cimetière demande Saisir… ; salle de boss : une de ses régions accessible, `reachC`) — repère estompé et désaturé. Légende : « destination inconnue », « pas encore accessible ».
- Arrivées seules (`destinationOnly` : plateformes de téléportation, atterrissage du hibou, arrivée de la rivière Gerudo)
  masquées : on ne peut pas les prendre — sauf si c'est la position, l'arrivée du Routeur ou la prochaine sortie.
- Légende sous la carte : forme et couleur des repères par type (changement de zone doré, intérieur bleu canard, grotte brune, donjon
  violet, hibou beige), anneaux (position, prochaine sortie, arrivée) et dégradé du terrain.
- « Voir sur la carte » : bouton carte sur chaque carte du trajet du Routeur, et clic sur la prochaine étape du bandeau
  « Où aller ? » (sortie à prendre).
- **Checks et pierres à potins** (barre au-dessus de la carte : « Checks » Comme la page Checks / Tous / Aucun,
  `ui.map.checks` = `filters` / `all` / `off` ; « Pierres à potins » Affichées / Masquées, `ui.map.stones`). Jamais affichés : checks non
  mélangés selon la configuration, d'une autre version du donjon, exclus (zone ignorée…). « Comme la page Checks » :
  aussi ses filtres (catégories, âge, checks faits masqués, seulement les faisables, recherche) ; « Tous » : faits compris
  (en gris).
  - Check d'une scène d'extérieur : point à sa position (outil : position x, z donnée par SoH pour jarres, caisses, herbes,
    buissons, arbres ; sinon acteur des salles de même type et paramètres, toutes versions de la salle ; Skulltula : même
    numéro de symbole, carré de terre pour celles des haricots ; fées d'une pierre ou d'un carré de terre : à la pierre ou
    au carré). Vert : faisable maintenant ; rouge : pas encore ; gris : fait.
  - Check d'un intérieur, d'une grotte ou d'un donjon : carré compteur (checks à faire) à côté de la porte qui mène à son
    lieu **selon les entrées notées** (outil : lieu = sortie où l'on apparaît en y entrant, en remontant la logique de SoH ;
    appli : sortie dont la destination est ce lieu ; porte située dans un donjon ou un autre intérieur : on remonte jusqu'à
    l'extérieur — entrée du donjon, `areaEntry`). Entrée pas encore notée : pas de repère.
  - Pierres à potins : losange (plein : lue ; pierre de grotte : à côté de la porte de la grotte).
  - Clic : check — marquer fait / à faire, « Y aller » (Routeur) ; carré — liste des checks du lieu à cocher ; pierre —
    message si lue, marquer lue / non lue.
  - Sous la carte : checks de la zone sans repère (sans position connue : personnages, quelques fées, poissons… ; ou
    derrière une entrée pas encore notée), dépliables et à cocher.

## Connexions
Page « Connexions » (`ui.view` = `graph`, composant `EntranceGraph` de `components.js`) : schéma (graphe) des entrées
connues.
- Zones placées à peu près comme sur la carte d'Hyrule (`GRAPH_POS`), donjons en plus petit à côté de leur zone ; nœud
  « Apparitions et chants » à part (apparitions et chants de téléportation, en pointillés).
- Une liaison par paire de nœuds pour les entrées connues (`effC` : notées, ou d'origine quand elles ne sont pas
  mélangées) ; couleur selon le type de la sortie (passage, intérieur, grotte, donjon, boss, hibou, apparition / chant),
  épaisseur selon le nombre de sorties regroupées, flèche quand un seul sens est connu (entrées découplées, sens
  uniques) ; détail des sorties au survol du trait.
- Intérieurs et grottes : petit point autour de leur zone (sortie située dedans : celle de la paire dont le nom SoH
  n'est pas l'entrée, `graphInside`), seulement s'ils mènent ailleurs que dans leur zone, orienté vers leur liaison.
- Position (auto-tracking, sinon départ du Routeur) : anneau doré qui pulse. Survol d'un nœud : ses liaisons en
  évidence, le reste estompé. Clic : liste de ses connexions sous la carte (sortie → destination), « Y aller » vers la
  zone (Routeur).

## Où aller maintenant ?
Bandeau collé en bas de la zone principale, sur toutes les pages (ne prend la place d'aucune), repliable
(`ui.next.open`, replié par défaut) et masquable (× ou case « Bandeau « Où aller ? » » de la barre de gauche, page
Routeur : `ui.next.enabled`, rien n'est alors calculé). Deux modes (`ui.next.follow`) : **Routeur** dès qu'une
destination est fixée à la main (page Routeur, « Y aller » de la Carte, des Entrées, des Checks) — barre : première étape
vers elle, « Destination : zone · sortie » (nombre d'étapes, ou « Aucun trajet connu vers »), « Routeur » (ouvre la page)
et « Auto » (revient au mode automatique sans toucher au Routeur) ; retour automatique à l'arrivée (le départ devient la
destination : position en direct ou sortie où l'on apparaît). **Auto** : le bandeau calcule lui-même la route vers sa
cible, sans passer par le Routeur : le check faisable le plus proche, ou celui choisi dans sa liste (`dockTarget`, non gardé, tant qu'il
reste faisable), depuis le départ du Routeur, à l'âge où il est le plus proche (`shortest` vers une de ses régions).
Barre : première étape de cette route (mode de déplacement → zone · sortie à prendre, ou arrivée pour un chant, un
sauvegarder-recharger, un changement d'âge ; « À pied, dans la zone » s'il n'y en a pas ; clic : voir sur la carte),
check visé (« le plus proche » ou « choisi », zone, nombre d'étapes) avec « Y aller » (ouvre la route dans le Routeur),
nombre de checks faisables. Déplié : la route complète (étapes numérotées, clic : voir sur la carte, « puis à pied jusqu'au
check »), puis les 12 plus proches en cartes (icône de catégorie, libellé, zone, « à pied » ou « N étapes », « adulte » si
on s'y rend en adulte ; cible encadrée) ; un clic fait du check la cible du bandeau (un second clic revient au plus proche).

Les trajets ne passent que par des entrées connues (notées, ou d'origine) : graphe du Routeur, où une entrée mélangée
non notée est une impasse.
- Proximité depuis le départ du Routeur (donc la position en direct si l'auto-tracking la suit) et son âge :
  exploration complète du graphe du Routeur (`reachAll` dans `entrances.js`, même Dijkstra que `shortest`, coûts du
  Routeur) ; chaque région SoH joignable à pied depuis un état reçoit le coût de l'état plus la marche estimée par
  région traversée (`costs.walk`) ; un check prend le coût de la meilleure de ses régions (`CHECK_REGIONS`), à un âge
  où il est faisable maintenant (`sohC`). Étapes = déplacements hors marche.
- Checks proposés : comme la page Checks (mélangés, version active, non exclus, catégories affichées), pas faits,
  faisables maintenant.
- Sans départ dans le Routeur : invitation à en choisir un (ou à activer la position en direct).

## Auto-tracking (en cours)
Suivi en direct d'une partie de Ship of Harkinian, sans modifier le jeu.
- **Relais** `tools/soh-link/relay.mjs` (Node, sans dépendance), lancé à la main pendant qu'on joue (sous Windows :
  double-clic sur `lancer-relais.bat` à la racine, qui vérifie la présence de Node et transmet ses arguments ; fermer
  la fenêtre l'arrête). L'appli se reconnecte seule si le relais est relancé (le relais demande un nouvel essai au bout de
  2 s ; si le navigateur abandonne, l'appli relance la connexion au bout de 5 s). SoH s'y connecte
  avec son mode multijoueur Anchor (menu Réseau > Anchor : Host `127.0.0.1`, port `43383`, Room ID au choix, pas la
  salle globale) : TCP, messages JSON séparés par un octet nul. Le relais répond à la poignée de main (liste des joueurs
  avec le jeu marqué `self`, état de salle avec `syncItemsAndFlags` activé, sans quoi le jeu n'envoie pas sa
  sauvegarde), demande la sauvegarde complète (`REQUEST_TEAM_STATE` → `UPDATE_TEAM_STATE`), et transmet les événements
  à l'appli par un flux SSE (`http://127.0.0.1:43390/events` ; `POST /request-state` pour relire la sauvegarde).
  **Lecture seule** : il n'envoie au jeu que `ALL_CLIENT_STATE`, `UPDATE_ROOM_STATE` et `REQUEST_TEAM_STATE`, jamais
  d'objet, de drapeau ni d'état d'équipe (qu'un vrai serveur Anchor peut appliquer à la sauvegarde). Mouvements du
  joueur résumés (scène, entrée d'arrivée, âge, seulement quand ils changent) ; `--dump` enregistre les paquets reçus.
- **Test** `tools/soh-link/replay_packets.mjs` : rejoue un enregistrement de référence (`fixtures/session.json`,
  fabriqué par `--make-fixture` depuis un `--dump` et le spoiler de la seed) dans l'appli (fichiers `js/` dans Node, Vue
  simulé) ; écart = erreur : sans spoiler, entrées notées et objets trouvés conformes au spoiler, bonne arrivée parmi les
  choix de chaque question ; avec le spoiler caché, position après chaque entrée découverte = destination du spoiler.
  Affiche aussi les arrivées où la position diffère sans spoiler (arrivées ambiguës).
- **Appli** (`js/link.js`) : voyant dans le pied de la barre de gauche (gris : désactivé, orange : relais introuvable,
  doré : relais prêt, vert : jeu connecté), fenêtre « Auto-tracking » (mode d'emploi, activation et adresse du relais
  dans `ui.link`, état, « Relire la sauvegarde », journal des événements). Reconnexion automatique.
- **Sauvegarde suivie** : la partie notée retient la seed (état du client) et la date de création du fichier
  (`ship.stats.fileCreatedAt` de la sauvegarde complète) de la première sauvegarde reçue (`game.save`, remise à zéro avec
  la partie). Si le jeu charge une autre sauvegarde (autre seed ou autre fichier), tous ses événements sont ignorés
  (checks, objets, entrées, position) et la fenêtre Auto-tracking le signale, avec « Suivre cette sauvegarde » (elle
  devient celle de la partie, puis relecture). Écran titre : rien n'est conclu. Sans cette règle, les checks d'une autre
  sauvegarde resteraient cochés (jamais décochés, voir ci-dessous).
- **Écart avec la sauvegarde** : à chaque sauvegarde complète, une fois appliqué ce que l'auto-tracking suit (options),
  l'appli relève tout ce qui diffère encore entre la partie notée et le jeu (`link.drift`, `linkDrift`) : checks cochés
  ici mais pas faits dans le jeu (statut SoH sous « ramassé » : coché à la main, ramassé puis perdu sans sauvegarder,
  venu d'une autre sauvegarde), checks faits dans le jeu mais pas cochés (suivi des checks désactivé), objets et chants,
  carte / boussole / clé du boss / âme de chaque donjon, clés des portes et haricots (mêmes règles que le suivi des
  objets, `linkExpected` : cœurs selon le total du jeu, petites clés non comparées car le jeu ne garde que celles en
  poche). Une fenêtre s'ouvre d'elle-même (une fois par liste, si aucune autre n'est ouverte ; « Plus tard » la ferme) :
  une section par type, une ligne par écart (valeur ici → valeur dans le jeu) ; ce qui est coché est corrigé d'après le
  jeu, le reste est gardé tel quel (`game.keepDrift` : clé → « ici>jeu », plus signalé tant que l'écart ne change pas).
  Rappel avec « Voir » dans la fenêtre Auto-tracking tant qu'il reste un écart. Les entrées ne sont pas comparées (le
  jeu ne dit pas où mène une entrée découverte).
- **Checks** (option « les checks faits », `ui.link.checks`) : un check fait dans le jeu (statut SoH « ramassé » ou
  « sauvegardé », `SET_CHECK_STATUS` en direct, et tous ceux de la sauvegarde complète `rando.itemLocations`) est coché ;
  jamais décoché (un check coché à la main reste coché). Le jeu désigne les checks par leur numéro dans l'énumération
  `RandomizerCheck` de SoH : `nums` de `checks-data.js` (généré), `CHECK_BY_NUM`.
- **Objets** (option « les objets », `ui.link.items`) : le panneau Objets reprend la sauvegarde complète
  (`linkSaveToGame`) : emplacements d'inventaire, équipement, améliorations (capacités ; « infini » par les drapeaux du
  randomizer), objets de quête (médaillons, pierres, chants, Pierre de Souffrance, Carte Gerudo), Skulltulas, Triforce,
  magie, double défense, drapeaux du randomizer (`ship.randomizerInf` : capacités, touches d'ocarina, bourse, clé
  squelette, Greg, canne à pêche, plume de Roc, objets d'échange possédés, âmes de boss, âmes de haricot, clés des
  portes), cartes, boussoles et clés de boss des donjons. Exceptions : petites clés (le jeu ne garde que celles en
  poche : jamais moins que ce qu'il montre, plus celles ramassées en direct via `UPDATE_DUNGEON_ITEMS`), cœurs (seul le
  total de la jauge est connu : réceptacles notés conservés, quarts ajustés), objets verrouillés, chant de
  l'Épouvantail. Le relais redemande la sauvegarde complète après chaque objet reçu (`GIVE_ITEM`, objets de donjon).
  Numéros des drapeaux : `data/link-data.js`, **généré** par `tools/soh-link/gen_link_data.mjs`.
- **Position en temps réel** (option « la position en temps réel (Carte) », `ui.link.live`, désactivée par défaut) : le
  jeu n'envoie la position de Link (PLAYER_UPDATE, à chaque image) qu'aux autres joueurs de sa scène ; l'appli demande
  au relais (`POST /live?on=1|0`, à chaque connexion et à chaque changement de l'option) de déclarer un second joueur
  fictif « L'Oeil Sheikah » (sans « Œ », absent de la police du jeu), qui suit Link de scène en scène, caché sous le sol (le jeu affiche « Connected »). Le relais
  transmet la position (`live` : scène, x, y, z, orientation, âge) au plus 10 fois par seconde, quand elle change ; sans
  appli connectée, il retire le joueur fictif. Carte : flèche bleue orientée sur un halo, à l'étage de sa hauteur ; la
  carte suit la zone (menu sur sa position), la scène et l'étage de Link tant qu'on n'en choisit pas d'autres ; l'anneau
  « vous êtes ici » (dernière entrée prise) devient continu, « dernière entrée ». Noms des scènes : `LINK_DATA.scenes` ;
  variantes de nuit et en ruines (Bourg, entrée du bourg, ruelle, parvis du temple) rattachées à la version de jour, celle
  qui est dessinée (`SCENE_DRAWN`). « Ma position » remet aussi l'onglet et l'étage sur ceux de Link.
  Âge en direct (envoyé avec la position) : il l'emporte sur l'âge déduit (position et départ du Routeur). Départ du
  Routeur (avec l'option « la position ») : la sortie la plus proche de Link dans sa scène (`linkLiveStart` : à moins de
  250 unités de hauteur et 800 de distance, pas les sorties placées à leur porte ni les apparitions ; changement
  seulement si elle est plus proche de 150 unités que le départ actuel) — le Routeur et « Où aller ? » partent de là.
- **Position** (option « la position », `ui.link.position`) : sortie où l'on vient d'apparaître, d'après l'entrée
  d'arrivée du jeu (`entranceIndex` de l'état du client, `UPDATE_CLIENT_STATE`, envoyé à chaque changement de scène,
  via `EXIT_BY_ARRIVAL`), et âge. Le jeu n'envoie l'âge (`linkAge`) que dans les mises à jour du joueur (`PLAYER_UPDATE`),
  réservées aux autres joueurs présents dans la scène (donc en pratique pas au relais), et ne le met pas dans la
  sauvegarde complète : il se déduit au chargement d'une partie (on apparaît au point d'apparition de son âge : âge du
  seul point d'apparition, noté ou d'origine, qui mène là) et au voyage dans le temps (épée de légende : le Temple du
  Temps est rechargé par l'entrée `ENTR_TEMPLE_OF_TIME_2`, 0x2CA, dans les deux sens ; l'âge connu est inversé et la
  position devient le Temple du Temps). Âge connu = celui du départ du Routeur quand il suit la position (une correction
  à la main est donc reprise), sinon le dernier déduit. L'état répété à la connexion de l'appli ne compte pas comme un
  nouveau voyage dans le temps. Position affichée dans la fenêtre Auto-tracking, et le départ du Routeur la suit
  (mention « Départ suivi en direct » ; le bloc « Départ » du formulaire et la carte de départ du trajet s'appellent
  alors « Position actuelle »).
  Tant que le départ est suivi en direct (jeu connecté), la prochaine étape du trajet est mise en lumière : trait doré
  depuis le départ, déplacement et éventuel changement d'âge, et carte suivante marquée « Prochaine destination » (ou
  « Arrivée »), entourée d'un anneau doré qui respire (fixe si l'utilisateur réduit les animations). Si la prochaine
  étape est de prendre la sortie de départ, c'est le bloc « Reprendre cette sortie » (ou « Prendre », voir Trajet) qui est
  mis en lumière (« Prochaine étape »), et la carte suivante reste normale.
  Entrée d'arrivée inconnue (grotte non reconnue, zones non mélangées, écran titre) : position inchangée. Entrée
  d'arrivée partagée par plusieurs grottes (voir Entrées) : la position retient la seule de ces grottes où mène une
  sortie (notée ou d'origine) de la zone d'où l'on vient, s'il n'y en a qu'une. Sortie de grotte : voir Entrées. Entrée
  générique qui sert aussi aux retours de grotte (porte principale de Cocorico…), quand on ne sort pas d'une grotte
  reconnue : en pools mélangés, n'importe quelle sortie peut mener à un retour de grotte ; la position retient la seule
  de ces arrivées où mène une sortie (notée ou d'origine) de la zone d'où l'on vient, à défaut l'arrivée normale.
- **Trouvailles** (option « les trouvailles », `ui.link.loot`, pour le fun) : objets reçus (`GIVE_ITEM`) comptés dans
  `game.loot` et affichés en bas du panneau Objets : pièges de glace, rubis (nombre et valeur), munitions et cœurs
  (bombes, noix, missiles, bâtons, graines, flèches, magie, cœur). Seulement pendant que l'auto-tracking tourne (le jeu
  n'envoie pas de compteur), et pas les objets ramassés par terre sans fenêtre « objet obtenu ». Icônes
  `icons/loots/ice_trap.png`, `rupee.png`, `junk.png` (dessin de repli sinon).
- **Objet trouvé** (option « Afficher l'objet trouvé » de la page Checks, `ui.checks.showFound`) : le jeu envoie, à
  quelques millisecondes d'écart et dans un ordre variable, « objet reçu » et « check ramassé » ; ils sont appariés
  (400 ms) et l'objet est noté (`game.found`, numéro RandomizerGet). Affiché à la suite du libellé du check : icône et
  nom du panneau Objets, sinon nom français de SoH (`rgFr`, `item_list.cpp`). Seulement pour les checks faits pendant
  que l'auto-tracking tourne (le jeu ne dit pas ce que contenaient les checks faits avant).
- **Spoiler caché** (facultatif, fenêtre Auto-tracking : « Charger le spoiler… », ou en même temps que l'import de la
  Configuration : option « Spoiler caché pour l’auto-tracking » de la fenêtre d'import, `ui.importLinkSpoiler`, Oui par défaut) : le fichier spoiler de la seed est
  gardé à part (localStorage `oeil-sheikah-spoiler`, jamais affiché tel quel) et ne sert qu'à révéler ce que le jeu a
  déjà montré, seulement si son `finalSeed` est le seed envoyé par le jeu : objet de chaque check ramassé (statut SoH 4+,
  y compris ceux faits avant de lancer le relais, d'après la sauvegarde complète) ; objets des boutiques, pestes et
  marchands vus (statut 1+ : `game.seen`, l'apparence de l'objet, comme en jeu, pour ne pas trahir un piège de glace
  déguisé ; affichés en pointillés) ; leur prix une fois identifiés (statut 2+ : curseur sur l'objet en boutique ;
  pestes et marchands en leur parlant, seulement avec « Scrub / Merchant Hint Text » — comme le tracker de SoH, qui ne
  montre le prix qu'à ce moment) → `game.prices`, sans remplacer un prix noté à la main. « Oublier » efface le spoiler
  gardé.
- **Entrées** (option « les entrées », `ui.link.entrances`) : le jeu signale l'entrée prise la première fois
  (`ENTRANCE_DISCOVERED`, même numéro que nos sorties), puis l'entrée par laquelle on apparaît (~1 s après, état du
  client) ; la destination est notée dans Entrées (`setMapping`, sens inverse compris en entrées couplées ; en
  couplées, le second signalement, celui du sens inverse, est ignoré). Grottes : on arrive dans la grotte `i` par une
  entrée de la scène des grottes (`grottoLoad[i]`), propre à cette grotte (Grotte aux Effrois, grottes à la vache,
  Théâtre Mojo…) : la grotte est reconnue aussitôt ; ou partagée par plusieurs (grottes génériques, grottes des fées,
  grottes des pestes Mojo) : la grotte n'est connue qu'en en sortant (sa sortie `0x800 + i` est alors signalée,
  l'entrée menait à `0x700 + i`) ;
  on en sort par une entrée générique de la zone (`grottoReturn`), qui sert aussi d'arrivée normale (ex. Village
  Cocorico, porte principale ; Village Goron, sortie haute). L'appli retient la grotte où l'on est (reconnue à l'arrivée,
  ou par le signalement de sa sortie) : en sortant, l'arrivée est le retour où mène sa sortie (notée ou d'origine). Pour
  noter l'entrée prise, à défaut, la seule arrivée encore possible pour elle (`candidatesFor` : pools, destinations
  déjà prises) — en pools mélangés, n'importe quelle sortie peut mener à un retour de grotte. De même pour une entrée
  qui mène dans une grotte à entrée partagée (la seule de ces grottes encore possible). S'il en reste plusieurs, une
  carte « Où êtes-vous arrivé ? » (en bas à droite, `link.ask`, non sauvegardée) propose les arrivées possibles : un clic
  note l'entrée, et si c'est l'arrivée courante, la position (et le départ du Routeur) suit ; « Ignorer » la ferme. Une
  question tombe d'elle-même si l'entrée est notée entre-temps (à la main, spoiler, signalement de la sortie de la
  grotte) ; une à la fois, les suivantes en attente (5 au plus). Si
  la position de Link est connue (mises à jour du joueur, résumées par le relais), le retour de grotte se reconnaît
  aussi à la position au point d'apparition (120 unités au plus en 3D). Avec le spoiler
  caché valable, la destination vient du spoiler (`entrances` : `index` → `override`), et les entrées déjà découvertes
  (sauvegarde : `ship.stats.entrancesDiscovered`, bit = numéro d'entrée) sont rattrapées. Entrées hors randomizer
  (passages non mélangés) ignorées.
