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
// ALL_CLIENT_STATE, UPDATE_ROOM_STATE et REQUEST_TEAM_STATE (voir OUT_ALLOWED). Un vrai serveur Anchor, lui, peut
// renvoyer un état d'équipe que le jeu applique à la sauvegarde.
//
// Usage : node tools/soh-link/relay.mjs [--game=43383] [--web=43390] [--verbose] [--dump[=fichier.jsonl]]
//   --dump : enregistre les paquets reçus du jeu (une ligne JSON par paquet, sans les mouvements) — pour le développement.
import net from 'net';
import http from 'http';
import fs from 'fs';

const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const HOST = '127.0.0.1', GAME_PORT = +(args.game || 43383), WEB_PORT = +(args.web || 43390), VERBOSE = !!args.verbose;
const CLIENT_ID = 1;
const DUMP = args.dump ? (args.dump === true ? 'soh-packets.jsonl' : args.dump) : null;
const OUT_ALLOWED = new Set(['ALL_CLIENT_STATE', 'UPDATE_ROOM_STATE', 'REQUEST_TEAM_STATE']);
// paquets sans intérêt pour le suivi (sons, mouvements image par image : position et âge sont résumés à part)
const DROP = new Set(['PLAYER_SFX', 'OCARINA_SFX', 'PLAYER_UPDATE']);

const time = () => new Date().toLocaleTimeString('fr-FR');
const log = (...a) => console.log(`[${time()}]`, ...a);

let game = null, clientState = null, teamState = null, player = null;
const web = new Set();

/* ---------- vers l'appli (SSE) ---------- */
function broadcast(ev){
  const data = `data: ${JSON.stringify(ev)}\n\n`;
  for (const res of web) res.write(data);
}
const hello = () => ({ type:'hello', game:!!game, clientState, player, teamState });

/* ---------- vers le jeu (lecture seule) ---------- */
function sendToGame(payload){
  if (!game || !OUT_ALLOWED.has(payload.type)) return;
  game.write(JSON.stringify(payload) + '\0');
  if (VERBOSE) log('→ jeu', payload.type);
}
function requestState(){
  if (clientState?.isSaveLoaded) sendToGame({ type:'REQUEST_TEAM_STATE', targetTeamId:clientState.teamId || 'default' });
}

function onGamePacket(p){
  const type = p.type;
  if (DUMP && type !== 'PLAYER_UPDATE' && type !== 'PLAYER_SFX' && type !== 'OCARINA_SFX') fs.appendFileSync(DUMP, JSON.stringify({ t:Date.now(), ...p }) + '\n');
  if (type === 'HANDSHAKE'){
    clientState = p.clientState || {};
    log(`Jeu connecté (${clientState.name || 'sans nom'}, sauvegarde ${clientState.isSaveLoaded ? 'chargée' : 'non chargée'})`);
    sendToGame({ type:'ALL_CLIENT_STATE', state:[{ ...clientState, clientId:CLIENT_ID, online:true, self:true }] });
    sendToGame({ type:'UPDATE_ROOM_STATE', state:{ ownerClientId:CLIENT_ID, pvpMode:0, showLocationsMode:0, teleportMode:0, syncItemsAndFlags:1 } });
    requestState();
    broadcast({ type:'game', connected:true, clientState });
    return;
  }
  if (type === 'UPDATE_CLIENT_STATE'){
    const wasLoaded = clientState?.isSaveLoaded;
    clientState = p.state || clientState;
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
  if (type === 'PLAYER_UPDATE'){
    // résumé : scène, entrée d'arrivée et âge, seulement quand ils changent
    const next = { sceneNum:p.sceneNum, entranceIndex:p.entranceIndex, linkAge:p.linkAge };
    if (!player || next.sceneNum !== player.sceneNum || next.entranceIndex !== player.entranceIndex || next.linkAge !== player.linkAge){
      player = next;
      broadcast({ type:'player', player });
    }
    return;
  }
  if (DROP.has(type)) return;
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
    game = null; clientState = null; player = null;
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
    res.write(`data: ${JSON.stringify(hello())}\n\n`);
    const ka = setInterval(() => res.write(': ping\n\n'), 15000);
    req.on('close', () => { clearInterval(ka); web.delete(res); log('Appli déconnectée'); });
    log('Appli connectée');
    return;
  }
  if (req.url === '/request-state' && req.method === 'POST'){ requestState(); res.writeHead(204); res.end(); return; }
  res.writeHead(200, { 'Content-Type':'text/plain; charset=utf-8' });
  res.end(`Relais L'Œil Sheikah — jeu ${game ? 'connecté' : 'non connecté'}. Flux : /events`);
}).listen(WEB_PORT, HOST, () => log(`Appli : http://${HOST}:${WEB_PORT}/events`));
