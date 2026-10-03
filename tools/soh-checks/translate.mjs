// Traduction française des noms de checks SoH (noms courts anglais -> libellés FR).
// 1) FULL : noms traduits à la main (PNJ, récompenses, chants, objets uniques…).
// 2) Sinon : objet en tête (HEADS) + numéro + lieu traduit par règles (prépositions, groupes nominaux,
//    articles et contractions), avec l'âge en suffixe « (enfant) » / « (adulte) ».

// ---------- Noms traduits à la main (clé : nom court SoH sans « MQ ») ----------
export const FULL = {
  // Forêt / Bois
  'Kokiri Sword Chest': 'Coffre de l\'Épée Kokiri', 'Mido Top Left Chest': 'Coffre de Mido, en haut à gauche',
  'Mido Top Right Chest': 'Coffre de Mido, en haut à droite', 'Mido Bottom Left Chest': 'Coffre de Mido, en bas à gauche',
  'Mido Bottom Right Chest': 'Coffre de Mido, en bas à droite', 'Gift From Saria': 'Cadeau de Saria',
  'Skull Kid': 'Skull Kid', 'Ocarina Memory Game': 'Jeu de mémoire à l\'ocarina', 'Target in Woods': 'Cible dans les bois',
  'Deku Theater Skull Mask': 'Théâtre Mojo : Masque de Mort', 'Deku Theater Mask of Truth': 'Théâtre Mojo : Masque de Vérité',
  'Song from Saria': 'Chant de Saria', 'Sheik in Forest': 'Sheik au Bosquet Sacré',
  // Plaine, ranch, lac
  'Ocarina of Time Item': 'Ocarina du Temps', 'Song from Ocarina of Time': 'Chant reçu avec l\'Ocarina du Temps',
  'Tektite Grotto Freestanding PoH': 'Quart de cœur de la grotte aux Tektites', 'Talons Chickens': 'Cocottes de Talon',
  'Song from Malon': 'Chant de Malon', 'Child Fishing': 'Pêche (enfant)', 'Adult Fishing': 'Pêche (adulte)',
  'Hyrule Loach Reward': 'Récompense de la Loche d\'Hyrule', 'Lab Dive': 'Plongée du Laboratoire du Lac',
  'Lab Trade Eyeball Frog': 'Échange au Laboratoire du Lac : Œil de Grenouille', 'Underwater Item': 'Objet sous l\'eau',
  'Sun': 'Tirer sur le soleil', 'Freestanding PoH': 'Quart de cœur', 'GS Skull on Fire': 'Skulltula du crâne en feu',
  'Boomerang Room Small Chest': 'Petit coffre de la salle du boomerang', 'First Stalfos Chest': 'Coffre du 1er Stalfos',
  'First Iron Knuckle Chest': 'Coffre du 1er Hache-Viande', 'Second Iron Knuckle Chest': 'Coffre du 2e Hache-Viande',
  // Gerudo, désert
  'Waterfall Freestanding PoH': 'Quart de cœur de la cascade', 'Crate Freestanding PoH': 'Quart de cœur dans la caisse',
  'Trade Broken Sword': 'Échange : Épée Brisée', 'Trade Claim Check': 'Échange : Certificat', 'Trade Cojiro': 'Échange : Cojiro',
  'Trade Eyedrops': 'Échange : Super gouttes', 'Trade Odd Mushroom': 'Échange : Champignon Suspect', 'Trade Odd Potion': 'Échange : Mixture Suspecte',
  'Trade Pocket Cucco': 'Échange : P\'tit poulet', 'Trade Prescription': 'Échange : Ordonnance', 'Trade Saw': 'Échange : Scie de Chasseur',
  'HBA 1000 Points': 'Archerie montée : 1000 points', 'HBA 1500 Points': 'Archerie montée : 1500 points',
  'Freed All Carpenters': 'Charpentiers libérés (Carte Gerudo)', '1 Torch Carpenter': 'Charpentier de la cellule à 1 torche',
  'Dead End Carpenter': 'Charpentier du cul-de-sac', 'Double Cell Carpenter': 'Charpentier de la double cellule',
  'Steep Slope Carpenter': 'Charpentier de la pente raide', 'Carpet Salesman': 'Marchand de tapis',
  'Great Fairy Reward': 'Récompense de la Grande Fée', 'OGC Great Fairy Reward': 'Récompense de la Grande Fée (Château de Ganon)',
  'Sheik at Colossus': 'Sheik au Colosse', 'Song from Royal Family\'s Tomb': 'Chant de la tombe royale',
  // Bourg, château, temple du temps
  'Treasure Chest Game Reward': 'Récompense de la chasse au trésor', 'Bombchu Bowling First Prize': 'Bowling Teigneux : 1er prix',
  'Bombchu Bowling Second Prize': 'Bowling Teigneux : 2e prix', 'Lost Dog': 'Chien perdu', 'Shooting Gallery': 'Stand de tir',
  'Shooting Gallery Reward': 'Stand de tir', '10 Big Poes': 'Récompense des Esprits', 'Malon Egg': 'Œuf de Malon',
  'Zeldas Letter': 'Lettre de Zelda', 'Song from Impa': 'Chant d\'Impa', 'ToT Master Sword': 'Épée de Légende',
  'ToT Light Arrow Cutscene': 'Flèches de Lumière (Zelda)', 'Sheik at Temple': 'Sheik au Temple du Temps',
  'Gift from Rauru': 'Cadeau de Rauru', 'Link\'s Pocket': 'Poche de Link', 'Granny\'s Shop': 'Boutique de Granny',
  'Magic Bean Salesman': 'Marchand de haricots', 'Medigoron': 'Medigoron',
  // Cocorico, cimetière
  '10 Gold Skulltula Reward': 'Maison des Araignées : 10 symboles', '20 Gold Skulltula Reward': 'Maison des Araignées : 20 symboles',
  '30 Gold Skulltula Reward': 'Maison des Araignées : 30 symboles', '40 Gold Skulltula Reward': 'Maison des Araignées : 40 symboles',
  '50 Gold Skulltula Reward': 'Maison des Araignées : 50 symboles', '100 Gold Skulltula Reward': 'Maison des Araignées : 100 symboles',
  'Man on Roof': 'Homme sur le toit', 'Anju as Adult': 'Anju (adulte)', 'Anju as Child': 'Anju (enfant)',
  'Impas House Freestanding PoH': 'Quart de cœur de la maison d\'Impa', 'Windmill Freestanding PoH': 'Quart de cœur du moulin',
  'Song from Windmill': 'Chant du moulin', 'Sheik in Kakariko': 'Sheik à Cocorico',
  'Shield Grave Chest': 'Coffre de la tombe au bouclier', 'Heart Piece Grave Chest': 'Coffre de la tombe au quart de cœur',
  'Royal Family\'s Tomb Chest': 'Coffre de la tombe royale', 'Hookshot Chest': 'Coffre du Grappin (course d\'Igor)',
  'Dampe Race Freestanding PoH': 'Quart de cœur de la course d\'Igor', 'Dampe Gravedigging Tour': 'Fouilles d\'Igor',
  // Montagne, Goron
  'Trade Claim Check': 'Échange : Certificat', 'Biggoron Hint': 'Indice de Biggoron',
  'Maze Left Chest': 'Coffre gauche du labyrinthe', 'Maze Right Chest': 'Coffre droit du labyrinthe', 'Maze Center Chest': 'Coffre central du labyrinthe',
  'Rolling Goron as Child': 'Goron roulant (enfant)', 'Rolling Goron as Adult': 'Goron roulant (adulte)', 'Darunias Joy': 'Danse de Darunia',
  'Pot Freestanding PoH': 'Quart de cœur de la jarre tournante', 'Upper Grotto Chest': 'Coffre de la grotte du haut',
  'Wall Freestanding PoH': 'Quart de cœur dans le mur', 'Volcano Freestanding PoH': 'Quart de cœur du volcan',
  'Sheik in Crater': 'Sheik au Cratère', 'Great Fairy': 'Grande Fée',
  // Zora
  'Frogs in the Rain': 'Grenouilles sous la pluie', 'Frogs Ocarina Game': 'Jeu d\'ocarina des grenouilles',
  'Frogs Zelda\'s Lullaby': 'Grenouilles : Berceuse de Zelda', 'Frogs Epona\'s Song': 'Grenouilles : Chant d\'Epona',
  'Frogs Saria\'s Song': 'Grenouilles : Chant de Saria', 'Frogs Sun\'s Song': 'Grenouilles : Chant du Soleil',
  'Frogs Song of Time': 'Grenouilles : Chant du Temps', 'Near Open Grotto Freestanding PoH': 'Quart de cœur près de la grotte ouverte',
  'Near Domain Freestanding PoH': 'Quart de cœur près du domaine', 'Diving Minigame': 'Jeu de plongée',
  'King Zora Thawed': 'Roi Zora dégelé', 'Iceberg Freestanding PoH': 'Quart de cœur de l\'iceberg',
  'Bottom Freestanding PoH': 'Quart de cœur au fond', 'Sheik in Ice Cavern': 'Sheik dans la Caverne de Glace',
  // Vaches
  'Cow': 'Vache', 'Cow Grotto Cow': 'Vache de la grotte', 'Impas House Cow': 'Vache de la maison d\'Impa',
  'Links House Cow': 'Vache de la maison de Link', 'Stables Left Cow': 'Vache gauche des écuries', 'Stables Right Cow': 'Vache droite des écuries',
  'Tower Left Cow': 'Vache gauche du silo', 'Tower Right Cow': 'Vache droite du silo',
  // Boss et récompenses
  'Queen Gohma': 'Reine Gohma', 'King Dodongo': 'Roi Dodongo', 'Barinade': 'Barinade', 'Phantom Ganon': 'Ganon Spectral',
  'Volvagia': 'Volvagia', 'Morpha': 'Morpha', 'Bongo Bongo': 'Bongo Bongo', 'Twinrova': 'Twinrova',
  'Queen Gohma Heart Container': 'Réceptacle de cœur (Reine Gohma)', 'King Dodongo Heart Container': 'Réceptacle de cœur (Roi Dodongo)',
  'Barinade Heart Container': 'Réceptacle de cœur (Barinade)', 'Phantom Ganon Heart Container': 'Réceptacle de cœur (Ganon Spectral)',
  'Volvagia Heart Container': 'Réceptacle de cœur (Volvagia)', 'Morpha Heart Container': 'Réceptacle de cœur (Morpha)',
  'Bongo Bongo Heart Container': 'Réceptacle de cœur (Bongo Bongo)', 'Twinrova Heart Container': 'Réceptacle de cœur (Twinrova)',
  // Objets de donjon notables
  'Map Chest': 'Coffre de la carte', 'Compass Chest': 'Coffre de la boussole', 'Boss Key Chest': 'Coffre de la clé du boss',
  'Tower Boss Key Chest': 'Coffre de la clé du boss (tour)', 'Slingshot Chest': 'Coffre du lance-pierre', 'Bomb Bag Chest': 'Coffre du sac de bombes',
  'Boomerang Chest': 'Coffre du boomerang', 'Bow Chest': 'Coffre de l\'arc', 'Megaton Hammer Chest': 'Coffre de la Masse des Titans',
  'Longshot Chest': 'Coffre du Super-Grappin', 'Iron Boots Chest': 'Coffre des Bottes de Plomb', 'Hover Boots Chest': 'Coffre des Bottes des Airs',
  'Silver Gauntlets Chest': 'Coffre des Gantelets d\'argent', 'Mirror Shield Chest': 'Coffre du Bouclier miroir',
  'Lens of Truth Chest': 'Coffre du Monocle de Vérité', 'Ice Arrows Chest': 'Coffre des Flèches de glace',
  'Dead Hand Freestanding Key': 'Petite clé du Poignant', 'Freestanding Key': 'Petite clé', 'Chest': 'Coffre',
  'Chest on Fire': 'Coffre en feu', 'Highest Goron Chest': 'Coffre du Goron le plus haut',
  'Maze Right Central Chest': 'Coffre central du côté droit du labyrinthe', 'Maze Right Side Chest': 'Coffre latéral du côté droit du labyrinthe',
  'Maze Path First Chest': '1er coffre du chemin du labyrinthe', 'Maze Path Second Chest': '2e coffre du chemin du labyrinthe',
  'Maze Path Third Chest': '3e coffre du chemin du labyrinthe', 'Maze Path Final Chest': 'Dernier coffre du chemin du labyrinthe',
};

