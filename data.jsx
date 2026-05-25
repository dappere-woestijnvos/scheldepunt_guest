// Apartment-specific data. Edit this file to update both the UI and the AI Concierge.

function mapsUrl(query) {
  return 'https://maps.google.com/maps?q=' + encodeURIComponent(query);
}

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
    { kind: "Bakery", name: "Bakkerij Martens", dist: "400 m", note: "Tentoonstellingslaan 108. Walk to the bridge, climb the stairs, cross to the other side of the street.", mapsUrl: mapsUrl("Bakkerij Martens, Tentoonstellingslaan 108, Gent") },
    { kind: "Bakery", name: "Bakkerij Mertens", dist: "750 m", note: "François Benardstraat 4. Walk past the Kinépolis crossroads, turn right.", mapsUrl: mapsUrl("Bakkerij Mertens, François Benardstraat 4, Gent") },
    { kind: "Bakery", name: "De Superette", dist: "1.4 km", note: "Guldenspoorstraat 29. Artisanal sourdough and grill by chef Kobe Desramaults.", mapsUrl: mapsUrl("De Superette, Guldenspoorstraat 29, Gent") },
    { kind: "Supermarket", name: "Proxy Delhaize Heuvelpoort", dist: "750 m", note: "Ottergemsesteenweg 2. Walk to bridge, take stairs, turn left at the first traffic lights.", mapsUrl: mapsUrl("Proxy Delhaize Heuvelpoort, Ottergemsesteenweg 2, Gent") },
    { kind: "Supermarket", name: "Carrefour Express", dist: "—", note: "Zwijnaardsesteenweg 68, Gent.", mapsUrl: mapsUrl("Carrefour Express, Zwijnaardsesteenweg 68, Gent") },
    { kind: "Restaurant", name: "Jilles Beer en Burgers", dist: "600 m", note: "Tentoonstellingslaan 165. Gourmet beef, veggie & chicken burgers — www.jilles.be", mapsUrl: mapsUrl("Jilles Beer en Burgers, Tentoonstellingslaan 165, Gent") },
    { kind: "Restaurant", name: "Jour de fête", dist: "750 m", note: "Gustaaf Callierlaan 233. Seasonal Belgian-Mediterranean cuisine. www.restaurantjourdefete.be", mapsUrl: mapsUrl("Jour de fête, Gustaaf Callierlaan 233, Gent") },
    { kind: "Restaurant", name: "La Dolce Vita", dist: "600 m", note: "Ter Plaeten 2. Walk along the water past the Kinépolis. restoladolcevita.be", mapsUrl: mapsUrl("La Dolce Vita, Ter Plaeten 2, Gent") },
    { kind: "Restaurant", name: "Bavet", dist: "650 m", note: "Muinkkaal 120. Fast-casual spaghetti, new-wave Belgian. www.bavet.eu", mapsUrl: mapsUrl("Bavet, Muinkkaal 120, Gent") },
    { kind: "Restaurant", name: "Spring!", dist: "600 m", note: "Tentoonstellingslaan 125. Creative seasonal cooking. www.spring.gent", mapsUrl: mapsUrl("Spring!, Tentoonstellingslaan 125, Gent") },
    { kind: "Restaurant", name: "Casa Di Batavia", dist: "800 m", note: "François Benardstraat 80. Take-away Indonesian food. www.casadibatavia.com", mapsUrl: mapsUrl("Casa Di Batavia, François Benardstraat 80, Gent") },
    { kind: "Pub", name: "De Brouwerszaele", dist: "500 m", note: "Ter Plaeten 17, 9000 Gent.", mapsUrl: mapsUrl("De Brouwerszaele, Ter Plaeten 17, Gent") },
    { kind: "Pub", name: "Kaffee De Plank", dist: "500 m", note: "Ter Plaeten 10A, 9000 Gent.", mapsUrl: mapsUrl("Kaffee De Plank, Ter Plaeten 10A, Gent") },
    { kind: "Pub", name: "Cocktail Hollywood", dist: "600 m", note: "Ter Plaeten 3, 9000 Gent.", mapsUrl: mapsUrl("Cocktail Hollywood, Ter Plaeten 3, Gent") },
    { kind: "Pub", name: "Sunset", dist: "500 m", note: "François Benardstraat 2, 9000 Gent.", mapsUrl: mapsUrl("Sunset bar, François Benardstraat 2, Gent") },
    { kind: "Pub", name: "Overpoort", dist: "—", note: "The main student café street in Ghent — lively every evening.", mapsUrl: mapsUrl("Overpoort student bars, Gent") },
    { kind: "Cinema", name: "Kinépolis", dist: "500 m", note: "Ter Plaeten 12. Large multiplex cinema, 5 min walk.", mapsUrl: mapsUrl("Kinepolis Gent, Ter Plaeten 12") },
    { kind: "Pharmacy", name: "Leveugle", dist: "—", note: "Franklin Rooseveltlaan 505, 9000 Gent.", mapsUrl: mapsUrl("Apotheek Leveugle, Franklin Rooseveltlaan 505, Gent") },
    { kind: "Laundry", name: "WASBAR", dist: "—", note: "Nederkouter 109, Gent.", mapsUrl: mapsUrl("WASBAR, Nederkouter 109, Gent") },
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

  // FAQ — edit questions and answers here
  faq: [
    {
      q: "What time is check-in and check-out?",
      a: "Check-in is from 14:00. Check-out is before 10:00. If you need a different arrangement, please contact us in advance.",
    },
    {
      q: "Is there parking available?",
      a: "Yes, free parking is available at the entrance of the building's car park. Please do not park on the entrance itself to allow manoeuvring. We are not responsible for damage to vehicles.",
    },
    {
      q: "Are pets allowed?",
      a: "Unfortunately pets are not allowed in the apartment.",
    },
    {
      q: "Can I smoke in the apartment?",
      a: "Smoking is strictly forbidden inside the apartment and in all common areas. You may smoke on the terrace only.",
    },
    {
      q: "How do I access the apartment?",
      a: "A key will be provided at check-in. A deposit is charged at check-in and returned at checkout if the apartment is left in good condition.",
    },
    {
      q: "Is there a washing machine?",
      a: "There is no washing machine in the apartment. Several laundromats are nearby: WASBAR (Nederkouter 109), VAN DEN HEEDE (Overpoort 20), MAVZER BILAL (Ledebergstraat 17, Ledeberg).",
    },
    {
      q: "How do I get to the city centre?",
      a: "Walk via Ter Plaeten to the Plaetenbrug and take bus 58, 70, 71, 72, 76, 77 or 78 towards Ghent South. Buses run every 7 minutes. A day ticket costs €7.50.",
    },
    {
      q: "What is the WiFi password?",
      a: "Network: telenet F5DDF — Password: SyBBm0R4XHPP. Tap the Wifi tab for a tap-to-copy version.",
    },
    {
      q: "Who do I contact in case of a problem?",
      a: "Contact Luc Browacys: +32 468 12 29 12 (phone/WhatsApp) or lubro@telenet.be. For urgent matters, Tony is also reachable at +32 496 534 160. We typically reply within a few hours.",
    },
    {
      q: "Is there a noise policy?",
      a: "Please keep noise to a minimum between 22:00 and 07:00, and be mindful of the neighbours below — avoid heavy footsteps and dragging furniture.",
    },
    {
      q: "Can I have visitors?",
      a: "Day visitors are welcome. Overnight guests must be declared in advance — a maximum of 4 guests are permitted to stay overnight. No parties or events.",
    },
  ],
};

function buildSystemPrompt() {
  const A = APARTMENT;
  return `You are the AI Concierge for ${A.name}, a holiday apartment in Ghent, Belgium. Be warm, helpful, and concise. Reply in the guest's language. Keep answers short (2–4 sentences) unless asked for detail.

# APARTMENT
Address: ${A.address} | Host: ${A.hosts}
Check-in: ${A.checkIn} | Check-out: ${A.checkOut}

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
Host: ${A.contact.owner} | WhatsApp: ${A.contact.whatsapp} | Email: ${A.contact.email}
Response time: ${A.contact.responseTime}

# RULES
- Only use information above. If uncertain, say so and suggest contacting the host.
- Never invent prices, hours, or facts.
- Sound like a helpful local friend, not a brochure.`;
}

window.APARTMENT = APARTMENT;
window.buildSystemPrompt = buildSystemPrompt;
