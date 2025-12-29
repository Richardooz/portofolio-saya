import type { PortfolioProject } from "@/lib/portfolioDefaults"

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function projectToSlug(project: Pick<PortfolioProject, "title" | "year">) {
  // Make it more unique than title alone
  return slugify(`${project.title}-${project.year}`)
}