// ---------- Objets (tête du libellé) ----------
// [motif anglais, libellé FR, position] ; position 'start' = préfixe (GS X), sinon suffixe (X Chest).
// Arbres de la Plaine numérotés par secteur (« HF Tree in Southeast 1 ») : « in » serait pris pour une préposition
for (const [en, fr] of [['East', "à l'est"], ['West', "à l'ouest"], ['North', 'au nord'], ['South', 'au sud'], ['Northeast', 'au nord-est'],
  ['Northwest', 'au nord-ouest'], ['Southeast', 'au sud-est'], ['Southwest', 'au sud-ouest']])
  for (let n = 1; n <= 40; n++) FULL[`Tree in ${en} ${n}`] = `Arbre ${n} ${fr}`;

const HEADS = [
  ['GS', 'Skulltula', 'start'], ['Deku Scrub', 'Peste Mojo', 'start'], ['Trade', 'Échange', 'start'],
  ['Freestanding PoH', 'Quart de cœur'], ['PoH', 'Quart de cœur'], ['Heart Container', 'Réceptacle de cœur'],
  ['Freestanding Key', 'Petite clé'], ['Small Crate', 'Petite caisse'], ['Crate', 'Caisse'], ['Pot', 'Jarre'],
  ['Grass', 'Herbe'], ['Chest', 'Coffre'], ['Red Rupee', 'Rubis rouge'], ['Blue Rupee', 'Rubis bleu'],
  ['Green Rupee', 'Rubis vert'], ['Rupees', 'Rubis'], ['Rupee', 'Rubis'], ['Recovery Heart', 'Cœur'], ['Heart', 'Cœur'],
  ['Big Fairy', 'Fée'], ['Fairy', 'Fée'], ['Cow', 'Vache'], ['Beehive', 'Ruche'], ['Tree', 'Arbre', 'start'], ['Tree', 'Arbre'], ['Bush', 'Buisson'], ['Loach', 'Loche'],
  ['Fish', 'Poisson'], ['Key', 'Clé'], ['Item', 'Objet'], ['Arrows', 'Flèches'], ['Seeds', 'Graines'], ['Bombs', 'Bombes'],
  ['Deku Nuts', 'Noix Mojo'], ['Magic', 'Magie'],
];

