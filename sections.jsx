// ─── Shared layout ───────────────────────────────────────────
const { useState, useEffect, useRef } = React;

const Page = ({ children }) => (
  <div style={{ padding: "0 22px 120px", minHeight: "100%" }}>{children}</div>
);

const PageHeader = ({ no, eyebrow, title, italic }) => (
  <div style={{ paddingTop: 22, paddingBottom: 18 }}>
    <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span>{no}</span>
      <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
      <span>{eyebrow}</span>
    </div>
    <h1 className="serif" style={{
      fontSize: 38, lineHeight: 1.02, margin: "14px 0 0",
      letterSpacing: "-0.015em", color: "var(--ink)",
      textWrap: "balance",
    }}>
      {title} {italic && <span className="serif-i">{italic}</span>}
    </h1>
  </div>
);

const Pill = ({ children, tone = "ink" }) => {
  const tones = {
    ink: { bg: "transparent", fg: "var(--ink)", border: "var(--ink)" },
    terra: { bg: "var(--terra)", fg: "var(--paper)", border: "var(--terra)" },
    moss: { bg: "var(--moss)", fg: "var(--paper)", border: "var(--moss)" },
    paper: { bg: "var(--paper)", fg: "var(--ink)", border: "var(--rule)" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px",
      border: `1px solid ${t.border}`, background: t.bg, color: t.fg,
      fontFamily: "Geist Mono, monospace", fontSize: 10.5,
      letterSpacing: "0.12em", textTransform: "uppercase",
      borderRadius: 0,
    }}>{children}</span>
  );
};

// ─── 1. WELCOME ──────────────────────────────────────────────
const WelcomeSection = ({ go }) => {
  const A = window.APARTMENT;
  return (
    <Page>
      <div style={{ paddingTop: 18 }}>
        <div className="eyebrow" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>№ 01 · Welcome</span>
          <span>Gent · BE</span>
        </div>
      </div>

      {/* Editorial masthead */}
      <div style={{ marginTop: 16 }}>
        <div className="serif-i" style={{ fontSize: 22, color: "var(--terra-deep)", lineHeight: 1 }}>
          welcome to
        </div>
        <h1 className="serif" style={{
          fontSize: 76, lineHeight: 0.92, margin: "4px 0 0",
          letterSpacing: "-0.03em", color: "var(--ink)",
        }}>
          Schelde<br/><span className="serif-i" style={{ color: "var(--moss)" }}>punt</span>
        </h1>
        <div style={{ marginTop: 10, fontSize: 14, color: "var(--ink-soft)", maxWidth: 320 }}>
          {A.tagline} · {A.district}
        </div>
      </div>

      {/* Hero image slot */}
      <div style={{ marginTop: 22, position: "relative" }}>
        <image-slot
          id="welcome-hero"
          shape="rect"
          placeholder="Apartment photo · 3:4"
          style={{ width: "100%", aspectRatio: "3 / 4", display: "block" }}
        />
        <div style={{
          position: "absolute", left: -4, top: -4,
          padding: "4px 8px", background: "var(--ink)", color: "var(--paper)",
          fontFamily: "Geist Mono, monospace", fontSize: 10,
          letterSpacing: "0.15em", textTransform: "uppercase",
        }}>Plate I</div>
      </div>

      {/* Intro */}
      <p className="serif" style={{
        fontSize: 22, lineHeight: 1.35, margin: "28px 0 0",
        color: "var(--ink)", letterSpacing: "-0.005em",
        textWrap: "pretty",
      }}>
        We are so glad you are here. Make yourself at home —
        the coffee is in the green tin, the wifi is on the next page,
        and the cathedral bells will be your alarm clock.
      </p>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 10 }}>
        — {A.hosts}
      </p>

      <hr className="rule" style={{ margin: "26px 0" }} />

      {/* Check in/out */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div className="eyebrow">Check-in</div>
          <div className="serif" style={{ fontSize: 28, marginTop: 4 }}>{A.checkIn}</div>
        </div>
        <div>
          <div className="eyebrow">Check-out</div>
          <div className="serif" style={{ fontSize: 28, marginTop: 4 }}>{A.checkOut}</div>
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
        {A.selfCheckIn}
      </div>

      <hr className="rule" style={{ margin: "26px 0" }} />

      {/* Quick links */}
      <div className="eyebrow" style={{ marginBottom: 12 }}>Start here</div>
      <div style={{ display: "grid", gap: 1, background: "var(--rule)" }}>
        {[
          { k: "wifi", t: "Wifi & practical info", sub: "Network, codes, emergencies" },
          { k: "apartment", t: "How the apartment works", sub: "Heating, trash, TV, laundry" },
          { k: "ghent", t: "Ghent — the city", sub: "What we send our friends to" },
          { k: "neighborhood", t: "On this street", sub: "Bakery, coffee, dinner" },
        ].map((q) => (
          <button key={q.k} onClick={() => go(q.k)} style={{
            display: "flex", alignItems: "center", gap: 12, width: "100%",
            padding: "16px 4px", background: "var(--paper)", border: "none",
            textAlign: "left",
          }}>
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 19 }}>{q.t}</div>
              <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 2 }}>{q.sub}</div>
            </div>
            <Icon name="arrow" size={18} stroke="var(--ink)" />
          </button>
        ))}
      </div>
    </Page>
  );
};

