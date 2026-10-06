// Cartes des zones (page Carte) : extrait de la ROM d'Ocarina of Time de l'utilisateur la géométrie du sol vue de dessus
// et la position de chaque sortie, et écrit data/maps-data.js. Outil lancé à la main, jamais chargé par l'appli. Le
// fichier produit vient de la ROM : il n'est pas versionné (.gitignore), chacun le régénère depuis sa propre cartouche.
//
// Usage : node tools/soh-maps/extract_maps.mjs <rom .z64> [--mq=<rom Master Quest .z64>] [--table=0x…]
//   ROM : Ocarina of Time (N64 ou GameCube, compressée ou non : décompressée ici, format Yaz0) ; la table des scènes est
//   trouvée seule (--table : son adresse, si la recherche échoue). --mq : ROM Master Quest (ex. GameCube), pour les
//   donjons Master Quest (scènes « …_MQ » : sol, sorties et checks MQ).
//
// Données lues (format des scènes d'OoT, gros-boutiste) : en-tête de la scène (commandes de 8 octets), points
// d'apparition de Link (commande 0x00), liste des entrées de la scène (0x06 : point d'apparition par entrée),
// collision (0x03 : sommets, polygones avec normale). Position d'une sortie de l'appli = point d'apparition de l'entrée
// qui y fait arriver (entrance_table.h de SoH : scène et numéro d'entrée dans la scène) ; sortie située dans un
// intérieur : position de sa porte (sortie d'origine associée) ; grotte : point de retour de la grotte
// (randomizer_grotto.c). Donjons : scène du donjon et de sa salle du boss, étages de la carte du menu pause (z_map_data.c),
// murs avec leur hauteur ; checks des donjons placés avec la ROM de leur version (vanilla : principale, MQ : --mq) ;
// décors mobiles (couloirs tordus de la Forêt) : collision de leur objet (table des objets), placée comme l'acteur.
// Sources SoH : tools/soh-checks/src (fetch_sources.mjs).
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(HERE, '../..'), SRC = path.join(APP, 'tools/soh-checks/src');
const args = process.argv.slice(2), romFile = args.find(a => !a.startsWith('--'));
const opt = k => args.find(a => a.startsWith('--' + k + '='))?.split('=').slice(1).join('=');
if (!romFile){ console.error('Usage : node tools/soh-maps/extract_maps.mjs <rom .z64> [--mq=<rom Master Quest .z64>] [--table=0x…]'); process.exit(2); }

/* ---------- ROM : décompression et table des scènes ----------
   Table des fichiers (dmadata : début et fin virtuels, début et fin dans la ROM ; fin 0 = non compressé) repérée par ses
   deux premières entrées ; fichiers compressés en Yaz0. Table des scènes (dans le code : 20 octets par scène, début et fin
   virtuels du fichier de la scène en tête) : là où une centaine d'entrées de suite désignent des fichiers de dmadata. */
function yaz0(src, at, out, to){
  const size = src.readUInt32BE(at + 4), end = to + size;
  let i = at + 16, o = to;
  while (o < end){
    const code = src[i++];
    for (let b = 7; b >= 0 && o < end; b--){
      if (code & (1 << b)) out[o++] = src[i++];
      else {
        const b1 = src[i++], b2 = src[i++], dist = ((b1 & 0x0F) << 8 | b2) + 1;
        let n = b1 >> 4; if (!n) n = src[i++] + 0x12; else n += 2;
        for (let k = 0; k < n; k++, o++) out[o] = out[o - dist];
      }
    }
  }
}
function loadRom(file, table){
  let rom = fs.readFileSync(file);
  if (rom.readUInt32BE(0) === 0x37804012) for (let i = 0; i + 1 < rom.length; i += 2){ const t = rom[i]; rom[i] = rom[i + 1]; rom[i + 1] = t; }   // .v64
  const sig = Buffer.from([0, 0, 0, 0, 0, 0, 0x10, 0x60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10, 0x60]);
  const dma = rom.indexOf(sig);
  if (dma < 0) throw new Error(file + ' : table des fichiers introuvable (ROM d\u2019Ocarina of Time ?)');
  const files = [];
  for (let o = dma; ; o += 16){
    const vs = rom.readUInt32BE(o), ve = rom.readUInt32BE(o + 4), ps = rom.readUInt32BE(o + 8), pe = rom.readUInt32BE(o + 12);
    if (!ve) break;
    files.push({ vs, ve, ps, pe });
  }
  if (files.some(f => f.pe && f.ps !== 0xFFFFFFFF)){
    const out = Buffer.alloc(Math.max(...files.map(f => f.ve)));
    for (const f of files){
      if (f.ps === 0xFFFFFFFF) continue;
      if (f.pe) yaz0(rom, f.ps, out, f.vs); else rom.copy(out, f.vs, f.ps, f.ps + (f.ve - f.vs));
    }
    rom = out;
  }
  const isFile = new Map(files.map(f => [f.vs, f.ve]));
  if (table == null){
    for (let o = 0; o + 20 * 100 < rom.length && table == null; o += 4){
      let k = 0;
      while (k < 100 && isFile.get(rom.readUInt32BE(o + k * 20)) === rom.readUInt32BE(o + k * 20 + 4) && rom.readUInt32BE(o + k * 20 + 4)) k++;
      if (k === 100) table = o;
    }
    if (table == null) throw new Error(file + ' : table des scènes introuvable (--table=0x… ?)');
  }
  // table des objets (dans le code : début et fin virtuels de chaque fichier d'objet, 8 octets ; objet 0 inutilisé, quelques
  // entrées vides) : là où près de 400 entrées de suite sont vides ou commencent à un fichier de dmadata
  let objects = null;
  for (let o = 0; o + 8 * 400 < rom.length && objects == null; o += 4){
    if (rom.readUInt32BE(o) || rom.readUInt32BE(o + 4) || !rom.readUInt32BE(o + 8) || !isFile.has(rom.readUInt32BE(o + 8))) continue;
    let k = 1, nf = 0;
    for (; k < 400; k++){
      const vs = rom.readUInt32BE(o + k * 8), ve = rom.readUInt32BE(o + k * 8 + 4);
      if (vs || ve){ if (!vs || !isFile.has(vs) || ve < vs) break; nf++; }   // (objet vide : fin = début)
    }
    if (k >= 380 && nf >= 350) objects = o;
  }
  return { rom, table, objects };
}
const MAIN = loadRom(romFile, opt('table') ? parseInt(opt('table')) : null);
const MQ = opt('mq') ? loadRom(opt('mq'), null) : null;

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

