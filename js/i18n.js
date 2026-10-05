/* ---------- Langue de l'interface (français / anglais) ----------
   Premier fichier de js/ (les suivants peuvent appeler t()). LANG : 'fr' ou 'en', choisie dans la Configuration
   (localStorage LANG_KEY ; changer de langue recharge la page), sinon celle du navigateur (français s'il est en
   français, sinon anglais). Le français est la langue source : le dictionnaire I18N_EN (data/i18n-en.js, chargé
   avant) associe à un texte français sa traduction anglaise.
   - t(texte, paramètres) : texte traduit ; « {nom} » remplacé par paramètres.nom.
   - tn(n, singulier, pluriel, paramètres) : forme selon n (français : 0 et 1 au singulier ; anglais : 1 seul), puis t()
     avec {n}.
   - tpl(gabarit) : gabarit Vue traduit au chargement — textes entre balises, attributs fixes (title, placeholder,
     aria-label, label, alt), et chaînes entre apostrophes des expressions ({{ }}, attributs liés) qui ont une traduction.
   En français, tout est renvoyé tel quel. Textes sans traduction : I18N_MISSING (contrôle : tools/i18n/check.mjs). */
const LANG_KEY = 'oeil-sheikah-lang';
const LANGS = [['fr', 'Français'], ['en', 'English']];
const LANG = (() => {
  try { const v = localStorage.getItem(LANG_KEY); if (LANGS.some(l => l[0] === v)) return v; } catch (e) {}
  return /^fr\b/i.test((typeof navigator !== 'undefined' && navigator.language) || '') ? 'fr' : 'en';
})();
if (typeof document !== 'undefined') document.documentElement.lang = LANG;
const I18N = LANG === 'en' ? (window.I18N_EN || {}) : null;
const I18N_MISSING = new Set();
function t(s, p){
  let r = s;
  if (I18N && s){ const v = I18N[s]; if (v != null) r = v; else I18N_MISSING.add(s); }
  return p ? String(r).replace(/\{(\w+)\}/g, (m, k) => k in p ? p[k] : m) : r;
}
function tn(n, one, many, p){ return t((LANG === 'en' ? n !== 1 : n > 1) ? many : one, { n, ...(p || {}) }); }
// change de langue : gardée à part (lue avant le reste), puis rechargement de la page
function setLang(l){ try { localStorage.setItem(LANG_KEY, l); } catch (e) {} location.reload(); }

const I18N_LETTER = /[A-Za-zÀ-ÿŒœ]/;
function tpl(html){
  if (!I18N) return html;
  // texte (espaces autour gardés) ; seulement s'il a une traduction
  const tr = s => {
    const k = s.trim().replace(/\s+/g, ' ');
    if (!k || !I18N_LETTER.test(k)) return s;
    const v = I18N[k];
    if (v == null){ I18N_MISSING.add(k); return s; }
    const lead = s.match(/^\s*/)[0], tail = s.match(/\s*$/)[0];
    return lead + v + tail;
  };
  // chaînes entre apostrophes d'une expression : traduites si le dictionnaire les connaît (les autres sont des clés)
  const trExpr = e => e.replace(/'((?:[^'\\]|\\.)*)'/g, (m, lit) => {
    const v = I18N[lit];
    return v != null ? "'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'" : m;
  });
  // interpolations et valeurs d'attributs traduites puis mises de côté (leurs « > » et « < » ne sont pas des balises),
  // puis textes entre balises, puis remise en place
  const keep = [], put = s => '\u0001' + (keep.push(s) - 1) + '\u0002';
  let h = html.replace(/\{\{([\s\S]*?)\}\}/g, (m, e) => put('{{' + trExpr(e) + '}}'));
  h = h.replace(/(\s)([:@#]?[\w.:\[\]-]+)="([^"]*)"/g, (m, sp, name, v) =>
    sp + name + '="' + put(/^[:@#]|^v-/.test(name) ? trExpr(v) : I18N_ATTRS.has(name) ? tr(v) : v) + '"');
  h = h.replace(/>([^<>]+)</g, (m, text) => '>' + text.split(/(\u0001\d+\u0002)/).map(p => p[0] === '\u0001' ? p : tr(p)).join('') + '<');
  return h.replace(/\u0001(\d+)\u0002/g, (m, i) => keep[i]);
}
const I18N_ATTRS = new Set(['title', 'placeholder', 'aria-label', 'label', 'alt']);
