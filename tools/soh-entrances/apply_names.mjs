// Renomme les sorties de areas-data.js d'après le tracker d'entrées de Ship of Harkinian (9.2.3, commit cb71e22,
// randomizer_entrance_tracker.cpp) : libellé français + nom SoH exact (champ `soh`, affiché au survol).
// Usage : node apply_names.mjs   (réécrit ../../data/areas-data.js ; la table ci-dessous est la source de vérité)
import fs from 'fs';

// Nom de départ SoH (source name) de chaque entrée, et sa traduction.
// Les zones étant affichées à part, les préfixes de zone de SoH (KF, Kak, GY, LH…) ne sont pas repris en français.
const SOH = {
  0:['Child Spawn', 'Apparition enfant'], 1:['Adult Spawn', 'Apparition adulte'],
  2:['Minuet of Forest', 'Menuet des Bois'], 3:['Bolero of Fire', 'Boléro du Feu'], 4:['Serenade of Water', 'Sérénade de l\'Eau'],
  5:['Requiem of Spirit', 'Requiem des Esprits'], 6:['Nocturne of Shadow', 'Nocturne de l\'Ombre'], 7:['Prelude of Light', 'Prélude de la Lumière'],
  8:['DMT Owl Flight', 'Vol du hibou'], 9:['LH Owl Flight', 'Vol du hibou'],
  // Forêt Kokiri
  10:['Kokiri Forest Lower Exit', 'Sortie basse'], 11:['Kokiri Forest Upper Exit', 'Sortie haute'],
  12:['KF Link\'s House Entry', 'Entrée de la maison de Link'], 13:['KF Mido\'s House Entry', 'Entrée de la maison de Mido'],
  14:['KF Saria\'s House Entry', 'Entrée de la maison de Saria'], 15:['KF House of Twins Entry', 'Entrée de la maison des jumeaux'],
  16:['KF Know-It-All House Entry', 'Entrée de la maison des Je-Sais-Tout'], 17:['KF Shop Entry', 'Entrée de la boutique'],
  18:['KF Storms Grotto Entry', 'Entrée de la grotte des tempêtes'], 19:['KF Outside Deku Tree', 'Devant l\'Arbre Mojo'],
  20:['Link\'s House', 'Maison de Link'], 21:['Mido\'s House', 'Maison de Mido'], 22:['Saria\'s House', 'Maison de Saria'],
  23:['House of Twins', 'Maison des jumeaux'], 24:['Know-It-All House', 'Maison des Je-Sais-Tout'], 25:['Kokiri Shop', 'Boutique Kokiri'],
  26:['KF Storms Grotto', 'Grotte des tempêtes'], 27:['Deku Tree Entrance', 'Entrée de l\'Arbre Mojo'],
  28:['Deku Tree Boss Door', 'Porte du boss'], 29:['Gohma', 'Reine Gohma'],
  // Bois Perdus
  31:['Lost Woods Bridge East Exit', 'Sortie est du pont'], 32:['Lost Woods Bridge West Exit', 'Sortie ouest du pont'],
  33:['Lost Woods South Exit', 'Sortie sud'], 34:['Lost Woods Tunnel Shortcut', 'Raccourci du tunnel'],
  35:['Lost Woods Underwater Shortcut', 'Raccourci sous-marin'], 36:['Lost Woods North Exit', 'Sortie nord'],
  37:['LW Tunnel Grotto Entry', 'Entrée de la grotte du tunnel'], 38:['LW North Grotto Entry', 'Entrée de la grotte nord'],
  39:['LW Meadow Grotto Entry', 'Entrée de la grotte du bosquet'], 40:['LW Tunnel Grotto', 'Grotte du tunnel'],
  41:['LW Deku Scrub Grotto', 'Grotte des pestes Mojo'], 42:['Deku Theater', 'Théâtre Mojo'],
  // Bosquet Sacré
  43:['Sacred Forest Meadow South Exit', 'Sortie sud'], 44:['SFM Wolfos Grotto Entry', 'Entrée de la grotte aux Lobos'],
  45:['SFM Fairy Grotto Entry', 'Entrée de la grotte des fées'], 46:['SFM Storms Grotto Entry', 'Entrée de la grotte des tempêtes'],
  47:['Sacred Forest Meadow Outside Forest Temple', 'Devant le Temple de la Forêt'], 48:['SFM Wolfos Grotto', 'Grotte aux Lobos'],
  49:['SFM Fairy Grotto', 'Grotte des fées'], 50:['SFM Deku Scrub Grotto', 'Grotte des pestes Mojo'],
  51:['Forest Temple Entrance', 'Entrée du Temple de la Forêt'], 52:['Forest Temple Boss Door', 'Porte du boss'], 53:['Phantom Ganon', 'Ganon Spectral'],
  // Village Cocorico
  55:['Kakariko Front Gate', 'Porte principale'], 56:['Kakariko Southeast Exit', 'Sortie sud-est'],
  57:['Kakariko Guard Gate Exit', 'Porte du garde'], 58:['Kak Boss House Entry', 'Entrée de la maison du Chef des Charpentiers'],
  59:['Kak Skulltula House Entry', 'Entrée de la maison des Araignées'], 60:['Kak Impa\'s House Front Entry', 'Entrée avant de la maison d\'Impa'],
  61:['Kak Impa\'s House Back Entry', 'Entrée arrière de la maison d\'Impa'], 62:['Kak Windmill Entry', 'Entrée du moulin'],
  63:['Kak Shooting Gallery Entry', 'Entrée du stand de tir'], 64:['Kak Granny\'s Potion Shop Entry', 'Entrée de l\'apothicaire de Granny'],
  65:['Kak Bazaar Entry', 'Entrée du bazar'], 66:['Kak Potion Shop Front Entry', 'Entrée avant de l\'apothicaire'],
  67:['Kak Potion Shop Back Entry', 'Entrée arrière de l\'apothicaire'], 68:['Kak Open Grotto Entry', 'Entrée de la grotte ouverte'],
  69:['Kak Center Grotto Entry', 'Entrée de la grotte centrale'], 70:['Kakariko Outside the Well', 'Devant le puits'],
  71:['Carpenter Boss House', 'Maison du Chef des Charpentiers'], 72:['House of Skulltula', 'Maison des Araignées'],
  73:['Impa\'s House Front', 'Maison d\'Impa, avant'], 74:['Impa\'s House Back', 'Maison d\'Impa, arrière'], 75:['Windmill', 'Moulin'],
  76:['Kak Shooting Gallery', 'Stand de tir'], 77:['Granny\'s Potion Shop', 'Apothicaire de Granny'], 78:['Kak Bazaar', 'Bazar'],
  79:['Kak Potion Shop Front', 'Apothicaire, avant'], 80:['Kak Potion Shop Back', 'Apothicaire, arrière'],
  81:['Kak Open Grotto', 'Grotte ouverte'], 82:['Kak Redead Grotto', 'Grotte aux Effrois'], 83:['Bottom of the Well Entrance', 'Entrée du Fond du Puits'],
  // Cimetière
  84:['Graveyard Entrance', 'Entrée du cimetière'], 85:['GY Dampe\'s Hut Entry', 'Entrée de la cabane d\'Igor'],
  86:['GY Near-Hut Grave Entry', 'Entrée de la tombe près de la cabane'], 87:['GY Near-Tomb Grave Entry', 'Entrée de la tombe près de la tombe royale'],
  88:['GY Royal Family\'s Tomb Entry', 'Entrée de la tombe royale'], 89:['GY Near-Ledge Grave Entry', 'Entrée de la tombe près de la corniche'],
  90:['Graveyard Outside Temple', 'Devant le temple'], 91:['Dampe\'s Hut', 'Cabane d\'Igor'], 92:['Shield Grave', 'Tombe au bouclier'],
  93:['Heart Piece Grave', 'Tombe au quart de cœur'], 94:['Royal Family\'s Tomb', 'Tombe royale'], 95:['Dampe\'s Grave', 'Tombe d\'Igor'],
  96:['Shadow Temple Entrance', 'Entrée du Temple de l\'Ombre'], 97:['Shadow Temple Boss Door', 'Porte du boss'], 98:['Bongo-Bongo', 'Bongo Bongo'],
  // Chemin du Péril
  100:['Death Mountain Trail Middle Exit', 'Sortie médiane'], 101:['Death Mountain Trail Bottom Exit', 'Sortie basse'],
  102:['Death Mountain Trail Top Exit', 'Sortie haute'], 103:['DMT Great Fairy Entry', 'Entrée de la Grande Fée'],
  104:['DMT Rock Circle Grotto Entry', 'Entrée de la grotte du cercle de pierres'], 105:['DMT Boulder Grotto Entry', 'Entrée de la grotte du rocher'],
  106:['Death Mountain Trail Outside Dodongo\'s Cavern', 'Devant la Caverne Dodongo'], 107:['DMT Great Fairy Fountain', 'Fontaine de la Grande Fée'],
  108:['DMT Storms Grotto', 'Grotte des tempêtes'], 109:['DMT Cow Grotto', 'Grotte à la vache'],
  110:['Dodongo\'s Cavern Entrance', 'Entrée de la Caverne Dodongo'], 111:['Dodongo\'s Cavern Boss Door', 'Porte du boss'], 112:['King Dodongo', 'Roi Dodongo'],
  // Cratère du Péril
  114:['Death Mountain Crater Bridge Exit', 'Sortie du pont'], 115:['Death Mountain Crater Upper Exit', 'Sortie haute'],
  116:['DMC Great Fairy Entry', 'Entrée de la Grande Fée'], 117:['DMC Upper Grotto Entry', 'Entrée de la grotte du haut'],
  118:['DMC Hammer Grotto Entry', 'Entrée de la grotte à la masse'], 119:['Death Mountain Crater Outside Temple', 'Devant le temple'],
  120:['DMC Great Fairy Fountain', 'Fontaine de la Grande Fée'], 121:['DMC Upper Grotto', 'Grotte du haut'], 122:['DMC Deku Scrub Grotto', 'Grotte des pestes Mojo'],
  123:['Fire Temple Entrance', 'Entrée du Temple du Feu'], 124:['Fire Temple Boss Door', 'Porte du boss'], 125:['Volvagia', 'Volvagia'],
  // Village Goron
  127:['Goron City Upper Exit', 'Sortie haute'], 128:['Goron City Darunia\'s Room Backdoor', 'Porte arrière de la salle de Darunia'],
  129:['Goron City Tunnel Shortcut', 'Raccourci du tunnel'], 130:['GC Shop Entry', 'Entrée de la boutique'], 131:['GC Lava Grotto Entry', 'Entrée de la grotte de lave'],
  132:['Goron Shop', 'Boutique Goron'], 133:['GC Deku Scrub Grotto', 'Grotte des pestes Mojo'],
  // Rivière Zora
  134:['Zora\'s River Lower Exit', 'Sortie basse'], 135:['Zora\'s River Underwater Shortcut', 'Raccourci sous-marin'],
  136:['Zora\'s River Waterfall Exit', 'Sortie de la cascade'], 137:['ZR Rock Circle Grotto Entry', 'Entrée de la grotte du cercle de pierres'],
  138:['ZR Raised Boulder Grotto Entry', 'Entrée de la grotte du rocher surélevé'], 139:['ZR Raised Open Grotto Entry', 'Entrée de la grotte ouverte surélevée'],
  140:['ZR Deku Scrub Grotto', 'Grotte des pestes Mojo'], 141:['ZR Fairy Grotto', 'Grotte des fées'], 142:['ZR Open Grotto', 'Grotte ouverte'],
  // Domaine Zora
  143:['Zora\'s Domain Entrance', 'Entrée du domaine'], 144:['Zora\'s Domain Underwater Shortcut', 'Raccourci sous-marin'],
  145:['Zora\'s Domain Behind King Zora', 'Derrière le Roi Zora'], 146:['ZD Shop Entry', 'Entrée de la boutique'],
  147:['ZD Island Grotto Entry', 'Entrée de la grotte de l\'île'], 148:['Zora Shop', 'Boutique Zora'], 149:['ZD Fairy Grotto', 'Grotte des fées'],
  // Fontaine Zora
  150:['Zora\'s Fountain Tunnel Exit', 'Sortie du tunnel'], 151:['ZF Great Fairy Entry', 'Entrée de la Grande Fée'],
  152:['Zora\'s Fountain Outside Jabu Jabu', 'Devant Jabu-Jabu'], 153:['Zora\'s Fountain Outside Ice Cavern', 'Devant la Caverne de Glace'],
  154:['ZF Great Fairy Fountain', 'Fontaine de la Grande Fée'], 155:['Jabu Jabu\'s Belly Entrance', 'Entrée du Ventre de Jabu-Jabu'],
  156:['Jabu Jabu\'s Belly Boss Door', 'Porte du boss'], 157:['Barinade', 'Barinade'], 159:['Ice Cavern Entrance', 'Entrée de la Caverne de Glace'],
  // Plaine d'Hyrule
  160:['Hyrule Field Wooded Exit', 'Sortie boisée'], 161:['Hyrule Field Drawbridge Exit', 'Sortie du pont-levis'],
  162:['Hyrule Field Center Exit', 'Sortie centrale'], 163:['Hyrule Field Stairs Exit', 'Sortie de l\'escalier'],
  164:['Hyrule Field River Exit', 'Sortie de la rivière'], 165:['Hyrule Field Fence Exit', 'Sortie de la clôture'],
  166:['Hyrule Field Rocky Path', 'Chemin rocheux'], 167:['HF Near Market Boulder Grotto Entry', 'Entrée de la grotte du rocher près du bourg'],
  168:['HF Stone Bridge Tree Grotto Entry', 'Entrée de la grotte de l\'arbre du pont de pierre'],
  169:['HF Northwest Tree Grotto Entry', 'Entrée de la grotte de l\'arbre nord-ouest'], 170:['HF Northwest Boulder Grotto Entry', 'Entrée de la grotte du rocher nord-ouest'],
  171:['HF West Rock Circle Grotto Entry', 'Entrée de la grotte du cercle de pierres ouest'], 172:['HF South Open Grotto Entry', 'Entrée de la grotte ouverte sud'],
  173:['HF Fenced Grotto Entry', 'Entrée de la grotte clôturée'], 174:['HF Southeast Boulder Grotto Entry', 'Entrée de la grotte du rocher sud-est'],
  175:['HF Near Market Boulder Grotto', 'Grotte du rocher près du bourg'], 176:['HF Stone Bridge Tree Grotto', 'Grotte de l\'arbre du pont de pierre'],
  177:['HF Tektite Grotto', 'Grotte aux Tektites'], 178:['HF Fairy Grotto', 'Grotte des fées'], 179:['HF Cow Grotto', 'Grotte à la vache'],
  180:['HF Open Grotto', 'Grotte ouverte'], 181:['HF Fenced Deku Scrub Grotto', 'Grotte clôturée des pestes Mojo'], 182:['HF Southeast Grotto', 'Grotte sud-est'],
  // Ranch Lon Lon
  183:['Lon Lon Ranch Entrance', 'Entrée du ranch'], 184:['LLR Talon\'s House Entry', 'Entrée de la maison de Talon'],
  185:['LLR Stables Entry', 'Entrée des écuries'], 186:['LLR Tower Entry', 'Entrée du silo'], 187:['LLR Grotto Entry', 'Entrée de la grotte'],
  188:['Talon\'s House', 'Maison de Talon'], 189:['LLR Stables', 'Écuries'], 190:['LLR Tower', 'Silo'], 191:['LLR Deku Scrub Grotto', 'Grotte des pestes Mojo'],
  // Lac Hylia
  192:['Lake Hylia North Exit', 'Sortie nord'], 193:['Lake Hylia Underwater Shortcut', 'Raccourci sous-marin'],
  194:['LH Lab Entry', 'Entrée du Laboratoire du Lac'], 195:['LH Fishing Pond Entry', 'Entrée du stand de pêche'],
  196:['LH Grave Grotto Entry', 'Entrée de la grotte de la tombe'], 197:['Lake Hylia Outside Temple', 'Devant le temple'],
  198:['LH Lab', 'Laboratoire du Lac'], 199:['Fishing Pond', 'Stand de pêche'], 200:['LH Deku Scrub Grotto', 'Grotte des pestes Mojo'],
  201:['Water Temple Entrance', 'Entrée du Temple de l\'Eau'], 202:['Water Temple Boss Door', 'Porte du boss'], 203:['Morpha', 'Morpha'],
  // Vallée Gerudo
  205:['Gerudo Valley East Exit', 'Sortie est'], 206:['Gerudo Valley West Exit', 'Sortie ouest'], 207:['Gerudo Valley River Exit', 'Sortie de la rivière'],
  208:['GV Carpenters\' Tent Entry', 'Entrée de la tente des charpentiers'], 209:['GV Silver Rock Grotto Entry', 'Entrée de la grotte du rocher argenté'],
  210:['GV Behind Tent Grotto Entry', 'Entrée de la grotte derrière la tente'], 211:['Carpenters\' Tent', 'Tente des charpentiers'],
  212:['GV Octorok Grotto', 'Grotte aux Octoroks'], 213:['GV Deku Scrub Grotto', 'Grotte des pestes Mojo'],
  // Forteresse Gerudo et Repaire des Voleurs
  214:['Gerudo Fortress East Exit', 'Sortie est'], 215:['Gerudo Fortress Gate Exit', 'Porte du désert'],
  216:['GF Storms Grotto Entry', 'Entrée de la grotte des tempêtes'], 217:['GF Outside Training Ground', 'Devant le Gymnase Gerudo'],
  218:['GF Fairy Grotto', 'Grotte des fées'], 219:['Gerudo Training Ground Entrance', 'Entrée du Gymnase Gerudo'],
  220:['TH 1 Torch Cell Turn', 'Repaire : cellule à 1 torche, virage'], 221:['TH 1 Torch Cell', 'Repaire : cellule à 1 torche'],
  222:['TH Kitchen Corridor Lower', 'Repaire : couloir de la cuisine, bas'], 223:['TH Kitchen Corridor Upper', 'Repaire : couloir de la cuisine, haut'],
  224:['TH Steep Slope Cell', 'Repaire : cellule de la pente raide'], 225:['TH Steep Slope Cell Two Ramps', 'Repaire : cellule de la pente raide, deux rampes'],
  226:['TH Double Cell Lower', 'Repaire : double cellule, bas'], 227:['TH Double Cell Upper', 'Repaire : double cellule, haut'],
  228:['TH Kitchen By Corridor', 'Repaire : cuisine, côté couloir'], 229:['TH Kitchen Opposite Corridor', 'Repaire : cuisine, face au couloir'],
  230:['TH Break Room', 'Repaire : salle de repos'], 231:['TH Break Room Corridor', 'Repaire : couloir de la salle de repos'],
  232:['TH Dead End Cell', 'Repaire : cellule du cul-de-sac'],
  233:['GF Outskirts', 'Abords de la forteresse'], 234:['GF Near Grotto East', 'Près de la grotte, est'], 235:['GF Near Grotto North', 'Près de la grotte, nord'],
  236:['GF Above GTG', 'Au-dessus du gymnase'], 237:['GF Near Grotto', 'Près de la grotte'], 238:['GF Bottom of Lower Vines', 'Au pied des lianes basses'],
  239:['GF Above GTG Directly', 'Juste au-dessus du gymnase'], 240:['GF Top of Lower Vines Across', 'En haut des lianes basses, en face'],
  241:['GF Top of Lower Vines Near', 'En haut des lianes basses, à côté'], 242:['GF Near GS', 'Près de la Skulltula'],
  243:['GF Below Chest', 'Sous le coffre'], 244:['GF Above Jail', 'Au-dessus de la prison'], 245:['GF Below GS', 'Sous la Skulltula'],
  // Désert Hanté, Colosse
  246:['Haunted Wasteland East Exit', 'Sortie est'], 247:['Haunted Wasteland West Exit', 'Sortie ouest'],
  248:['Desert Colossus East Exit', 'Sortie est'], 249:['Colossus Great Fairy Entry', 'Entrée de la Grande Fée'],
  250:['Colossus Grotto Entry', 'Entrée de la grotte'], 251:['Colossus Outside Temple', 'Devant le temple'],
  252:['Colossus Great Fairy Fountain', 'Fontaine de la Grande Fée'], 253:['Colossus Deku Scrub Grotto', 'Grotte des pestes Mojo'],
  254:['Spirit Temple Entrance', 'Entrée du Temple de l\'Esprit'], 255:['Spirit Temple Boss Door', 'Porte du boss'], 256:['Twinrova', 'Twinrova'],
  // Bourg, Temple du Temps, château
  258:['Market Entrance South Exit', 'Entrée du bourg, sortie sud'], 259:['Market Entrance North Exit', 'Entrée du bourg, sortie nord'],
  260:['MK Entrance Guard House Entry', 'Entrée du poste de garde'], 261:['Market South Exit', 'Place du marché, sortie sud'],
  262:['Market Castle Exit', 'Sortie vers le château'], 263:['Market Temple Exit', 'Sortie vers le temple'],
  264:['MK Shooting Gallery Entry', 'Entrée du stand de tir'], 265:['MK Bombchu Bowling Entry', 'Entrée du Bowling Teigneux'],
  266:['MK Treasure Chest Game Entry', 'Entrée de la chasse au trésor'], 267:['MK Man-in-Green House Entry', 'Entrée de la maison de l\'homme en vert'],
  268:['MK Mask Shop Entry', 'Entrée de la foire aux masques'], 269:['MK Bazaar Entry', 'Entrée du bazar'], 270:['MK Potion Shop Entry', 'Entrée de l\'apothicaire'],
  271:['MK Bombchu Shop Entry', 'Entrée de la boutique de missiles'], 272:['Guard House', 'Poste de garde'], 273:['MK Shooting Gallery', 'Stand de tir'],
  274:['Bombchu Bowling', 'Bowling Teigneux'], 275:['Treasure Chest Game', 'Chasse au trésor'], 276:['Man-in-Green\'s House', 'Maison de l\'homme en vert'],
  277:['Mask Shop', 'Foire aux masques'], 278:['MK Bazaar', 'Bazar'], 279:['MK Potion Shop', 'Apothicaire'], 280:['Bombchu Shop', 'Boutique de missiles'],
  281:['ToT Courtyard Gossip Stones Exit', 'Parvis du temple, sortie des pierres à potins'], 282:['ToT Courtyard Temple Entry', 'Parvis, entrée du temple'],
  283:['Temple of Time Entrance', 'Entrée du Temple du Temps'], 284:['Castle Grounds South Exit', 'Abords du château, sortie sud'],
  285:['HC Boulder Crawlspace', 'Passage sous le rocher'], 286:['HC Storms Grotto Entry', 'Entrée de la grotte des tempêtes'],
  287:['HC Great Fairy Fountain', 'Fontaine de la Grande Fée (Château d\'Hyrule)'], 288:['HC Storms Grotto', 'Grotte des tempêtes'],
  289:['OGC Behind Pillar', 'Derrière le pilier'], 290:['OGC Rainbow Bridge Exit', 'Pont arc-en-ciel'],
  291:['OGC Great Fairy Fountain', 'Fontaine de la Grande Fée (Château de Ganon)'], 292:['Inside Ganon\'s Castle Entrance', 'Entrée du Château de Ganon'],
  293:['Ganon\'s Tower Entrance', 'Entrée de la Tour de Ganon'], 294:['Inside Ganon\'s Castle', 'Intérieur du Château de Ganon'],
};
// Destinations sans entrée de départ propre (arrivées seules) : nom de destination SoH.
const DEST = {
  pad_tot:['Temple of Time Warp Pad', 'Plateforme de téléportation'], pad_sfm:['SFM Warp Pad', 'Plateforme de téléportation'],
  pad_dmc:['DMC Warp Pad', 'Plateforme de téléportation'], pad_lh:['Lake Hylia Warp Pad', 'Plateforme de téléportation'],
  pad_gy:['Graveyard Warp Pad', 'Plateforme de téléportation'], pad_colossus:['Desert Colossus Warp Pad', 'Plateforme de téléportation'],
  lh_river:['Lake Hylia River Exit', 'Arrivée de la rivière'],
  kak_roof:['Kakariko Village Owl Drop', 'Toit de la maison d\'Impa'],   // atterrissage du hibou du Chemin du Péril
};

