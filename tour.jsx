// ─── City Walking Tour ─────────────────────────────────────
const { useState: useStateW, useRef: useRefW } = React;

const TOUR_STOPS = [
  {
    id: 1, lat: 51.0368, lon: 3.7360, extension: false,
    en: {
      name: `Scheldepunt (Start & Finish)`,
      desc: `The name 'Scheldepunt' refers to the junction of the Scheldt river right at this building. The Scheldt originates in northern France (Gouy) and flows via Belgium and the Netherlands to the North Sea. The left arm here connects the Leie with the Scheldt and is called the Upper Scheldt. The walk begins by following the left arm via Ter Plaeten, walking under the bridge past the Kinepolis.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Scheldepunt (Start & Einde)`,
      desc: `De naam 'Scheldepunt' verwijst naar de splitsing van de Schelde pal bij dit gebouw. De Schelde ontspringt in Noord-Frankrijk (Gouy) en stroomt via België en Nederland naar de Noordzee. De linkerarm verbindt de Leie met de Schelde en wordt de Bovenschelde of Muinkschelde genoemd. De wandeling start met het volgen van de linkerarm via Ter Plaeten, onder de brug voorbij de Kinepolis.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Scheldepunt (Départ & Arrivée)`,
      desc: `Le nom 'Scheldepunt' désigne la jonction de l'Escaut à cet immeuble. L'Escaut prend naissance dans le nord de la France (Gouy) et passe par la Belgique et les Pays-Bas pour atteindre la mer du Nord. Le bras gauche relie la Leie à l'Escaut et s'appelle l'Escaut supérieur. La promenade commence en suivant ce bras via Ter Plaeten, en passant sous le pont devant la Kinepolis.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 2, lat: 51.0378, lon: 3.7340, extension: false,
    en: {
      name: `Kinepolis`,
      desc: `When it was built in 1980, this was the largest cinema complex in the world. Today the 12 screens are only just enough to cater to Ghent's film-lovers.`,
      beer: `De Planck – old barge turned beer café with summer terrace on deck. Brouwzaele – beer & eatery with 100+ beers on the menu.`,
      food: ``,
    },
    nl: {
      name: `Kinepolis`,
      desc: `Bij de bouw in 1980 was de Kinepolis het grootste bioscoopcomplex van de wereld. Vandaag zijn de 12 zalen maar net voldoende meer om de Gentse filmliefhebber op zijn wenken te bedienen.`,
      beer: `De Planck – oud binnenschip omgevormd tot biercafé met groot zomerterras op het dek. Brouwzaele – bier- en eetcafé met meer dan 100 bieren.`,
      food: ``,
    },
    fr: {
      name: `Kinepolis`,
      desc: `Lors de sa construction en 1980, Kinepolis était le plus grand complexe cinématographique du monde. Aujourd'hui, les 12 salles ne suffisent plus qu'à servir l'amateur de cinéma gantois à sa guise.`,
      beer: `De Planck – ancienne péniche transformée en café-brasserie avec terrasse d'été. Brouwzaele – brasserie avec plus de 100 bières.`,
      food: ``,
    },
  },
  {
    id: 3, lat: 51.0390, lon: 3.7315, extension: false,
    en: {
      name: `Muinkpark`,
      desc: `The Muinkpark (from the word 'monk') is 1.3 hectares, landscaped in English style, and is the only remnant of the 19th-century Ghent zoo. Lions, parrots, ostriches, a crocodile and an elephant were real crowd-pullers. The surrounding streets still recall this past: Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat… Folk legend says a bear ended up on the BBQ after the zoo's bankruptcy — the elephant was turned into sausages in the Netherlands.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Muinkpark`,
      desc: `Het Muinkpark (afgeleid van 'monnik') is 1,3 hectare groot, aangelegd in Engelse landschapsstijl, en het enige restant van de 19e-eeuwse Gentse dierentuin. De omringende straten herinneren nog aan dit verleden: Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat... De volkslegende zegt dat na het faillissement een beer op de BBQ eindigde — de olifant werd in Nederland in worsten gedraaid.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Muinkpark`,
      desc: `Le Muinkpark (dérivé de « moine ») de 1,3 ha, aménagé dans le style anglais, est le seul vestige du zoo de Gand du XIXe siècle. Des lions, perroquets, autruches, un crocodile et un éléphant étaient de véritables attractions. Les noms des rues environnantes rappellent ce passé : Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat… La légende dit qu'après la faillite du zoo, un ours finit au barbecue — l'éléphant fut transformé en saucisses aux Pays-Bas.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 4, lat: 51.0440, lon: 3.7215, extension: false,
    en: {
      name: `Het Zuid – Woodrow Wilsonplein`,
      desc: `'t Zuid (The South) is the vibrant neighbourhood around the neo-baroque Zuidpark. The name refers to the former South Railway Station, closed in 1928 when Gent-Sint-Pieters opened. The impressive Urbiscomplex houses a shopping centre; across the square you find the old library and the city's administrative centre. Adjacent Graaf van Vlaanderenplein hosts the renovated Capitole theatre for musicals and stand-up comedy.`,
      beer: ``,
      food: `The Martino (Vlaanderenstraat) – legendary sandwich shop where the 'Martino' sandwich was invented. Joost Arijs – renowned praline boutique at the end of the street. Cremerie Gérard (Limburgstraat 36) – famous ice-cream parlour.`,
    },
    nl: {
      name: `Het Zuid – Woodrow Wilsonplein`,
      desc: `'t Zuid is de drukke buurt rond het neo-barokke Zuidpark. De naam verwijst naar het vroegere Zuidstation, dat in 1928 sloot bij de komst van Gent-Sint-Pieters. Het Urbiscomplex huisvest een winkelcentrum; aan de overkant vind je de oude bibliotheek en het administratief centrum. Op het aansluitende Graaf van Vlaanderenplein staat het gerenoveerde Capitole-theater voor musicals en stand-up comedy.`,
      beer: ``,
      food: `De Martino (Vlaanderenstraat) – de legendarische eetplaats waar het broodje Martino werd uitgevonden. Joost Arijs – vermaarde praliné-shop aan het einde van de straat. Cremerie Gérard (Limburgstraat 36) – gerenommeerde ijssalon.`,
    },
    fr: {
      name: `Le Sud – Woodrow Wilsonplein`,
      desc: `Le Sud ('t Zuid) est le quartier animé autour du Zuidpark néo-baroque. Le nom vient de l'ancienne gare du Sud, fermée en 1928 à l'ouverture de Gent-Sint-Pieters. L'Urbiscomplex abrite un centre commercial ; en face se trouvent l'ancienne bibliothèque et le centre administratif. La place Graaf van Vlaanderen voisine accueille le théâtre Capitole rénové, pour comédies musicales et stand-up.`,
      beer: ``,
      food: `De Martino (Vlaanderenstraat) – l'endroit légendaire où le sandwich Martino a été inventé. Joost Arijs – célèbre boutique de pralines. Cremerie Gérard (Limburgstraat 36) – glacier réputé.`,
    },
  },
  {
    id: 5, lat: 51.0527, lon: 3.7217, extension: false,
    en: {
      name: `Belfry & Cloth Hall (Belfort & Lakenhalle)`,
      desc: `Construction of the Ghent Belfry began in 1314; by 1377 the legendary fire-breathing dragon was hoisted on top. The belfry stored city privileges and its bells, including 'Klokke Roeland', marked the working day and rang for feasts, storms or danger. It is a UNESCO World Heritage site — you can climb the tower. About half a century later the Cloth Hall (Lakenhalle) was added; above a corner gate the story of the 'Mammelokker' is depicted — a father saved from starvation in prison by his daughter's breast milk.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
    },
    nl: {
      name: `Belfort & Lakenhalle`,
      desc: `Met de bouw van het Belfort werd begonnen in 1314; in 1377 werd de legendarische vuurspuwende draak gehesen. De klokken, waaronder Klokke Roeland, gaven de werkdag aan en luidden bij feesten, storm of gevaar. UNESCO Werelderfgoed — je kan de toren beklimmen. Ongeveer een halve eeuw later werd de Lakenhalle aangebouwd; boven een hoekpoort is het verhaal van de 'Mammelokker' uitgebeeld — een vader gered van de hongerdood door de borstvoeding van zijn dochter.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
    },
    fr: {
      name: `Beffroi & Halle aux Draps`,
      desc: `La construction du Beffroi de Gand a commencé en 1314 ; en 1377 le légendaire dragon cracheur de feu fut hissé au sommet. Les cloches, dont la Klokke Roeland, scandaient la journée de travail et sonnaient aux fêtes, tempêtes ou dangers. Site du patrimoine mondial de l'UNESCO — vous pouvez grimper la tour. La Halle aux Draps fut ajoutée un demi-siècle plus tard ; au-dessus d'un portail figure la légende du 'Mammelokker' — un père sauvé de la faim en prison grâce à l'allaitement de sa fille.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
    },
  },
  {
    id: 6, lat: 51.0533, lon: 3.7213, extension: false,
    en: {
      name: `Stadshal (City Hall)`,
      desc: `The new building between the Belfry and Saint-Nicholas Church is the Stadshal. Controversial from the start, some Ghentians dismissively call it the 'Sheepfold'. It is an open hall with a café below and 1,600 small windows in the roof providing dynamic light. The large bell underneath is 'Klokke Roeland', used as a belfry bell during the Middle Ages until 1659. On the plinth is a painting by Ghent's world-famous artist Michaël Borremans, 'The Virgin'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – the place for ribs.`,
    },
    nl: {
      name: `Stadshal`,
      desc: `Het nieuwe bouwwerk tussen het Belfort en de Sint-Niklaaskerk is de Stadshal. Al van bij de bouwwerken omstreden — sommigen noemen het de 'Schaapstal'. Het is een open hal met een café onderaan en 1600 kleine raampjes in het dak die voor dynamische lichtinval zorgen. De grote klok is de 'Klokke Roeland', in het belfort tot 1659. Op de sokkel staat een schilderij van de wereldberoemde Gentse schilder Michaël Borremans, 'De Maagd'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – the place for ribs.`,
    },
    fr: {
      name: `Stadshal (Halle municipale)`,
      desc: `La Stadshal, entre le Beffroi et l'église Saint-Nicolas, est controversée depuis sa construction — certains la surnomment la 'bergerie'. C'est une halle ouverte avec un café dessous et 1 600 petites fenêtres dans le toit créant une lumière dynamique. La grande cloche sous la structure est la 'Klokke Roeland', restée dans le beffroi jusqu'en 1659. Sur le socle, un tableau du peintre gantois de renommée mondiale Michaël Borremans, 'La Vierge'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – the place for ribs.`,
    },
  },
  {
    id: 7, lat: 51.0534, lon: 3.7200, extension: false,
    en: {
      name: `Korenmarkt`,
      desc: `Since the 10th–11th century this square was where grain entering Ghent via the Leie or Scheldt was traded. It is surrounded by historical buildings and is an important tourist hub. On leaving Donkersteeg you immediately see a modern art column with a gold necklace whose motifs reference medieval windows. The house 'De Cooremaete' (nr 7-8) was used for grain stacking; 'Het waepen van Zeelant' (nr 20), probably from the 13th century, bears the inscription 'Vry huys, vry erve' ('Free house, free estate').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – the very first coffee shop in Ghent.`,
    },
    nl: {
      name: `Korenmarkt`,
      desc: `Vanaf de 10de–11de eeuw was dit het handelsplein voor graan dat via de Leie of Schelde Gent binnenkwam. Op de hoek staat een modern kunstwerk, een elegante zuil met goudkleurige ketting. 'De Cooremaete' (nr 7-8) diende voor het stapelen van graan; 'Het waepen van Zeelant' (nr 20) draagt de tekst 'Vry huys, vry erve' ('Vrij huis, vrij erf').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – de oerkoffiezaak van Gent.`,
    },
    fr: {
      name: `Korenmarkt`,
      desc: `Depuis le Xe–XIe siècle, la place était le lieu de commerce du grain entrant à Gand. En quittant le Donkersteeg, vous voyez une colonne moderne avec un collier doré aux motifs de fenêtres médiévales. 'De Cooremaete' (n°7-8) servait à empiler le grain ; 'Het waepen van Zeelant' (n°20), probablement du XIIIe siècle, porte l'inscription 'Vry huys, vry erve' ('Maison libre, bien libre').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – le tout premier coffee shop de Gand.`,
    },
  },
  {
    id: 8, lat: 51.0534, lon: 3.7193, extension: false,
    en: {
      name: `De Post (The Post Office)`,
      desc: `The former Post Office, built between 1898 and 1908, still breathes historical atmosphere along its exterior façade — note the beautiful 52m-high clock tower. Inside is now a shopping centre; a few remnants of the original interior can still be spotted (look up). The building also houses the iconic hotel 1898 The Post.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `De Post`,
      desc: `Het voormalige Postgebouw, opgetrokken tussen 1898 en 1908, ademt langs de buitengevel nog de historische sfeer — let op de prachtige klokkentoren van 52 meter. Binnen is nu een winkelcentrum; een paar restanten van het vroegere interieur zijn er nog te zien (kijk omhoog). In het gebouw vind je ook het iconische hotel 1898 The Post.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `La Poste`,
      desc: `L'ancien bâtiment de la Poste, érigé entre 1898 et 1908, respire encore l'atmosphère historique — remarquez la belle tour de l'horloge de 52 m. À l'intérieur se trouve un centre commercial ; quelques vestiges de l'ancien intérieur sont encore visibles (regardez en haut). Le bâtiment abrite aussi l'hôtel iconique 1898 The Post.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 9, lat: 51.0537, lon: 3.7201, extension: false,
    en: {
      name: `Sint-Niklaaskerk (Saint-Nicholas Church)`,
      desc: `The distant origins of Saint-Nicholas Church lie in the 11th century. In 1120 the first church was destroyed by fire; a second barely lasted 75 years. In the 13th century the present church was begun, a work continued for centuries. The city council gave the church tower the function of the belfry until the actual belfry came into use. Note the tower is located in the middle of the church building. Inside you can admire a wealth of religious art.`,
      beer: ``,
      food: `Het Pakhuis – former warehouse turned restaurant (Jan van Stopenberghstraat, left).`,
    },
    nl: {
      name: `Sint-Niklaaskerk`,
      desc: `De verre oorsprong van de Sint-Niklaaskerk situeert zich in de 11de eeuw. In 1120 werd de eerste kerk door brand vernield; een tweede hield het nauwelijks driekwart eeuw uit. In de 13de eeuw werd begonnen met de bouw van de huidige kerk. Het stadsbestuur gaf de kerktoren de functie van belfort totdat het eigenlijke belfort in gebruik werd genomen. Merk op dat de toren middenin het kerkgebouw staat. Binnen kun je een schat aan religieuze kunst bewonderen.`,
      beer: ``,
      food: `Het Pakhuis – voormalige opslagplaats omgetoverd tot restaurant (Jan van Stopenberghstraat, links).`,
    },
    fr: {
      name: `Église Saint-Nicolas`,
      desc: `Les origines de l'église Saint-Nicolas remontent au XIe siècle. En 1120 la première église fut détruite par le feu ; une deuxième dura à peine 75 ans. La construction de l'église actuelle débuta au XIIIe siècle. Le conseil municipal confia la fonction de beffroi à la tour de l'église en attendant la mise en service du vrai beffroi. Notez que la tour se trouve au milieu de l'édifice. À l'intérieur, admirez une richesse d'art religieux.`,
      beer: ``,
      food: `Het Pakhuis – ancien entrepôt transformé en restaurant (Jan van Stopenberghstraat, à gauche).`,
    },
  },
  {
    id: 10, lat: 51.0530, lon: 3.7192, extension: false,
    en: {
      name: `Graffiti – Lam Gods (Copy)`,
      desc: `On the wall you can see part of the famous masterpiece 'Het Lam Gods' (The Mystic Lamb) reproduced by street artist Smates (Bart Smeets, www.smates.be). He created it for the cinema release of 'The Monuments Men'. From the bridge above you get two of Ghent's most beautiful panoramas: turning around you see the famous trio of towers (Saint-Nicholas, Belfry, Saint-Bavo) in a perfect line; below lies the Graslei with one of the most beautiful rows of houses in the world.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Graffiti – Lam Gods`,
      desc: `Op de muur zie je een luik nageschilderd van het bekende topkunstwerk 'Het Lam Gods', van Smates (Bart Smeets, www.smates.be). Hij maakte het naar aanleiding van de bioscooprelease van 'The Monuments Men'. Vanaf de brug erboven geniet je van twee van de allermooiste Gentse zichten: de drie torens op een rij (Sint-Niklaaskerk, Belfort, Sint-Baafskathedraal) en beneden de Graslei met een van de mooiste huizenrijen van de wereld.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Graffiti – L'Agneau Mystique`,
      desc: `Sur le mur, une reproduction du célèbre chef-d'œuvre 'Het Lam Gods' par Smates (Bart Smeets, www.smates.be), réalisée pour la sortie du film 'Monuments Men'. Du pont au-dessus, vous jouissez de deux des plus belles vues de Gand : les trois tours en enfilade (Saint-Nicolas, Beffroi, Saint-Bavon) et en contrebas le Graslei, l'une des plus belles rangées de maisons du monde.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 11, lat: 51.0527, lon: 3.7185, extension: false,
    en: {
      name: `Sint-Michielskerk (Saint-Michael's Church)`,
      desc: `In 1440 the construction of Saint-Michael's Church began; earlier there was a chapel here. Iconoclasts demolished the building in the 16th century, so in 1619 a new church was built — the current one. Due to lack of money, work stopped in 1672 and the tower has been without a spire ever since. The intention was a tower of 134 metres! 'Christ on the Cross' by Antoon Van Dyck is the most important work of art here.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
    },
    nl: {
      name: `Sint-Michielskerk`,
      desc: `In 1440 werd de bouw van de Sint-Michielskerk aangevat; eerder stond hier een kapel. Beeldenstormers sloopten het gebouw in de 16de eeuw, zodat men in 1619 aan een nieuwe kerk begon — de huidige. Door geldgebrek vielen de werkzaamheden stil in 1672 en sindsdien staat de toren zonder spits. De bedoeling was een toren van maar liefst 134 meter! 'Christus aan het kruis' van Antoon Van Dyck is hier het belangrijkste kunstwerk.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
    },
    fr: {
      name: `Église Saint-Michel`,
      desc: `En 1440 débuta la construction de l'église Saint-Michel, qui remplaça une chapelle. Les iconoclastes la détruisirent en grande partie au XVIe siècle ; en 1619 une nouvelle église fut construite — l'actuelle. Faute d'argent, les travaux s'arrêtèrent en 1672 et la tour est depuis sans flèche. L'intention était une tour de 134 mètres ! 'Le Christ en croix' d'Antoon Van Dyck est l'œuvre d'art majeure de l'église.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
    },
  },
  {
    id: 12, lat: 51.0535, lon: 3.7208, extension: false,
    en: {
      name: `Korenlei & Graslei`,
      desc: `Walk over the Korenlei and admire the majestic Graslei. Ghent held the grain-stacking right, meaning grain from northern France had to pass through and be stored here for two weeks before trading. The Graslei shows a series of beautiful old buildings: the Cooremetershuys (nr 12-13) was the 14th-century meeting place of cargo craftsmen; Tolhuisje (nr 11) is the smallest house in the city; the Korenstapelhuis (nr 10, also 'Het Spijker', from Spica = Latin for grain) has what is said to be the world's oldest step gable. On the Korenlei, the hotel Marriott hides behind a preserved historic façade — two swans on the gable hint at its medieval past as a brothel.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Korenlei & Graslei`,
      desc: `Loop over de Korenlei en bewonder de majestueuze Graslei. Gent bezat het graanstapelrecht: graan moest hier twee weken liggen voordat het verhandeld mocht worden. De Graslei toont een reeks prachtige oude gebouwen: het Cooremetershuys (nr 12-13) was de vergaderplaats van de pijnders; het Tolhuisje (nr 11) is het kleinste huisje van de stad; het Korenstapelhuis (nr 10, 'Het Spijker', van Spica = Latijn voor koren) heeft vermoedelijk de oudste bestaande trapgevel ter wereld. Op de Korenlei verbergt het hotel Marriott zich achter een historische gevel — twee zwanen op de gevel verwijzen naar het middeleeuwse bordeel dat er was.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Korenlei & Graslei`,
      desc: `Marchez sur le Korenlei et admirez le majestueux Graslei. Gand possédait le droit d'entrepôt de grain : le grain devait y être stocké deux semaines avant d'être commercialisé. Le Graslei présente de magnifiques bâtiments anciens : le Cooremetershuys (n°12-13) était la salle de réunion des artisans dockers ; le Tolhuisje (n°11) est la plus petite maison de la ville ; le Korenstapelhuis (n°10, 'Het Spijker') aurait le plus vieux pignon à gradins du monde. Sur le Korenlei, l'hôtel Marriott se cache derrière une façade historique préservée — deux cygnes sur la façade rappellent son passé médiéval de maison close.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 13, lat: 51.0555, lon: 3.7198, extension: false,
    en: {
      name: `Designmuseum Gent`,
      desc: `The Ghent Design Museum is housed in the 18th-century Hotel De Coninck. Modern design in a new building is successfully combined with the historic structure. In the old wing you find 18th-century Ghent aristocracy salons; in the new building a completely different world awaits. Don't miss the toilet wing — built in defiance after the city repeatedly denied expansion funds. The museum turned it into a monumental giant toilet roll, literally telling the city council 'de pot op' (go to hell).`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Designmuseum Gent`,
      desc: `Het Gentse Designmuseum is gehuisvest in het 18de-eeuwse Hotel De Coninck. In het oude gedeelte kom je terecht in de salons van de 18de-eeuwse Gentse aristocratie. Mis de opvallende toiletvleugel niet — gebouwd uit protest nadat de stad herhaaldelijk budget voor uitbreiding weigerde. Het museum maakte er een monumentale wc-rol van, een figuurlijk opgestoken middenvinger naar het stadsbestuur ('de pot op').`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Designmuseum Gent`,
      desc: `Le Musée du Design de Gand est installé dans l'hôtel De Coninck du XVIIIe siècle. L'aile ancienne abrite les salons de l'aristocratie gantoise ; l'aile moderne propose un tout autre univers. Ne manquez pas l'aile des toilettes, construite par défi après que la ville refusa les fonds d'extension. Le musée en fit un monumental rouleau de papier toilette, un majeur levé au conseil municipal ('de pot op' = 'allez vous faire voir').`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 14, lat: 51.0568, lon: 3.7197, extension: false,
    en: {
      name: `Gravensteen (Castle of the Counts)`,
      desc: `Construction of the current Castle of the Counts began in 1180 under Count Philip of Alsace. Until the mid-15th century it served as residence of the Counts of Flanders; later as meeting hall, court, and cotton mill. The castle exhibits weapons and torture equipment. On 16 November 1949 Ghent students famously occupied the castle — supposedly to protest rising beer prices and new police helmets, but really just a student prank born of boredom. This 'greatest student joke of all time' is still celebrated annually with the Gravensteenfestival.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Gravensteen`,
      desc: `De bouw van het huidige Gravensteen begon in 1180 onder graaf Filips van de Elzas. Tot het midden van de 15de eeuw verbleven de graven van Vlaanderen hier regelmatig; later ook vergaderplaats, rechtbank en katoenspinnerij. Op 16 november 1949 bezetten Gentse studenten het kasteel — schijnbaar om te protesteren tegen de stijgende bierprijs en nieuwe politiekepies, maar eigenlijk gewoon een studentengrap uit verveling. Deze 'grootste studentengrap aller tijden' wordt jaarlijks herdacht met het Gravensteenfestival.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Gravensteen (Château des Comtes)`,
      desc: `La construction de l'actuel Château des Comtes débuta en 1180 sous le comte Philippe d'Alsace. Jusqu'au milieu du XVe siècle, les comtes de Flandre y séjournèrent ; puis il servit de salle de réunion, tribunal et filature de coton. Le château expose armes et instruments de torture. Le 16 novembre 1949, des étudiants gantois l'occupèrent — soi-disant pour protester contre la hausse du prix de la bière, mais en réalité une simple farce d'étudiant. Cette 'plus grande farce étudiante de tous les temps' est célébrée chaque année au Gravensteenfestival.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 15, lat: 51.0581, lon: 3.7196, extension: true,
    en: {
      name: `Paters Karmelieten (Carmelite Monastery)`,
      desc: `In the middle of the Burgstraat, on the right, you see the church 'Paters Karmelieten'. You can enter freely and a visit is highly recommended. Next to the church is the cloister garden, only open on request. The monastery is known for guests who come for 'peace, quiet and relaxation'.`,
      beer: ``,
      food: `Mémé Gusta – traditional Belgian cuisine in a cosy setting (Burgstraat).`,
    },
    nl: {
      name: `Paters Karmelieten`,
      desc: `In het midden van de Burgstraat rechts zie je de kerk 'Paters Karmelieten'. Je kan er vrij in en een bezoek is een aanrader. Naast de kerk ligt de kloostertuin, die enkel te bezoeken is op aanvraag. Het klooster is gekend voor gasten die komen voor de 'rust, stilte en onthaasting'.`,
      beer: ``,
      food: `Mémé Gusta – traditionele Belgische keuken in een gezellig kader (Burgstraat).`,
    },
    fr: {
      name: `Paters Karmelieten (Monastère carmélite)`,
      desc: `Au milieu de la Burgstraat sur la droite se trouve l'église 'Paters Karmelieten'. Vous pouvez y entrer librement et une visite est fortement recommandée. À côté se trouve le jardin du cloître, accessible sur demande. Le monastère est connu pour ses hôtes qui viennent chercher 'paix, calme et détente'.`,
      beer: ``,
      food: `Mémé Gusta – cuisine belge traditionnelle dans un cadre agréable (Burgstraat).`,
    },
  },
  {
    id: 16, lat: 51.0582, lon: 3.7163, extension: true,
    en: {
      name: `Oud Begijnhof – Sint-Elisabethkerk`,
      desc: `Believed to be one of the oldest beguinages in Flanders, the atmosphere is best absorbed in the Proveniersterstraat. The Sint-Elisabethkerk is the central building of the Oud-begijnhof. Unusually, it hosts both Roman Catholic and Anglican services. This district is known as 'The Holy Corner' — four religions are practised in three churches within a short distance of each other. A place of tolerance. A striking new Orthodox church in the Sophie Van Akenstraat was painted inside with frescoes in authentic Byzantine technique.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Oud Begijnhof – Sint-Elisabethkerk`,
      desc: `Vermoedelijk een van de oudste begijnhoven van Vlaanderen; de sfeer is het best op te snuiven in de Proveniersterstraat. De Sint-Elisabethkerk is het centrale gebouw. Opmerkelijk: er worden zowel rooms-katholieke als Anglicaanse diensten gehouden. Deze wijk heet 'The Holy Corner' — vier religies worden beoefend in drie kerken op luttele afstand. Een oord van verdraagzaamheid. In de Sophie Van Akenstraat is een nieuwe orthodoxe kerk die van binnen beschilderd is met fresco's in de authentieke Byzantijnse techniek.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Ancien Béguinage – Sint-Elisabethkerk`,
      desc: `Considéré comme l'un des plus anciens béguinages de Flandre, l'atmosphère se savoure dans la Proveniersterstraat. La Sint-Elisabethkerk est le bâtiment central de l'Oud-begijnhof. Remarquablement, elle accueille des offices catholiques romains et anglicans. Ce quartier s'appelle 'The Holy Corner' — quatre religions sont pratiquées dans trois églises à proximité. Un lieu de tolérance. Dans la Sophie Van Akenstraat, une nouvelle église orthodoxe décorée de fresques selon la technique byzantine authentique.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 17, lat: 51.0588, lon: 3.7150, extension: true,
    en: {
      name: `Prinsenhof`,
      desc: `The 'Donkere Poort' (Dark Gate) on your left is the only remnant of the 'Hof ten Walle', once a fortified castle. The square here, the Prinsenhof, was part of the large domain of the Flemish Counts. None other than Charles V was born here in 1500. The statue represents the proud Charles. It is thanks to Charles V that the people of Ghent are called 'noose-bearers' — after he forced all officials and nobles to make a penitential walk through the streets with a noose around their necks and barefoot.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Prinsenhof`,
      desc: `De 'Donkere Poort' links is het enige overblijfsel van het 'Hof ten Walle', destijds een versterkt kasteel. Het Prinsenhof maakte deel uit van het grote domein van de Vlaamse Graven. Niemand minder dan Keizer Karel werd hier geboren in 1500. Het beeldje stelt de fiere Karel voor. Het is aan Keizer Karel te danken dat de Gentenaars 'stroppendragers' worden genoemd — hij dwong alle ambtenaren en edellieden een boetewandeling te maken met een strop om de hals en blootvoets.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Prinsenhof`,
      desc: `La 'Porte Sombre' à gauche est le seul vestige du 'Hof ten Walle', jadis un château fort. Le Prinsenhof faisait partie du grand domaine des comtes flamands. Nul autre que Charles Quint y naquit en 1500. La statue représente le fier Charles. C'est à lui que les Gantois doivent leur surnom de 'porteurs de nœuds coulants' — il contraignit tous les fonctionnaires et nobles à une marche pénitentielle, nu-pieds et la corde au cou.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 18, lat: 51.0577, lon: 3.7171, extension: true,
    en: {
      name: `Bridge of Imperial Pleasures`,
      desc: `The Bridge of Imperial Pleasures was built in 2000 (the Charles V centennial year) over the River Lieve, with statues by Ghent sculptor and cabaret artist Walter De Buck (1934–2014), referencing various legends about Charles V's life. The ship at one end refers to the story of the 'ship-puller': the emperor accidentally caused a barge to run aground on a towpath; the captain forced Charles to pull it free, after which Charles gave him a new boat.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
    },
    nl: {
      name: `Brug der Keizerlijke Geneugten`,
      desc: `De Brug der Keizerlijke Geneugten werd in het Keizer Kareljaar 2000 over de Lieve gebouwd, met beelden van de Gentse beeldhouwer en kleinkunstenaar Walter De Buck (1934–2014). Ze verwijzen naar legenden over Keizer Karel. Het schip verwijst naar het verhaal van de scheepstrekker: de keizer liep op een jaagpad een bootsman voor de voeten, waardoor zijn schip strandde. De kapitein dwong Karel het schip los te trekken, waarop Karel hem een nieuwe boot gaf.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
    },
    fr: {
      name: `Pont des Délices Impériaux`,
      desc: `Le Pont des Délices Impériaux fut construit en 2000 (l'année du centenaire de Charles Quint) sur la rivière Lieve, avec des statues du sculpteur et artiste de cabaret gantois Walter De Buck (1934–2014). Elles font référence à des légendes sur la vie de Charles Quint. Le navire évoque l'histoire du 'tireur de bateau' : l'empereur gêna un batelier sur un chemin de halage, causant l'échouement du navire ; le capitaine força Charles à le renflouer, qui lui offrit ensuite un nouveau bateau.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
    },
  },
  {
    id: 19, lat: 51.0572, lon: 3.7183, extension: false,
    en: {
      name: `De Lieve`,
      desc: `The Lieve was dug between 1251 and 1269 to connect the city with the Zwin at Damme. From there, goods such as fine cloth could be shipped to England. The Dutch also used this canal for trade. The Sint-Widostraat in a bend offers a view of both the theatre Arca (NTG) and a beautiful vista through to the Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
    },
    nl: {
      name: `De Lieve`,
      desc: `De Lieve werd tussen 1251 en 1269 gegraven om de stad te verbinden met het Zwin in Damme. Van daar konden goederen zoals fijne lakenstof naar Engeland verscheept worden. Ook de Hollanders gebruikten dit kanaal om handel te drijven. De Sint-Widostraat biedt een fraai doorkijkje naar het Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
    },
    fr: {
      name: `De Lieve`,
      desc: `La Lieve fut creusée entre 1251 et 1269 pour relier la ville au Zwin de Damme. De là, des marchandises comme du tissu fin pouvaient être expédiées en Angleterre. Les Néerlandais utilisaient aussi ce canal pour le commerce. La Sint-Widostraat offre une belle vue sur le Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
    },
  },
  {
    id: 20, lat: 51.0566, lon: 3.7182, extension: false,
    en: {
      name: `Caermersklooster`,
      desc: `This former Carmelite monastery was in use from the end of the 13th century. Besides the usual monastery buildings there was also a brewery. After the French Revolution it passed into private hands; later the city of Ghent bought the buildings. It has been transformed into an exhibition space where mainly prestigious temporary exhibitions take place, often with free admission. In one of the living quarters a huge wall painting with remains of a fresco can be viewed (at a charge).`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Caermersklooster`,
      desc: `Dit vroegere klooster van de geschoeide karmelieten was al in gebruik eind 13de eeuw. Naast de kloostergebouwen was er ook een brouwerij. Na de Franse revolutie ging het in privéhanden; later kocht de stad Gent de gebouwen. Het is omgevormd tot een tentoonstellingsruimte waar tijdelijke exposities plaatsvinden, vaak gratis. In een van de woonvertrekken is een reusachtig muurschilderij met resten van een fresco te bekijken (betalend).`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Caermersklooster`,
      desc: `Cet ancien monastère carmélitain était en usage dès la fin du XIIIe siècle. Outre les bâtiments monastiques, il possédait aussi une brasserie. Après la Révolution française, il passa en mains privées ; plus tard la ville de Gand racheta les bâtiments. Transformé en espace d'exposition pour des expositions temporaires de prestige, souvent gratuites. Dans un des logements, une immense peinture murale avec vestiges de fresque peut être visitée (payant).`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 21, lat: 51.0563, lon: 3.7179, extension: false,
    en: {
      name: `Sint-Stephanuskerk`,
      desc: `Saint Stephanus's Church also has a connection with the Mystic Lamb. During the Second World War, several panels of the world-famous 'Mystic Lamb' by the Van Eyck brothers were hidden here from the occupiers. The church can be entered early, from 6:30 to 12:30, and from 14:00 to 18:30.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Sint-Stephanuskerk`,
      desc: `Ook de Sint-Stephanuskerk heeft iets met het Lam Gods. Tijdens de Tweede Wereldoorlog werden hier immers een aantal panelen van het wereldberoemde 'Lam Gods' van de gebroeders Van Eyck verborgen gehouden voor de bezetters. Je kan er al vroeg binnen, van 6u30 tot 12u30, en van 14u tot 18u30.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Église Saint-Étienne`,
      desc: `L'église Saint-Étienne a aussi un lien avec l'Agneau Mystique. Pendant la Seconde Guerre mondiale, plusieurs panneaux du célèbre polyptyque des frères Van Eyck y furent cachés aux occupants. L'église est accessible dès 6h30–12h30, puis de 14h à 18h30.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 22, lat: 51.0560, lon: 3.7177, extension: false,
    en: {
      name: `Graffiti – Roa (Giant Rabbits)`,
      desc: `These giant rabbits leave little to the imagination. The Ghent street artist Roa has put animals on walls in several places around the world, each time in large format and often in black and white. You can find his work at other locations in Ghent too.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
    },
    nl: {
      name: `Graffiti – Roa (Reusachtige Konijnen)`,
      desc: `Deze reusachtige konijnen laten weinig aan de verbeelding over. De Gentse graffitikunstenaar Roa zette al op meerdere plaatsen in de wereld dieren op muren, telkens in groot formaat en vaak in zwart-wit. Je kan ook op andere plaatsen in Gent werk van hem gaan bekijken.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
    },
    fr: {
      name: `Graffiti – Roa (Lapins Géants)`,
      desc: `Ces lapins géants ne laissent que peu de place à l'imagination. L'artiste de street art gantois Roa a peint des animaux sur des murs en plusieurs endroits dans le monde, toujours en grand format et souvent en noir et blanc. On peut voir son œuvre à d'autres endroits dans Gand.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
    },
  },
  {
    id: 23, lat: 51.0568, lon: 3.7208, extension: false,
    en: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `The cosy inn of the House of Alijn (also accessible without museum visit) and its courtyard garden are a pleasant resting point. The museum in the 14th-century building grew from the Museum of Folklore — inside, objects, photos and films give a good impression of Ghent folk life before the mid-20th century. The house holds the original 'Manneke Pis of Ghent'; the statue now has two companions, girls called Luna and Lena. Nearby is the oldest sweet shop in Ghent, Huis Temmerman, selling treats with typically Ghent names.`,
      beer: ``,
      food: `Julie's House – Cup Cakes.`,
    },
    nl: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `De gezellige herberg van het Huis van Alijn (ook toegankelijk zonder museumbezoek) en de binnentuin zijn een aangenaam rustpunt. Het museum in het 14de-eeuwse godshuis groeide uit het Museum voor Volkskunde — binnen krijg je een goed beeld van het Vlaamse volksleven voor het midden van de 20ste eeuw. In het huis bevindt zich het originele 'Gentse Manneke Pis'; naast de replica staan nu ook twee meisjes, Luna en Lena. In de buurt is Huis Temmerman, de oudste snoepwinkel van Gent.`,
      beer: ``,
      food: `Julie's House – Cup Cakes.`,
    },
    fr: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `L'auberge conviviale du Huis van Alijn (accessible sans visite du musée) et son jardin sont une agréable halte. Le musée dans l'édifice du XIVe siècle, issu du Musée du Folklore, retrace la vie populaire gantoise avant le milieu du XXe siècle. La maison conserve l'original du 'Manneke Pis gantois' ; la réplique est maintenant accompagnée de deux filles, Luna et Lena. Tout près, la confiserie Huis Temmerman, la plus ancienne de Gand, vend des sucreries aux noms typiquement gantois.`,
      beer: ``,
      food: `Julie's House – Cupcakes.`,
    },
  },
  {
    id: 24, lat: 51.0572, lon: 3.7203, extension: false,
    en: {
      name: `Patershol`,
      desc: `The narrow medieval streets behind Kraanlei are the Patershol. In this old quarter, former inhabitants have been replaced by numerous restaurants. In the 18th century it was home to magistrates; in the 19th century to cotton factory workers. Today: Japanese and Indonesian food, Turkish, Italian, Spanish and traditional Flemish cuisine — all shoulder to shoulder in cobbled streets. Whether modern, romantic, eccentric or exclusive, you won't leave with an empty stomach.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Patershol`,
      desc: `De smalle middeleeuwse straatjes achter de Kraanlei zijn het Patershol. In deze oude wijk zijn de vroegere bewoners verdrongen door talrijke restaurantjes. In de 18de eeuw woonden er magistraten; in de 19de eeuw arbeiders uit de katoenfabrieken. Vandaag: Japans, Indonesisch, Turks, Italiaans, Spaans en Vlaams — allemaal naast elkaar in de kinderkopjesstraatjes. Of de stijl nu hip, romantisch, een beetje zot of exclusief is, de honger zal gestild zijn.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Patershol`,
      desc: `Les ruelles médiévales derrière le Kraanlei forment le Patershol. Dans ce vieux quartier, les anciens habitants ont été remplacés par de nombreux restaurants. Au XVIIIe siècle y vivaient des magistrats ; au XIXe siècle des ouvriers des filatures. Aujourd'hui : cuisine japonaise, indonésienne, turque, italienne, espagnole et flamande traditionnelle — côte à côte dans les ruelles pavées. Qu'il soit branché, romantique, un peu fou ou exclusif, vous ne repartirez pas le ventre vide.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 25, lat: 51.0574, lon: 3.7197, extension: false,
    en: {
      name: `Veerleplein`,
      desc: `In the corner stands the historic gateway to the Old Fish Market. Neptune supervises the Leie (woman) and the Scheldt (man). The tourist office is in the building. The long white table is a unique creation to discover Ghent. The lanterns on Sint-Veerleplein are an artwork by Alberto Garutti — every time a baby is born in a Ghent hospital, parents can press a button and the lanterns light up briefly. This square was once where witches were burned at the stake in the 16th–17th centuries.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
    },
    nl: {
      name: `Veerleplein`,
      desc: `In de hoek staat de historische toegangspoort tot de Oude Vismijn. Neptunus houdt toezicht op de Leie (vrouw) en de Schelde (man). In het gebouw is de toeristische dienst. De lange witte tafel is een heel bijzondere creatie om Gent te ontdekken. De lantaarns op het Sint-Veerleplein zijn een kunstwerk van Alberto Garutti — elke keer dat een baby wordt geboren in een Gents ziekenhuis, kunnen de ouders op een knop drukken en lichten de lantaarns even op. Ooit was dit plein de plaats waar heksen op de brandstapel werden gezet.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
    },
    fr: {
      name: `Veerleplein`,
      desc: `Dans le coin se trouve la porte historique du Vieux Marché aux Poissons. Neptune supervise la Leie (femme) et l'Escaut (homme). L'office de tourisme est dans le bâtiment. La grande table blanche est une création unique pour découvrir Gand. Les lanternes de Sint-Veerleplein sont une œuvre d'Alberto Garutti — à chaque naissance dans un hôpital gantois, les parents peuvent appuyer un bouton pour faire briller les lanternes. Cette place était autrefois le lieu des bûchers de sorcières aux XVIe–XVIIe siècles.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
    },
  },
  {
    id: 26, lat: 51.0568, lon: 3.7214, extension: false,
    en: {
      name: `Groot Vleeshuis & Groentemarkt`,
      desc: `A medieval hall from the early 15th century where you can find almost 200 East-Flemish regional products and specialties — and consume them on site. Above your head hang the famous Ghent 'Gandahammen'. Next door: 't Galgenhuis, the smallest café in Ghent — offal was sold here to those who couldn't afford meat; the 'galg' (gallows) in the name refers to convicts who waited at the rear façade. The Groentemarkt is famous for cuberdon stands ('Neuzekes') and the historic mustard house Vve Tierenteyn-Verlent; also home to Ghent's oldest bakery Oud Huis Himschoot and the Belgian Artisan Centre BAM.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
    },
    nl: {
      name: `Groot Vleeshuis & Groentemarkt`,
      desc: `Een middeleeuwse hal uit begin 15de eeuw voor bijna 200 Oost-Vlaamse streekproducten — die je ook ter plaatse kan eten. Boven je hoofd hangen de bekende Gentse Gandahammen. Aanpalend: 't Galgenhuis, het kleinste caféetje van Gent — ingewanden werden hier verkocht aan wie geen vlees kon betalen; 'galg' in de naam verwijst naar veroordeelden die bij de achtergevel wachtten. De Groentemarkt is beroemd om cuberdonstands ('Neuzekes') en het historische mosterdhuis Vve Tierenteyn-Verlent; ook adres van Gents oudste bakkerij Oud Huis Himschoot en het Belgian Artisan Centre BAM.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
    },
    fr: {
      name: `Grande Boucherie & Groentemarkt`,
      desc: `Une halle médiévale du début du XVe siècle proposant près de 200 produits régionaux de Flandre orientale — à consommer sur place. Au-dessus, les fameux 'Gandahammen'. À côté : 't Galgenhuis, le plus petit café de Gand — on y vendait des abats à ceux qui n'avaient pas les moyens d'acheter de la viande ; 'galg' (potence) rappelle les condamnés qui attendaient à la façade arrière. Le Groentemarkt est réputé pour ses stands de cuberdons ('Neuzekes') et la moutarderie historique Vve Tierenteyn-Verlent ; aussi siège de la plus ancienne boulangerie de Gand Oud Huis Himschoot et du Centre Artisanal Belge BAM.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
    },
  },
  {
    id: 27, lat: 51.0572, lon: 3.7234, extension: false,
    en: {
      name: `Dulle Griet`,
      desc: `The iron Dulle Griet ('Evil Woman') is 5 metres long and weighs 12,500 kg. Painted ox-red, earning it the nickname 'large red devil'. Little is known about this bombard (a type of cannon). It is said Duke Philip the Good ordered it made around 1430 and it may have been used in the siege of Oudenaarde in 1452 — though other sources say it never fired a single projectile. The opening was eventually sealed because it was too often used for rubbish or as a sleeping place by drunk students.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
    },
    nl: {
      name: `Dulle Griet`,
      desc: `De ijzeren Dulle Griet is vijf meter lang en 12.500 kg zwaar. Ossenrood geverfd, wat de bijnaam 'grooten rooden duvele' opleverde. Er is eigenlijk niet zoveel geweten over deze bombarde. Men zegt dat hertog Filips de Goede hem rond 1430 liet maken en dat hij gebruikt is bij het beleg van Oudenaarde in 1452 — andere bronnen zeggen dat hij nooit een projectiel heeft afgeschoten. De opening werd dichtgemaakt omdat studenten er te vaak in sliepen of vuilnis achterlieten.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
    },
    fr: {
      name: `Dulle Griet`,
      desc: `Le fer Dulle Griet ('Femme maléfique') mesure 5 mètres et pèse 12.500 kg. Peint en rouge bœuf, d'où le surnom de 'grand duvele rouge'. On sait peu de choses sur ce canon. Le duc Philippe le Bon l'aurait fait fabriquer vers 1430, utilisé lors du siège d'Audenarde en 1452 — d'autres sources affirment qu'il n'a jamais tiré. L'ouverture a été condamnée car les étudiants ivres y dormaient ou y laissaient des ordures.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
    },
  },
  {
    id: 28, lat: 51.0574, lon: 3.7259, extension: false,
    en: {
      name: `Vrijdagmarkt`,
      desc: `Jacob Van Artevelde's statue surveys the square from above. In the first half of the 14th century this Ghent-born statesman negotiated a trade agreement with Edward III of England, keeping the Ghent textile industry alive. He was later murdered by weavers. He points towards England — a nod to his ties with King Edward III. Since 1199 a weekly market has been held here every Friday. The Toreken (15th c.) was the guild house of the tanners; it now houses the Poetry Centre for Flanders. A statue of folk singer Karel Waeri, who sang about workers' poverty, stands nearby.`,
      beer: `De Dulle Griet – Vrijdagmarkt: vast selection of 500+ Belgian regional beers. Order a 'kwak' in a special glass and leave your shoe as deposit! De Afsnis – solid local brown café, featured in the film 'Belgica'.`,
      food: ``,
    },
    nl: {
      name: `Vrijdagmarkt`,
      desc: `Het standbeeld van Jacob Van Artevelde kijkt neer op het plein. In de eerste helft van de 14de eeuw onderhandelde deze Gentenaar met Edward III van Engeland om de Gentse lakennijverheid te redden. Hij werd later door wevers vermoord. Hij wijst richting Engeland — een knipoog naar zijn banden met Eduard III. Elke vrijdag al since 1199 is hier markt. Het Toreken (15de eeuw) was het gildehuis van de huidevetters; nu is het het Poëziecentrum voor Vlaanderen. Een standbeeld van volkszanger Karel Waeri, die zong over arbeidsarmoede, staat in de buurt.`,
      beer: `De Dulle Griet – Vrijdagmarkt: ruim aanbod van 500+ Belgische streekbieren. Bestel een 'kwak' in een speciaal glas — je schoen als borg! De Afsnis – bruine praatcafé, figureerde in de film 'Belgica'.`,
      food: ``,
    },
    fr: {
      name: `Vrijdagmarkt`,
      desc: `La statue de Jacob Van Artevelde domine la place. Au XIVe siècle, ce Gantois négocia un accord commercial avec Édouard III d'Angleterre pour maintenir l'industrie textile gantoise. Il fut ensuite assassiné par des tisserands. Il pointe vers l'Angleterre — un clin d'œil à ses liens avec le roi Édouard III. Un marché hebdomadaire se tient ici tous les vendredis depuis 1199. Le Toreken (XVe s.) était la guilde des tanneurs ; il abrite aujourd'hui le Centre de Poésie de Flandre. Une statue du chanteur populaire Karel Waeri se dresse à proximité.`,
      beer: `De Dulle Griet – Vrijdagmarkt : sélection de 500+ bières régionales belges. Commandez une 'kwak' dans un verre spécial — votre chaussure en caution! De Afsnis – café traditionnel, apparu dans le film 'Belgica'.`,
      food: ``,
    },
  },
  {
    id: 29, lat: 51.0558, lon: 3.7246, extension: false,
    en: {
      name: `Gruut Stadsbrouwerij`,
      desc: `Founded in 2009 by Annick De Splenter, who grew up working in the brewing world. There are five varieties of beer, four of which are brewed using herbs instead of hops — reviving a medieval tradition. Both café and brewery (free to visit) are under one roof.`,
      beer: `Gruut Stadsbrouwerij – on-site brewery café.`,
      food: ``,
    },
    nl: {
      name: `Gentse Gruut Stadsbrouwerij`,
      desc: `Opgericht in 2009 door Annick De Splenter, die van huize uit altijd in de brouwerijwereld werkte. Er zijn vijf variëteiten bier, waarvan vier gebrouwen met kruiden i.p.v. hop — een herleven van de middeleeuwse traditie. Zowel café als brouwerij (vrij te bezichtigen) zijn onder één dak.`,
      beer: `Gruut Stadsbrouwerij – brouwerijcafé ter plaatse.`,
      food: ``,
    },
    fr: {
      name: `Gentse Gruut (Brasserie de la Ville)`,
      desc: `Fondée en 2009 par Annick De Splenter, qui a grandi dans le monde de la brasserie. Cinq variétés de bières, dont quatre brassées aux herbes plutôt qu'au houblon — une tradition médiévale ressuscitée. Café et brasserie (visite gratuite) sont sous le même toit.`,
      beer: `Gruut Stadsbrouwerij – café-brasserie sur place.`,
      food: ``,
    },
  },
  {
    id: 30, lat: 51.0558, lon: 3.7249, extension: false,
    en: {
      name: `Sint-Jacobskerk (Saint-James' Church)`,
      desc: `Around the middle of the 12th century, the current Saint-James' Church was begun. One of the most beautiful works of art is a Renaissance tabernacle of black marble and copper. The church is only open on Fridays and Saturdays in the morning. A flea market takes place at the church every Friday, Saturday and Sunday morning. Every July for ten days, Ghent's great folk festival erupts here: Sint-Jacobs is the vibrant core of the Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
    },
    nl: {
      name: `Sint-Jacobskerk`,
      desc: `Rond het midden van de 12de eeuw werd begonnen aan de huidige Sint-Jacobskerk. Een van de mooiste kunstwerken is een tabernakel van zwart marmer en koper uit de renaissancetijd. De kerk is slechts beperkt open, enkel op vrijdag en zaterdagochtend. Elke vrijdag-, zaterdag- en zondagochtend is er een brocantemarkt. Elke juli, tien dagen lang, is Sint-Jacobs de bruisende kern van de Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
    },
    fr: {
      name: `Église Saint-Jacques`,
      desc: `Vers le milieu du XIIe siècle, l'actuelle église Saint-Jacques a été construite. L'une des plus belles œuvres est un tabernacle Renaissance en marbre noir et cuivre. L'église n'est ouverte que les vendredi et samedi matin. Un marché aux puces s'y tient chaque vendredi, samedi et dimanche matin. Chaque juillet pendant dix jours, Sint-Jacobs est le cœur vibrant des Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
    },
  },
  {
    id: 31, lat: 51.0545, lon: 3.7232, extension: false,
    en: {
      name: `Werregarenstraat (Graffiti Street)`,
      desc: `Officially the Werregarenstraatje but better known as the Graffiti Street, between Hoogpoort and Onderstraat. Since 1995, anyone who feels called to leave a creation here may do so — with one rule: don't attack works that are better than what you can shake out of your spray can. The appearance changes regularly. It is one of four officially tolerated graffiti locations in Ghent. The city also runs graffiti projects, workshops and an annual jam.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Werregarenstraat (Graffitistraatje)`,
      desc: `Officieel het Werregarenstraatje maar beter gekend als het graffitistraatje, tussen de Hoogpoort en de Onderstraat. Vanaf 1995 mag iedereen die zich geroepen voelt zijn creatie achterlaten — met maar één regel: ga geen werken te lijf die beter zijn dan wat jij uit jouw spuitbus kan schudden. Het uitzicht verandert regelmatig. Een van vier officieel gedoogde graffitilocaties in Gent. De stad organiseert ook graffiti-projecten, workshops en een jaarlijkse jam.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Werregarenstraat (Rue du Graffiti)`,
      desc: `Officiellement la Werregarenstraatje, mais mieux connue sous le nom de 'Rue du Graffiti', entre le Hoogpoort et l'Onderstraat. Depuis 1995, toute personne qui se sent inspirée peut y laisser une création — avec une seule règle : ne pas attaquer les œuvres meilleures que ce que vous pouvez sortir de votre bombe. L'apparence change régulièrement. C'est l'un des quatre endroits officiellement tolérés pour le graffiti à Gand.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 32, lat: 51.0524, lon: 3.7227, extension: false,
    en: {
      name: `Stadhuis (Town Hall)`,
      desc: `The central part of the Town Hall dates from the 15th century, with various additions in different architectural styles. The Hoogpoort side looks particularly rich — niches depict the Counts of Flanders. The Botermarkt side shows Renaissance style (late 16th – early 17th century) with three column types (Doric, Ionic, Corinthian). A striking blue-and-white drainpipe on the building — coloured since 2002 — appears to reference AA Gent football colours, but monuments conservation says it is an authentic reconstruction.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
    },
    nl: {
      name: `Stadhuis`,
      desc: `Het centrale gedeelte van het Stadhuis dateert uit de 15de eeuw, met uiteenlopende toevoegingen in verschillende bouwstijlen. De kant van de Hoogpoort is bijzonder rijk — in de nissen staan de graven van Vlaanderen. De Botermarktzijde toont de renaissancestijl (eind 16de – begin 17de eeuw) met de drie kolomtypes (Dorisch, Ionisch, Korintisch). Een opvallende blauw-witte regenpijp — zo gekleurd since 2002 — lijkt te verwijzen naar de kleuren van AA Gent; Monumentenzorg zegt echter dat het een authentieke reconstructie is.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
    },
    fr: {
      name: `Hôtel de Ville`,
      desc: `La partie centrale de l'Hôtel de Ville date du XVe siècle, avec diverses adjonctions dans différents styles architecturaux. Le côté Hoogpoort est particulièrement riche — les niches représentent les comtes de Flandre. Le côté Botermarkt montre le style Renaissance (fin XVIe – début XVIIe s.) avec trois types de colonnes (dorique, ionique, corinthien). Un remarquable tuyau bleu et blanc — coloré depuis 2002 — semble référencer les couleurs du club de foot AA Gent, mais la protection des monuments affirme qu'il s'agit d'une reconstruction authentique.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
    },
  },
  {
    id: 33, lat: 51.0521, lon: 3.7232, extension: false,
    en: {
      name: `Biezekapel`,
      desc: `The Biezekapel is one of the oldest chapels in the city. The present chapel dates from the early 18th century, but a statue of Mary in a niche was placed here as early as 1608 by Jean-Baptiste de Rodoan. Under French rule in 1794 the chapel was sealed; after restoration it was rededicated in 1931. You have to press your nose almost against the window to see the beautiful statue. In 1934 it was rumoured that the stolen panel of the 'Just Judges' from the Mystic Lamb was hidden here.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Biezekapel`,
      desc: `De Biezekapel is een van de oudst gekende kapellen van de stad. De huidige kapel dateert van het begin van de 18de eeuw, maar al in 1608 stond er een Mariabeeldje in een nis, geplaatst door Jean-Baptiste de Rodoan. Tijdens de Franse overheersing in 1794 werd het kapelletje dichtgemetseld; na restauratie volgde een herinwijding in 1931. Je moet met de neus bijna tegen het raam staan om het prachtige beeld te kunnen zien. In 1934 werd gedacht dat hier het gestolen paneel van de Rechtvaardige Rechters verborgen zat.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Biezekapel`,
      desc: `La Biezekapel est l'une des plus anciennes chapelles de la ville. La chapelle actuelle date du début du XVIIIe siècle, mais dès 1608 une statue de Marie y fut placée dans une niche par Jean-Baptiste de Rodoan. Sous la domination française en 1794, la chapelle fut murée ; restaurée, elle fut réinaugurée en 1931. Il faut coller son nez à la fenêtre pour voir la belle statue. En 1934, on crut que le panneau volé des 'Juges Équitables' y était caché.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 34, lat: 51.0518, lon: 3.7239, extension: false,
    en: {
      name: `Sint-Baafskathedraal (Saint-Bavo's Cathedral)`,
      desc: `The predecessor 'Sint-Janskerk' existed in the 10th century. The present cathedral only received that status when the Diocese of Ghent was founded in 1559. Gothic elements were added from the late 13th century; the completely renovated cathedral was consecrated in 1659. Charles V was baptized here in 1500. Don't miss: the rococo pulpit, baroque high altar, choir stalls with stunning trompe-l'œil, paintings by Rubens and Joos van Wassenhover. Above all: 'The Mystic Lamb' by the Van Eyck brothers, one of the most famous paintings in the world — and the gripping story of a stolen panel ('the Just Judges') in 1934.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Sint-Baafskathedraal`,
      desc: `De voorloper 'Sint-Janskerk' bestond al in de 10de eeuw. De huidige kathedraal kreeg die status pas bij de oprichting van het bisdom Gent in 1559. Gotische elementen werden toegevoegd vanaf eind 13de eeuw; de volledig vernieuwde kerk werd in 1659 ingewijd. Keizer Karel werd er in 1500 gedoopt. Bezienswaardig: de rococopreekstoel, het barokke hoogaltaar, koorgestoelte met schitterende trompe-l'œil, schilderijen van Rubens en Joos van Wassenhover. Bovenal: 'Het Lam Gods' van de gebroeders Van Eyck, een van de bekendste schilderijen ter wereld — en het fascinerende verhaal van het gestolen paneel ('de rechtvaardige rechters') in 1934.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Cathédrale Sint-Baaf`,
      desc: `La prédécesseure 'Sint-Janskerk' existait dès le Xe siècle. La cathédrale actuelle ne reçut ce titre qu'à la fondation du diocèse de Gand en 1559. Des éléments gothiques furent ajoutés dès la fin du XIIIe siècle ; la cathédrale entièrement rénovée fut consacrée en 1659. Charles Quint y fut baptisé en 1500. À ne pas manquer : la chaire rococo, le maître-autel baroque, les stalles avec trompe-l'œil époustouflants, des peintures de Rubens et Joos van Wassenhover. Surtout : 'L'Agneau Mystique' des frères Van Eyck, l'un des tableaux les plus célèbres du monde — et l'histoire fascinante du panneau volé ('les Juges Équitables') en 1934.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 35, lat: 51.0505, lon: 3.7233, extension: false,
    en: {
      name: `Bisschoppelijk Paleis (Episcopal Palace)`,
      desc: `Construction of the Episcopal Palace began in 1843 and was completed just two years later. Above the main entrance door is the coat of arms of its builder, Bishop Louis Joseph Delbecque. Cross the nearby Wijdenaardbrug ('wide mooring place') — since the end of 2018 the water of the Lower Scheldt flows under this bridge again towards Portus Ganda, where the Leie and Scheldt once joined.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Bisschoppelijk Paleis`,
      desc: `De bouw van het Bisschoppelijk Paleis werd aangevat in 1843 en twee jaar later al voltooid. Boven de voornaamste toegangsdeur prijkt het wapenschild van de bouwheer, bisschop Louis Joseph Delbecque. Steek de nabijgelegen Wijdenaardbrug over ('brede aanlegplaats') — depuis eind 2018 stroomt het water van de Nederschelde weer onder de brug door naar Portus Ganda, waar vroeger de Leie en de Schelde samenvloeiden.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Palais Épiscopal`,
      desc: `La construction du Palais Épiscopal débuta en 1843 et s'acheva deux ans plus tard. Au-dessus de la porte principale se trouve le blason du bâtisseur, Mgr Louis Joseph Delbecque. Traversez le Wijdenaardbrug voisin ('large place d'accostage') — depuis fin 2018, l'eau de l'Escaut inférieur coule à nouveau sous ce pont vers Portus Ganda, là où la Leie et l'Escaut se rejoignaient jadis.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 36, lat: 51.0499, lon: 3.7219, extension: false,
    en: {
      name: `Geraard de Duivelsteen`,
      desc: `Despite the name, no devil ever lived in this 'Steen' (stone building). It owes its name to Gerard of Ghent, an unsavoury character born around 1210 who owned the building in the 13th century. He called himself 'knight Gerard of Ghent, nicknamed the Devil'. Legend says he killed his father, kicked his son to death, and occupied himself with 'debauchery, shame and horror'. After his death the building passed to the city: it has since been an arsenal, school, monastery, prison, disciplinary house and home for the mentally ill.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Geraard de Duivelsteen`,
      desc: `Ondanks de naam heeft nooit een duivel in dit steen gewoond. Het dankt zijn naam aan Geraard van Gent, een onguur heerschap geboren rond 1210. Hij noemde zichzelf 'ridder Geraard van Gent, bijgenaamd de Duivel'. Legende zegt dat hij zijn vader vermoordde, zijn zoontje doodschopte, en zich bezig hield met 'brasserijen, schanddaden en gruwelen'. Na zijn dood ging het steen naar de stad: sindsdien was het achtereenvolgens wapenarsenaal, school, klooster, gevangenis, tuchthuis en huis voor krankzinnigen.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Geraard de Duivelsteen`,
      desc: `Malgré le nom, aucun diable ne vécut jamais dans cette 'Steen' (bâtiment en pierre). Elle doit son nom à Gérard de Gand, un personnage douteux né vers 1210 qui possédait cet édifice au XIIIe siècle. Il se faisait appeler 'le chevalier Gérard de Gand, surnommé le Diable'. La légende dit qu'il tua son père, mit son fils à mort à coups de pied, et s'occupait de 'débauches, honte et horreurs'. Après sa mort, l'édifice passa à la ville : il fut successivement arsenal, école, monastère, prison, maison de correction et asile.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 37, lat: 51.0490, lon: 3.7213, extension: false,
    en: {
      name: `De Kouter`,
      desc: `Thanks to the daily flower market, you can see a colourful mosaic of blossoms on the Kouter every day of the year. At the blue Kiosk around 11 o'clock real bon vivants gather — this monument transformed into an aperitif bar offers a glass of cava, fresh oysters and other appetisers. Music lovers should also visit: the 19th-century Ghent Opera and concert hall De Handelsbeurs are found here.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `De Kouter`,
      desc: `Dankzij de dagelijkse bloemenmarkt zie je op de Kouter élke dag van het jaar een bonte mozaïek van bloesems. Aan de Blauwe Kiosk verzamelen zich zo rond een uur of elf de echte genieters — dit tot aperobar omgetoverd monument voorziet fijnproevers van cava, verse oesters en andere amuse-gueules. Wie houdt van muziek moet ook op de Kouter zijn: de 19de-eeuwse Gentse Opera en concertzaal De Handelsbeurs zijn hier te vinden.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `De Kouter`,
      desc: `Grâce au marché aux fleurs quotidien, le Kouter affiche une mosaïque colorée de fleurs tous les jours de l'année. Au Kiosque Bleu vers 11h se rassemblent les vrais connaisseurs — ce monument transformé en bar à apéritif propose cava, huîtres fraîches et amuse-gueules. Les amateurs de musique trouveront aussi ici l'Opéra de Gand du XIXe siècle et la salle de concert De Handelsbeurs.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 38, lat: 51.0474, lon: 3.7236, extension: false,
    en: {
      name: `De Krook (Library)`,
      desc: `De Krook is much more than a library — a striking mix of steel and concrete that you can simply walk into. There is a cafeteria with a terrace with a beautiful view, a reading room, a study room, a multipurpose room; you can work with a 3D printer, learn about virtual reality, surf the internet. The name 'krook' is an old word for crease or fold, referring to the bend the Scheldt makes around the Waalse Krook, where ships once unloaded coal from Wallonia.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `De Krook (Bibliotheek)`,
      desc: `De Krook is veel meer dan de bibliotheek — een opvallende mix van staal en beton waar je zomaar kan binnenwandelen. Er is een cafetaria met terras met mooi uitzicht, een leeszaal, studiezaal, polyvalente ruimte; je kan er werken met een 3D-printer, leren over virtual reality, surfen op het internet. 'Krook' is een oud woord voor kreuk of vouw, verwijzend naar de bocht die de Schelde maakt rond de Waalse Krook, waar schepen vroeger steenkool uit Wallonië losten.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `De Krook (Bibliothèque)`,
      desc: `De Krook est bien plus qu'une bibliothèque — un remarquable mélange d'acier et de béton où l'on peut simplement entrer. Il y a une cafétéria avec terrasse vue imprenable, une salle de lecture, de travail, polyvalente ; vous pouvez utiliser une imprimante 3D, découvrir la réalité virtuelle, surfer sur internet. Le mot 'krook' est un vieux terme pour pli ou coude, référençant le coude que fait l'Escaut autour de la Waalse Krook, où les navires déchargeaient jadis du charbon de Wallonie.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 39, lat: 51.0468, lon: 3.7229, extension: false,
    en: {
      name: `Het Wintercircus`,
      desc: `In 1885 the 'Nieuw Cirkus' was built here, one of several stone circuses constructed in 19th-century Belgian cities. After a 1920 fire and reconstruction, it became a garage after WWII and then a vintage car depot for 20 years. The city bought it in 2005 and after five years of intensive renovation, the building reopened in 2024. The central arena is now a publicly accessible covered square; Club Wintercircus (concert hall for 500) is housed below. Winner of the Ghent Monument Prize 2022.`,
      beer: ``,
      food: `Bakker Klaas – fresh bread. Sakas by chef Yoshi – sublime sushi. Bar Bougie or Rooftopbar Bassie – refreshing drinks.`,
    },
    nl: {
      name: `Het Wintercircus`,
      desc: `In 1885 werd het 'Nieuw Cirkus' gebouwd, een van de stenen circussen die in 19de-eeuwse Belgische steden werden opgericht. Na een brand in 1920 en heropbouw werd het na WOII een garage en daarna 20 jaar depot voor oldtimers. De stad kocht het in 2005 en na vijf jaar intensieve renovatie heropende het in 2024. De middenpiste is nu een publiek toegankelijk overdekt plein; Club Wintercircus (concertzaal voor 500) zit eronder. Winnaar van de Gentse Monumentenprijs 2022.`,
      beer: ``,
      food: `Bakker Klaas – vers brood. Sakas by chef Yoshi – sublieme sushi. Bar Bougie of Rooftopbar Bassie – verkwikkende drankjes.`,
    },
    fr: {
      name: `Het Wintercircus`,
      desc: `En 1885 fut construit le 'Nieuw Cirkus', l'un des nombreux cirques en pierre érigés dans les villes belges du XIXe siècle. Après un incendie en 1920 et reconstruction, il devint un garage après la Seconde Guerre mondiale, puis un dépôt de voitures anciennes pendant 20 ans. La ville l'acheta en 2005 et après cinq ans de rénovation intensive, le bâtiment rouvrit en 2024. L'arène centrale est désormais une place couverte publique ; le Club Wintercircus (salle de concert de 500 places) est logé en dessous. Lauréat du Prix du Monument de Gand 2022.`,
      beer: ``,
      food: `Bakker Klaas – pain frais. Sakas by chef Yoshi – sushi sublimes. Bar Bougie ou Rooftopbar Bassie – boissons revigorantes.`,
    },
  },
  {
    id: 40, lat: 51.0462, lon: 3.7240, extension: false,
    en: {
      name: `De Vooruit`,
      desc: `The Vooruit is a historic hall complex from 1913, originally the party and arts centre of the Ghent workers' movement, with a ballroom, cinema and theatre group. Since 1982, the arts centre Vooruit vzw uses the 5 main halls (Ballroom, Theaterzaal, Domzaal, Concertzaal and Café) for debates, literary evenings, concerts, parties, dance and stage performances.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `De Vooruit`,
      desc: `De Vooruit is een historisch zalencomplex uit 1913, oorspronkelijk het feest- en kunstencentrum van de Gentse arbeidersbeweging, met een balzaal, cinema en theatergroep. Depuis 1982 gebruikt vzw Kunstencentrum Vooruit de 5 belangrijkste zalen (Balzaal, Theaterzaal, Domzaal, Concertzaal en Café) voor debatten, literatuuravonden, concerten, party's, dans en podiumvoorstellingen.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `De Vooruit`,
      desc: `Le Vooruit est un complexe de salles historiques de 1913, à l'origine le centre culturel et festif du mouvement ouvrier gantois, avec une salle de bal, un cinéma et une troupe de théâtre. Depuis 1982, le Kunstencentrum Vooruit vzw utilise les 5 salles principales (Ballroom, Theaterzaal, Domzaal, Concertzaal et Café) pour des débats, soirées littéraires, concerts, fêtes, danse et spectacles.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 41, lat: 51.0451, lon: 3.7237, extension: false,
    en: {
      name: `Boekentoren (Book Tower)`,
      desc: `The 64-metre Book Tower was designed by Belgian architect Henry Van de Velde and is the most striking example of modernist architecture in the city. As the main warehouse of Ghent University Library, the tower houses some 3 million books — 46 kilometres of shelves. It is an important symbol for both the university and the city of Ghent.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Boekentoren`,
      desc: `De 64 meter hoge Boekentoren werd ontworpen door de Belgische architect Henry Van de Velde en is het meest opvallende voorbeeld van modernistische architectuur in de stad. Als de belangrijkste opslagplaats van de Gentse universiteitsbibliotheek herbergt de toren zo'n 3 miljoen boeken — 46 kilometer boekenrekken. Het is een belangrijk symbool voor zowel de universiteit als de stad Gent.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Boekentoren (Tour du Livre)`,
      desc: `La Tour du Livre de 64 mètres, conçue par l'architecte belge Henry Van de Velde, est l'exemple le plus frappant d'architecture moderniste de la ville. Principal entrepôt de la bibliothèque universitaire de Gand, la tour abrite quelque 3 millions de livres — 46 kilomètres de rayonnages. C'est un symbole important pour l'université et la ville.`,
      beer: ``,
      food: ``,
    },
  },
  {
    id: 42, lat: 51.0438, lon: 3.7248, extension: false,
    en: {
      name: `Sint-Pietersplein & Sint-Pietersabdij`,
      desc: `The Sint-Pietersplein is in the heart of the student district. Every July the Mid-Lent Fair sets up here; it has also hosted intimate concerts by Prince, Björk and others. The 7th-century Benedictine Saint Peter's Abbey grew into a real village with farms, gardens and farmland. The ground floor of the abbey is free; guided with the unique movie guide 'Alison' — 17 episodes with digital monk Alison. The abbey garden, with its vineyard and ruins, is a green city oasis popular with students. If you exit right on Overpoort you'll find 35+ student cafés side by side — Thursday is the big student night.`,
      beer: `De Geus van Gent – Kantienberg 9 (nearby).`,
      food: ``,
    },
    nl: {
      name: `Sint-Pietersplein & Sint-Pietersabdij`,
      desc: `Het Sint-Pietersplein ligt in het hart van de studentenbuurt. Elke juli staat hier de Halfvastenfoor; ook het decor van intieme concerten van Prince, Björk en anderen. De 7de-eeuwse Benedictijnenabdij groeide uit tot een echt abdijdorp. Het gelijkvloers van de abdij is gratis te bezoeken; met de unieke movieguide 'Alison' — 17 afleveringen met de digitale monnik Alison. De abdijstuin met wijngaard en ruïne is een groene oase geliefd bij studenten. Rechts uitstappen op de Overpoort: meer dan 35 studentencafés naast elkaar — donderdagavond is dé studentenavond.`,
      beer: `De Geus van Gent – Kantienberg 9 (in de buurt).`,
      food: ``,
    },
    fr: {
      name: `Sint-Pietersplein & Abbaye Saint-Pierre`,
      desc: `La Sint-Pietersplein est au cœur du quartier étudiant. En juillet la foire du mi-carême s'y installe ; elle a aussi accueilli des concerts intimes de Prince, Björk et d'autres. L'abbaye bénédictine du VIIe siècle s'est développée en un véritable village abbatial. Le rez-de-chaussée est libre ; visite guidée avec le guide vidéo unique 'Alison' — 17 épisodes avec le moine numérique Alison. Le jardin abbatial avec vigne et ruines est une oasis verte prisée des étudiants. Si vous sortez à droite sur l'Overpoort, vous trouverez 35+ cafés étudiants côte à côte — le jeudi soir est la grande soirée étudiante.`,
      beer: `De Geus van Gent – Kantienberg 9 (à proximité).`,
      food: ``,
    },
  },
  {
    id: 43, lat: 51.0435, lon: 3.7252, extension: false,
    en: {
      name: `Wereld van Kina – The House`,
      desc: `The House is a museum where children and adults fall from one surprise to another: a unique fossil of a prehistoric reptile, a beautiful diorama room with native birds, and an interactive exhibition with thousands of rocks and minerals. The abbey garden can be reached through the courtyard of the Wereld van Kina — enter the courtyard and on the left-hand side is a gate that gives access to this green oasis. From here, cross the water and turn left into Ter Plaeten — back to Scheldepunt.`,
      beer: ``,
      food: ``,
    },
    nl: {
      name: `Wereld van Kina – Het Huis`,
      desc: `Het Huis is een museum waar je kinderen en jijzelf van de ene verrassing in de andere vallen: een uniek fossiel van een prehistorisch reptiel, een prachtige dioramazaal met inheemse vogels en een interactieve tentoonstelling met duizenden gesteenten en mineralen. De abdijstuin bereik je via de binnenplaats van de Wereld van Kina — links voor je is er een poort. Van hier ga je over het water en sla je linksaf Ter Plaeten in — terug naar het Scheldepunt.`,
      beer: ``,
      food: ``,
    },
    fr: {
      name: `Wereld van Kina – La Maison`,
      desc: `La Maison est un musée où enfants et adultes passent d'une surprise à l'autre : un fossile unique d'un reptile préhistorique, une magnifique salle diorama avec des oiseaux indigènes, et une exposition interactive avec des milliers de roches et minéraux. Le jardin abbatial se rejoint via la cour du Wereld van Kina — sur votre gauche se trouve un portail. De là, traversez l'eau et tournez à gauche dans Ter Plaeten — retour au Scheldepunt.`,
      beer: ``,
      food: ``,
    },
  },
];


function getStopLang(stop) {
  const lang = window.currentLang || 'en';
  return stop[lang] || stop.en;
}

// Searchable place names per stop, so "Navigate here" opens the real landmark
// in Google Maps instead of dropping a pin on bare coordinates.
const STOP_QUERIES = {
  1: 'Ter Plaeten 99, Gent',
  2: 'Kinepolis Gent',
  3: 'Muinkpark, Gent',
  4: 'Woodrow Wilsonplein, Gent',
  5: 'Belfort, Gent',
  6: 'Stadshal, Gent',
  7: 'Korenmarkt, Gent',
  8: '1898 The Post, Korenmarkt, Gent',
  9: 'Sint-Niklaaskerk, Gent',
  10: 'Sint-Michielshelling, Gent',
  11: 'Sint-Michielskerk, Gent',
  12: 'Graslei, Gent',
  13: 'Design Museum Gent',
  14: 'Gravensteen, Gent',
  15: 'Karmelietenklooster, Burgstraat, Gent',
  16: 'Oud Begijnhof Sint-Elisabeth, Gent',
  17: 'Prinsenhof, Gent',
  18: 'Brug der Keizerlijke Geneugten, Gent',
  19: 'Sint-Widostraat, Gent',
  20: 'Caermersklooster, Gent',
  21: 'Sint-Stefanuskerk, Gent',
  22: 'Oudburg, Gent',
  23: 'Huis van Alijn, Gent',
  24: 'Patershol, Gent',
  25: 'Sint-Veerleplein, Gent',
  26: 'Groot Vleeshuis, Gent',
  27: 'Dulle Griet kanon, Grootkanonplein, Gent',
  28: 'Vrijdagmarkt, Gent',
  29: 'Gruut Stadsbrouwerij, Gent',
  30: 'Sint-Jacobskerk, Gent',
  31: 'Werregarenstraat, Gent',
  32: 'Stadhuis Gent, Botermarkt',
  33: 'Biezekapel, Biezekapelstraat, Gent',
  34: 'Sint-Baafskathedraal, Gent',
  35: 'Bisschoppelijk Paleis, Gent',
  36: 'Geraard de Duivelsteen, Gent',
  37: 'Kouter, Gent',
  38: 'De Krook, Gent',
  39: 'Wintercircus, Gent',
  40: 'Vooruit, Sint-Pietersnieuwstraat, Gent',
  41: 'Boekentoren, Gent',
  42: 'Sint-Pietersplein, Gent',
  43: 'Wereld van Kina Het Huis, Gent',
};

function stopMapsUrl(stop) {
  const q = STOP_QUERIES[stop.id] || `${getStopLang(stop).name}, Gent`;
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
}

const StopCard = ({ stop, open, onToggle }) => {
  const lang = getStopLang(stop);
  const isExt = stop.extension;
  const mapsUrl = stopMapsUrl(stop);
  const LinkText = window.Linkify || (({ text }) => text);

  return (
    <div style={{
      borderBottom: '1px solid var(--rule)',
      background: open ? 'var(--cream)' : 'transparent',
    }}>
      <button onClick={onToggle} style={{
        width: '100%', textAlign: 'left',
        background: 'transparent', border: 'none',
        padding: '13px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        cursor: 'pointer',
      }}>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: '0.1em',
          color: 'var(--ink-mute)', flexShrink: 0, width: 26,
        }}>
          {String(stop.id).padStart(2, '0')}
        </span>
        <span style={{
          flex: 1, fontSize: 14.5,
          fontFamily: 'Newsreader, serif', fontWeight: 500,
          color: 'var(--ink)',
        }}>
          {lang.name}
        </span>
        {isExt && (
          <span className="mono" style={{
            fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'var(--moss)', color: 'var(--paper)',
            padding: '2px 6px', flexShrink: 0,
          }}>
            {window.t('walk.extension')}
          </span>
        )}
        <Icon name="arrow" size={14} stroke="var(--ink-mute)"
          style={{ flexShrink: 0, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ padding: '0 14px 14px 50px' }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 10px', whiteSpace: 'pre-wrap' }}>
            <LinkText text={lang.desc} />
          </p>
          {lang.beer && (
            <div style={{ marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terra)', display: 'block', marginBottom: 3 }}>
                🍺 {window.t('walk.beer')}
              </span>
              <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}><LinkText text={lang.beer} /></span>
            </div>
          )}
          {lang.food && (
            <div style={{ marginBottom: 10 }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--moss)', display: 'block', marginBottom: 3 }}>
                🍽 {window.t('walk.food')}
              </span>
              <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}><LinkText text={lang.food} /></span>
            </div>
          )}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 12, color: 'var(--ink-mute)',
              textDecoration: 'none',
            }}
          >
            <Icon name="pin" size={12} stroke="var(--ink-mute)" />
            {window.t('walk.open_maps')}
          </a>
        </div>
      )}
    </div>
  );
};