// ---------- Dictionnaire ----------
// Nom : { n, g:'m'|'f', pl?, v? (élision) }, nom propre : { p }, adjectif : { a } (placé après le nom),
// position/qualificatif final : { s } (placé à la fin).
const N = (n, g = 'm', o = {}) => ({ n, g, ...o });
const P = p => ({ p });
const A = (a, o = {}) => ({ a, ...o });
const S = s => ({ s });
export const W = {
  // lieux, salles
  Room:N('salle','f'), Rooms:N('salles','f',{pl:1}), Chamber:N('chambre','f'), Hall:N('hall'), Hallway:N('couloir'), Lobby:N('hall d\'entrée'),
  Entrance:N('entrée','f'), Exit:N('sortie','f'), Basement:N('sous-sol'), Floor:N('étage'), Corner:N('coin'), Alcove:N('alcôve','f'),
  Area:N('zone','f'), Path:N('chemin'), Maze:N('labyrinthe'), Bridge:N('pont'), Platform:N('plateforme','f'), Pad:N('plateforme','f'),
  Ledge:N('corniche','f'), Stairs:N('escalier'), Staircase:N('escalier'), Ladder:N('échelle','f'), Tunnel:N('tunnel'), Gate:N('grille','f'),
  Door:N('porte','f'), Wall:N('mur'), Walls:N('murs','m',{pl:1}), Window:N('fenêtre','f'), Ceiling:N('plafond'), Pit:N('fosse','f'),
  Pillar:N('pilier'), Pilar:N('pilier'), Statue:N('statue','f'), Altar:N('autel'), Cell:N('cellule','f'), Jail:N('prison','f'),
  Cage:N('cage','f'), Tower:N('tour','f'), Watchtower:N('tour de guet','f'), Shed:N('cabane','f'), Tent:N('tente','f'), House:N('maison','f'),
  Shop:N('boutique','f'), Kitchen:N('cuisine','f'), Backroom:N('arrière-salle','f'), Storage:N('réserve','f'), Courtyard:N('cour','f'),
  Island:N('île','f'), River:N('rivière','f'), Waterfall:N('cascade','f'), Lavafall:N('cascade de lave','f'), Pond:N('étang'),
  Lake:N('lac'), Well:N('puits'), Fountain:N('fontaine','f'), Oasis:N('oasis','f'), Geyser:N('geyser'), Whirlpool:N('tourbillon'),
  Cave:N('grotte','f'), Grotto:N('grotte','f'), Grottos:N('grottes','f',{pl:1}), Hill:N('colline','f'), Slope:N('pente','f'),
  Rock:N('rocher'), Rocks:N('rochers','m',{pl:1}), Boulder:N('rocher'), Chasm:N('gouffre'), Crater:N('cratère'), Volcano:N('volcan'),
  Canopy:N('feuillage'), Fence:N('clôture','f'), Roof:N('toit'), Loop:N('boucle','f'), Range:N('stand'), Gallery:N('stand de tir'),
  Stables:N('écuries','f',{pl:1}), Windmill:N('moulin'), Theater:N('théâtre'), Theatre:N('théâtre'), Ship:N('bateau'), Boat:N('bateau'),
  Log:N('tronc'), Coffin:N('cercueil'), Grave:N('tombe','f'), Graves:N('tombes','f',{pl:1}), Tomb:N('tombe','f'), Patch:N('carré de terre'),
  Sprout:N('pousse','f'), Block:N('bloc'), Blocks:N('blocs','m',{pl:1}), Switch:N('interrupteur'), Switches:N('interrupteurs','m',{pl:1}),
  Torch:N('torche','f'), Torches:N('torches','f',{pl:1}), Target:N('cible','f'), Puzzle:N('énigme','f'), Circle:N('cercle'),
  Trial:N('épreuve','f'), Flag:N('drapeau'), Umbrella:N('parapluie'), Spinner:N('tourniquet'), Pole:N('perche','f'),
  Quicksand:N('sables mouvants','m',{pl:1}), Vines:N('lianes','f',{pl:1}), Spikes:N('pics','m',{pl:1}), Spike:N('pic'),
  Blade:N('lame','f'), Blades:N('lames','f',{pl:1}), Scythe:N('faux','f'), Flame:N('flamme','f'), Flames:N('flammes','f',{pl:1}),
  Lava:N('lave','f'), Water:N('eau','f'), Wind:N('vent'), Rain:N('pluie','f'), Main:A('principal'), Outskirts:N('abords','m',{pl:1}),
  Level:N('niveau'), Hand:N('main','f'), Eye:N('œil'), Mirror:N('miroir'), Construction:N('chantier'), Minigame:N('mini-jeu'),
  Game:N('jeu'), Race:N('course','f'), Tour:N('visite','f'), Prize:N('prix'), Reward:N('récompense','f'), Gift:N('cadeau'),
  Song:N('chant'), Hint:N('indice'), Warp:N('téléporteur'), Pedestal:N('piédestal'), Tail:N('queue','f'), Dark:A('sombre'),
  Shortcut:N('raccourci'), Shortcuts:N('raccourcis','m',{pl:1}), Barricade:N('barricade','f'), Baricade:N('barricade','f'),
  Thrones:N('trônes','m',{pl:1}), Sun:N('soleil'), Time:N('temps'), Storms:N('tempêtes','f',{pl:1}), Lullaby:N('berceuse','f'),
  Symphony:N('symphonie','f'), Diary:N('journal'), Medicine:N('remède'), Letter:N('lettre','f'), Container:N('réceptacle'),
  Items:N('objets','m',{pl:1}), Enemies:N('ennemis','m',{pl:1}), Enemy:N('ennemi'), Crystal:N('cristal'),
  Gauntlets:N('gantelets','m',{pl:1}), Boots:N('bottes','f',{pl:1}), Shield:N('bouclier'), Sword:N('épée','f'), Hammer:N('masse','f'),
  Slingshot:N('lance-pierre'), Boomerang:N('boomerang'), Bow:N('arc'), Hookshot:N('grappin'), Longshot:N('Super-Grappin'),
  Arrow:N('flèche','f'), Arrows:N('flèches','f',{pl:1}), Lens:N('monocle'), Map:N('carte','f'), Compass:N('boussole','f'),
  Bomb:N('bombe','f'), Bombchu:N('missile'), Bag:N('sac'), Flower:N('fleur','f'), Bean:N('haricot'), Egg:N('œuf'), Mushroom:N('champignon'),
  Potion:N('potion','f'), Saw:N('scie','f'), Prescription:N('ordonnance','f'), Eyedrops:N('gouttes','f',{pl:1}), Chickens:N('cocottes','f',{pl:1}),
  Cucco:N('cocotte','f'), Dog:N('chien'), Man:N('homme'), Kid:N('enfant'), Guard:N('garde'), Guards:N('gardes','m',{pl:1}),
  Carpenter:N('charpentier'), Carpenters:N('charpentiers','m',{pl:1}), Brothers:N('frères','m',{pl:1}), Twins:N('jumeaux','m',{pl:1}),
  Frog:N('grenouille','f'), Frogs:N('grenouilles','f',{pl:1}), Poe:N('Esprit'), Poes:N('Esprits','m',{pl:1}), Stone:N('pierre','f'),
  Skulltula:N('Skulltula','f'), Heart:N('cœur'), Piece:N('quart'), Points:N('points','m',{pl:1}), Check:N('check'),
  Location:N('emplacement'), Pocket:N('poche','f'), Key:N('clé','f'), Bazaar:N('bazar'), Market:N('bourg'), Domain:N('domaine'),
  Valley:N('vallée','f'), Woods:N('bois','m',{pl:1}), Forest:N('forêt','f'), Graveyard:N('cimetière'), Ranch:N('ranch'),
  Fire:N('feu'), Ice:N('glace','f'), Light:N('lumière','f'), Shadow:N('ombre','f'), Spirit:N('esprit'), Iceberg:N('iceberg'),
  Boss:N('boss'), Climb:N('escalade','f'), Break:N('salle de repos','f'), Tree:N('arbre'), Beehive:N('ruche','f'), Bush:N('buisson'),
  Pot:N('jarre','f'), Crate:N('caisse','f'), Chest:N('coffre'), Fairy:N('fée','f'), Cow:N('vache','f'), Grass:N('herbe','f'),
  Rupee:N('rubis'), Heart2:N('cœur'), Scrub:N('peste','f'), Scrubs:N('pestes','f',{pl:1}), Goron:P('Goron'),
  Jailed:A('emprisonné'), Metal:A('métallique'), Underwater:S("sous l'eau"), Two:A('deux',{num:1}), Three:A('trois',{num:1}),
  Four:A('quatre',{num:1}), Nine:A('neuf',{num:1}), Outside2:N('extérieur'), Shooting:A('de tir'), Diving:A('de plongée'),
  // ennemis / personnages (noms propres, sans article)
  Lizalfos:N('Lézalfos','m',{pl:1}), Dinolfos:P('Dinolfos'), Dinalfos:P('Dinolfos'), Stalfos:N('Stalfos','m',{pl:1}), Beamos:N('Sentinelle','f'), Armos:P('Armos'),
  Gibdo:N('Momie','f'), Gibdos:N('Momies','f',{pl:1}), Redead:N('Effroi'), Keese:N('Saigneur'), Wolfos:N('Lobo'), Octorok:P('Octorok'), Octo:P('Octo'),
  Tektite:P('Tektite'), Leever:P('Leever'), Anubis:P('Anubis'), Floormaster:N('Grossbaffe'), Slugma:N('Feu Visqueux'), Parasan:N('Tailpasaran'),
  Jigglies:N('Biri','m',{pl:1}), Larvae:P('larves'), Baba:P('Baba Mojo'), Dodongo:P('Dodongo'), Dodongos:P('Dodongos'), Knuckle:P('Hache-Viande'),
  Mido:P('Mido'), 'Mido\'s':P('Mido'), Impa:P('Impa'), Impas:P('Impa'), Dampe:P('Igor'), 'Dampe\'s':P('Igor'), Dampes:P('Igor'),
  Saria:P('Saria'), 'Saria\'s':P('Saria'), Sarias:P('Saria'), Malon:P('Malon'), Talons:P('Talon'), Anju:P('Anju'), Rauru:P('Rauru'),
  Sheik:P('Sheik'), Darunia:P('Darunia'), Darunias:P('Darunia'), Medigoron:P('Medigoron'), Biggoron:P('Biggoron'), Ganon:P('Ganon'),
  Ganons:P('Ganon'), Ganondorf:P('Ganondorf'), Link:P('Link'), 'Link\'s':P('Link'), Links:P('Link'), Zelda:P('Zelda'),
  'Zelda\'s':P('Zelda'), Zeldas:P('Zelda'), Gohma:P('Gohma'), Barinade:P('Barinade'), Morpha:P('Morpha'), Volvagia:P('Volvagia'),
  Twinrova:P('Twinrova'), Bongo:P('Bongo'), Greg:P('Greg'), Cojiro:P('Cojiro'), Granny:P('Granny'), "Granny's":P('Granny'),
  Epona:P('Epona'), "Epona's":P('Epona'), Goron:P('Goron'), Zora:P('Zora'), "Zora's":P('Zora'), Zoras:P('Zora'), Deku:P('Mojo'),
  Kokiri:P('Kokiri'), Gerudo:P('Gerudo'), Hylia:P('Hylia'), Hyrule:P('Hyrule'), Kakariko:N('village'), Kak:N('village'),
  Colossus:N('Colosse'), Jabu:P('Jabu-Jabu'), GC:N('Village Goron'), KF:N('Forêt Kokiri','f'), HC:N('Château d\'Hyrule'), SFM:N('Bosquet Sacré'),
  ToT:N('Temple du Temps'), OGC:N('Château de Ganon'), CE:P('entrée du château'), HBA:P('archerie montée'), Flare:P('Flare'), Dancer:P('Danseur'),
  Queen:P('Reine'), King:P('Roi'), Phantom:P('Spectral'), Scarecrow:N('épouvantail'), GS:N('Skulltula','f'), End:N('fin','f'), Skull:P('Skull'), Poe2:P('Esprit'),
  // adjectifs
  Big:A('grand',{pre:1}), Small:A('petit',{pre:1}), Great:A('grand',{pre:1}), Giant:A('géant'), Mini:A('mini'), Hidden:A('caché'), Invisible:A('invisible'),
  Visible:A('visible'), Secret:A('secret'), Fake:A('faux'), Cracked:A('fissuré'), Bombable:A('à bombarder'), Open:A('ouvert'),
  Blocked:A('bloqué'), Raised:A('surélevé'), Falling:A('qui tombe'), Rolling:A('roulant'), Spinning:A('rotatif'), Sliding:A('glissant'),
  Frozen:A('gelé'), Submerged:A('immergé'), Underwater:A('sous l\'eau'), Heavy:A('lourd'), Double:A('double'), Triple:A('triple'),
  Single:A('seul'), Dead:A('mort'), Steep:A('raide'), Rocky:A('rocheux'), Long:A('long'), Red:A('rouge'), Blue:A('bleu'),
  Green:A('vert'), Gold:A('d\'or'), Golden:A('d\'or'), Silver:A('d\'argent'), Iron:A('de fer'), Magic:A('magique'), Royal:A('royal'),
  Final:A('final'), Early:A('du début'), Central:A('central'), Distant:A('éloigné'), Outer:A('extérieur'), Inner:A('intérieur'),
  Northern:A('du nord'), Southern:A('du sud'), Hover:A('des airs'), Megaton:A('des Titans'), Odd:A('suspect'), Broken:A('cassé'),
  Whispering:A('murmurant'), Lost:A('perdu'), Sacred:A('sacré'), Haunted:A('hanté'), Thawed:A('dégelé'), Freed:A('libéré'),
  Completed:A('complété'), Clear:S('(salle vidée)'), Cutscene:A('(cinématique)'), Construction2:A('en chantier'),
  // positions / qualificatifs (en fin de groupe)
  Left:A('gauche'), Right:A('droit'), Middle:S('du milieu'), Center:S('centre'), 'Center-Left':S('centre gauche'),
  'Center-Right':S('centre droit'), Upper:S('du haut'), Lower:S('du bas'), Top:S('en haut'), Bottom:S('en bas'),
  Front:S('avant'), Back:S('arrière'), Rear:S('arrière'), Side:S('latéral'), Leftmost:S('tout à gauche'), Rightmost:S('tout à droite'),
  Topmost:S('tout en haut'), Highest:S('tout en haut'), Lowest:S('tout en bas'), Northmost:S('tout au nord'), Southmost:S('tout au sud'),
  North:S('nord'), South:S('sud'), East:S('est'), West:S('ouest'), Northeast:S('nord-est'), Northwest:S('nord-ouest'),
  Southeast:S('sud-est'), Southwest:S('sud-ouest'), N:S('nord'), S:S('sud'), E:S('est'), W:S('ouest'), NE:S('nord-est'),
  NW:S('nord-ouest'), SE:S('sud-est'), SW:S('sud-ouest'), First:A('1er',{ord:1}), Second:A('2e',{ord:1}), Third:A('3e',{ord:1}), Fourth:A('4e',{ord:1}),
  Fifth:A('5e',{ord:1}), '2F':S('au 2e étage'), A:S('A'), B:S('B'), F:S('F'), High:S('en hauteur'),
};

