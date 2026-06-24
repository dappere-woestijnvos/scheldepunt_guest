// Apartment-specific data. Edit this file to update both the UI and the AI Concierge.
//
// Localized content: any text that should change with the language tab is wrapped
// in T(en, nl, fr, es, de). Static values (names, addresses, phone numbers, wifi
// codes, coordinates) are left as plain strings. window.APARTMENT always returns
// the content resolved for the currently selected language (window.currentLang).

// Store concierge API key from URL param: ?apikey=YOUR_KEY
(() => {
  const p = new URLSearchParams(window.location.search).get('apikey');
  if (p) { localStorage.setItem('concierge_api_key', p); history.replaceState(null, '', window.location.pathname); }
})();

function mapsUrl(query) {
  return 'https://maps.google.com/maps?q=' + encodeURIComponent(query);
}

// Wrap a translatable string. Missing languages fall back to English.
function T(en, nl, fr, es, de) {
  return { __t: true, en, nl: nl ?? en, fr: fr ?? en, es: es ?? en, de: de ?? en };
}

// Recursively resolve all T(...) leaves for a given language.
function localize(node, lang) {
  if (node && typeof node === 'object') {
    if (node.__t) return node[lang] || node.en;
    if (Array.isArray(node)) return node.map((n) => localize(n, lang));
    const out = {};
    for (const k in node) out[k] = localize(node[k], lang);
    return out;
  }
  return node;
}

