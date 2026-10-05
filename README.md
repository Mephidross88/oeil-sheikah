# L'Œil Sheikah

Tracker et routeur pour le randomizer de **Ship of Harkinian 9.2.3** (Ocarina of Time) : objets, checks, entrées,
indices des pierres à potins, et trajets vers ce qui est faisable. Tout se passe dans le navigateur, en français.

## Lancer l'appli

Ouvrez `index.html` dans un navigateur récent (Chrome, Edge, Firefox). Rien à installer, rien à compiler : la partie
est sauvegardée automatiquement dans le navigateur.

Pour commencer une partie :
1. **Configuration** › « Importer depuis un spoiler SoH… » : choisissez les options d'import (tirages du seed, prix des
   boutiques, spoiler caché pour l'auto-tracking), puis le spoiler log (`.json`) de votre seed. Les réglages et les
   astuces sont repris ; l'emplacement des objets n'est jamais lu.
2. Notez vos objets dans le panneau **Objets** (à droite), vos checks dans **Checks**, vos entrées dans **Entrées** —
   ou laissez l'auto-tracking le faire (ci-dessous).

## Les pages

| Page | Pour quoi faire |
|---|---|
| **Checks** | Les checks de la seed, zone par zone : faits, faisables maintenant, pas encore (et pourquoi). |
| **Routeur** | Le trajet le plus court entre deux endroits, avec les entrées que vous avez notées. |
| **Entrées** | Où mène chaque entrée (entrées mélangées). |
| **Indices** | Les pierres à potins lues et ce qu'elles disent (voie du héros, zones futiles…). |
| **Carte** | Chaque zone vue de dessus : sorties, checks, pierres à potins, étages des donjons. |
| **Connexions** | Le graphe des zones reliées par les entrées connues. |
| **Statistiques** | Chronologie de la partie et temps de jeu. |

En bas de l'écran, le bandeau **« Où aller ? »** montre le check faisable le plus proche et la route pour y aller.

## Auto-tracking (facultatif)

L'appli peut suivre votre partie en direct : checks faits, objets, entrées prises, position. Il faut
[Node.js](https://nodejs.org) (version 18 ou plus).

1. Lancez le relais : double-clic sur `lancer-relais.bat` (ou `node tools/soh-link/relay.mjs`). Laissez la fenêtre
   ouverte pendant que vous jouez.
2. Dans Ship of Harkinian : menu **Réseau › Anchor**, hôte `127.0.0.1`, port `43383`, puis connectez-vous.
3. Dans l'appli : bouton d'auto-tracking en bas de la barre de gauche, cochez « Activer l'auto-tracking ». Le voyant passe au vert
   quand le jeu est connecté.

Le relais ne modifie jamais votre partie : il lit seulement ce que le jeu envoie. Options dans la fenêtre
Auto-tracking : ce qu'il faut suivre, et **la position en temps réel** (la position de Link sur la Carte ; le jeu
affiche alors un joueur « L'Oeil Sheikah : Connected », invisible).

Le spoiler log de la seed peut aussi être gardé « caché » : l'appli s'en sert seulement pour révéler ce que le jeu vous
a déjà montré (objet d'un check ramassé, boutiques vues, destination des entrées prises).

## Cartes (facultatif)

Les cartes sont tirées de **votre propre ROM** d'Ocarina of Time ; elles ne sont pas fournies.

```
node tools/soh-checks/fetch_sources.mjs
node tools/soh-maps/extract_maps.mjs <rom.z64> [--mq=<rom Master Quest.z64>]
```

La première commande télécharge les sources de SoH utiles (une fois). La ROM peut être compressée ou non (N64 ou
GameCube) ; la ROM Master Quest, facultative, donne les cartes des donjons Master Quest. Rechargez ensuite la page.

## Fenêtre de stream

Bouton « Fenêtre de stream » (barre de gauche) : une page à capturer dans OBS, avec des blocs à disposer librement
(objets, progression, prochaine étape, carte de la zone de Link, trouvailles, image, texte…). Touche **E** pour modifier
la disposition. Elle suit la fenêtre principale, qui doit rester ouverte dans le même navigateur.

## Pour les curieux

- `SPEC.md` : le comportement détaillé de chaque page.
- `CLAUDE.md` : l'organisation du code.
- `tools/` : les outils qui génèrent les données (checks, logique, entrées, cartes) depuis les sources de SoH.