const WalkSection = () => {
  const [openId, setOpenId] = useStateW(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  const fullStops = TOUR_STOPS.length;
  const shortStops = TOUR_STOPS.filter(s => !s.extension).length;

  // Alternative to the GPX file: a walking route through every stop that opens
  // directly in Google Maps — no GPX app required.
  const routeUrl = 'https://www.google.com/maps/dir/'
    + TOUR_STOPS.map(s => `${s.lat},${s.lon}`).join('/')
    + '/data=!4m2!4m1!3e2';

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '20px 16px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>{window.t('walk.eyebrow')}</div>
        <h1 className="serif" style={{ fontSize: 26, margin: '0 0 6px', lineHeight: 1.1 }}>
          {window.t('walk.title')}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 14px', lineHeight: 1.5 }}>
          {window.t('walk.subtitle')}
        </p>

        {/* The story behind the name */}
        <div style={{
          background: 'rgba(184,74,44,0.06)', border: '1px solid rgba(184,74,44,0.18)',
          padding: '12px 14px', marginBottom: 16,
        }}>
          <div className="eyebrow" style={{ color: 'var(--terra-deep)', marginBottom: 6 }}>
            {window.t('walk.story_title')}
          </div>
          <p className="serif" style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: 'var(--ink)' }}>
            {window.t('walk.story')}
          </p>
        </div>

        {/* Distance badges */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{
            background: 'var(--cream)', border: '1px solid var(--rule)',
            padding: '7px 12px', fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="pin" size={13} stroke="var(--ink)" />
            <span>{window.t('walk.full_dist')}</span>
          </div>
          <div style={{
            background: 'var(--cream)', border: '1px solid var(--rule)',
            padding: '7px 12px', fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="pin" size={13} stroke="var(--ink-mute)" />
            <span style={{ color: 'var(--ink-mute)' }}>{window.t('walk.short_dist')}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
          <a
            href="ghent-walk.gpx"
            download="ghent-walk.gpx"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'var(--ink)', color: 'var(--paper)',
              padding: '10px 16px', border: 'none',
              fontSize: 13, textDecoration: 'none',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            <Icon name="arrow" size={14} stroke="var(--paper)" style={{ transform: 'rotate(90deg)' }} />
            {window.t('walk.download_gpx')}
          </a>
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'transparent', color: 'var(--ink)',
              padding: '10px 16px', border: '1px solid var(--ink)',
              fontSize: 13, textDecoration: 'none',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            <Icon name="pin" size={14} stroke="var(--ink)" />
            {window.t('walk.open_route')}
          </a>
        </div>

        {/* No-GPX alternative note */}
        <div style={{
          background: 'var(--cream)', border: '1px solid var(--rule)',
          padding: '10px 12px', marginBottom: 16,
          fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.5,
        }}>
          {window.t('walk.no_gpx_note')}
        </div>

        {/* Extension note */}
        <div style={{
          background: 'rgba(59,78,51,0.07)', border: '1px solid rgba(59,78,51,0.2)',
          padding: '10px 12px', marginBottom: 16,
          display: 'flex', gap: 8, alignItems: 'flex-start',
        }}>
          <span className="mono" style={{
            fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'var(--moss)', color: 'var(--paper)',
            padding: '2px 6px', marginTop: 1, flexShrink: 0,
          }}>{window.t('walk.extension')}</span>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
            {window.t('walk.extension_note')}
          </span>
        </div>
      </div>

      <hr className="rule" />

      {/* Stop list */}
      <div>
        {TOUR_STOPS.map(stop => (
          <StopCard
            key={stop.id}
            stop={stop}
            open={openId === stop.id}
            onToggle={() => toggle(stop.id)}
          />
        ))}
      </div>
    </div>
  );
};

window.WalkSection = WalkSection;
