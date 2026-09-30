/* ---------- Inventaire (panneau Objets) ---------- */
// kind: 'bool' (chip on/off), 'level' (objet progressif, stages = libellés par palier, palier 0 = aucun),
// 'count' (compteur libre 0..max, purement informatif). `max` peut être une fonction (settings)=>nombre
// pour un plafond réglable en Configuration. `visible(settings)` masque l'objet si la fonction renvoie faux.
// `locked:true` (objet `bool` uniquement) : toujours possédé, non désactivable (équipement de départ
// jamais réellement obtenu en jeu, ex. Tunique/Bottes Kokiri) — la tuile ignore les clics.
// `neverEmpty:true` (objet `level` uniquement) : le palier 0 est déjà un objet réellement possédé (pas
// « aucun »), donc jamais affiché grisé — mais reste augmentable/diminuable normalement (ex. Bourse : le
// palier de base à 99 rubis n'est ni un choix ni supprimable, contrairement aux paliers supérieurs).
const ITEM_GROUPS = [
  { title:'Récompenses', path:'items', items:[
    { key:'kokiriEmerald', label:'Émeraude Kokiri', kind:'bool', icon:'rewards/stones/forest.png' },
    { key:'goronRuby', label:'Rubis Goron', kind:'bool', icon:'rewards/stones/fire.png' },
    { key:'zoraSapphire', label:'Saphir Zora', kind:'bool', icon:'rewards/stones/water.png' },
    { key:'forestMedallion', label:'Médaillon de la Forêt', kind:'bool', icon:'rewards/medallions/forest.png' },
    { key:'fireMedallion', label:'Médaillon du Feu', kind:'bool', icon:'rewards/medallions/fire.png' },
    { key:'waterMedallion', label:"Médaillon de l'Eau", kind:'bool', icon:'rewards/medallions/water.png' },
    { key:'spiritMedallion', label:"Médaillon de l'Esprit", kind:'bool', icon:'rewards/medallions/spirit.png' },
    { key:'shadowMedallion', label:"Médaillon de l'Ombre", kind:'bool', icon:'rewards/medallions/shadow.png' },
    { key:'lightMedallion', label:'Médaillon de la Lumière', kind:'bool', icon:'rewards/medallions/light.png' },
    { key:'triforcePieces', label:'Morceaux de Triforce', kind:'count', max:s => s.triforceHuntTotal, visible:s => s.triforceHunt !== 'Off', icon:'rewards/triforce.png' },
  ]},
  { title:'Équipement', path:'items', items:[
    { key:'kokiriSword', label:'Épée Kokiri', kind:'bool', icon:'equipment/swords/kokiri.png' },
    { key:'masterSword', label:'Épée de Légende', kind:'bool', icon:'equipment/swords/master.png' },
    { key:'biggoronSword', label:'Épée Biggoron', kind:'bool', icon:'equipment/swords/biggorons.png' },
    { key:'dekuShield', label:'Bouclier Mojo', kind:'bool', icon:'equipment/shields/deku.png' },
    { key:'hylianShield', label:'Bouclier Hylien', kind:'bool', icon:'equipment/shields/hylian.png' },
    { key:'mirrorShield', label:'Bouclier Miroir', kind:'bool', icon:'equipment/shields/mirror.png' },
    { key:'kokiriBoots', label:'Bottes Kokiri', kind:'bool', icon:'equipment/boots/kokiri.png', locked:true },
    { key:'ironBoots', label:'Bottes de Plomb', kind:'bool', icon:'equipment/boots/iron.png' },
    { key:'hoverBoots', label:'Bottes des Airs', kind:'bool', icon:'equipment/boots/hover.png' },
    { key:'kokiriTunic', label:'Tunique Kokiri', kind:'bool', icon:'equipment/tunics/kokiri.png', locked:true },
    { key:'goronTunic', label:'Tunique Goron', kind:'bool', icon:'equipment/tunics/goron.png' },
    { key:'zoraTunic', label:'Tunique Zora', kind:'bool', icon:'equipment/tunics/zora.png' },
    { key:'strength', label:'Force', kind:'level', stages:['Aucune','Bracelet Goron',"Gantelets d'Argent","Gantelets d'Or"],
      icons:['equipment/strength/bracelet.png','equipment/strength/silver.png','equipment/strength/golden.png'] },
    { key:'scale', label:'Écaille de Zora', kind:'level', stages:['Aucune',"Écaille d'Argent","Écaille d'Or"],
      icons:['equipment/scales/silver.png','equipment/scales/golden.png'] },
    { key:'wallet', label:'Bourse', kind:'level', stages:['Bourse (99)','Grande Bourse (200)','Bourse de Géant (500)','Bourse de Magnat (999)'],
      sizes:['99','200','500','999'], neverEmpty:true },
    { key:'skulltulaTokens', label:"Skulltulas d'Or", kind:'count', max:100, icon:'rewards/skulltula.png' },
    { key:'gerudoCard', label:'Carte Gerudo', kind:'bool', icon:'items/gerudo.png' },
    { key:'stoneOfAgony', label:'Pierre de Souffrance', kind:'bool', icon:'items/stone_of_agony.png' },
  ]},
  { title:'Armes enfant', path:'items', items:[
    { key:'sticks', label:'Bâton Mojo', kind:'level', stages:['Aucun','10','20','30','Infini'], sizes:['','10','20','30','∞'], icon:'weapons/stick.png' },
    { key:'slingshot', label:'Lance-Pierre', kind:'level', stages:['Aucun','30','40','50','Infini'], sizes:['','30','40','50','∞'], icon:'weapons/slingshot.png' },
    { key:'boomerang', label:'Boomerang', kind:'bool', icon:'weapons/boomerang.png' },
  ]},
  { title:'Armes adulte', path:'items', items:[
    { key:'bow', label:'Arc', kind:'level', stages:['Aucun','30','40','50'], sizes:['','30','40','50'], icon:'weapons/bow.png' },
    { key:'hookshot', label:'Grappin', kind:'level', stages:['Aucun','Grappin','Super-Grappin'],
      icons:['weapons/hookshot.png','weapons/longshot.png'] },
    { key:'titanMass', label:'Masse des Titans', kind:'bool', icon:'weapons/hammer.png' },
    { key:'fireArrows', label:'Flèches de Feu', kind:'bool', icon:'weapons/arrows/fire.png' },
    { key:'iceArrows', label:'Flèches de Glace', kind:'bool', icon:'weapons/arrows/ice.png' },
    { key:'lightArrows', label:'Flèches de Lumière', kind:'bool', icon:'weapons/arrows/light.png' },
  ]},
  { title:'Armes communes', path:'items', items:[
    { key:'nuts', label:'Noix Mojo', kind:'level', stages:['Aucune','20','30','40','Infinies'], sizes:['','20','30','40','∞'], icon:'weapons/nut.png' },
    { key:'bombBag', label:'Bombes', kind:'level', stages:['Aucune','30','40','50','Infinies'], sizes:['','30','40','50','∞'], icon:'weapons/bomb.png' },
    { key:'bombchus', label:'Missiles', kind:'level', stages:['Aucun','30','40','50','Infinis'], sizes:['','30','40','50','∞'], icon:'weapons/bombchu.png' },
  ]},
  { title:'Objets', path:'items', items:[
    { key:'beans', label:'Haricots Magiques', kind:'bool', icon:'items/bean.png' },
    { key:'truthLens', label:'Monocle de Vérité', kind:'bool', icon:'items/lens_truth.png' },
    { key:'bottle', label:'Bouteilles', kind:'count', max:4 },
    { key:'rutoLetter', label:'Lettre de Ruto', kind:'bool', icon:'items/ruto_letter.png' },
    { key:'fishingRod', label:'Canne à Pêche', kind:'bool', icon:'items/rod.png', visible:s => s.shuffleFishingPole === 'On' },
  ]},
  { title:"Objets d'échange (Enfant)", path:'items', items:[
    // En rando, chaque objet est un pickup indépendant trouvable dans n'importe quel ordre et
    // conservé (pas de « remplacement » comme en vanilla) : tous des bascules séparées.
    { key:'weirdEgg', label:'Œuf Bizarre', kind:'bool', icon:'trade/child/egg.png' },
    { key:'chicken', label:'Poule', kind:'bool', icon:'trade/child/cucco.png' },
    { key:'zeldasLetter', label:'Lettre de Zelda', kind:'bool', icon:'trade/child/letter.png' },
    { key:'keatonMask', label:'Masque de Keaton', kind:'bool', icon:'trade/child/mask_keaton.png' },
    { key:'skullMask', label:'Masque du Crâne', kind:'bool', icon:'trade/child/mask_skull.png' },
    { key:'spookyMask', label:'Masque Effrayant', kind:'bool', icon:'trade/child/mask_spooky.png' },
    { key:'bunnyHood', label:'Capuche de Lapin', kind:'bool', icon:'trade/child/mask_bunny.png' },
    { key:'goronMask', label:'Masque Goron', kind:'bool', icon:'trade/child/mask_goron.png' },
    { key:'zoraMask', label:'Masque Zora', kind:'bool', icon:'trade/child/mask_zora.png' },
    { key:'gerudoMask', label:'Masque Gerudo', kind:'bool', icon:'trade/child/mask_gerudo.png' },
    { key:'maskOfTruth', label:'Masque de Vérité', kind:'bool', icon:'trade/child/mask_truth.png' },
  ]},
  { title:"Objets d'échange (Adulte)", path:'items', items:[
    // Idem : Œuf de Poche et Cocotte de Poche sont les deux objets de départ possibles de la
    // chaîne (un seul existe réellement dans une seed donnée), suivis séparément comme le reste.
    { key:'pocketEgg', label:'Œuf de Poche', kind:'bool', icon:'trade/adult/egg.png' },
    { key:'pocketCucco', label:'Cocotte de Poche', kind:'bool', icon:'trade/adult/pocket_cucco.png' },
    { key:'cojiro', label:'Cojiro', kind:'bool', icon:'trade/adult/cojiro.png' },
    { key:'oddMushroom', label:'Champignon Étrange', kind:'bool', icon:'trade/adult/mushroom.png' },
    { key:'oddPotion', label:'Potion Étrange', kind:'bool', icon:'trade/adult/potion.png' },
    { key:'poachersSaw', label:'Scie du Braconnier', kind:'bool', icon:'trade/adult/saw.png' },
    { key:'brokenSword', label:'Épée Cassée', kind:'bool', icon:'trade/adult/broken.png' },
    { key:'prescription', label:'Ordonnance', kind:'bool', icon:'trade/adult/prescription.png' },
    { key:'eyeballFrog', label:'Œil de Grenouille', kind:'bool', icon:'trade/adult/frog.png' },
    { key:'eyedrops', label:'Gouttes Oculaires', kind:'bool', icon:'trade/adult/drops.png' },
    { key:'claimCheck', label:'Reçu', kind:'bool', icon:'trade/adult/claim.png' },
  ]},
  { title:'Magie', path:'items', items:[
    { key:'dinsFire', label:'Feu de Din', kind:'bool', icon:'magic/din.png' },
    { key:'faroresWind', label:'Vent de Farore', kind:'bool', icon:'magic/farore.png' },
    { key:'nayrusLove', label:'Amour de Nayru', kind:'bool', icon:'magic/nayru.png' },
  ]},
  { title:'Ocarina', path:'items', items:[
    { key:'ocarina', label:'Ocarina', kind:'level', stages:['Aucune',"Ocarina de Fée","Ocarina du Temps"],
      icons:['items/ocarina_fairy.png','items/ocarina_time.png'] },
  ]},
  { title:"Notes d'Ocarina (si mélangées)", path:'items', items:[
    ...[['noteA', 'Bouton A', 'A'], ['noteCUp', 'C-Haut', 'up'], ['noteCRight', 'C-Droite', 'right'], ['noteCLeft', 'C-Gauche', 'left'], ['noteCDown', 'C-Bas', 'down']]
      .map(([key, label, f]) => ({ key, label, kind:'bool', icon:`songs/buttons/${f}.png`, visible:s => s.shuffleOcarinaButtons === 'On' })),
  ]},
  { title:'Statistiques', path:'items', items:[
    { key:'magic', label:'Magie', kind:'level', stages:['Aucune','Simple','Double','Infinie'],
      icons:['statistics/magic_small.png','statistics/magic_large.png','statistics/magic_infinite.png'] },
    { key:'heartPieces', label:'Quarts de Cœur', kind:'count', max:36, icon:'statistics/heart_piece.png' },
    { key:'heartContainers', label:'Réceptacles de Cœur', kind:'count', max:8, icon:'statistics/heart_container.png' },
    { key:'doubleDefense', label:'Double Défense', kind:'bool', icon:'statistics/double_defense.png' },
  ]},
  // Spécificité Ship of Harkinian : les mouvements/capacités et les langues peuvent être mélangés dans le
  // pool d'objets (une option par capacité, une seule pour toutes les langues). Visibles seulement si
  // mélangés ; purement informatifs pour l'instant (pas encore branchés à `sat()`).
  { title:'Capacités', path:'items', items:[
    { key:'swim', label:'Nager', kind:'bool', icon:'abilities/swim.png', visible:s => s.shuffleSwim === 'On' },
    { key:'climb', label:'Grimper', kind:'bool', icon:'abilities/climb.png', visible:s => s.shuffleClimb === 'On' },
    { key:'crawl', label:'Ramper', kind:'bool', icon:'abilities/ramp.png', visible:s => s.shuffleCrawl === 'On' },
    { key:'openChests', label:'Ouvrir les coffres', kind:'bool', icon:'abilities/chest.png', visible:s => s.shuffleOpenChest === 'On' },
    { key:'grab', label:'Saisir', kind:'bool', icon:'abilities/grasp.png', visible:s => s.shuffleGrab === 'On' },
  ]},
  { title:'Langues', path:'items', items:[
    ...[['speakKokiri', 'Langue Kokiri', 'kokiri'], ['speakDeku', 'Langue Mojo', 'deku'], ['speakHylian', 'Langue Hylienne', 'hylian'],
      ['speakGoron', 'Langue Goron', 'goron'], ['speakZora', 'Langue Zora', 'zora'], ['speakGerudo', 'Langue Gerudo', 'gerudo']]
      .map(([key, label, f]) => ({ key, label, kind:'bool', icon:`languages/${f}.png`, visible:s => s.shuffleJabberNuts === 'On' })),
  ]},
  { title:'Chants appris', path:'songs', items:[
    { key:'zeldaLullaby', label:'Berceuse de Zelda', kind:'bool', icon:'songs/songs/zl.png' },
    { key:'eponasSong', label:"Chant d'Epona", kind:'bool', icon:'songs/songs/epona.png' },
    { key:'sariasSong', label:'Chant de Saria', kind:'bool', icon:'songs/songs/saria.png' },
    { key:'sunsSong', label:'Chant du Soleil', kind:'bool', icon:'songs/songs/sun.png' },
    { key:'songOfTime', label:'Chant du Temps', kind:'bool', icon:'songs/songs/sot.png' },
    { key:'songOfStorms', label:'Chant des Tempêtes', kind:'bool', icon:'songs/songs/storm.png' },
    { key:'scarecrowSong', label:"Chant de l'Épouvantail", kind:'bool', icon:'songs/songs/scarecrow.png' },
  ]},
  { title:'Chants de téléportation', path:'songs', items:[
    { key:'minuet', label:'Menuet des Bois', kind:'bool', icon:'songs/teleport/minuet.png' },
    { key:'bolero', label:'Boléro du Feu', kind:'bool', icon:'songs/teleport/bolero.png' },
    { key:'serenade', label:"Sérénade de l'Eau", kind:'bool', icon:'songs/teleport/serenade.png' },
    { key:'requiem', label:'Requiem des Esprits', kind:'bool', icon:'songs/teleport/requiem.png' },
    { key:'nocturne', label:"Nocturne de l'Ombre", kind:'bool', icon:'songs/teleport/nocturne.png' },
    { key:'prelude', label:'Prélude de la Lumière', kind:'bool', icon:'songs/teleport/prelude.png' },
  ]},
];
const itemMax = it => typeof it.max === 'function' ? it.max(store.settings) : it.max;
const itemVisible = it => !it.visible || it.visible(store.settings);

