// Capture de la position des checks en jouant : faux serveur Anchor (comme tools/soh-link/relay.mjs, à lancer À SA PLACE,
// même port) qui déclare au jeu un second joueur, « Capture », toujours dans la même scène que Link. Le jeu n'envoie la
// position de Link (PLAYER_UPDATE, à chaque image) qu'aux autres joueurs de sa scène : il l'envoie alors en continu. À
// chaque check ramassé (SET_CHECK_STATUS, statut « ramassé »), la position de Link à ce moment est notée dans
// tools/soh-maps/positions.json (versionné), que extract_maps.mjs reprend pour les checks sans position.
// Outil lancé à la main, jamais chargé par l'appli. Aucune dépendance (Node 18+).
//
// Usage : node tools/soh-maps/capture_positions.mjs [--game=43383] [--all] [--list] [--v | --mq] [--out=fichier.json]
//   --list : affiche par zone les checks encore sans position, puis s'arrête
//   --v / --mq : seulement les donjons vanilla / Master Quest (liste et décomptes ; checks communs compris)
//   --all : note aussi les checks qui ont déjà une position (sinon seulement ceux qui n'en ont pas dans data/maps-data.js)
//
// Envoyé au jeu : la liste des joueurs (le jeu et « Capture »), l'état de la salle, la scène de « Capture » quand Link
// change de scène, et sa position, sous le sol (son Link fantôme n'apparaît pas). Jamais d'objet, de drapeau, d'état
// d'équipe ni de téléportation. Le jeu affiche « Capture : Connected » à la connexion.
import net from 'net';
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(HERE, '../..'), SRC = path.join(APP, 'tools/soh-checks/src');
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const HOST = '127.0.0.1', GAME_PORT = +(args.game || 43383), ALL = !!args.all;
const OUT = args.out ? path.resolve(args.out) : path.join(HERE, 'positions.json');
const SELF_ID = 1, GHOST_ID = 2;

const SCENES = [...fs.readFileSync(path.join(SRC, 'scene_table.h'), 'utf8').matchAll(/DEFINE_SCENE\(\w+,\s*\w+,\s*(SCENE_\w+)/g)].map(m => m[1].replace('SCENE_', ''));
const load = (file, key) => { const c = { window:{} }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(APP, file), 'utf8'), c); return c.window[key]; };
const CD = load('data/checks-data.js', 'CHECKS_DATA');
const CHECK_BY_NUM = {};
CD.nums.forEach((n, i) => { CHECK_BY_NUM[n] = CD.checks[i]; });
const MAPS = fs.existsSync(path.join(APP, 'data/maps-data.js')) ? load('data/maps-data.js', 'MAPS_DATA') : null;
const positions = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
// check sans position : ni placé par extract_maps.mjs, ni rattaché à un lieu non dessiné (intérieur, grotte)
const DUNGEON_AREA = /DEKU_TREE|DODONGOS|JABU|TEMPLE$|WELL|ICE_CAVERN|TRAINING|GANONS_CASTLE/;
// placés d'après un autre check par extract_maps.mjs (Cadeau de Rauru : au piédestal de l'Épée de Légende) ; Poche de Link :
// rattachée à la maison de Link
const SAME_AS = { GIFT_FROM_RAURU:'TOT_MASTER_SWORD', LINKS_POCKET:null };
const missing = row => {
  if (!MAPS || row[0] in SAME_AS) return !MAPS;
  const id = row[0], place = MAPS.places[id], at = place && MAPS.exits[place];
  if (MAPS.checks[id] || MAPS.checksMq?.[id]) return false;
  // rattaché à un lieu : sans position seulement si ce lieu est dessiné (donjon, Temple du Temps)
  return !place || DUNGEON_AREA.test(row[1]) || !!(at && MAPS.scenes[at[0]]?.kind);
};

const time = () => new Date().toLocaleTimeString('fr-FR');
const log = (...a) => console.log(`[${time()}]`, ...a);
function save(){
  const sorted = Object.fromEntries(Object.keys(positions).sort().map(k => [k, positions[k]]));
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1) + '\n');
}
// version des donjons voulue (--v : vanilla, --mq : Master Quest ; checks communs toujours)
const wanted = r => args.v ? r[3] !== 'M' : args.mq ? r[3] !== 'V' : true;
const todo = CD.checks.filter(r => wanted(r) && missing(r) && !positions[r[0]]);
log(`${Object.keys(positions).length} positions déjà notées, ${todo.length} checks encore sans position.`);
if (args.list){
  const area = Object.fromEntries(CD.areas.map(a => [a[0], a[1]])), by = {};
  for (const r of todo) (by[r[1]] = by[r[1]] || []).push(r[4] + (r[3] === 'M' ? ' [MQ]' : ''));
  for (const [a, l] of Object.entries(by)) console.log(`\n${area[a] || a} (${l.length}) :\n  ` + l.join('\n  '));
  process.exit(0);
}

