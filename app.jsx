// ─── Top-level app shell ─────────────────────────────────────
const { useState: useStateApp, useEffect: useEffectApp } = React;

// Palettes for Tweaks
const PALETTES = {
  warm: {
    label: "Warm editorial",
    cream: "#F2EADB", "cream-soft": "#EAE0CB", "cream-deep": "#E2D5B8",
    ink: "#1F1814", "ink-soft": "#4A3F37", "ink-mute": "#8A7B6E",
    rule: "#D6C8AE",
    terra: "#B84A2C", "terra-deep": "#8E3318",
    moss: "#3B4E33", "moss-deep": "#28361F",
    paper: "#FBF6EB",
  },
  canal: {
    label: "Canal stone",
    cream: "#E8E3D6", "cream-soft": "#DFD9C8", "cream-deep": "#D3CBB7",
    ink: "#1B2027", "ink-soft": "#3D4651", "ink-mute": "#7E8794",
    rule: "#C7C0AE",
    terra: "#C56A3A", "terra-deep": "#8E4622",
    moss: "#39524B", "moss-deep": "#26393A",
    paper: "#F4F0E4",
  },
  cathedral: {
    label: "Cathedral dusk",
    cream: "#1E1A18", "cream-soft": "#28221F", "cream-deep": "#322B27",
    ink: "#F2EADB", "ink-soft": "#C7BFAF", "ink-mute": "#857C6F",
    rule: "#3D352F",
    terra: "#D77149", "terra-deep": "#B5532E",
    moss: "#7AA28A", "moss-deep": "#5C8870",
    paper: "#1B1714",
  },
};

const FONTS = {
  newsreader: { label: "Newsreader", stack: "'Newsreader', 'EB Garamond', Georgia, serif" },
  cormorant: { label: "Cormorant", stack: "'Cormorant Garamond', 'EB Garamond', Georgia, serif" },
  garamond: { label: "EB Garamond", stack: "'EB Garamond', Georgia, serif" },
};

function applyPalette(pKey) {
  const p = PALETTES[pKey] || PALETTES.warm;
  const root = document.documentElement;
  Object.keys(p).forEach((k) => {
    if (k === "label") return;
    root.style.setProperty("--" + k, p[k]);
  });
}
function applyFont(fKey) {
  const f = FONTS[fKey] || FONTS.newsreader;
  document.documentElement.style.setProperty("--serif-stack", f.stack);
  let s = document.getElementById("__serif-override");
  if (!s) { s = document.createElement("style"); s.id = "__serif-override"; document.head.appendChild(s); }
  s.textContent = `.serif, .serif-i { font-family: ${f.stack} !important; }`;
}

// ─── NAV ─────────────────────────────────────────────────────
const NAV_ITEMS = [
  { k: "welcome",      icon: "home",    tKey: "nav.welcome" },
  { k: "apartment",    icon: "key",     tKey: "nav.apartment" },
  { k: "wifi",         icon: "wifi",    tKey: "nav.wifi" },
  { k: "ghent",        icon: "compass", tKey: "nav.ghent" },
  { k: "neighborhood", icon: "map",     tKey: "nav.neighborhood" },
  { k: "tours",        icon: "star",    tKey: "nav.tours" },
  { k: "guestbook",    icon: "book",    tKey: "nav.guestbook" },
  { k: "faq",          icon: "spark",   tKey: "nav.faq" },
  { k: "contact",      icon: "mail",    tKey: "nav.contact" },
  { k: "walk",         icon: "pin",     tKey: "nav.walk" },
];

const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "de", label: "DE" },
  { code: "nl", label: "NL" },
];

const BottomNav = ({ active, onChange }) => (
  <nav style={{
    position: "sticky", bottom: 0, zIndex: 40,
    background: "var(--paper)",
    borderTop: "1px solid var(--rule)",
    paddingBottom: "env(safe-area-inset-bottom, 0)",
  }}>
    <div style={{
      display: "flex", overflowX: "auto", padding: "8px 6px",
      gap: 2, scrollbarWidth: "none",
    }}>
      {NAV_ITEMS.map((n) => {
        const isActive = n.k === active;
        return (
          <button key={n.k} onClick={() => onChange(n.k)} style={{
            flex: "0 0 auto", minWidth: 56,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "8px 6px",
            background: "transparent", border: "none",
            color: isActive ? "var(--terra)" : "var(--ink-mute)",
            position: "relative",
            cursor: "pointer",
          }}>
            <Icon name={n.icon} size={20} stroke={isActive ? "var(--terra)" : "var(--ink)"} strokeWidth={isActive ? 1.8 : 1.4} />
            <span style={{
              fontFamily: "Geist Mono, monospace",
              fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>{window.t(n.tKey)}</span>
            {isActive && <span style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 22, height: 2, background: "var(--terra)",
            }} />}
          </button>
        );
      })}
    </div>
  </nav>
);

