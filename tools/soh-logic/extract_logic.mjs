// Extrait la logique de Ship of Harkinian (régions, événements, checks, sorties, avec leurs conditions converties
// du C++ vers JavaScript) et écrit ../../soh-logic-data.js. Sources : ../soh-checks/src (voir fetch_sources.mjs).
// Usage : node extract_logic.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(HERE, '../soh-checks/src');
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');

// ---------- utilitaires C++ ----------
// Retire les commentaires (// et /* */) hors chaînes.
function stripComments(s){
  let out = '', i = 0, str = null;
  while (i < s.length){
    const c = s[i], n = s[i + 1];
    if (str){ out += c; if (c === '\\'){ out += n; i += 2; continue; } if (c === str) str = null; i++; continue; }
    if (c === '"' || c === "'"){ str = c; out += c; i++; continue; }
    if (c === '/' && n === '/'){ while (i < s.length && s[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*'){ i += 2; while (i < s.length && !(s[i] === '*' && s[i + 1] === '/')) i++; i += 2; out += ' '; continue; }
    out += c; i++;
  }
  return out;
}
// Position de la parenthèse / accolade fermante correspondant à l'ouvrante en s[i].
function matchClose(s, i){
  const open = s[i], close = { '(':')', '{':'}', '[':']' }[open];
  let depth = 0, str = null;
  for (let j = i; j < s.length; j++){
    const c = s[j];
    if (str){ if (c === '\\') j++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'"){ str = c; continue; }
    if ('({['.includes(c)) depth++;
    else if (')}]'.includes(c)){ depth--; if (depth === 0){ if (c !== close) throw new Error('parenthésage incohérent à ' + j); return j; } }
  }
  throw new Error('parenthèse non fermée');
}
// Découpe une liste d'arguments au niveau 0.
function splitArgs(s){
  const out = []; let depth = 0, cur = '', str = null;
  for (let i = 0; i < s.length; i++){
    const c = s[i];
    if (str){ cur += c; if (c === '\\'){ cur += s[++i]; } else if (c === str) str = null; continue; }
    if (c === '"' || c === "'"){ str = c; cur += c; continue; }
    if ('({['.includes(c)) depth++;
    if (')}]'.includes(c)) depth--;
    if (c === ',' && depth === 0){ out.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// ---------- options : RO_* (index dans leur énumération) et RSK_* ----------
const RO = {};
{
  let idx = 0;
  for (const line of read('randomizerEnums/RandomizerOptions.h').split('\n')){
    if (line.trim().startsWith('//')) continue;
    if (/RANDO_ENUM_BEGIN\(/.test(line)) idx = 0;
    const m = line.match(/RANDO_ENUM_ITEM\((RO_[A-Z0-9_]+)(?:\s*,\s*(\d+))?\)/);
    if (m){ if (m[2] !== undefined) idx = +m[2]; RO[m[1]] = idx++; }
  }
}
const OPTIONS = {};                  // RSK -> { name, list | numeric, def (index) }
{
  const src = stripComments(read('settings.cpp'));
  const re = /OPT_(U8|BOOL)\(/g; let m;
  while ((m = re.exec(src))){
    const start = m.index + m[0].length - 1, end = matchClose(src, start);
    const args = splitArgs(src.slice(start + 1, end));
    const [rsk, nameRaw] = args;
    if (!nameRaw || !nameRaw.startsWith('"') || OPTIONS[rsk]) continue;
    const name = nameRaw.slice(1, -1).replace(/\\'/g, "'");
    let choices = { list:['Off', 'On'] }, defArg;
    if (m[1] === 'U8'){
      const n = args[2].match(/NumOpts\((\d+)\s*,\s*([A-Z_0-9]+|\d+)(?:\s*,\s*(\d+))?/);
      choices = n ? { numeric:{ min:+n[1], step:n[3] ? +n[3] : 1 } } : { list:[...args[2].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(x => x[1]) };
      defArg = args[7];
    } else if (args[2] && args[2].startsWith('CVAR_')) defArg = args[6];
    else { if (args[2] && args[2].startsWith('{')) choices = { list:[...args[2].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(x => x[1]) }; defArg = args[7]; }
    let def = 0;
    if (defArg === 'true') def = 1; else if (/^\d+$/.test(defArg || '')) def = +defArg; else if (defArg in RO) def = RO[defArg];
    OPTIONS[rsk] = { name, ...choices, def };
  }
}

// ---------- conversion d'une condition C++ en expression JavaScript ----------
const FREE_FUNCS = ['AnyAgeTime', 'CanPlantBean', 'SpiritShared', 'SpiritCertainAccess', 'GetCheckPrice', 'GetWalletCapacity',
  'BothAges', 'ChildCanAccess', 'AdultCanAccess'];
const usedOptions = new Set(), usedTricks = new Set(), unknown = new Set();
function convert(cpp){
  let s = cpp.trim().replace(/;\s*$/, '');
  // cas particuliers
  s = s.replace(/logic->GetSaveContext\(\)->ship\.quest\.data\.randomizer\.triforcePiecesCollected/g, 'L.TriforcePieces()');
  // lambdas C++ -> fonctions fléchées
  for (;;){
    const m = s.match(/\[[&=]?\]\s*(\(\s*\))?\s*\{/);
    if (!m) break;
    const open = m.index + m[0].length - 1, close = matchClose(s, open);
    const body = s.slice(open + 1, close).trim().replace(/^return\s+/, '').replace(/;\s*$/, '');
    s = s.slice(0, m.index) + '(() => (' + body + '))' + s.slice(close + 1);
  }
  // options
  s = s.replace(/ctx->GetOption\((RSK_\w+)\)\.(Is|IsNot)\((RO_\w+)\)/g, (_, rsk, op, ro) => {
    usedOptions.add(rsk); if (!(ro in RO)) unknown.add(ro);
    return `(L.opt("${rsk}") ${op === 'Is' ? '===' : '!=='} ${RO[ro]})`;
  });
  s = s.replace(/ctx->GetOption\((RSK_\w+)\)(\.Get\(\))?/g, (_, rsk) => { usedOptions.add(rsk); return `L.opt("${rsk}")`; });
  s = s.replace(/ctx->GetTrickOption\((RT_\w+)\)/g, (_, rt) => { usedTricks.add(rt); return `L.trick("${rt}")`; });
  s = s.replace(/ctx->GetDungeon\((?:Rando::)?(\w+)\)->IsMQ\(\)/g, 'L.mq("$1")');
  s = s.replace(/ctx->GetDungeon\((?:Rando::)?(\w+)\)->IsVanilla\(\)/g, '!L.mq("$1")');
  s = s.replace(/ctx->GetTrial\((?:Rando::)?(\w+)\)->IsSkipped\(\)/g, 'L.trialSkipped("$1")');
  s = s.replace(/\(bool\)/g, '').replace(/static_cast<[^>]+>/g, '');
  s = s.replace(/logic->/g, 'L.');
  // appel sur une autre région : areaTable[RR_X].AnyAgeTime(...) / .Child() / .Adult()
  s = s.replace(/areaTable\[(RR_\w+)\]\.(\w+)\(/g, 'L.region("$1").$2(');
  s = s.replace(new RegExp('(?<![.\\w])(' + FREE_FUNCS.join('|') + ')\\(', 'g'), 'L.$1(');
  s = s.replace(/Rando::/g, '');
  // constantes d'énumérations -> chaînes
  s = s.replace(/(?<!["\w.])((?:RG|RE|ED|RR|LOGIC|RC|SCENE|RA|TK|RAND_INF|ITEM|QUEST|UPG|RHT|RO|TRIAL)_[A-Z0-9_]+)\b/g, (x) => {
    if (x.startsWith('RO_')){ if (!(x in RO)) unknown.add(x); return String(RO[x]); }
    return `"${x}"`;
  });
  s = s.replace(/\s+/g, ' ').trim();
  if (/->|::|ctx|\blogic\b/.test(s)) unknown.add('reste C++ : ' + s.slice(0, 120));
  return s;
}
const fnSrc = cpp => '() => ' + (cpp.trim() === 'true' ? 'true' : cpp.trim() === 'false' ? 'false' : '(' + convert(cpp) + ')');

// ---------- régions ----------
// Scènes où le temps passe (GetTimePassFromScene)
const TIME_SCENES = new Set();
{
  const la = stripComments(read('location_access.cpp'));
  const body = la.slice(la.indexOf('bool GetTimePassFromScene'), la.indexOf('Region::Region() = default'));
  let pending = [];
  for (const line of body.split('\n')){
    const c = line.match(/case (SCENE_\w+):/); if (c) pending.push(c[1]);
    if (/return true;/.test(line)){ pending.forEach(x => TIME_SCENES.add(x)); pending = []; }
    if (/return false;/.test(line)) pending = [];
  }
}
const regions = {};
function parseList(s){                            // « { MACRO(a, b), ... } » -> [[a, b, ...]]
  s = s.trim();
  if (!s.startsWith('{')) return s;               // référence (ex. grottoEvents)
  return splitArgs(s.slice(1, matchClose(s, 0))).filter(Boolean).map(item => {
    const p = item.indexOf('(');
    return { macro:item.slice(0, p).trim(), args:splitArgs(item.slice(p + 1, matchClose(item, p))) };
  });
}
function walk(dir){
  for (const e of fs.readdirSync(dir, { withFileTypes:true })){
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.cpp')) parseRegionFile(stripComments(fs.readFileSync(p, 'utf8')));
  }
}
function parseRegionFile(src){
  const re = /areaTable\[(RR_\w+)\]\s*=\s*Region\(/g; let m;
  while ((m = re.exec(src))){
    const open = m.index + m[0].length - 1, close = matchClose(src, open);
    const args = splitArgs(src.slice(open + 1, close));
    const [nameRaw, scene] = args;
    let timePass, events, locations, exits;
    if (args.length === 7){ timePass = /TIME_PASSES|true/.test(args[2]); [events, locations, exits] = args.slice(4).map(parseList); }
    else if (args.length === 5){ timePass = TIME_SCENES.has(scene); [events, locations, exits] = args.slice(2).map(parseList); }
    else throw new Error(`${m[1]} : ${args.length} arguments`);
    const conv = (list, macro) => typeof list === 'string' ? list : list.map(it => {
      if (it.macro !== macro) throw new Error(`${m[1]} : ${it.macro} au lieu de ${macro}`);
      return [it.args[0].replace(/^RandomizerRegion::/, ''), fnSrc(it.args[1])];
    });
    regions[m[1]] = { name:nameRaw.slice(1, -1), scene, time:timePass,
      events:conv(events, 'EVENT_ACCESS'), checks:conv(locations, 'LOCATION'), exits:conv(exits, 'ENTRANCE') };
  }
}
walk(path.join(SRC, 'location_access'));

// Événements génériques des grottes et données du Temple de l'Esprit (location_access.cpp)
const LA = stripComments(read('location_access.cpp'));
const grotto = (() => {
  const i = LA.indexOf('grottoEvents = {'), open = LA.indexOf('{', i);
  return parseList(LA.slice(open, matchClose(LA, open) + 1)).map(it => [it.args[0], fnSrc(it.args[1])]);
})();
const spirit = {};
{
  const i = LA.indexOf('Region::spiritLogicData = {'), open = LA.indexOf('{', i);
  for (const entry of splitArgs(LA.slice(open + 1, matchClose(LA, open)))){
    if (!entry.startsWith('{')) continue;
    const [rr, data] = splitArgs(entry.slice(1, matchClose(entry, 0)));
    const d = splitArgs(data.slice(1, matchClose(data, 0)));
    // les 3 conditions sont des lambdas « []{return X;} » : on convertit leur corps une seule fois
    const body = x => { const o = x.indexOf('{'); return x.slice(o + 1, matchClose(x, o)).trim().replace(/^return\s+/, '').replace(/;\s*$/, ''); };
    spirit[rr] = [...d.slice(0, 4).map(Number), ...d.slice(4).map(x => fnSrc(body(x)))];
  }
}

// ---------- vérification et écriture ----------
let count = 0, bad = 0;
const check = (where, js) => { count++; try { new Function('L', 'return ' + js); } catch (e){ bad++; console.warn('Syntaxe JS invalide', where, js.slice(0, 200)); } };
for (const [rr, r] of Object.entries(regions)){
  for (const k of ['events', 'checks', 'exits']) if (Array.isArray(r[k])) r[k].forEach(([id, js]) => check(`${rr} ${id}`, js));
}
grotto.forEach(([id, js]) => check('grotto ' + id, js));
Object.entries(spirit).forEach(([rr, d]) => d.slice(4).forEach(js => check('spirit ' + rr, js)));

const opts = {};
for (const rsk of [...usedOptions].sort()) opts[rsk] = OPTIONS[rsk] || (unknown.add('option inconnue ' + rsk), null);
const lines = [];
lines.push(`/* Logique du randomizer de Ship of Harkinian 9.2.3 (commit cb71e22) — FICHIER GÉNÉRÉ par tools/soh-logic/extract_logic.mjs.
   Régions (location_access/**), événements génériques des grottes et données du Temple de l'Esprit (location_access.cpp),
   conditions converties du C++ en fonctions JavaScript évaluées avec le contexte de logique global « L » (js/soh-logic.js).
   regions : { RR : { name, scene, time (le temps y passe), events:[[LOGIC, cond]], checks:[[RC, cond]], exits:[[RR, cond]] } }
             (events peut valoir "grottoEvents" : événements génériques des grottes)
   spirit  : { RR : [childKeys, childRevKeys, adultKeys, adultRevKeys, childAccess, adultAccess, reverseAccess] }
   options : { RSK : { name (nom SoH), list | numeric:{min, step}, def (index par défaut) } } — options lues par la logique */`);
lines.push('window.SOH_LOGIC = {');
lines.push('  options:' + JSON.stringify(opts) + ',');
lines.push('  tricks:' + JSON.stringify([...usedTricks].sort()) + ',');
lines.push('  grottoEvents:[' + grotto.map(([id, js]) => `[${JSON.stringify(id.replace(/"/g, ''))}, ${js}]`).join(', ') + '],');
lines.push('  spirit:{');
for (const [rr, d] of Object.entries(spirit)) lines.push(`    ${rr}:[${d.join(', ')}],`);
lines.push('  },');
lines.push('  regions:{');
for (const [rr, r] of Object.entries(regions)){
  const list = l => typeof l === 'string' ? JSON.stringify(l) : '[' + l.map(([id, js]) => `\n      [${JSON.stringify(id)}, ${js}]`).join(',') + (l.length ? '\n    ' : '') + ']';
  lines.push(`    ${rr}:{ name:${JSON.stringify(r.name)}, scene:${JSON.stringify(r.scene)}, time:${r.time},`);
  lines.push(`      events:${list(r.events)},`);
  lines.push(`      checks:${list(r.checks)},`);
  lines.push(`      exits:${list(r.exits)} },`);
}
lines.push('  },');
lines.push('};');
const out = lines.join('\n') + '\n';
fs.writeFileSync(path.join(HERE, '../../soh-logic-data.js'), out);

const funcs = {};
for (const m of out.matchAll(/\bL\.([A-Za-z]+)\(/g)) funcs[m[1]] = (funcs[m[1]] || 0) + 1;
const props = {};
for (const m of out.matchAll(/\bL\.([A-Za-z]+)\b(?!\()/g)) props[m[1]] = (props[m[1]] || 0) + 1;
console.log(`${Object.keys(regions).length} régions, ${count} conditions (${bad} invalides), ${usedOptions.size} options, ${usedTricks.size} astuces — ${Math.round(out.length / 1024)} Ko`);
console.log('Fonctions L.* :', Object.entries(funcs).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}(${n})`).join(' '));
console.log('Propriétés L.* :', Object.keys(props).join(' '));
if (unknown.size) console.log('À vérifier :', [...unknown].slice(0, 30));
