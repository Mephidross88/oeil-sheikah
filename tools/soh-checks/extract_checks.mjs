// Extrait les checks de SoH (cb71e22) : location_list.cpp + Shuffle*.cpp (métadonnées) et
// location_access/**.cpp (région de la logique de chaque check). Sortie : checks_raw.json.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const SRC = fileURLToPath(new URL('./src/', import.meta.url));

// --- zones (ordre de l'enum RandomizerCheckArea = ordre de rcAreaNames) ---
const objs = fs.readFileSync(SRC + 'randomizer_check_objects.cpp', 'utf8');
const areaNames = [...objs.matchAll(/\{ RCAREA_([A-Z_]+), "([^"]+)" \}/g)].map(m => [m[1], m[2]]).filter(a => a[0] !== 'INVALID');
const util = fs.readFileSync(SRC + 'util.cpp', 'utf8');
const pre = util.slice(util.indexOf('rcareaPrefixes = {'));
const prefixes = [...pre.slice(0, pre.indexOf('};')).matchAll(/"([^"]+)"/g)].map(m => m[1]);
const DUNGEON_AREAS = ['GANONS_CASTLE','GERUDO_TRAINING_GROUND','ICE_CAVERN','BOTTOM_OF_THE_WELL','SHADOW_TEMPLE','SPIRIT_TEMPLE',
  'WATER_TEMPLE','FIRE_TEMPLE','FOREST_TEMPLE','JABU_JABUS_BELLY','DODONGOS_CAVERN','DEKU_TREE'];
const areas = areaNames.map(([id, soh], i) => ({ id, soh, prefix:prefixes[i], dungeon:DUNGEON_AREAS.includes(id) }));
const PREFIX = Object.fromEntries(areas.map(a => [a.id, a.prefix]));

// --- scène -> zone (GetAreaFromScene) ---
const loc = fs.readFileSync(SRC + 'location.cpp', 'utf8');
const gafs = loc.slice(loc.indexOf('RandomizerCheckArea GetAreaFromScene'), loc.indexOf('Rando::Location Rando::Location::Base'));
const sceneArea = {};
let pending = [];
for (const line of gafs.split('\n')){
  const c = line.match(/case (SCENE_[A-Z0-9_]+):/); if (c) pending.push(c[1]);
  const r = line.match(/return RCAREA_([A-Z_]+);/); if (r){ pending.forEach(s => { sceneArea[s] = r[1]; }); pending = []; }
}

// --- type par défaut selon le constructeur ---
const FACTORY_TYPE = { GSToken:'SKULL_TOKEN', BeanFairy:'BEAN_FAIRY', Bush:'BUSH', Crate:'CRATE', Fish:'FISH', GrottoFish:'FISH',
  FountainFairy:'FOUNTAIN_FAIRY', Grass:'GRASS', HintStone:'GOSSIP_STONE', NLCrate:'NLCRATE', NLTree:'NLTREE',
  OtherHint:'STATIC_HINT', Pot:'POT', SmallCrate:'SMALL_CRATE', SongFairy:'SONG_FAIRY', StoneFairy:'STONE_FAIRY', Tree:'TREE' };

const files = ['location_list.cpp', 'fishsanity.cpp', ...fs.readdirSync(SRC).filter(f => /^Shuffle.*\.cpp$/.test(f))];
const checks = [];
for (const f of files){
  const text = fs.readFileSync(SRC + f, 'utf8');
  for (const m of text.matchAll(/locationTable\[(RC_[A-Z0-9_]+)\]\s*=\s*Location::([A-Za-z]+)\(([\s\S]*?)\);/g)){
    const [, rc, factory, args] = m;
    const strings = [...args.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(s => s[1]);
    const quest = (args.match(/RCQUEST_(BOTH|VANILLA|MQ)/) || [])[1];
    const type = (args.match(/RCTYPE_([A-Z_]+)/) || [])[1] || FACTORY_TYPE[factory];
    const scene = (args.match(/\b(SCENE_[A-Z0-9_]+)/) || [])[1];
    const area = (args.match(/RCAREA_([A-Z_]+)/) || [])[1] || sceneArea[scene];
    if (!type || !area || !quest || !strings.length) { console.warn('incomplet', rc, factory, type, area, quest); continue; }
    const short = strings[0];
    const spoiler = strings.length > 1 && ['Base', 'OtherHint'].includes(factory) ? strings[1] : `${PREFIX[area]} ${short}`;
    const pond = factory === 'Fish' && scene === 'SCENE_FISHING_POND' ? parseInt(args.split(',')[4], 10) - 100 : undefined;
    checks.push({ id:rc.replace(/^RC_/, ''), factory, type, quest, area, scene, short, spoiler, file:f, pond });
  }
}

// --- région de la logique (location_access) ---
const regionOf = {};
function walk(dir){ for (const e of fs.readdirSync(dir, { withFileTypes:true })){
  const p = path.join(dir, e.name);
  if (e.isDirectory()) walk(p);
  else if (p.endsWith('.cpp')){
    const t = fs.readFileSync(p, 'utf8');
    for (const block of t.split(/areaTable\[/).slice(1)){
      const rr = block.match(/^(RR_[A-Z0-9_]+)\]/); if (!rr) continue;
      for (const l of block.matchAll(/LOCATION\((RC_[A-Z0-9_]+)\s*,/g)) regionOf[l[1].replace(/^RC_/, '')] = rr[1].replace(/^RR_/, '');
    }
  }
}}
walk(SRC + 'location_access');
checks.forEach(c => { c.region = regionOf[c.id] || null; });

fs.writeFileSync(new URL('./checks_raw.json', import.meta.url), JSON.stringify({ areas, checks }, null, 1));
const byType = {}; checks.forEach(c => { byType[c.type] = (byType[c.type] || 0) + 1; });
console.log(checks.length, 'checks,', areas.length, 'zones,', checks.filter(c => !c.region).length, 'sans région');
console.log(Object.entries(byType).sort((a, b) => b[1] - a[1]).map(e => e.join(':')).join('  '));
