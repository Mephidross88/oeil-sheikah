// Test de l'auto-tracking (js/link.js) : rejoue une partie enregistrée par le relais (paquets du jeu) dans l'appli
// (fichiers de js/ chargés dans un contexte Node, Vue simulé) et compare au spoiler de la seed. Outil lancé à la main,
// jamais chargé par l'appli. Aucune dépendance (Node 18+).
//
// Usage :
//   node tools/soh-link/replay_packets.mjs [fixture.json]
//       rejoue l'enregistrement de référence (défaut : tools/soh-link/fixtures/session.json) ;
//   node tools/soh-link/replay_packets.mjs --make-fixture <paquets.jsonl> <spoiler.json> [fixture.json]
//       fabrique un enregistrement de référence depuis un enregistrement du relais (relay.mjs --dump) et le spoiler de
//       la seed (allégés : quelques sauvegardes complètes, spoiler réduit à ce qui sert).
//
// Contrôles (sortie en erreur s'il y a un écart) :
//   1. sans spoiler, chaque entrée notée est celle du spoiler ;
//   2. sans spoiler, chaque question « Où êtes-vous arrivé ? » propose la bonne arrivée ;
//   3. sans spoiler, chaque objet trouvé (appariement objet reçu / check ramassé) est celui du spoiler ;
//   4. avec le spoiler caché, la position après chaque entrée découverte est la destination du spoiler.
// Pour information : arrivées où la position diffère avec et sans spoiler (arrivées ambiguës sans spoiler).
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(HERE, '../..');
const DEFAULT_FIXTURE = path.join(HERE, 'fixtures', 'session.json');
const args = process.argv.slice(2);

/* ---------- Fabrication d'un enregistrement de référence ---------- */
if (args[0] === '--make-fixture'){
  const [, packetsFile, spoilerFile, out = DEFAULT_FIXTURE] = args;
  if (!packetsFile || !spoilerFile){ console.error('Usage : --make-fixture <paquets.jsonl> <spoiler.json> [fixture.json]'); process.exit(2); }
  const all = fs.readFileSync(packetsFile, 'utf8').trim().split('\n').map(l => JSON.parse(l));
  // sauvegardes complètes : la première après chaque connexion du jeu et la dernière suffisent (rattrapages, objets)
  const keep = new Set();
  let wantTeam = true;
  all.forEach((p, i) => {
    if (p.type === 'HANDSHAKE') wantTeam = true;
    if (p.type === 'UPDATE_TEAM_STATE' && wantTeam){ keep.add(i); wantTeam = false; }
  });
  const lastTeam = all.map(p => p.type).lastIndexOf('UPDATE_TEAM_STATE');
  if (lastTeam >= 0) keep.add(lastTeam);
  const DROP = new Set(['SET_FLAG', 'UNSET_FLAG', 'REQUEST_TEAM_STATE']);
  const packets = all.filter((p, i) => !DROP.has(p.type) && (p.type !== 'UPDATE_TEAM_STATE' || keep.has(i)));
  const sp = JSON.parse(fs.readFileSync(spoilerFile, 'utf8'));
  const spoiler = { finalSeed:sp.finalSeed, settings:sp.settings, entrances:sp.entrances, locations:sp.locations };
  fs.mkdirSync(path.dirname(out), { recursive:true });
  fs.writeFileSync(out, JSON.stringify({ source:path.basename(packetsFile), spoilerFile:path.basename(spoilerFile), spoiler, packets }));
  console.log(`${packets.length} paquets sur ${all.length} gardés, écrits dans ${out} (${Math.round(fs.statSync(out).size / 1024)} Ko)`);
  process.exit(0);
}

/* ---------- Rejeu ---------- */
const fixture = JSON.parse(fs.readFileSync(args[0] || DEFAULT_FIXTURE, 'utf8'));
const SP = fixture.spoiler, P = fixture.packets;
const FILES = ['data/areas-data.js', 'data/checks-data.js', 'data/logic-data.js', 'data/link-data.js', 'js/icons.js', 'js/data.js',
  'js/config.js', 'js/entrances.js', 'js/items.js', 'js/checks.js', 'js/logic.js', 'js/state.js', 'js/link.js'];
const SOURCES = FILES.map(f => [f, fs.readFileSync(path.join(APP, f), 'utf8')]);

