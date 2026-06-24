// ─── AI Concierge ─────────────────────────────────────────
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

const ConciergeBubble = ({ onClick }) => (
  <button onClick={onClick} aria-label="Open concierge" style={{
    position: "fixed", right: "max(16px, calc(50vw - 220px + 16px))", bottom: "calc(78px + env(safe-area-inset-bottom, 0))",
    width: 60, height: 60,
    background: "var(--ink)", color: "var(--paper)",
    border: "1px solid var(--ink)",
    borderRadius: "50%",
    boxShadow: "0 12px 28px -8px rgba(31,24,20,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 60,
  }}>
    <ConciergeMark size={30} />
    <span style={{
      position: "absolute", top: -2, right: -2,
      width: 12, height: 12, borderRadius: "50%",
      background: "var(--terra)",
      border: "2px solid var(--paper)",
    }} />
  </button>
);

// A tiny editorial monogram — Schelde S
const ConciergeMark = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <text x="16" y="22" textAnchor="middle"
      fontFamily="Newsreader, serif" fontStyle="italic" fontWeight="500"
      fontSize="22" fill="currentColor">S</text>
  </svg>
);

const TypingDots = () => (
  <div style={{ display: "inline-flex", gap: 4, padding: "10px 14px" }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--ink-mute)",
        animation: `bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
      }} />
    ))}
    <style>{`@keyframes bounce {
      0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
      30% { opacity: 1; transform: translateY(-3px); }
    }`}</style>
  </div>
);

const SUGGESTIONS = () => [
  window.t('suggest.checkout'),
  window.t('suggest.groceries'),
  window.t('suggest.parking'),
  window.t('suggest.rainy'),
];

const ConciergePanel = ({ open, onClose, openContact }) => {
  const [messages, setMessages] = useStateC([
    { role: "assistant", content: window.t('concierge.greeting') },
  ]);
  const [input, setInput] = useStateC("");
  const [thinking, setThinking] = useStateC(false);
  const [error, setError] = useStateC(null);
  const scrollRef = useRefC(null);
  const inputRef = useRefC(null);

  useEffectC(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 1000;
    }
  }, [messages, thinking]);

  useEffectC(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  const send = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || thinking) return;
    setInput("");
    setError(null);

    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setThinking(true);

    const apiKey = window.APARTMENT.apiKey;

    if (!apiKey) {
      setMessages((m) => [...m, {
        role: "assistant",
        content: window.t('concierge.no_key'),
      }]);
      setThinking(false);
      return;
    }

    const system = window.buildSystemPrompt();
    const apiMessages = next
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const geminiMessages = [
        { role: "user", parts: [{ text: system }] },
        { role: "model", parts: [{ text: "Understood. I am the Scheldepunt concierge. How can I help?" }] },
        ...apiMessages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      ];

      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
          body: JSON.stringify({
            contents: geminiMessages,
            generationConfig: { maxOutputTokens: 1024 },
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I didn't catch that.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error("Concierge error", e);
      setError(window.t('concierge.error'));
    } finally {
      setThinking(false);
    }
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "stretch", justifyContent: "center",
      background: "rgba(31,24,20,0.4)",
      animation: "fade .25s ease",
    }}>
      <div style={{
        width: "100%", maxWidth: 440, background: "var(--paper)",
        display: "flex", flexDirection: "column",
        boxShadow: "0 0 0 1px rgba(31,24,20,0.06)",
        height: "100%",
      }}>
        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "16px 16px 14px",
          borderBottom: "1px solid var(--rule)",
          background: "var(--cream)",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "var(--ink)", color: "var(--paper)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <ConciergeMark size={22} />
            <span style={{
              position: "absolute", right: -2, bottom: -2,
              width: 10, height: 10, borderRadius: "50%",
              background: "#5BA46F",
              border: "2px solid var(--cream)",
            }} />
          </div>
          <div style={{ flex: 1, lineHeight: 1.15 }}>
            <div className="serif" style={{ fontSize: 18 }}>{window.t('concierge.title')}</div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-mute)", textTransform: "uppercase", marginTop: 2 }}>
              {window.t('concierge.subtitle')}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            background: "transparent", border: "1px solid var(--rule)",
            width: 34, height: 34, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="close" size={16} stroke="var(--ink)" />
          </button>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="scroll" style={{
          flex: 1, overflowY: "auto",
          padding: "16px 14px 12px",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          {messages.map((m, i) => (
            <Message key={i} m={m} />
          ))}
          {thinking && (
            <div style={{ alignSelf: "flex-start", maxWidth: "75%" }}>
              <div style={{
                background: "var(--cream-soft)",
                border: "1px solid var(--rule)",
                borderRadius: "16px 16px 16px 4px",
              }}>
                <TypingDots />
              </div>
            </div>
          )}
          {error && (
            <div style={{
              background: "rgba(184,74,44,0.08)", color: "var(--terra-deep)",
              border: "1px solid var(--terra)", padding: "10px 12px",
              fontSize: 13, lineHeight: 1.45,
            }}>
              {error}{" "}
              <button onClick={openContact} style={{
                background: "transparent", border: "none", padding: 0,
                color: "var(--terra-deep)", textDecoration: "underline",
                fontFamily: "inherit", fontSize: "inherit",
              }}>{window.t('concierge.contact_link')}</button>
            </div>
          )}
        </div>

        {/* Suggestions (only when conversation is fresh) */}
        {messages.length <= 1 && !thinking && (
          <div style={{
            padding: "0 14px 8px",
            display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none",
          }}>
            {SUGGESTIONS().map((s) => (
              <button key={s} onClick={() => send(s)} style={{
                whiteSpace: "nowrap", padding: "8px 12px",
                background: "var(--cream)", border: "1px solid var(--rule)",
                color: "var(--ink)", fontFamily: "Newsreader, serif", fontStyle: "italic",
                fontSize: 13.5,
                cursor: "pointer",
              }}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); send(); }} style={{
          padding: "10px 12px max(12px, env(safe-area-inset-bottom)) 12px",
          borderTop: "1px solid var(--rule)",
          background: "var(--paper)",
          display: "flex", gap: 8, alignItems: "flex-end",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            rows={1}
            placeholder={window.t('concierge.placeholder')}
            style={{
              flex: 1, resize: "none",
              padding: "12px 14px",
              border: "1px solid var(--rule)",
              background: "var(--cream)",
              fontSize: 15, lineHeight: 1.4,
              color: "var(--ink)",
              maxHeight: 120, minHeight: 44,
              outline: "none",
              fontFamily: "Geist, sans-serif",
            }}
          />
          <button type="submit" disabled={!input.trim() || thinking} style={{
            width: 44, height: 44, flexShrink: 0,
            background: input.trim() && !thinking ? "var(--ink)" : "var(--rule)",
            color: "var(--paper)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: input.trim() && !thinking ? "pointer" : "default",
          }}>
            <Icon name="send" size={16} stroke="var(--paper)" />
          </button>
        </form>
      </div>
      <style>{`@keyframes fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
};

const Message = ({ m }) => {
  const isUser = m.role === "user";
  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "82%",
      display: "flex", flexDirection: "column",
      alignItems: isUser ? "flex-end" : "flex-start",
    }}>
      <div style={{
        background: isUser ? "var(--ink)" : "var(--cream-soft)",
        color: isUser ? "var(--paper)" : "var(--ink)",
        padding: "11px 14px",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        border: isUser ? "none" : "1px solid var(--rule)",
        fontSize: 14.5, lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        textWrap: "pretty",
      }}>
        {m.content}
      </div>
    </div>
  );
};

window.ConciergeBubble = ConciergeBubble;
window.ConciergePanel = ConciergePanel;
