// Cartes des zones (page Carte) : extrait de la ROM d'Ocarina of Time de l'utilisateur la géométrie du sol vue de dessus
// et la position de chaque sortie, et écrit data/maps-data.js. Outil lancé à la main, jamais chargé par l'appli. Le
// fichier produit vient de la ROM : il n'est pas versionné (.gitignore), chacun le régénère depuis sa propre cartouche.
//
// Usage : node tools/soh-maps/extract_maps.mjs <rom décompressée .z64> [--table=0xB71440]
//   ROM : NTSC 1.0 décompressée (ex. sortie de « ndec ») ; --table : adresse de la table des scènes si autre version.
//
// Données lues (format des scènes d'OoT, gros-boutiste) : en-tête de la scène (commandes de 8 octets), points
// d'apparition de Link (commande 0x00), liste des entrées de la scène (0x06 : point d'apparition par entrée),
// collision (0x03 : sommets, polygones avec normale). Position d'une sortie de l'appli = point d'apparition de l'entrée
// qui y fait arriver (entrance_table.h de SoH : scène et numéro d'entrée dans la scène) ; sortie située dans un
// intérieur : position de sa porte (sortie d'origine associée) ; grotte : point de retour de la grotte
// (randomizer_grotto.c). Sources SoH : tools/soh-checks/src (fetch_sources.mjs).
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(HERE, '../..'), SRC = path.join(APP, 'tools/soh-checks/src');
const args = process.argv.slice(2), romFile = args.find(a => !a.startsWith('--'));
const tableArg = args.find(a => a.startsWith('--table='));
if (!romFile){ console.error('Usage : node tools/soh-maps/extract_maps.mjs <rom décompressée .z64> [--table=0xB71440]'); process.exit(2); }
const rom = fs.readFileSync(romFile);
const TABLE = tableArg ? parseInt(tableArg.split('=')[1]) : 0xB71440;

// Scènes de SoH (ordre = numéro) et table des entrées : numéro -> [scène, numéro d'entrée dans la scène]
const SCENES = [...fs.readFileSync(path.join(SRC, 'scene_table.h'), 'utf8').matchAll(/DEFINE_SCENE\(\w+,\s*\w+,\s*(SCENE_\w+)/g)].map(m => m[1]);
const ENTR = {};
for (const m of fs.readFileSync(path.join(SRC, 'entrance_table.h'), 'utf8').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ENTRANCE\((\w+),\s*(\w+),\s*(\d+)/g))
  ENTR[parseInt(m[1], 16)] = { scene:m[3], spawn:+m[4] };
// Grottes : point de retour de la grotte i (sortie 0x800 + i), dans la scène de sa zone
const grottoSrc = fs.readFileSync(path.join(SRC, 'randomizer_grotto.c'), 'utf8');
const grottoTable = grottoSrc.slice(grottoSrc.indexOf('grottoReturnTable'), grottoSrc.indexOf('};', grottoSrc.indexOf('grottoReturnTable')));
const ENTR_IDX = {};
for (const m of fs.readFileSync(path.join(SRC, 'entrance_table.h'), 'utf8').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ENTRANCE\((\w+)/g)) ENTR_IDX[m[2]] = parseInt(m[1], 16);
const GROTTO_RETURN = [...grottoTable.matchAll(/\.entranceIndex\s*=\s*(ENTR_\w+)[^}]*?\.pos\s*=\s*\{\s*\.x\s*=\s*(-?[\d.]+)f,\s*\.y\s*=\s*(-?[\d.]+)f,\s*\.z\s*=\s*(-?[\d.]+)f/g)]
  .map(m => ({ scene:ENTR[ENTR_IDX[m[1]]].scene, x:+m[2], y:+m[3], z:+m[4] }));

// Sorties de l'appli
const ctx = { window:{} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(APP, 'data/areas-data.js'), 'utf8'), ctx);
const EXITS = {};
for (const a of ctx.window.AREAS_DATA) for (const e of a.exits){ e.areaId = a.id; EXITS[a.id + '::' + e.id] = e; }
// entrée qui fait apparaître à chaque sortie (sa cible d'origine ; double sens d'abord, comme ARRIVAL_ENTR de logic.js)
const twoWay = e => e.vanillaTargetExitId && EXITS[e.vanillaTargetExitId]?.vanillaTargetExitId === e.areaId + '::' + e.id;
const ARRIVAL = {};
for (const two of [true, false]) for (const e of Object.values(EXITS))
  if (e.entr != null && e.vanillaTargetExitId && !e.specialTag && twoWay(e) === two && !(e.vanillaTargetExitId in ARRIVAL)) ARRIVAL[e.vanillaTargetExitId] = e.entr;