// Expressions (groupes de mots) traduites d'un bloc, prioritaires sur le dictionnaire.
export const PHRASES = {
  'Boss Room':N('salle du boss','f'), 'Boss Key':N('clé du boss','f'), 'BK Room':N('salle de la clé du boss','f'), 'BK':N('clé du boss','f'),
  'Compass Room':N('salle de la boussole','f'), 'Map Room':N('salle de la carte','f'), 'Know It All House':N('maison des Je-Sais-Tout','f'),
  'House of Twins':N('maison des jumeaux','f'), 'Lost Woods':N('Bois Perdus','m',{pl:1}), 'Death Mountain':N('Mont du Péril'),
  'Deku Tree':N('Arbre Mojo'), 'Dodongos Cavern':N('Caverne Dodongo','f'), 'Ice Cavern':N('Caverne de Glace','f'), 'Hyrule Field':N('Plaine d\'Hyrule','f'),
  'Lake Hylia':N('Lac Hylia'), 'Gerudo Valley':N('Vallée Gerudo','f'), 'Zoras Domain':N('Domaine Zora'), 'Zora\'s Domain':N('Domaine Zora'),
  'Zoras River':N('Rivière Zora','f'), 'Lon Lon':P('Lon Lon'), 'Temple of Time':N('Temple du Temps'), 'Song of Storms':P('Chant des Tempêtes'),
  'Song of Time':P('Chant du Temps'), 'Sun\'s Song':P('Chant du Soleil'), 'Zelda\'s Lullaby':P('Berceuse de Zelda'), 'Dark Link':P('Link Noir'),
  'Iron Knuckle':P('Hache-Viande'), 'Like Like':N('Like-Like'), 'Like Likes':N('Like-Like','m',{pl:1}), 'Flare Dancer':N('Danse-flamme'),
  'Big Octo':N('Bigocto'), 'Fire Keese':N('Saigneur ardent'), 'Dead Hand':N('Poignant'), 'Great Fairy':N('Grande Fée','f'),
  'Gossip Stone':N('pierre à potins','f'), 'Bean Patch':N('carré de terre','m'), 'Bomb Flower':N('fleur-bombe','f'),
  'Bomb Flowers':N('fleurs-bombes','f',{pl:1}), 'Silver Rupees':N('rubis d\'argent','m',{pl:1}), 'Silver Rupee':N('rubis d\'argent','m'),
  'Eye Switch':N('interrupteur-œil'), 'Crystal Switch':N('interrupteur de cristal'), 'Floor Switch':N('interrupteur au sol'),
  'Water Switch':N('interrupteur de niveau d\'eau'), 'Sun Block':N('bloc du soleil'), 'Push Block':N('bloc à pousser'),
  'Block Push':N('bloc à pousser'), 'Heart Piece':N('quart de cœur'), 'Gold Skulltula':N('Skulltula d\'or','f'),
  'Shooting Gallery':N('stand de tir'), 'Bombchu Bowling':N('Bowling Teigneux'), 'Bombchu Shop':N('boutique de missiles','f'),
  'Treasure Chest Game':N('chasse au trésor','f'), 'Chest Game':N('chasse au trésor','f'), 'Potion Shop':N('apothicaire'),
  'Mask Shop':N('foire aux masques','f'), 'Back Alley':N('ruelle','f'), 'Guard House':N('poste de garde'), 'Archery Range':N('stand de tir à l\'arc'),
  'Mini Boss':N('mini-boss'), 'Rolling Goron':P('Goron roulant'), 'Lab':N('Laboratoire du Lac'), 'Spinning Log':N('tronc rotatif'),
  'Wind Hint':N('indice du vent'), 'Fire Wall Maze':N('labyrinthe des murs de feu'), 'Four Armos':P('quatre Armos'),
  'Main Room':N('salle principale','f'), 'Front Room':N('salle avant','f'), 'Back Room':N('salle arrière','f'), 'Side Room':N('salle latérale','f'),
  'Upper Water':N('niveau d\'eau haut'), 'Invisible Enemies':N('ennemis invisibles','m',{pl:1}), 'Child Climb':N('escalade de l\'enfant','f'),
  'Adult Climb':N('escalade de l\'adulte','f'), 'Statue Room':N('salle de la statue','f'), 'Sun Block Room':N('salle du bloc du soleil','f'),
  'Big Lava Room':N('grande salle de lave','f'), 'Hammer Room':N('salle de la masse','f'), 'Torch Puzzle Room':N('salle de l\'énigme des torches','f'),
  'Larvae Room':N('salle des larves','f'), 'Leever Room':N('salle des Leevers','f'), 'Beamos Room':N('salle de la Sentinelle','f'),
  'Stalfos Room':N('salle des Stalfos','f'), 'Boomerang Room':N('salle du boomerang','f'), 'Slingshot Room':N('salle du lance-pierre','f'),
  'Falling Ceiling Room':N('salle au plafond qui tombe','f'), 'Falling Like Like Room':N('salle du Like-Like qui tombe','f'),
  'Spike Walls':N('murs à pics','m',{pl:1}), 'Falling Spikes':N('pics qui tombent','m',{pl:1}), 'Invisible Spikes':N('pics invisibles','m',{pl:1}),
  'Invisible Blades':N('lames invisibles','f',{pl:1}), 'Boulder Maze':N('labyrinthe des rochers'), 'Lizalfos Maze':N('labyrinthe des Lézalfos'),
  'Heavy Block':N('bloc lourd'), 'Eye Statue':N('statue à l\'œil','f'), 'Hidden Ceiling':N('plafond caché'),
  'Maze Path':N('chemin du labyrinthe'), 'Maze Right':N('côté droit du labyrinthe'), 'Raised Island Courtyard':N('cour de l\'île surélevée','f'),
  'Silver Block Hallway':N('couloir du bloc d\'argent'), 'Mirror Puzzle':N('énigme des miroirs','f'), 'Near Ship':N('près du bateau'),
  'Sun\'s':P('Soleil'), 'Early Torches':N('premières torches','f',{pl:1}), 'Hammer Switch':N('interrupteur à masse'),
  'Chest Switch':N('interrupteur-coffre'), 'Blue Poe':N('Esprit bleu'), 'Red Poe':N('Esprit rouge'), 'Back Poe':N('Esprit du fond'),
  'Flame Circle':N('cercle de flammes'), 'Cracked Wall':N('mur fissuré'), 'Dragon':N('dragon'), 'Wolfos':N('Lobo'),
  'Rain Shelter':N('abri'), 'Gerudo Fortress':N('Forteresse Gerudo','f'), 'Thieves Hideout':N('Repaire des Voleurs'),
  'Storms Grotto':N('grotte des tempêtes','f'), 'Open Grotto':N('grotte ouverte','f'), 'Redead Grotto':N('grotte aux Effrois','f'),
  'Wolfos Grotto':N('grotte aux Lobos','f'), 'Tektite Grotto':N('grotte aux Tektites','f'), 'Cow Grotto':N('grotte à la vache','f'),
  'Scrub Grotto':N('grotte des pestes','f'), 'Fairy Grotto':N('grotte des fées','f'), 'Fountain Grotto':N('grotte de la fontaine','f'),
  'Deku Scrub Grotto':N('grotte des pestes Mojo','f'), 'Deku Theater':N('Théâtre Mojo'), 'Deku Theatre':N('Théâtre Mojo'), 'Near Shortcuts Grotto':N('grotte près des raccourcis','f'),
  'Near Market Grotto':N('grotte près du bourg','f'), 'Southeast Grotto':N('grotte sud-est','f'), 'Upper Grotto':N('grotte du haut','f'),
  'Windmill':N('moulin'), 'Water Trial':N('épreuve de l\'eau','f'), 'Forest Trial':N('épreuve de la forêt','f'),
  'Fire Trial':N('épreuve du feu','f'), 'Light Trial':N('épreuve de la lumière','f'), 'Shadow Trial':N('épreuve de l\'ombre','f'),
  'Spirit Trial':N('épreuve de l\'esprit','f'), 'Golden Gauntlets':N('gantelets d\'or','m',{pl:1}), 'Silver Gauntlets':N('gantelets d\'argent','m',{pl:1}),
  'Mirror Shield':N('bouclier miroir'), 'Hover Boots':N('Bottes des Airs','f',{pl:1}), 'Iron Boots':N('Bottes de Plomb','f',{pl:1}),
  'Megaton Hammer':N('masse des Titans','f'), 'Bomb Bag':N('sac de bombes'), 'Lens of Truth':N('monocle de Vérité'),
  'Ice Arrows':N('flèches de glace','f',{pl:1}), 'Magic Bean':N('haricot magique'), 'Double Cell':N('double cellule','f'),
  'Dead End':N('cul-de-sac'), 'Steep Slope':N('pente raide','f'), 'Torch Cell':N('cellule à la torche','f'), 'Kitchen':N('cuisine','f'),
  'Break Room':N('salle de repos','f'), 'GS House':N('maison des Araignées','f'), 'Skulltula House':N('maison des Araignées','f'),
  'Impas House':N('maison d\'Impa','f'), 'Back Alley House':N('maison de la ruelle','f'), 'Mido\'s House':N('maison de Mido','f'),
  'Links House':N('maison de Link','f'), 'Saria\'s House':N('maison de Saria','f'), 'Know It All':N('Je-Sais-Tout'),
  'Carpenter\'s Tent':N('tente des charpentiers','f'), 'Great Fairy Fountain':N('fontaine de la Grande Fée','f'),
  'Fairy Fountain':N('fontaine des fées','f'), 'King Zora':P('Roi Zora'), 'Jabu Jabu':P('Jabu-Jabu'), 'Queen Gohma':P('Reine Gohma'),
  'King Dodongo':P('Roi Dodongo'), 'Phantom Ganon':P('Ganon Spectral'), 'Bongo Bongo':P('Bongo Bongo'),
  'Near Bridge':N('près du pont'), 'Near Theater':N('près du théâtre'), 'Near Theatre':N('près du théâtre'),
  'Dampe\'s Hut':N('cabane d\'Igor','f'), 'Dampes Hut':N('cabane d\'Igor','f'), 'Royal Family\'s Tomb':N('tombe royale','f'),
  'Deku Scrub':N('peste Mojo','f'), 'Deku Baba':P('Baba Mojo'), 'Big Poe':N('Esprit'), 'Big Poes':N('Esprits','m',{pl:1}),
  'Gerudo Training Ground':N('Gymnase Gerudo'), 'Bottom of the Well':N('Fond du Puits'), 'Spirit Temple':N('Temple de l\'Esprit'),
  'Forest Temple':N('Temple de la Forêt'), 'Fire Temple':N('Temple du Feu'), 'Water Temple':N('Temple de l\'Eau'),
  'Shadow Temple':N('Temple de l\'Ombre'), 'Ganon\'s Castle':N('Château de Ganon'), 'Ganons Castle':N('Château de Ganon'),
  'Desert Colossus':N('Colosse du Désert'), 'Haunted Wasteland':N('Désert Hanté'), 'Death Mountain Crater':N('Cratère du Péril'),
  'Death Mountain Trail':N('Chemin du Péril'), 'Goron City':N('Village Goron'), 'Hyrule Castle':N('Château d\'Hyrule'),
  'Sacred Forest Meadow':N('Bosquet Sacré'), 'Kokiri Forest':N('Forêt Kokiri','f'), 'Lon Lon Ranch':N('Ranch Lon Lon'),
  'Zoras Fountain':N('Fontaine Zora','f'), 'Zora\'s Fountain':N('Fontaine Zora','f'), 'Market Entrance':N('entrée du bourg','f'),
  'Castle Courtyard':N('cour du château','f'), '1 Torch Cell':N('cellule à 1 torche','f'), '2 Torches Cell':N('cellule à 2 torches','f'),
  'Triple Torch Room':N('salle aux trois torches','f'), 'Two Flames':N('deux flammes','f',{pl:1}), 'Two Octorok':N('deux Octoroks','m',{pl:1}),
  'Lon Lon':N('Ranch Lon Lon'), 'Nine Thrones Room':N('salle des neuf trônes','f'), 'Spike Roller':N('rouleau à pics'),
  'Spike Baricade':N('barricade à pics','f'), 'Main Level 1':N('niveau principal 1'), 'Main Level 2':N('niveau principal 2'),
  'Rain Shed':N('abri contre la pluie'), 'Green Poe':N('Esprit vert'), 'Purple Poe':N('Esprit violet'), 'Temple':N('temple'), 'Beneath Domain':N('sous le domaine'),
  'Horseback Archery Range':N('stand d\'archerie montée'), 'Horseback Archery':N('archerie montée','f'),
  'Boarding House':N('maison du Chef des Charpentiers','f'), 'Freestanding PoH':N('quart de cœur'), 'Freestanding Key':N('petite clé','f'),
  'Lift Room':N('salle de l\'ascenseur','f'), 'Truth Spinner':N('tourniquet de vérité'), 'Fire Wall Chase':N('poursuite du mur de feu','f'),
  'The Log':N('tronc'), 'Medicine Shop':N('apothicaire'), 'Song of Time Room':N('salle du Chant du Temps','f'), 'Song of Time Block Room':N('salle du bloc du Chant du Temps','f'),
};

