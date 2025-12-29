export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { listProjects } from "@/lib/filePortfolioStore"

export const dynamic = "force-dynamic"

function normalizeStringArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string") as string[]
  return []
}

export async function GET() {
  const projects = await listProjects({ publishedOnly: true })

  return NextResponse.json({
    projects: projects.map((p) => ({
      ...p,
      technologies: normalizeStringArray(p.technologies),
      features: normalizeStringArray(p.features),
    })),
  })
}
