/* =====================================================================
   L'Œil Sheikah — tracker d'objets et routeur pour OoT Randomizer (ER)
   Application éclatée en plusieurs <script> classiques (pas de modules ES,
   pas de build : voir CLAUDE.md > Fichiers), chargés dans l'ordre imposé
   par index.html. Tous partagent le même scope global de haut niveau
   (comme un seul fichier) : ne pas redéclarer un identifiant déjà utilisé
   dans un autre fichier.
   ===================================================================== */
const { createApp, reactive, computed, watch, ref, nextTick } = Vue;

/* ---------- Icônes (remplaçables : mettre une URL/data-URI dans CUSTOM_ICONS) ---------- */
const CUSTOM_ICONS = {
  overworld: 'icons/exits/overworld.png',
  interior: 'icons/exits/interior.png',
  grotto: 'icons/exits/grotto.png',
  dungeon: 'icons/exits/dungeon.png',
  boss: 'icons/exits/boss.png',
  owl: 'icons/exits/owl.png',
  warp: 'icons/exits/warp.png',
  spawn: 'icons/exits/spawn.png'
};
const S = (p, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const ICONS = {
  overworld: S('<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>'),
  interior:  S('<path d="M3 11l9-7 9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>'),
  grotto:    S('<ellipse cx="12" cy="16.5" rx="9" ry="4"/><path d="M9 17.5V4M15 17.5V4M9 7.5h6M9 11h6M9 14.5h6"/>'),
  dungeon:   S('<path d="M5 21V10.5a7 7 0 0114 0V21z"/><path d="M9 21v-8M12 21v-9.5M15 21v-8"/>'),
  boss:      S('<path d="M5 11.5a7 7 0 1114 0v3l-2 1V19H7v-3.5l-2-1z"/><circle cx="9.5" cy="11.5" r="1.6" fill="currentColor"/><circle cx="14.5" cy="11.5" r="1.6" fill="currentColor"/><path d="M10.5 19v-2M13.5 19v-2"/>'),
  owl:       S('<path d="M5 4.5l3 2.5h8l3-2.5v9.5a7 7 0 01-14 0z"/><circle cx="9.3" cy="11.2" r="2"/><circle cx="14.7" cy="11.2" r="2"/><path d="M12 13.5l-1 2h2z" fill="currentColor"/>'),
  warp:      S('<path d="M9 18V5.5l11-2.5v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
  spawn:     S('<path d="M12 3l4.5 8h-9zM7.5 11L12 19H3zM16.5 11L21 19h-9z"/>'),
  triforce:  S('<path d="M12 2.5l4.8 8.5H7.2zM7.2 11l4.8 8.5H2.4zM16.8 11l4.8 8.5h-9.6z" fill="currentColor" stroke="none"/>'),
  globe:     S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>'),
  chevron:   S('<path d="M6 9l6 6 6-6"/>'),
  caret:     S('<path d="M5 9l7 7 7-7"/>', 'stroke-width="2.4"'),
  close:     S('<path d="M6 6l12 12M18 6L6 18"/>', 'stroke-width="2.4"'),
  menu:      S('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  swap:      S('<path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3"/>'),
  tracker:   S('<path d="M4 5h16M4 12h16M4 19h10"/><circle cx="19" cy="19" r="2"/>'),
  router:    S('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 010 6H9a3 3 0 000 6h6.5"/>'),
  config:    S('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'),
  bag:       S('<path d="M8 8V6a4 4 0 018 0v2"/><path d="M5.5 8h13l1 12.5a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 01-1.5-1.5z"/>'),
  sword:     S('<path d="M12 1.5l2 3V16h-4V4.5z" fill="currentColor" stroke="none" opacity=".35"/><path d="M12 1.5l2 3V16h-4V4.5zM6.5 16h11M12 16v6M10 22h4"/>'),
  warn:      S('<path d="M12 3.4l9.6 16.6a1 1 0 01-.87 1.5H3.27a1 1 0 01-.87-1.5z"/><path d="M12 9.3v4.4"/><circle cx="12" cy="16.9" r=".9" fill="currentColor" stroke="none"/>'),
  eye:       S('<path d="M2 12C5 6 9 4 12 4s7 2 10 8c-3 6-7 8-10 8s-7-2-10-8z"/><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/><path d="M12 16.6l-1.7 4.1a1.7 1.7 0 003.4 0z" fill="currentColor" stroke="none"/>'),
  check:     S('<path d="M4 12.5l5 5L20 6"/>', 'stroke-width="2.6"'),
  circleO:   S('<circle cx="12" cy="12" r="8.5"/>'),
};
const TYPE_LABEL = { overworld:'Extérieur', interior:'Intérieur', grotto:'Grotte', dungeon:'Donjon', boss:'Boss', owl:'Hibou', warp:'Téléportation', spawn:'Point d’apparition' };