/* ---------- Lecture des scènes ---------- */
const sceneCache = {};
function readScene(name){
  if (sceneCache[name]) return sceneCache[name];
  const id = SCENES.indexOf(name);
  if (id < 0) throw new Error('scène inconnue ' + name);
  const start = rom.readUInt32BE(TABLE + id * 20), end = rom.readUInt32BE(TABLE + id * 20 + 4);
  if (!(start > 0 && end > start && end <= rom.length)) throw new Error(`table des scènes : entrée ${id} invalide (ROM non décompressée ou autre version ? --table=…)`);
  const b = rom.subarray(start, end);
  const u8 = o => b.readUInt8(o), u16 = o => b.readUInt16BE(o), s16 = o => b.readInt16BE(o), u32 = o => b.readUInt32BE(o);
  const seg = a => a & 0x00FFFFFF;
  const cmds = {};
  for (let o = 0; o < 0x400; o += 8){ const c = u8(o); cmds[c] = { n:u8(o + 1), addr:seg(u32(o + 4)) }; if (c === 0x14) break; }
  const spawns = [];
  for (let i = 0; i < (cmds[0x00]?.n || 0); i++){ const o = cmds[0x00].addr + i * 16; spawns.push([s16(o + 2), s16(o + 4), s16(o + 6)]); }
  // liste des entrées : (point d'apparition, salle) ; longueur non donnée, jusqu'à la donnée suivante de l'en-tête
  const next = Math.min(b.length, ...Object.values(cmds).map(v => v.addr).filter(a => a > (cmds[0x06]?.addr ?? Infinity)));
  const entrances = [];
  if (cmds[0x06]) for (let o = cmds[0x06].addr; o + 1 < next && entrances.length < 64; o += 2){ const sp = u8(o); if (sp >= spawns.length) break; entrances.push(sp); }
  // collision : sols et pentes (normale vers le haut), en triangles vus de dessus [x1, z1, x2, z2, x3, z3, hauteur moyenne]
  const ch = cmds[0x03].addr;
  const bounds = [s16(ch), s16(ch + 2), s16(ch + 4), s16(ch + 6), s16(ch + 8), s16(ch + 10)];
  const nVert = u16(ch + 12), vAddr = seg(u32(ch + 16)), nPoly = u16(ch + 20), pAddr = seg(u32(ch + 24));
  const V = i => [s16(vAddr + i * 6), s16(vAddr + i * 6 + 2), s16(vAddr + i * 6 + 4)];
  const floors = [], walls = [];
  for (let i = 0; i < nPoly; i++){
    const o = pAddr + i * 16, v = [u16(o + 2) & 0x1FFF, u16(o + 4) & 0x1FFF, u16(o + 6) & 0x1FFF].map(V), ny = s16(o + 10) / 0x7FFF;
    // sol et pentes, même raides (toits, rampes, falaises : sinon des trous vus de dessus) ; murs : verticaux (les murs inclinés feraient des pointes vus de dessus)
    if (ny > 0.2) floors.push([v[0][0], v[0][2], v[1][0], v[1][2], v[2][0], v[2][2], Math.round((v[0][1] + v[1][1] + v[2][1]) / 3)]);
    else if (Math.abs(ny) < 0.05){
      // mur : trait sombre de son étendue vue de dessus (ses deux points les plus éloignés), seulement pour les vrais murs
      // (au moins 60 unités de haut et de long) — les pans fins (rebords, mâts, bords de toit) feraient des pointes
      const ys = v.map(p => p[1]), h = Math.max(...ys) - Math.min(...ys);
      const d = (p, q) => Math.hypot(p[0] - q[0], p[2] - q[2]), pairs = [[v[0], v[1]], [v[1], v[2]], [v[2], v[0]]].sort((p, q) => d(q[0], q[1]) - d(p[0], p[1]));
      if (h >= 60 && d(...pairs[0]) >= 60) walls.push([pairs[0][0][0], pairs[0][0][2], pairs[0][1][0], pairs[0][1][2]]);
    }
  }
  // acteurs des salles, toutes versions (commande 0x04 : salles { début, fin } ; dans chaque salle, en-tête principal et
  // en-têtes alternatifs — commande 0x18 : enfant / adulte, jour / nuit… — puis commande 0x01 : liste d'acteurs)
  // → [id, x, y, z, paramètres], sans doublon
  const actors = [], seen = new Set();
  if (cmds[0x04]) for (let r = 0; r < cmds[0x04].n; r++){
    const rs = u32(cmds[0x04].addr + r * 8), re = u32(cmds[0x04].addr + r * 8 + 4), rb = rom.subarray(rs, re);
    const headers = [0];
    for (let o = 0; o < 0x200 && o + 8 <= rb.length; o += 8){
      if (rb[o] === 0x18){ const a = rb.readUInt32BE(o + 4) & 0xFFFFFF;
        for (let i = 0; i < 20 && a + i * 4 + 4 <= rb.length; i++){ const h = rb.readUInt32BE(a + i * 4); if (h && h >>> 24 === 3 && (h & 0xFFFFFF) < rb.length) headers.push(h & 0xFFFFFF); } }
      if (rb[o] === 0x14) break;
    }
    for (const h of headers) for (let o = h; o < h + 0x200 && o + 8 <= rb.length; o += 8){
      const c = rb[o], w = rb.readUInt32BE(o + 4);
      if (c === 0x01 && w >>> 24 === 3 && (w & 0xFFFFFF) + rb[o + 1] * 16 <= rb.length){
        const a = w & 0xFFFFFF;
        for (let i = 0; i < rb[o + 1]; i++){
          const q = a + i * 16, act = [rb.readUInt16BE(q), rb.readInt16BE(q + 2), rb.readInt16BE(q + 4), rb.readInt16BE(q + 6), rb.readUInt16BE(q + 14)];
          if (!seen.has(act.join())){ seen.add(act.join()); actors.push(act); }
        }
      }
      if (c === 0x14) break;
    }
  }
  return (sceneCache[name] = { id, spawns, entrances, actors, bounds:[bounds[0], bounds[2], bounds[3], bounds[5]], yRange:[bounds[1], bounds[4]], floors, walls });
}

