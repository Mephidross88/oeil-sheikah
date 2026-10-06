// Relais local d'auto-tracking : L'Œil Sheikah <-> Ship of Harkinian 9.2.3 — outil lancé à la main pendant qu'on joue,
// jamais chargé par l'appli. Aucune dépendance (Node 18+).
//
// SoH (menu Réseau > Anchor, Host 127.0.0.1, port 43383) se connecte en TCP à ce relais comme à un serveur Anchor
// (multijoueur coopératif de SoH, soh/Network/Anchor) : messages JSON séparés par un octet nul. Le relais répond à la
// poignée de main (liste des joueurs, état de la salle avec la synchronisation activée, sans quoi le jeu n'envoie pas
// sa sauvegarde), demande la sauvegarde complète au jeu, puis transmet les événements à l'appli par un flux SSE
// (http://127.0.0.1:43390/events).
//
// LECTURE SEULE : le relais n'envoie jamais au jeu d'objet, de drapeau, d'état d'équipe ni de téléportation — seulement
// ALL_CLIENT_STATE, UPDATE_ROOM_STATE et REQUEST_TEAM_STATE (voir OUT_ALLOWED), et, pour la position en temps réel, l'état
// et la position d'un second joueur fictif. Un vrai serveur Anchor, lui, peut renvoyer un état d'équipe que le jeu
// applique à la sauvegarde.
//
// Position en temps réel (option de l'appli, POST /live, ou --live) : le jeu n'envoie la position de Link (PLAYER_UPDATE,
// à chaque image) qu'aux autres joueurs de sa scène ; le relais déclare alors un second joueur, « L'Oeil Sheikah » (sans
// « Œ » : absent de la police du jeu), qui
// suit Link de scène en scène, caché sous le sol, et transmet la position à l'appli (au plus 10 fois par seconde, quand
// elle change). Le jeu affiche « L'Oeil Sheikah : Connected » à l'activation.
//
// Usage : node tools/soh-link/relay.mjs [--game=43383] [--web=43390] [--verbose] [--dump[=fichier.jsonl]] [--live]
//   [--origin=https://…[,…]]   (adresse d'une copie de l'appli hébergée ailleurs ; voir le serveur HTTP plus bas)
//   (sous Windows : double-clic sur lancer-relais.bat, à la racine du projet ; ou l'exécutable autonome, sans Node.js,
//   construit par tools/soh-link/build_relay.mjs et publié dans les releases GitHub)
//   --dump : enregistre les paquets reçus du jeu (une ligne JSON par paquet, sans les mouvements) — pour le développement.
import net from 'net';
import http from 'http';
import fs from 'fs';
import crypto from 'crypto';

const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const HOST = '127.0.0.1', GAME_PORT = +(args.game || 43383), WEB_PORT = +(args.web || 43390), VERBOSE = !!args.verbose;
const CLIENT_ID = 1;
const DUMP = args.dump ? (args.dump === true ? 'soh-packets.jsonl' : args.dump) : null;
const OUT_ALLOWED = new Set(['ALL_CLIENT_STATE', 'UPDATE_ROOM_STATE', 'REQUEST_TEAM_STATE']);
// (état et position : seulement ceux du second joueur fictif)
const OUT_GHOST = new Set(['UPDATE_CLIENT_STATE', 'PLAYER_UPDATE']);
const GHOST_ID = 2;
// paquets sans intérêt pour le suivi (sons, mouvements image par image : position et âge sont résumés à part)
const DROP = new Set(['PLAYER_SFX', 'OCARINA_SFX', 'PLAYER_UPDATE']);

// messages en français si le système est en français, sinon en anglais
const FR = /^fr\b/i.test(process.env.LANG || Intl.DateTimeFormat().resolvedOptions().locale || '');
const m = (fr, en) => FR ? fr : en;
const time = () => new Date().toLocaleTimeString(FR ? 'fr-FR' : 'en-GB');
const log = (...a) => console.log(`[${time()}]`, ...a);
// exécutable autonome (pas lancé par node ou bun) : la fenêtre se ferme à la sortie, on attend Entrée avant
const STANDALONE = !/[\\/](node|bun)(\.exe)?$/i.test(process.execPath);
function fatal(msg){
  console.error('\n' + msg + '\n');
  if (!STANDALONE || !process.stdin.isTTY) process.exit(1);
  console.error(m('Appuyez sur Entrée pour fermer.', 'Press Enter to close.'));
  process.stdin.once('data', () => process.exit(1));
}