// Nos sorties -> entrée SoH (index dans entranceData, ou clé de DEST).
const MAP = {
  'spawns::spawn_child':0, 'spawns::spawn_adult':1, 'spawns::warp_pol':7, 'spawns::warp_mof':2, 'spawns::warp_bof':3,
  'spawns::warp_sow':4, 'spawns::warp_nos':6, 'spawns::warp_ros':5,
  'hyrule_field::hf_to_lw':160, 'hyrule_field::hf_to_river':164, 'hyrule_field::hf_to_kak':163, 'hyrule_field::hf_to_market':161, 'hyrule_field::hf_to_ranch':162,
  'hyrule_field::hf_to_gv':166, 'hyrule_field::hf_to_lake':165, 'hyrule_field::hf_to_kakarikogrotto':168, 'hyrule_field::kakarikogrotto_to_hf':176,
  'hyrule_field::hf_to_marketgrotto':167, 'hyrule_field::marketgrotto_to_hf':175, 'hyrule_field::hf_to_divinggrotto':169, 'hyrule_field::divingrotto_to_hf':177,
  'hyrule_field::hf_to_fairygrotto':170, 'hyrule_field::fairygrotto_to_hf':178, 'hyrule_field::hf_to_cowgrotto':171, 'hyrule_field::cowgrotto_to_hf':179,
  'hyrule_field::hf_to_fencegrotto':173, 'hyrule_field::fencegrotto_to_hf':181, 'hyrule_field::hf_to_opengrotto':172, 'hyrule_field::opengrotto_to_hf':180,
  'hyrule_field::hf_to_forestgrotto':174, 'hyrule_field::forestgrotto_to_hf':182,
  'market::market_to_hf':258, 'market::entrance_to_market':259, 'market::market_to_entrance':261, 'market::market_to_templeplaza':263,
  'market::templeplaza_to_market':281, 'market::market_to_castle':262, 'hyrule_castle::castle_to_market':284, 'market::market_to_guardtower':260,
  'market::guardtower_to_market':272, 'market::market_to_chestgame':266, 'market::chestgame_to_market':275, 'market::market_to_bowling':265,
  'market::bowling_to_market':274, 'market::market_to_bazaar':269, 'market::bazaar_to_market':278, 'market::market_to_potions':270,
  'market::potions_to_market':279, 'market::market_to_shooting':264, 'market::shooting_to_market':273, 'market::market_to_masks':268,
  'market::masks_to_market':277, 'market::market_to_bombchushop':271, 'market::bombchushop_to_market':280, 'market::market_to_backhouse':267,
  'market::backhouse_to_market':276, 'hyrule_castle::castle_to_adultgreatfairy':289, 'hyrule_castle::adultgreatfairy_to_castle':291,
  'hyrule_castle::castle_to_childgreatfairy':285, 'hyrule_castle::childgreatfairy_to_castle':287, 'hyrule_castle::castle_to_grotto':286, 'hyrule_castle::grotto_to_castle':288,
  'market::templeplaza_to_templeoftime':282, 'market::templeoftime_to_templeplaza':283, 'hyrule_castle::castle_to_ganon':290, 'ganons_castle::ganon_to_castle':292,
  'ganons_castle::castle_to_tower':294, 'ganons_castle::tower_to_castle':293, 'market::prelude_pad':'pad_tot',
  'kakariko_village::kak_to_hf':55, 'kakariko_village::kak_to_dmt':57, 'kakariko_village::kak_to_graveyard':56, 'kakariko_village::kak_to_carpenter':58, 'kakariko_village::carpenter_to_kak':71,
  'kakariko_village::kak_to_bazaar':65, 'kakariko_village::bazaar_to_kak':78, 'kakariko_village::kak_to_shooting':63, 'kakariko_village::shooting_to_kak':76, 'kakariko_village::kak_to_odd':64,
  'kakariko_village::odd_to_kak':77, 'kakariko_village::kak_to_impas':60, 'kakariko_village::impas_to_kak':73, 'kakariko_village::kak_to_impas_back':61, 'kakariko_village::impas_to_kak_back':74, 'kakariko_village::owl_impas_roof':'kak_roof',
  'kakariko_village::kak_to_skulltulas':59, 'kakariko_village::skulltulas_to_kak':72, 'kakariko_village::kak_to_potions':66, 'kakariko_village::potions_to_kak':79,
  'kakariko_village::kak_to_potions_back':67, 'kakariko_village::potions_to_kak_back':80, 'kakariko_village::kak_to_windmill':62, 'kakariko_village::windmill_to_kak':75,
  'kakariko_village::kak_to_redeadgrotto':69, 'kakariko_village::redeadgrotto_to_kak':82, 'kakariko_village::kak_to_opengrotto':68, 'kakariko_village::opengrotto_to_kak':81,
  'kakariko_village::kak_to_well':70, 'bottom_of_the_well::well_to_kak':83,
  'graveyard::graveyard_to_kak':84, 'graveyard::graveyard_to_dampes':85, 'graveyard::dampes_to_graveyard':91, 'graveyard::graveyard_to_shieldgrave':86,
  'graveyard::shieldgrave_to_graveyard':92, 'graveyard::graveyard_to_dampesgrave':89, 'graveyard::dampesgrave_to_graveyard':95,
  'graveyard::graveyard_to_redeadgrave':87, 'graveyard::redeadgrave_to_graveyard':93, 'graveyard::graveyard_to_royaltomb':88,
  'graveyard::royaltomb_to_graveyard':94, 'graveyard::graveyard_to_shadowtemple':90, 'graveyard::nocturne_pad':'pad_gy',
  'lon_lon_ranch::ranch_to_hf':183, 'lon_lon_ranch::ranch_to_talon':184, 'lon_lon_ranch::talon_to_ranch':188, 'lon_lon_ranch::ranch_to_stables':185,
  'lon_lon_ranch::stables_to_ranch':189, 'lon_lon_ranch::ranch_to_silo':186, 'lon_lon_ranch::silo_to_ranch':190, 'lon_lon_ranch::ranch_to_grotto':187,
  'lon_lon_ranch::grotto_to_ranch':191,
  'kokiri_forest::kf_to_lw':11, 'kokiri_forest::kf_to_lwbridge':10, 'kokiri_forest::kf_to_twins':15, 'kokiri_forest::twins_to_kf':23,
  'kokiri_forest::kf_to_midos':13, 'kokiri_forest::midos_to_kf':21, 'kokiri_forest::kf_to_sarias':14, 'kokiri_forest::sarias_to_kf':22,
  'kokiri_forest::kf_to_shop':17, 'kokiri_forest::shop_to_kf':25, 'kokiri_forest::kf_to_kias':16, 'kokiri_forest::kias_to_kf':24,
  'kokiri_forest::kf_to_links':12, 'kokiri_forest::links_to_kf':20, 'kokiri_forest::kf_to_stormsgrotto':18, 'kokiri_forest::stormsgrotto_to_kf':26,
  'kokiri_forest::kf_to_dekutree':19,
  'lost_woods::lwbridge_to_kf':31, 'lost_woods::lwbridge_to_hf':32, 'lost_woods::lw_to_kf':33, 'lost_woods::lw_to_gc':34, 'lost_woods::lw_to_river':35,
  'lost_woods::lw_to_meadow':36, 'lost_woods::lw_to_gorongrotto':37, 'lost_woods::gorongrotto_to_lw':40, 'lost_woods::lw_to_theatre':39,
  'lost_woods::theatre_to_lw':42, 'lost_woods::lw_to_meadowgrotto':38, 'lost_woods::meadowgrotto_to_lw':41,
  'sacred_forest_meadow::meadow_to_lw':43, 'sacred_forest_meadow::meadow_to_wolfosgrotto':44, 'sacred_forest_meadow::wolfosgrotto_to_meadow':48, 'sacred_forest_meadow::meadow_to_fairygrotto':45,
  'sacred_forest_meadow::fairygrotto_to_meadow':49, 'sacred_forest_meadow::meadow_to_stormsgrotto':46, 'sacred_forest_meadow::stormsgrotto_to_meadow':50, 'sacred_forest_meadow::meadow_to_foresttemple':47,
  'sacred_forest_meadow::minuet_pad':'pad_sfm',
  'goron_city::gc_to_dmt':127, 'goron_city::gc_to_lw':129, 'goron_city::gc_to_dmc':128, 'goron_city::gc_to_shop':130, 'goron_city::shop_to_gc':132,
  'goron_city::gc_to_grotto':131, 'goron_city::grotto_to_gc':133,
  'death_mountain_trail::dmt_to_kak':101, 'death_mountain_trail::dmt_to_gc':100, 'death_mountain_trail::dmt_to_dmc':102,
  'death_mountain_trail::dmt_to_greatfairy':103, 'death_mountain_trail::greatfairy_to_dmt':107, 'death_mountain_trail::dmt_to_stormgrotto':104,
  'death_mountain_trail::stormgrotto_to_dmt':108, 'death_mountain_trail::dmt_to_cowgrotto':105, 'death_mountain_trail::cowgrotto_to_dmt':109,
  'death_mountain_trail::dmt_to_dc':106, 'death_mountain_trail::dmt_owl':8,
  'death_mountain_crater::dmc_to_dmt':115, 'death_mountain_crater::dmc_to_gc':114, 'death_mountain_crater::dmc_to_greatfairy':116,
  'death_mountain_crater::greatfairy_to_dmc':120, 'death_mountain_crater::dmc_to_bombgrotto':117, 'death_mountain_crater::bombgrotto_to_dmc':121,
  'death_mountain_crater::dmc_to_hammergrotto':118, 'death_mountain_crater::hammergrotto_to_dmc':122, 'death_mountain_crater::dmc_to_firetemple':119,
  'death_mountain_crater::bolero_pad':'pad_dmc',
  'zoras_river::river_to_hf':134, 'zoras_river::river_to_lw':135, 'zoras_river::river_to_domain':136, 'zoras_river::river_to_stormsgrotto':137,
  'zoras_river::stormsgrotto_to_river':140, 'zoras_river::river_to_opengrotto':139, 'zoras_river::opengrotto_to_river':142,
  'zoras_river::river_to_fairygrotto':138, 'zoras_river::fairygrotto_to_river':141,
  'zoras_domain::domain_to_river':143, 'zoras_domain::domain_to_lake':144, 'zoras_domain::domain_to_fountain':145, 'zoras_domain::domain_to_shop':146,
  'zoras_domain::shop_to_domain':148, 'zoras_domain::domain_to_grotto':147, 'zoras_domain::grotto_to_domain':149,
  'zoras_fountain::foutain_to_domain':150, 'zoras_fountain::fountain_to_greatfairy':151, 'zoras_fountain::greatfairy_to_fountain':154,
  'zoras_fountain::fountain_to_jbjb':152, 'zoras_fountain::fountain_to_ic':153, 'ice_cavern::ic_to_fountain':159,
  'lake_hylia::lake_to_hf':192, 'lake_hylia::lake_to_domain':193, 'lake_hylia::oneway_lake_from_gv':'lh_river', 'lake_hylia::lake_to_lab':194,
  'lake_hylia::lab_to_lake':198, 'lake_hylia::lake_to_fishing':195, 'lake_hylia::fishing_to_lake':199, 'lake_hylia::lab_to_grotto':196,
  'lake_hylia::grotto_to_lab':200, 'lake_hylia::lake_to_watertemple':197, 'lake_hylia::serenade_pad':'pad_lh', 'lake_hylia::lake_owl':9,
  'gerudo_valley::gv_to_hf':205, 'gerudo_valley::gv_to_gf':206, 'gerudo_valley::gv_to_lake':207, 'gerudo_valley::gv_to_tent':208,
  'gerudo_valley::tent_to_gv':211, 'gerudo_valley::gv_to_octorokgrotto':209, 'gerudo_valley::octorokgrotto_to_gv':212,
  'gerudo_valley::gv_to_stormgrotto':210, 'gerudo_valley::stormgrotto_to_gv':213,
  'gerudo_fortress::gf_to_gv':214, 'gerudo_fortress::gf_to_hw':215, 'gerudo_fortress::gf_to_grotto':216, 'gerudo_fortress::grotto_to_gf':218,
  'gerudo_fortress::gf_to_gtg':217, 'gerudo_training_ground::gtg_to_gt':219,
  // Repaire des Voleurs : appariement intérieur <-> extérieur vérifié sur le tracker de SoH (voir plus bas)
  'gerudo_fortress::hideout_gf_a':220, 'gerudo_fortress::hideout_a_gf':233, 'gerudo_fortress::hideout_gf_b':221, 'gerudo_fortress::hideout_b_gf':234,
  'gerudo_fortress::hideout_gf_c':222, 'gerudo_fortress::hideout_c_gf':235, 'gerudo_fortress::hideout_gf_d':223, 'gerudo_fortress::hideout_d_gf':236,
  'gerudo_fortress::hideout_gf_e':228, 'gerudo_fortress::hideout_e_gf':241, 'gerudo_fortress::hideout_gf_f':229, 'gerudo_fortress::hideout_f_gf':242,
  'gerudo_fortress::hideout_gf_g':226, 'gerudo_fortress::hideout_g_gf':239, 'gerudo_fortress::hideout_gf_h':227, 'gerudo_fortress::hideout_h_gf':240,
  'gerudo_fortress::hideout_gf_i':225, 'gerudo_fortress::hideout_i_gf':238, 'gerudo_fortress::hideout_gf_j':224, 'gerudo_fortress::hideout_j_gf':237,
  'gerudo_fortress::hideout_gf_k':232, 'gerudo_fortress::hideout_k_gf':245, 'gerudo_fortress::hideout_gf_l':231, 'gerudo_fortress::hideout_l_gf':244,
  'gerudo_fortress::hideout_gf_m':230, 'gerudo_fortress::hideout_m_gf':243,
  'wasteland::hw_to_gf':246, 'wasteland::hw_to_colossus':247,
  'desert_colossus::colossus_to_hw':248, 'desert_colossus::colossus_to_greatfairy':249, 'desert_colossus::greatfairy_to_colossus':252, 'desert_colossus::colossus_to_grotto':250,
  'desert_colossus::grotto_to_colossus':253, 'desert_colossus::colossus_to_spirittemple':251, 'desert_colossus::requiem_pad':'pad_colossus',
  'deku_tree::dekutree_to_kf':27, 'deku_tree::dekutree_boss':28, 'deku_tree::gohma':29,
  'dodongos_cavern::dc_to_dmt':110, 'dodongos_cavern::dc_boss':111, 'dodongos_cavern::kd':112,
  'jabu_jabus_belly::jbjb_to_fountain':155, 'jabu_jabus_belly::jbjb_boss':156, 'jabu_jabus_belly::barinade':157,
  'forest_temple::foresttemple_to_meadow':51, 'forest_temple::foresttemple_boss':52, 'forest_temple::pg':53,
  'fire_temple::firetemple_to_dmc':123, 'fire_temple::firetemple_boss':124, 'fire_temple::volvagia':125,
  'water_temple::watertemple_to_lake':201, 'water_temple::watertemple_boss':202, 'water_temple::morpha':203,
  'shadow_temple::shadowtemple_to_graveyard':96, 'shadow_temple::shadowtemple_boss':97, 'shadow_temple::bb':98,
  'spirit_temple::spiritemple_to_colossus':254, 'spirit_temple::spirittemple_boss':255, 'spirit_temple::twinrova':256,
};

