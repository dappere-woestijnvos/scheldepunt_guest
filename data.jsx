// Apartment-specific data. All values are PLACEHOLDERS the owner can edit.
// Used both by section content and by the AI Concierge system prompt.

const APARTMENT = {
  name: "Scheldepunt",
  tagline: "A two-bedroom on the canal",
  address: "Kraanlei 14, 9000 Gent, Belgium",
  district: "Patershol",
  hosts: "Lien & Mathias De Smet",

  checkIn: "From 15:00",
  checkOut: "Until 11:00",
  selfCheckIn: "Keybox to the left of the door · code sent the morning of arrival",

  // Paste your Anthropic API key here to enable the AI Concierge.
  // Leave empty to disable (guests will be directed to contact you directly).
  apiKey: "",

  wifi: {
    network: "Scheldepunt_2G",
    password: "patershol-1274",
    note: "5 GHz available on the same password — add _5G",
  },

  contact: {
    owner: "Lien De Smet",
    whatsapp: "+32 478 21 04 33",
    email: "hello@scheldepunt.be",
    responseTime: "We typically reply within 2 hours, 08:00 – 22:00 CET",
  },

  emergency: {
    eu: "112",
    police: "101",
    pharmacy: "Apotheek Vrijdagmarkt — Vrijdagmarkt 5, open until 18:30",
    hospital: "AZ Sint-Lucas — Groenebriel 1, 1.4 km",
    doctorOnCall: "1733",
  },

  rules: [
    "No smoking anywhere inside, including the balcony",
    "Quiet between 22:00 and 08:00 — the neighbours are close",
    "Maximum four guests overnight, no events or parties",
    "Pets welcome with a note in advance",
    "Shoes off in the bedrooms, please — old oak floors",
  ],

  howThings: {
    heating: "Nest thermostat in the hallway. Set to 19°C — we cover the gas. Underfloor heating in the bathroom takes ~40 min to warm up.",
    trash: "Blue bag = PMD (plastic, metal, drinks). White bag = residual. Glass goes to the green container on the corner of Sluizeken. Collection Tuesday morning.",
    keys: "Two sets in the ceramic dish by the door. If you lose them, message us — €75 replacement fee.",
    tv: "Telenet remote, TV button then '1' for VRT, '5' for Eén. Netflix on the home screen — sign in with your own account.",
    laundry: "Washer in the bathroom cupboard. Pods in the wicker basket. Drying rack behind the door — no tumble dryer.",
    coffee: "Bialetti moka pot, beans in the green tin from Or Coffee around the corner. Grinder is the small black thing on the shelf.",
    parking: "Blue zone street parking — free for residents only. Use Indigo Vrijdagmarkt (3 min walk) at €18/day, or P+R Gentbrugge with free tram (20 min).",
  },

  ghent: {
    mustSee: [
      { name: "Gravensteen", note: "The 12th-century castle. Buy tickets online to skip the queue. Climb to the ramparts at sunset." },
      { name: "St Bavo's Cathedral", note: "Home of the Van Eyck altarpiece. Book the 'Mystic Lamb' AR tour — it is genuinely worth it." },
      { name: "Graslei & Korenlei", note: "The medieval guild houses facing each other across the Leie. Best light is an hour before sunset." },
      { name: "STAM Museum", note: "The city's biography, told on a giant aerial-photo floor. Skip if short on time." },
      { name: "Patershol", note: "You live here. Wander the alleys after dinner when the lamps come on." },
    ],
    hidden: [
      { name: "Het Achterhuis", note: "A walled garden behind a 17th-century almshouse on Lange Steenstraat. Free, never busy." },
      { name: "Café Labath", note: "Single-origin coffee on Oude Houtlei. The locals' alternative to the tourist spots." },
      { name: "Dok Noord", note: "A former shipyard turned food hall and weekend market. Take tram 1 north." },
      { name: "Boekentoren rooftop", note: "Henry van de Velde's library tower. Free entry to the panoramic terrace on weekday afternoons." },
    ],
    bestTimes: "Mornings before 10 are yours — the day-trippers arrive on the 11:15 train from Brussels. Sundays are calmest. Friday evenings the Vrijdagmarkt fills with locals.",
  },

  neighborhood: [
    { kind: "Bakery", name: "Himschoot", dist: "240 m", note: "Sourdough since 1880. Cash preferred. Closes at 18:00." },
    { kind: "Supermarket", name: "Carrefour Express", dist: "180 m", note: "Sluizekenkaai. Open 7:00–22:00 every day." },
    { kind: "Coffee", name: "Or Coffee Roasters", dist: "350 m", note: "Best flat white in the city. Their beans are in your kitchen." },
    { kind: "Restaurant", name: "Le Baan Thai", dist: "120 m", note: "On your street. Book ahead — tiny dining room." },
    { kind: "Restaurant", name: "Café Theatre", dist: "500 m", note: "Belgian classics, white tablecloths, fair prices." },
    { kind: "Bar", name: "'t Dreupelkot", dist: "450 m", note: "215 kinds of jenever. The owner will choose for you." },
    { kind: "Market", name: "Vrijdagmarkt", dist: "300 m", note: "Friday morning food + flowers, Saturday flea." },
    { kind: "Specialty", name: "Tierenteyn-Verlent", dist: "550 m", note: "Mustard from a wooden barrel. A Ghent ritual." },
  ],

  tours: [
    { name: "Canal boat — De Bootjes van Gent", duration: "40 min", price: "€10", note: "Leaves from Korenlei every 20 min. Buy tickets at the dock." },
    { name: "Free Walking Tour", duration: "2.5 h", price: "Tip-based", note: "Daily 10:30 and 14:30 from St Bavo's. Look for the green umbrella." },
    { name: "Beer + Belgian Food Tour", duration: "3 h", price: "€75", note: "Small groups, six tastings. Book via Vizit Ghent." },
    { name: "Bruges day trip", duration: "Full day", price: "€19 return", note: "Direct train, 25 min. Go early; the medieval centre is best before the tour buses." },
    { name: "Bike the Lys", duration: "Half day", price: "€15", note: "Rent at Biker, cycle the river path to Sint-Martens-Latem. Flat, mostly car-free." },
  ],
};

