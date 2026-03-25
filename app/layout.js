import "./globals.css";

export const metadata = {
  title: "B2B Recruitment Intelligence for Funded Tech Companies | Namle Media",
  description: "Namle Media detects hiring signals from Series A–C tech companies and connects them with specialist recruitment agencies in AI, Fintech, ERP, and SaaS.",
  metadataBase: new URL("https://namlemedia.com"),
  openGraph: {
    title: "B2B Recruitment Intelligence | Namle Media",
    description: "Hiring signal data + warm introductions. Connecting funded tech companies with specialist recruitment agencies.",
    url: "https://namlemedia.com",
    siteName: "Namle Media",
    type: "website",
    images: [{ url: "https://namlemedia.com/og-image.png", width: 1200, height: 630, alt: "Namle Media — B2B Recruitment Intelligence" }],
  },
  twitter: { card: "summary_large_image", title: "B2B Recruitment Intelligence | Namle Media" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://namlemedia.com" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {"@context":"https://schema.org","@type":"Organization",name:"Namle Media",url:"https://namlemedia.com",description:"Namle Media is a B2B intelligence operator connecting funded technology companies (Series A–C) with specialist recruitment agencies through curated hiring signal data and warm introductions.",knowsAbout:["B2B Recruitment Intelligence","Hiring Signal Detection","Recruitment Agency Matching","AI Talent Acquisition","Fintech Recruitment","SaaS Recruitment","ERP and SAP Recruitment"]},
          {"@context":"https://schema.org","@type":"WebSite",url:"https://namlemedia.com",name:"Namle Media"},
          {"@context":"https://schema.org","@type":"FAQPage",mainEntity:[
            {"@type":"Question",name:"How is Namle Media different from a recruiter marketplace?",acceptedAnswer:{"@type":"Answer",text:"Marketplaces broadcast your role to dozens of agencies. Namle Media curates one warm introduction — the right agency for your vertical, stage, and urgency."}},
            {"@type":"Question",name:"How much does Namle Media cost?",acceptedAnswer:{"@type":"Answer",text:"Retainer starts at approximately $5,000 per month, or commission tied to closed placements. First step is a 10-minute logic call."}},
            {"@type":"Question",name:"What are hiring signals?",acceptedAnswer:{"@type":"Answer",text:"Early indicators that a company is about to hire, detected 2 to 4 weeks before public job posts. These include funding events, leadership changes, product launches, and job posting velocity."}},
            {"@type":"Question",name:"What verticals does Namle Media cover?",acceptedAnswer:{"@type":"Answer",text:"AI and Machine Learning, Fintech, ERP (SAP and Dynamics), and SaaS."}},
            {"@type":"Question",name:"How do I get started?",acceptedAnswer:{"@type":"Answer",text:"Book a 10-minute logic call. We assess fit — your vertical, ICP, and whether the model aligns."}}
          ]}
        ]) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