let game = null, client = null, last = null;
function send(p){ if (game) game.write(JSON.stringify(p) + '\0'); }
const ghost = () => ({ clientId:GHOST_ID, name:'Capture', color:{ r:120, g:120, b:120 }, clientVersion:client?.clientVersion || '', teamId:'capture',
  online:true, seed:client?.seed || 0, isSaveLoaded:true, isGameComplete:false, sceneNum:client?.sceneNum ?? 0, entranceIndex:0, self:false });
// le second joueur suit Link de scène en scène, caché sous le sol
let noPosTimer = null;
function ghostFollow(){
  // partie chargée sans position de Link quelques secondes après : prévenir (la capture ne fonctionnerait pas)
  clearTimeout(noPosTimer);
  if (client?.isSaveLoaded && !last) noPosTimer = setTimeout(() => { if (game && !last) log('⚠ Toujours aucune position de Link reçue : ne faites pas de check, prévenez Claude.'); }, 6000);
  send({ type:'UPDATE_CLIENT_STATE', clientId:GHOST_ID, state:ghost() });
  send({ type:'PLAYER_UPDATE', clientId:GHOST_ID, sceneNum:client?.sceneNum ?? 0, entranceIndex:0, linkAge:0,
    posRot:{ pos:{ x:0, y:-10000, z:0 }, rot:{ x:0, y:0, z:0 } } });
}

function onPacket(p){
  if (p.type === 'HANDSHAKE'){
    client = p.clientState || {};
    log(`Jeu connecté (${client.name || 'sans nom'}) : chargez la partie et attendez « Position de Link reçue » avant de faire des checks.`);
    send({ type:'ALL_CLIENT_STATE', state:[{ ...client, clientId:SELF_ID, online:true, self:true }, ghost()] });
    send({ type:'UPDATE_ROOM_STATE', state:{ ownerClientId:SELF_ID, pvpMode:0, showLocationsMode:0, teleportMode:0, syncItemsAndFlags:1 } });
    ghostFollow();
    return;
  }
  if (p.type === 'UPDATE_CLIENT_STATE'){
    const scene = client?.sceneNum;
    client = p.state || client;
    if (client.sceneNum !== scene || !last) ghostFollow();
    return;
  }
  if (p.type === 'PLAYER_UPDATE'){
    const pos = p.posRot?.pos;
    if (pos){
      if (!last) log('Position de Link reçue : la capture fonctionne.');
      last = { scene:SCENES[p.sceneNum] || String(p.sceneNum), x:Math.round(pos.x), y:Math.round(pos.y), z:Math.round(pos.z), age:p.linkAge === 1 ? 'child' : 'adult', t:Date.now() };
    }
    return;
  }
  if (p.type === 'SET_CHECK_STATUS' && p.status === 4){
    const row = CHECK_BY_NUM[p.rc];
    if (!row) return;
    const [id, , , , label] = row;
    if (!last || Date.now() - last.t > 3000){ log(`${label} : pas de position de Link reçue (le jeu ne l'envoie pas ?)`); return; }
    if (!ALL && !missing(row)){ log(`${label} : a déjà une position, ignoré (--all pour le noter quand même)`); return; }
    positions[id] = { scene:last.scene, x:last.x, y:last.y, z:last.z, age:last.age };
    save();
    const left = CD.checks.filter(r => wanted(r) && missing(r) && !positions[r[0]]).length;
    log(`✔ ${label} : ${last.scene} (${last.x}, ${last.y}, ${last.z}) — encore ${left} sans position`);
  }
}

net.createServer(sock => {
  if (game) game.destroy();
  game = sock;
  sock.setEncoding('utf8');
  let buf = '';
  sock.on('data', chunk => {
    buf += chunk;
    let i;
    while ((i = buf.indexOf('\0')) >= 0){
      const raw = buf.slice(0, i);
      buf = buf.slice(i + 1);
      if (!raw.trim()) continue;
      try { onPacket(JSON.parse(raw)); } catch (e){ log('Paquet illisible :', e.message); }
    }
  });
  const gone = () => { if (game === sock){ game = null; last = null; log('Jeu déconnecté'); } };
  sock.on('close', gone);
  sock.on('error', gone);
}).listen(GAME_PORT, HOST, () => log(`Capture des positions : en attente de SoH sur ${HOST}:${GAME_PORT} (fermer le relais habituel avant)`));