/* ---------- Position de chaque sortie ---------- */
// Scènes d'extérieur affichées (une ou plusieurs par zone de l'appli)
const OUTDOOR = new Set(['KOKIRI_FOREST', 'LOST_WOODS', 'SACRED_FOREST_MEADOW', 'HYRULE_FIELD', 'LAKE_HYLIA', 'GERUDO_VALLEY',
  'GERUDOS_FORTRESS', 'HAUNTED_WASTELAND', 'DESERT_COLOSSUS', 'MARKET_ENTRANCE_DAY', 'MARKET_DAY', 'TEMPLE_OF_TIME_EXTERIOR_DAY',
  'BACK_ALLEY_DAY', 'HYRULE_CASTLE', 'KAKARIKO_VILLAGE', 'GRAVEYARD', 'DEATH_MOUNTAIN_TRAIL', 'GORON_CITY', 'DEATH_MOUNTAIN_CRATER',
  'ZORAS_RIVER', 'ZORAS_DOMAIN', 'ZORAS_FOUNTAIN', 'LON_LON_RANCH', 'OUTSIDE_GANONS_CASTLE'].map(n => 'SCENE_' + n));
const ACTOR_EN_OWL = 0x014D;
function arrivalPos(key){
  const n = ARRIVAL[key];
  if (n == null) return null;
  if (n >= 0x800 && n < 0x800 + GROTTO_RETURN.length){ const g = GROTTO_RETURN[n - 0x800]; return { scene:g.scene, x:g.x, y:g.y, z:g.z }; }
  const t = ENTR[n];
  if (!t || !OUTDOOR.has(t.scene)) return t ? { scene:t.scene } : null;
  const s = readScene(t.scene), sp = s.spawns[s.entrances[t.spawn] ?? t.spawn];
  return sp ? { scene:t.scene, x:sp[0], y:sp[1], z:sp[2] } : null;
}
const pos = {}, missing = [];
for (const [key, e] of Object.entries(EXITS)){
  if (e.areaId === 'spawns') continue;
  let p = arrivalPos(key);
  // sortie située dans un intérieur (on y apparaît dans une autre scène) : à sa porte (sortie d'origine associée, dans la zone)
  if (!p || !OUTDOOR.has(p.scene)){
    const v = e.vanillaTargetExitId, q = v && EXITS[v]?.areaId === e.areaId ? arrivalPos(v) : null;
    if (q && OUTDOOR.has(q.scene) && q.x != null) p = { ...q, door:true };
  }
  // envol du hibou : position du hibou (acteur des salles) dans la scène de la zone
  if ((!p || p.x == null) && e.type === 'owl'){
    const sc = Object.values(EXITS).filter(x => x.areaId === e.areaId).map(x => arrivalPos(x.areaId + '::' + x.id)).find(q => q && q.x != null && OUTDOOR.has(q.scene));
    const owl = sc && readScene(sc.scene).actors.find(a => a[0] === ACTOR_EN_OWL);
    if (owl) p = { scene:sc.scene, x:owl[1], y:owl[2], z:owl[3] };
  }
  if (!p || !OUTDOOR.has(p.scene) || p.x == null){ missing.push(key); continue; }
  pos[key] = [p.scene.replace('SCENE_', ''), Math.round(p.x), Math.round(p.z), Math.round(p.y)].concat(p.door ? [1] : []);
}

