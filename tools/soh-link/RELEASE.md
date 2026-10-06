**English below.**

Relais d'auto-tracking de [L'Œil Sheikah](https://mephidross88.github.io/oeil-sheikah/), sans rien installer : il suit
votre partie de Ship of Harkinian en direct (lecture seule, il ne modifie jamais la partie).

1. Téléchargez le fichier de votre système (ci-dessous) et ouvrez-le ; gardez sa fenêtre ouverte pendant la partie.
   - **Windows** : `oeil-sheikah-relais-windows.exe`. Au premier lancement, Windows peut afficher « Windows a protégé votre
     ordinateur » (fichier non signé) : « Informations complémentaires », puis « Exécuter quand même ».
   - **Linux** : `oeil-sheikah-relais-linux`, puis `chmod +x oeil-sheikah-relais-linux` et `./oeil-sheikah-relais-linux`.
   - **macOS** : `oeil-sheikah-relais-mac-arm64` (Apple Silicon) ou `-mac-intel`, puis dans le Terminal
     `chmod +x` et `xattr -d com.apple.quarantine` sur le fichier, avant de le lancer.
   Le relais n'accepte que l'appli (fichier local, version en ligne, `localhost`) ; pour une copie hébergée ailleurs :
   `--origin=https://…`.
2. Dans SoH, menu **Réseau › Anchor** : Host `127.0.0.1`, port `43383`, Room ID au choix (pas « Global Room »), puis Enable.
3. Dans l'appli : bouton Auto-tracking en bas de la barre de gauche, « Activer l'auto-tracking ». Si le navigateur demande
   l'autorisation d'accéder aux applications de cet appareil ou au réseau local, acceptez : c'est le relais, sur votre
   ordinateur.

---

Auto-tracking relay for [L'Œil Sheikah](https://mephidross88.github.io/oeil-sheikah/), nothing to install: it follows
your Ship of Harkinian game live (read-only, it never changes your game).

1. Download the file for your system (below) and open it; keep its window open while you play.
   - **Windows**: `oeil-sheikah-relais-windows.exe`. On first launch, Windows may show “Windows protected your PC”
     (unsigned file): “More info”, then “Run anyway”.
   - **Linux**: `oeil-sheikah-relais-linux`, then `chmod +x oeil-sheikah-relais-linux` and `./oeil-sheikah-relais-linux`.
   - **macOS**: `oeil-sheikah-relais-mac-arm64` (Apple Silicon) or `-mac-intel`, then in the Terminal run `chmod +x`
     and `xattr -d com.apple.quarantine` on the file before launching it.
   The relay only accepts the app (local file, online version, `localhost`); for a copy hosted elsewhere:
   `--origin=https://…`.
2. In SoH, **Network › Anchor** menu: Host `127.0.0.1`, port `43383`, any Room ID (not “Global Room”), then Enable.
3. In the app: Auto-tracking button at the bottom of the left bar, “Enable auto-tracking”. If the browser asks for
   permission to access apps on this device or on your local network, allow it: that is the relay, on your computer.
