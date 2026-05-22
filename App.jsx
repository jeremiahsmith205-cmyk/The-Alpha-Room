
import { useState, useEffect } from "react";
import Lock from "./Lock.jsx";

const GOLD = "#C9A84C";
const BG = "#0a0a0a";
const CARD = "#181818";
const BORDER = "#242424";
const DISCORD_URL = "https://discord.gg/82TqTRWPx";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060606; font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 0; }
  @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { animation: fadeUp 0.3s ease both; }
  .live-dot { width:7px;height:7px;border-radius:50%;background:#ef4444;animation:livePulse 1.3s infinite;display:inline-block; }
`;

function Badge({ children, color = GOLD, bg = "rgba(201,168,76,0.12)" }) {
  return <span style={{ background: bg, color, fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 20, letterSpacing: "0.6px" }}>{children}</span>;
}

function Card({ children, style = {} }) {
  return <div style={{ background: CARD, border: `0.5px solid ${BORDER}`, borderRadius: 16, padding: "14px 15px", ...style }}>{children}</div>;
}

function SectionLabel({ children }) {
  return <div style={{ padding: "16px 18px 8px", fontSize: 10, color: "#555", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase" }}>{children}</div>;
}

function ChartMockup() {
  const candles = [20,35,50,65,80,95,110,125,140,155,170,185];
  const highs =   [75,70,65,62,58,60,55,52,50,48,45,42];
  const lows =    [60,55,45,50,38,42,35,40,30,25,32,20];
  return (
    <svg width="100%" height="100%" viewBox="0 0 220 100" preserveAspectRatio="none" style={{ opacity: 0.65 }}>
      {candles.map((x, i) => {
        const isGreen = i % 3 !== 0;
        const c = isGreen ? "#4ade80" : "#f87171";
        return (
          <g key={i}>
            <line x1={x+4} y1={lows[i]-6} x2={x+4} y2={highs[i]+5} stroke={c} strokeWidth="0.8"/>
            <rect x={x} y={isGreen ? highs[i] : lows[i]} width={8} height={Math.abs(highs[i]-lows[i])} fill={c} rx="1"/>
          </g>
        );
      })}
      <line x1="0" y1="55" x2="220" y2="35" stroke={GOLD} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5"/>
    </svg>
  );
}

function LiveScreen() {
  const [secs, setSecs] = useState(8*3600+30*60);
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s > 0 ? s-1 : s), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = n => String(n).padStart(2,"0");
  const h = fmt(Math.floor(secs/3600)), m = fmt(Math.floor((secs%3600)/60)), s = fmt(secs%60);

  // Get today's date string
  const today = new Date();
  const dayStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="fade-up" style={{ paddingBottom: 24 }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(180deg,#130e00 0%,#0a0a0a 100%)", padding: "16px 18px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <span className="live-dot"/>
          <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: "1.5px" }}>LIVE NOW</span>
          <span style={{ marginLeft: "auto", fontSize: 10, color: "#444" }}>{dayStr}</span>
        </div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 3 }}>Morning Market Open</div>
        <div style={{ fontSize: 12, color: "#666" }}>Jeremiah Smith · New York Session</div>
      </div>

      {/* ── Live Chart ── */}
      <div style={{ margin: "12px 18px 0", background: "#0d1117", borderRadius: 16, border: `0.5px solid ${BORDER}`, overflow: "hidden" }}>
        <div style={{ height: 165, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <ChartMockup/>
          <div style={{ position: "absolute", top: 10, right: 12, background: "rgba(0,0,0,0.6)", borderRadius: 8, padding: "4px 9px", fontSize: 11, color: "#aaa" }}>ES1! · 5m</div>
          <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", gap: 6, alignItems: "center" }}>
            <span className="live-dot" style={{ width: 5, height: 5 }}/>
            <span style={{ fontSize: 10, color: GOLD, fontWeight: 600 }}>LIVE CHART</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, padding: "11px 15px", borderTop: `0.5px solid ${BORDER}` }}>
          {[["BIAS","Bullish","#4ade80"],["KEY LEVEL","5,342","#fff"],["SESSION","NY Open",GOLD],["VIEWERS","247","#666"]].map(([l,v,c]) => (
            <div key={l}><div style={{ fontSize: 9, color: "#555", marginBottom: 2 }}>{l}</div><div style={{ fontSize: 13, fontWeight: 600, color: c }}>{v}</div></div>
          ))}
        </div>
      </div>

      {/* ── Session Countdown ── */}
      <div style={{ margin: "10px 18px 14px" }}>
        <Card style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, background: `${GOLD}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>⏱</div>
          <div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>Next live session</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: GOLD, letterSpacing: "2px" }}>{h}:{m}:{s}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ background: GOLD, borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 700, color: "#000", cursor: "pointer", textAlign: "center" }} onClick={() => window.open(DISCORD_URL, "_blank")}>Join Live</div>
              <div style={{ fontSize: 9, color: "#444", textAlign: "center", letterSpacing: "0.5px" }}>Opens Discord</div>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Daily Strategy Brief ── */}
      <div style={{ margin: "0 18px 14px", background: "#0d0d0d", border: `0.5px solid ${GOLD}33`, borderRadius: 14, padding: "13px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
            <span style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: "1.2px" }}>TODAY'S FOCUS · FAILED CONTINUATION</span>
          </div>
          <div style={{ background: "#0f2e1a", border: "0.5px solid #4ade8033", borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: "#4ade80" }}>29/30 GREEN</div>
        </div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
          The Alpha Room 📈 Failed Continuation Play
        </div>
        <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6, marginBottom: 12 }}>
          Targeting the <span style={{ color: GOLD, fontWeight: 600 }}>10:00 AM price reversal</span> phenomenon using two institutional opening ranges. A <span style={{ color: "#a78bfa", fontWeight: 600 }}>Fair Value Gap</span> pushes price out of whichever range is in play — then an <span style={{ color: "#60a5fa", fontWeight: 600 }}>FVG inversion</span> around 10 AM signals the failed continuation. Monitor both <span style={{ color: "#34d399", fontWeight: 600 }}>ES (S&P 500)</span> and <span style={{ color: "#34d399", fontWeight: 600 }}>YM (Dow Jones)</span> simultaneously and take whichever ticker gives the cleaner setup.
        </div>

        {/* Dual range pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, background: `${GOLD}12`, border: `0.5px solid ${GOLD}44`, borderRadius: 10, padding: "9px 10px" }}>
            <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: "0.8px", marginBottom: 3 }}>8:15 RANGE</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>8:00 – 8:15</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>Pre-market range</div>
          </div>
          <div style={{ flex: 1, background: "#60a5fa12", border: "0.5px solid #60a5fa44", borderRadius: 10, padding: "9px 10px" }}>
            <div style={{ fontSize: 9, color: "#60a5fa", fontWeight: 700, letterSpacing: "0.8px", marginBottom: 3 }}>9:45 RANGE</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>9:30 – 9:45</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>NY open range</div>
          </div>
          <div style={{ flex: 1, background: "#34d39912", border: "0.5px solid #34d39944", borderRadius: 10, padding: "9px 10px" }}>
            <div style={{ fontSize: 9, color: "#34d399", fontWeight: 700, letterSpacing: "0.8px", marginBottom: 3 }}>WATCH</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>ES · YM</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>Best setup wins</div>
          </div>
        </div>

        <div style={{ fontSize: 10, color: "#555", fontWeight: 600, letterSpacing: "0.8px", marginBottom: 7 }}>CONFLUENCE CHECKLIST</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "Mark 8:15 institutional range (8:00–8:15)", color: GOLD },
            { label: "Mark 9:45 institutional range (9:30–9:45)", color: "#60a5fa" },
            { label: "FVG pushes price out of active range", color: "#a78bfa" },
            { label: "10 AM reversal window open", color: "#f472b6" },
            { label: "FVG inversion confirmed at reversal", color: "#34d399" },
            { label: "Cleaner setup: ES (S&P 500) or YM (Dow)?", color: "#fb923c" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, background: `${item.color}20`, border: `0.5px solid ${item.color}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 8, color: item.color }}>✓</span>
              </div>
              <span style={{ fontSize: 11, color: "#aaa" }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ height: "0.5px", background: "#1e1e1e", margin: "12px 0" }} />
        <div style={{ display: "flex" }}>
          {[
            { label: "SETUP", value: "A+ Only", color: GOLD },
            { label: "WINDOW", value: "~10:00 AM", color: "#60a5fa" },
            { label: "RECORD", value: "29-1 (30d)", color: "#4ade80" },
          ].map((stat, i, arr) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < arr.length-1 ? `0.5px solid #1e1e1e` : "none" }}>
              <div style={{ fontSize: 9, color: "#555", marginBottom: 3, letterSpacing: "0.6px" }}>{stat.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>Session Replays</SectionLabel>
      {[
        { title: "NY Open — ES Liquidity Sweep", date: "Today", dur: "47m" },
        { title: "Pre-Market Bias + Key Levels", date: "Yesterday", dur: "22m" },
        { title: "Gold Setup Breakdown", date: "Mon", dur: "31m" },
      ].map((r,i) => (
        <div key={i} style={{ margin: "0 18px 9px" }}>
          <Card style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <div style={{ width: 52, height: 40, background: "#111", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `0.5px solid ${BORDER}` }}>
              <span style={{ fontSize: 16, color: GOLD }}>▶</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#ddd", marginBottom: 2 }}>{r.title}</div>
              <div style={{ fontSize: 11, color: "#555" }}>{r.date}</div>
            </div>
            <div style={{ fontSize: 11, color: "#555" }}>{r.dur}</div>
          </Card>
        </div>
      ))}
    </div>
  );
}

// ── Mentor Profiles ───────────────────────────────────────────────────────────
const MENTORS = {
  "ORB Sniper": {
    fullName: "Marcus Cole",
    title: "Breakout Specialist",
    bio: "Ex-prop trader. 6 years mastering the NY open. Lives for the 9:30 candle.",
    color: "#a78bfa",
    photo: "data:image/jpeg;base64,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",
    fallback: "https://i.pravatar.cc/150?img=12",
    accent: "#1a1030",
    stats: { winRate: "84%", trades: 1240, specialty: "NQ · ES" },
  },
  "Gold Guru": {
    fullName: "Rajan Mehta",
    title: "XAUUSD · Metals Expert",
    bio: "20 years trading commodities. Gold is his language. Patience is his edge.",
    color: GOLD,
    photo: "data:image/jpeg;base64,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",
    fallback: "https://i.pravatar.cc/150?img=51",
    accent: "#1a1400",
    stats: { winRate: "91%", trades: 3800, specialty: "XAUUSD · Silver" },
  },
  "Momentum Mike": {
    fullName: "Devon Williams",
    title: "Momentum & Scalp Trader",
    bio: "High-energy, high-conviction. If the market moves, Devon's already in it.",
    color: "#34d399",
    photo: "data:image/jpeg;base64,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",
    fallback: "https://i.pravatar.cc/150?img=8",
    accent: "#061a10",
    stats: { winRate: "78%", trades: 2100, specialty: "ES · Crypto" },
  },
  "Macro Max": {
    fullName: "Ethan Cross",
    title: "Macro · Forex · News Flow",
    bio: "Former institutional analyst. Reads the macro like a roadmap. Never surprised.",
    color: "#60a5fa",
    photo: "data:image/jpeg;base64,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",
    fallback: "https://i.pravatar.cc/150?img=53",
    accent: "#050d1a",
    stats: { winRate: "86%", trades: 980, specialty: "Forex · Indices" },
  },
  "Scalp Queen": {
    fullName: "Zara Voss",
    title: "Precision Scalp Specialist",
    bio: "Fastest entries in the room. Sub-minute setups. Zero hesitation, all execution.",
    color: "#f472b6",
    photo: "data:image/jpeg;base64,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",
    fallback: "https://i.pravatar.cc/150?img=47",
    accent: "#1a0520",
    stats: { winRate: "82%", trades: 5600, specialty: "NQ · Scalps" },
  },
};

function MentorAvatar({ mentor, size = 38 }) {
  const m = MENTORS[mentor];
  if (!m) return null;
  const sources = [m.photo, m.fallback].filter(Boolean);
  const [srcIndex, setSrcIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const initials = m.fullName.split(" ").map(w => w[0]).join("");
  const currentSrc = sources[srcIndex];

  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${m.color}66`, background: m.accent, position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.floor(size * 0.3), fontWeight: 700, color: m.color, letterSpacing: "0.5px" }}>
        {initials}
      </div>
      {currentSrc && (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={m.fullName}
          crossOrigin="anonymous"
          onLoad={() => setLoaded(true)}
          onError={() => { if (srcIndex < sources.length - 1) setSrcIndex(i => i + 1); }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: loaded ? 1 : 0, transition: "opacity 0.35s ease" }}
        />
      )}
    </div>
  );
}

function SignalsScreen() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const signals = [
    { asset: "NQ1!", dir: "BUY", strategy: "ORB Breakout", entry: "18,420", sl: "18,380", tp: "18,520", mentor: "ORB Sniper", conf: 88, time: "2m ago", note: "Clean break above pre-market high. Volume confirming. Targeting HOD." },
    { asset: "XAUUSD", dir: "BUY", strategy: "FVG Rejection", entry: "2,318.50", sl: "2,308.00", tp: "2,342.00", mentor: "Gold Guru", conf: 92, time: "11m ago", note: "FVG filled at 4H demand. DXY weakening. Gold historically runs into NY open." },
    { asset: "ES1!", dir: "SELL", strategy: "Liquidity Sweep", entry: "5,342", sl: "5,360", tp: "5,298", mentor: "Momentum Mike", conf: 75, time: "28m ago", note: "Swept buy-side liquidity at 5,348. BOS to downside on 15m. Riding the flush." },
    { asset: "EURUSD", dir: "BUY", strategy: "BOS Retest", entry: "1.0842", sl: "1.0820", tp: "1.0890", mentor: "Macro Max", conf: 81, time: "1h ago", note: "ECB dovish pivot priced in. Structure shifted bullish. Retest of broken structure." },
    { asset: "NQ1!", dir: "SELL", strategy: "Scalp — Rejection Wick", entry: "18,390", sl: "18,415", tp: "18,340", mentor: "Scalp Queen", conf: 85, time: "3m ago", note: "Wick into supply. Fast rejection. 1:2 scalp. In and out in under 4 minutes." },
  ];

  const allMentorKeys = Object.keys(MENTORS);

  return (
    <div className="fade-up" style={{ paddingBottom: 24 }}>
      <div style={{ padding: "16px 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700 }}>Signal Feed</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#555" }}><span className="live-dot" style={{ width: 5, height: 5 }}/> AI Active</div>
      </div>

      <div style={{ display: "flex", gap: 7, padding: "0 18px 14px", overflowX: "auto" }}>
        {["All","Futures","Gold","Forex","Crypto"].map(f => (
          <div key={f} onClick={() => setFilter(f)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: `0.5px solid ${filter===f ? `${GOLD}55` : BORDER}`, color: filter===f ? GOLD : "#555", background: filter===f ? `${GOLD}10` : "transparent", whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0 }}>{f}</div>
        ))}
      </div>

      {/* AI Mentor Roster */}
      <div style={{ margin: "0 18px 16px", background: "#111", borderRadius: 16, padding: "14px", border: `0.5px solid ${BORDER}` }}>
        <div style={{ fontSize: 10, color: "#555", fontWeight: 600, letterSpacing: "1px", marginBottom: 12 }}>MENTOR TEAM</div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 2 }}>
          {allMentorKeys.map(key => {
            const m = MENTORS[key];
            return (
              <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, cursor: "pointer" }}>
                <div style={{ position: "relative" }}>
                  <MentorAvatar mentor={key} size={52}/>
                  <div style={{ position: "absolute", bottom: 1, right: 1, width: 12, height: 12, borderRadius: "50%", background: "#4ade80", border: "2px solid #111" }}/>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#ddd", fontWeight: 600, whiteSpace: "nowrap" }}>{m.fullName.split(" ")[0]}</div>
                  <div style={{ fontSize: 8, color: m.color, fontWeight: 500, whiteSpace: "nowrap" }}>{key}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {signals.map((s,i) => {
        const m = MENTORS[s.mentor];
        const isOpen = expanded === i;
        return (
          <div key={i} style={{ margin: "0 18px 10px" }}>
            <Card style={{ cursor: "pointer" }} >
              {/* Mentor header */}
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12, paddingBottom: 11, borderBottom: `0.5px solid ${BORDER}` }}>
                <MentorAvatar mentor={s.mentor} size={48}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 1 }}>{m.fullName}</div>
                  <div style={{ fontSize: 10, color: m.color, fontWeight: 600, marginBottom: 2 }}>{m.title}</div>
                  <div style={{ fontSize: 10, color: "#555" }}>{s.time} · {m.stats.specialty}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                  <div style={{ padding: "4px 11px", borderRadius: 7, fontSize: 11, fontWeight: 700, background: s.dir==="BUY" ? "#0f2e1a" : "#2e0f0f", color: s.dir==="BUY" ? "#4ade80" : "#f87171", border: `0.5px solid ${s.dir==="BUY" ? "#4ade8033" : "#f8717133"}` }}>{s.dir}</div>
                  <div style={{ fontSize: 10, color: "#555" }}>Win rate: <span style={{ color: m.color, fontWeight: 600 }}>{m.stats.winRate}</span></div>
                </div>
              </div>

              {/* Signal body */}
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{s.asset}</div>
              <div style={{ fontSize: 11, color: GOLD, fontWeight: 500, marginBottom: 10 }}>{s.strategy}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: 10 }}>
                {[["Entry",s.entry,"#ddd"],["Take Profit",s.tp,"#4ade80"],["Stop Loss",s.sl,"#f87171"]].map(([l,v,c]) => (
                  <div key={l} style={{ background: "#111", borderRadius: 9, padding: "7px 8px" }}>
                    <div style={{ fontSize: 9, color: "#555", marginBottom: 2 }}>{l.toUpperCase()}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: c }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Mentor note */}
              <div style={{ background: `${m.color}0d`, borderLeft: `2px solid ${m.color}66`, borderRadius: "0 8px 8px 0", padding: "8px 10px", marginBottom: 10, fontSize: 11, color: "#aaa", lineHeight: 1.5 }}>
                <span style={{ color: m.color, fontWeight: 600 }}>{m.fullName.split(" ")[0]}:</span> {s.note}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555", marginBottom: 4 }}><span>Confidence</span><span style={{ color: GOLD, fontWeight: 600 }}>{s.conf}%</span></div>
              <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.conf}%`, background: `linear-gradient(90deg, ${m.color}99, ${GOLD})`, borderRadius: 2 }}/>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

function AcademyScreen() {
  const tiers = [
    { name: "Beginner", desc: "Foundations & platform setup", lessons: 14, icon: "🌱", color: "#4ade80", bg: "#0f2e1a", status: "done", progress: 100 },
    { name: "Intermediate", desc: "Market structure & strategy", lessons: 12, icon: "📈", color: GOLD, bg: "#2e1f0a", status: "active", progress: 62 },
    { name: "Expert", desc: "Advanced execution & psychology", lessons: 10, icon: "👑", color: "#a78bfa", bg: "#1a1030", status: "locked", progress: 0 },
  ];
  return (
    <div className="fade-up" style={{ paddingBottom: 24 }}>
      <div style={{ padding: "16px 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700 }}>Academy</div>
        <Badge color={GOLD}>Intermediate</Badge>
      </div>
      <div style={{ margin: "0 18px 14px", background: "#111", borderRadius: 16, padding: 17, border: `0.5px solid ${BORDER}` }}>
        <div style={{ fontSize: 10, color: GOLD, fontWeight: 600, letterSpacing: "1px", marginBottom: 6 }}>YOUR PROGRESS</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 10 }}>Opening Range Breakouts</div>
        <div style={{ height: 5, background: "#1a1a1a", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ height: "100%", width: "62%", background: GOLD, borderRadius: 3 }}/>
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>7 of 12 lessons complete · 62%</div>
      </div>
      <SectionLabel>Learning Tracks</SectionLabel>
      {tiers.map((t,i) => (
        <div key={i} style={{ margin: "0 18px 10px" }}>
          <Card style={{ display: "flex", gap: 13, opacity: t.status==="locked" ? 0.55 : 1 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{t.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#eee" }}>{t.name}</div>
                {t.status==="done" && <Badge color="#4ade80" bg="#0f2e1a">✓ Done</Badge>}
                {t.status==="active" && <Badge color={GOLD} bg="#2e1f0a">In Progress</Badge>}
                {t.status==="locked" && <Badge color="#a78bfa" bg="#1a1030">🔒 Locked</Badge>}
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 6 }}>{t.desc}</div>
              {t.status!=="locked" && (
                <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
                  <div style={{ height: "100%", width: `${t.progress}%`, background: t.color, borderRadius: 2 }}/>
                </div>
              )}
              <div style={{ fontSize: 10, color: "#555" }}>{t.lessons} lessons</div>
            </div>
          </Card>
        </div>
      ))}
      <SectionLabel>Recent Lessons</SectionLabel>
      {["Fair Value Gaps Explained","Break of Structure (BOS)","ORB Entry Timing"].map((l,i) => (
        <div key={i} style={{ margin: "0 18px 9px" }}>
          <Card style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${GOLD}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📚</div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#ddd" }}>{l}</div>
            <span style={{ color: "#333", fontSize: 16 }}>›</span>
          </Card>
        </div>
      ))}
    </div>
  );
}

function CommunityScreen() {
  const wins = [
    { user: "Alex R.", initials: "AR", color: "#a78bfa", time: "2h ago", caption: "ES long from 5,318 — took 22pts clean off the ORB.", pnl: "+$880" },
    { user: "Maria K.", initials: "MK", color: "#34d399", time: "5h ago", caption: "Gold long from 2,305 — held for 180 pips overnight.", pnl: "+$1,440" },
    { user: "Devon T.", initials: "DT", color: "#60a5fa", time: "8h ago", caption: "NQ BOS retest into FVG. Snapped 35pts. Clean setup.", pnl: "+$700" },
  ];
  return (
    <div className="fade-up" style={{ paddingBottom: 24 }}>
      <div style={{ padding: "16px 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700 }}>Community</div>
        <Badge color="#4ade80" bg="#0f2e1a">247 Online</Badge>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, margin: "0 18px 14px" }}>
        {[["$4.2K","Your P&L"],["14","Day streak 🔥"],["3","Referrals"],["#12","Leaderboard"]].map(([v,l]) => (
          <div key={l} style={{ background: CARD, border: `0.5px solid ${BORDER}`, borderRadius: 14, padding: "13px 14px" }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: GOLD }}>{v}</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <SectionLabel>Recent Wins</SectionLabel>
      {wins.map((w,i) => (
        <div key={i} style={{ margin: "0 18px 10px" }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${w.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: w.color, flexShrink: 0 }}>{w.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#ddd" }}>{w.user}</div>
                <div style={{ fontSize: 11, color: "#444" }}>{w.time}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#4ade80" }}>{w.pnl}</div>
            </div>
            <div style={{ height: 90, background: "#0d1117", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, border: `0.5px solid ${BORDER}`, overflow: "hidden" }}>
              <ChartMockup/>
            </div>
            <div style={{ fontSize: 12, color: "#777" }}>{w.caption} <span style={{ color: "#4ade80", fontWeight: 600 }}>{w.pnl}</span></div>
          </Card>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen() {
  const menu = [
    { icon: "🔔", label: "Notifications", bg: "#2e1f0a" },
    { icon: "🎁", label: "Referral Program", bg: "#0f2e1a" },
    { icon: "💳", label: "Subscription · $150/mo", bg: "#1a1030" },
    { icon: "🛡️", label: "Security", bg: "#2e0f0f" },
    { icon: "❓", label: "Support", bg: "#161616" },
  ];
  return (
    <div className="fade-up" style={{ paddingBottom: 24 }}>
      <div style={{ padding: "24px 18px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: `${GOLD}18`, border: `2px solid ${GOLD}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 12 }}>👤</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 3 }}>Jeremiah Smith</div>
        <div style={{ fontSize: 12, color: GOLD, fontWeight: 500 }}>Premium Member · Expert Track</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "0 18px 16px" }}>
        {[["86%","Win Rate"],["47","Sessions"],["3","Referrals"]].map(([v,l]) => (
          <div key={l} style={{ background: CARD, border: `0.5px solid ${BORDER}`, borderRadius: 13, padding: 10, textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700 }}>{v}</div>
            <div style={{ fontSize: 10, color: "#555" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: "0 18px 12px", background: CARD, border: `0.5px solid ${BORDER}`, borderRadius: 16, overflow: "hidden" }}>
        {menu.map((m,i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderBottom: i<menu.length-1 ? `0.5px solid ${BORDER}` : "none", cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{m.icon}</div>
            <div style={{ flex: 1, fontSize: 14, color: "#ccc" }}>{m.label}</div>
            <span style={{ color: "#333", fontSize: 18 }}>›</span>
          </div>
        ))}
      </div>
      <div style={{ margin: "0 18px", padding: 14, background: "#2e0f0f", border: `0.5px solid #f8717122`, borderRadius: 14, textAlign: "center", cursor: "pointer", fontSize: 13, color: "#f87171", fontWeight: 500 }}>Sign Out</div>
    </div>
  );
}

const TABS = [
  { label: "Live", icon: "▶" },
  { label: "Signals", icon: "⚡" },
  { label: "Academy", icon: "🎓" },
  { label: "Community", icon: "👥" },
  { label: "Profile", icon: "◎" },
];

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState(0);
  const [key, setKey] = useState(0);

  if (!unlocked) return <Lock onUnlock={() => setUnlocked(true)} />;

  function switchTab(i) { setTab(i); setKey(k => k+1); }

  const screens = [<LiveScreen key={key}/>, <SignalsScreen key={key}/>, <AcademyScreen key={key}/>, <CommunityScreen key={key}/>, <ProfileScreen key={key}/>];

  return (
    <>
      <style>{styles}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#060606", padding: 16 }}>
        <div style={{ width: 370, background: BG, borderRadius: 44, border: `1.5px solid #222`, overflow: "hidden", display: "flex", flexDirection: "column", height: 720, boxShadow: "0 40px 80px rgba(0,0,0,0.85)" }}>
          {/* Status bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 22px 2px", fontSize: 11, color: "#555" }}>
            <span>9:41</span>
            <div style={{ width: 80, height: 18, background: "#111", borderRadius: 20, border: `0.5px solid #222` }}/>
            <span>⋯</span>
          </div>
          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0 2px", gap: 7 }}>
            {/* Alpha mark — geometric A with gold crossbar */}
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 30,30 2,30" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round"/>
              <line x1="8.5" y1="22" x2="23.5" y2="22" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            {/* Wordmark text */}
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "3px", display: "flex", alignItems: "baseline", gap: 0 }}>
              <span style={{ color: GOLD }}>THE ALPHA</span>
              <span style={{ color: "#fff", marginLeft: 5 }}>ROOM</span>
            </div>
          </div>
          {/* Screen */}
          <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
            {screens[tab]}
          </div>
          {/* Nav */}
          <div style={{ display: "flex", background: "#0d0d0d", borderTop: `0.5px solid #1e1e1e`, paddingBottom: 10 }}>
            {TABS.map((t,i) => (
              <button key={i} onClick={() => switchTab(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "9px 0 4px", background: "none", border: "none", cursor: "pointer" }}>
                <span style={{ fontSize: 18, opacity: tab===i ? 1 : 0.3 }}>{t.icon}</span>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.4px", color: tab===i ? GOLD : "#444" }}>{t.label.toUpperCase()}</span>
                {tab===i && <div style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD }}/>}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 10, color: "#2a2a2a", letterSpacing: "1.5px" }}>THE ALPHA ROOM · PROTOTYPE v1</div>
      </div>
    </>
  );
}