const APARTMENT_RAW = {
  name: "Scheldepunt",
  tagline: T(
    "Apartment 6.2 — by the Scheldt",
    "Appartement 6.2 — aan de Schelde",
    "Appartement 6.2 — au bord de l'Escaut",
    "Apartamento 6.2 — junto al Escalda",
    "Wohnung 6.2 — an der Schelde",
  ),
  address: "Ter Plaeten 99, 9000 Gent, Belgium",
  district: "Ter Plaeten",
  hosts: T(
    "The Browaeys family",
    "Familie Browaeys",
    "La famille Browaeys",
    "La familia Browaeys",
    "Familie Browaeys",
  ),

  checkIn: T("From 14:00", "Vanaf 14:00", "À partir de 14:00", "Desde las 14:00", "Ab 14:00"),
  checkOut: T("Until 10:00", "Tot 10:00", "Jusqu'à 10:00", "Hasta las 10:00", "Bis 10:00"),
  selfCheckIn: T(
    "There is a personal welcome at check-in, where you are given all the information you need. The deposit paid at check-in is refunded at checkout.",
    "Bij de check-in is er een persoonlijk onthaal, waarbij jullie alle nodige informatie krijgen. De waarborg die bij de check-in betaald wordt, wordt bij het uitchecken terugbetaald.",
    "À l'arrivée, un accueil personnel vous est réservé, au cours duquel toutes les informations nécessaires vous sont communiquées. La caution versée à l'arrivée est remboursée au départ.",
    "En la entrada hay una recepción personal en la que se os facilita toda la información necesaria. La fianza pagada en la entrada se devuelve a la salida.",
    "Beim Check-in gibt es einen persönlichen Empfang, bei dem ihr alle nötigen Informationen erhaltet. Die beim Check-in hinterlegte Kaution wird beim Check-out zurückerstattet.",
  ),

  // Paste your Google Gemini API key here to enable the AI Concierge.
  // Get a free key at https://aistudio.google.com/apikey
  apiKey: localStorage.getItem("concierge_api_key") || "",

  // Supabase connection — enables guestbook, visitor tips, contact form, and
  // issue reports to persist to a real database.
  // 1. Create a free project at https://supabase.com
  // 2. Run the SQL schema in db.jsx (paste into Supabase SQL Editor)
  // 3. Copy Project URL and anon/public API key from Project Settings → API
  supabaseUrl: "https://rkyasgxmntkqagpunmpr.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJreWFzZ3htbnRrcWFncHVubXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDcxOTIsImV4cCI6MjA5NzAyMzE5Mn0.68aFVWMhBCYQ_noFpUkUzAWBuEYsEJ3mcQPvnFOfvvg",

  welcomeText: T(
    "Welcome to Scheldepunt!\n\nHow lovely that you are here. We hope you have a wonderful stay in our apartment and can fully enjoy everything Ghent has to offer: charming little streets, beautiful historic buildings, cosy cafés and of course the typical Ghent atmosphere.\n\nMake yourself completely at home, take time to relax and turn it into a lovely weekend. In the apartment you will find everything you need for a comfortable stay. Should you have any questions, we are always happy to help.\n\nEnjoy your weekend in Ghent and have a wonderful time!",
    "Welkom in het Scheldepunt!\n\nWat fijn dat jullie er zijn. We hopen dat jullie een heerlijk verblijf hebben in ons appartement en volop kunnen genieten van alles wat Gent te bieden heeft: gezellige straatjes, mooie historische gebouwen, leuke cafés en natuurlijk de typische Gentse sfeer.\n\nVoel je hier vooral thuis, neem de tijd om te ontspannen en maak er een gezellig weekend van. In het appartement vinden jullie alles wat nodig is voor een comfortabel verblijf. Mochten er toch vragen zijn, dan helpen we graag verder.\n\nGeniet van jullie weekend in Gent en veel plezier!",
    "Bienvenue au Scheldepunt !\n\nQuel plaisir de vous accueillir. Nous espérons que vous passerez un excellent séjour dans notre appartement et que vous profiterez pleinement de tout ce que Gand a à offrir : ruelles pittoresques, beaux bâtiments historiques, cafés sympas et bien sûr l'ambiance typiquement gantoise.\n\nFaites comme chez vous, prenez le temps de vous détendre et passez un agréable week-end. Dans l'appartement, vous trouverez tout le nécessaire pour un séjour confortable. Si vous avez la moindre question, nous serons ravis de vous aider.\n\nProfitez de votre week-end à Gand et amusez-vous bien !",
    "¡Bienvenidos a Scheldepunt!\n\nQué alegría teneros aquí. Esperamos que disfrutéis de una estancia maravillosa en nuestro apartamento y que aprovechéis al máximo todo lo que Gante ofrece: callejuelas con encanto, bonitos edificios históricos, cafés agradables y, por supuesto, el ambiente típico de Gante.\n\nSentíos como en casa, tomaos vuestro tiempo para relajaros y disfrutad de un fin de semana estupendo. En el apartamento encontraréis todo lo necesario para una estancia cómoda. Si tenéis alguna pregunta, estaremos encantados de ayudaros.\n\n¡Disfrutad de vuestro fin de semana en Gante y pasadlo genial!",
    "Willkommen im Scheldepunt!\n\nWie schön, dass ihr da seid. Wir hoffen, ihr habt einen herrlichen Aufenthalt in unserer Wohnung und könnt alles in vollen Zügen genießen, was Gent zu bieten hat: gemütliche Gässchen, schöne historische Gebäude, nette Cafés und natürlich die typische Genter Atmosphäre.\n\nFühlt euch ganz wie zu Hause, nehmt euch Zeit zum Entspannen und macht ein schönes Wochenende daraus. In der Wohnung findet ihr alles, was ihr für einen komfortablen Aufenthalt braucht. Solltet ihr Fragen haben, helfen wir gerne weiter.\n\nGenießt euer Wochenende in Gent und viel Spaß!",
  ),

  wifi: {
    network: "telenet F5DDF",
    password: "SyBBm0R4XHPP",
    note: "",
  },

  contact: {
    owner: "Luc Browaeys",
    whatsapp: "+32 468 12 29 12",
    phone2: "+32 496 59 41 60",
    email: "lubro@telenet.be",
    responseTime: T(
      "We typically reply within a few hours. For urgent matters you can also reach the owners directly: Luc on +32 468 12 29 12 or Tom on +32 496 59 41 60.",
      "We antwoorden meestal binnen enkele uren. Voor dringende zaken kun je de eigenaars ook rechtstreeks bereiken: Luc op +32 468 12 29 12 of Tom op +32 496 59 41 60.",
      "Nous répondons généralement en quelques heures. Pour les urgences, vous pouvez aussi joindre directement les propriétaires : Luc au +32 468 12 29 12 ou Tom au +32 496 59 41 60.",
      "Solemos responder en pocas horas. Para asuntos urgentes también puedes contactar directamente con los propietarios: Luc en el +32 468 12 29 12 o Tom en el +32 496 59 41 60.",
      "Wir antworten in der Regel innerhalb weniger Stunden. In dringenden Fällen erreicht ihr die Eigentümer auch direkt: Luc unter +32 468 12 29 12 oder Tom unter +32 496 59 41 60.",
    ),
  },

  emergency: {
    eu: "112",
    police: "101",
    ambulance: "100",
    pharmacy: "Leveugle — Franklin Rooseveltlaan 505, 9000 Gent",
    hospital: T(
      "Dial 112 — they will direct you to the nearest hospital",
      "Bel 112 — zij verwijzen je naar het dichtstbijzijnde ziekenhuis",
      "Composez le 112 — on vous orientera vers l'hôpital le plus proche",
      "Llama al 112 — te dirigirán al hospital más cercano",
      "Wählt 112 — man leitet euch zum nächstgelegenen Krankenhaus",
    ),
    doctorOnCall: "09 236 50 00",
    dentistOnCall: "0903 36 996",
    poisonControl: "070 245 245",
    cardStop: "070 344 344",
    flemishRedCross: "105",
    infoGhent: "09 210 10 10",
  },

  taxi: {
    phone1: "+32 9 333 33 33",
    phone2: "+32 468 22 22 22",
    website: "www.taxi123gent.be",
  },

  rules: [
    T(
      "Smoking is forbidden inside the apartment and in all common areas. Smoking is only permitted on the terrace.",
      "Roken is verboden in het appartement en in alle gemeenschappelijke ruimtes. Roken mag enkel op het terras.",
      "Il est interdit de fumer dans l'appartement et dans toutes les parties communes. Il n'est permis de fumer que sur la terrasse.",
      "Está prohibido fumar dentro del apartamento y en todas las zonas comunes. Solo se permite fumar en la terraza.",
      "Rauchen ist in der Wohnung und in allen Gemeinschaftsbereichen verboten. Rauchen ist nur auf der Terrasse erlaubt.",
    ),
    T(
      "Pets are not allowed.",
      "Huisdieren zijn niet toegelaten.",
      "Les animaux de compagnie ne sont pas admis.",
      "No se admiten mascotas.",
      "Haustiere sind nicht erlaubt.",
    ),
    T(
      "Check-in is after 14:00. Check-out is before 10:00. A deposit is charged at check-in and returned at checkout if the apartment is left in good condition.",
      "Inchecken kan vanaf 14:00. Uitchecken vóór 10:00. Bij de check-in wordt een waarborg betaald, die bij het uitchecken wordt terugbetaald als het appartement in goede staat wordt achtergelaten.",
      "L'arrivée se fait à partir de 14:00. Le départ avant 10:00. Une caution est versée à l'arrivée et remboursée au départ si l'appartement est laissé en bon état.",
      "La entrada es a partir de las 14:00. La salida antes de las 10:00. Se paga una fianza en la entrada que se devuelve a la salida si el apartamento se deja en buen estado.",
      "Check-in ab 14:00 Uhr. Check-out vor 10:00 Uhr. Beim Check-in wird eine Kaution hinterlegt, die beim Check-out zurückerstattet wird, sofern die Wohnung in gutem Zustand hinterlassen wird.",
    ),
    T(
      "Quiet between 22:00 and 07:00 — please respect the neighbours below (avoid heels indoors and dragging chairs).",
      "Rust tussen 22:00 en 07:00 — respecteer de buren beneden (vermijd hakken binnenshuis en het schuiven met stoelen).",
      "Calme entre 22:00 et 07:00 — merci de respecter les voisins du dessous (évitez les talons à l'intérieur et de traîner les chaises).",
      "Silencio entre las 22:00 y las 07:00 — respetad a los vecinos de abajo (evitad los tacones dentro de casa y arrastrar las sillas).",
      "Ruhe zwischen 22:00 und 07:00 Uhr — bitte nehmt Rücksicht auf die Nachbarn unter euch (vermeidet Absätze in der Wohnung und das Rücken von Stühlen).",
    ),
    T(
      "Entrance doors inside must always be closed — do not lock with the night lock.",
      "Binnendeuren moeten altijd gesloten zijn — sluit niet af met het nachtslot.",
      "Les portes intérieures doivent toujours rester fermées — ne pas verrouiller avec le verrou de nuit.",
      "Las puertas interiores deben permanecer siempre cerradas — no cerréis con el pestillo de noche.",
      "Die Innentüren müssen immer geschlossen sein — nicht mit dem Nachtschloss abschließen.",
    ),
    T(
      "Free parking is available on the fixed spot in the building's underground garage. Do not park in other spots. We are not responsible for damage to vehicles.",
      "Gratis parkeren is mogelijk op de vaste plaats in de ondergrondse garage van het gebouw. Parkeer niet op andere plaatsen. Wij zijn niet verantwoordelijk voor schade aan voertuigen.",
      "Le stationnement gratuit est possible sur l'emplacement fixe dans le garage souterrain de l'immeuble. Ne vous garez pas à d'autres emplacements. Nous ne sommes pas responsables des dommages aux véhicules.",
      "Hay aparcamiento gratuito en la plaza fija del garaje subterráneo del edificio. No aparquéis en otras plazas. No nos hacemos responsables de los daños en los vehículos.",
      "Kostenloses Parken ist auf dem festen Stellplatz in der Tiefgarage des Gebäudes möglich. Bitte nicht auf anderen Plätzen parken. Für Schäden an Fahrzeugen übernehmen wir keine Haftung.",
    ),
    T(
      "No BBQs, open fires, or flammable/explosive materials are permitted on balconies or anywhere in the building.",
      "Barbecues, open vuur of brandbare/explosieve materialen zijn niet toegelaten op de balkons of waar dan ook in het gebouw.",
      "Les barbecues, feux ouverts ou matières inflammables/explosives ne sont pas autorisés sur les balcons ni ailleurs dans l'immeuble.",
      "No se permiten barbacoas, fuegos abiertos ni materiales inflamables o explosivos en los balcones ni en ningún lugar del edificio.",
      "Grills, offenes Feuer oder brennbare/explosive Materialien sind auf den Balkonen und überall im Gebäude verboten.",
    ),
  ],

  howThings: {
    layout: T(
      "The apartment has two bedrooms, each with its own private bathroom. There is a spacious living room, a fully equipped kitchen, and a terrace with views over the Scheldt. Underground closed parking is included — bikes can also be stored in the garage. Towels and bedding are provided.",
      "Het appartement heeft twee slaapkamers, elk met een eigen badkamer. Er is een ruime woonkamer, een volledig uitgeruste keuken en een terras met zicht op de Schelde. Gesloten ondergronds parkeren is inbegrepen — ook fietsen kunnen in de garage gestald worden. Handdoeken en bedlinnen zijn voorzien.",
      "L'appartement compte deux chambres, chacune avec sa propre salle de bain. Il y a un grand salon, une cuisine entièrement équipée et une terrasse avec vue sur l'Escaut. Un parking souterrain fermé est inclus — les vélos peuvent aussi être rangés dans le garage. Les serviettes et le linge de lit sont fournis.",
      "El apartamento tiene dos dormitorios, cada uno con su propio baño. Hay un amplio salón, una cocina totalmente equipada y una terraza con vistas al Escalda. Incluye parking subterráneo cerrado — también se pueden guardar bicicletas en el garaje. Se proporcionan toallas y ropa de cama.",
      "Die Wohnung hat zwei Schlafzimmer mit jeweils eigenem Bad. Es gibt ein geräumiges Wohnzimmer, eine voll ausgestattete Küche und eine Terrasse mit Blick auf die Schelde. Ein geschlossener Tiefgaragenplatz ist inbegriffen — auch Fahrräder können in der Garage abgestellt werden. Handtücher und Bettwäsche sind vorhanden.",
    ),
    heating: T(
      "The thermostat for the heating is in the living room — turn the dial to set the temperature. The living room also has air conditioning; the remote is on the TV cabinet. Please keep windows closed while the heating or AC is on, and switch off when you head out for the day. Just ask us if anything is unclear.",
      "De thermostaat voor de verwarming bevindt zich in de woonkamer — draai aan de knop om de temperatuur in te stellen. De woonkamer heeft ook airconditioning; de afstandsbediening ligt op het tv-meubel. Hou de ramen gesloten terwijl de verwarming of airco aanstaat, en zet uit wanneer je voor de dag vertrekt. Vraag het ons gerust als iets onduidelijk is.",
      "Le thermostat du chauffage se trouve dans le salon — tournez le bouton pour régler la température. Le salon dispose aussi de la climatisation ; la télécommande est sur le meuble TV. Merci de garder les fenêtres fermées lorsque le chauffage ou la climatisation fonctionne, et d'éteindre en partant pour la journée. N'hésitez pas à nous demander si besoin.",
      "El termostato de la calefacción está en el salón — gira la rueda para ajustar la temperatura. El salón también tiene aire acondicionado; el mando está en el mueble del televisor. Por favor, mantén las ventanas cerradas mientras la calefacción o el aire estén encendidos, y apaga al salir durante el día. Pregúntanos si algo no queda claro.",
      "Der Thermostat für die Heizung befindet sich im Wohnzimmer — dreht am Regler, um die Temperatur einzustellen. Das Wohnzimmer hat außerdem eine Klimaanlage; die Fernbedienung liegt auf dem TV-Schrank. Bitte haltet die Fenster geschlossen, während Heizung oder Klimaanlage laufen, und schaltet aus, wenn ihr für den Tag aus dem Haus geht. Fragt uns einfach, wenn etwas unklar ist.",
    ),
    trash: T(
      "Please sort your waste. Yellow bag (PMD): plastic bottles, metal cans, and drink cartons. Blue bin: paper and cardboard. Glass container (in the building entrance area): glass bottles and jars. Black bag: residual/non-recyclable waste. Bags are in the kitchen cabinet under the sink. Ask if you have any questions.",
      "Sorteer het afval. Gele zak (PMD): plastic flessen, metalen blikjes en drankkartons. Blauwe bak: papier en karton. Glasbak (bij de inkom van het gebouw): glazen flessen en bokalen. Zwarte zak: restafval. De zakken liggen in de keukenkast onder de gootsteen. Vraag het gerust als je vragen hebt.",
      "Merci de trier vos déchets. Sac jaune (PMC) : bouteilles en plastique, canettes métalliques et briques de boisson. Bac bleu : papier et carton. Conteneur à verre (près de l'entrée de l'immeuble) : bouteilles et bocaux en verre. Sac noir : déchets résiduels. Les sacs se trouvent dans le placard de cuisine sous l'évier. N'hésitez pas à poser vos questions.",
      "Por favor, separa los residuos. Bolsa amarilla (envases): botellas de plástico, latas metálicas y briks de bebida. Contenedor azul: papel y cartón. Contenedor de vidrio (junto a la entrada del edificio): botellas y tarros de vidrio. Bolsa negra: residuos no reciclables. Las bolsas están en el armario de la cocina, bajo el fregadero. Pregunta si tienes dudas.",
      "Bitte trennt euren Müll. Gelber Sack (PMD): Plastikflaschen, Metalldosen und Getränkekartons. Blaue Tonne: Papier und Karton. Glascontainer (im Eingangsbereich des Gebäudes): Glasflaschen und Gläser. Schwarzer Sack: Restmüll. Die Säcke befinden sich im Küchenschrank unter der Spüle. Fragt einfach, wenn ihr Fragen habt.",
    ),
    keys: T(
      "Two full sets of keys are provided. The same key opens the front entrance, the stairwell doors, and the underground garage. A remote control for the garage is in the apartment. Please return both key sets at checkout. A deposit is charged at check-in and returned at checkout when all keys are back and the apartment is left in good condition.",
      "Er zijn twee volledige sleutelsets voorzien. Dezelfde sleutel opent de voordeur, de deuren van het trappenhuis en de ondergrondse garage. Een afstandsbediening voor de garage ligt in het appartement. Geef beide sleutelsets terug bij het uitchecken. Bij de check-in wordt een waarborg betaald, die bij het uitchecken wordt terugbetaald wanneer alle sleutels terug zijn en het appartement in goede staat is.",
      "Deux jeux complets de clés sont fournis. La même clé ouvre l'entrée principale, les portes de la cage d'escalier et le garage souterrain. Une télécommande pour le garage se trouve dans l'appartement. Merci de rendre les deux jeux de clés au départ. Une caution est versée à l'arrivée et remboursée au départ lorsque toutes les clés sont rendues et l'appartement laissé en bon état.",
      "Se entregan dos juegos completos de llaves. La misma llave abre la entrada principal, las puertas de la escalera y el garaje subterráneo. En el apartamento hay un mando a distancia para el garaje. Devuelve ambos juegos de llaves a la salida. Se paga una fianza en la entrada que se devuelve a la salida cuando se devuelven todas las llaves y el apartamento se deja en buen estado.",
      "Es stehen zwei komplette Schlüsselsätze zur Verfügung. Derselbe Schlüssel öffnet den Haupteingang, die Türen des Treppenhauses und die Tiefgarage. Eine Fernbedienung für die Garage liegt in der Wohnung. Bitte gebt beim Check-out beide Schlüsselsätze zurück. Beim Check-in wird eine Kaution hinterlegt, die beim Check-out zurückerstattet wird, sobald alle Schlüssel zurück sind und die Wohnung in gutem Zustand ist.",
    ),
    tv: T(
      "We hope you enjoy Ghent so much you have little time for TV. If you do sit down, the television has Netflix and Streamz available.",
      "We hopen dat je zo geniet van Gent dat je weinig tijd hebt voor tv. Als je toch gaat zitten: op de televisie zijn Netflix en Streamz beschikbaar.",
      "Nous espérons que vous apprécierez tellement Gand qu'il vous restera peu de temps pour la télé. Si vous vous installez, la télévision propose Netflix et Streamz.",
      "Esperamos que disfrutéis tanto de Gante que apenas tengáis tiempo para la tele. Si os sentáis, el televisor tiene Netflix y Streamz disponibles.",
      "Wir hoffen, ihr genießt Gent so sehr, dass kaum Zeit für Fernsehen bleibt. Falls doch: Auf dem Fernseher stehen Netflix und Streamz zur Verfügung.",
    ),
    laundry: T(
      "Nearby laundromats: WASBAR (Nederkouter 109, Gent) · VAN DEN HEEDE (Overpoort 20, Gent) · MAVZER BILAL (Ledebergstraat 17, Ledeberg) · GREEN AND ACTIVE SOLUTIONS (Ossenstraat 20, Gent).",
      "Wasserettes in de buurt: WASBAR (Nederkouter 109, Gent) · VAN DEN HEEDE (Overpoort 20, Gent) · MAVZER BILAL (Ledebergstraat 17, Ledeberg) · GREEN AND ACTIVE SOLUTIONS (Ossenstraat 20, Gent).",
      "Laveries à proximité : WASBAR (Nederkouter 109, Gand) · VAN DEN HEEDE (Overpoort 20, Gand) · MAVZER BILAL (Ledebergstraat 17, Ledeberg) · GREEN AND ACTIVE SOLUTIONS (Ossenstraat 20, Gand).",
      "Lavanderías cercanas: WASBAR (Nederkouter 109, Gante) · VAN DEN HEEDE (Overpoort 20, Gante) · MAVZER BILAL (Ledebergstraat 17, Ledeberg) · GREEN AND ACTIVE SOLUTIONS (Ossenstraat 20, Gante).",
      "Waschsalons in der Nähe: WASBAR (Nederkouter 109, Gent) · VAN DEN HEEDE (Overpoort 20, Gent) · MAVZER BILAL (Ledebergstraat 17, Ledeberg) · GREEN AND ACTIVE SOLUTIONS (Ossenstraat 20, Gent).",
    ),
    coffee: T(
      "A Senseo coffee machine is on the counter. Use the Senseo pods stored in the apartment. Press the single-cup button for a small cup or the double-cup button for a large cup. Rinse the pod holder after use.",
      "Op het aanrecht staat een Senseo-koffiemachine. Gebruik de Senseo-pads die in het appartement liggen. Druk op de knop voor één kopje voor een kleine koffie of op de knop voor twee kopjes voor een grote. Spoel de padhouder na gebruik.",
      "Une machine à café Senseo se trouve sur le plan de travail. Utilisez les dosettes Senseo rangées dans l'appartement. Appuyez sur le bouton une tasse pour un petit café ou sur le bouton deux tasses pour un grand. Rincez le porte-dosette après usage.",
      "Hay una cafetera Senseo en la encimera. Usa las cápsulas Senseo guardadas en el apartamento. Pulsa el botón de una taza para un café pequeño o el de dos tazas para uno grande. Enjuaga el portacápsulas después de usarlo.",
      "Auf der Arbeitsfläche steht eine Senseo-Kaffeemaschine. Verwendet die in der Wohnung vorhandenen Senseo-Pads. Drückt die Taste für eine Tasse für einen kleinen Kaffee oder die Taste für zwei Tassen für einen großen. Spült den Padhalter nach Gebrauch aus.",
    ),
    parking: T(
      "Free parking on your fixed spot in the building's underground garage. Please do not park in other spots. Bikes can also be stored in the garage. We are not responsible for damage to vehicles.",
      "Gratis parkeren op je vaste plaats in de ondergrondse garage van het gebouw. Parkeer niet op andere plaatsen. Ook fietsen kunnen in de garage gestald worden. Wij zijn niet verantwoordelijk voor schade aan voertuigen.",
      "Stationnement gratuit sur votre emplacement fixe dans le garage souterrain de l'immeuble. Merci de ne pas vous garer ailleurs. Les vélos peuvent aussi être rangés dans le garage. Nous ne sommes pas responsables des dommages aux véhicules.",
      "Aparcamiento gratuito en tu plaza fija del garaje subterráneo del edificio. Por favor, no aparques en otras plazas. También se pueden guardar bicicletas en el garaje. No nos hacemos responsables de los daños en los vehículos.",
      "Kostenloses Parken auf eurem festen Stellplatz in der Tiefgarage des Gebäudes. Bitte nicht auf anderen Plätzen parken. Auch Fahrräder können in der Garage abgestellt werden. Für Schäden an Fahrzeugen übernehmen wir keine Haftung.",
    ),
  },

  ghent: {
    mustSee: [
      { name: "Gravensteen", note: T(
        "The 12th-century castle in the heart of the city. Buy tickets online to skip the queue. Climb to the ramparts at sunset.",
        "Het 12de-eeuwse kasteel in het hart van de stad. Koop tickets online om de wachtrij te vermijden. Beklim de borstwering bij zonsondergang.",
        "Le château du XIIe siècle au cœur de la ville. Achetez les billets en ligne pour éviter la file. Montez sur les remparts au coucher du soleil.",
        "El castillo del siglo XII en el corazón de la ciudad. Compra las entradas en línea para evitar la cola. Sube a las murallas al atardecer.",
        "Die Burg aus dem 12. Jahrhundert im Herzen der Stadt. Kauft die Tickets online, um die Warteschlange zu vermeiden. Steigt bei Sonnenuntergang auf die Wehrgänge.",
      ) },
      { name: "St Bavo's Cathedral", note: T(
        "Home of the Van Eyck altarpiece 'The Adoration of the Mystic Lamb'. Book ahead for the dedicated exhibition room — genuinely unmissable.",
        "Hier hangt het Van Eyck-veelluik 'De aanbidding van het Lam Gods'. Reserveer vooraf voor de aparte tentoonstellingsruimte — echt een must.",
        "Abrite le retable de Van Eyck 'L'Adoration de l'Agneau mystique'. Réservez à l'avance pour la salle d'exposition dédiée — vraiment incontournable.",
        "Alberga el políptico de Van Eyck 'La adoración del Cordero Místico'. Reserva con antelación para la sala de exposición dedicada — realmente imprescindible.",
        "Hier hängt der Van-Eyck-Altar 'Die Anbetung des Lammes Gottes'. Bucht im Voraus für den eigens eingerichteten Ausstellungsraum — wirklich ein Muss.",
      ) },
      { name: "Graslei & Korenlei", note: T(
        "The medieval guild houses facing each other across the Leie. Best photographed in the golden hour before sunset.",
        "De middeleeuwse gildehuizen die elkaar over de Leie aankijken. Het mooist om te fotograferen tijdens het gouden uur voor zonsondergang.",
        "Les maisons de guilde médiévales qui se font face de part et d'autre de la Leie. À photographier de préférence à l'heure dorée avant le coucher du soleil.",
        "Las casas gremiales medievales enfrentadas a ambos lados del Leie. Mejor fotografiarlas en la hora dorada antes del atardecer.",
        "Die mittelalterlichen Gildehäuser, die sich über die Leie hinweg gegenüberstehen. Am schönsten zum Fotografieren in der goldenen Stunde vor Sonnenuntergang.",
      ) },
      { name: "STAM Museum", note: T(
        "The city's biography told on a giant aerial-photo floor map. Good for context on your first day.",
        "De biografie van de stad, verteld op een reusachtige luchtfoto-vloerkaart. Ideaal voor wat context op je eerste dag.",
        "La biographie de la ville racontée sur une gigantesque carte au sol en photo aérienne. Parfait pour se situer le premier jour.",
        "La biografía de la ciudad contada sobre un enorme mapa de suelo con fotografía aérea. Ideal para situarte el primer día.",
        "Die Biografie der Stadt, erzählt auf einer riesigen Luftbild-Bodenkarte. Ideal für etwas Kontext am ersten Tag.",
      ) },
      { name: "Patershol", note: T(
        "The cobblestoned medieval quarter near the castle. Wander the alleys after dinner when the lamps come on.",
        "De middeleeuwse wijk met kasseien vlak bij het kasteel. Dwaal na het eten door de steegjes wanneer de lampen aangaan.",
        "Le quartier médiéval pavé près du château. Flânez dans les ruelles après le dîner, quand les lampes s'allument.",
        "El barrio medieval adoquinado junto al castillo. Pasea por los callejones después de cenar, cuando se encienden las farolas.",
        "Das mittelalterliche Kopfsteinpflasterviertel nahe der Burg. Schlendert nach dem Essen durch die Gassen, wenn die Lampen angehen.",
      ) },
    ],
    hidden: [
      { name: "Het Achterhuis", note: T(
        "A walled garden behind a 17th-century almshouse on Lange Steenstraat. Free entry, almost never busy.",
        "Een ommuurde tuin achter een 17de-eeuws godshuis in de Lange Steenstraat. Gratis toegang, bijna nooit druk.",
        "Un jardin clos derrière un hospice du XVIIe siècle dans la Lange Steenstraat. Entrée gratuite, presque jamais fréquenté.",
        "Un jardín amurallado tras una casa de beneficencia del siglo XVII en Lange Steenstraat. Entrada gratuita, casi nunca concurrido.",
        "Ein ummauerter Garten hinter einem Armenhaus aus dem 17. Jahrhundert in der Lange Steenstraat. Eintritt frei, fast nie überlaufen.",
      ) },
      { name: "Dok Noord", note: T(
        "A former shipyard turned food hall and weekend market. Take tram 1 north — worth the trip.",
        "Een voormalige scheepswerf, nu food hall en weekendmarkt. Neem tram 1 richting noorden — de moeite waard.",
        "Un ancien chantier naval devenu halle gourmande et marché de week-end. Prenez le tram 1 vers le nord — ça vaut le détour.",
        "Un antiguo astillero convertido en mercado gastronómico y mercadillo de fin de semana. Toma el tranvía 1 hacia el norte — merece la pena.",
        "Eine ehemalige Werft, heute Markthalle und Wochenendmarkt. Nehmt die Tram 1 Richtung Norden — lohnt sich.",
      ) },
      { name: "Boekentoren", note: T(
        "Henry van de Velde's library tower. Free entry to the panoramic terrace on weekday afternoons.",
        "De boekentoren van Henry van de Velde. Gratis toegang tot het panoramaterras op weekdagen in de namiddag.",
        "La tour-bibliothèque de Henry van de Velde. Accès gratuit à la terrasse panoramique en semaine l'après-midi.",
        "La torre-biblioteca de Henry van de Velde. Acceso gratuito a la terraza panorámica entre semana por la tarde.",
        "Der Bücherturm von Henry van de Velde. Kostenloser Zugang zur Panoramaterrasse an Wochentagen am Nachmittag.",
      ) },
      { name: "Vrijdagmarkt", note: T(
        "The historic market square. Friday morning for fresh food and flowers, Saturday for the flea market.",
        "Het historische marktplein. Vrijdagochtend voor verse waren en bloemen, zaterdag voor de rommelmarkt.",
        "La place de marché historique. Vendredi matin pour les produits frais et les fleurs, samedi pour le marché aux puces.",
        "La histórica plaza del mercado. El viernes por la mañana para productos frescos y flores, el sábado para el mercadillo.",
        "Der historische Marktplatz. Freitagmorgen für frische Waren und Blumen, samstags für den Flohmarkt.",
      ) },
    ],
    bestTimes: T(
      "Mornings before 10 are quietest — the day-trippers arrive on the 11:15 train from Brussels. Sundays are calm. See www.visitgent.be for events and what's on.",
      "De ochtenden vóór 10 uur zijn het rustigst — de dagjesmensen komen met de trein van 11:15 uit Brussel. Zondagen zijn kalm. Kijk op www.visitgent.be voor evenementen en wat er te doen is.",
      "Les matinées avant 10h sont les plus calmes — les excursionnistes arrivent par le train de 11h15 de Bruxelles. Les dimanches sont tranquilles. Consultez www.visitgent.be pour les événements et l'agenda.",
      "Las mañanas antes de las 10 son las más tranquilas — los excursionistas llegan en el tren de las 11:15 desde Bruselas. Los domingos son tranquilos. Consulta www.visitgent.be para eventos y agenda.",
      "Die Vormittage vor 10 Uhr sind am ruhigsten — die Tagesausflügler kommen mit dem Zug um 11:15 Uhr aus Brüssel. Sonntage sind ruhig. Auf www.visitgent.be findet ihr Veranstaltungen und Aktuelles.",
    ),
    restaurantLinks: [
      { label: T("Hip & trendy restaurants", "Hippe & trendy restaurants", "Restaurants branchés & tendance", "Restaurantes modernos y con encanto", "Hippe & trendige Restaurants"),
        url: "https://visit.gent.be/nl/eten-drinken/restaurants-cafes?f%5B0%5D=category%3A21&f%5B1%5D=tags%3A259#index-summary" },
      { label: T("Ghent specialities", "Gentse specialiteiten", "Spécialités gantoises", "Especialidades de Gante", "Genter Spezialitäten"),
        url: "https://visit.gent.be/nl/eten-drinken/restaurants-cafes?f%5B0%5D=category%3A21&f%5B1%5D=tags%3A324#index-summary" },
      { label: T("Vegan & vegetarian", "Vegan & vegetarisch", "Vegan & végétarien", "Vegano y vegetariano", "Vegan & vegetarisch"),
        url: "https://visit.gent.be/nl/goed-om-weten/praktische-info/inspiratie/hongerstillers-en-dorstlessers/vegetarische-en-vegan" },
      { label: T("Beer cafés", "Biercafés", "Cafés à bière", "Cervecerías", "Bierkneipen"),
        url: "https://visit.gent.be/nl/eten-drinken/restaurants-cafes?f%5B0%5D=category%3A22&f%5B1%5D=tags%3A313#index-summary" },
      { label: T("Hip & trendy cafés", "Hippe & trendy cafés", "Cafés branchés & tendance", "Cafés modernos y con encanto", "Hippe & trendige Cafés"),
        url: "https://visit.gent.be/nl/eten-drinken/restaurants-cafes?f%5B0%5D=category%3A22&f%5B1%5D=tags%3A259#index-summary" },
      { label: T("Dance cafés", "Danscafés", "Cafés dansants", "Cafés de baile", "Tanzcafés"),
        url: "https://visit.gent.be/nl/eten-drinken/restaurants-cafes?f%5B0%5D=category%3A22&f%5B1%5D=tags%3A392#index-summary" },
      { label: T("Festivals & events", "Festivals & evenementen", "Festivals & événements", "Festivales y eventos", "Festivals & Veranstaltungen"),
        url: "https://visit.gent.be/nl/agenda/evenementen?f%5B0%5D=event_category%3A15" },
      { label: T("Shopping", "Gentse winkels", "Shopping", "Tiendas", "Shopping"),
        url: "https://visit.gent.be/nl/zien-doen/bezienswaardigheden?f%5B0%5D=category%3A11" },
    ],
  },

  neighborhood: [
    { kind: T("Bakery", "Bakkerij", "Boulangerie", "Panadería", "Bäckerei"), name: "Mertens", dist: "400 m",
      note: T(
        "François Bernhardstraat 86/1. The nearest bakery — fresh bread, pastries and sandwiches.",
        "François Bernhardstraat 86/1. De dichtste bakkerij — vers brood, gebak en broodjes.",
        "François Bernhardstraat 86/1. La boulangerie la plus proche — pain frais, pâtisseries et sandwichs.",
        "François Bernhardstraat 86/1. La panadería más cercana — pan fresco, bollería y bocadillos.",
        "François Bernhardstraat 86/1. Die nächste Bäckerei — frisches Brot, Gebäck und belegte Brötchen.",
      ), mapsUrl: mapsUrl("Bakkerij Mertens, François Bernhardstraat 86, Gent") },
    { kind: T("Supermarket", "Supermarkt", "Supermarché", "Supermercado", "Supermarkt"), name: "Spar", dist: "450 m",
      note: T(
        "Leeuwstraat 60. The closest shop for groceries and daily essentials.",
        "Leeuwstraat 60. De dichtstbijzijnde winkel voor boodschappen en dagelijkse benodigdheden.",
        "Leeuwstraat 60. Le magasin le plus proche pour les courses et les produits du quotidien.",
        "Leeuwstraat 60. La tienda más cercana para compras y artículos de uso diario.",
        "Leeuwstraat 60. Der nächste Laden für Einkäufe und Tagesbedarf.",
      ), mapsUrl: mapsUrl("Spar, Leeuwstraat 60, Gent") },
    { kind: T("Bakery", "Bakkerij", "Boulangerie", "Panadería", "Bäckerei"), name: "Smørbrod", dist: "1.4 km",
      note: T(
        "Guldenspoorstraat 29. Scandinavian-inspired open sandwiches and seasonal bakes.",
        "Guldenspoorstraat 29. Scandinavisch geïnspireerde open boterhammen en seizoensgebak.",
        "Guldenspoorstraat 29. Tartines ouvertes d'inspiration scandinave et pâtisseries de saison.",
        "Guldenspoorstraat 29. Sándwiches abiertos de inspiración escandinava y bollería de temporada.",
        "Guldenspoorstraat 29. Offene Sandwiches im skandinavischen Stil und saisonales Gebäck.",
      ), mapsUrl: mapsUrl("Smørbrod, Guldenspoorstraat 29, Gent") },
    { kind: T("Supermarket", "Supermarkt", "Supermarché", "Supermercado", "Supermarkt"), name: "Proxy Delhaize Heuvelpoort", dist: "750 m",
      note: T(
        "Ottergemsesteenweg 2. Walk to bridge, take stairs, turn left at the first traffic lights.",
        "Ottergemsesteenweg 2. Loop naar de brug, neem de trap en sla linksaf bij het eerste verkeerslicht.",
        "Ottergemsesteenweg 2. Allez jusqu'au pont, prenez les escaliers et tournez à gauche au premier feu.",
        "Ottergemsesteenweg 2. Camina hasta el puente, sube las escaleras y gira a la izquierda en el primer semáforo.",
        "Ottergemsesteenweg 2. Geht zur Brücke, nehmt die Treppe und biegt an der ersten Ampel links ab.",
      ), mapsUrl: mapsUrl("Proxy Delhaize Heuvelpoort, Ottergemsesteenweg 2, Gent") },
    { kind: T("Supermarket", "Supermarkt", "Supermarché", "Supermercado", "Supermarkt"), name: "Albert Heijn Overpoort", dist: "—",
      note: T(
        "Overpoortstraat, Gent — in the student district.",
        "Overpoortstraat, Gent — in de studentenbuurt.",
        "Overpoortstraat, Gand — dans le quartier étudiant.",
        "Overpoortstraat, Gante — en el barrio estudiantil.",
        "Overpoortstraat, Gent — im Studentenviertel.",
      ), mapsUrl: mapsUrl("Albert Heijn, Overpoortstraat, Gent") },
    { kind: T("Restaurant", "Restaurant", "Restaurant", "Restaurante", "Restaurant"), name: "Jilles Beer en Burgers", dist: "600 m",
      note: T(
        "Tentoonstellingslaan 165. Gourmet beef, veggie & chicken burgers — www.jilles.be",
        "Tentoonstellingslaan 165. Gourmetburgers van rund, groenten & kip — www.jilles.be",
        "Tentoonstellingslaan 165. Burgers gourmets de bœuf, végétariens & poulet — www.jilles.be",
        "Tentoonstellingslaan 165. Hamburguesas gourmet de ternera, vegetales y pollo — www.jilles.be",
        "Tentoonstellingslaan 165. Gourmet-Burger mit Rind, Gemüse & Hähnchen — www.jilles.be",
      ), mapsUrl: mapsUrl("Jilles Beer en Burgers, Tentoonstellingslaan 165, Gent") },
    { kind: T("Restaurant", "Restaurant", "Restaurant", "Restaurante", "Restaurant"), name: "Jour de fête", dist: "750 m",
      note: T(
        "Gustaaf Callierlaan 233. Seasonal Belgian-Mediterranean cuisine. www.restaurantjourdefete.be",
        "Gustaaf Callierlaan 233. Seizoensgebonden Belgisch-mediterrane keuken. www.restaurantjourdefete.be",
        "Gustaaf Callierlaan 233. Cuisine belgo-méditerranéenne de saison. www.restaurantjourdefete.be",
        "Gustaaf Callierlaan 233. Cocina belga-mediterránea de temporada. www.restaurantjourdefete.be",
        "Gustaaf Callierlaan 233. Saisonale belgisch-mediterrane Küche. www.restaurantjourdefete.be",
      ), mapsUrl: mapsUrl("Jour de fête, Gustaaf Callierlaan 233, Gent") },
    { kind: T("Restaurant", "Restaurant", "Restaurant", "Restaurante", "Restaurant"), name: "La Dolce Vita", dist: "600 m",
      note: T(
        "Ter Plaeten 2. Walk along the water past the Kinépolis. restoladolcevita.be",
        "Ter Plaeten 2. Loop langs het water voorbij de Kinépolis. restoladolcevita.be",
        "Ter Plaeten 2. Longez l'eau au-delà du Kinépolis. restoladolcevita.be",
        "Ter Plaeten 2. Camina junto al agua más allá del Kinépolis. restoladolcevita.be",
        "Ter Plaeten 2. Geht am Wasser entlang am Kinépolis vorbei. restoladolcevita.be",
      ), mapsUrl: mapsUrl("La Dolce Vita, Ter Plaeten 2, Gent") },
    { kind: T("Restaurant", "Restaurant", "Restaurant", "Restaurante", "Restaurant"), name: "Bavet", dist: "650 m",
      note: T(
        "Muinkkaal 120. Fast-casual spaghetti, new-wave Belgian. www.bavet.eu",
        "Muinkkaal 120. Fast-casual spaghetti, new-wave Belgisch. www.bavet.eu",
        "Muinkkaal 120. Spaghetti fast-casual, belge new-wave. www.bavet.eu",
        "Muinkkaal 120. Espaguetis fast-casual, belga new-wave. www.bavet.eu",
        "Muinkkaal 120. Fast-Casual-Spaghetti, belgische New-Wave-Küche. www.bavet.eu",
      ), mapsUrl: mapsUrl("Bavet, Muinkkaal 120, Gent") },
    { kind: T("Restaurant", "Restaurant", "Restaurant", "Restaurante", "Restaurant"), name: "Spring!", dist: "600 m",
      note: T(
        "Tentoonstellingslaan 125. Creative seasonal cooking. www.spring.gent",
        "Tentoonstellingslaan 125. Creatieve seizoenskeuken. www.spring.gent",
        "Tentoonstellingslaan 125. Cuisine de saison créative. www.spring.gent",
        "Tentoonstellingslaan 125. Cocina de temporada creativa. www.spring.gent",
        "Tentoonstellingslaan 125. Kreative saisonale Küche. www.spring.gent",
      ), mapsUrl: mapsUrl("Spring!, Tentoonstellingslaan 125, Gent") },
    { kind: T("Restaurant", "Restaurant", "Restaurant", "Restaurante", "Restaurant"), name: "Casa Di Batavia", dist: "800 m",
      note: T(
        "François Benardstraat 80. Take-away Indonesian food. www.casadibatavia.com",
        "François Benardstraat 80. Indonesisch afhaalrestaurant. www.casadibatavia.com",
        "François Benardstraat 80. Cuisine indonésienne à emporter. www.casadibatavia.com",
        "François Benardstraat 80. Comida indonesia para llevar. www.casadibatavia.com",
        "François Benardstraat 80. Indonesisches Essen zum Mitnehmen. www.casadibatavia.com",
      ), mapsUrl: mapsUrl("Casa Di Batavia, François Benardstraat 80, Gent") },
    { kind: T("Pub", "Café", "Bar", "Bar", "Kneipe"), name: "De Brouwerszaele", dist: "500 m",
      note: "Ter Plaeten 17, 9000 Gent.", mapsUrl: mapsUrl("De Brouwerszaele, Ter Plaeten 17, Gent") },
    { kind: T("Pub", "Café", "Bar", "Bar", "Kneipe"), name: "Kaffee De Plank", dist: "500 m",
      note: "Ter Plaeten 10A, 9000 Gent.", mapsUrl: mapsUrl("Kaffee De Plank, Ter Plaeten 10A, Gent") },
    { kind: T("Pub", "Café", "Bar", "Bar", "Kneipe"), name: "Cocktail Hollywood", dist: "600 m",
      note: "Ter Plaeten 3, 9000 Gent.", mapsUrl: mapsUrl("Cocktail Hollywood, Ter Plaeten 3, Gent") },
    { kind: T("Pub", "Café", "Bar", "Bar", "Kneipe"), name: "Sunset", dist: "500 m",
      note: "François Benardstraat 2, 9000 Gent.", mapsUrl: mapsUrl("Sunset bar, François Benardstraat 2, Gent") },
    { kind: T("Pub", "Café", "Bar", "Bar", "Kneipe"), name: "Overpoort", dist: "—",
      note: T(
        "The main student café street in Ghent — lively every evening.",
        "De grootste studentencafé-straat van Gent — elke avond levendig.",
        "La grande rue des cafés étudiants de Gand — animée chaque soir.",
        "La principal calle de cafés estudiantiles de Gante — animada cada noche.",
        "Die wichtigste Studentenkneipenstraße Gents — jeden Abend lebhaft.",
      ), mapsUrl: mapsUrl("Overpoort student bars, Gent") },
    { kind: T("Cinema", "Bioscoop", "Cinéma", "Cine", "Kino"), name: "Kinépolis", dist: "500 m",
      note: T(
        "Ter Plaeten 12. Large multiplex cinema, 5 min walk.",
        "Ter Plaeten 12. Grote multiplexbioscoop, 5 min wandelen.",
        "Ter Plaeten 12. Grand cinéma multiplexe, à 5 min à pied.",
        "Ter Plaeten 12. Gran cine multisalas, a 5 min a pie.",
        "Ter Plaeten 12. Großes Multiplex-Kino, 5 Min. zu Fuß.",
      ), mapsUrl: mapsUrl("Kinepolis Gent, Ter Plaeten 12") },
    { kind: T("Pharmacy", "Apotheek", "Pharmacie", "Farmacia", "Apotheke"), name: "Leveugle", dist: "—",
      note: "Franklin Rooseveltlaan 505, 9000 Gent.", mapsUrl: mapsUrl("Apotheek Leveugle, Franklin Rooseveltlaan 505, Gent") },
    { kind: T("Laundry", "Wasserette", "Laverie", "Lavandería", "Waschsalon"), name: "WASBAR", dist: "—",
      note: "Nederkouter 109, Gent.", mapsUrl: mapsUrl("WASBAR, Nederkouter 109, Gent") },
  ],

  tours: [
    { name: T("Canal boat — De Bootjes van Gent", "Rondvaart — De Bootjes van Gent", "Bateau sur les canaux — De Bootjes van Gent", "Paseo en barco — De Bootjes van Gent", "Grachtenfahrt — De Bootjes van Gent"),
      duration: "40 min", price: "€10",
      note: T(
        "Leaves from Korenlei every 20 min. Buy tickets at the dock. The best way to see the medieval waterfront.",
        "Vertrekt van de Korenlei om de 20 min. Tickets aan de aanlegsteiger. De beste manier om de middeleeuwse waterkant te zien.",
        "Départ du Korenlei toutes les 20 min. Billets à l'embarcadère. La meilleure façon de voir le front d'eau médiéval.",
        "Sale del Korenlei cada 20 min. Entradas en el embarcadero. La mejor manera de ver la fachada fluvial medieval.",
        "Fährt alle 20 Min. vom Korenlei ab. Tickets am Anleger. Die beste Art, die mittelalterliche Uferfront zu sehen.",
      ) },
    { name: T("Free Walking Tour", "Gratis stadswandeling", "Visite à pied gratuite", "Tour a pie gratuito", "Kostenlose Stadtführung"),
      duration: "2.5 h", price: T("Tip-based", "Fooi-basis", "Au pourboire", "Según propina", "Auf Trinkgeldbasis"),
      note: T(
        "Daily at 10:30 and 14:30 from St Bavo's. Look for the guide with the green umbrella.",
        "Dagelijks om 10:30 en 14:30 aan de Sint-Baafskathedraal. Zoek de gids met de groene paraplu.",
        "Tous les jours à 10h30 et 14h30 depuis la cathédrale Saint-Bavon. Cherchez le guide au parapluie vert.",
        "Cada día a las 10:30 y 14:30 desde la catedral de San Bavón. Busca al guía con el paraguas verde.",
        "Täglich um 10:30 und 14:30 Uhr ab der St.-Bavo-Kathedrale. Achtet auf den Guide mit dem grünen Regenschirm.",
      ) },
    { name: T("Beer + Belgian Food Tour", "Bier- & Belgische foodtour", "Tour bière & cuisine belge", "Tour de cerveza y comida belga", "Bier- & belgische Food-Tour"),
      duration: "3 h", price: "€75",
      note: T(
        "Small groups, six tastings. Book via Vizit Ghent.",
        "Kleine groepen, zes proeverijen. Boek via Vizit Gent.",
        "Petits groupes, six dégustations. Réservez via Vizit Ghent.",
        "Grupos pequeños, seis degustaciones. Reserva a través de Vizit Ghent.",
        "Kleine Gruppen, sechs Verkostungen. Buchung über Vizit Ghent.",
      ) },
    { name: T("Bruges day trip", "Dagtrip naar Brugge", "Excursion à Bruges", "Excursión a Brujas", "Tagesausflug nach Brügge"),
      duration: T("Full day", "Volledige dag", "Journée entière", "Día completo", "Ganzer Tag"), price: T("€19 return", "€19 retour", "19 € aller-retour", "19 € ida y vuelta", "19 € hin und zurück"),
      note: T(
        "Direct train, 25 min. Go early — the medieval centre is best before the tour buses arrive.",
        "Directe trein, 25 min. Ga vroeg — het middeleeuwse centrum is op zijn mooist vóór de toerbussen arriveren.",
        "Train direct, 25 min. Partez tôt — le centre médiéval est plus agréable avant l'arrivée des bus de tourisme.",
        "Tren directo, 25 min. Ve temprano — el centro medieval es mejor antes de que lleguen los autobuses turísticos.",
        "Direktzug, 25 Min. Fahrt früh — das mittelalterliche Zentrum ist am schönsten, bevor die Reisebusse kommen.",
      ) },
    { name: T("Bike the Lys", "Fietsen langs de Leie", "À vélo le long de la Lys", "En bici por el Lys", "Mit dem Rad an der Leie"),
      duration: T("Half day", "Halve dag", "Demi-journée", "Medio día", "Halber Tag"), price: "€15",
      note: T(
        "Rent at Biker, cycle the river path to Sint-Martens-Latem. Flat and mostly car-free.",
        "Huur bij Biker en fiets het jaagpad langs de rivier naar Sint-Martens-Latem. Vlak en grotendeels autovrij.",
        "Louez chez Biker et pédalez le long de la rivière jusqu'à Sint-Martens-Latem. Plat et presque sans voitures.",
        "Alquila en Biker y pedalea por el camino del río hasta Sint-Martens-Latem. Llano y casi sin coches.",
        "Leiht bei Biker und radelt den Flussweg nach Sint-Martens-Latem. Flach und größtenteils autofrei.",
      ) },
    { name: "GetYourGuide — Ghent tours",
      duration: T("Varies", "Variabel", "Variable", "Variable", "Variabel"), price: T("From €10", "Vanaf €10", "À partir de 10 €", "Desde 10 €", "Ab 10 €"),
      note: T(
        "All types of tours — boat trips, food tours, walking tours, day trips. Book online: www.getyourguide.com/ghent",
        "Alle soorten tours — boottochten, foodtours, wandeltours, dagtrips. Boek online: www.getyourguide.com/ghent",
        "Tous types de visites — balades en bateau, tours gourmands, visites à pied, excursions. Réservez en ligne : www.getyourguide.com/ghent",
        "Todo tipo de tours — paseos en barco, tours gastronómicos, tours a pie, excursiones. Reserva en línea: www.getyourguide.com/ghent",
        "Alle Arten von Touren — Bootsfahrten, Food-Touren, Stadtführungen, Tagesausflüge. Online buchen: www.getyourguide.com/ghent",
      ) },
    { name: T("Gentse Gidsen (Licensed City Guides)", "Gentse Gidsen (erkende stadsgidsen)", "Gentse Gidsen (guides officiels)", "Gentse Gidsen (guías oficiales)", "Gentse Gidsen (lizenzierte Stadtführer)"),
      duration: "2 h", price: T("From €90 (group)", "Vanaf €90 (groep)", "À partir de 90 € (groupe)", "Desde 90 € (grupo)", "Ab 90 € (Gruppe)"),
      note: T(
        "Official licensed guides of Ghent. Private and group tours, tailor-made itineraries. www.gentsegidsen.be",
        "Officiële erkende gidsen van Gent. Privé- en groepstours, gidsbeurten op maat. www.gentsegidsen.be",
        "Guides officiels agréés de Gand. Visites privées et de groupe, itinéraires sur mesure. www.gentsegidsen.be",
        "Guías oficiales de Gante. Tours privados y de grupo, itinerarios a medida. www.gentsegidsen.be",
        "Offizielle lizenzierte Gästeführer von Gent. Privat- und Gruppentouren, maßgeschneiderte Routen. www.gentsegidsen.be",
      ) },
    { name: T("Walking in Ghent (Guided Tours)", "Walking in Gent (rondleidingen)", "Walking in Gent (visites guidées)", "Walking in Gent (visitas guiadas)", "Walking in Gent (Führungen)"),
      duration: T("Varies", "Variabel", "Variable", "Variable", "Variabel"), price: T("Varies", "Variabel", "Variable", "Variable", "Variabel"),
      note: T(
        "Themed guided walking tours of Ghent by local guides. Book online: www.walkingent.be/rondleidingen",
        "Thematische geleide stadswandelingen door lokale gidsen. Boek online: www.walkingent.be/rondleidingen",
        "Visites à pied thématiques de Gand par des guides locaux. Réservez en ligne : www.walkingent.be/rondleidingen",
        "Visitas a pie temáticas por Gante con guías locales. Reserva en línea: www.walkingent.be/rondleidingen",
        "Thematische geführte Stadtrundgänge durch lokale Guides. Online buchen: www.walkingent.be/rondleidingen",
      ) },
  ],

  toursHostNote: T(
    "Our own self-guided City Walk (see the Walk tab) is the loveliest way to discover Ghent at your own pace. The free walking tour is also a great introduction to the city, and for deeper dives the licensed Gentse Gidsen offer wonderful private tours.",
    "Onze eigen zelfgeleide Stadswandeling (zie het tabblad Wandeling) is de fijnste manier om Gent op je eigen tempo te ontdekken. De gratis stadswandeling is ook een mooie kennismaking met de stad, en wil je dieper gaan, dan bieden de erkende Gentse Gidsen prachtige privétours.",
    "Notre propre Promenade en ville autoguidée (voir l'onglet Balade) est la plus belle façon de découvrir Gand à votre rythme. La visite à pied gratuite est aussi une belle introduction, et pour aller plus loin, les Gentse Gidsen agréés proposent de superbes visites privées.",
    "Nuestro propio Paseo autoguiado por la ciudad (ver la pestaña Paseo) es la forma más bonita de descubrir Gante a tu ritmo. El tour a pie gratuito también es una buena introducción, y para profundizar, los Gentse Gidsen oficiales ofrecen magníficos tours privados.",
    "Unser eigener selbstgeführter Stadtrundgang (siehe Reiter Rundgang) ist die schönste Art, Gent in eigenem Tempo zu entdecken. Die kostenlose Stadtführung ist ebenfalls eine gute Einführung, und für mehr Tiefe bieten die lizenzierten Gentse Gidsen wunderbare Privattouren.",
  ),

  transport: {
    bus: T(
      "Walk via Ter Plaeten to the Plaetenbrug. Take the stairs up and cross at the zebra crossing. Two bus stops on Tentoonstellingslaan on the other side:\n• Right stop (towards city centre): buses 33, 55, 70, 76, 78\n• Left stop (towards station Sint-Pieters): buses 34, 55, 70, 71, 76, 78\nBuses run every 7–10 minutes.",
      "Loop via Ter Plaeten naar de Plaetenbrug. Neem de trap omhoog en steek over aan het zebrapad. Aan de overkant zijn er twee bushaltes op de Tentoonstellingslaan:\n• Rechtse halte (richting centrum): bussen 33, 55, 70, 76, 78\n• Linkse halte (richting station Sint-Pieters): bussen 34, 55, 70, 71, 76, 78\nBussen rijden om de 7–10 minuten.",
      "Rejoignez le Plaetenbrug via Ter Plaeten. Montez les escaliers et traversez au passage piéton. De l'autre côté, deux arrêts de bus sur la Tentoonstellingslaan :\n• Arrêt de droite (vers le centre-ville) : bus 33, 55, 70, 76, 78\n• Arrêt de gauche (vers la gare Sint-Pieters) : bus 34, 55, 70, 71, 76, 78\nLes bus passent toutes les 7 à 10 minutes.",
      "Camina por Ter Plaeten hasta el Plaetenbrug. Sube las escaleras y cruza por el paso de cebra. Al otro lado hay dos paradas de autobús en Tentoonstellingslaan:\n• Parada de la derecha (hacia el centro): autobuses 33, 55, 70, 76, 78\n• Parada de la izquierda (hacia la estación Sint-Pieters): autobuses 34, 55, 70, 71, 76, 78\nLos autobuses pasan cada 7–10 minutos.",
      "Geht über Ter Plaeten zur Plaetenbrug. Nehmt die Treppe nach oben und überquert am Zebrastreifen. Auf der anderen Seite gibt es zwei Bushaltestellen an der Tentoonstellingslaan:\n• Rechte Haltestelle (Richtung Zentrum): Busse 33, 55, 70, 76, 78\n• Linke Haltestelle (Richtung Bahnhof Sint-Pieters): Busse 34, 55, 70, 71, 76, 78\nBusse fahren alle 7–10 Minuten.",
    ),
    dayTicket: T(
      "Buy a ticket on the De Lijn website (delijn.be/nl/tickets), via the De Lijn app, or by texting DLD to 4884. Plan your route at delijn.be/nl/routeplanner.",
      "Koop een ticket via de website (delijn.be/nl/tickets), de De Lijn-app of sms DLD naar 4884. Routeplanner: delijn.be/nl/routeplanner.",
      "Achetez un ticket sur le site De Lijn (delijn.be/nl/tickets), via l'app De Lijn ou par SMS DLD au 4884. Itinéraires : delijn.be/nl/routeplanner.",
      "Compra un billete en la web de De Lijn (delijn.be/nl/tickets), en la app De Lijn o enviando DLD al 4884. Planifica tu ruta en delijn.be/nl/routeplanner.",
      "Kauft ein Ticket auf der De-Lijn-Website (delijn.be/nl/tickets), über die De-Lijn-App oder per SMS DLD an 4884. Routenplaner: delijn.be/nl/routeplanner.",
    ),
  },

  // FAQ — edit questions and answers here
  faq: [
    {
      q: T("What time is check-in and check-out?", "Hoe laat is het in- en uitchecken?", "À quelle heure se font l'arrivée et le départ ?", "¿A qué hora son la entrada y la salida?", "Wann sind Check-in und Check-out?"),
      a: T(
        "Check-in is from 14:00. Check-out is before 10:00. If you need a different arrangement, please contact us in advance.",
        "Inchecken kan vanaf 14:00. Uitchecken vóór 10:00. Heb je een andere regeling nodig, neem dan vooraf contact met ons op.",
        "L'arrivée se fait à partir de 14:00. Le départ avant 10:00. Si vous avez besoin d'un autre arrangement, contactez-nous à l'avance.",
        "La entrada es a partir de las 14:00. La salida antes de las 10:00. Si necesitas otro arreglo, contáctanos con antelación.",
        "Check-in ab 14:00 Uhr. Check-out vor 10:00 Uhr. Wenn ihr eine andere Regelung benötigt, kontaktiert uns bitte im Voraus.",
      ),
    },
    {
      q: T("Is there parking available?", "Is er parkeergelegenheid?", "Y a-t-il un parking ?", "¿Hay aparcamiento disponible?", "Gibt es Parkmöglichkeiten?"),
      a: T(
        "Yes, free parking is available on your fixed spot in the building's underground garage. Please do not park in other spots. Bikes can also be stored in the garage. We are not responsible for damage to vehicles.",
        "Ja, gratis parkeren op je vaste plaats in de ondergrondse garage van het gebouw. Parkeer niet op andere plaatsen. Ook fietsen kunnen in de garage gestald worden. Wij zijn niet verantwoordelijk voor schade aan voertuigen.",
        "Oui, stationnement gratuit sur votre emplacement fixe dans le garage souterrain de l'immeuble. Merci de ne pas vous garer ailleurs. Les vélos peuvent aussi être rangés dans le garage. Nous ne sommes pas responsables des dommages aux véhicules.",
        "Sí, aparcamiento gratuito en tu plaza fija del garaje subterráneo del edificio. Por favor, no aparques en otras plazas. También se pueden guardar bicicletas en el garaje. No nos hacemos responsables de los daños en los vehículos.",
        "Ja, kostenloses Parken auf eurem festen Stellplatz in der Tiefgarage des Gebäudes. Bitte nicht auf anderen Plätzen parken. Auch Fahrräder können in der Garage abgestellt werden. Für Schäden an Fahrzeugen übernehmen wir keine Haftung.",
      ),
    },
    {
      q: T("Are pets allowed?", "Zijn huisdieren toegelaten?", "Les animaux sont-ils admis ?", "¿Se admiten mascotas?", "Sind Haustiere erlaubt?"),
      a: T(
        "Unfortunately pets are not allowed in the apartment.",
        "Helaas zijn huisdieren niet toegelaten in het appartement.",
        "Malheureusement, les animaux ne sont pas admis dans l'appartement.",
        "Lamentablemente no se admiten mascotas en el apartamento.",
        "Leider sind Haustiere in der Wohnung nicht erlaubt.",
      ),
    },
    {
      q: T("Can I smoke in the apartment?", "Mag ik roken in het appartement?", "Puis-je fumer dans l'appartement ?", "¿Puedo fumar en el apartamento?", "Darf ich in der Wohnung rauchen?"),
      a: T(
        "Smoking is strictly forbidden inside the apartment and in all common areas. You may smoke on the terrace only.",
        "Roken is strikt verboden in het appartement en in alle gemeenschappelijke ruimtes. Roken mag enkel op het terras.",
        "Il est strictement interdit de fumer dans l'appartement et dans toutes les parties communes. Vous ne pouvez fumer que sur la terrasse.",
        "Está totalmente prohibido fumar dentro del apartamento y en todas las zonas comunes. Solo puedes fumar en la terraza.",
        "Rauchen ist in der Wohnung und in allen Gemeinschaftsbereichen streng verboten. Ihr dürft nur auf der Terrasse rauchen.",
      ),
    },
    {
      q: T("How do I access the apartment?", "Hoe krijg ik toegang tot het appartement?", "Comment accéder à l'appartement ?", "¿Cómo accedo al apartamento?", "Wie komme ich in die Wohnung?"),
      a: T(
        "A key will be provided at check-in, during a personal welcome. The same key opens the front entrance, stairwell doors, and the underground garage. A remote for the garage is provided. A deposit is charged at check-in and returned at checkout.",
        "Bij de check-in krijg je een sleutel, tijdens een persoonlijk onthaal. Dezelfde sleutel opent de voordeur, de deuren van het trappenhuis en de ondergrondse garage. Een afstandsbediening voor de garage wordt voorzien. Bij de check-in wordt een waarborg betaald, die bij het uitchecken wordt terugbetaald.",
        "Une clé vous est remise à l'arrivée, lors d'un accueil personnel. La même clé ouvre l'entrée principale, les portes de la cage d'escalier et le garage souterrain. Une télécommande pour le garage est fournie. Une caution est versée à l'arrivée et remboursée au départ.",
        "Se te entregará una llave en la entrada, durante una recepción personal. La misma llave abre la entrada principal, las puertas de la escalera y el garaje subterráneo. Se proporciona un mando para el garaje. Se paga una fianza en la entrada que se devuelve a la salida.",
        "Beim Check-in erhaltet ihr einen Schlüssel im Rahmen eines persönlichen Empfangs. Derselbe Schlüssel öffnet den Haupteingang, die Treppenhaustüren und die Tiefgarage. Eine Fernbedienung für die Garage wird bereitgestellt. Beim Check-in wird eine Kaution hinterlegt, die beim Check-out zurückerstattet wird.",
      ),
    },
    {
      q: T("Is there a washing machine?", "Is er een wasmachine?", "Y a-t-il une machine à laver ?", "¿Hay lavadora?", "Gibt es eine Waschmaschine?"),
      a: T(
        "There is no washing machine in the apartment. Several laundromats are nearby: WASBAR (Nederkouter 109), VAN DEN HEEDE (Overpoort 20), MAVZER BILAL (Ledebergstraat 17, Ledeberg).",
        "Er is geen wasmachine in het appartement. Verschillende wasserettes liggen in de buurt: WASBAR (Nederkouter 109), VAN DEN HEEDE (Overpoort 20), MAVZER BILAL (Ledebergstraat 17, Ledeberg).",
        "Il n'y a pas de machine à laver dans l'appartement. Plusieurs laveries sont à proximité : WASBAR (Nederkouter 109), VAN DEN HEEDE (Overpoort 20), MAVZER BILAL (Ledebergstraat 17, Ledeberg).",
        "No hay lavadora en el apartamento. Hay varias lavanderías cerca: WASBAR (Nederkouter 109), VAN DEN HEEDE (Overpoort 20), MAVZER BILAL (Ledebergstraat 17, Ledeberg).",
        "In der Wohnung gibt es keine Waschmaschine. In der Nähe befinden sich mehrere Waschsalons: WASBAR (Nederkouter 109), VAN DEN HEEDE (Overpoort 20), MAVZER BILAL (Ledebergstraat 17, Ledeberg).",
      ),
    },
    {
      q: T("How do I get to the city centre?", "Hoe geraak ik in het stadscentrum?", "Comment rejoindre le centre-ville ?", "¿Cómo llego al centro de la ciudad?", "Wie komme ich ins Stadtzentrum?"),
      a: T(
        "Walk via Ter Plaeten to the Plaetenbrug, take the stairs up and cross at the zebra crossing. Buses on Tentoonstellingslaan: towards city centre (right stop): 33, 55, 70, 76, 78. Towards station Sint-Pieters (left stop): 34, 55, 70, 71, 76, 78. Buses run every 7–10 minutes. Buy a ticket via the De Lijn website, the app, or by texting DLD to 4884.",
        "Loop via Ter Plaeten naar de Plaetenbrug, neem de trap omhoog en steek over aan het zebrapad. Bussen op de Tentoonstellingslaan: richting centrum (rechtse halte): 33, 55, 70, 76, 78. Richting station Sint-Pieters (linkse halte): 34, 55, 70, 71, 76, 78. Bussen rijden om de 7–10 minuten. Koop een ticket via de website van De Lijn, de app of sms DLD naar 4884.",
        "Rejoignez le Plaetenbrug via Ter Plaeten, montez les escaliers et traversez au passage piéton. Bus sur la Tentoonstellingslaan : vers le centre-ville (arrêt de droite) : 33, 55, 70, 76, 78. Vers la gare Sint-Pieters (arrêt de gauche) : 34, 55, 70, 71, 76, 78. Les bus passent toutes les 7 à 10 minutes. Achetez un ticket via le site De Lijn, l'app ou par SMS DLD au 4884.",
        "Camina por Ter Plaeten hasta el Plaetenbrug, sube las escaleras y cruza por el paso de cebra. Autobuses en Tentoonstellingslaan: hacia el centro (parada derecha): 33, 55, 70, 76, 78. Hacia la estación Sint-Pieters (parada izquierda): 34, 55, 70, 71, 76, 78. Los autobuses pasan cada 7–10 minutos. Compra un billete en la web de De Lijn, la app o enviando DLD al 4884.",
        "Geht über Ter Plaeten zur Plaetenbrug, nehmt die Treppe nach oben und überquert am Zebrastreifen. Busse an der Tentoonstellingslaan: Richtung Zentrum (rechte Haltestelle): 33, 55, 70, 76, 78. Richtung Bahnhof Sint-Pieters (linke Haltestelle): 34, 55, 70, 71, 76, 78. Busse fahren alle 7–10 Minuten. Kauft ein Ticket über die De-Lijn-Website, die App oder per SMS DLD an 4884.",
      ),
    },
    {
      q: T("What is the WiFi password?", "Wat is het wifi-wachtwoord?", "Quel est le mot de passe du WiFi ?", "¿Cuál es la contraseña del WiFi?", "Wie lautet das WLAN-Passwort?"),
      a: T(
        "Network: telenet F5DDF — Password: SyBBm0R4XHPP. Tap the Info tab for a tap-to-copy version.",
        "Netwerk: telenet F5DDF — Wachtwoord: SyBBm0R4XHPP. Tik op het tabblad Info voor een versie om te kopiëren.",
        "Réseau : telenet F5DDF — Mot de passe : SyBBm0R4XHPP. Touchez l'onglet Info pour une version à copier d'un toucher.",
        "Red: telenet F5DDF — Contraseña: SyBBm0R4XHPP. Toca la pestaña Info para una versión que puedes copiar con un toque.",
        "Netzwerk: telenet F5DDF — Passwort: SyBBm0R4XHPP. Tippt auf den Reiter Info für eine Version zum Kopieren.",
      ),
    },
    {
      q: T("Who do I contact in case of a problem?", "Wie contacteer ik bij een probleem?", "Qui contacter en cas de problème ?", "¿A quién contacto en caso de problema?", "Wen kontaktiere ich bei einem Problem?"),
      a: T(
        "Contact the owners: Luc on +32 468 12 29 12 (phone/WhatsApp) or lubro@telenet.be, or Tom on +32 496 59 41 60. We typically reply within a few hours.",
        "Contacteer de eigenaars: Luc op +32 468 12 29 12 (telefoon/WhatsApp) of lubro@telenet.be, of Tom op +32 496 59 41 60. We antwoorden meestal binnen enkele uren.",
        "Contactez les propriétaires : Luc au +32 468 12 29 12 (téléphone/WhatsApp) ou lubro@telenet.be, ou Tom au +32 496 59 41 60. Nous répondons généralement en quelques heures.",
        "Contacta con los propietarios: Luc en el +32 468 12 29 12 (teléfono/WhatsApp) o lubro@telenet.be, o Tom en el +32 496 59 41 60. Solemos responder en pocas horas.",
        "Kontaktiert die Eigentümer: Luc unter +32 468 12 29 12 (Telefon/WhatsApp) oder lubro@telenet.be, oder Tom unter +32 496 59 41 60. Wir antworten in der Regel innerhalb weniger Stunden.",
      ),
    },
    {
      q: T("Is there a noise policy?", "Zijn er afspraken rond geluid?", "Y a-t-il des règles concernant le bruit ?", "¿Hay normas sobre el ruido?", "Gibt es Regeln zur Lautstärke?"),
      a: T(
        "Please keep noise to a minimum between 22:00 and 07:00, and be mindful of the neighbours below — avoid heavy footsteps and dragging furniture.",
        "Hou het geluid tot een minimum beperkt tussen 22:00 en 07:00 en hou rekening met de buren beneden — vermijd zwaar stappen en het schuiven met meubels.",
        "Merci de limiter le bruit entre 22:00 et 07:00 et d'être attentif aux voisins du dessous — évitez les pas lourds et de traîner les meubles.",
        "Por favor, reduce el ruido al mínimo entre las 22:00 y las 07:00 y ten en cuenta a los vecinos de abajo — evita pisar fuerte y arrastrar muebles.",
        "Bitte haltet den Lärm zwischen 22:00 und 07:00 Uhr gering und nehmt Rücksicht auf die Nachbarn unter euch — vermeidet schwere Schritte und das Rücken von Möbeln.",
      ),
    },
    {
      q: T("Can I have visitors?", "Mag ik bezoek ontvangen?", "Puis-je recevoir des visiteurs ?", "¿Puedo recibir visitas?", "Darf ich Besuch empfangen?"),
      a: T(
        "Day visitors are welcome. Overnight guests must be declared in advance — a maximum of 4 guests are permitted to stay overnight. No parties or events.",
        "Bezoekers overdag zijn welkom. Overnachtende gasten moeten vooraf gemeld worden — maximaal 4 gasten mogen blijven overnachten. Geen feesten of evenementen.",
        "Les visiteurs en journée sont les bienvenus. Les invités qui passent la nuit doivent être déclarés à l'avance — un maximum de 4 personnes peuvent dormir sur place. Pas de fêtes ni d'événements.",
        "Las visitas de día son bienvenidas. Los huéspedes que pernocten deben declararse con antelación — se permite un máximo de 4 personas para dormir. No se permiten fiestas ni eventos.",
        "Tagesbesucher sind willkommen. Übernachtungsgäste müssen im Voraus angemeldet werden — maximal 4 Gäste dürfen übernachten. Keine Partys oder Veranstaltungen.",
      ),
    },
    {
      q: T("What does the apartment include?", "Wat is er allemaal in het appartement?", "Que comprend l'appartement ?", "¿Qué incluye el apartamento?", "Was bietet die Wohnung?"),
      a: T(
        "Two bedrooms each with a private bathroom, living room, fully equipped kitchen, terrace with Scheldt views, and underground parking (bikes welcome). Towels and bedding are provided.",
        "Twee slaapkamers met elk een eigen badkamer, een woonkamer, een volledig uitgeruste keuken, een terras met zicht op de Schelde en ondergronds parkeren (fietsen welkom). Handdoeken en bedlinnen zijn voorzien.",
        "Deux chambres avec chacune sa salle de bain, un salon, une cuisine entièrement équipée, une terrasse avec vue sur l'Escaut et un parking souterrain (vélos bienvenus). Les serviettes et le linge de lit sont fournis.",
        "Dos dormitorios, cada uno con baño privado, salón, cocina totalmente equipada, terraza con vistas al Escalda y aparcamiento subterráneo (bicicletas bienvenidas). Se proporcionan toallas y ropa de cama.",
        "Zwei Schlafzimmer mit jeweils eigenem Bad, ein Wohnzimmer, eine voll ausgestattete Küche, eine Terrasse mit Blick auf die Schelde und ein Tiefgaragenplatz (Fahrräder willkommen). Handtücher und Bettwäsche sind vorhanden.",
      ),
    },
  ],
};

