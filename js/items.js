/* ---------- Inventaire (panneau Objets) ---------- */
// kind: 'bool' (chip on/off), 'level' (objet progressif, stages = libellés par palier, palier 0 = aucun),
// 'count' (compteur libre 0..max, purement informatif). `max` peut être une fonction (settings)=>nombre
// pour un plafond réglable en Configuration. `visible(settings)` masque l'objet si la fonction renvoie faux.
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
    { key:'kokiriSword', label:'Épée Kokiri', kind:'bool' },
    { key:'masterSword', label:'Épée de Légende', kind:'bool' },
    { key:'biggoronSword', label:'Épée Biggoron', kind:'bool' },
    { key:'dekuShield', label:'Bouclier Mojo', kind:'bool' },
    { key:'hylianShield', label:'Bouclier Hylien', kind:'bool' },
    { key:'mirrorShield', label:'Bouclier Miroir', kind:'bool' },
    { key:'kokiriBoots', label:'Bottes Kokiri', kind:'bool' },
    { key:'ironBoots', label:'Bottes de Plomb', kind:'bool' },
    { key:'hoverBoots', label:'Bottes des Airs', kind:'bool' },
    { key:'goronTunic', label:'Tunique Goron', kind:'bool' },
    { key:'zoraTunic', label:'Tunique Zora', kind:'bool' },
    { key:'strength', label:'Force', kind:'level', stages:['Aucune','Bracelet Goron',"Gantelets d'Argent","Gantelets d'Or"] },
    { key:'scale', label:'Écaille de Zora', kind:'level', stages:['Aucune',"Écaille d'Argent","Écaille d'Or"] },
    { key:'wallet', label:'Bourse', kind:'level', stages:['Bourse (99)','Grande Bourse (200)','Bourse de Géant (500)','Bourse de Magnat (999)'],
      sizes:['99','200','500','999'] },
    { key:'skulltulaTokens', label:"Skulltulas d'Or", kind:'count', max:100 },
    { key:'gerudoCard', label:'Pass Gerudo', kind:'bool' },
    { key:'stoneOfAgony', label:'Pierre de Souffrance', kind:'bool' },
  ]},
  { title:'Armes enfant', path:'items', items:[
    { key:'sticks', label:'Bâton Mojo', kind:'level', stages:['Aucun','10','20','30'], sizes:['','10','20','30'], icon:'weapons/sticks.png' },
    { key:'slingshot', label:'Lance-Pierre', kind:'level', stages:['Aucun','30','40','50'], sizes:['','30','40','50'], icon:'weapons/slingshot.png' },
    { key:'boomerang', label:'Boomerang', kind:'bool', icon:'weapons/boomerang.png' },
  ]},
  { title:'Armes adulte', path:'items', items:[
    { key:'bow', label:'Arc', kind:'level', stages:['Aucun','30','40','50'], sizes:['','30','40','50'] },
    { key:'hookshot', label:'Grappin', kind:'level', stages:['Aucun','Grappin','Super-Grappin'] },
    { key:'titanMass', label:'Masse des Titans', kind:'bool', icon:'weapons/hammer.png' },
    { key:'fireArrows', label:'Flèches de Feu', kind:'bool' },
    { key:'iceArrows', label:'Flèches de Glace', kind:'bool' },
    { key:'lightArrows', label:'Flèches de Lumière', kind:'bool' },
  ]},
  { title:'Armes communes', path:'items', items:[
    { key:'nuts', label:'Noix Mojo', kind:'level', stages:['Aucune','20','30','40'], sizes:['','20','30','40'] },
    { key:'bombBag', label:'Bombes', kind:'level', stages:['Aucune','30','40','50'], sizes:['','30','40','50'] },
    { key:'bombchus', label:'Missiles', kind:'bool', icon:'weapons/missiles.png' },
  ]},
  { title:'Objets', path:'items', items:[
    { key:'beans', label:'Haricots Magiques', kind:'bool' },
    { key:'truthLens', label:'Monocle de Vérité', kind:'bool', icon:'items/lens.png' },
    { key:'bottle', label:'Bouteilles', kind:'count', max:4 },
    { key:'rutoLetter', label:'Lettre de Ruto', kind:'bool' },
  ]},
  { title:'Magie', path:'items', items:[
    { key:'dinsFire', label:'Feu de Din', kind:'bool' },
    { key:'faroresWind', label:'Vent de Farore', kind:'bool' },
    { key:'nayrusLove', label:'Amour de Nayru', kind:'bool' },
  ]},
  { title:'Ocarina', path:'items', items:[
    { key:'ocarina', label:'Ocarina', kind:'level', stages:['Aucune',"Ocarina de Fée","Ocarina du Temps"] },
  ]},
  { title:"Notes d'Ocarina (si mélangées)", path:'items', items:[
    { key:'noteA', label:'Bouton A', kind:'bool' },
    { key:'noteCUp', label:'C-Haut', kind:'bool' },
    { key:'noteCRight', label:'C-Droite', kind:'bool' },
    { key:'noteCLeft', label:'C-Gauche', kind:'bool' },
    { key:'noteCDown', label:'C-Bas', kind:'bool' },
  ]},
  { title:'Statistiques', path:'items', items:[
    { key:'magic', label:'Magie', kind:'level', stages:['Aucune','Simple','Double'] },
    { key:'heartPieces', label:'Quarts de Cœur', kind:'count', max:36 },
    { key:'heartContainers', label:'Réceptacles de Cœur', kind:'count', max:8 },
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