/* ---------- Collision ----------
   En-tête de collision à l'adresse ch de b (pointeurs : segment + décalage dans b) : sols et pentes (normale vers le haut),
   en triangles vus de dessus [x1, z1, x2, z2, x3, z3, hauteur moyenne], et murs. place : position et rotation (angles du
   jeu, 0x10000 = un tour) d'un décor mobile (acteur à collision : son objet est placé comme lui, rotation Y·X·Z). */
function collision(b, ch, place){
  const u16 = o => b.readUInt16BE(o), s16 = o => b.readInt16BE(o), u32 = o => b.readUInt32BE(o), seg = a => a & 0x00FFFFFF;
  const bounds = [s16(ch), s16(ch + 2), s16(ch + 4), s16(ch + 6), s16(ch + 8), s16(ch + 10)];
  const vAddr = seg(u32(ch + 16)), nPoly = u16(ch + 20), pAddr = seg(u32(ch + 24));
  let rot = p => p, at = p => p;
  if (place){
    const [x, y, z, rx, ry, rz] = place, a = v => v * Math.PI / 0x8000;
    const [cx, sx, cy, sy, cz, sz] = [Math.cos(a(rx)), Math.sin(a(rx)), Math.cos(a(ry)), Math.sin(a(ry)), Math.cos(a(rz)), Math.sin(a(rz))];
    rot = ([px, py, pz]) => {
      [px, py] = [px * cz - py * sz, px * sz + py * cz];          // Z
      [py, pz] = [py * cx - pz * sx, py * sx + pz * cx];          // X
      [px, pz] = [px * cy + pz * sy, -px * sy + pz * cy];         // Y
      return [px, py, pz];
    };
    at = p => { const [px, py, pz] = rot(p); return [Math.round(px + x), Math.round(py + y), Math.round(pz + z)]; };
  }
  const V = i => at([s16(vAddr + i * 6), s16(vAddr + i * 6 + 2), s16(vAddr + i * 6 + 4)]);
  const floors = [], walls = [], wallsY = [];
  for (let i = 0; i < nPoly; i++){
    const o = pAddr + i * 16, v = [u16(o + 2) & 0x1FFF, u16(o + 4) & 0x1FFF, u16(o + 6) & 0x1FFF].map(V);
    const ny = rot([s16(o + 8), s16(o + 10), s16(o + 12)].map(n => n / 0x7FFF))[1];
    // sol et pentes, même raides (toits, rampes, falaises : sinon des trous vus de dessus) ; murs : verticaux (les murs inclinés feraient des pointes vus de dessus)
    if (ny > 0.2) floors.push([v[0][0], v[0][2], v[1][0], v[1][2], v[2][0], v[2][2], Math.round((v[0][1] + v[1][1] + v[2][1]) / 3)]);
    else if (Math.abs(ny) < 0.05){
      // mur : trait sombre de son étendue vue de dessus (ses deux points les plus éloignés), seulement pour les vrais murs
      // (au moins 60 unités de haut et de long) — les pans fins (rebords, mâts, bords de toit) feraient des pointes
      const ys = v.map(p => p[1]), h = Math.max(...ys) - Math.min(...ys);
      const d = (p, q) => Math.hypot(p[0] - q[0], p[2] - q[2]), pairs = [[v[0], v[1]], [v[1], v[2]], [v[2], v[0]]].sort((p, q) => d(q[0], q[1]) - d(p[0], p[1]));
      if (h >= 60 && d(...pairs[0]) >= 60){ walls.push([pairs[0][0][0], pairs[0][0][2], pairs[0][1][0], pairs[0][1][2]]); wallsY.push([Math.min(...ys), Math.max(...ys)]); }
    }
  }
  return { bounds, floors, walls, wallsY };
}
// Décors mobiles dont le sol compte (DynaPoly : pas dans la collision de la scène) : acteur → [objet, adresse de son en-tête
// de collision dans l'objet] selon ses paramètres (décompilation d'OoT). Couloirs tordus du Temple de la Forêt
// (Bg_Mori_Hineri : bit 15 → couloir 1 ou 2, à l'état droit).
const OBJECTS = {};
for (const m of fs.readFileSync(path.join(SRC, 'object_table.h'), 'utf8').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_OBJECT\w*\((?:\w+,\s*)?(OBJECT_\w+)/g)) OBJECTS[m[2]] = parseInt(m[1], 16);
// en-têtes de collision possibles d'un objet : pointeurs vers les sommets, les polygones et les surfaces (segment 6) qui
// tiennent dans l'objet, nombres plausibles, boîte englobante dans le bon sens
function colHeaders(ob){
  const out = [], ok = p => p >>> 24 === 6 && (p & 0xFFFFFF) < ob.length;
  for (let o = 0; o + 0x2C <= ob.length; o += 4){
    const nv = ob.readUInt16BE(o + 12), np = ob.readUInt16BE(o + 20), pv = ob.readUInt32BE(o + 16), pp = ob.readUInt32BE(o + 24);
    if (!nv || !np || nv > 0x2000 || np > 0x2000 || !ok(pv) || !ok(pp) || !ok(ob.readUInt32BE(o + 28))) continue;
    if ((pv & 0xFFFFFF) + nv * 6 > ob.length || (pp & 0xFFFFFF) + np * 16 > ob.length) continue;
    if ([0, 2, 4].every(k => ob.readInt16BE(o + k) <= ob.readInt16BE(o + 6 + k))) out.push(o);
  }
  return out;
}
const ACTOR_NAME = {};
for (const m of fs.readFileSync(path.join(SRC, 'actor_table.h'), 'utf8').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ACTOR\w*\(\w+,\s*(ACTOR_\w+)/g)) ACTOR_NAME[parseInt(m[1], 16)] = m[2];
const DYNA = {
  ACTOR_BG_MORI_HINERI: a => a[4] & 0x8000 ? ['OBJECT_MORI_HINERI2', 0x43D0] : ['OBJECT_MORI_HINERI1', 0x54B8],
};

