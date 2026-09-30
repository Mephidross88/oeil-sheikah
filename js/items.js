/* ---------- Inventaire (panneau Objets) ---------- */
// kind: 'bool' (chip on/off), 'level' (objet progressif, stages = libellés par palier, palier 0 = aucun),
// 'count' (compteur libre 0..max, purement informatif). `max` peut être une fonction (settings)=>nombre
// pour un plafond réglable en Configuration ; `goal(settings)` (facultatif) : seuil à partir duquel le compteur
// est doré, s'il diffère du maximum (ex. Triforce : morceaux requis sur le total). `visible(settings)` masque l'objet si la fonction renvoie faux.
// `locked:true` (objet `bool` uniquement) : toujours possédé, non désactivable (équipement de départ
// jamais réellement obtenu en jeu, ex. Tunique/Bottes Kokiri) — la tuile ignore les clics.
// `levels(settings)` (objet `level`) : paliers atteignables selon la configuration, en indices de `stages`
// dans l'ordre de progression (par défaut tous). La valeur stockée reste un indice de `stages`, donc un palier
// garde toujours le même sens (ex. 4 = infini) quelle que soit la configuration. Un objet sous son premier
// palier atteignable y est remonté automatiquement (ex. Bourse : 99 d'office sans « Bourse enfant » mélangée).
// Paliers de capacité avec « Améliorations infinies » (item_pool.cpp de SoH) : « Progressif » ajoute l'infini
// après le dernier palier normal ; « Condensé » le donne dès la 1re amélioration (pas pour bourse ni magie).
const ammoLevels = s => s.infiniteUpgrades === 'Condensed Progressive' ? [0, 1, 4]
  : s.infiniteUpgrades === 'Progressive' ? [0, 1, 2, 3, 4] : [0, 1, 2, 3];
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
    { key:'triforcePieces', label:'Morceaux de Triforce', kind:'count', max:s => s.triforceHuntTotal, goal:s => s.triforceHuntRequired,
      visible:s => s.triforceHunt !== 'Off', icon:'rewards/triforce.png' },
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
    // Palier 0 = pas de bourse : seulement avec « Bourse enfant » mélangée, sinon on part de la bourse de 99.
    { key:'wallet', label:'Bourse', kind:'level', stages:['Aucune','Bourse (99)','Grande Bourse (200)','Bourse de Géant (500)','Bourse de Magnat (999)','Bourse infinie'],
      sizes:['','99','200','500','999','∞'],
      levels:s => [...(s.shuffleChildWallet === 'On' ? [0] : []), 1, 2, 3, ...(s.includeTycoonWallet === 'On' ? [4] : []), ...(s.infiniteUpgrades !== 'Off' ? [5] : [])] },
    { key:'skulltulaTokens', label:"Skulltulas d'Or", kind:'count', max:100, icon:'rewards/skulltula.png' },
    // Greg (rubis vert) : ne compte que s'il sert au pont arc-en-ciel ou à la clé de boss de Ganon.
    { key:'greg', label:'Greg (rubis vert)', kind:'bool', icon:'rewards/greg.png', visible:s => s.rainbowBridge === 'Greg'
      || (['Stones','Medallions','Dungeon rewards','Dungeons'].includes(s.rainbowBridge) && s.bridgeRewardOptions !== 'Standard Rewards')
      || (['LACS-Stones','LACS-Medallions','LACS-Rewards','LACS-Dungeons'].includes(s.ganonsBossKey) && s.gcbkRewardOptions !== 'Standard Reward') },
    { key:'gerudoCard', label:'Carte Gerudo', kind:'bool', icon:'items/gerudo.png' },
    { key:'stoneOfAgony', label:'Pierre de Souffrance', kind:'bool', icon:'items/stone_of_agony.png' },
  ]},
  { title:'Armes enfant', path:'items', items:[
    { key:'sticks', label:'Bâton Mojo', kind:'level', stages:['Aucun','10','20','30','Infini'], sizes:['','10','20','30','∞'], levels:ammoLevels, icon:'weapons/stick.png' },
    { key:'slingshot', label:'Lance-Pierre', kind:'level', stages:['Aucun','30','40','50','Infini'], sizes:['','30','40','50','∞'], levels:ammoLevels, icon:'weapons/slingshot.png' },
    { key:'boomerang', label:'Boomerang', kind:'bool', icon:'weapons/boomerang.png' },
  ]},
  { title:'Armes adulte', path:'items', items:[
    { key:'bow', label:'Arc', kind:'level', stages:['Aucun','30','40','50','Infini'], sizes:['','30','40','50','∞'], levels:ammoLevels, icon:'weapons/bow.png' },
    { key:'hookshot', label:'Grappin', kind:'level', stages:['Aucun','Grappin','Super-Grappin'],
      icons:['weapons/hookshot.png','weapons/longshot.png'] },
    { key:'titanMass', label:'Masse des Titans', kind:'bool', icon:'weapons/hammer.png' },
    { key:'fireArrows', label:'Flèches de Feu', kind:'bool', icon:'weapons/arrows/fire.png' },
    { key:'iceArrows', label:'Flèches de Glace', kind:'bool', icon:'weapons/arrows/ice.png' },
    { key:'lightArrows', label:'Flèches de Lumière', kind:'bool', icon:'weapons/arrows/light.png' },
  ]},
  { title:'Armes communes', path:'items', items:[
    { key:'nuts', label:'Noix Mojo', kind:'level', stages:['Aucune','20','30','40','Infinies'], sizes:['','20','30','40','∞'], levels:ammoLevels, icon:'weapons/nut.png' },
    { key:'bombBag', label:'Bombes', kind:'level', stages:['Aucune','20','30','40','Infinies'], sizes:['','20','30','40','∞'], levels:ammoLevels, icon:'weapons/bomb.png' },
    // Missiles (option « Sac de missiles ») : « Progressif » → sacs de 20 / 30 / 50 (+ ∞) ; « Aucun » / « Un sac »
    // → possédés ou non, capacité 50 (GetBombchuCapacity / item tracker de SoH).
    { key:'bombchus', label:'Missiles', kind:'level', stages:['Aucun','20','30','50','Infinis'], sizes:['','20','30','50','∞'],
      levels:s => s.bombchuBag === 'Progressive Bags' ? ammoLevels(s) : [0, 3], icon:'weapons/bombchu.png' },
  ]},
  { title:'Objets', path:'items', items:[
    { key:'beans', label:'Haricots Magiques', kind:'bool', icon:'items/bean.png' },
    { key:'truthLens', label:'Monocle de Vérité', kind:'bool', icon:'items/lens_truth.png' },
    { key:'bottle', label:'Bouteilles', kind:'count', max:4 },
    { key:'rutoLetter', label:'Lettre de Ruto', kind:'bool', icon:'items/ruto_letter.png' },
    { key:'fishingRod', label:'Canne à Pêche', kind:'bool', icon:'items/rod.png', visible:s => s.shuffleFishingPole === 'On' },
    // Ouvre toutes les serrures à petite clé de tous les donjons (affichée dans la carte des donjons).
    { key:'skeletonKey', label:'Clé Squelette', kind:'bool', icon:'dungeons/skeleton_key.png', visible:s => s.skeletonKey === 'On' },
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
    { key:'rocsFeather', label:'Plume de Roc', kind:'bool', icon:'items/rocs_feather.png', visible:s => s.rocsFeather === 'On' },
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
    { key:'magic', label:'Magie', kind:'level', stages:['Aucune','Simple','Double','Infinie'], levels:s => s.infiniteUpgrades === 'Off' ? [0, 1, 2] : [0, 1, 2, 3],
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
const itemLevels = it => it.levels ? it.levels(store.settings) : it.stages.map((_, i) => i);
const itemMax = it => typeof it.max === 'function' ? it.max(store.settings) : it.max;
const itemVisible = it => !it.visible || it.visible(store.settings);

/* ---------- Mise en page de la page Objets ---------- */
// Ne redéfinit aucune métadonnée d'objet : référence les objets d'ITEM_GROUPS par clé, juste pour
// savoir dans quel bloc visuel chacun s'affiche. ITEM_GROUPS reste la seule source pour defaults()
// (js/state.js) et les métadonnées (icône, paliers, max, visibilité...).
const ITEM_BY_KEY = {};
ITEM_GROUPS.forEach(g => g.items.forEach(it => { ITEM_BY_KEY[it.key] = { ...it, path:g.path }; }));

const ITEMS_PAGE = {
  stats:[['doubleDefense', 'heartContainers', 'heartPieces'], ['magic', 'skulltulaTokens', 'greg']],
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
      { title:'Sorts', items:['dinsFire', 'faroresWind', 'nayrusLove', 'rocsFeather'] } ],
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
    { id:'beans', icon:'icons/items/bean.png', visible:s => s.shuffleBeanSouls === 'On' },
    { id:'bossSouls', icon:'icons/dungeons/boss_soul.png', visible:s => s.shuffleBossSouls !== 'Off' },
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
// keyRing : réglage SoH « trousseau de clés » du donjon ; quest : réglage SoH du statut Vanilla / Master Quest ; soh : nom du donjon dans la liste
// « masterQuestDungeons » d'un spoiler SoH ; maxKeys / mqKeys : petites clés en Vanilla / en MQ (dungeon.cpp).
const DUNGEONS = [
  { id:'dekuTree', title:'Arbre Mojo', color:'#7aa83c', map:true, compass:true, quest:'mqDekuTree', soh:'Deku Tree' },
  { id:'dodongosCavern', title:'Caverne Dodongo', color:'#b0602c', map:true, compass:true, quest:'mqDodongosCavern', soh:"Dodongo's Cavern" },
  { id:'jabuJabu', title:'Ventre de Jabu-Jabu', color:'#d0708f', map:true, compass:true, quest:'mqJabuJabu', soh:"Jabu Jabu's Belly" },
  { id:'bottomOfTheWell', title:'Fond du Puits', color:'#6c5f7e', map:true, compass:true, maxKeys:3, mqKeys:2, keyRing:'keyRingBottomOfTheWell', quest:'mqBottomOfTheWell', soh:'Bottom of the Well' },
  { id:'gerudoTrainingGround', title:'Gymnase Gerudo', color:'#c9a03a', maxKeys:9, mqKeys:3, keyRing:'keyRingGerudoTrainingGround', quest:'mqGerudoTrainingGround', soh:'Gerudo Training Ground' },
  { id:'gerudoFortress', title:'Repaire des Voleurs', color:'#c0674a', maxKeys:4, keyRing:'keyRingGerudoFortress', card:'gerudoCard' },
  { id:'ganonsCastle', title:'Château de Ganon', color:'#8e2447', maxKeys:2, mqKeys:3, bossKey:true, keyRing:'keyRingGanonsCastle', quest:'mqGanonsCastle', soh:"Ganon's Castle" },
  { id:'forestTemple', title:'Forêt', color:'#2e7d3c', map:true, compass:true, maxKeys:5, mqKeys:6, bossKey:true, keyRing:'keyRingForestTemple', quest:'mqForestTemple', soh:'Forest Temple' },
  { id:'fireTemple', title:'Feu', color:'#c8372d', map:true, compass:true, maxKeys:8, mqKeys:5, bossKey:true, keyRing:'keyRingFireTemple', quest:'mqFireTemple', soh:'Fire Temple' },
  { id:'waterTemple', title:'Eau', color:'#2f6fb8', map:true, compass:true, maxKeys:6, mqKeys:2, bossKey:true, keyRing:'keyRingWaterTemple', quest:'mqWaterTemple', soh:'Water Temple' },
  { id:'shadowTemple', title:'Ombre', color:'#6b3f9a', map:true, compass:true, maxKeys:5, mqKeys:6, bossKey:true, keyRing:'keyRingShadowTemple', quest:'mqShadowTemple', soh:'Shadow Temple' },
  { id:'spiritTemple', title:'Esprit', color:'#d9822b', map:true, compass:true, maxKeys:5, mqKeys:7, bossKey:true, keyRing:'keyRingSpiritTemple', quest:'mqSpiritTemple', soh:'Spirit Temple' },
  { id:'iceCavern', title:'Caverne de Glace', color:'#4fa9c7', map:true, compass:true, quest:'mqIceCavern', soh:'Ice Cavern' },
];
const DUNGEON_BY_ID = {};
DUNGEONS.forEach(d => { DUNGEON_BY_ID[d.id] = d; });
// Cases à afficher pour un donjon selon la configuration. Ce qu'on possède dès le départ (« Start With » :
// carte, boussole, petites clés, clé de boss) reste affiché, plein et non cliquable (voir `*AtStart`) ; pas de
// clés du repaire si les charpentiers sont libres (il n'y en a pas), mais la Carte Gerudo reste.
function dungeonCells(id, s){
  const d = DUNGEON_BY_ID[id], free = s.fortressCarpenters === 'Free';
  return {
    map:!!d.map,
    compass:!!d.compass,
    keys:!!d.maxKeys && !(id === 'gerudoFortress' && free),
    bossKey:!!d.bossKey,
    card:!!d.card,
    // statut Vanilla / MQ à noter : seulement s'il n'est pas imposé par la configuration
    quest:!!d.quest && !configQuest(id, s),
  };
}
// Objets de donjon possédés dès le départ (option « Au départ ») : cases pleines, non cliquables.
const mapsAtStart = (id, s) => s.mapsCompasses === 'Start With';
const keysAtStart = (id, s) => id !== 'gerudoFortress' && s.smallKeys === 'Start With';
const bossKeyAtStart = (id, s) => (id === 'ganonsCastle' ? s.ganonsBossKey : s.bossKeys) === 'Start With';
// Statut Vanilla / MQ imposé par la configuration ('Vanilla' | 'MQ'), ou null s'il est tiré au sort
// (le joueur le note alors dans le panneau). Reprend la répartition de SoH (settings.cpp, FinalizeSettings).
function configQuest(id, s){
  const d = DUNGEON_BY_ID[id];
  if (!d.quest) return null;
  const mode = s.mqDungeons, own = s[d.quest];
  if (mode === 'None') return 'Vanilla';
  if (mode === 'Selection Only') return own === 'Random' ? null : own === 'Master Quest' ? 'MQ' : 'Vanilla';
  const count = s.mqDungeonCount;
  if (s.mqDungeonsSet !== 'On'){
    if (mode === 'Set Number' && count === 0) return 'Vanilla';
    if (mode === 'Set Number' && count === DUNGEONS.filter(x => x.quest).length) return 'MQ';
    return null;
  }
  if (own !== 'Random') return own === 'Master Quest' ? 'MQ' : 'Vanilla';
  if (mode !== 'Set Number') return null;
  // Donjons laissés au hasard : SoH en passe (nombre voulu − MQ imposés) en MQ, borné au nombre de candidats.
  const quests = DUNGEONS.filter(x => x.quest).map(x => s[x.quest]);
  const pool = quests.filter(q => q === 'Random').length, fixedMq = quests.filter(q => q === 'Master Quest').length;
  const toSet = Math.max(0, Math.min(count - fixedMq, pool));
  return toSet === 0 ? 'Vanilla' : toSet === pool ? 'MQ' : null;
}
// Trousseau possible : petites clés mélangées (ni « Vanilla » ni « Au départ ») ; pour le Repaire, 4 clés à
// trouver (charpentiers « Normal ») et clés de la Forteresse mélangées (item_pool.cpp de SoH).
function keyRingEligible(id, s){
  if (id === 'gerudoFortress') return s.fortressCarpenters === 'Normal' && s.gerudoFortressKeys !== 'Vanilla';
  return !['Vanilla', 'Start With'].includes(s.smallKeys);
}
// Trousseau imposé par la configuration (true / false), ou null s'il est tiré au sort. En « Aléatoire » et
// « Nombre », les réglages par donjon sont ignorés (SoH les écrase par le tirage).
function configKeyRing(id, s){
  const d = DUNGEON_BY_ID[id];
  if (!d.keyRing || s.keyRings === 'Off' || !keyRingEligible(id, s)) return false;
  if (s.keyRings === 'Selection') return s[d.keyRing] === 'Random' ? null : s[d.keyRing] === 'Yes';
  const pool = DUNGEONS.filter(x => x.keyRing && keyRingEligible(x.id, s)).length;
  if (s.keyRings === 'Count' && s.keyRingCount === 0) return false;
  if (s.keyRings === 'Count' && s.keyRingCount >= pool) return true;
  return null;
}
const visibleKeys = keys => keys.filter(k => itemVisible(ITEM_BY_KEY[k]));

/* ---------- Check-lists de lieux (clés hors donjon, trous à haricots) ---------- */
// Purement informatif pour l'instant (voir remarque ci-dessus) : une simple liste de lieux à cocher,
// pas encore reliée à de nouvelles connexions dans le graphe du Routeur.
function slugify(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
// Libellé seul, ou [libellé, visible(settings)] pour un lieu qui n'existe qu'avec certaines options.
function checklist(title, labels){
  return { title, locations:labels.map(l => Array.isArray(l) ? { id:slugify(l[0]), label:l[0], visible:l[1] } : { id:slugify(l), label:l }) };
}
const checklistLocations = (name, s) => CHECKLISTS[name].locations.filter(l => !l.visible || l.visible(s));
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
  // Âmes de boss (option « Shuffle Boss Souls ») : un boss ne peut être combattu qu'une fois son âme trouvée.
  bossSouls:checklist('Âmes de boss', [
    'Reine Gohma', 'Roi Dodongo', 'Barinade', 'Ganon Spectral', 'Volvagia', 'Morpha', 'Bongo Bongo', 'Twinrova',
    ['Ganon', s => s.shuffleBossSouls === 'On + Ganon'],
  ]),
};
