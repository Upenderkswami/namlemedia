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
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.6s ease ${d}s, transform 0.6s ease ${d}s` }}>
      {children}
    </div>
  );
}

/* ═══ FONTS — matching myoProcess exactly ═══ */
const serif = "'Newsreader', 'Georgia', serif";
const mono = "'IBM Plex Mono', 'Consolas', monospace";
const sans = "'DM Sans', 'Helvetica Neue', sans-serif";

/* ═══ COLORS — matching myoProcess light editorial ═══ */
const TX = "#1A1A1A";
const T2 = "#555555";
const T3 = "#999999";
const BD = "#DDDDD8";
const BG = "#FAFAF7";
const AC = "#7C5CFC";

/* ═══ PAGE ═══ */
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${BG}; color: ${TX}; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(124,92,252,0.15); }
        a { transition: opacity 0.2s; }
        a:hover { opacity: 0.6; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 960, margin: "0 auto" }}>
        <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 500, color: TX, letterSpacing: 0.3 }}>Namle Media</span>
        <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, color: T3, letterSpacing: 1.8, textTransform: "uppercase" }}>Upender Kumar Swami — Research & Introductions</span>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: BD }} /></div>

      {/* ── HERO ── */}
      <section style={{ padding: "100px 48px 80px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginBottom: 48 }}>Trusted in over $1B of routed B2B transactions, 2023–2026</div>
        </R>
        <R d={0.04}>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 400, color: TX, lineHeight: 1.2, margin: "0 0 28px", maxWidth: 720 }}>
            Upender Kumar Swami routes capital, talent, and dealflow between operators who need to find each other.
          </h1>
        </R>
        <R d={0.08}>
          <p style={{ fontFamily: serif, fontSize: 17, fontWeight: 300, fontStyle: "italic", color: T2, lineHeight: 1.6, margin: "0 0 40px" }}>
            Selective mandates across capital, growth, and strategic introductions.
          </p>
        </R>
        <R d={0.12}>
          <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginBottom: 28 }}>
            Recruitment · Wealth Management · AI · Fintech · SaaS · ERP
          </div>
        </R>
        <R d={0.16}>
          <a href="#memo" style={{ fontFamily: mono, fontSize: 13, fontWeight: 400, color: TX, textDecoration: "none", borderBottom: `1px solid ${TX}`, paddingBottom: 3, letterSpacing: 0.3 }}>
            Read memorandum →
          </a>
        </R>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: BD }} /></div>

      {/* ── CURRENT SIGNALS ── */}
      <section style={{ padding: "72px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3 }}>Current Signals</span>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, color: T3, letterSpacing: 1.5, textTransform: "uppercase" }}>April 2026</span>
          </div>
        </R>
        {[
          { n: 3, t: "UK wealth firms hiring succession advisors" },
          { n: 2, t: "AI companies expanding enterprise sales" },
          { n: 1, t: "Series B SaaS companies tripling headcount" },
          { n: 4, t: "FDA remediation windows opened this week" },
        ].map((s, i) => (
          <R key={i} d={0.02 * i}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 28, padding: "18px 0", borderBottom: `1px solid ${BD}` }}>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 400, color: TX, minWidth: 16 }}>{s.n}</span>
              <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, fontStyle: "italic", color: TX }}>{s.t}</span>
            </div>
          </R>
        ))}
        <R d={0.1}>
          <p style={{ fontFamily: mono, fontSize: 11, fontWeight: 300, color: T3, marginTop: 28, letterSpacing: 0.3 }}>
            Updated 25 April 2026 · <a href="mailto:info@namlemedia.com" style={{ color: T3, textDecoration: "none", borderBottom: `1px solid ${BD}` }}>info@namlemedia.com</a> if any of these are yours
          </p>
        </R>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: BD }} /></div>

      {/* ── RECENT WORK ── */}
      <section style={{ padding: "72px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginBottom: 40 }}>Recent Work</div>
        </R>
        {[
          { co: "Hippocratic AI", r: "2 partners signed in 60 days" },
          { co: "Connect Group", r: "$105K added in 90 days" },
          { co: "Crawford Thomas", r: "$100K in 6 months" },
          { co: "Vention", r: "$85K in under 60 days" },
          { co: "ForPlayers", r: "€70K in 90 days" },
          { co: "FabuLingua", r: "5 clients signed in 48 days" },
          { co: "Regent Peak Wealth Advisors", r: "6 qualified intros in 46 days" },
          { co: "Elate Staffing", r: "20 placements in 55 days" },
          { co: "HelpCare AI", r: "4 enterprise healthcare deals" },
        ].map((w, i) => (
          <R key={i} d={0.02 * i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderBottom: `1px solid ${BD}` }}>
              <span style={{ fontFamily: serif, fontSize: 19, fontWeight: 500, color: TX }}>{w.co}</span>
              <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 300, color: T3, letterSpacing: 0.3 }}>{w.r}</span>
            </div>
          </R>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: BD }} /></div>

      {/* ── RESEARCH ── */}
      <section style={{ padding: "72px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginBottom: 40 }}>Research</div>
        </R>
        {[
          { n: "01", t: "What Are Hiring Signals in Recruitment?", d: "March 2026", href: "/blog/hiring-signals" },
          { n: "02", t: "Why Your Recruitment Pipeline Isn't Broken — Your Timing Is", d: "March 2026", href: "/blog/recruitment-pipeline-timing" },
        ].map((r, i) => (
          <R key={i} d={0.02 * i}>
            <Link href={r.href} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderBottom: `1px solid ${BD}` }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
                  <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 400, color: AC }}>Issue {r.n}</span>
                  <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, color: TX }}>{r.t}</span>
                </div>
                <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 300, color: T3, letterSpacing: 0.5 }}>{r.d}</span>
              </div>
            </Link>
          </R>
        ))}

        <R d={0.06}>
          <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginTop: 48, marginBottom: 24 }}>Coming</div>
        </R>
        {[
          { n: "03", t: "How Funded Startups Find Specialist Recruiters", d: "soon" },
          { n: "04", t: "The Reposting Signal", d: "soon" },
        ].map((c, i) => (
          <R key={i} d={0.08 + 0.02 * i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderBottom: `1px solid ${BD}` }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
                <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 400, color: T3 }}>Issue {c.n}</span>
                <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 400, color: T3 }}>{c.t}</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 300, color: T3, fontStyle: "italic" }}>{c.d}</span>
            </div>
          </R>
        ))}
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: BD }} /></div>

      {/* ── MEMORANDUM ── */}
      <section id="memo" style={{ padding: "72px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48 }}>
            <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 500, color: TX }}>Namle Media</span>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, color: T3, letterSpacing: 1.5, textTransform: "uppercase" }}>Memorandum · 01</span>
          </div>
        </R>

        <R d={0.03}>
          <div style={{ borderTop: `2px solid ${TX}`, paddingTop: 28, marginBottom: 48 }}>
            <table style={{ fontFamily: mono, fontSize: 12, color: T3, borderCollapse: "collapse" }}>
              <tbody>
                <tr><td style={{ padding: "4px 32px 4px 0", fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase", color: T3 }}>From</td><td style={{ padding: "4px 0", color: TX }}>Upender Kumar Swami</td></tr>
                <tr><td style={{ padding: "4px 32px 4px 0", fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase", color: T3 }}>Subject</td><td style={{ padding: "4px 0", color: TX, textTransform: "uppercase", letterSpacing: 1 }}>On Strategic Introductions</td></tr>
                <tr><td style={{ padding: "4px 32px 4px 0", fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase", color: T3 }}>Filed</td><td style={{ padding: "4px 0", color: TX }}>25 April 2026 · India</td></tr>
              </tbody>
            </table>
          </div>
        </R>

        <R d={0.06}>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 48 }}>
            <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 500, color: TX, lineHeight: 1.3, margin: "0 0 12px" }}>On Strategic Introductions</h2>
            <p style={{ fontFamily: serif, fontSize: 16, fontStyle: "italic", fontWeight: 300, color: T2, lineHeight: 1.6, margin: "0 0 40px" }}>
              A note on the levers that move companies — and the work of using them well.
            </p>
          </div>
        </R>

        <div style={{ maxWidth: 620 }}>
          {[
            { t: "There are very few levers in business that can change the direction of a company quickly.", b: false },
            { t: "There are even fewer that can be used by one person, with no office, no employees, no brand name, no large budget, and nothing but a laptop, judgment, and an internet connection.", b: false },
            { t: "Strategic introductions are one of those levers.", b: false },
            { t: "Right now, somewhere in the market, a founder is looking for capital. A lender has appetite and needs qualified borrowers. A wealth advisor wants access to the right liquidity events. A company needs talent before the hiring need becomes public. A buyer wants growth before competitors notice the move.", b: false },
            { t: "None of them are lacking intelligence. None of them are lazy. Most of them simply do not know where the right door is, or when it has quietly opened.", b: false },
            { t: "Within minutes, one message can begin a conversation between people who should have met months ago. A few days later, money can move. A role can be filled. A partnership can begin. A company can enter a different future.", b: false },
            { t: "It sounds almost too simple, but many meaningful outcomes in business begin this way.", b: false },
            { t: "If we can be honest for a moment, though, you have already heard versions of this before. You have heard about networking. You have heard about lead generation. You have heard about outreach, funnels, growth hacks, automation, and all the polished language built around getting attention.", b: false },
            { t: "So let us agree on one thing.", b: false },
            { t: "There is no silver bullet.", b: true },
            { t: "It is not easy to create trust between strangers. It is not easy to recognise timing before it becomes obvious. It is not easy to know which conversations matter and which are noise. It is not easy to earn the confidence of serious people. It is not easy to build value from access alone.", b: false },
            { t: "It is, however, possible. And when done properly, it can be one of the highest-leverage skills in modern business.", b: false },
            { t: "I learned this by sitting close to markets where one conversation can be worth more than a year of ordinary effort. I watched visible companies miss obvious opportunities. I watched unknown operators quietly win because they understood timing, trust, and access better than louder competitors.", b: false },
            { t: "That changed how I saw business.", b: false },
            { t: "Most people think growth is created through force. Often, growth is created through alignment — the right person, the right moment, the right context, introduced cleanly.", b: false },
            { t: "Namle Media exists to work in that world. We help capital find opportunity. We help operators find counterparties. We help serious people meet while the window is still open.", b: false },
            { t: "Because in some markets, one introduction is nothing.", b: false },
            { t: "In others, one introduction can be worth millions.", b: true },
          ].map((p, i) => (
            <R key={i} d={0.08 + i * 0.012}>
              <p style={{ fontFamily: serif, fontSize: 16.5, fontWeight: p.b ? 500 : 300, fontStyle: p.b ? "italic" : "normal", color: TX, lineHeight: 1.75, margin: "0 0 22px", textAlign: "justify" }}>{p.t}</p>
            </R>
          ))}
        </div>

        <R d={0.35}>
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${BD}` }}>
            <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: TX }}>Upender Kumar Swami</div>
            <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 400, color: T3, marginTop: 2 }}>Namle Media · Research & Introductions</div>
            <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 300, color: T3, marginTop: 8 }}>
              <a href="mailto:info@namlemedia.com" style={{ color: T3, textDecoration: "none", borderBottom: `1px solid ${BD}` }}>info@namlemedia.com</a>
            </div>
          </div>
        </R>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ height: 1, background: BD }} /></div>

      {/* ── CTA ── */}
      <section style={{ padding: "72px 48px 48px", maxWidth: 960, margin: "0 auto" }}>
        <R>
          <p style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, fontStyle: "italic", color: TX, margin: "0 0 36px" }}>
            Currently accepting 2 new counterparties this quarter.
          </p>
        </R>
        <R d={0.04}>
          <div style={{ marginBottom: 10 }}>
            <a href="mailto:info@namlemedia.com" style={{ fontFamily: mono, fontSize: 13, fontWeight: 400, color: TX, textDecoration: "none", borderBottom: `1px solid ${TX}`, paddingBottom: 2 }}>info@namlemedia.com</a>
          </div>
        </R>
        <R d={0.07}>
          <div style={{ marginBottom: 10 }}>
            <a href="https://www.linkedin.com/in/upender-kumar-swami-720170350/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 13, fontWeight: 400, color: TX, textDecoration: "none", borderBottom: `1px solid ${TX}`, paddingBottom: 2 }}>linkedin.com/in/upender-kumar-swami</a>
          </div>
        </R>
      </section>

      {/* ── SEO BLOCK ── */}
      <section style={{ padding: "72px 48px", background: "#F2F2EE", borderTop: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <R>
            <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 400, letterSpacing: 2.5, textTransform: "uppercase", color: T3, marginBottom: 24 }}>About Namle Media</div>
            <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 500, color: TX, lineHeight: 1.3, margin: "0 0 20px" }}>B2B Recruitment Intelligence — Connecting Funded Tech Companies with Specialist Agencies</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 400, color: T2, lineHeight: 1.75, margin: "0 0 14px" }}>Namle Media is a B2B intelligence operator that detects hiring signals from Series A–C technology companies and makes curated, warm introductions to specialist recruitment agencies. We monitor over 290 signal sources — including funding events, executive leadership changes, product launches, and job posting velocity patterns — to identify companies that are about to hire 2 to 4 weeks before roles go public.</p>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 400, color: T2, lineHeight: 1.75, margin: 0 }}>Our routing layer serves four high-demand verticals: AI and Machine Learning, Fintech, ERP (SAP and Dynamics), and SaaS. Each introduction is two-sided — the hiring company gets a specialist recruiter, and the recruitment agency gets a pre-qualified client.</p>
              </div>
              <div>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 400, color: T2, lineHeight: 1.75, margin: "0 0 14px" }}>Unlike recruiter marketplaces that broadcast roles to dozens of agencies, or job boards where every recruiter competes for the same listing, Namle Media curates one introduction — the right agency for the vertical, stage, and hiring urgency.</p>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 400, color: T2, lineHeight: 1.75, margin: 0 }}>Trusted across over $1 billion in routed B2B transactions, Namle Media works with a small number of vetted partners to maintain signal quality and routing velocity. Companies served include Crawford Thomas Recruiting, Helpcare AI, Hippocratic AI, and Elate Staffing Solutions.</p>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${BD}`, padding: "28px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 300, color: T3, letterSpacing: 0.8 }}>Namle Media · Upender Kumar Swami · Remote</span>
          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 300, color: T3, letterSpacing: 0.8 }}>© 2026</span>
        </div>
        <div style={{ maxWidth: 960, margin: "6px auto 0", textAlign: "center" }}>
          <span style={{ fontFamily: serif, fontSize: 12, fontStyle: "italic", fontWeight: 300, color: T3 }}>Selected work across $1B+ transaction environments.</span>
        </div>
      </footer>
    </>
  );
}