/* ---------- Lecture des scènes ---------- */
// lecteur de scènes d'une ROM (la principale, ou la Master Quest) ; RD : celui en service (checks Master Quest : MQ)
const sceneReader = ({ rom, table:TABLE, objects:OBJ_TABLE }) => { const sceneCache = {}; return function readScene(name){
  if (sceneCache[name]) return sceneCache[name];
  const id = SCENES.indexOf(name);
  if (id < 0) throw new Error('scène inconnue ' + name);
  const start = rom.readUInt32BE(TABLE + id * 20), end = rom.readUInt32BE(TABLE + id * 20 + 4);
  if (!(start > 0 && end > start && end <= rom.length)) throw new Error(`table des scènes : entrée ${id} invalide (autre version ? --table=…)`);
  const b = rom.subarray(start, end);
  const u8 = o => b.readUInt8(o), u16 = o => b.readUInt16BE(o), s16 = o => b.readInt16BE(o), u32 = o => b.readUInt32BE(o);
  const seg = a => a & 0x00FFFFFF;
  const cmds = {};
  for (let o = 0; o < 0x400; o += 8){ const c = u8(o); cmds[c] = { n:u8(o + 1), addr:seg(u32(o + 4)) }; if (c === 0x14) break; }
  const spawns = [];
  for (let i = 0; i < (cmds[0x00]?.n || 0); i++){ const o = cmds[0x00].addr + i * 16; spawns.push([s16(o + 2), s16(o + 4), s16(o + 6), s16(o + 10)]); }   // x, y, z, orientation (rotation y)
  // liste des entrées : (point d'apparition, salle) ; longueur non donnée, jusqu'à la donnée suivante de l'en-tête
  const next = Math.min(b.length, ...Object.values(cmds).map(v => v.addr).filter(a => a > (cmds[0x06]?.addr ?? Infinity)));
  const entrances = [];
  if (cmds[0x06]) for (let o = cmds[0x06].addr; o + 1 < next && entrances.length < 64; o += 2){ const sp = u8(o); if (sp >= spawns.length) break; entrances.push(sp); }
  // collision de la scène
  const { bounds, floors, walls, wallsY } = collision(b, cmds[0x03].addr);
  // acteurs des salles, toutes versions (commande 0x04 : salles { début, fin } ; dans chaque salle, en-tête principal et
  // en-têtes alternatifs — commande 0x18 : enfant / adulte, jour / nuit… — puis commande 0x01 : liste d'acteurs)
  // → [id, x, y, z, paramètres, rotation x, y, z], sans doublon
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
          const q = a + i * 16, act = [rb.readUInt16BE(q), rb.readInt16BE(q + 2), rb.readInt16BE(q + 4), rb.readInt16BE(q + 6), rb.readUInt16BE(q + 14),
            rb.readInt16BE(q + 8), rb.readInt16BE(q + 10), rb.readInt16BE(q + 12)];
          if (!seen.has(act.join())){ seen.add(act.join()); actors.push(act); }
        }
      }
      if (c === 0x14) break;
    }
  }
  // décors mobiles : collision de leur objet, placée comme l'acteur, ajoutée à celle de la scène
  for (const act of actors){
    if (act[4] & 0x4000 && ACTOR_NAME[act[0]] === 'ACTOR_BG_MORI_HINERI') continue;   // variante tordue (en-tête alternatif)
    const spec = DYNA[ACTOR_NAME[act[0]]] && DYNA[ACTOR_NAME[act[0]]](act), oi = spec && OBJECTS[spec[0]];
    if (oi == null || OBJ_TABLE == null) continue;
    const os = rom.readUInt32BE(OBJ_TABLE + oi * 8), oe = rom.readUInt32BE(OBJ_TABLE + oi * 8 + 4), ob = rom.subarray(os, oe);
    // en-tête de collision : à l'adresse de la décompilation (version GameCube), sinon le seul de l'objet (autres versions)
    const heads = colHeaders(ob), ch = heads.includes(spec[1]) ? spec[1] : heads.length === 1 ? heads[0] : null;
    if (ch == null){ console.warn(`${name} : collision de ${spec[0]} introuvable (${heads.length} en-têtes possibles)`); continue; }
    const c = collision(ob, ch, [act[1], act[2], act[3], act[5], act[6], act[7]]);
    floors.push(...c.floors); walls.push(...c.walls); wallsY.push(...c.wallsY);
  }
  return (sceneCache[name] = { id, spawns, entrances, actors, bounds:[bounds[0], bounds[2], bounds[3], bounds[5]], yRange:[bounds[1], bounds[4]], floors, walls, wallsY });
}; };
const readSceneMain = sceneReader(MAIN), readSceneMq = MQ && sceneReader(MQ);
let RD = readSceneMain;
const readScene = name => RD(name);

