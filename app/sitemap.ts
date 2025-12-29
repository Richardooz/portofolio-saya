import type { MetadataRoute } from "next"

import { DEFAULT_PROJECTS } from "@/lib/portfolioDefaults"
import { projectToSlug } from "@/lib/projectSlug"
import { getSiteUrl } from "@/lib/siteUrl"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...DEFAULT_PROJECTS.map((p) => ({
      url: `${baseUrl}/projects/${projectToSlug(p)}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]
}