/* ---------- Position de chaque check ----------
   Définitions des checks de SoH (location_list.cpp, Shuffle*.cpp, fishsanity.cpp) : genre, scène, acteur, paramètres.
   Scène d'extérieur : position de l'acteur (position x, z donnée par SoH pour jarres, caisses, herbes, arbres… ;
   sinon acteur des salles de même type et mêmes paramètres ; Skulltula : numéro de symbole, carré de terre pour celles
   des haricots ; pierre à potins et fées qu'on y fait apparaître ; fées des carrés de terre).
   Ailleurs (intérieur, grotte, donjon) : le lieu — sortie où l'on apparaît en y entrant, en remontant la logique de SoH
   de la région du check jusqu'à l'entrée qui y mène ; l'appli place le check à la porte qui mène à ce lieu selon les
   entrées notées. */
const ACTORS = {};
for (const m of fs.readFileSync(path.join(SRC, 'actor_table.h'), 'utf8').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ACTOR\w*\(\w+,\s*(ACTOR_\w+)/g)) ACTORS[m[2]] = parseInt(m[1], 16);
const LOC = {};
for (const f of fs.readdirSync(SRC).filter(f => /^(location_list|fishsanity|Shuffle\w+)\.cpp$/.test(f))){
  for (const m of fs.readFileSync(path.join(SRC, f), 'utf8').matchAll(/locationTable\[(RC_\w+)\]\s*=\s*Location::(\w+)\(([^;]*?)\);/gs)){
    const args = m[3].replace(/\s+/g, ' '), scene = (args.match(/\b(SCENE_\w+)/) || [])[1], actor = (args.match(/\b(ACTOR_\w+)/) || [])[1];
    const after = scene ? args.slice(args.indexOf(scene) + scene.length) : '';
    const two = after.match(/^\s*,\s*TWO_ACTOR_PARAMS\((-?\d+),\s*(-?\d+)\)/), num = after.match(/^\s*,\s*(-?(?:0x[0-9A-Fa-f]+|\d+))/);
    LOC[m[1]] = { kind:m[2], scene, actor, two:two && [+two[1], +two[2]], params:num ? Number(num[1]) & 0xFFFF : null };
  }
}
const sceneActorsOf = (scene, id) => readScene(scene).actors.filter(a => a[0] === id);
const P = a => a && [a[1], a[3]];
function locate(rc, depth = 0){
  const l = LOC[rc];
  if (!l || !OUTDOOR.has(l.scene) && !/^RC_TOT_\w+GOSSIP_STONE/.test(rc) || depth > 3) return null;
  if (l.two) return [l.scene, ...l.two];
  // fée qu'on fait apparaître à une pierre à potins : position de la pierre
  if (l.kind === 'StoneFairy') return locate(rc.replace(/_FAIRY(_BIG)?$/, ''), depth + 1);
  if (l.kind === 'HintStone'){
    // pierres du Temple du Temps (sans paramètres dans SoH) : de gauche à droite (ouest → est)
    if (rc.startsWith('RC_TOT_')){
      const sc = 'SCENE_TEMPLE_OF_TIME_EXTERIOR_DAY', st = sceneActorsOf(sc, ACTORS.ACTOR_EN_GS).sort((a, b) => a[1] - b[1]);
      const i = ['LEFTMOST', 'LEFT_CENTER', 'RIGHT_CENTER', 'RIGHTMOST'].findIndex(k => rc === `RC_TOT_${k}_GOSSIP_STONE`);
      return st[i] ? [sc, ...P(st[i])] : null;
    }
    const st = sceneActorsOf(l.scene, ACTORS.ACTOR_EN_GS), hit = st.find(a => a[4] === l.params);
    if (hit) return [l.scene, ...P(hit)];
    // Fontaine Zora (sans paramètres ; versions enfant et adulte) : pierres dédoublonnées par position ; celle de Jabu-Jabu
    // est la plus proche de l'entrée de Jabu-Jabu, celle de la fée la plus proche de la fontaine de la Grande Fée
    const near = (key, list) => { const q = pos[key]; return q && [...list].sort((a, b) => Math.hypot(a[1] - q[1], a[3] - q[2]) - Math.hypot(b[1] - q[1], b[3] - q[2]))[0]; };
    const uniq = st.filter((a, i) => st.findIndex(b => b[1] === a[1] && b[3] === a[3]) === i);
    const hitZf = /JABU/.test(rc) ? near('zoras_fountain::fountain_to_jbjb', uniq) : /FAIRY/.test(rc) ? near('zoras_fountain::fountain_to_greatfairy', uniq) : null;
    return hitZf ? [l.scene, ...P(hitZf)] : null;
  }
  if (l.kind === 'GSToken'){
    // Skulltula : acteur Skulltula de même numéro de symbole (octet de poids faible) ; celles des carrés de terre
    // n'apparaissent qu'avec des insectes : position du carré de terre
    const sw = sceneActorsOf(l.scene, ACTORS.ACTOR_EN_SW).find(a => (a[4] & 0xFF) === (l.params & 0xFF));
    if (sw) return [l.scene, ...P(sw)];
    const soil = sceneActorsOf(l.scene, ACTORS.ACTOR_OBJ_MAKEKINSUTA);
    const hit = soil.find(a => (a[4] & 0xFF) === (l.params & 0xFF)) || (soil.length === 1 ? soil[0] : null);
    return hit ? [l.scene, ...P(hit)] : null;
  }
  if (l.kind === 'BeanFairy'){
    // fées des carrés de terre : la Skulltula du carré de terre homonyme, sinon le seul carré de terre (haricot) de la scène
    const gs = Object.keys(LOC).find(k => LOC[k].kind === 'GSToken' && LOC[k].scene === l.scene && /BEAN_PATCH/.test(k)
      && rc.replace(/_BEAN_SPROUT_FAIRY_\d+$/, '').replace(/^RC_/, '').split('_').slice(1).every(w => k.includes(w)));
    const beans = sceneActorsOf(l.scene, ACTORS.ACTOR_OBJ_BEAN);
    return (gs && locate(gs, depth + 1)) || (beans.length === 1 ? [l.scene, ...P(beans[0])] : null);
  }
  const id = ACTORS[l.actor];
  if (id == null) return null;
  const same = sceneActorsOf(l.scene, id), hit = same.find(a => a[4] === l.params) || (same.length === 1 ? same[0] : null);
  return hit ? [l.scene, ...P(hit)] : null;
}