/* ---------- Mise en page de la page Objets ---------- */
// Ne redéfinit aucune métadonnée d'objet : référence les objets d'ITEM_GROUPS par clé, juste pour
// savoir dans quel bloc visuel chacun s'affiche. ITEM_GROUPS reste la seule source pour defaults()
// (js/state.js) et les métadonnées (icône, paliers, max, visibilité...).
const ITEM_BY_KEY = {};
ITEM_GROUPS.forEach(g => g.items.forEach(it => { ITEM_BY_KEY[it.key] = { ...it, path:g.path }; }));

const ITEMS_PAGE = {
  stats:[['doubleDefense', 'heartContainers', 'heartPieces'], ['magic', 'skulltulaTokens']],
  quest:{
    hex:['forestMedallion', 'fireMedallion', 'waterMedallion', 'spiritMedallion', 'shadowMedallion', 'lightMedallion'],
    center:'triforcePieces',
    stones:['kokiriEmerald', 'goronRuby', 'zoraSapphire'],
  },
  equipment:{
    chains:[
      { title:'Épée', items:['kokiriSword', 'masterSword', 'biggoronSword'] },
      { title:'Bouclier', items:['dekuShield', 'hylianShield', 'mirrorShield'] },
      { title:'Tunique', items:['kokiriTunic', 'goronTunic', 'zoraTunic'] },
      { title:'Bottes', items:['kokiriBoots', 'ironBoots', 'hoverBoots'] },
    ],
    progressive:['strength', 'scale', 'wallet'],
  },
  // Cadres d'objets (armes/magie/utilitaires), groupés deux par deux (voir style.css .item-box/.box-row).
  boxRows:[
    [ { title:'Enfant', items:['sticks', 'slingshot', 'boomerang'] },
      { title:'Commun', items:['bombBag', 'bombchus', 'nuts'] } ],
    [ { title:'Adulte', items:['hookshot', 'bow', 'titanMass'], sub:['fireArrows', 'iceArrows', 'lightArrows'] },
      { title:'Utilitaires', items:['truthLens', 'beans', 'stoneOfAgony', 'fishingRod'], cols:2 } ],
    [ { title:'Flacons', items:['bottle', 'rutoLetter'] },
      { title:'Sorts', items:['dinsFire', 'faroresWind', 'nayrusLove'] } ],
  ],
  // Chaînes d'objets d'échange : un bouton par âge (icône = dernier objet de la chaîne) ouvrant une fenêtre
  // de pointage ; chaque sous-tableau = une ligne de la fenêtre, objets reliés par un trait.
  trade:{
    child:[
      ['weirdEgg', 'chicken', 'zeldasLetter'],
      ['keatonMask', 'skullMask', 'spookyMask', 'bunnyHood'],
      ['goronMask', 'zoraMask', 'gerudoMask', 'maskOfTruth'],
    ],
    adult:[
      ['pocketEgg', 'pocketCucco', 'cojiro', 'oddMushroom'],
      ['oddPotion', 'poachersSaw', 'brokenSword', 'prescription'],
      ['eyeballFrog', 'eyedrops', 'claimCheck'],
    ],
  },
  // Capacités et langues (Ship of Harkinian), une ligne chacune.
  skills:[
    { title:'Capacités', items:['swim', 'climb', 'crawl', 'openChests', 'grab'] },
    { title:'Langues', items:['speakKokiri', 'speakDeku', 'speakHylian', 'speakGoron', 'speakZora', 'speakGerudo'] },
  ],
  // Boutons des check-lists de lieux, dans leur propre carte à droite des capacités/langues.
  checklistButtons:[
    { id:'keys', icon:'icons/dungeons/key.png', visible:s => s.lockOverworldDoors === 'On' },
    { id:'beans', icon:'icons/items/bean.png' },
  ],
  tradeButtons:[
    { id:'child', title:'Échanges — Enfant', icon:'maskOfTruth' },
    { id:'adult', title:'Échanges — Adulte', icon:'claimCheck' },
  ],
  songs:{
    learned:['zeldaLullaby', 'eponasSong', 'sariasSong', 'sunsSong', 'songOfTime', 'songOfStorms', 'scarecrowSong'],
    ocarina:'ocarina',
    // Notes en ligne, dans l'ordre des hauteurs (A, C-Bas, C-Droite, C-Gauche, C-Haut).
    notes:['noteA', 'noteCDown', 'noteCRight', 'noteCLeft', 'noteCUp'],
    warp:['minuet', 'bolero', 'serenade', 'requiem', 'nocturne', 'prelude'],
  },
  // Un bloc par donjon, qui n'affiche que les cases que le donjon possède (voir DUNGEONS), deux par ligne,
  // teinté à la couleur du donjon (`color`) ; le Château de Ganon ferme la liste, seul et centré.
  dungeons:{
    rows:[
      ['dekuTree', 'dodongosCavern'],
      ['jabuJabu', 'bottomOfTheWell'],
      ['gerudoTrainingGround', 'gerudoFortress'],
      ['forestTemple', 'fireTemple'],
      ['waterTemple', 'shadowTemple'],
      ['spiritTemple', 'iceCavern'],
      ['ganonsCastle'],
    ],
  },
};
// Chiffres romains pour les objets progressifs sans `sizes` (Force, Écaille) ; ceux qui ont des `sizes`
// (Bourse : 99/200/500/999) gardent leur pastille de capacité.
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];
const tierLabel = it => it.sizes ? null : (ROMAN[store.game[it.path][it.key]] || null);