// Compose the system prompt used by the AI concierge from the same data.
function buildSystemPrompt() {
  const A = APARTMENT;
  return `You are the AI Concierge for ${A.name}, a holiday apartment in the Patershol quarter of Ghent, Belgium. Your role is to be a warm, knowledgeable local host — helpful, concise, and genuinely fond of the city. Reply in the guest's language. Keep answers short by default (2–4 sentences) unless asked for detail.

# APARTMENT
Name: ${A.name}
Address: ${A.address}
Neighbourhood: ${A.district}
Hosts: ${A.hosts}

Check-in: ${A.checkIn}
Check-out: ${A.checkOut}
Access: ${A.selfCheckIn}

# WIFI
Network: ${A.wifi.network}
Password: ${A.wifi.password}
${A.wifi.note}

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

# EMERGENCY
Europe-wide: ${A.emergency.eu}
Police: ${A.emergency.police}
Doctor on call: ${A.emergency.doctorOnCall}
Nearest pharmacy: ${A.emergency.pharmacy}
Nearest hospital: ${A.emergency.hospital}

# NEARBY (walking distance)
${A.neighborhood.map((n) => `- ${n.kind} — ${n.name} (${n.dist}): ${n.note}`).join("\n")}

# GHENT — MUST-SEE
${A.ghent.mustSee.map((s) => `- ${s.name}: ${s.note}`).join("\n")}

# GHENT — HIDDEN GEMS
${A.ghent.hidden.map((s) => `- ${s.name}: ${s.note}`).join("\n")}

Best times to visit attractions: ${A.ghent.bestTimes}

# TOURS & DAY TRIPS
${A.tours.map((t) => `- ${t.name} (${t.duration}, ${t.price}): ${t.note}`).join("\n")}

# CONTACT
Owner: ${A.contact.owner}
WhatsApp: ${A.contact.whatsapp}
Email: ${A.contact.email}
Response time: ${A.contact.responseTime}

# RULES OF ENGAGEMENT
- Use ONLY the information above. If the guest asks something you do not know — restaurant openings tonight, a specific shop's stock, today's weather, anything time-sensitive — say so politely and suggest the Contact Owner form or messaging Lien on WhatsApp.
- Never invent prices, opening hours, or facts not stated above.
- Sound like a friend who lives here, not a brochure. Drop the marketing voice.
- If asked about something outside Ghent or travel, answer briefly but steer back to the stay.
- Always be honest about uncertainty.`;
}

window.APARTMENT = APARTMENT;
window.buildSystemPrompt = buildSystemPrompt;
