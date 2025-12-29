export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { getSettings, setHeroImage } from "@/lib/filePortfolioStore"
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

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const settings = await getSettings()
  return NextResponse.json({ settings })
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => null)) as { heroImage?: string } | null
  const heroImage = normalizeImageInput(body?.heroImage ?? "")

  if (heroImage && !isValidNextImageSrc(heroImage)) {
    return NextResponse.json(
      {
        error:
          "Invalid heroImage. Use a public path like /photo.jpg or a URL like https://... (do not use C:\\... local paths).",
      },
      { status: 400 }
    )
  }

  const settings = await setHeroImage(heroImage || null)

  return NextResponse.json({ settings })
}