// Lieu d'un check hors extérieur : région SoH du check → (en remontant les sorties des régions) région où mène une
// entrée → sortie où l'on apparaît en prenant cette entrée
const CHECKS_RAW = (() => { const c = { window:{} }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(APP, 'data/checks-data.js'), 'utf8'), c); return c.window.CHECKS_DATA.checks; })();
const LOGIC = (() => { const c = { window:{}, L:{} }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(APP, 'data/logic-data.js'), 'utf8'), c); return c.window.SOH_LOGIC; })();
const REV = {}, ENTR_TO = {};
for (const [rr, r] of Object.entries(LOGIC.regions)) for (const [to] of r.exits || []) (REV[to] = REV[to] || []).push(rr);
for (const [n, , , to] of LOGIC.entrances) (ENTR_TO[to] = ENTR_TO[to] || []).push(n);
const EXIT_BY_ENTR = {};
for (const [k, e] of Object.entries(EXITS)) if (e.entr != null) EXIT_BY_ENTR[e.entr] = k;
const CHECK_REGION = {};
for (const [rr, r] of Object.entries(LOGIC.regions)) for (const [rc] of r.checks || []) (CHECK_REGION[rc] = CHECK_REGION[rc] || rr);
function placeOf(rc){
  const start = CHECK_REGION[rc];
  if (!start) return null;
  const seenR = new Set([start]), q = [start];
  while (q.length){
    const rr = q.shift();
    for (const n of ENTR_TO[rr] || []){
      const w = EXIT_BY_ENTR[n], t = w && EXITS[w].vanillaTargetExitId;
      if (t && EXITS[t]) return t;
    }
    for (const p of REV[rr] || []) if (!seenR.has(p)){ seenR.add(p); q.push(p); }
  }
  return null;
}
const checkPos = {}, checkPlace = {}, unplaced = {};
for (const row of CHECKS_RAW){
  const id = row[0], rc = 'RC_' + id, l = LOC[rc];
  const at = locate(rc);
  if (at){ checkPos[id] = [at[0].replace('SCENE_', ''), Math.round(at[1]), Math.round(at[2])]; continue; }
  if (l && !OUTDOOR.has(l.scene)){ const p = placeOf(rc); if (p){ checkPlace[id] = p; continue; } }
  const k = l ? l.kind + (l.actor ? ' ' + l.actor.replace('ACTOR_', '') : '') : 'inconnu';
  (unplaced[k] = unplaced[k] || []).push(id);
}
// pierres à potins (pas dans la liste des checks de l'appli) : même placement, clé = nom SoH sans « RC_ »
for (const rc of Object.keys(LOC).filter(k => LOC[k].kind === 'HintStone')){
  const at = locate(rc), id = rc.slice(3);
  if (at) checkPos[id] = [at[0].replace('SCENE_', ''), Math.round(at[1]), Math.round(at[2])];
  else { const p = !OUTDOOR.has(LOC[rc].scene) && placeOf(rc); if (p) checkPlace[id] = p; else (unplaced.HintStone = unplaced.HintStone || []).push(id); }
}
// entrée d'un donjon : sortie où l'on apparaît en y entrant depuis l'extérieur (lieu des sorties situées dans le donjon)
const areaEntry = {};
for (const [k, e] of Object.entries(EXITS)){
  const t = e.vanillaTargetExitId;
  if (e.type === 'dungeon' && t && EXITS[t] && EXITS[t].areaId !== e.areaId && pos[k] && !(EXITS[t].areaId in areaEntry)) areaEntry[EXITS[t].areaId] = t;
}