// Prépositions : forme -> [français, article] ; article 'de' (de la / du / de l' / des) ou 'le' (la / le / l' / les).
const PREPS = {
  Near:['près','de'], Above:['au-dessus','de'], Behind:['derrière','le'], Under:['sous','le'], Beneath:['sous','le'],
  After:['après','le'], Before:['avant','le'], In:['dans','le'], in:['dans','le'], On:['sur','le'], on:['sur','le'],
  At:['à','le'], at:['à','le'], By:['près','de'], From:['de','le'], from:['de','le'], Of:['de','le'], of:['de','le'],
  Outside:['devant','le'], Past:['après','le'], Across:['de l\'autre côté','de'], with:['avec','le'], With:['avec','le'],
  Inside:['dans','le'], Beside:['à côté','de'], Toward:['vers','le'], Towards:['vers','le'], Between:['entre','le'], Atop:['au sommet','de'],
};

const VOWEL = /^[aeiouyéèêâîôûœh]/i;
const H_ASPIRE = /^(haricot|hall|hache|hanté|haut)/i;
function article(np, kind){
  if (np.bare) return '';
  if (np.p !== undefined) return kind === 'de' ? (VOWEL.test(np.text) && !H_ASPIRE.test(np.text) ? 'd\'' : 'de ') : '';
  if (np.pl) return kind === 'de' ? 'des ' : 'les ';
  if (VOWEL.test(np.text) && !H_ASPIRE.test(np.text)) return kind === 'de' ? 'de l\'' : 'l\'';
  if (np.g === 'f') return kind === 'de' ? 'de la ' : 'la ';
  return kind === 'de' ? 'du ' : 'le ';
}
const withArt = (np, kind) => article(np, kind) + np.text;