// ─── 2. THE APARTMENT ────────────────────────────────────────
const ApartmentSection = () => {
  const A = window.APARTMENT;
  const [open, setOpen] = useState("heating");
  const items = [
    { k: "heating", t: "Heating & thermostat" },
    { k: "trash", t: "Trash & recycling" },
    { k: "keys", t: "Keys" },
    { k: "tv", t: "TV & streaming" },
    { k: "laundry", t: "Laundry" },
    { k: "coffee", t: "Coffee" },
    { k: "parking", t: "Parking" },
  ];

  return (
    <Page>
      <PageHeader no="№ 02" eyebrow="The apartment" title="House" italic="rules" />

      <ol style={{
        margin: 0, padding: 0, listStyle: "none",
        borderTop: "1px solid var(--ink)",
      }}>
        {A.rules.map((r, i) => (
          <li key={i} style={{
            display: "flex", gap: 14, padding: "14px 0",
            borderBottom: "1px solid var(--rule)",
          }}>
            <span className="mono" style={{
              fontSize: 11, color: "var(--terra)", paddingTop: 4, minWidth: 22,
            }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="serif" style={{ fontSize: 18, lineHeight: 1.35 }}>{r}</span>
          </li>
        ))}
      </ol>

      <div style={{ marginTop: 36 }}>
        <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>How things work</span>
          <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        {items.map((it) => {
          const isOpen = open === it.k;
          return (
            <div key={it.k} style={{ borderBottom: "1px solid var(--rule)" }}>
              <button onClick={() => setOpen(isOpen ? null : it.k)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "16px 0", background: "transparent",
                border: "none", textAlign: "left",
              }}>
                <span className="serif" style={{ fontSize: 20, color: isOpen ? "var(--terra)" : "var(--ink)" }}>{it.t}</span>
                <span style={{
                  fontFamily: "Geist Mono, monospace", fontSize: 18,
                  color: "var(--ink-mute)", transition: "transform .2s",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}>+</span>
              </button>
              {isOpen && (
                <div style={{
                  paddingBottom: 16, fontSize: 15, lineHeight: 1.55,
                  color: "var(--ink-soft)", maxWidth: "100%",
                }}>{A.howThings[it.k]}</div>
              )}
            </div>
          );
        })}
      </div>
    </Page>
  );
};

// ─── 3. WIFI & PRACTICAL ─────────────────────────────────────
const WifiSection = () => {
  const A = window.APARTMENT;
  const [copied, setCopied] = useState(null);
  const copy = (key, val) => {
    try { navigator.clipboard?.writeText(val); } catch (e) {}
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Page>
      <PageHeader no="№ 03" eyebrow="Practical" title="Wifi &" italic="the basics" />

      {/* Wifi card — terracotta */}
      <div style={{
        background: "var(--terra)", color: "var(--paper)",
        padding: "26px 22px", marginTop: 4,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -30, top: -30, opacity: 0.16,
        }}>
          <Icon name="wifi" size={180} stroke="var(--paper)" strokeWidth={1} />
        </div>
        <div className="eyebrow" style={{ color: "rgba(251,246,235,0.7)" }}>Internet</div>
        <div style={{ marginTop: 18, position: "relative" }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase" }}>Network</div>
          <button onClick={() => copy("net", A.wifi.network)} style={{
            display: "flex", alignItems: "center", gap: 10, marginTop: 4,
            background: "transparent", border: "none", padding: 0, color: "inherit",
          }}>
            <span className="serif" style={{ fontSize: 26, letterSpacing: "-0.01em" }}>{A.wifi.network}</span>
            <Icon name={copied === "net" ? "check" : "copy"} size={16} stroke="var(--paper)" />
          </button>
        </div>
        <div style={{ marginTop: 16, position: "relative" }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase" }}>Password</div>
          <button onClick={() => copy("pw", A.wifi.password)} style={{
            display: "flex", alignItems: "center", gap: 10, marginTop: 4,
            background: "transparent", border: "none", padding: 0, color: "inherit",
          }}>
            <span className="mono" style={{ fontSize: 22 }}>{A.wifi.password}</span>
            <Icon name={copied === "pw" ? "check" : "copy"} size={16} stroke="var(--paper)" />
          </button>
        </div>
        <div style={{ marginTop: 16, fontSize: 12, opacity: 0.8, position: "relative" }}>
          {A.wifi.note}
        </div>
      </div>

      {/* Emergency */}
      <div style={{ marginTop: 32 }}>
        <div className="eyebrow" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span>In an emergency</span>
          <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
        </div>
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--rule)" }}>
          {[
            { l: "All emergencies", v: A.emergency.eu, tel: A.emergency.eu },
            { l: "Police", v: A.emergency.police, tel: A.emergency.police },
            { l: "Doctor on call", v: A.emergency.doctorOnCall, tel: A.emergency.doctorOnCall },
            { l: "Owner WhatsApp", v: A.contact.whatsapp, tel: A.contact.whatsapp.replace(/\s/g, "") },
          ].map((e) => (
            <a key={e.l} href={`tel:${e.tel}`} style={{
              padding: "18px 14px", background: "var(--paper)", textDecoration: "none",
              color: "var(--ink)", display: "block",
            }}>
              <div className="eyebrow" style={{ fontSize: 10 }}>{e.l}</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 4 }}>{e.v}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Pharmacy + Hospital */}
      <div style={{ marginTop: 28 }}>
        <div className="eyebrow">Nearest</div>
        <div style={{ marginTop: 10, borderTop: "1px solid var(--rule)" }}>
          {[
            { l: "Pharmacy", v: A.emergency.pharmacy },
            { l: "Hospital", v: A.emergency.hospital },
          ].map((r) => (
            <div key={r.l} style={{ padding: "14px 0", borderBottom: "1px solid var(--rule)" }}>
              <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{r.l}</div>
              <div className="serif" style={{ fontSize: 18, marginTop: 2 }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

// ─── 4. GHENT CITY GUIDE ─────────────────────────────────────
const GhentSection = () => {
  const A = window.APARTMENT;
  const [tab, setTab] = useState("must");
  const list = tab === "must" ? A.ghent.mustSee : A.ghent.hidden;

  return (
    <Page>
      <PageHeader no="№ 04" eyebrow="City guide" title="Ghent," italic="slowly" />

      <p className="serif-i" style={{
        fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.45,
        marginTop: -4, maxWidth: 340,
      }}>
        {A.ghent.bestTimes}
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginTop: 22, borderBottom: "1px solid var(--ink)" }}>
        {[
          { k: "must", l: "Must-see" },
          { k: "hidden", l: "Hidden gems" },
        ].map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            flex: 1, padding: "12px 0", background: "transparent",
            border: "none", borderBottom: tab === t.k ? "2px solid var(--terra)" : "2px solid transparent",
            marginBottom: -1,
            fontFamily: "Geist, sans-serif", fontSize: 13,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: tab === t.k ? "var(--ink)" : "var(--ink-mute)",
            fontWeight: tab === t.k ? 600 : 500,
          }}>{t.l}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ marginTop: 4 }}>
        {list.map((s, i) => (
          <article key={s.name} style={{
            padding: "22px 0", borderBottom: "1px solid var(--rule)",
            display: "grid", gridTemplateColumns: "32px 1fr", gap: 12,
          }}>
            <div className="serif-i" style={{
              fontSize: 28, color: "var(--terra)", lineHeight: 1,
              paddingTop: 4,
            }}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <h3 className="serif" style={{ fontSize: 22, margin: 0, letterSpacing: "-0.01em" }}>{s.name}</h3>
              <p style={{
                margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.5,
                color: "var(--ink-soft)", textWrap: "pretty",
              }}>{s.note}</p>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
};

// ─── 5. NEIGHBORHOOD MAP & SHOPS ─────────────────────────────
const NeighborhoodSection = () => {
  const A = window.APARTMENT;
  const [filter, setFilter] = useState("All");
  const kinds = ["All", ...Array.from(new Set(A.neighborhood.map((n) => n.kind)))];
  const filtered = filter === "All" ? A.neighborhood : A.neighborhood.filter((n) => n.kind === filter);

  return (
    <Page>
      <PageHeader no="№ 05" eyebrow="On foot" title="The" italic="neighbourhood" />

      {/* Stylized map placeholder */}
      <div style={{
        position: "relative", aspectRatio: "16 / 11",
        background: "var(--cream-deep)",
        border: "1px solid var(--rule)",
        marginBottom: 22, overflow: "hidden",
      }}>
        <svg viewBox="0 0 320 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {/* Canal */}
          <path d="M -20 130 Q 80 90, 160 120 T 340 110" fill="none" stroke="#9DB6A6" strokeWidth="22" opacity="0.55" strokeLinecap="round"/>
          <path d="M -20 130 Q 80 90, 160 120 T 340 110" fill="none" stroke="#7B9C8A" strokeWidth="1" opacity="0.7"/>
          {/* Streets */}
          <g stroke="#C5B596" strokeWidth="1.2" fill="none">
            <path d="M40 0 L 60 220"/>
            <path d="M120 0 L 140 220"/>
            <path d="M210 0 L 230 220"/>
            <path d="M280 0 L 300 220"/>
            <path d="M0 60 L 320 50"/>
            <path d="M0 180 L 320 170"/>
          </g>
          {/* Blocks */}
          <g fill="#E2D5B8" opacity="0.7">
            <rect x="64" y="54" width="50" height="50"/>
            <rect x="146" y="48" width="55" height="50"/>
            <rect x="234" y="46" width="50" height="50"/>
            <rect x="66" y="146" width="50" height="40"/>
            <rect x="148" y="148" width="60" height="38"/>
            <rect x="236" y="144" width="48" height="40"/>
          </g>
          {/* Pin */}
          <g transform="translate(160 110)">
            <circle r="18" fill="var(--terra)" opacity="0.15"/>
            <circle r="10" fill="var(--terra)" opacity="0.3"/>
            <circle r="5" fill="var(--terra)"/>
            <circle r="5" fill="none" stroke="var(--paper)" strokeWidth="1.5"/>
          </g>
        </svg>
        <div style={{
          position: "absolute", left: 12, bottom: 10,
          fontFamily: "Geist Mono, monospace", fontSize: 10,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "var(--ink-soft)", background: "var(--paper)",
          padding: "3px 7px",
        }}>{A.address}</div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 14, scrollbarWidth: "none" }}>
        {kinds.map((k) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: "6px 12px", whiteSpace: "nowrap",
            border: "1px solid var(--ink)",
            background: filter === k ? "var(--ink)" : "transparent",
            color: filter === k ? "var(--paper)" : "var(--ink)",
            fontFamily: "Geist Mono, monospace", fontSize: 10,
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer",
          }}>{k}</button>
        ))}
      </div>

      <div>
        {filtered.map((n, i) => (
          <div key={n.name} style={{
            padding: "16px 0", borderBottom: "1px solid var(--rule)",
            display: "grid", gridTemplateColumns: "1fr auto", columnGap: 12, rowGap: 4,
          }}>
            <div>
              <div className="eyebrow" style={{ fontSize: 9.5 }}>{n.kind}</div>
              <h3 className="serif" style={{ fontSize: 20, margin: "2px 0 0" }}>{n.name}</h3>
            </div>
            <div className="mono" style={{
              fontSize: 11, color: "var(--moss)", alignSelf: "start",
              paddingTop: 6,
            }}>{n.dist}</div>
            <p style={{
              margin: 0, gridColumn: "1 / -1",
              fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5,
            }}>{n.note}</p>
          </div>
        ))}
      </div>
    </Page>
  );
};

// ─── 6. TOURS ────────────────────────────────────────────────
const ToursSection = () => {
  const A = window.APARTMENT;
  return (
    <Page>
      <PageHeader no="№ 06" eyebrow="Tours & trips" title="Days" italic="out" />

      <div style={{ marginTop: 4 }}>
        {A.tours.map((t, i) => (
          <article key={t.name} style={{
            padding: "22px 0", borderBottom: "1px solid var(--rule)",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
              <h3 className="serif" style={{
                fontSize: 23, margin: 0, letterSpacing: "-0.01em", flex: "1 1 auto",
              }}>{t.name}</h3>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 8, alignItems: "center" }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--moss)" }}>
                <Icon name="clock" size={11} /> &nbsp;{t.duration}
              </span>
              <span className="mono" style={{ fontSize: 11, color: "var(--terra)" }}>{t.price}</span>
            </div>
            <p style={{
              margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.5,
              color: "var(--ink-soft)",
            }}>{t.note}</p>
          </article>
        ))}
      </div>

      <div style={{
        marginTop: 26, padding: "18px 16px", background: "var(--moss)", color: "var(--paper)",
      }}>
        <div className="eyebrow" style={{ color: "rgba(251,246,235,0.7)" }}>A note from the host</div>
        <p className="serif-i" style={{
          fontSize: 18, margin: "8px 0 0", lineHeight: 1.4,
        }}>
          We can book the boat tickets in advance for you — just ask. The free walking tour is genuinely the best introduction to the city.
        </p>
      </div>
    </Page>
  );
};

// ─── 7. GUESTBOOK ────────────────────────────────────────────
const seedEntries = [
  { name: "Marlene & Thomas", from: "Berlin", date: "April 2026", text: "The light through the bedroom window at 7am. The bells. The little bakery you wrote about. We didn't want to leave." },
  { name: "Sofia", from: "Lisbon", date: "March 2026", text: "Came for the Van Eyck, stayed for the jenever. Lien's restaurant tips were perfect — every one." },
  { name: "The Tanaka family", from: "Osaka", date: "February 2026", text: "Our children loved the castle. Thank you for the extra blankets, it was very cold but very beautiful." },
];

const GuestbookSection = ({ entries, setEntries }) => {
  const [form, setForm] = useState({ name: "", from: "", text: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const newEntry = {
      name: form.name.trim(),
      from: form.from.trim() || "Somewhere",
      date: new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" }),
      text: form.text.trim(),
      fresh: true,
    };
    setEntries([newEntry, ...entries]);
    setForm({ name: "", from: "", text: "" });
  };

  return (
    <Page>
      <PageHeader no="№ 07" eyebrow="Guestbook" title="Leave" italic="a note" />

      <form onSubmit={submit} style={{
        background: "var(--cream-soft)", padding: "20px 18px",
        border: "1px solid var(--rule)", marginBottom: 28,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name" style={inputStyle} />
          <input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}
            placeholder="From..." style={inputStyle} />
        </div>
        <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
          rows={4} placeholder="A few words for the next guest..."
          style={{ ...inputStyle, width: "100%", resize: "vertical", minHeight: 90 }} />
        <button type="submit" style={{
          marginTop: 12, padding: "12px 22px",
          background: "var(--ink)", color: "var(--paper)", border: "none",
          fontFamily: "Geist Mono, monospace", fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 10,
        }}>
          Sign the book <Icon name="arrow" size={14} stroke="var(--paper)" />
        </button>
      </form>

      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span>Previous guests</span>
        <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
        <span>{entries.length}</span>
      </div>

      <div>
        {entries.map((g, i) => (
          <figure key={i} style={{
            margin: 0, padding: "22px 0",
            borderBottom: "1px solid var(--rule)",
            opacity: g.fresh ? 0 : 1,
            animation: g.fresh ? "fadeIn .6s forwards" : "none",
          }}>
            <blockquote className="serif" style={{
              margin: 0, fontSize: 19, lineHeight: 1.4,
              color: "var(--ink)", textWrap: "pretty",
              letterSpacing: "-0.005em",
            }}>
              <span className="serif-i" style={{ color: "var(--terra)", fontSize: 28, marginRight: 2, verticalAlign: "-0.05em" }}>"</span>
              {g.text}
            </blockquote>
            <figcaption className="mono" style={{
              marginTop: 12, fontSize: 11, color: "var(--ink-mute)",
              letterSpacing: "0.06em",
            }}>
              — {g.name}, {g.from} · {g.date}
            </figcaption>
          </figure>
        ))}
      </div>
      <style>{`@keyframes fadeIn { to { opacity: 1; transform: none; } from { opacity: 0; transform: translateY(8px); } }`}</style>
    </Page>
  );
};

// ─── 9. CONTACT OWNER ────────────────────────────────────────
const ContactSection = () => {
  const A = window.APARTMENT;
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setSent(true);
  };

  return (
    <Page>
      <PageHeader no="№ 08" eyebrow="Contact" title="Reach" italic="the host" />

      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-soft)", marginTop: -4 }}>
        {A.contact.responseTime}.
      </p>

      {/* Direct links */}
      <div style={{ marginTop: 20, display: "grid", gap: 1, background: "var(--rule)" }}>
        <a href={`https://wa.me/${A.contact.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" style={contactLink}>
          <Icon name="phone" size={18} stroke="var(--moss)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase" }}>WhatsApp</div>
            <div className="serif" style={{ fontSize: 20, marginTop: 2 }}>{A.contact.whatsapp}</div>
          </div>
          <Icon name="arrow" size={16} stroke="var(--ink)" />
        </a>
        <a href={`mailto:${A.contact.email}`} style={contactLink}>
          <Icon name="mail" size={18} stroke="var(--terra)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Email</div>
            <div className="serif" style={{ fontSize: 20, marginTop: 2 }}>{A.contact.email}</div>
          </div>
          <Icon name="arrow" size={16} stroke="var(--ink)" />
        </a>
      </div>

      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, margin: "32px 0 14px" }}>
        <span>Or send a message</span>
        <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
      </div>

      {sent ? (
        <div style={{
          padding: "26px 22px", background: "var(--moss)", color: "var(--paper)",
          textAlign: "center",
        }}>
          <Icon name="check" size={28} stroke="var(--paper)" />
          <div className="serif" style={{ fontSize: 24, marginTop: 10 }}>Message sent.</div>
          <div className="serif-i" style={{ fontSize: 16, marginTop: 6, opacity: 0.85 }}>
            We will get back to you shortly — {A.contact.owner}
          </div>
          <button onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }} style={{
            marginTop: 18, padding: "10px 18px", background: "transparent",
            border: "1px solid var(--paper)", color: "var(--paper)",
            fontFamily: "Geist Mono, monospace", fontSize: 10,
            letterSpacing: "0.16em", textTransform: "uppercase",
          }}>Send another</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label style={labelStyle}>Your name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle} placeholder="—" />
          </label>
          <label style={labelStyle}>Phone (optional)
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle} placeholder="—" />
          </label>
          <label style={labelStyle}>Message
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} placeholder="—" />
          </label>
          <button type="submit" style={{
            marginTop: 14, padding: "14px 0", width: "100%",
            background: "var(--ink)", color: "var(--paper)", border: "none",
            fontFamily: "Geist Mono, monospace", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            Send to {A.contact.owner.split(" ")[0]} <Icon name="send" size={14} stroke="var(--paper)" />
          </button>
        </form>
      )}
    </Page>
  );
};

// ─── shared styles ──────────────────────────────────────────
const inputStyle = {
  width: "100%",
  padding: "12px 12px",
  background: "var(--paper)",
  border: "1px solid var(--rule)",
  borderRadius: 0,
  fontFamily: "Geist, sans-serif",
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
};
const labelStyle = {
  display: "block",
  marginBottom: 14,
  fontFamily: "Geist Mono, monospace",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--ink-mute)",
};
const contactLink = {
  display: "flex", alignItems: "center", gap: 14,
  padding: "18px 14px", background: "var(--paper)",
  textDecoration: "none", color: "var(--ink)",
};

Object.assign(window, {
  WelcomeSection, ApartmentSection, WifiSection,
  GhentSection, NeighborhoodSection, ToursSection,
  GuestbookSection, ContactSection,
  seedEntries,
});
