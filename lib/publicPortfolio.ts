import type { PortfolioProject } from "@/lib/portfolioDefaults"
import { DEFAULT_PROJECTS } from "@/lib/portfolioDefaults"
import { prisma } from "@/lib/prisma"

type DbProjectRow = {
  id: string
  title: string
  year: string
  description: string
  image: string
  technologies: unknown
  link: string | null
  features: unknown
  challenges: string | null
  solution: string | null
  published: boolean
  sortOrder: number
}

function normalizeStringArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string") as string[]
  return []
}

export async function getPublicProjects(): Promise<PortfolioProject[]> {
  try {
    const rows = (await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        year: true,
        description: true,
        image: true,
        technologies: true,
        link: true,
        features: true,
        challenges: true,
        solution: true,
        published: true,
        sortOrder: true,
      },
    })) as DbProjectRow[]

    if (!rows.length) return DEFAULT_PROJECTS

    return rows.map((p) => ({
      id: p.id,
      title: p.title,
      year: p.year,
      description: p.description,
      image: p.image,
      technologies: normalizeStringArray(p.technologies),
      link: p.link ?? undefined,
      features: normalizeStringArray(p.features),
      challenges: p.challenges ?? undefined,
      solution: p.solution ?? undefined,
      published: p.published,
      sortOrder: p.sortOrder,
    }))
  } catch {
    return DEFAULT_PROJECTS
  }
}

export async function getPublicHeroImage(): Promise<string | null> {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { key: "site" } })
    return settings?.heroImage ?? null
  } catch {
    return null
  }
}
