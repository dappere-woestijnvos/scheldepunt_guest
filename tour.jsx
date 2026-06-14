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
      nav: `Follow the left arm of the Scheldt along Ter Plaeten and walk under the bridge, past the Kinepolis.`,
    },
    nl: {
      name: `Scheldepunt (Start & Einde)`,
      desc: `De naam 'Scheldepunt' verwijst naar de splitsing van de Schelde pal bij dit gebouw. De Schelde ontspringt in Noord-Frankrijk (Gouy) en stroomt via België en Nederland naar de Noordzee. De linkerarm verbindt de Leie met de Schelde en wordt de Bovenschelde of Muinkschelde genoemd. De wandeling start met het volgen van de linkerarm via Ter Plaeten, onder de brug voorbij de Kinepolis.`,
      beer: ``,
      food: ``,
      nav: `Volg de linkerarm van de Schelde via Ter Plaeten en wandel onder de brug door, voorbij de Kinepolis.`,
    },
    fr: {
      name: `Scheldepunt (Départ & Arrivée)`,
      desc: `Le nom 'Scheldepunt' désigne la jonction de l'Escaut à cet immeuble. L'Escaut prend naissance dans le nord de la France (Gouy) et passe par la Belgique et les Pays-Bas pour atteindre la mer du Nord. Le bras gauche relie la Leie à l'Escaut et s'appelle l'Escaut supérieur. La promenade commence en suivant ce bras via Ter Plaeten, en passant sous le pont devant la Kinepolis.`,
      beer: ``,
      food: ``,
      nav: `Suivez le bras gauche de l'Escaut le long de Ter Plaeten et passez sous le pont, devant la Kinepolis.`,
    },
    es: {
      name: `Scheldepunt (Inicio y Final)`,
      desc: `El nombre 'Scheldepunt' hace referencia a la confluencia del río Escalda justo en este edificio. El Escalda nace en el norte de Francia (Gouy) y fluye por Bélgica y los Países Bajos hasta el mar del Norte. El brazo izquierdo une aquí el Leie con el Escalda y se llama el Alto Escalda. El paseo comienza siguiendo el brazo izquierdo por Ter Plaeten, pasando bajo el puente junto al Kinepolis.`,
      beer: ``,
      food: ``,
      nav: `Sigue el brazo izquierdo del Escalda por Ter Plaeten y pasa bajo el puente, junto a la Kinepolis.`,
    },
    de: {
      name: `Scheldepunt (Start & Ziel)`,
      desc: `Der Name 'Scheldepunt' bezieht sich auf die Gabelung der Schelde direkt an diesem Gebäude. Die Schelde entspringt in Nordfrankreich (Gouy) und fließt über Belgien und die Niederlande zur Nordsee. Der linke Arm verbindet hier die Leie mit der Schelde und heißt Oberschelde. Der Rundgang beginnt entlang des linken Arms über Ter Plaeten, unter der Brücke hindurch am Kinepolis vorbei.`,
      beer: ``,
      food: ``,
      nav: `Folgen Sie dem linken Arm der Schelde entlang Ter Plaeten und gehen Sie unter der Brücke hindurch, vorbei an der Kinepolis.`,
    },
  },
  {
    id: 2, lat: 51.0378, lon: 3.7340, extension: false,
    en: {
      name: `Kinepolis`,
      desc: `When it was built in 1980, this was the largest cinema complex in the world. Today the 12 screens are only just enough to cater to Ghent's film-lovers.`,
      beer: `De Planck – old barge turned beer café with summer terrace on deck. Brouwzaele – beer & eatery with 100+ beers on the menu.`,
      food: ``,
      nav: `Past the Kinepolis, turn right into the François Bernardstraat and walk through to the Muinkpark.`,
    },
    nl: {
      name: `Kinepolis`,
      desc: `Bij de bouw in 1980 was de Kinepolis het grootste bioscoopcomplex van de wereld. Vandaag zijn de 12 zalen maar net voldoende meer om de Gentse filmliefhebber op zijn wenken te bedienen.`,
      beer: `De Planck – oud binnenschip omgevormd tot biercafé met groot zomerterras op het dek. Brouwzaele – bier- en eetcafé met meer dan 100 bieren.`,
      food: ``,
      nav: `Voorbij de Kinepolis sla je rechtsaf de François Bernardstraat in en wandel je door tot aan het Muinkpark.`,
    },
    fr: {
      name: `Kinepolis`,
      desc: `Lors de sa construction en 1980, Kinepolis était le plus grand complexe cinématographique du monde. Aujourd'hui, les 12 salles ne suffisent plus qu'à servir l'amateur de cinéma gantois à sa guise.`,
      beer: `De Planck – ancienne péniche transformée en café-brasserie avec terrasse d'été. Brouwzaele – brasserie avec plus de 100 bières.`,
      food: ``,
      nav: `Passé la Kinepolis, tournez à droite dans la François Bernardstraat et continuez jusqu'au Muinkpark.`,
    },
    es: {
      name: `Kinepolis`,
      desc: `Cuando se construyó en 1980, era el mayor complejo de cines del mundo. Hoy las 12 salas apenas bastan para satisfacer a los amantes del cine de Gante.`,
      beer: `De Planck – antigua gabarra convertida en cervecería con terraza de verano en cubierta. Brouwzaele – cervecería y restaurante con más de 100 cervezas en la carta.`,
      food: ``,
      nav: `Pasada la Kinepolis, gira a la derecha por la François Bernardstraat y sigue hasta el Muinkpark.`,
    },
    de: {
      name: `Kinepolis`,
      desc: `Bei seiner Eröffnung 1980 war dies der größte Kinokomplex der Welt. Heute reichen die 12 Säle gerade noch, um die Genter Cineasten zufriedenzustellen.`,
      beer: `De Planck – altes Binnenschiff, umgebaut zur Bierkneipe mit Sommerterrasse an Deck. Brouwzaele – Bier- und Speiselokal mit über 100 Bieren.`,
      food: ``,
      nav: `Hinter der Kinepolis rechts in die François Bernardstraat einbiegen und bis zum Muinkpark weitergehen.`,
    },
  },
  {
    id: 3, lat: 51.0390, lon: 3.7315, extension: false,
    en: {
      name: `Muinkpark`,
      desc: `The Muinkpark (from the word 'monk') is 1.3 hectares, landscaped in English style, and is the only remnant of the 19th-century Ghent zoo. Lions, parrots, ostriches, a crocodile and an elephant were real crowd-pullers. The surrounding streets still recall this past: Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat… Folk legend says a bear ended up on the BBQ after the zoo's bankruptcy — the elephant was turned into sausages in the Netherlands.`,
      beer: ``,
      food: ``,
      nav: `Cross the Muinkpark diagonally and turn right into the Muinklaan. Follow it to the Franklin Rooseveltlaan, cross over and go left into the Koning Albertpark. Follow the avenue to a T-junction, turn left along the Bernard Montgomerydreef to the fountain, then straight on between the tall buildings to the Woodrow Wilsonplein.`,
    },
    nl: {
      name: `Muinkpark`,
      desc: `Het Muinkpark (afgeleid van 'monnik') is 1,3 hectare groot, aangelegd in Engelse landschapsstijl, en het enige restant van de 19e-eeuwse Gentse dierentuin. De omringende straten herinneren nog aan dit verleden: Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat... De volkslegende zegt dat na het faillissement een beer op de BBQ eindigde — de olifant werd in Nederland in worsten gedraaid.`,
      beer: ``,
      food: ``,
      nav: `Doorkruis het Muinkpark diagonaal en ga rechts de Muinklaan in. Volg deze tot aan de Franklin Rooseveltlaan, steek over en ga links het Koning Albertpark in. Volg de dreef tot een T-punt, ga links via de Bernard Montgomerydreef tot aan de fontein, dan rechtdoor tussen de hoge gebouwen tot op het Woodrow Wilsonplein.`,
    },
    fr: {
      name: `Muinkpark`,
      desc: `Le Muinkpark (dérivé de « moine ») de 1,3 ha, aménagé dans le style anglais, est le seul vestige du zoo de Gand du XIXe siècle. Des lions, perroquets, autruches, un crocodile et un éléphant étaient de véritables attractions. Les noms des rues environnantes rappellent ce passé : Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat… La légende dit qu'après la faillite du zoo, un ours finit au barbecue — l'éléphant fut transformé en saucisses aux Pays-Bas.`,
      beer: ``,
      food: ``,
      nav: `Traversez le Muinkpark en diagonale et prenez à droite dans la Muinklaan. Suivez-la jusqu'à la Franklin Rooseveltlaan, traversez et entrez à gauche dans le Koning Albertpark. Suivez l'avenue jusqu'à un T, tournez à gauche via la Bernard Montgomerydreef jusqu'à la fontaine, puis tout droit entre les hauts immeubles jusqu'au Woodrow Wilsonplein.`,
    },
    es: {
      name: `Muinkpark`,
      desc: `El Muinkpark (de la palabra 'monje') tiene 1,3 hectáreas, ajardinado al estilo inglés, y es el único vestigio del zoo de Gante del siglo XIX. Leones, loros, avestruces, un cocodrilo y un elefante eran auténticas atracciones. Las calles de alrededor aún lo recuerdan: Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat… La leyenda popular dice que un oso acabó en la barbacoa tras la quiebra del zoo — el elefante se convirtió en salchichas en los Países Bajos.`,
      beer: ``,
      food: ``,
      nav: `Cruza el Muinkpark en diagonal y gira a la derecha por la Muinklaan. Síguelo hasta la Franklin Rooseveltlaan, cruza y entra a la izquierda en el Koning Albertpark. Sigue el bulevar hasta un cruce en T, gira a la izquierda por la Bernard Montgomerydreef hasta la fuente, luego todo recto entre los edificios altos hasta el Woodrow Wilsonplein.`,
    },
    de: {
      name: `Muinkpark`,
      desc: `Der Muinkpark (vom Wort 'Mönch') ist 1,3 Hektar groß, im englischen Stil angelegt und das einzige Überbleibsel des Genter Zoos aus dem 19. Jahrhundert. Löwen, Papageien, Strauße, ein Krokodil und ein Elefant waren echte Publikumsmagnete. Die umliegenden Straßen erinnern noch daran: Zebrastraat, Olifantstraat, Tijgerstraat, Leeuwstraat… Der Volkssage nach landete nach dem Konkurs des Zoos ein Bär auf dem Grill — der Elefant wurde in den Niederlanden zu Würsten verarbeitet.`,
      beer: ``,
      food: ``,
      nav: `Überquere den Muinkpark diagonal und biege rechts in die Muinklaan ein. Folge ihr bis zur Franklin Rooseveltlaan, überquere sie und gehe links in den Koning Albertpark. Folge der Allee bis zur T-Kreuzung, links über die Bernard Montgomerydreef bis zum Brunnen, dann geradeaus zwischen den hohen Gebäuden zum Woodrow Wilsonplein.`,
    },
  },
  {
    id: 4, lat: 51.0440, lon: 3.7215, extension: false,
    en: {
      name: `Het Zuid – Woodrow Wilsonplein`,
      desc: `'t Zuid (The South) is the vibrant neighbourhood around the neo-baroque Zuidpark. The name refers to the former South Railway Station, closed in 1928 when Gent-Sint-Pieters opened. The impressive Urbiscomplex houses a shopping centre; across the square you find the old library and the city's administrative centre. Adjacent Graaf van Vlaanderenplein hosts the renovated Capitole theatre for musicals and stand-up comedy.`,
      beer: ``,
      food: `The Martino (Vlaanderenstraat) – legendary sandwich shop where the 'Martino' sandwich was invented. Joost Arijs – renowned praline boutique at the end of the street. Cremerie Gérard (Limburgstraat 36) – famous ice-cream parlour.`,
      nav: `Next to the Shopping Centre turn left into the Vlaanderenstraat. Walk the full length of the street, then continue into the Limburgstraat up to the Belfry.`,
    },
    nl: {
      name: `Het Zuid – Woodrow Wilsonplein`,
      desc: `'t Zuid is de drukke buurt rond het neo-barokke Zuidpark. De naam verwijst naar het vroegere Zuidstation, dat in 1928 sloot bij de komst van Gent-Sint-Pieters. Het Urbiscomplex huisvest een winkelcentrum; aan de overkant vind je de oude bibliotheek en het administratief centrum. Op het aansluitende Graaf van Vlaanderenplein staat het gerenoveerde Capitole-theater voor musicals en stand-up comedy.`,
      beer: ``,
      food: `De Martino (Vlaanderenstraat) – de legendarische eetplaats waar het broodje Martino werd uitgevonden. Joost Arijs – vermaarde praliné-shop aan het einde van de straat. Cremerie Gérard (Limburgstraat 36) – gerenommeerde ijssalon.`,
      nav: `Naast het Shopping Center ga je linksaf de Vlaanderenstraat in. Loop deze volledig af en ga dan de Limburgstraat in tot aan het Belfort.`,
    },
    fr: {
      name: `Le Sud – Woodrow Wilsonplein`,
      desc: `Le Sud ('t Zuid) est le quartier animé autour du Zuidpark néo-baroque. Le nom vient de l'ancienne gare du Sud, fermée en 1928 à l'ouverture de Gent-Sint-Pieters. L'Urbiscomplex abrite un centre commercial ; en face se trouvent l'ancienne bibliothèque et le centre administratif. La place Graaf van Vlaanderen voisine accueille le théâtre Capitole rénové, pour comédies musicales et stand-up.`,
      beer: ``,
      food: `De Martino (Vlaanderenstraat) – l'endroit légendaire où le sandwich Martino a été inventé. Joost Arijs – célèbre boutique de pralines. Cremerie Gérard (Limburgstraat 36) – glacier réputé.`,
      nav: `À côté du Shopping Center, tournez à gauche dans la Vlaanderenstraat. Parcourez toute la rue, puis continuez dans la Limburgstraat jusqu'au Beffroi.`,
    },
    es: {
      name: `El Sur – Woodrow Wilsonplein`,
      desc: `'t Zuid (El Sur) es el animado barrio en torno al Zuidpark neobarroco. El nombre alude a la antigua Estación del Sur, cerrada en 1928 al abrir Gent-Sint-Pieters. El imponente Urbiscomplex alberga un centro comercial; al otro lado de la plaza están la antigua biblioteca y el centro administrativo. La contigua Graaf van Vlaanderenplein acoge el renovado teatro Capitole, para musicales y monólogos.`,
      beer: ``,
      food: `The Martino (Vlaanderenstraat) – legendaria bocadillería donde se inventó el bocadillo 'Martino'. Joost Arijs – afamada bombonería al final de la calle. Cremerie Gérard (Limburgstraat 36) – célebre heladería.`,
      nav: `Junto al Shopping Center, gira a la izquierda por la Vlaanderenstraat. Recorre la calle entera y continúa por la Limburgstraat hasta el Beffroi.`,
    },
    de: {
      name: `Het Zuid – Woodrow Wilsonplein`,
      desc: `'t Zuid (der Süden) ist das lebhafte Viertel rund um den neobarocken Zuidpark. Der Name verweist auf den früheren Südbahnhof, 1928 mit Eröffnung von Gent-Sint-Pieters geschlossen. Der imposante Urbiscomplex beherbergt ein Einkaufszentrum; gegenüber liegen die alte Bibliothek und das Verwaltungszentrum. Der angrenzende Graaf van Vlaanderenplein beherbergt das renovierte Capitole-Theater für Musicals und Stand-up-Comedy.`,
      beer: ``,
      food: `The Martino (Vlaanderenstraat) – legendärer Imbiss, wo das 'Martino'-Sandwich erfunden wurde. Joost Arijs – renommierte Pralinen-Boutique am Ende der Straße. Cremerie Gérard (Limburgstraat 36) – berühmte Eisdiele.`,
      nav: `Neben dem Einkaufszentrum links in die Vlaanderenstraat einbiegen. Die Straße vollständig abgehen, dann weiter in die Limburgstraat bis zum Belfort.`,
    },
  },
  {
    id: 5, lat: 51.0527, lon: 3.7217, extension: false,
    en: {
      name: `Belfry & Cloth Hall (Belfort & Lakenhalle)`,
      desc: `Construction of the Ghent Belfry began in 1314; by 1377 the legendary fire-breathing dragon was hoisted on top. The belfry stored city privileges and its bells, including 'Klokke Roeland', marked the working day and rang for feasts, storms or danger. It is a UNESCO World Heritage site — you can climb the tower. About half a century later the Cloth Hall (Lakenhalle) was added; above a corner gate the story of the 'Mammelokker' is depicted — a father saved from starvation in prison by his daughter's breast milk.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
      nav: `Walk on through the Stadshal to the next stop.`,
    },
    nl: {
      name: `Belfort & Lakenhalle`,
      desc: `Met de bouw van het Belfort werd begonnen in 1314; in 1377 werd de legendarische vuurspuwende draak gehesen. De klokken, waaronder Klokke Roeland, gaven de werkdag aan en luidden bij feesten, storm of gevaar. UNESCO Werelderfgoed — je kan de toren beklimmen. Ongeveer een halve eeuw later werd de Lakenhalle aangebouwd; boven een hoekpoort is het verhaal van de 'Mammelokker' uitgebeeld — een vader gered van de hongerdood door de borstvoeding van zijn dochter.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
      nav: `Wandel verder door de Stadshal naar de volgende halte.`,
    },
    fr: {
      name: `Beffroi & Halle aux Draps`,
      desc: `La construction du Beffroi de Gand a commencé en 1314 ; en 1377 le légendaire dragon cracheur de feu fut hissé au sommet. Les cloches, dont la Klokke Roeland, scandaient la journée de travail et sonnaient aux fêtes, tempêtes ou dangers. Site du patrimoine mondial de l'UNESCO — vous pouvez grimper la tour. La Halle aux Draps fut ajoutée un demi-siècle plus tard ; au-dessus d'un portail figure la légende du 'Mammelokker' — un père sauvé de la faim en prison grâce à l'allaitement de sa fille.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
      nav: `Continuez à travers la Stadshal jusqu'à l'arrêt suivant.`,
    },
    es: {
      name: `Campanario y Lonja de los Paños`,
      desc: `La construcción del Campanario de Gante comenzó en 1314; en 1377 se izó en lo alto el legendario dragón que escupe fuego. Guardaba los privilegios de la ciudad y sus campanas, entre ellas 'Klokke Roeland', marcaban la jornada laboral y sonaban en fiestas, tormentas o peligros. Es Patrimonio Mundial de la UNESCO — se puede subir a la torre. Medio siglo después se añadió la Lonja de los Paños (Lakenhalle); sobre una puerta de la esquina se representa la historia del 'Mammelokker' — un padre salvado de morir de hambre en prisión gracias a la leche materna de su hija.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
      nav: `Continúa a través de la Stadshal hasta la siguiente parada.`,
    },
    de: {
      name: `Belfried & Tuchhalle`,
      desc: `Der Bau des Genter Belfrieds begann 1314; 1377 wurde der legendäre feuerspeiende Drache auf die Spitze gehievt. Er bewahrte die Stadtprivilegien, und seine Glocken, darunter 'Klokke Roeland', gaben den Arbeitstag an und läuteten bei Festen, Stürmen oder Gefahr. Er ist UNESCO-Weltkulturerbe — man kann den Turm besteigen. Etwa ein halbes Jahrhundert später kam die Tuchhalle (Lakenhalle) hinzu; über einem Eckportal ist die Geschichte des 'Mammelokker' dargestellt — ein Vater, der im Gefängnis durch die Muttermilch seiner Tochter vor dem Hungertod gerettet wurde.`,
      beer: `Bier Central – Botermarkt 11.`,
      food: ``,
      nav: `Weiter durch die Stadshal zum nächsten Halt.`,
    },
  },
  {
    id: 6, lat: 51.0533, lon: 3.7213, extension: false,
    en: {
      name: `Stadshal (City Hall)`,
      desc: `The new building between the Belfry and Saint-Nicholas Church is the Stadshal. Controversial from the start, some Ghentians dismissively call it the 'Sheepfold'. It is an open hall with a café below and 1,600 small windows in the roof providing dynamic light. The large bell underneath is 'Klokke Roeland', used as a belfry bell during the Middle Ages until 1659. On the plinth is a painting by Ghent's world-famous artist Michaël Borremans, 'The Virgin'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – the place for ribs.`,
      nav: `Continue along the right-hand street, the Donkersteeg — this brings you to the Korenmarkt.`,
    },
    nl: {
      name: `Stadshal`,
      desc: `Het nieuwe bouwwerk tussen het Belfort en de Sint-Niklaaskerk is de Stadshal. Al van bij de bouwwerken omstreden — sommigen noemen het de 'Schaapstal'. Het is een open hal met een café onderaan en 1600 kleine raampjes in het dak die voor dynamische lichtinval zorgen. De grote klok is de 'Klokke Roeland', in het belfort tot 1659. Op de sokkel staat een schilderij van de wereldberoemde Gentse schilder Michaël Borremans, 'De Maagd'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – the place for ribs.`,
      nav: `Ga verder via de rechtse straat, de Donkersteeg, zo kom je op de Korenmarkt.`,
    },
    fr: {
      name: `Stadshal (Halle municipale)`,
      desc: `La Stadshal, entre le Beffroi et l'église Saint-Nicolas, est controversée depuis sa construction — certains la surnomment la 'bergerie'. C'est une halle ouverte avec un café dessous et 1 600 petites fenêtres dans le toit créant une lumière dynamique. La grande cloche sous la structure est la 'Klokke Roeland', restée dans le beffroi jusqu'en 1659. Sur le socle, un tableau du peintre gantois de renommée mondiale Michaël Borremans, 'La Vierge'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – the place for ribs.`,
      nav: `Continuez par la rue de droite, la Donkersteeg — vous arrivez sur la Korenmarkt.`,
    },
    es: {
      name: `Stadshal`,
      desc: `El nuevo edificio entre el Campanario y la iglesia de San Nicolás es el Stadshal. Polémico desde el principio, algunos ganteses lo llaman despectivamente el 'Redil'. Es una nave abierta con un café debajo y 1.600 ventanitas en el techo que aportan luz dinámica. La gran campana de debajo es la 'Klokke Roeland', usada como campana del campanario en la Edad Media hasta 1659. En el pedestal hay un cuadro del artista gantés de fama mundial Michaël Borremans, 'La Virgen'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – el sitio para las costillas.`,
      nav: `Continúa por la calle de la derecha, la Donkersteeg — llegas a la Korenmarkt.`,
    },
    de: {
      name: `Stadshal`,
      desc: `Der neue Bau zwischen dem Belfried und der Sankt-Nikolaus-Kirche ist die Stadshal. Von Anfang an umstritten, nennen manche Genter sie abschätzig den 'Schafstall'. Es ist eine offene Halle mit einem Café darunter und 1.600 kleinen Fenstern im Dach, die für dynamisches Licht sorgen. Die große Glocke darunter ist die 'Klokke Roeland', im Mittelalter bis 1659 als Belfriedglocke genutzt. Auf dem Sockel ein Gemälde des weltberühmten Genter Künstlers Michaël Borremans, 'Die Jungfrau'.`,
      beer: `Dragon – Klein Turkije 18.`,
      food: `Amadeus – die Adresse für Spareribs.`,
      nav: `Weiter durch die rechte Straße, die Donkersteeg — so gelangst du auf den Korenmarkt.`,
    },
  },
  {
    id: 7, lat: 51.0534, lon: 3.7200, extension: false,
    en: {
      name: `Korenmarkt`,
      desc: `Since the 10th–11th century this square was where grain entering Ghent via the Leie or Scheldt was traded. It is surrounded by historical buildings and is an important tourist hub. On leaving Donkersteeg you immediately see a modern art column with a gold necklace whose motifs reference medieval windows. The house 'De Cooremaete' (nr 7-8) was used for grain stacking; 'Het waepen van Zeelant' (nr 20), probably from the 13th century, bears the inscription 'Vry huys, vry erve' ('Free house, free estate').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – the very first coffee shop in Ghent.`,
      nav: `Cross the Korenmarkt towards De Post and the Sint-Niklaaskerk.`,
    },
    nl: {
      name: `Korenmarkt`,
      desc: `Vanaf de 10de–11de eeuw was dit het handelsplein voor graan dat via de Leie of Schelde Gent binnenkwam. Op de hoek staat een modern kunstwerk, een elegante zuil met goudkleurige ketting. 'De Cooremaete' (nr 7-8) diende voor het stapelen van graan; 'Het waepen van Zeelant' (nr 20) draagt de tekst 'Vry huys, vry erve' ('Vrij huis, vrij erf').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – de oerkoffiezaak van Gent.`,
      nav: `Steek de Korenmarkt over richting de Post en de Sint-Niklaaskerk.`,
    },
    fr: {
      name: `Korenmarkt`,
      desc: `Depuis le Xe–XIe siècle, la place était le lieu de commerce du grain entrant à Gand. En quittant le Donkersteeg, vous voyez une colonne moderne avec un collier doré aux motifs de fenêtres médiévales. 'De Cooremaete' (n°7-8) servait à empiler le grain ; 'Het waepen van Zeelant' (n°20), probablement du XIIIe siècle, porte l'inscription 'Vry huys, vry erve' ('Maison libre, bien libre').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – le tout premier coffee shop de Gand.`,
      nav: `Traversez la Korenmarkt en direction de De Post et de la Sint-Niklaaskerk.`,
    },
    es: {
      name: `Korenmarkt`,
      desc: `Desde los siglos X–XI, esta plaza era donde se comerciaba el grano que entraba en Gante por el Leie o el Escalda. Está rodeada de edificios históricos y es un importante centro turístico. Al salir del Donkersteeg verás enseguida una columna de arte moderno con un collar dorado cuyos motivos remiten a ventanas medievales. La casa 'De Cooremaete' (nº 7-8) servía para apilar grano; 'Het waepen van Zeelant' (nº 20), probablemente del siglo XIII, lleva la inscripción 'Vry huys, vry erve' ('Casa libre, propiedad libre').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – la primerísima cafetería de Gante.`,
      nav: `Cruza la Korenmarkt en dirección a De Post y la Sint-Niklaaskerk.`,
    },
    de: {
      name: `Korenmarkt`,
      desc: `Seit dem 10.–11. Jahrhundert wurde auf diesem Platz das Getreide gehandelt, das über die Leie oder die Schelde nach Gent kam. Er ist von historischen Gebäuden umgeben und ein wichtiger Touristenknotenpunkt. Beim Verlassen des Donkersteeg sieht man sofort eine moderne Kunstsäule mit goldener Kette, deren Motive auf mittelalterliche Fenster verweisen. Das Haus 'De Cooremaete' (Nr. 7-8) diente der Getreidelagerung; 'Het waepen van Zeelant' (Nr. 20), vermutlich aus dem 13. Jahrhundert, trägt die Inschrift 'Vry huys, vry erve' ('Freies Haus, freies Gut').`,
      beer: ``,
      food: `Mokabon (Donkersteeg 35) – das allererste Kaffeehaus Gents.`,
      nav: `Überquere den Korenmarkt in Richtung De Post und Sint-Niklaaskerk.`,
    },
  },
  {
    id: 8, lat: 51.0534, lon: 3.7193, extension: false,
    en: {
      name: `De Post (The Post Office)`,
      desc: `The former Post Office, built between 1898 and 1908, still breathes historical atmosphere along its exterior façade — note the beautiful 52m-high clock tower. Inside is now a shopping centre; a few remnants of the original interior can still be spotted (look up). The building also houses the iconic hotel 1898 The Post.`,
      beer: ``,
      food: ``,
      nav: `The Sint-Niklaaskerk stands right next to De Post — the next stop.`,
    },
    nl: {
      name: `De Post`,
      desc: `Het voormalige Postgebouw, opgetrokken tussen 1898 en 1908, ademt langs de buitengevel nog de historische sfeer — let op de prachtige klokkentoren van 52 meter. Binnen is nu een winkelcentrum; een paar restanten van het vroegere interieur zijn er nog te zien (kijk omhoog). In het gebouw vind je ook het iconische hotel 1898 The Post.`,
      beer: ``,
      food: ``,
      nav: `De Sint-Niklaaskerk staat pal naast de Post — de volgende halte.`,
    },
    fr: {
      name: `La Poste`,
      desc: `L'ancien bâtiment de la Poste, érigé entre 1898 et 1908, respire encore l'atmosphère historique — remarquez la belle tour de l'horloge de 52 m. À l'intérieur se trouve un centre commercial ; quelques vestiges de l'ancien intérieur sont encore visibles (regardez en haut). Le bâtiment abrite aussi l'hôtel iconique 1898 The Post.`,
      beer: ``,
      food: ``,
      nav: `La Sint-Niklaaskerk se trouve juste à côté de De Post — l'arrêt suivant.`,
    },
    es: {
      name: `La Oficina de Correos`,
      desc: `La antigua oficina de correos, construida entre 1898 y 1908, conserva en su fachada exterior un aire histórico — fíjate en la bonita torre del reloj de 52 m. En el interior hay ahora un centro comercial; aún se ven algunos restos del interior original (mira hacia arriba). El edificio también alberga el icónico hotel 1898 The Post.`,
      beer: ``,
      food: ``,
      nav: `La Sint-Niklaaskerk está justo al lado de De Post — la siguiente parada.`,
    },
    de: {
      name: `De Post (Das Postgebäude)`,
      desc: `Das ehemalige Postgebäude, errichtet zwischen 1898 und 1908, atmet an seiner Außenfassade noch historisches Flair — beachte den schönen 52 m hohen Uhrturm. Im Inneren befindet sich heute ein Einkaufszentrum; einige Reste des ursprünglichen Interieurs sind noch zu entdecken (Blick nach oben). Das Gebäude beherbergt auch das ikonische Hotel 1898 The Post.`,
      beer: ``,
      food: ``,
      nav: `Die Sint-Niklaaskerk steht direkt neben De Post — der nächste Halt.`,
    },
  },
  {
    id: 9, lat: 51.0537, lon: 3.7201, extension: false,
    en: {
      name: `Sint-Niklaaskerk (Saint-Nicholas Church)`,
      desc: `The distant origins of Saint-Nicholas Church lie in the 11th century. In 1120 the first church was destroyed by fire; a second barely lasted 75 years. In the 13th century the present church was begun, a work continued for centuries. The city council gave the church tower the function of the belfry until the actual belfry came into use. Note the tower is located in the middle of the church building. Inside you can admire a wealth of religious art.`,
      beer: ``,
      food: `Het Pakhuis – former warehouse turned restaurant (Jan van Stopenberghstraat, left).`,
      nav: `With the Sint-Niklaaskerk on your left and the former post office on your right, walk straight ahead towards the Veldstraat. Don't enter the Veldstraat — after about 10 metres turn right into the Jan van Stopenberghstraat. At the end you'll see the first graffiti wall on your left.`,
    },
    nl: {
      name: `Sint-Niklaaskerk`,
      desc: `De verre oorsprong van de Sint-Niklaaskerk situeert zich in de 11de eeuw. In 1120 werd de eerste kerk door brand vernield; een tweede hield het nauwelijks driekwart eeuw uit. In de 13de eeuw werd begonnen met de bouw van de huidige kerk. Het stadsbestuur gaf de kerktoren de functie van belfort totdat het eigenlijke belfort in gebruik werd genomen. Merk op dat de toren middenin het kerkgebouw staat. Binnen kun je een schat aan religieuze kunst bewonderen.`,
      beer: ``,
      food: `Het Pakhuis – voormalige opslagplaats omgetoverd tot restaurant (Jan van Stopenberghstraat, links).`,
      nav: `Met de Sint-Niklaaskerk links en het voormalige postgebouw rechts stap je rechtdoor richting de Veldstraat. Loop de Veldstraat niet in, maar sla na zo'n 10 meter rechtsaf de Jan van Stopenberghstraat in. Op het einde zie je links de eerste graffitimuur.`,
    },
    fr: {
      name: `Église Saint-Nicolas`,
      desc: `Les origines de l'église Saint-Nicolas remontent au XIe siècle. En 1120 la première église fut détruite par le feu ; une deuxième dura à peine 75 ans. La construction de l'église actuelle débuta au XIIIe siècle. Le conseil municipal confia la fonction de beffroi à la tour de l'église en attendant la mise en service du vrai beffroi. Notez que la tour se trouve au milieu de l'édifice. À l'intérieur, admirez une richesse d'art religieux.`,
      beer: ``,
      food: `Het Pakhuis – ancien entrepôt transformé en restaurant (Jan van Stopenberghstraat, à gauche).`,
      nav: `La Sint-Niklaaskerk à gauche et l'ancien bureau de poste à droite, marchez tout droit vers la Veldstraat. N'entrez pas dans la Veldstraat — après environ 10 mètres tournez à droite dans la Jan van Stopenberghstraat. Au bout, vous verrez le premier mur de graffiti à gauche.`,
    },
    es: {
      name: `Iglesia de San Nicolás`,
      desc: `Los orígenes lejanos de la iglesia de San Nicolás se sitúan en el siglo XI. En 1120 la primera iglesia fue destruida por un incendio; una segunda apenas duró 75 años. En el siglo XIII se inició la iglesia actual, una obra que se prolongó durante siglos. El ayuntamiento dio a la torre la función de campanario hasta que el campanario propiamente dicho entró en uso. Fíjate en que la torre se sitúa en el centro del edificio. Dentro puedes admirar una riqueza de arte religioso.`,
      beer: ``,
      food: `Het Pakhuis – antiguo almacén convertido en restaurante (Jan van Stopenberghstraat, a la izquierda).`,
      nav: `Con la Sint-Niklaaskerk a la izquierda y el antiguo edificio de correos a la derecha, avanza recto hacia la Veldstraat. No entres en la Veldstraat — tras unos 10 metros gira a la derecha por la Jan van Stopenberghstraat. Al final verás el primer muro de grafiti a la izquierda.`,
    },
    de: {
      name: `Sankt-Nikolaus-Kirche`,
      desc: `Die fernen Ursprünge der Sankt-Nikolaus-Kirche liegen im 11. Jahrhundert. 1120 wurde die erste Kirche durch Feuer zerstört; eine zweite hielt kaum 75 Jahre. Im 13. Jahrhundert begann der Bau der heutigen Kirche, der sich über Jahrhunderte hinzog. Der Stadtrat gab dem Kirchturm die Funktion des Belfrieds, bis der eigentliche Belfried in Gebrauch kam. Beachte, dass der Turm in der Mitte des Kirchengebäudes steht. Im Inneren kann man eine Fülle religiöser Kunst bewundern.`,
      beer: ``,
      food: `Het Pakhuis – ehemaliges Lagerhaus, heute Restaurant (Jan van Stopenberghstraat, links).`,
      nav: `Mit der Sint-Niklaaskerk links und dem ehemaligen Postgebäude rechts geradeaus Richtung Veldstraat. Nicht in die Veldstraat einbiegen — nach ca. 10 Metern rechts in die Jan van Stopenberghstraat abbiegen. Am Ende siehst du links die erste Graffiti-Wand.`,
    },
  },
  {
    id: 10, lat: 51.0530, lon: 3.7192, extension: false,
    en: {
      name: `Graffiti – Lam Gods (Copy)`,
      desc: `On the wall you can see part of the famous masterpiece 'Het Lam Gods' (The Mystic Lamb) reproduced by street artist Smates (Bart Smeets, www.smates.be). He created it for the cinema release of 'The Monuments Men'. From the bridge above you get two of Ghent's most beautiful panoramas: turning around you see the famous trio of towers (Saint-Nicholas, Belfry, Saint-Bavo) in a perfect line; below lies the Graslei with one of the most beautiful rows of houses in the world.`,
      beer: ``,
      food: ``,
      nav: `Head right along the riverbank and just before the bridge take the steps up. At the top turn left onto the Sint-Michielsbrug.`,
    },
    nl: {
      name: `Graffiti – Lam Gods`,
      desc: `Op de muur zie je een luik nageschilderd van het bekende topkunstwerk 'Het Lam Gods', van Smates (Bart Smeets, www.smates.be). Hij maakte het naar aanleiding van de bioscooprelease van 'The Monuments Men'. Vanaf de brug erboven geniet je van twee van de allermooiste Gentse zichten: de drie torens op een rij (Sint-Niklaaskerk, Belfort, Sint-Baafskathedraal) en beneden de Graslei met een van de mooiste huizenrijen van de wereld.`,
      beer: ``,
      food: ``,
      nav: `Stap aan de oever naar rechts en neem net voor de brug de trap naar boven. Boven ga je naar links, de Sint-Michielsbrug op.`,
    },
    fr: {
      name: `Graffiti – L'Agneau Mystique`,
      desc: `Sur le mur, une reproduction du célèbre chef-d'œuvre 'Het Lam Gods' par Smates (Bart Smeets, www.smates.be), réalisée pour la sortie du film 'Monuments Men'. Du pont au-dessus, vous jouissez de deux des plus belles vues de Gand : les trois tours en enfilade (Saint-Nicolas, Beffroi, Saint-Bavon) et en contrebas le Graslei, l'une des plus belles rangées de maisons du monde.`,
      beer: ``,
      food: ``,
      nav: `Longez la rive vers la droite et, juste avant le pont, prenez les escaliers vers le haut. En haut, tournez à gauche sur le Sint-Michielsbrug.`,
    },
    es: {
      name: `Grafiti – El Cordero Místico`,
      desc: `En el muro puedes ver una parte de la famosa obra maestra 'Het Lam Gods' (El Cordero Místico) reproducida por el artista urbano Smates (Bart Smeets, www.smates.be). La creó con motivo del estreno de la película 'The Monuments Men'. Desde el puente de arriba se obtienen dos de los panoramas más bellos de Gante: al girarte ves el famoso trío de torres (San Nicolás, el Campanario y San Bavón) en perfecta hilera; abajo se extiende el Graslei con una de las hileras de casas más bonitas del mundo.`,
      beer: ``,
      food: ``,
      nav: `Dirígete a la derecha por la orilla y, justo antes del puente, sube las escaleras. Arriba, gira a la izquierda hacia el Sint-Michielsbrug.`,
    },
    de: {
      name: `Graffiti – Das Genter Altarbild`,
      desc: `An der Wand siehst du einen Teil des berühmten Meisterwerks 'Het Lam Gods' (Das Genter Altarbild), nachgemalt vom Streetart-Künstler Smates (Bart Smeets, www.smates.be). Er schuf es zum Kinostart von 'The Monuments Men'. Von der Brücke darüber hast du zwei der schönsten Panoramen Gents: Wenn du dich umdrehst, siehst du das berühmte Türmetrio (Sankt-Nikolaus, Belfried, Sankt-Bavo) in perfekter Reihe; darunter liegt der Graslei mit einer der schönsten Häuserzeilen der Welt.`,
      beer: ``,
      food: ``,
      nav: `Gehe rechts am Ufer entlang und nimm kurz vor der Brücke die Treppe nach oben. Oben links auf die Sint-Michielsbrug.`,
    },
  },
  {
    id: 11, lat: 51.0527, lon: 3.7185, extension: false,
    en: {
      name: `Sint-Michielskerk (Saint-Michael's Church)`,
      desc: `In 1440 the construction of Saint-Michael's Church began; earlier there was a chapel here. Iconoclasts demolished the building in the 16th century, so in 1619 a new church was built — the current one. Due to lack of money, work stopped in 1672 and the tower has been without a spire ever since. The intention was a tower of 134 metres! 'Christ on the Cross' by Antoon Van Dyck is the most important work of art here.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
      nav: `A little further along the bridge take the steps on the right down to the Korenlei. At the bottom turn left.`,
    },
    nl: {
      name: `Sint-Michielskerk`,
      desc: `In 1440 werd de bouw van de Sint-Michielskerk aangevat; eerder stond hier een kapel. Beeldenstormers sloopten het gebouw in de 16de eeuw, zodat men in 1619 aan een nieuwe kerk begon — de huidige. Door geldgebrek vielen de werkzaamheden stil in 1672 en sindsdien staat de toren zonder spits. De bedoeling was een toren van maar liefst 134 meter! 'Christus aan het kruis' van Antoon Van Dyck is hier het belangrijkste kunstwerk.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
      nav: `Neem iets verder op de brug de trappen rechts naar beneden, naar de Korenlei. Eenmaal beneden ga je naar links.`,
    },
    fr: {
      name: `Église Saint-Michel`,
      desc: `En 1440 débuta la construction de l'église Saint-Michel, qui remplaça une chapelle. Les iconoclastes la détruisirent en grande partie au XVIe siècle ; en 1619 une nouvelle église fut construite — l'actuelle. Faute d'argent, les travaux s'arrêtèrent en 1672 et la tour est depuis sans flèche. L'intention était une tour de 134 mètres ! 'Le Christ en croix' d'Antoon Van Dyck est l'œuvre d'art majeure de l'église.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
      nav: `Un peu plus loin sur le pont, prenez les escaliers à droite vers la Korenlei. En bas, tournez à gauche.`,
    },
    es: {
      name: `Iglesia de San Miguel`,
      desc: `En 1440 comenzó la construcción de la iglesia de San Miguel; antes había aquí una capilla. Los iconoclastas derribaron el edificio en el siglo XVI, así que en 1619 se construyó una nueva iglesia — la actual. Por falta de dinero, las obras se detuvieron en 1672 y desde entonces la torre carece de aguja. ¡La intención era una torre de 134 metros! 'Cristo en la cruz' de Antoon Van Dyck es la obra de arte más importante de aquí.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
      nav: `Un poco más adelante en el puente, baja las escaleras de la derecha hacia la Korenlei. Abajo, gira a la izquierda.`,
    },
    de: {
      name: `Sankt-Michaels-Kirche`,
      desc: `1440 begann der Bau der Sankt-Michaels-Kirche; zuvor stand hier eine Kapelle. Bilderstürmer zerstörten das Gebäude im 16. Jahrhundert, sodass 1619 eine neue Kirche errichtet wurde — die heutige. Aus Geldmangel wurden die Arbeiten 1672 eingestellt, und der Turm ist seitdem ohne Spitze. Geplant war ein Turm von sage und schreibe 134 Metern! 'Christus am Kreuz' von Antoon Van Dyck ist das wichtigste Kunstwerk hier.`,
      beer: `Café Bornhem – Sint-Michielsstraat 1. Hotsy Totsy – Hoogstraat 1.`,
      food: ``,
      nav: `Etwas weiter auf der Brücke die Treppen rechts zur Korenlei hinuntersteigen. Unten links abbiegen.`,
    },
  },
  {
    id: 12, lat: 51.0535, lon: 3.7208, extension: false,
    en: {
      name: `Korenlei & Graslei`,
      desc: `Walk over the Korenlei and admire the majestic Graslei. Ghent held the grain-stacking right, meaning grain from northern France had to pass through and be stored here for two weeks before trading. The Graslei shows a series of beautiful old buildings: the Cooremetershuys (nr 12-13) was the 14th-century meeting place of cargo craftsmen; Tolhuisje (nr 11) is the smallest house in the city; the Korenstapelhuis (nr 10, also 'Het Spijker', from Spica = Latin for grain) has what is said to be the world's oldest step gable. On the Korenlei, the hotel Marriott hides behind a preserved historic façade — two swans on the gable hint at its medieval past as a brothel.`,
      beer: ``,
      food: ``,
      nav: `At the Grasbrug, keep straight ahead into the Jan Breydelstraat, where you will find the Design Museum.`,
    },
    nl: {
      name: `Korenlei & Graslei`,
      desc: `Loop over de Korenlei en bewonder de majestueuze Graslei. Gent bezat het graanstapelrecht: graan moest hier twee weken liggen voordat het verhandeld mocht worden. De Graslei toont een reeks prachtige oude gebouwen: het Cooremetershuys (nr 12-13) was de vergaderplaats van de pijnders; het Tolhuisje (nr 11) is het kleinste huisje van de stad; het Korenstapelhuis (nr 10, 'Het Spijker', van Spica = Latijn voor koren) heeft vermoedelijk de oudste bestaande trapgevel ter wereld. Op de Korenlei verbergt het hotel Marriott zich achter een historische gevel — twee zwanen op de gevel verwijzen naar het middeleeuwse bordeel dat er was.`,
      beer: ``,
      food: ``,
      nav: `Ter hoogte van de Grasbrug stap je rechtdoor de Jan Breydelstraat in, waar je het Designmuseum vindt.`,
    },
    fr: {
      name: `Korenlei & Graslei`,
      desc: `Marchez sur le Korenlei et admirez le majestueux Graslei. Gand possédait le droit d'entrepôt de grain : le grain devait y être stocké deux semaines avant d'être commercialisé. Le Graslei présente de magnifiques bâtiments anciens : le Cooremetershuys (n°12-13) était la salle de réunion des artisans dockers ; le Tolhuisje (n°11) est la plus petite maison de la ville ; le Korenstapelhuis (n°10, 'Het Spijker') aurait le plus vieux pignon à gradins du monde. Sur le Korenlei, l'hôtel Marriott se cache derrière une façade historique préservée — deux cygnes sur la façade rappellent son passé médiéval de maison close.`,
      beer: ``,
      food: ``,
      nav: `Au niveau du Grasbrug, continuez tout droit dans la Jan Breydelstraat, où se trouve le Designmuseum.`,
    },
    es: {
      name: `Korenlei & Graslei`,
      desc: `Camina por el Korenlei y admira el majestuoso Graslei. Gante tenía el derecho de almacenaje de grano: el grano del norte de Francia debía pasar por aquí y guardarse dos semanas antes de comerciarse. El Graslei muestra una serie de hermosos edificios antiguos: el Cooremetershuys (nº 12-13) fue en el siglo XIV el lugar de reunión de los estibadores; el Tolhuisje (nº 11) es la casa más pequeña de la ciudad; el Korenstapelhuis (nº 10, también 'Het Spijker', de Spica = grano en latín) tiene, según se dice, el hastial escalonado más antiguo del mundo. En el Korenlei, el hotel Marriott se esconde tras una fachada histórica conservada — dos cisnes en el hastial recuerdan su pasado medieval como burdel.`,
      beer: ``,
      food: ``,
      nav: `A la altura del Grasbrug, sigue todo recto por la Jan Breydelstraat, donde encontrarás el Designmuseum.`,
    },
    de: {
      name: `Korenlei & Graslei`,
      desc: `Gehe über den Korenlei und bewundere den majestätischen Graslei. Gent besaß das Getreidestapelrecht: Getreide aus Nordfrankreich musste hier durch und zwei Wochen gelagert werden, bevor es gehandelt wurde. Der Graslei zeigt eine Reihe schöner alter Gebäude: das Cooremetershuys (Nr. 12-13) war im 14. Jahrhundert der Versammlungsort der Lastträger; das Tolhuisje (Nr. 11) ist das kleinste Haus der Stadt; das Korenstapelhuis (Nr. 10, auch 'Het Spijker', von Spica = lateinisch für Getreide) hat angeblich den ältesten Treppengiebel der Welt. Am Korenlei verbirgt sich das Hotel Marriott hinter einer erhaltenen historischen Fassade — zwei Schwäne am Giebel deuten auf seine mittelalterliche Vergangenheit als Bordell hin.`,
      beer: ``,
      food: ``,
      nav: `Beim Grasbrug geradeaus in die Jan Breydelstraat — dort befindet sich das Designmuseum.`,
    },
  },
  {
    id: 13, lat: 51.0555, lon: 3.7198, extension: false,
    en: {
      name: `Designmuseum Gent`,
      desc: `The Ghent Design Museum is housed in the 18th-century Hotel De Coninck. Modern design in a new building is successfully combined with the historic structure. In the old wing you find 18th-century Ghent aristocracy salons; in the new building a completely different world awaits. Don't miss the toilet wing — built in defiance after the city repeatedly denied expansion funds. The museum turned it into a monumental giant toilet roll, literally telling the city council 'de pot op' (go to hell).`,
      beer: ``,
      food: ``,
      nav: `A few metres past the museum step briefly into the Appelbrugparkje on the right for the view. Then turn back and go right to the bridge — ahead you will see the Gravensteen.`,
    },
    nl: {
      name: `Designmuseum Gent`,
      desc: `Het Gentse Designmuseum is gehuisvest in het 18de-eeuwse Hotel De Coninck. In het oude gedeelte kom je terecht in de salons van de 18de-eeuwse Gentse aristocratie. Mis de opvallende toiletvleugel niet — gebouwd uit protest nadat de stad herhaaldelijk budget voor uitbreiding weigerde. Het museum maakte er een monumentale wc-rol van, een figuurlijk opgestoken middenvinger naar het stadsbestuur ('de pot op').`,
      beer: ``,
      food: ``,
      nav: `Een paar meter voorbij het museum loop je rechts even het Appelbrugparkje in voor het uitzicht. Stap dan terug en ga even naar rechts tot op de brug; voor je zie je het Gravensteen.`,
    },
    fr: {
      name: `Designmuseum Gent`,
      desc: `Le Musée du Design de Gand est installé dans l'hôtel De Coninck du XVIIIe siècle. L'aile ancienne abrite les salons de l'aristocratie gantoise ; l'aile moderne propose un tout autre univers. Ne manquez pas l'aile des toilettes, construite par défi après que la ville refusa les fonds d'extension. Le musée en fit un monumental rouleau de papier toilette, un majeur levé au conseil municipal ('de pot op' = 'allez vous faire voir').`,
      beer: ``,
      food: ``,
      nav: `Quelques mètres après le musée, entrez brièvement dans l'Appelbrugparkje à droite pour la vue. Revenez ensuite sur vos pas et allez à droite jusqu'au pont — devant vous se dresse le Gravensteen.`,
    },
    es: {
      name: `Museo del Diseño de Gante`,
      desc: `El Museo del Diseño de Gante ocupa el Hotel De Coninck del siglo XVIII. El diseño moderno de un edificio nuevo se combina con acierto con la estructura histórica. En el ala antigua encuentras los salones de la aristocracia gantesa del siglo XVIII; en el edificio nuevo te espera un mundo totalmente distinto. No te pierdas el ala de los aseos — construida como desafío tras negar la ciudad repetidamente fondos para la ampliación. El museo la convirtió en un monumental rollo de papel higiénico, mandando literalmente al ayuntamiento 'de pot op' (a paseo).`,
      beer: ``,
      food: ``,
      nav: `Unos metros después del museo, entra brevemente por la derecha en el Appelbrugparkje para disfrutar de la vista. Vuelve y gira a la derecha hasta el puente — frente a ti verás el Gravensteen.`,
    },
    de: {
      name: `Designmuseum Gent`,
      desc: `Das Genter Designmuseum ist im Hotel De Coninck aus dem 18. Jahrhundert untergebracht. Modernes Design eines Neubaus wird gelungen mit dem historischen Bau verbunden. Im alten Flügel findest du die Salons der Genter Aristokratie des 18. Jahrhunderts; im neuen Gebäude erwartet dich eine völlig andere Welt. Verpasse nicht den Toilettenflügel — aus Trotz errichtet, nachdem die Stadt wiederholt Mittel für die Erweiterung verweigert hatte. Das Museum machte daraus eine monumentale Klorolle und schickte den Stadtrat damit buchstäblich 'de pot op' (zum Teufel).`,
      beer: ``,
      food: ``,
      nav: `Ein paar Meter hinter dem Museum kurz rechts in den Appelbrugparkje zum Aussichtspunkt. Dann zurück und rechts bis zur Brücke — geradeaus siehst du das Gravensteen.`,
    },
  },
  {
    id: 14, lat: 51.0568, lon: 3.7197, extension: false,
    en: {
      name: `Gravensteen (Castle of the Counts)`,
      desc: `Construction of the current Castle of the Counts began in 1180 under Count Philip of Alsace. Until the mid-15th century it served as residence of the Counts of Flanders; later as meeting hall, court, and cotton mill. The castle exhibits weapons and torture equipment. On 16 November 1949 Ghent students famously occupied the castle — supposedly to protest rising beer prices and new police helmets, but really just a student prank born of boredom. This 'greatest student joke of all time' is still celebrated annually with the Gravensteenfestival.`,
      beer: ``,
      food: ``,
      nav: `Head back the way you came. Route WITHOUT extension: take the first street on the right — het Gewad — and continue to stop 19. Route WITH extension (+2.2 km via Begijnhof & Prinsenhof): go straight on into the Burgstraat towards stop 15.`,
    },
    nl: {
      name: `Gravensteen`,
      desc: `De bouw van het huidige Gravensteen begon in 1180 onder graaf Filips van de Elzas. Tot het midden van de 15de eeuw verbleven de graven van Vlaanderen hier regelmatig; later ook vergaderplaats, rechtbank en katoenspinnerij. Op 16 november 1949 bezetten Gentse studenten het kasteel — schijnbaar om te protesteren tegen de stijgende bierprijs en nieuwe politiekepies, maar eigenlijk gewoon een studentengrap uit verveling. Deze 'grootste studentengrap aller tijden' wordt jaarlijks herdacht met het Gravensteenfestival.`,
      beer: ``,
      food: ``,
      nav: `Keer op je stappen terug. Wandeling ZONDER uitbreiding: ga hier de eerste straat rechts in, het Gewad, en vervolg bij halte 19. Wandeling MET uitbreiding (+ 2,2 km via Begijnhof & Prinsenhof): ga rechtdoor de Burgstraat in naar halte 15.`,
    },
    fr: {
      name: `Gravensteen (Château des Comtes)`,
      desc: `La construction de l'actuel Château des Comtes débuta en 1180 sous le comte Philippe d'Alsace. Jusqu'au milieu du XVe siècle, les comtes de Flandre y séjournèrent ; puis il servit de salle de réunion, tribunal et filature de coton. Le château expose armes et instruments de torture. Le 16 novembre 1949, des étudiants gantois l'occupèrent — soi-disant pour protester contre la hausse du prix de la bière, mais en réalité une simple farce d'étudiant. Cette 'plus grande farce étudiante de tous les temps' est célébrée chaque année au Gravensteenfestival.`,
      beer: ``,
      food: ``,
      nav: `Revenez sur vos pas. Itinéraire SANS extension : prenez la première rue à droite — het Gewad — et continuez jusqu'à l'arrêt 19. Itinéraire AVEC extension (+2,2 km via le Begijnhof & le Prinsenhof) : continuez tout droit dans la Burgstraat vers l'arrêt 15.`,
    },
    es: {
      name: `Gravensteen (Castillo de los Condes)`,
      desc: `La construcción del actual Castillo de los Condes comenzó en 1180 bajo el conde Felipe de Alsacia. Hasta mediados del siglo XV fue residencia de los condes de Flandes; más tarde sala de reuniones, tribunal e hilandería de algodón. El castillo exhibe armas e instrumentos de tortura. El 16 de noviembre de 1949 unos estudiantes de Gante ocuparon el castillo — supuestamente para protestar por la subida del precio de la cerveza y los nuevos cascos de la policía, pero en realidad una simple broma estudiantil nacida del aburrimiento. Esta 'mayor broma estudiantil de todos los tiempos' aún se celebra cada año con el Gravensteenfestival.`,
      beer: ``,
      food: ``,
      nav: `Vuelve sobre tus pasos. Ruta SIN extensión: toma la primera calle a la derecha — het Gewad — y continúa hasta la parada 19. Ruta CON extensión (+2,2 km por el Begijnhof y el Prinsenhof): sigue recto por la Burgstraat hacia la parada 15.`,
    },
    de: {
      name: `Gravensteen (Grafenburg)`,
      desc: `Der Bau der heutigen Grafenburg begann 1180 unter Graf Philipp von Elsass. Bis Mitte des 15. Jahrhunderts diente sie als Residenz der Grafen von Flandern; später als Versammlungssaal, Gericht und Baumwollspinnerei. Die Burg zeigt Waffen und Folterwerkzeuge. Am 16. November 1949 besetzten Genter Studenten die Burg — angeblich aus Protest gegen steigende Bierpreise und neue Polizeihelme, in Wahrheit aber nur ein aus Langeweile geborener Studentenstreich. Dieser 'größte Studentenstreich aller Zeiten' wird bis heute jährlich mit dem Gravensteenfestival gefeiert.`,
      beer: ``,
      food: ``,
      nav: `Geh zurück. Route OHNE Verlängerung: erste Straße rechts — het Gewad — und weiter zu Halt 19. Route MIT Verlängerung (+2,2 km über Begijnhof & Prinsenhof): geradeaus die Burgstraat hinunter zu Halt 15.`,
    },
  },
  {
    id: 15, lat: 51.0581, lon: 3.7196, extension: true,
    en: {
      name: `Paters Karmelieten (Carmelite Monastery)`,
      desc: `In the middle of the Burgstraat, on the right, you see the church 'Paters Karmelieten'. You can enter freely and a visit is highly recommended. Next to the church is the cloister garden, only open on request. The monastery is known for guests who come for 'peace, quiet and relaxation'.`,
      beer: ``,
      food: `Mémé Gusta – traditional Belgian cuisine in a cosy setting (Burgstraat).`,
      nav: `Continue along the Burgstraat, then turn right onto the Sint-Elisabethpleintje. Step left into the Proveniersterstraat.`,
    },
    nl: {
      name: `Paters Karmelieten`,
      desc: `In het midden van de Burgstraat rechts zie je de kerk 'Paters Karmelieten'. Je kan er vrij in en een bezoek is een aanrader. Naast de kerk ligt de kloostertuin, die enkel te bezoeken is op aanvraag. Het klooster is gekend voor gasten die komen voor de 'rust, stilte en onthaasting'.`,
      beer: ``,
      food: `Mémé Gusta – traditionele Belgische keuken in een gezellig kader (Burgstraat).`,
      nav: `Volg de Burgstraat verder en ga iets verder rechts het Sint-Elisabethpleintje op. Stap dan links de Proveniersterstraat in.`,
    },
    fr: {
      name: `Paters Karmelieten (Monastère carmélite)`,
      desc: `Au milieu de la Burgstraat sur la droite se trouve l'église 'Paters Karmelieten'. Vous pouvez y entrer librement et une visite est fortement recommandée. À côté se trouve le jardin du cloître, accessible sur demande. Le monastère est connu pour ses hôtes qui viennent chercher 'paix, calme et détente'.`,
      beer: ``,
      food: `Mémé Gusta – cuisine belge traditionnelle dans un cadre agréable (Burgstraat).`,
      nav: `Continuez dans la Burgstraat, puis tournez à droite sur la Sint-Elisabethpleintje. Prenez à gauche dans la Proveniersterstraat.`,
    },
    es: {
      name: `Paters Karmelieten (Monasterio Carmelita)`,
      desc: `En medio de la Burgstraat, a la derecha, ves la iglesia 'Paters Karmelieten'. Puedes entrar libremente y la visita es muy recomendable. Junto a la iglesia está el jardín del claustro, solo abierto previa petición. El monasterio es conocido por los huéspedes que vienen buscando 'paz, silencio y sosiego'.`,
      beer: ``,
      food: `Mémé Gusta – cocina belga tradicional en un ambiente acogedor (Burgstraat).`,
      nav: `Continúa por la Burgstraat, luego gira a la derecha hacia la Sint-Elisabethpleintje. Dobla a la izquierda por la Proveniersterstraat.`,
    },
    de: {
      name: `Paters Karmelieten (Karmeliterkloster)`,
      desc: `In der Mitte der Burgstraat, rechts, siehst du die Kirche 'Paters Karmelieten'. Du kannst frei eintreten, ein Besuch ist sehr zu empfehlen. Neben der Kirche liegt der Klostergarten, nur auf Anfrage geöffnet. Das Kloster ist bekannt für Gäste, die wegen 'Ruhe, Stille und Entschleunigung' kommen.`,
      beer: ``,
      food: `Mémé Gusta – traditionelle belgische Küche in gemütlichem Rahmen (Burgstraat).`,
      nav: `Weiter durch die Burgstraat, dann rechts auf den Sint-Elisabethpleintje. Links in die Proveniersterstraat einbiegen.`,
    },
  },
  {
    id: 16, lat: 51.0582, lon: 3.7163, extension: true,
    en: {
      name: `Oud Begijnhof – Sint-Elisabethkerk`,
      desc: `Believed to be one of the oldest beguinages in Flanders, the atmosphere is best absorbed in the Proveniersterstraat. The Sint-Elisabethkerk is the central building of the Oud-begijnhof. Unusually, it hosts both Roman Catholic and Anglican services. This district is known as 'The Holy Corner' — four religions are practised in three churches within a short distance of each other. A place of tolerance. A striking new Orthodox church in the Sophie Van Akenstraat was painted inside with frescoes in authentic Byzantine technique.`,
      beer: ``,
      food: ``,
      nav: `Take the second street on the right (Zwartekatstraat). At the end turn right then immediately left into the Begijnhofdries. Walk straight ahead into the Sophie Van Akenstraat.`,
    },
    nl: {
      name: `Oud Begijnhof – Sint-Elisabethkerk`,
      desc: `Vermoedelijk een van de oudste begijnhoven van Vlaanderen; de sfeer is het best op te snuiven in de Proveniersterstraat. De Sint-Elisabethkerk is het centrale gebouw. Opmerkelijk: er worden zowel rooms-katholieke als Anglicaanse diensten gehouden. Deze wijk heet 'The Holy Corner' — vier religies worden beoefend in drie kerken op luttele afstand. Een oord van verdraagzaamheid. In de Sophie Van Akenstraat is een nieuwe orthodoxe kerk die van binnen beschilderd is met fresco's in de authentieke Byzantijnse techniek.`,
      beer: ``,
      food: ``,
      nav: `Ga de tweede straat (Zwartekatstraat) rechtsaf. Op het einde naar rechts en dan meteen links, de Begijnhofdries in. Wandel rechtdoor de Sophie Van Akenstraat in.`,
    },
    fr: {
      name: `Ancien Béguinage – Sint-Elisabethkerk`,
      desc: `Considéré comme l'un des plus anciens béguinages de Flandre, l'atmosphère se savoure dans la Proveniersterstraat. La Sint-Elisabethkerk est le bâtiment central de l'Oud-begijnhof. Remarquablement, elle accueille des offices catholiques romains et anglicans. Ce quartier s'appelle 'The Holy Corner' — quatre religions sont pratiquées dans trois églises à proximité. Un lieu de tolérance. Dans la Sophie Van Akenstraat, une nouvelle église orthodoxe décorée de fresques selon la technique byzantine authentique.`,
      beer: ``,
      food: ``,
      nav: `Prenez la deuxième rue à droite (Zwartekatstraat). Au bout, tournez à droite puis immédiatement à gauche dans la Begijnhofdries. Continuez tout droit dans la Sophie Van Akenstraat.`,
    },
    es: {
      name: `Antiguo Beguinaje – Sint-Elisabethkerk`,
      desc: `Considerado uno de los beguinajes más antiguos de Flandes, el ambiente se respira mejor en la Proveniersterstraat. La Sint-Elisabethkerk es el edificio central del Oud-begijnhof. Algo insólito: acoge tanto oficios católicos romanos como anglicanos. Este barrio se conoce como 'The Holy Corner' — cuatro religiones se practican en tres iglesias a corta distancia. Un lugar de tolerancia. Una llamativa iglesia ortodoxa nueva en la Sophie Van Akenstraat fue pintada por dentro con frescos en auténtica técnica bizantina.`,
      beer: ``,
      food: ``,
      nav: `Toma la segunda calle a la derecha (Zwartekatstraat). Al final, gira a la derecha y luego inmediatamente a la izquierda hacia la Begijnhofdries. Sigue recto por la Sophie Van Akenstraat.`,
    },
    de: {
      name: `Altes Beginenhof – Sint-Elisabethkerk`,
      desc: `Es gilt als einer der ältesten Beginenhöfe Flanderns; die Atmosphäre genießt man am besten in der Proveniersterstraat. Die Sint-Elisabethkerk ist das zentrale Gebäude des Oud-begijnhof. Ungewöhnlich: Hier finden sowohl römisch-katholische als auch anglikanische Gottesdienste statt. Dieses Viertel heißt 'The Holy Corner' — vier Religionen werden in drei Kirchen auf engem Raum praktiziert. Ein Ort der Toleranz. Eine markante neue orthodoxe Kirche in der Sophie Van Akenstraat wurde innen mit Fresken in authentischer byzantinischer Technik bemalt.`,
      beer: ``,
      food: ``,
      nav: `Zweite Straße rechts (Zwartekatstraat). Am Ende rechts, dann sofort links in die Begijnhofdries. Geradeaus weiter in die Sophie Van Akenstraat.`,
    },
  },
  {
    id: 17, lat: 51.0588, lon: 3.7150, extension: true,
    en: {
      name: `Prinsenhof`,
      desc: `The 'Donkere Poort' (Dark Gate) on your left is the only remnant of the 'Hof ten Walle', once a fortified castle. The square here, the Prinsenhof, was part of the large domain of the Flemish Counts. None other than Charles V was born here in 1500. The statue represents the proud Charles. It is thanks to Charles V that the people of Ghent are called 'noose-bearers' — after he forced all officials and nobles to make a penitential walk through the streets with a noose around their necks and barefoot.`,
      beer: ``,
      food: ``,
      nav: `Leave the Sophie Van Akenstraat and turn right into the Jan Verspeyenstraat. Follow it to the Basseveldestraat, turn right at the end (Rabotstraat) then first left into the Simon de Mirabellostraat. At the end go straight on into the Zilverhof. After about 50 metres turn left through a gateway to the Bridge of Imperial Pleasures.`,
    },
    nl: {
      name: `Prinsenhof`,
      desc: `De 'Donkere Poort' links is het enige overblijfsel van het 'Hof ten Walle', destijds een versterkt kasteel. Het Prinsenhof maakte deel uit van het grote domein van de Vlaamse Graven. Niemand minder dan Keizer Karel werd hier geboren in 1500. Het beeldje stelt de fiere Karel voor. Het is aan Keizer Karel te danken dat de Gentenaars 'stroppendragers' worden genoemd — hij dwong alle ambtenaren en edellieden een boetewandeling te maken met een strop om de hals en blootvoets.`,
      beer: ``,
      food: ``,
      nav: `Loop de Sophie Van Akenstraat uit en ga rechtsaf de Jan Verspeyenstraat in. Volg deze tot de Basseveldestraat, ga op het einde rechtsaf (Rabotstraat) en dan de eerste links, de Simon de Mirabellostraat. Aan het einde ga je rechtdoor het Zilverhof in. Loop zo'n 50 meter en ga links door een poort naar de Brug der Keizerlijke Geneugten.`,
    },
    fr: {
      name: `Prinsenhof`,
      desc: `La 'Porte Sombre' à gauche est le seul vestige du 'Hof ten Walle', jadis un château fort. Le Prinsenhof faisait partie du grand domaine des comtes flamands. Nul autre que Charles Quint y naquit en 1500. La statue représente le fier Charles. C'est à lui que les Gantois doivent leur surnom de 'porteurs de nœuds coulants' — il contraignit tous les fonctionnaires et nobles à une marche pénitentielle, nu-pieds et la corde au cou.`,
      beer: ``,
      food: ``,
      nav: `Quittez la Sophie Van Akenstraat et tournez à droite dans la Jan Verspeyenstraat. Suivez-la jusqu'à la Basseveldestraat, tournez à droite au bout (Rabotstraat) puis la première à gauche dans la Simon de Mirabellostraat. Au bout, continuez tout droit dans le Zilverhof. Après environ 50 mètres, tournez à gauche par un porche vers le Pont des Plaisirs Impériaux.`,
    },
    es: {
      name: `Prinsenhof`,
      desc: `La 'Donkere Poort' (Puerta Oscura) a tu izquierda es el único vestigio del 'Hof ten Walle', antaño un castillo fortificado. La plaza, el Prinsenhof, formaba parte del gran dominio de los condes flamencos. Nada menos que Carlos V nació aquí en 1500. La estatua representa al orgulloso Carlos. Es gracias a Carlos V que a los ganteses se les llama 'portadores de soga' — después de que obligara a todos los funcionarios y nobles a hacer una marcha penitencial por las calles con una soga al cuello y descalzos.`,
      beer: ``,
      food: ``,
      nav: `Sal de la Sophie Van Akenstraat y gira a la derecha por la Jan Verspeyenstraat. Síguelo hasta la Basseveldestraat, gira a la derecha al final (Rabotstraat) y luego la primera a la izquierda por la Simon de Mirabellostraat. Al final sigue recto hacia el Zilverhof. Tras unos 50 metros, gira a la izquierda por un portal hacia el Puente de los Placeres Imperiales.`,
    },
    de: {
      name: `Prinsenhof`,
      desc: `Die 'Donkere Poort' (Dunkles Tor) zu deiner Linken ist das einzige Überbleibsel des 'Hof ten Walle', einst eine befestigte Burg. Der Platz, der Prinsenhof, gehörte zum großen Besitz der flämischen Grafen. Kein Geringerer als Karl V. wurde hier 1500 geboren. Die Statue stellt den stolzen Karl dar. Karl V. ist es zu verdanken, dass die Genter 'Strickträger' genannt werden — nachdem er alle Beamten und Adligen zwang, barfuß und mit einem Strick um den Hals einen Bußgang durch die Straßen zu machen.`,
      beer: ``,
      food: ``,
      nav: `Die Sophie Van Akenstraat verlassen und rechts in die Jan Verspeyenstraat abbiegen. Bis zur Basseveldestraat folgen, am Ende rechts (Rabotstraat) und dann die erste links in die Simon de Mirabellostraat. Am Ende geradeaus ins Zilverhof. Nach ca. 50 Metern links durch ein Tor zur Brug der Keizerlijke Geneugten.`,
    },
  },
  {
    id: 18, lat: 51.0577, lon: 3.7171, extension: true,
    en: {
      name: `Bridge of Imperial Pleasures`,
      desc: `The Bridge of Imperial Pleasures was built in 2000 (the Charles V centennial year) over the River Lieve, with statues by Ghent sculptor and cabaret artist Walter De Buck (1934–2014), referencing various legends about Charles V's life. The ship at one end refers to the story of the 'ship-puller': the emperor accidentally caused a barge to run aground on a towpath; the captain forced Charles to pull it free, after which Charles gave him a new boat.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
      nav: `Cross the bridge and go right to the next bridge. Cross it, go right and a little further turn left into the Tinnenpotstraat. At the end of the Tinnenpotstraat reach a small square; go left into 'het Gewad' and take the first left, the Sint-Widostraat. (Route without extension: arrive from the other side and go right into the Sint-Widostraat.)`,
    },
    nl: {
      name: `Brug der Keizerlijke Geneugten`,
      desc: `De Brug der Keizerlijke Geneugten werd in het Keizer Kareljaar 2000 over de Lieve gebouwd, met beelden van de Gentse beeldhouwer en kleinkunstenaar Walter De Buck (1934–2014). Ze verwijzen naar legenden over Keizer Karel. Het schip verwijst naar het verhaal van de scheepstrekker: de keizer liep op een jaagpad een bootsman voor de voeten, waardoor zijn schip strandde. De kapitein dwong Karel het schip los te trekken, waarop Karel hem een nieuwe boot gaf.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
      nav: `Steek de brug over en ga naar rechts tot aan de volgende brug. Over die brug rechts en iets verder de Tinnenpotstraat links in. Loop de Tinnenpotstraat uit tot een pleintje; ga links de straat 'Gewad' in en neem de eerste links, de Sint-Widostraat. (Wandeling zonder uitbreiding: kom hier van de andere kant en ga rechts de Sint-Widostraat in.)`,
    },
    fr: {
      name: `Pont des Délices Impériaux`,
      desc: `Le Pont des Délices Impériaux fut construit en 2000 (l'année du centenaire de Charles Quint) sur la rivière Lieve, avec des statues du sculpteur et artiste de cabaret gantois Walter De Buck (1934–2014). Elles font référence à des légendes sur la vie de Charles Quint. Le navire évoque l'histoire du 'tireur de bateau' : l'empereur gêna un batelier sur un chemin de halage, causant l'échouement du navire ; le capitaine força Charles à le renflouer, qui lui offrit ensuite un nouveau bateau.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
      nav: `Traversez le pont et allez à droite jusqu'au pont suivant. Traversez-le, tournez à droite puis un peu plus loin à gauche dans la Tinnenpotstraat. Au bout, arrivez sur une petite place ; prenez à gauche le 'Gewad' puis la première à gauche, la Sint-Widostraat. (Itinéraire sans extension : arrivez de l'autre côté et prenez à droite la Sint-Widostraat.)`,
    },
    es: {
      name: `Puente de los Placeres Imperiales`,
      desc: `El Puente de los Placeres Imperiales se construyó en 2000 (año del centenario de Carlos V) sobre el río Lieve, con estatuas del escultor y artista de cabaré gantés Walter De Buck (1934–2014), que aluden a varias leyendas sobre la vida de Carlos V. El barco de un extremo remite a la historia del 'remolcador de barcos': el emperador hizo encallar sin querer una gabarra en un camino de sirga; el capitán obligó a Carlos a soltarla, tras lo cual Carlos le regaló un barco nuevo.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
      nav: `Cruza el puente y ve a la derecha hasta el siguiente puente. Crúzalo, gira a la derecha y un poco más adelante gira a la izquierda por la Tinnenpotstraat. Al final llega a una pequeña plaza; gira a la izquierda por 'het Gewad' y toma la primera a la izquierda, la Sint-Widostraat. (Ruta sin extensión: llegas por el otro lado y giras a la derecha por la Sint-Widostraat.)`,
    },
    de: {
      name: `Brücke der kaiserlichen Genüsse`,
      desc: `Die Brücke der kaiserlichen Genüsse wurde 2000 (im Karl-V.-Jubiläumsjahr) über die Lieve gebaut, mit Statuen des Genter Bildhauers und Kleinkünstlers Walter De Buck (1934–2014), die auf verschiedene Legenden über Karl V. verweisen. Das Schiff an einem Ende bezieht sich auf die Geschichte des 'Schiffsziehers': Der Kaiser brachte auf einem Treidelpfad versehentlich einen Kahn zum Stranden; der Kapitän zwang Karl, ihn freizuziehen, woraufhin Karl ihm ein neues Boot schenkte.`,
      beer: `'t Floere Foefke – Molenaarsstraat 3.`,
      food: ``,
      nav: `Überquere die Brücke, rechts bis zur nächsten Brücke. Diese überqueren, rechts abbiegen und etwas weiter links in die Tinnenpotstraat. Am Ende auf einem Platzchen: links ins 'Gewad' und erste links, die Sint-Widostraat. (Route ohne Verlängerung: von der anderen Seite ankommend rechts in die Sint-Widostraat.)`,
    },
  },
  {
    id: 19, lat: 51.0572, lon: 3.7183, extension: false,
    en: {
      name: `De Lieve`,
      desc: `The Lieve was dug between 1251 and 1269 to connect the city with the Zwin at Damme. From there, goods such as fine cloth could be shipped to England. The Dutch also used this canal for trade. The Sint-Widostraat in a bend offers a view of both the theatre Arca (NTG) and a beautiful vista through to the Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
      nav: `Go right onto the bridge and walk the street to its end at a junction. Turn left into the Sint-Margrietstraat — the Caermersklooster is straight ahead of you.`,
    },
    nl: {
      name: `De Lieve`,
      desc: `De Lieve werd tussen 1251 en 1269 gegraven om de stad te verbinden met het Zwin in Damme. Van daar konden goederen zoals fijne lakenstof naar Engeland verscheept worden. Ook de Hollanders gebruikten dit kanaal om handel te drijven. De Sint-Widostraat biedt een fraai doorkijkje naar het Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
      nav: `Ga rechts op de brug en wandel de straat ten einde tot een kruispunt. Ga links de Sint-Margrietstraat in; recht voor je is het Caermersklooster.`,
    },
    fr: {
      name: `De Lieve`,
      desc: `La Lieve fut creusée entre 1251 et 1269 pour relier la ville au Zwin de Damme. De là, des marchandises comme du tissu fin pouvaient être expédiées en Angleterre. Les Néerlandais utilisaient aussi ce canal pour le commerce. La Sint-Widostraat offre une belle vue sur le Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
      nav: `Prenez à droite sur le pont et marchez jusqu'au bout de la rue jusqu'à un carrefour. Tournez à gauche dans la Sint-Margrietstraat — le Caermersklooster est droit devant vous.`,
    },
    es: {
      name: `De Lieve`,
      desc: `El Lieve se excavó entre 1251 y 1269 para conectar la ciudad con el Zwin en Damme. Desde allí podían enviarse a Inglaterra mercancías como tejidos finos. Los neerlandeses también usaban este canal para comerciar. La Sint-Widostraat, en una curva, ofrece una vista del teatro Arca (NTG) y una bonita perspectiva hacia el Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
      nav: `Gira a la derecha hacia el puente y camina hasta el final de la calle en un cruce. Gira a la izquierda por la Sint-Margrietstraat — el Caermersklooster está justo enfrente.`,
    },
    de: {
      name: `De Lieve`,
      desc: `Die Lieve wurde zwischen 1251 und 1269 gegraben, um die Stadt mit dem Zwin bei Damme zu verbinden. Von dort konnten Waren wie feines Tuch nach England verschifft werden. Auch die Niederländer nutzten diesen Kanal für den Handel. Die Sint-Widostraat bietet in einer Kurve einen Blick auf das Theater Arca (NTG) und eine schöne Sicht zum Gravensteen.`,
      beer: `Folklore – Lange Steenstraat 69.`,
      food: ``,
      nav: `Rechts auf die Brücke und die Straße bis zur Kreuzung entlanggehen. Links in die Sint-Margrietstraat — das Caermersklooster liegt direkt vor dir.`,
    },
  },
  {
    id: 20, lat: 51.0566, lon: 3.7182, extension: false,
    en: {
      name: `Caermersklooster`,
      desc: `This former Carmelite monastery was in use from the end of the 13th century. Besides the usual monastery buildings there was also a brewery. After the French Revolution it passed into private hands; later the city of Ghent bought the buildings. It has been transformed into an exhibition space where mainly prestigious temporary exhibitions take place, often with free admission. In one of the living quarters a huge wall painting with remains of a fresco can be viewed (at a charge).`,
      beer: ``,
      food: ``,
      nav: `In the Sint-Margrietstraat take the first street on the right (Tempelhof), right next to the Sint-Stephanuskerk.`,
    },
    nl: {
      name: `Caermersklooster`,
      desc: `Dit vroegere klooster van de geschoeide karmelieten was al in gebruik eind 13de eeuw. Naast de kloostergebouwen was er ook een brouwerij. Na de Franse revolutie ging het in privéhanden; later kocht de stad Gent de gebouwen. Het is omgevormd tot een tentoonstellingsruimte waar tijdelijke exposities plaatsvinden, vaak gratis. In een van de woonvertrekken is een reusachtig muurschilderij met resten van een fresco te bekijken (betalend).`,
      beer: ``,
      food: ``,
      nav: `Neem in de Sint-Margrietstraat de eerste straat rechts (Tempelhof), vlak bij de Sint-Stephanuskerk.`,
    },
    fr: {
      name: `Caermersklooster`,
      desc: `Cet ancien monastère carmélitain était en usage dès la fin du XIIIe siècle. Outre les bâtiments monastiques, il possédait aussi une brasserie. Après la Révolution française, il passa en mains privées ; plus tard la ville de Gand racheta les bâtiments. Transformé en espace d'exposition pour des expositions temporaires de prestige, souvent gratuites. Dans un des logements, une immense peinture murale avec vestiges de fresque peut être visitée (payant).`,
      beer: ``,
      food: ``,
      nav: `Dans la Sint-Margrietstraat, prenez la première rue à droite (Tempelhof), juste à côté de la Sint-Stephanuskerk.`,
    },
    es: {
      name: `Caermersklooster`,
      desc: `Este antiguo monasterio carmelita estuvo en uso desde finales del siglo XIII. Además de los edificios habituales del monasterio, había también una cervecería. Tras la Revolución francesa pasó a manos privadas; más tarde la ciudad de Gante compró los edificios. Se ha transformado en un espacio expositivo donde tienen lugar sobre todo prestigiosas exposiciones temporales, a menudo de entrada gratuita. En una de las viviendas puede verse una enorme pintura mural con restos de un fresco (de pago).`,
      beer: ``,
      food: ``,
      nav: `En la Sint-Margrietstraat, toma la primera calle a la derecha (Tempelhof), justo al lado de la Sint-Stephanuskerk.`,
    },
    de: {
      name: `Caermersklooster`,
      desc: `Dieses ehemalige Karmeliterkloster war ab Ende des 13. Jahrhunderts in Gebrauch. Neben den üblichen Klostergebäuden gab es auch eine Brauerei. Nach der Französischen Revolution ging es in Privatbesitz über; später kaufte die Stadt Gent die Gebäude. Es wurde zu einem Ausstellungsraum umgebaut, in dem vor allem renommierte Wechselausstellungen stattfinden, oft bei freiem Eintritt. In einem der Wohnräume ist ein riesiges Wandgemälde mit Resten eines Freskos zu besichtigen (gegen Gebühr).`,
      beer: ``,
      food: ``,
      nav: `In der Sint-Margrietstraat erste Straße rechts (Tempelhof), gleich neben der Sint-Stephanuskerk.`,
    },
  },
  {
    id: 21, lat: 51.0563, lon: 3.7179, extension: false,
    en: {
      name: `Sint-Stephanuskerk`,
      desc: `Saint Stephanus's Church also has a connection with the Mystic Lamb. During the Second World War, several panels of the world-famous 'Mystic Lamb' by the Van Eyck brothers were hidden here from the occupiers. The church can be entered early, from 6:30 to 12:30, and from 14:00 to 18:30.`,
      beer: ``,
      food: ``,
      nav: `In the Tempelhof street you'll see graffiti of a large animal on the right — the next stop.`,
    },
    nl: {
      name: `Sint-Stephanuskerk`,
      desc: `Ook de Sint-Stephanuskerk heeft iets met het Lam Gods. Tijdens de Tweede Wereldoorlog werden hier immers een aantal panelen van het wereldberoemde 'Lam Gods' van de gebroeders Van Eyck verborgen gehouden voor de bezetters. Je kan er al vroeg binnen, van 6u30 tot 12u30, en van 14u tot 18u30.`,
      beer: ``,
      food: ``,
      nav: `In de Tempelhof-straat zie je rechts graffiti van een groot dier — de volgende halte.`,
    },
    fr: {
      name: `Église Saint-Étienne`,
      desc: `L'église Saint-Étienne a aussi un lien avec l'Agneau Mystique. Pendant la Seconde Guerre mondiale, plusieurs panneaux du célèbre polyptyque des frères Van Eyck y furent cachés aux occupants. L'église est accessible dès 6h30–12h30, puis de 14h à 18h30.`,
      beer: ``,
      food: ``,
      nav: `Dans la rue Tempelhof, vous verrez un graffiti d'un grand animal à droite — l'arrêt suivant.`,
    },
    es: {
      name: `Iglesia de San Esteban`,
      desc: `La iglesia de San Esteban también tiene relación con el Cordero Místico. Durante la Segunda Guerra Mundial se ocultaron aquí, a los ocupantes, varios paneles del mundialmente famoso 'Cordero Místico' de los hermanos Van Eyck. Se puede entrar temprano, de 6:30 a 12:30, y de 14:00 a 18:30.`,
      beer: ``,
      food: ``,
      nav: `En la calle Tempelhof verás a la derecha un grafiti de un gran animal — la siguiente parada.`,
    },
    de: {
      name: `Sankt-Stephanus-Kirche`,
      desc: `Auch die Sankt-Stephanus-Kirche hat eine Verbindung zum Genter Altarbild. Während des Zweiten Weltkriegs wurden hier mehrere Tafeln des weltberühmten 'Lam Gods' der Brüder Van Eyck vor den Besatzern versteckt. Die Kirche kann früh betreten werden, von 6:30 bis 12:30 und von 14:00 bis 18:30 Uhr.`,
      beer: ``,
      food: ``,
      nav: `In der Tempelhof-Straße siehst du rechts Graffiti eines großen Tieres — der nächste Halt.`,
    },
  },
  {
    id: 22, lat: 51.0560, lon: 3.7177, extension: false,
    en: {
      name: `Graffiti – Roa (Giant Rabbits)`,
      desc: `These giant rabbits leave little to the imagination. The Ghent street artist Roa has put animals on walls in several places around the world, each time in large format and often in black and white. You can find his work at other locations in Ghent too.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
      nav: `At the car park keep right and take the first street on the right (Lange Schipgracht). At the end go left, then right into the small park. Walk through and cross the street (Oudburg) to the water. Take the footpath along the water to the right and follow the waterside to the next bridge (Zuivelbrug), go up and keep right. A little further is the Huis van Alijn.`,
    },
    nl: {
      name: `Graffiti – Roa (Reusachtige Konijnen)`,
      desc: `Deze reusachtige konijnen laten weinig aan de verbeelding over. De Gentse graffitikunstenaar Roa zette al op meerdere plaatsen in de wereld dieren op muren, telkens in groot formaat en vaak in zwart-wit. Je kan ook op andere plaatsen in Gent werk van hem gaan bekijken.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
      nav: `Houd bij de parking rechts aan en neem de eerste straat rechtsaf (Lange Schipgracht). Op het einde naar links en naar rechts het parkje in. Wandel het parkje uit en steek de straat (Oudburg) over tot aan het water. Neem het voetgangerspad langs het water naar rechts en volg de waterkant tot de volgende brug (Zuivelbrug), ga naar boven en houd rechts. Iets verder is het Huis van Alijn.`,
    },
    fr: {
      name: `Graffiti – Roa (Lapins Géants)`,
      desc: `Ces lapins géants ne laissent que peu de place à l'imagination. L'artiste de street art gantois Roa a peint des animaux sur des murs en plusieurs endroits dans le monde, toujours en grand format et souvent en noir et blanc. On peut voir son œuvre à d'autres endroits dans Gand.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
      nav: `Au parking, restez à droite et prenez la première rue à droite (Lange Schipgracht). Au bout, à gauche puis à droite dans le petit parc. Traversez et franchissez la rue (Oudburg) jusqu'à l'eau. Prenez le chemin piéton le long de l'eau à droite et suivez le bord de l'eau jusqu'au pont suivant (Zuivelbrug), montez et restez à droite. Un peu plus loin se trouve le Huis van Alijn.`,
    },
    es: {
      name: `Grafiti – Roa (Conejos Gigantes)`,
      desc: `Estos conejos gigantes dejan poco a la imaginación. El artista urbano gantés Roa ha pintado animales en muros en varios lugares del mundo, siempre en gran formato y a menudo en blanco y negro. También puedes encontrar obra suya en otros puntos de Gante.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
      nav: `En el aparcamiento, mantente a la derecha y toma la primera calle a la derecha (Lange Schipgracht). Al final, a la izquierda y luego a la derecha hacia el pequeño parque. Cruza y atraviesa la calle (Oudburg) hasta el agua. Toma el camino peatonal junto al agua hacia la derecha y sigue la orilla hasta el siguiente puente (Zuivelbrug), sube y mantente a la derecha. Un poco más adelante está el Huis van Alijn.`,
    },
    de: {
      name: `Graffiti – Roa (Riesenkaninchen)`,
      desc: `Diese Riesenkaninchen lassen wenig der Fantasie übrig. Der Genter Streetart-Künstler Roa hat an mehreren Orten weltweit Tiere auf Wände gebracht, stets im Großformat und oft in Schwarz-Weiß. Auch an anderen Stellen in Gent findest du seine Werke.`,
      beer: `Café de Welkom – Oudburg 70a. Yo's Place – Oudburg 15. Aba-jour – Oudburg 20.`,
      food: `Soeplounge – Zuivelbrugstraat 4.`,
      nav: `Am Parkplatz rechts halten und erste Straße rechts (Lange Schipgracht). Am Ende links, dann rechts in den kleinen Park. Durch den Park und Straße (Oudburg) bis zum Wasser überqueren. Fußweg am Wasser rechts entlang bis zur nächsten Brücke (Zuivelbrug), hinaufgehen und rechts halten. Etwas weiter das Huis van Alijn.`,
    },
  },
  {
    id: 23, lat: 51.0568, lon: 3.7208, extension: false,
    en: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `The cosy inn of the House of Alijn (also accessible without museum visit) and its courtyard garden are a pleasant resting point. The museum in the 14th-century building grew from the Museum of Folklore — inside, objects, photos and films give a good impression of Ghent folk life before the mid-20th century. The house holds the original 'Manneke Pis of Ghent'; the statue now has two companions, girls called Luna and Lena. Nearby is the oldest sweet shop in Ghent, Huis Temmerman, selling treats with typically Ghent names.`,
      beer: ``,
      food: `Julie's House – Cup Cakes.`,
      nav: `You can optionally take a detour through the Patershol — the narrow lanes behind the Kraanlei, packed with restaurants.`,
    },
    nl: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `De gezellige herberg van het Huis van Alijn (ook toegankelijk zonder museumbezoek) en de binnentuin zijn een aangenaam rustpunt. Het museum in het 14de-eeuwse godshuis groeide uit het Museum voor Volkskunde — binnen krijg je een goed beeld van het Vlaamse volksleven voor het midden van de 20ste eeuw. In het huis bevindt zich het originele 'Gentse Manneke Pis'; naast de replica staan nu ook twee meisjes, Luna en Lena. In de buurt is Huis Temmerman, de oudste snoepwinkel van Gent.`,
      beer: ``,
      food: `Julie's House – Cup Cakes.`,
      nav: `Je kunt eventueel een ommetje maken door het Patershol — de straatjes achter de Kraanlei met veel restaurantjes.`,
    },
    fr: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `L'auberge conviviale du Huis van Alijn (accessible sans visite du musée) et son jardin sont une agréable halte. Le musée dans l'édifice du XIVe siècle, issu du Musée du Folklore, retrace la vie populaire gantoise avant le milieu du XXe siècle. La maison conserve l'original du 'Manneke Pis gantois' ; la réplique est maintenant accompagnée de deux filles, Luna et Lena. Tout près, la confiserie Huis Temmerman, la plus ancienne de Gand, vend des sucreries aux noms typiquement gantois.`,
      beer: ``,
      food: `Julie's House – Cupcakes.`,
      nav: `Vous pouvez éventuellement faire un détour par le Patershol — les ruelles derrière la Kraanlei, pleines de restaurants.`,
    },
    es: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `La acogedora posada del Huis van Alijn (también accesible sin visitar el museo) y su jardín interior son un agradable punto de descanso. El museo, en el edificio del siglo XIV, surgió del Museo del Folclore — dentro, objetos, fotos y películas dan una buena idea de la vida popular gantesa anterior a mediados del siglo XX. La casa guarda el 'Manneke Pis de Gante' original; la estatua tiene ahora dos compañeras, las niñas Luna y Lena. Cerca está la confitería más antigua de Gante, Huis Temmerman, que vende golosinas con nombres típicamente ganteses.`,
      beer: ``,
      food: `Julie's House – Cupcakes.`,
      nav: `Opcionalmente puedes hacer un desvío por el Patershol — los callejones detrás de la Kraanlei, llenos de restaurantes.`,
    },
    de: {
      name: `Huis van Alijn & Kraanlei`,
      desc: `Das gemütliche Wirtshaus des Huis van Alijn (auch ohne Museumsbesuch zugänglich) und sein Innenhofgarten sind ein angenehmer Rastpunkt. Das Museum im Gebäude aus dem 14. Jahrhundert ging aus dem Volkskundemuseum hervor — drinnen vermitteln Objekte, Fotos und Filme einen guten Eindruck des Genter Volkslebens vor Mitte des 20. Jahrhunderts. Das Haus bewahrt das originale 'Genter Manneke Pis'; die Statue hat heute zwei Begleiterinnen, die Mädchen Luna und Lena. In der Nähe liegt der älteste Süßwarenladen Gents, Huis Temmerman, mit Leckereien mit typisch Genter Namen.`,
      beer: ``,
      food: `Julie's House – Cupcakes.`,
      nav: `Optional: Abstecher durch das Patershol — die engen Gassen hinter der Kraanlei, voll mit Restaurants.`,
    },
  },
  {
    id: 24, lat: 51.0572, lon: 3.7203, extension: false,
    en: {
      name: `Patershol`,
      desc: `The narrow medieval streets behind Kraanlei are the Patershol. In this old quarter, former inhabitants have been replaced by numerous restaurants. In the 18th century it was home to magistrates; in the 19th century to cotton factory workers. Today: Japanese and Indonesian food, Turkish, Italian, Spanish and traditional Flemish cuisine — all shoulder to shoulder in cobbled streets. Whether modern, romantic, eccentric or exclusive, you won't leave with an empty stomach.`,
      beer: ``,
      food: ``,
      nav: `Continue along the waterside; it curves gently right at the end, bringing you to the Veerleplein with the entrance to the Gravensteen.`,
    },
    nl: {
      name: `Patershol`,
      desc: `De smalle middeleeuwse straatjes achter de Kraanlei zijn het Patershol. In deze oude wijk zijn de vroegere bewoners verdrongen door talrijke restaurantjes. In de 18de eeuw woonden er magistraten; in de 19de eeuw arbeiders uit de katoenfabrieken. Vandaag: Japans, Indonesisch, Turks, Italiaans, Spaans en Vlaams — allemaal naast elkaar in de kinderkopjesstraatjes. Of de stijl nu hip, romantisch, een beetje zot of exclusief is, de honger zal gestild zijn.`,
      beer: ``,
      food: ``,
      nav: `Vervolg je route langs het water; die maakt op het einde een lichte bocht naar rechts en brengt je op het Veerleplein met de ingang van het Gravensteen.`,
    },
    fr: {
      name: `Patershol`,
      desc: `Les ruelles médiévales derrière le Kraanlei forment le Patershol. Dans ce vieux quartier, les anciens habitants ont été remplacés par de nombreux restaurants. Au XVIIIe siècle y vivaient des magistrats ; au XIXe siècle des ouvriers des filatures. Aujourd'hui : cuisine japonaise, indonésienne, turque, italienne, espagnole et flamande traditionnelle — côte à côte dans les ruelles pavées. Qu'il soit branché, romantique, un peu fou ou exclusif, vous ne repartirez pas le ventre vide.`,
      beer: ``,
      food: ``,
      nav: `Continuez le long de l'eau ; elle tourne doucement à droite au bout et vous amène sur le Veerleplein face à l'entrée du Gravensteen.`,
    },
    es: {
      name: `Patershol`,
      desc: `Las estrechas calles medievales detrás del Kraanlei forman el Patershol. En este viejo barrio, los antiguos habitantes han sido sustituidos por numerosos restaurantes. En el siglo XVIII vivían aquí magistrados; en el XIX, obreros de las fábricas de algodón. Hoy: comida japonesa e indonesia, turca, italiana, española y cocina flamenca tradicional — todo codo con codo en calles adoquinadas. Sea moderno, romántico, excéntrico o exclusivo, no te irás con el estómago vacío.`,
      beer: ``,
      food: ``,
      nav: `Continúa a lo largo del agua; al final hace una suave curva a la derecha y te lleva al Veerleplein con la entrada al Gravensteen.`,
    },
    de: {
      name: `Patershol`,
      desc: `Die engen mittelalterlichen Gassen hinter dem Kraanlei bilden das Patershol. In diesem alten Viertel wurden die einstigen Bewohner durch zahlreiche Restaurants verdrängt. Im 18. Jahrhundert wohnten hier Magistrate; im 19. Jahrhundert Arbeiter der Baumwollfabriken. Heute: japanische und indonesische Küche, türkische, italienische, spanische und traditionelle flämische — alles dicht an dicht in Kopfsteinpflastergassen. Ob modern, romantisch, exzentrisch oder exklusiv, mit leerem Magen gehst du nicht.`,
      beer: ``,
      food: ``,
      nav: `Am Wasser entlanggehen; es biegt am Ende leicht rechts ab und führt zum Veerleplein mit dem Eingang zum Gravensteen.`,
    },
  },
  {
    id: 25, lat: 51.0574, lon: 3.7197, extension: false,
    en: {
      name: `Veerleplein`,
      desc: `In the corner stands the historic gateway to the Old Fish Market. Neptune supervises the Leie (woman) and the Scheldt (man). The tourist office is in the building. The long white table is a unique creation to discover Ghent. The lanterns on Sint-Veerleplein are an artwork by Alberto Garutti — every time a baby is born in a Ghent hospital, parents can press a button and the lanterns light up briefly. This square was once where witches were burned at the stake in the 16th–17th centuries.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
      nav: `With your back to the Gravensteen gateway, walk to the bridge and at its very end take the small steps down on the right. Walk along the water with views of the Oude Vismijn and the Vleeshuis. At the next bridge take the steps up, go left and immediately left again — ahead you'll see the Groot Vleeshuis.`,
    },
    nl: {
      name: `Veerleplein`,
      desc: `In de hoek staat de historische toegangspoort tot de Oude Vismijn. Neptunus houdt toezicht op de Leie (vrouw) en de Schelde (man). In het gebouw is de toeristische dienst. De lange witte tafel is een heel bijzondere creatie om Gent te ontdekken. De lantaarns op het Sint-Veerleplein zijn een kunstwerk van Alberto Garutti — elke keer dat een baby wordt geboren in een Gents ziekenhuis, kunnen de ouders op een knop drukken en lichten de lantaarns even op. Ooit was dit plein de plaats waar heksen op de brandstapel werden gezet.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
      nav: `Met je rug naar de toegangspoort van het Gravensteen stap je naar de brug en neem je net op het einde rechts de kleine trap naar beneden. Wandel langs het water met het uitzicht op de Oude Vismijn en het Vleeshuis. Bij de volgende brug neem je de trap omhoog, ga naar links en dan meteen weer links — voor je zie je het Groot Vleeshuis.`,
    },
    fr: {
      name: `Veerleplein`,
      desc: `Dans le coin se trouve la porte historique du Vieux Marché aux Poissons. Neptune supervise la Leie (femme) et l'Escaut (homme). L'office de tourisme est dans le bâtiment. La grande table blanche est une création unique pour découvrir Gand. Les lanternes de Sint-Veerleplein sont une œuvre d'Alberto Garutti — à chaque naissance dans un hôpital gantois, les parents peuvent appuyer un bouton pour faire briller les lanternes. Cette place était autrefois le lieu des bûchers de sorcières aux XVIe–XVIIe siècles.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
      nav: `Dos à la porte d'entrée du Gravensteen, marchez vers le pont et tout au bout prenez les petites marches à droite vers le bas. Longez l'eau avec vue sur l'Oude Vismijn et le Vleeshuis. Au pont suivant, montez les marches, allez à gauche puis immédiatement à gauche encore — devant vous se trouve le Groot Vleeshuis.`,
    },
    es: {
      name: `Veerleplein`,
      desc: `En la esquina se alza la histórica puerta de la Antigua Lonja del Pescado. Neptuno vigila el Leie (mujer) y el Escalda (hombre). La oficina de turismo está en el edificio. La larga mesa blanca es una creación única para descubrir Gante. Las farolas de la Sint-Veerleplein son una obra de Alberto Garutti — cada vez que nace un bebé en un hospital de Gante, los padres pueden pulsar un botón y las farolas se iluminan brevemente. Esta plaza fue antaño el lugar donde se quemaba a las brujas en la hoguera en los siglos XVI–XVII.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
      nav: `De espaldas a la puerta del Gravensteen, camina hacia el puente y al final toma las pequeñas escaleras de bajada a la derecha. Camina junto al agua con vistas a la Oude Vismijn y el Vleeshuis. En el siguiente puente sube las escaleras, gira a la izquierda e inmediatamente otra vez a la izquierda — ante ti verás el Groot Vleeshuis.`,
    },
    de: {
      name: `Veerleplein`,
      desc: `In der Ecke steht das historische Tor zur Alten Fischhalle. Neptun überwacht die Leie (Frau) und die Schelde (Mann). Das Touristenbüro befindet sich im Gebäude. Der lange weiße Tisch ist eine einzigartige Kreation, um Gent zu entdecken. Die Laternen am Sint-Veerleplein sind ein Kunstwerk von Alberto Garutti — jedes Mal, wenn in einem Genter Krankenhaus ein Baby geboren wird, können die Eltern einen Knopf drücken, und die Laternen leuchten kurz auf. Auf diesem Platz wurden im 16.–17. Jahrhundert einst Hexen auf dem Scheiterhaufen verbrannt.`,
      beer: `'t Einde der beschaving – Sint-Veerleplein 8. Waterhuis aan de Bierkant – Groentenmarkt 9.`,
      food: ``,
      nav: `Mit dem Rücken zum Eingangstor des Gravensteen zur Brücke gehen, ganz am Ende rechts die kleine Treppe hinunter. Am Wasser entlanggehen mit Blick auf Oude Vismijn und Vleeshuis. Bei der nächsten Brücke die Treppe hoch, links und sofort wieder links — vor dir das Groot Vleeshuis.`,
    },
  },
  {
    id: 26, lat: 51.0568, lon: 3.7214, extension: false,
    en: {
      name: `Groot Vleeshuis & Groentemarkt`,
      desc: `A medieval hall from the early 15th century where you can find almost 200 East-Flemish regional products and specialties — and consume them on site. Above your head hang the famous Ghent 'Gandahammen'. Next door: 't Galgenhuis, the smallest café in Ghent — offal was sold here to those who couldn't afford meat; the 'galg' (gallows) in the name refers to convicts who waited at the rear façade. The Groentemarkt is famous for cuberdon stands ('Neuzekes') and the historic mustard house Vve Tierenteyn-Verlent; also home to Ghent's oldest bakery Oud Huis Himschoot and the Belgian Artisan Centre BAM.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
      nav: `Cross the Groentemarkt and turn left into the Lange Munt. At the end you'll reach the cannon, the Dulle Griet.`,
    },
    nl: {
      name: `Groot Vleeshuis & Groentemarkt`,
      desc: `Een middeleeuwse hal uit begin 15de eeuw voor bijna 200 Oost-Vlaamse streekproducten — die je ook ter plaatse kan eten. Boven je hoofd hangen de bekende Gentse Gandahammen. Aanpalend: 't Galgenhuis, het kleinste caféetje van Gent — ingewanden werden hier verkocht aan wie geen vlees kon betalen; 'galg' in de naam verwijst naar veroordeelden die bij de achtergevel wachtten. De Groentemarkt is beroemd om cuberdonstands ('Neuzekes') en het historische mosterdhuis Vve Tierenteyn-Verlent; ook adres van Gents oudste bakkerij Oud Huis Himschoot en het Belgian Artisan Centre BAM.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
      nav: `Kruis de Groentemarkt en ga links de Lange Munt in. Op het einde kom je bij het kanon, de Dulle Griet.`,
    },
    fr: {
      name: `Grande Boucherie & Groentemarkt`,
      desc: `Une halle médiévale du début du XVe siècle proposant près de 200 produits régionaux de Flandre orientale — à consommer sur place. Au-dessus, les fameux 'Gandahammen'. À côté : 't Galgenhuis, le plus petit café de Gand — on y vendait des abats à ceux qui n'avaient pas les moyens d'acheter de la viande ; 'galg' (potence) rappelle les condamnés qui attendaient à la façade arrière. Le Groentemarkt est réputé pour ses stands de cuberdons ('Neuzekes') et la moutarderie historique Vve Tierenteyn-Verlent ; aussi siège de la plus ancienne boulangerie de Gand Oud Huis Himschoot et du Centre Artisanal Belge BAM.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
      nav: `Traversez la Groentemarkt et prenez à gauche dans la Lange Munt. Au bout, vous arriverez au canon, la Dulle Griet.`,
    },
    es: {
      name: `Groot Vleeshuis & Groentemarkt`,
      desc: `Una nave medieval de principios del siglo XV donde encuentras casi 200 productos y especialidades regionales de Flandes Oriental — y puedes consumirlos allí mismo. Sobre tu cabeza cuelgan los famosos 'Gandahammen' (jamones) de Gante. Al lado: 't Galgenhuis, el café más pequeño de Gante — aquí se vendían vísceras a quienes no podían permitirse carne; la 'galg' (horca) del nombre alude a los condenados que esperaban en la fachada trasera. El Groentemarkt es famoso por los puestos de cuberdones ('Neuzekes') y la histórica mostacería Vve Tierenteyn-Verlent; también acoge la panadería más antigua de Gante, Oud Huis Himschoot, y el Centro Artesanal Belga BAM.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
      nav: `Cruza la Groentemarkt y gira a la izquierda por la Lange Munt. Al final llegarás al cañón, la Dulle Griet.`,
    },
    de: {
      name: `Groot Vleeshuis & Groentemarkt`,
      desc: `Eine mittelalterliche Halle vom Beginn des 15. Jahrhunderts, in der du fast 200 ostflämische Regionalprodukte und Spezialitäten findest — und vor Ort verzehren kannst. Über deinem Kopf hängen die berühmten Genter 'Gandahammen' (Schinken). Nebenan: 't Galgenhuis, das kleinste Café Gents — hier wurden Innereien an jene verkauft, die sich kein Fleisch leisten konnten; der 'galg' (Galgen) im Namen verweist auf Verurteilte, die an der Rückfassade warteten. Der Groentemarkt ist berühmt für seine Cuberdon-Stände ('Neuzekes') und das historische Senfhaus Vve Tierenteyn-Verlent; auch die älteste Bäckerei Gents, Oud Huis Himschoot, und das Belgian Artisan Centre BAM sind hier.`,
      beer: `'t Galgenhuis – Groentenmarkt 5.`,
      food: ``,
      nav: `Den Groentemarkt überqueren und links in die Lange Munt. Am Ende erreichst du die Kanone, die Dulle Griet.`,
    },
  },
  {
    id: 27, lat: 51.0572, lon: 3.7234, extension: false,
    en: {
      name: `Dulle Griet`,
      desc: `The iron Dulle Griet ('Evil Woman') is 5 metres long and weighs 12,500 kg. Painted ox-red, earning it the nickname 'large red devil'. Little is known about this bombard (a type of cannon). It is said Duke Philip the Good ordered it made around 1430 and it may have been used in the siege of Oudenaarde in 1452 — though other sources say it never fired a single projectile. The opening was eventually sealed because it was too often used for rubbish or as a sleeping place by drunk students.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
      nav: `Now go right to reach the Vrijdagmarkt.`,
    },
    nl: {
      name: `Dulle Griet`,
      desc: `De ijzeren Dulle Griet is vijf meter lang en 12.500 kg zwaar. Ossenrood geverfd, wat de bijnaam 'grooten rooden duvele' opleverde. Er is eigenlijk niet zoveel geweten over deze bombarde. Men zegt dat hertog Filips de Goede hem rond 1430 liet maken en dat hij gebruikt is bij het beleg van Oudenaarde in 1452 — andere bronnen zeggen dat hij nooit een projectiel heeft afgeschoten. De opening werd dichtgemaakt omdat studenten er te vaak in sliepen of vuilnis achterlieten.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
      nav: `Ga nu rechts tot op de Vrijdagmarkt.`,
    },
    fr: {
      name: `Dulle Griet`,
      desc: `Le fer Dulle Griet ('Femme maléfique') mesure 5 mètres et pèse 12.500 kg. Peint en rouge bœuf, d'où le surnom de 'grand duvele rouge'. On sait peu de choses sur ce canon. Le duc Philippe le Bon l'aurait fait fabriquer vers 1430, utilisé lors du siège d'Audenarde en 1452 — d'autres sources affirment qu'il n'a jamais tiré. L'ouverture a été condamnée car les étudiants ivres y dormaient ou y laissaient des ordures.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
      nav: `Allez maintenant à droite jusqu'à la Vrijdagmarkt.`,
    },
    es: {
      name: `Dulle Griet`,
      desc: `La Dulle Griet ('Mujer Furiosa') de hierro mide 5 metros y pesa 12.500 kg. Pintada de rojo buey, lo que le valió el apodo de 'gran diablo rojo'. Poco se sabe de esta bombarda (un tipo de cañón). Se dice que el duque Felipe el Bueno la mandó fabricar hacia 1430 y que pudo usarse en el asedio de Oudenaarde en 1452 — aunque otras fuentes dicen que nunca disparó un solo proyectil. La abertura acabó sellándose porque se usaba con demasiada frecuencia para tirar basura o como lugar para dormir de estudiantes borrachos.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
      nav: `Ahora ve a la derecha hasta la Vrijdagmarkt.`,
    },
    de: {
      name: `Dulle Griet`,
      desc: `Die eiserne Dulle Griet ('Tolle Grete') ist 5 Meter lang und wiegt 12.500 kg. Ochsenrot gestrichen, was ihr den Spitznamen 'großer roter Teufel' einbrachte. Über diese Bombarde (eine Art Kanone) ist wenig bekannt. Es heißt, Herzog Philipp der Gute habe sie um 1430 anfertigen lassen, und sie sei vielleicht bei der Belagerung von Oudenaarde 1452 eingesetzt worden — andere Quellen sagen, sie habe nie ein einziges Geschoss abgefeuert. Die Öffnung wurde schließlich verschlossen, weil sie zu oft für Müll oder als Schlafplatz betrunkener Studenten genutzt wurde.`,
      beer: `Gitane – Meerseniersstraat 9. 't Kanon – Meerseniersstraat 17. Barrazza – Hoefslagstraatje 6.`,
      food: ``,
      nav: `Jetzt rechts bis zum Vrijdagmarkt.`,
    },
  },
  {
    id: 28, lat: 51.0574, lon: 3.7259, extension: false,
    en: {
      name: `Vrijdagmarkt`,
      desc: `Jacob Van Artevelde's statue surveys the square from above. In the first half of the 14th century this Ghent-born statesman negotiated a trade agreement with Edward III of England, keeping the Ghent textile industry alive. He was later murdered by weavers. He points towards England — a nod to his ties with King Edward III. Since 1199 a weekly market has been held here every Friday. The Toreken (15th c.) was the guild house of the tanners; it now houses the Poetry Centre for Flanders. A statue of folk singer Karel Waeri, who sang about workers' poverty, stands nearby.`,
      beer: `De Dulle Griet – Vrijdagmarkt: vast selection of 500+ Belgian regional beers. Order a 'kwak' in a special glass and leave your shoe as deposit! De Afsnis – solid local brown café, featured in the film 'Belgica'.`,
      food: ``,
      nav: `Keep Jacob van Artevelde on your right, cross to the Wijzemanstraat on the far side and immediately go left (at the Karel Waeri statue). Continue to the roundabout, then diagonally left into the Bibliotheekstraat. Head towards a small park, keep right, first right and immediately right again — you'll see the Gruut brewery on your right.`,
    },
    nl: {
      name: `Vrijdagmarkt`,
      desc: `Het standbeeld van Jacob Van Artevelde kijkt neer op het plein. In de eerste helft van de 14de eeuw onderhandelde deze Gentenaar met Edward III van Engeland om de Gentse lakennijverheid te redden. Hij werd later door wevers vermoord. Hij wijst richting Engeland — een knipoog naar zijn banden met Eduard III. Elke vrijdag al since 1199 is hier markt. Het Toreken (15de eeuw) was het gildehuis van de huidevetters; nu is het het Poëziecentrum voor Vlaanderen. Een standbeeld van volkszanger Karel Waeri, die zong over arbeidsarmoede, staat in de buurt.`,
      beer: `De Dulle Griet – Vrijdagmarkt: ruim aanbod van 500+ Belgische streekbieren. Bestel een 'kwak' in een speciaal glas — je schoen als borg! De Afsnis – bruine praatcafé, figureerde in de film 'Belgica'.`,
      food: ``,
      nav: `Houd Jacob van Artevelde rechts, bereik aan de overzijde de Wijzemanstraat en ga onmiddellijk links (bij het standbeeld van Karel Waeri). Vervolg tot het rondpunt en ga dan schuin links de Bibliotheekstraat in. Wandel naar een parkje, houd rechts en neem de eerste rechts en meteen weer rechts; je ziet rechts de stadsbrouwerij Gentse Gruut.`,
    },
    fr: {
      name: `Vrijdagmarkt`,
      desc: `La statue de Jacob Van Artevelde domine la place. Au XIVe siècle, ce Gantois négocia un accord commercial avec Édouard III d'Angleterre pour maintenir l'industrie textile gantoise. Il fut ensuite assassiné par des tisserands. Il pointe vers l'Angleterre — un clin d'œil à ses liens avec le roi Édouard III. Un marché hebdomadaire se tient ici tous les vendredis depuis 1199. Le Toreken (XVe s.) était la guilde des tanneurs ; il abrite aujourd'hui le Centre de Poésie de Flandre. Une statue du chanteur populaire Karel Waeri se dresse à proximité.`,
      beer: `De Dulle Griet – Vrijdagmarkt : sélection de 500+ bières régionales belges. Commandez une 'kwak' dans un verre spécial — votre chaussure en caution! De Afsnis – café traditionnel, apparu dans le film 'Belgica'.`,
      food: ``,
      nav: `Gardez Jacob van Artevelde à droite, traversez jusqu'à la Wijzemanstraat en face et allez immédiatement à gauche (à la statue de Karel Waeri). Continuez jusqu'au rond-point, puis obliquement à gauche dans la Bibliotheekstraat. Dirigez-vous vers un petit parc, restez à droite, première à droite et immédiatement à droite encore — vous verrez la brasserie Gruut à droite.`,
    },
    es: {
      name: `Vrijdagmarkt`,
      desc: `La estatua de Jacob Van Artevelde domina la plaza desde lo alto. En la primera mitad del siglo XIV este estadista nacido en Gante negoció un acuerdo comercial con Eduardo III de Inglaterra que mantuvo viva la industria textil gantesa. Más tarde fue asesinado por los tejedores. Señala hacia Inglaterra — un guiño a sus lazos con el rey Eduardo III. Desde 1199 se celebra aquí un mercado semanal cada viernes. El Toreken (siglo XV) fue la casa gremial de los curtidores; hoy alberga el Centro de Poesía de Flandes. Cerca hay una estatua del cantante popular Karel Waeri, que cantaba sobre la pobreza de los obreros.`,
      beer: `De Dulle Griet – Vrijdagmarkt: amplia selección de más de 500 cervezas regionales belgas. ¡Pide una 'kwak' en un vaso especial y deja tu zapato como fianza! De Afsnis – sólido café tradicional, que aparece en la película 'Belgica'.`,
      food: ``,
      nav: `Mantén a Jacob van Artevelde a tu derecha, cruza hasta la Wijzemanstraat al otro lado y gira inmediatamente a la izquierda (junto a la estatua de Karel Waeri). Continúa hasta la rotonda y luego en diagonal a la izquierda por la Bibliotheekstraat. Dirígete hacia un pequeño parque, mantente a la derecha, primera a la derecha e inmediatamente otra vez a la derecha — verás la cervecería Gruut a tu derecha.`,
    },
    de: {
      name: `Vrijdagmarkt`,
      desc: `Die Statue von Jacob Van Artevelde überblickt den Platz von oben. In der ersten Hälfte des 14. Jahrhunderts handelte dieser in Gent geborene Staatsmann ein Handelsabkommen mit Eduard III. von England aus, das die Genter Textilindustrie am Leben hielt. Später wurde er von Webern ermordet. Er weist nach England — ein Verweis auf seine Verbindung zu König Eduard III. Seit 1199 findet hier jeden Freitag ein Wochenmarkt statt. Das Toreken (15. Jh.) war das Gildehaus der Gerber; heute beherbergt es das Poesiezentrum für Flandern. In der Nähe steht eine Statue des Volkssängers Karel Waeri, der über die Armut der Arbeiter sang.`,
      beer: `De Dulle Griet – Vrijdagmarkt: große Auswahl von über 500 belgischen Regionalbieren. Bestell ein 'Kwak' im Spezialglas und hinterlege deinen Schuh als Pfand! De Afsnis – solides traditionelles Café, zu sehen im Film 'Belgica'.`,
      food: ``,
      nav: `Jacob van Artevelde rechts halten, zur Wijzemanstraat auf der anderen Seite queren und sofort links (beim Karel Waeri-Denkmal). Weiter bis zum Kreisverkehr, dann schräg links in die Bibliotheekstraat. Zu einem kleinen Park gehen, rechts halten, erste rechts und sofort wieder rechts — rechts siehst du die Brauerei Gruut.`,
    },
  },
  {
    id: 29, lat: 51.0558, lon: 3.7246, extension: false,
    en: {
      name: `Gruut Stadsbrouwerij`,
      desc: `Founded in 2009 by Annick De Splenter, who grew up working in the brewing world. There are five varieties of beer, four of which are brewed using herbs instead of hops — reviving a medieval tradition. Both café and brewery (free to visit) are under one roof.`,
      beer: `Gruut Stadsbrouwerij – on-site brewery café.`,
      food: ``,
      nav: `At the end of the street turn right. At the roundabout you'll see the Sint-Jacobskerk again; walk round it to the left until you reach the entrance at the rear.`,
    },
    nl: {
      name: `Gentse Gruut Stadsbrouwerij`,
      desc: `Opgericht in 2009 door Annick De Splenter, die van huize uit altijd in de brouwerijwereld werkte. Er zijn vijf variëteiten bier, waarvan vier gebrouwen met kruiden i.p.v. hop — een herleven van de middeleeuwse traditie. Zowel café als brouwerij (vrij te bezichtigen) zijn onder één dak.`,
      beer: `Gruut Stadsbrouwerij – brouwerijcafé ter plaatse.`,
      food: ``,
      nav: `Ga aan het einde van de straat naar rechts. Aan de rotonde zie je opnieuw de Sint-Jacobskerk; wandel er links omheen tot bij de ingang aan de achterzijde.`,
    },
    fr: {
      name: `Gentse Gruut (Brasserie de la Ville)`,
      desc: `Fondée en 2009 par Annick De Splenter, qui a grandi dans le monde de la brasserie. Cinq variétés de bières, dont quatre brassées aux herbes plutôt qu'au houblon — une tradition médiévale ressuscitée. Café et brasserie (visite gratuite) sont sous le même toit.`,
      beer: `Gruut Stadsbrouwerij – café-brasserie sur place.`,
      food: ``,
      nav: `Au bout de la rue, tournez à droite. Au rond-point vous reverrez la Sint-Jacobskerk ; contournez-la par la gauche jusqu'à l'entrée à l'arrière.`,
    },
    es: {
      name: `Gentse Gruut (Cervecería Urbana)`,
      desc: `Fundada en 2009 por Annick De Splenter, que se crió en el mundo cervecero. Hay cinco variedades de cerveza, cuatro de ellas elaboradas con hierbas en lugar de lúpulo — reviviendo una tradición medieval. Tanto el café como la cervecería (visita gratuita) están bajo un mismo techo.`,
      beer: `Gruut Stadsbrouwerij – café-cervecería en el propio local.`,
      food: ``,
      nav: `Al final de la calle, gira a la derecha. En la rotonda verás de nuevo la Sint-Jacobskerk; rodéala por la izquierda hasta la entrada trasera.`,
    },
    de: {
      name: `Gentse Gruut (Stadtbrauerei)`,
      desc: `Gegründet 2009 von Annick De Splenter, die in der Brauwelt aufwuchs. Es gibt fünf Biersorten, vier davon mit Kräutern statt Hopfen gebraut — eine wiederbelebte mittelalterliche Tradition. Café und Brauerei (kostenlos zu besichtigen) sind unter einem Dach.`,
      beer: `Gruut Stadsbrouwerij – Brauerei-Café vor Ort.`,
      food: ``,
      nav: `Am Ende der Straße rechts abbiegen. Am Kreisverkehr siehst du wieder die Sint-Jacobskerk; links um sie herum bis zum Eingang an der Rückseite.`,
    },
  },
  {
    id: 30, lat: 51.0558, lon: 3.7249, extension: false,
    en: {
      name: `Sint-Jacobskerk (Saint-James' Church)`,
      desc: `Around the middle of the 12th century, the current Saint-James' Church was begun. One of the most beautiful works of art is a Renaissance tabernacle of black marble and copper. The church is only open on Fridays and Saturdays in the morning. A flea market takes place at the church every Friday, Saturday and Sunday morning. Every July for ten days, Ghent's great folk festival erupts here: Sint-Jacobs is the vibrant core of the Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
      nav: `With your back to the church entrance, turn right (Bij Sint-Jacobs) and follow it left. On the Kammerstraat go briefly right and immediately left into the Serpentenstraat. At the end turn right then immediately left into a narrow alley: the Graffitistraatje (Werregarenstraat).`,
    },
    nl: {
      name: `Sint-Jacobskerk`,
      desc: `Rond het midden van de 12de eeuw werd begonnen aan de huidige Sint-Jacobskerk. Een van de mooiste kunstwerken is een tabernakel van zwart marmer en koper uit de renaissancetijd. De kerk is slechts beperkt open, enkel op vrijdag en zaterdagochtend. Elke vrijdag-, zaterdag- en zondagochtend is er een brocantemarkt. Elke juli, tien dagen lang, is Sint-Jacobs de bruisende kern van de Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
      nav: `Met je rug naar de kerkingang ga je rechtsaf (Bij Sint-Jacobs) en volg je naar links. Op de Kammerstraat ga je even naar rechts en meteen weer links, de Serpentenstraat in. Op het einde naar rechts en dan direct links een smal steegje in: het Graffitistraatje (Werregarenstraat).`,
    },
    fr: {
      name: `Église Saint-Jacques`,
      desc: `Vers le milieu du XIIe siècle, l'actuelle église Saint-Jacques a été construite. L'une des plus belles œuvres est un tabernacle Renaissance en marbre noir et cuivre. L'église n'est ouverte que les vendredi et samedi matin. Un marché aux puces s'y tient chaque vendredi, samedi et dimanche matin. Chaque juillet pendant dix jours, Sint-Jacobs est le cœur vibrant des Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
      nav: `Dos à l'entrée de l'église, tournez à droite (Bij Sint-Jacobs) et suivez à gauche. Sur la Kammerstraat allez brièvement à droite puis immédiatement à gauche dans la Serpentenstraat. Au bout tournez à droite puis immédiatement à gauche dans une ruelle étroite : le Graffitistraatje (Werregarenstraat).`,
    },
    es: {
      name: `Iglesia de Santiago`,
      desc: `Hacia mediados del siglo XII se inició la actual iglesia de Santiago. Una de sus obras más bellas es un tabernáculo renacentista de mármol negro y cobre. La iglesia solo abre los viernes y sábados por la mañana. Cada viernes, sábado y domingo por la mañana hay un mercadillo junto a la iglesia. Cada julio, durante diez días, estalla aquí la gran fiesta popular de Gante: Sint-Jacobs es el vibrante núcleo de las Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
      nav: `De espaldas a la entrada de la iglesia, gira a la derecha (Bij Sint-Jacobs) y sigue a la izquierda. En la Kammerstraat ve brevemente a la derecha e inmediatamente a la izquierda por la Serpentenstraat. Al final gira a la derecha y luego inmediatamente a la izquierda por un callejón estrecho: el Graffitistraatje (Werregarenstraat).`,
    },
    de: {
      name: `Sankt-Jakobs-Kirche`,
      desc: `Um die Mitte des 12. Jahrhunderts wurde mit der heutigen Sankt-Jakobs-Kirche begonnen. Eines der schönsten Kunstwerke ist ein Renaissance-Tabernakel aus schwarzem Marmor und Kupfer. Die Kirche ist nur freitags und samstags vormittags geöffnet. Jeden Freitag, Samstag und Sonntag findet morgens ein Flohmarkt an der Kirche statt. Jeden Juli zehn Tage lang bricht hier Gents großes Volksfest los: Sint-Jacobs ist das pulsierende Herz der Gentse Feesten.`,
      beer: `Trollekelder – Walter De Buckplein 4. Trefpunt – Walter De Buckplein 5.`,
      food: ``,
      nav: `Mit dem Rücken zum Kircheneingang rechts (Bij Sint-Jacobs) und links folgen. Auf der Kammerstraat kurz rechts und sofort links in die Serpentenstraat. Am Ende rechts, dann sofort links in eine enge Gasse: das Graffitistraatje (Werregarenstraat).`,
    },
  },
  {
    id: 31, lat: 51.0545, lon: 3.7232, extension: false,
    en: {
      name: `Werregarenstraat (Graffiti Street)`,
      desc: `Officially the Werregarenstraatje but better known as the Graffiti Street, between Hoogpoort and Onderstraat. Since 1995, anyone who feels called to leave a creation here may do so — with one rule: don't attack works that are better than what you can shake out of your spray can. The appearance changes regularly. It is one of four officially tolerated graffiti locations in Ghent. The city also runs graffiti projects, workshops and an annual jam.`,
      beer: ``,
      food: ``,
      nav: `At the end of the alley turn left into the Hoogpoort; the town hall appears immediately before you.`,
    },
    nl: {
      name: `Werregarenstraat (Graffitistraatje)`,
      desc: `Officieel het Werregarenstraatje maar beter gekend als het graffitistraatje, tussen de Hoogpoort en de Onderstraat. Vanaf 1995 mag iedereen die zich geroepen voelt zijn creatie achterlaten — met maar één regel: ga geen werken te lijf die beter zijn dan wat jij uit jouw spuitbus kan schudden. Het uitzicht verandert regelmatig. Een van vier officieel gedoogde graffitilocaties in Gent. De stad organiseert ook graffiti-projecten, workshops en een jaarlijkse jam.`,
      beer: ``,
      food: ``,
      nav: `Aan het einde van het straatje ga je naar links, de Hoogpoort in; meteen doemt het stadhuis op.`,
    },
    fr: {
      name: `Werregarenstraat (Rue du Graffiti)`,
      desc: `Officiellement la Werregarenstraatje, mais mieux connue sous le nom de 'Rue du Graffiti', entre le Hoogpoort et l'Onderstraat. Depuis 1995, toute personne qui se sent inspirée peut y laisser une création — avec une seule règle : ne pas attaquer les œuvres meilleures que ce que vous pouvez sortir de votre bombe. L'apparence change régulièrement. C'est l'un des quatre endroits officiellement tolérés pour le graffiti à Gand.`,
      beer: ``,
      food: ``,
      nav: `Au bout de la ruelle, tournez à gauche dans la Hoogpoort ; la mairie se dresse immédiatement devant vous.`,
    },
    es: {
      name: `Werregarenstraat (Callejón del Grafiti)`,
      desc: `Oficialmente Werregarenstraatje, pero más conocido como el Callejón del Grafiti, entre Hoogpoort y Onderstraat. Desde 1995, cualquiera que se sienta llamado a dejar una creación aquí puede hacerlo — con una regla: no ataques obras mejores que lo que tú puedas sacar de tu spray. Su aspecto cambia con regularidad. Es uno de los cuatro lugares de grafiti oficialmente tolerados en Gante. La ciudad organiza además proyectos de grafiti, talleres y una jam anual.`,
      beer: ``,
      food: ``,
      nav: `Al final del callejón, gira a la izquierda hacia la Hoogpoort; el ayuntamiento aparece inmediatamente ante ti.`,
    },
    de: {
      name: `Werregarenstraat (Graffiti-Gasse)`,
      desc: `Offiziell die Werregarenstraatje, besser bekannt als Graffiti-Gasse, zwischen Hoogpoort und Onderstraat. Seit 1995 darf jeder, der sich berufen fühlt, hier eine Kreation hinterlassen — mit einer Regel: Greif keine Werke an, die besser sind als das, was du aus deiner Spraydose schüttelst. Das Erscheinungsbild ändert sich ständig. Es ist einer von vier offiziell geduldeten Graffiti-Orten in Gent. Die Stadt veranstaltet auch Graffiti-Projekte, Workshops und eine jährliche Jam.`,
      beer: ``,
      food: ``,
      nav: `Am Ende der Gasse links in die Hoogpoort abbiegen; das Rathaus erscheint sofort vor dir.`,
    },
  },
  {
    id: 32, lat: 51.0524, lon: 3.7227, extension: false,
    en: {
      name: `Stadhuis (Town Hall)`,
      desc: `The central part of the Town Hall dates from the 15th century, with various additions in different architectural styles. The Hoogpoort side looks particularly rich — niches depict the Counts of Flanders. The Botermarkt side shows Renaissance style (late 16th – early 17th century) with three column types (Doric, Ionic, Corinthian). A striking blue-and-white drainpipe on the building — coloured since 2002 — appears to reference AA Gent football colours, but monuments conservation says it is an authentic reconstruction.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
      nav: `At the junction go straight ahead, then take the first street on the right, the narrow Biezekapelstraat.`,
    },
    nl: {
      name: `Stadhuis`,
      desc: `Het centrale gedeelte van het Stadhuis dateert uit de 15de eeuw, met uiteenlopende toevoegingen in verschillende bouwstijlen. De kant van de Hoogpoort is bijzonder rijk — in de nissen staan de graven van Vlaanderen. De Botermarktzijde toont de renaissancestijl (eind 16de – begin 17de eeuw) met de drie kolomtypes (Dorisch, Ionisch, Korintisch). Een opvallende blauw-witte regenpijp — zo gekleurd since 2002 — lijkt te verwijzen naar de kleuren van AA Gent; Monumentenzorg zegt echter dat het een authentieke reconstructie is.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
      nav: `Stap aan het kruispunt rechtdoor en neem dan de eerste straat rechts, de smalle Biezekapelstraat.`,
    },
    fr: {
      name: `Hôtel de Ville`,
      desc: `La partie centrale de l'Hôtel de Ville date du XVe siècle, avec diverses adjonctions dans différents styles architecturaux. Le côté Hoogpoort est particulièrement riche — les niches représentent les comtes de Flandre. Le côté Botermarkt montre le style Renaissance (fin XVIe – début XVIIe s.) avec trois types de colonnes (dorique, ionique, corinthien). Un remarquable tuyau bleu et blanc — coloré depuis 2002 — semble référencer les couleurs du club de foot AA Gent, mais la protection des monuments affirme qu'il s'agit d'une reconstruction authentique.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
      nav: `Au carrefour, allez tout droit puis prenez la première rue à droite, la Biezekapelstraat, une ruelle étroite.`,
    },
    es: {
      name: `Ayuntamiento`,
      desc: `La parte central del Ayuntamiento data del siglo XV, con diversas ampliaciones en distintos estilos arquitectónicos. El lado de la Hoogpoort luce especialmente rico — las hornacinas representan a los condes de Flandes. El lado de la Botermarkt muestra el estilo renacentista (finales del XVI – principios del XVII) con tres tipos de columna (dórica, jónica, corintia). Una llamativa bajante azul y blanca del edificio — coloreada desde 2002 — parece aludir a los colores del club de fútbol AA Gent, pero Patrimonio afirma que es una reconstrucción auténtica.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
      nav: `En el cruce, sigue recto y luego toma la primera calle a la derecha, la estrecha Biezekapelstraat.`,
    },
    de: {
      name: `Rathaus`,
      desc: `Der zentrale Teil des Rathauses stammt aus dem 15. Jahrhundert, mit diversen Anbauten in verschiedenen Baustilen. Die Seite zur Hoogpoort wirkt besonders prächtig — Nischen zeigen die Grafen von Flandern. Die Seite zur Botermarkt zeigt den Renaissancestil (spätes 16. – frühes 17. Jh.) mit drei Säulenarten (dorisch, ionisch, korinthisch). Ein auffälliges blau-weißes Fallrohr am Gebäude — seit 2002 so gefärbt — scheint auf die Farben des Fußballclubs AA Gent zu verweisen, doch der Denkmalschutz sagt, es sei eine authentische Rekonstruktion.`,
      beer: `Café Den Turk – Botermarkt 3. Artevelde Brewery – Botermarkt 5.`,
      food: ``,
      nav: `An der Kreuzung geradeaus, dann erste Straße rechts, die enge Biezekapelstraat.`,
    },
  },
  {
    id: 33, lat: 51.0521, lon: 3.7232, extension: false,
    en: {
      name: `Biezekapel`,
      desc: `The Biezekapel is one of the oldest chapels in the city. The present chapel dates from the early 18th century, but a statue of Mary in a niche was placed here as early as 1608 by Jean-Baptiste de Rodoan. Under French rule in 1794 the chapel was sealed; after restoration it was rededicated in 1931. You have to press your nose almost against the window to see the beautiful statue. In 1934 it was rumoured that the stolen panel of the 'Just Judges' from the Mystic Lamb was hidden here.`,
      beer: ``,
      food: ``,
      nav: `At the end of the Biezekapelstraat you reach the Sint-Baafskathedraal.`,
    },
    nl: {
      name: `Biezekapel`,
      desc: `De Biezekapel is een van de oudst gekende kapellen van de stad. De huidige kapel dateert van het begin van de 18de eeuw, maar al in 1608 stond er een Mariabeeldje in een nis, geplaatst door Jean-Baptiste de Rodoan. Tijdens de Franse overheersing in 1794 werd het kapelletje dichtgemetseld; na restauratie volgde een herinwijding in 1931. Je moet met de neus bijna tegen het raam staan om het prachtige beeld te kunnen zien. In 1934 werd gedacht dat hier het gestolen paneel van de Rechtvaardige Rechters verborgen zat.`,
      beer: ``,
      food: ``,
      nav: `Op het einde van de Biezekapelstraat kom je aan de Sint-Baafskathedraal.`,
    },
    fr: {
      name: `Biezekapel`,
      desc: `La Biezekapel est l'une des plus anciennes chapelles de la ville. La chapelle actuelle date du début du XVIIIe siècle, mais dès 1608 une statue de Marie y fut placée dans une niche par Jean-Baptiste de Rodoan. Sous la domination française en 1794, la chapelle fut murée ; restaurée, elle fut réinaugurée en 1931. Il faut coller son nez à la fenêtre pour voir la belle statue. En 1934, on crut que le panneau volé des 'Juges Équitables' y était caché.`,
      beer: ``,
      food: ``,
      nav: `Au bout de la Biezekapelstraat, vous arrivez à la Sint-Baafskathedraal.`,
    },
    es: {
      name: `Biezekapel`,
      desc: `La Biezekapel es una de las capillas más antiguas de la ciudad. La capilla actual data de principios del siglo XVIII, pero ya en 1608 Jean-Baptiste de Rodoan colocó aquí una estatua de María en una hornacina. Bajo el dominio francés, en 1794, la capilla fue tapiada; tras su restauración se volvió a consagrar en 1931. Hay que pegar casi la nariz a la ventana para ver la hermosa estatua. En 1934 se rumoreó que el panel robado de los 'Jueces Justos' del Cordero Místico estaba escondido aquí.`,
      beer: ``,
      food: ``,
      nav: `Al final de la Biezekapelstraat llegas a la Sint-Baafskathedraal.`,
    },
    de: {
      name: `Biezekapel`,
      desc: `Die Biezekapel ist eine der ältesten Kapellen der Stadt. Die heutige Kapelle stammt vom Anfang des 18. Jahrhunderts, doch schon 1608 stellte Jean-Baptiste de Rodoan hier eine Marienstatue in einer Nische auf. Unter französischer Herrschaft wurde die Kapelle 1794 zugemauert; nach der Restaurierung wurde sie 1931 neu geweiht. Man muss die Nase fast an die Scheibe drücken, um die schöne Statue zu sehen. 1934 ging das Gerücht um, die gestohlene Tafel der 'Gerechten Richter' aus dem Genter Altarbild sei hier versteckt.`,
      beer: ``,
      food: ``,
      nav: `Am Ende der Biezekapelstraat erreichst du die Sint-Baafskathedraal.`,
    },
  },
  {
    id: 34, lat: 51.0518, lon: 3.7239, extension: false,
    en: {
      name: `Sint-Baafskathedraal (Saint-Bavo's Cathedral)`,
      desc: `The predecessor 'Sint-Janskerk' existed in the 10th century. The present cathedral only received that status when the Diocese of Ghent was founded in 1559. Gothic elements were added from the late 13th century; the completely renovated cathedral was consecrated in 1659. Charles V was baptized here in 1500. Don't miss: the rococo pulpit, baroque high altar, choir stalls with stunning trompe-l'œil, paintings by Rubens and Joos van Wassenhover. Above all: 'The Mystic Lamb' by the Van Eyck brothers, one of the most famous paintings in the world — and the gripping story of a stolen panel ('the Just Judges') in 1934.`,
      beer: ``,
      food: ``,
      nav: `On leaving the cathedral go right and immediately right again into the narrow Kapittelstraat. Take the first street on the right (Hoofdkerkstraat) and you'll arrive at the Bisdomplein with the Episcopal Palace.`,
    },
    nl: {
      name: `Sint-Baafskathedraal`,
      desc: `De voorloper 'Sint-Janskerk' bestond al in de 10de eeuw. De huidige kathedraal kreeg die status pas bij de oprichting van het bisdom Gent in 1559. Gotische elementen werden toegevoegd vanaf eind 13de eeuw; de volledig vernieuwde kerk werd in 1659 ingewijd. Keizer Karel werd er in 1500 gedoopt. Bezienswaardig: de rococopreekstoel, het barokke hoogaltaar, koorgestoelte met schitterende trompe-l'œil, schilderijen van Rubens en Joos van Wassenhover. Bovenal: 'Het Lam Gods' van de gebroeders Van Eyck, een van de bekendste schilderijen ter wereld — en het fascinerende verhaal van het gestolen paneel ('de rechtvaardige rechters') in 1934.`,
      beer: ``,
      food: ``,
      nav: `Bij het verlaten van de kathedraal ga je naar rechts en meteen weer rechts, de smalle Kapittelstraat in. Neem de eerste straat rechts (Hoofdkerkstraat) en zo kom je op het Bisdomplein met het Bisschoppelijk Paleis.`,
    },
    fr: {
      name: `Cathédrale Sint-Baaf`,
      desc: `La prédécesseure 'Sint-Janskerk' existait dès le Xe siècle. La cathédrale actuelle ne reçut ce titre qu'à la fondation du diocèse de Gand en 1559. Des éléments gothiques furent ajoutés dès la fin du XIIIe siècle ; la cathédrale entièrement rénovée fut consacrée en 1659. Charles Quint y fut baptisé en 1500. À ne pas manquer : la chaire rococo, le maître-autel baroque, les stalles avec trompe-l'œil époustouflants, des peintures de Rubens et Joos van Wassenhover. Surtout : 'L'Agneau Mystique' des frères Van Eyck, l'un des tableaux les plus célèbres du monde — et l'histoire fascinante du panneau volé ('les Juges Équitables') en 1934.`,
      beer: ``,
      food: ``,
      nav: `En quittant la cathédrale, allez à droite et immédiatement à droite encore dans la Kapittelstraat étroite. Prenez la première rue à droite (Hoofdkerkstraat) et vous arriverez sur le Bisdomplein avec le Palais épiscopal.`,
    },
    es: {
      name: `Catedral de San Bavón`,
      desc: `La predecesora 'Sint-Janskerk' existía ya en el siglo X. La catedral actual solo obtuvo ese rango al fundarse la diócesis de Gante en 1559. Se añadieron elementos góticos desde finales del siglo XIII; la catedral, totalmente renovada, se consagró en 1659. Carlos V fue bautizado aquí en 1500. No te pierdas: el púlpito rococó, el altar mayor barroco, la sillería del coro con asombrosos trampantojos, cuadros de Rubens y Joos van Wassenhover. Sobre todo: 'El Cordero Místico' de los hermanos Van Eyck, uno de los cuadros más famosos del mundo — y la apasionante historia del panel robado ('los Jueces Justos') en 1934.`,
      beer: ``,
      food: ``,
      nav: `Al salir de la catedral, gira a la derecha e inmediatamente otra vez a la derecha por la estrecha Kapittelstraat. Toma la primera calle a la derecha (Hoofdkerkstraat) y llegarás al Bisdomplein con el Palacio Episcopal.`,
    },
    de: {
      name: `Sankt-Bavo-Kathedrale`,
      desc: `Die Vorgängerin 'Sint-Janskerk' existierte bereits im 10. Jahrhundert. Die heutige Kathedrale erhielt diesen Rang erst mit Gründung des Bistums Gent 1559. Ab dem späten 13. Jahrhundert kamen gotische Elemente hinzu; die völlig erneuerte Kathedrale wurde 1659 geweiht. Karl V. wurde hier 1500 getauft. Nicht verpassen: die Rokoko-Kanzel, der barocke Hochaltar, das Chorgestühl mit verblüffenden Trompe-l'œil, Gemälde von Rubens und Joos van Wassenhover. Vor allem: 'Das Genter Altarbild' der Brüder Van Eyck, eines der berühmtesten Gemälde der Welt — und die fesselnde Geschichte einer gestohlenen Tafel ('die Gerechten Richter') 1934.`,
      beer: ``,
      food: ``,
      nav: `Die Kathedrale verlassen, rechts und sofort wieder rechts in die enge Kapittelstraat. Erste Straße rechts (Hoofdkerkstraat) und du erreichst den Bisdomplein mit dem Bischofspalais.`,
    },
  },
  {
    id: 35, lat: 51.0505, lon: 3.7233, extension: false,
    en: {
      name: `Bisschoppelijk Paleis (Episcopal Palace)`,
      desc: `Construction of the Episcopal Palace began in 1843 and was completed just two years later. Above the main entrance door is the coat of arms of its builder, Bishop Louis Joseph Delbecque. Cross the nearby Wijdenaardbrug ('wide mooring place') — since the end of 2018 the water of the Lower Scheldt flows under this bridge again towards Portus Ganda, where the Leie and Scheldt once joined.`,
      beer: ``,
      food: ``,
      nav: `Cross the square and walk over the Wijdenaardbrug. Follow the Reep to the right; at the junction the Geraard de Duivelsteen looms before you.`,
    },
    nl: {
      name: `Bisschoppelijk Paleis`,
      desc: `De bouw van het Bisschoppelijk Paleis werd aangevat in 1843 en twee jaar later al voltooid. Boven de voornaamste toegangsdeur prijkt het wapenschild van de bouwheer, bisschop Louis Joseph Delbecque. Steek de nabijgelegen Wijdenaardbrug over ('brede aanlegplaats') — depuis eind 2018 stroomt het water van de Nederschelde weer onder de brug door naar Portus Ganda, waar vroeger de Leie en de Schelde samenvloeiden.`,
      beer: ``,
      food: ``,
      nav: `Steek het plein over en stap over de Wijdenaardbrug. Volg de Reep naar rechts; op het kruispunt doemt het Geraard de Duivelsteen op.`,
    },
    fr: {
      name: `Palais Épiscopal`,
      desc: `La construction du Palais Épiscopal débuta en 1843 et s'acheva deux ans plus tard. Au-dessus de la porte principale se trouve le blason du bâtisseur, Mgr Louis Joseph Delbecque. Traversez le Wijdenaardbrug voisin ('large place d'accostage') — depuis fin 2018, l'eau de l'Escaut inférieur coule à nouveau sous ce pont vers Portus Ganda, là où la Leie et l'Escaut se rejoignaient jadis.`,
      beer: ``,
      food: ``,
      nav: `Traversez la place et franchissez le Wijdenaardbrug. Suivez la Reep vers la droite ; au carrefour, le Geraard de Duivelsteen se dresse devant vous.`,
    },
    es: {
      name: `Palacio Episcopal`,
      desc: `La construcción del Palacio Episcopal comenzó en 1843 y se completó apenas dos años después. Sobre la puerta principal está el escudo de su constructor, el obispo Louis Joseph Delbecque. Cruza el cercano Wijdenaardbrug ('amplio embarcadero') — desde finales de 2018 el agua del Bajo Escalda vuelve a fluir bajo este puente hacia Portus Ganda, donde antaño se unían el Leie y el Escalda.`,
      beer: ``,
      food: ``,
      nav: `Cruza la plaza y pasa por el Wijdenaardbrug. Sigue la Reep hacia la derecha; en el cruce aparece el Geraard de Duivelsteen.`,
    },
    de: {
      name: `Bischofspalast`,
      desc: `Der Bau des Bischofspalastes begann 1843 und war schon zwei Jahre später vollendet. Über dem Haupteingang prangt das Wappen seines Bauherrn, Bischof Louis Joseph Delbecque. Überquere den nahen Wijdenaardbrug ('breiter Anlegeplatz') — seit Ende 2018 fließt das Wasser der Unterschelde wieder unter dieser Brücke hindurch Richtung Portus Ganda, wo einst Leie und Schelde zusammenflossen.`,
      beer: ``,
      food: ``,
      nav: `Den Platz überqueren und über den Wijdenaardbrug gehen. Der Reep rechts folgen; an der Kreuzung taucht das Geraard de Duivelsteen auf.`,
    },
  },
  {
    id: 36, lat: 51.0499, lon: 3.7219, extension: false,
    en: {
      name: `Geraard de Duivelsteen`,
      desc: `Despite the name, no devil ever lived in this 'Steen' (stone building). It owes its name to Gerard of Ghent, an unsavoury character born around 1210 who owned the building in the 13th century. He called himself 'knight Gerard of Ghent, nicknamed the Devil'. Legend says he killed his father, kicked his son to death, and occupied himself with 'debauchery, shame and horror'. After his death the building passed to the city: it has since been an arsenal, school, monastery, prison, disciplinary house and home for the mentally ill.`,
      beer: ``,
      food: ``,
      nav: `Go straight ahead through the François Laurentplein and at the end turn right towards the Kouter.`,
    },
    nl: {
      name: `Geraard de Duivelsteen`,
      desc: `Ondanks de naam heeft nooit een duivel in dit steen gewoond. Het dankt zijn naam aan Geraard van Gent, een onguur heerschap geboren rond 1210. Hij noemde zichzelf 'ridder Geraard van Gent, bijgenaamd de Duivel'. Legende zegt dat hij zijn vader vermoordde, zijn zoontje doodschopte, en zich bezig hield met 'brasserijen, schanddaden en gruwelen'. Na zijn dood ging het steen naar de stad: sindsdien was het achtereenvolgens wapenarsenaal, school, klooster, gevangenis, tuchthuis en huis voor krankzinnigen.`,
      beer: ``,
      food: ``,
      nav: `Ga rechtdoor via het François Laurentplein en op het einde naar rechts, richting de Kouter.`,
    },
    fr: {
      name: `Geraard de Duivelsteen`,
      desc: `Malgré le nom, aucun diable ne vécut jamais dans cette 'Steen' (bâtiment en pierre). Elle doit son nom à Gérard de Gand, un personnage douteux né vers 1210 qui possédait cet édifice au XIIIe siècle. Il se faisait appeler 'le chevalier Gérard de Gand, surnommé le Diable'. La légende dit qu'il tua son père, mit son fils à mort à coups de pied, et s'occupait de 'débauches, honte et horreurs'. Après sa mort, l'édifice passa à la ville : il fut successivement arsenal, école, monastère, prison, maison de correction et asile.`,
      beer: ``,
      food: ``,
      nav: `Continuez tout droit à travers le François Laurentplein et au bout tournez à droite vers la Kouter.`,
    },
    es: {
      name: `Geraard de Duivelsteen`,
      desc: `A pesar del nombre, ningún diablo vivió jamás en este 'Steen' (edificio de piedra). Debe su nombre a Geraard de Gante, un personaje turbio nacido hacia 1210 que poseyó el edificio en el siglo XIII. Se hacía llamar 'el caballero Geraard de Gante, apodado el Diablo'. La leyenda dice que mató a su padre, mató a patadas a su hijo y se entregaba a 'libertinaje, vergüenza y horrores'. Tras su muerte el edificio pasó a la ciudad: desde entonces ha sido arsenal, escuela, monasterio, prisión, casa de corrección y manicomio.`,
      beer: ``,
      food: ``,
      nav: `Sigue recto por el François Laurentplein y al final gira a la derecha hacia la Kouter.`,
    },
    de: {
      name: `Geraard de Duivelsteen`,
      desc: `Trotz des Namens lebte nie ein Teufel in diesem 'Steen' (Steingebäude). Es verdankt seinen Namen Geraard von Gent, einem zwielichtigen Mann, geboren um 1210, dem das Gebäude im 13. Jahrhundert gehörte. Er nannte sich 'Ritter Geraard von Gent, genannt der Teufel'. Der Legende nach tötete er seinen Vater, trat seinen Sohn zu Tode und gab sich 'Ausschweifungen, Schande und Greueln' hin. Nach seinem Tod ging das Gebäude an die Stadt: Seither war es Arsenal, Schule, Kloster, Gefängnis, Zuchthaus und Irrenhaus.`,
      beer: ``,
      food: ``,
      nav: `Geradeaus durch den François Laurentplein, am Ende rechts Richtung Kouter.`,
    },
  },
  {
    id: 37, lat: 51.0490, lon: 3.7213, extension: false,
    en: {
      name: `De Kouter`,
      desc: `Thanks to the daily flower market, you can see a colourful mosaic of blossoms on the Kouter every day of the year. At the blue Kiosk around 11 o'clock real bon vivants gather — this monument transformed into an aperitif bar offers a glass of cava, fresh oysters and other appetisers. Music lovers should also visit: the 19th-century Ghent Opera and concert hall De Handelsbeurs are found here.`,
      beer: ``,
      food: ``,
      nav: `Immediately turn left, then left again into the narrow Kleinvleeshuissteeg. At the end go right into the Kortedagsteeg. At the bridge go straight on, past the Minardschouwburg. Take the next lane on the left (Korianderstraat) to the water, then right along the Nelson Mandelapromenade and at the end follow the path uphill to the Miriam Makebaplein in front of De Krook.`,
    },
    nl: {
      name: `De Kouter`,
      desc: `Dankzij de dagelijkse bloemenmarkt zie je op de Kouter élke dag van het jaar een bonte mozaïek van bloesems. Aan de Blauwe Kiosk verzamelen zich zo rond een uur of elf de echte genieters — dit tot aperobar omgetoverd monument voorziet fijnproevers van cava, verse oesters en andere amuse-gueules. Wie houdt van muziek moet ook op de Kouter zijn: de 19de-eeuwse Gentse Opera en concertzaal De Handelsbeurs zijn hier te vinden.`,
      beer: ``,
      food: ``,
      nav: `De wandeling gaat onmiddellijk naar links en dan links de smalle Kleinvleeshuissteeg in. Op het einde rechts, de Kortedagsteeg. Bij de brug rechtdoor, langs de Minardschouwburg. Neem het volgende straatje links (Korianderstraat) tot aan het water, ga dan rechts via de Nelson Mandelapromenade en volg op het einde de weg omhoog naar het Miriam Makebaplein voor De Krook.`,
    },
    fr: {
      name: `De Kouter`,
      desc: `Grâce au marché aux fleurs quotidien, le Kouter affiche une mosaïque colorée de fleurs tous les jours de l'année. Au Kiosque Bleu vers 11h se rassemblent les vrais connaisseurs — ce monument transformé en bar à apéritif propose cava, huîtres fraîches et amuse-gueules. Les amateurs de musique trouveront aussi ici l'Opéra de Gand du XIXe siècle et la salle de concert De Handelsbeurs.`,
      beer: ``,
      food: ``,
      nav: `Tournez immédiatement à gauche, puis à gauche dans l'étroite Kleinvleeshuissteeg. Au bout, à droite dans la Kortedagsteeg. Au pont, continuez tout droit, devant la Minardschouwburg. Prenez la prochaine ruelle à gauche (Korianderstraat) jusqu'à l'eau, puis à droite le long de la Nelson Mandelapromenade et au bout suivez le chemin vers le haut jusqu'au Miriam Makebaplein devant De Krook.`,
    },
    es: {
      name: `De Kouter`,
      desc: `Gracias al mercado de flores diario, en el Kouter puedes ver un colorido mosaico de flores todos los días del año. En el Quiosco Azul, hacia las once, se reúnen los auténticos sibaritas — este monumento convertido en bar de aperitivos ofrece una copa de cava, ostras frescas y otros entrantes. Los amantes de la música también deben venir: aquí están la Ópera de Gante del siglo XIX y la sala de conciertos De Handelsbeurs.`,
      beer: ``,
      food: ``,
      nav: `Gira inmediatamente a la izquierda, luego a la izquierda por la estrecha Kleinvleeshuissteeg. Al final a la derecha por la Kortedagsteeg. En el puente, sigue recto, junto a la Minardschouwburg. Toma el siguiente callejón a la izquierda (Korianderstraat) hasta el agua, luego a la derecha por la Nelson Mandelapromenade y al final sigue el camino cuesta arriba hasta el Miriam Makebaplein frente a De Krook.`,
    },
    de: {
      name: `De Kouter`,
      desc: `Dank des täglichen Blumenmarktes siehst du auf dem Kouter an jedem Tag des Jahres ein buntes Blütenmosaik. Am Blauen Kiosk versammeln sich gegen elf Uhr die echten Genießer — dieses zur Aperitif-Bar umgewandelte Denkmal bietet ein Glas Cava, frische Austern und andere Häppchen. Auch Musikliebhaber sollten herkommen: Hier befinden sich die Genter Oper aus dem 19. Jahrhundert und der Konzertsaal De Handelsbeurs.`,
      beer: ``,
      food: ``,
      nav: `Sofort links, dann links in die enge Kleinvleeshuissteeg. Am Ende rechts in die Kortedagsteeg. An der Brücke geradeaus, an der Minardschouwburg vorbei. Nächste Gasse links (Korianderstraat) bis zum Wasser, dann rechts entlang der Nelson Mandelapromenade und am Ende den Weg bergauf zum Miriam Makebaplein vor De Krook.`,
    },
  },
  {
    id: 38, lat: 51.0474, lon: 3.7236, extension: false,
    en: {
      name: `De Krook (Library)`,
      desc: `De Krook is much more than a library — a striking mix of steel and concrete that you can simply walk into. There is a cafeteria with a terrace with a beautiful view, a reading room, a study room, a multipurpose room; you can work with a 3D printer, learn about virtual reality, surf the internet. The name 'krook' is an old word for crease or fold, referring to the bend the Scheldt makes around the Waalse Krook, where ships once unloaded coal from Wallonia.`,
      beer: ``,
      food: ``,
      nav: `Cross the small square in front of De Krook and enter the renovated Wintercircus.`,
    },
    nl: {
      name: `De Krook (Bibliotheek)`,
      desc: `De Krook is veel meer dan de bibliotheek — een opvallende mix van staal en beton waar je zomaar kan binnenwandelen. Er is een cafetaria met terras met mooi uitzicht, een leeszaal, studiezaal, polyvalente ruimte; je kan er werken met een 3D-printer, leren over virtual reality, surfen op het internet. 'Krook' is een oud woord voor kreuk of vouw, verwijzend naar de bocht die de Schelde maakt rond de Waalse Krook, waar schepen vroeger steenkool uit Wallonië losten.`,
      beer: ``,
      food: ``,
      nav: `Steek het pleintje voor De Krook over en ga het vernieuwde Wintercircus binnen.`,
    },
    fr: {
      name: `De Krook (Bibliothèque)`,
      desc: `De Krook est bien plus qu'une bibliothèque — un remarquable mélange d'acier et de béton où l'on peut simplement entrer. Il y a une cafétéria avec terrasse vue imprenable, une salle de lecture, de travail, polyvalente ; vous pouvez utiliser une imprimante 3D, découvrir la réalité virtuelle, surfer sur internet. Le mot 'krook' est un vieux terme pour pli ou coude, référençant le coude que fait l'Escaut autour de la Waalse Krook, où les navires déchargeaient jadis du charbon de Wallonie.`,
      beer: ``,
      food: ``,
      nav: `Traversez la petite place devant De Krook et entrez dans le Wintercircus rénové.`,
    },
    es: {
      name: `De Krook (Biblioteca)`,
      desc: `De Krook es mucho más que una biblioteca — una llamativa mezcla de acero y hormigón en la que puedes entrar sin más. Hay una cafetería con terraza y bonitas vistas, una sala de lectura, una de estudio, una sala polivalente; puedes usar una impresora 3D, conocer la realidad virtual, navegar por internet. El nombre 'krook' es una palabra antigua para pliegue o doblez, en alusión al recodo que hace el Escalda en torno a la Waalse Krook, donde los barcos descargaban antaño carbón de Valonia.`,
      beer: ``,
      food: ``,
      nav: `Cruza la pequeña plaza frente a De Krook y entra al renovado Wintercircus.`,
    },
    de: {
      name: `De Krook (Bibliothek)`,
      desc: `De Krook ist weit mehr als eine Bibliothek — eine markante Mischung aus Stahl und Beton, in die man einfach hineinspazieren kann. Es gibt eine Cafeteria mit Terrasse und schöner Aussicht, einen Lesesaal, einen Arbeitsraum, einen Mehrzweckraum; man kann mit einem 3D-Drucker arbeiten, Virtual Reality kennenlernen, im Internet surfen. Der Name 'krook' ist ein altes Wort für Knick oder Falte und verweist auf die Biegung, die die Schelde um die Waalse Krook macht, wo Schiffe einst Kohle aus Wallonien löschten.`,
      beer: ``,
      food: ``,
      nav: `Den kleinen Platz vor De Krook überqueren und das renovierte Wintercircus betreten.`,
    },
  },
  {
    id: 39, lat: 51.0468, lon: 3.7229, extension: false,
    en: {
      name: `Het Wintercircus`,
      desc: `In 1885 the 'Nieuw Cirkus' was built here, one of several stone circuses constructed in 19th-century Belgian cities. After a 1920 fire and reconstruction, it became a garage after WWII and then a vintage car depot for 20 years. The city bought it in 2005 and after five years of intensive renovation, the building reopened in 2024. The central arena is now a publicly accessible covered square; Club Wintercircus (concert hall for 500) is housed below. Winner of the Ghent Monument Prize 2022.`,
      beer: ``,
      food: `Bakker Klaas – fresh bread. Sakas by chef Yoshi – sublime sushi. Bar Bougie or Rooftopbar Bassie – refreshing drinks.`,
      nav: `Leave the Wintercircus through the Sint-Pietersnieuwstraat exit (opposite the entrance) and go left outside.`,
    },
    nl: {
      name: `Het Wintercircus`,
      desc: `In 1885 werd het 'Nieuw Cirkus' gebouwd, een van de stenen circussen die in 19de-eeuwse Belgische steden werden opgericht. Na een brand in 1920 en heropbouw werd het na WOII een garage en daarna 20 jaar depot voor oldtimers. De stad kocht het in 2005 en na vijf jaar intensieve renovatie heropende het in 2024. De middenpiste is nu een publiek toegankelijk overdekt plein; Club Wintercircus (concertzaal voor 500) zit eronder. Winnaar van de Gentse Monumentenprijs 2022.`,
      beer: ``,
      food: `Bakker Klaas – vers brood. Sakas by chef Yoshi – sublieme sushi. Bar Bougie of Rooftopbar Bassie – verkwikkende drankjes.`,
      nav: `Verlaat het Wintercircus via de Sint-Pietersnieuwstraat (uitgang tegenover de ingang) en ga buiten naar links.`,
    },
    fr: {
      name: `Het Wintercircus`,
      desc: `En 1885 fut construit le 'Nieuw Cirkus', l'un des nombreux cirques en pierre érigés dans les villes belges du XIXe siècle. Après un incendie en 1920 et reconstruction, il devint un garage après la Seconde Guerre mondiale, puis un dépôt de voitures anciennes pendant 20 ans. La ville l'acheta en 2005 et après cinq ans de rénovation intensive, le bâtiment rouvrit en 2024. L'arène centrale est désormais une place couverte publique ; le Club Wintercircus (salle de concert de 500 places) est logé en dessous. Lauréat du Prix du Monument de Gand 2022.`,
      beer: ``,
      food: `Bakker Klaas – pain frais. Sakas by chef Yoshi – sushi sublimes. Bar Bougie ou Rooftopbar Bassie – boissons revigorantes.`,
      nav: `Quittez le Wintercircus par la sortie Sint-Pietersnieuwstraat (en face de l'entrée) et tournez à gauche dehors.`,
    },
    es: {
      name: `Het Wintercircus`,
      desc: `En 1885 se construyó aquí el 'Nieuw Cirkus', uno de varios circos de piedra erigidos en las ciudades belgas del siglo XIX. Tras un incendio en 1920 y su reconstrucción, se convirtió en un garaje después de la Segunda Guerra Mundial y luego, durante 20 años, en depósito de coches clásicos. La ciudad lo compró en 2005 y, tras cinco años de intensa renovación, el edificio reabrió en 2024. La pista central es ahora una plaza cubierta de acceso público; el Club Wintercircus (sala de conciertos para 500) se aloja debajo. Ganador del Premio del Monumento de Gante 2022.`,
      beer: ``,
      food: `Bakker Klaas – pan recién hecho. Sakas by chef Yoshi – sushi sublime. Bar Bougie o Rooftopbar Bassie – bebidas refrescantes.`,
      nav: `Sal del Wintercircus por la salida de la Sint-Pietersnieuwstraat (frente a la entrada) y gira a la izquierda afuera.`,
    },
    de: {
      name: `Het Wintercircus`,
      desc: `1885 wurde hier das 'Nieuw Cirkus' gebaut, einer von mehreren Steinzirkussen in belgischen Städten des 19. Jahrhunderts. Nach einem Brand 1920 und Wiederaufbau wurde es nach dem Zweiten Weltkrieg eine Garage und dann 20 Jahre lang ein Oldtimer-Depot. Die Stadt kaufte es 2005, und nach fünf Jahren intensiver Renovierung wurde das Gebäude 2024 wiedereröffnet. Die zentrale Arena ist heute ein öffentlich zugänglicher überdachter Platz; der Club Wintercircus (Konzertsaal für 500) liegt darunter. Gewinner des Genter Denkmalpreises 2022.`,
      beer: ``,
      food: `Bakker Klaas – frisches Brot. Sakas by chef Yoshi – sublime Sushi. Bar Bougie oder Rooftopbar Bassie – erfrischende Getränke.`,
      nav: `Das Wintercircus durch den Sint-Pietersnieuwstraat-Ausgang verlassen (gegenüber dem Eingang) und draußen links.`,
    },
  },
  {
    id: 40, lat: 51.0462, lon: 3.7240, extension: false,
    en: {
      name: `De Vooruit`,
      desc: `The Vooruit is a historic hall complex from 1913, originally the party and arts centre of the Ghent workers' movement, with a ballroom, cinema and theatre group. Since 1982, the arts centre Vooruit vzw uses the 5 main halls (Ballroom, Theaterzaal, Domzaal, Concertzaal and Café) for debates, literary evenings, concerts, parties, dance and stage performances.`,
      beer: ``,
      food: ``,
      nav: `Continue along the Sint-Pietersnieuwstraat; a little further on the right you will see the Boekentoren.`,
    },
    nl: {
      name: `De Vooruit`,
      desc: `De Vooruit is een historisch zalencomplex uit 1913, oorspronkelijk het feest- en kunstencentrum van de Gentse arbeidersbeweging, met een balzaal, cinema en theatergroep. Depuis 1982 gebruikt vzw Kunstencentrum Vooruit de 5 belangrijkste zalen (Balzaal, Theaterzaal, Domzaal, Concertzaal en Café) voor debatten, literatuuravonden, concerten, party's, dans en podiumvoorstellingen.`,
      beer: ``,
      food: ``,
      nav: `Vervolg de Sint-Pietersnieuwstraat; iets verder rechts zie je de Boekentoren.`,
    },
    fr: {
      name: `De Vooruit`,
      desc: `Le Vooruit est un complexe de salles historiques de 1913, à l'origine le centre culturel et festif du mouvement ouvrier gantois, avec une salle de bal, un cinéma et une troupe de théâtre. Depuis 1982, le Kunstencentrum Vooruit vzw utilise les 5 salles principales (Ballroom, Theaterzaal, Domzaal, Concertzaal et Café) pour des débats, soirées littéraires, concerts, fêtes, danse et spectacles.`,
      beer: ``,
      food: ``,
      nav: `Continuez dans la Sint-Pietersnieuwstraat ; un peu plus loin à droite vous verrez la Boekentoren.`,
    },
    es: {
      name: `De Vooruit`,
      desc: `El Vooruit es un histórico complejo de salas de 1913, originalmente el centro festivo y artístico del movimiento obrero gantés, con una sala de baile, cine y grupo de teatro. Desde 1982, el centro de artes Vooruit vzw usa las 5 salas principales (Balzaal, Theaterzaal, Domzaal, Concertzaal y el Café) para debates, veladas literarias, conciertos, fiestas, danza y espectáculos.`,
      beer: ``,
      food: ``,
      nav: `Continúa por la Sint-Pietersnieuwstraat; un poco más adelante a la derecha verás la Boekentoren.`,
    },
    de: {
      name: `De Vooruit`,
      desc: `Das Vooruit ist ein historischer Saalkomplex von 1913, ursprünglich das Fest- und Kulturzentrum der Genter Arbeiterbewegung, mit Ballsaal, Kino und Theatergruppe. Seit 1982 nutzt das Kunstzentrum Vooruit vzw die 5 Hauptsäle (Ballsaal, Theaterzaal, Domzaal, Concertzaal und das Café) für Debatten, Literaturabende, Konzerte, Partys, Tanz und Bühnenaufführungen.`,
      beer: ``,
      food: ``,
      nav: `Weiter die Sint-Pietersnieuwstraat entlang; etwas weiter rechts siehst du den Boekentoren.`,
    },
  },
  {
    id: 41, lat: 51.0451, lon: 3.7237, extension: false,
    en: {
      name: `Boekentoren (Book Tower)`,
      desc: `The 64-metre Book Tower was designed by Belgian architect Henry Van de Velde and is the most striking example of modernist architecture in the city. As the main warehouse of Ghent University Library, the tower houses some 3 million books — 46 kilometres of shelves. It is an important symbol for both the university and the city of Ghent.`,
      beer: ``,
      food: ``,
      nav: `Walk to the end of the Sint-Pietersnieuwstraat; you arrive at the Sint-Pietersplein.`,
    },
    nl: {
      name: `Boekentoren`,
      desc: `De 64 meter hoge Boekentoren werd ontworpen door de Belgische architect Henry Van de Velde en is het meest opvallende voorbeeld van modernistische architectuur in de stad. Als de belangrijkste opslagplaats van de Gentse universiteitsbibliotheek herbergt de toren zo'n 3 miljoen boeken — 46 kilometer boekenrekken. Het is een belangrijk symbool voor zowel de universiteit als de stad Gent.`,
      beer: ``,
      food: ``,
      nav: `Wandel de Sint-Pietersnieuwstraat uit; je komt op het Sint-Pietersplein.`,
    },
    fr: {
      name: `Boekentoren (Tour du Livre)`,
      desc: `La Tour du Livre de 64 mètres, conçue par l'architecte belge Henry Van de Velde, est l'exemple le plus frappant d'architecture moderniste de la ville. Principal entrepôt de la bibliothèque universitaire de Gand, la tour abrite quelque 3 millions de livres — 46 kilomètres de rayonnages. C'est un symbole important pour l'université et la ville.`,
      beer: ``,
      food: ``,
      nav: `Marchez jusqu'au bout de la Sint-Pietersnieuwstraat ; vous arrivez sur le Sint-Pietersplein.`,
    },
    es: {
      name: `Boekentoren (Torre de los Libros)`,
      desc: `La Torre de los Libros, de 64 metros, fue diseñada por el arquitecto belga Henry Van de Velde y es el ejemplo más llamativo de arquitectura modernista de la ciudad. Como principal depósito de la Biblioteca de la Universidad de Gante, la torre alberga unos 3 millones de libros — 46 kilómetros de estanterías. Es un símbolo importante tanto para la universidad como para la ciudad de Gante.`,
      beer: ``,
      food: ``,
      nav: `Camina hasta el final de la Sint-Pietersnieuwstraat; llegas al Sint-Pietersplein.`,
    },
    de: {
      name: `Boekentoren (Bücherturm)`,
      desc: `Der 64 Meter hohe Bücherturm wurde vom belgischen Architekten Henry Van de Velde entworfen und ist das markanteste Beispiel modernistischer Architektur der Stadt. Als Hauptmagazin der Genter Universitätsbibliothek beherbergt der Turm rund 3 Millionen Bücher — 46 Kilometer Regale. Er ist ein wichtiges Symbol für die Universität und die Stadt Gent.`,
      beer: ``,
      food: ``,
      nav: `Die Sint-Pietersnieuwstraat zu Ende gehen; du erreichst den Sint-Pietersplein.`,
    },
  },
  {
    id: 42, lat: 51.0438, lon: 3.7248, extension: false,
    en: {
      name: `Sint-Pietersplein & Sint-Pietersabdij`,
      desc: `The Sint-Pietersplein is in the heart of the student district. Every July the Mid-Lent Fair sets up here; it has also hosted intimate concerts by Prince, Björk and others. The 7th-century Benedictine Saint Peter's Abbey grew into a real village with farms, gardens and farmland. The ground floor of the abbey is free; guided with the unique movie guide 'Alison' — 17 episodes with digital monk Alison. The abbey garden, with its vineyard and ruins, is a green city oasis popular with students. If you exit right on Overpoort you'll find 35+ student cafés side by side — Thursday is the big student night.`,
      beer: `De Geus van Gent – Kantienberg 9 (nearby).`,
      food: ``,
      nav: `The route follows the street on the left, via the Wereld van Kina.`,
    },
    nl: {
      name: `Sint-Pietersplein & Sint-Pietersabdij`,
      desc: `Het Sint-Pietersplein ligt in het hart van de studentenbuurt. Elke juli staat hier de Halfvastenfoor; ook het decor van intieme concerten van Prince, Björk en anderen. De 7de-eeuwse Benedictijnenabdij groeide uit tot een echt abdijdorp. Het gelijkvloers van de abdij is gratis te bezoeken; met de unieke movieguide 'Alison' — 17 afleveringen met de digitale monnik Alison. De abdijstuin met wijngaard en ruïne is een groene oase geliefd bij studenten. Rechts uitstappen op de Overpoort: meer dan 35 studentencafés naast elkaar — donderdagavond is dé studentenavond.`,
      beer: `De Geus van Gent – Kantienberg 9 (in de buurt).`,
      food: ``,
      nav: `De wandeling volgt de straat links, via de Wereld van Kina.`,
    },
    fr: {
      name: `Sint-Pietersplein & Abbaye Saint-Pierre`,
      desc: `La Sint-Pietersplein est au cœur du quartier étudiant. En juillet la foire du mi-carême s'y installe ; elle a aussi accueilli des concerts intimes de Prince, Björk et d'autres. L'abbaye bénédictine du VIIe siècle s'est développée en un véritable village abbatial. Le rez-de-chaussée est libre ; visite guidée avec le guide vidéo unique 'Alison' — 17 épisodes avec le moine numérique Alison. Le jardin abbatial avec vigne et ruines est une oasis verte prisée des étudiants. Si vous sortez à droite sur l'Overpoort, vous trouverez 35+ cafés étudiants côte à côte — le jeudi soir est la grande soirée étudiante.`,
      beer: `De Geus van Gent – Kantienberg 9 (à proximité).`,
      food: ``,
      nav: `L'itinéraire suit la rue à gauche, via la Wereld van Kina.`,
    },
    es: {
      name: `Sint-Pietersplein & Abadía de San Pedro`,
      desc: `La Sint-Pietersplein está en el corazón del barrio estudiantil. Cada julio se instala aquí la Feria de Mediados de Cuaresma; también ha acogido conciertos íntimos de Prince, Björk y otros. La abadía benedictina de San Pedro, del siglo VII, creció hasta convertirse en un auténtico pueblo abacial con granjas, jardines y tierras de labor. La planta baja de la abadía es gratuita; con la singular guía cinematográfica 'Alison' — 17 episodios con el monje digital Alison. El jardín de la abadía, con su viñedo y sus ruinas, es un oasis verde muy querido por los estudiantes. Si sales a la derecha por la Overpoort encontrarás más de 35 cafés estudiantiles uno junto a otro — el jueves es la gran noche estudiantil.`,
      beer: `De Geus van Gent – Kantienberg 9 (cerca).`,
      food: ``,
      nav: `La ruta sigue la calle de la izquierda, por la Wereld van Kina.`,
    },
    de: {
      name: `Sint-Pietersplein & Sankt-Peters-Abtei`,
      desc: `Die Sint-Pietersplein liegt im Herzen des Studentenviertels. Jeden Juli baut hier der Halbfastenmarkt auf; sie war auch Schauplatz intimer Konzerte von Prince, Björk und anderen. Die benediktinische Sankt-Peters-Abtei aus dem 7. Jahrhundert wuchs zu einem echten Abteidorf mit Höfen, Gärten und Ackerland. Das Erdgeschoss der Abtei ist kostenlos; geführt mit dem einzigartigen Filmguide 'Alison' — 17 Episoden mit dem digitalen Mönch Alison. Der Abteigarten mit Weinberg und Ruine ist eine grüne Oase, bei Studenten beliebt. Gehst du rechts zur Overpoort, findest du 35+ Studentencafés nebeneinander — der Donnerstag ist der große Studentenabend.`,
      beer: `De Geus van Gent – Kantienberg 9 (in der Nähe).`,
      food: ``,
      nav: `Der Weg folgt der Straße links, über die Wereld van Kina.`,
    },
  },
  {
    id: 43, lat: 51.0435, lon: 3.7252, extension: false,
    en: {
      name: `Wereld van Kina – The House`,
      desc: `The House is a museum where children and adults fall from one surprise to another: a unique fossil of a prehistoric reptile, a beautiful diorama room with native birds, and an interactive exhibition with thousands of rocks and minerals. The abbey garden can be reached through the courtyard of the Wereld van Kina — enter the courtyard and on the left-hand side is a gate that gives access to this green oasis. From here, cross the water and turn left into Ter Plaeten — back to Scheldepunt.`,
      beer: ``,
      food: ``,
      nav: `Take the first street on the left (Kantienberg). Cross over the water and turn left into Ter Plaeten, back to the Scheldepunt. Welcome back!`,
    },
    nl: {
      name: `Wereld van Kina – Het Huis`,
      desc: `Het Huis is een museum waar je kinderen en jijzelf van de ene verrassing in de andere vallen: een uniek fossiel van een prehistorisch reptiel, een prachtige dioramazaal met inheemse vogels en een interactieve tentoonstelling met duizenden gesteenten en mineralen. De abdijstuin bereik je via de binnenplaats van de Wereld van Kina — links voor je is er een poort. Van hier ga je over het water en sla je linksaf Ter Plaeten in — terug naar het Scheldepunt.`,
      beer: ``,
      food: ``,
      nav: `Neem de eerste straat links (Kantienberg). Ga over het water en sla linksaf Ter Plaeten in, terug naar het Scheldepunt. Welkom terug!`,
    },
    fr: {
      name: `Wereld van Kina – La Maison`,
      desc: `La Maison est un musée où enfants et adultes passent d'une surprise à l'autre : un fossile unique d'un reptile préhistorique, une magnifique salle diorama avec des oiseaux indigènes, et une exposition interactive avec des milliers de roches et minéraux. Le jardin abbatial se rejoint via la cour du Wereld van Kina — sur votre gauche se trouve un portail. De là, traversez l'eau et tournez à gauche dans Ter Plaeten — retour au Scheldepunt.`,
      beer: ``,
      food: ``,
      nav: `Prenez la première rue à gauche (Kantienberg). Traversez l'eau et tournez à gauche dans Ter Plaeten, retour au Scheldepunt. Bienvenue de retour !`,
    },
    es: {
      name: `Wereld van Kina – La Casa`,
      desc: `La Casa es un museo donde niños y adultos van de sorpresa en sorpresa: un fósil único de un reptil prehistórico, una preciosa sala de dioramas con aves autóctonas y una exposición interactiva con miles de rocas y minerales. Al jardín de la abadía se llega por el patio del Wereld van Kina — entra en el patio y a la izquierda hay una puerta que da acceso a este oasis verde. Desde aquí, cruza el agua y gira a la izquierda hacia Ter Plaeten — de vuelta al Scheldepunt.`,
      beer: ``,
      food: ``,
      nav: `Toma la primera calle a la izquierda (Kantienberg). Cruza el agua y gira a la izquierda por Ter Plaeten, de vuelta al Scheldepunt. ¡Bienvenido de vuelta!`,
    },
    de: {
      name: `Wereld van Kina – Das Haus`,
      desc: `Das Haus ist ein Museum, in dem Kinder und Erwachsene von einer Überraschung zur nächsten kommen: ein einzigartiges Fossil eines prähistorischen Reptils, ein wunderschöner Diorama-Saal mit heimischen Vögeln und eine interaktive Ausstellung mit Tausenden von Gesteinen und Mineralien. Der Abteigarten ist über den Innenhof des Wereld van Kina zu erreichen — betritt den Hof, und auf der linken Seite gibt es ein Tor zu dieser grünen Oase. Von hier aus überquere das Wasser und biege links in Ter Plaeten ein — zurück zum Scheldepunt.`,
      beer: ``,
      food: ``,
      nav: `Erste Straße links (Kantienberg). Über das Wasser und links in Ter Plaeten abbiegen, zurück zum Scheldepunt. Willkommen zurück!`,
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
          {lang.nav && (
            <div style={{
              marginBottom: 10, padding: '8px 10px',
              background: 'var(--sand, #f3efe7)', borderLeft: '2px solid var(--moss)',
            }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--moss)', display: 'block', marginBottom: 3 }}>
                ➜ {window.t('walk.directions')}
              </span>
              <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55 }}><LinkText text={lang.nav} /></span>
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