const TopBar = ({ active, onLogo, lang, changeLang }) => {
  const item = NAV_ITEMS.find((n) => n.k === active);
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30,
      background: "rgba(251,246,235,0.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--rule)",
      padding: "12px 18px",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <button onClick={onLogo} style={{
        background: "transparent", border: "none", padding: 0,
        display: "flex", alignItems: "baseline", gap: 6,
      }}>
        <span className="serif" style={{ fontSize: 20, letterSpacing: "-0.01em" }}>Scheldepunt</span>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.15em", color: "var(--ink-mute)", textTransform: "uppercase" }}>· Gent</span>
      </button>
      <div style={{ flex: 1 }} />
      <div className="mono" style={{
        fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--ink-mute)",
      }}>{item ? window.t(item.tKey) : ""}</div>
      <select
        value={lang}
        onChange={(e) => changeLang(e.target.value)}
        style={{
          fontFamily: "Geist Mono, monospace",
          fontSize: 10, letterSpacing: "0.1em",
          background: "transparent", border: "1px solid var(--rule)",
          color: "var(--ink-mute)", padding: "4px 6px",
          cursor: "pointer", outline: "none",
        }}
      >
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </header>
  );
};

// ─── ROOT APP ────────────────────────────────────────────────
const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "displayFont": "newsreader",
  "showQuickNav": true
}/*EDITMODE-END*/;

const App = () => {
  const [active, setActive] = useStateApp("welcome");
  const [chatOpen, setChatOpen] = useStateApp(false);
  const [entries, setEntries] = useStateApp(window.seedEntries);
  const [visitorTips, setVisitorTips] = useStateApp(window.seedVisitorTips);
  const [lang, setLang] = useStateApp("en");
  const [tweaks, setTweak] = window.useTweaks
    ? window.useTweaks(TWEAKS_DEFAULTS)
    : [TWEAKS_DEFAULTS, () => {}];

  useEffectApp(() => { applyPalette(tweaks.palette); }, [tweaks.palette]);
  useEffectApp(() => { applyFont(tweaks.displayFont); }, [tweaks.displayFont]);

  const changeLang = (code) => {
    window.currentLang = code;
    setLang(code);
  };

  // Smooth scroll to top on section change
  const stageRef = React.useRef(null);
  useEffectApp(() => {
    if (stageRef.current) stageRef.current.scrollTo({ top: 0, behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [active]);

  const go = (k) => setActive(k);

  let view = null;
  switch (active) {
    case "welcome":      view = <WelcomeSection go={go} />; break;
    case "apartment":    view = <ApartmentSection />; break;
    case "wifi":         view = <WifiSection />; break;
    case "ghent":        view = <GhentSection visitorTips={visitorTips} setVisitorTips={setVisitorTips} />; break;
    case "neighborhood": view = <NeighborhoodSection />; break;
    case "tours":        view = <ToursSection />; break;
    case "guestbook":    view = <GuestbookSection entries={entries} setEntries={setEntries} />; break;
    case "faq":          view = <FAQSection />; break;
    case "contact":      view = <ContactSection />; break;
    case "walk":         view = <WalkSection />; break;
    default:             view = <WelcomeSection go={go} />;
  }

  return (
    <div className="stage" data-screen-label={`App · ${active}`}>
      <div className="device">
        <TopBar active={active} onLogo={() => go("welcome")} lang={lang} changeLang={changeLang} />
        <main key={active + "-" + lang} style={{ animation: "pageIn .35s ease" }}>{view}</main>
        <BottomNav active={active} onChange={go} />
        <ConciergeBubble onClick={() => setChatOpen(true)} />
        <ConciergePanel
          key={"chat-" + lang}
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          openContact={() => { setChatOpen(false); go("contact"); }}
        />
      </div>

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Palette">
            <window.TweakRadio
              label="Mood"
              value={tweaks.palette}
              onChange={(v) => setTweak("palette", v)}
              options={[
                { value: "warm", label: "Warm" },
                { value: "canal", label: "Canal" },
                { value: "cathedral", label: "Dusk" },
              ]}
            />
          </window.TweakSection>
          <window.TweakSection label="Typography">
            <window.TweakSelect
              label="Display serif"
              value={tweaks.displayFont}
              onChange={(v) => setTweak("displayFont", v)}
              options={Object.keys(FONTS).map((k) => ({ value: k, label: FONTS[k].label }))}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}

      <style>{`@keyframes pageIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: none; }
      }`}</style>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
