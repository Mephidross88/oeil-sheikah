/* ---------- Fabrication des cartes (page Carte) depuis la ROM d'Ocarina of Time du joueur ----------
   Script classique chargé à la demande (pas par index.html) : par l'appli, quand le joueur choisit sa ROM sur la page
   Carte (cartes gardées dans le navigateur, voir mapsSave de components.js), et par tools/soh-maps/extract_maps.mjs
   (fichier data/maps-data.js). Rien de la ROM ne quitte la machine du joueur.

   extractMaps({ main, mq?, recipe, areas, checks, logic, progress?, warn? }) → Promise<{ data, stats }>
   - main, mq : octets de la ROM (Uint8Array) — ROM d'Ocarina of Time (N64 ou GameCube, compressée ou non : décompressée ici,
     format Yaz0 ; .v64 remise dans l'ordre), et ROM Master Quest facultative pour les donjons Master Quest (scènes « …_MQ »)
   - recipe : window.MAPS_RECIPE (data/maps-recipe.js, tiré des sources de SoH) ; areas, checks, logic : AREAS_DATA,
     CHECKS_DATA.checks, SOH_LOGIC
   - progress(texte, part 0..1) : étape en cours (l'appli rend la main au navigateur entre deux étapes) ; warn(texte)
   - data : contenu de window.MAPS_DATA (voir l'en-tête de data/maps-data.js) ; stats : nombres pour le compte rendu

   Données lues (format des scènes d'OoT, gros-boutiste) : en-tête de la scène (commandes de 8 octets), points
   d'apparition de Link (commande 0x00), liste des entrées de la scène (0x06 : point d'apparition par entrée),
   collision (0x03 : sommets, polygones avec normale). Position d'une sortie de l'appli = point d'apparition de l'entrée
   qui y fait arriver (table des entrées de SoH : scène et numéro d'entrée dans la scène) ; sortie située dans un
   intérieur : position de sa porte (sortie d'origine associée) ; grotte : point de retour de la grotte.
   Donjons : scène du donjon et de sa salle du boss, étages de la carte du menu pause, murs avec leur hauteur ; checks des
   donjons placés avec la ROM de leur version (vanilla : principale, MQ : mq) ; décors mobiles (couloirs tordus de la
   Forêt) : collision de leur objet (table des objets), placée comme l'acteur. */