/* ---------- Position de chaque sortie ---------- */
// Scènes d'extérieur affichées (une ou plusieurs par zone de l'appli)
const OUTDOOR = new Set(['KOKIRI_FOREST', 'LOST_WOODS', 'SACRED_FOREST_MEADOW', 'HYRULE_FIELD', 'LAKE_HYLIA', 'GERUDO_VALLEY',
  'GERUDOS_FORTRESS', 'HAUNTED_WASTELAND', 'DESERT_COLOSSUS', 'MARKET_ENTRANCE_DAY', 'MARKET_DAY', 'TEMPLE_OF_TIME_EXTERIOR_DAY',
  'BACK_ALLEY_DAY', 'HYRULE_CASTLE', 'KAKARIKO_VILLAGE', 'GRAVEYARD', 'DEATH_MOUNTAIN_TRAIL', 'GORON_CITY', 'DEATH_MOUNTAIN_CRATER',
  'ZORAS_RIVER', 'ZORAS_DOMAIN', 'ZORAS_FOUNTAIN', 'LON_LON_RANCH', 'OUTSIDE_GANONS_CASTLE'].map(n => 'SCENE_' + n));
// Donjons : scène du donjon (et de sa salle du boss) ; étages des dix donjons de la carte du menu pause (z_map_data.c :
// sFloorCoordY = hauteur au-dessus de laquelle on est à cet étage, sFloorID = nom ; donjon i = scène i)
const DUNGEON = new Set(['DEKU_TREE', 'DODONGOS_CAVERN', 'JABU_JABU', 'FOREST_TEMPLE', 'FIRE_TEMPLE', 'WATER_TEMPLE', 'SPIRIT_TEMPLE',
  'SHADOW_TEMPLE', 'BOTTOM_OF_THE_WELL', 'ICE_CAVERN', 'GERUDO_TRAINING_GROUND', 'INSIDE_GANONS_CASTLE', 'GANONS_TOWER',
  'DEKU_TREE_BOSS', 'DODONGOS_CAVERN_BOSS', 'JABU_JABU_BOSS', 'FOREST_TEMPLE_BOSS', 'FIRE_TEMPLE_BOSS', 'WATER_TEMPLE_BOSS',
  'SPIRIT_TEMPLE_BOSS', 'SHADOW_TEMPLE_BOSS'].map(n => 'SCENE_' + n));