let game = null, clientState = null, teamState = null, player = null;
let live = !!args.live, liveLast = null, liveSent = 0;   // position en temps réel : option, dernière position transmise
// une seule page de l'appli à la fois (la première garde la place ; les autres reçoivent « busy » et réessaient) ; son jeton,
// donné dans hello, est exigé par les commandes (POST /live, /request-state)
let client = null;   // { res, token, origin }
console.log(m(`L'Œil Sheikah — relais d'auto-tracking (lecture seule). Gardez cette fenêtre ouverte pendant la partie.`,
  `L'Œil Sheikah — auto-tracking relay (read-only). Keep this window open while you play.`));

/* ---------- vers l'appli (SSE) ---------- */
function broadcast(ev){
  if (client) client.res.write(`data: ${JSON.stringify(ev)}\n\n`);
}
const hello = () => ({ type:'hello', token:client?.token, game:!!game, clientState, player, teamState, live });

/* ---------- vers le jeu (lecture seule) ---------- */
function sendToGame(payload){
  if (!game || !(OUT_ALLOWED.has(payload.type) || OUT_GHOST.has(payload.type) && payload.clientId === GHOST_ID)) return;
  game.write(JSON.stringify(payload) + '\0');
  if (VERBOSE) log('→ jeu', payload.type);
}
/* ---------- second joueur fictif (position en temps réel) ---------- */
const ghost = () => ({ clientId:GHOST_ID, name:'L\'Oeil Sheikah', color:{ r:120, g:120, b:120 }, clientVersion:clientState?.clientVersion || '',
  teamId:'oeil-sheikah', online:true, seed:clientState?.seed || 0, isSaveLoaded:true, isGameComplete:false,
  sceneNum:clientState?.sceneNum ?? 0, entranceIndex:0, self:false });
function sendClients(){
  if (!clientState) return;
  sendToGame({ type:'ALL_CLIENT_STATE', state:[{ ...clientState, clientId:CLIENT_ID, online:true, self:true }].concat(live ? [ghost()] : []) });
  if (live) ghostFollow();
}
// le second joueur suit Link de scène en scène, caché sous le sol
function ghostFollow(){
  sendToGame({ type:'UPDATE_CLIENT_STATE', clientId:GHOST_ID, state:ghost() });
  sendToGame({ type:'PLAYER_UPDATE', clientId:GHOST_ID, sceneNum:clientState?.sceneNum ?? 0, entranceIndex:0, linkAge:0,
    posRot:{ pos:{ x:0, y:-10000, z:0 }, rot:{ x:0, y:0, z:0 } } });
}
function setLive(on){
  if (live === on) return;
  live = on; liveLast = null;
  log(on ? m('Position en temps réel activée', 'Real-time position on') : m('Position en temps réel désactivée', 'Real-time position off'));
  sendClients();
  broadcast({ type:'liveState', on });
}

function requestState(){
  if (clientState?.isSaveLoaded) sendToGame({ type:'REQUEST_TEAM_STATE', targetTeamId:clientState.teamId || 'default' });
}
// objet reçu, objets de donjon : on redemande la sauvegarde complète (inventaire à jour) peu après
let stateTimer = null;
function requestStateSoon(){ clearTimeout(stateTimer); stateTimer = setTimeout(requestState, 700); }

