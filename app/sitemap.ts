import { Metadata } from 'next';

const siteUrl = 'https://thedataisland.com';

export default function Sitemap() {
  const pages = [
    "",
    "/solutions",
    "/technology",
    "/case-studies",
    "/insights",
    "/about",
    "/contact"
  ]

  return pages.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))
}
