// ─── Shared layout ───────────────────────────────────────────
const { useState, useEffect, useRef } = React;

// Turns bare URLs (http/https/www…) inside a plain-text string into tappable
// links, leaving the rest of the text untouched. Used wherever owner-written
// notes contain website addresses.
const _URL_RE = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
const Linkify = ({ text }) => {
  if (text == null) return null;
  const str = String(text);
  const out = [];
  let last = 0, m, i = 0;
  _URL_RE.lastIndex = 0;
  while ((m = _URL_RE.exec(str)) !== null) {
    if (m.index > last) out.push(str.slice(last, m.index));
    let token = m[0], trail = "";
    const tm = token.match(/[).,;:!?]+$/);
    if (tm) { trail = tm[0]; token = token.slice(0, -trail.length); }
    const href = token.startsWith("http") ? token : "https://" + token;
    out.push(
      <a key={i++} href={href} target="_blank" rel="noreferrer"
        style={{ color: "var(--terra)", textDecoration: "underline" }}>{token}</a>
    );
    if (trail) out.push(trail);
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push(str.slice(last));
  return out;
};
window.Linkify = Linkify;

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
  const tp = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px",
      border: `1px solid ${tp.border}`, background: tp.bg, color: tp.fg,
      fontFamily: "Geist Mono, monospace", fontSize: 10.5,
      letterSpacing: "0.12em", textTransform: "uppercase",
      borderRadius: 0,
    }}>{children}</span>
  );
};