async function extractMaps({ main, mq, recipe, areas, checks:CHECKS_RAW, logic:LOGIC, progress, warn }){
  const step = async (text, part) => { if (progress){ progress(text, part); await new Promise(r => setTimeout(r, 0)); } };
  warn = warn || (() => {});

  /* ---------- Octets gros-boutistes (Uint8Array, dans le navigateur comme dans Node) ---------- */
  class Bytes {
    constructor(a){ this.a = a; this.v = new DataView(a.buffer, a.byteOffset, a.byteLength); this.length = a.length; }
    readUInt8(o){ return this.a[o]; }
    readUInt16BE(o){ return this.v.getUint16(o); }
    readInt16BE(o){ return this.v.getInt16(o); }
    readUInt32BE(o){ return this.v.getUint32(o); }
    subarray(s, e){ return new Bytes(this.a.subarray(s, e)); }
  }

  /* ---------- ROM : décompression et table des scènes ----------
     Table des fichiers (dmadata : début et fin virtuels, début et fin dans la ROM ; fin 0 = non compressé) repérée par ses
     deux premières entrées ; fichiers compressés en Yaz0. Table des scènes (dans le code : 20 octets par scène, début et fin
     virtuels du fichier de la scène en tête) : là où une centaine d'entrées de suite désignent des fichiers de dmadata. */
  function yaz0(src, at, out, to){
    const size = (src[at + 4] << 24 >>> 0) + (src[at + 5] << 16) + (src[at + 6] << 8) + src[at + 7], end = to + size;
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
  const NOT_OOT = 'not-oot', NO_TABLE = 'no-scene-table';
  function loadRom(bytes){
    let a = bytes;
    const be32 = (x, o) => (x[o] << 24 >>> 0) + (x[o + 1] << 16) + (x[o + 2] << 8) + x[o + 3];
    if (be32(a, 0) === 0x37804012){ a = a.slice(); for (let i = 0; i + 1 < a.length; i += 2){ const t = a[i]; a[i] = a[i + 1]; a[i + 1] = t; } }   // .v64
    // table des fichiers : ses deux premières entrées (0, 0x1060, 0, 0) puis (0x1060, …)
    const sig = [0, 0, 0, 0, 0, 0, 0x10, 0x60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10, 0x60];
    let dma = -1;
    for (let o = 0; o + sig.length <= a.length && dma < 0; o += 16){
      let k = 0; while (k < sig.length && a[o + k] === sig[k]) k++;
      if (k === sig.length) dma = o;
    }
    if (dma < 0) throw new Error(NOT_OOT);
    const files = [];
    for (let o = dma; o + 16 <= a.length; o += 16){
      const vs = be32(a, o), ve = be32(a, o + 4), ps = be32(a, o + 8), pe = be32(a, o + 12);
      if (!ve) break;
      files.push({ vs, ve, ps, pe });
    }
    if (files.some(f => f.pe && f.ps !== 0xFFFFFFFF)){
      const out = new Uint8Array(Math.max(...files.map(f => f.ve)));
      for (const f of files){
        if (f.ps === 0xFFFFFFFF) continue;
        if (f.pe) yaz0(a, f.ps, out, f.vs); else out.set(a.subarray(f.ps, f.ps + (f.ve - f.vs)), f.vs);
      }
      a = out;
    }
    const rom = new Bytes(a);
    const isFile = new Map(files.map(f => [f.vs, f.ve]));
    let table = null;
    for (let o = 0; o + 20 * 100 < rom.length && table == null; o += 4){
      let k = 0;
      while (k < 100 && isFile.get(rom.readUInt32BE(o + k * 20)) === rom.readUInt32BE(o + k * 20 + 4) && rom.readUInt32BE(o + k * 20 + 4)) k++;
      if (k === 100) table = o;
    }
    if (table == null) throw new Error(NO_TABLE);
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
  await step('rom', 0);
  const MAIN = loadRom(main);
  await step('mq', 0.1);
  const MQ = mq ? loadRom(mq) : null;

  /* ---------- Sources de SoH (data/maps-recipe.js) ---------- */
  const SCENES = recipe.scenes;
  const ENTR = {};
  recipe.entr.forEach((e, n) => { if (e) ENTR[n] = { scene:SCENES[e[0]], spawn:e[1] }; });
  const GROTTO_RETURN = recipe.grottoReturn.map(([scene, x, y, z]) => ({ scene, x, y, z }));
  const LEVELS = recipe.levels, ACTORS = recipe.actors, OBJECTS = recipe.objects;
  const ACTOR_NAME = {};
  for (const [k, v] of Object.entries(ACTORS)) ACTOR_NAME[v] = k;
  const LOC = {};
  for (const [rc, [kind, scene, actor, two, params, quest]] of Object.entries(recipe.loc))
    LOC[rc] = { kind, scene:scene || undefined, actor:actor || undefined, two, params, quest:quest || undefined };

  // Sorties de l'appli
  const EXITS = {};
  for (const ar of areas) for (const e of ar.exits) EXITS[ar.id + '::' + e.id] = { ...e, areaId:ar.id };
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
    if (!(start > 0 && end > start && end <= rom.length)) throw new Error(NO_TABLE);
    const b = rom.subarray(start, end);
    const u8 = o => b.readUInt8(o), u32 = o => b.readUInt32BE(o), s16 = o => b.readInt16BE(o);
    const seg = a => a & 0x00FFFFFF;
    const cmds = {};
    for (let o = 0; o < 0x400; o += 8){ const c = u8(o); cmds[c] = { n:u8(o + 1), addr:seg(u32(o + 4)) }; if (c === 0x14) break; }
    const spawns = [];
    for (let i = 0; i < (cmds[0x00]?.n || 0); i++){ const o = cmds[0x00].addr + i * 16; spawns.push([s16(o + 2), s16(o + 4), s16(o + 6), s16(o + 10)]); }   // x, y, z, orientation (rotation y)
    // liste des entrées : (point d'apparition, salle) ; longueur non donnée, jusqu'à la donnée suivante de l'en-tête
    const next = Math.min(b.length, ...Object.values(cmds).map(v => v.addr).filter(a => a > (cmds[0x06]?.addr ?? Infinity)));
    const entrances = [];
    if (cmds[0x06]) for (let o = cmds[0x06].addr; o + 1 < next && entrances.length < 64; o += 2){ const sp = u8(o); if (sp >= spawns.length) break; entrances.push(sp); }
    // (salle de chaque entrée de la liste : octet suivant)
    const entranceRooms = entrances.map((_, i) => u8(cmds[0x06].addr + i * 2 + 1));
    // collision de la scène
    const { bounds, floors, walls, wallsY } = collision(b, cmds[0x03].addr);
    // acteurs des salles, toutes versions (commande 0x04 : salles { début, fin } ; dans chaque salle, en-tête principal et
    // en-têtes alternatifs — commande 0x18 : enfant / adulte, jour / nuit… — puis commande 0x01 : liste d'acteurs)
    // → [id, x, y, z, paramètres, rotation x, y, z, salle, couches], sans doublon ; couches : bits des couches où il figure
    // (0 enfant jour, 1 enfant nuit, 2 adulte jour, 3 adulte nuit, au-delà : cinématiques). Couche sans en-tête à elle : le
    // jeu prend celui de l'adulte de jour pour l'adulte de nuit, sinon l'en-tête principal (z_scene.c)
    const actors = [], seen = new Map();
    if (cmds[0x04]) for (let r = 0; r < cmds[0x04].n; r++){
      const rs = u32(cmds[0x04].addr + r * 8), re = u32(cmds[0x04].addr + r * 8 + 4), rb = rom.subarray(rs, re);
      const headers = [[0, 0]];
      for (let o = 0; o < 0x200 && o + 8 <= rb.length; o += 8){
        if (rb.readUInt8(o) === 0x18){ const a = rb.readUInt32BE(o + 4) & 0xFFFFFF;
          for (let i = 0; i < 20 && a + i * 4 + 4 <= rb.length; i++){ const h = rb.readUInt32BE(a + i * 4); if (h && h >>> 24 === 3 && (h & 0xFFFFFF) < rb.length) headers.push([h & 0xFFFFFF, i + 1]); } }
        if (rb.readUInt8(o) === 0x14) break;
      }
      const alt = Object.fromEntries(headers.slice(1).map(([h, l]) => [l, h]));
      const usedBy = l => alt[l] ?? (l === 3 ? alt[2] : undefined) ?? 0;
      const maskOf = (h, layer) => { let m = layer >= 4 ? 1 << layer : 0; for (let l = 0; l < 4; l++) if (usedBy(l) === h) m |= 1 << l; return m; };
      for (const [h, layer] of headers) for (let o = h; o < h + 0x200 && o + 8 <= rb.length; o += 8){
        const c = rb.readUInt8(o), w = rb.readUInt32BE(o + 4);
        if (c === 0x01 && w >>> 24 === 3 && (w & 0xFFFFFF) + rb.readUInt8(o + 1) * 16 <= rb.length){
          const a = w & 0xFFFFFF;
          for (let i = 0; i < rb.readUInt8(o + 1); i++){
            const q = a + i * 16, act = [rb.readUInt16BE(q), rb.readInt16BE(q + 2), rb.readInt16BE(q + 4), rb.readInt16BE(q + 6), rb.readUInt16BE(q + 14),
              rb.readInt16BE(q + 8), rb.readInt16BE(q + 10), rb.readInt16BE(q + 12)];
            const k = act.join(), was = seen.get(k);
            if (was){ was[9] |= maskOf(h, layer); continue; }
            act.push(r, maskOf(h, layer)); seen.set(k, act); actors.push(act);
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
      if (ch == null){ warn(`${name} : collision de ${spec[0]} introuvable (${heads.length} en-têtes possibles)`); continue; }
      const c = collision(ob, ch, [act[1], act[2], act[3], act[5], act[6], act[7]]);
      floors.push(...c.floors); walls.push(...c.walls); wallsY.push(...c.wallsY);
    }
    return (sceneCache[name] = { id, spawns, entrances, entranceRooms, actors, bounds:[bounds[0], bounds[2], bounds[3], bounds[5]], yRange:[bounds[1], bounds[4]], floors, walls, wallsY });
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
  // Donjons : scène du donjon (et de sa salle du boss) ; étages des dix donjons de la carte du menu pause (recipe.levels)
  const DUNGEON = new Set(['DEKU_TREE', 'DODONGOS_CAVERN', 'JABU_JABU', 'FOREST_TEMPLE', 'FIRE_TEMPLE', 'WATER_TEMPLE', 'SPIRIT_TEMPLE',
    'SHADOW_TEMPLE', 'BOTTOM_OF_THE_WELL', 'ICE_CAVERN', 'GERUDO_TRAINING_GROUND', 'INSIDE_GANONS_CASTLE', 'GANONS_TOWER',
    'DEKU_TREE_BOSS', 'DODONGOS_CAVERN_BOSS', 'JABU_JABU_BOSS', 'FOREST_TEMPLE_BOSS', 'FIRE_TEMPLE_BOSS', 'WATER_TEMPLE_BOSS',
    'SPIRIT_TEMPLE_BOSS', 'SHADOW_TEMPLE_BOSS'].map(n => 'SCENE_' + n));
  // intérieurs dessinés (comme les donjons : leurs checks restent aussi comptés à leur porte)
  const INTERIOR = new Set(['SCENE_TEMPLE_OF_TIME']);
  const MAPPED = new Set([...OUTDOOR, ...DUNGEON, ...INTERIOR]);
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
  const ACTOR_EN_OWL = ACTORS.ACTOR_EN_OWL;
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
  await step('exits', 0.2);
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

  /* ---------- Intérieurs et grottes ----------
     Une carte par intérieur (maison, boutique, fontaine, Repaire des Voleurs…), ouverte depuis sa porte sur la carte de la
     zone. Sortie située dans un intérieur : point d'apparition de l'entrée qui y fait arriver (grotte : entrée de la grotte
     à l'aller, recipe.grottoLoad). Scène partagée par des lieux de salles différentes (grottes : une salle par sorte de
     grotte, en grille) : une carte par salle (« SCÈNE#salle »), sol attribué à la salle du point d'apparition le plus
     proche ; sinon une carte pour la scène (lieux de même disposition : Grandes Fées, fontaines, stand de tir…). */
  await step('inside', 0.4);
  const INSIDE = new Set(['GROTTOS', 'FAIRYS_FOUNTAIN', 'MARKET_GUARD_HOUSE', 'FISHING_POND', 'THIEVES_HIDEOUT', 'WINDMILL_AND_DAMPES_GRAVE',
    'GRAVE_WITH_FAIRYS_FOUNTAIN', 'BAZAAR', 'KOKIRI_SHOP', 'GORON_SHOP', 'ZORA_SHOP', 'POTION_SHOP_KAKARIKO', 'POTION_SHOP_MARKET', 'BOMBCHU_SHOP',
    'LAKESIDE_LABORATORY', 'LON_LON_BUILDINGS', 'HOUSE_OF_SKULLTULA', 'MIDOS_HOUSE', 'SARIAS_HOUSE', 'BACK_ALLEY_HOUSE', 'GREAT_FAIRYS_FOUNTAIN_MAGIC',
    'GREAT_FAIRYS_FOUNTAIN_SPELLS', 'ROYAL_FAMILYS_TOMB', 'KNOW_IT_ALL_BROS_HOUSE', 'TWINS_HOUSE', 'LINKS_HOUSE', 'DOG_LADY_HOUSE', 'STABLE',
    'IMPAS_HOUSE', 'SHOOTING_GALLERY', 'BOMBCHU_BOWLING_ALLEY', 'POTION_SHOP_GRANNY', 'TREASURE_BOX_SHOP', 'REDEAD_GRAVE',
    'KAKARIKO_CENTER_GUEST_HOUSE', 'HAPPY_MASK_SHOP', 'CARPENTERS_TENT', 'GRAVEKEEPERS_HUT'].map(n => 'SCENE_' + n));
  function insideArrival(key){
    let n = ARRIVAL[key];
    if (n == null) return null;
    if (n >= 0x700 && n < 0x700 + (recipe.grottoLoad || []).length) n = recipe.grottoLoad[n - 0x700];
    else if (n >= 0x800) return null;
    n = REPURPOSED[n] ?? n;
    const t = ENTR[n];
    if (!t || !INSIDE.has(t.scene)) return null;
    const s = readScene(t.scene), sp = s.spawns[s.entrances[t.spawn] ?? t.spawn];
    return sp ? { scene:t.scene, x:sp[0], y:sp[1], z:sp[2], room:s.entranceRooms[t.spawn] ?? 0 } : null;
  }
  const insideAt = {};
  for (const key of Object.keys(EXITS)){ const a = insideArrival(key); if (a) insideAt[key] = a; }
  // scènes coupées par salle : lieux de salles différentes ; repères des salles : points d'apparition de la liste des entrées
  const SPLIT = {};
  for (const sc of INSIDE){
    const rooms = new Set(Object.values(insideAt).filter(a => a.scene === sc).map(a => a.room));
    if (rooms.size < 2) continue;
    const s = readScene(sc);
    SPLIT[sc] = s.entrances.map((sp, i) => s.spawns[sp] && [s.spawns[sp][0], s.spawns[sp][2], s.entranceRooms[i]]).filter(Boolean);
  }
  const roomAt = (sc, x, z) => { let best = null, d = Infinity; for (const [ax, az, r] of SPLIT[sc]){ const e = (x - ax) ** 2 + (z - az) ** 2; if (e < d){ d = e; best = r; } } return best; };
  // carte d'un point d'une scène : la scène, ou sa salle (scène coupée) ; nom sans « SCENE_ »
  const mapKeyOf = (sc, x, z) => { const n = sc.replace('SCENE_', ''); return SPLIT[sc] ? n + '#' + roomAt(sc, x, z) : n; };
  const inside = {};
  for (const [key, a] of Object.entries(insideAt)) inside[key] = [mapKeyOf(a.scene, a.x, a.z), Math.round(a.x), Math.round(a.z), Math.round(a.y)];

  /* ---------- Position de chaque check ----------
     Définitions des checks de SoH (recipe.loc) : genre, scène, acteur, paramètres.
     Scène d'extérieur : position de l'acteur (position x, z donnée par SoH pour jarres, caisses, herbes, arbres… ;
     sinon acteur des salles de même type et mêmes paramètres ; Skulltula : numéro de symbole, carré de terre pour celles
     des haricots ; pierre à potins et fées qu'on y fait apparaître ; fées des carrés de terre).
     Ailleurs (intérieur, grotte, donjon) : le lieu — sortie où l'on apparaît en y entrant, en remontant la logique de SoH
     de la région du check jusqu'à l'entrée qui y mène ; l'appli place le check à la porte qui mène à ce lieu selon les
     entrées notées. */
  await step('checks', 0.5);
  const sceneActorsOf = (scene, id) => readScene(scene).actors.filter(a => a[0] === id);
  const P = a => a && [a[1], a[3], a[2], a[9]];   // x, z, hauteur, couches de l'acteur
  let LOCATE_MQ = false;
  function locate(rc, depth = 0){
    // (poisson d'une grotte : sans scène dans SoH)
    const l = LOC[rc]?.kind === 'GrottoFish' ? { ...LOC[rc], scene:'SCENE_GROTTOS' } : LOC[rc];
    if (!l || !MAPPED.has(l.scene) && !INSIDE.has(l.scene) && !/^RC_TOT_\w+GOSSIP_STONE/.test(rc) || depth > 3) return null;
    if (DUNGEON.has(l.scene) && (l.quest === 'MQ') !== LOCATE_MQ && l.quest !== 'BOTH') return null;   // version de la ROM lue
    // scène coupée par salle (grottes) : acteurs de la salle du lieu du check seulement — une même salle sert à plusieurs
    // grottes, dont SoH distingue les coffres par d'autres paramètres que ceux de la ROM
    const room = SPLIT[l.scene] ? insideAt[placeOf(rc)]?.room : undefined;
    const actorsOf = (sc, id) => sceneActorsOf(sc, id).filter(a => room === undefined || a[8] === room);
    if (l.two){
      // position donnée par SoH ; hauteur : acteur des salles à cette position
      const a = readScene(l.scene).actors.find(a => Math.abs(a[1] - l.two[0]) <= 2 && Math.abs(a[3] - l.two[1]) <= 2);
      return [l.scene, ...l.two, a ? a[2] : null, a ? a[9] : undefined];
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
      const st = actorsOf(l.scene, ACTORS.ACTOR_EN_GS), hit = st.find(a => a[4] === l.params);
      if (hit) return [l.scene, ...P(hit)];
      // seule pierre d'un donjon (Caverne Dodongo Master Quest : autres paramètres que dans SoH) ou de la salle d'une grotte
      if ((DUNGEON.has(l.scene) || room !== undefined) && st.length === 1) return [l.scene, ...P(st[0])];
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
      const sw = actorsOf(l.scene, ACTORS.ACTOR_EN_SW).find(a => (a[4] & 0xFF) === (l.params & 0xFF));
      if (sw) return [l.scene, ...P(sw)];
      const soil = actorsOf(l.scene, ACTORS.ACTOR_OBJ_MAKEKINSUTA);
      // (seul carré de la scène : seulement pour une Skulltula de carré de terre — celle d'une caisse du Cratère n'y est pas)
      const hit = soil.find(a => (a[4] & 0xFF) === (l.params & 0xFF)) || (soil.length === 1 && /BEAN_PATCH/.test(rc) ? soil[0] : null);
      return hit ? [l.scene, ...P(hit)] : null;
    }
    if (l.kind === 'BeanFairy'){
      // fées des carrés de terre : la Skulltula du carré de terre homonyme, sinon le seul carré de terre (haricot) de la scène
      const gs = Object.keys(LOC).find(k => LOC[k].kind === 'GSToken' && LOC[k].scene === l.scene && /BEAN_PATCH/.test(k)
        && rc.replace(/_BEAN_SPROUT_FAIRY_\d+$/, '').replace(/^RC_/, '').split('_').slice(1).every(w => k.includes(w)));
      const beans = actorsOf(l.scene, ACTORS.ACTOR_OBJ_BEAN);
      return (gs && locate(gs, depth + 1)) || (beans.length === 1 ? [l.scene, ...P(beans[0])] : null);
    }
    // pestes Mojo marchandes des donjons : cachées dans la salle (En_Shopnuts), elles deviennent En_Dns une fois découvertes
    const id = ACTORS[l.actor === 'ACTOR_EN_DNS' && DUNGEON.has(l.scene) ? 'ACTOR_EN_SHOPNUTS' : l.actor];
    // (seul acteur de ce type dans la scène : pris faute de mieux, sauf objets posés — En_Item00 — dont beaucoup naissent en
    // jeu : quart de cœur des fouilles d'Igor…)
    const same = id == null ? [] : actorsOf(l.scene, id), hit = same.find(a => a[4] === l.params) || (same.length === 1 && l.actor !== 'ACTOR_EN_ITEM00' ? same[0] : null);
    if (hit) return [l.scene, ...P(hit)];
    // salle de grotte, sans acteur ni position dans SoH (herbes, jarres… numérotées) : n-ième acteur de ce genre dans la salle
    // (ruches sans numéro : gauche, droite ; coffre d'une grotte générique : créé par En_Torch avec le contenu de la grotte)
    const kindActor = l.kind === 'Chest' ? 'ACTOR_EN_TORCH' : l.params == null && l.actor
      || { Grass:'ACTOR_EN_KUSA', Pot:'ACTOR_OBJ_TSUBO', Beehive:'ACTOR_OBJ_COMB', GrottoFish:'ACTOR_EN_FISH' }[l.kind];
    if (room !== undefined && kindActor && (!l.actor || l.params == null || l.kind === 'Chest')){
      const list = actorsOf(l.scene, ACTORS[kindActor]), n = /_RIGHT$/.test(rc) ? 2 : +(rc.match(/_(\d+)$/) || [])[1] || 1;
      if (list[n - 1] && (l.kind !== 'Chest' || list.length === 1)) return [l.scene, ...P(list[n - 1])];
    }
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
  const posOf = at => [mapKeyOf('SCENE_' + at[0].replace('SCENE_', ''), at[1], at[2]), Math.round(at[1]), Math.round(at[2])].concat(at[3] != null ? [Math.round(at[3])] : []);
  // âge d'un check d'après les couches de son acteur (poste de garde du Bourg : jarres d'enfant, jarres d'adulte…) : 'c' enfant
  // seulement, 'a' adulte seulement
  const checkLayer = {};
  const noteLayer = (id, at) => { const m = at && at[4]; if (!m) return; const c = m & 3, a = m & 12; if (c && !a) checkLayer[id] = 'c'; else if (a && !c) checkLayer[id] = 'a'; };
  for (const row of CHECKS_RAW){
    const id = row[0], rc = 'RC_' + id, l = LOC[rc];
    const at = locate(rc);
    if (at){ checkPos[id] = posOf(at); noteLayer(id, at); }
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
    // (pierre d'une grotte : aussi à la porte de son lieu, sur la carte de la zone)
    if (!at || INSIDE.has(LOC[rc].scene)){ const p = !OUTDOOR.has(LOC[rc].scene) && placeOf(rc); if (p) checkPlace[id] = p; else if (!at) (unplaced.HintStone = unplaced.HintStone || []).push(id); }
  }
  // entrée d'un donjon : sortie où l'on apparaît en y entrant depuis l'extérieur (lieu des sorties situées dans le donjon)
  const areaEntry = {};
  for (const [k, e] of Object.entries(EXITS)){
    const t = e.vanillaTargetExitId;
    if (e.type === 'dungeon' && t && EXITS[t] && EXITS[t].areaId !== e.areaId && pos[k] && !(EXITS[t].areaId in areaEntry)) areaEntry[EXITS[t].areaId] = t;
  }

  /* ---------- Donjons Master Quest (ROM mq) ----------
     Scènes « …_MQ » (sol de la ROM Master Quest, mêmes étages), sorties qui y arrivent (exitsMq) et checks des versions
     Master Quest et communs (checksMq), lus avec les acteurs de la ROM Master Quest. */
  const MQ_SCENES = ['DEKU_TREE', 'DODONGOS_CAVERN', 'JABU_JABU', 'FOREST_TEMPLE', 'FIRE_TEMPLE', 'WATER_TEMPLE', 'SPIRIT_TEMPLE',
    'SHADOW_TEMPLE', 'BOTTOM_OF_THE_WELL', 'ICE_CAVERN', 'GERUDO_TRAINING_GROUND', 'INSIDE_GANONS_CASTLE'].map(n => 'SCENE_' + n);
  const exitsMq = {}, checksMq = {};
  if (readSceneMq){
    await step('mqChecks', 0.7);
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

  /* ---------- Positions notées en jouant (positions.json) ou placées à la main (Carte → positions-manuelles.json),
     reprises dans recipe.manual ----------
     Position de Link quand il a ramassé le check : seulement pour les checks sans position (scène d'extérieur ou de donjon) ;
     donjon Master Quest : check Master Quest dans la scène « …_MQ », check commun dans les deux versions. */
  const MANUAL = recipe.manual || {};
  const QUEST = Object.fromEntries(CHECKS_RAW.map(r => [r[0], r[3]]));
  let nManual = 0;
  for (const [id, m] of Object.entries(MANUAL)){
    if (!(id in QUEST) || !MAPPED.has('SCENE_' + m.scene) && !INSIDE.has('SCENE_' + m.scene) || m.x == null) continue;
    const at = [mapKeyOf('SCENE_' + m.scene, m.x, m.z), m.x, m.z, m.y], mqScene = MQ_SCENES.includes('SCENE_' + m.scene) && readSceneMq;
    if (mqScene && QUEST[id] === 'M'){ if (!checksMq[id]){ checksMq[id] = [m.scene + '_MQ', m.x, m.z, m.y]; nManual++; } continue; }
    if (!checkPos[id]){ checkPos[id] = at; nManual++; }
    if (mqScene && QUEST[id] === 'B' && !checksMq[id]) checksMq[id] = [m.scene + '_MQ', m.x, m.z, m.y];
  }
  // checks sans lieu dans le monde : Poche de Link (donnée au début de la partie) → maison de Link ; Cadeau de Rauru (Chambre
  // des Sages, sans carte) → piédestal de l'Épée de Légende (position notée en jouant ; voir SAME_AS de capture_positions.mjs)
  if (!checkPlace.LINKS_POCKET) checkPlace.LINKS_POCKET = 'kokiri_forest::links_to_kf';
  if (!checkPos.GIFT_FROM_RAURU && checkPos.TOT_MASTER_SWORD) checkPos.GIFT_FROM_RAURU = checkPos.TOT_MASTER_SWORD;
  for (const k of Object.keys(unplaced)){ unplaced[k] = unplaced[k].filter(id => !checkPos[id] && !checksMq[id] && !checkPlace[id]); if (!unplaced[k].length) delete unplaced[k]; }

  /* ---------- Résultat ---------- */
  await step('floors', 0.85);
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
  // intérieurs : une carte par scène, ou par salle (scène coupée)
  for (const sc of INSIDE){
    const s = readScene(sc), name = sc.replace('SCENE_', '');
    if (!SPLIT[sc]){ scenes[name] = { bounds:s.bounds, y:s.yRange, floors:s.floors.flat(), walls:s.walls.flat(), kind:'inside' }; continue; }
    const by = {}, get = r => by[r] = by[r] || { floors:[], walls:[] };
    for (const f of s.floors) get(roomAt(sc, (f[0] + f[2] + f[4]) / 3, (f[1] + f[3] + f[5]) / 3)).floors.push(f);
    for (const w of s.walls) get(roomAt(sc, (w[0] + w[2]) / 2, (w[1] + w[3]) / 2)).walls.push(w);
    for (const [r, g] of Object.entries(by)){
      if (!g.floors.length) continue;
      const xs = g.floors.flatMap(f => [f[0], f[2], f[4]]), zs = g.floors.flatMap(f => [f[1], f[3], f[5]]), ys = g.floors.map(f => f[6]);
      scenes[name + '#' + r] = { bounds:[Math.min(...xs), Math.min(...zs), Math.max(...xs), Math.max(...zs)], y:[Math.min(...ys), Math.max(...ys)],
        floors:g.floors.flat(), walls:g.walls.flat(), kind:'inside' };
    }
  }
  await step('done', 1);
  const data = { scenes, exits:pos, exitRot, checks:checkPos, places:checkPlace, areaEntry, exitsMq, checksMq, inside, checkLayer };
  const missingByArea = {};
  for (const k of missing) (missingByArea[EXITS[k].areaId] = missingByArea[EXITS[k].areaId] || []).push(EXITS[k].label);
  return { data, stats:{ scenes:Object.keys(scenes).length, triangles:Object.values(scenes).reduce((n, s) => n + s.floors.length / 7, 0),
    exits:Object.keys(pos).length, checks:Object.keys(checkPos).length, places:Object.keys(checkPlace).length, mq:!!readSceneMq,
    exitsMq:Object.keys(exitsMq).length, checksMq:Object.keys(checksMq).length, manual:nManual, unplaced, missingByArea,
    insideMaps:Object.values(scenes).filter(s => s.kind === 'inside').length, insideExits:Object.keys(inside).length,
    insideChecks:Object.values(checkPos).filter(p => scenes[p[0]]?.kind === 'inside').length } };
}
// erreurs reconnues (messages de l'appli et de l'outil) : pas une ROM d'Ocarina of Time ; table des scènes introuvable
const MAPS_ERR = { NOT_OOT:'not-oot', NO_TABLE:'no-scene-table' };
