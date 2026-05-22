import { useState } from "react"

const GOLD = "#C9A84C"
const PASSWORD = "alpharoom2025"

export default function Lock({ onUnlock }) {
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  function attempt() {
    if (input === PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setInput("")
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060606", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
        .shake { animation: shake 0.45s ease; }
        input { outline: none; }
        input::placeholder { color: #444; }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <polygon points="16,2 30,30 2,30" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round"/>
          <line x1="8.5" y1="22" x2="23.5" y2="22" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "3px" }}>
          <span style={{ color: GOLD }}>THE ALPHA</span>
          <span style={{ color: "#fff", marginLeft: 6 }}>ROOM</span>
        </div>
      </div>
      <div className={shake ? "shake" : ""} style={{ width: "100%", maxWidth: 340, background: "#111", border: "0.5px solid #242424", borderRadius: 20, padding: "32px 24px" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6, textAlign: "center" }}>Members Only</div>
        <div style={{ fontSize: 13, color: "#555", textAlign: "center", marginBottom: 28 }}>Enter your access code to continue</div>
        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false) }}
          onKeyDown={e => e.key === "Enter" && attempt()}
          placeholder="Access code"
          style={{ width: "100%", background: "#0a0a0a", border: `0.5px solid ${error ? "#f87171" : "#2a2a2a"}`, borderRadius: 12, padding: "14px 16px", fontSize: 15, color: "#fff", fontFamily: "'DM Sans',sans-serif", marginBottom: 10, transition: "border 0.2s" }}
        />
        {erro
