import "server-only"

import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

import {
  DEFAULT_HERO_IMAGE,
  DEFAULT_PROJECTS,
  type PortfolioProject,
} from "@/lib/portfolioDefaults"

export type PortfolioSettings = {
  key: "site"
  heroImage: string | null
}

export type StoredProject = Required<
  Pick<
    PortfolioProject,
    | "title"
    | "year"
    | "description"
    | "image"
    | "technologies"
    | "link"
    | "features"
    | "challenges"
    | "solution"
    | "published"
    | "sortOrder"
  >
> & {
  id: string
}

type PortfolioFile = {
  version: 1
  settings: PortfolioSettings
  projects: StoredProject[]
}

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json")

function normalizeStringArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string") as string[]
  return []
}

function normalizeSettings(settings: unknown): PortfolioSettings {
  const maybe = (settings ?? {}) as Partial<PortfolioSettings>
  const hero = typeof maybe.heroImage === "string" ? maybe.heroImage : null
  return {
    key: "site",
    heroImage: hero && hero.trim() ? hero.trim() : null,
  }
}

function normalizeProject(project: unknown): StoredProject | null {
  if (!project || typeof project !== "object") return null
  const p = project as Record<string, unknown>

  const id = typeof p.id === "string" && p.id.trim() ? p.id.trim() : crypto.randomUUID()
  const title = typeof p.title === "string" ? p.title.trim() : ""
  const year = typeof p.year === "string" ? p.year.trim() : ""
  const description = typeof p.description === "string" ? p.description.trim() : ""
  const image = typeof p.image === "string" ? p.image.trim() : ""

  const technologies = normalizeStringArray(p.technologies)
  const features = normalizeStringArray(p.features)

  const link = typeof p.link === "string" && p.link.trim() ? p.link.trim() : ""
  const challenges = typeof p.challenges === "string" && p.challenges.trim() ? p.challenges.trim() : ""
  const solution = typeof p.solution === "string" && p.solution.trim() ? p.solution.trim() : ""

  const published = typeof p.published === "boolean" ? p.published : true
  const sortOrder = typeof p.sortOrder === "number" && Number.isFinite(p.sortOrder) ? p.sortOrder : 0

  if (!title || !year || !description || !image) return null

  return {
    id,
    title,
    year,
    description,
    image,
    technologies,
    link,
    features,
    challenges,
    solution,
    published,
    sortOrder,
  }
}

function defaultFile(): PortfolioFile {
  return {
    version: 1,
    settings: { key: "site", heroImage: DEFAULT_HERO_IMAGE },
    projects: DEFAULT_PROJECTS.map((p) => ({
      id: p.id ?? crypto.randomUUID(),
      title: p.title,
      year: p.year,
      description: p.description,
      image: p.image,
      technologies: p.technologies,
      link: p.link ?? "",
      features: p.features ?? [],
      challenges: p.challenges ?? "",
      solution: p.solution ?? "",
      published: p.published ?? true,
      sortOrder: p.sortOrder ?? 0,
    })),
  }
}

async function ensureDataDir() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
}

export async function readPortfolioFile(): Promise<PortfolioFile> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8")
    const parsed = JSON.parse(raw) as Partial<PortfolioFile>

    const settings = normalizeSettings(parsed.settings)

    const projects = Array.isArray(parsed.projects)
      ? parsed.projects.map(normalizeProject).filter(Boolean) as StoredProject[]
      : []

    if (!projects.length) {
      // If the file exists but is empty/invalid, still fall back to defaults.
      return defaultFile()
    }

    return {
      version: 1,
      settings,
      projects,
    }
  } catch {
    return defaultFile()
  }
}

export async function writePortfolioFile(next: PortfolioFile): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2) + "\n", "utf8")
}

export async function getSettings(): Promise<PortfolioSettings> {
  const file = await readPortfolioFile()
  return file.settings
}

export async function setHeroImage(heroImage: string | null): Promise<PortfolioSettings> {
  const file = await readPortfolioFile()
  const next: PortfolioFile = {
    ...file,
    settings: {
      key: "site",
      heroImage: heroImage && heroImage.trim() ? heroImage.trim() : null,
    },
  }
  await writePortfolioFile(next)
  return next.settings
}

function sortProjects(projects: StoredProject[]): StoredProject[] {
  return [...projects].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder
    return a.title.localeCompare(b.title)
  })
}

export async function listProjects(options?: { publishedOnly?: boolean }): Promise<StoredProject[]> {
  const file = await readPortfolioFile()
  const items = options?.publishedOnly ? file.projects.filter((p) => p.published) : file.projects
  return sortProjects(items)
}

export async function getProjectById(id: string): Promise<StoredProject | null> {
  const file = await readPortfolioFile()
  return file.projects.find((p) => p.id === id) ?? null
}

export async function createProject(input: Omit<StoredProject, "id">): Promise<StoredProject> {
  const file = await readPortfolioFile()
  const created: StoredProject = { ...input, id: crypto.randomUUID() }
  const next: PortfolioFile = {
    ...file,
    projects: sortProjects([...file.projects, created]),
  }
  await writePortfolioFile(next)
  return created
}

export async function updateProject(
  id: string,
  patch: Partial<Omit<StoredProject, "id">>
): Promise<StoredProject | null> {
  const file = await readPortfolioFile()
  const idx = file.projects.findIndex((p) => p.id === id)
  if (idx < 0) return null

  const current = file.projects[idx]
  const updated: StoredProject = {
    ...current,
    ...patch,
    id,
    title: patch.title !== undefined ? (patch.title ?? "").trim() : current.title,
    year: patch.year !== undefined ? (patch.year ?? "").trim() : current.year,
    description: patch.description !== undefined ? (patch.description ?? "").trim() : current.description,
    image: patch.image !== undefined ? (patch.image ?? "").trim() : current.image,
    technologies: patch.technologies !== undefined ? normalizeStringArray(patch.technologies) : current.technologies,
    features: patch.features !== undefined ? normalizeStringArray(patch.features) : current.features,
    link: patch.link !== undefined ? (patch.link ?? "").trim() : current.link,
    challenges: patch.challenges !== undefined ? (patch.challenges ?? "").trim() : current.challenges,
    solution: patch.solution !== undefined ? (patch.solution ?? "").trim() : current.solution,
    published: patch.published !== undefined ? Boolean(patch.published) : current.published,
    sortOrder:
      patch.sortOrder !== undefined && typeof patch.sortOrder === "number" && Number.isFinite(patch.sortOrder)
        ? patch.sortOrder
        : current.sortOrder,
  }

  const nextProjects = [...file.projects]
  nextProjects[idx] = updated

  const next: PortfolioFile = {
    ...file,
    projects: sortProjects(nextProjects),
  }

  await writePortfolioFile(next)
  return updated
}

export async function deleteProject(id: string): Promise<boolean> {
  const file = await readPortfolioFile()
  const nextProjects = file.projects.filter((p) => p.id !== id)
  if (nextProjects.length === file.projects.length) return false

  const next: PortfolioFile = {
    ...file,
    projects: nextProjects,
  }
  await writePortfolioFile(next)
  return true
}