// Accord d'un adjectif (genre / nombre) ; les locutions (espace, apostrophe) restent invariables.
const IRREG = { central:['centrale', 'centraux', 'centrales'], royal:['royale', 'royaux', 'royales'], final:['finale', 'finaux', 'finales'],
  faux:['fausse', 'faux', 'fausses'], '1er':['1re', '1ers', '1res'], 'qui tombe':['qui tombe', 'qui tombent', 'qui tombent'] };
function agree(a, g, pl){
  if (IRREG[a]) return g === 'f' ? (pl ? IRREG[a][2] : IRREG[a][0]) : (pl ? IRREG[a][1] : a);
  if (/[\s']/.test(a) || /^\d/.test(a)) return a;
  let r = a;
  if (g === 'f' && !/e$/.test(r)) r += 'e';
  if (pl && !/[sx]$/.test(r)) r += 's';
  return r;
}
const norm = tokens => tokens.map(x => x.replace(/~/g, ' ')).join(' ');
function lookup(tokens, len, i){ // entrée pour tokens[i-len..i)
  const key = norm(tokens.slice(i - len, i));
  return PHRASES[key] || (len === 1 ? W[key] : null);
}
const isQual = w => W[w] && (W[w].s !== undefined || W[w].a !== undefined);

// Groupe nominal (sans préposition) -> { text, g, pl, p?, bare? }
function nounPhrase(tokens){
  tokens = tokens.slice();
  const suffix = [], adjs = [], pre = [], comps = [];
  while (tokens.length && W[tokens[tokens.length - 1]] && W[tokens[tokens.length - 1]].s !== undefined) suffix.unshift(W[tokens.pop()].s);
  if (!tokens.length) return { text:suffix.join(' '), bare:true };
  let head = null;
  for (let len = Math.min(5, tokens.length); len >= 1 && !head; len--){
    const e = lookup(tokens, len, tokens.length);
    if (e && (e.n !== undefined || e.p !== undefined)){ head = e; tokens = tokens.slice(0, -len); }
  }
  let i = tokens.length;
  while (i > 0){
    let matched = false;
    for (let len = Math.min(5, i); len >= 1; len--){
      const e = lookup(tokens, len, i);
      if (!e) continue;
      if (e.a !== undefined) (e.pre || e.ord || e.num ? pre : adjs).unshift(e);
      else if (e.s !== undefined) suffix.unshift(e.s);
      else comps.push({ text:e.n ?? e.p, g:e.g, pl:e.pl, p:e.p });
      i -= len; matched = true; break;
    }
    if (!matched){ const w = tokens[i - 1].replace(/~/g, ' '); comps.push({ text:w, p:w }); i--; }
  }
  if (!head){
    if (comps.length) head = comps.shift();
    else { const all = [...pre, ...adjs].map(e => e.a).join(' '); return { text:[all, ...suffix].filter(Boolean).join(' '), bare:true }; }
  }
  const g = head.g || 'm', pl = !!head.pl;
  let text = head.n ?? head.p ?? head.text;
  if (pre.length) text = pre.map(e => e.num ? e.a : agree(e.a, g, pl)).join(' ') + ' ' + text;
  if (adjs.length) text += ' ' + adjs.map(e => agree(e.a, g, pl)).join(' ');
  for (const c of comps) text += ' ' + withArt(c, 'de');
  if (suffix.length) text += ' ' + suffix.join(' ');
  return { text, g, pl, p:head.p };
}

// Expressions contenant une préposition, protégées avant le découpage.
const PROTECT = ['Song of Time', 'Song of Storms', 'Bottom of the Well', 'Temple of Time', 'Lens of Truth', 'House of Twins',
  'Mask of Truth', 'Ocarina of Time'];
export function describe(desc){
  for (const p of PROTECT) desc = desc.split(p).join(p.replace(/ /g, '~'));
  const toks = desc.split(/\s+/).filter(Boolean);
  const out = []; let cur = []; let prep = null;
  const flush = () => {
    if (!cur.length && !prep) return;
    const np = cur.length ? nounPhrase(cur) : null;
    if (prep){ const [fr, art] = PREPS[prep]; out.push(np ? `${fr} ${withArt(np, art)}` : fr); }
    else if (np) out.push(withArt(np, 'de'));
    cur = []; prep = null;
  };
  for (const t of toks){
    if (PREPS[t] && !(t === 'Of' && !cur.length)){ flush(); prep = t; }
    else cur.push(t);
  }
  flush();
  return out.join(' ')
    .replace(/\bde le\b/g, 'du').replace(/\bde les\b/g, 'des').replace(/\bà le\b/g, 'au').replace(/\bà les\b/g, 'aux')
    .replace(/\s+/g, ' ').trim();
}

const SONGS = { 'Song of Storms':'Chant des Tempêtes', "Sun's Song":'Chant du Soleil', 'Song of Time':'Chant du Temps',
  "Zelda's Lullaby":'Berceuse de Zelda', "Saria's Song":'Chant de Saria', "Epona's Song":"Chant d'Epona" };
const HEAD_G = { 'Coffre':'m', 'Jarre':'f', 'Caisse':'f', 'Petite caisse':'f', 'Herbe':'f', 'Cœur':'m', 'Rubis':'m', 'Rubis rouge':'m',
  'Rubis bleu':'m', 'Rubis vert':'m', 'Quart de cœur':'m', 'Fée':'f', 'Grande fée':'f', 'Vache':'f', 'Ruche':'f', 'Arbre':'m',
  'Buisson':'m', 'Poisson':'m', 'Loche':'f', 'Petite clé':'f', 'Clé':'f', 'Objet':'m', 'Skulltula':'f', 'Peste Mojo':'f',
  'Réceptacle de cœur':'m', 'Flèches':'f', 'Graines':'f', 'Bombes':'f', 'Noix Mojo':'f', 'Magie':'f', 'Échange':'m' };
const TYPE_HEAD = { POT:'Jarre', GRASS:'Herbe', CRATE:'Caisse', SMALL_CRATE:'Petite caisse', NLCRATE:'Caisse', TREE:'Arbre', NLTREE:'Arbre',
  BUSH:'Buisson', SKULL_TOKEN:'Skulltula', FOUNTAIN_FAIRY:'Fée', STONE_FAIRY:'Fée', BEAN_FAIRY:'Fée', SONG_FAIRY:'Fée', FISH:'Poisson',
  BEEHIVE:'Ruche', COW:'Vache', SCRUB:'Peste Mojo', SHOP:'Objet' };

function findHead(str, type){
  for (const [en, fr, pos] of HEADS){
    // objets en tête (« GS … », « Deku Scrub … », « Trade … ») : seulement pour leurs types, pas « Deku Scrub Grotto Beehive »
    if (pos === 'start' && !['SKULL_TOKEN', 'SCRUB', 'ADULT_TRADE', 'STANDARD', 'BOSS_HEART_OR_OTHER_REWARD', 'TREE', 'NLTREE'].includes(type)) continue;
    if (pos === 'start' && (str === en || str.startsWith(en + ' '))) return { head:fr, rest:str.slice(en.length).trim(), pos:'start' };
    if (pos !== 'start' && (str === en || str.endsWith(' ' + en))) return { head:fr, rest:str.slice(0, str.length - en.length).trim(), pos:'end' };
  }
  return null;
}

// Libellé FR complet d'un check
export function translate(short, type){
  let s = short.replace(/^MQ /, '').trim();
  if (FULL[s]) return FULL[s];
  let age = '';
  s = s.replace(/\b(Child|Adult)\b/g, m => { age = m === 'Child' ? 'enfant' : 'adulte'; return ''; }).replace(/\s+/g, ' ').trim();
  let song = '';
  if (/FAIRY/.test(type)) for (const [en, fr] of Object.entries(SONGS)) if (s.includes(en)){ song = fr; s = s.replace(en, '').replace(/\s+/g, ' ').trim(); }
  const big = /\bBig Fairy\b/.test(s);
  let num = '';
  const m = s.match(/^(.*?)\s*(\d+)$/); if (m){ s = m[1]; num = m[2]; }

  // Objet en tête ; les qualificatifs placés juste avant (ou après) lui le qualifient (« … Left Chest » -> « Coffre gauche … »)
  const tokens = s.split(' ').filter(Boolean);
  const trailing = [];
  let found = findHead(tokens.join(' '), type);
  while (!found && tokens.length > 1 && isQual(tokens[tokens.length - 1])){ trailing.unshift(tokens.pop()); found = findHead(tokens.join(' '), type); }
  let head, rest;
  if (found){
    head = found.head; rest = found.rest;
    // qualificatifs en fin de lieu (« … Right ») : ils qualifient l'objet, qu'il soit en tête ou en fin de nom
    const r = rest.split(' ').filter(Boolean);
    while (r.length && isQual(r[r.length - 1])) trailing.unshift(r.pop());
    rest = r.join(' ');
  } else if (TYPE_HEAD[type]){ head = TYPE_HEAD[type]; rest = tokens.join(' '); }
  else { head = ''; rest = s; trailing.length = 0; }
  if (big && head === 'Fée') head = 'Grande fée';
  const g = HEAD_G[head] || 'm';
  const ords = [], quals = [];
  for (const w of trailing){ const e = W[w]; if (e.ord) ords.push(agree(e.a, g, false)); else quals.push(e.s !== undefined ? e.s : agree(e.a, g, false)); }

  let text = head;
  if (ords.length && head) text = `${ords.join(' ')} ${head[0].toLowerCase()}${head.slice(1)}`;
  if (song) text += ` (${song})`;
  if (num) text += ' ' + num;
  if (quals.length) text += ' ' + quals.join(' ');
  if (rest){ const d = describe(rest); text += ' ' + (head ? d : d.replace(/^(du|de la|de l'|des|de|d') ?/, '')); }
  if (age) text += ` (${age})`;
  text = text.replace(/\s+/g, ' ').trim();
  return text ? text[0].toUpperCase() + text.slice(1) : short;
}