// intérieurs dessinés (comme les donjons : leurs checks restent aussi comptés à leur porte)
const INTERIOR = new Set(['SCENE_TEMPLE_OF_TIME']);
const MAPPED = new Set([...OUTDOOR, ...DUNGEON, ...INTERIOR]);
const LEVELS = {};
{
  const src = fs.readFileSync(path.join(SRC, 'z_map_data.c'), 'utf8');
  const table = name => { const t = src.slice(src.indexOf(name)); return t.slice(t.indexOf('{') + 1, t.indexOf('};')).split(/\}\s*,?/).map(r => r.replace(/[{\s]|\/\*.*?\*\//g, '')).filter(r => r).map(r => r.split(',').filter(x => x)); };
  const ys = table('sFloorCoordY[10][8]'), ids = table('sFloorID[10][8]');
  ids.forEach((row, d) => {
    const lv = row.map((id, i) => id !== '0' ? { n:id.replace('F_', ''), min:parseFloat(ys[d][i]) } : null).filter(Boolean);
    if (lv.length > 1) LEVELS[SCENES[d]] = lv;
  });
}
// Tour de Ganon (sans étages dans le jeu) : étages d'après le sol — paliers = hauteurs où il y a beaucoup de sol (tranches de
// 40 unités, au moins 15 % de la plus fournie, à plus de 120 unités l'un de l'autre), limite à mi-hauteur entre deux
// paliers ; noms 1F, 2F… depuis le bas
const AUTO_LEVELS = ['SCENE_GANONS_TOWER'];
function autoLevels(floors){
  const area = {};
  for (const f of floors){
    const a = Math.abs((f[2] - f[0]) * (f[5] - f[1]) - (f[4] - f[0]) * (f[3] - f[1])) / 2, k = Math.round(f[6] / 40) * 40;
    area[k] = (area[k] || 0) + a;
  }
  const max = Math.max(...Object.values(area)), peaks = [];
  for (const k of Object.keys(area).map(Number).sort((a, b) => a - b)){
    if (area[k] < max * 0.15) continue;
    if (peaks.length && k - peaks[peaks.length - 1] <= 120){ if (area[k] > area[peaks[peaks.length - 1]]) peaks[peaks.length - 1] = k; }
    else peaks.push(k);
  }
  return peaks.map((k, i) => ({ n:(i + 1) + 'F', min:i ? Math.round((peaks[i - 1] + k) / 2) : -99999 })).reverse();
}
const ACTOR_EN_OWL = 0x014D;
// Entrées en quatre variantes de suite (enfant jour, enfant nuit, adulte jour, adulte nuit) ; le château d'Hyrule adulte est
// une autre scène (extérieur du Château de Ganon) : sorties « OGC … » de SoH, variante adulte jour (+2)
const ADULT_LAYER = key => /^OGC /.test(EXITS[key]?.soh || '');
// numéros d'entrée inutilisés que SoH réemploie (entrance.cpp) : sortie de la fontaine de la Grande Fée de l'extérieur du
// Château de Ganon (ENTR_POTION_SHOP_KAKARIKO_1) → sortie de fontaine du château, comme dans le jeu de base
const REPURPOSED = { 0x3E8:0x340 };
function arrivalPos(key){
  let n = ARRIVAL[key];
  if (n == null) return null;
  if (n >= 0x800 && n < 0x800 + GROTTO_RETURN.length){ const g = GROTTO_RETURN[n - 0x800]; return { scene:g.scene, x:g.x, y:g.y, z:g.z }; }
  n = REPURPOSED[n] ?? n;
  if (ADULT_LAYER(key) && ENTR[n + 2]?.scene === 'SCENE_OUTSIDE_GANONS_CASTLE') n += 2;
  const t = ENTR[n];
  if (!t || !MAPPED.has(t.scene)) return t ? { scene:t.scene } : null;
  const s = readScene(t.scene), sp = s.spawns[s.entrances[t.spawn] ?? t.spawn];
  return sp ? { scene:t.scene, x:sp[0], y:sp[1], z:sp[2], rot:sp[3] } : null;
}
// exitRot : orientation de Link quand il apparaît à la sortie (tourné vers l'intérieur de la zone ; angle du jeu, 0x10000 = un
// tour, 0 = vers le sud) — l'appli en tire la direction de la sortie
const pos = {}, missing = [], exitRot = {};
for (const [key, e] of Object.entries(EXITS)){
  if (e.areaId === 'spawns') continue;
  let p = arrivalPos(key);
  // sortie située dans un intérieur (on y apparaît dans une autre scène) : à sa porte (sortie d'origine associée, dans la zone)
  if (!p || !MAPPED.has(p.scene)){
    const v = e.vanillaTargetExitId, q = v && EXITS[v]?.areaId === e.areaId ? arrivalPos(v) : null;
    if (q && MAPPED.has(q.scene) && q.x != null) p = { ...q, door:true };
  }
  // envol du hibou : position du hibou (acteur des salles) dans la scène de la zone
  if ((!p || p.x == null) && e.type === 'owl'){
    const sc = Object.values(EXITS).filter(x => x.areaId === e.areaId).map(x => arrivalPos(x.areaId + '::' + x.id)).find(q => q && q.x != null && OUTDOOR.has(q.scene));
    const owl = sc && readScene(sc.scene).actors.find(a => a[0] === ACTOR_EN_OWL);
    if (owl) p = { scene:sc.scene, x:owl[1], y:owl[2], z:owl[3] };
  }
  if (!p || !MAPPED.has(p.scene) || p.x == null){ missing.push(key); continue; }
  pos[key] = [p.scene.replace('SCENE_', ''), Math.round(p.x), Math.round(p.z), Math.round(p.y)].concat(p.door ? [1] : []);
  if (!p.door && p.rot != null) exitRot[key] = p.rot;
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
    LOC[m[1]] = { kind:m[2], scene, actor, two:two && [+two[1], +two[2]], params:num ? Number(num[1]) & 0xFFFF : null,
      quest:(args.match(/\bRCQUEST_(\w+)/) || [])[1] };
  }
}
const sceneActorsOf = (scene, id) => readScene(scene).actors.filter(a => a[0] === id);
const P = a => a && [a[1], a[3], a[2]];   // x, z, hauteur
let LOCATE_MQ = false;
function locate(rc, depth = 0){
  const l = LOC[rc];
  if (!l || !MAPPED.has(l.scene) && !/^RC_TOT_\w+GOSSIP_STONE/.test(rc) || depth > 3) return null;
  if (DUNGEON.has(l.scene) && (l.quest === 'MQ') !== LOCATE_MQ && l.quest !== 'BOTH') return null;   // version de la ROM lue
  if (l.two){
    // position donnée par SoH ; hauteur : acteur des salles à cette position
    const a = readScene(l.scene).actors.find(a => Math.abs(a[1] - l.two[0]) <= 2 && Math.abs(a[3] - l.two[1]) <= 2);
    return [l.scene, ...l.two, a ? a[2] : null];
  }
  // fée qu'on fait apparaître à une pierre à potins : position de la pierre
  if (l.kind === 'StoneFairy'){
    const stone = rc.replace(/_FAIRY(_BIG)?$/, '');
    return locate(LOC[stone] ? stone : stone.replace('_MQ_', '_'), depth + 1);   // (pierre commune aux deux versions)
  }
  if (l.kind === 'HintStone'){
    // pierres du Temple du Temps (sans paramètres dans SoH) : de gauche à droite (ouest → est)
    if (rc.startsWith('RC_TOT_')){
      const sc = 'SCENE_TEMPLE_OF_TIME_EXTERIOR_DAY', st = sceneActorsOf(sc, ACTORS.ACTOR_EN_GS).sort((a, b) => a[1] - b[1]);
      const i = ['LEFTMOST', 'LEFT_CENTER', 'RIGHT_CENTER', 'RIGHTMOST'].findIndex(k => rc === `RC_TOT_${k}_GOSSIP_STONE`);
      return st[i] ? [sc, ...P(st[i])] : null;
    }
    const st = sceneActorsOf(l.scene, ACTORS.ACTOR_EN_GS), hit = st.find(a => a[4] === l.params);
    if (hit) return [l.scene, ...P(hit)];
    // seule pierre d'un donjon (Caverne Dodongo Master Quest : autres paramètres que dans SoH)
    if (DUNGEON.has(l.scene) && st.length === 1) return [l.scene, ...P(st[0])];
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
    // (seul carré de la scène : seulement pour une Skulltula de carré de terre — celle d'une caisse du Cratère n'y est pas)
    const hit = soil.find(a => (a[4] & 0xFF) === (l.params & 0xFF)) || (soil.length === 1 && /BEAN_PATCH/.test(rc) ? soil[0] : null);
    return hit ? [l.scene, ...P(hit)] : null;
  }
  if (l.kind === 'BeanFairy'){
    // fées des carrés de terre : la Skulltula du carré de terre homonyme, sinon le seul carré de terre (haricot) de la scène
    const gs = Object.keys(LOC).find(k => LOC[k].kind === 'GSToken' && LOC[k].scene === l.scene && /BEAN_PATCH/.test(k)
      && rc.replace(/_BEAN_SPROUT_FAIRY_\d+$/, '').replace(/^RC_/, '').split('_').slice(1).every(w => k.includes(w)));
    const beans = sceneActorsOf(l.scene, ACTORS.ACTOR_OBJ_BEAN);
    return (gs && locate(gs, depth + 1)) || (beans.length === 1 ? [l.scene, ...P(beans[0])] : null);
  }
  // pestes Mojo marchandes des donjons : cachées dans la salle (En_Shopnuts), elles deviennent En_Dns une fois découvertes
  const id = ACTORS[l.actor === 'ACTOR_EN_DNS' && DUNGEON.has(l.scene) ? 'ACTOR_EN_SHOPNUTS' : l.actor];
  // (seul acteur de ce type dans la scène : pris faute de mieux, sauf objets posés — En_Item00 — dont beaucoup naissent en
  // jeu : quart de cœur des fouilles d'Igor…)
  const same = id == null ? [] : sceneActorsOf(l.scene, id), hit = same.find(a => a[4] === l.params) || (same.length === 1 && l.actor !== 'ACTOR_EN_ITEM00' ? same[0] : null);
  if (hit) return [l.scene, ...P(hit)];
  // coffre de la clé du boss de la Forêt : apparaît avec le couloir tordu 1 (Bg_Mori_Hineri), à (+147, −245, −453) de lui
  if (l.actor === 'ACTOR_EN_BOX' && l.params === 0x27EE){
    const h = readScene(l.scene).actors.find(a => ACTOR_NAME[a[0]] === 'ACTOR_BG_MORI_HINERI' && !(a[4] & 0xC000));
    if (h) return [l.scene, h[1] + 147, h[3] - 453, h[2] - 245];
  }
  // salle du boss (réceptacle, récompense : apparaissent à la fin du combat) : centre de la salle
  if (/_BOSS$/.test(l.scene) && DUNGEON.has(l.scene)){ const b = readScene(l.scene).bounds; return [l.scene, (b[0] + b[2]) / 2, (b[1] + b[3]) / 2, null]; }
  return null;
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
const posOf = at => [at[0].replace('SCENE_', ''), Math.round(at[1]), Math.round(at[2])].concat(at[3] != null ? [Math.round(at[3])] : []);
for (const row of CHECKS_RAW){
  const id = row[0], rc = 'RC_' + id, l = LOC[rc];
  const at = locate(rc);
  if (at) checkPos[id] = posOf(at);
  if (at && OUTDOOR.has(at[0])) continue;
  // hors extérieur (et donjons aussi, pour leur porte) : le lieu
  if (l && !OUTDOOR.has(l.scene)){ const p = placeOf(rc); if (p){ checkPlace[id] = p; continue; } }
  if (at) continue;
  const k = l ? l.kind + (l.actor ? ' ' + l.actor.replace('ACTOR_', '') : '') : 'inconnu';
  (unplaced[k] = unplaced[k] || []).push(id);
}
// pierres à potins (pas dans la liste des checks de l'appli) : même placement, clé = nom SoH sans « RC_ »
for (const rc of Object.keys(LOC).filter(k => LOC[k].kind === 'HintStone')){
  const at = locate(rc), id = rc.slice(3);
  if (at) checkPos[id] = posOf(at);
  else { const p = !OUTDOOR.has(LOC[rc].scene) && placeOf(rc); if (p) checkPlace[id] = p; else (unplaced.HintStone = unplaced.HintStone || []).push(id); }
}
// entrée d'un donjon : sortie où l'on apparaît en y entrant depuis l'extérieur (lieu des sorties situées dans le donjon)
const areaEntry = {};
for (const [k, e] of Object.entries(EXITS)){
  const t = e.vanillaTargetExitId;
  if (e.type === 'dungeon' && t && EXITS[t] && EXITS[t].areaId !== e.areaId && pos[k] && !(EXITS[t].areaId in areaEntry)) areaEntry[EXITS[t].areaId] = t;
}

/* ---------- Donjons Master Quest (ROM --mq) ----------
   Scènes « …_MQ » (sol de la ROM Master Quest, mêmes étages), sorties qui y arrivent (exitsMq) et checks des versions
   Master Quest et communs (checksMq), lus avec les acteurs de la ROM Master Quest. */
const MQ_SCENES = ['DEKU_TREE', 'DODONGOS_CAVERN', 'JABU_JABU', 'FOREST_TEMPLE', 'FIRE_TEMPLE', 'WATER_TEMPLE', 'SPIRIT_TEMPLE',
  'SHADOW_TEMPLE', 'BOTTOM_OF_THE_WELL', 'ICE_CAVERN', 'GERUDO_TRAINING_GROUND', 'INSIDE_GANONS_CASTLE'].map(n => 'SCENE_' + n);
const exitsMq = {}, checksMq = {};
if (readSceneMq){
  RD = readSceneMq; LOCATE_MQ = true;
  for (const [key, p] of Object.entries(pos)) if (MQ_SCENES.includes('SCENE_' + p[0])){
    const q = arrivalPos(key);
    if (q && q.x != null) exitsMq[key] = [p[0] + '_MQ', Math.round(q.x), Math.round(q.z), Math.round(q.y)];
  }
  for (const row of CHECKS_RAW){
    const l = LOC['RC_' + row[0]];
    if (!l || !MQ_SCENES.includes(l.scene)) continue;
    const at = locate('RC_' + row[0]);
    if (at){ const q = posOf(at); q[0] += '_MQ'; checksMq[row[0]] = q; }
  }
  // pierres à potins des donjons (clé = nom SoH sans « RC_ », comme dans checks)
  for (const rc of Object.keys(LOC).filter(k => LOC[k].kind === 'HintStone' && MQ_SCENES.includes(LOC[k].scene))){
    const at = locate(rc);
    if (at){ const q = posOf(at); q[0] += '_MQ'; checksMq[rc.slice(3)] = q; }
  }
  RD = readSceneMain; LOCATE_MQ = false;
}

/* ---------- Positions notées en jouant (capture_positions.mjs → positions.json) ou placées à la main (Carte →
   positions-manuelles.json), versionnées ----------
   Position de Link quand il a ramassé le check : seulement pour les checks sans position (scène d'extérieur ou de donjon) ;
   donjon Master Quest : check Master Quest dans la scène « …_MQ », check commun dans les deux versions. */
// positions.json (notées en jouant) et positions-manuelles.json (placées sur la Carte de l'appli, mode « Placer les
// checks » : l'emporte)
const MANUAL = {};
for (const f of ['positions.json', 'positions-manuelles.json']){ const p = path.join(HERE, f); if (fs.existsSync(p)) Object.assign(MANUAL, JSON.parse(fs.readFileSync(p, 'utf8'))); }
const QUEST = Object.fromEntries(CHECKS_RAW.map(r => [r[0], r[3]]));
let nManual = 0;
for (const [id, m] of Object.entries(MANUAL)){
  if (!(id in QUEST) || !MAPPED.has('SCENE_' + m.scene) || m.x == null) continue;
  const at = [m.scene, m.x, m.z, m.y], mqScene = MQ_SCENES.includes('SCENE_' + m.scene) && readSceneMq;
  if (mqScene && QUEST[id] === 'M'){ if (!checksMq[id]){ checksMq[id] = [m.scene + '_MQ', m.x, m.z, m.y]; nManual++; } continue; }
  if (!checkPos[id]){ checkPos[id] = at; nManual++; }
  if (mqScene && QUEST[id] === 'B' && !checksMq[id]) checksMq[id] = [m.scene + '_MQ', m.x, m.z, m.y];
}
// checks sans lieu dans le monde : Poche de Link (donnée au début de la partie) → maison de Link ; Cadeau de Rauru (Chambre
// des Sages, sans carte) → piédestal de l'Épée de Légende (position notée en jouant ; voir SAME_AS de capture_positions.mjs)
if (!checkPlace.LINKS_POCKET) checkPlace.LINKS_POCKET = 'kokiri_forest::links_to_kf';
if (!checkPos.GIFT_FROM_RAURU && checkPos.TOT_MASTER_SWORD) checkPos.GIFT_FROM_RAURU = checkPos.TOT_MASTER_SWORD;
for (const k of Object.keys(unplaced)){ unplaced[k] = unplaced[k].filter(id => !checkPos[id] && !checksMq[id] && !checkPlace[id]); if (!unplaced[k].length) delete unplaced[k]; }

/* ---------- Écriture ---------- */
const scenes = {};
for (const name of MAPPED){
  const s = readScene(name), o = scenes[name.replace('SCENE_', '')] = { bounds:s.bounds, y:s.yRange, floors:s.floors.flat(), walls:s.walls.flat() };
  if (DUNGEON.has(name)){ o.wallsY = s.wallsY.flat(); o.kind = /_BOSS$/.test(name) ? 'boss' : 'dungeon'; }
  if (INTERIOR.has(name)) o.kind = 'interior';
  if (LEVELS[name]) o.levels = LEVELS[name];
  else if (AUTO_LEVELS.includes(name)) o.levels = autoLevels(s.floors);
}
if (readSceneMq) for (const name of MQ_SCENES){
  const s = readSceneMq(name);
  scenes[name.replace('SCENE_', '') + '_MQ'] = { bounds:s.bounds, y:s.yRange, floors:s.floors.flat(), walls:s.walls.flat(), wallsY:s.wallsY.flat(),
    kind:'dungeon', mq:1, ...(LEVELS[name] ? { levels:LEVELS[name] } : {}) };
}
const out = `/* Cartes des zones (page Carte) — FICHIER GÉNÉRÉ par tools/soh-maps/extract_maps.mjs depuis la ROM de l'utilisateur
   (non versionné). scenes : { SCÈNE: { bounds:[x0, z0, x1, z1], y:[min, max], floors:[x1, z1, x2, z2, x3, z3, hauteur, …],
   walls:[x1, z1, x2, z2, …], et pour les donjons wallsY:[bas, haut, …], kind:'dungeon'|'boss', mq?:1, levels?:[{ n:'2F',
   min: hauteur }] } } (coordonnées du jeu, vue de dessus, z vers le sud ; scène « …_MQ » : version Master Quest) ;
   exits : { 'zone::sortie': [scène, x, z, hauteur, porte?] } (porte : sortie située dans un intérieur, placée à sa porte) ;
   checks : { id: [scène, x, z, hauteur?] } (scènes d'extérieur et donjons vanilla) ; places : { id: sortie où l'on apparaît
   en entrant dans le lieu du check } (intérieur, grotte, donjon : placé à la porte qui y mène selon les entrées notées) ;
   areaEntry : { zone de donjon: sortie d'entrée } ; exitsMq, checksMq : de même dans les scènes Master Quest ; exitRot : { sortie:
   orientation de Link à son point d'apparition (angle du jeu, 0 = vers le sud) }. */
window.MAPS_DATA = ${JSON.stringify({ scenes, exits:pos, exitRot, checks:checkPos, places:checkPlace, areaEntry, exitsMq, checksMq })};
`;
const file = path.join(APP, 'data/maps-data.js');
fs.writeFileSync(file, out);
const nTri = Object.values(scenes).reduce((n, s) => n + s.floors.length / 7, 0);
if (readSceneMq) console.log(`Master Quest : ${Object.keys(exitsMq).length} sorties, ${Object.keys(checksMq).length} checks placés`);
if (nManual) console.log(`${nManual} checks placés d'après positions.json (notés en jouant)`);
console.log(`${Object.keys(scenes).length} scènes (${nTri} triangles de sol), ${Object.keys(pos).length} sorties placées, écrit dans ${file} (${Math.round(out.length / 1024)} Ko)`);
const byArea = {};
for (const k of missing) (byArea[EXITS[k].areaId] = byArea[EXITS[k].areaId] || []).push(EXITS[k].label);
console.log(`Checks : ${Object.keys(checkPos).length} placés en extérieur, ${Object.keys(checkPlace).length} rattachés à leur lieu (intérieur, grotte, donjon), ${Object.values(unplaced).flat().length} sans position :`,
  Object.entries(unplaced).map(([k, l]) => k + ' ' + l.length).join(', '));
console.log('Sorties sans position (hors scènes d\'extérieur) :', Object.entries(byArea).map(([a, l]) => a + ' ' + l.length).join(', '));
