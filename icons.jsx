// Simple stroke icons — geometric, editorial. No emoji.
const Icon = ({ name, size = 20, stroke = "currentColor", strokeWidth = 1.6 }) => {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "home":
      return <svg {...common}><path d="M4 11.5 12 5l8 6.5"/><path d="M6 10.5V19h12v-8.5"/></svg>;
    case "key":
      return <svg {...common}><circle cx="8" cy="14" r="3.5"/><path d="M10.5 11.5 20 4"/><path d="m17 7 2 2"/><path d="m15 9 2 2"/></svg>;
    case "wifi":
      return <svg {...common}><path d="M3 9.5a14 14 0 0 1 18 0"/><path d="M6.5 13a9 9 0 0 1 11 0"/><path d="M10 16.5a4 4 0 0 1 4 0"/><circle cx="12" cy="19.5" r="0.6" fill={stroke} stroke="none"/></svg>;
    case "map":
      return <svg {...common}><path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14"/><path d="M15 6v14"/></svg>;
    case "compass":
      return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5.5-5 2 2-5.5 5-2Z"/></svg>;
    case "book":
      return <svg {...common}><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5c-.8 0-1.5-.7-1.5-1.5v-12Z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5v-12Z"/></svg>;
    case "chat":
      return <svg {...common}><path d="M4 5.5C4 4.7 4.7 4 5.5 4h13c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5H10l-4 4v-4H5.5c-.8 0-1.5-.7-1.5-1.5v-9Z"/></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12"/><path d="m18 6-12 12"/></svg>;
    case "send":
      return <svg {...common}><path d="M4 12 20 5l-7 16-2-7-7-2Z"/></svg>;
    case "copy":
      return <svg {...common}><rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5.5C16 4.7 15.3 4 14.5 4h-9C4.7 4 4 4.7 4 5.5v9c0 .8.7 1.5 1.5 1.5H8"/></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4.5 4.5L19 7"/></svg>;
    case "phone":
      return <svg {...common}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>;
    case "pin":
      return <svg {...common}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "star":
      return <svg {...common}><path d="m12 4 2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 17.3 6.8 20l1-5.8-4.3-4.1 5.9-.8L12 4Z"/></svg>;
    case "spark":
      return <svg {...common}><path d="M12 3v6"/><path d="M12 15v6"/><path d="M3 12h6"/><path d="M15 12h6"/><path d="m6 6 3 3"/><path d="m15 15 3 3"/><path d="m18 6-3 3"/><path d="m9 15-3 3"/></svg>;
    default:
      return null;
  }
};

window.Icon = Icon;
