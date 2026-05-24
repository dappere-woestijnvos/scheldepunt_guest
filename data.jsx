// Apartment-specific data. Edit this file to update both the UI and the AI Concierge.

const APARTMENT = {
  name: "Scheldepunt",
  tagline: "Appartement 6.2 — by the Schelde",
  address: "Ter Plaeten 99, 9000 Gent, Belgium",
  district: "Ter Plaeten",
  hosts: "Luc Browacys",

  checkIn: "From 14:00",
  checkOut: "Until 10:00",
  selfCheckIn: "Key provided at check-in — deposit charged and returned at checkout",

  // Paste your Anthropic API key here to enable the AI Concierge.
  // Leave empty to disable (guests will be directed to contact you directly).
  apiKey: "",

  welcomeText: "We are so glad you are here. Make yourself at home — the wifi code is on the next page, the whole city is at your doorstep, and the Schelde is right outside your window.",

  wifi: {
    network: "telenet F5DDF",
    password: "SyBBm0R4XHPP",
    note: "",
  },

  contact: {
    owner: "Luc Browacys",
    whatsapp: "+32 468 12 29 12",
    email: "lubro@telenet.be",
    responseTime: "We typically reply within a few hours. Urgent matters: also reachable via Tony at +32 496 534 160",
  },

  emergency: {
    eu: "112",
    police: "101",
    ambulance: "100",
    pharmacy: "Leveugle — Franklin Rooseveltlaan 505, 9000 Gent",
    hospital: "Dial 112 — they will direct you to the nearest hospital",
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
    "Smoking is forbidden inside the apartment and in all common areas. Smoking is only permitted on the terrace.",
    "Pets are not allowed.",
    "Check-in is after 14:00. Check-out is before 10:00. A deposit is charged at check-in and returned at checkout if the apartment is left in good condition.",
    "Quiet between 22:00 and 07:00 — please respect the neighbours below (avoid heels indoors and dragging chairs).",
    "Entrance doors inside must always be closed — do not lock with the night lock.",
    "Free parking is available at the car park. Do not park on the entrance itself. We are not responsible for damage to vehicles.",
    "No BBQs, open fires, or flammable/explosive materials are permitted on balconies or anywhere in the building.",
  ],

  howThings: {
    heating: "Ask the host for instructions on the heating system.",
    trash: "Ask the host for trash collection and recycling instructions specific to the building.",
    keys: "A deposit is charged at check-in and returned at checkout if the apartment is left in good condition. Please return all keys at checkout.",
    tv: "Ask the host for TV and streaming instructions.",
    laundry: "Nearby laundromats: WASBAR (Nederkouter 109, Gent) · VAN DEN HEEDE (Overpoort 20, Gent) · MAVZER BILAL (Ledebergstraat 17, Ledeberg) · GREEN AND ACTIVE SOLUTIONS (Ossenstraat 20, Gent).",
    coffee: "Ask the host for coffee machine instructions.",
    parking: "Free parking at the car park entrance of the building. Do not park on the entrance itself to allow manoeuvring. We are not responsible for damage to vehicles.",
  },

  ghent: {
    mustSee: [
      { name: "Gravensteen", note: "The 12th-century castle in the heart of the city. Buy tickets online to skip the queue. Climb to the ramparts at sunset." },
      { name: "St Bavo's Cathedral", note: "Home of the Van Eyck altarpiece 'The Adoration of the Mystic Lamb'. Book ahead for the dedicated exhibition room — genuinely unmissable." },
      { name: "Graslei & Korenlei", note: "The medieval guild houses facing each other across the Leie. Best photographed in the golden hour before sunset." },
      { name: "STAM Museum", note: "The city's biography told on a giant aerial-photo floor map. Good for context on your first day." },
      { name: "Patershol", note: "The cobblestoned medieval quarter near the castle. Wander the alleys after dinner when the lamps come on." },
    ],
    hidden: [
      { name: "Het Achterhuis", note: "A walled garden behind a 17th-century almshouse on Lange Steenstraat. Free entry, almost never busy." },
      { name: "Dok Noord", note: "A former shipyard turned food hall and weekend market. Take tram 1 north — worth the trip." },
      { name: "Boekentoren", note: "Henry van de Velde's library tower. Free entry to the panoramic terrace on weekday afternoons." },
      { name: "Vrijdagmarkt", note: "The historic market square. Friday morning for fresh food and flowers, Saturday for the flea market." },
    ],
    bestTimes: "Mornings before 10 are quietest — the day-trippers arrive on the 11:15 train from Brussels. Sundays are calm. See www.visitgent.be for events and what's on.",
  },

  neighborhood: [
    { kind: "Bakery", name: "Bakkerij Martens", dist: "400 m", note: "Tentoonstellingslaan 108. Walk to the bridge, climb the stairs, cross to the other side of the street." },
    { kind: "Bakery", name: "Bakkerij Mertens", dist: "750 m", note: "François Benardstraat 4. Walk past the Kinépolis crossroads, turn right." },
    { kind: "Bakery", name: "De Superette", dist: "1.4 km", note: "Guldenspoorstraat 29. Artisanal sourdough and grill by chef Kobe Desramaults (De Wulf). Worth the walk." },
    { kind: "Supermarket", name: "Proxy Delhaize Heuvelpoort", dist: "750 m", note: "Ottergemsesteenweg 2. Walk to the bridge, take the stairs, turn left at the first traffic lights. 100m further." },
    { kind: "Supermarket", name: "Carrefour Express", dist: "—", note: "Zwijnaardsesteenweg 68, Gent." },
    { kind: "Restaurant", name: "Jilles Beer en Burgers", dist: "600 m", note: "Tentoonstellingslaan 165. Gourmet beef, veggie & chicken burgers paired with Belgian beers. www.jilles.be" },
    { kind: "Restaurant", name: "Jour de fête", dist: "750 m", note: "Gustaaf Callierlaan 233. Seasonal Belgian-Mediterranean cuisine, fresh ingredients, two veggie options always on the menu. www.restaurantjourdefete.be" },
    { kind: "Restaurant", name: "La Dolce Vita", dist: "600 m", note: "Ter Plaeten 2. Walk along the water past the Kinépolis, just before the intersection. https://restoladolcevita.be" },
    { kind: "Restaurant", name: "Bavet", dist: "650 m", note: "Muinkkaal 120. Fast-casual spaghetti concept — new-wave Belgian. www.bavet.eu" },
    { kind: "Restaurant", name: "Spring!", dist: "600 m", note: "Tentoonstellingslaan 125. Creative seasonal cooking. www.spring.gent" },
    { kind: "Restaurant", name: "Casa Di Batavia", dist: "800 m", note: "François Benardstraat 80. Take-away Indonesian food. www.casadibatavia.com" },
    { kind: "Pub", name: "De Brouwerszaele", dist: "500 m", note: "Ter Plaeten 17, 9000 Gent." },
    { kind: "Pub", name: "Kaffee De Plank", dist: "500 m", note: "Ter Plaeten 10A, 9000 Gent." },
    { kind: "Pub", name: "Cocktail Hollywood", dist: "600 m", note: "Ter Plaeten 3, 9000 Gent." },
    { kind: "Pub", name: "Sunset", dist: "500 m", note: "François Benardstraat 2, 9000 Gent." },
    { kind: "Pub", name: "Overpoort", dist: "—", note: "The main student café street in Ghent — lively every evening." },
    { kind: "Cinema", name: "Kinépolis", dist: "500 m", note: "Ter Plaeten 12. Large multiplex cinema, 5 min walk." },
    { kind: "Pharmacy", name: "Leveugle", dist: "—", note: "Franklin Rooseveltlaan 505, 9000 Gent." },
    { kind: "Laundry", name: "WASBAR", dist: "—", note: "Nederkouter 109, Gent." },
  ],

  tours: [
    { name: "Canal boat — De Bootjes van Gent", duration: "40 min", price: "€10", note: "Leaves from Korenlei every 20 min. Buy tickets at the dock. The best way to see the medieval waterfront." },
    { name: "Free Walking Tour", duration: "2.5 h", price: "Tip-based", note: "Daily at 10:30 and 14:30 from St Bavo's. Look for the guide with the green umbrella." },
    { name: "Beer + Belgian Food Tour", duration: "3 h", price: "€75", note: "Small groups, six tastings. Book via Vizit Ghent." },
    { name: "Bruges day trip", duration: "Full day", price: "€19 return", note: "Direct train, 25 min. Go early — the medieval centre is best before the tour buses arrive." },
    { name: "Bike the Lys", duration: "Half day", price: "€15", note: "Rent at Biker, cycle the river path to Sint-Martens-Latem. Flat and mostly car-free." },
  ],

  toursHostNote: "For any tips or help booking activities, just ask via the contact page or WhatsApp. The free walking tour is genuinely the best introduction to the city.",

  transport: {
    bus: "Walk via Ter Plaeten to the Plaetenbrug. Take bus 58, 70, 71, 72, 76, 77 or 78 towards Ghent South (every 7 minutes).",
    dayTicket: "€7.50 (12+ years). Buy at a ticket machine, Lijnwinkel store, De Lijn app, or text DLD to 4884 (+€0.15 operator charge). Valid 24 hours. Children 6–11 years: €4.",
  },
};

