import type { PortfolioProject } from "@/lib/portfolioDefaults"
import { DEFAULT_PROJECTS } from "@/lib/portfolioDefaults"

import { getSettings, listProjects } from "@/lib/filePortfolioStore"

function normalizeStringArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string") as string[]
  return []
}

export async function getPublicProjects(): Promise<PortfolioProject[]> {
  try {
    const projects = await listProjects({ publishedOnly: true })
    if (!projects.length) return DEFAULT_PROJECTS

    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      year: p.year,
      description: p.description,
      image: p.image,
      technologies: normalizeStringArray(p.technologies),
      link: p.link || undefined,
      features: normalizeStringArray(p.features),
      challenges: p.challenges || undefined,
      solution: p.solution || undefined,
      published: p.published,
      sortOrder: p.sortOrder,
    }))
  } catch {
    return DEFAULT_PROJECTS
  }
}

export async function getPublicHeroImage(): Promise<string | null> {
  try {
    const settings = await getSettings()
    return settings.heroImage ?? null
  } catch {
    return null
  }
}
