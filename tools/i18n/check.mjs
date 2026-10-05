// Contrôle de la traduction anglaise (data/i18n-en.js) : textes de l'interface sans traduction, et traductions qui ne
// servent plus. Sources lues sans être exécutées :
//  - gabarits (chaînes `…` contenant des balises) de js/*.js, passés au traducteur tpl() de js/i18n.js ;
//  - appels t('…') et tn(n, '…', '…') de js/*.js ;
//  - libellés des données traduits par t() à l'exécution : DYNAMIC ci-dessous (fichiers de données chargés dans un bac
//    à sable).
// Usage : node tools/i18n/check.mjs [--missing] [--unused] [--js]   (sans option : résumé + tout)
//         --js : les textes manquants au format du dictionnaire, prêts à compléter.
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const args = new Set(process.argv.slice(2));

// bac à sable : dictionnaire, puis js/i18n.js en anglais
const ctx = { console, window:{}, localStorage:{ getItem:() => 'en', setItem(){} }, navigator:{ language:'en' }, location:{ reload(){} } };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(read('data/i18n-en.js'), ctx);
vm.runInContext(read('js/i18n.js') + '\n;globalThis.__i = { tpl, I18N_MISSING };', ctx);
const DICT = ctx.I18N_EN, { tpl, I18N_MISSING } = ctx.__i;
const used = new Set();

// 1. gabarits et appels t() / tn() des fichiers js/
const files = fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).map(f => 'js/' + f);
for (const f of files){
  const src = read(f);
  for (const m of src.matchAll(/`([^`]*)`/g)){
    const body = m[1].replace(/\$\{[^}]*\}/g, ' ');
    if (!/<[a-z]/i.test(body)) continue;
    const before = new Set(I18N_MISSING);
    tpl(body);   // remplit I18N_MISSING ; les clés traduites sont relevées ci-dessous
    for (const k of I18N_MISSING) if (!before.has(k)) used.add(k);
    // clés présentes (traduites) : textes et chaînes d'expressions qui sont dans le dictionnaire
    for (const k of Object.keys(DICT)) if (body.includes(k)) used.add(k);
  }
  for (const m of src.matchAll(/\bt\(\s*'((?:[^'\\]|\\.)*)'/g)) used.add(m[1].replace(/\\'/g, "'"));
  for (const m of src.matchAll(/\btn\([^,]+,\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'/g)){ used.add(m[1].replace(/\\'/g, "'")); used.add(m[2].replace(/\\'/g, "'")); }
}

// 2. libellés des données traduits à l'exécution (à compléter quand une donnée passe par t())
const DYNAMIC = [];
for (const [file, expr] of DYNAMIC){
  try { vm.runInContext(read(file), ctx); for (const k of vm.runInContext(expr, ctx)) used.add(k); }
  catch (e){ console.warn(`${file} : ${e.message}`); }
}

const missing = [...used].filter(k => !(k in DICT)).sort((a, b) => a.localeCompare(b, 'fr'));
const unused = Object.keys(DICT).filter(k => !used.has(k)).sort((a, b) => a.localeCompare(b, 'fr'));
const all = !args.has('--missing') && !args.has('--unused') && !args.has('--js');
const q = s => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
if (args.has('--js')) for (const k of missing) console.log(`  ${q(k)}:${q(k)},`);
if (all || args.has('--missing')) { console.log(`\n# Sans traduction (${missing.length})`); missing.forEach(k => console.log('  ' + k)); }
if (all || args.has('--unused')) { console.log(`\n# Traductions inutilisées (${unused.length})`); unused.forEach(k => console.log('  ' + k)); }
console.log(`\n${Object.keys(DICT).length} traductions, ${used.size} textes relevés, ${missing.length} sans traduction, ${unused.length} inutilisées.`);