/* ---------- Objets de donjon (carte / boussole / petites clés / clé de boss) ---------- */
// NOTE : purement informatif pour l'instant — pas encore branché à Entrées/Routeur (`sat()`/`makeEdges()`).
// `maxKeys` = valeurs vanilla par défaut, à ajuster une fois la logique Ship of Harkinian précisée.
// `color` : teinte du thème du donjon (bordure du bloc ; le fond en est une version très atténuée).
const DUNGEONS = [
  { id:'dekuTree', title:'Arbre Mojo', color:'#7aa83c', map:true, compass:true },
  { id:'dodongosCavern', title:'Caverne Dodongo', color:'#b0602c', map:true, compass:true },
  { id:'jabuJabu', title:'Ventre de Jabu-Jabu', color:'#d0708f', map:true, compass:true },
  { id:'bottomOfTheWell', title:'Fond du Puits', color:'#6c5f7e', map:true, compass:true, maxKeys:3 },
  { id:'gerudoTrainingGround', title:'Gymnase Gerudo', color:'#c9a03a', maxKeys:9 },
  { id:'gerudoFortress', title:'Repaire des Voleurs', color:'#c0674a', maxKeys:4, card:'gerudoCard' },
  { id:'ganonsCastle', title:'Château de Ganon', color:'#8e2447', maxKeys:2, bossKey:true },
  { id:'forestTemple', title:'Forêt', color:'#2e7d3c', map:true, compass:true, maxKeys:5, bossKey:true },
  { id:'fireTemple', title:'Feu', color:'#c8372d', map:true, compass:true, maxKeys:8, bossKey:true },
  { id:'waterTemple', title:'Eau', color:'#2f6fb8', map:true, compass:true, maxKeys:6, bossKey:true },
  { id:'shadowTemple', title:'Ombre', color:'#6b3f9a', map:true, compass:true, maxKeys:6, bossKey:true },
  { id:'spiritTemple', title:'Esprit', color:'#d9822b', map:true, compass:true, maxKeys:5, bossKey:true },
  { id:'iceCavern', title:'Caverne de Glace', color:'#4fa9c7', map:true, compass:true },
];
const DUNGEON_BY_ID = {};
DUNGEONS.forEach(d => { DUNGEON_BY_ID[d.id] = d; });
// Cases à afficher pour un donjon selon la configuration : rien à suivre pour ce qu'on possède dès le
// départ (« Start With »), ni pour les clés et la Carte Gerudo si les charpentiers sont libres.
function dungeonCells(id, s){
  const d = DUNGEON_BY_ID[id], free = s.fortressCarpenters === 'Free';
  return {
    map:!!d.map && s.mapsCompasses !== 'Start With',
    compass:!!d.compass && s.mapsCompasses !== 'Start With',
    keys:!!d.maxKeys && (id === 'gerudoFortress' ? !free : s.smallKeys !== 'Start With'),
    bossKey:!!d.bossKey && (id === 'ganonsCastle' ? s.ganonsBossKey !== 'Start With' : s.bossKeys !== 'Start With'),
    card:!!d.card && !free,
  };
}
const visibleKeys = keys => keys.filter(k => itemVisible(ITEM_BY_KEY[k]));