// ─── 1. WELCOME ──────────────────────────────────────────────
const WelcomeSection = ({ go }) => {
  const A = window.APARTMENT;
  const t = window.t;
  return (
    <Page>
      <div style={{ paddingTop: 18 }}>
        <div className="eyebrow" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{t('welcome.no')} · {t('welcome.eyebrow')}</span>
          <span>{t('welcome.loc')}</span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <h1 className="serif" style={{
          fontSize: 76, lineHeight: 0.92, margin: "4px 0 0",
          letterSpacing: "-0.03em", color: "var(--ink)",
        }}>
          Schelde<br/><span className="serif-i" style={{ color: "var(--moss)" }}>punt</span>
        </h1>
        <div style={{ marginTop: 10, fontSize: 14, color: "var(--ink-soft)", maxWidth: 320 }}>
          Ter Plaeten 99 · {A.tagline}
        </div>
      </div>

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

      <p className="serif" style={{
        fontSize: 22, lineHeight: 1.35, margin: "28px 0 0",
        color: "var(--ink)", letterSpacing: "-0.005em",
        textWrap: "pretty", whiteSpace: "pre-line",
      }}>
        {A.welcomeText}
      </p>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 10 }}>
        — {A.hosts}
      </p>

      <hr className="rule" style={{ margin: "26px 0" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div className="eyebrow">{t('checkin')}</div>
          <div className="serif" style={{ fontSize: 28, marginTop: 4 }}>{A.checkIn}</div>
        </div>
        <div>
          <div className="eyebrow">{t('checkout')}</div>
          <div className="serif" style={{ fontSize: 28, marginTop: 4 }}>{A.checkOut}</div>
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
        {A.selfCheckIn}
      </div>

      <hr className="rule" style={{ margin: "26px 0" }} />

      <div className="eyebrow" style={{ marginBottom: 12 }}>{t('welcome.start_here')}</div>
      <div style={{ display: "grid", gap: 1, background: "var(--rule)" }}>
        {[
          { k: "wifi",         t: t('welcome.link.wifi'),         sub: t('welcome.link.wifi_sub') },
          { k: "apartment",    t: t('welcome.link.apartment'),    sub: t('welcome.link.apartment_sub') },
          { k: "neighborhood", t: t('welcome.link.neighborhood'), sub: t('welcome.link.neighborhood_sub') },
          { k: "ghent",        t: t('welcome.link.ghent'),        sub: t('welcome.link.ghent_sub') },
          { k: "faq",          t: t('welcome.link.faq'),          sub: t('welcome.link.faq_sub') },
          { k: "walk",         t: t('welcome.link.walk'),         sub: t('welcome.link.walk_sub') },
          { k: "tours",        t: t('welcome.link.tours'),        sub: t('welcome.link.tours_sub') },
          { k: "guestbook",    t: t('welcome.link.guestbook'),    sub: t('welcome.link.guestbook_sub') },
          { k: "contact",      t: t('welcome.link.contact'),      sub: t('welcome.link.contact_sub') },
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
  const t = window.t;
  // Order requested by the owner: apartment → keys → parking → house rules →
  // coffee → heating → trash → laundry → TV. House rules are a collapsible item.
  const items = [
    { k: "layout",  label: t('apartment.layout') },
    { k: "keys",    label: t('apartment.keys') },
    { k: "parking", label: t('apartment.parking') },
    { k: "rules",   label: t('apartment.house_rules') },
    { k: "coffee",  label: t('apartment.coffee') },
    { k: "heating", label: t('apartment.heating') },
    { k: "trash",   label: t('apartment.trash') },
    { k: "laundry", label: t('apartment.laundry') },
    { k: "tv",      label: t('apartment.tv') },
  ];
  const [open, setOpen] = useState("layout");

  return (
    <Page>
      <PageHeader no={t('apartment.no')} eyebrow={t('apartment.eyebrow')} title={t('apartment.title')} italic={t('apartment.italic')} />

      <div style={{ marginTop: 4 }}>
        <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>{t('apartment.how_things')}</span>
          <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
        </div>
      </div>

      <div style={{ marginTop: 14, borderTop: "1px solid var(--rule)" }}>
        {items.map((it) => {
          const isOpen = open === it.k;
          return (
            <div key={it.k} style={{ borderBottom: "1px solid var(--rule)" }}>
              <button onClick={() => setOpen(isOpen ? null : it.k)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "16px 0", background: "transparent",
                border: "none", textAlign: "left",
              }}>
                <span className="serif" style={{ fontSize: 20, color: isOpen ? "var(--terra)" : "var(--ink)" }}>{it.label}</span>
                <span style={{
                  fontFamily: "Geist Mono, monospace", fontSize: 18,
                  color: "var(--ink-mute)", transition: "transform .2s",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}>+</span>
              </button>
              {isOpen && (it.k === "rules" ? (
                <ol style={{ margin: "0 0 16px", padding: 0, listStyle: "none" }}>
                  {A.rules.map((r, i) => (
                    <li key={i} style={{
                      display: "flex", gap: 14, padding: "10px 0",
                      borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                    }}>
                      <span className="mono" style={{
                        fontSize: 11, color: "var(--terra)", paddingTop: 4, minWidth: 22,
                      }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--ink-soft)" }}>{r}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <div style={{
                  paddingBottom: 16, fontSize: 15, lineHeight: 1.55,
                  color: "var(--ink-soft)",
                }}>{A.howThings[it.k]}</div>
              ))}
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
  const t = window.t;
  const [copied, setCopied] = useState(null);
  const copy = (key, val) => {
    try { navigator.clipboard?.writeText(val); } catch (e) {}
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Page>
      <PageHeader no={t('wifi.no')} eyebrow={t('wifi.eyebrow')} title={t('wifi.title')} />

      <div style={{
        background: "var(--terra)", color: "var(--paper)",
        padding: "26px 22px", marginTop: 4,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -30, top: -30, opacity: 0.16 }}>
          <Icon name="wifi" size={180} stroke="var(--paper)" strokeWidth={1} />
        </div>
        <div className="eyebrow" style={{ color: "rgba(251,246,235,0.7)" }}>{t('wifi.internet')}</div>
        <div style={{ marginTop: 18, position: "relative" }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t('wifi.network')}</div>
          <button onClick={() => copy("net", A.wifi.network)} style={{
            display: "flex", alignItems: "center", gap: 10, marginTop: 4,
            background: "transparent", border: "none", padding: 0, color: "inherit",
          }}>
            <span className="serif" style={{ fontSize: 26, letterSpacing: "-0.01em" }}>{A.wifi.network}</span>
            <Icon name={copied === "net" ? "check" : "copy"} size={16} stroke="var(--paper)" />
          </button>
        </div>
        <div style={{ marginTop: 16, position: "relative" }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t('wifi.password')}</div>
          <button onClick={() => copy("pw", A.wifi.password)} style={{
            display: "flex", alignItems: "center", gap: 10, marginTop: 4,
            background: "transparent", border: "none", padding: 0, color: "inherit",
          }}>
            <span className="mono" style={{ fontSize: 22 }}>{A.wifi.password}</span>
            <Icon name={copied === "pw" ? "check" : "copy"} size={16} stroke="var(--paper)" />
          </button>
        </div>
        {A.wifi.note ? (
          <div style={{ marginTop: 16, fontSize: 12, opacity: 0.8, position: "relative" }}>{A.wifi.note}</div>
        ) : null}
      </div>

      <div style={{ marginTop: 32 }}>
        <div className="eyebrow" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span>{t('wifi.emergency')}</span>
          <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
        </div>
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--rule)" }}>
          {[
            { l: t('wifi.owner'),           v: A.contact.whatsapp,        tel: A.contact.whatsapp.replace(/\s/g, "") },
            { l: t('wifi.owner2'),          v: A.contact.phone2,          tel: (A.contact.phone2 || '').replace(/\s/g, "") },
            { l: t('wifi.all_emergencies'), v: A.emergency.eu,            tel: A.emergency.eu },
            { l: t('wifi.police'),          v: A.emergency.police,        tel: A.emergency.police },
            { l: t('wifi.doctor'),          v: A.emergency.doctorOnCall,  tel: A.emergency.doctorOnCall },
          ].map((e) => (
            <a key={e.l} href={`tel:${e.tel}`} style={{
              padding: "18px 14px", background: "var(--paper)", textDecoration: "none",
              color: "var(--ink)", display: "block",
            }}>
              <div className="eyebrow" style={{ fontSize: 10 }}>{e.l}</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 4 }}>{e.v}</div>
            </a>
          ))}
          <div style={{ padding: "18px 14px", background: "var(--paper)", gridColumn: "1 / -1" }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>{t('wifi.pharmacy')}</div>
            <div className="serif" style={{ fontSize: 16, marginTop: 4, lineHeight: 1.4 }}>{A.emergency.pharmacy}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <div className="eyebrow" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span>{t('wifi.transport_title')}</span>
          <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
        </div>

        {/* Taxi first */}
        <a href={`tel:${(A.taxi.phone1 || '').replace(/\s/g, "")}`} style={{
          display: "block", marginTop: 12, padding: "14px 16px",
          background: "var(--paper)", border: "1px solid var(--rule)",
          textDecoration: "none", color: "var(--ink)",
        }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>{t('wifi.taxi')}</div>
          <div className="serif" style={{ fontSize: 18, marginTop: 4 }}>{A.taxi.phone1}  ·  {A.taxi.phone2}</div>
        </a>

        {/* Bus + ticket */}
        <div style={{ marginTop: 10, padding: "16px", background: "var(--cream-soft)", border: "1px solid var(--rule)" }}>
          <div className="eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>{t('wifi.bus')}</div>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-soft)", whiteSpace: "pre-line" }}>
            {A.transport.bus}
          </div>
          <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-mute)", lineHeight: 1.5 }}>
            <Linkify text={A.transport.dayTicket} />
          </div>
        </div>
      </div>
    </Page>
  );
};

// ─── 4. GHENT CITY GUIDE ─────────────────────────────────────
const GhentSection = ({ visitorTips, setVisitorTips }) => {
  const A = window.APARTMENT;
  const t = window.t;
  const [tab, setTab] = useState("must");
  const [tipForm, setTipForm] = useState({ name: "", place: "", desc: "" });
  const list = tab === "must" ? A.ghent.mustSee : A.ghent.hidden;

  const submitTip = async (e) => {
    e.preventDefault();
    if (!tipForm.place.trim() || !tipForm.desc.trim()) return;
    const tempId = Date.now();
    const newTip = {
      id: tempId,
      name: tipForm.name.trim() || "A guest",
      place: tipForm.place.trim(),
      desc: tipForm.desc.trim(),
      votes: 0,
    };
    setVisitorTips((prev) => [newTip, ...prev]);
    setTipForm({ name: "", place: "", desc: "" });
    if (window.DB.ready()) {
      try {
        const rows = await window.DB.addTip({ name: newTip.name, place: newTip.place, description: newTip.desc });
        const saved = Array.isArray(rows) ? rows[0] : rows;
        if (saved && typeof saved.id === 'number') {
          setVisitorTips((prev) => prev.map((t) =>
            t.id === tempId ? { ...t, id: saved.id } : t
          ));
        }
      } catch (err) {
        console.warn('visitor tip not saved to DB:', err);
      }
    }
  };

  const vote = async (id, delta) => {
    const tip = visitorTips.find((t) => t.id === id);
    if (!tip) return;
    setVisitorTips((prev) => prev.map((t) =>
      t.id === id ? { ...t, votes: Math.max(0, t.votes + delta) } : t
    ));
    if (window.DB.ready()) {
      try { await window.DB.vote(id, tip.votes, delta); }
      catch (e) { /* optimistic update stays */ }
    }
  };

  const sortedTips = [...(visitorTips || [])].sort((a, b) => b.votes - a.votes);

  return (
    <Page>
      <PageHeader no={t('ghent.no')} eyebrow={t('ghent.eyebrow')} title={t('ghent.title')} italic={t('ghent.italic')} />

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{t('ghent.attribution')}</span>
        <a href="https://www.visitgent.be" target="_blank" rel="noreferrer" style={{
          fontSize: 12, color: "var(--terra)", fontStyle: "italic", textDecoration: "none",
        }}>visitgent.be</a>
      </div>

      <p className="serif-i" style={{
        fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.45,
        marginTop: 4, maxWidth: 340,
      }}>
        <Linkify text={A.ghent.bestTimes} />
      </p>

      {/* Tabs — sized to fit on one line so visitor tips are visible without scrolling */}
      <div style={{ display: "flex", marginTop: 22, borderBottom: "1px solid var(--ink)" }}>
        {[
          { k: "must",     l: t('ghent.must_see') },
          { k: "hidden",   l: t('ghent.hidden') },
          { k: "visitors", l: t('ghent.visitor_title') },
        ].map((tb) => (
          <button key={tb.k} onClick={() => setTab(tb.k)} style={{
            flex: 1, minWidth: 0, padding: "11px 4px", background: "transparent",
            border: "none",
            borderBottom: tab === tb.k ? "2px solid var(--terra)" : "2px solid transparent",
            marginBottom: -1,
            fontFamily: "Geist, sans-serif", fontSize: 10.5,
            letterSpacing: "0.04em", textTransform: "uppercase",
            color: tab === tb.k ? "var(--ink)" : "var(--ink-mute)",
            fontWeight: tab === tb.k ? 600 : 500,
            lineHeight: 1.15, textAlign: "center", cursor: "pointer",
          }}>{tb.l}</button>
        ))}
      </div>

      {/* Must-see / Hidden gems */}
      {(tab === "must" || tab === "hidden") && (
        <div style={{ marginTop: 4 }}>
          {list.map((s, i) => (
            <article key={s.name} style={{
              padding: "22px 0", borderBottom: "1px solid var(--rule)",
              display: "grid", gridTemplateColumns: "32px 1fr", gap: 12,
            }}>
              <div className="serif-i" style={{
                fontSize: 28, color: "var(--terra)", lineHeight: 1, paddingTop: 4,
              }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="serif" style={{ fontSize: 22, margin: 0, letterSpacing: "-0.01em" }}>{s.name}</h3>
                <p style={{
                  margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.5,
                  color: "var(--ink-soft)", textWrap: "pretty",
                }}><Linkify text={s.note} /></p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Visitor tips */}
      {/* Explore more — visit.gent.be links */}
      {(tab === "must" || tab === "hidden") && A.ghent.restaurantLinks && A.ghent.restaurantLinks.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span>{t('ghent.explore_more')}</span>
            <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {A.ghent.restaurantLinks.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer" style={{
                display: "block", textDecoration: "none",
                padding: "12px 14px",
                border: "1px solid var(--rule)",
                background: "var(--cream-soft)",
                color: "var(--ink)",
              }}>
                <div style={{ fontSize: 12.5, fontFamily: "Geist, sans-serif", lineHeight: 1.3 }}>{link.label}</div>
                <div style={{ fontSize: 10, color: "var(--terra)", fontFamily: "Geist Mono, monospace", marginTop: 5, letterSpacing: "0.05em" }}>visitgent.be →</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {tab === "visitors" && (
        <div style={{ marginTop: 16 }}>
          {sortedTips.length === 0 ? (
            <div style={{
              padding: "32px 0", textAlign: "center",
              fontFamily: "Newsreader, serif", fontStyle: "italic",
              fontSize: 18, color: "var(--ink-mute)",
            }}>{t('ghent.no_tips')}</div>
          ) : (
            <div>
              {sortedTips.map((tip) => (
                <article key={tip.id} style={{
                  padding: "16px 0", borderBottom: "1px solid var(--rule)",
                  display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "start",
                }}>
                  <div>
                    <h3 className="serif" style={{ fontSize: 20, margin: 0 }}>{tip.place}</h3>
                    <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)" }}>{tip.desc}</p>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", marginTop: 8, letterSpacing: "0.08em" }}>
                      — {tip.name}
                    </div>
                  </div>
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    paddingTop: 4, minWidth: 36,
                  }}>
                    <button onClick={() => vote(tip.id, 1)} style={{
                      background: "transparent", border: "none", padding: "4px 8px",
                      color: "var(--moss)", fontSize: 14, cursor: "pointer", lineHeight: 1,
                    }}>▲</button>
                    <span className="mono" style={{
                      fontSize: 13, fontWeight: 600,
                      color: tip.votes > 0 ? "var(--moss)" : tip.votes < 0 ? "var(--terra)" : "var(--ink-mute)",
                    }}>{tip.votes}</span>
                    <button onClick={() => vote(tip.id, -1)} style={{
                      background: "transparent", border: "none", padding: "4px 8px",
                      color: "var(--terra)", fontSize: 14, cursor: "pointer", lineHeight: 1,
                    }}>▼</button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Add tip form */}
          <div style={{ marginTop: 28 }}>
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span>{t('ghent.add_tip')}</span>
              <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
            </div>
            <form onSubmit={submitTip} style={{
              background: "var(--cream-soft)", padding: "18px 16px", border: "1px solid var(--rule)",
            }}>
              <input
                value={tipForm.place}
                onChange={(e) => setTipForm({ ...tipForm, place: e.target.value })}
                placeholder={t('ghent.tip_place')}
                style={{ ...inputStyle, marginBottom: 10 }}
              />
              <textarea
                value={tipForm.desc}
                onChange={(e) => setTipForm({ ...tipForm, desc: e.target.value })}
                placeholder={t('ghent.tip_desc')}
                rows={3}
                style={{ ...inputStyle, resize: "vertical", marginBottom: 10 }}
              />
              <input
                value={tipForm.name}
                onChange={(e) => setTipForm({ ...tipForm, name: e.target.value })}
                placeholder={t('ghent.tip_name')}
                style={{ ...inputStyle, marginBottom: 12 }}
              />
              <button type="submit" style={{
                padding: "11px 20px",
                background: "var(--ink)", color: "var(--paper)", border: "none",
                fontFamily: "Geist Mono, monospace", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer",
              }}>
                {t('ghent.submit_tip')} <Icon name="arrow" size={14} stroke="var(--paper)" />
              </button>
            </form>
          </div>
        </div>
      )}
    </Page>
  );
};

// ─── 5. NEIGHBORHOOD MAP & SHOPS ─────────────────────────────
const NeighborhoodSection = () => {
  const A = window.APARTMENT;
  const t = window.t;
  const [filter, setFilter] = useState("All");
  const kinds = ["All", ...Array.from(new Set(A.neighborhood.map((n) => n.kind)))];
  const filtered = filter === "All" ? A.neighborhood : A.neighborhood.filter((n) => n.kind === filter);
  const kindLabel = (k) => (k === "All" ? t('neighborhood.all') : k);

  return (
    <Page>
      <PageHeader no={t('neighborhood.no')} eyebrow={t('neighborhood.eyebrow')} title={t('neighborhood.title')} italic={t('neighborhood.italic')} />

      {/* Stylized map placeholder */}
      <div style={{
        position: "relative", aspectRatio: "16 / 11",
        background: "var(--cream-deep)",
        border: "1px solid var(--rule)",
        marginBottom: 22, overflow: "hidden",
      }}>
        <svg viewBox="0 0 320 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d="M -20 130 Q 80 90, 160 120 T 340 110" fill="none" stroke="#9DB6A6" strokeWidth="22" opacity="0.55" strokeLinecap="round"/>
          <path d="M -20 130 Q 80 90, 160 120 T 340 110" fill="none" stroke="#7B9C8A" strokeWidth="1" opacity="0.7"/>
          <g stroke="#C5B596" strokeWidth="1.2" fill="none">
            <path d="M40 0 L 60 220"/>
            <path d="M120 0 L 140 220"/>
            <path d="M210 0 L 230 220"/>
            <path d="M280 0 L 300 220"/>
            <path d="M0 60 L 320 50"/>
            <path d="M0 180 L 320 170"/>
          </g>
          <g fill="#E2D5B8" opacity="0.7">
            <rect x="64" y="54" width="50" height="50"/>
            <rect x="146" y="48" width="55" height="50"/>
            <rect x="234" y="46" width="50" height="50"/>
            <rect x="66" y="146" width="50" height="40"/>
            <rect x="148" y="148" width="60" height="38"/>
            <rect x="236" y="144" width="48" height="40"/>
          </g>
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
          }}>{kindLabel(k)}</button>
        ))}
      </div>

      <div>
        {filtered.map((n) => (
          <a key={n.name} href={n.mapsUrl} target="_blank" rel="noreferrer" style={{
            display: "block", textDecoration: "none", color: "inherit",
            padding: "16px 0", borderBottom: "1px solid var(--rule)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", columnGap: 12, rowGap: 4 }}>
              <div>
                <div className="eyebrow" style={{ fontSize: 9.5 }}>{n.kind}</div>
                <h3 className="serif" style={{ fontSize: 20, margin: "2px 0 0" }}>{n.name}</h3>
              </div>
              <div className="mono" style={{
                fontSize: 11, color: "var(--moss)", alignSelf: "start", paddingTop: 6,
              }}>{n.dist}</div>
              <p style={{
                margin: 0, gridColumn: "1 / -1",
                fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5,
              }}><Linkify text={n.note} /></p>
              <div style={{
                gridColumn: "1 / -1", marginTop: 4,
                fontSize: 11, color: "var(--terra)",
                fontFamily: "Geist Mono, monospace", letterSpacing: "0.08em",
              }}>{t('neighborhood.open_maps')}</div>
            </div>
          </a>
        ))}
      </div>
    </Page>
  );
};

// ─── 6. TOURS ────────────────────────────────────────────────
const ToursSection = () => {
  const A = window.APARTMENT;
  const t = window.t;
  return (
    <Page>
      <PageHeader no={t('tours.no')} eyebrow={t('tours.eyebrow')} title={t('tours.title')} italic={t('tours.italic')} />

      <div style={{ marginTop: 4 }}>
        {A.tours.map((tour) => (
          <article key={tour.name} style={{
            padding: "22px 0", borderBottom: "1px solid var(--rule)",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
              <h3 className="serif" style={{
                fontSize: 23, margin: 0, letterSpacing: "-0.01em", flex: "1 1 auto",
              }}>{tour.name}</h3>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 8, alignItems: "center" }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--moss)" }}>
                <Icon name="clock" size={11} /> &nbsp;{tour.duration}
              </span>
              <span className="mono" style={{ fontSize: 11, color: "var(--terra)" }}>{tour.price}</span>
            </div>
            <p style={{
              margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.5,
              color: "var(--ink-soft)",
            }}><Linkify text={tour.note} /></p>
          </article>
        ))}
      </div>

      <div style={{
        marginTop: 26, padding: "18px 16px", background: "var(--moss)", color: "var(--paper)",
      }}>
        <div className="eyebrow" style={{ color: "rgba(251,246,235,0.7)" }}>{t('tours.host_note')}</div>
        <p className="serif-i" style={{ fontSize: 18, margin: "8px 0 0", lineHeight: 1.4 }}>
          {A.toursHostNote}
        </p>
      </div>
    </Page>
  );
};

// ─── 7. GUESTBOOK ────────────────────────────────────────────
const seedEntries = [
  { name: "Marlene & Thomas", from: "Berlin", date: "April 2026", text: "The light through the bedroom window at 7am. The bells. The little bakery you wrote about. We didn't want to leave." },
  { name: "Sofia", from: "Lisbon", date: "March 2026", text: "Came for the Van Eyck, stayed for the jenever. The restaurant tips were perfect — every one." },
  { name: "The Tanaka family", from: "Osaka", date: "February 2026", text: "Our children loved the castle. Thank you for the extra blankets, it was very cold but very beautiful." },
];

const GuestbookSection = ({ entries, setEntries }) => {
  const t = window.t;
  const [form, setForm] = useState({ name: "", from: "", text: "" });
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || saving) return;
    const newEntry = {
      name: form.name.trim(),
      from: form.from.trim() || "Somewhere",
      date: new Date().toLocaleDateString('en-GB', { month: "long", year: "numeric" }),
      text: form.text.trim(),
      fresh: true,
    };
    setEntries([newEntry, ...entries]);
    setForm({ name: "", from: "", text: "" });
    if (window.DB.ready()) {
      setSaving(true);
      try {
        await window.DB.addEntry({ name: newEntry.name, from: newEntry.from, text: newEntry.text });
      } catch (err) {
        console.warn('guestbook entry not saved to DB:', err);
      } finally { setSaving(false); }
    }
  };

  return (
    <Page>
      <PageHeader no={t('guestbook.no')} eyebrow={t('guestbook.eyebrow')} title={t('guestbook.title')} italic={t('guestbook.italic')} />

      <form onSubmit={submit} style={{
        background: "var(--cream-soft)", padding: "20px 18px",
        border: "1px solid var(--rule)", marginBottom: 28,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t('guestbook.name')} style={inputStyle} />
          <input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}
            placeholder={t('guestbook.from')} style={inputStyle} />
        </div>
        <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
          rows={4} placeholder={t('guestbook.text')}
          style={{ ...inputStyle, width: "100%", resize: "vertical", minHeight: 90 }} />
        <button type="submit" style={{
          marginTop: 12, padding: "12px 22px",
          background: "var(--ink)", color: "var(--paper)", border: "none",
          fontFamily: "Geist Mono, monospace", fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer",
        }}>
          {t('guestbook.submit')} <Icon name="arrow" size={14} stroke="var(--paper)" />
        </button>
      </form>

      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span>{t('guestbook.previous')}</span>
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

// ─── 8. FAQ ──────────────────────────────────────────────────
const FAQSection = () => {
  const A = window.APARTMENT;
  const t = window.t;
  const [open, setOpen] = useState(null);

  return (
    <Page>
      <PageHeader no={t('faq.no')} eyebrow={t('faq.eyebrow')} title={t('faq.title')} italic={t('faq.italic')} />

      <div style={{ borderTop: "1px solid var(--ink)" }}>
        {A.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid var(--rule)" }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "18px 0", background: "transparent",
                border: "none", textAlign: "left", gap: 12, cursor: "pointer",
              }}>
                <span className="serif" style={{
                  fontSize: 19, lineHeight: 1.3,
                  color: isOpen ? "var(--terra)" : "var(--ink)",
                }}>{item.q}</span>
                <span style={{
                  fontFamily: "Geist Mono, monospace", fontSize: 18, flexShrink: 0,
                  color: "var(--ink-mute)", transition: "transform .2s",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}>+</span>
              </button>
              {isOpen && (
                <div style={{
                  paddingBottom: 18, fontSize: 15, lineHeight: 1.6,
                  color: "var(--ink-soft)",
                }}>{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </Page>
  );
};

// ─── 9. CONTACT OWNER ────────────────────────────────────────
const ContactSection = () => {
  const A = window.APARTMENT;
  const t = window.t;
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    // Save to DB in the background
    if (window.DB.ready()) {
      window.DB.sendMessage({ name: form.name.trim(), phone: form.phone.trim(), message: form.message.trim() })
        .catch((err) => console.warn('contact message not saved to DB:', err));
    }
    // Open WhatsApp with the message pre-filled
    const waNumber = A.contact.whatsapp.replace(/[^0-9]/g, "");
    const waText = encodeURIComponent(
      `${form.name.trim()} (${form.phone.trim() || t('contact.no_phone')})\n\n${form.message.trim()}`
    );
    window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
    setSent(true);
  };

  return (
    <Page>
      <PageHeader no={t('contact.no')} eyebrow={t('contact.eyebrow')} title={t('contact.title')} italic={t('contact.italic')} />

      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-soft)", marginTop: -4 }}>
        {A.contact.responseTime}.
      </p>

      <div style={{ marginTop: 20, display: "grid", gap: 1, background: "var(--rule)" }}>
        <a href={`https://wa.me/${A.contact.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" style={contactLink}>
          <Icon name="phone" size={18} stroke="var(--moss)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t('contact.whatsapp')}</div>
            <div className="serif" style={{ fontSize: 20, marginTop: 2 }}>{A.contact.whatsapp}</div>
          </div>
          <Icon name="arrow" size={16} stroke="var(--ink)" />
        </a>
        <a href={`mailto:${A.contact.email}`} style={contactLink}>
          <Icon name="mail" size={18} stroke="var(--terra)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t('contact.email')}</div>
            <div className="serif" style={{ fontSize: 20, marginTop: 2 }}>{A.contact.email}</div>
          </div>
          <Icon name="arrow" size={16} stroke="var(--ink)" />
        </a>
      </div>

      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, margin: "32px 0 14px" }}>
        <span>{t('contact.or_send')}</span>
        <span style={{ flex: 1, height: 1, background: "var(--ink)" }} />
      </div>

      {sent ? (
        <div style={{
          padding: "26px 22px", background: "var(--moss)", color: "var(--paper)",
          textAlign: "center",
        }}>
          <Icon name="check" size={28} stroke="var(--paper)" />
          <div className="serif" style={{ fontSize: 24, marginTop: 10 }}>{t('contact.sent_title')}</div>
          <div className="serif-i" style={{ fontSize: 16, marginTop: 6, opacity: 0.85 }}>
            {t('contact.sent_body')} — {A.contact.owner}
          </div>
          <button onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }} style={{
            marginTop: 18, padding: "10px 18px", background: "transparent",
            border: "1px solid var(--paper)", color: "var(--paper)",
            fontFamily: "Geist Mono, monospace", fontSize: 10,
            letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer",
          }}>{t('contact.send_another')}</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label style={labelStyle}>{t('contact.name')}
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle} placeholder="—" />
          </label>
          <label style={labelStyle}>{t('contact.phone')}
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle} placeholder="—" />
          </label>
          <label style={labelStyle}>{t('contact.message')}
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} placeholder="—" />
          </label>
          <button type="submit" style={{
            marginTop: 14, padding: "14px 0", width: "100%",
            background: "var(--ink)", color: "var(--paper)", border: "none",
            fontFamily: "Geist Mono, monospace", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            gap: 10, cursor: "pointer",
          }}>
            {t('contact.send_to')} {A.contact.owner.split(" ")[0]} <Icon name="send" size={14} stroke="var(--paper)" />
          </button>
        </form>
      )}
    </Page>
  );
};

// ─── shared styles ───────────────────────────────────────────
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

// ─── REPORT AN ISSUE (floating modal) ────────────────────────
const ISSUE_CATEGORIES = () => [
  { k: "maintenance",  label: window.t('issue.maintenance'),  emoji: "🔧" },
  { k: "cleanliness",  label: window.t('issue.cleanliness'),  emoji: "🧹" },
  { k: "missing",      label: window.t('issue.missing'),      emoji: "📦" },
  { k: "noise",        label: window.t('issue.noise'),        emoji: "🔊" },
  { k: "other",        label: window.t('issue.other'),        emoji: "💬" },
];
const ISSUE_ROOMS = () => [
  window.t('issue.room_general'),
  window.t('issue.room_living'),
  window.t('issue.room_bedroom1'),
  window.t('issue.room_bedroom2'),
  window.t('issue.room_kitchen'),
  window.t('issue.room_bathroom1'),
  window.t('issue.room_bathroom2'),
  window.t('issue.room_terrace'),
  window.t('issue.room_parking'),
];

const ReportIssueModal = ({ open, onClose }) => {
  const t = window.t;
  const [cat, setCat] = useState("maintenance");
  const [room, setRoom] = useState("");
  const [desc, setDesc] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!desc.trim() || state === "sending") return;
    setState("sending");
    try {
      if (window.DB.ready()) {
        await window.DB.reportIssue({ category: cat, description: desc.trim(), room: room || null });
      }
      setState("done");
    } catch (err) {
      setState("error");
    }
  };

  const reset = () => { setCat("maintenance"); setRoom(""); setDesc(""); setState("idle"); onClose(); };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) reset(); }} style={{
      position: "fixed", inset: 0, zIndex: 110,
      background: "rgba(31,24,20,0.45)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      <div style={{
        width: "100%", maxWidth: 440,
        background: "var(--paper)",
        borderRadius: "16px 16px 0 0",
        padding: "28px 20px 32px",
        boxShadow: "0 -12px 40px -8px rgba(31,24,20,0.25)",
        animation: "slideUp .25s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>{t('issue.eyebrow')}</div>
            <div className="serif" style={{ fontSize: 22 }}>{t('issue.title')}</div>
          </div>
          <button onClick={reset} style={{ background: "none", border: "none", padding: 8, cursor: "pointer", color: "var(--ink-mute)", fontSize: 20, lineHeight: 1 }}>✕</button>
        </div>

        {state === "done" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
            <div className="serif" style={{ fontSize: 19, marginBottom: 8 }}>{t('issue.done_title')}</div>
            <div style={{ fontSize: 14, color: "var(--ink-mute)", marginBottom: 20 }}>{t('issue.done_body')}</div>
            <button onClick={reset} style={{
              padding: "10px 24px", background: "var(--ink)", color: "var(--paper)",
              border: "none", fontFamily: "Geist Mono, monospace", fontSize: 10,
              letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer",
            }}>{t('issue.done_close')}</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            {/* Category pills */}
            <div className="eyebrow" style={{ marginBottom: 10 }}>{t('issue.category')}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {ISSUE_CATEGORIES().map((c) => (
                <button key={c.k} type="button" onClick={() => setCat(c.k)} style={{
                  padding: "7px 13px", border: "1px solid",
                  borderColor: cat === c.k ? "var(--ink)" : "var(--rule)",
                  background: cat === c.k ? "var(--ink)" : "transparent",
                  color: cat === c.k ? "var(--paper)" : "var(--ink-soft)",
                  fontFamily: "Geist, sans-serif", fontSize: 13, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span>{c.emoji}</span> {c.label}
                </button>
              ))}
            </div>

            {/* Room select */}
            <label style={labelStyle}>{t('issue.room')}
              <select value={room} onChange={(e) => setRoom(e.target.value)} style={{ ...inputStyle, marginTop: 6 }}>
                <option value="">—</option>
                {ISSUE_ROOMS().map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>

            {/* Description */}
            <label style={labelStyle}>{t('issue.desc')}
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                placeholder={t('issue.desc_placeholder')}
                style={{ ...inputStyle, resize: "vertical", minHeight: 80, marginTop: 6 }}
                required
              />
            </label>

            {state === "error" && (
              <div style={{ fontSize: 13, color: "var(--terra)", marginBottom: 10 }}>{t('issue.error')}</div>
            )}

            <button type="submit" disabled={state === "sending"} style={{
              width: "100%", padding: "14px", background: "var(--terra)", color: "var(--paper)",
              border: "none", fontFamily: "Geist Mono, monospace", fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
              opacity: state === "sending" ? 0.6 : 1,
            }}>
              {state === "sending" ? "…" : t('issue.submit')}
            </button>
          </form>
        )}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: none; } }`}</style>
    </div>
  );
};

const seedVisitorTips = [];

Object.assign(window, {
  WelcomeSection, ApartmentSection, WifiSection,
  GhentSection, NeighborhoodSection, ToursSection,
  GuestbookSection, FAQSection, ContactSection,
  ReportIssueModal,
  seedEntries, seedVisitorTips,
});