// Numéro d'entrée SoH (ENTR) de chaque ligne du tracker, comme dans `SOH_LOGIC.entrances` de logic-data.js (même calcul
// que tools/soh-logic/extract_logic.mjs : position dans entrance_table.h ; grottes 0x700 + n à l'entrée, 0x800 + n à la sortie).
// Il relie nos sorties à la logique (destinations notées dans Entrées -> liaisons de computeSoh).
const SRC = new URL('../soh-checks/src/', import.meta.url);
const read = f => fs.readFileSync(new URL(f, SRC), 'utf8');
const ENTR_NUM = {};
for (const m of read('entrance_table.h').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*DEFINE_ENTRANCE\((ENTR_\w+)/g)) ENTR_NUM[m[2]] = parseInt(m[1], 16);
const GROTTO = {};
for (const m of read('randomizerEnums/RandomizerMiscEnums.h').matchAll(/\/\*\s*0x([0-9A-Fa-f]+)\s*\*\/\s*RANDO_ENUM_ITEM\((GROTTO_\w+_OFFSET)\)/g)) GROTTO[m[2]] = parseInt(m[1], 16);
const TRACKER = (() => {
  const t = read('randomizer_entrance_tracker.cpp'), start = t.indexOf('entranceData[] = {');
  const body = t.slice(start, t.indexOf('\n};', start)), rows = [];
  const num = id => {
    const g = id.match(/ENTRANCE_GROTTO_(LOAD|EXIT)\((\w+)\)/);
    const n = g ? (g[1] === 'LOAD' ? 0x700 : 0x800) + GROTTO[g[2]] : ENTR_NUM[id];
    if (n === undefined || Number.isNaN(n)) throw new Error('numéro d\'entrée inconnu : ' + id);
    return n;
  };
  for (const line of body.split('\n')){
    const m = line.match(/^\s*\{\s*(ENTR_\w+|ENTRANCE_GROTTO_(?:LOAD|EXIT)\(\w+\))\s*,\s*(-1|ENTR_\w+|ENTRANCE_GROTTO_(?:LOAD|EXIT)\(\w+\))\s*,.*?"((?:[^"\\]|\\.)*)"\s*,\s*"/);
    if (!m) continue;
    // reverse : entrée inverse (on revient par elle), null pour un sens unique
    rows.push({ n:num(m[1]), reverse:m[2] === '-1' ? null : num(m[2]), name:m[3].replace(/\\"/g, '"') });
  }
  return rows;
})();
for (const [i, [name]] of Object.entries(SOH))
  if (TRACKER[i]?.name !== name) throw new Error(`Table décalée par rapport au tracker : ${i} « ${name} » ≠ « ${TRACKER[i]?.name} »`);

// Pool de randomisation (shuffleTag) imposé par le type de l'entrée SoH (entrance.cpp, logic-data.js) ; les salles de boss
// (specialTag) et la rivière Gerudo (sens unique) gardent le leur. Un écart est corrigé dans areas-data.js et signalé.
const TAG_BY_TYPE = { Dungeon:'dungeon_simple', GanonDungeon:'dungeon_ganon', GanonTower:'ganon_tower', GrottoGrave:'grotto',
  Interior:'interior_simple', SpecialInterior:'interior_all', ThievesHideout:'hideout', Overworld:'overworld', OwlDrop:'owl',
  Spawn:'spawn', WarpSong:'warp', ChildBoss:'boss_warp_child', AdultBoss:'boss_warp_adult' };
const TYPE_BY_TAG = { grotto:'grotto', interior_simple:'interior', interior_all:'interior' };   // icône (`type`) qui suit le pool
const LOGIC = fs.readFileSync(new URL('../../data/logic-data.js', import.meta.url), 'utf8');
const SOH_TYPE = Object.fromEntries(JSON.parse(LOGIC.match(/^\s*entrances:(\[.*\]),\s*$/m)[1]).map(([n, type]) => [n, type]));

const FILE = new URL('../../data/areas-data.js', import.meta.url);
const text = fs.readFileSync(FILE, 'utf8');
const header = text.slice(0, text.indexOf('window.AREAS_DATA'));
const data = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1));
const used = new Set(); const missing = [];
for (const area of data) for (const e of area.exits){
  const key = `${area.id}::${e.id}`, ref = MAP[key];
  const def = typeof ref === 'number' ? SOH[ref] : DEST[ref];
  if (!def){ missing.push(key); continue; }
  if (typeof ref === 'number'){ if (used.has(ref)) console.warn('Entrée SoH utilisée deux fois :', ref, key); used.add(ref); }
  // ordre des clés conservé, `soh` (et `entr` pour une entrée du tracker) inséré après `label`
  const out = {};
  for (const [k, v] of Object.entries(e)){
    if (k === 'soh' || k === 'entr') continue;
    out[k] = k === 'label' ? def[1] : v;
    if (k === 'label'){ out.soh = def[0]; if (typeof ref === 'number') out.entr = TRACKER[ref].n; }
  }
  Object.keys(e).forEach(k => delete e[k]); Object.assign(e, out);
  const want = out.entr != null && !out.specialTag && out.shuffleTag !== 'gerudo_river' && TAG_BY_TYPE[SOH_TYPE[out.entr]];
  if (want && want !== out.shuffleTag){
    console.log(`Pool corrigé : ${key} ${out.shuffleTag} -> ${want} (${SOH_TYPE[out.entr]})`);
    e.shuffleTag = want; if (TYPE_BY_TAG[want]) e.type = TYPE_BY_TAG[want];
  }
}
if (missing.length) throw new Error('Sorties sans correspondance SoH : ' + missing.join(', '));
// Appariements : la cible vanilla d'une sortie à double sens doit être son entrée inverse dans le tracker de SoH (porte
// extérieure <-> porte intérieure, Repaire des Voleurs compris).
{
  const byKey = {}, reverse = Object.fromEntries(TRACKER.map(r => [r.n, r.reverse]));
  for (const area of data) for (const e of area.exits) byKey[`${area.id}::${e.id}`] = e;
  const bad = [];
  for (const [key, e] of Object.entries(byKey)){
    const v = byKey[e.vanillaTargetExitId];
    if (e.entr == null || e.specialTag || !v || v.entr == null || reverse[e.entr] == null) continue;
    if (reverse[e.entr] !== v.entr) bad.push(`${key} -> ${e.vanillaTargetExitId} (inverse SoH ${reverse[e.entr]}, cible ${v.entr})`);
  }
  if (bad.length) throw new Error('Appariements différents de SoH :\n  ' + bad.join('\n  '));
}
fs.writeFileSync(FILE, header + 'window.AREAS_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
console.log(`${Object.keys(MAP).length} sorties renommées ; entrées SoH utilisées : ${used.size}`);
