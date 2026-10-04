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
//   (sous Windows : double-clic sur lancer-relais.bat, à la racine du projet)
//   --dump : enregistre les paquets reçus du jeu (une ligne JSON par paquet, sans les mouvements) — pour le développement.
import net from 'net';
import http from 'http';
import fs from 'fs';

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

const time = () => new Date().toLocaleTimeString('fr-FR');
const log = (...a) => console.log(`[${time()}]`, ...a);

let game = null, clientState = null, teamState = null, player = null;
let live = !!args.live, liveLast = null, liveSent = 0;   // position en temps réel : option, dernière position transmise
const web = new Set();

/* ---------- vers l'appli (SSE) ---------- */
function broadcast(ev){
  const data = `data: ${JSON.stringify(ev)}\n\n`;
  for (const res of web) res.write(data);
}
const hello = () => ({ type:'hello', game:!!game, clientState, player, teamState, live });

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
  log(on ? 'Position en temps réel activée' : 'Position en temps réel désactivée');
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
    log(`Jeu connecté (${clientState.name || 'sans nom'}, sauvegarde ${clientState.isSaveLoaded ? 'chargée' : 'non chargée'})`);
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
    log('Sauvegarde complète reçue');
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
  if (VERBOSE || type !== 'SET_FLAG' && type !== 'UNSET_FLAG') log('←', type, type === 'SET_CHECK_STATUS' ? `rc ${p.rc} statut ${p.status}` : type === 'ENTRANCE_DISCOVERED' ? `entrée ${p.entranceIndex}` : '');
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
    let i;
    while ((i = buf.indexOf('\0')) >= 0){
      const raw = buf.slice(0, i);
      buf = buf.slice(i + 1);
      if (!raw.trim()) continue;
      try { onGamePacket(JSON.parse(raw)); } catch (e){ log('Paquet illisible :', e.message); }
    }
  });
  const gone = () => {
    if (game !== sock) return;
    game = null; clientState = null; player = null; liveLast = null;
    log('Jeu déconnecté');
    broadcast({ type:'game', connected:false });
  };
  sock.on('close', gone);
  sock.on('error', gone);
}).listen(GAME_PORT, HOST, () => log(`En attente de SoH sur ${HOST}:${GAME_PORT} (Anchor : Host ${HOST}, Port ${GAME_PORT})`));

/* ---------- serveur HTTP pour l'appli ---------- */
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS'){ res.writeHead(204); res.end(); return; }
  if (req.url === '/events'){
    res.writeHead(200, { 'Content-Type':'text/event-stream; charset=utf-8', 'Cache-Control':'no-cache', Connection:'keep-alive' });
    web.add(res);
    res.write('retry: 2000\n\n');   // reconnexion de l'appli 2 s après une coupure (relais relancé)
    res.write(`data: ${JSON.stringify(hello())}\n\n`);
    const ka = setInterval(() => res.write(': ping\n\n'), 15000);
    // plus d'appli connectée : plus besoin du joueur fictif (l'appli le réactive à sa reconnexion)
    req.on('close', () => { clearInterval(ka); web.delete(res); log('Appli déconnectée'); if (!web.size && !args.live) setLive(false); });
    log('Appli connectée');
    return;
  }
  if (req.url === '/request-state' && req.method === 'POST'){ requestState(); res.writeHead(204); res.end(); return; }
  // position en temps réel : /live?on=1 ou /live?on=0
  if (req.url.startsWith('/live') && req.method === 'POST'){ setLive(/[?&]on=1/.test(req.url)); res.writeHead(204); res.end(); return; }
  res.writeHead(200, { 'Content-Type':'text/plain; charset=utf-8' });
  res.end(`Relais L'Œil Sheikah — jeu ${game ? 'connecté' : 'non connecté'}. Flux : /events`);
}).listen(WEB_PORT, HOST, () => log(`Appli : http://${HOST}:${WEB_PORT}/events`));
