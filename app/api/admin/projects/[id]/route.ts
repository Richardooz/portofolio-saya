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

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params

  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json({
    project: {
      ...project,
      technologies: normalizeStringArray(project.technologies),
      features: normalizeStringArray(project.features),
    },
  })
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params

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

  const normalizedImage = body?.image === undefined ? undefined : normalizeImageInput(body.image)
  if (normalizedImage !== undefined && normalizedImage && !isValidNextImageSrc(normalizedImage)) {
    return NextResponse.json(
      {
        error:
          "Invalid image. Use a public path like /image.png or a URL like https://... (do not use C:\\... local paths).",
      },
      { status: 400 }
    )
  }

  const updated = await prisma.project.update({
    where: { id },
    data: {
      title: body?.title?.trim(),
      year: body?.year?.trim(),
      description: body?.description?.trim(),
      image: normalizedImage === undefined ? undefined : normalizedImage,
      technologies: body?.technologies ? normalizeStringArray(body.technologies) : undefined,
      link: body?.link === undefined ? undefined : body.link?.trim() || null,
      features: body?.features ? normalizeStringArray(body.features) : undefined,
      challenges: body?.challenges === undefined ? undefined : body.challenges?.trim() || null,
      solution: body?.solution === undefined ? undefined : body.solution?.trim() || null,
      published: body?.published,
      sortOrder: body?.sortOrder,
    },
  })

  return NextResponse.json({
    project: {
      ...updated,
      technologies: normalizeStringArray(updated.technologies),
      features: normalizeStringArray(updated.features),
    },
  })
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params

  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