// Compose the system prompt used by the AI concierge from the same data.
function buildSystemPrompt() {
  const A = APARTMENT;
  return `You are the AI Concierge for ${A.name}, a holiday apartment in Ghent, Belgium. Your role is to be a warm, knowledgeable local host — helpful, concise, and genuinely fond of the city. Reply in the guest's language. Keep answers short by default (2–4 sentences) unless asked for detail.

# APARTMENT
Name: ${A.name}
Address: ${A.address}
District: ${A.district}
Host: ${A.hosts}

Check-in: ${A.checkIn}
Check-out: ${A.checkOut}
Access: ${A.selfCheckIn}

# WIFI
Network: ${A.wifi.network}
Password: ${A.wifi.password}

# HOUSE RULES
${A.rules.map((r) => "- " + r).join("\n")}

# HOW THINGS WORK
Heating: ${A.howThings.heating}
Trash & recycling: ${A.howThings.trash}
Keys: ${A.howThings.keys}
TV: ${A.howThings.tv}
Laundry: ${A.howThings.laundry}
Coffee: ${A.howThings.coffee}
Parking: ${A.howThings.parking}

# EMERGENCY NUMBERS
European emergency: ${A.emergency.eu}
Ambulance: ${A.emergency.ambulance}
Police: ${A.emergency.police}
Flemish Red Cross: ${A.emergency.flemishRedCross}
Doctors on call: ${A.emergency.doctorOnCall}
Dentists on call: ${A.emergency.dentistOnCall}
Poison Control: ${A.emergency.poisonControl}
Card Stop (lost bank card): ${A.emergency.cardStop}
Info Ghent: ${A.emergency.infoGhent}
Nearest pharmacy: ${A.emergency.pharmacy}
Hospital: ${A.emergency.hospital}

# TAXI
${A.taxi.phone1} · ${A.taxi.phone2} · ${A.taxi.website}

# PUBLIC TRANSPORT
${A.transport.bus}
Day ticket: ${A.transport.dayTicket}

# NEARBY (walking distance)
${A.neighborhood.map((n) => `- ${n.kind} — ${n.name} (${n.dist}): ${n.note}`).join("\n")}

# GHENT — MUST-SEE
${A.ghent.mustSee.map((s) => `- ${s.name}: ${s.note}`).join("\n")}

# GHENT — HIDDEN GEMS
${A.ghent.hidden.map((s) => `- ${s.name}: ${s.note}`).join("\n")}

Best times: ${A.ghent.bestTimes}

# TOURS & DAY TRIPS
${A.tours.map((t) => `- ${t.name} (${t.duration}, ${t.price}): ${t.note}`).join("\n")}

# CONTACT
Host: ${A.contact.owner}
Phone/WhatsApp: ${A.contact.whatsapp}
Email: ${A.contact.email}
Response time: ${A.contact.responseTime}

# RULES OF ENGAGEMENT
- Use ONLY the information above. If the guest asks something you do not know — restaurant openings tonight, today's weather, anything time-sensitive — say so honestly and suggest contacting the host directly.
- Never invent prices, opening hours, or facts not stated above.
- Sound like a helpful local friend, not a brochure.
- Always be honest about uncertainty.`;
}

window.APARTMENT = APARTMENT;
window.buildSystemPrompt = buildSystemPrompt;
