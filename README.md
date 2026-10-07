# L'Œil Sheikah

*[English version](README.en.md)*

Tracker et routeur pour le randomizer de **Ship of Harkinian 9.2.3** (Ocarina of Time) : objets, checks, entrées,
indices des pierres à potins, et trajets vers ce qui est faisable. Tout se passe dans le navigateur, en français ou en
anglais (Configuration › Langue).

## Lancer l'appli

**En ligne : https://mephidross88.github.io/oeil-sheikah/** — rien à installer, la partie est sauvegardée
automatiquement dans le navigateur (Chrome, Edge ou Firefox récent).

Ou téléchargez le dépôt (Code › Download ZIP) et ouvrez `index.html` : même appli, hors ligne, avec les cartes en plus
(voir Cartes). Chaque version garde sa propre partie ; pour passer de l'une à l'autre : « Exporter ou importer la
partie » (barre de gauche).

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
| **Carte** | Chaque zone vue de dessus : sorties, checks, pierres à potins, étages des donjons ; intérieurs et grottes depuis leur porte. |
| **Connexions** | Le graphe des zones reliées par les entrées connues. |
| **Statistiques** | Chronologie de la partie et temps de jeu. |

En bas de l'écran, le bandeau **« Où aller ? »** montre le check faisable le plus proche et la route pour y aller.

## Auto-tracking (facultatif)

L'appli peut suivre votre partie en direct : checks faits, objets, entrées prises, position, grâce à un petit relais
qui tourne sur votre ordinateur.

1. Lancez le relais : téléchargez-le depuis la
   [dernière version](https://github.com/Mephidross88/oeil-sheikah/releases/latest) (Windows :
   `oeil-sheikah-relais-windows.exe` ; aussi pour Linux et macOS, mode d'emploi sur la page) et ouvrez-le. Laissez la
   fenêtre ouverte pendant que vous jouez. Avec [Node.js](https://nodejs.org) (18 ou plus) et l'appli téléchargée, au
   choix : double-clic sur `lancer-relais.bat` (ou `node tools/soh-link/relay.mjs`).
2. Dans Ship of Harkinian : menu **Réseau › Anchor**, hôte `127.0.0.1`, port `43383`, Room ID au choix (pas « Global
   Room »), puis Enable.
3. Dans l'appli : bouton d'auto-tracking en bas de la barre de gauche, cochez « Activer l'auto-tracking ». Le voyant passe au vert
   quand le jeu est connecté. Version en ligne : si le navigateur demande l'autorisation d'accéder
   aux applications de cet appareil ou au réseau local, acceptez : c'est le relais.

Le relais ne modifie jamais votre partie : il lit seulement ce que le jeu envoie. Options dans la fenêtre
Auto-tracking : ce qu'il faut suivre, et **la position en temps réel** (la position de Link sur la Carte ; le jeu
affiche alors un joueur « L'Oeil Sheikah : Connected », invisible).

Le spoiler log de la seed peut aussi être gardé « caché » : l'appli s'en sert seulement pour révéler ce que le jeu vous
a déjà montré (objet d'un check ramassé, boutiques vues, destination des entrées prises).

## Cartes (facultatif)

Les cartes sont tirées de **votre propre ROM** d'Ocarina of Time ; elles ne sont pas fournies. Page **Carte** (ou
Configuration › Routeur et carte) : choisissez votre ROM (N64 ou GameCube, compressée ou non) et, si vous voulez les
donjons Master Quest, la ROM Master Quest, puis « Fabriquer les cartes ». La ROM est lue dans le navigateur, rien n'est
envoyé ; les cartes sont gardées dans ce navigateur (à refaire dans un autre navigateur, ou entre la version en ligne et
la version téléchargée).

Avec l'appli téléchargée et [Node.js](https://nodejs.org) (18 ou plus), on peut aussi les fabriquer en ligne de commande
(fichier `data/maps-data.js`, qui passe avant les cartes du navigateur) :

```
node tools/soh-maps/extract_maps.mjs <rom.z64> [--mq=<rom Master Quest.z64>]
```

## Fenêtre de stream

Bouton « Fenêtre de stream » (barre de gauche) : une page à capturer dans OBS, avec des widgets à disposer librement
(objets, progression, carte de la zone de Link, trouvailles, image, texte…). Touche **E** pour l'éditeur : bibliothèque
de widgets, aimantation, calques, plusieurs dispositions (exportables). Elle suit la fenêtre principale, qui doit
rester ouverte dans le même navigateur.

## Langues

L'interface est livrée en français et en anglais. Pour ajouter une autre langue sans toucher au code :

```
node tools/i18n/check.mjs --template=de --name=Deutsch > de.json
```

Remplissez chaque valeur vide de `de.json` (l'anglais est donné en référence), puis chargez-le dans **Configuration ›
Langue › Ajouter…**. Les textes non traduits s'affichent en anglais. Pour la livrer avec l'appli, convertissez-la en
`data/i18n/de.js` (même format que `data/i18n/en.js`) et ajoutez une ligne `<script>` dans `index.html`.

## Pour les curieux

- `SPEC.md` : le comportement détaillé de chaque page.
- `CLAUDE.md` : l'organisation du code.
- `tools/` : les outils qui génèrent les données (checks, logique, entrées, cartes) depuis les sources de SoH.
