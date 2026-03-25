"use client";
import { useState, useEffect, useRef } from "react";

/* ═══ HOOKS ═══════════════════════════════════════════════ */
function useReveal(th = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th });
    o.observe(el); return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

function R({ children, d = 0 }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${d}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${d}s` }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useReveal();
  useEffect(() => {
    if (!vis) return;
    const n = parseInt(end);
    if (isNaN(n)) return;
    let s = 0;
    const t = () => { s += Math.ceil(n / 35); if (s >= n) { setVal(n); return; } setVal(s); requestAnimationFrame(t); };
    requestAnimationFrame(t);
  }, [vis, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx];
    const timer = setTimeout(() => {
      if (!del) { setText(w.slice(0, text.length + 1)); if (text.length + 1 === w.length) setTimeout(() => setDel(true), 2200); }
      else { setText(w.slice(0, text.length - 1)); if (text.length === 0) { setDel(false); setIdx((idx + 1) % words.length); } }
    }, del ? 35 : 75);
    return () => clearTimeout(timer);
  }, [text, del, idx, words]);
  return (
    <span style={{ background: "linear-gradient(135deg, #7C5CFC, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {text}<span style={{ WebkitTextFillColor: "#7C5CFC", animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
}

/* ═══ PALETTE ═════════════════════════════════════════════ */
const V = "#7C5CFC", VL = "#A78BFA", VD = "#5B3FD9";
const DIM = "rgba(124,92,252,0.08)", MED = "rgba(124,92,252,0.18)", GLO = "rgba(124,92,252,0.30)";
const BG = "#06060A", S1 = "#0C0C14", S2 = "#121220", BD = "#1C1C30", BDL = "#28284A";
const TX = "#EEEEF5", T2 = "#9898B8", T3 = "#5E5E80";
const OK = "#34D399", WN = "#FBBF24", DN = "#F87171";
const hd = "'Sora', sans-serif", bd = "'DM Sans', sans-serif";

/* ═══ SIGNAL FEED ═════════════════════════════════════════ */
const allSigs = [
  { co: "Series B Fintech — London", role: "VP Engineering + 3 Backend", u: "high", t: "3 min ago" },
  { co: "AI Startup (Series A) — SF", role: "Head of ML + 2 Research", u: "high", t: "11 min ago" },
  { co: "SaaS Scale-up — Austin", role: "CTO + 4 Full-Stack", u: "med", t: "28 min ago" },
  { co: "ERP Consultancy — Berlin", role: "SAP Architect + 2 ABAP", u: "med", t: "1 hr ago" },
  { co: "HealthTech Series C — NYC", role: "VP Product + 3 Engineers", u: "high", t: "5 min ago" },
  { co: "Cyber Insurance — London", role: "CISO + 2 SecOps", u: "high", t: "18 min ago" },
  { co: "DevTools Seed — Remote", role: "Founding Engineer x2", u: "med", t: "42 min ago" },
];

function SignalFeed() {
  const [sigs, setSigs] = useState(allSigs.slice(0, 4));
  const [flash, setFlash] = useState(-1);
  const ct = useRef(4);
  useEffect(() => {
    const int = setInterval(() => {
      const next = allSigs[ct.current % allSigs.length];
      setSigs(prev => [{ ...next, t: "just now" }, ...prev.slice(0, 3)]);
      setFlash(0); setTimeout(() => setFlash(-1), 700); ct.current++;
    }, 3500);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ background: S1, border: `1px solid ${BD}`, borderRadius: 16, overflow: "hidden", width: "100%", maxWidth: 400, boxShadow: `0 12px 80px rgba(0,0,0,0.6), 0 0 60px ${DIM}` }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BD}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(124,92,252,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: OK, boxShadow: `0 0 10px ${OK}`, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, color: T2, letterSpacing: 1.5, textTransform: "uppercase" }}>Live Signals</span>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {[DN, WN, OK].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />)}
        </div>
      </div>
      {sigs.map((s, i) => (
        <div key={s.co + i} style={{ padding: "14px 20px", borderBottom: i < sigs.length - 1 ? `1px solid ${BD}` : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, background: i === flash ? "rgba(124,92,252,0.06)" : "transparent", transition: "background 0.5s", animation: i === 0 ? "slideDown 0.4s ease" : "none" }}>
          <div>
            <div style={{ fontFamily: bd, fontSize: 13, fontWeight: 600, color: TX, marginBottom: 3 }}>{s.co}</div>
            <div style={{ fontFamily: bd, fontSize: 11.5, color: T2 }}>{s.role}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: bd, fontSize: 9.5, fontWeight: 700, color: s.u === "high" ? OK : WN, background: s.u === "high" ? "rgba(52,211,153,0.1)" : "rgba(251,191,36,0.1)", padding: "2px 8px", borderRadius: 4, marginBottom: 3, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.u === "high" ? "● High" : "● Medium"}</div>
            <div style={{ fontFamily: bd, fontSize: 10, color: T3 }}>{s.t}</div>
          </div>
        </div>
      ))}
      <div style={{ padding: "12px 20px", background: DIM, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: V, animation: "pulse 1.5s infinite" }} />
        <span style={{ fontFamily: bd, fontSize: 11, color: VL, fontWeight: 600 }}>Scanning 290+ sources · Matching to ICP</span>
      </div>
    </div>
  );
}

/* ═══ GLOW CARD ═══════════════════════════════════════════ */
function GC({ children, color = V }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", borderRadius: 14, padding: 1, background: hover ? `linear-gradient(135deg, ${color}40, ${color}10, ${color}30)` : BD, transition: "all 0.5s" }}>
      <div style={{ background: S1, borderRadius: 13, height: "100%", overflow: "hidden", transition: "box-shadow 0.5s", boxShadow: hover ? `0 0 40px ${color}15` : "none" }}>
        {children}
      </div>
    </div>
  );
}

/* ═══ DATA ════════════════════════════════════════════════ */
const steps = [
  { n: "01", t: "Detect", d: "We monitor funding events, leadership changes, product launches, and job posting velocity — identifying companies about to hire 2–4 weeks before roles go public.", c: VL, icon: "◉" },
  { n: "02", t: "Curate", d: "Every signal is scored and matched to specialist recruitment agencies by vertical, geography, and company stage. No firehose. Only introductions worth making.", c: OK, icon: "◈" },
  { n: "03", t: "Connect", d: "Warm, two-sided introductions. The agency gets a pre-qualified client. The company gets a specialist recruiter. Both sides know the other is coming.", c: WN, icon: "◎" },
];

const verts = [
  { icon: "⬡", name: "AI & ML", d: "Series A–C AI companies need specialist recruiters for ML engineering, research, and infrastructure roles.", c: "#818CF8" },
  { icon: "◈", name: "Fintech", d: "Regulated, fast-moving. We match fintech scale-ups with agencies who know compliance and payments.", c: OK },
  { icon: "▣", name: "ERP & SAP", d: "Enterprise ERP hiring needs deep vertical knowledge. We match companies with agencies who have that bench.", c: WN },
  { icon: "△", name: "SaaS", d: "Growth-stage SaaS companies burn headcount fast. We connect them with recruiters in the SaaS cycle.", c: "#F472B6" },
];

const rows = [
  ["Signal lead time", "2–4 weeks early", "After posting", "After posting"],
  ["Introduction quality", "Warm, curated", "Cold match", "Cold email"],
  ["Both sides vetted", "✓", "✗", "✗"],
  ["Vertical match", "AI · Fintech · ERP · SaaS", "Generic", "N/A"],
  ["Your effort", "Show up to the intro", "Filter + pitch", "Full outbound"],
  ["Timing advantage", "Before the job exists", "After 30 agencies", "Random"],
];

const faqs = [
  { q: "How is this different from a recruiter marketplace?", a: "Marketplaces broadcast your role to dozens of agencies. We curate one warm introduction — the right agency for your vertical, stage, and urgency. No bidding wars." },
  { q: "How much does it cost?", a: "Retainer starts at ~$5K/month, or commission tied to closed placements. First step is a 10-minute logic call. No commitment required." },
  { q: "What are hiring signals?", a: "Early indicators a company is about to hire — detected 2–4 weeks before public posts. Funding, leadership changes, product launches, and job posting velocity." },
  { q: "What if I only recruit in one niche?", a: "That's exactly who this is for. The narrower your specialisation, the more valuable the matching. We cover AI/ML, Fintech, ERP/SAP, and SaaS." },
  { q: "How do I get started?", a: "Book a 10-minute logic call. We assess fit — your vertical, ICP, and whether the model aligns. If not, zero pressure." },
];

/* ═══ PAGE ════════════════════════════════════════════════ */
export default function Home() {
  const [sc, setSc] = useState(false);
  const [fq, setFq] = useState(null);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 28px", background: sc ? "rgba(6,6,10,0.88)" : "transparent", backdropFilter: sc ? "blur(20px) saturate(1.4)" : "none", borderBottom: sc ? `1px solid ${BD}` : "1px solid transparent", transition: "all 0.4s" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {/* Replace with <Image src="/logo.png" /> when you add your logo */}
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${V}, ${VD})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${MED}` }}>
              <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, fontFamily: hd, letterSpacing: 1 }}>NM</span>
            </div>
            <span style={{ fontFamily: hd, fontSize: 16, fontWeight: 700, color: TX }}>Namle Media</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["How It Works", "Verticals", "FAQ"].map(t => (
              <a key={t} href={`#${t.toLowerCase().replace(/\s+/g, "-")}`} style={{ fontFamily: bd, fontSize: 13, color: T3, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = TX} onMouseLeave={e => e.target.style.color = T3}>{t}</a>
            ))}
            <a href="#access" style={{ fontFamily: bd, fontSize: 12.5, fontWeight: 700, color: "#fff", background: `linear-gradient(135deg, ${V}, ${VD})`, padding: "10px 24px", borderRadius: 8, textDecoration: "none", boxShadow: `0 2px 20px ${MED}`, transition: "all 0.3s" }}>Access the Routing Layer</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 28px 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)", filter: "blur(60px)", animation: "float1 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,63,217,0.06) 0%, transparent 70%)", filter: "blur(50px)", animation: "float2 10s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${BD} 1px, transparent 1px), linear-gradient(90deg, ${BD} 1px, transparent 1px)`, backgroundSize: "80px 80px", pointerEvents: "none" }} />
        {/* Orbiting particles */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 4, height: 4, borderRadius: "50%", background: V, opacity: 0.3, pointerEvents: "none", animation: "orbit 20s linear infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 3, height: 3, borderRadius: "50%", background: V, opacity: 0.2, pointerEvents: "none", animation: "orbitR 28s linear infinite" }} />

        <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 420px", gap: 48, alignItems: "center" }}>
          <div>
            <R>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,92,252,0.06)", border: `1px solid ${MED}`, borderRadius: 100, padding: "7px 18px 7px 12px", marginBottom: 28, backdropFilter: "blur(8px)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: V, boxShadow: `0 0 10px ${V}` }} />
                <span style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, color: VL, letterSpacing: 0.8, textTransform: "uppercase" }}>Trusted over $1B of routed B2B transactions</span>
              </div>
            </R>
            <R d={0.08}>
              <h1 style={{ fontFamily: hd, fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, color: TX, lineHeight: 1.06, margin: "0 0 8px", letterSpacing: -1.5 }}>The intelligence layer for</h1>
              <div style={{ fontFamily: hd, fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, lineHeight: 1.06, marginBottom: 22, letterSpacing: -1.5, minHeight: "1.3em" }}>
                <Typewriter words={["funded startups", "recruitment agencies", "AI companies", "fintech scale-ups", "SaaS growth teams"]} />
              </div>
            </R>
            <R d={0.16}>
              <p style={{ fontFamily: bd, fontSize: 16.5, color: T2, lineHeight: 1.72, maxWidth: 480, margin: "0 0 36px" }}>
                We detect hiring signals from Series A–C tech companies and make curated, warm introductions to specialist recruitment agencies — before the job is posted.
              </p>
            </R>
            <R d={0.22}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="#access" style={{ fontFamily: bd, fontSize: 14.5, fontWeight: 700, color: "#fff", background: `linear-gradient(135deg, ${V}, ${VD})`, padding: "15px 34px", borderRadius: 10, textDecoration: "none", boxShadow: `0 4px 30px ${GLO}`, transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: 10, position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 40px ${GLO}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 30px ${GLO}`; }}>
                  <span>Access the Routing Layer</span> <span style={{ fontSize: 16 }}>→</span>
                </a>
                <a href="#how-it-works" style={{ fontFamily: bd, fontSize: 14.5, fontWeight: 600, color: T2, padding: "15px 28px", borderRadius: 10, border: `1px solid ${BD}`, textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.target.style.borderColor = BDL; e.target.style.color = TX; }}
                  onMouseLeave={e => { e.target.style.borderColor = BD; e.target.style.color = T2; }}>See how it works</a>
              </div>
            </R>
            <R d={0.32}>
              <div style={{ display: "flex", gap: 44, marginTop: 52 }}>
                {[{ end: 2, s: "–4 wk", l: "Signal lead" }, { end: 4, s: "", l: "Verticals" }, { end: 290, s: "+", l: "Sources" }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: hd, fontSize: 24, fontWeight: 800, background: `linear-gradient(135deg, ${V}, ${VL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}><Counter end={s.end} suffix={s.s} /></div>
                    <div style={{ fontFamily: bd, fontSize: 10.5, color: T3, letterSpacing: 1.2, textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </R>
          </div>
          <R d={0.15}><SignalFeed /></R>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", animation: "bounce 2.5s infinite" }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: `2px solid ${BD}`, display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div style={{ width: 3, height: 8, borderRadius: 2, background: V, animation: "scrollDot 2s infinite" }} />
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <div style={{ padding: "40px 28px", borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <R><p style={{ fontFamily: bd, fontSize: 11, color: T3, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>Companies and agencies routed through our layer</p></R>
          <R d={0.05}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 56, flexWrap: "wrap", opacity: 0.45 }}>
              {["Hippocratic AI", "Helpcare AI", "Crawford Thomas", "Elate Staffing"].map((n, i) => (
                <span key={i} style={{ fontFamily: hd, fontSize: 15, fontWeight: 600, color: TX, letterSpacing: 0.8, whiteSpace: "nowrap", transition: "opacity 0.3s", cursor: "default" }}>{n}</span>
              ))}
            </div>
          </R>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "100px 28px", maxWidth: 1120, margin: "0 auto" }}>
        <R><div style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: V, marginBottom: 14 }}>How It Works</div></R>
        <R d={0.04}><h2 style={{ fontFamily: hd, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, color: TX, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: -0.8 }}>From signal to introduction<br />in days, not months</h2></R>
        <R d={0.08}><p style={{ fontFamily: bd, fontSize: 15, color: T2, lineHeight: 1.72, maxWidth: 560, margin: "0 0 52px" }}>Two-sided outreach. Whoever responds first becomes leverage for the other.</p></R>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {steps.map((s, i) => (
            <R key={i} d={0.1 + i * 0.1}>
              <GC color={s.c}>
                <div style={{ padding: 32, position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.c}, transparent)`, opacity: 0.6 }} />
                  <div style={{ fontFamily: hd, fontSize: 56, fontWeight: 800, color: s.c, opacity: 0.07, position: "absolute", top: 12, right: 16 }}>{s.n}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 20, color: s.c, filter: `drop-shadow(0 0 8px ${s.c}50)` }}>{s.icon}</span>
                    <span style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, color: s.c, letterSpacing: 2, textTransform: "uppercase" }}>Step {s.n}</span>
                  </div>
                  <div style={{ fontFamily: hd, fontSize: 24, fontWeight: 700, color: TX, marginBottom: 12 }}>{s.t}</div>
                  <p style={{ fontFamily: bd, fontSize: 13.5, color: T2, lineHeight: 1.72, margin: 0 }}>{s.d}</p>
                </div>
              </GC>
            </R>
          ))}
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section style={{ padding: "100px 28px", background: S1, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
          <R><div style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: V, marginBottom: 14 }}>Why This Wins</div></R>
          <R d={0.04}><h2 style={{ fontFamily: hd, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, color: TX, lineHeight: 1.1, margin: "0 0 48px", letterSpacing: -0.8 }}>Not a marketplace. Not a data feed. An operator.</h2></R>
          <R d={0.08}>
            <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${BD}`, boxShadow: "0 8px 60px rgba(0,0,0,0.3)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: bd, fontSize: 13 }}>
                <thead><tr style={{ background: S2 }}>
                  <th style={{ textAlign: "left", padding: "16px 20px", color: T3, fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, borderBottom: `1px solid ${BD}` }}></th>
                  <th style={{ textAlign: "center", padding: "16px 20px", color: VL, fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, borderBottom: `2px solid ${V}`, background: DIM, fontWeight: 800 }}>◆ Namle Media</th>
                  <th style={{ textAlign: "center", padding: "16px 20px", color: T3, fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, borderBottom: `1px solid ${BD}` }}>Marketplaces</th>
                  <th style={{ textAlign: "center", padding: "16px 20px", color: T3, fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, borderBottom: `1px solid ${BD}` }}>Cold Outreach</th>
                </tr></thead>
                <tbody>{rows.map((r, i) => (
                  <tr key={i} onMouseEnter={e => e.currentTarget.style.background = "rgba(124,92,252,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"} style={{ transition: "background 0.2s" }}>
                    <td style={{ padding: "14px 20px", color: TX, borderBottom: `1px solid ${BD}`, fontWeight: 500 }}>{r[0]}</td>
                    <td style={{ textAlign: "center", padding: "14px 20px", color: r[1] === "✓" ? OK : VL, borderBottom: `1px solid ${BD}`, background: DIM, fontWeight: 600, fontSize: 12.5 }}>{r[1]}</td>
                    <td style={{ textAlign: "center", padding: "14px 20px", color: r[2] === "✗" ? DN : T3, borderBottom: `1px solid ${BD}` }}>{r[2]}</td>
                    <td style={{ textAlign: "center", padding: "14px 20px", color: r[3] === "✗" ? DN : T3, borderBottom: `1px solid ${BD}` }}>{r[3]}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </R>
        </div>
      </section>

      {/* ── VERTICALS ── */}
      <section id="verticals" style={{ padding: "100px 28px", maxWidth: 1120, margin: "0 auto" }}>
        <R><div style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: V, marginBottom: 14 }}>Verticals</div></R>
        <R d={0.04}><h2 style={{ fontFamily: hd, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, color: TX, lineHeight: 1.1, margin: "0 0 48px", letterSpacing: -0.8 }}>Four markets. Deep signal coverage.</h2></R>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {verts.map((v, i) => (
            <R key={i} d={0.08 + i * 0.08}>
              <GC color={v.c}>
                <div style={{ padding: "28px 22px", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: v.c, opacity: 0.4 }} />
                  <div style={{ fontSize: 26, marginBottom: 14, color: v.c, filter: `drop-shadow(0 0 10px ${v.c}40)` }}>{v.icon}</div>
                  <div style={{ fontFamily: hd, fontSize: 17, fontWeight: 700, color: TX, marginBottom: 8 }}>{v.name}</div>
                  <p style={{ fontFamily: bd, fontSize: 12.5, color: T2, lineHeight: 1.65, margin: 0 }}>{v.d}</p>
                </div>
              </GC>
            </R>
          ))}
        </div>
      </section>

      {/* ── TWO SIDES ── */}
      <section style={{ padding: "100px 28px", background: S1 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <R><div style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: V, marginBottom: 14 }}>Two Sides, One Layer</div></R>
          <R d={0.04}><h2 style={{ fontFamily: hd, fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 800, color: TX, lineHeight: 1.1, margin: "0 0 44px", letterSpacing: -0.8 }}>Built for agencies and hiring companies</h2></R>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[{
              label: "For Recruitment Agencies", h: "Stop cold-pitching. Start getting introduced.",
              lines: ["You specialise in a vertical. Your pipeline depends on who emails you back.", "We change the input: warm intros to funded companies with verified hiring pressure — before the role is public."],
              cta: "You show up. They already know you're coming.", c: V
            }, {
              label: "For Hiring Companies", h: "Stop searching. Meet the right recruiter.",
              lines: ["You just raised. Finding a specialist recruiter takes weeks you don't have.", "We match you with pre-vetted agencies by vertical, stage, and geography. One intro. No marketplace noise."],
              cta: "One introduction. The right recruiter. Weeks saved.", c: OK
            }].map((c, i) => (
              <R key={i} d={0.08 + i * 0.1}>
                <GC color={c.c}>
                  <div style={{ padding: 36, position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.c, opacity: 0.5 }} />
                    <div style={{ fontFamily: bd, fontSize: 10.5, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: c.c, marginBottom: 20 }}>{c.label}</div>
                    <div style={{ fontFamily: hd, fontSize: 22, fontWeight: 700, color: TX, marginBottom: 16, lineHeight: 1.2 }}>{c.h}</div>
                    {c.lines.map((l, j) => <p key={j} style={{ fontFamily: bd, fontSize: 14, color: T2, lineHeight: 1.72, margin: "0 0 10px" }}>{l}</p>)}
                    <p style={{ fontFamily: bd, fontSize: 14, color: c.c, fontWeight: 700, margin: "16px 0 0" }}>{c.cta}</p>
                  </div>
                </GC>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "100px 28px", maxWidth: 1120, margin: "0 auto" }}>
        <R><div style={{ fontFamily: bd, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: V, marginBottom: 14 }}>FAQ</div></R>
        <R d={0.04}><h2 style={{ fontFamily: hd, fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 800, color: TX, lineHeight: 1.1, margin: "0 0 44px", letterSpacing: -0.8 }}>Common questions</h2></R>
        <div style={{ maxWidth: 700 }}>
          {faqs.map((f, i) => (
            <R key={i} d={0.03 + i * 0.025}>
              <div style={{ borderBottom: `1px solid ${BD}` }}>
                <button onClick={() => setFq(fq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontFamily: bd, fontSize: 14.5, fontWeight: 600, color: fq === i ? VL : TX, transition: "color 0.3s", paddingRight: 20 }}>{f.q}</span>
                  <div style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${fq === i ? V : BD}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.4s", background: fq === i ? DIM : "transparent", transform: fq === i ? "rotate(135deg)" : "rotate(0)" }}>
                    <span style={{ fontFamily: bd, fontSize: 18, color: fq === i ? VL : T3, lineHeight: 1 }}>+</span>
                  </div>
                </button>
                <div style={{ maxHeight: fq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(.16,1,.3,1)" }}>
                  <p style={{ fontFamily: bd, fontSize: 13.5, color: T2, lineHeight: 1.72, margin: "0 0 20px", paddingRight: 52 }}>{f.a}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="access" style={{ padding: "100px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 60%, rgba(124,92,252,0.10) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
          <R>
            <div style={{ position: "relative", borderRadius: 20, padding: 1, background: `linear-gradient(135deg, ${V}30, ${BD}, ${V}20)`, backgroundSize: "200% 200%", animation: "gradientBorder 6s ease infinite" }}>
              <div style={{ background: S1, borderRadius: 19, padding: "72px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, rgba(124,92,252,0.12) 0%, transparent 50%)`, pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ width: 50, height: 2, background: `linear-gradient(90deg, ${V}, ${VL})`, margin: "0 auto 32px", borderRadius: 1, boxShadow: `0 0 20px ${V}50` }} />
                  <h2 style={{ fontFamily: hd, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: TX, lineHeight: 1.1, margin: "0 0 18px", letterSpacing: -0.8 }}>The right introduction<br />changes everything</h2>
                  <p style={{ fontFamily: bd, fontSize: 16, color: T2, lineHeight: 1.72, maxWidth: 480, margin: "0 auto 36px" }}>10-minute logic call. We assess fit — your vertical, your ICP, and whether the model works for how you operate.</p>
                  <a href="https://cal.com/upendernamlemedia/quick-chat" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: bd, fontSize: 16, fontWeight: 700, color: "#fff", background: `linear-gradient(135deg, ${V}, ${VD})`, padding: "17px 44px", borderRadius: 12, textDecoration: "none", boxShadow: `0 4px 40px ${GLO}`, transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 50px ${GLO}`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 40px ${GLO}`; }}>
                    <span>Access the Routing Layer</span> <span style={{ fontSize: 18 }}>→</span>
                  </a>
                  <p style={{ fontFamily: bd, fontSize: 12, color: T3, marginTop: 20 }}>No commitment · No calendar link until fit is established</p>
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${BD}`, padding: "36px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <span style={{ fontFamily: hd, fontSize: 13, color: T3 }}>Namle Media</span>
          <span style={{ fontFamily: bd, fontSize: 11, color: T3 }}>B2B Recruitment Intelligence · AI · Fintech · ERP · SaaS</span>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="https://www.linkedin.com/in/upender-kumar-swami-720170350/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: bd, fontSize: 12, color: T3, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = VL} onMouseLeave={e => e.target.style.color = T3}>LinkedIn</a>
            <a href="mailto:info@namlemedia.com" style={{ fontFamily: bd, fontSize: 12, color: T3, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = VL} onMouseLeave={e => e.target.style.color = T3}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
