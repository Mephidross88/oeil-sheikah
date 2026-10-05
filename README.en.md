# L'Œil Sheikah

*[Version française](README.md)*

Tracker and router for the **Ship of Harkinian 9.2.3** randomizer (Ocarina of Time): items, checks, entrances,
gossip stone hints, and routes to whatever is doable. Everything runs in your browser, in English or French
(Settings › Language).

## Running the app

Open `index.html` in a recent browser (Chrome, Edge, Firefox). Nothing to install, nothing to build: your game is
saved automatically in the browser.

To start a game:
1. **Settings** › “Import from a SoH spoiler…”: pick the import options (seed draws, shop prices, hidden spoiler for
   auto-tracking), then your seed’s spoiler log (`.json`). Settings and tricks are imported; item locations are never
   read.
2. Note your items in the **Items** panel (on the right), your checks in **Checks**, your entrances in **Entrances** —
   or let auto-tracking do it (below).

## Pages

| Page | What for |
|---|---|
| **Checks** | The seed’s checks, area by area: done, doable now, not yet (and why). |
| **Router** | The shortest route between two places, using the entrances you have noted. |
| **Entrances** | Where each entrance leads (shuffled entrances). |
| **Hints** | The gossip stones you have read and what they say (Way of the Hero, foolish areas…). |
| **Map** | Each area seen from above: exits, checks, gossip stones, dungeon floors. |
| **Connections** | The graph of areas linked by known entrances. |
| **Statistics** | Game timeline and play time. |

At the bottom of the screen, the **“Where to?”** bar shows the closest doable check and the route to get there.

## Auto-tracking (optional)

The app can follow your game live: checks done, items, entrances taken, position. You need
[Node.js](https://nodejs.org) (version 18 or later).

1. Start the relay: double-click `lancer-relais.bat` (or run `node tools/soh-link/relay.mjs`). Keep the window open
   while you play.
2. In Ship of Harkinian: **Network › Anchor** menu, host `127.0.0.1`, port `43383`, then connect.
3. In the app: auto-tracking button at the bottom of the left bar, check “Enable auto-tracking”. The light turns green
   when the game is connected.

The relay never changes your game: it only reads what the game sends. Options in the Auto-tracking window: what to
track, and **real-time position** (Link’s position on the Map; the game then shows an invisible player
“L’Oeil Sheikah: Connected”).

Your seed’s spoiler log can also be kept “hidden”: the app only uses it to reveal what the game has already shown you
(item of a collected check, shops seen, destination of entrances taken).

## Maps (optional)

Maps are extracted from **your own Ocarina of Time ROM**; they are not provided.

```
node tools/soh-checks/fetch_sources.mjs
node tools/soh-maps/extract_maps.mjs <rom.z64> [--mq=<Master Quest rom.z64>]
```

The first command downloads the needed SoH sources (once). The ROM can be compressed or not (N64 or GameCube); the
optional Master Quest ROM provides the Master Quest dungeon maps. Then reload the page.

## Stream window

“Stream window” button (left bar): a page to capture in OBS, with widgets you lay out freely (items, progress, map of
Link’s area, finds, image, text…). Press **E** for the editor: widget library, snapping, layers, several layouts
(exportable), themes. It follows the main window, which must stay open in the same browser.

## Languages

The interface ships in French and English. To add another language without touching the code:

```
node tools/i18n/check.mjs --template=de --name=Deutsch > de.json
```

Fill in each empty value of `de.json` (the English text is given as a reference), then load it in **Settings ›
Language › Add…**. Untranslated texts fall back to English. To ship it with the app, turn it into
`data/i18n/de.js` (same format as `data/i18n/en.js`) and add one `<script>` line in `index.html`.

## For the curious

- `SPEC.md` (in French): detailed behavior of each page.
- `CLAUDE.md` (in French): code organization.
- `tools/`: the tools generating the data (checks, logic, entrances, maps) from the SoH sources.
