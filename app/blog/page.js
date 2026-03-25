import Link from "next/link";

export const metadata = {
  title: "Blog — Recruitment Intelligence & Hiring Signals | Namle Media",
  description: "Insights on hiring signals, recruitment intelligence, and B2B talent acquisition for funded tech companies and specialist recruitment agencies.",
};

const posts = [
  {
    slug: "hiring-signals",
    title: "What Are Hiring Signals in Recruitment?",
    desc: "How to detect companies about to hire 2–4 weeks before jobs go public — using funding events, leadership changes, and posting velocity.",
    date: "March 21, 2026",
    tag: "Recruitment Intelligence",
    readTime: "8 min read",
  },
];

export default function BlogIndex() {
  return (
    <>
      <style>{`
        .bc{padding:32px;border:1px solid rgba(255,255,255,.06);border-radius:14px;background:rgba(255,255,255,.02);transition:all .3s}
        .bc:hover{border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.03)}
        .nc:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.3)}
      `}</style>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 40px",background:"rgba(5,5,8,.92)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:72}}>
          <Link href="/" style={{fontSize:16,fontWeight:700,color:"#e8e8f0",textDecoration:"none"}}>Namle Media</Link>
          <div style={{display:"flex",alignItems:"center",gap:36}}>
            <Link href="/" style={{fontSize:13,color:"rgba(255,255,255,.4)",textDecoration:"none",letterSpacing:.5,textTransform:"uppercase",fontWeight:500}}>Home</Link>
            <Link href="/blog" style={{fontSize:13,color:"rgba(255,255,255,.7)",textDecoration:"none",letterSpacing:.5,textTransform:"uppercase",fontWeight:500}}>Blog</Link>
            <a href="https://cal.com/upendernamlemedia/quick-chat" target="_blank" rel="noopener noreferrer" className="nc" style={{fontSize:12,fontWeight:700,color:"#e8e8f0",padding:"10px 24px",border:"1px solid rgba(255,255,255,.15)",borderRadius:6,textDecoration:"none",letterSpacing:.8,textTransform:"uppercase",transition:"all .3s"}}>Request Access</a>
          </div>
        </div>
      </nav>
      <main style={{maxWidth:800,margin:"0 auto",padding:"140px 24px 80px"}}>
        <div style={{fontSize:10,fontWeight:600,color:"#7C5CFC",letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Blog</div>
        <h1 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:"#f0f0f8",lineHeight:1.1,letterSpacing:-1,marginBottom:16}}>Insights</h1>
        <p style={{fontSize:16,color:"rgba(255,255,255,.4)",lineHeight:1.7,marginBottom:48}}>Hiring signals, recruitment intelligence, and how AI search is changing how companies find specialist recruiters.</p>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {posts.map(p=>(
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{textDecoration:"none"}}>
              <div className="bc">
                <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                  <span style={{fontSize:11,fontWeight:600,color:"#7C5CFC",letterSpacing:1,textTransform:"uppercase"}}>{p.tag}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.2)"}}>·</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>{p.date}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.2)"}}>·</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>{p.readTime}</span>
                </div>
                <h2 style={{fontSize:22,fontWeight:700,color:"#f0f0f8",lineHeight:1.2,marginBottom:8}}>{p.title}</h2>
                <p style={{fontSize:14,color:"rgba(255,255,255,.4)",lineHeight:1.6,margin:0}}>{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer style={{borderTop:"1px solid rgba(255,255,255,.04)",padding:40,textAlign:"center"}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,.2)"}}>© 2026 Namle Media. All rights reserved.</div>
      </footer>
    </>
  );
}
