export default function sitemap() {
  return [
    { url: "https://namlemedia.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://namlemedia.com/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://namlemedia.com/blog/hiring-signals", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://namlemedia.com/blog/recruitment-pipeline-timing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