/* ---------- Check-lists de lieux (clés hors donjon, trous à haricots) ---------- */
// Purement informatif pour l'instant (voir remarque ci-dessus) : une simple liste de lieux à cocher,
// pas encore reliée à de nouvelles connexions dans le graphe du Routeur.
function slugify(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
function checklist(title, labels){ return { title, locations:labels.map(label => ({ id:slugify(label), label })) }; }
const CHECKLISTS = {
  keys:checklist('Clés des portes', [
    'Poste de garde', 'Bazar du marché', 'Apothicaire du marché', 'Foire aux masques',
    'Stand de tir du marché', 'Bowling Teigneux', 'Chasse au trésor', 'Boutique de missiles',
    'Maison de Kiki', "Porte de l'allée", 'Bazar de Cocorico', 'Apothicaire de Cocorico',
    'Maison du contremaître', 'Boutique de Granny', 'Maison des Araignées', "Maison d'Impa",
    'Moulin', 'Stand de tir de Cocorico', "Cabane d'Igor", 'Maison de Talon',
    'Écuries', 'Silo', 'Laboratoire du Lac', 'Stand de pêche',
  ]),
  beans:checklist('Trous à haricots', [
    'Cratère du Péril', 'Mont du Péril', 'Colosse du Désert', 'Vallée Gerudo',
    'Cimetière', 'Forêt Kokiri', 'Lac Hylia', 'Pont des Bois Perdus',
    'Théâtre Mojo', 'Fleuve Zora',
  ]),
};
