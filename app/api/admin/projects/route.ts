export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isAdminAuthenticated } from "@/lib/requireAdmin"

export const dynamic = "force-dynamic"

function normalizeImageInput(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return ""
  const normalized = trimmed.replaceAll("\\\\", "/")

  const idx = normalized.toLowerCase().lastIndexOf("/public/")
  if (idx >= 0) {
    const after = normalized.slice(idx + "/public".length)
    return after.startsWith("/") ? after : `/${after}`
  }

  return normalized
}

function isValidNextImageSrc(value: string) {
  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://")
}

function normalizeStringArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string") as string[]
  return []
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  })

  return NextResponse.json({
    projects: projects.map((p) => ({
      ...p,
      technologies: normalizeStringArray(p.technologies),
      features: normalizeStringArray(p.features),
    })),
  })
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => null)) as
    | {
        title?: string
        year?: string
        description?: string
        image?: string
        technologies?: string[]
        link?: string
        features?: string[]
        challenges?: string
        solution?: string
        published?: boolean
        sortOrder?: number
      }
    | null

  const title = body?.title?.trim() ?? ""
  const year = body?.year?.trim() ?? ""
  const description = body?.description?.trim() ?? ""
  const image = normalizeImageInput(body?.image ?? "")
  const technologies = normalizeStringArray(body?.technologies)

  if (!title || !year || !description || !image) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  if (!isValidNextImageSrc(image)) {
    return NextResponse.json(
      {
        error:
          "Invalid image. Use a public path like /image.png or a URL like https://... (do not use C:\\... local paths).",
      },
      { status: 400 }
    )
  }

  const project = await prisma.project.create({
    data: {
      title,
      year,
      description,
      image,
      technologies,
      link: body?.link?.trim() || null,
      features: normalizeStringArray(body?.features),
      challenges: body?.challenges?.trim() || null,
      solution: body?.solution?.trim() || null,
      published: body?.published ?? true,
      sortOrder: Number.isFinite(body?.sortOrder) ? (body?.sortOrder as number) : 0,
    },
  })

  return NextResponse.json({
    project: {
      ...project,
      technologies: normalizeStringArray(project.technologies),
      features: normalizeStringArray(project.features),
    },
  })
}
