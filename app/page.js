"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ═══ REVEAL ═══ */
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
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s` }}>
      {children}
    </div>
  );
}

/* ═══ PALETTE — editorial / light ═══ */
const BG = "#FAFAF8";
const TX = "#1A1A1A";
const T2 = "#4A4A4A";
const T3 = "#8A8A8A";
const BD = "#E0E0DA";
const AC = "#7C5CFC";
const S2 = "#F2F2EE";

/* fonts */
const sr = "'Playfair Display', 'Georgia', serif";
const mn = "'JetBrains Mono', 'SF Mono', 'Consolas', monospace";
const sn = "'DM Sans', 'Helvetica Neue', sans-serif";

/* ═══ DATA ═══ */
const signals = [
  { n: 3, t: "UK wealth firms hiring succession advisors" },
  { n: 2, t: "AI companies expanding enterprise sales" },
  { n: 1, t: "Midwest bank increasing SBA appetite" },
  { n: 4, t: "FDA remediation windows opened this week" },
];

const work = [
  { co: "Hippocratic AI", r: "2 partners signed in 60 days" },
  { co: "Connect Group", r: "$105K added in 90 days" },
  { co: "Crawford Thomas", r: "$100K in 6 months" },
  { co: "Vention", r: "$85K in under 60 days" },
  { co: "Elate Staffing", r: "20 placements in 55 days" },
  { co: "HelpCare AI", r: "4 enterprise healthcare deals" },
];

const research = [
  { n: "01", t: "What Are Hiring Signals in Recruitment?", d: "March 2026", href: "/blog/hiring-signals" },
  { n: "02", t: "Why Your Recruitment Pipeline Isn't Broken — Your Timing Is", d: "March 2026", href: "/blog/recruitment-pipeline-timing" },
];

const coming = [
  { n: "03", t: "How Funded Startups Find Specialist Recruiters", d: "soon" },
  { n: "04", t: "The Reposting Signal: How to Spot Companies That Can't Hire Internally", d: "soon" },
];

const faqs = [
  { q: "How is this different from a recruiter marketplace?", a: "Marketplaces broadcast your role to dozens of agencies. We curate one warm introduction — the right agency for your vertical, stage, and urgency. No bidding wars." },
  { q: "How much does it cost?", a: "Access fee starts at £2,200, plus a 12% success fee on closed placements. First step is a 10-minute logic call. No commitment required." },
  { q: "What are hiring signals?", a: "Early indicators a company is about to hire — detected 2–4 weeks before public posts. Funding, leadership changes, product launches, and job posting velocity." },
  { q: "What if I only recruit in one niche?", a: "That's exactly who this is for. The narrower your specialisation, the more valuable the matching. We cover AI/ML, Fintech, ERP/SAP, and SaaS." },
  { q: "How do I get started?", a: "Book a 10-minute logic call. We assess fit — your vertical, ICP, and whether the model aligns. If not, zero pressure." },
];

/* ═══ COMPONENTS ═══ */
function SectionLabel({ children }) {
  return <div style={{ fontFamily: mn, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginBottom: 32 }}>{children}</div>;
}

function Divider() {
  return <div style={{ width: "100%", height: 1, background: BD, margin: 0 }} />;
}

/* ═══ PAGE ═══ */
export default function Home() {
  const [fq, setFq] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${BG}; color: ${TX}; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${AC}20; }
        a:hover { opacity: 0.7; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ padding: "0 48px", borderBottom: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/" style={{ fontFamily: sr, fontSize: 18, fontWeight: 500, color: TX, textDecoration: "none", letterSpacing: -0.3 }}>Namle Media</Link>
          <div style={{ fontFamily: mn, fontSize: 11, fontWeight: 400, color: T3, letterSpacing: 1.5, textTransform: "uppercase" }}>
            <a href="https://cal.com/upendernamlemedia/quick-chat" target="_blank" rel="noopener noreferrer" style={{ color: T3, textDecoration: "none", borderBottom: `1px solid ${BD}`, paddingBottom: 2, transition: "all 0.3s" }}>Request introduction</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: "120px 48px 100px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ fontFamily: mn, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginBottom: 40 }}>Trusted in over $1B of routed B2B transactions, 2023–2026</div>
        </R>
        <R d={0.05}>
          <h1 style={{ fontFamily: sr, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, color: TX, lineHeight: 1.15, margin: "0 0 32px", letterSpacing: -0.5, maxWidth: 780 }}>
            Namle Media routes hiring intelligence between funded tech companies and specialist recruitment agencies.
          </h1>
        </R>
        <R d={0.1}>
          <p style={{ fontFamily: sr, fontSize: 18, fontWeight: 400, fontStyle: "italic", color: T2, lineHeight: 1.6, margin: "0 0 48px", maxWidth: 560 }}>
            Selective introductions across AI, Fintech, ERP, and SaaS.
          </p>
        </R>
        <R d={0.15}>
          <a href="https://cal.com/upendernamlemedia/quick-chat" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mn, fontSize: 12, fontWeight: 400, color: TX, textDecoration: "none", borderBottom: `1px solid ${TX}`, paddingBottom: 4, letterSpacing: 0.5, transition: "all 0.3s" }}>
            Book a logic call →
          </a>
        </R>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── CURRENT SIGNALS ── */}
      <section style={{ padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48 }}>
            <SectionLabel>Current Signals</SectionLabel>
            <span style={{ fontFamily: mn, fontSize: 11, color: T3, letterSpacing: 1.5, textTransform: "uppercase" }}>April 2026</span>
          </div>
        </R>
        {signals.map((s, i) => (
          <R key={i} d={0.03 * i}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "20px 0", borderBottom: i < signals.length - 1 ? `1px solid ${BD}` : "none" }}>
              <span style={{ fontFamily: mn, fontSize: 13, color: AC, minWidth: 20 }}>{s.n}</span>
              <span style={{ fontFamily: sr, fontSize: 19, fontWeight: 400, fontStyle: "italic", color: TX }}>{s.t}</span>
            </div>
          </R>
        ))}
        <R d={0.15}>
          <p style={{ fontFamily: mn, fontSize: 11, color: T3, marginTop: 32, letterSpacing: 0.5 }}>
            Updated 25 April 2026 · <a href="mailto:info@namlemedia.com" style={{ color: T3, textDecoration: "none", borderBottom: `1px solid ${BD}` }}>info@namlemedia.com</a> if any of these are yours
          </p>
        </R>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── RECENT WORK ── */}
      <section style={{ padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R><SectionLabel>Recent Work</SectionLabel></R>
        {work.map((w, i) => (
          <R key={i} d={0.03 * i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "18px 0", borderBottom: i < work.length - 1 ? `1px solid ${BD}` : "none" }}>
              <span style={{ fontFamily: sr, fontSize: 20, fontWeight: 600, color: TX }}>{w.co}</span>
              <span style={{ fontFamily: mn, fontSize: 13, fontWeight: 400, color: T3, letterSpacing: 0.3 }}>{w.r}</span>
            </div>
          </R>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R><SectionLabel>How It Works</SectionLabel></R>
        <R d={0.05}>
          <h2 style={{ fontFamily: sr, fontSize: 32, fontWeight: 500, color: TX, lineHeight: 1.25, margin: "0 0 48px", maxWidth: 600 }}>From signal to introduction in days, not months.</h2>
        </R>
        {[
          { n: "01", t: "Detect", d: "We monitor funding events, leadership changes, product launches, and job posting velocity — identifying companies about to hire 2–4 weeks before roles go public." },
          { n: "02", t: "Curate", d: "Every signal is scored and matched to specialist recruitment agencies by vertical, geography, and company stage. No firehose. Only introductions worth making." },
          { n: "03", t: "Connect", d: "Warm, two-sided introductions. The agency gets a pre-qualified client. The company gets a specialist recruiter. Both sides know the other is coming." },
        ].map((s, i) => (
          <R key={i} d={0.05 + i * 0.05}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 0, padding: "28px 0", borderBottom: `1px solid ${BD}` }}>
              <span style={{ fontFamily: mn, fontSize: 12, color: T3, paddingTop: 4 }}>Step {s.n}</span>
              <div>
                <div style={{ fontFamily: sr, fontSize: 22, fontWeight: 600, color: TX, marginBottom: 8 }}>{s.t}</div>
                <p style={{ fontFamily: sn, fontSize: 15, color: T2, lineHeight: 1.7, margin: 0, maxWidth: 520 }}>{s.d}</p>
              </div>
            </div>
          </R>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── TWO SIDES ── */}
      <section style={{ padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R><SectionLabel>Two Sides, One Layer</SectionLabel></R>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 16 }}>
          {[
            { label: "For Recruitment Agencies", lines: ["You specialise in a vertical. Your pipeline depends on who emails you back.", "We change the input: warm intros to funded companies with verified hiring pressure — before the role is public.", "You show up. They already know you're coming."] },
            { label: "For Hiring Companies", lines: ["You just raised. Finding a specialist recruiter takes weeks you don't have.", "We match you with pre-vetted agencies by vertical, stage, and geography. One intro. No marketplace noise.", "One introduction. The right recruiter. Weeks saved."] },
          ].map((c, i) => (
            <R key={i} d={0.05 + i * 0.08}>
              <div>
                <div style={{ fontFamily: mn, fontSize: 11, fontWeight: 400, letterSpacing: 2, textTransform: "uppercase", color: T3, marginBottom: 24 }}>{c.label}</div>
                {c.lines.map((l, j) => (
                  <p key={j} style={{ fontFamily: sn, fontSize: 15, color: j === c.lines.length - 1 ? TX : T2, lineHeight: 1.7, margin: "0 0 14px", fontWeight: j === c.lines.length - 1 ? 600 : 400 }}>{l}</p>
                ))}
              </div>
            </R>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── RESEARCH / BLOG ── */}
      <section style={{ padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R><SectionLabel>Research</SectionLabel></R>
        {research.map((r, i) => (
          <R key={i} d={0.03 * i}>
            <Link href={r.href} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", alignItems: "baseline", padding: "20px 0", borderBottom: `1px solid ${BD}`, transition: "all 0.3s" }}>
                <span style={{ fontFamily: mn, fontSize: 12, color: AC }}>Issue {r.n}</span>
                <span style={{ fontFamily: sr, fontSize: 19, fontWeight: 500, color: TX, fontStyle: "italic" }}>{r.t}</span>
                <span style={{ fontFamily: mn, fontSize: 11, color: T3, letterSpacing: 1 }}>{r.d}</span>
              </div>
            </Link>
          </R>
        ))}
        <R d={0.08}>
          <div style={{ fontFamily: mn, fontSize: 11, color: T3, letterSpacing: 2, textTransform: "uppercase", marginTop: 40, marginBottom: 16 }}>Coming</div>
        </R>
        {coming.map((c, i) => (
          <R key={i} d={0.1 + 0.03 * i}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", alignItems: "baseline", padding: "18px 0", borderBottom: i < coming.length - 1 ? `1px solid ${BD}` : "none" }}>
              <span style={{ fontFamily: mn, fontSize: 12, color: T3 }}>Issue {c.n}</span>
              <span style={{ fontFamily: sr, fontSize: 17, fontWeight: 400, color: T3 }}>{c.t}</span>
              <span style={{ fontFamily: mn, fontSize: 11, color: T3, letterSpacing: 1 }}>{c.d}</span>
            </div>
          </R>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── MEMO / ABOUT ── */}
      <section style={{ padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48 }}>
            <SectionLabel>Memorandum · 01</SectionLabel>
            <span style={{ fontFamily: mn, fontSize: 11, color: T3, letterSpacing: 1 }}>25 April 2026 · India</span>
          </div>
        </R>
        <R d={0.05}>
          <h2 style={{ fontFamily: sr, fontSize: 32, fontWeight: 500, color: TX, lineHeight: 1.3, margin: "0 0 40px" }}>On Strategic Introductions</h2>
        </R>
        <R d={0.08}>
          <div style={{ fontFamily: sr, fontSize: 17, fontStyle: "italic", color: T2, lineHeight: 1.7, marginBottom: 40, borderLeft: `2px solid ${BD}`, paddingLeft: 24 }}>
            A note on the levers that move companies — and the work of using them well.
          </div>
        </R>
        <div style={{ maxWidth: 640 }}>
          {[
            "There are very few levers in business that can change the direction of a company quickly.",
            "There are even fewer that can be used by one person, with no office, no employees, no brand name, no large budget, and nothing but a laptop, judgment, and an internet connection.",
            "Strategic introductions are one of those levers.",
            "Right now, somewhere in the market, a company needs talent before the hiring need becomes public. A recruitment agency wants growth before competitors notice the move.",
            "None of them are lacking intelligence. None of them are lazy. Most of them simply do not know where the right door is, or when it has quietly opened.",
            "Within minutes, one message can begin a conversation between people who should have met months ago. A few days later, a role can be filled. A partnership can begin. A company can enter a different future.",
            "It is not easy to create trust between strangers. It is not easy to recognise timing before it becomes obvious. It is not easy to know which conversations matter and which are noise.",
            "It is, however, possible. And when done properly, it can be one of the highest-leverage skills in modern business.",
          ].map((p, i) => (
            <R key={i} d={0.1 + i * 0.02}>
              <p style={{ fontFamily: sr, fontSize: 17, fontWeight: 400, color: TX, lineHeight: 1.75, margin: "0 0 24px", textAlign: "justify" }}>{p}</p>
            </R>
          ))}
        </div>
        <R d={0.3}>
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BD}` }}>
            <div style={{ fontFamily: sn, fontSize: 15, fontWeight: 600, color: TX }}>Upender Kumar Swami</div>
            <div style={{ fontFamily: sn, fontSize: 13, color: T3, marginTop: 4 }}>Namle Media · Research & Introductions</div>
            <div style={{ fontFamily: mn, fontSize: 12, color: T3, marginTop: 8 }}>
              <a href="mailto:info@namlemedia.com" style={{ color: T3, textDecoration: "none", borderBottom: `1px solid ${BD}` }}>info@namlemedia.com</a>
            </div>
          </div>
        </R>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R><SectionLabel>FAQ</SectionLabel></R>
        <div style={{ maxWidth: 640 }}>
          {faqs.map((f, i) => (
            <R key={i} d={0.03 * i}>
              <div style={{ borderBottom: `1px solid ${BD}` }}>
                <button onClick={() => setFq(fq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontFamily: sn, fontSize: 15, fontWeight: 500, color: fq === i ? AC : TX, transition: "color 0.3s", paddingRight: 20 }}>{f.q}</span>
                  <span style={{ fontFamily: mn, fontSize: 16, color: T3, transition: "transform 0.3s", transform: fq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                <div style={{ maxHeight: fq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontFamily: sn, fontSize: 14, color: T2, lineHeight: 1.7, margin: "0 0 22px" }}>{f.a}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><Divider /></div>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 48px 40px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <p style={{ fontFamily: sr, fontSize: 22, fontWeight: 500, fontStyle: "italic", color: TX, marginBottom: 32, maxWidth: 480 }}>
            Currently accepting 2 new counterparties this quarter.
          </p>
        </R>
        <R d={0.05}>
          <div style={{ marginBottom: 12 }}>
            <a href="mailto:info@namlemedia.com" style={{ fontFamily: mn, fontSize: 13, color: TX, textDecoration: "none", borderBottom: `1px solid ${TX}`, paddingBottom: 2 }}>info@namlemedia.com</a>
          </div>
        </R>
        <R d={0.08}>
          <div style={{ marginBottom: 12 }}>
            <a href="https://www.linkedin.com/in/upender-kumar-swami-720170350/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mn, fontSize: 13, color: TX, textDecoration: "none", borderBottom: `1px solid ${TX}`, paddingBottom: 2 }}>linkedin.com/in/upender-kumar-swami</a>
          </div>
        </R>
        <R d={0.11}>
          <div>
            <a href="https://cal.com/upendernamlemedia/quick-chat" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mn, fontSize: 13, color: AC, textDecoration: "none", borderBottom: `1px solid ${AC}`, paddingBottom: 2 }}>Book a logic call →</a>
          </div>
        </R>
      </section>

      {/* ── SEO CONTENT BLOCK — visible text for crawlers ── */}
      <section style={{ padding: "80px 48px", background: S2, borderTop: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <R>
            <SectionLabel>About Namle Media</SectionLabel>
            <h2 style={{ fontFamily: sr, fontSize: 26, fontWeight: 500, color: TX, lineHeight: 1.3, margin: "0 0 24px" }}>B2B Recruitment Intelligence — Connecting Funded Tech Companies with Specialist Agencies</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                <p style={{ fontFamily: sn, fontSize: 14, color: T2, lineHeight: 1.75, margin: "0 0 16px" }}>
                  Namle Media is a B2B intelligence operator that detects hiring signals from Series A–C technology companies and makes curated, warm introductions to specialist recruitment agencies. We monitor over 290 signal sources — including funding events, executive leadership changes, product launches, and job posting velocity patterns — to identify companies that are about to hire 2 to 4 weeks before roles go public.
                </p>
                <p style={{ fontFamily: sn, fontSize: 14, color: T2, lineHeight: 1.75, margin: 0 }}>
                  Our routing layer serves four high-demand verticals: AI and Machine Learning, Fintech, ERP (SAP and Dynamics), and SaaS. Each introduction is two-sided — the hiring company gets a specialist recruiter, and the recruitment agency gets a pre-qualified client. Both sides are vetted before any introduction is made.
                </p>
              </div>
              <div>
                <p style={{ fontFamily: sn, fontSize: 14, color: T2, lineHeight: 1.75, margin: "0 0 16px" }}>
                  Unlike recruiter marketplaces that broadcast roles to dozens of agencies, or job boards where every recruiter competes for the same listing, Namle Media curates one introduction — the right agency for the vertical, stage, and hiring urgency. This signal-based approach means recruitment agencies reach decision-makers before 30 other agencies see the same opportunity.
                </p>
                <p style={{ fontFamily: sn, fontSize: 14, color: T2, lineHeight: 1.75, margin: 0 }}>
                  Trusted across over $1 billion in routed B2B transactions, Namle Media works with a small number of vetted partners to maintain signal quality and routing velocity. Companies served include Crawford Thomas Recruiting, Helpcare AI, Hippocratic AI, and Elate Staffing Solutions.
                </p>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${BD}`, padding: "32px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: mn, fontSize: 11, color: T3, letterSpacing: 1 }}>Namle Media · Upender Kumar Swami · Ajmer · Delhi · Remote</span>
          <span style={{ fontFamily: mn, fontSize: 11, color: T3, letterSpacing: 1 }}>© 2026</span>
        </div>
        <div style={{ maxWidth: 960, margin: "8px auto 0", textAlign: "center" }}>
          <span style={{ fontFamily: sr, fontSize: 12, fontStyle: "italic", color: T3 }}>Selected work across $1B+ transaction environments.</span>
        </div>
      </footer>
    </>
  );
}
