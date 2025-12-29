import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

function normalizeStringArray(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string") as string[]
  return []
}

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { published: true },
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
