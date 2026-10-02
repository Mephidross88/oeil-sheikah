/* ---------- Auto-tracking : relais local vers Ship of Harkinian (tools/soh-link/relay.mjs) ----------
   Le relais se fait passer pour un serveur Anchor (multijoueur de SoH) et transmet les événements du jeu par un flux
   SSE : connexion du jeu, position, checks faits, entrées découvertes, sauvegarde complète. Ce fichier gère la connexion
   (store.ui.link : activé, adresse du relais) et l'état affiché (link) ; l'application des événements à la partie
   (checks, objets, entrées) vient ensuite (linkApply). Lecture seule : rien n'est jamais renvoyé au jeu. */
const link = reactive({
  status:'off',      // off | connecting (relais injoignable, nouvelle tentative auto) | relay (relais OK) | game (jeu connecté)
  client:null,       // dernier état du jeu (nom, sauvegarde chargée, scène…)
  player:null,       // position : scène, entrée d'arrivée, âge
  lastAt:null, log:[],
});
let linkSource = null;

function linkLog(text){
  link.log.unshift({ t:new Date().toLocaleTimeString('fr-FR'), text });
  if (link.log.length > 80) link.log.length = 80;
}
function linkStart(){
  linkStop();
  link.status = 'connecting';
  let es;
  try { es = new EventSource(store.ui.link.url.replace(/\/+$/, '') + '/events'); } catch (e){ linkLog('Adresse du relais invalide'); return; }
  linkSource = es;
  es.onmessage = ev => { let m; try { m = JSON.parse(ev.data); } catch (e){ return; } linkHandle(m); };
  es.onerror = () => { if (link.status !== 'connecting') linkLog('Relais injoignable, nouvelle tentative…'); link.status = 'connecting'; };
}
function linkStop(){
  if (linkSource){ linkSource.close(); linkSource = null; }
  link.status = 'off'; link.client = null; link.player = null;
}
function linkRequestState(){
  fetch(store.ui.link.url.replace(/\/+$/, '') + '/request-state', { method:'POST' }).catch(() => linkLog('Relais injoignable'));
}

// Description courte d'un paquet du jeu (journal).
function linkDescribe(p){
  switch (p.type){
    case 'SET_CHECK_STATUS': { const c = CHECK_BY_NUM[p.rc]; return `${c ? c.label + ' (' + CHECK_AREA[c.area].label + ')' : 'Check ' + p.rc} : ${CHECK_STATUS_FR[p.status] || p.status}${p.skipped ? ' (ignoré)' : ''}`; }
    case 'ENTRANCE_DISCOVERED': return `Entrée découverte : ${p.entranceIndex}`;
    case 'UPDATE_TEAM_STATE': return 'Sauvegarde complète reçue';
    case 'GIVE_ITEM': return `Objet reçu : ${p.getItemId}`;
    case 'UPDATE_DUNGEON_ITEMS': return 'Objets de donjon mis à jour';
    case 'GAME_COMPLETE': return 'Ganon vaincu !';
    default: return p.type;
  }
}
function linkHandle(m){
  link.lastAt = Date.now();
  if (m.type === 'hello'){
    linkLog('Relais connecté');
    link.status = m.game ? 'game' : 'relay';
    link.client = m.clientState || null; link.player = m.player || null;
    if (m.teamState) linkApply({ type:'UPDATE_TEAM_STATE', state:m.teamState });
    return;
  }
  if (m.type === 'game'){
    link.status = m.connected ? 'game' : 'relay';
    link.client = m.connected ? m.clientState : null;
    linkLog(m.connected ? 'Jeu connecté' : 'Jeu déconnecté');
    return;
  }
  if (m.type === 'client'){ link.client = m.clientState; return; }
  if (m.type === 'player'){ link.player = m.player; return; }
  if (m.type === 'packet'){
    if (m.packet.type !== 'SET_FLAG' && m.packet.type !== 'UNSET_FLAG') linkLog(linkDescribe(m.packet));
    linkApply(m.packet);
  }
}
// Statuts d'un check dans SoH (RandomizerCheckStatus, RandomizerMiscEnums.h) ; ramassé (4) et sauvegardé (5) = fait.
const CHECK_STATUS_FR = ['non vu', 'vu', 'identifié', 'repéré', 'ramassé', 'sauvegardé'];
const CHECK_DONE = 4;
// Application des paquets à la partie. Checks : un check fait dans le jeu est coché (jamais décoché : un check coché à
// la main reste coché). Étapes suivantes : objets, position, entrées.
function linkApply(p){
  if (store.ui.link.checks){
    if (p.type === 'SET_CHECK_STATUS' && p.status >= CHECK_DONE) linkCheckDone(p.rc);
    if (p.type === 'UPDATE_TEAM_STATE'){
      const locs = p.state?.rando?.itemLocations || [];
      let n = 0;
      locs.forEach((x, rc) => { if (x && x[0] >= CHECK_DONE && linkCheckDone(rc)) n++; });
      if (n) linkLog(`${n} check${n > 1 ? 's' : ''} coché${n > 1 ? 's' : ''} d'après la sauvegarde`);
    }
  }
}
function linkCheckDone(rc){
  const c = CHECK_BY_NUM[rc];
  if (!c || store.game.checks[c.id]) return false;
  store.game.checks[c.id] = true;
  return true;
}

// (Re)connexion selon l'option, au chargement et quand elle change.
watch(() => [store.ui.link.enabled, store.ui.link.url], ([on]) => { if (on) linkStart(); else linkStop(); }, { immediate:true });