// Appli dans un contexte neuf : Vue simulé (pas de réactivité : les `computed` sont recalculés à chaque lecture),
// horloge pilotée par les paquets, localStorage en mémoire.
function makeApp(){
  const clock = { now:0 };
  const FakeDate = class extends Date { static now(){ return clock.now; } };
  const mem = {};
  const ctx = { console, Math, JSON, Object, Array, Set, Map, String, Number, Date:FakeDate, RegExp, Error, parseInt, isNaN,
    localStorage:{ getItem:k => mem[k] ?? null, setItem(k, v){ mem[k] = v; }, removeItem(k){ delete mem[k]; } },
    setInterval(){}, clearInterval(){} };   // (minuteries de l'appli : temps de jeu — inutiles au rejeu)
  ctx.window = ctx;
  ctx.Vue = { reactive:x => x, ref:v => ({ value:v }), computed:f => ({ get value(){ return f(); } }), watch(){}, watchEffect(){},
    createApp:() => ({ component(){ return this; }, mount(){} }), defineComponent:x => x, nextTick(){}, toRaw:x => x, h(){} };
  vm.createContext(ctx);
  for (const [f, src] of SOURCES) vm.runInContext(src, ctx, { filename:f });
  ctx.SP = SP;
  vm.runInContext(`
    for (const [n, raw] of Object.entries(SP.settings)){ const d = SETTING_BY_SOH[n]; if (d) store.settings[d.key] = d.type === 'number' ? parseInt(raw, 10) : String(raw); }
    Object.assign(store.ui.link, { checks:true, items:true, position:true, loot:true, entrances:true });
  `, ctx);
  const run = code => vm.runInContext(code, ctx);
  // constantes de l'appli (déclarées avec const/let : pas des propriétés du contexte)
  const G = Object.fromEntries(['EXIT', 'EXIT_BY_ARRIVAL', 'EXIT_BY_ENTR', 'AREA', 'store', 'link', 'CHECK_BY_ID', 'LINK_DATA', 'RG_BY_FR']
    .map(n => [n, run(n)]));
  run(`var OV = {}; SP.entrances.forEach(e => { OV[e.index] = e.override; });`);
  G.OV = ctx.OV;
  return { ctx, clock, run, G };
}
// Rejeu des paquets comme le relais les transmet ; onArrival(état du client) après chaque arrivée.
function replay(app, onArrival){
  for (const p of P){
    app.clock.now = p.t;
    if (p.type === 'HANDSHAKE') app.ctx.linkHandle({ type:'game', connected:true, clientState:p.clientState });
    else if (p.type === 'UPDATE_CLIENT_STATE'){ app.ctx.linkHandle({ type:'client', clientState:p.state }); onArrival?.(p); }
    else app.ctx.linkHandle({ type:'packet', packet:p });
  }
}
const time = t => new Date(t).toLocaleTimeString('fr-FR');
let failures = 0;
const fail = msg => { failures++; console.log('  ÉCART', msg); };

// --- sans spoiler ---
const A = makeApp();
const asks = [];
const askOrig = A.ctx.linkAskEntrance;
A.ctx.linkAskEntrance = (d, opts) => { asks.push({ d, opts:[...opts] }); return askOrig(d, opts); };
const posA = [];
replay(A, () => posA.push(A.G.link.position && { ...A.G.link.position }));
const { EXIT, EXIT_BY_ARRIVAL, EXIT_BY_ENTR, AREA, OV } = A.G;
const name = k => k && EXIT[k] ? AREA[EXIT[k].areaId].name + ' · ' + EXIT[k].label : '—';

console.log('1. Entrées notées sans spoiler');
let checked = 0;
for (const [src, t] of Object.entries(A.G.store.mappings)){
  const o = OV[EXIT[src].entr];
  if (o === undefined) continue;   // sens inverse écrit par setMapping en entrées couplées
  checked++;
  if (EXIT_BY_ARRIVAL[o] !== t) fail(`${name(src)} → ${name(t)}, attendu ${name(EXIT_BY_ARRIVAL[o])}`);
}
console.log(`   ${checked} entrées vérifiées`);

console.log('2. Questions « Où êtes-vous arrivé ? »');
for (const q of asks){
  const o = OV[q.d];
  if (!q.opts.includes(o)) fail(`${name(EXIT_BY_ENTR[q.d].key)} : la bonne arrivée (${name(EXIT_BY_ARRIVAL[o])}) n'est pas proposée`);
}
console.log(`   ${asks.length} questions posées`);

console.log('3. Objets trouvés sans spoiler');
const found = { ...A.G.store.game.found };
A.run(`linkSetSpoiler(SP, 'spoiler')`);
const locations = A.run('linkSpoiler.locations'), { RG_BY_FR, LINK_DATA, CHECK_BY_ID } = A.G;
let nFound = 0;
for (const [id, rg] of Object.entries(found)){
  const loc = locations[id];
  if (!loc) continue;
  nFound++;
  if ((RG_BY_FR[loc[0]] ?? loc[0]) !== rg && LINK_DATA.rgFr[rg] !== loc[0])
    fail(`${CHECK_BY_ID[id].label} : ${LINK_DATA.rgFr[rg] ?? rg}, attendu ${loc[0]}`);
}
console.log(`   ${nFound} objets vérifiés`);

// --- avec le spoiler caché ---
console.log('4. Position avec le spoiler caché');
const B = makeApp();
B.run(`linkSetSpoiler(SP, 'spoiler')`);
let nPos = 0;
const posB = [];
// position attendue : destination (spoiler) de la première entrée découverte juste avant l'arrivée
const discBefore = [];
{ let disc = null; for (const p of P){
  if (p.type === 'ENTRANCE_DISCOVERED' && !(disc && p.t - disc.t < 300)) disc = { d:p.entranceIndex, t:p.t };
  if (p.type === 'UPDATE_CLIENT_STATE'){ discBefore.push(disc && p.t - disc.t < 15000 ? disc.d : null); disc = null; }
} }
let k = 0;
replay(B, p => {
  const pos = B.G.link.position && { ...B.G.link.position };
  posB.push(pos);
  const d = discBefore[k++];
  if (d == null || !p.state.isSaveLoaded) return;
  const exp = EXIT_BY_ARRIVAL[OV[d]];
  if (!exp) return;
  nPos++;
  if (pos?.key !== exp) fail(`${time(p.t)} après ${name(EXIT_BY_ENTR[d]?.key)} : position ${name(pos?.key)}, attendu ${name(exp)}`);
});
console.log(`   ${nPos} arrivées vérifiées`);

console.log('Pour information : positions différentes sans spoiler');
let nDiff = 0;
P.filter(p => p.type === 'UPDATE_CLIENT_STATE').forEach((p, i) => {
  if (!p.state.isSaveLoaded || posA[i]?.key === posB[i]?.key) return;
  nDiff++;
  console.log(`   ${time(p.t)} : ${name(posA[i]?.key)} au lieu de ${name(posB[i]?.key)}`);
});
if (!nDiff) console.log('   aucune');

console.log(failures ? `\n${failures} écart(s)` : '\nAucun écart');
process.exit(failures ? 1 : 0);