/* ---------- Écriture ---------- */
const scenes = {};
for (const name of OUTDOOR){
  const s = readScene(name);
  scenes[name.replace('SCENE_', '')] = { bounds:s.bounds, y:s.yRange, floors:s.floors.flat(), walls:s.walls.flat() };
}
const out = `/* Cartes des zones (page Carte) — FICHIER GÉNÉRÉ par tools/soh-maps/extract_maps.mjs depuis la ROM de l'utilisateur
   (non versionné). scenes : { SCÈNE: { bounds:[x0, z0, x1, z1], y:[min, max], floors:[x1, z1, x2, z2, x3, z3, hauteur, …],
   walls:[x1, z1, x2, z2, …] } } (coordonnées du jeu, vue de dessus, z vers le sud) ; exits : { 'zone::sortie': [scène, x, z,
   hauteur, porte?] } (porte : sortie située dans un intérieur, placée à sa porte) ; checks : { id: [scène, x, z] } (checks
   des scènes d'extérieur) ; places : { id: sortie où l'on apparaît en entrant dans le lieu du check } (intérieur, grotte,
   donjon : placé à la porte qui y mène selon les entrées notées) ; areaEntry : { zone de donjon: sortie d'entrée }. */
window.MAPS_DATA = ${JSON.stringify({ scenes, exits:pos, checks:checkPos, places:checkPlace, areaEntry })};
`;
const file = path.join(APP, 'data/maps-data.js');
fs.writeFileSync(file, out);
const nTri = Object.values(scenes).reduce((n, s) => n + s.floors.length / 7, 0);
console.log(`${Object.keys(scenes).length} scènes (${nTri} triangles de sol), ${Object.keys(pos).length} sorties placées, écrit dans ${file} (${Math.round(out.length / 1024)} Ko)`);
const byArea = {};
for (const k of missing) (byArea[EXITS[k].areaId] = byArea[EXITS[k].areaId] || []).push(EXITS[k].label);
console.log(`Checks : ${Object.keys(checkPos).length} placés en extérieur, ${Object.keys(checkPlace).length} rattachés à leur lieu (intérieur, grotte, donjon), ${Object.values(unplaced).flat().length} sans position :`,
  Object.entries(unplaced).map(([k, l]) => k + ' ' + l.length).join(', '));
console.log('Sorties sans position (hors scènes d\'extérieur) :', Object.entries(byArea).map(([a, l]) => a + ' ' + l.length).join(', '));