function onGamePacket(p){
  const type = p.type;
  if (DUMP && type !== 'PLAYER_UPDATE' && type !== 'PLAYER_SFX' && type !== 'OCARINA_SFX') fs.appendFileSync(DUMP, JSON.stringify({ t:Date.now(), ...p }) + '\n');
  if (type === 'HANDSHAKE'){
    clientState = p.clientState || {};
    log(m(`Jeu connecté (${clientState.name || 'sans nom'}, sauvegarde ${clientState.isSaveLoaded ? 'chargée' : 'non chargée'})`,
      `Game connected (${clientState.name || 'no name'}, save ${clientState.isSaveLoaded ? 'loaded' : 'not loaded'})`));
    sendClients();
    sendToGame({ type:'UPDATE_ROOM_STATE', state:{ ownerClientId:CLIENT_ID, pvpMode:0, showLocationsMode:0, teleportMode:0, syncItemsAndFlags:1 } });
    requestState();
    broadcast({ type:'game', connected:true, clientState });
    return;
  }
  if (type === 'UPDATE_CLIENT_STATE'){
    const wasLoaded = clientState?.isSaveLoaded, scene = clientState?.sceneNum;
    clientState = p.state || clientState;
    if (live && (clientState?.sceneNum !== scene || !wasLoaded)) ghostFollow();
    broadcast({ type:'client', clientState });
    if (!wasLoaded && clientState?.isSaveLoaded) requestState();
    return;
  }
  // le jeu demande l'état d'équipe au chargement d'une sauvegarde : on lui demande plutôt le sien (jamais l'inverse)
  if (type === 'REQUEST_TEAM_STATE'){ requestState(); return; }
  if (type === 'UPDATE_TEAM_STATE'){
    teamState = p.state || null;
    log(m('Sauvegarde complète reçue', 'Full save received'));
    broadcast({ type:'packet', packet:p });
    return;
  }
  if (type === 'PLAYER_UPDATE' && live){
    // position en temps réel : au plus 10 fois par seconde, quand elle change
    const pos = p.posRot?.pos, now = Date.now();
    if (!pos || now - liveSent < 100) return;
    const next = { sceneNum:p.sceneNum, x:Math.round(pos.x), y:Math.round(pos.y), z:Math.round(pos.z), rot:p.posRot?.rot?.y || 0, age:p.linkAge };
    if (liveLast && Object.keys(next).every(k => next[k] === liveLast[k])) return;
    liveLast = next; liveSent = now;
    broadcast({ type:'live', live:next });
    return;
  }
  if (type === 'PLAYER_UPDATE'){
    // résumé : scène, entrée d'arrivée et âge, seulement quand ils changent, avec la position de Link à ce moment-là
    // (point d'apparition : distingue les sorties de grotte, qui réutilisent une entrée générique de la zone)
    const pos = p.posRot?.pos, round = v => Math.round(v ?? 0);
    const next = { sceneNum:p.sceneNum, entranceIndex:p.entranceIndex, linkAge:p.linkAge, pos:pos ? { x:round(pos.x), y:round(pos.y), z:round(pos.z) } : null };
    if (!player || next.sceneNum !== player.sceneNum || next.entranceIndex !== player.entranceIndex || next.linkAge !== player.linkAge){
      player = next;
      broadcast({ type:'player', player });
    }
    return;
  }
  if (DROP.has(type)) return;
  if (type === 'GIVE_ITEM' || type === 'UPDATE_DUNGEON_ITEMS') requestStateSoon();
  if (VERBOSE || type !== 'SET_FLAG' && type !== 'UNSET_FLAG') log('←', type, type === 'SET_CHECK_STATUS' ? `rc ${p.rc} ${m('statut', 'status')} ${p.status}` : type === 'ENTRANCE_DISCOVERED' ? `${m('entrée', 'entrance')} ${p.entranceIndex}` : '');
  broadcast({ type:'packet', packet:p });
}

/* ---------- serveur TCP pour SoH ---------- */
net.createServer(sock => {
  if (game) game.destroy();
  game = sock;
  sock.setEncoding('utf8');
  let buf = '';
  sock.on('data', chunk => {
    buf += chunk;
    // (message sans fin au-delà de 16 Mo : abandonné ; une sauvegarde complète en fait moins de 1)
    if (buf.length > 16e6 && buf.indexOf('\0') < 0){ log(m('Paquet trop long ignoré', 'Oversized packet dropped')); buf = ''; return; }
    let i;
    while ((i = buf.indexOf('\0')) >= 0){
      const raw = buf.slice(0, i);
      buf = buf.slice(i + 1);
      if (!raw.trim()) continue;
      try { onGamePacket(JSON.parse(raw)); } catch (e){ log(m('Paquet illisible :', 'Unreadable packet:'), e.message); }
    }
  });
  const gone = () => {
    if (game !== sock) return;
    game = null; clientState = null; player = null; liveLast = null;
    log(m('Jeu déconnecté', 'Game disconnected'));
    broadcast({ type:'game', connected:false });
  };
  sock.on('close', gone);
  sock.on('error', gone);
}).on('error', e => fatal(busy(e, GAME_PORT)))
  .listen(GAME_PORT, HOST, () => log(m(`En attente de SoH sur ${HOST}:${GAME_PORT} (menu Réseau > Anchor : Host ${HOST}, Port ${GAME_PORT})`,
    `Waiting for SoH on ${HOST}:${GAME_PORT} (Network > Anchor menu: Host ${HOST}, Port ${GAME_PORT})`)));

