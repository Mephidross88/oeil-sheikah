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
- Bouton « État de la partie » (modale) ; sa pastille compte toutes les options cochées, âges compris.
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
Bloc Monde : overworld (Vanilla / Aléatoires), intérieurs (Vanilla / Simples / Tous — « Tous » ajoute moulin,
Temple du Temps, maison de Link, apothicaire, tombe d'Igor), grottes (Vanilla / Aléatoires),
rivière de la Vallée Gerudo (Vanilla / Aléatoire).
Bloc Donjons et boss : donjons (Vanilla / Donjons / Donjons + Ganon), boss (Vanilla / Par âge / Complet),
entrée de la Tour de Ganon (Vanilla / Aléatoire), Forteresse Gerudo (Vanilla / Aléatoires).
Bloc Apparitions et téléportations : spawns (Aucun / Enfant / Adulte / Tous), chants (Vanilla / Aléatoires),
hiboux (Vanilla / Aléatoires).
Bloc Avancé : entrées découplées (Non par défaut), pools mélangés (Non par défaut),
coûts du routeur (transition 3, chant 15, sauvegarder-recharger 25, changement d'âge 12).
Afficher en tête les incohérences détectées dans les données.

## État de la partie
Chips à cocher, groupées : Âges, Progression, Équipements, Objets, Chants, Téléportations.
- « Âge enfant accessible » et « Âge adulte accessible » sont DÉSACTIVÉS par défaut : l'utilisateur coche
  l'âge de départ de sa seed, puis l'autre quand il devient accessible. Tant qu'aucun n'est coché,
  un message l'indique dans le Tracker (rien n'est atteignable).
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
