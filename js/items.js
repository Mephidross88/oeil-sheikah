/* ---------- Inventaire (panneau Objets) ---------- */
// kind: 'bool' (chip on/off), 'level' (objet progressif, stages = libellés par palier, palier 0 = aucun),
// 'count' (compteur libre 0..max, purement informatif). `max` peut être une fonction (settings)=>nombre
// pour un plafond réglable en Configuration. `visible(settings)` masque l'objet si la fonction renvoie faux.
// `locked:true` (objet `bool` uniquement) : toujours possédé, non désactivable (équipement de départ
// jamais réellement obtenu en jeu, ex. Tunique/Bottes Kokiri) — la tuile ignore les clics.
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
    { key:'triforcePieces', label:'Morceaux de Triforce', kind:'count', max:s => s.triforceHuntMax, visible:s => s.triforceHunt },
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
      sizes:['99','200','500','999'] },
    { key:'skulltulaTokens', label:"Skulltulas d'Or", kind:'count', max:100, icon:'equipment/skulltula.png' },
    { key:'gerudoCard', label:'Pass Gerudo', kind:'bool' },
    { key:'stoneOfAgony', label:'Pierre de Souffrance', kind:'bool', icon:'items/stone_of_agony.png' },
  ]},
  { title:'Armes enfant', path:'items', items:[
    { key:'sticks', label:'Bâton Mojo', kind:'level', stages:['Aucun','10','20','30'], sizes:['','10','20','30'], icon:'weapons/stick.png' },
    { key:'slingshot', label:'Lance-Pierre', kind:'level', stages:['Aucun','30','40','50'], sizes:['','30','40','50'], icon:'weapons/slingshot.png' },
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
    { key:'nuts', label:'Noix Mojo', kind:'level', stages:['Aucune','20','30','40'], sizes:['','20','30','40'], icon:'weapons/nut.png' },
    { key:'bombBag', label:'Bombes', kind:'level', stages:['Aucune','30','40','50'], sizes:['','30','40','50'], icon:'weapons/bomb.png' },
    { key:'bombchus', label:'Missiles', kind:'bool', icon:'weapons/bombchu.png' },
  ]},
  { title:'Objets', path:'items', items:[
    { key:'beans', label:'Haricots Magiques', kind:'bool', icon:'items/bean.png' },
    { key:'truthLens', label:'Monocle de Vérité', kind:'bool', icon:'items/lens_truth.png' },
    { key:'bottle', label:'Bouteilles', kind:'count', max:4 },
    { key:'rutoLetter', label:'Lettre de Ruto', kind:'bool' },
  ]},
  { title:"Objets d'échange (Enfant)", path:'items', items:[
    // En rando, chaque objet est un pickup indépendant trouvable dans n'importe quel ordre et
    // conservé (pas de « remplacement » comme en vanilla) : tous des bascules séparées.
    { key:'weirdEgg', label:'Œuf Bizarre', kind:'bool', icon:'trade/child/egg.png' },
    { key:'chicken', label:'Poule', kind:'bool' },
    { key:'zeldasLetter', label:'Lettre de Zelda', kind:'bool' },
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
    // Un seul visuel existe pour les deux (œuf éclos en cocotte), partagé le temps d'une icône dédiée.
    { key:'pocketEgg', label:'Œuf de Poche', kind:'bool', icon:'trade/adult/egg.png' },
    { key:'pocketCucco', label:'Cocotte de Poche', kind:'bool', icon:'trade/adult/egg.png' },
    { key:'cojiro', label:'Cojiro', kind:'bool', icon:'trade/adult/cojiro.png' },
    { key:'oddMushroom', label:'Champignon Étrange', kind:'bool', icon:'trade/adult/mushroom.png' },
    { key:'oddPotion', label:'Potion Étrange', kind:'bool', icon:'trade/adult/potion.png' },
    { key:'poachersSaw', label:'Scie du Braconnier', kind:'bool', icon:'trade/adult/saw.png' },
    { key:'brokenSword', label:'Épée Cassée', kind:'bool' },
    { key:'prescription', label:'Ordonnance', kind:'bool', icon:'trade/adult/prescription.png' },
    { key:'eyeballFrog', label:'Œil de Grenouille', kind:'bool', icon:'trade/adult/frog.png' },
    { key:'eyedrops', label:'Gouttes Oculaires', kind:'bool', icon:'trade/adult/drops.png' },
    { key:'claimCheck', label:'Reçu', kind:'bool' },
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
    { key:'noteA', label:'Bouton A', kind:'bool' },
    { key:'noteCUp', label:'C-Haut', kind:'bool' },
    { key:'noteCRight', label:'C-Droite', kind:'bool' },
    { key:'noteCLeft', label:'C-Gauche', kind:'bool' },
    { key:'noteCDown', label:'C-Bas', kind:'bool' },
  ]},
  { title:'Statistiques', path:'items', items:[
    { key:'magic', label:'Magie', kind:'level', stages:['Aucune','Simple','Double'],
      icons:['statistics/magic_small.png','statistics/magic_large.png'] },
    { key:'heartPieces', label:'Quarts de Cœur', kind:'count', max:36, icon:'statistics/heart_piece.png' },
    { key:'heartContainers', label:'Réceptacles de Cœur', kind:'count', max:8, icon:'statistics/heart_container.png' },
    { key:'doubleDefense', label:'Double Défense', kind:'bool' },
  ]},
  { title:'Chants appris', path:'songs', items:[
    { key:'zeldaLullaby', label:'Berceuse de Zelda', kind:'bool' }, { key:'eponasSong', label:"Chant d'Epona", kind:'bool' },
    { key:'sariasSong', label:'Chant de Saria', kind:'bool' }, { key:'sunsSong', label:'Chant du Soleil', kind:'bool' },
    { key:'songOfTime', label:'Chant du Temps', kind:'bool' }, { key:'songOfStorms', label:'Chant des Tempêtes', kind:'bool' },
    { key:'scarecrowSong', label:"Chant de l'Épouvantail", kind:'bool' },
  ]},
  { title:'Chants de téléportation', path:'songs', items:[
    { key:'minuet', label:'Menuet des Bois', kind:'bool' }, { key:'bolero', label:'Boléro du Feu', kind:'bool' },
    { key:'serenade', label:"Sérénade de l'Eau", kind:'bool' }, { key:'requiem', label:'Requiem des Esprits', kind:'bool' },
    { key:'nocturne', label:"Nocturne de l'Ombre", kind:'bool' }, { key:'prelude', label:'Prélude de la Lumière', kind:'bool' },
  ]},
];
const itemMax = it => typeof it.max === 'function' ? it.max(store.settings) : it.max;
const itemVisible = it => !it.visible || it.visible(store.settings);