/* ---------- serveur HTTP pour l'appli ----------
   Seulement l'appli : ouverte depuis un fichier (origine « file:// » pour Chrome, « null » pour Firefox), en ligne (GitHub Pages), servie en local (localhost,
   127.0.0.1), ou à une adresse donnée par --origin=https://…[,…] (copie de l'appli hébergée ailleurs). Les autres pages
   ouvertes dans le navigateur sont refusées (elles pourraient sinon lire la partie ou activer le joueur fictif). Accès
   d'un site public vers cette adresse locale : en-tête Private Network Access de Chrome. */
const ORIGINS = new Set(['https://mephidross88.github.io', ...String(args.origin === true ? '' : args.origin || '').split(',').map(o => o.trim().replace(/\/+$/, '')).filter(Boolean)]);
const originOk = o => o == null || o === 'null' || o === 'file://' || ORIGINS.has(o) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o);
const refused = new Set();
const where = o => o === 'null' || o === 'file://' ? m('fichier local', 'local file') : o || m('sans origine', 'no origin');
http.createServer((req, res) => {
  const origin = req.headers.origin;
  if (!originOk(origin)){
    if (!refused.has(origin)){ refused.add(origin); log(m(`Accès refusé à ${origin} (pas l'appli ; sinon : --origin=${origin})`, `Access denied to ${origin} (not the app; otherwise: --origin=${origin})`)); }
    res.writeHead(403); res.end(); return;
  }
  if (origin){ res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin'); }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  if (req.method === 'OPTIONS'){ res.writeHead(204); res.end(); return; }
  if (req.url === '/events'){
    res.writeHead(200, { 'Content-Type':'text/event-stream; charset=utf-8', 'Cache-Control':'no-cache', Connection:'keep-alive' });
    if (client){
      // place prise : « busy », puis fermeture (la page réessaie dans 5 s ; refus noté une fois par page connectée)
      if (!client.refusedLogged++) log(m(`Connexion refusée à ${where(origin)} : l'appli est déjà connectée (${where(client.origin)})`,
        `Connection refused to ${where(origin)}: the app is already connected (${where(client.origin)})`));
      res.end(`retry: 5000\n\ndata: ${JSON.stringify({ type:'busy' })}\n\n`);
      return;
    }
    client = { res, token:crypto.randomBytes(16).toString('hex'), origin:origin || '', refusedLogged:0 };
    res.write('retry: 2000\n\n');   // reconnexion de l'appli 2 s après une coupure (relais relancé)
    res.write(`data: ${JSON.stringify(hello())}\n\n`);
    const ka = setInterval(() => res.write(': ping\n\n'), 15000);
    // plus d'appli connectée : plus besoin du joueur fictif (l'appli le réactive à sa reconnexion)
    req.on('close', () => { clearInterval(ka); if (client?.res === res) client = null; log(m('Appli déconnectée', 'App disconnected')); if (!args.live) setLive(false); });
    log(m(`Appli connectée (${where(origin)})`, `App connected (${where(origin)})`));
    return;
  }
  // commandes : seulement la page connectée (jeton de son hello)
  if (req.method === 'POST' && (req.url.startsWith('/request-state') || req.url.startsWith('/live'))){
    const q = new URL(req.url, 'http://relais').searchParams;
    if (!client || q.get('token') !== client.token){ res.writeHead(403); res.end(); return; }
    if (req.url.startsWith('/request-state')) requestState();
    else setLive(q.get('on') === '1');   // position en temps réel : /live?on=1 ou /live?on=0
    res.writeHead(204); res.end(); return;
  }
  res.writeHead(200, { 'Content-Type':'text/plain; charset=utf-8' });
  res.end(m(`Relais L'Œil Sheikah — jeu ${game ? 'connecté' : 'non connecté'}. Flux : /events`,
    `L'Œil Sheikah relay — game ${game ? 'connected' : 'not connected'}. Stream: /events`));
}).on('error', e => fatal(busy(e, WEB_PORT)))
  .listen(WEB_PORT, HOST, () => log(m(`Appli : adresse du relais http://${HOST}:${WEB_PORT}`, `App: relay address http://${HOST}:${WEB_PORT}`)));

function busy(e, port){
  return e.code === 'EADDRINUSE'
    ? m(`Le port ${port} est déjà utilisé : le relais tourne sans doute déjà (une autre fenêtre ?).`,
        `Port ${port} is already in use: the relay is probably already running (another window?).`)
    : m(`Erreur sur le port ${port} : ${e.message}`, `Error on port ${port}: ${e.message}`);
}