// window.APARTMENT resolves to the current language on every access.
Object.defineProperty(window, 'APARTMENT', {
  configurable: true,
  get() { return localize(APARTMENT_RAW, window.currentLang || 'en'); },
});

function buildSystemPrompt() {
  const A = window.APARTMENT;
  return `You are the AI Concierge for ${A.name}, a holiday apartment in Ghent, Belgium. Be warm, helpful, and concise. Reply in the guest's language. Keep answers short (2–4 sentences) unless asked for detail.

# APARTMENT
Address: ${A.address} | Host: ${A.hosts}
Check-in: ${A.checkIn} | Check-out: ${A.checkOut}
Layout: ${A.howThings.layout}

# WIFI
Network: ${A.wifi.network} | Password: ${A.wifi.password}

# HOUSE RULES
${A.rules.map((r) => "- " + r).join("\n")}

# HOW THINGS WORK
${Object.entries(A.howThings).map(([k, v]) => `${k}: ${v}`).join("\n")}

# EMERGENCIES
EU: ${A.emergency.eu} | Police: ${A.emergency.police} | Doctor: ${A.emergency.doctorOnCall}
Pharmacy: ${A.emergency.pharmacy} | Hospital: ${A.emergency.hospital}
Taxi: ${A.taxi.phone1} / ${A.taxi.phone2}

# TRANSPORT
${A.transport.bus}
Day ticket: ${A.transport.dayTicket}

# NEARBY
${A.neighborhood.map((n) => `- ${n.kind}: ${n.name} (${n.dist}) — ${n.note}`).join("\n")}

# GHENT — HIGHLIGHTS
${A.ghent.mustSee.map((s) => `- ${s.name}: ${s.note}`).join("\n")}
${A.ghent.hidden.map((s) => `- ${s.name}: ${s.note}`).join("\n")}

# TOURS
${A.tours.map((t) => `- ${t.name} (${t.duration}, ${t.price}): ${t.note}`).join("\n")}

# CONTACT
Owners: Luc Browaeys | WhatsApp: ${A.contact.whatsapp} | Tom: ${A.contact.phone2} | Email: ${A.contact.email}
Response time: ${A.contact.responseTime}

# RULES
- Only use information above. If uncertain, say so and suggest contacting the host.
- Never invent prices, hours, or facts.
- Sound like a helpful local friend, not a brochure.`;
}

window.APARTMENT_RAW = APARTMENT_RAW;
window.buildSystemPrompt = buildSystemPrompt;
